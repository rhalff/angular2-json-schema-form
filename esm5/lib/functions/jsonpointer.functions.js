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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbnBvaW50ZXIuZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdzZi1jb21tb24vIiwic291cmNlcyI6WyJsaWIvZnVuY3Rpb25zL2pzb25wb2ludGVyLmZ1bmN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFBO0FBRXhDLE9BQU8sRUFDTCxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQ2pFLE1BQU0sYUFBYSxDQUFBO0FBQ3BCLE9BQU8sRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLE1BQU0sV0FBVyxDQUFBO0FBcUJ0QztJQUFBO0lBMCtCQSxDQUFDO0lBMzlCUSxlQUFHLEdBQVYsVUFDRSxNQUFNLEVBQ04sT0FBZ0IsRUFDaEIsVUFBc0IsRUFDdEIsUUFBdUIsRUFDdkIsVUFBMkIsRUFDM0IsTUFBdUI7O1FBSHZCLDJCQUFBLEVBQUEsY0FBc0I7UUFDdEIseUJBQUEsRUFBQSxlQUF1QjtRQUN2QiwyQkFBQSxFQUFBLGtCQUEyQjtRQUMzQix1QkFBQSxFQUFBLGNBQXVCO1FBRXZCLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtZQUNuQixPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUE7U0FDdEM7UUFDRCxJQUFJLFFBQVEsR0FBVSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUNqRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQ25ELElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQTtZQUN0QixJQUFJLFVBQVUsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLFFBQVEsSUFB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QkFDUjtpQkFDRjthQUNGO1lBQ0QsT0FBTyxLQUFLLENBQUE7U0FDYjtRQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsNERBQTRELENBQUMsQ0FBQTtJQUM3RSxDQUFDO0lBeitCVSxXQUFXO1FBRHZCLFVBQVUsRUFBRTtPQUNBLFdBQVcsQ0EwK0J2QjtJQUFELGtCQUFDO0NBQUEsQUExK0JELElBMCtCQztTQTErQlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcblxuaW1wb3J0IHtcbiAgaXNEZWZpbmVkLCBpc0VtcHR5LCBpc09iamVjdCwgaXNBcnJheSwgaXNNYXAsIGlzTnVtYmVyLCBpc1N0cmluZ1xufSBmcm9tICcuL3ZhbGlkYXRvcidcbmltcG9ydCB7aGFzT3duLCBjb3B5fSBmcm9tICcuL3V0aWxpdHknXG5pbXBvcnQge0Zvcm1Hcm91cH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXG5cbi8qKlxuICogJ0pzb25Qb2ludGVyJyBjbGFzc1xuICpcbiAqIFNvbWUgdXRpbGl0aWVzIGZvciB1c2luZyBKU09OIFBvaW50ZXJzIHdpdGggSlNPTiBvYmplY3RzXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjkwMVxuICpcbiAqIGdldCwgZ2V0Q29weSwgZ2V0Rmlyc3QsIHNldCwgc2V0Q29weSwgaW5zZXJ0LCBpbnNlcnRDb3B5LCByZW1vdmUsIGhhcywgZGljdCxcbiAqIGZvckVhY2hEZWVwLCBmb3JFYWNoRGVlcENvcHksIGVzY2FwZSwgdW5lc2NhcGUsIHBhcnNlLCBjb21waWxlLCB0b0tleSxcbiAqIGlzSnNvblBvaW50ZXIsIGlzU3ViUG9pbnRlciwgdG9JbmRleGVkUG9pbnRlciwgdG9HZW5lcmljUG9pbnRlcixcbiAqIHRvQ29udHJvbFBvaW50ZXIsIHRvU2NoZW1hUG9pbnRlciwgdG9EYXRhUG9pbnRlciwgcGFyc2VPYmplY3RQYXRoXG4gKlxuICogU29tZSBmdW5jdGlvbnMgYmFzZWQgb24gbWFudWVsc3RvZmVyJ3MganNvbi1wb2ludGVyIHV0aWxpdGllc1xuICogaHR0cHM6Ly9naXRodWIuY29tL21hbnVlbHN0b2Zlci9qc29uLXBvaW50ZXJcbiAqL1xuZXhwb3J0IHR5cGUgUG9pbnRlciA9IHN0cmluZyB8IHN0cmluZ1tdXG5cbi8vIEBkeW5hbWljXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSnNvblBvaW50ZXIge1xuXG4gIC8qKlxuICAgKiAnZ2V0JyBmdW5jdGlvblxuICAgKlxuICAgKiBVc2VzIGEgSlNPTiBQb2ludGVyIHRvIHJldHJpZXZlIGEgdmFsdWUgZnJvbSBhbiBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgLSBPYmplY3QgdG8gZ2V0IHZhbHVlIGZyb21cbiAgICogQHBhcmFtIHBvaW50ZXIgLSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSlcbiAgICogQHBhcmFtIHN0YXJ0U2xpY2UgLSBaZXJvLWJhc2VkIGluZGV4IG9mIGZpcnN0IFBvaW50ZXIga2V5IHRvIHVzZVxuICAgKiBAcGFyYW0gZW5kU2xpY2UgLSBaZXJvLWJhc2VkIGluZGV4IG9mIGxhc3QgUG9pbnRlciBrZXkgdG8gdXNlXG4gICAqIEBwYXJhbSBnZXRCb29sZWFuIC0gUmV0dXJuIG9ubHkgdHJ1ZSBvciBmYWxzZT9cbiAgICogQHBhcmFtIGVycm9ycyAtIFNob3cgZXJyb3IgaWYgbm90IGZvdW5kP1xuICAgKiBAcmV0dXJuIExvY2F0ZWQgdmFsdWUgKG9yIHRydWUgb3IgZmFsc2UgaWYgZ2V0Qm9vbGVhbiA9IHRydWUpXG4gICAqL1xuICBzdGF0aWMgZ2V0KFxuICAgIG9iamVjdCxcbiAgICBwb2ludGVyOiBQb2ludGVyLFxuICAgIHN0YXJ0U2xpY2U6IG51bWJlciA9IDAsXG4gICAgZW5kU2xpY2U6IG51bWJlciA9IG51bGwsXG4gICAgZ2V0Qm9vbGVhbjogYm9vbGVhbiA9IGZhbHNlLFxuICAgIGVycm9yczogYm9vbGVhbiA9IGZhbHNlXG4gICkge1xuICAgIGlmIChvYmplY3QgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBnZXRCb29sZWFuID8gZmFsc2UgOiB1bmRlZmluZWRcbiAgICB9XG4gICAgbGV0IGtleUFycmF5OiBhbnlbXSA9IHRoaXMucGFyc2UocG9pbnRlciwgZXJyb3JzKVxuICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBrZXlBcnJheSAhPT0gbnVsbCkge1xuICAgICAgbGV0IHN1Yk9iamVjdCA9IG9iamVjdFxuICAgICAgaWYgKHN0YXJ0U2xpY2UgPj0ga2V5QXJyYXkubGVuZ3RoIHx8IGVuZFNsaWNlIDw9IC1rZXlBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdFxuICAgICAgfVxuICAgICAgaWYgKHN0YXJ0U2xpY2UgPD0gLWtleUFycmF5Lmxlbmd0aCkge1xuICAgICAgICBzdGFydFNsaWNlID0gMFxuICAgICAgfVxuICAgICAgaWYgKCFpc0RlZmluZWQoZW5kU2xpY2UpIHx8IGVuZFNsaWNlID49IGtleUFycmF5Lmxlbmd0aCkge1xuICAgICAgICBlbmRTbGljZSA9IGtleUFycmF5Lmxlbmd0aFxuICAgICAgfVxuICAgICAga2V5QXJyYXkgPSBrZXlBcnJheS5zbGljZShzdGFydFNsaWNlLCBlbmRTbGljZSlcbiAgICAgIGZvciAobGV0IGtleSBvZiBrZXlBcnJheSkge1xuICAgICAgICBpZiAoa2V5ID09PSAnLScgJiYgaXNBcnJheShzdWJPYmplY3QpICYmIHN1Yk9iamVjdC5sZW5ndGgpIHtcbiAgICAgICAgICBrZXkgPSBzdWJPYmplY3QubGVuZ3RoIC0gMVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc01hcChzdWJPYmplY3QpICYmIHN1Yk9iamVjdC5oYXMoa2V5KSkge1xuICAgICAgICAgIHN1Yk9iamVjdCA9IHN1Yk9iamVjdC5nZXQoa2V5KVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzdWJPYmplY3QgPT09ICdvYmplY3QnICYmIHN1Yk9iamVjdCAhPT0gbnVsbCAmJlxuICAgICAgICAgIGhhc093bihzdWJPYmplY3QsIGtleSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgc3ViT2JqZWN0ID0gc3ViT2JqZWN0W2tleV1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBnZXQgZXJyb3I6IFwiJHtrZXl9XCIga2V5IG5vdCBmb3VuZCBpbiBvYmplY3QuYClcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IocG9pbnRlcilcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3Iob2JqZWN0KVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZ2V0Qm9vbGVhbiA/IGZhbHNlIDogdW5kZWZpbmVkXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBnZXRCb29sZWFuID8gdHJ1ZSA6IHN1Yk9iamVjdFxuICAgIH1cbiAgICBpZiAoZXJyb3JzICYmIGtleUFycmF5ID09PSBudWxsKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBnZXQgZXJyb3I6IEludmFsaWQgSlNPTiBQb2ludGVyOiAke3BvaW50ZXJ9YClcbiAgICB9XG4gICAgaWYgKGVycm9ycyAmJiB0eXBlb2Ygb2JqZWN0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgY29uc29sZS5lcnJvcignZ2V0IGVycm9yOiBJbnZhbGlkIG9iamVjdDonKVxuICAgICAgY29uc29sZS5lcnJvcihvYmplY3QpXG4gICAgfVxuICAgIHJldHVybiBnZXRCb29sZWFuID8gZmFsc2UgOiB1bmRlZmluZWRcbiAgfVxuXG4gIC8qKlxuICAgKiAnZ2V0Q29weScgZnVuY3Rpb25cbiAgICpcbiAgICogVXNlcyBhIEpTT04gUG9pbnRlciB0byBkZWVwbHkgY2xvbmUgYSB2YWx1ZSBmcm9tIGFuIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCAtIE9iamVjdCB0byBnZXQgdmFsdWUgZnJvbVxuICAgKiBAcGFyYW0gcG9pbnRlciAtIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICAgKiBAcGFyYW0gc3RhcnRTbGljZSAtIFplcm8tYmFzZWQgaW5kZXggb2YgZmlyc3QgUG9pbnRlciBrZXkgdG8gdXNlXG4gICAqIEBwYXJhbSBlbmRTbGljZSAtIFplcm8tYmFzZWQgaW5kZXggb2YgbGFzdCBQb2ludGVyIGtleSB0byB1c2VcbiAgICogQHBhcmFtIGdldEJvb2xlYW4gLSBSZXR1cm4gb25seSB0cnVlIG9yIGZhbHNlP1xuICAgKiBAcGFyYW0gZXJyb3JzIC0gU2hvdyBlcnJvciBpZiBub3QgZm91bmQ/XG4gICAqIEByZXR1cm4gTG9jYXRlZCB2YWx1ZSAob3IgdHJ1ZSBvciBmYWxzZSBpZiBnZXRCb29sZWFuID0gdHJ1ZSlcbiAgICovXG4gIHN0YXRpYyBnZXRDb3B5KFxuICAgIG9iamVjdCxcbiAgICBwb2ludGVyOiBQb2ludGVyLFxuICAgIHN0YXJ0U2xpY2U6IG51bWJlciA9IDAsXG4gICAgZW5kU2xpY2U6IG51bWJlciA9IG51bGwsXG4gICAgZ2V0Qm9vbGVhbjogYm9vbGVhbiA9IGZhbHNlLFxuICAgIGVycm9yczogYm9vbGVhbiA9IGZhbHNlXG4gICkge1xuICAgIGNvbnN0IG9iamVjdFRvQ29weSA9XG4gICAgICB0aGlzLmdldChvYmplY3QsIHBvaW50ZXIsIHN0YXJ0U2xpY2UsIGVuZFNsaWNlLCBnZXRCb29sZWFuLCBlcnJvcnMpXG4gICAgcmV0dXJuIHRoaXMuZm9yRWFjaERlZXBDb3B5KG9iamVjdFRvQ29weSlcbiAgfVxuXG4gIC8qKlxuICAgKiAnZ2V0Rmlyc3QnIGZ1bmN0aW9uXG4gICAqXG4gICAqIFRha2VzIGFuIGFycmF5IG9mIEpTT04gUG9pbnRlcnMgYW5kIG9iamVjdHMsXG4gICAqIGNoZWNrcyBlYWNoIG9iamVjdCBmb3IgYSB2YWx1ZSBzcGVjaWZpZWQgYnkgdGhlIHBvaW50ZXIsXG4gICAqIGFuZCByZXR1cm5zIHRoZSBmaXJzdCB2YWx1ZSBmb3VuZC5cbiAgICpcbiAgICogQHBhcmFtIGl0ZW1zIC0gQXJyYXkgb2Ygb2JqZWN0cyBhbmQgcG9pbnRlcnMgdG8gY2hlY2tcbiAgICogQHBhcmFtIGRlZmF1bHRWYWx1ZSAtIFZhbHVlIHRvIHJldHVybiBpZiBub3RoaW5nIGZvdW5kXG4gICAqIEBwYXJhbSBnZXRDb3B5IC0gUmV0dXJuIGEgY29weSBpbnN0ZWFkP1xuICAgKiBAcmV0dXJuIEZpcnN0IHZhbHVlIGZvdW5kXG4gICAqL1xuICBzdGF0aWMgZ2V0Rmlyc3QoXG4gICAgaXRlbXM6IEFycmF5PG9iamVjdCB8IFBvaW50ZXI+LFxuICAgIGRlZmF1bHRWYWx1ZTogYW55ID0gbnVsbCxcbiAgICBnZXRDb3B5ID0gZmFsc2VcbiAgKSB7XG4gICAgaWYgKGlzRW1wdHkoaXRlbXMpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKGlzQXJyYXkoaXRlbXMpKSB7XG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgaWYgKGlzRW1wdHkoaXRlbSkpIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FycmF5KGl0ZW0pICYmIChpdGVtIGFzIHN0cmluZ1tdKS5sZW5ndGggPj0gMikge1xuICAgICAgICAgIGlmIChpc0VtcHR5KGl0ZW1bMF0pIHx8IGlzRW1wdHkoaXRlbVsxXSkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0Q29weSA/XG4gICAgICAgICAgICB0aGlzLmdldENvcHkoaXRlbVswXSwgaXRlbVsxXSkgOlxuICAgICAgICAgICAgdGhpcy5nZXQoaXRlbVswXSwgaXRlbVsxXSlcbiAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2dldEZpcnN0IGVycm9yOiBJbnB1dCBub3QgaW4gY29ycmVjdCBmb3JtYXQuXFxuJyArXG4gICAgICAgICAgJ1Nob3VsZCBiZTogWyBbIG9iamVjdDEsIHBvaW50ZXIxIF0sIFsgb2JqZWN0IDIsIHBvaW50ZXIyIF0sIGV0Yy4uLiBdJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICByZXR1cm4gZGVmYXVsdFZhbHVlXG4gICAgfVxuICAgIGlmIChpc01hcChpdGVtcykpIHtcbiAgICAgIGZvciAoY29uc3QgW29iamVjdCwgcG9pbnRlcl0gb2YgKGl0ZW1zIGFzIGFueSkpIHtcbiAgICAgICAgaWYgKG9iamVjdCA9PT0gbnVsbCB8fCAhdGhpcy5pc0pzb25Qb2ludGVyKHBvaW50ZXIpKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWx1ZSA9IGdldENvcHkgP1xuICAgICAgICAgIHRoaXMuZ2V0Q29weShvYmplY3QsIHBvaW50ZXIpIDpcbiAgICAgICAgICB0aGlzLmdldChvYmplY3QsIHBvaW50ZXIpXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZGVmYXVsdFZhbHVlXG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoJ2dldEZpcnN0IGVycm9yOiBJbnB1dCBub3QgaW4gY29ycmVjdCBmb3JtYXQuXFxuJyArXG4gICAgICAnU2hvdWxkIGJlOiBbIFsgb2JqZWN0MSwgcG9pbnRlcjEgXSwgWyBvYmplY3QgMiwgcG9pbnRlcjIgXSwgZXRjLi4uIF0nKVxuICAgIHJldHVybiBkZWZhdWx0VmFsdWVcbiAgfVxuXG4gIC8qKlxuICAgKiAnZ2V0Rmlyc3RDb3B5JyBmdW5jdGlvblxuICAgKlxuICAgKiBTaW1pbGFyIHRvIGdldEZpcnN0LCBidXQgYWx3YXlzIHJldHVybnMgYSBjb3B5LlxuICAgKlxuICAgKiBAcGFyYW0gaXRlbXMgLSBBcnJheSBvZiBvYmplY3RzIGFuZCBwb2ludGVycyB0byBjaGVja1xuICAgKiBAcGFyYW0gZGVmYXVsdFZhbHVlIC0gVmFsdWUgdG8gcmV0dXJuIGlmIG5vdGhpbmcgZm91bmRcbiAgICogQHJldHVybiBDb3B5IG9mIGZpcnN0IHZhbHVlIGZvdW5kXG4gICAqL1xuICBzdGF0aWMgZ2V0Rmlyc3RDb3B5KFxuICAgIGl0ZW1zOiBBcnJheTxvYmplY3QgfCBQb2ludGVyPixcbiAgICBkZWZhdWx0VmFsdWU6IGFueSA9IG51bGxcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Rmlyc3QoaXRlbXMsIGRlZmF1bHRWYWx1ZSwgdHJ1ZSlcbiAgfVxuXG4gIC8qKlxuICAgKiAnc2V0JyBmdW5jdGlvblxuICAgKlxuICAgKiBVc2VzIGEgSlNPTiBQb2ludGVyIHRvIHNldCBhIHZhbHVlIG9uIGFuIG9iamVjdC5cbiAgICogQWxzbyBjcmVhdGVzIGFueSBtaXNzaW5nIHN1YiBvYmplY3RzIG9yIGFycmF5cyB0byBjb250YWluIHRoYXQgdmFsdWUuXG4gICAqXG4gICAqIElmIHRoZSBvcHRpb25hbCBmb3VydGggcGFyYW1ldGVyIGlzIFRSVUUgYW5kIHRoZSBpbm5lci1tb3N0IGNvbnRhaW5lclxuICAgKiBpcyBhbiBhcnJheSwgdGhlIGZ1bmN0aW9uIHdpbGwgaW5zZXJ0IHRoZSB2YWx1ZSBhcyBhIG5ldyBpdGVtIGF0IHRoZVxuICAgKiBzcGVjaWZpZWQgbG9jYXRpb24gaW4gdGhlIGFycmF5LCByYXRoZXIgdGhhbiBvdmVyd3JpdGluZyB0aGUgZXhpc3RpbmdcbiAgICogdmFsdWUgKGlmIGFueSkgYXQgdGhhdCBsb2NhdGlvbi5cbiAgICpcbiAgICogU28gc2V0KFsxLCAyLCAzXSwgJy8xJywgNCkgPT4gWzEsIDQsIDNdXG4gICAqIGFuZFxuICAgKiBTbyBzZXQoWzEsIDIsIDNdLCAnLzEnLCA0LCB0cnVlKSA9PiBbMSwgNCwgMiwgM11cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCAtIFRoZSBvYmplY3QgdG8gc2V0IHZhbHVlIGluXG4gICAqIEBwYXJhbSBwb2ludGVyIC0gVGhlIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgbmV3IHZhbHVlIHRvIHNldFxuICAgKiBAcGFyYW0gaW5zZXJ0IC0gaW5zZXJ0IHZhbHVlP1xuICAgKiBAcmV0dXJuIFRoZSBvcmlnaW5hbCBvYmplY3QsIG1vZGlmaWVkIHdpdGggdGhlIHNldCB2YWx1ZVxuICAgKi9cbiAgc3RhdGljIHNldChcbiAgICBvYmplY3Q6IG9iamVjdCxcbiAgICBwb2ludGVyOiBQb2ludGVyLFxuICAgIHZhbHVlOiBhbnksXG4gICAgaW5zZXJ0ID0gZmFsc2VcbiAgKSB7XG4gICAgY29uc3Qga2V5QXJyYXkgPSB0aGlzLnBhcnNlKHBvaW50ZXIpXG4gICAgaWYgKGtleUFycmF5ICE9PSBudWxsICYmIGtleUFycmF5Lmxlbmd0aCkge1xuICAgICAgbGV0IHN1Yk9iamVjdDogYW55ID0gb2JqZWN0XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleUFycmF5Lmxlbmd0aCAtIDE7ICsraSkge1xuICAgICAgICBsZXQga2V5ID0ga2V5QXJyYXlbaV1cbiAgICAgICAgaWYgKGtleSA9PT0gJy0nICYmIGlzQXJyYXkoc3ViT2JqZWN0KSkge1xuICAgICAgICAgIGtleSA9IHN1Yk9iamVjdC5sZW5ndGhcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNNYXAoc3ViT2JqZWN0KSAmJiBzdWJPYmplY3QuaGFzKGtleSkpIHtcbiAgICAgICAgICBzdWJPYmplY3QgPSBzdWJPYmplY3QuZ2V0KGtleSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIWhhc093bihzdWJPYmplY3QsIGtleSkpIHtcbiAgICAgICAgICAgIHN1Yk9iamVjdFtrZXldID0gKGtleUFycmF5W2kgKyAxXS5tYXRjaCgvXihcXGQrfC0pJC8pKSA/IFtdIDoge31cbiAgICAgICAgICB9XG4gICAgICAgICAgc3ViT2JqZWN0ID0gc3ViT2JqZWN0W2tleV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgbGFzdEtleSA9IGtleUFycmF5W2tleUFycmF5Lmxlbmd0aCAtIDFdXG4gICAgICBpZiAoaXNBcnJheShzdWJPYmplY3QpICYmIGxhc3RLZXkgPT09ICctJykge1xuICAgICAgICBzdWJPYmplY3QucHVzaCh2YWx1ZSlcbiAgICAgIH0gZWxzZSBpZiAoaW5zZXJ0ICYmIGlzQXJyYXkoc3ViT2JqZWN0KSAmJiAhaXNOYU4oK2xhc3RLZXkpKSB7XG4gICAgICAgIHN1Yk9iamVjdC5zcGxpY2UobGFzdEtleSwgMCwgdmFsdWUpXG4gICAgICB9IGVsc2UgaWYgKGlzTWFwKHN1Yk9iamVjdCkpIHtcbiAgICAgICAgc3ViT2JqZWN0LnNldChsYXN0S2V5LCB2YWx1ZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN1Yk9iamVjdFtsYXN0S2V5XSA9IHZhbHVlXG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqZWN0XG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoYHNldCBlcnJvcjogSW52YWxpZCBKU09OIFBvaW50ZXI6ICR7cG9pbnRlcn1gKVxuICAgIHJldHVybiBvYmplY3RcbiAgfVxuXG4gIC8qKlxuICAgKiAnc2V0Q29weScgZnVuY3Rpb25cbiAgICpcbiAgICogQ29waWVzIGFuIG9iamVjdCBhbmQgdXNlcyBhIEpTT04gUG9pbnRlciB0byBzZXQgYSB2YWx1ZSBvbiB0aGUgY29weS5cbiAgICogQWxzbyBjcmVhdGVzIGFueSBtaXNzaW5nIHN1YiBvYmplY3RzIG9yIGFycmF5cyB0byBjb250YWluIHRoYXQgdmFsdWUuXG4gICAqXG4gICAqIElmIHRoZSBvcHRpb25hbCBmb3VydGggcGFyYW1ldGVyIGlzIFRSVUUgYW5kIHRoZSBpbm5lci1tb3N0IGNvbnRhaW5lclxuICAgKiBpcyBhbiBhcnJheSwgdGhlIGZ1bmN0aW9uIHdpbGwgaW5zZXJ0IHRoZSB2YWx1ZSBhcyBhIG5ldyBpdGVtIGF0IHRoZVxuICAgKiBzcGVjaWZpZWQgbG9jYXRpb24gaW4gdGhlIGFycmF5LCByYXRoZXIgdGhhbiBvdmVyd3JpdGluZyB0aGUgZXhpc3RpbmcgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgLSBUaGUgb2JqZWN0IHRvIGNvcHkgYW5kIHNldCB2YWx1ZSBpblxuICAgKiBAcGFyYW0gcG9pbnRlciAtIFRoZSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSlcbiAgICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIHNldFxuICAgKiBAcGFyYW0gaW5zZXJ0IC0gaW5zZXJ0IHZhbHVlP1xuICAgKiBAcmV0dXJuIFRoZSBuZXcgb2JqZWN0IHdpdGggdGhlIHNldCB2YWx1ZVxuICAgKi9cbiAgc3RhdGljIHNldENvcHkoXG4gICAgb2JqZWN0OiBvYmplY3QsXG4gICAgcG9pbnRlcjogUG9pbnRlcixcbiAgICB2YWx1ZTogYW55LFxuICAgIGluc2VydCA9IGZhbHNlXG4gICkge1xuICAgIGNvbnN0IGtleUFycmF5ID0gdGhpcy5wYXJzZShwb2ludGVyKVxuICAgIGlmIChrZXlBcnJheSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgbmV3T2JqZWN0ID0gY29weShvYmplY3QpXG4gICAgICBsZXQgc3ViT2JqZWN0ID0gbmV3T2JqZWN0XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleUFycmF5Lmxlbmd0aCAtIDE7ICsraSkge1xuICAgICAgICBsZXQga2V5ID0ga2V5QXJyYXlbaV1cbiAgICAgICAgaWYgKGtleSA9PT0gJy0nICYmIGlzQXJyYXkoc3ViT2JqZWN0KSkge1xuICAgICAgICAgIGtleSA9IHN1Yk9iamVjdC5sZW5ndGhcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNNYXAoc3ViT2JqZWN0KSAmJiBzdWJPYmplY3QuaGFzKGtleSkpIHtcbiAgICAgICAgICBzdWJPYmplY3Quc2V0KGtleSwgY29weShzdWJPYmplY3QuZ2V0KGtleSkpKVxuICAgICAgICAgIHN1Yk9iamVjdCA9IHN1Yk9iamVjdC5nZXQoa2V5KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICghaGFzT3duKHN1Yk9iamVjdCwga2V5KSkge1xuICAgICAgICAgICAgc3ViT2JqZWN0W2tleV0gPSAoa2V5QXJyYXlbaSArIDFdLm1hdGNoKC9eKFxcZCt8LSkkLykpID8gW10gOiB7fVxuICAgICAgICAgIH1cbiAgICAgICAgICBzdWJPYmplY3Rba2V5XSA9IGNvcHkoc3ViT2JqZWN0W2tleV0pXG4gICAgICAgICAgc3ViT2JqZWN0ID0gc3ViT2JqZWN0W2tleV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgbGFzdEtleSA9IGtleUFycmF5W2tleUFycmF5Lmxlbmd0aCAtIDFdXG4gICAgICBpZiAoaXNBcnJheShzdWJPYmplY3QpICYmIGxhc3RLZXkgPT09ICctJykge1xuICAgICAgICBzdWJPYmplY3QucHVzaCh2YWx1ZSlcbiAgICAgIH0gZWxzZSBpZiAoaW5zZXJ0ICYmIGlzQXJyYXkoc3ViT2JqZWN0KSAmJiAhaXNOYU4oK2xhc3RLZXkpKSB7XG4gICAgICAgIHN1Yk9iamVjdC5zcGxpY2UobGFzdEtleSwgMCwgdmFsdWUpXG4gICAgICB9IGVsc2UgaWYgKGlzTWFwKHN1Yk9iamVjdCkpIHtcbiAgICAgICAgc3ViT2JqZWN0LnNldChsYXN0S2V5LCB2YWx1ZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN1Yk9iamVjdFtsYXN0S2V5XSA9IHZhbHVlXG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3T2JqZWN0XG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoYHNldENvcHkgZXJyb3I6IEludmFsaWQgSlNPTiBQb2ludGVyOiAke3BvaW50ZXJ9YClcbiAgICByZXR1cm4gb2JqZWN0XG4gIH1cblxuICAvKipcbiAgICogJ2luc2VydCcgZnVuY3Rpb25cbiAgICpcbiAgICogQ2FsbHMgJ3NldCcgd2l0aCBpbnNlcnQgPSBUUlVFXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgLSBvYmplY3QgdG8gaW5zZXJ0IHZhbHVlIGluXG4gICAqIEBwYXJhbSBwb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gICAqIEBwYXJhbSB2YWx1ZSAtIHZhbHVlIHRvIGluc2VydFxuICAgKi9cbiAgc3RhdGljIGluc2VydChcbiAgICBvYmplY3Q6IG9iamVjdCxcbiAgICBwb2ludGVyOiBQb2ludGVyLFxuICAgIHZhbHVlOiBhbnlcbiAgKSB7XG4gICAgY29uc3QgdXBkYXRlZE9iamVjdCA9IHRoaXMuc2V0KG9iamVjdCwgcG9pbnRlciwgdmFsdWUsIHRydWUpXG4gICAgcmV0dXJuIHVwZGF0ZWRPYmplY3RcbiAgfVxuXG4gIC8qKlxuICAgKiAnaW5zZXJ0Q29weScgZnVuY3Rpb25cbiAgICpcbiAgICogQ2FsbHMgJ3NldENvcHknIHdpdGggaW5zZXJ0ID0gVFJVRVxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IC0gb2JqZWN0IHRvIGluc2VydCB2YWx1ZSBpblxuICAgKiBAcGFyYW0gcG9pbnRlciAtIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICAgKiBAcGFyYW0gdmFsdWUgLSB2YWx1ZSB0byBpbnNlcnRcbiAgICovXG4gIHN0YXRpYyBpbnNlcnRDb3B5KFxuICAgIG9iamVjdDogb2JqZWN0LFxuICAgIHBvaW50ZXI6IFBvaW50ZXIsXG4gICAgdmFsdWU6IGFueVxuICApIHtcbiAgICBjb25zdCB1cGRhdGVkT2JqZWN0ID0gdGhpcy5zZXRDb3B5KG9iamVjdCwgcG9pbnRlciwgdmFsdWUsIHRydWUpXG4gICAgcmV0dXJuIHVwZGF0ZWRPYmplY3RcbiAgfVxuXG4gIC8qKlxuICAgKiAncmVtb3ZlJyBmdW5jdGlvblxuICAgKlxuICAgKiBVc2VzIGEgSlNPTiBQb2ludGVyIHRvIHJlbW92ZSBhIGtleSBhbmQgaXRzIGF0dHJpYnV0ZSBmcm9tIGFuIG9iamVjdFxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IC0gb2JqZWN0IHRvIGRlbGV0ZSBhdHRyaWJ1dGUgZnJvbVxuICAgKiBAcGFyYW0gcG9pbnRlciAtIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICAgKi9cbiAgc3RhdGljIHJlbW92ZShcbiAgICBvYmplY3Q6IG9iamVjdCxcbiAgICBwb2ludGVyOiBQb2ludGVyXG4gICkge1xuICAgIGNvbnN0IGtleUFycmF5ID0gdGhpcy5wYXJzZShwb2ludGVyKVxuICAgIGlmIChrZXlBcnJheSAhPT0gbnVsbCAmJiBrZXlBcnJheS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGxhc3RLZXkgPSBrZXlBcnJheS5wb3AoKVxuICAgICAgY29uc3QgcGFyZW50T2JqZWN0ID0gdGhpcy5nZXQob2JqZWN0LCBrZXlBcnJheSlcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhcmVudE9iamVjdCkpIHtcbiAgICAgICAgY29uc3QgbGFzdEluZGV4ID0gKGxhc3RLZXkgPT09ICctJykgPyBwYXJlbnRPYmplY3QubGVuZ3RoIC0gMSA6IHBhcnNlSW50KGxhc3RLZXksIDEwKVxuXG4gICAgICAgIHBhcmVudE9iamVjdC5zcGxpY2UobGFzdEluZGV4LCAxKVxuICAgICAgfSBlbHNlIGlmIChpc09iamVjdChwYXJlbnRPYmplY3QpKSB7XG4gICAgICAgIGRlbGV0ZSBwYXJlbnRPYmplY3RbbGFzdEtleV1cbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmplY3RcbiAgICB9XG4gICAgY29uc29sZS5lcnJvcihgcmVtb3ZlIGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlcjogJHtwb2ludGVyfWApXG4gICAgcmV0dXJuIG9iamVjdFxuICB9XG5cbiAgLyoqXG4gICAqICdoYXMnIGZ1bmN0aW9uXG4gICAqXG4gICAqIFRlc3RzIGlmIGFuIG9iamVjdCBoYXMgYSB2YWx1ZSBhdCB0aGUgbG9jYXRpb24gc3BlY2lmaWVkIGJ5IGEgSlNPTiBQb2ludGVyXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgLSBvYmplY3QgdG8gY2hlayBmb3IgdmFsdWVcbiAgICogQHBhcmFtIHBvaW50ZXIgLSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSlcbiAgICovXG4gIHN0YXRpYyBoYXMoXG4gICAgb2JqZWN0OiBvYmplY3QsXG4gICAgcG9pbnRlcjogUG9pbnRlclxuICApOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5nZXQob2JqZWN0LCBwb2ludGVyLCAwLCBudWxsLCB0cnVlKVxuICB9XG5cbiAgLyoqXG4gICAqICdkaWN0JyBmdW5jdGlvblxuICAgKlxuICAgKiBSZXR1cm5zIGEgKHBvaW50ZXIgLT4gdmFsdWUpIGRpY3Rpb25hcnkgZm9yIGFuIG9iamVjdFxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IC0gVGhlIG9iamVjdCB0byBjcmVhdGUgYSBkaWN0aW9uYXJ5IGZyb21cbiAgICogQHJldHVybiBUaGUgcmVzdWx0aW5nIGRpY3Rpb25hcnkgb2JqZWN0XG4gICAqL1xuICBzdGF0aWMgZGljdChvYmplY3Q6IG9iamVjdCkge1xuICAgIGNvbnN0IHJlc3VsdHM6IGFueSA9IHt9XG4gICAgdGhpcy5mb3JFYWNoRGVlcChvYmplY3QsICh2YWx1ZSwgcG9pbnRlcikgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmVzdWx0c1twb2ludGVyXSA9IHZhbHVlXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gcmVzdWx0c1xuICB9XG5cbiAgLyoqXG4gICAqICdmb3JFYWNoRGVlcCcgZnVuY3Rpb25cbiAgICpcbiAgICogSXRlcmF0ZXMgb3ZlciBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIGFuIG9iamVjdCBvciBpdGVtcyBpbiBhbiBhcnJheVxuICAgKiBhbmQgaW52b2tlcyBhbiBpdGVyYXRlZSBmdW5jdGlvbiBmb3IgZWFjaCBrZXkvdmFsdWUgb3IgaW5kZXgvdmFsdWUgcGFpci5cbiAgICogQnkgZGVmYXVsdCwgaXRlcmF0ZXMgb3ZlciBpdGVtcyB3aXRoaW4gb2JqZWN0cyBhbmQgYXJyYXlzIGFmdGVyIGNhbGxpbmdcbiAgICogdGhlIGl0ZXJhdGVlIGZ1bmN0aW9uIG9uIHRoZSBjb250YWluaW5nIG9iamVjdCBvciBhcnJheSBpdHNlbGYuXG4gICAqXG4gICAqIFRoZSBpdGVyYXRlZSBpcyBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOiAodmFsdWUsIHBvaW50ZXIsIHJvb3RPYmplY3QpLFxuICAgKiB3aGVyZSBwb2ludGVyIGlzIGEgSlNPTiBwb2ludGVyIGluZGljYXRpbmcgdGhlIGxvY2F0aW9uIG9mIHRoZSBjdXJyZW50XG4gICAqIHZhbHVlIHdpdGhpbiB0aGUgcm9vdCBvYmplY3QsIGFuZCByb290T2JqZWN0IGlzIHRoZSByb290IG9iamVjdCBpbml0aWFsbHlcbiAgICogc3VibWl0dGVkIHRvIHRoIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBJZiBhIHRoaXJkIG9wdGlvbmFsIHBhcmFtZXRlciAnYm90dG9tVXAnIGlzIHNldCB0byBUUlVFLCB0aGUgaXRlcmF0b3JcbiAgICogZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgb24gc3ViLW9iamVjdHMgYW5kIGFycmF5cyBhZnRlciBiZWluZ1xuICAgKiBjYWxsZWQgb24gdGhlaXIgY29udGVudHMsIHJhdGhlciB0aGFuIGJlZm9yZSwgd2hpY2ggaXMgdGhlIGRlZmF1bHQuXG4gICAqXG4gICAqIFRoaXMgZnVuY3Rpb24gY2FuIGFsc28gb3B0aW9uYWxseSBiZSBjYWxsZWQgZGlyZWN0bHkgb24gYSBzdWItb2JqZWN0IGJ5XG4gICAqIGluY2x1ZGluZyBvcHRpb25hbCA0dGggYW5kIDV0aCBwYXJhbWV0ZXJzIHRvIHNwZWNpZnkgdGhlIGluaXRpYWxcbiAgICogcm9vdCBvYmplY3QgYW5kIHBvaW50ZXIuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgLSB0aGUgaW5pdGlhbCBvYmplY3Qgb3IgYXJyYXlcbiAgICogQHBhcmFtIGZuIC0gaXRlcmF0ZWUgZnVuY3Rpb25cbiAgICogQHBhcmFtIGJvdHRvbVVwIC0gb3B0aW9uYWwsIHNldCB0byBUUlVFIHRvIHJldmVyc2UgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSBwb2ludGVyIC0gb3B0aW9uYWwsIEpTT04gUG9pbnRlciB0byBvYmplY3Qgd2l0aGluIHJvb3RPYmplY3RcbiAgICogQHBhcmFtIHJvb3RPYmplY3QgLSBvcHRpb25hbCwgcm9vdCBvYmplY3Qgb3IgYXJyYXlcbiAgICogQHJldHVybiBUaGUgbW9kaWZpZWQgb2JqZWN0XG4gICAqL1xuICBzdGF0aWMgZm9yRWFjaERlZXAoXG4gICAgb2JqZWN0LFxuICAgIGZuOiAodjogYW55LCBwPzogc3RyaW5nLCBvPzogYW55KSA9PiBhbnkgPSAodikgPT4gdixcbiAgICBib3R0b21VcCA9IGZhbHNlLFxuICAgIHBvaW50ZXIgPSAnJyxcbiAgICByb290T2JqZWN0ID0gb2JqZWN0XG4gICkge1xuICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYGZvckVhY2hEZWVwIGVycm9yOiBJdGVyYXRvciBpcyBub3QgYSBmdW5jdGlvbjpgLCBmbilcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoIWJvdHRvbVVwKSB7XG4gICAgICBmbihvYmplY3QsIHBvaW50ZXIsIHJvb3RPYmplY3QpXG4gICAgfVxuICAgIGlmIChpc09iamVjdChvYmplY3QpIHx8IGlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMob2JqZWN0KSkge1xuICAgICAgICBjb25zdCBuZXdQb2ludGVyID0gcG9pbnRlciArICcvJyArIHRoaXMuZXNjYXBlKGtleSlcbiAgICAgICAgdGhpcy5mb3JFYWNoRGVlcChvYmplY3Rba2V5XSwgZm4sIGJvdHRvbVVwLCBuZXdQb2ludGVyLCByb290T2JqZWN0KVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoYm90dG9tVXApIHtcbiAgICAgIGZuKG9iamVjdCwgcG9pbnRlciwgcm9vdE9iamVjdClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ2ZvckVhY2hEZWVwQ29weScgZnVuY3Rpb25cbiAgICpcbiAgICogU2ltaWxhciB0byBmb3JFYWNoRGVlcCwgYnV0IHJldHVybnMgYSBjb3B5IG9mIHRoZSBvcmlnaW5hbCBvYmplY3QsIHdpdGhcbiAgICogdGhlIHNhbWUga2V5cyBhbmQgaW5kZXhlcywgYnV0IHdpdGggdmFsdWVzIHJlcGxhY2VkIHdpdGggdGhlIHJlc3VsdCBvZlxuICAgKiB0aGUgaXRlcmF0ZWUgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgLSB0aGUgaW5pdGlhbCBvYmplY3Qgb3IgYXJyYXlcbiAgICogQHBhcmFtIGZuIC0gaXRlcmF0ZWUgZnVuY3Rpb25cbiAgICogQHBhcmFtIGJvdHRvbVVwIC0gb3B0aW9uYWwsIHNldCB0byBUUlVFIHRvIHJldmVyc2UgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSBwb2ludGVyIC0gb3B0aW9uYWwsIEpTT04gUG9pbnRlciB0byBvYmplY3Qgd2l0aGluIHJvb3RPYmplY3RcbiAgICogQHBhcmFtIHJvb3RPYmplY3QgLSBvcHRpb25hbCwgcm9vdCBvYmplY3Qgb3IgYXJyYXlcbiAgICogQHJldHVybiBUaGUgY29waWVkIG9iamVjdFxuICAgKi9cbiAgc3RhdGljIGZvckVhY2hEZWVwQ29weShcbiAgICBvYmplY3Q6IG9iamVjdCxcbiAgICBmbjogKHY6IGFueSwgcD86IHN0cmluZywgbz86IGFueSkgPT4gYW55ID0gKHYpID0+IHYsXG4gICAgYm90dG9tVXA6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICBwb2ludGVyOiBzdHJpbmcgPSAnJyxcbiAgICByb290T2JqZWN0OiBvYmplY3QgPSBvYmplY3RcbiAgKSB7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS5lcnJvcihgZm9yRWFjaERlZXBDb3B5IGVycm9yOiBJdGVyYXRvciBpcyBub3QgYSBmdW5jdGlvbjpgLCBmbilcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGlmIChpc09iamVjdChvYmplY3QpIHx8IEFycmF5LmlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgbGV0IG5ld09iamVjdCA9IEFycmF5LmlzQXJyYXkob2JqZWN0KSA/IFsuLi5vYmplY3RdIDogey4uLm9iamVjdH1cbiAgICAgIGlmICghYm90dG9tVXApIHtcbiAgICAgICAgbmV3T2JqZWN0ID0gZm4obmV3T2JqZWN0LCBwb2ludGVyLCByb290T2JqZWN0KVxuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMobmV3T2JqZWN0KSkge1xuICAgICAgICBjb25zdCBuZXdQb2ludGVyID0gcG9pbnRlciArICcvJyArIHRoaXMuZXNjYXBlKGtleSlcbiAgICAgICAgbmV3T2JqZWN0W2tleV0gPSB0aGlzLmZvckVhY2hEZWVwQ29weShcbiAgICAgICAgICBuZXdPYmplY3Rba2V5XSwgZm4sIGJvdHRvbVVwLCBuZXdQb2ludGVyLCByb290T2JqZWN0XG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIGlmIChib3R0b21VcCkge1xuICAgICAgICBuZXdPYmplY3QgPSBmbihuZXdPYmplY3QsIHBvaW50ZXIsIHJvb3RPYmplY3QpXG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3T2JqZWN0XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmbihvYmplY3QsIHBvaW50ZXIsIHJvb3RPYmplY3QpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdlc2NhcGUnIGZ1bmN0aW9uXG4gICAqXG4gICAqIEVzY2FwZXMgYSBzdHJpbmcgcmVmZXJlbmNlIGtleVxuICAgKlxuICAgKiBAcGFyYW0ga2V5IC0gc3RyaW5nIGtleSB0byBlc2NhcGVcbiAgICogQHJldHVybiBlc2NhcGVkIGtleVxuICAgKi9cbiAgc3RhdGljIGVzY2FwZShrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGtleS50b1N0cmluZygpLnJlcGxhY2UoL34vZywgJ34wJykucmVwbGFjZSgvXFwvL2csICd+MScpXG4gIH1cblxuICAvKipcbiAgICogJ3VuZXNjYXBlJyBmdW5jdGlvblxuICAgKlxuICAgKiBVbmVzY2FwZXMgYSBzdHJpbmcgcmVmZXJlbmNlIGtleVxuICAgKlxuICAgKiBAcGFyYW0ga2V5IC0gc3RyaW5nIGtleSB0byB1bmVzY2FwZVxuICAgKiBAcmV0dXJuIHVuZXNjYXBlZCBrZXlcbiAgICovXG4gIHN0YXRpYyB1bmVzY2FwZShrZXk6IHN0cmluZykge1xuICAgIHJldHVybiBrZXkudG9TdHJpbmcoKS5yZXBsYWNlKC9+MS9nLCAnLycpLnJlcGxhY2UoL34wL2csICd+JylcbiAgfVxuXG4gIC8qKlxuICAgKiAncGFyc2UnIGZ1bmN0aW9uXG4gICAqXG4gICAqIENvbnZlcnRzIGEgc3RyaW5nIEpTT04gUG9pbnRlciBpbnRvIGEgYXJyYXkgb2Yga2V5c1xuICAgKiAoaWYgaW5wdXQgaXMgYWxyZWFkeSBhbiBhbiBhcnJheSBvZiBrZXlzLCBpdCBpcyByZXR1cm5lZCB1bmNoYW5nZWQpXG4gICAqXG4gICAqIEBwYXJhbSBwb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gICAqIEBwYXJhbSBlcnJvcnMgLSBTaG93IGVycm9yIGlmIGludmFsaWQgcG9pbnRlcj9cbiAgICogQHJldHVybiBKU09OIFBvaW50ZXIgYXJyYXkgb2Yga2V5c1xuICAgKi9cbiAgc3RhdGljIHBhcnNlKFxuICAgIHBvaW50ZXI6IFBvaW50ZXIsXG4gICAgZXJyb3JzOiBib29sZWFuID0gZmFsc2VcbiAgKTogc3RyaW5nW10ge1xuICAgIGlmICghdGhpcy5pc0pzb25Qb2ludGVyKHBvaW50ZXIpKSB7XG4gICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYHBhcnNlIGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlcjogJHtwb2ludGVyfWApXG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBpZiAoaXNBcnJheShwb2ludGVyKSkge1xuICAgICAgcmV0dXJuIHBvaW50ZXIgYXMgc3RyaW5nW11cbiAgICB9XG4gICAgaWYgKHR5cGVvZiBwb2ludGVyID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKHBvaW50ZXJbMF0gPT09ICcjJykge1xuICAgICAgICBwb2ludGVyID0gcG9pbnRlci5zbGljZSgxKVxuICAgICAgfVxuICAgICAgaWYgKHBvaW50ZXIgPT09ICcnIHx8IHBvaW50ZXIgPT09ICcvJykge1xuICAgICAgICByZXR1cm4gW11cbiAgICAgIH1cbiAgICAgIHJldHVybiBwb2ludGVyLnNsaWNlKDEpLnNwbGl0KCcvJykubWFwKHRoaXMudW5lc2NhcGUpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdjb21waWxlJyBmdW5jdGlvblxuICAgKlxuICAgKiBDb252ZXJ0cyBhbiBhcnJheSBvZiBrZXlzIGludG8gYSBKU09OIFBvaW50ZXIgc3RyaW5nXG4gICAqIChpZiBpbnB1dCBpcyBhbHJlYWR5IGEgc3RyaW5nLCBpdCBpcyBub3JtYWxpemVkIGFuZCByZXR1cm5lZClcbiAgICpcbiAgICogVGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXIgaXMgYSBkZWZhdWx0IHdoaWNoIHdpbGwgcmVwbGFjZSBhbnkgZW1wdHkga2V5cy5cbiAgICpcbiAgICogQHBhcmFtIHBvaW50ZXIgLSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSlcbiAgICogQHBhcmFtIGRlZmF1bHRWYWx1ZSAtIERlZmF1bHQgdmFsdWVcbiAgICogQHBhcmFtIGVycm9ycyAtIFNob3cgZXJyb3IgaWYgaW52YWxpZCBwb2ludGVyP1xuICAgKiBAcmV0dXJuIEpTT04gUG9pbnRlciBzdHJpbmdcbiAgICovXG4gIHN0YXRpYyBjb21waWxlKFxuICAgIHBvaW50ZXI6IFBvaW50ZXIsXG4gICAgZGVmYXVsdFZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSAnJyxcbiAgICBlcnJvcnM6IGJvb2xlYW4gPSBmYWxzZVxuICApOiBzdHJpbmcge1xuICAgIGlmIChwb2ludGVyID09PSAnIycpIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNKc29uUG9pbnRlcihwb2ludGVyKSkge1xuICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBjb21waWxlIGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlcjogJHtwb2ludGVyfWApXG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShwb2ludGVyKSkge1xuICAgICAgaWYgKHBvaW50ZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAnJ1xuICAgICAgfVxuICAgICAgcmV0dXJuICcvJyArIHBvaW50ZXIubWFwKFxuICAgICAgICBrZXkgPT4ga2V5ID09PSAnJyA/IGRlZmF1bHRWYWx1ZSA6IHRoaXMuZXNjYXBlKGtleSlcbiAgICAgICkuam9pbignLycpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgcG9pbnRlciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChwb2ludGVyWzBdID09PSAnIycpIHtcbiAgICAgICAgcG9pbnRlciA9IHBvaW50ZXIuc2xpY2UoMSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBwb2ludGVyXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICd0b0tleScgZnVuY3Rpb25cbiAgICpcbiAgICogRXh0cmFjdHMgbmFtZSBvZiB0aGUgZmluYWwga2V5IGZyb20gYSBKU09OIFBvaW50ZXIuXG4gICAqXG4gICAqIEBwYXJhbSBwb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gICAqIEBwYXJhbSBlcnJvcnMgLSBTaG93IGVycm9yIGlmIGludmFsaWQgcG9pbnRlcj9cbiAgICogQHJldHVybiB0aGUgZXh0cmFjdGVkIGtleVxuICAgKi9cbiAgc3RhdGljIHRvS2V5KFxuICAgIHBvaW50ZXI6IFBvaW50ZXIsXG4gICAgZXJyb3JzOiBib29sZWFuID0gZmFsc2VcbiAgKTogc3RyaW5nIHtcbiAgICBjb25zdCBrZXlBcnJheSA9IHRoaXMucGFyc2UocG9pbnRlciwgZXJyb3JzKVxuICAgIGlmIChrZXlBcnJheSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgaWYgKCFrZXlBcnJheS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cbiAgICByZXR1cm4ga2V5QXJyYXlba2V5QXJyYXkubGVuZ3RoIC0gMV1cbiAgfVxuXG4gIC8qKlxuICAgKiAnaXNKc29uUG9pbnRlcicgZnVuY3Rpb25cbiAgICpcbiAgICogQ2hlY2tzIGEgc3RyaW5nIG9yIGFycmF5IHZhbHVlIHRvIGRldGVybWluZSBpZiBpdCBpcyBhIHZhbGlkIEpTT04gUG9pbnRlci5cbiAgICogUmV0dXJucyB0cnVlIGlmIGEgc3RyaW5nIGlzIGVtcHR5LCBvciBzdGFydHMgd2l0aCAnLycgb3IgJyMvJy5cbiAgICogUmV0dXJucyB0cnVlIGlmIGFuIGFycmF5IGNvbnRhaW5zIG9ubHkgc3RyaW5nIHZhbHVlcy5cbiAgICpcbiAgICogQHBhcmFtIHZhbHVlIC0gdmFsdWUgdG8gY2hlY2tcbiAgICogQHJldHVybiB0cnVlIGlmIHZhbHVlIGlzIGEgdmFsaWQgSlNPTiBQb2ludGVyLCBvdGhlcndpc2UgZmFsc2VcbiAgICovXG4gIHN0YXRpYyBpc0pzb25Qb2ludGVyKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS5ldmVyeShrZXkgPT4gdHlwZW9mIGtleSA9PT0gJ3N0cmluZycpXG4gICAgfSBlbHNlIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09ICcjJykge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgICAgaWYgKHZhbHVlWzBdID09PSAnLycgfHwgdmFsdWUuc2xpY2UoMCwgMikgPT09ICcjLycpIHtcbiAgICAgICAgcmV0dXJuICEvKH5bXjAxXXx+JCkvZy50ZXN0KHZhbHVlKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8qKlxuICAgKiAnaXNTdWJQb2ludGVyJyBmdW5jdGlvblxuICAgKlxuICAgKiBDaGVja3Mgd2hldGhlciBvbmUgSlNPTiBQb2ludGVyIGlzIGEgc3Vic2V0IG9mIGFub3RoZXIuXG4gICAqXG4gICAqIEBwYXJhbSBzaG9ydFBvaW50ZXIgLSBwb3RlbnRpYWwgc3Vic2V0IEpTT04gUG9pbnRlclxuICAgKiBAcGFyYW0gbG9uZ1BvaW50ZXIgLSBwb3RlbnRpYWwgc3VwZXJzZXQgSlNPTiBQb2ludGVyXG4gICAqIEBwYXJhbSB0cnVlSWZNYXRjaGluZyAtIHJldHVybiB0cnVlIGlmIHBvaW50ZXJzIG1hdGNoP1xuICAgKiBAcGFyYW0gZXJyb3JzIC0gU2hvdyBlcnJvciBpZiBpbnZhbGlkIHBvaW50ZXI/XG4gICAqIEByZXR1cm4gdHJ1ZSBpZiBzaG9ydFBvaW50ZXIgaXMgYSBzdWJzZXQgb2YgbG9uZ1BvaW50ZXIsIGZhbHNlIGlmIG5vdFxuICAgKi9cbiAgc3RhdGljIGlzU3ViUG9pbnRlcihcbiAgICBzaG9ydFBvaW50ZXI6IFBvaW50ZXIsXG4gICAgbG9uZ1BvaW50ZXI6IFBvaW50ZXIsXG4gICAgdHJ1ZUlmTWF0Y2hpbmc6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICBlcnJvcnM6IGJvb2xlYW4gPSBmYWxzZVxuICApOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuaXNKc29uUG9pbnRlcihzaG9ydFBvaW50ZXIpIHx8ICF0aGlzLmlzSnNvblBvaW50ZXIobG9uZ1BvaW50ZXIpKSB7XG4gICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgIGxldCBpbnZhbGlkID0gJydcbiAgICAgICAgaWYgKCF0aGlzLmlzSnNvblBvaW50ZXIoc2hvcnRQb2ludGVyKSkge1xuICAgICAgICAgIGludmFsaWQgKz0gYCAxOiAke3Nob3J0UG9pbnRlcn1gXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmlzSnNvblBvaW50ZXIobG9uZ1BvaW50ZXIpKSB7XG4gICAgICAgICAgaW52YWxpZCArPSBgIDI6ICR7bG9uZ1BvaW50ZXJ9YFxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYGlzU3ViUG9pbnRlciBlcnJvcjogSW52YWxpZCBKU09OIFBvaW50ZXIgJHtpbnZhbGlkfWApXG4gICAgICB9XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgc2hvcnRQb2ludGVyID0gdGhpcy5jb21waWxlKHNob3J0UG9pbnRlciwgJycsIGVycm9ycylcbiAgICBsb25nUG9pbnRlciA9IHRoaXMuY29tcGlsZShsb25nUG9pbnRlciwgJycsIGVycm9ycylcbiAgICByZXR1cm4gc2hvcnRQb2ludGVyID09PSBsb25nUG9pbnRlciA/IHRydWVJZk1hdGNoaW5nIDpcbiAgICAgIGAke3Nob3J0UG9pbnRlcn0vYCA9PT0gbG9uZ1BvaW50ZXIuc2xpY2UoMCwgc2hvcnRQb2ludGVyLmxlbmd0aCArIDEpXG4gIH1cblxuICAvKipcbiAgICogJ3RvSW5kZXhlZFBvaW50ZXInIGZ1bmN0aW9uXG4gICAqXG4gICAqIE1lcmdlcyBhbiBhcnJheSBvZiBudW1lcmljIGluZGV4ZXMgYW5kIGEgZ2VuZXJpYyBwb2ludGVyIHRvIGNyZWF0ZSBhblxuICAgKiBpbmRleGVkIHBvaW50ZXIgZm9yIGEgc3BlY2lmaWMgaXRlbS5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIG1lcmdpbmcgdGhlIGdlbmVyaWMgcG9pbnRlciAnL2Zvby8tL2Jhci8tL2JheicgYW5kXG4gICAqIHRoZSBhcnJheSBbNCwgMl0gd291bGQgcmVzdWx0IGluIHRoZSBpbmRleGVkIHBvaW50ZXIgJy9mb28vNC9iYXIvMi9iYXonXG4gICAqXG4gICAqIEBwYXJhbSBnZW5lcmljUG9pbnRlciAtIFRoZSBnZW5lcmljIHBvaW50ZXJcbiAgICogQHBhcmFtIGluZGV4QXJyYXkgLSBUaGUgYXJyYXkgb2YgbnVtZXJpYyBpbmRleGVzXG4gICAqIEBwYXJhbSBhcnJheU1hcCAtIEFuIG9wdGlvbmFsIGFycmF5IG1hcFxuICAgKiBAcmV0dXJuIFRoZSBtZXJnZWQgcG9pbnRlciB3aXRoIGluZGV4ZXNcbiAgICovXG4gIHN0YXRpYyB0b0luZGV4ZWRQb2ludGVyKFxuICAgIGdlbmVyaWNQb2ludGVyOiBQb2ludGVyLFxuICAgIGluZGV4QXJyYXk6IG51bWJlcltdLFxuICAgIGFycmF5TWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbnVsbFxuICApOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmlzSnNvblBvaW50ZXIoZ2VuZXJpY1BvaW50ZXIpICYmIGlzQXJyYXkoaW5kZXhBcnJheSkpIHtcbiAgICAgIGxldCBpbmRleGVkUG9pbnRlciA9IHRoaXMuY29tcGlsZShnZW5lcmljUG9pbnRlcilcbiAgICAgIGlmIChpc01hcChhcnJheU1hcCkpIHtcbiAgICAgICAgbGV0IGFycmF5SW5kZXggPSAwXG4gICAgICAgIHJldHVybiBpbmRleGVkUG9pbnRlci5yZXBsYWNlKC9cXC9cXC0oPz1cXC98JCkvZywgKGtleSwgc3RyaW5nSW5kZXgpID0+XG4gICAgICAgICAgYXJyYXlNYXAuaGFzKChpbmRleGVkUG9pbnRlciBhcyBzdHJpbmcpLnNsaWNlKDAsIHN0cmluZ0luZGV4KSkgP1xuICAgICAgICAgICAgJy8nICsgaW5kZXhBcnJheVthcnJheUluZGV4KytdIDoga2V5XG4gICAgICAgIClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoY29uc3QgcG9pbnRlckluZGV4IG9mIGluZGV4QXJyYXkpIHtcbiAgICAgICAgICBpbmRleGVkUG9pbnRlciA9IGluZGV4ZWRQb2ludGVyLnJlcGxhY2UoJy8tJywgJy8nICsgcG9pbnRlckluZGV4KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbmRleGVkUG9pbnRlclxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNKc29uUG9pbnRlcihnZW5lcmljUG9pbnRlcikpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYHRvSW5kZXhlZFBvaW50ZXIgZXJyb3I6IEludmFsaWQgSlNPTiBQb2ludGVyOiAke2dlbmVyaWNQb2ludGVyfWApXG4gICAgfVxuICAgIGlmICghaXNBcnJheShpbmRleEFycmF5KSkge1xuICAgICAgY29uc29sZS5lcnJvcihgdG9JbmRleGVkUG9pbnRlciBlcnJvcjogSW52YWxpZCBpbmRleEFycmF5OiAke2luZGV4QXJyYXl9YClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ3RvR2VuZXJpY1BvaW50ZXInIGZ1bmN0aW9uXG4gICAqXG4gICAqIENvbXBhcmVzIGFuIGluZGV4ZWQgcG9pbnRlciB0byBhbiBhcnJheSBtYXAgYW5kIHJlbW92ZXMgbGlzdCBhcnJheVxuICAgKiBpbmRleGVzIChidXQgbGVhdmVzIHR1cGxlIGFycnJheSBpbmRleGVzIGFuZCBhbGwgb2JqZWN0IGtleXMsIGluY2x1ZGluZ1xuICAgKiBudW1lcmljIGtleXMpIHRvIGNyZWF0ZSBhIGdlbmVyaWMgcG9pbnRlci5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIHVzaW5nIHRoZSBpbmRleGVkIHBvaW50ZXIgJy9mb28vMS9iYXIvMi9iYXovMycgYW5kXG4gICAqIHRoZSBhcnJheU1hcCBbWycvZm9vJywgMF0sIFsnL2Zvby8tL2JhcicsIDNdLCBbJy9mb28vLS9iYXIvLS9iYXonLCAwXV1cbiAgICogd291bGQgcmVzdWx0IGluIHRoZSBnZW5lcmljIHBvaW50ZXIgJy9mb28vLS9iYXIvMi9iYXovLSdcbiAgICogVXNpbmcgdGhlIGluZGV4ZWQgcG9pbnRlciAnL2Zvby8xL2Jhci80L2Jhei8zJyBhbmQgdGhlIHNhbWUgYXJyYXlNYXBcbiAgICogd291bGQgcmVzdWx0IGluIHRoZSBnZW5lcmljIHBvaW50ZXIgJy9mb28vLS9iYXIvLS9iYXovLSdcbiAgICogKHRoZSBiYXIgYXJyYXkgaGFzIDMgdHVwbGUgaXRlbXMsIHNvIGluZGV4IDIgaXMgcmV0YWluZWQsIGJ1dCA0IGlzIHJlbW92ZWQpXG4gICAqXG4gICAqIFRoZSBzdHJ1Y3R1cmUgb2YgdGhlIGFycmF5TWFwIGlzOiBbWydwYXRoIHRvIGFycmF5JywgbnVtYmVyIG9mIHR1cGxlIGl0ZW1zXS4uLl1cbiAgICpcbiAgICogQHBhcmFtIGluZGV4ZWRQb2ludGVyIC0gVGhlIGluZGV4ZWQgcG9pbnRlciAoYXJyYXkgb3Igc3RyaW5nKVxuICAgKiBAcGFyYW0gYXJyYXlNYXAgLSBUaGUgb3B0aW9uYWwgYXJyYXkgbWFwIChmb3IgcHJlc2VydmluZyB0dXBsZSBpbmRleGVzKVxuICAgKiBAcmV0dXJuIFRoZSBnZW5lcmljIHBvaW50ZXIgd2l0aCBpbmRleGVzIHJlbW92ZWRcbiAgICovXG4gIHN0YXRpYyB0b0dlbmVyaWNQb2ludGVyKFxuICAgIGluZGV4ZWRQb2ludGVyOiBQb2ludGVyLFxuICAgIGFycmF5TWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKVxuICApOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmlzSnNvblBvaW50ZXIoaW5kZXhlZFBvaW50ZXIpICYmIGlzTWFwKGFycmF5TWFwKSkge1xuICAgICAgY29uc3QgcG9pbnRlckFycmF5ID0gdGhpcy5wYXJzZShpbmRleGVkUG9pbnRlcilcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcG9pbnRlckFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHN1YlBvaW50ZXIgPSB0aGlzLmNvbXBpbGUocG9pbnRlckFycmF5LnNsaWNlKDAsIGkpKVxuICAgICAgICBpZiAoYXJyYXlNYXAuaGFzKHN1YlBvaW50ZXIpICYmXG4gICAgICAgICAgYXJyYXlNYXAuZ2V0KHN1YlBvaW50ZXIpIDw9ICtwb2ludGVyQXJyYXlbaV1cbiAgICAgICAgKSB7XG4gICAgICAgICAgcG9pbnRlckFycmF5W2ldID0gJy0nXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmNvbXBpbGUocG9pbnRlckFycmF5KVxuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNKc29uUG9pbnRlcihpbmRleGVkUG9pbnRlcikpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYHRvR2VuZXJpY1BvaW50ZXIgZXJyb3I6IGludmFsaWQgSlNPTiBQb2ludGVyOiAke2luZGV4ZWRQb2ludGVyfWApXG4gICAgfVxuICAgIGlmICghaXNNYXAoYXJyYXlNYXApKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGB0b0dlbmVyaWNQb2ludGVyIGVycm9yOiBpbnZhbGlkIGFycmF5TWFwOiAke2FycmF5TWFwfWApXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICd0b0NvbnRyb2xQb2ludGVyJyBmdW5jdGlvblxuICAgKlxuICAgKiBBY2NlcHRzIGEgSlNPTiBQb2ludGVyIGZvciBhIGRhdGEgb2JqZWN0IGFuZCByZXR1cm5zIGEgSlNPTiBQb2ludGVyIGZvciB0aGVcbiAgICogbWF0Y2hpbmcgY29udHJvbCBpbiBhbiBBbmd1bGFyIEZvcm1Hcm91cC5cbiAgICpcbiAgICogQHBhcmFtIGRhdGFQb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpIHRvIGEgZGF0YSBvYmplY3RcbiAgICogQHBhcmFtIGZvcm1Hcm91cCAtIEFuZ3VsYXIgRm9ybUdyb3VwIHRvIGdldCB2YWx1ZSBmcm9tXG4gICAqIEBwYXJhbSBjb250cm9sTXVzdEV4aXN0IC0gT25seSByZXR1cm4gaWYgY29udHJvbCBleGlzdHM/XG4gICAqIEByZXR1cm4gSlNPTiBQb2ludGVyIChzdHJpbmcpIHRvIHRoZSBmb3JtR3JvdXAgb2JqZWN0XG4gICAqL1xuICBzdGF0aWMgdG9Db250cm9sUG9pbnRlcihcbiAgICBkYXRhUG9pbnRlcjogUG9pbnRlcixcbiAgICBmb3JtR3JvdXA6IEZvcm1Hcm91cCxcbiAgICBjb250cm9sTXVzdEV4aXN0OiBib29sZWFuID0gZmFsc2VcbiAgKSB7XG4gICAgY29uc3QgZGF0YVBvaW50ZXJBcnJheSA9IHRoaXMucGFyc2UoZGF0YVBvaW50ZXIpXG4gICAgY29uc3QgY29udHJvbFBvaW50ZXJBcnJheTogc3RyaW5nW10gPSBbXVxuICAgIGxldCBzdWJHcm91cDogYW55ID0gZm9ybUdyb3VwXG4gICAgaWYgKGRhdGFQb2ludGVyQXJyYXkgIT09IG51bGwpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIGRhdGFQb2ludGVyQXJyYXkpIHtcbiAgICAgICAgaWYgKGhhc093bihzdWJHcm91cCwgJ2NvbnRyb2xzJykpIHtcbiAgICAgICAgICBjb250cm9sUG9pbnRlckFycmF5LnB1c2goJ2NvbnRyb2xzJylcbiAgICAgICAgICBzdWJHcm91cCA9IHN1Ykdyb3VwLmNvbnRyb2xzXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXJyYXkoc3ViR3JvdXApICYmIChrZXkgPT09ICctJykpIHtcbiAgICAgICAgICBjb250cm9sUG9pbnRlckFycmF5LnB1c2goKHN1Ykdyb3VwLmxlbmd0aCAtIDEpLnRvU3RyaW5nKCkpXG4gICAgICAgICAgc3ViR3JvdXAgPSBzdWJHcm91cFtzdWJHcm91cC5sZW5ndGggLSAxXVxuICAgICAgICB9IGVsc2UgaWYgKGhhc093bihzdWJHcm91cCwga2V5KSkge1xuICAgICAgICAgIGNvbnRyb2xQb2ludGVyQXJyYXkucHVzaChrZXkpXG4gICAgICAgICAgc3ViR3JvdXAgPSBzdWJHcm91cFtrZXldXG4gICAgICAgIH0gZWxzZSBpZiAoY29udHJvbE11c3RFeGlzdCkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYHRvQ29udHJvbFBvaW50ZXIgZXJyb3I6IFVuYWJsZSB0byBmaW5kIFwiJHtrZXl9XCIgaXRlbSBpbiBGb3JtR3JvdXAuYClcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGRhdGFQb2ludGVyKVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybUdyb3VwKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnRyb2xQb2ludGVyQXJyYXkucHVzaChrZXkpXG4gICAgICAgICAgc3ViR3JvdXAgPSB7Y29udHJvbHM6IHt9fVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5jb21waWxlKGNvbnRyb2xQb2ludGVyQXJyYXkpXG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoYHRvQ29udHJvbFBvaW50ZXIgZXJyb3I6IEludmFsaWQgSlNPTiBQb2ludGVyOiAke2RhdGFQb2ludGVyfWApXG4gIH1cblxuICAvKipcbiAgICogJ3RvU2NoZW1hUG9pbnRlcicgZnVuY3Rpb25cbiAgICpcbiAgICogQWNjZXB0cyBhIEpTT04gUG9pbnRlciB0byBhIHZhbHVlIGluc2lkZSBhIGRhdGEgb2JqZWN0IGFuZCBhIEpTT04gc2NoZW1hXG4gICAqIGZvciB0aGF0IG9iamVjdC5cbiAgICpcbiAgICogUmV0dXJucyBhIFBvaW50ZXIgdG8gdGhlIHN1Yi1zY2hlbWEgZm9yIHRoZSB2YWx1ZSBpbnNpZGUgdGhlIG9iamVjdCdzIHNjaGVtYS5cbiAgICpcbiAgICogQHBhcmFtIGRhdGFQb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpIHRvIGFuIG9iamVjdFxuICAgKiBAcGFyYW0gc2NoZW1hIC0gSlNPTiBzY2hlbWEgZm9yIHRoZSBvYmplY3RcbiAgICogQHJldHVybiBKU09OIFBvaW50ZXIgKHN0cmluZykgdG8gdGhlIG9iamVjdCdzIHNjaGVtYVxuICAgKi9cbiAgc3RhdGljIHRvU2NoZW1hUG9pbnRlcihcbiAgICBkYXRhUG9pbnRlcjogUG9pbnRlcixcbiAgICBzY2hlbWE6IGFueVxuICApOiBQb2ludGVyIHtcbiAgICBpZiAodGhpcy5pc0pzb25Qb2ludGVyKGRhdGFQb2ludGVyKSAmJiB0eXBlb2Ygc2NoZW1hID09PSAnb2JqZWN0Jykge1xuICAgICAgY29uc3QgcG9pbnRlckFycmF5ID0gdGhpcy5wYXJzZShkYXRhUG9pbnRlcilcbiAgICAgIGlmICghcG9pbnRlckFycmF5Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gJydcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZpcnN0S2V5ID0gcG9pbnRlckFycmF5LnNoaWZ0KClcbiAgICAgIGlmIChzY2hlbWEudHlwZSA9PT0gJ29iamVjdCcgfHwgc2NoZW1hLnByb3BlcnRpZXMgfHwgc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmICgoc2NoZW1hLnByb3BlcnRpZXMgfHwge30pW2ZpcnN0S2V5XSkge1xuICAgICAgICAgIHJldHVybiBgL3Byb3BlcnRpZXMvJHt0aGlzLmVzY2FwZShmaXJzdEtleSl9YCArXG4gICAgICAgICAgICB0aGlzLnRvU2NoZW1hUG9pbnRlcihwb2ludGVyQXJyYXksIHNjaGVtYS5wcm9wZXJ0aWVzW2ZpcnN0S2V5XSlcbiAgICAgICAgfSBlbHNlIGlmIChzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMpIHtcbiAgICAgICAgICByZXR1cm4gJy9hZGRpdGlvbmFsUHJvcGVydGllcycgK1xuICAgICAgICAgICAgdGhpcy50b1NjaGVtYVBvaW50ZXIocG9pbnRlckFycmF5LCBzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICgoc2NoZW1hLnR5cGUgPT09ICdhcnJheScgfHwgc2NoZW1hLml0ZW1zKSAmJlxuICAgICAgICAoaXNOdW1iZXIoZmlyc3RLZXkpIHx8IGZpcnN0S2V5ID09PSAnLScgfHwgZmlyc3RLZXkgPT09ICcnKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGFycmF5SXRlbSA9IGZpcnN0S2V5ID09PSAnLScgfHwgZmlyc3RLZXkgPT09ICcnID8gMCA6ICtmaXJzdEtleVxuICAgICAgICBpZiAoaXNBcnJheShzY2hlbWEuaXRlbXMpKSB7XG4gICAgICAgICAgaWYgKGFycmF5SXRlbSA8IHNjaGVtYS5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiAnL2l0ZW1zLycgKyBhcnJheUl0ZW0gK1xuICAgICAgICAgICAgICB0aGlzLnRvU2NoZW1hUG9pbnRlcihwb2ludGVyQXJyYXksIHNjaGVtYS5pdGVtc1thcnJheUl0ZW1dKVxuICAgICAgICAgIH0gZWxzZSBpZiAoc2NoZW1hLmFkZGl0aW9uYWxJdGVtcykge1xuICAgICAgICAgICAgcmV0dXJuICcvYWRkaXRpb25hbEl0ZW1zJyArXG4gICAgICAgICAgICAgIHRoaXMudG9TY2hlbWFQb2ludGVyKHBvaW50ZXJBcnJheSwgc2NoZW1hLmFkZGl0aW9uYWxJdGVtcylcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3Qoc2NoZW1hLml0ZW1zKSkge1xuICAgICAgICAgIHJldHVybiAnL2l0ZW1zJyArIHRoaXMudG9TY2hlbWFQb2ludGVyKHBvaW50ZXJBcnJheSwgc2NoZW1hLml0ZW1zKVxuICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHNjaGVtYS5hZGRpdGlvbmFsSXRlbXMpKSB7XG4gICAgICAgICAgcmV0dXJuICcvYWRkaXRpb25hbEl0ZW1zJyArXG4gICAgICAgICAgICB0aGlzLnRvU2NoZW1hUG9pbnRlcihwb2ludGVyQXJyYXksIHNjaGVtYS5hZGRpdGlvbmFsSXRlbXMpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnNvbGUuZXJyb3IoYHRvU2NoZW1hUG9pbnRlciBlcnJvcjogRGF0YSBwb2ludGVyICR7ZGF0YVBvaW50ZXJ9IGAgK1xuICAgICAgICBgbm90IGNvbXBhdGlibGUgd2l0aCBzY2hlbWEgJHtzY2hlbWF9YClcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGlmICghdGhpcy5pc0pzb25Qb2ludGVyKGRhdGFQb2ludGVyKSkge1xuICAgICAgY29uc29sZS5lcnJvcihgdG9TY2hlbWFQb2ludGVyIGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlcjogJHtkYXRhUG9pbnRlcn1gKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHNjaGVtYSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYHRvU2NoZW1hUG9pbnRlciBlcnJvcjogSW52YWxpZCBKU09OIFNjaGVtYTogJHtzY2hlbWF9YClcbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIC8qKlxuICAgKiAndG9EYXRhUG9pbnRlcicgZnVuY3Rpb25cbiAgICpcbiAgICogQWNjZXB0cyBhIEpTT04gUG9pbnRlciB0byBhIHN1Yi1zY2hlbWEgaW5zaWRlIGEgSlNPTiBzY2hlbWEgYW5kIHRoZSBzY2hlbWEuXG4gICAqXG4gICAqIElmIHBvc3NpYmxlLCByZXR1cm5zIGEgZ2VuZXJpYyBQb2ludGVyIHRvIHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlIGluc2lkZVxuICAgKiB0aGUgZGF0YSBvYmplY3QgZGVzY3JpYmVkIGJ5IHRoZSBKU09OIHNjaGVtYS5cbiAgICpcbiAgICogUmV0dXJucyBudWxsIGlmIHRoZSBzdWItc2NoZW1hIGlzIGluIGFuIGFtYmlndW91cyBsb2NhdGlvbiAoc3VjaCBhc1xuICAgKiBkZWZpbml0aW9ucyBvciBhZGRpdGlvbmFsUHJvcGVydGllcykgd2hlcmUgdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWVcbiAgICogbG9jYXRpb24gY2Fubm90IGJlIGRldGVybWluZWQuXG4gICAqXG4gICAqIEBwYXJhbSBzY2hlbWFQb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpIHRvIGEgSlNPTiBzY2hlbWFcbiAgICogQHBhcmFtIHNjaGVtYSAtIHRoZSBKU09OIHNjaGVtYVxuICAgKiBAcGFyYW0gZXJyb3JzIC0gU2hvdyBlcnJvcnM/XG4gICAqIEByZXR1cm4gSlNPTiBQb2ludGVyIChzdHJpbmcpIHRvIHRoZSB2YWx1ZSBpbiB0aGUgZGF0YSBvYmplY3RcbiAgICovXG4gIHN0YXRpYyB0b0RhdGFQb2ludGVyKFxuICAgIHNjaGVtYVBvaW50ZXI6IFBvaW50ZXIsXG4gICAgc2NoZW1hOiBhbnksXG4gICAgZXJyb3JzOiBib29sZWFuID0gZmFsc2VcbiAgKTogUG9pbnRlciB7XG4gICAgaWYgKHRoaXMuaXNKc29uUG9pbnRlcihzY2hlbWFQb2ludGVyKSAmJiB0eXBlb2Ygc2NoZW1hID09PSAnb2JqZWN0JyAmJlxuICAgICAgdGhpcy5oYXMoc2NoZW1hLCBzY2hlbWFQb2ludGVyKVxuICAgICkge1xuICAgICAgY29uc3QgcG9pbnRlckFycmF5ID0gdGhpcy5wYXJzZShzY2hlbWFQb2ludGVyKVxuICAgICAgaWYgKCFwb2ludGVyQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiAnJ1xuICAgICAgfVxuICAgICAgY29uc3QgZGF0YVBvaW50ZXIgPSAnJ1xuICAgICAgY29uc3QgZmlyc3RLZXkgPSBwb2ludGVyQXJyYXkuc2hpZnQoKVxuICAgICAgaWYgKGZpcnN0S2V5ID09PSAncHJvcGVydGllcycgfHxcbiAgICAgICAgKGZpcnN0S2V5ID09PSAnaXRlbXMnICYmIGlzQXJyYXkoc2NoZW1hLml0ZW1zKSlcbiAgICAgICkge1xuICAgICAgICBjb25zdCBzZWNvbmRLZXkgPSBwb2ludGVyQXJyYXkuc2hpZnQoKVxuICAgICAgICBjb25zdCBwb2ludGVyU3VmZml4ID0gdGhpcy50b0RhdGFQb2ludGVyKHBvaW50ZXJBcnJheSwgc2NoZW1hW2ZpcnN0S2V5XVtzZWNvbmRLZXldKVxuICAgICAgICByZXR1cm4gcG9pbnRlclN1ZmZpeCA9PT0gbnVsbCA/IG51bGwgOiAnLycgKyBzZWNvbmRLZXkgKyBwb2ludGVyU3VmZml4XG4gICAgICB9IGVsc2UgaWYgKGZpcnN0S2V5ID09PSAnYWRkaXRpb25hbEl0ZW1zJyB8fFxuICAgICAgICAoZmlyc3RLZXkgPT09ICdpdGVtcycgJiYgaXNPYmplY3Qoc2NoZW1hLml0ZW1zKSlcbiAgICAgICkge1xuICAgICAgICBjb25zdCBwb2ludGVyU3VmZml4ID0gdGhpcy50b0RhdGFQb2ludGVyKHBvaW50ZXJBcnJheSwgc2NoZW1hW2ZpcnN0S2V5XSlcbiAgICAgICAgcmV0dXJuIHBvaW50ZXJTdWZmaXggPT09IG51bGwgPyBudWxsIDogJy8tJyArIHBvaW50ZXJTdWZmaXhcbiAgICAgIH0gZWxzZSBpZiAoWydhbGxPZicsICdhbnlPZicsICdvbmVPZiddLmluY2x1ZGVzKGZpcnN0S2V5KSkge1xuICAgICAgICBjb25zdCBzZWNvbmRLZXkgPSBwb2ludGVyQXJyYXkuc2hpZnQoKVxuICAgICAgICByZXR1cm4gdGhpcy50b0RhdGFQb2ludGVyKHBvaW50ZXJBcnJheSwgc2NoZW1hW2ZpcnN0S2V5XVtzZWNvbmRLZXldKVxuICAgICAgfSBlbHNlIGlmIChmaXJzdEtleSA9PT0gJ25vdCcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9EYXRhUG9pbnRlcihwb2ludGVyQXJyYXksIHNjaGVtYVtmaXJzdEtleV0pXG4gICAgICB9IGVsc2UgaWYgKFsnY29udGFpbnMnLCAnZGVmaW5pdGlvbnMnLCAnZGVwZW5kZW5jaWVzJywgJ2FkZGl0aW9uYWxJdGVtcycsXG4gICAgICAgICdhZGRpdGlvbmFsUHJvcGVydGllcycsICdwYXR0ZXJuUHJvcGVydGllcycsICdwcm9wZXJ0eU5hbWVzJ10uaW5jbHVkZXMoZmlyc3RLZXkpXG4gICAgICApIHtcbiAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYHRvRGF0YVBvaW50ZXIgZXJyb3I6IEFtYmlndW91cyBsb2NhdGlvbmApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAnJ1xuICAgIH1cbiAgICBpZiAoZXJyb3JzKSB7XG4gICAgICBpZiAoIXRoaXMuaXNKc29uUG9pbnRlcihzY2hlbWFQb2ludGVyKSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGB0b0RhdGFQb2ludGVyIGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlcjogJHtzY2hlbWFQb2ludGVyfWApXG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHNjaGVtYSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgdG9EYXRhUG9pbnRlciBlcnJvcjogSW52YWxpZCBKU09OIFNjaGVtYTogJHtzY2hlbWF9YClcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygc2NoZW1hICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zb2xlLmVycm9yKGB0b0RhdGFQb2ludGVyIGVycm9yOiBQb2ludGVyICR7c2NoZW1hUG9pbnRlcn0gaW52YWxpZCBmb3IgU2NoZW1hOiAke3NjaGVtYX1gKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgLyoqXG4gICAqICdwYXJzZU9iamVjdFBhdGgnIGZ1bmN0aW9uXG4gICAqXG4gICAqIFBhcnNlcyBhIEphdmFTY3JpcHQgb2JqZWN0IHBhdGggaW50byBhbiBhcnJheSBvZiBrZXlzLCB3aGljaFxuICAgKiBjYW4gdGhlbiBiZSBwYXNzZWQgdG8gY29tcGlsZSgpIHRvIGNvbnZlcnQgaW50byBhIHN0cmluZyBKU09OIFBvaW50ZXIuXG4gICAqXG4gICAqIEJhc2VkIG9uIG1pa2UtbWFyY2FjY2kncyBleGNlbGxlbnQgb2JqZWN0cGF0aCBwYXJzZSBmdW5jdGlvbjpcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL21pa2UtbWFyY2FjY2kvb2JqZWN0cGF0aFxuICAgKlxuICAgKiBAcGFyYW0gcGF0aCAtIFRoZSBvYmplY3QgcGF0aCB0byBwYXJzZVxuICAgKiBAcmV0dXJuIFRoZSByZXN1bHRpbmcgYXJyYXkgb2Yga2V5c1xuICAgKi9cbiAgc3RhdGljIHBhcnNlT2JqZWN0UGF0aChwYXRoOiBQb2ludGVyKTogc3RyaW5nW10ge1xuICAgIGlmIChpc0FycmF5KHBhdGgpKSB7XG4gICAgICByZXR1cm4gcGF0aCBhcyBzdHJpbmdbXVxuICAgIH1cbiAgICBpZiAodGhpcy5pc0pzb25Qb2ludGVyKHBhdGgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJzZShwYXRoKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgaW5kZXggPSAwXG4gICAgICBjb25zdCBwYXJ0czogc3RyaW5nW10gPSBbXVxuICAgICAgd2hpbGUgKGluZGV4IDwgcGF0aC5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgbmV4dERvdCA9IHBhdGguaW5kZXhPZignLicsIGluZGV4KVxuICAgICAgICBjb25zdCBuZXh0T0IgPSBwYXRoLmluZGV4T2YoJ1snLCBpbmRleCkgLy8gbmV4dCBvcGVuIGJyYWNrZXRcbiAgICAgICAgaWYgKG5leHREb3QgPT09IC0xICYmIG5leHRPQiA9PT0gLTEpIHsgLy8gbGFzdCBpdGVtXG4gICAgICAgICAgcGFydHMucHVzaChwYXRoLnNsaWNlKGluZGV4KSlcbiAgICAgICAgICBpbmRleCA9IHBhdGgubGVuZ3RoXG4gICAgICAgIH0gZWxzZSBpZiAobmV4dERvdCAhPT0gLTEgJiYgKG5leHREb3QgPCBuZXh0T0IgfHwgbmV4dE9CID09PSAtMSkpIHsgLy8gZG90IG5vdGF0aW9uXG4gICAgICAgICAgcGFydHMucHVzaChwYXRoLnNsaWNlKGluZGV4LCBuZXh0RG90KSlcbiAgICAgICAgICBpbmRleCA9IG5leHREb3QgKyAxXG4gICAgICAgIH0gZWxzZSB7IC8vIGJyYWNrZXQgbm90YXRpb25cbiAgICAgICAgICBpZiAobmV4dE9CID4gaW5kZXgpIHtcbiAgICAgICAgICAgIHBhcnRzLnB1c2gocGF0aC5zbGljZShpbmRleCwgbmV4dE9CKSlcbiAgICAgICAgICAgIGluZGV4ID0gbmV4dE9CXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHF1b3RlID0gcGF0aC5jaGFyQXQobmV4dE9CICsgMSlcbiAgICAgICAgICBpZiAocXVvdGUgPT09ICdcIicgfHwgcXVvdGUgPT09ICdcXCcnKSB7IC8vIGVuY2xvc2luZyBxdW90ZXNcbiAgICAgICAgICAgIGxldCBuZXh0Q0IgPSBwYXRoLmluZGV4T2YocXVvdGUgKyAnXScsIG5leHRPQikgLy8gbmV4dCBjbG9zZSBicmFja2V0XG4gICAgICAgICAgICB3aGlsZSAobmV4dENCICE9PSAtMSAmJiBwYXRoLmNoYXJBdChuZXh0Q0IgLSAxKSA9PT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICAgIG5leHRDQiA9IHBhdGguaW5kZXhPZihxdW90ZSArICddJywgbmV4dENCICsgMilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXh0Q0IgPT09IC0xKSB7XG4gICAgICAgICAgICAgIG5leHRDQiA9IHBhdGgubGVuZ3RoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJ0cy5wdXNoKHBhdGguc2xpY2UoaW5kZXggKyAyLCBuZXh0Q0IpXG4gICAgICAgICAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoJ1xcXFwnICsgcXVvdGUsICdnJyksIHF1b3RlKSlcbiAgICAgICAgICAgIGluZGV4ID0gbmV4dENCICsgMlxuICAgICAgICAgIH0gZWxzZSB7IC8vIG5vIGVuY2xvc2luZyBxdW90ZXNcbiAgICAgICAgICAgIGxldCBuZXh0Q0IgPSBwYXRoLmluZGV4T2YoJ10nLCBuZXh0T0IpIC8vIG5leHQgY2xvc2UgYnJhY2tldFxuICAgICAgICAgICAgaWYgKG5leHRDQiA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgbmV4dENCID0gcGF0aC5sZW5ndGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcnRzLnB1c2gocGF0aC5zbGljZShpbmRleCArIDEsIG5leHRDQikpXG4gICAgICAgICAgICBpbmRleCA9IG5leHRDQiArIDFcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBhdGguY2hhckF0KGluZGV4KSA9PT0gJy4nKSB7XG4gICAgICAgICAgICBpbmRleCsrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcGFydHNcbiAgICB9XG4gICAgY29uc29sZS5lcnJvcigncGFyc2VPYmplY3RQYXRoIGVycm9yOiBJbnB1dCBvYmplY3QgcGF0aCBtdXN0IGJlIGEgc3RyaW5nLicpXG4gIH1cbn1cbiJdfQ==