(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('rxjs-compat/observable/fromPromise'), require('@angular/core'), require('rxjs-compat/observable/forkJoin'), require('rxjs-compat/operator/map'), require('lodash'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('@ngsf/common', ['exports', 'rxjs', 'rxjs-compat/observable/fromPromise', '@angular/core', 'rxjs-compat/observable/forkJoin', 'rxjs-compat/operator/map', 'lodash', '@angular/forms'], factory) :
    (global = global || self, factory((global.ngsf = global.ngsf || {}, global.ngsf.common = {}), global.rxjs, global.fromPromise, global.ng.core, global.forkJoin, global.map, global.lodash, global.ng.forms));
}(this, (function (exports, rxjs, fromPromise, core, forkJoin, map, lodash, forms) { 'use strict';

    function executeAsyncValidators(control, validators, invert) {
        if (invert === void 0) { invert = false; }
        return validators.map(function (validator) { return validator(control, invert); });
    }

    function executeValidators(control, validators, invert) {
        if (invert === void 0) { invert = false; }
        return validators.map(function (validator) { return validator(control, invert); });
    }

    function isArray(item) {
        return Array.isArray(item) ||
            Object.prototype.toString.call(item) === '[object Array]';
    }

    function isObject(item) {
        return item !== null && typeof item === 'object' &&
            Object.prototype.toString.call(item) === '[object Object]';
    }

    function isBoolean(value, option) {
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

    function isInteger(value, strict) {
        if (strict === void 0) { strict = false; }
        if (strict && typeof value !== 'number') {
            return false;
        }
        return !isNaN(value) && value !== value / 0 && value % 1 === 0;
    }

    function isNumber(value, strict) {
        if (strict === void 0) { strict = false; }
        if (strict && typeof value !== 'number') {
            return false;
        }
        return !isNaN(value) && value !== value / 0;
    }

    function isString(value) {
        return typeof value === 'string';
    }

    function isDate(item) {
        return typeof item === 'object' &&
            Object.prototype.toString.call(item) === '[object Date]';
    }

    function isDefined(value) {
        return value !== undefined && value !== null;
    }

    function getType(value, strict) {
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

    function hasValue(value) {
        return value !== undefined && value !== null && value !== '';
    }

    function inArray(item, array, allIn) {
        if (allIn === void 0) { allIn = false; }
        if (!isDefined(item) || !isArray(array)) {
            return false;
        }
        return isArray(item) ?
            item[allIn ? 'every' : 'some'](function (subItem) { return array.includes(subItem); }) :
            array.includes(item);
    }

    function isEmpty(value) {
        if (isArray(value)) {
            return !value.length;
        }
        if (isObject(value)) {
            return !Object.keys(value).length;
        }
        return value === undefined || value === null || value === '';
    }

    function isFunction(item) {
        return typeof item === 'function';
    }

    function isMap(item) {
        return typeof item === 'object' &&
            Object.prototype.toString.call(item) === '[object Map]';
    }

    function isObservable(object) {
        return !!object && typeof object.subscribe === 'function';
    }

    function isPrimitive(value) {
        return (isString(value) || isNumber(value) ||
            isBoolean(value, 'strict') || value === null);
    }

    function isPromise(object) {
        return !!object && typeof object.then === 'function';
    }

    function isSet(item) {
        return typeof item === 'object' &&
            Object.prototype.toString.call(item) === '[object Set]';
    }

    function isSymbol(item) {
        return typeof item === 'symbol';
    }

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

    function xor(value1, value2) {
        return (!!value1 && !value2) || (!value1 && !!value2);
    }

    var __values = (this && this.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    function mergeObjects() {
        var e_1, _a, e_2, _b;
        var objects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            objects[_i] = arguments[_i];
        }
        var mergedObject = {};
        try {
            for (var objects_1 = __values(objects), objects_1_1 = objects_1.next(); !objects_1_1.done; objects_1_1 = objects_1.next()) {
                var currentObject = objects_1_1.value;
                if (isObject(currentObject)) {
                    try {
                        for (var _c = (e_2 = void 0, __values(Object.keys(currentObject))), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var key = _d.value;
                            var currentValue = currentObject[key];
                            var mergedValue = mergedObject[key];
                            mergedObject[key] = !isDefined(mergedValue) ? currentValue :
                                key === 'not' && isBoolean(mergedValue, 'strict') &&
                                    isBoolean(currentValue, 'strict') ? xor(mergedValue, currentValue) :
                                    getType(mergedValue) === 'object' && getType(currentValue) === 'object' ?
                                        mergeObjects(mergedValue, currentValue) :
                                        currentValue;
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (objects_1_1 && !objects_1_1.done && (_a = objects_1.return)) _a.call(objects_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return mergedObject;
    }

    var __read = (this && this.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread = (this && this.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    function mergeErrors(arrayOfErrors) {
        var mergedErrors = mergeObjects.apply(void 0, __spread(arrayOfErrors));
        return isEmpty(mergedErrors) ? null : mergedErrors;
    }

    function toJavaScriptType(value, types, strictIntegers) {
        if (strictIntegers === void 0) { strictIntegers = true; }
        if (!isDefined(value)) {
            return null;
        }
        types = typeof types === 'string' ? [types] : types;
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
            if (isDate(value)) {
                return value.toISOString().slice(0, 10);
            }
            if (isNumber(value)) {
                return value.toString();
            }
        }
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

    function toObservable(object) {
        var observable = isPromise(object) ? fromPromise.fromPromise(object) : object;
        if (rxjs.isObservable(observable)) {
            return observable;
        }
        console.error('toObservable error: Expected validator to return Promise or Observable.');
        return new rxjs.Observable();
    }

    function toPromise(object) {
        return isPromise(object) ? object : toPromise.call(object);
    }

    function toSchemaType(value, type) {
        var types = isArray(type) ? type : [type];
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
        if (types.includes('number') ||
            types.includes('integer')) {
            if (value === true) {
                return 1;
            }
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
            return 0;
        }
    }

    function addClasses(oldClasses, newClasses) {
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

    var __read$1 = (this && this.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread$1 = (this && this.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$1(arguments[i]));
        return ar;
    };
    var __values$1 = (this && this.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    function commonItems() {
        var e_1, _a;
        var arrays = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arrays[_i] = arguments[_i];
        }
        var returnItems = null;
        var _loop_1 = function (value) {
            var array = typeof value === 'string' ? [value] : value;
            returnItems = returnItems === null ? __spread$1(array) :
                returnItems.filter(function (item) { return array.includes(item); });
            if (!returnItems.length) {
                return { value: [] };
            }
        };
        try {
            for (var arrays_1 = __values$1(arrays), arrays_1_1 = arrays_1.next(); !arrays_1_1.done; arrays_1_1 = arrays_1.next()) {
                var value = arrays_1_1.value;
                var state_1 = _loop_1(value);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (arrays_1_1 && !arrays_1_1.done && (_a = arrays_1.return)) _a.call(arrays_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return returnItems;
    }

    var __assign = (this && this.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var __read$2 = (this && this.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread$2 = (this && this.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$2(arguments[i]));
        return ar;
    };
    function copy(object, errors) {
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
            return __spread$2(object);
        }
        if (isObject(object)) {
            return __assign({}, object);
        }
        if (errors) {
            console.error('copy error: Object to copy must be a JavaScript object or value.');
        }
        return object;
    }

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

    function fixTitle(name) {
        return name && toTitleCase(name.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' '));
    }

    var __values$2 = (this && this.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    function forEach(object, fn, recurse, rootObject, errors) {
        var e_1, _a;
        if (recurse === void 0) { recurse = false; }
        if (rootObject === void 0) { rootObject = object; }
        if (errors === void 0) { errors = false; }
        if (isEmpty(object)) {
            return;
        }
        if ((isObject(object) || isArray(object)) && typeof fn === 'function') {
            try {
                for (var _b = __values$2(Object.keys(object)), _c = _b.next(); !_c.done; _c = _b.next()) {
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

    var __values$3 = (this && this.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    function forEachCopy(object, fn, errors) {
        var e_1, _a;
        if (errors === void 0) { errors = false; }
        if (!hasValue(object)) {
            return;
        }
        if ((isObject(object) || isArray(object)) && typeof object !== 'function') {
            var newObject = isArray(object) ? [] : {};
            try {
                for (var _b = __values$3(Object.keys(object)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    newObject[key] = fn(object[key], key, object);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
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

    var __values$4 = (this && this.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    function mergeFilteredObject(targetObject, sourceObject, excludeKeys, keyFn, valFn) {
        var e_1, _a;
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
            for (var _b = __values$4(Object.keys(sourceObject)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                if (!inArray(key, excludeKeys) && isDefined(sourceObject[key])) {
                    targetObject[keyFn(key)] = valFn(sourceObject[key]);
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
        return targetObject;
    }

    var __values$5 = (this && this.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    function uniqueItems() {
        var e_1, _a;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var returnItems = [];
        try {
            for (var items_1 = __values$5(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var item = items_1_1.value;
                if (!returnItems.includes(item)) {
                    returnItems.push(item);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return returnItems;
    }

    var __assign$1 = (this && this.__assign) || function () {
        __assign$1 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$1.apply(this, arguments);
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __values$6 = (this && this.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var __read$3 = (this && this.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread$3 = (this && this.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$3(arguments[i]));
        return ar;
    };
    var JsonPointer = (function () {
        function JsonPointer() {
        }
        JsonPointer.get = function (object, pointer, startSlice, endSlice, getBoolean, errors) {
            var e_1, _a;
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
                    for (var keyArray_1 = __values$6(keyArray), keyArray_1_1 = keyArray_1.next(); !keyArray_1_1.done; keyArray_1_1 = keyArray_1.next()) {
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
        };
        JsonPointer.getCopy = function (object, pointer, startSlice, endSlice, getBoolean, errors) {
            if (startSlice === void 0) { startSlice = 0; }
            if (endSlice === void 0) { endSlice = null; }
            if (getBoolean === void 0) { getBoolean = false; }
            if (errors === void 0) { errors = false; }
            var objectToCopy = this.get(object, pointer, startSlice, endSlice, getBoolean, errors);
            return this.forEachDeepCopy(objectToCopy);
        };
        JsonPointer.getFirst = function (items, defaultValue, getCopy) {
            var e_2, _a, e_3, _b;
            if (defaultValue === void 0) { defaultValue = null; }
            if (getCopy === void 0) { getCopy = false; }
            if (isEmpty(items)) {
                return;
            }
            if (isArray(items)) {
                try {
                    for (var items_1 = __values$6(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
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
                    for (var _c = __values$6(items), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var _e = __read$3(_d.value, 2), object = _e[0], pointer = _e[1];
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
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                return defaultValue;
            }
            console.error('getFirst error: Input not in correct format.\n' +
                'Should be: [ [ object1, pointer1 ], [ object 2, pointer2 ], etc... ]');
            return defaultValue;
        };
        JsonPointer.getFirstCopy = function (items, defaultValue) {
            if (defaultValue === void 0) { defaultValue = null; }
            return this.getFirst(items, defaultValue, true);
        };
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
        JsonPointer.insert = function (object, pointer, value) {
            var updatedObject = this.set(object, pointer, value, true);
            return updatedObject;
        };
        JsonPointer.insertCopy = function (object, pointer, value) {
            var updatedObject = this.setCopy(object, pointer, value, true);
            return updatedObject;
        };
        JsonPointer.remove = function (object, pointer) {
            var keyArray = this.parse(pointer);
            if (keyArray !== null && keyArray.length) {
                var lastKey = keyArray.pop();
                var parentObject = this.get(object, keyArray);
                if (Array.isArray(parentObject)) {
                    var lastIndex = (lastKey === '-') ? parentObject.length - 1 : parseInt(lastKey, 10);
                    parentObject.splice(lastIndex, 1);
                }
                else if (isObject(parentObject)) {
                    delete parentObject[lastKey];
                }
                return object;
            }
            console.error("remove error: Invalid JSON Pointer: " + pointer);
            return object;
        };
        JsonPointer.has = function (object, pointer) {
            return this.get(object, pointer, 0, null, true);
        };
        JsonPointer.dict = function (object) {
            var results = {};
            this.forEachDeep(object, function (value, pointer) {
                if (typeof value !== 'object') {
                    results[pointer] = value;
                }
            });
            return results;
        };
        JsonPointer.forEachDeep = function (object, fn, bottomUp, pointer, rootObject) {
            var e_4, _a;
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
                    for (var _b = __values$6(Object.keys(object)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var key = _c.value;
                        var newPointer = pointer + '/' + this.escape(key);
                        this.forEachDeep(object[key], fn, bottomUp, newPointer, rootObject);
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
            if (bottomUp) {
                fn(object, pointer, rootObject);
            }
        };
        JsonPointer.forEachDeepCopy = function (object, fn, bottomUp, pointer, rootObject) {
            var e_5, _a;
            if (fn === void 0) { fn = function (v) { return v; }; }
            if (bottomUp === void 0) { bottomUp = false; }
            if (pointer === void 0) { pointer = ''; }
            if (rootObject === void 0) { rootObject = object; }
            if (typeof fn !== 'function') {
                console.error("forEachDeepCopy error: Iterator is not a function:", fn);
                return null;
            }
            if (isObject(object) || Array.isArray(object)) {
                var newObject = Array.isArray(object) ? __spread$3(object) : __assign$1({}, object);
                if (!bottomUp) {
                    newObject = fn(newObject, pointer, rootObject);
                }
                try {
                    for (var _b = __values$6(Object.keys(newObject)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var key = _c.value;
                        var newPointer = pointer + '/' + this.escape(key);
                        newObject[key] = this.forEachDeepCopy(newObject[key], fn, bottomUp, newPointer, rootObject);
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
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
        };
        JsonPointer.escape = function (key) {
            return key.toString().replace(/~/g, '~0').replace(/\//g, '~1');
        };
        JsonPointer.unescape = function (key) {
            return key.toString().replace(/~1/g, '/').replace(/~0/g, '~');
        };
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
            if (Array.isArray(pointer)) {
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
        JsonPointer.toIndexedPointer = function (genericPointer, indexArray, arrayMap) {
            var e_6, _a;
            if (arrayMap === void 0) { arrayMap = null; }
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
                        for (var indexArray_1 = __values$6(indexArray), indexArray_1_1 = indexArray_1.next(); !indexArray_1_1.done; indexArray_1_1 = indexArray_1.next()) {
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
        };
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
        JsonPointer.toControlPointer = function (dataPointer, formGroup, controlMustExist) {
            var e_7, _a;
            if (controlMustExist === void 0) { controlMustExist = false; }
            var dataPointerArray = this.parse(dataPointer);
            var controlPointerArray = [];
            var subGroup = formGroup;
            if (dataPointerArray !== null) {
                try {
                    for (var dataPointerArray_1 = __values$6(dataPointerArray), dataPointerArray_1_1 = dataPointerArray_1.next(); !dataPointerArray_1_1.done; dataPointerArray_1_1 = dataPointerArray_1.next()) {
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
        };
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
                    var nextOB = path.indexOf('[', index);
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
                        var quote = path.charAt(nextOB + 1);
                        if (quote === '"' || quote === '\'') {
                            var nextCB = path.indexOf(quote + ']', nextOB);
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
                            var nextCB = path.indexOf(']', nextOB);
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
        JsonPointer = __decorate([
            core.Injectable()
        ], JsonPointer);
        return JsonPointer;
    }());

    var jsonSchemaFormatTests = {
        date: /^\d\d\d\d-[0-1]\d-[0-3]\d$/,
        time: /^[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:z|[+-]\d\d:\d\d)?$/i,
        'date-time': /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s][0-2]\d:[0-5]\d(?::[0-5]\d)?(?:\.\d+)?(?:z|[+-]\d\d:\d\d)?$/i,
        email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i,
        hostname: /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*$/i,
        ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
        ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
        uri: /^(?:[a-z][a-z0-9+-.]*)(?::|\/)\/?[^\s]*$/i,
        'uri-reference': /^(?:(?:[a-z][a-z0-9+-.]*:)?\/\/)?[^\s]*$/i,
        'uri-template': /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
        url: /^(?:(?:http[s\u017F]?|ftp):\/\/)(?:(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+(?::(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?@)?(?:(?!10(?:\.[0-9]{1,3}){3})(?!127(?:\.[0-9]{1,3}){3})(?!169\.254(?:\.[0-9]{1,3}){2})(?!192\.168(?:\.[0-9]{1,3}){2})(?!172\.(?:1[6-9]|2[0-9]|3[01])(?:\.[0-9]{1,3}){2})(?:[1-9][0-9]?|1[0-9][0-9]|2[01][0-9]|22[0-3])(?:\.(?:1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])){2}(?:\.(?:[1-9][0-9]?|1[0-9][0-9]|2[0-4][0-9]|25[0-4]))|(?:(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)(?:\.(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)*(?:\.(?:(?:[KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){2,})))(?::[0-9]{2,5})?(?:\/(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?$/i,
        uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
        color: /^\s*(#(?:[\da-f]{3}){1,2}|rgb\((?:\d{1,3},\s*){2}\d{1,3}\)|rgba\((?:\d{1,3},\s*){3}\d*\.?\d+\)|hsl\(\d{1,3}(?:,\s*\d{1,3}%){2}\)|hsla\(\d{1,3}(?:,\s*\d{1,3}%){2},\s*\d*\.?\d+\))\s*$/gi,
        'json-pointer': /^(?:\/(?:[^~/]|~0|~1)*)*$|^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
        'relative-json-pointer': /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
        regex: function (str) {
            if (/[^\\]\\Z/.test(str)) {
                return false;
            }
            try {
                new RegExp(str);
                return true;
            }
            catch (e) {
                return false;
            }
        }
    };

    var __values$7 = (this && this.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var __read$4 = (this && this.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread$4 = (this && this.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$4(arguments[i]));
        return ar;
    };
    var JsonValidators = (function () {
        function JsonValidators() {
        }
        JsonValidators.required = function (input) {
            if (input === undefined) {
                input = true;
            }
            switch (input) {
                case true:
                    return function (control, invert) {
                        if (invert === void 0) { invert = false; }
                        if (invert) {
                            return null;
                        }
                        return hasValue(control.value) ? null : { required: true };
                    };
                case false:
                    return JsonValidators.nullValidator;
                default:
                    return hasValue(input.value) ? null : { required: true };
            }
        };
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
                    null : { type: { requiredType: requiredType, currentValue: currentValue } };
            };
        };
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
                var isEqual$1 = function (enumValue, inputValue) {
                    return enumValue === inputValue ||
                        (isNumber(enumValue) && +inputValue === +enumValue) ||
                        (isBoolean(enumValue, 'strict') &&
                            toJavaScriptType(inputValue, 'boolean') === enumValue) ||
                        (enumValue === null && !hasValue(inputValue)) ||
                        lodash.isEqual(enumValue, inputValue);
                };
                var isValid = isArray(currentValue) ?
                    currentValue.every(function (inputValue) { return allowedValues.some(function (enumValue) {
                        return isEqual$1(enumValue, inputValue);
                    }); }) :
                    allowedValues.some(function (enumValue) { return isEqual$1(enumValue, currentValue); });
                return xor(isValid, invert) ?
                    null : { enum: { allowedValues: allowedValues, currentValue: currentValue } };
            };
        };
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
                    null : { const: { requiredValue: requiredValue, currentValue: currentValue } };
            };
        };
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
                    null : { minLength: { minimumLength: minimumLength, currentLength: currentLength } };
            };
        };
        JsonValidators.maxLength = function (maximumLength) {
            if (!hasValue(maximumLength)) {
                return JsonValidators.nullValidator;
            }
            return function (control, invert) {
                if (invert === void 0) { invert = false; }
                var currentLength = isString(control.value) ? control.value.length : 0;
                var isValid = currentLength <= maximumLength;
                return xor(isValid, invert) ?
                    null : { maxLength: { maximumLength: maximumLength, currentLength: currentLength } };
            };
        };
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
                    null : { pattern: { requiredPattern: requiredPattern, currentValue: currentValue } };
            };
        };
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
                    isValid = ['date', 'time', 'date-time'].includes(requiredFormat) &&
                        Object.prototype.toString.call(currentValue) === '[object Date]';
                }
                return xor(isValid, invert) ?
                    null : { format: { requiredFormat: requiredFormat, currentValue: currentValue } };
            };
        };
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
                    null : { minimum: { minimumValue: minimumValue, currentValue: currentValue } };
            };
        };
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
                    null : { exclusiveMinimum: { exclusiveMinimumValue: exclusiveMinimumValue, currentValue: currentValue } };
            };
        };
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
                    null : { maximum: { maximumValue: maximumValue, currentValue: currentValue } };
            };
        };
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
                    null : { exclusiveMaximum: { exclusiveMaximumValue: exclusiveMaximumValue, currentValue: currentValue } };
            };
        };
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
                    null : { multipleOf: { multipleOfValue: multipleOfValue, currentValue: currentValue } };
            };
        };
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
                    null : { minProperties: { minimumProperties: minimumProperties, currentProperties: currentProperties } };
            };
        };
        JsonValidators.maxProperties = function (maximumProperties) {
            if (!hasValue(maximumProperties)) {
                return JsonValidators.nullValidator;
            }
            return function (control, invert) {
                if (invert === void 0) { invert = false; }
                var currentProperties = Object.keys(control.value).length || 0;
                var isValid = currentProperties <= maximumProperties;
                return xor(isValid, invert) ?
                    null : { maxProperties: { maximumProperties: maximumProperties, currentProperties: currentProperties } };
            };
        };
        JsonValidators.dependencies = function (dependencies) {
            if (getType(dependencies) !== 'object' || isEmpty(dependencies)) {
                return JsonValidators.nullValidator;
            }
            return function (control, invert) {
                if (invert === void 0) { invert = false; }
                if (isEmpty(control.value)) {
                    return null;
                }
                var allErrors = mergeObjects(forEachCopy(dependencies, function (value, requiringField) {
                    var e_1, _a, _b;
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
                        requiredFields = dependencies[requiringField].required || [];
                        properties = dependencies[requiringField].properties || {};
                    }
                    try {
                        for (var requiredFields_1 = __values$7(requiredFields), requiredFields_1_1 = requiredFields_1.next(); !requiredFields_1_1.done; requiredFields_1_1 = requiredFields_1.next()) {
                            var requiredField = requiredFields_1_1.value;
                            if (xor(!hasValue(control.value[requiredField]), invert)) {
                                requiringFieldErrors[requiredField] = { required: true };
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
                    requiringFieldErrors = mergeObjects(requiringFieldErrors, forEachCopy(properties, function (requirements, requiredField) {
                        var _a;
                        var requiredFieldErrors = mergeObjects(forEachCopy(requirements, function (requirement, parameter) {
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
                    }));
                    return isEmpty(requiringFieldErrors) ?
                        null : (_b = {}, _b[requiringField] = requiringFieldErrors, _b);
                }));
                return isEmpty(allErrors) ? null : allErrors;
            };
        };
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
                    null : { minItems: { minimumItems: minimumItems, currentItems: currentItems } };
            };
        };
        JsonValidators.maxItems = function (maximumItems) {
            if (!hasValue(maximumItems)) {
                return JsonValidators.nullValidator;
            }
            return function (control, invert) {
                if (invert === void 0) { invert = false; }
                var currentItems = isArray(control.value) ? control.value.length : 0;
                var isValid = currentItems <= maximumItems;
                return xor(isValid, invert) ?
                    null : { maxItems: { maximumItems: maximumItems, currentItems: currentItems } };
            };
        };
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
                    null : { uniqueItems: { duplicateItems: duplicateItems } };
            };
        };
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
                var isValid = true;
                return xor(isValid, invert) ?
                    null : { contains: { requiredItem: requiredItem, currentItems: currentItems } };
            };
        };
        JsonValidators.nullValidator = function (control) {
            return null;
        };
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
                var arrayOfErrors = executeValidators(control, presentValidators, invert).filter(isDefined);
                var isValid = validators.length > arrayOfErrors.length;
                return xor(isValid, invert) ?
                    null : mergeObjects.apply(void 0, __spread$4(arrayOfErrors, [{ anyOf: !invert }]));
            };
        };
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
                var arrayOfErrors = executeValidators(control, presentValidators);
                var validControls = validators.length - arrayOfErrors.filter(isDefined).length;
                var isValid = validControls === 1;
                if (xor(isValid, invert)) {
                    return null;
                }
                var arrayOfValids = executeValidators(control, presentValidators, invert);
                return mergeObjects.apply(void 0, __spread$4(arrayOfErrors, arrayOfValids, [{ oneOf: !invert }]));
            };
        };
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
                var combinedErrors = mergeErrors(executeValidators(control, presentValidators, invert));
                var isValid = combinedErrors === null;
                return (xor(isValid, invert)) ?
                    null : mergeObjects(combinedErrors, { allOf: !invert });
            };
        };
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
                    null : mergeObjects(error, { not: !invert });
            };
        };
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
                return mergeErrors(executeValidators(control, presentValidators, invert));
            };
        };
        JsonValidators.composeAsync = function (validators) {
            if (!validators) {
                return null;
            }
            var presentValidators = validators.filter(isDefined);
            if (presentValidators.length === 0) {
                return null;
            }
            return function (control) {
                var observables = executeAsyncValidators(control, presentValidators).map(toObservable);
                return map.map.call(forkJoin.forkJoin(observables), mergeErrors);
            };
        };
        JsonValidators.min = function (min) {
            if (!hasValue(min)) {
                return JsonValidators.nullValidator;
            }
            return function (control) {
                if (isEmpty(control.value) || isEmpty(min)) {
                    return null;
                }
                var value = parseFloat(control.value);
                var actual = control.value;
                return isNaN(value) || value >= min ? null : { min: { min: min, actual: actual } };
            };
        };
        JsonValidators.max = function (max) {
            if (!hasValue(max)) {
                return JsonValidators.nullValidator;
            }
            return function (control) {
                if (isEmpty(control.value) || isEmpty(max)) {
                    return null;
                }
                var value = parseFloat(control.value);
                var actual = control.value;
                return isNaN(value) || value <= max ? null : { max: { max: max, actual: actual } };
            };
        };
        JsonValidators.requiredTrue = function (control) {
            if (!control) {
                return JsonValidators.nullValidator;
            }
            return control.value === true ? null : { required: true };
        };
        JsonValidators.email = function (control) {
            if (!control) {
                return JsonValidators.nullValidator;
            }
            var EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
            return EMAIL_REGEXP.test(control.value) ? null : { email: true };
        };
        return JsonValidators;
    }());

    var __assign$2 = (this && this.__assign) || function () {
        __assign$2 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$2.apply(this, arguments);
    };
    var __values$8 = (this && this.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    function buildSchemaFromData(data, requireAllFields, isRoot) {
        var e_1, _a;
        if (requireAllFields === void 0) { requireAllFields = false; }
        if (isRoot === void 0) { isRoot = true; }
        var newSchema = {};
        var getFieldType = function (value) {
            var fieldType = getType(value, 'strict');
            return { integer: 'number', null: 'string' }[fieldType] || fieldType;
        };
        var buildSubSchema = function (value) {
            return buildSchemaFromData(value, requireAllFields, false);
        };
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
                for (var _b = __values$8(Object.keys(data)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    newSchema.properties[key] = buildSubSchema(data[key]);
                    if (requireAllFields) {
                        newSchema.required.push(key);
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
        else if (newSchema.type === 'array') {
            newSchema.items = data.map(buildSubSchema);
            if ((new Set(data.map(getFieldType))).size === 1) {
                newSchema.items = newSchema.items.reduce(function (a, b) { return (__assign$2(__assign$2({}, a), b)); }, {});
            }
            if (requireAllFields) {
                newSchema.minItems = 1;
            }
        }
        return newSchema;
    }

    function buildSchemaFromLayout(layout) {
        return;
    }

    function checkInlineType(controlType, schema, layoutNode) {
        if (layoutNode === void 0) { layoutNode = null; }
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

    var __assign$3 = (this && this.__assign) || function () {
        __assign$3 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$3.apply(this, arguments);
    };
    var __values$9 = (this && this.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var __read$5 = (this && this.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread$5 = (this && this.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$5(arguments[i]));
        return ar;
    };
    function mergeSchemas() {
        var e_1, _a, e_2, _b;
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
            for (var schemas_1 = __values$9(schemas), schemas_1_1 = schemas_1.next(); !schemas_1_1.done; schemas_1_1 = schemas_1.next()) {
                var schema = schemas_1_1.value;
                var _loop_1 = function (key) {
                    var e_3, _a, e_4, _b, e_5, _c, e_6, _d;
                    var combinedValue = combinedSchema[key];
                    var schemaValue = schema[key];
                    if (!hasOwn(combinedSchema, key) || lodash.isEqual(combinedValue, schemaValue)) {
                        combinedSchema[key] = schemaValue;
                    }
                    else {
                        switch (key) {
                            case 'allOf':
                                if (isArray(combinedValue) && isArray(schemaValue)) {
                                    combinedSchema.allOf = mergeSchemas.apply(void 0, __spread$5(combinedValue, schemaValue));
                                }
                                else {
                                    return { value: { allOf: __spread$5(schemas) } };
                                }
                                break;
                            case 'additionalItems':
                            case 'additionalProperties':
                            case 'contains':
                            case 'propertyNames':
                                if (isObject(combinedValue) && isObject(schemaValue)) {
                                    combinedSchema[key] = mergeSchemas(combinedValue, schemaValue);
                                }
                                else if (key === 'additionalProperties' &&
                                    (combinedValue === false || schemaValue === false)) {
                                    combinedSchema.combinedSchema = false;
                                }
                                else {
                                    return { value: { allOf: __spread$5(schemas) } };
                                }
                                break;
                            case 'anyOf':
                            case 'oneOf':
                            case 'enum':
                                if (isArray(combinedValue) && isArray(schemaValue)) {
                                    combinedSchema[key] = combinedValue.filter(function (item1) {
                                        return schemaValue.findIndex(function (item2) { return lodash.isEqual(item1, item2); }) > -1;
                                    });
                                    if (!combinedSchema[key].length) {
                                        return { value: { allOf: __spread$5(schemas) } };
                                    }
                                }
                                else {
                                    return { value: { allOf: __spread$5(schemas) } };
                                }
                                break;
                            case 'definitions':
                                if (isObject(combinedValue) && isObject(schemaValue)) {
                                    var combinedObject = __assign$3({}, combinedValue);
                                    try {
                                        for (var _e = (e_3 = void 0, __values$9(Object.keys(schemaValue))), _f = _e.next(); !_f.done; _f = _e.next()) {
                                            var subKey = _f.value;
                                            if (!hasOwn(combinedObject, subKey) ||
                                                lodash.isEqual(combinedObject[subKey], schemaValue[subKey])) {
                                                combinedObject[subKey] = schemaValue[subKey];
                                            }
                                            else {
                                                return { value: { allOf: __spread$5(schemas) } };
                                            }
                                        }
                                    }
                                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                    finally {
                                        try {
                                            if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                                        }
                                        finally { if (e_3) throw e_3.error; }
                                    }
                                    combinedSchema.definitions = combinedObject;
                                }
                                else {
                                    return { value: { allOf: __spread$5(schemas) } };
                                }
                                break;
                            case 'dependencies':
                                if (isObject(combinedValue) && isObject(schemaValue)) {
                                    var combinedObject = __assign$3({}, combinedValue);
                                    try {
                                        for (var _g = (e_4 = void 0, __values$9(Object.keys(schemaValue))), _h = _g.next(); !_h.done; _h = _g.next()) {
                                            var subKey = _h.value;
                                            if (!hasOwn(combinedObject, subKey) ||
                                                lodash.isEqual(combinedObject[subKey], schemaValue[subKey])) {
                                                combinedObject[subKey] = schemaValue[subKey];
                                            }
                                            else if (isArray(schemaValue[subKey]) && isArray(combinedObject[subKey])) {
                                                combinedObject[subKey] = uniqueItems.apply(void 0, __spread$5(combinedObject[subKey], schemaValue[subKey]));
                                            }
                                            else if ((isArray(schemaValue[subKey]) || isObject(schemaValue[subKey])) &&
                                                (isArray(combinedObject[subKey]) || isObject(combinedObject[subKey]))) {
                                                var required = isArray(combinedSchema.required) ?
                                                    combinedSchema.required : [];
                                                var combinedDependency = isArray(combinedObject[subKey]) ?
                                                    { required: uniqueItems.apply(void 0, __spread$5(required, [combinedObject[subKey]])) } :
                                                    combinedObject[subKey];
                                                var schemaDependency = isArray(schemaValue[subKey]) ?
                                                    { required: uniqueItems.apply(void 0, __spread$5(required, [schemaValue[subKey]])) } :
                                                    schemaValue[subKey];
                                                combinedObject[subKey] =
                                                    mergeSchemas(combinedDependency, schemaDependency);
                                            }
                                            else {
                                                return { value: { allOf: __spread$5(schemas) } };
                                            }
                                        }
                                    }
                                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                    finally {
                                        try {
                                            if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                                        }
                                        finally { if (e_4) throw e_4.error; }
                                    }
                                    combinedSchema.dependencies = combinedObject;
                                }
                                else {
                                    return { value: { allOf: __spread$5(schemas) } };
                                }
                                break;
                            case 'items':
                                if (isArray(combinedValue) && isArray(schemaValue)) {
                                    combinedSchema.items = combinedValue.filter(function (item1) {
                                        return schemaValue.findIndex(function (item2) { return lodash.isEqual(item1, item2); }) > -1;
                                    });
                                    if (!combinedSchema.items.length) {
                                        return { value: { allOf: __spread$5(schemas) } };
                                    }
                                }
                                else if (isObject(combinedValue) && isObject(schemaValue)) {
                                    combinedSchema.items = mergeSchemas(combinedValue, schemaValue);
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
                                    return { value: { allOf: __spread$5(schemas) } };
                                }
                                break;
                            case 'multipleOf':
                                if (isNumber(combinedValue) && isNumber(schemaValue)) {
                                    var gcd_1 = function (x, y) { return !y ? x : gcd_1(y, x % y); };
                                    var lcm = function (x, y) { return (x * y) / gcd_1(x, y); };
                                    combinedSchema.multipleOf = lcm(combinedValue, schemaValue);
                                }
                                else {
                                    return { value: { allOf: __spread$5(schemas) } };
                                }
                                break;
                            case 'maximum':
                            case 'exclusiveMaximum':
                            case 'maxLength':
                            case 'maxItems':
                            case 'maxProperties':
                                if (isNumber(combinedValue) && isNumber(schemaValue)) {
                                    combinedSchema[key] = Math.min(combinedValue, schemaValue);
                                }
                                else {
                                    return { value: { allOf: __spread$5(schemas) } };
                                }
                                break;
                            case 'minimum':
                            case 'exclusiveMinimum':
                            case 'minLength':
                            case 'minItems':
                            case 'minProperties':
                                if (isNumber(combinedValue) && isNumber(schemaValue)) {
                                    combinedSchema[key] = Math.max(combinedValue, schemaValue);
                                }
                                else {
                                    return { value: { allOf: __spread$5(schemas) } };
                                }
                                break;
                            case 'not':
                                if (isObject(combinedValue) && isObject(schemaValue)) {
                                    var notAnyOf = [combinedValue, schemaValue]
                                        .reduce(function (notAnyOfArray, notSchema) {
                                        return isArray(notSchema.anyOf) &&
                                            Object.keys(notSchema).length === 1 ? __spread$5(notAnyOfArray, notSchema.anyOf) : __spread$5(notAnyOfArray, [notSchema]);
                                    }, []);
                                    combinedSchema.not = { anyOf: notAnyOf };
                                }
                                else {
                                    return { value: { allOf: __spread$5(schemas) } };
                                }
                                break;
                            case 'patternProperties':
                                if (isObject(combinedValue) && isObject(schemaValue)) {
                                    var combinedObject = __assign$3({}, combinedValue);
                                    try {
                                        for (var _j = (e_5 = void 0, __values$9(Object.keys(schemaValue))), _k = _j.next(); !_k.done; _k = _j.next()) {
                                            var subKey = _k.value;
                                            if (!hasOwn(combinedObject, subKey) ||
                                                lodash.isEqual(combinedObject[subKey], schemaValue[subKey])) {
                                                combinedObject[subKey] = schemaValue[subKey];
                                            }
                                            else if (isObject(schemaValue[subKey]) && isObject(combinedObject[subKey])) {
                                                combinedObject[subKey] =
                                                    mergeSchemas(combinedObject[subKey], schemaValue[subKey]);
                                            }
                                            else {
                                                return { value: { allOf: __spread$5(schemas) } };
                                            }
                                        }
                                    }
                                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                    finally {
                                        try {
                                            if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                                        }
                                        finally { if (e_5) throw e_5.error; }
                                    }
                                    combinedSchema.patternProperties = combinedObject;
                                }
                                else {
                                    return { value: { allOf: __spread$5(schemas) } };
                                }
                                break;
                            case 'properties':
                                if (isObject(combinedValue) && isObject(schemaValue)) {
                                    var combinedObject_1 = __assign$3({}, combinedValue);
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
                                        for (var _l = (e_6 = void 0, __values$9(Object.keys(schemaValue))), _m = _l.next(); !_m.done; _m = _l.next()) {
                                            var subKey = _m.value;
                                            if (lodash.isEqual(combinedObject_1[subKey], schemaValue[subKey]) || (!hasOwn(combinedObject_1, subKey) &&
                                                !hasOwn(combinedObject_1, 'additionalProperties'))) {
                                                combinedObject_1[subKey] = schemaValue[subKey];
                                            }
                                            else if (!hasOwn(combinedObject_1, subKey) &&
                                                hasOwn(combinedObject_1, 'additionalProperties')) {
                                                if (isObject(combinedObject_1.additionalProperties)) {
                                                    combinedObject_1[subKey] = mergeSchemas(combinedObject_1.additionalProperties, schemaValue[subKey]);
                                                }
                                            }
                                            else if (isObject(schemaValue[subKey]) &&
                                                isObject(combinedObject_1[subKey])) {
                                                combinedObject_1[subKey] =
                                                    mergeSchemas(combinedObject_1[subKey], schemaValue[subKey]);
                                            }
                                            else {
                                                return { value: { allOf: __spread$5(schemas) } };
                                            }
                                        }
                                    }
                                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                                    finally {
                                        try {
                                            if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                                        }
                                        finally { if (e_6) throw e_6.error; }
                                    }
                                    combinedSchema.properties = combinedObject_1;
                                }
                                else {
                                    return { value: { allOf: __spread$5(schemas) } };
                                }
                                break;
                            case 'required':
                                if (isArray(combinedValue) && isArray(schemaValue)) {
                                    combinedSchema.required = uniqueItems.apply(void 0, __spread$5(combinedValue, schemaValue));
                                }
                                else if (typeof schemaValue === 'boolean' &&
                                    typeof combinedValue === 'boolean') {
                                    combinedSchema.required = !!combinedValue || !!schemaValue;
                                }
                                else {
                                    return { value: { allOf: __spread$5(schemas) } };
                                }
                                break;
                            case '$schema':
                            case '$id':
                            case 'id':
                                break;
                            case 'title':
                            case 'description':
                                combinedSchema[key] = schemaValue;
                                break;
                            case 'type':
                                if ((isArray(schemaValue) || isString(schemaValue)) &&
                                    (isArray(combinedValue) || isString(combinedValue))) {
                                    var combinedTypes = commonItems(combinedValue, schemaValue);
                                    if (!combinedTypes.length) {
                                        return { value: { allOf: __spread$5(schemas) } };
                                    }
                                    combinedSchema.type = combinedTypes.length > 1 ? combinedTypes : combinedTypes[0];
                                }
                                else {
                                    return { value: { allOf: __spread$5(schemas) } };
                                }
                                break;
                            case 'uniqueItems':
                                combinedSchema.uniqueItems = !!combinedValue || !!schemaValue;
                                break;
                            default: return { value: { allOf: __spread$5(schemas) } };
                        }
                    }
                };
                try {
                    for (var _c = (e_2 = void 0, __values$9(Object.keys(schema))), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var key = _d.value;
                        var state_1 = _loop_1(key);
                        if (typeof state_1 === "object")
                            return state_1.value;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (schemas_1_1 && !schemas_1_1.done && (_a = schemas_1.return)) _a.call(schemas_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return combinedSchema;
    }

    var __assign$4 = (this && this.__assign) || function () {
        __assign$4 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$4.apply(this, arguments);
    };
    var __read$6 = (this && this.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread$6 = (this && this.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$6(arguments[i]));
        return ar;
    };
    function combineAllOf(schema) {
        if (!isObject(schema) || !isArray(schema.allOf)) {
            return schema;
        }
        var mergedSchema = mergeSchemas.apply(void 0, __spread$6(schema.allOf));
        if (Object.keys(schema).length > 1) {
            var extraKeys = __assign$4({}, schema);
            delete extraKeys.allOf;
            mergedSchema = mergeSchemas(mergedSchema, extraKeys);
        }
        return mergedSchema;
    }

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

    function getFromSchema(schema, dataPointer, returnType) {
        if (returnType === void 0) { returnType = 'schema'; }
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
            var parentSchema = subSchema;
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

    var __assign$5 = (this && this.__assign) || function () {
        __assign$5 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$5.apply(this, arguments);
    };
    var __read$7 = (this && this.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    function getTitleMapFromOneOf(schema, flatList, validateOnly) {
        if (schema === void 0) { schema = {}; }
        if (flatList === void 0) { flatList = null; }
        if (validateOnly === void 0) { validateOnly = false; }
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
            if (flatList !== false && (titleMap || [])
                .filter(function (title) { return ((title || {}).name || '').indexOf(': '); }).length > 1) {
                var newTitleMap_1 = titleMap.map(function (title) {
                    var _a = __read$7(title.name.split(/: (.+)/), 2), group = _a[0], name = _a[1];
                    return group && name ? __assign$5(__assign$5({}, title), { group: group, name: name }) : title;
                });
                if (flatList === true || newTitleMap_1.some(function (title, index) { return index &&
                    hasOwn(title, 'group') && title.group === newTitleMap_1[index - 1].group; })) {
                    titleMap = newTitleMap_1;
                }
            }
        }
        return validateOnly ? false : titleMap;
    }

    function getInputType(schema, layoutNode) {
        if (layoutNode === void 0) { layoutNode = null; }
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
                    color: 'color',
                    date: 'date',
                    'date-time': 'datetime-local',
                    email: 'email',
                    uri: 'url',
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

    function removeRecursiveReferences(pointer, recursiveRefMap, arrayMap) {
        if (arrayMap === void 0) { arrayMap = new Map(); }
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

    var __assign$6 = (this && this.__assign) || function () {
        __assign$6 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$6.apply(this, arguments);
    };
    var __read$8 = (this && this.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread$7 = (this && this.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$8(arguments[i]));
        return ar;
    };
    function getSubSchema(schema, pointerArg, schemaRefLibrary, schemaRecursiveRefMap, usedPointers) {
        if (schemaRefLibrary === void 0) { schemaRefLibrary = null; }
        if (schemaRecursiveRefMap === void 0) { schemaRecursiveRefMap = null; }
        if (usedPointers === void 0) { usedPointers = []; }
        if (!schemaRefLibrary || !schemaRecursiveRefMap) {
            return JsonPointer.getCopy(schema, pointerArg);
        }
        var pointer = typeof pointerArg !== 'string' ? JsonPointer.compile(pointerArg) : pointerArg;
        usedPointers = __spread$7(usedPointers, [pointer]);
        var newSchema = null;
        if (pointer === '') {
            newSchema = lodash.cloneDeep(schema);
        }
        else {
            var shortPointer = removeRecursiveReferences(pointer, schemaRecursiveRefMap);
            if (shortPointer !== pointer) {
                usedPointers = __spread$7(usedPointers, [shortPointer]);
            }
            newSchema = JsonPointer.getFirstCopy([
                [schemaRefLibrary, [shortPointer]],
                [schema, pointer],
                [schema, shortPointer]
            ]);
        }
        return JsonPointer.forEachDeepCopy(newSchema, function (subSchema, subPointer) {
            if (isObject(subSchema)) {
                if (isString(subSchema.$ref)) {
                    var refPointer_1 = JsonPointer.compile(subSchema.$ref);
                    if (refPointer_1.length && usedPointers.every(function (ptr) {
                        return !JsonPointer.isSubPointer(refPointer_1, ptr, true);
                    })) {
                        var refSchema = getSubSchema(schema, refPointer_1, schemaRefLibrary, schemaRecursiveRefMap, usedPointers);
                        if (Object.keys(subSchema).length === 1) {
                            return refSchema;
                        }
                        else {
                            var extraKeys = __assign$6({}, subSchema);
                            delete extraKeys.$ref;
                            return mergeSchemas(refSchema, extraKeys);
                        }
                    }
                }
                if (isArray(subSchema.allOf)) {
                    return combineAllOf(subSchema);
                }
                if (subSchema.type === 'array' && isArray(subSchema.required)) {
                    return fixRequiredArrayProperties(subSchema);
                }
            }
            return subSchema;
        }, true, pointer);
    }

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

    var __assign$7 = (this && this.__assign) || function () {
        __assign$7 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$7.apply(this, arguments);
    };
    var __read$9 = (this && this.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
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
        JsonPointer.forEachDeep(schema, function (subSchema, subSchemaPointer) {
            if (hasOwn(subSchema, '$ref') && isString(subSchema.$ref)) {
                var refPointer = JsonPointer.compile(subSchema.$ref);
                refLinks.add(refPointer);
                refMapSet.add(subSchemaPointer + '~~' + refPointer);
                refMap.set(subSchemaPointer, refPointer);
            }
        });
        refLinks.forEach(function (ref) { return refLibrary[ref] = getSubSchema(schema, ref); });
        var checkRefLinks = true;
        while (checkRefLinks) {
            checkRefLinks = false;
            Array.from(refMap).forEach(function (_a) {
                var _b = __read$9(_a, 2), fromRef1 = _b[0], toRef1 = _b[1];
                return Array.from(refMap)
                    .filter(function (_a) {
                    var _b = __read$9(_a, 2), fromRef2 = _b[0], toRef2 = _b[1];
                    return JsonPointer.isSubPointer(toRef1, fromRef2, true) &&
                        !JsonPointer.isSubPointer(toRef2, toRef1, true) &&
                        !refMapSet.has(fromRef1 + fromRef2.slice(toRef1.length) + '~~' + toRef2);
                })
                    .forEach(function (_a) {
                    var _b = __read$9(_a, 2), fromRef2 = _b[0], toRef2 = _b[1];
                    refMapSet.add(fromRef1 + fromRef2.slice(toRef1.length) + '~~' + toRef2);
                    checkRefLinks = true;
                });
            });
        }
        Array.from(refMapSet)
            .map(function (refLink) { return refLink.split('~~'); })
            .filter(function (_a) {
            var _b = __read$9(_a, 2), fromRef = _b[0], toRef = _b[1];
            return JsonPointer.isSubPointer(toRef, fromRef);
        })
            .forEach(function (_a) {
            var _b = __read$9(_a, 2), fromRef = _b[0], toRef = _b[1];
            return recursiveRefMap.set(fromRef, toRef);
        });
        Array.from(refMap)
            .filter(function (_a) {
            var _b = __read$9(_a, 2), fromRef1 = _b[0], toRef1 = _b[1];
            return Array.from(recursiveRefMap.keys())
                .every(function (fromRef2) { return !JsonPointer.isSubPointer(fromRef1, fromRef2, true); });
        })
            .forEach(function (_a) {
            var _b = __read$9(_a, 2), fromRef1 = _b[0], toRef1 = _b[1];
            return Array.from(recursiveRefMap)
                .filter(function (_a) {
                var _b = __read$9(_a, 2), fromRef2 = _b[0], toRef2 = _b[1];
                return !recursiveRefMap.has(fromRef1 + fromRef2.slice(toRef1.length)) &&
                    JsonPointer.isSubPointer(toRef1, fromRef2, true) &&
                    !JsonPointer.isSubPointer(toRef1, fromRef1, true);
            })
                .forEach(function (_a) {
                var _b = __read$9(_a, 2), fromRef2 = _b[0], toRef2 = _b[1];
                return recursiveRefMap.set(fromRef1 + fromRef2.slice(toRef1.length), fromRef1 + toRef2.slice(toRef1.length));
            });
        });
        var compiledSchema = __assign$7({}, schema);
        delete compiledSchema.definitions;
        compiledSchema =
            getSubSchema(compiledSchema, '', refLibrary, recursiveRefMap);
        JsonPointer.forEachDeep(compiledSchema, function (subSchema, subSchemaPointer) {
            if (isString(subSchema.$ref)) {
                var refPointer = JsonPointer.compile(subSchema.$ref);
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

    var __read$a = (this && this.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    function updateInputOptions(layoutNode, schema, jsf) {
        if (!isObject(layoutNode) || !isObject(layoutNode.options)) {
            return;
        }
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
            var _b = __read$a(_a, 2), object = _b[0], excludeKeys = _b[1];
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
        if (schema.type === 'integer' && !hasValue(newOptions.multipleOf)) {
            newOptions.multipleOf = 1;
        }
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

    var __assign$8 = (this && this.__assign) || function () {
        __assign$8 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$8.apply(this, arguments);
    };
    var __read$b = (this && this.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread$8 = (this && this.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$b(arguments[i]));
        return ar;
    };
    var __values$a = (this && this.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    function convertSchemaToDraft6(schema, options) {
        var e_1, _a;
        if (options === void 0) { options = {}; }
        var draft = options.draft || null;
        var changed = options.changed || false;
        if (typeof schema !== 'object') {
            return schema;
        }
        if (typeof schema.map === 'function') {
            return __spread$8(schema.map(function (subSchema) { return convertSchemaToDraft6(subSchema, { changed: changed, draft: draft }); }));
        }
        var newSchema = __assign$8({}, schema);
        var simpleTypes = ['array', 'boolean', 'integer', 'null', 'number', 'object', 'string'];
        if (typeof newSchema.$schema === 'string' &&
            /http\:\/\/json\-schema\.org\/draft\-0\d\/schema\#/.test(newSchema.$schema)) {
            draft = newSchema.$schema[30];
        }
        if (newSchema.contentEncoding) {
            newSchema.media = { binaryEncoding: newSchema.contentEncoding };
            delete newSchema.contentEncoding;
            changed = true;
        }
        if (typeof newSchema.extends === 'object') {
            newSchema.allOf = typeof newSchema.extends.map === 'function' ?
                newSchema.extends.map(function (subSchema) { return convertSchemaToDraft6(subSchema, { changed: changed, draft: draft }); }) :
                [convertSchemaToDraft6(newSchema.extends, { changed: changed, draft: draft })];
            delete newSchema.extends;
            changed = true;
        }
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
        if (typeof newSchema.dependencies === 'object' &&
            Object.keys(newSchema.dependencies)
                .some(function (key) { return typeof newSchema.dependencies[key] === 'string'; })) {
            newSchema.dependencies = __assign$8({}, newSchema.dependencies);
            Object.keys(newSchema.dependencies)
                .filter(function (key) { return typeof newSchema.dependencies[key] === 'string'; })
                .forEach(function (key) { return newSchema.dependencies[key] = [newSchema.dependencies[key]]; });
            changed = true;
        }
        if (typeof newSchema.maxDecimal === 'number') {
            newSchema.multipleOf = 1 / Math.pow(10, newSchema.maxDecimal);
            delete newSchema.divisibleBy;
            changed = true;
            if (!draft || draft === 2) {
                draft = 1;
            }
        }
        if (typeof newSchema.divisibleBy === 'number') {
            newSchema.multipleOf = newSchema.divisibleBy;
            delete newSchema.divisibleBy;
            changed = true;
        }
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
        if (typeof newSchema.minimum === 'number' && newSchema.exclusiveMinimum === true) {
            newSchema.exclusiveMinimum = newSchema.minimum;
            delete newSchema.minimum;
            changed = true;
        }
        else if (typeof newSchema.exclusiveMinimum === 'boolean') {
            delete newSchema.exclusiveMinimum;
            changed = true;
        }
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
        if (typeof newSchema.maximum === 'number' && newSchema.exclusiveMaximum === true) {
            newSchema.exclusiveMaximum = newSchema.maximum;
            delete newSchema.maximum;
            changed = true;
        }
        else if (typeof newSchema.exclusiveMaximum === 'boolean') {
            delete newSchema.exclusiveMaximum;
            changed = true;
        }
        if (typeof newSchema.properties === 'object') {
            var properties_1 = __assign$8({}, newSchema.properties);
            var requiredKeys_1 = Array.isArray(newSchema.required) ?
                new Set(newSchema.required) : new Set();
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
            if (Object.keys(properties_1).some(function (key) { return properties_1[key].required === true; })) {
                Object.keys(properties_1)
                    .filter(function (key) { return properties_1[key].required === true; })
                    .forEach(function (key) { return requiredKeys_1.add(key); });
                changed = true;
            }
            if (requiredKeys_1.size) {
                newSchema.required = Array.from(requiredKeys_1);
            }
            if (Object.keys(properties_1).some(function (key) { return properties_1[key].requires; })) {
                var dependencies_1 = typeof newSchema.dependencies === 'object' ? __assign$8({}, newSchema.dependencies) : {};
                Object.keys(properties_1)
                    .filter(function (key) { return properties_1[key].requires; })
                    .forEach(function (key) { return dependencies_1[key] =
                    typeof properties_1[key].requires === 'string' ?
                        [properties_1[key].requires] : properties_1[key].requires; });
                newSchema.dependencies = dependencies_1;
                changed = true;
                if (!draft) {
                    draft = 2;
                }
            }
            newSchema.properties = properties_1;
        }
        if (typeof newSchema.optional === 'boolean') {
            delete newSchema.optional;
            changed = true;
            if (!draft) {
                draft = 2;
            }
        }
        if (newSchema.requires) {
            delete newSchema.requires;
        }
        if (typeof newSchema.required === 'boolean') {
            delete newSchema.required;
        }
        if (typeof newSchema.id === 'string' && !newSchema.$id) {
            if (newSchema.id.slice(-1) === '#') {
                newSchema.id = newSchema.id.slice(0, -1);
            }
            newSchema.$id = newSchema.id + '-CONVERTED-TO-DRAFT-06#';
            delete newSchema.id;
            changed = true;
        }
        if (newSchema.type && (typeof newSchema.type.every === 'function' ?
            !newSchema.type.every(function (type) { return simpleTypes.includes(type); }) :
            !simpleTypes.includes(newSchema.type))) {
            changed = true;
        }
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
        if (newSchema.type && (typeof newSchema.type.every === 'function' ?
            !newSchema.type.every(function (type) { return simpleTypes.includes(type); }) :
            !simpleTypes.includes(newSchema.type))) {
            if (newSchema.type.length === 1) {
                newSchema.type = newSchema.type[0];
            }
            if (typeof newSchema.type === 'string') {
                if (newSchema.type === 'any') {
                    newSchema.type = simpleTypes;
                }
                else {
                    delete newSchema.type;
                }
            }
            else if (typeof newSchema.type === 'object') {
                if (typeof newSchema.type.every === 'function') {
                    if (newSchema.type.every(function (type) { return typeof type === 'string'; })) {
                        newSchema.type = newSchema.type.some(function (type) { return type === 'any'; }) ?
                            newSchema.type = simpleTypes :
                            newSchema.type.filter(function (type) { return simpleTypes.includes(type); });
                    }
                    else if (newSchema.type.length > 1) {
                        var arrayKeys = ['additionalItems', 'items', 'maxItems', 'minItems', 'uniqueItems', 'contains'];
                        var numberKeys = ['multipleOf', 'maximum', 'exclusiveMaximum', 'minimum', 'exclusiveMinimum'];
                        var objectKeys = ['maxProperties', 'minProperties', 'required', 'additionalProperties',
                            'properties', 'patternProperties', 'dependencies', 'propertyNames'];
                        var stringKeys = ['maxLength', 'minLength', 'pattern', 'format'];
                        var filterKeys_1 = {
                            array: __spread$8(numberKeys, objectKeys, stringKeys),
                            integer: __spread$8(arrayKeys, objectKeys, stringKeys),
                            number: __spread$8(arrayKeys, objectKeys, stringKeys),
                            object: __spread$8(arrayKeys, numberKeys, stringKeys),
                            string: __spread$8(arrayKeys, numberKeys, objectKeys),
                            all: __spread$8(arrayKeys, numberKeys, objectKeys, stringKeys),
                        };
                        var anyOf = [];
                        var _loop_1 = function (type) {
                            var newType = typeof type === 'string' ? { type: type } : __assign$8({}, type);
                            Object.keys(newSchema)
                                .filter(function (key) { return !newType.hasOwnProperty(key) &&
                                !__spread$8((filterKeys_1[newType.type] || filterKeys_1.all), ['type', 'default']).includes(key); })
                                .forEach(function (key) { return newType[key] = newSchema[key]; });
                            anyOf.push(newType);
                        };
                        try {
                            for (var _b = __values$a(newSchema.type), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var type = _c.value;
                                _loop_1(type);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        newSchema = newSchema.hasOwnProperty('default') ?
                            { anyOf: anyOf, default: newSchema.default } : { anyOf: anyOf };
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
        Object.keys(newSchema)
            .filter(function (key) { return typeof newSchema[key] === 'object'; })
            .forEach(function (key) {
            if (['definitions', 'dependencies', 'properties', 'patternProperties']
                .includes(key) && typeof newSchema[key].map !== 'function') {
                var newKey_1 = {};
                Object.keys(newSchema[key]).forEach(function (subKey) { return newKey_1[subKey] =
                    convertSchemaToDraft6(newSchema[key][subKey], { changed: changed, draft: draft }); });
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
    }

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

    function setRequiredFields(schema, formControlTemplate) {
        var fieldsRequired = false;
        if (hasOwn(schema, 'required') && !isEmpty(schema.required)) {
            fieldsRequired = true;
            var requiredArray = isArray(schema.required) ? schema.required : [schema.required];
            requiredArray = forEach(requiredArray, function (key) { return JsonPointer.set(formControlTemplate, '/' + key + '/validators/required', []); });
        }
        return fieldsRequired;
    }

    var __read$c = (this && this.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread$9 = (this && this.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$c(arguments[i]));
        return ar;
    };
    function buildFormGroupTemplate(jsf, nodeValue, setValues, schemaPointer, dataPointer, templatePointer) {
        if (nodeValue === void 0) { nodeValue = null; }
        if (setValues === void 0) { setValues = true; }
        if (schemaPointer === void 0) { schemaPointer = ''; }
        if (dataPointer === void 0) { dataPointer = ''; }
        if (templatePointer === void 0) { templatePointer = ''; }
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
                                propertyKeys_1.splice.apply(propertyKeys_1, __spread$9([i, 1], unnamedKeys));
                            }
                        }
                    }
                    propertyKeys_1
                        .filter(function (key) { return hasOwn(schema.properties, key) ||
                        hasOwn(schema, 'additionalProperties'); })
                        .forEach(function (key) { return controls[key] = buildFormGroupTemplate(jsf, JsonPointer.get(nodeValue, [key]), setValues, schemaPointer + (hasOwn(schema.properties, key) ?
                        '/properties/' + key : '/additionalProperties'), dataPointer + '/' + key, templatePointer + '/controls/' + key); });
                    jsf.formOptions.fieldsRequired = setRequiredFields(schema, controls);
                }
                return { controlType: controlType, controls: controls, validators: validators };
            case 'FormArray':
                controls = [];
                var minItems = Math.max(schema.minItems || 0, nodeOptions.get('minItems') || 0);
                var maxItems = Math.min(schema.maxItems || 1000, nodeOptions.get('maxItems') || 1000);
                var additionalItemsPointer = null;
                if (isArray(schema.items)) {
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
                    if (schema.items.length < maxItems && isObject(schema.additionalItems)) {
                        additionalItemsPointer = schemaPointer + '/additionalItems';
                    }
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

    function formatFormData(formData, dataMap, recursiveRefMap, arrayMap, returnEmptyFields, fixErrors) {
        if (returnEmptyFields === void 0) { returnEmptyFields = false; }
        if (fixErrors === void 0) { fixErrors = false; }
        if (formData === null || typeof formData !== 'object') {
            return formData;
        }
        var formattedData = isArray(formData) ? [] : {};
        JsonPointer.forEachDeep(formData, function (value, dataPointer) {
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
                    if (dataMap.get(genericPointer_1).get('schemaFormat') === 'date-time') {
                        if (/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s][0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?$/i.test(value)) {
                            JsonPointer.set(formattedData, dataPointer, value + "Z");
                        }
                        else if (/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s][0-2]\d:[0-5]\d$/i.test(value)) {
                            JsonPointer.set(formattedData, dataPointer, value + ":00Z");
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

    var __values$b = (this && this.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    function getControl(formGroup, dataPointer, returnGroup) {
        var e_1, _a;
        if (returnGroup === void 0) { returnGroup = false; }
        if (!isObject(formGroup) || !JsonPointer.isJsonPointer(dataPointer)) {
            if (!JsonPointer.isJsonPointer(dataPointer)) {
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
        if (typeof formGroup.get === 'function' &&
            dataPointerArray.every(function (key) { return key.indexOf('.') === -1; })) {
            var formControl = formGroup.get(dataPointerArray.join('.'));
            if (formControl) {
                return formControl;
            }
        }
        var subGroup = formGroup;
        try {
            for (var dataPointerArray_1 = __values$b(dataPointerArray), dataPointerArray_1_1 = dataPointerArray_1.next(); !dataPointerArray_1_1.done; dataPointerArray_1_1 = dataPointerArray_1.next()) {
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
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (dataPointerArray_1_1 && !dataPointerArray_1_1.done && (_a = dataPointerArray_1.return)) _a.call(dataPointerArray_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return subGroup;
    }

    var __assign$9 = (this && this.__assign) || function () {
        __assign$9 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$9.apply(this, arguments);
    };
    var __values$c = (this && this.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var __read$d = (this && this.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread$a = (this && this.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$d(arguments[i]));
        return ar;
    };
    function mergeValues() {
        var e_1, _a, e_2, _b, e_3, _c;
        var valuesToMerge = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            valuesToMerge[_i] = arguments[_i];
        }
        var mergedValues = null;
        try {
            for (var valuesToMerge_1 = __values$c(valuesToMerge), valuesToMerge_1_1 = valuesToMerge_1.next(); !valuesToMerge_1_1.done; valuesToMerge_1_1 = valuesToMerge_1.next()) {
                var currentValue = valuesToMerge_1_1.value;
                if (!isEmpty(currentValue)) {
                    if (typeof currentValue === 'object' &&
                        (isEmpty(mergedValues) || typeof mergedValues !== 'object')) {
                        if (isArray(currentValue)) {
                            mergedValues = __spread$a(currentValue);
                        }
                        else if (isObject(currentValue)) {
                            mergedValues = __assign$9({}, currentValue);
                        }
                    }
                    else if (typeof currentValue !== 'object') {
                        mergedValues = currentValue;
                    }
                    else if (isObject(mergedValues) && isObject(currentValue)) {
                        Object.assign(mergedValues, currentValue);
                    }
                    else if (isObject(mergedValues) && isArray(currentValue)) {
                        var newValues = [];
                        try {
                            for (var currentValue_1 = (e_2 = void 0, __values$c(currentValue)), currentValue_1_1 = currentValue_1.next(); !currentValue_1_1.done; currentValue_1_1 = currentValue_1.next()) {
                                var value = currentValue_1_1.value;
                                newValues.push(mergeValues(mergedValues, value));
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (currentValue_1_1 && !currentValue_1_1.done && (_b = currentValue_1.return)) _b.call(currentValue_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        mergedValues = newValues;
                    }
                    else if (isArray(mergedValues) && isObject(currentValue)) {
                        var newValues = [];
                        try {
                            for (var mergedValues_1 = (e_3 = void 0, __values$c(mergedValues)), mergedValues_1_1 = mergedValues_1.next(); !mergedValues_1_1.done; mergedValues_1_1 = mergedValues_1.next()) {
                                var value = mergedValues_1_1.value;
                                newValues.push(mergeValues(value, currentValue));
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (mergedValues_1_1 && !mergedValues_1_1.done && (_c = mergedValues_1.return)) _c.call(mergedValues_1);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        mergedValues = newValues;
                    }
                    else if (isArray(mergedValues) && isArray(currentValue)) {
                        var newValues = [];
                        for (var i = 0; i < Math.max(mergedValues.length, currentValue.length); i++) {
                            if (i < mergedValues.length && i < currentValue.length) {
                                newValues.push(mergeValues(mergedValues[i], currentValue[i]));
                            }
                            else if (i < mergedValues.length) {
                                newValues.push(mergedValues[i]);
                            }
                            else if (i < currentValue.length) {
                                newValues.push(currentValue[i]);
                            }
                        }
                        mergedValues = newValues;
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (valuesToMerge_1_1 && !valuesToMerge_1_1.done && (_a = valuesToMerge_1.return)) _a.call(valuesToMerge_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return mergedValues;
    }

    var __read$e = (this && this.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread$b = (this && this.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$e(arguments[i]));
        return ar;
    };
    function getLayoutNode(refNode, jsf, widgetLibrary, nodeValue) {
        if (widgetLibrary === void 0) { widgetLibrary = null; }
        if (nodeValue === void 0) { nodeValue = null; }
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
        }
        else {
            var newLayoutNode = jsf.layoutRefLibrary[refNode.$ref];
            if (isDefined(nodeValue)) {
                newLayoutNode = buildLayoutFromSchema(jsf, widgetLibrary, nodeValue, JsonPointer.toSchemaPointer(refNode.$ref, jsf.schema), refNode.$ref, newLayoutNode.arrayItem, newLayoutNode.arrayItemType, newLayoutNode.options.removable, false);
            }
            else {
                newLayoutNode = lodash.cloneDeep(newLayoutNode);
                JsonPointer.forEachDeep(newLayoutNode, function (subNode, pointer) {
                    if (hasOwn(subNode, '_id')) {
                        subNode._id = lodash.uniqueId();
                    }
                    if (refNode.recursiveReference && hasOwn(subNode, 'dataPointer')) {
                        subNode.dataPointer = refNode.dataPointer + subNode.dataPointer;
                    }
                });
            }
            return newLayoutNode;
        }
    }
    function buildLayoutFromSchema(jsf, widgetLibrary, nodeValue, schemaPointer, dataPointer, arrayItem, arrayItemType, removable, forRefLibrary, dataPointerPrefix) {
        if (nodeValue === void 0) { nodeValue = null; }
        if (schemaPointer === void 0) { schemaPointer = ''; }
        if (dataPointer === void 0) { dataPointer = ''; }
        if (arrayItem === void 0) { arrayItem = false; }
        if (arrayItemType === void 0) { arrayItemType = null; }
        if (removable === void 0) { removable = null; }
        if (forRefLibrary === void 0) { forRefLibrary = false; }
        if (dataPointerPrefix === void 0) { dataPointerPrefix = ''; }
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
                            propertyKeys_1.splice.apply(propertyKeys_1, __spread$b([i, 1], unnamedKeys));
                        }
                    }
                }
                propertyKeys_1
                    .filter(function (key) { return hasOwn(schema.properties, key) ||
                    hasOwn(schema, 'additionalProperties'); })
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
        }
        else if (newNode.dataType === 'array') {
            newNode.items = [];
            var templateArray = [];
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
            if (isArray(schema.items)) {
                newNode.items = [];
                for (var i = 0; i < newNode.options.tupleItems; i++) {
                    var newItem = void 0;
                    var itemRefPointer = removeRecursiveReferences(shortDataPointer + '/' + i, jsf.dataRecursiveRefMap, jsf.arrayMap);
                    var itemRecursive = !itemRefPointer.length ||
                        itemRefPointer !== shortDataPointer + '/' + i;
                    if (removable && i >= newNode.options.minItems) {
                        if (!hasOwn(jsf.layoutRefLibrary, itemRefPointer)) {
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
                if (isObject(schema.additionalItems)) {
                    additionalItemsSchemaPointer = schemaPointer + '/additionalItems';
                }
            }
            else if (isObject(schema.items)) {
                additionalItemsSchemaPointer = schemaPointer + '/items';
            }
            if (additionalItemsSchemaPointer) {
                var itemRefPointer = removeRecursiveReferences(shortDataPointer + '/-', jsf.dataRecursiveRefMap, jsf.arrayMap);
                var itemRecursive = !itemRefPointer.length ||
                    itemRefPointer !== shortDataPointer + '/-';
                var itemSchemaPointer = removeRecursiveReferences(additionalItemsSchemaPointer, jsf.schemaRecursiveRefMap, jsf.arrayMap);
                if (itemRefPointer.length && !hasOwn(jsf.layoutRefLibrary, itemRefPointer)) {
                    jsf.layoutRefLibrary[itemRefPointer] = null;
                    jsf.layoutRefLibrary[itemRefPointer] = buildLayoutFromSchema(jsf, widgetLibrary, null, itemSchemaPointer, itemRecursive ? '' : dataPointer + '/-', true, 'list', removable, true, itemRecursive ? dataPointer + '/-' : '');
                    if (itemRecursive) {
                        jsf.layoutRefLibrary[itemRefPointer].recursiveReference = true;
                    }
                }
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
            if (newNode.options.add) {
                buttonText = newNode.options.add;
            }
            else if (newNode.name && !/^\d+$/.test(newNode.name)) {
                buttonText =
                    (/^add\b/i.test(newNode.name) ? '' : 'Add ') + fixTitle(newNode.name);
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
            if (dataRef.length) {
                if (!hasOwn(jsf.layoutRefLibrary, dataRef)) {
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

    function mapLayout(layout, fn, layoutPointer, rootLayout) {
        if (layoutPointer === void 0) { layoutPointer = ''; }
        if (rootLayout === void 0) { rootLayout = layout; }
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

    var __values$d = (this && this.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    function buildLayout(jsf, widgetLibrary) {
        var hasSubmitButton = !JsonPointer.get(jsf, '/formOptions/addSubmit');
        var formLayout = mapLayout(jsf.layout, function (layoutItem, index, layoutPointer) {
            var currentIndex = index;
            var newNode = {
                _id: lodash.uniqueId(),
                options: {},
            };
            if (isObject(layoutItem)) {
                Object.assign(newNode, layoutItem);
                Object.keys(newNode)
                    .filter(function (option) { return !inArray(option, [
                    '_id', '$ref', 'arrayItem', 'arrayItemType', 'dataPointer', 'dataType',
                    'items', 'key', 'name', 'options', 'recursiveReference', 'type', 'widget'
                ]); })
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
            if (!hasOwn(newNode, 'dataPointer')) {
                if (hasOwn(newNode, 'key')) {
                    newNode.dataPointer = newNode.key === '*' ? newNode.key :
                        JsonPointer.compile(JsonPointer.parseObjectPath(newNode.key), '-');
                    delete newNode.key;
                }
                else if (hasOwn(newNode, 'type') && newNode.type.slice(-5) === 'array') {
                    var findDataPointer_1 = function (items) {
                        var e_1, _a;
                        if (items === null || typeof items !== 'object') {
                            return;
                        }
                        if (hasOwn(items, 'dataPointer')) {
                            return items.dataPointer;
                        }
                        if (isArray(items.items)) {
                            try {
                                for (var _b = __values$d(items.items), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    var item = _c.value;
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
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                        }
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
                        newNode.options.copyValueTo = newNode.options.copyValueTo.map(function (item) {
                            return JsonPointer.compile(JsonPointer.parseObjectPath(item), '-');
                        });
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
                    if (newNode.items.length > 1) {
                        var arrayItemGroup = [];
                        var arrayItemGroupTemplate = [];
                        var newIndex = 0;
                        for (var i = newNode.items.length - 1; i >= 0; i--) {
                            var subItem = newNode.items[i];
                            if (hasOwn(subItem, 'dataPointer') &&
                                subItem.dataPointer.slice(0, itemRefPointer_1.length) === itemRefPointer_1) {
                                var arrayItem = newNode.items.splice(i, 1)[0];
                                arrayItem.dataPointer = newNode.dataPointer + '/-' +
                                    arrayItem.dataPointer.slice(itemRefPointer_1.length);
                                arrayItemGroup.unshift(arrayItem);
                                newIndex++;
                            }
                            else {
                                subItem.arrayItem = true;
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

    function ordinal(value) {
        if (typeof value === 'number') {
            value = value + '';
        }
        var last = value.slice(-1);
        var nextToLast = value.slice(-2, 1);
        return (nextToLast !== '1' && { 1: 'st', 2: 'nd', 3: 'rd' }[last]) || 'th';
    }

    function findDate(text) {
        if (!text) {
            return null;
        }
        var foundDate;
        foundDate = text.match(/(?:19|20)\d\d[-_\\\/\. ](?:0?\d|1[012])[-_\\\/\. ](?:[012]?\d|3[01])(?!\d)/);
        if (foundDate) {
            return foundDate[0];
        }
        foundDate = text.match(/(?:[012]?\d|3[01])[-_\\\/\. ](?:0?\d|1[012])[-_\\\/\. ](?:19|20)\d\d(?!\d)/);
        if (foundDate) {
            return foundDate[0];
        }
        foundDate = text.match(/^(?:[012]?\d|3[01])[-_\\\/\. ](?:0?\d|1[012])[-_\\\/\. ]\d\d(?!\d)/);
        if (foundDate) {
            return foundDate[0];
        }
        foundDate = text.match(/^\d\d[-_\\\/\. ](?:[012]?\d|3[01])[-_\\\/\. ](?:0?\d|1[012])(?!\d)/);
        if (foundDate) {
            return foundDate[0];
        }
        foundDate = text.match(/^(?:19|20)\d\d(?:0\d|1[012])(?:[012]\d|3[01])/);
        if (foundDate) {
            return foundDate[0];
        }
    }

    function stringToDate(dateString) {
        var getDate = findDate(dateString);
        if (!getDate) {
            return null;
        }
        var dateParts = [];
        if (/^\d+[^\d]\d+[^\d]\d+$/.test(getDate)) {
            dateParts = getDate.split(/[^\d]/).map(function (part) { return +part; });
        }
        else if (/^\d{8}$/.test(getDate)) {
            dateParts = [+getDate.slice(0, 4), +getDate.slice(4, 6), +getDate.slice(6)];
        }
        var thisYear = +(new Date().getFullYear() + '').slice(-2);
        if (dateParts[0] > 1000 && dateParts[0] < 2100 && dateParts[1] <= 12 && dateParts[2] <= 31) {
            return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        }
        else if (dateParts[0] <= 12 && dateParts[1] <= 31 && dateParts[2] > 1000 && dateParts[2] < 2100) {
            return new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);
        }
        else if (dateParts[0] <= 12 && dateParts[1] <= 31 && dateParts[2] < 100) {
            var year = (dateParts[2] <= thisYear ? 2000 : 1900) + dateParts[2];
            return new Date(year, dateParts[0] - 1, dateParts[1]);
        }
        else if (dateParts[0] < 100 && dateParts[1] <= 12 && dateParts[2] <= 31) {
            var year = (dateParts[0] <= thisYear ? 2000 : 1900) + dateParts[0];
            return new Date(year, dateParts[1] - 1, dateParts[2]);
        }
        return null;
    }

    function dateToString(date, options) {
        if (options === void 0) { options = {}; }
        var dateFormat = options.dateFormat || 'YYYY-MM-DD';
        if (typeof date === 'string') {
            date = stringToDate(date);
        }
        if (Object.prototype.toString.call(date) !== '[object Date]') {
            return null;
        }
        var longMonths = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        var shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var longDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return dateFormat
            .replace(/YYYY/ig, date.getFullYear() + '')
            .replace(/YY/ig, (date.getFullYear() + '').slice(-2))
            .replace(/MMMM/ig, longMonths[date.getMonth()])
            .replace(/MMM/ig, shortMonths[date.getMonth()])
            .replace(/MM/ig, ('0' + (date.getMonth() + 1)).slice(-2))
            .replace(/M/ig, (date.getMonth() + 1) + '')
            .replace(/DDDD/ig, longDays[date.getDay()])
            .replace(/DDD/ig, shortDays[date.getDay()])
            .replace(/DD/ig, ('0' + date.getDate()).slice(-2))
            .replace(/D/ig, date.getDate() + '')
            .replace(/S/ig, ordinal(date.getDate()));
    }

    var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var Framework = (function () {
        function Framework() {
            this.widgets = {};
            this.stylesheets = [];
            this.scripts = [];
        }
        Framework = __decorate$1([
            core.Injectable()
        ], Framework);
        return Framework;
    }());

    var enValidationMessages = {
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

    exports.Framework = Framework;
    exports.JsonPointer = JsonPointer;
    exports.JsonValidators = JsonValidators;
    exports.addClasses = addClasses;
    exports.buildFormGroup = buildFormGroup;
    exports.buildFormGroupTemplate = buildFormGroupTemplate;
    exports.buildLayout = buildLayout;
    exports.buildLayoutFromSchema = buildLayoutFromSchema;
    exports.buildSchemaFromData = buildSchemaFromData;
    exports.buildSchemaFromLayout = buildSchemaFromLayout;
    exports.checkInlineType = checkInlineType;
    exports.combineAllOf = combineAllOf;
    exports.commonItems = commonItems;
    exports.convertSchemaToDraft6 = convertSchemaToDraft6;
    exports.copy = copy;
    exports.dateToString = dateToString;
    exports.enValidationMessages = enValidationMessages;
    exports.executeAsyncValidators = executeAsyncValidators;
    exports.executeValidators = executeValidators;
    exports.findDate = findDate;
    exports.fixRequiredArrayProperties = fixRequiredArrayProperties;
    exports.fixTitle = fixTitle;
    exports.forEach = forEach;
    exports.forEachCopy = forEachCopy;
    exports.formatFormData = formatFormData;
    exports.frValidationMessages = frValidationMessages;
    exports.getControl = getControl;
    exports.getControlValidators = getControlValidators;
    exports.getFromSchema = getFromSchema;
    exports.getInputType = getInputType;
    exports.getLayoutNode = getLayoutNode;
    exports.getSubSchema = getSubSchema;
    exports.getTitleMapFromOneOf = getTitleMapFromOneOf;
    exports.getType = getType;
    exports.hasOwn = hasOwn;
    exports.hasValue = hasValue;
    exports.inArray = inArray;
    exports.isArray = isArray;
    exports.isBoolean = isBoolean;
    exports.isDate = isDate;
    exports.isDefined = isDefined;
    exports.isEmpty = isEmpty;
    exports.isFunction = isFunction;
    exports.isInputRequired = isInputRequired;
    exports.isInteger = isInteger;
    exports.isMap = isMap;
    exports.isNumber = isNumber;
    exports.isObject = isObject;
    exports.isObservable = isObservable;
    exports.isPrimitive = isPrimitive;
    exports.isPromise = isPromise;
    exports.isSet = isSet;
    exports.isString = isString;
    exports.isType = isType;
    exports.mapLayout = mapLayout;
    exports.mergeErrors = mergeErrors;
    exports.mergeFilteredObject = mergeFilteredObject;
    exports.mergeObjects = mergeObjects;
    exports.mergeSchemas = mergeSchemas;
    exports.removeRecursiveReferences = removeRecursiveReferences;
    exports.resolveSchemaReferences = resolveSchemaReferences;
    exports.setRequiredFields = setRequiredFields;
    exports.stringToDate = stringToDate;
    exports.toJavaScriptType = toJavaScriptType;
    exports.toObservable = toObservable;
    exports.toPromise = toPromise;
    exports.toSchemaType = toSchemaType;
    exports.toTitleCase = toTitleCase;
    exports.uniqueItems = uniqueItems;
    exports.updateInputOptions = updateInputOptions;
    exports.xor = xor;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngsf-common.umd.js.map
