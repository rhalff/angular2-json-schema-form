import * as tslib_1 from "tslib";
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { hasValue, inArray, isArray, isEmpty, isDate, isObject, isDefined, isPrimitive, toJavaScriptType, toSchemaType } from './validator.functions';
import { forEach, hasOwn } from './utility.functions';
import { JsonPointer } from './jsonpointer.functions';
import { JsonValidators } from './json.validators';
import { getControlValidators, removeRecursiveReferences } from './json-schema.functions';
/**
 * FormGroup function library:
 *
 * buildFormGroupTemplate:  Builds a FormGroupTemplate from schema
 *
 * buildFormGroup:          Builds an Angular FormGroup from a FormGroupTemplate
 *
 * mergeValues:
 *
 * setRequiredFields:
 *
 * formatFormData:
 *
 * getControl:
 *
 * ---- TODO: ----
 * TODO: add buildFormGroupTemplateFromLayout function
 * buildFormGroupTemplateFromLayout: Builds a FormGroupTemplate from a form layout
 */
/**
 * 'buildFormGroupTemplate' function
 *
 * Builds a template for an Angular FormGroup from a JSON Schema.
 *
 * TODO: add support for pattern properties
 * https://spacetelescope.github.io/understanding-json-schema/reference/object.html
 *
 * @param  {any} jsf -
 * @param  {any = null} nodeValue -
 * @param  {boolean = true} mapArrays -
 * @param  {string = ''} schemaPointer -
 * @param  {string = ''} dataPointer -
 * @param  {any = ''} templatePointer -
 * @return {any} -
 */
export function buildFormGroupTemplate(jsf, nodeValue, setValues, schemaPointer, dataPointer, templatePointer) {
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
    // TODO: If nodeValue still not set, check layout for default value
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
                            propertyKeys_1.splice.apply(propertyKeys_1, tslib_1.__spread([i, 1], unnamedKeys));
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
                                null : _.cloneDeep(jsf.templateRefLibrary[itemRefPointer]));
                    }
                }
                // If 'additionalItems' is an object = additional list items (after tuple items)
                if (schema.items.length < maxItems && isObject(schema.additionalItems)) {
                    additionalItemsPointer = schemaPointer + '/additionalItems';
                }
                // If 'items' is an object = list items only (no tuple items)
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
                // const itemOptions = jsf.dataMap.get(itemRefPointer) || new Map();
                var itemOptions = nodeOptions;
                if (!itemRecursive || hasOwn(validators, 'required')) {
                    var arrayLength = Math.min(Math.max(itemRecursive ? 0 :
                        (itemOptions.get('tupleItems') + itemOptions.get('listItems')) || 0, isArray(nodeValue) ? nodeValue.length : 0), maxItems);
                    for (var i = controls.length; i < arrayLength; i++) {
                        controls.push(isArray(nodeValue) ?
                            buildFormGroupTemplate(jsf, nodeValue[i], setValues, schemaRefPointer, dataPointer + '/-', templatePointer + '/controls/-') :
                            itemRecursive ?
                                null : _.cloneDeep(jsf.templateRefLibrary[itemRefPointer]));
                    }
                }
            }
            return { controlType: controlType, controls: controls, validators: validators };
        case '$ref':
            var schemaRef = JsonPointer.compile(schema.$ref);
            var dataRef = JsonPointer.toDataPointer(schemaRef, schema);
            var refPointer = removeRecursiveReferences(dataRef, jsf.dataRecursiveRefMap, jsf.arrayMap);
            if (refPointer && !hasOwn(jsf.templateRefLibrary, refPointer)) {
                // Set to null first to prevent recursive reference from causing endless loop
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
/**
 * 'buildFormGroup' function
 *
 * @param {any} template -
 * @return {AbstractControl}
*/
export function buildFormGroup(template) {
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
                return new FormGroup(groupControls_1, validatorFn);
            case 'FormArray':
                return new FormArray(_.filter(_.map(template.controls, function (controls) { return buildFormGroup(controls); })), validatorFn);
            case 'FormControl':
                return new FormControl(template.value, validatorFns);
        }
    }
    return null;
}
/**
 * 'mergeValues' function
 *
 * @param  {any[]} ...valuesToMerge - Multiple values to merge
 * @return {any} - Merged values
 */
