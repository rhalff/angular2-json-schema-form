(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tslib'), require('rxjs-compat/Observable'), require('rxjs-compat/observable/fromPromise'), require('rxjs-compat/operator/toPromise'), require('@angular/core'), require('lodash'), require('rxjs-compat/observable/forkJoin'), require('rxjs-compat/operator/map'), require('@angular/forms'), require('rxjs-compat/Subject'), require('ajv'), require('@angular/platform-browser'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('angular2-json-schema-form', ['exports', 'tslib', 'rxjs-compat/Observable', 'rxjs-compat/observable/fromPromise', 'rxjs-compat/operator/toPromise', '@angular/core', 'lodash', 'rxjs-compat/observable/forkJoin', 'rxjs-compat/operator/map', '@angular/forms', 'rxjs-compat/Subject', 'ajv', '@angular/platform-browser', '@angular/common'], factory) :
    (factory((global['angular2-json-schema-form'] = {}),global.tslib,global.rxjs.Observable,global.rxjs.observable.fromPromise,global.rxjs.operator.toPromise,global.ng.core,global._,global.rxjs.observable.forkJoin,global.rxjs.operator.map,global.ng.forms,global.rxjs.Subject,global.Ajv,global.ng.platformBrowser,global.ng.common));
}(this, (function (exports,tslib,Observable,fromPromise,toPromise,core,lodash,forkJoin,map,forms,Subject,Ajv,platformBrowser,common) { 'use strict';

    /**
     * '_executeValidators' utility function
     *
     * Validates a control against an array of validators, and returns
     * an array of the same length containing a combination of error messages
     * (from invalid validators) and null values (from valid validators)
     *
     * @param  { AbstractControl } control - control to validate
     * @param  { IValidatorFn[] } validators - array of validators
     * @param  { boolean } invert - invert?
     * @return { PlainObject[] } - array of nulls and error message
     */
    function _executeValidators(control, validators, invert) {
        if (invert === void 0) {
            invert = false;
        }
        return validators.map(function (validator) { return validator(control, invert); });
    }
    /**
     * '_executeAsyncValidators' utility function
     *
     * Validates a control against an array of async validators, and returns
     * an array of observabe results of the same length containing a combination of
     * error messages (from invalid validators) and null values (from valid ones)
     *
     * @param  { AbstractControl } control - control to validate
     * @param  { AsyncIValidatorFn[] } validators - array of async validators
     * @param  { boolean } invert - invert?
     * @return { any[] } - array of observable nulls and error message
     */
    function _executeAsyncValidators(control, validators, invert) {
        if (invert === void 0) {
            invert = false;
        }
        return validators.map(function (validator) { return validator(control, invert); });
    }
    /**
     * '_mergeObjects' utility function
     *
     * Recursively Merges one or more objects into a single object with combined keys.
     * Automatically detects and ignores null and undefined inputs.
     * Also detects duplicated boolean 'not' keys and XORs their values.
     *
     * @param  { PlainObject[] } objects - one or more objects to merge
     * @return { PlainObject } - merged object
     */
    function _mergeObjects() {
        var objects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            objects[_i] = arguments[_i];
        }
        var mergedObject = {};
        try {
            for (var objects_1 = tslib.__values(objects), objects_1_1 = objects_1.next(); !objects_1_1.done; objects_1_1 = objects_1.next()) {
                var currentObject = objects_1_1.value;
                if (isObject(currentObject)) {
                    try {
                        for (var _a = tslib.__values(Object.keys(currentObject)), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var key = _b.value;
                            var currentValue = currentObject[key];
                            var mergedValue = mergedObject[key];
                            mergedObject[key] = !isDefined(mergedValue) ? currentValue :
                                key === 'not' && isBoolean(mergedValue, 'strict') &&
                                    isBoolean(currentValue, 'strict') ? xor(mergedValue, currentValue) :
                                    getType(mergedValue) === 'object' && getType(currentValue) === 'object' ?
                                        _mergeObjects(mergedValue, currentValue) :
                                        currentValue;
                        }
                    }
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return))
                                _c.call(_a);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
                    }
                }
            }
        }
        catch (e_2_1) {
            e_2 = { error: e_2_1 };
        }
        finally {
            try {
                if (objects_1_1 && !objects_1_1.done && (_d = objects_1.return))
                    _d.call(objects_1);
            }
            finally {
                if (e_2)
                    throw e_2.error;
            }
        }
        return mergedObject;
        var e_2, _d, e_1, _c;
    }
    /**
     * '_mergeErrors' utility function
     *
     * Merges an array of objects.
     * Used for combining the validator errors returned from 'executeValidators'
     *
     * @param  { PlainObject[] } arrayOfErrors - array of objects
     * @return { PlainObject } - merged object, or null if no usable input objectcs
     */
    function _mergeErrors(arrayOfErrors) {
        var mergedErrors = _mergeObjects.apply(void 0, tslib.__spread(arrayOfErrors));
        return isEmpty(mergedErrors) ? null : mergedErrors;
    }
    /**
     * 'isDefined' utility function
     *
     * Checks if a variable contains a value of any type.
     * Returns true even for otherwise 'falsey' values of 0, '', and false.
     *
     * @param  { any } value - the value to check
     * @return { boolean } - false if undefined or null, otherwise true
     */
    function isDefined(value) {
        return value !== undefined && value !== null;
    }
    /**
     * 'hasValue' utility function
     *
     * Checks if a variable contains a value.
     * Returs false for null, undefined, or a zero-length strng, '',
     * otherwise returns true.
     * (Stricter than 'isDefined' because it also returns false for '',
     * though it stil returns true for otherwise 'falsey' values 0 and false.)
     *
     * @param  { any } value - the value to check
     * @return { boolean } - false if undefined, null, or '', otherwise true
     */
    function hasValue(value) {
        return value !== undefined && value !== null && value !== '';
    }
    /**
     * 'isEmpty' utility function
     *
     * Similar to !hasValue, but also returns true for empty arrays and objects.
     *
     * @param  { any } value - the value to check
     * @return { boolean } - false if undefined, null, or '', otherwise true
     */
    function isEmpty(value) {
        if (isArray(value)) {
            return !value.length;
        }
        if (isObject(value)) {
            return !Object.keys(value).length;
        }
        return value === undefined || value === null || value === '';
    }
    /**
     * 'isString' utility function
     *
     * Checks if a value is a string.
     *
     * @param  { any } value - the value to check
     * @return { boolean } - true if string, false if not
     */
    function isString(value) {
        return typeof value === 'string';
    }
    /**
     * 'isNumber' utility function
     *
     * Checks if a value is a regular number, numeric string, or JavaScript Date.
     *
     * @param  { any } value - the value to check
     * @param  { any = false } strict - if truthy, also checks JavaScript tyoe
     * @return { boolean } - true if number, false if not
     */
    function isNumber(value, strict) {
        if (strict === void 0) {
            strict = false;
        }
        if (strict && typeof value !== 'number') {
            return false;
        }
        return !isNaN(value) && value !== value / 0;
    }
    /**
     * 'isInteger' utility function
     *
     * Checks if a value is an integer.
     *
     * @param  { any } value - the value to check
     * @param  { any = false } strict - if truthy, also checks JavaScript tyoe
     * @return {boolean } - true if number, false if not
     */
    function isInteger(value, strict) {
        if (strict === void 0) {
            strict = false;
        }
        if (strict && typeof value !== 'number') {
            return false;
        }
        return !isNaN(value) && value !== value / 0 && value % 1 === 0;
    }
    /**
     * 'isBoolean' utility function
     *
     * Checks if a value is a boolean.
     *
     * @param  { any } value - the value to check
     * @param  { any = null } option - if 'strict', also checks JavaScript type
     *                              if TRUE or FALSE, checks only for that value
     * @return { boolean } - true if boolean, false if not
     */
    function isBoolean(value, option) {
        if (option === void 0) {
            option = null;
        }
        if (option === 'strict') {
            return value === true || value === false;
        }
        if (option === true) {
            return value === true || value === 1 || value === 'true' || value === '1';
        }
        if (option === false) {
            return value === false || value === 0 || value === 'false' || value === '0';
        }
        return value === true || value === 1 || value === 'true' || value === '1' ||
            value === false || value === 0 || value === 'false' || value === '0';
    }
    function isObject(item) {
        return item !== null && typeof item === 'object' &&
            Object.prototype.toString.call(item) === '[object Object]';
    }
    function isArray(item) {
        return Array.isArray(item) ||
            Object.prototype.toString.call(item) === '[object Array]';
    }
    function isDate(item) {
        return typeof item === 'object' &&
            Object.prototype.toString.call(item) === '[object Date]';
    }
    function isMap(item) {
        return typeof item === 'object' &&
            Object.prototype.toString.call(item) === '[object Map]';
    }
    function isSet(item) {
        return typeof item === 'object' &&
            Object.prototype.toString.call(item) === '[object Set]';
    }
    /**
     * 'getType' function
     *
     * Detects the JSON Schema Type of a value.
     * By default, detects numbers and integers even if formatted as strings.
     * (So all integers are also numbers, and any number may also be a string.)
     * However, it only detects true boolean values (to detect boolean values
     * in non-boolean formats, use isBoolean() instead).
     *
     * If passed a second optional parameter of 'strict', it will only detect
     * numbers and integers if they are formatted as JavaScript numbers.
     *
     * Examples:
     * getType('10.5') = 'number'
     * getType(10.5) = 'number'
     * getType('10') = 'integer'
     * getType(10) = 'integer'
     * getType('true') = 'string'
     * getType(true) = 'boolean'
     * getType(null) = 'null'
     * getType({ }) = 'object'
     * getType([]) = 'array'
     *
     * getType('10.5', 'strict') = 'string'
     * getType(10.5, 'strict') = 'number'
     * getType('10', 'strict') = 'string'
     * getType(10, 'strict') = 'integer'
     * getType('true', 'strict') = 'string'
     * getType(true, 'strict') = 'boolean'
     *
     * @param  { any } value - value to check
     * @param  { any = false } strict - if truthy, also checks JavaScript tyoe
     * @return { SchemaType }
     */
    function getType(value, strict) {
        if (strict === void 0) {
            strict = false;
        }
        if (!isDefined(value)) {
            return 'null';
        }
        if (isArray(value)) {
            return 'array';
        }
        if (isObject(value)) {
            return 'object';
        }
        if (isBoolean(value, 'strict')) {
            return 'boolean';
        }
        if (isInteger(value, strict)) {
            return 'integer';
        }
        if (isNumber(value, strict)) {
            return 'number';
        }
        if (isString(value) || (!strict && isDate(value))) {
            return 'string';
        }
        return null;
    }
    /**
     * 'isType' function
     *
     * Checks wether an input (probably string) value contains data of
     * a specified JSON Schema type
     *
     * @param  { PrimitiveValue } value - value to check
     * @param  { SchemaPrimitiveType } type - type to check
     * @return { boolean }
     */
    function isType(value, type) {
        switch (type) {
            case 'string':
                return isString(value) || isDate(value);
            case 'number':
                return isNumber(value);
            case 'integer':
                return isInteger(value);
            case 'boolean':
                return isBoolean(value);
            case 'null':
                return !hasValue(value);
            default:
                console.error("isType error: \"" + type + "\" is not a recognized type.");
                return null;
        }
    }
    /**
     * 'isPrimitive' function
     *
     * Checks wether an input value is a JavaScript primitive type:
     * string, number, boolean, or null.
     *
     * @param  { any } value - value to check
     * @return { boolean }
     */
    function isPrimitive(value) {
        return (isString(value) || isNumber(value) ||
            isBoolean(value, 'strict') || value === null);
    }
    /**
     * 'toJavaScriptType' function
     *
     * Converts an input (probably string) value to a JavaScript primitive type -
     * 'string', 'number', 'boolean', or 'null' - before storing in a JSON object.
     *
     * Does not coerce values (other than null), and only converts the types
     * of values that would otherwise be valid.
     *
     * If the optional third parameter 'strictIntegers' is TRUE, and the
     * JSON Schema type 'integer' is specified, it also verifies the input value
     * is an integer and, if it is, returns it as a JaveScript number.
     * If 'strictIntegers' is FALSE (or not set) the type 'integer' is treated
     * exactly the same as 'number', and allows decimals.
     *
     * Valid Examples:
     * toJavaScriptType('10',   'number' ) = 10   // '10'   is a number
     * toJavaScriptType('10',   'integer') = 10   // '10'   is also an integer
     * toJavaScriptType( 10,    'integer') = 10   //  10    is still an integer
     * toJavaScriptType( 10,    'string' ) = '10' //  10    can be made into a string
     * toJavaScriptType('10.5', 'number' ) = 10.5 // '10.5' is a number
     *
     * Invalid Examples:
     * toJavaScriptType('10.5', 'integer') = null // '10.5' is not an integer
     * toJavaScriptType( 10.5,  'integer') = null //  10.5  is still not an integer
     *
     * @param  { PrimitiveValue } value - value to convert
     * @param  { SchemaPrimitiveType | SchemaPrimitiveType[] } types - types to convert to
     * @param  { boolean = false } strictIntegers - if FALSE, treat integers as numbers
     * @return { PrimitiveValue }
     */
    function toJavaScriptType(value, types, strictIntegers) {
        if (strictIntegers === void 0) {
            strictIntegers = true;
        }
        if (!isDefined(value)) {
            return null;
        }
        if (isString(types)) {
            types = [types];
        }
        if (strictIntegers && inArray('integer', types)) {
            if (isInteger(value, 'strict')) {
                return value;
            }
            if (isInteger(value)) {
                return parseInt(value, 10);
            }
        }
        if (inArray('number', types) || (!strictIntegers && inArray('integer', types))) {
            if (isNumber(value, 'strict')) {
                return value;
            }
            if (isNumber(value)) {
                return parseFloat(value);
            }
        }
        if (inArray('string', types)) {
            if (isString(value)) {
                return value;
            }
            // If value is a date, and types includes 'string',
            // convert the date to a string
            if (isDate(value)) {
                return value.toISOString().slice(0, 10);
            }
            if (isNumber(value)) {
                return value.toString();
            }
        }
        // If value is a date, and types includes 'integer' or 'number',
        // but not 'string', convert the date to a number
        if (isDate(value) && (inArray('integer', types) || inArray('number', types))) {
            return value.getTime();
        }
        if (inArray('boolean', types)) {
            if (isBoolean(value, true)) {
                return true;
            }
            if (isBoolean(value, false)) {
                return false;
            }
        }
        return null;
    }
    /**
     * 'toSchemaType' function
     *
     * Converts an input (probably string) value to the "best" JavaScript
     * equivalent available from an allowed list of JSON Schema types, which may
     * contain 'string', 'number', 'integer', 'boolean', and/or 'null'.
     * If necssary, it does progressively agressive type coersion.
     * It will not return null unless null is in the list of allowed types.
     *
     * Number conversion examples:
     * toSchemaType('10', ['number','integer','string']) = 10 // integer
     * toSchemaType('10', ['number','string']) = 10 // number
     * toSchemaType('10', ['string']) = '10' // string
     * toSchemaType('10.5', ['number','integer','string']) = 10.5 // number
     * toSchemaType('10.5', ['integer','string']) = '10.5' // string
     * toSchemaType('10.5', ['integer']) = 10 // integer
     * toSchemaType(10.5, ['null','boolean','string']) = '10.5' // string
     * toSchemaType(10.5, ['null','boolean']) = true // boolean
     *
     * String conversion examples:
     * toSchemaType('1.5x', ['boolean','number','integer','string']) = '1.5x' // string
     * toSchemaType('1.5x', ['boolean','number','integer']) = '1.5' // number
     * toSchemaType('1.5x', ['boolean','integer']) = '1' // integer
     * toSchemaType('1.5x', ['boolean']) = true // boolean
     * toSchemaType('xyz', ['number','integer','boolean','null']) = true // boolean
     * toSchemaType('xyz', ['number','integer','null']) = null // null
     * toSchemaType('xyz', ['number','integer']) = 0 // number
     *
     * Boolean conversion examples:
     * toSchemaType('1', ['integer','number','string','boolean']) = 1 // integer
     * toSchemaType('1', ['number','string','boolean']) = 1 // number
     * toSchemaType('1', ['string','boolean']) = '1' // string
     * toSchemaType('1', ['boolean']) = true // boolean
     * toSchemaType('true', ['number','string','boolean']) = 'true' // string
     * toSchemaType('true', ['boolean']) = true // boolean
     * toSchemaType('true', ['number']) = 0 // number
     * toSchemaType(true, ['number','string','boolean']) = true // boolean
     * toSchemaType(true, ['number','string']) = 'true' // string
     * toSchemaType(true, ['number']) = 1 // number
     *
     * @param  { PrimitiveValue } value - value to convert
     * @param  { SchemaPrimitiveType | SchemaPrimitiveType[] } types - allowed types to convert to
     * @return { PrimitiveValue }
     */
    function toSchemaType(value, types) {
        if (!isArray(types)) {
            types = [types];
        }
        if (types.includes('null') && !hasValue(value)) {
            return null;
        }
        if (types.includes('boolean') && !isBoolean(value, 'strict')) {
            return value;
        }
        if (types.includes('integer')) {
            var testValue = toJavaScriptType(value, 'integer');
            if (testValue !== null) {
                return +testValue;
            }
        }
        if (types.includes('number')) {
            var testValue = toJavaScriptType(value, 'number');
            if (testValue !== null) {
                return +testValue;
            }
        }
        if ((isString(value) || isNumber(value, 'strict')) &&
            types.includes('string')) {
            // Convert number to string
            return toJavaScriptType(value, 'string');
        }
        if (types.includes('boolean') && isBoolean(value)) {
            return toJavaScriptType(value, 'boolean');
        }
        if (types.includes('string')) {
            // Convert null & boolean to string
            if (value === null) {
                return '';
            }
            var testValue = toJavaScriptType(value, 'string');
            if (testValue !== null) {
                return testValue;
            }
        }
        if ((types.includes('number') ||
            types.includes('integer'))) {
            if (value === true) {
                return 1;
            } // Convert boolean & null to number
            if (value === false || value === null || value === '') {
                return 0;
            }
        }
        if (types.includes('number')) {
            // Convert mixed string to number
            var testValue = parseFloat(value);
            if (!!testValue) {
                return testValue;
            }
        }
        if (types.includes('integer')) {
            // Convert string or number to integer
            var testValue = parseInt(value, 10);
            if (!!testValue) {
                return testValue;
            }
        }
        if (types.includes('boolean')) {
            // Convert anything to boolean
            return !!value;
        }
        if ((types.includes('number') ||
            types.includes('integer')) && !types.includes('null')) {
            return 0; // If null not allowed, return 0 for non-convertable values
        }
    }
    /**
     * 'isPromise' function
     *
     * @param  { any } object
     * @return { boolean }
     */
    function isPromise(object) {
        return !!object && typeof object.then === 'function';
    }
    /**
     * 'isObservable' function
     *
     * @param  { any } object
     * @return { boolean }
     */
    function isObservable(object) {
        return !!object && typeof object.subscribe === 'function';
    }
    /**
     * 'toObservable' function
     *
     * @param  { object } object
     * @return { Observable<any> }
     */
    function toObservable(object) {
        var observable = isPromise(object) ? fromPromise.fromPromise(object) : object;
        if (isObservable(observable)) {
            return observable;
        }
        console.error('toObservable error: Expected validator to return Promise or Observable.');
        return new Observable.Observable();
    }
    /**
     * 'inArray' function
     *
     * Searches an array for an item, or one of a list of items, and returns true
     * as soon as a match is found, or false if no match.
     *
     * If the optional third parameter allIn is set to TRUE, and the item to find
     * is an array, then the function returns true only if all elements from item
     * are found in the array list, and false if any element is not found. If the
     * item to find is not an array, setting allIn to TRUE has no effect.
     *
     * @param  { any|any[] } item - the item to search for
     * @param  { any[] } array - the array to search
     * @param  { boolean = false } allIn - if TRUE, all items must be in array
     * @return { boolean } - true if item(s) in array, false otherwise
     */
    function inArray(item, array, allIn) {
        if (allIn === void 0) {
            allIn = false;
        }
        if (!isDefined(item) || !isArray(array)) {
            return false;
        }
        return isArray(item) ?
            item[allIn ? 'every' : 'some'](function (subItem) { return array.includes(subItem); }) :
            array.includes(item);
    }
    /**
     * 'xor' utility function - exclusive or
     *
     * Returns true if exactly one of two values is truthy.
     *
     * @param  { any } value1 - first value to check
     * @param  { any } value2 - second value to check
     * @return { boolean } - true if exactly one input value is truthy, false if not
     */
    function xor(value1, value2) {
        return (!!value1 && !value2) || (!value1 && !!value2);
    }
    /**
     * 'copy' function
     *
     * Makes a shallow copy of a JavaScript object, array, Map, or Set.
     * If passed a JavaScript primitive value (string, number, boolean, or null),
     * it returns the value.
     *
     * @param {Object|Array|string|number|boolean|null} object - The object to copy
     * @param {boolean = false} errors - Show errors?
     * @return {Object|Array|string|number|boolean|null} - The copied object
     */
    function copy(object, errors) {
        if (errors === void 0) {
            errors = false;
        }
        if (typeof object !== 'object' || object === null) {
            return object;
        }
        if (isMap(object)) {
            return new Map(object);
        }
        if (isSet(object)) {
            return new Set(object);
        }
        if (isArray(object)) {
            return tslib.__spread(object);
        }
        if (isObject(object)) {
            return Object.assign({}, object);
        }
        if (errors) {
            console.error('copy error: Object to copy must be a JavaScript object or value.');
        }
        return object;
    }
    /**
     * 'forEach' function
     *
     * Iterates over all items in the first level of an object or array
     * and calls an iterator funciton on each item.
     *
     * The iterator function is called with four values:
     * 1. The current item's value
     * 2. The current item's key
     * 3. The parent object, which contains the current item
     * 4. The root object
     *
     * Setting the optional third parameter to 'top-down' or 'bottom-up' will cause
     * it to also recursively iterate over items in sub-objects or sub-arrays in the
     * specified direction.
     *
     * @param {Object|Array} object - The object or array to iterate over
     * @param {function} fn - the iterator funciton to call on each item
     * @param {boolean = false} errors - Show errors?
     * @return {void}
     */
    function forEach(object, fn, recurse, rootObject, errors) {
        if (recurse === void 0) {
            recurse = false;
        }
        if (rootObject === void 0) {
            rootObject = object;
        }
        if (errors === void 0) {
            errors = false;
        }
        if (isEmpty(object)) {
            return;
        }
        if ((isObject(object) || isArray(object)) && typeof fn === 'function') {
            try {
                for (var _a = tslib.__values(Object.keys(object)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var key = _b.value;
                    var value = object[key];
                    if (recurse === 'bottom-up' && (isObject(value) || isArray(value))) {
                        forEach(value, fn, recurse, rootObject);
                    }
                    fn(value, key, object, rootObject);
                    if (recurse === 'top-down' && (isObject(value) || isArray(value))) {
                        forEach(value, fn, recurse, rootObject);
                    }
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return))
                        _c.call(_a);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
            }
        }
        if (errors) {
            if (typeof fn !== 'function') {
                console.error('forEach error: Iterator must be a function.');
                console.error('function', fn);
            }
            if (!isObject(object) && !isArray(object)) {
                console.error('forEach error: Input object must be an object or array.');
                console.error('object', object);
            }
        }
        var e_1, _c;
    }
    /**
     * 'forEachCopy' function
     *
     * Iterates over all items in the first level of an object or array
     * and calls an iterator function on each item. Returns a new object or array
     * with the same keys or indexes as the original, and values set to the results
     * of the iterator function.
     *
     * Does NOT recursively iterate over items in sub-objects or sub-arrays.
     *
     * @param {Object | Array} object - The object or array to iterate over
     * @param {function} fn - The iterator funciton to call on each item
     * @param {boolean = false} errors - Show errors?
     * @return {Object | Array} - The resulting object or array
     */
    function forEachCopy(object, fn, errors) {
        if (errors === void 0) {
            errors = false;
        }
        if (!hasValue(object)) {
            return;
        }
        if ((isObject(object) || isArray(object)) && typeof object !== 'function') {
            var newObject = isArray(object) ? [] : {};
            try {
                for (var _a = tslib.__values(Object.keys(object)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var key = _b.value;
                    newObject[key] = fn(object[key], key, object);
                }
            }
            catch (e_2_1) {
                e_2 = { error: e_2_1 };
            }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return))
                        _c.call(_a);
                }
                finally {
                    if (e_2)
                        throw e_2.error;
                }
            }
            return newObject;
        }
        if (errors) {
            if (typeof fn !== 'function') {
                console.error('forEachCopy error: Iterator must be a function.');
                console.error('function', fn);
            }
            if (!isObject(object) && !isArray(object)) {
                console.error('forEachCopy error: Input object must be an object or array.');
                console.error('object', object);
            }
        }
        var e_2, _c;
    }
    /**
     * 'hasOwn' utility function
     *
     * Checks whether an object or array has a particular property.
     *
     * @param {any} object - the object to check
     * @param {string} property - the property to look for
     * @return {boolean} - true if object has property, false if not
     */
    function hasOwn(object, property) {
        if (!object || !['number', 'string', 'symbol'].includes(typeof property) ||
            (!isObject(object) && !isArray(object) && !isMap(object) && !isSet(object))) {
            return false;
        }
        if (isMap(object) || isSet(object)) {
            return object.has(property);
        }
        if (typeof property === 'number') {
            if (isArray(object)) {
                return object[property];
            }
            property = property + '';
        }
        return object.hasOwnProperty(property);
    }
    /**
     * 'mergeFilteredObject' utility function
     *
     * Shallowly merges two objects, setting key and values from source object
     * in target object, excluding specified keys.
     *
     * Optionally, it can also use functions to transform the key names and/or
     * the values of the merging object.
     *
     * @param {PlainObject} targetObject - Target object to add keys and values to
     * @param {PlainObject} sourceObject - Source object to copy keys and values from
     * @param {string[]} excludeKeys - Array of keys to exclude
     * @param {(string: string) => string = (k) => k} keyFn - Function to apply to keys
     * @param {(any: any) => any = (v) => v} valueFn - Function to apply to values
     * @return {PlainObject} - Returns targetObject
     */
    function mergeFilteredObject(targetObject, sourceObject, excludeKeys, keyFn, valFn) {
        if (excludeKeys === void 0) {
            excludeKeys = [];
        }
        if (keyFn === void 0) {
            keyFn = function (key) { return key; };
        }
        if (valFn === void 0) {
            valFn = function (val) { return val; };
        }
        if (!isObject(sourceObject)) {
            return targetObject;
        }
        if (!isObject(targetObject)) {
            targetObject = {};
        }
        try {
            for (var _a = tslib.__values(Object.keys(sourceObject)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var key = _b.value;
                if (!inArray(key, excludeKeys) && isDefined(sourceObject[key])) {
                    targetObject[keyFn(key)] = valFn(sourceObject[key]);
                }
            }
        }
        catch (e_3_1) {
            e_3 = { error: e_3_1 };
        }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return))
                    _c.call(_a);
            }
            finally {
                if (e_3)
                    throw e_3.error;
            }
        }
        return targetObject;
        var e_3, _c;
    }
    /**
     * 'uniqueItems' function
     *
     * Accepts any number of string value inputs,
     * and returns an array of all input vaues, excluding duplicates.
     *
     * @param {...string} ...items -
     * @return {string[]} -
     */
    function uniqueItems() {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var returnItems = [];
        try {
            for (var items_1 = tslib.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var item = items_1_1.value;
                if (!returnItems.includes(item)) {
                    returnItems.push(item);
                }
            }
        }
        catch (e_4_1) {
            e_4 = { error: e_4_1 };
        }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_a = items_1.return))
                    _a.call(items_1);
            }
            finally {
                if (e_4)
                    throw e_4.error;
            }
        }
        return returnItems;
        var e_4, _a;
    }
    /**
     * 'commonItems' function
     *
     * Accepts any number of strings or arrays of string values,
     * and returns a single array containing only values present in all inputs.
     *
     * @param {...string|string[]} ...arrays -
     * @return {string[]} -
     */
    function commonItems() {
        var arrays = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arrays[_i] = arguments[_i];
        }
        var returnItems = null;
        var _loop_1 = function (array) {
            if (isString(array)) {
                array = [array];
            }
            returnItems = returnItems === null ? tslib.__spread(array) :
                returnItems.filter(function (item) { return array.includes(item); });
            if (!returnItems.length) {
                return { value: [] };
            }
        };
        try {
            for (var arrays_1 = tslib.__values(arrays), arrays_1_1 = arrays_1.next(); !arrays_1_1.done; arrays_1_1 = arrays_1.next()) {
                var array = arrays_1_1.value;
                var state_1 = _loop_1(array);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        }
        catch (e_5_1) {
            e_5 = { error: e_5_1 };
        }
        finally {
            try {
                if (arrays_1_1 && !arrays_1_1.done && (_a = arrays_1.return))
                    _a.call(arrays_1);
            }
            finally {
                if (e_5)
                    throw e_5.error;
            }
        }
        return returnItems;
        var e_5, _a;
    }
    /**
     * 'fixTitle' function
     *
     *
     * @param {string} input -
     * @return {string} -
     */
    function fixTitle(name) {
        return name && toTitleCase(name.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' '));
    }
    /**
     * 'toTitleCase' function
     *
     * Intelligently converts an input string to Title Case.
     *
     * Accepts an optional second parameter with a list of additional
     * words and abbreviations to force into a particular case.
     *
     * This function is built on prior work by John Gruber and David Gouch:
     * http://daringfireball.net/2008/08/title_case_update
     * https://github.com/gouch/to-title-case
     *
     * @param {string} input -
     * @param {string|string[]} forceWords? -
     * @return {string} -
     */
    function toTitleCase(input, forceWords) {
        if (!isString(input)) {
            return input;
        }
        var forceArray = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'en',
            'for', 'if', 'in', 'nor', 'of', 'on', 'or', 'per', 'the', 'to', 'v', 'v.',
            'vs', 'vs.', 'via'];
        if (isString(forceWords)) {
            forceWords = forceWords.split('|');
        }
        if (isArray(forceWords)) {
            forceArray = forceArray.concat(forceWords);
        }
        var forceArrayLower = forceArray.map(function (w) { return w.toLowerCase(); });
        var noInitialCase = input === input.toUpperCase() || input === input.toLowerCase();
        var prevLastChar = '';
        input = input.trim();
        return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function (word, idx) {
            if (!noInitialCase && word.slice(1).search(/[A-Z]|\../) !== -1) {
                return word;
            }
            else {
                var newWord = void 0;
                var forceWord = forceArray[forceArrayLower.indexOf(word.toLowerCase())];
                if (!forceWord) {
                    if (noInitialCase) {
                        if (word.slice(1).search(/\../) !== -1) {
                            newWord = word.toLowerCase();
                        }
                        else {
                            newWord = word[0].toUpperCase() + word.slice(1).toLowerCase();
                        }
                    }
                    else {
                        newWord = word[0].toUpperCase() + word.slice(1);
                    }
                }
                else if (forceWord === forceWord.toLowerCase() && (idx === 0 || idx + word.length === input.length ||
                    prevLastChar === ':' || input[idx - 1].search(/[^\s-]/) !== -1 ||
                    (input[idx - 1] !== '-' && input[idx + word.length] === '-'))) {
                    newWord = forceWord[0].toUpperCase() + forceWord.slice(1);
                }
                else {
                    newWord = forceWord;
                }
                prevLastChar = word.slice(-1);
                return newWord;
            }
        });
    }
    var JsonPointer = (function () {
        function JsonPointer() {
        }
        /**
           * 'get' function
           *
           * Uses a JSON Pointer to retrieve a value from an object.
           *
           * @param  { object } object - Object to get value from
           * @param  { Pointer } pointer - JSON Pointer (string or array)
           * @param  { number = 0 } startSlice - Zero-based index of first Pointer key to use
           * @param  { number } endSlice - Zero-based index of last Pointer key to use
           * @param  { boolean = false } getBoolean - Return only true or false?
           * @param  { boolean = false } errors - Show error if not found?
           * @return { object } - Located value (or true or false if getBoolean = true)
           */
        JsonPointer.get = function (object, pointer, startSlice, endSlice, getBoolean, errors) {
            if (startSlice === void 0) {
                startSlice = 0;
            }
            if (endSlice === void 0) {
                endSlice = null;
            }
            if (getBoolean === void 0) {
                getBoolean = false;
            }
            if (errors === void 0) {
                errors = false;
            }
            if (object === null) {
                return getBoolean ? false : undefined;
            }
            var keyArray = this.parse(pointer, errors);
            if (typeof object === 'object' && keyArray !== null) {
                var subObject = object;
                if (startSlice >= keyArray.length || endSlice <= -keyArray.length) {
                    return object;
                }
                if (startSlice <= -keyArray.length) {
                    startSlice = 0;
                }
                if (!isDefined(endSlice) || endSlice >= keyArray.length) {
                    endSlice = keyArray.length;
                }
                keyArray = keyArray.slice(startSlice, endSlice);
                try {
                    for (var keyArray_1 = tslib.__values(keyArray), keyArray_1_1 = keyArray_1.next(); !keyArray_1_1.done; keyArray_1_1 = keyArray_1.next()) {
                        var key = keyArray_1_1.value;
                        if (key === '-' && isArray(subObject) && subObject.length) {
                            key = subObject.length - 1;
                        }
                        if (isMap(subObject) && subObject.has(key)) {
                            subObject = subObject.get(key);
                        }
                        else if (typeof subObject === 'object' && subObject !== null &&
                            hasOwn(subObject, key)) {
                            subObject = subObject[key];
                        }
                        else {
                            if (errors) {
                                console.error("get error: \"" + key + "\" key not found in object.");
                                console.error(pointer);
                                console.error(object);
                            }
                            return getBoolean ? false : undefined;
                        }
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (keyArray_1_1 && !keyArray_1_1.done && (_a = keyArray_1.return))
                            _a.call(keyArray_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                return getBoolean ? true : subObject;
            }
            if (errors && keyArray === null) {
                console.error("get error: Invalid JSON Pointer: " + pointer);
            }
            if (errors && typeof object !== 'object') {
                console.error('get error: Invalid object:');
                console.error(object);
            }
            return getBoolean ? false : undefined;
            var e_1, _a;
        };
        /**
           * 'getCopy' function
           *
           * Uses a JSON Pointer to deeply clone a value from an object.
           *
           * @param  { object } object - Object to get value from
           * @param  { Pointer } pointer - JSON Pointer (string or array)
           * @param  { number = 0 } startSlice - Zero-based index of first Pointer key to use
           * @param  { number } endSlice - Zero-based index of last Pointer key to use
           * @param  { boolean = false } getBoolean - Return only true or false?
           * @param  { boolean = false } errors - Show error if not found?
           * @return { object } - Located value (or true or false if getBoolean = true)
           */
        JsonPointer.getCopy = function (object, pointer, startSlice, endSlice, getBoolean, errors) {
            if (startSlice === void 0) {
                startSlice = 0;
            }
            if (endSlice === void 0) {
                endSlice = null;
            }
            if (getBoolean === void 0) {
                getBoolean = false;
            }
            if (errors === void 0) {
                errors = false;
            }
            var objectToCopy = this.get(object, pointer, startSlice, endSlice, getBoolean, errors);
            return this.forEachDeepCopy(objectToCopy);
        };
        /**
           * 'getFirst' function
           *
           * Takes an array of JSON Pointers and objects,
           * checks each object for a value specified by the pointer,
           * and returns the first value found.
           *
           * @param  { [object, pointer][] } items - Array of objects and pointers to check
           * @param  { any = null } defaultValue - Value to return if nothing found
           * @param  { boolean = false } getCopy - Return a copy instead?
           * @return { any } - First value found
           */
        JsonPointer.getFirst = function (items, defaultValue, getCopy) {
            if (defaultValue === void 0) {
                defaultValue = null;
            }
            if (getCopy === void 0) {
                getCopy = false;
            }
            if (isEmpty(items)) {
                return;
            }
            if (isArray(items)) {
                try {
                    for (var items_1 = tslib.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                        var item = items_1_1.value;
                        if (isEmpty(item)) {
                            continue;
                        }
                        if (isArray(item) && item.length >= 2) {
                            if (isEmpty(item[0]) || isEmpty(item[1])) {
                                continue;
                            }
                            var value = getCopy ?
                                this.getCopy(item[0], item[1]) :
                                this.get(item[0], item[1]);
                            if (value) {
                                return value;
                            }
                            continue;
                        }
                        console.error('getFirst error: Input not in correct format.\n' +
                            'Should be: [ [ object1, pointer1 ], [ object 2, pointer2 ], etc... ]');
                        return;
                    }
                }
                catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                }
                finally {
                    try {
                        if (items_1_1 && !items_1_1.done && (_a = items_1.return))
                            _a.call(items_1);
                    }
                    finally {
                        if (e_2)
                            throw e_2.error;
                    }
                }
                return defaultValue;
            }
            if (isMap(items)) {
                try {
                    for (var items_2 = tslib.__values(items), items_2_1 = items_2.next(); !items_2_1.done; items_2_1 = items_2.next()) {
                        var _b = tslib.__read(items_2_1.value, 2), object = _b[0], pointer = _b[1];
                        if (object === null || !this.isJsonPointer(pointer)) {
                            continue;
                        }
                        var value = getCopy ?
                            this.getCopy(object, pointer) :
                            this.get(object, pointer);
                        if (value) {
                            return value;
                        }
                    }
                }
                catch (e_3_1) {
                    e_3 = { error: e_3_1 };
                }
                finally {
                    try {
                        if (items_2_1 && !items_2_1.done && (_c = items_2.return))
                            _c.call(items_2);
                    }
                    finally {
                        if (e_3)
                            throw e_3.error;
                    }
                }
                return defaultValue;
            }
            console.error('getFirst error: Input not in correct format.\n' +
                'Should be: [ [ object1, pointer1 ], [ object 2, pointer2 ], etc... ]');
            return defaultValue;
            var e_2, _a, e_3, _c;
        };
        /**
           * 'getFirstCopy' function
           *
           * Similar to getFirst, but always returns a copy.
           *
           * @param  { [object, pointer][] } items - Array of objects and pointers to check
           * @param  { any = null } defaultValue - Value to return if nothing found
           * @return { any } - Copy of first value found
           */
        JsonPointer.getFirstCopy = function (items, defaultValue) {
            if (defaultValue === void 0) {
                defaultValue = null;
            }
            var firstCopy = this.getFirst(items, defaultValue, true);
            return firstCopy;
        };
        /**
           * 'set' function
           *
           * Uses a JSON Pointer to set a value on an object.
           * Also creates any missing sub objects or arrays to contain that value.
           *
           * If the optional fourth parameter is TRUE and the inner-most container
           * is an array, the function will insert the value as a new item at the
           * specified location in the array, rather than overwriting the existing
           * value (if any) at that location.
           *
           * So set([1, 2, 3], '/1', 4) => [1, 4, 3]
           * and
           * So set([1, 2, 3], '/1', 4, true) => [1, 4, 2, 3]
           *
           * @param  { object } object - The object to set value in
           * @param  { Pointer } pointer - The JSON Pointer (string or array)
           * @param  { any } value - The new value to set
           * @param  { boolean } insert - insert value?
           * @return { object } - The original object, modified with the set value
           */
        JsonPointer.set = function (object, pointer, value, insert) {
            if (insert === void 0) {
                insert = false;
            }
            var keyArray = this.parse(pointer);
            if (keyArray !== null && keyArray.length) {
                var subObject = object;
                for (var i = 0; i < keyArray.length - 1; ++i) {
                    var key = keyArray[i];
                    if (key === '-' && isArray(subObject)) {
                        key = subObject.length;
                    }
                    if (isMap(subObject) && subObject.has(key)) {
                        subObject = subObject.get(key);
                    }
                    else {
                        if (!hasOwn(subObject, key)) {
                            subObject[key] = (keyArray[i + 1].match(/^(\d+|-)$/)) ? [] : {};
                        }
                        subObject = subObject[key];
                    }
                }
                var lastKey = keyArray[keyArray.length - 1];
                if (isArray(subObject) && lastKey === '-') {
                    subObject.push(value);
                }
                else if (insert && isArray(subObject) && !isNaN(+lastKey)) {
                    subObject.splice(lastKey, 0, value);
                }
                else if (isMap(subObject)) {
                    subObject.set(lastKey, value);
                }
                else {
                    subObject[lastKey] = value;
                }
                return object;
            }
            console.error("set error: Invalid JSON Pointer: " + pointer);
            return object;
        };
        /**
           * 'setCopy' function
           *
           * Copies an object and uses a JSON Pointer to set a value on the copy.
           * Also creates any missing sub objects or arrays to contain that value.
           *
           * If the optional fourth parameter is TRUE and the inner-most container
           * is an array, the function will insert the value as a new item at the
           * specified location in the array, rather than overwriting the existing value.
           *
           * @param  { object } object - The object to copy and set value in
           * @param  { Pointer } pointer - The JSON Pointer (string or array)
           * @param  { any } value - The value to set
           * @param  { boolean } insert - insert value?
           * @return { object } - The new object with the set value
           */
        JsonPointer.setCopy = function (object, pointer, value, insert) {
            if (insert === void 0) {
                insert = false;
            }
            var keyArray = this.parse(pointer);
            if (keyArray !== null) {
                var newObject = copy(object);
                var subObject = newObject;
                for (var i = 0; i < keyArray.length - 1; ++i) {
                    var key = keyArray[i];
                    if (key === '-' && isArray(subObject)) {
                        key = subObject.length;
                    }
                    if (isMap(subObject) && subObject.has(key)) {
                        subObject.set(key, copy(subObject.get(key)));
                        subObject = subObject.get(key);
                    }
                    else {
                        if (!hasOwn(subObject, key)) {
                            subObject[key] = (keyArray[i + 1].match(/^(\d+|-)$/)) ? [] : {};
                        }
                        subObject[key] = copy(subObject[key]);
                        subObject = subObject[key];
                    }
                }
                var lastKey = keyArray[keyArray.length - 1];
                if (isArray(subObject) && lastKey === '-') {
                    subObject.push(value);
                }
                else if (insert && isArray(subObject) && !isNaN(+lastKey)) {
                    subObject.splice(lastKey, 0, value);
                }
                else if (isMap(subObject)) {
                    subObject.set(lastKey, value);
                }
                else {
                    subObject[lastKey] = value;
                }
                return newObject;
            }
            console.error("setCopy error: Invalid JSON Pointer: " + pointer);
            return object;
        };
        /**
           * 'insert' function
           *
           * Calls 'set' with insert = TRUE
           *
           * @param  { object } object - object to insert value in
           * @param  { Pointer } pointer - JSON Pointer (string or array)
           * @param  { any } value - value to insert
           * @return { object }
           */
        JsonPointer.insert = function (object, pointer, value) {
            var updatedObject = this.set(object, pointer, value, true);
            return updatedObject;
        };
        /**
           * 'insertCopy' function
           *
           * Calls 'setCopy' with insert = TRUE
           *
           * @param  { object } object - object to insert value in
           * @param  { Pointer } pointer - JSON Pointer (string or array)
           * @param  { any } value - value to insert
           * @return { object }
           */
        JsonPointer.insertCopy = function (object, pointer, value) {
            var updatedObject = this.setCopy(object, pointer, value, true);
            return updatedObject;
        };
        /**
           * 'remove' function
           *
           * Uses a JSON Pointer to remove a key and its attribute from an object
           *
           * @param  { object } object - object to delete attribute from
           * @param  { Pointer } pointer - JSON Pointer (string or array)
           * @return { object }
           */
        JsonPointer.remove = function (object, pointer) {
            var keyArray = this.parse(pointer);
            if (keyArray !== null && keyArray.length) {
                var lastKey = keyArray.pop();
                var parentObject = this.get(object, keyArray);
                if (isArray(parentObject)) {
                    if (lastKey === '-') {
                        lastKey = parentObject.length - 1;
                    }
                    parentObject.splice(lastKey, 1);
                }
                else if (isObject(parentObject)) {
                    delete parentObject[lastKey];
                }
                return object;
            }
            console.error("remove error: Invalid JSON Pointer: " + pointer);
            return object;
        };
        /**
           * 'has' function
           *
           * Tests if an object has a value at the location specified by a JSON Pointer
           *
           * @param  { object } object - object to chek for value
           * @param  { Pointer } pointer - JSON Pointer (string or array)
           * @return { boolean }
           */
        JsonPointer.has = function (object, pointer) {
            var hasValue$$1 = this.get(object, pointer, 0, null, true);
            return hasValue$$1;
        };
        /**
           * 'dict' function
           *
           * Returns a (pointer -> value) dictionary for an object
           *
           * @param  { object } object - The object to create a dictionary from
           * @return { object } - The resulting dictionary object
           */
        JsonPointer.dict = function (object) {
            var results = {};
            this.forEachDeep(object, function (value, pointer) {
                if (typeof value !== 'object') {
                    results[pointer] = value;
                }
            });
            return results;
        };
        /**
           * 'forEachDeep' function
           *
           * Iterates over own enumerable properties of an object or items in an array
           * and invokes an iteratee function for each key/value or index/value pair.
           * By default, iterates over items within objects and arrays after calling
           * the iteratee function on the containing object or array itself.
           *
           * The iteratee is invoked with three arguments: (value, pointer, rootObject),
           * where pointer is a JSON pointer indicating the location of the current
           * value within the root object, and rootObject is the root object initially
           * submitted to th function.
           *
           * If a third optional parameter 'bottomUp' is set to TRUE, the iterator
           * function will be called on sub-objects and arrays after being
           * called on their contents, rather than before, which is the default.
           *
           * This function can also optionally be called directly on a sub-object by
           * including optional 4th and 5th parameterss to specify the initial
           * root object and pointer.
           *
           * @param  { object } object - the initial object or array
           * @param  { (v: any, p?: string, o?: any) => any } function - iteratee function
           * @param  { boolean = false } bottomUp - optional, set to TRUE to reverse direction
           * @param  { object = object } rootObject - optional, root object or array
           * @param  { string = '' } pointer - optional, JSON Pointer to object within rootObject
           * @return { object } - The modified object
           */
        JsonPointer.forEachDeep = function (object, fn, bottomUp, pointer, rootObject) {
            if (fn === void 0) {
                fn = function (v) { return v; };
            }
            if (bottomUp === void 0) {
                bottomUp = false;
            }
            if (pointer === void 0) {
                pointer = '';
            }
            if (rootObject === void 0) {
                rootObject = object;
            }
            if (typeof fn !== 'function') {
                console.error("forEachDeep error: Iterator is not a function:", fn);
                return;
            }
            if (!bottomUp) {
                fn(object, pointer, rootObject);
            }
            if (isObject(object) || isArray(object)) {
                try {
                    for (var _a = tslib.__values(Object.keys(object)), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var key = _b.value;
                        var newPointer = pointer + '/' + this.escape(key);
                        this.forEachDeep(object[key], fn, bottomUp, newPointer, rootObject);
                    }
                }
                catch (e_4_1) {
                    e_4 = { error: e_4_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_4)
                            throw e_4.error;
                    }
                }
            }
            if (bottomUp) {
                fn(object, pointer, rootObject);
            }
            var e_4, _c;
        };
        /**
           * 'forEachDeepCopy' function
           *
           * Similar to forEachDeep, but returns a copy of the original object, with
           * the same keys and indexes, but with values replaced with the result of
           * the iteratee function.
           *
           * @param  { object } object - the initial object or array
           * @param  { (v: any, k?: string, o?: any, p?: any) => any } function - iteratee function
           * @param  { boolean = false } bottomUp - optional, set to TRUE to reverse direction
           * @param  { object = object } rootObject - optional, root object or array
           * @param  { string = '' } pointer - optional, JSON Pointer to object within rootObject
           * @return { object } - The copied object
           */
        JsonPointer.forEachDeepCopy = function (object, fn, bottomUp, pointer, rootObject) {
            if (fn === void 0) {
                fn = function (v) { return v; };
            }
            if (bottomUp === void 0) {
                bottomUp = false;
            }
            if (pointer === void 0) {
                pointer = '';
            }
            if (rootObject === void 0) {
                rootObject = object;
            }
            if (typeof fn !== 'function') {
                console.error("forEachDeepCopy error: Iterator is not a function:", fn);
                return null;
            }
            if (isObject(object) || isArray(object)) {
                var newObject = isArray(object) ? tslib.__spread(object) : Object.assign({}, object);
                if (!bottomUp) {
                    newObject = fn(newObject, pointer, rootObject);
                }
                try {
                    for (var _a = tslib.__values(Object.keys(newObject)), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var key = _b.value;
                        var newPointer = pointer + '/' + this.escape(key);
                        newObject[key] = this.forEachDeepCopy(newObject[key], fn, bottomUp, newPointer, rootObject);
                    }
                }
                catch (e_5_1) {
                    e_5 = { error: e_5_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_5)
                            throw e_5.error;
                    }
                }
                if (bottomUp) {
                    newObject = fn(newObject, pointer, rootObject);
                }
                return newObject;
            }
            else {
                return fn(object, pointer, rootObject);
            }
            var e_5, _c;
        };
        /**
           * 'escape' function
           *
           * Escapes a string reference key
           *
           * @param  { string } key - string key to escape
           * @return { string } - escaped key
           */
        JsonPointer.escape = function (key) {
            var escaped = key.toString().replace(/~/g, '~0').replace(/\//g, '~1');
            return escaped;
        };
        /**
           * 'unescape' function
           *
           * Unescapes a string reference key
           *
           * @param  { string } key - string key to unescape
           * @return { string } - unescaped key
           */
        JsonPointer.unescape = function (key) {
            var unescaped = key.toString().replace(/~1/g, '/').replace(/~0/g, '~');
            return unescaped;
        };
        /**
           * 'parse' function
           *
           * Converts a string JSON Pointer into a array of keys
           * (if input is already an an array of keys, it is returned unchanged)
           *
           * @param  { Pointer } pointer - JSON Pointer (string or array)
           * @param  { boolean = false } errors - Show error if invalid pointer?
           * @return { string[] } - JSON Pointer array of keys
           */
        JsonPointer.parse = function (pointer, errors) {
            if (errors === void 0) {
                errors = false;
            }
            if (!this.isJsonPointer(pointer)) {
                if (errors) {
                    console.error("parse error: Invalid JSON Pointer: " + pointer);
                }
                return null;
            }
            if (isArray(pointer)) {
                return pointer;
            }
            if (typeof pointer === 'string') {
                if (pointer[0] === '#') {
                    pointer = pointer.slice(1);
                }
                if (pointer === '' || pointer === '/') {
                    return [];
                }
                return pointer.slice(1).split('/').map(this.unescape);
            }
        };
        /**
           * 'compile' function
           *
           * Converts an array of keys into a JSON Pointer string
           * (if input is already a string, it is normalized and returned)
           *
           * The optional second parameter is a default which will replace any empty keys.
           *
           * @param  { Pointer } pointer - JSON Pointer (string or array)
           * @param  { string | number = '' } defaultValue - Default value
           * @param  { boolean = false } errors - Show error if invalid pointer?
           * @return { string } - JSON Pointer string
           */
        JsonPointer.compile = function (pointer, defaultValue, errors) {
            var _this = this;
            if (defaultValue === void 0) {
                defaultValue = '';
            }
            if (errors === void 0) {
                errors = false;
            }
            if (pointer === '#') {
                return '';
            }
            if (!this.isJsonPointer(pointer)) {
                if (errors) {
                    console.error("compile error: Invalid JSON Pointer: " + pointer);
                }
                return null;
            }
            if (isArray(pointer)) {
                if (pointer.length === 0) {
                    return '';
                }
                return '/' + pointer.map(function (key) { return key === '' ? defaultValue : _this.escape(key); }).join('/');
            }
            if (typeof pointer === 'string') {
                if (pointer[0] === '#') {
                    pointer = pointer.slice(1);
                }
                return pointer;
            }
        };
        /**
           * 'toKey' function
           *
           * Extracts name of the final key from a JSON Pointer.
           *
           * @param  { Pointer } pointer - JSON Pointer (string or array)
           * @param  { boolean = false } errors - Show error if invalid pointer?
           * @return { string } - the extracted key
           */
        JsonPointer.toKey = function (pointer, errors) {
            if (errors === void 0) {
                errors = false;
            }
            var keyArray = this.parse(pointer, errors);
            if (keyArray === null) {
                return null;
            }
            if (!keyArray.length) {
                return '';
            }
            return keyArray[keyArray.length - 1];
        };
        /**
           * 'isJsonPointer' function
           *
           * Checks a string or array value to determine if it is a valid JSON Pointer.
           * Returns true if a string is empty, or starts with '/' or '#/'.
           * Returns true if an array contains only string values.
           *
           * @param  { any } value - value to check
           * @return { boolean } - true if value is a valid JSON Pointer, otherwise false
           */
        JsonPointer.isJsonPointer = function (value) {
            if (isArray(value)) {
                return value.every(function (key) { return typeof key === 'string'; });
            }
            else if (isString(value)) {
                if (value === '' || value === '#') {
                    return true;
                }
                if (value[0] === '/' || value.slice(0, 2) === '#/') {
                    return !/(~[^01]|~$)/g.test(value);
                }
            }
            return false;
        };
        /**
           * 'isSubPointer' function
           *
           * Checks whether one JSON Pointer is a subset of another.
           *
           * @param  { Pointer } shortPointer - potential subset JSON Pointer
           * @param  { Pointer } longPointer - potential superset JSON Pointer
           * @param  { boolean = false } trueIfMatching - return true if pointers match?
           * @param  { boolean = false } errors - Show error if invalid pointer?
           * @return { boolean } - true if shortPointer is a subset of longPointer, false if not
           */
        JsonPointer.isSubPointer = function (shortPointer, longPointer, trueIfMatching, errors) {
            if (trueIfMatching === void 0) {
                trueIfMatching = false;
            }
            if (errors === void 0) {
                errors = false;
            }
            if (!this.isJsonPointer(shortPointer) || !this.isJsonPointer(longPointer)) {
                if (errors) {
                    var invalid = '';
                    if (!this.isJsonPointer(shortPointer)) {
                        invalid += " 1: " + shortPointer;
                    }
                    if (!this.isJsonPointer(longPointer)) {
                        invalid += " 2: " + longPointer;
                    }
                    console.error("isSubPointer error: Invalid JSON Pointer " + invalid);
                }
                return;
            }
            shortPointer = this.compile(shortPointer, '', errors);
            longPointer = this.compile(longPointer, '', errors);
            return shortPointer === longPointer ? trueIfMatching :
                shortPointer + "/" === longPointer.slice(0, shortPointer.length + 1);
        };
        /**
           * 'toIndexedPointer' function
           *
           * Merges an array of numeric indexes and a generic pointer to create an
           * indexed pointer for a specific item.
           *
           * For example, merging the generic pointer '/foo/-/bar/-/baz' and
           * the array [4, 2] would result in the indexed pointer '/foo/4/bar/2/baz'
           *
           * @function
           * @param  { Pointer } genericPointer - The generic pointer
           * @param  { number[] } indexArray - The array of numeric indexes
           * @param  { Map<string, number> } arrayMap - An optional array map
           * @return { string } - The merged pointer with indexes
           */
        JsonPointer.toIndexedPointer = function (genericPointer, indexArray, arrayMap) {
            if (arrayMap === void 0) {
                arrayMap = null;
            }
            if (this.isJsonPointer(genericPointer) && isArray(indexArray)) {
                var indexedPointer_1 = this.compile(genericPointer);
                if (isMap(arrayMap)) {
                    var arrayIndex_1 = 0;
                    return indexedPointer_1.replace(/\/\-(?=\/|$)/g, function (key, stringIndex) {
                        return arrayMap.has(indexedPointer_1.slice(0, stringIndex)) ?
                            '/' + indexArray[arrayIndex_1++] : key;
                    });
                }
                else {
                    try {
                        for (var indexArray_1 = tslib.__values(indexArray), indexArray_1_1 = indexArray_1.next(); !indexArray_1_1.done; indexArray_1_1 = indexArray_1.next()) {
                            var pointerIndex = indexArray_1_1.value;
                            indexedPointer_1 = indexedPointer_1.replace('/-', '/' + pointerIndex);
                        }
                    }
                    catch (e_6_1) {
                        e_6 = { error: e_6_1 };
                    }
                    finally {
                        try {
                            if (indexArray_1_1 && !indexArray_1_1.done && (_a = indexArray_1.return))
                                _a.call(indexArray_1);
                        }
                        finally {
                            if (e_6)
                                throw e_6.error;
                        }
                    }
                    return indexedPointer_1;
                }
            }
            if (!this.isJsonPointer(genericPointer)) {
                console.error("toIndexedPointer error: Invalid JSON Pointer: " + genericPointer);
            }
            if (!isArray(indexArray)) {
                console.error("toIndexedPointer error: Invalid indexArray: " + indexArray);
            }
            var e_6, _a;
        };
        /**
           * 'toGenericPointer' function
           *
           * Compares an indexed pointer to an array map and removes list array
           * indexes (but leaves tuple arrray indexes and all object keys, including
           * numeric keys) to create a generic pointer.
           *
           * For example, using the indexed pointer '/foo/1/bar/2/baz/3' and
           * the arrayMap [['/foo', 0], ['/foo/-/bar', 3], ['/foo/-/bar/-/baz', 0]]
           * would result in the generic pointer '/foo/-/bar/2/baz/-'
           * Using the indexed pointer '/foo/1/bar/4/baz/3' and the same arrayMap
           * would result in the generic pointer '/foo/-/bar/-/baz/-'
           * (the bar array has 3 tuple items, so index 2 is retained, but 4 is removed)
           *
           * The structure of the arrayMap is: [['path to array', number of tuple items]...]
           *
           * @function
           * @param  { Pointer } indexedPointer - The indexed pointer (array or string)
           * @param  { Map<string, number> } arrayMap - The optional array map (for preserving tuple indexes)
           * @return { string } - The generic pointer with indexes removed
           */
        JsonPointer.toGenericPointer = function (indexedPointer, arrayMap) {
            if (arrayMap === void 0) {
                arrayMap = new Map();
            }
            if (this.isJsonPointer(indexedPointer) && isMap(arrayMap)) {
                var pointerArray = this.parse(indexedPointer);
                for (var i = 1; i < pointerArray.length; i++) {
                    var subPointer = this.compile(pointerArray.slice(0, i));
                    if (arrayMap.has(subPointer) &&
                        arrayMap.get(subPointer) <= +pointerArray[i]) {
                        pointerArray[i] = '-';
                    }
                }
                return this.compile(pointerArray);
            }
            if (!this.isJsonPointer(indexedPointer)) {
                console.error("toGenericPointer error: invalid JSON Pointer: " + indexedPointer);
            }
            if (!isMap(arrayMap)) {
                console.error("toGenericPointer error: invalid arrayMap: " + arrayMap);
            }
        };
        /**
           * 'toControlPointer' function
           *
           * Accepts a JSON Pointer for a data object and returns a JSON Pointer for the
           * matching control in an Angular FormGroup.
           *
           * @param  { Pointer } dataPointer - JSON Pointer (string or array) to a data object
           * @param  { FormGroup } formGroup - Angular FormGroup to get value from
           * @param  { boolean = false } controlMustExist - Only return if control exists?
           * @return { Pointer } - JSON Pointer (string) to the formGroup object
           */
        JsonPointer.toControlPointer = function (dataPointer, formGroup, controlMustExist) {
            if (controlMustExist === void 0) {
                controlMustExist = false;
            }
            var dataPointerArray = this.parse(dataPointer);
            var controlPointerArray = [];
            var subGroup = formGroup;
            if (dataPointerArray !== null) {
                try {
                    for (var dataPointerArray_1 = tslib.__values(dataPointerArray), dataPointerArray_1_1 = dataPointerArray_1.next(); !dataPointerArray_1_1.done; dataPointerArray_1_1 = dataPointerArray_1.next()) {
                        var key = dataPointerArray_1_1.value;
                        if (hasOwn(subGroup, 'controls')) {
                            controlPointerArray.push('controls');
                            subGroup = subGroup.controls;
                        }
                        if (isArray(subGroup) && (key === '-')) {
                            controlPointerArray.push((subGroup.length - 1).toString());
                            subGroup = subGroup[subGroup.length - 1];
                        }
                        else if (hasOwn(subGroup, key)) {
                            controlPointerArray.push(key);
                            subGroup = subGroup[key];
                        }
                        else if (controlMustExist) {
                            console.error("toControlPointer error: Unable to find \"" + key + "\" item in FormGroup.");
                            console.error(dataPointer);
                            console.error(formGroup);
                            return;
                        }
                        else {
                            controlPointerArray.push(key);
                            subGroup = { controls: {} };
                        }
                    }
                }
                catch (e_7_1) {
                    e_7 = { error: e_7_1 };
                }
                finally {
                    try {
                        if (dataPointerArray_1_1 && !dataPointerArray_1_1.done && (_a = dataPointerArray_1.return))
                            _a.call(dataPointerArray_1);
                    }
                    finally {
                        if (e_7)
                            throw e_7.error;
                    }
                }
                return this.compile(controlPointerArray);
            }
            console.error("toControlPointer error: Invalid JSON Pointer: " + dataPointer);
            var e_7, _a;
        };
        /**
           * 'toSchemaPointer' function
           *
           * Accepts a JSON Pointer to a value inside a data object and a JSON schema
           * for that object.
           *
           * Returns a Pointer to the sub-schema for the value inside the object's schema.
           *
           * @param  { Pointer } dataPointer - JSON Pointer (string or array) to an object
           * @param  { any } schema - JSON schema for the object
           * @return { Pointer } - JSON Pointer (string) to the object's schema
           */
        JsonPointer.toSchemaPointer = function (dataPointer, schema) {
            if (this.isJsonPointer(dataPointer) && typeof schema === 'object') {
                var pointerArray = this.parse(dataPointer);
                if (!pointerArray.length) {
                    return '';
                }
                var firstKey = pointerArray.shift();
                if (schema.type === 'object' || schema.properties || schema.additionalProperties) {
                    if ((schema.properties || {})[firstKey]) {
                        return "/properties/" + this.escape(firstKey) +
                            this.toSchemaPointer(pointerArray, schema.properties[firstKey]);
                    }
                    else if (schema.additionalProperties) {
                        return '/additionalProperties' +
                            this.toSchemaPointer(pointerArray, schema.additionalProperties);
                    }
                }
                if ((schema.type === 'array' || schema.items) &&
                    (isNumber(firstKey) || firstKey === '-' || firstKey === '')) {
                    var arrayItem = firstKey === '-' || firstKey === '' ? 0 : +firstKey;
                    if (isArray(schema.items)) {
                        if (arrayItem < schema.items.length) {
                            return '/items/' + arrayItem +
                                this.toSchemaPointer(pointerArray, schema.items[arrayItem]);
                        }
                        else if (schema.additionalItems) {
                            return '/additionalItems' +
                                this.toSchemaPointer(pointerArray, schema.additionalItems);
                        }
                    }
                    else if (isObject(schema.items)) {
                        return '/items' + this.toSchemaPointer(pointerArray, schema.items);
                    }
                    else if (isObject(schema.additionalItems)) {
                        return '/additionalItems' +
                            this.toSchemaPointer(pointerArray, schema.additionalItems);
                    }
                }
                console.error("toSchemaPointer error: Data pointer " + dataPointer + " " +
                    ("not compatible with schema " + schema));
                return null;
            }
            if (!this.isJsonPointer(dataPointer)) {
                console.error("toSchemaPointer error: Invalid JSON Pointer: " + dataPointer);
            }
            if (typeof schema !== 'object') {
                console.error("toSchemaPointer error: Invalid JSON Schema: " + schema);
            }
            return null;
        };
        /**
           * 'toDataPointer' function
           *
           * Accepts a JSON Pointer to a sub-schema inside a JSON schema and the schema.
           *
           * If possible, returns a generic Pointer to the corresponding value inside
           * the data object described by the JSON schema.
           *
           * Returns null if the sub-schema is in an ambiguous location (such as
           * definitions or additionalProperties) where the corresponding value
           * location cannot be determined.
           *
           * @param  { Pointer } schemaPointer - JSON Pointer (string or array) to a JSON schema
           * @param  { any } schema - the JSON schema
           * @param  { boolean = false } errors - Show errors?
           * @return { Pointer } - JSON Pointer (string) to the value in the data object
           */
        JsonPointer.toDataPointer = function (schemaPointer, schema, errors) {
            if (errors === void 0) {
                errors = false;
            }
            if (this.isJsonPointer(schemaPointer) && typeof schema === 'object' &&
                this.has(schema, schemaPointer)) {
                var pointerArray = this.parse(schemaPointer);
                if (!pointerArray.length) {
                    return '';
                }
                var firstKey = pointerArray.shift();
                if (firstKey === 'properties' ||
                    (firstKey === 'items' && isArray(schema.items))) {
                    var secondKey = pointerArray.shift();
                    var pointerSuffix = this.toDataPointer(pointerArray, schema[firstKey][secondKey]);
                    return pointerSuffix === null ? null : '/' + secondKey + pointerSuffix;
                }
                else if (firstKey === 'additionalItems' ||
                    (firstKey === 'items' && isObject(schema.items))) {
                    var pointerSuffix = this.toDataPointer(pointerArray, schema[firstKey]);
                    return pointerSuffix === null ? null : '/-' + pointerSuffix;
                }
                else if (['allOf', 'anyOf', 'oneOf'].includes(firstKey)) {
                    var secondKey = pointerArray.shift();
                    return this.toDataPointer(pointerArray, schema[firstKey][secondKey]);
                }
                else if (firstKey === 'not') {
                    return this.toDataPointer(pointerArray, schema[firstKey]);
                }
                else if (['contains', 'definitions', 'dependencies', 'additionalItems',
                    'additionalProperties', 'patternProperties', 'propertyNames'].includes(firstKey)) {
                    if (errors) {
                        console.error("toDataPointer error: Ambiguous location");
                    }
                }
                return '';
            }
            if (errors) {
                if (!this.isJsonPointer(schemaPointer)) {
                    console.error("toDataPointer error: Invalid JSON Pointer: " + schemaPointer);
                }
                if (typeof schema !== 'object') {
                    console.error("toDataPointer error: Invalid JSON Schema: " + schema);
                }
                if (typeof schema !== 'object') {
                    console.error("toDataPointer error: Pointer " + schemaPointer + " invalid for Schema: " + schema);
                }
            }
            return null;
        };
        /**
           * 'parseObjectPath' function
           *
           * Parses a JavaScript object path into an array of keys, which
           * can then be passed to compile() to convert into a string JSON Pointer.
           *
           * Based on mike-marcacci's excellent objectpath parse function:
           * https://github.com/mike-marcacci/objectpath
           *
           * @param  { Pointer } path - The object path to parse
           * @return { string[] } - The resulting array of keys
           */
        JsonPointer.parseObjectPath = function (path) {
            if (isArray(path)) {
                return path;
            }
            if (this.isJsonPointer(path)) {
                return this.parse(path);
            }
            if (typeof path === 'string') {
                var index = 0;
                var parts = [];
                while (index < path.length) {
                    var nextDot = path.indexOf('.', index);
                    var nextOB = path.indexOf('[', index); // next open bracket
                    if (nextDot === -1 && nextOB === -1) {
                        // last item
                        parts.push(path.slice(index));
                        index = path.length;
                    }
                    else if (nextDot !== -1 && (nextDot < nextOB || nextOB === -1)) {
                        // dot notation
                        parts.push(path.slice(index, nextDot));
                        index = nextDot + 1;
                    }
                    else {
                        // bracket notation
                        if (nextOB > index) {
                            parts.push(path.slice(index, nextOB));
                            index = nextOB;
                        }
                        var quote = path.charAt(nextOB + 1);
                        if (quote === '"' || quote === '\'') {
                            // enclosing quotes
                            var nextCB = path.indexOf(quote + ']', nextOB); // next close bracket
                            while (nextCB !== -1 && path.charAt(nextCB - 1) === '\\') {
                                nextCB = path.indexOf(quote + ']', nextCB + 2);
                            }
                            if (nextCB === -1) {
                                nextCB = path.length;
                            }
                            parts.push(path.slice(index + 2, nextCB)
                                .replace(new RegExp('\\' + quote, 'g'), quote));
                            index = nextCB + 2;
                        }
                        else {
                            // no enclosing quotes
                            var nextCB = path.indexOf(']', nextOB); // next close bracket
                            if (nextCB === -1) {
                                nextCB = path.length;
                            }
                            parts.push(path.slice(index + 1, nextCB));
                            index = nextCB + 1;
                        }
                        if (path.charAt(index) === '.') {
                            index++;
                        }
                    }
                }
                return parts;
            }
            console.error('parseObjectPath error: Input object path must be a string.');
        };
        return JsonPointer;
    }());
    JsonPointer.decorators = [
        { type: core.Injectable },
    ];
    /**
     * 'mergeSchemas' function
     *
     * Merges multiple JSON schemas into a single schema with combined rules.
     *
     * If able to logically merge properties from all schemas,
     * returns a single schema object containing all merged properties.
     *
     * Example: ({ a: b, max: 1 }, { c: d, max: 2 }) => { a: b, c: d, max: 1 }
     *
     * If unable to logically merge, returns an allOf schema object containing
     * an array of the original schemas;
     *
     * Example: ({ a: b }, { a: d }) => { allOf: [ { a: b }, { a: d } ] }
     *
     * @param  { any } schemas - one or more input schemas
     * @return { any } - merged schema
     */
    function mergeSchemas() {
        var schemas = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            schemas[_i] = arguments[_i];
        }
        schemas = schemas.filter(function (schema) { return !isEmpty(schema); });
        if (schemas.some(function (schema) { return !isObject(schema); })) {
            return null;
        }
        var combinedSchema = {};
        try {
            for (var schemas_1 = tslib.__values(schemas), schemas_1_1 = schemas_1.next(); !schemas_1_1.done; schemas_1_1 = schemas_1.next()) {
                var schema = schemas_1_1.value;
                var _loop_1 = function (key) {
                    var combinedValue = combinedSchema[key];
                    var schemaValue = schema[key];
                    if (!hasOwn(combinedSchema, key) || lodash.isEqual(combinedValue, schemaValue)) {
                        combinedSchema[key] = schemaValue;
                    }
                    else {
                        switch (key) {
                            case 'allOf':
                                // Combine all items from both arrays
                                if (isArray(combinedValue) && isArray(schemaValue)) {
                                    combinedSchema.allOf = mergeSchemas.apply(void 0, tslib.__spread(combinedValue, schemaValue));
                                }
                                else {
                                    return { value: { allOf: tslib.__spread(schemas) } };
                                }
                                break;
                            case 'additionalItems':
                            case 'additionalProperties':
                            case 'contains':
                            case 'propertyNames':
                                // Merge schema objects
                                if (isObject(combinedValue) && isObject(schemaValue)) {
                                    combinedSchema[key] = mergeSchemas(combinedValue, schemaValue);
                                    // additionalProperties == false in any schema overrides all other values
                                }
                                else if (key === 'additionalProperties' &&
                                    (combinedValue === false || schemaValue === false)) {
                                    combinedSchema.combinedSchema = false;
                                }
                                else {
                                    return { value: { allOf: tslib.__spread(schemas) } };
                                }
                                break;
                            case 'anyOf':
                            case 'oneOf':
                            case 'enum':
                                // Keep only items that appear in both arrays
                                if (isArray(combinedValue) && isArray(schemaValue)) {
                                    combinedSchema[key] = combinedValue.filter(function (item1) { return schemaValue.findIndex(function (item2) { return lodash.isEqual(item1, item2); }) > -1; });
                                    if (!combinedSchema[key].length) {
                                        return { value: { allOf: tslib.__spread(schemas) } };
                                    }
                                }
                                else {
                                    return { value: { allOf: tslib.__spread(schemas) } };
                                }
                                break;
                            case 'definitions':
                                // Combine keys from both objects
                                if (isObject(combinedValue) && isObject(schemaValue)) {
                                    var combinedObject = Object.assign({}, combinedValue);
                                    try {
                                        for (var _a = tslib.__values(Object.keys(schemaValue)), _b = _a.next(); !_b.done; _b = _a.next()) {
                                            var subKey = _b.value;
                                            if (!hasOwn(combinedObject, subKey) ||
                                                lodash.isEqual(combinedObject[subKey], schemaValue[subKey])) {
                                                combinedObject[subKey] = schemaValue[subKey];
                                                // Don't combine matching keys with different values
                                            }
                                            else {
                                                return { value: { allOf: tslib.__spread(schemas) } };
                                            }
                                        }
                                    }
                                    catch (e_1_1) {
                                        e_1 = { error: e_1_1 };
                                    }
                                    finally {
                                        try {
                                            if (_b && !_b.done && (_c = _a.return))
                                                _c.call(_a);
                                        }
                                        finally {
                                            if (e_1)
                                                throw e_1.error;
                                        }
                                    }
                                    combinedSchema.definitions = combinedObject;
                                }
                                else {
                                    return { value: { allOf: tslib.__spread(schemas) } };
                                }
                                break;
                            case 'dependencies':
                                // Combine all keys from both objects
                                // and merge schemas on matching keys,
                                // converting from arrays to objects if necessary
                                if (isObject(combinedValue) && isObject(schemaValue)) {
                                    var combinedObject = Object.assign({}, combinedValue);
                                    try {
                                        for (var _d = tslib.__values(Object.keys(schemaValue)), _e = _d.next(); !_e.done; _e = _d.next()) {
                                            var subKey = _e.value;
                                            if (!hasOwn(combinedObject, subKey) ||
                                                lodash.isEqual(combinedObject[subKey], schemaValue[subKey])) {
                                                combinedObject[subKey] = schemaValue[subKey];
                                                // If both keys are arrays, include all items from both arrays,
                                                // excluding duplicates
                                            }
                                            else if (isArray(schemaValue[subKey]) && isArray(combinedObject[subKey])) {
                                                combinedObject[subKey] = uniqueItems.apply(void 0, tslib.__spread(combinedObject[subKey], schemaValue[subKey]));
                                                // If either key is an object, merge the schemas
                                            }
                                            else if ((isArray(schemaValue[subKey]) || isObject(schemaValue[subKey])) &&
                                                (isArray(combinedObject[subKey]) || isObject(combinedObject[subKey]))) {
                                                // If either key is an array, convert it to an object first
                                                var required = isArray(combinedSchema.required) ?
                                                    combinedSchema.required : [];
                                                var combinedDependency = isArray(combinedObject[subKey]) ?
                                                    { required: uniqueItems.apply(void 0, tslib.__spread(required, [combinedObject[subKey]])) } :
                                                    combinedObject[subKey];
                                                var schemaDependency = isArray(schemaValue[subKey]) ?
                                                    { required: uniqueItems.apply(void 0, tslib.__spread(required, [schemaValue[subKey]])) } :
                                                    schemaValue[subKey];
                                                combinedObject[subKey] =
                                                    mergeSchemas(combinedDependency, schemaDependency);
                                            }
                                            else {
                                                return { value: { allOf: tslib.__spread(schemas) } };
                                            }
                                        }
                                    }
                                    catch (e_2_1) {
                                        e_2 = { error: e_2_1 };
                                    }
                                    finally {
                                        try {
                                            if (_e && !_e.done && (_f = _d.return))
                                                _f.call(_d);
                                        }
                                        finally {
                                            if (e_2)
                                                throw e_2.error;
                                        }
                                    }
                                    combinedSchema.dependencies = combinedObject;
                                }
                                else {
                                    return { value: { allOf: tslib.__spread(schemas) } };
                                }
                                break;
                            case 'items':
                                // If arrays, keep only items that appear in both arrays
                                if (isArray(combinedValue) && isArray(schemaValue)) {
                                    combinedSchema.items = combinedValue.filter(function (item1) { return schemaValue.findIndex(function (item2) { return lodash.isEqual(item1, item2); }) > -1; });
                                    if (!combinedSchema.items.length) {
                                        return { value: { allOf: tslib.__spread(schemas) } };
                                    }
                                    // If both keys are objects, merge them
                                }
                                else if (isObject(combinedValue) && isObject(schemaValue)) {
                                    combinedSchema.items = mergeSchemas(combinedValue, schemaValue);
                                    // If object + array, combine object with each array item
                                }
                                else if (isArray(combinedValue) && isObject(schemaValue)) {
                                    combinedSchema.items =
                                        combinedValue.map(function (item) { return mergeSchemas(item, schemaValue); });
                                }
                                else if (isObject(combinedValue) && isArray(schemaValue)) {
                                    combinedSchema.items =
                                        schemaValue.map(function (item) { return mergeSchemas(item, combinedValue); });
                                }
                                else {
                                    return { value: { allOf: tslib.__spread(schemas) } };
                                }
                                break;
                            case 'multipleOf':
                                // TODO: Adjust to correctly handle decimal values
                                // If numbers, set to least common multiple
                                if (isNumber(combinedValue) && isNumber(schemaValue)) {
                                    var gcd_1 = function (x, y) { return !y ? x : gcd_1(y, x % y); };
                                    var lcm = function (x, y) { return (x * y) / gcd_1(x, y); };
                                    combinedSchema.multipleOf = lcm(combinedValue, schemaValue);
                                }
                                else {
                                    return { value: { allOf: tslib.__spread(schemas) } };
                                }
                                break;
                            case 'maximum':
                            case 'exclusiveMaximum':
                            case 'maxLength':
                            case 'maxItems':
                            case 'maxProperties':
                                // If numbers, set to lowest value
                                if (isNumber(combinedValue) && isNumber(schemaValue)) {
                                    combinedSchema[key] = Math.min(combinedValue, schemaValue);
                                }
                                else {
                                    return { value: { allOf: tslib.__spread(schemas) } };
                                }
                                break;
                            case 'minimum':
                            case 'exclusiveMinimum':
                            case 'minLength':
                            case 'minItems':
                            case 'minProperties':
                                // If numbers, set to highest value
                                if (isNumber(combinedValue) && isNumber(schemaValue)) {
                                    combinedSchema[key] = Math.max(combinedValue, schemaValue);
                                }
                                else {
                                    return { value: { allOf: tslib.__spread(schemas) } };
                                }
                                break;
                            case 'not':
                                // Combine not values into anyOf array
                                if (isObject(combinedValue) && isObject(schemaValue)) {
                                    var notAnyOf = [combinedValue, schemaValue]
                                        .reduce(function (notAnyOfArray, notSchema) {
                                        return isArray(notSchema.anyOf) &&
                                            Object.keys(notSchema).length === 1 ? tslib.__spread(notAnyOfArray, notSchema.anyOf) : tslib.__spread(notAnyOfArray, [notSchema]);
                                    }, []);
                                    // TODO: Remove duplicate items from array
                                    combinedSchema.not = { anyOf: notAnyOf };
                                }
                                else {
                                    return { value: { allOf: tslib.__spread(schemas) } };
                                }
                                break;
                            case 'patternProperties':
                                // Combine all keys from both objects
                                // and merge schemas on matching keys
                                if (isObject(combinedValue) && isObject(schemaValue)) {
                                    var combinedObject = Object.assign({}, combinedValue);
                                    try {
                                        for (var _g = tslib.__values(Object.keys(schemaValue)), _h = _g.next(); !_h.done; _h = _g.next()) {
                                            var subKey = _h.value;
                                            if (!hasOwn(combinedObject, subKey) ||
                                                lodash.isEqual(combinedObject[subKey], schemaValue[subKey])) {
                                                combinedObject[subKey] = schemaValue[subKey];
                                                // If both keys are objects, merge them
                                            }
                                            else if (isObject(schemaValue[subKey]) && isObject(combinedObject[subKey])) {
                                                combinedObject[subKey] =
                                                    mergeSchemas(combinedObject[subKey], schemaValue[subKey]);
                                            }
                                            else {
                                                return { value: { allOf: tslib.__spread(schemas) } };
                                            }
                                        }
                                    }
                                    catch (e_3_1) {
                                        e_3 = { error: e_3_1 };
                                    }
                                    finally {
                                        try {
                                            if (_h && !_h.done && (_j = _g.return))
                                                _j.call(_g);
                                        }
                                        finally {
                                            if (e_3)
                                                throw e_3.error;
                                        }
                                    }
                                    combinedSchema.patternProperties = combinedObject;
                                }
                                else {
                                    return { value: { allOf: tslib.__spread(schemas) } };
                                }
                                break;
                            case 'properties':
                                // Combine all keys from both objects
                                // unless additionalProperties === false
                                // and merge schemas on matching keys
                                if (isObject(combinedValue) && isObject(schemaValue)) {
                                    var combinedObject_1 = Object.assign({}, combinedValue);
                                    // If new schema has additionalProperties,
                                    // merge or remove non-matching property keys in combined schema
                                    if (hasOwn(schemaValue, 'additionalProperties')) {
                                        Object.keys(combinedValue)
                                            .filter(function (combinedKey) { return !Object.keys(schemaValue).includes(combinedKey); })
                                            .forEach(function (nonMatchingKey) {
                                            if (schemaValue.additionalProperties === false) {
                                                delete combinedObject_1[nonMatchingKey];
                                            }
                                            else if (isObject(schemaValue.additionalProperties)) {
                                                combinedObject_1[nonMatchingKey] = mergeSchemas(combinedObject_1[nonMatchingKey], schemaValue.additionalProperties);
                                            }
                                        });
                                    }
                                    try {
                                        for (var _k = tslib.__values(Object.keys(schemaValue)), _l = _k.next(); !_l.done; _l = _k.next()) {
                                            var subKey = _l.value;
                                            if (lodash.isEqual(combinedObject_1[subKey], schemaValue[subKey]) || (!hasOwn(combinedObject_1, subKey) &&
                                                !hasOwn(combinedObject_1, 'additionalProperties'))) {
                                                combinedObject_1[subKey] = schemaValue[subKey];
                                                // If combined schema has additionalProperties,
                                                // merge or ignore non-matching property keys in new schema
                                            }
                                            else if (!hasOwn(combinedObject_1, subKey) &&
                                                hasOwn(combinedObject_1, 'additionalProperties')) {
                                                // If combinedObject.additionalProperties === false,
                                                // do nothing (don't set key)
                                                // If additionalProperties is object, merge with new key
                                                if (isObject(combinedObject_1.additionalProperties)) {
                                                    combinedObject_1[subKey] = mergeSchemas(combinedObject_1.additionalProperties, schemaValue[subKey]);
                                                }
                                                // If both keys are objects, merge them
                                            }
                                            else if (isObject(schemaValue[subKey]) &&
                                                isObject(combinedObject_1[subKey])) {
                                                combinedObject_1[subKey] =
                                                    mergeSchemas(combinedObject_1[subKey], schemaValue[subKey]);
                                            }
                                            else {
                                                return { value: { allOf: tslib.__spread(schemas) } };
                                            }
                                        }
                                    }
                                    catch (e_4_1) {
                                        e_4 = { error: e_4_1 };
                                    }
                                    finally {
                                        try {
                                            if (_l && !_l.done && (_m = _k.return))
                                                _m.call(_k);
                                        }
                                        finally {
                                            if (e_4)
                                                throw e_4.error;
                                        }
                                    }
                                    combinedSchema.properties = combinedObject_1;
                                }
                                else {
                                    return { value: { allOf: tslib.__spread(schemas) } };
                                }
                                break;
                            case 'required':
                                // If arrays, include all items from both arrays, excluding duplicates
                                if (isArray(combinedValue) && isArray(schemaValue)) {
                                    combinedSchema.required = uniqueItems.apply(void 0, tslib.__spread(combinedValue, schemaValue));
                                    // If booleans, aet true if either true
                                }
                                else if (typeof schemaValue === 'boolean' &&
                                    typeof combinedValue === 'boolean') {
                                    combinedSchema.required = !!combinedValue || !!schemaValue;
                                }
                                else {
                                    return { value: { allOf: tslib.__spread(schemas) } };
                                }
                                break;
                            case '$schema':
                            case '$id':
                            case 'id':
                                // Don't combine these keys
                                break;
                            case 'title':
                            case 'description':
                                // Return the last value, overwriting any previous one
                                // These properties are not used for validation, so conflicts don't matter
                                combinedSchema[key] = schemaValue;
                                break;
                            case 'type':
                                if ((isArray(schemaValue) || isString(schemaValue)) &&
                                    (isArray(combinedValue) || isString(combinedValue))) {
                                    var combinedTypes = commonItems(combinedValue, schemaValue);
                                    if (!combinedTypes.length) {
                                        return { value: { allOf: tslib.__spread(schemas) } };
                                    }
                                    combinedSchema.type = combinedTypes.length > 1 ? combinedTypes : combinedTypes[0];
                                }
                                else {
                                    return { value: { allOf: tslib.__spread(schemas) } };
                                }
                                break;
                            case 'uniqueItems':
                                // Set true if either true
                                combinedSchema.uniqueItems = !!combinedValue || !!schemaValue;
                                break;
                            default: return { value: { allOf: tslib.__spread(schemas) } };
                        }
                    }
                    var e_1, _c, e_2, _f, e_3, _j, e_4, _m;
                };
                try {
                    for (var _a = tslib.__values(Object.keys(schema)), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var key = _b.value;
                        var state_1 = _loop_1(key);
                        if (typeof state_1 === "object")
                            return state_1.value;
                    }
                }
                catch (e_5_1) {
                    e_5 = { error: e_5_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_5)
                            throw e_5.error;
                    }
                }
            }
        }
        catch (e_6_1) {
            e_6 = { error: e_6_1 };
        }
        finally {
            try {
                if (schemas_1_1 && !schemas_1_1.done && (_d = schemas_1.return))
                    _d.call(schemas_1);
            }
            finally {
                if (e_6)
                    throw e_6.error;
            }
        }
        return combinedSchema;
        var e_6, _d, e_5, _c;
    }
    /**
     * JSON Schema function library:
     *
     * buildSchemaFromLayout:   TODO: Write this function
     *
     * buildSchemaFromData:
     *
     * getFromSchema:
     *
     * removeRecursiveReferences:
     *
     * getInputType:
     *
     * checkInlineType:
     *
     * isInputRequired:
     *
     * updateInputOptions:
     *
     * getTitleMapFromOneOf:
     *
     * getControlValidators:
     *
     * resolveSchemaReferences:
     *
     * getSubSchema:
     *
     * combineAllOf:
     *
     * fixRequiredArrayProperties:
     */
    /**
     * 'buildSchemaFromLayout' function
     *
     * TODO: Build a JSON Schema from a JSON Form layout
     *
     * @param  { any[] } layout - The JSON Form layout
     * @return { any } - The new JSON Schema
     */
    function buildSchemaFromLayout(layout) {
        return;
        // let newSchema: any = { };
        // const walkLayout = (layoutItems: any[], callback: Function): any[] => {
        //   let returnArray: any[] = [];
        //   for (let layoutItem of layoutItems) {
        //     const returnItem: any = callback(layoutItem);
        //     if (returnItem) { returnArray = returnArray.concat(callback(layoutItem)); }
        //     if (layoutItem.items) {
        //       returnArray = returnArray.concat(walkLayout(layoutItem.items, callback));
        //     }
        //   }
        //   return returnArray;
        // };
        // walkLayout(layout, layoutItem => {
        //   let itemKey: string;
        //   if (typeof layoutItem === 'string') {
        //     itemKey = layoutItem;
        //   } else if (layoutItem.key) {
        //     itemKey = layoutItem.key;
        //   }
        //   if (!itemKey) { return; }
        //   //
        // });
    }
    /**
     * 'buildSchemaFromData' function
     *
     * Build a JSON Schema from a data object
     *
     * @param  { any } data - The data object
     * @param  { boolean = false } requireAllFields - Require all fields?
     * @param  { boolean = true } isRoot - is root
     * @return { any } - The new JSON Schema
     */
    function buildSchemaFromData(data, requireAllFields, isRoot) {
        if (requireAllFields === void 0) {
            requireAllFields = false;
        }
        if (isRoot === void 0) {
            isRoot = true;
        }
        var newSchema = {};
        var getFieldType = function (value) {
            var fieldType = getType(value, 'strict');
            return { integer: 'number', null: 'string' }[fieldType] || fieldType;
        };
        var buildSubSchema = function (value) { return buildSchemaFromData(value, requireAllFields, false); };
        if (isRoot) {
            newSchema.$schema = 'http://json-schema.org/draft-06/schema#';
        }
        newSchema.type = getFieldType(data);
        if (newSchema.type === 'object') {
            newSchema.properties = {};
            if (requireAllFields) {
                newSchema.required = [];
            }
            try {
                for (var _a = tslib.__values(Object.keys(data)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var key = _b.value;
                    newSchema.properties[key] = buildSubSchema(data[key]);
                    if (requireAllFields) {
                        newSchema.required.push(key);
                    }
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return))
                        _c.call(_a);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
            }
        }
        else if (newSchema.type === 'array') {
            newSchema.items = data.map(buildSubSchema);
            // If all items are the same type, use an object for items instead of an array
            if ((new Set(data.map(getFieldType))).size === 1) {
                newSchema.items = newSchema.items.reduce(function (a, b) { return (Object.assign({}, a, b)); }, {});
            }
            if (requireAllFields) {
                newSchema.minItems = 1;
            }
        }
        return newSchema;
        var e_1, _c;
    }
    /**
     * 'getFromSchema' function
     *
     * Uses a JSON Pointer for a value within a data object to retrieve
     * the schema for that value within schema for the data object.
     *
     * The optional third parameter can also be set to return something else:
     * 'schema' (default): the schema for the value indicated by the data pointer
     * 'parentSchema': the schema for the value's parent object or array
     * 'schemaPointer': a pointer to the value's schema within the object's schema
     * 'parentSchemaPointer': a pointer to the schema for the value's parent object or array
     *
     * @param  { any } schema - The schema to get the sub-schema from
     * @param  { Pointer } dataPointer - JSON Pointer (string or array)
     * @param  { string = 'schema' } returnType - what to return?
     * @return { any } - The located sub-schema
     */
    function getFromSchema(schema, dataPointer, returnType) {
        if (returnType === void 0) {
            returnType = 'schema';
        }
        var dataPointerArray = JsonPointer.parse(dataPointer);
        if (dataPointerArray === null) {
            console.error("getFromSchema error: Invalid JSON Pointer: " + dataPointer);
            return null;
        }
        var subSchema = schema;
        var schemaPointer = [];
        var length = dataPointerArray.length;
        if (returnType.slice(0, 6) === 'parent') {
            dataPointerArray.length--;
        }
        for (var i = 0; i < length; ++i) {
            var key = dataPointerArray[i];
            var subSchemaFound = false;
            if (typeof subSchema !== 'object') {
                console.error("getFromSchema error: Unable to find \"" + key + "\" key in schema.");
                console.error(schema);
                console.error(dataPointer);
                return null;
            }
            if (subSchema.type === 'array' && (!isNaN(key) || key === '-')) {
                if (hasOwn(subSchema, 'items')) {
                    if (isObject(subSchema.items)) {
                        subSchemaFound = true;
                        subSchema = subSchema.items;
                        schemaPointer.push('items');
                    }
                    else if (isArray(subSchema.items)) {
                        if (!isNaN(key) && subSchema.items.length >= +key) {
                            subSchemaFound = true;
                            subSchema = subSchema.items[+key];
                            schemaPointer.push('items', key);
                        }
                    }
                }
                if (!subSchemaFound && isObject(subSchema.additionalItems)) {
                    subSchemaFound = true;
                    subSchema = subSchema.additionalItems;
                    schemaPointer.push('additionalItems');
                }
                else if (subSchema.additionalItems !== false) {
                    subSchemaFound = true;
                    subSchema = {};
                    schemaPointer.push('additionalItems');
                }
            }
            else if (subSchema.type === 'object') {
                if (isObject(subSchema.properties) && hasOwn(subSchema.properties, key)) {
                    subSchemaFound = true;
                    subSchema = subSchema.properties[key];
                    schemaPointer.push('properties', key);
                }
                else if (isObject(subSchema.additionalProperties)) {
                    subSchemaFound = true;
                    subSchema = subSchema.additionalProperties;
                    schemaPointer.push('additionalProperties');
                }
                else if (subSchema.additionalProperties !== false) {
                    subSchemaFound = true;
                    subSchema = {};
                    schemaPointer.push('additionalProperties');
                }
            }
            if (!subSchemaFound) {
                console.error("getFromSchema error: Unable to find \"" + key + "\" item in schema.");
                console.error(schema);
                console.error(dataPointer);
                return;
            }
        }
        return returnType.slice(-7) === 'Pointer' ? schemaPointer : subSchema;
    }
    /**
     * 'removeRecursiveReferences' function
     *
     * Checks a JSON Pointer against a map of recursive references and returns
     * a JSON Pointer to the shallowest equivalent location in the same object.
     *
     * Using this functions enables an object to be constructed with unlimited
     * recursion, while maintaing a fixed set of metadata, such as field data types.
     * The object can grow as large as it wants, and deeply recursed nodes can
     * just refer to the metadata for their shallow equivalents, instead of having
     * to add additional redundant metadata for each recursively added node.
     *
     * Example:
     *
     * pointer:         '/stuff/and/more/and/more/and/more/and/more/stuff'
     * recursiveRefMap: [['/stuff/and/more/and/more', '/stuff/and/more/']]
     * returned:        '/stuff/and/more/stuff'
     *
     * @param  { Pointer } pointer -
     * @param  { Map<string, string> } recursiveRefMap -
     * @param  { Map<string, number> = new Map() } arrayMap - optional
     * @return { string } -
     */
    function removeRecursiveReferences(pointer, recursiveRefMap, arrayMap) {
        if (arrayMap === void 0) {
            arrayMap = new Map();
        }
        if (!pointer) {
            return '';
        }
        var genericPointer = JsonPointer.toGenericPointer(JsonPointer.compile(pointer), arrayMap);
        if (genericPointer.indexOf('/') === -1) {
            return genericPointer;
        }
        var possibleReferences = true;
        while (possibleReferences) {
            possibleReferences = false;
            recursiveRefMap.forEach(function (toPointer, fromPointer) {
                if (JsonPointer.isSubPointer(toPointer, fromPointer)) {
                    while (JsonPointer.isSubPointer(fromPointer, genericPointer, true)) {
                        genericPointer = JsonPointer.toGenericPointer(toPointer + genericPointer.slice(fromPointer.length), arrayMap);
                        possibleReferences = true;
                    }
                }
            });
        }
        return genericPointer;
    }
    /**
     * 'getInputType' function
     *
     * @param  { any } schema
     * @param  { any = null } layoutNode
     * @return { string }
     */
    function getInputType(schema, layoutNode) {
        if (layoutNode === void 0) {
            layoutNode = null;
        }
        // x-schema-form = Angular Schema Form compatibility
        // widget & component = React Jsonschema Form compatibility
        var controlType = JsonPointer.getFirst([
            [schema, '/x-schema-form/type'],
            [schema, '/x-schema-form/widget/component'],
            [schema, '/x-schema-form/widget'],
            [schema, '/widget/component'],
            [schema, '/widget']
        ]);
        if (isString(controlType)) {
            return checkInlineType(controlType, schema, layoutNode);
        }
        var schemaType = schema.type;
        if (schemaType) {
            if (isArray(schemaType)) {
                // If multiple types listed, use most inclusive type
                schemaType =
                    inArray('object', schemaType) && hasOwn(schema, 'properties') ? 'object' :
                        inArray('array', schemaType) && hasOwn(schema, 'items') ? 'array' :
                            inArray('array', schemaType) && hasOwn(schema, 'additionalItems') ? 'array' :
                                inArray('string', schemaType) ? 'string' :
                                    inArray('number', schemaType) ? 'number' :
                                        inArray('integer', schemaType) ? 'integer' :
                                            inArray('boolean', schemaType) ? 'boolean' : 'unknown';
            }
            if (schemaType === 'boolean') {
                return 'checkbox';
            }
            if (schemaType === 'object') {
                if (hasOwn(schema, 'properties') || hasOwn(schema, 'additionalProperties')) {
                    return 'section';
                }
                // TODO: Figure out how to handle additionalProperties
                if (hasOwn(schema, '$ref')) {
                    return '$ref';
                }
            }
            if (schemaType === 'array') {
                var itemsObject = JsonPointer.getFirst([
                    [schema, '/items'],
                    [schema, '/additionalItems']
                ]) || {};
                return hasOwn(itemsObject, 'enum') && schema.maxItems !== 1 ?
                    checkInlineType('checkboxes', schema, layoutNode) : 'array';
            }
            if (schemaType === 'null') {
                return 'none';
            }
            if (JsonPointer.has(layoutNode, '/options/titleMap') ||
                hasOwn(schema, 'enum') || getTitleMapFromOneOf(schema, null, true)) {
                return 'select';
            }
            if (schemaType === 'number' || schemaType === 'integer') {
                return (schemaType === 'integer' || hasOwn(schema, 'multipleOf')) &&
                    hasOwn(schema, 'maximum') && hasOwn(schema, 'minimum') ? 'range' : schemaType;
            }
            if (schemaType === 'string') {
                return {
                    'color': 'color',
                    'date': 'date',
                    'date-time': 'datetime-local',
                    'email': 'email',
                    'uri': 'url',
                }[schema.format] || 'text';
            }
        }
        if (hasOwn(schema, '$ref')) {
            return '$ref';
        }
        if (isArray(schema.oneOf) || isArray(schema.anyOf)) {
            return 'one-of';
        }
        console.error("getInputType error: Unable to determine input type for " + schemaType);
        console.error('schema', schema);
        if (layoutNode) {
            console.error('layoutNode', layoutNode);
        }
        return 'none';
    }
    /**
     * 'checkInlineType' function
     *
     * Checks layout and schema nodes for 'inline: true', and converts
     * 'radios' or 'checkboxes' to 'radios-inline' or 'checkboxes-inline'
     *
     * @param  { string } controlType -
     * @param  { any } schema -
     * @param  { any = null } layoutNode -
     * @return { string }
     */
    function checkInlineType(controlType, schema, layoutNode) {
        if (layoutNode === void 0) {
            layoutNode = null;
        }
        if (!isString(controlType) || (controlType.slice(0, 8) !== 'checkbox' && controlType.slice(0, 5) !== 'radio')) {
            return controlType;
        }
        if (JsonPointer.getFirst([
            [layoutNode, '/inline'],
            [layoutNode, '/options/inline'],
            [schema, '/inline'],
            [schema, '/x-schema-form/inline'],
            [schema, '/x-schema-form/options/inline'],
            [schema, '/x-schema-form/widget/inline'],
            [schema, '/x-schema-form/widget/component/inline'],
            [schema, '/x-schema-form/widget/component/options/inline'],
            [schema, '/widget/inline'],
            [schema, '/widget/component/inline'],
            [schema, '/widget/component/options/inline'],
        ]) === true) {
            return controlType.slice(0, 5) === 'radio' ?
                'radios-inline' : 'checkboxes-inline';
        }
        else {
            return controlType;
        }
    }
    /**
     * 'isInputRequired' function
     *
     * Checks a JSON Schema to see if an item is required
     *
     * @param  { any } schema - the schema to check
     * @param  { string } schemaPointer - the pointer to the item to check
     * @return { boolean } - true if the item is required, false if not
     */
    function isInputRequired(schema, schemaPointer) {
        if (!isObject(schema)) {
            console.error('isInputRequired error: Input schema must be an object.');
            return false;
        }
        var listPointerArray = JsonPointer.parse(schemaPointer);
        if (isArray(listPointerArray)) {
            if (!listPointerArray.length) {
                return schema.required === true;
            }
            var keyName = listPointerArray.pop();
            var nextToLastKey = listPointerArray[listPointerArray.length - 1];
            if (['properties', 'additionalProperties', 'patternProperties', 'items', 'additionalItems']
                .includes(nextToLastKey)) {
                listPointerArray.pop();
            }
            var parentSchema = JsonPointer.get(schema, listPointerArray) || {};
            if (isArray(parentSchema.required)) {
                return parentSchema.required.includes(keyName);
            }
            if (parentSchema.type === 'array') {
                return hasOwn(parentSchema, 'minItems') &&
                    isNumber(keyName) &&
                    +parentSchema.minItems > +keyName;
            }
        }
        return false;
    }
    /**
     * 'updateInputOptions' function
     *
     * @param  { any } layoutNode
     * @param  { any } schema
     * @param  { any } jsf
     * @return { void }
     */
    function updateInputOptions(layoutNode, schema, jsf) {
        if (!isObject(layoutNode) || !isObject(layoutNode.options)) {
            return;
        }
        // Set all option values in layoutNode.options
        var newOptions = {};
        var fixUiKeys = function (key) { return key.slice(0, 3).toLowerCase() === 'ui:' ? key.slice(3) : key; };
        mergeFilteredObject(newOptions, jsf.formOptions.defautWidgetOptions, [], fixUiKeys);
        [[JsonPointer.get(schema, '/ui:widget/options'), []],
            [JsonPointer.get(schema, '/ui:widget'), []],
            [schema, [
                    'additionalProperties', 'additionalItems', 'properties', 'items',
                    'required', 'type', 'x-schema-form', '$ref'
                ]],
            [JsonPointer.get(schema, '/x-schema-form/options'), []],
            [JsonPointer.get(schema, '/x-schema-form'), ['items', 'options']],
            [layoutNode, [
                    '_id', '$ref', 'arrayItem', 'arrayItemType', 'dataPointer', 'dataType',
                    'items', 'key', 'name', 'options', 'recursiveReference', 'type', 'widget'
                ]],
            [layoutNode.options, []],
        ].forEach(function (_a) {
            var _b = tslib.__read(_a, 2), object = _b[0], excludeKeys = _b[1];
            return mergeFilteredObject(newOptions, object, excludeKeys, fixUiKeys);
        });
        if (!hasOwn(newOptions, 'titleMap')) {
            var newTitleMap = null;
            newTitleMap = getTitleMapFromOneOf(schema, newOptions.flatList);
            if (newTitleMap) {
                newOptions.titleMap = newTitleMap;
            }
            if (!hasOwn(newOptions, 'titleMap') && !hasOwn(newOptions, 'enum') && hasOwn(schema, 'items')) {
                if (JsonPointer.has(schema, '/items/titleMap')) {
                    newOptions.titleMap = schema.items.titleMap;
                }
                else if (JsonPointer.has(schema, '/items/enum')) {
                    newOptions.enum = schema.items.enum;
                    if (!hasOwn(newOptions, 'enumNames') && JsonPointer.has(schema, '/items/enumNames')) {
                        newOptions.enumNames = schema.items.enumNames;
                    }
                }
                else if (JsonPointer.has(schema, '/items/oneOf')) {
                    newTitleMap = getTitleMapFromOneOf(schema.items, newOptions.flatList);
                    if (newTitleMap) {
                        newOptions.titleMap = newTitleMap;
                    }
                }
            }
        }
        // If schema type is integer, enforce by setting multipleOf = 1
        if (schema.type === 'integer' && !hasValue(newOptions.multipleOf)) {
            newOptions.multipleOf = 1;
        }
        // Copy any typeahead word lists to options.typeahead.source
        if (JsonPointer.has(newOptions, '/autocomplete/source')) {
            newOptions.typeahead = newOptions.autocomplete;
        }
        else if (JsonPointer.has(newOptions, '/tagsinput/source')) {
            newOptions.typeahead = newOptions.tagsinput;
        }
        else if (JsonPointer.has(newOptions, '/tagsinput/typeahead/source')) {
            newOptions.typeahead = newOptions.tagsinput.typeahead;
        }
        layoutNode.options = newOptions;
    }
    /**
     * 'getTitleMapFromOneOf' function
     *
     * @param  { schema } schema
     * @param  { boolean = null } flatList
     * @param  { boolean = false } validateOnly
     * @return { validators }
     */
    function getTitleMapFromOneOf(schema, flatList, validateOnly) {
        if (schema === void 0) {
            schema = {};
        }
        if (flatList === void 0) {
            flatList = null;
        }
        if (validateOnly === void 0) {
            validateOnly = false;
        }
        var titleMap = null;
        var oneOf = schema.oneOf || schema.anyOf || null;
        if (isArray(oneOf) && oneOf.every(function (item) { return item.title; })) {
            if (oneOf.every(function (item) { return isArray(item.enum) && item.enum.length === 1; })) {
                if (validateOnly) {
                    return true;
                }
                titleMap = oneOf.map(function (item) { return ({ name: item.title, value: item.enum[0] }); });
            }
            else if (oneOf.every(function (item) { return item.const; })) {
                if (validateOnly) {
                    return true;
                }
                titleMap = oneOf.map(function (item) { return ({ name: item.title, value: item.const }); });
            }
            // if flatList !== false and some items have colons, make grouped map
            if (flatList !== false && (titleMap || [])
                .filter(function (title) { return ((title || {}).name || '').indexOf(': '); }).length > 1) {
                // Split name on first colon to create grouped map (name -> group: name)
                var newTitleMap_1 = titleMap.map(function (title) {
                    var _a = tslib.__read(title.name.split(/: (.+)/), 2), group = _a[0], name = _a[1];
                    return group && name ? Object.assign({}, title, { group: group, name: name }) : title;
                });
                // If flatList === true or at least one group has multiple items, use grouped map
                if (flatList === true || newTitleMap_1.some(function (title, index) {
                    return index &&
                        hasOwn(title, 'group') && title.group === newTitleMap_1[index - 1].group;
                })) {
                    titleMap = newTitleMap_1;
                }
            }
        }
        return validateOnly ? false : titleMap;
    }
    /**
     * 'getControlValidators' function
     *
     * @param { any } schema
     * @return { validators }
     */
    function getControlValidators(schema) {
        if (!isObject(schema)) {
            return null;
        }
        var validators = {};
        if (hasOwn(schema, 'type')) {
            switch (schema.type) {
                case 'string':
                    forEach(['pattern', 'format', 'minLength', 'maxLength'], function (prop) {
                        if (hasOwn(schema, prop)) {
                            validators[prop] = [schema[prop]];
                        }
                    });
                    break;
                case 'number':
                case 'integer':
                    forEach(['Minimum', 'Maximum'], function (ucLimit) {
                        var eLimit = 'exclusive' + ucLimit;
                        var limit = ucLimit.toLowerCase();
                        if (hasOwn(schema, limit)) {
                            var exclusive = hasOwn(schema, eLimit) && schema[eLimit] === true;
                            validators[limit] = [schema[limit], exclusive];
                        }
                    });
                    forEach(['multipleOf', 'type'], function (prop) {
                        if (hasOwn(schema, prop)) {
                            validators[prop] = [schema[prop]];
                        }
                    });
                    break;
                case 'object':
                    forEach(['minProperties', 'maxProperties', 'dependencies'], function (prop) {
                        if (hasOwn(schema, prop)) {
                            validators[prop] = [schema[prop]];
                        }
                    });
                    break;
                case 'array':
                    forEach(['minItems', 'maxItems', 'uniqueItems'], function (prop) {
                        if (hasOwn(schema, prop)) {
                            validators[prop] = [schema[prop]];
                        }
                    });
                    break;
            }
        }
        if (hasOwn(schema, 'enum')) {
            validators.enum = [schema.enum];
        }
        return validators;
    }
    /**
     * 'resolveSchemaReferences' function
     *
     * Find all $ref links in schema and save links and referenced schemas in
     * schemaRefLibrary, schemaRecursiveRefMap, and dataRecursiveRefMap
     *
     * @param { any } schema
     * @param { any } schemaRefLibrary
     * @param { Map<string, string> } schemaRecursiveRefMap
     * @param { Map<string, string> } dataRecursiveRefMap
     * @param { Map<string, number> } arrayMap
     * @return { any }
     */
    function resolveSchemaReferences(schema, schemaRefLibrary, schemaRecursiveRefMap, dataRecursiveRefMap, arrayMap) {
        if (!isObject(schema)) {
            console.error('resolveSchemaReferences error: schema must be an object.');
            return;
        }
        var refLinks = new Set();
        var refMapSet = new Set();
        var refMap = new Map();
        var recursiveRefMap = new Map();
        var refLibrary = {};
        // Search schema for all $ref links, and build full refLibrary
        JsonPointer.forEachDeep(schema, function (subSchema, subSchemaPointer) {
            if (hasOwn(subSchema, '$ref') && isString(subSchema['$ref'])) {
                var refPointer = JsonPointer.compile(subSchema['$ref']);
                refLinks.add(refPointer);
                refMapSet.add(subSchemaPointer + '~~' + refPointer);
                refMap.set(subSchemaPointer, refPointer);
            }
        });
        refLinks.forEach(function (ref) { return refLibrary[ref] = getSubSchema(schema, ref); });
        // Follow all ref links and save in refMapSet,
        // to find any multi-link recursive refernces
        var checkRefLinks = true;
        while (checkRefLinks) {
            checkRefLinks = false;
            Array.from(refMap).forEach(function (_a) {
                var _b = tslib.__read(_a, 2), fromRef1 = _b[0], toRef1 = _b[1];
                return Array.from(refMap)
                    .filter(function (_a) {
                    var _b = tslib.__read(_a, 2), fromRef2 = _b[0], toRef2 = _b[1];
                    return JsonPointer.isSubPointer(toRef1, fromRef2, true) &&
                        !JsonPointer.isSubPointer(toRef2, toRef1, true) &&
                        !refMapSet.has(fromRef1 + fromRef2.slice(toRef1.length) + '~~' + toRef2);
                })
                    .forEach(function (_a) {
                    var _b = tslib.__read(_a, 2), fromRef2 = _b[0], toRef2 = _b[1];
                    refMapSet.add(fromRef1 + fromRef2.slice(toRef1.length) + '~~' + toRef2);
                    checkRefLinks = true;
                });
            });
        }
        // Build full recursiveRefMap
        // First pass - save all internally recursive refs from refMapSet
        Array.from(refMapSet)
            .map(function (refLink) { return refLink.split('~~'); })
            .filter(function (_a) {
            var _b = tslib.__read(_a, 2), fromRef = _b[0], toRef = _b[1];
            return JsonPointer.isSubPointer(toRef, fromRef);
        })
            .forEach(function (_a) {
            var _b = tslib.__read(_a, 2), fromRef = _b[0], toRef = _b[1];
            return recursiveRefMap.set(fromRef, toRef);
        });
        // Second pass - create recursive versions of any other refs that link to recursive refs
        Array.from(refMap)
            .filter(function (_a) {
            var _b = tslib.__read(_a, 2), fromRef1 = _b[0], toRef1 = _b[1];
            return Array.from(recursiveRefMap.keys())
                .every(function (fromRef2) { return !JsonPointer.isSubPointer(fromRef1, fromRef2, true); });
        })
            .forEach(function (_a) {
            var _b = tslib.__read(_a, 2), fromRef1 = _b[0], toRef1 = _b[1];
            return Array.from(recursiveRefMap)
                .filter(function (_a) {
                var _b = tslib.__read(_a, 2), fromRef2 = _b[0], toRef2 = _b[1];
                return !recursiveRefMap.has(fromRef1 + fromRef2.slice(toRef1.length)) &&
                    JsonPointer.isSubPointer(toRef1, fromRef2, true) &&
                    !JsonPointer.isSubPointer(toRef1, fromRef1, true);
            })
                .forEach(function (_a) {
                var _b = tslib.__read(_a, 2), fromRef2 = _b[0], toRef2 = _b[1];
                return recursiveRefMap.set(fromRef1 + fromRef2.slice(toRef1.length), fromRef1 + toRef2.slice(toRef1.length));
            });
        });
        // Create compiled schema by replacing all non-recursive $ref links with
        // thieir linked schemas and, where possible, combining schemas in allOf arrays.
        var compiledSchema = Object.assign({}, schema);
        delete compiledSchema.definitions;
        compiledSchema =
            getSubSchema(compiledSchema, '', refLibrary, recursiveRefMap);
        // Make sure all remaining schema $refs are recursive, and build final
        // schemaRefLibrary, schemaRecursiveRefMap, dataRecursiveRefMap, & arrayMap
        JsonPointer.forEachDeep(compiledSchema, function (subSchema, subSchemaPointer) {
            if (isString(subSchema['$ref'])) {
                var refPointer = JsonPointer.compile(subSchema['$ref']);
                if (!JsonPointer.isSubPointer(refPointer, subSchemaPointer, true)) {
                    refPointer = removeRecursiveReferences(subSchemaPointer, recursiveRefMap);
                    JsonPointer.set(compiledSchema, subSchemaPointer, { $ref: "#" + refPointer });
                }
                if (!hasOwn(schemaRefLibrary, 'refPointer')) {
                    schemaRefLibrary[refPointer] = !refPointer.length ? compiledSchema :
                        getSubSchema(compiledSchema, refPointer, schemaRefLibrary, recursiveRefMap);
                }
                if (!schemaRecursiveRefMap.has(subSchemaPointer)) {
                    schemaRecursiveRefMap.set(subSchemaPointer, refPointer);
                }
                var fromDataRef = JsonPointer.toDataPointer(subSchemaPointer, compiledSchema);
                if (!dataRecursiveRefMap.has(fromDataRef)) {
                    var toDataRef = JsonPointer.toDataPointer(refPointer, compiledSchema);
                    dataRecursiveRefMap.set(fromDataRef, toDataRef);
                }
            }
            if (subSchema.type === 'array' &&
                (hasOwn(subSchema, 'items') || hasOwn(subSchema, 'additionalItems'))) {
                var dataPointer = JsonPointer.toDataPointer(subSchemaPointer, compiledSchema);
                if (!arrayMap.has(dataPointer)) {
                    var tupleItems = isArray(subSchema.items) ? subSchema.items.length : 0;
                    arrayMap.set(dataPointer, tupleItems);
                }
            }
        }, true);
        return compiledSchema;
    }
    /**
     * 'getSubSchema' function
     *
     * @param  { any } schema
     * @param  { Pointer } pointer
     * @param  { object } schemaRefLibrary
     * @param  { Map<string, string> } schemaRecursiveRefMap
     * @param  { string[] = [] } usedPointers
     * @return { any }
     */
    function getSubSchema(schema, pointer, schemaRefLibrary, schemaRecursiveRefMap, usedPointers) {
        if (schemaRefLibrary === void 0) {
            schemaRefLibrary = null;
        }
        if (schemaRecursiveRefMap === void 0) {
            schemaRecursiveRefMap = null;
        }
        if (usedPointers === void 0) {
            usedPointers = [];
        }
        if (!schemaRefLibrary || !schemaRecursiveRefMap) {
            return JsonPointer.getCopy(schema, pointer);
        }
        if (typeof pointer !== 'string') {
            pointer = JsonPointer.compile(pointer);
        }
        usedPointers = tslib.__spread(usedPointers, [pointer]);
        var newSchema = null;
        if (pointer === '') {
            newSchema = lodash.cloneDeep(schema);
        }
        else {
            var shortPointer = removeRecursiveReferences(pointer, schemaRecursiveRefMap);
            if (shortPointer !== pointer) {
                usedPointers = tslib.__spread(usedPointers, [shortPointer]);
            }
            newSchema = JsonPointer.getFirstCopy([
                [schemaRefLibrary, [shortPointer]],
                [schema, pointer],
                [schema, shortPointer]
            ]);
        }
        return JsonPointer.forEachDeepCopy(newSchema, function (subSchema, subPointer) {
            if (isObject(subSchema)) {
                // Replace non-recursive $ref links with referenced schemas
                if (isString(subSchema.$ref)) {
                    var refPointer_1 = JsonPointer.compile(subSchema.$ref);
                    if (refPointer_1.length && usedPointers.every(function (ptr) { return !JsonPointer.isSubPointer(refPointer_1, ptr, true); })) {
                        var refSchema = getSubSchema(schema, refPointer_1, schemaRefLibrary, schemaRecursiveRefMap, usedPointers);
                        if (Object.keys(subSchema).length === 1) {
                            return refSchema;
                        }
                        else {
                            var extraKeys = Object.assign({}, subSchema);
                            delete extraKeys.$ref;
                            return mergeSchemas(refSchema, extraKeys);
                        }
                    }
                }
                // TODO: Convert schemas with 'type' arrays to 'oneOf'
                // Combine allOf subSchemas
                if (isArray(subSchema.allOf)) {
                    return combineAllOf(subSchema);
                }
                // Fix incorrectly placed array object required lists
                if (subSchema.type === 'array' && isArray(subSchema.required)) {
                    return fixRequiredArrayProperties(subSchema);
                }
            }
            return subSchema;
        }, true, pointer);
    }
    /**
     * 'combineAllOf' function
     *
     * Attempt to convert an allOf schema object into
     * a non-allOf schema object with equivalent rules.
     *
     * @param  { any } schema - allOf schema object
     * @return { any } - converted schema object
     */
    function combineAllOf(schema) {
        if (!isObject(schema) || !isArray(schema.allOf)) {
            return schema;
        }
        var mergedSchema = mergeSchemas.apply(void 0, tslib.__spread(schema.allOf));
        if (Object.keys(schema).length > 1) {
            var extraKeys = Object.assign({}, schema);
            delete extraKeys.allOf;
            mergedSchema = mergeSchemas(mergedSchema, extraKeys);
        }
        return mergedSchema;
    }
    /**
     * 'fixRequiredArrayProperties' function
     *
     * Fixes an incorrectly placed required list inside an array schema, by moving
     * it into items.properties or additionalItems.properties, where it belongs.
     *
     * @param  { any } schema - allOf schema object
     * @return { any } - converted schema object
     */
    function fixRequiredArrayProperties(schema) {
        if (schema.type === 'array' && isArray(schema.required)) {
            var itemsObject_1 = hasOwn(schema.items, 'properties') ? 'items' :
                hasOwn(schema.additionalItems, 'properties') ? 'additionalItems' : null;
            if (itemsObject_1 && !hasOwn(schema[itemsObject_1], 'required') && (hasOwn(schema[itemsObject_1], 'additionalProperties') ||
                schema.required.every(function (key) { return hasOwn(schema[itemsObject_1].properties, key); }))) {
                schema = lodash.cloneDeep(schema);
                schema[itemsObject_1].required = schema.required;
                delete schema.required;
            }
        }
        return schema;
    }
    // tslint:disable max-line-length
    // updated from AJV fast format regular expressions:
    // https://github.com/epoberezkin/ajv/blob/master/lib/compile/formats.js
    var jsonSchemaFormatTests = {
        'date': /^\d\d\d\d-[0-1]\d-[0-3]\d$/,
        'time': /^[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:z|[+-]\d\d:\d\d)?$/i,
        // Modified to allow incomplete entries, such as
        // "2000-03-14T01:59:26.535" (needs "Z") or "2000-03-14T01:59" (needs ":00Z")
        'date-time': /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s][0-2]\d:[0-5]\d(?::[0-5]\d)?(?:\.\d+)?(?:z|[+-]\d\d:\d\d)?$/i,
        // email (sources from jsen validator):
        // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
        // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'willful violation')
        'email': /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i,
        'hostname': /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*$/i,
        // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
        'ipv4': /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
        // optimized http://stackoverflow.com/questions/53497/regular-expression-that-matches-valid-ipv6-addresses
        'ipv6': /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
        // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
        'uri': /^(?:[a-z][a-z0-9+-.]*)(?::|\/)\/?[^\s]*$/i,
        // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
        'uri-reference': /^(?:(?:[a-z][a-z0-9+-.]*:)?\/\/)?[^\s]*$/i,
        // uri-template: https://tools.ietf.org/html/rfc6570
        'uri-template': /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
        // For the source: https://gist.github.com/dperini/729294
        // For test cases: https://mathiasbynens.be/demo/url-regex
        // @todo Delete current URL in favour of the commented out URL rule when this ajv issue is fixed https://github.com/eslint/eslint/issues/7983.
        // URL: /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)(?:\.(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
        'url': /^(?:(?:http[s\u017F]?|ftp):\/\/)(?:(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+(?::(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?@)?(?:(?!10(?:\.[0-9]{1,3}){3})(?!127(?:\.[0-9]{1,3}){3})(?!169\.254(?:\.[0-9]{1,3}){2})(?!192\.168(?:\.[0-9]{1,3}){2})(?!172\.(?:1[6-9]|2[0-9]|3[01])(?:\.[0-9]{1,3}){2})(?:[1-9][0-9]?|1[0-9][0-9]|2[01][0-9]|22[0-3])(?:\.(?:1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])){2}(?:\.(?:[1-9][0-9]?|1[0-9][0-9]|2[0-4][0-9]|25[0-4]))|(?:(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)(?:\.(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)*(?:\.(?:(?:[KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){2,})))(?::[0-9]{2,5})?(?:\/(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?$/i,
        // uuid: http://tools.ietf.org/html/rfc4122
        'uuid': /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
        // optimized https://gist.github.com/olmokramer/82ccce673f86db7cda5e
        'color': /^\s*(#(?:[\da-f]{3}){1,2}|rgb\((?:\d{1,3},\s*){2}\d{1,3}\)|rgba\((?:\d{1,3},\s*){3}\d*\.?\d+\)|hsl\(\d{1,3}(?:,\s*\d{1,3}%){2}\)|hsla\(\d{1,3}(?:,\s*\d{1,3}%){2},\s*\d*\.?\d+\))\s*$/gi,
        // JSON-pointer: https://tools.ietf.org/html/rfc6901
        'json-pointer': /^(?:\/(?:[^~/]|~0|~1)*)*$|^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
        'relative-json-pointer': /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
        'regex': function (str) {
            if (/[^\\]\\Z/.test(str)) {
                return false;
            }
            try {
                return true;
            }
            catch (e) {
                return false;
            }
        }
    };
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
    var JsonValidators = (function () {
        function JsonValidators() {
        }
        JsonValidators.required = function (input) {
            if (input === undefined) {
                input = true;
            }
            switch (input) {
                case true:
                    // Return required function (do not execute it yet)
                    return function (control, invert) {
                        if (invert === void 0) {
                            invert = false;
                        }
                        if (invert) {
                            return null;
                        } // if not required, always return valid
                        return hasValue(control.value) ? null : { 'required': true };
                    };
                case false:
                    // Do nothing (if field is not required, it is always valid)
                    return JsonValidators.nullValidator;
                default:
                    // Execute required function
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
                if (invert === void 0) {
                    invert = false;
                }
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
                if (invert === void 0) {
                    invert = false;
                }
                if (isEmpty(control.value)) {
                    return null;
                }
                var currentValue = control.value;
                var isEqual$$1 = function (enumValue, inputValue) {
                    return enumValue === inputValue ||
                        (isNumber(enumValue) && +inputValue === +enumValue) ||
                        (isBoolean(enumValue, 'strict') &&
                            toJavaScriptType(inputValue, 'boolean') === enumValue) ||
                        (enumValue === null && !hasValue(inputValue)) ||
                        lodash.isEqual(enumValue, inputValue);
                };
                var isValid = isArray(currentValue) ?
                    currentValue.every(function (inputValue) { return allowedValues.some(function (enumValue) { return isEqual$$1(enumValue, inputValue); }); }) :
                    allowedValues.some(function (enumValue) { return isEqual$$1(enumValue, currentValue); });
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
                if (invert === void 0) {
                    invert = false;
                }
                if (isEmpty(control.value)) {
                    return null;
                }
                var currentValue = control.value;
                var isEqual$$1 = function (constValue, inputValue) {
                    return constValue === inputValue ||
                        isNumber(constValue) && +inputValue === +constValue ||
                        isBoolean(constValue, 'strict') &&
                            toJavaScriptType(inputValue, 'boolean') === constValue ||
                        constValue === null && !hasValue(inputValue);
                };
                var isValid = isEqual$$1(requiredValue, currentValue);
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
                if (invert === void 0) {
                    invert = false;
                }
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
                if (invert === void 0) {
                    invert = false;
                }
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
            if (wholeString === void 0) {
                wholeString = false;
            }
            if (!hasValue(pattern)) {
                return JsonValidators.nullValidator;
            }
            return function (control, invert) {
                if (invert === void 0) {
                    invert = false;
                }
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
                if (invert === void 0) {
                    invert = false;
                }
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
                if (invert === void 0) {
                    invert = false;
                }
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
                if (invert === void 0) {
                    invert = false;
                }
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
                if (invert === void 0) {
                    invert = false;
                }
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
                if (invert === void 0) {
                    invert = false;
                }
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
                if (invert === void 0) {
                    invert = false;
                }
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
                if (invert === void 0) {
                    invert = false;
                }
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
                if (invert === void 0) {
                    invert = false;
                }
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
                if (invert === void 0) {
                    invert = false;
                }
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
                        for (var requiredFields_1 = tslib.__values(requiredFields), requiredFields_1_1 = requiredFields_1.next(); !requiredFields_1_1.done; requiredFields_1_1 = requiredFields_1.next()) {
                            var requiredField = requiredFields_1_1.value;
                            if (xor(!hasValue(control.value[requiredField]), invert)) {
                                requiringFieldErrors[requiredField] = { 'required': true };
                            }
                        }
                    }
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (requiredFields_1_1 && !requiredFields_1_1.done && (_a = requiredFields_1.return))
                                _a.call(requiredFields_1);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
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
                if (invert === void 0) {
                    invert = false;
                }
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
                if (invert === void 0) {
                    invert = false;
                }
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
            if (unique === void 0) {
                unique = true;
            }
            if (!unique) {
                return JsonValidators.nullValidator;
            }
            return function (control, invert) {
                if (invert === void 0) {
                    invert = false;
                }
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
            if (requiredItem === void 0) {
                requiredItem = true;
            }
            if (!requiredItem) {
                return JsonValidators.nullValidator;
            }
            return function (control, invert) {
                if (invert === void 0) {
                    invert = false;
                }
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
                if (invert === void 0) {
                    invert = false;
                }
                var arrayOfErrors = _executeValidators(control, presentValidators, invert).filter(isDefined);
                var isValid = validators.length > arrayOfErrors.length;
                return xor(isValid, invert) ?
                    null : _mergeObjects.apply(void 0, tslib.__spread(arrayOfErrors, [{ 'anyOf': !invert }]));
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
                if (invert === void 0) {
                    invert = false;
                }
                var arrayOfErrors = _executeValidators(control, presentValidators);
                var validControls = validators.length - arrayOfErrors.filter(isDefined).length;
                var isValid = validControls === 1;
                if (xor(isValid, invert)) {
                    return null;
                }
                var arrayOfValids = _executeValidators(control, presentValidators, invert);
                return _mergeObjects.apply(void 0, tslib.__spread(arrayOfErrors, arrayOfValids, [{ 'oneOf': !invert }]));
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
                if (invert === void 0) {
                    invert = false;
                }
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
                if (invert === void 0) {
                    invert = false;
                }
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
                if (invert === void 0) {
                    invert = false;
                }
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
                return map.map.call(forkJoin.forkJoin(observables), _mergeErrors);
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
            var EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
            return EMAIL_REGEXP.test(control.value) ? null : { 'email': true };
        };
        return JsonValidators;
    }());
    /**
     * FormGroup function library:
     *
     * buildFormGroupTemplate:  Builds a FormGroupTemplate from schema
     *
     * buildFormGroup:          Builds an Angular FormGroup from a FormGroupTemplate
     *
     * mergeValues:
     *
     * setRequiredFields:
     *
     * formatFormData:
     *
     * getControl:
     *
     * ---- TODO: ----
     * TODO: add buildFormGroupTemplateFromLayout function
     * buildFormGroupTemplateFromLayout: Builds a FormGroupTemplate from a form layout
     */
    /**
     * 'buildFormGroupTemplate' function
     *
     * Builds a template for an Angular FormGroup from a JSON Schema.
     *
     * TODO: add support for pattern properties
     * https://spacetelescope.github.io/understanding-json-schema/reference/object.html
     *
     * @param  {any} jsf -
     * @param  {any = null} nodeValue -
     * @param  {boolean = true} mapArrays -
     * @param  {string = ''} schemaPointer -
     * @param  {string = ''} dataPointer -
     * @param  {any = ''} templatePointer -
     * @return {any} -
     */
    function buildFormGroupTemplate(jsf, nodeValue, setValues, schemaPointer, dataPointer, templatePointer) {
        if (nodeValue === void 0) {
            nodeValue = null;
        }
        if (setValues === void 0) {
            setValues = true;
        }
        if (schemaPointer === void 0) {
            schemaPointer = '';
        }
        if (dataPointer === void 0) {
            dataPointer = '';
        }
        if (templatePointer === void 0) {
            templatePointer = '';
        }
        var schema = JsonPointer.get(jsf.schema, schemaPointer);
        if (setValues) {
            if (!isDefined(nodeValue) && (jsf.formOptions.setSchemaDefaults === true ||
                (jsf.formOptions.setSchemaDefaults === 'auto' && isEmpty(jsf.formValues)))) {
                nodeValue = JsonPointer.get(jsf.schema, schemaPointer + '/default');
            }
        }
        else {
            nodeValue = null;
        }
        // TODO: If nodeValue still not set, check layout for default value
        var schemaType = JsonPointer.get(schema, '/type');
        var controlType = (hasOwn(schema, 'properties') || hasOwn(schema, 'additionalProperties')) &&
            schemaType === 'object' ? 'FormGroup' :
            (hasOwn(schema, 'items') || hasOwn(schema, 'additionalItems')) &&
                schemaType === 'array' ? 'FormArray' :
                !schemaType && hasOwn(schema, '$ref') ? '$ref' : 'FormControl';
        var shortDataPointer = removeRecursiveReferences(dataPointer, jsf.dataRecursiveRefMap, jsf.arrayMap);
        if (!jsf.dataMap.has(shortDataPointer)) {
            jsf.dataMap.set(shortDataPointer, new Map());
        }
        var nodeOptions = jsf.dataMap.get(shortDataPointer);
        if (!nodeOptions.has('schemaType')) {
            nodeOptions.set('schemaPointer', schemaPointer);
            nodeOptions.set('schemaType', schema.type);
            if (schema.format) {
                nodeOptions.set('schemaFormat', schema.format);
                if (!schema.type) {
                    nodeOptions.set('schemaType', 'string');
                }
            }
            if (controlType) {
                nodeOptions.set('templatePointer', templatePointer);
                nodeOptions.set('templateType', controlType);
            }
        }
        var controls;
        var validators = getControlValidators(schema);
        switch (controlType) {
            case 'FormGroup':
                controls = {};
                if (hasOwn(schema, 'ui:order') || hasOwn(schema, 'properties')) {
                    var propertyKeys_1 = schema['ui:order'] || Object.keys(schema.properties);
                    if (propertyKeys_1.includes('*') && !hasOwn(schema.properties, '*')) {
                        var unnamedKeys = Object.keys(schema.properties)
                            .filter(function (key) { return !propertyKeys_1.includes(key); });
                        for (var i = propertyKeys_1.length - 1; i >= 0; i--) {
                            if (propertyKeys_1[i] === '*') {
                                propertyKeys_1.splice.apply(propertyKeys_1, tslib.__spread([i, 1], unnamedKeys));
                            }
                        }
                    }
                    propertyKeys_1
                        .filter(function (key) {
                        return hasOwn(schema.properties, key) ||
                            hasOwn(schema, 'additionalProperties');
                    })
                        .forEach(function (key) {
                        return controls[key] = buildFormGroupTemplate(jsf, JsonPointer.get(nodeValue, [key]), setValues, schemaPointer + (hasOwn(schema.properties, key) ?
                            '/properties/' + key : '/additionalProperties'), dataPointer + '/' + key, templatePointer + '/controls/' + key);
                    });
                    jsf.formOptions.fieldsRequired = setRequiredFields(schema, controls);
                }
                return { controlType: controlType, controls: controls, validators: validators };
            case 'FormArray':
                controls = [];
                var minItems = Math.max(schema.minItems || 0, nodeOptions.get('minItems') || 0);
                var maxItems = Math.min(schema.maxItems || 1000, nodeOptions.get('maxItems') || 1000);
                var additionalItemsPointer = null;
                if (isArray(schema.items)) {
                    // 'items' is an array = tuple items
                    var tupleItems = nodeOptions.get('tupleItems') ||
                        (isArray(schema.items) ? Math.min(schema.items.length, maxItems) : 0);
                    for (var i = 0; i < tupleItems; i++) {
                        if (i < minItems) {
                            controls.push(buildFormGroupTemplate(jsf, isArray(nodeValue) ? nodeValue[i] : nodeValue, setValues, schemaPointer + '/items/' + i, dataPointer + '/' + i, templatePointer + '/controls/' + i));
                        }
                        else {
                            var schemaRefPointer = removeRecursiveReferences(schemaPointer + '/items/' + i, jsf.schemaRecursiveRefMap);
                            var itemRefPointer = removeRecursiveReferences(shortDataPointer + '/' + i, jsf.dataRecursiveRefMap, jsf.arrayMap);
                            var itemRecursive = itemRefPointer !== shortDataPointer + '/' + i;
                            if (!hasOwn(jsf.templateRefLibrary, itemRefPointer)) {
                                jsf.templateRefLibrary[itemRefPointer] = null;
                                jsf.templateRefLibrary[itemRefPointer] = buildFormGroupTemplate(jsf, null, setValues, schemaRefPointer, itemRefPointer, templatePointer + '/controls/' + i);
                            }
                            controls.push(isArray(nodeValue) ?
                                buildFormGroupTemplate(jsf, nodeValue[i], setValues, schemaPointer + '/items/' + i, dataPointer + '/' + i, templatePointer + '/controls/' + i) :
                                itemRecursive ?
                                    null : lodash.cloneDeep(jsf.templateRefLibrary[itemRefPointer]));
                        }
                    }
                    // If 'additionalItems' is an object = additional list items (after tuple items)
                    if (schema.items.length < maxItems && isObject(schema.additionalItems)) {
                        additionalItemsPointer = schemaPointer + '/additionalItems';
                    }
                    // If 'items' is an object = list items only (no tuple items)
                }
                else {
                    additionalItemsPointer = schemaPointer + '/items';
                }
                if (additionalItemsPointer) {
                    var schemaRefPointer = removeRecursiveReferences(additionalItemsPointer, jsf.schemaRecursiveRefMap);
                    var itemRefPointer = removeRecursiveReferences(shortDataPointer + '/-', jsf.dataRecursiveRefMap, jsf.arrayMap);
                    var itemRecursive = itemRefPointer !== shortDataPointer + '/-';
                    if (!hasOwn(jsf.templateRefLibrary, itemRefPointer)) {
                        jsf.templateRefLibrary[itemRefPointer] = null;
                        jsf.templateRefLibrary[itemRefPointer] = buildFormGroupTemplate(jsf, null, setValues, schemaRefPointer, itemRefPointer, templatePointer + '/controls/-');
                    }
                    // const itemOptions = jsf.dataMap.get(itemRefPointer) || new Map();
                    var itemOptions = nodeOptions;
                    if (!itemRecursive || hasOwn(validators, 'required')) {
                        var arrayLength = Math.min(Math.max(itemRecursive ? 0 :
                            (itemOptions.get('tupleItems') + itemOptions.get('listItems')) || 0, isArray(nodeValue) ? nodeValue.length : 0), maxItems);
                        for (var i = controls.length; i < arrayLength; i++) {
                            controls.push(isArray(nodeValue) ?
                                buildFormGroupTemplate(jsf, nodeValue[i], setValues, schemaRefPointer, dataPointer + '/-', templatePointer + '/controls/-') :
                                itemRecursive ?
                                    null : lodash.cloneDeep(jsf.templateRefLibrary[itemRefPointer]));
                        }
                    }
                }
                return { controlType: controlType, controls: controls, validators: validators };
            case '$ref':
                var schemaRef = JsonPointer.compile(schema.$ref);
                var dataRef = JsonPointer.toDataPointer(schemaRef, schema);
                var refPointer = removeRecursiveReferences(dataRef, jsf.dataRecursiveRefMap, jsf.arrayMap);
                if (refPointer && !hasOwn(jsf.templateRefLibrary, refPointer)) {
                    // Set to null first to prevent recursive reference from causing endless loop
                    jsf.templateRefLibrary[refPointer] = null;
                    var newTemplate = buildFormGroupTemplate(jsf, setValues, setValues, schemaRef);
                    if (newTemplate) {
                        jsf.templateRefLibrary[refPointer] = newTemplate;
                    }
                    else {
                        delete jsf.templateRefLibrary[refPointer];
                    }
                }
                return null;
            case 'FormControl':
                var value = {
                    value: setValues && isPrimitive(nodeValue) ? nodeValue : null,
                    disabled: nodeOptions.get('disabled') || false
                };
                return { controlType: controlType, value: value, validators: validators };
            default:
                return null;
        }
    }
    /**
     * 'buildFormGroup' function
     *
     * @param {any} template -
     * @return {AbstractControl}
    */
    function buildFormGroup(template) {
        var validatorFns = [];
        var validatorFn = null;
        if (hasOwn(template, 'validators')) {
            forEach(template.validators, function (parameters, validator) {
                if (typeof JsonValidators[validator] === 'function') {
                    validatorFns.push(JsonValidators[validator].apply(null, parameters));
                }
            });
            if (validatorFns.length &&
                inArray(template.controlType, ['FormGroup', 'FormArray'])) {
                validatorFn = validatorFns.length > 1 ?
                    JsonValidators.compose(validatorFns) : validatorFns[0];
            }
        }
        if (hasOwn(template, 'controlType')) {
            switch (template.controlType) {
                case 'FormGroup':
                    var groupControls_1 = {};
                    forEach(template.controls, function (controls, key) {
                        var newControl = buildFormGroup(controls);
                        if (newControl) {
                            groupControls_1[key] = newControl;
                        }
                    });
                    return new forms.FormGroup(groupControls_1, validatorFn);
                case 'FormArray':
                    return new forms.FormArray(lodash.filter(lodash.map(template.controls, function (controls) { return buildFormGroup(controls); })), validatorFn);
                case 'FormControl':
                    return new forms.FormControl(template.value, validatorFns);
            }
        }
        return null;
    }
    /**
     * 'setRequiredFields' function
     *
     * @param {schema} schema - JSON Schema
     * @param {object} formControlTemplate - Form Control Template object
     * @return {boolean} - true if any fields have been set to required, false if not
     */
    function setRequiredFields(schema, formControlTemplate) {
        var fieldsRequired = false;
        if (hasOwn(schema, 'required') && !isEmpty(schema.required)) {
            fieldsRequired = true;
            var requiredArray = isArray(schema.required) ? schema.required : [schema.required];
            requiredArray = forEach(requiredArray, function (key) { return JsonPointer.set(formControlTemplate, '/' + key + '/validators/required', []); });
        }
        return fieldsRequired;
        // TODO: Add support for patternProperties
        // https://spacetelescope.github.io/understanding-json-schema/reference/object.html#pattern-properties
    }
    /**
     * 'formatFormData' function
     *
     * @param {any} formData - Angular FormGroup data object
     * @param {Map<string, any>} dataMap -
     * @param {Map<string, string>} recursiveRefMap -
     * @param {Map<string, number>} arrayMap -
     * @param {boolean = false} fixErrors - if TRUE, tries to fix data
     * @return {any} - formatted data object
     */
    function formatFormData(formData, dataMap, recursiveRefMap, arrayMap, returnEmptyFields, fixErrors) {
        if (returnEmptyFields === void 0) {
            returnEmptyFields = false;
        }
        if (fixErrors === void 0) {
            fixErrors = false;
        }
        if (formData === null || typeof formData !== 'object') {
            return formData;
        }
        var formattedData = isArray(formData) ? [] : {};
        JsonPointer.forEachDeep(formData, function (value, dataPointer) {
            // If returnEmptyFields === true,
            // add empty arrays and objects to all allowed keys
            if (returnEmptyFields && isArray(value)) {
                JsonPointer.set(formattedData, dataPointer, []);
            }
            else if (returnEmptyFields && isObject(value) && !isDate(value)) {
                JsonPointer.set(formattedData, dataPointer, {});
            }
            else {
                var genericPointer_1 = JsonPointer.has(dataMap, [dataPointer, 'schemaType']) ? dataPointer :
                    removeRecursiveReferences(dataPointer, recursiveRefMap, arrayMap);
                if (JsonPointer.has(dataMap, [genericPointer_1, 'schemaType'])) {
                    var schemaType = dataMap.get(genericPointer_1).get('schemaType');
                    if (schemaType === 'null') {
                        JsonPointer.set(formattedData, dataPointer, null);
                    }
                    else if ((hasValue(value) || returnEmptyFields) &&
                        inArray(schemaType, ['string', 'integer', 'number', 'boolean'])) {
                        var newValue = (fixErrors || (value === null && returnEmptyFields)) ?
                            toSchemaType(value, schemaType) : toJavaScriptType(value, schemaType);
                        if (isDefined(newValue) || returnEmptyFields) {
                            JsonPointer.set(formattedData, dataPointer, newValue);
                        }
                        // If returnEmptyFields === false,
                        // only add empty arrays and objects to required keys
                    }
                    else if (schemaType === 'object' && !returnEmptyFields) {
                        (dataMap.get(genericPointer_1).get('required') || []).forEach(function (key) {
                            var keySchemaType = dataMap.get(genericPointer_1 + "/" + key).get('schemaType');
                            if (keySchemaType === 'array') {
                                JsonPointer.set(formattedData, dataPointer + "/" + key, []);
                            }
                            else if (keySchemaType === 'object') {
                                JsonPointer.set(formattedData, dataPointer + "/" + key, {});
                            }
                        });
                    }
                    // Finish incomplete 'date-time' entries
                    if (dataMap.get(genericPointer_1).get('schemaFormat') === 'date-time') {
                        // "2000-03-14T01:59:26.535" -> "2000-03-14T01:59:26.535Z" (add "Z")
                        if (/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s][0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?$/i.test(value)) {
                            JsonPointer.set(formattedData, dataPointer, value + "Z");
                            // "2000-03-14T01:59" -> "2000-03-14T01:59:00Z" (add ":00Z")
                        }
                        else if (/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s][0-2]\d:[0-5]\d$/i.test(value)) {
                            JsonPointer.set(formattedData, dataPointer, value + ":00Z");
                            // "2000-03-14" -> "2000-03-14T00:00:00Z" (add "T00:00:00Z")
                        }
                        else if (fixErrors && /^\d\d\d\d-[0-1]\d-[0-3]\d$/i.test(value)) {
                            JsonPointer.set(formattedData, dataPointer, value + ":00:00:00Z");
                        }
                    }
                }
                else if (typeof value !== 'object' || isDate(value) ||
                    (value === null && returnEmptyFields)) {
                    console.error('formatFormData error: ' +
                        ("Schema type not found for form value at " + genericPointer_1));
                    console.error('dataMap', dataMap);
                    console.error('recursiveRefMap', recursiveRefMap);
                    console.error('genericPointer', genericPointer_1);
                }
            }
        });
        return formattedData;
    }
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
     * @param {FormGroup} formGroup - Angular FormGroup to get value from
     * @param {Pointer} dataPointer - JSON Pointer (string or array)
     * @param {boolean = false} returnGroup - If true, return group containing control
     * @return {group} - Located value (or null, if no control found)
     */
    function getControl(formGroup, dataPointer, returnGroup) {
        if (returnGroup === void 0) {
            returnGroup = false;
        }
        if (!isObject(formGroup) || !JsonPointer.isJsonPointer(dataPointer)) {
            if (!JsonPointer.isJsonPointer(dataPointer)) {
                // If dataPointer input is not a valid JSON pointer, check to
                // see if it is instead a valid object path, using dot notaion
                if (typeof dataPointer === 'string') {
                    var formControl = formGroup.get(dataPointer);
                    if (formControl) {
                        return formControl;
                    }
                }
                console.error("getControl error: Invalid JSON Pointer: " + dataPointer);
            }
            if (!isObject(formGroup)) {
                console.error("getControl error: Invalid formGroup: " + formGroup);
            }
            return null;
        }
        var dataPointerArray = JsonPointer.parse(dataPointer);
        if (returnGroup) {
            dataPointerArray = dataPointerArray.slice(0, -1);
        }
        // If formGroup input is a real formGroup (not a formGroup template)
        // try using formGroup.get() to return the control
        if (typeof formGroup.get === 'function' &&
            dataPointerArray.every(function (key) { return key.indexOf('.') === -1; })) {
            var formControl = formGroup.get(dataPointerArray.join('.'));
            if (formControl) {
                return formControl;
            }
        }
        // If formGroup input is a formGroup template,
        // or formGroup.get() failed to return the control,
        // search the formGroup object for dataPointer's control
        var subGroup = formGroup;
        try {
            for (var dataPointerArray_1 = tslib.__values(dataPointerArray), dataPointerArray_1_1 = dataPointerArray_1.next(); !dataPointerArray_1_1.done; dataPointerArray_1_1 = dataPointerArray_1.next()) {
                var key = dataPointerArray_1_1.value;
                if (hasOwn(subGroup, 'controls')) {
                    subGroup = subGroup.controls;
                }
                if (isArray(subGroup) && (key === '-')) {
                    subGroup = subGroup[subGroup.length - 1];
                }
                else if (hasOwn(subGroup, key)) {
                    subGroup = subGroup[key];
                }
                else {
                    console.error("getControl error: Unable to find \"" + key + "\" item in FormGroup.");
                    console.error(dataPointer);
                    console.error(formGroup);
                    return;
                }
            }
        }
        catch (e_4_1) {
            e_4 = { error: e_4_1 };
        }
        finally {
            try {
                if (dataPointerArray_1_1 && !dataPointerArray_1_1.done && (_a = dataPointerArray_1.return))
                    _a.call(dataPointerArray_1);
            }
            finally {
                if (e_4)
                    throw e_4.error;
            }
        }
        return subGroup;
        var e_4, _a;
    }
    /**
     * Layout function library:
     *
     * buildLayout:            Builds a complete layout from an input layout and schema
     *
     * buildLayoutFromSchema:  Builds a complete layout entirely from an input schema
     *
     * mapLayout:
     *
     * getLayoutNode:
     *
     * buildTitleMap:
     */
    /**
     * 'buildLayout' function
     *
     * @param  { any } jsf
     * @param  { any } widgetLibrary
     * @return { any[] }
     */
    function buildLayout(jsf, widgetLibrary) {
        var hasSubmitButton = !JsonPointer.get(jsf, '/formOptions/addSubmit');
        var formLayout = mapLayout(jsf.layout, function (layoutItem, index, layoutPointer) {
            var newNode = {
                _id: lodash.uniqueId(),
                options: {},
            };
            if (isObject(layoutItem)) {
                Object.assign(newNode, layoutItem);
                Object.keys(newNode)
                    .filter(function (option) {
                    return !inArray(option, [
                        '_id', '$ref', 'arrayItem', 'arrayItemType', 'dataPointer', 'dataType',
                        'items', 'key', 'name', 'options', 'recursiveReference', 'type', 'widget'
                    ]);
                })
                    .forEach(function (option) {
                    newNode.options[option] = newNode[option];
                    delete newNode[option];
                });
                if (!hasOwn(newNode, 'type') && isString(newNode.widget)) {
                    newNode.type = newNode.widget;
                    delete newNode.widget;
                }
                if (!hasOwn(newNode.options, 'title')) {
                    if (hasOwn(newNode.options, 'legend')) {
                        newNode.options.title = newNode.options.legend;
                        delete newNode.options.legend;
                    }
                }
                if (!hasOwn(newNode.options, 'validationMessages')) {
                    if (hasOwn(newNode.options, 'errorMessages')) {
                        newNode.options.validationMessages = newNode.options.errorMessages;
                        delete newNode.options.errorMessages;
                        // Convert Angular Schema Form (AngularJS) 'validationMessage' to
                        // Angular JSON Schema Form 'validationMessages'
                        // TV4 codes from https://github.com/geraintluff/tv4/blob/master/source/api.js
                    }
                    else if (hasOwn(newNode.options, 'validationMessage')) {
                        if (typeof newNode.options.validationMessage === 'string') {
                            newNode.options.validationMessages = newNode.options.validationMessage;
                        }
                        else {
                            newNode.options.validationMessages = {};
                            Object.keys(newNode.options.validationMessage).forEach(function (key) {
                                var code = key + '';
                                var newKey = code === '0' ? 'type' :
                                    code === '1' ? 'enum' :
                                        code === '100' ? 'multipleOf' :
                                            code === '101' ? 'minimum' :
                                                code === '102' ? 'exclusiveMinimum' :
                                                    code === '103' ? 'maximum' :
                                                        code === '104' ? 'exclusiveMaximum' :
                                                            code === '200' ? 'minLength' :
                                                                code === '201' ? 'maxLength' :
                                                                    code === '202' ? 'pattern' :
                                                                        code === '300' ? 'minProperties' :
                                                                            code === '301' ? 'maxProperties' :
                                                                                code === '302' ? 'required' :
                                                                                    code === '304' ? 'dependencies' :
                                                                                        code === '400' ? 'minItems' :
                                                                                            code === '401' ? 'maxItems' :
                                                                                                code === '402' ? 'uniqueItems' :
                                                                                                    code === '500' ? 'format' : code + '';
                                newNode.options.validationMessages[newKey] = newNode.options.validationMessage[key];
                            });
                        }
                        delete newNode.options.validationMessage;
                    }
                }
            }
            else if (JsonPointer.isJsonPointer(layoutItem)) {
                newNode.dataPointer = layoutItem;
            }
            else if (isString(layoutItem)) {
                newNode.key = layoutItem;
            }
            else {
                console.error('buildLayout error: Form layout element not recognized:');
                console.error(layoutItem);
                return null;
            }
            var nodeSchema = null;
            // If newNode does not have a dataPointer, try to find an equivalent
            if (!hasOwn(newNode, 'dataPointer')) {
                // If newNode has a key, change it to a dataPointer
                if (hasOwn(newNode, 'key')) {
                    newNode.dataPointer = newNode.key === '*' ? newNode.key :
                        JsonPointer.compile(JsonPointer.parseObjectPath(newNode.key), '-');
                    delete newNode.key;
                    // If newNode is an array, search for dataPointer in child nodes
                }
                else if (hasOwn(newNode, 'type') && newNode.type.slice(-5) === 'array') {
                    var findDataPointer_1 = function (items) {
                        if (items === null || typeof items !== 'object') {
                            return;
                        }
                        if (hasOwn(items, 'dataPointer')) {
                            return items.dataPointer;
                        }
                        if (isArray(items.items)) {
                            try {
                                for (var _a = tslib.__values(items.items), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    var item = _b.value;
                                    if (hasOwn(item, 'dataPointer') && item.dataPointer.indexOf('/-') !== -1) {
                                        return item.dataPointer;
                                    }
                                    if (hasOwn(item, 'items')) {
                                        var searchItem = findDataPointer_1(item);
                                        if (searchItem) {
                                            return searchItem;
                                        }
                                    }
                                }
                            }
                            catch (e_1_1) {
                                e_1 = { error: e_1_1 };
                            }
                            finally {
                                try {
                                    if (_b && !_b.done && (_c = _a.return))
                                        _c.call(_a);
                                }
                                finally {
                                    if (e_1)
                                        throw e_1.error;
                                }
                            }
                        }
                        var e_1, _c;
                    };
                    var childDataPointer = findDataPointer_1(newNode);
                    if (childDataPointer) {
                        newNode.dataPointer =
                            childDataPointer.slice(0, childDataPointer.lastIndexOf('/-'));
                    }
                }
            }
            if (hasOwn(newNode, 'dataPointer')) {
                if (newNode.dataPointer === '*') {
                    return buildLayoutFromSchema(jsf, widgetLibrary, jsf.formValues);
                }
                var nodeValue = JsonPointer.get(jsf.formValues, newNode.dataPointer.replace(/\/-/g, '/1'));
                // TODO: Create function getFormValues(jsf, dataPointer, forRefLibrary)
                // check formOptions.setSchemaDefaults and formOptions.setLayoutDefaults
                // then set apropriate values from initialVaues, schema, or layout
                newNode.dataPointer =
                    JsonPointer.toGenericPointer(newNode.dataPointer, jsf.arrayMap);
                var LastKey = JsonPointer.toKey(newNode.dataPointer);
                if (!newNode.name && isString(LastKey) && LastKey !== '-') {
                    newNode.name = LastKey;
                }
                var shortDataPointer = removeRecursiveReferences(newNode.dataPointer, jsf.dataRecursiveRefMap, jsf.arrayMap);
                var recursive_1 = !shortDataPointer.length ||
                    shortDataPointer !== newNode.dataPointer;
                var schemaPointer = void 0;
                if (!jsf.dataMap.has(shortDataPointer)) {
                    jsf.dataMap.set(shortDataPointer, new Map());
                }
                var nodeDataMap = jsf.dataMap.get(shortDataPointer);
                if (nodeDataMap.has('schemaPointer')) {
                    schemaPointer = nodeDataMap.get('schemaPointer');
                }
                else {
                    schemaPointer = JsonPointer.toSchemaPointer(shortDataPointer, jsf.schema);
                    nodeDataMap.set('schemaPointer', schemaPointer);
                }
                nodeDataMap.set('disabled', !!newNode.options.disabled);
                nodeSchema = JsonPointer.get(jsf.schema, schemaPointer);
                if (nodeSchema) {
                    if (!hasOwn(newNode, 'type')) {
                        newNode.type = getInputType(nodeSchema, newNode);
                    }
                    else if (!widgetLibrary.hasWidget(newNode.type)) {
                        var oldWidgetType = newNode.type;
                        newNode.type = getInputType(nodeSchema, newNode);
                        console.error("error: widget type \"" + oldWidgetType + "\" " +
                            ("not found in library. Replacing with \"" + newNode.type + "\"."));
                    }
                    else {
                        newNode.type = checkInlineType(newNode.type, nodeSchema, newNode);
                    }
                    if (nodeSchema.type === 'object' && isArray(nodeSchema.required)) {
                        nodeDataMap.set('required', nodeSchema.required);
                    }
                    newNode.dataType =
                        nodeSchema.type || (hasOwn(nodeSchema, '$ref') ? '$ref' : null);
                    updateInputOptions(newNode, nodeSchema, jsf);
                    // Present checkboxes as single control, rather than array
                    if (newNode.type === 'checkboxes' && hasOwn(nodeSchema, 'items')) {
                        updateInputOptions(newNode, nodeSchema.items, jsf);
                    }
                    else if (newNode.dataType === 'array') {
                        newNode.options.maxItems = Math.min(nodeSchema.maxItems || 1000, newNode.options.maxItems || 1000);
                        newNode.options.minItems = Math.max(nodeSchema.minItems || 0, newNode.options.minItems || 0);
                        newNode.options.listItems = Math.max(newNode.options.listItems || 0, isArray(nodeValue) ? nodeValue.length : 0);
                        newNode.options.tupleItems =
                            isArray(nodeSchema.items) ? nodeSchema.items.length : 0;
                        if (newNode.options.maxItems < newNode.options.tupleItems) {
                            newNode.options.tupleItems = newNode.options.maxItems;
                            newNode.options.listItems = 0;
                        }
                        else if (newNode.options.maxItems <
                            newNode.options.tupleItems + newNode.options.listItems) {
                            newNode.options.listItems =
                                newNode.options.maxItems - newNode.options.tupleItems;
                        }
                        else if (newNode.options.minItems >
                            newNode.options.tupleItems + newNode.options.listItems) {
                            newNode.options.listItems =
                                newNode.options.minItems - newNode.options.tupleItems;
                        }
                        if (!nodeDataMap.has('maxItems')) {
                            nodeDataMap.set('maxItems', newNode.options.maxItems);
                            nodeDataMap.set('minItems', newNode.options.minItems);
                            nodeDataMap.set('tupleItems', newNode.options.tupleItems);
                            nodeDataMap.set('listItems', newNode.options.listItems);
                        }
                        if (!jsf.arrayMap.has(shortDataPointer)) {
                            jsf.arrayMap.set(shortDataPointer, newNode.options.tupleItems);
                        }
                    }
                    if (isInputRequired(jsf.schema, schemaPointer)) {
                        newNode.options.required = true;
                        jsf.fieldsRequired = true;
                    }
                }
                else {
                    // TODO: create item in FormGroup model from layout key (?)
                    updateInputOptions(newNode, {}, jsf);
                }
                if (!newNode.options.title && !/^\d+$/.test(newNode.name)) {
                    newNode.options.title = fixTitle(newNode.name);
                }
                if (hasOwn(newNode.options, 'copyValueTo')) {
                    if (typeof newNode.options.copyValueTo === 'string') {
                        newNode.options.copyValueTo = [newNode.options.copyValueTo];
                    }
                    if (isArray(newNode.options.copyValueTo)) {
                        newNode.options.copyValueTo = newNode.options.copyValueTo.map(function (item) { return JsonPointer.compile(JsonPointer.parseObjectPath(item), '-'); });
                    }
                }
                newNode.widget = widgetLibrary.getWidget(newNode.type);
                nodeDataMap.set('inputType', newNode.type);
                nodeDataMap.set('widget', newNode.widget);
                if (newNode.dataType === 'array' &&
                    (hasOwn(newNode, 'items') || hasOwn(newNode, 'additionalItems'))) {
                    var itemRefPointer_1 = removeRecursiveReferences(newNode.dataPointer + '/-', jsf.dataRecursiveRefMap, jsf.arrayMap);
                    if (!jsf.dataMap.has(itemRefPointer_1)) {
                        jsf.dataMap.set(itemRefPointer_1, new Map());
                    }
                    jsf.dataMap.get(itemRefPointer_1).set('inputType', 'section');
                    // Fix insufficiently nested array item groups
                    if (newNode.items.length > 1) {
                        var arrayItemGroup = [];
                        for (var i = newNode.items.length - 1; i >= 0; i--) {
                            var subItem = newNode.items[i];
                            if (hasOwn(subItem, 'dataPointer') &&
                                subItem.dataPointer.slice(0, itemRefPointer_1.length) === itemRefPointer_1) {
                                var arrayItem = newNode.items.splice(i, 1)[0];
                                arrayItem.dataPointer = newNode.dataPointer + '/-' +
                                    arrayItem.dataPointer.slice(itemRefPointer_1.length);
                                arrayItemGroup.unshift(arrayItem);
                            }
                            else {
                                subItem.arrayItem = true;
                                // TODO: Check schema to get arrayItemType and removable
                                subItem.arrayItemType = 'list';
                                subItem.removable = newNode.options.removable !== false;
                            }
                        }
                        if (arrayItemGroup.length) {
                            newNode.items.push({
                                _id: lodash.uniqueId(),
                                arrayItem: true,
                                arrayItemType: newNode.options.tupleItems > newNode.items.length ?
                                    'tuple' : 'list',
                                items: arrayItemGroup,
                                options: { removable: newNode.options.removable !== false, },
                                dataPointer: newNode.dataPointer + '/-',
                                type: 'section',
                                widget: widgetLibrary.getWidget('section'),
                            });
                        }
                    }
                    else {
                        // TODO: Fix to hndle multiple items
                        newNode.items[0].arrayItem = true;
                        if (!newNode.items[0].dataPointer) {
                            newNode.items[0].dataPointer =
                                JsonPointer.toGenericPointer(itemRefPointer_1, jsf.arrayMap);
                        }
                        if (!JsonPointer.has(newNode, '/items/0/options/removable')) {
                            newNode.items[0].options.removable = true;
                        }
                        if (newNode.options.orderable === false) {
                            newNode.items[0].options.orderable = false;
                        }
                        newNode.items[0].arrayItemType =
                            newNode.options.tupleItems ? 'tuple' : 'list';
                    }
                    if (isArray(newNode.items)) {
                        var arrayListItems = newNode.items.filter(function (item) { return item.type !== '$ref'; }).length -
                            newNode.options.tupleItems;
                        if (arrayListItems > newNode.options.listItems) {
                            newNode.options.listItems = arrayListItems;
                            nodeDataMap.set('listItems', arrayListItems);
                        }
                    }
                    if (!hasOwn(jsf.layoutRefLibrary, itemRefPointer_1)) {
                        jsf.layoutRefLibrary[itemRefPointer_1] =
                            lodash.cloneDeep(newNode.items[newNode.items.length - 1]);
                        if (recursive_1) {
                            jsf.layoutRefLibrary[itemRefPointer_1].recursiveReference = true;
                        }
                        forEach(jsf.layoutRefLibrary[itemRefPointer_1], function (item, key) {
                            if (hasOwn(item, '_id')) {
                                item._id = null;
                            }
                            if (recursive_1) {
                                if (hasOwn(item, 'dataPointer')) {
                                    item.dataPointer = item.dataPointer.slice(itemRefPointer_1.length);
                                }
                            }
                        }, 'top-down');
                    }
                    // Add any additional default items
                    if (!newNode.recursiveReference || newNode.options.required) {
                        var arrayLength = Math.min(Math.max(newNode.options.tupleItems + newNode.options.listItems, isArray(nodeValue) ? nodeValue.length : 0), newNode.options.maxItems);
                        for (var i = newNode.items.length; i < arrayLength; i++) {
                            newNode.items.push(getLayoutNode({
                                $ref: itemRefPointer_1,
                                dataPointer: newNode.dataPointer,
                                recursiveReference: newNode.recursiveReference,
                            }, jsf, widgetLibrary));
                        }
                    }
                    // If needed, add button to add items to array
                    if (newNode.options.addable !== false &&
                        newNode.options.minItems < newNode.options.maxItems &&
                        (newNode.items[newNode.items.length - 1] || {}).type !== '$ref') {
                        var buttonText = 'Add';
                        if (newNode.options.title) {
                            if (/^add\b/i.test(newNode.options.title)) {
                                buttonText = newNode.options.title;
                            }
                            else {
                                buttonText += ' ' + newNode.options.title;
                            }
                        }
                        else if (newNode.name && !/^\d+$/.test(newNode.name)) {
                            if (/^add\b/i.test(newNode.name)) {
                                buttonText += ' ' + fixTitle(newNode.name);
                            }
                            else {
                                buttonText = fixTitle(newNode.name);
                            }
                            // If newNode doesn't have a title, look for title of parent array item
                        }
                        else {
                            var parentSchema = getFromSchema(jsf.schema, newNode.dataPointer, 'parentSchema');
                            if (hasOwn(parentSchema, 'title')) {
                                buttonText += ' to ' + parentSchema.title;
                            }
                            else {
                                var pointerArray = JsonPointer.parse(newNode.dataPointer);
                                buttonText += ' to ' + fixTitle(pointerArray[pointerArray.length - 2]);
                            }
                        }
                        newNode.items.push({
                            _id: lodash.uniqueId(),
                            arrayItem: true,
                            arrayItemType: 'list',
                            dataPointer: newNode.dataPointer + '/-',
                            options: {
                                listItems: newNode.options.listItems,
                                maxItems: newNode.options.maxItems,
                                minItems: newNode.options.minItems,
                                removable: false,
                                title: buttonText,
                                tupleItems: newNode.options.tupleItems,
                            },
                            recursiveReference: recursive_1,
                            type: '$ref',
                            widget: widgetLibrary.getWidget('$ref'),
                            $ref: itemRefPointer_1,
                        });
                        if (isString(JsonPointer.get(newNode, '/style/add'))) {
                            newNode.items[newNode.items.length - 1].options.fieldStyle =
                                newNode.style.add;
                            delete newNode.style.add;
                            if (isEmpty(newNode.style)) {
                                delete newNode.style;
                            }
                        }
                    }
                }
                else {
                    newNode.arrayItem = false;
                }
            }
            else if (hasOwn(newNode, 'type') || hasOwn(newNode, 'items')) {
                var parentType = JsonPointer.get(jsf.layout, layoutPointer, 0, -2).type;
                if (!hasOwn(newNode, 'type')) {
                    newNode.type =
                        inArray(parentType, ['tabs', 'tabarray']) ? 'tab' : 'array';
                }
                newNode.arrayItem = parentType === 'array';
                newNode.widget = widgetLibrary.getWidget(newNode.type);
                updateInputOptions(newNode, {}, jsf);
            }
            if (newNode.type === 'submit') {
                hasSubmitButton = true;
            }
            return newNode;
        });
        if (jsf.hasRootReference) {
            var fullLayout = lodash.cloneDeep(formLayout);
            if (fullLayout[fullLayout.length - 1].type === 'submit') {
                fullLayout.pop();
            }
            jsf.layoutRefLibrary[''] = {
                _id: null,
                dataPointer: '',
                dataType: 'object',
                items: fullLayout,
                name: '',
                options: lodash.cloneDeep(jsf.formOptions.defautWidgetOptions),
                recursiveReference: true,
                required: false,
                type: 'section',
                widget: widgetLibrary.getWidget('section'),
            };
        }
        if (!hasSubmitButton) {
            formLayout.push({
                _id: lodash.uniqueId(),
                options: { title: 'Submit' },
                type: 'submit',
                widget: widgetLibrary.getWidget('submit'),
            });
        }
        return formLayout;
    }
    /**
     * 'buildLayoutFromSchema' function
     *
     * @param  { any } jsf -
     * @param  { any } widgetLibrary -
     * @param  { any } nodeValue -
     * @param  { string = '' } schemaPointer -
     * @param  { string = '' } dataPointer -
     * @param  { boolean = false } arrayItem -
     * @param  { string = null } arrayItemType -
     * @param  { boolean = null } removable -
     * @param  { boolean = false } forRefLibrary -
     * @param  { string = '' } dataPointerPrefix -
     * @return { any }
     */
    function buildLayoutFromSchema(jsf, widgetLibrary, nodeValue, schemaPointer, dataPointer, arrayItem, arrayItemType, removable, forRefLibrary, dataPointerPrefix) {
        if (nodeValue === void 0) {
            nodeValue = null;
        }
        if (schemaPointer === void 0) {
            schemaPointer = '';
        }
        if (dataPointer === void 0) {
            dataPointer = '';
        }
        if (arrayItem === void 0) {
            arrayItem = false;
        }
        if (arrayItemType === void 0) {
            arrayItemType = null;
        }
        if (removable === void 0) {
            removable = null;
        }
        if (forRefLibrary === void 0) {
            forRefLibrary = false;
        }
        if (dataPointerPrefix === void 0) {
            dataPointerPrefix = '';
        }
        var schema = JsonPointer.get(jsf.schema, schemaPointer);
        if (!hasOwn(schema, 'type') && !hasOwn(schema, '$ref') &&
            !hasOwn(schema, 'x-schema-form')) {
            return null;
        }
        var newNodeType = getInputType(schema);
        if (!isDefined(nodeValue) && (jsf.formOptions.setSchemaDefaults === true ||
            (jsf.formOptions.setSchemaDefaults === 'auto' && isEmpty(jsf.formValues)))) {
            nodeValue = JsonPointer.get(jsf.schema, schemaPointer + '/default');
        }
        var newNode = {
            _id: forRefLibrary ? null : lodash.uniqueId(),
            arrayItem: arrayItem,
            dataPointer: JsonPointer.toGenericPointer(dataPointer, jsf.arrayMap),
            dataType: schema.type || (hasOwn(schema, '$ref') ? '$ref' : null),
            options: {},
            required: isInputRequired(jsf.schema, schemaPointer),
            type: newNodeType,
            widget: widgetLibrary.getWidget(newNodeType),
        };
        var lastDataKey = JsonPointer.toKey(newNode.dataPointer);
        if (lastDataKey !== '-') {
            newNode.name = lastDataKey;
        }
        if (newNode.arrayItem) {
            newNode.arrayItemType = arrayItemType;
            newNode.options.removable = removable !== false;
        }
        var shortDataPointer = removeRecursiveReferences(dataPointerPrefix + dataPointer, jsf.dataRecursiveRefMap, jsf.arrayMap);
        var recursive = !shortDataPointer.length ||
            shortDataPointer !== dataPointerPrefix + dataPointer;
        if (!jsf.dataMap.has(shortDataPointer)) {
            jsf.dataMap.set(shortDataPointer, new Map());
        }
        var nodeDataMap = jsf.dataMap.get(shortDataPointer);
        if (!nodeDataMap.has('inputType')) {
            nodeDataMap.set('schemaPointer', schemaPointer);
            nodeDataMap.set('inputType', newNode.type);
            nodeDataMap.set('widget', newNode.widget);
            nodeDataMap.set('disabled', !!newNode.options.disabled);
        }
        updateInputOptions(newNode, schema, jsf);
        if (!newNode.options.title && newNode.name && !/^\d+$/.test(newNode.name)) {
            newNode.options.title = fixTitle(newNode.name);
        }
        if (newNode.dataType === 'object') {
            if (isArray(schema.required) && !nodeDataMap.has('required')) {
                nodeDataMap.set('required', schema.required);
            }
            if (isObject(schema.properties)) {
                var newSection_1 = [];
                var propertyKeys_1 = schema['ui:order'] || Object.keys(schema.properties);
                if (propertyKeys_1.includes('*') && !hasOwn(schema.properties, '*')) {
                    var unnamedKeys = Object.keys(schema.properties)
                        .filter(function (key) { return !propertyKeys_1.includes(key); });
                    for (var i = propertyKeys_1.length - 1; i >= 0; i--) {
                        if (propertyKeys_1[i] === '*') {
                            propertyKeys_1.splice.apply(propertyKeys_1, tslib.__spread([i, 1], unnamedKeys));
                        }
                    }
                }
                propertyKeys_1
                    .filter(function (key) {
                    return hasOwn(schema.properties, key) ||
                        hasOwn(schema, 'additionalProperties');
                })
                    .forEach(function (key) {
                    var keySchemaPointer = hasOwn(schema.properties, key) ?
                        '/properties/' + key : '/additionalProperties';
                    var innerItem = buildLayoutFromSchema(jsf, widgetLibrary, isObject(nodeValue) ? nodeValue[key] : null, schemaPointer + keySchemaPointer, dataPointer + '/' + key, false, null, null, forRefLibrary, dataPointerPrefix);
                    if (innerItem) {
                        if (isInputRequired(schema, '/' + key)) {
                            innerItem.options.required = true;
                            jsf.fieldsRequired = true;
                        }
                        newSection_1.push(innerItem);
                    }
                });
                if (dataPointer === '' && !forRefLibrary) {
                    newNode = newSection_1;
                }
                else {
                    newNode.items = newSection_1;
                }
            }
            // TODO: Add patternProperties and additionalProperties inputs?
            // ... possibly provide a way to enter both key names and values?
            // if (isObject(schema.patternProperties)) { }
            // if (isObject(schema.additionalProperties)) { }
        }
        else if (newNode.dataType === 'array') {
            newNode.items = [];
            newNode.options.maxItems = Math.min(schema.maxItems || 1000, newNode.options.maxItems || 1000);
            newNode.options.minItems = Math.max(schema.minItems || 0, newNode.options.minItems || 0);
            if (!newNode.options.minItems && isInputRequired(jsf.schema, schemaPointer)) {
                newNode.options.minItems = 1;
            }
            if (!hasOwn(newNode.options, 'listItems')) {
                newNode.options.listItems = 1;
            }
            newNode.options.tupleItems = isArray(schema.items) ? schema.items.length : 0;
            if (newNode.options.maxItems <= newNode.options.tupleItems) {
                newNode.options.tupleItems = newNode.options.maxItems;
                newNode.options.listItems = 0;
            }
            else if (newNode.options.maxItems <
                newNode.options.tupleItems + newNode.options.listItems) {
                newNode.options.listItems = newNode.options.maxItems - newNode.options.tupleItems;
            }
            else if (newNode.options.minItems >
                newNode.options.tupleItems + newNode.options.listItems) {
                newNode.options.listItems = newNode.options.minItems - newNode.options.tupleItems;
            }
            if (!nodeDataMap.has('maxItems')) {
                nodeDataMap.set('maxItems', newNode.options.maxItems);
                nodeDataMap.set('minItems', newNode.options.minItems);
                nodeDataMap.set('tupleItems', newNode.options.tupleItems);
                nodeDataMap.set('listItems', newNode.options.listItems);
            }
            if (!jsf.arrayMap.has(shortDataPointer)) {
                jsf.arrayMap.set(shortDataPointer, newNode.options.tupleItems);
            }
            removable = newNode.options.removable !== false;
            var additionalItemsSchemaPointer = null;
            // If 'items' is an array = tuple items
            if (isArray(schema.items)) {
                newNode.items = [];
                for (var i = 0; i < newNode.options.tupleItems; i++) {
                    var newItem = void 0;
                    var itemRefPointer = removeRecursiveReferences(shortDataPointer + '/' + i, jsf.dataRecursiveRefMap, jsf.arrayMap);
                    var itemRecursive = !itemRefPointer.length ||
                        itemRefPointer !== shortDataPointer + '/' + i;
                    // If removable, add tuple item layout to layoutRefLibrary
                    if (removable && i >= newNode.options.minItems) {
                        if (!hasOwn(jsf.layoutRefLibrary, itemRefPointer)) {
                            // Set to null first to prevent recursive reference from causing endless loop
                            jsf.layoutRefLibrary[itemRefPointer] = null;
                            jsf.layoutRefLibrary[itemRefPointer] = buildLayoutFromSchema(jsf, widgetLibrary, isArray(nodeValue) ? nodeValue[i] : null, schemaPointer + '/items/' + i, itemRecursive ? '' : dataPointer + '/' + i, true, 'tuple', true, true, itemRecursive ? dataPointer + '/' + i : '');
                            if (itemRecursive) {
                                jsf.layoutRefLibrary[itemRefPointer].recursiveReference = true;
                            }
                        }
                        newItem = getLayoutNode({
                            $ref: itemRefPointer,
                            dataPointer: dataPointer + '/' + i,
                            recursiveReference: itemRecursive,
                        }, jsf, widgetLibrary, isArray(nodeValue) ? nodeValue[i] : null);
                    }
                    else {
                        newItem = buildLayoutFromSchema(jsf, widgetLibrary, isArray(nodeValue) ? nodeValue[i] : null, schemaPointer + '/items/' + i, dataPointer + '/' + i, true, 'tuple', false, forRefLibrary, dataPointerPrefix);
                    }
                    if (newItem) {
                        newNode.items.push(newItem);
                    }
                }
                // If 'additionalItems' is an object = additional list items, after tuple items
                if (isObject(schema.additionalItems)) {
                    additionalItemsSchemaPointer = schemaPointer + '/additionalItems';
                }
                // If 'items' is an object = list items only (no tuple items)
            }
            else if (isObject(schema.items)) {
                additionalItemsSchemaPointer = schemaPointer + '/items';
            }
            if (additionalItemsSchemaPointer) {
                var itemRefPointer = removeRecursiveReferences(shortDataPointer + '/-', jsf.dataRecursiveRefMap, jsf.arrayMap);
                var itemRecursive = !itemRefPointer.length ||
                    itemRefPointer !== shortDataPointer + '/-';
                var itemSchemaPointer = removeRecursiveReferences(additionalItemsSchemaPointer, jsf.schemaRecursiveRefMap, jsf.arrayMap);
                // Add list item layout to layoutRefLibrary
                if (itemRefPointer.length && !hasOwn(jsf.layoutRefLibrary, itemRefPointer)) {
                    // Set to null first to prevent recursive reference from causing endless loop
                    jsf.layoutRefLibrary[itemRefPointer] = null;
                    jsf.layoutRefLibrary[itemRefPointer] = buildLayoutFromSchema(jsf, widgetLibrary, null, itemSchemaPointer, itemRecursive ? '' : dataPointer + '/-', true, 'list', removable, true, itemRecursive ? dataPointer + '/-' : '');
                    if (itemRecursive) {
                        jsf.layoutRefLibrary[itemRefPointer].recursiveReference = true;
                    }
                }
                // Add any additional default items
                if (!itemRecursive || newNode.options.required) {
                    var arrayLength = Math.min(Math.max(itemRecursive ? 0 :
                        newNode.options.tupleItems + newNode.options.listItems, isArray(nodeValue) ? nodeValue.length : 0), newNode.options.maxItems);
                    if (newNode.items.length < arrayLength) {
                        for (var i = newNode.items.length; i < arrayLength; i++) {
                            newNode.items.push(getLayoutNode({
                                $ref: itemRefPointer,
                                dataPointer: dataPointer + '/-',
                                recursiveReference: itemRecursive,
                            }, jsf, widgetLibrary, isArray(nodeValue) ? nodeValue[i] : null));
                        }
                    }
                }
                // If needed, add button to add items to array
                if (newNode.options.addable !== false &&
                    newNode.options.minItems < newNode.options.maxItems &&
                    (newNode.items[newNode.items.length - 1] || {}).type !== '$ref') {
                    var buttonText = ((jsf.layoutRefLibrary[itemRefPointer] || {}).options || {}).title;
                    var prefix = buttonText ? 'Add ' : 'Add to ';
                    if (!buttonText) {
                        buttonText = schema.title || fixTitle(JsonPointer.toKey(dataPointer));
                    }
                    if (!/^add\b/i.test(buttonText)) {
                        buttonText = prefix + buttonText;
                    }
                    newNode.items.push({
                        _id: lodash.uniqueId(),
                        arrayItem: true,
                        arrayItemType: 'list',
                        dataPointer: newNode.dataPointer + '/-',
                        options: {
                            listItems: newNode.options.listItems,
                            maxItems: newNode.options.maxItems,
                            minItems: newNode.options.minItems,
                            removable: false,
                            title: buttonText,
                            tupleItems: newNode.options.tupleItems,
                        },
                        recursiveReference: itemRecursive,
                        type: '$ref',
                        widget: widgetLibrary.getWidget('$ref'),
                        $ref: itemRefPointer,
                    });
                }
            }
        }
        else if (newNode.dataType === '$ref') {
            var schemaRef = JsonPointer.compile(schema.$ref);
            var dataRef = JsonPointer.toDataPointer(schemaRef, jsf.schema);
            var buttonText = '';
            // Get newNode title
            if (newNode.options.add) {
                buttonText = newNode.options.add;
            }
            else if (newNode.name && !/^\d+$/.test(newNode.name)) {
                buttonText =
                    (/^add\b/i.test(newNode.name) ? '' : 'Add ') + fixTitle(newNode.name);
                // If newNode doesn't have a title, look for title of parent array item
            }
            else {
                var parentSchema = JsonPointer.get(jsf.schema, schemaPointer, 0, -1);
                if (hasOwn(parentSchema, 'title')) {
                    buttonText = 'Add to ' + parentSchema.title;
                }
                else {
                    var pointerArray = JsonPointer.parse(newNode.dataPointer);
                    buttonText = 'Add to ' + fixTitle(pointerArray[pointerArray.length - 2]);
                }
            }
            Object.assign(newNode, {
                recursiveReference: true,
                widget: widgetLibrary.getWidget('$ref'),
                $ref: dataRef,
            });
            Object.assign(newNode.options, {
                removable: false,
                title: buttonText,
            });
            if (isNumber(JsonPointer.get(jsf.schema, schemaPointer, 0, -1).maxItems)) {
                newNode.options.maxItems =
                    JsonPointer.get(jsf.schema, schemaPointer, 0, -1).maxItems;
            }
            // Add layout template to layoutRefLibrary
            if (dataRef.length) {
                if (!hasOwn(jsf.layoutRefLibrary, dataRef)) {
                    // Set to null first to prevent recursive reference from causing endless loop
                    jsf.layoutRefLibrary[dataRef] = null;
                    var newLayout = buildLayoutFromSchema(jsf, widgetLibrary, null, schemaRef, '', newNode.arrayItem, newNode.arrayItemType, true, true, dataPointer);
                    if (newLayout) {
                        newLayout.recursiveReference = true;
                        jsf.layoutRefLibrary[dataRef] = newLayout;
                    }
                    else {
                        delete jsf.layoutRefLibrary[dataRef];
                    }
                }
                else if (!jsf.layoutRefLibrary[dataRef].recursiveReference) {
                    jsf.layoutRefLibrary[dataRef].recursiveReference = true;
                }
            }
        }
        return newNode;
    }
    /**
     * 'mapLayout' function
     *
     * Creates a new layout by running each element in an existing layout through
     * an iteratee. Recursively maps within array elements 'items' and 'tabs'.
     * The iteratee is invoked with four arguments: (value, index, layout, path)
     *
     * The returned layout may be longer (or shorter) then the source layout.
     *
     * If an item from the source layout returns multiple items (as '*' usually will),
     * this function will keep all returned items in-line with the surrounding items.
     *
     * If an item from the source layout causes an error and returns null, it is
     * skipped without error, and the function will still return all non-null items.
     *
     * @param  { any[] } layout - the layout to map
     * @param  { (v: any, i?: number, l?: any, p?: string) => any }
     *   function - the funciton to invoke on each element
     * @param  { string|string[] = '' } layoutPointer - the layoutPointer to layout, inside rootLayout
     * @param  { any[] = layout } rootLayout - the root layout, which conatins layout
     * @return { any[] }
     */
    function mapLayout(layout, fn, layoutPointer, rootLayout) {
        if (layoutPointer === void 0) {
            layoutPointer = '';
        }
        if (rootLayout === void 0) {
            rootLayout = layout;
        }
        var indexPad = 0;
        var newLayout = [];
        forEach(layout, function (item, index) {
            var realIndex = +index + indexPad;
            var newLayoutPointer = layoutPointer + '/' + realIndex;
            var newNode = copy(item);
            var itemsArray = [];
            if (isObject(item)) {
                if (hasOwn(item, 'tabs')) {
                    item.items = item.tabs;
                    delete item.tabs;
                }
                if (hasOwn(item, 'items')) {
                    itemsArray = isArray(item.items) ? item.items : [item.items];
                }
            }
            if (itemsArray.length) {
                newNode.items = mapLayout(itemsArray, fn, newLayoutPointer + '/items', rootLayout);
            }
            newNode = fn(newNode, realIndex, newLayoutPointer, rootLayout);
            if (!isDefined(newNode)) {
                indexPad--;
            }
            else {
                if (isArray(newNode)) {
                    indexPad += newNode.length - 1;
                }
                newLayout = newLayout.concat(newNode);
            }
        });
        return newLayout;
    }
    /**
     * 'getLayoutNode' function
     * Copy a new layoutNode from layoutRefLibrary
     *
     * @param  { any } refNode -
     * @param  { any } layoutRefLibrary -
     * @param  { any = null } widgetLibrary -
     * @param  { any = null } nodeValue -
     * @return { any } copied layoutNode
     */
    function getLayoutNode(refNode, jsf, widgetLibrary, nodeValue) {
        if (widgetLibrary === void 0) {
            widgetLibrary = null;
        }
        if (nodeValue === void 0) {
            nodeValue = null;
        }
        // If recursive reference and building initial layout, return Add button
        if (refNode.recursiveReference && widgetLibrary) {
            var newLayoutNode = lodash.cloneDeep(refNode);
            if (!newLayoutNode.options) {
                newLayoutNode.options = {};
            }
            Object.assign(newLayoutNode, {
                recursiveReference: true,
                widget: widgetLibrary.getWidget('$ref'),
            });
            Object.assign(newLayoutNode.options, {
                removable: false,
                title: 'Add ' + newLayoutNode.$ref,
            });
            return newLayoutNode;
            // Otherwise, return referenced layout
        }
        else {
            var newLayoutNode = jsf.layoutRefLibrary[refNode.$ref];
            // If value defined, build new node from schema (to set array lengths)
            if (isDefined(nodeValue)) {
                newLayoutNode = buildLayoutFromSchema(jsf, widgetLibrary, nodeValue, JsonPointer.toSchemaPointer(refNode.$ref, jsf.schema), refNode.$ref, newLayoutNode.arrayItem, newLayoutNode.arrayItemType, newLayoutNode.options.removable, false);
            }
            else {
                // If value not defined, copy node from layoutRefLibrary
                newLayoutNode = lodash.cloneDeep(newLayoutNode);
                JsonPointer.forEachDeep(newLayoutNode, function (subNode, pointer) {
                    // Reset all _id's in newLayoutNode to unique values
                    if (hasOwn(subNode, '_id')) {
                        subNode._id = lodash.uniqueId();
                    }
                    // If adding a recursive item, prefix current dataPointer
                    // to all dataPointers in new layoutNode
                    if (refNode.recursiveReference && hasOwn(subNode, 'dataPointer')) {
                        subNode.dataPointer = refNode.dataPointer + subNode.dataPointer;
                    }
                });
            }
            return newLayoutNode;
        }
    }
    /**
     * 'buildTitleMap' function
     *
     * @param  { any } titleMap -
     * @param  { any } enumList -
     * @param  { boolean = true } fieldRequired -
     * @param  { boolean = true } flatList -
     * @return { TitleMapItem[] }
     */
    function buildTitleMap(titleMap, enumList, fieldRequired, flatList) {
        if (fieldRequired === void 0) {
            fieldRequired = true;
        }
        if (flatList === void 0) {
            flatList = true;
        }
        var newTitleMap = [];
        var hasEmptyValue = false;
        if (titleMap) {
            if (isArray(titleMap)) {
                if (enumList) {
                    try {
                        for (var _a = tslib.__values(Object.keys(titleMap)), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var i = _b.value;
                            if (isObject(titleMap[i])) {
                                // JSON Form style
                                var value = titleMap[i].value;
                                if (enumList.includes(value)) {
                                    var name_1 = titleMap[i].name;
                                    newTitleMap.push({ name: name_1, value: value });
                                    if (value === undefined || value === null) {
                                        hasEmptyValue = true;
                                    }
                                }
                            }
                            else if (isString(titleMap[i])) {
                                // React Jsonschema Form style
                                if (i < enumList.length) {
                                    var name_2 = titleMap[i];
                                    var value = enumList[i];
                                    newTitleMap.push({ name: name_2, value: value });
                                    if (value === undefined || value === null) {
                                        hasEmptyValue = true;
                                    }
                                }
                            }
                        }
                    }
                    catch (e_2_1) {
                        e_2 = { error: e_2_1 };
                    }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return))
                                _c.call(_a);
                        }
                        finally {
                            if (e_2)
                                throw e_2.error;
                        }
                    }
                }
                else {
                    // If array titleMap and no enum list, just return the titleMap - Angular Schema Form style
                    newTitleMap = titleMap;
                    if (!fieldRequired) {
                        hasEmptyValue = !!newTitleMap
                            .filter(function (i) { return i.value === undefined || i.value === null; })
                            .length;
                    }
                }
            }
            else if (enumList) {
                try {
                    // Alternate JSON Form style, with enum list
                    for (var _d = tslib.__values(Object.keys(enumList)), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var i = _e.value;
                        var value = enumList[i];
                        if (hasOwn(titleMap, value)) {
                            var name_3 = titleMap[value];
                            newTitleMap.push({ name: name_3, value: value });
                            if (value === undefined || value === null) {
                                hasEmptyValue = true;
                            }
                        }
                    }
                }
                catch (e_3_1) {
                    e_3 = { error: e_3_1 };
                }
                finally {
                    try {
                        if (_e && !_e.done && (_f = _d.return))
                            _f.call(_d);
                    }
                    finally {
                        if (e_3)
                            throw e_3.error;
                    }
                }
            }
            else {
                try {
                    // Alternate JSON Form style, without enum list
                    for (var _g = tslib.__values(Object.keys(titleMap)), _h = _g.next(); !_h.done; _h = _g.next()) {
                        var value = _h.value;
                        var name_4 = titleMap[value];
                        newTitleMap.push({ name: name_4, value: value });
                        if (value === undefined || value === null) {
                            hasEmptyValue = true;
                        }
                    }
                }
                catch (e_4_1) {
                    e_4 = { error: e_4_1 };
                }
                finally {
                    try {
                        if (_h && !_h.done && (_j = _g.return))
                            _j.call(_g);
                    }
                    finally {
                        if (e_4)
                            throw e_4.error;
                    }
                }
            }
        }
        else if (enumList) {
            try {
                // Build map from enum list alone
                for (var _k = tslib.__values(Object.keys(enumList)), _l = _k.next(); !_l.done; _l = _k.next()) {
                    var i = _l.value;
                    var name_5 = enumList[i];
                    var value = enumList[i];
                    newTitleMap.push({ name: name_5, value: value });
                    if (value === undefined || value === null) {
                        hasEmptyValue = true;
                    }
                }
            }
            catch (e_5_1) {
                e_5 = { error: e_5_1 };
            }
            finally {
                try {
                    if (_l && !_l.done && (_m = _k.return))
                        _m.call(_k);
                }
                finally {
                    if (e_5)
                        throw e_5.error;
                }
            }
        }
        else {
            // If no titleMap and no enum list, return default map of boolean values
            newTitleMap = [{ name: 'True', value: true }, { name: 'False', value: false }];
        }
        // Does titleMap have groups?
        if (newTitleMap.some(function (title) { return hasOwn(title, 'group'); })) {
            hasEmptyValue = false;
            // If flatList = true, flatten items & update name to group: name
            if (flatList) {
                newTitleMap = newTitleMap.reduce(function (groupTitleMap, title) {
                    if (hasOwn(title, 'group')) {
                        if (isArray(title.items)) {
                            groupTitleMap = tslib.__spread(groupTitleMap, title.items.map(function (item) { return (Object.assign({}, item, { name: title.group + ": " + item.name })); }));
                            if (title.items.some(function (item) { return item.value === undefined || item.value === null; })) {
                                hasEmptyValue = true;
                            }
                        }
                        if (hasOwn(title, 'name') && hasOwn(title, 'value')) {
                            title.name = title.group + ": " + title.name;
                            delete title.group;
                            groupTitleMap.push(title);
                            if (title.value === undefined || title.value === null) {
                                hasEmptyValue = true;
                            }
                        }
                    }
                    else {
                        groupTitleMap.push(title);
                        if (title.value === undefined || title.value === null) {
                            hasEmptyValue = true;
                        }
                    }
                    return groupTitleMap;
                }, []);
                // If flatList = false, combine items from matching groups
            }
            else {
                newTitleMap = newTitleMap.reduce(function (groupTitleMap, title) {
                    if (hasOwn(title, 'group')) {
                        if (title.group !== (groupTitleMap[groupTitleMap.length - 1] || {}).group) {
                            groupTitleMap.push({ group: title.group, items: title.items || [] });
                        }
                        if (hasOwn(title, 'name') && hasOwn(title, 'value')) {
                            groupTitleMap[groupTitleMap.length - 1].items
                                .push({ name: title.name, value: title.value });
                            if (title.value === undefined || title.value === null) {
                                hasEmptyValue = true;
                            }
                        }
                    }
                    else {
                        groupTitleMap.push(title);
                        if (title.value === undefined || title.value === null) {
                            hasEmptyValue = true;
                        }
                    }
                    return groupTitleMap;
                }, []);
            }
        }
        if (!fieldRequired && !hasEmptyValue) {
            newTitleMap.unshift({ name: '<em>None</em>', value: null });
        }
        return newTitleMap;
        var e_2, _c, e_3, _f, e_4, _j, e_5, _m;
    }
    var enValidationMessages = {
        // Default English error messages
        required: 'This field is required.',
        minLength: 'Must be {{minimumLength}} characters or longer (current length: {{currentLength}})',
        maxLength: 'Must be {{maximumLength}} characters or shorter (current length: {{currentLength}})',
        pattern: 'Must match pattern: {{requiredPattern}}',
        format: function (error) {
            switch (error.requiredFormat) {
                case 'date':
                    return 'Must be a date, like "2000-12-31"';
                case 'time':
                    return 'Must be a time, like "16:20" or "03:14:15.9265"';
                case 'date-time':
                    return 'Must be a date-time, like "2000-03-14T01:59" or "2000-03-14T01:59:26.535Z"';
                case 'email':
                    return 'Must be an email address, like "name@example.com"';
                case 'hostname':
                    return 'Must be a hostname, like "example.com"';
                case 'ipv4':
                    return 'Must be an IPv4 address, like "127.0.0.1"';
                case 'ipv6':
                    return 'Must be an IPv6 address, like "1234:5678:9ABC:DEF0:1234:5678:9ABC:DEF0"';
                // TODO: add examples for 'uri', 'uri-reference', and 'uri-template'
                // case 'uri': case 'uri-reference': case 'uri-template':
                case 'url':
                    return 'Must be a url, like "http://www.example.com/page.html"';
                case 'uuid':
                    return 'Must be a uuid, like "12345678-9ABC-DEF0-1234-56789ABCDEF0"';
                case 'color':
                    return 'Must be a color, like "#FFFFFF" or "rgb(255, 255, 255)"';
                case 'json-pointer':
                    return 'Must be a JSON Pointer, like "/pointer/to/something"';
                case 'relative-json-pointer':
                    return 'Must be a relative JSON Pointer, like "2/pointer/to/something"';
                case 'regex':
                    return 'Must be a regular expression, like "(1-)?\\d{3}-\\d{3}-\\d{4}"';
                default:
                    return 'Must be a correctly formatted ' + error.requiredFormat;
            }
        },
        minimum: 'Must be {{minimumValue}} or more',
        exclusiveMinimum: 'Must be more than {{exclusiveMinimumValue}}',
        maximum: 'Must be {{maximumValue}} or less',
        exclusiveMaximum: 'Must be less than {{exclusiveMaximumValue}}',
        multipleOf: function (error) {
            if ((1 / error.multipleOfValue) % 10 === 0) {
                var decimals = Math.log10(1 / error.multipleOfValue);
                return "Must have " + decimals + " or fewer decimal places.";
            }
            else {
                return "Must be a multiple of " + error.multipleOfValue + ".";
            }
        },
        minProperties: 'Must have {{minimumProperties}} or more items (current items: {{currentProperties}})',
        maxProperties: 'Must have {{maximumProperties}} or fewer items (current items: {{currentProperties}})',
        minItems: 'Must have {{minimumItems}} or more items (current items: {{currentItems}})',
        maxItems: 'Must have {{maximumItems}} or fewer items (current items: {{currentItems}})',
        uniqueItems: 'All items must be unique',
    };
    var frValidationMessages = {
        // French error messages
        required: 'Est obligatoire.',
        minLength: 'Doit avoir minimum {{minimumLength}} caractères (actuellement: {{currentLength}})',
        maxLength: 'Doit avoir maximum {{maximumLength}} caractères (actuellement: {{currentLength}})',
        pattern: 'Doit respecter: {{requiredPattern}}',
        format: function (error) {
            switch (error.requiredFormat) {
                case 'date':
                    return 'Doit être une date, tel que "2000-12-31"';
                case 'time':
                    return 'Doit être une heure, tel que "16:20" ou "03:14:15.9265"';
                case 'date-time':
                    return 'Doit être une date et une heure, tel que "2000-03-14T01:59" ou "2000-03-14T01:59:26.535Z"';
                case 'email':
                    return 'Doit être une adresse e-mail, tel que "name@example.com"';
                case 'hostname':
                    return 'Doit être un nom de domaine, tel que "example.com"';
                case 'ipv4':
                    return 'Doit être une adresse IPv4, tel que "127.0.0.1"';
                case 'ipv6':
                    return 'Doit être une adresse IPv6, tel que "1234:5678:9ABC:DEF0:1234:5678:9ABC:DEF0"';
                // TODO: add examples for 'uri', 'uri-reference', and 'uri-template'
                // case 'uri': case 'uri-reference': case 'uri-template':
                case 'url':
                    return 'Doit être une URL, tel que "http://www.example.com/page.html"';
                case 'uuid':
                    return 'Doit être un UUID, tel que "12345678-9ABC-DEF0-1234-56789ABCDEF0"';
                case 'color':
                    return 'Doit être une couleur, tel que "#FFFFFF" or "rgb(255, 255, 255)"';
                case 'json-pointer':
                    return 'Doit être un JSON Pointer, tel que "/pointer/to/something"';
                case 'relative-json-pointer':
                    return 'Doit être un relative JSON Pointer, tel que "2/pointer/to/something"';
                case 'regex':
                    return 'Doit être une expression régulière, tel que "(1-)?\\d{3}-\\d{3}-\\d{4}"';
                default:
                    return 'Doit être avoir le format correct: ' + error.requiredFormat;
            }
        },
        minimum: 'Doit être supérieur à {{minimumValue}}',
        exclusiveMinimum: 'Doit avoir minimum {{exclusiveMinimumValue}} charactères',
        maximum: 'Doit être inférieur à {{maximumValue}}',
        exclusiveMaximum: 'Doit avoir maximum {{exclusiveMaximumValue}} charactères',
        multipleOf: function (error) {
            if ((1 / error.multipleOfValue) % 10 === 0) {
                var decimals = Math.log10(1 / error.multipleOfValue);
                return "Doit comporter " + decimals + " ou moins de decimales.";
            }
            else {
                return "Doit \u00EAtre un multiple de " + error.multipleOfValue + ".";
            }
        },
        minProperties: 'Doit comporter au minimum {{minimumProperties}} éléments',
        maxProperties: 'Doit comporter au maximum {{maximumProperties}} éléments',
        minItems: 'Doit comporter au minimum {{minimumItems}} éléments',
        maxItems: 'Doit comporter au maximum {{minimumItems}} éléments',
        uniqueItems: 'Tous les éléments doivent être uniques',
    };
    var JsonSchemaFormService = (function () {
        function JsonSchemaFormService() {
            this.JsonFormCompatibility = false;
            this.ReactJsonSchemaFormCompatibility = false;
            this.AngularSchemaFormCompatibility = false;
            this.tpldata = {};
            this.ajvOptions = { allErrors: true, jsonPointers: true, unknownFormats: 'ignore' };
            this.ajv = new Ajv(this.ajvOptions);
            this.validateFormData = null;
            this.formValues = {};
            this.data = {};
            this.schema = {};
            this.layout = [];
            this.formGroupTemplate = {};
            this.formGroup = null;
            this.framework = null;
            this.validData = null;
            this.isValid = null;
            this.ajvErrors = null;
            this.validationErrors = null;
            this.dataErrors = new Map();
            this.formValueSubscription = null;
            this.dataChanges = new Subject.Subject();
            this.isValidChanges = new Subject.Subject();
            this.validationErrorChanges = new Subject.Subject();
            this.arrayMap = new Map();
            this.dataMap = new Map();
            this.dataRecursiveRefMap = new Map();
            this.schemaRecursiveRefMap = new Map();
            this.schemaRefLibrary = {};
            this.layoutRefLibrary = { '': null };
            this.templateRefLibrary = {};
            this.hasRootReference = false;
            this.language = 'en-US';
            // Default global form options
            this.defaultFormOptions = {
                addSubmit: 'auto',
                // Add a submit button if layout does not have one?
                // for addSubmit: true = always, false = never,
                // 'auto' = only if layout is undefined (form is built from schema alone)
                debug: false,
                // Show debugging output?
                disableInvalidSubmit: true,
                // Disable submit if form invalid?
                formDisabled: false,
                // Set entire form as disabled? (not editable, and disables outputs)
                formReadonly: false,
                // Set entire form as read only? (not editable, but outputs still enabled)
                fieldsRequired: false,
                // (set automatically) Are there any required fields in the form?
                framework: 'no-framework',
                // The framework to load
                loadExternalAssets: false,
                // Load external css and JavaScript for framework?
                pristine: { errors: true, success: true },
                supressPropertyTitles: false,
                setSchemaDefaults: 'auto',
                // Set fefault values from schema?
                // true = always set (unless overridden by layout default or formValues)
                // false = never set
                // 'auto' = set in addable components, and everywhere if formValues not set
                setLayoutDefaults: 'auto',
                // Set fefault values from layout?
                // true = always set (unless overridden by formValues)
                // false = never set
                // 'auto' = set in addable components, and everywhere if formValues not set
                validateOnRender: 'auto',
                // Validate fields immediately, before they are touched?
                // true = validate all fields immediately
                // false = only validate fields after they are touched by user
                // 'auto' = validate fields with values immediately, empty fields after they are touched
                widgets: {},
                // Any custom widgets to load
                defautWidgetOptions: {
                    // Default options for form control widgets
                    listItems: 1,
                    // Number of list items to initially add to arrays with no default value
                    addable: true,
                    // Allow adding items to an array or $ref point?
                    orderable: true,
                    // Allow reordering items within an array?
                    removable: true,
                    // Allow removing items from an array or $ref point?
                    enableErrorState: true,
                    // Apply 'has-error' class when field fails validation?
                    // disableErrorState: false, // Don't apply 'has-error' class when field fails validation?
                    enableSuccessState: true,
                    // Apply 'has-success' class when field validates?
                    // disableSuccessState: false, // Don't apply 'has-success' class when field validates?
                    feedback: false,
                    // Show inline feedback icons?
                    feedbackOnRender: false,
                    // Show errorMessage on Render?
                    notitle: false,
                    // Hide title?
                    disabled: false,
                    // Set control as disabled? (not editable, and excluded from output)
                    readonly: false,
                    // Set control as read only? (not editable, but included in output)
                    returnEmptyFields: true,
                    // return values for fields that contain no data?
                    validationMessages: {} // set by setLanguage()
                },
            };
            this.setLanguage(this.language);
        }
        JsonSchemaFormService.prototype.setLanguage = function (language) {
            if (language === void 0) {
                language = 'en-US';
            }
            this.language = language;
            var validationMessages = language.slice(0, 2) === 'fr' ?
                frValidationMessages : enValidationMessages;
            this.defaultFormOptions.defautWidgetOptions.validationMessages =
                lodash.cloneDeep(validationMessages);
        };
        JsonSchemaFormService.prototype.getData = function () { return this.data; };
        JsonSchemaFormService.prototype.getSchema = function () { return this.schema; };
        JsonSchemaFormService.prototype.getLayout = function () { return this.layout; };
        JsonSchemaFormService.prototype.resetAllValues = function () {
            this.JsonFormCompatibility = false;
            this.ReactJsonSchemaFormCompatibility = false;
            this.AngularSchemaFormCompatibility = false;
            this.tpldata = {};
            this.validateFormData = null;
            this.formValues = {};
            this.schema = {};
            this.layout = [];
            this.formGroupTemplate = {};
            this.formGroup = null;
            this.framework = null;
            this.data = {};
            this.validData = null;
            this.isValid = null;
            this.validationErrors = null;
            this.arrayMap = new Map();
            this.dataMap = new Map();
            this.dataRecursiveRefMap = new Map();
            this.schemaRecursiveRefMap = new Map();
            this.layoutRefLibrary = {};
            this.schemaRefLibrary = {};
            this.templateRefLibrary = {};
            this.formOptions = lodash.cloneDeep(this.defaultFormOptions);
        };
        /**
           * 'buildRemoteError' function
           *
           * Example errors:
           * {
           *   last_name: [ {
           *     message: 'Last name must by start with capital letter.',
           *     code: 'capital_letter'
           *   } ],
           *   email: [ {
           *     message: 'Email must be from example.com domain.',
           *     code: 'special_domain'
           *   }, {
           *     message: 'Email must contain an @ symbol.',
           *     code: 'at_symbol'
           *   } ]
           * }
           * @param {ErrorMessages} errors
           */
        JsonSchemaFormService.prototype.buildRemoteError = function (errors) {
            var _this = this;
            forEach(errors, function (value, key) {
                if (key in _this.formGroup.controls) {
                    try {
                        for (var value_1 = tslib.__values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
                            var error = value_1_1.value;
                            var err = {};
                            err[error['code']] = error['message'];
                            _this.formGroup.get(key).setErrors(err, { emitEvent: true });
                        }
                    }
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (value_1_1 && !value_1_1.done && (_a = value_1.return))
                                _a.call(value_1);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
                    }
                }
                var e_1, _a;
            });
        };
        JsonSchemaFormService.prototype.validateData = function (newValue, updateSubscriptions) {
            if (updateSubscriptions === void 0) {
                updateSubscriptions = true;
            }
            // Format raw form data to correct data types
            this.data = formatFormData(newValue, this.dataMap, this.dataRecursiveRefMap, this.arrayMap, this.formOptions.returnEmptyFields);
            this.isValid = this.validateFormData(this.data);
            this.validData = this.isValid ? this.data : null;
            var compileErrors = function (errors) {
                var compiledErrors = {};
                (errors || []).forEach(function (error) {
                    if (!compiledErrors[error.dataPath]) {
                        compiledErrors[error.dataPath] = [];
                    }
                    compiledErrors[error.dataPath].push(error.message);
                });
                return compiledErrors;
            };
            this.ajvErrors = this.validateFormData.errors;
            this.validationErrors = compileErrors(this.validateFormData.errors);
            if (updateSubscriptions) {
                this.dataChanges.next(this.data);
                this.isValidChanges.next(this.isValid);
                this.validationErrorChanges.next(this.ajvErrors);
            }
        };
        JsonSchemaFormService.prototype.buildFormGroupTemplate = function (formValues, setValues) {
            if (formValues === void 0) {
                formValues = null;
            }
            if (setValues === void 0) {
                setValues = true;
            }
            this.formGroupTemplate = buildFormGroupTemplate(this, formValues, setValues);
        };
        JsonSchemaFormService.prototype.buildFormGroup = function () {
            var _this = this;
            this.formGroup = buildFormGroup(this.formGroupTemplate);
            if (this.formGroup) {
                this.compileAjvSchema();
                this.validateData(this.formGroup.value);
                // Set up observables to emit data and validation info when form data changes
                if (this.formValueSubscription) {
                    this.formValueSubscription.unsubscribe();
                }
                this.formValueSubscription = this.formGroup.valueChanges
                    .subscribe(function (formValue) { return _this.validateData(formValue); });
            }
        };
        JsonSchemaFormService.prototype.buildLayout = function (widgetLibrary) {
            this.layout = buildLayout(this, widgetLibrary);
        };
        JsonSchemaFormService.prototype.setOptions = function (newOptions) {
            if (isObject(newOptions)) {
                var addOptions = lodash.cloneDeep(newOptions);
                // Backward compatibility for 'defaultOptions' (renamed 'defautWidgetOptions')
                if (isObject(addOptions.defaultOptions)) {
                    Object.assign(this.formOptions.defautWidgetOptions, addOptions.defaultOptions);
                    delete addOptions.defaultOptions;
                }
                if (isObject(addOptions.defautWidgetOptions)) {
                    Object.assign(this.formOptions.defautWidgetOptions, addOptions.defautWidgetOptions);
                    delete addOptions.defautWidgetOptions;
                }
                Object.assign(this.formOptions, addOptions);
                // convert disableErrorState / disableSuccessState to enable...
                var globalDefaults_1 = this.formOptions.defautWidgetOptions;
                ['ErrorState', 'SuccessState']
                    .filter(function (suffix) { return hasOwn(globalDefaults_1, 'disable' + suffix); })
                    .forEach(function (suffix) {
                    globalDefaults_1['enable' + suffix] = !globalDefaults_1['disable' + suffix];
                    delete globalDefaults_1['disable' + suffix];
                });
            }
        };
        JsonSchemaFormService.prototype.compileAjvSchema = function () {
            if (!this.validateFormData) {
                // if 'ui:order' exists in properties, move it to root before compiling with ajv
                if (Array.isArray(this.schema.properties['ui:order'])) {
                    this.schema['ui:order'] = this.schema.properties['ui:order'];
                    delete this.schema.properties['ui:order'];
                }
                this.ajv.removeSchema(this.schema);
                this.validateFormData = this.ajv.compile(this.schema);
            }
        };
        JsonSchemaFormService.prototype.buildSchemaFromData = function (data, requireAllFields) {
            if (requireAllFields === void 0) {
                requireAllFields = false;
            }
            if (data) {
                return buildSchemaFromData(data, requireAllFields);
            }
            this.schema = buildSchemaFromData(this.formValues, requireAllFields);
        };
        JsonSchemaFormService.prototype.buildSchemaFromLayout = function (layout) {
            if (layout) {
                return buildSchemaFromLayout(layout);
            }
            this.schema = buildSchemaFromLayout(this.layout);
        };
        JsonSchemaFormService.prototype.setTpldata = function (newTpldata) {
            if (newTpldata === void 0) {
                newTpldata = {};
            }
            this.tpldata = newTpldata;
        };
        JsonSchemaFormService.prototype.parseText = function (text, value, values, key) {
            var _this = this;
            if (text === void 0) {
                text = '';
            }
            if (value === void 0) {
                value = {};
            }
            if (values === void 0) {
                values = {};
            }
            if (key === void 0) {
                key = null;
            }
            if (!text || !/{{.+?}}/.test(text)) {
                return text;
            }
            return text.replace(/{{(.+?)}}/g, function () {
                var a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    a[_i] = arguments[_i];
                }
                return _this.parseExpression(a[1], value, values, key, _this.tpldata);
            });
        };
        JsonSchemaFormService.prototype.parseExpression = function (expression, value, values, key, tpldata) {
            var _this = this;
            if (expression === void 0) {
                expression = '';
            }
            if (value === void 0) {
                value = {};
            }
            if (values === void 0) {
                values = {};
            }
            if (key === void 0) {
                key = null;
            }
            if (tpldata === void 0) {
                tpldata = null;
            }
            if (typeof expression !== 'string') {
                return '';
            }
            var index = typeof key === 'number' ? (key + 1) + '' : (key || '');
            expression = expression.trim();
            if ((expression[0] === '\'' || expression[0] === '"') &&
                expression[0] === expression[expression.length - 1] &&
                expression.slice(1, expression.length - 1).indexOf(expression[0]) === -1) {
                return expression.slice(1, expression.length - 1);
            }
            if (expression === 'idx' || expression === '$index') {
                return index;
            }
            if (expression === 'value' && !hasOwn(values, 'value')) {
                return value;
            }
            if (['"', '\'', ' ', '||', '&&', '+'].every(function (delim) { return expression.indexOf(delim) === -1; })) {
                var pointer = JsonPointer.parseObjectPath(expression);
                return pointer[0] === 'value' && JsonPointer.has(value, pointer.slice(1)) ?
                    JsonPointer.get(value, pointer.slice(1)) :
                    pointer[0] === 'values' && JsonPointer.has(values, pointer.slice(1)) ?
                        JsonPointer.get(values, pointer.slice(1)) :
                        pointer[0] === 'tpldata' && JsonPointer.has(tpldata, pointer.slice(1)) ?
                            JsonPointer.get(tpldata, pointer.slice(1)) :
                            JsonPointer.has(values, pointer) ? JsonPointer.get(values, pointer) : '';
            }
            if (expression.indexOf('[idx]') > -1) {
                expression = expression.replace(/\[idx\]/g, index);
            }
            if (expression.indexOf('[$index]') > -1) {
                expression = expression.replace(/\[$index\]/g, index);
            }
            // TODO: Improve expression evaluation by parsing quoted strings first
            // let expressionArray = expression.match(/([^"']+|"[^"]+"|'[^']+')/g);
            if (expression.indexOf('||') > -1) {
                return expression.split('||').reduce(function (all, term) { return all || _this.parseExpression(term, value, values, key, tpldata); }, '');
            }
            if (expression.indexOf('&&') > -1) {
                return expression.split('&&').reduce(function (all, term) { return all && _this.parseExpression(term, value, values, key, tpldata); }, ' ').trim();
            }
            if (expression.indexOf('+') > -1) {
                return expression.split('+')
                    .map(function (term) { return _this.parseExpression(term, value, values, key, tpldata); })
                    .join('');
            }
            return '';
        };
        JsonSchemaFormService.prototype.setArrayItemTitle = function (parentCtx, childNode, index) {
            if (parentCtx === void 0) {
                parentCtx = {};
            }
            if (childNode === void 0) {
                childNode = null;
            }
            if (index === void 0) {
                index = null;
            }
            var parentNode = parentCtx.layoutNode;
            var parentValues = this.getFormControlValue(parentCtx);
            var isArrayItem = (parentNode.type || '').slice(-5) === 'array' && isArray(parentValues);
            var text = JsonPointer.getFirst(isArrayItem && childNode.type !== '$ref' ? [
                [childNode, '/options/legend'],
                [childNode, '/options/title'],
                [parentNode, '/options/title'],
                [parentNode, '/options/legend'],
            ] : [
                [childNode, '/options/title'],
                [childNode, '/options/legend'],
                [parentNode, '/options/title'],
                [parentNode, '/options/legend']
            ]);
            if (!text) {
                return text;
            }
            var childValue = isArray(parentValues) && index < parentValues.length ?
                parentValues[index] : parentValues;
            return this.parseText(text, childValue, parentValues, index);
        };
        JsonSchemaFormService.prototype.setItemTitle = function (ctx) {
            return !ctx.options.title && /^(\d+|-)$/.test(ctx.layoutNode.name) ?
                null :
                this.parseText(ctx.options.title || toTitleCase(ctx.layoutNode.name), this.getFormControlValue(this), (this.getFormControlGroup(this) || {}).value, ctx.dataIndex[ctx.dataIndex.length - 1]);
        };
        JsonSchemaFormService.prototype.evaluateCondition = function (layoutNode, dataIndex) {
            var arrayIndex = dataIndex && dataIndex[dataIndex.length - 1];
            var result = true;
            if (hasValue((layoutNode.options || {}).condition)) {
                if (typeof layoutNode.options.condition === 'string') {
                    var pointer = layoutNode.options.condition;
                    if (hasValue(arrayIndex)) {
                        pointer = pointer.replace('[arrayIndex]', "[" + arrayIndex + "]");
                    }
                    pointer = JsonPointer.parseObjectPath(pointer);
                    result = !!JsonPointer.get(this.data, pointer);
                    if (!result && pointer[0] === 'model') {
                        result = !!JsonPointer.get({ model: this.data }, pointer);
                    }
                }
                else if (typeof layoutNode.options.condition === 'function') {
                    result = layoutNode.options.condition(this.data);
                }
                else if (typeof layoutNode.options.condition.functionBody === 'string') {
                    try {
                        var dynFn = new Function('model', 'arrayIndices', layoutNode.options.condition.functionBody);
                        result = dynFn(this.data, dataIndex);
                    }
                    catch (e) {
                        result = true;
                        console.error('condition functionBody errored out on evaluation: ' + layoutNode.options.condition.functionBody);
                    }
                }
            }
            return result;
        };
        JsonSchemaFormService.prototype.initializeControl = function (ctx, bind) {
            var _this = this;
            if (bind === void 0) {
                bind = true;
            }
            if (!isObject(ctx)) {
                return false;
            }
            if (isEmpty(ctx.options)) {
                ctx.options = !isEmpty((ctx.layoutNode || {}).options) ?
                    ctx.layoutNode.options : lodash.cloneDeep(this.formOptions);
            }
            ctx.formControl = this.getFormControl(ctx);
            ctx.boundControl = bind && !!ctx.formControl;
            if (ctx.formControl) {
                ctx.controlName = this.getFormControlName(ctx);
                ctx.controlValue = ctx.formControl.value;
                ctx.controlDisabled = ctx.formControl.disabled;
                ctx.options.errorMessage = ctx.formControl.status === 'VALID' ? null :
                    this.formatErrors(ctx.formControl.errors, ctx.options.validationMessages);
                ctx.options.showErrors = this.formOptions.validateOnRender === true ||
                    (this.formOptions.validateOnRender === 'auto' && hasValue(ctx.controlValue));
                ctx.formControl.statusChanges.subscribe(function (status) {
                    return ctx.options.errorMessage = status === 'VALID' ? null :
                        _this.formatErrors(ctx.formControl.errors, ctx.options.validationMessages);
                });
                ctx.formControl.valueChanges.subscribe(function (value) {
                    if (!lodash.isEqual(ctx.controlValue, value)) {
                        ctx.controlValue = value;
                    }
                });
            }
            else {
                ctx.controlName = ctx.layoutNode.name;
                ctx.controlValue = ctx.layoutNode.value || null;
                var dataPointer = this.getDataPointer(ctx);
                if (bind && dataPointer) {
                    console.error("warning: control \"" + dataPointer + "\" is not bound to the Angular FormGroup.");
                }
            }
            return ctx.boundControl;
        };
        JsonSchemaFormService.prototype.formatErrors = function (errors, validationMessages) {
            if (validationMessages === void 0) {
                validationMessages = {};
            }
            if (isEmpty(errors)) {
                return null;
            }
            if (!isObject(validationMessages)) {
                validationMessages = {};
            }
            var addSpaces = function (string) {
                return string[0].toUpperCase() + (string.slice(1) || '')
                    .replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ');
            };
            var formatError = function (error) {
                return typeof error === 'object' ?
                    Object.keys(error).map(function (key) {
                        return error[key] === true ? addSpaces(key) :
                            error[key] === false ? 'Not ' + addSpaces(key) :
                                addSpaces(key) + ': ' + formatError(error[key]);
                    }).join(', ') :
                    addSpaces(error.toString());
            };
            return Object.keys(errors)
                .filter(function (errorKey) { return errorKey !== 'required' || Object.keys(errors).length === 1; })
                .map(function (errorKey) {
                // If validationMessages is a string, return it
                return typeof validationMessages === 'string' ? validationMessages :
                    // If custom error message is a function, return function result
                    typeof validationMessages[errorKey] === 'function' ?
                        validationMessages[errorKey](errors[errorKey]) :
                        // If custom error message is a string, replace placeholders and return
                        typeof validationMessages[errorKey] === 'string' ?
                            // Does error message have any {{property}} placeholders?
                            !/{{.+?}}/.test(validationMessages[errorKey]) ?
                                validationMessages[errorKey] :
                                // Replace {{property}} placeholders with values
                                Object.keys(errors[errorKey])
                                    .reduce(function (errorMessage, errorProperty) { return errorMessage.replace(new RegExp('{{' + errorProperty + '}}', 'g'), errors[errorKey][errorProperty]); }, validationMessages[errorKey]) :
                            // If no custom error message, return formatted error data instead
                            addSpaces(errorKey) + ' Error: ' + formatError(errors[errorKey]);
            }).join('<br>');
        };
        JsonSchemaFormService.prototype.updateValue = function (ctx, value) {
            // Set value of current control
            ctx.controlValue = value;
            if (ctx.boundControl) {
                ctx.formControl.setValue(value);
                ctx.formControl.markAsDirty();
            }
            ctx.layoutNode.value = value;
            // Set values of any related controls in copyValueTo array
            if (isArray(ctx.options.copyValueTo)) {
                try {
                    for (var _a = tslib.__values(ctx.options.copyValueTo), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var item = _b.value;
                        var targetControl = getControl(this.formGroup, item);
                        if (isObject(targetControl) && typeof targetControl.setValue === 'function') {
                            targetControl.setValue(value);
                            targetControl.markAsDirty();
                        }
                    }
                }
                catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_2)
                            throw e_2.error;
                    }
                }
            }
            var e_2, _c;
        };
        JsonSchemaFormService.prototype.updateArrayCheckboxList = function (ctx, checkboxList) {
            var formArray = this.getFormControl(ctx);
            // Remove all existing items
            while (formArray.value.length) {
                formArray.removeAt(0);
            }
            // Re-add an item for each checked box
            var refPointer = removeRecursiveReferences(ctx.layoutNode.dataPointer + '/-', this.dataRecursiveRefMap, this.arrayMap);
            try {
                for (var checkboxList_1 = tslib.__values(checkboxList), checkboxList_1_1 = checkboxList_1.next(); !checkboxList_1_1.done; checkboxList_1_1 = checkboxList_1.next()) {
                    var checkboxItem = checkboxList_1_1.value;
                    if (checkboxItem.checked) {
                        var newFormControl = buildFormGroup(this.templateRefLibrary[refPointer]);
                        newFormControl.setValue(checkboxItem.value);
                        formArray.push(newFormControl);
                    }
                }
            }
            catch (e_3_1) {
                e_3 = { error: e_3_1 };
            }
            finally {
                try {
                    if (checkboxList_1_1 && !checkboxList_1_1.done && (_a = checkboxList_1.return))
                        _a.call(checkboxList_1);
                }
                finally {
                    if (e_3)
                        throw e_3.error;
                }
            }
            formArray.markAsDirty();
            var e_3, _a;
        };
        JsonSchemaFormService.prototype.getFormControl = function (ctx) {
            if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) ||
                ctx.layoutNode.type === '$ref') {
                return null;
            }
            return getControl(this.formGroup, this.getDataPointer(ctx));
        };
        JsonSchemaFormService.prototype.getFormControlValue = function (ctx) {
            if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) ||
                ctx.layoutNode.type === '$ref') {
                return null;
            }
            var control = getControl(this.formGroup, this.getDataPointer(ctx));
            return control ? control.value : null;
        };
        JsonSchemaFormService.prototype.getFormControlGroup = function (ctx) {
            if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer)) {
                return null;
            }
            return getControl(this.formGroup, this.getDataPointer(ctx), true);
        };
        JsonSchemaFormService.prototype.getFormControlName = function (ctx) {
            if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) || !hasValue(ctx.dataIndex)) {
                return null;
            }
            return JsonPointer.toKey(this.getDataPointer(ctx));
        };
        JsonSchemaFormService.prototype.getLayoutArray = function (ctx) {
            return JsonPointer.get(this.layout, this.getLayoutPointer(ctx), 0, -1);
        };
        JsonSchemaFormService.prototype.getParentNode = function (ctx) {
            return JsonPointer.get(this.layout, this.getLayoutPointer(ctx), 0, -2);
        };
        JsonSchemaFormService.prototype.getDataPointer = function (ctx) {
            if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) || !hasValue(ctx.dataIndex)) {
                return null;
            }
            return JsonPointer.toIndexedPointer(ctx.layoutNode.dataPointer, ctx.dataIndex, this.arrayMap);
        };
        JsonSchemaFormService.prototype.getLayoutPointer = function (ctx) {
            if (!hasValue(ctx.layoutIndex)) {
                return null;
            }
            return '/' + ctx.layoutIndex.join('/items/');
        };
        JsonSchemaFormService.prototype.isControlBound = function (ctx) {
            if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) || !hasValue(ctx.dataIndex)) {
                return false;
            }
            var controlGroup = this.getFormControlGroup(ctx);
            var name = this.getFormControlName(ctx);
            return controlGroup ? hasOwn(controlGroup.controls, name) : false;
        };
        JsonSchemaFormService.prototype.addItem = function (ctx, name) {
            if (!ctx.layoutNode || !isDefined(ctx.layoutNode.$ref) ||
                !hasValue(ctx.dataIndex) || !hasValue(ctx.layoutIndex)) {
                return false;
            }
            // Create a new Angular form control from a template in templateRefLibrary
            var newFormGroup = buildFormGroup(this.templateRefLibrary[ctx.layoutNode.$ref]);
            // Add the new form control to the parent formArray or formGroup
            if (ctx.layoutNode.arrayItem) {
                // Add new array item to formArray
                this.getFormControlGroup(ctx).push(newFormGroup);
            }
            else {
                // Add new $ref item to formGroup
                this.getFormControlGroup(ctx)
                    .addControl(name || this.getFormControlName(ctx), newFormGroup);
            }
            // Copy a new layoutNode from layoutRefLibrary
            var newLayoutNode = getLayoutNode(ctx.layoutNode, this);
            newLayoutNode.arrayItem = ctx.layoutNode.arrayItem;
            if (ctx.layoutNode.arrayItemType) {
                newLayoutNode.arrayItemType = ctx.layoutNode.arrayItemType;
            }
            else {
                delete newLayoutNode.arrayItemType;
            }
            if (name) {
                newLayoutNode.name = name;
                newLayoutNode.dataPointer += '/' + JsonPointer.escape(name);
                newLayoutNode.options.title = fixTitle(name);
            }
            // Add the new layoutNode to the form layout
            JsonPointer.insert(this.layout, this.getLayoutPointer(ctx), newLayoutNode);
            return true;
        };
        JsonSchemaFormService.prototype.moveArrayItem = function (ctx, oldIndex, newIndex) {
            if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) ||
                !hasValue(ctx.dataIndex) || !hasValue(ctx.layoutIndex) ||
                !isDefined(oldIndex) || !isDefined(newIndex) || oldIndex === newIndex) {
                return false;
            }
            // Move item in the formArray
            var formArray = this.getFormControlGroup(ctx);
            var arrayItem = formArray.at(oldIndex);
            formArray.removeAt(oldIndex);
            formArray.insert(newIndex, arrayItem);
            formArray.updateValueAndValidity();
            // Move layout item
            var layoutArray = this.getLayoutArray(ctx);
            layoutArray.splice(newIndex, 0, layoutArray.splice(oldIndex, 1)[0]);
            return true;
        };
        JsonSchemaFormService.prototype.removeItem = function (ctx) {
            if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) ||
                !hasValue(ctx.dataIndex) || !hasValue(ctx.layoutIndex)) {
                return false;
            }
            // Remove the Angular form control from the parent formArray or formGroup
            if (ctx.layoutNode.arrayItem) {
                // Remove array item from formArray
                this.getFormControlGroup(ctx)
                    .removeAt(ctx.dataIndex[ctx.dataIndex.length - 1]);
            }
            else {
                // Remove $ref item from formGroup
                this.getFormControlGroup(ctx)
                    .removeControl(this.getFormControlName(ctx));
            }
            // Remove layoutNode from layout
            JsonPointer.remove(this.layout, this.getLayoutPointer(ctx));
            return true;
        };
        return JsonSchemaFormService;
    }());
    JsonSchemaFormService.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    JsonSchemaFormService.ctorParameters = function () { return []; };
    var AddReferenceComponent = (function () {
        function AddReferenceComponent(jsf) {
            this.jsf = jsf;
        }
        AddReferenceComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
        };
        Object.defineProperty(AddReferenceComponent.prototype, "showAddButton", {
            get: function () {
                return !this.layoutNode.arrayItem ||
                    this.layoutIndex[this.layoutIndex.length - 1] < this.options.maxItems;
            },
            enumerable: true,
            configurable: true
        });
        AddReferenceComponent.prototype.addItem = function (event) {
            event.preventDefault();
            this.jsf.addItem(this);
        };
        Object.defineProperty(AddReferenceComponent.prototype, "buttonText", {
            get: function () {
                var parent = {
                    dataIndex: this.dataIndex.slice(0, -1),
                    layoutIndex: this.layoutIndex.slice(0, -1),
                    layoutNode: this.jsf.getParentNode(this)
                };
                return parent.layoutNode.add ||
                    this.jsf.setArrayItemTitle(parent, this.layoutNode, this.itemCount);
            },
            enumerable: true,
            configurable: true
        });
        return AddReferenceComponent;
    }());
    AddReferenceComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'add-reference-widget',
                    template: "\n    <button *ngIf=\"showAddButton\"\n      [class]=\"options?.fieldHtmlClass || ''\"\n      [disabled]=\"options?.readonly\"\n      (click)=\"addItem($event)\">\n      <span *ngIf=\"options?.icon\" [class]=\"options?.icon\"></span>\n      <span *ngIf=\"options?.title\" [innerHTML]=\"buttonText\"></span>\n    </button>",
                    changeDetection: core.ChangeDetectionStrategy.Default,
                },] },
    ];
    /** @nocollapse */
    AddReferenceComponent.ctorParameters = function () {
        return [
            { type: JsonSchemaFormService, },
        ];
    };
    AddReferenceComponent.propDecorators = {
        "layoutNode": [{ type: core.Input },],
        "layoutIndex": [{ type: core.Input },],
        "dataIndex": [{ type: core.Input },],
    };
    // TODO: Add this control
    var OneOfComponent = (function () {
        function OneOfComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
        }
        OneOfComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
            this.jsf.initializeControl(this);
        };
        OneOfComponent.prototype.updateValue = function (event) {
            this.jsf.updateValue(this, event.target.value);
        };
        return OneOfComponent;
    }());
    OneOfComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'one-of-widget',
                    template: "",
                },] },
    ];
    /** @nocollapse */
    OneOfComponent.ctorParameters = function () {
        return [
            { type: JsonSchemaFormService, },
        ];
    };
    OneOfComponent.propDecorators = {
        "layoutNode": [{ type: core.Input },],
        "layoutIndex": [{ type: core.Input },],
        "dataIndex": [{ type: core.Input },],
    };
    var ButtonComponent = (function () {
        function ButtonComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
        }
        ButtonComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
            this.jsf.initializeControl(this);
        };
        ButtonComponent.prototype.updateValue = function (event) {
            if (typeof this.options.onClick === 'function') {
                this.options.onClick(event);
            }
            else {
                this.jsf.updateValue(this, event.target.value);
            }
        };
        return ButtonComponent;
    }());
    ButtonComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'button-widget',
                    template: "\n    <div\n      [class]=\"options?.htmlClass || ''\">\n      <button\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [class]=\"options?.fieldHtmlClass || ''\"\n        [disabled]=\"controlDisabled\"\n        [name]=\"controlName\"\n        [type]=\"layoutNode?.type\"\n        [value]=\"controlValue\"\n        (click)=\"updateValue($event)\">\n        <span *ngIf=\"options?.icon || options?.title\"\n          [class]=\"options?.icon\"\n          [innerHTML]=\"options?.title\"></span>\n      </button>\n    </div>",
                },] },
    ];
    /** @nocollapse */
    ButtonComponent.ctorParameters = function () {
        return [
            { type: JsonSchemaFormService, },
        ];
    };
    ButtonComponent.propDecorators = {
        "layoutNode": [{ type: core.Input },],
        "layoutIndex": [{ type: core.Input },],
        "dataIndex": [{ type: core.Input },],
    };
    var CheckboxComponent = (function () {
        function CheckboxComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
            this.trueValue = true;
            this.falseValue = false;
        }
        CheckboxComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
            this.jsf.initializeControl(this);
            if (this.controlValue === null || this.controlValue === undefined) {
                this.controlValue = this.options.title;
            }
        };
        CheckboxComponent.prototype.updateValue = function (event) {
            event.preventDefault();
            this.jsf.updateValue(this, event.target.checked ? this.trueValue : this.falseValue);
        };
        Object.defineProperty(CheckboxComponent.prototype, "isChecked", {
            get: function () {
                return this.jsf.getFormControlValue(this) === this.trueValue;
            },
            enumerable: true,
            configurable: true
        });
        return CheckboxComponent;
    }());
    CheckboxComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'checkbox-widget',
                    template: "\n    <label\n      [attr.for]=\"'control' + layoutNode?._id\"\n      [class]=\"options?.itemLabelHtmlClass || ''\">\n      <input *ngIf=\"boundControl\"\n        [formControl]=\"formControl\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [class]=\"(options?.fieldHtmlClass || '') + (isChecked ?\n          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :\n          (' ' + (options?.style?.unselected || '')))\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        [readonly]=\"options?.readonly ? 'readonly' : null\"\n        type=\"checkbox\">\n      <input *ngIf=\"!boundControl\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [checked]=\"isChecked ? 'checked' : null\"\n        [class]=\"(options?.fieldHtmlClass || '') + (isChecked ?\n          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :\n          (' ' + (options?.style?.unselected || '')))\"\n        [disabled]=\"controlDisabled\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        [readonly]=\"options?.readonly ? 'readonly' : null\"\n        [value]=\"controlValue\"\n        type=\"checkbox\"\n        (change)=\"updateValue($event)\">\n      <span *ngIf=\"options?.title\"\n        [style.display]=\"options?.notitle ? 'none' : ''\"\n        [innerHTML]=\"options?.title\"></span>\n    </label>",
                },] },
    ];
    /** @nocollapse */
    CheckboxComponent.ctorParameters = function () {
        return [
            { type: JsonSchemaFormService, },
        ];
    };
    CheckboxComponent.propDecorators = {
        "layoutNode": [{ type: core.Input },],
        "layoutIndex": [{ type: core.Input },],
        "dataIndex": [{ type: core.Input },],
    };
    function convertSchemaToDraft6(schema, options) {
        if (options === void 0) {
            options = {};
        }
        var draft = options.draft || null;
        var changed = options.changed || false;
        if (typeof schema !== 'object') {
            return schema;
        }
        if (typeof schema.map === 'function') {
            return tslib.__spread(schema.map(function (subSchema) { return convertSchemaToDraft6(subSchema, { changed: changed, draft: draft }); }));
        }
        var newSchema = Object.assign({}, schema);
        var simpleTypes = ['array', 'boolean', 'integer', 'null', 'number', 'object', 'string'];
        if (typeof newSchema.$schema === 'string' &&
            /http\:\/\/json\-schema\.org\/draft\-0\d\/schema\#/.test(newSchema.$schema)) {
            draft = newSchema.$schema[30];
        }
        // Convert v1-v2 'contentEncoding' to 'media.binaryEncoding'
        // Note: This is only used in JSON hyper-schema (not regular JSON schema)
        if (newSchema.contentEncoding) {
            newSchema.media = { binaryEncoding: newSchema.contentEncoding };
            delete newSchema.contentEncoding;
            changed = true;
        }
        // Convert v1-v3 'extends' to 'allOf'
        if (typeof newSchema.extends === 'object') {
            newSchema.allOf = typeof newSchema.extends.map === 'function' ?
                newSchema.extends.map(function (subSchema) { return convertSchemaToDraft6(subSchema, { changed: changed, draft: draft }); }) :
                [convertSchemaToDraft6(newSchema.extends, { changed: changed, draft: draft })];
            delete newSchema.extends;
            changed = true;
        }
        // Convert v1-v3 'disallow' to 'not'
        if (newSchema.disallow) {
            if (typeof newSchema.disallow === 'string') {
                newSchema.not = { type: newSchema.disallow };
            }
            else if (typeof newSchema.disallow.map === 'function') {
                newSchema.not = {
                    anyOf: newSchema.disallow
                        .map(function (type) { return typeof type === 'object' ? type : { type: type }; })
                };
            }
            delete newSchema.disallow;
            changed = true;
        }
        // Convert v3 string 'dependencies' properties to arrays
        if (typeof newSchema.dependencies === 'object' &&
            Object.keys(newSchema.dependencies)
                .some(function (key) { return typeof newSchema.dependencies[key] === 'string'; })) {
            newSchema.dependencies = Object.assign({}, newSchema.dependencies);
            Object.keys(newSchema.dependencies)
                .filter(function (key) { return typeof newSchema.dependencies[key] === 'string'; })
                .forEach(function (key) { return newSchema.dependencies[key] = [newSchema.dependencies[key]]; });
            changed = true;
        }
        // Convert v1 'maxDecimal' to 'multipleOf'
        if (typeof newSchema.maxDecimal === 'number') {
            newSchema.multipleOf = 1 / Math.pow(10, newSchema.maxDecimal);
            delete newSchema.divisibleBy;
            changed = true;
            if (!draft || draft === 2) {
                draft = 1;
            }
        }
        // Convert v2-v3 'divisibleBy' to 'multipleOf'
        if (typeof newSchema.divisibleBy === 'number') {
            newSchema.multipleOf = newSchema.divisibleBy;
            delete newSchema.divisibleBy;
            changed = true;
        }
        // Convert v1-v2 boolean 'minimumCanEqual' to 'exclusiveMinimum'
        if (typeof newSchema.minimum === 'number' && newSchema.minimumCanEqual === false) {
            newSchema.exclusiveMinimum = newSchema.minimum;
            delete newSchema.minimum;
            changed = true;
            if (!draft) {
                draft = 2;
            }
        }
        else if (typeof newSchema.minimumCanEqual === 'boolean') {
            delete newSchema.minimumCanEqual;
            changed = true;
            if (!draft) {
                draft = 2;
            }
        }
        // Convert v3-v4 boolean 'exclusiveMinimum' to numeric
        if (typeof newSchema.minimum === 'number' && newSchema.exclusiveMinimum === true) {
            newSchema.exclusiveMinimum = newSchema.minimum;
            delete newSchema.minimum;
            changed = true;
        }
        else if (typeof newSchema.exclusiveMinimum === 'boolean') {
            delete newSchema.exclusiveMinimum;
            changed = true;
        }
        // Convert v1-v2 boolean 'maximumCanEqual' to 'exclusiveMaximum'
        if (typeof newSchema.maximum === 'number' && newSchema.maximumCanEqual === false) {
            newSchema.exclusiveMaximum = newSchema.maximum;
            delete newSchema.maximum;
            changed = true;
            if (!draft) {
                draft = 2;
            }
        }
        else if (typeof newSchema.maximumCanEqual === 'boolean') {
            delete newSchema.maximumCanEqual;
            changed = true;
            if (!draft) {
                draft = 2;
            }
        }
        // Convert v3-v4 boolean 'exclusiveMaximum' to numeric
        if (typeof newSchema.maximum === 'number' && newSchema.exclusiveMaximum === true) {
            newSchema.exclusiveMaximum = newSchema.maximum;
            delete newSchema.maximum;
            changed = true;
        }
        else if (typeof newSchema.exclusiveMaximum === 'boolean') {
            delete newSchema.exclusiveMaximum;
            changed = true;
        }
        // Search object 'properties' for 'optional', 'required', and 'requires' items,
        // and convert them into object 'required' arrays and 'dependencies' objects
        if (typeof newSchema.properties === 'object') {
            var properties_1 = Object.assign({}, newSchema.properties);
            var requiredKeys_1 = Array.isArray(newSchema.required) ?
                new Set(newSchema.required) : new Set();
            // Convert v1-v2 boolean 'optional' properties to 'required' array
            if (draft === 1 || draft === 2 ||
                Object.keys(properties_1).some(function (key) { return properties_1[key].optional === true; })) {
                Object.keys(properties_1)
                    .filter(function (key) { return properties_1[key].optional !== true; })
                    .forEach(function (key) { return requiredKeys_1.add(key); });
                changed = true;
                if (!draft) {
                    draft = 2;
                }
            }
            // Convert v3 boolean 'required' properties to 'required' array
            if (Object.keys(properties_1).some(function (key) { return properties_1[key].required === true; })) {
                Object.keys(properties_1)
                    .filter(function (key) { return properties_1[key].required === true; })
                    .forEach(function (key) { return requiredKeys_1.add(key); });
                changed = true;
            }
            if (requiredKeys_1.size) {
                newSchema.required = Array.from(requiredKeys_1);
            }
            // Convert v1-v2 array or string 'requires' properties to 'dependencies' object
            if (Object.keys(properties_1).some(function (key) { return properties_1[key].requires; })) {
                var dependencies_1 = typeof newSchema.dependencies === 'object' ? Object.assign({}, newSchema.dependencies) : {};
                Object.keys(properties_1)
                    .filter(function (key) { return properties_1[key].requires; })
                    .forEach(function (key) {
                    return dependencies_1[key] =
                        typeof properties_1[key].requires === 'string' ?
                            [properties_1[key].requires] : properties_1[key].requires;
                });
                newSchema.dependencies = dependencies_1;
                changed = true;
                if (!draft) {
                    draft = 2;
                }
            }
            newSchema.properties = properties_1;
        }
        // Revove v1-v2 boolean 'optional' key
        if (typeof newSchema.optional === 'boolean') {
            delete newSchema.optional;
            changed = true;
            if (!draft) {
                draft = 2;
            }
        }
        // Revove v1-v2 'requires' key
        if (newSchema.requires) {
            delete newSchema.requires;
        }
        // Revove v3 boolean 'required' key
        if (typeof newSchema.required === 'boolean') {
            delete newSchema.required;
        }
        // Convert id to $id
        if (typeof newSchema.id === 'string' && !newSchema.$id) {
            if (newSchema.id.slice(-1) === '#') {
                newSchema.id = newSchema.id.slice(0, -1);
            }
            newSchema.$id = newSchema.id + '-CONVERTED-TO-DRAFT-06#';
            delete newSchema.id;
            changed = true;
        }
        // Check if v1-v3 'any' or object types will be converted
        if (newSchema.type && (typeof newSchema.type.every === 'function' ?
            !newSchema.type.every(function (type) { return simpleTypes.includes(type); }) :
            !simpleTypes.includes(newSchema.type))) {
            changed = true;
        }
        // If schema changed, update or remove $schema identifier
        if (typeof newSchema.$schema === 'string' &&
            /http\:\/\/json\-schema\.org\/draft\-0[1-4]\/schema\#/.test(newSchema.$schema)) {
            newSchema.$schema = 'http://json-schema.org/draft-06/schema#';
            changed = true;
        }
        else if (changed && typeof newSchema.$schema === 'string') {
            var addToDescription = 'Converted to draft 6 from ' + newSchema.$schema;
            if (typeof newSchema.description === 'string' && newSchema.description.length) {
                newSchema.description += '\n' + addToDescription;
            }
            else {
                newSchema.description = addToDescription;
            }
            delete newSchema.$schema;
        }
        // Convert v1-v3 'any' and object types
        if (newSchema.type && (typeof newSchema.type.every === 'function' ?
            !newSchema.type.every(function (type) { return simpleTypes.includes(type); }) :
            !simpleTypes.includes(newSchema.type))) {
            if (newSchema.type.length === 1) {
                newSchema.type = newSchema.type[0];
            }
            if (typeof newSchema.type === 'string') {
                // Convert string 'any' type to array of all standard types
                if (newSchema.type === 'any') {
                    newSchema.type = simpleTypes;
                    // Delete non-standard string type
                }
                else {
                    delete newSchema.type;
                }
            }
            else if (typeof newSchema.type === 'object') {
                if (typeof newSchema.type.every === 'function') {
                    // If array of strings, only allow standard types
                    if (newSchema.type.every(function (type) { return typeof type === 'string'; })) {
                        newSchema.type = newSchema.type.some(function (type) { return type === 'any'; }) ?
                            newSchema.type = simpleTypes :
                            newSchema.type.filter(function (type) { return simpleTypes.includes(type); });
                        // If type is an array with objects, convert the current schema to an 'anyOf' array
                    }
                    else if (newSchema.type.length > 1) {
                        var arrayKeys = ['additionalItems', 'items', 'maxItems', 'minItems', 'uniqueItems', 'contains'];
                        var numberKeys = ['multipleOf', 'maximum', 'exclusiveMaximum', 'minimum', 'exclusiveMinimum'];
                        var objectKeys = ['maxProperties', 'minProperties', 'required', 'additionalProperties',
                            'properties', 'patternProperties', 'dependencies', 'propertyNames'];
                        var stringKeys = ['maxLength', 'minLength', 'pattern', 'format'];
                        var filterKeys_1 = {
                            'array': tslib.__spread(numberKeys, objectKeys, stringKeys),
                            'integer': tslib.__spread(arrayKeys, objectKeys, stringKeys),
                            'number': tslib.__spread(arrayKeys, objectKeys, stringKeys),
                            'object': tslib.__spread(arrayKeys, numberKeys, stringKeys),
                            'string': tslib.__spread(arrayKeys, numberKeys, objectKeys),
                            'all': tslib.__spread(arrayKeys, numberKeys, objectKeys, stringKeys),
                        };
                        var anyOf = [];
                        var _loop_1 = function (type) {
                            var newType = typeof type === 'string' ? { type: type } : Object.assign({}, type);
                            Object.keys(newSchema)
                                .filter(function (key) {
                                return !newType.hasOwnProperty(key) &&
                                    !tslib.__spread((filterKeys_1[newType.type] || filterKeys_1.all), ['type', 'default']).includes(key);
                            })
                                .forEach(function (key) { return newType[key] = newSchema[key]; });
                            anyOf.push(newType);
                        };
                        try {
                            for (var _a = tslib.__values(newSchema.type), _b = _a.next(); !_b.done; _b = _a.next()) {
                                var type = _b.value;
                                _loop_1(type);
                            }
                        }
                        catch (e_1_1) {
                            e_1 = { error: e_1_1 };
                        }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return))
                                    _c.call(_a);
                            }
                            finally {
                                if (e_1)
                                    throw e_1.error;
                            }
                        }
                        newSchema = newSchema.hasOwnProperty('default') ?
                            { anyOf: anyOf, default: newSchema.default } : { anyOf: anyOf };
                        // If type is an object, merge it with the current schema
                    }
                    else {
                        var typeSchema = newSchema.type;
                        delete newSchema.type;
                        Object.assign(newSchema, typeSchema);
                    }
                }
            }
            else {
                delete newSchema.type;
            }
        }
        // Convert sub schemas
        Object.keys(newSchema)
            .filter(function (key) { return typeof newSchema[key] === 'object'; })
            .forEach(function (key) {
            if (['definitions', 'dependencies', 'properties', 'patternProperties']
                .includes(key) && typeof newSchema[key].map !== 'function') {
                var newKey_1 = {};
                Object.keys(newSchema[key]).forEach(function (subKey) {
                    return newKey_1[subKey] =
                        convertSchemaToDraft6(newSchema[key][subKey], { changed: changed, draft: draft });
                });
                newSchema[key] = newKey_1;
            }
            else if (['items', 'additionalItems', 'additionalProperties',
                'allOf', 'anyOf', 'oneOf', 'not'].includes(key)) {
                newSchema[key] = convertSchemaToDraft6(newSchema[key], { changed: changed, draft: draft });
            }
            else {
                newSchema[key] = lodash.cloneDeep(newSchema[key]);
            }
        });
        return newSchema;
        var e_1, _c;
    }
    /**
     * 'dateToString' function
     *
     * @param  { Date | string } date
     * @param  { any } options
     * @return { string }
     */
    /**
     * OrderableDirective
     *
     * Enables array elements to be reordered by dragging and dropping.
     *
     * Only works for arrays that have at least two elements.
     *
     * Also detects arrays-within-arrays, and correctly moves either
     * the child array element or the parent array element,
     * depending on the drop targert.
     *
     * Listeners for movable element being dragged:
     * - dragstart: add 'dragging' class to element, set effectAllowed = 'move'
     * - dragover: set dropEffect = 'move'
     * - dragend: remove 'dragging' class from element
     *
     * Listeners for stationary items being dragged over:
     * - dragenter: add 'drag-target-...' classes to element
     * - dragleave: remove 'drag-target-...' classes from element
     * - drop: remove 'drag-target-...' classes from element, move dropped array item
     */
    var OrderableDirective = (function () {
        function OrderableDirective(elementRef, jsf, ngZone) {
            this.elementRef = elementRef;
            this.jsf = jsf;
            this.ngZone = ngZone;
            this.overParentElement = false;
            this.overChildElement = false;
        }
        OrderableDirective.prototype.ngOnInit = function () {
            var _this = this;
            if (this.orderable && this.layoutNode && this.layoutIndex && this.dataIndex) {
                this.element = this.elementRef.nativeElement;
                this.element.draggable = true;
                this.arrayLayoutIndex = 'move:' + this.layoutIndex.slice(0, -1).toString();
                this.ngZone.runOutsideAngular(function () {
                    // Listeners for movable element being dragged:
                    _this.element.addEventListener('dragstart', function (event) {
                        event.dataTransfer.effectAllowed = 'move';
                        // Hack to bypass stupid HTML drag-and-drop dataTransfer protection
                        // so drag source info will be available on dragenter
                        var sourceArrayIndex = _this.dataIndex[_this.dataIndex.length - 1];
                        sessionStorage.setItem(_this.arrayLayoutIndex, sourceArrayIndex + '');
                    });
                    _this.element.addEventListener('dragover', function (event) {
                        if (event.preventDefault) {
                            event.preventDefault();
                        }
                        event.dataTransfer.dropEffect = 'move';
                        return false;
                    });
                    // Listeners for stationary items being dragged over:
                    _this.element.addEventListener('dragenter', function (event) {
                        // Part 1 of a hack, inspired by Dragster, to simulate mouseover and mouseout
                        // behavior while dragging items - http://bensmithett.github.io/dragster/
                        if (_this.overParentElement) {
                            return _this.overChildElement = true;
                        }
                        else {
                            _this.overParentElement = true;
                        }
                        var sourceArrayIndex = sessionStorage.getItem(_this.arrayLayoutIndex);
                        if (sourceArrayIndex !== null) {
                            if (_this.dataIndex[_this.dataIndex.length - 1] < +sourceArrayIndex) {
                                _this.element.classList.add('drag-target-top');
                            }
                            else if (_this.dataIndex[_this.dataIndex.length - 1] > +sourceArrayIndex) {
                                _this.element.classList.add('drag-target-bottom');
                            }
                        }
                    });
                    _this.element.addEventListener('dragleave', function (event) {
                        // Part 2 of the Dragster hack
                        if (_this.overChildElement) {
                            _this.overChildElement = false;
                        }
                        else if (_this.overParentElement) {
                            _this.overParentElement = false;
                        }
                        var sourceArrayIndex = sessionStorage.getItem(_this.arrayLayoutIndex);
                        if (!_this.overParentElement && !_this.overChildElement && sourceArrayIndex !== null) {
                            _this.element.classList.remove('drag-target-top');
                            _this.element.classList.remove('drag-target-bottom');
                        }
                    });
                    _this.element.addEventListener('drop', function (event) {
                        _this.element.classList.remove('drag-target-top');
                        _this.element.classList.remove('drag-target-bottom');
                        // Confirm that drop target is another item in the same array as source item
                        var sourceArrayIndex = sessionStorage.getItem(_this.arrayLayoutIndex);
                        var destArrayIndex = _this.dataIndex[_this.dataIndex.length - 1];
                        if (sourceArrayIndex !== null && +sourceArrayIndex !== destArrayIndex) {
                            // Move array item
                            _this.jsf.moveArrayItem(_this, +sourceArrayIndex, destArrayIndex);
                        }
                        sessionStorage.removeItem(_this.arrayLayoutIndex);
                        return false;
                    });
                });
            }
        };
        return OrderableDirective;
    }());
    OrderableDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[orderable]',
                },] },
    ];
    /** @nocollapse */
    OrderableDirective.ctorParameters = function () {
        return [
            { type: core.ElementRef, },
            { type: JsonSchemaFormService, },
            { type: core.NgZone, },
        ];
    };
    OrderableDirective.propDecorators = {
        "orderable": [{ type: core.Input },],
        "layoutNode": [{ type: core.Input },],
        "layoutIndex": [{ type: core.Input },],
        "dataIndex": [{ type: core.Input },],
    };
    // Warning: Changing the following order may cause errors if the new order
    var CheckboxesComponent = (function () {
        function CheckboxesComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
            this.checkboxList = [];
        }
        CheckboxesComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
            this.layoutOrientation = (this.layoutNode.type === 'checkboxes-inline' ||
                this.layoutNode.type === 'checkboxbuttons') ? 'horizontal' : 'vertical';
            this.jsf.initializeControl(this);
            this.checkboxList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
            if (this.boundControl) {
                var formArray_1 = this.jsf.getFormControl(this);
                this.checkboxList.forEach(function (checkboxItem) { return checkboxItem.checked = formArray_1.value.includes(checkboxItem.value); });
            }
        };
        CheckboxesComponent.prototype.updateValue = function (event) {
            try {
                for (var _a = tslib.__values(this.checkboxList), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var checkboxItem = _b.value;
                    if (event.target.value === checkboxItem.value) {
                        checkboxItem.checked = event.target.checked;
                    }
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return))
                        _c.call(_a);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
            }
            if (this.boundControl) {
                this.jsf.updateArrayCheckboxList(this, this.checkboxList);
            }
            var e_1, _c;
        };
        return CheckboxesComponent;
    }());
    CheckboxesComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'checkboxes-widget',
                    template: "\n    <label *ngIf=\"options?.title\"\n      [class]=\"options?.labelHtmlClass || ''\"\n      [style.display]=\"options?.notitle ? 'none' : ''\"\n      [innerHTML]=\"options?.title\"></label>\n\n    <!-- 'horizontal' = checkboxes-inline or checkboxbuttons -->\n    <div *ngIf=\"layoutOrientation === 'horizontal'\" [class]=\"options?.htmlClass || ''\">\n      <label *ngFor=\"let checkboxItem of checkboxList\"\n        [attr.for]=\"'control' + layoutNode?._id + '/' + checkboxItem.value\"\n        [class]=\"(options?.itemLabelHtmlClass || '') + (checkboxItem.checked ?\n          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :\n          (' ' + (options?.style?.unselected || '')))\">\n        <input type=\"checkbox\"\n          [attr.required]=\"options?.required\"\n          [checked]=\"checkboxItem.checked\"\n          [class]=\"options?.fieldHtmlClass || ''\"\n          [disabled]=\"controlDisabled\"\n          [id]=\"'control' + layoutNode?._id + '/' + checkboxItem.value\"\n          [name]=\"checkboxItem?.name\"\n          [readonly]=\"options?.readonly ? 'readonly' : null\"\n          [value]=\"checkboxItem.value\"\n          (change)=\"updateValue($event)\">\n        <span [innerHTML]=\"checkboxItem.name\"></span>\n      </label>\n    </div>\n\n    <!-- 'vertical' = regular checkboxes -->\n    <div *ngIf=\"layoutOrientation === 'vertical'\">\n      <div *ngFor=\"let checkboxItem of checkboxList\" [class]=\"options?.htmlClass || ''\">\n        <label\n          [attr.for]=\"'control' + layoutNode?._id + '/' + checkboxItem.value\"\n          [class]=\"(options?.itemLabelHtmlClass || '') + (checkboxItem.checked ?\n            (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :\n            (' ' + (options?.style?.unselected || '')))\">\n          <input type=\"checkbox\"\n            [attr.required]=\"options?.required\"\n            [checked]=\"checkboxItem.checked\"\n            [class]=\"options?.fieldHtmlClass || ''\"\n            [disabled]=\"controlDisabled\"\n            [id]=\"options?.name + '/' + checkboxItem.value\"\n            [name]=\"checkboxItem?.name\"\n            [readonly]=\"options?.readonly ? 'readonly' : null\"\n            [value]=\"checkboxItem.value\"\n            (change)=\"updateValue($event)\">\n          <span [innerHTML]=\"checkboxItem?.name\"></span>\n        </label>\n      </div>\n    </div>",
                },] },
    ];
    /** @nocollapse */
    CheckboxesComponent.ctorParameters = function () {
        return [
            { type: JsonSchemaFormService, },
        ];
    };
    CheckboxesComponent.propDecorators = {
        "layoutNode": [{ type: core.Input },],
        "layoutIndex": [{ type: core.Input },],
        "dataIndex": [{ type: core.Input },],
    };
    // TODO: Add this control
    var FileComponent = (function () {
        function FileComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
        }
        FileComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
            this.jsf.initializeControl(this);
        };
        FileComponent.prototype.updateValue = function (event) {
            this.jsf.updateValue(this, event.target.value);
        };
        return FileComponent;
    }());
    FileComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'file-widget',
                    template: "",
                },] },
    ];
    /** @nocollapse */
    FileComponent.ctorParameters = function () {
        return [
            { type: JsonSchemaFormService, },
        ];
    };
    FileComponent.propDecorators = {
        "layoutNode": [{ type: core.Input },],
        "layoutIndex": [{ type: core.Input },],
        "dataIndex": [{ type: core.Input },],
    };
    var InputComponent = (function () {
        function InputComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
            this.autoCompleteList = [];
        }
        InputComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
            this.jsf.initializeControl(this);
        };
        InputComponent.prototype.updateValue = function (event) {
            this.jsf.updateValue(this, event.target.value);
        };
        return InputComponent;
    }());
    InputComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'input-widget',
                    template: "\n    <div [class]=\"options?.htmlClass || ''\">\n      <label *ngIf=\"options?.title\"\n        [attr.for]=\"'control' + layoutNode?._id\"\n        [class]=\"options?.labelHtmlClass || ''\"\n        [style.display]=\"options?.notitle ? 'none' : ''\"\n        [innerHTML]=\"options?.title\"></label>\n      <input *ngIf=\"boundControl\"\n        [formControl]=\"formControl\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.list]=\"'control' + layoutNode?._id + 'Autocomplete'\"\n        [attr.maxlength]=\"options?.maxLength\"\n        [attr.minlength]=\"options?.minLength\"\n        [attr.pattern]=\"options?.pattern\"\n        [attr.placeholder]=\"options?.placeholder\"\n        [attr.required]=\"options?.required\"\n        [class]=\"options?.fieldHtmlClass || ''\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        [readonly]=\"options?.readonly ? 'readonly' : null\"\n        [type]=\"layoutNode?.type\">\n      <input *ngIf=\"!boundControl\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.list]=\"'control' + layoutNode?._id + 'Autocomplete'\"\n        [attr.maxlength]=\"options?.maxLength\"\n        [attr.minlength]=\"options?.minLength\"\n        [attr.pattern]=\"options?.pattern\"\n        [attr.placeholder]=\"options?.placeholder\"\n        [attr.required]=\"options?.required\"\n        [class]=\"options?.fieldHtmlClass || ''\"\n        [disabled]=\"controlDisabled\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        [readonly]=\"options?.readonly ? 'readonly' : null\"\n        [type]=\"layoutNode?.type\"\n        [value]=\"controlValue\"\n        (input)=\"updateValue($event)\">\n        <datalist *ngIf=\"options?.typeahead?.source\"\n          [id]=\"'control' + layoutNode?._id + 'Autocomplete'\">\n          <option *ngFor=\"let word of options?.typeahead?.source\" [value]=\"word\">\n        </datalist>\n    </div>",
                },] },
    ];
    /** @nocollapse */
    InputComponent.ctorParameters = function () {
        return [
            { type: JsonSchemaFormService, },
        ];
    };
    InputComponent.propDecorators = {
        "layoutNode": [{ type: core.Input },],
        "layoutIndex": [{ type: core.Input },],
        "dataIndex": [{ type: core.Input },],
    };
    var MessageComponent = (function () {
        function MessageComponent(jsf) {
            this.jsf = jsf;
            this.message = null;
        }
        MessageComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
            this.message = this.options.help || this.options.helpvalue ||
                this.options.msg || this.options.message;
        };
        return MessageComponent;
    }());
    MessageComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'message-widget',
                    template: "\n    <span *ngIf=\"message\"\n      [class]=\"options?.labelHtmlClass || ''\"\n      [innerHTML]=\"message\"></span>",
                },] },
    ];
    /** @nocollapse */
    MessageComponent.ctorParameters = function () {
        return [
            { type: JsonSchemaFormService, },
        ];
    };
    MessageComponent.propDecorators = {
        "layoutNode": [{ type: core.Input },],
        "layoutIndex": [{ type: core.Input },],
        "dataIndex": [{ type: core.Input },],
    };
    var NoneComponent = (function () {
        function NoneComponent() {
        }
        return NoneComponent;
    }());
    NoneComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'none-widget',
                    template: "",
                },] },
    ];
    /** @nocollapse */
    NoneComponent.propDecorators = {
        "layoutNode": [{ type: core.Input },],
        "layoutIndex": [{ type: core.Input },],
        "dataIndex": [{ type: core.Input },],
    };
    var NumberComponent = (function () {
        function NumberComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
            this.allowNegative = true;
            this.allowDecimal = true;
            this.allowExponents = false;
            this.lastValidNumber = '';
        }
        NumberComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
            this.jsf.initializeControl(this);
            if (this.layoutNode.dataType === 'integer') {
                this.allowDecimal = false;
            }
        };
        NumberComponent.prototype.updateValue = function (event) {
            this.jsf.updateValue(this, event.target.value);
        };
        return NumberComponent;
    }());
    NumberComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'number-widget',
                    template: "\n    <div [class]=\"options?.htmlClass || ''\">\n      <label *ngIf=\"options?.title\"\n        [attr.for]=\"'control' + layoutNode?._id\"\n        [class]=\"options?.labelHtmlClass || ''\"\n        [style.display]=\"options?.notitle ? 'none' : ''\"\n        [innerHTML]=\"options?.title\"></label>\n      <input *ngIf=\"boundControl\"\n        [formControl]=\"formControl\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.max]=\"options?.maximum\"\n        [attr.min]=\"options?.minimum\"\n        [attr.placeholder]=\"options?.placeholder\"\n        [attr.required]=\"options?.required\"\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.step]=\"options?.multipleOf || options?.step || 'any'\"\n        [class]=\"options?.fieldHtmlClass || ''\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        [readonly]=\"options?.readonly ? 'readonly' : null\"\n        [title]=\"lastValidNumber\"\n        [type]=\"layoutNode?.type === 'range' ? 'range' : 'number'\">\n      <input *ngIf=\"!boundControl\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.max]=\"options?.maximum\"\n        [attr.min]=\"options?.minimum\"\n        [attr.placeholder]=\"options?.placeholder\"\n        [attr.required]=\"options?.required\"\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.step]=\"options?.multipleOf || options?.step || 'any'\"\n        [class]=\"options?.fieldHtmlClass || ''\"\n        [disabled]=\"controlDisabled\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        [readonly]=\"options?.readonly ? 'readonly' : null\"\n        [title]=\"lastValidNumber\"\n        [type]=\"layoutNode?.type === 'range' ? 'range' : 'number'\"\n        [value]=\"controlValue\"\n        (input)=\"updateValue($event)\">\n      <span *ngIf=\"layoutNode?.type === 'range'\" [innerHTML]=\"controlValue\"></span>\n    </div>",
                },] },
    ];
    /** @nocollapse */
    NumberComponent.ctorParameters = function () {
        return [
            { type: JsonSchemaFormService, },
        ];
    };
    NumberComponent.propDecorators = {
        "layoutNode": [{ type: core.Input },],
        "layoutIndex": [{ type: core.Input },],
        "dataIndex": [{ type: core.Input },],
    };
    var RadiosComponent = (function () {
        function RadiosComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
            this.layoutOrientation = 'vertical';
            this.radiosList = [];
        }
        RadiosComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
            if (this.layoutNode.type === 'radios-inline' ||
                this.layoutNode.type === 'radiobuttons') {
                this.layoutOrientation = 'horizontal';
            }
            this.radiosList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
            this.jsf.initializeControl(this);
        };
        RadiosComponent.prototype.updateValue = function (event) {
            this.jsf.updateValue(this, event.target.value);
        };
        return RadiosComponent;
    }());
    RadiosComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'radios-widget',
                    template: "\n    <label *ngIf=\"options?.title\"\n      [attr.for]=\"'control' + layoutNode?._id\"\n      [class]=\"options?.labelHtmlClass || ''\"\n      [style.display]=\"options?.notitle ? 'none' : ''\"\n      [innerHTML]=\"options?.title\"></label>\n\n    <!-- 'horizontal' = radios-inline or radiobuttons -->\n    <div *ngIf=\"layoutOrientation === 'horizontal'\"\n      [class]=\"options?.htmlClass || ''\">\n      <label *ngFor=\"let radioItem of radiosList\"\n        [attr.for]=\"'control' + layoutNode?._id + '/' + radioItem?.value\"\n        [class]=\"(options?.itemLabelHtmlClass || '') +\n          ((controlValue + '' === radioItem?.value + '') ?\n          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :\n          (' ' + (options?.style?.unselected || '')))\">\n        <input type=\"radio\"\n          [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n          [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n          [attr.required]=\"options?.required\"\n          [checked]=\"radioItem?.value === controlValue\"\n          [class]=\"options?.fieldHtmlClass || ''\"\n          [disabled]=\"controlDisabled\"\n          [id]=\"'control' + layoutNode?._id + '/' + radioItem?.value\"\n          [name]=\"controlName\"\n          [value]=\"radioItem?.value\"\n          (change)=\"updateValue($event)\">\n        <span [innerHTML]=\"radioItem?.name\"></span>\n      </label>\n    </div>\n\n    <!-- 'vertical' = regular radios -->\n    <div *ngIf=\"layoutOrientation !== 'horizontal'\">\n      <div *ngFor=\"let radioItem of radiosList\"\n        [class]=\"options?.htmlClass || ''\">\n        <label\n          [attr.for]=\"'control' + layoutNode?._id + '/' + radioItem?.value\"\n          [class]=\"(options?.itemLabelHtmlClass || '') +\n            ((controlValue + '' === radioItem?.value + '') ?\n            (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :\n            (' ' + (options?.style?.unselected || '')))\">\n          <input type=\"radio\"\n            [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n            [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n            [attr.required]=\"options?.required\"\n            [checked]=\"radioItem?.value === controlValue\"\n            [class]=\"options?.fieldHtmlClass || ''\"\n            [disabled]=\"controlDisabled\"\n            [id]=\"'control' + layoutNode?._id + '/' + radioItem?.value\"\n            [name]=\"controlName\"\n            [value]=\"radioItem?.value\"\n            (change)=\"updateValue($event)\">\n          <span [innerHTML]=\"radioItem?.name\"></span>\n        </label>\n      </div>\n    </div>",
                },] },
    ];
    /** @nocollapse */
    RadiosComponent.ctorParameters = function () {
        return [
            { type: JsonSchemaFormService, },
        ];
    };
    RadiosComponent.propDecorators = {
        "layoutNode": [{ type: core.Input },],
        "layoutIndex": [{ type: core.Input },],
        "dataIndex": [{ type: core.Input },],
    };
    var RootComponent = (function () {
        function RootComponent(jsf) {
            this.jsf = jsf;
            this.isFlexItem = false;
        }
        RootComponent.prototype.isDraggable = function (node) {
            return node.arrayItem && node.type !== '$ref' &&
                node.arrayItemType === 'list' && this.isOrderable !== false;
        };
        // Set attributes for flexbox child
        // (container attributes are set in section.component)
        RootComponent.prototype.getFlexAttribute = function (node, attribute) {
            var index = ['flex-grow', 'flex-shrink', 'flex-basis'].indexOf(attribute);
            return ((node.options || {}).flex || '').split(/\s+/)[index] ||
                (node.options || {})[attribute] || ['1', '1', 'auto'][index];
        };
        RootComponent.prototype.showWidget = function (layoutNode) {
            return this.jsf.evaluateCondition(layoutNode, this.dataIndex);
        };
        return RootComponent;
    }());
    RootComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'root-widget',
                    template: "\n    <div *ngFor=\"let layoutItem of layout; let i = index\"\n      [class.form-flex-item]=\"isFlexItem\"\n      [style.align-self]=\"(layoutItem.options || {})['align-self']\"\n      [style.flex-basis]=\"getFlexAttribute(layoutItem, 'flex-basis')\"\n      [style.flex-grow]=\"getFlexAttribute(layoutItem, 'flex-grow')\"\n      [style.flex-shrink]=\"getFlexAttribute(layoutItem, 'flex-shrink')\"\n      [style.order]=\"(layoutItem.options || {}).order\">\n      <div\n        [dataIndex]=\"layoutItem?.arrayItem ? (dataIndex || []).concat(i) : (dataIndex || [])\"\n        [layoutIndex]=\"(layoutIndex || []).concat(i)\"\n        [layoutNode]=\"layoutItem\"\n        [orderable]=\"isDraggable(layoutItem)\">\n        <select-framework-widget *ngIf=\"showWidget(layoutItem)\"\n          [dataIndex]=\"layoutItem?.arrayItem ? (dataIndex || []).concat(i) : (dataIndex || [])\"\n          [layoutIndex]=\"(layoutIndex || []).concat(i)\"\n          [layoutNode]=\"layoutItem\"></select-framework-widget>\n      </div>\n    </div>",
                    styles: ["\n    [draggable=true] {\n      transition: all 150ms cubic-bezier(.4, 0, .2, 1);\n    }\n    [draggable=true]:hover {\n      cursor: move;\n      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);\n      position: relative; z-index: 10;\n      margin-top: -1px;\n      margin-left: -1px;\n      margin-right: 1px;\n      margin-bottom: 1px;\n    }\n    [draggable=true].drag-target-top {\n      box-shadow: 0 -2px 0 #000;\n      position: relative; z-index: 20;\n    }\n    [draggable=true].drag-target-bottom {\n      box-shadow: 0 2px 0 #000;\n      position: relative; z-index: 20;\n    }\n  "],
                },] },
    ];
    /** @nocollapse */
    RootComponent.ctorParameters = function () {
        return [
            { type: JsonSchemaFormService, },
        ];
    };
    RootComponent.propDecorators = {
        "dataIndex": [{ type: core.Input },],
        "layoutIndex": [{ type: core.Input },],
        "layout": [{ type: core.Input },],
        "isOrderable": [{ type: core.Input },],
        "isFlexItem": [{ type: core.Input },],
    };
    var SectionComponent = (function () {
        function SectionComponent(jsf) {
            this.jsf = jsf;
            this.expanded = true;
        }
        Object.defineProperty(SectionComponent.prototype, "sectionTitle", {
            get: function () {
                return this.options.notitle ? null : this.jsf.setItemTitle(this);
            },
            enumerable: true,
            configurable: true
        });
        SectionComponent.prototype.ngOnInit = function () {
            this.jsf.initializeControl(this);
            this.options = this.layoutNode.options || {};
            this.expanded = typeof this.options.expanded === 'boolean' ?
                this.options.expanded : !this.options.expandable;
            switch (this.layoutNode.type) {
                case 'fieldset':
                case 'array':
                case 'tab':
                case 'advancedfieldset':
                case 'authfieldset':
                case 'optionfieldset':
                case 'selectfieldset':
                    this.containerType = 'fieldset';
                    break;
                default:
                    // 'div', 'flex', 'section', 'conditional', 'actions', 'tagsinput'
                    this.containerType = 'div';
                    break;
            }
        };
        SectionComponent.prototype.toggleExpanded = function () {
            if (this.options.expandable) {
                this.expanded = !this.expanded;
            }
        };
        // Set attributes for flexbox container
        // (child attributes are set in root.component)
        SectionComponent.prototype.getFlexAttribute = function (attribute) {
            var flexActive = this.layoutNode.type === 'flex' ||
                !!this.options.displayFlex ||
                this.options.display === 'flex';
            if (attribute !== 'flex' && !flexActive) {
                return null;
            }
            switch (attribute) {
                case 'is-flex':
                    return flexActive;
                case 'display':
                    return flexActive ? 'flex' : 'initial';
                case 'flex-direction':
                case 'flex-wrap':
                    var index = ['flex-direction', 'flex-wrap'].indexOf(attribute);
                    return (this.options['flex-flow'] || '').split(/\s+/)[index] ||
                        this.options[attribute] || ['column', 'nowrap'][index];
                case 'justify-content':
                case 'align-items':
                case 'align-content':
                    return this.options[attribute];
            }
        };
        return SectionComponent;
    }());
    SectionComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'section-widget',
                    template: "\n    <div *ngIf=\"containerType === 'div'\"\n      [class]=\"options?.htmlClass || ''\"\n      [class.expandable]=\"options?.expandable && !expanded\"\n      [class.expanded]=\"options?.expandable && expanded\">\n      <label *ngIf=\"sectionTitle\"\n        class=\"legend\"\n        [class]=\"options?.labelHtmlClass || ''\"\n        [innerHTML]=\"sectionTitle\"\n        (click)=\"toggleExpanded()\"></label>\n      <root-widget *ngIf=\"expanded\"\n        [dataIndex]=\"dataIndex\"\n        [layout]=\"layoutNode.items\"\n        [layoutIndex]=\"layoutIndex\"\n        [isFlexItem]=\"getFlexAttribute('is-flex')\"\n        [isOrderable]=\"options?.orderable\"\n        [class.form-flex-column]=\"getFlexAttribute('flex-direction') === 'column'\"\n        [class.form-flex-row]=\"getFlexAttribute('flex-direction') === 'row'\"\n        [style.align-content]=\"getFlexAttribute('align-content')\"\n        [style.align-items]=\"getFlexAttribute('align-items')\"\n        [style.display]=\"getFlexAttribute('display')\"\n        [style.flex-direction]=\"getFlexAttribute('flex-direction')\"\n        [style.flex-wrap]=\"getFlexAttribute('flex-wrap')\"\n        [style.justify-content]=\"getFlexAttribute('justify-content')\"></root-widget>\n    </div>\n    <fieldset *ngIf=\"containerType === 'fieldset'\"\n      [class]=\"options?.htmlClass || ''\"\n      [class.expandable]=\"options?.expandable && !expanded\"\n      [class.expanded]=\"options?.expandable && expanded\"\n      [disabled]=\"options?.readonly\">\n      <legend *ngIf=\"sectionTitle\"\n        class=\"legend\"\n        [class]=\"options?.labelHtmlClass || ''\"\n        [innerHTML]=\"sectionTitle\"\n        (click)=\"toggleExpanded()\"></legend>\n      <div *ngIf=\"options?.messageLocation !== 'bottom'\">\n        <p *ngIf=\"options?.description\"\n        class=\"help-block\"\n        [class]=\"options?.labelHelpBlockClass || ''\"\n        [innerHTML]=\"options?.description\"></p>\n      </div>\n      <root-widget *ngIf=\"expanded\"\n        [dataIndex]=\"dataIndex\"\n        [layout]=\"layoutNode.items\"\n        [layoutIndex]=\"layoutIndex\"\n        [isFlexItem]=\"getFlexAttribute('is-flex')\"\n        [isOrderable]=\"options?.orderable\"\n        [class.form-flex-column]=\"getFlexAttribute('flex-direction') === 'column'\"\n        [class.form-flex-row]=\"getFlexAttribute('flex-direction') === 'row'\"\n        [style.align-content]=\"getFlexAttribute('align-content')\"\n        [style.align-items]=\"getFlexAttribute('align-items')\"\n        [style.display]=\"getFlexAttribute('display')\"\n        [style.flex-direction]=\"getFlexAttribute('flex-direction')\"\n        [style.flex-wrap]=\"getFlexAttribute('flex-wrap')\"\n        [style.justify-content]=\"getFlexAttribute('justify-content')\"></root-widget>\n      <div *ngIf=\"options?.messageLocation === 'bottom'\">\n        <p *ngIf=\"options?.description\"\n        class=\"help-block\"\n        [class]=\"options?.labelHelpBlockClass || ''\"\n        [innerHTML]=\"options?.description\"></p>\n      </div>\n    </fieldset>",
                    styles: ["\n    .legend { font-weight: bold; }\n    .expandable > legend:before, .expandable > label:before  { content: '\u25B6'; padding-right: .3em; }\n    .expanded > legend:before, .expanded > label:before  { content: '\u25BC'; padding-right: .2em; }\n  "],
                },] },
    ];
    /** @nocollapse */
    SectionComponent.ctorParameters = function () {
        return [
            { type: JsonSchemaFormService, },
        ];
    };
    SectionComponent.propDecorators = {
        "layoutNode": [{ type: core.Input },],
        "layoutIndex": [{ type: core.Input },],
        "dataIndex": [{ type: core.Input },],
    };
    var SelectComponent = (function () {
        function SelectComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
            this.selectList = [];
            this.isArray = isArray;
        }
        SelectComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
            this.selectList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, !!this.options.required, !!this.options.flatList);
            this.jsf.initializeControl(this);
        };
        SelectComponent.prototype.updateValue = function (event) {
            this.jsf.updateValue(this, event.target.value);
        };
        return SelectComponent;
    }());
    SelectComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'select-widget',
                    template: "\n    <div\n      [class]=\"options?.htmlClass || ''\">\n      <label *ngIf=\"options?.title\"\n        [attr.for]=\"'control' + layoutNode?._id\"\n        [class]=\"options?.labelHtmlClass || ''\"\n        [style.display]=\"options?.notitle ? 'none' : ''\"\n        [innerHTML]=\"options?.title\"></label>\n      <select *ngIf=\"boundControl\"\n        [formControl]=\"formControl\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.required]=\"options?.required\"\n        [class]=\"options?.fieldHtmlClass || ''\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\">\n        <ng-template ngFor let-selectItem [ngForOf]=\"selectList\">\n          <option *ngIf=\"!isArray(selectItem?.items)\"\n            [value]=\"selectItem?.value\">\n            <span [innerHTML]=\"selectItem?.name\"></span>\n          </option>\n          <optgroup *ngIf=\"isArray(selectItem?.items)\"\n            [label]=\"selectItem?.group\">\n            <option *ngFor=\"let subItem of selectItem.items\"\n              [value]=\"subItem?.value\">\n              <span [innerHTML]=\"subItem?.name\"></span>\n            </option>\n          </optgroup>\n        </ng-template>\n      </select>\n      <select *ngIf=\"!boundControl\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.required]=\"options?.required\"\n        [class]=\"options?.fieldHtmlClass || ''\"\n        [disabled]=\"controlDisabled\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        (change)=\"updateValue($event)\">\n        <ng-template ngFor let-selectItem [ngForOf]=\"selectList\">\n          <option *ngIf=\"!isArray(selectItem?.items)\"\n            [selected]=\"selectItem?.value === controlValue\"\n            [value]=\"selectItem?.value\">\n            <span [innerHTML]=\"selectItem?.name\"></span>\n          </option>\n          <optgroup *ngIf=\"isArray(selectItem?.items)\"\n            [label]=\"selectItem?.group\">\n            <option *ngFor=\"let subItem of selectItem.items\"\n              [attr.selected]=\"subItem?.value === controlValue\"\n              [value]=\"subItem?.value\">\n              <span [innerHTML]=\"subItem?.name\"></span>\n            </option>\n          </optgroup>\n        </ng-template>\n      </select>\n    </div>",
                },] },
    ];
    /** @nocollapse */
    SelectComponent.ctorParameters = function () {
        return [
            { type: JsonSchemaFormService, },
        ];
    };
    SelectComponent.propDecorators = {
        "layoutNode": [{ type: core.Input },],
        "layoutIndex": [{ type: core.Input },],
        "dataIndex": [{ type: core.Input },],
    };
    var SelectFrameworkComponent = (function () {
        function SelectFrameworkComponent(componentFactory, jsf) {
            this.componentFactory = componentFactory;
            this.jsf = jsf;
            this.newComponent = null;
        }
        SelectFrameworkComponent.prototype.ngOnInit = function () {
            this.updateComponent();
        };
        SelectFrameworkComponent.prototype.ngOnChanges = function () {
            this.updateComponent();
        };
        SelectFrameworkComponent.prototype.updateComponent = function () {
            if (!this.newComponent && this.jsf.framework) {
                this.newComponent = this.widgetContainer.createComponent(this.componentFactory.resolveComponentFactory(this.jsf.framework));
            }
            if (this.newComponent) {
                try {
                    for (var _a = tslib.__values(['layoutNode', 'layoutIndex', 'dataIndex']), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var input = _b.value;
                        this.newComponent.instance[input] = this[input];
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
            }
            var e_1, _c;
        };
        return SelectFrameworkComponent;
    }());
    SelectFrameworkComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'select-framework-widget',
                    template: "<div #widgetContainer></div>",
                },] },
    ];
    /** @nocollapse */
    SelectFrameworkComponent.ctorParameters = function () {
        return [
            { type: core.ComponentFactoryResolver, },
            { type: JsonSchemaFormService, },
        ];
    };
    SelectFrameworkComponent.propDecorators = {
        "layoutNode": [{ type: core.Input },],
        "layoutIndex": [{ type: core.Input },],
        "dataIndex": [{ type: core.Input },],
        "widgetContainer": [{ type: core.ViewChild, args: ['widgetContainer', { read: core.ViewContainerRef },] },],
    };
    var SelectWidgetComponent = (function () {
        function SelectWidgetComponent(componentFactory, jsf) {
            this.componentFactory = componentFactory;
            this.jsf = jsf;
            this.newComponent = null;
        }
        SelectWidgetComponent.prototype.ngOnInit = function () {
            this.updateComponent();
        };
        SelectWidgetComponent.prototype.ngOnChanges = function () {
            this.updateComponent();
        };
        SelectWidgetComponent.prototype.updateComponent = function () {
            if (!this.newComponent && (this.layoutNode || {}).widget) {
                this.newComponent = this.widgetContainer.createComponent(this.componentFactory.resolveComponentFactory(this.layoutNode.widget));
            }
            if (this.newComponent) {
                try {
                    for (var _a = tslib.__values(['layoutNode', 'layoutIndex', 'dataIndex']), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var input = _b.value;
                        this.newComponent.instance[input] = this[input];
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
            }
            var e_1, _c;
        };
        return SelectWidgetComponent;
    }());
    SelectWidgetComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'select-widget-widget',
                    template: "<div #widgetContainer></div>",
                },] },
    ];
    /** @nocollapse */
    SelectWidgetComponent.ctorParameters = function () {
        return [
            { type: core.ComponentFactoryResolver, },
            { type: JsonSchemaFormService, },
        ];
    };
    SelectWidgetComponent.propDecorators = {
        "layoutNode": [{ type: core.Input },],
        "layoutIndex": [{ type: core.Input },],
        "dataIndex": [{ type: core.Input },],
        "widgetContainer": [{ type: core.ViewChild, args: ['widgetContainer', { read: core.ViewContainerRef },] },],
    };
    var SubmitComponent = (function () {
        function SubmitComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
        }
        SubmitComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.options = this.layoutNode.options || {};
            this.jsf.initializeControl(this);
            if (hasOwn(this.options, 'disabled')) {
                this.controlDisabled = this.options.disabled;
            }
            else if (this.jsf.formOptions.disableInvalidSubmit) {
                this.controlDisabled = !this.jsf.isValid;
                this.jsf.isValidChanges.subscribe(function (isValid) { return _this.controlDisabled = !isValid; });
            }
            if (this.controlValue === null || this.controlValue === undefined) {
                this.controlValue = this.options.title;
            }
        };
        SubmitComponent.prototype.updateValue = function (event) {
            if (typeof this.options.onClick === 'function') {
                this.options.onClick(event);
            }
            else {
                this.jsf.updateValue(this, event.target.value);
            }
        };
        return SubmitComponent;
    }());
    SubmitComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'submit-widget',
                    template: "\n    <div\n      [class]=\"options?.htmlClass || ''\">\n      <input\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.required]=\"options?.required\"\n        [class]=\"options?.fieldHtmlClass || ''\"\n        [disabled]=\"controlDisabled\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        [type]=\"layoutNode?.type\"\n        [value]=\"controlValue\"\n        (click)=\"updateValue($event)\">\n    </div>",
                },] },
    ];
    /** @nocollapse */
    SubmitComponent.ctorParameters = function () {
        return [
            { type: JsonSchemaFormService, },
        ];
    };
    SubmitComponent.propDecorators = {
        "layoutNode": [{ type: core.Input },],
        "layoutIndex": [{ type: core.Input },],
        "dataIndex": [{ type: core.Input },],
    };
    var TabsComponent = (function () {
        function TabsComponent(jsf) {
            this.jsf = jsf;
            this.selectedItem = 0;
            this.showAddTab = true;
        }
        TabsComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
            this.itemCount = this.layoutNode.items.length - 1;
            this.updateControl();
        };
        TabsComponent.prototype.select = function (index) {
            if (this.layoutNode.items[index].type === '$ref') {
                this.itemCount = this.layoutNode.items.length;
                this.jsf.addItem({
                    layoutNode: this.layoutNode.items[index],
                    layoutIndex: this.layoutIndex.concat(index),
                    dataIndex: this.dataIndex.concat(index)
                });
                this.updateControl();
            }
            this.selectedItem = index;
        };
        TabsComponent.prototype.updateControl = function () {
            var lastItem = this.layoutNode.items[this.layoutNode.items.length - 1];
            if (lastItem.type === '$ref' &&
                this.itemCount >= (lastItem.options.maxItems || 1000)) {
                this.showAddTab = false;
            }
        };
        TabsComponent.prototype.setTabTitle = function (item, index) {
            return this.jsf.setArrayItemTitle(this, item, index);
        };
        return TabsComponent;
    }());
    TabsComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'tabs-widget',
                    template: "\n    <ul\n      [class]=\"options?.labelHtmlClass || ''\">\n      <li *ngFor=\"let item of layoutNode?.items; let i = index\"\n        [class]=\"(options?.itemLabelHtmlClass || '') + (selectedItem === i ?\n          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :\n          (' ' + options?.style?.unselected))\"\n        role=\"presentation\"\n        data-tabs>\n        <a *ngIf=\"showAddTab || item.type !== '$ref'\"\n           [class]=\"'nav-link' + (selectedItem === i ? (' ' + options?.activeClass + ' ' + options?.style?.selected) :\n            (' ' + options?.style?.unselected))\"\n          [innerHTML]=\"setTabTitle(item, i)\"\n          (click)=\"select(i)\"></a>\n      </li>\n    </ul>\n\n    <div *ngFor=\"let layoutItem of layoutNode?.items; let i = index\"\n      [class]=\"options?.htmlClass || ''\">\n\n      <select-framework-widget *ngIf=\"selectedItem === i\"\n        [class]=\"(options?.fieldHtmlClass || '') +\n          ' ' + (options?.activeClass || '') +\n          ' ' + (options?.style?.selected || '')\"\n        [dataIndex]=\"layoutNode?.dataType === 'array' ? (dataIndex || []).concat(i) : dataIndex\"\n        [layoutIndex]=\"(layoutIndex || []).concat(i)\"\n        [layoutNode]=\"layoutItem\"></select-framework-widget>\n\n    </div>",
                    styles: [" a { cursor: pointer; } "],
                },] },
    ];
    /** @nocollapse */
    TabsComponent.ctorParameters = function () {
        return [
            { type: JsonSchemaFormService, },
        ];
    };
    TabsComponent.propDecorators = {
        "layoutNode": [{ type: core.Input },],
        "layoutIndex": [{ type: core.Input },],
        "dataIndex": [{ type: core.Input },],
    };
    var TemplateComponent = (function () {
        function TemplateComponent(componentFactory, jsf) {
            this.componentFactory = componentFactory;
            this.jsf = jsf;
            this.newComponent = null;
        }
        TemplateComponent.prototype.ngOnInit = function () {
            this.updateComponent();
        };
        TemplateComponent.prototype.ngOnChanges = function () {
            this.updateComponent();
        };
        TemplateComponent.prototype.updateComponent = function () {
            if (!this.newComponent && this.layoutNode.options.template) {
                this.newComponent = this.widgetContainer.createComponent(this.componentFactory.resolveComponentFactory(this.layoutNode.options.template));
            }
            if (this.newComponent) {
                try {
                    for (var _a = tslib.__values(['layoutNode', 'layoutIndex', 'dataIndex']), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var input = _b.value;
                        this.newComponent.instance[input] = this[input];
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
            }
            var e_1, _c;
        };
        return TemplateComponent;
    }());
    TemplateComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'template-widget',
                    template: "<div #widgetContainer></div>",
                },] },
    ];
    /** @nocollapse */
    TemplateComponent.ctorParameters = function () {
        return [
            { type: core.ComponentFactoryResolver, },
            { type: JsonSchemaFormService, },
        ];
    };
    TemplateComponent.propDecorators = {
        "layoutNode": [{ type: core.Input },],
        "layoutIndex": [{ type: core.Input },],
        "dataIndex": [{ type: core.Input },],
        "widgetContainer": [{ type: core.ViewChild, args: ['widgetContainer', { read: core.ViewContainerRef },] },],
    };
    var TextareaComponent = (function () {
        function TextareaComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
        }
        TextareaComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
            this.jsf.initializeControl(this);
        };
        TextareaComponent.prototype.updateValue = function (event) {
            this.jsf.updateValue(this, event.target.value);
        };
        return TextareaComponent;
    }());
    TextareaComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'textarea-widget',
                    template: "\n    <div\n      [class]=\"options?.htmlClass || ''\">\n      <label *ngIf=\"options?.title\"\n        [attr.for]=\"'control' + layoutNode?._id\"\n        [class]=\"options?.labelHtmlClass || ''\"\n        [style.display]=\"options?.notitle ? 'none' : ''\"\n        [innerHTML]=\"options?.title\"></label>\n      <textarea *ngIf=\"boundControl\"\n        [formControl]=\"formControl\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.maxlength]=\"options?.maxLength\"\n        [attr.minlength]=\"options?.minLength\"\n        [attr.pattern]=\"options?.pattern\"\n        [attr.placeholder]=\"options?.placeholder\"\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.required]=\"options?.required\"\n        [class]=\"options?.fieldHtmlClass || ''\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"></textarea>\n      <textarea *ngIf=\"!boundControl\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.maxlength]=\"options?.maxLength\"\n        [attr.minlength]=\"options?.minLength\"\n        [attr.pattern]=\"options?.pattern\"\n        [attr.placeholder]=\"options?.placeholder\"\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.required]=\"options?.required\"\n        [class]=\"options?.fieldHtmlClass || ''\"\n        [disabled]=\"controlDisabled\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        [value]=\"controlValue\"\n        (input)=\"updateValue($event)\">{{controlValue}}</textarea>\n    </div>",
                },] },
    ];
    /** @nocollapse */
    TextareaComponent.ctorParameters = function () {
        return [
            { type: JsonSchemaFormService, },
        ];
    };
    TextareaComponent.propDecorators = {
        "layoutNode": [{ type: core.Input },],
        "layoutIndex": [{ type: core.Input },],
        "dataIndex": [{ type: core.Input },],
    };
    var WidgetLibraryService = (function () {
        function WidgetLibraryService() {
            this.defaultWidget = 'text';
            this.widgetLibrary = {
                // Angular JSON Schema Form administrative widgets
                'none': NoneComponent,
                // Placeholder, for development - displays nothing
                'root': RootComponent,
                // Form root, renders a complete layout
                'select-framework': SelectFrameworkComponent,
                // Applies the selected framework to a specified widget
                'select-widget': SelectWidgetComponent,
                // Displays a specified widget
                '$ref': AddReferenceComponent,
                // Button to add a new array item or $ref element
                // Free-form text HTML 'input' form control widgets <input type="...">
                'email': 'text',
                'integer': 'number',
                // Note: 'integer' is not a recognized HTML input type
                'number': NumberComponent,
                'password': 'text',
                'search': 'text',
                'tel': 'text',
                'text': InputComponent,
                'url': 'text',
                // Controlled text HTML 'input' form control widgets <input type="...">
                'color': 'text',
                'date': 'text',
                'datetime': 'text',
                'datetime-local': 'text',
                'month': 'text',
                'range': 'number',
                'time': 'text',
                'week': 'text',
                // Non-text HTML 'input' form control widgets <input type="...">
                // 'button': <input type="button"> not used, use <button> instead
                'checkbox': CheckboxComponent,
                // TODO: Set ternary = true for 3-state ??
                'file': FileComponent,
                // TODO: Finish 'file' widget
                'hidden': 'text',
                'image': 'text',
                // TODO: Figure out how to handle these
                'radio': 'radios',
                'reset': 'submit',
                // TODO: Figure out how to handle these
                'submit': SubmitComponent,
                // Other (non-'input') HTML form control widgets
                'button': ButtonComponent,
                'select': SelectComponent,
                // 'option': automatically generated by select widgets
                // 'optgroup': automatically generated by select widgets
                'textarea': TextareaComponent,
                // HTML form control widget sets
                'checkboxes': CheckboxesComponent,
                // Grouped list of checkboxes
                'checkboxes-inline': 'checkboxes',
                // Checkboxes in one line
                'checkboxbuttons': 'checkboxes',
                // Checkboxes as html buttons
                'radios': RadiosComponent,
                // Grouped list of radio buttons
                'radios-inline': 'radios',
                // Radio controls in one line
                'radiobuttons': 'radios',
                // Radio controls as html buttons
                // HTML Layout widgets
                // 'label': automatically added to data widgets
                // 'legend': automatically added to fieldsets
                'section': SectionComponent,
                // Just a div <div>
                'div': 'section',
                // Still just a div <div>
                'fieldset': 'section',
                // A fieldset, with an optional legend <fieldset>
                'flex': 'section',
                // A flexbox container <div style="display: flex">
                // Non-HTML layout widgets
                'one-of': OneOfComponent,
                // A select box that changes another input
                // TODO: Finish 'one-of' widget
                'array': 'section',
                // A list you can add, remove and reorder <fieldset>
                'tabarray': 'tabs',
                // A tabbed version of array
                'tab': 'section',
                // A tab group, similar to a fieldset or section <fieldset>
                'tabs': TabsComponent,
                // A tabbed set of panels with different controls
                'message': MessageComponent,
                // Insert arbitrary html
                'help': 'message',
                // Insert arbitrary html
                'msg': 'message',
                // Insert arbitrary html
                'html': 'message',
                // Insert arbitrary html
                'template': TemplateComponent,
                // Insert a custom Angular component
                // Widgets included for compatibility with JSON Form API
                'advancedfieldset': 'section',
                // Adds 'Advanced settings' title <fieldset>
                'authfieldset': 'section',
                // Adds 'Authentication settings' title <fieldset>
                'optionfieldset': 'one-of',
                // Option control, displays selected sub-item <fieldset>
                'selectfieldset': 'one-of',
                // Select control, displays selected sub-item <fieldset>
                'conditional': 'section',
                // Identical to 'section' (depeciated) <div>
                'actions': 'section',
                // Horizontal button list, can only submit, uses buttons as items <div>
                'tagsinput': 'section',
                // For entering short text tags <div>
                // See: http://ulion.github.io/jsonform/playground/?example=fields-checkboxbuttons
                // Widgets included for compatibility with React JSON Schema Form API
                'updown': 'number',
                'date-time': 'datetime-local',
                'alt-datetime': 'datetime-local',
                'alt-date': 'date',
                // Widgets included for compatibility with Angular Schema Form API
                'wizard': 'section',
                // TODO: Sequential panels with "Next" and "Previous" buttons
                // Widgets included for compatibility with other libraries
                'textline': 'text',
            };
            this.registeredWidgets = {};
            this.frameworkWidgets = {};
            this.activeWidgets = {};
            this.setActiveWidgets();
        }
        WidgetLibraryService.prototype.setActiveWidgets = function () {
            this.activeWidgets = Object.assign({}, this.widgetLibrary, this.frameworkWidgets, this.registeredWidgets);
            try {
                for (var _a = tslib.__values(Object.keys(this.activeWidgets)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var widgetName = _b.value;
                    var widget = this.activeWidgets[widgetName];
                    // Resolve aliases
                    if (typeof widget === 'string') {
                        var usedAliases = [];
                        while (typeof widget === 'string' && !usedAliases.includes(widget)) {
                            usedAliases.push(widget);
                            widget = this.activeWidgets[widget];
                        }
                        if (typeof widget !== 'string') {
                            this.activeWidgets[widgetName] = widget;
                        }
                    }
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return))
                        _c.call(_a);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
            }
            return true;
            var e_1, _c;
        };
        WidgetLibraryService.prototype.setDefaultWidget = function (type) {
            if (!this.hasWidget(type)) {
                return false;
            }
            this.defaultWidget = type;
            return true;
        };
        WidgetLibraryService.prototype.hasWidget = function (type, widgetSet) {
            if (widgetSet === void 0) {
                widgetSet = 'activeWidgets';
            }
            if (!type || typeof type !== 'string') {
                return false;
            }
            return hasOwn(this[widgetSet], type);
        };
        WidgetLibraryService.prototype.hasDefaultWidget = function (type) {
            return this.hasWidget(type, 'widgetLibrary');
        };
        WidgetLibraryService.prototype.registerWidget = function (type, widget) {
            if (!type || !widget || typeof type !== 'string') {
                return false;
            }
            this.registeredWidgets[type] = widget;
            return this.setActiveWidgets();
        };
        WidgetLibraryService.prototype.unRegisterWidget = function (type) {
            if (!hasOwn(this.registeredWidgets, type)) {
                return false;
            }
            delete this.registeredWidgets[type];
            return this.setActiveWidgets();
        };
        WidgetLibraryService.prototype.unRegisterAllWidgets = function (unRegisterFrameworkWidgets) {
            if (unRegisterFrameworkWidgets === void 0) {
                unRegisterFrameworkWidgets = true;
            }
            this.registeredWidgets = {};
            if (unRegisterFrameworkWidgets) {
                this.frameworkWidgets = {};
            }
            return this.setActiveWidgets();
        };
        WidgetLibraryService.prototype.registerFrameworkWidgets = function (widgets) {
            if (widgets === null || typeof widgets !== 'object') {
                widgets = {};
            }
            this.frameworkWidgets = widgets;
            return this.setActiveWidgets();
        };
        WidgetLibraryService.prototype.unRegisterFrameworkWidgets = function () {
            if (Object.keys(this.frameworkWidgets).length) {
                this.frameworkWidgets = {};
                return this.setActiveWidgets();
            }
            return false;
        };
        WidgetLibraryService.prototype.getWidget = function (type, widgetSet) {
            if (widgetSet === void 0) {
                widgetSet = 'activeWidgets';
            }
            if (this.hasWidget(type, widgetSet)) {
                return this[widgetSet][type];
            }
            else if (this.hasWidget(this.defaultWidget, widgetSet)) {
                return this[widgetSet][this.defaultWidget];
            }
            else {
                return null;
            }
        };
        WidgetLibraryService.prototype.getAllWidgets = function () {
            return {
                widgetLibrary: this.widgetLibrary,
                registeredWidgets: this.registeredWidgets,
                frameworkWidgets: this.frameworkWidgets,
                activeWidgets: this.activeWidgets,
            };
        };
        return WidgetLibraryService;
    }());
    WidgetLibraryService.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    WidgetLibraryService.ctorParameters = function () { return []; };
    var Framework = (function () {
        function Framework() {
            this.widgets = {};
            this.stylesheets = [];
            this.scripts = [];
        }
        return Framework;
    }());
    Framework.decorators = [
        { type: core.Injectable },
    ];
    // Possible future frameworks:
    // - Foundation 6:
    //   http://justindavis.co/2017/06/15/using-foundation-6-in-angular-4/
    //   https://github.com/zurb/foundation-sites
    // - Semantic UI:
    //   https://github.com/edcarroll/ng2-semantic-ui
    //   https://github.com/vladotesanovic/ngSemantic
    var FrameworkLibraryService = (function () {
        function FrameworkLibraryService(frameworks, widgetLibrary) {
            var _this = this;
            this.frameworks = frameworks;
            this.widgetLibrary = widgetLibrary;
            this.activeFramework = null;
            this.loadExternalAssets = false;
            this.frameworkLibrary = {};
            this.frameworks.forEach(function (framework) { return _this.frameworkLibrary[framework.name] = framework; });
            this.defaultFramework = this.frameworks[0].name;
            this.setFramework(this.defaultFramework);
        }
        FrameworkLibraryService.prototype.setLoadExternalAssets = function (loadExternalAssets) {
            if (loadExternalAssets === void 0) {
                loadExternalAssets = true;
            }
            this.loadExternalAssets = !!loadExternalAssets;
        };
        FrameworkLibraryService.prototype.setFramework = function (framework, loadExternalAssets) {
            if (framework === void 0) {
                framework = this.defaultFramework;
            }
            if (loadExternalAssets === void 0) {
                loadExternalAssets = this.loadExternalAssets;
            }
            this.activeFramework =
                typeof framework === 'string' && this.hasFramework(framework) ?
                    this.frameworkLibrary[framework] :
                    typeof framework === 'object' && hasOwn(framework, 'framework') ?
                        framework :
                        this.frameworkLibrary[this.defaultFramework];
            return this.registerFrameworkWidgets(this.activeFramework);
        };
        FrameworkLibraryService.prototype.registerFrameworkWidgets = function (framework) {
            return hasOwn(framework, 'widgets') ?
                this.widgetLibrary.registerFrameworkWidgets(framework.widgets) :
                this.widgetLibrary.unRegisterFrameworkWidgets();
        };
        FrameworkLibraryService.prototype.hasFramework = function (type) {
            return hasOwn(this.frameworkLibrary, type);
        };
        FrameworkLibraryService.prototype.getFramework = function () {
            if (!this.activeFramework) {
                this.setFramework('default', true);
            }
            return this.activeFramework.framework;
        };
        FrameworkLibraryService.prototype.getFrameworkWidgets = function () {
            return this.activeFramework.widgets || {};
        };
        FrameworkLibraryService.prototype.getFrameworkStylesheets = function (load) {
            if (load === void 0) {
                load = this.loadExternalAssets;
            }
            return (load && this.activeFramework.stylesheets) || [];
        };
        FrameworkLibraryService.prototype.getFrameworkScripts = function (load) {
            if (load === void 0) {
                load = this.loadExternalAssets;
            }
            return (load && this.activeFramework.scripts) || [];
        };
        return FrameworkLibraryService;
    }());
    FrameworkLibraryService.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    FrameworkLibraryService.ctorParameters = function () {
        return [
            { type: Array, decorators: [{ type: core.Inject, args: [Framework,] },] },
            { type: WidgetLibraryService, decorators: [{ type: core.Inject, args: [WidgetLibraryService,] },] },
        ];
    };
    var JSON_SCHEMA_FORM_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        // tslint:disable-next-line no-use-before-declare
        useExisting: core.forwardRef(function () { return JsonSchemaFormComponent; }),
        multi: true,
    };
    /**
     * @module 'JsonSchemaFormComponent' - Angular JSON Schema Form
     *
     * Root module of the Angular JSON Schema Form client-side library,
     * an Angular library which generates an HTML form from a JSON schema
     * structured data model and/or a JSON Schema Form layout description.
     *
     * This library also validates input data by the user, using both validators on
     * individual controls to provide real-time feedback while the user is filling
     * out the form, and then validating the entire input against the schema when
     * the form is submitted to make sure the returned JSON data object is valid.
     *
     * This library is similar to, and mostly API compatible with:
     *
     * - JSON Schema Form's Angular Schema Form library for AngularJs
     *   http://schemaform.io
     *   http://schemaform.io/examples/bootstrap-example.html (examples)
     *
     * - Mozilla's react-jsonschema-form library for React
     *   https://github.com/mozilla-services/react-jsonschema-form
     *   https://mozilla-services.github.io/react-jsonschema-form (examples)
     *
     * - Joshfire's JSON Form library for jQuery
     *   https://github.com/joshfire/jsonform
     *   http://ulion.github.io/jsonform/playground (examples)
     *
     * This library depends on:
     *  - Angular (obviously)                  https://angular.io
     *  - lodash, JavaScript utility library   https://github.com/lodash/lodash
     *  - ajv, Another JSON Schema validator   https://github.com/epoberezkin/ajv
     *
     * In addition, the Example Playground also depends on:
     *  - brace, Browserified Ace editor       http://thlorenz.github.io/brace
     */
    var JsonSchemaFormComponent = (function () {
        function JsonSchemaFormComponent(changeDetector, frameworkLibrary, widgetLibrary, jsf, sanitizer) {
            this.changeDetector = changeDetector;
            this.frameworkLibrary = frameworkLibrary;
            this.widgetLibrary = widgetLibrary;
            this.jsf = jsf;
            this.sanitizer = sanitizer;
            this.formValueSubscription = null;
            this.formInitialized = false;
            this.objectWrap = false;
            this.previousInputs = {
                schema: null, layout: null, data: null, options: null, framework: null,
                widgets: null, form: null, model: null, JSONSchema: null, UISchema: null,
                formData: null, loadExternalAssets: null, debug: null,
            };
            // Outputs
            // tslint:disable no-output-on-prefix
            this.onChanges = new core.EventEmitter();
            this.onSubmit = new core.EventEmitter();
            // tslint:enable no-output-on-prefix
            this.isValid = new core.EventEmitter();
            this.validationErrors = new core.EventEmitter();
            this.formSchema = new core.EventEmitter();
            this.formLayout = new core.EventEmitter();
            // Outputs for possible 2-way data binding
            // Only the one input providing the initial form data will be bound.
            // If there is no inital data, input '{}' to activate 2-way data binding.
            // There is no 2-way binding if inital data is combined inside the 'form' input.
            this.dataChange = new core.EventEmitter();
            this.modelChange = new core.EventEmitter();
            this.formDataChange = new core.EventEmitter();
            this.ngModelChange = new core.EventEmitter();
        }
        Object.defineProperty(JsonSchemaFormComponent.prototype, "value", {
            get: function () {
                return this.objectWrap ? this.jsf.data['1'] : this.jsf.data;
            },
            set: function (value) {
                this.setFormValues(value, false);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JsonSchemaFormComponent.prototype, "stylesheets", {
            get: function () {
                var stylesheets = this.frameworkLibrary.getFrameworkStylesheets();
                var load = this.sanitizer.bypassSecurityTrustResourceUrl;
                return stylesheets.map(function (stylesheet) { return load(stylesheet); });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JsonSchemaFormComponent.prototype, "scripts", {
            get: function () {
                var scripts = this.frameworkLibrary.getFrameworkScripts();
                var load = this.sanitizer.bypassSecurityTrustResourceUrl;
                return scripts.map(function (script) { return load(script); });
            },
            enumerable: true,
            configurable: true
        });
        JsonSchemaFormComponent.prototype.ngOnInit = function () {
            this.updateForm();
        };
        JsonSchemaFormComponent.prototype.ngOnChanges = function () {
            this.updateForm();
        };
        JsonSchemaFormComponent.prototype.writeValue = function (value) {
            this.setFormValues(value, false);
            if (!this.formValuesInput) {
                this.formValuesInput = 'ngModel';
            }
        };
        JsonSchemaFormComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        JsonSchemaFormComponent.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        JsonSchemaFormComponent.prototype.setDisabledState = function (isDisabled) {
            if (this.jsf.formOptions.formDisabled !== !!isDisabled) {
                this.jsf.formOptions.formDisabled = !!isDisabled;
                this.initializeForm();
            }
        };
        JsonSchemaFormComponent.prototype.updateForm = function () {
            var _this = this;
            if (!this.formInitialized || !this.formValuesInput ||
                (this.language && this.language !== this.jsf.language)) {
                this.initializeForm();
            }
            else {
                if (this.language && this.language !== this.jsf.language) {
                    this.jsf.setLanguage(this.language);
                }
                // Get names of changed inputs
                var changedInput = Object.keys(this.previousInputs)
                    .filter(function (input) { return _this.previousInputs[input] !== _this[input]; });
                var resetFirst = true;
                if (changedInput.length === 1 && changedInput[0] === 'form' &&
                    this.formValuesInput.startsWith('form.')) {
                    // If only 'form' input changed, get names of changed keys
                    changedInput = Object.keys(this.previousInputs.form || {})
                        .filter(function (key) { return !lodash.isEqual(_this.previousInputs.form[key], _this.form[key]); })
                        .map(function (key) { return "form." + key; });
                    resetFirst = false;
                }
                // If only input values have changed, update the form values
                if (changedInput.length === 1 && changedInput[0] === this.formValuesInput) {
                    if (this.formValuesInput.indexOf('.') === -1) {
                        this.setFormValues(this[this.formValuesInput], resetFirst);
                    }
                    else {
                        var _a = tslib.__read(this.formValuesInput.split('.'), 2), input = _a[0], key = _a[1];
                        this.setFormValues(this[input][key], resetFirst);
                    }
                    // If anything else has changed, re-render the entire form
                }
                else if (changedInput.length) {
                    this.initializeForm();
                    if (this.onChange) {
                        this.onChange(this.jsf.formValues);
                    }
                    if (this.onTouched) {
                        this.onTouched(this.jsf.formValues);
                    }
                }
                // Update previous inputs
                Object.keys(this.previousInputs)
                    .filter(function (input) { return _this.previousInputs[input] !== _this[input]; })
                    .forEach(function (input) { return _this.previousInputs[input] = _this[input]; });
            }
        };
        JsonSchemaFormComponent.prototype.setFormValues = function (formValues, resetFirst) {
            if (resetFirst === void 0) {
                resetFirst = true;
            }
            if (formValues) {
                var newFormValues = this.objectWrap ? formValues['1'] : formValues;
                if (!this.jsf.formGroup) {
                    this.jsf.formValues = formValues;
                    this.activateForm();
                }
                else if (resetFirst) {
                    this.jsf.formGroup.reset();
                }
                if (this.jsf.formGroup) {
                    this.jsf.formGroup.patchValue(newFormValues);
                }
                if (this.onChange) {
                    this.onChange(newFormValues);
                }
                if (this.onTouched) {
                    this.onTouched(newFormValues);
                }
            }
            else {
                this.jsf.formGroup.reset();
            }
        };
        JsonSchemaFormComponent.prototype.submitForm = function () {
            var validData = this.jsf.validData;
            this.onSubmit.emit(this.objectWrap ? validData['1'] : validData);
        };
        /**
           * 'initializeForm' function
           *
           * - Update 'schema', 'layout', and 'formValues', from inputs.
           *
           * - Create 'schemaRefLibrary' and 'schemaRecursiveRefMap'
           *   to resolve schema $ref links, including recursive $ref links.
           *
           * - Create 'dataRecursiveRefMap' to resolve recursive links in data
           *   and corectly set output formats for recursively nested values.
           *
           * - Create 'layoutRefLibrary' and 'templateRefLibrary' to store
           *   new layout nodes and formGroup elements to use when dynamically
           *   adding form components to arrays and recursive $ref points.
           *
           * - Create 'dataMap' to map the data to the schema and template.
           *
           * - Create the master 'formGroupTemplate' then from it 'formGroup'
           *   the Angular formGroup used to control the reactive form.
           */
        JsonSchemaFormComponent.prototype.initializeForm = function () {
            if (this.schema || this.layout || this.data || this.form || this.model ||
                this.JSONSchema || this.UISchema || this.formData || this.ngModel ||
                this.jsf.data) {
                this.jsf.resetAllValues(); // Reset all form values to defaults
                this.initializeOptions(); // Update options
                this.initializeSchema(); // Update schema, schemaRefLibrary,
                // schemaRecursiveRefMap, & dataRecursiveRefMap
                this.initializeLayout(); // Update layout, layoutRefLibrary,
                this.initializeData(); // Update formValues
                this.activateForm(); // Update dataMap, templateRefLibrary,
                // formGroupTemplate, formGroup
                // Uncomment individual lines to output debugging information to console:
                // (These always work.)
                // console.log('loading form...');
                // console.log('schema', this.jsf.schema);
                // console.log('layout', this.jsf.layout);
                // console.log('options', this.options);
                // console.log('formValues', this.jsf.formValues);
                // console.log('formGroupTemplate', this.jsf.formGroupTemplate);
                // console.log('formGroup', this.jsf.formGroup);
                // console.log('formGroup.value', this.jsf.formGroup.value);
                // console.log('schemaRefLibrary', this.jsf.schemaRefLibrary);
                // console.log('layoutRefLibrary', this.jsf.layoutRefLibrary);
                // console.log('templateRefLibrary', this.jsf.templateRefLibrary);
                // console.log('dataMap', this.jsf.dataMap);
                // console.log('arrayMap', this.jsf.arrayMap);
                // console.log('schemaRecursiveRefMap', this.jsf.schemaRecursiveRefMap);
                // console.log('dataRecursiveRefMap', this.jsf.dataRecursiveRefMap);
                // Uncomment individual lines to output debugging information to browser:
                // (These only work if the 'debug' option has also been set to 'true'.)
                if (this.debug || this.jsf.formOptions.debug) {
                    var vars = [];
                    // vars.push(this.jsf.schema);
                    // vars.push(this.jsf.layout);
                    // vars.push(this.options);
                    // vars.push(this.jsf.formValues);
                    // vars.push(this.jsf.formGroup.value);
                    // vars.push(this.jsf.formGroupTemplate);
                    // vars.push(this.jsf.formGroup);
                    // vars.push(this.jsf.schemaRefLibrary);
                    // vars.push(this.jsf.layoutRefLibrary);
                    // vars.push(this.jsf.templateRefLibrary);
                    // vars.push(this.jsf.dataMap);
                    // vars.push(this.jsf.arrayMap);
                    // vars.push(this.jsf.schemaRecursiveRefMap);
                    // vars.push(this.jsf.dataRecursiveRefMap);
                    this.debugOutput = vars.map(function (v) { return JSON.stringify(v, null, 2); }).join('\n');
                }
                this.formInitialized = true;
            }
        };
        /**
           * 'initializeOptions' function
           *
           * Initialize 'options' (global form options) and set framework
           * Combine available inputs:
           * 1. options - recommended
           * 2. form.options - Single input style
           */
        JsonSchemaFormComponent.prototype.initializeOptions = function () {
            if (this.language && this.language !== this.jsf.language) {
                this.jsf.setLanguage(this.language);
            }
            this.jsf.setOptions({ debug: !!this.debug });
            var loadExternalAssets = this.loadExternalAssets || false;
            var framework = this.framework || 'default';
            if (isObject(this.options)) {
                this.jsf.setOptions(this.options);
                loadExternalAssets = this.options.loadExternalAssets || loadExternalAssets;
                framework = this.options.framework || framework;
            }
            if (isObject(this.form) && isObject(this.form.options)) {
                this.jsf.setOptions(this.form.options);
                loadExternalAssets = this.form.options.loadExternalAssets || loadExternalAssets;
                framework = this.form.options.framework || framework;
            }
            if (isObject(this.widgets)) {
                this.jsf.setOptions({ widgets: this.widgets });
            }
            this.frameworkLibrary.setLoadExternalAssets(loadExternalAssets);
            this.frameworkLibrary.setFramework(framework);
            this.jsf.framework = this.frameworkLibrary.getFramework();
            if (isObject(this.jsf.formOptions.widgets)) {
                try {
                    for (var _a = tslib.__values(Object.keys(this.jsf.formOptions.widgets)), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var widget = _b.value;
                        this.widgetLibrary.registerWidget(widget, this.jsf.formOptions.widgets[widget]);
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
            }
            if (isObject(this.form) && isObject(this.form.tpldata)) {
                this.jsf.setTpldata(this.form.tpldata);
            }
            var e_1, _c;
        };
        /**
           * 'initializeSchema' function
           *
           * Initialize 'schema'
           * Use first available input:
           * 1. schema - recommended / Angular Schema Form style
           * 2. form.schema - Single input / JSON Form style
           * 3. JSONSchema - React JSON Schema Form style
           * 4. form.JSONSchema - For testing single input React JSON Schema Forms
           * 5. form - For testing single schema-only inputs
           *
           * ... if no schema input found, the 'activateForm' function, below,
           *     will make two additional attempts to build a schema
           * 6. If layout input - build schema from layout
           * 7. If data input - build schema from data
           */
        JsonSchemaFormComponent.prototype.initializeSchema = function () {
            // TODO: update to allow non-object schemas
            if (isObject(this.schema)) {
                this.jsf.AngularSchemaFormCompatibility = true;
                this.jsf.schema = lodash.cloneDeep(this.schema);
            }
            else if (hasOwn(this.form, 'schema') && isObject(this.form.schema)) {
                this.jsf.schema = lodash.cloneDeep(this.form.schema);
            }
            else if (isObject(this.JSONSchema)) {
                this.jsf.ReactJsonSchemaFormCompatibility = true;
                this.jsf.schema = lodash.cloneDeep(this.JSONSchema);
            }
            else if (hasOwn(this.form, 'JSONSchema') && isObject(this.form.JSONSchema)) {
                this.jsf.ReactJsonSchemaFormCompatibility = true;
                this.jsf.schema = lodash.cloneDeep(this.form.JSONSchema);
            }
            else if (hasOwn(this.form, 'properties') && isObject(this.form.properties)) {
                this.jsf.schema = lodash.cloneDeep(this.form);
            }
            else if (isObject(this.form)) {
                // TODO: Handle other types of form input
            }
            if (!isEmpty(this.jsf.schema)) {
                // If other types also allowed, render schema as an object
                if (inArray('object', this.jsf.schema.type)) {
                    this.jsf.schema.type = 'object';
                }
                // Wrap non-object schemas in object.
                if (hasOwn(this.jsf.schema, 'type') && this.jsf.schema.type !== 'object') {
                    this.jsf.schema = {
                        'type': 'object',
                        'properties': { 1: this.jsf.schema }
                    };
                    this.objectWrap = true;
                }
                else if (!hasOwn(this.jsf.schema, 'type')) {
                    // Add type = 'object' if missing
                    if (isObject(this.jsf.schema.properties) ||
                        isObject(this.jsf.schema.patternProperties) ||
                        isObject(this.jsf.schema.additionalProperties)) {
                        this.jsf.schema.type = 'object';
                        // Fix JSON schema shorthand (JSON Form style)
                    }
                    else {
                        this.jsf.JsonFormCompatibility = true;
                        this.jsf.schema = {
                            'type': 'object',
                            'properties': this.jsf.schema
                        };
                    }
                }
                // If needed, update JSON Schema to draft 6 format, including
                // draft 3 (JSON Form style) and draft 4 (Angular Schema Form style)
                this.jsf.schema = convertSchemaToDraft6(this.jsf.schema);
                // Initialize ajv and compile schema
                this.jsf.compileAjvSchema();
                // Create schemaRefLibrary, schemaRecursiveRefMap, dataRecursiveRefMap, & arrayMap
                this.jsf.schema = resolveSchemaReferences(this.jsf.schema, this.jsf.schemaRefLibrary, this.jsf.schemaRecursiveRefMap, this.jsf.dataRecursiveRefMap, this.jsf.arrayMap);
                if (hasOwn(this.jsf.schemaRefLibrary, '')) {
                    this.jsf.hasRootReference = true;
                }
                // TODO: (?) Resolve external $ref links
                // // Create schemaRefLibrary & schemaRecursiveRefMap
                // this.parser.bundle(this.schema)
                //   .then(schema => this.schema = resolveSchemaReferences(
                //     schema, this.jsf.schemaRefLibrary,
                //     this.jsf.schemaRecursiveRefMap, this.jsf.dataRecursiveRefMap
                //   ));
            }
        };
        /**
           * 'initializeData' function
           *
           * Initialize 'formValues'
           * defulat or previously submitted values used to populate form
           * Use first available input:
           * 1. data - recommended
           * 2. model - Angular Schema Form style
           * 3. form.value - JSON Form style
           * 4. form.data - Single input style
           * 5. formData - React JSON Schema Form style
           * 6. form.formData - For easier testing of React JSON Schema Forms
           * 7. (none) no data - initialize data from schema and layout defaults only
           */
        JsonSchemaFormComponent.prototype.initializeData = function () {
            if (hasValue(this.data)) {
                this.jsf.formValues = lodash.cloneDeep(this.data);
                this.formValuesInput = 'data';
            }
            else if (hasValue(this.model)) {
                this.jsf.AngularSchemaFormCompatibility = true;
                this.jsf.formValues = lodash.cloneDeep(this.model);
                this.formValuesInput = 'model';
            }
            else if (hasValue(this.ngModel)) {
                this.jsf.AngularSchemaFormCompatibility = true;
                this.jsf.formValues = lodash.cloneDeep(this.ngModel);
                this.formValuesInput = 'ngModel';
            }
            else if (isObject(this.form) && hasValue(this.form.value)) {
                this.jsf.JsonFormCompatibility = true;
                this.jsf.formValues = lodash.cloneDeep(this.form.value);
                this.formValuesInput = 'form.value';
            }
            else if (isObject(this.form) && hasValue(this.form.data)) {
                this.jsf.formValues = lodash.cloneDeep(this.form.data);
                this.formValuesInput = 'form.data';
            }
            else if (hasValue(this.formData)) {
                this.jsf.ReactJsonSchemaFormCompatibility = true;
                this.formValuesInput = 'formData';
            }
            else if (hasOwn(this.form, 'formData') && hasValue(this.form.formData)) {
                this.jsf.ReactJsonSchemaFormCompatibility = true;
                this.jsf.formValues = lodash.cloneDeep(this.form.formData);
                this.formValuesInput = 'form.formData';
            }
            else {
                this.formValuesInput = null;
            }
        };
        /**
           * 'initializeLayout' function
           *
           * Initialize 'layout'
           * Use first available array input:
           * 1. layout - recommended
           * 2. form - Angular Schema Form style
           * 3. form.form - JSON Form style
           * 4. form.layout - Single input style
           * 5. (none) no layout - set default layout instead
           *    (full layout will be built later from the schema)
           *
           * Also, if alternate layout formats are available,
           * import from 'UISchema' or 'customFormItems'
           * used for React JSON Schema Form and JSON Form API compatibility
           * Use first available input:
           * 1. UISchema - React JSON Schema Form style
           * 2. form.UISchema - For testing single input React JSON Schema Forms
           * 2. form.customFormItems - JSON Form style
           * 3. (none) no input - don't import
           */
        JsonSchemaFormComponent.prototype.initializeLayout = function () {
            var _this = this;
            // Rename JSON Form-style 'options' lists to
            // Angular Schema Form-style 'titleMap' lists.
            var fixJsonFormOptions = function (layout) {
                if (isObject(layout) || isArray(layout)) {
                    forEach(layout, function (value, key) {
                        if (hasOwn(value, 'options') && isObject(value.options)) {
                            value.titleMap = value.options;
                            delete value.options;
                        }
                    }, 'top-down');
                }
                return layout;
            };
            // Check for layout inputs and, if found, initialize form layout
            if (isArray(this.layout)) {
                this.jsf.layout = lodash.cloneDeep(this.layout);
            }
            else if (isArray(this.form)) {
                this.jsf.AngularSchemaFormCompatibility = true;
                this.jsf.layout = lodash.cloneDeep(this.form);
            }
            else if (this.form && isArray(this.form.form)) {
                this.jsf.JsonFormCompatibility = true;
                this.jsf.layout = fixJsonFormOptions(lodash.cloneDeep(this.form.form));
            }
            else if (this.form && isArray(this.form.layout)) {
                this.jsf.layout = lodash.cloneDeep(this.form.layout);
            }
            else {
                this.jsf.layout = ['*'];
            }
            // Check for alternate layout inputs
            var alternateLayout = null;
            if (isObject(this.UISchema)) {
                this.jsf.ReactJsonSchemaFormCompatibility = true;
                alternateLayout = lodash.cloneDeep(this.UISchema);
            }
            else if (hasOwn(this.form, 'UISchema')) {
                this.jsf.ReactJsonSchemaFormCompatibility = true;
                alternateLayout = lodash.cloneDeep(this.form.UISchema);
            }
            else if (hasOwn(this.form, 'uiSchema')) {
                this.jsf.ReactJsonSchemaFormCompatibility = true;
                alternateLayout = lodash.cloneDeep(this.form.uiSchema);
            }
            else if (hasOwn(this.form, 'customFormItems')) {
                this.jsf.JsonFormCompatibility = true;
                alternateLayout = fixJsonFormOptions(lodash.cloneDeep(this.form.customFormItems));
            }
            // if alternate layout found, copy alternate layout options into schema
            if (alternateLayout) {
                JsonPointer.forEachDeep(alternateLayout, function (value, pointer) {
                    var schemaPointer = pointer
                        .replace(/\//g, '/properties/')
                        .replace(/\/properties\/items\/properties\//g, '/items/properties/')
                        .replace(/\/properties\/titleMap\/properties\//g, '/titleMap/properties/');
                    if (hasValue(value) && hasValue(pointer)) {
                        var key = JsonPointer.toKey(pointer);
                        var groupPointer = (JsonPointer.parse(schemaPointer) || []).slice(0, -2);
                        var itemPointer = void 0;
                        // If 'ui:order' object found, copy into object schema root
                        if (key.toLowerCase() === 'ui:order') {
                            itemPointer = tslib.__spread(groupPointer, ['ui:order']);
                            // Copy other alternate layout options to schema 'x-schema-form',
                            // (like Angular Schema Form options) and remove any 'ui:' prefixes
                        }
                        else {
                            if (key.slice(0, 3).toLowerCase() === 'ui:') {
                                key = key.slice(3);
                            }
                            itemPointer = tslib.__spread(groupPointer, ['x-schema-form', key]);
                        }
                        if (JsonPointer.has(_this.jsf.schema, groupPointer) &&
                            !JsonPointer.has(_this.jsf.schema, itemPointer)) {
                            JsonPointer.set(_this.jsf.schema, itemPointer, value);
                        }
                    }
                });
            }
        };
        /**
           * 'activateForm' function
           *
           * ...continued from 'initializeSchema' function, above
           * If 'schema' has not been initialized (i.e. no schema input found)
           * 6. If layout input - build schema from layout input
           * 7. If data input - build schema from data input
           *
           * Create final layout,
           * build the FormGroup template and the Angular FormGroup,
           * subscribe to changes,
           * and activate the form.
           */
        JsonSchemaFormComponent.prototype.activateForm = function () {
            var _this = this;
            // If 'schema' not initialized
            if (isEmpty(this.jsf.schema)) {
                // TODO: If full layout input (with no '*'), build schema from layout
                // if (!this.jsf.layout.includes('*')) {
                //   this.jsf.buildSchemaFromLayout();
                // } else
                // If data input, build schema from data
                if (!isEmpty(this.jsf.formValues)) {
                    this.jsf.buildSchemaFromData();
                }
            }
            if (!isEmpty(this.jsf.schema)) {
                // If not already initialized, initialize ajv and compile schema
                this.jsf.compileAjvSchema();
                // Update all layout elements, add values, widgets, and validators,
                // replace any '*' with a layout built from all schema elements,
                // and update the FormGroup template with any new validators
                this.jsf.buildLayout(this.widgetLibrary);
                // Build the Angular FormGroup template from the schema
                this.jsf.buildFormGroupTemplate(this.jsf.formValues);
                // Build the real Angular FormGroup from the FormGroup template
                this.jsf.buildFormGroup();
            }
            if (this.jsf.formGroup) {
                // Reset initial form values
                if (!isEmpty(this.jsf.formValues) &&
                    this.jsf.formOptions.setSchemaDefaults !== true &&
                    this.jsf.formOptions.setLayoutDefaults !== true) {
                    this.setFormValues(this.jsf.formValues);
                }
                // TODO: Figure out how to display calculated values without changing object data
                // See http://ulion.github.io/jsonform/playground/?example=templating-values
                // Calculate references to other fields
                // if (!isEmpty(this.jsf.formGroup.value)) {
                //   forEach(this.jsf.formGroup.value, (value, key, object, rootObject) => {
                //     if (typeof value === 'string') {
                //       object[key] = this.jsf.parseText(value, value, rootObject, key);
                //     }
                //   }, 'top-down');
                // }
                // Subscribe to form changes to output live data, validation, and errors
                this.jsf.dataChanges.subscribe(function (data) {
                    _this.onChanges.emit(_this.objectWrap ? data['1'] : data);
                    if (_this.formValuesInput && _this.formValuesInput.indexOf('.') === -1) {
                        _this[_this.formValuesInput + "Change"].emit(_this.objectWrap ? data['1'] : data);
                    }
                });
                // Trigger change detection on statusChanges to show updated errors
                this.jsf.formGroup.statusChanges.subscribe(function () { return _this.changeDetector.markForCheck(); });
                this.jsf.isValidChanges.subscribe(function (isValid) { return _this.isValid.emit(isValid); });
                this.jsf.validationErrorChanges.subscribe(function (err) { return _this.validationErrors.emit(err); });
                // Output final schema, final layout, and initial data
                this.formSchema.emit(this.jsf.schema);
                this.formLayout.emit(this.jsf.layout);
                this.onChanges.emit(this.objectWrap ? this.jsf.data['1'] : this.jsf.data);
                // If validateOnRender, output initial validation and any errors
                var validateOnRender_1 = JsonPointer.get(this.jsf, '/formOptions/validateOnRender');
                if (validateOnRender_1) {
                    // validateOnRender === 'auto' || true
                    var touchAll_1 = function (control) {
                        if (validateOnRender_1 === true || hasValue(control.value)) {
                            control.markAsTouched();
                        }
                        Object.keys(control.controls || {})
                            .forEach(function (key) { return touchAll_1(control.controls[key]); });
                    };
                    touchAll_1(this.jsf.formGroup);
                    this.isValid.emit(this.jsf.isValid);
                    this.validationErrors.emit(this.jsf.ajvErrors);
                }
            }
        };
        return JsonSchemaFormComponent;
    }());
    JsonSchemaFormComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'json-schema-form',
                    template: "\n    <div *ngFor=\"let stylesheet of stylesheets\">\n      <link rel=\"stylesheet\" [href]=\"stylesheet\">\n    </div>\n    <div *ngFor=\"let script of scripts\">\n      <script type=\"text/javascript\" [src]=\"script\"></script>\n    </div>\n    <form class=\"json-schema-form\" (ngSubmit)=\"submitForm()\">\n      <root-widget [layout]=\"jsf?.layout\"></root-widget>\n    </form>\n    <div *ngIf=\"debug || jsf?.formOptions?.debug\">\n      Debug output: <pre>{{debugOutput}}</pre>\n    </div>",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    // Adding 'JsonSchemaFormService' here, instead of in the module,
                    // creates a separate instance of the service for each component
                    providers: [JsonSchemaFormService, JSON_SCHEMA_FORM_VALUE_ACCESSOR],
                },] },
    ];
    /** @nocollapse */
    JsonSchemaFormComponent.ctorParameters = function () {
        return [
            { type: core.ChangeDetectorRef, },
            { type: FrameworkLibraryService, },
            { type: WidgetLibraryService, },
            { type: JsonSchemaFormService, },
            { type: platformBrowser.DomSanitizer, },
        ];
    };
    JsonSchemaFormComponent.propDecorators = {
        "schema": [{ type: core.Input },],
        "layout": [{ type: core.Input },],
        "data": [{ type: core.Input },],
        "options": [{ type: core.Input },],
        "framework": [{ type: core.Input },],
        "widgets": [{ type: core.Input },],
        "form": [{ type: core.Input },],
        "model": [{ type: core.Input },],
        "JSONSchema": [{ type: core.Input },],
        "UISchema": [{ type: core.Input },],
        "formData": [{ type: core.Input },],
        "ngModel": [{ type: core.Input },],
        "language": [{ type: core.Input },],
        "loadExternalAssets": [{ type: core.Input },],
        "debug": [{ type: core.Input },],
        "value": [{ type: core.Input },],
        "onChanges": [{ type: core.Output },],
        "onSubmit": [{ type: core.Output },],
        "isValid": [{ type: core.Output },],
        "validationErrors": [{ type: core.Output },],
        "formSchema": [{ type: core.Output },],
        "formLayout": [{ type: core.Output },],
        "dataChange": [{ type: core.Output },],
        "modelChange": [{ type: core.Output },],
        "formDataChange": [{ type: core.Output },],
        "ngModelChange": [{ type: core.Output },],
    };
    var HiddenComponent = (function () {
        function HiddenComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
        }
        HiddenComponent.prototype.ngOnInit = function () {
            this.jsf.initializeControl(this);
        };
        return HiddenComponent;
    }());
    HiddenComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'hidden-widget',
                    template: "\n    <input *ngIf=\"boundControl\"\n      [formControl]=\"formControl\"\n      [id]=\"'control' + layoutNode?._id\"\n      [name]=\"controlName\"\n      type=\"hidden\">\n    <input *ngIf=\"!boundControl\"\n      [disabled]=\"controlDisabled\"\n      [name]=\"controlName\"\n      [id]=\"'control' + layoutNode?._id\"\n      type=\"hidden\"\n      [value]=\"controlValue\">",
                },] },
    ];
    /** @nocollapse */
    HiddenComponent.ctorParameters = function () {
        return [
            { type: JsonSchemaFormService, },
        ];
    };
    HiddenComponent.propDecorators = {
        "layoutNode": [{ type: core.Input },],
        "layoutIndex": [{ type: core.Input },],
        "dataIndex": [{ type: core.Input },],
    };
    var TabComponent = (function () {
        function TabComponent(jsf) {
            this.jsf = jsf;
        }
        TabComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
        };
        return TabComponent;
    }());
    TabComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'tab-widget',
                    template: "\n    <div [class]=\"options?.htmlClass || ''\">\n      <root-widget\n        [dataIndex]=\"dataIndex\"\n        [layoutIndex]=\"layoutIndex\"\n        [layout]=\"layoutNode.items\"></root-widget>\n    </div>",
                },] },
    ];
    /** @nocollapse */
    TabComponent.ctorParameters = function () {
        return [
            { type: JsonSchemaFormService, },
        ];
    };
    TabComponent.propDecorators = {
        "layoutNode": [{ type: core.Input },],
        "layoutIndex": [{ type: core.Input },],
        "dataIndex": [{ type: core.Input },],
    };
    var BASIC_WIDGETS = [
        AddReferenceComponent, OneOfComponent, ButtonComponent, CheckboxComponent,
        CheckboxesComponent, FileComponent, HiddenComponent, InputComponent,
        MessageComponent, NoneComponent, NumberComponent, RadiosComponent,
        RootComponent, SectionComponent, SelectComponent, SelectFrameworkComponent,
        SelectWidgetComponent, SubmitComponent, TabComponent, TabsComponent,
        TemplateComponent, TextareaComponent
    ];
    var WidgetLibraryModule = (function () {
        function WidgetLibraryModule() {
        }
        WidgetLibraryModule.forRoot = function () {
            return {
                ngModule: WidgetLibraryModule,
                providers: [JsonSchemaFormService]
            };
        };
        return WidgetLibraryModule;
    }());
    WidgetLibraryModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, forms.FormsModule, forms.ReactiveFormsModule],
                    declarations: tslib.__spread(BASIC_WIDGETS, [OrderableDirective]),
                    exports: tslib.__spread(BASIC_WIDGETS, [OrderableDirective]),
                    entryComponents: tslib.__spread(BASIC_WIDGETS),
                    providers: [JsonSchemaFormService]
                },] },
    ];
    var NoFrameworkComponent = (function () {
        function NoFrameworkComponent() {
        }
        return NoFrameworkComponent;
    }());
    NoFrameworkComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'no-framework',
                    template: "\n    <select-widget-widget\n      [dataIndex]=\"dataIndex\"\n      [layoutIndex]=\"layoutIndex\"\n      [layoutNode]=\"layoutNode\"></select-widget-widget>",
                },] },
    ];
    /** @nocollapse */
    NoFrameworkComponent.propDecorators = {
        "layoutNode": [{ type: core.Input },],
        "layoutIndex": [{ type: core.Input },],
        "dataIndex": [{ type: core.Input },],
    };
    var NoFramework = (function (_super) {
        tslib.__extends(NoFramework, _super);
        function NoFramework() {
            var _this = _super.apply(this, tslib.__spread(arguments)) || this;
            _this.name = 'no-framework';
            _this.framework = NoFrameworkComponent;
            return _this;
        }
        return NoFramework;
    }(Framework));
    NoFramework.decorators = [
        { type: core.Injectable },
    ];
    var NoFrameworkModule = (function () {
        function NoFrameworkModule() {
        }
        NoFrameworkModule.forRoot = function () {
            return {
                ngModule: NoFrameworkModule,
                providers: [
                    { provide: Framework, useClass: NoFramework, multi: true }
                ]
            };
        };
        return NoFrameworkModule;
    }());
    NoFrameworkModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, WidgetLibraryModule],
                    declarations: [NoFrameworkComponent],
                    exports: [NoFrameworkComponent],
                    entryComponents: [NoFrameworkComponent]
                },] },
    ];
    var JsonSchemaFormModule = (function () {
        function JsonSchemaFormModule() {
        }
        JsonSchemaFormModule.forRoot = function () {
            var frameworks = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                frameworks[_i] = arguments[_i];
            }
            var loadFrameworks = frameworks.length ?
                frameworks.map(function (framework) { return framework.forRoot().providers[0]; }) :
                [{ provide: Framework, useClass: NoFramework, multi: true }];
            return {
                ngModule: JsonSchemaFormModule,
                providers: tslib.__spread([
                    JsonSchemaFormService, FrameworkLibraryService, WidgetLibraryService
                ], loadFrameworks)
            };
        };
        return JsonSchemaFormModule;
    }());
    JsonSchemaFormModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule, forms.FormsModule, forms.ReactiveFormsModule,
                        WidgetLibraryModule, NoFrameworkModule
                    ],
                    declarations: [JsonSchemaFormComponent],
                    exports: [JsonSchemaFormComponent, WidgetLibraryModule]
                },] },
    ];

    exports.ɵb = Framework;
    exports.ɵa = FrameworkLibraryService;
    exports.ɵbd = NoFrameworkComponent;
    exports.ɵbc = NoFrameworkModule;
    exports.ɵbe = NoFramework;
    exports.ɵbb = OrderableDirective;
    exports.ɵf = AddReferenceComponent;
    exports.ɵh = ButtonComponent;
    exports.ɵi = CheckboxComponent;
    exports.ɵj = CheckboxesComponent;
    exports.ɵk = FileComponent;
    exports.ɵl = HiddenComponent;
    exports.ɵe = BASIC_WIDGETS;
    exports.ɵm = InputComponent;
    exports.ɵn = MessageComponent;
    exports.ɵo = NoneComponent;
    exports.ɵp = NumberComponent;
    exports.ɵg = OneOfComponent;
    exports.ɵq = RadiosComponent;
    exports.ɵr = RootComponent;
    exports.ɵs = SectionComponent;
    exports.ɵu = SelectFrameworkComponent;
    exports.ɵv = SelectWidgetComponent;
    exports.ɵt = SelectComponent;
    exports.ɵw = SubmitComponent;
    exports.ɵx = TabComponent;
    exports.ɵy = TabsComponent;
    exports.ɵz = TemplateComponent;
    exports.ɵba = TextareaComponent;
    exports.ɵd = WidgetLibraryModule;
    exports.ɵc = WidgetLibraryService;
    exports.JsonSchemaFormService = JsonSchemaFormService;
    exports.JSON_SCHEMA_FORM_VALUE_ACCESSOR = JSON_SCHEMA_FORM_VALUE_ACCESSOR;
    exports.JsonSchemaFormComponent = JsonSchemaFormComponent;
    exports.JsonSchemaFormModule = JsonSchemaFormModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular2-json-schema-form.umd.js.map
