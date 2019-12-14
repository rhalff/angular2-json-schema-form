import {isArray, isMap, isObject, isSet} from '../validator'

/**
 * 'copy' function
 *
 * Makes a shallow copy of a JavaScript object, array, Map, or Set.
 * If passed a JavaScript primitive value (string, number, boolean, or null),
 * it returns the value.
 *
 * @param object - The object to copy
 * @param errors - Show errors?
 * @return The copied object
 */
export function copy(
  object: any,
  errors: boolean = false
) {
  if (typeof object !== 'object' || object === null) {
    return object
  }
  if (isMap(object)) {
    return new Map(object)
  }
  if (isSet(object)) {
    return new Set(object)
  }
  if (isArray(object)) {
    return [...object]
  }
  if (isObject(object)) {
    return {...object}
  }
  if (errors) {
    console.error('copy error: Object to copy must be a JavaScript object or value.')
  }
  return object
}
