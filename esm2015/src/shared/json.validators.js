import { forkJoin } from 'rxjs-compat/observable/forkJoin';
import { map } from 'rxjs-compat/operator/map';
import * as _ from 'lodash';
import { _executeValidators, _executeAsyncValidators, _mergeObjects, _mergeErrors, isEmpty, isDefined, hasValue, isString, isNumber, isBoolean, isArray, getType, isType, toJavaScriptType, toObservable, xor } from './validator.functions';
import { forEachCopy } from './utility.functions';
import { jsonSchemaFormatTests } from './format-regex.constants';
/**
 * 'JsonValidators' class
 *
 * Provides an extended set of validators to be used by form controls,
 * compatible with standard JSON Schema validation options.
 * http://json-schema.org/latest/json-schema-validation.html
 *
 * Note: This library is designed as a drop-in replacement for the Angular
 * Validators library, and except for one small breaking change to the 'pattern'
 * validator (described below) it can even be imported as a substitute, like so:
 *
 *   import { JsonValidators as Validators } from 'json-validators';
 *
 * and it should work with existing code as a complete replacement.
 *
 * The one exception is the 'pattern' validator, which has been changed to
 * matche partial values by default (the standard 'pattern' validator wrapped
 * all patterns in '^' and '$', forcing them to always match an entire value).
 * However, the old behavior can be restored by simply adding '^' and '$'
 * around your patterns, or by passing an optional second parameter of TRUE.
 * This change is to make the 'pattern' validator match the behavior of a
 * JSON Schema pattern, which allows partial matches, rather than the behavior
 * of an HTML input control pattern, which does not.
 *
 * This library replaces Angular's validators and combination functions
 * with the following validators and transformation functions:
 *
 * Validators:
 *   For all formControls:     required (*), type, enum, const
 *   For text formControls:    minLength (*), maxLength (*), pattern (*), format
 *   For numeric formControls: maximum, exclusiveMaximum,
 *                             minimum, exclusiveMinimum, multipleOf
 *   For formGroup objects:    minProperties, maxProperties, dependencies
 *   For formArray arrays:     minItems, maxItems, uniqueItems, contains
 *   Not used by JSON Schema:  min (*), max (*), requiredTrue (*), email (*)
 * (Validators originally included with Angular are maked with (*).)
 *
 * NOTE / TODO: The dependencies validator is not complete.
 * NOTE / TODO: The contains validator is not complete.
 *
 * Validators not used by JSON Schema (but included for compatibility)
 * and their JSON Schema equivalents:
 *
 *   Angular validator | JSON Schema equivalent
 *   ------------------|-----------------------
 *     min(number)     |   minimum(number)
 *     max(number)     |   maximum(number)
 *     requiredTrue()  |   const(true)
 *     email()         |   format('email')
 *
 * Validator transformation functions:
 *   composeAnyOf, composeOneOf, composeAllOf, composeNot
 * (Angular's original combination funciton, 'compose', is also included for
 * backward compatibility, though it is functionally equivalent to composeAllOf,
 * asside from its more generic error message.)
 *
 * All validators have also been extended to accept an optional second argument
 * which, if passed a TRUE value, causes the validator to perform the opposite
 * of its original finction. (This is used internally to enable 'not' and
 * 'composeOneOf' to function and return useful error messages.)
 *
 * The 'required' validator has also been overloaded so that if called with
 * a boolean parameter (or no parameters) it returns the original validator
 * function (rather than executing it). However, if it is called with an
 * AbstractControl parameter (as was previously required), it behaves
 * exactly as before.
 *
 * This enables all validators (including 'required') to be constructed in
 * exactly the same way, so they can be automatically applied using the
 * equivalent key names and values taken directly from a JSON Schema.
 *
 * This source code is partially derived from Angular,
 * which is Copyright (c) 2014-2017 Google, Inc.
 * Use of this source code is therefore governed by the same MIT-style license
 * that can be found in the LICENSE file at https://angular.io/license
 *
 * Original Angular Validators:
 * https://github.com/angular/angular/blob/master/packages/forms/src/validators.ts
 */
