import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { isDefined, isEmpty, isObject, isArray, isMap, isNumber, isString } from './validator.functions';
import { hasOwn, copy } from './utility.functions';
var JsonPointer = /** @class */ (function () {
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
        if (startSlice === void 0) { startSlice = 0; }
        if (endSlice === void 0) { endSlice = null; }
        if (getBoolean === void 0) { getBoolean = false; }
        if (errors === void 0) { errors = false; }
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
                for (var keyArray_1 = tslib_1.__values(keyArray), keyArray_1_1 = keyArray_1.next(); !keyArray_1_1.done; keyArray_1_1 = keyArray_1.next()) {
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
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (keyArray_1_1 && !keyArray_1_1.done && (_a = keyArray_1.return)) _a.call(keyArray_1);
                }
                finally { if (e_1) throw e_1.error; }
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
        if (startSlice === void 0) { startSlice = 0; }
        if (endSlice === void 0) { endSlice = null; }
        if (getBoolean === void 0) { getBoolean = false; }
        if (errors === void 0) { errors = false; }
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
        if (defaultValue === void 0) { defaultValue = null; }
        if (getCopy === void 0) { getCopy = false; }
        if (isEmpty(items)) {
            return;
        }
        if (isArray(items)) {
            try {
                for (var items_1 = tslib_1.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
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
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return defaultValue;
        }
        if (isMap(items)) {
            try {
                for (var items_2 = tslib_1.__values(items), items_2_1 = items_2.next(); !items_2_1.done; items_2_1 = items_2.next()) {
                    var _b = tslib_1.__read(items_2_1.value, 2), object = _b[0], pointer = _b[1];
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
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (items_2_1 && !items_2_1.done && (_c = items_2.return)) _c.call(items_2);
                }
                finally { if (e_3) throw e_3.error; }
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
        if (defaultValue === void 0) { defaultValue = null; }
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
        if (insert === void 0) { insert = false; }
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
        if (insert === void 0) { insert = false; }
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
        var hasValue = this.get(object, pointer, 0, null, true);
        return hasValue;
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
        if (fn === void 0) { fn = function (v) { return v; }; }
        if (bottomUp === void 0) { bottomUp = false; }
        if (pointer === void 0) { pointer = ''; }
        if (rootObject === void 0) { rootObject = object; }
        if (typeof fn !== 'function') {
            console.error("forEachDeep error: Iterator is not a function:", fn);
            return;
        }
        if (!bottomUp) {
            fn(object, pointer, rootObject);
        }
        if (isObject(object) || isArray(object)) {
            try {
                for (var _a = tslib_1.__values(Object.keys(object)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var key = _b.value;
                    var newPointer = pointer + '/' + this.escape(key);
                    this.forEachDeep(object[key], fn, bottomUp, newPointer, rootObject);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_4) throw e_4.error; }
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
        if (fn === void 0) { fn = function (v) { return v; }; }
        if (bottomUp === void 0) { bottomUp = false; }
        if (pointer === void 0) { pointer = ''; }
        if (rootObject === void 0) { rootObject = object; }
        if (typeof fn !== 'function') {
            console.error("forEachDeepCopy error: Iterator is not a function:", fn);
            return null;
        }
        if (isObject(object) || isArray(object)) {
            var newObject = isArray(object) ? tslib_1.__spread(object) : Object.assign({}, object);
            if (!bottomUp) {
                newObject = fn(newObject, pointer, rootObject);
            }
            try {
                for (var _a = tslib_1.__values(Object.keys(newObject)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var key = _b.value;
                    var newPointer = pointer + '/' + this.escape(key);
                    newObject[key] = this.forEachDeepCopy(newObject[key], fn, bottomUp, newPointer, rootObject);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_5) throw e_5.error; }
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
        if (errors === void 0) { errors = false; }
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
        if (defaultValue === void 0) { defaultValue = ''; }
        if (errors === void 0) { errors = false; }
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
        if (errors === void 0) { errors = false; }
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
        if (trueIfMatching === void 0) { trueIfMatching = false; }
        if (errors === void 0) { errors = false; }
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
        if (arrayMap === void 0) { arrayMap = null; }
        if (this.isJsonPointer(genericPointer) && isArray(indexArray)) {
            var indexedPointer_1 = this.compile(genericPointer);
            if (isMap(arrayMap)) {
                var arrayIndex_1 = 0;
                return indexedPointer_1.replace(/\/\-(?=\/|$)/g, function (key, stringIndex) { return arrayMap.has(indexedPointer_1.slice(0, stringIndex)) ?
                    '/' + indexArray[arrayIndex_1++] : key; });
            }
            else {
                try {
                    for (var indexArray_1 = tslib_1.__values(indexArray), indexArray_1_1 = indexArray_1.next(); !indexArray_1_1.done; indexArray_1_1 = indexArray_1.next()) {
                        var pointerIndex = indexArray_1_1.value;
                        indexedPointer_1 = indexedPointer_1.replace('/-', '/' + pointerIndex);
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (indexArray_1_1 && !indexArray_1_1.done && (_a = indexArray_1.return)) _a.call(indexArray_1);
                    }
                    finally { if (e_6) throw e_6.error; }
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
        if (arrayMap === void 0) { arrayMap = new Map(); }
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
        if (controlMustExist === void 0) { controlMustExist = false; }
        var dataPointerArray = this.parse(dataPointer);
        var controlPointerArray = [];
        var subGroup = formGroup;
        if (dataPointerArray !== null) {
            try {
                for (var dataPointerArray_1 = tslib_1.__values(dataPointerArray), dataPointerArray_1_1 = dataPointerArray_1.next(); !dataPointerArray_1_1.done; dataPointerArray_1_1 = dataPointerArray_1.next()) {
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
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (dataPointerArray_1_1 && !dataPointerArray_1_1.done && (_a = dataPointerArray_1.return)) _a.call(dataPointerArray_1);
                }
                finally { if (e_7) throw e_7.error; }
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
        if (errors === void 0) { errors = false; }
        if (this.isJsonPointer(schemaPointer) && typeof schema === 'object' &&
            this.has(schema, schemaPointer)) {
            var pointerArray = this.parse(schemaPointer);
            if (!pointerArray.length) {
                return '';
            }
            var dataPointer = '';
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
export { JsonPointer };
JsonPointer.decorators = [
    { type: Injectable },
];
//# sourceMappingURL=jsonpointer.functions.js.map
