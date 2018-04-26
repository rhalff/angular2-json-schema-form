import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs-compat/Observable';
/**
 * Validator utility function library:
 *
 * Validator and error utilities:
 *   _executeValidators, _executeAsyncValidators, _mergeObjects, _mergeErrors
 *
 * Individual value checking:
 *   isDefined, hasValue, isEmpty
 *
 * Individual type checking:
 *   isString, isNumber, isInteger, isBoolean, isFunction, isObject, isArray,
 *   isMap, isSet, isPromise, isObservable
 *
 * Multiple type checking and fixing:
 *   getType, isType, isPrimitive, toJavaScriptType, toSchemaType,
 *   _toPromise, toObservable
 *
 * Utility functions:
 *   inArray, xor
 *
 * Typescript types and interfaces:
 *   SchemaPrimitiveType, SchemaType, JavaScriptPrimitiveType, JavaScriptType,
 *   PrimitiveValue, PlainObject, IValidatorFn, AsyncIValidatorFn
 *
 * Note: 'IValidatorFn' is short for 'invertable validator function',
 *   which is a validator functions that accepts an optional second
 *   argument which, if set to TRUE, causes the validator to perform
 *   the opposite of its original function.
 */
export declare type SchemaPrimitiveType = 'string' | 'number' | 'integer' | 'boolean' | 'null';
export declare type SchemaType = 'string' | 'number' | 'integer' | 'boolean' | 'null' | 'object' | 'array';
export declare type JavaScriptPrimitiveType = 'string' | 'number' | 'boolean' | 'null' | 'undefined';
export declare type JavaScriptType = 'string' | 'number' | 'boolean' | 'null' | 'undefined' | 'object' | 'array' | 'map' | 'set' | 'arguments' | 'date' | 'error' | 'function' | 'json' | 'math' | 'regexp';
export declare type PrimitiveValue = string | number | boolean | null | undefined;
export interface PlainObject {
    [k: string]: any;
}
export declare type IValidatorFn = (c: AbstractControl, i?: boolean) => PlainObject;
export declare type AsyncIValidatorFn = (c: AbstractControl, i?: boolean) => any;
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
export declare function _executeValidators(control: any, validators: any, invert?: boolean): any;
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
export declare function _executeAsyncValidators(control: any, validators: any, invert?: boolean): any;
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
export declare function _mergeObjects(...objects: any[]): PlainObject;
/**
 * '_mergeErrors' utility function
 *
 * Merges an array of objects.
 * Used for combining the validator errors returned from 'executeValidators'
 *
 * @param  { PlainObject[] } arrayOfErrors - array of objects
 * @return { PlainObject } - merged object, or null if no usable input objectcs
 */
export declare function _mergeErrors(arrayOfErrors: any): PlainObject;
/**
 * 'isDefined' utility function
 *
 * Checks if a variable contains a value of any type.
 * Returns true even for otherwise 'falsey' values of 0, '', and false.
 *
 * @param  { any } value - the value to check
 * @return { boolean } - false if undefined or null, otherwise true
 */
export declare function isDefined(value: any): boolean;
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
export declare function hasValue(value: any): boolean;
/**
 * 'isEmpty' utility function
 *
 * Similar to !hasValue, but also returns true for empty arrays and objects.
 *
 * @param  { any } value - the value to check
 * @return { boolean } - false if undefined, null, or '', otherwise true
 */
export declare function isEmpty(value: any): boolean;
/**
 * 'isString' utility function
 *
 * Checks if a value is a string.
 *
 * @param  { any } value - the value to check
 * @return { boolean } - true if string, false if not
 */
export declare function isString(value: any): boolean;
/**
 * 'isNumber' utility function
 *
 * Checks if a value is a regular number, numeric string, or JavaScript Date.
 *
 * @param  { any } value - the value to check
 * @param  { any = false } strict - if truthy, also checks JavaScript tyoe
 * @return { boolean } - true if number, false if not
 */
export declare function isNumber(value: any, strict?: any): boolean;
/**
 * 'isInteger' utility function
 *
 * Checks if a value is an integer.
 *
 * @param  { any } value - the value to check
 * @param  { any = false } strict - if truthy, also checks JavaScript tyoe
 * @return {boolean } - true if number, false if not
 */
export declare function isInteger(value: any, strict?: any): boolean;
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
export declare function isBoolean(value: any, option?: any): boolean;
export declare function isFunction(item: any): boolean;
export declare function isObject(item: any): boolean;
export declare function isArray(item: any): boolean;
export declare function isDate(item: any): boolean;
export declare function isMap(item: any): boolean;
export declare function isSet(item: any): boolean;
export declare function isSymbol(item: any): boolean;
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
export declare function getType(value: any, strict?: any): "null" | "array" | "object" | "boolean" | "integer" | "number" | "string";
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
export declare function isType(value: any, type: any): boolean;
/**
 * 'isPrimitive' function
 *
 * Checks wether an input value is a JavaScript primitive type:
 * string, number, boolean, or null.
 *
 * @param  { any } value - value to check
 * @return { boolean }
 */
export declare function isPrimitive(value: any): boolean;
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
export declare function toJavaScriptType(value: any, types: any, strictIntegers?: boolean): any;
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
export declare function toSchemaType(value: any, types: any): any;
/**
 * 'isPromise' function
 *
 * @param  { any } object
 * @return { boolean }
 */
export declare function isPromise(object: any): object is Promise<any>;
/**
 * 'isObservable' function
 *
 * @param  { any } object
 * @return { boolean }
 */
export declare function isObservable(object: any): object is Observable<any>;
/**
 * '_toPromise' function
 *
 * @param  { object } object
 * @return { Promise<any> }
 */
export declare function _toPromise(object: any): Promise<any>;
/**
 * 'toObservable' function
 *
 * @param  { object } object
 * @return { Observable<any> }
 */
export declare function toObservable(object: any): Observable<any>;
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
export declare function inArray(item: any, array: any, allIn?: boolean): any;
/**
 * 'xor' utility function - exclusive or
 *
 * Returns true if exactly one of two values is truthy.
 *
 * @param  { any } value1 - first value to check
 * @param  { any } value2 - second value to check
 * @return { boolean } - true if exactly one input value is truthy, false if not
 */
export declare function xor(value1: any, value2: any): boolean;
