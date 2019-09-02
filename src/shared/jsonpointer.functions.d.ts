/**
 * 'JsonPointer' class
 *
 * Some utilities for using JSON Pointers with JSON objects
 * https://tools.ietf.org/html/rfc6901
 *
 * get, getCopy, getFirst, set, setCopy, insert, insertCopy, remove, has, dict,
 * forEachDeep, forEachDeepCopy, escape, unescape, parse, compile, toKey,
 * isJsonPointer, isSubPointer, toIndexedPointer, toGenericPointer,
 * toControlPointer, toSchemaPointer, toDataPointer, parseObjectPath
 *
 * Some functions based on manuelstofer's json-pointer utilities
 * https://github.com/manuelstofer/json-pointer
 */
export declare type Pointer = string | string[];
export declare class JsonPointer {
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
    static get(object: any, pointer: any, startSlice?: number, endSlice?: number, getBoolean?: boolean, errors?: boolean): any;
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
    static getCopy(object: any, pointer: any, startSlice?: number, endSlice?: number, getBoolean?: boolean, errors?: boolean): any;
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
    static getFirst(items: any, defaultValue?: any, getCopy?: boolean): any;
    /**
     * 'getFirstCopy' function
     *
     * Similar to getFirst, but always returns a copy.
     *
     * @param  { [object, pointer][] } items - Array of objects and pointers to check
     * @param  { any = null } defaultValue - Value to return if nothing found
     * @return { any } - Copy of first value found
     */
    static getFirstCopy(items: any, defaultValue?: any): any;
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
    static set(object: any, pointer: any, value: any, insert?: boolean): any;
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
    static setCopy(object: any, pointer: any, value: any, insert?: boolean): any;
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
    static insert(object: any, pointer: any, value: any): any;
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
    static insertCopy(object: any, pointer: any, value: any): any;
    /**
     * 'remove' function
     *
     * Uses a JSON Pointer to remove a key and its attribute from an object
     *
     * @param  { object } object - object to delete attribute from
     * @param  { Pointer } pointer - JSON Pointer (string or array)
     * @return { object }
     */
    static remove(object: any, pointer: any): any;
    /**
     * 'has' function
     *
     * Tests if an object has a value at the location specified by a JSON Pointer
     *
     * @param  { object } object - object to chek for value
     * @param  { Pointer } pointer - JSON Pointer (string or array)
     * @return { boolean }
     */
    static has(object: any, pointer: any): any;
    /**
     * 'dict' function
     *
     * Returns a (pointer -> value) dictionary for an object
     *
     * @param  { object } object - The object to create a dictionary from
     * @return { object } - The resulting dictionary object
     */
    static dict(object: any): any;
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
    static forEachDeep(object: any, fn?: (v: any, p?: string, o?: any) => any, bottomUp?: boolean, pointer?: string, rootObject?: any): void;
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
    static forEachDeepCopy(object: any, fn?: (v: any, p?: string, o?: any) => any, bottomUp?: boolean, pointer?: string, rootObject?: any): any;
    /**
     * 'escape' function
     *
     * Escapes a string reference key
     *
     * @param  { string } key - string key to escape
     * @return { string } - escaped key
     */
    static escape(key: any): any;
    /**
     * 'unescape' function
     *
     * Unescapes a string reference key
     *
     * @param  { string } key - string key to unescape
     * @return { string } - unescaped key
     */
    static unescape(key: any): any;
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
    static parse(pointer: any, errors?: boolean): any[];
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
    static compile(pointer: any, defaultValue?: string, errors?: boolean): any;
    /**
     * 'toKey' function
     *
     * Extracts name of the final key from a JSON Pointer.
     *
     * @param  { Pointer } pointer - JSON Pointer (string or array)
     * @param  { boolean = false } errors - Show error if invalid pointer?
     * @return { string } - the extracted key
     */
    static toKey(pointer: any, errors?: boolean): any;
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
    static isJsonPointer(value: any): any;
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
    static isSubPointer(shortPointer: any, longPointer: any, trueIfMatching?: boolean, errors?: boolean): boolean;
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
    static toIndexedPointer(genericPointer: any, indexArray: any, arrayMap?: Map<string, number>): any;
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
    static toGenericPointer(indexedPointer: any, arrayMap?: Map<string, number>): any;
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
    static toControlPointer(dataPointer: any, formGroup: any, controlMustExist?: boolean): any;
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
    static toSchemaPointer(dataPointer: any, schema: any): any;
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
    static toDataPointer(schemaPointer: any, schema: any, errors?: boolean): any;
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
    static parseObjectPath(path: any): any[];
}
