import {isArray, isObject} from '../validator'
import {mergeSchemas} from '../merge-schemas'

/**
 * 'combineAllOf' function
 *
 * Attempt to convert an allOf schema object into
 * a non-allOf schema object with equivalent rules.
 *
 * @param  schema - allOf schema object
 * @return converted schema object
 */
export function combineAllOf(schema: any) {
  if (!isObject(schema) || !isArray(schema.allOf)) {
    return schema
  }
  let mergedSchema = mergeSchemas(...schema.allOf)
  if (Object.keys(schema).length > 1) {
    const extraKeys = {...schema}
    delete extraKeys.allOf
    mergedSchema = mergeSchemas(mergedSchema, extraKeys)
  }
  return mergedSchema
}
