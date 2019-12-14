import {PlainObject} from './types'
import {isObject} from './isObject'
import {isDefined} from './isDefined'
import {isBoolean} from './isBoolean'
import {getType} from './getType'
import {xor} from './xor'

/**
 * 'mergeObjects' utility function
 *
 * Recursively Merges one or more objects into a single object with combined keys.
 * Automatically detects and ignores null and undefined inputs.
 * Also detects duplicated boolean 'not' keys and XORs their values.
 *
 * @param objects - one or more objects to merge
 * @return merged object
 */
export function mergeObjects(...objects: PlainObject[]): PlainObject {
  const mergedObject: PlainObject = {}
  for (const currentObject of objects) {
    if (isObject(currentObject)) {
      for (const key of Object.keys(currentObject)) {
        const currentValue = currentObject[key]
        const mergedValue = mergedObject[key]
        mergedObject[key] = !isDefined(mergedValue) ? currentValue :
          key === 'not' && isBoolean(mergedValue, 'strict') &&
          isBoolean(currentValue, 'strict') ? xor(mergedValue, currentValue) :
            getType(mergedValue) === 'object' && getType(currentValue) === 'object' ?
              mergeObjects(mergedValue, currentValue) :
              currentValue
      }
    }
  }
  return mergedObject
}