export class JsonValidators {
    static required(input) {
        if (input === undefined) {
            input = true;
        }
        switch (input) {
            case true:// Return required function (do not execute it yet)
                return (control, invert = false) => {
                    if (invert) {
                        return null;
                    } // if not required, always return valid
                    return hasValue(control.value) ? null : { 'required': true };
                };
            case false:// Do nothing (if field is not required, it is always valid)
                return JsonValidators.nullValidator;
            default:// Execute required function
                return hasValue(input.value) ? null : { 'required': true };
        }
    }
    /**
     * 'type' validator
     *
     * Requires a control to only accept values of a specified type,
     * or one of an array of types.
     *
     * Note: SchemaPrimitiveType = 'string'|'number'|'integer'|'boolean'|'null'
     *
     * @param {SchemaPrimitiveType|SchemaPrimitiveType[]} type - type(s) to accept
     * @return {IValidatorFn}
     */
    static type(requiredType) {
        if (!hasValue(requiredType)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const currentValue = control.value;
            const isValid = isArray(requiredType) ?
                requiredType.some(type => isType(currentValue, type)) :
                isType(currentValue, requiredType);
            return xor(isValid, invert) ?
                null : { 'type': { requiredType, currentValue } };
        };
    }
    /**
     * 'enum' validator
     *
     * Requires a control to have a value from an enumerated list of values.
     *
     * Converts types as needed to allow string inputs to still correctly
     * match number, boolean, and null enum values.
     *
     * @param {any[]} allowedValues - array of acceptable values
     * @return {IValidatorFn}
     */
    static enum(allowedValues) {
        if (!isArray(allowedValues)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const currentValue = control.value;
            const isEqual = (enumValue, inputValue) => enumValue === inputValue ||
                (isNumber(enumValue) && +inputValue === +enumValue) ||
                (isBoolean(enumValue, 'strict') &&
                    toJavaScriptType(inputValue, 'boolean') === enumValue) ||
                (enumValue === null && !hasValue(inputValue)) ||
                _.isEqual(enumValue, inputValue);
            const isValid = isArray(currentValue) ?
                currentValue.every(inputValue => allowedValues.some(enumValue => isEqual(enumValue, inputValue))) :
                allowedValues.some(enumValue => isEqual(enumValue, currentValue));
            return xor(isValid, invert) ?
                null : { 'enum': { allowedValues, currentValue } };
        };
    }
    /**
     * 'const' validator
     *
     * Requires a control to have a specific value.
     *
     * Converts types as needed to allow string inputs to still correctly
     * match number, boolean, and null values.
     *
     * TODO: modify to work with objects
     *
     * @param {any[]} requiredValue - required value
     * @return {IValidatorFn}
     */
    static const(requiredValue) {
        if (!hasValue(requiredValue)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const currentValue = control.value;
            const isEqual = (constValue, inputValue) => constValue === inputValue ||
                isNumber(constValue) && +inputValue === +constValue ||
                isBoolean(constValue, 'strict') &&
                    toJavaScriptType(inputValue, 'boolean') === constValue ||
                constValue === null && !hasValue(inputValue);
            const isValid = isEqual(requiredValue, currentValue);
            return xor(isValid, invert) ?
                null : { 'const': { requiredValue, currentValue } };
        };
    }
    /**
     * 'minLength' validator
     *
     * Requires a control's text value to be greater than a specified length.
     *
     * @param {number} minimumLength - minimum allowed string length
     * @param {boolean = false} invert - instead return error object only if valid
     * @return {IValidatorFn}
     */
    static minLength(minimumLength) {
        if (!hasValue(minimumLength)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const currentLength = isString(control.value) ? control.value.length : 0;
            const isValid = currentLength >= minimumLength;
            return xor(isValid, invert) ?
                null : { 'minLength': { minimumLength, currentLength } };
        };
    }
    /**
     * 'maxLength' validator
     *
     * Requires a control's text value to be less than a specified length.
     *
     * @param {number} maximumLength - maximum allowed string length
     * @param {boolean = false} invert - instead return error object only if valid
     * @return {IValidatorFn}
     */
    static maxLength(maximumLength) {
        if (!hasValue(maximumLength)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            const currentLength = isString(control.value) ? control.value.length : 0;
            const isValid = currentLength <= maximumLength;
            return xor(isValid, invert) ?
                null : { 'maxLength': { maximumLength, currentLength } };
        };
    }
    /**
     * 'pattern' validator
     *
     * Note: NOT the same as Angular's default pattern validator.
     *
     * Requires a control's value to match a specified regular expression pattern.
     *
     * This validator changes the behavior of default pattern validator
     * by replacing RegExp(`^${pattern}$`) with RegExp(`${pattern}`),
     * which allows for partial matches.
     *
     * To return to the default funcitonality, and match the entire string,
     * pass TRUE as the optional second parameter.
     *
     * @param {string} pattern - regular expression pattern
     * @param {boolean = false} wholeString - match whole value string?
     * @return {IValidatorFn}
     */
    static pattern(pattern, wholeString = false) {
        if (!hasValue(pattern)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            let regex;
            let requiredPattern;
            if (typeof pattern === 'string') {
                requiredPattern = (wholeString) ? `^${pattern}$` : pattern;
                regex = new RegExp(requiredPattern);
            }
            else {
                requiredPattern = pattern.toString();
                regex = pattern;
            }
            const currentValue = control.value;
            const isValid = isString(currentValue) ? regex.test(currentValue) : false;
            return xor(isValid, invert) ?
                null : { 'pattern': { requiredPattern, currentValue } };
        };
    }
    /**
     * 'format' validator
     *
     * Requires a control to have a value of a certain format.
     *
     * This validator currently checks the following formsts:
     *   date, time, date-time, email, hostname, ipv4, ipv6,
     *   uri, uri-reference, uri-template, url, uuid, color,
     *   json-pointer, relative-json-pointer, regex
     *
     * Fast format regular expressions copied from AJV:
     * https://github.com/epoberezkin/ajv/blob/master/lib/compile/formats.js
     *
     * @param {JsonSchemaFormatNames} requiredFormat - format to check
     * @return {IValidatorFn}
     */
    static format(requiredFormat) {
        if (!hasValue(requiredFormat)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            let isValid;
            const currentValue = control.value;
            if (isString(currentValue)) {
                const formatTest = jsonSchemaFormatTests[requiredFormat];
                if (typeof formatTest === 'object') {
                    isValid = formatTest.test(currentValue);
                }
                else if (typeof formatTest === 'function') {
                    isValid = formatTest(currentValue);
                }
                else {
                    console.error(`format validator error: "${requiredFormat}" is not a recognized format.`);
                    isValid = true;
                }
            }
            else {
                // Allow JavaScript Date objects
                isValid = ['date', 'time', 'date-time'].includes(requiredFormat) &&
                    Object.prototype.toString.call(currentValue) === '[object Date]';
            }
            return xor(isValid, invert) ?
                null : { 'format': { requiredFormat, currentValue } };
        };
    }
    /**
     * 'minimum' validator
     *
     * Requires a control's numeric value to be greater than or equal to
     * a minimum amount.
     *
     * Any non-numeric value is also valid (according to the HTML forms spec,
     * a non-numeric value doesn't have a minimum).
     * https://www.w3.org/TR/html5/forms.html#attr-input-max
     *
     * @param {number} minimum - minimum allowed value
     * @return {IValidatorFn}
     */
    static minimum(minimumValue) {
        if (!hasValue(minimumValue)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const currentValue = control.value;
            const isValid = !isNumber(currentValue) || currentValue >= minimumValue;
            return xor(isValid, invert) ?
                null : { 'minimum': { minimumValue, currentValue } };
        };
    }
    /**
     * 'exclusiveMinimum' validator
     *
     * Requires a control's numeric value to be less than a maximum amount.
     *
     * Any non-numeric value is also valid (according to the HTML forms spec,
     * a non-numeric value doesn't have a maximum).
     * https://www.w3.org/TR/html5/forms.html#attr-input-max
     *
     * @param {number} exclusiveMinimumValue - maximum allowed value
     * @return {IValidatorFn}
     */
    static exclusiveMinimum(exclusiveMinimumValue) {
        if (!hasValue(exclusiveMinimumValue)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const currentValue = control.value;
            const isValid = !isNumber(currentValue) || +currentValue < exclusiveMinimumValue;
            return xor(isValid, invert) ?
                null : { 'exclusiveMinimum': { exclusiveMinimumValue, currentValue } };
        };
    }
    /**
     * 'maximum' validator
     *
     * Requires a control's numeric value to be less than or equal to
     * a maximum amount.
     *
     * Any non-numeric value is also valid (according to the HTML forms spec,
     * a non-numeric value doesn't have a maximum).
     * https://www.w3.org/TR/html5/forms.html#attr-input-max
     *
     * @param {number} maximumValue - maximum allowed value
     * @return {IValidatorFn}
     */
    static maximum(maximumValue) {
        if (!hasValue(maximumValue)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const currentValue = control.value;
            const isValid = !isNumber(currentValue) || +currentValue <= maximumValue;
            return xor(isValid, invert) ?
                null : { 'maximum': { maximumValue, currentValue } };
        };
    }
    /**
     * 'exclusiveMaximum' validator
     *
     * Requires a control's numeric value to be less than a maximum amount.
     *
     * Any non-numeric value is also valid (according to the HTML forms spec,
     * a non-numeric value doesn't have a maximum).
     * https://www.w3.org/TR/html5/forms.html#attr-input-max
     *
     * @param {number} exclusiveMaximumValue - maximum allowed value
     * @return {IValidatorFn}
     */
    static exclusiveMaximum(exclusiveMaximumValue) {
        if (!hasValue(exclusiveMaximumValue)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const currentValue = control.value;
            const isValid = !isNumber(currentValue) || +currentValue < exclusiveMaximumValue;
            return xor(isValid, invert) ?
                null : { 'exclusiveMaximum': { exclusiveMaximumValue, currentValue } };
        };
    }
    /**
     * 'multipleOf' validator
     *
     * Requires a control to have a numeric value that is a multiple
     * of a specified number.
     *
     * @param {number} multipleOfValue - number value must be a multiple of
     * @return {IValidatorFn}
     */
    static multipleOf(multipleOfValue) {
        if (!hasValue(multipleOfValue)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const currentValue = control.value;
            const isValid = isNumber(currentValue) &&
                currentValue % multipleOfValue === 0;
            return xor(isValid, invert) ?
                null : { 'multipleOf': { multipleOfValue, currentValue } };
        };
    }
    /**
     * 'minProperties' validator
     *
     * Requires a form group to have a minimum number of properties (i.e. have
     * values entered in a minimum number of controls within the group).
     *
     * @param {number} minimumProperties - minimum number of properties allowed
     * @return {IValidatorFn}
     */
    static minProperties(minimumProperties) {
        if (!hasValue(minimumProperties)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const currentProperties = Object.keys(control.value).length || 0;
            const isValid = currentProperties >= minimumProperties;
            return xor(isValid, invert) ?
                null : { 'minProperties': { minimumProperties, currentProperties } };
        };
    }
    /**
     * 'maxProperties' validator
     *
     * Requires a form group to have a maximum number of properties (i.e. have
     * values entered in a maximum number of controls within the group).
     *
     * Note: Has no effect if the form group does not contain more than the
     * maximum number of controls.
     *
     * @param {number} maximumProperties - maximum number of properties allowed
     * @return {IValidatorFn}
     */
    static maxProperties(maximumProperties) {
        if (!hasValue(maximumProperties)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            const currentProperties = Object.keys(control.value).length || 0;
            const isValid = currentProperties <= maximumProperties;
            return xor(isValid, invert) ?
                null : { 'maxProperties': { maximumProperties, currentProperties } };
        };
    }
    /**
     * 'dependencies' validator
     *
     * Requires the controls in a form group to meet additional validation
     * criteria, depending on the values of other controls in the group.
     *
     * Examples:
     * https://spacetelescope.github.io/understanding-json-schema/reference/object.html#dependencies
     *
     * @param {any} dependencies - required dependencies
     * @return {IValidatorFn}
     */
    static dependencies(dependencies) {
        if (getType(dependencies) !== 'object' || isEmpty(dependencies)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const allErrors = _mergeObjects(forEachCopy(dependencies, (value, requiringField) => {
                if (!hasValue(control.value[requiringField])) {
                    return null;
                }
                let requiringFieldErrors = {};
                let requiredFields;
                let properties = {};
                if (getType(dependencies[requiringField]) === 'array') {
                    requiredFields = dependencies[requiringField];
                }
                else if (getType(dependencies[requiringField]) === 'object') {
                    requiredFields = dependencies[requiringField]['required'] || [];
                    properties = dependencies[requiringField]['properties'] || {};
                }
                // Validate property dependencies
                for (const requiredField of requiredFields) {
                    if (xor(!hasValue(control.value[requiredField]), invert)) {
                        requiringFieldErrors[requiredField] = { 'required': true };
                    }
                }
                // Validate schema dependencies
                requiringFieldErrors = _mergeObjects(requiringFieldErrors, forEachCopy(properties, (requirements, requiredField) => {
                    const requiredFieldErrors = _mergeObjects(forEachCopy(requirements, (requirement, parameter) => {
                        let validator = null;
                        if (requirement === 'maximum' || requirement === 'minimum') {
                            const exclusive = !!requirements['exclusiveM' + requirement.slice(1)];
                            validator = JsonValidators[requirement](parameter, exclusive);
                        }
                        else if (typeof JsonValidators[requirement] === 'function') {
                            validator = JsonValidators[requirement](parameter);
                        }
                        return !isDefined(validator) ?
                            null : validator(control.value[requiredField]);
                    }));
                    return isEmpty(requiredFieldErrors) ?
                        null : { [requiredField]: requiredFieldErrors };
                }));
                return isEmpty(requiringFieldErrors) ?
                    null : { [requiringField]: requiringFieldErrors };
            }));
            return isEmpty(allErrors) ? null : allErrors;
        };
    }
    /**
     * 'minItems' validator
     *
     * Requires a form array to have a minimum number of values.
     *
     * @param {number} minimumItems - minimum number of items allowed
     * @return {IValidatorFn}
     */
    static minItems(minimumItems) {
        if (!hasValue(minimumItems)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const currentItems = isArray(control.value) ? control.value.length : 0;
            const isValid = currentItems >= minimumItems;
            return xor(isValid, invert) ?
                null : { 'minItems': { minimumItems, currentItems } };
        };
    }
    /**
     * 'maxItems' validator
     *
     * Requires a form array to have a maximum number of values.
     *
     * @param {number} maximumItems - maximum number of items allowed
     * @return {IValidatorFn}
     */
    static maxItems(maximumItems) {
        if (!hasValue(maximumItems)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            const currentItems = isArray(control.value) ? control.value.length : 0;
            const isValid = currentItems <= maximumItems;
            return xor(isValid, invert) ?
                null : { 'maxItems': { maximumItems, currentItems } };
        };
    }
    /**
     * 'uniqueItems' validator
     *
     * Requires values in a form array to be unique.
     *
     * @param {boolean = true} unique? - true to validate, false to disable
     * @return {IValidatorFn}
     */
    static uniqueItems(unique = true) {
        if (!unique) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const sorted = control.value.slice().sort();
            const duplicateItems = [];
            for (let i = 1; i < sorted.length; i++) {
                if (sorted[i - 1] === sorted[i] && duplicateItems.includes(sorted[i])) {
                    duplicateItems.push(sorted[i]);
                }
            }
            const isValid = !duplicateItems.length;
            return xor(isValid, invert) ?
                null : { 'uniqueItems': { duplicateItems } };
        };
    }
    /**
     * 'contains' validator
     *
     * TODO: Complete this validator
     *
     * Requires values in a form array to be unique.
     *
     * @param {boolean = true} unique? - true to validate, false to disable
     * @return {IValidatorFn}
     */
    static contains(requiredItem = true) {
        if (!requiredItem) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value) || !isArray(control.value)) {
                return null;
            }
            const currentItems = control.value;
            // const isValid = currentItems.some(item =>
            //
            // );
            const isValid = true;
            return xor(isValid, invert) ?
                null : { 'contains': { requiredItem, currentItems } };
        };
    }
    /**
     * No-op validator. Included for backward compatibility.
     */
    static nullValidator(control) {
        return null;
    }
    /**
     * Validator transformation functions:
     * composeAnyOf, composeOneOf, composeAllOf, composeNot,
     * compose, composeAsync
     *
     * TODO: Add composeAnyOfAsync, composeOneOfAsync,
     *           composeAllOfAsync, composeNotAsync
     */
    /**
     * 'composeAnyOf' validator combination function
     *
     * Accepts an array of validators and returns a single validator that
     * evaluates to valid if any one or more of the submitted validators are
     * valid. If every validator is invalid, it returns combined errors from
     * all validators.
     *
     * @param {IValidatorFn[]} validators - array of validators to combine
     * @return {IValidatorFn} - single combined validator function
     */
    static composeAnyOf(validators) {
        if (!validators) {
            return null;
        }
        const presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return (control, invert = false) => {
            const arrayOfErrors = _executeValidators(control, presentValidators, invert).filter(isDefined);
            const isValid = validators.length > arrayOfErrors.length;
            return xor(isValid, invert) ?
                null : _mergeObjects(...arrayOfErrors, { 'anyOf': !invert });
        };
    }
    /**
     * 'composeOneOf' validator combination function
     *
     * Accepts an array of validators and returns a single validator that
     * evaluates to valid only if exactly one of the submitted validators
     * is valid. Otherwise returns combined information from all validators,
     * both valid and invalid.
     *
     * @param {IValidatorFn[]} validators - array of validators to combine
     * @return {IValidatorFn} - single combined validator function
     */
    static composeOneOf(validators) {
        if (!validators) {
            return null;
        }
        const presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return (control, invert = false) => {
            const arrayOfErrors = _executeValidators(control, presentValidators);
            const validControls = validators.length - arrayOfErrors.filter(isDefined).length;
            const isValid = validControls === 1;
            if (xor(isValid, invert)) {
                return null;
            }
            const arrayOfValids = _executeValidators(control, presentValidators, invert);
            return _mergeObjects(...arrayOfErrors, ...arrayOfValids, { 'oneOf': !invert });
        };
    }
    /**
     * 'composeAllOf' validator combination function
     *
     * Accepts an array of validators and returns a single validator that
     * evaluates to valid only if all the submitted validators are individually
     * valid. Otherwise it returns combined errors from all invalid validators.
     *
     * @param {IValidatorFn[]} validators - array of validators to combine
     * @return {IValidatorFn} - single combined validator function
     */
    static composeAllOf(validators) {
        if (!validators) {
            return null;
        }
        const presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return (control, invert = false) => {
            const combinedErrors = _mergeErrors(_executeValidators(control, presentValidators, invert));
            const isValid = combinedErrors === null;
            return (xor(isValid, invert)) ?
                null : _mergeObjects(combinedErrors, { 'allOf': !invert });
        };
    }
    /**
     * 'composeNot' validator inversion function
     *
     * Accepts a single validator function and inverts its result.
     * Returns valid if the submitted validator is invalid, and
     * returns invalid if the submitted validator is valid.
     * (Note: this function can itself be inverted
     *   - e.g. composeNot(composeNot(validator)) -
     *   but this can be confusing and is therefore not recommended.)
     *
     * @param {IValidatorFn[]} validators - validator(s) to invert
     * @return {IValidatorFn} - new validator function that returns opposite result
     */
    static composeNot(validator) {
        if (!validator) {
            return null;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const error = validator(control, !invert);
            const isValid = error === null;
            return (xor(isValid, invert)) ?
                null : _mergeObjects(error, { 'not': !invert });
        };
    }
    /**
     * 'compose' validator combination function
     *
     * @param {IValidatorFn[]} validators - array of validators to combine
     * @return {IValidatorFn} - single combined validator function
     */
    static compose(validators) {
        if (!validators) {
            return null;
        }
        const presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return (control, invert = false) => _mergeErrors(_executeValidators(control, presentValidators, invert));
    }
    /**
     * 'composeAsync' async validator combination function
     *
     * @param {AsyncIValidatorFn[]} async validators - array of async validators
     * @return {AsyncIValidatorFn} - single combined async validator function
     */
    static composeAsync(validators) {
        if (!validators) {
            return null;
        }
        const presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return (control) => {
            const observables = _executeAsyncValidators(control, presentValidators).map(toObservable);
            return map.call(forkJoin(observables), _mergeErrors);
        };
    }
    // Additional angular validators (not used by Angualr JSON Schema Form)
    // From https://github.com/angular/angular/blob/master/packages/forms/src/validators.ts
    /**
     * Validator that requires controls to have a value greater than a number.
     */
    static min(min) {
        if (!hasValue(min)) {
            return JsonValidators.nullValidator;
        }
        return (control) => {
            // don't validate empty values to allow optional controls
            if (isEmpty(control.value) || isEmpty(min)) {
                return null;
            }
            const value = parseFloat(control.value);
            const actual = control.value;
            // Controls with NaN values after parsing should be treated as not having a
            // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min
            return isNaN(value) || value >= min ? null : { 'min': { min, actual } };
        };
    }
    /**
     * Validator that requires controls to have a value less than a number.
     */
    static max(max) {
        if (!hasValue(max)) {
            return JsonValidators.nullValidator;
        }
        return (control) => {
            // don't validate empty values to allow optional controls
            if (isEmpty(control.value) || isEmpty(max)) {
                return null;
            }
            const value = parseFloat(control.value);
            const actual = control.value;
            // Controls with NaN values after parsing should be treated as not having a
            // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max
            return isNaN(value) || value <= max ? null : { 'max': { max, actual } };
        };
    }
    /**
     * Validator that requires control value to be true.
     */
    static requiredTrue(control) {
        if (!control) {
            return JsonValidators.nullValidator;
        }
        return control.value === true ? null : { 'required': true };
    }
    /**
     * Validator that performs email validation.
     */
    static email(control) {
        if (!control) {
            return JsonValidators.nullValidator;
        }
        const EMAIL_REGEXP = 
        // tslint:disable-next-line max-line-length
        /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
        return EMAIL_REGEXP.test(control.value) ? null : { 'email': true };
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi52YWxpZGF0b3JzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcjItanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbInNyYy9zaGFyZWQvanNvbi52YWxpZGF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMzRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFL0MsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFNUIsT0FBTyxFQUNMLGtCQUFrQixFQUFFLHVCQUF1QixFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQ3hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFDcEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUVyRCxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUscUJBQXFCLEVBQXlCLE1BQU0sMEJBQTBCLENBQUM7QUFFeEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThFRztBQUNILE1BQU07SUFzQ0osTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUErQjtRQUM3QyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFBQyxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZCxLQUFLLElBQUksQ0FBRSxtREFBbUQ7Z0JBQzVELE1BQU0sQ0FBQyxDQUFDLE9BQXdCLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBeUIsRUFBRTtvQkFDekUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUFDLENBQUMsQ0FBQyx1Q0FBdUM7b0JBQ3BFLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUMvRCxDQUFDLENBQUM7WUFDSixLQUFLLEtBQUssQ0FBRSw0REFBNEQ7Z0JBQ3RFLE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDO1lBQ3RDLFFBQVMsNEJBQTRCO2dCQUNuQyxNQUFNLENBQUMsUUFBUSxDQUFtQixLQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDbEYsQ0FBQztJQUNILENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUF1RDtRQUNqRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQztRQUFDLENBQUM7UUFDckUsTUFBTSxDQUFDLENBQUMsT0FBd0IsRUFBRSxNQUFNLEdBQUcsS0FBSyxFQUF5QixFQUFFO1lBQ3pFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFBQyxDQUFDO1lBQzVDLE1BQU0sWUFBWSxHQUFRLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDeEMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsWUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRixNQUFNLENBQUMsWUFBWSxFQUF1QixZQUFZLENBQUMsQ0FBQztZQUMxRCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxFQUFFLENBQUM7UUFDdEQsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQW9CO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDO1FBQUMsQ0FBQztRQUNyRSxNQUFNLENBQUMsQ0FBQyxPQUF3QixFQUFFLE1BQU0sR0FBRyxLQUFLLEVBQXlCLEVBQUU7WUFDekUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUFDLENBQUM7WUFDNUMsTUFBTSxZQUFZLEdBQVEsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUN4QyxNQUFNLE9BQU8sR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUN4QyxTQUFTLEtBQUssVUFBVTtnQkFDeEIsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssQ0FBQyxTQUFTLENBQUM7Z0JBQ25ELENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7b0JBQzdCLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsS0FBSyxTQUFTLENBQUM7Z0JBQ3hELENBQUMsU0FBUyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDN0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDbkMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLFlBQVksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQzlELE9BQU8sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQy9CLENBQUMsQ0FBQyxDQUFDO2dCQUNKLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDcEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsRUFBRSxDQUFDO1FBQ3ZELENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWtCO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDO1FBQUMsQ0FBQztRQUN0RSxNQUFNLENBQUMsQ0FBQyxPQUF3QixFQUFFLE1BQU0sR0FBRyxLQUFLLEVBQXlCLEVBQUU7WUFDekUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUFDLENBQUM7WUFDNUMsTUFBTSxZQUFZLEdBQVEsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUN4QyxNQUFNLE9BQU8sR0FBRyxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUN6QyxVQUFVLEtBQUssVUFBVTtnQkFDekIsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLENBQUMsVUFBVTtnQkFDbkQsU0FBUyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUM7b0JBQzdCLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsS0FBSyxVQUFVO2dCQUN4RCxVQUFVLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQy9DLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDckQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsRUFBRSxDQUFDO1FBQ3hELENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBcUI7UUFDcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUM7UUFBQyxDQUFDO1FBQ3RFLE1BQU0sQ0FBQyxDQUFDLE9BQXdCLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBeUIsRUFBRTtZQUN6RSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQUMsQ0FBQztZQUM1QyxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLE1BQU0sT0FBTyxHQUFHLGFBQWEsSUFBSSxhQUFhLENBQUM7WUFDL0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsRUFBRSxDQUFDO1FBQzdELENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBcUI7UUFDcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUM7UUFBQyxDQUFDO1FBQ3RFLE1BQU0sQ0FBQyxDQUFDLE9BQXdCLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBeUIsRUFBRTtZQUN6RSxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLE1BQU0sT0FBTyxHQUFHLGFBQWEsSUFBSSxhQUFhLENBQUM7WUFDL0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsRUFBRSxDQUFDO1FBQzdELENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDSCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQXNCLEVBQUUsV0FBVyxHQUFHLEtBQUs7UUFDeEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUM7UUFBQyxDQUFDO1FBQ2hFLE1BQU0sQ0FBQyxDQUFDLE9BQXdCLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBeUIsRUFBRTtZQUN6RSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQUMsQ0FBQztZQUM1QyxJQUFJLEtBQWEsQ0FBQztZQUNsQixJQUFJLGVBQXVCLENBQUM7WUFDNUIsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDaEMsZUFBZSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDM0QsS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3RDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixlQUFlLEdBQUcsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNyQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1lBQ2xCLENBQUM7WUFDRCxNQUFNLFlBQVksR0FBVyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQzNDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQzFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQztRQUM1RCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFxQztRQUNqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQztRQUFDLENBQUM7UUFDdkUsTUFBTSxDQUFDLENBQUMsT0FBd0IsRUFBRSxNQUFNLEdBQUcsS0FBSyxFQUF5QixFQUFFO1lBQ3pFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFBQyxDQUFDO1lBQzVDLElBQUksT0FBZ0IsQ0FBQztZQUNyQixNQUFNLFlBQVksR0FBZ0IsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNoRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLFVBQVUsR0FBb0IscUJBQXFCLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sVUFBVSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ25DLE9BQU8sR0FBWSxVQUFXLENBQUMsSUFBSSxDQUFTLFlBQVksQ0FBQyxDQUFDO2dCQUM1RCxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLFVBQVUsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUM1QyxPQUFPLEdBQWMsVUFBVyxDQUFTLFlBQVksQ0FBQyxDQUFDO2dCQUN6RCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLGNBQWMsK0JBQStCLENBQUMsQ0FBQztvQkFDekYsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDakIsQ0FBQztZQUNILENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixnQ0FBZ0M7Z0JBQ2hDLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztvQkFDOUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLGVBQWUsQ0FBQztZQUNyRSxDQUFDO1lBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsRUFBRSxDQUFDO1FBQzFELENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQW9CO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDO1FBQUMsQ0FBQztRQUNyRSxNQUFNLENBQUMsQ0FBQyxPQUF3QixFQUFFLE1BQU0sR0FBRyxLQUFLLEVBQXlCLEVBQUU7WUFDekUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUFDLENBQUM7WUFDNUMsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNuQyxNQUFNLE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxZQUFZLElBQUksWUFBWSxDQUFDO1lBQ3hFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQztRQUN6RCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxNQUFNLENBQUMsZ0JBQWdCLENBQUMscUJBQTZCO1FBQ25ELEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUM7UUFBQyxDQUFDO1FBQzlFLE1BQU0sQ0FBQyxDQUFDLE9BQXdCLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBeUIsRUFBRTtZQUN6RSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQUMsQ0FBQztZQUM1QyxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ25DLE1BQU0sT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLHFCQUFxQixDQUFDO1lBQ2pGLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxrQkFBa0IsRUFBRSxFQUFFLHFCQUFxQixFQUFFLFlBQVksRUFBRSxFQUFFLENBQUM7UUFDM0UsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBb0I7UUFDakMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUM7UUFBQyxDQUFDO1FBQ3JFLE1BQU0sQ0FBQyxDQUFDLE9BQXdCLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBeUIsRUFBRTtZQUN6RSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQUMsQ0FBQztZQUM1QyxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ25DLE1BQU0sT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLFlBQVksQ0FBQztZQUN6RSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxFQUFFLENBQUM7UUFDekQsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsTUFBTSxDQUFDLGdCQUFnQixDQUFDLHFCQUE2QjtRQUNuRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDO1FBQUMsQ0FBQztRQUM5RSxNQUFNLENBQUMsQ0FBQyxPQUF3QixFQUFFLE1BQU0sR0FBRyxLQUFLLEVBQXlCLEVBQUU7WUFDekUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUFDLENBQUM7WUFDNUMsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNuQyxNQUFNLE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxxQkFBcUIsQ0FBQztZQUNqRixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxxQkFBcUIsRUFBRSxZQUFZLEVBQUUsRUFBRSxDQUFDO1FBQzNFLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsZUFBdUI7UUFDdkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUM7UUFBQyxDQUFDO1FBQ3hFLE1BQU0sQ0FBQyxDQUFDLE9BQXdCLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBeUIsRUFBRTtZQUN6RSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQUMsQ0FBQztZQUM1QyxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ25DLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUM7Z0JBQ3BDLFlBQVksR0FBRyxlQUFlLEtBQUssQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLEVBQUUsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQztRQUMvRCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxNQUFNLENBQUMsYUFBYSxDQUFDLGlCQUF5QjtRQUM1QyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDO1FBQUMsQ0FBQztRQUMxRSxNQUFNLENBQUMsQ0FBQyxPQUF3QixFQUFFLE1BQU0sR0FBRyxLQUFLLEVBQXlCLEVBQUU7WUFDekUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUFDLENBQUM7WUFDNUMsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sT0FBTyxHQUFHLGlCQUFpQixJQUFJLGlCQUFpQixDQUFDO1lBQ3ZELE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxlQUFlLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxFQUFFLENBQUM7UUFDekUsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FBQyxpQkFBeUI7UUFDNUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQztRQUFDLENBQUM7UUFDMUUsTUFBTSxDQUFDLENBQUMsT0FBd0IsRUFBRSxNQUFNLEdBQUcsS0FBSyxFQUF5QixFQUFFO1lBQ3pFLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztZQUNqRSxNQUFNLE9BQU8sR0FBRyxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQztZQUN2RCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsZUFBZSxFQUFFLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxDQUFDO1FBQ3pFLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBaUI7UUFDbkMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLFFBQVEsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDO1FBQ3RDLENBQUM7UUFDRCxNQUFNLENBQUMsQ0FBQyxPQUF3QixFQUFFLE1BQU0sR0FBRyxLQUFLLEVBQXlCLEVBQUU7WUFDekUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUFDLENBQUM7WUFDNUMsTUFBTSxTQUFTLEdBQUcsYUFBYSxDQUM3QixXQUFXLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRSxFQUFFO2dCQUNsRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQUMsQ0FBQztnQkFDOUQsSUFBSSxvQkFBb0IsR0FBcUIsRUFBRyxDQUFDO2dCQUNqRCxJQUFJLGNBQXdCLENBQUM7Z0JBQzdCLElBQUksVUFBVSxHQUFxQixFQUFHLENBQUM7Z0JBQ3ZDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUMsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUN0RCxjQUFjLEdBQUcsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUNoRCxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDOUQsY0FBYyxHQUFHLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ2hFLFVBQVUsR0FBRyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRyxDQUFDO2dCQUNqRSxDQUFDO2dCQUVELGlDQUFpQztnQkFDakMsR0FBRyxDQUFDLENBQUMsTUFBTSxhQUFhLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQztvQkFDM0MsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3pELG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDO29CQUM3RCxDQUFDO2dCQUNILENBQUM7Z0JBRUQsK0JBQStCO2dCQUMvQixvQkFBb0IsR0FBRyxhQUFhLENBQUMsb0JBQW9CLEVBQ3ZELFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLEVBQUU7b0JBQ3RELE1BQU0sbUJBQW1CLEdBQUcsYUFBYSxDQUN2QyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxFQUFFO3dCQUNuRCxJQUFJLFNBQVMsR0FBaUIsSUFBSSxDQUFDO3dCQUNuQyxFQUFFLENBQUMsQ0FBQyxXQUFXLEtBQUssU0FBUyxJQUFJLFdBQVcsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDOzRCQUMzRCxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3RFLFNBQVMsR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO3dCQUNoRSxDQUFDO3dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLGNBQWMsQ0FBQyxXQUFXLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDOzRCQUM3RCxTQUFTLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNyRCxDQUFDO3dCQUNELE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzRCQUM1QixJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7b0JBQ25ELENBQUMsQ0FBQyxDQUNILENBQUM7b0JBQ0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7d0JBQ25DLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLG1CQUFtQixFQUFFLENBQUM7Z0JBQ3BELENBQUMsQ0FBQyxDQUNILENBQUM7Z0JBQ0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7b0JBQ3BDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUFFLG9CQUFvQixFQUFFLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQ0gsQ0FBQztZQUNGLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQy9DLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFvQjtRQUNsQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQztRQUFDLENBQUM7UUFDckUsTUFBTSxDQUFDLENBQUMsT0FBd0IsRUFBRSxNQUFNLEdBQUcsS0FBSyxFQUF5QixFQUFFO1lBQ3pFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFBQyxDQUFDO1lBQzVDLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkUsTUFBTSxPQUFPLEdBQUcsWUFBWSxJQUFJLFlBQVksQ0FBQztZQUM3QyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxFQUFFLENBQUM7UUFDMUQsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQW9CO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDO1FBQUMsQ0FBQztRQUNyRSxNQUFNLENBQUMsQ0FBQyxPQUF3QixFQUFFLE1BQU0sR0FBRyxLQUFLLEVBQXlCLEVBQUU7WUFDekUsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RSxNQUFNLE9BQU8sR0FBRyxZQUFZLElBQUksWUFBWSxDQUFDO1lBQzdDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQztRQUMxRCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUk7UUFDOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUM7UUFBQyxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxDQUFDLE9BQXdCLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBeUIsRUFBRTtZQUN6RSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQUMsQ0FBQztZQUM1QyxNQUFNLE1BQU0sR0FBVSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ25ELE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztZQUMxQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDdkMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksY0FBYyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RFLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLENBQUM7WUFDSCxDQUFDO1lBQ0QsTUFBTSxPQUFPLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO1lBQ3ZDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxhQUFhLEVBQUUsRUFBRSxjQUFjLEVBQUUsRUFBRSxDQUFDO1FBQ2pELENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksR0FBRyxJQUFJO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDO1FBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUMsQ0FBQyxPQUF3QixFQUFFLE1BQU0sR0FBRyxLQUFLLEVBQXlCLEVBQUU7WUFDekUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFBQyxDQUFDO1lBQ3ZFLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDbkMsNENBQTRDO1lBQzVDLEVBQUU7WUFDRixLQUFLO1lBQ0wsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQztRQUMxRCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQXdCO1FBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUVIOzs7Ozs7Ozs7O09BVUc7SUFDSCxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQTBCO1FBQzVDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFBQyxDQUFDO1FBQ2pDLE1BQU0saUJBQWlCLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2RCxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFBQyxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxDQUFDLE9BQXdCLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBeUIsRUFBRTtZQUN6RSxNQUFNLGFBQWEsR0FDakIsa0JBQWtCLENBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMzRSxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUM7WUFDekQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsR0FBRyxhQUFhLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUEwQjtRQUM1QyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQUMsQ0FBQztRQUNqQyxNQUFNLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkQsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsQ0FBQyxPQUF3QixFQUFFLE1BQU0sR0FBRyxLQUFLLEVBQXlCLEVBQUU7WUFDekUsTUFBTSxhQUFhLEdBQ2pCLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sYUFBYSxHQUNqQixVQUFVLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzdELE1BQU0sT0FBTyxHQUFHLGFBQWEsS0FBSyxDQUFDLENBQUM7WUFDcEMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUFDLENBQUM7WUFDMUMsTUFBTSxhQUFhLEdBQ2pCLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN6RCxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsYUFBYSxFQUFFLEdBQUcsYUFBYSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNqRixDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUEwQjtRQUM1QyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQUMsQ0FBQztRQUNqQyxNQUFNLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkQsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsQ0FBQyxPQUF3QixFQUFFLE1BQU0sR0FBRyxLQUFLLEVBQXlCLEVBQUU7WUFDekUsTUFBTSxjQUFjLEdBQUcsWUFBWSxDQUNqQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQ3ZELENBQUM7WUFDRixNQUFNLE9BQU8sR0FBRyxjQUFjLEtBQUssSUFBSSxDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQXVCO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFBQyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxDQUFDLE9BQXdCLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBeUIsRUFBRTtZQUN6RSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQUMsQ0FBQztZQUM1QyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUMsTUFBTSxPQUFPLEdBQUcsS0FBSyxLQUFLLElBQUksQ0FBQztZQUMvQixNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQTBCO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFBQyxDQUFDO1FBQ2pDLE1BQU0saUJBQWlCLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2RCxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFBQyxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxDQUFDLE9BQXdCLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBeUIsRUFBRSxDQUN6RSxZQUFZLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUErQjtRQUNqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQUMsQ0FBQztRQUNqQyxNQUFNLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkQsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsQ0FBQyxPQUF3QixFQUFFLEVBQUU7WUFDbEMsTUFBTSxXQUFXLEdBQ2YsdUJBQXVCLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3hFLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsdUVBQXVFO0lBQ3ZFLHVGQUF1RjtJQUV2Rjs7T0FFRztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBVztRQUNwQixFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQztRQUFDLENBQUM7UUFDNUQsTUFBTSxDQUFDLENBQUMsT0FBd0IsRUFBeUIsRUFBRTtZQUN6RCx5REFBeUQ7WUFDekQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFBQyxDQUFDO1lBQzVELE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUM3QiwyRUFBMkU7WUFDM0UsMEZBQTBGO1lBQzFGLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDO1FBQzFFLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBVztRQUNwQixFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQztRQUFDLENBQUM7UUFDNUQsTUFBTSxDQUFDLENBQUMsT0FBd0IsRUFBeUIsRUFBRTtZQUN6RCx5REFBeUQ7WUFDekQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFBQyxDQUFDO1lBQzVELE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUM3QiwyRUFBMkU7WUFDM0UsMEZBQTBGO1lBQzFGLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDO1FBQzFFLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBd0I7UUFDMUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUM7UUFBQyxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUM5RCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQXdCO1FBQ25DLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDO1FBQUMsQ0FBQztRQUN0RCxNQUFNLFlBQVk7UUFDaEIsMkNBQTJDO1FBQzNDLDRMQUE0TCxDQUFDO1FBQy9MLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNyRSxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIFZhbGlkYXRpb25FcnJvcnMsIFZhbGlkYXRvckZuIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMtY29tcGF0L09ic2VydmFibGUnO1xuaW1wb3J0IHsgZm9ya0pvaW4gfSBmcm9tICdyeGpzLWNvbXBhdC9vYnNlcnZhYmxlL2ZvcmtKb2luJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMtY29tcGF0L29wZXJhdG9yL21hcCc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHtcbiAgX2V4ZWN1dGVWYWxpZGF0b3JzLCBfZXhlY3V0ZUFzeW5jVmFsaWRhdG9ycywgX21lcmdlT2JqZWN0cywgX21lcmdlRXJyb3JzLFxuICBpc0VtcHR5LCBpc0RlZmluZWQsIGhhc1ZhbHVlLCBpc1N0cmluZywgaXNOdW1iZXIsIGlzQm9vbGVhbiwgaXNBcnJheSxcbiAgZ2V0VHlwZSwgaXNUeXBlLCB0b0phdmFTY3JpcHRUeXBlLCB0b09ic2VydmFibGUsIHhvciwgU2NoZW1hUHJpbWl0aXZlVHlwZSxcbiAgUGxhaW5PYmplY3QsIElWYWxpZGF0b3JGbiwgQXN5bmNJVmFsaWRhdG9yRm5cbn0gZnJvbSAnLi92YWxpZGF0b3IuZnVuY3Rpb25zJztcbmltcG9ydCB7IGZvckVhY2hDb3B5IH0gZnJvbSAnLi91dGlsaXR5LmZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBqc29uU2NoZW1hRm9ybWF0VGVzdHMsIEpzb25TY2hlbWFGb3JtYXROYW1lcyB9IGZyb20gJy4vZm9ybWF0LXJlZ2V4LmNvbnN0YW50cyc7XG5cbi8qKlxuICogJ0pzb25WYWxpZGF0b3JzJyBjbGFzc1xuICpcbiAqIFByb3ZpZGVzIGFuIGV4dGVuZGVkIHNldCBvZiB2YWxpZGF0b3JzIHRvIGJlIHVzZWQgYnkgZm9ybSBjb250cm9scyxcbiAqIGNvbXBhdGlibGUgd2l0aCBzdGFuZGFyZCBKU09OIFNjaGVtYSB2YWxpZGF0aW9uIG9wdGlvbnMuXG4gKiBodHRwOi8vanNvbi1zY2hlbWEub3JnL2xhdGVzdC9qc29uLXNjaGVtYS12YWxpZGF0aW9uLmh0bWxcbiAqXG4gKiBOb3RlOiBUaGlzIGxpYnJhcnkgaXMgZGVzaWduZWQgYXMgYSBkcm9wLWluIHJlcGxhY2VtZW50IGZvciB0aGUgQW5ndWxhclxuICogVmFsaWRhdG9ycyBsaWJyYXJ5LCBhbmQgZXhjZXB0IGZvciBvbmUgc21hbGwgYnJlYWtpbmcgY2hhbmdlIHRvIHRoZSAncGF0dGVybidcbiAqIHZhbGlkYXRvciAoZGVzY3JpYmVkIGJlbG93KSBpdCBjYW4gZXZlbiBiZSBpbXBvcnRlZCBhcyBhIHN1YnN0aXR1dGUsIGxpa2Ugc286XG4gKlxuICogICBpbXBvcnQgeyBKc29uVmFsaWRhdG9ycyBhcyBWYWxpZGF0b3JzIH0gZnJvbSAnanNvbi12YWxpZGF0b3JzJztcbiAqXG4gKiBhbmQgaXQgc2hvdWxkIHdvcmsgd2l0aCBleGlzdGluZyBjb2RlIGFzIGEgY29tcGxldGUgcmVwbGFjZW1lbnQuXG4gKlxuICogVGhlIG9uZSBleGNlcHRpb24gaXMgdGhlICdwYXR0ZXJuJyB2YWxpZGF0b3IsIHdoaWNoIGhhcyBiZWVuIGNoYW5nZWQgdG9cbiAqIG1hdGNoZSBwYXJ0aWFsIHZhbHVlcyBieSBkZWZhdWx0ICh0aGUgc3RhbmRhcmQgJ3BhdHRlcm4nIHZhbGlkYXRvciB3cmFwcGVkXG4gKiBhbGwgcGF0dGVybnMgaW4gJ14nIGFuZCAnJCcsIGZvcmNpbmcgdGhlbSB0byBhbHdheXMgbWF0Y2ggYW4gZW50aXJlIHZhbHVlKS5cbiAqIEhvd2V2ZXIsIHRoZSBvbGQgYmVoYXZpb3IgY2FuIGJlIHJlc3RvcmVkIGJ5IHNpbXBseSBhZGRpbmcgJ14nIGFuZCAnJCdcbiAqIGFyb3VuZCB5b3VyIHBhdHRlcm5zLCBvciBieSBwYXNzaW5nIGFuIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXIgb2YgVFJVRS5cbiAqIFRoaXMgY2hhbmdlIGlzIHRvIG1ha2UgdGhlICdwYXR0ZXJuJyB2YWxpZGF0b3IgbWF0Y2ggdGhlIGJlaGF2aW9yIG9mIGFcbiAqIEpTT04gU2NoZW1hIHBhdHRlcm4sIHdoaWNoIGFsbG93cyBwYXJ0aWFsIG1hdGNoZXMsIHJhdGhlciB0aGFuIHRoZSBiZWhhdmlvclxuICogb2YgYW4gSFRNTCBpbnB1dCBjb250cm9sIHBhdHRlcm4sIHdoaWNoIGRvZXMgbm90LlxuICpcbiAqIFRoaXMgbGlicmFyeSByZXBsYWNlcyBBbmd1bGFyJ3MgdmFsaWRhdG9ycyBhbmQgY29tYmluYXRpb24gZnVuY3Rpb25zXG4gKiB3aXRoIHRoZSBmb2xsb3dpbmcgdmFsaWRhdG9ycyBhbmQgdHJhbnNmb3JtYXRpb24gZnVuY3Rpb25zOlxuICpcbiAqIFZhbGlkYXRvcnM6XG4gKiAgIEZvciBhbGwgZm9ybUNvbnRyb2xzOiAgICAgcmVxdWlyZWQgKCopLCB0eXBlLCBlbnVtLCBjb25zdFxuICogICBGb3IgdGV4dCBmb3JtQ29udHJvbHM6ICAgIG1pbkxlbmd0aCAoKiksIG1heExlbmd0aCAoKiksIHBhdHRlcm4gKCopLCBmb3JtYXRcbiAqICAgRm9yIG51bWVyaWMgZm9ybUNvbnRyb2xzOiBtYXhpbXVtLCBleGNsdXNpdmVNYXhpbXVtLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW0sIGV4Y2x1c2l2ZU1pbmltdW0sIG11bHRpcGxlT2ZcbiAqICAgRm9yIGZvcm1Hcm91cCBvYmplY3RzOiAgICBtaW5Qcm9wZXJ0aWVzLCBtYXhQcm9wZXJ0aWVzLCBkZXBlbmRlbmNpZXNcbiAqICAgRm9yIGZvcm1BcnJheSBhcnJheXM6ICAgICBtaW5JdGVtcywgbWF4SXRlbXMsIHVuaXF1ZUl0ZW1zLCBjb250YWluc1xuICogICBOb3QgdXNlZCBieSBKU09OIFNjaGVtYTogIG1pbiAoKiksIG1heCAoKiksIHJlcXVpcmVkVHJ1ZSAoKiksIGVtYWlsICgqKVxuICogKFZhbGlkYXRvcnMgb3JpZ2luYWxseSBpbmNsdWRlZCB3aXRoIEFuZ3VsYXIgYXJlIG1ha2VkIHdpdGggKCopLilcbiAqXG4gKiBOT1RFIC8gVE9ETzogVGhlIGRlcGVuZGVuY2llcyB2YWxpZGF0b3IgaXMgbm90IGNvbXBsZXRlLlxuICogTk9URSAvIFRPRE86IFRoZSBjb250YWlucyB2YWxpZGF0b3IgaXMgbm90IGNvbXBsZXRlLlxuICpcbiAqIFZhbGlkYXRvcnMgbm90IHVzZWQgYnkgSlNPTiBTY2hlbWEgKGJ1dCBpbmNsdWRlZCBmb3IgY29tcGF0aWJpbGl0eSlcbiAqIGFuZCB0aGVpciBKU09OIFNjaGVtYSBlcXVpdmFsZW50czpcbiAqXG4gKiAgIEFuZ3VsYXIgdmFsaWRhdG9yIHwgSlNPTiBTY2hlbWEgZXF1aXZhbGVudFxuICogICAtLS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICAgICBtaW4obnVtYmVyKSAgICAgfCAgIG1pbmltdW0obnVtYmVyKVxuICogICAgIG1heChudW1iZXIpICAgICB8ICAgbWF4aW11bShudW1iZXIpXG4gKiAgICAgcmVxdWlyZWRUcnVlKCkgIHwgICBjb25zdCh0cnVlKVxuICogICAgIGVtYWlsKCkgICAgICAgICB8ICAgZm9ybWF0KCdlbWFpbCcpXG4gKlxuICogVmFsaWRhdG9yIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9uczpcbiAqICAgY29tcG9zZUFueU9mLCBjb21wb3NlT25lT2YsIGNvbXBvc2VBbGxPZiwgY29tcG9zZU5vdFxuICogKEFuZ3VsYXIncyBvcmlnaW5hbCBjb21iaW5hdGlvbiBmdW5jaXRvbiwgJ2NvbXBvc2UnLCBpcyBhbHNvIGluY2x1ZGVkIGZvclxuICogYmFja3dhcmQgY29tcGF0aWJpbGl0eSwgdGhvdWdoIGl0IGlzIGZ1bmN0aW9uYWxseSBlcXVpdmFsZW50IHRvIGNvbXBvc2VBbGxPZixcbiAqIGFzc2lkZSBmcm9tIGl0cyBtb3JlIGdlbmVyaWMgZXJyb3IgbWVzc2FnZS4pXG4gKlxuICogQWxsIHZhbGlkYXRvcnMgaGF2ZSBhbHNvIGJlZW4gZXh0ZW5kZWQgdG8gYWNjZXB0IGFuIG9wdGlvbmFsIHNlY29uZCBhcmd1bWVudFxuICogd2hpY2gsIGlmIHBhc3NlZCBhIFRSVUUgdmFsdWUsIGNhdXNlcyB0aGUgdmFsaWRhdG9yIHRvIHBlcmZvcm0gdGhlIG9wcG9zaXRlXG4gKiBvZiBpdHMgb3JpZ2luYWwgZmluY3Rpb24uIChUaGlzIGlzIHVzZWQgaW50ZXJuYWxseSB0byBlbmFibGUgJ25vdCcgYW5kXG4gKiAnY29tcG9zZU9uZU9mJyB0byBmdW5jdGlvbiBhbmQgcmV0dXJuIHVzZWZ1bCBlcnJvciBtZXNzYWdlcy4pXG4gKlxuICogVGhlICdyZXF1aXJlZCcgdmFsaWRhdG9yIGhhcyBhbHNvIGJlZW4gb3ZlcmxvYWRlZCBzbyB0aGF0IGlmIGNhbGxlZCB3aXRoXG4gKiBhIGJvb2xlYW4gcGFyYW1ldGVyIChvciBubyBwYXJhbWV0ZXJzKSBpdCByZXR1cm5zIHRoZSBvcmlnaW5hbCB2YWxpZGF0b3JcbiAqIGZ1bmN0aW9uIChyYXRoZXIgdGhhbiBleGVjdXRpbmcgaXQpLiBIb3dldmVyLCBpZiBpdCBpcyBjYWxsZWQgd2l0aCBhblxuICogQWJzdHJhY3RDb250cm9sIHBhcmFtZXRlciAoYXMgd2FzIHByZXZpb3VzbHkgcmVxdWlyZWQpLCBpdCBiZWhhdmVzXG4gKiBleGFjdGx5IGFzIGJlZm9yZS5cbiAqXG4gKiBUaGlzIGVuYWJsZXMgYWxsIHZhbGlkYXRvcnMgKGluY2x1ZGluZyAncmVxdWlyZWQnKSB0byBiZSBjb25zdHJ1Y3RlZCBpblxuICogZXhhY3RseSB0aGUgc2FtZSB3YXksIHNvIHRoZXkgY2FuIGJlIGF1dG9tYXRpY2FsbHkgYXBwbGllZCB1c2luZyB0aGVcbiAqIGVxdWl2YWxlbnQga2V5IG5hbWVzIGFuZCB2YWx1ZXMgdGFrZW4gZGlyZWN0bHkgZnJvbSBhIEpTT04gU2NoZW1hLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgcGFydGlhbGx5IGRlcml2ZWQgZnJvbSBBbmd1bGFyLFxuICogd2hpY2ggaXMgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTcgR29vZ2xlLCBJbmMuXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyB0aGVyZWZvcmUgZ292ZXJuZWQgYnkgdGhlIHNhbWUgTUlULXN0eWxlIGxpY2Vuc2VcbiAqIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqXG4gKiBPcmlnaW5hbCBBbmd1bGFyIFZhbGlkYXRvcnM6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2Jsb2IvbWFzdGVyL3BhY2thZ2VzL2Zvcm1zL3NyYy92YWxpZGF0b3JzLnRzXG4gKi9cbmV4cG9ydCBjbGFzcyBKc29uVmFsaWRhdG9ycyB7XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRvciBmdW5jdGlvbnM6XG4gICAqXG4gICAqIEZvciBhbGwgZm9ybUNvbnRyb2xzOiAgICAgcmVxdWlyZWQsIHR5cGUsIGVudW0sIGNvbnN0XG4gICAqIEZvciB0ZXh0IGZvcm1Db250cm9sczogICAgbWluTGVuZ3RoLCBtYXhMZW5ndGgsIHBhdHRlcm4sIGZvcm1hdFxuICAgKiBGb3IgbnVtZXJpYyBmb3JtQ29udHJvbHM6IG1heGltdW0sIGV4Y2x1c2l2ZU1heGltdW0sXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bSwgZXhjbHVzaXZlTWluaW11bSwgbXVsdGlwbGVPZlxuICAgKiBGb3IgZm9ybUdyb3VwIG9iamVjdHM6ICAgIG1pblByb3BlcnRpZXMsIG1heFByb3BlcnRpZXMsIGRlcGVuZGVuY2llc1xuICAgKiBGb3IgZm9ybUFycmF5IGFycmF5czogICAgIG1pbkl0ZW1zLCBtYXhJdGVtcywgdW5pcXVlSXRlbXMsIGNvbnRhaW5zXG4gICAqXG4gICAqIFRPRE86IGZpbmlzaCBkZXBlbmRlbmNpZXMgdmFsaWRhdG9yXG4gICAqL1xuXG4gIC8qKlxuICAgKiAncmVxdWlyZWQnIHZhbGlkYXRvclxuICAgKlxuICAgKiBUaGlzIHZhbGlkYXRvciBpcyBvdmVybG9hZGVkLCBjb21wYXJlZCB0byB0aGUgZGVmYXVsdCByZXF1aXJlZCB2YWxpZGF0b3IuXG4gICAqIElmIGNhbGxlZCB3aXRoIG5vIHBhcmFtZXRlcnMsIG9yIFRSVUUsIHRoaXMgdmFsaWRhdG9yIHJldHVybnMgdGhlXG4gICAqICdyZXF1aXJlZCcgdmFsaWRhdG9yIGZ1bmN0aW9uIChyYXRoZXIgdGhhbiBleGVjdXRpbmcgaXQpLiBUaGlzIG1hdGNoZXNcbiAgICogdGhlIGJlaGF2aW9yIG9mIGFsbCBvdGhlciB2YWxpZGF0b3JzIGluIHRoaXMgbGlicmFyeS5cbiAgICpcbiAgICogSWYgdGhpcyB2YWxpZGF0b3IgaXMgY2FsbGVkIHdpdGggYW4gQWJzdHJhY3RDb250cm9sIHBhcmFtZXRlclxuICAgKiAoYXMgd2FzIHByZXZpb3VzbHkgcmVxdWlyZWQpIGl0IGJlaGF2ZXMgdGhlIHNhbWUgYXMgQW5ndWxhcidzIGRlZmF1bHRcbiAgICogcmVxdWlyZWQgdmFsaWRhdG9yLCBhbmQgcmV0dXJucyBhbiBlcnJvciBpZiB0aGUgY29udHJvbCBpcyBlbXB0eS5cbiAgICpcbiAgICogT2xkIGJlaGF2aW9yOiAoaWYgaW5wdXQgdHlwZSA9IEFic3RyYWN0Q29udHJvbClcbiAgICogQHBhcmFtIHtBYnN0cmFjdENvbnRyb2x9IGNvbnRyb2wgLSByZXF1aXJlZCBjb250cm9sXG4gICAqIEByZXR1cm4ge3tba2V5OiBzdHJpbmddOiBib29sZWFufX0gLSByZXR1cm5zIGVycm9yIG1lc3NhZ2UgaWYgbm8gaW5wdXRcbiAgICpcbiAgICogTmV3IGJlaGF2aW9yOiAoaWYgbm8gaW5wdXQsIG9yIGlucHV0IHR5cGUgPSBib29sZWFuKVxuICAgKiBAcGFyYW0ge2Jvb2xlYW4gPSB0cnVlfSByZXF1aXJlZD8gLSB0cnVlIHRvIHZhbGlkYXRlLCBmYWxzZSB0byBkaXNhYmxlXG4gICAqIEByZXR1cm4ge0lWYWxpZGF0b3JGbn0gLSByZXR1cm5zIHRoZSAncmVxdWlyZWQnIHZhbGlkYXRvciBmdW5jdGlvbiBpdHNlbGZcbiAgICovXG4gIHN0YXRpYyByZXF1aXJlZChpbnB1dDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9yc3xudWxsO1xuICBzdGF0aWMgcmVxdWlyZWQoaW5wdXQ/OiBib29sZWFuKTogSVZhbGlkYXRvckZuO1xuXG4gIHN0YXRpYyByZXF1aXJlZChpbnB1dD86IEFic3RyYWN0Q29udHJvbHxib29sZWFuKTogVmFsaWRhdGlvbkVycm9yc3xudWxsfElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKGlucHV0ID09PSB1bmRlZmluZWQpIHsgaW5wdXQgPSB0cnVlOyB9XG4gICAgc3dpdGNoIChpbnB1dCkge1xuICAgICAgY2FzZSB0cnVlOiAvLyBSZXR1cm4gcmVxdWlyZWQgZnVuY3Rpb24gKGRvIG5vdCBleGVjdXRlIGl0IHlldClcbiAgICAgICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgICAgICBpZiAoaW52ZXJ0KSB7IHJldHVybiBudWxsOyB9IC8vIGlmIG5vdCByZXF1aXJlZCwgYWx3YXlzIHJldHVybiB2YWxpZFxuICAgICAgICAgIHJldHVybiBoYXNWYWx1ZShjb250cm9sLnZhbHVlKSA/IG51bGwgOiB7ICdyZXF1aXJlZCc6IHRydWUgfTtcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgZmFsc2U6IC8vIERvIG5vdGhpbmcgKGlmIGZpZWxkIGlzIG5vdCByZXF1aXJlZCwgaXQgaXMgYWx3YXlzIHZhbGlkKVxuICAgICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvcjtcbiAgICAgIGRlZmF1bHQ6IC8vIEV4ZWN1dGUgcmVxdWlyZWQgZnVuY3Rpb25cbiAgICAgICAgcmV0dXJuIGhhc1ZhbHVlKCg8QWJzdHJhY3RDb250cm9sPmlucHV0KS52YWx1ZSkgPyBudWxsIDogeyAncmVxdWlyZWQnOiB0cnVlIH07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICd0eXBlJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBjb250cm9sIHRvIG9ubHkgYWNjZXB0IHZhbHVlcyBvZiBhIHNwZWNpZmllZCB0eXBlLFxuICAgKiBvciBvbmUgb2YgYW4gYXJyYXkgb2YgdHlwZXMuXG4gICAqXG4gICAqIE5vdGU6IFNjaGVtYVByaW1pdGl2ZVR5cGUgPSAnc3RyaW5nJ3wnbnVtYmVyJ3wnaW50ZWdlcid8J2Jvb2xlYW4nfCdudWxsJ1xuICAgKlxuICAgKiBAcGFyYW0ge1NjaGVtYVByaW1pdGl2ZVR5cGV8U2NoZW1hUHJpbWl0aXZlVHlwZVtdfSB0eXBlIC0gdHlwZShzKSB0byBhY2NlcHRcbiAgICogQHJldHVybiB7SVZhbGlkYXRvckZufVxuICAgKi9cbiAgc3RhdGljIHR5cGUocmVxdWlyZWRUeXBlOiBTY2hlbWFQcmltaXRpdmVUeXBlfFNjaGVtYVByaW1pdGl2ZVR5cGVbXSk6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShyZXF1aXJlZFR5cGUpKSB7IHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7IHJldHVybiBudWxsOyB9XG4gICAgICBjb25zdCBjdXJyZW50VmFsdWU6IGFueSA9IGNvbnRyb2wudmFsdWU7XG4gICAgICBjb25zdCBpc1ZhbGlkID0gaXNBcnJheShyZXF1aXJlZFR5cGUpID9cbiAgICAgICAgKDxTY2hlbWFQcmltaXRpdmVUeXBlW10+cmVxdWlyZWRUeXBlKS5zb21lKHR5cGUgPT4gaXNUeXBlKGN1cnJlbnRWYWx1ZSwgdHlwZSkpIDpcbiAgICAgICAgaXNUeXBlKGN1cnJlbnRWYWx1ZSwgPFNjaGVtYVByaW1pdGl2ZVR5cGU+cmVxdWlyZWRUeXBlKTtcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7ICd0eXBlJzogeyByZXF1aXJlZFR5cGUsIGN1cnJlbnRWYWx1ZSB9IH07XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiAnZW51bScgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgY29udHJvbCB0byBoYXZlIGEgdmFsdWUgZnJvbSBhbiBlbnVtZXJhdGVkIGxpc3Qgb2YgdmFsdWVzLlxuICAgKlxuICAgKiBDb252ZXJ0cyB0eXBlcyBhcyBuZWVkZWQgdG8gYWxsb3cgc3RyaW5nIGlucHV0cyB0byBzdGlsbCBjb3JyZWN0bHlcbiAgICogbWF0Y2ggbnVtYmVyLCBib29sZWFuLCBhbmQgbnVsbCBlbnVtIHZhbHVlcy5cbiAgICpcbiAgICogQHBhcmFtIHthbnlbXX0gYWxsb3dlZFZhbHVlcyAtIGFycmF5IG9mIGFjY2VwdGFibGUgdmFsdWVzXG4gICAqIEByZXR1cm4ge0lWYWxpZGF0b3JGbn1cbiAgICovXG4gIHN0YXRpYyBlbnVtKGFsbG93ZWRWYWx1ZXM6IGFueVtdKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWlzQXJyYXkoYWxsb3dlZFZhbHVlcykpIHsgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZTogYW55ID0gY29udHJvbC52YWx1ZTtcbiAgICAgIGNvbnN0IGlzRXF1YWwgPSAoZW51bVZhbHVlLCBpbnB1dFZhbHVlKSA9PlxuICAgICAgICBlbnVtVmFsdWUgPT09IGlucHV0VmFsdWUgfHxcbiAgICAgICAgKGlzTnVtYmVyKGVudW1WYWx1ZSkgJiYgK2lucHV0VmFsdWUgPT09ICtlbnVtVmFsdWUpIHx8XG4gICAgICAgIChpc0Jvb2xlYW4oZW51bVZhbHVlLCAnc3RyaWN0JykgJiZcbiAgICAgICAgICB0b0phdmFTY3JpcHRUeXBlKGlucHV0VmFsdWUsICdib29sZWFuJykgPT09IGVudW1WYWx1ZSkgfHxcbiAgICAgICAgKGVudW1WYWx1ZSA9PT0gbnVsbCAmJiAhaGFzVmFsdWUoaW5wdXRWYWx1ZSkpIHx8XG4gICAgICAgIF8uaXNFcXVhbChlbnVtVmFsdWUsIGlucHV0VmFsdWUpO1xuICAgICAgY29uc3QgaXNWYWxpZCA9IGlzQXJyYXkoY3VycmVudFZhbHVlKSA/XG4gICAgICAgIGN1cnJlbnRWYWx1ZS5ldmVyeShpbnB1dFZhbHVlID0+IGFsbG93ZWRWYWx1ZXMuc29tZShlbnVtVmFsdWUgPT5cbiAgICAgICAgICBpc0VxdWFsKGVudW1WYWx1ZSwgaW5wdXRWYWx1ZSlcbiAgICAgICAgKSkgOlxuICAgICAgICBhbGxvd2VkVmFsdWVzLnNvbWUoZW51bVZhbHVlID0+IGlzRXF1YWwoZW51bVZhbHVlLCBjdXJyZW50VmFsdWUpKTtcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7ICdlbnVtJzogeyBhbGxvd2VkVmFsdWVzLCBjdXJyZW50VmFsdWUgfSB9O1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogJ2NvbnN0JyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBjb250cm9sIHRvIGhhdmUgYSBzcGVjaWZpYyB2YWx1ZS5cbiAgICpcbiAgICogQ29udmVydHMgdHlwZXMgYXMgbmVlZGVkIHRvIGFsbG93IHN0cmluZyBpbnB1dHMgdG8gc3RpbGwgY29ycmVjdGx5XG4gICAqIG1hdGNoIG51bWJlciwgYm9vbGVhbiwgYW5kIG51bGwgdmFsdWVzLlxuICAgKlxuICAgKiBUT0RPOiBtb2RpZnkgdG8gd29yayB3aXRoIG9iamVjdHNcbiAgICpcbiAgICogQHBhcmFtIHthbnlbXX0gcmVxdWlyZWRWYWx1ZSAtIHJlcXVpcmVkIHZhbHVlXG4gICAqIEByZXR1cm4ge0lWYWxpZGF0b3JGbn1cbiAgICovXG4gIHN0YXRpYyBjb25zdChyZXF1aXJlZFZhbHVlOiBhbnkpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUocmVxdWlyZWRWYWx1ZSkpIHsgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZTogYW55ID0gY29udHJvbC52YWx1ZTtcbiAgICAgIGNvbnN0IGlzRXF1YWwgPSAoY29uc3RWYWx1ZSwgaW5wdXRWYWx1ZSkgPT5cbiAgICAgICAgY29uc3RWYWx1ZSA9PT0gaW5wdXRWYWx1ZSB8fFxuICAgICAgICBpc051bWJlcihjb25zdFZhbHVlKSAmJiAraW5wdXRWYWx1ZSA9PT0gK2NvbnN0VmFsdWUgfHxcbiAgICAgICAgaXNCb29sZWFuKGNvbnN0VmFsdWUsICdzdHJpY3QnKSAmJlxuICAgICAgICAgIHRvSmF2YVNjcmlwdFR5cGUoaW5wdXRWYWx1ZSwgJ2Jvb2xlYW4nKSA9PT0gY29uc3RWYWx1ZSB8fFxuICAgICAgICBjb25zdFZhbHVlID09PSBudWxsICYmICFoYXNWYWx1ZShpbnB1dFZhbHVlKTtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBpc0VxdWFsKHJlcXVpcmVkVmFsdWUsIGN1cnJlbnRWYWx1ZSk7XG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDogeyAnY29uc3QnOiB7IHJlcXVpcmVkVmFsdWUsIGN1cnJlbnRWYWx1ZSB9IH07XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiAnbWluTGVuZ3RoJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBjb250cm9sJ3MgdGV4dCB2YWx1ZSB0byBiZSBncmVhdGVyIHRoYW4gYSBzcGVjaWZpZWQgbGVuZ3RoLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gbWluaW11bUxlbmd0aCAtIG1pbmltdW0gYWxsb3dlZCBzdHJpbmcgbGVuZ3RoXG4gICAqIEBwYXJhbSB7Ym9vbGVhbiA9IGZhbHNlfSBpbnZlcnQgLSBpbnN0ZWFkIHJldHVybiBlcnJvciBvYmplY3Qgb25seSBpZiB2YWxpZFxuICAgKiBAcmV0dXJuIHtJVmFsaWRhdG9yRm59XG4gICAqL1xuICBzdGF0aWMgbWluTGVuZ3RoKG1pbmltdW1MZW5ndGg6IG51bWJlcik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShtaW5pbXVtTGVuZ3RoKSkgeyByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvcjsgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkgeyByZXR1cm4gbnVsbDsgfVxuICAgICAgY29uc3QgY3VycmVudExlbmd0aCA9IGlzU3RyaW5nKGNvbnRyb2wudmFsdWUpID8gY29udHJvbC52YWx1ZS5sZW5ndGggOiAwO1xuICAgICAgY29uc3QgaXNWYWxpZCA9IGN1cnJlbnRMZW5ndGggPj0gbWluaW11bUxlbmd0aDtcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7ICdtaW5MZW5ndGgnOiB7IG1pbmltdW1MZW5ndGgsIGN1cnJlbnRMZW5ndGggfSB9O1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogJ21heExlbmd0aCcgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgY29udHJvbCdzIHRleHQgdmFsdWUgdG8gYmUgbGVzcyB0aGFuIGEgc3BlY2lmaWVkIGxlbmd0aC5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1heGltdW1MZW5ndGggLSBtYXhpbXVtIGFsbG93ZWQgc3RyaW5nIGxlbmd0aFxuICAgKiBAcGFyYW0ge2Jvb2xlYW4gPSBmYWxzZX0gaW52ZXJ0IC0gaW5zdGVhZCByZXR1cm4gZXJyb3Igb2JqZWN0IG9ubHkgaWYgdmFsaWRcbiAgICogQHJldHVybiB7SVZhbGlkYXRvckZufVxuICAgKi9cbiAgc3RhdGljIG1heExlbmd0aChtYXhpbXVtTGVuZ3RoOiBudW1iZXIpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUobWF4aW11bUxlbmd0aCkpIHsgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgY29uc3QgY3VycmVudExlbmd0aCA9IGlzU3RyaW5nKGNvbnRyb2wudmFsdWUpID8gY29udHJvbC52YWx1ZS5sZW5ndGggOiAwO1xuICAgICAgY29uc3QgaXNWYWxpZCA9IGN1cnJlbnRMZW5ndGggPD0gbWF4aW11bUxlbmd0aDtcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7ICdtYXhMZW5ndGgnOiB7IG1heGltdW1MZW5ndGgsIGN1cnJlbnRMZW5ndGggfSB9O1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogJ3BhdHRlcm4nIHZhbGlkYXRvclxuICAgKlxuICAgKiBOb3RlOiBOT1QgdGhlIHNhbWUgYXMgQW5ndWxhcidzIGRlZmF1bHQgcGF0dGVybiB2YWxpZGF0b3IuXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgY29udHJvbCdzIHZhbHVlIHRvIG1hdGNoIGEgc3BlY2lmaWVkIHJlZ3VsYXIgZXhwcmVzc2lvbiBwYXR0ZXJuLlxuICAgKlxuICAgKiBUaGlzIHZhbGlkYXRvciBjaGFuZ2VzIHRoZSBiZWhhdmlvciBvZiBkZWZhdWx0IHBhdHRlcm4gdmFsaWRhdG9yXG4gICAqIGJ5IHJlcGxhY2luZyBSZWdFeHAoYF4ke3BhdHRlcm59JGApIHdpdGggUmVnRXhwKGAke3BhdHRlcm59YCksXG4gICAqIHdoaWNoIGFsbG93cyBmb3IgcGFydGlhbCBtYXRjaGVzLlxuICAgKlxuICAgKiBUbyByZXR1cm4gdG8gdGhlIGRlZmF1bHQgZnVuY2l0b25hbGl0eSwgYW5kIG1hdGNoIHRoZSBlbnRpcmUgc3RyaW5nLFxuICAgKiBwYXNzIFRSVUUgYXMgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXR0ZXJuIC0gcmVndWxhciBleHByZXNzaW9uIHBhdHRlcm5cbiAgICogQHBhcmFtIHtib29sZWFuID0gZmFsc2V9IHdob2xlU3RyaW5nIC0gbWF0Y2ggd2hvbGUgdmFsdWUgc3RyaW5nP1xuICAgKiBAcmV0dXJuIHtJVmFsaWRhdG9yRm59XG4gICAqL1xuICBzdGF0aWMgcGF0dGVybihwYXR0ZXJuOiBzdHJpbmd8UmVnRXhwLCB3aG9sZVN0cmluZyA9IGZhbHNlKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKHBhdHRlcm4pKSB7IHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7IHJldHVybiBudWxsOyB9XG4gICAgICBsZXQgcmVnZXg6IFJlZ0V4cDtcbiAgICAgIGxldCByZXF1aXJlZFBhdHRlcm46IHN0cmluZztcbiAgICAgIGlmICh0eXBlb2YgcGF0dGVybiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmVxdWlyZWRQYXR0ZXJuID0gKHdob2xlU3RyaW5nKSA/IGBeJHtwYXR0ZXJufSRgIDogcGF0dGVybjtcbiAgICAgICAgcmVnZXggPSBuZXcgUmVnRXhwKHJlcXVpcmVkUGF0dGVybik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXF1aXJlZFBhdHRlcm4gPSBwYXR0ZXJuLnRvU3RyaW5nKCk7XG4gICAgICAgIHJlZ2V4ID0gcGF0dGVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZTogc3RyaW5nID0gY29udHJvbC52YWx1ZTtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBpc1N0cmluZyhjdXJyZW50VmFsdWUpID8gcmVnZXgudGVzdChjdXJyZW50VmFsdWUpIDogZmFsc2U7XG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDogeyAncGF0dGVybic6IHsgcmVxdWlyZWRQYXR0ZXJuLCBjdXJyZW50VmFsdWUgfSB9O1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogJ2Zvcm1hdCcgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgY29udHJvbCB0byBoYXZlIGEgdmFsdWUgb2YgYSBjZXJ0YWluIGZvcm1hdC5cbiAgICpcbiAgICogVGhpcyB2YWxpZGF0b3IgY3VycmVudGx5IGNoZWNrcyB0aGUgZm9sbG93aW5nIGZvcm1zdHM6XG4gICAqICAgZGF0ZSwgdGltZSwgZGF0ZS10aW1lLCBlbWFpbCwgaG9zdG5hbWUsIGlwdjQsIGlwdjYsXG4gICAqICAgdXJpLCB1cmktcmVmZXJlbmNlLCB1cmktdGVtcGxhdGUsIHVybCwgdXVpZCwgY29sb3IsXG4gICAqICAganNvbi1wb2ludGVyLCByZWxhdGl2ZS1qc29uLXBvaW50ZXIsIHJlZ2V4XG4gICAqXG4gICAqIEZhc3QgZm9ybWF0IHJlZ3VsYXIgZXhwcmVzc2lvbnMgY29waWVkIGZyb20gQUpWOlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vZXBvYmVyZXpraW4vYWp2L2Jsb2IvbWFzdGVyL2xpYi9jb21waWxlL2Zvcm1hdHMuanNcbiAgICpcbiAgICogQHBhcmFtIHtKc29uU2NoZW1hRm9ybWF0TmFtZXN9IHJlcXVpcmVkRm9ybWF0IC0gZm9ybWF0IHRvIGNoZWNrXG4gICAqIEByZXR1cm4ge0lWYWxpZGF0b3JGbn1cbiAgICovXG4gIHN0YXRpYyBmb3JtYXQocmVxdWlyZWRGb3JtYXQ6IEpzb25TY2hlbWFGb3JtYXROYW1lcyk6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShyZXF1aXJlZEZvcm1hdCkpIHsgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIGxldCBpc1ZhbGlkOiBib29sZWFuO1xuICAgICAgY29uc3QgY3VycmVudFZhbHVlOiBzdHJpbmd8RGF0ZSA9IGNvbnRyb2wudmFsdWU7XG4gICAgICBpZiAoaXNTdHJpbmcoY3VycmVudFZhbHVlKSkge1xuICAgICAgICBjb25zdCBmb3JtYXRUZXN0OiBGdW5jdGlvbnxSZWdFeHAgPSBqc29uU2NoZW1hRm9ybWF0VGVzdHNbcmVxdWlyZWRGb3JtYXRdO1xuICAgICAgICBpZiAodHlwZW9mIGZvcm1hdFRlc3QgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgaXNWYWxpZCA9ICg8UmVnRXhwPmZvcm1hdFRlc3QpLnRlc3QoPHN0cmluZz5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBmb3JtYXRUZXN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgaXNWYWxpZCA9ICg8RnVuY3Rpb24+Zm9ybWF0VGVzdCkoPHN0cmluZz5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYGZvcm1hdCB2YWxpZGF0b3IgZXJyb3I6IFwiJHtyZXF1aXJlZEZvcm1hdH1cIiBpcyBub3QgYSByZWNvZ25pemVkIGZvcm1hdC5gKTtcbiAgICAgICAgICBpc1ZhbGlkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQWxsb3cgSmF2YVNjcmlwdCBEYXRlIG9iamVjdHNcbiAgICAgICAgaXNWYWxpZCA9IFsnZGF0ZScsICd0aW1lJywgJ2RhdGUtdGltZSddLmluY2x1ZGVzKHJlcXVpcmVkRm9ybWF0KSAmJlxuICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChjdXJyZW50VmFsdWUpID09PSAnW29iamVjdCBEYXRlXSc7XG4gICAgICB9XG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDogeyAnZm9ybWF0JzogeyByZXF1aXJlZEZvcm1hdCwgY3VycmVudFZhbHVlIH0gfTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqICdtaW5pbXVtJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBjb250cm9sJ3MgbnVtZXJpYyB2YWx1ZSB0byBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG9cbiAgICogYSBtaW5pbXVtIGFtb3VudC5cbiAgICpcbiAgICogQW55IG5vbi1udW1lcmljIHZhbHVlIGlzIGFsc28gdmFsaWQgKGFjY29yZGluZyB0byB0aGUgSFRNTCBmb3JtcyBzcGVjLFxuICAgKiBhIG5vbi1udW1lcmljIHZhbHVlIGRvZXNuJ3QgaGF2ZSBhIG1pbmltdW0pLlxuICAgKiBodHRwczovL3d3dy53My5vcmcvVFIvaHRtbDUvZm9ybXMuaHRtbCNhdHRyLWlucHV0LW1heFxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gbWluaW11bSAtIG1pbmltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKiBAcmV0dXJuIHtJVmFsaWRhdG9yRm59XG4gICAqL1xuICBzdGF0aWMgbWluaW11bShtaW5pbXVtVmFsdWU6IG51bWJlcik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShtaW5pbXVtVmFsdWUpKSB7IHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7IHJldHVybiBudWxsOyB9XG4gICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBjb250cm9sLnZhbHVlO1xuICAgICAgY29uc3QgaXNWYWxpZCA9ICFpc051bWJlcihjdXJyZW50VmFsdWUpIHx8IGN1cnJlbnRWYWx1ZSA+PSBtaW5pbXVtVmFsdWU7XG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDogeyAnbWluaW11bSc6IHsgbWluaW11bVZhbHVlLCBjdXJyZW50VmFsdWUgfSB9O1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogJ2V4Y2x1c2l2ZU1pbmltdW0nIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wncyBudW1lcmljIHZhbHVlIHRvIGJlIGxlc3MgdGhhbiBhIG1heGltdW0gYW1vdW50LlxuICAgKlxuICAgKiBBbnkgbm9uLW51bWVyaWMgdmFsdWUgaXMgYWxzbyB2YWxpZCAoYWNjb3JkaW5nIHRvIHRoZSBIVE1MIGZvcm1zIHNwZWMsXG4gICAqIGEgbm9uLW51bWVyaWMgdmFsdWUgZG9lc24ndCBoYXZlIGEgbWF4aW11bSkuXG4gICAqIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9odG1sNS9mb3Jtcy5odG1sI2F0dHItaW5wdXQtbWF4XG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBleGNsdXNpdmVNaW5pbXVtVmFsdWUgLSBtYXhpbXVtIGFsbG93ZWQgdmFsdWVcbiAgICogQHJldHVybiB7SVZhbGlkYXRvckZufVxuICAgKi9cbiAgc3RhdGljIGV4Y2x1c2l2ZU1pbmltdW0oZXhjbHVzaXZlTWluaW11bVZhbHVlOiBudW1iZXIpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUoZXhjbHVzaXZlTWluaW11bVZhbHVlKSkgeyByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvcjsgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkgeyByZXR1cm4gbnVsbDsgfVxuICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gY29udHJvbC52YWx1ZTtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSAhaXNOdW1iZXIoY3VycmVudFZhbHVlKSB8fCArY3VycmVudFZhbHVlIDwgZXhjbHVzaXZlTWluaW11bVZhbHVlO1xuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHsgJ2V4Y2x1c2l2ZU1pbmltdW0nOiB7IGV4Y2x1c2l2ZU1pbmltdW1WYWx1ZSwgY3VycmVudFZhbHVlIH0gfTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqICdtYXhpbXVtJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBjb250cm9sJ3MgbnVtZXJpYyB2YWx1ZSB0byBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG9cbiAgICogYSBtYXhpbXVtIGFtb3VudC5cbiAgICpcbiAgICogQW55IG5vbi1udW1lcmljIHZhbHVlIGlzIGFsc28gdmFsaWQgKGFjY29yZGluZyB0byB0aGUgSFRNTCBmb3JtcyBzcGVjLFxuICAgKiBhIG5vbi1udW1lcmljIHZhbHVlIGRvZXNuJ3QgaGF2ZSBhIG1heGltdW0pLlxuICAgKiBodHRwczovL3d3dy53My5vcmcvVFIvaHRtbDUvZm9ybXMuaHRtbCNhdHRyLWlucHV0LW1heFxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gbWF4aW11bVZhbHVlIC0gbWF4aW11bSBhbGxvd2VkIHZhbHVlXG4gICAqIEByZXR1cm4ge0lWYWxpZGF0b3JGbn1cbiAgICovXG4gIHN0YXRpYyBtYXhpbXVtKG1heGltdW1WYWx1ZTogbnVtYmVyKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKG1heGltdW1WYWx1ZSkpIHsgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGNvbnRyb2wudmFsdWU7XG4gICAgICBjb25zdCBpc1ZhbGlkID0gIWlzTnVtYmVyKGN1cnJlbnRWYWx1ZSkgfHwgK2N1cnJlbnRWYWx1ZSA8PSBtYXhpbXVtVmFsdWU7XG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDogeyAnbWF4aW11bSc6IHsgbWF4aW11bVZhbHVlLCBjdXJyZW50VmFsdWUgfSB9O1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogJ2V4Y2x1c2l2ZU1heGltdW0nIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wncyBudW1lcmljIHZhbHVlIHRvIGJlIGxlc3MgdGhhbiBhIG1heGltdW0gYW1vdW50LlxuICAgKlxuICAgKiBBbnkgbm9uLW51bWVyaWMgdmFsdWUgaXMgYWxzbyB2YWxpZCAoYWNjb3JkaW5nIHRvIHRoZSBIVE1MIGZvcm1zIHNwZWMsXG4gICAqIGEgbm9uLW51bWVyaWMgdmFsdWUgZG9lc24ndCBoYXZlIGEgbWF4aW11bSkuXG4gICAqIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9odG1sNS9mb3Jtcy5odG1sI2F0dHItaW5wdXQtbWF4XG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBleGNsdXNpdmVNYXhpbXVtVmFsdWUgLSBtYXhpbXVtIGFsbG93ZWQgdmFsdWVcbiAgICogQHJldHVybiB7SVZhbGlkYXRvckZufVxuICAgKi9cbiAgc3RhdGljIGV4Y2x1c2l2ZU1heGltdW0oZXhjbHVzaXZlTWF4aW11bVZhbHVlOiBudW1iZXIpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUoZXhjbHVzaXZlTWF4aW11bVZhbHVlKSkgeyByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvcjsgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkgeyByZXR1cm4gbnVsbDsgfVxuICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gY29udHJvbC52YWx1ZTtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSAhaXNOdW1iZXIoY3VycmVudFZhbHVlKSB8fCArY3VycmVudFZhbHVlIDwgZXhjbHVzaXZlTWF4aW11bVZhbHVlO1xuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHsgJ2V4Y2x1c2l2ZU1heGltdW0nOiB7IGV4Y2x1c2l2ZU1heGltdW1WYWx1ZSwgY3VycmVudFZhbHVlIH0gfTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqICdtdWx0aXBsZU9mJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBjb250cm9sIHRvIGhhdmUgYSBudW1lcmljIHZhbHVlIHRoYXQgaXMgYSBtdWx0aXBsZVxuICAgKiBvZiBhIHNwZWNpZmllZCBudW1iZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtdWx0aXBsZU9mVmFsdWUgLSBudW1iZXIgdmFsdWUgbXVzdCBiZSBhIG11bHRpcGxlIG9mXG4gICAqIEByZXR1cm4ge0lWYWxpZGF0b3JGbn1cbiAgICovXG4gIHN0YXRpYyBtdWx0aXBsZU9mKG11bHRpcGxlT2ZWYWx1ZTogbnVtYmVyKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKG11bHRpcGxlT2ZWYWx1ZSkpIHsgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGNvbnRyb2wudmFsdWU7XG4gICAgICBjb25zdCBpc1ZhbGlkID0gaXNOdW1iZXIoY3VycmVudFZhbHVlKSAmJlxuICAgICAgICBjdXJyZW50VmFsdWUgJSBtdWx0aXBsZU9mVmFsdWUgPT09IDA7XG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDogeyAnbXVsdGlwbGVPZic6IHsgbXVsdGlwbGVPZlZhbHVlLCBjdXJyZW50VmFsdWUgfSB9O1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogJ21pblByb3BlcnRpZXMnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGZvcm0gZ3JvdXAgdG8gaGF2ZSBhIG1pbmltdW0gbnVtYmVyIG9mIHByb3BlcnRpZXMgKGkuZS4gaGF2ZVxuICAgKiB2YWx1ZXMgZW50ZXJlZCBpbiBhIG1pbmltdW0gbnVtYmVyIG9mIGNvbnRyb2xzIHdpdGhpbiB0aGUgZ3JvdXApLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gbWluaW11bVByb3BlcnRpZXMgLSBtaW5pbXVtIG51bWJlciBvZiBwcm9wZXJ0aWVzIGFsbG93ZWRcbiAgICogQHJldHVybiB7SVZhbGlkYXRvckZufVxuICAgKi9cbiAgc3RhdGljIG1pblByb3BlcnRpZXMobWluaW11bVByb3BlcnRpZXM6IG51bWJlcik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShtaW5pbXVtUHJvcGVydGllcykpIHsgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIGNvbnN0IGN1cnJlbnRQcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMoY29udHJvbC52YWx1ZSkubGVuZ3RoIHx8IDA7XG4gICAgICBjb25zdCBpc1ZhbGlkID0gY3VycmVudFByb3BlcnRpZXMgPj0gbWluaW11bVByb3BlcnRpZXM7XG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDogeyAnbWluUHJvcGVydGllcyc6IHsgbWluaW11bVByb3BlcnRpZXMsIGN1cnJlbnRQcm9wZXJ0aWVzIH0gfTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqICdtYXhQcm9wZXJ0aWVzJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBmb3JtIGdyb3VwIHRvIGhhdmUgYSBtYXhpbXVtIG51bWJlciBvZiBwcm9wZXJ0aWVzIChpLmUuIGhhdmVcbiAgICogdmFsdWVzIGVudGVyZWQgaW4gYSBtYXhpbXVtIG51bWJlciBvZiBjb250cm9scyB3aXRoaW4gdGhlIGdyb3VwKS5cbiAgICpcbiAgICogTm90ZTogSGFzIG5vIGVmZmVjdCBpZiB0aGUgZm9ybSBncm91cCBkb2VzIG5vdCBjb250YWluIG1vcmUgdGhhbiB0aGVcbiAgICogbWF4aW11bSBudW1iZXIgb2YgY29udHJvbHMuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhpbXVtUHJvcGVydGllcyAtIG1heGltdW0gbnVtYmVyIG9mIHByb3BlcnRpZXMgYWxsb3dlZFxuICAgKiBAcmV0dXJuIHtJVmFsaWRhdG9yRm59XG4gICAqL1xuICBzdGF0aWMgbWF4UHJvcGVydGllcyhtYXhpbXVtUHJvcGVydGllczogbnVtYmVyKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKG1heGltdW1Qcm9wZXJ0aWVzKSkgeyByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvcjsgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50UHJvcGVydGllcyA9IE9iamVjdC5rZXlzKGNvbnRyb2wudmFsdWUpLmxlbmd0aCB8fCAwO1xuICAgICAgY29uc3QgaXNWYWxpZCA9IGN1cnJlbnRQcm9wZXJ0aWVzIDw9IG1heGltdW1Qcm9wZXJ0aWVzO1xuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHsgJ21heFByb3BlcnRpZXMnOiB7IG1heGltdW1Qcm9wZXJ0aWVzLCBjdXJyZW50UHJvcGVydGllcyB9IH07XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiAnZGVwZW5kZW5jaWVzJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgdGhlIGNvbnRyb2xzIGluIGEgZm9ybSBncm91cCB0byBtZWV0IGFkZGl0aW9uYWwgdmFsaWRhdGlvblxuICAgKiBjcml0ZXJpYSwgZGVwZW5kaW5nIG9uIHRoZSB2YWx1ZXMgb2Ygb3RoZXIgY29udHJvbHMgaW4gdGhlIGdyb3VwLlxuICAgKlxuICAgKiBFeGFtcGxlczpcbiAgICogaHR0cHM6Ly9zcGFjZXRlbGVzY29wZS5naXRodWIuaW8vdW5kZXJzdGFuZGluZy1qc29uLXNjaGVtYS9yZWZlcmVuY2Uvb2JqZWN0Lmh0bWwjZGVwZW5kZW5jaWVzXG4gICAqXG4gICAqIEBwYXJhbSB7YW55fSBkZXBlbmRlbmNpZXMgLSByZXF1aXJlZCBkZXBlbmRlbmNpZXNcbiAgICogQHJldHVybiB7SVZhbGlkYXRvckZufVxuICAgKi9cbiAgc3RhdGljIGRlcGVuZGVuY2llcyhkZXBlbmRlbmNpZXM6IGFueSk6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKGdldFR5cGUoZGVwZW5kZW5jaWVzKSAhPT0gJ29iamVjdCcgfHwgaXNFbXB0eShkZXBlbmRlbmNpZXMpKSB7XG4gICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvcjtcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7IHJldHVybiBudWxsOyB9XG4gICAgICBjb25zdCBhbGxFcnJvcnMgPSBfbWVyZ2VPYmplY3RzKFxuICAgICAgICBmb3JFYWNoQ29weShkZXBlbmRlbmNpZXMsICh2YWx1ZSwgcmVxdWlyaW5nRmllbGQpID0+IHtcbiAgICAgICAgICBpZiAoIWhhc1ZhbHVlKGNvbnRyb2wudmFsdWVbcmVxdWlyaW5nRmllbGRdKSkgeyByZXR1cm4gbnVsbDsgfVxuICAgICAgICAgIGxldCByZXF1aXJpbmdGaWVsZEVycm9yczogVmFsaWRhdGlvbkVycm9ycyA9IHsgfTtcbiAgICAgICAgICBsZXQgcmVxdWlyZWRGaWVsZHM6IHN0cmluZ1tdO1xuICAgICAgICAgIGxldCBwcm9wZXJ0aWVzOiBWYWxpZGF0aW9uRXJyb3JzID0geyB9O1xuICAgICAgICAgIGlmIChnZXRUeXBlKGRlcGVuZGVuY2llc1tyZXF1aXJpbmdGaWVsZF0pID09PSAnYXJyYXknKSB7XG4gICAgICAgICAgICByZXF1aXJlZEZpZWxkcyA9IGRlcGVuZGVuY2llc1tyZXF1aXJpbmdGaWVsZF07XG4gICAgICAgICAgfSBlbHNlIGlmIChnZXRUeXBlKGRlcGVuZGVuY2llc1tyZXF1aXJpbmdGaWVsZF0pID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmVxdWlyZWRGaWVsZHMgPSBkZXBlbmRlbmNpZXNbcmVxdWlyaW5nRmllbGRdWydyZXF1aXJlZCddIHx8IFtdO1xuICAgICAgICAgICAgcHJvcGVydGllcyA9IGRlcGVuZGVuY2llc1tyZXF1aXJpbmdGaWVsZF1bJ3Byb3BlcnRpZXMnXSB8fCB7IH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gVmFsaWRhdGUgcHJvcGVydHkgZGVwZW5kZW5jaWVzXG4gICAgICAgICAgZm9yIChjb25zdCByZXF1aXJlZEZpZWxkIG9mIHJlcXVpcmVkRmllbGRzKSB7XG4gICAgICAgICAgICBpZiAoeG9yKCFoYXNWYWx1ZShjb250cm9sLnZhbHVlW3JlcXVpcmVkRmllbGRdKSwgaW52ZXJ0KSkge1xuICAgICAgICAgICAgICByZXF1aXJpbmdGaWVsZEVycm9yc1tyZXF1aXJlZEZpZWxkXSA9IHsgJ3JlcXVpcmVkJzogdHJ1ZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFZhbGlkYXRlIHNjaGVtYSBkZXBlbmRlbmNpZXNcbiAgICAgICAgICByZXF1aXJpbmdGaWVsZEVycm9ycyA9IF9tZXJnZU9iamVjdHMocmVxdWlyaW5nRmllbGRFcnJvcnMsXG4gICAgICAgICAgICBmb3JFYWNoQ29weShwcm9wZXJ0aWVzLCAocmVxdWlyZW1lbnRzLCByZXF1aXJlZEZpZWxkKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlcXVpcmVkRmllbGRFcnJvcnMgPSBfbWVyZ2VPYmplY3RzKFxuICAgICAgICAgICAgICAgIGZvckVhY2hDb3B5KHJlcXVpcmVtZW50cywgKHJlcXVpcmVtZW50LCBwYXJhbWV0ZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgIGxldCB2YWxpZGF0b3I6IElWYWxpZGF0b3JGbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICBpZiAocmVxdWlyZW1lbnQgPT09ICdtYXhpbXVtJyB8fCByZXF1aXJlbWVudCA9PT0gJ21pbmltdW0nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4Y2x1c2l2ZSA9ICEhcmVxdWlyZW1lbnRzWydleGNsdXNpdmVNJyArIHJlcXVpcmVtZW50LnNsaWNlKDEpXTtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yID0gSnNvblZhbGlkYXRvcnNbcmVxdWlyZW1lbnRdKHBhcmFtZXRlciwgZXhjbHVzaXZlKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIEpzb25WYWxpZGF0b3JzW3JlcXVpcmVtZW50XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3IgPSBKc29uVmFsaWRhdG9yc1tyZXF1aXJlbWVudF0ocGFyYW1ldGVyKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiAhaXNEZWZpbmVkKHZhbGlkYXRvcikgP1xuICAgICAgICAgICAgICAgICAgICBudWxsIDogdmFsaWRhdG9yKGNvbnRyb2wudmFsdWVbcmVxdWlyZWRGaWVsZF0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHJldHVybiBpc0VtcHR5KHJlcXVpcmVkRmllbGRFcnJvcnMpID9cbiAgICAgICAgICAgICAgICBudWxsIDogeyBbcmVxdWlyZWRGaWVsZF06IHJlcXVpcmVkRmllbGRFcnJvcnMgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gaXNFbXB0eShyZXF1aXJpbmdGaWVsZEVycm9ycykgP1xuICAgICAgICAgICAgbnVsbCA6IHsgW3JlcXVpcmluZ0ZpZWxkXTogcmVxdWlyaW5nRmllbGRFcnJvcnMgfTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgICByZXR1cm4gaXNFbXB0eShhbGxFcnJvcnMpID8gbnVsbCA6IGFsbEVycm9ycztcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqICdtaW5JdGVtcycgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgZm9ybSBhcnJheSB0byBoYXZlIGEgbWluaW11bSBudW1iZXIgb2YgdmFsdWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gbWluaW11bUl0ZW1zIC0gbWluaW11bSBudW1iZXIgb2YgaXRlbXMgYWxsb3dlZFxuICAgKiBAcmV0dXJuIHtJVmFsaWRhdG9yRm59XG4gICAqL1xuICBzdGF0aWMgbWluSXRlbXMobWluaW11bUl0ZW1zOiBudW1iZXIpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUobWluaW11bUl0ZW1zKSkgeyByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvcjsgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkgeyByZXR1cm4gbnVsbDsgfVxuICAgICAgY29uc3QgY3VycmVudEl0ZW1zID0gaXNBcnJheShjb250cm9sLnZhbHVlKSA/IGNvbnRyb2wudmFsdWUubGVuZ3RoIDogMDtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBjdXJyZW50SXRlbXMgPj0gbWluaW11bUl0ZW1zO1xuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHsgJ21pbkl0ZW1zJzogeyBtaW5pbXVtSXRlbXMsIGN1cnJlbnRJdGVtcyB9IH07XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiAnbWF4SXRlbXMnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGZvcm0gYXJyYXkgdG8gaGF2ZSBhIG1heGltdW0gbnVtYmVyIG9mIHZhbHVlcy5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1heGltdW1JdGVtcyAtIG1heGltdW0gbnVtYmVyIG9mIGl0ZW1zIGFsbG93ZWRcbiAgICogQHJldHVybiB7SVZhbGlkYXRvckZufVxuICAgKi9cbiAgc3RhdGljIG1heEl0ZW1zKG1heGltdW1JdGVtczogbnVtYmVyKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKG1heGltdW1JdGVtcykpIHsgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgY29uc3QgY3VycmVudEl0ZW1zID0gaXNBcnJheShjb250cm9sLnZhbHVlKSA/IGNvbnRyb2wudmFsdWUubGVuZ3RoIDogMDtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBjdXJyZW50SXRlbXMgPD0gbWF4aW11bUl0ZW1zO1xuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHsgJ21heEl0ZW1zJzogeyBtYXhpbXVtSXRlbXMsIGN1cnJlbnRJdGVtcyB9IH07XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiAndW5pcXVlSXRlbXMnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyB2YWx1ZXMgaW4gYSBmb3JtIGFycmF5IHRvIGJlIHVuaXF1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFuID0gdHJ1ZX0gdW5pcXVlPyAtIHRydWUgdG8gdmFsaWRhdGUsIGZhbHNlIHRvIGRpc2FibGVcbiAgICogQHJldHVybiB7SVZhbGlkYXRvckZufVxuICAgKi9cbiAgc3RhdGljIHVuaXF1ZUl0ZW1zKHVuaXF1ZSA9IHRydWUpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghdW5pcXVlKSB7IHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7IHJldHVybiBudWxsOyB9XG4gICAgICBjb25zdCBzb3J0ZWQ6IGFueVtdID0gY29udHJvbC52YWx1ZS5zbGljZSgpLnNvcnQoKTtcbiAgICAgIGNvbnN0IGR1cGxpY2F0ZUl0ZW1zID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNvcnRlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc29ydGVkW2kgLSAxXSA9PT0gc29ydGVkW2ldICYmIGR1cGxpY2F0ZUl0ZW1zLmluY2x1ZGVzKHNvcnRlZFtpXSkpIHtcbiAgICAgICAgICBkdXBsaWNhdGVJdGVtcy5wdXNoKHNvcnRlZFtpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IGlzVmFsaWQgPSAhZHVwbGljYXRlSXRlbXMubGVuZ3RoO1xuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHsgJ3VuaXF1ZUl0ZW1zJzogeyBkdXBsaWNhdGVJdGVtcyB9IH07XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiAnY29udGFpbnMnIHZhbGlkYXRvclxuICAgKlxuICAgKiBUT0RPOiBDb21wbGV0ZSB0aGlzIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyB2YWx1ZXMgaW4gYSBmb3JtIGFycmF5IHRvIGJlIHVuaXF1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFuID0gdHJ1ZX0gdW5pcXVlPyAtIHRydWUgdG8gdmFsaWRhdGUsIGZhbHNlIHRvIGRpc2FibGVcbiAgICogQHJldHVybiB7SVZhbGlkYXRvckZufVxuICAgKi9cbiAgc3RhdGljIGNvbnRhaW5zKHJlcXVpcmVkSXRlbSA9IHRydWUpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghcmVxdWlyZWRJdGVtKSB7IHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpIHx8ICFpc0FycmF5KGNvbnRyb2wudmFsdWUpKSB7IHJldHVybiBudWxsOyB9XG4gICAgICBjb25zdCBjdXJyZW50SXRlbXMgPSBjb250cm9sLnZhbHVlO1xuICAgICAgLy8gY29uc3QgaXNWYWxpZCA9IGN1cnJlbnRJdGVtcy5zb21lKGl0ZW0gPT5cbiAgICAgIC8vXG4gICAgICAvLyApO1xuICAgICAgY29uc3QgaXNWYWxpZCA9IHRydWU7XG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDogeyAnY29udGFpbnMnOiB7IHJlcXVpcmVkSXRlbSwgY3VycmVudEl0ZW1zIH0gfTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIE5vLW9wIHZhbGlkYXRvci4gSW5jbHVkZWQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkuXG4gICAqL1xuICBzdGF0aWMgbnVsbFZhbGlkYXRvcihjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRvciB0cmFuc2Zvcm1hdGlvbiBmdW5jdGlvbnM6XG4gICAqIGNvbXBvc2VBbnlPZiwgY29tcG9zZU9uZU9mLCBjb21wb3NlQWxsT2YsIGNvbXBvc2VOb3QsXG4gICAqIGNvbXBvc2UsIGNvbXBvc2VBc3luY1xuICAgKlxuICAgKiBUT0RPOiBBZGQgY29tcG9zZUFueU9mQXN5bmMsIGNvbXBvc2VPbmVPZkFzeW5jLFxuICAgKiAgICAgICAgICAgY29tcG9zZUFsbE9mQXN5bmMsIGNvbXBvc2VOb3RBc3luY1xuICAgKi9cblxuICAvKipcbiAgICogJ2NvbXBvc2VBbnlPZicgdmFsaWRhdG9yIGNvbWJpbmF0aW9uIGZ1bmN0aW9uXG4gICAqXG4gICAqIEFjY2VwdHMgYW4gYXJyYXkgb2YgdmFsaWRhdG9ycyBhbmQgcmV0dXJucyBhIHNpbmdsZSB2YWxpZGF0b3IgdGhhdFxuICAgKiBldmFsdWF0ZXMgdG8gdmFsaWQgaWYgYW55IG9uZSBvciBtb3JlIG9mIHRoZSBzdWJtaXR0ZWQgdmFsaWRhdG9ycyBhcmVcbiAgICogdmFsaWQuIElmIGV2ZXJ5IHZhbGlkYXRvciBpcyBpbnZhbGlkLCBpdCByZXR1cm5zIGNvbWJpbmVkIGVycm9ycyBmcm9tXG4gICAqIGFsbCB2YWxpZGF0b3JzLlxuICAgKlxuICAgKiBAcGFyYW0ge0lWYWxpZGF0b3JGbltdfSB2YWxpZGF0b3JzIC0gYXJyYXkgb2YgdmFsaWRhdG9ycyB0byBjb21iaW5lXG4gICAqIEByZXR1cm4ge0lWYWxpZGF0b3JGbn0gLSBzaW5nbGUgY29tYmluZWQgdmFsaWRhdG9yIGZ1bmN0aW9uXG4gICAqL1xuICBzdGF0aWMgY29tcG9zZUFueU9mKHZhbGlkYXRvcnM6IElWYWxpZGF0b3JGbltdKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIXZhbGlkYXRvcnMpIHsgcmV0dXJuIG51bGw7IH1cbiAgICBjb25zdCBwcmVzZW50VmFsaWRhdG9ycyA9IHZhbGlkYXRvcnMuZmlsdGVyKGlzRGVmaW5lZCk7XG4gICAgaWYgKHByZXNlbnRWYWxpZGF0b3JzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gbnVsbDsgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCA9PiB7XG4gICAgICBjb25zdCBhcnJheU9mRXJyb3JzID1cbiAgICAgICAgX2V4ZWN1dGVWYWxpZGF0b3JzKGNvbnRyb2wsIHByZXNlbnRWYWxpZGF0b3JzLCBpbnZlcnQpLmZpbHRlcihpc0RlZmluZWQpO1xuICAgICAgY29uc3QgaXNWYWxpZCA9IHZhbGlkYXRvcnMubGVuZ3RoID4gYXJyYXlPZkVycm9ycy5sZW5ndGg7XG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDogX21lcmdlT2JqZWN0cyguLi5hcnJheU9mRXJyb3JzLCB7ICdhbnlPZic6ICFpbnZlcnQgfSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiAnY29tcG9zZU9uZU9mJyB2YWxpZGF0b3IgY29tYmluYXRpb24gZnVuY3Rpb25cbiAgICpcbiAgICogQWNjZXB0cyBhbiBhcnJheSBvZiB2YWxpZGF0b3JzIGFuZCByZXR1cm5zIGEgc2luZ2xlIHZhbGlkYXRvciB0aGF0XG4gICAqIGV2YWx1YXRlcyB0byB2YWxpZCBvbmx5IGlmIGV4YWN0bHkgb25lIG9mIHRoZSBzdWJtaXR0ZWQgdmFsaWRhdG9yc1xuICAgKiBpcyB2YWxpZC4gT3RoZXJ3aXNlIHJldHVybnMgY29tYmluZWQgaW5mb3JtYXRpb24gZnJvbSBhbGwgdmFsaWRhdG9ycyxcbiAgICogYm90aCB2YWxpZCBhbmQgaW52YWxpZC5cbiAgICpcbiAgICogQHBhcmFtIHtJVmFsaWRhdG9yRm5bXX0gdmFsaWRhdG9ycyAtIGFycmF5IG9mIHZhbGlkYXRvcnMgdG8gY29tYmluZVxuICAgKiBAcmV0dXJuIHtJVmFsaWRhdG9yRm59IC0gc2luZ2xlIGNvbWJpbmVkIHZhbGlkYXRvciBmdW5jdGlvblxuICAgKi9cbiAgc3RhdGljIGNvbXBvc2VPbmVPZih2YWxpZGF0b3JzOiBJVmFsaWRhdG9yRm5bXSk6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCF2YWxpZGF0b3JzKSB7IHJldHVybiBudWxsOyB9XG4gICAgY29uc3QgcHJlc2VudFZhbGlkYXRvcnMgPSB2YWxpZGF0b3JzLmZpbHRlcihpc0RlZmluZWQpO1xuICAgIGlmIChwcmVzZW50VmFsaWRhdG9ycy5sZW5ndGggPT09IDApIHsgcmV0dXJuIG51bGw7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgY29uc3QgYXJyYXlPZkVycm9ycyA9XG4gICAgICAgIF9leGVjdXRlVmFsaWRhdG9ycyhjb250cm9sLCBwcmVzZW50VmFsaWRhdG9ycyk7XG4gICAgICBjb25zdCB2YWxpZENvbnRyb2xzID1cbiAgICAgICAgdmFsaWRhdG9ycy5sZW5ndGggLSBhcnJheU9mRXJyb3JzLmZpbHRlcihpc0RlZmluZWQpLmxlbmd0aDtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSB2YWxpZENvbnRyb2xzID09PSAxO1xuICAgICAgaWYgKHhvcihpc1ZhbGlkLCBpbnZlcnQpKSB7IHJldHVybiBudWxsOyB9XG4gICAgICBjb25zdCBhcnJheU9mVmFsaWRzID1cbiAgICAgICAgX2V4ZWN1dGVWYWxpZGF0b3JzKGNvbnRyb2wsIHByZXNlbnRWYWxpZGF0b3JzLCBpbnZlcnQpO1xuICAgICAgcmV0dXJuIF9tZXJnZU9iamVjdHMoLi4uYXJyYXlPZkVycm9ycywgLi4uYXJyYXlPZlZhbGlkcywgeyAnb25lT2YnOiAhaW52ZXJ0IH0pO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogJ2NvbXBvc2VBbGxPZicgdmFsaWRhdG9yIGNvbWJpbmF0aW9uIGZ1bmN0aW9uXG4gICAqXG4gICAqIEFjY2VwdHMgYW4gYXJyYXkgb2YgdmFsaWRhdG9ycyBhbmQgcmV0dXJucyBhIHNpbmdsZSB2YWxpZGF0b3IgdGhhdFxuICAgKiBldmFsdWF0ZXMgdG8gdmFsaWQgb25seSBpZiBhbGwgdGhlIHN1Ym1pdHRlZCB2YWxpZGF0b3JzIGFyZSBpbmRpdmlkdWFsbHlcbiAgICogdmFsaWQuIE90aGVyd2lzZSBpdCByZXR1cm5zIGNvbWJpbmVkIGVycm9ycyBmcm9tIGFsbCBpbnZhbGlkIHZhbGlkYXRvcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7SVZhbGlkYXRvckZuW119IHZhbGlkYXRvcnMgLSBhcnJheSBvZiB2YWxpZGF0b3JzIHRvIGNvbWJpbmVcbiAgICogQHJldHVybiB7SVZhbGlkYXRvckZufSAtIHNpbmdsZSBjb21iaW5lZCB2YWxpZGF0b3IgZnVuY3Rpb25cbiAgICovXG4gIHN0YXRpYyBjb21wb3NlQWxsT2YodmFsaWRhdG9yczogSVZhbGlkYXRvckZuW10pOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghdmFsaWRhdG9ycykgeyByZXR1cm4gbnVsbDsgfVxuICAgIGNvbnN0IHByZXNlbnRWYWxpZGF0b3JzID0gdmFsaWRhdG9ycy5maWx0ZXIoaXNEZWZpbmVkKTtcbiAgICBpZiAocHJlc2VudFZhbGlkYXRvcnMubGVuZ3RoID09PSAwKSB7IHJldHVybiBudWxsOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIGNvbnN0IGNvbWJpbmVkRXJyb3JzID0gX21lcmdlRXJyb3JzKFxuICAgICAgICBfZXhlY3V0ZVZhbGlkYXRvcnMoY29udHJvbCwgcHJlc2VudFZhbGlkYXRvcnMsIGludmVydClcbiAgICAgICk7XG4gICAgICBjb25zdCBpc1ZhbGlkID0gY29tYmluZWRFcnJvcnMgPT09IG51bGw7XG4gICAgICByZXR1cm4gKHhvcihpc1ZhbGlkLCBpbnZlcnQpKSA/XG4gICAgICAgIG51bGwgOiBfbWVyZ2VPYmplY3RzKGNvbWJpbmVkRXJyb3JzLCB7ICdhbGxPZic6ICFpbnZlcnQgfSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiAnY29tcG9zZU5vdCcgdmFsaWRhdG9yIGludmVyc2lvbiBmdW5jdGlvblxuICAgKlxuICAgKiBBY2NlcHRzIGEgc2luZ2xlIHZhbGlkYXRvciBmdW5jdGlvbiBhbmQgaW52ZXJ0cyBpdHMgcmVzdWx0LlxuICAgKiBSZXR1cm5zIHZhbGlkIGlmIHRoZSBzdWJtaXR0ZWQgdmFsaWRhdG9yIGlzIGludmFsaWQsIGFuZFxuICAgKiByZXR1cm5zIGludmFsaWQgaWYgdGhlIHN1Ym1pdHRlZCB2YWxpZGF0b3IgaXMgdmFsaWQuXG4gICAqIChOb3RlOiB0aGlzIGZ1bmN0aW9uIGNhbiBpdHNlbGYgYmUgaW52ZXJ0ZWRcbiAgICogICAtIGUuZy4gY29tcG9zZU5vdChjb21wb3NlTm90KHZhbGlkYXRvcikpIC1cbiAgICogICBidXQgdGhpcyBjYW4gYmUgY29uZnVzaW5nIGFuZCBpcyB0aGVyZWZvcmUgbm90IHJlY29tbWVuZGVkLilcbiAgICpcbiAgICogQHBhcmFtIHtJVmFsaWRhdG9yRm5bXX0gdmFsaWRhdG9ycyAtIHZhbGlkYXRvcihzKSB0byBpbnZlcnRcbiAgICogQHJldHVybiB7SVZhbGlkYXRvckZufSAtIG5ldyB2YWxpZGF0b3IgZnVuY3Rpb24gdGhhdCByZXR1cm5zIG9wcG9zaXRlIHJlc3VsdFxuICAgKi9cbiAgc3RhdGljIGNvbXBvc2VOb3QodmFsaWRhdG9yOiBJVmFsaWRhdG9yRm4pOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghdmFsaWRhdG9yKSB7IHJldHVybiBudWxsOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7IHJldHVybiBudWxsOyB9XG4gICAgICBjb25zdCBlcnJvciA9IHZhbGlkYXRvcihjb250cm9sLCAhaW52ZXJ0KTtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBlcnJvciA9PT0gbnVsbDtcbiAgICAgIHJldHVybiAoeG9yKGlzVmFsaWQsIGludmVydCkpID9cbiAgICAgICAgbnVsbCA6IF9tZXJnZU9iamVjdHMoZXJyb3IsIHsgJ25vdCc6ICFpbnZlcnQgfSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiAnY29tcG9zZScgdmFsaWRhdG9yIGNvbWJpbmF0aW9uIGZ1bmN0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7SVZhbGlkYXRvckZuW119IHZhbGlkYXRvcnMgLSBhcnJheSBvZiB2YWxpZGF0b3JzIHRvIGNvbWJpbmVcbiAgICogQHJldHVybiB7SVZhbGlkYXRvckZufSAtIHNpbmdsZSBjb21iaW5lZCB2YWxpZGF0b3IgZnVuY3Rpb25cbiAgICovXG4gIHN0YXRpYyBjb21wb3NlKHZhbGlkYXRvcnM6IElWYWxpZGF0b3JGbltdKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIXZhbGlkYXRvcnMpIHsgcmV0dXJuIG51bGw7IH1cbiAgICBjb25zdCBwcmVzZW50VmFsaWRhdG9ycyA9IHZhbGlkYXRvcnMuZmlsdGVyKGlzRGVmaW5lZCk7XG4gICAgaWYgKHByZXNlbnRWYWxpZGF0b3JzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gbnVsbDsgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCA9PlxuICAgICAgX21lcmdlRXJyb3JzKF9leGVjdXRlVmFsaWRhdG9ycyhjb250cm9sLCBwcmVzZW50VmFsaWRhdG9ycywgaW52ZXJ0KSk7XG4gIH1cblxuICAvKipcbiAgICogJ2NvbXBvc2VBc3luYycgYXN5bmMgdmFsaWRhdG9yIGNvbWJpbmF0aW9uIGZ1bmN0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7QXN5bmNJVmFsaWRhdG9yRm5bXX0gYXN5bmMgdmFsaWRhdG9ycyAtIGFycmF5IG9mIGFzeW5jIHZhbGlkYXRvcnNcbiAgICogQHJldHVybiB7QXN5bmNJVmFsaWRhdG9yRm59IC0gc2luZ2xlIGNvbWJpbmVkIGFzeW5jIHZhbGlkYXRvciBmdW5jdGlvblxuICAgKi9cbiAgc3RhdGljIGNvbXBvc2VBc3luYyh2YWxpZGF0b3JzOiBBc3luY0lWYWxpZGF0b3JGbltdKTogQXN5bmNJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghdmFsaWRhdG9ycykgeyByZXR1cm4gbnVsbDsgfVxuICAgIGNvbnN0IHByZXNlbnRWYWxpZGF0b3JzID0gdmFsaWRhdG9ycy5maWx0ZXIoaXNEZWZpbmVkKTtcbiAgICBpZiAocHJlc2VudFZhbGlkYXRvcnMubGVuZ3RoID09PSAwKSB7IHJldHVybiBudWxsOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpID0+IHtcbiAgICAgIGNvbnN0IG9ic2VydmFibGVzID1cbiAgICAgICAgX2V4ZWN1dGVBc3luY1ZhbGlkYXRvcnMoY29udHJvbCwgcHJlc2VudFZhbGlkYXRvcnMpLm1hcCh0b09ic2VydmFibGUpO1xuICAgICAgcmV0dXJuIG1hcC5jYWxsKGZvcmtKb2luKG9ic2VydmFibGVzKSwgX21lcmdlRXJyb3JzKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gQWRkaXRpb25hbCBhbmd1bGFyIHZhbGlkYXRvcnMgKG5vdCB1c2VkIGJ5IEFuZ3VhbHIgSlNPTiBTY2hlbWEgRm9ybSlcbiAgLy8gRnJvbSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2Jsb2IvbWFzdGVyL3BhY2thZ2VzL2Zvcm1zL3NyYy92YWxpZGF0b3JzLnRzXG5cbiAgLyoqXG4gICAqIFZhbGlkYXRvciB0aGF0IHJlcXVpcmVzIGNvbnRyb2xzIHRvIGhhdmUgYSB2YWx1ZSBncmVhdGVyIHRoYW4gYSBudW1iZXIuXG4gICAqL1xuICBzdGF0aWMgbWluKG1pbjogbnVtYmVyKTogVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUobWluKSkgeyByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvcjsgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIC8vIGRvbid0IHZhbGlkYXRlIGVtcHR5IHZhbHVlcyB0byBhbGxvdyBvcHRpb25hbCBjb250cm9sc1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkgfHwgaXNFbXB0eShtaW4pKSB7IHJldHVybiBudWxsOyB9XG4gICAgICBjb25zdCB2YWx1ZSA9IHBhcnNlRmxvYXQoY29udHJvbC52YWx1ZSk7XG4gICAgICBjb25zdCBhY3R1YWwgPSBjb250cm9sLnZhbHVlO1xuICAgICAgLy8gQ29udHJvbHMgd2l0aCBOYU4gdmFsdWVzIGFmdGVyIHBhcnNpbmcgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgbm90IGhhdmluZyBhXG4gICAgICAvLyBtaW5pbXVtLCBwZXIgdGhlIEhUTUwgZm9ybXMgc3BlYzogaHR0cHM6Ly93d3cudzMub3JnL1RSL2h0bWw1L2Zvcm1zLmh0bWwjYXR0ci1pbnB1dC1taW5cbiAgICAgIHJldHVybiBpc05hTih2YWx1ZSkgfHwgdmFsdWUgPj0gbWluID8gbnVsbCA6IHsgJ21pbic6IHsgbWluLCBhY3R1YWwgfSB9O1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdG9yIHRoYXQgcmVxdWlyZXMgY29udHJvbHMgdG8gaGF2ZSBhIHZhbHVlIGxlc3MgdGhhbiBhIG51bWJlci5cbiAgICovXG4gIHN0YXRpYyBtYXgobWF4OiBudW1iZXIpOiBWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShtYXgpKSB7IHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgLy8gZG9uJ3QgdmFsaWRhdGUgZW1wdHkgdmFsdWVzIHRvIGFsbG93IG9wdGlvbmFsIGNvbnRyb2xzXG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSB8fCBpc0VtcHR5KG1heCkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIGNvbnN0IHZhbHVlID0gcGFyc2VGbG9hdChjb250cm9sLnZhbHVlKTtcbiAgICAgIGNvbnN0IGFjdHVhbCA9IGNvbnRyb2wudmFsdWU7XG4gICAgICAvLyBDb250cm9scyB3aXRoIE5hTiB2YWx1ZXMgYWZ0ZXIgcGFyc2luZyBzaG91bGQgYmUgdHJlYXRlZCBhcyBub3QgaGF2aW5nIGFcbiAgICAgIC8vIG1heGltdW0sIHBlciB0aGUgSFRNTCBmb3JtcyBzcGVjOiBodHRwczovL3d3dy53My5vcmcvVFIvaHRtbDUvZm9ybXMuaHRtbCNhdHRyLWlucHV0LW1heFxuICAgICAgcmV0dXJuIGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA8PSBtYXggPyBudWxsIDogeyAnbWF4JzogeyBtYXgsIGFjdHVhbCB9IH07XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0b3IgdGhhdCByZXF1aXJlcyBjb250cm9sIHZhbHVlIHRvIGJlIHRydWUuXG4gICAqL1xuICBzdGF0aWMgcmVxdWlyZWRUcnVlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCB7XG4gICAgaWYgKCFjb250cm9sKSB7IHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yOyB9XG4gICAgcmV0dXJuIGNvbnRyb2wudmFsdWUgPT09IHRydWUgPyBudWxsIDogeyAncmVxdWlyZWQnOiB0cnVlIH07XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdG9yIHRoYXQgcGVyZm9ybXMgZW1haWwgdmFsaWRhdGlvbi5cbiAgICovXG4gIHN0YXRpYyBlbWFpbChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwge1xuICAgIGlmICghY29udHJvbCkgeyByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvcjsgfVxuICAgIGNvbnN0IEVNQUlMX1JFR0VYUCA9XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxpbmUtbGVuZ3RoXG4gICAgICAvXig/PS57MSwyNTR9JCkoPz0uezEsNjR9QClbLSEjJCUmJyorLzAtOT0/QS1aXl9gYS16e3x9fl0rKFxcLlstISMkJSYnKisvMC05PT9BLVpeX2BhLXp7fH1+XSspKkBbQS1aYS16MC05XShbQS1aYS16MC05LV17MCw2MX1bQS1aYS16MC05XSk/KFxcLltBLVphLXowLTldKFtBLVphLXowLTktXXswLDYxfVtBLVphLXowLTldKT8pKiQvO1xuICAgIHJldHVybiBFTUFJTF9SRUdFWFAudGVzdChjb250cm9sLnZhbHVlKSA/IG51bGwgOiB7ICdlbWFpbCc6IHRydWUgfTtcbiAgfVxufVxuIl19