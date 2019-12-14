import {isArray} from './isArray'
import {isObject} from './isObject'

/**
 * 'isEmpty' utility function
 *
 * Similar to !hasValue, but also returns true for empty arrays and objects.
 *
 * @param value - the value to check
 * @return false if undefined, null, or '', otherwise true
 */
export function isEmpty(value: any): boolean {
  if (isArray(value)) {
    return !value.length
  }
  if (isObject(value)) {
    return !Object.keys(value).length
  }
  return value === undefined || value === null || value === ''
}
