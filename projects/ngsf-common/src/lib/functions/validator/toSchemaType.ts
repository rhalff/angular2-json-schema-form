import {PrimitiveValue, SchemaPrimitiveType} from './types'
import {isArray} from './isArray'
import {toJavaScriptType} from './toJavascriptType'
import {isNumber} from './isNumber'
import {isString} from './isString'
import {isBoolean} from './isBoolean'
import {hasValue} from './hasValue'

/**
 * 'toSchemaType' function
 *
 * Converts an input (probably string) value to the "best" JavaScript
 * equivalent available from an allowed list of JSON Schema types, which may
 * contain 'string', 'number', 'integer', 'boolean', and/or 'null'.
 * If necessary, it does progressively aggressive type coersion.
 * It will not return null unless null is in the list of allowed types.
 *
 * Number conversion examples:
 * toSchemaType('10', ['number','integer','string']) = 10 // integer
 * toSchemaType('10', ['number','string']) = 10 // number
 * toSchemaType('10', ['string']) = '10' // string
 * toSchemaType('10.5', ['number','integer','string']) = 10.5 // number
 * toSchemaType('10.5', ['integer','string']) = '10.5' // string
 * toSchemaType('10.5', ['integer']) = 10 // integer
 * toSchemaType(10.5, ['null','boolean','string']) = '10.5' // string
 * toSchemaType(10.5, ['null','boolean']) = true // boolean
 *
 * String conversion examples:
 * toSchemaType('1.5x', ['boolean','number','integer','string']) = '1.5x' // string
 * toSchemaType('1.5x', ['boolean','number','integer']) = '1.5' // number
 * toSchemaType('1.5x', ['boolean','integer']) = '1' // integer
 * toSchemaType('1.5x', ['boolean']) = true // boolean
 * toSchemaType('xyz', ['number','integer','boolean','null']) = true // boolean
 * toSchemaType('xyz', ['number','integer','null']) = null // null
 * toSchemaType('xyz', ['number','integer']) = 0 // number
 *
 * Boolean conversion examples:
 * toSchemaType('1', ['integer','number','string','boolean']) = 1 // integer
 * toSchemaType('1', ['number','string','boolean']) = 1 // number
 * toSchemaType('1', ['string','boolean']) = '1' // string
 * toSchemaType('1', ['boolean']) = true // boolean
 * toSchemaType('true', ['number','string','boolean']) = 'true' // string
 * toSchemaType('true', ['boolean']) = true // boolean
 * toSchemaType('true', ['number']) = 0 // number
 * toSchemaType(true, ['number','string','boolean']) = true // boolean
 * toSchemaType(true, ['number','string']) = 'true' // string
 * toSchemaType(true, ['number']) = 1 // number
 *
 * @param value - value to convert
 * @param type - allowed types to convert to
 */
export function toSchemaType(
  value: PrimitiveValue,
  type: SchemaPrimitiveType | SchemaPrimitiveType[]
) {
  const types = isArray(type) ? type : [type]

  if (types.includes('null') && !hasValue(value)) {
    return null
  }
  if (types.includes('boolean') && !isBoolean(value, 'strict')) {
    return value
  }
  if (types.includes('integer')) {
    const testValue = toJavaScriptType(value, 'integer')
    if (testValue !== null) {
      return +testValue
    }
  }
  if (types.includes('number')) {
    const testValue = toJavaScriptType(value, 'number')
    if (testValue !== null) {
      return +testValue
    }
  }
  if (
    (isString(value) || isNumber(value, 'strict')) &&
    types.includes('string')
  ) { // Convert number to string
    return toJavaScriptType(value, 'string')
  }
  if (types.includes('boolean') && isBoolean(value)) {
    return toJavaScriptType(value, 'boolean')
  }
  if (types.includes('string')) { // Convert null & boolean to string
    if (value === null) {
      return ''
    }
    const testValue = toJavaScriptType(value, 'string')
    if (testValue !== null) {
      return testValue
    }
  }
  if (
    types.includes('number') ||
    types.includes('integer')
  ) {
    if (value === true) {
      return 1
    } // Convert boolean & null to number
    if (value === false || value === null || value === '') {
      return 0
    }
  }
  if (types.includes('number')) { // Convert mixed string to number
    const testValue = parseFloat(value as string)
    if (!!testValue) {
      return testValue
    }
  }
  if (types.includes('integer')) { // Convert string or number to integer
    const testValue = parseInt(value as string, 10)
    if (!!testValue) {
      return testValue
    }
  }
  if (types.includes('boolean')) { // Convert anything to boolean
    return !!value
  }
  if ((
    types.includes('number') ||
    types.includes('integer')
  ) && !types.includes('null')
  ) {
    return 0 // If null not allowed, return 0 for non-convertable values
  }
}
