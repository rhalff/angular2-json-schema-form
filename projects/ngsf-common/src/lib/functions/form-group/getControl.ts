import {JsonPointer, Pointer} from '../jsonpointer.functions'
import {isArray, isObject} from '../validator'
import {hasOwn} from '../utility'
import {FormGroup} from '@angular/forms'

/**
 * 'getControl' function
 *
 * Uses a JSON Pointer for a data object to retrieve a control from
 * an Angular formGroup or formGroup template. (Note: though a formGroup
 * template is much simpler, its basic structure is idential to a formGroup).
 *
 * If the optional third parameter 'returnGroup' is set to TRUE, the group
 * containing the control is returned, rather than the control itself.
 *
 * @param formGroup - Angular FormGroup to get value from
 * @param dataPointer - JSON Pointer (string or array)
 * @param returnGroup - If true, return group containing control
 * @return Located value (or null, if no control found)
 */
export function getControl(
  formGroup: FormGroup, dataPointer: Pointer, returnGroup = false
) {
  if (!isObject(formGroup) || !JsonPointer.isJsonPointer(dataPointer)) {
    if (!JsonPointer.isJsonPointer(dataPointer)) {
      // If dataPointer input is not a valid JSON pointer, check to
      // see if it is instead a valid object path, using dot notaion
      if (typeof dataPointer === 'string') {
        const formControl = formGroup.get(dataPointer)
        if (formControl) {
          return formControl
        }
      }
      console.error(`getControl error: Invalid JSON Pointer: ${dataPointer}`)
    }
    if (!isObject(formGroup)) {
      console.error(`getControl error: Invalid formGroup: ${formGroup}`)
    }
    return null
  }
  let dataPointerArray = JsonPointer.parse(dataPointer)
  if (returnGroup) {
    dataPointerArray = dataPointerArray.slice(0, -1)
  }

  // If formGroup input is a real formGroup (not a formGroup template)
  // try using formGroup.get() to return the control
  if (typeof formGroup.get === 'function' &&
    dataPointerArray.every(key => key.indexOf('.') === -1)
  ) {
    const formControl = formGroup.get(dataPointerArray.join('.'))
    if (formControl) {
      return formControl
    }
  }

  // If formGroup input is a formGroup template,
  // or formGroup.get() failed to return the control,
  // search the formGroup object for dataPointer's control
  let subGroup: any = formGroup
  for (const key of dataPointerArray) {
    if (hasOwn(subGroup, 'controls')) {
      subGroup = subGroup.controls
    }
    if (isArray(subGroup) && (key === '-')) {
      subGroup = subGroup[subGroup.length - 1]
    } else if (hasOwn(subGroup, key)) {
      subGroup = subGroup[key]
    } else {
      console.error(`getControl error: Unable to find "${key}" item in FormGroup.`)
      console.error(dataPointer)
      console.error(formGroup)
      return
    }
  }
  return subGroup
}
