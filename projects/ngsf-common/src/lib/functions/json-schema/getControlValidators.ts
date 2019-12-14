import {isObject} from '../validator'
import {forEach, hasOwn} from '../utility'

/**
 * 'getControlValidators' function
 */
export function getControlValidators(schema: any) {
  if (!isObject(schema)) {
    return null
  }
  const validators: any = {}
  if (hasOwn(schema, 'type')) {
    switch (schema.type) {
      case 'string':
        forEach(['pattern', 'format', 'minLength', 'maxLength'], (prop) => {
          if (hasOwn(schema, prop)) {
            validators[prop] = [schema[prop]]
          }
        })
        break
      case 'number':
      case 'integer':
        forEach(['Minimum', 'Maximum'], (ucLimit) => {
          const eLimit = 'exclusive' + ucLimit
          const limit = ucLimit.toLowerCase()
          if (hasOwn(schema, limit)) {
            const exclusive = hasOwn(schema, eLimit) && schema[eLimit] === true
            validators[limit] = [schema[limit], exclusive]
          }
        })
        forEach(['multipleOf', 'type'], (prop) => {
          if (hasOwn(schema, prop)) {
            validators[prop] = [schema[prop]]
          }
        })
        break
      case 'object':
        forEach(['minProperties', 'maxProperties', 'dependencies'], (prop) => {
          if (hasOwn(schema, prop)) {
            validators[prop] = [schema[prop]]
          }
        })
        break
      case 'array':
        forEach(['minItems', 'maxItems', 'uniqueItems'], (prop) => {
          if (hasOwn(schema, prop)) {
            validators[prop] = [schema[prop]]
          }
        })
        break
    }
  }
  if (hasOwn(schema, 'enum')) {
    validators.enum = [schema.enum]
  }
  return validators
}
