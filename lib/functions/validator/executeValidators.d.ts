import { AbstractControl } from '@angular/forms';
import { IValidatorFn, PlainObject } from './types';
export declare function executeValidators(control: AbstractControl, validators: IValidatorFn[], invert?: boolean): PlainObject[];
