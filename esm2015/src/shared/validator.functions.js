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
export function _executeValidators(control, validators, invert = false) {
    return validators.map(validator => validator(control, invert));
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
export function _executeAsyncValidators(control, validators, invert = false) {
    return validators.map(validator => validator(control, invert));
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
export function _mergeObjects(...objects) {
    const mergedObject = {};
    for (const currentObject of objects) {
        if (isObject(currentObject)) {
            for (const key of Object.keys(currentObject)) {
                const currentValue = currentObject[key];
                const mergedValue = mergedObject[key];
                mergedObject[key] = !isDefined(mergedValue) ? currentValue :
                    key === 'not' && isBoolean(mergedValue, 'strict') &&
                        isBoolean(currentValue, 'strict') ? xor(mergedValue, currentValue) :
                        getType(mergedValue) === 'object' && getType(currentValue) === 'object' ?
                            _mergeObjects(mergedValue, currentValue) :
                            currentValue;
            }
        }
    }
    return mergedObject;
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
    const mergedErrors = _mergeObjects(...arrayOfErrors);
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
export function isNumber(value, strict = false) {
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
export function isInteger(value, strict = false) {
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
export function isBoolean(value, option = null) {
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
export function getType(value, strict = false) {
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
            console.error(`isType error: "${type}" is not a recognized type.`);
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
export function toJavaScriptType(value, types, strictIntegers = true) {
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
        const testValue = toJavaScriptType(value, 'integer');
        if (testValue !== null) {
            return +testValue;
        }
    }
    if (types.includes('number')) {
        const testValue = toJavaScriptType(value, 'number');
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
        const testValue = toJavaScriptType(value, 'string');
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
        const testValue = parseFloat(value);
        if (!!testValue) {
            return testValue;
        }
    }
    if (types.includes('integer')) {
        const testValue = parseInt(value, 10);
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
    const observable = isPromise(object) ? fromPromise(object) : object;
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
export function inArray(item, array, allIn = false) {
    if (!isDefined(item) || !isArray(array)) {
        return false;
    }
    return isArray(item) ?
        item[allIn ? 'every' : 'some'](subItem => array.includes(subItem)) :
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLmZ1bmN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWpzb24tc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJzcmMvc2hhcmVkL3ZhbGlkYXRvci5mdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFnRDNEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSw2QkFBNkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEdBQUcsS0FBSztJQUNwRSxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNqRSxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLGtDQUFrQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sR0FBRyxLQUFLO0lBQ3pFLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ2pFLENBQUM7QUFFRDs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLHdCQUF3QixHQUFHLE9BQU87SUFDdEMsTUFBTSxZQUFZLEdBQWdCLEVBQUcsQ0FBQztJQUN0QyxHQUFHLENBQUMsQ0FBQyxNQUFNLGFBQWEsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFh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TUFBTTtJQUNoQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgVmFsaWRhdGlvbkVycm9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzLWNvbXBhdC9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGZyb21Qcm9taXNlIH0gZnJvbSAncnhqcy1jb21wYXQvb2JzZXJ2YWJsZS9mcm9tUHJvbWlzZSc7XG5pbXBvcnQgeyB0b1Byb21pc2UgfSBmcm9tICdyeGpzLWNvbXBhdC9vcGVyYXRvci90b1Byb21pc2UnO1xuXG4vKipcbiAqIFZhbGlkYXRvciB1dGlsaXR5IGZ1bmN0aW9uIGxpYnJhcnk6XG4gKlxuICogVmFsaWRhdG9yIGFuZCBlcnJvciB1dGlsaXRpZXM6XG4gKiAgIF9leGVjdXRlVmFsaWRhdG9ycywgX2V4ZWN1dGVBc3luY1ZhbGlkYXRvcnMsIF9tZXJnZU9iamVjdHMsIF9tZXJnZUVycm9yc1xuICpcbiAqIEluZGl2aWR1YWwgdmFsdWUgY2hlY2tpbmc6XG4gKiAgIGlzRGVmaW5lZCwgaGFzVmFsdWUsIGlzRW1wdHlcbiAqXG4gKiBJbmRpdmlkdWFsIHR5cGUgY2hlY2tpbmc6XG4gKiAgIGlzU3RyaW5nLCBpc051bWJlciwgaXNJbnRlZ2VyLCBpc0Jvb2xlYW4sIGlzRnVuY3Rpb24sIGlzT2JqZWN0LCBpc0FycmF5LFxuICogICBpc01hcCwgaXNTZXQsIGlzUHJvbWlzZSwgaXNPYnNlcnZhYmxlXG4gKlxuICogTXVsdGlwbGUgdHlwZSBjaGVja2luZyBhbmQgZml4aW5nOlxuICogICBnZXRUeXBlLCBpc1R5cGUsIGlzUHJpbWl0aXZlLCB0b0phdmFTY3JpcHRUeXBlLCB0b1NjaGVtYVR5cGUsXG4gKiAgIF90b1Byb21pc2UsIHRvT2JzZXJ2YWJsZVxuICpcbiAqIFV0aWxpdHkgZnVuY3Rpb25zOlxuICogICBpbkFycmF5LCB4b3JcbiAqXG4gKiBUeXBlc2NyaXB0IHR5cGVzIGFuZCBpbnRlcmZhY2VzOlxuICogICBTY2hlbWFQcmltaXRpdmVUeXBlLCBTY2hlbWFUeXBlLCBKYXZhU2NyaXB0UHJpbWl0aXZlVHlwZSwgSmF2YVNjcmlwdFR5cGUsXG4gKiAgIFByaW1pdGl2ZVZhbHVlLCBQbGFpbk9iamVjdCwgSVZhbGlkYXRvckZuLCBBc3luY0lWYWxpZGF0b3JGblxuICpcbiAqIE5vdGU6ICdJVmFsaWRhdG9yRm4nIGlzIHNob3J0IGZvciAnaW52ZXJ0YWJsZSB2YWxpZGF0b3IgZnVuY3Rpb24nLFxuICogICB3aGljaCBpcyBhIHZhbGlkYXRvciBmdW5jdGlvbnMgdGhhdCBhY2NlcHRzIGFuIG9wdGlvbmFsIHNlY29uZFxuICogICBhcmd1bWVudCB3aGljaCwgaWYgc2V0IHRvIFRSVUUsIGNhdXNlcyB0aGUgdmFsaWRhdG9yIHRvIHBlcmZvcm1cbiAqICAgdGhlIG9wcG9zaXRlIG9mIGl0cyBvcmlnaW5hbCBmdW5jdGlvbi5cbiAqL1xuXG5leHBvcnQgdHlwZSBTY2hlbWFQcmltaXRpdmVUeXBlID1cbiAgJ3N0cmluZycgfCAnbnVtYmVyJyB8ICdpbnRlZ2VyJyB8ICdib29sZWFuJyB8ICdudWxsJztcbmV4cG9ydCB0eXBlIFNjaGVtYVR5cGUgPVxuICAnc3RyaW5nJyB8ICdudW1iZXInIHwgJ2ludGVnZXInIHwgJ2Jvb2xlYW4nIHwgJ251bGwnIHwgJ29iamVjdCcgfCAnYXJyYXknO1xuZXhwb3J0IHR5cGUgSmF2YVNjcmlwdFByaW1pdGl2ZVR5cGUgPVxuICAnc3RyaW5nJyB8ICdudW1iZXInIHwgJ2Jvb2xlYW4nIHwgJ251bGwnIHwgJ3VuZGVmaW5lZCc7XG5leHBvcnQgdHlwZSBKYXZhU2NyaXB0VHlwZSA9XG4gICdzdHJpbmcnIHwgJ251bWJlcicgfCAnYm9vbGVhbicgfCAnbnVsbCcgfCAndW5kZWZpbmVkJyB8ICdvYmplY3QnIHwgJ2FycmF5JyB8XG4gICdtYXAnIHwgJ3NldCcgfCAnYXJndW1lbnRzJyB8ICdkYXRlJyB8ICdlcnJvcicgfCAnZnVuY3Rpb24nIHwgJ2pzb24nIHxcbiAgJ21hdGgnIHwgJ3JlZ2V4cCc7IC8vIE5vdGU6IHRoaXMgbGlzdCBpcyBpbmNvbXBsZXRlXG5leHBvcnQgdHlwZSBQcmltaXRpdmVWYWx1ZSA9IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkO1xuZXhwb3J0IGludGVyZmFjZSBQbGFpbk9iamVjdCB7IFtrOiBzdHJpbmddOiBhbnk7IH1cblxuZXhwb3J0IHR5cGUgSVZhbGlkYXRvckZuID0gKGM6IEFic3RyYWN0Q29udHJvbCwgaT86IGJvb2xlYW4pID0+IFBsYWluT2JqZWN0O1xuZXhwb3J0IHR5cGUgQXN5bmNJVmFsaWRhdG9yRm4gPSAoYzogQWJzdHJhY3RDb250cm9sLCBpPzogYm9vbGVhbikgPT4gYW55O1xuXG4vKipcbiAqICdfZXhlY3V0ZVZhbGlkYXRvcnMnIHV0aWxpdHkgZnVuY3Rpb25cbiAqXG4gKiBWYWxpZGF0ZXMgYSBjb250cm9sIGFnYWluc3QgYW4gYXJyYXkgb2YgdmFsaWRhdG9ycywgYW5kIHJldHVybnNcbiAqIGFuIGFycmF5IG9mIHRoZSBzYW1lIGxlbmd0aCBjb250YWluaW5nIGEgY29tYmluYXRpb24gb2YgZXJyb3IgbWVzc2FnZXNcbiAqIChmcm9tIGludmFsaWQgdmFsaWRhdG9ycykgYW5kIG51bGwgdmFsdWVzIChmcm9tIHZhbGlkIHZhbGlkYXRvcnMpXG4gKlxuICogQHBhcmFtICB7IEFic3RyYWN0Q29udHJvbCB9IGNvbnRyb2wgLSBjb250cm9sIHRvIHZhbGlkYXRlXG4gKiBAcGFyYW0gIHsgSVZhbGlkYXRvckZuW10gfSB2YWxpZGF0b3JzIC0gYXJyYXkgb2YgdmFsaWRhdG9yc1xuICogQHBhcmFtICB7IGJvb2xlYW4gfSBpbnZlcnQgLSBpbnZlcnQ/XG4gKiBAcmV0dXJuIHsgUGxhaW5PYmplY3RbXSB9IC0gYXJyYXkgb2YgbnVsbHMgYW5kIGVycm9yIG1lc3NhZ2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9leGVjdXRlVmFsaWRhdG9ycyhjb250cm9sLCB2YWxpZGF0b3JzLCBpbnZlcnQgPSBmYWxzZSkge1xuICByZXR1cm4gdmFsaWRhdG9ycy5tYXAodmFsaWRhdG9yID0+IHZhbGlkYXRvcihjb250cm9sLCBpbnZlcnQpKTtcbn1cblxuLyoqXG4gKiAnX2V4ZWN1dGVBc3luY1ZhbGlkYXRvcnMnIHV0aWxpdHkgZnVuY3Rpb25cbiAqXG4gKiBWYWxpZGF0ZXMgYSBjb250cm9sIGFnYWluc3QgYW4gYXJyYXkgb2YgYXN5bmMgdmFsaWRhdG9ycywgYW5kIHJldHVybnNcbiAqIGFuIGFycmF5IG9mIG9ic2VydmFiZSByZXN1bHRzIG9mIHRoZSBzYW1lIGxlbmd0aCBjb250YWluaW5nIGEgY29tYmluYXRpb24gb2ZcbiAqIGVycm9yIG1lc3NhZ2VzIChmcm9tIGludmFsaWQgdmFsaWRhdG9ycykgYW5kIG51bGwgdmFsdWVzIChmcm9tIHZhbGlkIG9uZXMpXG4gKlxuICogQHBhcmFtICB7IEFic3RyYWN0Q29udHJvbCB9IGNvbnRyb2wgLSBjb250cm9sIHRvIHZhbGlkYXRlXG4gKiBAcGFyYW0gIHsgQXN5bmNJVmFsaWRhdG9yRm5bXSB9IHZhbGlkYXRvcnMgLSBhcnJheSBvZiBhc3luYyB2YWxpZGF0b3JzXG4gKiBAcGFyYW0gIHsgYm9vbGVhbiB9IGludmVydCAtIGludmVydD9cbiAqIEByZXR1cm4geyBhbnlbXSB9IC0gYXJyYXkgb2Ygb2JzZXJ2YWJsZSBudWxscyBhbmQgZXJyb3IgbWVzc2FnZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2V4ZWN1dGVBc3luY1ZhbGlkYXRvcnMoY29udHJvbCwgdmFsaWRhdG9ycywgaW52ZXJ0ID0gZmFsc2UpIHtcbiAgcmV0dXJuIHZhbGlkYXRvcnMubWFwKHZhbGlkYXRvciA9PiB2YWxpZGF0b3IoY29udHJvbCwgaW52ZXJ0KSk7XG59XG5cbi8qKlxuICogJ19tZXJnZU9iamVjdHMnIHV0aWxpdHkgZnVuY3Rpb25cbiAqXG4gKiBSZWN1cnNpdmVseSBNZXJnZXMgb25lIG9yIG1vcmUgb2JqZWN0cyBpbnRvIGEgc2luZ2xlIG9iamVjdCB3aXRoIGNvbWJpbmVkIGtleXMuXG4gKiBBdXRvbWF0aWNhbGx5IGRldGVjdHMgYW5kIGlnbm9yZXMgbnVsbCBhbmQgdW5kZWZpbmVkIGlucHV0cy5cbiAqIEFsc28gZGV0ZWN0cyBkdXBsaWNhdGVkIGJvb2xlYW4gJ25vdCcga2V5cyBhbmQgWE9ScyB0aGVpciB2YWx1ZXMuXG4gKlxuICogQHBhcmFtICB7IFBsYWluT2JqZWN0W10gfSBvYmplY3RzIC0gb25lIG9yIG1vcmUgb2JqZWN0cyB0byBtZXJnZVxuICogQHJldHVybiB7IFBsYWluT2JqZWN0IH0gLSBtZXJnZWQgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfbWVyZ2VPYmplY3RzKC4uLm9iamVjdHMpIHtcbiAgY29uc3QgbWVyZ2VkT2JqZWN0OiBQbGFpbk9iamVjdCA9IHsgfTtcbiAgZm9yIChjb25zdCBjdXJyZW50T2JqZWN0IG9mIG9iamVjdHMpIHtcbiAgICBpZiAoaXNPYmplY3QoY3VycmVudE9iamVjdCkpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGN1cnJlbnRPYmplY3QpKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGN1cnJlbnRPYmplY3Rba2V5XTtcbiAgICAgICAgY29uc3QgbWVyZ2VkVmFsdWUgPSBtZXJnZWRPYmplY3Rba2V5XTtcbiAgICAgICAgbWVyZ2VkT2JqZWN0W2tleV0gPSAhaXNEZWZpbmVkKG1lcmdlZFZhbHVlKSA/IGN1cnJlbnRWYWx1ZSA6XG4gICAgICAgICAga2V5ID09PSAnbm90JyAmJiBpc0Jvb2xlYW4obWVyZ2VkVmFsdWUsICdzdHJpY3QnKSAmJlxuICAgICAgICAgICAgaXNCb29sZWFuKGN1cnJlbnRWYWx1ZSwgJ3N0cmljdCcpID8geG9yKG1lcmdlZFZhbHVlLCBjdXJyZW50VmFsdWUpIDpcbiAgICAgICAgICBnZXRUeXBlKG1lcmdlZFZhbHVlKSA9PT0gJ29iamVjdCcgJiYgZ2V0VHlwZShjdXJyZW50VmFsdWUpID09PSAnb2JqZWN0JyA/XG4gICAgICAgICAgICBfbWVyZ2VPYmplY3RzKG1lcmdlZFZhbHVlLCBjdXJyZW50VmFsdWUpIDpcbiAgICAgICAgICAgIGN1cnJlbnRWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1lcmdlZE9iamVjdDtcbn1cblxuLyoqXG4gKiAnX21lcmdlRXJyb3JzJyB1dGlsaXR5IGZ1bmN0aW9uXG4gKlxuICogTWVyZ2VzIGFuIGFycmF5IG9mIG9iamVjdHMuXG4gKiBVc2VkIGZvciBjb21iaW5pbmcgdGhlIHZhbGlkYXRvciBlcnJvcnMgcmV0dXJuZWQgZnJvbSAnZXhlY3V0ZVZhbGlkYXRvcnMnXG4gKlxuICogQHBhcmFtICB7IFBsYWluT2JqZWN0W10gfSBhcnJheU9mRXJyb3JzIC0gYXJyYXkgb2Ygb2JqZWN0c1xuICogQHJldHVybiB7IFBsYWluT2JqZWN0IH0gLSBtZXJnZWQgb2JqZWN0LCBvciBudWxsIGlmIG5vIHVzYWJsZSBpbnB1dCBvYmplY3Rjc1xuICovXG5leHBvcnQgZnVuY3Rpb24gX21lcmdlRXJyb3JzKGFycmF5T2ZFcnJvcnMpIHtcbiAgY29uc3QgbWVyZ2VkRXJyb3JzID0gX21lcmdlT2JqZWN0cyguLi5hcnJheU9mRXJyb3JzKTtcbiAgcmV0dXJuIGlzRW1wdHkobWVyZ2VkRXJyb3JzKSA/IG51bGwgOiBtZXJnZWRFcnJvcnM7XG59XG5cbi8qKlxuICogJ2lzRGVmaW5lZCcgdXRpbGl0eSBmdW5jdGlvblxuICpcbiAqIENoZWNrcyBpZiBhIHZhcmlhYmxlIGNvbnRhaW5zIGEgdmFsdWUgb2YgYW55IHR5cGUuXG4gKiBSZXR1cm5zIHRydWUgZXZlbiBmb3Igb3RoZXJ3aXNlICdmYWxzZXknIHZhbHVlcyBvZiAwLCAnJywgYW5kIGZhbHNlLlxuICpcbiAqIEBwYXJhbSAgeyBhbnkgfSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBjaGVja1xuICogQHJldHVybiB7IGJvb2xlYW4gfSAtIGZhbHNlIGlmIHVuZGVmaW5lZCBvciBudWxsLCBvdGhlcndpc2UgdHJ1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNEZWZpbmVkKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsO1xufVxuXG4vKipcbiAqICdoYXNWYWx1ZScgdXRpbGl0eSBmdW5jdGlvblxuICpcbiAqIENoZWNrcyBpZiBhIHZhcmlhYmxlIGNvbnRhaW5zIGEgdmFsdWUuXG4gKiBSZXR1cnMgZmFsc2UgZm9yIG51bGwsIHVuZGVmaW5lZCwgb3IgYSB6ZXJvLWxlbmd0aCBzdHJuZywgJycsXG4gKiBvdGhlcndpc2UgcmV0dXJucyB0cnVlLlxuICogKFN0cmljdGVyIHRoYW4gJ2lzRGVmaW5lZCcgYmVjYXVzZSBpdCBhbHNvIHJldHVybnMgZmFsc2UgZm9yICcnLFxuICogdGhvdWdoIGl0IHN0aWwgcmV0dXJucyB0cnVlIGZvciBvdGhlcndpc2UgJ2ZhbHNleScgdmFsdWVzIDAgYW5kIGZhbHNlLilcbiAqXG4gKiBAcGFyYW0gIHsgYW55IH0gdmFsdWUgLSB0aGUgdmFsdWUgdG8gY2hlY2tcbiAqIEByZXR1cm4geyBib29sZWFuIH0gLSBmYWxzZSBpZiB1bmRlZmluZWQsIG51bGwsIG9yICcnLCBvdGhlcndpc2UgdHJ1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzVmFsdWUodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09ICcnO1xufVxuXG4vKipcbiAqICdpc0VtcHR5JyB1dGlsaXR5IGZ1bmN0aW9uXG4gKlxuICogU2ltaWxhciB0byAhaGFzVmFsdWUsIGJ1dCBhbHNvIHJldHVybnMgdHJ1ZSBmb3IgZW1wdHkgYXJyYXlzIGFuZCBvYmplY3RzLlxuICpcbiAqIEBwYXJhbSAgeyBhbnkgfSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBjaGVja1xuICogQHJldHVybiB7IGJvb2xlYW4gfSAtIGZhbHNlIGlmIHVuZGVmaW5lZCwgbnVsbCwgb3IgJycsIG90aGVyd2lzZSB0cnVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gIGlmIChpc0FycmF5KHZhbHVlKSkgeyByZXR1cm4gIXZhbHVlLmxlbmd0aDsgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7IHJldHVybiAhT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aDsgfVxuICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gJyc7XG59XG5cbi8qKlxuICogJ2lzU3RyaW5nJyB1dGlsaXR5IGZ1bmN0aW9uXG4gKlxuICogQ2hlY2tzIGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtICB7IGFueSB9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIGNoZWNrXG4gKiBAcmV0dXJuIHsgYm9vbGVhbiB9IC0gdHJ1ZSBpZiBzdHJpbmcsIGZhbHNlIGlmIG5vdFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogJ2lzTnVtYmVyJyB1dGlsaXR5IGZ1bmN0aW9uXG4gKlxuICogQ2hlY2tzIGlmIGEgdmFsdWUgaXMgYSByZWd1bGFyIG51bWJlciwgbnVtZXJpYyBzdHJpbmcsIG9yIEphdmFTY3JpcHQgRGF0ZS5cbiAqXG4gKiBAcGFyYW0gIHsgYW55IH0gdmFsdWUgLSB0aGUgdmFsdWUgdG8gY2hlY2tcbiAqIEBwYXJhbSAgeyBhbnkgPSBmYWxzZSB9IHN0cmljdCAtIGlmIHRydXRoeSwgYWxzbyBjaGVja3MgSmF2YVNjcmlwdCB0eW9lXG4gKiBAcmV0dXJuIHsgYm9vbGVhbiB9IC0gdHJ1ZSBpZiBudW1iZXIsIGZhbHNlIGlmIG5vdFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWUsIHN0cmljdDogYW55ID0gZmFsc2UpIHtcbiAgaWYgKHN0cmljdCAmJiB0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB7IHJldHVybiBmYWxzZTsgfVxuICByZXR1cm4gIWlzTmFOKHZhbHVlKSAmJiB2YWx1ZSAhPT0gdmFsdWUgLyAwO1xufVxuXG4vKipcbiAqICdpc0ludGVnZXInIHV0aWxpdHkgZnVuY3Rpb25cbiAqXG4gKiBDaGVja3MgaWYgYSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICpcbiAqIEBwYXJhbSAgeyBhbnkgfSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBjaGVja1xuICogQHBhcmFtICB7IGFueSA9IGZhbHNlIH0gc3RyaWN0IC0gaWYgdHJ1dGh5LCBhbHNvIGNoZWNrcyBKYXZhU2NyaXB0IHR5b2VcbiAqIEByZXR1cm4ge2Jvb2xlYW4gfSAtIHRydWUgaWYgbnVtYmVyLCBmYWxzZSBpZiBub3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZSwgc3RyaWN0OiBhbnkgPSBmYWxzZSkge1xuICBpZiAoc3RyaWN0ICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIHJldHVybiAhaXNOYU4odmFsdWUpICYmICB2YWx1ZSAhPT0gdmFsdWUgLyAwICYmIHZhbHVlICUgMSA9PT0gMDtcbn1cblxuLyoqXG4gKiAnaXNCb29sZWFuJyB1dGlsaXR5IGZ1bmN0aW9uXG4gKlxuICogQ2hlY2tzIGlmIGEgdmFsdWUgaXMgYSBib29sZWFuLlxuICpcbiAqIEBwYXJhbSAgeyBhbnkgfSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBjaGVja1xuICogQHBhcmFtICB7IGFueSA9IG51bGwgfSBvcHRpb24gLSBpZiAnc3RyaWN0JywgYWxzbyBjaGVja3MgSmF2YVNjcmlwdCB0eXBlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIFRSVUUgb3IgRkFMU0UsIGNoZWNrcyBvbmx5IGZvciB0aGF0IHZhbHVlXG4gKiBAcmV0dXJuIHsgYm9vbGVhbiB9IC0gdHJ1ZSBpZiBib29sZWFuLCBmYWxzZSBpZiBub3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZSwgb3B0aW9uOiBhbnkgPSBudWxsKSB7XG4gIGlmIChvcHRpb24gPT09ICdzdHJpY3QnKSB7IHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gZmFsc2U7IH1cbiAgaWYgKG9wdGlvbiA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gMSB8fCB2YWx1ZSA9PT0gJ3RydWUnIHx8IHZhbHVlID09PSAnMSc7XG4gIH1cbiAgaWYgKG9wdGlvbiA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IGZhbHNlIHx8IHZhbHVlID09PSAwIHx8IHZhbHVlID09PSAnZmFsc2UnIHx8IHZhbHVlID09PSAnMCc7XG4gIH1cbiAgcmV0dXJuIHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSAxIHx8IHZhbHVlID09PSAndHJ1ZScgfHwgdmFsdWUgPT09ICcxJyB8fFxuICAgIHZhbHVlID09PSBmYWxzZSB8fCB2YWx1ZSA9PT0gMCB8fCB2YWx1ZSA9PT0gJ2ZhbHNlJyB8fCB2YWx1ZSA9PT0gJzAnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGdW5jdGlvbihpdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiBpdGVtID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QoaXRlbTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBpdGVtICE9PSBudWxsICYmIHR5cGVvZiBpdGVtID09PSAnb2JqZWN0JyAmJlxuICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpdGVtKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FycmF5KGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShpdGVtKSB8fFxuICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpdGVtKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGF0ZShpdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiBpdGVtID09PSAnb2JqZWN0JyAmJlxuICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpdGVtKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNYXAoaXRlbTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcgJiZcbiAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlbSkgPT09ICdbb2JqZWN0IE1hcF0nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTZXQoaXRlbTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcgJiZcbiAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlbSkgPT09ICdbb2JqZWN0IFNldF0nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTeW1ib2woaXRlbTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgaXRlbSA9PT0gJ3N5bWJvbCc7XG59XG5cbi8qKlxuICogJ2dldFR5cGUnIGZ1bmN0aW9uXG4gKlxuICogRGV0ZWN0cyB0aGUgSlNPTiBTY2hlbWEgVHlwZSBvZiBhIHZhbHVlLlxuICogQnkgZGVmYXVsdCwgZGV0ZWN0cyBudW1iZXJzIGFuZCBpbnRlZ2VycyBldmVuIGlmIGZvcm1hdHRlZCBhcyBzdHJpbmdzLlxuICogKFNvIGFsbCBpbnRlZ2VycyBhcmUgYWxzbyBudW1iZXJzLCBhbmQgYW55IG51bWJlciBtYXkgYWxzbyBiZSBhIHN0cmluZy4pXG4gKiBIb3dldmVyLCBpdCBvbmx5IGRldGVjdHMgdHJ1ZSBib29sZWFuIHZhbHVlcyAodG8gZGV0ZWN0IGJvb2xlYW4gdmFsdWVzXG4gKiBpbiBub24tYm9vbGVhbiBmb3JtYXRzLCB1c2UgaXNCb29sZWFuKCkgaW5zdGVhZCkuXG4gKlxuICogSWYgcGFzc2VkIGEgc2Vjb25kIG9wdGlvbmFsIHBhcmFtZXRlciBvZiAnc3RyaWN0JywgaXQgd2lsbCBvbmx5IGRldGVjdFxuICogbnVtYmVycyBhbmQgaW50ZWdlcnMgaWYgdGhleSBhcmUgZm9ybWF0dGVkIGFzIEphdmFTY3JpcHQgbnVtYmVycy5cbiAqXG4gKiBFeGFtcGxlczpcbiAqIGdldFR5cGUoJzEwLjUnKSA9ICdudW1iZXInXG4gKiBnZXRUeXBlKDEwLjUpID0gJ251bWJlcidcbiAqIGdldFR5cGUoJzEwJykgPSAnaW50ZWdlcidcbiAqIGdldFR5cGUoMTApID0gJ2ludGVnZXInXG4gKiBnZXRUeXBlKCd0cnVlJykgPSAnc3RyaW5nJ1xuICogZ2V0VHlwZSh0cnVlKSA9ICdib29sZWFuJ1xuICogZ2V0VHlwZShudWxsKSA9ICdudWxsJ1xuICogZ2V0VHlwZSh7IH0pID0gJ29iamVjdCdcbiAqIGdldFR5cGUoW10pID0gJ2FycmF5J1xuICpcbiAqIGdldFR5cGUoJzEwLjUnLCAnc3RyaWN0JykgPSAnc3RyaW5nJ1xuICogZ2V0VHlwZSgxMC41LCAnc3RyaWN0JykgPSAnbnVtYmVyJ1xuICogZ2V0VHlwZSgnMTAnLCAnc3RyaWN0JykgPSAnc3RyaW5nJ1xuICogZ2V0VHlwZSgxMCwgJ3N0cmljdCcpID0gJ2ludGVnZXInXG4gKiBnZXRUeXBlKCd0cnVlJywgJ3N0cmljdCcpID0gJ3N0cmluZydcbiAqIGdldFR5cGUodHJ1ZSwgJ3N0cmljdCcpID0gJ2Jvb2xlYW4nXG4gKlxuICogQHBhcmFtICB7IGFueSB9IHZhbHVlIC0gdmFsdWUgdG8gY2hlY2tcbiAqIEBwYXJhbSAgeyBhbnkgPSBmYWxzZSB9IHN0cmljdCAtIGlmIHRydXRoeSwgYWxzbyBjaGVja3MgSmF2YVNjcmlwdCB0eW9lXG4gKiBAcmV0dXJuIHsgU2NoZW1hVHlwZSB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUeXBlKHZhbHVlLCBzdHJpY3Q6IGFueSA9IGZhbHNlKSB7XG4gIGlmICghaXNEZWZpbmVkKHZhbHVlKSkgeyByZXR1cm4gJ251bGwnOyB9XG4gIGlmIChpc0FycmF5KHZhbHVlKSkgeyByZXR1cm4gJ2FycmF5JzsgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7IHJldHVybiAnb2JqZWN0JzsgfVxuICBpZiAoaXNCb29sZWFuKHZhbHVlLCAnc3RyaWN0JykpIHsgcmV0dXJuICdib29sZWFuJzsgfVxuICBpZiAoaXNJbnRlZ2VyKHZhbHVlLCBzdHJpY3QpKSB7IHJldHVybiAnaW50ZWdlcic7IH1cbiAgaWYgKGlzTnVtYmVyKHZhbHVlLCBzdHJpY3QpKSB7IHJldHVybiAnbnVtYmVyJzsgfVxuICBpZiAoaXNTdHJpbmcodmFsdWUpIHx8ICghc3RyaWN0ICYmIGlzRGF0ZSh2YWx1ZSkpKSB7IHJldHVybiAnc3RyaW5nJzsgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiAnaXNUeXBlJyBmdW5jdGlvblxuICpcbiAqIENoZWNrcyB3ZXRoZXIgYW4gaW5wdXQgKHByb2JhYmx5IHN0cmluZykgdmFsdWUgY29udGFpbnMgZGF0YSBvZlxuICogYSBzcGVjaWZpZWQgSlNPTiBTY2hlbWEgdHlwZVxuICpcbiAqIEBwYXJhbSAgeyBQcmltaXRpdmVWYWx1ZSB9IHZhbHVlIC0gdmFsdWUgdG8gY2hlY2tcbiAqIEBwYXJhbSAgeyBTY2hlbWFQcmltaXRpdmVUeXBlIH0gdHlwZSAtIHR5cGUgdG8gY2hlY2tcbiAqIEByZXR1cm4geyBib29sZWFuIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVHlwZSh2YWx1ZSwgdHlwZSkge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIGlzU3RyaW5nKHZhbHVlKSB8fCBpc0RhdGUodmFsdWUpO1xuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICByZXR1cm4gaXNOdW1iZXIodmFsdWUpO1xuICAgIGNhc2UgJ2ludGVnZXInOlxuICAgICAgcmV0dXJuIGlzSW50ZWdlcih2YWx1ZSk7XG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICByZXR1cm4gaXNCb29sZWFuKHZhbHVlKTtcbiAgICBjYXNlICdudWxsJzpcbiAgICAgIHJldHVybiAhaGFzVmFsdWUodmFsdWUpO1xuICAgIGRlZmF1bHQ6XG4gICAgICBjb25zb2xlLmVycm9yKGBpc1R5cGUgZXJyb3I6IFwiJHt0eXBlfVwiIGlzIG5vdCBhIHJlY29nbml6ZWQgdHlwZS5gKTtcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8qKlxuICogJ2lzUHJpbWl0aXZlJyBmdW5jdGlvblxuICpcbiAqIENoZWNrcyB3ZXRoZXIgYW4gaW5wdXQgdmFsdWUgaXMgYSBKYXZhU2NyaXB0IHByaW1pdGl2ZSB0eXBlOlxuICogc3RyaW5nLCBudW1iZXIsIGJvb2xlYW4sIG9yIG51bGwuXG4gKlxuICogQHBhcmFtICB7IGFueSB9IHZhbHVlIC0gdmFsdWUgdG8gY2hlY2tcbiAqIEByZXR1cm4geyBib29sZWFuIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUHJpbWl0aXZlKHZhbHVlKSB7XG4gIHJldHVybiAoaXNTdHJpbmcodmFsdWUpIHx8IGlzTnVtYmVyKHZhbHVlKSB8fFxuICAgIGlzQm9vbGVhbih2YWx1ZSwgJ3N0cmljdCcpIHx8IHZhbHVlID09PSBudWxsKTtcbn1cblxuLyoqXG4gKiAndG9KYXZhU2NyaXB0VHlwZScgZnVuY3Rpb25cbiAqXG4gKiBDb252ZXJ0cyBhbiBpbnB1dCAocHJvYmFibHkgc3RyaW5nKSB2YWx1ZSB0byBhIEphdmFTY3JpcHQgcHJpbWl0aXZlIHR5cGUgLVxuICogJ3N0cmluZycsICdudW1iZXInLCAnYm9vbGVhbicsIG9yICdudWxsJyAtIGJlZm9yZSBzdG9yaW5nIGluIGEgSlNPTiBvYmplY3QuXG4gKlxuICogRG9lcyBub3QgY29lcmNlIHZhbHVlcyAob3RoZXIgdGhhbiBudWxsKSwgYW5kIG9ubHkgY29udmVydHMgdGhlIHR5cGVzXG4gKiBvZiB2YWx1ZXMgdGhhdCB3b3VsZCBvdGhlcndpc2UgYmUgdmFsaWQuXG4gKlxuICogSWYgdGhlIG9wdGlvbmFsIHRoaXJkIHBhcmFtZXRlciAnc3RyaWN0SW50ZWdlcnMnIGlzIFRSVUUsIGFuZCB0aGVcbiAqIEpTT04gU2NoZW1hIHR5cGUgJ2ludGVnZXInIGlzIHNwZWNpZmllZCwgaXQgYWxzbyB2ZXJpZmllcyB0aGUgaW5wdXQgdmFsdWVcbiAqIGlzIGFuIGludGVnZXIgYW5kLCBpZiBpdCBpcywgcmV0dXJucyBpdCBhcyBhIEphdmVTY3JpcHQgbnVtYmVyLlxuICogSWYgJ3N0cmljdEludGVnZXJzJyBpcyBGQUxTRSAob3Igbm90IHNldCkgdGhlIHR5cGUgJ2ludGVnZXInIGlzIHRyZWF0ZWRcbiAqIGV4YWN0bHkgdGhlIHNhbWUgYXMgJ251bWJlcicsIGFuZCBhbGxvd3MgZGVjaW1hbHMuXG4gKlxuICogVmFsaWQgRXhhbXBsZXM6XG4gKiB0b0phdmFTY3JpcHRUeXBlKCcxMCcsICAgJ251bWJlcicgKSA9IDEwICAgLy8gJzEwJyAgIGlzIGEgbnVtYmVyXG4gKiB0b0phdmFTY3JpcHRUeXBlKCcxMCcsICAgJ2ludGVnZXInKSA9IDEwICAgLy8gJzEwJyAgIGlzIGFsc28gYW4gaW50ZWdlclxuICogdG9KYXZhU2NyaXB0VHlwZSggMTAsICAgICdpbnRlZ2VyJykgPSAxMCAgIC8vICAxMCAgICBpcyBzdGlsbCBhbiBpbnRlZ2VyXG4gKiB0b0phdmFTY3JpcHRUeXBlKCAxMCwgICAgJ3N0cmluZycgKSA9ICcxMCcgLy8gIDEwICAgIGNhbiBiZSBtYWRlIGludG8gYSBzdHJpbmdcbiAqIHRvSmF2YVNjcmlwdFR5cGUoJzEwLjUnLCAnbnVtYmVyJyApID0gMTAuNSAvLyAnMTAuNScgaXMgYSBudW1iZXJcbiAqXG4gKiBJbnZhbGlkIEV4YW1wbGVzOlxuICogdG9KYXZhU2NyaXB0VHlwZSgnMTAuNScsICdpbnRlZ2VyJykgPSBudWxsIC8vICcxMC41JyBpcyBub3QgYW4gaW50ZWdlclxuICogdG9KYXZhU2NyaXB0VHlwZSggMTAuNSwgICdpbnRlZ2VyJykgPSBudWxsIC8vICAxMC41ICBpcyBzdGlsbCBub3QgYW4gaW50ZWdlclxuICpcbiAqIEBwYXJhbSAgeyBQcmltaXRpdmVWYWx1ZSB9IHZhbHVlIC0gdmFsdWUgdG8gY29udmVydFxuICogQHBhcmFtICB7IFNjaGVtYVByaW1pdGl2ZVR5cGUgfCBTY2hlbWFQcmltaXRpdmVUeXBlW10gfSB0eXBlcyAtIHR5cGVzIHRvIGNvbnZlcnQgdG9cbiAqIEBwYXJhbSAgeyBib29sZWFuID0gZmFsc2UgfSBzdHJpY3RJbnRlZ2VycyAtIGlmIEZBTFNFLCB0cmVhdCBpbnRlZ2VycyBhcyBudW1iZXJzXG4gKiBAcmV0dXJuIHsgUHJpbWl0aXZlVmFsdWUgfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9KYXZhU2NyaXB0VHlwZSh2YWx1ZSwgdHlwZXMsIHN0cmljdEludGVnZXJzID0gdHJ1ZSkgIHtcbiAgaWYgKCFpc0RlZmluZWQodmFsdWUpKSB7IHJldHVybiBudWxsOyB9XG4gIGlmIChpc1N0cmluZyh0eXBlcykpIHsgdHlwZXMgPSBbdHlwZXNdOyB9XG4gIGlmIChzdHJpY3RJbnRlZ2VycyAmJiBpbkFycmF5KCdpbnRlZ2VyJywgdHlwZXMpKSB7XG4gICAgaWYgKGlzSW50ZWdlcih2YWx1ZSwgJ3N0cmljdCcpKSB7IHJldHVybiB2YWx1ZTsgfVxuICAgIGlmIChpc0ludGVnZXIodmFsdWUpKSB7IHJldHVybiBwYXJzZUludCh2YWx1ZSwgMTApOyB9XG4gIH1cbiAgaWYgKGluQXJyYXkoJ251bWJlcicsIHR5cGVzKSB8fCAoIXN0cmljdEludGVnZXJzICYmIGluQXJyYXkoJ2ludGVnZXInLCB0eXBlcykpKSB7XG4gICAgaWYgKGlzTnVtYmVyKHZhbHVlLCAnc3RyaWN0JykpIHsgcmV0dXJuIHZhbHVlOyB9XG4gICAgaWYgKGlzTnVtYmVyKHZhbHVlKSkgeyByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSk7IH1cbiAgfVxuICBpZiAoaW5BcnJheSgnc3RyaW5nJywgdHlwZXMpKSB7XG4gICAgaWYgKGlzU3RyaW5nKHZhbHVlKSkgeyByZXR1cm4gdmFsdWU7IH1cbiAgICAvLyBJZiB2YWx1ZSBpcyBhIGRhdGUsIGFuZCB0eXBlcyBpbmNsdWRlcyAnc3RyaW5nJyxcbiAgICAvLyBjb252ZXJ0IHRoZSBkYXRlIHRvIGEgc3RyaW5nXG4gICAgaWYgKGlzRGF0ZSh2YWx1ZSkpIHsgcmV0dXJuIHZhbHVlLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTApOyB9XG4gICAgaWYgKGlzTnVtYmVyKHZhbHVlKSkgeyByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTsgfVxuICB9XG4gIC8vIElmIHZhbHVlIGlzIGEgZGF0ZSwgYW5kIHR5cGVzIGluY2x1ZGVzICdpbnRlZ2VyJyBvciAnbnVtYmVyJyxcbiAgLy8gYnV0IG5vdCAnc3RyaW5nJywgY29udmVydCB0aGUgZGF0ZSB0byBhIG51bWJlclxuICBpZiAoaXNEYXRlKHZhbHVlKSAmJiAoaW5BcnJheSgnaW50ZWdlcicsIHR5cGVzKSB8fCBpbkFycmF5KCdudW1iZXInLCB0eXBlcykpKSB7XG4gICAgcmV0dXJuIHZhbHVlLmdldFRpbWUoKTtcbiAgfVxuICBpZiAoaW5BcnJheSgnYm9vbGVhbicsIHR5cGVzKSkge1xuICAgIGlmIChpc0Jvb2xlYW4odmFsdWUsIHRydWUpKSB7IHJldHVybiB0cnVlOyB9XG4gICAgaWYgKGlzQm9vbGVhbih2YWx1ZSwgZmFsc2UpKSB7IHJldHVybiBmYWxzZTsgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqICd0b1NjaGVtYVR5cGUnIGZ1bmN0aW9uXG4gKlxuICogQ29udmVydHMgYW4gaW5wdXQgKHByb2JhYmx5IHN0cmluZykgdmFsdWUgdG8gdGhlIFwiYmVzdFwiIEphdmFTY3JpcHRcbiAqIGVxdWl2YWxlbnQgYXZhaWxhYmxlIGZyb20gYW4gYWxsb3dlZCBsaXN0IG9mIEpTT04gU2NoZW1hIHR5cGVzLCB3aGljaCBtYXlcbiAqIGNvbnRhaW4gJ3N0cmluZycsICdudW1iZXInLCAnaW50ZWdlcicsICdib29sZWFuJywgYW5kL29yICdudWxsJy5cbiAqIElmIG5lY3NzYXJ5LCBpdCBkb2VzIHByb2dyZXNzaXZlbHkgYWdyZXNzaXZlIHR5cGUgY29lcnNpb24uXG4gKiBJdCB3aWxsIG5vdCByZXR1cm4gbnVsbCB1bmxlc3MgbnVsbCBpcyBpbiB0aGUgbGlzdCBvZiBhbGxvd2VkIHR5cGVzLlxuICpcbiAqIE51bWJlciBjb252ZXJzaW9uIGV4YW1wbGVzOlxuICogdG9TY2hlbWFUeXBlKCcxMCcsIFsnbnVtYmVyJywnaW50ZWdlcicsJ3N0cmluZyddKSA9IDEwIC8vIGludGVnZXJcbiAqIHRvU2NoZW1hVHlwZSgnMTAnLCBbJ251bWJlcicsJ3N0cmluZyddKSA9IDEwIC8vIG51bWJlclxuICogdG9TY2hlbWFUeXBlKCcxMCcsIFsnc3RyaW5nJ10pID0gJzEwJyAvLyBzdHJpbmdcbiAqIHRvU2NoZW1hVHlwZSgnMTAuNScsIFsnbnVtYmVyJywnaW50ZWdlcicsJ3N0cmluZyddKSA9IDEwLjUgLy8gbnVtYmVyXG4gKiB0b1NjaGVtYVR5cGUoJzEwLjUnLCBbJ2ludGVnZXInLCdzdHJpbmcnXSkgPSAnMTAuNScgLy8gc3RyaW5nXG4gKiB0b1NjaGVtYVR5cGUoJzEwLjUnLCBbJ2ludGVnZXInXSkgPSAxMCAvLyBpbnRlZ2VyXG4gKiB0b1NjaGVtYVR5cGUoMTAuNSwgWydudWxsJywnYm9vbGVhbicsJ3N0cmluZyddKSA9ICcxMC41JyAvLyBzdHJpbmdcbiAqIHRvU2NoZW1hVHlwZSgxMC41LCBbJ251bGwnLCdib29sZWFuJ10pID0gdHJ1ZSAvLyBib29sZWFuXG4gKlxuICogU3RyaW5nIGNvbnZlcnNpb24gZXhhbXBsZXM6XG4gKiB0b1NjaGVtYVR5cGUoJzEuNXgnLCBbJ2Jvb2xlYW4nLCdudW1iZXInLCdpbnRlZ2VyJywnc3RyaW5nJ10pID0gJzEuNXgnIC8vIHN0cmluZ1xuICogdG9TY2hlbWFUeXBlKCcxLjV4JywgWydib29sZWFuJywnbnVtYmVyJywnaW50ZWdlciddKSA9ICcxLjUnIC8vIG51bWJlclxuICogdG9TY2hlbWFUeXBlKCcxLjV4JywgWydib29sZWFuJywnaW50ZWdlciddKSA9ICcxJyAvLyBpbnRlZ2VyXG4gKiB0b1NjaGVtYVR5cGUoJzEuNXgnLCBbJ2Jvb2xlYW4nXSkgPSB0cnVlIC8vIGJvb2xlYW5cbiAqIHRvU2NoZW1hVHlwZSgneHl6JywgWydudW1iZXInLCdpbnRlZ2VyJywnYm9vbGVhbicsJ251bGwnXSkgPSB0cnVlIC8vIGJvb2xlYW5cbiAqIHRvU2NoZW1hVHlwZSgneHl6JywgWydudW1iZXInLCdpbnRlZ2VyJywnbnVsbCddKSA9IG51bGwgLy8gbnVsbFxuICogdG9TY2hlbWFUeXBlKCd4eXonLCBbJ251bWJlcicsJ2ludGVnZXInXSkgPSAwIC8vIG51bWJlclxuICpcbiAqIEJvb2xlYW4gY29udmVyc2lvbiBleGFtcGxlczpcbiAqIHRvU2NoZW1hVHlwZSgnMScsIFsnaW50ZWdlcicsJ251bWJlcicsJ3N0cmluZycsJ2Jvb2xlYW4nXSkgPSAxIC8vIGludGVnZXJcbiAqIHRvU2NoZW1hVHlwZSgnMScsIFsnbnVtYmVyJywnc3RyaW5nJywnYm9vbGVhbiddKSA9IDEgLy8gbnVtYmVyXG4gKiB0b1NjaGVtYVR5cGUoJzEnLCBbJ3N0cmluZycsJ2Jvb2xlYW4nXSkgPSAnMScgLy8gc3RyaW5nXG4gKiB0b1NjaGVtYVR5cGUoJzEnLCBbJ2Jvb2xlYW4nXSkgPSB0cnVlIC8vIGJvb2xlYW5cbiAqIHRvU2NoZW1hVHlwZSgndHJ1ZScsIFsnbnVtYmVyJywnc3RyaW5nJywnYm9vbGVhbiddKSA9ICd0cnVlJyAvLyBzdHJpbmdcbiAqIHRvU2NoZW1hVHlwZSgndHJ1ZScsIFsnYm9vbGVhbiddKSA9IHRydWUgLy8gYm9vbGVhblxuICogdG9TY2hlbWFUeXBlKCd0cnVlJywgWydudW1iZXInXSkgPSAwIC8vIG51bWJlclxuICogdG9TY2hlbWFUeXBlKHRydWUsIFsnbnVtYmVyJywnc3RyaW5nJywnYm9vbGVhbiddKSA9IHRydWUgLy8gYm9vbGVhblxuICogdG9TY2hlbWFUeXBlKHRydWUsIFsnbnVtYmVyJywnc3RyaW5nJ10pID0gJ3RydWUnIC8vIHN0cmluZ1xuICogdG9TY2hlbWFUeXBlKHRydWUsIFsnbnVtYmVyJ10pID0gMSAvLyBudW1iZXJcbiAqXG4gKiBAcGFyYW0gIHsgUHJpbWl0aXZlVmFsdWUgfSB2YWx1ZSAtIHZhbHVlIHRvIGNvbnZlcnRcbiAqIEBwYXJhbSAgeyBTY2hlbWFQcmltaXRpdmVUeXBlIHwgU2NoZW1hUHJpbWl0aXZlVHlwZVtdIH0gdHlwZXMgLSBhbGxvd2VkIHR5cGVzIHRvIGNvbnZlcnQgdG9cbiAqIEByZXR1cm4geyBQcmltaXRpdmVWYWx1ZSB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b1NjaGVtYVR5cGUodmFsdWUsIHR5cGVzKSB7XG4gIGlmICghaXNBcnJheSg8U2NoZW1hUHJpbWl0aXZlVHlwZT50eXBlcykpIHtcbiAgICB0eXBlcyA9IDxTY2hlbWFQcmltaXRpdmVUeXBlW10+W3R5cGVzXTtcbiAgfVxuICBpZiAoKDxTY2hlbWFQcmltaXRpdmVUeXBlW10+dHlwZXMpLmluY2x1ZGVzKCdudWxsJykgJiYgIWhhc1ZhbHVlKHZhbHVlKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmICgoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT50eXBlcykuaW5jbHVkZXMoJ2Jvb2xlYW4nKSAmJiAhaXNCb29sZWFuKHZhbHVlLCAnc3RyaWN0JykpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKCg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnaW50ZWdlcicpKSB7XG4gICAgY29uc3QgdGVzdFZhbHVlID0gdG9KYXZhU2NyaXB0VHlwZSh2YWx1ZSwgJ2ludGVnZXInKTtcbiAgICBpZiAodGVzdFZhbHVlICE9PSBudWxsKSB7IHJldHVybiArdGVzdFZhbHVlOyB9XG4gIH1cbiAgaWYgKCg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnbnVtYmVyJykpIHtcbiAgICBjb25zdCB0ZXN0VmFsdWUgPSB0b0phdmFTY3JpcHRUeXBlKHZhbHVlLCAnbnVtYmVyJyk7XG4gICAgaWYgKHRlc3RWYWx1ZSAhPT0gbnVsbCkgeyByZXR1cm4gK3Rlc3RWYWx1ZTsgfVxuICB9XG4gIGlmIChcbiAgICAoaXNTdHJpbmcodmFsdWUpIHx8IGlzTnVtYmVyKHZhbHVlLCAnc3RyaWN0JykpICYmXG4gICAgKDxTY2hlbWFQcmltaXRpdmVUeXBlW10+dHlwZXMpLmluY2x1ZGVzKCdzdHJpbmcnKVxuICApIHsgLy8gQ29udmVydCBudW1iZXIgdG8gc3RyaW5nXG4gICAgcmV0dXJuIHRvSmF2YVNjcmlwdFR5cGUodmFsdWUsICdzdHJpbmcnKTtcbiAgfVxuICBpZiAoKDxTY2hlbWFQcmltaXRpdmVUeXBlW10+dHlwZXMpLmluY2x1ZGVzKCdib29sZWFuJykgJiYgaXNCb29sZWFuKHZhbHVlKSkge1xuICAgIHJldHVybiB0b0phdmFTY3JpcHRUeXBlKHZhbHVlLCAnYm9vbGVhbicpO1xuICB9XG4gIGlmICgoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT50eXBlcykuaW5jbHVkZXMoJ3N0cmluZycpKSB7IC8vIENvbnZlcnQgbnVsbCAmIGJvb2xlYW4gdG8gc3RyaW5nXG4gICAgaWYgKHZhbHVlID09PSBudWxsKSB7IHJldHVybiAnJzsgfVxuICAgIGNvbnN0IHRlc3RWYWx1ZSA9IHRvSmF2YVNjcmlwdFR5cGUodmFsdWUsICdzdHJpbmcnKTtcbiAgICBpZiAodGVzdFZhbHVlICE9PSBudWxsKSB7IHJldHVybiB0ZXN0VmFsdWU7IH1cbiAgfVxuICBpZiAoKFxuICAgICg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnbnVtYmVyJykgfHxcbiAgICAoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT50eXBlcykuaW5jbHVkZXMoJ2ludGVnZXInKSlcbiAgKSB7XG4gICAgaWYgKHZhbHVlID09PSB0cnVlKSB7IHJldHVybiAxOyB9IC8vIENvbnZlcnQgYm9vbGVhbiAmIG51bGwgdG8gbnVtYmVyXG4gICAgaWYgKHZhbHVlID09PSBmYWxzZSB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gJycpIHsgcmV0dXJuIDA7IH1cbiAgfVxuICBpZiAoKDxTY2hlbWFQcmltaXRpdmVUeXBlW10+dHlwZXMpLmluY2x1ZGVzKCdudW1iZXInKSkgeyAvLyBDb252ZXJ0IG1peGVkIHN0cmluZyB0byBudW1iZXJcbiAgICBjb25zdCB0ZXN0VmFsdWUgPSBwYXJzZUZsb2F0KDxzdHJpbmc+dmFsdWUpO1xuICAgIGlmICghIXRlc3RWYWx1ZSkgeyByZXR1cm4gdGVzdFZhbHVlOyB9XG4gIH1cbiAgaWYgKCg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnaW50ZWdlcicpKSB7IC8vIENvbnZlcnQgc3RyaW5nIG9yIG51bWJlciB0byBpbnRlZ2VyXG4gICAgY29uc3QgdGVzdFZhbHVlID0gcGFyc2VJbnQoPHN0cmluZz52YWx1ZSwgMTApO1xuICAgIGlmICghIXRlc3RWYWx1ZSkgeyByZXR1cm4gdGVzdFZhbHVlOyB9XG4gIH1cbiAgaWYgKCg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnYm9vbGVhbicpKSB7IC8vIENvbnZlcnQgYW55dGhpbmcgdG8gYm9vbGVhblxuICAgIHJldHVybiAhIXZhbHVlO1xuICB9XG4gIGlmICgoXG4gICAgICAoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT50eXBlcykuaW5jbHVkZXMoJ251bWJlcicpIHx8XG4gICAgICAoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT50eXBlcykuaW5jbHVkZXMoJ2ludGVnZXInKVxuICAgICkgJiYgISg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnbnVsbCcpXG4gICkge1xuICAgIHJldHVybiAwOyAvLyBJZiBudWxsIG5vdCBhbGxvd2VkLCByZXR1cm4gMCBmb3Igbm9uLWNvbnZlcnRhYmxlIHZhbHVlc1xuICB9XG59XG5cbi8qKlxuICogJ2lzUHJvbWlzZScgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0gIHsgYW55IH0gb2JqZWN0XG4gKiBAcmV0dXJuIHsgYm9vbGVhbiB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb21pc2Uob2JqZWN0KTogb2JqZWN0IGlzIFByb21pc2U8YW55PiB7XG4gIHJldHVybiAhIW9iamVjdCAmJiB0eXBlb2Ygb2JqZWN0LnRoZW4gPT09ICdmdW5jdGlvbic7XG59XG5cbi8qKlxuICogJ2lzT2JzZXJ2YWJsZScgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0gIHsgYW55IH0gb2JqZWN0XG4gKiBAcmV0dXJuIHsgYm9vbGVhbiB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09ic2VydmFibGUob2JqZWN0KTogb2JqZWN0IGlzIE9ic2VydmFibGU8YW55PiB7XG4gIHJldHVybiAhIW9iamVjdCAmJiB0eXBlb2Ygb2JqZWN0LnN1YnNjcmliZSA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuLyoqXG4gKiAnX3RvUHJvbWlzZScgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0gIHsgb2JqZWN0IH0gb2JqZWN0XG4gKiBAcmV0dXJuIHsgUHJvbWlzZTxhbnk+IH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF90b1Byb21pc2Uob2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcbiAgcmV0dXJuIGlzUHJvbWlzZShvYmplY3QpID8gb2JqZWN0IDogdG9Qcm9taXNlLmNhbGwob2JqZWN0KTtcbn1cblxuLyoqXG4gKiAndG9PYnNlcnZhYmxlJyBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSAgeyBvYmplY3QgfSBvYmplY3RcbiAqIEByZXR1cm4geyBPYnNlcnZhYmxlPGFueT4gfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9PYnNlcnZhYmxlKG9iamVjdCk6IE9ic2VydmFibGU8YW55PiB7XG4gIGNvbnN0IG9ic2VydmFibGUgPSBpc1Byb21pc2Uob2JqZWN0KSA/IGZyb21Qcm9taXNlKG9iamVjdCkgOiBvYmplY3Q7XG4gIGlmIChpc09ic2VydmFibGUob2JzZXJ2YWJsZSkpIHsgcmV0dXJuIG9ic2VydmFibGU7IH1cbiAgY29uc29sZS5lcnJvcigndG9PYnNlcnZhYmxlIGVycm9yOiBFeHBlY3RlZCB2YWxpZGF0b3IgdG8gcmV0dXJuIFByb21pc2Ugb3IgT2JzZXJ2YWJsZS4nKTtcbiAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKCk7XG59XG5cbi8qKlxuICogJ2luQXJyYXknIGZ1bmN0aW9uXG4gKlxuICogU2VhcmNoZXMgYW4gYXJyYXkgZm9yIGFuIGl0ZW0sIG9yIG9uZSBvZiBhIGxpc3Qgb2YgaXRlbXMsIGFuZCByZXR1cm5zIHRydWVcbiAqIGFzIHNvb24gYXMgYSBtYXRjaCBpcyBmb3VuZCwgb3IgZmFsc2UgaWYgbm8gbWF0Y2guXG4gKlxuICogSWYgdGhlIG9wdGlvbmFsIHRoaXJkIHBhcmFtZXRlciBhbGxJbiBpcyBzZXQgdG8gVFJVRSwgYW5kIHRoZSBpdGVtIHRvIGZpbmRcbiAqIGlzIGFuIGFycmF5LCB0aGVuIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRydWUgb25seSBpZiBhbGwgZWxlbWVudHMgZnJvbSBpdGVtXG4gKiBhcmUgZm91bmQgaW4gdGhlIGFycmF5IGxpc3QsIGFuZCBmYWxzZSBpZiBhbnkgZWxlbWVudCBpcyBub3QgZm91bmQuIElmIHRoZVxuICogaXRlbSB0byBmaW5kIGlzIG5vdCBhbiBhcnJheSwgc2V0dGluZyBhbGxJbiB0byBUUlVFIGhhcyBubyBlZmZlY3QuXG4gKlxuICogQHBhcmFtICB7IGFueXxhbnlbXSB9IGl0ZW0gLSB0aGUgaXRlbSB0byBzZWFyY2ggZm9yXG4gKiBAcGFyYW0gIHsgYW55W10gfSBhcnJheSAtIHRoZSBhcnJheSB0byBzZWFyY2hcbiAqIEBwYXJhbSAgeyBib29sZWFuID0gZmFsc2UgfSBhbGxJbiAtIGlmIFRSVUUsIGFsbCBpdGVtcyBtdXN0IGJlIGluIGFycmF5XG4gKiBAcmV0dXJuIHsgYm9vbGVhbiB9IC0gdHJ1ZSBpZiBpdGVtKHMpIGluIGFycmF5LCBmYWxzZSBvdGhlcndpc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluQXJyYXkoaXRlbSwgYXJyYXksIGFsbEluID0gZmFsc2UpIHtcbiAgaWYgKCFpc0RlZmluZWQoaXRlbSkgfHwgIWlzQXJyYXkoYXJyYXkpKSB7IHJldHVybiBmYWxzZTsgfVxuICByZXR1cm4gaXNBcnJheShpdGVtKSA/XG4gICAgaXRlbVthbGxJbiA/ICdldmVyeScgOiAnc29tZSddKHN1Ykl0ZW0gPT4gYXJyYXkuaW5jbHVkZXMoc3ViSXRlbSkpIDpcbiAgICBhcnJheS5pbmNsdWRlcyhpdGVtKTtcbn1cblxuLyoqXG4gKiAneG9yJyB1dGlsaXR5IGZ1bmN0aW9uIC0gZXhjbHVzaXZlIG9yXG4gKlxuICogUmV0dXJucyB0cnVlIGlmIGV4YWN0bHkgb25lIG9mIHR3byB2YWx1ZXMgaXMgdHJ1dGh5LlxuICpcbiAqIEBwYXJhbSAgeyBhbnkgfSB2YWx1ZTEgLSBmaXJzdCB2YWx1ZSB0byBjaGVja1xuICogQHBhcmFtICB7IGFueSB9IHZhbHVlMiAtIHNlY29uZCB2YWx1ZSB0byBjaGVja1xuICogQHJldHVybiB7IGJvb2xlYW4gfSAtIHRydWUgaWYgZXhhY3RseSBvbmUgaW5wdXQgdmFsdWUgaXMgdHJ1dGh5LCBmYWxzZSBpZiBub3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHhvcih2YWx1ZTEsIHZhbHVlMikge1xuICByZXR1cm4gKCEhdmFsdWUxICYmICF2YWx1ZTIpIHx8ICghdmFsdWUxICYmICEhdmFsdWUyKTtcbn1cbiJdfQ==