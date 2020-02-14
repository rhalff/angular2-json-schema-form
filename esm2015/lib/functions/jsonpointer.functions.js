var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { isDefined, isEmpty, isObject, isArray, isMap, isNumber, isString } from './validator';
import { hasOwn, copy } from './utility';
let JsonPointer = class JsonPointer {
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
            let newObject = Array.isArray(object) ? [...object] : Object.assign({}, object);
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
};
JsonPointer = __decorate([
    Injectable()
], JsonPointer);
export { JsonPointer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbnBvaW50ZXIuZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdzZi1jb21tb24vIiwic291cmNlcyI6WyJsaWIvZnVuY3Rpb25zL2pzb25wb2ludGVyLmZ1bmN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFBO0FBRXhDLE9BQU8sRUFDTCxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQ2pFLE1BQU0sYUFBYSxDQUFBO0FBQ3BCLE9BQU8sRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLE1BQU0sV0FBVyxDQUFBO0FBcUJ0QyxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBZXRCLE1BQU0sQ0FBQyxHQUFHLENBQ1IsTUFBTSxFQUNOLE9BQWdCLEVBQ2hCLGFBQXFCLENBQUMsRUFDdEIsV0FBbUIsSUFBSSxFQUN2QixhQUFzQixLQUFLLEVBQzNCLFNBQWtCLEtBQUs7UUFFdkIsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ25CLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQTtTQUN0QztRQUNELElBQUksUUFBUSxHQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ2pELElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFDbkQsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFBO1lBQ3RCLElBQUksVUFBVSxJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDakUsT0FBTyxNQUFNLENBQUE7YUFDZDtZQUNELElBQUksVUFBVSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFD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LENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQTt3QkFDekMsS0FBSyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUE7cUJBQ25CO29CQUNELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUU7d0JBQzlCLEtBQUssRUFBRSxDQUFBO3FCQUNSO2lCQUNGO2FBQ0Y7WUFDRCxPQUFPLEtBQUssQ0FBQTtTQUNiO1FBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyw0REFBNEQsQ0FBQyxDQUFBO0lBQzdFLENBQUM7Q0FDRixDQUFBO0FBMStCWSxXQUFXO0lBRHZCLFVBQVUsRUFBRTtHQUNBLFdBQVcsQ0EwK0J2QjtTQTErQlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcblxuaW1wb3J0IHtcbiAgaXNEZWZpbmVkLCBpc0VtcHR5LCBpc09iamVjdCwgaXNBcnJheSwgaXNNYXAsIGlzTnVtYmVyLCBpc1N0cmluZ1xufSBmcm9tICcuL3ZhbGlkYXRvcidcbmltcG9ydCB7aGFzT3duLCBjb3B5fSBmcm9tICcuL3V0aWxpdHknXG5pbXBvcnQge0Zvcm1Hcm91cH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXG5cbi8qKlxuICogJ0pzb25Qb2ludGVyJyBjbGFzc1xuICpcbiAqIFNvbWUgdXRpbGl0aWVzIGZvciB1c2luZyBKU09OIFBvaW50ZXJzIHdpdGggSlNPTiBvYmplY3RzXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjkwMVxuICpcbiAqIGdldCwgZ2V0Q29weSwgZ2V0Rmlyc3QsIHNldCwgc2V0Q29weSwgaW5zZXJ0LCBpbnNlcnRDb3B5LCByZW1vdmUsIGhhcywgZGljdCxcbiAqIGZvckVhY2hEZWVwLCBmb3JFYWNoRGVlcENvcHksIGVzY2FwZSwgdW5lc2NhcGUsIHBhcnNlLCBjb21waWxlLCB0b0tleSxcbiAqIGlzSnNvblBvaW50ZXIsIGlzU3ViUG9pbnRlciwgdG9JbmRleGVkUG9pbnRlciwgdG9HZW5lcmljUG9pbnRlcixcbiAqIHRvQ29udHJvbFBvaW50ZXIsIHRvU2NoZW1hUG9pbnRlciwgdG9EYXRhUG9pbnRlciwgcGFyc2VPYmplY3RQYXRoXG4gKlxuICogU29tZSBmdW5jdGlvbnMgYmFzZWQgb24gbWFudWVsc3RvZmVyJ3MganNvbi1wb2ludGVyIHV0aWxpdGllc1xuICogaHR0cHM6Ly9naXRodWIuY29tL21hbnVlbHN0b2Zlci9qc29uLXBvaW50ZXJcbiAqL1xuZXhwb3J0IHR5cGUgUG9pbnRlciA9IHN0cmluZyB8IHN0cmluZ1tdXG5cbi8vIEBkeW5hbWljXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSnNvblBvaW50ZXIge1xuXG4gIC8qKlxuICAgKiAnZ2V0JyBmdW5jdGlvblxuICAgKlxuICAgKiBVc2VzIGEgSlNPTiBQb2ludGVyIHRvIHJldHJpZXZlIGEgdmFsdWUgZnJvbSBhbiBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgLSBPYmplY3QgdG8gZ2V0IHZhbHVlIGZyb21cbiAgICogQHBhcmFtIHBvaW50ZXIgLSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSlcbiAgICogQHBhcmFtIHN0YXJ0U2xpY2UgLSBaZXJvLWJhc2VkIGluZGV4IG9mIGZpcnN0IFBvaW50ZXIga2V5IHRvIHVzZVxuICAgKiBAcGFyYW0gZW5kU2xpY2UgLSBaZXJvLWJhc2VkIGluZGV4IG9mIGxhc3QgUG9pbnRlciBrZXkgdG8gdXNlXG4gICAqIEBwYXJhbSBnZXRCb29sZWFuIC0gUmV0dXJuIG9ubHkgdHJ1ZSBvciBmYWxzZT9cbiAgICogQHBhcmFtIGVycm9ycyAtIFNob3cgZXJyb3IgaWYgbm90IGZvdW5kP1xuICAgKiBAcmV0dXJuIExvY2F0ZWQgdmFsdWUgKG9yIHRydWUgb3IgZmFsc2UgaWYgZ2V0Qm9vbGVhbiA9IHRydWUpXG4gICAqL1xuICBzdGF0aWMgZ2V0KFxuICAgIG9iamVjdCxcbiAgICBwb2ludGVyOiBQb2ludGVyLFxuICAgIHN0YXJ0U2xpY2U6IG51bWJlciA9IDAsXG4gICAgZW5kU2xpY2U6IG51bWJlciA9IG51bGwsXG4gICAgZ2V0Qm9vbGVhbjogYm9vbGVhbiA9IGZhbHNlLFxuICAgIGVycm9yczogYm9vbGVhbiA9IGZhbHNlXG4gICkge1xuICAgIGlmIChvYmplY3QgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBnZXRCb29sZWFuID8gZmFsc2UgOiB1bmRlZmluZWRcbiAgICB9XG4gICAgbGV0IGtleUFycmF5OiBhbnlbXSA9IHRoaXMucGFyc2UocG9pbnRlciwgZXJyb3JzKVxuICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBrZXlBcnJheSAhPT0gbnVsbCkge1xuICAgICAgbGV0IHN1Yk9iamVjdCA9IG9iamVjdFxuICAgICAgaWYgKHN0YXJ0U2xpY2UgPj0ga2V5QXJyYXkubGVuZ3RoIHx8IGVuZFNsaWNlIDw9IC1rZXlBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdFxuICAgICAgfVxuICAgICAgaWYgKHN0YXJ0U2xpY2UgPD0gLWtleUFycmF5Lmxlbmd0aCkge1xuICAgICAgICBzdGFydFNsaWNlID0gMFxuICAgICAgfVxuICAgICAgaWYgKCFpc0RlZmluZWQoZW5kU2xpY2UpIHx8IGVuZFNsaWNlID49IGtleUFycmF5Lmxlbmd0aCkge1xuICAgICAgICBlbmRTbGljZSA9IGtleUFycmF5Lmxlbmd0aFxuICAgICAgfVxuICAgICAga2V5QXJyYXkgPSBrZXlBcnJheS5zbGljZShzdGFydFNsaWNlLCBlbmRTbGljZSlcbiAgICAgIGZvciAobGV0IGtleSBvZiBrZXlBcnJheSkge1xuICAgICAgICBpZiAoa2V5ID09PSAnLScgJiYgaXNBcnJheShzdWJPYmplY3QpICYmIHN1Yk9iamVjdC5sZW5ndGgpIHtcbiAgICAgICAgICBrZXkgPSBzdWJPYmplY3QubGVuZ3RoIC0gMVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc01hcChzdWJPYmplY3QpICYmIHN1Yk9iamVjdC5oYXMoa2V5KSkge1xuICAgICAgICAgIHN1Yk9iamVjdCA9IHN1Yk9iamVjdC5nZXQoa2V5KVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzdWJPYmplY3QgPT09ICdvYmplY3QnICYmIHN1Yk9iamVjdCAhPT0gbnVsbCAmJlxuICAgICAgICAgIGhhc093bihzdWJPYmplY3QsIGtleSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgc3ViT2JqZWN0ID0gc3ViT2JqZWN0W2tleV1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBnZXQgZXJyb3I6IFwiJHtrZXl9XCIga2V5IG5vdCBmb3VuZCBpbiBvYmplY3QuYClcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IocG9pbnRlcilcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3Iob2JqZWN0KVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZ2V0Qm9vbGVhbiA/IGZhbHNlIDogdW5kZWZpbmVkXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBnZXRCb29sZWFuID8gdHJ1ZSA6IHN1Yk9iamVjdFxuICAgIH1cbiAgICBpZiAoZXJyb3JzICYmIGtleUFycmF5ID09PSBudWxsKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBnZXQgZXJyb3I6IEludmFsaWQgSlNPTiBQb2ludGVyOiAke3BvaW50ZXJ9YClcbiAgICB9XG4gICAgaWYgKGVycm9ycyAmJiB0eXBlb2Ygb2JqZWN0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgY29uc29sZS5lcnJvcignZ2V0IGVycm9yOiBJbnZhbGlkIG9iamVjdDonKVxuICAgICAgY29uc29sZS5lcnJvcihvYmplY3QpXG4gICAgfVxuICAgIHJldHVybiBnZXRCb29sZWFuID8gZmFsc2UgOiB1bmRlZmluZWRcbiAgfVxuXG4gIC8qKlxuICAgKiAnZ2V0Q29weScgZnVuY3Rpb25cbiAgICpcbiAgICogVXNlcyBhIEpTT04gUG9pbnRlciB0byBkZWVwbHkgY2xvbmUgYSB2YWx1ZSBmcm9tIGFuIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCAtIE9iamVjdCB0byBnZXQgdmFsdWUgZnJvbVxuICAgKiBAcGFyYW0gcG9pbnRlciAtIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICAgKiBAcGFyYW0gc3RhcnRTbGljZSAtIFplcm8tYmFzZWQgaW5kZXggb2YgZmlyc3QgUG9pbnRlciBrZXkgdG8gdXNlXG4gICAqIEBwYXJhbSBlbmRTbGljZSAtIFplcm8tYmFzZWQgaW5kZXggb2YgbGFzdCBQb2ludGVyIGtleSB0byB1c2VcbiAgICogQHBhcmFtIGdldEJvb2xlYW4gLSBSZXR1cm4gb25seSB0cnVlIG9yIGZhbHNlP1xuICAgKiBAcGFyYW0gZXJyb3JzIC0gU2hvdyBlcnJvciBpZiBub3QgZm91bmQ/XG4gICAqIEByZXR1cm4gTG9jYXRlZCB2YWx1ZSAob3IgdHJ1ZSBvciBmYWxzZSBpZiBnZXRCb29sZWFuID0gdHJ1ZSlcbiAgICovXG4gIHN0YXRpYyBnZXRDb3B5KFxuICAgIG9iamVjdCxcbiAgICBwb2ludGVyOiBQb2ludGVyLFxuICAgIHN0YXJ0U2xpY2U6IG51bWJlciA9IDAsXG4gICAgZW5kU2xpY2U6IG51bWJlciA9IG51bGwsXG4gICAgZ2V0Qm9vbGVhbjogYm9vbGVhbiA9IGZhbHNlLFxuICAgIGVycm9yczogYm9vbGVhbiA9IGZhbHNlXG4gICkge1xuICAgIGNvbnN0IG9iamVjdFRvQ29weSA9XG4gICAgICB0aGlzLmdldChvYmplY3QsIHBvaW50ZXIsIHN0YXJ0U2xpY2UsIGVuZFNsaWNlLCBnZXRCb29sZWFuLCBlcnJvcnMpXG4gICAgcmV0dXJuIHRoaXMuZm9yRWFjaERlZXBDb3B5KG9iamVjdFRvQ29weSlcbiAgfVxuXG4gIC8qKlxuICAgKiAnZ2V0Rmlyc3QnIGZ1bmN0aW9uXG4gICAqXG4gICAqIFRha2VzIGFuIGFycmF5IG9mIEpTT04gUG9pbnRlcnMgYW5kIG9iamVjdHMsXG4gICAqIGNoZWNrcyBlYWNoIG9iamVjdCBmb3IgYSB2YWx1ZSBzcGVjaWZpZWQgYnkgdGhlIHBvaW50ZXIsXG4gICAqIGFuZCByZXR1cm5zIHRoZSBmaXJzdCB2YWx1ZSBmb3VuZC5cbiAgICpcbiAgICogQHBhcmFtIGl0ZW1zIC0gQXJyYXkgb2Ygb2JqZWN0cyBhbmQgcG9pbnRlcnMgdG8gY2hlY2tcbiAgICogQHBhcmFtIGRlZmF1bHRWYWx1ZSAtIFZhbHVlIHRvIHJldHVybiBpZiBub3RoaW5nIGZvdW5kXG4gICAqIEBwYXJhbSBnZXRDb3B5IC0gUmV0dXJuIGEgY29weSBpbnN0ZWFkP1xuICAgKiBAcmV0dXJuIEZpcnN0IHZhbHVlIGZvdW5kXG4gICAqL1xuICBzdGF0aWMgZ2V0Rmlyc3QoXG4gICAgaXRlbXM6IEFycmF5PG9iamVjdCB8IFBvaW50ZXI+LFxuICAgIGRlZmF1bHRWYWx1ZTogYW55ID0gbnVsbCxcbiAgICBnZXRDb3B5ID0gZmFsc2VcbiAgKSB7XG4gICAgaWYgKGlzRW1wdHkoaXRlbXMpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKGlzQXJyYXkoaXRlbXMpKSB7XG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgaWYgKGlzRW1wdHkoaXRlbSkpIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FycmF5KGl0ZW0pICYmIChpdGVtIGFzIHN0cmluZ1tdKS5sZW5ndGggPj0gMikge1xuICAgICAgICAgIGlmIChpc0VtcHR5KGl0ZW1bMF0pIHx8IGlzRW1wdHkoaXRlbVsxXSkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0Q29weSA/XG4gICAgICAgICAgICB0aGlzLmdldENvcHkoaXRlbVswXSwgaXRlbVsxXSkgOlxuICAgICAgICAgICAgdGhpcy5nZXQoaXRlbVswXSwgaXRlbVsxXSlcbiAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2dldEZpcnN0IGVycm9yOiBJbnB1dCBub3QgaW4gY29ycmVjdCBmb3JtYXQuXFxuJyArXG4gICAgICAgICAgJ1Nob3VsZCBiZTogWyBbIG9iamVjdDEsIHBvaW50ZXIxIF0sIFsgb2JqZWN0IDIsIHBvaW50ZXIyIF0sIGV0Yy4uLiBdJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICByZXR1cm4gZGVmYXVsdFZhbHVlXG4gICAgfVxuICAgIGlmIChpc01hcChpdGVtcykpIHtcbiAgICAgIGZvciAoY29uc3QgW29iamVjdCwgcG9pbnRlcl0gb2YgKGl0ZW1zIGFzIGFueSkpIHtcbiAgICAgICAgaWYgKG9iamVjdCA9PT0gbnVsbCB8fCAhdGhpcy5pc0pzb25Qb2ludGVyKHBvaW50ZXIpKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWx1ZSA9IGdldENvcHkgP1xuICAgICAgICAgIHRoaXMuZ2V0Q29weShvYmplY3QsIHBvaW50ZXIpIDpcbiAgICAgICAgICB0aGlzLmdldChvYmplY3QsIHBvaW50ZXIpXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZGVmYXVsdFZhbHVlXG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoJ2dldEZpcnN0IGVycm9yOiBJbnB1dCBub3QgaW4gY29ycmVjdCBmb3JtYXQuXFxuJyArXG4gICAgICAnU2hvdWxkIGJlOiBbIFsgb2JqZWN0MSwgcG9pbnRlcjEgXSwgWyBvYmplY3QgMiwgcG9pbnRlcjIgXSwgZXRjLi4uIF0nKVxuICAgIHJldHVybiBkZWZhdWx0VmFsdWVcbiAgfVxuXG4gIC8qKlxuICAgKiAnZ2V0Rmlyc3RDb3B5JyBmdW5jdGlvblxuICAgKlxuICAgKiBTaW1pbGFyIHRvIGdldEZpcnN0LCBidXQgYWx3YXlzIHJldHVybnMgYSBjb3B5LlxuICAgKlxuICAgKiBAcGFyYW0gaXRlbXMgLSBBcnJheSBvZiBvYmplY3RzIGFuZCBwb2ludGVycyB0byBjaGVja1xuICAgKiBAcGFyYW0gZGVmYXVsdFZhbHVlIC0gVmFsdWUgdG8gcmV0dXJuIGlmIG5vdGhpbmcgZm91bmRcbiAgICogQHJldHVybiBDb3B5IG9mIGZpcnN0IHZhbHVlIGZvdW5kXG4gICAqL1xuICBzdGF0aWMgZ2V0Rmlyc3RDb3B5KFxuICAgIGl0ZW1zOiBBcnJheTxvYmplY3QgfCBQb2ludGVyPixcbiAgICBkZWZhdWx0VmFsdWU6IGFueSA9IG51bGxcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Rmlyc3QoaXRlbXMsIGRlZmF1bHRWYWx1ZSwgdHJ1ZSlcbiAgfVxuXG4gIC8qKlxuICAgKiAnc2V0JyBmdW5jdGlvblxuICAgKlxuICAgKiBVc2VzIGEgSlNPTiBQb2ludGVyIHRvIHNldCBhIHZhbHVlIG9uIGFuIG9iamVjdC5cbiAgICogQWxzbyBjcmVhdGVzIGFueSBtaXNzaW5nIHN1YiBvYmplY3RzIG9yIGFycmF5cyB0byBjb250YWluIHRoYXQgdmFsdWUuXG4gICAqXG4gICAqIElmIHRoZSBvcHRpb25hbCBmb3VydGggcGFyYW1ldGVyIGlzIFRSVUUgYW5kIHRoZSBpbm5lci1tb3N0IGNvbnRhaW5lclxuICAgKiBpcyBhbiBhcnJheSwgdGhlIGZ1bmN0aW9uIHdpbGwgaW5zZXJ0IHRoZSB2YWx1ZSBhcyBhIG5ldyBpdGVtIGF0IHRoZVxuICAgKiBzcGVjaWZpZWQgbG9jYXRpb24gaW4gdGhlIGFycmF5LCByYXRoZXIgdGhhbiBvdmVyd3JpdGluZyB0aGUgZXhpc3RpbmdcbiAgICogdmFsdWUgKGlmIGFueSkgYXQgdGhhdCBsb2NhdGlvbi5cbiAgICpcbiAgICogU28gc2V0KFsxLCAyLCAzXSwgJy8xJywgNCkgPT4gWzEsIDQsIDNdXG4gICAqIGFuZFxuICAgKiBTbyBzZXQoWzEsIDIsIDNdLCAnLzEnLCA0LCB0cnVlKSA9PiBbMSwgNCwgMiwgM11cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCAtIFRoZSBvYmplY3QgdG8gc2V0IHZhbHVlIGluXG4gICAqIEBwYXJhbSBwb2ludGVyIC0gVGhlIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgbmV3IHZhbHVlIHRvIHNldFxuICAgKiBAcGFyYW0gaW5zZXJ0IC0gaW5zZXJ0IHZhbHVlP1xuICAgKiBAcmV0dXJuIFRoZSBvcmlnaW5hbCBvYmplY3QsIG1vZGlmaWVkIHdpdGggdGhlIHNldCB2YWx1ZVxuICAgKi9cbiAgc3RhdGljIHNldChcbiAgICBvYmplY3Q6IG9iamVjdCxcbiAgICBwb2ludGVyOiBQb2ludGVyLFxuICAgIHZhbHVlOiBhbnksXG4gICAgaW5zZXJ0ID0gZmFsc2VcbiAgKSB7XG4gICAgY29uc3Qga2V5QXJyYXkgPSB0aGlzLnBhcnNlKHBvaW50ZXIpXG4gICAgaWYgKGtleUFycmF5ICE9PSBudWxsICYmIGtleUFycmF5Lmxlbmd0aCkge1xuICAgICAgbGV0IHN1Yk9iamVjdDogYW55ID0gb2JqZWN0XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleUFycmF5Lmxlbmd0aCAtIDE7ICsraSkge1xuICAgICAgICBsZXQga2V5ID0ga2V5QXJyYXlbaV1cbiAgICAgICAgaWYgKGtleSA9PT0gJy0nICYmIGlzQXJyYXkoc3ViT2JqZWN0KSkge1xuICAgICAgICAgIGtleSA9IHN1Yk9iamVjdC5sZW5ndGhcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNNYXAoc3ViT2JqZWN0KSAmJiBzdWJPYmplY3QuaGFzKGtleSkpIHtcbiAgICAgICAgICBzdWJPYmplY3QgPSBzdWJPYmplY3QuZ2V0KGtleSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIWhhc093bihzdWJPYmplY3QsIGtleSkpIHtcbiAgICAgICAgICAgIHN1Yk9iamVjdFtrZXldID0gKGtleUFycmF5W2kgKyAxXS5tYXRjaCgvXihcXGQrfC0pJC8pKSA/IFtdIDoge31cbiAgICAgICAgICB9XG4gICAgICAgICAgc3ViT2JqZWN0ID0gc3ViT2JqZWN0W2tleV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgbGFzdEtleSA9IGtleUFycmF5W2tleUFycmF5Lmxlbmd0aCAtIDFdXG4gICAgICBpZiAoaXNBcnJheShzdWJPYmplY3QpICYmIGxhc3RLZXkgPT09ICctJykge1xuICAgICAgICBzdWJPYmplY3QucHVzaCh2YWx1ZSlcbiAgICAgIH0gZWxzZSBpZiAoaW5zZXJ0ICYmIGlzQXJyYXkoc3ViT2JqZWN0KSAmJiAhaXNOYU4oK2xhc3RLZXkpKSB7XG4gICAgICAgIHN1Yk9iamVjdC5zcGxpY2UobGFzdEtleSwgMCwgdmFsdWUpXG4gICAgICB9IGVsc2UgaWYgKGlzTWFwKHN1Yk9iamVjdCkpIHtcbiAgICAgICAgc3ViT2JqZWN0LnNldChsYXN0S2V5LCB2YWx1ZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN1Yk9iamVjdFtsYXN0S2V5XSA9IHZhbHVlXG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqZWN0XG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoYHNldCBlcnJvcjogSW52YWxpZCBKU09OIFBvaW50ZXI6ICR7cG9pbnRlcn1gKVxuICAgIHJldHVybiBvYmplY3RcbiAgfVxuXG4gIC8qKlxuICAgKiAnc2V0Q29weScgZnVuY3Rpb25cbiAgICpcbiAgICogQ29waWVzIGFuIG9iamVjdCBhbmQgdXNlcyBhIEpTT04gUG9pbnRlciB0byBzZXQgYSB2YWx1ZSBvbiB0aGUgY29weS5cbiAgICogQWxzbyBjcmVhdGVzIGFueSBtaXNzaW5nIHN1YiBvYmplY3RzIG9yIGFycmF5cyB0byBjb250YWluIHRoYXQgdmFsdWUuXG4gICAqXG4gICAqIElmIHRoZSBvcHRpb25hbCBmb3VydGggcGFyYW1ldGVyIGlzIFRSVUUgYW5kIHRoZSBpbm5lci1tb3N0IGNvbnRhaW5lclxuICAgKiBpcyBhbiBhcnJheSwgdGhlIGZ1bmN0aW9uIHdpbGwgaW5zZXJ0IHRoZSB2YWx1ZSBhcyBhIG5ldyBpdGVtIGF0IHRoZVxuICAgKiBzcGVjaWZpZWQgbG9jYXRpb24gaW4gdGhlIGFycmF5LCByYXRoZXIgdGhhbiBvdmVyd3JpdGluZyB0aGUgZXhpc3RpbmcgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgLSBUaGUgb2JqZWN0IHRvIGNvcHkgYW5kIHNldCB2YWx1ZSBpblxuICAgKiBAcGFyYW0gcG9pbnRlciAtIFRoZSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSlcbiAgICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIHNldFxuICAgKiBAcGFyYW0gaW5zZXJ0IC0gaW5zZXJ0IHZhbHVlP1xuICAgKiBAcmV0dXJuIFRoZSBuZXcgb2JqZWN0IHdpdGggdGhlIHNldCB2YWx1ZVxuICAgKi9cbiAgc3RhdGljIHNldENvcHkoXG4gICAgb2JqZWN0OiBvYmplY3QsXG4gICAgcG9pbnRlcjogUG9pbnRlcixcbiAgICB2YWx1ZTogYW55LFxuICAgIGluc2VydCA9IGZhbHNlXG4gICkge1xuICAgIGNvbnN0IGtleUFycmF5ID0gdGhpcy5wYXJzZShwb2ludGVyKVxuICAgIGlmIChrZXlBcnJheSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgbmV3T2JqZWN0ID0gY29weShvYmplY3QpXG4gICAgICBsZXQgc3ViT2JqZWN0ID0gbmV3T2JqZWN0XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleUFycmF5Lmxlbmd0aCAtIDE7ICsraSkge1xuICAgICAgICBsZXQga2V5ID0ga2V5QXJyYXlbaV1cbiAgICAgICAgaWYgKGtleSA9PT0gJy0nICYmIGlzQXJyYXkoc3ViT2JqZWN0KSkge1xuICAgICAgICAgIGtleSA9IHN1Yk9iamVjdC5sZW5ndGhcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNNYXAoc3ViT2JqZWN0KSAmJiBzdWJPYmplY3QuaGFzKGtleSkpIHtcbiAgICAgICAgICBzdWJPYmplY3Quc2V0KGtleSwgY29weShzdWJPYmplY3QuZ2V0KGtleSkpKVxuICAgICAgICAgIHN1Yk9iamVjdCA9IHN1Yk9iamVjdC5nZXQoa2V5KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICghaGFzT3duKHN1Yk9iamVjdCwga2V5KSkge1xuICAgICAgICAgICAgc3ViT2JqZWN0W2tleV0gPSAoa2V5QXJyYXlbaSArIDFdLm1hdGNoKC9eKFxcZCt8LSkkLykpID8gW10gOiB7fVxuICAgICAgICAgIH1cbiAgICAgICAgICBzdWJPYmplY3Rba2V5XSA9IGNvcHkoc3ViT2JqZWN0W2tleV0pXG4gICAgICAgICAgc3ViT2JqZWN0ID0gc3ViT2JqZWN0W2tleV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgbGFzdEtleSA9IGtleUFycmF5W2tleUFycmF5Lmxlbmd0aCAtIDFdXG4gICAgICBpZiAoaXNBcnJheShzdWJPYmplY3QpICYmIGxhc3RLZXkgPT09ICctJykge1xuICAgICAgICBzdWJPYmplY3QucHVzaCh2YWx1ZSlcbiAgICAgIH0gZWxzZSBpZiAoaW5zZXJ0ICYmIGlzQXJyYXkoc3ViT2JqZWN0KSAmJiAhaXNOYU4oK2xhc3RLZXkpKSB7XG4gICAgICAgIHN1Yk9iamVjdC5zcGxpY2UobGFzdEtleSwgMCwgdmFsdWUpXG4gICAgICB9IGVsc2UgaWYgKGlzTWFwKHN1Yk9iamVjdCkpIHtcbiAgICAgICAgc3ViT2JqZWN0LnNldChsYXN0S2V5LCB2YWx1ZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN1Yk9iamVjdFtsYXN0S2V5XSA9IHZhbHVlXG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3T2JqZWN0XG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoYHNldENvcHkgZXJyb3I6IEludmFsaWQgSlNPTiBQb2ludGVyOiAke3BvaW50ZXJ9YClcbiAgICByZXR1cm4gb2JqZWN0XG4gIH1cblxuICAvKipcbiAgICogJ2luc2VydCcgZnVuY3Rpb25cbiAgICpcbiAgICogQ2FsbHMgJ3NldCcgd2l0aCBpbnNlcnQgPSBUUlVFXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgLSBvYmplY3QgdG8gaW5zZXJ0IHZhbHVlIGluXG4gICAqIEBwYXJhbSBwb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gICAqIEBwYXJhbSB2YWx1ZSAtIHZhbHVlIHRvIGluc2VydFxuICAgKi9cbiAgc3RhdGljIGluc2VydChcbiAgICBvYmplY3Q6IG9iamVjdCxcbiAgICBwb2ludGVyOiBQb2ludGVyLFxuICAgIHZhbHVlOiBhbnlcbiAgKSB7XG4gICAgY29uc3QgdXBkYXRlZE9iamVjdCA9IHRoaXMuc2V0KG9iamVjdCwgcG9pbnRlciwgdmFsdWUsIHRydWUpXG4gICAgcmV0dXJuIHVwZGF0ZWRPYmplY3RcbiAgfVxuXG4gIC8qKlxuICAgKiAnaW5zZXJ0Q29weScgZnVuY3Rpb25cbiAgICpcbiAgICogQ2FsbHMgJ3NldENvcHknIHdpdGggaW5zZXJ0ID0gVFJVRVxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IC0gb2JqZWN0IHRvIGluc2VydCB2YWx1ZSBpblxuICAgKiBAcGFyYW0gcG9pbnRlciAtIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICAgKiBAcGFyYW0gdmFsdWUgLSB2YWx1ZSB0byBpbnNlcnRcbiAgICovXG4gIHN0YXRpYyBpbnNlcnRDb3B5KFxuICAgIG9iamVjdDogb2JqZWN0LFxuICAgIHBvaW50ZXI6IFBvaW50ZXIsXG4gICAgdmFsdWU6IGFueVxuICApIHtcbiAgICBjb25zdCB1cGRhdGVkT2JqZWN0ID0gdGhpcy5zZXRDb3B5KG9iamVjdCwgcG9pbnRlciwgdmFsdWUsIHRydWUpXG4gICAgcmV0dXJuIHVwZGF0ZWRPYmplY3RcbiAgfVxuXG4gIC8qKlxuICAgKiAncmVtb3ZlJyBmdW5jdGlvblxuICAgKlxuICAgKiBVc2VzIGEgSlNPTiBQb2ludGVyIHRvIHJlbW92ZSBhIGtleSBhbmQgaXRzIGF0dHJpYnV0ZSBmcm9tIGFuIG9iamVjdFxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IC0gb2JqZWN0IHRvIGRlbGV0ZSBhdHRyaWJ1dGUgZnJvbVxuICAgKiBAcGFyYW0gcG9pbnRlciAtIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICAgKi9cbiAgc3RhdGljIHJlbW92ZShcbiAgICBvYmplY3Q6IG9iamVjdCxcbiAgICBwb2ludGVyOiBQb2ludGVyXG4gICkge1xuICAgIGNvbnN0IGtleUFycmF5ID0gdGhpcy5wYXJzZShwb2ludGVyKVxuICAgIGlmIChrZXlBcnJheSAhPT0gbnVsbCAmJiBrZXlBcnJheS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGxhc3RLZXkgPSBrZXlBcnJheS5wb3AoKVxuICAgICAgY29uc3QgcGFyZW50T2JqZWN0ID0gdGhpcy5nZXQob2JqZWN0LCBrZXlBcnJheSlcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhcmVudE9iamVjdCkpIHtcbiAgICAgICAgY29uc3QgbGFzdEluZGV4ID0gKGxhc3RLZXkgPT09ICctJykgPyBwYXJlbnRPYmplY3QubGVuZ3RoIC0gMSA6IHBhcnNlSW50KGxhc3RLZXksIDEwKVxuXG4gICAgICAgIHBhcmVudE9iamVjdC5zcGxpY2UobGFzdEluZGV4LCAxKVxuICAgICAgfSBlbHNlIGlmIChpc09iamVjdChwYXJlbnRPYmplY3QpKSB7XG4gICAgICAgIGRlbGV0ZSBwYXJlbnRPYmplY3RbbGFzdEtleV1cbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmplY3RcbiAgICB9XG4gICAgY29uc29sZS5lcnJvcihgcmVtb3ZlIGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlcjogJHtwb2ludGVyfWApXG4gICAgcmV0dXJuIG9iamVjdFxuICB9XG5cbiAgLyoqXG4gICAqICdoYXMnIGZ1bmN0aW9uXG4gICAqXG4gICAqIFRlc3RzIGlmIGFuIG9iamVjdCBoYXMgYSB2YWx1ZSBhdCB0aGUgbG9jYXRpb24gc3BlY2lmaWVkIGJ5IGEgSlNPTiBQb2ludGVyXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgLSBvYmplY3QgdG8gY2hlayBmb3IgdmFsdWVcbiAgICogQHBhcmFtIHBvaW50ZXIgLSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSlcbiAgICovXG4gIHN0YXRpYyBoYXMoXG4gICAgb2JqZWN0OiBvYmplY3QsXG4gICAgcG9pbnRlcjogUG9pbnRlclxuICApOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5nZXQob2JqZWN0LCBwb2ludGVyLCAwLCBudWxsLCB0cnVlKVxuICB9XG5cbiAgLyoqXG4gICAqICdkaWN0JyBmdW5jdGlvblxuICAgKlxuICAgKiBSZXR1cm5zIGEgKHBvaW50ZXIgLT4gdmFsdWUpIGRpY3Rpb25hcnkgZm9yIGFuIG9iamVjdFxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IC0gVGhlIG9iamVjdCB0byBjcmVhdGUgYSBkaWN0aW9uYXJ5IGZyb21cbiAgICogQHJldHVybiBUaGUgcmVzdWx0aW5nIGRpY3Rpb25hcnkgb2JqZWN0XG4gICAqL1xuICBzdGF0aWMgZGljdChvYmplY3Q6IG9iamVjdCkge1xuICAgIGNvbnN0IHJlc3VsdHM6IGFueSA9IHt9XG4gICAgdGhpcy5mb3JFYWNoRGVlcChvYmplY3QsICh2YWx1ZSwgcG9pbnRlcikgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmVzdWx0c1twb2ludGVyXSA9IHZhbHVlXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gcmVzdWx0c1xuICB9XG5cbiAgLyoqXG4gICAqICdmb3JFYWNoRGVlcCcgZnVuY3Rpb25cbiAgICpcbiAgICogSXRlcmF0ZXMgb3ZlciBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIGFuIG9iamVjdCBvciBpdGVtcyBpbiBhbiBhcnJheVxuICAgKiBhbmQgaW52b2tlcyBhbiBpdGVyYXRlZSBmdW5jdGlvbiBmb3IgZWFjaCBrZXkvdmFsdWUgb3IgaW5kZXgvdmFsdWUgcGFpci5cbiAgICogQnkgZGVmYXVsdCwgaXRlcmF0ZXMgb3ZlciBpdGVtcyB3aXRoaW4gb2JqZWN0cyBhbmQgYXJyYXlzIGFmdGVyIGNhbGxpbmdcbiAgICogdGhlIGl0ZXJhdGVlIGZ1bmN0aW9uIG9uIHRoZSBjb250YWluaW5nIG9iamVjdCBvciBhcnJheSBpdHNlbGYuXG4gICAqXG4gICAqIFRoZSBpdGVyYXRlZSBpcyBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOiAodmFsdWUsIHBvaW50ZXIsIHJvb3RPYmplY3QpLFxuICAgKiB3aGVyZSBwb2ludGVyIGlzIGEgSlNPTiBwb2ludGVyIGluZGljYXRpbmcgdGhlIGxvY2F0aW9uIG9mIHRoZSBjdXJyZW50XG4gICAqIHZhbHVlIHdpdGhpbiB0aGUgcm9vdCBvYmplY3QsIGFuZCByb290T2JqZWN0IGlzIHRoZSByb290IG9iamVjdCBpbml0aWFsbHlcbiAgICogc3VibWl0dGVkIHRvIHRoIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBJZiBhIHRoaXJkIG9wdGlvbmFsIHBhcmFtZXRlciAnYm90dG9tVXAnIGlzIHNldCB0byBUUlVFLCB0aGUgaXRlcmF0b3JcbiAgICogZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgb24gc3ViLW9iamVjdHMgYW5kIGFycmF5cyBhZnRlciBiZWluZ1xuICAgKiBjYWxsZWQgb24gdGhlaXIgY29udGVudHMsIHJhdGhlciB0aGFuIGJlZm9yZSwgd2hpY2ggaXMgdGhlIGRlZmF1bHQuXG4gICAqXG4gICAqIFRoaXMgZnVuY3Rpb24gY2FuIGFsc28gb3B0aW9uYWxseSBiZSBjYWxsZWQgZGlyZWN0bHkgb24gYSBzdWItb2JqZWN0IGJ5XG4gICAqIGluY2x1ZGluZyBvcHRpb25hbCA0dGggYW5kIDV0aCBwYXJhbWV0ZXJzIHRvIHNwZWNpZnkgdGhlIGluaXRpYWxcbiAgICogcm9vdCBvYmplY3QgYW5kIHBvaW50ZXIuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgLSB0aGUgaW5pdGlhbCBvYmplY3Qgb3IgYXJyYXlcbiAgICogQHBhcmFtIGZuIC0gaXRlcmF0ZWUgZnVuY3Rpb25cbiAgICogQHBhcmFtIGJvdHRvbVVwIC0gb3B0aW9uYWwsIHNldCB0byBUUlVFIHRvIHJldmVyc2UgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSBwb2ludGVyIC0gb3B0aW9uYWwsIEpTT04gUG9pbnRlciB0byBvYmplY3Qgd2l0aGluIHJvb3RPYmplY3RcbiAgICogQHBhcmFtIHJvb3RPYmplY3QgLSBvcHRpb25hbCwgcm9vdCBvYmplY3Qgb3IgYXJyYXlcbiAgICogQHJldHVybiBUaGUgbW9kaWZpZWQgb2JqZWN0XG4gICAqL1xuICBzdGF0aWMgZm9yRWFjaERlZXAoXG4gICAgb2JqZWN0LFxuICAgIGZuOiAodjogYW55LCBwPzogc3RyaW5nLCBvPzogYW55KSA9PiBhbnkgPSAodikgPT4gdixcbiAgICBib3R0b21VcCA9IGZhbHNlLFxuICAgIHBvaW50ZXIgPSAnJyxcbiAgICByb290T2JqZWN0ID0gb2JqZWN0XG4gICkge1xuICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYGZvckVhY2hEZWVwIGVycm9yOiBJdGVyYXRvciBpcyBub3QgYSBmdW5jdGlvbjpgLCBmbilcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoIWJvdHRvbVVwKSB7XG4gICAgICBmbihvYmplY3QsIHBvaW50ZXIsIHJvb3RPYmplY3QpXG4gICAgfVxuICAgIGlmIChpc09iamVjdChvYmplY3QpIHx8IGlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMob2JqZWN0KSkge1xuICAgICAgICBjb25zdCBuZXdQb2ludGVyID0gcG9pbnRlciArICcvJyArIHRoaXMuZXNjYXBlKGtleSlcbiAgICAgICAgdGhpcy5mb3JFYWNoRGVlcChvYmplY3Rba2V5XSwgZm4sIGJvdHRvbVVwLCBuZXdQb2ludGVyLCByb290T2JqZWN0KVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoYm90dG9tVXApIHtcbiAgICAgIGZuKG9iamVjdCwgcG9pbnRlciwgcm9vdE9iamVjdClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ2ZvckVhY2hEZWVwQ29weScgZnVuY3Rpb25cbiAgICpcbiAgICogU2ltaWxhciB0byBmb3JFYWNoRGVlcCwgYnV0IHJldHVybnMgYSBjb3B5IG9mIHRoZSBvcmlnaW5hbCBvYmplY3QsIHdpdGhcbiAgICogdGhlIHNhbWUga2V5cyBhbmQgaW5kZXhlcywgYnV0IHdpdGggdmFsdWVzIHJlcGxhY2VkIHdpdGggdGhlIHJlc3VsdCBvZlxuICAgKiB0aGUgaXRlcmF0ZWUgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgLSB0aGUgaW5pdGlhbCBvYmplY3Qgb3IgYXJyYXlcbiAgICogQHBhcmFtIGZuIC0gaXRlcmF0ZWUgZnVuY3Rpb25cbiAgICogQHBhcmFtIGJvdHRvbVVwIC0gb3B0aW9uYWwsIHNldCB0byBUUlVFIHRvIHJldmVyc2UgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSBwb2ludGVyIC0gb3B0aW9uYWwsIEpTT04gUG9pbnRlciB0byBvYmplY3Qgd2l0aGluIHJvb3RPYmplY3RcbiAgICogQHBhcmFtIHJvb3RPYmplY3QgLSBvcHRpb25hbCwgcm9vdCBvYmplY3Qgb3IgYXJyYXlcbiAgICogQHJldHVybiBUaGUgY29waWVkIG9iamVjdFxuICAgKi9cbiAgc3RhdGljIGZvckVhY2hEZWVwQ29weShcbiAgICBvYmplY3Q6IG9iamVjdCxcbiAgICBmbjogKHY6IGFueSwgcD86IHN0cmluZywgbz86IGFueSkgPT4gYW55ID0gKHYpID0+IHYsXG4gICAgYm90dG9tVXA6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICBwb2ludGVyOiBzdHJpbmcgPSAnJyxcbiAgICByb290T2JqZWN0OiBvYmplY3QgPSBvYmplY3RcbiAgKSB7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS5lcnJvcihgZm9yRWFjaERlZXBDb3B5IGVycm9yOiBJdGVyYXRvciBpcyBub3QgYSBmdW5jdGlvbjpgLCBmbilcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGlmIChpc09iamVjdChvYmplY3QpIHx8IEFycmF5LmlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgbGV0IG5ld09iamVjdCA9IEFycmF5LmlzQXJyYXkob2JqZWN0KSA/IFsuLi5vYmplY3RdIDogey4uLm9iamVjdH1cbiAgICAgIGlmICghYm90dG9tVXApIHtcbiAgICAgICAgbmV3T2JqZWN0ID0gZm4obmV3T2JqZWN0LCBwb2ludGVyLCByb290T2JqZWN0KVxuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMobmV3T2JqZWN0KSkge1xuICAgICAgICBjb25zdCBuZXdQb2ludGVyID0gcG9pbnRlciArICcvJyArIHRoaXMuZXNjYXBlKGtleSlcbiAgICAgICAgbmV3T2JqZWN0W2tleV0gPSB0aGlzLmZvckVhY2hEZWVwQ29weShcbiAgICAgICAgICBuZXdPYmplY3Rba2V5XSwgZm4sIGJvdHRvbVVwLCBuZXdQb2ludGVyLCByb290T2JqZWN0XG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIGlmIChib3R0b21VcCkge1xuICAgICAgICBuZXdPYmplY3QgPSBmbihuZXdPYmplY3QsIHBvaW50ZXIsIHJvb3RPYmplY3QpXG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3T2JqZWN0XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmbihvYmplY3QsIHBvaW50ZXIsIHJvb3RPYmplY3QpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdlc2NhcGUnIGZ1bmN0aW9uXG4gICAqXG4gICAqIEVzY2FwZXMgYSBzdHJpbmcgcmVmZXJlbmNlIGtleVxuICAgKlxuICAgKiBAcGFyYW0ga2V5IC0gc3RyaW5nIGtleSB0byBlc2NhcGVcbiAgICogQHJldHVybiBlc2NhcGVkIGtleVxuICAgKi9cbiAgc3RhdGljIGVzY2FwZShrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGtleS50b1N0cmluZygpLnJlcGxhY2UoL34vZywgJ34wJykucmVwbGFjZSgvXFwvL2csICd+MScpXG4gIH1cblxuICAvKipcbiAgICogJ3VuZXNjYXBlJyBmdW5jdGlvblxuICAgKlxuICAgKiBVbmVzY2FwZXMgYSBzdHJpbmcgcmVmZXJlbmNlIGtleVxuICAgKlxuICAgKiBAcGFyYW0ga2V5IC0gc3RyaW5nIGtleSB0byB1bmVzY2FwZVxuICAgKiBAcmV0dXJuIHVuZXNjYXBlZCBrZXlcbiAgICovXG4gIHN0YXRpYyB1bmVzY2FwZShrZXk6IHN0cmluZykge1xuICAgIHJldHVybiBrZXkudG9TdHJpbmcoKS5yZXBsYWNlKC9+MS9nLCAnLycpLnJlcGxhY2UoL34wL2csICd+JylcbiAgfVxuXG4gIC8qKlxuICAgKiAncGFyc2UnIGZ1bmN0aW9uXG4gICAqXG4gICAqIENvbnZlcnRzIGEgc3RyaW5nIEpTT04gUG9pbnRlciBpbnRvIGEgYXJyYXkgb2Yga2V5c1xuICAgKiAoaWYgaW5wdXQgaXMgYWxyZWFkeSBhbiBhbiBhcnJheSBvZiBrZXlzLCBpdCBpcyByZXR1cm5lZCB1bmNoYW5nZWQpXG4gICAqXG4gICAqIEBwYXJhbSBwb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gICAqIEBwYXJhbSBlcnJvcnMgLSBTaG93IGVycm9yIGlmIGludmFsaWQgcG9pbnRlcj9cbiAgICogQHJldHVybiBKU09OIFBvaW50ZXIgYXJyYXkgb2Yga2V5c1xuICAgKi9cbiAgc3RhdGljIHBhcnNlKFxuICAgIHBvaW50ZXI6IFBvaW50ZXIsXG4gICAgZXJyb3JzOiBib29sZWFuID0gZmFsc2VcbiAgKTogc3RyaW5nW10ge1xuICAgIGlmICghdGhpcy5pc0pzb25Qb2ludGVyKHBvaW50ZXIpKSB7XG4gICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYHBhcnNlIGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlcjogJHtwb2ludGVyfWApXG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBpZiAoaXNBcnJheShwb2ludGVyKSkge1xuICAgICAgcmV0dXJuIHBvaW50ZXIgYXMgc3RyaW5nW11cbiAgICB9XG4gICAgaWYgKHR5cGVvZiBwb2ludGVyID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKHBvaW50ZXJbMF0gPT09ICcjJykge1xuICAgICAgICBwb2ludGVyID0gcG9pbnRlci5zbGljZSgxKVxuICAgICAgfVxuICAgICAgaWYgKHBvaW50ZXIgPT09ICcnIHx8IHBvaW50ZXIgPT09ICcvJykge1xuICAgICAgICByZXR1cm4gW11cbiAgICAgIH1cbiAgICAgIHJldHVybiBwb2ludGVyLnNsaWNlKDEpLnNwbGl0KCcvJykubWFwKHRoaXMudW5lc2NhcGUpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdjb21waWxlJyBmdW5jdGlvblxuICAgKlxuICAgKiBDb252ZXJ0cyBhbiBhcnJheSBvZiBrZXlzIGludG8gYSBKU09OIFBvaW50ZXIgc3RyaW5nXG4gICAqIChpZiBpbnB1dCBpcyBhbHJlYWR5IGEgc3RyaW5nLCBpdCBpcyBub3JtYWxpemVkIGFuZCByZXR1cm5lZClcbiAgICpcbiAgICogVGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXIgaXMgYSBkZWZhdWx0IHdoaWNoIHdpbGwgcmVwbGFjZSBhbnkgZW1wdHkga2V5cy5cbiAgICpcbiAgICogQHBhcmFtIHBvaW50ZXIgLSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSlcbiAgICogQHBhcmFtIGRlZmF1bHRWYWx1ZSAtIERlZmF1bHQgdmFsdWVcbiAgICogQHBhcmFtIGVycm9ycyAtIFNob3cgZXJyb3IgaWYgaW52YWxpZCBwb2ludGVyP1xuICAgKiBAcmV0dXJuIEpTT04gUG9pbnRlciBzdHJpbmdcbiAgICovXG4gIHN0YXRpYyBjb21waWxlKFxuICAgIHBvaW50ZXI6IFBvaW50ZXIsXG4gICAgZGVmYXVsdFZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSAnJyxcbiAgICBlcnJvcnM6IGJvb2xlYW4gPSBmYWxzZVxuICApOiBzdHJpbmcge1xuICAgIGlmIChwb2ludGVyID09PSAnIycpIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNKc29uUG9pbnRlcihwb2ludGVyKSkge1xuICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBjb21waWxlIGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlcjogJHtwb2ludGVyfWApXG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShwb2ludGVyKSkge1xuICAgICAgaWYgKHBvaW50ZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAnJ1xuICAgICAgfVxuICAgICAgcmV0dXJuICcvJyArIHBvaW50ZXIubWFwKFxuICAgICAgICBrZXkgPT4ga2V5ID09PSAnJyA/IGRlZmF1bHRWYWx1ZSA6IHRoaXMuZXNjYXBlKGtleSlcbiAgICAgICkuam9pbignLycpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgcG9pbnRlciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChwb2ludGVyWzBdID09PSAnIycpIHtcbiAgICAgICAgcG9pbnRlciA9IHBvaW50ZXIuc2xpY2UoMSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBwb2ludGVyXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICd0b0tleScgZnVuY3Rpb25cbiAgICpcbiAgICogRXh0cmFjdHMgbmFtZSBvZiB0aGUgZmluYWwga2V5IGZyb20gYSBKU09OIFBvaW50ZXIuXG4gICAqXG4gICAqIEBwYXJhbSBwb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gICAqIEBwYXJhbSBlcnJvcnMgLSBTaG93IGVycm9yIGlmIGludmFsaWQgcG9pbnRlcj9cbiAgICogQHJldHVybiB0aGUgZXh0cmFjdGVkIGtleVxuICAgKi9cbiAgc3RhdGljIHRvS2V5KFxuICAgIHBvaW50ZXI6IFBvaW50ZXIsXG4gICAgZXJyb3JzOiBib29sZWFuID0gZmFsc2VcbiAgKTogc3RyaW5nIHtcbiAgICBjb25zdCBrZXlBcnJheSA9IHRoaXMucGFyc2UocG9pbnRlciwgZXJyb3JzKVxuICAgIGlmIChrZXlBcnJheSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgaWYgKCFrZXlBcnJheS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cbiAgICByZXR1cm4ga2V5QXJyYXlba2V5QXJyYXkubGVuZ3RoIC0gMV1cbiAgfVxuXG4gIC8qKlxuICAgKiAnaXNKc29uUG9pbnRlcicgZnVuY3Rpb25cbiAgICpcbiAgICogQ2hlY2tzIGEgc3RyaW5nIG9yIGFycmF5IHZhbHVlIHRvIGRldGVybWluZSBpZiBpdCBpcyBhIHZhbGlkIEpTT04gUG9pbnRlci5cbiAgICogUmV0dXJucyB0cnVlIGlmIGEgc3RyaW5nIGlzIGVtcHR5LCBvciBzdGFydHMgd2l0aCAnLycgb3IgJyMvJy5cbiAgICogUmV0dXJucyB0cnVlIGlmIGFuIGFycmF5IGNvbnRhaW5zIG9ubHkgc3RyaW5nIHZhbHVlcy5cbiAgICpcbiAgICogQHBhcmFtIHZhbHVlIC0gdmFsdWUgdG8gY2hlY2tcbiAgICogQHJldHVybiB0cnVlIGlmIHZhbHVlIGlzIGEgdmFsaWQgSlNPTiBQb2ludGVyLCBvdGhlcndpc2UgZmFsc2VcbiAgICovXG4gIHN0YXRpYyBpc0pzb25Qb2ludGVyKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS5ldmVyeShrZXkgPT4gdHlwZW9mIGtleSA9PT0gJ3N0cmluZycpXG4gICAgfSBlbHNlIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09ICcjJykge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgICAgaWYgKHZhbHVlWzBdID09PSAnLycgfHwgdmFsdWUuc2xpY2UoMCwgMikgPT09ICcjLycpIHtcbiAgICAgICAgcmV0dXJuICEvKH5bXjAxXXx+JCkvZy50ZXN0KHZhbHVlKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8qKlxuICAgKiAnaXNTdWJQb2ludGVyJyBmdW5jdGlvblxuICAgKlxuICAgKiBDaGVja3Mgd2hldGhlciBvbmUgSlNPTiBQb2ludGVyIGlzIGEgc3Vic2V0IG9mIGFub3RoZXIuXG4gICAqXG4gICAqIEBwYXJhbSBzaG9ydFBvaW50ZXIgLSBwb3RlbnRpYWwgc3Vic2V0IEpTT04gUG9pbnRlclxuICAgKiBAcGFyYW0gbG9uZ1BvaW50ZXIgLSBwb3RlbnRpYWwgc3VwZXJzZXQgSlNPTiBQb2ludGVyXG4gICAqIEBwYXJhbSB0cnVlSWZNYXRjaGluZyAtIHJldHVybiB0cnVlIGlmIHBvaW50ZXJzIG1hdGNoP1xuICAgKiBAcGFyYW0gZXJyb3JzIC0gU2hvdyBlcnJvciBpZiBpbnZhbGlkIHBvaW50ZXI/XG4gICAqIEByZXR1cm4gdHJ1ZSBpZiBzaG9ydFBvaW50ZXIgaXMgYSBzdWJzZXQgb2YgbG9uZ1BvaW50ZXIsIGZhbHNlIGlmIG5vdFxuICAgKi9cbiAgc3RhdGljIGlzU3ViUG9pbnRlcihcbiAgICBzaG9ydFBvaW50ZXI6IFBvaW50ZXIsXG4gICAgbG9uZ1BvaW50ZXI6IFBvaW50ZXIsXG4gICAgdHJ1ZUlmTWF0Y2hpbmc6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICBlcnJvcnM6IGJvb2xlYW4gPSBmYWxzZVxuICApOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuaXNKc29uUG9pbnRlcihzaG9ydFBvaW50ZXIpIHx8ICF0aGlzLmlzSnNvblBvaW50ZXIobG9uZ1BvaW50ZXIpKSB7XG4gICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgIGxldCBpbnZhbGlkID0gJydcbiAgICAgICAgaWYgKCF0aGlzLmlzSnNvblBvaW50ZXIoc2hvcnRQb2ludGVyKSkge1xuICAgICAgICAgIGludmFsaWQgKz0gYCAxOiAke3Nob3J0UG9pbnRlcn1gXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmlzSnNvblBvaW50ZXIobG9uZ1BvaW50ZXIpKSB7XG4gICAgICAgICAgaW52YWxpZCArPSBgIDI6ICR7bG9uZ1BvaW50ZXJ9YFxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYGlzU3ViUG9pbnRlciBlcnJvcjogSW52YWxpZCBKU09OIFBvaW50ZXIgJHtpbnZhbGlkfWApXG4gICAgICB9XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgc2hvcnRQb2ludGVyID0gdGhpcy5jb21waWxlKHNob3J0UG9pbnRlciwgJycsIGVycm9ycylcbiAgICBsb25nUG9pbnRlciA9IHRoaXMuY29tcGlsZShsb25nUG9pbnRlciwgJycsIGVycm9ycylcbiAgICByZXR1cm4gc2hvcnRQb2ludGVyID09PSBsb25nUG9pbnRlciA/IHRydWVJZk1hdGNoaW5nIDpcbiAgICAgIGAke3Nob3J0UG9pbnRlcn0vYCA9PT0gbG9uZ1BvaW50ZXIuc2xpY2UoMCwgc2hvcnRQb2ludGVyLmxlbmd0aCArIDEpXG4gIH1cblxuICAvKipcbiAgICogJ3RvSW5kZXhlZFBvaW50ZXInIGZ1bmN0aW9uXG4gICAqXG4gICAqIE1lcmdlcyBhbiBhcnJheSBvZiBudW1lcmljIGluZGV4ZXMgYW5kIGEgZ2VuZXJpYyBwb2ludGVyIHRvIGNyZWF0ZSBhblxuICAgKiBpbmRleGVkIHBvaW50ZXIgZm9yIGEgc3BlY2lmaWMgaXRlbS5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIG1lcmdpbmcgdGhlIGdlbmVyaWMgcG9pbnRlciAnL2Zvby8tL2Jhci8tL2JheicgYW5kXG4gICAqIHRoZSBhcnJheSBbNCwgMl0gd291bGQgcmVzdWx0IGluIHRoZSBpbmRleGVkIHBvaW50ZXIgJy9mb28vNC9iYXIvMi9iYXonXG4gICAqXG4gICAqIEBwYXJhbSBnZW5lcmljUG9pbnRlciAtIFRoZSBnZW5lcmljIHBvaW50ZXJcbiAgICogQHBhcmFtIGluZGV4QXJyYXkgLSBUaGUgYXJyYXkgb2YgbnVtZXJpYyBpbmRleGVzXG4gICAqIEBwYXJhbSBhcnJheU1hcCAtIEFuIG9wdGlvbmFsIGFycmF5IG1hcFxuICAgKiBAcmV0dXJuIFRoZSBtZXJnZWQgcG9pbnRlciB3aXRoIGluZGV4ZXNcbiAgICovXG4gIHN0YXRpYyB0b0luZGV4ZWRQb2ludGVyKFxuICAgIGdlbmVyaWNQb2ludGVyOiBQb2ludGVyLFxuICAgIGluZGV4QXJyYXk6IG51bWJlcltdLFxuICAgIGFycmF5TWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbnVsbFxuICApOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmlzSnNvblBvaW50ZXIoZ2VuZXJpY1BvaW50ZXIpICYmIGlzQXJyYXkoaW5kZXhBcnJheSkpIHtcbiAgICAgIGxldCBpbmRleGVkUG9pbnRlciA9IHRoaXMuY29tcGlsZShnZW5lcmljUG9pbnRlcilcbiAgICAgIGlmIChpc01hcChhcnJheU1hcCkpIHtcbiAgICAgICAgbGV0IGFycmF5SW5kZXggPSAwXG4gICAgICAgIHJldHVybiBpbmRleGVkUG9pbnRlci5yZXBsYWNlKC9cXC9cXC0oPz1cXC98JCkvZywgKGtleSwgc3RyaW5nSW5kZXgpID0+XG4gICAgICAgICAgYXJyYXlNYXAuaGFzKChpbmRleGVkUG9pbnRlciBhcyBzdHJpbmcpLnNsaWNlKDAsIHN0cmluZ0luZGV4KSkgP1xuICAgICAgICAgICAgJy8nICsgaW5kZXhBcnJheVthcnJheUluZGV4KytdIDoga2V5XG4gICAgICAgIClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoY29uc3QgcG9pbnRlckluZGV4IG9mIGluZGV4QXJyYXkpIHtcbiAgICAgICAgICBpbmRleGVkUG9pbnRlciA9IGluZGV4ZWRQb2ludGVyLnJlcGxhY2UoJy8tJywgJy8nICsgcG9pbnRlckluZGV4KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbmRleGVkUG9pbnRlclxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNKc29uUG9pbnRlcihnZW5lcmljUG9pbnRlcikpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYHRvSW5kZXhlZFBvaW50ZXIgZXJyb3I6IEludmFsaWQgSlNPTiBQb2ludGVyOiAke2dlbmVyaWNQb2ludGVyfWApXG4gICAgfVxuICAgIGlmICghaXNBcnJheShpbmRleEFycmF5KSkge1xuICAgICAgY29uc29sZS5lcnJvcihgdG9JbmRleGVkUG9pbnRlciBlcnJvcjogSW52YWxpZCBpbmRleEFycmF5OiAke2luZGV4QXJyYXl9YClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ3RvR2VuZXJpY1BvaW50ZXInIGZ1bmN0aW9uXG4gICAqXG4gICAqIENvbXBhcmVzIGFuIGluZGV4ZWQgcG9pbnRlciB0byBhbiBhcnJheSBtYXAgYW5kIHJlbW92ZXMgbGlzdCBhcnJheVxuICAgKiBpbmRleGVzIChidXQgbGVhdmVzIHR1cGxlIGFycnJheSBpbmRleGVzIGFuZCBhbGwgb2JqZWN0IGtleXMsIGluY2x1ZGluZ1xuICAgKiBudW1lcmljIGtleXMpIHRvIGNyZWF0ZSBhIGdlbmVyaWMgcG9pbnRlci5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIHVzaW5nIHRoZSBpbmRleGVkIHBvaW50ZXIgJy9mb28vMS9iYXIvMi9iYXovMycgYW5kXG4gICAqIHRoZSBhcnJheU1hcCBbWycvZm9vJywgMF0sIFsnL2Zvby8tL2JhcicsIDNdLCBbJy9mb28vLS9iYXIvLS9iYXonLCAwXV1cbiAgICogd291bGQgcmVzdWx0IGluIHRoZSBnZW5lcmljIHBvaW50ZXIgJy9mb28vLS9iYXIvMi9iYXovLSdcbiAgICogVXNpbmcgdGhlIGluZGV4ZWQgcG9pbnRlciAnL2Zvby8xL2Jhci80L2Jhei8zJyBhbmQgdGhlIHNhbWUgYXJyYXlNYXBcbiAgICogd291bGQgcmVzdWx0IGluIHRoZSBnZW5lcmljIHBvaW50ZXIgJy9mb28vLS9iYXIvLS9iYXovLSdcbiAgICogKHRoZSBiYXIgYXJyYXkgaGFzIDMgdHVwbGUgaXRlbXMsIHNvIGluZGV4IDIgaXMgcmV0YWluZWQsIGJ1dCA0IGlzIHJlbW92ZWQpXG4gICAqXG4gICAqIFRoZSBzdHJ1Y3R1cmUgb2YgdGhlIGFycmF5TWFwIGlzOiBbWydwYXRoIHRvIGFycmF5JywgbnVtYmVyIG9mIHR1cGxlIGl0ZW1zXS4uLl1cbiAgICpcbiAgICogQHBhcmFtIGluZGV4ZWRQb2ludGVyIC0gVGhlIGluZGV4ZWQgcG9pbnRlciAoYXJyYXkgb3Igc3RyaW5nKVxuICAgKiBAcGFyYW0gYXJyYXlNYXAgLSBUaGUgb3B0aW9uYWwgYXJyYXkgbWFwIChmb3IgcHJlc2VydmluZyB0dXBsZSBpbmRleGVzKVxuICAgKiBAcmV0dXJuIFRoZSBnZW5lcmljIHBvaW50ZXIgd2l0aCBpbmRleGVzIHJlbW92ZWRcbiAgICovXG4gIHN0YXRpYyB0b0dlbmVyaWNQb2ludGVyKFxuICAgIGluZGV4ZWRQb2ludGVyOiBQb2ludGVyLFxuICAgIGFycmF5TWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKVxuICApOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmlzSnNvblBvaW50ZXIoaW5kZXhlZFBvaW50ZXIpICYmIGlzTWFwKGFycmF5TWFwKSkge1xuICAgICAgY29uc3QgcG9pbnRlckFycmF5ID0gdGhpcy5wYXJzZShpbmRleGVkUG9pbnRlcilcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcG9pbnRlckFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHN1YlBvaW50ZXIgPSB0aGlzLmNvbXBpbGUocG9pbnRlckFycmF5LnNsaWNlKDAsIGkpKVxuICAgICAgICBpZiAoYXJyYXlNYXAuaGFzKHN1YlBvaW50ZXIpICYmXG4gICAgICAgICAgYXJyYXlNYXAuZ2V0KHN1YlBvaW50ZXIpIDw9ICtwb2ludGVyQXJyYXlbaV1cbiAgICAgICAgKSB7XG4gICAgICAgICAgcG9pbnRlckFycmF5W2ldID0gJy0nXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmNvbXBpbGUocG9pbnRlckFycmF5KVxuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNKc29uUG9pbnRlcihpbmRleGVkUG9pbnRlcikpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYHRvR2VuZXJpY1BvaW50ZXIgZXJyb3I6IGludmFsaWQgSlNPTiBQb2ludGVyOiAke2luZGV4ZWRQb2ludGVyfWApXG4gICAgfVxuICAgIGlmICghaXNNYXAoYXJyYXlNYXApKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGB0b0dlbmVyaWNQb2ludGVyIGVycm9yOiBpbnZhbGlkIGFycmF5TWFwOiAke2FycmF5TWFwfWApXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICd0b0NvbnRyb2xQb2ludGVyJyBmdW5jdGlvblxuICAgKlxuICAgKiBBY2NlcHRzIGEgSlNPTiBQb2ludGVyIGZvciBhIGRhdGEgb2JqZWN0IGFuZCByZXR1cm5zIGEgSlNPTiBQb2ludGVyIGZvciB0aGVcbiAgICogbWF0Y2hpbmcgY29udHJvbCBpbiBhbiBBbmd1bGFyIEZvcm1Hcm91cC5cbiAgICpcbiAgICogQHBhcmFtIGRhdGFQb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpIHRvIGEgZGF0YSBvYmplY3RcbiAgICogQHBhcmFtIGZvcm1Hcm91cCAtIEFuZ3VsYXIgRm9ybUdyb3VwIHRvIGdldCB2YWx1ZSBmcm9tXG4gICAqIEBwYXJhbSBjb250cm9sTXVzdEV4aXN0IC0gT25seSByZXR1cm4gaWYgY29udHJvbCBleGlzdHM/XG4gICAqIEByZXR1cm4gSlNPTiBQb2ludGVyIChzdHJpbmcpIHRvIHRoZSBmb3JtR3JvdXAgb2JqZWN0XG4gICAqL1xuICBzdGF0aWMgdG9Db250cm9sUG9pbnRlcihcbiAgICBkYXRhUG9pbnRlcjogUG9pbnRlcixcbiAgICBmb3JtR3JvdXA6IEZvcm1Hcm91cCxcbiAgICBjb250cm9sTXVzdEV4aXN0OiBib29sZWFuID0gZmFsc2VcbiAgKSB7XG4gICAgY29uc3QgZGF0YVBvaW50ZXJBcnJheSA9IHRoaXMucGFyc2UoZGF0YVBvaW50ZXIpXG4gICAgY29uc3QgY29udHJvbFBvaW50ZXJBcnJheTogc3RyaW5nW10gPSBbXVxuICAgIGxldCBzdWJHcm91cDogYW55ID0gZm9ybUdyb3VwXG4gICAgaWYgKGRhdGFQb2ludGVyQXJyYXkgIT09IG51bGwpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIGRhdGFQb2ludGVyQXJyYXkpIHtcbiAgICAgICAgaWYgKGhhc093bihzdWJHcm91cCwgJ2NvbnRyb2xzJykpIHtcbiAgICAgICAgICBjb250cm9sUG9pbnRlckFycmF5LnB1c2goJ2NvbnRyb2xzJylcbiAgICAgICAgICBzdWJHcm91cCA9IHN1Ykdyb3VwLmNvbnRyb2xzXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXJyYXkoc3ViR3JvdXApICYmIChrZXkgPT09ICctJykpIHtcbiAgICAgICAgICBjb250cm9sUG9pbnRlckFycmF5LnB1c2goKHN1Ykdyb3VwLmxlbmd0aCAtIDEpLnRvU3RyaW5nKCkpXG4gICAgICAgICAgc3ViR3JvdXAgPSBzdWJHcm91cFtzdWJHcm91cC5sZW5ndGggLSAxXVxuICAgICAgICB9IGVsc2UgaWYgKGhhc093bihzdWJHcm91cCwga2V5KSkge1xuICAgICAgICAgIGNvbnRyb2xQb2ludGVyQXJyYXkucHVzaChrZXkpXG4gICAgICAgICAgc3ViR3JvdXAgPSBzdWJHcm91cFtrZXldXG4gICAgICAgIH0gZWxzZSBpZiAoY29udHJvbE11c3RFeGlzdCkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYHRvQ29udHJvbFBvaW50ZXIgZXJyb3I6IFVuYWJsZSB0byBmaW5kIFwiJHtrZXl9XCIgaXRlbSBpbiBGb3JtR3JvdXAuYClcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGRhdGFQb2ludGVyKVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybUdyb3VwKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnRyb2xQb2ludGVyQXJyYXkucHVzaChrZXkpXG4gICAgICAgICAgc3ViR3JvdXAgPSB7Y29udHJvbHM6IHt9fVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5jb21waWxlKGNvbnRyb2xQb2ludGVyQXJyYXkpXG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoYHRvQ29udHJvbFBvaW50ZXIgZXJyb3I6IEludmFsaWQgSlNPTiBQb2ludGVyOiAke2RhdGFQb2ludGVyfWApXG4gIH1cblxuICAvKipcbiAgICogJ3RvU2NoZW1hUG9pbnRlcicgZnVuY3Rpb25cbiAgICpcbiAgICogQWNjZXB0cyBhIEpTT04gUG9pbnRlciB0byBhIHZhbHVlIGluc2lkZSBhIGRhdGEgb2JqZWN0IGFuZCBhIEpTT04gc2NoZW1hXG4gICAqIGZvciB0aGF0IG9iamVjdC5cbiAgICpcbiAgICogUmV0dXJucyBhIFBvaW50ZXIgdG8gdGhlIHN1Yi1zY2hlbWEgZm9yIHRoZSB2YWx1ZSBpbnNpZGUgdGhlIG9iamVjdCdzIHNjaGVtYS5cbiAgICpcbiAgICogQHBhcmFtIGRhdGFQb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpIHRvIGFuIG9iamVjdFxuICAgKiBAcGFyYW0gc2NoZW1hIC0gSlNPTiBzY2hlbWEgZm9yIHRoZSBvYmplY3RcbiAgICogQHJldHVybiBKU09OIFBvaW50ZXIgKHN0cmluZykgdG8gdGhlIG9iamVjdCdzIHNjaGVtYVxuICAgKi9cbiAgc3RhdGljIHRvU2NoZW1hUG9pbnRlcihcbiAgICBkYXRhUG9pbnRlcjogUG9pbnRlcixcbiAgICBzY2hlbWE6IGFueVxuICApOiBQb2ludGVyIHtcbiAgICBpZiAodGhpcy5pc0pzb25Qb2ludGVyKGRhdGFQb2ludGVyKSAmJiB0eXBlb2Ygc2NoZW1hID09PSAnb2JqZWN0Jykge1xuICAgICAgY29uc3QgcG9pbnRlckFycmF5ID0gdGhpcy5wYXJzZShkYXRhUG9pbnRlcilcbiAgICAgIGlmICghcG9pbnRlckFycmF5Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gJydcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZpcnN0S2V5ID0gcG9pbnRlckFycmF5LnNoaWZ0KClcbiAgICAgIGlmIChzY2hlbWEudHlwZSA9PT0gJ29iamVjdCcgfHwgc2NoZW1hLnByb3BlcnRpZXMgfHwgc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmICgoc2NoZW1hLnByb3BlcnRpZXMgfHwge30pW2ZpcnN0S2V5XSkge1xuICAgICAgICAgIHJldHVybiBgL3Byb3BlcnRpZXMvJHt0aGlzLmVzY2FwZShmaXJzdEtleSl9YCArXG4gICAgICAgICAgICB0aGlzLnRvU2NoZW1hUG9pbnRlcihwb2ludGVyQXJyYXksIHNjaGVtYS5wcm9wZXJ0aWVzW2ZpcnN0S2V5XSlcbiAgICAgICAgfSBlbHNlIGlmIChzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMpIHtcbiAgICAgICAgICByZXR1cm4gJy9hZGRpdGlvbmFsUHJvcGVydGllcycgK1xuICAgICAgICAgICAgdGhpcy50b1NjaGVtYVBvaW50ZXIocG9pbnRlckFycmF5LCBzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICgoc2NoZW1hLnR5cGUgPT09ICdhcnJheScgfHwgc2NoZW1hLml0ZW1zKSAmJlxuICAgICAgICAoaXNOdW1iZXIoZmlyc3RLZXkpIHx8IGZpcnN0S2V5ID09PSAnLScgfHwgZmlyc3RLZXkgPT09ICcnKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGFycmF5SXRlbSA9IGZpcnN0S2V5ID09PSAnLScgfHwgZmlyc3RLZXkgPT09ICcnID8gMCA6ICtmaXJzdEtleVxuICAgICAgICBpZiAoaXNBcnJheShzY2hlbWEuaXRlbXMpKSB7XG4gICAgICAgICAgaWYgKGFycmF5SXRlbSA8IHNjaGVtYS5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiAnL2l0ZW1zLycgKyBhcnJheUl0ZW0gK1xuICAgICAgICAgICAgICB0aGlzLnRvU2NoZW1hUG9pbnRlcihwb2ludGVyQXJyYXksIHNjaGVtYS5pdGVtc1thcnJheUl0ZW1dKVxuICAgICAgICAgIH0gZWxzZSBpZiAoc2NoZW1hLmFkZGl0aW9uYWxJdGVtcykge1xuICAgICAgICAgICAgcmV0dXJuICcvYWRkaXRpb25hbEl0ZW1zJyArXG4gICAgICAgICAgICAgIHRoaXMudG9TY2hlbWFQb2ludGVyKHBvaW50ZXJBcnJheSwgc2NoZW1hLmFkZGl0aW9uYWxJdGVtcylcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3Qoc2NoZW1hLml0ZW1zKSkge1xuICAgICAgICAgIHJldHVybiAnL2l0ZW1zJyArIHRoaXMudG9TY2hlbWFQb2ludGVyKHBvaW50ZXJBcnJheSwgc2NoZW1hLml0ZW1zKVxuICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHNjaGVtYS5hZGRpdGlvbmFsSXRlbXMpKSB7XG4gICAgICAgICAgcmV0dXJuICcvYWRkaXRpb25hbEl0ZW1zJyArXG4gICAgICAgICAgICB0aGlzLnRvU2NoZW1hUG9pbnRlcihwb2ludGVyQXJyYXksIHNjaGVtYS5hZGRpdGlvbmFsSXRlbXMpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnNvbGUuZXJyb3IoYHRvU2NoZW1hUG9pbnRlciBlcnJvcjogRGF0YSBwb2ludGVyICR7ZGF0YVBvaW50ZXJ9IGAgK1xuICAgICAgICBgbm90IGNvbXBhdGlibGUgd2l0aCBzY2hlbWEgJHtzY2hlbWF9YClcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGlmICghdGhpcy5pc0pzb25Qb2ludGVyKGRhdGFQb2ludGVyKSkge1xuICAgICAgY29uc29sZS5lcnJvcihgdG9TY2hlbWFQb2ludGVyIGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlcjogJHtkYXRhUG9pbnRlcn1gKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHNjaGVtYSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYHRvU2NoZW1hUG9pbnRlciBlcnJvcjogSW52YWxpZCBKU09OIFNjaGVtYTogJHtzY2hlbWF9YClcbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIC8qKlxuICAgKiAndG9EYXRhUG9pbnRlcicgZnVuY3Rpb25cbiAgICpcbiAgICogQWNjZXB0cyBhIEpTT04gUG9pbnRlciB0byBhIHN1Yi1zY2hlbWEgaW5zaWRlIGEgSlNPTiBzY2hlbWEgYW5kIHRoZSBzY2hlbWEuXG4gICAqXG4gICAqIElmIHBvc3NpYmxlLCByZXR1cm5zIGEgZ2VuZXJpYyBQb2ludGVyIHRvIHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlIGluc2lkZVxuICAgKiB0aGUgZGF0YSBvYmplY3QgZGVzY3JpYmVkIGJ5IHRoZSBKU09OIHNjaGVtYS5cbiAgICpcbiAgICogUmV0dXJucyBudWxsIGlmIHRoZSBzdWItc2NoZW1hIGlzIGluIGFuIGFtYmlndW91cyBsb2NhdGlvbiAoc3VjaCBhc1xuICAgKiBkZWZpbml0aW9ucyBvciBhZGRpdGlvbmFsUHJvcGVydGllcykgd2hlcmUgdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWVcbiAgICogbG9jYXRpb24gY2Fubm90IGJlIGRldGVybWluZWQuXG4gICAqXG4gICAqIEBwYXJhbSBzY2hlbWFQb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpIHRvIGEgSlNPTiBzY2hlbWFcbiAgICogQHBhcmFtIHNjaGVtYSAtIHRoZSBKU09OIHNjaGVtYVxuICAgKiBAcGFyYW0gZXJyb3JzIC0gU2hvdyBlcnJvcnM/XG4gICAqIEByZXR1cm4gSlNPTiBQb2ludGVyIChzdHJpbmcpIHRvIHRoZSB2YWx1ZSBpbiB0aGUgZGF0YSBvYmplY3RcbiAgICovXG4gIHN0YXRpYyB0b0RhdGFQb2ludGVyKFxuICAgIHNjaGVtYVBvaW50ZXI6IFBvaW50ZXIsXG4gICAgc2NoZW1hOiBhbnksXG4gICAgZXJyb3JzOiBib29sZWFuID0gZmFsc2VcbiAgKTogUG9pbnRlciB7XG4gICAgaWYgKHRoaXMuaXNKc29uUG9pbnRlcihzY2hlbWFQb2ludGVyKSAmJiB0eXBlb2Ygc2NoZW1hID09PSAnb2JqZWN0JyAmJlxuICAgICAgdGhpcy5oYXMoc2NoZW1hLCBzY2hlbWFQb2ludGVyKVxuICAgICkge1xuICAgICAgY29uc3QgcG9pbnRlckFycmF5ID0gdGhpcy5wYXJzZShzY2hlbWFQb2ludGVyKVxuICAgICAgaWYgKCFwb2ludGVyQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiAnJ1xuICAgICAgfVxuICAgICAgY29uc3QgZGF0YVBvaW50ZXIgPSAnJ1xuICAgICAgY29uc3QgZmlyc3RLZXkgPSBwb2ludGVyQXJyYXkuc2hpZnQoKVxuICAgICAgaWYgKGZpcnN0S2V5ID09PSAncHJvcGVydGllcycgfHxcbiAgICAgICAgKGZpcnN0S2V5ID09PSAnaXRlbXMnICYmIGlzQXJyYXkoc2NoZW1hLml0ZW1zKSlcbiAgICAgICkge1xuICAgICAgICBjb25zdCBzZWNvbmRLZXkgPSBwb2ludGVyQXJyYXkuc2hpZnQoKVxuICAgICAgICBjb25zdCBwb2ludGVyU3VmZml4ID0gdGhpcy50b0RhdGFQb2ludGVyKHBvaW50ZXJBcnJheSwgc2NoZW1hW2ZpcnN0S2V5XVtzZWNvbmRLZXldKVxuICAgICAgICByZXR1cm4gcG9pbnRlclN1ZmZpeCA9PT0gbnVsbCA/IG51bGwgOiAnLycgKyBzZWNvbmRLZXkgKyBwb2ludGVyU3VmZml4XG4gICAgICB9IGVsc2UgaWYgKGZpcnN0S2V5ID09PSAnYWRkaXRpb25hbEl0ZW1zJyB8fFxuICAgICAgICAoZmlyc3RLZXkgPT09ICdpdGVtcycgJiYgaXNPYmplY3Qoc2NoZW1hLml0ZW1zKSlcbiAgICAgICkge1xuICAgICAgICBjb25zdCBwb2ludGVyU3VmZml4ID0gdGhpcy50b0RhdGFQb2ludGVyKHBvaW50ZXJBcnJheSwgc2NoZW1hW2ZpcnN0S2V5XSlcbiAgICAgICAgcmV0dXJuIHBvaW50ZXJTdWZmaXggPT09IG51bGwgPyBudWxsIDogJy8tJyArIHBvaW50ZXJTdWZmaXhcbiAgICAgIH0gZWxzZSBpZiAoWydhbGxPZicsICdhbnlPZicsICdvbmVPZiddLmluY2x1ZGVzKGZpcnN0S2V5KSkge1xuICAgICAgICBjb25zdCBzZWNvbmRLZXkgPSBwb2ludGVyQXJyYXkuc2hpZnQoKVxuICAgICAgICByZXR1cm4gdGhpcy50b0RhdGFQb2ludGVyKHBvaW50ZXJBcnJheSwgc2NoZW1hW2ZpcnN0S2V5XVtzZWNvbmRLZXldKVxuICAgICAgfSBlbHNlIGlmIChmaXJzdEtleSA9PT0gJ25vdCcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9EYXRhUG9pbnRlcihwb2ludGVyQXJyYXksIHNjaGVtYVtmaXJzdEtleV0pXG4gICAgICB9IGVsc2UgaWYgKFsnY29udGFpbnMnLCAnZGVmaW5pdGlvbnMnLCAnZGVwZW5kZW5jaWVzJywgJ2FkZGl0aW9uYWxJdGVtcycsXG4gICAgICAgICdhZGRpdGlvbmFsUHJvcGVydGllcycsICdwYXR0ZXJuUHJvcGVydGllcycsICdwcm9wZXJ0eU5hbWVzJ10uaW5jbHVkZXMoZmlyc3RLZXkpXG4gICAgICApIHtcbiAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYHRvRGF0YVBvaW50ZXIgZXJyb3I6IEFtYmlndW91cyBsb2NhdGlvbmApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAnJ1xuICAgIH1cbiAgICBpZiAoZXJyb3JzKSB7XG4gICAgICBpZiAoIXRoaXMuaXNKc29uUG9pbnRlcihzY2hlbWFQb2ludGVyKSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGB0b0RhdGFQb2ludGVyIGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlcjogJHtzY2hlbWFQb2ludGVyfWApXG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHNjaGVtYSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgdG9EYXRhUG9pbnRlciBlcnJvcjogSW52YWxpZCBKU09OIFNjaGVtYTogJHtzY2hlbWF9YClcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygc2NoZW1hICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zb2xlLmVycm9yKGB0b0RhdGFQb2ludGVyIGVycm9yOiBQb2ludGVyICR7c2NoZW1hUG9pbnRlcn0gaW52YWxpZCBmb3IgU2NoZW1hOiAke3NjaGVtYX1gKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgLyoqXG4gICAqICdwYXJzZU9iamVjdFBhdGgnIGZ1bmN0aW9uXG4gICAqXG4gICAqIFBhcnNlcyBhIEphdmFTY3JpcHQgb2JqZWN0IHBhdGggaW50byBhbiBhcnJheSBvZiBrZXlzLCB3aGljaFxuICAgKiBjYW4gdGhlbiBiZSBwYXNzZWQgdG8gY29tcGlsZSgpIHRvIGNvbnZlcnQgaW50byBhIHN0cmluZyBKU09OIFBvaW50ZXIuXG4gICAqXG4gICAqIEJhc2VkIG9uIG1pa2UtbWFyY2FjY2kncyBleGNlbGxlbnQgb2JqZWN0cGF0aCBwYXJzZSBmdW5jdGlvbjpcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL21pa2UtbWFyY2FjY2kvb2JqZWN0cGF0aFxuICAgKlxuICAgKiBAcGFyYW0gcGF0aCAtIFRoZSBvYmplY3QgcGF0aCB0byBwYXJzZVxuICAgKiBAcmV0dXJuIFRoZSByZXN1bHRpbmcgYXJyYXkgb2Yga2V5c1xuICAgKi9cbiAgc3RhdGljIHBhcnNlT2JqZWN0UGF0aChwYXRoOiBQb2ludGVyKTogc3RyaW5nW10ge1xuICAgIGlmIChpc0FycmF5KHBhdGgpKSB7XG4gICAgICByZXR1cm4gcGF0aCBhcyBzdHJpbmdbXVxuICAgIH1cbiAgICBpZiAodGhpcy5pc0pzb25Qb2ludGVyKHBhdGgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJzZShwYXRoKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgaW5kZXggPSAwXG4gICAgICBjb25zdCBwYXJ0czogc3RyaW5nW10gPSBbXVxuICAgICAgd2hpbGUgKGluZGV4IDwgcGF0aC5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgbmV4dERvdCA9IHBhdGguaW5kZXhPZignLicsIGluZGV4KVxuICAgICAgICBjb25zdCBuZXh0T0IgPSBwYXRoLmluZGV4T2YoJ1snLCBpbmRleCkgLy8gbmV4dCBvcGVuIGJyYWNrZXRcbiAgICAgICAgaWYgKG5leHREb3QgPT09IC0xICYmIG5leHRPQiA9PT0gLTEpIHsgLy8gbGFzdCBpdGVtXG4gICAgICAgICAgcGFydHMucHVzaChwYXRoLnNsaWNlKGluZGV4KSlcbiAgICAgICAgICBpbmRleCA9IHBhdGgubGVuZ3RoXG4gICAgICAgIH0gZWxzZSBpZiAobmV4dERvdCAhPT0gLTEgJiYgKG5leHREb3QgPCBuZXh0T0IgfHwgbmV4dE9CID09PSAtMSkpIHsgLy8gZG90IG5vdGF0aW9uXG4gICAgICAgICAgcGFydHMucHVzaChwYXRoLnNsaWNlKGluZGV4LCBuZXh0RG90KSlcbiAgICAgICAgICBpbmRleCA9IG5leHREb3QgKyAxXG4gICAgICAgIH0gZWxzZSB7IC8vIGJyYWNrZXQgbm90YXRpb25cbiAgICAgICAgICBpZiAobmV4dE9CID4gaW5kZXgpIHtcbiAgICAgICAgICAgIHBhcnRzLnB1c2gocGF0aC5zbGljZShpbmRleCwgbmV4dE9CKSlcbiAgICAgICAgICAgIGluZGV4ID0gbmV4dE9CXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHF1b3RlID0gcGF0aC5jaGFyQXQobmV4dE9CICsgMSlcbiAgICAgICAgICBpZiAocXVvdGUgPT09ICdcIicgfHwgcXVvdGUgPT09ICdcXCcnKSB7IC8vIGVuY2xvc2luZyBxdW90ZXNcbiAgICAgICAgICAgIGxldCBuZXh0Q0IgPSBwYXRoLmluZGV4T2YocXVvdGUgKyAnXScsIG5leHRPQikgLy8gbmV4dCBjbG9zZSBicmFja2V0XG4gICAgICAgICAgICB3aGlsZSAobmV4dENCICE9PSAtMSAmJiBwYXRoLmNoYXJBdChuZXh0Q0IgLSAxKSA9PT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICAgIG5leHRDQiA9IHBhdGguaW5kZXhPZihxdW90ZSArICddJywgbmV4dENCICsgMilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXh0Q0IgPT09IC0xKSB7XG4gICAgICAgICAgICAgIG5leHRDQiA9IHBhdGgubGVuZ3RoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJ0cy5wdXNoKHBhdGguc2xpY2UoaW5kZXggKyAyLCBuZXh0Q0IpXG4gICAgICAgICAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoJ1xcXFwnICsgcXVvdGUsICdnJyksIHF1b3RlKSlcbiAgICAgICAgICAgIGluZGV4ID0gbmV4dENCICsgMlxuICAgICAgICAgIH0gZWxzZSB7IC8vIG5vIGVuY2xvc2luZyBxdW90ZXNcbiAgICAgICAgICAgIGxldCBuZXh0Q0IgPSBwYXRoLmluZGV4T2YoJ10nLCBuZXh0T0IpIC8vIG5leHQgY2xvc2UgYnJhY2tldFxuICAgICAgICAgICAgaWYgKG5leHRDQiA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgbmV4dENCID0gcGF0aC5sZW5ndGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcnRzLnB1c2gocGF0aC5zbGljZShpbmRleCArIDEsIG5leHRDQikpXG4gICAgICAgICAgICBpbmRleCA9IG5leHRDQiArIDFcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBhdGguY2hhckF0KGluZGV4KSA9PT0gJy4nKSB7XG4gICAgICAgICAgICBpbmRleCsrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcGFydHNcbiAgICB9XG4gICAgY29uc29sZS5lcnJvcigncGFyc2VPYmplY3RQYXRoIGVycm9yOiBJbnB1dCBvYmplY3QgcGF0aCBtdXN0IGJlIGEgc3RyaW5nLicpXG4gIH1cbn1cbiJdfQ==