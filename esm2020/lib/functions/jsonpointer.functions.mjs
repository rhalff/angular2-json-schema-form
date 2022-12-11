import { Injectable } from '@angular/core';
import { isDefined, isEmpty, isObject, isArray, isMap, isNumber, isString } from './validator';
import { hasOwn, copy } from './utility';
import * as i0 from "@angular/core";
export class JsonPointer {
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
    static getCopy(object, pointer, startSlice = 0, endSlice = null, getBoolean = false, errors = false) {
        const objectToCopy = this.get(object, pointer, startSlice, endSlice, getBoolean, errors);
        return this.forEachDeepCopy(objectToCopy);
    }
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
    static getFirstCopy(items, defaultValue = null) {
        return this.getFirst(items, defaultValue, true);
    }
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
    static insert(object, pointer, value) {
        const updatedObject = this.set(object, pointer, value, true);
        return updatedObject;
    }
    static insertCopy(object, pointer, value) {
        const updatedObject = this.setCopy(object, pointer, value, true);
        return updatedObject;
    }
    static remove(object, pointer) {
        const keyArray = this.parse(pointer);
        if (keyArray !== null && keyArray.length) {
            const lastKey = keyArray.pop();
            const parentObject = this.get(object, keyArray);
            if (Array.isArray(parentObject)) {
                const lastIndex = (lastKey === '-') ? parentObject.length - 1 : parseInt(lastKey, 10);
                parentObject.splice(lastIndex, 1);
            }
            else if (isObject(parentObject)) {
                delete parentObject[lastKey];
            }
            return object;
        }
        console.error(`remove error: Invalid JSON Pointer: ${pointer}`);
        return object;
    }
    static has(object, pointer) {
        return this.get(object, pointer, 0, null, true);
    }
    static dict(object) {
        const results = {};
        this.forEachDeep(object, (value, pointer) => {
            if (typeof value !== 'object') {
                results[pointer] = value;
            }
        });
        return results;
    }
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
    static forEachDeepCopy(object, fn = (v) => v, bottomUp = false, pointer = '', rootObject = object) {
        if (typeof fn !== 'function') {
            console.error(`forEachDeepCopy error: Iterator is not a function:`, fn);
            return null;
        }
        if (isObject(object) || Array.isArray(object)) {
            let newObject = Array.isArray(object) ? [...object] : { ...object };
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
    static escape(key) {
        return key.toString().replace(/~/g, '~0').replace(/\//g, '~1');
    }
    static unescape(key) {
        return key.toString().replace(/~1/g, '/').replace(/~0/g, '~');
    }
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
        if (Array.isArray(pointer)) {
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
                const nextOB = path.indexOf('[', index);
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
                        let nextCB = path.indexOf(quote + ']', nextOB);
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
                        let nextCB = path.indexOf(']', nextOB);
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
JsonPointer.ɵfac = function JsonPointer_Factory(t) { return new (t || JsonPointer)(); };
JsonPointer.ɵprov = i0.ɵɵdefineInjectable({ token: JsonPointer, factory: JsonPointer.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(JsonPointer, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbnBvaW50ZXIuZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmdzZi1jb21tb24vc3JjL2xpYi9mdW5jdGlvbnMvanNvbnBvaW50ZXIuZnVuY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUE7QUFFeEMsT0FBTyxFQUNMLFNBQVMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFDakUsTUFBTSxhQUFhLENBQUE7QUFDcEIsT0FBTyxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsTUFBTSxXQUFXLENBQUE7O0FBcUJ0QyxNQUFNLE9BQU8sV0FBVztJQWV0QixNQUFNLENBQUMsR0FBRyxDQUNSLE1BQU0sRUFDTixPQUFnQixFQUNoQixhQUFxQixDQUFDLEVBQ3RCLFdBQW1CLElBQUksRUFDdkIsYUFBc0IsS0FBSyxFQUMzQixTQUFrQixLQUFLO1FBRXZCLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtZQUNuQixPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUE7U0FDdEM7UUFDRCxJQUFJLFFBQVEsR0FBVSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUNqRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQ25ELElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQTtZQUN0QixJQUFJLFVBQVUsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pFLE9BQU8sTUFBTSxDQUFBO2FBQ2Q7WUFDRCxJQUFJLFVBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFN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Q0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUE7d0JBQ3pDLEtBQUssR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFBO3FCQUNuQjtvQkFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFO3dCQUM5QixLQUFLLEVBQUUsQ0FBQTtxQkFDUjtpQkFDRjthQUNGO1lBQ0QsT0FBTyxLQUFLLENBQUE7U0FDYjtRQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsNERBQTRELENBQUMsQ0FBQTtJQUM3RSxDQUFDOztzRUF6K0JVLFdBQVc7bURBQVgsV0FBVyxXQUFYLFdBQVc7dUZBQVgsV0FBVztjQUR2QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuXG5pbXBvcnQge1xuICBpc0RlZmluZWQsIGlzRW1wdHksIGlzT2JqZWN0LCBpc0FycmF5LCBpc01hcCwgaXNOdW1iZXIsIGlzU3RyaW5nXG59IGZyb20gJy4vdmFsaWRhdG9yJ1xuaW1wb3J0IHtoYXNPd24sIGNvcHl9IGZyb20gJy4vdXRpbGl0eSdcbmltcG9ydCB7Rm9ybUdyb3VwfSBmcm9tICdAYW5ndWxhci9mb3JtcydcblxuLyoqXG4gKiAnSnNvblBvaW50ZXInIGNsYXNzXG4gKlxuICogU29tZSB1dGlsaXRpZXMgZm9yIHVzaW5nIEpTT04gUG9pbnRlcnMgd2l0aCBKU09OIG9iamVjdHNcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2OTAxXG4gKlxuICogZ2V0LCBnZXRDb3B5LCBnZXRGaXJzdCwgc2V0LCBzZXRDb3B5LCBpbnNlcnQsIGluc2VydENvcHksIHJlbW92ZSwgaGFzLCBkaWN0LFxuICogZm9yRWFjaERlZXAsIGZvckVhY2hEZWVwQ29weSwgZXNjYXBlLCB1bmVzY2FwZSwgcGFyc2UsIGNvbXBpbGUsIHRvS2V5LFxuICogaXNKc29uUG9pbnRlciwgaXNTdWJQb2ludGVyLCB0b0luZGV4ZWRQb2ludGVyLCB0b0dlbmVyaWNQb2ludGVyLFxuICogdG9Db250cm9sUG9pbnRlciwgdG9TY2hlbWFQb2ludGVyLCB0b0RhdGFQb2ludGVyLCBwYXJzZU9iamVjdFBhdGhcbiAqXG4gKiBTb21lIGZ1bmN0aW9ucyBiYXNlZCBvbiBtYW51ZWxzdG9mZXIncyBqc29uLXBvaW50ZXIgdXRpbGl0aWVzXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWFudWVsc3RvZmVyL2pzb24tcG9pbnRlclxuICovXG5leHBvcnQgdHlwZSBQb2ludGVyID0gc3RyaW5nIHwgc3RyaW5nW11cblxuLy8gQGR5bmFtaWNcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKc29uUG9pbnRlciB7XG5cbiAgLyoqXG4gICAqICdnZXQnIGZ1bmN0aW9uXG4gICAqXG4gICAqIFVzZXMgYSBKU09OIFBvaW50ZXIgdG8gcmV0cmlldmUgYSB2YWx1ZSBmcm9tIGFuIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCAtIE9iamVjdCB0byBnZXQgdmFsdWUgZnJvbVxuICAgKiBAcGFyYW0gcG9pbnRlciAtIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICAgKiBAcGFyYW0gc3RhcnRTbGljZSAtIFplcm8tYmFzZWQgaW5kZXggb2YgZmlyc3QgUG9pbnRlciBrZXkgdG8gdXNlXG4gICAqIEBwYXJhbSBlbmRTbGljZSAtIFplcm8tYmFzZWQgaW5kZXggb2YgbGFzdCBQb2ludGVyIGtleSB0byB1c2VcbiAgICogQHBhcmFtIGdldEJvb2xlYW4gLSBSZXR1cm4gb25seSB0cnVlIG9yIGZhbHNlP1xuICAgKiBAcGFyYW0gZXJyb3JzIC0gU2hvdyBlcnJvciBpZiBub3QgZm91bmQ/XG4gICAqIEByZXR1cm4gTG9jYXRlZCB2YWx1ZSAob3IgdHJ1ZSBvciBmYWxzZSBpZiBnZXRCb29sZWFuID0gdHJ1ZSlcbiAgICovXG4gIHN0YXRpYyBnZXQoXG4gICAgb2JqZWN0LFxuICAgIHBvaW50ZXI6IFBvaW50ZXIsXG4gICAgc3RhcnRTbGljZTogbnVtYmVyID0gMCxcbiAgICBlbmRTbGljZTogbnVtYmVyID0gbnVsbCxcbiAgICBnZXRCb29sZWFuOiBib29sZWFuID0gZmFsc2UsXG4gICAgZXJyb3JzOiBib29sZWFuID0gZmFsc2VcbiAgKSB7XG4gICAgaWYgKG9iamVjdCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGdldEJvb2xlYW4gPyBmYWxzZSA6IHVuZGVmaW5lZFxuICAgIH1cbiAgICBsZXQga2V5QXJyYXk6IGFueVtdID0gdGhpcy5wYXJzZShwb2ludGVyLCBlcnJvcnMpXG4gICAgaWYgKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIGtleUFycmF5ICE9PSBudWxsKSB7XG4gICAgICBsZXQgc3ViT2JqZWN0ID0gb2JqZWN0XG4gICAgICBpZiAoc3RhcnRTbGljZSA+PSBrZXlBcnJheS5sZW5ndGggfHwgZW5kU2xpY2UgPD0gLWtleUFycmF5Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gb2JqZWN0XG4gICAgICB9XG4gICAgICBpZiAoc3RhcnRTbGljZSA8PSAta2V5QXJyYXkubGVuZ3RoKSB7XG4gICAgICAgIHN0YXJ0U2xpY2UgPSAwXG4gICAgICB9XG4gICAgICBpZiAoIWlzRGVmaW5lZChlbmRTbGljZSkgfHwgZW5kU2xpY2UgPj0ga2V5QXJyYXkubGVuZ3RoKSB7XG4gICAgICAgIGVuZFNsaWNlID0ga2V5QXJyYXkubGVuZ3RoXG4gICAgICB9XG4gICAgICBrZXlBcnJheSA9IGtleUFycmF5LnNsaWNlKHN0YXJ0U2xpY2UsIGVuZFNsaWNlKVxuICAgICAgZm9yIChsZXQga2V5IG9mIGtleUFycmF5KSB7XG4gICAgICAgIGlmIChrZXkgPT09ICctJyAmJiBpc0FycmF5KHN1Yk9iamVjdCkgJiYgc3ViT2JqZWN0Lmxlbmd0aCkge1xuICAgICAgICAgIGtleSA9IHN1Yk9iamVjdC5sZW5ndGggLSAxXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzTWFwKHN1Yk9iamVjdCkgJiYgc3ViT2JqZWN0LmhhcyhrZXkpKSB7XG4gICAgICAgICAgc3ViT2JqZWN0ID0gc3ViT2JqZWN0LmdldChrZXkpXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHN1Yk9iamVjdCA9PT0gJ29iamVjdCcgJiYgc3ViT2JqZWN0ICE9PSBudWxsICYmXG4gICAgICAgICAgaGFzT3duKHN1Yk9iamVjdCwga2V5KVxuICAgICAgICApIHtcbiAgICAgICAgICBzdWJPYmplY3QgPSBzdWJPYmplY3Rba2V5XVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYGdldCBlcnJvcjogXCIke2tleX1cIiBrZXkgbm90IGZvdW5kIGluIG9iamVjdC5gKVxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihwb2ludGVyKVxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihvYmplY3QpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBnZXRCb29sZWFuID8gZmFsc2UgOiB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGdldEJvb2xlYW4gPyB0cnVlIDogc3ViT2JqZWN0XG4gICAgfVxuICAgIGlmIChlcnJvcnMgJiYga2V5QXJyYXkgPT09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYGdldCBlcnJvcjogSW52YWxpZCBKU09OIFBvaW50ZXI6ICR7cG9pbnRlcn1gKVxuICAgIH1cbiAgICBpZiAoZXJyb3JzICYmIHR5cGVvZiBvYmplY3QgIT09ICdvYmplY3QnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdnZXQgZXJyb3I6IEludmFsaWQgb2JqZWN0OicpXG4gICAgICBjb25zb2xlLmVycm9yKG9iamVjdClcbiAgICB9XG4gICAgcmV0dXJuIGdldEJvb2xlYW4gPyBmYWxzZSA6IHVuZGVmaW5lZFxuICB9XG5cbiAgLyoqXG4gICAqICdnZXRDb3B5JyBmdW5jdGlvblxuICAgKlxuICAgKiBVc2VzIGEgSlNPTiBQb2ludGVyIHRvIGRlZXBseSBjbG9uZSBhIHZhbHVlIGZyb20gYW4gb2JqZWN0LlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IC0gT2JqZWN0IHRvIGdldCB2YWx1ZSBmcm9tXG4gICAqIEBwYXJhbSBwb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gICAqIEBwYXJhbSBzdGFydFNsaWNlIC0gWmVyby1iYXNlZCBpbmRleCBvZiBmaXJzdCBQb2ludGVyIGtleSB0byB1c2VcbiAgICogQHBhcmFtIGVuZFNsaWNlIC0gWmVyby1iYXNlZCBpbmRleCBvZiBsYXN0IFBvaW50ZXIga2V5IHRvIHVzZVxuICAgKiBAcGFyYW0gZ2V0Qm9vbGVhbiAtIFJldHVybiBvbmx5IHRydWUgb3IgZmFsc2U/XG4gICAqIEBwYXJhbSBlcnJvcnMgLSBTaG93IGVycm9yIGlmIG5vdCBmb3VuZD9cbiAgICogQHJldHVybiBMb2NhdGVkIHZhbHVlIChvciB0cnVlIG9yIGZhbHNlIGlmIGdldEJvb2xlYW4gPSB0cnVlKVxuICAgKi9cbiAgc3RhdGljIGdldENvcHkoXG4gICAgb2JqZWN0LFxuICAgIHBvaW50ZXI6IFBvaW50ZXIsXG4gICAgc3RhcnRTbGljZTogbnVtYmVyID0gMCxcbiAgICBlbmRTbGljZTogbnVtYmVyID0gbnVsbCxcbiAgICBnZXRCb29sZWFuOiBib29sZWFuID0gZmFsc2UsXG4gICAgZXJyb3JzOiBib29sZWFuID0gZmFsc2VcbiAgKSB7XG4gICAgY29uc3Qgb2JqZWN0VG9Db3B5ID1cbiAgICAgIHRoaXMuZ2V0KG9iamVjdCwgcG9pbnRlciwgc3RhcnRTbGljZSwgZW5kU2xpY2UsIGdldEJvb2xlYW4sIGVycm9ycylcbiAgICByZXR1cm4gdGhpcy5mb3JFYWNoRGVlcENvcHkob2JqZWN0VG9Db3B5KVxuICB9XG5cbiAgLyoqXG4gICAqICdnZXRGaXJzdCcgZnVuY3Rpb25cbiAgICpcbiAgICogVGFrZXMgYW4gYXJyYXkgb2YgSlNPTiBQb2ludGVycyBhbmQgb2JqZWN0cyxcbiAgICogY2hlY2tzIGVhY2ggb2JqZWN0IGZvciBhIHZhbHVlIHNwZWNpZmllZCBieSB0aGUgcG9pbnRlcixcbiAgICogYW5kIHJldHVybnMgdGhlIGZpcnN0IHZhbHVlIGZvdW5kLlxuICAgKlxuICAgKiBAcGFyYW0gaXRlbXMgLSBBcnJheSBvZiBvYmplY3RzIGFuZCBwb2ludGVycyB0byBjaGVja1xuICAgKiBAcGFyYW0gZGVmYXVsdFZhbHVlIC0gVmFsdWUgdG8gcmV0dXJuIGlmIG5vdGhpbmcgZm91bmRcbiAgICogQHBhcmFtIGdldENvcHkgLSBSZXR1cm4gYSBjb3B5IGluc3RlYWQ/XG4gICAqIEByZXR1cm4gRmlyc3QgdmFsdWUgZm91bmRcbiAgICovXG4gIHN0YXRpYyBnZXRGaXJzdChcbiAgICBpdGVtczogQXJyYXk8b2JqZWN0IHwgUG9pbnRlcj4sXG4gICAgZGVmYXVsdFZhbHVlOiBhbnkgPSBudWxsLFxuICAgIGdldENvcHkgPSBmYWxzZVxuICApIHtcbiAgICBpZiAoaXNFbXB0eShpdGVtcykpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoaXNBcnJheShpdGVtcykpIHtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICBpZiAoaXNFbXB0eShpdGVtKSkge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXJyYXkoaXRlbSkgJiYgKGl0ZW0gYXMgc3RyaW5nW10pLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgaWYgKGlzRW1wdHkoaXRlbVswXSkgfHwgaXNFbXB0eShpdGVtWzFdKSkge1xuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRDb3B5ID9cbiAgICAgICAgICAgIHRoaXMuZ2V0Q29weShpdGVtWzBdLCBpdGVtWzFdKSA6XG4gICAgICAgICAgICB0aGlzLmdldChpdGVtWzBdLCBpdGVtWzFdKVxuICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5lcnJvcignZ2V0Rmlyc3QgZXJyb3I6IElucHV0IG5vdCBpbiBjb3JyZWN0IGZvcm1hdC5cXG4nICtcbiAgICAgICAgICAnU2hvdWxkIGJlOiBbIFsgb2JqZWN0MSwgcG9pbnRlcjEgXSwgWyBvYmplY3QgMiwgcG9pbnRlcjIgXSwgZXRjLi4uIF0nKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHJldHVybiBkZWZhdWx0VmFsdWVcbiAgICB9XG4gICAgaWYgKGlzTWFwKGl0ZW1zKSkge1xuICAgICAgZm9yIChjb25zdCBbb2JqZWN0LCBwb2ludGVyXSBvZiAoaXRlbXMgYXMgYW55KSkge1xuICAgICAgICBpZiAob2JqZWN0ID09PSBudWxsIHx8ICF0aGlzLmlzSnNvblBvaW50ZXIocG9pbnRlcikpIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0Q29weSA/XG4gICAgICAgICAgdGhpcy5nZXRDb3B5KG9iamVjdCwgcG9pbnRlcikgOlxuICAgICAgICAgIHRoaXMuZ2V0KG9iamVjdCwgcG9pbnRlcilcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBkZWZhdWx0VmFsdWVcbiAgICB9XG4gICAgY29uc29sZS5lcnJvcignZ2V0Rmlyc3QgZXJyb3I6IElucHV0IG5vdCBpbiBjb3JyZWN0IGZvcm1hdC5cXG4nICtcbiAgICAgICdTaG91bGQgYmU6IFsgWyBvYmplY3QxLCBwb2ludGVyMSBdLCBbIG9iamVjdCAyLCBwb2ludGVyMiBdLCBldGMuLi4gXScpXG4gICAgcmV0dXJuIGRlZmF1bHRWYWx1ZVxuICB9XG5cbiAgLyoqXG4gICAqICdnZXRGaXJzdENvcHknIGZ1bmN0aW9uXG4gICAqXG4gICAqIFNpbWlsYXIgdG8gZ2V0Rmlyc3QsIGJ1dCBhbHdheXMgcmV0dXJucyBhIGNvcHkuXG4gICAqXG4gICAqIEBwYXJhbSBpdGVtcyAtIEFycmF5IG9mIG9iamVjdHMgYW5kIHBvaW50ZXJzIHRvIGNoZWNrXG4gICAqIEBwYXJhbSBkZWZhdWx0VmFsdWUgLSBWYWx1ZSB0byByZXR1cm4gaWYgbm90aGluZyBmb3VuZFxuICAgKiBAcmV0dXJuIENvcHkgb2YgZmlyc3QgdmFsdWUgZm91bmRcbiAgICovXG4gIHN0YXRpYyBnZXRGaXJzdENvcHkoXG4gICAgaXRlbXM6IEFycmF5PG9iamVjdCB8IFBvaW50ZXI+LFxuICAgIGRlZmF1bHRWYWx1ZTogYW55ID0gbnVsbFxuICApIHtcbiAgICByZXR1cm4gdGhpcy5nZXRGaXJzdChpdGVtcywgZGVmYXVsdFZhbHVlLCB0cnVlKVxuICB9XG5cbiAgLyoqXG4gICAqICdzZXQnIGZ1bmN0aW9uXG4gICAqXG4gICAqIFVzZXMgYSBKU09OIFBvaW50ZXIgdG8gc2V0IGEgdmFsdWUgb24gYW4gb2JqZWN0LlxuICAgKiBBbHNvIGNyZWF0ZXMgYW55IG1pc3Npbmcgc3ViIG9iamVjdHMgb3IgYXJyYXlzIHRvIGNvbnRhaW4gdGhhdCB2YWx1ZS5cbiAgICpcbiAgICogSWYgdGhlIG9wdGlvbmFsIGZvdXJ0aCBwYXJhbWV0ZXIgaXMgVFJVRSBhbmQgdGhlIGlubmVyLW1vc3QgY29udGFpbmVyXG4gICAqIGlzIGFuIGFycmF5LCB0aGUgZnVuY3Rpb24gd2lsbCBpbnNlcnQgdGhlIHZhbHVlIGFzIGEgbmV3IGl0ZW0gYXQgdGhlXG4gICAqIHNwZWNpZmllZCBsb2NhdGlvbiBpbiB0aGUgYXJyYXksIHJhdGhlciB0aGFuIG92ZXJ3cml0aW5nIHRoZSBleGlzdGluZ1xuICAgKiB2YWx1ZSAoaWYgYW55KSBhdCB0aGF0IGxvY2F0aW9uLlxuICAgKlxuICAgKiBTbyBzZXQoWzEsIDIsIDNdLCAnLzEnLCA0KSA9PiBbMSwgNCwgM11cbiAgICogYW5kXG4gICAqIFNvIHNldChbMSwgMiwgM10sICcvMScsIDQsIHRydWUpID0+IFsxLCA0LCAyLCAzXVxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IC0gVGhlIG9iamVjdCB0byBzZXQgdmFsdWUgaW5cbiAgICogQHBhcmFtIHBvaW50ZXIgLSBUaGUgSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSBuZXcgdmFsdWUgdG8gc2V0XG4gICAqIEBwYXJhbSBpbnNlcnQgLSBpbnNlcnQgdmFsdWU/XG4gICAqIEByZXR1cm4gVGhlIG9yaWdpbmFsIG9iamVjdCwgbW9kaWZpZWQgd2l0aCB0aGUgc2V0IHZhbHVlXG4gICAqL1xuICBzdGF0aWMgc2V0KFxuICAgIG9iamVjdDogb2JqZWN0LFxuICAgIHBvaW50ZXI6IFBvaW50ZXIsXG4gICAgdmFsdWU6IGFueSxcbiAgICBpbnNlcnQgPSBmYWxzZVxuICApIHtcbiAgICBjb25zdCBrZXlBcnJheSA9IHRoaXMucGFyc2UocG9pbnRlcilcbiAgICBpZiAoa2V5QXJyYXkgIT09IG51bGwgJiYga2V5QXJyYXkubGVuZ3RoKSB7XG4gICAgICBsZXQgc3ViT2JqZWN0OiBhbnkgPSBvYmplY3RcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5QXJyYXkubGVuZ3RoIC0gMTsgKytpKSB7XG4gICAgICAgIGxldCBrZXkgPSBrZXlBcnJheVtpXVxuICAgICAgICBpZiAoa2V5ID09PSAnLScgJiYgaXNBcnJheShzdWJPYmplY3QpKSB7XG4gICAgICAgICAga2V5ID0gc3ViT2JqZWN0Lmxlbmd0aFxuICAgICAgICB9XG4gICAgICAgIGlmIChpc01hcChzdWJPYmplY3QpICYmIHN1Yk9iamVjdC5oYXMoa2V5KSkge1xuICAgICAgICAgIHN1Yk9iamVjdCA9IHN1Yk9iamVjdC5nZXQoa2V5KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICghaGFzT3duKHN1Yk9iamVjdCwga2V5KSkge1xuICAgICAgICAgICAgc3ViT2JqZWN0W2tleV0gPSAoa2V5QXJyYXlbaSArIDFdLm1hdGNoKC9eKFxcZCt8LSkkLykpID8gW10gOiB7fVxuICAgICAgICAgIH1cbiAgICAgICAgICBzdWJPYmplY3QgPSBzdWJPYmplY3Rba2V5XVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBsYXN0S2V5ID0ga2V5QXJyYXlba2V5QXJyYXkubGVuZ3RoIC0gMV1cbiAgICAgIGlmIChpc0FycmF5KHN1Yk9iamVjdCkgJiYgbGFzdEtleSA9PT0gJy0nKSB7XG4gICAgICAgIHN1Yk9iamVjdC5wdXNoKHZhbHVlKVxuICAgICAgfSBlbHNlIGlmIChpbnNlcnQgJiYgaXNBcnJheShzdWJPYmplY3QpICYmICFpc05hTigrbGFzdEtleSkpIHtcbiAgICAgICAgc3ViT2JqZWN0LnNwbGljZShsYXN0S2V5LCAwLCB2YWx1ZSlcbiAgICAgIH0gZWxzZSBpZiAoaXNNYXAoc3ViT2JqZWN0KSkge1xuICAgICAgICBzdWJPYmplY3Quc2V0KGxhc3RLZXksIHZhbHVlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3ViT2JqZWN0W2xhc3RLZXldID0gdmFsdWVcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmplY3RcbiAgICB9XG4gICAgY29uc29sZS5lcnJvcihgc2V0IGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlcjogJHtwb2ludGVyfWApXG4gICAgcmV0dXJuIG9iamVjdFxuICB9XG5cbiAgLyoqXG4gICAqICdzZXRDb3B5JyBmdW5jdGlvblxuICAgKlxuICAgKiBDb3BpZXMgYW4gb2JqZWN0IGFuZCB1c2VzIGEgSlNPTiBQb2ludGVyIHRvIHNldCBhIHZhbHVlIG9uIHRoZSBjb3B5LlxuICAgKiBBbHNvIGNyZWF0ZXMgYW55IG1pc3Npbmcgc3ViIG9iamVjdHMgb3IgYXJyYXlzIHRvIGNvbnRhaW4gdGhhdCB2YWx1ZS5cbiAgICpcbiAgICogSWYgdGhlIG9wdGlvbmFsIGZvdXJ0aCBwYXJhbWV0ZXIgaXMgVFJVRSBhbmQgdGhlIGlubmVyLW1vc3QgY29udGFpbmVyXG4gICAqIGlzIGFuIGFycmF5LCB0aGUgZnVuY3Rpb24gd2lsbCBpbnNlcnQgdGhlIHZhbHVlIGFzIGEgbmV3IGl0ZW0gYXQgdGhlXG4gICAqIHNwZWNpZmllZCBsb2NhdGlvbiBpbiB0aGUgYXJyYXksIHJhdGhlciB0aGFuIG92ZXJ3cml0aW5nIHRoZSBleGlzdGluZyB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCAtIFRoZSBvYmplY3QgdG8gY29weSBhbmQgc2V0IHZhbHVlIGluXG4gICAqIEBwYXJhbSBwb2ludGVyIC0gVGhlIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gc2V0XG4gICAqIEBwYXJhbSBpbnNlcnQgLSBpbnNlcnQgdmFsdWU/XG4gICAqIEByZXR1cm4gVGhlIG5ldyBvYmplY3Qgd2l0aCB0aGUgc2V0IHZhbHVlXG4gICAqL1xuICBzdGF0aWMgc2V0Q29weShcbiAgICBvYmplY3Q6IG9iamVjdCxcbiAgICBwb2ludGVyOiBQb2ludGVyLFxuICAgIHZhbHVlOiBhbnksXG4gICAgaW5zZXJ0ID0gZmFsc2VcbiAgKSB7XG4gICAgY29uc3Qga2V5QXJyYXkgPSB0aGlzLnBhcnNlKHBvaW50ZXIpXG4gICAgaWYgKGtleUFycmF5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBuZXdPYmplY3QgPSBjb3B5KG9iamVjdClcbiAgICAgIGxldCBzdWJPYmplY3QgPSBuZXdPYmplY3RcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5QXJyYXkubGVuZ3RoIC0gMTsgKytpKSB7XG4gICAgICAgIGxldCBrZXkgPSBrZXlBcnJheVtpXVxuICAgICAgICBpZiAoa2V5ID09PSAnLScgJiYgaXNBcnJheShzdWJPYmplY3QpKSB7XG4gICAgICAgICAga2V5ID0gc3ViT2JqZWN0Lmxlbmd0aFxuICAgICAgICB9XG4gICAgICAgIGlmIChpc01hcChzdWJPYmplY3QpICYmIHN1Yk9iamVjdC5oYXMoa2V5KSkge1xuICAgICAgICAgIHN1Yk9iamVjdC5zZXQoa2V5LCBjb3B5KHN1Yk9iamVjdC5nZXQoa2V5KSkpXG4gICAgICAgICAgc3ViT2JqZWN0ID0gc3ViT2JqZWN0LmdldChrZXkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCFoYXNPd24oc3ViT2JqZWN0LCBrZXkpKSB7XG4gICAgICAgICAgICBzdWJPYmplY3Rba2V5XSA9IChrZXlBcnJheVtpICsgMV0ubWF0Y2goL14oXFxkK3wtKSQvKSkgPyBbXSA6IHt9XG4gICAgICAgICAgfVxuICAgICAgICAgIHN1Yk9iamVjdFtrZXldID0gY29weShzdWJPYmplY3Rba2V5XSlcbiAgICAgICAgICBzdWJPYmplY3QgPSBzdWJPYmplY3Rba2V5XVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBsYXN0S2V5ID0ga2V5QXJyYXlba2V5QXJyYXkubGVuZ3RoIC0gMV1cbiAgICAgIGlmIChpc0FycmF5KHN1Yk9iamVjdCkgJiYgbGFzdEtleSA9PT0gJy0nKSB7XG4gICAgICAgIHN1Yk9iamVjdC5wdXNoKHZhbHVlKVxuICAgICAgfSBlbHNlIGlmIChpbnNlcnQgJiYgaXNBcnJheShzdWJPYmplY3QpICYmICFpc05hTigrbGFzdEtleSkpIHtcbiAgICAgICAgc3ViT2JqZWN0LnNwbGljZShsYXN0S2V5LCAwLCB2YWx1ZSlcbiAgICAgIH0gZWxzZSBpZiAoaXNNYXAoc3ViT2JqZWN0KSkge1xuICAgICAgICBzdWJPYmplY3Quc2V0KGxhc3RLZXksIHZhbHVlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3ViT2JqZWN0W2xhc3RLZXldID0gdmFsdWVcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXdPYmplY3RcbiAgICB9XG4gICAgY29uc29sZS5lcnJvcihgc2V0Q29weSBlcnJvcjogSW52YWxpZCBKU09OIFBvaW50ZXI6ICR7cG9pbnRlcn1gKVxuICAgIHJldHVybiBvYmplY3RcbiAgfVxuXG4gIC8qKlxuICAgKiAnaW5zZXJ0JyBmdW5jdGlvblxuICAgKlxuICAgKiBDYWxscyAnc2V0JyB3aXRoIGluc2VydCA9IFRSVUVcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCAtIG9iamVjdCB0byBpbnNlcnQgdmFsdWUgaW5cbiAgICogQHBhcmFtIHBvaW50ZXIgLSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSlcbiAgICogQHBhcmFtIHZhbHVlIC0gdmFsdWUgdG8gaW5zZXJ0XG4gICAqL1xuICBzdGF0aWMgaW5zZXJ0KFxuICAgIG9iamVjdDogb2JqZWN0LFxuICAgIHBvaW50ZXI6IFBvaW50ZXIsXG4gICAgdmFsdWU6IGFueVxuICApIHtcbiAgICBjb25zdCB1cGRhdGVkT2JqZWN0ID0gdGhpcy5zZXQob2JqZWN0LCBwb2ludGVyLCB2YWx1ZSwgdHJ1ZSlcbiAgICByZXR1cm4gdXBkYXRlZE9iamVjdFxuICB9XG5cbiAgLyoqXG4gICAqICdpbnNlcnRDb3B5JyBmdW5jdGlvblxuICAgKlxuICAgKiBDYWxscyAnc2V0Q29weScgd2l0aCBpbnNlcnQgPSBUUlVFXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgLSBvYmplY3QgdG8gaW5zZXJ0IHZhbHVlIGluXG4gICAqIEBwYXJhbSBwb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gICAqIEBwYXJhbSB2YWx1ZSAtIHZhbHVlIHRvIGluc2VydFxuICAgKi9cbiAgc3RhdGljIGluc2VydENvcHkoXG4gICAgb2JqZWN0OiBvYmplY3QsXG4gICAgcG9pbnRlcjogUG9pbnRlcixcbiAgICB2YWx1ZTogYW55XG4gICkge1xuICAgIGNvbnN0IHVwZGF0ZWRPYmplY3QgPSB0aGlzLnNldENvcHkob2JqZWN0LCBwb2ludGVyLCB2YWx1ZSwgdHJ1ZSlcbiAgICByZXR1cm4gdXBkYXRlZE9iamVjdFxuICB9XG5cbiAgLyoqXG4gICAqICdyZW1vdmUnIGZ1bmN0aW9uXG4gICAqXG4gICAqIFVzZXMgYSBKU09OIFBvaW50ZXIgdG8gcmVtb3ZlIGEga2V5IGFuZCBpdHMgYXR0cmlidXRlIGZyb20gYW4gb2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgLSBvYmplY3QgdG8gZGVsZXRlIGF0dHJpYnV0ZSBmcm9tXG4gICAqIEBwYXJhbSBwb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gICAqL1xuICBzdGF0aWMgcmVtb3ZlKFxuICAgIG9iamVjdDogb2JqZWN0LFxuICAgIHBvaW50ZXI6IFBvaW50ZXJcbiAgKSB7XG4gICAgY29uc3Qga2V5QXJyYXkgPSB0aGlzLnBhcnNlKHBvaW50ZXIpXG4gICAgaWYgKGtleUFycmF5ICE9PSBudWxsICYmIGtleUFycmF5Lmxlbmd0aCkge1xuICAgICAgY29uc3QgbGFzdEtleSA9IGtleUFycmF5LnBvcCgpXG4gICAgICBjb25zdCBwYXJlbnRPYmplY3QgPSB0aGlzLmdldChvYmplY3QsIGtleUFycmF5KVxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGFyZW50T2JqZWN0KSkge1xuICAgICAgICBjb25zdCBsYXN0SW5kZXggPSAobGFzdEtleSA9PT0gJy0nKSA/IHBhcmVudE9iamVjdC5sZW5ndGggLSAxIDogcGFyc2VJbnQobGFzdEtleSwgMTApXG5cbiAgICAgICAgcGFyZW50T2JqZWN0LnNwbGljZShsYXN0SW5kZXgsIDEpXG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHBhcmVudE9iamVjdCkpIHtcbiAgICAgICAgZGVsZXRlIHBhcmVudE9iamVjdFtsYXN0S2V5XVxuICAgICAgfVxuICAgICAgcmV0dXJuIG9iamVjdFxuICAgIH1cbiAgICBjb25zb2xlLmVycm9yKGByZW1vdmUgZXJyb3I6IEludmFsaWQgSlNPTiBQb2ludGVyOiAke3BvaW50ZXJ9YClcbiAgICByZXR1cm4gb2JqZWN0XG4gIH1cblxuICAvKipcbiAgICogJ2hhcycgZnVuY3Rpb25cbiAgICpcbiAgICogVGVzdHMgaWYgYW4gb2JqZWN0IGhhcyBhIHZhbHVlIGF0IHRoZSBsb2NhdGlvbiBzcGVjaWZpZWQgYnkgYSBKU09OIFBvaW50ZXJcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCAtIG9iamVjdCB0byBjaGVrIGZvciB2YWx1ZVxuICAgKiBAcGFyYW0gcG9pbnRlciAtIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICAgKi9cbiAgc3RhdGljIGhhcyhcbiAgICBvYmplY3Q6IG9iamVjdCxcbiAgICBwb2ludGVyOiBQb2ludGVyXG4gICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdldChvYmplY3QsIHBvaW50ZXIsIDAsIG51bGwsIHRydWUpXG4gIH1cblxuICAvKipcbiAgICogJ2RpY3QnIGZ1bmN0aW9uXG4gICAqXG4gICAqIFJldHVybnMgYSAocG9pbnRlciAtPiB2YWx1ZSkgZGljdGlvbmFyeSBmb3IgYW4gb2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgLSBUaGUgb2JqZWN0IHRvIGNyZWF0ZSBhIGRpY3Rpb25hcnkgZnJvbVxuICAgKiBAcmV0dXJuIFRoZSByZXN1bHRpbmcgZGljdGlvbmFyeSBvYmplY3RcbiAgICovXG4gIHN0YXRpYyBkaWN0KG9iamVjdDogb2JqZWN0KSB7XG4gICAgY29uc3QgcmVzdWx0czogYW55ID0ge31cbiAgICB0aGlzLmZvckVhY2hEZWVwKG9iamVjdCwgKHZhbHVlLCBwb2ludGVyKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXN1bHRzW3BvaW50ZXJdID0gdmFsdWVcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiByZXN1bHRzXG4gIH1cblxuICAvKipcbiAgICogJ2ZvckVhY2hEZWVwJyBmdW5jdGlvblxuICAgKlxuICAgKiBJdGVyYXRlcyBvdmVyIG93biBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgYW4gb2JqZWN0IG9yIGl0ZW1zIGluIGFuIGFycmF5XG4gICAqIGFuZCBpbnZva2VzIGFuIGl0ZXJhdGVlIGZ1bmN0aW9uIGZvciBlYWNoIGtleS92YWx1ZSBvciBpbmRleC92YWx1ZSBwYWlyLlxuICAgKiBCeSBkZWZhdWx0LCBpdGVyYXRlcyBvdmVyIGl0ZW1zIHdpdGhpbiBvYmplY3RzIGFuZCBhcnJheXMgYWZ0ZXIgY2FsbGluZ1xuICAgKiB0aGUgaXRlcmF0ZWUgZnVuY3Rpb24gb24gdGhlIGNvbnRhaW5pbmcgb2JqZWN0IG9yIGFycmF5IGl0c2VsZi5cbiAgICpcbiAgICogVGhlIGl0ZXJhdGVlIGlzIGludm9rZWQgd2l0aCB0aHJlZSBhcmd1bWVudHM6ICh2YWx1ZSwgcG9pbnRlciwgcm9vdE9iamVjdCksXG4gICAqIHdoZXJlIHBvaW50ZXIgaXMgYSBKU09OIHBvaW50ZXIgaW5kaWNhdGluZyB0aGUgbG9jYXRpb24gb2YgdGhlIGN1cnJlbnRcbiAgICogdmFsdWUgd2l0aGluIHRoZSByb290IG9iamVjdCwgYW5kIHJvb3RPYmplY3QgaXMgdGhlIHJvb3Qgb2JqZWN0IGluaXRpYWxseVxuICAgKiBzdWJtaXR0ZWQgdG8gdGggZnVuY3Rpb24uXG4gICAqXG4gICAqIElmIGEgdGhpcmQgb3B0aW9uYWwgcGFyYW1ldGVyICdib3R0b21VcCcgaXMgc2V0IHRvIFRSVUUsIHRoZSBpdGVyYXRvclxuICAgKiBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBvbiBzdWItb2JqZWN0cyBhbmQgYXJyYXlzIGFmdGVyIGJlaW5nXG4gICAqIGNhbGxlZCBvbiB0aGVpciBjb250ZW50cywgcmF0aGVyIHRoYW4gYmVmb3JlLCB3aGljaCBpcyB0aGUgZGVmYXVsdC5cbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbiBjYW4gYWxzbyBvcHRpb25hbGx5IGJlIGNhbGxlZCBkaXJlY3RseSBvbiBhIHN1Yi1vYmplY3QgYnlcbiAgICogaW5jbHVkaW5nIG9wdGlvbmFsIDR0aCBhbmQgNXRoIHBhcmFtZXRlcnMgdG8gc3BlY2lmeSB0aGUgaW5pdGlhbFxuICAgKiByb290IG9iamVjdCBhbmQgcG9pbnRlci5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCAtIHRoZSBpbml0aWFsIG9iamVjdCBvciBhcnJheVxuICAgKiBAcGFyYW0gZm4gLSBpdGVyYXRlZSBmdW5jdGlvblxuICAgKiBAcGFyYW0gYm90dG9tVXAgLSBvcHRpb25hbCwgc2V0IHRvIFRSVUUgdG8gcmV2ZXJzZSBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHBvaW50ZXIgLSBvcHRpb25hbCwgSlNPTiBQb2ludGVyIHRvIG9iamVjdCB3aXRoaW4gcm9vdE9iamVjdFxuICAgKiBAcGFyYW0gcm9vdE9iamVjdCAtIG9wdGlvbmFsLCByb290IG9iamVjdCBvciBhcnJheVxuICAgKiBAcmV0dXJuIFRoZSBtb2RpZmllZCBvYmplY3RcbiAgICovXG4gIHN0YXRpYyBmb3JFYWNoRGVlcChcbiAgICBvYmplY3QsXG4gICAgZm46ICh2OiBhbnksIHA/OiBzdHJpbmcsIG8/OiBhbnkpID0+IGFueSA9ICh2KSA9PiB2LFxuICAgIGJvdHRvbVVwID0gZmFsc2UsXG4gICAgcG9pbnRlciA9ICcnLFxuICAgIHJvb3RPYmplY3QgPSBvYmplY3RcbiAgKSB7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS5lcnJvcihgZm9yRWFjaERlZXAgZXJyb3I6IEl0ZXJhdG9yIGlzIG5vdCBhIGZ1bmN0aW9uOmAsIGZuKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICghYm90dG9tVXApIHtcbiAgICAgIGZuKG9iamVjdCwgcG9pbnRlciwgcm9vdE9iamVjdClcbiAgICB9XG4gICAgaWYgKGlzT2JqZWN0KG9iamVjdCkgfHwgaXNBcnJheShvYmplY3QpKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhvYmplY3QpKSB7XG4gICAgICAgIGNvbnN0IG5ld1BvaW50ZXIgPSBwb2ludGVyICsgJy8nICsgdGhpcy5lc2NhcGUoa2V5KVxuICAgICAgICB0aGlzLmZvckVhY2hEZWVwKG9iamVjdFtrZXldLCBmbiwgYm90dG9tVXAsIG5ld1BvaW50ZXIsIHJvb3RPYmplY3QpXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChib3R0b21VcCkge1xuICAgICAgZm4ob2JqZWN0LCBwb2ludGVyLCByb290T2JqZWN0KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnZm9yRWFjaERlZXBDb3B5JyBmdW5jdGlvblxuICAgKlxuICAgKiBTaW1pbGFyIHRvIGZvckVhY2hEZWVwLCBidXQgcmV0dXJucyBhIGNvcHkgb2YgdGhlIG9yaWdpbmFsIG9iamVjdCwgd2l0aFxuICAgKiB0aGUgc2FtZSBrZXlzIGFuZCBpbmRleGVzLCBidXQgd2l0aCB2YWx1ZXMgcmVwbGFjZWQgd2l0aCB0aGUgcmVzdWx0IG9mXG4gICAqIHRoZSBpdGVyYXRlZSBmdW5jdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCAtIHRoZSBpbml0aWFsIG9iamVjdCBvciBhcnJheVxuICAgKiBAcGFyYW0gZm4gLSBpdGVyYXRlZSBmdW5jdGlvblxuICAgKiBAcGFyYW0gYm90dG9tVXAgLSBvcHRpb25hbCwgc2V0IHRvIFRSVUUgdG8gcmV2ZXJzZSBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHBvaW50ZXIgLSBvcHRpb25hbCwgSlNPTiBQb2ludGVyIHRvIG9iamVjdCB3aXRoaW4gcm9vdE9iamVjdFxuICAgKiBAcGFyYW0gcm9vdE9iamVjdCAtIG9wdGlvbmFsLCByb290IG9iamVjdCBvciBhcnJheVxuICAgKiBAcmV0dXJuIFRoZSBjb3BpZWQgb2JqZWN0XG4gICAqL1xuICBzdGF0aWMgZm9yRWFjaERlZXBDb3B5KFxuICAgIG9iamVjdDogb2JqZWN0LFxuICAgIGZuOiAodjogYW55LCBwPzogc3RyaW5nLCBvPzogYW55KSA9PiBhbnkgPSAodikgPT4gdixcbiAgICBib3R0b21VcDogYm9vbGVhbiA9IGZhbHNlLFxuICAgIHBvaW50ZXI6IHN0cmluZyA9ICcnLFxuICAgIHJvb3RPYmplY3Q6IG9iamVjdCA9IG9iamVjdFxuICApIHtcbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBmb3JFYWNoRGVlcENvcHkgZXJyb3I6IEl0ZXJhdG9yIGlzIG5vdCBhIGZ1bmN0aW9uOmAsIGZuKVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgaWYgKGlzT2JqZWN0KG9iamVjdCkgfHwgQXJyYXkuaXNBcnJheShvYmplY3QpKSB7XG4gICAgICBsZXQgbmV3T2JqZWN0ID0gQXJyYXkuaXNBcnJheShvYmplY3QpID8gWy4uLm9iamVjdF0gOiB7Li4ub2JqZWN0fVxuICAgICAgaWYgKCFib3R0b21VcCkge1xuICAgICAgICBuZXdPYmplY3QgPSBmbihuZXdPYmplY3QsIHBvaW50ZXIsIHJvb3RPYmplY3QpXG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhuZXdPYmplY3QpKSB7XG4gICAgICAgIGNvbnN0IG5ld1BvaW50ZXIgPSBwb2ludGVyICsgJy8nICsgdGhpcy5lc2NhcGUoa2V5KVxuICAgICAgICBuZXdPYmplY3Rba2V5XSA9IHRoaXMuZm9yRWFjaERlZXBDb3B5KFxuICAgICAgICAgIG5ld09iamVjdFtrZXldLCBmbiwgYm90dG9tVXAsIG5ld1BvaW50ZXIsIHJvb3RPYmplY3RcbiAgICAgICAgKVxuICAgICAgfVxuICAgICAgaWYgKGJvdHRvbVVwKSB7XG4gICAgICAgIG5ld09iamVjdCA9IGZuKG5ld09iamVjdCwgcG9pbnRlciwgcm9vdE9iamVjdClcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXdPYmplY3RcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZuKG9iamVjdCwgcG9pbnRlciwgcm9vdE9iamVjdClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ2VzY2FwZScgZnVuY3Rpb25cbiAgICpcbiAgICogRXNjYXBlcyBhIHN0cmluZyByZWZlcmVuY2Uga2V5XG4gICAqXG4gICAqIEBwYXJhbSBrZXkgLSBzdHJpbmcga2V5IHRvIGVzY2FwZVxuICAgKiBAcmV0dXJuIGVzY2FwZWQga2V5XG4gICAqL1xuICBzdGF0aWMgZXNjYXBlKGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4ga2V5LnRvU3RyaW5nKCkucmVwbGFjZSgvfi9nLCAnfjAnKS5yZXBsYWNlKC9cXC8vZywgJ34xJylcbiAgfVxuXG4gIC8qKlxuICAgKiAndW5lc2NhcGUnIGZ1bmN0aW9uXG4gICAqXG4gICAqIFVuZXNjYXBlcyBhIHN0cmluZyByZWZlcmVuY2Uga2V5XG4gICAqXG4gICAqIEBwYXJhbSBrZXkgLSBzdHJpbmcga2V5IHRvIHVuZXNjYXBlXG4gICAqIEByZXR1cm4gdW5lc2NhcGVkIGtleVxuICAgKi9cbiAgc3RhdGljIHVuZXNjYXBlKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGtleS50b1N0cmluZygpLnJlcGxhY2UoL34xL2csICcvJykucmVwbGFjZSgvfjAvZywgJ34nKVxuICB9XG5cbiAgLyoqXG4gICAqICdwYXJzZScgZnVuY3Rpb25cbiAgICpcbiAgICogQ29udmVydHMgYSBzdHJpbmcgSlNPTiBQb2ludGVyIGludG8gYSBhcnJheSBvZiBrZXlzXG4gICAqIChpZiBpbnB1dCBpcyBhbHJlYWR5IGFuIGFuIGFycmF5IG9mIGtleXMsIGl0IGlzIHJldHVybmVkIHVuY2hhbmdlZClcbiAgICpcbiAgICogQHBhcmFtIHBvaW50ZXIgLSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSlcbiAgICogQHBhcmFtIGVycm9ycyAtIFNob3cgZXJyb3IgaWYgaW52YWxpZCBwb2ludGVyP1xuICAgKiBAcmV0dXJuIEpTT04gUG9pbnRlciBhcnJheSBvZiBrZXlzXG4gICAqL1xuICBzdGF0aWMgcGFyc2UoXG4gICAgcG9pbnRlcjogUG9pbnRlcixcbiAgICBlcnJvcnM6IGJvb2xlYW4gPSBmYWxzZVxuICApOiBzdHJpbmdbXSB7XG4gICAgaWYgKCF0aGlzLmlzSnNvblBvaW50ZXIocG9pbnRlcikpIHtcbiAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgcGFyc2UgZXJyb3I6IEludmFsaWQgSlNPTiBQb2ludGVyOiAke3BvaW50ZXJ9YClcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGlmIChpc0FycmF5KHBvaW50ZXIpKSB7XG4gICAgICByZXR1cm4gcG9pbnRlciBhcyBzdHJpbmdbXVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHBvaW50ZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAocG9pbnRlclswXSA9PT0gJyMnKSB7XG4gICAgICAgIHBvaW50ZXIgPSBwb2ludGVyLnNsaWNlKDEpXG4gICAgICB9XG4gICAgICBpZiAocG9pbnRlciA9PT0gJycgfHwgcG9pbnRlciA9PT0gJy8nKSB7XG4gICAgICAgIHJldHVybiBbXVxuICAgICAgfVxuICAgICAgcmV0dXJuIHBvaW50ZXIuc2xpY2UoMSkuc3BsaXQoJy8nKS5tYXAodGhpcy51bmVzY2FwZSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ2NvbXBpbGUnIGZ1bmN0aW9uXG4gICAqXG4gICAqIENvbnZlcnRzIGFuIGFycmF5IG9mIGtleXMgaW50byBhIEpTT04gUG9pbnRlciBzdHJpbmdcbiAgICogKGlmIGlucHV0IGlzIGFscmVhZHkgYSBzdHJpbmcsIGl0IGlzIG5vcm1hbGl6ZWQgYW5kIHJldHVybmVkKVxuICAgKlxuICAgKiBUaGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlciBpcyBhIGRlZmF1bHQgd2hpY2ggd2lsbCByZXBsYWNlIGFueSBlbXB0eSBrZXlzLlxuICAgKlxuICAgKiBAcGFyYW0gcG9pbnRlciAtIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICAgKiBAcGFyYW0gZGVmYXVsdFZhbHVlIC0gRGVmYXVsdCB2YWx1ZVxuICAgKiBAcGFyYW0gZXJyb3JzIC0gU2hvdyBlcnJvciBpZiBpbnZhbGlkIHBvaW50ZXI/XG4gICAqIEByZXR1cm4gSlNPTiBQb2ludGVyIHN0cmluZ1xuICAgKi9cbiAgc3RhdGljIGNvbXBpbGUoXG4gICAgcG9pbnRlcjogUG9pbnRlcixcbiAgICBkZWZhdWx0VmFsdWU6IHN0cmluZyB8IG51bWJlciA9ICcnLFxuICAgIGVycm9yczogYm9vbGVhbiA9IGZhbHNlXG4gICk6IHN0cmluZyB7XG4gICAgaWYgKHBvaW50ZXIgPT09ICcjJykge1xuICAgICAgcmV0dXJuICcnXG4gICAgfVxuICAgIGlmICghdGhpcy5pc0pzb25Qb2ludGVyKHBvaW50ZXIpKSB7XG4gICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYGNvbXBpbGUgZXJyb3I6IEludmFsaWQgSlNPTiBQb2ludGVyOiAke3BvaW50ZXJ9YClcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KHBvaW50ZXIpKSB7XG4gICAgICBpZiAocG9pbnRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuICcnXG4gICAgICB9XG4gICAgICByZXR1cm4gJy8nICsgcG9pbnRlci5tYXAoXG4gICAgICAgIGtleSA9PiBrZXkgPT09ICcnID8gZGVmYXVsdFZhbHVlIDogdGhpcy5lc2NhcGUoa2V5KVxuICAgICAgKS5qb2luKCcvJylcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBwb2ludGVyID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKHBvaW50ZXJbMF0gPT09ICcjJykge1xuICAgICAgICBwb2ludGVyID0gcG9pbnRlci5zbGljZSgxKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHBvaW50ZXJcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ3RvS2V5JyBmdW5jdGlvblxuICAgKlxuICAgKiBFeHRyYWN0cyBuYW1lIG9mIHRoZSBmaW5hbCBrZXkgZnJvbSBhIEpTT04gUG9pbnRlci5cbiAgICpcbiAgICogQHBhcmFtIHBvaW50ZXIgLSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSlcbiAgICogQHBhcmFtIGVycm9ycyAtIFNob3cgZXJyb3IgaWYgaW52YWxpZCBwb2ludGVyP1xuICAgKiBAcmV0dXJuIHRoZSBleHRyYWN0ZWQga2V5XG4gICAqL1xuICBzdGF0aWMgdG9LZXkoXG4gICAgcG9pbnRlcjogUG9pbnRlcixcbiAgICBlcnJvcnM6IGJvb2xlYW4gPSBmYWxzZVxuICApOiBzdHJpbmcge1xuICAgIGNvbnN0IGtleUFycmF5ID0gdGhpcy5wYXJzZShwb2ludGVyLCBlcnJvcnMpXG4gICAgaWYgKGtleUFycmF5ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBpZiAoIWtleUFycmF5Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuICcnXG4gICAgfVxuICAgIHJldHVybiBrZXlBcnJheVtrZXlBcnJheS5sZW5ndGggLSAxXVxuICB9XG5cbiAgLyoqXG4gICAqICdpc0pzb25Qb2ludGVyJyBmdW5jdGlvblxuICAgKlxuICAgKiBDaGVja3MgYSBzdHJpbmcgb3IgYXJyYXkgdmFsdWUgdG8gZGV0ZXJtaW5lIGlmIGl0IGlzIGEgdmFsaWQgSlNPTiBQb2ludGVyLlxuICAgKiBSZXR1cm5zIHRydWUgaWYgYSBzdHJpbmcgaXMgZW1wdHksIG9yIHN0YXJ0cyB3aXRoICcvJyBvciAnIy8nLlxuICAgKiBSZXR1cm5zIHRydWUgaWYgYW4gYXJyYXkgY29udGFpbnMgb25seSBzdHJpbmcgdmFsdWVzLlxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWUgLSB2YWx1ZSB0byBjaGVja1xuICAgKiBAcmV0dXJuIHRydWUgaWYgdmFsdWUgaXMgYSB2YWxpZCBKU09OIFBvaW50ZXIsIG90aGVyd2lzZSBmYWxzZVxuICAgKi9cbiAgc3RhdGljIGlzSnNvblBvaW50ZXIodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLmV2ZXJ5KGtleSA9PiB0eXBlb2Yga2V5ID09PSAnc3RyaW5nJylcbiAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgaWYgKHZhbHVlID09PSAnJyB8fCB2YWx1ZSA9PT0gJyMnKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICBpZiAodmFsdWVbMF0gPT09ICcvJyB8fCB2YWx1ZS5zbGljZSgwLCAyKSA9PT0gJyMvJykge1xuICAgICAgICByZXR1cm4gIS8oflteMDFdfH4kKS9nLnRlc3QodmFsdWUpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgLyoqXG4gICAqICdpc1N1YlBvaW50ZXInIGZ1bmN0aW9uXG4gICAqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9uZSBKU09OIFBvaW50ZXIgaXMgYSBzdWJzZXQgb2YgYW5vdGhlci5cbiAgICpcbiAgICogQHBhcmFtIHNob3J0UG9pbnRlciAtIHBvdGVudGlhbCBzdWJzZXQgSlNPTiBQb2ludGVyXG4gICAqIEBwYXJhbSBsb25nUG9pbnRlciAtIHBvdGVudGlhbCBzdXBlcnNldCBKU09OIFBvaW50ZXJcbiAgICogQHBhcmFtIHRydWVJZk1hdGNoaW5nIC0gcmV0dXJuIHRydWUgaWYgcG9pbnRlcnMgbWF0Y2g/XG4gICAqIEBwYXJhbSBlcnJvcnMgLSBTaG93IGVycm9yIGlmIGludmFsaWQgcG9pbnRlcj9cbiAgICogQHJldHVybiB0cnVlIGlmIHNob3J0UG9pbnRlciBpcyBhIHN1YnNldCBvZiBsb25nUG9pbnRlciwgZmFsc2UgaWYgbm90XG4gICAqL1xuICBzdGF0aWMgaXNTdWJQb2ludGVyKFxuICAgIHNob3J0UG9pbnRlcjogUG9pbnRlcixcbiAgICBsb25nUG9pbnRlcjogUG9pbnRlcixcbiAgICB0cnVlSWZNYXRjaGluZzogYm9vbGVhbiA9IGZhbHNlLFxuICAgIGVycm9yczogYm9vbGVhbiA9IGZhbHNlXG4gICk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5pc0pzb25Qb2ludGVyKHNob3J0UG9pbnRlcikgfHwgIXRoaXMuaXNKc29uUG9pbnRlcihsb25nUG9pbnRlcikpIHtcbiAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgbGV0IGludmFsaWQgPSAnJ1xuICAgICAgICBpZiAoIXRoaXMuaXNKc29uUG9pbnRlcihzaG9ydFBvaW50ZXIpKSB7XG4gICAgICAgICAgaW52YWxpZCArPSBgIDE6ICR7c2hvcnRQb2ludGVyfWBcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuaXNKc29uUG9pbnRlcihsb25nUG9pbnRlcikpIHtcbiAgICAgICAgICBpbnZhbGlkICs9IGAgMjogJHtsb25nUG9pbnRlcn1gXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5lcnJvcihgaXNTdWJQb2ludGVyIGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlciAke2ludmFsaWR9YClcbiAgICAgIH1cbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBzaG9ydFBvaW50ZXIgPSB0aGlzLmNvbXBpbGUoc2hvcnRQb2ludGVyLCAnJywgZXJyb3JzKVxuICAgIGxvbmdQb2ludGVyID0gdGhpcy5jb21waWxlKGxvbmdQb2ludGVyLCAnJywgZXJyb3JzKVxuICAgIHJldHVybiBzaG9ydFBvaW50ZXIgPT09IGxvbmdQb2ludGVyID8gdHJ1ZUlmTWF0Y2hpbmcgOlxuICAgICAgYCR7c2hvcnRQb2ludGVyfS9gID09PSBsb25nUG9pbnRlci5zbGljZSgwLCBzaG9ydFBvaW50ZXIubGVuZ3RoICsgMSlcbiAgfVxuXG4gIC8qKlxuICAgKiAndG9JbmRleGVkUG9pbnRlcicgZnVuY3Rpb25cbiAgICpcbiAgICogTWVyZ2VzIGFuIGFycmF5IG9mIG51bWVyaWMgaW5kZXhlcyBhbmQgYSBnZW5lcmljIHBvaW50ZXIgdG8gY3JlYXRlIGFuXG4gICAqIGluZGV4ZWQgcG9pbnRlciBmb3IgYSBzcGVjaWZpYyBpdGVtLlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgbWVyZ2luZyB0aGUgZ2VuZXJpYyBwb2ludGVyICcvZm9vLy0vYmFyLy0vYmF6JyBhbmRcbiAgICogdGhlIGFycmF5IFs0LCAyXSB3b3VsZCByZXN1bHQgaW4gdGhlIGluZGV4ZWQgcG9pbnRlciAnL2Zvby80L2Jhci8yL2JheidcbiAgICpcbiAgICogQHBhcmFtIGdlbmVyaWNQb2ludGVyIC0gVGhlIGdlbmVyaWMgcG9pbnRlclxuICAgKiBAcGFyYW0gaW5kZXhBcnJheSAtIFRoZSBhcnJheSBvZiBudW1lcmljIGluZGV4ZXNcbiAgICogQHBhcmFtIGFycmF5TWFwIC0gQW4gb3B0aW9uYWwgYXJyYXkgbWFwXG4gICAqIEByZXR1cm4gVGhlIG1lcmdlZCBwb2ludGVyIHdpdGggaW5kZXhlc1xuICAgKi9cbiAgc3RhdGljIHRvSW5kZXhlZFBvaW50ZXIoXG4gICAgZ2VuZXJpY1BvaW50ZXI6IFBvaW50ZXIsXG4gICAgaW5kZXhBcnJheTogbnVtYmVyW10sXG4gICAgYXJyYXlNYXA6IE1hcDxzdHJpbmcsIG51bWJlcj4gPSBudWxsXG4gICk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuaXNKc29uUG9pbnRlcihnZW5lcmljUG9pbnRlcikgJiYgaXNBcnJheShpbmRleEFycmF5KSkge1xuICAgICAgbGV0IGluZGV4ZWRQb2ludGVyID0gdGhpcy5jb21waWxlKGdlbmVyaWNQb2ludGVyKVxuICAgICAgaWYgKGlzTWFwKGFycmF5TWFwKSkge1xuICAgICAgICBsZXQgYXJyYXlJbmRleCA9IDBcbiAgICAgICAgcmV0dXJuIGluZGV4ZWRQb2ludGVyLnJlcGxhY2UoL1xcL1xcLSg/PVxcL3wkKS9nLCAoa2V5LCBzdHJpbmdJbmRleCkgPT5cbiAgICAgICAgICBhcnJheU1hcC5oYXMoKGluZGV4ZWRQb2ludGVyIGFzIHN0cmluZykuc2xpY2UoMCwgc3RyaW5nSW5kZXgpKSA/XG4gICAgICAgICAgICAnLycgKyBpbmRleEFycmF5W2FycmF5SW5kZXgrK10gOiBrZXlcbiAgICAgICAgKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChjb25zdCBwb2ludGVySW5kZXggb2YgaW5kZXhBcnJheSkge1xuICAgICAgICAgIGluZGV4ZWRQb2ludGVyID0gaW5kZXhlZFBvaW50ZXIucmVwbGFjZSgnLy0nLCAnLycgKyBwb2ludGVySW5kZXgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluZGV4ZWRQb2ludGVyXG4gICAgICB9XG4gICAgfVxuICAgIGlmICghdGhpcy5pc0pzb25Qb2ludGVyKGdlbmVyaWNQb2ludGVyKSkge1xuICAgICAgY29uc29sZS5lcnJvcihgdG9JbmRleGVkUG9pbnRlciBlcnJvcjogSW52YWxpZCBKU09OIFBvaW50ZXI6ICR7Z2VuZXJpY1BvaW50ZXJ9YClcbiAgICB9XG4gICAgaWYgKCFpc0FycmF5KGluZGV4QXJyYXkpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGB0b0luZGV4ZWRQb2ludGVyIGVycm9yOiBJbnZhbGlkIGluZGV4QXJyYXk6ICR7aW5kZXhBcnJheX1gKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAndG9HZW5lcmljUG9pbnRlcicgZnVuY3Rpb25cbiAgICpcbiAgICogQ29tcGFyZXMgYW4gaW5kZXhlZCBwb2ludGVyIHRvIGFuIGFycmF5IG1hcCBhbmQgcmVtb3ZlcyBsaXN0IGFycmF5XG4gICAqIGluZGV4ZXMgKGJ1dCBsZWF2ZXMgdHVwbGUgYXJycmF5IGluZGV4ZXMgYW5kIGFsbCBvYmplY3Qga2V5cywgaW5jbHVkaW5nXG4gICAqIG51bWVyaWMga2V5cykgdG8gY3JlYXRlIGEgZ2VuZXJpYyBwb2ludGVyLlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgdXNpbmcgdGhlIGluZGV4ZWQgcG9pbnRlciAnL2Zvby8xL2Jhci8yL2Jhei8zJyBhbmRcbiAgICogdGhlIGFycmF5TWFwIFtbJy9mb28nLCAwXSwgWycvZm9vLy0vYmFyJywgM10sIFsnL2Zvby8tL2Jhci8tL2JheicsIDBdXVxuICAgKiB3b3VsZCByZXN1bHQgaW4gdGhlIGdlbmVyaWMgcG9pbnRlciAnL2Zvby8tL2Jhci8yL2Jhei8tJ1xuICAgKiBVc2luZyB0aGUgaW5kZXhlZCBwb2ludGVyICcvZm9vLzEvYmFyLzQvYmF6LzMnIGFuZCB0aGUgc2FtZSBhcnJheU1hcFxuICAgKiB3b3VsZCByZXN1bHQgaW4gdGhlIGdlbmVyaWMgcG9pbnRlciAnL2Zvby8tL2Jhci8tL2Jhei8tJ1xuICAgKiAodGhlIGJhciBhcnJheSBoYXMgMyB0dXBsZSBpdGVtcywgc28gaW5kZXggMiBpcyByZXRhaW5lZCwgYnV0IDQgaXMgcmVtb3ZlZClcbiAgICpcbiAgICogVGhlIHN0cnVjdHVyZSBvZiB0aGUgYXJyYXlNYXAgaXM6IFtbJ3BhdGggdG8gYXJyYXknLCBudW1iZXIgb2YgdHVwbGUgaXRlbXNdLi4uXVxuICAgKlxuICAgKiBAcGFyYW0gaW5kZXhlZFBvaW50ZXIgLSBUaGUgaW5kZXhlZCBwb2ludGVyIChhcnJheSBvciBzdHJpbmcpXG4gICAqIEBwYXJhbSBhcnJheU1hcCAtIFRoZSBvcHRpb25hbCBhcnJheSBtYXAgKGZvciBwcmVzZXJ2aW5nIHR1cGxlIGluZGV4ZXMpXG4gICAqIEByZXR1cm4gVGhlIGdlbmVyaWMgcG9pbnRlciB3aXRoIGluZGV4ZXMgcmVtb3ZlZFxuICAgKi9cbiAgc3RhdGljIHRvR2VuZXJpY1BvaW50ZXIoXG4gICAgaW5kZXhlZFBvaW50ZXI6IFBvaW50ZXIsXG4gICAgYXJyYXlNYXA6IE1hcDxzdHJpbmcsIG51bWJlcj4gPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpXG4gICk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuaXNKc29uUG9pbnRlcihpbmRleGVkUG9pbnRlcikgJiYgaXNNYXAoYXJyYXlNYXApKSB7XG4gICAgICBjb25zdCBwb2ludGVyQXJyYXkgPSB0aGlzLnBhcnNlKGluZGV4ZWRQb2ludGVyKVxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBwb2ludGVyQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3ViUG9pbnRlciA9IHRoaXMuY29tcGlsZShwb2ludGVyQXJyYXkuc2xpY2UoMCwgaSkpXG4gICAgICAgIGlmIChhcnJheU1hcC5oYXMoc3ViUG9pbnRlcikgJiZcbiAgICAgICAgICBhcnJheU1hcC5nZXQoc3ViUG9pbnRlcikgPD0gK3BvaW50ZXJBcnJheVtpXVxuICAgICAgICApIHtcbiAgICAgICAgICBwb2ludGVyQXJyYXlbaV0gPSAnLSdcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuY29tcGlsZShwb2ludGVyQXJyYXkpXG4gICAgfVxuICAgIGlmICghdGhpcy5pc0pzb25Qb2ludGVyKGluZGV4ZWRQb2ludGVyKSkge1xuICAgICAgY29uc29sZS5lcnJvcihgdG9HZW5lcmljUG9pbnRlciBlcnJvcjogaW52YWxpZCBKU09OIFBvaW50ZXI6ICR7aW5kZXhlZFBvaW50ZXJ9YClcbiAgICB9XG4gICAgaWYgKCFpc01hcChhcnJheU1hcCkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYHRvR2VuZXJpY1BvaW50ZXIgZXJyb3I6IGludmFsaWQgYXJyYXlNYXA6ICR7YXJyYXlNYXB9YClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ3RvQ29udHJvbFBvaW50ZXInIGZ1bmN0aW9uXG4gICAqXG4gICAqIEFjY2VwdHMgYSBKU09OIFBvaW50ZXIgZm9yIGEgZGF0YSBvYmplY3QgYW5kIHJldHVybnMgYSBKU09OIFBvaW50ZXIgZm9yIHRoZVxuICAgKiBtYXRjaGluZyBjb250cm9sIGluIGFuIEFuZ3VsYXIgRm9ybUdyb3VwLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YVBvaW50ZXIgLSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSkgdG8gYSBkYXRhIG9iamVjdFxuICAgKiBAcGFyYW0gZm9ybUdyb3VwIC0gQW5ndWxhciBGb3JtR3JvdXAgdG8gZ2V0IHZhbHVlIGZyb21cbiAgICogQHBhcmFtIGNvbnRyb2xNdXN0RXhpc3QgLSBPbmx5IHJldHVybiBpZiBjb250cm9sIGV4aXN0cz9cbiAgICogQHJldHVybiBKU09OIFBvaW50ZXIgKHN0cmluZykgdG8gdGhlIGZvcm1Hcm91cCBvYmplY3RcbiAgICovXG4gIHN0YXRpYyB0b0NvbnRyb2xQb2ludGVyKFxuICAgIGRhdGFQb2ludGVyOiBQb2ludGVyLFxuICAgIGZvcm1Hcm91cDogRm9ybUdyb3VwLFxuICAgIGNvbnRyb2xNdXN0RXhpc3Q6IGJvb2xlYW4gPSBmYWxzZVxuICApIHtcbiAgICBjb25zdCBkYXRhUG9pbnRlckFycmF5ID0gdGhpcy5wYXJzZShkYXRhUG9pbnRlcilcbiAgICBjb25zdCBjb250cm9sUG9pbnRlckFycmF5OiBzdHJpbmdbXSA9IFtdXG4gICAgbGV0IHN1Ykdyb3VwOiBhbnkgPSBmb3JtR3JvdXBcbiAgICBpZiAoZGF0YVBvaW50ZXJBcnJheSAhPT0gbnVsbCkge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgZGF0YVBvaW50ZXJBcnJheSkge1xuICAgICAgICBpZiAoaGFzT3duKHN1Ykdyb3VwLCAnY29udHJvbHMnKSkge1xuICAgICAgICAgIGNvbnRyb2xQb2ludGVyQXJyYXkucHVzaCgnY29udHJvbHMnKVxuICAgICAgICAgIHN1Ykdyb3VwID0gc3ViR3JvdXAuY29udHJvbHNcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNBcnJheShzdWJHcm91cCkgJiYgKGtleSA9PT0gJy0nKSkge1xuICAgICAgICAgIGNvbnRyb2xQb2ludGVyQXJyYXkucHVzaCgoc3ViR3JvdXAubGVuZ3RoIC0gMSkudG9TdHJpbmcoKSlcbiAgICAgICAgICBzdWJHcm91cCA9IHN1Ykdyb3VwW3N1Ykdyb3VwLmxlbmd0aCAtIDFdXG4gICAgICAgIH0gZWxzZSBpZiAoaGFzT3duKHN1Ykdyb3VwLCBrZXkpKSB7XG4gICAgICAgICAgY29udHJvbFBvaW50ZXJBcnJheS5wdXNoKGtleSlcbiAgICAgICAgICBzdWJHcm91cCA9IHN1Ykdyb3VwW2tleV1cbiAgICAgICAgfSBlbHNlIGlmIChjb250cm9sTXVzdEV4aXN0KSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihgdG9Db250cm9sUG9pbnRlciBlcnJvcjogVW5hYmxlIHRvIGZpbmQgXCIke2tleX1cIiBpdGVtIGluIEZvcm1Hcm91cC5gKVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZGF0YVBvaW50ZXIpXG4gICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtR3JvdXApXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udHJvbFBvaW50ZXJBcnJheS5wdXNoKGtleSlcbiAgICAgICAgICBzdWJHcm91cCA9IHtjb250cm9sczoge319XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmNvbXBpbGUoY29udHJvbFBvaW50ZXJBcnJheSlcbiAgICB9XG4gICAgY29uc29sZS5lcnJvcihgdG9Db250cm9sUG9pbnRlciBlcnJvcjogSW52YWxpZCBKU09OIFBvaW50ZXI6ICR7ZGF0YVBvaW50ZXJ9YClcbiAgfVxuXG4gIC8qKlxuICAgKiAndG9TY2hlbWFQb2ludGVyJyBmdW5jdGlvblxuICAgKlxuICAgKiBBY2NlcHRzIGEgSlNPTiBQb2ludGVyIHRvIGEgdmFsdWUgaW5zaWRlIGEgZGF0YSBvYmplY3QgYW5kIGEgSlNPTiBzY2hlbWFcbiAgICogZm9yIHRoYXQgb2JqZWN0LlxuICAgKlxuICAgKiBSZXR1cm5zIGEgUG9pbnRlciB0byB0aGUgc3ViLXNjaGVtYSBmb3IgdGhlIHZhbHVlIGluc2lkZSB0aGUgb2JqZWN0J3Mgc2NoZW1hLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YVBvaW50ZXIgLSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSkgdG8gYW4gb2JqZWN0XG4gICAqIEBwYXJhbSBzY2hlbWEgLSBKU09OIHNjaGVtYSBmb3IgdGhlIG9iamVjdFxuICAgKiBAcmV0dXJuIEpTT04gUG9pbnRlciAoc3RyaW5nKSB0byB0aGUgb2JqZWN0J3Mgc2NoZW1hXG4gICAqL1xuICBzdGF0aWMgdG9TY2hlbWFQb2ludGVyKFxuICAgIGRhdGFQb2ludGVyOiBQb2ludGVyLFxuICAgIHNjaGVtYTogYW55XG4gICk6IFBvaW50ZXIge1xuICAgIGlmICh0aGlzLmlzSnNvblBvaW50ZXIoZGF0YVBvaW50ZXIpICYmIHR5cGVvZiBzY2hlbWEgPT09ICdvYmplY3QnKSB7XG4gICAgICBjb25zdCBwb2ludGVyQXJyYXkgPSB0aGlzLnBhcnNlKGRhdGFQb2ludGVyKVxuICAgICAgaWYgKCFwb2ludGVyQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiAnJ1xuICAgICAgfVxuICAgICAgY29uc3QgZmlyc3RLZXkgPSBwb2ludGVyQXJyYXkuc2hpZnQoKVxuICAgICAgaWYgKHNjaGVtYS50eXBlID09PSAnb2JqZWN0JyB8fCBzY2hlbWEucHJvcGVydGllcyB8fCBzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKChzY2hlbWEucHJvcGVydGllcyB8fCB7fSlbZmlyc3RLZXldKSB7XG4gICAgICAgICAgcmV0dXJuIGAvcHJvcGVydGllcy8ke3RoaXMuZXNjYXBlKGZpcnN0S2V5KX1gICtcbiAgICAgICAgICAgIHRoaXMudG9TY2hlbWFQb2ludGVyKHBvaW50ZXJBcnJheSwgc2NoZW1hLnByb3BlcnRpZXNbZmlyc3RLZXldKVxuICAgICAgICB9IGVsc2UgaWYgKHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcykge1xuICAgICAgICAgIHJldHVybiAnL2FkZGl0aW9uYWxQcm9wZXJ0aWVzJyArXG4gICAgICAgICAgICB0aGlzLnRvU2NoZW1hUG9pbnRlcihwb2ludGVyQXJyYXksIHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcylcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKChzY2hlbWEudHlwZSA9PT0gJ2FycmF5JyB8fCBzY2hlbWEuaXRlbXMpICYmXG4gICAgICAgIChpc051bWJlcihmaXJzdEtleSkgfHwgZmlyc3RLZXkgPT09ICctJyB8fCBmaXJzdEtleSA9PT0gJycpXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgYXJyYXlJdGVtID0gZmlyc3RLZXkgPT09ICctJyB8fCBmaXJzdEtleSA9PT0gJycgPyAwIDogK2ZpcnN0S2V5XG4gICAgICAgIGlmIChpc0FycmF5KHNjaGVtYS5pdGVtcykpIHtcbiAgICAgICAgICBpZiAoYXJyYXlJdGVtIDwgc2NoZW1hLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuICcvaXRlbXMvJyArIGFycmF5SXRlbSArXG4gICAgICAgICAgICAgIHRoaXMudG9TY2hlbWFQb2ludGVyKHBvaW50ZXJBcnJheSwgc2NoZW1hLml0ZW1zW2FycmF5SXRlbV0pXG4gICAgICAgICAgfSBlbHNlIGlmIChzY2hlbWEuYWRkaXRpb25hbEl0ZW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gJy9hZGRpdGlvbmFsSXRlbXMnICtcbiAgICAgICAgICAgICAgdGhpcy50b1NjaGVtYVBvaW50ZXIocG9pbnRlckFycmF5LCBzY2hlbWEuYWRkaXRpb25hbEl0ZW1zKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpc09iamVjdChzY2hlbWEuaXRlbXMpKSB7XG4gICAgICAgICAgcmV0dXJuICcvaXRlbXMnICsgdGhpcy50b1NjaGVtYVBvaW50ZXIocG9pbnRlckFycmF5LCBzY2hlbWEuaXRlbXMpXG4gICAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3Qoc2NoZW1hLmFkZGl0aW9uYWxJdGVtcykpIHtcbiAgICAgICAgICByZXR1cm4gJy9hZGRpdGlvbmFsSXRlbXMnICtcbiAgICAgICAgICAgIHRoaXMudG9TY2hlbWFQb2ludGVyKHBvaW50ZXJBcnJheSwgc2NoZW1hLmFkZGl0aW9uYWxJdGVtcylcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc29sZS5lcnJvcihgdG9TY2hlbWFQb2ludGVyIGVycm9yOiBEYXRhIHBvaW50ZXIgJHtkYXRhUG9pbnRlcn0gYCArXG4gICAgICAgIGBub3QgY29tcGF0aWJsZSB3aXRoIHNjaGVtYSAke3NjaGVtYX1gKVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzSnNvblBvaW50ZXIoZGF0YVBvaW50ZXIpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGB0b1NjaGVtYVBvaW50ZXIgZXJyb3I6IEludmFsaWQgSlNPTiBQb2ludGVyOiAke2RhdGFQb2ludGVyfWApXG4gICAgfVxuICAgIGlmICh0eXBlb2Ygc2NoZW1hICE9PSAnb2JqZWN0Jykge1xuICAgICAgY29uc29sZS5lcnJvcihgdG9TY2hlbWFQb2ludGVyIGVycm9yOiBJbnZhbGlkIEpTT04gU2NoZW1hOiAke3NjaGVtYX1gKVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgLyoqXG4gICAqICd0b0RhdGFQb2ludGVyJyBmdW5jdGlvblxuICAgKlxuICAgKiBBY2NlcHRzIGEgSlNPTiBQb2ludGVyIHRvIGEgc3ViLXNjaGVtYSBpbnNpZGUgYSBKU09OIHNjaGVtYSBhbmQgdGhlIHNjaGVtYS5cbiAgICpcbiAgICogSWYgcG9zc2libGUsIHJldHVybnMgYSBnZW5lcmljIFBvaW50ZXIgdG8gdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUgaW5zaWRlXG4gICAqIHRoZSBkYXRhIG9iamVjdCBkZXNjcmliZWQgYnkgdGhlIEpTT04gc2NoZW1hLlxuICAgKlxuICAgKiBSZXR1cm5zIG51bGwgaWYgdGhlIHN1Yi1zY2hlbWEgaXMgaW4gYW4gYW1iaWd1b3VzIGxvY2F0aW9uIChzdWNoIGFzXG4gICAqIGRlZmluaXRpb25zIG9yIGFkZGl0aW9uYWxQcm9wZXJ0aWVzKSB3aGVyZSB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZVxuICAgKiBsb2NhdGlvbiBjYW5ub3QgYmUgZGV0ZXJtaW5lZC5cbiAgICpcbiAgICogQHBhcmFtIHNjaGVtYVBvaW50ZXIgLSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSkgdG8gYSBKU09OIHNjaGVtYVxuICAgKiBAcGFyYW0gc2NoZW1hIC0gdGhlIEpTT04gc2NoZW1hXG4gICAqIEBwYXJhbSBlcnJvcnMgLSBTaG93IGVycm9ycz9cbiAgICogQHJldHVybiBKU09OIFBvaW50ZXIgKHN0cmluZykgdG8gdGhlIHZhbHVlIGluIHRoZSBkYXRhIG9iamVjdFxuICAgKi9cbiAgc3RhdGljIHRvRGF0YVBvaW50ZXIoXG4gICAgc2NoZW1hUG9pbnRlcjogUG9pbnRlcixcbiAgICBzY2hlbWE6IGFueSxcbiAgICBlcnJvcnM6IGJvb2xlYW4gPSBmYWxzZVxuICApOiBQb2ludGVyIHtcbiAgICBpZiAodGhpcy5pc0pzb25Qb2ludGVyKHNjaGVtYVBvaW50ZXIpICYmIHR5cGVvZiBzY2hlbWEgPT09ICdvYmplY3QnICYmXG4gICAgICB0aGlzLmhhcyhzY2hlbWEsIHNjaGVtYVBvaW50ZXIpXG4gICAgKSB7XG4gICAgICBjb25zdCBwb2ludGVyQXJyYXkgPSB0aGlzLnBhcnNlKHNjaGVtYVBvaW50ZXIpXG4gICAgICBpZiAoIXBvaW50ZXJBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuICcnXG4gICAgICB9XG4gICAgICBjb25zdCBkYXRhUG9pbnRlciA9ICcnXG4gICAgICBjb25zdCBmaXJzdEtleSA9IHBvaW50ZXJBcnJheS5zaGlmdCgpXG4gICAgICBpZiAoZmlyc3RLZXkgPT09ICdwcm9wZXJ0aWVzJyB8fFxuICAgICAgICAoZmlyc3RLZXkgPT09ICdpdGVtcycgJiYgaXNBcnJheShzY2hlbWEuaXRlbXMpKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IHNlY29uZEtleSA9IHBvaW50ZXJBcnJheS5zaGlmdCgpXG4gICAgICAgIGNvbnN0IHBvaW50ZXJTdWZmaXggPSB0aGlzLnRvRGF0YVBvaW50ZXIocG9pbnRlckFycmF5LCBzY2hlbWFbZmlyc3RLZXldW3NlY29uZEtleV0pXG4gICAgICAgIHJldHVybiBwb2ludGVyU3VmZml4ID09PSBudWxsID8gbnVsbCA6ICcvJyArIHNlY29uZEtleSArIHBvaW50ZXJTdWZmaXhcbiAgICAgIH0gZWxzZSBpZiAoZmlyc3RLZXkgPT09ICdhZGRpdGlvbmFsSXRlbXMnIHx8XG4gICAgICAgIChmaXJzdEtleSA9PT0gJ2l0ZW1zJyAmJiBpc09iamVjdChzY2hlbWEuaXRlbXMpKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IHBvaW50ZXJTdWZmaXggPSB0aGlzLnRvRGF0YVBvaW50ZXIocG9pbnRlckFycmF5LCBzY2hlbWFbZmlyc3RLZXldKVxuICAgICAgICByZXR1cm4gcG9pbnRlclN1ZmZpeCA9PT0gbnVsbCA/IG51bGwgOiAnLy0nICsgcG9pbnRlclN1ZmZpeFxuICAgICAgfSBlbHNlIGlmIChbJ2FsbE9mJywgJ2FueU9mJywgJ29uZU9mJ10uaW5jbHVkZXMoZmlyc3RLZXkpKSB7XG4gICAgICAgIGNvbnN0IHNlY29uZEtleSA9IHBvaW50ZXJBcnJheS5zaGlmdCgpXG4gICAgICAgIHJldHVybiB0aGlzLnRvRGF0YVBvaW50ZXIocG9pbnRlckFycmF5LCBzY2hlbWFbZmlyc3RLZXldW3NlY29uZEtleV0pXG4gICAgICB9IGVsc2UgaWYgKGZpcnN0S2V5ID09PSAnbm90Jykge1xuICAgICAgICByZXR1cm4gdGhpcy50b0RhdGFQb2ludGVyKHBvaW50ZXJBcnJheSwgc2NoZW1hW2ZpcnN0S2V5XSlcbiAgICAgIH0gZWxzZSBpZiAoWydjb250YWlucycsICdkZWZpbml0aW9ucycsICdkZXBlbmRlbmNpZXMnLCAnYWRkaXRpb25hbEl0ZW1zJyxcbiAgICAgICAgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJywgJ3BhdHRlcm5Qcm9wZXJ0aWVzJywgJ3Byb3BlcnR5TmFtZXMnXS5pbmNsdWRlcyhmaXJzdEtleSlcbiAgICAgICkge1xuICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihgdG9EYXRhUG9pbnRlciBlcnJvcjogQW1iaWd1b3VzIGxvY2F0aW9uYClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuICcnXG4gICAgfVxuICAgIGlmIChlcnJvcnMpIHtcbiAgICAgIGlmICghdGhpcy5pc0pzb25Qb2ludGVyKHNjaGVtYVBvaW50ZXIpKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYHRvRGF0YVBvaW50ZXIgZXJyb3I6IEludmFsaWQgSlNPTiBQb2ludGVyOiAke3NjaGVtYVBvaW50ZXJ9YClcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygc2NoZW1hICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zb2xlLmVycm9yKGB0b0RhdGFQb2ludGVyIGVycm9yOiBJbnZhbGlkIEpTT04gU2NoZW1hOiAke3NjaGVtYX1gKVxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBzY2hlbWEgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYHRvRGF0YVBvaW50ZXIgZXJyb3I6IFBvaW50ZXIgJHtzY2hlbWFQb2ludGVyfSBpbnZhbGlkIGZvciBTY2hlbWE6ICR7c2NoZW1hfWApXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICAvKipcbiAgICogJ3BhcnNlT2JqZWN0UGF0aCcgZnVuY3Rpb25cbiAgICpcbiAgICogUGFyc2VzIGEgSmF2YVNjcmlwdCBvYmplY3QgcGF0aCBpbnRvIGFuIGFycmF5IG9mIGtleXMsIHdoaWNoXG4gICAqIGNhbiB0aGVuIGJlIHBhc3NlZCB0byBjb21waWxlKCkgdG8gY29udmVydCBpbnRvIGEgc3RyaW5nIEpTT04gUG9pbnRlci5cbiAgICpcbiAgICogQmFzZWQgb24gbWlrZS1tYXJjYWNjaSdzIGV4Y2VsbGVudCBvYmplY3RwYXRoIHBhcnNlIGZ1bmN0aW9uOlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vbWlrZS1tYXJjYWNjaS9vYmplY3RwYXRoXG4gICAqXG4gICAqIEBwYXJhbSBwYXRoIC0gVGhlIG9iamVjdCBwYXRoIHRvIHBhcnNlXG4gICAqIEByZXR1cm4gVGhlIHJlc3VsdGluZyBhcnJheSBvZiBrZXlzXG4gICAqL1xuICBzdGF0aWMgcGFyc2VPYmplY3RQYXRoKHBhdGg6IFBvaW50ZXIpOiBzdHJpbmdbXSB7XG4gICAgaWYgKGlzQXJyYXkocGF0aCkpIHtcbiAgICAgIHJldHVybiBwYXRoIGFzIHN0cmluZ1tdXG4gICAgfVxuICAgIGlmICh0aGlzLmlzSnNvblBvaW50ZXIocGF0aCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcnNlKHBhdGgpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGxldCBpbmRleCA9IDBcbiAgICAgIGNvbnN0IHBhcnRzOiBzdHJpbmdbXSA9IFtdXG4gICAgICB3aGlsZSAoaW5kZXggPCBwYXRoLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBuZXh0RG90ID0gcGF0aC5pbmRleE9mKCcuJywgaW5kZXgpXG4gICAgICAgIGNvbnN0IG5leHRPQiA9IHBhdGguaW5kZXhPZignWycsIGluZGV4KSAvLyBuZXh0IG9wZW4gYnJhY2tldFxuICAgICAgICBpZiAobmV4dERvdCA9PT0gLTEgJiYgbmV4dE9CID09PSAtMSkgeyAvLyBsYXN0IGl0ZW1cbiAgICAgICAgICBwYXJ0cy5wdXNoKHBhdGguc2xpY2UoaW5kZXgpKVxuICAgICAgICAgIGluZGV4ID0gcGF0aC5sZW5ndGhcbiAgICAgICAgfSBlbHNlIGlmIChuZXh0RG90ICE9PSAtMSAmJiAobmV4dERvdCA8IG5leHRPQiB8fCBuZXh0T0IgPT09IC0xKSkgeyAvLyBkb3Qgbm90YXRpb25cbiAgICAgICAgICBwYXJ0cy5wdXNoKHBhdGguc2xpY2UoaW5kZXgsIG5leHREb3QpKVxuICAgICAgICAgIGluZGV4ID0gbmV4dERvdCArIDFcbiAgICAgICAgfSBlbHNlIHsgLy8gYnJhY2tldCBub3RhdGlvblxuICAgICAgICAgIGlmIChuZXh0T0IgPiBpbmRleCkge1xuICAgICAgICAgICAgcGFydHMucHVzaChwYXRoLnNsaWNlKGluZGV4LCBuZXh0T0IpKVxuICAgICAgICAgICAgaW5kZXggPSBuZXh0T0JcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgcXVvdGUgPSBwYXRoLmNoYXJBdChuZXh0T0IgKyAxKVxuICAgICAgICAgIGlmIChxdW90ZSA9PT0gJ1wiJyB8fCBxdW90ZSA9PT0gJ1xcJycpIHsgLy8gZW5jbG9zaW5nIHF1b3Rlc1xuICAgICAgICAgICAgbGV0IG5leHRDQiA9IHBhdGguaW5kZXhPZihxdW90ZSArICddJywgbmV4dE9CKSAvLyBuZXh0IGNsb3NlIGJyYWNrZXRcbiAgICAgICAgICAgIHdoaWxlIChuZXh0Q0IgIT09IC0xICYmIHBhdGguY2hhckF0KG5leHRDQiAtIDEpID09PSAnXFxcXCcpIHtcbiAgICAgICAgICAgICAgbmV4dENCID0gcGF0aC5pbmRleE9mKHF1b3RlICsgJ10nLCBuZXh0Q0IgKyAyKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5leHRDQiA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgbmV4dENCID0gcGF0aC5sZW5ndGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcnRzLnB1c2gocGF0aC5zbGljZShpbmRleCArIDIsIG5leHRDQilcbiAgICAgICAgICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cCgnXFxcXCcgKyBxdW90ZSwgJ2cnKSwgcXVvdGUpKVxuICAgICAgICAgICAgaW5kZXggPSBuZXh0Q0IgKyAyXG4gICAgICAgICAgfSBlbHNlIHsgLy8gbm8gZW5jbG9zaW5nIHF1b3Rlc1xuICAgICAgICAgICAgbGV0IG5leHRDQiA9IHBhdGguaW5kZXhPZignXScsIG5leHRPQikgLy8gbmV4dCBjbG9zZSBicmFja2V0XG4gICAgICAgICAgICBpZiAobmV4dENCID09PSAtMSkge1xuICAgICAgICAgICAgICBuZXh0Q0IgPSBwYXRoLmxlbmd0aFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFydHMucHVzaChwYXRoLnNsaWNlKGluZGV4ICsgMSwgbmV4dENCKSlcbiAgICAgICAgICAgIGluZGV4ID0gbmV4dENCICsgMVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocGF0aC5jaGFyQXQoaW5kZXgpID09PSAnLicpIHtcbiAgICAgICAgICAgIGluZGV4KytcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXJ0c1xuICAgIH1cbiAgICBjb25zb2xlLmVycm9yKCdwYXJzZU9iamVjdFBhdGggZXJyb3I6IElucHV0IG9iamVjdCBwYXRoIG11c3QgYmUgYSBzdHJpbmcuJylcbiAgfVxufVxuIl19