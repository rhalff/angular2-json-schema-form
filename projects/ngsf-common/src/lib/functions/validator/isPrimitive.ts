import {isString} from './isString'
import {isNumber} from './isNumber'
import {isBoolean} from './isBoolean'

/**
 * 'isPrimitive' function
 *
 * Checks whether an input value is a JavaScript primitive type:
 * string, number, boolean, or null.
 *
 * @param value - value to check
 */
export function isPrimitive(value: any): boolean {
  return (isString(value) || isNumber(value) ||
    isBoolean(value, 'strict') || value === null)
}
