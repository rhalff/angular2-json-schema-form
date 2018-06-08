import * as tslib_1 from "tslib";
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
var JsonValidators = /** @class */ (function () {
    function JsonValidators() {
    }
    JsonValidators.required = function (input) {
        if (input === undefined) {
            input = true;
        }
        switch (input) {
            case true:// Return required function (do not execute it yet)
                return function (control, invert) {
                    if (invert === void 0) { invert = false; }
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
    };
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
    JsonValidators.type = function (requiredType) {
        if (!hasValue(requiredType)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var currentValue = control.value;
            var isValid = isArray(requiredType) ?
                requiredType.some(function (type) { return isType(currentValue, type); }) :
                isType(currentValue, requiredType);
            return xor(isValid, invert) ?
                null : { 'type': { requiredType: requiredType, currentValue: currentValue } };
        };
    };
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
    JsonValidators.enum = function (allowedValues) {
        if (!isArray(allowedValues)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var currentValue = control.value;
            var isEqual = function (enumValue, inputValue) {
                return enumValue === inputValue ||
                    (isNumber(enumValue) && +inputValue === +enumValue) ||
                    (isBoolean(enumValue, 'strict') &&
                        toJavaScriptType(inputValue, 'boolean') === enumValue) ||
                    (enumValue === null && !hasValue(inputValue)) ||
                    _.isEqual(enumValue, inputValue);
            };
            var isValid = isArray(currentValue) ?
                currentValue.every(function (inputValue) { return allowedValues.some(function (enumValue) {
                    return isEqual(enumValue, inputValue);
                }); }) :
                allowedValues.some(function (enumValue) { return isEqual(enumValue, currentValue); });
            return xor(isValid, invert) ?
                null : { 'enum': { allowedValues: allowedValues, currentValue: currentValue } };
        };
    };
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
    JsonValidators.const = function (requiredValue) {
        if (!hasValue(requiredValue)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var currentValue = control.value;
            var isEqual = function (constValue, inputValue) {
                return constValue === inputValue ||
                    isNumber(constValue) && +inputValue === +constValue ||
                    isBoolean(constValue, 'strict') &&
                        toJavaScriptType(inputValue, 'boolean') === constValue ||
                    constValue === null && !hasValue(inputValue);
            };
            var isValid = isEqual(requiredValue, currentValue);
            return xor(isValid, invert) ?
                null : { 'const': { requiredValue: requiredValue, currentValue: currentValue } };
        };
    };
    /**
     * 'minLength' validator
     *
     * Requires a control's text value to be greater than a specified length.
     *
     * @param {number} minimumLength - minimum allowed string length
     * @param {boolean = false} invert - instead return error object only if valid
     * @return {IValidatorFn}
     */
    JsonValidators.minLength = function (minimumLength) {
        if (!hasValue(minimumLength)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var currentLength = isString(control.value) ? control.value.length : 0;
            var isValid = currentLength >= minimumLength;
            return xor(isValid, invert) ?
                null : { 'minLength': { minimumLength: minimumLength, currentLength: currentLength } };
        };
    };
    /**
     * 'maxLength' validator
     *
     * Requires a control's text value to be less than a specified length.
     *
     * @param {number} maximumLength - maximum allowed string length
     * @param {boolean = false} invert - instead return error object only if valid
     * @return {IValidatorFn}
     */
    JsonValidators.maxLength = function (maximumLength) {
        if (!hasValue(maximumLength)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            var currentLength = isString(control.value) ? control.value.length : 0;
            var isValid = currentLength <= maximumLength;
            return xor(isValid, invert) ?
                null : { 'maxLength': { maximumLength: maximumLength, currentLength: currentLength } };
        };
    };
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
    JsonValidators.pattern = function (pattern, wholeString) {
        if (wholeString === void 0) { wholeString = false; }
        if (!hasValue(pattern)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var regex;
            var requiredPattern;
            if (typeof pattern === 'string') {
                requiredPattern = (wholeString) ? "^" + pattern + "$" : pattern;
                regex = new RegExp(requiredPattern);
            }
            else {
                requiredPattern = pattern.toString();
                regex = pattern;
            }
            var currentValue = control.value;
            var isValid = isString(currentValue) ? regex.test(currentValue) : false;
            return xor(isValid, invert) ?
                null : { 'pattern': { requiredPattern: requiredPattern, currentValue: currentValue } };
        };
    };
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
    JsonValidators.format = function (requiredFormat) {
        if (!hasValue(requiredFormat)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var isValid;
            var currentValue = control.value;
            if (isString(currentValue)) {
                var formatTest = jsonSchemaFormatTests[requiredFormat];
                if (typeof formatTest === 'object') {
                    isValid = formatTest.test(currentValue);
                }
                else if (typeof formatTest === 'function') {
                    isValid = formatTest(currentValue);
                }
                else {
                    console.error("format validator error: \"" + requiredFormat + "\" is not a recognized format.");
                    isValid = true;
                }
            }
            else {
                // Allow JavaScript Date objects
                isValid = ['date', 'time', 'date-time'].includes(requiredFormat) &&
                    Object.prototype.toString.call(currentValue) === '[object Date]';
            }
            return xor(isValid, invert) ?
                null : { 'format': { requiredFormat: requiredFormat, currentValue: currentValue } };
        };
    };
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
    JsonValidators.minimum = function (minimumValue) {
        if (!hasValue(minimumValue)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var currentValue = control.value;
            var isValid = !isNumber(currentValue) || currentValue >= minimumValue;
            return xor(isValid, invert) ?
                null : { 'minimum': { minimumValue: minimumValue, currentValue: currentValue } };
        };
    };
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
    JsonValidators.exclusiveMinimum = function (exclusiveMinimumValue) {
        if (!hasValue(exclusiveMinimumValue)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var currentValue = control.value;
            var isValid = !isNumber(currentValue) || +currentValue < exclusiveMinimumValue;
            return xor(isValid, invert) ?
                null : { 'exclusiveMinimum': { exclusiveMinimumValue: exclusiveMinimumValue, currentValue: currentValue } };
        };
    };
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
    JsonValidators.maximum = function (maximumValue) {
        if (!hasValue(maximumValue)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var currentValue = control.value;
            var isValid = !isNumber(currentValue) || +currentValue <= maximumValue;
            return xor(isValid, invert) ?
                null : { 'maximum': { maximumValue: maximumValue, currentValue: currentValue } };
        };
    };
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
    JsonValidators.exclusiveMaximum = function (exclusiveMaximumValue) {
        if (!hasValue(exclusiveMaximumValue)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var currentValue = control.value;
            var isValid = !isNumber(currentValue) || +currentValue < exclusiveMaximumValue;
            return xor(isValid, invert) ?
                null : { 'exclusiveMaximum': { exclusiveMaximumValue: exclusiveMaximumValue, currentValue: currentValue } };
        };
    };
    /**
     * 'multipleOf' validator
     *
     * Requires a control to have a numeric value that is a multiple
     * of a specified number.
     *
     * @param {number} multipleOfValue - number value must be a multiple of
     * @return {IValidatorFn}
     */
    JsonValidators.multipleOf = function (multipleOfValue) {
        if (!hasValue(multipleOfValue)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var currentValue = control.value;
            var isValid = isNumber(currentValue) &&
                currentValue % multipleOfValue === 0;
            return xor(isValid, invert) ?
                null : { 'multipleOf': { multipleOfValue: multipleOfValue, currentValue: currentValue } };
        };
    };
    /**
     * 'minProperties' validator
     *
     * Requires a form group to have a minimum number of properties (i.e. have
     * values entered in a minimum number of controls within the group).
     *
     * @param {number} minimumProperties - minimum number of properties allowed
     * @return {IValidatorFn}
     */
    JsonValidators.minProperties = function (minimumProperties) {
        if (!hasValue(minimumProperties)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var currentProperties = Object.keys(control.value).length || 0;
            var isValid = currentProperties >= minimumProperties;
            return xor(isValid, invert) ?
                null : { 'minProperties': { minimumProperties: minimumProperties, currentProperties: currentProperties } };
        };
    };
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
    JsonValidators.maxProperties = function (maximumProperties) {
        if (!hasValue(maximumProperties)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            var currentProperties = Object.keys(control.value).length || 0;
            var isValid = currentProperties <= maximumProperties;
            return xor(isValid, invert) ?
                null : { 'maxProperties': { maximumProperties: maximumProperties, currentProperties: currentProperties } };
        };
    };
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
    JsonValidators.dependencies = function (dependencies) {
        if (getType(dependencies) !== 'object' || isEmpty(dependencies)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var allErrors = _mergeObjects(forEachCopy(dependencies, function (value, requiringField) {
                if (!hasValue(control.value[requiringField])) {
                    return null;
                }
                var requiringFieldErrors = {};
                var requiredFields;
                var properties = {};
                if (getType(dependencies[requiringField]) === 'array') {
                    requiredFields = dependencies[requiringField];
                }
                else if (getType(dependencies[requiringField]) === 'object') {
                    requiredFields = dependencies[requiringField]['required'] || [];
                    properties = dependencies[requiringField]['properties'] || {};
                }
                try {
                    // Validate property dependencies
                    for (var requiredFields_1 = tslib_1.__values(requiredFields), requiredFields_1_1 = requiredFields_1.next(); !requiredFields_1_1.done; requiredFields_1_1 = requiredFields_1.next()) {
                        var requiredField = requiredFields_1_1.value;
                        if (xor(!hasValue(control.value[requiredField]), invert)) {
                            requiringFieldErrors[requiredField] = { 'required': true };
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (requiredFields_1_1 && !requiredFields_1_1.done && (_a = requiredFields_1.return)) _a.call(requiredFields_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                // Validate schema dependencies
                requiringFieldErrors = _mergeObjects(requiringFieldErrors, forEachCopy(properties, function (requirements, requiredField) {
                    var requiredFieldErrors = _mergeObjects(forEachCopy(requirements, function (requirement, parameter) {
                        var validator = null;
                        if (requirement === 'maximum' || requirement === 'minimum') {
                            var exclusive = !!requirements['exclusiveM' + requirement.slice(1)];
                            validator = JsonValidators[requirement](parameter, exclusive);
                        }
                        else if (typeof JsonValidators[requirement] === 'function') {
                            validator = JsonValidators[requirement](parameter);
                        }
                        return !isDefined(validator) ?
                            null : validator(control.value[requiredField]);
                    }));
                    return isEmpty(requiredFieldErrors) ?
                        null : (_a = {}, _a[requiredField] = requiredFieldErrors, _a);
                    var _a;
                }));
                return isEmpty(requiringFieldErrors) ?
                    null : (_b = {}, _b[requiringField] = requiringFieldErrors, _b);
                var e_1, _a, _b;
            }));
            return isEmpty(allErrors) ? null : allErrors;
        };
    };
    /**
     * 'minItems' validator
     *
     * Requires a form array to have a minimum number of values.
     *
     * @param {number} minimumItems - minimum number of items allowed
     * @return {IValidatorFn}
     */
    JsonValidators.minItems = function (minimumItems) {
        if (!hasValue(minimumItems)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var currentItems = isArray(control.value) ? control.value.length : 0;
            var isValid = currentItems >= minimumItems;
            return xor(isValid, invert) ?
                null : { 'minItems': { minimumItems: minimumItems, currentItems: currentItems } };
        };
    };
    /**
     * 'maxItems' validator
     *
     * Requires a form array to have a maximum number of values.
     *
     * @param {number} maximumItems - maximum number of items allowed
     * @return {IValidatorFn}
     */
    JsonValidators.maxItems = function (maximumItems) {
        if (!hasValue(maximumItems)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            var currentItems = isArray(control.value) ? control.value.length : 0;
            var isValid = currentItems <= maximumItems;
            return xor(isValid, invert) ?
                null : { 'maxItems': { maximumItems: maximumItems, currentItems: currentItems } };
        };
    };
    /**
     * 'uniqueItems' validator
     *
     * Requires values in a form array to be unique.
     *
     * @param {boolean = true} unique? - true to validate, false to disable
     * @return {IValidatorFn}
     */
    JsonValidators.uniqueItems = function (unique) {
        if (unique === void 0) { unique = true; }
        if (!unique) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var sorted = control.value.slice().sort();
            var duplicateItems = [];
            for (var i = 1; i < sorted.length; i++) {
                if (sorted[i - 1] === sorted[i] && duplicateItems.includes(sorted[i])) {
                    duplicateItems.push(sorted[i]);
                }
            }
            var isValid = !duplicateItems.length;
            return xor(isValid, invert) ?
                null : { 'uniqueItems': { duplicateItems: duplicateItems } };
        };
    };
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
    JsonValidators.contains = function (requiredItem) {
        if (requiredItem === void 0) { requiredItem = true; }
        if (!requiredItem) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value) || !isArray(control.value)) {
                return null;
            }
            var currentItems = control.value;
            // const isValid = currentItems.some(item =>
            //
            // );
            var isValid = true;
            return xor(isValid, invert) ?
                null : { 'contains': { requiredItem: requiredItem, currentItems: currentItems } };
        };
    };
    /**
     * No-op validator. Included for backward compatibility.
     */
    JsonValidators.nullValidator = function (control) {
        return null;
    };
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
    JsonValidators.composeAnyOf = function (validators) {
        if (!validators) {
            return null;
        }
        var presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            var arrayOfErrors = _executeValidators(control, presentValidators, invert).filter(isDefined);
            var isValid = validators.length > arrayOfErrors.length;
            return xor(isValid, invert) ?
                null : _mergeObjects.apply(void 0, tslib_1.__spread(arrayOfErrors, [{ 'anyOf': !invert }]));
        };
    };
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
    JsonValidators.composeOneOf = function (validators) {
        if (!validators) {
            return null;
        }
        var presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            var arrayOfErrors = _executeValidators(control, presentValidators);
            var validControls = validators.length - arrayOfErrors.filter(isDefined).length;
            var isValid = validControls === 1;
            if (xor(isValid, invert)) {
                return null;
            }
            var arrayOfValids = _executeValidators(control, presentValidators, invert);
            return _mergeObjects.apply(void 0, tslib_1.__spread(arrayOfErrors, arrayOfValids, [{ 'oneOf': !invert }]));
        };
    };
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
    JsonValidators.composeAllOf = function (validators) {
        if (!validators) {
            return null;
        }
        var presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            var combinedErrors = _mergeErrors(_executeValidators(control, presentValidators, invert));
            var isValid = combinedErrors === null;
            return (xor(isValid, invert)) ?
                null : _mergeObjects(combinedErrors, { 'allOf': !invert });
        };
    };
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
    JsonValidators.composeNot = function (validator) {
        if (!validator) {
            return null;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var error = validator(control, !invert);
            var isValid = error === null;
            return (xor(isValid, invert)) ?
                null : _mergeObjects(error, { 'not': !invert });
        };
    };
    /**
     * 'compose' validator combination function
     *
     * @param {IValidatorFn[]} validators - array of validators to combine
     * @return {IValidatorFn} - single combined validator function
     */
    JsonValidators.compose = function (validators) {
        if (!validators) {
            return null;
        }
        var presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            return _mergeErrors(_executeValidators(control, presentValidators, invert));
        };
    };
    /**
     * 'composeAsync' async validator combination function
     *
     * @param {AsyncIValidatorFn[]} async validators - array of async validators
     * @return {AsyncIValidatorFn} - single combined async validator function
     */
    JsonValidators.composeAsync = function (validators) {
        if (!validators) {
            return null;
        }
        var presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return function (control) {
            var observables = _executeAsyncValidators(control, presentValidators).map(toObservable);
            return map.call(forkJoin(observables), _mergeErrors);
        };
    };
    // Additional angular validators (not used by Angualr JSON Schema Form)
    // From https://github.com/angular/angular/blob/master/packages/forms/src/validators.ts
    /**
     * Validator that requires controls to have a value greater than a number.
     */
    JsonValidators.min = function (min) {
        if (!hasValue(min)) {
            return JsonValidators.nullValidator;
        }
        return function (control) {
            // don't validate empty values to allow optional controls
            if (isEmpty(control.value) || isEmpty(min)) {
                return null;
            }
            var value = parseFloat(control.value);
            var actual = control.value;
            // Controls with NaN values after parsing should be treated as not having a
            // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min
            return isNaN(value) || value >= min ? null : { 'min': { min: min, actual: actual } };
        };
    };
    /**
     * Validator that requires controls to have a value less than a number.
     */
    JsonValidators.max = function (max) {
        if (!hasValue(max)) {
            return JsonValidators.nullValidator;
        }
        return function (control) {
            // don't validate empty values to allow optional controls
            if (isEmpty(control.value) || isEmpty(max)) {
                return null;
            }
            var value = parseFloat(control.value);
            var actual = control.value;
            // Controls with NaN values after parsing should be treated as not having a
            // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max
            return isNaN(value) || value <= max ? null : { 'max': { max: max, actual: actual } };
        };
    };
    /**
     * Validator that requires control value to be true.
     */
    JsonValidators.requiredTrue = function (control) {
        if (!control) {
            return JsonValidators.nullValidator;
        }
        return control.value === true ? null : { 'required': true };
    };
    /**
     * Validator that performs email validation.
     */
    JsonValidators.email = function (control) {
        if (!control) {
            return JsonValidators.nullValidator;
        }
        var EMAIL_REGEXP = 
        // tslint:disable-next-line max-line-length
        /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
        return EMAIL_REGEXP.test(control.value) ? null : { 'email': true };
    };
    return JsonValidators;
}());
export { JsonValidators };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi52YWxpZGF0b3JzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcjItanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbInNyYy9zaGFyZWQvanNvbi52YWxpZGF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDM0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRS9DLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE9BQU8sRUFDTCxrQkFBa0IsRUFBRSx1QkFBdUIsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUN4RSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQ3BFLE9BQU8sRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFFckQsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbEQsT0FBTyxFQUFFLHFCQUFxQixFQUF5QixNQUFNLDBCQUEwQixDQUFDO0FBRXhGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4RUc7QUFDSDtJQUFBO0lBZ3dCQSxDQUFDO0lBMXRCUSx1QkFBUSxHQUFmLFVBQWdCLEtBQStCO1FBQzdDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNkLEtBQUssSUFBSSxDQUFFLG1EQUFtRDtnQkFDNUQsTUFBTSxDQUFDLFVBQUMsT0FBd0IsRUFBRSxNQUFj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Q3hDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDN0IsMkVBQTJFO1lBQzNFLDBGQUEwRjtZQUMxRixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLEtBQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxFQUFFLENBQUM7UUFDMUUsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0ksMkJBQVksR0FBbkIsVUFBb0IsT0FBd0I7UUFDMUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUM7UUFBQyxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUM5RCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxvQkFBSyxHQUFaLFVBQWEsT0FBd0I7UUFDbkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUM7UUFBQyxDQUFDO1FBQ3RELElBQU0sWUFBWTtRQUNoQiwyQ0FBMkM7UUFDM0MsNExBQTRMLENBQUM7UUFDL0wsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3JFLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUFod0JELElBZ3dCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgVmFsaWRhdGlvbkVycm9ycywgVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy1jb21wYXQvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBmb3JrSm9pbiB9IGZyb20gJ3J4anMtY29tcGF0L29ic2VydmFibGUvZm9ya0pvaW4nO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy1jb21wYXQvb3BlcmF0b3IvbWFwJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQge1xuICBfZXhlY3V0ZVZhbGlkYXRvcnMsIF9leGVjdXRlQXN5bmNWYWxpZGF0b3JzLCBfbWVyZ2VPYmplY3RzLCBfbWVyZ2VFcnJvcnMsXG4gIGlzRW1wdHksIGlzRGVmaW5lZCwgaGFzVmFsdWUsIGlzU3RyaW5nLCBpc051bWJlciwgaXNCb29sZWFuLCBpc0FycmF5LFxuICBnZXRUeXBlLCBpc1R5cGUsIHRvSmF2YVNjcmlwdFR5cGUsIHRvT2JzZXJ2YWJsZSwgeG9yLCBTY2hlbWFQcmltaXRpdmVUeXBlLFxuICBQbGFpbk9iamVjdCwgSVZhbGlkYXRvckZuLCBBc3luY0lWYWxpZGF0b3JGblxufSBmcm9tICcuL3ZhbGlkYXRvci5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgZm9yRWFjaENvcHkgfSBmcm9tICcuL3V0aWxpdHkuZnVuY3Rpb25zJztcbmltcG9ydCB7IGpzb25TY2hlbWFGb3JtYXRUZXN0cywgSnNvblNjaGVtYUZvcm1hdE5hbWVzIH0gZnJvbSAnLi9mb3JtYXQtcmVnZXguY29uc3RhbnRzJztcblxuLyoqXG4gKiAnSnNvblZhbGlkYXRvcnMnIGNsYXNzXG4gKlxuICogUHJvdmlkZXMgYW4gZXh0ZW5kZWQgc2V0IG9mIHZhbGlkYXRvcnMgdG8gYmUgdXNlZCBieSBmb3JtIGNvbnRyb2xzLFxuICogY29tcGF0aWJsZSB3aXRoIHN0YW5kYXJkIEpTT04gU2NoZW1hIHZhbGlkYXRpb24gb3B0aW9ucy5cbiAqIGh0dHA6Ly9qc29uLXNjaGVtYS5vcmcvbGF0ZXN0L2pzb24tc2NoZW1hLXZhbGlkYXRpb24uaHRtbFxuICpcbiAqIE5vdGU6IFRoaXMgbGlicmFyeSBpcyBkZXNpZ25lZCBhcyBhIGRyb3AtaW4gcmVwbGFjZW1lbnQgZm9yIHRoZSBBbmd1bGFyXG4gKiBWYWxpZGF0b3JzIGxpYnJhcnksIGFuZCBleGNlcHQgZm9yIG9uZSBzbWFsbCBicmVha2luZyBjaGFuZ2UgdG8gdGhlICdwYXR0ZXJuJ1xuICogdmFsaWRhdG9yIChkZXNjcmliZWQgYmVsb3cpIGl0IGNhbiBldmVuIGJlIGltcG9ydGVkIGFzIGEgc3Vic3RpdHV0ZSwgbGlrZSBzbzpcbiAqXG4gKiAgIGltcG9ydCB7IEpzb25WYWxpZGF0b3JzIGFzIFZhbGlkYXRvcnMgfSBmcm9tICdqc29uLXZhbGlkYXRvcnMnO1xuICpcbiAqIGFuZCBpdCBzaG91bGQgd29yayB3aXRoIGV4aXN0aW5nIGNvZGUgYXMgYSBjb21wbGV0ZSByZXBsYWNlbWVudC5cbiAqXG4gKiBUaGUgb25lIGV4Y2VwdGlvbiBpcyB0aGUgJ3BhdHRlcm4nIHZhbGlkYXRvciwgd2hpY2ggaGFzIGJlZW4gY2hhbmdlZCB0b1xuICogbWF0Y2hlIHBhcnRpYWwgdmFsdWVzIGJ5IGRlZmF1bHQgKHRoZSBzdGFuZGFyZCAncGF0dGVybicgdmFsaWRhdG9yIHdyYXBwZWRcbiAqIGFsbCBwYXR0ZXJucyBpbiAnXicgYW5kICckJywgZm9yY2luZyB0aGVtIHRvIGFsd2F5cyBtYXRjaCBhbiBlbnRpcmUgdmFsdWUpLlxuICogSG93ZXZlciwgdGhlIG9sZCBiZWhhdmlvciBjYW4gYmUgcmVzdG9yZWQgYnkgc2ltcGx5IGFkZGluZyAnXicgYW5kICckJ1xuICogYXJvdW5kIHlvdXIgcGF0dGVybnMsIG9yIGJ5IHBhc3NpbmcgYW4gb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlciBvZiBUUlVFLlxuICogVGhpcyBjaGFuZ2UgaXMgdG8gbWFrZSB0aGUgJ3BhdHRlcm4nIHZhbGlkYXRvciBtYXRjaCB0aGUgYmVoYXZpb3Igb2YgYVxuICogSlNPTiBTY2hlbWEgcGF0dGVybiwgd2hpY2ggYWxsb3dzIHBhcnRpYWwgbWF0Y2hlcywgcmF0aGVyIHRoYW4gdGhlIGJlaGF2aW9yXG4gKiBvZiBhbiBIVE1MIGlucHV0IGNvbnRyb2wgcGF0dGVybiwgd2hpY2ggZG9lcyBub3QuXG4gKlxuICogVGhpcyBsaWJyYXJ5IHJlcGxhY2VzIEFuZ3VsYXIncyB2YWxpZGF0b3JzIGFuZCBjb21iaW5hdGlvbiBmdW5jdGlvbnNcbiAqIHdpdGggdGhlIGZvbGxvd2luZyB2YWxpZGF0b3JzIGFuZCB0cmFuc2Zvcm1hdGlvbiBmdW5jdGlvbnM6XG4gKlxuICogVmFsaWRhdG9yczpcbiAqICAgRm9yIGFsbCBmb3JtQ29udHJvbHM6ICAgICByZXF1aXJlZCAoKiksIHR5cGUsIGVudW0sIGNvbnN0XG4gKiAgIEZvciB0ZXh0IGZvcm1Db250cm9sczogICAgbWluTGVuZ3RoICgqKSwgbWF4TGVuZ3RoICgqKSwgcGF0dGVybiAoKiksIGZvcm1hdFxuICogICBGb3IgbnVtZXJpYyBmb3JtQ29udHJvbHM6IG1heGltdW0sIGV4Y2x1c2l2ZU1heGltdW0sXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bSwgZXhjbHVzaXZlTWluaW11bSwgbXVsdGlwbGVPZlxuICogICBGb3IgZm9ybUdyb3VwIG9iamVjdHM6ICAgIG1pblByb3BlcnRpZXMsIG1heFByb3BlcnRpZXMsIGRlcGVuZGVuY2llc1xuICogICBGb3IgZm9ybUFycmF5IGFycmF5czogICAgIG1pbkl0ZW1zLCBtYXhJdGVtcywgdW5pcXVlSXRlbXMsIGNvbnRhaW5zXG4gKiAgIE5vdCB1c2VkIGJ5IEpTT04gU2NoZW1hOiAgbWluICgqKSwgbWF4ICgqKSwgcmVxdWlyZWRUcnVlICgqKSwgZW1haWwgKCopXG4gKiAoVmFsaWRhdG9ycyBvcmlnaW5hbGx5IGluY2x1ZGVkIHdpdGggQW5ndWxhciBhcmUgbWFrZWQgd2l0aCAoKikuKVxuICpcbiAqIE5PVEUgLyBUT0RPOiBUaGUgZGVwZW5kZW5jaWVzIHZhbGlkYXRvciBpcyBub3QgY29tcGxldGUuXG4gKiBOT1RFIC8gVE9ETzogVGhlIGNvbnRhaW5zIHZhbGlkYXRvciBpcyBub3QgY29tcGxldGUuXG4gKlxuICogVmFsaWRhdG9ycyBub3QgdXNlZCBieSBKU09OIFNjaGVtYSAoYnV0IGluY2x1ZGVkIGZvciBjb21wYXRpYmlsaXR5KVxuICogYW5kIHRoZWlyIEpTT04gU2NoZW1hIGVxdWl2YWxlbnRzOlxuICpcbiAqICAgQW5ndWxhciB2YWxpZGF0b3IgfCBKU09OIFNjaGVtYSBlcXVpdmFsZW50XG4gKiAgIC0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogICAgIG1pbihudW1iZXIpICAgICB8ICAgbWluaW11bShudW1iZXIpXG4gKiAgICAgbWF4KG51bWJlcikgICAgIHwgICBtYXhpbXVtKG51bWJlcilcbiAqICAgICByZXF1aXJlZFRydWUoKSAgfCAgIGNvbnN0KHRydWUpXG4gKiAgICAgZW1haWwoKSAgICAgICAgIHwgICBmb3JtYXQoJ2VtYWlsJylcbiAqXG4gKiBWYWxpZGF0b3IgdHJhbnNmb3JtYXRpb24gZnVuY3Rpb25zOlxuICogICBjb21wb3NlQW55T2YsIGNvbXBvc2VPbmVPZiwgY29tcG9zZUFsbE9mLCBjb21wb3NlTm90XG4gKiAoQW5ndWxhcidzIG9yaWdpbmFsIGNvbWJpbmF0aW9uIGZ1bmNpdG9uLCAnY29tcG9zZScsIGlzIGFsc28gaW5jbHVkZWQgZm9yXG4gKiBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LCB0aG91Z2ggaXQgaXMgZnVuY3Rpb25hbGx5IGVxdWl2YWxlbnQgdG8gY29tcG9zZUFsbE9mLFxuICogYXNzaWRlIGZyb20gaXRzIG1vcmUgZ2VuZXJpYyBlcnJvciBtZXNzYWdlLilcbiAqXG4gKiBBbGwgdmFsaWRhdG9ycyBoYXZlIGFsc28gYmVlbiBleHRlbmRlZCB0byBhY2NlcHQgYW4gb3B0aW9uYWwgc2Vjb25kIGFyZ3VtZW50XG4gKiB3aGljaCwgaWYgcGFzc2VkIGEgVFJVRSB2YWx1ZSwgY2F1c2VzIHRoZSB2YWxpZGF0b3IgdG8gcGVyZm9ybSB0aGUgb3Bwb3NpdGVcbiAqIG9mIGl0cyBvcmlnaW5hbCBmaW5jdGlvbi4gKFRoaXMgaXMgdXNlZCBpbnRlcm5hbGx5IHRvIGVuYWJsZSAnbm90JyBhbmRcbiAqICdjb21wb3NlT25lT2YnIHRvIGZ1bmN0aW9uIGFuZCByZXR1cm4gdXNlZnVsIGVycm9yIG1lc3NhZ2VzLilcbiAqXG4gKiBUaGUgJ3JlcXVpcmVkJyB2YWxpZGF0b3IgaGFzIGFsc28gYmVlbiBvdmVybG9hZGVkIHNvIHRoYXQgaWYgY2FsbGVkIHdpdGhcbiAqIGEgYm9vbGVhbiBwYXJhbWV0ZXIgKG9yIG5vIHBhcmFtZXRlcnMpIGl0IHJldHVybnMgdGhlIG9yaWdpbmFsIHZhbGlkYXRvclxuICogZnVuY3Rpb24gKHJhdGhlciB0aGFuIGV4ZWN1dGluZyBpdCkuIEhvd2V2ZXIsIGlmIGl0IGlzIGNhbGxlZCB3aXRoIGFuXG4gKiBBYnN0cmFjdENvbnRyb2wgcGFyYW1ldGVyIChhcyB3YXMgcHJldmlvdXNseSByZXF1aXJlZCksIGl0IGJlaGF2ZXNcbiAqIGV4YWN0bHkgYXMgYmVmb3JlLlxuICpcbiAqIFRoaXMgZW5hYmxlcyBhbGwgdmFsaWRhdG9ycyAoaW5jbHVkaW5nICdyZXF1aXJlZCcpIHRvIGJlIGNvbnN0cnVjdGVkIGluXG4gKiBleGFjdGx5IHRoZSBzYW1lIHdheSwgc28gdGhleSBjYW4gYmUgYXV0b21hdGljYWxseSBhcHBsaWVkIHVzaW5nIHRoZVxuICogZXF1aXZhbGVudCBrZXkgbmFtZXMgYW5kIHZhbHVlcyB0YWtlbiBkaXJlY3RseSBmcm9tIGEgSlNPTiBTY2hlbWEuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBwYXJ0aWFsbHkgZGVyaXZlZCBmcm9tIEFuZ3VsYXIsXG4gKiB3aGljaCBpcyBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNyBHb29nbGUsIEluYy5cbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIHRoZXJlZm9yZSBnb3Zlcm5lZCBieSB0aGUgc2FtZSBNSVQtc3R5bGUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICpcbiAqIE9yaWdpbmFsIEFuZ3VsYXIgVmFsaWRhdG9yczpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvYmxvYi9tYXN0ZXIvcGFja2FnZXMvZm9ybXMvc3JjL3ZhbGlkYXRvcnMudHNcbiAqL1xuZXhwb3J0IGNsYXNzIEpzb25WYWxpZGF0b3JzIHtcblxuICAvKipcbiAgICogVmFsaWRhdG9yIGZ1bmN0aW9uczpcbiAgICpcbiAgICogRm9yIGFsbCBmb3JtQ29udHJvbHM6ICAgICByZXF1aXJlZCwgdHlwZSwgZW51bSwgY29uc3RcbiAgICogRm9yIHRleHQgZm9ybUNvbnRyb2xzOiAgICBtaW5MZW5ndGgsIG1heExlbmd0aCwgcGF0dGVybiwgZm9ybWF0XG4gICAqIEZvciBudW1lcmljIGZvcm1Db250cm9sczogbWF4aW11bSwgZXhjbHVzaXZlTWF4aW11bSxcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtLCBleGNsdXNpdmVNaW5pbXVtLCBtdWx0aXBsZU9mXG4gICAqIEZvciBmb3JtR3JvdXAgb2JqZWN0czogICAgbWluUHJvcGVydGllcywgbWF4UHJvcGVydGllcywgZGVwZW5kZW5jaWVzXG4gICAqIEZvciBmb3JtQXJyYXkgYXJyYXlzOiAgICAgbWluSXRlbXMsIG1heEl0ZW1zLCB1bmlxdWVJdGVtcywgY29udGFpbnNcbiAgICpcbiAgICogVE9ETzogZmluaXNoIGRlcGVuZGVuY2llcyB2YWxpZGF0b3JcbiAgICovXG5cbiAgLyoqXG4gICAqICdyZXF1aXJlZCcgdmFsaWRhdG9yXG4gICAqXG4gICAqIFRoaXMgdmFsaWRhdG9yIGlzIG92ZXJsb2FkZWQsIGNvbXBhcmVkIHRvIHRoZSBkZWZhdWx0IHJlcXVpcmVkIHZhbGlkYXRvci5cbiAgICogSWYgY2FsbGVkIHdpdGggbm8gcGFyYW1ldGVycywgb3IgVFJVRSwgdGhpcyB2YWxpZGF0b3IgcmV0dXJucyB0aGVcbiAgICogJ3JlcXVpcmVkJyB2YWxpZGF0b3IgZnVuY3Rpb24gKHJhdGhlciB0aGFuIGV4ZWN1dGluZyBpdCkuIFRoaXMgbWF0Y2hlc1xuICAgKiB0aGUgYmVoYXZpb3Igb2YgYWxsIG90aGVyIHZhbGlkYXRvcnMgaW4gdGhpcyBsaWJyYXJ5LlxuICAgKlxuICAgKiBJZiB0aGlzIHZhbGlkYXRvciBpcyBjYWxsZWQgd2l0aCBhbiBBYnN0cmFjdENvbnRyb2wgcGFyYW1ldGVyXG4gICAqIChhcyB3YXMgcHJldmlvdXNseSByZXF1aXJlZCkgaXQgYmVoYXZlcyB0aGUgc2FtZSBhcyBBbmd1bGFyJ3MgZGVmYXVsdFxuICAgKiByZXF1aXJlZCB2YWxpZGF0b3IsIGFuZCByZXR1cm5zIGFuIGVycm9yIGlmIHRoZSBjb250cm9sIGlzIGVtcHR5LlxuICAgKlxuICAgKiBPbGQgYmVoYXZpb3I6IChpZiBpbnB1dCB0eXBlID0gQWJzdHJhY3RDb250cm9sKVxuICAgKiBAcGFyYW0ge0Fic3RyYWN0Q29udHJvbH0gY29udHJvbCAtIHJlcXVpcmVkIGNvbnRyb2xcbiAgICogQHJldHVybiB7e1trZXk6IHN0cmluZ106IGJvb2xlYW59fSAtIHJldHVybnMgZXJyb3IgbWVzc2FnZSBpZiBubyBpbnB1dFxuICAgKlxuICAgKiBOZXcgYmVoYXZpb3I6IChpZiBubyBpbnB1dCwgb3IgaW5wdXQgdHlwZSA9IGJvb2xlYW4pXG4gICAqIEBwYXJhbSB7Ym9vbGVhbiA9IHRydWV9IHJlcXVpcmVkPyAtIHRydWUgdG8gdmFsaWRhdGUsIGZhbHNlIHRvIGRpc2FibGVcbiAgICogQHJldHVybiB7SVZhbGlkYXRvckZufSAtIHJldHVybnMgdGhlICdyZXF1aXJlZCcgdmFsaWRhdG9yIGZ1bmN0aW9uIGl0c2VsZlxuICAgKi9cbiAgc3RhdGljIHJlcXVpcmVkKGlucHV0OiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGw7XG4gIHN0YXRpYyByZXF1aXJlZChpbnB1dD86IGJvb2xlYW4pOiBJVmFsaWRhdG9yRm47XG5cbiAgc3RhdGljIHJlcXVpcmVkKGlucHV0PzogQWJzdHJhY3RDb250cm9sfGJvb2xlYW4pOiBWYWxpZGF0aW9uRXJyb3JzfG51bGx8SVZhbGlkYXRvckZuIHtcbiAgICBpZiAoaW5wdXQgPT09IHVuZGVmaW5lZCkgeyBpbnB1dCA9IHRydWU7IH1cbiAgICBzd2l0Y2ggKGlucHV0KSB7XG4gICAgICBjYXNlIHRydWU6IC8vIFJldHVybiByZXF1aXJlZCBmdW5jdGlvbiAoZG8gbm90IGV4ZWN1dGUgaXQgeWV0KVxuICAgICAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgICAgIGlmIChpbnZlcnQpIHsgcmV0dXJuIG51bGw7IH0gLy8gaWYgbm90IHJlcXVpcmVkLCBhbHdheXMgcmV0dXJuIHZhbGlkXG4gICAgICAgICAgcmV0dXJuIGhhc1ZhbHVlKGNvbnRyb2wudmFsdWUpID8gbnVsbCA6IHsgJ3JlcXVpcmVkJzogdHJ1ZSB9O1xuICAgICAgICB9O1xuICAgICAgY2FzZSBmYWxzZTogLy8gRG8gbm90aGluZyAoaWYgZmllbGQgaXMgbm90IHJlcXVpcmVkLCBpdCBpcyBhbHdheXMgdmFsaWQpXG4gICAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yO1xuICAgICAgZGVmYXVsdDogLy8gRXhlY3V0ZSByZXF1aXJlZCBmdW5jdGlvblxuICAgICAgICByZXR1cm4gaGFzVmFsdWUoKDxBYnN0cmFjdENvbnRyb2w+aW5wdXQpLnZhbHVlKSA/IG51bGwgOiB7ICdyZXF1aXJlZCc6IHRydWUgfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ3R5cGUnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wgdG8gb25seSBhY2NlcHQgdmFsdWVzIG9mIGEgc3BlY2lmaWVkIHR5cGUsXG4gICAqIG9yIG9uZSBvZiBhbiBhcnJheSBvZiB0eXBlcy5cbiAgICpcbiAgICogTm90ZTogU2NoZW1hUHJpbWl0aXZlVHlwZSA9ICdzdHJpbmcnfCdudW1iZXInfCdpbnRlZ2VyJ3wnYm9vbGVhbid8J251bGwnXG4gICAqXG4gICAqIEBwYXJhbSB7U2NoZW1hUHJpbWl0aXZlVHlwZXxTY2hlbWFQcmltaXRpdmVUeXBlW119IHR5cGUgLSB0eXBlKHMpIHRvIGFjY2VwdFxuICAgKiBAcmV0dXJuIHtJVmFsaWRhdG9yRm59XG4gICAqL1xuICBzdGF0aWMgdHlwZShyZXF1aXJlZFR5cGU6IFNjaGVtYVByaW1pdGl2ZVR5cGV8U2NoZW1hUHJpbWl0aXZlVHlwZVtdKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKHJlcXVpcmVkVHlwZSkpIHsgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZTogYW55ID0gY29udHJvbC52YWx1ZTtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBpc0FycmF5KHJlcXVpcmVkVHlwZSkgP1xuICAgICAgICAoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT5yZXF1aXJlZFR5cGUpLnNvbWUodHlwZSA9PiBpc1R5cGUoY3VycmVudFZhbHVlLCB0eXBlKSkgOlxuICAgICAgICBpc1R5cGUoY3VycmVudFZhbHVlLCA8U2NoZW1hUHJpbWl0aXZlVHlwZT5yZXF1aXJlZFR5cGUpO1xuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHsgJ3R5cGUnOiB7IHJlcXVpcmVkVHlwZSwgY3VycmVudFZhbHVlIH0gfTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqICdlbnVtJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBjb250cm9sIHRvIGhhdmUgYSB2YWx1ZSBmcm9tIGFuIGVudW1lcmF0ZWQgbGlzdCBvZiB2YWx1ZXMuXG4gICAqXG4gICAqIENvbnZlcnRzIHR5cGVzIGFzIG5lZWRlZCB0byBhbGxvdyBzdHJpbmcgaW5wdXRzIHRvIHN0aWxsIGNvcnJlY3RseVxuICAgKiBtYXRjaCBudW1iZXIsIGJvb2xlYW4sIGFuZCBudWxsIGVudW0gdmFsdWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge2FueVtdfSBhbGxvd2VkVmFsdWVzIC0gYXJyYXkgb2YgYWNjZXB0YWJsZSB2YWx1ZXNcbiAgICogQHJldHVybiB7SVZhbGlkYXRvckZufVxuICAgKi9cbiAgc3RhdGljIGVudW0oYWxsb3dlZFZhbHVlczogYW55W10pOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaXNBcnJheShhbGxvd2VkVmFsdWVzKSkgeyByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvcjsgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkgeyByZXR1cm4gbnVsbDsgfVxuICAgICAgY29uc3QgY3VycmVudFZhbHVlOiBhbnkgPSBjb250cm9sLnZhbHVlO1xuICAgICAgY29uc3QgaXNFcXVhbCA9IChlbnVtVmFsdWUsIGlucHV0VmFsdWUpID0+XG4gICAgICAgIGVudW1WYWx1ZSA9PT0gaW5wdXRWYWx1ZSB8fFxuICAgICAgICAoaXNOdW1iZXIoZW51bVZhbHVlKSAmJiAraW5wdXRWYWx1ZSA9PT0gK2VudW1WYWx1ZSkgfHxcbiAgICAgICAgKGlzQm9vbGVhbihlbnVtVmFsdWUsICdzdHJpY3QnKSAmJlxuICAgICAgICAgIHRvSmF2YVNjcmlwdFR5cGUoaW5wdXRWYWx1ZSwgJ2Jvb2xlYW4nKSA9PT0gZW51bVZhbHVlKSB8fFxuICAgICAgICAoZW51bVZhbHVlID09PSBudWxsICYmICFoYXNWYWx1ZShpbnB1dFZhbHVlKSkgfHxcbiAgICAgICAgXy5pc0VxdWFsKGVudW1WYWx1ZSwgaW5wdXRWYWx1ZSk7XG4gICAgICBjb25zdCBpc1ZhbGlkID0gaXNBcnJheShjdXJyZW50VmFsdWUpID9cbiAgICAgICAgY3VycmVudFZhbHVlLmV2ZXJ5KGlucHV0VmFsdWUgPT4gYWxsb3dlZFZhbHVlcy5zb21lKGVudW1WYWx1ZSA9PlxuICAgICAgICAgIGlzRXF1YWwoZW51bVZhbHVlLCBpbnB1dFZhbHVlKVxuICAgICAgICApKSA6XG4gICAgICAgIGFsbG93ZWRWYWx1ZXMuc29tZShlbnVtVmFsdWUgPT4gaXNFcXVhbChlbnVtVmFsdWUsIGN1cnJlbnRWYWx1ZSkpO1xuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHsgJ2VudW0nOiB7IGFsbG93ZWRWYWx1ZXMsIGN1cnJlbnRWYWx1ZSB9IH07XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiAnY29uc3QnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wgdG8gaGF2ZSBhIHNwZWNpZmljIHZhbHVlLlxuICAgKlxuICAgKiBDb252ZXJ0cyB0eXBlcyBhcyBuZWVkZWQgdG8gYWxsb3cgc3RyaW5nIGlucHV0cyB0byBzdGlsbCBjb3JyZWN0bHlcbiAgICogbWF0Y2ggbnVtYmVyLCBib29sZWFuLCBhbmQgbnVsbCB2YWx1ZXMuXG4gICAqXG4gICAqIFRPRE86IG1vZGlmeSB0byB3b3JrIHdpdGggb2JqZWN0c1xuICAgKlxuICAgKiBAcGFyYW0ge2FueVtdfSByZXF1aXJlZFZhbHVlIC0gcmVxdWlyZWQgdmFsdWVcbiAgICogQHJldHVybiB7SVZhbGlkYXRvckZufVxuICAgKi9cbiAgc3RhdGljIGNvbnN0KHJlcXVpcmVkVmFsdWU6IGFueSk6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShyZXF1aXJlZFZhbHVlKSkgeyByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvcjsgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkgeyByZXR1cm4gbnVsbDsgfVxuICAgICAgY29uc3QgY3VycmVudFZhbHVlOiBhbnkgPSBjb250cm9sLnZhbHVlO1xuICAgICAgY29uc3QgaXNFcXVhbCA9IChjb25zdFZhbHVlLCBpbnB1dFZhbHVlKSA9PlxuICAgICAgICBjb25zdFZhbHVlID09PSBpbnB1dFZhbHVlIHx8XG4gICAgICAgIGlzTnVtYmVyKGNvbnN0VmFsdWUpICYmICtpbnB1dFZhbHVlID09PSArY29uc3RWYWx1ZSB8fFxuICAgICAgICBpc0Jvb2xlYW4oY29uc3RWYWx1ZSwgJ3N0cmljdCcpICYmXG4gICAgICAgICAgdG9KYXZhU2NyaXB0VHlwZShpbnB1dFZhbHVlLCAnYm9vbGVhbicpID09PSBjb25zdFZhbHVlIHx8XG4gICAgICAgIGNvbnN0VmFsdWUgPT09IG51bGwgJiYgIWhhc1ZhbHVlKGlucHV0VmFsdWUpO1xuICAgICAgY29uc3QgaXNWYWxpZCA9IGlzRXF1YWwocmVxdWlyZWRWYWx1ZSwgY3VycmVudFZhbHVlKTtcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7ICdjb25zdCc6IHsgcmVxdWlyZWRWYWx1ZSwgY3VycmVudFZhbHVlIH0gfTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqICdtaW5MZW5ndGgnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wncyB0ZXh0IHZhbHVlIHRvIGJlIGdyZWF0ZXIgdGhhbiBhIHNwZWNpZmllZCBsZW5ndGguXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtaW5pbXVtTGVuZ3RoIC0gbWluaW11bSBhbGxvd2VkIHN0cmluZyBsZW5ndGhcbiAgICogQHBhcmFtIHtib29sZWFuID0gZmFsc2V9IGludmVydCAtIGluc3RlYWQgcmV0dXJuIGVycm9yIG9iamVjdCBvbmx5IGlmIHZhbGlkXG4gICAqIEByZXR1cm4ge0lWYWxpZGF0b3JGbn1cbiAgICovXG4gIHN0YXRpYyBtaW5MZW5ndGgobWluaW11bUxlbmd0aDogbnVtYmVyKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKG1pbmltdW1MZW5ndGgpKSB7IHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7IHJldHVybiBudWxsOyB9XG4gICAgICBjb25zdCBjdXJyZW50TGVuZ3RoID0gaXNTdHJpbmcoY29udHJvbC52YWx1ZSkgPyBjb250cm9sLnZhbHVlLmxlbmd0aCA6IDA7XG4gICAgICBjb25zdCBpc1ZhbGlkID0gY3VycmVudExlbmd0aCA+PSBtaW5pbXVtTGVuZ3RoO1xuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHsgJ21pbkxlbmd0aCc6IHsgbWluaW11bUxlbmd0aCwgY3VycmVudExlbmd0aCB9IH07XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiAnbWF4TGVuZ3RoJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBjb250cm9sJ3MgdGV4dCB2YWx1ZSB0byBiZSBsZXNzIHRoYW4gYSBzcGVjaWZpZWQgbGVuZ3RoLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gbWF4aW11bUxlbmd0aCAtIG1heGltdW0gYWxsb3dlZCBzdHJpbmcgbGVuZ3RoXG4gICAqIEBwYXJhbSB7Ym9vbGVhbiA9IGZhbHNlfSBpbnZlcnQgLSBpbnN0ZWFkIHJldHVybiBlcnJvciBvYmplY3Qgb25seSBpZiB2YWxpZFxuICAgKiBAcmV0dXJuIHtJVmFsaWRhdG9yRm59XG4gICAqL1xuICBzdGF0aWMgbWF4TGVuZ3RoKG1heGltdW1MZW5ndGg6IG51bWJlcik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShtYXhpbXVtTGVuZ3RoKSkgeyByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvcjsgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50TGVuZ3RoID0gaXNTdHJpbmcoY29udHJvbC52YWx1ZSkgPyBjb250cm9sLnZhbHVlLmxlbmd0aCA6IDA7XG4gICAgICBjb25zdCBpc1ZhbGlkID0gY3VycmVudExlbmd0aCA8PSBtYXhpbXVtTGVuZ3RoO1xuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHsgJ21heExlbmd0aCc6IHsgbWF4aW11bUxlbmd0aCwgY3VycmVudExlbmd0aCB9IH07XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiAncGF0dGVybicgdmFsaWRhdG9yXG4gICAqXG4gICAqIE5vdGU6IE5PVCB0aGUgc2FtZSBhcyBBbmd1bGFyJ3MgZGVmYXVsdCBwYXR0ZXJuIHZhbGlkYXRvci5cbiAgICpcbiAgICogUmVxdWlyZXMgYSBjb250cm9sJ3MgdmFsdWUgdG8gbWF0Y2ggYSBzcGVjaWZpZWQgcmVndWxhciBleHByZXNzaW9uIHBhdHRlcm4uXG4gICAqXG4gICAqIFRoaXMgdmFsaWRhdG9yIGNoYW5nZXMgdGhlIGJlaGF2aW9yIG9mIGRlZmF1bHQgcGF0dGVybiB2YWxpZGF0b3JcbiAgICogYnkgcmVwbGFjaW5nIFJlZ0V4cChgXiR7cGF0dGVybn0kYCkgd2l0aCBSZWdFeHAoYCR7cGF0dGVybn1gKSxcbiAgICogd2hpY2ggYWxsb3dzIGZvciBwYXJ0aWFsIG1hdGNoZXMuXG4gICAqXG4gICAqIFRvIHJldHVybiB0byB0aGUgZGVmYXVsdCBmdW5jaXRvbmFsaXR5LCBhbmQgbWF0Y2ggdGhlIGVudGlyZSBzdHJpbmcsXG4gICAqIHBhc3MgVFJVRSBhcyB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlci5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhdHRlcm4gLSByZWd1bGFyIGV4cHJlc3Npb24gcGF0dGVyblxuICAgKiBAcGFyYW0ge2Jvb2xlYW4gPSBmYWxzZX0gd2hvbGVTdHJpbmcgLSBtYXRjaCB3aG9sZSB2YWx1ZSBzdHJpbmc/XG4gICAqIEByZXR1cm4ge0lWYWxpZGF0b3JGbn1cbiAgICovXG4gIHN0YXRpYyBwYXR0ZXJuKHBhdHRlcm46IHN0cmluZ3xSZWdFeHAsIHdob2xlU3RyaW5nID0gZmFsc2UpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUocGF0dGVybikpIHsgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIGxldCByZWdleDogUmVnRXhwO1xuICAgICAgbGV0IHJlcXVpcmVkUGF0dGVybjogc3RyaW5nO1xuICAgICAgaWYgKHR5cGVvZiBwYXR0ZXJuID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXF1aXJlZFBhdHRlcm4gPSAod2hvbGVTdHJpbmcpID8gYF4ke3BhdHRlcm59JGAgOiBwYXR0ZXJuO1xuICAgICAgICByZWdleCA9IG5ldyBSZWdFeHAocmVxdWlyZWRQYXR0ZXJuKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcXVpcmVkUGF0dGVybiA9IHBhdHRlcm4udG9TdHJpbmcoKTtcbiAgICAgICAgcmVnZXggPSBwYXR0ZXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgY3VycmVudFZhbHVlOiBzdHJpbmcgPSBjb250cm9sLnZhbHVlO1xuICAgICAgY29uc3QgaXNWYWxpZCA9IGlzU3RyaW5nKGN1cnJlbnRWYWx1ZSkgPyByZWdleC50ZXN0KGN1cnJlbnRWYWx1ZSkgOiBmYWxzZTtcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7ICdwYXR0ZXJuJzogeyByZXF1aXJlZFBhdHRlcm4sIGN1cnJlbnRWYWx1ZSB9IH07XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiAnZm9ybWF0JyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBjb250cm9sIHRvIGhhdmUgYSB2YWx1ZSBvZiBhIGNlcnRhaW4gZm9ybWF0LlxuICAgKlxuICAgKiBUaGlzIHZhbGlkYXRvciBjdXJyZW50bHkgY2hlY2tzIHRoZSBmb2xsb3dpbmcgZm9ybXN0czpcbiAgICogICBkYXRlLCB0aW1lLCBkYXRlLXRpbWUsIGVtYWlsLCBob3N0bmFtZSwgaXB2NCwgaXB2NixcbiAgICogICB1cmksIHVyaS1yZWZlcmVuY2UsIHVyaS10ZW1wbGF0ZSwgdXJsLCB1dWlkLCBjb2xvcixcbiAgICogICBqc29uLXBvaW50ZXIsIHJlbGF0aXZlLWpzb24tcG9pbnRlciwgcmVnZXhcbiAgICpcbiAgICogRmFzdCBmb3JtYXQgcmVndWxhciBleHByZXNzaW9ucyBjb3BpZWQgZnJvbSBBSlY6XG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9lcG9iZXJlemtpbi9hanYvYmxvYi9tYXN0ZXIvbGliL2NvbXBpbGUvZm9ybWF0cy5qc1xuICAgKlxuICAgKiBAcGFyYW0ge0pzb25TY2hlbWFGb3JtYXROYW1lc30gcmVxdWlyZWRGb3JtYXQgLSBmb3JtYXQgdG8gY2hlY2tcbiAgICogQHJldHVybiB7SVZhbGlkYXRvckZufVxuICAgKi9cbiAgc3RhdGljIGZvcm1hdChyZXF1aXJlZEZvcm1hdDogSnNvblNjaGVtYUZvcm1hdE5hbWVzKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKHJlcXVpcmVkRm9ybWF0KSkgeyByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvcjsgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkgeyByZXR1cm4gbnVsbDsgfVxuICAgICAgbGV0IGlzVmFsaWQ6IGJvb2xlYW47XG4gICAgICBjb25zdCBjdXJyZW50VmFsdWU6IHN0cmluZ3xEYXRlID0gY29udHJvbC52YWx1ZTtcbiAgICAgIGlmIChpc1N0cmluZyhjdXJyZW50VmFsdWUpKSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdFRlc3Q6IEZ1bmN0aW9ufFJlZ0V4cCA9IGpzb25TY2hlbWFGb3JtYXRUZXN0c1tyZXF1aXJlZEZvcm1hdF07XG4gICAgICAgIGlmICh0eXBlb2YgZm9ybWF0VGVzdCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBpc1ZhbGlkID0gKDxSZWdFeHA+Zm9ybWF0VGVzdCkudGVzdCg8c3RyaW5nPmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGZvcm1hdFRlc3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBpc1ZhbGlkID0gKDxGdW5jdGlvbj5mb3JtYXRUZXN0KSg8c3RyaW5nPmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihgZm9ybWF0IHZhbGlkYXRvciBlcnJvcjogXCIke3JlcXVpcmVkRm9ybWF0fVwiIGlzIG5vdCBhIHJlY29nbml6ZWQgZm9ybWF0LmApO1xuICAgICAgICAgIGlzVmFsaWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBbGxvdyBKYXZhU2NyaXB0IERhdGUgb2JqZWN0c1xuICAgICAgICBpc1ZhbGlkID0gWydkYXRlJywgJ3RpbWUnLCAnZGF0ZS10aW1lJ10uaW5jbHVkZXMocmVxdWlyZWRGb3JtYXQpICYmXG4gICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGN1cnJlbnRWYWx1ZSkgPT09ICdbb2JqZWN0IERhdGVdJztcbiAgICAgIH1cbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7ICdmb3JtYXQnOiB7IHJlcXVpcmVkRm9ybWF0LCBjdXJyZW50VmFsdWUgfSB9O1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogJ21pbmltdW0nIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wncyBudW1lcmljIHZhbHVlIHRvIGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0b1xuICAgKiBhIG1pbmltdW0gYW1vdW50LlxuICAgKlxuICAgKiBBbnkgbm9uLW51bWVyaWMgdmFsdWUgaXMgYWxzbyB2YWxpZCAoYWNjb3JkaW5nIHRvIHRoZSBIVE1MIGZvcm1zIHNwZWMsXG4gICAqIGEgbm9uLW51bWVyaWMgdmFsdWUgZG9lc24ndCBoYXZlIGEgbWluaW11bSkuXG4gICAqIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9odG1sNS9mb3Jtcy5odG1sI2F0dHItaW5wdXQtbWF4XG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtaW5pbXVtIC0gbWluaW11bSBhbGxvd2VkIHZhbHVlXG4gICAqIEByZXR1cm4ge0lWYWxpZGF0b3JGbn1cbiAgICovXG4gIHN0YXRpYyBtaW5pbXVtKG1pbmltdW1WYWx1ZTogbnVtYmVyKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKG1pbmltdW1WYWx1ZSkpIHsgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGNvbnRyb2wudmFsdWU7XG4gICAgICBjb25zdCBpc1ZhbGlkID0gIWlzTnVtYmVyKGN1cnJlbnRWYWx1ZSkgfHwgY3VycmVudFZhbHVlID49IG1pbmltdW1WYWx1ZTtcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7ICdtaW5pbXVtJzogeyBtaW5pbXVtVmFsdWUsIGN1cnJlbnRWYWx1ZSB9IH07XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiAnZXhjbHVzaXZlTWluaW11bScgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgY29udHJvbCdzIG51bWVyaWMgdmFsdWUgdG8gYmUgbGVzcyB0aGFuIGEgbWF4aW11bSBhbW91bnQuXG4gICAqXG4gICAqIEFueSBub24tbnVtZXJpYyB2YWx1ZSBpcyBhbHNvIHZhbGlkIChhY2NvcmRpbmcgdG8gdGhlIEhUTUwgZm9ybXMgc3BlYyxcbiAgICogYSBub24tbnVtZXJpYyB2YWx1ZSBkb2Vzbid0IGhhdmUgYSBtYXhpbXVtKS5cbiAgICogaHR0cHM6Ly93d3cudzMub3JnL1RSL2h0bWw1L2Zvcm1zLmh0bWwjYXR0ci1pbnB1dC1tYXhcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGV4Y2x1c2l2ZU1pbmltdW1WYWx1ZSAtIG1heGltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKiBAcmV0dXJuIHtJVmFsaWRhdG9yRm59XG4gICAqL1xuICBzdGF0aWMgZXhjbHVzaXZlTWluaW11bShleGNsdXNpdmVNaW5pbXVtVmFsdWU6IG51bWJlcik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShleGNsdXNpdmVNaW5pbXVtVmFsdWUpKSB7IHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7IHJldHVybiBudWxsOyB9XG4gICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBjb250cm9sLnZhbHVlO1xuICAgICAgY29uc3QgaXNWYWxpZCA9ICFpc051bWJlcihjdXJyZW50VmFsdWUpIHx8ICtjdXJyZW50VmFsdWUgPCBleGNsdXNpdmVNaW5pbXVtVmFsdWU7XG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDogeyAnZXhjbHVzaXZlTWluaW11bSc6IHsgZXhjbHVzaXZlTWluaW11bVZhbHVlLCBjdXJyZW50VmFsdWUgfSB9O1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogJ21heGltdW0nIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wncyBudW1lcmljIHZhbHVlIHRvIGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0b1xuICAgKiBhIG1heGltdW0gYW1vdW50LlxuICAgKlxuICAgKiBBbnkgbm9uLW51bWVyaWMgdmFsdWUgaXMgYWxzbyB2YWxpZCAoYWNjb3JkaW5nIHRvIHRoZSBIVE1MIGZvcm1zIHNwZWMsXG4gICAqIGEgbm9uLW51bWVyaWMgdmFsdWUgZG9lc24ndCBoYXZlIGEgbWF4aW11bSkuXG4gICAqIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9odG1sNS9mb3Jtcy5odG1sI2F0dHItaW5wdXQtbWF4XG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhpbXVtVmFsdWUgLSBtYXhpbXVtIGFsbG93ZWQgdmFsdWVcbiAgICogQHJldHVybiB7SVZhbGlkYXRvckZufVxuICAgKi9cbiAgc3RhdGljIG1heGltdW0obWF4aW11bVZhbHVlOiBudW1iZXIpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUobWF4aW11bVZhbHVlKSkgeyByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvcjsgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkgeyByZXR1cm4gbnVsbDsgfVxuICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gY29udHJvbC52YWx1ZTtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSAhaXNOdW1iZXIoY3VycmVudFZhbHVlKSB8fCArY3VycmVudFZhbHVlIDw9IG1heGltdW1WYWx1ZTtcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7ICdtYXhpbXVtJzogeyBtYXhpbXVtVmFsdWUsIGN1cnJlbnRWYWx1ZSB9IH07XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiAnZXhjbHVzaXZlTWF4aW11bScgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgY29udHJvbCdzIG51bWVyaWMgdmFsdWUgdG8gYmUgbGVzcyB0aGFuIGEgbWF4aW11bSBhbW91bnQuXG4gICAqXG4gICAqIEFueSBub24tbnVtZXJpYyB2YWx1ZSBpcyBhbHNvIHZhbGlkIChhY2NvcmRpbmcgdG8gdGhlIEhUTUwgZm9ybXMgc3BlYyxcbiAgICogYSBub24tbnVtZXJpYyB2YWx1ZSBkb2Vzbid0IGhhdmUgYSBtYXhpbXVtKS5cbiAgICogaHR0cHM6Ly93d3cudzMub3JnL1RSL2h0bWw1L2Zvcm1zLmh0bWwjYXR0ci1pbnB1dC1tYXhcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGV4Y2x1c2l2ZU1heGltdW1WYWx1ZSAtIG1heGltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKiBAcmV0dXJuIHtJVmFsaWRhdG9yRm59XG4gICAqL1xuICBzdGF0aWMgZXhjbHVzaXZlTWF4aW11bShleGNsdXNpdmVNYXhpbXVtVmFsdWU6IG51bWJlcik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShleGNsdXNpdmVNYXhpbXVtVmFsdWUpKSB7IHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7IHJldHVybiBudWxsOyB9XG4gICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBjb250cm9sLnZhbHVlO1xuICAgICAgY29uc3QgaXNWYWxpZCA9ICFpc051bWJlcihjdXJyZW50VmFsdWUpIHx8ICtjdXJyZW50VmFsdWUgPCBleGNsdXNpdmVNYXhpbXVtVmFsdWU7XG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDogeyAnZXhjbHVzaXZlTWF4aW11bSc6IHsgZXhjbHVzaXZlTWF4aW11bVZhbHVlLCBjdXJyZW50VmFsdWUgfSB9O1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogJ211bHRpcGxlT2YnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wgdG8gaGF2ZSBhIG51bWVyaWMgdmFsdWUgdGhhdCBpcyBhIG11bHRpcGxlXG4gICAqIG9mIGEgc3BlY2lmaWVkIG51bWJlci5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IG11bHRpcGxlT2ZWYWx1ZSAtIG51bWJlciB2YWx1ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2ZcbiAgICogQHJldHVybiB7SVZhbGlkYXRvckZufVxuICAgKi9cbiAgc3RhdGljIG11bHRpcGxlT2YobXVsdGlwbGVPZlZhbHVlOiBudW1iZXIpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUobXVsdGlwbGVPZlZhbHVlKSkgeyByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvcjsgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkgeyByZXR1cm4gbnVsbDsgfVxuICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gY29udHJvbC52YWx1ZTtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBpc051bWJlcihjdXJyZW50VmFsdWUpICYmXG4gICAgICAgIGN1cnJlbnRWYWx1ZSAlIG11bHRpcGxlT2ZWYWx1ZSA9PT0gMDtcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7ICdtdWx0aXBsZU9mJzogeyBtdWx0aXBsZU9mVmFsdWUsIGN1cnJlbnRWYWx1ZSB9IH07XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiAnbWluUHJvcGVydGllcycgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgZm9ybSBncm91cCB0byBoYXZlIGEgbWluaW11bSBudW1iZXIgb2YgcHJvcGVydGllcyAoaS5lLiBoYXZlXG4gICAqIHZhbHVlcyBlbnRlcmVkIGluIGEgbWluaW11bSBudW1iZXIgb2YgY29udHJvbHMgd2l0aGluIHRoZSBncm91cCkuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtaW5pbXVtUHJvcGVydGllcyAtIG1pbmltdW0gbnVtYmVyIG9mIHByb3BlcnRpZXMgYWxsb3dlZFxuICAgKiBAcmV0dXJuIHtJVmFsaWRhdG9yRm59XG4gICAqL1xuICBzdGF0aWMgbWluUHJvcGVydGllcyhtaW5pbXVtUHJvcGVydGllczogbnVtYmVyKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKG1pbmltdW1Qcm9wZXJ0aWVzKSkgeyByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvcjsgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkgeyByZXR1cm4gbnVsbDsgfVxuICAgICAgY29uc3QgY3VycmVudFByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhjb250cm9sLnZhbHVlKS5sZW5ndGggfHwgMDtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBjdXJyZW50UHJvcGVydGllcyA+PSBtaW5pbXVtUHJvcGVydGllcztcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7ICdtaW5Qcm9wZXJ0aWVzJzogeyBtaW5pbXVtUHJvcGVydGllcywgY3VycmVudFByb3BlcnRpZXMgfSB9O1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogJ21heFByb3BlcnRpZXMnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGZvcm0gZ3JvdXAgdG8gaGF2ZSBhIG1heGltdW0gbnVtYmVyIG9mIHByb3BlcnRpZXMgKGkuZS4gaGF2ZVxuICAgKiB2YWx1ZXMgZW50ZXJlZCBpbiBhIG1heGltdW0gbnVtYmVyIG9mIGNvbnRyb2xzIHdpdGhpbiB0aGUgZ3JvdXApLlxuICAgKlxuICAgKiBOb3RlOiBIYXMgbm8gZWZmZWN0IGlmIHRoZSBmb3JtIGdyb3VwIGRvZXMgbm90IGNvbnRhaW4gbW9yZSB0aGFuIHRoZVxuICAgKiBtYXhpbXVtIG51bWJlciBvZiBjb250cm9scy5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1heGltdW1Qcm9wZXJ0aWVzIC0gbWF4aW11bSBudW1iZXIgb2YgcHJvcGVydGllcyBhbGxvd2VkXG4gICAqIEByZXR1cm4ge0lWYWxpZGF0b3JGbn1cbiAgICovXG4gIHN0YXRpYyBtYXhQcm9wZXJ0aWVzKG1heGltdW1Qcm9wZXJ0aWVzOiBudW1iZXIpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUobWF4aW11bVByb3BlcnRpZXMpKSB7IHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRQcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMoY29udHJvbC52YWx1ZSkubGVuZ3RoIHx8IDA7XG4gICAgICBjb25zdCBpc1ZhbGlkID0gY3VycmVudFByb3BlcnRpZXMgPD0gbWF4aW11bVByb3BlcnRpZXM7XG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDogeyAnbWF4UHJvcGVydGllcyc6IHsgbWF4aW11bVByb3BlcnRpZXMsIGN1cnJlbnRQcm9wZXJ0aWVzIH0gfTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqICdkZXBlbmRlbmNpZXMnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyB0aGUgY29udHJvbHMgaW4gYSBmb3JtIGdyb3VwIHRvIG1lZXQgYWRkaXRpb25hbCB2YWxpZGF0aW9uXG4gICAqIGNyaXRlcmlhLCBkZXBlbmRpbmcgb24gdGhlIHZhbHVlcyBvZiBvdGhlciBjb250cm9scyBpbiB0aGUgZ3JvdXAuXG4gICAqXG4gICAqIEV4YW1wbGVzOlxuICAgKiBodHRwczovL3NwYWNldGVsZXNjb3BlLmdpdGh1Yi5pby91bmRlcnN0YW5kaW5nLWpzb24tc2NoZW1hL3JlZmVyZW5jZS9vYmplY3QuaHRtbCNkZXBlbmRlbmNpZXNcbiAgICpcbiAgICogQHBhcmFtIHthbnl9IGRlcGVuZGVuY2llcyAtIHJlcXVpcmVkIGRlcGVuZGVuY2llc1xuICAgKiBAcmV0dXJuIHtJVmFsaWRhdG9yRm59XG4gICAqL1xuICBzdGF0aWMgZGVwZW5kZW5jaWVzKGRlcGVuZGVuY2llczogYW55KTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoZ2V0VHlwZShkZXBlbmRlbmNpZXMpICE9PSAnb2JqZWN0JyB8fCBpc0VtcHR5KGRlcGVuZGVuY2llcykpIHtcbiAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yO1xuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIGNvbnN0IGFsbEVycm9ycyA9IF9tZXJnZU9iamVjdHMoXG4gICAgICAgIGZvckVhY2hDb3B5KGRlcGVuZGVuY2llcywgKHZhbHVlLCByZXF1aXJpbmdGaWVsZCkgPT4ge1xuICAgICAgICAgIGlmICghaGFzVmFsdWUoY29udHJvbC52YWx1ZVtyZXF1aXJpbmdGaWVsZF0pKSB7IHJldHVybiBudWxsOyB9XG4gICAgICAgICAgbGV0IHJlcXVpcmluZ0ZpZWxkRXJyb3JzOiBWYWxpZGF0aW9uRXJyb3JzID0geyB9O1xuICAgICAgICAgIGxldCByZXF1aXJlZEZpZWxkczogc3RyaW5nW107XG4gICAgICAgICAgbGV0IHByb3BlcnRpZXM6IFZhbGlkYXRpb25FcnJvcnMgPSB7IH07XG4gICAgICAgICAgaWYgKGdldFR5cGUoZGVwZW5kZW5jaWVzW3JlcXVpcmluZ0ZpZWxkXSkgPT09ICdhcnJheScpIHtcbiAgICAgICAgICAgIHJlcXVpcmVkRmllbGRzID0gZGVwZW5kZW5jaWVzW3JlcXVpcmluZ0ZpZWxkXTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGdldFR5cGUoZGVwZW5kZW5jaWVzW3JlcXVpcmluZ0ZpZWxkXSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXF1aXJlZEZpZWxkcyA9IGRlcGVuZGVuY2llc1tyZXF1aXJpbmdGaWVsZF1bJ3JlcXVpcmVkJ10gfHwgW107XG4gICAgICAgICAgICBwcm9wZXJ0aWVzID0gZGVwZW5kZW5jaWVzW3JlcXVpcmluZ0ZpZWxkXVsncHJvcGVydGllcyddIHx8IHsgfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBWYWxpZGF0ZSBwcm9wZXJ0eSBkZXBlbmRlbmNpZXNcbiAgICAgICAgICBmb3IgKGNvbnN0IHJlcXVpcmVkRmllbGQgb2YgcmVxdWlyZWRGaWVsZHMpIHtcbiAgICAgICAgICAgIGlmICh4b3IoIWhhc1ZhbHVlKGNvbnRyb2wudmFsdWVbcmVxdWlyZWRGaWVsZF0pLCBpbnZlcnQpKSB7XG4gICAgICAgICAgICAgIHJlcXVpcmluZ0ZpZWxkRXJyb3JzW3JlcXVpcmVkRmllbGRdID0geyAncmVxdWlyZWQnOiB0cnVlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gVmFsaWRhdGUgc2NoZW1hIGRlcGVuZGVuY2llc1xuICAgICAgICAgIHJlcXVpcmluZ0ZpZWxkRXJyb3JzID0gX21lcmdlT2JqZWN0cyhyZXF1aXJpbmdGaWVsZEVycm9ycyxcbiAgICAgICAgICAgIGZvckVhY2hDb3B5KHByb3BlcnRpZXMsIChyZXF1aXJlbWVudHMsIHJlcXVpcmVkRmllbGQpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgcmVxdWlyZWRGaWVsZEVycm9ycyA9IF9tZXJnZU9iamVjdHMoXG4gICAgICAgICAgICAgICAgZm9yRWFjaENvcHkocmVxdWlyZW1lbnRzLCAocmVxdWlyZW1lbnQsIHBhcmFtZXRlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgbGV0IHZhbGlkYXRvcjogSVZhbGlkYXRvckZuID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlbWVudCA9PT0gJ21heGltdW0nIHx8IHJlcXVpcmVtZW50ID09PSAnbWluaW11bScpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhjbHVzaXZlID0gISFyZXF1aXJlbWVudHNbJ2V4Y2x1c2l2ZU0nICsgcmVxdWlyZW1lbnQuc2xpY2UoMSldO1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3IgPSBKc29uVmFsaWRhdG9yc1tyZXF1aXJlbWVudF0ocGFyYW1ldGVyLCBleGNsdXNpdmUpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgSnNvblZhbGlkYXRvcnNbcmVxdWlyZW1lbnRdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvciA9IEpzb25WYWxpZGF0b3JzW3JlcXVpcmVtZW50XShwYXJhbWV0ZXIpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgcmV0dXJuICFpc0RlZmluZWQodmFsaWRhdG9yKSA/XG4gICAgICAgICAgICAgICAgICAgIG51bGwgOiB2YWxpZGF0b3IoY29udHJvbC52YWx1ZVtyZXF1aXJlZEZpZWxkXSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGlzRW1wdHkocmVxdWlyZWRGaWVsZEVycm9ycykgP1xuICAgICAgICAgICAgICAgIG51bGwgOiB7IFtyZXF1aXJlZEZpZWxkXTogcmVxdWlyZWRGaWVsZEVycm9ycyB9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiBpc0VtcHR5KHJlcXVpcmluZ0ZpZWxkRXJyb3JzKSA/XG4gICAgICAgICAgICBudWxsIDogeyBbcmVxdWlyaW5nRmllbGRdOiByZXF1aXJpbmdGaWVsZEVycm9ycyB9O1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICAgIHJldHVybiBpc0VtcHR5KGFsbEVycm9ycykgPyBudWxsIDogYWxsRXJyb3JzO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogJ21pbkl0ZW1zJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBmb3JtIGFycmF5IHRvIGhhdmUgYSBtaW5pbXVtIG51bWJlciBvZiB2YWx1ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtaW5pbXVtSXRlbXMgLSBtaW5pbXVtIG51bWJlciBvZiBpdGVtcyBhbGxvd2VkXG4gICAqIEByZXR1cm4ge0lWYWxpZGF0b3JGbn1cbiAgICovXG4gIHN0YXRpYyBtaW5JdGVtcyhtaW5pbXVtSXRlbXM6IG51bWJlcik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShtaW5pbXVtSXRlbXMpKSB7IHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7IHJldHVybiBudWxsOyB9XG4gICAgICBjb25zdCBjdXJyZW50SXRlbXMgPSBpc0FycmF5KGNvbnRyb2wudmFsdWUpID8gY29udHJvbC52YWx1ZS5sZW5ndGggOiAwO1xuICAgICAgY29uc3QgaXNWYWxpZCA9IGN1cnJlbnRJdGVtcyA+PSBtaW5pbXVtSXRlbXM7XG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDogeyAnbWluSXRlbXMnOiB7IG1pbmltdW1JdGVtcywgY3VycmVudEl0ZW1zIH0gfTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqICdtYXhJdGVtcycgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgZm9ybSBhcnJheSB0byBoYXZlIGEgbWF4aW11bSBudW1iZXIgb2YgdmFsdWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gbWF4aW11bUl0ZW1zIC0gbWF4aW11bSBudW1iZXIgb2YgaXRlbXMgYWxsb3dlZFxuICAgKiBAcmV0dXJuIHtJVmFsaWRhdG9yRm59XG4gICAqL1xuICBzdGF0aWMgbWF4SXRlbXMobWF4aW11bUl0ZW1zOiBudW1iZXIpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUobWF4aW11bUl0ZW1zKSkgeyByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvcjsgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50SXRlbXMgPSBpc0FycmF5KGNvbnRyb2wudmFsdWUpID8gY29udHJvbC52YWx1ZS5sZW5ndGggOiAwO1xuICAgICAgY29uc3QgaXNWYWxpZCA9IGN1cnJlbnRJdGVtcyA8PSBtYXhpbXVtSXRlbXM7XG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDogeyAnbWF4SXRlbXMnOiB7IG1heGltdW1JdGVtcywgY3VycmVudEl0ZW1zIH0gfTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqICd1bmlxdWVJdGVtcycgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIHZhbHVlcyBpbiBhIGZvcm0gYXJyYXkgdG8gYmUgdW5pcXVlLlxuICAgKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW4gPSB0cnVlfSB1bmlxdWU/IC0gdHJ1ZSB0byB2YWxpZGF0ZSwgZmFsc2UgdG8gZGlzYWJsZVxuICAgKiBAcmV0dXJuIHtJVmFsaWRhdG9yRm59XG4gICAqL1xuICBzdGF0aWMgdW5pcXVlSXRlbXModW5pcXVlID0gdHJ1ZSk6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCF1bmlxdWUpIHsgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIGNvbnN0IHNvcnRlZDogYW55W10gPSBjb250cm9sLnZhbHVlLnNsaWNlKCkuc29ydCgpO1xuICAgICAgY29uc3QgZHVwbGljYXRlSXRlbXMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc29ydGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzb3J0ZWRbaSAtIDFdID09PSBzb3J0ZWRbaV0gJiYgZHVwbGljYXRlSXRlbXMuaW5jbHVkZXMoc29ydGVkW2ldKSkge1xuICAgICAgICAgIGR1cGxpY2F0ZUl0ZW1zLnB1c2goc29ydGVkW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgaXNWYWxpZCA9ICFkdXBsaWNhdGVJdGVtcy5sZW5ndGg7XG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDogeyAndW5pcXVlSXRlbXMnOiB7IGR1cGxpY2F0ZUl0ZW1zIH0gfTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqICdjb250YWlucycgdmFsaWRhdG9yXG4gICAqXG4gICAqIFRPRE86IENvbXBsZXRlIHRoaXMgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIHZhbHVlcyBpbiBhIGZvcm0gYXJyYXkgdG8gYmUgdW5pcXVlLlxuICAgKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW4gPSB0cnVlfSB1bmlxdWU/IC0gdHJ1ZSB0byB2YWxpZGF0ZSwgZmFsc2UgdG8gZGlzYWJsZVxuICAgKiBAcmV0dXJuIHtJVmFsaWRhdG9yRm59XG4gICAqL1xuICBzdGF0aWMgY29udGFpbnMocmVxdWlyZWRJdGVtID0gdHJ1ZSk6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFyZXF1aXJlZEl0ZW0pIHsgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkgfHwgIWlzQXJyYXkoY29udHJvbC52YWx1ZSkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIGNvbnN0IGN1cnJlbnRJdGVtcyA9IGNvbnRyb2wudmFsdWU7XG4gICAgICAvLyBjb25zdCBpc1ZhbGlkID0gY3VycmVudEl0ZW1zLnNvbWUoaXRlbSA9PlxuICAgICAgLy9cbiAgICAgIC8vICk7XG4gICAgICBjb25zdCBpc1ZhbGlkID0gdHJ1ZTtcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7ICdjb250YWlucyc6IHsgcmVxdWlyZWRJdGVtLCBjdXJyZW50SXRlbXMgfSB9O1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogTm8tb3AgdmFsaWRhdG9yLiBJbmNsdWRlZCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eS5cbiAgICovXG4gIHN0YXRpYyBudWxsVmFsaWRhdG9yKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdG9yIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9uczpcbiAgICogY29tcG9zZUFueU9mLCBjb21wb3NlT25lT2YsIGNvbXBvc2VBbGxPZiwgY29tcG9zZU5vdCxcbiAgICogY29tcG9zZSwgY29tcG9zZUFzeW5jXG4gICAqXG4gICAqIFRPRE86IEFkZCBjb21wb3NlQW55T2ZBc3luYywgY29tcG9zZU9uZU9mQXN5bmMsXG4gICAqICAgICAgICAgICBjb21wb3NlQWxsT2ZBc3luYywgY29tcG9zZU5vdEFzeW5jXG4gICAqL1xuXG4gIC8qKlxuICAgKiAnY29tcG9zZUFueU9mJyB2YWxpZGF0b3IgY29tYmluYXRpb24gZnVuY3Rpb25cbiAgICpcbiAgICogQWNjZXB0cyBhbiBhcnJheSBvZiB2YWxpZGF0b3JzIGFuZCByZXR1cm5zIGEgc2luZ2xlIHZhbGlkYXRvciB0aGF0XG4gICAqIGV2YWx1YXRlcyB0byB2YWxpZCBpZiBhbnkgb25lIG9yIG1vcmUgb2YgdGhlIHN1Ym1pdHRlZCB2YWxpZGF0b3JzIGFyZVxuICAgKiB2YWxpZC4gSWYgZXZlcnkgdmFsaWRhdG9yIGlzIGludmFsaWQsIGl0IHJldHVybnMgY29tYmluZWQgZXJyb3JzIGZyb21cbiAgICogYWxsIHZhbGlkYXRvcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7SVZhbGlkYXRvckZuW119IHZhbGlkYXRvcnMgLSBhcnJheSBvZiB2YWxpZGF0b3JzIHRvIGNvbWJpbmVcbiAgICogQHJldHVybiB7SVZhbGlkYXRvckZufSAtIHNpbmdsZSBjb21iaW5lZCB2YWxpZGF0b3IgZnVuY3Rpb25cbiAgICovXG4gIHN0YXRpYyBjb21wb3NlQW55T2YodmFsaWRhdG9yczogSVZhbGlkYXRvckZuW10pOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghdmFsaWRhdG9ycykgeyByZXR1cm4gbnVsbDsgfVxuICAgIGNvbnN0IHByZXNlbnRWYWxpZGF0b3JzID0gdmFsaWRhdG9ycy5maWx0ZXIoaXNEZWZpbmVkKTtcbiAgICBpZiAocHJlc2VudFZhbGlkYXRvcnMubGVuZ3RoID09PSAwKSB7IHJldHVybiBudWxsOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIGNvbnN0IGFycmF5T2ZFcnJvcnMgPVxuICAgICAgICBfZXhlY3V0ZVZhbGlkYXRvcnMoY29udHJvbCwgcHJlc2VudFZhbGlkYXRvcnMsIGludmVydCkuZmlsdGVyKGlzRGVmaW5lZCk7XG4gICAgICBjb25zdCBpc1ZhbGlkID0gdmFsaWRhdG9ycy5sZW5ndGggPiBhcnJheU9mRXJyb3JzLmxlbmd0aDtcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiBfbWVyZ2VPYmplY3RzKC4uLmFycmF5T2ZFcnJvcnMsIHsgJ2FueU9mJzogIWludmVydCB9KTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqICdjb21wb3NlT25lT2YnIHZhbGlkYXRvciBjb21iaW5hdGlvbiBmdW5jdGlvblxuICAgKlxuICAgKiBBY2NlcHRzIGFuIGFycmF5IG9mIHZhbGlkYXRvcnMgYW5kIHJldHVybnMgYSBzaW5nbGUgdmFsaWRhdG9yIHRoYXRcbiAgICogZXZhbHVhdGVzIHRvIHZhbGlkIG9ubHkgaWYgZXhhY3RseSBvbmUgb2YgdGhlIHN1Ym1pdHRlZCB2YWxpZGF0b3JzXG4gICAqIGlzIHZhbGlkLiBPdGhlcndpc2UgcmV0dXJucyBjb21iaW5lZCBpbmZvcm1hdGlvbiBmcm9tIGFsbCB2YWxpZGF0b3JzLFxuICAgKiBib3RoIHZhbGlkIGFuZCBpbnZhbGlkLlxuICAgKlxuICAgKiBAcGFyYW0ge0lWYWxpZGF0b3JGbltdfSB2YWxpZGF0b3JzIC0gYXJyYXkgb2YgdmFsaWRhdG9ycyB0byBjb21iaW5lXG4gICAqIEByZXR1cm4ge0lWYWxpZGF0b3JGbn0gLSBzaW5nbGUgY29tYmluZWQgdmFsaWRhdG9yIGZ1bmN0aW9uXG4gICAqL1xuICBzdGF0aWMgY29tcG9zZU9uZU9mKHZhbGlkYXRvcnM6IElWYWxpZGF0b3JGbltdKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIXZhbGlkYXRvcnMpIHsgcmV0dXJuIG51bGw7IH1cbiAgICBjb25zdCBwcmVzZW50VmFsaWRhdG9ycyA9IHZhbGlkYXRvcnMuZmlsdGVyKGlzRGVmaW5lZCk7XG4gICAgaWYgKHByZXNlbnRWYWxpZGF0b3JzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gbnVsbDsgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCA9PiB7XG4gICAgICBjb25zdCBhcnJheU9mRXJyb3JzID1cbiAgICAgICAgX2V4ZWN1dGVWYWxpZGF0b3JzKGNvbnRyb2wsIHByZXNlbnRWYWxpZGF0b3JzKTtcbiAgICAgIGNvbnN0IHZhbGlkQ29udHJvbHMgPVxuICAgICAgICB2YWxpZGF0b3JzLmxlbmd0aCAtIGFycmF5T2ZFcnJvcnMuZmlsdGVyKGlzRGVmaW5lZCkubGVuZ3RoO1xuICAgICAgY29uc3QgaXNWYWxpZCA9IHZhbGlkQ29udHJvbHMgPT09IDE7XG4gICAgICBpZiAoeG9yKGlzVmFsaWQsIGludmVydCkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIGNvbnN0IGFycmF5T2ZWYWxpZHMgPVxuICAgICAgICBfZXhlY3V0ZVZhbGlkYXRvcnMoY29udHJvbCwgcHJlc2VudFZhbGlkYXRvcnMsIGludmVydCk7XG4gICAgICByZXR1cm4gX21lcmdlT2JqZWN0cyguLi5hcnJheU9mRXJyb3JzLCAuLi5hcnJheU9mVmFsaWRzLCB7ICdvbmVPZic6ICFpbnZlcnQgfSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiAnY29tcG9zZUFsbE9mJyB2YWxpZGF0b3IgY29tYmluYXRpb24gZnVuY3Rpb25cbiAgICpcbiAgICogQWNjZXB0cyBhbiBhcnJheSBvZiB2YWxpZGF0b3JzIGFuZCByZXR1cm5zIGEgc2luZ2xlIHZhbGlkYXRvciB0aGF0XG4gICAqIGV2YWx1YXRlcyB0byB2YWxpZCBvbmx5IGlmIGFsbCB0aGUgc3VibWl0dGVkIHZhbGlkYXRvcnMgYXJlIGluZGl2aWR1YWxseVxuICAgKiB2YWxpZC4gT3RoZXJ3aXNlIGl0IHJldHVybnMgY29tYmluZWQgZXJyb3JzIGZyb20gYWxsIGludmFsaWQgdmFsaWRhdG9ycy5cbiAgICpcbiAgICogQHBhcmFtIHtJVmFsaWRhdG9yRm5bXX0gdmFsaWRhdG9ycyAtIGFycmF5IG9mIHZhbGlkYXRvcnMgdG8gY29tYmluZVxuICAgKiBAcmV0dXJuIHtJVmFsaWRhdG9yRm59IC0gc2luZ2xlIGNvbWJpbmVkIHZhbGlkYXRvciBmdW5jdGlvblxuICAgKi9cbiAgc3RhdGljIGNvbXBvc2VBbGxPZih2YWxpZGF0b3JzOiBJVmFsaWRhdG9yRm5bXSk6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCF2YWxpZGF0b3JzKSB7IHJldHVybiBudWxsOyB9XG4gICAgY29uc3QgcHJlc2VudFZhbGlkYXRvcnMgPSB2YWxpZGF0b3JzLmZpbHRlcihpc0RlZmluZWQpO1xuICAgIGlmIChwcmVzZW50VmFsaWRhdG9ycy5sZW5ndGggPT09IDApIHsgcmV0dXJuIG51bGw7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgY29uc3QgY29tYmluZWRFcnJvcnMgPSBfbWVyZ2VFcnJvcnMoXG4gICAgICAgIF9leGVjdXRlVmFsaWRhdG9ycyhjb250cm9sLCBwcmVzZW50VmFsaWRhdG9ycywgaW52ZXJ0KVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBjb21iaW5lZEVycm9ycyA9PT0gbnVsbDtcbiAgICAgIHJldHVybiAoeG9yKGlzVmFsaWQsIGludmVydCkpID9cbiAgICAgICAgbnVsbCA6IF9tZXJnZU9iamVjdHMoY29tYmluZWRFcnJvcnMsIHsgJ2FsbE9mJzogIWludmVydCB9KTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqICdjb21wb3NlTm90JyB2YWxpZGF0b3IgaW52ZXJzaW9uIGZ1bmN0aW9uXG4gICAqXG4gICAqIEFjY2VwdHMgYSBzaW5nbGUgdmFsaWRhdG9yIGZ1bmN0aW9uIGFuZCBpbnZlcnRzIGl0cyByZXN1bHQuXG4gICAqIFJldHVybnMgdmFsaWQgaWYgdGhlIHN1Ym1pdHRlZCB2YWxpZGF0b3IgaXMgaW52YWxpZCwgYW5kXG4gICAqIHJldHVybnMgaW52YWxpZCBpZiB0aGUgc3VibWl0dGVkIHZhbGlkYXRvciBpcyB2YWxpZC5cbiAgICogKE5vdGU6IHRoaXMgZnVuY3Rpb24gY2FuIGl0c2VsZiBiZSBpbnZlcnRlZFxuICAgKiAgIC0gZS5nLiBjb21wb3NlTm90KGNvbXBvc2VOb3QodmFsaWRhdG9yKSkgLVxuICAgKiAgIGJ1dCB0aGlzIGNhbiBiZSBjb25mdXNpbmcgYW5kIGlzIHRoZXJlZm9yZSBub3QgcmVjb21tZW5kZWQuKVxuICAgKlxuICAgKiBAcGFyYW0ge0lWYWxpZGF0b3JGbltdfSB2YWxpZGF0b3JzIC0gdmFsaWRhdG9yKHMpIHRvIGludmVydFxuICAgKiBAcmV0dXJuIHtJVmFsaWRhdG9yRm59IC0gbmV3IHZhbGlkYXRvciBmdW5jdGlvbiB0aGF0IHJldHVybnMgb3Bwb3NpdGUgcmVzdWx0XG4gICAqL1xuICBzdGF0aWMgY29tcG9zZU5vdCh2YWxpZGF0b3I6IElWYWxpZGF0b3JGbik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCF2YWxpZGF0b3IpIHsgcmV0dXJuIG51bGw7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIGNvbnN0IGVycm9yID0gdmFsaWRhdG9yKGNvbnRyb2wsICFpbnZlcnQpO1xuICAgICAgY29uc3QgaXNWYWxpZCA9IGVycm9yID09PSBudWxsO1xuICAgICAgcmV0dXJuICh4b3IoaXNWYWxpZCwgaW52ZXJ0KSkgP1xuICAgICAgICBudWxsIDogX21lcmdlT2JqZWN0cyhlcnJvciwgeyAnbm90JzogIWludmVydCB9KTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqICdjb21wb3NlJyB2YWxpZGF0b3IgY29tYmluYXRpb24gZnVuY3Rpb25cbiAgICpcbiAgICogQHBhcmFtIHtJVmFsaWRhdG9yRm5bXX0gdmFsaWRhdG9ycyAtIGFycmF5IG9mIHZhbGlkYXRvcnMgdG8gY29tYmluZVxuICAgKiBAcmV0dXJuIHtJVmFsaWRhdG9yRm59IC0gc2luZ2xlIGNvbWJpbmVkIHZhbGlkYXRvciBmdW5jdGlvblxuICAgKi9cbiAgc3RhdGljIGNvbXBvc2UodmFsaWRhdG9yczogSVZhbGlkYXRvckZuW10pOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghdmFsaWRhdG9ycykgeyByZXR1cm4gbnVsbDsgfVxuICAgIGNvbnN0IHByZXNlbnRWYWxpZGF0b3JzID0gdmFsaWRhdG9ycy5maWx0ZXIoaXNEZWZpbmVkKTtcbiAgICBpZiAocHJlc2VudFZhbGlkYXRvcnMubGVuZ3RoID09PSAwKSB7IHJldHVybiBudWxsOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+XG4gICAgICBfbWVyZ2VFcnJvcnMoX2V4ZWN1dGVWYWxpZGF0b3JzKGNvbnRyb2wsIHByZXNlbnRWYWxpZGF0b3JzLCBpbnZlcnQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAnY29tcG9zZUFzeW5jJyBhc3luYyB2YWxpZGF0b3IgY29tYmluYXRpb24gZnVuY3Rpb25cbiAgICpcbiAgICogQHBhcmFtIHtBc3luY0lWYWxpZGF0b3JGbltdfSBhc3luYyB2YWxpZGF0b3JzIC0gYXJyYXkgb2YgYXN5bmMgdmFsaWRhdG9yc1xuICAgKiBAcmV0dXJuIHtBc3luY0lWYWxpZGF0b3JGbn0gLSBzaW5nbGUgY29tYmluZWQgYXN5bmMgdmFsaWRhdG9yIGZ1bmN0aW9uXG4gICAqL1xuICBzdGF0aWMgY29tcG9zZUFzeW5jKHZhbGlkYXRvcnM6IEFzeW5jSVZhbGlkYXRvckZuW10pOiBBc3luY0lWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCF2YWxpZGF0b3JzKSB7IHJldHVybiBudWxsOyB9XG4gICAgY29uc3QgcHJlc2VudFZhbGlkYXRvcnMgPSB2YWxpZGF0b3JzLmZpbHRlcihpc0RlZmluZWQpO1xuICAgIGlmIChwcmVzZW50VmFsaWRhdG9ycy5sZW5ndGggPT09IDApIHsgcmV0dXJuIG51bGw7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCkgPT4ge1xuICAgICAgY29uc3Qgb2JzZXJ2YWJsZXMgPVxuICAgICAgICBfZXhlY3V0ZUFzeW5jVmFsaWRhdG9ycyhjb250cm9sLCBwcmVzZW50VmFsaWRhdG9ycykubWFwKHRvT2JzZXJ2YWJsZSk7XG4gICAgICByZXR1cm4gbWFwLmNhbGwoZm9ya0pvaW4ob2JzZXJ2YWJsZXMpLCBfbWVyZ2VFcnJvcnMpO1xuICAgIH07XG4gIH1cblxuICAvLyBBZGRpdGlvbmFsIGFuZ3VsYXIgdmFsaWRhdG9ycyAobm90IHVzZWQgYnkgQW5ndWFsciBKU09OIFNjaGVtYSBGb3JtKVxuICAvLyBGcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvYmxvYi9tYXN0ZXIvcGFja2FnZXMvZm9ybXMvc3JjL3ZhbGlkYXRvcnMudHNcblxuICAvKipcbiAgICogVmFsaWRhdG9yIHRoYXQgcmVxdWlyZXMgY29udHJvbHMgdG8gaGF2ZSBhIHZhbHVlIGdyZWF0ZXIgdGhhbiBhIG51bWJlci5cbiAgICovXG4gIHN0YXRpYyBtaW4obWluOiBudW1iZXIpOiBWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShtaW4pKSB7IHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgLy8gZG9uJ3QgdmFsaWRhdGUgZW1wdHkgdmFsdWVzIHRvIGFsbG93IG9wdGlvbmFsIGNvbnRyb2xzXG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSB8fCBpc0VtcHR5KG1pbikpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIGNvbnN0IHZhbHVlID0gcGFyc2VGbG9hdChjb250cm9sLnZhbHVlKTtcbiAgICAgIGNvbnN0IGFjdHVhbCA9IGNvbnRyb2wudmFsdWU7XG4gICAgICAvLyBDb250cm9scyB3aXRoIE5hTiB2YWx1ZXMgYWZ0ZXIgcGFyc2luZyBzaG91bGQgYmUgdHJlYXRlZCBhcyBub3QgaGF2aW5nIGFcbiAgICAgIC8vIG1pbmltdW0sIHBlciB0aGUgSFRNTCBmb3JtcyBzcGVjOiBodHRwczovL3d3dy53My5vcmcvVFIvaHRtbDUvZm9ybXMuaHRtbCNhdHRyLWlucHV0LW1pblxuICAgICAgcmV0dXJuIGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA+PSBtaW4gPyBudWxsIDogeyAnbWluJzogeyBtaW4sIGFjdHVhbCB9IH07XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0b3IgdGhhdCByZXF1aXJlcyBjb250cm9scyB0byBoYXZlIGEgdmFsdWUgbGVzcyB0aGFuIGEgbnVtYmVyLlxuICAgKi9cbiAgc3RhdGljIG1heChtYXg6IG51bWJlcik6IFZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKG1heCkpIHsgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCA9PiB7XG4gICAgICAvLyBkb24ndCB2YWxpZGF0ZSBlbXB0eSB2YWx1ZXMgdG8gYWxsb3cgb3B0aW9uYWwgY29udHJvbHNcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpIHx8IGlzRW1wdHkobWF4KSkgeyByZXR1cm4gbnVsbDsgfVxuICAgICAgY29uc3QgdmFsdWUgPSBwYXJzZUZsb2F0KGNvbnRyb2wudmFsdWUpO1xuICAgICAgY29uc3QgYWN0dWFsID0gY29udHJvbC52YWx1ZTtcbiAgICAgIC8vIENvbnRyb2xzIHdpdGggTmFOIHZhbHVlcyBhZnRlciBwYXJzaW5nIHNob3VsZCBiZSB0cmVhdGVkIGFzIG5vdCBoYXZpbmcgYVxuICAgICAgLy8gbWF4aW11bSwgcGVyIHRoZSBIVE1MIGZvcm1zIHNwZWM6IGh0dHBzOi8vd3d3LnczLm9yZy9UUi9odG1sNS9mb3Jtcy5odG1sI2F0dHItaW5wdXQtbWF4XG4gICAgICByZXR1cm4gaXNOYU4odmFsdWUpIHx8IHZhbHVlIDw9IG1heCA/IG51bGwgOiB7ICdtYXgnOiB7IG1heCwgYWN0dWFsIH0gfTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRvciB0aGF0IHJlcXVpcmVzIGNvbnRyb2wgdmFsdWUgdG8gYmUgdHJ1ZS5cbiAgICovXG4gIHN0YXRpYyByZXF1aXJlZFRydWUoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9yc3xudWxsIHtcbiAgICBpZiAoIWNvbnRyb2wpIHsgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7IH1cbiAgICByZXR1cm4gY29udHJvbC52YWx1ZSA9PT0gdHJ1ZSA/IG51bGwgOiB7ICdyZXF1aXJlZCc6IHRydWUgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0b3IgdGhhdCBwZXJmb3JtcyBlbWFpbCB2YWxpZGF0aW9uLlxuICAgKi9cbiAgc3RhdGljIGVtYWlsKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCB7XG4gICAgaWYgKCFjb250cm9sKSB7IHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yOyB9XG4gICAgY29uc3QgRU1BSUxfUkVHRVhQID1cbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBtYXgtbGluZS1sZW5ndGhcbiAgICAgIC9eKD89LnsxLDI1NH0kKSg/PS57MSw2NH1AKVstISMkJSYnKisvMC05PT9BLVpeX2BhLXp7fH1+XSsoXFwuWy0hIyQlJicqKy8wLTk9P0EtWl5fYGEtent8fX5dKykqQFtBLVphLXowLTldKFtBLVphLXowLTktXXswLDYxfVtBLVphLXowLTldKT8oXFwuW0EtWmEtejAtOV0oW0EtWmEtejAtOS1dezAsNjF9W0EtWmEtejAtOV0pPykqJC87XG4gICAgcmV0dXJuIEVNQUlMX1JFR0VYUC50ZXN0KGNvbnRyb2wudmFsdWUpID8gbnVsbCA6IHsgJ2VtYWlsJzogdHJ1ZSB9O1xuICB9XG59XG4iXX0=