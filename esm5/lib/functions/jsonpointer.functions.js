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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { Injectable } from '@angular/core';
import { isDefined, isEmpty, isObject, isArray, isMap, isNumber, isString } from './validator';
import { hasOwn, copy } from './utility';
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
                for (var keyArray_1 = __values(keyArray), keyArray_1_1 = keyArray_1.next(); !keyArray_1_1.done; keyArray_1_1 = keyArray_1.next()) {
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
                for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
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
                for (var _c = __values(items), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var _e = __read(_d.value, 2), object = _e[0], pointer = _e[1];
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
                for (var _b = __values(Object.keys(object)), _c = _b.next(); !_c.done; _c = _b.next()) {
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
            var newObject = Array.isArray(object) ? __spread(object) : __assign({}, object);
            if (!bottomUp) {
                newObject = fn(newObject, pointer, rootObject);
            }
            try {
                for (var _b = __values(Object.keys(newObject)), _c = _b.next(); !_c.done; _c = _b.next()) {
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
                    for (var indexArray_1 = __values(indexArray), indexArray_1_1 = indexArray_1.next(); !indexArray_1_1.done; indexArray_1_1 = indexArray_1.next()) {
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
                for (var dataPointerArray_1 = __values(dataPointerArray), dataPointerArray_1_1 = dataPointerArray_1.next(); !dataPointerArray_1_1.done; dataPointerArray_1_1 = dataPointerArray_1.next()) {
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
        Injectable()
    ], JsonPointer);
    return JsonPointer;
}());
export { JsonPointer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbnBvaW50ZXIuZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nc2YvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2Z1bmN0aW9ucy9qc29ucG9pbnRlci5mdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUV4QyxPQUFPLEVBQ0wsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUNqRSxNQUFNLGFBQWEsQ0FBQTtBQUNwQixPQUFPLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxNQUFNLFdBQVcsQ0FBQTtBQXFCdEM7SUFBQTtJQTArQkEsQ0FBQztJQTM5QlEsZUFBRyxHQUFWLFVBQ0UsTUFBTSxFQUNOLE9BQWdCLEVBQ2hCLFVBQXNCLEVBQ3RCLFFBQXVCLEVBQ3ZCLFVBQTJCLEVBQzNCLE1BQXVCOztRQUh2QiwyQkFBQSxFQUFBLGNBQXNCO1FBQ3RCLHlCQUFBLEVBQUEsZUFBdUI7UUFDdkIsMkJBQUEsRUFBQSxrQkFBMkI7UUFDM0IsdUJBQUEsRUFBQSxjQUF1QjtRQUV2QixJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDbkIsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFBO1NBQ3RDO1FBQ0QsSUFBSSxRQUFRLEdBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDakQsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtZQUNuRCxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUE7WUFDdEIsSUFBSSxVQUFVLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxRQUFRLElB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cUJBQ1I7aUJBQ0Y7YUFDRjtZQUNELE9BQU8sS0FBSyxDQUFBO1NBQ2I7UUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLDREQUE0RCxDQUFDLENBQUE7SUFDN0UsQ0FBQztJQXorQlUsV0FBVztRQUR2QixVQUFVLEVBQUU7T0FDQSxXQUFXLENBMCtCdkI7SUFBRCxrQkFBQztDQUFBLEFBMStCRCxJQTArQkM7U0ExK0JZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5cbmltcG9ydCB7XG4gIGlzRGVmaW5lZCwgaXNFbXB0eSwgaXNPYmplY3QsIGlzQXJyYXksIGlzTWFwLCBpc051bWJlciwgaXNTdHJpbmdcbn0gZnJvbSAnLi92YWxpZGF0b3InXG5pbXBvcnQge2hhc093biwgY29weX0gZnJvbSAnLi91dGlsaXR5J1xuaW1wb3J0IHtGb3JtR3JvdXB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJ1xuXG4vKipcbiAqICdKc29uUG9pbnRlcicgY2xhc3NcbiAqXG4gKiBTb21lIHV0aWxpdGllcyBmb3IgdXNpbmcgSlNPTiBQb2ludGVycyB3aXRoIEpTT04gb2JqZWN0c1xuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY5MDFcbiAqXG4gKiBnZXQsIGdldENvcHksIGdldEZpcnN0LCBzZXQsIHNldENvcHksIGluc2VydCwgaW5zZXJ0Q29weSwgcmVtb3ZlLCBoYXMsIGRpY3QsXG4gKiBmb3JFYWNoRGVlcCwgZm9yRWFjaERlZXBDb3B5LCBlc2NhcGUsIHVuZXNjYXBlLCBwYXJzZSwgY29tcGlsZSwgdG9LZXksXG4gKiBpc0pzb25Qb2ludGVyLCBpc1N1YlBvaW50ZXIsIHRvSW5kZXhlZFBvaW50ZXIsIHRvR2VuZXJpY1BvaW50ZXIsXG4gKiB0b0NvbnRyb2xQb2ludGVyLCB0b1NjaGVtYVBvaW50ZXIsIHRvRGF0YVBvaW50ZXIsIHBhcnNlT2JqZWN0UGF0aFxuICpcbiAqIFNvbWUgZnVuY3Rpb25zIGJhc2VkIG9uIG1hbnVlbHN0b2ZlcidzIGpzb24tcG9pbnRlciB1dGlsaXRpZXNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYW51ZWxzdG9mZXIvanNvbi1wb2ludGVyXG4gKi9cbmV4cG9ydCB0eXBlIFBvaW50ZXIgPSBzdHJpbmcgfCBzdHJpbmdbXVxuXG4vLyBAZHluYW1pY1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEpzb25Qb2ludGVyIHtcblxuICAvKipcbiAgICogJ2dldCcgZnVuY3Rpb25cbiAgICpcbiAgICogVXNlcyBhIEpTT04gUG9pbnRlciB0byByZXRyaWV2ZSBhIHZhbHVlIGZyb20gYW4gb2JqZWN0LlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IC0gT2JqZWN0IHRvIGdldCB2YWx1ZSBmcm9tXG4gICAqIEBwYXJhbSBwb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gICAqIEBwYXJhbSBzdGFydFNsaWNlIC0gWmVyby1iYXNlZCBpbmRleCBvZiBmaXJzdCBQb2ludGVyIGtleSB0byB1c2VcbiAgICogQHBhcmFtIGVuZFNsaWNlIC0gWmVyby1iYXNlZCBpbmRleCBvZiBsYXN0IFBvaW50ZXIga2V5IHRvIHVzZVxuICAgKiBAcGFyYW0gZ2V0Qm9vbGVhbiAtIFJldHVybiBvbmx5IHRydWUgb3IgZmFsc2U/XG4gICAqIEBwYXJhbSBlcnJvcnMgLSBTaG93IGVycm9yIGlmIG5vdCBmb3VuZD9cbiAgICogQHJldHVybiBMb2NhdGVkIHZhbHVlIChvciB0cnVlIG9yIGZhbHNlIGlmIGdldEJvb2xlYW4gPSB0cnVlKVxuICAgKi9cbiAgc3RhdGljIGdldChcbiAgICBvYmplY3QsXG4gICAgcG9pbnRlcjogUG9pbnRlcixcbiAgICBzdGFydFNsaWNlOiBudW1iZXIgPSAwLFxuICAgIGVuZFNsaWNlOiBudW1iZXIgPSBudWxsLFxuICAgIGdldEJvb2xlYW46IGJvb2xlYW4gPSBmYWxzZSxcbiAgICBlcnJvcnM6IGJvb2xlYW4gPSBmYWxzZVxuICApIHtcbiAgICBpZiAob2JqZWN0ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gZ2V0Qm9vbGVhbiA/IGZhbHNlIDogdW5kZWZpbmVkXG4gICAgfVxuICAgIGxldCBrZXlBcnJheTogYW55W10gPSB0aGlzLnBhcnNlKHBvaW50ZXIsIGVycm9ycylcbiAgICBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYga2V5QXJyYXkgIT09IG51bGwpIHtcbiAgICAgIGxldCBzdWJPYmplY3QgPSBvYmplY3RcbiAgICAgIGlmIChzdGFydFNsaWNlID49IGtleUFycmF5Lmxlbmd0aCB8fCBlbmRTbGljZSA8PSAta2V5QXJyYXkubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBvYmplY3RcbiAgICAgIH1cbiAgICAgIGlmIChzdGFydFNsaWNlIDw9IC1rZXlBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgc3RhcnRTbGljZSA9IDBcbiAgICAgIH1cbiAgICAgIGlmICghaXNEZWZpbmVkKGVuZFNsaWNlKSB8fCBlbmRTbGljZSA+PSBrZXlBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgZW5kU2xpY2UgPSBrZXlBcnJheS5sZW5ndGhcbiAgICAgIH1cbiAgICAgIGtleUFycmF5ID0ga2V5QXJyYXkuc2xpY2Uoc3RhcnRTbGljZSwgZW5kU2xpY2UpXG4gICAgICBmb3IgKGxldCBrZXkgb2Yga2V5QXJyYXkpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gJy0nICYmIGlzQXJyYXkoc3ViT2JqZWN0KSAmJiBzdWJPYmplY3QubGVuZ3RoKSB7XG4gICAgICAgICAga2V5ID0gc3ViT2JqZWN0Lmxlbmd0aCAtIDFcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNNYXAoc3ViT2JqZWN0KSAmJiBzdWJPYmplY3QuaGFzKGtleSkpIHtcbiAgICAgICAgICBzdWJPYmplY3QgPSBzdWJPYmplY3QuZ2V0KGtleSlcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc3ViT2JqZWN0ID09PSAnb2JqZWN0JyAmJiBzdWJPYmplY3QgIT09IG51bGwgJiZcbiAgICAgICAgICBoYXNPd24oc3ViT2JqZWN0LCBrZXkpXG4gICAgICAgICkge1xuICAgICAgICAgIHN1Yk9iamVjdCA9IHN1Yk9iamVjdFtrZXldXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgZ2V0IGVycm9yOiBcIiR7a2V5fVwiIGtleSBub3QgZm91bmQgaW4gb2JqZWN0LmApXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKHBvaW50ZXIpXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKG9iamVjdClcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGdldEJvb2xlYW4gPyBmYWxzZSA6IHVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZ2V0Qm9vbGVhbiA/IHRydWUgOiBzdWJPYmplY3RcbiAgICB9XG4gICAgaWYgKGVycm9ycyAmJiBrZXlBcnJheSA9PT0gbnVsbCkge1xuICAgICAgY29uc29sZS5lcnJvcihgZ2V0IGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlcjogJHtwb2ludGVyfWApXG4gICAgfVxuICAgIGlmIChlcnJvcnMgJiYgdHlwZW9mIG9iamVjdCAhPT0gJ29iamVjdCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2dldCBlcnJvcjogSW52YWxpZCBvYmplY3Q6JylcbiAgICAgIGNvbnNvbGUuZXJyb3Iob2JqZWN0KVxuICAgIH1cbiAgICByZXR1cm4gZ2V0Qm9vbGVhbiA/IGZhbHNlIDogdW5kZWZpbmVkXG4gIH1cblxuICAvKipcbiAgICogJ2dldENvcHknIGZ1bmN0aW9uXG4gICAqXG4gICAqIFVzZXMgYSBKU09OIFBvaW50ZXIgdG8gZGVlcGx5IGNsb25lIGEgdmFsdWUgZnJvbSBhbiBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgLSBPYmplY3QgdG8gZ2V0IHZhbHVlIGZyb21cbiAgICogQHBhcmFtIHBvaW50ZXIgLSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSlcbiAgICogQHBhcmFtIHN0YXJ0U2xpY2UgLSBaZXJvLWJhc2VkIGluZGV4IG9mIGZpcnN0IFBvaW50ZXIga2V5IHRvIHVzZVxuICAgKiBAcGFyYW0gZW5kU2xpY2UgLSBaZXJvLWJhc2VkIGluZGV4IG9mIGxhc3QgUG9pbnRlciBrZXkgdG8gdXNlXG4gICAqIEBwYXJhbSBnZXRCb29sZWFuIC0gUmV0dXJuIG9ubHkgdHJ1ZSBvciBmYWxzZT9cbiAgICogQHBhcmFtIGVycm9ycyAtIFNob3cgZXJyb3IgaWYgbm90IGZvdW5kP1xuICAgKiBAcmV0dXJuIExvY2F0ZWQgdmFsdWUgKG9yIHRydWUgb3IgZmFsc2UgaWYgZ2V0Qm9vbGVhbiA9IHRydWUpXG4gICAqL1xuICBzdGF0aWMgZ2V0Q29weShcbiAgICBvYmplY3QsXG4gICAgcG9pbnRlcjogUG9pbnRlcixcbiAgICBzdGFydFNsaWNlOiBudW1iZXIgPSAwLFxuICAgIGVuZFNsaWNlOiBudW1iZXIgPSBudWxsLFxuICAgIGdldEJvb2xlYW46IGJvb2xlYW4gPSBmYWxzZSxcbiAgICBlcnJvcnM6IGJvb2xlYW4gPSBmYWxzZVxuICApIHtcbiAgICBjb25zdCBvYmplY3RUb0NvcHkgPVxuICAgICAgdGhpcy5nZXQob2JqZWN0LCBwb2ludGVyLCBzdGFydFNsaWNlLCBlbmRTbGljZSwgZ2V0Qm9vbGVhbiwgZXJyb3JzKVxuICAgIHJldHVybiB0aGlzLmZvckVhY2hEZWVwQ29weShvYmplY3RUb0NvcHkpXG4gIH1cblxuICAvKipcbiAgICogJ2dldEZpcnN0JyBmdW5jdGlvblxuICAgKlxuICAgKiBUYWtlcyBhbiBhcnJheSBvZiBKU09OIFBvaW50ZXJzIGFuZCBvYmplY3RzLFxuICAgKiBjaGVja3MgZWFjaCBvYmplY3QgZm9yIGEgdmFsdWUgc3BlY2lmaWVkIGJ5IHRoZSBwb2ludGVyLFxuICAgKiBhbmQgcmV0dXJucyB0aGUgZmlyc3QgdmFsdWUgZm91bmQuXG4gICAqXG4gICAqIEBwYXJhbSBpdGVtcyAtIEFycmF5IG9mIG9iamVjdHMgYW5kIHBvaW50ZXJzIHRvIGNoZWNrXG4gICAqIEBwYXJhbSBkZWZhdWx0VmFsdWUgLSBWYWx1ZSB0byByZXR1cm4gaWYgbm90aGluZyBmb3VuZFxuICAgKiBAcGFyYW0gZ2V0Q29weSAtIFJldHVybiBhIGNvcHkgaW5zdGVhZD9cbiAgICogQHJldHVybiBGaXJzdCB2YWx1ZSBmb3VuZFxuICAgKi9cbiAgc3RhdGljIGdldEZpcnN0KFxuICAgIGl0ZW1zOiBBcnJheTxvYmplY3QgfCBQb2ludGVyPixcbiAgICBkZWZhdWx0VmFsdWU6IGFueSA9IG51bGwsXG4gICAgZ2V0Q29weSA9IGZhbHNlXG4gICkge1xuICAgIGlmIChpc0VtcHR5KGl0ZW1zKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmIChpc0FycmF5KGl0ZW1zKSkge1xuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgIGlmIChpc0VtcHR5KGl0ZW0pKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNBcnJheShpdGVtKSAmJiAoaXRlbSBhcyBzdHJpbmdbXSkubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICBpZiAoaXNFbXB0eShpdGVtWzBdKSB8fCBpc0VtcHR5KGl0ZW1bMV0pKSB7XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGdldENvcHkgP1xuICAgICAgICAgICAgdGhpcy5nZXRDb3B5KGl0ZW1bMF0sIGl0ZW1bMV0pIDpcbiAgICAgICAgICAgIHRoaXMuZ2V0KGl0ZW1bMF0sIGl0ZW1bMV0pXG4gICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmVycm9yKCdnZXRGaXJzdCBlcnJvcjogSW5wdXQgbm90IGluIGNvcnJlY3QgZm9ybWF0LlxcbicgK1xuICAgICAgICAgICdTaG91bGQgYmU6IFsgWyBvYmplY3QxLCBwb2ludGVyMSBdLCBbIG9iamVjdCAyLCBwb2ludGVyMiBdLCBldGMuLi4gXScpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZVxuICAgIH1cbiAgICBpZiAoaXNNYXAoaXRlbXMpKSB7XG4gICAgICBmb3IgKGNvbnN0IFtvYmplY3QsIHBvaW50ZXJdIG9mIChpdGVtcyBhcyBhbnkpKSB7XG4gICAgICAgIGlmIChvYmplY3QgPT09IG51bGwgfHwgIXRoaXMuaXNKc29uUG9pbnRlcihwb2ludGVyKSkge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRDb3B5ID9cbiAgICAgICAgICB0aGlzLmdldENvcHkob2JqZWN0LCBwb2ludGVyKSA6XG4gICAgICAgICAgdGhpcy5nZXQob2JqZWN0LCBwb2ludGVyKVxuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZVxuICAgIH1cbiAgICBjb25zb2xlLmVycm9yKCdnZXRGaXJzdCBlcnJvcjogSW5wdXQgbm90IGluIGNvcnJlY3QgZm9ybWF0LlxcbicgK1xuICAgICAgJ1Nob3VsZCBiZTogWyBbIG9iamVjdDEsIHBvaW50ZXIxIF0sIFsgb2JqZWN0IDIsIHBvaW50ZXIyIF0sIGV0Yy4uLiBdJylcbiAgICByZXR1cm4gZGVmYXVsdFZhbHVlXG4gIH1cblxuICAvKipcbiAgICogJ2dldEZpcnN0Q29weScgZnVuY3Rpb25cbiAgICpcbiAgICogU2ltaWxhciB0byBnZXRGaXJzdCwgYnV0IGFsd2F5cyByZXR1cm5zIGEgY29weS5cbiAgICpcbiAgICogQHBhcmFtIGl0ZW1zIC0gQXJyYXkgb2Ygb2JqZWN0cyBhbmQgcG9pbnRlcnMgdG8gY2hlY2tcbiAgICogQHBhcmFtIGRlZmF1bHRWYWx1ZSAtIFZhbHVlIHRvIHJldHVybiBpZiBub3RoaW5nIGZvdW5kXG4gICAqIEByZXR1cm4gQ29weSBvZiBmaXJzdCB2YWx1ZSBmb3VuZFxuICAgKi9cbiAgc3RhdGljIGdldEZpcnN0Q29weShcbiAgICBpdGVtczogQXJyYXk8b2JqZWN0IHwgUG9pbnRlcj4sXG4gICAgZGVmYXVsdFZhbHVlOiBhbnkgPSBudWxsXG4gICkge1xuICAgIHJldHVybiB0aGlzLmdldEZpcnN0KGl0ZW1zLCBkZWZhdWx0VmFsdWUsIHRydWUpXG4gIH1cblxuICAvKipcbiAgICogJ3NldCcgZnVuY3Rpb25cbiAgICpcbiAgICogVXNlcyBhIEpTT04gUG9pbnRlciB0byBzZXQgYSB2YWx1ZSBvbiBhbiBvYmplY3QuXG4gICAqIEFsc28gY3JlYXRlcyBhbnkgbWlzc2luZyBzdWIgb2JqZWN0cyBvciBhcnJheXMgdG8gY29udGFpbiB0aGF0IHZhbHVlLlxuICAgKlxuICAgKiBJZiB0aGUgb3B0aW9uYWwgZm91cnRoIHBhcmFtZXRlciBpcyBUUlVFIGFuZCB0aGUgaW5uZXItbW9zdCBjb250YWluZXJcbiAgICogaXMgYW4gYXJyYXksIHRoZSBmdW5jdGlvbiB3aWxsIGluc2VydCB0aGUgdmFsdWUgYXMgYSBuZXcgaXRlbSBhdCB0aGVcbiAgICogc3BlY2lmaWVkIGxvY2F0aW9uIGluIHRoZSBhcnJheSwgcmF0aGVyIHRoYW4gb3ZlcndyaXRpbmcgdGhlIGV4aXN0aW5nXG4gICAqIHZhbHVlIChpZiBhbnkpIGF0IHRoYXQgbG9jYXRpb24uXG4gICAqXG4gICAqIFNvIHNldChbMSwgMiwgM10sICcvMScsIDQpID0+IFsxLCA0LCAzXVxuICAgKiBhbmRcbiAgICogU28gc2V0KFsxLCAyLCAzXSwgJy8xJywgNCwgdHJ1ZSkgPT4gWzEsIDQsIDIsIDNdXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgLSBUaGUgb2JqZWN0IHRvIHNldCB2YWx1ZSBpblxuICAgKiBAcGFyYW0gcG9pbnRlciAtIFRoZSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSlcbiAgICogQHBhcmFtIHZhbHVlIC0gVGhlIG5ldyB2YWx1ZSB0byBzZXRcbiAgICogQHBhcmFtIGluc2VydCAtIGluc2VydCB2YWx1ZT9cbiAgICogQHJldHVybiBUaGUgb3JpZ2luYWwgb2JqZWN0LCBtb2RpZmllZCB3aXRoIHRoZSBzZXQgdmFsdWVcbiAgICovXG4gIHN0YXRpYyBzZXQoXG4gICAgb2JqZWN0OiBvYmplY3QsXG4gICAgcG9pbnRlcjogUG9pbnRlcixcbiAgICB2YWx1ZTogYW55LFxuICAgIGluc2VydCA9IGZhbHNlXG4gICkge1xuICAgIGNvbnN0IGtleUFycmF5ID0gdGhpcy5wYXJzZShwb2ludGVyKVxuICAgIGlmIChrZXlBcnJheSAhPT0gbnVsbCAmJiBrZXlBcnJheS5sZW5ndGgpIHtcbiAgICAgIGxldCBzdWJPYmplY3Q6IGFueSA9IG9iamVjdFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlBcnJheS5sZW5ndGggLSAxOyArK2kpIHtcbiAgICAgICAgbGV0IGtleSA9IGtleUFycmF5W2ldXG4gICAgICAgIGlmIChrZXkgPT09ICctJyAmJiBpc0FycmF5KHN1Yk9iamVjdCkpIHtcbiAgICAgICAgICBrZXkgPSBzdWJPYmplY3QubGVuZ3RoXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzTWFwKHN1Yk9iamVjdCkgJiYgc3ViT2JqZWN0LmhhcyhrZXkpKSB7XG4gICAgICAgICAgc3ViT2JqZWN0ID0gc3ViT2JqZWN0LmdldChrZXkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCFoYXNPd24oc3ViT2JqZWN0LCBrZXkpKSB7XG4gICAgICAgICAgICBzdWJPYmplY3Rba2V5XSA9IChrZXlBcnJheVtpICsgMV0ubWF0Y2goL14oXFxkK3wtKSQvKSkgPyBbXSA6IHt9XG4gICAgICAgICAgfVxuICAgICAgICAgIHN1Yk9iamVjdCA9IHN1Yk9iamVjdFtrZXldXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IGxhc3RLZXkgPSBrZXlBcnJheVtrZXlBcnJheS5sZW5ndGggLSAxXVxuICAgICAgaWYgKGlzQXJyYXkoc3ViT2JqZWN0KSAmJiBsYXN0S2V5ID09PSAnLScpIHtcbiAgICAgICAgc3ViT2JqZWN0LnB1c2godmFsdWUpXG4gICAgICB9IGVsc2UgaWYgKGluc2VydCAmJiBpc0FycmF5KHN1Yk9iamVjdCkgJiYgIWlzTmFOKCtsYXN0S2V5KSkge1xuICAgICAgICBzdWJPYmplY3Quc3BsaWNlKGxhc3RLZXksIDAsIHZhbHVlKVxuICAgICAgfSBlbHNlIGlmIChpc01hcChzdWJPYmplY3QpKSB7XG4gICAgICAgIHN1Yk9iamVjdC5zZXQobGFzdEtleSwgdmFsdWUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdWJPYmplY3RbbGFzdEtleV0gPSB2YWx1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIG9iamVjdFxuICAgIH1cbiAgICBjb25zb2xlLmVycm9yKGBzZXQgZXJyb3I6IEludmFsaWQgSlNPTiBQb2ludGVyOiAke3BvaW50ZXJ9YClcbiAgICByZXR1cm4gb2JqZWN0XG4gIH1cblxuICAvKipcbiAgICogJ3NldENvcHknIGZ1bmN0aW9uXG4gICAqXG4gICAqIENvcGllcyBhbiBvYmplY3QgYW5kIHVzZXMgYSBKU09OIFBvaW50ZXIgdG8gc2V0IGEgdmFsdWUgb24gdGhlIGNvcHkuXG4gICAqIEFsc28gY3JlYXRlcyBhbnkgbWlzc2luZyBzdWIgb2JqZWN0cyBvciBhcnJheXMgdG8gY29udGFpbiB0aGF0IHZhbHVlLlxuICAgKlxuICAgKiBJZiB0aGUgb3B0aW9uYWwgZm91cnRoIHBhcmFtZXRlciBpcyBUUlVFIGFuZCB0aGUgaW5uZXItbW9zdCBjb250YWluZXJcbiAgICogaXMgYW4gYXJyYXksIHRoZSBmdW5jdGlvbiB3aWxsIGluc2VydCB0aGUgdmFsdWUgYXMgYSBuZXcgaXRlbSBhdCB0aGVcbiAgICogc3BlY2lmaWVkIGxvY2F0aW9uIGluIHRoZSBhcnJheSwgcmF0aGVyIHRoYW4gb3ZlcndyaXRpbmcgdGhlIGV4aXN0aW5nIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IC0gVGhlIG9iamVjdCB0byBjb3B5IGFuZCBzZXQgdmFsdWUgaW5cbiAgICogQHBhcmFtIHBvaW50ZXIgLSBUaGUgSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBzZXRcbiAgICogQHBhcmFtIGluc2VydCAtIGluc2VydCB2YWx1ZT9cbiAgICogQHJldHVybiBUaGUgbmV3IG9iamVjdCB3aXRoIHRoZSBzZXQgdmFsdWVcbiAgICovXG4gIHN0YXRpYyBzZXRDb3B5KFxuICAgIG9iamVjdDogb2JqZWN0LFxuICAgIHBvaW50ZXI6IFBvaW50ZXIsXG4gICAgdmFsdWU6IGFueSxcbiAgICBpbnNlcnQgPSBmYWxzZVxuICApIHtcbiAgICBjb25zdCBrZXlBcnJheSA9IHRoaXMucGFyc2UocG9pbnRlcilcbiAgICBpZiAoa2V5QXJyYXkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG5ld09iamVjdCA9IGNvcHkob2JqZWN0KVxuICAgICAgbGV0IHN1Yk9iamVjdCA9IG5ld09iamVjdFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlBcnJheS5sZW5ndGggLSAxOyArK2kpIHtcbiAgICAgICAgbGV0IGtleSA9IGtleUFycmF5W2ldXG4gICAgICAgIGlmIChrZXkgPT09ICctJyAmJiBpc0FycmF5KHN1Yk9iamVjdCkpIHtcbiAgICAgICAgICBrZXkgPSBzdWJPYmplY3QubGVuZ3RoXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzTWFwKHN1Yk9iamVjdCkgJiYgc3ViT2JqZWN0LmhhcyhrZXkpKSB7XG4gICAgICAgICAgc3ViT2JqZWN0LnNldChrZXksIGNvcHkoc3ViT2JqZWN0LmdldChrZXkpKSlcbiAgICAgICAgICBzdWJPYmplY3QgPSBzdWJPYmplY3QuZ2V0KGtleSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIWhhc093bihzdWJPYmplY3QsIGtleSkpIHtcbiAgICAgICAgICAgIHN1Yk9iamVjdFtrZXldID0gKGtleUFycmF5W2kgKyAxXS5tYXRjaCgvXihcXGQrfC0pJC8pKSA/IFtdIDoge31cbiAgICAgICAgICB9XG4gICAgICAgICAgc3ViT2JqZWN0W2tleV0gPSBjb3B5KHN1Yk9iamVjdFtrZXldKVxuICAgICAgICAgIHN1Yk9iamVjdCA9IHN1Yk9iamVjdFtrZXldXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IGxhc3RLZXkgPSBrZXlBcnJheVtrZXlBcnJheS5sZW5ndGggLSAxXVxuICAgICAgaWYgKGlzQXJyYXkoc3ViT2JqZWN0KSAmJiBsYXN0S2V5ID09PSAnLScpIHtcbiAgICAgICAgc3ViT2JqZWN0LnB1c2godmFsdWUpXG4gICAgICB9IGVsc2UgaWYgKGluc2VydCAmJiBpc0FycmF5KHN1Yk9iamVjdCkgJiYgIWlzTmFOKCtsYXN0S2V5KSkge1xuICAgICAgICBzdWJPYmplY3Quc3BsaWNlKGxhc3RLZXksIDAsIHZhbHVlKVxuICAgICAgfSBlbHNlIGlmIChpc01hcChzdWJPYmplY3QpKSB7XG4gICAgICAgIHN1Yk9iamVjdC5zZXQobGFzdEtleSwgdmFsdWUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdWJPYmplY3RbbGFzdEtleV0gPSB2YWx1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld09iamVjdFxuICAgIH1cbiAgICBjb25zb2xlLmVycm9yKGBzZXRDb3B5IGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlcjogJHtwb2ludGVyfWApXG4gICAgcmV0dXJuIG9iamVjdFxuICB9XG5cbiAgLyoqXG4gICAqICdpbnNlcnQnIGZ1bmN0aW9uXG4gICAqXG4gICAqIENhbGxzICdzZXQnIHdpdGggaW5zZXJ0ID0gVFJVRVxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IC0gb2JqZWN0IHRvIGluc2VydCB2YWx1ZSBpblxuICAgKiBAcGFyYW0gcG9pbnRlciAtIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICAgKiBAcGFyYW0gdmFsdWUgLSB2YWx1ZSB0byBpbnNlcnRcbiAgICovXG4gIHN0YXRpYyBpbnNlcnQoXG4gICAgb2JqZWN0OiBvYmplY3QsXG4gICAgcG9pbnRlcjogUG9pbnRlcixcbiAgICB2YWx1ZTogYW55XG4gICkge1xuICAgIGNvbnN0IHVwZGF0ZWRPYmplY3QgPSB0aGlzLnNldChvYmplY3QsIHBvaW50ZXIsIHZhbHVlLCB0cnVlKVxuICAgIHJldHVybiB1cGRhdGVkT2JqZWN0XG4gIH1cblxuICAvKipcbiAgICogJ2luc2VydENvcHknIGZ1bmN0aW9uXG4gICAqXG4gICAqIENhbGxzICdzZXRDb3B5JyB3aXRoIGluc2VydCA9IFRSVUVcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCAtIG9iamVjdCB0byBpbnNlcnQgdmFsdWUgaW5cbiAgICogQHBhcmFtIHBvaW50ZXIgLSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSlcbiAgICogQHBhcmFtIHZhbHVlIC0gdmFsdWUgdG8gaW5zZXJ0XG4gICAqL1xuICBzdGF0aWMgaW5zZXJ0Q29weShcbiAgICBvYmplY3Q6IG9iamVjdCxcbiAgICBwb2ludGVyOiBQb2ludGVyLFxuICAgIHZhbHVlOiBhbnlcbiAgKSB7XG4gICAgY29uc3QgdXBkYXRlZE9iamVjdCA9IHRoaXMuc2V0Q29weShvYmplY3QsIHBvaW50ZXIsIHZhbHVlLCB0cnVlKVxuICAgIHJldHVybiB1cGRhdGVkT2JqZWN0XG4gIH1cblxuICAvKipcbiAgICogJ3JlbW92ZScgZnVuY3Rpb25cbiAgICpcbiAgICogVXNlcyBhIEpTT04gUG9pbnRlciB0byByZW1vdmUgYSBrZXkgYW5kIGl0cyBhdHRyaWJ1dGUgZnJvbSBhbiBvYmplY3RcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCAtIG9iamVjdCB0byBkZWxldGUgYXR0cmlidXRlIGZyb21cbiAgICogQHBhcmFtIHBvaW50ZXIgLSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSlcbiAgICovXG4gIHN0YXRpYyByZW1vdmUoXG4gICAgb2JqZWN0OiBvYmplY3QsXG4gICAgcG9pbnRlcjogUG9pbnRlclxuICApIHtcbiAgICBjb25zdCBrZXlBcnJheSA9IHRoaXMucGFyc2UocG9pbnRlcilcbiAgICBpZiAoa2V5QXJyYXkgIT09IG51bGwgJiYga2V5QXJyYXkubGVuZ3RoKSB7XG4gICAgICBjb25zdCBsYXN0S2V5ID0ga2V5QXJyYXkucG9wKClcbiAgICAgIGNvbnN0IHBhcmVudE9iamVjdCA9IHRoaXMuZ2V0KG9iamVjdCwga2V5QXJyYXkpXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJlbnRPYmplY3QpKSB7XG4gICAgICAgIGNvbnN0IGxhc3RJbmRleCA9IChsYXN0S2V5ID09PSAnLScpID8gcGFyZW50T2JqZWN0Lmxlbmd0aCAtIDEgOiBwYXJzZUludChsYXN0S2V5LCAxMClcblxuICAgICAgICBwYXJlbnRPYmplY3Quc3BsaWNlKGxhc3RJbmRleCwgMSlcbiAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QocGFyZW50T2JqZWN0KSkge1xuICAgICAgICBkZWxldGUgcGFyZW50T2JqZWN0W2xhc3RLZXldXG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqZWN0XG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoYHJlbW92ZSBlcnJvcjogSW52YWxpZCBKU09OIFBvaW50ZXI6ICR7cG9pbnRlcn1gKVxuICAgIHJldHVybiBvYmplY3RcbiAgfVxuXG4gIC8qKlxuICAgKiAnaGFzJyBmdW5jdGlvblxuICAgKlxuICAgKiBUZXN0cyBpZiBhbiBvYmplY3QgaGFzIGEgdmFsdWUgYXQgdGhlIGxvY2F0aW9uIHNwZWNpZmllZCBieSBhIEpTT04gUG9pbnRlclxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IC0gb2JqZWN0IHRvIGNoZWsgZm9yIHZhbHVlXG4gICAqIEBwYXJhbSBwb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gICAqL1xuICBzdGF0aWMgaGFzKFxuICAgIG9iamVjdDogb2JqZWN0LFxuICAgIHBvaW50ZXI6IFBvaW50ZXJcbiAgKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KG9iamVjdCwgcG9pbnRlciwgMCwgbnVsbCwgdHJ1ZSlcbiAgfVxuXG4gIC8qKlxuICAgKiAnZGljdCcgZnVuY3Rpb25cbiAgICpcbiAgICogUmV0dXJucyBhIChwb2ludGVyIC0+IHZhbHVlKSBkaWN0aW9uYXJ5IGZvciBhbiBvYmplY3RcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCAtIFRoZSBvYmplY3QgdG8gY3JlYXRlIGEgZGljdGlvbmFyeSBmcm9tXG4gICAqIEByZXR1cm4gVGhlIHJlc3VsdGluZyBkaWN0aW9uYXJ5IG9iamVjdFxuICAgKi9cbiAgc3RhdGljIGRpY3Qob2JqZWN0OiBvYmplY3QpIHtcbiAgICBjb25zdCByZXN1bHRzOiBhbnkgPSB7fVxuICAgIHRoaXMuZm9yRWFjaERlZXAob2JqZWN0LCAodmFsdWUsIHBvaW50ZXIpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJlc3VsdHNbcG9pbnRlcl0gPSB2YWx1ZVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHJlc3VsdHNcbiAgfVxuXG4gIC8qKlxuICAgKiAnZm9yRWFjaERlZXAnIGZ1bmN0aW9uXG4gICAqXG4gICAqIEl0ZXJhdGVzIG92ZXIgb3duIGVudW1lcmFibGUgcHJvcGVydGllcyBvZiBhbiBvYmplY3Qgb3IgaXRlbXMgaW4gYW4gYXJyYXlcbiAgICogYW5kIGludm9rZXMgYW4gaXRlcmF0ZWUgZnVuY3Rpb24gZm9yIGVhY2gga2V5L3ZhbHVlIG9yIGluZGV4L3ZhbHVlIHBhaXIuXG4gICAqIEJ5IGRlZmF1bHQsIGl0ZXJhdGVzIG92ZXIgaXRlbXMgd2l0aGluIG9iamVjdHMgYW5kIGFycmF5cyBhZnRlciBjYWxsaW5nXG4gICAqIHRoZSBpdGVyYXRlZSBmdW5jdGlvbiBvbiB0aGUgY29udGFpbmluZyBvYmplY3Qgb3IgYXJyYXkgaXRzZWxmLlxuICAgKlxuICAgKiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czogKHZhbHVlLCBwb2ludGVyLCByb290T2JqZWN0KSxcbiAgICogd2hlcmUgcG9pbnRlciBpcyBhIEpTT04gcG9pbnRlciBpbmRpY2F0aW5nIHRoZSBsb2NhdGlvbiBvZiB0aGUgY3VycmVudFxuICAgKiB2YWx1ZSB3aXRoaW4gdGhlIHJvb3Qgb2JqZWN0LCBhbmQgcm9vdE9iamVjdCBpcyB0aGUgcm9vdCBvYmplY3QgaW5pdGlhbGx5XG4gICAqIHN1Ym1pdHRlZCB0byB0aCBmdW5jdGlvbi5cbiAgICpcbiAgICogSWYgYSB0aGlyZCBvcHRpb25hbCBwYXJhbWV0ZXIgJ2JvdHRvbVVwJyBpcyBzZXQgdG8gVFJVRSwgdGhlIGl0ZXJhdG9yXG4gICAqIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIG9uIHN1Yi1vYmplY3RzIGFuZCBhcnJheXMgYWZ0ZXIgYmVpbmdcbiAgICogY2FsbGVkIG9uIHRoZWlyIGNvbnRlbnRzLCByYXRoZXIgdGhhbiBiZWZvcmUsIHdoaWNoIGlzIHRoZSBkZWZhdWx0LlxuICAgKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGNhbiBhbHNvIG9wdGlvbmFsbHkgYmUgY2FsbGVkIGRpcmVjdGx5IG9uIGEgc3ViLW9iamVjdCBieVxuICAgKiBpbmNsdWRpbmcgb3B0aW9uYWwgNHRoIGFuZCA1dGggcGFyYW1ldGVycyB0byBzcGVjaWZ5IHRoZSBpbml0aWFsXG4gICAqIHJvb3Qgb2JqZWN0IGFuZCBwb2ludGVyLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IC0gdGhlIGluaXRpYWwgb2JqZWN0IG9yIGFycmF5XG4gICAqIEBwYXJhbSBmbiAtIGl0ZXJhdGVlIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSBib3R0b21VcCAtIG9wdGlvbmFsLCBzZXQgdG8gVFJVRSB0byByZXZlcnNlIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gcG9pbnRlciAtIG9wdGlvbmFsLCBKU09OIFBvaW50ZXIgdG8gb2JqZWN0IHdpdGhpbiByb290T2JqZWN0XG4gICAqIEBwYXJhbSByb290T2JqZWN0IC0gb3B0aW9uYWwsIHJvb3Qgb2JqZWN0IG9yIGFycmF5XG4gICAqIEByZXR1cm4gVGhlIG1vZGlmaWVkIG9iamVjdFxuICAgKi9cbiAgc3RhdGljIGZvckVhY2hEZWVwKFxuICAgIG9iamVjdCxcbiAgICBmbjogKHY6IGFueSwgcD86IHN0cmluZywgbz86IGFueSkgPT4gYW55ID0gKHYpID0+IHYsXG4gICAgYm90dG9tVXAgPSBmYWxzZSxcbiAgICBwb2ludGVyID0gJycsXG4gICAgcm9vdE9iamVjdCA9IG9iamVjdFxuICApIHtcbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBmb3JFYWNoRGVlcCBlcnJvcjogSXRlcmF0b3IgaXMgbm90IGEgZnVuY3Rpb246YCwgZm4pXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKCFib3R0b21VcCkge1xuICAgICAgZm4ob2JqZWN0LCBwb2ludGVyLCByb290T2JqZWN0KVxuICAgIH1cbiAgICBpZiAoaXNPYmplY3Qob2JqZWN0KSB8fCBpc0FycmF5KG9iamVjdCkpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG9iamVjdCkpIHtcbiAgICAgICAgY29uc3QgbmV3UG9pbnRlciA9IHBvaW50ZXIgKyAnLycgKyB0aGlzLmVzY2FwZShrZXkpXG4gICAgICAgIHRoaXMuZm9yRWFjaERlZXAob2JqZWN0W2tleV0sIGZuLCBib3R0b21VcCwgbmV3UG9pbnRlciwgcm9vdE9iamVjdClcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGJvdHRvbVVwKSB7XG4gICAgICBmbihvYmplY3QsIHBvaW50ZXIsIHJvb3RPYmplY3QpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdmb3JFYWNoRGVlcENvcHknIGZ1bmN0aW9uXG4gICAqXG4gICAqIFNpbWlsYXIgdG8gZm9yRWFjaERlZXAsIGJ1dCByZXR1cm5zIGEgY29weSBvZiB0aGUgb3JpZ2luYWwgb2JqZWN0LCB3aXRoXG4gICAqIHRoZSBzYW1lIGtleXMgYW5kIGluZGV4ZXMsIGJ1dCB3aXRoIHZhbHVlcyByZXBsYWNlZCB3aXRoIHRoZSByZXN1bHQgb2ZcbiAgICogdGhlIGl0ZXJhdGVlIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IC0gdGhlIGluaXRpYWwgb2JqZWN0IG9yIGFycmF5XG4gICAqIEBwYXJhbSBmbiAtIGl0ZXJhdGVlIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSBib3R0b21VcCAtIG9wdGlvbmFsLCBzZXQgdG8gVFJVRSB0byByZXZlcnNlIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gcG9pbnRlciAtIG9wdGlvbmFsLCBKU09OIFBvaW50ZXIgdG8gb2JqZWN0IHdpdGhpbiByb290T2JqZWN0XG4gICAqIEBwYXJhbSByb290T2JqZWN0IC0gb3B0aW9uYWwsIHJvb3Qgb2JqZWN0IG9yIGFycmF5XG4gICAqIEByZXR1cm4gVGhlIGNvcGllZCBvYmplY3RcbiAgICovXG4gIHN0YXRpYyBmb3JFYWNoRGVlcENvcHkoXG4gICAgb2JqZWN0OiBvYmplY3QsXG4gICAgZm46ICh2OiBhbnksIHA/OiBzdHJpbmcsIG8/OiBhbnkpID0+IGFueSA9ICh2KSA9PiB2LFxuICAgIGJvdHRvbVVwOiBib29sZWFuID0gZmFsc2UsXG4gICAgcG9pbnRlcjogc3RyaW5nID0gJycsXG4gICAgcm9vdE9iamVjdDogb2JqZWN0ID0gb2JqZWN0XG4gICkge1xuICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYGZvckVhY2hEZWVwQ29weSBlcnJvcjogSXRlcmF0b3IgaXMgbm90IGEgZnVuY3Rpb246YCwgZm4pXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBpZiAoaXNPYmplY3Qob2JqZWN0KSB8fCBBcnJheS5pc0FycmF5KG9iamVjdCkpIHtcbiAgICAgIGxldCBuZXdPYmplY3QgPSBBcnJheS5pc0FycmF5KG9iamVjdCkgPyBbLi4ub2JqZWN0XSA6IHsuLi5vYmplY3R9XG4gICAgICBpZiAoIWJvdHRvbVVwKSB7XG4gICAgICAgIG5ld09iamVjdCA9IGZuKG5ld09iamVjdCwgcG9pbnRlciwgcm9vdE9iamVjdClcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG5ld09iamVjdCkpIHtcbiAgICAgICAgY29uc3QgbmV3UG9pbnRlciA9IHBvaW50ZXIgKyAnLycgKyB0aGlzLmVzY2FwZShrZXkpXG4gICAgICAgIG5ld09iamVjdFtrZXldID0gdGhpcy5mb3JFYWNoRGVlcENvcHkoXG4gICAgICAgICAgbmV3T2JqZWN0W2tleV0sIGZuLCBib3R0b21VcCwgbmV3UG9pbnRlciwgcm9vdE9iamVjdFxuICAgICAgICApXG4gICAgICB9XG4gICAgICBpZiAoYm90dG9tVXApIHtcbiAgICAgICAgbmV3T2JqZWN0ID0gZm4obmV3T2JqZWN0LCBwb2ludGVyLCByb290T2JqZWN0KVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld09iamVjdFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZm4ob2JqZWN0LCBwb2ludGVyLCByb290T2JqZWN0KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnZXNjYXBlJyBmdW5jdGlvblxuICAgKlxuICAgKiBFc2NhcGVzIGEgc3RyaW5nIHJlZmVyZW5jZSBrZXlcbiAgICpcbiAgICogQHBhcmFtIGtleSAtIHN0cmluZyBrZXkgdG8gZXNjYXBlXG4gICAqIEByZXR1cm4gZXNjYXBlZCBrZXlcbiAgICovXG4gIHN0YXRpYyBlc2NhcGUoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBrZXkudG9TdHJpbmcoKS5yZXBsYWNlKC9+L2csICd+MCcpLnJlcGxhY2UoL1xcLy9nLCAnfjEnKVxuICB9XG5cbiAgLyoqXG4gICAqICd1bmVzY2FwZScgZnVuY3Rpb25cbiAgICpcbiAgICogVW5lc2NhcGVzIGEgc3RyaW5nIHJlZmVyZW5jZSBrZXlcbiAgICpcbiAgICogQHBhcmFtIGtleSAtIHN0cmluZyBrZXkgdG8gdW5lc2NhcGVcbiAgICogQHJldHVybiB1bmVzY2FwZWQga2V5XG4gICAqL1xuICBzdGF0aWMgdW5lc2NhcGUoa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4ga2V5LnRvU3RyaW5nKCkucmVwbGFjZSgvfjEvZywgJy8nKS5yZXBsYWNlKC9+MC9nLCAnficpXG4gIH1cblxuICAvKipcbiAgICogJ3BhcnNlJyBmdW5jdGlvblxuICAgKlxuICAgKiBDb252ZXJ0cyBhIHN0cmluZyBKU09OIFBvaW50ZXIgaW50byBhIGFycmF5IG9mIGtleXNcbiAgICogKGlmIGlucHV0IGlzIGFscmVhZHkgYW4gYW4gYXJyYXkgb2Yga2V5cywgaXQgaXMgcmV0dXJuZWQgdW5jaGFuZ2VkKVxuICAgKlxuICAgKiBAcGFyYW0gcG9pbnRlciAtIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICAgKiBAcGFyYW0gZXJyb3JzIC0gU2hvdyBlcnJvciBpZiBpbnZhbGlkIHBvaW50ZXI/XG4gICAqIEByZXR1cm4gSlNPTiBQb2ludGVyIGFycmF5IG9mIGtleXNcbiAgICovXG4gIHN0YXRpYyBwYXJzZShcbiAgICBwb2ludGVyOiBQb2ludGVyLFxuICAgIGVycm9yczogYm9vbGVhbiA9IGZhbHNlXG4gICk6IHN0cmluZ1tdIHtcbiAgICBpZiAoIXRoaXMuaXNKc29uUG9pbnRlcihwb2ludGVyKSkge1xuICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBwYXJzZSBlcnJvcjogSW52YWxpZCBKU09OIFBvaW50ZXI6ICR7cG9pbnRlcn1gKVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgaWYgKGlzQXJyYXkocG9pbnRlcikpIHtcbiAgICAgIHJldHVybiBwb2ludGVyIGFzIHN0cmluZ1tdXG4gICAgfVxuICAgIGlmICh0eXBlb2YgcG9pbnRlciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChwb2ludGVyWzBdID09PSAnIycpIHtcbiAgICAgICAgcG9pbnRlciA9IHBvaW50ZXIuc2xpY2UoMSlcbiAgICAgIH1cbiAgICAgIGlmIChwb2ludGVyID09PSAnJyB8fCBwb2ludGVyID09PSAnLycpIHtcbiAgICAgICAgcmV0dXJuIFtdXG4gICAgICB9XG4gICAgICByZXR1cm4gcG9pbnRlci5zbGljZSgxKS5zcGxpdCgnLycpLm1hcCh0aGlzLnVuZXNjYXBlKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnY29tcGlsZScgZnVuY3Rpb25cbiAgICpcbiAgICogQ29udmVydHMgYW4gYXJyYXkgb2Yga2V5cyBpbnRvIGEgSlNPTiBQb2ludGVyIHN0cmluZ1xuICAgKiAoaWYgaW5wdXQgaXMgYWxyZWFkeSBhIHN0cmluZywgaXQgaXMgbm9ybWFsaXplZCBhbmQgcmV0dXJuZWQpXG4gICAqXG4gICAqIFRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyIGlzIGEgZGVmYXVsdCB3aGljaCB3aWxsIHJlcGxhY2UgYW55IGVtcHR5IGtleXMuXG4gICAqXG4gICAqIEBwYXJhbSBwb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gICAqIEBwYXJhbSBkZWZhdWx0VmFsdWUgLSBEZWZhdWx0IHZhbHVlXG4gICAqIEBwYXJhbSBlcnJvcnMgLSBTaG93IGVycm9yIGlmIGludmFsaWQgcG9pbnRlcj9cbiAgICogQHJldHVybiBKU09OIFBvaW50ZXIgc3RyaW5nXG4gICAqL1xuICBzdGF0aWMgY29tcGlsZShcbiAgICBwb2ludGVyOiBQb2ludGVyLFxuICAgIGRlZmF1bHRWYWx1ZTogc3RyaW5nIHwgbnVtYmVyID0gJycsXG4gICAgZXJyb3JzOiBib29sZWFuID0gZmFsc2VcbiAgKTogc3RyaW5nIHtcbiAgICBpZiAocG9pbnRlciA9PT0gJyMnKSB7XG4gICAgICByZXR1cm4gJydcbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzSnNvblBvaW50ZXIocG9pbnRlcikpIHtcbiAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgY29tcGlsZSBlcnJvcjogSW52YWxpZCBKU09OIFBvaW50ZXI6ICR7cG9pbnRlcn1gKVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocG9pbnRlcikpIHtcbiAgICAgIGlmIChwb2ludGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gJydcbiAgICAgIH1cbiAgICAgIHJldHVybiAnLycgKyBwb2ludGVyLm1hcChcbiAgICAgICAga2V5ID0+IGtleSA9PT0gJycgPyBkZWZhdWx0VmFsdWUgOiB0aGlzLmVzY2FwZShrZXkpXG4gICAgICApLmpvaW4oJy8nKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHBvaW50ZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAocG9pbnRlclswXSA9PT0gJyMnKSB7XG4gICAgICAgIHBvaW50ZXIgPSBwb2ludGVyLnNsaWNlKDEpXG4gICAgICB9XG4gICAgICByZXR1cm4gcG9pbnRlclxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAndG9LZXknIGZ1bmN0aW9uXG4gICAqXG4gICAqIEV4dHJhY3RzIG5hbWUgb2YgdGhlIGZpbmFsIGtleSBmcm9tIGEgSlNPTiBQb2ludGVyLlxuICAgKlxuICAgKiBAcGFyYW0gcG9pbnRlciAtIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICAgKiBAcGFyYW0gZXJyb3JzIC0gU2hvdyBlcnJvciBpZiBpbnZhbGlkIHBvaW50ZXI/XG4gICAqIEByZXR1cm4gdGhlIGV4dHJhY3RlZCBrZXlcbiAgICovXG4gIHN0YXRpYyB0b0tleShcbiAgICBwb2ludGVyOiBQb2ludGVyLFxuICAgIGVycm9yczogYm9vbGVhbiA9IGZhbHNlXG4gICk6IHN0cmluZyB7XG4gICAgY29uc3Qga2V5QXJyYXkgPSB0aGlzLnBhcnNlKHBvaW50ZXIsIGVycm9ycylcbiAgICBpZiAoa2V5QXJyYXkgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGlmICgha2V5QXJyYXkubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gJydcbiAgICB9XG4gICAgcmV0dXJuIGtleUFycmF5W2tleUFycmF5Lmxlbmd0aCAtIDFdXG4gIH1cblxuICAvKipcbiAgICogJ2lzSnNvblBvaW50ZXInIGZ1bmN0aW9uXG4gICAqXG4gICAqIENoZWNrcyBhIHN0cmluZyBvciBhcnJheSB2YWx1ZSB0byBkZXRlcm1pbmUgaWYgaXQgaXMgYSB2YWxpZCBKU09OIFBvaW50ZXIuXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBhIHN0cmluZyBpcyBlbXB0eSwgb3Igc3RhcnRzIHdpdGggJy8nIG9yICcjLycuXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBhbiBhcnJheSBjb250YWlucyBvbmx5IHN0cmluZyB2YWx1ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZSAtIHZhbHVlIHRvIGNoZWNrXG4gICAqIEByZXR1cm4gdHJ1ZSBpZiB2YWx1ZSBpcyBhIHZhbGlkIEpTT04gUG9pbnRlciwgb3RoZXJ3aXNlIGZhbHNlXG4gICAqL1xuICBzdGF0aWMgaXNKc29uUG9pbnRlcih2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUuZXZlcnkoa2V5ID0+IHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKVxuICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICBpZiAodmFsdWUgPT09ICcnIHx8IHZhbHVlID09PSAnIycpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZVswXSA9PT0gJy8nIHx8IHZhbHVlLnNsaWNlKDAsIDIpID09PSAnIy8nKSB7XG4gICAgICAgIHJldHVybiAhLyh+W14wMV18fiQpL2cudGVzdCh2YWx1ZSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvKipcbiAgICogJ2lzU3ViUG9pbnRlcicgZnVuY3Rpb25cbiAgICpcbiAgICogQ2hlY2tzIHdoZXRoZXIgb25lIEpTT04gUG9pbnRlciBpcyBhIHN1YnNldCBvZiBhbm90aGVyLlxuICAgKlxuICAgKiBAcGFyYW0gc2hvcnRQb2ludGVyIC0gcG90ZW50aWFsIHN1YnNldCBKU09OIFBvaW50ZXJcbiAgICogQHBhcmFtIGxvbmdQb2ludGVyIC0gcG90ZW50aWFsIHN1cGVyc2V0IEpTT04gUG9pbnRlclxuICAgKiBAcGFyYW0gdHJ1ZUlmTWF0Y2hpbmcgLSByZXR1cm4gdHJ1ZSBpZiBwb2ludGVycyBtYXRjaD9cbiAgICogQHBhcmFtIGVycm9ycyAtIFNob3cgZXJyb3IgaWYgaW52YWxpZCBwb2ludGVyP1xuICAgKiBAcmV0dXJuIHRydWUgaWYgc2hvcnRQb2ludGVyIGlzIGEgc3Vic2V0IG9mIGxvbmdQb2ludGVyLCBmYWxzZSBpZiBub3RcbiAgICovXG4gIHN0YXRpYyBpc1N1YlBvaW50ZXIoXG4gICAgc2hvcnRQb2ludGVyOiBQb2ludGVyLFxuICAgIGxvbmdQb2ludGVyOiBQb2ludGVyLFxuICAgIHRydWVJZk1hdGNoaW5nOiBib29sZWFuID0gZmFsc2UsXG4gICAgZXJyb3JzOiBib29sZWFuID0gZmFsc2VcbiAgKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmlzSnNvblBvaW50ZXIoc2hvcnRQb2ludGVyKSB8fCAhdGhpcy5pc0pzb25Qb2ludGVyKGxvbmdQb2ludGVyKSkge1xuICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICBsZXQgaW52YWxpZCA9ICcnXG4gICAgICAgIGlmICghdGhpcy5pc0pzb25Qb2ludGVyKHNob3J0UG9pbnRlcikpIHtcbiAgICAgICAgICBpbnZhbGlkICs9IGAgMTogJHtzaG9ydFBvaW50ZXJ9YFxuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5pc0pzb25Qb2ludGVyKGxvbmdQb2ludGVyKSkge1xuICAgICAgICAgIGludmFsaWQgKz0gYCAyOiAke2xvbmdQb2ludGVyfWBcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmVycm9yKGBpc1N1YlBvaW50ZXIgZXJyb3I6IEludmFsaWQgSlNPTiBQb2ludGVyICR7aW52YWxpZH1gKVxuICAgICAgfVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHNob3J0UG9pbnRlciA9IHRoaXMuY29tcGlsZShzaG9ydFBvaW50ZXIsICcnLCBlcnJvcnMpXG4gICAgbG9uZ1BvaW50ZXIgPSB0aGlzLmNvbXBpbGUobG9uZ1BvaW50ZXIsICcnLCBlcnJvcnMpXG4gICAgcmV0dXJuIHNob3J0UG9pbnRlciA9PT0gbG9uZ1BvaW50ZXIgPyB0cnVlSWZNYXRjaGluZyA6XG4gICAgICBgJHtzaG9ydFBvaW50ZXJ9L2AgPT09IGxvbmdQb2ludGVyLnNsaWNlKDAsIHNob3J0UG9pbnRlci5sZW5ndGggKyAxKVxuICB9XG5cbiAgLyoqXG4gICAqICd0b0luZGV4ZWRQb2ludGVyJyBmdW5jdGlvblxuICAgKlxuICAgKiBNZXJnZXMgYW4gYXJyYXkgb2YgbnVtZXJpYyBpbmRleGVzIGFuZCBhIGdlbmVyaWMgcG9pbnRlciB0byBjcmVhdGUgYW5cbiAgICogaW5kZXhlZCBwb2ludGVyIGZvciBhIHNwZWNpZmljIGl0ZW0uXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCBtZXJnaW5nIHRoZSBnZW5lcmljIHBvaW50ZXIgJy9mb28vLS9iYXIvLS9iYXonIGFuZFxuICAgKiB0aGUgYXJyYXkgWzQsIDJdIHdvdWxkIHJlc3VsdCBpbiB0aGUgaW5kZXhlZCBwb2ludGVyICcvZm9vLzQvYmFyLzIvYmF6J1xuICAgKlxuICAgKiBAcGFyYW0gZ2VuZXJpY1BvaW50ZXIgLSBUaGUgZ2VuZXJpYyBwb2ludGVyXG4gICAqIEBwYXJhbSBpbmRleEFycmF5IC0gVGhlIGFycmF5IG9mIG51bWVyaWMgaW5kZXhlc1xuICAgKiBAcGFyYW0gYXJyYXlNYXAgLSBBbiBvcHRpb25hbCBhcnJheSBtYXBcbiAgICogQHJldHVybiBUaGUgbWVyZ2VkIHBvaW50ZXIgd2l0aCBpbmRleGVzXG4gICAqL1xuICBzdGF0aWMgdG9JbmRleGVkUG9pbnRlcihcbiAgICBnZW5lcmljUG9pbnRlcjogUG9pbnRlcixcbiAgICBpbmRleEFycmF5OiBudW1iZXJbXSxcbiAgICBhcnJheU1hcDogTWFwPHN0cmluZywgbnVtYmVyPiA9IG51bGxcbiAgKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5pc0pzb25Qb2ludGVyKGdlbmVyaWNQb2ludGVyKSAmJiBpc0FycmF5KGluZGV4QXJyYXkpKSB7XG4gICAgICBsZXQgaW5kZXhlZFBvaW50ZXIgPSB0aGlzLmNvbXBpbGUoZ2VuZXJpY1BvaW50ZXIpXG4gICAgICBpZiAoaXNNYXAoYXJyYXlNYXApKSB7XG4gICAgICAgIGxldCBhcnJheUluZGV4ID0gMFxuICAgICAgICByZXR1cm4gaW5kZXhlZFBvaW50ZXIucmVwbGFjZSgvXFwvXFwtKD89XFwvfCQpL2csIChrZXksIHN0cmluZ0luZGV4KSA9PlxuICAgICAgICAgIGFycmF5TWFwLmhhcygoaW5kZXhlZFBvaW50ZXIgYXMgc3RyaW5nKS5zbGljZSgwLCBzdHJpbmdJbmRleCkpID9cbiAgICAgICAgICAgICcvJyArIGluZGV4QXJyYXlbYXJyYXlJbmRleCsrXSA6IGtleVxuICAgICAgICApXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGNvbnN0IHBvaW50ZXJJbmRleCBvZiBpbmRleEFycmF5KSB7XG4gICAgICAgICAgaW5kZXhlZFBvaW50ZXIgPSBpbmRleGVkUG9pbnRlci5yZXBsYWNlKCcvLScsICcvJyArIHBvaW50ZXJJbmRleClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5kZXhlZFBvaW50ZXJcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzSnNvblBvaW50ZXIoZ2VuZXJpY1BvaW50ZXIpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGB0b0luZGV4ZWRQb2ludGVyIGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlcjogJHtnZW5lcmljUG9pbnRlcn1gKVxuICAgIH1cbiAgICBpZiAoIWlzQXJyYXkoaW5kZXhBcnJheSkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYHRvSW5kZXhlZFBvaW50ZXIgZXJyb3I6IEludmFsaWQgaW5kZXhBcnJheTogJHtpbmRleEFycmF5fWApXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICd0b0dlbmVyaWNQb2ludGVyJyBmdW5jdGlvblxuICAgKlxuICAgKiBDb21wYXJlcyBhbiBpbmRleGVkIHBvaW50ZXIgdG8gYW4gYXJyYXkgbWFwIGFuZCByZW1vdmVzIGxpc3QgYXJyYXlcbiAgICogaW5kZXhlcyAoYnV0IGxlYXZlcyB0dXBsZSBhcnJyYXkgaW5kZXhlcyBhbmQgYWxsIG9iamVjdCBrZXlzLCBpbmNsdWRpbmdcbiAgICogbnVtZXJpYyBrZXlzKSB0byBjcmVhdGUgYSBnZW5lcmljIHBvaW50ZXIuXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCB1c2luZyB0aGUgaW5kZXhlZCBwb2ludGVyICcvZm9vLzEvYmFyLzIvYmF6LzMnIGFuZFxuICAgKiB0aGUgYXJyYXlNYXAgW1snL2ZvbycsIDBdLCBbJy9mb28vLS9iYXInLCAzXSwgWycvZm9vLy0vYmFyLy0vYmF6JywgMF1dXG4gICAqIHdvdWxkIHJlc3VsdCBpbiB0aGUgZ2VuZXJpYyBwb2ludGVyICcvZm9vLy0vYmFyLzIvYmF6Ly0nXG4gICAqIFVzaW5nIHRoZSBpbmRleGVkIHBvaW50ZXIgJy9mb28vMS9iYXIvNC9iYXovMycgYW5kIHRoZSBzYW1lIGFycmF5TWFwXG4gICAqIHdvdWxkIHJlc3VsdCBpbiB0aGUgZ2VuZXJpYyBwb2ludGVyICcvZm9vLy0vYmFyLy0vYmF6Ly0nXG4gICAqICh0aGUgYmFyIGFycmF5IGhhcyAzIHR1cGxlIGl0ZW1zLCBzbyBpbmRleCAyIGlzIHJldGFpbmVkLCBidXQgNCBpcyByZW1vdmVkKVxuICAgKlxuICAgKiBUaGUgc3RydWN0dXJlIG9mIHRoZSBhcnJheU1hcCBpczogW1sncGF0aCB0byBhcnJheScsIG51bWJlciBvZiB0dXBsZSBpdGVtc10uLi5dXG4gICAqXG4gICAqIEBwYXJhbSBpbmRleGVkUG9pbnRlciAtIFRoZSBpbmRleGVkIHBvaW50ZXIgKGFycmF5IG9yIHN0cmluZylcbiAgICogQHBhcmFtIGFycmF5TWFwIC0gVGhlIG9wdGlvbmFsIGFycmF5IG1hcCAoZm9yIHByZXNlcnZpbmcgdHVwbGUgaW5kZXhlcylcbiAgICogQHJldHVybiBUaGUgZ2VuZXJpYyBwb2ludGVyIHdpdGggaW5kZXhlcyByZW1vdmVkXG4gICAqL1xuICBzdGF0aWMgdG9HZW5lcmljUG9pbnRlcihcbiAgICBpbmRleGVkUG9pbnRlcjogUG9pbnRlcixcbiAgICBhcnJheU1hcDogTWFwPHN0cmluZywgbnVtYmVyPiA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KClcbiAgKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5pc0pzb25Qb2ludGVyKGluZGV4ZWRQb2ludGVyKSAmJiBpc01hcChhcnJheU1hcCkpIHtcbiAgICAgIGNvbnN0IHBvaW50ZXJBcnJheSA9IHRoaXMucGFyc2UoaW5kZXhlZFBvaW50ZXIpXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHBvaW50ZXJBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzdWJQb2ludGVyID0gdGhpcy5jb21waWxlKHBvaW50ZXJBcnJheS5zbGljZSgwLCBpKSlcbiAgICAgICAgaWYgKGFycmF5TWFwLmhhcyhzdWJQb2ludGVyKSAmJlxuICAgICAgICAgIGFycmF5TWFwLmdldChzdWJQb2ludGVyKSA8PSArcG9pbnRlckFycmF5W2ldXG4gICAgICAgICkge1xuICAgICAgICAgIHBvaW50ZXJBcnJheVtpXSA9ICctJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5jb21waWxlKHBvaW50ZXJBcnJheSlcbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzSnNvblBvaW50ZXIoaW5kZXhlZFBvaW50ZXIpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGB0b0dlbmVyaWNQb2ludGVyIGVycm9yOiBpbnZhbGlkIEpTT04gUG9pbnRlcjogJHtpbmRleGVkUG9pbnRlcn1gKVxuICAgIH1cbiAgICBpZiAoIWlzTWFwKGFycmF5TWFwKSkge1xuICAgICAgY29uc29sZS5lcnJvcihgdG9HZW5lcmljUG9pbnRlciBlcnJvcjogaW52YWxpZCBhcnJheU1hcDogJHthcnJheU1hcH1gKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAndG9Db250cm9sUG9pbnRlcicgZnVuY3Rpb25cbiAgICpcbiAgICogQWNjZXB0cyBhIEpTT04gUG9pbnRlciBmb3IgYSBkYXRhIG9iamVjdCBhbmQgcmV0dXJucyBhIEpTT04gUG9pbnRlciBmb3IgdGhlXG4gICAqIG1hdGNoaW5nIGNvbnRyb2wgaW4gYW4gQW5ndWxhciBGb3JtR3JvdXAuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhUG9pbnRlciAtIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KSB0byBhIGRhdGEgb2JqZWN0XG4gICAqIEBwYXJhbSBmb3JtR3JvdXAgLSBBbmd1bGFyIEZvcm1Hcm91cCB0byBnZXQgdmFsdWUgZnJvbVxuICAgKiBAcGFyYW0gY29udHJvbE11c3RFeGlzdCAtIE9ubHkgcmV0dXJuIGlmIGNvbnRyb2wgZXhpc3RzP1xuICAgKiBAcmV0dXJuIEpTT04gUG9pbnRlciAoc3RyaW5nKSB0byB0aGUgZm9ybUdyb3VwIG9iamVjdFxuICAgKi9cbiAgc3RhdGljIHRvQ29udHJvbFBvaW50ZXIoXG4gICAgZGF0YVBvaW50ZXI6IFBvaW50ZXIsXG4gICAgZm9ybUdyb3VwOiBGb3JtR3JvdXAsXG4gICAgY29udHJvbE11c3RFeGlzdDogYm9vbGVhbiA9IGZhbHNlXG4gICkge1xuICAgIGNvbnN0IGRhdGFQb2ludGVyQXJyYXkgPSB0aGlzLnBhcnNlKGRhdGFQb2ludGVyKVxuICAgIGNvbnN0IGNvbnRyb2xQb2ludGVyQXJyYXk6IHN0cmluZ1tdID0gW11cbiAgICBsZXQgc3ViR3JvdXA6IGFueSA9IGZvcm1Hcm91cFxuICAgIGlmIChkYXRhUG9pbnRlckFycmF5ICE9PSBudWxsKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBkYXRhUG9pbnRlckFycmF5KSB7XG4gICAgICAgIGlmIChoYXNPd24oc3ViR3JvdXAsICdjb250cm9scycpKSB7XG4gICAgICAgICAgY29udHJvbFBvaW50ZXJBcnJheS5wdXNoKCdjb250cm9scycpXG4gICAgICAgICAgc3ViR3JvdXAgPSBzdWJHcm91cC5jb250cm9sc1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FycmF5KHN1Ykdyb3VwKSAmJiAoa2V5ID09PSAnLScpKSB7XG4gICAgICAgICAgY29udHJvbFBvaW50ZXJBcnJheS5wdXNoKChzdWJHcm91cC5sZW5ndGggLSAxKS50b1N0cmluZygpKVxuICAgICAgICAgIHN1Ykdyb3VwID0gc3ViR3JvdXBbc3ViR3JvdXAubGVuZ3RoIC0gMV1cbiAgICAgICAgfSBlbHNlIGlmIChoYXNPd24oc3ViR3JvdXAsIGtleSkpIHtcbiAgICAgICAgICBjb250cm9sUG9pbnRlckFycmF5LnB1c2goa2V5KVxuICAgICAgICAgIHN1Ykdyb3VwID0gc3ViR3JvdXBba2V5XVxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRyb2xNdXN0RXhpc3QpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGB0b0NvbnRyb2xQb2ludGVyIGVycm9yOiBVbmFibGUgdG8gZmluZCBcIiR7a2V5fVwiIGl0ZW0gaW4gRm9ybUdyb3VwLmApXG4gICAgICAgICAgY29uc29sZS5lcnJvcihkYXRhUG9pbnRlcilcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1Hcm91cClcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb250cm9sUG9pbnRlckFycmF5LnB1c2goa2V5KVxuICAgICAgICAgIHN1Ykdyb3VwID0ge2NvbnRyb2xzOiB7fX1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuY29tcGlsZShjb250cm9sUG9pbnRlckFycmF5KVxuICAgIH1cbiAgICBjb25zb2xlLmVycm9yKGB0b0NvbnRyb2xQb2ludGVyIGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlcjogJHtkYXRhUG9pbnRlcn1gKVxuICB9XG5cbiAgLyoqXG4gICAqICd0b1NjaGVtYVBvaW50ZXInIGZ1bmN0aW9uXG4gICAqXG4gICAqIEFjY2VwdHMgYSBKU09OIFBvaW50ZXIgdG8gYSB2YWx1ZSBpbnNpZGUgYSBkYXRhIG9iamVjdCBhbmQgYSBKU09OIHNjaGVtYVxuICAgKiBmb3IgdGhhdCBvYmplY3QuXG4gICAqXG4gICAqIFJldHVybnMgYSBQb2ludGVyIHRvIHRoZSBzdWItc2NoZW1hIGZvciB0aGUgdmFsdWUgaW5zaWRlIHRoZSBvYmplY3QncyBzY2hlbWEuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhUG9pbnRlciAtIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KSB0byBhbiBvYmplY3RcbiAgICogQHBhcmFtIHNjaGVtYSAtIEpTT04gc2NoZW1hIGZvciB0aGUgb2JqZWN0XG4gICAqIEByZXR1cm4gSlNPTiBQb2ludGVyIChzdHJpbmcpIHRvIHRoZSBvYmplY3QncyBzY2hlbWFcbiAgICovXG4gIHN0YXRpYyB0b1NjaGVtYVBvaW50ZXIoXG4gICAgZGF0YVBvaW50ZXI6IFBvaW50ZXIsXG4gICAgc2NoZW1hOiBhbnlcbiAgKTogUG9pbnRlciB7XG4gICAgaWYgKHRoaXMuaXNKc29uUG9pbnRlcihkYXRhUG9pbnRlcikgJiYgdHlwZW9mIHNjaGVtYSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGNvbnN0IHBvaW50ZXJBcnJheSA9IHRoaXMucGFyc2UoZGF0YVBvaW50ZXIpXG4gICAgICBpZiAoIXBvaW50ZXJBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuICcnXG4gICAgICB9XG4gICAgICBjb25zdCBmaXJzdEtleSA9IHBvaW50ZXJBcnJheS5zaGlmdCgpXG4gICAgICBpZiAoc2NoZW1hLnR5cGUgPT09ICdvYmplY3QnIHx8IHNjaGVtYS5wcm9wZXJ0aWVzIHx8IHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcykge1xuICAgICAgICBpZiAoKHNjaGVtYS5wcm9wZXJ0aWVzIHx8IHt9KVtmaXJzdEtleV0pIHtcbiAgICAgICAgICByZXR1cm4gYC9wcm9wZXJ0aWVzLyR7dGhpcy5lc2NhcGUoZmlyc3RLZXkpfWAgK1xuICAgICAgICAgICAgdGhpcy50b1NjaGVtYVBvaW50ZXIocG9pbnRlckFycmF5LCBzY2hlbWEucHJvcGVydGllc1tmaXJzdEtleV0pXG4gICAgICAgIH0gZWxzZSBpZiAoc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgcmV0dXJuICcvYWRkaXRpb25hbFByb3BlcnRpZXMnICtcbiAgICAgICAgICAgIHRoaXMudG9TY2hlbWFQb2ludGVyKHBvaW50ZXJBcnJheSwgc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoKHNjaGVtYS50eXBlID09PSAnYXJyYXknIHx8IHNjaGVtYS5pdGVtcykgJiZcbiAgICAgICAgKGlzTnVtYmVyKGZpcnN0S2V5KSB8fCBmaXJzdEtleSA9PT0gJy0nIHx8IGZpcnN0S2V5ID09PSAnJylcbiAgICAgICkge1xuICAgICAgICBjb25zdCBhcnJheUl0ZW0gPSBmaXJzdEtleSA9PT0gJy0nIHx8IGZpcnN0S2V5ID09PSAnJyA/IDAgOiArZmlyc3RLZXlcbiAgICAgICAgaWYgKGlzQXJyYXkoc2NoZW1hLml0ZW1zKSkge1xuICAgICAgICAgIGlmIChhcnJheUl0ZW0gPCBzY2hlbWEuaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gJy9pdGVtcy8nICsgYXJyYXlJdGVtICtcbiAgICAgICAgICAgICAgdGhpcy50b1NjaGVtYVBvaW50ZXIocG9pbnRlckFycmF5LCBzY2hlbWEuaXRlbXNbYXJyYXlJdGVtXSlcbiAgICAgICAgICB9IGVsc2UgaWYgKHNjaGVtYS5hZGRpdGlvbmFsSXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiAnL2FkZGl0aW9uYWxJdGVtcycgK1xuICAgICAgICAgICAgICB0aGlzLnRvU2NoZW1hUG9pbnRlcihwb2ludGVyQXJyYXksIHNjaGVtYS5hZGRpdGlvbmFsSXRlbXMpXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHNjaGVtYS5pdGVtcykpIHtcbiAgICAgICAgICByZXR1cm4gJy9pdGVtcycgKyB0aGlzLnRvU2NoZW1hUG9pbnRlcihwb2ludGVyQXJyYXksIHNjaGVtYS5pdGVtcylcbiAgICAgICAgfSBlbHNlIGlmIChpc09iamVjdChzY2hlbWEuYWRkaXRpb25hbEl0ZW1zKSkge1xuICAgICAgICAgIHJldHVybiAnL2FkZGl0aW9uYWxJdGVtcycgK1xuICAgICAgICAgICAgdGhpcy50b1NjaGVtYVBvaW50ZXIocG9pbnRlckFycmF5LCBzY2hlbWEuYWRkaXRpb25hbEl0ZW1zKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zb2xlLmVycm9yKGB0b1NjaGVtYVBvaW50ZXIgZXJyb3I6IERhdGEgcG9pbnRlciAke2RhdGFQb2ludGVyfSBgICtcbiAgICAgICAgYG5vdCBjb21wYXRpYmxlIHdpdGggc2NoZW1hICR7c2NoZW1hfWApXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNKc29uUG9pbnRlcihkYXRhUG9pbnRlcikpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYHRvU2NoZW1hUG9pbnRlciBlcnJvcjogSW52YWxpZCBKU09OIFBvaW50ZXI6ICR7ZGF0YVBvaW50ZXJ9YClcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBzY2hlbWEgIT09ICdvYmplY3QnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGB0b1NjaGVtYVBvaW50ZXIgZXJyb3I6IEludmFsaWQgSlNPTiBTY2hlbWE6ICR7c2NoZW1hfWApXG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICAvKipcbiAgICogJ3RvRGF0YVBvaW50ZXInIGZ1bmN0aW9uXG4gICAqXG4gICAqIEFjY2VwdHMgYSBKU09OIFBvaW50ZXIgdG8gYSBzdWItc2NoZW1hIGluc2lkZSBhIEpTT04gc2NoZW1hIGFuZCB0aGUgc2NoZW1hLlxuICAgKlxuICAgKiBJZiBwb3NzaWJsZSwgcmV0dXJucyBhIGdlbmVyaWMgUG9pbnRlciB0byB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZSBpbnNpZGVcbiAgICogdGhlIGRhdGEgb2JqZWN0IGRlc2NyaWJlZCBieSB0aGUgSlNPTiBzY2hlbWEuXG4gICAqXG4gICAqIFJldHVybnMgbnVsbCBpZiB0aGUgc3ViLXNjaGVtYSBpcyBpbiBhbiBhbWJpZ3VvdXMgbG9jYXRpb24gKHN1Y2ggYXNcbiAgICogZGVmaW5pdGlvbnMgb3IgYWRkaXRpb25hbFByb3BlcnRpZXMpIHdoZXJlIHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlXG4gICAqIGxvY2F0aW9uIGNhbm5vdCBiZSBkZXRlcm1pbmVkLlxuICAgKlxuICAgKiBAcGFyYW0gc2NoZW1hUG9pbnRlciAtIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KSB0byBhIEpTT04gc2NoZW1hXG4gICAqIEBwYXJhbSBzY2hlbWEgLSB0aGUgSlNPTiBzY2hlbWFcbiAgICogQHBhcmFtIGVycm9ycyAtIFNob3cgZXJyb3JzP1xuICAgKiBAcmV0dXJuIEpTT04gUG9pbnRlciAoc3RyaW5nKSB0byB0aGUgdmFsdWUgaW4gdGhlIGRhdGEgb2JqZWN0XG4gICAqL1xuICBzdGF0aWMgdG9EYXRhUG9pbnRlcihcbiAgICBzY2hlbWFQb2ludGVyOiBQb2ludGVyLFxuICAgIHNjaGVtYTogYW55LFxuICAgIGVycm9yczogYm9vbGVhbiA9IGZhbHNlXG4gICk6IFBvaW50ZXIge1xuICAgIGlmICh0aGlzLmlzSnNvblBvaW50ZXIoc2NoZW1hUG9pbnRlcikgJiYgdHlwZW9mIHNjaGVtYSA9PT0gJ29iamVjdCcgJiZcbiAgICAgIHRoaXMuaGFzKHNjaGVtYSwgc2NoZW1hUG9pbnRlcilcbiAgICApIHtcbiAgICAgIGNvbnN0IHBvaW50ZXJBcnJheSA9IHRoaXMucGFyc2Uoc2NoZW1hUG9pbnRlcilcbiAgICAgIGlmICghcG9pbnRlckFycmF5Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gJydcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRhdGFQb2ludGVyID0gJydcbiAgICAgIGNvbnN0IGZpcnN0S2V5ID0gcG9pbnRlckFycmF5LnNoaWZ0KClcbiAgICAgIGlmIChmaXJzdEtleSA9PT0gJ3Byb3BlcnRpZXMnIHx8XG4gICAgICAgIChmaXJzdEtleSA9PT0gJ2l0ZW1zJyAmJiBpc0FycmF5KHNjaGVtYS5pdGVtcykpXG4gICAgICApIHtcbiAgICAgICAgY29uc3Qgc2Vjb25kS2V5ID0gcG9pbnRlckFycmF5LnNoaWZ0KClcbiAgICAgICAgY29uc3QgcG9pbnRlclN1ZmZpeCA9IHRoaXMudG9EYXRhUG9pbnRlcihwb2ludGVyQXJyYXksIHNjaGVtYVtmaXJzdEtleV1bc2Vjb25kS2V5XSlcbiAgICAgICAgcmV0dXJuIHBvaW50ZXJTdWZmaXggPT09IG51bGwgPyBudWxsIDogJy8nICsgc2Vjb25kS2V5ICsgcG9pbnRlclN1ZmZpeFxuICAgICAgfSBlbHNlIGlmIChmaXJzdEtleSA9PT0gJ2FkZGl0aW9uYWxJdGVtcycgfHxcbiAgICAgICAgKGZpcnN0S2V5ID09PSAnaXRlbXMnICYmIGlzT2JqZWN0KHNjaGVtYS5pdGVtcykpXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgcG9pbnRlclN1ZmZpeCA9IHRoaXMudG9EYXRhUG9pbnRlcihwb2ludGVyQXJyYXksIHNjaGVtYVtmaXJzdEtleV0pXG4gICAgICAgIHJldHVybiBwb2ludGVyU3VmZml4ID09PSBudWxsID8gbnVsbCA6ICcvLScgKyBwb2ludGVyU3VmZml4XG4gICAgICB9IGVsc2UgaWYgKFsnYWxsT2YnLCAnYW55T2YnLCAnb25lT2YnXS5pbmNsdWRlcyhmaXJzdEtleSkpIHtcbiAgICAgICAgY29uc3Qgc2Vjb25kS2V5ID0gcG9pbnRlckFycmF5LnNoaWZ0KClcbiAgICAgICAgcmV0dXJuIHRoaXMudG9EYXRhUG9pbnRlcihwb2ludGVyQXJyYXksIHNjaGVtYVtmaXJzdEtleV1bc2Vjb25kS2V5XSlcbiAgICAgIH0gZWxzZSBpZiAoZmlyc3RLZXkgPT09ICdub3QnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvRGF0YVBvaW50ZXIocG9pbnRlckFycmF5LCBzY2hlbWFbZmlyc3RLZXldKVxuICAgICAgfSBlbHNlIGlmIChbJ2NvbnRhaW5zJywgJ2RlZmluaXRpb25zJywgJ2RlcGVuZGVuY2llcycsICdhZGRpdGlvbmFsSXRlbXMnLFxuICAgICAgICAnYWRkaXRpb25hbFByb3BlcnRpZXMnLCAncGF0dGVyblByb3BlcnRpZXMnLCAncHJvcGVydHlOYW1lcyddLmluY2x1ZGVzKGZpcnN0S2V5KVxuICAgICAgKSB7XG4gICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGB0b0RhdGFQb2ludGVyIGVycm9yOiBBbWJpZ3VvdXMgbG9jYXRpb25gKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gJydcbiAgICB9XG4gICAgaWYgKGVycm9ycykge1xuICAgICAgaWYgKCF0aGlzLmlzSnNvblBvaW50ZXIoc2NoZW1hUG9pbnRlcikpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgdG9EYXRhUG9pbnRlciBlcnJvcjogSW52YWxpZCBKU09OIFBvaW50ZXI6ICR7c2NoZW1hUG9pbnRlcn1gKVxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBzY2hlbWEgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYHRvRGF0YVBvaW50ZXIgZXJyb3I6IEludmFsaWQgSlNPTiBTY2hlbWE6ICR7c2NoZW1hfWApXG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHNjaGVtYSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgdG9EYXRhUG9pbnRlciBlcnJvcjogUG9pbnRlciAke3NjaGVtYVBvaW50ZXJ9IGludmFsaWQgZm9yIFNjaGVtYTogJHtzY2hlbWF9YClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIC8qKlxuICAgKiAncGFyc2VPYmplY3RQYXRoJyBmdW5jdGlvblxuICAgKlxuICAgKiBQYXJzZXMgYSBKYXZhU2NyaXB0IG9iamVjdCBwYXRoIGludG8gYW4gYXJyYXkgb2Yga2V5cywgd2hpY2hcbiAgICogY2FuIHRoZW4gYmUgcGFzc2VkIHRvIGNvbXBpbGUoKSB0byBjb252ZXJ0IGludG8gYSBzdHJpbmcgSlNPTiBQb2ludGVyLlxuICAgKlxuICAgKiBCYXNlZCBvbiBtaWtlLW1hcmNhY2NpJ3MgZXhjZWxsZW50IG9iamVjdHBhdGggcGFyc2UgZnVuY3Rpb246XG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9taWtlLW1hcmNhY2NpL29iamVjdHBhdGhcbiAgICpcbiAgICogQHBhcmFtIHBhdGggLSBUaGUgb2JqZWN0IHBhdGggdG8gcGFyc2VcbiAgICogQHJldHVybiBUaGUgcmVzdWx0aW5nIGFycmF5IG9mIGtleXNcbiAgICovXG4gIHN0YXRpYyBwYXJzZU9iamVjdFBhdGgocGF0aDogUG9pbnRlcik6IHN0cmluZ1tdIHtcbiAgICBpZiAoaXNBcnJheShwYXRoKSkge1xuICAgICAgcmV0dXJuIHBhdGggYXMgc3RyaW5nW11cbiAgICB9XG4gICAgaWYgKHRoaXMuaXNKc29uUG9pbnRlcihwYXRoKSkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyc2UocGF0aClcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuICAgICAgbGV0IGluZGV4ID0gMFxuICAgICAgY29uc3QgcGFydHM6IHN0cmluZ1tdID0gW11cbiAgICAgIHdoaWxlIChpbmRleCA8IHBhdGgubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IG5leHREb3QgPSBwYXRoLmluZGV4T2YoJy4nLCBpbmRleClcbiAgICAgICAgY29uc3QgbmV4dE9CID0gcGF0aC5pbmRleE9mKCdbJywgaW5kZXgpIC8vIG5leHQgb3BlbiBicmFja2V0XG4gICAgICAgIGlmIChuZXh0RG90ID09PSAtMSAmJiBuZXh0T0IgPT09IC0xKSB7IC8vIGxhc3QgaXRlbVxuICAgICAgICAgIHBhcnRzLnB1c2gocGF0aC5zbGljZShpbmRleCkpXG4gICAgICAgICAgaW5kZXggPSBwYXRoLmxlbmd0aFxuICAgICAgICB9IGVsc2UgaWYgKG5leHREb3QgIT09IC0xICYmIChuZXh0RG90IDwgbmV4dE9CIHx8IG5leHRPQiA9PT0gLTEpKSB7IC8vIGRvdCBub3RhdGlvblxuICAgICAgICAgIHBhcnRzLnB1c2gocGF0aC5zbGljZShpbmRleCwgbmV4dERvdCkpXG4gICAgICAgICAgaW5kZXggPSBuZXh0RG90ICsgMVxuICAgICAgICB9IGVsc2UgeyAvLyBicmFja2V0IG5vdGF0aW9uXG4gICAgICAgICAgaWYgKG5leHRPQiA+IGluZGV4KSB7XG4gICAgICAgICAgICBwYXJ0cy5wdXNoKHBhdGguc2xpY2UoaW5kZXgsIG5leHRPQikpXG4gICAgICAgICAgICBpbmRleCA9IG5leHRPQlxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBxdW90ZSA9IHBhdGguY2hhckF0KG5leHRPQiArIDEpXG4gICAgICAgICAgaWYgKHF1b3RlID09PSAnXCInIHx8IHF1b3RlID09PSAnXFwnJykgeyAvLyBlbmNsb3NpbmcgcXVvdGVzXG4gICAgICAgICAgICBsZXQgbmV4dENCID0gcGF0aC5pbmRleE9mKHF1b3RlICsgJ10nLCBuZXh0T0IpIC8vIG5leHQgY2xvc2UgYnJhY2tldFxuICAgICAgICAgICAgd2hpbGUgKG5leHRDQiAhPT0gLTEgJiYgcGF0aC5jaGFyQXQobmV4dENCIC0gMSkgPT09ICdcXFxcJykge1xuICAgICAgICAgICAgICBuZXh0Q0IgPSBwYXRoLmluZGV4T2YocXVvdGUgKyAnXScsIG5leHRDQiArIDIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV4dENCID09PSAtMSkge1xuICAgICAgICAgICAgICBuZXh0Q0IgPSBwYXRoLmxlbmd0aFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFydHMucHVzaChwYXRoLnNsaWNlKGluZGV4ICsgMiwgbmV4dENCKVxuICAgICAgICAgICAgICAucmVwbGFjZShuZXcgUmVnRXhwKCdcXFxcJyArIHF1b3RlLCAnZycpLCBxdW90ZSkpXG4gICAgICAgICAgICBpbmRleCA9IG5leHRDQiArIDJcbiAgICAgICAgICB9IGVsc2UgeyAvLyBubyBlbmNsb3NpbmcgcXVvdGVzXG4gICAgICAgICAgICBsZXQgbmV4dENCID0gcGF0aC5pbmRleE9mKCddJywgbmV4dE9CKSAvLyBuZXh0IGNsb3NlIGJyYWNrZXRcbiAgICAgICAgICAgIGlmIChuZXh0Q0IgPT09IC0xKSB7XG4gICAgICAgICAgICAgIG5leHRDQiA9IHBhdGgubGVuZ3RoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJ0cy5wdXNoKHBhdGguc2xpY2UoaW5kZXggKyAxLCBuZXh0Q0IpKVxuICAgICAgICAgICAgaW5kZXggPSBuZXh0Q0IgKyAxXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwYXRoLmNoYXJBdChpbmRleCkgPT09ICcuJykge1xuICAgICAgICAgICAgaW5kZXgrK1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHBhcnRzXG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoJ3BhcnNlT2JqZWN0UGF0aCBlcnJvcjogSW5wdXQgb2JqZWN0IHBhdGggbXVzdCBiZSBhIHN0cmluZy4nKVxuICB9XG59XG4iXX0=