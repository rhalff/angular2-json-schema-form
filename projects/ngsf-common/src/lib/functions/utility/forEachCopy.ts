import {hasValue, isArray, isObject} from '../validator'

/**
 * 'forEachCopy' function
 *
 * Iterates over all items in the first level of an object or array
 * and calls an iterator function on each item. Returns a new object or array
 * with the same keys or indexes as the original, and values set to the results
 * of the iterator function.
 *
 * Does NOT recursively iterate over items in sub-objects or sub-arrays.
 *
 * @param object - The object or array to iterate over
 * @param fn - The iterator function to call on each item
 * @param errors - Show errors?
 * @return The resulting object or array
 */
export function forEachCopy(
  object: any | any[],
  fn: (v: any, k?: string | number, o?: any, p?: string) => any,
  errors = false
): any | any[] {
  if (!hasValue(object)) {
    return
  }
  if ((isObject(object) || isArray(object)) && typeof object !== 'function') {
    const newObject: any = isArray(object) ? [] : {}
    for (const key of Object.keys(object)) {
      newObject[key] = fn(object[key], key, object)
    }
    return newObject
  }
  if (errors) {
    if (typeof fn !== 'function') {
      console.error('forEachCopy error: Iterator must be a function.')
      console.error('function', fn)
    }
    if (!isObject(object) && !isArray(object)) {
      console.error('forEachCopy error: Input object must be an object or array.')
      console.error('object', object)
    }
  }
}
