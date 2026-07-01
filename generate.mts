import openapiTS, { astToString } from 'openapi-typescript'
import type { OpenAPI3, SchemaObject } from 'openapi-typescript'
import * as fs from 'fs'
import * as yaml from 'yaml'

const schemaObject = yaml.parse(fs.readFileSync('resources/fingerprint-server-api.yaml', 'utf-8')) as OpenAPI3

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

/**
 * openapi-typescript only reads the singular `example` keyword, but the schema uses the JSON
 * Schema `examples` array. Walk the tree and fold each `examples` array into `example`. For
 * parameters, hoist the example onto the parameter object itself, since that (not its nested
 * `schema`) is where openapi-typescript reads a parameter's JSDoc from.
 */
function foldExamplesIntoExample(node: unknown): void {
  if (Array.isArray(node)) {
    node.forEach(foldExamplesIntoExample)
    return
  }
  if (isRecord(node)) {
    if (Array.isArray(node.examples) && node.example === undefined) {
      node.example = normalizeExample(node.examples)
    }
    if (typeof node.in === 'string' && node.example === undefined) {
      const example = extractSchemaExample(node.schema)
      if (example !== undefined) {
        node.example = example
      }
    }
    Object.values(node).forEach(foldExamplesIntoExample)
  }
}

/**
 * Compact arrays/objects to one-line JSON so they stay on a single `@example` line
 * (openapi-typescript otherwise pretty-prints them across multiple lines); scalars pass through.
 */
function serializeExample(value: unknown): unknown {
  return value !== null && typeof value === 'object' ? JSON.stringify(value) : value
}

/**
 * Turn an `examples` array into an `example` value. Multiple examples are joined with `@example`
 * markers that {@link splitExampleTags} later expands into one tag each (the JSDoc convention),
 * since openapi-typescript itself only ever emits a single `@example` tag.
 */
function normalizeExample(examples: unknown[]): unknown {
  if (examples.length === 1) {
    return serializeExample(examples[0])
  }
  return examples.map(serializeExample).join('\n@example ')
}

/**
 * openapi-typescript renders newlines in an example as indented continuation lines
 * (`* <5 spaces>`). De-indent our `@example` markers so each becomes its own top-level JSDoc tag.
 */
function splitExampleTags(source: string): string {
  return source.replaceAll('*     @example ', '* @example ')
}

/**
 * Find a parameter schema's example, unwrapping array `items` so array-typed params still
 * surface one.
 */
function extractSchemaExample(schema: unknown): unknown {
  if (!isRecord(schema)) {
    return undefined
  }
  if (schema.example !== undefined) {
    return schema.example
  }
  if (Array.isArray(schema.examples)) {
    return normalizeExample(schema.examples)
  }
  if (schema.type === 'array') {
    return extractSchemaExample(schema.items)
  }
  return undefined
}

foldExamplesIntoExample(schemaObject)

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
  example?: unknown
}

try {
  const result = await openapiTS(schemaObject, {
    /** Propagate `description` and `example` from a `$ref` target onto the referencing property. */
    transform: (schema: SchemaObject) => {
      const objectSchema = schema as { type?: unknown; properties?: Record<string, RefProperty> }
      const { properties } = objectSchema

      if (objectSchema.type === 'object' && properties) {
        Object.entries(properties).forEach(([key, value]) => {
          if (value.$ref && (!value.description || value.example === undefined)) {
            const source = getObjectByRef(value.$ref, schemaObject) as RefProperty | undefined

            properties[key] = {
              ...value,
              description: value.description ?? source?.description,
              example: value.example ?? source?.example,
            }
          }
        })
      }

      return undefined
    },
  })

  fs.writeFileSync('./src/generatedApiTypes.ts', splitExampleTags(astToString(result)))
} catch (e) {
  console.error(e)
  process.exit(1)
}
