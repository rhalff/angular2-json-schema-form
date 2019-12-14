import {isString} from './isString'
import {isDate} from './isDate'
import {isNumber} from './isNumber'
import {isInteger} from './isInteger'
import {isBoolean} from './isBoolean'
import {hasValue} from './hasValue'
import {PrimitiveValue, SchemaPrimitiveType} from './types'

/**
 * 'isType' function
 *
 * Checks whether an input (probably string) value contains data of
 * a specified JSON Schema type
 *
 * @param value - value to check
 * @param type - type to check
 */
export function isType(value: PrimitiveValue, type: SchemaPrimitiveType): boolean {
  switch (type) {
    case 'string':
      return isString(value) || isDate(value)
    case 'number':
      return isNumber(value)
    case 'integer':
      return isInteger(value)
    case 'boolean':
      return isBoolean(value)
    case 'null':
      return !hasValue(value)
    default:
      console.error(`isType error: "${type}" is not a recognized type.`)
      return null
  }
}
