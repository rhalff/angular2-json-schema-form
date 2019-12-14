import {mergeObjects} from './mergeObjects'
import {isEmpty} from './isEmpty'
import {PlainObject} from './types'

/**
 * 'mergeErrors' utility function
 *
 * Merges an array of objects.
 * Used for combining the validator errors returned from 'executeValidators'
 *
 * @param arrayOfErrors - array of objects
 * @return merged object, or null if no usable input objects
 */
export function mergeErrors(arrayOfErrors: any): PlainObject {
  const mergedErrors = mergeObjects(...arrayOfErrors)
  return isEmpty(mergedErrors) ? null : mergedErrors
}
