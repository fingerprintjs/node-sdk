import openapiTS, { astToString } from 'openapi-typescript'
import * as fs from 'fs'
import * as yaml from 'yaml'

const schemaObject = yaml.parse(fs.readFileSync('resources/fingerprint-server-api.yaml', 'utf-8'))

/**
 * openapi-typescript builds a parameter's JSDoc from the parameter object, not its nested
 * `schema`, so the operation parameter examples never reach the generated types. Walk the tree
 * and hoist each parameter's schema example up to the parameter level (valid on a Parameter
 * Object) so client method params get an `@example` tag.
 */
function hoistParameterExamples(node) {
  if (Array.isArray(node)) {
    node.forEach(hoistParameterExamples)
    return
  }
  if (node && typeof node === 'object') {
    if (typeof node.in === 'string' && node.example === undefined) {
      const example = extractSchemaExample(node.schema)
      if (example !== undefined) {
        node.example = example
      }
    }
    Object.values(node).forEach(hoistParameterExamples)
  }
}

/**
 * A single example keeps its native type; multiple are joined onto one line so the generated
 * `@example` tag stays readable instead of a pretty-printed JSON array.
 */
function normalizeExample(examples) {
  return examples.length === 1 ? examples[0] : examples.join(', ')
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

hoistParameterExamples(schemaObject)

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
          if (value.$ref && !value.description) {
            const source = getObjectByRef(value.$ref, schemaObject)

            schema.properties[key] = {
              ...value,
              description: source?.description,
            }
          }
        })
      }
    },
  })

  fs.writeFileSync('./src/generatedApiTypes.ts', astToString(result))
} catch (e) {
  console.error(e)
  process.exit(1)
}
