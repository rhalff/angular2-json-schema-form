import { Injectable } from '@angular/core';
import { isDefined, isEmpty, isObject, isArray, isMap, isNumber, isString } from './validator.functions';
import { hasOwn, copy } from './utility.functions';
export class JsonPointer {
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
    static get(object, pointer, startSlice = 0, endSlice = null, getBoolean = false, errors = false) {
        if (object === null) {
            return getBoolean ? false : undefined;
        }
        let keyArray = this.parse(pointer, errors);
        if (typeof object === 'object' && keyArray !== null) {
            let subObject = object;
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
            for (let key of keyArray) {
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
                        console.error(`get error: "${key}" key not found in object.`);
                        console.error(pointer);
                        console.error(object);
                    }
                    return getBoolean ? false : undefined;
                }
            }
            return getBoolean ? true : subObject;
        }
        if (errors && keyArray === null) {
            console.error(`get error: Invalid JSON Pointer: ${pointer}`);
        }
        if (errors && typeof object !== 'object') {
            console.error('get error: Invalid object:');
            console.error(object);
        }
        return getBoolean ? false : undefined;
    }
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
    static getCopy(object, pointer, startSlice = 0, endSlice = null, getBoolean = false, errors = false) {
        const objectToCopy = this.get(object, pointer, startSlice, endSlice, getBoolean, errors);
        return this.forEachDeepCopy(objectToCopy);
    }
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
    static getFirst(items, defaultValue = null, getCopy = false) {
        if (isEmpty(items)) {
            return;
        }
        if (isArray(items)) {
            for (const item of items) {
                if (isEmpty(item)) {
                    continue;
                }
                if (isArray(item) && item.length >= 2) {
                    if (isEmpty(item[0]) || isEmpty(item[1])) {
                        continue;
                    }
                    const value = getCopy ?
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
            return defaultValue;
        }
        if (isMap(items)) {
            for (const [object, pointer] of items) {
                if (object === null || !this.isJsonPointer(pointer)) {
                    continue;
                }
                const value = getCopy ?
                    this.getCopy(object, pointer) :
                    this.get(object, pointer);
                if (value) {
                    return value;
                }
            }
            return defaultValue;
        }
        console.error('getFirst error: Input not in correct format.\n' +
            'Should be: [ [ object1, pointer1 ], [ object 2, pointer2 ], etc... ]');
        return defaultValue;
    }
    /**
     * 'getFirstCopy' function
     *
     * Similar to getFirst, but always returns a copy.
     *
     * @param  { [object, pointer][] } items - Array of objects and pointers to check
     * @param  { any = null } defaultValue - Value to return if nothing found
     * @return { any } - Copy of first value found
     */
    static getFirstCopy(items, defaultValue = null) {
        const firstCopy = this.getFirst(items, defaultValue, true);
        return firstCopy;
    }
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
    static set(object, pointer, value, insert = false) {
        const keyArray = this.parse(pointer);
        if (keyArray !== null && keyArray.length) {
            let subObject = object;
            for (let i = 0; i < keyArray.length - 1; ++i) {
                let key = keyArray[i];
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
            const lastKey = keyArray[keyArray.length - 1];
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
        console.error(`set error: Invalid JSON Pointer: ${pointer}`);
        return object;
    }
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
    static setCopy(object, pointer, value, insert = false) {
        const keyArray = this.parse(pointer);
        if (keyArray !== null) {
            const newObject = copy(object);
            let subObject = newObject;
            for (let i = 0; i < keyArray.length - 1; ++i) {
                let key = keyArray[i];
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
            const lastKey = keyArray[keyArray.length - 1];
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
        console.error(`setCopy error: Invalid JSON Pointer: ${pointer}`);
        return object;
    }
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
    static insert(object, pointer, value) {
        const updatedObject = this.set(object, pointer, value, true);
        return updatedObject;
    }
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
    static insertCopy(object, pointer, value) {
        const updatedObject = this.setCopy(object, pointer, value, true);
        return updatedObject;
    }
    /**
     * 'remove' function
     *
     * Uses a JSON Pointer to remove a key and its attribute from an object
     *
     * @param  { object } object - object to delete attribute from
     * @param  { Pointer } pointer - JSON Pointer (string or array)
     * @return { object }
     */
    static remove(object, pointer) {
        const keyArray = this.parse(pointer);
        if (keyArray !== null && keyArray.length) {
            let lastKey = keyArray.pop();
            const parentObject = this.get(object, keyArray);
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
        console.error(`remove error: Invalid JSON Pointer: ${pointer}`);
        return object;
    }
    /**
     * 'has' function
     *
     * Tests if an object has a value at the location specified by a JSON Pointer
     *
     * @param  { object } object - object to chek for value
     * @param  { Pointer } pointer - JSON Pointer (string or array)
     * @return { boolean }
     */
    static has(object, pointer) {
        const hasValue = this.get(object, pointer, 0, null, true);
        return hasValue;
    }
    /**
     * 'dict' function
     *
     * Returns a (pointer -> value) dictionary for an object
     *
     * @param  { object } object - The object to create a dictionary from
     * @return { object } - The resulting dictionary object
     */
    static dict(object) {
        const results = {};
        this.forEachDeep(object, (value, pointer) => {
            if (typeof value !== 'object') {
                results[pointer] = value;
            }
        });
        return results;
    }
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
    static forEachDeep(object, fn = (v) => v, bottomUp = false, pointer = '', rootObject = object) {
        if (typeof fn !== 'function') {
            console.error(`forEachDeep error: Iterator is not a function:`, fn);
            return;
        }
        if (!bottomUp) {
            fn(object, pointer, rootObject);
        }
        if (isObject(object) || isArray(object)) {
            for (const key of Object.keys(object)) {
                const newPointer = pointer + '/' + this.escape(key);
                this.forEachDeep(object[key], fn, bottomUp, newPointer, rootObject);
            }
        }
        if (bottomUp) {
            fn(object, pointer, rootObject);
        }
    }
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
    static forEachDeepCopy(object, fn = (v) => v, bottomUp = false, pointer = '', rootObject = object) {
        if (typeof fn !== 'function') {
            console.error(`forEachDeepCopy error: Iterator is not a function:`, fn);
            return null;
        }
        if (isObject(object) || isArray(object)) {
            let newObject = isArray(object) ? [...object] : Object.assign({}, object);
            if (!bottomUp) {
                newObject = fn(newObject, pointer, rootObject);
            }
            for (const key of Object.keys(newObject)) {
                const newPointer = pointer + '/' + this.escape(key);
                newObject[key] = this.forEachDeepCopy(newObject[key], fn, bottomUp, newPointer, rootObject);
            }
            if (bottomUp) {
                newObject = fn(newObject, pointer, rootObject);
            }
            return newObject;
        }
        else {
            return fn(object, pointer, rootObject);
        }
    }
    /**
     * 'escape' function
     *
     * Escapes a string reference key
     *
     * @param  { string } key - string key to escape
     * @return { string } - escaped key
     */
    static escape(key) {
        const escaped = key.toString().replace(/~/g, '~0').replace(/\//g, '~1');
        return escaped;
    }
    /**
     * 'unescape' function
     *
     * Unescapes a string reference key
     *
     * @param  { string } key - string key to unescape
     * @return { string } - unescaped key
     */
    static unescape(key) {
        const unescaped = key.toString().replace(/~1/g, '/').replace(/~0/g, '~');
        return unescaped;
    }
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
    static parse(pointer, errors = false) {
        if (!this.isJsonPointer(pointer)) {
            if (errors) {
                console.error(`parse error: Invalid JSON Pointer: ${pointer}`);
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
    }
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
    static compile(pointer, defaultValue = '', errors = false) {
        if (pointer === '#') {
            return '';
        }
        if (!this.isJsonPointer(pointer)) {
            if (errors) {
                console.error(`compile error: Invalid JSON Pointer: ${pointer}`);
            }
            return null;
        }
        if (isArray(pointer)) {
            if (pointer.length === 0) {
                return '';
            }
            return '/' + pointer.map(key => key === '' ? defaultValue : this.escape(key)).join('/');
        }
        if (typeof pointer === 'string') {
            if (pointer[0] === '#') {
                pointer = pointer.slice(1);
            }
            return pointer;
        }
    }
    /**
     * 'toKey' function
     *
     * Extracts name of the final key from a JSON Pointer.
     *
     * @param  { Pointer } pointer - JSON Pointer (string or array)
     * @param  { boolean = false } errors - Show error if invalid pointer?
     * @return { string } - the extracted key
     */
    static toKey(pointer, errors = false) {
        const keyArray = this.parse(pointer, errors);
        if (keyArray === null) {
            return null;
        }
        if (!keyArray.length) {
            return '';
        }
        return keyArray[keyArray.length - 1];
    }
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
    static isJsonPointer(value) {
        if (isArray(value)) {
            return value.every(key => typeof key === 'string');
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
    }
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
    static isSubPointer(shortPointer, longPointer, trueIfMatching = false, errors = false) {
        if (!this.isJsonPointer(shortPointer) || !this.isJsonPointer(longPointer)) {
            if (errors) {
                let invalid = '';
                if (!this.isJsonPointer(shortPointer)) {
                    invalid += ` 1: ${shortPointer}`;
                }
                if (!this.isJsonPointer(longPointer)) {
                    invalid += ` 2: ${longPointer}`;
                }
                console.error(`isSubPointer error: Invalid JSON Pointer ${invalid}`);
            }
            return;
        }
        shortPointer = this.compile(shortPointer, '', errors);
        longPointer = this.compile(longPointer, '', errors);
        return shortPointer === longPointer ? trueIfMatching :
            `${shortPointer}/` === longPointer.slice(0, shortPointer.length + 1);
    }
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
    static toIndexedPointer(genericPointer, indexArray, arrayMap = null) {
        if (this.isJsonPointer(genericPointer) && isArray(indexArray)) {
            let indexedPointer = this.compile(genericPointer);
            if (isMap(arrayMap)) {
                let arrayIndex = 0;
                return indexedPointer.replace(/\/\-(?=\/|$)/g, (key, stringIndex) => arrayMap.has(indexedPointer.slice(0, stringIndex)) ?
                    '/' + indexArray[arrayIndex++] : key);
            }
            else {
                for (const pointerIndex of indexArray) {
                    indexedPointer = indexedPointer.replace('/-', '/' + pointerIndex);
                }
                return indexedPointer;
            }
        }
        if (!this.isJsonPointer(genericPointer)) {
            console.error(`toIndexedPointer error: Invalid JSON Pointer: ${genericPointer}`);
        }
        if (!isArray(indexArray)) {
            console.error(`toIndexedPointer error: Invalid indexArray: ${indexArray}`);
        }
    }
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
    static toGenericPointer(indexedPointer, arrayMap = new Map()) {
        if (this.isJsonPointer(indexedPointer) && isMap(arrayMap)) {
            const pointerArray = this.parse(indexedPointer);
            for (let i = 1; i < pointerArray.length; i++) {
                const subPointer = this.compile(pointerArray.slice(0, i));
                if (arrayMap.has(subPointer) &&
                    arrayMap.get(subPointer) <= +pointerArray[i]) {
                    pointerArray[i] = '-';
                }
            }
            return this.compile(pointerArray);
        }
        if (!this.isJsonPointer(indexedPointer)) {
            console.error(`toGenericPointer error: invalid JSON Pointer: ${indexedPointer}`);
        }
        if (!isMap(arrayMap)) {
            console.error(`toGenericPointer error: invalid arrayMap: ${arrayMap}`);
        }
    }
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
    static toControlPointer(dataPointer, formGroup, controlMustExist = false) {
        const dataPointerArray = this.parse(dataPointer);
        const controlPointerArray = [];
        let subGroup = formGroup;
        if (dataPointerArray !== null) {
            for (const key of dataPointerArray) {
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
                    console.error(`toControlPointer error: Unable to find "${key}" item in FormGroup.`);
                    console.error(dataPointer);
                    console.error(formGroup);
                    return;
                }
                else {
                    controlPointerArray.push(key);
                    subGroup = { controls: {} };
                }
            }
            return this.compile(controlPointerArray);
        }
        console.error(`toControlPointer error: Invalid JSON Pointer: ${dataPointer}`);
    }
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
    static toSchemaPointer(dataPointer, schema) {
        if (this.isJsonPointer(dataPointer) && typeof schema === 'object') {
            const pointerArray = this.parse(dataPointer);
            if (!pointerArray.length) {
                return '';
            }
            const firstKey = pointerArray.shift();
            if (schema.type === 'object' || schema.properties || schema.additionalProperties) {
                if ((schema.properties || {})[firstKey]) {
                    return `/properties/${this.escape(firstKey)}` +
                        this.toSchemaPointer(pointerArray, schema.properties[firstKey]);
                }
                else if (schema.additionalProperties) {
                    return '/additionalProperties' +
                        this.toSchemaPointer(pointerArray, schema.additionalProperties);
                }
            }
            if ((schema.type === 'array' || schema.items) &&
                (isNumber(firstKey) || firstKey === '-' || firstKey === '')) {
                const arrayItem = firstKey === '-' || firstKey === '' ? 0 : +firstKey;
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
            console.error(`toSchemaPointer error: Data pointer ${dataPointer} ` +
                `not compatible with schema ${schema}`);
            return null;
        }
        if (!this.isJsonPointer(dataPointer)) {
            console.error(`toSchemaPointer error: Invalid JSON Pointer: ${dataPointer}`);
        }
        if (typeof schema !== 'object') {
            console.error(`toSchemaPointer error: Invalid JSON Schema: ${schema}`);
        }
        return null;
    }
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
    static toDataPointer(schemaPointer, schema, errors = false) {
        if (this.isJsonPointer(schemaPointer) && typeof schema === 'object' &&
            this.has(schema, schemaPointer)) {
            const pointerArray = this.parse(schemaPointer);
            if (!pointerArray.length) {
                return '';
            }
            const dataPointer = '';
            const firstKey = pointerArray.shift();
            if (firstKey === 'properties' ||
                (firstKey === 'items' && isArray(schema.items))) {
                const secondKey = pointerArray.shift();
                const pointerSuffix = this.toDataPointer(pointerArray, schema[firstKey][secondKey]);
                return pointerSuffix === null ? null : '/' + secondKey + pointerSuffix;
            }
            else if (firstKey === 'additionalItems' ||
                (firstKey === 'items' && isObject(schema.items))) {
                const pointerSuffix = this.toDataPointer(pointerArray, schema[firstKey]);
                return pointerSuffix === null ? null : '/-' + pointerSuffix;
            }
            else if (['allOf', 'anyOf', 'oneOf'].includes(firstKey)) {
                const secondKey = pointerArray.shift();
                return this.toDataPointer(pointerArray, schema[firstKey][secondKey]);
            }
            else if (firstKey === 'not') {
                return this.toDataPointer(pointerArray, schema[firstKey]);
            }
            else if (['contains', 'definitions', 'dependencies', 'additionalItems',
                'additionalProperties', 'patternProperties', 'propertyNames'].includes(firstKey)) {
                if (errors) {
                    console.error(`toDataPointer error: Ambiguous location`);
                }
            }
            return '';
        }
        if (errors) {
            if (!this.isJsonPointer(schemaPointer)) {
                console.error(`toDataPointer error: Invalid JSON Pointer: ${schemaPointer}`);
            }
            if (typeof schema !== 'object') {
                console.error(`toDataPointer error: Invalid JSON Schema: ${schema}`);
            }
            if (typeof schema !== 'object') {
                console.error(`toDataPointer error: Pointer ${schemaPointer} invalid for Schema: ${schema}`);
            }
        }
        return null;
    }
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
    static parseObjectPath(path) {
        if (isArray(path)) {
            return path;
        }
        if (this.isJsonPointer(path)) {
            return this.parse(path);
        }
        if (typeof path === 'string') {
            let index = 0;
            const parts = [];
            while (index < path.length) {
                const nextDot = path.indexOf('.', index);
                const nextOB = path.indexOf('[', index); // next open bracket
                if (nextDot === -1 && nextOB === -1) {
                    parts.push(path.slice(index));
                    index = path.length;
                }
                else if (nextDot !== -1 && (nextDot < nextOB || nextOB === -1)) {
                    parts.push(path.slice(index, nextDot));
                    index = nextDot + 1;
                }
                else {
                    if (nextOB > index) {
                        parts.push(path.slice(index, nextOB));
                        index = nextOB;
                    }
                    const quote = path.charAt(nextOB + 1);
                    if (quote === '"' || quote === '\'') {
                        let nextCB = path.indexOf(quote + ']', nextOB); // next close bracket
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
                        let nextCB = path.indexOf(']', nextOB); // next close bracket
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
    }
}
JsonPointer.decorators = [
    { type: Injectable },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbnBvaW50ZXIuZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcjItanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbInNyYy9zaGFyZWQvanNvbnBvaW50ZXIuZnVuY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUNMLFNBQVMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFDakUsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBbUJuRCxNQUFNO0lBRUo7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FDUixNQUFNLEVBQUUsT0FBTyxFQUFFLFVBQVUsR0FBRyxDQUFDLEVBQUUsV0FBbUIsSUFBSSxFQUN4RCxVQUFVLEdBQUcsS0FBSyxFQUFFLE1BQU0sR0FBRyxLQUFLO1FBRWxDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFBQyxDQUFDO1FBQy9ELElBQUksUUFBUSxHQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwRCxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUM7WUFDdkIsRUFBRSxDQUFDLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxD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QztvQkFDdEMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLEdBQUcsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDcEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMscUJBQXFCO3dCQUNyRSxPQUFPLE1BQU0sS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQzs0QkFDekQsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEdBQUcsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ2pELENBQUM7d0JBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQzt3QkFBQyxDQUFDO3dCQUM1QyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUM7NkJBQ3JDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEdBQUcsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ2xELEtBQUssR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDO29CQUNyQixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMscUJBQXFCO3dCQUM3RCxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO3dCQUFDLENBQUM7d0JBQzVDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQzFDLEtBQUssR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDO29CQUNyQixDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFBQyxLQUFLLEVBQUUsQ0FBQztvQkFBQyxDQUFDO2dCQUM5QyxDQUFDO1lBQ0gsQ0FBQztZQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO1FBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyw0REFBNEQsQ0FBQyxDQUFDO0lBQzlFLENBQUM7OztZQWoyQkYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgaXNEZWZpbmVkLCBpc0VtcHR5LCBpc09iamVjdCwgaXNBcnJheSwgaXNNYXAsIGlzTnVtYmVyLCBpc1N0cmluZ1xufSBmcm9tICcuL3ZhbGlkYXRvci5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgaGFzT3duLCBjb3B5IH0gZnJvbSAnLi91dGlsaXR5LmZ1bmN0aW9ucyc7XG5cbi8qKlxuICogJ0pzb25Qb2ludGVyJyBjbGFzc1xuICpcbiAqIFNvbWUgdXRpbGl0aWVzIGZvciB1c2luZyBKU09OIFBvaW50ZXJzIHdpdGggSlNPTiBvYmplY3RzXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjkwMVxuICpcbiAqIGdldCwgZ2V0Q29weSwgZ2V0Rmlyc3QsIHNldCwgc2V0Q29weSwgaW5zZXJ0LCBpbnNlcnRDb3B5LCByZW1vdmUsIGhhcywgZGljdCxcbiAqIGZvckVhY2hEZWVwLCBmb3JFYWNoRGVlcENvcHksIGVzY2FwZSwgdW5lc2NhcGUsIHBhcnNlLCBjb21waWxlLCB0b0tleSxcbiAqIGlzSnNvblBvaW50ZXIsIGlzU3ViUG9pbnRlciwgdG9JbmRleGVkUG9pbnRlciwgdG9HZW5lcmljUG9pbnRlcixcbiAqIHRvQ29udHJvbFBvaW50ZXIsIHRvU2NoZW1hUG9pbnRlciwgdG9EYXRhUG9pbnRlciwgcGFyc2VPYmplY3RQYXRoXG4gKlxuICogU29tZSBmdW5jdGlvbnMgYmFzZWQgb24gbWFudWVsc3RvZmVyJ3MganNvbi1wb2ludGVyIHV0aWxpdGllc1xuICogaHR0cHM6Ly9naXRodWIuY29tL21hbnVlbHN0b2Zlci9qc29uLXBvaW50ZXJcbiAqL1xuZXhwb3J0IHR5cGUgUG9pbnRlciA9IHN0cmluZyB8IHN0cmluZ1tdO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSnNvblBvaW50ZXIge1xuXG4gIC8qKlxuICAgKiAnZ2V0JyBmdW5jdGlvblxuICAgKlxuICAgKiBVc2VzIGEgSlNPTiBQb2ludGVyIHRvIHJldHJpZXZlIGEgdmFsdWUgZnJvbSBhbiBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSAgeyBvYmplY3QgfSBvYmplY3QgLSBPYmplY3QgdG8gZ2V0IHZhbHVlIGZyb21cbiAgICogQHBhcmFtICB7IFBvaW50ZXIgfSBwb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gICAqIEBwYXJhbSAgeyBudW1iZXIgPSAwIH0gc3RhcnRTbGljZSAtIFplcm8tYmFzZWQgaW5kZXggb2YgZmlyc3QgUG9pbnRlciBrZXkgdG8gdXNlXG4gICAqIEBwYXJhbSAgeyBudW1iZXIgfSBlbmRTbGljZSAtIFplcm8tYmFzZWQgaW5kZXggb2YgbGFzdCBQb2ludGVyIGtleSB0byB1c2VcbiAgICogQHBhcmFtICB7IGJvb2xlYW4gPSBmYWxzZSB9IGdldEJvb2xlYW4gLSBSZXR1cm4gb25seSB0cnVlIG9yIGZhbHNlP1xuICAgKiBAcGFyYW0gIHsgYm9vbGVhbiA9IGZhbHNlIH0gZXJyb3JzIC0gU2hvdyBlcnJvciBpZiBub3QgZm91bmQ/XG4gICAqIEByZXR1cm4geyBvYmplY3QgfSAtIExvY2F0ZWQgdmFsdWUgKG9yIHRydWUgb3IgZmFsc2UgaWYgZ2V0Qm9vbGVhbiA9IHRydWUpXG4gICAqL1xuICBzdGF0aWMgZ2V0KFxuICAgIG9iamVjdCwgcG9pbnRlciwgc3RhcnRTbGljZSA9IDAsIGVuZFNsaWNlOiBudW1iZXIgPSBudWxsLFxuICAgIGdldEJvb2xlYW4gPSBmYWxzZSwgZXJyb3JzID0gZmFsc2VcbiAgKSB7XG4gICAgaWYgKG9iamVjdCA9PT0gbnVsbCkgeyByZXR1cm4gZ2V0Qm9vbGVhbiA/IGZhbHNlIDogdW5kZWZpbmVkOyB9XG4gICAgbGV0IGtleUFycmF5OiBhbnlbXSA9IHRoaXMucGFyc2UocG9pbnRlciwgZXJyb3JzKTtcbiAgICBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYga2V5QXJyYXkgIT09IG51bGwpIHtcbiAgICAgIGxldCBzdWJPYmplY3QgPSBvYmplY3Q7XG4gICAgICBpZiAoc3RhcnRTbGljZSA+PSBrZXlBcnJheS5sZW5ndGggfHwgZW5kU2xpY2UgPD0gLWtleUFycmF5Lmxlbmd0aCkgeyByZXR1cm4gb2JqZWN0OyB9XG4gICAgICBpZiAoc3RhcnRTbGljZSA8PSAta2V5QXJyYXkubGVuZ3RoKSB7IHN0YXJ0U2xpY2UgPSAwOyB9XG4gICAgICBpZiAoIWlzRGVmaW5lZChlbmRTbGljZSkgfHwgZW5kU2xpY2UgPj0ga2V5QXJyYXkubGVuZ3RoKSB7IGVuZFNsaWNlID0ga2V5QXJyYXkubGVuZ3RoOyB9XG4gICAgICBrZXlBcnJheSA9IGtleUFycmF5LnNsaWNlKHN0YXJ0U2xpY2UsIGVuZFNsaWNlKTtcbiAgICAgIGZvciAobGV0IGtleSBvZiBrZXlBcnJheSkge1xuICAgICAgICBpZiAoa2V5ID09PSAnLScgJiYgaXNBcnJheShzdWJPYmplY3QpICYmIHN1Yk9iamVjdC5sZW5ndGgpIHtcbiAgICAgICAgICBrZXkgPSBzdWJPYmplY3QubGVuZ3RoIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNNYXAoc3ViT2JqZWN0KSAmJiBzdWJPYmplY3QuaGFzKGtleSkpIHtcbiAgICAgICAgICBzdWJPYmplY3QgPSBzdWJPYmplY3QuZ2V0KGtleSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHN1Yk9iamVjdCA9PT0gJ29iamVjdCcgJiYgc3ViT2JqZWN0ICE9PSBudWxsICYmXG4gICAgICAgICAgaGFzT3duKHN1Yk9iamVjdCwga2V5KVxuICAgICAgICApIHtcbiAgICAgICAgICBzdWJPYmplY3QgPSBzdWJPYmplY3Rba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBnZXQgZXJyb3I6IFwiJHtrZXl9XCIga2V5IG5vdCBmb3VuZCBpbiBvYmplY3QuYCk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKHBvaW50ZXIpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihvYmplY3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZ2V0Qm9vbGVhbiA/IGZhbHNlIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZ2V0Qm9vbGVhbiA/IHRydWUgOiBzdWJPYmplY3Q7XG4gICAgfVxuICAgIGlmIChlcnJvcnMgJiYga2V5QXJyYXkgPT09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYGdldCBlcnJvcjogSW52YWxpZCBKU09OIFBvaW50ZXI6ICR7cG9pbnRlcn1gKTtcbiAgICB9XG4gICAgaWYgKGVycm9ycyAmJiB0eXBlb2Ygb2JqZWN0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgY29uc29sZS5lcnJvcignZ2V0IGVycm9yOiBJbnZhbGlkIG9iamVjdDonKTtcbiAgICAgIGNvbnNvbGUuZXJyb3Iob2JqZWN0KTtcbiAgICB9XG4gICAgcmV0dXJuIGdldEJvb2xlYW4gPyBmYWxzZSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiAnZ2V0Q29weScgZnVuY3Rpb25cbiAgICpcbiAgICogVXNlcyBhIEpTT04gUG9pbnRlciB0byBkZWVwbHkgY2xvbmUgYSB2YWx1ZSBmcm9tIGFuIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtICB7IG9iamVjdCB9IG9iamVjdCAtIE9iamVjdCB0byBnZXQgdmFsdWUgZnJvbVxuICAgKiBAcGFyYW0gIHsgUG9pbnRlciB9IHBvaW50ZXIgLSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSlcbiAgICogQHBhcmFtICB7IG51bWJlciA9IDAgfSBzdGFydFNsaWNlIC0gWmVyby1iYXNlZCBpbmRleCBvZiBmaXJzdCBQb2ludGVyIGtleSB0byB1c2VcbiAgICogQHBhcmFtICB7IG51bWJlciB9IGVuZFNsaWNlIC0gWmVyby1iYXNlZCBpbmRleCBvZiBsYXN0IFBvaW50ZXIga2V5IHRvIHVzZVxuICAgKiBAcGFyYW0gIHsgYm9vbGVhbiA9IGZhbHNlIH0gZ2V0Qm9vbGVhbiAtIFJldHVybiBvbmx5IHRydWUgb3IgZmFsc2U/XG4gICAqIEBwYXJhbSAgeyBib29sZWFuID0gZmFsc2UgfSBlcnJvcnMgLSBTaG93IGVycm9yIGlmIG5vdCBmb3VuZD9cbiAgICogQHJldHVybiB7IG9iamVjdCB9IC0gTG9jYXRlZCB2YWx1ZSAob3IgdHJ1ZSBvciBmYWxzZSBpZiBnZXRCb29sZWFuID0gdHJ1ZSlcbiAgICovXG4gIHN0YXRpYyBnZXRDb3B5KFxuICAgIG9iamVjdCwgcG9pbnRlciwgc3RhcnRTbGljZSA9IDAsIGVuZFNsaWNlOiBudW1iZXIgPSBudWxsLFxuICAgIGdldEJvb2xlYW4gPSBmYWxzZSwgZXJyb3JzID0gZmFsc2VcbiAgKSB7XG4gICAgY29uc3Qgb2JqZWN0VG9Db3B5ID1cbiAgICAgIHRoaXMuZ2V0KG9iamVjdCwgcG9pbnRlciwgc3RhcnRTbGljZSwgZW5kU2xpY2UsIGdldEJvb2xlYW4sIGVycm9ycyk7XG4gICAgcmV0dXJuIHRoaXMuZm9yRWFjaERlZXBDb3B5KG9iamVjdFRvQ29weSk7XG4gIH1cblxuICAvKipcbiAgICogJ2dldEZpcnN0JyBmdW5jdGlvblxuICAgKlxuICAgKiBUYWtlcyBhbiBhcnJheSBvZiBKU09OIFBvaW50ZXJzIGFuZCBvYmplY3RzLFxuICAgKiBjaGVja3MgZWFjaCBvYmplY3QgZm9yIGEgdmFsdWUgc3BlY2lmaWVkIGJ5IHRoZSBwb2ludGVyLFxuICAgKiBhbmQgcmV0dXJucyB0aGUgZmlyc3QgdmFsdWUgZm91bmQuXG4gICAqXG4gICAqIEBwYXJhbSAgeyBbb2JqZWN0LCBwb2ludGVyXVtdIH0gaXRlbXMgLSBBcnJheSBvZiBvYmplY3RzIGFuZCBwb2ludGVycyB0byBjaGVja1xuICAgKiBAcGFyYW0gIHsgYW55ID0gbnVsbCB9IGRlZmF1bHRWYWx1ZSAtIFZhbHVlIHRvIHJldHVybiBpZiBub3RoaW5nIGZvdW5kXG4gICAqIEBwYXJhbSAgeyBib29sZWFuID0gZmFsc2UgfSBnZXRDb3B5IC0gUmV0dXJuIGEgY29weSBpbnN0ZWFkP1xuICAgKiBAcmV0dXJuIHsgYW55IH0gLSBGaXJzdCB2YWx1ZSBmb3VuZFxuICAgKi9cbiAgc3RhdGljIGdldEZpcnN0KGl0ZW1zLCBkZWZhdWx0VmFsdWU6IGFueSA9IG51bGwsIGdldENvcHkgPSBmYWxzZSkge1xuICAgIGlmIChpc0VtcHR5KGl0ZW1zKSkgeyByZXR1cm47IH1cbiAgICBpZiAoaXNBcnJheShpdGVtcykpIHtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICBpZiAoaXNFbXB0eShpdGVtKSkgeyBjb250aW51ZTsgfVxuICAgICAgICBpZiAoaXNBcnJheShpdGVtKSAmJiBpdGVtLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgaWYgKGlzRW1wdHkoaXRlbVswXSkgfHwgaXNFbXB0eShpdGVtWzFdKSkgeyBjb250aW51ZTsgfVxuICAgICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0Q29weSA/XG4gICAgICAgICAgICB0aGlzLmdldENvcHkoaXRlbVswXSwgaXRlbVsxXSkgOlxuICAgICAgICAgICAgdGhpcy5nZXQoaXRlbVswXSwgaXRlbVsxXSk7XG4gICAgICAgICAgaWYgKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2dldEZpcnN0IGVycm9yOiBJbnB1dCBub3QgaW4gY29ycmVjdCBmb3JtYXQuXFxuJyArXG4gICAgICAgICAgJ1Nob3VsZCBiZTogWyBbIG9iamVjdDEsIHBvaW50ZXIxIF0sIFsgb2JqZWN0IDIsIHBvaW50ZXIyIF0sIGV0Yy4uLiBdJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgfVxuICAgIGlmIChpc01hcChpdGVtcykpIHtcbiAgICAgIGZvciAoY29uc3QgW29iamVjdCwgcG9pbnRlcl0gb2YgaXRlbXMpIHtcbiAgICAgICAgaWYgKG9iamVjdCA9PT0gbnVsbCB8fCAhdGhpcy5pc0pzb25Qb2ludGVyKHBvaW50ZXIpKSB7IGNvbnRpbnVlOyB9XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0Q29weSA/XG4gICAgICAgICAgdGhpcy5nZXRDb3B5KG9iamVjdCwgcG9pbnRlcikgOlxuICAgICAgICAgIHRoaXMuZ2V0KG9iamVjdCwgcG9pbnRlcik7XG4gICAgICAgIGlmICh2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoJ2dldEZpcnN0IGVycm9yOiBJbnB1dCBub3QgaW4gY29ycmVjdCBmb3JtYXQuXFxuJyArXG4gICAgICAnU2hvdWxkIGJlOiBbIFsgb2JqZWN0MSwgcG9pbnRlcjEgXSwgWyBvYmplY3QgMiwgcG9pbnRlcjIgXSwgZXRjLi4uIF0nKTtcbiAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqICdnZXRGaXJzdENvcHknIGZ1bmN0aW9uXG4gICAqXG4gICAqIFNpbWlsYXIgdG8gZ2V0Rmlyc3QsIGJ1dCBhbHdheXMgcmV0dXJucyBhIGNvcHkuXG4gICAqXG4gICAqIEBwYXJhbSAgeyBbb2JqZWN0LCBwb2ludGVyXVtdIH0gaXRlbXMgLSBBcnJheSBvZiBvYmplY3RzIGFuZCBwb2ludGVycyB0byBjaGVja1xuICAgKiBAcGFyYW0gIHsgYW55ID0gbnVsbCB9IGRlZmF1bHRWYWx1ZSAtIFZhbHVlIHRvIHJldHVybiBpZiBub3RoaW5nIGZvdW5kXG4gICAqIEByZXR1cm4geyBhbnkgfSAtIENvcHkgb2YgZmlyc3QgdmFsdWUgZm91bmRcbiAgICovXG4gIHN0YXRpYyBnZXRGaXJzdENvcHkoaXRlbXMsIGRlZmF1bHRWYWx1ZTogYW55ID0gbnVsbCkge1xuICAgIGNvbnN0IGZpcnN0Q29weSA9IHRoaXMuZ2V0Rmlyc3QoaXRlbXMsIGRlZmF1bHRWYWx1ZSwgdHJ1ZSk7XG4gICAgcmV0dXJuIGZpcnN0Q29weTtcbiAgfVxuXG4gIC8qKlxuICAgKiAnc2V0JyBmdW5jdGlvblxuICAgKlxuICAgKiBVc2VzIGEgSlNPTiBQb2ludGVyIHRvIHNldCBhIHZhbHVlIG9uIGFuIG9iamVjdC5cbiAgICogQWxzbyBjcmVhdGVzIGFueSBtaXNzaW5nIHN1YiBvYmplY3RzIG9yIGFycmF5cyB0byBjb250YWluIHRoYXQgdmFsdWUuXG4gICAqXG4gICAqIElmIHRoZSBvcHRpb25hbCBmb3VydGggcGFyYW1ldGVyIGlzIFRSVUUgYW5kIHRoZSBpbm5lci1tb3N0IGNvbnRhaW5lclxuICAgKiBpcyBhbiBhcnJheSwgdGhlIGZ1bmN0aW9uIHdpbGwgaW5zZXJ0IHRoZSB2YWx1ZSBhcyBhIG5ldyBpdGVtIGF0IHRoZVxuICAgKiBzcGVjaWZpZWQgbG9jYXRpb24gaW4gdGhlIGFycmF5LCByYXRoZXIgdGhhbiBvdmVyd3JpdGluZyB0aGUgZXhpc3RpbmdcbiAgICogdmFsdWUgKGlmIGFueSkgYXQgdGhhdCBsb2NhdGlvbi5cbiAgICpcbiAgICogU28gc2V0KFsxLCAyLCAzXSwgJy8xJywgNCkgPT4gWzEsIDQsIDNdXG4gICAqIGFuZFxuICAgKiBTbyBzZXQoWzEsIDIsIDNdLCAnLzEnLCA0LCB0cnVlKSA9PiBbMSwgNCwgMiwgM11cbiAgICpcbiAgICogQHBhcmFtICB7IG9iamVjdCB9IG9iamVjdCAtIFRoZSBvYmplY3QgdG8gc2V0IHZhbHVlIGluXG4gICAqIEBwYXJhbSAgeyBQb2ludGVyIH0gcG9pbnRlciAtIFRoZSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSlcbiAgICogQHBhcmFtICB7IGFueSB9IHZhbHVlIC0gVGhlIG5ldyB2YWx1ZSB0byBzZXRcbiAgICogQHBhcmFtICB7IGJvb2xlYW4gfSBpbnNlcnQgLSBpbnNlcnQgdmFsdWU/XG4gICAqIEByZXR1cm4geyBvYmplY3QgfSAtIFRoZSBvcmlnaW5hbCBvYmplY3QsIG1vZGlmaWVkIHdpdGggdGhlIHNldCB2YWx1ZVxuICAgKi9cbiAgc3RhdGljIHNldChvYmplY3QsIHBvaW50ZXIsIHZhbHVlLCBpbnNlcnQgPSBmYWxzZSkge1xuICAgIGNvbnN0IGtleUFycmF5ID0gdGhpcy5wYXJzZShwb2ludGVyKTtcbiAgICBpZiAoa2V5QXJyYXkgIT09IG51bGwgJiYga2V5QXJyYXkubGVuZ3RoKSB7XG4gICAgICBsZXQgc3ViT2JqZWN0ID0gb2JqZWN0O1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlBcnJheS5sZW5ndGggLSAxOyArK2kpIHtcbiAgICAgICAgbGV0IGtleSA9IGtleUFycmF5W2ldO1xuICAgICAgICBpZiAoa2V5ID09PSAnLScgJiYgaXNBcnJheShzdWJPYmplY3QpKSB7XG4gICAgICAgICAga2V5ID0gc3ViT2JqZWN0Lmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNNYXAoc3ViT2JqZWN0KSAmJiBzdWJPYmplY3QuaGFzKGtleSkpIHtcbiAgICAgICAgICBzdWJPYmplY3QgPSBzdWJPYmplY3QuZ2V0KGtleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCFoYXNPd24oc3ViT2JqZWN0LCBrZXkpKSB7XG4gICAgICAgICAgICBzdWJPYmplY3Rba2V5XSA9IChrZXlBcnJheVtpICsgMV0ubWF0Y2goL14oXFxkK3wtKSQvKSkgPyBbXSA6IHt9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdWJPYmplY3QgPSBzdWJPYmplY3Rba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgbGFzdEtleSA9IGtleUFycmF5W2tleUFycmF5Lmxlbmd0aCAtIDFdO1xuICAgICAgaWYgKGlzQXJyYXkoc3ViT2JqZWN0KSAmJiBsYXN0S2V5ID09PSAnLScpIHtcbiAgICAgICAgc3ViT2JqZWN0LnB1c2godmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChpbnNlcnQgJiYgaXNBcnJheShzdWJPYmplY3QpICYmICFpc05hTigrbGFzdEtleSkpIHtcbiAgICAgICAgc3ViT2JqZWN0LnNwbGljZShsYXN0S2V5LCAwLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGlzTWFwKHN1Yk9iamVjdCkpIHtcbiAgICAgICAgc3ViT2JqZWN0LnNldChsYXN0S2V5LCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdWJPYmplY3RbbGFzdEtleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoYHNldCBlcnJvcjogSW52YWxpZCBKU09OIFBvaW50ZXI6ICR7cG9pbnRlcn1gKTtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG5cbiAgLyoqXG4gICAqICdzZXRDb3B5JyBmdW5jdGlvblxuICAgKlxuICAgKiBDb3BpZXMgYW4gb2JqZWN0IGFuZCB1c2VzIGEgSlNPTiBQb2ludGVyIHRvIHNldCBhIHZhbHVlIG9uIHRoZSBjb3B5LlxuICAgKiBBbHNvIGNyZWF0ZXMgYW55IG1pc3Npbmcgc3ViIG9iamVjdHMgb3IgYXJyYXlzIHRvIGNvbnRhaW4gdGhhdCB2YWx1ZS5cbiAgICpcbiAgICogSWYgdGhlIG9wdGlvbmFsIGZvdXJ0aCBwYXJhbWV0ZXIgaXMgVFJVRSBhbmQgdGhlIGlubmVyLW1vc3QgY29udGFpbmVyXG4gICAqIGlzIGFuIGFycmF5LCB0aGUgZnVuY3Rpb24gd2lsbCBpbnNlcnQgdGhlIHZhbHVlIGFzIGEgbmV3IGl0ZW0gYXQgdGhlXG4gICAqIHNwZWNpZmllZCBsb2NhdGlvbiBpbiB0aGUgYXJyYXksIHJhdGhlciB0aGFuIG92ZXJ3cml0aW5nIHRoZSBleGlzdGluZyB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtICB7IG9iamVjdCB9IG9iamVjdCAtIFRoZSBvYmplY3QgdG8gY29weSBhbmQgc2V0IHZhbHVlIGluXG4gICAqIEBwYXJhbSAgeyBQb2ludGVyIH0gcG9pbnRlciAtIFRoZSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSlcbiAgICogQHBhcmFtICB7IGFueSB9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIHNldFxuICAgKiBAcGFyYW0gIHsgYm9vbGVhbiB9IGluc2VydCAtIGluc2VydCB2YWx1ZT9cbiAgICogQHJldHVybiB7IG9iamVjdCB9IC0gVGhlIG5ldyBvYmplY3Qgd2l0aCB0aGUgc2V0IHZhbHVlXG4gICAqL1xuICBzdGF0aWMgc2V0Q29weShvYmplY3QsIHBvaW50ZXIsIHZhbHVlLCBpbnNlcnQgPSBmYWxzZSkge1xuICAgIGNvbnN0IGtleUFycmF5ID0gdGhpcy5wYXJzZShwb2ludGVyKTtcbiAgICBpZiAoa2V5QXJyYXkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG5ld09iamVjdCA9IGNvcHkob2JqZWN0KTtcbiAgICAgIGxldCBzdWJPYmplY3QgPSBuZXdPYmplY3Q7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleUFycmF5Lmxlbmd0aCAtIDE7ICsraSkge1xuICAgICAgICBsZXQga2V5ID0ga2V5QXJyYXlbaV07XG4gICAgICAgIGlmIChrZXkgPT09ICctJyAmJiBpc0FycmF5KHN1Yk9iamVjdCkpIHtcbiAgICAgICAgICBrZXkgPSBzdWJPYmplY3QubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc01hcChzdWJPYmplY3QpICYmIHN1Yk9iamVjdC5oYXMoa2V5KSkge1xuICAgICAgICAgIHN1Yk9iamVjdC5zZXQoa2V5LCBjb3B5KHN1Yk9iamVjdC5nZXQoa2V5KSkpO1xuICAgICAgICAgIHN1Yk9iamVjdCA9IHN1Yk9iamVjdC5nZXQoa2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIWhhc093bihzdWJPYmplY3QsIGtleSkpIHtcbiAgICAgICAgICAgIHN1Yk9iamVjdFtrZXldID0gKGtleUFycmF5W2kgKyAxXS5tYXRjaCgvXihcXGQrfC0pJC8pKSA/IFtdIDoge307XG4gICAgICAgICAgfVxuICAgICAgICAgIHN1Yk9iamVjdFtrZXldID0gY29weShzdWJPYmplY3Rba2V5XSk7XG4gICAgICAgICAgc3ViT2JqZWN0ID0gc3ViT2JqZWN0W2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IGxhc3RLZXkgPSBrZXlBcnJheVtrZXlBcnJheS5sZW5ndGggLSAxXTtcbiAgICAgIGlmIChpc0FycmF5KHN1Yk9iamVjdCkgJiYgbGFzdEtleSA9PT0gJy0nKSB7XG4gICAgICAgIHN1Yk9iamVjdC5wdXNoKHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoaW5zZXJ0ICYmIGlzQXJyYXkoc3ViT2JqZWN0KSAmJiAhaXNOYU4oK2xhc3RLZXkpKSB7XG4gICAgICAgIHN1Yk9iamVjdC5zcGxpY2UobGFzdEtleSwgMCwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChpc01hcChzdWJPYmplY3QpKSB7XG4gICAgICAgIHN1Yk9iamVjdC5zZXQobGFzdEtleSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3ViT2JqZWN0W2xhc3RLZXldID0gdmFsdWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3T2JqZWN0O1xuICAgIH1cbiAgICBjb25zb2xlLmVycm9yKGBzZXRDb3B5IGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlcjogJHtwb2ludGVyfWApO1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogJ2luc2VydCcgZnVuY3Rpb25cbiAgICpcbiAgICogQ2FsbHMgJ3NldCcgd2l0aCBpbnNlcnQgPSBUUlVFXG4gICAqXG4gICAqIEBwYXJhbSAgeyBvYmplY3QgfSBvYmplY3QgLSBvYmplY3QgdG8gaW5zZXJ0IHZhbHVlIGluXG4gICAqIEBwYXJhbSAgeyBQb2ludGVyIH0gcG9pbnRlciAtIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICAgKiBAcGFyYW0gIHsgYW55IH0gdmFsdWUgLSB2YWx1ZSB0byBpbnNlcnRcbiAgICogQHJldHVybiB7IG9iamVjdCB9XG4gICAqL1xuICBzdGF0aWMgaW5zZXJ0KG9iamVjdCwgcG9pbnRlciwgdmFsdWUpIHtcbiAgICBjb25zdCB1cGRhdGVkT2JqZWN0ID0gdGhpcy5zZXQob2JqZWN0LCBwb2ludGVyLCB2YWx1ZSwgdHJ1ZSk7XG4gICAgcmV0dXJuIHVwZGF0ZWRPYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogJ2luc2VydENvcHknIGZ1bmN0aW9uXG4gICAqXG4gICAqIENhbGxzICdzZXRDb3B5JyB3aXRoIGluc2VydCA9IFRSVUVcbiAgICpcbiAgICogQHBhcmFtICB7IG9iamVjdCB9IG9iamVjdCAtIG9iamVjdCB0byBpbnNlcnQgdmFsdWUgaW5cbiAgICogQHBhcmFtICB7IFBvaW50ZXIgfSBwb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gICAqIEBwYXJhbSAgeyBhbnkgfSB2YWx1ZSAtIHZhbHVlIHRvIGluc2VydFxuICAgKiBAcmV0dXJuIHsgb2JqZWN0IH1cbiAgICovXG4gIHN0YXRpYyBpbnNlcnRDb3B5KG9iamVjdCwgcG9pbnRlciwgdmFsdWUpIHtcbiAgICBjb25zdCB1cGRhdGVkT2JqZWN0ID0gdGhpcy5zZXRDb3B5KG9iamVjdCwgcG9pbnRlciwgdmFsdWUsIHRydWUpO1xuICAgIHJldHVybiB1cGRhdGVkT2JqZWN0O1xuICB9XG5cbiAgLyoqXG4gICAqICdyZW1vdmUnIGZ1bmN0aW9uXG4gICAqXG4gICAqIFVzZXMgYSBKU09OIFBvaW50ZXIgdG8gcmVtb3ZlIGEga2V5IGFuZCBpdHMgYXR0cmlidXRlIGZyb20gYW4gb2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSAgeyBvYmplY3QgfSBvYmplY3QgLSBvYmplY3QgdG8gZGVsZXRlIGF0dHJpYnV0ZSBmcm9tXG4gICAqIEBwYXJhbSAgeyBQb2ludGVyIH0gcG9pbnRlciAtIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICAgKiBAcmV0dXJuIHsgb2JqZWN0IH1cbiAgICovXG4gIHN0YXRpYyByZW1vdmUob2JqZWN0LCBwb2ludGVyKSB7XG4gICAgY29uc3Qga2V5QXJyYXkgPSB0aGlzLnBhcnNlKHBvaW50ZXIpO1xuICAgIGlmIChrZXlBcnJheSAhPT0gbnVsbCAmJiBrZXlBcnJheS5sZW5ndGgpIHtcbiAgICAgIGxldCBsYXN0S2V5ID0ga2V5QXJyYXkucG9wKCk7XG4gICAgICBjb25zdCBwYXJlbnRPYmplY3QgPSB0aGlzLmdldChvYmplY3QsIGtleUFycmF5KTtcbiAgICAgIGlmIChpc0FycmF5KHBhcmVudE9iamVjdCkpIHtcbiAgICAgICAgaWYgKGxhc3RLZXkgPT09ICctJykgeyBsYXN0S2V5ID0gcGFyZW50T2JqZWN0Lmxlbmd0aCAtIDE7IH1cbiAgICAgICAgcGFyZW50T2JqZWN0LnNwbGljZShsYXN0S2V5LCAxKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QocGFyZW50T2JqZWN0KSkge1xuICAgICAgICBkZWxldGUgcGFyZW50T2JqZWN0W2xhc3RLZXldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG4gICAgY29uc29sZS5lcnJvcihgcmVtb3ZlIGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlcjogJHtwb2ludGVyfWApO1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogJ2hhcycgZnVuY3Rpb25cbiAgICpcbiAgICogVGVzdHMgaWYgYW4gb2JqZWN0IGhhcyBhIHZhbHVlIGF0IHRoZSBsb2NhdGlvbiBzcGVjaWZpZWQgYnkgYSBKU09OIFBvaW50ZXJcbiAgICpcbiAgICogQHBhcmFtICB7IG9iamVjdCB9IG9iamVjdCAtIG9iamVjdCB0byBjaGVrIGZvciB2YWx1ZVxuICAgKiBAcGFyYW0gIHsgUG9pbnRlciB9IHBvaW50ZXIgLSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSlcbiAgICogQHJldHVybiB7IGJvb2xlYW4gfVxuICAgKi9cbiAgc3RhdGljIGhhcyhvYmplY3QsIHBvaW50ZXIpIHtcbiAgICBjb25zdCBoYXNWYWx1ZSA9IHRoaXMuZ2V0KG9iamVjdCwgcG9pbnRlciwgMCwgbnVsbCwgdHJ1ZSk7XG4gICAgcmV0dXJuIGhhc1ZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqICdkaWN0JyBmdW5jdGlvblxuICAgKlxuICAgKiBSZXR1cm5zIGEgKHBvaW50ZXIgLT4gdmFsdWUpIGRpY3Rpb25hcnkgZm9yIGFuIG9iamVjdFxuICAgKlxuICAgKiBAcGFyYW0gIHsgb2JqZWN0IH0gb2JqZWN0IC0gVGhlIG9iamVjdCB0byBjcmVhdGUgYSBkaWN0aW9uYXJ5IGZyb21cbiAgICogQHJldHVybiB7IG9iamVjdCB9IC0gVGhlIHJlc3VsdGluZyBkaWN0aW9uYXJ5IG9iamVjdFxuICAgKi9cbiAgc3RhdGljIGRpY3Qob2JqZWN0KSB7XG4gICAgY29uc3QgcmVzdWx0czogYW55ID0ge307XG4gICAgdGhpcy5mb3JFYWNoRGVlcChvYmplY3QsICh2YWx1ZSwgcG9pbnRlcikgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHsgcmVzdWx0c1twb2ludGVyXSA9IHZhbHVlOyB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICAvKipcbiAgICogJ2ZvckVhY2hEZWVwJyBmdW5jdGlvblxuICAgKlxuICAgKiBJdGVyYXRlcyBvdmVyIG93biBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgYW4gb2JqZWN0IG9yIGl0ZW1zIGluIGFuIGFycmF5XG4gICAqIGFuZCBpbnZva2VzIGFuIGl0ZXJhdGVlIGZ1bmN0aW9uIGZvciBlYWNoIGtleS92YWx1ZSBvciBpbmRleC92YWx1ZSBwYWlyLlxuICAgKiBCeSBkZWZhdWx0LCBpdGVyYXRlcyBvdmVyIGl0ZW1zIHdpdGhpbiBvYmplY3RzIGFuZCBhcnJheXMgYWZ0ZXIgY2FsbGluZ1xuICAgKiB0aGUgaXRlcmF0ZWUgZnVuY3Rpb24gb24gdGhlIGNvbnRhaW5pbmcgb2JqZWN0IG9yIGFycmF5IGl0c2VsZi5cbiAgICpcbiAgICogVGhlIGl0ZXJhdGVlIGlzIGludm9rZWQgd2l0aCB0aHJlZSBhcmd1bWVudHM6ICh2YWx1ZSwgcG9pbnRlciwgcm9vdE9iamVjdCksXG4gICAqIHdoZXJlIHBvaW50ZXIgaXMgYSBKU09OIHBvaW50ZXIgaW5kaWNhdGluZyB0aGUgbG9jYXRpb24gb2YgdGhlIGN1cnJlbnRcbiAgICogdmFsdWUgd2l0aGluIHRoZSByb290IG9iamVjdCwgYW5kIHJvb3RPYmplY3QgaXMgdGhlIHJvb3Qgb2JqZWN0IGluaXRpYWxseVxuICAgKiBzdWJtaXR0ZWQgdG8gdGggZnVuY3Rpb24uXG4gICAqXG4gICAqIElmIGEgdGhpcmQgb3B0aW9uYWwgcGFyYW1ldGVyICdib3R0b21VcCcgaXMgc2V0IHRvIFRSVUUsIHRoZSBpdGVyYXRvclxuICAgKiBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBvbiBzdWItb2JqZWN0cyBhbmQgYXJyYXlzIGFmdGVyIGJlaW5nXG4gICAqIGNhbGxlZCBvbiB0aGVpciBjb250ZW50cywgcmF0aGVyIHRoYW4gYmVmb3JlLCB3aGljaCBpcyB0aGUgZGVmYXVsdC5cbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbiBjYW4gYWxzbyBvcHRpb25hbGx5IGJlIGNhbGxlZCBkaXJlY3RseSBvbiBhIHN1Yi1vYmplY3QgYnlcbiAgICogaW5jbHVkaW5nIG9wdGlvbmFsIDR0aCBhbmQgNXRoIHBhcmFtZXRlcnNzIHRvIHNwZWNpZnkgdGhlIGluaXRpYWxcbiAgICogcm9vdCBvYmplY3QgYW5kIHBvaW50ZXIuXG4gICAqXG4gICAqIEBwYXJhbSAgeyBvYmplY3QgfSBvYmplY3QgLSB0aGUgaW5pdGlhbCBvYmplY3Qgb3IgYXJyYXlcbiAgICogQHBhcmFtICB7ICh2OiBhbnksIHA/OiBzdHJpbmcsIG8/OiBhbnkpID0+IGFueSB9IGZ1bmN0aW9uIC0gaXRlcmF0ZWUgZnVuY3Rpb25cbiAgICogQHBhcmFtICB7IGJvb2xlYW4gPSBmYWxzZSB9IGJvdHRvbVVwIC0gb3B0aW9uYWwsIHNldCB0byBUUlVFIHRvIHJldmVyc2UgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSAgeyBvYmplY3QgPSBvYmplY3QgfSByb290T2JqZWN0IC0gb3B0aW9uYWwsIHJvb3Qgb2JqZWN0IG9yIGFycmF5XG4gICAqIEBwYXJhbSAgeyBzdHJpbmcgPSAnJyB9IHBvaW50ZXIgLSBvcHRpb25hbCwgSlNPTiBQb2ludGVyIHRvIG9iamVjdCB3aXRoaW4gcm9vdE9iamVjdFxuICAgKiBAcmV0dXJuIHsgb2JqZWN0IH0gLSBUaGUgbW9kaWZpZWQgb2JqZWN0XG4gICAqL1xuICBzdGF0aWMgZm9yRWFjaERlZXAoXG4gICAgb2JqZWN0LCBmbjogKHY6IGFueSwgcD86IHN0cmluZywgbz86IGFueSkgPT4gYW55ID0gKHYpID0+IHYsXG4gICAgYm90dG9tVXAgPSBmYWxzZSwgcG9pbnRlciA9ICcnLCByb290T2JqZWN0ID0gb2JqZWN0XG4gICkge1xuICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYGZvckVhY2hEZWVwIGVycm9yOiBJdGVyYXRvciBpcyBub3QgYSBmdW5jdGlvbjpgLCBmbik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghYm90dG9tVXApIHsgZm4ob2JqZWN0LCBwb2ludGVyLCByb290T2JqZWN0KTsgfVxuICAgIGlmIChpc09iamVjdChvYmplY3QpIHx8IGlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMob2JqZWN0KSkge1xuICAgICAgICBjb25zdCBuZXdQb2ludGVyID0gcG9pbnRlciArICcvJyArIHRoaXMuZXNjYXBlKGtleSk7XG4gICAgICAgIHRoaXMuZm9yRWFjaERlZXAob2JqZWN0W2tleV0sIGZuLCBib3R0b21VcCwgbmV3UG9pbnRlciwgcm9vdE9iamVjdCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChib3R0b21VcCkgeyBmbihvYmplY3QsIHBvaW50ZXIsIHJvb3RPYmplY3QpOyB9XG4gIH1cblxuICAvKipcbiAgICogJ2ZvckVhY2hEZWVwQ29weScgZnVuY3Rpb25cbiAgICpcbiAgICogU2ltaWxhciB0byBmb3JFYWNoRGVlcCwgYnV0IHJldHVybnMgYSBjb3B5IG9mIHRoZSBvcmlnaW5hbCBvYmplY3QsIHdpdGhcbiAgICogdGhlIHNhbWUga2V5cyBhbmQgaW5kZXhlcywgYnV0IHdpdGggdmFsdWVzIHJlcGxhY2VkIHdpdGggdGhlIHJlc3VsdCBvZlxuICAgKiB0aGUgaXRlcmF0ZWUgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSAgeyBvYmplY3QgfSBvYmplY3QgLSB0aGUgaW5pdGlhbCBvYmplY3Qgb3IgYXJyYXlcbiAgICogQHBhcmFtICB7ICh2OiBhbnksIGs/OiBzdHJpbmcsIG8/OiBhbnksIHA/OiBhbnkpID0+IGFueSB9IGZ1bmN0aW9uIC0gaXRlcmF0ZWUgZnVuY3Rpb25cbiAgICogQHBhcmFtICB7IGJvb2xlYW4gPSBmYWxzZSB9IGJvdHRvbVVwIC0gb3B0aW9uYWwsIHNldCB0byBUUlVFIHRvIHJldmVyc2UgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSAgeyBvYmplY3QgPSBvYmplY3QgfSByb290T2JqZWN0IC0gb3B0aW9uYWwsIHJvb3Qgb2JqZWN0IG9yIGFycmF5XG4gICAqIEBwYXJhbSAgeyBzdHJpbmcgPSAnJyB9IHBvaW50ZXIgLSBvcHRpb25hbCwgSlNPTiBQb2ludGVyIHRvIG9iamVjdCB3aXRoaW4gcm9vdE9iamVjdFxuICAgKiBAcmV0dXJuIHsgb2JqZWN0IH0gLSBUaGUgY29waWVkIG9iamVjdFxuICAgKi9cbiAgc3RhdGljIGZvckVhY2hEZWVwQ29weShcbiAgICBvYmplY3QsIGZuOiAodjogYW55LCBwPzogc3RyaW5nLCBvPzogYW55KSA9PiBhbnkgPSAodikgPT4gdixcbiAgICBib3R0b21VcCA9IGZhbHNlLCBwb2ludGVyID0gJycsIHJvb3RPYmplY3QgPSBvYmplY3RcbiAgKSB7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS5lcnJvcihgZm9yRWFjaERlZXBDb3B5IGVycm9yOiBJdGVyYXRvciBpcyBub3QgYSBmdW5jdGlvbjpgLCBmbik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKGlzT2JqZWN0KG9iamVjdCkgfHwgaXNBcnJheShvYmplY3QpKSB7XG4gICAgICBsZXQgbmV3T2JqZWN0ID0gaXNBcnJheShvYmplY3QpID8gWyAuLi5vYmplY3QgXSA6IHsgLi4ub2JqZWN0IH07XG4gICAgICBpZiAoIWJvdHRvbVVwKSB7IG5ld09iamVjdCA9IGZuKG5ld09iamVjdCwgcG9pbnRlciwgcm9vdE9iamVjdCk7IH1cbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG5ld09iamVjdCkpIHtcbiAgICAgICAgY29uc3QgbmV3UG9pbnRlciA9IHBvaW50ZXIgKyAnLycgKyB0aGlzLmVzY2FwZShrZXkpO1xuICAgICAgICBuZXdPYmplY3Rba2V5XSA9IHRoaXMuZm9yRWFjaERlZXBDb3B5KFxuICAgICAgICAgIG5ld09iamVjdFtrZXldLCBmbiwgYm90dG9tVXAsIG5ld1BvaW50ZXIsIHJvb3RPYmplY3RcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChib3R0b21VcCkgeyBuZXdPYmplY3QgPSBmbihuZXdPYmplY3QsIHBvaW50ZXIsIHJvb3RPYmplY3QpOyB9XG4gICAgICByZXR1cm4gbmV3T2JqZWN0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZm4ob2JqZWN0LCBwb2ludGVyLCByb290T2JqZWN0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ2VzY2FwZScgZnVuY3Rpb25cbiAgICpcbiAgICogRXNjYXBlcyBhIHN0cmluZyByZWZlcmVuY2Uga2V5XG4gICAqXG4gICAqIEBwYXJhbSAgeyBzdHJpbmcgfSBrZXkgLSBzdHJpbmcga2V5IHRvIGVzY2FwZVxuICAgKiBAcmV0dXJuIHsgc3RyaW5nIH0gLSBlc2NhcGVkIGtleVxuICAgKi9cbiAgc3RhdGljIGVzY2FwZShrZXkpIHtcbiAgICBjb25zdCBlc2NhcGVkID0ga2V5LnRvU3RyaW5nKCkucmVwbGFjZSgvfi9nLCAnfjAnKS5yZXBsYWNlKC9cXC8vZywgJ34xJyk7XG4gICAgcmV0dXJuIGVzY2FwZWQ7XG4gIH1cblxuICAvKipcbiAgICogJ3VuZXNjYXBlJyBmdW5jdGlvblxuICAgKlxuICAgKiBVbmVzY2FwZXMgYSBzdHJpbmcgcmVmZXJlbmNlIGtleVxuICAgKlxuICAgKiBAcGFyYW0gIHsgc3RyaW5nIH0ga2V5IC0gc3RyaW5nIGtleSB0byB1bmVzY2FwZVxuICAgKiBAcmV0dXJuIHsgc3RyaW5nIH0gLSB1bmVzY2FwZWQga2V5XG4gICAqL1xuICBzdGF0aWMgdW5lc2NhcGUoa2V5KSB7XG4gICAgY29uc3QgdW5lc2NhcGVkID0ga2V5LnRvU3RyaW5nKCkucmVwbGFjZSgvfjEvZywgJy8nKS5yZXBsYWNlKC9+MC9nLCAnficpO1xuICAgIHJldHVybiB1bmVzY2FwZWQ7XG4gIH1cblxuICAvKipcbiAgICogJ3BhcnNlJyBmdW5jdGlvblxuICAgKlxuICAgKiBDb252ZXJ0cyBhIHN0cmluZyBKU09OIFBvaW50ZXIgaW50byBhIGFycmF5IG9mIGtleXNcbiAgICogKGlmIGlucHV0IGlzIGFscmVhZHkgYW4gYW4gYXJyYXkgb2Yga2V5cywgaXQgaXMgcmV0dXJuZWQgdW5jaGFuZ2VkKVxuICAgKlxuICAgKiBAcGFyYW0gIHsgUG9pbnRlciB9IHBvaW50ZXIgLSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSlcbiAgICogQHBhcmFtICB7IGJvb2xlYW4gPSBmYWxzZSB9IGVycm9ycyAtIFNob3cgZXJyb3IgaWYgaW52YWxpZCBwb2ludGVyP1xuICAgKiBAcmV0dXJuIHsgc3RyaW5nW10gfSAtIEpTT04gUG9pbnRlciBhcnJheSBvZiBrZXlzXG4gICAqL1xuICBzdGF0aWMgcGFyc2UocG9pbnRlciwgZXJyb3JzID0gZmFsc2UpIHtcbiAgICBpZiAoIXRoaXMuaXNKc29uUG9pbnRlcihwb2ludGVyKSkge1xuICAgICAgaWYgKGVycm9ycykgeyBjb25zb2xlLmVycm9yKGBwYXJzZSBlcnJvcjogSW52YWxpZCBKU09OIFBvaW50ZXI6ICR7cG9pbnRlcn1gKTsgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChpc0FycmF5KHBvaW50ZXIpKSB7IHJldHVybiA8c3RyaW5nW10+cG9pbnRlcjsgfVxuICAgIGlmICh0eXBlb2YgcG9pbnRlciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmICgoPHN0cmluZz5wb2ludGVyKVswXSA9PT0gJyMnKSB7IHBvaW50ZXIgPSBwb2ludGVyLnNsaWNlKDEpOyB9XG4gICAgICBpZiAoPHN0cmluZz5wb2ludGVyID09PSAnJyB8fCA8c3RyaW5nPnBvaW50ZXIgPT09ICcvJykgeyByZXR1cm4gW107IH1cbiAgICAgIHJldHVybiAoPHN0cmluZz5wb2ludGVyKS5zbGljZSgxKS5zcGxpdCgnLycpLm1hcCh0aGlzLnVuZXNjYXBlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ2NvbXBpbGUnIGZ1bmN0aW9uXG4gICAqXG4gICAqIENvbnZlcnRzIGFuIGFycmF5IG9mIGtleXMgaW50byBhIEpTT04gUG9pbnRlciBzdHJpbmdcbiAgICogKGlmIGlucHV0IGlzIGFscmVhZHkgYSBzdHJpbmcsIGl0IGlzIG5vcm1hbGl6ZWQgYW5kIHJldHVybmVkKVxuICAgKlxuICAgKiBUaGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlciBpcyBhIGRlZmF1bHQgd2hpY2ggd2lsbCByZXBsYWNlIGFueSBlbXB0eSBrZXlzLlxuICAgKlxuICAgKiBAcGFyYW0gIHsgUG9pbnRlciB9IHBvaW50ZXIgLSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSlcbiAgICogQHBhcmFtICB7IHN0cmluZyB8IG51bWJlciA9ICcnIH0gZGVmYXVsdFZhbHVlIC0gRGVmYXVsdCB2YWx1ZVxuICAgKiBAcGFyYW0gIHsgYm9vbGVhbiA9IGZhbHNlIH0gZXJyb3JzIC0gU2hvdyBlcnJvciBpZiBpbnZhbGlkIHBvaW50ZXI/XG4gICAqIEByZXR1cm4geyBzdHJpbmcgfSAtIEpTT04gUG9pbnRlciBzdHJpbmdcbiAgICovXG4gIHN0YXRpYyBjb21waWxlKHBvaW50ZXIsIGRlZmF1bHRWYWx1ZSA9ICcnLCBlcnJvcnMgPSBmYWxzZSkge1xuICAgIGlmIChwb2ludGVyID09PSAnIycpIHsgcmV0dXJuICcnOyB9XG4gICAgaWYgKCF0aGlzLmlzSnNvblBvaW50ZXIocG9pbnRlcikpIHtcbiAgICAgIGlmIChlcnJvcnMpIHsgY29uc29sZS5lcnJvcihgY29tcGlsZSBlcnJvcjogSW52YWxpZCBKU09OIFBvaW50ZXI6ICR7cG9pbnRlcn1gKTsgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChpc0FycmF5KHBvaW50ZXIpKSB7XG4gICAgICBpZiAoKDxzdHJpbmdbXT5wb2ludGVyKS5sZW5ndGggPT09IDApIHsgcmV0dXJuICcnOyB9XG4gICAgICByZXR1cm4gJy8nICsgKDxzdHJpbmdbXT5wb2ludGVyKS5tYXAoXG4gICAgICAgIGtleSA9PiBrZXkgPT09ICcnID8gZGVmYXVsdFZhbHVlIDogdGhpcy5lc2NhcGUoa2V5KVxuICAgICAgKS5qb2luKCcvJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcG9pbnRlciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChwb2ludGVyWzBdID09PSAnIycpIHsgcG9pbnRlciA9IHBvaW50ZXIuc2xpY2UoMSk7IH1cbiAgICAgIHJldHVybiBwb2ludGVyO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAndG9LZXknIGZ1bmN0aW9uXG4gICAqXG4gICAqIEV4dHJhY3RzIG5hbWUgb2YgdGhlIGZpbmFsIGtleSBmcm9tIGEgSlNPTiBQb2ludGVyLlxuICAgKlxuICAgKiBAcGFyYW0gIHsgUG9pbnRlciB9IHBvaW50ZXIgLSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSlcbiAgICogQHBhcmFtICB7IGJvb2xlYW4gPSBmYWxzZSB9IGVycm9ycyAtIFNob3cgZXJyb3IgaWYgaW52YWxpZCBwb2ludGVyP1xuICAgKiBAcmV0dXJuIHsgc3RyaW5nIH0gLSB0aGUgZXh0cmFjdGVkIGtleVxuICAgKi9cbiAgc3RhdGljIHRvS2V5KHBvaW50ZXIsIGVycm9ycyA9IGZhbHNlKSB7XG4gICAgY29uc3Qga2V5QXJyYXkgPSB0aGlzLnBhcnNlKHBvaW50ZXIsIGVycm9ycyk7XG4gICAgaWYgKGtleUFycmF5ID09PSBudWxsKSB7IHJldHVybiBudWxsOyB9XG4gICAgaWYgKCFrZXlBcnJheS5sZW5ndGgpIHsgcmV0dXJuICcnOyB9XG4gICAgcmV0dXJuIGtleUFycmF5W2tleUFycmF5Lmxlbmd0aCAtIDFdO1xuICB9XG5cbiAgLyoqXG4gICAqICdpc0pzb25Qb2ludGVyJyBmdW5jdGlvblxuICAgKlxuICAgKiBDaGVja3MgYSBzdHJpbmcgb3IgYXJyYXkgdmFsdWUgdG8gZGV0ZXJtaW5lIGlmIGl0IGlzIGEgdmFsaWQgSlNPTiBQb2ludGVyLlxuICAgKiBSZXR1cm5zIHRydWUgaWYgYSBzdHJpbmcgaXMgZW1wdHksIG9yIHN0YXJ0cyB3aXRoICcvJyBvciAnIy8nLlxuICAgKiBSZXR1cm5zIHRydWUgaWYgYW4gYXJyYXkgY29udGFpbnMgb25seSBzdHJpbmcgdmFsdWVzLlxuICAgKlxuICAgKiBAcGFyYW0gIHsgYW55IH0gdmFsdWUgLSB2YWx1ZSB0byBjaGVja1xuICAgKiBAcmV0dXJuIHsgYm9vbGVhbiB9IC0gdHJ1ZSBpZiB2YWx1ZSBpcyBhIHZhbGlkIEpTT04gUG9pbnRlciwgb3RoZXJ3aXNlIGZhbHNlXG4gICAqL1xuICBzdGF0aWMgaXNKc29uUG9pbnRlcih2YWx1ZSkge1xuICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLmV2ZXJ5KGtleSA9PiB0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyk7XG4gICAgfSBlbHNlIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09ICcjJykgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgaWYgKHZhbHVlWzBdID09PSAnLycgfHwgdmFsdWUuc2xpY2UoMCwgMikgPT09ICcjLycpIHtcbiAgICAgICAgcmV0dXJuICEvKH5bXjAxXXx+JCkvZy50ZXN0KHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqICdpc1N1YlBvaW50ZXInIGZ1bmN0aW9uXG4gICAqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9uZSBKU09OIFBvaW50ZXIgaXMgYSBzdWJzZXQgb2YgYW5vdGhlci5cbiAgICpcbiAgICogQHBhcmFtICB7IFBvaW50ZXIgfSBzaG9ydFBvaW50ZXIgLSBwb3RlbnRpYWwgc3Vic2V0IEpTT04gUG9pbnRlclxuICAgKiBAcGFyYW0gIHsgUG9pbnRlciB9IGxvbmdQb2ludGVyIC0gcG90ZW50aWFsIHN1cGVyc2V0IEpTT04gUG9pbnRlclxuICAgKiBAcGFyYW0gIHsgYm9vbGVhbiA9IGZhbHNlIH0gdHJ1ZUlmTWF0Y2hpbmcgLSByZXR1cm4gdHJ1ZSBpZiBwb2ludGVycyBtYXRjaD9cbiAgICogQHBhcmFtICB7IGJvb2xlYW4gPSBmYWxzZSB9IGVycm9ycyAtIFNob3cgZXJyb3IgaWYgaW52YWxpZCBwb2ludGVyP1xuICAgKiBAcmV0dXJuIHsgYm9vbGVhbiB9IC0gdHJ1ZSBpZiBzaG9ydFBvaW50ZXIgaXMgYSBzdWJzZXQgb2YgbG9uZ1BvaW50ZXIsIGZhbHNlIGlmIG5vdFxuICAgKi9cbiAgc3RhdGljIGlzU3ViUG9pbnRlcihcbiAgICBzaG9ydFBvaW50ZXIsIGxvbmdQb2ludGVyLCB0cnVlSWZNYXRjaGluZyA9IGZhbHNlLCBlcnJvcnMgPSBmYWxzZVxuICApIHtcbiAgICBpZiAoIXRoaXMuaXNKc29uUG9pbnRlcihzaG9ydFBvaW50ZXIpIHx8ICF0aGlzLmlzSnNvblBvaW50ZXIobG9uZ1BvaW50ZXIpKSB7XG4gICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgIGxldCBpbnZhbGlkID0gJyc7XG4gICAgICAgIGlmICghdGhpcy5pc0pzb25Qb2ludGVyKHNob3J0UG9pbnRlcikpIHsgaW52YWxpZCArPSBgIDE6ICR7c2hvcnRQb2ludGVyfWA7IH1cbiAgICAgICAgaWYgKCF0aGlzLmlzSnNvblBvaW50ZXIobG9uZ1BvaW50ZXIpKSB7IGludmFsaWQgKz0gYCAyOiAke2xvbmdQb2ludGVyfWA7IH1cbiAgICAgICAgY29uc29sZS5lcnJvcihgaXNTdWJQb2ludGVyIGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlciAke2ludmFsaWR9YCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNob3J0UG9pbnRlciA9IHRoaXMuY29tcGlsZShzaG9ydFBvaW50ZXIsICcnLCBlcnJvcnMpO1xuICAgIGxvbmdQb2ludGVyID0gdGhpcy5jb21waWxlKGxvbmdQb2ludGVyLCAnJywgZXJyb3JzKTtcbiAgICByZXR1cm4gc2hvcnRQb2ludGVyID09PSBsb25nUG9pbnRlciA/IHRydWVJZk1hdGNoaW5nIDpcbiAgICAgIGAke3Nob3J0UG9pbnRlcn0vYCA9PT0gbG9uZ1BvaW50ZXIuc2xpY2UoMCwgc2hvcnRQb2ludGVyLmxlbmd0aCArIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqICd0b0luZGV4ZWRQb2ludGVyJyBmdW5jdGlvblxuICAgKlxuICAgKiBNZXJnZXMgYW4gYXJyYXkgb2YgbnVtZXJpYyBpbmRleGVzIGFuZCBhIGdlbmVyaWMgcG9pbnRlciB0byBjcmVhdGUgYW5cbiAgICogaW5kZXhlZCBwb2ludGVyIGZvciBhIHNwZWNpZmljIGl0ZW0uXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCBtZXJnaW5nIHRoZSBnZW5lcmljIHBvaW50ZXIgJy9mb28vLS9iYXIvLS9iYXonIGFuZFxuICAgKiB0aGUgYXJyYXkgWzQsIDJdIHdvdWxkIHJlc3VsdCBpbiB0aGUgaW5kZXhlZCBwb2ludGVyICcvZm9vLzQvYmFyLzIvYmF6J1xuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtICB7IFBvaW50ZXIgfSBnZW5lcmljUG9pbnRlciAtIFRoZSBnZW5lcmljIHBvaW50ZXJcbiAgICogQHBhcmFtICB7IG51bWJlcltdIH0gaW5kZXhBcnJheSAtIFRoZSBhcnJheSBvZiBudW1lcmljIGluZGV4ZXNcbiAgICogQHBhcmFtICB7IE1hcDxzdHJpbmcsIG51bWJlcj4gfSBhcnJheU1hcCAtIEFuIG9wdGlvbmFsIGFycmF5IG1hcFxuICAgKiBAcmV0dXJuIHsgc3RyaW5nIH0gLSBUaGUgbWVyZ2VkIHBvaW50ZXIgd2l0aCBpbmRleGVzXG4gICAqL1xuICBzdGF0aWMgdG9JbmRleGVkUG9pbnRlcihcbiAgICBnZW5lcmljUG9pbnRlciwgaW5kZXhBcnJheSwgYXJyYXlNYXA6IE1hcDxzdHJpbmcsIG51bWJlcj4gPSBudWxsXG4gICkge1xuICAgIGlmICh0aGlzLmlzSnNvblBvaW50ZXIoZ2VuZXJpY1BvaW50ZXIpICYmIGlzQXJyYXkoaW5kZXhBcnJheSkpIHtcbiAgICAgIGxldCBpbmRleGVkUG9pbnRlciA9IHRoaXMuY29tcGlsZShnZW5lcmljUG9pbnRlcik7XG4gICAgICBpZiAoaXNNYXAoYXJyYXlNYXApKSB7XG4gICAgICAgIGxldCBhcnJheUluZGV4ID0gMDtcbiAgICAgICAgcmV0dXJuIGluZGV4ZWRQb2ludGVyLnJlcGxhY2UoL1xcL1xcLSg/PVxcL3wkKS9nLCAoa2V5LCBzdHJpbmdJbmRleCkgPT5cbiAgICAgICAgICBhcnJheU1hcC5oYXMoKDxzdHJpbmc+aW5kZXhlZFBvaW50ZXIpLnNsaWNlKDAsIHN0cmluZ0luZGV4KSkgP1xuICAgICAgICAgICAgJy8nICsgaW5kZXhBcnJheVthcnJheUluZGV4KytdIDoga2V5XG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGNvbnN0IHBvaW50ZXJJbmRleCBvZiBpbmRleEFycmF5KSB7XG4gICAgICAgICAgaW5kZXhlZFBvaW50ZXIgPSBpbmRleGVkUG9pbnRlci5yZXBsYWNlKCcvLScsICcvJyArIHBvaW50ZXJJbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluZGV4ZWRQb2ludGVyO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNKc29uUG9pbnRlcihnZW5lcmljUG9pbnRlcikpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYHRvSW5kZXhlZFBvaW50ZXIgZXJyb3I6IEludmFsaWQgSlNPTiBQb2ludGVyOiAke2dlbmVyaWNQb2ludGVyfWApO1xuICAgIH1cbiAgICBpZiAoIWlzQXJyYXkoaW5kZXhBcnJheSkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYHRvSW5kZXhlZFBvaW50ZXIgZXJyb3I6IEludmFsaWQgaW5kZXhBcnJheTogJHtpbmRleEFycmF5fWApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAndG9HZW5lcmljUG9pbnRlcicgZnVuY3Rpb25cbiAgICpcbiAgICogQ29tcGFyZXMgYW4gaW5kZXhlZCBwb2ludGVyIHRvIGFuIGFycmF5IG1hcCBhbmQgcmVtb3ZlcyBsaXN0IGFycmF5XG4gICAqIGluZGV4ZXMgKGJ1dCBsZWF2ZXMgdHVwbGUgYXJycmF5IGluZGV4ZXMgYW5kIGFsbCBvYmplY3Qga2V5cywgaW5jbHVkaW5nXG4gICAqIG51bWVyaWMga2V5cykgdG8gY3JlYXRlIGEgZ2VuZXJpYyBwb2ludGVyLlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgdXNpbmcgdGhlIGluZGV4ZWQgcG9pbnRlciAnL2Zvby8xL2Jhci8yL2Jhei8zJyBhbmRcbiAgICogdGhlIGFycmF5TWFwIFtbJy9mb28nLCAwXSwgWycvZm9vLy0vYmFyJywgM10sIFsnL2Zvby8tL2Jhci8tL2JheicsIDBdXVxuICAgKiB3b3VsZCByZXN1bHQgaW4gdGhlIGdlbmVyaWMgcG9pbnRlciAnL2Zvby8tL2Jhci8yL2Jhei8tJ1xuICAgKiBVc2luZyB0aGUgaW5kZXhlZCBwb2ludGVyICcvZm9vLzEvYmFyLzQvYmF6LzMnIGFuZCB0aGUgc2FtZSBhcnJheU1hcFxuICAgKiB3b3VsZCByZXN1bHQgaW4gdGhlIGdlbmVyaWMgcG9pbnRlciAnL2Zvby8tL2Jhci8tL2Jhei8tJ1xuICAgKiAodGhlIGJhciBhcnJheSBoYXMgMyB0dXBsZSBpdGVtcywgc28gaW5kZXggMiBpcyByZXRhaW5lZCwgYnV0IDQgaXMgcmVtb3ZlZClcbiAgICpcbiAgICogVGhlIHN0cnVjdHVyZSBvZiB0aGUgYXJyYXlNYXAgaXM6IFtbJ3BhdGggdG8gYXJyYXknLCBudW1iZXIgb2YgdHVwbGUgaXRlbXNdLi4uXVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtICB7IFBvaW50ZXIgfSBpbmRleGVkUG9pbnRlciAtIFRoZSBpbmRleGVkIHBvaW50ZXIgKGFycmF5IG9yIHN0cmluZylcbiAgICogQHBhcmFtICB7IE1hcDxzdHJpbmcsIG51bWJlcj4gfSBhcnJheU1hcCAtIFRoZSBvcHRpb25hbCBhcnJheSBtYXAgKGZvciBwcmVzZXJ2aW5nIHR1cGxlIGluZGV4ZXMpXG4gICAqIEByZXR1cm4geyBzdHJpbmcgfSAtIFRoZSBnZW5lcmljIHBvaW50ZXIgd2l0aCBpbmRleGVzIHJlbW92ZWRcbiAgICovXG4gIHN0YXRpYyB0b0dlbmVyaWNQb2ludGVyKGluZGV4ZWRQb2ludGVyLCBhcnJheU1hcCA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCkpIHtcbiAgICBpZiAodGhpcy5pc0pzb25Qb2ludGVyKGluZGV4ZWRQb2ludGVyKSAmJiBpc01hcChhcnJheU1hcCkpIHtcbiAgICAgIGNvbnN0IHBvaW50ZXJBcnJheSA9IHRoaXMucGFyc2UoaW5kZXhlZFBvaW50ZXIpO1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBwb2ludGVyQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3ViUG9pbnRlciA9IHRoaXMuY29tcGlsZShwb2ludGVyQXJyYXkuc2xpY2UoMCwgaSkpO1xuICAgICAgICBpZiAoYXJyYXlNYXAuaGFzKHN1YlBvaW50ZXIpICYmXG4gICAgICAgICAgYXJyYXlNYXAuZ2V0KHN1YlBvaW50ZXIpIDw9ICtwb2ludGVyQXJyYXlbaV1cbiAgICAgICAgKSB7XG4gICAgICAgICAgcG9pbnRlckFycmF5W2ldID0gJy0nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5jb21waWxlKHBvaW50ZXJBcnJheSk7XG4gICAgfVxuICAgIGlmICghdGhpcy5pc0pzb25Qb2ludGVyKGluZGV4ZWRQb2ludGVyKSkge1xuICAgICAgY29uc29sZS5lcnJvcihgdG9HZW5lcmljUG9pbnRlciBlcnJvcjogaW52YWxpZCBKU09OIFBvaW50ZXI6ICR7aW5kZXhlZFBvaW50ZXJ9YCk7XG4gICAgfVxuICAgIGlmICghaXNNYXAoYXJyYXlNYXApKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGB0b0dlbmVyaWNQb2ludGVyIGVycm9yOiBpbnZhbGlkIGFycmF5TWFwOiAke2FycmF5TWFwfWApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAndG9Db250cm9sUG9pbnRlcicgZnVuY3Rpb25cbiAgICpcbiAgICogQWNjZXB0cyBhIEpTT04gUG9pbnRlciBmb3IgYSBkYXRhIG9iamVjdCBhbmQgcmV0dXJucyBhIEpTT04gUG9pbnRlciBmb3IgdGhlXG4gICAqIG1hdGNoaW5nIGNvbnRyb2wgaW4gYW4gQW5ndWxhciBGb3JtR3JvdXAuXG4gICAqXG4gICAqIEBwYXJhbSAgeyBQb2ludGVyIH0gZGF0YVBvaW50ZXIgLSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSkgdG8gYSBkYXRhIG9iamVjdFxuICAgKiBAcGFyYW0gIHsgRm9ybUdyb3VwIH0gZm9ybUdyb3VwIC0gQW5ndWxhciBGb3JtR3JvdXAgdG8gZ2V0IHZhbHVlIGZyb21cbiAgICogQHBhcmFtICB7IGJvb2xlYW4gPSBmYWxzZSB9IGNvbnRyb2xNdXN0RXhpc3QgLSBPbmx5IHJldHVybiBpZiBjb250cm9sIGV4aXN0cz9cbiAgICogQHJldHVybiB7IFBvaW50ZXIgfSAtIEpTT04gUG9pbnRlciAoc3RyaW5nKSB0byB0aGUgZm9ybUdyb3VwIG9iamVjdFxuICAgKi9cbiAgc3RhdGljIHRvQ29udHJvbFBvaW50ZXIoZGF0YVBvaW50ZXIsIGZvcm1Hcm91cCwgY29udHJvbE11c3RFeGlzdCA9IGZhbHNlKSB7XG4gICAgY29uc3QgZGF0YVBvaW50ZXJBcnJheSA9IHRoaXMucGFyc2UoZGF0YVBvaW50ZXIpO1xuICAgIGNvbnN0IGNvbnRyb2xQb2ludGVyQXJyYXk6IHN0cmluZ1tdID0gW107XG4gICAgbGV0IHN1Ykdyb3VwID0gZm9ybUdyb3VwO1xuICAgIGlmIChkYXRhUG9pbnRlckFycmF5ICE9PSBudWxsKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBkYXRhUG9pbnRlckFycmF5KSB7XG4gICAgICAgIGlmIChoYXNPd24oc3ViR3JvdXAsICdjb250cm9scycpKSB7XG4gICAgICAgICAgY29udHJvbFBvaW50ZXJBcnJheS5wdXNoKCdjb250cm9scycpO1xuICAgICAgICAgIHN1Ykdyb3VwID0gc3ViR3JvdXAuY29udHJvbHM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXJyYXkoc3ViR3JvdXApICYmIChrZXkgPT09ICctJykpIHtcbiAgICAgICAgICBjb250cm9sUG9pbnRlckFycmF5LnB1c2goKHN1Ykdyb3VwLmxlbmd0aCAtIDEpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgIHN1Ykdyb3VwID0gc3ViR3JvdXBbc3ViR3JvdXAubGVuZ3RoIC0gMV07XG4gICAgICAgIH0gZWxzZSBpZiAoaGFzT3duKHN1Ykdyb3VwLCBrZXkpKSB7XG4gICAgICAgICAgY29udHJvbFBvaW50ZXJBcnJheS5wdXNoKGtleSk7XG4gICAgICAgICAgc3ViR3JvdXAgPSBzdWJHcm91cFtrZXldO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnRyb2xNdXN0RXhpc3QpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGB0b0NvbnRyb2xQb2ludGVyIGVycm9yOiBVbmFibGUgdG8gZmluZCBcIiR7a2V5fVwiIGl0ZW0gaW4gRm9ybUdyb3VwLmApO1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZGF0YVBvaW50ZXIpO1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybUdyb3VwKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udHJvbFBvaW50ZXJBcnJheS5wdXNoKGtleSk7XG4gICAgICAgICAgc3ViR3JvdXAgPSB7IGNvbnRyb2xzOiB7fSB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5jb21waWxlKGNvbnRyb2xQb2ludGVyQXJyYXkpO1xuICAgIH1cbiAgICBjb25zb2xlLmVycm9yKGB0b0NvbnRyb2xQb2ludGVyIGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlcjogJHtkYXRhUG9pbnRlcn1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAndG9TY2hlbWFQb2ludGVyJyBmdW5jdGlvblxuICAgKlxuICAgKiBBY2NlcHRzIGEgSlNPTiBQb2ludGVyIHRvIGEgdmFsdWUgaW5zaWRlIGEgZGF0YSBvYmplY3QgYW5kIGEgSlNPTiBzY2hlbWFcbiAgICogZm9yIHRoYXQgb2JqZWN0LlxuICAgKlxuICAgKiBSZXR1cm5zIGEgUG9pbnRlciB0byB0aGUgc3ViLXNjaGVtYSBmb3IgdGhlIHZhbHVlIGluc2lkZSB0aGUgb2JqZWN0J3Mgc2NoZW1hLlxuICAgKlxuICAgKiBAcGFyYW0gIHsgUG9pbnRlciB9IGRhdGFQb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpIHRvIGFuIG9iamVjdFxuICAgKiBAcGFyYW0gIHsgYW55IH0gc2NoZW1hIC0gSlNPTiBzY2hlbWEgZm9yIHRoZSBvYmplY3RcbiAgICogQHJldHVybiB7IFBvaW50ZXIgfSAtIEpTT04gUG9pbnRlciAoc3RyaW5nKSB0byB0aGUgb2JqZWN0J3Mgc2NoZW1hXG4gICAqL1xuICBzdGF0aWMgdG9TY2hlbWFQb2ludGVyKGRhdGFQb2ludGVyLCBzY2hlbWEpIHtcbiAgICBpZiAodGhpcy5pc0pzb25Qb2ludGVyKGRhdGFQb2ludGVyKSAmJiB0eXBlb2Ygc2NoZW1hID09PSAnb2JqZWN0Jykge1xuICAgICAgY29uc3QgcG9pbnRlckFycmF5ID0gdGhpcy5wYXJzZShkYXRhUG9pbnRlcik7XG4gICAgICBpZiAoIXBvaW50ZXJBcnJheS5sZW5ndGgpIHsgcmV0dXJuICcnOyB9XG4gICAgICBjb25zdCBmaXJzdEtleSA9IHBvaW50ZXJBcnJheS5zaGlmdCgpO1xuICAgICAgaWYgKHNjaGVtYS50eXBlID09PSAnb2JqZWN0JyB8fCBzY2hlbWEucHJvcGVydGllcyB8fCBzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKChzY2hlbWEucHJvcGVydGllcyB8fCB7fSlbZmlyc3RLZXldKSB7XG4gICAgICAgICAgcmV0dXJuIGAvcHJvcGVydGllcy8ke3RoaXMuZXNjYXBlKGZpcnN0S2V5KX1gICtcbiAgICAgICAgICAgIHRoaXMudG9TY2hlbWFQb2ludGVyKHBvaW50ZXJBcnJheSwgc2NoZW1hLnByb3BlcnRpZXNbZmlyc3RLZXldKTtcbiAgICAgICAgfSBlbHNlICBpZiAoc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgcmV0dXJuICcvYWRkaXRpb25hbFByb3BlcnRpZXMnICtcbiAgICAgICAgICAgIHRoaXMudG9TY2hlbWFQb2ludGVyKHBvaW50ZXJBcnJheSwgc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKChzY2hlbWEudHlwZSA9PT0gJ2FycmF5JyB8fCBzY2hlbWEuaXRlbXMpICYmXG4gICAgICAgIChpc051bWJlcihmaXJzdEtleSkgfHwgZmlyc3RLZXkgPT09ICctJyB8fCBmaXJzdEtleSA9PT0gJycpXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgYXJyYXlJdGVtID0gZmlyc3RLZXkgPT09ICctJyB8fCBmaXJzdEtleSA9PT0gJycgPyAwIDogK2ZpcnN0S2V5O1xuICAgICAgICBpZiAoaXNBcnJheShzY2hlbWEuaXRlbXMpKSB7XG4gICAgICAgICAgaWYgKGFycmF5SXRlbSA8IHNjaGVtYS5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiAnL2l0ZW1zLycgKyBhcnJheUl0ZW0gK1xuICAgICAgICAgICAgICB0aGlzLnRvU2NoZW1hUG9pbnRlcihwb2ludGVyQXJyYXksIHNjaGVtYS5pdGVtc1thcnJheUl0ZW1dKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNjaGVtYS5hZGRpdGlvbmFsSXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiAnL2FkZGl0aW9uYWxJdGVtcycgK1xuICAgICAgICAgICAgICB0aGlzLnRvU2NoZW1hUG9pbnRlcihwb2ludGVyQXJyYXksIHNjaGVtYS5hZGRpdGlvbmFsSXRlbXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpc09iamVjdChzY2hlbWEuaXRlbXMpKSB7XG4gICAgICAgICAgcmV0dXJuICcvaXRlbXMnICsgdGhpcy50b1NjaGVtYVBvaW50ZXIocG9pbnRlckFycmF5LCBzY2hlbWEuaXRlbXMpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHNjaGVtYS5hZGRpdGlvbmFsSXRlbXMpKSB7XG4gICAgICAgICAgcmV0dXJuICcvYWRkaXRpb25hbEl0ZW1zJyArXG4gICAgICAgICAgICB0aGlzLnRvU2NoZW1hUG9pbnRlcihwb2ludGVyQXJyYXksIHNjaGVtYS5hZGRpdGlvbmFsSXRlbXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zb2xlLmVycm9yKGB0b1NjaGVtYVBvaW50ZXIgZXJyb3I6IERhdGEgcG9pbnRlciAke2RhdGFQb2ludGVyfSBgICtcbiAgICAgICAgYG5vdCBjb21wYXRpYmxlIHdpdGggc2NoZW1hICR7c2NoZW1hfWApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmICghdGhpcy5pc0pzb25Qb2ludGVyKGRhdGFQb2ludGVyKSkge1xuICAgICAgY29uc29sZS5lcnJvcihgdG9TY2hlbWFQb2ludGVyIGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlcjogJHtkYXRhUG9pbnRlcn1gKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBzY2hlbWEgIT09ICdvYmplY3QnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGB0b1NjaGVtYVBvaW50ZXIgZXJyb3I6IEludmFsaWQgSlNPTiBTY2hlbWE6ICR7c2NoZW1hfWApO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiAndG9EYXRhUG9pbnRlcicgZnVuY3Rpb25cbiAgICpcbiAgICogQWNjZXB0cyBhIEpTT04gUG9pbnRlciB0byBhIHN1Yi1zY2hlbWEgaW5zaWRlIGEgSlNPTiBzY2hlbWEgYW5kIHRoZSBzY2hlbWEuXG4gICAqXG4gICAqIElmIHBvc3NpYmxlLCByZXR1cm5zIGEgZ2VuZXJpYyBQb2ludGVyIHRvIHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlIGluc2lkZVxuICAgKiB0aGUgZGF0YSBvYmplY3QgZGVzY3JpYmVkIGJ5IHRoZSBKU09OIHNjaGVtYS5cbiAgICpcbiAgICogUmV0dXJucyBudWxsIGlmIHRoZSBzdWItc2NoZW1hIGlzIGluIGFuIGFtYmlndW91cyBsb2NhdGlvbiAoc3VjaCBhc1xuICAgKiBkZWZpbml0aW9ucyBvciBhZGRpdGlvbmFsUHJvcGVydGllcykgd2hlcmUgdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWVcbiAgICogbG9jYXRpb24gY2Fubm90IGJlIGRldGVybWluZWQuXG4gICAqXG4gICAqIEBwYXJhbSAgeyBQb2ludGVyIH0gc2NoZW1hUG9pbnRlciAtIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KSB0byBhIEpTT04gc2NoZW1hXG4gICAqIEBwYXJhbSAgeyBhbnkgfSBzY2hlbWEgLSB0aGUgSlNPTiBzY2hlbWFcbiAgICogQHBhcmFtICB7IGJvb2xlYW4gPSBmYWxzZSB9IGVycm9ycyAtIFNob3cgZXJyb3JzP1xuICAgKiBAcmV0dXJuIHsgUG9pbnRlciB9IC0gSlNPTiBQb2ludGVyIChzdHJpbmcpIHRvIHRoZSB2YWx1ZSBpbiB0aGUgZGF0YSBvYmplY3RcbiAgICovXG4gIHN0YXRpYyB0b0RhdGFQb2ludGVyKHNjaGVtYVBvaW50ZXIsIHNjaGVtYSwgZXJyb3JzID0gZmFsc2UpIHtcbiAgICBpZiAodGhpcy5pc0pzb25Qb2ludGVyKHNjaGVtYVBvaW50ZXIpICYmIHR5cGVvZiBzY2hlbWEgPT09ICdvYmplY3QnICYmXG4gICAgICB0aGlzLmhhcyhzY2hlbWEsIHNjaGVtYVBvaW50ZXIpXG4gICAgKSB7XG4gICAgICBjb25zdCBwb2ludGVyQXJyYXkgPSB0aGlzLnBhcnNlKHNjaGVtYVBvaW50ZXIpO1xuICAgICAgaWYgKCFwb2ludGVyQXJyYXkubGVuZ3RoKSB7IHJldHVybiAnJzsgfVxuICAgICAgY29uc3QgZGF0YVBvaW50ZXIgPSAnJztcbiAgICAgIGNvbnN0IGZpcnN0S2V5ID0gcG9pbnRlckFycmF5LnNoaWZ0KCk7XG4gICAgICBpZiAoZmlyc3RLZXkgPT09ICdwcm9wZXJ0aWVzJyB8fFxuICAgICAgICAoZmlyc3RLZXkgPT09ICdpdGVtcycgJiYgaXNBcnJheShzY2hlbWEuaXRlbXMpKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IHNlY29uZEtleSA9IHBvaW50ZXJBcnJheS5zaGlmdCgpO1xuICAgICAgICBjb25zdCBwb2ludGVyU3VmZml4ID0gdGhpcy50b0RhdGFQb2ludGVyKHBvaW50ZXJBcnJheSwgc2NoZW1hW2ZpcnN0S2V5XVtzZWNvbmRLZXldKTtcbiAgICAgICAgcmV0dXJuIHBvaW50ZXJTdWZmaXggPT09IG51bGwgPyBudWxsIDogJy8nICsgc2Vjb25kS2V5ICsgcG9pbnRlclN1ZmZpeDtcbiAgICAgIH0gZWxzZSBpZiAoZmlyc3RLZXkgPT09ICdhZGRpdGlvbmFsSXRlbXMnIHx8XG4gICAgICAgIChmaXJzdEtleSA9PT0gJ2l0ZW1zJyAmJiBpc09iamVjdChzY2hlbWEuaXRlbXMpKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IHBvaW50ZXJTdWZmaXggPSB0aGlzLnRvRGF0YVBvaW50ZXIocG9pbnRlckFycmF5LCBzY2hlbWFbZmlyc3RLZXldKTtcbiAgICAgICAgcmV0dXJuIHBvaW50ZXJTdWZmaXggPT09IG51bGwgPyBudWxsIDogJy8tJyArIHBvaW50ZXJTdWZmaXg7XG4gICAgICB9IGVsc2UgaWYgKFsnYWxsT2YnLCAnYW55T2YnLCAnb25lT2YnXS5pbmNsdWRlcyhmaXJzdEtleSkpIHtcbiAgICAgICAgY29uc3Qgc2Vjb25kS2V5ID0gcG9pbnRlckFycmF5LnNoaWZ0KCk7XG4gICAgICAgIHJldHVybiB0aGlzLnRvRGF0YVBvaW50ZXIocG9pbnRlckFycmF5LCBzY2hlbWFbZmlyc3RLZXldW3NlY29uZEtleV0pO1xuICAgICAgfSBlbHNlIGlmIChmaXJzdEtleSA9PT0gJ25vdCcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9EYXRhUG9pbnRlcihwb2ludGVyQXJyYXksIHNjaGVtYVtmaXJzdEtleV0pO1xuICAgICAgfSBlbHNlIGlmIChbJ2NvbnRhaW5zJywgJ2RlZmluaXRpb25zJywgJ2RlcGVuZGVuY2llcycsICdhZGRpdGlvbmFsSXRlbXMnLFxuICAgICAgICAnYWRkaXRpb25hbFByb3BlcnRpZXMnLCAncGF0dGVyblByb3BlcnRpZXMnLCAncHJvcGVydHlOYW1lcyddLmluY2x1ZGVzKGZpcnN0S2V5KVxuICAgICAgKSB7XG4gICAgICAgIGlmIChlcnJvcnMpIHsgY29uc29sZS5lcnJvcihgdG9EYXRhUG9pbnRlciBlcnJvcjogQW1iaWd1b3VzIGxvY2F0aW9uYCk7IH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKGVycm9ycykge1xuICAgICAgaWYgKCF0aGlzLmlzSnNvblBvaW50ZXIoc2NoZW1hUG9pbnRlcikpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgdG9EYXRhUG9pbnRlciBlcnJvcjogSW52YWxpZCBKU09OIFBvaW50ZXI6ICR7c2NoZW1hUG9pbnRlcn1gKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygc2NoZW1hICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zb2xlLmVycm9yKGB0b0RhdGFQb2ludGVyIGVycm9yOiBJbnZhbGlkIEpTT04gU2NoZW1hOiAke3NjaGVtYX1gKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygc2NoZW1hICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zb2xlLmVycm9yKGB0b0RhdGFQb2ludGVyIGVycm9yOiBQb2ludGVyICR7c2NoZW1hUG9pbnRlcn0gaW52YWxpZCBmb3IgU2NoZW1hOiAke3NjaGVtYX1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogJ3BhcnNlT2JqZWN0UGF0aCcgZnVuY3Rpb25cbiAgICpcbiAgICogUGFyc2VzIGEgSmF2YVNjcmlwdCBvYmplY3QgcGF0aCBpbnRvIGFuIGFycmF5IG9mIGtleXMsIHdoaWNoXG4gICAqIGNhbiB0aGVuIGJlIHBhc3NlZCB0byBjb21waWxlKCkgdG8gY29udmVydCBpbnRvIGEgc3RyaW5nIEpTT04gUG9pbnRlci5cbiAgICpcbiAgICogQmFzZWQgb24gbWlrZS1tYXJjYWNjaSdzIGV4Y2VsbGVudCBvYmplY3RwYXRoIHBhcnNlIGZ1bmN0aW9uOlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vbWlrZS1tYXJjYWNjaS9vYmplY3RwYXRoXG4gICAqXG4gICAqIEBwYXJhbSAgeyBQb2ludGVyIH0gcGF0aCAtIFRoZSBvYmplY3QgcGF0aCB0byBwYXJzZVxuICAgKiBAcmV0dXJuIHsgc3RyaW5nW10gfSAtIFRoZSByZXN1bHRpbmcgYXJyYXkgb2Yga2V5c1xuICAgKi9cbiAgc3RhdGljIHBhcnNlT2JqZWN0UGF0aChwYXRoKSB7XG4gICAgaWYgKGlzQXJyYXkocGF0aCkpIHsgcmV0dXJuIDxzdHJpbmdbXT5wYXRoOyB9XG4gICAgaWYgKHRoaXMuaXNKc29uUG9pbnRlcihwYXRoKSkgeyByZXR1cm4gdGhpcy5wYXJzZShwYXRoKTsgfVxuICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICBjb25zdCBwYXJ0czogc3RyaW5nW10gPSBbXTtcbiAgICAgIHdoaWxlIChpbmRleCA8IHBhdGgubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IG5leHREb3QgPSBwYXRoLmluZGV4T2YoJy4nLCBpbmRleCk7XG4gICAgICAgIGNvbnN0IG5leHRPQiA9IHBhdGguaW5kZXhPZignWycsIGluZGV4KTsgLy8gbmV4dCBvcGVuIGJyYWNrZXRcbiAgICAgICAgaWYgKG5leHREb3QgPT09IC0xICYmIG5leHRPQiA9PT0gLTEpIHsgLy8gbGFzdCBpdGVtXG4gICAgICAgICAgcGFydHMucHVzaChwYXRoLnNsaWNlKGluZGV4KSk7XG4gICAgICAgICAgaW5kZXggPSBwYXRoLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIGlmIChuZXh0RG90ICE9PSAtMSAmJiAobmV4dERvdCA8IG5leHRPQiB8fCBuZXh0T0IgPT09IC0xKSkgeyAvLyBkb3Qgbm90YXRpb25cbiAgICAgICAgICBwYXJ0cy5wdXNoKHBhdGguc2xpY2UoaW5kZXgsIG5leHREb3QpKTtcbiAgICAgICAgICBpbmRleCA9IG5leHREb3QgKyAxO1xuICAgICAgICB9IGVsc2UgeyAvLyBicmFja2V0IG5vdGF0aW9uXG4gICAgICAgICAgaWYgKG5leHRPQiA+IGluZGV4KSB7XG4gICAgICAgICAgICBwYXJ0cy5wdXNoKHBhdGguc2xpY2UoaW5kZXgsIG5leHRPQikpO1xuICAgICAgICAgICAgaW5kZXggPSBuZXh0T0I7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHF1b3RlID0gcGF0aC5jaGFyQXQobmV4dE9CICsgMSk7XG4gICAgICAgICAgaWYgKHF1b3RlID09PSAnXCInIHx8IHF1b3RlID09PSAnXFwnJykgeyAvLyBlbmNsb3NpbmcgcXVvdGVzXG4gICAgICAgICAgICBsZXQgbmV4dENCID0gcGF0aC5pbmRleE9mKHF1b3RlICsgJ10nLCBuZXh0T0IpOyAvLyBuZXh0IGNsb3NlIGJyYWNrZXRcbiAgICAgICAgICAgIHdoaWxlIChuZXh0Q0IgIT09IC0xICYmIHBhdGguY2hhckF0KG5leHRDQiAtIDEpID09PSAnXFxcXCcpIHtcbiAgICAgICAgICAgICAgbmV4dENCID0gcGF0aC5pbmRleE9mKHF1b3RlICsgJ10nLCBuZXh0Q0IgKyAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXh0Q0IgPT09IC0xKSB7IG5leHRDQiA9IHBhdGgubGVuZ3RoOyB9XG4gICAgICAgICAgICBwYXJ0cy5wdXNoKHBhdGguc2xpY2UoaW5kZXggKyAyLCBuZXh0Q0IpXG4gICAgICAgICAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoJ1xcXFwnICsgcXVvdGUsICdnJyksIHF1b3RlKSk7XG4gICAgICAgICAgICBpbmRleCA9IG5leHRDQiArIDI7XG4gICAgICAgICAgfSBlbHNlIHsgLy8gbm8gZW5jbG9zaW5nIHF1b3Rlc1xuICAgICAgICAgICAgbGV0IG5leHRDQiA9IHBhdGguaW5kZXhPZignXScsIG5leHRPQik7IC8vIG5leHQgY2xvc2UgYnJhY2tldFxuICAgICAgICAgICAgaWYgKG5leHRDQiA9PT0gLTEpIHsgbmV4dENCID0gcGF0aC5sZW5ndGg7IH1cbiAgICAgICAgICAgIHBhcnRzLnB1c2gocGF0aC5zbGljZShpbmRleCArIDEsIG5leHRDQikpO1xuICAgICAgICAgICAgaW5kZXggPSBuZXh0Q0IgKyAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocGF0aC5jaGFyQXQoaW5kZXgpID09PSAnLicpIHsgaW5kZXgrKzsgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcGFydHM7XG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoJ3BhcnNlT2JqZWN0UGF0aCBlcnJvcjogSW5wdXQgb2JqZWN0IHBhdGggbXVzdCBiZSBhIHN0cmluZy4nKTtcbiAgfVxufVxuIl19