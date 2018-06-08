import * as tslib_1 from "tslib";
import { Observable } from 'rxjs-compat/Observable';
import { fromPromise } from 'rxjs-compat/observable/fromPromise';
import { toPromise } from 'rxjs-compat/operator/toPromise';
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
export function _executeValidators(control, validators, invert) {
    if (invert === void 0) { invert = false; }
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
export function _executeAsyncValidators(control, validators, invert) {
    if (invert === void 0) { invert = false; }
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
export function _mergeObjects() {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    var mergedObject = {};
    try {
        for (var objects_1 = tslib_1.__values(objects), objects_1_1 = objects_1.next(); !objects_1_1.done; objects_1_1 = objects_1.next()) {
            var currentObject = objects_1_1.value;
            if (isObject(currentObject)) {
                try {
                    for (var _a = tslib_1.__values(Object.keys(currentObject)), _b = _a.next(); !_b.done; _b = _a.next()) {
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
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (objects_1_1 && !objects_1_1.done && (_d = objects_1.return)) _d.call(objects_1);
        }
        finally { if (e_2) throw e_2.error; }
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
export function _mergeErrors(arrayOfErrors) {
    var mergedErrors = _mergeObjects.apply(void 0, tslib_1.__spread(arrayOfErrors));
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
export function isDefined(value) {
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
export function hasValue(value) {
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
export function isEmpty(value) {
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
export function isString(value) {
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
export function isNumber(value, strict) {
    if (strict === void 0) { strict = false; }
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
export function isInteger(value, strict) {
    if (strict === void 0) { strict = false; }
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
export function isBoolean(value, option) {
    if (option === void 0) { option = null; }
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
export function isFunction(item) {
    return typeof item === 'function';
}
export function isObject(item) {
    return item !== null && typeof item === 'object' &&
        Object.prototype.toString.call(item) === '[object Object]';
}
export function isArray(item) {
    return Array.isArray(item) ||
        Object.prototype.toString.call(item) === '[object Array]';
}
export function isDate(item) {
    return typeof item === 'object' &&
        Object.prototype.toString.call(item) === '[object Date]';
}
export function isMap(item) {
    return typeof item === 'object' &&
        Object.prototype.toString.call(item) === '[object Map]';
}
export function isSet(item) {
    return typeof item === 'object' &&
        Object.prototype.toString.call(item) === '[object Set]';
}
export function isSymbol(item) {
    return typeof item === 'symbol';
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
export function getType(value, strict) {
    if (strict === void 0) { strict = false; }
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
export function isType(value, type) {
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
export function isPrimitive(value) {
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
export function toJavaScriptType(value, types, strictIntegers) {
    if (strictIntegers === void 0) { strictIntegers = true; }
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
export function toSchemaType(value, types) {
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
        return toJavaScriptType(value, 'string');
    }
    if (types.includes('boolean') && isBoolean(value)) {
        return toJavaScriptType(value, 'boolean');
    }
    if (types.includes('string')) {
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
        var testValue = parseFloat(value);
        if (!!testValue) {
            return testValue;
        }
    }
    if (types.includes('integer')) {
        var testValue = parseInt(value, 10);
        if (!!testValue) {
            return testValue;
        }
    }
    if (types.includes('boolean')) {
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
export function isPromise(object) {
    return !!object && typeof object.then === 'function';
}
/**
 * 'isObservable' function
 *
 * @param  { any } object
 * @return { boolean }
 */
export function isObservable(object) {
    return !!object && typeof object.subscribe === 'function';
}
/**
 * '_toPromise' function
 *
 * @param  { object } object
 * @return { Promise<any> }
 */
export function _toPromise(object) {
    return isPromise(object) ? object : toPromise.call(object);
}
/**
 * 'toObservable' function
 *
 * @param  { object } object
 * @return { Observable<any> }
 */
export function toObservable(object) {
    var observable = isPromise(object) ? fromPromise(object) : object;
    if (isObservable(observable)) {
        return observable;
    }
    console.error('toObservable error: Expected validator to return Promise or Observable.');
    return new Observable();
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
export function inArray(item, array, allIn) {
    if (allIn === void 0) { allIn = false; }
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
export function xor(value1, value2) {
    return (!!value1 && !value2) || (!value1 && !!value2);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLmZ1bmN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWpzb24tc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJzcmMvc2hhcmVkL3ZhbGlkYXRvci5mdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDakUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBZ0QzRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sNkJBQTZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBYztJQUFkLHVCQUFBLEVBQUEsY0FBYztJQUNwRSxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFBLFNBQVMsSUFBSSxPQUFBLFNBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQTFCLENBQTBCLENBQUMsQ0FBQztBQUNqRSxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLGtDQUFrQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQWM7SUFBZCx1QkFBQSxFQUFBLGNBQWM7SUFDekUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBQSxTQUFTLElBQUksT0FBQSxTQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUExQixDQUEwQixDQUFDLENBQUM7QUFDakUsQ0FBQztBQUVEOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU07SUFBd0IsaUJBQVU7U0FBVixVQUFVLEVBQVYscUJBQVUsRUFBVixJQUFVO1FBQVYsNEJBQVU7O0lBQ3RDLElBQU0sWUFBWSxHQUFnQixFQUFHLENBQUM7O1FBQ3RDLEdBQUcsQ0FBQyxDQUF3QixJQUFBLFlBQUEsaUJBQUEsT0FBTyxDQUFBLGdDQUFBO1lBQTlCLElBQU0sYUFBYSxvQkFBQTtZQUN0QixFQUFF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QVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3RCLEtBQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUNsRCxDQUFDLENBQUMsQ0FBQztRQUNELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUF5QixLQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0UsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQXlCLEtBQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RELEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFDbEMsSUFBTSxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3BELEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLENBQ3NCLEtBQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ3pCLEtBQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQ3BELENBQUMsQ0FBQyxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxDQUFDLG1DQUFtQztRQUNyRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssS0FBSyxJQUFJLEtBQUssS0FBSyxJQUFJ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QztRQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDLENBQUM7UUFDcEUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLGNBQWMsTUFBTSxFQUFFLE1BQU07SUFDaEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3hELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIFZhbGlkYXRpb25FcnJvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy1jb21wYXQvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBmcm9tUHJvbWlzZSB9IGZyb20gJ3J4anMtY29tcGF0L29ic2VydmFibGUvZnJvbVByb21pc2UnO1xuaW1wb3J0IHsgdG9Qcm9taXNlIH0gZnJvbSAncnhqcy1jb21wYXQvb3BlcmF0b3IvdG9Qcm9taXNlJztcblxuLyoqXG4gKiBWYWxpZGF0b3IgdXRpbGl0eSBmdW5jdGlvbiBsaWJyYXJ5OlxuICpcbiAqIFZhbGlkYXRvciBhbmQgZXJyb3IgdXRpbGl0aWVzOlxuICogICBfZXhlY3V0ZVZhbGlkYXRvcnMsIF9leGVjdXRlQXN5bmNWYWxpZGF0b3JzLCBfbWVyZ2VPYmplY3RzLCBfbWVyZ2VFcnJvcnNcbiAqXG4gKiBJbmRpdmlkdWFsIHZhbHVlIGNoZWNraW5nOlxuICogICBpc0RlZmluZWQsIGhhc1ZhbHVlLCBpc0VtcHR5XG4gKlxuICogSW5kaXZpZHVhbCB0eXBlIGNoZWNraW5nOlxuICogICBpc1N0cmluZywgaXNOdW1iZXIsIGlzSW50ZWdlciwgaXNCb29sZWFuLCBpc0Z1bmN0aW9uLCBpc09iamVjdCwgaXNBcnJheSxcbiAqICAgaXNNYXAsIGlzU2V0LCBpc1Byb21pc2UsIGlzT2JzZXJ2YWJsZVxuICpcbiAqIE11bHRpcGxlIHR5cGUgY2hlY2tpbmcgYW5kIGZpeGluZzpcbiAqICAgZ2V0VHlwZSwgaXNUeXBlLCBpc1ByaW1pdGl2ZSwgdG9KYXZhU2NyaXB0VHlwZSwgdG9TY2hlbWFUeXBlLFxuICogICBfdG9Qcm9taXNlLCB0b09ic2VydmFibGVcbiAqXG4gKiBVdGlsaXR5IGZ1bmN0aW9uczpcbiAqICAgaW5BcnJheSwgeG9yXG4gKlxuICogVHlwZXNjcmlwdCB0eXBlcyBhbmQgaW50ZXJmYWNlczpcbiAqICAgU2NoZW1hUHJpbWl0aXZlVHlwZSwgU2NoZW1hVHlwZSwgSmF2YVNjcmlwdFByaW1pdGl2ZVR5cGUsIEphdmFTY3JpcHRUeXBlLFxuICogICBQcmltaXRpdmVWYWx1ZSwgUGxhaW5PYmplY3QsIElWYWxpZGF0b3JGbiwgQXN5bmNJVmFsaWRhdG9yRm5cbiAqXG4gKiBOb3RlOiAnSVZhbGlkYXRvckZuJyBpcyBzaG9ydCBmb3IgJ2ludmVydGFibGUgdmFsaWRhdG9yIGZ1bmN0aW9uJyxcbiAqICAgd2hpY2ggaXMgYSB2YWxpZGF0b3IgZnVuY3Rpb25zIHRoYXQgYWNjZXB0cyBhbiBvcHRpb25hbCBzZWNvbmRcbiAqICAgYXJndW1lbnQgd2hpY2gsIGlmIHNldCB0byBUUlVFLCBjYXVzZXMgdGhlIHZhbGlkYXRvciB0byBwZXJmb3JtXG4gKiAgIHRoZSBvcHBvc2l0ZSBvZiBpdHMgb3JpZ2luYWwgZnVuY3Rpb24uXG4gKi9cblxuZXhwb3J0IHR5cGUgU2NoZW1hUHJpbWl0aXZlVHlwZSA9XG4gICdzdHJpbmcnIHwgJ251bWJlcicgfCAnaW50ZWdlcicgfCAnYm9vbGVhbicgfCAnbnVsbCc7XG5leHBvcnQgdHlwZSBTY2hlbWFUeXBlID1cbiAgJ3N0cmluZycgfCAnbnVtYmVyJyB8ICdpbnRlZ2VyJyB8ICdib29sZWFuJyB8ICdudWxsJyB8ICdvYmplY3QnIHwgJ2FycmF5JztcbmV4cG9ydCB0eXBlIEphdmFTY3JpcHRQcmltaXRpdmVUeXBlID1cbiAgJ3N0cmluZycgfCAnbnVtYmVyJyB8ICdib29sZWFuJyB8ICdudWxsJyB8ICd1bmRlZmluZWQnO1xuZXhwb3J0IHR5cGUgSmF2YVNjcmlwdFR5cGUgPVxuICAnc3RyaW5nJyB8ICdudW1iZXInIHwgJ2Jvb2xlYW4nIHwgJ251bGwnIHwgJ3VuZGVmaW5lZCcgfCAnb2JqZWN0JyB8ICdhcnJheScgfFxuICAnbWFwJyB8ICdzZXQnIHwgJ2FyZ3VtZW50cycgfCAnZGF0ZScgfCAnZXJyb3InIHwgJ2Z1bmN0aW9uJyB8ICdqc29uJyB8XG4gICdtYXRoJyB8ICdyZWdleHAnOyAvLyBOb3RlOiB0aGlzIGxpc3QgaXMgaW5jb21wbGV0ZVxuZXhwb3J0IHR5cGUgUHJpbWl0aXZlVmFsdWUgPSBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZDtcbmV4cG9ydCBpbnRlcmZhY2UgUGxhaW5PYmplY3QgeyBbazogc3RyaW5nXTogYW55OyB9XG5cbmV4cG9ydCB0eXBlIElWYWxpZGF0b3JGbiA9IChjOiBBYnN0cmFjdENvbnRyb2wsIGk/OiBib29sZWFuKSA9PiBQbGFpbk9iamVjdDtcbmV4cG9ydCB0eXBlIEFzeW5jSVZhbGlkYXRvckZuID0gKGM6IEFic3RyYWN0Q29udHJvbCwgaT86IGJvb2xlYW4pID0+IGFueTtcblxuLyoqXG4gKiAnX2V4ZWN1dGVWYWxpZGF0b3JzJyB1dGlsaXR5IGZ1bmN0aW9uXG4gKlxuICogVmFsaWRhdGVzIGEgY29udHJvbCBhZ2FpbnN0IGFuIGFycmF5IG9mIHZhbGlkYXRvcnMsIGFuZCByZXR1cm5zXG4gKiBhbiBhcnJheSBvZiB0aGUgc2FtZSBsZW5ndGggY29udGFpbmluZyBhIGNvbWJpbmF0aW9uIG9mIGVycm9yIG1lc3NhZ2VzXG4gKiAoZnJvbSBpbnZhbGlkIHZhbGlkYXRvcnMpIGFuZCBudWxsIHZhbHVlcyAoZnJvbSB2YWxpZCB2YWxpZGF0b3JzKVxuICpcbiAqIEBwYXJhbSAgeyBBYnN0cmFjdENvbnRyb2wgfSBjb250cm9sIC0gY29udHJvbCB0byB2YWxpZGF0ZVxuICogQHBhcmFtICB7IElWYWxpZGF0b3JGbltdIH0gdmFsaWRhdG9ycyAtIGFycmF5IG9mIHZhbGlkYXRvcnNcbiAqIEBwYXJhbSAgeyBib29sZWFuIH0gaW52ZXJ0IC0gaW52ZXJ0P1xuICogQHJldHVybiB7IFBsYWluT2JqZWN0W10gfSAtIGFycmF5IG9mIG51bGxzIGFuZCBlcnJvciBtZXNzYWdlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfZXhlY3V0ZVZhbGlkYXRvcnMoY29udHJvbCwgdmFsaWRhdG9ycywgaW52ZXJ0ID0gZmFsc2UpIHtcbiAgcmV0dXJuIHZhbGlkYXRvcnMubWFwKHZhbGlkYXRvciA9PiB2YWxpZGF0b3IoY29udHJvbCwgaW52ZXJ0KSk7XG59XG5cbi8qKlxuICogJ19leGVjdXRlQXN5bmNWYWxpZGF0b3JzJyB1dGlsaXR5IGZ1bmN0aW9uXG4gKlxuICogVmFsaWRhdGVzIGEgY29udHJvbCBhZ2FpbnN0IGFuIGFycmF5IG9mIGFzeW5jIHZhbGlkYXRvcnMsIGFuZCByZXR1cm5zXG4gKiBhbiBhcnJheSBvZiBvYnNlcnZhYmUgcmVzdWx0cyBvZiB0aGUgc2FtZSBsZW5ndGggY29udGFpbmluZyBhIGNvbWJpbmF0aW9uIG9mXG4gKiBlcnJvciBtZXNzYWdlcyAoZnJvbSBpbnZhbGlkIHZhbGlkYXRvcnMpIGFuZCBudWxsIHZhbHVlcyAoZnJvbSB2YWxpZCBvbmVzKVxuICpcbiAqIEBwYXJhbSAgeyBBYnN0cmFjdENvbnRyb2wgfSBjb250cm9sIC0gY29udHJvbCB0byB2YWxpZGF0ZVxuICogQHBhcmFtICB7IEFzeW5jSVZhbGlkYXRvckZuW10gfSB2YWxpZGF0b3JzIC0gYXJyYXkgb2YgYXN5bmMgdmFsaWRhdG9yc1xuICogQHBhcmFtICB7IGJvb2xlYW4gfSBpbnZlcnQgLSBpbnZlcnQ/XG4gKiBAcmV0dXJuIHsgYW55W10gfSAtIGFycmF5IG9mIG9ic2VydmFibGUgbnVsbHMgYW5kIGVycm9yIG1lc3NhZ2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9leGVjdXRlQXN5bmNWYWxpZGF0b3JzKGNvbnRyb2wsIHZhbGlkYXRvcnMsIGludmVydCA9IGZhbHNlKSB7XG4gIHJldHVybiB2YWxpZGF0b3JzLm1hcCh2YWxpZGF0b3IgPT4gdmFsaWRhdG9yKGNvbnRyb2wsIGludmVydCkpO1xufVxuXG4vKipcbiAqICdfbWVyZ2VPYmplY3RzJyB1dGlsaXR5IGZ1bmN0aW9uXG4gKlxuICogUmVjdXJzaXZlbHkgTWVyZ2VzIG9uZSBvciBtb3JlIG9iamVjdHMgaW50byBhIHNpbmdsZSBvYmplY3Qgd2l0aCBjb21iaW5lZCBrZXlzLlxuICogQXV0b21hdGljYWxseSBkZXRlY3RzIGFuZCBpZ25vcmVzIG51bGwgYW5kIHVuZGVmaW5lZCBpbnB1dHMuXG4gKiBBbHNvIGRldGVjdHMgZHVwbGljYXRlZCBib29sZWFuICdub3QnIGtleXMgYW5kIFhPUnMgdGhlaXIgdmFsdWVzLlxuICpcbiAqIEBwYXJhbSAgeyBQbGFpbk9iamVjdFtdIH0gb2JqZWN0cyAtIG9uZSBvciBtb3JlIG9iamVjdHMgdG8gbWVyZ2VcbiAqIEByZXR1cm4geyBQbGFpbk9iamVjdCB9IC0gbWVyZ2VkIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gX21lcmdlT2JqZWN0cyguLi5vYmplY3RzKSB7XG4gIGNvbnN0IG1lcmdlZE9iamVjdDogUGxhaW5PYmplY3QgPSB7IH07XG4gIGZvciAoY29uc3QgY3VycmVudE9iamVjdCBvZiBvYmplY3RzKSB7XG4gICAgaWYgKGlzT2JqZWN0KGN1cnJlbnRPYmplY3QpKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhjdXJyZW50T2JqZWN0KSkge1xuICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBjdXJyZW50T2JqZWN0W2tleV07XG4gICAgICAgIGNvbnN0IG1lcmdlZFZhbHVlID0gbWVyZ2VkT2JqZWN0W2tleV07XG4gICAgICAgIG1lcmdlZE9iamVjdFtrZXldID0gIWlzRGVmaW5lZChtZXJnZWRWYWx1ZSkgPyBjdXJyZW50VmFsdWUgOlxuICAgICAgICAgIGtleSA9PT0gJ25vdCcgJiYgaXNCb29sZWFuKG1lcmdlZFZhbHVlLCAnc3RyaWN0JykgJiZcbiAgICAgICAgICAgIGlzQm9vbGVhbihjdXJyZW50VmFsdWUsICdzdHJpY3QnKSA/IHhvcihtZXJnZWRWYWx1ZSwgY3VycmVudFZhbHVlKSA6XG4gICAgICAgICAgZ2V0VHlwZShtZXJnZWRWYWx1ZSkgPT09ICdvYmplY3QnICYmIGdldFR5cGUoY3VycmVudFZhbHVlKSA9PT0gJ29iamVjdCcgP1xuICAgICAgICAgICAgX21lcmdlT2JqZWN0cyhtZXJnZWRWYWx1ZSwgY3VycmVudFZhbHVlKSA6XG4gICAgICAgICAgICBjdXJyZW50VmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBtZXJnZWRPYmplY3Q7XG59XG5cbi8qKlxuICogJ19tZXJnZUVycm9ycycgdXRpbGl0eSBmdW5jdGlvblxuICpcbiAqIE1lcmdlcyBhbiBhcnJheSBvZiBvYmplY3RzLlxuICogVXNlZCBmb3IgY29tYmluaW5nIHRoZSB2YWxpZGF0b3IgZXJyb3JzIHJldHVybmVkIGZyb20gJ2V4ZWN1dGVWYWxpZGF0b3JzJ1xuICpcbiAqIEBwYXJhbSAgeyBQbGFpbk9iamVjdFtdIH0gYXJyYXlPZkVycm9ycyAtIGFycmF5IG9mIG9iamVjdHNcbiAqIEByZXR1cm4geyBQbGFpbk9iamVjdCB9IC0gbWVyZ2VkIG9iamVjdCwgb3IgbnVsbCBpZiBubyB1c2FibGUgaW5wdXQgb2JqZWN0Y3NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9tZXJnZUVycm9ycyhhcnJheU9mRXJyb3JzKSB7XG4gIGNvbnN0IG1lcmdlZEVycm9ycyA9IF9tZXJnZU9iamVjdHMoLi4uYXJyYXlPZkVycm9ycyk7XG4gIHJldHVybiBpc0VtcHR5KG1lcmdlZEVycm9ycykgPyBudWxsIDogbWVyZ2VkRXJyb3JzO1xufVxuXG4vKipcbiAqICdpc0RlZmluZWQnIHV0aWxpdHkgZnVuY3Rpb25cbiAqXG4gKiBDaGVja3MgaWYgYSB2YXJpYWJsZSBjb250YWlucyBhIHZhbHVlIG9mIGFueSB0eXBlLlxuICogUmV0dXJucyB0cnVlIGV2ZW4gZm9yIG90aGVyd2lzZSAnZmFsc2V5JyB2YWx1ZXMgb2YgMCwgJycsIGFuZCBmYWxzZS5cbiAqXG4gKiBAcGFyYW0gIHsgYW55IH0gdmFsdWUgLSB0aGUgdmFsdWUgdG8gY2hlY2tcbiAqIEByZXR1cm4geyBib29sZWFuIH0gLSBmYWxzZSBpZiB1bmRlZmluZWQgb3IgbnVsbCwgb3RoZXJ3aXNlIHRydWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRGVmaW5lZCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbDtcbn1cblxuLyoqXG4gKiAnaGFzVmFsdWUnIHV0aWxpdHkgZnVuY3Rpb25cbiAqXG4gKiBDaGVja3MgaWYgYSB2YXJpYWJsZSBjb250YWlucyBhIHZhbHVlLlxuICogUmV0dXJzIGZhbHNlIGZvciBudWxsLCB1bmRlZmluZWQsIG9yIGEgemVyby1sZW5ndGggc3RybmcsICcnLFxuICogb3RoZXJ3aXNlIHJldHVybnMgdHJ1ZS5cbiAqIChTdHJpY3RlciB0aGFuICdpc0RlZmluZWQnIGJlY2F1c2UgaXQgYWxzbyByZXR1cm5zIGZhbHNlIGZvciAnJyxcbiAqIHRob3VnaCBpdCBzdGlsIHJldHVybnMgdHJ1ZSBmb3Igb3RoZXJ3aXNlICdmYWxzZXknIHZhbHVlcyAwIGFuZCBmYWxzZS4pXG4gKlxuICogQHBhcmFtICB7IGFueSB9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIGNoZWNrXG4gKiBAcmV0dXJuIHsgYm9vbGVhbiB9IC0gZmFsc2UgaWYgdW5kZWZpbmVkLCBudWxsLCBvciAnJywgb3RoZXJ3aXNlIHRydWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc1ZhbHVlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSAnJztcbn1cblxuLyoqXG4gKiAnaXNFbXB0eScgdXRpbGl0eSBmdW5jdGlvblxuICpcbiAqIFNpbWlsYXIgdG8gIWhhc1ZhbHVlLCBidXQgYWxzbyByZXR1cm5zIHRydWUgZm9yIGVtcHR5IGFycmF5cyBhbmQgb2JqZWN0cy5cbiAqXG4gKiBAcGFyYW0gIHsgYW55IH0gdmFsdWUgLSB0aGUgdmFsdWUgdG8gY2hlY2tcbiAqIEByZXR1cm4geyBib29sZWFuIH0gLSBmYWxzZSBpZiB1bmRlZmluZWQsIG51bGwsIG9yICcnLCBvdGhlcndpc2UgdHJ1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZSkge1xuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHsgcmV0dXJuICF2YWx1ZS5sZW5ndGg7IH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkgeyByZXR1cm4gIU9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGg7IH1cbiAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09ICcnO1xufVxuXG4vKipcbiAqICdpc1N0cmluZycgdXRpbGl0eSBmdW5jdGlvblxuICpcbiAqIENoZWNrcyBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSAgeyBhbnkgfSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBjaGVja1xuICogQHJldHVybiB7IGJvb2xlYW4gfSAtIHRydWUgaWYgc3RyaW5nLCBmYWxzZSBpZiBub3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqICdpc051bWJlcicgdXRpbGl0eSBmdW5jdGlvblxuICpcbiAqIENoZWNrcyBpZiBhIHZhbHVlIGlzIGEgcmVndWxhciBudW1iZXIsIG51bWVyaWMgc3RyaW5nLCBvciBKYXZhU2NyaXB0IERhdGUuXG4gKlxuICogQHBhcmFtICB7IGFueSB9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIGNoZWNrXG4gKiBAcGFyYW0gIHsgYW55ID0gZmFsc2UgfSBzdHJpY3QgLSBpZiB0cnV0aHksIGFsc28gY2hlY2tzIEphdmFTY3JpcHQgdHlvZVxuICogQHJldHVybiB7IGJvb2xlYW4gfSAtIHRydWUgaWYgbnVtYmVyLCBmYWxzZSBpZiBub3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlLCBzdHJpY3Q6IGFueSA9IGZhbHNlKSB7XG4gIGlmIChzdHJpY3QgJiYgdHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykgeyByZXR1cm4gZmFsc2U7IH1cbiAgcmV0dXJuICFpc05hTih2YWx1ZSkgJiYgdmFsdWUgIT09IHZhbHVlIC8gMDtcbn1cblxuLyoqXG4gKiAnaXNJbnRlZ2VyJyB1dGlsaXR5IGZ1bmN0aW9uXG4gKlxuICogQ2hlY2tzIGlmIGEgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqXG4gKiBAcGFyYW0gIHsgYW55IH0gdmFsdWUgLSB0aGUgdmFsdWUgdG8gY2hlY2tcbiAqIEBwYXJhbSAgeyBhbnkgPSBmYWxzZSB9IHN0cmljdCAtIGlmIHRydXRoeSwgYWxzbyBjaGVja3MgSmF2YVNjcmlwdCB0eW9lXG4gKiBAcmV0dXJuIHtib29sZWFuIH0gLSB0cnVlIGlmIG51bWJlciwgZmFsc2UgaWYgbm90XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWUsIHN0cmljdDogYW55ID0gZmFsc2UpIHtcbiAgaWYgKHN0cmljdCAmJiB0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB7IHJldHVybiBmYWxzZTsgfVxuICByZXR1cm4gIWlzTmFOKHZhbHVlKSAmJiAgdmFsdWUgIT09IHZhbHVlIC8gMCAmJiB2YWx1ZSAlIDEgPT09IDA7XG59XG5cbi8qKlxuICogJ2lzQm9vbGVhbicgdXRpbGl0eSBmdW5jdGlvblxuICpcbiAqIENoZWNrcyBpZiBhIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqXG4gKiBAcGFyYW0gIHsgYW55IH0gdmFsdWUgLSB0aGUgdmFsdWUgdG8gY2hlY2tcbiAqIEBwYXJhbSAgeyBhbnkgPSBudWxsIH0gb3B0aW9uIC0gaWYgJ3N0cmljdCcsIGFsc28gY2hlY2tzIEphdmFTY3JpcHQgdHlwZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBUUlVFIG9yIEZBTFNFLCBjaGVja3Mgb25seSBmb3IgdGhhdCB2YWx1ZVxuICogQHJldHVybiB7IGJvb2xlYW4gfSAtIHRydWUgaWYgYm9vbGVhbiwgZmFsc2UgaWYgbm90XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWUsIG9wdGlvbjogYW55ID0gbnVsbCkge1xuICBpZiAob3B0aW9uID09PSAnc3RyaWN0JykgeyByZXR1cm4gdmFsdWUgPT09IHRydWUgfHwgdmFsdWUgPT09IGZhbHNlOyB9XG4gIGlmIChvcHRpb24gPT09IHRydWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHRydWUgfHwgdmFsdWUgPT09IDEgfHwgdmFsdWUgPT09ICd0cnVlJyB8fCB2YWx1ZSA9PT0gJzEnO1xuICB9XG4gIGlmIChvcHRpb24gPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSBmYWxzZSB8fCB2YWx1ZSA9PT0gMCB8fCB2YWx1ZSA9PT0gJ2ZhbHNlJyB8fCB2YWx1ZSA9PT0gJzAnO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gMSB8fCB2YWx1ZSA9PT0gJ3RydWUnIHx8IHZhbHVlID09PSAnMScgfHxcbiAgICB2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT09IDAgfHwgdmFsdWUgPT09ICdmYWxzZScgfHwgdmFsdWUgPT09ICcwJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24oaXRlbTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgaXRlbSA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gaXRlbSAhPT0gbnVsbCAmJiB0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcgJiZcbiAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlbSkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBcnJheShpdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoaXRlbSkgfHxcbiAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlbSkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGUoaXRlbTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcgJiZcbiAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlbSkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTWFwKGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnICYmXG4gICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZW0pID09PSAnW29iamVjdCBNYXBdJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2V0KGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnICYmXG4gICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZW0pID09PSAnW29iamVjdCBTZXRdJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3ltYm9sKGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIGl0ZW0gPT09ICdzeW1ib2wnO1xufVxuXG4vKipcbiAqICdnZXRUeXBlJyBmdW5jdGlvblxuICpcbiAqIERldGVjdHMgdGhlIEpTT04gU2NoZW1hIFR5cGUgb2YgYSB2YWx1ZS5cbiAqIEJ5IGRlZmF1bHQsIGRldGVjdHMgbnVtYmVycyBhbmQgaW50ZWdlcnMgZXZlbiBpZiBmb3JtYXR0ZWQgYXMgc3RyaW5ncy5cbiAqIChTbyBhbGwgaW50ZWdlcnMgYXJlIGFsc28gbnVtYmVycywgYW5kIGFueSBudW1iZXIgbWF5IGFsc28gYmUgYSBzdHJpbmcuKVxuICogSG93ZXZlciwgaXQgb25seSBkZXRlY3RzIHRydWUgYm9vbGVhbiB2YWx1ZXMgKHRvIGRldGVjdCBib29sZWFuIHZhbHVlc1xuICogaW4gbm9uLWJvb2xlYW4gZm9ybWF0cywgdXNlIGlzQm9vbGVhbigpIGluc3RlYWQpLlxuICpcbiAqIElmIHBhc3NlZCBhIHNlY29uZCBvcHRpb25hbCBwYXJhbWV0ZXIgb2YgJ3N0cmljdCcsIGl0IHdpbGwgb25seSBkZXRlY3RcbiAqIG51bWJlcnMgYW5kIGludGVnZXJzIGlmIHRoZXkgYXJlIGZvcm1hdHRlZCBhcyBKYXZhU2NyaXB0IG51bWJlcnMuXG4gKlxuICogRXhhbXBsZXM6XG4gKiBnZXRUeXBlKCcxMC41JykgPSAnbnVtYmVyJ1xuICogZ2V0VHlwZSgxMC41KSA9ICdudW1iZXInXG4gKiBnZXRUeXBlKCcxMCcpID0gJ2ludGVnZXInXG4gKiBnZXRUeXBlKDEwKSA9ICdpbnRlZ2VyJ1xuICogZ2V0VHlwZSgndHJ1ZScpID0gJ3N0cmluZydcbiAqIGdldFR5cGUodHJ1ZSkgPSAnYm9vbGVhbidcbiAqIGdldFR5cGUobnVsbCkgPSAnbnVsbCdcbiAqIGdldFR5cGUoeyB9KSA9ICdvYmplY3QnXG4gKiBnZXRUeXBlKFtdKSA9ICdhcnJheSdcbiAqXG4gKiBnZXRUeXBlKCcxMC41JywgJ3N0cmljdCcpID0gJ3N0cmluZydcbiAqIGdldFR5cGUoMTAuNSwgJ3N0cmljdCcpID0gJ251bWJlcidcbiAqIGdldFR5cGUoJzEwJywgJ3N0cmljdCcpID0gJ3N0cmluZydcbiAqIGdldFR5cGUoMTAsICdzdHJpY3QnKSA9ICdpbnRlZ2VyJ1xuICogZ2V0VHlwZSgndHJ1ZScsICdzdHJpY3QnKSA9ICdzdHJpbmcnXG4gKiBnZXRUeXBlKHRydWUsICdzdHJpY3QnKSA9ICdib29sZWFuJ1xuICpcbiAqIEBwYXJhbSAgeyBhbnkgfSB2YWx1ZSAtIHZhbHVlIHRvIGNoZWNrXG4gKiBAcGFyYW0gIHsgYW55ID0gZmFsc2UgfSBzdHJpY3QgLSBpZiB0cnV0aHksIGFsc28gY2hlY2tzIEphdmFTY3JpcHQgdHlvZVxuICogQHJldHVybiB7IFNjaGVtYVR5cGUgfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHlwZSh2YWx1ZSwgc3RyaWN0OiBhbnkgPSBmYWxzZSkge1xuICBpZiAoIWlzRGVmaW5lZCh2YWx1ZSkpIHsgcmV0dXJuICdudWxsJzsgfVxuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHsgcmV0dXJuICdhcnJheSc7IH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkgeyByZXR1cm4gJ29iamVjdCc7IH1cbiAgaWYgKGlzQm9vbGVhbih2YWx1ZSwgJ3N0cmljdCcpKSB7IHJldHVybiAnYm9vbGVhbic7IH1cbiAgaWYgKGlzSW50ZWdlcih2YWx1ZSwgc3RyaWN0KSkgeyByZXR1cm4gJ2ludGVnZXInOyB9XG4gIGlmIChpc051bWJlcih2YWx1ZSwgc3RyaWN0KSkgeyByZXR1cm4gJ251bWJlcic7IH1cbiAgaWYgKGlzU3RyaW5nKHZhbHVlKSB8fCAoIXN0cmljdCAmJiBpc0RhdGUodmFsdWUpKSkgeyByZXR1cm4gJ3N0cmluZyc7IH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogJ2lzVHlwZScgZnVuY3Rpb25cbiAqXG4gKiBDaGVja3Mgd2V0aGVyIGFuIGlucHV0IChwcm9iYWJseSBzdHJpbmcpIHZhbHVlIGNvbnRhaW5zIGRhdGEgb2ZcbiAqIGEgc3BlY2lmaWVkIEpTT04gU2NoZW1hIHR5cGVcbiAqXG4gKiBAcGFyYW0gIHsgUHJpbWl0aXZlVmFsdWUgfSB2YWx1ZSAtIHZhbHVlIHRvIGNoZWNrXG4gKiBAcGFyYW0gIHsgU2NoZW1hUHJpbWl0aXZlVHlwZSB9IHR5cGUgLSB0eXBlIHRvIGNoZWNrXG4gKiBAcmV0dXJuIHsgYm9vbGVhbiB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1R5cGUodmFsdWUsIHR5cGUpIHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHJldHVybiBpc1N0cmluZyh2YWx1ZSkgfHwgaXNEYXRlKHZhbHVlKTtcbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgcmV0dXJuIGlzTnVtYmVyKHZhbHVlKTtcbiAgICBjYXNlICdpbnRlZ2VyJzpcbiAgICAgIHJldHVybiBpc0ludGVnZXIodmFsdWUpO1xuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuIGlzQm9vbGVhbih2YWx1ZSk7XG4gICAgY2FzZSAnbnVsbCc6XG4gICAgICByZXR1cm4gIWhhc1ZhbHVlKHZhbHVlKTtcbiAgICBkZWZhdWx0OlxuICAgICAgY29uc29sZS5lcnJvcihgaXNUeXBlIGVycm9yOiBcIiR7dHlwZX1cIiBpcyBub3QgYSByZWNvZ25pemVkIHR5cGUuYCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG4vKipcbiAqICdpc1ByaW1pdGl2ZScgZnVuY3Rpb25cbiAqXG4gKiBDaGVja3Mgd2V0aGVyIGFuIGlucHV0IHZhbHVlIGlzIGEgSmF2YVNjcmlwdCBwcmltaXRpdmUgdHlwZTpcbiAqIHN0cmluZywgbnVtYmVyLCBib29sZWFuLCBvciBudWxsLlxuICpcbiAqIEBwYXJhbSAgeyBhbnkgfSB2YWx1ZSAtIHZhbHVlIHRvIGNoZWNrXG4gKiBAcmV0dXJuIHsgYm9vbGVhbiB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1ByaW1pdGl2ZSh2YWx1ZSkge1xuICByZXR1cm4gKGlzU3RyaW5nKHZhbHVlKSB8fCBpc051bWJlcih2YWx1ZSkgfHxcbiAgICBpc0Jvb2xlYW4odmFsdWUsICdzdHJpY3QnKSB8fCB2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbi8qKlxuICogJ3RvSmF2YVNjcmlwdFR5cGUnIGZ1bmN0aW9uXG4gKlxuICogQ29udmVydHMgYW4gaW5wdXQgKHByb2JhYmx5IHN0cmluZykgdmFsdWUgdG8gYSBKYXZhU2NyaXB0IHByaW1pdGl2ZSB0eXBlIC1cbiAqICdzdHJpbmcnLCAnbnVtYmVyJywgJ2Jvb2xlYW4nLCBvciAnbnVsbCcgLSBiZWZvcmUgc3RvcmluZyBpbiBhIEpTT04gb2JqZWN0LlxuICpcbiAqIERvZXMgbm90IGNvZXJjZSB2YWx1ZXMgKG90aGVyIHRoYW4gbnVsbCksIGFuZCBvbmx5IGNvbnZlcnRzIHRoZSB0eXBlc1xuICogb2YgdmFsdWVzIHRoYXQgd291bGQgb3RoZXJ3aXNlIGJlIHZhbGlkLlxuICpcbiAqIElmIHRoZSBvcHRpb25hbCB0aGlyZCBwYXJhbWV0ZXIgJ3N0cmljdEludGVnZXJzJyBpcyBUUlVFLCBhbmQgdGhlXG4gKiBKU09OIFNjaGVtYSB0eXBlICdpbnRlZ2VyJyBpcyBzcGVjaWZpZWQsIGl0IGFsc28gdmVyaWZpZXMgdGhlIGlucHV0IHZhbHVlXG4gKiBpcyBhbiBpbnRlZ2VyIGFuZCwgaWYgaXQgaXMsIHJldHVybnMgaXQgYXMgYSBKYXZlU2NyaXB0IG51bWJlci5cbiAqIElmICdzdHJpY3RJbnRlZ2VycycgaXMgRkFMU0UgKG9yIG5vdCBzZXQpIHRoZSB0eXBlICdpbnRlZ2VyJyBpcyB0cmVhdGVkXG4gKiBleGFjdGx5IHRoZSBzYW1lIGFzICdudW1iZXInLCBhbmQgYWxsb3dzIGRlY2ltYWxzLlxuICpcbiAqIFZhbGlkIEV4YW1wbGVzOlxuICogdG9KYXZhU2NyaXB0VHlwZSgnMTAnLCAgICdudW1iZXInICkgPSAxMCAgIC8vICcxMCcgICBpcyBhIG51bWJlclxuICogdG9KYXZhU2NyaXB0VHlwZSgnMTAnLCAgICdpbnRlZ2VyJykgPSAxMCAgIC8vICcxMCcgICBpcyBhbHNvIGFuIGludGVnZXJcbiAqIHRvSmF2YVNjcmlwdFR5cGUoIDEwLCAgICAnaW50ZWdlcicpID0gMTAgICAvLyAgMTAgICAgaXMgc3RpbGwgYW4gaW50ZWdlclxuICogdG9KYXZhU2NyaXB0VHlwZSggMTAsICAgICdzdHJpbmcnICkgPSAnMTAnIC8vICAxMCAgICBjYW4gYmUgbWFkZSBpbnRvIGEgc3RyaW5nXG4gKiB0b0phdmFTY3JpcHRUeXBlKCcxMC41JywgJ251bWJlcicgKSA9IDEwLjUgLy8gJzEwLjUnIGlzIGEgbnVtYmVyXG4gKlxuICogSW52YWxpZCBFeGFtcGxlczpcbiAqIHRvSmF2YVNjcmlwdFR5cGUoJzEwLjUnLCAnaW50ZWdlcicpID0gbnVsbCAvLyAnMTAuNScgaXMgbm90IGFuIGludGVnZXJcbiAqIHRvSmF2YVNjcmlwdFR5cGUoIDEwLjUsICAnaW50ZWdlcicpID0gbnVsbCAvLyAgMTAuNSAgaXMgc3RpbGwgbm90IGFuIGludGVnZXJcbiAqXG4gKiBAcGFyYW0gIHsgUHJpbWl0aXZlVmFsdWUgfSB2YWx1ZSAtIHZhbHVlIHRvIGNvbnZlcnRcbiAqIEBwYXJhbSAgeyBTY2hlbWFQcmltaXRpdmVUeXBlIHwgU2NoZW1hUHJpbWl0aXZlVHlwZVtdIH0gdHlwZXMgLSB0eXBlcyB0byBjb252ZXJ0IHRvXG4gKiBAcGFyYW0gIHsgYm9vbGVhbiA9IGZhbHNlIH0gc3RyaWN0SW50ZWdlcnMgLSBpZiBGQUxTRSwgdHJlYXQgaW50ZWdlcnMgYXMgbnVtYmVyc1xuICogQHJldHVybiB7IFByaW1pdGl2ZVZhbHVlIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvSmF2YVNjcmlwdFR5cGUodmFsdWUsIHR5cGVzLCBzdHJpY3RJbnRlZ2VycyA9IHRydWUpICB7XG4gIGlmICghaXNEZWZpbmVkKHZhbHVlKSkgeyByZXR1cm4gbnVsbDsgfVxuICBpZiAoaXNTdHJpbmcodHlwZXMpKSB7IHR5cGVzID0gW3R5cGVzXTsgfVxuICBpZiAoc3RyaWN0SW50ZWdlcnMgJiYgaW5BcnJheSgnaW50ZWdlcicsIHR5cGVzKSkge1xuICAgIGlmIChpc0ludGVnZXIodmFsdWUsICdzdHJpY3QnKSkgeyByZXR1cm4gdmFsdWU7IH1cbiAgICBpZiAoaXNJbnRlZ2VyKHZhbHVlKSkgeyByZXR1cm4gcGFyc2VJbnQodmFsdWUsIDEwKTsgfVxuICB9XG4gIGlmIChpbkFycmF5KCdudW1iZXInLCB0eXBlcykgfHwgKCFzdHJpY3RJbnRlZ2VycyAmJiBpbkFycmF5KCdpbnRlZ2VyJywgdHlwZXMpKSkge1xuICAgIGlmIChpc051bWJlcih2YWx1ZSwgJ3N0cmljdCcpKSB7IHJldHVybiB2YWx1ZTsgfVxuICAgIGlmIChpc051bWJlcih2YWx1ZSkpIHsgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpOyB9XG4gIH1cbiAgaWYgKGluQXJyYXkoJ3N0cmluZycsIHR5cGVzKSkge1xuICAgIGlmIChpc1N0cmluZyh2YWx1ZSkpIHsgcmV0dXJuIHZhbHVlOyB9XG4gICAgLy8gSWYgdmFsdWUgaXMgYSBkYXRlLCBhbmQgdHlwZXMgaW5jbHVkZXMgJ3N0cmluZycsXG4gICAgLy8gY29udmVydCB0aGUgZGF0ZSB0byBhIHN0cmluZ1xuICAgIGlmIChpc0RhdGUodmFsdWUpKSB7IHJldHVybiB2YWx1ZS50b0lTT1N0cmluZygpLnNsaWNlKDAsIDEwKTsgfVxuICAgIGlmIChpc051bWJlcih2YWx1ZSkpIHsgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7IH1cbiAgfVxuICAvLyBJZiB2YWx1ZSBpcyBhIGRhdGUsIGFuZCB0eXBlcyBpbmNsdWRlcyAnaW50ZWdlcicgb3IgJ251bWJlcicsXG4gIC8vIGJ1dCBub3QgJ3N0cmluZycsIGNvbnZlcnQgdGhlIGRhdGUgdG8gYSBudW1iZXJcbiAgaWYgKGlzRGF0ZSh2YWx1ZSkgJiYgKGluQXJyYXkoJ2ludGVnZXInLCB0eXBlcykgfHwgaW5BcnJheSgnbnVtYmVyJywgdHlwZXMpKSkge1xuICAgIHJldHVybiB2YWx1ZS5nZXRUaW1lKCk7XG4gIH1cbiAgaWYgKGluQXJyYXkoJ2Jvb2xlYW4nLCB0eXBlcykpIHtcbiAgICBpZiAoaXNCb29sZWFuKHZhbHVlLCB0cnVlKSkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgIGlmIChpc0Jvb2xlYW4odmFsdWUsIGZhbHNlKSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiAndG9TY2hlbWFUeXBlJyBmdW5jdGlvblxuICpcbiAqIENvbnZlcnRzIGFuIGlucHV0IChwcm9iYWJseSBzdHJpbmcpIHZhbHVlIHRvIHRoZSBcImJlc3RcIiBKYXZhU2NyaXB0XG4gKiBlcXVpdmFsZW50IGF2YWlsYWJsZSBmcm9tIGFuIGFsbG93ZWQgbGlzdCBvZiBKU09OIFNjaGVtYSB0eXBlcywgd2hpY2ggbWF5XG4gKiBjb250YWluICdzdHJpbmcnLCAnbnVtYmVyJywgJ2ludGVnZXInLCAnYm9vbGVhbicsIGFuZC9vciAnbnVsbCcuXG4gKiBJZiBuZWNzc2FyeSwgaXQgZG9lcyBwcm9ncmVzc2l2ZWx5IGFncmVzc2l2ZSB0eXBlIGNvZXJzaW9uLlxuICogSXQgd2lsbCBub3QgcmV0dXJuIG51bGwgdW5sZXNzIG51bGwgaXMgaW4gdGhlIGxpc3Qgb2YgYWxsb3dlZCB0eXBlcy5cbiAqXG4gKiBOdW1iZXIgY29udmVyc2lvbiBleGFtcGxlczpcbiAqIHRvU2NoZW1hVHlwZSgnMTAnLCBbJ251bWJlcicsJ2ludGVnZXInLCdzdHJpbmcnXSkgPSAxMCAvLyBpbnRlZ2VyXG4gKiB0b1NjaGVtYVR5cGUoJzEwJywgWydudW1iZXInLCdzdHJpbmcnXSkgPSAxMCAvLyBudW1iZXJcbiAqIHRvU2NoZW1hVHlwZSgnMTAnLCBbJ3N0cmluZyddKSA9ICcxMCcgLy8gc3RyaW5nXG4gKiB0b1NjaGVtYVR5cGUoJzEwLjUnLCBbJ251bWJlcicsJ2ludGVnZXInLCdzdHJpbmcnXSkgPSAxMC41IC8vIG51bWJlclxuICogdG9TY2hlbWFUeXBlKCcxMC41JywgWydpbnRlZ2VyJywnc3RyaW5nJ10pID0gJzEwLjUnIC8vIHN0cmluZ1xuICogdG9TY2hlbWFUeXBlKCcxMC41JywgWydpbnRlZ2VyJ10pID0gMTAgLy8gaW50ZWdlclxuICogdG9TY2hlbWFUeXBlKDEwLjUsIFsnbnVsbCcsJ2Jvb2xlYW4nLCdzdHJpbmcnXSkgPSAnMTAuNScgLy8gc3RyaW5nXG4gKiB0b1NjaGVtYVR5cGUoMTAuNSwgWydudWxsJywnYm9vbGVhbiddKSA9IHRydWUgLy8gYm9vbGVhblxuICpcbiAqIFN0cmluZyBjb252ZXJzaW9uIGV4YW1wbGVzOlxuICogdG9TY2hlbWFUeXBlKCcxLjV4JywgWydib29sZWFuJywnbnVtYmVyJywnaW50ZWdlcicsJ3N0cmluZyddKSA9ICcxLjV4JyAvLyBzdHJpbmdcbiAqIHRvU2NoZW1hVHlwZSgnMS41eCcsIFsnYm9vbGVhbicsJ251bWJlcicsJ2ludGVnZXInXSkgPSAnMS41JyAvLyBudW1iZXJcbiAqIHRvU2NoZW1hVHlwZSgnMS41eCcsIFsnYm9vbGVhbicsJ2ludGVnZXInXSkgPSAnMScgLy8gaW50ZWdlclxuICogdG9TY2hlbWFUeXBlKCcxLjV4JywgWydib29sZWFuJ10pID0gdHJ1ZSAvLyBib29sZWFuXG4gKiB0b1NjaGVtYVR5cGUoJ3h5eicsIFsnbnVtYmVyJywnaW50ZWdlcicsJ2Jvb2xlYW4nLCdudWxsJ10pID0gdHJ1ZSAvLyBib29sZWFuXG4gKiB0b1NjaGVtYVR5cGUoJ3h5eicsIFsnbnVtYmVyJywnaW50ZWdlcicsJ251bGwnXSkgPSBudWxsIC8vIG51bGxcbiAqIHRvU2NoZW1hVHlwZSgneHl6JywgWydudW1iZXInLCdpbnRlZ2VyJ10pID0gMCAvLyBudW1iZXJcbiAqXG4gKiBCb29sZWFuIGNvbnZlcnNpb24gZXhhbXBsZXM6XG4gKiB0b1NjaGVtYVR5cGUoJzEnLCBbJ2ludGVnZXInLCdudW1iZXInLCdzdHJpbmcnLCdib29sZWFuJ10pID0gMSAvLyBpbnRlZ2VyXG4gKiB0b1NjaGVtYVR5cGUoJzEnLCBbJ251bWJlcicsJ3N0cmluZycsJ2Jvb2xlYW4nXSkgPSAxIC8vIG51bWJlclxuICogdG9TY2hlbWFUeXBlKCcxJywgWydzdHJpbmcnLCdib29sZWFuJ10pID0gJzEnIC8vIHN0cmluZ1xuICogdG9TY2hlbWFUeXBlKCcxJywgWydib29sZWFuJ10pID0gdHJ1ZSAvLyBib29sZWFuXG4gKiB0b1NjaGVtYVR5cGUoJ3RydWUnLCBbJ251bWJlcicsJ3N0cmluZycsJ2Jvb2xlYW4nXSkgPSAndHJ1ZScgLy8gc3RyaW5nXG4gKiB0b1NjaGVtYVR5cGUoJ3RydWUnLCBbJ2Jvb2xlYW4nXSkgPSB0cnVlIC8vIGJvb2xlYW5cbiAqIHRvU2NoZW1hVHlwZSgndHJ1ZScsIFsnbnVtYmVyJ10pID0gMCAvLyBudW1iZXJcbiAqIHRvU2NoZW1hVHlwZSh0cnVlLCBbJ251bWJlcicsJ3N0cmluZycsJ2Jvb2xlYW4nXSkgPSB0cnVlIC8vIGJvb2xlYW5cbiAqIHRvU2NoZW1hVHlwZSh0cnVlLCBbJ251bWJlcicsJ3N0cmluZyddKSA9ICd0cnVlJyAvLyBzdHJpbmdcbiAqIHRvU2NoZW1hVHlwZSh0cnVlLCBbJ251bWJlciddKSA9IDEgLy8gbnVtYmVyXG4gKlxuICogQHBhcmFtICB7IFByaW1pdGl2ZVZhbHVlIH0gdmFsdWUgLSB2YWx1ZSB0byBjb252ZXJ0XG4gKiBAcGFyYW0gIHsgU2NoZW1hUHJpbWl0aXZlVHlwZSB8IFNjaGVtYVByaW1pdGl2ZVR5cGVbXSB9IHR5cGVzIC0gYWxsb3dlZCB0eXBlcyB0byBjb252ZXJ0IHRvXG4gKiBAcmV0dXJuIHsgUHJpbWl0aXZlVmFsdWUgfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9TY2hlbWFUeXBlKHZhbHVlLCB0eXBlcykge1xuICBpZiAoIWlzQXJyYXkoPFNjaGVtYVByaW1pdGl2ZVR5cGU+dHlwZXMpKSB7XG4gICAgdHlwZXMgPSA8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPlt0eXBlc107XG4gIH1cbiAgaWYgKCg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnbnVsbCcpICYmICFoYXNWYWx1ZSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAoKDxTY2hlbWFQcmltaXRpdmVUeXBlW10+dHlwZXMpLmluY2x1ZGVzKCdib29sZWFuJykgJiYgIWlzQm9vbGVhbih2YWx1ZSwgJ3N0cmljdCcpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmICgoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT50eXBlcykuaW5jbHVkZXMoJ2ludGVnZXInKSkge1xuICAgIGNvbnN0IHRlc3RWYWx1ZSA9IHRvSmF2YVNjcmlwdFR5cGUodmFsdWUsICdpbnRlZ2VyJyk7XG4gICAgaWYgKHRlc3RWYWx1ZSAhPT0gbnVsbCkgeyByZXR1cm4gK3Rlc3RWYWx1ZTsgfVxuICB9XG4gIGlmICgoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT50eXBlcykuaW5jbHVkZXMoJ251bWJlcicpKSB7XG4gICAgY29uc3QgdGVzdFZhbHVlID0gdG9KYXZhU2NyaXB0VHlwZSh2YWx1ZSwgJ251bWJlcicpO1xuICAgIGlmICh0ZXN0VmFsdWUgIT09IG51bGwpIHsgcmV0dXJuICt0ZXN0VmFsdWU7IH1cbiAgfVxuICBpZiAoXG4gICAgKGlzU3RyaW5nKHZhbHVlKSB8fCBpc051bWJlcih2YWx1ZSwgJ3N0cmljdCcpKSAmJlxuICAgICg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnc3RyaW5nJylcbiAgKSB7IC8vIENvbnZlcnQgbnVtYmVyIHRvIHN0cmluZ1xuICAgIHJldHVybiB0b0phdmFTY3JpcHRUeXBlKHZhbHVlLCAnc3RyaW5nJyk7XG4gIH1cbiAgaWYgKCg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnYm9vbGVhbicpICYmIGlzQm9vbGVhbih2YWx1ZSkpIHtcbiAgICByZXR1cm4gdG9KYXZhU2NyaXB0VHlwZSh2YWx1ZSwgJ2Jvb2xlYW4nKTtcbiAgfVxuICBpZiAoKDxTY2hlbWFQcmltaXRpdmVUeXBlW10+dHlwZXMpLmluY2x1ZGVzKCdzdHJpbmcnKSkgeyAvLyBDb252ZXJ0IG51bGwgJiBib29sZWFuIHRvIHN0cmluZ1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkgeyByZXR1cm4gJyc7IH1cbiAgICBjb25zdCB0ZXN0VmFsdWUgPSB0b0phdmFTY3JpcHRUeXBlKHZhbHVlLCAnc3RyaW5nJyk7XG4gICAgaWYgKHRlc3RWYWx1ZSAhPT0gbnVsbCkgeyByZXR1cm4gdGVzdFZhbHVlOyB9XG4gIH1cbiAgaWYgKChcbiAgICAoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT50eXBlcykuaW5jbHVkZXMoJ251bWJlcicpIHx8XG4gICAgKDxTY2hlbWFQcmltaXRpdmVUeXBlW10+dHlwZXMpLmluY2x1ZGVzKCdpbnRlZ2VyJykpXG4gICkge1xuICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkgeyByZXR1cm4gMTsgfSAvLyBDb252ZXJ0IGJvb2xlYW4gJiBudWxsIHRvIG51bWJlclxuICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09ICcnKSB7IHJldHVybiAwOyB9XG4gIH1cbiAgaWYgKCg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnbnVtYmVyJykpIHsgLy8gQ29udmVydCBtaXhlZCBzdHJpbmcgdG8gbnVtYmVyXG4gICAgY29uc3QgdGVzdFZhbHVlID0gcGFyc2VGbG9hdCg8c3RyaW5nPnZhbHVlKTtcbiAgICBpZiAoISF0ZXN0VmFsdWUpIHsgcmV0dXJuIHRlc3RWYWx1ZTsgfVxuICB9XG4gIGlmICgoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT50eXBlcykuaW5jbHVkZXMoJ2ludGVnZXInKSkgeyAvLyBDb252ZXJ0IHN0cmluZyBvciBudW1iZXIgdG8gaW50ZWdlclxuICAgIGNvbnN0IHRlc3RWYWx1ZSA9IHBhcnNlSW50KDxzdHJpbmc+dmFsdWUsIDEwKTtcbiAgICBpZiAoISF0ZXN0VmFsdWUpIHsgcmV0dXJuIHRlc3RWYWx1ZTsgfVxuICB9XG4gIGlmICgoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT50eXBlcykuaW5jbHVkZXMoJ2Jvb2xlYW4nKSkgeyAvLyBDb252ZXJ0IGFueXRoaW5nIHRvIGJvb2xlYW5cbiAgICByZXR1cm4gISF2YWx1ZTtcbiAgfVxuICBpZiAoKFxuICAgICAgKDxTY2hlbWFQcmltaXRpdmVUeXBlW10+dHlwZXMpLmluY2x1ZGVzKCdudW1iZXInKSB8fFxuICAgICAgKDxTY2hlbWFQcmltaXRpdmVUeXBlW10+dHlwZXMpLmluY2x1ZGVzKCdpbnRlZ2VyJylcbiAgICApICYmICEoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT50eXBlcykuaW5jbHVkZXMoJ251bGwnKVxuICApIHtcbiAgICByZXR1cm4gMDsgLy8gSWYgbnVsbCBub3QgYWxsb3dlZCwgcmV0dXJuIDAgZm9yIG5vbi1jb252ZXJ0YWJsZSB2YWx1ZXNcbiAgfVxufVxuXG4vKipcbiAqICdpc1Byb21pc2UnIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtICB7IGFueSB9IG9iamVjdFxuICogQHJldHVybiB7IGJvb2xlYW4gfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9taXNlKG9iamVjdCk6IG9iamVjdCBpcyBQcm9taXNlPGFueT4ge1xuICByZXR1cm4gISFvYmplY3QgJiYgdHlwZW9mIG9iamVjdC50aGVuID09PSAnZnVuY3Rpb24nO1xufVxuXG4vKipcbiAqICdpc09ic2VydmFibGUnIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtICB7IGFueSB9IG9iamVjdFxuICogQHJldHVybiB7IGJvb2xlYW4gfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYnNlcnZhYmxlKG9iamVjdCk6IG9iamVjdCBpcyBPYnNlcnZhYmxlPGFueT4ge1xuICByZXR1cm4gISFvYmplY3QgJiYgdHlwZW9mIG9iamVjdC5zdWJzY3JpYmUgPT09ICdmdW5jdGlvbic7XG59XG5cbi8qKlxuICogJ190b1Byb21pc2UnIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtICB7IG9iamVjdCB9IG9iamVjdFxuICogQHJldHVybiB7IFByb21pc2U8YW55PiB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfdG9Qcm9taXNlKG9iamVjdCk6IFByb21pc2U8YW55PiB7XG4gIHJldHVybiBpc1Byb21pc2Uob2JqZWN0KSA/IG9iamVjdCA6IHRvUHJvbWlzZS5jYWxsKG9iamVjdCk7XG59XG5cbi8qKlxuICogJ3RvT2JzZXJ2YWJsZScgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0gIHsgb2JqZWN0IH0gb2JqZWN0XG4gKiBAcmV0dXJuIHsgT2JzZXJ2YWJsZTxhbnk+IH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvT2JzZXJ2YWJsZShvYmplY3QpOiBPYnNlcnZhYmxlPGFueT4ge1xuICBjb25zdCBvYnNlcnZhYmxlID0gaXNQcm9taXNlKG9iamVjdCkgPyBmcm9tUHJvbWlzZShvYmplY3QpIDogb2JqZWN0O1xuICBpZiAoaXNPYnNlcnZhYmxlKG9ic2VydmFibGUpKSB7IHJldHVybiBvYnNlcnZhYmxlOyB9XG4gIGNvbnNvbGUuZXJyb3IoJ3RvT2JzZXJ2YWJsZSBlcnJvcjogRXhwZWN0ZWQgdmFsaWRhdG9yIHRvIHJldHVybiBQcm9taXNlIG9yIE9ic2VydmFibGUuJyk7XG4gIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgpO1xufVxuXG4vKipcbiAqICdpbkFycmF5JyBmdW5jdGlvblxuICpcbiAqIFNlYXJjaGVzIGFuIGFycmF5IGZvciBhbiBpdGVtLCBvciBvbmUgb2YgYSBsaXN0IG9mIGl0ZW1zLCBhbmQgcmV0dXJucyB0cnVlXG4gKiBhcyBzb29uIGFzIGEgbWF0Y2ggaXMgZm91bmQsIG9yIGZhbHNlIGlmIG5vIG1hdGNoLlxuICpcbiAqIElmIHRoZSBvcHRpb25hbCB0aGlyZCBwYXJhbWV0ZXIgYWxsSW4gaXMgc2V0IHRvIFRSVUUsIGFuZCB0aGUgaXRlbSB0byBmaW5kXG4gKiBpcyBhbiBhcnJheSwgdGhlbiB0aGUgZnVuY3Rpb24gcmV0dXJucyB0cnVlIG9ubHkgaWYgYWxsIGVsZW1lbnRzIGZyb20gaXRlbVxuICogYXJlIGZvdW5kIGluIHRoZSBhcnJheSBsaXN0LCBhbmQgZmFsc2UgaWYgYW55IGVsZW1lbnQgaXMgbm90IGZvdW5kLiBJZiB0aGVcbiAqIGl0ZW0gdG8gZmluZCBpcyBub3QgYW4gYXJyYXksIHNldHRpbmcgYWxsSW4gdG8gVFJVRSBoYXMgbm8gZWZmZWN0LlxuICpcbiAqIEBwYXJhbSAgeyBhbnl8YW55W10gfSBpdGVtIC0gdGhlIGl0ZW0gdG8gc2VhcmNoIGZvclxuICogQHBhcmFtICB7IGFueVtdIH0gYXJyYXkgLSB0aGUgYXJyYXkgdG8gc2VhcmNoXG4gKiBAcGFyYW0gIHsgYm9vbGVhbiA9IGZhbHNlIH0gYWxsSW4gLSBpZiBUUlVFLCBhbGwgaXRlbXMgbXVzdCBiZSBpbiBhcnJheVxuICogQHJldHVybiB7IGJvb2xlYW4gfSAtIHRydWUgaWYgaXRlbShzKSBpbiBhcnJheSwgZmFsc2Ugb3RoZXJ3aXNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbkFycmF5KGl0ZW0sIGFycmF5LCBhbGxJbiA9IGZhbHNlKSB7XG4gIGlmICghaXNEZWZpbmVkKGl0ZW0pIHx8ICFpc0FycmF5KGFycmF5KSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgcmV0dXJuIGlzQXJyYXkoaXRlbSkgP1xuICAgIGl0ZW1bYWxsSW4gPyAnZXZlcnknIDogJ3NvbWUnXShzdWJJdGVtID0+IGFycmF5LmluY2x1ZGVzKHN1Ykl0ZW0pKSA6XG4gICAgYXJyYXkuaW5jbHVkZXMoaXRlbSk7XG59XG5cbi8qKlxuICogJ3hvcicgdXRpbGl0eSBmdW5jdGlvbiAtIGV4Y2x1c2l2ZSBvclxuICpcbiAqIFJldHVybnMgdHJ1ZSBpZiBleGFjdGx5IG9uZSBvZiB0d28gdmFsdWVzIGlzIHRydXRoeS5cbiAqXG4gKiBAcGFyYW0gIHsgYW55IH0gdmFsdWUxIC0gZmlyc3QgdmFsdWUgdG8gY2hlY2tcbiAqIEBwYXJhbSAgeyBhbnkgfSB2YWx1ZTIgLSBzZWNvbmQgdmFsdWUgdG8gY2hlY2tcbiAqIEByZXR1cm4geyBib29sZWFuIH0gLSB0cnVlIGlmIGV4YWN0bHkgb25lIGlucHV0IHZhbHVlIGlzIHRydXRoeSwgZmFsc2UgaWYgbm90XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB4b3IodmFsdWUxLCB2YWx1ZTIpIHtcbiAgcmV0dXJuICghIXZhbHVlMSAmJiAhdmFsdWUyKSB8fCAoIXZhbHVlMSAmJiAhIXZhbHVlMik7XG59XG4iXX0=