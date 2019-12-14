import {isArray} from '../validator'
import {hasOwn} from '../utility'
import * as _ from 'lodash'

/**
 * 'fixRequiredArrayProperties' function
 *
 * Fixes an incorrectly placed required list inside an array schema, by moving
 * it into items.properties or additionalItems.properties, where it belongs.
 *
 * @param  schema - allOf schema object
 * @return converted schema object
 */
export function fixRequiredArrayProperties(schema: any) {
  if (schema.type === 'array' && isArray(schema.required)) {
    const itemsObject = hasOwn(schema.items, 'properties') ? 'items' :
      hasOwn(schema.additionalItems, 'properties') ? 'additionalItems' : null
    if (itemsObject && !hasOwn(schema[itemsObject], 'required') && (
      hasOwn(schema[itemsObject], 'additionalProperties') ||
      schema.required.every(key => hasOwn(schema[itemsObject].properties, key))
    )) {
      schema = _.cloneDeep(schema)
      schema[itemsObject].required = schema.required
      delete schema.required
    }
  }
  return schema
}
