import {isArray, isNumber, isObject} from '../validator'
import {JsonPointer} from '../jsonpointer.functions'
import {hasOwn} from '../utility'

/**
 * 'isInputRequired' function
 *
 * Checks a JSON Schema to see if an item is required
 *
 * @param schema - the schema to check
 * @param schemaPointer - the pointer to the item to check
 * @return true if the item is required, false if not
 */
export function isInputRequired(
  schema: any,
  schemaPointer: string
): boolean {
  if (!isObject(schema)) {
    console.error('isInputRequired error: Input schema must be an object.')
    return false
  }
  const listPointerArray = JsonPointer.parse(schemaPointer)
  if (isArray(listPointerArray)) {
    if (!listPointerArray.length) {
      return schema.required === true
    }
    const keyName = listPointerArray.pop()
    const nextToLastKey = listPointerArray[listPointerArray.length - 1]
    if (['properties', 'additionalProperties', 'patternProperties', 'items', 'additionalItems']
      .includes(nextToLastKey)
    ) {
      listPointerArray.pop()
    }
    const parentSchema = JsonPointer.get(schema, listPointerArray) || {}
    if (isArray(parentSchema.required)) {
      return parentSchema.required.includes(keyName)
    }
    if (parentSchema.type === 'array') {
      return hasOwn(parentSchema, 'minItems') &&
        isNumber(keyName) &&
        +parentSchema.minItems > +keyName
    }
  }
  return false
}
