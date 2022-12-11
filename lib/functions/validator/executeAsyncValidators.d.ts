import { AbstractControl } from '@angular/forms';
import { AsyncIValidatorFn } from './types';
export declare function executeAsyncValidators(control: AbstractControl, validators: AsyncIValidatorFn[], invert?: boolean): any[];
