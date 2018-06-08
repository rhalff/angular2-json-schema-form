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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zY2hlbWEuZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcjItanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbInNyYy9zaGFyZWQvanNvbi1zY2hlbWEuZnVuY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE9BQU8sRUFDTCxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxRQUFRLEVBQzVFLFFBQVEsRUFDVCxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFDTCxPQUFPLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUNyQyxNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFXLE1BQU0seUJBQXlCLENBQUM7QUFHL0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQUVIOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLGdDQUFnQyxNQUFNO0lBQzFDLE1BQU0sQ0FBQztJQUNQLDRCQUE0QjtJQUM1QiwwRUFBMEU7SUFDMUUsaUNBQWlDO0lBQ2pDLDBDQUEwQztJQUMxQyxvREFBb0Q7SUFDcEQsa0ZBQWtGO0lBQ2xGLDhCQUE4QjtJQUM5QixrRkFBa0Y7SUFDbEYsUUFBUTtJQUNSLE1BQU07SUFDTix3QkFBd0I7SUFDeEIsS0FBSztJQUNMLHFDQUFxQztJQUNyQyx5QkFBeUI7SUFDekIsMENBQTBDO0lBQzFDLDRCQUE0QjtJQUM1QixpQ0FBaUM7SUFDakMsZ0NBQWdDO0lBQ2hDLE1BQU07SUFDTiw4QkFBOEI7SUFDOUIsT0FBTztJQUNQLE1BQU07QUFDUixDQUFDO0FBRUQ7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSw4QkFDSixJQUFJLEVBQUUsZ0JBQWdCLEdBQUcsS0FBSyxFQUFFLE1B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QUM7UUFDeEQsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hFLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FDN0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxzQkFBc0IsQ0FBQztZQUNuRCxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQzFFLENBQUMsQ0FBQyxDQUFDO1lBQ0YsTUFBTSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQy9DLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDO0lBQ0gsQ0FBQztJQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHtcbiAgZ2V0VHlwZSwgaGFzVmFsdWUsIGluQXJyYXksIGlzQXJyYXksIGlzRW1wdHksIGlzRnVuY3Rpb24sIGlzTnVtYmVyLCBpc09iamVjdCxcbiAgaXNTdHJpbmdcbn0gZnJvbSAnLi92YWxpZGF0b3IuZnVuY3Rpb25zJztcbmltcG9ydCB7XG4gIGZvckVhY2gsIGhhc093biwgbWVyZ2VGaWx0ZXJlZE9iamVjdCwgdW5pcXVlSXRlbXMsIGNvbW1vbkl0ZW1zXG59IGZyb20gJy4vdXRpbGl0eS5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgbWVyZ2VTY2hlbWFzIH0gZnJvbSAnLi9tZXJnZS1zY2hlbWFzLmZ1bmN0aW9uJztcbmltcG9ydCB7IEpzb25Qb2ludGVyLCBQb2ludGVyIH0gZnJvbSAnLi9qc29ucG9pbnRlci5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgSnNvblZhbGlkYXRvcnMgfSBmcm9tICcuL2pzb24udmFsaWRhdG9ycyc7XG5cbi8qKlxuICogSlNPTiBTY2hlbWEgZnVuY3Rpb24gbGlicmFyeTpcbiAqXG4gKiBidWlsZFNjaGVtYUZyb21MYXlvdXQ6ICAgVE9ETzogV3JpdGUgdGhpcyBmdW5jdGlvblxuICpcbiAqIGJ1aWxkU2NoZW1hRnJvbURhdGE6XG4gKlxuICogZ2V0RnJvbVNjaGVtYTpcbiAqXG4gKiByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzOlxuICpcbiAqIGdldElucHV0VHlwZTpcbiAqXG4gKiBjaGVja0lubGluZVR5cGU6XG4gKlxuICogaXNJbnB1dFJlcXVpcmVkOlxuICpcbiAqIHVwZGF0ZUlucHV0T3B0aW9uczpcbiAqXG4gKiBnZXRUaXRsZU1hcEZyb21PbmVPZjpcbiAqXG4gKiBnZXRDb250cm9sVmFsaWRhdG9yczpcbiAqXG4gKiByZXNvbHZlU2NoZW1hUmVmZXJlbmNlczpcbiAqXG4gKiBnZXRTdWJTY2hlbWE6XG4gKlxuICogY29tYmluZUFsbE9mOlxuICpcbiAqIGZpeFJlcXVpcmVkQXJyYXlQcm9wZXJ0aWVzOlxuICovXG5cbi8qKlxuICogJ2J1aWxkU2NoZW1hRnJvbUxheW91dCcgZnVuY3Rpb25cbiAqXG4gKiBUT0RPOiBCdWlsZCBhIEpTT04gU2NoZW1hIGZyb20gYSBKU09OIEZvcm0gbGF5b3V0XG4gKlxuICogQHBhcmFtICB7IGFueVtdIH0gbGF5b3V0IC0gVGhlIEpTT04gRm9ybSBsYXlvdXRcbiAqIEByZXR1cm4geyBhbnkgfSAtIFRoZSBuZXcgSlNPTiBTY2hlbWFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkU2NoZW1hRnJvbUxheW91dChsYXlvdXQpIHtcbiAgcmV0dXJuO1xuICAvLyBsZXQgbmV3U2NoZW1hOiBhbnkgPSB7IH07XG4gIC8vIGNvbnN0IHdhbGtMYXlvdXQgPSAobGF5b3V0SXRlbXM6IGFueVtdLCBjYWxsYmFjazogRnVuY3Rpb24pOiBhbnlbXSA9PiB7XG4gIC8vICAgbGV0IHJldHVybkFycmF5OiBhbnlbXSA9IFtdO1xuICAvLyAgIGZvciAobGV0IGxheW91dEl0ZW0gb2YgbGF5b3V0SXRlbXMpIHtcbiAgLy8gICAgIGNvbnN0IHJldHVybkl0ZW06IGFueSA9IGNhbGxiYWNrKGxheW91dEl0ZW0pO1xuICAvLyAgICAgaWYgKHJldHVybkl0ZW0pIHsgcmV0dXJuQXJyYXkgPSByZXR1cm5BcnJheS5jb25jYXQoY2FsbGJhY2sobGF5b3V0SXRlbSkpOyB9XG4gIC8vICAgICBpZiAobGF5b3V0SXRlbS5pdGVtcykge1xuICAvLyAgICAgICByZXR1cm5BcnJheSA9IHJldHVybkFycmF5LmNvbmNhdCh3YWxrTGF5b3V0KGxheW91dEl0ZW0uaXRlbXMsIGNhbGxiYWNrKSk7XG4gIC8vICAgICB9XG4gIC8vICAgfVxuICAvLyAgIHJldHVybiByZXR1cm5BcnJheTtcbiAgLy8gfTtcbiAgLy8gd2Fsa0xheW91dChsYXlvdXQsIGxheW91dEl0ZW0gPT4ge1xuICAvLyAgIGxldCBpdGVtS2V5OiBzdHJpbmc7XG4gIC8vICAgaWYgKHR5cGVvZiBsYXlvdXRJdGVtID09PSAnc3RyaW5nJykge1xuICAvLyAgICAgaXRlbUtleSA9IGxheW91dEl0ZW07XG4gIC8vICAgfSBlbHNlIGlmIChsYXlvdXRJdGVtLmtleSkge1xuICAvLyAgICAgaXRlbUtleSA9IGxheW91dEl0ZW0ua2V5O1xuICAvLyAgIH1cbiAgLy8gICBpZiAoIWl0ZW1LZXkpIHsgcmV0dXJuOyB9XG4gIC8vICAgLy9cbiAgLy8gfSk7XG59XG5cbi8qKlxuICogJ2J1aWxkU2NoZW1hRnJvbURhdGEnIGZ1bmN0aW9uXG4gKlxuICogQnVpbGQgYSBKU09OIFNjaGVtYSBmcm9tIGEgZGF0YSBvYmplY3RcbiAqXG4gKiBAcGFyYW0gIHsgYW55IH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdFxuICogQHBhcmFtICB7IGJvb2xlYW4gPSBmYWxzZSB9IHJlcXVpcmVBbGxGaWVsZHMgLSBSZXF1aXJlIGFsbCBmaWVsZHM/XG4gKiBAcGFyYW0gIHsgYm9vbGVhbiA9IHRydWUgfSBpc1Jvb3QgLSBpcyByb290XG4gKiBAcmV0dXJuIHsgYW55IH0gLSBUaGUgbmV3IEpTT04gU2NoZW1hXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFNjaGVtYUZyb21EYXRhKFxuICBkYXRhLCByZXF1aXJlQWxsRmllbGRzID0gZmFsc2UsIGlzUm9vdCA9IHRydWVcbikge1xuICBjb25zdCBuZXdTY2hlbWE6IGFueSA9IHt9O1xuICBjb25zdCBnZXRGaWVsZFR5cGUgPSAodmFsdWU6IGFueSk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgZmllbGRUeXBlID0gZ2V0VHlwZSh2YWx1ZSwgJ3N0cmljdCcpO1xuICAgIHJldHVybiB7IGludGVnZXI6ICdudW1iZXInLCBudWxsOiAnc3RyaW5nJyB9W2ZpZWxkVHlwZV0gfHwgZmllbGRUeXBlO1xuICB9O1xuICBjb25zdCBidWlsZFN1YlNjaGVtYSA9ICh2YWx1ZSkgPT5cbiAgICBidWlsZFNjaGVtYUZyb21EYXRhKHZhbHVlLCByZXF1aXJlQWxsRmllbGRzLCBmYWxzZSk7XG4gIGlmIChpc1Jvb3QpIHsgbmV3U2NoZW1hLiRzY2hlbWEgPSAnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNi9zY2hlbWEjJzsgfVxuICBuZXdTY2hlbWEudHlwZSA9IGdldEZpZWxkVHlwZShkYXRhKTtcbiAgaWYgKG5ld1NjaGVtYS50eXBlID09PSAnb2JqZWN0Jykge1xuICAgIG5ld1NjaGVtYS5wcm9wZXJ0aWVzID0ge307XG4gICAgaWYgKHJlcXVpcmVBbGxGaWVsZHMpIHsgbmV3U2NoZW1hLnJlcXVpcmVkID0gW107IH1cbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhkYXRhKSkge1xuICAgICAgbmV3U2NoZW1hLnByb3BlcnRpZXNba2V5XSA9IGJ1aWxkU3ViU2NoZW1hKGRhdGFba2V5XSk7XG4gICAgICBpZiAocmVxdWlyZUFsbEZpZWxkcykgeyBuZXdTY2hlbWEucmVxdWlyZWQucHVzaChrZXkpOyB9XG4gICAgfVxuICB9IGVsc2UgaWYgKG5ld1NjaGVtYS50eXBlID09PSAnYXJyYXknKSB7XG4gICAgbmV3U2NoZW1hLml0ZW1zID0gZGF0YS5tYXAoYnVpbGRTdWJTY2hlbWEpO1xuICAgIC8vIElmIGFsbCBpdGVtcyBhcmUgdGhlIHNhbWUgdHlwZSwgdXNlIGFuIG9iamVjdCBmb3IgaXRlbXMgaW5zdGVhZCBvZiBhbiBhcnJheVxuICAgIGlmICgobmV3IFNldChkYXRhLm1hcChnZXRGaWVsZFR5cGUpKSkuc2l6ZSA9PT0gMSkge1xuICAgICAgbmV3U2NoZW1hLml0ZW1zID0gbmV3U2NoZW1hLml0ZW1zLnJlZHVjZSgoYSwgYikgPT4gKHsgLi4uYSwgLi4uYiB9KSwge30pO1xuICAgIH1cbiAgICBpZiAocmVxdWlyZUFsbEZpZWxkcykgeyBuZXdTY2hlbWEubWluSXRlbXMgPSAxOyB9XG4gIH1cbiAgcmV0dXJuIG5ld1NjaGVtYTtcbn1cblxuLyoqXG4gKiAnZ2V0RnJvbVNjaGVtYScgZnVuY3Rpb25cbiAqXG4gKiBVc2VzIGEgSlNPTiBQb2ludGVyIGZvciBhIHZhbHVlIHdpdGhpbiBhIGRhdGEgb2JqZWN0IHRvIHJldHJpZXZlXG4gKiB0aGUgc2NoZW1hIGZvciB0aGF0IHZhbHVlIHdpdGhpbiBzY2hlbWEgZm9yIHRoZSBkYXRhIG9iamVjdC5cbiAqXG4gKiBUaGUgb3B0aW9uYWwgdGhpcmQgcGFyYW1ldGVyIGNhbiBhbHNvIGJlIHNldCB0byByZXR1cm4gc29tZXRoaW5nIGVsc2U6XG4gKiAnc2NoZW1hJyAoZGVmYXVsdCk6IHRoZSBzY2hlbWEgZm9yIHRoZSB2YWx1ZSBpbmRpY2F0ZWQgYnkgdGhlIGRhdGEgcG9pbnRlclxuICogJ3BhcmVudFNjaGVtYSc6IHRoZSBzY2hlbWEgZm9yIHRoZSB2YWx1ZSdzIHBhcmVudCBvYmplY3Qgb3IgYXJyYXlcbiAqICdzY2hlbWFQb2ludGVyJzogYSBwb2ludGVyIHRvIHRoZSB2YWx1ZSdzIHNjaGVtYSB3aXRoaW4gdGhlIG9iamVjdCdzIHNjaGVtYVxuICogJ3BhcmVudFNjaGVtYVBvaW50ZXInOiBhIHBvaW50ZXIgdG8gdGhlIHNjaGVtYSBmb3IgdGhlIHZhbHVlJ3MgcGFyZW50IG9iamVjdCBvciBhcnJheVxuICpcbiAqIEBwYXJhbSAgeyBhbnkgfSBzY2hlbWEgLSBUaGUgc2NoZW1hIHRvIGdldCB0aGUgc3ViLXNjaGVtYSBmcm9tXG4gKiBAcGFyYW0gIHsgUG9pbnRlciB9IGRhdGFQb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gKiBAcGFyYW0gIHsgc3RyaW5nID0gJ3NjaGVtYScgfSByZXR1cm5UeXBlIC0gd2hhdCB0byByZXR1cm4/XG4gKiBAcmV0dXJuIHsgYW55IH0gLSBUaGUgbG9jYXRlZCBzdWItc2NoZW1hXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRGcm9tU2NoZW1hKHNjaGVtYSwgZGF0YVBvaW50ZXIsIHJldHVyblR5cGUgPSAnc2NoZW1hJykge1xuICBjb25zdCBkYXRhUG9pbnRlckFycmF5OiBhbnlbXSA9IEpzb25Qb2ludGVyLnBhcnNlKGRhdGFQb2ludGVyKTtcbiAgaWYgKGRhdGFQb2ludGVyQXJyYXkgPT09IG51bGwpIHtcbiAgICBjb25zb2xlLmVycm9yKGBnZXRGcm9tU2NoZW1hIGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlcjogJHtkYXRhUG9pbnRlcn1gKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBsZXQgc3ViU2NoZW1hID0gc2NoZW1hO1xuICBjb25zdCBzY2hlbWFQb2ludGVyID0gW107XG4gIGNvbnN0IGxlbmd0aCA9IGRhdGFQb2ludGVyQXJyYXkubGVuZ3RoO1xuICBpZiAocmV0dXJuVHlwZS5zbGljZSgwLCA2KSA9PT0gJ3BhcmVudCcpIHsgZGF0YVBvaW50ZXJBcnJheS5sZW5ndGgtLTsgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgcGFyZW50U2NoZW1hID0gc3ViU2NoZW1hO1xuICAgIGNvbnN0IGtleSA9IGRhdGFQb2ludGVyQXJyYXlbaV07XG4gICAgbGV0IHN1YlNjaGVtYUZvdW5kID0gZmFsc2U7XG4gICAgaWYgKHR5cGVvZiBzdWJTY2hlbWEgIT09ICdvYmplY3QnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBnZXRGcm9tU2NoZW1hIGVycm9yOiBVbmFibGUgdG8gZmluZCBcIiR7a2V5fVwiIGtleSBpbiBzY2hlbWEuYCk7XG4gICAgICBjb25zb2xlLmVycm9yKHNjaGVtYSk7XG4gICAgICBjb25zb2xlLmVycm9yKGRhdGFQb2ludGVyKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoc3ViU2NoZW1hLnR5cGUgPT09ICdhcnJheScgJiYgKCFpc05hTihrZXkpIHx8IGtleSA9PT0gJy0nKSkge1xuICAgICAgaWYgKGhhc093bihzdWJTY2hlbWEsICdpdGVtcycpKSB7XG4gICAgICAgIGlmIChpc09iamVjdChzdWJTY2hlbWEuaXRlbXMpKSB7XG4gICAgICAgICAgc3ViU2NoZW1hRm91bmQgPSB0cnVlO1xuICAgICAgICAgIHN1YlNjaGVtYSA9IHN1YlNjaGVtYS5pdGVtcztcbiAgICAgICAgICBzY2hlbWFQb2ludGVyLnB1c2goJ2l0ZW1zJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShzdWJTY2hlbWEuaXRlbXMpKSB7XG4gICAgICAgICAgaWYgKCFpc05hTihrZXkpICYmIHN1YlNjaGVtYS5pdGVtcy5sZW5ndGggPj0gK2tleSkge1xuICAgICAgICAgICAgc3ViU2NoZW1hRm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgc3ViU2NoZW1hID0gc3ViU2NoZW1hLml0ZW1zWytrZXldO1xuICAgICAgICAgICAgc2NoZW1hUG9pbnRlci5wdXNoKCdpdGVtcycsIGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIXN1YlNjaGVtYUZvdW5kICYmIGlzT2JqZWN0KHN1YlNjaGVtYS5hZGRpdGlvbmFsSXRlbXMpKSB7XG4gICAgICAgIHN1YlNjaGVtYUZvdW5kID0gdHJ1ZTtcbiAgICAgICAgc3ViU2NoZW1hID0gc3ViU2NoZW1hLmFkZGl0aW9uYWxJdGVtcztcbiAgICAgICAgc2NoZW1hUG9pbnRlci5wdXNoKCdhZGRpdGlvbmFsSXRlbXMnKTtcbiAgICAgIH0gZWxzZSBpZiAoc3ViU2NoZW1hLmFkZGl0aW9uYWxJdGVtcyAhPT0gZmFsc2UpIHtcbiAgICAgICAgc3ViU2NoZW1hRm91bmQgPSB0cnVlO1xuICAgICAgICBzdWJTY2hlbWEgPSB7IH07XG4gICAgICAgIHNjaGVtYVBvaW50ZXIucHVzaCgnYWRkaXRpb25hbEl0ZW1zJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzdWJTY2hlbWEudHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChpc09iamVjdChzdWJTY2hlbWEucHJvcGVydGllcykgJiYgaGFzT3duKHN1YlNjaGVtYS5wcm9wZXJ0aWVzLCBrZXkpKSB7XG4gICAgICAgIHN1YlNjaGVtYUZvdW5kID0gdHJ1ZTtcbiAgICAgICAgc3ViU2NoZW1hID0gc3ViU2NoZW1hLnByb3BlcnRpZXNba2V5XTtcbiAgICAgICAgc2NoZW1hUG9pbnRlci5wdXNoKCdwcm9wZXJ0aWVzJywga2V5KTtcbiAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3Qoc3ViU2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzKSkge1xuICAgICAgICBzdWJTY2hlbWFGb3VuZCA9IHRydWU7XG4gICAgICAgIHN1YlNjaGVtYSA9IHN1YlNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcztcbiAgICAgICAgc2NoZW1hUG9pbnRlci5wdXNoKCdhZGRpdGlvbmFsUHJvcGVydGllcycpO1xuICAgICAgfSBlbHNlIGlmIChzdWJTY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMgIT09IGZhbHNlKSB7XG4gICAgICAgIHN1YlNjaGVtYUZvdW5kID0gdHJ1ZTtcbiAgICAgICAgc3ViU2NoZW1hID0geyB9O1xuICAgICAgICBzY2hlbWFQb2ludGVyLnB1c2goJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghc3ViU2NoZW1hRm91bmQpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYGdldEZyb21TY2hlbWEgZXJyb3I6IFVuYWJsZSB0byBmaW5kIFwiJHtrZXl9XCIgaXRlbSBpbiBzY2hlbWEuYCk7XG4gICAgICBjb25zb2xlLmVycm9yKHNjaGVtYSk7XG4gICAgICBjb25zb2xlLmVycm9yKGRhdGFQb2ludGVyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJldHVyblR5cGUuc2xpY2UoLTcpID09PSAnUG9pbnRlcicgPyBzY2hlbWFQb2ludGVyIDogc3ViU2NoZW1hO1xufVxuXG4vKipcbiAqICdyZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzJyBmdW5jdGlvblxuICpcbiAqIENoZWNrcyBhIEpTT04gUG9pbnRlciBhZ2FpbnN0IGEgbWFwIG9mIHJlY3Vyc2l2ZSByZWZlcmVuY2VzIGFuZCByZXR1cm5zXG4gKiBhIEpTT04gUG9pbnRlciB0byB0aGUgc2hhbGxvd2VzdCBlcXVpdmFsZW50IGxvY2F0aW9uIGluIHRoZSBzYW1lIG9iamVjdC5cbiAqXG4gKiBVc2luZyB0aGlzIGZ1bmN0aW9ucyBlbmFibGVzIGFuIG9iamVjdCB0byBiZSBjb25zdHJ1Y3RlZCB3aXRoIHVubGltaXRlZFxuICogcmVjdXJzaW9uLCB3aGlsZSBtYWludGFpbmcgYSBmaXhlZCBzZXQgb2YgbWV0YWRhdGEsIHN1Y2ggYXMgZmllbGQgZGF0YSB0eXBlcy5cbiAqIFRoZSBvYmplY3QgY2FuIGdyb3cgYXMgbGFyZ2UgYXMgaXQgd2FudHMsIGFuZCBkZWVwbHkgcmVjdXJzZWQgbm9kZXMgY2FuXG4gKiBqdXN0IHJlZmVyIHRvIHRoZSBtZXRhZGF0YSBmb3IgdGhlaXIgc2hhbGxvdyBlcXVpdmFsZW50cywgaW5zdGVhZCBvZiBoYXZpbmdcbiAqIHRvIGFkZCBhZGRpdGlvbmFsIHJlZHVuZGFudCBtZXRhZGF0YSBmb3IgZWFjaCByZWN1cnNpdmVseSBhZGRlZCBub2RlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogcG9pbnRlcjogICAgICAgICAnL3N0dWZmL2FuZC9tb3JlL2FuZC9tb3JlL2FuZC9tb3JlL2FuZC9tb3JlL3N0dWZmJ1xuICogcmVjdXJzaXZlUmVmTWFwOiBbWycvc3R1ZmYvYW5kL21vcmUvYW5kL21vcmUnLCAnL3N0dWZmL2FuZC9tb3JlLyddXVxuICogcmV0dXJuZWQ6ICAgICAgICAnL3N0dWZmL2FuZC9tb3JlL3N0dWZmJ1xuICpcbiAqIEBwYXJhbSAgeyBQb2ludGVyIH0gcG9pbnRlciAtXG4gKiBAcGFyYW0gIHsgTWFwPHN0cmluZywgc3RyaW5nPiB9IHJlY3Vyc2l2ZVJlZk1hcCAtXG4gKiBAcGFyYW0gIHsgTWFwPHN0cmluZywgbnVtYmVyPiA9IG5ldyBNYXAoKSB9IGFycmF5TWFwIC0gb3B0aW9uYWxcbiAqIEByZXR1cm4geyBzdHJpbmcgfSAtXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzKFxuICBwb2ludGVyLCByZWN1cnNpdmVSZWZNYXAsIGFycmF5TWFwID0gbmV3IE1hcCgpXG4pIHtcbiAgaWYgKCFwb2ludGVyKSB7IHJldHVybiAnJzsgfVxuICBsZXQgZ2VuZXJpY1BvaW50ZXIgPVxuICAgIEpzb25Qb2ludGVyLnRvR2VuZXJpY1BvaW50ZXIoSnNvblBvaW50ZXIuY29tcGlsZShwb2ludGVyKSwgYXJyYXlNYXApO1xuICBpZiAoZ2VuZXJpY1BvaW50ZXIuaW5kZXhPZignLycpID09PSAtMSkgeyByZXR1cm4gZ2VuZXJpY1BvaW50ZXI7IH1cbiAgbGV0IHBvc3NpYmxlUmVmZXJlbmNlcyA9IHRydWU7XG4gIHdoaWxlIChwb3NzaWJsZVJlZmVyZW5jZXMpIHtcbiAgICBwb3NzaWJsZVJlZmVyZW5jZXMgPSBmYWxzZTtcbiAgICByZWN1cnNpdmVSZWZNYXAuZm9yRWFjaCgodG9Qb2ludGVyLCBmcm9tUG9pbnRlcikgPT4ge1xuICAgICAgaWYgKEpzb25Qb2ludGVyLmlzU3ViUG9pbnRlcih0b1BvaW50ZXIsIGZyb21Qb2ludGVyKSkge1xuICAgICAgICB3aGlsZSAoSnNvblBvaW50ZXIuaXNTdWJQb2ludGVyKGZyb21Qb2ludGVyLCBnZW5lcmljUG9pbnRlciwgdHJ1ZSkpIHtcbiAgICAgICAgICBnZW5lcmljUG9pbnRlciA9IEpzb25Qb2ludGVyLnRvR2VuZXJpY1BvaW50ZXIoXG4gICAgICAgICAgICB0b1BvaW50ZXIgKyBnZW5lcmljUG9pbnRlci5zbGljZShmcm9tUG9pbnRlci5sZW5ndGgpLCBhcnJheU1hcFxuICAgICAgICAgICk7XG4gICAgICAgICAgcG9zc2libGVSZWZlcmVuY2VzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiBnZW5lcmljUG9pbnRlcjtcbn1cblxuLyoqXG4gKiAnZ2V0SW5wdXRUeXBlJyBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSAgeyBhbnkgfSBzY2hlbWFcbiAqIEBwYXJhbSAgeyBhbnkgPSBudWxsIH0gbGF5b3V0Tm9kZVxuICogQHJldHVybiB7IHN0cmluZyB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbnB1dFR5cGUoc2NoZW1hLCBsYXlvdXROb2RlOiBhbnkgPSBudWxsKSB7XG4gIC8vIHgtc2NoZW1hLWZvcm0gPSBBbmd1bGFyIFNjaGVtYSBGb3JtIGNvbXBhdGliaWxpdHlcbiAgLy8gd2lkZ2V0ICYgY29tcG9uZW50ID0gUmVhY3QgSnNvbnNjaGVtYSBGb3JtIGNvbXBhdGliaWxpdHlcbiAgY29uc3QgY29udHJvbFR5cGUgPSBKc29uUG9pbnRlci5nZXRGaXJzdChbXG4gICAgW3NjaGVtYSwgJy94LXNjaGVtYS1mb3JtL3R5cGUnXSxcbiAgICBbc2NoZW1hLCAnL3gtc2NoZW1hLWZvcm0vd2lkZ2V0L2NvbXBvbmVudCddLFxuICAgIFtzY2hlbWEsICcveC1zY2hlbWEtZm9ybS93aWRnZXQnXSxcbiAgICBbc2NoZW1hLCAnL3dpZGdldC9jb21wb25lbnQnXSxcbiAgICBbc2NoZW1hLCAnL3dpZGdldCddXG4gIF0pO1xuICBpZiAoaXNTdHJpbmcoY29udHJvbFR5cGUpKSB7IHJldHVybiBjaGVja0lubGluZVR5cGUoY29udHJvbFR5cGUsIHNjaGVtYSwgbGF5b3V0Tm9kZSk7IH1cbiAgbGV0IHNjaGVtYVR5cGUgPSBzY2hlbWEudHlwZTtcbiAgaWYgKHNjaGVtYVR5cGUpIHtcbiAgICBpZiAoaXNBcnJheShzY2hlbWFUeXBlKSkgeyAvLyBJZiBtdWx0aXBsZSB0eXBlcyBsaXN0ZWQsIHVzZSBtb3N0IGluY2x1c2l2ZSB0eXBlXG4gICAgICBzY2hlbWFUeXBlID1cbiAgICAgICAgaW5BcnJheSgnb2JqZWN0Jywgc2NoZW1hVHlwZSkgJiYgaGFzT3duKHNjaGVtYSwgJ3Byb3BlcnRpZXMnKSA/ICdvYmplY3QnIDpcbiAgICAgICAgaW5BcnJheSgnYXJyYXknLCBzY2hlbWFUeXBlKSAmJiBoYXNPd24oc2NoZW1hLCAnaXRlbXMnKSA/ICdhcnJheScgOlxuICAgICAgICBpbkFycmF5KCdhcnJheScsIHNjaGVtYVR5cGUpICYmIGhhc093bihzY2hlbWEsICdhZGRpdGlvbmFsSXRlbXMnKSA/ICdhcnJheScgOlxuICAgICAgICBpbkFycmF5KCdzdHJpbmcnLCBzY2hlbWFUeXBlKSA/ICdzdHJpbmcnIDpcbiAgICAgICAgaW5BcnJheSgnbnVtYmVyJywgc2NoZW1hVHlwZSkgPyAnbnVtYmVyJyA6XG4gICAgICAgIGluQXJyYXkoJ2ludGVnZXInLCBzY2hlbWFUeXBlKSA/ICdpbnRlZ2VyJyA6XG4gICAgICAgIGluQXJyYXkoJ2Jvb2xlYW4nLCBzY2hlbWFUeXBlKSA/ICdib29sZWFuJyA6ICd1bmtub3duJztcbiAgICB9XG4gICAgaWYgKHNjaGVtYVR5cGUgPT09ICdib29sZWFuJykgeyByZXR1cm4gJ2NoZWNrYm94JzsgfVxuICAgIGlmIChzY2hlbWFUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKGhhc093bihzY2hlbWEsICdwcm9wZXJ0aWVzJykgfHwgaGFzT3duKHNjaGVtYSwgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJykpIHtcbiAgICAgICAgcmV0dXJuICdzZWN0aW9uJztcbiAgICAgIH1cbiAgICAgIC8vIFRPRE86IEZpZ3VyZSBvdXQgaG93IHRvIGhhbmRsZSBhZGRpdGlvbmFsUHJvcGVydGllc1xuICAgICAgaWYgKGhhc093bihzY2hlbWEsICckcmVmJykpIHsgcmV0dXJuICckcmVmJzsgfVxuICAgIH1cbiAgICBpZiAoc2NoZW1hVHlwZSA9PT0gJ2FycmF5Jykge1xuICAgICAgY29uc3QgaXRlbXNPYmplY3QgPSBKc29uUG9pbnRlci5nZXRGaXJzdChbXG4gICAgICAgIFtzY2hlbWEsICcvaXRlbXMnXSxcbiAgICAgICAgW3NjaGVtYSwgJy9hZGRpdGlvbmFsSXRlbXMnXVxuICAgICAgXSkgfHwge307XG4gICAgICByZXR1cm4gaGFzT3duKGl0ZW1zT2JqZWN0LCAnZW51bScpICYmIHNjaGVtYS5tYXhJdGVtcyAhPT0gMSA/XG4gICAgICAgIGNoZWNrSW5saW5lVHlwZSgnY2hlY2tib3hlcycsIHNjaGVtYSwgbGF5b3V0Tm9kZSkgOiAnYXJyYXknO1xuICAgIH1cbiAgICBpZiAoc2NoZW1hVHlwZSA9PT0gJ251bGwnKSB7IHJldHVybiAnbm9uZSc7IH1cbiAgICBpZiAoSnNvblBvaW50ZXIuaGFzKGxheW91dE5vZGUsICcvb3B0aW9ucy90aXRsZU1hcCcpIHx8XG4gICAgICBoYXNPd24oc2NoZW1hLCAnZW51bScpIHx8IGdldFRpdGxlTWFwRnJvbU9uZU9mKHNjaGVtYSwgbnVsbCwgdHJ1ZSlcbiAgICApIHsgcmV0dXJuICdzZWxlY3QnOyB9XG4gICAgaWYgKHNjaGVtYVR5cGUgPT09ICdudW1iZXInIHx8IHNjaGVtYVR5cGUgPT09ICdpbnRlZ2VyJykge1xuICAgICAgcmV0dXJuIChzY2hlbWFUeXBlID09PSAnaW50ZWdlcicgfHwgaGFzT3duKHNjaGVtYSwgJ211bHRpcGxlT2YnKSkgJiZcbiAgICAgICAgaGFzT3duKHNjaGVtYSwgJ21heGltdW0nKSAmJiBoYXNPd24oc2NoZW1hLCAnbWluaW11bScpID8gJ3JhbmdlJyA6IHNjaGVtYVR5cGU7XG4gICAgfVxuICAgIGlmIChzY2hlbWFUeXBlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ2NvbG9yJzogJ2NvbG9yJyxcbiAgICAgICAgJ2RhdGUnOiAnZGF0ZScsXG4gICAgICAgICdkYXRlLXRpbWUnOiAnZGF0ZXRpbWUtbG9jYWwnLFxuICAgICAgICAnZW1haWwnOiAnZW1haWwnLFxuICAgICAgICAndXJpJzogJ3VybCcsXG4gICAgICB9W3NjaGVtYS5mb3JtYXRdIHx8ICd0ZXh0JztcbiAgICB9XG4gIH1cbiAgaWYgKGhhc093bihzY2hlbWEsICckcmVmJykpIHsgcmV0dXJuICckcmVmJzsgfVxuICBpZiAoaXNBcnJheShzY2hlbWEub25lT2YpIHx8IGlzQXJyYXkoc2NoZW1hLmFueU9mKSkgeyByZXR1cm4gJ29uZS1vZic7IH1cbiAgY29uc29sZS5lcnJvcihgZ2V0SW5wdXRUeXBlIGVycm9yOiBVbmFibGUgdG8gZGV0ZXJtaW5lIGlucHV0IHR5cGUgZm9yICR7c2NoZW1hVHlwZX1gKTtcbiAgY29uc29sZS5lcnJvcignc2NoZW1hJywgc2NoZW1hKTtcbiAgaWYgKGxheW91dE5vZGUpIHsgY29uc29sZS5lcnJvcignbGF5b3V0Tm9kZScsIGxheW91dE5vZGUpOyB9XG4gIHJldHVybiAnbm9uZSc7XG59XG5cbi8qKlxuICogJ2NoZWNrSW5saW5lVHlwZScgZnVuY3Rpb25cbiAqXG4gKiBDaGVja3MgbGF5b3V0IGFuZCBzY2hlbWEgbm9kZXMgZm9yICdpbmxpbmU6IHRydWUnLCBhbmQgY29udmVydHNcbiAqICdyYWRpb3MnIG9yICdjaGVja2JveGVzJyB0byAncmFkaW9zLWlubGluZScgb3IgJ2NoZWNrYm94ZXMtaW5saW5lJ1xuICpcbiAqIEBwYXJhbSAgeyBzdHJpbmcgfSBjb250cm9sVHlwZSAtXG4gKiBAcGFyYW0gIHsgYW55IH0gc2NoZW1hIC1cbiAqIEBwYXJhbSAgeyBhbnkgPSBudWxsIH0gbGF5b3V0Tm9kZSAtXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrSW5saW5lVHlwZShjb250cm9sVHlwZSwgc2NoZW1hLCBsYXlvdXROb2RlOiBhbnkgPSBudWxsKSB7XG4gIGlmICghaXNTdHJpbmcoY29udHJvbFR5cGUpIHx8IChcbiAgICBjb250cm9sVHlwZS5zbGljZSgwLCA4KSAhPT0gJ2NoZWNrYm94JyAmJiBjb250cm9sVHlwZS5zbGljZSgwLCA1KSAhPT0gJ3JhZGlvJ1xuICApKSB7XG4gICAgcmV0dXJuIGNvbnRyb2xUeXBlO1xuICB9XG4gIGlmIChcbiAgICBKc29uUG9pbnRlci5nZXRGaXJzdChbXG4gICAgICBbbGF5b3V0Tm9kZSwgJy9pbmxpbmUnXSxcbiAgICAgIFtsYXlvdXROb2RlLCAnL29wdGlvbnMvaW5saW5lJ10sXG4gICAgICBbc2NoZW1hLCAnL2lubGluZSddLFxuICAgICAgW3NjaGVtYSwgJy94LXNjaGVtYS1mb3JtL2lubGluZSddLFxuICAgICAgW3NjaGVtYSwgJy94LXNjaGVtYS1mb3JtL29wdGlvbnMvaW5saW5lJ10sXG4gICAgICBbc2NoZW1hLCAnL3gtc2NoZW1hLWZvcm0vd2lkZ2V0L2lubGluZSddLFxuICAgICAgW3NjaGVtYSwgJy94LXNjaGVtYS1mb3JtL3dpZGdldC9jb21wb25lbnQvaW5saW5lJ10sXG4gICAgICBbc2NoZW1hLCAnL3gtc2NoZW1hLWZvcm0vd2lkZ2V0L2NvbXBvbmVudC9vcHRpb25zL2lubGluZSddLFxuICAgICAgW3NjaGVtYSwgJy93aWRnZXQvaW5saW5lJ10sXG4gICAgICBbc2NoZW1hLCAnL3dpZGdldC9jb21wb25lbnQvaW5saW5lJ10sXG4gICAgICBbc2NoZW1hLCAnL3dpZGdldC9jb21wb25lbnQvb3B0aW9ucy9pbmxpbmUnXSxcbiAgICBdKSA9PT0gdHJ1ZVxuICApIHtcbiAgICByZXR1cm4gY29udHJvbFR5cGUuc2xpY2UoMCwgNSkgPT09ICdyYWRpbycgP1xuICAgICAgJ3JhZGlvcy1pbmxpbmUnIDogJ2NoZWNrYm94ZXMtaW5saW5lJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29udHJvbFR5cGU7XG4gIH1cbn1cblxuLyoqXG4gKiAnaXNJbnB1dFJlcXVpcmVkJyBmdW5jdGlvblxuICpcbiAqIENoZWNrcyBhIEpTT04gU2NoZW1hIHRvIHNlZSBpZiBhbiBpdGVtIGlzIHJlcXVpcmVkXG4gKlxuICogQHBhcmFtICB7IGFueSB9IHNjaGVtYSAtIHRoZSBzY2hlbWEgdG8gY2hlY2tcbiAqIEBwYXJhbSAgeyBzdHJpbmcgfSBzY2hlbWFQb2ludGVyIC0gdGhlIHBvaW50ZXIgdG8gdGhlIGl0ZW0gdG8gY2hlY2tcbiAqIEByZXR1cm4geyBib29sZWFuIH0gLSB0cnVlIGlmIHRoZSBpdGVtIGlzIHJlcXVpcmVkLCBmYWxzZSBpZiBub3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW5wdXRSZXF1aXJlZChzY2hlbWEsIHNjaGVtYVBvaW50ZXIpIHtcbiAgaWYgKCFpc09iamVjdChzY2hlbWEpKSB7XG4gICAgY29uc29sZS5lcnJvcignaXNJbnB1dFJlcXVpcmVkIGVycm9yOiBJbnB1dCBzY2hlbWEgbXVzdCBiZSBhbiBvYmplY3QuJyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IGxpc3RQb2ludGVyQXJyYXkgPSBKc29uUG9pbnRlci5wYXJzZShzY2hlbWFQb2ludGVyKTtcbiAgaWYgKGlzQXJyYXkobGlzdFBvaW50ZXJBcnJheSkpIHtcbiAgICBpZiAoIWxpc3RQb2ludGVyQXJyYXkubGVuZ3RoKSB7IHJldHVybiBzY2hlbWEucmVxdWlyZWQgPT09IHRydWU7IH1cbiAgICBjb25zdCBrZXlOYW1lID0gbGlzdFBvaW50ZXJBcnJheS5wb3AoKTtcbiAgICBjb25zdCBuZXh0VG9MYXN0S2V5ID0gbGlzdFBvaW50ZXJBcnJheVtsaXN0UG9pbnRlckFycmF5Lmxlbmd0aCAtIDFdO1xuICAgIGlmIChbJ3Byb3BlcnRpZXMnLCAnYWRkaXRpb25hbFByb3BlcnRpZXMnLCAncGF0dGVyblByb3BlcnRpZXMnLCAnaXRlbXMnLCAnYWRkaXRpb25hbEl0ZW1zJ11cbiAgICAgIC5pbmNsdWRlcyhuZXh0VG9MYXN0S2V5KVxuICAgICkge1xuICAgICAgbGlzdFBvaW50ZXJBcnJheS5wb3AoKTtcbiAgICB9XG4gICAgY29uc3QgcGFyZW50U2NoZW1hID0gSnNvblBvaW50ZXIuZ2V0KHNjaGVtYSwgbGlzdFBvaW50ZXJBcnJheSkgfHwge307XG4gICAgaWYgKGlzQXJyYXkocGFyZW50U2NoZW1hLnJlcXVpcmVkKSkge1xuICAgICAgcmV0dXJuIHBhcmVudFNjaGVtYS5yZXF1aXJlZC5pbmNsdWRlcyhrZXlOYW1lKTtcbiAgICB9XG4gICAgaWYgKHBhcmVudFNjaGVtYS50eXBlID09PSAnYXJyYXknKSB7XG4gICAgICByZXR1cm4gaGFzT3duKHBhcmVudFNjaGVtYSwgJ21pbkl0ZW1zJykgJiZcbiAgICAgICAgaXNOdW1iZXIoa2V5TmFtZSkgJiZcbiAgICAgICAgK3BhcmVudFNjaGVtYS5taW5JdGVtcyA+ICtrZXlOYW1lO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogJ3VwZGF0ZUlucHV0T3B0aW9ucycgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0gIHsgYW55IH0gbGF5b3V0Tm9kZVxuICogQHBhcmFtICB7IGFueSB9IHNjaGVtYVxuICogQHBhcmFtICB7IGFueSB9IGpzZlxuICogQHJldHVybiB7IHZvaWQgfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlSW5wdXRPcHRpb25zKGxheW91dE5vZGUsIHNjaGVtYSwganNmKSB7XG4gIGlmICghaXNPYmplY3QobGF5b3V0Tm9kZSkgfHwgIWlzT2JqZWN0KGxheW91dE5vZGUub3B0aW9ucykpIHsgcmV0dXJuOyB9XG5cbiAgLy8gU2V0IGFsbCBvcHRpb24gdmFsdWVzIGluIGxheW91dE5vZGUub3B0aW9uc1xuICBjb25zdCBuZXdPcHRpb25zOiBhbnkgPSB7IH07XG4gIGNvbnN0IGZpeFVpS2V5cyA9IGtleSA9PiBrZXkuc2xpY2UoMCwgMykudG9Mb3dlckNhc2UoKSA9PT0gJ3VpOicgPyBrZXkuc2xpY2UoMykgOiBrZXk7XG4gIG1lcmdlRmlsdGVyZWRPYmplY3QobmV3T3B0aW9ucywganNmLmZvcm1PcHRpb25zLmRlZmF1dFdpZGdldE9wdGlvbnMsIFtdLCBmaXhVaUtleXMpO1xuICBbIFsgSnNvblBvaW50ZXIuZ2V0KHNjaGVtYSwgJy91aTp3aWRnZXQvb3B0aW9ucycpLCBbXSBdLFxuICAgIFsgSnNvblBvaW50ZXIuZ2V0KHNjaGVtYSwgJy91aTp3aWRnZXQnKSwgW10gXSxcbiAgICBbIHNjaGVtYSwgW1xuICAgICAgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJywgJ2FkZGl0aW9uYWxJdGVtcycsICdwcm9wZXJ0aWVzJywgJ2l0ZW1zJyxcbiAgICAgICdyZXF1aXJlZCcsICd0eXBlJywgJ3gtc2NoZW1hLWZvcm0nLCAnJHJlZidcbiAgICBdIF0sXG4gICAgWyBKc29uUG9pbnRlci5nZXQoc2NoZW1hLCAnL3gtc2NoZW1hLWZvcm0vb3B0aW9ucycpLCBbXSBdLFxuICAgIFsgSnNvblBvaW50ZXIuZ2V0KHNjaGVtYSwgJy94LXNjaGVtYS1mb3JtJyksIFsnaXRlbXMnLCAnb3B0aW9ucyddIF0sXG4gICAgWyBsYXlvdXROb2RlLCBbXG4gICAgICAnX2lkJywgJyRyZWYnLCAnYXJyYXlJdGVtJywgJ2FycmF5SXRlbVR5cGUnLCAnZGF0YVBvaW50ZXInLCAnZGF0YVR5cGUnLFxuICAgICAgJ2l0ZW1zJywgJ2tleScsICduYW1lJywgJ29wdGlvbnMnLCAncmVjdXJzaXZlUmVmZXJlbmNlJywgJ3R5cGUnLCAnd2lkZ2V0J1xuICAgIF0gXSxcbiAgICBbIGxheW91dE5vZGUub3B0aW9ucywgW10gXSxcbiAgXS5mb3JFYWNoKChbIG9iamVjdCwgZXhjbHVkZUtleXMgXSkgPT5cbiAgICBtZXJnZUZpbHRlcmVkT2JqZWN0KG5ld09wdGlvbnMsIG9iamVjdCwgZXhjbHVkZUtleXMsIGZpeFVpS2V5cylcbiAgKTtcbiAgaWYgKCFoYXNPd24obmV3T3B0aW9ucywgJ3RpdGxlTWFwJykpIHtcbiAgICBsZXQgbmV3VGl0bGVNYXA6IGFueSA9IG51bGw7XG4gICAgbmV3VGl0bGVNYXAgPSBnZXRUaXRsZU1hcEZyb21PbmVPZihzY2hlbWEsIG5ld09wdGlvbnMuZmxhdExpc3QpO1xuICAgIGlmIChuZXdUaXRsZU1hcCkgeyBuZXdPcHRpb25zLnRpdGxlTWFwID0gbmV3VGl0bGVNYXA7IH1cbiAgICBpZiAoIWhhc093bihuZXdPcHRpb25zLCAndGl0bGVNYXAnKSAmJiAhaGFzT3duKG5ld09wdGlvbnMsICdlbnVtJykgJiYgaGFzT3duKHNjaGVtYSwgJ2l0ZW1zJykpIHtcbiAgICAgIGlmIChKc29uUG9pbnRlci5oYXMoc2NoZW1hLCAnL2l0ZW1zL3RpdGxlTWFwJykpIHtcbiAgICAgICAgbmV3T3B0aW9ucy50aXRsZU1hcCA9IHNjaGVtYS5pdGVtcy50aXRsZU1hcDtcbiAgICAgIH0gZWxzZSBpZiAoSnNvblBvaW50ZXIuaGFzKHNjaGVtYSwgJy9pdGVtcy9lbnVtJykpIHtcbiAgICAgICAgbmV3T3B0aW9ucy5lbnVtID0gc2NoZW1hLml0ZW1zLmVudW07XG4gICAgICAgIGlmICghaGFzT3duKG5ld09wdGlvbnMsICdlbnVtTmFtZXMnKSAmJiBKc29uUG9pbnRlci5oYXMoc2NoZW1hLCAnL2l0ZW1zL2VudW1OYW1lcycpKSB7XG4gICAgICAgICAgbmV3T3B0aW9ucy5lbnVtTmFtZXMgPSBzY2hlbWEuaXRlbXMuZW51bU5hbWVzO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKEpzb25Qb2ludGVyLmhhcyhzY2hlbWEsICcvaXRlbXMvb25lT2YnKSkge1xuICAgICAgICBuZXdUaXRsZU1hcCA9IGdldFRpdGxlTWFwRnJvbU9uZU9mKHNjaGVtYS5pdGVtcywgbmV3T3B0aW9ucy5mbGF0TGlzdCk7XG4gICAgICAgIGlmIChuZXdUaXRsZU1hcCkgeyBuZXdPcHRpb25zLnRpdGxlTWFwID0gbmV3VGl0bGVNYXA7IH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBJZiBzY2hlbWEgdHlwZSBpcyBpbnRlZ2VyLCBlbmZvcmNlIGJ5IHNldHRpbmcgbXVsdGlwbGVPZiA9IDFcbiAgaWYgKHNjaGVtYS50eXBlID09PSAnaW50ZWdlcicgJiYgIWhhc1ZhbHVlKG5ld09wdGlvbnMubXVsdGlwbGVPZikpIHtcbiAgICBuZXdPcHRpb25zLm11bHRpcGxlT2YgPSAxO1xuICB9XG5cbiAgLy8gQ29weSBhbnkgdHlwZWFoZWFkIHdvcmQgbGlzdHMgdG8gb3B0aW9ucy50eXBlYWhlYWQuc291cmNlXG4gIGlmIChKc29uUG9pbnRlci5oYXMobmV3T3B0aW9ucywgJy9hdXRvY29tcGxldGUvc291cmNlJykpIHtcbiAgICBuZXdPcHRpb25zLnR5cGVhaGVhZCA9IG5ld09wdGlvbnMuYXV0b2NvbXBsZXRlO1xuICB9IGVsc2UgaWYgKEpzb25Qb2ludGVyLmhhcyhuZXdPcHRpb25zLCAnL3RhZ3NpbnB1dC9zb3VyY2UnKSkge1xuICAgIG5ld09wdGlvbnMudHlwZWFoZWFkID0gbmV3T3B0aW9ucy50YWdzaW5wdXQ7XG4gIH0gZWxzZSBpZiAoSnNvblBvaW50ZXIuaGFzKG5ld09wdGlvbnMsICcvdGFnc2lucHV0L3R5cGVhaGVhZC9zb3VyY2UnKSkge1xuICAgIG5ld09wdGlvbnMudHlwZWFoZWFkID0gbmV3T3B0aW9ucy50YWdzaW5wdXQudHlwZWFoZWFkO1xuICB9XG5cbiAgbGF5b3V0Tm9kZS5vcHRpb25zID0gbmV3T3B0aW9ucztcbn1cblxuLyoqXG4gKiAnZ2V0VGl0bGVNYXBGcm9tT25lT2YnIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtICB7IHNjaGVtYSB9IHNjaGVtYVxuICogQHBhcmFtICB7IGJvb2xlYW4gPSBudWxsIH0gZmxhdExpc3RcbiAqIEBwYXJhbSAgeyBib29sZWFuID0gZmFsc2UgfSB2YWxpZGF0ZU9ubHlcbiAqIEByZXR1cm4geyB2YWxpZGF0b3JzIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRpdGxlTWFwRnJvbU9uZU9mKFxuICBzY2hlbWE6IGFueSA9IHt9LCBmbGF0TGlzdDogYm9vbGVhbiA9IG51bGwsIHZhbGlkYXRlT25seSA9IGZhbHNlXG4pIHtcbiAgbGV0IHRpdGxlTWFwID0gbnVsbDtcbiAgY29uc3Qgb25lT2YgPSBzY2hlbWEub25lT2YgfHwgc2NoZW1hLmFueU9mIHx8IG51bGw7XG4gIGlmIChpc0FycmF5KG9uZU9mKSAmJiBvbmVPZi5ldmVyeShpdGVtID0+IGl0ZW0udGl0bGUpKSB7XG4gICAgaWYgKG9uZU9mLmV2ZXJ5KGl0ZW0gPT4gaXNBcnJheShpdGVtLmVudW0pICYmIGl0ZW0uZW51bS5sZW5ndGggPT09IDEpKSB7XG4gICAgICBpZiAodmFsaWRhdGVPbmx5KSB7IHJldHVybiB0cnVlOyB9XG4gICAgICB0aXRsZU1hcCA9IG9uZU9mLm1hcChpdGVtID0+ICh7IG5hbWU6IGl0ZW0udGl0bGUsIHZhbHVlOiBpdGVtLmVudW1bMF0gfSkpO1xuICAgIH0gZWxzZSBpZiAob25lT2YuZXZlcnkoaXRlbSA9PiBpdGVtLmNvbnN0KSkge1xuICAgICAgaWYgKHZhbGlkYXRlT25seSkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgdGl0bGVNYXAgPSBvbmVPZi5tYXAoaXRlbSA9PiAoeyBuYW1lOiBpdGVtLnRpdGxlLCB2YWx1ZTogaXRlbS5jb25zdCB9KSk7XG4gICAgfVxuXG4gICAgLy8gaWYgZmxhdExpc3QgIT09IGZhbHNlIGFuZCBzb21lIGl0ZW1zIGhhdmUgY29sb25zLCBtYWtlIGdyb3VwZWQgbWFwXG4gICAgaWYgKGZsYXRMaXN0ICE9PSBmYWxzZSAmJiAodGl0bGVNYXAgfHwgW10pXG4gICAgICAuZmlsdGVyKHRpdGxlID0+ICgodGl0bGUgfHwge30pLm5hbWUgfHwgJycpLmluZGV4T2YoJzogJykpLmxlbmd0aCA+IDFcbiAgICApIHtcblxuICAgICAgLy8gU3BsaXQgbmFtZSBvbiBmaXJzdCBjb2xvbiB0byBjcmVhdGUgZ3JvdXBlZCBtYXAgKG5hbWUgLT4gZ3JvdXA6IG5hbWUpXG4gICAgICBjb25zdCBuZXdUaXRsZU1hcCA9IHRpdGxlTWFwLm1hcCh0aXRsZSA9PiB7XG4gICAgICAgIGNvbnN0IFtncm91cCwgbmFtZV0gPSB0aXRsZS5uYW1lLnNwbGl0KC86ICguKykvKTtcbiAgICAgICAgcmV0dXJuIGdyb3VwICYmIG5hbWUgPyB7IC4uLnRpdGxlLCBncm91cCwgbmFtZSB9IDogdGl0bGU7XG4gICAgICB9KTtcblxuICAgICAgLy8gSWYgZmxhdExpc3QgPT09IHRydWUgb3IgYXQgbGVhc3Qgb25lIGdyb3VwIGhhcyBtdWx0aXBsZSBpdGVtcywgdXNlIGdyb3VwZWQgbWFwXG4gICAgICBpZiAoZmxhdExpc3QgPT09IHRydWUgfHwgbmV3VGl0bGVNYXAuc29tZSgodGl0bGUsIGluZGV4KSA9PiBpbmRleCAmJlxuICAgICAgICBoYXNPd24odGl0bGUsICdncm91cCcpICYmIHRpdGxlLmdyb3VwID09PSBuZXdUaXRsZU1hcFtpbmRleCAtIDFdLmdyb3VwXG4gICAgICApKSB7XG4gICAgICAgIHRpdGxlTWFwID0gbmV3VGl0bGVNYXA7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB2YWxpZGF0ZU9ubHkgPyBmYWxzZSA6IHRpdGxlTWFwO1xufVxuXG4vKipcbiAqICdnZXRDb250cm9sVmFsaWRhdG9ycycgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0geyBhbnkgfSBzY2hlbWFcbiAqIEByZXR1cm4geyB2YWxpZGF0b3JzIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnRyb2xWYWxpZGF0b3JzKHNjaGVtYSkge1xuICBpZiAoIWlzT2JqZWN0KHNjaGVtYSkpIHsgcmV0dXJuIG51bGw7IH1cbiAgY29uc3QgdmFsaWRhdG9yczogYW55ID0geyB9O1xuICBpZiAoaGFzT3duKHNjaGVtYSwgJ3R5cGUnKSkge1xuICAgIHN3aXRjaCAoc2NoZW1hLnR5cGUpIHtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIGZvckVhY2goWydwYXR0ZXJuJywgJ2Zvcm1hdCcsICdtaW5MZW5ndGgnLCAnbWF4TGVuZ3RoJ10sIChwcm9wKSA9PiB7XG4gICAgICAgICAgaWYgKGhhc093bihzY2hlbWEsIHByb3ApKSB7IHZhbGlkYXRvcnNbcHJvcF0gPSBbc2NoZW1hW3Byb3BdXTsgfVxuICAgICAgICB9KTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbnVtYmVyJzogY2FzZSAnaW50ZWdlcic6XG4gICAgICAgIGZvckVhY2goWydNaW5pbXVtJywgJ01heGltdW0nXSwgKHVjTGltaXQpID0+IHtcbiAgICAgICAgICBjb25zdCBlTGltaXQgPSAnZXhjbHVzaXZlJyArIHVjTGltaXQ7XG4gICAgICAgICAgY29uc3QgbGltaXQgPSB1Y0xpbWl0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgaWYgKGhhc093bihzY2hlbWEsIGxpbWl0KSkge1xuICAgICAgICAgICAgY29uc3QgZXhjbHVzaXZlID0gaGFzT3duKHNjaGVtYSwgZUxpbWl0KSAmJiBzY2hlbWFbZUxpbWl0XSA9PT0gdHJ1ZTtcbiAgICAgICAgICAgIHZhbGlkYXRvcnNbbGltaXRdID0gW3NjaGVtYVtsaW1pdF0sIGV4Y2x1c2l2ZV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZm9yRWFjaChbJ211bHRpcGxlT2YnLCAndHlwZSddLCAocHJvcCkgPT4ge1xuICAgICAgICAgIGlmIChoYXNPd24oc2NoZW1hLCBwcm9wKSkgeyB2YWxpZGF0b3JzW3Byb3BdID0gW3NjaGVtYVtwcm9wXV07IH1cbiAgICAgICAgfSk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGZvckVhY2goWydtaW5Qcm9wZXJ0aWVzJywgJ21heFByb3BlcnRpZXMnLCAnZGVwZW5kZW5jaWVzJ10sIChwcm9wKSA9PiB7XG4gICAgICAgICAgaWYgKGhhc093bihzY2hlbWEsIHByb3ApKSB7IHZhbGlkYXRvcnNbcHJvcF0gPSBbc2NoZW1hW3Byb3BdXTsgfVxuICAgICAgICB9KTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICBmb3JFYWNoKFsnbWluSXRlbXMnLCAnbWF4SXRlbXMnLCAndW5pcXVlSXRlbXMnXSwgKHByb3ApID0+IHtcbiAgICAgICAgICBpZiAoaGFzT3duKHNjaGVtYSwgcHJvcCkpIHsgdmFsaWRhdG9yc1twcm9wXSA9IFtzY2hlbWFbcHJvcF1dOyB9XG4gICAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGlmIChoYXNPd24oc2NoZW1hLCAnZW51bScpKSB7IHZhbGlkYXRvcnMuZW51bSA9IFtzY2hlbWEuZW51bV07IH1cbiAgcmV0dXJuIHZhbGlkYXRvcnM7XG59XG5cbi8qKlxuICogJ3Jlc29sdmVTY2hlbWFSZWZlcmVuY2VzJyBmdW5jdGlvblxuICpcbiAqIEZpbmQgYWxsICRyZWYgbGlua3MgaW4gc2NoZW1hIGFuZCBzYXZlIGxpbmtzIGFuZCByZWZlcmVuY2VkIHNjaGVtYXMgaW5cbiAqIHNjaGVtYVJlZkxpYnJhcnksIHNjaGVtYVJlY3Vyc2l2ZVJlZk1hcCwgYW5kIGRhdGFSZWN1cnNpdmVSZWZNYXBcbiAqXG4gKiBAcGFyYW0geyBhbnkgfSBzY2hlbWFcbiAqIEBwYXJhbSB7IGFueSB9IHNjaGVtYVJlZkxpYnJhcnlcbiAqIEBwYXJhbSB7IE1hcDxzdHJpbmcsIHN0cmluZz4gfSBzY2hlbWFSZWN1cnNpdmVSZWZNYXBcbiAqIEBwYXJhbSB7IE1hcDxzdHJpbmcsIHN0cmluZz4gfSBkYXRhUmVjdXJzaXZlUmVmTWFwXG4gKiBAcGFyYW0geyBNYXA8c3RyaW5nLCBudW1iZXI+IH0gYXJyYXlNYXBcbiAqIEByZXR1cm4geyBhbnkgfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVNjaGVtYVJlZmVyZW5jZXMoXG4gIHNjaGVtYSwgc2NoZW1hUmVmTGlicmFyeSwgc2NoZW1hUmVjdXJzaXZlUmVmTWFwLCBkYXRhUmVjdXJzaXZlUmVmTWFwLCBhcnJheU1hcFxuKSB7XG4gIGlmICghaXNPYmplY3Qoc2NoZW1hKSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ3Jlc29sdmVTY2hlbWFSZWZlcmVuY2VzIGVycm9yOiBzY2hlbWEgbXVzdCBiZSBhbiBvYmplY3QuJyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHJlZkxpbmtzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIGNvbnN0IHJlZk1hcFNldCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBjb25zdCByZWZNYXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICBjb25zdCByZWN1cnNpdmVSZWZNYXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICBjb25zdCByZWZMaWJyYXJ5OiBhbnkgPSB7fTtcblxuICAvLyBTZWFyY2ggc2NoZW1hIGZvciBhbGwgJHJlZiBsaW5rcywgYW5kIGJ1aWxkIGZ1bGwgcmVmTGlicmFyeVxuICBKc29uUG9pbnRlci5mb3JFYWNoRGVlcChzY2hlbWEsIChzdWJTY2hlbWEsIHN1YlNjaGVtYVBvaW50ZXIpID0+IHtcbiAgICBpZiAoaGFzT3duKHN1YlNjaGVtYSwgJyRyZWYnKSAmJiBpc1N0cmluZyhzdWJTY2hlbWFbJyRyZWYnXSkpIHtcbiAgICAgIGNvbnN0IHJlZlBvaW50ZXIgPSBKc29uUG9pbnRlci5jb21waWxlKHN1YlNjaGVtYVsnJHJlZiddKTtcbiAgICAgIHJlZkxpbmtzLmFkZChyZWZQb2ludGVyKTtcbiAgICAgIHJlZk1hcFNldC5hZGQoc3ViU2NoZW1hUG9pbnRlciArICd+ficgKyByZWZQb2ludGVyKTtcbiAgICAgIHJlZk1hcC5zZXQoc3ViU2NoZW1hUG9pbnRlciwgcmVmUG9pbnRlcik7XG4gICAgfVxuICB9KTtcbiAgcmVmTGlua3MuZm9yRWFjaChyZWYgPT4gcmVmTGlicmFyeVtyZWZdID0gZ2V0U3ViU2NoZW1hKHNjaGVtYSwgcmVmKSk7XG5cbiAgLy8gRm9sbG93IGFsbCByZWYgbGlua3MgYW5kIHNhdmUgaW4gcmVmTWFwU2V0LFxuICAvLyB0byBmaW5kIGFueSBtdWx0aS1saW5rIHJlY3Vyc2l2ZSByZWZlcm5jZXNcbiAgbGV0IGNoZWNrUmVmTGlua3MgPSB0cnVlO1xuICB3aGlsZSAoY2hlY2tSZWZMaW5rcykge1xuICAgIGNoZWNrUmVmTGlua3MgPSBmYWxzZTtcbiAgICBBcnJheS5mcm9tKHJlZk1hcCkuZm9yRWFjaCgoW2Zyb21SZWYxLCB0b1JlZjFdKSA9PiBBcnJheS5mcm9tKHJlZk1hcClcbiAgICAgIC5maWx0ZXIoKFtmcm9tUmVmMiwgdG9SZWYyXSkgPT5cbiAgICAgICAgSnNvblBvaW50ZXIuaXNTdWJQb2ludGVyKHRvUmVmMSwgZnJvbVJlZjIsIHRydWUpICYmXG4gICAgICAgICFKc29uUG9pbnRlci5pc1N1YlBvaW50ZXIodG9SZWYyLCB0b1JlZjEsIHRydWUpICYmXG4gICAgICAgICFyZWZNYXBTZXQuaGFzKGZyb21SZWYxICsgZnJvbVJlZjIuc2xpY2UodG9SZWYxLmxlbmd0aCkgKyAnfn4nICsgdG9SZWYyKVxuICAgICAgKVxuICAgICAgLmZvckVhY2goKFtmcm9tUmVmMiwgdG9SZWYyXSkgPT4ge1xuICAgICAgICByZWZNYXBTZXQuYWRkKGZyb21SZWYxICsgZnJvbVJlZjIuc2xpY2UodG9SZWYxLmxlbmd0aCkgKyAnfn4nICsgdG9SZWYyKTtcbiAgICAgICAgY2hlY2tSZWZMaW5rcyA9IHRydWU7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvLyBCdWlsZCBmdWxsIHJlY3Vyc2l2ZVJlZk1hcFxuICAvLyBGaXJzdCBwYXNzIC0gc2F2ZSBhbGwgaW50ZXJuYWxseSByZWN1cnNpdmUgcmVmcyBmcm9tIHJlZk1hcFNldFxuICBBcnJheS5mcm9tKHJlZk1hcFNldClcbiAgICAubWFwKHJlZkxpbmsgPT4gcmVmTGluay5zcGxpdCgnfn4nKSlcbiAgICAuZmlsdGVyKChbZnJvbVJlZiwgdG9SZWZdKSA9PiBKc29uUG9pbnRlci5pc1N1YlBvaW50ZXIodG9SZWYsIGZyb21SZWYpKVxuICAgIC5mb3JFYWNoKChbZnJvbVJlZiwgdG9SZWZdKSA9PiByZWN1cnNpdmVSZWZNYXAuc2V0KGZyb21SZWYsIHRvUmVmKSk7XG4gIC8vIFNlY29uZCBwYXNzIC0gY3JlYXRlIHJlY3Vyc2l2ZSB2ZXJzaW9ucyBvZiBhbnkgb3RoZXIgcmVmcyB0aGF0IGxpbmsgdG8gcmVjdXJzaXZlIHJlZnNcbiAgQXJyYXkuZnJvbShyZWZNYXApXG4gICAgLmZpbHRlcigoW2Zyb21SZWYxLCB0b1JlZjFdKSA9PiBBcnJheS5mcm9tKHJlY3Vyc2l2ZVJlZk1hcC5rZXlzKCkpXG4gICAgICAuZXZlcnkoZnJvbVJlZjIgPT4gIUpzb25Qb2ludGVyLmlzU3ViUG9pbnRlcihmcm9tUmVmMSwgZnJvbVJlZjIsIHRydWUpKVxuICAgIClcbiAgICAuZm9yRWFjaCgoW2Zyb21SZWYxLCB0b1JlZjFdKSA9PiBBcnJheS5mcm9tKHJlY3Vyc2l2ZVJlZk1hcClcbiAgICAgIC5maWx0ZXIoKFtmcm9tUmVmMiwgdG9SZWYyXSkgPT5cbiAgICAgICAgIXJlY3Vyc2l2ZVJlZk1hcC5oYXMoZnJvbVJlZjEgKyBmcm9tUmVmMi5zbGljZSh0b1JlZjEubGVuZ3RoKSkgJiZcbiAgICAgICAgSnNvblBvaW50ZXIuaXNTdWJQb2ludGVyKHRvUmVmMSwgZnJvbVJlZjIsIHRydWUpICYmXG4gICAgICAgICFKc29uUG9pbnRlci5pc1N1YlBvaW50ZXIodG9SZWYxLCBmcm9tUmVmMSwgdHJ1ZSlcbiAgICAgIClcbiAgICAgIC5mb3JFYWNoKChbZnJvbVJlZjIsIHRvUmVmMl0pID0+IHJlY3Vyc2l2ZVJlZk1hcC5zZXQoXG4gICAgICAgIGZyb21SZWYxICsgZnJvbVJlZjIuc2xpY2UodG9SZWYxLmxlbmd0aCksXG4gICAgICAgIGZyb21SZWYxICsgdG9SZWYyLnNsaWNlKHRvUmVmMS5sZW5ndGgpXG4gICAgICApKVxuICAgICk7XG5cbiAgLy8gQ3JlYXRlIGNvbXBpbGVkIHNjaGVtYSBieSByZXBsYWNpbmcgYWxsIG5vbi1yZWN1cnNpdmUgJHJlZiBsaW5rcyB3aXRoXG4gIC8vIHRoaWVpciBsaW5rZWQgc2NoZW1hcyBhbmQsIHdoZXJlIHBvc3NpYmxlLCBjb21iaW5pbmcgc2NoZW1hcyBpbiBhbGxPZiBhcnJheXMuXG4gIGxldCBjb21waWxlZFNjaGVtYSA9IHsgLi4uc2NoZW1hIH07XG4gIGRlbGV0ZSBjb21waWxlZFNjaGVtYS5kZWZpbml0aW9ucztcbiAgY29tcGlsZWRTY2hlbWEgPVxuICAgIGdldFN1YlNjaGVtYShjb21waWxlZFNjaGVtYSwgJycsIHJlZkxpYnJhcnksIHJlY3Vyc2l2ZVJlZk1hcCk7XG5cbiAgLy8gTWFrZSBzdXJlIGFsbCByZW1haW5pbmcgc2NoZW1hICRyZWZzIGFyZSByZWN1cnNpdmUsIGFuZCBidWlsZCBmaW5hbFxuICAvLyBzY2hlbWFSZWZMaWJyYXJ5LCBzY2hlbWFSZWN1cnNpdmVSZWZNYXAsIGRhdGFSZWN1cnNpdmVSZWZNYXAsICYgYXJyYXlNYXBcbiAgSnNvblBvaW50ZXIuZm9yRWFjaERlZXAoY29tcGlsZWRTY2hlbWEsIChzdWJTY2hlbWEsIHN1YlNjaGVtYVBvaW50ZXIpID0+IHtcbiAgICBpZiAoaXNTdHJpbmcoc3ViU2NoZW1hWyckcmVmJ10pKSB7XG4gICAgICBsZXQgcmVmUG9pbnRlciA9IEpzb25Qb2ludGVyLmNvbXBpbGUoc3ViU2NoZW1hWyckcmVmJ10pO1xuICAgICAgaWYgKCFKc29uUG9pbnRlci5pc1N1YlBvaW50ZXIocmVmUG9pbnRlciwgc3ViU2NoZW1hUG9pbnRlciwgdHJ1ZSkpIHtcbiAgICAgICAgcmVmUG9pbnRlciA9IHJlbW92ZVJlY3Vyc2l2ZVJlZmVyZW5jZXMoc3ViU2NoZW1hUG9pbnRlciwgcmVjdXJzaXZlUmVmTWFwKTtcbiAgICAgICAgSnNvblBvaW50ZXIuc2V0KGNvbXBpbGVkU2NoZW1hLCBzdWJTY2hlbWFQb2ludGVyLCB7ICRyZWY6IGAjJHtyZWZQb2ludGVyfWAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoIWhhc093bihzY2hlbWFSZWZMaWJyYXJ5LCAncmVmUG9pbnRlcicpKSB7XG4gICAgICAgIHNjaGVtYVJlZkxpYnJhcnlbcmVmUG9pbnRlcl0gPSAhcmVmUG9pbnRlci5sZW5ndGggPyBjb21waWxlZFNjaGVtYSA6XG4gICAgICAgICAgZ2V0U3ViU2NoZW1hKGNvbXBpbGVkU2NoZW1hLCByZWZQb2ludGVyLCBzY2hlbWFSZWZMaWJyYXJ5LCByZWN1cnNpdmVSZWZNYXApO1xuICAgICAgfVxuICAgICAgaWYgKCFzY2hlbWFSZWN1cnNpdmVSZWZNYXAuaGFzKHN1YlNjaGVtYVBvaW50ZXIpKSB7XG4gICAgICAgIHNjaGVtYVJlY3Vyc2l2ZVJlZk1hcC5zZXQoc3ViU2NoZW1hUG9pbnRlciwgcmVmUG9pbnRlcik7XG4gICAgICB9XG4gICAgICBjb25zdCBmcm9tRGF0YVJlZiA9IEpzb25Qb2ludGVyLnRvRGF0YVBvaW50ZXIoc3ViU2NoZW1hUG9pbnRlciwgY29tcGlsZWRTY2hlbWEpO1xuICAgICAgaWYgKCFkYXRhUmVjdXJzaXZlUmVmTWFwLmhhcyhmcm9tRGF0YVJlZikpIHtcbiAgICAgICAgY29uc3QgdG9EYXRhUmVmID0gSnNvblBvaW50ZXIudG9EYXRhUG9pbnRlcihyZWZQb2ludGVyLCBjb21waWxlZFNjaGVtYSk7XG4gICAgICAgIGRhdGFSZWN1cnNpdmVSZWZNYXAuc2V0KGZyb21EYXRhUmVmLCB0b0RhdGFSZWYpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc3ViU2NoZW1hLnR5cGUgPT09ICdhcnJheScgJiZcbiAgICAgIChoYXNPd24oc3ViU2NoZW1hLCAnaXRlbXMnKSB8fCBoYXNPd24oc3ViU2NoZW1hLCAnYWRkaXRpb25hbEl0ZW1zJykpXG4gICAgKSB7XG4gICAgICBjb25zdCBkYXRhUG9pbnRlciA9IEpzb25Qb2ludGVyLnRvRGF0YVBvaW50ZXIoc3ViU2NoZW1hUG9pbnRlciwgY29tcGlsZWRTY2hlbWEpO1xuICAgICAgaWYgKCFhcnJheU1hcC5oYXMoZGF0YVBvaW50ZXIpKSB7XG4gICAgICAgIGNvbnN0IHR1cGxlSXRlbXMgPSBpc0FycmF5KHN1YlNjaGVtYS5pdGVtcykgPyBzdWJTY2hlbWEuaXRlbXMubGVuZ3RoIDogMDtcbiAgICAgICAgYXJyYXlNYXAuc2V0KGRhdGFQb2ludGVyLCB0dXBsZUl0ZW1zKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHRydWUpO1xuICByZXR1cm4gY29tcGlsZWRTY2hlbWE7XG59XG5cbi8qKlxuICogJ2dldFN1YlNjaGVtYScgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0gIHsgYW55IH0gc2NoZW1hXG4gKiBAcGFyYW0gIHsgUG9pbnRlciB9IHBvaW50ZXJcbiAqIEBwYXJhbSAgeyBvYmplY3QgfSBzY2hlbWFSZWZMaWJyYXJ5XG4gKiBAcGFyYW0gIHsgTWFwPHN0cmluZywgc3RyaW5nPiB9IHNjaGVtYVJlY3Vyc2l2ZVJlZk1hcFxuICogQHBhcmFtICB7IHN0cmluZ1tdID0gW10gfSB1c2VkUG9pbnRlcnNcbiAqIEByZXR1cm4geyBhbnkgfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3ViU2NoZW1hKFxuICBzY2hlbWEsIHBvaW50ZXIsIHNjaGVtYVJlZkxpYnJhcnkgPSBudWxsLFxuICBzY2hlbWFSZWN1cnNpdmVSZWZNYXA6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBudWxsLCB1c2VkUG9pbnRlcnM6IHN0cmluZ1tdID0gW11cbikge1xuICBpZiAoIXNjaGVtYVJlZkxpYnJhcnkgfHwgIXNjaGVtYVJlY3Vyc2l2ZVJlZk1hcCkge1xuICAgIHJldHVybiBKc29uUG9pbnRlci5nZXRDb3B5KHNjaGVtYSwgcG9pbnRlcik7XG4gIH1cbiAgaWYgKHR5cGVvZiBwb2ludGVyICE9PSAnc3RyaW5nJykgeyBwb2ludGVyID0gSnNvblBvaW50ZXIuY29tcGlsZShwb2ludGVyKTsgfVxuICB1c2VkUG9pbnRlcnMgPSBbIC4uLnVzZWRQb2ludGVycywgcG9pbnRlciBdO1xuICBsZXQgbmV3U2NoZW1hOiBhbnkgPSBudWxsO1xuICBpZiAocG9pbnRlciA9PT0gJycpIHtcbiAgICBuZXdTY2hlbWEgPSBfLmNsb25lRGVlcChzY2hlbWEpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHNob3J0UG9pbnRlciA9IHJlbW92ZVJlY3Vyc2l2ZVJlZmVyZW5jZXMocG9pbnRlciwgc2NoZW1hUmVjdXJzaXZlUmVmTWFwKTtcbiAgICBpZiAoc2hvcnRQb2ludGVyICE9PSBwb2ludGVyKSB7IHVzZWRQb2ludGVycyA9IFsgLi4udXNlZFBvaW50ZXJzLCBzaG9ydFBvaW50ZXIgXTsgfVxuICAgIG5ld1NjaGVtYSA9IEpzb25Qb2ludGVyLmdldEZpcnN0Q29weShbXG4gICAgICBbc2NoZW1hUmVmTGlicmFyeSwgW3Nob3J0UG9pbnRlcl1dLFxuICAgICAgW3NjaGVtYSwgcG9pbnRlcl0sXG4gICAgICBbc2NoZW1hLCBzaG9ydFBvaW50ZXJdXG4gICAgXSk7XG4gIH1cbiAgcmV0dXJuIEpzb25Qb2ludGVyLmZvckVhY2hEZWVwQ29weShuZXdTY2hlbWEsIChzdWJTY2hlbWEsIHN1YlBvaW50ZXIpID0+IHtcbiAgICBpZiAoaXNPYmplY3Qoc3ViU2NoZW1hKSkge1xuXG4gICAgICAvLyBSZXBsYWNlIG5vbi1yZWN1cnNpdmUgJHJlZiBsaW5rcyB3aXRoIHJlZmVyZW5jZWQgc2NoZW1hc1xuICAgICAgaWYgKGlzU3RyaW5nKHN1YlNjaGVtYS4kcmVmKSkge1xuICAgICAgICBjb25zdCByZWZQb2ludGVyID0gSnNvblBvaW50ZXIuY29tcGlsZShzdWJTY2hlbWEuJHJlZik7XG4gICAgICAgIGlmIChyZWZQb2ludGVyLmxlbmd0aCAmJiB1c2VkUG9pbnRlcnMuZXZlcnkocHRyID0+XG4gICAgICAgICAgIUpzb25Qb2ludGVyLmlzU3ViUG9pbnRlcihyZWZQb2ludGVyLCBwdHIsIHRydWUpXG4gICAgICAgICkpIHtcbiAgICAgICAgICBjb25zdCByZWZTY2hlbWEgPSBnZXRTdWJTY2hlbWEoXG4gICAgICAgICAgICBzY2hlbWEsIHJlZlBvaW50ZXIsIHNjaGVtYVJlZkxpYnJhcnksIHNjaGVtYVJlY3Vyc2l2ZVJlZk1hcCwgdXNlZFBvaW50ZXJzXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoc3ViU2NoZW1hKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiByZWZTY2hlbWE7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGV4dHJhS2V5cyA9IHsgLi4uc3ViU2NoZW1hIH07XG4gICAgICAgICAgICBkZWxldGUgZXh0cmFLZXlzLiRyZWY7XG4gICAgICAgICAgICByZXR1cm4gbWVyZ2VTY2hlbWFzKHJlZlNjaGVtYSwgZXh0cmFLZXlzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVE9ETzogQ29udmVydCBzY2hlbWFzIHdpdGggJ3R5cGUnIGFycmF5cyB0byAnb25lT2YnXG5cbiAgICAgIC8vIENvbWJpbmUgYWxsT2Ygc3ViU2NoZW1hc1xuICAgICAgaWYgKGlzQXJyYXkoc3ViU2NoZW1hLmFsbE9mKSkgeyByZXR1cm4gY29tYmluZUFsbE9mKHN1YlNjaGVtYSk7IH1cblxuICAgICAgLy8gRml4IGluY29ycmVjdGx5IHBsYWNlZCBhcnJheSBvYmplY3QgcmVxdWlyZWQgbGlzdHNcbiAgICAgIGlmIChzdWJTY2hlbWEudHlwZSA9PT0gJ2FycmF5JyAmJiBpc0FycmF5KHN1YlNjaGVtYS5yZXF1aXJlZCkpIHtcbiAgICAgICAgcmV0dXJuIGZpeFJlcXVpcmVkQXJyYXlQcm9wZXJ0aWVzKHN1YlNjaGVtYSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdWJTY2hlbWE7XG4gIH0sIHRydWUsIDxzdHJpbmc+cG9pbnRlcik7XG59XG5cbi8qKlxuICogJ2NvbWJpbmVBbGxPZicgZnVuY3Rpb25cbiAqXG4gKiBBdHRlbXB0IHRvIGNvbnZlcnQgYW4gYWxsT2Ygc2NoZW1hIG9iamVjdCBpbnRvXG4gKiBhIG5vbi1hbGxPZiBzY2hlbWEgb2JqZWN0IHdpdGggZXF1aXZhbGVudCBydWxlcy5cbiAqXG4gKiBAcGFyYW0gIHsgYW55IH0gc2NoZW1hIC0gYWxsT2Ygc2NoZW1hIG9iamVjdFxuICogQHJldHVybiB7IGFueSB9IC0gY29udmVydGVkIHNjaGVtYSBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVBbGxPZihzY2hlbWEpIHtcbiAgaWYgKCFpc09iamVjdChzY2hlbWEpIHx8ICFpc0FycmF5KHNjaGVtYS5hbGxPZikpIHsgcmV0dXJuIHNjaGVtYTsgfVxuICBsZXQgbWVyZ2VkU2NoZW1hID0gbWVyZ2VTY2hlbWFzKC4uLnNjaGVtYS5hbGxPZik7XG4gIGlmIChPYmplY3Qua2V5cyhzY2hlbWEpLmxlbmd0aCA+IDEpIHtcbiAgICBjb25zdCBleHRyYUtleXMgPSB7IC4uLnNjaGVtYSB9O1xuICAgIGRlbGV0ZSBleHRyYUtleXMuYWxsT2Y7XG4gICAgbWVyZ2VkU2NoZW1hID0gbWVyZ2VTY2hlbWFzKG1lcmdlZFNjaGVtYSwgZXh0cmFLZXlzKTtcbiAgfVxuICByZXR1cm4gbWVyZ2VkU2NoZW1hO1xufVxuXG4vKipcbiAqICdmaXhSZXF1aXJlZEFycmF5UHJvcGVydGllcycgZnVuY3Rpb25cbiAqXG4gKiBGaXhlcyBhbiBpbmNvcnJlY3RseSBwbGFjZWQgcmVxdWlyZWQgbGlzdCBpbnNpZGUgYW4gYXJyYXkgc2NoZW1hLCBieSBtb3ZpbmdcbiAqIGl0IGludG8gaXRlbXMucHJvcGVydGllcyBvciBhZGRpdGlvbmFsSXRlbXMucHJvcGVydGllcywgd2hlcmUgaXQgYmVsb25ncy5cbiAqXG4gKiBAcGFyYW0gIHsgYW55IH0gc2NoZW1hIC0gYWxsT2Ygc2NoZW1hIG9iamVjdFxuICogQHJldHVybiB7IGFueSB9IC0gY29udmVydGVkIHNjaGVtYSBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpeFJlcXVpcmVkQXJyYXlQcm9wZXJ0aWVzKHNjaGVtYSkge1xuICBpZiAoc2NoZW1hLnR5cGUgPT09ICdhcnJheScgJiYgaXNBcnJheShzY2hlbWEucmVxdWlyZWQpKSB7XG4gICAgY29uc3QgaXRlbXNPYmplY3QgPSBoYXNPd24oc2NoZW1hLml0ZW1zLCAncHJvcGVydGllcycpID8gJ2l0ZW1zJyA6XG4gICAgICBoYXNPd24oc2NoZW1hLmFkZGl0aW9uYWxJdGVtcywgJ3Byb3BlcnRpZXMnKSA/ICdhZGRpdGlvbmFsSXRlbXMnIDogbnVsbDtcbiAgICBpZiAoaXRlbXNPYmplY3QgJiYgIWhhc093bihzY2hlbWFbaXRlbXNPYmplY3RdLCAncmVxdWlyZWQnKSAmJiAoXG4gICAgICBoYXNPd24oc2NoZW1hW2l0ZW1zT2JqZWN0XSwgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJykgfHxcbiAgICAgIHNjaGVtYS5yZXF1aXJlZC5ldmVyeShrZXkgPT4gaGFzT3duKHNjaGVtYVtpdGVtc09iamVjdF0ucHJvcGVydGllcywga2V5KSlcbiAgICApKSB7XG4gICAgICBzY2hlbWEgPSBfLmNsb25lRGVlcChzY2hlbWEpO1xuICAgICAgc2NoZW1hW2l0ZW1zT2JqZWN0XS5yZXF1aXJlZCA9IHNjaGVtYS5yZXF1aXJlZDtcbiAgICAgIGRlbGV0ZSBzY2hlbWEucmVxdWlyZWQ7XG4gICAgfVxuICB9XG4gIHJldHVybiBzY2hlbWE7XG59XG4iXX0=