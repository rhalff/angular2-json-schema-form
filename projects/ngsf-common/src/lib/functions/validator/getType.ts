import {isArray} from './isArray'
import {isObject} from './isObject'
import {isBoolean} from './isBoolean'
import {isInteger} from './isInteger'
import {isNumber} from './isNumber'
import {isString} from './isString'
import {isDate} from './isDate'
import {isDefined} from './isDefined'
/**
 * 'getType' function
 *
 * Detects the JSON Schema Type of a value.
 * By default, detects numbers and integers even if formatted as strings.
 * (So all integers are also numbers, and any number may also be a string.)
 * However, it only detects true boolean values (to detect boolean values
 * in non-boolean formats, use isBoolean() instead).
 *
 * If passed a second optional parameter of 'strict', it will only detect
 * numbers and integers if they are formatted as JavaScript numbers.
 *
 * Examples:
 * getType('10.5') = 'number'
 * getType(10.5) = 'number'
 * getType('10') = 'integer'
 * getType(10) = 'integer'
 * getType('true') = 'string'
 * getType(true) = 'boolean'
 * getType(null) = 'null'
 * getType({ }) = 'object'
 * getType([]) = 'array'
 *
 * getType('10.5', 'strict') = 'string'
 * getType(10.5, 'strict') = 'number'
 * getType('10', 'strict') = 'string'
 * getType(10, 'strict') = 'integer'
 * getType('true', 'strict') = 'string'
 * getType(true, 'strict') = 'boolean'
 *
 * @param value - value to check
 * @param strict - if truthy, also checks JavaScript tyoe
 */

export function getType(value: any, strict: any = false) {
  if (!isDefined(value)) {
    return 'null'
  }
  if (isArray(value)) {
    return 'array'
  }
  if (isObject(value)) {
    return 'object'
  }
  if (isBoolean(value, 'strict')) {
    return 'boolean'
  }
  if (isInteger(value, strict)) {
    return 'integer'
  }
  if (isNumber(value, strict)) {
    return 'number'
  }
  if (isString(value) || (!strict && isDate(value))) {
    return 'string'
  }
  return null
}
