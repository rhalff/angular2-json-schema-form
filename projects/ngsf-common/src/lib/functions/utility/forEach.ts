import {isArray, isEmpty, isObject} from '../validator'

/**
 * 'forEach' function
 *
 * Iterates over all items in the first level of an object or array
 * and calls an iterator function on each item.
 *
 * The iterator function is called with four values:
 * 1. The current item's value
 * 2. The current item's key
 * 3. The parent object, which contains the current item
 * 4. The root object
 *
 * Setting the optional third parameter to 'top-down' or 'bottom-up' will cause
 * it to also recursively iterate over items in sub-objects or sub-arrays in the
 * specified direction.
 *
 * @param object - The object or array to iterate over
 * @param fn - the iterator function to call on each item
 * @param recurse -
 * @param rootObject -
 * @param errors - Show errors?
 */
export function forEach(
  object: any | any[],
  fn: (v: any, k?: string | number, c?: any, rc?: any) => any,
  recurse: boolean | string = false,
  rootObject: any = object,
  errors = false
): void {
  if (isEmpty(object)) {
    return
  }
  if ((isObject(object) || isArray(object)) && typeof fn === 'function') {
    for (const key of Object.keys(object)) {
      const value = object[key]
      if (recurse === 'bottom-up' && (isObject(value) || isArray(value))) {
        forEach(value, fn, recurse, rootObject)
      }
      fn(value, key, object, rootObject)
      if (recurse === 'top-down' && (isObject(value) || isArray(value))) {
        forEach(value, fn, recurse, rootObject)
      }
    }
  }
  if (errors) {
    if (typeof fn !== 'function') {
      console.error('forEach error: Iterator must be a function.')
      console.error('function', fn)
    }
    if (!isObject(object) && !isArray(object)) {
      console.error('forEach error: Input object must be an object or array.')
      console.error('object', object)
    }
  }
}
