import {AbstractControl} from '@angular/forms'
import {IValidatorFn, PlainObject} from './types'

/**
 * 'executeValidators' utility function
 *
 * Validates a control against an array of validators, and returns
 * an array of the same length containing a combination of error messages
 * (from invalid validators) and null values (from valid validators)
 *
 * @param control to validate
 * @param validators - array of validators
 * @param invert - invert?
 * @return array of nulls and error message
 */
export function executeValidators(
  control: AbstractControl,
  validators: IValidatorFn[],
  invert = false
): PlainObject[] {
  return validators.map(validator => validator(control, invert))
}
