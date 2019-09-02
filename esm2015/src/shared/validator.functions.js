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
        types.includes('string')) { // Convert number to string
        return toJavaScriptType(value, 'string');
    }
    if (types.includes('boolean') && isBoolean(value)) {
        return toJavaScriptType(value, 'boolean');
    }
    if (types.includes('string')) { // Convert null & boolean to string
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
    if (types.includes('number')) { // Convert mixed string to number
        const testValue = parseFloat(value);
        if (!!testValue) {
            return testValue;
        }
    }
    if (types.includes('integer')) { // Convert string or number to integer
        const testValue = parseInt(value, 10);
        if (!!testValue) {
            return testValue;
        }
    }
    if (types.includes('boolean')) { // Convert anything to boolean
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLmZ1bmN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWpzb24tc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJzcmMvc2hhcmVkL3ZhbGlkYXRvci5mdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFnRDNEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSxVQUFVLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxHQUFHLEtBQUs7SUFDcEUsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ2pFLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sR0FBRyxLQUFLO0lBQ3pFLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNqRSxDQUFDO0FBRUQ7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxVQUFVLGFBQWEsQ0FBQyxHQUFHLE9BQU87SUFDdEMsTUFBTSxZQUFZLEdBQWdCLEVBQUcsQ0FBQztJQUN0QyxLQUFLLE1BQU0sYUFBYSxJQUFJLE9BQU8sRUFBRTtRQUNuQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUMzQixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUU7Z0JBQzVDLE1BQU0sWUFBWSxHQUFH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QUFFO1FBQUUsT0FBTyxLQUFLLENBQUM7S0FBRTtJQUMxRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFFRDs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU07SUFDaEMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN4RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBWYWxpZGF0aW9uRXJyb3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMtY29tcGF0L09ic2VydmFibGUnO1xuaW1wb3J0IHsgZnJvbVByb21pc2UgfSBmcm9tICdyeGpzLWNvbXBhdC9vYnNlcnZhYmxlL2Zyb21Qcm9taXNlJztcbmltcG9ydCB7IHRvUHJvbWlzZSB9IGZyb20gJ3J4anMtY29tcGF0L29wZXJhdG9yL3RvUHJvbWlzZSc7XG5cbi8qKlxuICogVmFsaWRhdG9yIHV0aWxpdHkgZnVuY3Rpb24gbGlicmFyeTpcbiAqXG4gKiBWYWxpZGF0b3IgYW5kIGVycm9yIHV0aWxpdGllczpcbiAqICAgX2V4ZWN1dGVWYWxpZGF0b3JzLCBfZXhlY3V0ZUFzeW5jVmFsaWRhdG9ycywgX21lcmdlT2JqZWN0cywgX21lcmdlRXJyb3JzXG4gKlxuICogSW5kaXZpZHVhbCB2YWx1ZSBjaGVja2luZzpcbiAqICAgaXNEZWZpbmVkLCBoYXNWYWx1ZSwgaXNFbXB0eVxuICpcbiAqIEluZGl2aWR1YWwgdHlwZSBjaGVja2luZzpcbiAqICAgaXNTdHJpbmcsIGlzTnVtYmVyLCBpc0ludGVnZXIsIGlzQm9vbGVhbiwgaXNGdW5jdGlvbiwgaXNPYmplY3QsIGlzQXJyYXksXG4gKiAgIGlzTWFwLCBpc1NldCwgaXNQcm9taXNlLCBpc09ic2VydmFibGVcbiAqXG4gKiBNdWx0aXBsZSB0eXBlIGNoZWNraW5nIGFuZCBmaXhpbmc6XG4gKiAgIGdldFR5cGUsIGlzVHlwZSwgaXNQcmltaXRpdmUsIHRvSmF2YVNjcmlwdFR5cGUsIHRvU2NoZW1hVHlwZSxcbiAqICAgX3RvUHJvbWlzZSwgdG9PYnNlcnZhYmxlXG4gKlxuICogVXRpbGl0eSBmdW5jdGlvbnM6XG4gKiAgIGluQXJyYXksIHhvclxuICpcbiAqIFR5cGVzY3JpcHQgdHlwZXMgYW5kIGludGVyZmFjZXM6XG4gKiAgIFNjaGVtYVByaW1pdGl2ZVR5cGUsIFNjaGVtYVR5cGUsIEphdmFTY3JpcHRQcmltaXRpdmVUeXBlLCBKYXZhU2NyaXB0VHlwZSxcbiAqICAgUHJpbWl0aXZlVmFsdWUsIFBsYWluT2JqZWN0LCBJVmFsaWRhdG9yRm4sIEFzeW5jSVZhbGlkYXRvckZuXG4gKlxuICogTm90ZTogJ0lWYWxpZGF0b3JGbicgaXMgc2hvcnQgZm9yICdpbnZlcnRhYmxlIHZhbGlkYXRvciBmdW5jdGlvbicsXG4gKiAgIHdoaWNoIGlzIGEgdmFsaWRhdG9yIGZ1bmN0aW9ucyB0aGF0IGFjY2VwdHMgYW4gb3B0aW9uYWwgc2Vjb25kXG4gKiAgIGFyZ3VtZW50IHdoaWNoLCBpZiBzZXQgdG8gVFJVRSwgY2F1c2VzIHRoZSB2YWxpZGF0b3IgdG8gcGVyZm9ybVxuICogICB0aGUgb3Bwb3NpdGUgb2YgaXRzIG9yaWdpbmFsIGZ1bmN0aW9uLlxuICovXG5cbmV4cG9ydCB0eXBlIFNjaGVtYVByaW1pdGl2ZVR5cGUgPVxuICAnc3RyaW5nJyB8ICdudW1iZXInIHwgJ2ludGVnZXInIHwgJ2Jvb2xlYW4nIHwgJ251bGwnO1xuZXhwb3J0IHR5cGUgU2NoZW1hVHlwZSA9XG4gICdzdHJpbmcnIHwgJ251bWJlcicgfCAnaW50ZWdlcicgfCAnYm9vbGVhbicgfCAnbnVsbCcgfCAnb2JqZWN0JyB8ICdhcnJheSc7XG5leHBvcnQgdHlwZSBKYXZhU2NyaXB0UHJpbWl0aXZlVHlwZSA9XG4gICdzdHJpbmcnIHwgJ251bWJlcicgfCAnYm9vbGVhbicgfCAnbnVsbCcgfCAndW5kZWZpbmVkJztcbmV4cG9ydCB0eXBlIEphdmFTY3JpcHRUeXBlID1cbiAgJ3N0cmluZycgfCAnbnVtYmVyJyB8ICdib29sZWFuJyB8ICdudWxsJyB8ICd1bmRlZmluZWQnIHwgJ29iamVjdCcgfCAnYXJyYXknIHxcbiAgJ21hcCcgfCAnc2V0JyB8ICdhcmd1bWVudHMnIHwgJ2RhdGUnIHwgJ2Vycm9yJyB8ICdmdW5jdGlvbicgfCAnanNvbicgfFxuICAnbWF0aCcgfCAncmVnZXhwJzsgLy8gTm90ZTogdGhpcyBsaXN0IGlzIGluY29tcGxldGVcbmV4cG9ydCB0eXBlIFByaW1pdGl2ZVZhbHVlID0gc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQ7XG5leHBvcnQgaW50ZXJmYWNlIFBsYWluT2JqZWN0IHsgW2s6IHN0cmluZ106IGFueTsgfVxuXG5leHBvcnQgdHlwZSBJVmFsaWRhdG9yRm4gPSAoYzogQWJzdHJhY3RDb250cm9sLCBpPzogYm9vbGVhbikgPT4gUGxhaW5PYmplY3Q7XG5leHBvcnQgdHlwZSBBc3luY0lWYWxpZGF0b3JGbiA9IChjOiBBYnN0cmFjdENvbnRyb2wsIGk/OiBib29sZWFuKSA9PiBhbnk7XG5cbi8qKlxuICogJ19leGVjdXRlVmFsaWRhdG9ycycgdXRpbGl0eSBmdW5jdGlvblxuICpcbiAqIFZhbGlkYXRlcyBhIGNvbnRyb2wgYWdhaW5zdCBhbiBhcnJheSBvZiB2YWxpZGF0b3JzLCBhbmQgcmV0dXJuc1xuICogYW4gYXJyYXkgb2YgdGhlIHNhbWUgbGVuZ3RoIGNvbnRhaW5pbmcgYSBjb21iaW5hdGlvbiBvZiBlcnJvciBtZXNzYWdlc1xuICogKGZyb20gaW52YWxpZCB2YWxpZGF0b3JzKSBhbmQgbnVsbCB2YWx1ZXMgKGZyb20gdmFsaWQgdmFsaWRhdG9ycylcbiAqXG4gKiBAcGFyYW0gIHsgQWJzdHJhY3RDb250cm9sIH0gY29udHJvbCAtIGNvbnRyb2wgdG8gdmFsaWRhdGVcbiAqIEBwYXJhbSAgeyBJVmFsaWRhdG9yRm5bXSB9IHZhbGlkYXRvcnMgLSBhcnJheSBvZiB2YWxpZGF0b3JzXG4gKiBAcGFyYW0gIHsgYm9vbGVhbiB9IGludmVydCAtIGludmVydD9cbiAqIEByZXR1cm4geyBQbGFpbk9iamVjdFtdIH0gLSBhcnJheSBvZiBudWxscyBhbmQgZXJyb3IgbWVzc2FnZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2V4ZWN1dGVWYWxpZGF0b3JzKGNvbnRyb2wsIHZhbGlkYXRvcnMsIGludmVydCA9IGZhbHNlKSB7XG4gIHJldHVybiB2YWxpZGF0b3JzLm1hcCh2YWxpZGF0b3IgPT4gdmFsaWRhdG9yKGNvbnRyb2wsIGludmVydCkpO1xufVxuXG4vKipcbiAqICdfZXhlY3V0ZUFzeW5jVmFsaWRhdG9ycycgdXRpbGl0eSBmdW5jdGlvblxuICpcbiAqIFZhbGlkYXRlcyBhIGNvbnRyb2wgYWdhaW5zdCBhbiBhcnJheSBvZiBhc3luYyB2YWxpZGF0b3JzLCBhbmQgcmV0dXJuc1xuICogYW4gYXJyYXkgb2Ygb2JzZXJ2YWJlIHJlc3VsdHMgb2YgdGhlIHNhbWUgbGVuZ3RoIGNvbnRhaW5pbmcgYSBjb21iaW5hdGlvbiBvZlxuICogZXJyb3IgbWVzc2FnZXMgKGZyb20gaW52YWxpZCB2YWxpZGF0b3JzKSBhbmQgbnVsbCB2YWx1ZXMgKGZyb20gdmFsaWQgb25lcylcbiAqXG4gKiBAcGFyYW0gIHsgQWJzdHJhY3RDb250cm9sIH0gY29udHJvbCAtIGNvbnRyb2wgdG8gdmFsaWRhdGVcbiAqIEBwYXJhbSAgeyBBc3luY0lWYWxpZGF0b3JGbltdIH0gdmFsaWRhdG9ycyAtIGFycmF5IG9mIGFzeW5jIHZhbGlkYXRvcnNcbiAqIEBwYXJhbSAgeyBib29sZWFuIH0gaW52ZXJ0IC0gaW52ZXJ0P1xuICogQHJldHVybiB7IGFueVtdIH0gLSBhcnJheSBvZiBvYnNlcnZhYmxlIG51bGxzIGFuZCBlcnJvciBtZXNzYWdlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfZXhlY3V0ZUFzeW5jVmFsaWRhdG9ycyhjb250cm9sLCB2YWxpZGF0b3JzLCBpbnZlcnQgPSBmYWxzZSkge1xuICByZXR1cm4gdmFsaWRhdG9ycy5tYXAodmFsaWRhdG9yID0+IHZhbGlkYXRvcihjb250cm9sLCBpbnZlcnQpKTtcbn1cblxuLyoqXG4gKiAnX21lcmdlT2JqZWN0cycgdXRpbGl0eSBmdW5jdGlvblxuICpcbiAqIFJlY3Vyc2l2ZWx5IE1lcmdlcyBvbmUgb3IgbW9yZSBvYmplY3RzIGludG8gYSBzaW5nbGUgb2JqZWN0IHdpdGggY29tYmluZWQga2V5cy5cbiAqIEF1dG9tYXRpY2FsbHkgZGV0ZWN0cyBhbmQgaWdub3JlcyBudWxsIGFuZCB1bmRlZmluZWQgaW5wdXRzLlxuICogQWxzbyBkZXRlY3RzIGR1cGxpY2F0ZWQgYm9vbGVhbiAnbm90JyBrZXlzIGFuZCBYT1JzIHRoZWlyIHZhbHVlcy5cbiAqXG4gKiBAcGFyYW0gIHsgUGxhaW5PYmplY3RbXSB9IG9iamVjdHMgLSBvbmUgb3IgbW9yZSBvYmplY3RzIHRvIG1lcmdlXG4gKiBAcmV0dXJuIHsgUGxhaW5PYmplY3QgfSAtIG1lcmdlZCBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9tZXJnZU9iamVjdHMoLi4ub2JqZWN0cykge1xuICBjb25zdCBtZXJnZWRPYmplY3Q6IFBsYWluT2JqZWN0ID0geyB9O1xuICBmb3IgKGNvbnN0IGN1cnJlbnRPYmplY3Qgb2Ygb2JqZWN0cykge1xuICAgIGlmIChpc09iamVjdChjdXJyZW50T2JqZWN0KSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoY3VycmVudE9iamVjdCkpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gY3VycmVudE9iamVjdFtrZXldO1xuICAgICAgICBjb25zdCBtZXJnZWRWYWx1ZSA9IG1lcmdlZE9iamVjdFtrZXldO1xuICAgICAgICBtZXJnZWRPYmplY3Rba2V5XSA9ICFpc0RlZmluZWQobWVyZ2VkVmFsdWUpID8gY3VycmVudFZhbHVlIDpcbiAgICAgICAgICBrZXkgPT09ICdub3QnICYmIGlzQm9vbGVhbihtZXJnZWRWYWx1ZSwgJ3N0cmljdCcpICYmXG4gICAgICAgICAgICBpc0Jvb2xlYW4oY3VycmVudFZhbHVlLCAnc3RyaWN0JykgPyB4b3IobWVyZ2VkVmFsdWUsIGN1cnJlbnRWYWx1ZSkgOlxuICAgICAgICAgIGdldFR5cGUobWVyZ2VkVmFsdWUpID09PSAnb2JqZWN0JyAmJiBnZXRUeXBlKGN1cnJlbnRWYWx1ZSkgPT09ICdvYmplY3QnID9cbiAgICAgICAgICAgIF9tZXJnZU9iamVjdHMobWVyZ2VkVmFsdWUsIGN1cnJlbnRWYWx1ZSkgOlxuICAgICAgICAgICAgY3VycmVudFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbWVyZ2VkT2JqZWN0O1xufVxuXG4vKipcbiAqICdfbWVyZ2VFcnJvcnMnIHV0aWxpdHkgZnVuY3Rpb25cbiAqXG4gKiBNZXJnZXMgYW4gYXJyYXkgb2Ygb2JqZWN0cy5cbiAqIFVzZWQgZm9yIGNvbWJpbmluZyB0aGUgdmFsaWRhdG9yIGVycm9ycyByZXR1cm5lZCBmcm9tICdleGVjdXRlVmFsaWRhdG9ycydcbiAqXG4gKiBAcGFyYW0gIHsgUGxhaW5PYmplY3RbXSB9IGFycmF5T2ZFcnJvcnMgLSBhcnJheSBvZiBvYmplY3RzXG4gKiBAcmV0dXJuIHsgUGxhaW5PYmplY3QgfSAtIG1lcmdlZCBvYmplY3QsIG9yIG51bGwgaWYgbm8gdXNhYmxlIGlucHV0IG9iamVjdGNzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfbWVyZ2VFcnJvcnMoYXJyYXlPZkVycm9ycykge1xuICBjb25zdCBtZXJnZWRFcnJvcnMgPSBfbWVyZ2VPYmplY3RzKC4uLmFycmF5T2ZFcnJvcnMpO1xuICByZXR1cm4gaXNFbXB0eShtZXJnZWRFcnJvcnMpID8gbnVsbCA6IG1lcmdlZEVycm9ycztcbn1cblxuLyoqXG4gKiAnaXNEZWZpbmVkJyB1dGlsaXR5IGZ1bmN0aW9uXG4gKlxuICogQ2hlY2tzIGlmIGEgdmFyaWFibGUgY29udGFpbnMgYSB2YWx1ZSBvZiBhbnkgdHlwZS5cbiAqIFJldHVybnMgdHJ1ZSBldmVuIGZvciBvdGhlcndpc2UgJ2ZhbHNleScgdmFsdWVzIG9mIDAsICcnLCBhbmQgZmFsc2UuXG4gKlxuICogQHBhcmFtICB7IGFueSB9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIGNoZWNrXG4gKiBAcmV0dXJuIHsgYm9vbGVhbiB9IC0gZmFsc2UgaWYgdW5kZWZpbmVkIG9yIG51bGwsIG90aGVyd2lzZSB0cnVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0RlZmluZWQodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGw7XG59XG5cbi8qKlxuICogJ2hhc1ZhbHVlJyB1dGlsaXR5IGZ1bmN0aW9uXG4gKlxuICogQ2hlY2tzIGlmIGEgdmFyaWFibGUgY29udGFpbnMgYSB2YWx1ZS5cbiAqIFJldHVycyBmYWxzZSBmb3IgbnVsbCwgdW5kZWZpbmVkLCBvciBhIHplcm8tbGVuZ3RoIHN0cm5nLCAnJyxcbiAqIG90aGVyd2lzZSByZXR1cm5zIHRydWUuXG4gKiAoU3RyaWN0ZXIgdGhhbiAnaXNEZWZpbmVkJyBiZWNhdXNlIGl0IGFsc28gcmV0dXJucyBmYWxzZSBmb3IgJycsXG4gKiB0aG91Z2ggaXQgc3RpbCByZXR1cm5zIHRydWUgZm9yIG90aGVyd2lzZSAnZmFsc2V5JyB2YWx1ZXMgMCBhbmQgZmFsc2UuKVxuICpcbiAqIEBwYXJhbSAgeyBhbnkgfSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBjaGVja1xuICogQHJldHVybiB7IGJvb2xlYW4gfSAtIGZhbHNlIGlmIHVuZGVmaW5lZCwgbnVsbCwgb3IgJycsIG90aGVyd2lzZSB0cnVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNWYWx1ZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gJyc7XG59XG5cbi8qKlxuICogJ2lzRW1wdHknIHV0aWxpdHkgZnVuY3Rpb25cbiAqXG4gKiBTaW1pbGFyIHRvICFoYXNWYWx1ZSwgYnV0IGFsc28gcmV0dXJucyB0cnVlIGZvciBlbXB0eSBhcnJheXMgYW5kIG9iamVjdHMuXG4gKlxuICogQHBhcmFtICB7IGFueSB9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIGNoZWNrXG4gKiBAcmV0dXJuIHsgYm9vbGVhbiB9IC0gZmFsc2UgaWYgdW5kZWZpbmVkLCBudWxsLCBvciAnJywgb3RoZXJ3aXNlIHRydWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWUpIHtcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7IHJldHVybiAhdmFsdWUubGVuZ3RoOyB9XG4gIGlmIChpc09iamVjdCh2YWx1ZSkpIHsgcmV0dXJuICFPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoOyB9XG4gIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSAnJztcbn1cblxuLyoqXG4gKiAnaXNTdHJpbmcnIHV0aWxpdHkgZnVuY3Rpb25cbiAqXG4gKiBDaGVja3MgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0gIHsgYW55IH0gdmFsdWUgLSB0aGUgdmFsdWUgdG8gY2hlY2tcbiAqIEByZXR1cm4geyBib29sZWFuIH0gLSB0cnVlIGlmIHN0cmluZywgZmFsc2UgaWYgbm90XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiAnaXNOdW1iZXInIHV0aWxpdHkgZnVuY3Rpb25cbiAqXG4gKiBDaGVja3MgaWYgYSB2YWx1ZSBpcyBhIHJlZ3VsYXIgbnVtYmVyLCBudW1lcmljIHN0cmluZywgb3IgSmF2YVNjcmlwdCBEYXRlLlxuICpcbiAqIEBwYXJhbSAgeyBhbnkgfSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBjaGVja1xuICogQHBhcmFtICB7IGFueSA9IGZhbHNlIH0gc3RyaWN0IC0gaWYgdHJ1dGh5LCBhbHNvIGNoZWNrcyBKYXZhU2NyaXB0IHR5b2VcbiAqIEByZXR1cm4geyBib29sZWFuIH0gLSB0cnVlIGlmIG51bWJlciwgZmFsc2UgaWYgbm90XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZSwgc3RyaWN0OiBhbnkgPSBmYWxzZSkge1xuICBpZiAoc3RyaWN0ICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIHJldHVybiAhaXNOYU4odmFsdWUpICYmIHZhbHVlICE9PSB2YWx1ZSAvIDA7XG59XG5cbi8qKlxuICogJ2lzSW50ZWdlcicgdXRpbGl0eSBmdW5jdGlvblxuICpcbiAqIENoZWNrcyBpZiBhIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKlxuICogQHBhcmFtICB7IGFueSB9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIGNoZWNrXG4gKiBAcGFyYW0gIHsgYW55ID0gZmFsc2UgfSBzdHJpY3QgLSBpZiB0cnV0aHksIGFsc28gY2hlY2tzIEphdmFTY3JpcHQgdHlvZVxuICogQHJldHVybiB7Ym9vbGVhbiB9IC0gdHJ1ZSBpZiBudW1iZXIsIGZhbHNlIGlmIG5vdFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlLCBzdHJpY3Q6IGFueSA9IGZhbHNlKSB7XG4gIGlmIChzdHJpY3QgJiYgdHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykgeyByZXR1cm4gZmFsc2U7IH1cbiAgcmV0dXJuICFpc05hTih2YWx1ZSkgJiYgIHZhbHVlICE9PSB2YWx1ZSAvIDAgJiYgdmFsdWUgJSAxID09PSAwO1xufVxuXG4vKipcbiAqICdpc0Jvb2xlYW4nIHV0aWxpdHkgZnVuY3Rpb25cbiAqXG4gKiBDaGVja3MgaWYgYSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKlxuICogQHBhcmFtICB7IGFueSB9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIGNoZWNrXG4gKiBAcGFyYW0gIHsgYW55ID0gbnVsbCB9IG9wdGlvbiAtIGlmICdzdHJpY3QnLCBhbHNvIGNoZWNrcyBKYXZhU2NyaXB0IHR5cGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgVFJVRSBvciBGQUxTRSwgY2hlY2tzIG9ubHkgZm9yIHRoYXQgdmFsdWVcbiAqIEByZXR1cm4geyBib29sZWFuIH0gLSB0cnVlIGlmIGJvb2xlYW4sIGZhbHNlIGlmIG5vdFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlLCBvcHRpb246IGFueSA9IG51bGwpIHtcbiAgaWYgKG9wdGlvbiA9PT0gJ3N0cmljdCcpIHsgcmV0dXJuIHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSBmYWxzZTsgfVxuICBpZiAob3B0aW9uID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSAxIHx8IHZhbHVlID09PSAndHJ1ZScgfHwgdmFsdWUgPT09ICcxJztcbiAgfVxuICBpZiAob3B0aW9uID09PSBmYWxzZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT09IDAgfHwgdmFsdWUgPT09ICdmYWxzZScgfHwgdmFsdWUgPT09ICcwJztcbiAgfVxuICByZXR1cm4gdmFsdWUgPT09IHRydWUgfHwgdmFsdWUgPT09IDEgfHwgdmFsdWUgPT09ICd0cnVlJyB8fCB2YWx1ZSA9PT0gJzEnIHx8XG4gICAgdmFsdWUgPT09IGZhbHNlIHx8IHZhbHVlID09PSAwIHx8IHZhbHVlID09PSAnZmFsc2UnIHx8IHZhbHVlID09PSAnMCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uKGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIGl0ZW0gPT09ICdmdW5jdGlvbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdChpdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIGl0ZW0gIT09IG51bGwgJiYgdHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnICYmXG4gICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZW0pID09PSAnW29iamVjdCBPYmplY3RdJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXkoaXRlbTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGl0ZW0pIHx8XG4gICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZW0pID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRlKGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnICYmXG4gICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZW0pID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc01hcChpdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiBpdGVtID09PSAnb2JqZWN0JyAmJlxuICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpdGVtKSA9PT0gJ1tvYmplY3QgTWFwXSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NldChpdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiBpdGVtID09PSAnb2JqZWN0JyAmJlxuICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpdGVtKSA9PT0gJ1tvYmplY3QgU2V0XSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N5bWJvbChpdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiBpdGVtID09PSAnc3ltYm9sJztcbn1cblxuLyoqXG4gKiAnZ2V0VHlwZScgZnVuY3Rpb25cbiAqXG4gKiBEZXRlY3RzIHRoZSBKU09OIFNjaGVtYSBUeXBlIG9mIGEgdmFsdWUuXG4gKiBCeSBkZWZhdWx0LCBkZXRlY3RzIG51bWJlcnMgYW5kIGludGVnZXJzIGV2ZW4gaWYgZm9ybWF0dGVkIGFzIHN0cmluZ3MuXG4gKiAoU28gYWxsIGludGVnZXJzIGFyZSBhbHNvIG51bWJlcnMsIGFuZCBhbnkgbnVtYmVyIG1heSBhbHNvIGJlIGEgc3RyaW5nLilcbiAqIEhvd2V2ZXIsIGl0IG9ubHkgZGV0ZWN0cyB0cnVlIGJvb2xlYW4gdmFsdWVzICh0byBkZXRlY3QgYm9vbGVhbiB2YWx1ZXNcbiAqIGluIG5vbi1ib29sZWFuIGZvcm1hdHMsIHVzZSBpc0Jvb2xlYW4oKSBpbnN0ZWFkKS5cbiAqXG4gKiBJZiBwYXNzZWQgYSBzZWNvbmQgb3B0aW9uYWwgcGFyYW1ldGVyIG9mICdzdHJpY3QnLCBpdCB3aWxsIG9ubHkgZGV0ZWN0XG4gKiBudW1iZXJzIGFuZCBpbnRlZ2VycyBpZiB0aGV5IGFyZSBmb3JtYXR0ZWQgYXMgSmF2YVNjcmlwdCBudW1iZXJzLlxuICpcbiAqIEV4YW1wbGVzOlxuICogZ2V0VHlwZSgnMTAuNScpID0gJ251bWJlcidcbiAqIGdldFR5cGUoMTAuNSkgPSAnbnVtYmVyJ1xuICogZ2V0VHlwZSgnMTAnKSA9ICdpbnRlZ2VyJ1xuICogZ2V0VHlwZSgxMCkgPSAnaW50ZWdlcidcbiAqIGdldFR5cGUoJ3RydWUnKSA9ICdzdHJpbmcnXG4gKiBnZXRUeXBlKHRydWUpID0gJ2Jvb2xlYW4nXG4gKiBnZXRUeXBlKG51bGwpID0gJ251bGwnXG4gKiBnZXRUeXBlKHsgfSkgPSAnb2JqZWN0J1xuICogZ2V0VHlwZShbXSkgPSAnYXJyYXknXG4gKlxuICogZ2V0VHlwZSgnMTAuNScsICdzdHJpY3QnKSA9ICdzdHJpbmcnXG4gKiBnZXRUeXBlKDEwLjUsICdzdHJpY3QnKSA9ICdudW1iZXInXG4gKiBnZXRUeXBlKCcxMCcsICdzdHJpY3QnKSA9ICdzdHJpbmcnXG4gKiBnZXRUeXBlKDEwLCAnc3RyaWN0JykgPSAnaW50ZWdlcidcbiAqIGdldFR5cGUoJ3RydWUnLCAnc3RyaWN0JykgPSAnc3RyaW5nJ1xuICogZ2V0VHlwZSh0cnVlLCAnc3RyaWN0JykgPSAnYm9vbGVhbidcbiAqXG4gKiBAcGFyYW0gIHsgYW55IH0gdmFsdWUgLSB2YWx1ZSB0byBjaGVja1xuICogQHBhcmFtICB7IGFueSA9IGZhbHNlIH0gc3RyaWN0IC0gaWYgdHJ1dGh5LCBhbHNvIGNoZWNrcyBKYXZhU2NyaXB0IHR5b2VcbiAqIEByZXR1cm4geyBTY2hlbWFUeXBlIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFR5cGUodmFsdWUsIHN0cmljdDogYW55ID0gZmFsc2UpIHtcbiAgaWYgKCFpc0RlZmluZWQodmFsdWUpKSB7IHJldHVybiAnbnVsbCc7IH1cbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7IHJldHVybiAnYXJyYXknOyB9XG4gIGlmIChpc09iamVjdCh2YWx1ZSkpIHsgcmV0dXJuICdvYmplY3QnOyB9XG4gIGlmIChpc0Jvb2xlYW4odmFsdWUsICdzdHJpY3QnKSkgeyByZXR1cm4gJ2Jvb2xlYW4nOyB9XG4gIGlmIChpc0ludGVnZXIodmFsdWUsIHN0cmljdCkpIHsgcmV0dXJuICdpbnRlZ2VyJzsgfVxuICBpZiAoaXNOdW1iZXIodmFsdWUsIHN0cmljdCkpIHsgcmV0dXJuICdudW1iZXInOyB9XG4gIGlmIChpc1N0cmluZyh2YWx1ZSkgfHwgKCFzdHJpY3QgJiYgaXNEYXRlKHZhbHVlKSkpIHsgcmV0dXJuICdzdHJpbmcnOyB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqICdpc1R5cGUnIGZ1bmN0aW9uXG4gKlxuICogQ2hlY2tzIHdldGhlciBhbiBpbnB1dCAocHJvYmFibHkgc3RyaW5nKSB2YWx1ZSBjb250YWlucyBkYXRhIG9mXG4gKiBhIHNwZWNpZmllZCBKU09OIFNjaGVtYSB0eXBlXG4gKlxuICogQHBhcmFtICB7IFByaW1pdGl2ZVZhbHVlIH0gdmFsdWUgLSB2YWx1ZSB0byBjaGVja1xuICogQHBhcmFtICB7IFNjaGVtYVByaW1pdGl2ZVR5cGUgfSB0eXBlIC0gdHlwZSB0byBjaGVja1xuICogQHJldHVybiB7IGJvb2xlYW4gfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNUeXBlKHZhbHVlLCB0eXBlKSB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICByZXR1cm4gaXNTdHJpbmcodmFsdWUpIHx8IGlzRGF0ZSh2YWx1ZSk7XG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIHJldHVybiBpc051bWJlcih2YWx1ZSk7XG4gICAgY2FzZSAnaW50ZWdlcic6XG4gICAgICByZXR1cm4gaXNJbnRlZ2VyKHZhbHVlKTtcbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiBpc0Jvb2xlYW4odmFsdWUpO1xuICAgIGNhc2UgJ251bGwnOlxuICAgICAgcmV0dXJuICFoYXNWYWx1ZSh2YWx1ZSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIGNvbnNvbGUuZXJyb3IoYGlzVHlwZSBlcnJvcjogXCIke3R5cGV9XCIgaXMgbm90IGEgcmVjb2duaXplZCB0eXBlLmApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLyoqXG4gKiAnaXNQcmltaXRpdmUnIGZ1bmN0aW9uXG4gKlxuICogQ2hlY2tzIHdldGhlciBhbiBpbnB1dCB2YWx1ZSBpcyBhIEphdmFTY3JpcHQgcHJpbWl0aXZlIHR5cGU6XG4gKiBzdHJpbmcsIG51bWJlciwgYm9vbGVhbiwgb3IgbnVsbC5cbiAqXG4gKiBAcGFyYW0gIHsgYW55IH0gdmFsdWUgLSB2YWx1ZSB0byBjaGVja1xuICogQHJldHVybiB7IGJvb2xlYW4gfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNQcmltaXRpdmUodmFsdWUpIHtcbiAgcmV0dXJuIChpc1N0cmluZyh2YWx1ZSkgfHwgaXNOdW1iZXIodmFsdWUpIHx8XG4gICAgaXNCb29sZWFuKHZhbHVlLCAnc3RyaWN0JykgfHwgdmFsdWUgPT09IG51bGwpO1xufVxuXG4vKipcbiAqICd0b0phdmFTY3JpcHRUeXBlJyBmdW5jdGlvblxuICpcbiAqIENvbnZlcnRzIGFuIGlucHV0IChwcm9iYWJseSBzdHJpbmcpIHZhbHVlIHRvIGEgSmF2YVNjcmlwdCBwcmltaXRpdmUgdHlwZSAtXG4gKiAnc3RyaW5nJywgJ251bWJlcicsICdib29sZWFuJywgb3IgJ251bGwnIC0gYmVmb3JlIHN0b3JpbmcgaW4gYSBKU09OIG9iamVjdC5cbiAqXG4gKiBEb2VzIG5vdCBjb2VyY2UgdmFsdWVzIChvdGhlciB0aGFuIG51bGwpLCBhbmQgb25seSBjb252ZXJ0cyB0aGUgdHlwZXNcbiAqIG9mIHZhbHVlcyB0aGF0IHdvdWxkIG90aGVyd2lzZSBiZSB2YWxpZC5cbiAqXG4gKiBJZiB0aGUgb3B0aW9uYWwgdGhpcmQgcGFyYW1ldGVyICdzdHJpY3RJbnRlZ2VycycgaXMgVFJVRSwgYW5kIHRoZVxuICogSlNPTiBTY2hlbWEgdHlwZSAnaW50ZWdlcicgaXMgc3BlY2lmaWVkLCBpdCBhbHNvIHZlcmlmaWVzIHRoZSBpbnB1dCB2YWx1ZVxuICogaXMgYW4gaW50ZWdlciBhbmQsIGlmIGl0IGlzLCByZXR1cm5zIGl0IGFzIGEgSmF2ZVNjcmlwdCBudW1iZXIuXG4gKiBJZiAnc3RyaWN0SW50ZWdlcnMnIGlzIEZBTFNFIChvciBub3Qgc2V0KSB0aGUgdHlwZSAnaW50ZWdlcicgaXMgdHJlYXRlZFxuICogZXhhY3RseSB0aGUgc2FtZSBhcyAnbnVtYmVyJywgYW5kIGFsbG93cyBkZWNpbWFscy5cbiAqXG4gKiBWYWxpZCBFeGFtcGxlczpcbiAqIHRvSmF2YVNjcmlwdFR5cGUoJzEwJywgICAnbnVtYmVyJyApID0gMTAgICAvLyAnMTAnICAgaXMgYSBudW1iZXJcbiAqIHRvSmF2YVNjcmlwdFR5cGUoJzEwJywgICAnaW50ZWdlcicpID0gMTAgICAvLyAnMTAnICAgaXMgYWxzbyBhbiBpbnRlZ2VyXG4gKiB0b0phdmFTY3JpcHRUeXBlKCAxMCwgICAgJ2ludGVnZXInKSA9IDEwICAgLy8gIDEwICAgIGlzIHN0aWxsIGFuIGludGVnZXJcbiAqIHRvSmF2YVNjcmlwdFR5cGUoIDEwLCAgICAnc3RyaW5nJyApID0gJzEwJyAvLyAgMTAgICAgY2FuIGJlIG1hZGUgaW50byBhIHN0cmluZ1xuICogdG9KYXZhU2NyaXB0VHlwZSgnMTAuNScsICdudW1iZXInICkgPSAxMC41IC8vICcxMC41JyBpcyBhIG51bWJlclxuICpcbiAqIEludmFsaWQgRXhhbXBsZXM6XG4gKiB0b0phdmFTY3JpcHRUeXBlKCcxMC41JywgJ2ludGVnZXInKSA9IG51bGwgLy8gJzEwLjUnIGlzIG5vdCBhbiBpbnRlZ2VyXG4gKiB0b0phdmFTY3JpcHRUeXBlKCAxMC41LCAgJ2ludGVnZXInKSA9IG51bGwgLy8gIDEwLjUgIGlzIHN0aWxsIG5vdCBhbiBpbnRlZ2VyXG4gKlxuICogQHBhcmFtICB7IFByaW1pdGl2ZVZhbHVlIH0gdmFsdWUgLSB2YWx1ZSB0byBjb252ZXJ0XG4gKiBAcGFyYW0gIHsgU2NoZW1hUHJpbWl0aXZlVHlwZSB8IFNjaGVtYVByaW1pdGl2ZVR5cGVbXSB9IHR5cGVzIC0gdHlwZXMgdG8gY29udmVydCB0b1xuICogQHBhcmFtICB7IGJvb2xlYW4gPSBmYWxzZSB9IHN0cmljdEludGVnZXJzIC0gaWYgRkFMU0UsIHRyZWF0IGludGVnZXJzIGFzIG51bWJlcnNcbiAqIEByZXR1cm4geyBQcmltaXRpdmVWYWx1ZSB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0phdmFTY3JpcHRUeXBlKHZhbHVlLCB0eXBlcywgc3RyaWN0SW50ZWdlcnMgPSB0cnVlKSAge1xuICBpZiAoIWlzRGVmaW5lZCh2YWx1ZSkpIHsgcmV0dXJuIG51bGw7IH1cbiAgaWYgKGlzU3RyaW5nKHR5cGVzKSkgeyB0eXBlcyA9IFt0eXBlc107IH1cbiAgaWYgKHN0cmljdEludGVnZXJzICYmIGluQXJyYXkoJ2ludGVnZXInLCB0eXBlcykpIHtcbiAgICBpZiAoaXNJbnRlZ2VyKHZhbHVlLCAnc3RyaWN0JykpIHsgcmV0dXJuIHZhbHVlOyB9XG4gICAgaWYgKGlzSW50ZWdlcih2YWx1ZSkpIHsgcmV0dXJuIHBhcnNlSW50KHZhbHVlLCAxMCk7IH1cbiAgfVxuICBpZiAoaW5BcnJheSgnbnVtYmVyJywgdHlwZXMpIHx8ICghc3RyaWN0SW50ZWdlcnMgJiYgaW5BcnJheSgnaW50ZWdlcicsIHR5cGVzKSkpIHtcbiAgICBpZiAoaXNOdW1iZXIodmFsdWUsICdzdHJpY3QnKSkgeyByZXR1cm4gdmFsdWU7IH1cbiAgICBpZiAoaXNOdW1iZXIodmFsdWUpKSB7IHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKTsgfVxuICB9XG4gIGlmIChpbkFycmF5KCdzdHJpbmcnLCB0eXBlcykpIHtcbiAgICBpZiAoaXNTdHJpbmcodmFsdWUpKSB7IHJldHVybiB2YWx1ZTsgfVxuICAgIC8vIElmIHZhbHVlIGlzIGEgZGF0ZSwgYW5kIHR5cGVzIGluY2x1ZGVzICdzdHJpbmcnLFxuICAgIC8vIGNvbnZlcnQgdGhlIGRhdGUgdG8gYSBzdHJpbmdcbiAgICBpZiAoaXNEYXRlKHZhbHVlKSkgeyByZXR1cm4gdmFsdWUudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCk7IH1cbiAgICBpZiAoaXNOdW1iZXIodmFsdWUpKSB7IHJldHVybiB2YWx1ZS50b1N0cmluZygpOyB9XG4gIH1cbiAgLy8gSWYgdmFsdWUgaXMgYSBkYXRlLCBhbmQgdHlwZXMgaW5jbHVkZXMgJ2ludGVnZXInIG9yICdudW1iZXInLFxuICAvLyBidXQgbm90ICdzdHJpbmcnLCBjb252ZXJ0IHRoZSBkYXRlIHRvIGEgbnVtYmVyXG4gIGlmIChpc0RhdGUodmFsdWUpICYmIChpbkFycmF5KCdpbnRlZ2VyJywgdHlwZXMpIHx8IGluQXJyYXkoJ251bWJlcicsIHR5cGVzKSkpIHtcbiAgICByZXR1cm4gdmFsdWUuZ2V0VGltZSgpO1xuICB9XG4gIGlmIChpbkFycmF5KCdib29sZWFuJywgdHlwZXMpKSB7XG4gICAgaWYgKGlzQm9vbGVhbih2YWx1ZSwgdHJ1ZSkpIHsgcmV0dXJuIHRydWU7IH1cbiAgICBpZiAoaXNCb29sZWFuKHZhbHVlLCBmYWxzZSkpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogJ3RvU2NoZW1hVHlwZScgZnVuY3Rpb25cbiAqXG4gKiBDb252ZXJ0cyBhbiBpbnB1dCAocHJvYmFibHkgc3RyaW5nKSB2YWx1ZSB0byB0aGUgXCJiZXN0XCIgSmF2YVNjcmlwdFxuICogZXF1aXZhbGVudCBhdmFpbGFibGUgZnJvbSBhbiBhbGxvd2VkIGxpc3Qgb2YgSlNPTiBTY2hlbWEgdHlwZXMsIHdoaWNoIG1heVxuICogY29udGFpbiAnc3RyaW5nJywgJ251bWJlcicsICdpbnRlZ2VyJywgJ2Jvb2xlYW4nLCBhbmQvb3IgJ251bGwnLlxuICogSWYgbmVjc3NhcnksIGl0IGRvZXMgcHJvZ3Jlc3NpdmVseSBhZ3Jlc3NpdmUgdHlwZSBjb2Vyc2lvbi5cbiAqIEl0IHdpbGwgbm90IHJldHVybiBudWxsIHVubGVzcyBudWxsIGlzIGluIHRoZSBsaXN0IG9mIGFsbG93ZWQgdHlwZXMuXG4gKlxuICogTnVtYmVyIGNvbnZlcnNpb24gZXhhbXBsZXM6XG4gKiB0b1NjaGVtYVR5cGUoJzEwJywgWydudW1iZXInLCdpbnRlZ2VyJywnc3RyaW5nJ10pID0gMTAgLy8gaW50ZWdlclxuICogdG9TY2hlbWFUeXBlKCcxMCcsIFsnbnVtYmVyJywnc3RyaW5nJ10pID0gMTAgLy8gbnVtYmVyXG4gKiB0b1NjaGVtYVR5cGUoJzEwJywgWydzdHJpbmcnXSkgPSAnMTAnIC8vIHN0cmluZ1xuICogdG9TY2hlbWFUeXBlKCcxMC41JywgWydudW1iZXInLCdpbnRlZ2VyJywnc3RyaW5nJ10pID0gMTAuNSAvLyBudW1iZXJcbiAqIHRvU2NoZW1hVHlwZSgnMTAuNScsIFsnaW50ZWdlcicsJ3N0cmluZyddKSA9ICcxMC41JyAvLyBzdHJpbmdcbiAqIHRvU2NoZW1hVHlwZSgnMTAuNScsIFsnaW50ZWdlciddKSA9IDEwIC8vIGludGVnZXJcbiAqIHRvU2NoZW1hVHlwZSgxMC41LCBbJ251bGwnLCdib29sZWFuJywnc3RyaW5nJ10pID0gJzEwLjUnIC8vIHN0cmluZ1xuICogdG9TY2hlbWFUeXBlKDEwLjUsIFsnbnVsbCcsJ2Jvb2xlYW4nXSkgPSB0cnVlIC8vIGJvb2xlYW5cbiAqXG4gKiBTdHJpbmcgY29udmVyc2lvbiBleGFtcGxlczpcbiAqIHRvU2NoZW1hVHlwZSgnMS41eCcsIFsnYm9vbGVhbicsJ251bWJlcicsJ2ludGVnZXInLCdzdHJpbmcnXSkgPSAnMS41eCcgLy8gc3RyaW5nXG4gKiB0b1NjaGVtYVR5cGUoJzEuNXgnLCBbJ2Jvb2xlYW4nLCdudW1iZXInLCdpbnRlZ2VyJ10pID0gJzEuNScgLy8gbnVtYmVyXG4gKiB0b1NjaGVtYVR5cGUoJzEuNXgnLCBbJ2Jvb2xlYW4nLCdpbnRlZ2VyJ10pID0gJzEnIC8vIGludGVnZXJcbiAqIHRvU2NoZW1hVHlwZSgnMS41eCcsIFsnYm9vbGVhbiddKSA9IHRydWUgLy8gYm9vbGVhblxuICogdG9TY2hlbWFUeXBlKCd4eXonLCBbJ251bWJlcicsJ2ludGVnZXInLCdib29sZWFuJywnbnVsbCddKSA9IHRydWUgLy8gYm9vbGVhblxuICogdG9TY2hlbWFUeXBlKCd4eXonLCBbJ251bWJlcicsJ2ludGVnZXInLCdudWxsJ10pID0gbnVsbCAvLyBudWxsXG4gKiB0b1NjaGVtYVR5cGUoJ3h5eicsIFsnbnVtYmVyJywnaW50ZWdlciddKSA9IDAgLy8gbnVtYmVyXG4gKlxuICogQm9vbGVhbiBjb252ZXJzaW9uIGV4YW1wbGVzOlxuICogdG9TY2hlbWFUeXBlKCcxJywgWydpbnRlZ2VyJywnbnVtYmVyJywnc3RyaW5nJywnYm9vbGVhbiddKSA9IDEgLy8gaW50ZWdlclxuICogdG9TY2hlbWFUeXBlKCcxJywgWydudW1iZXInLCdzdHJpbmcnLCdib29sZWFuJ10pID0gMSAvLyBudW1iZXJcbiAqIHRvU2NoZW1hVHlwZSgnMScsIFsnc3RyaW5nJywnYm9vbGVhbiddKSA9ICcxJyAvLyBzdHJpbmdcbiAqIHRvU2NoZW1hVHlwZSgnMScsIFsnYm9vbGVhbiddKSA9IHRydWUgLy8gYm9vbGVhblxuICogdG9TY2hlbWFUeXBlKCd0cnVlJywgWydudW1iZXInLCdzdHJpbmcnLCdib29sZWFuJ10pID0gJ3RydWUnIC8vIHN0cmluZ1xuICogdG9TY2hlbWFUeXBlKCd0cnVlJywgWydib29sZWFuJ10pID0gdHJ1ZSAvLyBib29sZWFuXG4gKiB0b1NjaGVtYVR5cGUoJ3RydWUnLCBbJ251bWJlciddKSA9IDAgLy8gbnVtYmVyXG4gKiB0b1NjaGVtYVR5cGUodHJ1ZSwgWydudW1iZXInLCdzdHJpbmcnLCdib29sZWFuJ10pID0gdHJ1ZSAvLyBib29sZWFuXG4gKiB0b1NjaGVtYVR5cGUodHJ1ZSwgWydudW1iZXInLCdzdHJpbmcnXSkgPSAndHJ1ZScgLy8gc3RyaW5nXG4gKiB0b1NjaGVtYVR5cGUodHJ1ZSwgWydudW1iZXInXSkgPSAxIC8vIG51bWJlclxuICpcbiAqIEBwYXJhbSAgeyBQcmltaXRpdmVWYWx1ZSB9IHZhbHVlIC0gdmFsdWUgdG8gY29udmVydFxuICogQHBhcmFtICB7IFNjaGVtYVByaW1pdGl2ZVR5cGUgfCBTY2hlbWFQcmltaXRpdmVUeXBlW10gfSB0eXBlcyAtIGFsbG93ZWQgdHlwZXMgdG8gY29udmVydCB0b1xuICogQHJldHVybiB7IFByaW1pdGl2ZVZhbHVlIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvU2NoZW1hVHlwZSh2YWx1ZSwgdHlwZXMpIHtcbiAgaWYgKCFpc0FycmF5KDxTY2hlbWFQcmltaXRpdmVUeXBlPnR5cGVzKSkge1xuICAgIHR5cGVzID0gPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT5bdHlwZXNdO1xuICB9XG4gIGlmICgoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT50eXBlcykuaW5jbHVkZXMoJ251bGwnKSAmJiAhaGFzVmFsdWUodmFsdWUpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKCg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnYm9vbGVhbicpICYmICFpc0Jvb2xlYW4odmFsdWUsICdzdHJpY3QnKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoKDxTY2hlbWFQcmltaXRpdmVUeXBlW10+dHlwZXMpLmluY2x1ZGVzKCdpbnRlZ2VyJykpIHtcbiAgICBjb25zdCB0ZXN0VmFsdWUgPSB0b0phdmFTY3JpcHRUeXBlKHZhbHVlLCAnaW50ZWdlcicpO1xuICAgIGlmICh0ZXN0VmFsdWUgIT09IG51bGwpIHsgcmV0dXJuICt0ZXN0VmFsdWU7IH1cbiAgfVxuICBpZiAoKDxTY2hlbWFQcmltaXRpdmVUeXBlW10+dHlwZXMpLmluY2x1ZGVzKCdudW1iZXInKSkge1xuICAgIGNvbnN0IHRlc3RWYWx1ZSA9IHRvSmF2YVNjcmlwdFR5cGUodmFsdWUsICdudW1iZXInKTtcbiAgICBpZiAodGVzdFZhbHVlICE9PSBudWxsKSB7IHJldHVybiArdGVzdFZhbHVlOyB9XG4gIH1cbiAgaWYgKFxuICAgIChpc1N0cmluZyh2YWx1ZSkgfHwgaXNOdW1iZXIodmFsdWUsICdzdHJpY3QnKSkgJiZcbiAgICAoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT50eXBlcykuaW5jbHVkZXMoJ3N0cmluZycpXG4gICkgeyAvLyBDb252ZXJ0IG51bWJlciB0byBzdHJpbmdcbiAgICByZXR1cm4gdG9KYXZhU2NyaXB0VHlwZSh2YWx1ZSwgJ3N0cmluZycpO1xuICB9XG4gIGlmICgoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT50eXBlcykuaW5jbHVkZXMoJ2Jvb2xlYW4nKSAmJiBpc0Jvb2xlYW4odmFsdWUpKSB7XG4gICAgcmV0dXJuIHRvSmF2YVNjcmlwdFR5cGUodmFsdWUsICdib29sZWFuJyk7XG4gIH1cbiAgaWYgKCg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnc3RyaW5nJykpIHsgLy8gQ29udmVydCBudWxsICYgYm9vbGVhbiB0byBzdHJpbmdcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHsgcmV0dXJuICcnOyB9XG4gICAgY29uc3QgdGVzdFZhbHVlID0gdG9KYXZhU2NyaXB0VHlwZSh2YWx1ZSwgJ3N0cmluZycpO1xuICAgIGlmICh0ZXN0VmFsdWUgIT09IG51bGwpIHsgcmV0dXJuIHRlc3RWYWx1ZTsgfVxuICB9XG4gIGlmICgoXG4gICAgKDxTY2hlbWFQcmltaXRpdmVUeXBlW10+dHlwZXMpLmluY2x1ZGVzKCdudW1iZXInKSB8fFxuICAgICg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnaW50ZWdlcicpKVxuICApIHtcbiAgICBpZiAodmFsdWUgPT09IHRydWUpIHsgcmV0dXJuIDE7IH0gLy8gQ29udmVydCBib29sZWFuICYgbnVsbCB0byBudW1iZXJcbiAgICBpZiAodmFsdWUgPT09IGZhbHNlIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSAnJykgeyByZXR1cm4gMDsgfVxuICB9XG4gIGlmICgoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT50eXBlcykuaW5jbHVkZXMoJ251bWJlcicpKSB7IC8vIENvbnZlcnQgbWl4ZWQgc3RyaW5nIHRvIG51bWJlclxuICAgIGNvbnN0IHRlc3RWYWx1ZSA9IHBhcnNlRmxvYXQoPHN0cmluZz52YWx1ZSk7XG4gICAgaWYgKCEhdGVzdFZhbHVlKSB7IHJldHVybiB0ZXN0VmFsdWU7IH1cbiAgfVxuICBpZiAoKDxTY2hlbWFQcmltaXRpdmVUeXBlW10+dHlwZXMpLmluY2x1ZGVzKCdpbnRlZ2VyJykpIHsgLy8gQ29udmVydCBzdHJpbmcgb3IgbnVtYmVyIHRvIGludGVnZXJcbiAgICBjb25zdCB0ZXN0VmFsdWUgPSBwYXJzZUludCg8c3RyaW5nPnZhbHVlLCAxMCk7XG4gICAgaWYgKCEhdGVzdFZhbHVlKSB7IHJldHVybiB0ZXN0VmFsdWU7IH1cbiAgfVxuICBpZiAoKDxTY2hlbWFQcmltaXRpdmVUeXBlW10+dHlwZXMpLmluY2x1ZGVzKCdib29sZWFuJykpIHsgLy8gQ29udmVydCBhbnl0aGluZyB0byBib29sZWFuXG4gICAgcmV0dXJuICEhdmFsdWU7XG4gIH1cbiAgaWYgKChcbiAgICAgICg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnbnVtYmVyJykgfHxcbiAgICAgICg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnaW50ZWdlcicpXG4gICAgKSAmJiAhKDxTY2hlbWFQcmltaXRpdmVUeXBlW10+dHlwZXMpLmluY2x1ZGVzKCdudWxsJylcbiAgKSB7XG4gICAgcmV0dXJuIDA7IC8vIElmIG51bGwgbm90IGFsbG93ZWQsIHJldHVybiAwIGZvciBub24tY29udmVydGFibGUgdmFsdWVzXG4gIH1cbn1cblxuLyoqXG4gKiAnaXNQcm9taXNlJyBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSAgeyBhbnkgfSBvYmplY3RcbiAqIEByZXR1cm4geyBib29sZWFuIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvbWlzZShvYmplY3QpOiBvYmplY3QgaXMgUHJvbWlzZTxhbnk+IHtcbiAgcmV0dXJuICEhb2JqZWN0ICYmIHR5cGVvZiBvYmplY3QudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuLyoqXG4gKiAnaXNPYnNlcnZhYmxlJyBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSAgeyBhbnkgfSBvYmplY3RcbiAqIEByZXR1cm4geyBib29sZWFuIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JzZXJ2YWJsZShvYmplY3QpOiBvYmplY3QgaXMgT2JzZXJ2YWJsZTxhbnk+IHtcbiAgcmV0dXJuICEhb2JqZWN0ICYmIHR5cGVvZiBvYmplY3Quc3Vic2NyaWJlID09PSAnZnVuY3Rpb24nO1xufVxuXG4vKipcbiAqICdfdG9Qcm9taXNlJyBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSAgeyBvYmplY3QgfSBvYmplY3RcbiAqIEByZXR1cm4geyBQcm9taXNlPGFueT4gfVxuICovXG5leHBvcnQgZnVuY3Rpb24gX3RvUHJvbWlzZShvYmplY3QpOiBQcm9taXNlPGFueT4ge1xuICByZXR1cm4gaXNQcm9taXNlKG9iamVjdCkgPyBvYmplY3QgOiB0b1Byb21pc2UuY2FsbChvYmplY3QpO1xufVxuXG4vKipcbiAqICd0b09ic2VydmFibGUnIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtICB7IG9iamVjdCB9IG9iamVjdFxuICogQHJldHVybiB7IE9ic2VydmFibGU8YW55PiB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b09ic2VydmFibGUob2JqZWN0KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgY29uc3Qgb2JzZXJ2YWJsZSA9IGlzUHJvbWlzZShvYmplY3QpID8gZnJvbVByb21pc2Uob2JqZWN0KSA6IG9iamVjdDtcbiAgaWYgKGlzT2JzZXJ2YWJsZShvYnNlcnZhYmxlKSkgeyByZXR1cm4gb2JzZXJ2YWJsZTsgfVxuICBjb25zb2xlLmVycm9yKCd0b09ic2VydmFibGUgZXJyb3I6IEV4cGVjdGVkIHZhbGlkYXRvciB0byByZXR1cm4gUHJvbWlzZSBvciBPYnNlcnZhYmxlLicpO1xuICByZXR1cm4gbmV3IE9ic2VydmFibGUoKTtcbn1cblxuLyoqXG4gKiAnaW5BcnJheScgZnVuY3Rpb25cbiAqXG4gKiBTZWFyY2hlcyBhbiBhcnJheSBmb3IgYW4gaXRlbSwgb3Igb25lIG9mIGEgbGlzdCBvZiBpdGVtcywgYW5kIHJldHVybnMgdHJ1ZVxuICogYXMgc29vbiBhcyBhIG1hdGNoIGlzIGZvdW5kLCBvciBmYWxzZSBpZiBubyBtYXRjaC5cbiAqXG4gKiBJZiB0aGUgb3B0aW9uYWwgdGhpcmQgcGFyYW1ldGVyIGFsbEluIGlzIHNldCB0byBUUlVFLCBhbmQgdGhlIGl0ZW0gdG8gZmluZFxuICogaXMgYW4gYXJyYXksIHRoZW4gdGhlIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSBvbmx5IGlmIGFsbCBlbGVtZW50cyBmcm9tIGl0ZW1cbiAqIGFyZSBmb3VuZCBpbiB0aGUgYXJyYXkgbGlzdCwgYW5kIGZhbHNlIGlmIGFueSBlbGVtZW50IGlzIG5vdCBmb3VuZC4gSWYgdGhlXG4gKiBpdGVtIHRvIGZpbmQgaXMgbm90IGFuIGFycmF5LCBzZXR0aW5nIGFsbEluIHRvIFRSVUUgaGFzIG5vIGVmZmVjdC5cbiAqXG4gKiBAcGFyYW0gIHsgYW55fGFueVtdIH0gaXRlbSAtIHRoZSBpdGVtIHRvIHNlYXJjaCBmb3JcbiAqIEBwYXJhbSAgeyBhbnlbXSB9IGFycmF5IC0gdGhlIGFycmF5IHRvIHNlYXJjaFxuICogQHBhcmFtICB7IGJvb2xlYW4gPSBmYWxzZSB9IGFsbEluIC0gaWYgVFJVRSwgYWxsIGl0ZW1zIG11c3QgYmUgaW4gYXJyYXlcbiAqIEByZXR1cm4geyBib29sZWFuIH0gLSB0cnVlIGlmIGl0ZW0ocykgaW4gYXJyYXksIGZhbHNlIG90aGVyd2lzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5BcnJheShpdGVtLCBhcnJheSwgYWxsSW4gPSBmYWxzZSkge1xuICBpZiAoIWlzRGVmaW5lZChpdGVtKSB8fCAhaXNBcnJheShhcnJheSkpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIHJldHVybiBpc0FycmF5KGl0ZW0pID9cbiAgICBpdGVtW2FsbEluID8gJ2V2ZXJ5JyA6ICdzb21lJ10oc3ViSXRlbSA9PiBhcnJheS5pbmNsdWRlcyhzdWJJdGVtKSkgOlxuICAgIGFycmF5LmluY2x1ZGVzKGl0ZW0pO1xufVxuXG4vKipcbiAqICd4b3InIHV0aWxpdHkgZnVuY3Rpb24gLSBleGNsdXNpdmUgb3JcbiAqXG4gKiBSZXR1cm5zIHRydWUgaWYgZXhhY3RseSBvbmUgb2YgdHdvIHZhbHVlcyBpcyB0cnV0aHkuXG4gKlxuICogQHBhcmFtICB7IGFueSB9IHZhbHVlMSAtIGZpcnN0IHZhbHVlIHRvIGNoZWNrXG4gKiBAcGFyYW0gIHsgYW55IH0gdmFsdWUyIC0gc2Vjb25kIHZhbHVlIHRvIGNoZWNrXG4gKiBAcmV0dXJuIHsgYm9vbGVhbiB9IC0gdHJ1ZSBpZiBleGFjdGx5IG9uZSBpbnB1dCB2YWx1ZSBpcyB0cnV0aHksIGZhbHNlIGlmIG5vdFxuICovXG5leHBvcnQgZnVuY3Rpb24geG9yKHZhbHVlMSwgdmFsdWUyKSB7XG4gIHJldHVybiAoISF2YWx1ZTEgJiYgIXZhbHVlMikgfHwgKCF2YWx1ZTEgJiYgISF2YWx1ZTIpO1xufVxuIl19