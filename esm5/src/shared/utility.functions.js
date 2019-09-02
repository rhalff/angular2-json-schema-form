import * as tslib_1 from "tslib";
import { hasValue, inArray, isArray, isDefined, isObject, isEmpty, isMap, isSet, isString } from './validator.functions';
/**
 * Utility function library:
 *
 * addClasses, copy, forEach, forEachCopy, hasOwn, mergeFilteredObject,
 * uniqueItems, commonItems, fixTitle, toTitleCase
*/
/**
 * 'addClasses' function
 *
 * Merges two space-delimited lists of CSS classes and removes duplicates.
 *
 * @param {string | string[] | Set<string>} oldClasses
 * @param {string | string[] | Set<string>} newClasses
 * @return {string | string[] | Set<string>} - Combined classes
 */
export function addClasses(oldClasses, newClasses) {
    var badType = function (i) { return !isSet(i) && !isArray(i) && !isString(i); };
    if (badType(newClasses)) {
        return oldClasses;
    }
    if (badType(oldClasses)) {
        oldClasses = '';
    }
    var toSet = function (i) { return isSet(i) ? i : isArray(i) ? new Set(i) : new Set(i.split(' ')); };
    var combinedSet = toSet(oldClasses);
    var newSet = toSet(newClasses);
    newSet.forEach(function (c) { return combinedSet.add(c); });
    if (isSet(oldClasses)) {
        return combinedSet;
    }
    if (isArray(oldClasses)) {
        return Array.from(combinedSet);
    }
    return Array.from(combinedSet).join(' ');
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
export function copy(object, errors) {
    if (errors === void 0) { errors = false; }
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
        return tslib_1.__spread(object);
    }
    if (isObject(object)) {
        return tslib_1.__assign({}, object);
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
export function forEach(object, fn, recurse, rootObject, errors) {
    var e_1, _a;
    if (recurse === void 0) { recurse = false; }
    if (rootObject === void 0) { rootObject = object; }
    if (errors === void 0) { errors = false; }
    if (isEmpty(object)) {
        return;
    }
    if ((isObject(object) || isArray(object)) && typeof fn === 'function') {
        try {
            for (var _b = tslib_1.__values(Object.keys(object)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
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
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
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
export function forEachCopy(object, fn, errors) {
    var e_2, _a;
    if (errors === void 0) { errors = false; }
    if (!hasValue(object)) {
        return;
    }
    if ((isObject(object) || isArray(object)) && typeof object !== 'function') {
        var newObject = isArray(object) ? [] : {};
        try {
            for (var _b = tslib_1.__values(Object.keys(object)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                newObject[key] = fn(object[key], key, object);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
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
export function hasOwn(object, property) {
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
export function mergeFilteredObject(targetObject, sourceObject, excludeKeys, keyFn, valFn) {
    var e_3, _a;
    if (excludeKeys === void 0) { excludeKeys = []; }
    if (keyFn === void 0) { keyFn = function (key) { return key; }; }
    if (valFn === void 0) { valFn = function (val) { return val; }; }
    if (!isObject(sourceObject)) {
        return targetObject;
    }
    if (!isObject(targetObject)) {
        targetObject = {};
    }
    try {
        for (var _b = tslib_1.__values(Object.keys(sourceObject)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            if (!inArray(key, excludeKeys) && isDefined(sourceObject[key])) {
                targetObject[keyFn(key)] = valFn(sourceObject[key]);
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return targetObject;
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
export function uniqueItems() {
    var e_4, _a;
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
    }
    var returnItems = [];
    try {
        for (var items_1 = tslib_1.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
            var item = items_1_1.value;
            if (!returnItems.includes(item)) {
                returnItems.push(item);
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return returnItems;
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
export function commonItems() {
    var e_5, _a;
    var arrays = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arrays[_i] = arguments[_i];
    }
    var returnItems = null;
    var _loop_1 = function (array) {
        if (isString(array)) {
            array = [array];
        }
        returnItems = returnItems === null ? tslib_1.__spread(array) :
            returnItems.filter(function (item) { return array.includes(item); });
        if (!returnItems.length) {
            return { value: [] };
        }
    };
    try {
        for (var arrays_1 = tslib_1.__values(arrays), arrays_1_1 = arrays_1.next(); !arrays_1_1.done; arrays_1_1 = arrays_1.next()) {
            var array = arrays_1_1.value;
            var state_1 = _loop_1(array);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (arrays_1_1 && !arrays_1_1.done && (_a = arrays_1.return)) _a.call(arrays_1);
        }
        finally { if (e_5) throw e_5.error; }
    }
    return returnItems;
}
/**
 * 'fixTitle' function
 *
 *
 * @param {string} input -
 * @return {string} -
 */
export function fixTitle(name) {
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
export function toTitleCase(input, forceWords) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0eS5mdW5jdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsic3JjL3NoYXJlZC91dGlsaXR5LmZ1bmN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQ3RFLFFBQVEsRUFDVCxNQUFNLHVCQUF1QixDQUFDO0FBRS9COzs7OztFQUtFO0FBRUY7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLFVBQVUsVUFBVSxDQUN4QixVQUEyQyxFQUMzQyxVQUEyQztJQUUzQyxJQUFNLE9BQU8sR0FBRyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUF4QyxDQUF3QyxDQUFDO0lBQzlELElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQUUsT0FBTyxVQUFVLENBQUM7S0FBRTtJQUMvQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUFFLFVBQVUsR0FBRyxFQUFFLENBQUM7S0FBRTtJQUM3QyxJQUFNLEtBQUssR0FBRyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQTlELENBQThELENBQUM7SUFDbEYsSUFBTSxXQUFXLEdBQWEsS0FBSyxDQUFDLFVB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S0FBSyxDQUFDLENBQUM7Z0JBQzlELENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQzdELEVBQ0Q7Z0JBQ0EsT0FBTyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzNEO2lCQUFNO2dCQUNMLE9BQU8sR0FBRyxTQUFTLENBQUM7YUFDckI7WUFDRCxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE9BQU8sT0FBTyxDQUFDO1NBQ2hCO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgaGFzVmFsdWUsIGluQXJyYXksIGlzQXJyYXksIGlzRGVmaW5lZCwgaXNPYmplY3QsIGlzRW1wdHksIGlzTWFwLCBpc1NldCxcbiAgaXNTdHJpbmcsIFBsYWluT2JqZWN0XG59IGZyb20gJy4vdmFsaWRhdG9yLmZ1bmN0aW9ucyc7XG5cbi8qKlxuICogVXRpbGl0eSBmdW5jdGlvbiBsaWJyYXJ5OlxuICpcbiAqIGFkZENsYXNzZXMsIGNvcHksIGZvckVhY2gsIGZvckVhY2hDb3B5LCBoYXNPd24sIG1lcmdlRmlsdGVyZWRPYmplY3QsXG4gKiB1bmlxdWVJdGVtcywgY29tbW9uSXRlbXMsIGZpeFRpdGxlLCB0b1RpdGxlQ2FzZVxuKi9cblxuLyoqXG4gKiAnYWRkQ2xhc3NlcycgZnVuY3Rpb25cbiAqXG4gKiBNZXJnZXMgdHdvIHNwYWNlLWRlbGltaXRlZCBsaXN0cyBvZiBDU1MgY2xhc3NlcyBhbmQgcmVtb3ZlcyBkdXBsaWNhdGVzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPn0gb2xkQ2xhc3Nlc1xuICogQHBhcmFtIHtzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+fSBuZXdDbGFzc2VzXG4gKiBAcmV0dXJuIHtzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+fSAtIENvbWJpbmVkIGNsYXNzZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZENsYXNzZXMoXG4gIG9sZENsYXNzZXM6IHN0cmluZyB8IHN0cmluZ1tdIHwgU2V0PHN0cmluZz4sXG4gIG5ld0NsYXNzZXM6IHN0cmluZyB8IHN0cmluZ1tdIHwgU2V0PHN0cmluZz5cbik6IHN0cmluZyB8IHN0cmluZ1tdIHwgU2V0PHN0cmluZz4ge1xuICBjb25zdCBiYWRUeXBlID0gaSA9PiAhaXNTZXQoaSkgJiYgIWlzQXJyYXkoaSkgJiYgIWlzU3RyaW5nKGkpO1xuICBpZiAoYmFkVHlwZShuZXdDbGFzc2VzKSkgeyByZXR1cm4gb2xkQ2xhc3NlczsgfVxuICBpZiAoYmFkVHlwZShvbGRDbGFzc2VzKSkgeyBvbGRDbGFzc2VzID0gJyc7IH1cbiAgY29uc3QgdG9TZXQgPSBpID0+IGlzU2V0KGkpID8gaSA6IGlzQXJyYXkoaSkgPyBuZXcgU2V0KGkpIDogbmV3IFNldChpLnNwbGl0KCcgJykpO1xuICBjb25zdCBjb21iaW5lZFNldDogU2V0PGFueT4gPSB0b1NldChvbGRDbGFzc2VzKTtcbiAgY29uc3QgbmV3U2V0OiBTZXQ8YW55PiA9IHRvU2V0KG5ld0NsYXNzZXMpO1xuICBuZXdTZXQuZm9yRWFjaChjID0+IGNvbWJpbmVkU2V0LmFkZChjKSk7XG4gIGlmIChpc1NldChvbGRDbGFzc2VzKSkgeyByZXR1cm4gY29tYmluZWRTZXQ7IH1cbiAgaWYgKGlzQXJyYXkob2xkQ2xhc3NlcykpIHsgcmV0dXJuIEFycmF5LmZyb20oY29tYmluZWRTZXQpOyB9XG4gIHJldHVybiBBcnJheS5mcm9tKGNvbWJpbmVkU2V0KS5qb2luKCcgJyk7XG59XG5cbi8qKlxuICogJ2NvcHknIGZ1bmN0aW9uXG4gKlxuICogTWFrZXMgYSBzaGFsbG93IGNvcHkgb2YgYSBKYXZhU2NyaXB0IG9iamVjdCwgYXJyYXksIE1hcCwgb3IgU2V0LlxuICogSWYgcGFzc2VkIGEgSmF2YVNjcmlwdCBwcmltaXRpdmUgdmFsdWUgKHN0cmluZywgbnVtYmVyLCBib29sZWFuLCBvciBudWxsKSxcbiAqIGl0IHJldHVybnMgdGhlIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fHN0cmluZ3xudW1iZXJ8Ym9vbGVhbnxudWxsfSBvYmplY3QgLSBUaGUgb2JqZWN0IHRvIGNvcHlcbiAqIEBwYXJhbSB7Ym9vbGVhbiA9IGZhbHNlfSBlcnJvcnMgLSBTaG93IGVycm9ycz9cbiAqIEByZXR1cm4ge09iamVjdHxBcnJheXxzdHJpbmd8bnVtYmVyfGJvb2xlYW58bnVsbH0gLSBUaGUgY29waWVkIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gY29weShvYmplY3Q6IGFueSwgZXJyb3JzID0gZmFsc2UpOiBhbnkge1xuICBpZiAodHlwZW9mIG9iamVjdCAhPT0gJ29iamVjdCcgfHwgb2JqZWN0ID09PSBudWxsKSB7IHJldHVybiBvYmplY3Q7IH1cbiAgaWYgKGlzTWFwKG9iamVjdCkpICAgIHsgcmV0dXJuIG5ldyBNYXAob2JqZWN0KTsgfVxuICBpZiAoaXNTZXQob2JqZWN0KSkgICAgeyByZXR1cm4gbmV3IFNldChvYmplY3QpOyB9XG4gIGlmIChpc0FycmF5KG9iamVjdCkpICB7IHJldHVybiBbIC4uLm9iamVjdCBdOyAgIH1cbiAgaWYgKGlzT2JqZWN0KG9iamVjdCkpIHsgcmV0dXJuIHsgLi4ub2JqZWN0IH07ICAgfVxuICBpZiAoZXJyb3JzKSB7XG4gICAgY29uc29sZS5lcnJvcignY29weSBlcnJvcjogT2JqZWN0IHRvIGNvcHkgbXVzdCBiZSBhIEphdmFTY3JpcHQgb2JqZWN0IG9yIHZhbHVlLicpO1xuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbi8qKlxuICogJ2ZvckVhY2gnIGZ1bmN0aW9uXG4gKlxuICogSXRlcmF0ZXMgb3ZlciBhbGwgaXRlbXMgaW4gdGhlIGZpcnN0IGxldmVsIG9mIGFuIG9iamVjdCBvciBhcnJheVxuICogYW5kIGNhbGxzIGFuIGl0ZXJhdG9yIGZ1bmNpdG9uIG9uIGVhY2ggaXRlbS5cbiAqXG4gKiBUaGUgaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGggZm91ciB2YWx1ZXM6XG4gKiAxLiBUaGUgY3VycmVudCBpdGVtJ3MgdmFsdWVcbiAqIDIuIFRoZSBjdXJyZW50IGl0ZW0ncyBrZXlcbiAqIDMuIFRoZSBwYXJlbnQgb2JqZWN0LCB3aGljaCBjb250YWlucyB0aGUgY3VycmVudCBpdGVtXG4gKiA0LiBUaGUgcm9vdCBvYmplY3RcbiAqXG4gKiBTZXR0aW5nIHRoZSBvcHRpb25hbCB0aGlyZCBwYXJhbWV0ZXIgdG8gJ3RvcC1kb3duJyBvciAnYm90dG9tLXVwJyB3aWxsIGNhdXNlXG4gKiBpdCB0byBhbHNvIHJlY3Vyc2l2ZWx5IGl0ZXJhdGUgb3ZlciBpdGVtcyBpbiBzdWItb2JqZWN0cyBvciBzdWItYXJyYXlzIGluIHRoZVxuICogc3BlY2lmaWVkIGRpcmVjdGlvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqZWN0IC0gVGhlIG9iamVjdCBvciBhcnJheSB0byBpdGVyYXRlIG92ZXJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuIC0gdGhlIGl0ZXJhdG9yIGZ1bmNpdG9uIHRvIGNhbGwgb24gZWFjaCBpdGVtXG4gKiBAcGFyYW0ge2Jvb2xlYW4gPSBmYWxzZX0gZXJyb3JzIC0gU2hvdyBlcnJvcnM/XG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaChcbiAgb2JqZWN0OiBhbnksIGZuOiAodjogYW55LCBrPzogc3RyaW5nIHwgbnVtYmVyLCBjPzogYW55LCByYz86IGFueSkgPT4gYW55LFxuICByZWN1cnNlOiBib29sZWFuIHwgc3RyaW5nID0gZmFsc2UsIHJvb3RPYmplY3Q6IGFueSA9IG9iamVjdCwgZXJyb3JzID0gZmFsc2Vcbik6IHZvaWQge1xuICBpZiAoaXNFbXB0eShvYmplY3QpKSB7IHJldHVybjsgfVxuICBpZiAoKGlzT2JqZWN0KG9iamVjdCkgfHwgaXNBcnJheShvYmplY3QpKSAmJiB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhvYmplY3QpKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG9iamVjdFtrZXldO1xuICAgICAgaWYgKHJlY3Vyc2UgPT09ICdib3R0b20tdXAnICYmIChpc09iamVjdCh2YWx1ZSkgfHwgaXNBcnJheSh2YWx1ZSkpKSB7XG4gICAgICAgIGZvckVhY2godmFsdWUsIGZuLCByZWN1cnNlLCByb290T2JqZWN0KTtcbiAgICAgIH1cbiAgICAgIGZuKHZhbHVlLCBrZXksIG9iamVjdCwgcm9vdE9iamVjdCk7XG4gICAgICBpZiAocmVjdXJzZSA9PT0gJ3RvcC1kb3duJyAmJiAoaXNPYmplY3QodmFsdWUpIHx8IGlzQXJyYXkodmFsdWUpKSkge1xuICAgICAgICBmb3JFYWNoKHZhbHVlLCBmbiwgcmVjdXJzZSwgcm9vdE9iamVjdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChlcnJvcnMpIHtcbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdmb3JFYWNoIGVycm9yOiBJdGVyYXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgICBjb25zb2xlLmVycm9yKCdmdW5jdGlvbicsIGZuKTtcbiAgICB9XG4gICAgaWYgKCFpc09iamVjdChvYmplY3QpICYmICFpc0FycmF5KG9iamVjdCkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2ZvckVhY2ggZXJyb3I6IElucHV0IG9iamVjdCBtdXN0IGJlIGFuIG9iamVjdCBvciBhcnJheS4nKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ29iamVjdCcsIG9iamVjdCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogJ2ZvckVhY2hDb3B5JyBmdW5jdGlvblxuICpcbiAqIEl0ZXJhdGVzIG92ZXIgYWxsIGl0ZW1zIGluIHRoZSBmaXJzdCBsZXZlbCBvZiBhbiBvYmplY3Qgb3IgYXJyYXlcbiAqIGFuZCBjYWxscyBhbiBpdGVyYXRvciBmdW5jdGlvbiBvbiBlYWNoIGl0ZW0uIFJldHVybnMgYSBuZXcgb2JqZWN0IG9yIGFycmF5XG4gKiB3aXRoIHRoZSBzYW1lIGtleXMgb3IgaW5kZXhlcyBhcyB0aGUgb3JpZ2luYWwsIGFuZCB2YWx1ZXMgc2V0IHRvIHRoZSByZXN1bHRzXG4gKiBvZiB0aGUgaXRlcmF0b3IgZnVuY3Rpb24uXG4gKlxuICogRG9lcyBOT1QgcmVjdXJzaXZlbHkgaXRlcmF0ZSBvdmVyIGl0ZW1zIGluIHN1Yi1vYmplY3RzIG9yIHN1Yi1hcnJheXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3QgfCBBcnJheX0gb2JqZWN0IC0gVGhlIG9iamVjdCBvciBhcnJheSB0byBpdGVyYXRlIG92ZXJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuIC0gVGhlIGl0ZXJhdG9yIGZ1bmNpdG9uIHRvIGNhbGwgb24gZWFjaCBpdGVtXG4gKiBAcGFyYW0ge2Jvb2xlYW4gPSBmYWxzZX0gZXJyb3JzIC0gU2hvdyBlcnJvcnM/XG4gKiBAcmV0dXJuIHtPYmplY3QgfCBBcnJheX0gLSBUaGUgcmVzdWx0aW5nIG9iamVjdCBvciBhcnJheVxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaENvcHkoXG4gIG9iamVjdDogYW55LCBmbjogKHY6IGFueSwgaz86IHN0cmluZyB8IG51bWJlciwgbz86IGFueSwgcD86IHN0cmluZykgPT4gYW55LFxuICBlcnJvcnMgPSBmYWxzZVxuKTogYW55IHtcbiAgaWYgKCFoYXNWYWx1ZShvYmplY3QpKSB7IHJldHVybjsgfVxuICBpZiAoKGlzT2JqZWN0KG9iamVjdCkgfHwgaXNBcnJheShvYmplY3QpKSAmJiB0eXBlb2Ygb2JqZWN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3QgbmV3T2JqZWN0OiBhbnkgPSBpc0FycmF5KG9iamVjdCkgPyBbXSA6IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG9iamVjdCkpIHtcbiAgICAgIG5ld09iamVjdFtrZXldID0gZm4ob2JqZWN0W2tleV0sIGtleSwgb2JqZWN0KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld09iamVjdDtcbiAgfVxuICBpZiAoZXJyb3JzKSB7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS5lcnJvcignZm9yRWFjaENvcHkgZXJyb3I6IEl0ZXJhdG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2Z1bmN0aW9uJywgZm4pO1xuICAgIH1cbiAgICBpZiAoIWlzT2JqZWN0KG9iamVjdCkgJiYgIWlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgY29uc29sZS5lcnJvcignZm9yRWFjaENvcHkgZXJyb3I6IElucHV0IG9iamVjdCBtdXN0IGJlIGFuIG9iamVjdCBvciBhcnJheS4nKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ29iamVjdCcsIG9iamVjdCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogJ2hhc093bicgdXRpbGl0eSBmdW5jdGlvblxuICpcbiAqIENoZWNrcyB3aGV0aGVyIGFuIG9iamVjdCBvciBhcnJheSBoYXMgYSBwYXJ0aWN1bGFyIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7YW55fSBvYmplY3QgLSB0aGUgb2JqZWN0IHRvIGNoZWNrXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgLSB0aGUgcHJvcGVydHkgdG8gbG9vayBmb3JcbiAqIEByZXR1cm4ge2Jvb2xlYW59IC0gdHJ1ZSBpZiBvYmplY3QgaGFzIHByb3BlcnR5LCBmYWxzZSBpZiBub3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc093bihvYmplY3Q6IGFueSwgcHJvcGVydHk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBpZiAoIW9iamVjdCB8fCAhWydudW1iZXInLCAnc3RyaW5nJywgJ3N5bWJvbCddLmluY2x1ZGVzKHR5cGVvZiBwcm9wZXJ0eSkgfHxcbiAgICAoIWlzT2JqZWN0KG9iamVjdCkgJiYgIWlzQXJyYXkob2JqZWN0KSAmJiAhaXNNYXAob2JqZWN0KSAmJiAhaXNTZXQob2JqZWN0KSlcbiAgKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAoaXNNYXAob2JqZWN0KSB8fCBpc1NldChvYmplY3QpKSB7IHJldHVybiBvYmplY3QuaGFzKHByb3BlcnR5KTsgfVxuICBpZiAodHlwZW9mIHByb3BlcnR5ID09PSAnbnVtYmVyJykge1xuICAgIGlmIChpc0FycmF5KG9iamVjdCkpIHsgcmV0dXJuIG9iamVjdFs8bnVtYmVyPnByb3BlcnR5XTsgfVxuICAgIHByb3BlcnR5ID0gcHJvcGVydHkgKyAnJztcbiAgfVxuICByZXR1cm4gb2JqZWN0Lmhhc093blByb3BlcnR5KHByb3BlcnR5KTtcbn1cblxuLyoqXG4gKiAnbWVyZ2VGaWx0ZXJlZE9iamVjdCcgdXRpbGl0eSBmdW5jdGlvblxuICpcbiAqIFNoYWxsb3dseSBtZXJnZXMgdHdvIG9iamVjdHMsIHNldHRpbmcga2V5IGFuZCB2YWx1ZXMgZnJvbSBzb3VyY2Ugb2JqZWN0XG4gKiBpbiB0YXJnZXQgb2JqZWN0LCBleGNsdWRpbmcgc3BlY2lmaWVkIGtleXMuXG4gKlxuICogT3B0aW9uYWxseSwgaXQgY2FuIGFsc28gdXNlIGZ1bmN0aW9ucyB0byB0cmFuc2Zvcm0gdGhlIGtleSBuYW1lcyBhbmQvb3JcbiAqIHRoZSB2YWx1ZXMgb2YgdGhlIG1lcmdpbmcgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7UGxhaW5PYmplY3R9IHRhcmdldE9iamVjdCAtIFRhcmdldCBvYmplY3QgdG8gYWRkIGtleXMgYW5kIHZhbHVlcyB0b1xuICogQHBhcmFtIHtQbGFpbk9iamVjdH0gc291cmNlT2JqZWN0IC0gU291cmNlIG9iamVjdCB0byBjb3B5IGtleXMgYW5kIHZhbHVlcyBmcm9tXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBleGNsdWRlS2V5cyAtIEFycmF5IG9mIGtleXMgdG8gZXhjbHVkZVxuICogQHBhcmFtIHsoc3RyaW5nOiBzdHJpbmcpID0+IHN0cmluZyA9IChrKSA9PiBrfSBrZXlGbiAtIEZ1bmN0aW9uIHRvIGFwcGx5IHRvIGtleXNcbiAqIEBwYXJhbSB7KGFueTogYW55KSA9PiBhbnkgPSAodikgPT4gdn0gdmFsdWVGbiAtIEZ1bmN0aW9uIHRvIGFwcGx5IHRvIHZhbHVlc1xuICogQHJldHVybiB7UGxhaW5PYmplY3R9IC0gUmV0dXJucyB0YXJnZXRPYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRmlsdGVyZWRPYmplY3QoXG4gIHRhcmdldE9iamVjdDogUGxhaW5PYmplY3QsXG4gIHNvdXJjZU9iamVjdDogUGxhaW5PYmplY3QsXG4gIGV4Y2x1ZGVLZXlzID0gPHN0cmluZ1tdPltdLFxuICBrZXlGbiA9IChrZXk6IHN0cmluZyk6IHN0cmluZyA9PiBrZXksXG4gIHZhbEZuID0gKHZhbDogYW55KTogYW55ID0+IHZhbFxuKTogUGxhaW5PYmplY3Qge1xuICBpZiAoIWlzT2JqZWN0KHNvdXJjZU9iamVjdCkpIHsgcmV0dXJuIHRhcmdldE9iamVjdDsgfVxuICBpZiAoIWlzT2JqZWN0KHRhcmdldE9iamVjdCkpIHsgdGFyZ2V0T2JqZWN0ID0ge307IH1cbiAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc291cmNlT2JqZWN0KSkge1xuICAgIGlmICghaW5BcnJheShrZXksIGV4Y2x1ZGVLZXlzKSAmJiBpc0RlZmluZWQoc291cmNlT2JqZWN0W2tleV0pKSB7XG4gICAgICB0YXJnZXRPYmplY3Rba2V5Rm4oa2V5KV0gPSB2YWxGbihzb3VyY2VPYmplY3Rba2V5XSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXRPYmplY3Q7XG59XG5cbi8qKlxuICogJ3VuaXF1ZUl0ZW1zJyBmdW5jdGlvblxuICpcbiAqIEFjY2VwdHMgYW55IG51bWJlciBvZiBzdHJpbmcgdmFsdWUgaW5wdXRzLFxuICogYW5kIHJldHVybnMgYW4gYXJyYXkgb2YgYWxsIGlucHV0IHZhdWVzLCBleGNsdWRpbmcgZHVwbGljYXRlcy5cbiAqXG4gKiBAcGFyYW0gey4uLnN0cmluZ30gLi4uaXRlbXMgLVxuICogQHJldHVybiB7c3RyaW5nW119IC1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVuaXF1ZUl0ZW1zKC4uLml0ZW1zKTogc3RyaW5nW10ge1xuICBjb25zdCByZXR1cm5JdGVtcyA9IFtdO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBpZiAoIXJldHVybkl0ZW1zLmluY2x1ZGVzKGl0ZW0pKSB7IHJldHVybkl0ZW1zLnB1c2goaXRlbSk7IH1cbiAgfVxuICByZXR1cm4gcmV0dXJuSXRlbXM7XG59XG5cbi8qKlxuICogJ2NvbW1vbkl0ZW1zJyBmdW5jdGlvblxuICpcbiAqIEFjY2VwdHMgYW55IG51bWJlciBvZiBzdHJpbmdzIG9yIGFycmF5cyBvZiBzdHJpbmcgdmFsdWVzLFxuICogYW5kIHJldHVybnMgYSBzaW5nbGUgYXJyYXkgY29udGFpbmluZyBvbmx5IHZhbHVlcyBwcmVzZW50IGluIGFsbCBpbnB1dHMuXG4gKlxuICogQHBhcmFtIHsuLi5zdHJpbmd8c3RyaW5nW119IC4uLmFycmF5cyAtXG4gKiBAcmV0dXJuIHtzdHJpbmdbXX0gLVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tbW9uSXRlbXMoLi4uYXJyYXlzKTogc3RyaW5nW10ge1xuICBsZXQgcmV0dXJuSXRlbXMgPSBudWxsO1xuICBmb3IgKGxldCBhcnJheSBvZiBhcnJheXMpIHtcbiAgICBpZiAoaXNTdHJpbmcoYXJyYXkpKSB7IGFycmF5ID0gW2FycmF5XTsgfVxuICAgIHJldHVybkl0ZW1zID0gcmV0dXJuSXRlbXMgPT09IG51bGwgPyBbIC4uLmFycmF5IF0gOlxuICAgICAgcmV0dXJuSXRlbXMuZmlsdGVyKGl0ZW0gPT4gYXJyYXkuaW5jbHVkZXMoaXRlbSkpO1xuICAgIGlmICghcmV0dXJuSXRlbXMubGVuZ3RoKSB7IHJldHVybiBbXTsgfVxuICB9XG4gIHJldHVybiByZXR1cm5JdGVtcztcbn1cblxuLyoqXG4gKiAnZml4VGl0bGUnIGZ1bmN0aW9uXG4gKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dCAtXG4gKiBAcmV0dXJuIHtzdHJpbmd9IC1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpeFRpdGxlKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBuYW1lICYmIHRvVGl0bGVDYXNlKG5hbWUucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxICQyJykucmVwbGFjZSgvXy9nLCAnICcpKTtcbn1cblxuLyoqXG4gKiAndG9UaXRsZUNhc2UnIGZ1bmN0aW9uXG4gKlxuICogSW50ZWxsaWdlbnRseSBjb252ZXJ0cyBhbiBpbnB1dCBzdHJpbmcgdG8gVGl0bGUgQ2FzZS5cbiAqXG4gKiBBY2NlcHRzIGFuIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXIgd2l0aCBhIGxpc3Qgb2YgYWRkaXRpb25hbFxuICogd29yZHMgYW5kIGFiYnJldmlhdGlvbnMgdG8gZm9yY2UgaW50byBhIHBhcnRpY3VsYXIgY2FzZS5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGJ1aWx0IG9uIHByaW9yIHdvcmsgYnkgSm9obiBHcnViZXIgYW5kIERhdmlkIEdvdWNoOlxuICogaHR0cDovL2RhcmluZ2ZpcmViYWxsLm5ldC8yMDA4LzA4L3RpdGxlX2Nhc2VfdXBkYXRlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZ291Y2gvdG8tdGl0bGUtY2FzZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dCAtXG4gKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gZm9yY2VXb3Jkcz8gLVxuICogQHJldHVybiB7c3RyaW5nfSAtXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b1RpdGxlQ2FzZShpbnB1dDogc3RyaW5nLCBmb3JjZVdvcmRzPzogc3RyaW5nfHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgaWYgKCFpc1N0cmluZyhpbnB1dCkpIHsgcmV0dXJuIGlucHV0OyB9XG4gIGxldCBmb3JjZUFycmF5OiBzdHJpbmdbXSA9IFsnYScsICdhbicsICdhbmQnLCAnYXMnLCAnYXQnLCAnYnV0JywgJ2J5JywgJ2VuJyxcbiAgICdmb3InLCAnaWYnLCAnaW4nLCAnbm9yJywgJ29mJywgJ29uJywgJ29yJywgJ3BlcicsICd0aGUnLCAndG8nLCAndicsICd2LicsXG4gICAndnMnLCAndnMuJywgJ3ZpYSddO1xuICBpZiAoaXNTdHJpbmcoZm9yY2VXb3JkcykpIHsgZm9yY2VXb3JkcyA9ICg8c3RyaW5nPmZvcmNlV29yZHMpLnNwbGl0KCd8Jyk7IH1cbiAgaWYgKGlzQXJyYXkoZm9yY2VXb3JkcykpIHsgZm9yY2VBcnJheSA9IGZvcmNlQXJyYXkuY29uY2F0KGZvcmNlV29yZHMpOyB9XG4gIGNvbnN0IGZvcmNlQXJyYXlMb3dlcjogc3RyaW5nW10gPSBmb3JjZUFycmF5Lm1hcCh3ID0+IHcudG9Mb3dlckNhc2UoKSk7XG4gIGNvbnN0IG5vSW5pdGlhbENhc2U6IGJvb2xlYW4gPVxuICAgIGlucHV0ID09PSBpbnB1dC50b1VwcGVyQ2FzZSgpIHx8IGlucHV0ID09PSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuICBsZXQgcHJldkxhc3RDaGFyID0gJyc7XG4gIGlucHV0ID0gaW5wdXQudHJpbSgpO1xuICByZXR1cm4gaW5wdXQucmVwbGFjZSgvW0EtWmEtejAtOVxcdTAwQzAtXFx1MDBGRl0rW15cXHMtXSovZywgKHdvcmQsIGlkeCkgPT4ge1xuICAgIGlmICghbm9Jbml0aWFsQ2FzZSAmJiB3b3JkLnNsaWNlKDEpLnNlYXJjaCgvW0EtWl18XFwuLi8pICE9PSAtMSkge1xuICAgICAgcmV0dXJuIHdvcmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBuZXdXb3JkOiBzdHJpbmc7XG4gICAgICBjb25zdCBmb3JjZVdvcmQ6IHN0cmluZyA9XG4gICAgICAgIGZvcmNlQXJyYXlbZm9yY2VBcnJheUxvd2VyLmluZGV4T2Yod29yZC50b0xvd2VyQ2FzZSgpKV07XG4gICAgICBpZiAoIWZvcmNlV29yZCkge1xuICAgICAgICBpZiAobm9Jbml0aWFsQ2FzZSkge1xuICAgICAgICAgIGlmICh3b3JkLnNsaWNlKDEpLnNlYXJjaCgvXFwuLi8pICE9PSAtMSkge1xuICAgICAgICAgICAgbmV3V29yZCA9IHdvcmQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3V29yZCA9IHdvcmRbMF0udG9VcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3V29yZCA9IHdvcmRbMF0udG9VcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGZvcmNlV29yZCA9PT0gZm9yY2VXb3JkLnRvTG93ZXJDYXNlKCkgJiYgKFxuICAgICAgICAgIGlkeCA9PT0gMCB8fCBpZHggKyB3b3JkLmxlbmd0aCA9PT0gaW5wdXQubGVuZ3RoIHx8XG4gICAgICAgICAgcHJldkxhc3RDaGFyID09PSAnOicgfHwgaW5wdXRbaWR4IC0gMV0uc2VhcmNoKC9bXlxccy1dLykgIT09IC0xIHx8XG4gICAgICAgICAgKGlucHV0W2lkeCAtIDFdICE9PSAnLScgJiYgaW5wdXRbaWR4ICsgd29yZC5sZW5ndGhdID09PSAnLScpXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICBuZXdXb3JkID0gZm9yY2VXb3JkWzBdLnRvVXBwZXJDYXNlKCkgKyBmb3JjZVdvcmQuc2xpY2UoMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdXb3JkID0gZm9yY2VXb3JkO1xuICAgICAgfVxuICAgICAgcHJldkxhc3RDaGFyID0gd29yZC5zbGljZSgtMSk7XG4gICAgICByZXR1cm4gbmV3V29yZDtcbiAgICB9XG4gIH0pO1xufVxuIl19