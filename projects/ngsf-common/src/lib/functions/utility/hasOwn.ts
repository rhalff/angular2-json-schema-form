import {isArray, isMap, isObject, isSet} from '../validator'

/**
 * 'hasOwn' utility function
 *
 * Checks whether an object or array has a particular property.
 *
 * @param object - the object to check
 * @param property - the property to look for
 * @return true if object has property, false if not
 */
export function hasOwn(object: any, property: string): boolean {
  if (!object || !['number', 'string', 'symbol'].includes(typeof property) ||
    (!isObject(object) && !isArray(object) && !isMap(object) && !isSet(object))
  ) {
    return false
  }
  if (isMap(object) || isSet(object)) {
    return object.has(property)
  }
  if (typeof property === 'number') {
    if (isArray(object)) {
      return object[property as number]
    }
    property = property + ''
  }
  return object.hasOwnProperty(property)
}
