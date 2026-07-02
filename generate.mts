import openapiTS, { astToString } from 'openapi-typescript'
import type { OpenAPI3, SchemaObject } from 'openapi-typescript'
import * as fs from 'fs'
import * as yaml from 'yaml'

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

/**
 * Find a parameter schema's example from the canonical JSON Schema `examples` array, unwrapping
 * array `items` so array-typed params still surface one. The schema also carries a singular
 * `example` duplicate for tools that can't read `examples`, but we don't rely on it: it's
 * redundant here and may be dropped upstream.
 */
function extractSchemaExample(schema: unknown): unknown {
  if (!isRecord(schema)) {
    return undefined
  }
  if (Array.isArray(schema.examples) && schema.examples.length > 0) {
    return schema.examples[0]
  }
  if (schema.type === 'array') {
    return extractSchemaExample(schema.items)
  }
  return undefined
}

/**
 * openapi-typescript builds an operation parameter's JSDoc from the parameter object itself, not
 * from its nested `schema`, and only reads the singular `example` keyword. Hoist each parameter's
 * schema example (unlike schema-level examples, these are not surfaced natively) onto the
 * parameter object so it renders as an `@example` tag.
 */
function hoistParameterExamples(node: unknown): void {
  if (Array.isArray(node)) {
    node.forEach(hoistParameterExamples)
    return
  }
  if (isRecord(node)) {
    if (typeof node.in === 'string' && node.example === undefined) {
      const example = extractSchemaExample(node.schema)
      if (example !== undefined) {
        node.example = example
      }
    }
    Object.values(node).forEach(hoistParameterExamples)
  }
}

/** Resolve a local `$ref` (e.g. `#/components/schemas/GeolocationCity`) to its target node. */
function getObjectByRef(refPath: string, schema: unknown): unknown {
  if (!refPath.startsWith('#/')) {
    throw new Error('Only local $refs starting with "#/" are supported')
  }

  const pathParts = refPath.slice(2).split('/')

  let current: unknown = schema
  for (const part of pathParts) {
    if (isRecord(current) && current[part] !== undefined) {
      current = current[part]
    } else {
      throw new Error(`Path not found: ${refPath}`)
    }
  }

  return current
}

/** A schema property that references another component via `$ref`. */
type RefProperty = {
  $ref?: string
  description?: string
}

/**
 * Main flow: Generate the API types from the OpenAPI schema.
 */
try {
  const schemaObject = yaml.parse(fs.readFileSync('resources/fingerprint-server-api.yaml', 'utf-8')) as OpenAPI3
  hoistParameterExamples(schemaObject)

  const result = await openapiTS(schemaObject, {
    /** Propagate `description` from a `$ref` target onto the referencing property. */
    transform: (schema: SchemaObject) => {
      const objectSchema = schema as { type?: unknown; properties?: Record<string, RefProperty> }
      const { properties } = objectSchema

      if (objectSchema.type === 'object' && properties) {
        Object.entries(properties).forEach(([key, value]) => {
          if (value.$ref && !value.description) {
            const source = getObjectByRef(value.$ref, schemaObject) as RefProperty | undefined

            properties[key] = {
              ...value,
              description: source?.description,
            }
          }
        })
      }

      return undefined
    },
  })

  fs.writeFileSync('./src/generatedApiTypes.ts', astToString(result))
} catch (e) {
  console.error(e)
  process.exit(1)
}
