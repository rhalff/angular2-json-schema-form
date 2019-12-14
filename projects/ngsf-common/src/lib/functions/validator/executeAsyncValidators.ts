/**
 * 'executeAsyncValidators' utility function
 *
 * Validates a control against an array of async validators, and returns
 * an array of observabe results of the same length containing a combination of
 * error messages (from invalid validators) and null values (from valid ones)
 *
 * @param  { AbstractControl } control - control to validate
 * @param  { AsyncIValidatorFn[] } validators - array of async validators
 * @param  { boolean } invert - invert?
 * @return array of observable nulls and error message
 */
import {AbstractControl} from '@angular/forms'
import {AsyncIValidatorFn} from './types'

export function executeAsyncValidators(
  control: AbstractControl,
  validators: AsyncIValidatorFn[],
  invert = false
) {
  return validators.map(validator => validator(control, invert))
}
