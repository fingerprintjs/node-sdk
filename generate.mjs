import openapiTS, { astToString } from 'openapi-typescript'
import * as fs from 'fs'
import * as yaml from 'yaml'

const schemaObject = yaml.parse(fs.readFileSync('resources/fingerprint-server-api.yaml', 'utf-8'))

/**
 * openapi-typescript only emits the JSDoc `@example` tag from the singular `example` keyword,
 * but the schema uses the JSON Schema `examples` array. Walk the whole tree and fold the
 * `examples` array into `example` so the values show up in the generated JSDoc, and hoist
 * parameter schema examples up to the parameter object (which is where openapi-typescript reads
 * a parameter's JSDoc from) so client method params get an `@example` tag too.
 */
function foldExamplesIntoExample(node) {
  if (Array.isArray(node)) {
    node.forEach(foldExamplesIntoExample)
    return
  }
  if (node && typeof node === 'object') {
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
 * Serialize a single example value: arrays/objects become compact one-line JSON so
 * openapi-typescript (which pretty-prints object values across multiple lines) keeps the
 * `@example` tag on a single line; scalars keep their native type.
 */
function serializeExample(value) {
  return value !== null && typeof value === 'object' ? JSON.stringify(value) : value
}

/**
 * Build the `example` value openapi-typescript will render. A single example becomes one
 * `@example` tag. Multiple examples are joined with `\n@example ` markers — openapi-typescript
 * emits only one `@example` tag, so a post-processing pass ({@link splitExampleTags}) turns each
 * marker into its own tag, matching the JSDoc convention for multiple examples.
 */
function normalizeExample(examples) {
  if (examples.length === 1) {
    return serializeExample(examples[0])
  }
  return examples.map(serializeExample).join('\n@example ')
}

/**
 * openapi-typescript renders a single `@example` tag and turns newlines inside the value into
 * indented continuation lines (`* <5 spaces>`). Our multi-example marker rides on that: de-indent
 * the continuation `@example` lines so each becomes its own top-level JSDoc tag.
 */
function splitExampleTags(source) {
  return source.replaceAll('*     @example ', '* @example ')
}

/**
 * Resolve the example for a parameter's schema, unwrapping array `items` so array-typed params
 * (e.g. repeated query keys) still surface an example.
 */
function extractSchemaExample(schema) {
  if (!schema || typeof schema !== 'object') {
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

// Function to resolve $ref paths
function getObjectByRef(refPath, schema) {
  if (!refPath.startsWith('#/')) {
    throw new Error('Only local $refs starting with "#/" are supported')
  }

  // Split the path into parts, e.g., "#/components/schemas/GeolocationCity" -> ["components", "schemas", "GeolocationCity"]
  const pathParts = refPath.slice(2).split('/')

  // Traverse the schema object based on path parts
  let current = schema
  for (const part of pathParts) {
    if (current[part] !== undefined) {
      current = current[part]
    } else {
      throw new Error(`Path not found: ${refPath}`)
    }
  }

  return current
}

try {
  const result = await openapiTS(schemaObject, {
    /**
     * Enhances generated documentation by propagating it from source object in schema to all properties that use it as $ref.
     * */
    transform: (schema) => {
      if (schema.type === 'object' && Boolean(schema.properties)) {
        Object.entries(schema.properties).forEach(([key, value]) => {
          if (value.$ref && (!value.description || value.example === undefined)) {
            const source = getObjectByRef(value.$ref, schemaObject)

            schema.properties[key] = {
              ...value,
              description: value.description ?? source?.description,
              example: value.example ?? source?.example,
            }
          }
        })
      }
    },
  })

  fs.writeFileSync('./src/generatedApiTypes.ts', splitExampleTags(astToString(result)))
} catch (e) {
  console.error(e)
  process.exit(1)
}
