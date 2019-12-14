import {JsonPointer, Pointer} from '../jsonpointer.functions'
import {hasOwn} from '../utility'
import {isArray, isObject} from '../validator'

/**
 * 'getFromSchema' function
 *
 * Uses a JSON Pointer for a value within a data object to retrieve
 * the schema for that value within schema for the data object.
 *
 * The optional third parameter can also be set to return something else:
 * 'schema' (default): the schema for the value indicated by the data pointer
 * 'parentSchema': the schema for the value's parent object or array
 * 'schemaPointer': a pointer to the value's schema within the object's schema
 * 'parentSchemaPointer': a pointer to the schema for the value's parent object or array
 *
 * @param  schema - The schema to get the sub-schema from
 * @param  dataPointer - JSON Pointer (string or array)
 * @param  returnType - what to return?
 * @return The located sub-schema
 */
export function getFromSchema(
  schema: any,
  dataPointer: Pointer,
  returnType = 'schema'
) {
  const dataPointerArray: any[] = JsonPointer.parse(dataPointer)
  if (dataPointerArray === null) {
    console.error(`getFromSchema error: Invalid JSON Pointer: ${dataPointer}`)
    return null
  }
  let subSchema = schema
  const schemaPointer = []
  const length = dataPointerArray.length
  if (returnType.slice(0, 6) === 'parent') {
    dataPointerArray.length--
  }
  for (let i = 0; i < length; ++i) {
    const parentSchema = subSchema
    const key = dataPointerArray[i]
    let subSchemaFound = false
    if (typeof subSchema !== 'object') {
      console.error(`getFromSchema error: Unable to find "${key}" key in schema.`)
      console.error(schema)
      console.error(dataPointer)
      return null
    }
    if (subSchema.type === 'array' && (!isNaN(key) || key === '-')) {
      if (hasOwn(subSchema, 'items')) {
        if (isObject(subSchema.items)) {
          subSchemaFound = true
          subSchema = subSchema.items
          schemaPointer.push('items')
        } else if (isArray(subSchema.items)) {
          if (!isNaN(key) && subSchema.items.length >= +key) {
            subSchemaFound = true
            subSchema = subSchema.items[+key]
            schemaPointer.push('items', key)
          }
        }
      }
      if (!subSchemaFound && isObject(subSchema.additionalItems)) {
        subSchemaFound = true
        subSchema = subSchema.additionalItems
        schemaPointer.push('additionalItems')
      } else if (subSchema.additionalItems !== false) {
        subSchemaFound = true
        subSchema = {}
        schemaPointer.push('additionalItems')
      }
    } else if (subSchema.type === 'object') {
      if (isObject(subSchema.properties) && hasOwn(subSchema.properties, key)) {
        subSchemaFound = true
        subSchema = subSchema.properties[key]
        schemaPointer.push('properties', key)
      } else if (isObject(subSchema.additionalProperties)) {
        subSchemaFound = true
        subSchema = subSchema.additionalProperties
        schemaPointer.push('additionalProperties')
      } else if (subSchema.additionalProperties !== false) {
        subSchemaFound = true
        subSchema = {}
        schemaPointer.push('additionalProperties')
      }
    }
    if (!subSchemaFound) {
      console.error(`getFromSchema error: Unable to find "${key}" item in schema.`)
      console.error(schema)
      console.error(dataPointer)
      return
    }
  }
  return returnType.slice(-7) === 'Pointer' ? schemaPointer : subSchema
}
