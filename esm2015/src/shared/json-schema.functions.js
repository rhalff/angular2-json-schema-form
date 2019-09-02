import * as _ from 'lodash';
import { getType, hasValue, inArray, isArray, isNumber, isObject, isString } from './validator.functions';
import { forEach, hasOwn, mergeFilteredObject } from './utility.functions';
import { mergeSchemas } from './merge-schemas.function';
import { JsonPointer } from './jsonpointer.functions';
/**
 * JSON Schema function library:
 *
 * buildSchemaFromLayout:   TODO: Write this function
 *
 * buildSchemaFromData:
 *
 * getFromSchema:
 *
 * removeRecursiveReferences:
 *
 * getInputType:
 *
 * checkInlineType:
 *
 * isInputRequired:
 *
 * updateInputOptions:
 *
 * getTitleMapFromOneOf:
 *
 * getControlValidators:
 *
 * resolveSchemaReferences:
 *
 * getSubSchema:
 *
 * combineAllOf:
 *
 * fixRequiredArrayProperties:
 */
/**
 * 'buildSchemaFromLayout' function
 *
 * TODO: Build a JSON Schema from a JSON Form layout
 *
 * @param  { any[] } layout - The JSON Form layout
 * @return { any } - The new JSON Schema
 */
export function buildSchemaFromLayout(layout) {
    return;
    // let newSchema: any = { };
    // const walkLayout = (layoutItems: any[], callback: Function): any[] => {
    //   let returnArray: any[] = [];
    //   for (let layoutItem of layoutItems) {
    //     const returnItem: any = callback(layoutItem);
    //     if (returnItem) { returnArray = returnArray.concat(callback(layoutItem)); }
    //     if (layoutItem.items) {
    //       returnArray = returnArray.concat(walkLayout(layoutItem.items, callback));
    //     }
    //   }
    //   return returnArray;
    // };
    // walkLayout(layout, layoutItem => {
    //   let itemKey: string;
    //   if (typeof layoutItem === 'string') {
    //     itemKey = layoutItem;
    //   } else if (layoutItem.key) {
    //     itemKey = layoutItem.key;
    //   }
    //   if (!itemKey) { return; }
    //   //
    // });
}
/**
 * 'buildSchemaFromData' function
 *
 * Build a JSON Schema from a data object
 *
 * @param  { any } data - The data object
 * @param  { boolean = false } requireAllFields - Require all fields?
 * @param  { boolean = true } isRoot - is root
 * @return { any } - The new JSON Schema
 */
export function buildSchemaFromData(data, requireAllFields = false, isRoot = true) {
    const newSchema = {};
    const getFieldType = (value) => {
        const fieldType = getType(value, 'strict');
        return { integer: 'number', null: 'string' }[fieldType] || fieldType;
    };
    const buildSubSchema = (value) => buildSchemaFromData(value, requireAllFields, false);
    if (isRoot) {
        newSchema.$schema = 'http://json-schema.org/draft-06/schema#';
    }
    newSchema.type = getFieldType(data);
    if (newSchema.type === 'object') {
        newSchema.properties = {};
        if (requireAllFields) {
            newSchema.required = [];
        }
        for (const key of Object.keys(data)) {
            newSchema.properties[key] = buildSubSchema(data[key]);
            if (requireAllFields) {
                newSchema.required.push(key);
            }
        }
    }
    else if (newSchema.type === 'array') {
        newSchema.items = data.map(buildSubSchema);
        // If all items are the same type, use an object for items instead of an array
        if ((new Set(data.map(getFieldType))).size === 1) {
            newSchema.items = newSchema.items.reduce((a, b) => (Object.assign({}, a, b)), {});
        }
        if (requireAllFields) {
            newSchema.minItems = 1;
        }
    }
    return newSchema;
}
/**
 * 'getFromSchema' function
 *
 * Uses a JSON Pointer for a value within a data object to retrieve
 * the schema for that value within schema for the data object.
 *
 * The optional third parameter can also be set to return something else:
 * 'schema' (default): the schema for the value indicated by the data pointer
 * 'parentSchema': the schema for the value's parent object or array
 * 'schemaPointer': a pointer to the value's schema within the object's schema
 * 'parentSchemaPointer': a pointer to the schema for the value's parent object or array
 *
 * @param  { any } schema - The schema to get the sub-schema from
 * @param  { Pointer } dataPointer - JSON Pointer (string or array)
 * @param  { string = 'schema' } returnType - what to return?
 * @return { any } - The located sub-schema
 */
export function getFromSchema(schema, dataPointer, returnType = 'schema') {
    const dataPointerArray = JsonPointer.parse(dataPointer);
    if (dataPointerArray === null) {
        console.error(`getFromSchema error: Invalid JSON Pointer: ${dataPointer}`);
        return null;
    }
    let subSchema = schema;
    const schemaPointer = [];
    const length = dataPointerArray.length;
    if (returnType.slice(0, 6) === 'parent') {
        dataPointerArray.length--;
    }
    for (let i = 0; i < length; ++i) {
        const parentSchema = subSchema;
        const key = dataPointerArray[i];
        let subSchemaFound = false;
        if (typeof subSchema !== 'object') {
            console.error(`getFromSchema error: Unable to find "${key}" key in schema.`);
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
            console.error(`getFromSchema error: Unable to find "${key}" item in schema.`);
            console.error(schema);
            console.error(dataPointer);
            return;
        }
    }
    return returnType.slice(-7) === 'Pointer' ? schemaPointer : subSchema;
}
/**
 * 'removeRecursiveReferences' function
 *
 * Checks a JSON Pointer against a map of recursive references and returns
 * a JSON Pointer to the shallowest equivalent location in the same object.
 *
 * Using this functions enables an object to be constructed with unlimited
 * recursion, while maintaing a fixed set of metadata, such as field data types.
 * The object can grow as large as it wants, and deeply recursed nodes can
 * just refer to the metadata for their shallow equivalents, instead of having
 * to add additional redundant metadata for each recursively added node.
 *
 * Example:
 *
 * pointer:         '/stuff/and/more/and/more/and/more/and/more/stuff'
 * recursiveRefMap: [['/stuff/and/more/and/more', '/stuff/and/more/']]
 * returned:        '/stuff/and/more/stuff'
 *
 * @param  { Pointer } pointer -
 * @param  { Map<string, string> } recursiveRefMap -
 * @param  { Map<string, number> = new Map() } arrayMap - optional
 * @return { string } -
 */
