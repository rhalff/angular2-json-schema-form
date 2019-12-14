import {isDefined} from './isDefined'
import {isString} from './isString'
import {isInteger} from './isInteger'
import {isNumber} from './isNumber'
import {isDate} from './isDate'
import {isBoolean} from './isBoolean'
import {inArray} from './inArray'
import {PrimitiveValue, SchemaPrimitiveType} from './types'

/**
 * 'toJavaScriptType' function
 *
 * Converts an input (probably string) value to a JavaScript primitive type -
 * 'string', 'number', 'boolean', or 'null' - before storing in a JSON object.
 *
 * Does not coerce values (other than null), and only converts the types
 * of values that would otherwise be valid.
 *
 * If the optional third parameter 'strictIntegers' is TRUE, and the
 * JSON Schema type 'integer' is specified, it also verifies the input value
 * is an integer and, if it is, returns it as a JaveScript number.
 * If 'strictIntegers' is FALSE (or not set) the type 'integer' is treated
 * exactly the same as 'number', and allows decimals.
 *
 * Valid Examples:
 * toJavaScriptType('10',   'number' ) = 10   // '10'   is a number
 * toJavaScriptType('10',   'integer') = 10   // '10'   is also an integer
 * toJavaScriptType( 10,    'integer') = 10   //  10    is still an integer
 * toJavaScriptType( 10,    'string' ) = '10' //  10    can be made into a string
 * toJavaScriptType('10.5', 'number' ) = 10.5 // '10.5' is a number
 *
 * Invalid Examples:
 * toJavaScriptType('10.5', 'integer') = null // '10.5' is not an integer
 * toJavaScriptType( 10.5,  'integer') = null //  10.5  is still not an integer
 *
 * @param value to convert
 * @param types - types to convert to
 * @param strictIntegers - if FALSE, treat integers as numbers
 */
export function toJavaScriptType(
  value: PrimitiveValue,
  types: SchemaPrimitiveType | SchemaPrimitiveType[],
  strictIntegers = true
): PrimitiveValue {
  if (!isDefined(value)) {
    return null
  }
  types = typeof types === 'string' ? [types] as SchemaPrimitiveType[] : types

  if (strictIntegers && inArray<SchemaPrimitiveType>('integer', types)) {
    if (isInteger(value, 'strict')) {
      return value
    }
    if (isInteger(value)) {
      return parseInt(value as string, 10)
    }
  }
  if (inArray('number', types) || (!strictIntegers && inArray('integer', types))) {
    if (isNumber(value, 'strict')) {
      return value
    }
    if (isNumber(value)) {
      return parseFloat(value as string)
    }
  }
  if (inArray('string', types)) {
    if (isString(value)) {
      return value
    }
    // If value is a date, and types includes 'string',
    // convert the date to a string
    if (isDate(value)) {
      return (value as any).toISOString().slice(0, 10)
    }
    if (isNumber(value)) {
      return value.toString()
    }
  }
  // If value is a date, and types includes 'integer' or 'number',
  // but not 'string', convert the date to a number
  if (isDate(value) && (inArray('integer', types) || inArray('number', types))) {
    return (value as any).getTime()
  }
  if (inArray('boolean', types)) {
    if (isBoolean(value, true)) {
      return true
    }
    if (isBoolean(value, false)) {
      return false
    }
  }
  return null
}
