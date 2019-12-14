import {AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn} from '@angular/forms'
import {forEach, hasOwn} from '../utility'
import {JsonValidators} from '../../json.validators'
import {inArray} from '../validator'
import * as _ from 'lodash'

/**
 * 'buildFormGroup' function
 */
export function buildFormGroup(template: any): AbstractControl {
  const validatorFns: ValidatorFn[] = []
  let validatorFn: ValidatorFn = null
  if (hasOwn(template, 'validators')) {
    forEach(template.validators, (parameters, validator) => {
      if (typeof JsonValidators[validator] === 'function') {
        validatorFns.push(JsonValidators[validator].apply(null, parameters))
      }
    })
    if (validatorFns.length &&
      inArray(template.controlType, ['FormGroup', 'FormArray'])
    ) {
      validatorFn = validatorFns.length > 1 ?
        JsonValidators.compose(validatorFns) : validatorFns[0]
    }
  }
  if (hasOwn(template, 'controlType')) {
    switch (template.controlType) {
      case 'FormGroup':
        const groupControls: { [key: string]: AbstractControl } = {}
        forEach(template.controls, (controls, key) => {
          const newControl: AbstractControl = buildFormGroup(controls)
          if (newControl) {
            groupControls[key] = newControl
          }
        })
        return new FormGroup(groupControls, validatorFn)
      case 'FormArray':
        return new FormArray(_.filter(_.map(template.controls,
          controls => buildFormGroup(controls)
        )), validatorFn)
      case 'FormControl':
        return new FormControl(template.value, validatorFns)
    }
  }
  return null
}
