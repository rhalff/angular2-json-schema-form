import * as tslib_1 from "tslib";
import * as _ from 'lodash';
import { inArray, isArray, isEmpty, isNumber, isObject, isDefined, isString } from './validator.functions';
import { copy, fixTitle, forEach, hasOwn } from './utility.functions';
import { JsonPointer } from './jsonpointer.functions';
import { getFromSchema, getInputType, checkInlineType, isInputRequired, removeRecursiveReferences, updateInputOptions } from './json-schema.functions';
/**
 * Layout function library:
 *
 * buildLayout:            Builds a complete layout from an input layout and schema
 *
 * buildLayoutFromSchema:  Builds a complete layout entirely from an input schema
 *
 * mapLayout:
 *
 * getLayoutNode:
 *
 * buildTitleMap:
 */
/**
 * 'buildLayout' function
 *
 * @param  { any } jsf
 * @param  { any } widgetLibrary
 * @return { any[] }
 */
export function buildLayout(jsf, widgetLibrary) {
    var hasSubmitButton = !JsonPointer.get(jsf, '/formOptions/addSubmit');
    var formLayout = mapLayout(jsf.layout, function (layoutItem, index, layoutPointer) {
        var currentIndex = index;
        var newNode = {
            _id: _.uniqueId(),
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
                    // Convert Angular Schema Form (AngularJS) 'validationMessage' to
                    // Angular JSON Schema Form 'validationMessages'
                    // TV4 codes from https://github.com/geraintluff/tv4/blob/master/source/api.js
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
        // If newNode does not have a dataPointer, try to find an equivalent
        if (!hasOwn(newNode, 'dataPointer')) {
            // If newNode has a key, change it to a dataPointer
            if (hasOwn(newNode, 'key')) {
                newNode.dataPointer = newNode.key === '*' ? newNode.key :
                    JsonPointer.compile(JsonPointer.parseObjectPath(newNode.key), '-');
                delete newNode.key;
                // If newNode is an array, search for dataPointer in child nodes
            }
            else if (hasOwn(newNode, 'type') && newNode.type.slice(-5) === 'array') {
                var findDataPointer_1 = function (items) {
                    if (items === null || typeof items !== 'object') {
                        return;
                    }
                    if (hasOwn(items, 'dataPointer')) {
                        return items.dataPointer;
                    }
                    if (isArray(items.items)) {
                        try {
                            for (var _a = tslib_1.__values(items.items), _b = _a.next(); !_b.done; _b = _a.next()) {
                                var item = _b.value;
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
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                    var e_1, _c;
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
            // TODO: Create function getFormValues(jsf, dataPointer, forRefLibrary)
            // check formOptions.setSchemaDefaults and formOptions.setLayoutDefaults
            // then set apropriate values from initialVaues, schema, or layout
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
                // Present checkboxes as single control, rather than array
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
                // TODO: create item in FormGroup model from layout key (?)
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
                // Fix insufficiently nested array item groups
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
                            // TODO: Check schema to get arrayItemType and removable
                            subItem.arrayItemType = 'list';
                            subItem.removable = newNode.options.removable !== false;
                        }
                    }
                    if (arrayItemGroup.length) {
                        newNode.items.push({
                            _id: _.uniqueId(),
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
                    // TODO: Fix to hndle multiple items
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
                        _.cloneDeep(newNode.items[newNode.items.length - 1]);
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
                // Add any additional default items
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
                // If needed, add button to add items to array
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
                        // If newNode doesn't have a title, look for title of parent array item
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
                        _id: _.uniqueId(),
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
        var fullLayout = _.cloneDeep(formLayout);
        if (fullLayout[fullLayout.length - 1].type === 'submit') {
            fullLayout.pop();
        }
        jsf.layoutRefLibrary[''] = {
            _id: null,
            dataPointer: '',
            dataType: 'object',
            items: fullLayout,
            name: '',
            options: _.cloneDeep(jsf.formOptions.defautWidgetOptions),
            recursiveReference: true,
            required: false,
            type: 'section',
            widget: widgetLibrary.getWidget('section'),
        };
    }
    if (!hasSubmitButton) {
        formLayout.push({
            _id: _.uniqueId(),
            options: { title: 'Submit' },
            type: 'submit',
            widget: widgetLibrary.getWidget('submit'),
        });
    }
    return formLayout;
}
/**
 * 'buildLayoutFromSchema' function
 *
 * @param  { any } jsf -
 * @param  { any } widgetLibrary -
 * @param  { any } nodeValue -
 * @param  { string = '' } schemaPointer -
 * @param  { string = '' } dataPointer -
 * @param  { boolean = false } arrayItem -
 * @param  { string = null } arrayItemType -
 * @param  { boolean = null } removable -
 * @param  { boolean = false } forRefLibrary -
 * @param  { string = '' } dataPointerPrefix -
 * @return { any }
 */
export function buildLayoutFromSchema(jsf, widgetLibrary, nodeValue, schemaPointer, dataPointer, arrayItem, arrayItemType, removable, forRefLibrary, dataPointerPrefix) {
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
        _id: forRefLibrary ? null : _.uniqueId(),
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
                        propertyKeys_1.splice.apply(propertyKeys_1, tslib_1.__spread([i, 1], unnamedKeys));
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
        // TODO: Add patternProperties and additionalProperties inputs?
        // ... possibly provide a way to enter both key names and values?
        // if (isObject(schema.patternProperties)) { }
        // if (isObject(schema.additionalProperties)) { }
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
        // If 'items' is an array = tuple items
        if (isArray(schema.items)) {
            newNode.items = [];
            for (var i = 0; i < newNode.options.tupleItems; i++) {
                var newItem = void 0;
                var itemRefPointer = removeRecursiveReferences(shortDataPointer + '/' + i, jsf.dataRecursiveRefMap, jsf.arrayMap);
                var itemRecursive = !itemRefPointer.length ||
                    itemRefPointer !== shortDataPointer + '/' + i;
                // If removable, add tuple item layout to layoutRefLibrary
                if (removable && i >= newNode.options.minItems) {
                    if (!hasOwn(jsf.layoutRefLibrary, itemRefPointer)) {
                        // Set to null first to prevent recursive reference from causing endless loop
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
            // If 'additionalItems' is an object = additional list items, after tuple items
            if (isObject(schema.additionalItems)) {
                additionalItemsSchemaPointer = schemaPointer + '/additionalItems';
            }
            // If 'items' is an object = list items only (no tuple items)
        }
        else if (isObject(schema.items)) {
            additionalItemsSchemaPointer = schemaPointer + '/items';
        }
        if (additionalItemsSchemaPointer) {
            var itemRefPointer = removeRecursiveReferences(shortDataPointer + '/-', jsf.dataRecursiveRefMap, jsf.arrayMap);
            var itemRecursive = !itemRefPointer.length ||
                itemRefPointer !== shortDataPointer + '/-';
            var itemSchemaPointer = removeRecursiveReferences(additionalItemsSchemaPointer, jsf.schemaRecursiveRefMap, jsf.arrayMap);
            // Add list item layout to layoutRefLibrary
            if (itemRefPointer.length && !hasOwn(jsf.layoutRefLibrary, itemRefPointer)) {
                // Set to null first to prevent recursive reference from causing endless loop
                jsf.layoutRefLibrary[itemRefPointer] = null;
                jsf.layoutRefLibrary[itemRefPointer] = buildLayoutFromSchema(jsf, widgetLibrary, null, itemSchemaPointer, itemRecursive ? '' : dataPointer + '/-', true, 'list', removable, true, itemRecursive ? dataPointer + '/-' : '');
                if (itemRecursive) {
                    jsf.layoutRefLibrary[itemRefPointer].recursiveReference = true;
                }
            }
            // Add any additional default items
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
            // If needed, add button to add items to array
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
                    _id: _.uniqueId(),
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
        // Get newNode title
        if (newNode.options.add) {
            buttonText = newNode.options.add;
        }
        else if (newNode.name && !/^\d+$/.test(newNode.name)) {
            buttonText =
                (/^add\b/i.test(newNode.name) ? '' : 'Add ') + fixTitle(newNode.name);
            // If newNode doesn't have a title, look for title of parent array item
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
        // Add layout template to layoutRefLibrary
        if (dataRef.length) {
            if (!hasOwn(jsf.layoutRefLibrary, dataRef)) {
                // Set to null first to prevent recursive reference from causing endless loop
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
/**
 * 'mapLayout' function
 *
 * Creates a new layout by running each element in an existing layout through
 * an iteratee. Recursively maps within array elements 'items' and 'tabs'.
 * The iteratee is invoked with four arguments: (value, index, layout, path)
 *
 * The returned layout may be longer (or shorter) then the source layout.
 *
 * If an item from the source layout returns multiple items (as '*' usually will),
 * this function will keep all returned items in-line with the surrounding items.
 *
 * If an item from the source layout causes an error and returns null, it is
 * skipped without error, and the function will still return all non-null items.
 *
 * @param  { any[] } layout - the layout to map
 * @param  { (v: any, i?: number, l?: any, p?: string) => any }
 *   function - the funciton to invoke on each element
 * @param  { string|string[] = '' } layoutPointer - the layoutPointer to layout, inside rootLayout
 * @param  { any[] = layout } rootLayout - the root layout, which conatins layout
 * @return { any[] }
 */
export function mapLayout(layout, fn, layoutPointer, rootLayout) {
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
/**
 * 'getLayoutNode' function
 * Copy a new layoutNode from layoutRefLibrary
 *
 * @param  { any } refNode -
 * @param  { any } layoutRefLibrary -
 * @param  { any = null } widgetLibrary -
 * @param  { any = null } nodeValue -
 * @return { any } copied layoutNode
 */
export function getLayoutNode(refNode, jsf, widgetLibrary, nodeValue) {
    if (widgetLibrary === void 0) { widgetLibrary = null; }
    if (nodeValue === void 0) { nodeValue = null; }
    // If recursive reference and building initial layout, return Add button
    if (refNode.recursiveReference && widgetLibrary) {
        var newLayoutNode = _.cloneDeep(refNode);
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
        // Otherwise, return referenced layout
    }
    else {
        var newLayoutNode = jsf.layoutRefLibrary[refNode.$ref];
        // If value defined, build new node from schema (to set array lengths)
        if (isDefined(nodeValue)) {
            newLayoutNode = buildLayoutFromSchema(jsf, widgetLibrary, nodeValue, JsonPointer.toSchemaPointer(refNode.$ref, jsf.schema), refNode.$ref, newLayoutNode.arrayItem, newLayoutNode.arrayItemType, newLayoutNode.options.removable, false);
        }
        else {
            // If value not defined, copy node from layoutRefLibrary
            newLayoutNode = _.cloneDeep(newLayoutNode);
            JsonPointer.forEachDeep(newLayoutNode, function (subNode, pointer) {
                // Reset all _id's in newLayoutNode to unique values
                if (hasOwn(subNode, '_id')) {
                    subNode._id = _.uniqueId();
                }
                // If adding a recursive item, prefix current dataPointer
                // to all dataPointers in new layoutNode
                if (refNode.recursiveReference && hasOwn(subNode, 'dataPointer')) {
                    subNode.dataPointer = refNode.dataPointer + subNode.dataPointer;
                }
            });
        }
        return newLayoutNode;
    }
}
/**
 * 'buildTitleMap' function
 *
 * @param  { any } titleMap -
 * @param  { any } enumList -
 * @param  { boolean = true } fieldRequired -
 * @param  { boolean = true } flatList -
 * @return { TitleMapItem[] }
 */
export function buildTitleMap(titleMap, enumList, fieldRequired, flatList) {
    if (fieldRequired === void 0) { fieldRequired = true; }
    if (flatList === void 0) { flatList = true; }
    var newTitleMap = [];
    var hasEmptyValue = false;
    if (titleMap) {
        if (isArray(titleMap)) {
            if (enumList) {
                try {
                    for (var _a = tslib_1.__values(Object.keys(titleMap)), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var i = _b.value;
                        if (isObject(titleMap[i])) {
                            var value = titleMap[i].value;
                            if (enumList.includes(value)) {
                                var name_1 = titleMap[i].name;
                                newTitleMap.push({ name: name_1, value: value });
                                if (value === undefined || value === null) {
                                    hasEmptyValue = true;
                                }
                            }
                        }
                        else if (isString(titleMap[i])) {
                            if (i < enumList.length) {
                                var name_2 = titleMap[i];
                                var value = enumList[i];
                                newTitleMap.push({ name: name_2, value: value });
                                if (value === undefined || value === null) {
                                    hasEmptyValue = true;
                                }
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            else {
                newTitleMap = titleMap;
                if (!fieldRequired) {
                    hasEmptyValue = !!newTitleMap
                        .filter(function (i) { return i.value === undefined || i.value === null; })
                        .length;
                }
            }
        }
        else if (enumList) {
            try {
                for (var _d = tslib_1.__values(Object.keys(enumList)), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var i = _e.value;
                    var value = enumList[i];
                    if (hasOwn(titleMap, value)) {
                        var name_3 = titleMap[value];
                        newTitleMap.push({ name: name_3, value: value });
                        if (value === undefined || value === null) {
                            hasEmptyValue = true;
                        }
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        else {
            try {
                for (var _g = tslib_1.__values(Object.keys(titleMap)), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var value = _h.value;
                    var name_4 = titleMap[value];
                    newTitleMap.push({ name: name_4, value: value });
                    if (value === undefined || value === null) {
                        hasEmptyValue = true;
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_j = _g.return)) _j.call(_g);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
    }
    else if (enumList) {
        try {
            for (var _k = tslib_1.__values(Object.keys(enumList)), _l = _k.next(); !_l.done; _l = _k.next()) {
                var i = _l.value;
                var name_5 = enumList[i];
                var value = enumList[i];
                newTitleMap.push({ name: name_5, value: value });
                if (value === undefined || value === null) {
                    hasEmptyValue = true;
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_l && !_l.done && (_m = _k.return)) _m.call(_k);
            }
            finally { if (e_5) throw e_5.error; }
        }
    }
    else {
        newTitleMap = [{ name: 'True', value: true }, { name: 'False', value: false }];
    }
    // Does titleMap have groups?
    if (newTitleMap.some(function (title) { return hasOwn(title, 'group'); })) {
        hasEmptyValue = false;
        // If flatList = true, flatten items & update name to group: name
        if (flatList) {
            newTitleMap = newTitleMap.reduce(function (groupTitleMap, title) {
                if (hasOwn(title, 'group')) {
                    if (isArray(title.items)) {
                        groupTitleMap = tslib_1.__spread(groupTitleMap, title.items.map(function (item) {
                            return (tslib_1.__assign({}, item, { name: title.group + ": " + item.name }));
                        }));
                        if (title.items.some(function (item) { return item.value === undefined || item.value === null; })) {
                            hasEmptyValue = true;
                        }
                    }
                    if (hasOwn(title, 'name') && hasOwn(title, 'value')) {
                        title.name = title.group + ": " + title.name;
                        delete title.group;
                        groupTitleMap.push(title);
                        if (title.value === undefined || title.value === null) {
                            hasEmptyValue = true;
                        }
                    }
                }
                else {
                    groupTitleMap.push(title);
                    if (title.value === undefined || title.value === null) {
                        hasEmptyValue = true;
                    }
                }
                return groupTitleMap;
            }, []);
            // If flatList = false, combine items from matching groups
        }
        else {
            newTitleMap = newTitleMap.reduce(function (groupTitleMap, title) {
                if (hasOwn(title, 'group')) {
                    if (title.group !== (groupTitleMap[groupTitleMap.length - 1] || {}).group) {
                        groupTitleMap.push({ group: title.group, items: title.items || [] });
                    }
                    if (hasOwn(title, 'name') && hasOwn(title, 'value')) {
                        groupTitleMap[groupTitleMap.length - 1].items
                            .push({ name: title.name, value: title.value });
                        if (title.value === undefined || title.value === null) {
                            hasEmptyValue = true;
                        }
                    }
                }
                else {
                    groupTitleMap.push(title);
                    if (title.value === undefined || title.value === null) {
                        hasEmptyValue = true;
                    }
                }
                return groupTitleMap;
            }, []);
        }
    }
    if (!fieldRequired && !hasEmptyValue) {
        newTitleMap.unshift({ name: '<em>None</em>', value: null });
    }
    return newTitleMap;
    var e_2, _c, e_3, _f, e_4, _j, e_5, _m;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmZ1bmN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWpzb24tc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJzcmMvc2hhcmVkL2xheW91dC5mdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRzVCLE9BQU8sRUFDTCxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQ25FLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RFLE9BQU8sRUFBVyxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMvRCxPQUFPLEVBQ0wsYUFBYSxFQUFFLFlBQVksRUFBZ0IsZUFBZSxFQUFFLGVBQWUsRUFDM0UseUJBQXlCLEVBQUUsa0JBQWtCLEVBQzlDLE1BQU0seUJBQXlCLENBQUM7QUFHakM7Ozs7Ozs7Ozs7OztHQVlHO0FBRUg7Ozs7OztHQU1HO0FBQ0gsTUFBTSxzQkFBc0IsR0FBRyxFQUFFLGFBQWE7SUFDNUMsSUFBSSxlQUFlLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0lBQ3RFLElBQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFVBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxhQUFhO1FBQ3hFLElBQU0sWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFNLE9BQU8sR0FBUTtZQUNuQixHQUFHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPLEVBQUUsRUFBRTtTQUNaLENBQUM7UUFDRixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2lCQUNqQixNQUFNLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pDLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsVUFBVTtnQkFDdEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxRQUFRO2FBQzFFLENBQUMsRUFIZ0IsQ0FHaEIsQ0FBQztpQkFDRixPQUFPLENBQUMsVUFBQSxNQUFNO2dCQUNiLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMxQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztZQUNMLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekQsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUM5QixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDeEIsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO29CQUMvQyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUNoQyxDQUFDO1lBQ0gsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0MsT0FBTyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztvQkFDbkUsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztvQkFFdkMsaUVBQWlFO29CQUNqRSxnREFBZ0Q7b0JBQ2hELDhFQUE4RTtnQkFDOUUsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hELEVBQUUsQ0FBQyxDQUFDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO3dCQUMxRCxPQUFPLENBQUMsT0FBTyxDQUFDLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUM7b0JBQ3pFLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sT0FBTyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUM7d0JBQ3hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7NEJBQ3hELElBQU0sSUFBSSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7NEJBQ3RCLElBQU0sTUFBTSxHQUNWLElBQUksS0FBTSxHQUFHLENBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dDQUN6QixJQUFJLEtBQU0sR0FBRyxDQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQ0FDekIsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7d0NBQy9CLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRDQUM1QixJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dEQUNyQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztvREFDNUIsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQzt3REFDckMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7NERBQzlCLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dFQUM5QixJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztvRUFDNUIsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7d0VBQ2xDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDOzRFQUNsQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnRkFDN0IsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7b0ZBQ2pDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dGQUM3QixJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQzs0RkFDN0IsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7Z0dBQ2hDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQzs0QkFDeEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN0RixDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDO29CQUNELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztnQkFDM0MsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pELE9BQU8sQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQ25DLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxPQUFPLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQztRQUMzQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixPQUFPLENBQUMsS0FBSyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7WUFDeEUsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUNELElBQUksVUFBVSxHQUFRLElBQUksQ0FBQztRQUUzQixvRUFBb0U7UUFDcEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVwQyxtREFBbUQ7WUFDbkQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE9BQU8sQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdkQsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDckUsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUVyQixnRUFBZ0U7WUFDaEUsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDekUsSUFBTSxpQkFBZSxHQUFHLFVBQUMsS0FBSztvQkFDNUIsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQztvQkFBQyxDQUFDO29CQUM1RCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztvQkFBQyxDQUFDO29CQUMvRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7NEJBQ3pCLEdBQUcsQ0FBQyxDQUFlLElBQUEsS0FBQSxpQkFBQSxLQUFLLENBQUMsS0FBSyxDQUFBLGdCQUFBO2dDQUF6QixJQUFNLElBQUksV0FBQTtnQ0FDYixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDekUsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7Z0NBQzFCLENBQUM7Z0NBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQzFCLElBQU0sVUFBVSxHQUFHLGlCQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7b0NBQ3pDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7d0NBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztvQ0FBQyxDQUFDO2dDQUN4QyxDQUFDOzZCQUNGOzs7Ozs7Ozs7b0JBQ0gsQ0FBQzs7Z0JBQ0gsQ0FBQyxDQUFDO2dCQUNGLElBQU0sZ0JBQWdCLEdBQUcsaUJBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbEQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO29CQUNyQixPQUFPLENBQUMsV0FBVzt3QkFDakIsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbEUsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxNQUFNLENBQUMscUJBQXFCLENBQUMsR0FBRyxFQUFFLGFBQWEsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkUsQ0FBQztZQUNELElBQU0sU0FBUyxHQUNiLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUU3RSx1RUFBdUU7WUFDdkUsd0VBQXdFO1lBQ3hFLGtFQUFrRTtZQUVsRSxPQUFPLENBQUMsV0FBVztnQkFDakIsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xFLElBQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzFELE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1lBQ3pCLENBQUM7WUFDRCxJQUFNLGdCQUFnQixHQUFHLHlCQUF5QixDQUNoRCxPQUFPLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUMzRCxDQUFDO1lBQ0YsSUFBTSxXQUFTLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNO2dCQUN4QyxnQkFBZ0IsS0FBSyxPQUFPLENBQUMsV0FBVyxDQUFDO1lBQzNDLElBQUksYUFBYSxTQUFRLENBQUM7WUFDMUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQy9DLENBQUM7WUFDRCxJQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3RELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxhQUFhLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNuRCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sYUFBYSxHQUFHLFdBQVcsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMxRSxXQUFXLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUNsRCxDQUFDO1lBQ0QsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDeEQsVUFBVSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztZQUN4RCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNmLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDbkQsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xELElBQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ25DLE9BQU8sQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDakQsT0FBTyxDQUFDLEtBQUssQ0FBQywwQkFBdUIsYUFBYSxRQUFJO3lCQUNwRCw0Q0FBeUMsT0FBTyxDQUFDLElBQUksUUFBSSxDQUFBLENBQUMsQ0FBQztnQkFDL0QsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixPQUFPLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDcEUsQ0FBQztnQkFDRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakUsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNuRCxDQUFDO2dCQUNELE9BQU8sQ0FBQyxRQUFRO29CQUNkLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsRSxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUU3QywwREFBMEQ7Z0JBQzFELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssWUFBWSxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqRSxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDckQsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUN4QyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUNqQyxVQUFVLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQzlELENBQUM7b0JBQ0YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FDakMsVUFBVSxDQUFDLFFBQVEsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUN4RCxDQUFDO29CQUNGLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQ2xDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDMUUsQ0FBQztvQkFDRixPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVU7d0JBQ3hCLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzt3QkFDMUQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ3RELE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztvQkFDaEMsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRO3dCQUNqQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQy9DLENBQUMsQ0FBQyxDQUFDO3dCQUNELE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUzs0QkFDdkIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7b0JBQzFELENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUTt3QkFDakMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUMvQyxDQUFDLENBQUMsQ0FBQzt3QkFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVM7NEJBQ3ZCLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO29CQUMxRCxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ3RELFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ3RELFdBQVcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQzFELFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzFELENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDeEMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDakUsQ0FBQztnQkFDSCxDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDL0MsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUNoQyxHQUFHLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDNUIsQ0FBQztZQUNILENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTiwyREFBMkQ7Z0JBQzNELGtCQUFrQixDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDdkMsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFELE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakQsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUNwRCxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzlELENBQUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJO3dCQUNoRSxPQUFBLFdBQVcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUM7b0JBQTNELENBQTJELENBQzVELENBQUM7Z0JBQ0osQ0FBQztZQUNILENBQUM7WUFFRCxPQUFPLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZELFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFMUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPO2dCQUM5QixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxDQUNqRSxDQUFDLENBQUMsQ0FBQztnQkFDRCxJQUFNLGdCQUFjLEdBQUcseUJBQXlCLENBQzlDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUNsRSxDQUFDO2dCQUNGLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWMsRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQzdDLENBQUM7Z0JBQ0QsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBRTVELDhDQUE4QztnQkFDOUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDO29CQUMxQixJQUFNLHNCQUFzQixHQUFHLEVBQUUsQ0FBQztvQkFDbEMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO29CQUNqQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUNuRCxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNqQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQzs0QkFDaEMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLGdCQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssZ0JBQzFELENBQUMsQ0FBQyxDQUFDOzRCQUNELElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDaEQsU0FBUyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUk7Z0NBQ2hELFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLGdCQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQ3JELGNBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQ2xDLFFBQVEsRUFBRSxDQUFDO3dCQUNiLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ04sT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7NEJBQ3pCLHdEQUF3RDs0QkFDeEQsT0FBTyxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7NEJBQy9CLE9BQU8sQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEtBQUssS0FBSyxDQUFDO3dCQUMxRCxDQUFDO29CQUNILENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQzFCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOzRCQUNqQixHQUFHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRTs0QkFDakIsU0FBUyxFQUFFLElBQUk7NEJBQ2YsYUFBYSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQ2hFLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTTs0QkFDbEIsS0FBSyxFQUFFLGNBQWM7NEJBQ3JCLE9BQU8sRUFBRSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsS0FBSyxLQUFLLEdBQUc7NEJBQzVELFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUk7NEJBQ3ZDLElBQUksRUFBRSxTQUFTOzRCQUNmLE1BQU0sRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQzt5QkFDM0MsQ0FBQyxDQUFDO29CQUNMLENBQUM7Z0JBQ0gsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixvQ0FBb0M7b0JBQ3BDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztvQkFDbEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7d0JBQ2xDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVzs0QkFDMUIsV0FBVyxDQUFDLGdCQUFnQixDQUFDLGdCQUFjLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUMvRCxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzVELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQzVDLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDeEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztvQkFDN0MsQ0FBQztvQkFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQzVCLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDbEQsQ0FBQztnQkFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0IsSUFBTSxjQUFjLEdBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQXBCLENBQW9CLENBQUMsQ0FBQyxNQUFNO3dCQUN2RCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztvQkFDL0IsRUFBRSxDQUFDLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDL0MsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDO3dCQUMzQyxXQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQztvQkFDL0MsQ0FBQztnQkFDSCxDQUFDO2dCQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsRCxHQUFHLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWMsQ0FBQzt3QkFDbEMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZELEVBQUUsQ0FBQyxDQUFDLFdBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQ2QsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGdCQUFjLENBQUMsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7b0JBQ2pFLENBQUM7b0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBYyxDQUFDLEVBQUUsVUFBQyxJQUFJLEVBQUUsR0FBRzt3QkFDdEQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7d0JBQUMsQ0FBQzt3QkFDN0MsRUFBRSxDQUFDLENBQUMsV0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDZCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxnQkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUNuRSxDQUFDO3dCQUNILENBQUM7b0JBQ0gsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUNqQixDQUFDO2dCQUVELG1DQUFtQztnQkFDbkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUM1RCxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQ25DLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUN0RCxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDMUMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUM3QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ3hELE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQzs0QkFDL0IsSUFBSSxFQUFFLGdCQUFjOzRCQUNwQixXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVc7NEJBQ2hDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxrQkFBa0I7eUJBQy9DLEVBQUUsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCw4Q0FBOEM7Z0JBQzlDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLEtBQUs7b0JBQ25DLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUTtvQkFDbkQsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUMzRCxDQUFDLENBQUMsQ0FBQztvQkFDRCxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7b0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDMUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO3dCQUNyQyxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLFVBQVUsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7d0JBQzVDLENBQUM7b0JBQ0gsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNqQyxVQUFVLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQzdDLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ04sVUFBVSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3RDLENBQUM7d0JBRUgsdUVBQXVFO29CQUN2RSxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLElBQU0sWUFBWSxHQUNoQixhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDO3dCQUNqRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDbEMsVUFBVSxJQUFJLE1BQU0sR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO3dCQUM1QyxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLElBQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDOzRCQUM1RCxVQUFVLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN6RSxDQUFDO29CQUNILENBQUM7b0JBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7d0JBQ2pCLEdBQUcsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFO3dCQUNqQixTQUFTLEVBQUUsSUFBSTt3QkFDZixhQUFhLEVBQUUsTUFBTTt3QkFDckIsV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSTt3QkFDdkMsT0FBTyxFQUFFOzRCQUNQLFNBQVMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVM7NEJBQ3BDLFFBQVEsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVE7NEJBQ2xDLFFBQVEsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVE7NEJBQ2xDLFNBQVMsRUFBRSxLQUFLOzRCQUNoQixLQUFLLEVBQUUsVUFBVTs0QkFDakIsVUFBVSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVTt5QkFDdkM7d0JBQ0Qsa0JBQWtCLEVBQUUsV0FBUzt3QkFDN0IsSUFBSSxFQUFFLE1BQU07d0JBQ1osTUFBTSxFQUFFLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO3dCQUN2QyxJQUFJLEVBQUUsZ0JBQWM7cUJBQ3JCLENBQUMsQ0FBQztvQkFDSCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3JELE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVU7NEJBQ3hELE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO3dCQUNwQixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO3dCQUN6QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFBQyxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUM7d0JBQUMsQ0FBQztvQkFDdkQsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQzVCLENBQUM7UUFDSCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0QsSUFBTSxVQUFVLEdBQ2QsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDekQsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsT0FBTyxDQUFDLElBQUk7b0JBQ1YsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNoRSxDQUFDO1lBQ0QsT0FBTyxDQUFDLFNBQVMsR0FBRyxVQUFVLEtBQUssT0FBTyxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQsa0JBQWtCLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUFDLENBQUM7UUFDMUQsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNqQixDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFDOUUsR0FBRyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxHQUFHO1lBQ3pCLEdBQUcsRUFBRSxJQUFJO1lBQ1QsV0FBVyxFQUFFLEVBQUU7WUFDZixRQUFRLEVBQUUsUUFBUTtZQUNsQixLQUFLLEVBQUUsVUFBVTtZQUNqQixJQUFJLEVBQUUsRUFBRTtZQUNSLE9BQU8sRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUM7WUFDekQsa0JBQWtCLEVBQUUsSUFBSTtZQUN4QixRQUFRLEVBQUUsS0FBSztZQUNmLElBQUksRUFBRSxTQUFTO1lBQ2YsTUFBTSxFQUFFLGFBQWEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1NBQzNDLENBQUM7SUFDSixDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDZCxHQUFHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO1lBQzVCLElBQUksRUFBRSxRQUFRO1lBQ2QsTUFBTSxFQUFFLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1NBQzFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDO0FBQ3BCLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0sZ0NBQ0osR0FBRyxFQUFFLGFBQWEsRUFBRSxTQUFnQixFQUFFLGFBQWtCLEVBQ3hELFdBQWdCLEVBQUUsU0FBaUIsRUFBRSxhQUE0QixFQUNqRSxTQUF5QixFQUFFLGFBQXFCLEVBQUUsaUJBQXNCO0lBRnBELDBCQUFBLEVBQUEsZ0JBQWdCO0lBQUUsOEJBQUEsRUFBQSxrQkFBa0I7SUFDeEQsNEJBQUEsRUFBQSxnQkFBZ0I7SUFBRSwwQkFBQSxFQUFBLGlCQUFpQjtJQUFFLDhCQUFBLEVBQUEsb0JBQTRCO0lBQ2pFLDBCQUFBLEVBQUEsZ0JBQXlCO0lBQUUsOEJBQUEsRUFBQSxxQkFBcUI7SUFBRSxrQ0FBQSxFQUFBLHNCQUFzQjtJQUV4RSxJQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDMUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDcEQsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FDakMsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQUMsQ0FBQztJQUNsQixJQUFNLFdBQVcsR0FBVyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakQsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FDM0IsR0FBRyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsS0FBSyxJQUFJO1FBQzFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsS0FBSyxNQUFNLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUMxRSxDQUFDLENBQUMsQ0FBQztRQUNGLFNBQVMsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxHQUFHLFVBQVUsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFDRCxJQUFJLE9BQU8sR0FBUTtRQUNqQixHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7UUFDeEMsU0FBUyxFQUFFLFNBQVM7UUFDcEIsV0FBVyxFQUFFLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUNwRSxRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2pFLE9BQU8sRUFBRSxFQUFFO1FBQ1gsUUFBUSxFQUFFLGVBQWUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQztRQUNwRCxJQUFJLEVBQUUsV0FBVztRQUNqQixNQUFNLEVBQUUsYUFBYSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7S0FDN0MsQ0FBQztJQUNGLElBQU0sV0FBVyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzNELEVBQUUsQ0FBQyxDQUFDLFdBQVcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7SUFBQyxDQUFDO0lBQ3hELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsS0FBSyxLQUFLLENBQUM7SUFDbEQsQ0FBQztJQUNELElBQU0sZ0JBQWdCLEdBQUcseUJBQXlCLENBQ2hELGlCQUFpQixHQUFHLFdBQVcsRUFBRSxHQUFHLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FDdkUsQ0FBQztJQUNGLElBQU0sU0FBUyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsTUFBTTtRQUN4QyxnQkFBZ0IsS0FBSyxpQkFBaUIsR0FBRyxXQUFXLENBQUM7SUFDdkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNELElBQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDdEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxXQUFXLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNoRCxXQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFDRCxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDbEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdELFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBTSxZQUFVLEdBQVUsRUFBRSxDQUFDO1lBQzdCLElBQU0sY0FBWSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMxRSxFQUFFLENBQUMsQ0FBQyxjQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRSxJQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7cUJBQy9DLE1BQU0sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLENBQUMsY0FBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDO2dCQUM5QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxjQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQ2xELEVBQUUsQ0FBQyxDQUFDLGNBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUM1QixjQUFZLENBQUMsTUFBTSxPQUFuQixjQUFZLG9CQUFRLENBQUMsRUFBRSxDQUFDLEdBQUssV0FBVyxHQUFFO29CQUM1QyxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1lBQ0QsY0FBWTtpQkFDVCxNQUFNLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUM7Z0JBQzNDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsc0JBQXNCLENBQUMsRUFEekIsQ0FDeUIsQ0FDdkM7aUJBQ0EsT0FBTyxDQUFDLFVBQUEsR0FBRztnQkFDVixJQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZELGNBQWMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDO2dCQUNqRCxJQUFNLFNBQVMsR0FBRyxxQkFBcUIsQ0FDckMsR0FBRyxFQUFFLGFBQWEsRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUMvRCxhQUFhLEdBQUcsZ0JBQWdCLEVBQ2hDLFdBQVcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUN2QixLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsaUJBQWlCLENBQ3BELENBQUM7Z0JBQ0YsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDZCxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQzt3QkFDbEMsR0FBRyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7b0JBQzVCLENBQUM7b0JBQ0QsWUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDN0IsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsRUFBRSxDQUFDLENBQUMsV0FBVyxLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLE9BQU8sR0FBRyxZQUFVLENBQUM7WUFDdkIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxLQUFLLEdBQUcsWUFBVSxDQUFDO1lBQzdCLENBQUM7UUFDSCxDQUFDO1FBQ0QsK0RBQStEO1FBQy9ELGlFQUFpRTtRQUNqRSw4Q0FBOEM7UUFDOUMsaURBQWlEO0lBRW5ELENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQU0sYUFBYSxHQUFVLEVBQUUsQ0FBQztRQUNoQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUNqQyxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQzFELENBQUM7UUFDRixPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUNqQyxNQUFNLENBQUMsUUFBUSxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQ3BELENBQUM7UUFDRixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLGVBQWUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1RSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUM3RSxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUMzRCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUN0RCxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVE7WUFDakMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUMvQyxDQUFDLENBQUMsQ0FBQztZQUNELE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQ3BGLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRO1lBQ2pDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FDL0MsQ0FBQyxDQUFDLENBQUM7WUFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUNwRixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RELFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEQsV0FBVyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMxRCxXQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFELENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakUsQ0FBQztRQUNELFNBQVMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsS0FBSyxLQUFLLENBQUM7UUFDaEQsSUFBSSw0QkFBNEIsR0FBVyxJQUFJLENBQUM7UUFFaEQsdUNBQXVDO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ25CLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDcEQsSUFBSSxPQUFPLFNBQUssQ0FBQztnQkFDakIsSUFBTSxjQUFjLEdBQUcseUJBQXlCLENBQzlDLGdCQUFnQixHQUFHLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQ2xFLENBQUM7Z0JBQ0YsSUFBTSxhQUFhLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTTtvQkFDMUMsY0FBYyxLQUFLLGdCQUFnQixHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBRWhELDBEQUEwRDtnQkFDMUQsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQy9DLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2xELDZFQUE2RTt3QkFDN0UsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQzt3QkFDNUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxHQUFHLHFCQUFxQixDQUMxRCxHQUFHLEVBQUUsYUFBYSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQzVELGFBQWEsR0FBRyxTQUFTLEdBQUcsQ0FBQyxFQUM3QixhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLEdBQUcsR0FBRyxDQUFDLEVBQzFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ3RFLENBQUM7d0JBQ0YsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzs0QkFDbEIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQzt3QkFDakUsQ0FBQztvQkFDSCxDQUFDO29CQUNELE9BQU8sR0FBRyxhQUFhLENBQUM7d0JBQ3RCLElBQUksRUFBRSxjQUFjO3dCQUNwQixXQUFXLEVBQUUsV0FBVyxHQUFHLEdBQUcsR0FBRyxDQUFDO3dCQUNsQyxrQkFBa0IsRUFBRSxhQUFhO3FCQUNsQyxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuRSxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE9BQU8sR0FBRyxxQkFBcUIsQ0FDN0IsR0FBRyxFQUFFLGFBQWEsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUM1RCxhQUFhLEdBQUcsU0FBUyxHQUFHLENBQUMsRUFDN0IsV0FBVyxHQUFHLEdBQUcsR0FBRyxDQUFDLEVBQ3JCLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsQ0FDdkQsQ0FBQztnQkFDSixDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQUMsQ0FBQztZQUMvQyxDQUFDO1lBRUQsK0VBQStFO1lBQy9FLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyw0QkFBNEIsR0FBRyxhQUFhLEdBQUcsa0JBQWtCLENBQUM7WUFDcEUsQ0FBQztZQUVILDZEQUE2RDtRQUM3RCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLDRCQUE0QixHQUFHLGFBQWEsR0FBRyxRQUFRLENBQUM7UUFDMUQsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFNLGNBQWMsR0FBRyx5QkFBeUIsQ0FDOUMsZ0JBQWdCLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUMvRCxDQUFDO1lBQ0YsSUFBTSxhQUFhLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTTtnQkFDMUMsY0FBYyxLQUFLLGdCQUFnQixHQUFHLElBQUksQ0FBQztZQUM3QyxJQUFNLGlCQUFpQixHQUFHLHlCQUF5QixDQUNqRCw0QkFBNEIsRUFBRSxHQUFHLENBQUMscUJBQXFCLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FDdEUsQ0FBQztZQUNGLDJDQUEyQztZQUMzQyxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNFLDZFQUE2RTtnQkFDN0UsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDNUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxHQUFHLHFCQUFxQixDQUMxRCxHQUFHLEVBQUUsYUFBYSxFQUFFLElBQUksRUFDeEIsaUJBQWlCLEVBQ2pCLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUN2QyxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ3ZFLENBQUM7Z0JBQ0YsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDbEIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztnQkFDakUsQ0FBQztZQUNILENBQUM7WUFFRCxtQ0FBbUM7WUFDbkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQ25DLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pCLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUN4RCxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDMUMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM3QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ3hELE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQzs0QkFDL0IsSUFBSSxFQUFFLGNBQWM7NEJBQ3BCLFdBQVcsRUFBRSxXQUFXLEdBQUcsSUFBSTs0QkFDL0Isa0JBQWtCLEVBQUUsYUFBYTt5QkFDbEMsRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNwRSxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1lBRUQsOENBQThDO1lBQzlDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLEtBQUs7Z0JBQ25DLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUTtnQkFDbkQsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUMzRCxDQUFDLENBQUMsQ0FBQztnQkFDRCxJQUFJLFVBQVUsR0FDWixDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ3JFLElBQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQy9DLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDaEIsVUFBVSxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDeEUsQ0FBQztnQkFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUFDLFVBQVUsR0FBRyxNQUFNLEdBQUcsVUFBVSxDQUFDO2dCQUFDLENBQUM7Z0JBQ3RFLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUNqQixHQUFHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtvQkFDakIsU0FBUyxFQUFFLElBQUk7b0JBQ2YsYUFBYSxFQUFFLE1BQU07b0JBQ3JCLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUk7b0JBQ3ZDLE9BQU8sRUFBRTt3QkFDUCxTQUFTLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTO3dCQUNwQyxRQUFRLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRO3dCQUNsQyxRQUFRLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRO3dCQUNsQyxTQUFTLEVBQUUsS0FBSzt3QkFDaEIsS0FBSyxFQUFFLFVBQVU7d0JBQ2pCLFVBQVUsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVU7cUJBQ3ZDO29CQUNELGtCQUFrQixFQUFFLGFBQWE7b0JBQ2pDLElBQUksRUFBRSxNQUFNO29CQUNaLE1BQU0sRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztvQkFDdkMsSUFBSSxFQUFFLGNBQWM7aUJBQ3JCLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDO0lBRUgsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsSUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pFLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUVwQixvQkFBb0I7UUFDcEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNuQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkQsVUFBVTtnQkFDUixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFMUUsdUVBQXVFO1FBQ3ZFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQU0sWUFBWSxHQUNoQixXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxVQUFVLEdBQUcsU0FBUyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFDOUMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUM1RCxVQUFVLEdBQUcsU0FBUyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNFLENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDckIsa0JBQWtCLEVBQUUsSUFBSTtZQUN4QixNQUFNLEVBQUUsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFDdkMsSUFBSSxFQUFFLE9BQU87U0FDZCxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDN0IsU0FBUyxFQUFFLEtBQUs7WUFDaEIsS0FBSyxFQUFFLFVBQVU7U0FDbEIsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUTtnQkFDdEIsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDL0QsQ0FBQztRQUVELDBDQUEwQztRQUMxQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNuQixFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyw2RUFBNkU7Z0JBQzdFLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ3JDLElBQU0sU0FBUyxHQUFHLHFCQUFxQixDQUNyQyxHQUFHLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUN2QyxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLENBQ2xFLENBQUM7Z0JBQ0YsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDZCxTQUFTLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO29CQUNwQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxDQUFDO2dCQUM1QyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE9BQU8sR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN2QyxDQUFDO1lBQ0gsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7Z0JBQzdELEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7WUFDMUQsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILE1BQU0sb0JBQW9CLE1BQU0sRUFBRSxFQUFFLEVBQUUsYUFBa0IsRUFBRSxVQUFtQjtJQUF2Qyw4QkFBQSxFQUFBLGtCQUFrQjtJQUFFLDJCQUFBLEVBQUEsbUJBQW1CO0lBQzNFLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztJQUNqQixJQUFJLFNBQVMsR0FBVSxFQUFFLENBQUM7SUFDMUIsT0FBTyxDQUFDLE1BQU0sRUFBRSxVQUFDLElBQUksRUFBRSxLQUFLO1FBQzFCLElBQU0sU0FBUyxHQUFHLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztRQUNwQyxJQUFNLGdCQUFnQixHQUFHLGFBQWEsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDO1FBQ3pELElBQUksT0FBTyxHQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixJQUFJLFVBQVUsR0FBVSxFQUFFLENBQUM7UUFDM0IsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUN2QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbkIsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixVQUFVLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0QsQ0FBQztRQUNILENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN0QixPQUFPLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFLGdCQUFnQixHQUFHLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNyRixDQUFDO1FBQ0QsT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9ELEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixRQUFRLEVBQUUsQ0FBQztRQUNiLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQUMsQ0FBQztZQUN6RCxTQUFTLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFFRDs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLHdCQUNKLE9BQU8sRUFBRSxHQUFHLEVBQUUsYUFBeUIsRUFBRSxTQUFxQjtJQUFoRCw4QkFBQSxFQUFBLG9CQUF5QjtJQUFFLDBCQUFBLEVBQUEsZ0JBQXFCO0lBRzlELHdFQUF3RTtJQUN4RSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQztRQUNoRCxJQUFNLGFBQWEsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFBQyxhQUFhLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUU7WUFDM0Isa0JBQWtCLEVBQUUsSUFBSTtZQUN4QixNQUFNLEVBQUUsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7U0FDeEMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFO1lBQ25DLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLEtBQUssRUFBRSxNQUFNLEdBQUcsYUFBYSxDQUFDLElBQUk7U0FDbkMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FBQztRQUV2QixzQ0FBc0M7SUFDeEMsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osSUFBSSxhQUFhLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxzRUFBc0U7UUFDdEUsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixhQUFhLEdBQUcscUJBQXFCLENBQ25DLEdBQUcsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUM3QixXQUFXLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUNyRCxPQUFPLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxTQUFTLEVBQ3JDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUNwRSxDQUFDO1FBQ0osQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sd0RBQXdEO1lBQ3hELGFBQWEsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzNDLFdBQVcsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFVBQUMsT0FBTyxFQUFFLE9BQU87Z0JBRXRELG9EQUFvRDtnQkFDcEQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQUMsQ0FBQztnQkFFM0QseURBQXlEO2dCQUN6RCx3Q0FBd0M7Z0JBQ3hDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakUsT0FBTyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7Z0JBQ2xFLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxNQUFNLENBQUMsYUFBYSxDQUFDO0lBQ3ZCLENBQUM7QUFDSCxDQUFDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLHdCQUNKLFFBQVEsRUFBRSxRQUFRLEVBQUUsYUFBb0IsRUFBRSxRQUFlO0lBQXJDLDhCQUFBLEVBQUEsb0JBQW9CO0lBQUUseUJBQUEsRUFBQSxlQUFlO0lBRXpELElBQUksV0FBVyxHQUFtQixFQUFFLENBQUM7SUFDckMsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO0lBQzFCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDYixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7O29CQUNiLEdBQUcsQ0FBQyxDQUFZLElBQUEsS0FBQSxpQkFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBLGdCQUFBO3dCQUFoQyxJQUFNLENBQUMsV0FBQTt3QkFDVixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUMxQixJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDOzRCQUNoQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDN0IsSUFBTSxNQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQ0FDOUIsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksUUFBQSxFQUFFLEtBQUssT0FBQSxFQUFFLENBQUMsQ0FBQztnQ0FDbEMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztvQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2dDQUFDLENBQUM7NEJBQ3RFLENBQUM7d0JBQ0gsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDakMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dDQUN4QixJQUFNLE1BQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3pCLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDMUIsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksUUFBQSxFQUFFLEtBQUssT0FBQSxFQUFFLENBQUMsQ0FBQztnQ0FDbEMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztvQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2dDQUFDLENBQUM7NEJBQ3RFLENBQUM7d0JBQ0gsQ0FBQztxQkFDRjs7Ozs7Ozs7O1lBQ0gsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLFdBQVcsR0FBRyxRQUFRLENBQUM7Z0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDbkIsYUFBYSxHQUFHLENBQUMsQ0FBQyxXQUFXO3lCQUMxQixNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksRUFBekMsQ0FBeUMsQ0FBQzt5QkFDdEQsTUFBTSxDQUFDO2dCQUNaLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOztnQkFDcEIsR0FBRyxDQUFDLENBQVksSUFBQSxLQUFBLGlCQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUEsZ0JBQUE7b0JBQWhDLElBQU0sQ0FBQyxXQUFBO29CQUNWLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzVCLElBQU0sTUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDN0IsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksUUFBQSxFQUFFLEtBQUssT0FBQSxFQUFFLENBQUMsQ0FBQzt3QkFDbEMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO3dCQUFDLENBQUM7b0JBQ3RFLENBQUM7aUJBQ0Y7Ozs7Ozs7OztRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQzs7Z0JBQ04sR0FBRyxDQUFDLENBQWdCLElBQUEsS0FBQSxpQkFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBLGdCQUFBO29CQUFwQyxJQUFNLEtBQUssV0FBQTtvQkFDZCxJQUFNLE1BQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzdCLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLFFBQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxDQUFDLENBQUM7b0JBQ2xDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztvQkFBQyxDQUFDO2lCQUNyRTs7Ozs7Ozs7O1FBQ0gsQ0FBQztJQUNILENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7WUFDcEIsR0FBRyxDQUFDLENBQVksSUFBQSxLQUFBLGlCQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUEsZ0JBQUE7Z0JBQWhDLElBQU0sQ0FBQyxXQUFBO2dCQUNWLElBQU0sTUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxRQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUMsQ0FBQyxDQUFDO2dCQUNqQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7Z0JBQUMsQ0FBQzthQUNyRTs7Ozs7Ozs7O0lBQ0gsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sV0FBVyxHQUFHLENBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFFLENBQUM7SUFDbkYsQ0FBQztJQUVELDZCQUE2QjtJQUM3QixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsTUFBTSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RCxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBRXRCLGlFQUFpRTtRQUNqRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2IsV0FBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBQyxhQUFhLEVBQUUsS0FBSztnQkFDcEQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN6QixhQUFhLG9CQUNSLGFBQWEsRUFDYixLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUk7NEJBQ3JCLE9BQUEsc0JBQU0sSUFBSSxFQUFLLEVBQUUsSUFBSSxFQUFLLEtBQUssQ0FBQyxLQUFLLFVBQUssSUFBSSxDQUFDLElBQU0sRUFBRSxFQUFHO3dCQUExRCxDQUEwRCxDQUMzRCxDQUNGLENBQUM7d0JBQ0YsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksRUFBL0MsQ0FBK0MsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDOUUsYUFBYSxHQUFHLElBQUksQ0FBQzt3QkFDdkIsQ0FBQztvQkFDSCxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BELEtBQUssQ0FBQyxJQUFJLEdBQU0sS0FBSyxDQUFDLEtBQUssVUFBSyxLQUFLLENBQUMsSUFBTSxDQUFDO3dCQUM3QyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUM7d0JBQ25CLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzFCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFDdEQsYUFBYSxHQUFHLElBQUksQ0FBQzt3QkFDdkIsQ0FBQztvQkFDSCxDQUFDO2dCQUNILENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDMUIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUN0RCxhQUFhLEdBQUcsSUFBSSxDQUFDO29CQUN2QixDQUFDO2dCQUNILENBQUM7Z0JBQ0QsTUFBTSxDQUFDLGFBQWEsQ0FBQztZQUN2QixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFVCwwREFBMEQ7UUFDMUQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sV0FBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBQyxhQUFhLEVBQUUsS0FBSztnQkFDcEQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUMxRSxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDdkUsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwRCxhQUFhLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLOzZCQUMxQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7d0JBQ2xELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFDdEQsYUFBYSxHQUFHLElBQUksQ0FBQzt3QkFDdkIsQ0FBQztvQkFDSCxDQUFDO2dCQUNILENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDMUIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUN0RCxhQUFhLEdBQUcsSUFBSSxDQUFDO29CQUN2QixDQUFDO2dCQUNILENBQUM7Z0JBQ0QsTUFBTSxDQUFDLGFBQWEsQ0FBQztZQUN2QixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDVCxDQUFDO0lBQ0gsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUNyQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBQ0QsTUFBTSxDQUFDLFdBQVcsQ0FBQzs7QUFDckIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMtY29tcGF0L0JlaGF2aW9yU3ViamVjdCc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgVGl0bGVNYXBJdGVtIH0gZnJvbSAnLi4vanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIGluQXJyYXksIGlzQXJyYXksIGlzRW1wdHksIGlzTnVtYmVyLCBpc09iamVjdCwgaXNEZWZpbmVkLCBpc1N0cmluZ1xufSBmcm9tICcuL3ZhbGlkYXRvci5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgY29weSwgZml4VGl0bGUsIGZvckVhY2gsIGhhc093biB9IGZyb20gJy4vdXRpbGl0eS5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgUG9pbnRlciwgSnNvblBvaW50ZXIgfSBmcm9tICcuL2pzb25wb2ludGVyLmZ1bmN0aW9ucyc7XG5pbXBvcnQge1xuICBnZXRGcm9tU2NoZW1hLCBnZXRJbnB1dFR5cGUsIGdldFN1YlNjaGVtYSwgY2hlY2tJbmxpbmVUeXBlLCBpc0lucHV0UmVxdWlyZWQsXG4gIHJlbW92ZVJlY3Vyc2l2ZVJlZmVyZW5jZXMsIHVwZGF0ZUlucHV0T3B0aW9uc1xufSBmcm9tICcuL2pzb24tc2NoZW1hLmZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBidWlsZEZvcm1Hcm91cFRlbXBsYXRlLCBnZXRDb250cm9sIH0gZnJvbSAnLi9mb3JtLWdyb3VwLmZ1bmN0aW9ucyc7XG5cbi8qKlxuICogTGF5b3V0IGZ1bmN0aW9uIGxpYnJhcnk6XG4gKlxuICogYnVpbGRMYXlvdXQ6ICAgICAgICAgICAgQnVpbGRzIGEgY29tcGxldGUgbGF5b3V0IGZyb20gYW4gaW5wdXQgbGF5b3V0IGFuZCBzY2hlbWFcbiAqXG4gKiBidWlsZExheW91dEZyb21TY2hlbWE6ICBCdWlsZHMgYSBjb21wbGV0ZSBsYXlvdXQgZW50aXJlbHkgZnJvbSBhbiBpbnB1dCBzY2hlbWFcbiAqXG4gKiBtYXBMYXlvdXQ6XG4gKlxuICogZ2V0TGF5b3V0Tm9kZTpcbiAqXG4gKiBidWlsZFRpdGxlTWFwOlxuICovXG5cbi8qKlxuICogJ2J1aWxkTGF5b3V0JyBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSAgeyBhbnkgfSBqc2ZcbiAqIEBwYXJhbSAgeyBhbnkgfSB3aWRnZXRMaWJyYXJ5XG4gKiBAcmV0dXJuIHsgYW55W10gfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRMYXlvdXQoanNmLCB3aWRnZXRMaWJyYXJ5KSB7XG4gIGxldCBoYXNTdWJtaXRCdXR0b24gPSAhSnNvblBvaW50ZXIuZ2V0KGpzZiwgJy9mb3JtT3B0aW9ucy9hZGRTdWJtaXQnKTtcbiAgY29uc3QgZm9ybUxheW91dCA9IG1hcExheW91dChqc2YubGF5b3V0LCAobGF5b3V0SXRlbSwgaW5kZXgsIGxheW91dFBvaW50ZXIpID0+IHtcbiAgICBjb25zdCBjdXJyZW50SW5kZXggPSBpbmRleDtcbiAgICBjb25zdCBuZXdOb2RlOiBhbnkgPSB7XG4gICAgICBfaWQ6IF8udW5pcXVlSWQoKSxcbiAgICAgIG9wdGlvbnM6IHt9LFxuICAgIH07XG4gICAgaWYgKGlzT2JqZWN0KGxheW91dEl0ZW0pKSB7XG4gICAgICBPYmplY3QuYXNzaWduKG5ld05vZGUsIGxheW91dEl0ZW0pO1xuICAgICAgT2JqZWN0LmtleXMobmV3Tm9kZSlcbiAgICAgICAgLmZpbHRlcihvcHRpb24gPT4gIWluQXJyYXkob3B0aW9uLCBbXG4gICAgICAgICAgJ19pZCcsICckcmVmJywgJ2FycmF5SXRlbScsICdhcnJheUl0ZW1UeXBlJywgJ2RhdGFQb2ludGVyJywgJ2RhdGFUeXBlJyxcbiAgICAgICAgICAnaXRlbXMnLCAna2V5JywgJ25hbWUnLCAnb3B0aW9ucycsICdyZWN1cnNpdmVSZWZlcmVuY2UnLCAndHlwZScsICd3aWRnZXQnXG4gICAgICAgIF0pKVxuICAgICAgICAuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgICAgIG5ld05vZGUub3B0aW9uc1tvcHRpb25dID0gbmV3Tm9kZVtvcHRpb25dO1xuICAgICAgICAgIGRlbGV0ZSBuZXdOb2RlW29wdGlvbl07XG4gICAgICAgIH0pO1xuICAgICAgaWYgKCFoYXNPd24obmV3Tm9kZSwgJ3R5cGUnKSAmJiBpc1N0cmluZyhuZXdOb2RlLndpZGdldCkpIHtcbiAgICAgICAgbmV3Tm9kZS50eXBlID0gbmV3Tm9kZS53aWRnZXQ7XG4gICAgICAgIGRlbGV0ZSBuZXdOb2RlLndpZGdldDtcbiAgICAgIH1cbiAgICAgIGlmICghaGFzT3duKG5ld05vZGUub3B0aW9ucywgJ3RpdGxlJykpIHtcbiAgICAgICAgaWYgKGhhc093bihuZXdOb2RlLm9wdGlvbnMsICdsZWdlbmQnKSkge1xuICAgICAgICAgIG5ld05vZGUub3B0aW9ucy50aXRsZSA9IG5ld05vZGUub3B0aW9ucy5sZWdlbmQ7XG4gICAgICAgICAgZGVsZXRlIG5ld05vZGUub3B0aW9ucy5sZWdlbmQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghaGFzT3duKG5ld05vZGUub3B0aW9ucywgJ3ZhbGlkYXRpb25NZXNzYWdlcycpKSB7XG4gICAgICAgIGlmIChoYXNPd24obmV3Tm9kZS5vcHRpb25zLCAnZXJyb3JNZXNzYWdlcycpKSB7XG4gICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLnZhbGlkYXRpb25NZXNzYWdlcyA9IG5ld05vZGUub3B0aW9ucy5lcnJvck1lc3NhZ2VzO1xuICAgICAgICAgIGRlbGV0ZSBuZXdOb2RlLm9wdGlvbnMuZXJyb3JNZXNzYWdlcztcblxuICAgICAgICAvLyBDb252ZXJ0IEFuZ3VsYXIgU2NoZW1hIEZvcm0gKEFuZ3VsYXJKUykgJ3ZhbGlkYXRpb25NZXNzYWdlJyB0b1xuICAgICAgICAvLyBBbmd1bGFyIEpTT04gU2NoZW1hIEZvcm0gJ3ZhbGlkYXRpb25NZXNzYWdlcydcbiAgICAgICAgLy8gVFY0IGNvZGVzIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2dlcmFpbnRsdWZmL3R2NC9ibG9iL21hc3Rlci9zb3VyY2UvYXBpLmpzXG4gICAgICAgIH0gZWxzZSBpZiAoaGFzT3duKG5ld05vZGUub3B0aW9ucywgJ3ZhbGlkYXRpb25NZXNzYWdlJykpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIG5ld05vZGUub3B0aW9ucy52YWxpZGF0aW9uTWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIG5ld05vZGUub3B0aW9ucy52YWxpZGF0aW9uTWVzc2FnZXMgPSBuZXdOb2RlLm9wdGlvbnMudmFsaWRhdGlvbk1lc3NhZ2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld05vZGUub3B0aW9ucy52YWxpZGF0aW9uTWVzc2FnZXMgPSB7fTtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG5ld05vZGUub3B0aW9ucy52YWxpZGF0aW9uTWVzc2FnZSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBjb2RlID0ga2V5ICsgJyc7XG4gICAgICAgICAgICAgIGNvbnN0IG5ld0tleSA9XG4gICAgICAgICAgICAgICAgY29kZSA9PT0gICcwJyAgPyAndHlwZScgOlxuICAgICAgICAgICAgICAgIGNvZGUgPT09ICAnMScgID8gJ2VudW0nIDpcbiAgICAgICAgICAgICAgICBjb2RlID09PSAnMTAwJyA/ICdtdWx0aXBsZU9mJyA6XG4gICAgICAgICAgICAgICAgY29kZSA9PT0gJzEwMScgPyAnbWluaW11bScgOlxuICAgICAgICAgICAgICAgIGNvZGUgPT09ICcxMDInID8gJ2V4Y2x1c2l2ZU1pbmltdW0nIDpcbiAgICAgICAgICAgICAgICBjb2RlID09PSAnMTAzJyA/ICdtYXhpbXVtJyA6XG4gICAgICAgICAgICAgICAgY29kZSA9PT0gJzEwNCcgPyAnZXhjbHVzaXZlTWF4aW11bScgOlxuICAgICAgICAgICAgICAgIGNvZGUgPT09ICcyMDAnID8gJ21pbkxlbmd0aCcgOlxuICAgICAgICAgICAgICAgIGNvZGUgPT09ICcyMDEnID8gJ21heExlbmd0aCcgOlxuICAgICAgICAgICAgICAgIGNvZGUgPT09ICcyMDInID8gJ3BhdHRlcm4nIDpcbiAgICAgICAgICAgICAgICBjb2RlID09PSAnMzAwJyA/ICdtaW5Qcm9wZXJ0aWVzJyA6XG4gICAgICAgICAgICAgICAgY29kZSA9PT0gJzMwMScgPyAnbWF4UHJvcGVydGllcycgOlxuICAgICAgICAgICAgICAgIGNvZGUgPT09ICczMDInID8gJ3JlcXVpcmVkJyA6XG4gICAgICAgICAgICAgICAgY29kZSA9PT0gJzMwNCcgPyAnZGVwZW5kZW5jaWVzJyA6XG4gICAgICAgICAgICAgICAgY29kZSA9PT0gJzQwMCcgPyAnbWluSXRlbXMnIDpcbiAgICAgICAgICAgICAgICBjb2RlID09PSAnNDAxJyA/ICdtYXhJdGVtcycgOlxuICAgICAgICAgICAgICAgIGNvZGUgPT09ICc0MDInID8gJ3VuaXF1ZUl0ZW1zJyA6XG4gICAgICAgICAgICAgICAgY29kZSA9PT0gJzUwMCcgPyAnZm9ybWF0JyA6IGNvZGUgKyAnJztcbiAgICAgICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLnZhbGlkYXRpb25NZXNzYWdlc1tuZXdLZXldID0gbmV3Tm9kZS5vcHRpb25zLnZhbGlkYXRpb25NZXNzYWdlW2tleV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGVsZXRlIG5ld05vZGUub3B0aW9ucy52YWxpZGF0aW9uTWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoSnNvblBvaW50ZXIuaXNKc29uUG9pbnRlcihsYXlvdXRJdGVtKSkge1xuICAgICAgbmV3Tm9kZS5kYXRhUG9pbnRlciA9IGxheW91dEl0ZW07XG4gICAgfSBlbHNlIGlmIChpc1N0cmluZyhsYXlvdXRJdGVtKSkge1xuICAgICAgbmV3Tm9kZS5rZXkgPSBsYXlvdXRJdGVtO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdidWlsZExheW91dCBlcnJvcjogRm9ybSBsYXlvdXQgZWxlbWVudCBub3QgcmVjb2duaXplZDonKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IobGF5b3V0SXRlbSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgbGV0IG5vZGVTY2hlbWE6IGFueSA9IG51bGw7XG5cbiAgICAvLyBJZiBuZXdOb2RlIGRvZXMgbm90IGhhdmUgYSBkYXRhUG9pbnRlciwgdHJ5IHRvIGZpbmQgYW4gZXF1aXZhbGVudFxuICAgIGlmICghaGFzT3duKG5ld05vZGUsICdkYXRhUG9pbnRlcicpKSB7XG5cbiAgICAgIC8vIElmIG5ld05vZGUgaGFzIGEga2V5LCBjaGFuZ2UgaXQgdG8gYSBkYXRhUG9pbnRlclxuICAgICAgaWYgKGhhc093bihuZXdOb2RlLCAna2V5JykpIHtcbiAgICAgICAgbmV3Tm9kZS5kYXRhUG9pbnRlciA9IG5ld05vZGUua2V5ID09PSAnKicgPyBuZXdOb2RlLmtleSA6XG4gICAgICAgICAgSnNvblBvaW50ZXIuY29tcGlsZShKc29uUG9pbnRlci5wYXJzZU9iamVjdFBhdGgobmV3Tm9kZS5rZXkpLCAnLScpO1xuICAgICAgICBkZWxldGUgbmV3Tm9kZS5rZXk7XG5cbiAgICAgIC8vIElmIG5ld05vZGUgaXMgYW4gYXJyYXksIHNlYXJjaCBmb3IgZGF0YVBvaW50ZXIgaW4gY2hpbGQgbm9kZXNcbiAgICAgIH0gZWxzZSBpZiAoaGFzT3duKG5ld05vZGUsICd0eXBlJykgJiYgbmV3Tm9kZS50eXBlLnNsaWNlKC01KSA9PT0gJ2FycmF5Jykge1xuICAgICAgICBjb25zdCBmaW5kRGF0YVBvaW50ZXIgPSAoaXRlbXMpID0+IHtcbiAgICAgICAgICBpZiAoaXRlbXMgPT09IG51bGwgfHwgdHlwZW9mIGl0ZW1zICE9PSAnb2JqZWN0JykgeyByZXR1cm47IH1cbiAgICAgICAgICBpZiAoaGFzT3duKGl0ZW1zLCAnZGF0YVBvaW50ZXInKSkgeyByZXR1cm4gaXRlbXMuZGF0YVBvaW50ZXI7IH1cbiAgICAgICAgICBpZiAoaXNBcnJheShpdGVtcy5pdGVtcykpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcy5pdGVtcykge1xuICAgICAgICAgICAgICBpZiAoaGFzT3duKGl0ZW0sICdkYXRhUG9pbnRlcicpICYmIGl0ZW0uZGF0YVBvaW50ZXIuaW5kZXhPZignLy0nKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5kYXRhUG9pbnRlcjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoaGFzT3duKGl0ZW0sICdpdGVtcycpKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VhcmNoSXRlbSA9IGZpbmREYXRhUG9pbnRlcihpdGVtKTtcbiAgICAgICAgICAgICAgICBpZiAoc2VhcmNoSXRlbSkgeyByZXR1cm4gc2VhcmNoSXRlbTsgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjaGlsZERhdGFQb2ludGVyID0gZmluZERhdGFQb2ludGVyKG5ld05vZGUpO1xuICAgICAgICBpZiAoY2hpbGREYXRhUG9pbnRlcikge1xuICAgICAgICAgIG5ld05vZGUuZGF0YVBvaW50ZXIgPVxuICAgICAgICAgICAgY2hpbGREYXRhUG9pbnRlci5zbGljZSgwLCBjaGlsZERhdGFQb2ludGVyLmxhc3RJbmRleE9mKCcvLScpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChoYXNPd24obmV3Tm9kZSwgJ2RhdGFQb2ludGVyJykpIHtcbiAgICAgIGlmIChuZXdOb2RlLmRhdGFQb2ludGVyID09PSAnKicpIHtcbiAgICAgICAgcmV0dXJuIGJ1aWxkTGF5b3V0RnJvbVNjaGVtYShqc2YsIHdpZGdldExpYnJhcnksIGpzZi5mb3JtVmFsdWVzKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5vZGVWYWx1ZSA9XG4gICAgICAgIEpzb25Qb2ludGVyLmdldChqc2YuZm9ybVZhbHVlcywgbmV3Tm9kZS5kYXRhUG9pbnRlci5yZXBsYWNlKC9cXC8tL2csICcvMScpKTtcblxuICAgICAgLy8gVE9ETzogQ3JlYXRlIGZ1bmN0aW9uIGdldEZvcm1WYWx1ZXMoanNmLCBkYXRhUG9pbnRlciwgZm9yUmVmTGlicmFyeSlcbiAgICAgIC8vIGNoZWNrIGZvcm1PcHRpb25zLnNldFNjaGVtYURlZmF1bHRzIGFuZCBmb3JtT3B0aW9ucy5zZXRMYXlvdXREZWZhdWx0c1xuICAgICAgLy8gdGhlbiBzZXQgYXByb3ByaWF0ZSB2YWx1ZXMgZnJvbSBpbml0aWFsVmF1ZXMsIHNjaGVtYSwgb3IgbGF5b3V0XG5cbiAgICAgIG5ld05vZGUuZGF0YVBvaW50ZXIgPVxuICAgICAgICBKc29uUG9pbnRlci50b0dlbmVyaWNQb2ludGVyKG5ld05vZGUuZGF0YVBvaW50ZXIsIGpzZi5hcnJheU1hcCk7XG4gICAgICBjb25zdCBMYXN0S2V5ID0gSnNvblBvaW50ZXIudG9LZXkobmV3Tm9kZS5kYXRhUG9pbnRlcik7XG4gICAgICBpZiAoIW5ld05vZGUubmFtZSAmJiBpc1N0cmluZyhMYXN0S2V5KSAmJiBMYXN0S2V5ICE9PSAnLScpIHtcbiAgICAgICAgbmV3Tm9kZS5uYW1lID0gTGFzdEtleTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNob3J0RGF0YVBvaW50ZXIgPSByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzKFxuICAgICAgICBuZXdOb2RlLmRhdGFQb2ludGVyLCBqc2YuZGF0YVJlY3Vyc2l2ZVJlZk1hcCwganNmLmFycmF5TWFwXG4gICAgICApO1xuICAgICAgY29uc3QgcmVjdXJzaXZlID0gIXNob3J0RGF0YVBvaW50ZXIubGVuZ3RoIHx8XG4gICAgICAgIHNob3J0RGF0YVBvaW50ZXIgIT09IG5ld05vZGUuZGF0YVBvaW50ZXI7XG4gICAgICBsZXQgc2NoZW1hUG9pbnRlcjogc3RyaW5nO1xuICAgICAgaWYgKCFqc2YuZGF0YU1hcC5oYXMoc2hvcnREYXRhUG9pbnRlcikpIHtcbiAgICAgICAganNmLmRhdGFNYXAuc2V0KHNob3J0RGF0YVBvaW50ZXIsIG5ldyBNYXAoKSk7XG4gICAgICB9XG4gICAgICBjb25zdCBub2RlRGF0YU1hcCA9IGpzZi5kYXRhTWFwLmdldChzaG9ydERhdGFQb2ludGVyKTtcbiAgICAgIGlmIChub2RlRGF0YU1hcC5oYXMoJ3NjaGVtYVBvaW50ZXInKSkge1xuICAgICAgICBzY2hlbWFQb2ludGVyID0gbm9kZURhdGFNYXAuZ2V0KCdzY2hlbWFQb2ludGVyJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY2hlbWFQb2ludGVyID0gSnNvblBvaW50ZXIudG9TY2hlbWFQb2ludGVyKHNob3J0RGF0YVBvaW50ZXIsIGpzZi5zY2hlbWEpO1xuICAgICAgICBub2RlRGF0YU1hcC5zZXQoJ3NjaGVtYVBvaW50ZXInLCBzY2hlbWFQb2ludGVyKTtcbiAgICAgIH1cbiAgICAgIG5vZGVEYXRhTWFwLnNldCgnZGlzYWJsZWQnLCAhIW5ld05vZGUub3B0aW9ucy5kaXNhYmxlZCk7XG4gICAgICBub2RlU2NoZW1hID0gSnNvblBvaW50ZXIuZ2V0KGpzZi5zY2hlbWEsIHNjaGVtYVBvaW50ZXIpO1xuICAgICAgaWYgKG5vZGVTY2hlbWEpIHtcbiAgICAgICAgaWYgKCFoYXNPd24obmV3Tm9kZSwgJ3R5cGUnKSkge1xuICAgICAgICAgIG5ld05vZGUudHlwZSA9IGdldElucHV0VHlwZShub2RlU2NoZW1hLCBuZXdOb2RlKTtcbiAgICAgICAgfSBlbHNlIGlmICghd2lkZ2V0TGlicmFyeS5oYXNXaWRnZXQobmV3Tm9kZS50eXBlKSkge1xuICAgICAgICAgIGNvbnN0IG9sZFdpZGdldFR5cGUgPSBuZXdOb2RlLnR5cGU7XG4gICAgICAgICAgbmV3Tm9kZS50eXBlID0gZ2V0SW5wdXRUeXBlKG5vZGVTY2hlbWEsIG5ld05vZGUpO1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYGVycm9yOiB3aWRnZXQgdHlwZSBcIiR7b2xkV2lkZ2V0VHlwZX1cIiBgICtcbiAgICAgICAgICAgIGBub3QgZm91bmQgaW4gbGlicmFyeS4gUmVwbGFjaW5nIHdpdGggXCIke25ld05vZGUudHlwZX1cIi5gKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdOb2RlLnR5cGUgPSBjaGVja0lubGluZVR5cGUobmV3Tm9kZS50eXBlLCBub2RlU2NoZW1hLCBuZXdOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZVNjaGVtYS50eXBlID09PSAnb2JqZWN0JyAmJiBpc0FycmF5KG5vZGVTY2hlbWEucmVxdWlyZWQpKSB7XG4gICAgICAgICAgbm9kZURhdGFNYXAuc2V0KCdyZXF1aXJlZCcsIG5vZGVTY2hlbWEucmVxdWlyZWQpO1xuICAgICAgICB9XG4gICAgICAgIG5ld05vZGUuZGF0YVR5cGUgPVxuICAgICAgICAgIG5vZGVTY2hlbWEudHlwZSB8fCAoaGFzT3duKG5vZGVTY2hlbWEsICckcmVmJykgPyAnJHJlZicgOiBudWxsKTtcbiAgICAgICAgdXBkYXRlSW5wdXRPcHRpb25zKG5ld05vZGUsIG5vZGVTY2hlbWEsIGpzZik7XG5cbiAgICAgICAgLy8gUHJlc2VudCBjaGVja2JveGVzIGFzIHNpbmdsZSBjb250cm9sLCByYXRoZXIgdGhhbiBhcnJheVxuICAgICAgICBpZiAobmV3Tm9kZS50eXBlID09PSAnY2hlY2tib3hlcycgJiYgaGFzT3duKG5vZGVTY2hlbWEsICdpdGVtcycpKSB7XG4gICAgICAgICAgdXBkYXRlSW5wdXRPcHRpb25zKG5ld05vZGUsIG5vZGVTY2hlbWEuaXRlbXMsIGpzZik7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3Tm9kZS5kYXRhVHlwZSA9PT0gJ2FycmF5Jykge1xuICAgICAgICAgIG5ld05vZGUub3B0aW9ucy5tYXhJdGVtcyA9IE1hdGgubWluKFxuICAgICAgICAgICAgbm9kZVNjaGVtYS5tYXhJdGVtcyB8fCAxMDAwLCBuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXMgfHwgMTAwMFxuICAgICAgICAgICk7XG4gICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLm1pbkl0ZW1zID0gTWF0aC5tYXgoXG4gICAgICAgICAgICBub2RlU2NoZW1hLm1pbkl0ZW1zIHx8IDAsIG5ld05vZGUub3B0aW9ucy5taW5JdGVtcyB8fCAwXG4gICAgICAgICAgKTtcbiAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zID0gTWF0aC5tYXgoXG4gICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zIHx8IDAsIGlzQXJyYXkobm9kZVZhbHVlKSA/IG5vZGVWYWx1ZS5sZW5ndGggOiAwXG4gICAgICAgICAgKTtcbiAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcyA9XG4gICAgICAgICAgICBpc0FycmF5KG5vZGVTY2hlbWEuaXRlbXMpID8gbm9kZVNjaGVtYS5pdGVtcy5sZW5ndGggOiAwO1xuICAgICAgICAgIGlmIChuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXMgPCBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcykge1xuICAgICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXMgPSBuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXM7XG4gICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zID0gMDtcbiAgICAgICAgICB9IGVsc2UgaWYgKG5ld05vZGUub3B0aW9ucy5tYXhJdGVtcyA8XG4gICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcyArIG5ld05vZGUub3B0aW9ucy5saXN0SXRlbXNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIG5ld05vZGUub3B0aW9ucy5saXN0SXRlbXMgPVxuICAgICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXMgLSBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcztcbiAgICAgICAgICB9IGVsc2UgaWYgKG5ld05vZGUub3B0aW9ucy5taW5JdGVtcyA+XG4gICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcyArIG5ld05vZGUub3B0aW9ucy5saXN0SXRlbXNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIG5ld05vZGUub3B0aW9ucy5saXN0SXRlbXMgPVxuICAgICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMubWluSXRlbXMgLSBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFub2RlRGF0YU1hcC5oYXMoJ21heEl0ZW1zJykpIHtcbiAgICAgICAgICAgIG5vZGVEYXRhTWFwLnNldCgnbWF4SXRlbXMnLCBuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXMpO1xuICAgICAgICAgICAgbm9kZURhdGFNYXAuc2V0KCdtaW5JdGVtcycsIG5ld05vZGUub3B0aW9ucy5taW5JdGVtcyk7XG4gICAgICAgICAgICBub2RlRGF0YU1hcC5zZXQoJ3R1cGxlSXRlbXMnLCBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcyk7XG4gICAgICAgICAgICBub2RlRGF0YU1hcC5zZXQoJ2xpc3RJdGVtcycsIG5ld05vZGUub3B0aW9ucy5saXN0SXRlbXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWpzZi5hcnJheU1hcC5oYXMoc2hvcnREYXRhUG9pbnRlcikpIHtcbiAgICAgICAgICAgIGpzZi5hcnJheU1hcC5zZXQoc2hvcnREYXRhUG9pbnRlciwgbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNJbnB1dFJlcXVpcmVkKGpzZi5zY2hlbWEsIHNjaGVtYVBvaW50ZXIpKSB7XG4gICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLnJlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgICBqc2YuZmllbGRzUmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUT0RPOiBjcmVhdGUgaXRlbSBpbiBGb3JtR3JvdXAgbW9kZWwgZnJvbSBsYXlvdXQga2V5ICg/KVxuICAgICAgICB1cGRhdGVJbnB1dE9wdGlvbnMobmV3Tm9kZSwge30sIGpzZik7XG4gICAgICB9XG5cbiAgICAgIGlmICghbmV3Tm9kZS5vcHRpb25zLnRpdGxlICYmICEvXlxcZCskLy50ZXN0KG5ld05vZGUubmFtZSkpIHtcbiAgICAgICAgbmV3Tm9kZS5vcHRpb25zLnRpdGxlID0gZml4VGl0bGUobmV3Tm9kZS5uYW1lKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGhhc093bihuZXdOb2RlLm9wdGlvbnMsICdjb3B5VmFsdWVUbycpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbmV3Tm9kZS5vcHRpb25zLmNvcHlWYWx1ZVRvID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIG5ld05vZGUub3B0aW9ucy5jb3B5VmFsdWVUbyA9IFtuZXdOb2RlLm9wdGlvbnMuY29weVZhbHVlVG9dO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FycmF5KG5ld05vZGUub3B0aW9ucy5jb3B5VmFsdWVUbykpIHtcbiAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMuY29weVZhbHVlVG8gPSBuZXdOb2RlLm9wdGlvbnMuY29weVZhbHVlVG8ubWFwKGl0ZW0gPT5cbiAgICAgICAgICAgIEpzb25Qb2ludGVyLmNvbXBpbGUoSnNvblBvaW50ZXIucGFyc2VPYmplY3RQYXRoKGl0ZW0pLCAnLScpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBuZXdOb2RlLndpZGdldCA9IHdpZGdldExpYnJhcnkuZ2V0V2lkZ2V0KG5ld05vZGUudHlwZSk7XG4gICAgICBub2RlRGF0YU1hcC5zZXQoJ2lucHV0VHlwZScsIG5ld05vZGUudHlwZSk7XG4gICAgICBub2RlRGF0YU1hcC5zZXQoJ3dpZGdldCcsIG5ld05vZGUud2lkZ2V0KTtcblxuICAgICAgaWYgKG5ld05vZGUuZGF0YVR5cGUgPT09ICdhcnJheScgJiZcbiAgICAgICAgKGhhc093bihuZXdOb2RlLCAnaXRlbXMnKSB8fCBoYXNPd24obmV3Tm9kZSwgJ2FkZGl0aW9uYWxJdGVtcycpKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGl0ZW1SZWZQb2ludGVyID0gcmVtb3ZlUmVjdXJzaXZlUmVmZXJlbmNlcyhcbiAgICAgICAgICBuZXdOb2RlLmRhdGFQb2ludGVyICsgJy8tJywganNmLmRhdGFSZWN1cnNpdmVSZWZNYXAsIGpzZi5hcnJheU1hcFxuICAgICAgICApO1xuICAgICAgICBpZiAoIWpzZi5kYXRhTWFwLmhhcyhpdGVtUmVmUG9pbnRlcikpIHtcbiAgICAgICAgICBqc2YuZGF0YU1hcC5zZXQoaXRlbVJlZlBvaW50ZXIsIG5ldyBNYXAoKSk7XG4gICAgICAgIH1cbiAgICAgICAganNmLmRhdGFNYXAuZ2V0KGl0ZW1SZWZQb2ludGVyKS5zZXQoJ2lucHV0VHlwZScsICdzZWN0aW9uJyk7XG5cbiAgICAgICAgLy8gRml4IGluc3VmZmljaWVudGx5IG5lc3RlZCBhcnJheSBpdGVtIGdyb3Vwc1xuICAgICAgICBpZiAobmV3Tm9kZS5pdGVtcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgY29uc3QgYXJyYXlJdGVtR3JvdXAgPSBbXTtcbiAgICAgICAgICBjb25zdCBhcnJheUl0ZW1Hcm91cFRlbXBsYXRlID0gW107XG4gICAgICAgICAgbGV0IG5ld0luZGV4ID0gMDtcbiAgICAgICAgICBmb3IgKGxldCBpID0gbmV3Tm9kZS5pdGVtcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgY29uc3Qgc3ViSXRlbSA9IG5ld05vZGUuaXRlbXNbaV07XG4gICAgICAgICAgICBpZiAoaGFzT3duKHN1Ykl0ZW0sICdkYXRhUG9pbnRlcicpICYmXG4gICAgICAgICAgICAgIHN1Ykl0ZW0uZGF0YVBvaW50ZXIuc2xpY2UoMCwgaXRlbVJlZlBvaW50ZXIubGVuZ3RoKSA9PT0gaXRlbVJlZlBvaW50ZXJcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb25zdCBhcnJheUl0ZW0gPSBuZXdOb2RlLml0ZW1zLnNwbGljZShpLCAxKVswXTtcbiAgICAgICAgICAgICAgYXJyYXlJdGVtLmRhdGFQb2ludGVyID0gbmV3Tm9kZS5kYXRhUG9pbnRlciArICcvLScgK1xuICAgICAgICAgICAgICAgIGFycmF5SXRlbS5kYXRhUG9pbnRlci5zbGljZShpdGVtUmVmUG9pbnRlci5sZW5ndGgpO1xuICAgICAgICAgICAgICBhcnJheUl0ZW1Hcm91cC51bnNoaWZ0KGFycmF5SXRlbSk7XG4gICAgICAgICAgICAgIG5ld0luZGV4Kys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzdWJJdGVtLmFycmF5SXRlbSA9IHRydWU7XG4gICAgICAgICAgICAgIC8vIFRPRE86IENoZWNrIHNjaGVtYSB0byBnZXQgYXJyYXlJdGVtVHlwZSBhbmQgcmVtb3ZhYmxlXG4gICAgICAgICAgICAgIHN1Ykl0ZW0uYXJyYXlJdGVtVHlwZSA9ICdsaXN0JztcbiAgICAgICAgICAgICAgc3ViSXRlbS5yZW1vdmFibGUgPSBuZXdOb2RlLm9wdGlvbnMucmVtb3ZhYmxlICE9PSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFycmF5SXRlbUdyb3VwLmxlbmd0aCkge1xuICAgICAgICAgICAgbmV3Tm9kZS5pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgX2lkOiBfLnVuaXF1ZUlkKCksXG4gICAgICAgICAgICAgIGFycmF5SXRlbTogdHJ1ZSxcbiAgICAgICAgICAgICAgYXJyYXlJdGVtVHlwZTogbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXMgPiBuZXdOb2RlLml0ZW1zLmxlbmd0aCA/XG4gICAgICAgICAgICAgICAgJ3R1cGxlJyA6ICdsaXN0JyxcbiAgICAgICAgICAgICAgaXRlbXM6IGFycmF5SXRlbUdyb3VwLFxuICAgICAgICAgICAgICBvcHRpb25zOiB7IHJlbW92YWJsZTogbmV3Tm9kZS5vcHRpb25zLnJlbW92YWJsZSAhPT0gZmFsc2UsIH0sXG4gICAgICAgICAgICAgIGRhdGFQb2ludGVyOiBuZXdOb2RlLmRhdGFQb2ludGVyICsgJy8tJyxcbiAgICAgICAgICAgICAgdHlwZTogJ3NlY3Rpb24nLFxuICAgICAgICAgICAgICB3aWRnZXQ6IHdpZGdldExpYnJhcnkuZ2V0V2lkZ2V0KCdzZWN0aW9uJyksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gVE9ETzogRml4IHRvIGhuZGxlIG11bHRpcGxlIGl0ZW1zXG4gICAgICAgICAgbmV3Tm9kZS5pdGVtc1swXS5hcnJheUl0ZW0gPSB0cnVlO1xuICAgICAgICAgIGlmICghbmV3Tm9kZS5pdGVtc1swXS5kYXRhUG9pbnRlcikge1xuICAgICAgICAgICAgbmV3Tm9kZS5pdGVtc1swXS5kYXRhUG9pbnRlciA9XG4gICAgICAgICAgICAgIEpzb25Qb2ludGVyLnRvR2VuZXJpY1BvaW50ZXIoaXRlbVJlZlBvaW50ZXIsIGpzZi5hcnJheU1hcCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghSnNvblBvaW50ZXIuaGFzKG5ld05vZGUsICcvaXRlbXMvMC9vcHRpb25zL3JlbW92YWJsZScpKSB7XG4gICAgICAgICAgICBuZXdOb2RlLml0ZW1zWzBdLm9wdGlvbnMucmVtb3ZhYmxlID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG5ld05vZGUub3B0aW9ucy5vcmRlcmFibGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBuZXdOb2RlLml0ZW1zWzBdLm9wdGlvbnMub3JkZXJhYmxlID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIG5ld05vZGUuaXRlbXNbMF0uYXJyYXlJdGVtVHlwZSA9XG4gICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcyA/ICd0dXBsZScgOiAnbGlzdCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNBcnJheShuZXdOb2RlLml0ZW1zKSkge1xuICAgICAgICAgIGNvbnN0IGFycmF5TGlzdEl0ZW1zID1cbiAgICAgICAgICAgIG5ld05vZGUuaXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS50eXBlICE9PSAnJHJlZicpLmxlbmd0aCAtXG4gICAgICAgICAgICAgIG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zO1xuICAgICAgICAgIGlmIChhcnJheUxpc3RJdGVtcyA+IG5ld05vZGUub3B0aW9ucy5saXN0SXRlbXMpIHtcbiAgICAgICAgICAgIG5ld05vZGUub3B0aW9ucy5saXN0SXRlbXMgPSBhcnJheUxpc3RJdGVtcztcbiAgICAgICAgICAgIG5vZGVEYXRhTWFwLnNldCgnbGlzdEl0ZW1zJywgYXJyYXlMaXN0SXRlbXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaGFzT3duKGpzZi5sYXlvdXRSZWZMaWJyYXJ5LCBpdGVtUmVmUG9pbnRlcikpIHtcbiAgICAgICAgICBqc2YubGF5b3V0UmVmTGlicmFyeVtpdGVtUmVmUG9pbnRlcl0gPVxuICAgICAgICAgICAgXy5jbG9uZURlZXAobmV3Tm9kZS5pdGVtc1tuZXdOb2RlLml0ZW1zLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgICBpZiAocmVjdXJzaXZlKSB7XG4gICAgICAgICAgICBqc2YubGF5b3V0UmVmTGlicmFyeVtpdGVtUmVmUG9pbnRlcl0ucmVjdXJzaXZlUmVmZXJlbmNlID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yRWFjaChqc2YubGF5b3V0UmVmTGlicmFyeVtpdGVtUmVmUG9pbnRlcl0sIChpdGVtLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChoYXNPd24oaXRlbSwgJ19pZCcpKSB7IGl0ZW0uX2lkID0gbnVsbDsgfVxuICAgICAgICAgICAgaWYgKHJlY3Vyc2l2ZSkge1xuICAgICAgICAgICAgICBpZiAoaGFzT3duKGl0ZW0sICdkYXRhUG9pbnRlcicpKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5kYXRhUG9pbnRlciA9IGl0ZW0uZGF0YVBvaW50ZXIuc2xpY2UoaXRlbVJlZlBvaW50ZXIubGVuZ3RoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sICd0b3AtZG93bicpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGFueSBhZGRpdGlvbmFsIGRlZmF1bHQgaXRlbXNcbiAgICAgICAgaWYgKCFuZXdOb2RlLnJlY3Vyc2l2ZVJlZmVyZW5jZSB8fCBuZXdOb2RlLm9wdGlvbnMucmVxdWlyZWQpIHtcbiAgICAgICAgICBjb25zdCBhcnJheUxlbmd0aCA9IE1hdGgubWluKE1hdGgubWF4KFxuICAgICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXMgKyBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zLFxuICAgICAgICAgICAgaXNBcnJheShub2RlVmFsdWUpID8gbm9kZVZhbHVlLmxlbmd0aCA6IDBcbiAgICAgICAgICApLCBuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXMpO1xuICAgICAgICAgIGZvciAobGV0IGkgPSBuZXdOb2RlLml0ZW1zLmxlbmd0aDsgaSA8IGFycmF5TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG5ld05vZGUuaXRlbXMucHVzaChnZXRMYXlvdXROb2RlKHtcbiAgICAgICAgICAgICAgJHJlZjogaXRlbVJlZlBvaW50ZXIsXG4gICAgICAgICAgICAgIGRhdGFQb2ludGVyOiBuZXdOb2RlLmRhdGFQb2ludGVyLFxuICAgICAgICAgICAgICByZWN1cnNpdmVSZWZlcmVuY2U6IG5ld05vZGUucmVjdXJzaXZlUmVmZXJlbmNlLFxuICAgICAgICAgICAgfSwganNmLCB3aWRnZXRMaWJyYXJ5KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgbmVlZGVkLCBhZGQgYnV0dG9uIHRvIGFkZCBpdGVtcyB0byBhcnJheVxuICAgICAgICBpZiAobmV3Tm9kZS5vcHRpb25zLmFkZGFibGUgIT09IGZhbHNlICYmXG4gICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLm1pbkl0ZW1zIDwgbmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zICYmXG4gICAgICAgICAgKG5ld05vZGUuaXRlbXNbbmV3Tm9kZS5pdGVtcy5sZW5ndGggLSAxXSB8fCB7fSkudHlwZSAhPT0gJyRyZWYnXG4gICAgICAgICkge1xuICAgICAgICAgIGxldCBidXR0b25UZXh0ID0gJ0FkZCc7XG4gICAgICAgICAgaWYgKG5ld05vZGUub3B0aW9ucy50aXRsZSkge1xuICAgICAgICAgICAgaWYgKC9eYWRkXFxiL2kudGVzdChuZXdOb2RlLm9wdGlvbnMudGl0bGUpKSB7XG4gICAgICAgICAgICAgIGJ1dHRvblRleHQgPSBuZXdOb2RlLm9wdGlvbnMudGl0bGU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBidXR0b25UZXh0ICs9ICcgJyArIG5ld05vZGUub3B0aW9ucy50aXRsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKG5ld05vZGUubmFtZSAmJiAhL15cXGQrJC8udGVzdChuZXdOb2RlLm5hbWUpKSB7XG4gICAgICAgICAgICBpZiAoL15hZGRcXGIvaS50ZXN0KG5ld05vZGUubmFtZSkpIHtcbiAgICAgICAgICAgICAgYnV0dG9uVGV4dCArPSAnICcgKyBmaXhUaXRsZShuZXdOb2RlLm5hbWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYnV0dG9uVGV4dCA9IGZpeFRpdGxlKG5ld05vZGUubmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBJZiBuZXdOb2RlIGRvZXNuJ3QgaGF2ZSBhIHRpdGxlLCBsb29rIGZvciB0aXRsZSBvZiBwYXJlbnQgYXJyYXkgaXRlbVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBwYXJlbnRTY2hlbWEgPVxuICAgICAgICAgICAgICBnZXRGcm9tU2NoZW1hKGpzZi5zY2hlbWEsIG5ld05vZGUuZGF0YVBvaW50ZXIsICdwYXJlbnRTY2hlbWEnKTtcbiAgICAgICAgICAgIGlmIChoYXNPd24ocGFyZW50U2NoZW1hLCAndGl0bGUnKSkge1xuICAgICAgICAgICAgICBidXR0b25UZXh0ICs9ICcgdG8gJyArIHBhcmVudFNjaGVtYS50aXRsZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnN0IHBvaW50ZXJBcnJheSA9IEpzb25Qb2ludGVyLnBhcnNlKG5ld05vZGUuZGF0YVBvaW50ZXIpO1xuICAgICAgICAgICAgICBidXR0b25UZXh0ICs9ICcgdG8gJyArIGZpeFRpdGxlKHBvaW50ZXJBcnJheVtwb2ludGVyQXJyYXkubGVuZ3RoIC0gMl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBuZXdOb2RlLml0ZW1zLnB1c2goe1xuICAgICAgICAgICAgX2lkOiBfLnVuaXF1ZUlkKCksXG4gICAgICAgICAgICBhcnJheUl0ZW06IHRydWUsXG4gICAgICAgICAgICBhcnJheUl0ZW1UeXBlOiAnbGlzdCcsXG4gICAgICAgICAgICBkYXRhUG9pbnRlcjogbmV3Tm9kZS5kYXRhUG9pbnRlciArICcvLScsXG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgIGxpc3RJdGVtczogbmV3Tm9kZS5vcHRpb25zLmxpc3RJdGVtcyxcbiAgICAgICAgICAgICAgbWF4SXRlbXM6IG5ld05vZGUub3B0aW9ucy5tYXhJdGVtcyxcbiAgICAgICAgICAgICAgbWluSXRlbXM6IG5ld05vZGUub3B0aW9ucy5taW5JdGVtcyxcbiAgICAgICAgICAgICAgcmVtb3ZhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgdGl0bGU6IGJ1dHRvblRleHQsXG4gICAgICAgICAgICAgIHR1cGxlSXRlbXM6IG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlY3Vyc2l2ZVJlZmVyZW5jZTogcmVjdXJzaXZlLFxuICAgICAgICAgICAgdHlwZTogJyRyZWYnLFxuICAgICAgICAgICAgd2lkZ2V0OiB3aWRnZXRMaWJyYXJ5LmdldFdpZGdldCgnJHJlZicpLFxuICAgICAgICAgICAgJHJlZjogaXRlbVJlZlBvaW50ZXIsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKGlzU3RyaW5nKEpzb25Qb2ludGVyLmdldChuZXdOb2RlLCAnL3N0eWxlL2FkZCcpKSkge1xuICAgICAgICAgICAgbmV3Tm9kZS5pdGVtc1tuZXdOb2RlLml0ZW1zLmxlbmd0aCAtIDFdLm9wdGlvbnMuZmllbGRTdHlsZSA9XG4gICAgICAgICAgICAgIG5ld05vZGUuc3R5bGUuYWRkO1xuICAgICAgICAgICAgZGVsZXRlIG5ld05vZGUuc3R5bGUuYWRkO1xuICAgICAgICAgICAgaWYgKGlzRW1wdHkobmV3Tm9kZS5zdHlsZSkpIHsgZGVsZXRlIG5ld05vZGUuc3R5bGU7IH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld05vZGUuYXJyYXlJdGVtID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChoYXNPd24obmV3Tm9kZSwgJ3R5cGUnKSB8fCBoYXNPd24obmV3Tm9kZSwgJ2l0ZW1zJykpIHtcbiAgICAgIGNvbnN0IHBhcmVudFR5cGU6IHN0cmluZyA9XG4gICAgICAgIEpzb25Qb2ludGVyLmdldChqc2YubGF5b3V0LCBsYXlvdXRQb2ludGVyLCAwLCAtMikudHlwZTtcbiAgICAgIGlmICghaGFzT3duKG5ld05vZGUsICd0eXBlJykpIHtcbiAgICAgICAgbmV3Tm9kZS50eXBlID1cbiAgICAgICAgICBpbkFycmF5KHBhcmVudFR5cGUsIFsndGFicycsICd0YWJhcnJheSddKSA/ICd0YWInIDogJ2FycmF5JztcbiAgICAgIH1cbiAgICAgIG5ld05vZGUuYXJyYXlJdGVtID0gcGFyZW50VHlwZSA9PT0gJ2FycmF5JztcbiAgICAgIG5ld05vZGUud2lkZ2V0ID0gd2lkZ2V0TGlicmFyeS5nZXRXaWRnZXQobmV3Tm9kZS50eXBlKTtcbiAgICAgIHVwZGF0ZUlucHV0T3B0aW9ucyhuZXdOb2RlLCB7fSwganNmKTtcbiAgICB9XG4gICAgaWYgKG5ld05vZGUudHlwZSA9PT0gJ3N1Ym1pdCcpIHsgaGFzU3VibWl0QnV0dG9uID0gdHJ1ZTsgfVxuICAgIHJldHVybiBuZXdOb2RlO1xuICB9KTtcbiAgaWYgKGpzZi5oYXNSb290UmVmZXJlbmNlKSB7XG4gICAgY29uc3QgZnVsbExheW91dCA9IF8uY2xvbmVEZWVwKGZvcm1MYXlvdXQpO1xuICAgIGlmIChmdWxsTGF5b3V0W2Z1bGxMYXlvdXQubGVuZ3RoIC0gMV0udHlwZSA9PT0gJ3N1Ym1pdCcpIHsgZnVsbExheW91dC5wb3AoKTsgfVxuICAgIGpzZi5sYXlvdXRSZWZMaWJyYXJ5WycnXSA9IHtcbiAgICAgIF9pZDogbnVsbCxcbiAgICAgIGRhdGFQb2ludGVyOiAnJyxcbiAgICAgIGRhdGFUeXBlOiAnb2JqZWN0JyxcbiAgICAgIGl0ZW1zOiBmdWxsTGF5b3V0LFxuICAgICAgbmFtZTogJycsXG4gICAgICBvcHRpb25zOiBfLmNsb25lRGVlcChqc2YuZm9ybU9wdGlvbnMuZGVmYXV0V2lkZ2V0T3B0aW9ucyksXG4gICAgICByZWN1cnNpdmVSZWZlcmVuY2U6IHRydWUsXG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICB0eXBlOiAnc2VjdGlvbicsXG4gICAgICB3aWRnZXQ6IHdpZGdldExpYnJhcnkuZ2V0V2lkZ2V0KCdzZWN0aW9uJyksXG4gICAgfTtcbiAgfVxuICBpZiAoIWhhc1N1Ym1pdEJ1dHRvbikge1xuICAgIGZvcm1MYXlvdXQucHVzaCh7XG4gICAgICBfaWQ6IF8udW5pcXVlSWQoKSxcbiAgICAgIG9wdGlvbnM6IHsgdGl0bGU6ICdTdWJtaXQnIH0sXG4gICAgICB0eXBlOiAnc3VibWl0JyxcbiAgICAgIHdpZGdldDogd2lkZ2V0TGlicmFyeS5nZXRXaWRnZXQoJ3N1Ym1pdCcpLFxuICAgIH0pO1xuICB9XG4gIHJldHVybiBmb3JtTGF5b3V0O1xufVxuXG4vKipcbiAqICdidWlsZExheW91dEZyb21TY2hlbWEnIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtICB7IGFueSB9IGpzZiAtXG4gKiBAcGFyYW0gIHsgYW55IH0gd2lkZ2V0TGlicmFyeSAtXG4gKiBAcGFyYW0gIHsgYW55IH0gbm9kZVZhbHVlIC1cbiAqIEBwYXJhbSAgeyBzdHJpbmcgPSAnJyB9IHNjaGVtYVBvaW50ZXIgLVxuICogQHBhcmFtICB7IHN0cmluZyA9ICcnIH0gZGF0YVBvaW50ZXIgLVxuICogQHBhcmFtICB7IGJvb2xlYW4gPSBmYWxzZSB9IGFycmF5SXRlbSAtXG4gKiBAcGFyYW0gIHsgc3RyaW5nID0gbnVsbCB9IGFycmF5SXRlbVR5cGUgLVxuICogQHBhcmFtICB7IGJvb2xlYW4gPSBudWxsIH0gcmVtb3ZhYmxlIC1cbiAqIEBwYXJhbSAgeyBib29sZWFuID0gZmFsc2UgfSBmb3JSZWZMaWJyYXJ5IC1cbiAqIEBwYXJhbSAgeyBzdHJpbmcgPSAnJyB9IGRhdGFQb2ludGVyUHJlZml4IC1cbiAqIEByZXR1cm4geyBhbnkgfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRMYXlvdXRGcm9tU2NoZW1hKFxuICBqc2YsIHdpZGdldExpYnJhcnksIG5vZGVWYWx1ZSA9IG51bGwsIHNjaGVtYVBvaW50ZXIgPSAnJyxcbiAgZGF0YVBvaW50ZXIgPSAnJywgYXJyYXlJdGVtID0gZmFsc2UsIGFycmF5SXRlbVR5cGU6IHN0cmluZyA9IG51bGwsXG4gIHJlbW92YWJsZTogYm9vbGVhbiA9IG51bGwsIGZvclJlZkxpYnJhcnkgPSBmYWxzZSwgZGF0YVBvaW50ZXJQcmVmaXggPSAnJ1xuKSB7XG4gIGNvbnN0IHNjaGVtYSA9IEpzb25Qb2ludGVyLmdldChqc2Yuc2NoZW1hLCBzY2hlbWFQb2ludGVyKTtcbiAgaWYgKCFoYXNPd24oc2NoZW1hLCAndHlwZScpICYmICFoYXNPd24oc2NoZW1hLCAnJHJlZicpICYmXG4gICAgIWhhc093bihzY2hlbWEsICd4LXNjaGVtYS1mb3JtJylcbiAgKSB7IHJldHVybiBudWxsOyB9XG4gIGNvbnN0IG5ld05vZGVUeXBlOiBzdHJpbmcgPSBnZXRJbnB1dFR5cGUoc2NoZW1hKTtcbiAgaWYgKCFpc0RlZmluZWQobm9kZVZhbHVlKSAmJiAoXG4gICAganNmLmZvcm1PcHRpb25zLnNldFNjaGVtYURlZmF1bHRzID09PSB0cnVlIHx8XG4gICAgKGpzZi5mb3JtT3B0aW9ucy5zZXRTY2hlbWFEZWZhdWx0cyA9PT0gJ2F1dG8nICYmIGlzRW1wdHkoanNmLmZvcm1WYWx1ZXMpKVxuICApKSB7XG4gICAgbm9kZVZhbHVlID0gSnNvblBvaW50ZXIuZ2V0KGpzZi5zY2hlbWEsIHNjaGVtYVBvaW50ZXIgKyAnL2RlZmF1bHQnKTtcbiAgfVxuICBsZXQgbmV3Tm9kZTogYW55ID0ge1xuICAgIF9pZDogZm9yUmVmTGlicmFyeSA/IG51bGwgOiBfLnVuaXF1ZUlkKCksXG4gICAgYXJyYXlJdGVtOiBhcnJheUl0ZW0sXG4gICAgZGF0YVBvaW50ZXI6IEpzb25Qb2ludGVyLnRvR2VuZXJpY1BvaW50ZXIoZGF0YVBvaW50ZXIsIGpzZi5hcnJheU1hcCksXG4gICAgZGF0YVR5cGU6IHNjaGVtYS50eXBlIHx8IChoYXNPd24oc2NoZW1hLCAnJHJlZicpID8gJyRyZWYnIDogbnVsbCksXG4gICAgb3B0aW9uczoge30sXG4gICAgcmVxdWlyZWQ6IGlzSW5wdXRSZXF1aXJlZChqc2Yuc2NoZW1hLCBzY2hlbWFQb2ludGVyKSxcbiAgICB0eXBlOiBuZXdOb2RlVHlwZSxcbiAgICB3aWRnZXQ6IHdpZGdldExpYnJhcnkuZ2V0V2lkZ2V0KG5ld05vZGVUeXBlKSxcbiAgfTtcbiAgY29uc3QgbGFzdERhdGFLZXkgPSBKc29uUG9pbnRlci50b0tleShuZXdOb2RlLmRhdGFQb2ludGVyKTtcbiAgaWYgKGxhc3REYXRhS2V5ICE9PSAnLScpIHsgbmV3Tm9kZS5uYW1lID0gbGFzdERhdGFLZXk7IH1cbiAgaWYgKG5ld05vZGUuYXJyYXlJdGVtKSB7XG4gICAgbmV3Tm9kZS5hcnJheUl0ZW1UeXBlID0gYXJyYXlJdGVtVHlwZTtcbiAgICBuZXdOb2RlLm9wdGlvbnMucmVtb3ZhYmxlID0gcmVtb3ZhYmxlICE9PSBmYWxzZTtcbiAgfVxuICBjb25zdCBzaG9ydERhdGFQb2ludGVyID0gcmVtb3ZlUmVjdXJzaXZlUmVmZXJlbmNlcyhcbiAgICBkYXRhUG9pbnRlclByZWZpeCArIGRhdGFQb2ludGVyLCBqc2YuZGF0YVJlY3Vyc2l2ZVJlZk1hcCwganNmLmFycmF5TWFwXG4gICk7XG4gIGNvbnN0IHJlY3Vyc2l2ZSA9ICFzaG9ydERhdGFQb2ludGVyLmxlbmd0aCB8fFxuICAgIHNob3J0RGF0YVBvaW50ZXIgIT09IGRhdGFQb2ludGVyUHJlZml4ICsgZGF0YVBvaW50ZXI7XG4gIGlmICghanNmLmRhdGFNYXAuaGFzKHNob3J0RGF0YVBvaW50ZXIpKSB7XG4gICAganNmLmRhdGFNYXAuc2V0KHNob3J0RGF0YVBvaW50ZXIsIG5ldyBNYXAoKSk7XG4gIH1cbiAgY29uc3Qgbm9kZURhdGFNYXAgPSBqc2YuZGF0YU1hcC5nZXQoc2hvcnREYXRhUG9pbnRlcik7XG4gIGlmICghbm9kZURhdGFNYXAuaGFzKCdpbnB1dFR5cGUnKSkge1xuICAgIG5vZGVEYXRhTWFwLnNldCgnc2NoZW1hUG9pbnRlcicsIHNjaGVtYVBvaW50ZXIpO1xuICAgIG5vZGVEYXRhTWFwLnNldCgnaW5wdXRUeXBlJywgbmV3Tm9kZS50eXBlKTtcbiAgICBub2RlRGF0YU1hcC5zZXQoJ3dpZGdldCcsIG5ld05vZGUud2lkZ2V0KTtcbiAgICBub2RlRGF0YU1hcC5zZXQoJ2Rpc2FibGVkJywgISFuZXdOb2RlLm9wdGlvbnMuZGlzYWJsZWQpO1xuICB9XG4gIHVwZGF0ZUlucHV0T3B0aW9ucyhuZXdOb2RlLCBzY2hlbWEsIGpzZik7XG4gIGlmICghbmV3Tm9kZS5vcHRpb25zLnRpdGxlICYmIG5ld05vZGUubmFtZSAmJiAhL15cXGQrJC8udGVzdChuZXdOb2RlLm5hbWUpKSB7XG4gICAgbmV3Tm9kZS5vcHRpb25zLnRpdGxlID0gZml4VGl0bGUobmV3Tm9kZS5uYW1lKTtcbiAgfVxuXG4gIGlmIChuZXdOb2RlLmRhdGFUeXBlID09PSAnb2JqZWN0Jykge1xuICAgIGlmIChpc0FycmF5KHNjaGVtYS5yZXF1aXJlZCkgJiYgIW5vZGVEYXRhTWFwLmhhcygncmVxdWlyZWQnKSkge1xuICAgICAgbm9kZURhdGFNYXAuc2V0KCdyZXF1aXJlZCcsIHNjaGVtYS5yZXF1aXJlZCk7XG4gICAgfVxuICAgIGlmIChpc09iamVjdChzY2hlbWEucHJvcGVydGllcykpIHtcbiAgICAgIGNvbnN0IG5ld1NlY3Rpb246IGFueVtdID0gW107XG4gICAgICBjb25zdCBwcm9wZXJ0eUtleXMgPSBzY2hlbWFbJ3VpOm9yZGVyJ10gfHwgT2JqZWN0LmtleXMoc2NoZW1hLnByb3BlcnRpZXMpO1xuICAgICAgaWYgKHByb3BlcnR5S2V5cy5pbmNsdWRlcygnKicpICYmICFoYXNPd24oc2NoZW1hLnByb3BlcnRpZXMsICcqJykpIHtcbiAgICAgICAgY29uc3QgdW5uYW1lZEtleXMgPSBPYmplY3Qua2V5cyhzY2hlbWEucHJvcGVydGllcylcbiAgICAgICAgICAuZmlsdGVyKGtleSA9PiAhcHJvcGVydHlLZXlzLmluY2x1ZGVzKGtleSkpO1xuICAgICAgICBmb3IgKGxldCBpID0gcHJvcGVydHlLZXlzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKHByb3BlcnR5S2V5c1tpXSA9PT0gJyonKSB7XG4gICAgICAgICAgICBwcm9wZXJ0eUtleXMuc3BsaWNlKGksIDEsIC4uLnVubmFtZWRLZXlzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHByb3BlcnR5S2V5c1xuICAgICAgICAuZmlsdGVyKGtleSA9PiBoYXNPd24oc2NoZW1hLnByb3BlcnRpZXMsIGtleSkgfHxcbiAgICAgICAgICBoYXNPd24oc2NoZW1hLCAnYWRkaXRpb25hbFByb3BlcnRpZXMnKVxuICAgICAgICApXG4gICAgICAgIC5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgY29uc3Qga2V5U2NoZW1hUG9pbnRlciA9IGhhc093bihzY2hlbWEucHJvcGVydGllcywga2V5KSA/XG4gICAgICAgICAgICAnL3Byb3BlcnRpZXMvJyArIGtleSA6ICcvYWRkaXRpb25hbFByb3BlcnRpZXMnO1xuICAgICAgICAgIGNvbnN0IGlubmVySXRlbSA9IGJ1aWxkTGF5b3V0RnJvbVNjaGVtYShcbiAgICAgICAgICAgIGpzZiwgd2lkZ2V0TGlicmFyeSwgaXNPYmplY3Qobm9kZVZhbHVlKSA/IG5vZGVWYWx1ZVtrZXldIDogbnVsbCxcbiAgICAgICAgICAgIHNjaGVtYVBvaW50ZXIgKyBrZXlTY2hlbWFQb2ludGVyLFxuICAgICAgICAgICAgZGF0YVBvaW50ZXIgKyAnLycgKyBrZXksXG4gICAgICAgICAgICBmYWxzZSwgbnVsbCwgbnVsbCwgZm9yUmVmTGlicmFyeSwgZGF0YVBvaW50ZXJQcmVmaXhcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChpbm5lckl0ZW0pIHtcbiAgICAgICAgICAgIGlmIChpc0lucHV0UmVxdWlyZWQoc2NoZW1hLCAnLycgKyBrZXkpKSB7XG4gICAgICAgICAgICAgIGlubmVySXRlbS5vcHRpb25zLnJlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAganNmLmZpZWxkc1JlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld1NlY3Rpb24ucHVzaChpbm5lckl0ZW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICBpZiAoZGF0YVBvaW50ZXIgPT09ICcnICYmICFmb3JSZWZMaWJyYXJ5KSB7XG4gICAgICAgIG5ld05vZGUgPSBuZXdTZWN0aW9uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3Tm9kZS5pdGVtcyA9IG5ld1NlY3Rpb247XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFRPRE86IEFkZCBwYXR0ZXJuUHJvcGVydGllcyBhbmQgYWRkaXRpb25hbFByb3BlcnRpZXMgaW5wdXRzP1xuICAgIC8vIC4uLiBwb3NzaWJseSBwcm92aWRlIGEgd2F5IHRvIGVudGVyIGJvdGgga2V5IG5hbWVzIGFuZCB2YWx1ZXM/XG4gICAgLy8gaWYgKGlzT2JqZWN0KHNjaGVtYS5wYXR0ZXJuUHJvcGVydGllcykpIHsgfVxuICAgIC8vIGlmIChpc09iamVjdChzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMpKSB7IH1cblxuICB9IGVsc2UgaWYgKG5ld05vZGUuZGF0YVR5cGUgPT09ICdhcnJheScpIHtcbiAgICBuZXdOb2RlLml0ZW1zID0gW107XG4gICAgY29uc3QgdGVtcGxhdGVBcnJheTogYW55W10gPSBbXTtcbiAgICBuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXMgPSBNYXRoLm1pbihcbiAgICAgIHNjaGVtYS5tYXhJdGVtcyB8fCAxMDAwLCBuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXMgfHwgMTAwMFxuICAgICk7XG4gICAgbmV3Tm9kZS5vcHRpb25zLm1pbkl0ZW1zID0gTWF0aC5tYXgoXG4gICAgICBzY2hlbWEubWluSXRlbXMgfHwgMCwgbmV3Tm9kZS5vcHRpb25zLm1pbkl0ZW1zIHx8IDBcbiAgICApO1xuICAgIGlmICghbmV3Tm9kZS5vcHRpb25zLm1pbkl0ZW1zICYmIGlzSW5wdXRSZXF1aXJlZChqc2Yuc2NoZW1hLCBzY2hlbWFQb2ludGVyKSkge1xuICAgICAgbmV3Tm9kZS5vcHRpb25zLm1pbkl0ZW1zID0gMTtcbiAgICB9XG4gICAgaWYgKCFoYXNPd24obmV3Tm9kZS5vcHRpb25zLCAnbGlzdEl0ZW1zJykpIHsgbmV3Tm9kZS5vcHRpb25zLmxpc3RJdGVtcyA9IDE7IH1cbiAgICBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcyA9IGlzQXJyYXkoc2NoZW1hLml0ZW1zKSA/IHNjaGVtYS5pdGVtcy5sZW5ndGggOiAwO1xuICAgIGlmIChuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXMgPD0gbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXMpIHtcbiAgICAgIG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zID0gbmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zO1xuICAgICAgbmV3Tm9kZS5vcHRpb25zLmxpc3RJdGVtcyA9IDA7XG4gICAgfSBlbHNlIGlmIChuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXMgPFxuICAgICAgbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXMgKyBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zXG4gICAgKSB7XG4gICAgICBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zID0gbmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zIC0gbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXM7XG4gICAgfSBlbHNlIGlmIChuZXdOb2RlLm9wdGlvbnMubWluSXRlbXMgPlxuICAgICAgbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXMgKyBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zXG4gICAgKSB7XG4gICAgICBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zID0gbmV3Tm9kZS5vcHRpb25zLm1pbkl0ZW1zIC0gbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXM7XG4gICAgfVxuICAgIGlmICghbm9kZURhdGFNYXAuaGFzKCdtYXhJdGVtcycpKSB7XG4gICAgICBub2RlRGF0YU1hcC5zZXQoJ21heEl0ZW1zJywgbmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zKTtcbiAgICAgIG5vZGVEYXRhTWFwLnNldCgnbWluSXRlbXMnLCBuZXdOb2RlLm9wdGlvbnMubWluSXRlbXMpO1xuICAgICAgbm9kZURhdGFNYXAuc2V0KCd0dXBsZUl0ZW1zJywgbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXMpO1xuICAgICAgbm9kZURhdGFNYXAuc2V0KCdsaXN0SXRlbXMnLCBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zKTtcbiAgICB9XG4gICAgaWYgKCFqc2YuYXJyYXlNYXAuaGFzKHNob3J0RGF0YVBvaW50ZXIpKSB7XG4gICAgICBqc2YuYXJyYXlNYXAuc2V0KHNob3J0RGF0YVBvaW50ZXIsIG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zKTtcbiAgICB9XG4gICAgcmVtb3ZhYmxlID0gbmV3Tm9kZS5vcHRpb25zLnJlbW92YWJsZSAhPT0gZmFsc2U7XG4gICAgbGV0IGFkZGl0aW9uYWxJdGVtc1NjaGVtYVBvaW50ZXI6IHN0cmluZyA9IG51bGw7XG5cbiAgICAvLyBJZiAnaXRlbXMnIGlzIGFuIGFycmF5ID0gdHVwbGUgaXRlbXNcbiAgICBpZiAoaXNBcnJheShzY2hlbWEuaXRlbXMpKSB7XG4gICAgICBuZXdOb2RlLml0ZW1zID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zOyBpKyspIHtcbiAgICAgICAgbGV0IG5ld0l0ZW06IGFueTtcbiAgICAgICAgY29uc3QgaXRlbVJlZlBvaW50ZXIgPSByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzKFxuICAgICAgICAgIHNob3J0RGF0YVBvaW50ZXIgKyAnLycgKyBpLCBqc2YuZGF0YVJlY3Vyc2l2ZVJlZk1hcCwganNmLmFycmF5TWFwXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGl0ZW1SZWN1cnNpdmUgPSAhaXRlbVJlZlBvaW50ZXIubGVuZ3RoIHx8XG4gICAgICAgICAgaXRlbVJlZlBvaW50ZXIgIT09IHNob3J0RGF0YVBvaW50ZXIgKyAnLycgKyBpO1xuXG4gICAgICAgIC8vIElmIHJlbW92YWJsZSwgYWRkIHR1cGxlIGl0ZW0gbGF5b3V0IHRvIGxheW91dFJlZkxpYnJhcnlcbiAgICAgICAgaWYgKHJlbW92YWJsZSAmJiBpID49IG5ld05vZGUub3B0aW9ucy5taW5JdGVtcykge1xuICAgICAgICAgIGlmICghaGFzT3duKGpzZi5sYXlvdXRSZWZMaWJyYXJ5LCBpdGVtUmVmUG9pbnRlcikpIHtcbiAgICAgICAgICAgIC8vIFNldCB0byBudWxsIGZpcnN0IHRvIHByZXZlbnQgcmVjdXJzaXZlIHJlZmVyZW5jZSBmcm9tIGNhdXNpbmcgZW5kbGVzcyBsb29wXG4gICAgICAgICAgICBqc2YubGF5b3V0UmVmTGlicmFyeVtpdGVtUmVmUG9pbnRlcl0gPSBudWxsO1xuICAgICAgICAgICAganNmLmxheW91dFJlZkxpYnJhcnlbaXRlbVJlZlBvaW50ZXJdID0gYnVpbGRMYXlvdXRGcm9tU2NoZW1hKFxuICAgICAgICAgICAgICBqc2YsIHdpZGdldExpYnJhcnksIGlzQXJyYXkobm9kZVZhbHVlKSA/IG5vZGVWYWx1ZVtpXSA6IG51bGwsXG4gICAgICAgICAgICAgIHNjaGVtYVBvaW50ZXIgKyAnL2l0ZW1zLycgKyBpLFxuICAgICAgICAgICAgICBpdGVtUmVjdXJzaXZlID8gJycgOiBkYXRhUG9pbnRlciArICcvJyArIGksXG4gICAgICAgICAgICAgIHRydWUsICd0dXBsZScsIHRydWUsIHRydWUsIGl0ZW1SZWN1cnNpdmUgPyBkYXRhUG9pbnRlciArICcvJyArIGkgOiAnJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChpdGVtUmVjdXJzaXZlKSB7XG4gICAgICAgICAgICAgIGpzZi5sYXlvdXRSZWZMaWJyYXJ5W2l0ZW1SZWZQb2ludGVyXS5yZWN1cnNpdmVSZWZlcmVuY2UgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBuZXdJdGVtID0gZ2V0TGF5b3V0Tm9kZSh7XG4gICAgICAgICAgICAkcmVmOiBpdGVtUmVmUG9pbnRlcixcbiAgICAgICAgICAgIGRhdGFQb2ludGVyOiBkYXRhUG9pbnRlciArICcvJyArIGksXG4gICAgICAgICAgICByZWN1cnNpdmVSZWZlcmVuY2U6IGl0ZW1SZWN1cnNpdmUsXG4gICAgICAgICAgfSwganNmLCB3aWRnZXRMaWJyYXJ5LCBpc0FycmF5KG5vZGVWYWx1ZSkgPyBub2RlVmFsdWVbaV0gOiBudWxsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdJdGVtID0gYnVpbGRMYXlvdXRGcm9tU2NoZW1hKFxuICAgICAgICAgICAganNmLCB3aWRnZXRMaWJyYXJ5LCBpc0FycmF5KG5vZGVWYWx1ZSkgPyBub2RlVmFsdWVbaV0gOiBudWxsLFxuICAgICAgICAgICAgc2NoZW1hUG9pbnRlciArICcvaXRlbXMvJyArIGksXG4gICAgICAgICAgICBkYXRhUG9pbnRlciArICcvJyArIGksXG4gICAgICAgICAgICB0cnVlLCAndHVwbGUnLCBmYWxzZSwgZm9yUmVmTGlicmFyeSwgZGF0YVBvaW50ZXJQcmVmaXhcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdJdGVtKSB7IG5ld05vZGUuaXRlbXMucHVzaChuZXdJdGVtKTsgfVxuICAgICAgfVxuXG4gICAgICAvLyBJZiAnYWRkaXRpb25hbEl0ZW1zJyBpcyBhbiBvYmplY3QgPSBhZGRpdGlvbmFsIGxpc3QgaXRlbXMsIGFmdGVyIHR1cGxlIGl0ZW1zXG4gICAgICBpZiAoaXNPYmplY3Qoc2NoZW1hLmFkZGl0aW9uYWxJdGVtcykpIHtcbiAgICAgICAgYWRkaXRpb25hbEl0ZW1zU2NoZW1hUG9pbnRlciA9IHNjaGVtYVBvaW50ZXIgKyAnL2FkZGl0aW9uYWxJdGVtcyc7XG4gICAgICB9XG5cbiAgICAvLyBJZiAnaXRlbXMnIGlzIGFuIG9iamVjdCA9IGxpc3QgaXRlbXMgb25seSAobm8gdHVwbGUgaXRlbXMpXG4gICAgfSBlbHNlIGlmIChpc09iamVjdChzY2hlbWEuaXRlbXMpKSB7XG4gICAgICBhZGRpdGlvbmFsSXRlbXNTY2hlbWFQb2ludGVyID0gc2NoZW1hUG9pbnRlciArICcvaXRlbXMnO1xuICAgIH1cblxuICAgIGlmIChhZGRpdGlvbmFsSXRlbXNTY2hlbWFQb2ludGVyKSB7XG4gICAgICBjb25zdCBpdGVtUmVmUG9pbnRlciA9IHJlbW92ZVJlY3Vyc2l2ZVJlZmVyZW5jZXMoXG4gICAgICAgIHNob3J0RGF0YVBvaW50ZXIgKyAnLy0nLCBqc2YuZGF0YVJlY3Vyc2l2ZVJlZk1hcCwganNmLmFycmF5TWFwXG4gICAgICApO1xuICAgICAgY29uc3QgaXRlbVJlY3Vyc2l2ZSA9ICFpdGVtUmVmUG9pbnRlci5sZW5ndGggfHxcbiAgICAgICAgaXRlbVJlZlBvaW50ZXIgIT09IHNob3J0RGF0YVBvaW50ZXIgKyAnLy0nO1xuICAgICAgY29uc3QgaXRlbVNjaGVtYVBvaW50ZXIgPSByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzKFxuICAgICAgICBhZGRpdGlvbmFsSXRlbXNTY2hlbWFQb2ludGVyLCBqc2Yuc2NoZW1hUmVjdXJzaXZlUmVmTWFwLCBqc2YuYXJyYXlNYXBcbiAgICAgICk7XG4gICAgICAvLyBBZGQgbGlzdCBpdGVtIGxheW91dCB0byBsYXlvdXRSZWZMaWJyYXJ5XG4gICAgICBpZiAoaXRlbVJlZlBvaW50ZXIubGVuZ3RoICYmICFoYXNPd24oanNmLmxheW91dFJlZkxpYnJhcnksIGl0ZW1SZWZQb2ludGVyKSkge1xuICAgICAgICAvLyBTZXQgdG8gbnVsbCBmaXJzdCB0byBwcmV2ZW50IHJlY3Vyc2l2ZSByZWZlcmVuY2UgZnJvbSBjYXVzaW5nIGVuZGxlc3MgbG9vcFxuICAgICAgICBqc2YubGF5b3V0UmVmTGlicmFyeVtpdGVtUmVmUG9pbnRlcl0gPSBudWxsO1xuICAgICAgICBqc2YubGF5b3V0UmVmTGlicmFyeVtpdGVtUmVmUG9pbnRlcl0gPSBidWlsZExheW91dEZyb21TY2hlbWEoXG4gICAgICAgICAganNmLCB3aWRnZXRMaWJyYXJ5LCBudWxsLFxuICAgICAgICAgIGl0ZW1TY2hlbWFQb2ludGVyLFxuICAgICAgICAgIGl0ZW1SZWN1cnNpdmUgPyAnJyA6IGRhdGFQb2ludGVyICsgJy8tJyxcbiAgICAgICAgICB0cnVlLCAnbGlzdCcsIHJlbW92YWJsZSwgdHJ1ZSwgaXRlbVJlY3Vyc2l2ZSA/IGRhdGFQb2ludGVyICsgJy8tJyA6ICcnXG4gICAgICAgICk7XG4gICAgICAgIGlmIChpdGVtUmVjdXJzaXZlKSB7XG4gICAgICAgICAganNmLmxheW91dFJlZkxpYnJhcnlbaXRlbVJlZlBvaW50ZXJdLnJlY3Vyc2l2ZVJlZmVyZW5jZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQWRkIGFueSBhZGRpdGlvbmFsIGRlZmF1bHQgaXRlbXNcbiAgICAgIGlmICghaXRlbVJlY3Vyc2l2ZSB8fCBuZXdOb2RlLm9wdGlvbnMucmVxdWlyZWQpIHtcbiAgICAgICAgY29uc3QgYXJyYXlMZW5ndGggPSBNYXRoLm1pbihNYXRoLm1heChcbiAgICAgICAgICBpdGVtUmVjdXJzaXZlID8gMCA6XG4gICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcyArIG5ld05vZGUub3B0aW9ucy5saXN0SXRlbXMsXG4gICAgICAgICAgaXNBcnJheShub2RlVmFsdWUpID8gbm9kZVZhbHVlLmxlbmd0aCA6IDBcbiAgICAgICAgKSwgbmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zKTtcbiAgICAgICAgaWYgKG5ld05vZGUuaXRlbXMubGVuZ3RoIDwgYXJyYXlMZW5ndGgpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gbmV3Tm9kZS5pdGVtcy5sZW5ndGg7IGkgPCBhcnJheUxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBuZXdOb2RlLml0ZW1zLnB1c2goZ2V0TGF5b3V0Tm9kZSh7XG4gICAgICAgICAgICAgICRyZWY6IGl0ZW1SZWZQb2ludGVyLFxuICAgICAgICAgICAgICBkYXRhUG9pbnRlcjogZGF0YVBvaW50ZXIgKyAnLy0nLFxuICAgICAgICAgICAgICByZWN1cnNpdmVSZWZlcmVuY2U6IGl0ZW1SZWN1cnNpdmUsXG4gICAgICAgICAgICB9LCBqc2YsIHdpZGdldExpYnJhcnksIGlzQXJyYXkobm9kZVZhbHVlKSA/IG5vZGVWYWx1ZVtpXSA6IG51bGwpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSWYgbmVlZGVkLCBhZGQgYnV0dG9uIHRvIGFkZCBpdGVtcyB0byBhcnJheVxuICAgICAgaWYgKG5ld05vZGUub3B0aW9ucy5hZGRhYmxlICE9PSBmYWxzZSAmJlxuICAgICAgICBuZXdOb2RlLm9wdGlvbnMubWluSXRlbXMgPCBuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXMgJiZcbiAgICAgICAgKG5ld05vZGUuaXRlbXNbbmV3Tm9kZS5pdGVtcy5sZW5ndGggLSAxXSB8fCB7fSkudHlwZSAhPT0gJyRyZWYnXG4gICAgICApIHtcbiAgICAgICAgbGV0IGJ1dHRvblRleHQgPVxuICAgICAgICAgICgoanNmLmxheW91dFJlZkxpYnJhcnlbaXRlbVJlZlBvaW50ZXJdIHx8IHt9KS5vcHRpb25zIHx8IHt9KS50aXRsZTtcbiAgICAgICAgY29uc3QgcHJlZml4ID0gYnV0dG9uVGV4dCA/ICdBZGQgJyA6ICdBZGQgdG8gJztcbiAgICAgICAgaWYgKCFidXR0b25UZXh0KSB7XG4gICAgICAgICAgYnV0dG9uVGV4dCA9IHNjaGVtYS50aXRsZSB8fCBmaXhUaXRsZShKc29uUG9pbnRlci50b0tleShkYXRhUG9pbnRlcikpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghL15hZGRcXGIvaS50ZXN0KGJ1dHRvblRleHQpKSB7IGJ1dHRvblRleHQgPSBwcmVmaXggKyBidXR0b25UZXh0OyB9XG4gICAgICAgIG5ld05vZGUuaXRlbXMucHVzaCh7XG4gICAgICAgICAgX2lkOiBfLnVuaXF1ZUlkKCksXG4gICAgICAgICAgYXJyYXlJdGVtOiB0cnVlLFxuICAgICAgICAgIGFycmF5SXRlbVR5cGU6ICdsaXN0JyxcbiAgICAgICAgICBkYXRhUG9pbnRlcjogbmV3Tm9kZS5kYXRhUG9pbnRlciArICcvLScsXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgbGlzdEl0ZW1zOiBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zLFxuICAgICAgICAgICAgbWF4SXRlbXM6IG5ld05vZGUub3B0aW9ucy5tYXhJdGVtcyxcbiAgICAgICAgICAgIG1pbkl0ZW1zOiBuZXdOb2RlLm9wdGlvbnMubWluSXRlbXMsXG4gICAgICAgICAgICByZW1vdmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdGl0bGU6IGJ1dHRvblRleHQsXG4gICAgICAgICAgICB0dXBsZUl0ZW1zOiBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlY3Vyc2l2ZVJlZmVyZW5jZTogaXRlbVJlY3Vyc2l2ZSxcbiAgICAgICAgICB0eXBlOiAnJHJlZicsXG4gICAgICAgICAgd2lkZ2V0OiB3aWRnZXRMaWJyYXJ5LmdldFdpZGdldCgnJHJlZicpLFxuICAgICAgICAgICRyZWY6IGl0ZW1SZWZQb2ludGVyLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfSBlbHNlIGlmIChuZXdOb2RlLmRhdGFUeXBlID09PSAnJHJlZicpIHtcbiAgICBjb25zdCBzY2hlbWFSZWYgPSBKc29uUG9pbnRlci5jb21waWxlKHNjaGVtYS4kcmVmKTtcbiAgICBjb25zdCBkYXRhUmVmID0gSnNvblBvaW50ZXIudG9EYXRhUG9pbnRlcihzY2hlbWFSZWYsIGpzZi5zY2hlbWEpO1xuICAgIGxldCBidXR0b25UZXh0ID0gJyc7XG5cbiAgICAvLyBHZXQgbmV3Tm9kZSB0aXRsZVxuICAgIGlmIChuZXdOb2RlLm9wdGlvbnMuYWRkKSB7XG4gICAgICBidXR0b25UZXh0ID0gbmV3Tm9kZS5vcHRpb25zLmFkZDtcbiAgICB9IGVsc2UgaWYgKG5ld05vZGUubmFtZSAmJiAhL15cXGQrJC8udGVzdChuZXdOb2RlLm5hbWUpKSB7XG4gICAgICBidXR0b25UZXh0ID1cbiAgICAgICAgKC9eYWRkXFxiL2kudGVzdChuZXdOb2RlLm5hbWUpID8gJycgOiAnQWRkICcpICsgZml4VGl0bGUobmV3Tm9kZS5uYW1lKTtcblxuICAgIC8vIElmIG5ld05vZGUgZG9lc24ndCBoYXZlIGEgdGl0bGUsIGxvb2sgZm9yIHRpdGxlIG9mIHBhcmVudCBhcnJheSBpdGVtXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHBhcmVudFNjaGVtYSA9XG4gICAgICAgIEpzb25Qb2ludGVyLmdldChqc2Yuc2NoZW1hLCBzY2hlbWFQb2ludGVyLCAwLCAtMSk7XG4gICAgICBpZiAoaGFzT3duKHBhcmVudFNjaGVtYSwgJ3RpdGxlJykpIHtcbiAgICAgICAgYnV0dG9uVGV4dCA9ICdBZGQgdG8gJyArIHBhcmVudFNjaGVtYS50aXRsZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBvaW50ZXJBcnJheSA9IEpzb25Qb2ludGVyLnBhcnNlKG5ld05vZGUuZGF0YVBvaW50ZXIpO1xuICAgICAgICBidXR0b25UZXh0ID0gJ0FkZCB0byAnICsgZml4VGl0bGUocG9pbnRlckFycmF5W3BvaW50ZXJBcnJheS5sZW5ndGggLSAyXSk7XG4gICAgICB9XG4gICAgfVxuICAgIE9iamVjdC5hc3NpZ24obmV3Tm9kZSwge1xuICAgICAgcmVjdXJzaXZlUmVmZXJlbmNlOiB0cnVlLFxuICAgICAgd2lkZ2V0OiB3aWRnZXRMaWJyYXJ5LmdldFdpZGdldCgnJHJlZicpLFxuICAgICAgJHJlZjogZGF0YVJlZixcbiAgICB9KTtcbiAgICBPYmplY3QuYXNzaWduKG5ld05vZGUub3B0aW9ucywge1xuICAgICAgcmVtb3ZhYmxlOiBmYWxzZSxcbiAgICAgIHRpdGxlOiBidXR0b25UZXh0LFxuICAgIH0pO1xuICAgIGlmIChpc051bWJlcihKc29uUG9pbnRlci5nZXQoanNmLnNjaGVtYSwgc2NoZW1hUG9pbnRlciwgMCwgLTEpLm1heEl0ZW1zKSkge1xuICAgICAgbmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zID1cbiAgICAgICAgSnNvblBvaW50ZXIuZ2V0KGpzZi5zY2hlbWEsIHNjaGVtYVBvaW50ZXIsIDAsIC0xKS5tYXhJdGVtcztcbiAgICB9XG5cbiAgICAvLyBBZGQgbGF5b3V0IHRlbXBsYXRlIHRvIGxheW91dFJlZkxpYnJhcnlcbiAgICBpZiAoZGF0YVJlZi5sZW5ndGgpIHtcbiAgICAgIGlmICghaGFzT3duKGpzZi5sYXlvdXRSZWZMaWJyYXJ5LCBkYXRhUmVmKSkge1xuICAgICAgICAvLyBTZXQgdG8gbnVsbCBmaXJzdCB0byBwcmV2ZW50IHJlY3Vyc2l2ZSByZWZlcmVuY2UgZnJvbSBjYXVzaW5nIGVuZGxlc3MgbG9vcFxuICAgICAgICBqc2YubGF5b3V0UmVmTGlicmFyeVtkYXRhUmVmXSA9IG51bGw7XG4gICAgICAgIGNvbnN0IG5ld0xheW91dCA9IGJ1aWxkTGF5b3V0RnJvbVNjaGVtYShcbiAgICAgICAgICBqc2YsIHdpZGdldExpYnJhcnksIG51bGwsIHNjaGVtYVJlZiwgJycsXG4gICAgICAgICAgbmV3Tm9kZS5hcnJheUl0ZW0sIG5ld05vZGUuYXJyYXlJdGVtVHlwZSwgdHJ1ZSwgdHJ1ZSwgZGF0YVBvaW50ZXJcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKG5ld0xheW91dCkge1xuICAgICAgICAgIG5ld0xheW91dC5yZWN1cnNpdmVSZWZlcmVuY2UgPSB0cnVlO1xuICAgICAgICAgIGpzZi5sYXlvdXRSZWZMaWJyYXJ5W2RhdGFSZWZdID0gbmV3TGF5b3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBqc2YubGF5b3V0UmVmTGlicmFyeVtkYXRhUmVmXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICghanNmLmxheW91dFJlZkxpYnJhcnlbZGF0YVJlZl0ucmVjdXJzaXZlUmVmZXJlbmNlKSB7XG4gICAgICAgIGpzZi5sYXlvdXRSZWZMaWJyYXJ5W2RhdGFSZWZdLnJlY3Vyc2l2ZVJlZmVyZW5jZSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXdOb2RlO1xufVxuXG4vKipcbiAqICdtYXBMYXlvdXQnIGZ1bmN0aW9uXG4gKlxuICogQ3JlYXRlcyBhIG5ldyBsYXlvdXQgYnkgcnVubmluZyBlYWNoIGVsZW1lbnQgaW4gYW4gZXhpc3RpbmcgbGF5b3V0IHRocm91Z2hcbiAqIGFuIGl0ZXJhdGVlLiBSZWN1cnNpdmVseSBtYXBzIHdpdGhpbiBhcnJheSBlbGVtZW50cyAnaXRlbXMnIGFuZCAndGFicycuXG4gKiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZCB3aXRoIGZvdXIgYXJndW1lbnRzOiAodmFsdWUsIGluZGV4LCBsYXlvdXQsIHBhdGgpXG4gKlxuICogVGhlIHJldHVybmVkIGxheW91dCBtYXkgYmUgbG9uZ2VyIChvciBzaG9ydGVyKSB0aGVuIHRoZSBzb3VyY2UgbGF5b3V0LlxuICpcbiAqIElmIGFuIGl0ZW0gZnJvbSB0aGUgc291cmNlIGxheW91dCByZXR1cm5zIG11bHRpcGxlIGl0ZW1zIChhcyAnKicgdXN1YWxseSB3aWxsKSxcbiAqIHRoaXMgZnVuY3Rpb24gd2lsbCBrZWVwIGFsbCByZXR1cm5lZCBpdGVtcyBpbi1saW5lIHdpdGggdGhlIHN1cnJvdW5kaW5nIGl0ZW1zLlxuICpcbiAqIElmIGFuIGl0ZW0gZnJvbSB0aGUgc291cmNlIGxheW91dCBjYXVzZXMgYW4gZXJyb3IgYW5kIHJldHVybnMgbnVsbCwgaXQgaXNcbiAqIHNraXBwZWQgd2l0aG91dCBlcnJvciwgYW5kIHRoZSBmdW5jdGlvbiB3aWxsIHN0aWxsIHJldHVybiBhbGwgbm9uLW51bGwgaXRlbXMuXG4gKlxuICogQHBhcmFtICB7IGFueVtdIH0gbGF5b3V0IC0gdGhlIGxheW91dCB0byBtYXBcbiAqIEBwYXJhbSAgeyAodjogYW55LCBpPzogbnVtYmVyLCBsPzogYW55LCBwPzogc3RyaW5nKSA9PiBhbnkgfVxuICogICBmdW5jdGlvbiAtIHRoZSBmdW5jaXRvbiB0byBpbnZva2Ugb24gZWFjaCBlbGVtZW50XG4gKiBAcGFyYW0gIHsgc3RyaW5nfHN0cmluZ1tdID0gJycgfSBsYXlvdXRQb2ludGVyIC0gdGhlIGxheW91dFBvaW50ZXIgdG8gbGF5b3V0LCBpbnNpZGUgcm9vdExheW91dFxuICogQHBhcmFtICB7IGFueVtdID0gbGF5b3V0IH0gcm9vdExheW91dCAtIHRoZSByb290IGxheW91dCwgd2hpY2ggY29uYXRpbnMgbGF5b3V0XG4gKiBAcmV0dXJuIHsgYW55W10gfVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwTGF5b3V0KGxheW91dCwgZm4sIGxheW91dFBvaW50ZXIgPSAnJywgcm9vdExheW91dCA9IGxheW91dCkge1xuICBsZXQgaW5kZXhQYWQgPSAwO1xuICBsZXQgbmV3TGF5b3V0OiBhbnlbXSA9IFtdO1xuICBmb3JFYWNoKGxheW91dCwgKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcmVhbEluZGV4ID0gK2luZGV4ICsgaW5kZXhQYWQ7XG4gICAgY29uc3QgbmV3TGF5b3V0UG9pbnRlciA9IGxheW91dFBvaW50ZXIgKyAnLycgKyByZWFsSW5kZXg7XG4gICAgbGV0IG5ld05vZGU6IGFueSA9IGNvcHkoaXRlbSk7XG4gICAgbGV0IGl0ZW1zQXJyYXk6IGFueVtdID0gW107XG4gICAgaWYgKGlzT2JqZWN0KGl0ZW0pKSB7XG4gICAgICBpZiAoaGFzT3duKGl0ZW0sICd0YWJzJykpIHtcbiAgICAgICAgaXRlbS5pdGVtcyA9IGl0ZW0udGFicztcbiAgICAgICAgZGVsZXRlIGl0ZW0udGFicztcbiAgICAgIH1cbiAgICAgIGlmIChoYXNPd24oaXRlbSwgJ2l0ZW1zJykpIHtcbiAgICAgICAgaXRlbXNBcnJheSA9IGlzQXJyYXkoaXRlbS5pdGVtcykgPyBpdGVtLml0ZW1zIDogW2l0ZW0uaXRlbXNdO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXRlbXNBcnJheS5sZW5ndGgpIHtcbiAgICAgIG5ld05vZGUuaXRlbXMgPSBtYXBMYXlvdXQoaXRlbXNBcnJheSwgZm4sIG5ld0xheW91dFBvaW50ZXIgKyAnL2l0ZW1zJywgcm9vdExheW91dCk7XG4gICAgfVxuICAgIG5ld05vZGUgPSBmbihuZXdOb2RlLCByZWFsSW5kZXgsIG5ld0xheW91dFBvaW50ZXIsIHJvb3RMYXlvdXQpO1xuICAgIGlmICghaXNEZWZpbmVkKG5ld05vZGUpKSB7XG4gICAgICBpbmRleFBhZC0tO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaXNBcnJheShuZXdOb2RlKSkgeyBpbmRleFBhZCArPSBuZXdOb2RlLmxlbmd0aCAtIDE7IH1cbiAgICAgIG5ld0xheW91dCA9IG5ld0xheW91dC5jb25jYXQobmV3Tm9kZSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG5ld0xheW91dDtcbn1cblxuLyoqXG4gKiAnZ2V0TGF5b3V0Tm9kZScgZnVuY3Rpb25cbiAqIENvcHkgYSBuZXcgbGF5b3V0Tm9kZSBmcm9tIGxheW91dFJlZkxpYnJhcnlcbiAqXG4gKiBAcGFyYW0gIHsgYW55IH0gcmVmTm9kZSAtXG4gKiBAcGFyYW0gIHsgYW55IH0gbGF5b3V0UmVmTGlicmFyeSAtXG4gKiBAcGFyYW0gIHsgYW55ID0gbnVsbCB9IHdpZGdldExpYnJhcnkgLVxuICogQHBhcmFtICB7IGFueSA9IG51bGwgfSBub2RlVmFsdWUgLVxuICogQHJldHVybiB7IGFueSB9IGNvcGllZCBsYXlvdXROb2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRMYXlvdXROb2RlKFxuICByZWZOb2RlLCBqc2YsIHdpZGdldExpYnJhcnk6IGFueSA9IG51bGwsIG5vZGVWYWx1ZTogYW55ID0gbnVsbFxuKSB7XG5cbiAgLy8gSWYgcmVjdXJzaXZlIHJlZmVyZW5jZSBhbmQgYnVpbGRpbmcgaW5pdGlhbCBsYXlvdXQsIHJldHVybiBBZGQgYnV0dG9uXG4gIGlmIChyZWZOb2RlLnJlY3Vyc2l2ZVJlZmVyZW5jZSAmJiB3aWRnZXRMaWJyYXJ5KSB7XG4gICAgY29uc3QgbmV3TGF5b3V0Tm9kZSA9IF8uY2xvbmVEZWVwKHJlZk5vZGUpO1xuICAgIGlmICghbmV3TGF5b3V0Tm9kZS5vcHRpb25zKSB7IG5ld0xheW91dE5vZGUub3B0aW9ucyA9IHt9OyB9XG4gICAgT2JqZWN0LmFzc2lnbihuZXdMYXlvdXROb2RlLCB7XG4gICAgICByZWN1cnNpdmVSZWZlcmVuY2U6IHRydWUsXG4gICAgICB3aWRnZXQ6IHdpZGdldExpYnJhcnkuZ2V0V2lkZ2V0KCckcmVmJyksXG4gICAgfSk7XG4gICAgT2JqZWN0LmFzc2lnbihuZXdMYXlvdXROb2RlLm9wdGlvbnMsIHtcbiAgICAgIHJlbW92YWJsZTogZmFsc2UsXG4gICAgICB0aXRsZTogJ0FkZCAnICsgbmV3TGF5b3V0Tm9kZS4kcmVmLFxuICAgIH0pO1xuICAgIHJldHVybiBuZXdMYXlvdXROb2RlO1xuXG4gIC8vIE90aGVyd2lzZSwgcmV0dXJuIHJlZmVyZW5jZWQgbGF5b3V0XG59IGVsc2Uge1xuICAgIGxldCBuZXdMYXlvdXROb2RlID0ganNmLmxheW91dFJlZkxpYnJhcnlbcmVmTm9kZS4kcmVmXTtcbiAgICAvLyBJZiB2YWx1ZSBkZWZpbmVkLCBidWlsZCBuZXcgbm9kZSBmcm9tIHNjaGVtYSAodG8gc2V0IGFycmF5IGxlbmd0aHMpXG4gICAgaWYgKGlzRGVmaW5lZChub2RlVmFsdWUpKSB7XG4gICAgICBuZXdMYXlvdXROb2RlID0gYnVpbGRMYXlvdXRGcm9tU2NoZW1hKFxuICAgICAgICBqc2YsIHdpZGdldExpYnJhcnksIG5vZGVWYWx1ZSxcbiAgICAgICAgSnNvblBvaW50ZXIudG9TY2hlbWFQb2ludGVyKHJlZk5vZGUuJHJlZiwganNmLnNjaGVtYSksXG4gICAgICAgIHJlZk5vZGUuJHJlZiwgbmV3TGF5b3V0Tm9kZS5hcnJheUl0ZW0sXG4gICAgICAgIG5ld0xheW91dE5vZGUuYXJyYXlJdGVtVHlwZSwgbmV3TGF5b3V0Tm9kZS5vcHRpb25zLnJlbW92YWJsZSwgZmFsc2VcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIHZhbHVlIG5vdCBkZWZpbmVkLCBjb3B5IG5vZGUgZnJvbSBsYXlvdXRSZWZMaWJyYXJ5XG4gICAgICBuZXdMYXlvdXROb2RlID0gXy5jbG9uZURlZXAobmV3TGF5b3V0Tm9kZSk7XG4gICAgICBKc29uUG9pbnRlci5mb3JFYWNoRGVlcChuZXdMYXlvdXROb2RlLCAoc3ViTm9kZSwgcG9pbnRlcikgPT4ge1xuXG4gICAgICAgIC8vIFJlc2V0IGFsbCBfaWQncyBpbiBuZXdMYXlvdXROb2RlIHRvIHVuaXF1ZSB2YWx1ZXNcbiAgICAgICAgaWYgKGhhc093bihzdWJOb2RlLCAnX2lkJykpIHsgc3ViTm9kZS5faWQgPSBfLnVuaXF1ZUlkKCk7IH1cblxuICAgICAgICAvLyBJZiBhZGRpbmcgYSByZWN1cnNpdmUgaXRlbSwgcHJlZml4IGN1cnJlbnQgZGF0YVBvaW50ZXJcbiAgICAgICAgLy8gdG8gYWxsIGRhdGFQb2ludGVycyBpbiBuZXcgbGF5b3V0Tm9kZVxuICAgICAgICBpZiAocmVmTm9kZS5yZWN1cnNpdmVSZWZlcmVuY2UgJiYgaGFzT3duKHN1Yk5vZGUsICdkYXRhUG9pbnRlcicpKSB7XG4gICAgICAgICAgc3ViTm9kZS5kYXRhUG9pbnRlciA9IHJlZk5vZGUuZGF0YVBvaW50ZXIgKyBzdWJOb2RlLmRhdGFQb2ludGVyO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld0xheW91dE5vZGU7XG4gIH1cbn1cblxuLyoqXG4gKiAnYnVpbGRUaXRsZU1hcCcgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0gIHsgYW55IH0gdGl0bGVNYXAgLVxuICogQHBhcmFtICB7IGFueSB9IGVudW1MaXN0IC1cbiAqIEBwYXJhbSAgeyBib29sZWFuID0gdHJ1ZSB9IGZpZWxkUmVxdWlyZWQgLVxuICogQHBhcmFtICB7IGJvb2xlYW4gPSB0cnVlIH0gZmxhdExpc3QgLVxuICogQHJldHVybiB7IFRpdGxlTWFwSXRlbVtdIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkVGl0bGVNYXAoXG4gIHRpdGxlTWFwLCBlbnVtTGlzdCwgZmllbGRSZXF1aXJlZCA9IHRydWUsIGZsYXRMaXN0ID0gdHJ1ZVxuKSB7XG4gIGxldCBuZXdUaXRsZU1hcDogVGl0bGVNYXBJdGVtW10gPSBbXTtcbiAgbGV0IGhhc0VtcHR5VmFsdWUgPSBmYWxzZTtcbiAgaWYgKHRpdGxlTWFwKSB7XG4gICAgaWYgKGlzQXJyYXkodGl0bGVNYXApKSB7XG4gICAgICBpZiAoZW51bUxpc3QpIHtcbiAgICAgICAgZm9yIChjb25zdCBpIG9mIE9iamVjdC5rZXlzKHRpdGxlTWFwKSkge1xuICAgICAgICAgIGlmIChpc09iamVjdCh0aXRsZU1hcFtpXSkpIHsgLy8gSlNPTiBGb3JtIHN0eWxlXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRpdGxlTWFwW2ldLnZhbHVlO1xuICAgICAgICAgICAgaWYgKGVudW1MaXN0LmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICAgICAgICBjb25zdCBuYW1lID0gdGl0bGVNYXBbaV0ubmFtZTtcbiAgICAgICAgICAgICAgbmV3VGl0bGVNYXAucHVzaCh7IG5hbWUsIHZhbHVlIH0pO1xuICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkgeyBoYXNFbXB0eVZhbHVlID0gdHJ1ZTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcodGl0bGVNYXBbaV0pKSB7IC8vIFJlYWN0IEpzb25zY2hlbWEgRm9ybSBzdHlsZVxuICAgICAgICAgICAgaWYgKGkgPCBlbnVtTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IHRpdGxlTWFwW2ldO1xuICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGVudW1MaXN0W2ldO1xuICAgICAgICAgICAgICBuZXdUaXRsZU1hcC5wdXNoKHsgbmFtZSwgdmFsdWUgfSk7XG4gICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7IGhhc0VtcHR5VmFsdWUgPSB0cnVlOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgeyAvLyBJZiBhcnJheSB0aXRsZU1hcCBhbmQgbm8gZW51bSBsaXN0LCBqdXN0IHJldHVybiB0aGUgdGl0bGVNYXAgLSBBbmd1bGFyIFNjaGVtYSBGb3JtIHN0eWxlXG4gICAgICAgIG5ld1RpdGxlTWFwID0gdGl0bGVNYXA7XG4gICAgICAgIGlmICghZmllbGRSZXF1aXJlZCkge1xuICAgICAgICAgIGhhc0VtcHR5VmFsdWUgPSAhIW5ld1RpdGxlTWFwXG4gICAgICAgICAgICAuZmlsdGVyKGkgPT4gaS52YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IGkudmFsdWUgPT09IG51bGwpXG4gICAgICAgICAgICAubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChlbnVtTGlzdCkgeyAvLyBBbHRlcm5hdGUgSlNPTiBGb3JtIHN0eWxlLCB3aXRoIGVudW0gbGlzdFxuICAgICAgZm9yIChjb25zdCBpIG9mIE9iamVjdC5rZXlzKGVudW1MaXN0KSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGVudW1MaXN0W2ldO1xuICAgICAgICBpZiAoaGFzT3duKHRpdGxlTWFwLCB2YWx1ZSkpIHtcbiAgICAgICAgICBjb25zdCBuYW1lID0gdGl0bGVNYXBbdmFsdWVdO1xuICAgICAgICAgIG5ld1RpdGxlTWFwLnB1c2goeyBuYW1lLCB2YWx1ZSB9KTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkgeyBoYXNFbXB0eVZhbHVlID0gdHJ1ZTsgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHsgLy8gQWx0ZXJuYXRlIEpTT04gRm9ybSBzdHlsZSwgd2l0aG91dCBlbnVtIGxpc3RcbiAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgT2JqZWN0LmtleXModGl0bGVNYXApKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aXRsZU1hcFt2YWx1ZV07XG4gICAgICAgIG5ld1RpdGxlTWFwLnB1c2goeyBuYW1lLCB2YWx1ZSB9KTtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHsgaGFzRW1wdHlWYWx1ZSA9IHRydWU7IH1cbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoZW51bUxpc3QpIHsgLy8gQnVpbGQgbWFwIGZyb20gZW51bSBsaXN0IGFsb25lXG4gICAgZm9yIChjb25zdCBpIG9mIE9iamVjdC5rZXlzKGVudW1MaXN0KSkge1xuICAgICAgY29uc3QgbmFtZSA9IGVudW1MaXN0W2ldO1xuICAgICAgY29uc3QgdmFsdWUgPSBlbnVtTGlzdFtpXTtcbiAgICAgIG5ld1RpdGxlTWFwLnB1c2goeyBuYW1lLCB2YWx1ZX0pO1xuICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHsgaGFzRW1wdHlWYWx1ZSA9IHRydWU7IH1cbiAgICB9XG4gIH0gZWxzZSB7IC8vIElmIG5vIHRpdGxlTWFwIGFuZCBubyBlbnVtIGxpc3QsIHJldHVybiBkZWZhdWx0IG1hcCBvZiBib29sZWFuIHZhbHVlc1xuICAgIG5ld1RpdGxlTWFwID0gWyB7IG5hbWU6ICdUcnVlJywgdmFsdWU6IHRydWUgfSwgeyBuYW1lOiAnRmFsc2UnLCB2YWx1ZTogZmFsc2UgfSBdO1xuICB9XG5cbiAgLy8gRG9lcyB0aXRsZU1hcCBoYXZlIGdyb3Vwcz9cbiAgaWYgKG5ld1RpdGxlTWFwLnNvbWUodGl0bGUgPT4gaGFzT3duKHRpdGxlLCAnZ3JvdXAnKSkpIHtcbiAgICBoYXNFbXB0eVZhbHVlID0gZmFsc2U7XG5cbiAgICAvLyBJZiBmbGF0TGlzdCA9IHRydWUsIGZsYXR0ZW4gaXRlbXMgJiB1cGRhdGUgbmFtZSB0byBncm91cDogbmFtZVxuICAgIGlmIChmbGF0TGlzdCkge1xuICAgICAgbmV3VGl0bGVNYXAgPSBuZXdUaXRsZU1hcC5yZWR1Y2UoKGdyb3VwVGl0bGVNYXAsIHRpdGxlKSA9PiB7XG4gICAgICAgIGlmIChoYXNPd24odGl0bGUsICdncm91cCcpKSB7XG4gICAgICAgICAgaWYgKGlzQXJyYXkodGl0bGUuaXRlbXMpKSB7XG4gICAgICAgICAgICBncm91cFRpdGxlTWFwID0gW1xuICAgICAgICAgICAgICAuLi5ncm91cFRpdGxlTWFwLFxuICAgICAgICAgICAgICAuLi50aXRsZS5pdGVtcy5tYXAoaXRlbSA9PlxuICAgICAgICAgICAgICAgICh7IC4uLml0ZW0sIC4uLnsgbmFtZTogYCR7dGl0bGUuZ3JvdXB9OiAke2l0ZW0ubmFtZX1gIH0gfSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGlmICh0aXRsZS5pdGVtcy5zb21lKGl0ZW0gPT4gaXRlbS52YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IGl0ZW0udmFsdWUgPT09IG51bGwpKSB7XG4gICAgICAgICAgICAgIGhhc0VtcHR5VmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaGFzT3duKHRpdGxlLCAnbmFtZScpICYmIGhhc093bih0aXRsZSwgJ3ZhbHVlJykpIHtcbiAgICAgICAgICAgIHRpdGxlLm5hbWUgPSBgJHt0aXRsZS5ncm91cH06ICR7dGl0bGUubmFtZX1gO1xuICAgICAgICAgICAgZGVsZXRlIHRpdGxlLmdyb3VwO1xuICAgICAgICAgICAgZ3JvdXBUaXRsZU1hcC5wdXNoKHRpdGxlKTtcbiAgICAgICAgICAgIGlmICh0aXRsZS52YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHRpdGxlLnZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIGhhc0VtcHR5VmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBncm91cFRpdGxlTWFwLnB1c2godGl0bGUpO1xuICAgICAgICAgIGlmICh0aXRsZS52YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHRpdGxlLnZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICBoYXNFbXB0eVZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdyb3VwVGl0bGVNYXA7XG4gICAgICB9LCBbXSk7XG5cbiAgICAvLyBJZiBmbGF0TGlzdCA9IGZhbHNlLCBjb21iaW5lIGl0ZW1zIGZyb20gbWF0Y2hpbmcgZ3JvdXBzXG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1RpdGxlTWFwID0gbmV3VGl0bGVNYXAucmVkdWNlKChncm91cFRpdGxlTWFwLCB0aXRsZSkgPT4ge1xuICAgICAgICBpZiAoaGFzT3duKHRpdGxlLCAnZ3JvdXAnKSkge1xuICAgICAgICAgIGlmICh0aXRsZS5ncm91cCAhPT0gKGdyb3VwVGl0bGVNYXBbZ3JvdXBUaXRsZU1hcC5sZW5ndGggLSAxXSB8fCB7fSkuZ3JvdXApIHtcbiAgICAgICAgICAgIGdyb3VwVGl0bGVNYXAucHVzaCh7IGdyb3VwOiB0aXRsZS5ncm91cCwgaXRlbXM6IHRpdGxlLml0ZW1zIHx8IFtdIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaGFzT3duKHRpdGxlLCAnbmFtZScpICYmIGhhc093bih0aXRsZSwgJ3ZhbHVlJykpIHtcbiAgICAgICAgICAgIGdyb3VwVGl0bGVNYXBbZ3JvdXBUaXRsZU1hcC5sZW5ndGggLSAxXS5pdGVtc1xuICAgICAgICAgICAgICAucHVzaCh7IG5hbWU6IHRpdGxlLm5hbWUsIHZhbHVlOiB0aXRsZS52YWx1ZSB9KTtcbiAgICAgICAgICAgIGlmICh0aXRsZS52YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHRpdGxlLnZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIGhhc0VtcHR5VmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBncm91cFRpdGxlTWFwLnB1c2godGl0bGUpO1xuICAgICAgICAgIGlmICh0aXRsZS52YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHRpdGxlLnZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICBoYXNFbXB0eVZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdyb3VwVGl0bGVNYXA7XG4gICAgICB9LCBbXSk7XG4gICAgfVxuICB9XG4gIGlmICghZmllbGRSZXF1aXJlZCAmJiAhaGFzRW1wdHlWYWx1ZSkge1xuICAgIG5ld1RpdGxlTWFwLnVuc2hpZnQoeyBuYW1lOiAnPGVtPk5vbmU8L2VtPicsIHZhbHVlOiBudWxsIH0pO1xuICB9XG4gIHJldHVybiBuZXdUaXRsZU1hcDtcbn1cbiJdfQ==