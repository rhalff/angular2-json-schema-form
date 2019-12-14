import {isArray, isEmpty, isObject} from '../validator'

/**
 * 'mergeValues' function
 *
 * @param  valuesToMerge - Multiple values to merge
 * @return Merged values
 */
export function mergeValues(...valuesToMerge: any[]) {
  let mergedValues: any = null
  for (const currentValue of valuesToMerge) {
    if (!isEmpty(currentValue)) {
      if (typeof currentValue === 'object' &&
        (isEmpty(mergedValues) || typeof mergedValues !== 'object')
      ) {
        if (isArray(currentValue)) {
          mergedValues = [...currentValue]
        } else if (isObject(currentValue)) {
          mergedValues = {...currentValue}
        }
      } else if (typeof currentValue !== 'object') {
        mergedValues = currentValue
      } else if (isObject(mergedValues) && isObject(currentValue)) {
        Object.assign(mergedValues, currentValue)
      } else if (isObject(mergedValues) && isArray(currentValue)) {
        const newValues = []
        for (const value of currentValue) {
          newValues.push(mergeValues(mergedValues, value))
        }
        mergedValues = newValues
      } else if (isArray(mergedValues) && isObject(currentValue)) {
        const newValues = []
        for (const value of mergedValues) {
          newValues.push(mergeValues(value, currentValue))
        }
        mergedValues = newValues
      } else if (isArray(mergedValues) && isArray(currentValue)) {
        const newValues = []
        for (let i = 0; i < Math.max(mergedValues.length, currentValue.length); i++) {
          if (i < mergedValues.length && i < currentValue.length) {
            newValues.push(mergeValues(mergedValues[i], currentValue[i]))
          } else if (i < mergedValues.length) {
            newValues.push(mergedValues[i])
          } else if (i < currentValue.length) {
            newValues.push(currentValue[i])
          }
        }
        mergedValues = newValues
      }
    }
  }
  return mergedValues
}
