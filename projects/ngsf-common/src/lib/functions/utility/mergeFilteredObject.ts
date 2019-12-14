import {inArray, isDefined, isObject, PlainObject} from '../validator'

/**
 * 'mergeFilteredObject' utility function
 *
 * Shallowly merges two objects, setting key and values from source object
 * in target object, excluding specified keys.
 *
 * Optionally, it can also use functions to transform the key names and/or
 * the values of the merging object.
 *
 * @param targetObject - Target object to add keys and values to
 * @param sourceObject - Source object to copy keys and values from
 * @param excludeKeys - Array of keys to exclude
 * @param keyFn - Function to apply to keys
 * @param valFn - Function to apply to values
 * @return Returns targetObject
 */
export function mergeFilteredObject(
  targetObject: PlainObject,
  sourceObject: PlainObject,
  excludeKeys:string[] = [],
  keyFn = (key: string): string => key,
  valFn = (val: any): any => val
): PlainObject {
  if (!isObject(sourceObject)) {
    return targetObject
  }
  if (!isObject(targetObject)) {
    targetObject = {}
  }
  for (const key of Object.keys(sourceObject)) {
    if (!inArray(key, excludeKeys) && isDefined(sourceObject[key])) {
      targetObject[keyFn(key)] = valFn(sourceObject[key])
    }
  }
  return targetObject
}