export function removeRecursiveReferences(pointer, recursiveRefMap, arrayMap = new Map()) {
    if (!pointer) {
        return '';
    }
    let genericPointer = JsonPointer.toGenericPointer(JsonPointer.compile(pointer), arrayMap);
    if (genericPointer.indexOf('/') === -1) {
        return genericPointer;
    }
    let possibleReferences = true;
    while (possibleReferences) {
        possibleReferences = false;
        recursiveRefMap.forEach((toPointer, fromPointer) => {
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
/**
 * 'getInputType' function
 *
 * @param  { any } schema
 * @param  { any = null } layoutNode
 * @return { string }
 */
export function getInputType(schema, layoutNode = null) {
    // x-schema-form = Angular Schema Form compatibility
    // widget & component = React Jsonschema Form compatibility
    const controlType = JsonPointer.getFirst([
        [schema, '/x-schema-form/type'],
        [schema, '/x-schema-form/widget/component'],
        [schema, '/x-schema-form/widget'],
        [schema, '/widget/component'],
        [schema, '/widget']
    ]);
    if (isString(controlType)) {
        return checkInlineType(controlType, schema, layoutNode);
    }
    let schemaType = schema.type;
    if (schemaType) {
        if (isArray(schemaType)) { // If multiple types listed, use most inclusive type
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
            // TODO: Figure out how to handle additionalProperties
            if (hasOwn(schema, '$ref')) {
                return '$ref';
            }
        }
        if (schemaType === 'array') {
            const itemsObject = JsonPointer.getFirst([
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
                'color': 'color',
                'date': 'date',
                'date-time': 'datetime-local',
                'email': 'email',
                'uri': 'url',
            }[schema.format] || 'text';
        }
    }
    if (hasOwn(schema, '$ref')) {
        return '$ref';
    }
    if (isArray(schema.oneOf) || isArray(schema.anyOf)) {
        return 'one-of';
    }
    console.error(`getInputType error: Unable to determine input type for ${schemaType}`);
    console.error('schema', schema);
    if (layoutNode) {
        console.error('layoutNode', layoutNode);
    }
    return 'none';
}
/**
 * 'checkInlineType' function
 *
 * Checks layout and schema nodes for 'inline: true', and converts
 * 'radios' or 'checkboxes' to 'radios-inline' or 'checkboxes-inline'
 *
 * @param  { string } controlType -
 * @param  { any } schema -
 * @param  { any = null } layoutNode -
 * @return { string }
 */
export function checkInlineType(controlType, schema, layoutNode = null) {
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
/**
 * 'isInputRequired' function
 *
 * Checks a JSON Schema to see if an item is required
 *
 * @param  { any } schema - the schema to check
 * @param  { string } schemaPointer - the pointer to the item to check
 * @return { boolean } - true if the item is required, false if not
 */
export function isInputRequired(schema, schemaPointer) {
    if (!isObject(schema)) {
        console.error('isInputRequired error: Input schema must be an object.');
        return false;
    }
    const listPointerArray = JsonPointer.parse(schemaPointer);
    if (isArray(listPointerArray)) {
        if (!listPointerArray.length) {
            return schema.required === true;
        }
        const keyName = listPointerArray.pop();
        const nextToLastKey = listPointerArray[listPointerArray.length - 1];
        if (['properties', 'additionalProperties', 'patternProperties', 'items', 'additionalItems']
            .includes(nextToLastKey)) {
            listPointerArray.pop();
        }
        const parentSchema = JsonPointer.get(schema, listPointerArray) || {};
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
/**
 * 'updateInputOptions' function
 *
 * @param  { any } layoutNode
 * @param  { any } schema
 * @param  { any } jsf
 * @return { void }
 */
export function updateInputOptions(layoutNode, schema, jsf) {
    if (!isObject(layoutNode) || !isObject(layoutNode.options)) {
        return;
    }
    // Set all option values in layoutNode.options
    const newOptions = {};
    const fixUiKeys = key => key.slice(0, 3).toLowerCase() === 'ui:' ? key.slice(3) : key;
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
    ].forEach(([object, excludeKeys]) => mergeFilteredObject(newOptions, object, excludeKeys, fixUiKeys));
    if (!hasOwn(newOptions, 'titleMap')) {
        let newTitleMap = null;
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
    // If schema type is integer, enforce by setting multipleOf = 1
    if (schema.type === 'integer' && !hasValue(newOptions.multipleOf)) {
        newOptions.multipleOf = 1;
    }
    // Copy any typeahead word lists to options.typeahead.source
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
/**
 * 'getTitleMapFromOneOf' function
 *
 * @param  { schema } schema
 * @param  { boolean = null } flatList
 * @param  { boolean = false } validateOnly
 * @return { validators }
 */
export function getTitleMapFromOneOf(schema = {}, flatList = null, validateOnly = false) {
    let titleMap = null;
    const oneOf = schema.oneOf || schema.anyOf || null;
    if (isArray(oneOf) && oneOf.every(item => item.title)) {
        if (oneOf.every(item => isArray(item.enum) && item.enum.length === 1)) {
            if (validateOnly) {
                return true;
            }
            titleMap = oneOf.map(item => ({ name: item.title, value: item.enum[0] }));
        }
        else if (oneOf.every(item => item.const)) {
            if (validateOnly) {
                return true;
            }
            titleMap = oneOf.map(item => ({ name: item.title, value: item.const }));
        }
        // if flatList !== false and some items have colons, make grouped map
        if (flatList !== false && (titleMap || [])
            .filter(title => ((title || {}).name || '').indexOf(': ')).length > 1) {
            // Split name on first colon to create grouped map (name -> group: name)
            const newTitleMap = titleMap.map(title => {
                const [group, name] = title.name.split(/: (.+)/);
                return group && name ? Object.assign({}, title, { group, name }) : title;
            });
            // If flatList === true or at least one group has multiple items, use grouped map
            if (flatList === true || newTitleMap.some((title, index) => index &&
                hasOwn(title, 'group') && title.group === newTitleMap[index - 1].group)) {
                titleMap = newTitleMap;
            }
        }
    }
    return validateOnly ? false : titleMap;
}
/**
 * 'getControlValidators' function
 *
 * @param { any } schema
 * @return { validators }
 */
export function getControlValidators(schema) {
    if (!isObject(schema)) {
        return null;
    }
    const validators = {};
    if (hasOwn(schema, 'type')) {
        switch (schema.type) {
            case 'string':
                forEach(['pattern', 'format', 'minLength', 'maxLength'], (prop) => {
                    if (hasOwn(schema, prop)) {
                        validators[prop] = [schema[prop]];
                    }
                });
                break;
            case 'number':
            case 'integer':
                forEach(['Minimum', 'Maximum'], (ucLimit) => {
                    const eLimit = 'exclusive' + ucLimit;
                    const limit = ucLimit.toLowerCase();
                    if (hasOwn(schema, limit)) {
                        const exclusive = hasOwn(schema, eLimit) && schema[eLimit] === true;
                        validators[limit] = [schema[limit], exclusive];
                    }
                });
                forEach(['multipleOf', 'type'], (prop) => {
                    if (hasOwn(schema, prop)) {
                        validators[prop] = [schema[prop]];
                    }
                });
                break;
            case 'object':
                forEach(['minProperties', 'maxProperties', 'dependencies'], (prop) => {
                    if (hasOwn(schema, prop)) {
                        validators[prop] = [schema[prop]];
                    }
                });
                break;
            case 'array':
                forEach(['minItems', 'maxItems', 'uniqueItems'], (prop) => {
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
/**
 * 'resolveSchemaReferences' function
 *
 * Find all $ref links in schema and save links and referenced schemas in
 * schemaRefLibrary, schemaRecursiveRefMap, and dataRecursiveRefMap
 *
 * @param { any } schema
 * @param { any } schemaRefLibrary
 * @param { Map<string, string> } schemaRecursiveRefMap
 * @param { Map<string, string> } dataRecursiveRefMap
 * @param { Map<string, number> } arrayMap
 * @return { any }
 */
export function resolveSchemaReferences(schema, schemaRefLibrary, schemaRecursiveRefMap, dataRecursiveRefMap, arrayMap) {
    if (!isObject(schema)) {
        console.error('resolveSchemaReferences error: schema must be an object.');
        return;
    }
    const refLinks = new Set();
    const refMapSet = new Set();
    const refMap = new Map();
    const recursiveRefMap = new Map();
    const refLibrary = {};
    // Search schema for all $ref links, and build full refLibrary
    JsonPointer.forEachDeep(schema, (subSchema, subSchemaPointer) => {
        if (hasOwn(subSchema, '$ref') && isString(subSchema['$ref'])) {
            const refPointer = JsonPointer.compile(subSchema['$ref']);
            refLinks.add(refPointer);
            refMapSet.add(subSchemaPointer + '~~' + refPointer);
            refMap.set(subSchemaPointer, refPointer);
        }
    });
    refLinks.forEach(ref => refLibrary[ref] = getSubSchema(schema, ref));
    // Follow all ref links and save in refMapSet,
    // to find any multi-link recursive refernces
    let checkRefLinks = true;
    while (checkRefLinks) {
        checkRefLinks = false;
        Array.from(refMap).forEach(([fromRef1, toRef1]) => Array.from(refMap)
            .filter(([fromRef2, toRef2]) => JsonPointer.isSubPointer(toRef1, fromRef2, true) &&
            !JsonPointer.isSubPointer(toRef2, toRef1, true) &&
            !refMapSet.has(fromRef1 + fromRef2.slice(toRef1.length) + '~~' + toRef2))
            .forEach(([fromRef2, toRef2]) => {
            refMapSet.add(fromRef1 + fromRef2.slice(toRef1.length) + '~~' + toRef2);
            checkRefLinks = true;
        }));
    }
    // Build full recursiveRefMap
    // First pass - save all internally recursive refs from refMapSet
    Array.from(refMapSet)
        .map(refLink => refLink.split('~~'))
        .filter(([fromRef, toRef]) => JsonPointer.isSubPointer(toRef, fromRef))
        .forEach(([fromRef, toRef]) => recursiveRefMap.set(fromRef, toRef));
    // Second pass - create recursive versions of any other refs that link to recursive refs
    Array.from(refMap)
        .filter(([fromRef1, toRef1]) => Array.from(recursiveRefMap.keys())
        .every(fromRef2 => !JsonPointer.isSubPointer(fromRef1, fromRef2, true)))
        .forEach(([fromRef1, toRef1]) => Array.from(recursiveRefMap)
        .filter(([fromRef2, toRef2]) => !recursiveRefMap.has(fromRef1 + fromRef2.slice(toRef1.length)) &&
        JsonPointer.isSubPointer(toRef1, fromRef2, true) &&
        !JsonPointer.isSubPointer(toRef1, fromRef1, true))
        .forEach(([fromRef2, toRef2]) => recursiveRefMap.set(fromRef1 + fromRef2.slice(toRef1.length), fromRef1 + toRef2.slice(toRef1.length))));
    // Create compiled schema by replacing all non-recursive $ref links with
    // thieir linked schemas and, where possible, combining schemas in allOf arrays.
    let compiledSchema = Object.assign({}, schema);
    delete compiledSchema.definitions;
    compiledSchema =
        getSubSchema(compiledSchema, '', refLibrary, recursiveRefMap);
    // Make sure all remaining schema $refs are recursive, and build final
    // schemaRefLibrary, schemaRecursiveRefMap, dataRecursiveRefMap, & arrayMap
    JsonPointer.forEachDeep(compiledSchema, (subSchema, subSchemaPointer) => {
        if (isString(subSchema['$ref'])) {
            let refPointer = JsonPointer.compile(subSchema['$ref']);
            if (!JsonPointer.isSubPointer(refPointer, subSchemaPointer, true)) {
                refPointer = removeRecursiveReferences(subSchemaPointer, recursiveRefMap);
                JsonPointer.set(compiledSchema, subSchemaPointer, { $ref: `#${refPointer}` });
            }
            if (!hasOwn(schemaRefLibrary, 'refPointer')) {
                schemaRefLibrary[refPointer] = !refPointer.length ? compiledSchema :
                    getSubSchema(compiledSchema, refPointer, schemaRefLibrary, recursiveRefMap);
            }
            if (!schemaRecursiveRefMap.has(subSchemaPointer)) {
                schemaRecursiveRefMap.set(subSchemaPointer, refPointer);
            }
            const fromDataRef = JsonPointer.toDataPointer(subSchemaPointer, compiledSchema);
            if (!dataRecursiveRefMap.has(fromDataRef)) {
                const toDataRef = JsonPointer.toDataPointer(refPointer, compiledSchema);
                dataRecursiveRefMap.set(fromDataRef, toDataRef);
            }
        }
        if (subSchema.type === 'array' &&
            (hasOwn(subSchema, 'items') || hasOwn(subSchema, 'additionalItems'))) {
            const dataPointer = JsonPointer.toDataPointer(subSchemaPointer, compiledSchema);
            if (!arrayMap.has(dataPointer)) {
                const tupleItems = isArray(subSchema.items) ? subSchema.items.length : 0;
                arrayMap.set(dataPointer, tupleItems);
            }
        }
    }, true);
    return compiledSchema;
}
/**
 * 'getSubSchema' function
 *
 * @param  { any } schema
 * @param  { Pointer } pointer
 * @param  { object } schemaRefLibrary
 * @param  { Map<string, string> } schemaRecursiveRefMap
 * @param  { string[] = [] } usedPointers
 * @return { any }
 */
export function getSubSchema(schema, pointer, schemaRefLibrary = null, schemaRecursiveRefMap = null, usedPointers = []) {
    if (!schemaRefLibrary || !schemaRecursiveRefMap) {
        return JsonPointer.getCopy(schema, pointer);
    }
    if (typeof pointer !== 'string') {
        pointer = JsonPointer.compile(pointer);
    }
    usedPointers = [...usedPointers, pointer];
    let newSchema = null;
    if (pointer === '') {
        newSchema = _.cloneDeep(schema);
    }
    else {
        const shortPointer = removeRecursiveReferences(pointer, schemaRecursiveRefMap);
        if (shortPointer !== pointer) {
            usedPointers = [...usedPointers, shortPointer];
        }
        newSchema = JsonPointer.getFirstCopy([
            [schemaRefLibrary, [shortPointer]],
            [schema, pointer],
            [schema, shortPointer]
        ]);
    }
    return JsonPointer.forEachDeepCopy(newSchema, (subSchema, subPointer) => {
        if (isObject(subSchema)) {
            // Replace non-recursive $ref links with referenced schemas
            if (isString(subSchema.$ref)) {
                const refPointer = JsonPointer.compile(subSchema.$ref);
                if (refPointer.length && usedPointers.every(ptr => !JsonPointer.isSubPointer(refPointer, ptr, true))) {
                    const refSchema = getSubSchema(schema, refPointer, schemaRefLibrary, schemaRecursiveRefMap, usedPointers);
                    if (Object.keys(subSchema).length === 1) {
                        return refSchema;
                    }
                    else {
                        const extraKeys = Object.assign({}, subSchema);
                        delete extraKeys.$ref;
                        return mergeSchemas(refSchema, extraKeys);
                    }
                }
            }
            // TODO: Convert schemas with 'type' arrays to 'oneOf'
            // Combine allOf subSchemas
            if (isArray(subSchema.allOf)) {
                return combineAllOf(subSchema);
            }
            // Fix incorrectly placed array object required lists
            if (subSchema.type === 'array' && isArray(subSchema.required)) {
                return fixRequiredArrayProperties(subSchema);
            }
        }
        return subSchema;
    }, true, pointer);
}
/**
 * 'combineAllOf' function
 *
 * Attempt to convert an allOf schema object into
 * a non-allOf schema object with equivalent rules.
 *
 * @param  { any } schema - allOf schema object
 * @return { any } - converted schema object
 */
export function combineAllOf(schema) {
    if (!isObject(schema) || !isArray(schema.allOf)) {
        return schema;
    }
    let mergedSchema = mergeSchemas(...schema.allOf);
    if (Object.keys(schema).length > 1) {
        const extraKeys = Object.assign({}, schema);
        delete extraKeys.allOf;
        mergedSchema = mergeSchemas(mergedSchema, extraKeys);
    }
    return mergedSchema;
}
/**
 * 'fixRequiredArrayProperties' function
 *
 * Fixes an incorrectly placed required list inside an array schema, by moving
 * it into items.properties or additionalItems.properties, where it belongs.
 *
 * @param  { any } schema - allOf schema object
 * @return { any } - converted schema object
 */
export function fixRequiredArrayProperties(schema) {
    if (schema.type === 'array' && isArray(schema.required)) {
        const itemsObject = hasOwn(schema.items, 'properties') ? 'items' :
            hasOwn(schema.additionalItems, 'properties') ? 'additionalItems' : null;
        if (itemsObject && !hasOwn(schema[itemsObject], 'required') && (hasOwn(schema[itemsObject], 'additionalProperties') ||
            schema.required.every(key => hasOwn(schema[itemsObject].properties, key)))) {
            schema = _.cloneDeep(schema);
            schema[itemsObject].required = schema.required;
            delete schema.required;
        }
    }
    return schema;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zY2hlbWEuZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcjItanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbInNyYy9zaGFyZWQvanNvbi1zY2hlbWEuZnVuY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE9BQU8sRUFDTCxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxRQUFRLEVBQzVFLFFBQVEsRUFDVCxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFDTCxPQUFPLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUNyQyxNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFXLE1BQU0seUJBQXlCLENBQUM7QUFHL0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQUVIOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLFVBQVUscUJBQXFCLENBQUMsTUFBTTtJQUMxQyxPQUFPO0lBQ1AsNEJBQTRCO0lBQzVCLDBFQUEwRTtJQUMxRSxpQ0FBaUM7SUFDakMsMENBQTBDO0lBQzFDLG9EQUFvRDtJQUNwRCxrRkFBa0Y7SUFDbEYsOEJBQThCO0lBQzlCLGtGQUFrRjtJQUNsRixRQUFRO0lBQ1IsTUFBTTtJQUNOLHdCQUF3QjtJQUN4QixLQUFLO0lBQ0wscUNBQXFDO0lBQ3JDLHlCQUF5QjtJQUN6QiwwQ0FBMEM7SUFDMUMsNEJBQTRCO0lBQzVCLGlDQUFpQztJQUNqQyxnQ0FBZ0M7SUFDaEMsTUFBTTtJQUNOLDhCQUE4QjtJQUM5QixPQUFPO0lBQ1AsTUFBTTtBQUNSLENBQUM7QUFFRDs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLFVBQVUsbUJBQW1CLENBQ2pDLElBQUksRUFBRSxnQkFBZ0Is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ZUFBZSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzFFLElBQUksV0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUM3RCxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLHNCQUFzQixDQUFDO1lBQ25ELE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FDMUUsRUFBRTtZQUNELE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUMvQyxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUM7U0FDeEI7S0FDRjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7XG4gIGdldFR5cGUsIGhhc1ZhbHVlLCBpbkFycmF5LCBpc0FycmF5LCBpc0VtcHR5LCBpc0Z1bmN0aW9uLCBpc051bWJlciwgaXNPYmplY3QsXG4gIGlzU3RyaW5nXG59IGZyb20gJy4vdmFsaWRhdG9yLmZ1bmN0aW9ucyc7XG5pbXBvcnQge1xuICBmb3JFYWNoLCBoYXNPd24sIG1lcmdlRmlsdGVyZWRPYmplY3QsIHVuaXF1ZUl0ZW1zLCBjb21tb25JdGVtc1xufSBmcm9tICcuL3V0aWxpdHkuZnVuY3Rpb25zJztcbmltcG9ydCB7IG1lcmdlU2NoZW1hcyB9IGZyb20gJy4vbWVyZ2Utc2NoZW1hcy5mdW5jdGlvbic7XG5pbXBvcnQgeyBKc29uUG9pbnRlciwgUG9pbnRlciB9IGZyb20gJy4vanNvbnBvaW50ZXIuZnVuY3Rpb25zJztcbmltcG9ydCB7IEpzb25WYWxpZGF0b3JzIH0gZnJvbSAnLi9qc29uLnZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIEpTT04gU2NoZW1hIGZ1bmN0aW9uIGxpYnJhcnk6XG4gKlxuICogYnVpbGRTY2hlbWFGcm9tTGF5b3V0OiAgIFRPRE86IFdyaXRlIHRoaXMgZnVuY3Rpb25cbiAqXG4gKiBidWlsZFNjaGVtYUZyb21EYXRhOlxuICpcbiAqIGdldEZyb21TY2hlbWE6XG4gKlxuICogcmVtb3ZlUmVjdXJzaXZlUmVmZXJlbmNlczpcbiAqXG4gKiBnZXRJbnB1dFR5cGU6XG4gKlxuICogY2hlY2tJbmxpbmVUeXBlOlxuICpcbiAqIGlzSW5wdXRSZXF1aXJlZDpcbiAqXG4gKiB1cGRhdGVJbnB1dE9wdGlvbnM6XG4gKlxuICogZ2V0VGl0bGVNYXBGcm9tT25lT2Y6XG4gKlxuICogZ2V0Q29udHJvbFZhbGlkYXRvcnM6XG4gKlxuICogcmVzb2x2ZVNjaGVtYVJlZmVyZW5jZXM6XG4gKlxuICogZ2V0U3ViU2NoZW1hOlxuICpcbiAqIGNvbWJpbmVBbGxPZjpcbiAqXG4gKiBmaXhSZXF1aXJlZEFycmF5UHJvcGVydGllczpcbiAqL1xuXG4vKipcbiAqICdidWlsZFNjaGVtYUZyb21MYXlvdXQnIGZ1bmN0aW9uXG4gKlxuICogVE9ETzogQnVpbGQgYSBKU09OIFNjaGVtYSBmcm9tIGEgSlNPTiBGb3JtIGxheW91dFxuICpcbiAqIEBwYXJhbSAgeyBhbnlbXSB9IGxheW91dCAtIFRoZSBKU09OIEZvcm0gbGF5b3V0XG4gKiBAcmV0dXJuIHsgYW55IH0gLSBUaGUgbmV3IEpTT04gU2NoZW1hXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFNjaGVtYUZyb21MYXlvdXQobGF5b3V0KSB7XG4gIHJldHVybjtcbiAgLy8gbGV0IG5ld1NjaGVtYTogYW55ID0geyB9O1xuICAvLyBjb25zdCB3YWxrTGF5b3V0ID0gKGxheW91dEl0ZW1zOiBhbnlbXSwgY2FsbGJhY2s6IEZ1bmN0aW9uKTogYW55W10gPT4ge1xuICAvLyAgIGxldCByZXR1cm5BcnJheTogYW55W10gPSBbXTtcbiAgLy8gICBmb3IgKGxldCBsYXlvdXRJdGVtIG9mIGxheW91dEl0ZW1zKSB7XG4gIC8vICAgICBjb25zdCByZXR1cm5JdGVtOiBhbnkgPSBjYWxsYmFjayhsYXlvdXRJdGVtKTtcbiAgLy8gICAgIGlmIChyZXR1cm5JdGVtKSB7IHJldHVybkFycmF5ID0gcmV0dXJuQXJyYXkuY29uY2F0KGNhbGxiYWNrKGxheW91dEl0ZW0pKTsgfVxuICAvLyAgICAgaWYgKGxheW91dEl0ZW0uaXRlbXMpIHtcbiAgLy8gICAgICAgcmV0dXJuQXJyYXkgPSByZXR1cm5BcnJheS5jb25jYXQod2Fsa0xheW91dChsYXlvdXRJdGVtLml0ZW1zLCBjYWxsYmFjaykpO1xuICAvLyAgICAgfVxuICAvLyAgIH1cbiAgLy8gICByZXR1cm4gcmV0dXJuQXJyYXk7XG4gIC8vIH07XG4gIC8vIHdhbGtMYXlvdXQobGF5b3V0LCBsYXlvdXRJdGVtID0+IHtcbiAgLy8gICBsZXQgaXRlbUtleTogc3RyaW5nO1xuICAvLyAgIGlmICh0eXBlb2YgbGF5b3V0SXRlbSA9PT0gJ3N0cmluZycpIHtcbiAgLy8gICAgIGl0ZW1LZXkgPSBsYXlvdXRJdGVtO1xuICAvLyAgIH0gZWxzZSBpZiAobGF5b3V0SXRlbS5rZXkpIHtcbiAgLy8gICAgIGl0ZW1LZXkgPSBsYXlvdXRJdGVtLmtleTtcbiAgLy8gICB9XG4gIC8vICAgaWYgKCFpdGVtS2V5KSB7IHJldHVybjsgfVxuICAvLyAgIC8vXG4gIC8vIH0pO1xufVxuXG4vKipcbiAqICdidWlsZFNjaGVtYUZyb21EYXRhJyBmdW5jdGlvblxuICpcbiAqIEJ1aWxkIGEgSlNPTiBTY2hlbWEgZnJvbSBhIGRhdGEgb2JqZWN0XG4gKlxuICogQHBhcmFtICB7IGFueSB9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3RcbiAqIEBwYXJhbSAgeyBib29sZWFuID0gZmFsc2UgfSByZXF1aXJlQWxsRmllbGRzIC0gUmVxdWlyZSBhbGwgZmllbGRzP1xuICogQHBhcmFtICB7IGJvb2xlYW4gPSB0cnVlIH0gaXNSb290IC0gaXMgcm9vdFxuICogQHJldHVybiB7IGFueSB9IC0gVGhlIG5ldyBKU09OIFNjaGVtYVxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRTY2hlbWFGcm9tRGF0YShcbiAgZGF0YSwgcmVxdWlyZUFsbEZpZWxkcyA9IGZhbHNlLCBpc1Jvb3QgPSB0cnVlXG4pIHtcbiAgY29uc3QgbmV3U2NoZW1hOiBhbnkgPSB7fTtcbiAgY29uc3QgZ2V0RmllbGRUeXBlID0gKHZhbHVlOiBhbnkpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IGZpZWxkVHlwZSA9IGdldFR5cGUodmFsdWUsICdzdHJpY3QnKTtcbiAgICByZXR1cm4geyBpbnRlZ2VyOiAnbnVtYmVyJywgbnVsbDogJ3N0cmluZycgfVtmaWVsZFR5cGVdIHx8IGZpZWxkVHlwZTtcbiAgfTtcbiAgY29uc3QgYnVpbGRTdWJTY2hlbWEgPSAodmFsdWUpID0+XG4gICAgYnVpbGRTY2hlbWFGcm9tRGF0YSh2YWx1ZSwgcmVxdWlyZUFsbEZpZWxkcywgZmFsc2UpO1xuICBpZiAoaXNSb290KSB7IG5ld1NjaGVtYS4kc2NoZW1hID0gJ2h0dHA6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQtMDYvc2NoZW1hIyc7IH1cbiAgbmV3U2NoZW1hLnR5cGUgPSBnZXRGaWVsZFR5cGUoZGF0YSk7XG4gIGlmIChuZXdTY2hlbWEudHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBuZXdTY2hlbWEucHJvcGVydGllcyA9IHt9O1xuICAgIGlmIChyZXF1aXJlQWxsRmllbGRzKSB7IG5ld1NjaGVtYS5yZXF1aXJlZCA9IFtdOyB9XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZGF0YSkpIHtcbiAgICAgIG5ld1NjaGVtYS5wcm9wZXJ0aWVzW2tleV0gPSBidWlsZFN1YlNjaGVtYShkYXRhW2tleV0pO1xuICAgICAgaWYgKHJlcXVpcmVBbGxGaWVsZHMpIHsgbmV3U2NoZW1hLnJlcXVpcmVkLnB1c2goa2V5KTsgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChuZXdTY2hlbWEudHlwZSA9PT0gJ2FycmF5Jykge1xuICAgIG5ld1NjaGVtYS5pdGVtcyA9IGRhdGEubWFwKGJ1aWxkU3ViU2NoZW1hKTtcbiAgICAvLyBJZiBhbGwgaXRlbXMgYXJlIHRoZSBzYW1lIHR5cGUsIHVzZSBhbiBvYmplY3QgZm9yIGl0ZW1zIGluc3RlYWQgb2YgYW4gYXJyYXlcbiAgICBpZiAoKG5ldyBTZXQoZGF0YS5tYXAoZ2V0RmllbGRUeXBlKSkpLnNpemUgPT09IDEpIHtcbiAgICAgIG5ld1NjaGVtYS5pdGVtcyA9IG5ld1NjaGVtYS5pdGVtcy5yZWR1Y2UoKGEsIGIpID0+ICh7IC4uLmEsIC4uLmIgfSksIHt9KTtcbiAgICB9XG4gICAgaWYgKHJlcXVpcmVBbGxGaWVsZHMpIHsgbmV3U2NoZW1hLm1pbkl0ZW1zID0gMTsgfVxuICB9XG4gIHJldHVybiBuZXdTY2hlbWE7XG59XG5cbi8qKlxuICogJ2dldEZyb21TY2hlbWEnIGZ1bmN0aW9uXG4gKlxuICogVXNlcyBhIEpTT04gUG9pbnRlciBmb3IgYSB2YWx1ZSB3aXRoaW4gYSBkYXRhIG9iamVjdCB0byByZXRyaWV2ZVxuICogdGhlIHNjaGVtYSBmb3IgdGhhdCB2YWx1ZSB3aXRoaW4gc2NoZW1hIGZvciB0aGUgZGF0YSBvYmplY3QuXG4gKlxuICogVGhlIG9wdGlvbmFsIHRoaXJkIHBhcmFtZXRlciBjYW4gYWxzbyBiZSBzZXQgdG8gcmV0dXJuIHNvbWV0aGluZyBlbHNlOlxuICogJ3NjaGVtYScgKGRlZmF1bHQpOiB0aGUgc2NoZW1hIGZvciB0aGUgdmFsdWUgaW5kaWNhdGVkIGJ5IHRoZSBkYXRhIHBvaW50ZXJcbiAqICdwYXJlbnRTY2hlbWEnOiB0aGUgc2NoZW1hIGZvciB0aGUgdmFsdWUncyBwYXJlbnQgb2JqZWN0IG9yIGFycmF5XG4gKiAnc2NoZW1hUG9pbnRlcic6IGEgcG9pbnRlciB0byB0aGUgdmFsdWUncyBzY2hlbWEgd2l0aGluIHRoZSBvYmplY3QncyBzY2hlbWFcbiAqICdwYXJlbnRTY2hlbWFQb2ludGVyJzogYSBwb2ludGVyIHRvIHRoZSBzY2hlbWEgZm9yIHRoZSB2YWx1ZSdzIHBhcmVudCBvYmplY3Qgb3IgYXJyYXlcbiAqXG4gKiBAcGFyYW0gIHsgYW55IH0gc2NoZW1hIC0gVGhlIHNjaGVtYSB0byBnZXQgdGhlIHN1Yi1zY2hlbWEgZnJvbVxuICogQHBhcmFtICB7IFBvaW50ZXIgfSBkYXRhUG9pbnRlciAtIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICogQHBhcmFtICB7IHN0cmluZyA9ICdzY2hlbWEnIH0gcmV0dXJuVHlwZSAtIHdoYXQgdG8gcmV0dXJuP1xuICogQHJldHVybiB7IGFueSB9IC0gVGhlIGxvY2F0ZWQgc3ViLXNjaGVtYVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RnJvbVNjaGVtYShzY2hlbWEsIGRhdGFQb2ludGVyLCByZXR1cm5UeXBlID0gJ3NjaGVtYScpIHtcbiAgY29uc3QgZGF0YVBvaW50ZXJBcnJheTogYW55W10gPSBKc29uUG9pbnRlci5wYXJzZShkYXRhUG9pbnRlcik7XG4gIGlmIChkYXRhUG9pbnRlckFycmF5ID09PSBudWxsKSB7XG4gICAgY29uc29sZS5lcnJvcihgZ2V0RnJvbVNjaGVtYSBlcnJvcjogSW52YWxpZCBKU09OIFBvaW50ZXI6ICR7ZGF0YVBvaW50ZXJ9YCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgbGV0IHN1YlNjaGVtYSA9IHNjaGVtYTtcbiAgY29uc3Qgc2NoZW1hUG9pbnRlciA9IFtdO1xuICBjb25zdCBsZW5ndGggPSBkYXRhUG9pbnRlckFycmF5Lmxlbmd0aDtcbiAgaWYgKHJldHVyblR5cGUuc2xpY2UoMCwgNikgPT09ICdwYXJlbnQnKSB7IGRhdGFQb2ludGVyQXJyYXkubGVuZ3RoLS07IH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IHBhcmVudFNjaGVtYSA9IHN1YlNjaGVtYTtcbiAgICBjb25zdCBrZXkgPSBkYXRhUG9pbnRlckFycmF5W2ldO1xuICAgIGxldCBzdWJTY2hlbWFGb3VuZCA9IGZhbHNlO1xuICAgIGlmICh0eXBlb2Ygc3ViU2NoZW1hICE9PSAnb2JqZWN0Jykge1xuICAgICAgY29uc29sZS5lcnJvcihgZ2V0RnJvbVNjaGVtYSBlcnJvcjogVW5hYmxlIHRvIGZpbmQgXCIke2tleX1cIiBrZXkgaW4gc2NoZW1hLmApO1xuICAgICAgY29uc29sZS5lcnJvcihzY2hlbWEpO1xuICAgICAgY29uc29sZS5lcnJvcihkYXRhUG9pbnRlcik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHN1YlNjaGVtYS50eXBlID09PSAnYXJyYXknICYmICghaXNOYU4oa2V5KSB8fCBrZXkgPT09ICctJykpIHtcbiAgICAgIGlmIChoYXNPd24oc3ViU2NoZW1hLCAnaXRlbXMnKSkge1xuICAgICAgICBpZiAoaXNPYmplY3Qoc3ViU2NoZW1hLml0ZW1zKSkge1xuICAgICAgICAgIHN1YlNjaGVtYUZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICBzdWJTY2hlbWEgPSBzdWJTY2hlbWEuaXRlbXM7XG4gICAgICAgICAgc2NoZW1hUG9pbnRlci5wdXNoKCdpdGVtcycpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoc3ViU2NoZW1hLml0ZW1zKSkge1xuICAgICAgICAgIGlmICghaXNOYU4oa2V5KSAmJiBzdWJTY2hlbWEuaXRlbXMubGVuZ3RoID49ICtrZXkpIHtcbiAgICAgICAgICAgIHN1YlNjaGVtYUZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIHN1YlNjaGVtYSA9IHN1YlNjaGVtYS5pdGVtc1sra2V5XTtcbiAgICAgICAgICAgIHNjaGVtYVBvaW50ZXIucHVzaCgnaXRlbXMnLCBrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFzdWJTY2hlbWFGb3VuZCAmJiBpc09iamVjdChzdWJTY2hlbWEuYWRkaXRpb25hbEl0ZW1zKSkge1xuICAgICAgICBzdWJTY2hlbWFGb3VuZCA9IHRydWU7XG4gICAgICAgIHN1YlNjaGVtYSA9IHN1YlNjaGVtYS5hZGRpdGlvbmFsSXRlbXM7XG4gICAgICAgIHNjaGVtYVBvaW50ZXIucHVzaCgnYWRkaXRpb25hbEl0ZW1zJyk7XG4gICAgICB9IGVsc2UgaWYgKHN1YlNjaGVtYS5hZGRpdGlvbmFsSXRlbXMgIT09IGZhbHNlKSB7XG4gICAgICAgIHN1YlNjaGVtYUZvdW5kID0gdHJ1ZTtcbiAgICAgICAgc3ViU2NoZW1hID0geyB9O1xuICAgICAgICBzY2hlbWFQb2ludGVyLnB1c2goJ2FkZGl0aW9uYWxJdGVtcycpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3ViU2NoZW1hLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoaXNPYmplY3Qoc3ViU2NoZW1hLnByb3BlcnRpZXMpICYmIGhhc093bihzdWJTY2hlbWEucHJvcGVydGllcywga2V5KSkge1xuICAgICAgICBzdWJTY2hlbWFGb3VuZCA9IHRydWU7XG4gICAgICAgIHN1YlNjaGVtYSA9IHN1YlNjaGVtYS5wcm9wZXJ0aWVzW2tleV07XG4gICAgICAgIHNjaGVtYVBvaW50ZXIucHVzaCgncHJvcGVydGllcycsIGtleSk7XG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHN1YlNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcykpIHtcbiAgICAgICAgc3ViU2NoZW1hRm91bmQgPSB0cnVlO1xuICAgICAgICBzdWJTY2hlbWEgPSBzdWJTY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXM7XG4gICAgICAgIHNjaGVtYVBvaW50ZXIucHVzaCgnYWRkaXRpb25hbFByb3BlcnRpZXMnKTtcbiAgICAgIH0gZWxzZSBpZiAoc3ViU2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzICE9PSBmYWxzZSkge1xuICAgICAgICBzdWJTY2hlbWFGb3VuZCA9IHRydWU7XG4gICAgICAgIHN1YlNjaGVtYSA9IHsgfTtcbiAgICAgICAgc2NoZW1hUG9pbnRlci5wdXNoKCdhZGRpdGlvbmFsUHJvcGVydGllcycpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXN1YlNjaGVtYUZvdW5kKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBnZXRGcm9tU2NoZW1hIGVycm9yOiBVbmFibGUgdG8gZmluZCBcIiR7a2V5fVwiIGl0ZW0gaW4gc2NoZW1hLmApO1xuICAgICAgY29uc29sZS5lcnJvcihzY2hlbWEpO1xuICAgICAgY29uc29sZS5lcnJvcihkYXRhUG9pbnRlcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIHJldHVybiByZXR1cm5UeXBlLnNsaWNlKC03KSA9PT0gJ1BvaW50ZXInID8gc2NoZW1hUG9pbnRlciA6IHN1YlNjaGVtYTtcbn1cblxuLyoqXG4gKiAncmVtb3ZlUmVjdXJzaXZlUmVmZXJlbmNlcycgZnVuY3Rpb25cbiAqXG4gKiBDaGVja3MgYSBKU09OIFBvaW50ZXIgYWdhaW5zdCBhIG1hcCBvZiByZWN1cnNpdmUgcmVmZXJlbmNlcyBhbmQgcmV0dXJuc1xuICogYSBKU09OIFBvaW50ZXIgdG8gdGhlIHNoYWxsb3dlc3QgZXF1aXZhbGVudCBsb2NhdGlvbiBpbiB0aGUgc2FtZSBvYmplY3QuXG4gKlxuICogVXNpbmcgdGhpcyBmdW5jdGlvbnMgZW5hYmxlcyBhbiBvYmplY3QgdG8gYmUgY29uc3RydWN0ZWQgd2l0aCB1bmxpbWl0ZWRcbiAqIHJlY3Vyc2lvbiwgd2hpbGUgbWFpbnRhaW5nIGEgZml4ZWQgc2V0IG9mIG1ldGFkYXRhLCBzdWNoIGFzIGZpZWxkIGRhdGEgdHlwZXMuXG4gKiBUaGUgb2JqZWN0IGNhbiBncm93IGFzIGxhcmdlIGFzIGl0IHdhbnRzLCBhbmQgZGVlcGx5IHJlY3Vyc2VkIG5vZGVzIGNhblxuICoganVzdCByZWZlciB0byB0aGUgbWV0YWRhdGEgZm9yIHRoZWlyIHNoYWxsb3cgZXF1aXZhbGVudHMsIGluc3RlYWQgb2YgaGF2aW5nXG4gKiB0byBhZGQgYWRkaXRpb25hbCByZWR1bmRhbnQgbWV0YWRhdGEgZm9yIGVhY2ggcmVjdXJzaXZlbHkgYWRkZWQgbm9kZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIHBvaW50ZXI6ICAgICAgICAgJy9zdHVmZi9hbmQvbW9yZS9hbmQvbW9yZS9hbmQvbW9yZS9hbmQvbW9yZS9zdHVmZidcbiAqIHJlY3Vyc2l2ZVJlZk1hcDogW1snL3N0dWZmL2FuZC9tb3JlL2FuZC9tb3JlJywgJy9zdHVmZi9hbmQvbW9yZS8nXV1cbiAqIHJldHVybmVkOiAgICAgICAgJy9zdHVmZi9hbmQvbW9yZS9zdHVmZidcbiAqXG4gKiBAcGFyYW0gIHsgUG9pbnRlciB9IHBvaW50ZXIgLVxuICogQHBhcmFtICB7IE1hcDxzdHJpbmcsIHN0cmluZz4gfSByZWN1cnNpdmVSZWZNYXAgLVxuICogQHBhcmFtICB7IE1hcDxzdHJpbmcsIG51bWJlcj4gPSBuZXcgTWFwKCkgfSBhcnJheU1hcCAtIG9wdGlvbmFsXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gLVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlUmVjdXJzaXZlUmVmZXJlbmNlcyhcbiAgcG9pbnRlciwgcmVjdXJzaXZlUmVmTWFwLCBhcnJheU1hcCA9IG5ldyBNYXAoKVxuKSB7XG4gIGlmICghcG9pbnRlcikgeyByZXR1cm4gJyc7IH1cbiAgbGV0IGdlbmVyaWNQb2ludGVyID1cbiAgICBKc29uUG9pbnRlci50b0dlbmVyaWNQb2ludGVyKEpzb25Qb2ludGVyLmNvbXBpbGUocG9pbnRlciksIGFycmF5TWFwKTtcbiAgaWYgKGdlbmVyaWNQb2ludGVyLmluZGV4T2YoJy8nKSA9PT0gLTEpIHsgcmV0dXJuIGdlbmVyaWNQb2ludGVyOyB9XG4gIGxldCBwb3NzaWJsZVJlZmVyZW5jZXMgPSB0cnVlO1xuICB3aGlsZSAocG9zc2libGVSZWZlcmVuY2VzKSB7XG4gICAgcG9zc2libGVSZWZlcmVuY2VzID0gZmFsc2U7XG4gICAgcmVjdXJzaXZlUmVmTWFwLmZvckVhY2goKHRvUG9pbnRlciwgZnJvbVBvaW50ZXIpID0+IHtcbiAgICAgIGlmIChKc29uUG9pbnRlci5pc1N1YlBvaW50ZXIodG9Qb2ludGVyLCBmcm9tUG9pbnRlcikpIHtcbiAgICAgICAgd2hpbGUgKEpzb25Qb2ludGVyLmlzU3ViUG9pbnRlcihmcm9tUG9pbnRlciwgZ2VuZXJpY1BvaW50ZXIsIHRydWUpKSB7XG4gICAgICAgICAgZ2VuZXJpY1BvaW50ZXIgPSBKc29uUG9pbnRlci50b0dlbmVyaWNQb2ludGVyKFxuICAgICAgICAgICAgdG9Qb2ludGVyICsgZ2VuZXJpY1BvaW50ZXIuc2xpY2UoZnJvbVBvaW50ZXIubGVuZ3RoKSwgYXJyYXlNYXBcbiAgICAgICAgICApO1xuICAgICAgICAgIHBvc3NpYmxlUmVmZXJlbmNlcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gZ2VuZXJpY1BvaW50ZXI7XG59XG5cbi8qKlxuICogJ2dldElucHV0VHlwZScgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0gIHsgYW55IH0gc2NoZW1hXG4gKiBAcGFyYW0gIHsgYW55ID0gbnVsbCB9IGxheW91dE5vZGVcbiAqIEByZXR1cm4geyBzdHJpbmcgfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW5wdXRUeXBlKHNjaGVtYSwgbGF5b3V0Tm9kZTogYW55ID0gbnVsbCkge1xuICAvLyB4LXNjaGVtYS1mb3JtID0gQW5ndWxhciBTY2hlbWEgRm9ybSBjb21wYXRpYmlsaXR5XG4gIC8vIHdpZGdldCAmIGNvbXBvbmVudCA9IFJlYWN0IEpzb25zY2hlbWEgRm9ybSBjb21wYXRpYmlsaXR5XG4gIGNvbnN0IGNvbnRyb2xUeXBlID0gSnNvblBvaW50ZXIuZ2V0Rmlyc3QoW1xuICAgIFtzY2hlbWEsICcveC1zY2hlbWEtZm9ybS90eXBlJ10sXG4gICAgW3NjaGVtYSwgJy94LXNjaGVtYS1mb3JtL3dpZGdldC9jb21wb25lbnQnXSxcbiAgICBbc2NoZW1hLCAnL3gtc2NoZW1hLWZvcm0vd2lkZ2V0J10sXG4gICAgW3NjaGVtYSwgJy93aWRnZXQvY29tcG9uZW50J10sXG4gICAgW3NjaGVtYSwgJy93aWRnZXQnXVxuICBdKTtcbiAgaWYgKGlzU3RyaW5nKGNvbnRyb2xUeXBlKSkgeyByZXR1cm4gY2hlY2tJbmxpbmVUeXBlKGNvbnRyb2xUeXBlLCBzY2hlbWEsIGxheW91dE5vZGUpOyB9XG4gIGxldCBzY2hlbWFUeXBlID0gc2NoZW1hLnR5cGU7XG4gIGlmIChzY2hlbWFUeXBlKSB7XG4gICAgaWYgKGlzQXJyYXkoc2NoZW1hVHlwZSkpIHsgLy8gSWYgbXVsdGlwbGUgdHlwZXMgbGlzdGVkLCB1c2UgbW9zdCBpbmNsdXNpdmUgdHlwZVxuICAgICAgc2NoZW1hVHlwZSA9XG4gICAgICAgIGluQXJyYXkoJ29iamVjdCcsIHNjaGVtYVR5cGUpICYmIGhhc093bihzY2hlbWEsICdwcm9wZXJ0aWVzJykgPyAnb2JqZWN0JyA6XG4gICAgICAgIGluQXJyYXkoJ2FycmF5Jywgc2NoZW1hVHlwZSkgJiYgaGFzT3duKHNjaGVtYSwgJ2l0ZW1zJykgPyAnYXJyYXknIDpcbiAgICAgICAgaW5BcnJheSgnYXJyYXknLCBzY2hlbWFUeXBlKSAmJiBoYXNPd24oc2NoZW1hLCAnYWRkaXRpb25hbEl0ZW1zJykgPyAnYXJyYXknIDpcbiAgICAgICAgaW5BcnJheSgnc3RyaW5nJywgc2NoZW1hVHlwZSkgPyAnc3RyaW5nJyA6XG4gICAgICAgIGluQXJyYXkoJ251bWJlcicsIHNjaGVtYVR5cGUpID8gJ251bWJlcicgOlxuICAgICAgICBpbkFycmF5KCdpbnRlZ2VyJywgc2NoZW1hVHlwZSkgPyAnaW50ZWdlcicgOlxuICAgICAgICBpbkFycmF5KCdib29sZWFuJywgc2NoZW1hVHlwZSkgPyAnYm9vbGVhbicgOiAndW5rbm93bic7XG4gICAgfVxuICAgIGlmIChzY2hlbWFUeXBlID09PSAnYm9vbGVhbicpIHsgcmV0dXJuICdjaGVja2JveCc7IH1cbiAgICBpZiAoc2NoZW1hVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChoYXNPd24oc2NoZW1hLCAncHJvcGVydGllcycpIHx8IGhhc093bihzY2hlbWEsICdhZGRpdGlvbmFsUHJvcGVydGllcycpKSB7XG4gICAgICAgIHJldHVybiAnc2VjdGlvbic7XG4gICAgICB9XG4gICAgICAvLyBUT0RPOiBGaWd1cmUgb3V0IGhvdyB0byBoYW5kbGUgYWRkaXRpb25hbFByb3BlcnRpZXNcbiAgICAgIGlmIChoYXNPd24oc2NoZW1hLCAnJHJlZicpKSB7IHJldHVybiAnJHJlZic7IH1cbiAgICB9XG4gICAgaWYgKHNjaGVtYVR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgIGNvbnN0IGl0ZW1zT2JqZWN0ID0gSnNvblBvaW50ZXIuZ2V0Rmlyc3QoW1xuICAgICAgICBbc2NoZW1hLCAnL2l0ZW1zJ10sXG4gICAgICAgIFtzY2hlbWEsICcvYWRkaXRpb25hbEl0ZW1zJ11cbiAgICAgIF0pIHx8IHt9O1xuICAgICAgcmV0dXJuIGhhc093bihpdGVtc09iamVjdCwgJ2VudW0nKSAmJiBzY2hlbWEubWF4SXRlbXMgIT09IDEgP1xuICAgICAgICBjaGVja0lubGluZVR5cGUoJ2NoZWNrYm94ZXMnLCBzY2hlbWEsIGxheW91dE5vZGUpIDogJ2FycmF5JztcbiAgICB9XG4gICAgaWYgKHNjaGVtYVR5cGUgPT09ICdudWxsJykgeyByZXR1cm4gJ25vbmUnOyB9XG4gICAgaWYgKEpzb25Qb2ludGVyLmhhcyhsYXlvdXROb2RlLCAnL29wdGlvbnMvdGl0bGVNYXAnKSB8fFxuICAgICAgaGFzT3duKHNjaGVtYSwgJ2VudW0nKSB8fCBnZXRUaXRsZU1hcEZyb21PbmVPZihzY2hlbWEsIG51bGwsIHRydWUpXG4gICAgKSB7IHJldHVybiAnc2VsZWN0JzsgfVxuICAgIGlmIChzY2hlbWFUeXBlID09PSAnbnVtYmVyJyB8fCBzY2hlbWFUeXBlID09PSAnaW50ZWdlcicpIHtcbiAgICAgIHJldHVybiAoc2NoZW1hVHlwZSA9PT0gJ2ludGVnZXInIHx8IGhhc093bihzY2hlbWEsICdtdWx0aXBsZU9mJykpICYmXG4gICAgICAgIGhhc093bihzY2hlbWEsICdtYXhpbXVtJykgJiYgaGFzT3duKHNjaGVtYSwgJ21pbmltdW0nKSA/ICdyYW5nZScgOiBzY2hlbWFUeXBlO1xuICAgIH1cbiAgICBpZiAoc2NoZW1hVHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICdjb2xvcic6ICdjb2xvcicsXG4gICAgICAgICdkYXRlJzogJ2RhdGUnLFxuICAgICAgICAnZGF0ZS10aW1lJzogJ2RhdGV0aW1lLWxvY2FsJyxcbiAgICAgICAgJ2VtYWlsJzogJ2VtYWlsJyxcbiAgICAgICAgJ3VyaSc6ICd1cmwnLFxuICAgICAgfVtzY2hlbWEuZm9ybWF0XSB8fCAndGV4dCc7XG4gICAgfVxuICB9XG4gIGlmIChoYXNPd24oc2NoZW1hLCAnJHJlZicpKSB7IHJldHVybiAnJHJlZic7IH1cbiAgaWYgKGlzQXJyYXkoc2NoZW1hLm9uZU9mKSB8fCBpc0FycmF5KHNjaGVtYS5hbnlPZikpIHsgcmV0dXJuICdvbmUtb2YnOyB9XG4gIGNvbnNvbGUuZXJyb3IoYGdldElucHV0VHlwZSBlcnJvcjogVW5hYmxlIHRvIGRldGVybWluZSBpbnB1dCB0eXBlIGZvciAke3NjaGVtYVR5cGV9YCk7XG4gIGNvbnNvbGUuZXJyb3IoJ3NjaGVtYScsIHNjaGVtYSk7XG4gIGlmIChsYXlvdXROb2RlKSB7IGNvbnNvbGUuZXJyb3IoJ2xheW91dE5vZGUnLCBsYXlvdXROb2RlKTsgfVxuICByZXR1cm4gJ25vbmUnO1xufVxuXG4vKipcbiAqICdjaGVja0lubGluZVR5cGUnIGZ1bmN0aW9uXG4gKlxuICogQ2hlY2tzIGxheW91dCBhbmQgc2NoZW1hIG5vZGVzIGZvciAnaW5saW5lOiB0cnVlJywgYW5kIGNvbnZlcnRzXG4gKiAncmFkaW9zJyBvciAnY2hlY2tib3hlcycgdG8gJ3JhZGlvcy1pbmxpbmUnIG9yICdjaGVja2JveGVzLWlubGluZSdcbiAqXG4gKiBAcGFyYW0gIHsgc3RyaW5nIH0gY29udHJvbFR5cGUgLVxuICogQHBhcmFtICB7IGFueSB9IHNjaGVtYSAtXG4gKiBAcGFyYW0gIHsgYW55ID0gbnVsbCB9IGxheW91dE5vZGUgLVxuICogQHJldHVybiB7IHN0cmluZyB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0lubGluZVR5cGUoY29udHJvbFR5cGUsIHNjaGVtYSwgbGF5b3V0Tm9kZTogYW55ID0gbnVsbCkge1xuICBpZiAoIWlzU3RyaW5nKGNvbnRyb2xUeXBlKSB8fCAoXG4gICAgY29udHJvbFR5cGUuc2xpY2UoMCwgOCkgIT09ICdjaGVja2JveCcgJiYgY29udHJvbFR5cGUuc2xpY2UoMCwgNSkgIT09ICdyYWRpbydcbiAgKSkge1xuICAgIHJldHVybiBjb250cm9sVHlwZTtcbiAgfVxuICBpZiAoXG4gICAgSnNvblBvaW50ZXIuZ2V0Rmlyc3QoW1xuICAgICAgW2xheW91dE5vZGUsICcvaW5saW5lJ10sXG4gICAgICBbbGF5b3V0Tm9kZSwgJy9vcHRpb25zL2lubGluZSddLFxuICAgICAgW3NjaGVtYSwgJy9pbmxpbmUnXSxcbiAgICAgIFtzY2hlbWEsICcveC1zY2hlbWEtZm9ybS9pbmxpbmUnXSxcbiAgICAgIFtzY2hlbWEsICcveC1zY2hlbWEtZm9ybS9vcHRpb25zL2lubGluZSddLFxuICAgICAgW3NjaGVtYSwgJy94LXNjaGVtYS1mb3JtL3dpZGdldC9pbmxpbmUnXSxcbiAgICAgIFtzY2hlbWEsICcveC1zY2hlbWEtZm9ybS93aWRnZXQvY29tcG9uZW50L2lubGluZSddLFxuICAgICAgW3NjaGVtYSwgJy94LXNjaGVtYS1mb3JtL3dpZGdldC9jb21wb25lbnQvb3B0aW9ucy9pbmxpbmUnXSxcbiAgICAgIFtzY2hlbWEsICcvd2lkZ2V0L2lubGluZSddLFxuICAgICAgW3NjaGVtYSwgJy93aWRnZXQvY29tcG9uZW50L2lubGluZSddLFxuICAgICAgW3NjaGVtYSwgJy93aWRnZXQvY29tcG9uZW50L29wdGlvbnMvaW5saW5lJ10sXG4gICAgXSkgPT09IHRydWVcbiAgKSB7XG4gICAgcmV0dXJuIGNvbnRyb2xUeXBlLnNsaWNlKDAsIDUpID09PSAncmFkaW8nID9cbiAgICAgICdyYWRpb3MtaW5saW5lJyA6ICdjaGVja2JveGVzLWlubGluZSc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvbnRyb2xUeXBlO1xuICB9XG59XG5cbi8qKlxuICogJ2lzSW5wdXRSZXF1aXJlZCcgZnVuY3Rpb25cbiAqXG4gKiBDaGVja3MgYSBKU09OIFNjaGVtYSB0byBzZWUgaWYgYW4gaXRlbSBpcyByZXF1aXJlZFxuICpcbiAqIEBwYXJhbSAgeyBhbnkgfSBzY2hlbWEgLSB0aGUgc2NoZW1hIHRvIGNoZWNrXG4gKiBAcGFyYW0gIHsgc3RyaW5nIH0gc2NoZW1hUG9pbnRlciAtIHRoZSBwb2ludGVyIHRvIHRoZSBpdGVtIHRvIGNoZWNrXG4gKiBAcmV0dXJuIHsgYm9vbGVhbiB9IC0gdHJ1ZSBpZiB0aGUgaXRlbSBpcyByZXF1aXJlZCwgZmFsc2UgaWYgbm90XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0lucHV0UmVxdWlyZWQoc2NoZW1hLCBzY2hlbWFQb2ludGVyKSB7XG4gIGlmICghaXNPYmplY3Qoc2NoZW1hKSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ2lzSW5wdXRSZXF1aXJlZCBlcnJvcjogSW5wdXQgc2NoZW1hIG11c3QgYmUgYW4gb2JqZWN0LicpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBsaXN0UG9pbnRlckFycmF5ID0gSnNvblBvaW50ZXIucGFyc2Uoc2NoZW1hUG9pbnRlcik7XG4gIGlmIChpc0FycmF5KGxpc3RQb2ludGVyQXJyYXkpKSB7XG4gICAgaWYgKCFsaXN0UG9pbnRlckFycmF5Lmxlbmd0aCkgeyByZXR1cm4gc2NoZW1hLnJlcXVpcmVkID09PSB0cnVlOyB9XG4gICAgY29uc3Qga2V5TmFtZSA9IGxpc3RQb2ludGVyQXJyYXkucG9wKCk7XG4gICAgY29uc3QgbmV4dFRvTGFzdEtleSA9IGxpc3RQb2ludGVyQXJyYXlbbGlzdFBvaW50ZXJBcnJheS5sZW5ndGggLSAxXTtcbiAgICBpZiAoWydwcm9wZXJ0aWVzJywgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJywgJ3BhdHRlcm5Qcm9wZXJ0aWVzJywgJ2l0ZW1zJywgJ2FkZGl0aW9uYWxJdGVtcyddXG4gICAgICAuaW5jbHVkZXMobmV4dFRvTGFzdEtleSlcbiAgICApIHtcbiAgICAgIGxpc3RQb2ludGVyQXJyYXkucG9wKCk7XG4gICAgfVxuICAgIGNvbnN0IHBhcmVudFNjaGVtYSA9IEpzb25Qb2ludGVyLmdldChzY2hlbWEsIGxpc3RQb2ludGVyQXJyYXkpIHx8IHt9O1xuICAgIGlmIChpc0FycmF5KHBhcmVudFNjaGVtYS5yZXF1aXJlZCkpIHtcbiAgICAgIHJldHVybiBwYXJlbnRTY2hlbWEucmVxdWlyZWQuaW5jbHVkZXMoa2V5TmFtZSk7XG4gICAgfVxuICAgIGlmIChwYXJlbnRTY2hlbWEudHlwZSA9PT0gJ2FycmF5Jykge1xuICAgICAgcmV0dXJuIGhhc093bihwYXJlbnRTY2hlbWEsICdtaW5JdGVtcycpICYmXG4gICAgICAgIGlzTnVtYmVyKGtleU5hbWUpICYmXG4gICAgICAgICtwYXJlbnRTY2hlbWEubWluSXRlbXMgPiAra2V5TmFtZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqICd1cGRhdGVJbnB1dE9wdGlvbnMnIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtICB7IGFueSB9IGxheW91dE5vZGVcbiAqIEBwYXJhbSAgeyBhbnkgfSBzY2hlbWFcbiAqIEBwYXJhbSAgeyBhbnkgfSBqc2ZcbiAqIEByZXR1cm4geyB2b2lkIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUlucHV0T3B0aW9ucyhsYXlvdXROb2RlLCBzY2hlbWEsIGpzZikge1xuICBpZiAoIWlzT2JqZWN0KGxheW91dE5vZGUpIHx8ICFpc09iamVjdChsYXlvdXROb2RlLm9wdGlvbnMpKSB7IHJldHVybjsgfVxuXG4gIC8vIFNldCBhbGwgb3B0aW9uIHZhbHVlcyBpbiBsYXlvdXROb2RlLm9wdGlvbnNcbiAgY29uc3QgbmV3T3B0aW9uczogYW55ID0geyB9O1xuICBjb25zdCBmaXhVaUtleXMgPSBrZXkgPT4ga2V5LnNsaWNlKDAsIDMpLnRvTG93ZXJDYXNlKCkgPT09ICd1aTonID8ga2V5LnNsaWNlKDMpIDoga2V5O1xuICBtZXJnZUZpbHRlcmVkT2JqZWN0KG5ld09wdGlvbnMsIGpzZi5mb3JtT3B0aW9ucy5kZWZhdXRXaWRnZXRPcHRpb25zLCBbXSwgZml4VWlLZXlzKTtcbiAgWyBbIEpzb25Qb2ludGVyLmdldChzY2hlbWEsICcvdWk6d2lkZ2V0L29wdGlvbnMnKSwgW10gXSxcbiAgICBbIEpzb25Qb2ludGVyLmdldChzY2hlbWEsICcvdWk6d2lkZ2V0JyksIFtdIF0sXG4gICAgWyBzY2hlbWEsIFtcbiAgICAgICdhZGRpdGlvbmFsUHJvcGVydGllcycsICdhZGRpdGlvbmFsSXRlbXMnLCAncHJvcGVydGllcycsICdpdGVtcycsXG4gICAgICAncmVxdWlyZWQnLCAndHlwZScsICd4LXNjaGVtYS1mb3JtJywgJyRyZWYnXG4gICAgXSBdLFxuICAgIFsgSnNvblBvaW50ZXIuZ2V0KHNjaGVtYSwgJy94LXNjaGVtYS1mb3JtL29wdGlvbnMnKSwgW10gXSxcbiAgICBbIEpzb25Qb2ludGVyLmdldChzY2hlbWEsICcveC1zY2hlbWEtZm9ybScpLCBbJ2l0ZW1zJywgJ29wdGlvbnMnXSBdLFxuICAgIFsgbGF5b3V0Tm9kZSwgW1xuICAgICAgJ19pZCcsICckcmVmJywgJ2FycmF5SXRlbScsICdhcnJheUl0ZW1UeXBlJywgJ2RhdGFQb2ludGVyJywgJ2RhdGFUeXBlJyxcbiAgICAgICdpdGVtcycsICdrZXknLCAnbmFtZScsICdvcHRpb25zJywgJ3JlY3Vyc2l2ZVJlZmVyZW5jZScsICd0eXBlJywgJ3dpZGdldCdcbiAgICBdIF0sXG4gICAgWyBsYXlvdXROb2RlLm9wdGlvbnMsIFtdIF0sXG4gIF0uZm9yRWFjaCgoWyBvYmplY3QsIGV4Y2x1ZGVLZXlzIF0pID0+XG4gICAgbWVyZ2VGaWx0ZXJlZE9iamVjdChuZXdPcHRpb25zLCBvYmplY3QsIGV4Y2x1ZGVLZXlzLCBmaXhVaUtleXMpXG4gICk7XG4gIGlmICghaGFzT3duKG5ld09wdGlvbnMsICd0aXRsZU1hcCcpKSB7XG4gICAgbGV0IG5ld1RpdGxlTWFwOiBhbnkgPSBudWxsO1xuICAgIG5ld1RpdGxlTWFwID0gZ2V0VGl0bGVNYXBGcm9tT25lT2Yoc2NoZW1hLCBuZXdPcHRpb25zLmZsYXRMaXN0KTtcbiAgICBpZiAobmV3VGl0bGVNYXApIHsgbmV3T3B0aW9ucy50aXRsZU1hcCA9IG5ld1RpdGxlTWFwOyB9XG4gICAgaWYgKCFoYXNPd24obmV3T3B0aW9ucywgJ3RpdGxlTWFwJykgJiYgIWhhc093bihuZXdPcHRpb25zLCAnZW51bScpICYmIGhhc093bihzY2hlbWEsICdpdGVtcycpKSB7XG4gICAgICBpZiAoSnNvblBvaW50ZXIuaGFzKHNjaGVtYSwgJy9pdGVtcy90aXRsZU1hcCcpKSB7XG4gICAgICAgIG5ld09wdGlvbnMudGl0bGVNYXAgPSBzY2hlbWEuaXRlbXMudGl0bGVNYXA7XG4gICAgICB9IGVsc2UgaWYgKEpzb25Qb2ludGVyLmhhcyhzY2hlbWEsICcvaXRlbXMvZW51bScpKSB7XG4gICAgICAgIG5ld09wdGlvbnMuZW51bSA9IHNjaGVtYS5pdGVtcy5lbnVtO1xuICAgICAgICBpZiAoIWhhc093bihuZXdPcHRpb25zLCAnZW51bU5hbWVzJykgJiYgSnNvblBvaW50ZXIuaGFzKHNjaGVtYSwgJy9pdGVtcy9lbnVtTmFtZXMnKSkge1xuICAgICAgICAgIG5ld09wdGlvbnMuZW51bU5hbWVzID0gc2NoZW1hLml0ZW1zLmVudW1OYW1lcztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChKc29uUG9pbnRlci5oYXMoc2NoZW1hLCAnL2l0ZW1zL29uZU9mJykpIHtcbiAgICAgICAgbmV3VGl0bGVNYXAgPSBnZXRUaXRsZU1hcEZyb21PbmVPZihzY2hlbWEuaXRlbXMsIG5ld09wdGlvbnMuZmxhdExpc3QpO1xuICAgICAgICBpZiAobmV3VGl0bGVNYXApIHsgbmV3T3B0aW9ucy50aXRsZU1hcCA9IG5ld1RpdGxlTWFwOyB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gSWYgc2NoZW1hIHR5cGUgaXMgaW50ZWdlciwgZW5mb3JjZSBieSBzZXR0aW5nIG11bHRpcGxlT2YgPSAxXG4gIGlmIChzY2hlbWEudHlwZSA9PT0gJ2ludGVnZXInICYmICFoYXNWYWx1ZShuZXdPcHRpb25zLm11bHRpcGxlT2YpKSB7XG4gICAgbmV3T3B0aW9ucy5tdWx0aXBsZU9mID0gMTtcbiAgfVxuXG4gIC8vIENvcHkgYW55IHR5cGVhaGVhZCB3b3JkIGxpc3RzIHRvIG9wdGlvbnMudHlwZWFoZWFkLnNvdXJjZVxuICBpZiAoSnNvblBvaW50ZXIuaGFzKG5ld09wdGlvbnMsICcvYXV0b2NvbXBsZXRlL3NvdXJjZScpKSB7XG4gICAgbmV3T3B0aW9ucy50eXBlYWhlYWQgPSBuZXdPcHRpb25zLmF1dG9jb21wbGV0ZTtcbiAgfSBlbHNlIGlmIChKc29uUG9pbnRlci5oYXMobmV3T3B0aW9ucywgJy90YWdzaW5wdXQvc291cmNlJykpIHtcbiAgICBuZXdPcHRpb25zLnR5cGVhaGVhZCA9IG5ld09wdGlvbnMudGFnc2lucHV0O1xuICB9IGVsc2UgaWYgKEpzb25Qb2ludGVyLmhhcyhuZXdPcHRpb25zLCAnL3RhZ3NpbnB1dC90eXBlYWhlYWQvc291cmNlJykpIHtcbiAgICBuZXdPcHRpb25zLnR5cGVhaGVhZCA9IG5ld09wdGlvbnMudGFnc2lucHV0LnR5cGVhaGVhZDtcbiAgfVxuXG4gIGxheW91dE5vZGUub3B0aW9ucyA9IG5ld09wdGlvbnM7XG59XG5cbi8qKlxuICogJ2dldFRpdGxlTWFwRnJvbU9uZU9mJyBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSAgeyBzY2hlbWEgfSBzY2hlbWFcbiAqIEBwYXJhbSAgeyBib29sZWFuID0gbnVsbCB9IGZsYXRMaXN0XG4gKiBAcGFyYW0gIHsgYm9vbGVhbiA9IGZhbHNlIH0gdmFsaWRhdGVPbmx5XG4gKiBAcmV0dXJuIHsgdmFsaWRhdG9ycyB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUaXRsZU1hcEZyb21PbmVPZihcbiAgc2NoZW1hOiBhbnkgPSB7fSwgZmxhdExpc3Q6IGJvb2xlYW4gPSBudWxsLCB2YWxpZGF0ZU9ubHkgPSBmYWxzZVxuKSB7XG4gIGxldCB0aXRsZU1hcCA9IG51bGw7XG4gIGNvbnN0IG9uZU9mID0gc2NoZW1hLm9uZU9mIHx8IHNjaGVtYS5hbnlPZiB8fCBudWxsO1xuICBpZiAoaXNBcnJheShvbmVPZikgJiYgb25lT2YuZXZlcnkoaXRlbSA9PiBpdGVtLnRpdGxlKSkge1xuICAgIGlmIChvbmVPZi5ldmVyeShpdGVtID0+IGlzQXJyYXkoaXRlbS5lbnVtKSAmJiBpdGVtLmVudW0ubGVuZ3RoID09PSAxKSkge1xuICAgICAgaWYgKHZhbGlkYXRlT25seSkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgdGl0bGVNYXAgPSBvbmVPZi5tYXAoaXRlbSA9PiAoeyBuYW1lOiBpdGVtLnRpdGxlLCB2YWx1ZTogaXRlbS5lbnVtWzBdIH0pKTtcbiAgICB9IGVsc2UgaWYgKG9uZU9mLmV2ZXJ5KGl0ZW0gPT4gaXRlbS5jb25zdCkpIHtcbiAgICAgIGlmICh2YWxpZGF0ZU9ubHkpIHsgcmV0dXJuIHRydWU7IH1cbiAgICAgIHRpdGxlTWFwID0gb25lT2YubWFwKGl0ZW0gPT4gKHsgbmFtZTogaXRlbS50aXRsZSwgdmFsdWU6IGl0ZW0uY29uc3QgfSkpO1xuICAgIH1cblxuICAgIC8vIGlmIGZsYXRMaXN0ICE9PSBmYWxzZSBhbmQgc29tZSBpdGVtcyBoYXZlIGNvbG9ucywgbWFrZSBncm91cGVkIG1hcFxuICAgIGlmIChmbGF0TGlzdCAhPT0gZmFsc2UgJiYgKHRpdGxlTWFwIHx8IFtdKVxuICAgICAgLmZpbHRlcih0aXRsZSA9PiAoKHRpdGxlIHx8IHt9KS5uYW1lIHx8ICcnKS5pbmRleE9mKCc6ICcpKS5sZW5ndGggPiAxXG4gICAgKSB7XG5cbiAgICAgIC8vIFNwbGl0IG5hbWUgb24gZmlyc3QgY29sb24gdG8gY3JlYXRlIGdyb3VwZWQgbWFwIChuYW1lIC0+IGdyb3VwOiBuYW1lKVxuICAgICAgY29uc3QgbmV3VGl0bGVNYXAgPSB0aXRsZU1hcC5tYXAodGl0bGUgPT4ge1xuICAgICAgICBjb25zdCBbZ3JvdXAsIG5hbWVdID0gdGl0bGUubmFtZS5zcGxpdCgvOiAoLispLyk7XG4gICAgICAgIHJldHVybiBncm91cCAmJiBuYW1lID8geyAuLi50aXRsZSwgZ3JvdXAsIG5hbWUgfSA6IHRpdGxlO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIElmIGZsYXRMaXN0ID09PSB0cnVlIG9yIGF0IGxlYXN0IG9uZSBncm91cCBoYXMgbXVsdGlwbGUgaXRlbXMsIHVzZSBncm91cGVkIG1hcFxuICAgICAgaWYgKGZsYXRMaXN0ID09PSB0cnVlIHx8IG5ld1RpdGxlTWFwLnNvbWUoKHRpdGxlLCBpbmRleCkgPT4gaW5kZXggJiZcbiAgICAgICAgaGFzT3duKHRpdGxlLCAnZ3JvdXAnKSAmJiB0aXRsZS5ncm91cCA9PT0gbmV3VGl0bGVNYXBbaW5kZXggLSAxXS5ncm91cFxuICAgICAgKSkge1xuICAgICAgICB0aXRsZU1hcCA9IG5ld1RpdGxlTWFwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdmFsaWRhdGVPbmx5ID8gZmFsc2UgOiB0aXRsZU1hcDtcbn1cblxuLyoqXG4gKiAnZ2V0Q29udHJvbFZhbGlkYXRvcnMnIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHsgYW55IH0gc2NoZW1hXG4gKiBAcmV0dXJuIHsgdmFsaWRhdG9ycyB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250cm9sVmFsaWRhdG9ycyhzY2hlbWEpIHtcbiAgaWYgKCFpc09iamVjdChzY2hlbWEpKSB7IHJldHVybiBudWxsOyB9XG4gIGNvbnN0IHZhbGlkYXRvcnM6IGFueSA9IHsgfTtcbiAgaWYgKGhhc093bihzY2hlbWEsICd0eXBlJykpIHtcbiAgICBzd2l0Y2ggKHNjaGVtYS50eXBlKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICBmb3JFYWNoKFsncGF0dGVybicsICdmb3JtYXQnLCAnbWluTGVuZ3RoJywgJ21heExlbmd0aCddLCAocHJvcCkgPT4ge1xuICAgICAgICAgIGlmIChoYXNPd24oc2NoZW1hLCBwcm9wKSkgeyB2YWxpZGF0b3JzW3Byb3BdID0gW3NjaGVtYVtwcm9wXV07IH1cbiAgICAgICAgfSk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ251bWJlcic6IGNhc2UgJ2ludGVnZXInOlxuICAgICAgICBmb3JFYWNoKFsnTWluaW11bScsICdNYXhpbXVtJ10sICh1Y0xpbWl0KSA9PiB7XG4gICAgICAgICAgY29uc3QgZUxpbWl0ID0gJ2V4Y2x1c2l2ZScgKyB1Y0xpbWl0O1xuICAgICAgICAgIGNvbnN0IGxpbWl0ID0gdWNMaW1pdC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIGlmIChoYXNPd24oc2NoZW1hLCBsaW1pdCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4Y2x1c2l2ZSA9IGhhc093bihzY2hlbWEsIGVMaW1pdCkgJiYgc2NoZW1hW2VMaW1pdF0gPT09IHRydWU7XG4gICAgICAgICAgICB2YWxpZGF0b3JzW2xpbWl0XSA9IFtzY2hlbWFbbGltaXRdLCBleGNsdXNpdmVdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGZvckVhY2goWydtdWx0aXBsZU9mJywgJ3R5cGUnXSwgKHByb3ApID0+IHtcbiAgICAgICAgICBpZiAoaGFzT3duKHNjaGVtYSwgcHJvcCkpIHsgdmFsaWRhdG9yc1twcm9wXSA9IFtzY2hlbWFbcHJvcF1dOyB9XG4gICAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBmb3JFYWNoKFsnbWluUHJvcGVydGllcycsICdtYXhQcm9wZXJ0aWVzJywgJ2RlcGVuZGVuY2llcyddLCAocHJvcCkgPT4ge1xuICAgICAgICAgIGlmIChoYXNPd24oc2NoZW1hLCBwcm9wKSkgeyB2YWxpZGF0b3JzW3Byb3BdID0gW3NjaGVtYVtwcm9wXV07IH1cbiAgICAgICAgfSk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgICAgZm9yRWFjaChbJ21pbkl0ZW1zJywgJ21heEl0ZW1zJywgJ3VuaXF1ZUl0ZW1zJ10sIChwcm9wKSA9PiB7XG4gICAgICAgICAgaWYgKGhhc093bihzY2hlbWEsIHByb3ApKSB7IHZhbGlkYXRvcnNbcHJvcF0gPSBbc2NoZW1hW3Byb3BdXTsgfVxuICAgICAgICB9KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBpZiAoaGFzT3duKHNjaGVtYSwgJ2VudW0nKSkgeyB2YWxpZGF0b3JzLmVudW0gPSBbc2NoZW1hLmVudW1dOyB9XG4gIHJldHVybiB2YWxpZGF0b3JzO1xufVxuXG4vKipcbiAqICdyZXNvbHZlU2NoZW1hUmVmZXJlbmNlcycgZnVuY3Rpb25cbiAqXG4gKiBGaW5kIGFsbCAkcmVmIGxpbmtzIGluIHNjaGVtYSBhbmQgc2F2ZSBsaW5rcyBhbmQgcmVmZXJlbmNlZCBzY2hlbWFzIGluXG4gKiBzY2hlbWFSZWZMaWJyYXJ5LCBzY2hlbWFSZWN1cnNpdmVSZWZNYXAsIGFuZCBkYXRhUmVjdXJzaXZlUmVmTWFwXG4gKlxuICogQHBhcmFtIHsgYW55IH0gc2NoZW1hXG4gKiBAcGFyYW0geyBhbnkgfSBzY2hlbWFSZWZMaWJyYXJ5XG4gKiBAcGFyYW0geyBNYXA8c3RyaW5nLCBzdHJpbmc+IH0gc2NoZW1hUmVjdXJzaXZlUmVmTWFwXG4gKiBAcGFyYW0geyBNYXA8c3RyaW5nLCBzdHJpbmc+IH0gZGF0YVJlY3Vyc2l2ZVJlZk1hcFxuICogQHBhcmFtIHsgTWFwPHN0cmluZywgbnVtYmVyPiB9IGFycmF5TWFwXG4gKiBAcmV0dXJuIHsgYW55IH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVTY2hlbWFSZWZlcmVuY2VzKFxuICBzY2hlbWEsIHNjaGVtYVJlZkxpYnJhcnksIHNjaGVtYVJlY3Vyc2l2ZVJlZk1hcCwgZGF0YVJlY3Vyc2l2ZVJlZk1hcCwgYXJyYXlNYXBcbikge1xuICBpZiAoIWlzT2JqZWN0KHNjaGVtYSkpIHtcbiAgICBjb25zb2xlLmVycm9yKCdyZXNvbHZlU2NoZW1hUmVmZXJlbmNlcyBlcnJvcjogc2NoZW1hIG11c3QgYmUgYW4gb2JqZWN0LicpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCByZWZMaW5rcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBjb25zdCByZWZNYXBTZXQgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgY29uc3QgcmVmTWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgY29uc3QgcmVjdXJzaXZlUmVmTWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgY29uc3QgcmVmTGlicmFyeTogYW55ID0ge307XG5cbiAgLy8gU2VhcmNoIHNjaGVtYSBmb3IgYWxsICRyZWYgbGlua3MsIGFuZCBidWlsZCBmdWxsIHJlZkxpYnJhcnlcbiAgSnNvblBvaW50ZXIuZm9yRWFjaERlZXAoc2NoZW1hLCAoc3ViU2NoZW1hLCBzdWJTY2hlbWFQb2ludGVyKSA9PiB7XG4gICAgaWYgKGhhc093bihzdWJTY2hlbWEsICckcmVmJykgJiYgaXNTdHJpbmcoc3ViU2NoZW1hWyckcmVmJ10pKSB7XG4gICAgICBjb25zdCByZWZQb2ludGVyID0gSnNvblBvaW50ZXIuY29tcGlsZShzdWJTY2hlbWFbJyRyZWYnXSk7XG4gICAgICByZWZMaW5rcy5hZGQocmVmUG9pbnRlcik7XG4gICAgICByZWZNYXBTZXQuYWRkKHN1YlNjaGVtYVBvaW50ZXIgKyAnfn4nICsgcmVmUG9pbnRlcik7XG4gICAgICByZWZNYXAuc2V0KHN1YlNjaGVtYVBvaW50ZXIsIHJlZlBvaW50ZXIpO1xuICAgIH1cbiAgfSk7XG4gIHJlZkxpbmtzLmZvckVhY2gocmVmID0+IHJlZkxpYnJhcnlbcmVmXSA9IGdldFN1YlNjaGVtYShzY2hlbWEsIHJlZikpO1xuXG4gIC8vIEZvbGxvdyBhbGwgcmVmIGxpbmtzIGFuZCBzYXZlIGluIHJlZk1hcFNldCxcbiAgLy8gdG8gZmluZCBhbnkgbXVsdGktbGluayByZWN1cnNpdmUgcmVmZXJuY2VzXG4gIGxldCBjaGVja1JlZkxpbmtzID0gdHJ1ZTtcbiAgd2hpbGUgKGNoZWNrUmVmTGlua3MpIHtcbiAgICBjaGVja1JlZkxpbmtzID0gZmFsc2U7XG4gICAgQXJyYXkuZnJvbShyZWZNYXApLmZvckVhY2goKFtmcm9tUmVmMSwgdG9SZWYxXSkgPT4gQXJyYXkuZnJvbShyZWZNYXApXG4gICAgICAuZmlsdGVyKChbZnJvbVJlZjIsIHRvUmVmMl0pID0+XG4gICAgICAgIEpzb25Qb2ludGVyLmlzU3ViUG9pbnRlcih0b1JlZjEsIGZyb21SZWYyLCB0cnVlKSAmJlxuICAgICAgICAhSnNvblBvaW50ZXIuaXNTdWJQb2ludGVyKHRvUmVmMiwgdG9SZWYxLCB0cnVlKSAmJlxuICAgICAgICAhcmVmTWFwU2V0Lmhhcyhmcm9tUmVmMSArIGZyb21SZWYyLnNsaWNlKHRvUmVmMS5sZW5ndGgpICsgJ35+JyArIHRvUmVmMilcbiAgICAgIClcbiAgICAgIC5mb3JFYWNoKChbZnJvbVJlZjIsIHRvUmVmMl0pID0+IHtcbiAgICAgICAgcmVmTWFwU2V0LmFkZChmcm9tUmVmMSArIGZyb21SZWYyLnNsaWNlKHRvUmVmMS5sZW5ndGgpICsgJ35+JyArIHRvUmVmMik7XG4gICAgICAgIGNoZWNrUmVmTGlua3MgPSB0cnVlO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLy8gQnVpbGQgZnVsbCByZWN1cnNpdmVSZWZNYXBcbiAgLy8gRmlyc3QgcGFzcyAtIHNhdmUgYWxsIGludGVybmFsbHkgcmVjdXJzaXZlIHJlZnMgZnJvbSByZWZNYXBTZXRcbiAgQXJyYXkuZnJvbShyZWZNYXBTZXQpXG4gICAgLm1hcChyZWZMaW5rID0+IHJlZkxpbmsuc3BsaXQoJ35+JykpXG4gICAgLmZpbHRlcigoW2Zyb21SZWYsIHRvUmVmXSkgPT4gSnNvblBvaW50ZXIuaXNTdWJQb2ludGVyKHRvUmVmLCBmcm9tUmVmKSlcbiAgICAuZm9yRWFjaCgoW2Zyb21SZWYsIHRvUmVmXSkgPT4gcmVjdXJzaXZlUmVmTWFwLnNldChmcm9tUmVmLCB0b1JlZikpO1xuICAvLyBTZWNvbmQgcGFzcyAtIGNyZWF0ZSByZWN1cnNpdmUgdmVyc2lvbnMgb2YgYW55IG90aGVyIHJlZnMgdGhhdCBsaW5rIHRvIHJlY3Vyc2l2ZSByZWZzXG4gIEFycmF5LmZyb20ocmVmTWFwKVxuICAgIC5maWx0ZXIoKFtmcm9tUmVmMSwgdG9SZWYxXSkgPT4gQXJyYXkuZnJvbShyZWN1cnNpdmVSZWZNYXAua2V5cygpKVxuICAgICAgLmV2ZXJ5KGZyb21SZWYyID0+ICFKc29uUG9pbnRlci5pc1N1YlBvaW50ZXIoZnJvbVJlZjEsIGZyb21SZWYyLCB0cnVlKSlcbiAgICApXG4gICAgLmZvckVhY2goKFtmcm9tUmVmMSwgdG9SZWYxXSkgPT4gQXJyYXkuZnJvbShyZWN1cnNpdmVSZWZNYXApXG4gICAgICAuZmlsdGVyKChbZnJvbVJlZjIsIHRvUmVmMl0pID0+XG4gICAgICAgICFyZWN1cnNpdmVSZWZNYXAuaGFzKGZyb21SZWYxICsgZnJvbVJlZjIuc2xpY2UodG9SZWYxLmxlbmd0aCkpICYmXG4gICAgICAgIEpzb25Qb2ludGVyLmlzU3ViUG9pbnRlcih0b1JlZjEsIGZyb21SZWYyLCB0cnVlKSAmJlxuICAgICAgICAhSnNvblBvaW50ZXIuaXNTdWJQb2ludGVyKHRvUmVmMSwgZnJvbVJlZjEsIHRydWUpXG4gICAgICApXG4gICAgICAuZm9yRWFjaCgoW2Zyb21SZWYyLCB0b1JlZjJdKSA9PiByZWN1cnNpdmVSZWZNYXAuc2V0KFxuICAgICAgICBmcm9tUmVmMSArIGZyb21SZWYyLnNsaWNlKHRvUmVmMS5sZW5ndGgpLFxuICAgICAgICBmcm9tUmVmMSArIHRvUmVmMi5zbGljZSh0b1JlZjEubGVuZ3RoKVxuICAgICAgKSlcbiAgICApO1xuXG4gIC8vIENyZWF0ZSBjb21waWxlZCBzY2hlbWEgYnkgcmVwbGFjaW5nIGFsbCBub24tcmVjdXJzaXZlICRyZWYgbGlua3Mgd2l0aFxuICAvLyB0aGllaXIgbGlua2VkIHNjaGVtYXMgYW5kLCB3aGVyZSBwb3NzaWJsZSwgY29tYmluaW5nIHNjaGVtYXMgaW4gYWxsT2YgYXJyYXlzLlxuICBsZXQgY29tcGlsZWRTY2hlbWEgPSB7IC4uLnNjaGVtYSB9O1xuICBkZWxldGUgY29tcGlsZWRTY2hlbWEuZGVmaW5pdGlvbnM7XG4gIGNvbXBpbGVkU2NoZW1hID1cbiAgICBnZXRTdWJTY2hlbWEoY29tcGlsZWRTY2hlbWEsICcnLCByZWZMaWJyYXJ5LCByZWN1cnNpdmVSZWZNYXApO1xuXG4gIC8vIE1ha2Ugc3VyZSBhbGwgcmVtYWluaW5nIHNjaGVtYSAkcmVmcyBhcmUgcmVjdXJzaXZlLCBhbmQgYnVpbGQgZmluYWxcbiAgLy8gc2NoZW1hUmVmTGlicmFyeSwgc2NoZW1hUmVjdXJzaXZlUmVmTWFwLCBkYXRhUmVjdXJzaXZlUmVmTWFwLCAmIGFycmF5TWFwXG4gIEpzb25Qb2ludGVyLmZvckVhY2hEZWVwKGNvbXBpbGVkU2NoZW1hLCAoc3ViU2NoZW1hLCBzdWJTY2hlbWFQb2ludGVyKSA9PiB7XG4gICAgaWYgKGlzU3RyaW5nKHN1YlNjaGVtYVsnJHJlZiddKSkge1xuICAgICAgbGV0IHJlZlBvaW50ZXIgPSBKc29uUG9pbnRlci5jb21waWxlKHN1YlNjaGVtYVsnJHJlZiddKTtcbiAgICAgIGlmICghSnNvblBvaW50ZXIuaXNTdWJQb2ludGVyKHJlZlBvaW50ZXIsIHN1YlNjaGVtYVBvaW50ZXIsIHRydWUpKSB7XG4gICAgICAgIHJlZlBvaW50ZXIgPSByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzKHN1YlNjaGVtYVBvaW50ZXIsIHJlY3Vyc2l2ZVJlZk1hcCk7XG4gICAgICAgIEpzb25Qb2ludGVyLnNldChjb21waWxlZFNjaGVtYSwgc3ViU2NoZW1hUG9pbnRlciwgeyAkcmVmOiBgIyR7cmVmUG9pbnRlcn1gIH0pO1xuICAgICAgfVxuICAgICAgaWYgKCFoYXNPd24oc2NoZW1hUmVmTGlicmFyeSwgJ3JlZlBvaW50ZXInKSkge1xuICAgICAgICBzY2hlbWFSZWZMaWJyYXJ5W3JlZlBvaW50ZXJdID0gIXJlZlBvaW50ZXIubGVuZ3RoID8gY29tcGlsZWRTY2hlbWEgOlxuICAgICAgICAgIGdldFN1YlNjaGVtYShjb21waWxlZFNjaGVtYSwgcmVmUG9pbnRlciwgc2NoZW1hUmVmTGlicmFyeSwgcmVjdXJzaXZlUmVmTWFwKTtcbiAgICAgIH1cbiAgICAgIGlmICghc2NoZW1hUmVjdXJzaXZlUmVmTWFwLmhhcyhzdWJTY2hlbWFQb2ludGVyKSkge1xuICAgICAgICBzY2hlbWFSZWN1cnNpdmVSZWZNYXAuc2V0KHN1YlNjaGVtYVBvaW50ZXIsIHJlZlBvaW50ZXIpO1xuICAgICAgfVxuICAgICAgY29uc3QgZnJvbURhdGFSZWYgPSBKc29uUG9pbnRlci50b0RhdGFQb2ludGVyKHN1YlNjaGVtYVBvaW50ZXIsIGNvbXBpbGVkU2NoZW1hKTtcbiAgICAgIGlmICghZGF0YVJlY3Vyc2l2ZVJlZk1hcC5oYXMoZnJvbURhdGFSZWYpKSB7XG4gICAgICAgIGNvbnN0IHRvRGF0YVJlZiA9IEpzb25Qb2ludGVyLnRvRGF0YVBvaW50ZXIocmVmUG9pbnRlciwgY29tcGlsZWRTY2hlbWEpO1xuICAgICAgICBkYXRhUmVjdXJzaXZlUmVmTWFwLnNldChmcm9tRGF0YVJlZiwgdG9EYXRhUmVmKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHN1YlNjaGVtYS50eXBlID09PSAnYXJyYXknICYmXG4gICAgICAoaGFzT3duKHN1YlNjaGVtYSwgJ2l0ZW1zJykgfHwgaGFzT3duKHN1YlNjaGVtYSwgJ2FkZGl0aW9uYWxJdGVtcycpKVxuICAgICkge1xuICAgICAgY29uc3QgZGF0YVBvaW50ZXIgPSBKc29uUG9pbnRlci50b0RhdGFQb2ludGVyKHN1YlNjaGVtYVBvaW50ZXIsIGNvbXBpbGVkU2NoZW1hKTtcbiAgICAgIGlmICghYXJyYXlNYXAuaGFzKGRhdGFQb2ludGVyKSkge1xuICAgICAgICBjb25zdCB0dXBsZUl0ZW1zID0gaXNBcnJheShzdWJTY2hlbWEuaXRlbXMpID8gc3ViU2NoZW1hLml0ZW1zLmxlbmd0aCA6IDA7XG4gICAgICAgIGFycmF5TWFwLnNldChkYXRhUG9pbnRlciwgdHVwbGVJdGVtcyk7XG4gICAgICB9XG4gICAgfVxuICB9LCB0cnVlKTtcbiAgcmV0dXJuIGNvbXBpbGVkU2NoZW1hO1xufVxuXG4vKipcbiAqICdnZXRTdWJTY2hlbWEnIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtICB7IGFueSB9IHNjaGVtYVxuICogQHBhcmFtICB7IFBvaW50ZXIgfSBwb2ludGVyXG4gKiBAcGFyYW0gIHsgb2JqZWN0IH0gc2NoZW1hUmVmTGlicmFyeVxuICogQHBhcmFtICB7IE1hcDxzdHJpbmcsIHN0cmluZz4gfSBzY2hlbWFSZWN1cnNpdmVSZWZNYXBcbiAqIEBwYXJhbSAgeyBzdHJpbmdbXSA9IFtdIH0gdXNlZFBvaW50ZXJzXG4gKiBAcmV0dXJuIHsgYW55IH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFN1YlNjaGVtYShcbiAgc2NoZW1hLCBwb2ludGVyLCBzY2hlbWFSZWZMaWJyYXJ5ID0gbnVsbCxcbiAgc2NoZW1hUmVjdXJzaXZlUmVmTWFwOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbnVsbCwgdXNlZFBvaW50ZXJzOiBzdHJpbmdbXSA9IFtdXG4pIHtcbiAgaWYgKCFzY2hlbWFSZWZMaWJyYXJ5IHx8ICFzY2hlbWFSZWN1cnNpdmVSZWZNYXApIHtcbiAgICByZXR1cm4gSnNvblBvaW50ZXIuZ2V0Q29weShzY2hlbWEsIHBvaW50ZXIpO1xuICB9XG4gIGlmICh0eXBlb2YgcG9pbnRlciAhPT0gJ3N0cmluZycpIHsgcG9pbnRlciA9IEpzb25Qb2ludGVyLmNvbXBpbGUocG9pbnRlcik7IH1cbiAgdXNlZFBvaW50ZXJzID0gWyAuLi51c2VkUG9pbnRlcnMsIHBvaW50ZXIgXTtcbiAgbGV0IG5ld1NjaGVtYTogYW55ID0gbnVsbDtcbiAgaWYgKHBvaW50ZXIgPT09ICcnKSB7XG4gICAgbmV3U2NoZW1hID0gXy5jbG9uZURlZXAoc2NoZW1hKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBzaG9ydFBvaW50ZXIgPSByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzKHBvaW50ZXIsIHNjaGVtYVJlY3Vyc2l2ZVJlZk1hcCk7XG4gICAgaWYgKHNob3J0UG9pbnRlciAhPT0gcG9pbnRlcikgeyB1c2VkUG9pbnRlcnMgPSBbIC4uLnVzZWRQb2ludGVycywgc2hvcnRQb2ludGVyIF07IH1cbiAgICBuZXdTY2hlbWEgPSBKc29uUG9pbnRlci5nZXRGaXJzdENvcHkoW1xuICAgICAgW3NjaGVtYVJlZkxpYnJhcnksIFtzaG9ydFBvaW50ZXJdXSxcbiAgICAgIFtzY2hlbWEsIHBvaW50ZXJdLFxuICAgICAgW3NjaGVtYSwgc2hvcnRQb2ludGVyXVxuICAgIF0pO1xuICB9XG4gIHJldHVybiBKc29uUG9pbnRlci5mb3JFYWNoRGVlcENvcHkobmV3U2NoZW1hLCAoc3ViU2NoZW1hLCBzdWJQb2ludGVyKSA9PiB7XG4gICAgaWYgKGlzT2JqZWN0KHN1YlNjaGVtYSkpIHtcblxuICAgICAgLy8gUmVwbGFjZSBub24tcmVjdXJzaXZlICRyZWYgbGlua3Mgd2l0aCByZWZlcmVuY2VkIHNjaGVtYXNcbiAgICAgIGlmIChpc1N0cmluZyhzdWJTY2hlbWEuJHJlZikpIHtcbiAgICAgICAgY29uc3QgcmVmUG9pbnRlciA9IEpzb25Qb2ludGVyLmNvbXBpbGUoc3ViU2NoZW1hLiRyZWYpO1xuICAgICAgICBpZiAocmVmUG9pbnRlci5sZW5ndGggJiYgdXNlZFBvaW50ZXJzLmV2ZXJ5KHB0ciA9PlxuICAgICAgICAgICFKc29uUG9pbnRlci5pc1N1YlBvaW50ZXIocmVmUG9pbnRlciwgcHRyLCB0cnVlKVxuICAgICAgICApKSB7XG4gICAgICAgICAgY29uc3QgcmVmU2NoZW1hID0gZ2V0U3ViU2NoZW1hKFxuICAgICAgICAgICAgc2NoZW1hLCByZWZQb2ludGVyLCBzY2hlbWFSZWZMaWJyYXJ5LCBzY2hlbWFSZWN1cnNpdmVSZWZNYXAsIHVzZWRQb2ludGVyc1xuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHN1YlNjaGVtYSkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVmU2NoZW1hO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBleHRyYUtleXMgPSB7IC4uLnN1YlNjaGVtYSB9O1xuICAgICAgICAgICAgZGVsZXRlIGV4dHJhS2V5cy4kcmVmO1xuICAgICAgICAgICAgcmV0dXJuIG1lcmdlU2NoZW1hcyhyZWZTY2hlbWEsIGV4dHJhS2V5cyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRPRE86IENvbnZlcnQgc2NoZW1hcyB3aXRoICd0eXBlJyBhcnJheXMgdG8gJ29uZU9mJ1xuXG4gICAgICAvLyBDb21iaW5lIGFsbE9mIHN1YlNjaGVtYXNcbiAgICAgIGlmIChpc0FycmF5KHN1YlNjaGVtYS5hbGxPZikpIHsgcmV0dXJuIGNvbWJpbmVBbGxPZihzdWJTY2hlbWEpOyB9XG5cbiAgICAgIC8vIEZpeCBpbmNvcnJlY3RseSBwbGFjZWQgYXJyYXkgb2JqZWN0IHJlcXVpcmVkIGxpc3RzXG4gICAgICBpZiAoc3ViU2NoZW1hLnR5cGUgPT09ICdhcnJheScgJiYgaXNBcnJheShzdWJTY2hlbWEucmVxdWlyZWQpKSB7XG4gICAgICAgIHJldHVybiBmaXhSZXF1aXJlZEFycmF5UHJvcGVydGllcyhzdWJTY2hlbWEpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3ViU2NoZW1hO1xuICB9LCB0cnVlLCA8c3RyaW5nPnBvaW50ZXIpO1xufVxuXG4vKipcbiAqICdjb21iaW5lQWxsT2YnIGZ1bmN0aW9uXG4gKlxuICogQXR0ZW1wdCB0byBjb252ZXJ0IGFuIGFsbE9mIHNjaGVtYSBvYmplY3QgaW50b1xuICogYSBub24tYWxsT2Ygc2NoZW1hIG9iamVjdCB3aXRoIGVxdWl2YWxlbnQgcnVsZXMuXG4gKlxuICogQHBhcmFtICB7IGFueSB9IHNjaGVtYSAtIGFsbE9mIHNjaGVtYSBvYmplY3RcbiAqIEByZXR1cm4geyBhbnkgfSAtIGNvbnZlcnRlZCBzY2hlbWEgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lQWxsT2Yoc2NoZW1hKSB7XG4gIGlmICghaXNPYmplY3Qoc2NoZW1hKSB8fCAhaXNBcnJheShzY2hlbWEuYWxsT2YpKSB7IHJldHVybiBzY2hlbWE7IH1cbiAgbGV0IG1lcmdlZFNjaGVtYSA9IG1lcmdlU2NoZW1hcyguLi5zY2hlbWEuYWxsT2YpO1xuICBpZiAoT2JqZWN0LmtleXMoc2NoZW1hKS5sZW5ndGggPiAxKSB7XG4gICAgY29uc3QgZXh0cmFLZXlzID0geyAuLi5zY2hlbWEgfTtcbiAgICBkZWxldGUgZXh0cmFLZXlzLmFsbE9mO1xuICAgIG1lcmdlZFNjaGVtYSA9IG1lcmdlU2NoZW1hcyhtZXJnZWRTY2hlbWEsIGV4dHJhS2V5cyk7XG4gIH1cbiAgcmV0dXJuIG1lcmdlZFNjaGVtYTtcbn1cblxuLyoqXG4gKiAnZml4UmVxdWlyZWRBcnJheVByb3BlcnRpZXMnIGZ1bmN0aW9uXG4gKlxuICogRml4ZXMgYW4gaW5jb3JyZWN0bHkgcGxhY2VkIHJlcXVpcmVkIGxpc3QgaW5zaWRlIGFuIGFycmF5IHNjaGVtYSwgYnkgbW92aW5nXG4gKiBpdCBpbnRvIGl0ZW1zLnByb3BlcnRpZXMgb3IgYWRkaXRpb25hbEl0ZW1zLnByb3BlcnRpZXMsIHdoZXJlIGl0IGJlbG9uZ3MuXG4gKlxuICogQHBhcmFtICB7IGFueSB9IHNjaGVtYSAtIGFsbE9mIHNjaGVtYSBvYmplY3RcbiAqIEByZXR1cm4geyBhbnkgfSAtIGNvbnZlcnRlZCBzY2hlbWEgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaXhSZXF1aXJlZEFycmF5UHJvcGVydGllcyhzY2hlbWEpIHtcbiAgaWYgKHNjaGVtYS50eXBlID09PSAnYXJyYXknICYmIGlzQXJyYXkoc2NoZW1hLnJlcXVpcmVkKSkge1xuICAgIGNvbnN0IGl0ZW1zT2JqZWN0ID0gaGFzT3duKHNjaGVtYS5pdGVtcywgJ3Byb3BlcnRpZXMnKSA/ICdpdGVtcycgOlxuICAgICAgaGFzT3duKHNjaGVtYS5hZGRpdGlvbmFsSXRlbXMsICdwcm9wZXJ0aWVzJykgPyAnYWRkaXRpb25hbEl0ZW1zJyA6IG51bGw7XG4gICAgaWYgKGl0ZW1zT2JqZWN0ICYmICFoYXNPd24oc2NoZW1hW2l0ZW1zT2JqZWN0XSwgJ3JlcXVpcmVkJykgJiYgKFxuICAgICAgaGFzT3duKHNjaGVtYVtpdGVtc09iamVjdF0sICdhZGRpdGlvbmFsUHJvcGVydGllcycpIHx8XG4gICAgICBzY2hlbWEucmVxdWlyZWQuZXZlcnkoa2V5ID0+IGhhc093bihzY2hlbWFbaXRlbXNPYmplY3RdLnByb3BlcnRpZXMsIGtleSkpXG4gICAgKSkge1xuICAgICAgc2NoZW1hID0gXy5jbG9uZURlZXAoc2NoZW1hKTtcbiAgICAgIHNjaGVtYVtpdGVtc09iamVjdF0ucmVxdWlyZWQgPSBzY2hlbWEucmVxdWlyZWQ7XG4gICAgICBkZWxldGUgc2NoZW1hLnJlcXVpcmVkO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc2NoZW1hO1xufVxuIl19