import {getType} from '../validator'

/**
 * 'buildSchemaFromData' function
 *
 * Build a JSON Schema from a data object
 *
 * @param  data - The data object
 * @param  requireAllFields - Require all fields?
 * @param  isRoot - is root
 * @return The new JSON Schema
 */
export function buildSchemaFromData(
  data: any,
  requireAllFields = false,
  isRoot = true
) {
  const newSchema: any = {}
  const getFieldType = (value: any): string => {
    const fieldType = getType(value, 'strict')
    return {integer: 'number', null: 'string'}[fieldType] || fieldType
  }
  const buildSubSchema = (value) =>
    buildSchemaFromData(value, requireAllFields, false)
  if (isRoot) {
    newSchema.$schema = 'http://json-schema.org/draft-06/schema#'
  }
  newSchema.type = getFieldType(data)
  if (newSchema.type === 'object') {
    newSchema.properties = {}
    if (requireAllFields) {
      newSchema.required = []
    }
    for (const key of Object.keys(data)) {
      newSchema.properties[key] = buildSubSchema(data[key])
      if (requireAllFields) {
        newSchema.required.push(key)
      }
    }
  } else if (newSchema.type === 'array') {
    newSchema.items = data.map(buildSubSchema)
    // If all items are the same type, use an object for items instead of an array
    if ((new Set(data.map(getFieldType))).size === 1) {
      newSchema.items = newSchema.items.reduce((a, b) => ({...a, ...b}), {})
    }
    if (requireAllFields) {
      newSchema.minItems = 1
    }
  }
  return newSchema
}