export function mergeValues() {
    var valuesToMerge = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        valuesToMerge[_i] = arguments[_i];
    }
    var mergedValues = null;
    try {
        for (var valuesToMerge_1 = tslib_1.__values(valuesToMerge), valuesToMerge_1_1 = valuesToMerge_1.next(); !valuesToMerge_1_1.done; valuesToMerge_1_1 = valuesToMerge_1.next()) {
            var currentValue = valuesToMerge_1_1.value;
            if (!isEmpty(currentValue)) {
                if (typeof currentValue === 'object' &&
                    (isEmpty(mergedValues) || typeof mergedValues !== 'object')) {
                    if (isArray(currentValue)) {
                        mergedValues = tslib_1.__spread(currentValue);
                    }
                    else if (isObject(currentValue)) {
                        mergedValues = tslib_1.__assign({}, currentValue);
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
                        for (var currentValue_1 = tslib_1.__values(currentValue), currentValue_1_1 = currentValue_1.next(); !currentValue_1_1.done; currentValue_1_1 = currentValue_1.next()) {
                            var value = currentValue_1_1.value;
                            newValues.push(mergeValues(mergedValues, value));
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (currentValue_1_1 && !currentValue_1_1.done && (_a = currentValue_1.return)) _a.call(currentValue_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    mergedValues = newValues;
                }
                else if (isArray(mergedValues) && isObject(currentValue)) {
                    var newValues = [];
                    try {
                        for (var mergedValues_1 = tslib_1.__values(mergedValues), mergedValues_1_1 = mergedValues_1.next(); !mergedValues_1_1.done; mergedValues_1_1 = mergedValues_1.next()) {
                            var value = mergedValues_1_1.value;
                            newValues.push(mergeValues(value, currentValue));
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (mergedValues_1_1 && !mergedValues_1_1.done && (_b = mergedValues_1.return)) _b.call(mergedValues_1);
                        }
                        finally { if (e_2) throw e_2.error; }
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
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (valuesToMerge_1_1 && !valuesToMerge_1_1.done && (_c = valuesToMerge_1.return)) _c.call(valuesToMerge_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return mergedValues;
    var e_3, _c, e_1, _a, e_2, _b;
}
/**
 * 'setRequiredFields' function
 *
 * @param {schema} schema - JSON Schema
 * @param {object} formControlTemplate - Form Control Template object
 * @return {boolean} - true if any fields have been set to required, false if not
 */
export function setRequiredFields(schema, formControlTemplate) {
    var fieldsRequired = false;
    if (hasOwn(schema, 'required') && !isEmpty(schema.required)) {
        fieldsRequired = true;
        var requiredArray = isArray(schema.required) ? schema.required : [schema.required];
        requiredArray = forEach(requiredArray, function (key) { return JsonPointer.set(formControlTemplate, '/' + key + '/validators/required', []); });
    }
    return fieldsRequired;
    // TODO: Add support for patternProperties
    // https://spacetelescope.github.io/understanding-json-schema/reference/object.html#pattern-properties
}
/**
 * 'formatFormData' function
 *
 * @param {any} formData - Angular FormGroup data object
 * @param {Map<string, any>} dataMap -
 * @param {Map<string, string>} recursiveRefMap -
 * @param {Map<string, number>} arrayMap -
 * @param {boolean = false} fixErrors - if TRUE, tries to fix data
 * @return {any} - formatted data object
 */
export function formatFormData(formData, dataMap, recursiveRefMap, arrayMap, returnEmptyFields, fixErrors) {
    if (returnEmptyFields === void 0) { returnEmptyFields = false; }
    if (fixErrors === void 0) { fixErrors = false; }
    if (formData === null || typeof formData !== 'object') {
        return formData;
    }
    var formattedData = isArray(formData) ? [] : {};
    JsonPointer.forEachDeep(formData, function (value, dataPointer) {
        // If returnEmptyFields === true,
        // add empty arrays and objects to all allowed keys
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
                    // If returnEmptyFields === false,
                    // only add empty arrays and objects to required keys
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
                // Finish incomplete 'date-time' entries
                if (dataMap.get(genericPointer_1).get('schemaFormat') === 'date-time') {
                    // "2000-03-14T01:59:26.535" -> "2000-03-14T01:59:26.535Z" (add "Z")
                    if (/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s][0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?$/i.test(value)) {
                        JsonPointer.set(formattedData, dataPointer, value + "Z");
                        // "2000-03-14T01:59" -> "2000-03-14T01:59:00Z" (add ":00Z")
                    }
                    else if (/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s][0-2]\d:[0-5]\d$/i.test(value)) {
                        JsonPointer.set(formattedData, dataPointer, value + ":00Z");
                        // "2000-03-14" -> "2000-03-14T00:00:00Z" (add "T00:00:00Z")
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
/**
 * 'getControl' function
 *
 * Uses a JSON Pointer for a data object to retrieve a control from
 * an Angular formGroup or formGroup template. (Note: though a formGroup
 * template is much simpler, its basic structure is idential to a formGroup).
 *
 * If the optional third parameter 'returnGroup' is set to TRUE, the group
 * containing the control is returned, rather than the control itself.
 *
 * @param {FormGroup} formGroup - Angular FormGroup to get value from
 * @param {Pointer} dataPointer - JSON Pointer (string or array)
 * @param {boolean = false} returnGroup - If true, return group containing control
 * @return {group} - Located value (or null, if no control found)
 */
export function getControl(formGroup, dataPointer, returnGroup) {
    if (returnGroup === void 0) { returnGroup = false; }
    if (!isObject(formGroup) || !JsonPointer.isJsonPointer(dataPointer)) {
        if (!JsonPointer.isJsonPointer(dataPointer)) {
            // If dataPointer input is not a valid JSON pointer, check to
            // see if it is instead a valid object path, using dot notaion
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
    // If formGroup input is a real formGroup (not a formGroup template)
    // try using formGroup.get() to return the control
    if (typeof formGroup.get === 'function' &&
        dataPointerArray.every(function (key) { return key.indexOf('.') === -1; })) {
        var formControl = formGroup.get(dataPointerArray.join('.'));
        if (formControl) {
            return formControl;
        }
    }
    // If formGroup input is a formGroup template,
    // or formGroup.get() failed to return the control,
    // search the formGroup object for dataPointer's control
    var subGroup = formGroup;
    try {
        for (var dataPointerArray_1 = tslib_1.__values(dataPointerArray), dataPointerArray_1_1 = dataPointerArray_1.next(); !dataPointerArray_1_1.done; dataPointerArray_1_1 = dataPointerArray_1.next()) {
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
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (dataPointerArray_1_1 && !dataPointerArray_1_1.done && (_a = dataPointerArray_1.return)) _a.call(dataPointerArray_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return subGroup;
    var e_4, _a;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1ncm91cC5mdW5jdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsic3JjL3NoYXJlZC9mb3JtLWdyb3VwLmZ1bmN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNZLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUNuRCxNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE9BQU8sRUFDTCxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUM3RSxnQkFBZ0IsRUFBRSxZQUFZLEVBQy9CLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQVcsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFDUyxvQkFBb0IsRUFBZ0IseUJBQXlCLEVBQzVFLE1BQU0seUJBQXlCLENBQUM7QUFFakM7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUVIOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILE1BQU0saUNBQ0osR0FBUSxFQUFFLFNBQXFCLEVBQUUsU0FBZ0IsRUFDakQsYUFBa0IsRUFBRSxXQUFnQixFQUFFLGVBQW9CO0lBRGhELDBCQUFBLEVBQUEsZ0JBQXFCO0lBQUUsMEJBQUEsRUFBQSxnQkFBZ0I7SUFDakQsOEJBQUEsRUFBQSxrQkFBa0I7SUFBRSw0QkFBQSxFQUFBLGdCQUFnQjtJQUFFLGdDQUFBLEVBQUEsb0JBQW9CO0lBRTFELElBQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1B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RCw4Q0FBOEM7SUFDOUMsbURBQW1EO0lBQ25ELHdEQUF3RDtJQUN4RCxJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUM7O1FBQ3pCLEdBQUcsQ0FBQyxDQUFjLElBQUEscUJBQUEsaUJBQUEsZ0JBQWdCLENBQUEsa0RBQUE7WUFBN0IsSUFBTSxHQUFHLDZCQUFBO1lBQ1osRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFBQyxDQUFDO1lBQ25FLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMzQyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixPQUFPLENBQUMsS0FBSyxDQUFDLHdDQUFxQyxHQUFHLDBCQUFzQixDQUFDLENBQUM7Z0JBQzlFLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzNCLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU0sQ0FBQztZQUNULENBQUM7U0FDRjs7Ozs7Ozs7O0lBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQzs7QUFDbEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFic3RyYWN0Q29udHJvbCwgRm9ybUFycmF5LCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JGblxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHtcbiAgaGFzVmFsdWUsIGluQXJyYXksIGlzQXJyYXksIGlzRW1wdHksIGlzRGF0ZSwgaXNPYmplY3QsIGlzRGVmaW5lZCwgaXNQcmltaXRpdmUsXG4gIHRvSmF2YVNjcmlwdFR5cGUsIHRvU2NoZW1hVHlwZSwgU2NoZW1hUHJpbWl0aXZlVHlwZVxufSBmcm9tICcuL3ZhbGlkYXRvci5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgZm9yRWFjaCwgaGFzT3duIH0gZnJvbSAnLi91dGlsaXR5LmZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBQb2ludGVyLCBKc29uUG9pbnRlciB9IGZyb20gJy4vanNvbnBvaW50ZXIuZnVuY3Rpb25zJztcbmltcG9ydCB7IEpzb25WYWxpZGF0b3JzIH0gZnJvbSAnLi9qc29uLnZhbGlkYXRvcnMnO1xuaW1wb3J0IHtcbiAgY29tYmluZUFsbE9mLCBnZXRDb250cm9sVmFsaWRhdG9ycywgZ2V0U3ViU2NoZW1hLCByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzXG59IGZyb20gJy4vanNvbi1zY2hlbWEuZnVuY3Rpb25zJztcblxuLyoqXG4gKiBGb3JtR3JvdXAgZnVuY3Rpb24gbGlicmFyeTpcbiAqXG4gKiBidWlsZEZvcm1Hcm91cFRlbXBsYXRlOiAgQnVpbGRzIGEgRm9ybUdyb3VwVGVtcGxhdGUgZnJvbSBzY2hlbWFcbiAqXG4gKiBidWlsZEZvcm1Hcm91cDogICAgICAgICAgQnVpbGRzIGFuIEFuZ3VsYXIgRm9ybUdyb3VwIGZyb20gYSBGb3JtR3JvdXBUZW1wbGF0ZVxuICpcbiAqIG1lcmdlVmFsdWVzOlxuICpcbiAqIHNldFJlcXVpcmVkRmllbGRzOlxuICpcbiAqIGZvcm1hdEZvcm1EYXRhOlxuICpcbiAqIGdldENvbnRyb2w6XG4gKlxuICogLS0tLSBUT0RPOiAtLS0tXG4gKiBUT0RPOiBhZGQgYnVpbGRGb3JtR3JvdXBUZW1wbGF0ZUZyb21MYXlvdXQgZnVuY3Rpb25cbiAqIGJ1aWxkRm9ybUdyb3VwVGVtcGxhdGVGcm9tTGF5b3V0OiBCdWlsZHMgYSBGb3JtR3JvdXBUZW1wbGF0ZSBmcm9tIGEgZm9ybSBsYXlvdXRcbiAqL1xuXG4vKipcbiAqICdidWlsZEZvcm1Hcm91cFRlbXBsYXRlJyBmdW5jdGlvblxuICpcbiAqIEJ1aWxkcyBhIHRlbXBsYXRlIGZvciBhbiBBbmd1bGFyIEZvcm1Hcm91cCBmcm9tIGEgSlNPTiBTY2hlbWEuXG4gKlxuICogVE9ETzogYWRkIHN1cHBvcnQgZm9yIHBhdHRlcm4gcHJvcGVydGllc1xuICogaHR0cHM6Ly9zcGFjZXRlbGVzY29wZS5naXRodWIuaW8vdW5kZXJzdGFuZGluZy1qc29uLXNjaGVtYS9yZWZlcmVuY2Uvb2JqZWN0Lmh0bWxcbiAqXG4gKiBAcGFyYW0gIHthbnl9IGpzZiAtXG4gKiBAcGFyYW0gIHthbnkgPSBudWxsfSBub2RlVmFsdWUgLVxuICogQHBhcmFtICB7Ym9vbGVhbiA9IHRydWV9IG1hcEFycmF5cyAtXG4gKiBAcGFyYW0gIHtzdHJpbmcgPSAnJ30gc2NoZW1hUG9pbnRlciAtXG4gKiBAcGFyYW0gIHtzdHJpbmcgPSAnJ30gZGF0YVBvaW50ZXIgLVxuICogQHBhcmFtICB7YW55ID0gJyd9IHRlbXBsYXRlUG9pbnRlciAtXG4gKiBAcmV0dXJuIHthbnl9IC1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkRm9ybUdyb3VwVGVtcGxhdGUoXG4gIGpzZjogYW55LCBub2RlVmFsdWU6IGFueSA9IG51bGwsIHNldFZhbHVlcyA9IHRydWUsXG4gIHNjaGVtYVBvaW50ZXIgPSAnJywgZGF0YVBvaW50ZXIgPSAnJywgdGVtcGxhdGVQb2ludGVyID0gJydcbikge1xuICBjb25zdCBzY2hlbWEgPSBKc29uUG9pbnRlci5nZXQoanNmLnNjaGVtYSwgc2NoZW1hUG9pbnRlcik7XG4gIGlmIChzZXRWYWx1ZXMpIHtcbiAgICBpZiAoIWlzRGVmaW5lZChub2RlVmFsdWUpICYmIChcbiAgICAgIGpzZi5mb3JtT3B0aW9ucy5zZXRTY2hlbWFEZWZhdWx0cyA9PT0gdHJ1ZSB8fFxuICAgICAgKGpzZi5mb3JtT3B0aW9ucy5zZXRTY2hlbWFEZWZhdWx0cyA9PT0gJ2F1dG8nICYmIGlzRW1wdHkoanNmLmZvcm1WYWx1ZXMpKVxuICAgICkpIHtcbiAgICAgIG5vZGVWYWx1ZSA9IEpzb25Qb2ludGVyLmdldChqc2Yuc2NoZW1hLCBzY2hlbWFQb2ludGVyICsgJy9kZWZhdWx0Jyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIG5vZGVWYWx1ZSA9IG51bGw7XG4gIH1cbiAgLy8gVE9ETzogSWYgbm9kZVZhbHVlIHN0aWxsIG5vdCBzZXQsIGNoZWNrIGxheW91dCBmb3IgZGVmYXVsdCB2YWx1ZVxuICBjb25zdCBzY2hlbWFUeXBlOiBzdHJpbmcgfCBzdHJpbmdbXSA9IEpzb25Qb2ludGVyLmdldChzY2hlbWEsICcvdHlwZScpO1xuICBjb25zdCBjb250cm9sVHlwZSA9XG4gICAgKGhhc093bihzY2hlbWEsICdwcm9wZXJ0aWVzJykgfHwgaGFzT3duKHNjaGVtYSwgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJykpICYmXG4gICAgICBzY2hlbWFUeXBlID09PSAnb2JqZWN0JyA/ICdGb3JtR3JvdXAnIDpcbiAgICAoaGFzT3duKHNjaGVtYSwgJ2l0ZW1zJykgfHwgaGFzT3duKHNjaGVtYSwgJ2FkZGl0aW9uYWxJdGVtcycpKSAmJlxuICAgICAgc2NoZW1hVHlwZSA9PT0gJ2FycmF5JyA/ICdGb3JtQXJyYXknIDpcbiAgICAhc2NoZW1hVHlwZSAmJiBoYXNPd24oc2NoZW1hLCAnJHJlZicpID8gJyRyZWYnIDogJ0Zvcm1Db250cm9sJztcbiAgY29uc3Qgc2hvcnREYXRhUG9pbnRlciA9XG4gICAgcmVtb3ZlUmVjdXJzaXZlUmVmZXJlbmNlcyhkYXRhUG9pbnRlciwganNmLmRhdGFSZWN1cnNpdmVSZWZNYXAsIGpzZi5hcnJheU1hcCk7XG4gIGlmICghanNmLmRhdGFNYXAuaGFzKHNob3J0RGF0YVBvaW50ZXIpKSB7XG4gICAganNmLmRhdGFNYXAuc2V0KHNob3J0RGF0YVBvaW50ZXIsIG5ldyBNYXAoKSk7XG4gIH1cbiAgY29uc3Qgbm9kZU9wdGlvbnMgPSBqc2YuZGF0YU1hcC5nZXQoc2hvcnREYXRhUG9pbnRlcik7XG4gIGlmICghbm9kZU9wdGlvbnMuaGFzKCdzY2hlbWFUeXBlJykpIHtcbiAgICBub2RlT3B0aW9ucy5zZXQoJ3NjaGVtYVBvaW50ZXInLCBzY2hlbWFQb2ludGVyKTtcbiAgICBub2RlT3B0aW9ucy5zZXQoJ3NjaGVtYVR5cGUnLCBzY2hlbWEudHlwZSk7XG4gICAgaWYgKHNjaGVtYS5mb3JtYXQpIHtcbiAgICAgIG5vZGVPcHRpb25zLnNldCgnc2NoZW1hRm9ybWF0Jywgc2NoZW1hLmZvcm1hdCk7XG4gICAgICBpZiAoIXNjaGVtYS50eXBlKSB7IG5vZGVPcHRpb25zLnNldCgnc2NoZW1hVHlwZScsICdzdHJpbmcnKTsgfVxuICAgIH1cbiAgICBpZiAoY29udHJvbFR5cGUpIHtcbiAgICAgIG5vZGVPcHRpb25zLnNldCgndGVtcGxhdGVQb2ludGVyJywgdGVtcGxhdGVQb2ludGVyKTtcbiAgICAgIG5vZGVPcHRpb25zLnNldCgndGVtcGxhdGVUeXBlJywgY29udHJvbFR5cGUpO1xuICAgIH1cbiAgfVxuICBsZXQgY29udHJvbHM6IGFueTtcbiAgY29uc3QgdmFsaWRhdG9ycyA9IGdldENvbnRyb2xWYWxpZGF0b3JzKHNjaGVtYSk7XG4gIHN3aXRjaCAoY29udHJvbFR5cGUpIHtcblxuICAgIGNhc2UgJ0Zvcm1Hcm91cCc6XG4gICAgICBjb250cm9scyA9IHt9O1xuICAgICAgaWYgKGhhc093bihzY2hlbWEsICd1aTpvcmRlcicpIHx8IGhhc093bihzY2hlbWEsICdwcm9wZXJ0aWVzJykpIHtcbiAgICAgICAgY29uc3QgcHJvcGVydHlLZXlzID0gc2NoZW1hWyd1aTpvcmRlciddIHx8IE9iamVjdC5rZXlzKHNjaGVtYS5wcm9wZXJ0aWVzKTtcbiAgICAgICAgaWYgKHByb3BlcnR5S2V5cy5pbmNsdWRlcygnKicpICYmICFoYXNPd24oc2NoZW1hLnByb3BlcnRpZXMsICcqJykpIHtcbiAgICAgICAgICBjb25zdCB1bm5hbWVkS2V5cyA9IE9iamVjdC5rZXlzKHNjaGVtYS5wcm9wZXJ0aWVzKVxuICAgICAgICAgICAgLmZpbHRlcihrZXkgPT4gIXByb3BlcnR5S2V5cy5pbmNsdWRlcyhrZXkpKTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gcHJvcGVydHlLZXlzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBpZiAocHJvcGVydHlLZXlzW2ldID09PSAnKicpIHtcbiAgICAgICAgICAgICAgcHJvcGVydHlLZXlzLnNwbGljZShpLCAxLCAuLi51bm5hbWVkS2V5cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHByb3BlcnR5S2V5c1xuICAgICAgICAgIC5maWx0ZXIoa2V5ID0+IGhhc093bihzY2hlbWEucHJvcGVydGllcywga2V5KSB8fFxuICAgICAgICAgICAgaGFzT3duKHNjaGVtYSwgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJylcbiAgICAgICAgICApXG4gICAgICAgICAgLmZvckVhY2goa2V5ID0+IGNvbnRyb2xzW2tleV0gPSBidWlsZEZvcm1Hcm91cFRlbXBsYXRlKFxuICAgICAgICAgICAganNmLCBKc29uUG9pbnRlci5nZXQobm9kZVZhbHVlLCBbPHN0cmluZz5rZXldKSwgc2V0VmFsdWVzLFxuICAgICAgICAgICAgc2NoZW1hUG9pbnRlciArIChoYXNPd24oc2NoZW1hLnByb3BlcnRpZXMsIGtleSkgP1xuICAgICAgICAgICAgICAnL3Byb3BlcnRpZXMvJyArIGtleSA6ICcvYWRkaXRpb25hbFByb3BlcnRpZXMnXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgZGF0YVBvaW50ZXIgKyAnLycgKyBrZXksXG4gICAgICAgICAgICB0ZW1wbGF0ZVBvaW50ZXIgKyAnL2NvbnRyb2xzLycgKyBrZXlcbiAgICAgICAgICApKTtcbiAgICAgICAganNmLmZvcm1PcHRpb25zLmZpZWxkc1JlcXVpcmVkID0gc2V0UmVxdWlyZWRGaWVsZHMoc2NoZW1hLCBjb250cm9scyk7XG4gICAgICB9XG4gICAgICByZXR1cm4geyBjb250cm9sVHlwZSwgY29udHJvbHMsIHZhbGlkYXRvcnMgfTtcblxuICAgIGNhc2UgJ0Zvcm1BcnJheSc6XG4gICAgICBjb250cm9scyA9IFtdO1xuICAgICAgY29uc3QgbWluSXRlbXMgPVxuICAgICAgICBNYXRoLm1heChzY2hlbWEubWluSXRlbXMgfHwgMCwgbm9kZU9wdGlvbnMuZ2V0KCdtaW5JdGVtcycpIHx8IDApO1xuICAgICAgY29uc3QgbWF4SXRlbXMgPVxuICAgICAgICBNYXRoLm1pbihzY2hlbWEubWF4SXRlbXMgfHwgMTAwMCwgbm9kZU9wdGlvbnMuZ2V0KCdtYXhJdGVtcycpIHx8IDEwMDApO1xuICAgICAgbGV0IGFkZGl0aW9uYWxJdGVtc1BvaW50ZXI6IHN0cmluZyA9IG51bGw7XG4gICAgICBpZiAoaXNBcnJheShzY2hlbWEuaXRlbXMpKSB7IC8vICdpdGVtcycgaXMgYW4gYXJyYXkgPSB0dXBsZSBpdGVtc1xuICAgICAgICBjb25zdCB0dXBsZUl0ZW1zID0gbm9kZU9wdGlvbnMuZ2V0KCd0dXBsZUl0ZW1zJykgfHxcbiAgICAgICAgICAoaXNBcnJheShzY2hlbWEuaXRlbXMpID8gTWF0aC5taW4oc2NoZW1hLml0ZW1zLmxlbmd0aCwgbWF4SXRlbXMpIDogMCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHVwbGVJdGVtczsgaSsrKSB7XG4gICAgICAgICAgaWYgKGkgPCBtaW5JdGVtcykge1xuICAgICAgICAgICAgY29udHJvbHMucHVzaChidWlsZEZvcm1Hcm91cFRlbXBsYXRlKFxuICAgICAgICAgICAgICBqc2YsIGlzQXJyYXkobm9kZVZhbHVlKSA/IG5vZGVWYWx1ZVtpXSA6IG5vZGVWYWx1ZSwgc2V0VmFsdWVzLFxuICAgICAgICAgICAgICBzY2hlbWFQb2ludGVyICsgJy9pdGVtcy8nICsgaSxcbiAgICAgICAgICAgICAgZGF0YVBvaW50ZXIgKyAnLycgKyBpLFxuICAgICAgICAgICAgICB0ZW1wbGF0ZVBvaW50ZXIgKyAnL2NvbnRyb2xzLycgKyBpXG4gICAgICAgICAgICApKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgc2NoZW1hUmVmUG9pbnRlciA9IHJlbW92ZVJlY3Vyc2l2ZVJlZmVyZW5jZXMoXG4gICAgICAgICAgICAgIHNjaGVtYVBvaW50ZXIgKyAnL2l0ZW1zLycgKyBpLCBqc2Yuc2NoZW1hUmVjdXJzaXZlUmVmTWFwXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgaXRlbVJlZlBvaW50ZXIgPSByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzKFxuICAgICAgICAgICAgICBzaG9ydERhdGFQb2ludGVyICsgJy8nICsgaSwganNmLmRhdGFSZWN1cnNpdmVSZWZNYXAsIGpzZi5hcnJheU1hcFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1SZWN1cnNpdmUgPSBpdGVtUmVmUG9pbnRlciAhPT0gc2hvcnREYXRhUG9pbnRlciArICcvJyArIGk7XG4gICAgICAgICAgICBpZiAoIWhhc093bihqc2YudGVtcGxhdGVSZWZMaWJyYXJ5LCBpdGVtUmVmUG9pbnRlcikpIHtcbiAgICAgICAgICAgICAganNmLnRlbXBsYXRlUmVmTGlicmFyeVtpdGVtUmVmUG9pbnRlcl0gPSBudWxsO1xuICAgICAgICAgICAgICBqc2YudGVtcGxhdGVSZWZMaWJyYXJ5W2l0ZW1SZWZQb2ludGVyXSA9IGJ1aWxkRm9ybUdyb3VwVGVtcGxhdGUoXG4gICAgICAgICAgICAgICAganNmLCBudWxsLCBzZXRWYWx1ZXMsXG4gICAgICAgICAgICAgICAgc2NoZW1hUmVmUG9pbnRlcixcbiAgICAgICAgICAgICAgICBpdGVtUmVmUG9pbnRlcixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBvaW50ZXIgKyAnL2NvbnRyb2xzLycgKyBpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250cm9scy5wdXNoKFxuICAgICAgICAgICAgICBpc0FycmF5KG5vZGVWYWx1ZSkgP1xuICAgICAgICAgICAgICAgIGJ1aWxkRm9ybUdyb3VwVGVtcGxhdGUoXG4gICAgICAgICAgICAgICAgICBqc2YsIG5vZGVWYWx1ZVtpXSwgc2V0VmFsdWVzLFxuICAgICAgICAgICAgICAgICAgc2NoZW1hUG9pbnRlciArICcvaXRlbXMvJyArIGksXG4gICAgICAgICAgICAgICAgICBkYXRhUG9pbnRlciArICcvJyArIGksXG4gICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBvaW50ZXIgKyAnL2NvbnRyb2xzLycgKyBpXG4gICAgICAgICAgICAgICAgKSA6XG4gICAgICAgICAgICAgIGl0ZW1SZWN1cnNpdmUgP1xuICAgICAgICAgICAgICAgIG51bGwgOiBfLmNsb25lRGVlcChqc2YudGVtcGxhdGVSZWZMaWJyYXJ5W2l0ZW1SZWZQb2ludGVyXSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgJ2FkZGl0aW9uYWxJdGVtcycgaXMgYW4gb2JqZWN0ID0gYWRkaXRpb25hbCBsaXN0IGl0ZW1zIChhZnRlciB0dXBsZSBpdGVtcylcbiAgICAgICAgaWYgKHNjaGVtYS5pdGVtcy5sZW5ndGggPCBtYXhJdGVtcyAmJiBpc09iamVjdChzY2hlbWEuYWRkaXRpb25hbEl0ZW1zKSkge1xuICAgICAgICAgIGFkZGl0aW9uYWxJdGVtc1BvaW50ZXIgPSBzY2hlbWFQb2ludGVyICsgJy9hZGRpdGlvbmFsSXRlbXMnO1xuICAgICAgICB9XG5cbiAgICAgIC8vIElmICdpdGVtcycgaXMgYW4gb2JqZWN0ID0gbGlzdCBpdGVtcyBvbmx5IChubyB0dXBsZSBpdGVtcylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZGl0aW9uYWxJdGVtc1BvaW50ZXIgPSBzY2hlbWFQb2ludGVyICsgJy9pdGVtcyc7XG4gICAgICB9XG5cbiAgICAgIGlmIChhZGRpdGlvbmFsSXRlbXNQb2ludGVyKSB7XG4gICAgICAgIGNvbnN0IHNjaGVtYVJlZlBvaW50ZXIgPSByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzKFxuICAgICAgICAgIGFkZGl0aW9uYWxJdGVtc1BvaW50ZXIsIGpzZi5zY2hlbWFSZWN1cnNpdmVSZWZNYXBcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgaXRlbVJlZlBvaW50ZXIgPSByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzKFxuICAgICAgICAgIHNob3J0RGF0YVBvaW50ZXIgKyAnLy0nLCBqc2YuZGF0YVJlY3Vyc2l2ZVJlZk1hcCwganNmLmFycmF5TWFwXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGl0ZW1SZWN1cnNpdmUgPSBpdGVtUmVmUG9pbnRlciAhPT0gc2hvcnREYXRhUG9pbnRlciArICcvLSc7XG4gICAgICAgIGlmICghaGFzT3duKGpzZi50ZW1wbGF0ZVJlZkxpYnJhcnksIGl0ZW1SZWZQb2ludGVyKSkge1xuICAgICAgICAgIGpzZi50ZW1wbGF0ZVJlZkxpYnJhcnlbaXRlbVJlZlBvaW50ZXJdID0gbnVsbDtcbiAgICAgICAgICBqc2YudGVtcGxhdGVSZWZMaWJyYXJ5W2l0ZW1SZWZQb2ludGVyXSA9IGJ1aWxkRm9ybUdyb3VwVGVtcGxhdGUoXG4gICAgICAgICAgICBqc2YsIG51bGwsIHNldFZhbHVlcyxcbiAgICAgICAgICAgIHNjaGVtYVJlZlBvaW50ZXIsXG4gICAgICAgICAgICBpdGVtUmVmUG9pbnRlcixcbiAgICAgICAgICAgIHRlbXBsYXRlUG9pbnRlciArICcvY29udHJvbHMvLSdcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnN0IGl0ZW1PcHRpb25zID0ganNmLmRhdGFNYXAuZ2V0KGl0ZW1SZWZQb2ludGVyKSB8fCBuZXcgTWFwKCk7XG4gICAgICAgIGNvbnN0IGl0ZW1PcHRpb25zID0gbm9kZU9wdGlvbnM7XG4gICAgICAgIGlmICghaXRlbVJlY3Vyc2l2ZSB8fCBoYXNPd24odmFsaWRhdG9ycywgJ3JlcXVpcmVkJykpIHtcbiAgICAgICAgICBjb25zdCBhcnJheUxlbmd0aCA9IE1hdGgubWluKE1hdGgubWF4KFxuICAgICAgICAgICAgaXRlbVJlY3Vyc2l2ZSA/IDAgOlxuICAgICAgICAgICAgICAoaXRlbU9wdGlvbnMuZ2V0KCd0dXBsZUl0ZW1zJykgKyBpdGVtT3B0aW9ucy5nZXQoJ2xpc3RJdGVtcycpKSB8fCAwLFxuICAgICAgICAgICAgaXNBcnJheShub2RlVmFsdWUpID8gbm9kZVZhbHVlLmxlbmd0aCA6IDBcbiAgICAgICAgICApLCBtYXhJdGVtcyk7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IGNvbnRyb2xzLmxlbmd0aDsgaSA8IGFycmF5TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnRyb2xzLnB1c2goXG4gICAgICAgICAgICAgIGlzQXJyYXkobm9kZVZhbHVlKSA/XG4gICAgICAgICAgICAgICAgYnVpbGRGb3JtR3JvdXBUZW1wbGF0ZShcbiAgICAgICAgICAgICAgICAgIGpzZiwgbm9kZVZhbHVlW2ldLCBzZXRWYWx1ZXMsXG4gICAgICAgICAgICAgICAgICBzY2hlbWFSZWZQb2ludGVyLFxuICAgICAgICAgICAgICAgICAgZGF0YVBvaW50ZXIgKyAnLy0nLFxuICAgICAgICAgICAgICAgICAgdGVtcGxhdGVQb2ludGVyICsgJy9jb250cm9scy8tJ1xuICAgICAgICAgICAgICAgICkgOlxuICAgICAgICAgICAgICAgIGl0ZW1SZWN1cnNpdmUgP1xuICAgICAgICAgICAgICAgICAgbnVsbCA6IF8uY2xvbmVEZWVwKGpzZi50ZW1wbGF0ZVJlZkxpYnJhcnlbaXRlbVJlZlBvaW50ZXJdKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB7IGNvbnRyb2xUeXBlLCBjb250cm9scywgdmFsaWRhdG9ycyB9O1xuXG4gICAgY2FzZSAnJHJlZic6XG4gICAgICBjb25zdCBzY2hlbWFSZWYgPSBKc29uUG9pbnRlci5jb21waWxlKHNjaGVtYS4kcmVmKTtcbiAgICAgIGNvbnN0IGRhdGFSZWYgPSBKc29uUG9pbnRlci50b0RhdGFQb2ludGVyKHNjaGVtYVJlZiwgc2NoZW1hKTtcbiAgICAgIGNvbnN0IHJlZlBvaW50ZXIgPSByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzKFxuICAgICAgICBkYXRhUmVmLCBqc2YuZGF0YVJlY3Vyc2l2ZVJlZk1hcCwganNmLmFycmF5TWFwXG4gICAgICApO1xuICAgICAgaWYgKHJlZlBvaW50ZXIgJiYgIWhhc093bihqc2YudGVtcGxhdGVSZWZMaWJyYXJ5LCByZWZQb2ludGVyKSkge1xuICAgICAgICAvLyBTZXQgdG8gbnVsbCBmaXJzdCB0byBwcmV2ZW50IHJlY3Vyc2l2ZSByZWZlcmVuY2UgZnJvbSBjYXVzaW5nIGVuZGxlc3MgbG9vcFxuICAgICAgICBqc2YudGVtcGxhdGVSZWZMaWJyYXJ5W3JlZlBvaW50ZXJdID0gbnVsbDtcbiAgICAgICAgY29uc3QgbmV3VGVtcGxhdGUgPSBidWlsZEZvcm1Hcm91cFRlbXBsYXRlKGpzZiwgc2V0VmFsdWVzLCBzZXRWYWx1ZXMsIHNjaGVtYVJlZik7XG4gICAgICAgIGlmIChuZXdUZW1wbGF0ZSkge1xuICAgICAgICAgIGpzZi50ZW1wbGF0ZVJlZkxpYnJhcnlbcmVmUG9pbnRlcl0gPSBuZXdUZW1wbGF0ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGUganNmLnRlbXBsYXRlUmVmTGlicmFyeVtyZWZQb2ludGVyXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICBjYXNlICdGb3JtQ29udHJvbCc6XG4gICAgICBjb25zdCB2YWx1ZSA9IHtcbiAgICAgICAgdmFsdWU6IHNldFZhbHVlcyAmJiBpc1ByaW1pdGl2ZShub2RlVmFsdWUpID8gbm9kZVZhbHVlIDogbnVsbCxcbiAgICAgICAgZGlzYWJsZWQ6IG5vZGVPcHRpb25zLmdldCgnZGlzYWJsZWQnKSB8fCBmYWxzZVxuICAgICAgfTtcbiAgICAgIHJldHVybiB7IGNvbnRyb2xUeXBlLCB2YWx1ZSwgdmFsaWRhdG9ycyB9O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8qKlxuICogJ2J1aWxkRm9ybUdyb3VwJyBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7YW55fSB0ZW1wbGF0ZSAtXG4gKiBAcmV0dXJuIHtBYnN0cmFjdENvbnRyb2x9XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkRm9ybUdyb3VwKHRlbXBsYXRlOiBhbnkpOiBBYnN0cmFjdENvbnRyb2wge1xuICBjb25zdCB2YWxpZGF0b3JGbnM6IFZhbGlkYXRvckZuW10gPSBbXTtcbiAgbGV0IHZhbGlkYXRvckZuOiBWYWxpZGF0b3JGbiA9IG51bGw7XG4gIGlmIChoYXNPd24odGVtcGxhdGUsICd2YWxpZGF0b3JzJykpIHtcbiAgICBmb3JFYWNoKHRlbXBsYXRlLnZhbGlkYXRvcnMsIChwYXJhbWV0ZXJzLCB2YWxpZGF0b3IpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgSnNvblZhbGlkYXRvcnNbdmFsaWRhdG9yXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2YWxpZGF0b3JGbnMucHVzaChKc29uVmFsaWRhdG9yc1t2YWxpZGF0b3JdLmFwcGx5KG51bGwsIHBhcmFtZXRlcnMpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodmFsaWRhdG9yRm5zLmxlbmd0aCAmJlxuICAgICAgaW5BcnJheSh0ZW1wbGF0ZS5jb250cm9sVHlwZSwgWydGb3JtR3JvdXAnLCAnRm9ybUFycmF5J10pXG4gICAgKSB7XG4gICAgICB2YWxpZGF0b3JGbiA9IHZhbGlkYXRvckZucy5sZW5ndGggPiAxID9cbiAgICAgICAgSnNvblZhbGlkYXRvcnMuY29tcG9zZSh2YWxpZGF0b3JGbnMpIDogdmFsaWRhdG9yRm5zWzBdO1xuICAgIH1cbiAgfVxuICBpZiAoaGFzT3duKHRlbXBsYXRlLCAnY29udHJvbFR5cGUnKSkge1xuICAgIHN3aXRjaCAodGVtcGxhdGUuY29udHJvbFR5cGUpIHtcbiAgICAgIGNhc2UgJ0Zvcm1Hcm91cCc6XG4gICAgICAgIGNvbnN0IGdyb3VwQ29udHJvbHM6IHsgW2tleTogc3RyaW5nXTogQWJzdHJhY3RDb250cm9sIH0gPSB7fTtcbiAgICAgICAgZm9yRWFjaCh0ZW1wbGF0ZS5jb250cm9scywgKGNvbnRyb2xzLCBrZXkpID0+IHtcbiAgICAgICAgICBjb25zdCBuZXdDb250cm9sOiBBYnN0cmFjdENvbnRyb2wgPSBidWlsZEZvcm1Hcm91cChjb250cm9scyk7XG4gICAgICAgICAgaWYgKG5ld0NvbnRyb2wpIHsgZ3JvdXBDb250cm9sc1trZXldID0gbmV3Q29udHJvbDsgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5ldyBGb3JtR3JvdXAoZ3JvdXBDb250cm9scywgdmFsaWRhdG9yRm4pO1xuICAgICAgY2FzZSAnRm9ybUFycmF5JzpcbiAgICAgICAgcmV0dXJuIG5ldyBGb3JtQXJyYXkoXy5maWx0ZXIoXy5tYXAodGVtcGxhdGUuY29udHJvbHMsXG4gICAgICAgICAgY29udHJvbHMgPT4gYnVpbGRGb3JtR3JvdXAoY29udHJvbHMpXG4gICAgICAgICkpLCB2YWxpZGF0b3JGbik7XG4gICAgICBjYXNlICdGb3JtQ29udHJvbCc6XG4gICAgICAgIHJldHVybiBuZXcgRm9ybUNvbnRyb2wodGVtcGxhdGUudmFsdWUsIHZhbGlkYXRvckZucyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqICdtZXJnZVZhbHVlcycgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0gIHthbnlbXX0gLi4udmFsdWVzVG9NZXJnZSAtIE11bHRpcGxlIHZhbHVlcyB0byBtZXJnZVxuICogQHJldHVybiB7YW55fSAtIE1lcmdlZCB2YWx1ZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlVmFsdWVzKC4uLnZhbHVlc1RvTWVyZ2UpIHtcbiAgbGV0IG1lcmdlZFZhbHVlczogYW55ID0gbnVsbDtcbiAgZm9yIChjb25zdCBjdXJyZW50VmFsdWUgb2YgdmFsdWVzVG9NZXJnZSkge1xuICAgIGlmICghaXNFbXB0eShjdXJyZW50VmFsdWUpKSB7XG4gICAgICBpZiAodHlwZW9mIGN1cnJlbnRWYWx1ZSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgKGlzRW1wdHkobWVyZ2VkVmFsdWVzKSB8fCB0eXBlb2YgbWVyZ2VkVmFsdWVzICE9PSAnb2JqZWN0JylcbiAgICAgICkge1xuICAgICAgICBpZiAoaXNBcnJheShjdXJyZW50VmFsdWUpKSB7XG4gICAgICAgICAgbWVyZ2VkVmFsdWVzID0gWyAuLi5jdXJyZW50VmFsdWUgXTtcbiAgICAgICAgfSBlbHNlIGlmIChpc09iamVjdChjdXJyZW50VmFsdWUpKSB7XG4gICAgICAgICAgbWVyZ2VkVmFsdWVzID0geyAuLi5jdXJyZW50VmFsdWUgfTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY3VycmVudFZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBtZXJnZWRWYWx1ZXMgPSBjdXJyZW50VmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KG1lcmdlZFZhbHVlcykgJiYgaXNPYmplY3QoY3VycmVudFZhbHVlKSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKG1lcmdlZFZhbHVlcywgY3VycmVudFZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QobWVyZ2VkVmFsdWVzKSAmJiBpc0FycmF5KGN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWVzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgbmV3VmFsdWVzLnB1c2gobWVyZ2VWYWx1ZXMobWVyZ2VkVmFsdWVzLCB2YWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIG1lcmdlZFZhbHVlcyA9IG5ld1ZhbHVlcztcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShtZXJnZWRWYWx1ZXMpICYmIGlzT2JqZWN0KGN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWVzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgbWVyZ2VkVmFsdWVzKSB7XG4gICAgICAgICAgbmV3VmFsdWVzLnB1c2gobWVyZ2VWYWx1ZXModmFsdWUsIGN1cnJlbnRWYWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIG1lcmdlZFZhbHVlcyA9IG5ld1ZhbHVlcztcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShtZXJnZWRWYWx1ZXMpICYmIGlzQXJyYXkoY3VycmVudFZhbHVlKSkge1xuICAgICAgICBjb25zdCBuZXdWYWx1ZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNYXRoLm1heChtZXJnZWRWYWx1ZXMubGVuZ3RoLCBjdXJyZW50VmFsdWUubGVuZ3RoKTsgaSsrKSB7XG4gICAgICAgICAgaWYgKGkgPCBtZXJnZWRWYWx1ZXMubGVuZ3RoICYmIGkgPCBjdXJyZW50VmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICBuZXdWYWx1ZXMucHVzaChtZXJnZVZhbHVlcyhtZXJnZWRWYWx1ZXNbaV0sIGN1cnJlbnRWYWx1ZVtpXSkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaSA8IG1lcmdlZFZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlcy5wdXNoKG1lcmdlZFZhbHVlc1tpXSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpIDwgY3VycmVudFZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgbmV3VmFsdWVzLnB1c2goY3VycmVudFZhbHVlW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbWVyZ2VkVmFsdWVzID0gbmV3VmFsdWVzO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbWVyZ2VkVmFsdWVzO1xufVxuXG4vKipcbiAqICdzZXRSZXF1aXJlZEZpZWxkcycgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge3NjaGVtYX0gc2NoZW1hIC0gSlNPTiBTY2hlbWFcbiAqIEBwYXJhbSB7b2JqZWN0fSBmb3JtQ29udHJvbFRlbXBsYXRlIC0gRm9ybSBDb250cm9sIFRlbXBsYXRlIG9iamVjdFxuICogQHJldHVybiB7Ym9vbGVhbn0gLSB0cnVlIGlmIGFueSBmaWVsZHMgaGF2ZSBiZWVuIHNldCB0byByZXF1aXJlZCwgZmFsc2UgaWYgbm90XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRSZXF1aXJlZEZpZWxkcyhzY2hlbWE6IGFueSwgZm9ybUNvbnRyb2xUZW1wbGF0ZTogYW55KTogYm9vbGVhbiB7XG4gIGxldCBmaWVsZHNSZXF1aXJlZCA9IGZhbHNlO1xuICBpZiAoaGFzT3duKHNjaGVtYSwgJ3JlcXVpcmVkJykgJiYgIWlzRW1wdHkoc2NoZW1hLnJlcXVpcmVkKSkge1xuICAgIGZpZWxkc1JlcXVpcmVkID0gdHJ1ZTtcbiAgICBsZXQgcmVxdWlyZWRBcnJheSA9IGlzQXJyYXkoc2NoZW1hLnJlcXVpcmVkKSA/IHNjaGVtYS5yZXF1aXJlZCA6IFtzY2hlbWEucmVxdWlyZWRdO1xuICAgIHJlcXVpcmVkQXJyYXkgPSBmb3JFYWNoKHJlcXVpcmVkQXJyYXksXG4gICAgICBrZXkgPT4gSnNvblBvaW50ZXIuc2V0KGZvcm1Db250cm9sVGVtcGxhdGUsICcvJyArIGtleSArICcvdmFsaWRhdG9ycy9yZXF1aXJlZCcsIFtdKVxuICAgICk7XG4gIH1cbiAgcmV0dXJuIGZpZWxkc1JlcXVpcmVkO1xuXG4gIC8vIFRPRE86IEFkZCBzdXBwb3J0IGZvciBwYXR0ZXJuUHJvcGVydGllc1xuICAvLyBodHRwczovL3NwYWNldGVsZXNjb3BlLmdpdGh1Yi5pby91bmRlcnN0YW5kaW5nLWpzb24tc2NoZW1hL3JlZmVyZW5jZS9vYmplY3QuaHRtbCNwYXR0ZXJuLXByb3BlcnRpZXNcbn1cblxuLyoqXG4gKiAnZm9ybWF0Rm9ybURhdGEnIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHthbnl9IGZvcm1EYXRhIC0gQW5ndWxhciBGb3JtR3JvdXAgZGF0YSBvYmplY3RcbiAqIEBwYXJhbSB7TWFwPHN0cmluZywgYW55Pn0gZGF0YU1hcCAtXG4gKiBAcGFyYW0ge01hcDxzdHJpbmcsIHN0cmluZz59IHJlY3Vyc2l2ZVJlZk1hcCAtXG4gKiBAcGFyYW0ge01hcDxzdHJpbmcsIG51bWJlcj59IGFycmF5TWFwIC1cbiAqIEBwYXJhbSB7Ym9vbGVhbiA9IGZhbHNlfSBmaXhFcnJvcnMgLSBpZiBUUlVFLCB0cmllcyB0byBmaXggZGF0YVxuICogQHJldHVybiB7YW55fSAtIGZvcm1hdHRlZCBkYXRhIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0Rm9ybURhdGEoXG4gIGZvcm1EYXRhOiBhbnksIGRhdGFNYXA6IE1hcDxzdHJpbmcsIGFueT4sXG4gIHJlY3Vyc2l2ZVJlZk1hcDogTWFwPHN0cmluZywgc3RyaW5nPiwgYXJyYXlNYXA6IE1hcDxzdHJpbmcsIG51bWJlcj4sXG4gIHJldHVybkVtcHR5RmllbGRzID0gZmFsc2UsIGZpeEVycm9ycyA9IGZhbHNlXG4pOiBhbnkge1xuICBpZiAoZm9ybURhdGEgPT09IG51bGwgfHwgdHlwZW9mIGZvcm1EYXRhICE9PSAnb2JqZWN0JykgeyByZXR1cm4gZm9ybURhdGE7IH1cbiAgY29uc3QgZm9ybWF0dGVkRGF0YSA9IGlzQXJyYXkoZm9ybURhdGEpID8gW10gOiB7fTtcbiAgSnNvblBvaW50ZXIuZm9yRWFjaERlZXAoZm9ybURhdGEsICh2YWx1ZSwgZGF0YVBvaW50ZXIpID0+IHtcblxuICAgIC8vIElmIHJldHVybkVtcHR5RmllbGRzID09PSB0cnVlLFxuICAgIC8vIGFkZCBlbXB0eSBhcnJheXMgYW5kIG9iamVjdHMgdG8gYWxsIGFsbG93ZWQga2V5c1xuICAgIGlmIChyZXR1cm5FbXB0eUZpZWxkcyAmJiBpc0FycmF5KHZhbHVlKSkge1xuICAgICAgSnNvblBvaW50ZXIuc2V0KGZvcm1hdHRlZERhdGEsIGRhdGFQb2ludGVyLCBbXSk7XG4gICAgfSBlbHNlIGlmIChyZXR1cm5FbXB0eUZpZWxkcyAmJiBpc09iamVjdCh2YWx1ZSkgJiYgIWlzRGF0ZSh2YWx1ZSkpIHtcbiAgICAgIEpzb25Qb2ludGVyLnNldChmb3JtYXR0ZWREYXRhLCBkYXRhUG9pbnRlciwge30pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBnZW5lcmljUG9pbnRlciA9XG4gICAgICAgIEpzb25Qb2ludGVyLmhhcyhkYXRhTWFwLCBbZGF0YVBvaW50ZXIsICdzY2hlbWFUeXBlJ10pID8gZGF0YVBvaW50ZXIgOlxuICAgICAgICAgIHJlbW92ZVJlY3Vyc2l2ZVJlZmVyZW5jZXMoZGF0YVBvaW50ZXIsIHJlY3Vyc2l2ZVJlZk1hcCwgYXJyYXlNYXApO1xuICAgICAgaWYgKEpzb25Qb2ludGVyLmhhcyhkYXRhTWFwLCBbZ2VuZXJpY1BvaW50ZXIsICdzY2hlbWFUeXBlJ10pKSB7XG4gICAgICAgIGNvbnN0IHNjaGVtYVR5cGU6IFNjaGVtYVByaW1pdGl2ZVR5cGUgfCBTY2hlbWFQcmltaXRpdmVUeXBlW10gPVxuICAgICAgICAgIGRhdGFNYXAuZ2V0KGdlbmVyaWNQb2ludGVyKS5nZXQoJ3NjaGVtYVR5cGUnKTtcbiAgICAgICAgaWYgKHNjaGVtYVR5cGUgPT09ICdudWxsJykge1xuICAgICAgICAgIEpzb25Qb2ludGVyLnNldChmb3JtYXR0ZWREYXRhLCBkYXRhUG9pbnRlciwgbnVsbCk7XG4gICAgICAgIH0gZWxzZSBpZiAoKGhhc1ZhbHVlKHZhbHVlKSB8fCByZXR1cm5FbXB0eUZpZWxkcykgJiZcbiAgICAgICAgICBpbkFycmF5KHNjaGVtYVR5cGUsIFsnc3RyaW5nJywgJ2ludGVnZXInLCAnbnVtYmVyJywgJ2Jvb2xlYW4nXSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3QgbmV3VmFsdWUgPSAoZml4RXJyb3JzIHx8ICh2YWx1ZSA9PT0gbnVsbCAmJiByZXR1cm5FbXB0eUZpZWxkcykpID9cbiAgICAgICAgICAgIHRvU2NoZW1hVHlwZSh2YWx1ZSwgc2NoZW1hVHlwZSkgOiB0b0phdmFTY3JpcHRUeXBlKHZhbHVlLCBzY2hlbWFUeXBlKTtcbiAgICAgICAgICBpZiAoaXNEZWZpbmVkKG5ld1ZhbHVlKSB8fCByZXR1cm5FbXB0eUZpZWxkcykge1xuICAgICAgICAgICAgSnNvblBvaW50ZXIuc2V0KGZvcm1hdHRlZERhdGEsIGRhdGFQb2ludGVyLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHJldHVybkVtcHR5RmllbGRzID09PSBmYWxzZSxcbiAgICAgICAgLy8gb25seSBhZGQgZW1wdHkgYXJyYXlzIGFuZCBvYmplY3RzIHRvIHJlcXVpcmVkIGtleXNcbiAgICAgICAgfSBlbHNlIGlmIChzY2hlbWFUeXBlID09PSAnb2JqZWN0JyAmJiAhcmV0dXJuRW1wdHlGaWVsZHMpIHtcbiAgICAgICAgICAoZGF0YU1hcC5nZXQoZ2VuZXJpY1BvaW50ZXIpLmdldCgncmVxdWlyZWQnKSB8fCBbXSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgY29uc3Qga2V5U2NoZW1hVHlwZSA9XG4gICAgICAgICAgICAgIGRhdGFNYXAuZ2V0KGAke2dlbmVyaWNQb2ludGVyfS8ke2tleX1gKS5nZXQoJ3NjaGVtYVR5cGUnKTtcbiAgICAgICAgICAgIGlmIChrZXlTY2hlbWFUeXBlID09PSAnYXJyYXknKSB7XG4gICAgICAgICAgICAgIEpzb25Qb2ludGVyLnNldChmb3JtYXR0ZWREYXRhLCBgJHtkYXRhUG9pbnRlcn0vJHtrZXl9YCwgW10pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXlTY2hlbWFUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICBKc29uUG9pbnRlci5zZXQoZm9ybWF0dGVkRGF0YSwgYCR7ZGF0YVBvaW50ZXJ9LyR7a2V5fWAsIHt9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpbmlzaCBpbmNvbXBsZXRlICdkYXRlLXRpbWUnIGVudHJpZXNcbiAgICAgICAgaWYgKGRhdGFNYXAuZ2V0KGdlbmVyaWNQb2ludGVyKS5nZXQoJ3NjaGVtYUZvcm1hdCcpID09PSAnZGF0ZS10aW1lJykge1xuICAgICAgICAgIC8vIFwiMjAwMC0wMy0xNFQwMTo1OToyNi41MzVcIiAtPiBcIjIwMDAtMDMtMTRUMDE6NTk6MjYuNTM1WlwiIChhZGQgXCJaXCIpXG4gICAgICAgICAgaWYgKC9eXFxkXFxkXFxkXFxkLVswLTFdXFxkLVswLTNdXFxkW3RcXHNdWzAtMl1cXGQ6WzAtNV1cXGQ6WzAtNV1cXGQoPzpcXC5cXGQrKT8kL2kudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIEpzb25Qb2ludGVyLnNldChmb3JtYXR0ZWREYXRhLCBkYXRhUG9pbnRlciwgYCR7dmFsdWV9WmApO1xuICAgICAgICAgIC8vIFwiMjAwMC0wMy0xNFQwMTo1OVwiIC0+IFwiMjAwMC0wMy0xNFQwMTo1OTowMFpcIiAoYWRkIFwiOjAwWlwiKVxuICAgICAgICAgIH0gZWxzZSBpZiAoL15cXGRcXGRcXGRcXGQtWzAtMV1cXGQtWzAtM11cXGRbdFxcc11bMC0yXVxcZDpbMC01XVxcZCQvaS50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgSnNvblBvaW50ZXIuc2V0KGZvcm1hdHRlZERhdGEsIGRhdGFQb2ludGVyLCBgJHt2YWx1ZX06MDBaYCk7XG4gICAgICAgICAgLy8gXCIyMDAwLTAzLTE0XCIgLT4gXCIyMDAwLTAzLTE0VDAwOjAwOjAwWlwiIChhZGQgXCJUMDA6MDA6MDBaXCIpXG4gICAgICAgICAgfSBlbHNlIGlmIChmaXhFcnJvcnMgJiYgL15cXGRcXGRcXGRcXGQtWzAtMV1cXGQtWzAtM11cXGQkL2kudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIEpzb25Qb2ludGVyLnNldChmb3JtYXR0ZWREYXRhLCBkYXRhUG9pbnRlciwgYCR7dmFsdWV9OjAwOjAwOjAwWmApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnIHx8IGlzRGF0ZSh2YWx1ZSkgfHxcbiAgICAgICAgKHZhbHVlID09PSBudWxsICYmIHJldHVybkVtcHR5RmllbGRzKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2Zvcm1hdEZvcm1EYXRhIGVycm9yOiAnICtcbiAgICAgICAgICBgU2NoZW1hIHR5cGUgbm90IGZvdW5kIGZvciBmb3JtIHZhbHVlIGF0ICR7Z2VuZXJpY1BvaW50ZXJ9YCk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2RhdGFNYXAnLCBkYXRhTWFwKTtcbiAgICAgICAgY29uc29sZS5lcnJvcigncmVjdXJzaXZlUmVmTWFwJywgcmVjdXJzaXZlUmVmTWFwKTtcbiAgICAgICAgY29uc29sZS5lcnJvcignZ2VuZXJpY1BvaW50ZXInLCBnZW5lcmljUG9pbnRlcik7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGZvcm1hdHRlZERhdGE7XG59XG5cbi8qKlxuICogJ2dldENvbnRyb2wnIGZ1bmN0aW9uXG4gKlxuICogVXNlcyBhIEpTT04gUG9pbnRlciBmb3IgYSBkYXRhIG9iamVjdCB0byByZXRyaWV2ZSBhIGNvbnRyb2wgZnJvbVxuICogYW4gQW5ndWxhciBmb3JtR3JvdXAgb3IgZm9ybUdyb3VwIHRlbXBsYXRlLiAoTm90ZTogdGhvdWdoIGEgZm9ybUdyb3VwXG4gKiB0ZW1wbGF0ZSBpcyBtdWNoIHNpbXBsZXIsIGl0cyBiYXNpYyBzdHJ1Y3R1cmUgaXMgaWRlbnRpYWwgdG8gYSBmb3JtR3JvdXApLlxuICpcbiAqIElmIHRoZSBvcHRpb25hbCB0aGlyZCBwYXJhbWV0ZXIgJ3JldHVybkdyb3VwJyBpcyBzZXQgdG8gVFJVRSwgdGhlIGdyb3VwXG4gKiBjb250YWluaW5nIHRoZSBjb250cm9sIGlzIHJldHVybmVkLCByYXRoZXIgdGhhbiB0aGUgY29udHJvbCBpdHNlbGYuXG4gKlxuICogQHBhcmFtIHtGb3JtR3JvdXB9IGZvcm1Hcm91cCAtIEFuZ3VsYXIgRm9ybUdyb3VwIHRvIGdldCB2YWx1ZSBmcm9tXG4gKiBAcGFyYW0ge1BvaW50ZXJ9IGRhdGFQb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gKiBAcGFyYW0ge2Jvb2xlYW4gPSBmYWxzZX0gcmV0dXJuR3JvdXAgLSBJZiB0cnVlLCByZXR1cm4gZ3JvdXAgY29udGFpbmluZyBjb250cm9sXG4gKiBAcmV0dXJuIHtncm91cH0gLSBMb2NhdGVkIHZhbHVlIChvciBudWxsLCBpZiBubyBjb250cm9sIGZvdW5kKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29udHJvbChcbiAgZm9ybUdyb3VwOiBhbnksIGRhdGFQb2ludGVyOiBQb2ludGVyLCByZXR1cm5Hcm91cCA9IGZhbHNlXG4pOiBhbnkge1xuICBpZiAoIWlzT2JqZWN0KGZvcm1Hcm91cCkgfHwgIUpzb25Qb2ludGVyLmlzSnNvblBvaW50ZXIoZGF0YVBvaW50ZXIpKSB7XG4gICAgaWYgKCFKc29uUG9pbnRlci5pc0pzb25Qb2ludGVyKGRhdGFQb2ludGVyKSkge1xuICAgICAgLy8gSWYgZGF0YVBvaW50ZXIgaW5wdXQgaXMgbm90IGEgdmFsaWQgSlNPTiBwb2ludGVyLCBjaGVjayB0b1xuICAgICAgLy8gc2VlIGlmIGl0IGlzIGluc3RlYWQgYSB2YWxpZCBvYmplY3QgcGF0aCwgdXNpbmcgZG90IG5vdGFpb25cbiAgICAgIGlmICh0eXBlb2YgZGF0YVBvaW50ZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IGZvcm1Db250cm9sID0gZm9ybUdyb3VwLmdldChkYXRhUG9pbnRlcik7XG4gICAgICAgIGlmIChmb3JtQ29udHJvbCkgeyByZXR1cm4gZm9ybUNvbnRyb2w7IH1cbiAgICAgIH1cbiAgICAgIGNvbnNvbGUuZXJyb3IoYGdldENvbnRyb2wgZXJyb3I6IEludmFsaWQgSlNPTiBQb2ludGVyOiAke2RhdGFQb2ludGVyfWApO1xuICAgIH1cbiAgICBpZiAoIWlzT2JqZWN0KGZvcm1Hcm91cCkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYGdldENvbnRyb2wgZXJyb3I6IEludmFsaWQgZm9ybUdyb3VwOiAke2Zvcm1Hcm91cH1gKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgbGV0IGRhdGFQb2ludGVyQXJyYXkgPSBKc29uUG9pbnRlci5wYXJzZShkYXRhUG9pbnRlcik7XG4gIGlmIChyZXR1cm5Hcm91cCkgeyBkYXRhUG9pbnRlckFycmF5ID0gZGF0YVBvaW50ZXJBcnJheS5zbGljZSgwLCAtMSk7IH1cblxuICAvLyBJZiBmb3JtR3JvdXAgaW5wdXQgaXMgYSByZWFsIGZvcm1Hcm91cCAobm90IGEgZm9ybUdyb3VwIHRlbXBsYXRlKVxuICAvLyB0cnkgdXNpbmcgZm9ybUdyb3VwLmdldCgpIHRvIHJldHVybiB0aGUgY29udHJvbFxuICBpZiAodHlwZW9mIGZvcm1Hcm91cC5nZXQgPT09ICdmdW5jdGlvbicgJiZcbiAgICBkYXRhUG9pbnRlckFycmF5LmV2ZXJ5KGtleSA9PiBrZXkuaW5kZXhPZignLicpID09PSAtMSlcbiAgKSB7XG4gICAgY29uc3QgZm9ybUNvbnRyb2wgPSBmb3JtR3JvdXAuZ2V0KGRhdGFQb2ludGVyQXJyYXkuam9pbignLicpKTtcbiAgICBpZiAoZm9ybUNvbnRyb2wpIHsgcmV0dXJuIGZvcm1Db250cm9sOyB9XG4gIH1cblxuICAvLyBJZiBmb3JtR3JvdXAgaW5wdXQgaXMgYSBmb3JtR3JvdXAgdGVtcGxhdGUsXG4gIC8vIG9yIGZvcm1Hcm91cC5nZXQoKSBmYWlsZWQgdG8gcmV0dXJuIHRoZSBjb250cm9sLFxuICAvLyBzZWFyY2ggdGhlIGZvcm1Hcm91cCBvYmplY3QgZm9yIGRhdGFQb2ludGVyJ3MgY29udHJvbFxuICBsZXQgc3ViR3JvdXAgPSBmb3JtR3JvdXA7XG4gIGZvciAoY29uc3Qga2V5IG9mIGRhdGFQb2ludGVyQXJyYXkpIHtcbiAgICBpZiAoaGFzT3duKHN1Ykdyb3VwLCAnY29udHJvbHMnKSkgeyBzdWJHcm91cCA9IHN1Ykdyb3VwLmNvbnRyb2xzOyB9XG4gICAgaWYgKGlzQXJyYXkoc3ViR3JvdXApICYmIChrZXkgPT09ICctJykpIHtcbiAgICAgIHN1Ykdyb3VwID0gc3ViR3JvdXBbc3ViR3JvdXAubGVuZ3RoIC0gMV07XG4gICAgfSBlbHNlIGlmIChoYXNPd24oc3ViR3JvdXAsIGtleSkpIHtcbiAgICAgIHN1Ykdyb3VwID0gc3ViR3JvdXBba2V5XTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcihgZ2V0Q29udHJvbCBlcnJvcjogVW5hYmxlIHRvIGZpbmQgXCIke2tleX1cIiBpdGVtIGluIEZvcm1Hcm91cC5gKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZGF0YVBvaW50ZXIpO1xuICAgICAgY29uc29sZS5lcnJvcihmb3JtR3JvdXApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3ViR3JvdXA7XG59XG4iXX0=