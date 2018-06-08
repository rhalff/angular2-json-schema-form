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
    let hasSubmitButton = !JsonPointer.get(jsf, '/formOptions/addSubmit');
    const formLayout = mapLayout(jsf.layout, (layoutItem, index, layoutPointer) => {
        const currentIndex = index;
        const newNode = {
            _id: _.uniqueId(),
            options: {},
        };
        if (isObject(layoutItem)) {
            Object.assign(newNode, layoutItem);
            Object.keys(newNode)
                .filter(option => !inArray(option, [
                '_id', '$ref', 'arrayItem', 'arrayItemType', 'dataPointer', 'dataType',
                'items', 'key', 'name', 'options', 'recursiveReference', 'type', 'widget'
            ]))
                .forEach(option => {
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
                        Object.keys(newNode.options.validationMessage).forEach(key => {
                            const code = key + '';
                            const newKey = code === '0' ? 'type' :
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
        let nodeSchema = null;
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
                const findDataPointer = (items) => {
                    if (items === null || typeof items !== 'object') {
                        return;
                    }
                    if (hasOwn(items, 'dataPointer')) {
                        return items.dataPointer;
                    }
                    if (isArray(items.items)) {
                        for (const item of items.items) {
                            if (hasOwn(item, 'dataPointer') && item.dataPointer.indexOf('/-') !== -1) {
                                return item.dataPointer;
                            }
                            if (hasOwn(item, 'items')) {
                                const searchItem = findDataPointer(item);
                                if (searchItem) {
                                    return searchItem;
                                }
                            }
                        }
                    }
                };
                const childDataPointer = findDataPointer(newNode);
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
            const nodeValue = JsonPointer.get(jsf.formValues, newNode.dataPointer.replace(/\/-/g, '/1'));
            // TODO: Create function getFormValues(jsf, dataPointer, forRefLibrary)
            // check formOptions.setSchemaDefaults and formOptions.setLayoutDefaults
            // then set apropriate values from initialVaues, schema, or layout
            newNode.dataPointer =
                JsonPointer.toGenericPointer(newNode.dataPointer, jsf.arrayMap);
            const LastKey = JsonPointer.toKey(newNode.dataPointer);
            if (!newNode.name && isString(LastKey) && LastKey !== '-') {
                newNode.name = LastKey;
            }
            const shortDataPointer = removeRecursiveReferences(newNode.dataPointer, jsf.dataRecursiveRefMap, jsf.arrayMap);
            const recursive = !shortDataPointer.length ||
                shortDataPointer !== newNode.dataPointer;
            let schemaPointer;
            if (!jsf.dataMap.has(shortDataPointer)) {
                jsf.dataMap.set(shortDataPointer, new Map());
            }
            const nodeDataMap = jsf.dataMap.get(shortDataPointer);
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
                    const oldWidgetType = newNode.type;
                    newNode.type = getInputType(nodeSchema, newNode);
                    console.error(`error: widget type "${oldWidgetType}" ` +
                        `not found in library. Replacing with "${newNode.type}".`);
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
                    newNode.options.copyValueTo = newNode.options.copyValueTo.map(item => JsonPointer.compile(JsonPointer.parseObjectPath(item), '-'));
                }
            }
            newNode.widget = widgetLibrary.getWidget(newNode.type);
            nodeDataMap.set('inputType', newNode.type);
            nodeDataMap.set('widget', newNode.widget);
            if (newNode.dataType === 'array' &&
                (hasOwn(newNode, 'items') || hasOwn(newNode, 'additionalItems'))) {
                const itemRefPointer = removeRecursiveReferences(newNode.dataPointer + '/-', jsf.dataRecursiveRefMap, jsf.arrayMap);
                if (!jsf.dataMap.has(itemRefPointer)) {
                    jsf.dataMap.set(itemRefPointer, new Map());
                }
                jsf.dataMap.get(itemRefPointer).set('inputType', 'section');
                // Fix insufficiently nested array item groups
                if (newNode.items.length > 1) {
                    const arrayItemGroup = [];
                    const arrayItemGroupTemplate = [];
                    let newIndex = 0;
                    for (let i = newNode.items.length - 1; i >= 0; i--) {
                        const subItem = newNode.items[i];
                        if (hasOwn(subItem, 'dataPointer') &&
                            subItem.dataPointer.slice(0, itemRefPointer.length) === itemRefPointer) {
                            const arrayItem = newNode.items.splice(i, 1)[0];
                            arrayItem.dataPointer = newNode.dataPointer + '/-' +
                                arrayItem.dataPointer.slice(itemRefPointer.length);
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
                            JsonPointer.toGenericPointer(itemRefPointer, jsf.arrayMap);
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
                    const arrayListItems = newNode.items.filter(item => item.type !== '$ref').length -
                        newNode.options.tupleItems;
                    if (arrayListItems > newNode.options.listItems) {
                        newNode.options.listItems = arrayListItems;
                        nodeDataMap.set('listItems', arrayListItems);
                    }
                }
                if (!hasOwn(jsf.layoutRefLibrary, itemRefPointer)) {
                    jsf.layoutRefLibrary[itemRefPointer] =
                        _.cloneDeep(newNode.items[newNode.items.length - 1]);
                    if (recursive) {
                        jsf.layoutRefLibrary[itemRefPointer].recursiveReference = true;
                    }
                    forEach(jsf.layoutRefLibrary[itemRefPointer], (item, key) => {
                        if (hasOwn(item, '_id')) {
                            item._id = null;
                        }
                        if (recursive) {
                            if (hasOwn(item, 'dataPointer')) {
                                item.dataPointer = item.dataPointer.slice(itemRefPointer.length);
                            }
                        }
                    }, 'top-down');
                }
                // Add any additional default items
                if (!newNode.recursiveReference || newNode.options.required) {
                    const arrayLength = Math.min(Math.max(newNode.options.tupleItems + newNode.options.listItems, isArray(nodeValue) ? nodeValue.length : 0), newNode.options.maxItems);
                    for (let i = newNode.items.length; i < arrayLength; i++) {
                        newNode.items.push(getLayoutNode({
                            $ref: itemRefPointer,
                            dataPointer: newNode.dataPointer,
                            recursiveReference: newNode.recursiveReference,
                        }, jsf, widgetLibrary));
                    }
                }
                // If needed, add button to add items to array
                if (newNode.options.addable !== false &&
                    newNode.options.minItems < newNode.options.maxItems &&
                    (newNode.items[newNode.items.length - 1] || {}).type !== '$ref') {
                    let buttonText = 'Add';
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
                        const parentSchema = getFromSchema(jsf.schema, newNode.dataPointer, 'parentSchema');
                        if (hasOwn(parentSchema, 'title')) {
                            buttonText += ' to ' + parentSchema.title;
                        }
                        else {
                            const pointerArray = JsonPointer.parse(newNode.dataPointer);
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
                        recursiveReference: recursive,
                        type: '$ref',
                        widget: widgetLibrary.getWidget('$ref'),
                        $ref: itemRefPointer,
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
            const parentType = JsonPointer.get(jsf.layout, layoutPointer, 0, -2).type;
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
        const fullLayout = _.cloneDeep(formLayout);
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
export function buildLayoutFromSchema(jsf, widgetLibrary, nodeValue = null, schemaPointer = '', dataPointer = '', arrayItem = false, arrayItemType = null, removable = null, forRefLibrary = false, dataPointerPrefix = '') {
    const schema = JsonPointer.get(jsf.schema, schemaPointer);
    if (!hasOwn(schema, 'type') && !hasOwn(schema, '$ref') &&
        !hasOwn(schema, 'x-schema-form')) {
        return null;
    }
    const newNodeType = getInputType(schema);
    if (!isDefined(nodeValue) && (jsf.formOptions.setSchemaDefaults === true ||
        (jsf.formOptions.setSchemaDefaults === 'auto' && isEmpty(jsf.formValues)))) {
        nodeValue = JsonPointer.get(jsf.schema, schemaPointer + '/default');
    }
    let newNode = {
        _id: forRefLibrary ? null : _.uniqueId(),
        arrayItem: arrayItem,
        dataPointer: JsonPointer.toGenericPointer(dataPointer, jsf.arrayMap),
        dataType: schema.type || (hasOwn(schema, '$ref') ? '$ref' : null),
        options: {},
        required: isInputRequired(jsf.schema, schemaPointer),
        type: newNodeType,
        widget: widgetLibrary.getWidget(newNodeType),
    };
    const lastDataKey = JsonPointer.toKey(newNode.dataPointer);
    if (lastDataKey !== '-') {
        newNode.name = lastDataKey;
    }
    if (newNode.arrayItem) {
        newNode.arrayItemType = arrayItemType;
        newNode.options.removable = removable !== false;
    }
    const shortDataPointer = removeRecursiveReferences(dataPointerPrefix + dataPointer, jsf.dataRecursiveRefMap, jsf.arrayMap);
    const recursive = !shortDataPointer.length ||
        shortDataPointer !== dataPointerPrefix + dataPointer;
    if (!jsf.dataMap.has(shortDataPointer)) {
        jsf.dataMap.set(shortDataPointer, new Map());
    }
    const nodeDataMap = jsf.dataMap.get(shortDataPointer);
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
            const newSection = [];
            const propertyKeys = schema['ui:order'] || Object.keys(schema.properties);
            if (propertyKeys.includes('*') && !hasOwn(schema.properties, '*')) {
                const unnamedKeys = Object.keys(schema.properties)
                    .filter(key => !propertyKeys.includes(key));
                for (let i = propertyKeys.length - 1; i >= 0; i--) {
                    if (propertyKeys[i] === '*') {
                        propertyKeys.splice(i, 1, ...unnamedKeys);
                    }
                }
            }
            propertyKeys
                .filter(key => hasOwn(schema.properties, key) ||
                hasOwn(schema, 'additionalProperties'))
                .forEach(key => {
                const keySchemaPointer = hasOwn(schema.properties, key) ?
                    '/properties/' + key : '/additionalProperties';
                const innerItem = buildLayoutFromSchema(jsf, widgetLibrary, isObject(nodeValue) ? nodeValue[key] : null, schemaPointer + keySchemaPointer, dataPointer + '/' + key, false, null, null, forRefLibrary, dataPointerPrefix);
                if (innerItem) {
                    if (isInputRequired(schema, '/' + key)) {
                        innerItem.options.required = true;
                        jsf.fieldsRequired = true;
                    }
                    newSection.push(innerItem);
                }
            });
            if (dataPointer === '' && !forRefLibrary) {
                newNode = newSection;
            }
            else {
                newNode.items = newSection;
            }
        }
        // TODO: Add patternProperties and additionalProperties inputs?
        // ... possibly provide a way to enter both key names and values?
        // if (isObject(schema.patternProperties)) { }
        // if (isObject(schema.additionalProperties)) { }
    }
    else if (newNode.dataType === 'array') {
        newNode.items = [];
        const templateArray = [];
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
        let additionalItemsSchemaPointer = null;
        // If 'items' is an array = tuple items
        if (isArray(schema.items)) {
            newNode.items = [];
            for (let i = 0; i < newNode.options.tupleItems; i++) {
                let newItem;
                const itemRefPointer = removeRecursiveReferences(shortDataPointer + '/' + i, jsf.dataRecursiveRefMap, jsf.arrayMap);
                const itemRecursive = !itemRefPointer.length ||
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
            const itemRefPointer = removeRecursiveReferences(shortDataPointer + '/-', jsf.dataRecursiveRefMap, jsf.arrayMap);
            const itemRecursive = !itemRefPointer.length ||
                itemRefPointer !== shortDataPointer + '/-';
            const itemSchemaPointer = removeRecursiveReferences(additionalItemsSchemaPointer, jsf.schemaRecursiveRefMap, jsf.arrayMap);
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
                const arrayLength = Math.min(Math.max(itemRecursive ? 0 :
                    newNode.options.tupleItems + newNode.options.listItems, isArray(nodeValue) ? nodeValue.length : 0), newNode.options.maxItems);
                if (newNode.items.length < arrayLength) {
                    for (let i = newNode.items.length; i < arrayLength; i++) {
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
                let buttonText = ((jsf.layoutRefLibrary[itemRefPointer] || {}).options || {}).title;
                const prefix = buttonText ? 'Add ' : 'Add to ';
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
        const schemaRef = JsonPointer.compile(schema.$ref);
        const dataRef = JsonPointer.toDataPointer(schemaRef, jsf.schema);
        let buttonText = '';
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
            const parentSchema = JsonPointer.get(jsf.schema, schemaPointer, 0, -1);
            if (hasOwn(parentSchema, 'title')) {
                buttonText = 'Add to ' + parentSchema.title;
            }
            else {
                const pointerArray = JsonPointer.parse(newNode.dataPointer);
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
                const newLayout = buildLayoutFromSchema(jsf, widgetLibrary, null, schemaRef, '', newNode.arrayItem, newNode.arrayItemType, true, true, dataPointer);
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
export function mapLayout(layout, fn, layoutPointer = '', rootLayout = layout) {
    let indexPad = 0;
    let newLayout = [];
    forEach(layout, (item, index) => {
        const realIndex = +index + indexPad;
        const newLayoutPointer = layoutPointer + '/' + realIndex;
        let newNode = copy(item);
        let itemsArray = [];
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
export function getLayoutNode(refNode, jsf, widgetLibrary = null, nodeValue = null) {
    // If recursive reference and building initial layout, return Add button
    if (refNode.recursiveReference && widgetLibrary) {
        const newLayoutNode = _.cloneDeep(refNode);
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
        let newLayoutNode = jsf.layoutRefLibrary[refNode.$ref];
        // If value defined, build new node from schema (to set array lengths)
        if (isDefined(nodeValue)) {
            newLayoutNode = buildLayoutFromSchema(jsf, widgetLibrary, nodeValue, JsonPointer.toSchemaPointer(refNode.$ref, jsf.schema), refNode.$ref, newLayoutNode.arrayItem, newLayoutNode.arrayItemType, newLayoutNode.options.removable, false);
        }
        else {
            // If value not defined, copy node from layoutRefLibrary
            newLayoutNode = _.cloneDeep(newLayoutNode);
            JsonPointer.forEachDeep(newLayoutNode, (subNode, pointer) => {
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
export function buildTitleMap(titleMap, enumList, fieldRequired = true, flatList = true) {
    let newTitleMap = [];
    let hasEmptyValue = false;
    if (titleMap) {
        if (isArray(titleMap)) {
            if (enumList) {
                for (const i of Object.keys(titleMap)) {
                    if (isObject(titleMap[i])) {
                        const value = titleMap[i].value;
                        if (enumList.includes(value)) {
                            const name = titleMap[i].name;
                            newTitleMap.push({ name, value });
                            if (value === undefined || value === null) {
                                hasEmptyValue = true;
                            }
                        }
                    }
                    else if (isString(titleMap[i])) {
                        if (i < enumList.length) {
                            const name = titleMap[i];
                            const value = enumList[i];
                            newTitleMap.push({ name, value });
                            if (value === undefined || value === null) {
                                hasEmptyValue = true;
                            }
                        }
                    }
                }
            }
            else {
                newTitleMap = titleMap;
                if (!fieldRequired) {
                    hasEmptyValue = !!newTitleMap
                        .filter(i => i.value === undefined || i.value === null)
                        .length;
                }
            }
        }
        else if (enumList) {
            for (const i of Object.keys(enumList)) {
                const value = enumList[i];
                if (hasOwn(titleMap, value)) {
                    const name = titleMap[value];
                    newTitleMap.push({ name, value });
                    if (value === undefined || value === null) {
                        hasEmptyValue = true;
                    }
                }
            }
        }
        else {
            for (const value of Object.keys(titleMap)) {
                const name = titleMap[value];
                newTitleMap.push({ name, value });
                if (value === undefined || value === null) {
                    hasEmptyValue = true;
                }
            }
        }
    }
    else if (enumList) {
        for (const i of Object.keys(enumList)) {
            const name = enumList[i];
            const value = enumList[i];
            newTitleMap.push({ name, value });
            if (value === undefined || value === null) {
                hasEmptyValue = true;
            }
        }
    }
    else {
        newTitleMap = [{ name: 'True', value: true }, { name: 'False', value: false }];
    }
    // Does titleMap have groups?
    if (newTitleMap.some(title => hasOwn(title, 'group'))) {
        hasEmptyValue = false;
        // If flatList = true, flatten items & update name to group: name
        if (flatList) {
            newTitleMap = newTitleMap.reduce((groupTitleMap, title) => {
                if (hasOwn(title, 'group')) {
                    if (isArray(title.items)) {
                        groupTitleMap = [
                            ...groupTitleMap,
                            ...title.items.map(item => (Object.assign({}, item, { name: `${title.group}: ${item.name}` })))
                        ];
                        if (title.items.some(item => item.value === undefined || item.value === null)) {
                            hasEmptyValue = true;
                        }
                    }
                    if (hasOwn(title, 'name') && hasOwn(title, 'value')) {
                        title.name = `${title.group}: ${title.name}`;
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
            newTitleMap = newTitleMap.reduce((groupTitleMap, title) => {
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
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmZ1bmN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWpzb24tc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJzcmMvc2hhcmVkL2xheW91dC5mdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFHNUIsT0FBTyxFQUNMLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFDbkUsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEUsT0FBTyxFQUFXLFdBQVcsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQy9ELE9BQU8sRUFDTCxhQUFhLEVBQUUsWUFBWSxFQUFnQixlQUFlLEVBQUUsZUFBZSxFQUMzRSx5QkFBeUIsRUFBRSxrQkFBa0IsRUFDOUMsTUFBTSx5QkFBeUIsQ0FBQztBQUdqQzs7Ozs7Ozs7Ozs7O0dBWUc7QUFFSDs7Ozs7O0dBTUc7QUFDSCxNQUFNLHNCQUFzQixHQUFHLEVBQUUsYUFBYTtJQUM1QyxJQUFJLGVBQWUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLHdCQUF3QixDQUFDLENBQUM7SUFDdEUsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxFQUFFO1FBQzVFLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMzQixNQUFNLE9BQU8sR0FBUTtZQUNuQixHQUFHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPLEVBQUUsRUFBRTtTQUNaLENBQUM7UUFDRixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2lCQUNqQixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pDLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsVUFBVTtnQkFDdEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxRQUFRO2FBQzFFLENBQUMsQ0FBQztpQkFDRixPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ2hCLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMxQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztZQUNMLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekQsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUM5QixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDeEIsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO29CQUMvQyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUNoQyxDQUFDO1lBQ0gsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0MsT0FBTyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztvQkFDbkUsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztvQkFFdkMsaUVBQWlFO29CQUNqRSxnREFBZ0Q7b0JBQ2hELDhFQUE4RTtnQkFDOUUsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hELEVBQUUsQ0FBQyxDQUFDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO3dCQUMxRCxPQUFPLENBQUMsT0FBTyxDQUFDLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUM7b0JBQ3pFLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sT0FBTyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUM7d0JBQ3hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTs0QkFDM0QsTUFBTSxJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQzs0QkFDdEIsTUFBTSxNQUFNLEdBQ1YsSUFBSSxLQUFNLEdBQUcsQ0FBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQ3pCLElBQUksS0FBTSxHQUFHLENBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29DQUN6QixJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQzt3Q0FDL0IsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7NENBQzVCLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0RBQ3JDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29EQUM1QixJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO3dEQUNyQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQzs0REFDOUIsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7Z0VBQzlCLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29FQUM1QixJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQzt3RUFDbEMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7NEVBQ2xDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dGQUM3QixJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQztvRkFDakMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7d0ZBQzdCLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRGQUM3QixJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztnR0FDaEMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDOzRCQUN4QyxPQUFPLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3RGLENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUM7b0JBQ0QsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDO2dCQUMzQyxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakQsT0FBTyxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDbkMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDO1FBQzNCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQztZQUN4RSxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0QsSUFBSSxVQUFVLEdBQVEsSUFBSSxDQUFDO1FBRTNCLG9FQUFvRTtRQUNwRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXBDLG1EQUFtRDtZQUNuRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsT0FBTyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN2RCxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNyRSxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBRXJCLGdFQUFnRTtZQUNoRSxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUN6RSxNQUFNLGVBQWUsR0FBRyxDQUFDLEtBQUssRUFBRSxFQUFFO29CQUNoQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQUMsTUFBTSxDQUFDO29CQUFDLENBQUM7b0JBQzVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO29CQUFDLENBQUM7b0JBQy9ELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN6QixHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs0QkFDL0IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDOzRCQUMxQixDQUFDOzRCQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUMxQixNQUFNLFVBQVUsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ3pDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0NBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztnQ0FBQyxDQUFDOzRCQUN4QyxDQUFDO3dCQUNILENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDLENBQUM7Z0JBQ0YsTUFBTSxnQkFBZ0IsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2xELEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztvQkFDckIsT0FBTyxDQUFDLFdBQVc7d0JBQ2pCLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2xFLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ25FLENBQUM7WUFDRCxNQUFNLFNBQVMsR0FDYixXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFN0UsdUVBQXVFO1lBQ3ZFLHdFQUF3RTtZQUN4RSxrRUFBa0U7WUFFbEUsT0FBTyxDQUFDLFdBQVc7Z0JBQ2pCLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRSxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN2RCxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxPQUFPLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztZQUN6QixDQUFDO1lBQ0QsTUFBTSxnQkFBZ0IsR0FBRyx5QkFBeUIsQ0FDaEQsT0FBTyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FDM0QsQ0FBQztZQUNGLE1BQU0sU0FBUyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsTUFBTTtnQkFDeEMsZ0JBQWdCLEtBQUssT0FBTyxDQUFDLFdBQVcsQ0FBQztZQUMzQyxJQUFJLGFBQXFCLENBQUM7WUFDMUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQy9DLENBQUM7WUFDRCxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3RELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxhQUFhLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNuRCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sYUFBYSxHQUFHLFdBQVcsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMxRSxXQUFXLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUNsRCxDQUFDO1lBQ0QsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDeEQsVUFBVSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztZQUN4RCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNmLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDbkQsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xELE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ25DLE9BQU8sQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDakQsT0FBTyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsYUFBYSxJQUFJO3dCQUNwRCx5Q0FBeUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7Z0JBQy9ELENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sT0FBTyxDQUFDLElBQUksR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3BFLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pFLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbkQsQ0FBQztnQkFDRCxPQUFPLENBQUMsUUFBUTtvQkFDZCxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEUsa0JBQWtCLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFFN0MsMERBQTBEO2dCQUMxRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLFlBQVksSUFBSSxNQUFNLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakUsa0JBQWtCLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3JELENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDeEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FDakMsVUFBVSxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUM5RCxDQUFDO29CQUNGLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQ2pDLFVBQVUsQ0FBQyxRQUFRLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FDeEQsQ0FBQztvQkFDRixPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUNsQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQzFFLENBQUM7b0JBQ0YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVO3dCQUN4QixPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7d0JBQzFELE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUN0RCxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7b0JBQ2hDLENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUTt3QkFDakMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUMvQyxDQUFDLENBQUMsQ0FBQzt3QkFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVM7NEJBQ3ZCLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO29CQUMxRCxDQUFDO29CQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVE7d0JBQ2pDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FDL0MsQ0FBQyxDQUFDLENBQUM7d0JBQ0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTOzRCQUN2QixPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztvQkFDMUQsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNqQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUN0RCxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUN0RCxXQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUMxRCxXQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUMxRCxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3hDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ2pFLENBQUM7Z0JBQ0gsQ0FBQztnQkFDRCxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQy9DLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztvQkFDaEMsR0FBRyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7Z0JBQzVCLENBQUM7WUFDSCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sMkRBQTJEO2dCQUMzRCxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pELENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDcEQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUM5RCxDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQ25FLFdBQVcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FDNUQsQ0FBQztnQkFDSixDQUFDO1lBQ0gsQ0FBQztZQUVELE9BQU8sQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQsV0FBVyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUUxQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU87Z0JBQzlCLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQ2pFLENBQUMsQ0FBQyxDQUFDO2dCQUNELE1BQU0sY0FBYyxHQUFHLHlCQUF5QixDQUM5QyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksRUFBRSxHQUFHLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FDbEUsQ0FBQztnQkFDRixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDN0MsQ0FBQztnQkFDRCxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUU1RCw4Q0FBOEM7Z0JBQzlDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztvQkFDMUIsTUFBTSxzQkFBc0IsR0FBRyxFQUFFLENBQUM7b0JBQ2xDLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztvQkFDakIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDbkQsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDakMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUM7NEJBQ2hDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssY0FDMUQsQ0FBQyxDQUFDLENBQUM7NEJBQ0QsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNoRCxTQUFTLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSTtnQ0FDaEQsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUNyRCxjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUNsQyxRQUFRLEVBQUUsQ0FBQzt3QkFDYixDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDOzRCQUN6Qix3REFBd0Q7NEJBQ3hELE9BQU8sQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDOzRCQUMvQixPQUFPLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLEtBQUssQ0FBQzt3QkFDMUQsQ0FBQztvQkFDSCxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUMxQixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzs0QkFDakIsR0FBRyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUU7NEJBQ2pCLFNBQVMsRUFBRSxJQUFJOzRCQUNmLGFBQWEsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dDQUNoRSxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU07NEJBQ2xCLEtBQUssRUFBRSxjQUFjOzRCQUNyQixPQUFPLEVBQUUsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEtBQUssS0FBSyxHQUFHOzRCQUM1RCxXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJOzRCQUN2QyxJQUFJLEVBQUUsU0FBUzs0QkFDZixNQUFNLEVBQUUsYUFBYSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7eUJBQzNDLENBQUMsQ0FBQztvQkFDTCxDQUFDO2dCQUNILENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sb0NBQW9DO29CQUNwQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ2xDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO3dCQUNsQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVc7NEJBQzFCLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUMvRCxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzVELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQzVDLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDeEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztvQkFDN0MsQ0FBQztvQkFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQzVCLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDbEQsQ0FBQztnQkFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0IsTUFBTSxjQUFjLEdBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxNQUFNO3dCQUN2RCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztvQkFDL0IsRUFBRSxDQUFDLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDL0MsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDO3dCQUMzQyxXQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQztvQkFDL0MsQ0FBQztnQkFDSCxDQUFDO2dCQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xELEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7d0JBQ2xDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2RCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUNkLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7b0JBQ2pFLENBQUM7b0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTt3QkFDMUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7d0JBQUMsQ0FBQzt3QkFDN0MsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDZCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQ25FLENBQUM7d0JBQ0gsQ0FBQztvQkFDSCxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ2pCLENBQUM7Z0JBRUQsbUNBQW1DO2dCQUNuQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQzVELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FDbkMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQ3RELE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUMxQyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzdCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDeEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDOzRCQUMvQixJQUFJLEVBQUUsY0FBYzs0QkFDcEIsV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXOzRCQUNoQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsa0JBQWtCO3lCQUMvQyxFQUFFLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO29CQUMxQixDQUFDO2dCQUNILENBQUM7Z0JBRUQsOENBQThDO2dCQUM5QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FBSyxLQUFLO29CQUNuQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVE7b0JBQ25ELENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFDM0QsQ0FBQyxDQUFDLENBQUM7b0JBQ0QsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO29CQUN2QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQzFCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzFDLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQzt3QkFDckMsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixVQUFVLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO3dCQUM1QyxDQUFDO29CQUNILENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDakMsVUFBVSxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUM3QyxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLFVBQVUsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN0QyxDQUFDO3dCQUVILHVFQUF1RTtvQkFDdkUsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixNQUFNLFlBQVksR0FDaEIsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQzt3QkFDakUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2xDLFVBQVUsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQzt3QkFDNUMsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixNQUFNLFlBQVksR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQzs0QkFDNUQsVUFBVSxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDekUsQ0FBQztvQkFDSCxDQUFDO29CQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO3dCQUNqQixHQUFHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRTt3QkFDakIsU0FBUyxFQUFFLElBQUk7d0JBQ2YsYUFBYSxFQUFFLE1BQU07d0JBQ3JCLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUk7d0JBQ3ZDLE9BQU8sRUFBRTs0QkFDUCxTQUFTLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTOzRCQUNwQyxRQUFRLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFROzRCQUNsQyxRQUFRLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFROzRCQUNsQyxTQUFTLEVBQUUsS0FBSzs0QkFDaEIsS0FBSyxFQUFFLFVBQVU7NEJBQ2pCLFVBQVUsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVU7eUJBQ3ZDO3dCQUNELGtCQUFrQixFQUFFLFNBQVM7d0JBQzdCLElBQUksRUFBRSxNQUFNO3dCQUNaLE1BQU0sRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQzt3QkFDdkMsSUFBSSxFQUFFLGNBQWM7cUJBQ3JCLENBQUMsQ0FBQztvQkFDSCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3JELE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVU7NEJBQ3hELE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO3dCQUNwQixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO3dCQUN6QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFBQyxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUM7d0JBQUMsQ0FBQztvQkFDdkQsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQzVCLENBQUM7UUFDSCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0QsTUFBTSxVQUFVLEdBQ2QsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDekQsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsT0FBTyxDQUFDLElBQUk7b0JBQ1YsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNoRSxDQUFDO1lBQ0QsT0FBTyxDQUFDLFNBQVMsR0FBRyxVQUFVLEtBQUssT0FBTyxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQsa0JBQWtCLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUFDLENBQUM7UUFDMUQsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNqQixDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDekIsTUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFDOUUsR0FBRyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxHQUFHO1lBQ3pCLEdBQUcsRUFBRSxJQUFJO1lBQ1QsV0FBVyxFQUFFLEVBQUU7WUFDZixRQUFRLEVBQUUsUUFBUTtZQUNsQixLQUFLLEVBQUUsVUFBVTtZQUNqQixJQUFJLEVBQUUsRUFBRTtZQUNSLE9BQU8sRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUM7WUFDekQsa0JBQWtCLEVBQUUsSUFBSTtZQUN4QixRQUFRLEVBQUUsS0FBSztZQUNmLElBQUksRUFBRSxTQUFTO1lBQ2YsTUFBTSxFQUFFLGFBQWEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1NBQzNDLENBQUM7SUFDSixDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDZCxHQUFHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO1lBQzVCLElBQUksRUFBRSxRQUFRO1lBQ2QsTUFBTSxFQUFFLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1NBQzFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDO0FBQ3BCLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0sZ0NBQ0osR0FBRyxFQUFFLGFBQWEsRUFBRSxTQUFTLEdBQUcsSUFBSSxFQUFFLGFBQWEsR0FBRyxFQUFFLEVBQ3hELFdBQVcsR0FBRyxFQUFFLEVBQUUsU0FBUyxHQUFHLEtBQUssRUFBRSxnQkFBd0IsSUFBSSxFQUNqRSxZQUFxQixJQUFJLEVBQUUsYUFBYSxHQUFHLEtBQUssRUFBRSxpQkFBaUIsR0FBRyxFQUFFO0lBRXhFLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztJQUMxRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUNwRCxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsZUFBZSxDQUNqQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFBQyxDQUFDO0lBQ2xCLE1BQU0sV0FBVyxHQUFXLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUMzQixHQUFHLENBQUMsV0FBVyxDQUFDLGlCQUFpQixLQUFLLElBQUk7UUFDMUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLGlCQUFpQixLQUFLLE1BQU0sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQzFFLENBQUMsQ0FBQyxDQUFDO1FBQ0YsU0FBUyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxhQUFhLEdBQUcsVUFBVSxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUNELElBQUksT0FBTyxHQUFRO1FBQ2pCLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtRQUN4QyxTQUFTLEVBQUUsU0FBUztRQUNwQixXQUFXLEVBQUUsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDO1FBQ3BFLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDakUsT0FBTyxFQUFFLEVBQUU7UUFDWCxRQUFRLEVBQUUsZUFBZSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDO1FBQ3BELElBQUksRUFBRSxXQUFXO1FBQ2pCLE1BQU0sRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztLQUM3QyxDQUFDO0lBQ0YsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0QsRUFBRSxDQUFDLENBQUMsV0FBVyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFBQyxPQUFPLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztJQUFDLENBQUM7SUFDeEQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsT0FBTyxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDdEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUyxLQUFLLEtBQUssQ0FBQztJQUNsRCxDQUFDO0lBQ0QsTUFBTSxnQkFBZ0IsR0FBRyx5QkFBeUIsQ0FDaEQsaUJBQWlCLEdBQUcsV0FBVyxFQUFFLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUN2RSxDQUFDO0lBQ0YsTUFBTSxTQUFTLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNO1FBQ3hDLGdCQUFnQixLQUFLLGlCQUFpQixHQUFHLFdBQVcsQ0FBQztJQUN2RCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQ0QsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN0RCxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLFdBQVcsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ2hELFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUNELGtCQUFrQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDekMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNsQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0QsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxNQUFNLFVBQVUsR0FBVSxFQUFFLENBQUM7WUFDN0IsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzFFLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xFLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztxQkFDL0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDbEQsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQzVCLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLFdBQVcsQ0FBQyxDQUFDO29CQUM1QyxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1lBQ0QsWUFBWTtpQkFDVCxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUM7Z0JBQzNDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsc0JBQXNCLENBQUMsQ0FDdkM7aUJBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNiLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDdkQsY0FBYyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQUM7Z0JBQ2pELE1BQU0sU0FBUyxHQUFHLHFCQUFxQixDQUNyQyxHQUFHLEVBQUUsYUFBYSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQy9ELGFBQWEsR0FBRyxnQkFBZ0IsRUFDaEMsV0FBVyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQ3ZCLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsQ0FDcEQsQ0FBQztnQkFDRixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUNkLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO3dCQUNsQyxHQUFHLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztvQkFDNUIsQ0FBQztvQkFDRCxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM3QixDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxFQUFFLENBQUMsQ0FBQyxXQUFXLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDekMsT0FBTyxHQUFHLFVBQVUsQ0FBQztZQUN2QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7WUFDN0IsQ0FBQztRQUNILENBQUM7UUFDRCwrREFBK0Q7UUFDL0QsaUVBQWlFO1FBQ2pFLDhDQUE4QztRQUM5QyxpREFBaUQ7SUFFbkQsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDeEMsT0FBTyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDbkIsTUFBTSxhQUFhLEdBQVUsRUFBRSxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQ2pDLE1BQU0sQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksQ0FDMUQsQ0FBQztRQUNGLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQ2pDLE1BQU0sQ0FBQyxRQUFRLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FDcEQsQ0FBQztRQUNGLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksZUFBZSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQzdFLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0UsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzNELE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1lBQ3RELE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUTtZQUNqQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQy9DLENBQUMsQ0FBQyxDQUFDO1lBQ0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDcEYsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVE7WUFDakMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUMvQyxDQUFDLENBQUMsQ0FBQztZQUNELE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQ3BGLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEQsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0RCxXQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzFELFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUQsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRSxDQUFDO1FBQ0QsU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLEtBQUssQ0FBQztRQUNoRCxJQUFJLDRCQUE0QixHQUFXLElBQUksQ0FBQztRQUVoRCx1Q0FBdUM7UUFDdkMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsT0FBTyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDbkIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNwRCxJQUFJLE9BQVksQ0FBQztnQkFDakIsTUFBTSxjQUFjLEdBQUcseUJBQXlCLENBQzlDLGdCQUFnQixHQUFHLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQ2xFLENBQUM7Z0JBQ0YsTUFBTSxhQUFhLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTTtvQkFDMUMsY0FBYyxLQUFLLGdCQUFnQixHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBRWhELDBEQUEwRDtnQkFDMUQsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQy9DLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2xELDZFQUE2RTt3QkFDN0UsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQzt3QkFDNUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxHQUFHLHFCQUFxQixDQUMxRCxHQUFHLEVBQUUsYUFBYSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQzVELGFBQWEsR0FBRyxTQUFTLEdBQUcsQ0FBQyxFQUM3QixhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLEdBQUcsR0FBRyxDQUFDLEVBQzFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ3RFLENBQUM7d0JBQ0YsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzs0QkFDbEIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQzt3QkFDakUsQ0FBQztvQkFDSCxDQUFDO29CQUNELE9BQU8sR0FBRyxhQUFhLENBQUM7d0JBQ3RCLElBQUksRUFBRSxjQUFjO3dCQUNwQixXQUFXLEVBQUUsV0FBVyxHQUFHLEdBQUcsR0FBRyxDQUFDO3dCQUNsQyxrQkFBa0IsRUFBRSxhQUFhO3FCQUNsQyxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuRSxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE9BQU8sR0FBRyxxQkFBcUIsQ0FDN0IsR0FBRyxFQUFFLGFBQWEsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUM1RCxhQUFhLEdBQUcsU0FBUyxHQUFHLENBQUMsRUFDN0IsV0FBVyxHQUFHLEdBQUcsR0FBRyxDQUFDLEVBQ3JCLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsQ0FDdkQsQ0FBQztnQkFDSixDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQUMsQ0FBQztZQUMvQyxDQUFDO1lBRUQsK0VBQStFO1lBQy9FLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyw0QkFBNEIsR0FBRyxhQUFhLEdBQUcsa0JBQWtCLENBQUM7WUFDcEUsQ0FBQztZQUVILDZEQUE2RDtRQUM3RCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLDRCQUE0QixHQUFHLGFBQWEsR0FBRyxRQUFRLENBQUM7UUFDMUQsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLGNBQWMsR0FBRyx5QkFBeUIsQ0FDOUMsZ0JBQWdCLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUMvRCxDQUFDO1lBQ0YsTUFBTSxhQUFhLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTTtnQkFDMUMsY0FBYyxLQUFLLGdCQUFnQixHQUFHLElBQUksQ0FBQztZQUM3QyxNQUFNLGlCQUFpQixHQUFHLHlCQUF5QixDQUNqRCw0QkFBNEIsRUFBRSxHQUFHLENBQUMscUJBQXFCLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FDdEUsQ0FBQztZQUNGLDJDQUEyQztZQUMzQyxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNFLDZFQUE2RTtnQkFDN0UsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDNUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxHQUFHLHFCQUFxQixDQUMxRCxHQUFHLEVBQUUsYUFBYSxFQUFFLElBQUksRUFDeEIsaUJBQWlCLEVBQ2pCLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUN2QyxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ3ZFLENBQUM7Z0JBQ0YsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDbEIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztnQkFDakUsQ0FBQztZQUNILENBQUM7WUFFRCxtQ0FBbUM7WUFDbkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQ25DLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pCLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUN4RCxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDMUMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM3QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ3hELE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQzs0QkFDL0IsSUFBSSxFQUFFLGNBQWM7NEJBQ3BCLFdBQVcsRUFBRSxXQUFXLEdBQUcsSUFBSTs0QkFDL0Isa0JBQWtCLEVBQUUsYUFBYTt5QkFDbEMsRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNwRSxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1lBRUQsOENBQThDO1lBQzlDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLEtBQUs7Z0JBQ25DLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUTtnQkFDbkQsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUMzRCxDQUFDLENBQUMsQ0FBQztnQkFDRCxJQUFJLFVBQVUsR0FDWixDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ3JFLE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQy9DLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDaEIsVUFBVSxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDeEUsQ0FBQztnQkFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUFDLFVBQVUsR0FBRyxNQUFNLEdBQUcsVUFBVSxDQUFDO2dCQUFDLENBQUM7Z0JBQ3RFLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUNqQixHQUFHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtvQkFDakIsU0FBUyxFQUFFLElBQUk7b0JBQ2YsYUFBYSxFQUFFLE1BQU07b0JBQ3JCLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUk7b0JBQ3ZDLE9BQU8sRUFBRTt3QkFDUCxTQUFTLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTO3dCQUNwQyxRQUFRLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRO3dCQUNsQyxRQUFRLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRO3dCQUNsQyxTQUFTLEVBQUUsS0FBSzt3QkFDaEIsS0FBSyxFQUFFLFVBQVU7d0JBQ2pCLFVBQVUsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVU7cUJBQ3ZDO29CQUNELGtCQUFrQixFQUFFLGFBQWE7b0JBQ2pDLElBQUksRUFBRSxNQUFNO29CQUNaLE1BQU0sRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztvQkFDdkMsSUFBSSxFQUFFLGNBQWM7aUJBQ3JCLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDO0lBRUgsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDdkMsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pFLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUVwQixvQkFBb0I7UUFDcEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNuQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkQsVUFBVTtnQkFDUixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFMUUsdUVBQXVFO1FBQ3ZFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sWUFBWSxHQUNoQixXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxVQUFVLEdBQUcsU0FBUyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFDOUMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUM1RCxVQUFVLEdBQUcsU0FBUyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNFLENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDckIsa0JBQWtCLEVBQUUsSUFBSTtZQUN4QixNQUFNLEVBQUUsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFDdkMsSUFBSSxFQUFFLE9BQU87U0FDZCxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDN0IsU0FBUyxFQUFFLEtBQUs7WUFDaEIsS0FBSyxFQUFFLFVBQVU7U0FDbEIsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUTtnQkFDdEIsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDL0QsQ0FBQztRQUVELDBDQUEwQztRQUMxQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNuQixFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyw2RUFBNkU7Z0JBQzdFLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ3JDLE1BQU0sU0FBUyxHQUFHLHFCQUFxQixDQUNyQyxHQUFHLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUN2QyxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLENBQ2xFLENBQUM7Z0JBQ0YsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDZCxTQUFTLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO29CQUNwQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxDQUFDO2dCQUM1QyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE9BQU8sR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN2QyxDQUFDO1lBQ0gsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7Z0JBQzdELEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7WUFDMUQsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILE1BQU0sb0JBQW9CLE1BQU0sRUFBRSxFQUFFLEVBQUUsYUFBYSxHQUFHLEVBQUUsRUFBRSxVQUFVLEdBQUcsTUFBTTtJQUMzRSxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDakIsSUFBSSxTQUFTLEdBQVUsRUFBRSxDQUFDO0lBQzFCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDOUIsTUFBTSxTQUFTLEdBQUcsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1FBQ3BDLE1BQU0sZ0JBQWdCLEdBQUcsYUFBYSxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUM7UUFDekQsSUFBSSxPQUFPLEdBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLElBQUksVUFBVSxHQUFVLEVBQUUsQ0FBQztRQUMzQixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3ZCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztZQUNuQixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLFVBQVUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvRCxDQUFDO1FBQ0gsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUUsZ0JBQWdCLEdBQUcsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3JGLENBQUM7UUFDRCxPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLFFBQVEsRUFBRSxDQUFDO1FBQ2IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBQyxRQUFRLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFBQyxDQUFDO1lBQ3pELFNBQVMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQUVEOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU0sd0JBQ0osT0FBTyxFQUFFLEdBQUcsRUFBRSxnQkFBcUIsSUFBSSxFQUFFLFlBQWlCLElBQUk7SUFHOUQsd0VBQXdFO0lBQ3hFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sYUFBYSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRTtZQUMzQixrQkFBa0IsRUFBRSxJQUFJO1lBQ3hCLE1BQU0sRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztTQUN4QyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUU7WUFDbkMsU0FBUyxFQUFFLEtBQUs7WUFDaEIsS0FBSyxFQUFFLE1BQU0sR0FBRyxhQUFhLENBQUMsSUFBSTtTQUNuQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsYUFBYSxDQUFDO1FBRXZCLHNDQUFzQztJQUN4QyxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixJQUFJLGFBQWEsR0FBRyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZELHNFQUFzRTtRQUN0RSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLGFBQWEsR0FBRyxxQkFBcUIsQ0FDbkMsR0FBRyxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQzdCLFdBQVcsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQ3JELE9BQU8sQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLFNBQVMsRUFDckMsYUFBYSxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQ3BFLENBQUM7UUFDSixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTix3REFBd0Q7WUFDeEQsYUFBYSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDM0MsV0FBVyxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUU7Z0JBRTFELG9EQUFvRDtnQkFDcEQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQUMsQ0FBQztnQkFFM0QseURBQXlEO2dCQUN6RCx3Q0FBd0M7Z0JBQ3hDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakUsT0FBTyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7Z0JBQ2xFLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxNQUFNLENBQUMsYUFBYSxDQUFDO0lBQ3ZCLENBQUM7QUFDSCxDQUFDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLHdCQUNKLFFBQVEsRUFBRSxRQUFRLEVBQUUsYUFBYSxHQUFHLElBQUksRUFBRSxRQUFRLEdBQUcsSUFBSTtJQUV6RCxJQUFJLFdBQVcsR0FBbUIsRUFBRSxDQUFDO0lBQ3JDLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztJQUMxQixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNiLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMxQixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO3dCQUNoQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDN0IsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs0QkFDOUIsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDOzRCQUNsQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7NEJBQUMsQ0FBQzt3QkFDdEUsQ0FBQztvQkFDSCxDQUFDO29CQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNqQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7NEJBQ3hCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDekIsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUMxQixXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7NEJBQ2xDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0NBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzs0QkFBQyxDQUFDO3dCQUN0RSxDQUFDO29CQUNILENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixXQUFXLEdBQUcsUUFBUSxDQUFDO2dCQUN2QixFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7b0JBQ25CLGFBQWEsR0FBRyxDQUFDLENBQUMsV0FBVzt5QkFDMUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUM7eUJBQ3RELE1BQU0sQ0FBQztnQkFDWixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNwQixHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUIsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM3QixXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7b0JBQ2xDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztvQkFBQyxDQUFDO2dCQUN0RSxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzdCLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDbEMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2dCQUFDLENBQUM7WUFDdEUsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDcEIsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7WUFDakMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQUMsQ0FBQztRQUN0RSxDQUFDO0lBQ0gsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sV0FBVyxHQUFHLENBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFFLENBQUM7SUFDbkYsQ0FBQztJQUVELDZCQUE2QjtJQUM3QixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RCxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBRXRCLGlFQUFpRTtRQUNqRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2IsV0FBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3hELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDekIsYUFBYSxHQUFHOzRCQUNkLEdBQUcsYUFBYTs0QkFDaEIsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUN4QixtQkFBTSxJQUFJLEVBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFHLENBQzNEO3lCQUNGLENBQUM7d0JBQ0YsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDOUUsYUFBYSxHQUFHLElBQUksQ0FBQzt3QkFDdkIsQ0FBQztvQkFDSCxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BELEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDN0MsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDO3dCQUNuQixhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUMxQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ3RELGFBQWEsR0FBRyxJQUFJLENBQUM7d0JBQ3ZCLENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzFCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDdEQsYUFBYSxHQUFHLElBQUksQ0FBQztvQkFDdkIsQ0FBQztnQkFDSCxDQUFDO2dCQUNELE1BQU0sQ0FBQyxhQUFhLENBQUM7WUFDdkIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRVQsMERBQTBEO1FBQzFELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLFdBQVcsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUN4RCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQzFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUN2RSxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BELGFBQWEsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUs7NkJBQzFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQzt3QkFDbEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUN0RCxhQUFhLEdBQUcsSUFBSSxDQUFDO3dCQUN2QixDQUFDO29CQUNILENBQUM7Z0JBQ0gsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMxQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ3RELGFBQWEsR0FBRyxJQUFJLENBQUM7b0JBQ3ZCLENBQUM7Z0JBQ0gsQ0FBQztnQkFDRCxNQUFNLENBQUMsYUFBYSxDQUFDO1lBQ3ZCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNULENBQUM7SUFDSCxDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFDRCxNQUFNLENBQUMsV0FBVyxDQUFDO0FBQ3JCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzLWNvbXBhdC9CZWhhdmlvclN1YmplY3QnO1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IFRpdGxlTWFwSXRlbSB9IGZyb20gJy4uL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSc7XG5pbXBvcnQge1xuICBpbkFycmF5LCBpc0FycmF5LCBpc0VtcHR5LCBpc051bWJlciwgaXNPYmplY3QsIGlzRGVmaW5lZCwgaXNTdHJpbmdcbn0gZnJvbSAnLi92YWxpZGF0b3IuZnVuY3Rpb25zJztcbmltcG9ydCB7IGNvcHksIGZpeFRpdGxlLCBmb3JFYWNoLCBoYXNPd24gfSBmcm9tICcuL3V0aWxpdHkuZnVuY3Rpb25zJztcbmltcG9ydCB7IFBvaW50ZXIsIEpzb25Qb2ludGVyIH0gZnJvbSAnLi9qc29ucG9pbnRlci5mdW5jdGlvbnMnO1xuaW1wb3J0IHtcbiAgZ2V0RnJvbVNjaGVtYSwgZ2V0SW5wdXRUeXBlLCBnZXRTdWJTY2hlbWEsIGNoZWNrSW5saW5lVHlwZSwgaXNJbnB1dFJlcXVpcmVkLFxuICByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzLCB1cGRhdGVJbnB1dE9wdGlvbnNcbn0gZnJvbSAnLi9qc29uLXNjaGVtYS5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgYnVpbGRGb3JtR3JvdXBUZW1wbGF0ZSwgZ2V0Q29udHJvbCB9IGZyb20gJy4vZm9ybS1ncm91cC5mdW5jdGlvbnMnO1xuXG4vKipcbiAqIExheW91dCBmdW5jdGlvbiBsaWJyYXJ5OlxuICpcbiAqIGJ1aWxkTGF5b3V0OiAgICAgICAgICAgIEJ1aWxkcyBhIGNvbXBsZXRlIGxheW91dCBmcm9tIGFuIGlucHV0IGxheW91dCBhbmQgc2NoZW1hXG4gKlxuICogYnVpbGRMYXlvdXRGcm9tU2NoZW1hOiAgQnVpbGRzIGEgY29tcGxldGUgbGF5b3V0IGVudGlyZWx5IGZyb20gYW4gaW5wdXQgc2NoZW1hXG4gKlxuICogbWFwTGF5b3V0OlxuICpcbiAqIGdldExheW91dE5vZGU6XG4gKlxuICogYnVpbGRUaXRsZU1hcDpcbiAqL1xuXG4vKipcbiAqICdidWlsZExheW91dCcgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0gIHsgYW55IH0ganNmXG4gKiBAcGFyYW0gIHsgYW55IH0gd2lkZ2V0TGlicmFyeVxuICogQHJldHVybiB7IGFueVtdIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTGF5b3V0KGpzZiwgd2lkZ2V0TGlicmFyeSkge1xuICBsZXQgaGFzU3VibWl0QnV0dG9uID0gIUpzb25Qb2ludGVyLmdldChqc2YsICcvZm9ybU9wdGlvbnMvYWRkU3VibWl0Jyk7XG4gIGNvbnN0IGZvcm1MYXlvdXQgPSBtYXBMYXlvdXQoanNmLmxheW91dCwgKGxheW91dEl0ZW0sIGluZGV4LCBsYXlvdXRQb2ludGVyKSA9PiB7XG4gICAgY29uc3QgY3VycmVudEluZGV4ID0gaW5kZXg7XG4gICAgY29uc3QgbmV3Tm9kZTogYW55ID0ge1xuICAgICAgX2lkOiBfLnVuaXF1ZUlkKCksXG4gICAgICBvcHRpb25zOiB7fSxcbiAgICB9O1xuICAgIGlmIChpc09iamVjdChsYXlvdXRJdGVtKSkge1xuICAgICAgT2JqZWN0LmFzc2lnbihuZXdOb2RlLCBsYXlvdXRJdGVtKTtcbiAgICAgIE9iamVjdC5rZXlzKG5ld05vZGUpXG4gICAgICAgIC5maWx0ZXIob3B0aW9uID0+ICFpbkFycmF5KG9wdGlvbiwgW1xuICAgICAgICAgICdfaWQnLCAnJHJlZicsICdhcnJheUl0ZW0nLCAnYXJyYXlJdGVtVHlwZScsICdkYXRhUG9pbnRlcicsICdkYXRhVHlwZScsXG4gICAgICAgICAgJ2l0ZW1zJywgJ2tleScsICduYW1lJywgJ29wdGlvbnMnLCAncmVjdXJzaXZlUmVmZXJlbmNlJywgJ3R5cGUnLCAnd2lkZ2V0J1xuICAgICAgICBdKSlcbiAgICAgICAgLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgICAgICBuZXdOb2RlLm9wdGlvbnNbb3B0aW9uXSA9IG5ld05vZGVbb3B0aW9uXTtcbiAgICAgICAgICBkZWxldGUgbmV3Tm9kZVtvcHRpb25dO1xuICAgICAgICB9KTtcbiAgICAgIGlmICghaGFzT3duKG5ld05vZGUsICd0eXBlJykgJiYgaXNTdHJpbmcobmV3Tm9kZS53aWRnZXQpKSB7XG4gICAgICAgIG5ld05vZGUudHlwZSA9IG5ld05vZGUud2lkZ2V0O1xuICAgICAgICBkZWxldGUgbmV3Tm9kZS53aWRnZXQ7XG4gICAgICB9XG4gICAgICBpZiAoIWhhc093bihuZXdOb2RlLm9wdGlvbnMsICd0aXRsZScpKSB7XG4gICAgICAgIGlmIChoYXNPd24obmV3Tm9kZS5vcHRpb25zLCAnbGVnZW5kJykpIHtcbiAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMudGl0bGUgPSBuZXdOb2RlLm9wdGlvbnMubGVnZW5kO1xuICAgICAgICAgIGRlbGV0ZSBuZXdOb2RlLm9wdGlvbnMubGVnZW5kO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIWhhc093bihuZXdOb2RlLm9wdGlvbnMsICd2YWxpZGF0aW9uTWVzc2FnZXMnKSkge1xuICAgICAgICBpZiAoaGFzT3duKG5ld05vZGUub3B0aW9ucywgJ2Vycm9yTWVzc2FnZXMnKSkge1xuICAgICAgICAgIG5ld05vZGUub3B0aW9ucy52YWxpZGF0aW9uTWVzc2FnZXMgPSBuZXdOb2RlLm9wdGlvbnMuZXJyb3JNZXNzYWdlcztcbiAgICAgICAgICBkZWxldGUgbmV3Tm9kZS5vcHRpb25zLmVycm9yTWVzc2FnZXM7XG5cbiAgICAgICAgLy8gQ29udmVydCBBbmd1bGFyIFNjaGVtYSBGb3JtIChBbmd1bGFySlMpICd2YWxpZGF0aW9uTWVzc2FnZScgdG9cbiAgICAgICAgLy8gQW5ndWxhciBKU09OIFNjaGVtYSBGb3JtICd2YWxpZGF0aW9uTWVzc2FnZXMnXG4gICAgICAgIC8vIFRWNCBjb2RlcyBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9nZXJhaW50bHVmZi90djQvYmxvYi9tYXN0ZXIvc291cmNlL2FwaS5qc1xuICAgICAgICB9IGVsc2UgaWYgKGhhc093bihuZXdOb2RlLm9wdGlvbnMsICd2YWxpZGF0aW9uTWVzc2FnZScpKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBuZXdOb2RlLm9wdGlvbnMudmFsaWRhdGlvbk1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMudmFsaWRhdGlvbk1lc3NhZ2VzID0gbmV3Tm9kZS5vcHRpb25zLnZhbGlkYXRpb25NZXNzYWdlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMudmFsaWRhdGlvbk1lc3NhZ2VzID0ge307XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhuZXdOb2RlLm9wdGlvbnMudmFsaWRhdGlvbk1lc3NhZ2UpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgY29kZSA9IGtleSArICcnO1xuICAgICAgICAgICAgICBjb25zdCBuZXdLZXkgPVxuICAgICAgICAgICAgICAgIGNvZGUgPT09ICAnMCcgID8gJ3R5cGUnIDpcbiAgICAgICAgICAgICAgICBjb2RlID09PSAgJzEnICA/ICdlbnVtJyA6XG4gICAgICAgICAgICAgICAgY29kZSA9PT0gJzEwMCcgPyAnbXVsdGlwbGVPZicgOlxuICAgICAgICAgICAgICAgIGNvZGUgPT09ICcxMDEnID8gJ21pbmltdW0nIDpcbiAgICAgICAgICAgICAgICBjb2RlID09PSAnMTAyJyA/ICdleGNsdXNpdmVNaW5pbXVtJyA6XG4gICAgICAgICAgICAgICAgY29kZSA9PT0gJzEwMycgPyAnbWF4aW11bScgOlxuICAgICAgICAgICAgICAgIGNvZGUgPT09ICcxMDQnID8gJ2V4Y2x1c2l2ZU1heGltdW0nIDpcbiAgICAgICAgICAgICAgICBjb2RlID09PSAnMjAwJyA/ICdtaW5MZW5ndGgnIDpcbiAgICAgICAgICAgICAgICBjb2RlID09PSAnMjAxJyA/ICdtYXhMZW5ndGgnIDpcbiAgICAgICAgICAgICAgICBjb2RlID09PSAnMjAyJyA/ICdwYXR0ZXJuJyA6XG4gICAgICAgICAgICAgICAgY29kZSA9PT0gJzMwMCcgPyAnbWluUHJvcGVydGllcycgOlxuICAgICAgICAgICAgICAgIGNvZGUgPT09ICczMDEnID8gJ21heFByb3BlcnRpZXMnIDpcbiAgICAgICAgICAgICAgICBjb2RlID09PSAnMzAyJyA/ICdyZXF1aXJlZCcgOlxuICAgICAgICAgICAgICAgIGNvZGUgPT09ICczMDQnID8gJ2RlcGVuZGVuY2llcycgOlxuICAgICAgICAgICAgICAgIGNvZGUgPT09ICc0MDAnID8gJ21pbkl0ZW1zJyA6XG4gICAgICAgICAgICAgICAgY29kZSA9PT0gJzQwMScgPyAnbWF4SXRlbXMnIDpcbiAgICAgICAgICAgICAgICBjb2RlID09PSAnNDAyJyA/ICd1bmlxdWVJdGVtcycgOlxuICAgICAgICAgICAgICAgIGNvZGUgPT09ICc1MDAnID8gJ2Zvcm1hdCcgOiBjb2RlICsgJyc7XG4gICAgICAgICAgICAgIG5ld05vZGUub3B0aW9ucy52YWxpZGF0aW9uTWVzc2FnZXNbbmV3S2V5XSA9IG5ld05vZGUub3B0aW9ucy52YWxpZGF0aW9uTWVzc2FnZVtrZXldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlbGV0ZSBuZXdOb2RlLm9wdGlvbnMudmFsaWRhdGlvbk1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKEpzb25Qb2ludGVyLmlzSnNvblBvaW50ZXIobGF5b3V0SXRlbSkpIHtcbiAgICAgIG5ld05vZGUuZGF0YVBvaW50ZXIgPSBsYXlvdXRJdGVtO1xuICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcobGF5b3V0SXRlbSkpIHtcbiAgICAgIG5ld05vZGUua2V5ID0gbGF5b3V0SXRlbTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcignYnVpbGRMYXlvdXQgZXJyb3I6IEZvcm0gbGF5b3V0IGVsZW1lbnQgbm90IHJlY29nbml6ZWQ6Jyk7XG4gICAgICBjb25zb2xlLmVycm9yKGxheW91dEl0ZW0pO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGxldCBub2RlU2NoZW1hOiBhbnkgPSBudWxsO1xuXG4gICAgLy8gSWYgbmV3Tm9kZSBkb2VzIG5vdCBoYXZlIGEgZGF0YVBvaW50ZXIsIHRyeSB0byBmaW5kIGFuIGVxdWl2YWxlbnRcbiAgICBpZiAoIWhhc093bihuZXdOb2RlLCAnZGF0YVBvaW50ZXInKSkge1xuXG4gICAgICAvLyBJZiBuZXdOb2RlIGhhcyBhIGtleSwgY2hhbmdlIGl0IHRvIGEgZGF0YVBvaW50ZXJcbiAgICAgIGlmIChoYXNPd24obmV3Tm9kZSwgJ2tleScpKSB7XG4gICAgICAgIG5ld05vZGUuZGF0YVBvaW50ZXIgPSBuZXdOb2RlLmtleSA9PT0gJyonID8gbmV3Tm9kZS5rZXkgOlxuICAgICAgICAgIEpzb25Qb2ludGVyLmNvbXBpbGUoSnNvblBvaW50ZXIucGFyc2VPYmplY3RQYXRoKG5ld05vZGUua2V5KSwgJy0nKTtcbiAgICAgICAgZGVsZXRlIG5ld05vZGUua2V5O1xuXG4gICAgICAvLyBJZiBuZXdOb2RlIGlzIGFuIGFycmF5LCBzZWFyY2ggZm9yIGRhdGFQb2ludGVyIGluIGNoaWxkIG5vZGVzXG4gICAgICB9IGVsc2UgaWYgKGhhc093bihuZXdOb2RlLCAndHlwZScpICYmIG5ld05vZGUudHlwZS5zbGljZSgtNSkgPT09ICdhcnJheScpIHtcbiAgICAgICAgY29uc3QgZmluZERhdGFQb2ludGVyID0gKGl0ZW1zKSA9PiB7XG4gICAgICAgICAgaWYgKGl0ZW1zID09PSBudWxsIHx8IHR5cGVvZiBpdGVtcyAhPT0gJ29iamVjdCcpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgaWYgKGhhc093bihpdGVtcywgJ2RhdGFQb2ludGVyJykpIHsgcmV0dXJuIGl0ZW1zLmRhdGFQb2ludGVyOyB9XG4gICAgICAgICAgaWYgKGlzQXJyYXkoaXRlbXMuaXRlbXMpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMuaXRlbXMpIHtcbiAgICAgICAgICAgICAgaWYgKGhhc093bihpdGVtLCAnZGF0YVBvaW50ZXInKSAmJiBpdGVtLmRhdGFQb2ludGVyLmluZGV4T2YoJy8tJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZGF0YVBvaW50ZXI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGhhc093bihpdGVtLCAnaXRlbXMnKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlYXJjaEl0ZW0gPSBmaW5kRGF0YVBvaW50ZXIoaXRlbSk7XG4gICAgICAgICAgICAgICAgaWYgKHNlYXJjaEl0ZW0pIHsgcmV0dXJuIHNlYXJjaEl0ZW07IH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2hpbGREYXRhUG9pbnRlciA9IGZpbmREYXRhUG9pbnRlcihuZXdOb2RlKTtcbiAgICAgICAgaWYgKGNoaWxkRGF0YVBvaW50ZXIpIHtcbiAgICAgICAgICBuZXdOb2RlLmRhdGFQb2ludGVyID1cbiAgICAgICAgICAgIGNoaWxkRGF0YVBvaW50ZXIuc2xpY2UoMCwgY2hpbGREYXRhUG9pbnRlci5sYXN0SW5kZXhPZignLy0nKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaGFzT3duKG5ld05vZGUsICdkYXRhUG9pbnRlcicpKSB7XG4gICAgICBpZiAobmV3Tm9kZS5kYXRhUG9pbnRlciA9PT0gJyonKSB7XG4gICAgICAgIHJldHVybiBidWlsZExheW91dEZyb21TY2hlbWEoanNmLCB3aWRnZXRMaWJyYXJ5LCBqc2YuZm9ybVZhbHVlcyk7XG4gICAgICB9XG4gICAgICBjb25zdCBub2RlVmFsdWUgPVxuICAgICAgICBKc29uUG9pbnRlci5nZXQoanNmLmZvcm1WYWx1ZXMsIG5ld05vZGUuZGF0YVBvaW50ZXIucmVwbGFjZSgvXFwvLS9nLCAnLzEnKSk7XG5cbiAgICAgIC8vIFRPRE86IENyZWF0ZSBmdW5jdGlvbiBnZXRGb3JtVmFsdWVzKGpzZiwgZGF0YVBvaW50ZXIsIGZvclJlZkxpYnJhcnkpXG4gICAgICAvLyBjaGVjayBmb3JtT3B0aW9ucy5zZXRTY2hlbWFEZWZhdWx0cyBhbmQgZm9ybU9wdGlvbnMuc2V0TGF5b3V0RGVmYXVsdHNcbiAgICAgIC8vIHRoZW4gc2V0IGFwcm9wcmlhdGUgdmFsdWVzIGZyb20gaW5pdGlhbFZhdWVzLCBzY2hlbWEsIG9yIGxheW91dFxuXG4gICAgICBuZXdOb2RlLmRhdGFQb2ludGVyID1cbiAgICAgICAgSnNvblBvaW50ZXIudG9HZW5lcmljUG9pbnRlcihuZXdOb2RlLmRhdGFQb2ludGVyLCBqc2YuYXJyYXlNYXApO1xuICAgICAgY29uc3QgTGFzdEtleSA9IEpzb25Qb2ludGVyLnRvS2V5KG5ld05vZGUuZGF0YVBvaW50ZXIpO1xuICAgICAgaWYgKCFuZXdOb2RlLm5hbWUgJiYgaXNTdHJpbmcoTGFzdEtleSkgJiYgTGFzdEtleSAhPT0gJy0nKSB7XG4gICAgICAgIG5ld05vZGUubmFtZSA9IExhc3RLZXk7XG4gICAgICB9XG4gICAgICBjb25zdCBzaG9ydERhdGFQb2ludGVyID0gcmVtb3ZlUmVjdXJzaXZlUmVmZXJlbmNlcyhcbiAgICAgICAgbmV3Tm9kZS5kYXRhUG9pbnRlciwganNmLmRhdGFSZWN1cnNpdmVSZWZNYXAsIGpzZi5hcnJheU1hcFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHJlY3Vyc2l2ZSA9ICFzaG9ydERhdGFQb2ludGVyLmxlbmd0aCB8fFxuICAgICAgICBzaG9ydERhdGFQb2ludGVyICE9PSBuZXdOb2RlLmRhdGFQb2ludGVyO1xuICAgICAgbGV0IHNjaGVtYVBvaW50ZXI6IHN0cmluZztcbiAgICAgIGlmICghanNmLmRhdGFNYXAuaGFzKHNob3J0RGF0YVBvaW50ZXIpKSB7XG4gICAgICAgIGpzZi5kYXRhTWFwLnNldChzaG9ydERhdGFQb2ludGVyLCBuZXcgTWFwKCkpO1xuICAgICAgfVxuICAgICAgY29uc3Qgbm9kZURhdGFNYXAgPSBqc2YuZGF0YU1hcC5nZXQoc2hvcnREYXRhUG9pbnRlcik7XG4gICAgICBpZiAobm9kZURhdGFNYXAuaGFzKCdzY2hlbWFQb2ludGVyJykpIHtcbiAgICAgICAgc2NoZW1hUG9pbnRlciA9IG5vZGVEYXRhTWFwLmdldCgnc2NoZW1hUG9pbnRlcicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2NoZW1hUG9pbnRlciA9IEpzb25Qb2ludGVyLnRvU2NoZW1hUG9pbnRlcihzaG9ydERhdGFQb2ludGVyLCBqc2Yuc2NoZW1hKTtcbiAgICAgICAgbm9kZURhdGFNYXAuc2V0KCdzY2hlbWFQb2ludGVyJywgc2NoZW1hUG9pbnRlcik7XG4gICAgICB9XG4gICAgICBub2RlRGF0YU1hcC5zZXQoJ2Rpc2FibGVkJywgISFuZXdOb2RlLm9wdGlvbnMuZGlzYWJsZWQpO1xuICAgICAgbm9kZVNjaGVtYSA9IEpzb25Qb2ludGVyLmdldChqc2Yuc2NoZW1hLCBzY2hlbWFQb2ludGVyKTtcbiAgICAgIGlmIChub2RlU2NoZW1hKSB7XG4gICAgICAgIGlmICghaGFzT3duKG5ld05vZGUsICd0eXBlJykpIHtcbiAgICAgICAgICBuZXdOb2RlLnR5cGUgPSBnZXRJbnB1dFR5cGUobm9kZVNjaGVtYSwgbmV3Tm9kZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXdpZGdldExpYnJhcnkuaGFzV2lkZ2V0KG5ld05vZGUudHlwZSkpIHtcbiAgICAgICAgICBjb25zdCBvbGRXaWRnZXRUeXBlID0gbmV3Tm9kZS50eXBlO1xuICAgICAgICAgIG5ld05vZGUudHlwZSA9IGdldElucHV0VHlwZShub2RlU2NoZW1hLCBuZXdOb2RlKTtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBlcnJvcjogd2lkZ2V0IHR5cGUgXCIke29sZFdpZGdldFR5cGV9XCIgYCArXG4gICAgICAgICAgICBgbm90IGZvdW5kIGluIGxpYnJhcnkuIFJlcGxhY2luZyB3aXRoIFwiJHtuZXdOb2RlLnR5cGV9XCIuYCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3Tm9kZS50eXBlID0gY2hlY2tJbmxpbmVUeXBlKG5ld05vZGUudHlwZSwgbm9kZVNjaGVtYSwgbmV3Tm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGVTY2hlbWEudHlwZSA9PT0gJ29iamVjdCcgJiYgaXNBcnJheShub2RlU2NoZW1hLnJlcXVpcmVkKSkge1xuICAgICAgICAgIG5vZGVEYXRhTWFwLnNldCgncmVxdWlyZWQnLCBub2RlU2NoZW1hLnJlcXVpcmVkKTtcbiAgICAgICAgfVxuICAgICAgICBuZXdOb2RlLmRhdGFUeXBlID1cbiAgICAgICAgICBub2RlU2NoZW1hLnR5cGUgfHwgKGhhc093bihub2RlU2NoZW1hLCAnJHJlZicpID8gJyRyZWYnIDogbnVsbCk7XG4gICAgICAgIHVwZGF0ZUlucHV0T3B0aW9ucyhuZXdOb2RlLCBub2RlU2NoZW1hLCBqc2YpO1xuXG4gICAgICAgIC8vIFByZXNlbnQgY2hlY2tib3hlcyBhcyBzaW5nbGUgY29udHJvbCwgcmF0aGVyIHRoYW4gYXJyYXlcbiAgICAgICAgaWYgKG5ld05vZGUudHlwZSA9PT0gJ2NoZWNrYm94ZXMnICYmIGhhc093bihub2RlU2NoZW1hLCAnaXRlbXMnKSkge1xuICAgICAgICAgIHVwZGF0ZUlucHV0T3B0aW9ucyhuZXdOb2RlLCBub2RlU2NoZW1hLml0ZW1zLCBqc2YpO1xuICAgICAgICB9IGVsc2UgaWYgKG5ld05vZGUuZGF0YVR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXMgPSBNYXRoLm1pbihcbiAgICAgICAgICAgIG5vZGVTY2hlbWEubWF4SXRlbXMgfHwgMTAwMCwgbmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zIHx8IDEwMDBcbiAgICAgICAgICApO1xuICAgICAgICAgIG5ld05vZGUub3B0aW9ucy5taW5JdGVtcyA9IE1hdGgubWF4KFxuICAgICAgICAgICAgbm9kZVNjaGVtYS5taW5JdGVtcyB8fCAwLCBuZXdOb2RlLm9wdGlvbnMubWluSXRlbXMgfHwgMFxuICAgICAgICAgICk7XG4gICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLmxpc3RJdGVtcyA9IE1hdGgubWF4KFxuICAgICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLmxpc3RJdGVtcyB8fCAwLCBpc0FycmF5KG5vZGVWYWx1ZSkgPyBub2RlVmFsdWUubGVuZ3RoIDogMFxuICAgICAgICAgICk7XG4gICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXMgPVxuICAgICAgICAgICAgaXNBcnJheShub2RlU2NoZW1hLml0ZW1zKSA/IG5vZGVTY2hlbWEuaXRlbXMubGVuZ3RoIDogMDtcbiAgICAgICAgICBpZiAobmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zIDwgbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXMpIHtcbiAgICAgICAgICAgIG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zID0gbmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zO1xuICAgICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLmxpc3RJdGVtcyA9IDA7XG4gICAgICAgICAgfSBlbHNlIGlmIChuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXMgPFxuICAgICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXMgKyBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zID1cbiAgICAgICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zIC0gbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXM7XG4gICAgICAgICAgfSBlbHNlIGlmIChuZXdOb2RlLm9wdGlvbnMubWluSXRlbXMgPlxuICAgICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXMgKyBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zID1cbiAgICAgICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLm1pbkl0ZW1zIC0gbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXM7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghbm9kZURhdGFNYXAuaGFzKCdtYXhJdGVtcycpKSB7XG4gICAgICAgICAgICBub2RlRGF0YU1hcC5zZXQoJ21heEl0ZW1zJywgbmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zKTtcbiAgICAgICAgICAgIG5vZGVEYXRhTWFwLnNldCgnbWluSXRlbXMnLCBuZXdOb2RlLm9wdGlvbnMubWluSXRlbXMpO1xuICAgICAgICAgICAgbm9kZURhdGFNYXAuc2V0KCd0dXBsZUl0ZW1zJywgbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXMpO1xuICAgICAgICAgICAgbm9kZURhdGFNYXAuc2V0KCdsaXN0SXRlbXMnLCBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFqc2YuYXJyYXlNYXAuaGFzKHNob3J0RGF0YVBvaW50ZXIpKSB7XG4gICAgICAgICAgICBqc2YuYXJyYXlNYXAuc2V0KHNob3J0RGF0YVBvaW50ZXIsIG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzSW5wdXRSZXF1aXJlZChqc2Yuc2NoZW1hLCBzY2hlbWFQb2ludGVyKSkge1xuICAgICAgICAgIG5ld05vZGUub3B0aW9ucy5yZXF1aXJlZCA9IHRydWU7XG4gICAgICAgICAganNmLmZpZWxkc1JlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVE9ETzogY3JlYXRlIGl0ZW0gaW4gRm9ybUdyb3VwIG1vZGVsIGZyb20gbGF5b3V0IGtleSAoPylcbiAgICAgICAgdXBkYXRlSW5wdXRPcHRpb25zKG5ld05vZGUsIHt9LCBqc2YpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW5ld05vZGUub3B0aW9ucy50aXRsZSAmJiAhL15cXGQrJC8udGVzdChuZXdOb2RlLm5hbWUpKSB7XG4gICAgICAgIG5ld05vZGUub3B0aW9ucy50aXRsZSA9IGZpeFRpdGxlKG5ld05vZGUubmFtZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChoYXNPd24obmV3Tm9kZS5vcHRpb25zLCAnY29weVZhbHVlVG8nKSkge1xuICAgICAgICBpZiAodHlwZW9mIG5ld05vZGUub3B0aW9ucy5jb3B5VmFsdWVUbyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMuY29weVZhbHVlVG8gPSBbbmV3Tm9kZS5vcHRpb25zLmNvcHlWYWx1ZVRvXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNBcnJheShuZXdOb2RlLm9wdGlvbnMuY29weVZhbHVlVG8pKSB7XG4gICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLmNvcHlWYWx1ZVRvID0gbmV3Tm9kZS5vcHRpb25zLmNvcHlWYWx1ZVRvLm1hcChpdGVtID0+XG4gICAgICAgICAgICBKc29uUG9pbnRlci5jb21waWxlKEpzb25Qb2ludGVyLnBhcnNlT2JqZWN0UGF0aChpdGVtKSwgJy0nKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbmV3Tm9kZS53aWRnZXQgPSB3aWRnZXRMaWJyYXJ5LmdldFdpZGdldChuZXdOb2RlLnR5cGUpO1xuICAgICAgbm9kZURhdGFNYXAuc2V0KCdpbnB1dFR5cGUnLCBuZXdOb2RlLnR5cGUpO1xuICAgICAgbm9kZURhdGFNYXAuc2V0KCd3aWRnZXQnLCBuZXdOb2RlLndpZGdldCk7XG5cbiAgICAgIGlmIChuZXdOb2RlLmRhdGFUeXBlID09PSAnYXJyYXknICYmXG4gICAgICAgIChoYXNPd24obmV3Tm9kZSwgJ2l0ZW1zJykgfHwgaGFzT3duKG5ld05vZGUsICdhZGRpdGlvbmFsSXRlbXMnKSlcbiAgICAgICkge1xuICAgICAgICBjb25zdCBpdGVtUmVmUG9pbnRlciA9IHJlbW92ZVJlY3Vyc2l2ZVJlZmVyZW5jZXMoXG4gICAgICAgICAgbmV3Tm9kZS5kYXRhUG9pbnRlciArICcvLScsIGpzZi5kYXRhUmVjdXJzaXZlUmVmTWFwLCBqc2YuYXJyYXlNYXBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKCFqc2YuZGF0YU1hcC5oYXMoaXRlbVJlZlBvaW50ZXIpKSB7XG4gICAgICAgICAganNmLmRhdGFNYXAuc2V0KGl0ZW1SZWZQb2ludGVyLCBuZXcgTWFwKCkpO1xuICAgICAgICB9XG4gICAgICAgIGpzZi5kYXRhTWFwLmdldChpdGVtUmVmUG9pbnRlcikuc2V0KCdpbnB1dFR5cGUnLCAnc2VjdGlvbicpO1xuXG4gICAgICAgIC8vIEZpeCBpbnN1ZmZpY2llbnRseSBuZXN0ZWQgYXJyYXkgaXRlbSBncm91cHNcbiAgICAgICAgaWYgKG5ld05vZGUuaXRlbXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGNvbnN0IGFycmF5SXRlbUdyb3VwID0gW107XG4gICAgICAgICAgY29uc3QgYXJyYXlJdGVtR3JvdXBUZW1wbGF0ZSA9IFtdO1xuICAgICAgICAgIGxldCBuZXdJbmRleCA9IDA7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IG5ld05vZGUuaXRlbXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGNvbnN0IHN1Ykl0ZW0gPSBuZXdOb2RlLml0ZW1zW2ldO1xuICAgICAgICAgICAgaWYgKGhhc093bihzdWJJdGVtLCAnZGF0YVBvaW50ZXInKSAmJlxuICAgICAgICAgICAgICBzdWJJdGVtLmRhdGFQb2ludGVyLnNsaWNlKDAsIGl0ZW1SZWZQb2ludGVyLmxlbmd0aCkgPT09IGl0ZW1SZWZQb2ludGVyXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29uc3QgYXJyYXlJdGVtID0gbmV3Tm9kZS5pdGVtcy5zcGxpY2UoaSwgMSlbMF07XG4gICAgICAgICAgICAgIGFycmF5SXRlbS5kYXRhUG9pbnRlciA9IG5ld05vZGUuZGF0YVBvaW50ZXIgKyAnLy0nICtcbiAgICAgICAgICAgICAgICBhcnJheUl0ZW0uZGF0YVBvaW50ZXIuc2xpY2UoaXRlbVJlZlBvaW50ZXIubGVuZ3RoKTtcbiAgICAgICAgICAgICAgYXJyYXlJdGVtR3JvdXAudW5zaGlmdChhcnJheUl0ZW0pO1xuICAgICAgICAgICAgICBuZXdJbmRleCsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3ViSXRlbS5hcnJheUl0ZW0gPSB0cnVlO1xuICAgICAgICAgICAgICAvLyBUT0RPOiBDaGVjayBzY2hlbWEgdG8gZ2V0IGFycmF5SXRlbVR5cGUgYW5kIHJlbW92YWJsZVxuICAgICAgICAgICAgICBzdWJJdGVtLmFycmF5SXRlbVR5cGUgPSAnbGlzdCc7XG4gICAgICAgICAgICAgIHN1Ykl0ZW0ucmVtb3ZhYmxlID0gbmV3Tm9kZS5vcHRpb25zLnJlbW92YWJsZSAhPT0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhcnJheUl0ZW1Hcm91cC5sZW5ndGgpIHtcbiAgICAgICAgICAgIG5ld05vZGUuaXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgIF9pZDogXy51bmlxdWVJZCgpLFxuICAgICAgICAgICAgICBhcnJheUl0ZW06IHRydWUsXG4gICAgICAgICAgICAgIGFycmF5SXRlbVR5cGU6IG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zID4gbmV3Tm9kZS5pdGVtcy5sZW5ndGggP1xuICAgICAgICAgICAgICAgICd0dXBsZScgOiAnbGlzdCcsXG4gICAgICAgICAgICAgIGl0ZW1zOiBhcnJheUl0ZW1Hcm91cCxcbiAgICAgICAgICAgICAgb3B0aW9uczogeyByZW1vdmFibGU6IG5ld05vZGUub3B0aW9ucy5yZW1vdmFibGUgIT09IGZhbHNlLCB9LFxuICAgICAgICAgICAgICBkYXRhUG9pbnRlcjogbmV3Tm9kZS5kYXRhUG9pbnRlciArICcvLScsXG4gICAgICAgICAgICAgIHR5cGU6ICdzZWN0aW9uJyxcbiAgICAgICAgICAgICAgd2lkZ2V0OiB3aWRnZXRMaWJyYXJ5LmdldFdpZGdldCgnc2VjdGlvbicpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFRPRE86IEZpeCB0byBobmRsZSBtdWx0aXBsZSBpdGVtc1xuICAgICAgICAgIG5ld05vZGUuaXRlbXNbMF0uYXJyYXlJdGVtID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoIW5ld05vZGUuaXRlbXNbMF0uZGF0YVBvaW50ZXIpIHtcbiAgICAgICAgICAgIG5ld05vZGUuaXRlbXNbMF0uZGF0YVBvaW50ZXIgPVxuICAgICAgICAgICAgICBKc29uUG9pbnRlci50b0dlbmVyaWNQb2ludGVyKGl0ZW1SZWZQb2ludGVyLCBqc2YuYXJyYXlNYXApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIUpzb25Qb2ludGVyLmhhcyhuZXdOb2RlLCAnL2l0ZW1zLzAvb3B0aW9ucy9yZW1vdmFibGUnKSkge1xuICAgICAgICAgICAgbmV3Tm9kZS5pdGVtc1swXS5vcHRpb25zLnJlbW92YWJsZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChuZXdOb2RlLm9wdGlvbnMub3JkZXJhYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgbmV3Tm9kZS5pdGVtc1swXS5vcHRpb25zLm9yZGVyYWJsZSA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBuZXdOb2RlLml0ZW1zWzBdLmFycmF5SXRlbVR5cGUgPVxuICAgICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXMgPyAndHVwbGUnIDogJ2xpc3QnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQXJyYXkobmV3Tm9kZS5pdGVtcykpIHtcbiAgICAgICAgICBjb25zdCBhcnJheUxpc3RJdGVtcyA9XG4gICAgICAgICAgICBuZXdOb2RlLml0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW0udHlwZSAhPT0gJyRyZWYnKS5sZW5ndGggLVxuICAgICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcztcbiAgICAgICAgICBpZiAoYXJyYXlMaXN0SXRlbXMgPiBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zKSB7XG4gICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zID0gYXJyYXlMaXN0SXRlbXM7XG4gICAgICAgICAgICBub2RlRGF0YU1hcC5zZXQoJ2xpc3RJdGVtcycsIGFycmF5TGlzdEl0ZW1zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWhhc093bihqc2YubGF5b3V0UmVmTGlicmFyeSwgaXRlbVJlZlBvaW50ZXIpKSB7XG4gICAgICAgICAganNmLmxheW91dFJlZkxpYnJhcnlbaXRlbVJlZlBvaW50ZXJdID1cbiAgICAgICAgICAgIF8uY2xvbmVEZWVwKG5ld05vZGUuaXRlbXNbbmV3Tm9kZS5pdGVtcy5sZW5ndGggLSAxXSk7XG4gICAgICAgICAgaWYgKHJlY3Vyc2l2ZSkge1xuICAgICAgICAgICAganNmLmxheW91dFJlZkxpYnJhcnlbaXRlbVJlZlBvaW50ZXJdLnJlY3Vyc2l2ZVJlZmVyZW5jZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvckVhY2goanNmLmxheW91dFJlZkxpYnJhcnlbaXRlbVJlZlBvaW50ZXJdLCAoaXRlbSwga2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoaGFzT3duKGl0ZW0sICdfaWQnKSkgeyBpdGVtLl9pZCA9IG51bGw7IH1cbiAgICAgICAgICAgIGlmIChyZWN1cnNpdmUpIHtcbiAgICAgICAgICAgICAgaWYgKGhhc093bihpdGVtLCAnZGF0YVBvaW50ZXInKSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uZGF0YVBvaW50ZXIgPSBpdGVtLmRhdGFQb2ludGVyLnNsaWNlKGl0ZW1SZWZQb2ludGVyLmxlbmd0aCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCAndG9wLWRvd24nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBhbnkgYWRkaXRpb25hbCBkZWZhdWx0IGl0ZW1zXG4gICAgICAgIGlmICghbmV3Tm9kZS5yZWN1cnNpdmVSZWZlcmVuY2UgfHwgbmV3Tm9kZS5vcHRpb25zLnJlcXVpcmVkKSB7XG4gICAgICAgICAgY29uc3QgYXJyYXlMZW5ndGggPSBNYXRoLm1pbihNYXRoLm1heChcbiAgICAgICAgICAgIG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zICsgbmV3Tm9kZS5vcHRpb25zLmxpc3RJdGVtcyxcbiAgICAgICAgICAgIGlzQXJyYXkobm9kZVZhbHVlKSA/IG5vZGVWYWx1ZS5sZW5ndGggOiAwXG4gICAgICAgICAgKSwgbmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zKTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gbmV3Tm9kZS5pdGVtcy5sZW5ndGg7IGkgPCBhcnJheUxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBuZXdOb2RlLml0ZW1zLnB1c2goZ2V0TGF5b3V0Tm9kZSh7XG4gICAgICAgICAgICAgICRyZWY6IGl0ZW1SZWZQb2ludGVyLFxuICAgICAgICAgICAgICBkYXRhUG9pbnRlcjogbmV3Tm9kZS5kYXRhUG9pbnRlcixcbiAgICAgICAgICAgICAgcmVjdXJzaXZlUmVmZXJlbmNlOiBuZXdOb2RlLnJlY3Vyc2l2ZVJlZmVyZW5jZSxcbiAgICAgICAgICAgIH0sIGpzZiwgd2lkZ2V0TGlicmFyeSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIG5lZWRlZCwgYWRkIGJ1dHRvbiB0byBhZGQgaXRlbXMgdG8gYXJyYXlcbiAgICAgICAgaWYgKG5ld05vZGUub3B0aW9ucy5hZGRhYmxlICE9PSBmYWxzZSAmJlxuICAgICAgICAgIG5ld05vZGUub3B0aW9ucy5taW5JdGVtcyA8IG5ld05vZGUub3B0aW9ucy5tYXhJdGVtcyAmJlxuICAgICAgICAgIChuZXdOb2RlLml0ZW1zW25ld05vZGUuaXRlbXMubGVuZ3RoIC0gMV0gfHwge30pLnR5cGUgIT09ICckcmVmJ1xuICAgICAgICApIHtcbiAgICAgICAgICBsZXQgYnV0dG9uVGV4dCA9ICdBZGQnO1xuICAgICAgICAgIGlmIChuZXdOb2RlLm9wdGlvbnMudGl0bGUpIHtcbiAgICAgICAgICAgIGlmICgvXmFkZFxcYi9pLnRlc3QobmV3Tm9kZS5vcHRpb25zLnRpdGxlKSkge1xuICAgICAgICAgICAgICBidXR0b25UZXh0ID0gbmV3Tm9kZS5vcHRpb25zLnRpdGxlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYnV0dG9uVGV4dCArPSAnICcgKyBuZXdOb2RlLm9wdGlvbnMudGl0bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChuZXdOb2RlLm5hbWUgJiYgIS9eXFxkKyQvLnRlc3QobmV3Tm9kZS5uYW1lKSkge1xuICAgICAgICAgICAgaWYgKC9eYWRkXFxiL2kudGVzdChuZXdOb2RlLm5hbWUpKSB7XG4gICAgICAgICAgICAgIGJ1dHRvblRleHQgKz0gJyAnICsgZml4VGl0bGUobmV3Tm9kZS5uYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGJ1dHRvblRleHQgPSBmaXhUaXRsZShuZXdOb2RlLm5hbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gSWYgbmV3Tm9kZSBkb2Vzbid0IGhhdmUgYSB0aXRsZSwgbG9vayBmb3IgdGl0bGUgb2YgcGFyZW50IGFycmF5IGl0ZW1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50U2NoZW1hID1cbiAgICAgICAgICAgICAgZ2V0RnJvbVNjaGVtYShqc2Yuc2NoZW1hLCBuZXdOb2RlLmRhdGFQb2ludGVyLCAncGFyZW50U2NoZW1hJyk7XG4gICAgICAgICAgICBpZiAoaGFzT3duKHBhcmVudFNjaGVtYSwgJ3RpdGxlJykpIHtcbiAgICAgICAgICAgICAgYnV0dG9uVGV4dCArPSAnIHRvICcgKyBwYXJlbnRTY2hlbWEudGl0bGU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zdCBwb2ludGVyQXJyYXkgPSBKc29uUG9pbnRlci5wYXJzZShuZXdOb2RlLmRhdGFQb2ludGVyKTtcbiAgICAgICAgICAgICAgYnV0dG9uVGV4dCArPSAnIHRvICcgKyBmaXhUaXRsZShwb2ludGVyQXJyYXlbcG9pbnRlckFycmF5Lmxlbmd0aCAtIDJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgbmV3Tm9kZS5pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgIF9pZDogXy51bmlxdWVJZCgpLFxuICAgICAgICAgICAgYXJyYXlJdGVtOiB0cnVlLFxuICAgICAgICAgICAgYXJyYXlJdGVtVHlwZTogJ2xpc3QnLFxuICAgICAgICAgICAgZGF0YVBvaW50ZXI6IG5ld05vZGUuZGF0YVBvaW50ZXIgKyAnLy0nLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICBsaXN0SXRlbXM6IG5ld05vZGUub3B0aW9ucy5saXN0SXRlbXMsXG4gICAgICAgICAgICAgIG1heEl0ZW1zOiBuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXMsXG4gICAgICAgICAgICAgIG1pbkl0ZW1zOiBuZXdOb2RlLm9wdGlvbnMubWluSXRlbXMsXG4gICAgICAgICAgICAgIHJlbW92YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgIHRpdGxlOiBidXR0b25UZXh0LFxuICAgICAgICAgICAgICB0dXBsZUl0ZW1zOiBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWN1cnNpdmVSZWZlcmVuY2U6IHJlY3Vyc2l2ZSxcbiAgICAgICAgICAgIHR5cGU6ICckcmVmJyxcbiAgICAgICAgICAgIHdpZGdldDogd2lkZ2V0TGlicmFyeS5nZXRXaWRnZXQoJyRyZWYnKSxcbiAgICAgICAgICAgICRyZWY6IGl0ZW1SZWZQb2ludGVyLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChpc1N0cmluZyhKc29uUG9pbnRlci5nZXQobmV3Tm9kZSwgJy9zdHlsZS9hZGQnKSkpIHtcbiAgICAgICAgICAgIG5ld05vZGUuaXRlbXNbbmV3Tm9kZS5pdGVtcy5sZW5ndGggLSAxXS5vcHRpb25zLmZpZWxkU3R5bGUgPVxuICAgICAgICAgICAgICBuZXdOb2RlLnN0eWxlLmFkZDtcbiAgICAgICAgICAgIGRlbGV0ZSBuZXdOb2RlLnN0eWxlLmFkZDtcbiAgICAgICAgICAgIGlmIChpc0VtcHR5KG5ld05vZGUuc3R5bGUpKSB7IGRlbGV0ZSBuZXdOb2RlLnN0eWxlOyB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdOb2RlLmFycmF5SXRlbSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaGFzT3duKG5ld05vZGUsICd0eXBlJykgfHwgaGFzT3duKG5ld05vZGUsICdpdGVtcycpKSB7XG4gICAgICBjb25zdCBwYXJlbnRUeXBlOiBzdHJpbmcgPVxuICAgICAgICBKc29uUG9pbnRlci5nZXQoanNmLmxheW91dCwgbGF5b3V0UG9pbnRlciwgMCwgLTIpLnR5cGU7XG4gICAgICBpZiAoIWhhc093bihuZXdOb2RlLCAndHlwZScpKSB7XG4gICAgICAgIG5ld05vZGUudHlwZSA9XG4gICAgICAgICAgaW5BcnJheShwYXJlbnRUeXBlLCBbJ3RhYnMnLCAndGFiYXJyYXknXSkgPyAndGFiJyA6ICdhcnJheSc7XG4gICAgICB9XG4gICAgICBuZXdOb2RlLmFycmF5SXRlbSA9IHBhcmVudFR5cGUgPT09ICdhcnJheSc7XG4gICAgICBuZXdOb2RlLndpZGdldCA9IHdpZGdldExpYnJhcnkuZ2V0V2lkZ2V0KG5ld05vZGUudHlwZSk7XG4gICAgICB1cGRhdGVJbnB1dE9wdGlvbnMobmV3Tm9kZSwge30sIGpzZik7XG4gICAgfVxuICAgIGlmIChuZXdOb2RlLnR5cGUgPT09ICdzdWJtaXQnKSB7IGhhc1N1Ym1pdEJ1dHRvbiA9IHRydWU7IH1cbiAgICByZXR1cm4gbmV3Tm9kZTtcbiAgfSk7XG4gIGlmIChqc2YuaGFzUm9vdFJlZmVyZW5jZSkge1xuICAgIGNvbnN0IGZ1bGxMYXlvdXQgPSBfLmNsb25lRGVlcChmb3JtTGF5b3V0KTtcbiAgICBpZiAoZnVsbExheW91dFtmdWxsTGF5b3V0Lmxlbmd0aCAtIDFdLnR5cGUgPT09ICdzdWJtaXQnKSB7IGZ1bGxMYXlvdXQucG9wKCk7IH1cbiAgICBqc2YubGF5b3V0UmVmTGlicmFyeVsnJ10gPSB7XG4gICAgICBfaWQ6IG51bGwsXG4gICAgICBkYXRhUG9pbnRlcjogJycsXG4gICAgICBkYXRhVHlwZTogJ29iamVjdCcsXG4gICAgICBpdGVtczogZnVsbExheW91dCxcbiAgICAgIG5hbWU6ICcnLFxuICAgICAgb3B0aW9uczogXy5jbG9uZURlZXAoanNmLmZvcm1PcHRpb25zLmRlZmF1dFdpZGdldE9wdGlvbnMpLFxuICAgICAgcmVjdXJzaXZlUmVmZXJlbmNlOiB0cnVlLFxuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgdHlwZTogJ3NlY3Rpb24nLFxuICAgICAgd2lkZ2V0OiB3aWRnZXRMaWJyYXJ5LmdldFdpZGdldCgnc2VjdGlvbicpLFxuICAgIH07XG4gIH1cbiAgaWYgKCFoYXNTdWJtaXRCdXR0b24pIHtcbiAgICBmb3JtTGF5b3V0LnB1c2goe1xuICAgICAgX2lkOiBfLnVuaXF1ZUlkKCksXG4gICAgICBvcHRpb25zOiB7IHRpdGxlOiAnU3VibWl0JyB9LFxuICAgICAgdHlwZTogJ3N1Ym1pdCcsXG4gICAgICB3aWRnZXQ6IHdpZGdldExpYnJhcnkuZ2V0V2lkZ2V0KCdzdWJtaXQnKSxcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gZm9ybUxheW91dDtcbn1cblxuLyoqXG4gKiAnYnVpbGRMYXlvdXRGcm9tU2NoZW1hJyBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSAgeyBhbnkgfSBqc2YgLVxuICogQHBhcmFtICB7IGFueSB9IHdpZGdldExpYnJhcnkgLVxuICogQHBhcmFtICB7IGFueSB9IG5vZGVWYWx1ZSAtXG4gKiBAcGFyYW0gIHsgc3RyaW5nID0gJycgfSBzY2hlbWFQb2ludGVyIC1cbiAqIEBwYXJhbSAgeyBzdHJpbmcgPSAnJyB9IGRhdGFQb2ludGVyIC1cbiAqIEBwYXJhbSAgeyBib29sZWFuID0gZmFsc2UgfSBhcnJheUl0ZW0gLVxuICogQHBhcmFtICB7IHN0cmluZyA9IG51bGwgfSBhcnJheUl0ZW1UeXBlIC1cbiAqIEBwYXJhbSAgeyBib29sZWFuID0gbnVsbCB9IHJlbW92YWJsZSAtXG4gKiBAcGFyYW0gIHsgYm9vbGVhbiA9IGZhbHNlIH0gZm9yUmVmTGlicmFyeSAtXG4gKiBAcGFyYW0gIHsgc3RyaW5nID0gJycgfSBkYXRhUG9pbnRlclByZWZpeCAtXG4gKiBAcmV0dXJuIHsgYW55IH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTGF5b3V0RnJvbVNjaGVtYShcbiAganNmLCB3aWRnZXRMaWJyYXJ5LCBub2RlVmFsdWUgPSBudWxsLCBzY2hlbWFQb2ludGVyID0gJycsXG4gIGRhdGFQb2ludGVyID0gJycsIGFycmF5SXRlbSA9IGZhbHNlLCBhcnJheUl0ZW1UeXBlOiBzdHJpbmcgPSBudWxsLFxuICByZW1vdmFibGU6IGJvb2xlYW4gPSBudWxsLCBmb3JSZWZMaWJyYXJ5ID0gZmFsc2UsIGRhdGFQb2ludGVyUHJlZml4ID0gJydcbikge1xuICBjb25zdCBzY2hlbWEgPSBKc29uUG9pbnRlci5nZXQoanNmLnNjaGVtYSwgc2NoZW1hUG9pbnRlcik7XG4gIGlmICghaGFzT3duKHNjaGVtYSwgJ3R5cGUnKSAmJiAhaGFzT3duKHNjaGVtYSwgJyRyZWYnKSAmJlxuICAgICFoYXNPd24oc2NoZW1hLCAneC1zY2hlbWEtZm9ybScpXG4gICkgeyByZXR1cm4gbnVsbDsgfVxuICBjb25zdCBuZXdOb2RlVHlwZTogc3RyaW5nID0gZ2V0SW5wdXRUeXBlKHNjaGVtYSk7XG4gIGlmICghaXNEZWZpbmVkKG5vZGVWYWx1ZSkgJiYgKFxuICAgIGpzZi5mb3JtT3B0aW9ucy5zZXRTY2hlbWFEZWZhdWx0cyA9PT0gdHJ1ZSB8fFxuICAgIChqc2YuZm9ybU9wdGlvbnMuc2V0U2NoZW1hRGVmYXVsdHMgPT09ICdhdXRvJyAmJiBpc0VtcHR5KGpzZi5mb3JtVmFsdWVzKSlcbiAgKSkge1xuICAgIG5vZGVWYWx1ZSA9IEpzb25Qb2ludGVyLmdldChqc2Yuc2NoZW1hLCBzY2hlbWFQb2ludGVyICsgJy9kZWZhdWx0Jyk7XG4gIH1cbiAgbGV0IG5ld05vZGU6IGFueSA9IHtcbiAgICBfaWQ6IGZvclJlZkxpYnJhcnkgPyBudWxsIDogXy51bmlxdWVJZCgpLFxuICAgIGFycmF5SXRlbTogYXJyYXlJdGVtLFxuICAgIGRhdGFQb2ludGVyOiBKc29uUG9pbnRlci50b0dlbmVyaWNQb2ludGVyKGRhdGFQb2ludGVyLCBqc2YuYXJyYXlNYXApLFxuICAgIGRhdGFUeXBlOiBzY2hlbWEudHlwZSB8fCAoaGFzT3duKHNjaGVtYSwgJyRyZWYnKSA/ICckcmVmJyA6IG51bGwpLFxuICAgIG9wdGlvbnM6IHt9LFxuICAgIHJlcXVpcmVkOiBpc0lucHV0UmVxdWlyZWQoanNmLnNjaGVtYSwgc2NoZW1hUG9pbnRlciksXG4gICAgdHlwZTogbmV3Tm9kZVR5cGUsXG4gICAgd2lkZ2V0OiB3aWRnZXRMaWJyYXJ5LmdldFdpZGdldChuZXdOb2RlVHlwZSksXG4gIH07XG4gIGNvbnN0IGxhc3REYXRhS2V5ID0gSnNvblBvaW50ZXIudG9LZXkobmV3Tm9kZS5kYXRhUG9pbnRlcik7XG4gIGlmIChsYXN0RGF0YUtleSAhPT0gJy0nKSB7IG5ld05vZGUubmFtZSA9IGxhc3REYXRhS2V5OyB9XG4gIGlmIChuZXdOb2RlLmFycmF5SXRlbSkge1xuICAgIG5ld05vZGUuYXJyYXlJdGVtVHlwZSA9IGFycmF5SXRlbVR5cGU7XG4gICAgbmV3Tm9kZS5vcHRpb25zLnJlbW92YWJsZSA9IHJlbW92YWJsZSAhPT0gZmFsc2U7XG4gIH1cbiAgY29uc3Qgc2hvcnREYXRhUG9pbnRlciA9IHJlbW92ZVJlY3Vyc2l2ZVJlZmVyZW5jZXMoXG4gICAgZGF0YVBvaW50ZXJQcmVmaXggKyBkYXRhUG9pbnRlciwganNmLmRhdGFSZWN1cnNpdmVSZWZNYXAsIGpzZi5hcnJheU1hcFxuICApO1xuICBjb25zdCByZWN1cnNpdmUgPSAhc2hvcnREYXRhUG9pbnRlci5sZW5ndGggfHxcbiAgICBzaG9ydERhdGFQb2ludGVyICE9PSBkYXRhUG9pbnRlclByZWZpeCArIGRhdGFQb2ludGVyO1xuICBpZiAoIWpzZi5kYXRhTWFwLmhhcyhzaG9ydERhdGFQb2ludGVyKSkge1xuICAgIGpzZi5kYXRhTWFwLnNldChzaG9ydERhdGFQb2ludGVyLCBuZXcgTWFwKCkpO1xuICB9XG4gIGNvbnN0IG5vZGVEYXRhTWFwID0ganNmLmRhdGFNYXAuZ2V0KHNob3J0RGF0YVBvaW50ZXIpO1xuICBpZiAoIW5vZGVEYXRhTWFwLmhhcygnaW5wdXRUeXBlJykpIHtcbiAgICBub2RlRGF0YU1hcC5zZXQoJ3NjaGVtYVBvaW50ZXInLCBzY2hlbWFQb2ludGVyKTtcbiAgICBub2RlRGF0YU1hcC5zZXQoJ2lucHV0VHlwZScsIG5ld05vZGUudHlwZSk7XG4gICAgbm9kZURhdGFNYXAuc2V0KCd3aWRnZXQnLCBuZXdOb2RlLndpZGdldCk7XG4gICAgbm9kZURhdGFNYXAuc2V0KCdkaXNhYmxlZCcsICEhbmV3Tm9kZS5vcHRpb25zLmRpc2FibGVkKTtcbiAgfVxuICB1cGRhdGVJbnB1dE9wdGlvbnMobmV3Tm9kZSwgc2NoZW1hLCBqc2YpO1xuICBpZiAoIW5ld05vZGUub3B0aW9ucy50aXRsZSAmJiBuZXdOb2RlLm5hbWUgJiYgIS9eXFxkKyQvLnRlc3QobmV3Tm9kZS5uYW1lKSkge1xuICAgIG5ld05vZGUub3B0aW9ucy50aXRsZSA9IGZpeFRpdGxlKG5ld05vZGUubmFtZSk7XG4gIH1cblxuICBpZiAobmV3Tm9kZS5kYXRhVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBpZiAoaXNBcnJheShzY2hlbWEucmVxdWlyZWQpICYmICFub2RlRGF0YU1hcC5oYXMoJ3JlcXVpcmVkJykpIHtcbiAgICAgIG5vZGVEYXRhTWFwLnNldCgncmVxdWlyZWQnLCBzY2hlbWEucmVxdWlyZWQpO1xuICAgIH1cbiAgICBpZiAoaXNPYmplY3Qoc2NoZW1hLnByb3BlcnRpZXMpKSB7XG4gICAgICBjb25zdCBuZXdTZWN0aW9uOiBhbnlbXSA9IFtdO1xuICAgICAgY29uc3QgcHJvcGVydHlLZXlzID0gc2NoZW1hWyd1aTpvcmRlciddIHx8IE9iamVjdC5rZXlzKHNjaGVtYS5wcm9wZXJ0aWVzKTtcbiAgICAgIGlmIChwcm9wZXJ0eUtleXMuaW5jbHVkZXMoJyonKSAmJiAhaGFzT3duKHNjaGVtYS5wcm9wZXJ0aWVzLCAnKicpKSB7XG4gICAgICAgIGNvbnN0IHVubmFtZWRLZXlzID0gT2JqZWN0LmtleXMoc2NoZW1hLnByb3BlcnRpZXMpXG4gICAgICAgICAgLmZpbHRlcihrZXkgPT4gIXByb3BlcnR5S2V5cy5pbmNsdWRlcyhrZXkpKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IHByb3BlcnR5S2V5cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChwcm9wZXJ0eUtleXNbaV0gPT09ICcqJykge1xuICAgICAgICAgICAgcHJvcGVydHlLZXlzLnNwbGljZShpLCAxLCAuLi51bm5hbWVkS2V5cyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBwcm9wZXJ0eUtleXNcbiAgICAgICAgLmZpbHRlcihrZXkgPT4gaGFzT3duKHNjaGVtYS5wcm9wZXJ0aWVzLCBrZXkpIHx8XG4gICAgICAgICAgaGFzT3duKHNjaGVtYSwgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJylcbiAgICAgICAgKVxuICAgICAgICAuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIGNvbnN0IGtleVNjaGVtYVBvaW50ZXIgPSBoYXNPd24oc2NoZW1hLnByb3BlcnRpZXMsIGtleSkgP1xuICAgICAgICAgICAgJy9wcm9wZXJ0aWVzLycgKyBrZXkgOiAnL2FkZGl0aW9uYWxQcm9wZXJ0aWVzJztcbiAgICAgICAgICBjb25zdCBpbm5lckl0ZW0gPSBidWlsZExheW91dEZyb21TY2hlbWEoXG4gICAgICAgICAgICBqc2YsIHdpZGdldExpYnJhcnksIGlzT2JqZWN0KG5vZGVWYWx1ZSkgPyBub2RlVmFsdWVba2V5XSA6IG51bGwsXG4gICAgICAgICAgICBzY2hlbWFQb2ludGVyICsga2V5U2NoZW1hUG9pbnRlcixcbiAgICAgICAgICAgIGRhdGFQb2ludGVyICsgJy8nICsga2V5LFxuICAgICAgICAgICAgZmFsc2UsIG51bGwsIG51bGwsIGZvclJlZkxpYnJhcnksIGRhdGFQb2ludGVyUHJlZml4XG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoaW5uZXJJdGVtKSB7XG4gICAgICAgICAgICBpZiAoaXNJbnB1dFJlcXVpcmVkKHNjaGVtYSwgJy8nICsga2V5KSkge1xuICAgICAgICAgICAgICBpbm5lckl0ZW0ub3B0aW9ucy5yZXF1aXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgIGpzZi5maWVsZHNSZXF1aXJlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdTZWN0aW9uLnB1c2goaW5uZXJJdGVtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgaWYgKGRhdGFQb2ludGVyID09PSAnJyAmJiAhZm9yUmVmTGlicmFyeSkge1xuICAgICAgICBuZXdOb2RlID0gbmV3U2VjdGlvbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld05vZGUuaXRlbXMgPSBuZXdTZWN0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBUT0RPOiBBZGQgcGF0dGVyblByb3BlcnRpZXMgYW5kIGFkZGl0aW9uYWxQcm9wZXJ0aWVzIGlucHV0cz9cbiAgICAvLyAuLi4gcG9zc2libHkgcHJvdmlkZSBhIHdheSB0byBlbnRlciBib3RoIGtleSBuYW1lcyBhbmQgdmFsdWVzP1xuICAgIC8vIGlmIChpc09iamVjdChzY2hlbWEucGF0dGVyblByb3BlcnRpZXMpKSB7IH1cbiAgICAvLyBpZiAoaXNPYmplY3Qoc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzKSkgeyB9XG5cbiAgfSBlbHNlIGlmIChuZXdOb2RlLmRhdGFUeXBlID09PSAnYXJyYXknKSB7XG4gICAgbmV3Tm9kZS5pdGVtcyA9IFtdO1xuICAgIGNvbnN0IHRlbXBsYXRlQXJyYXk6IGFueVtdID0gW107XG4gICAgbmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zID0gTWF0aC5taW4oXG4gICAgICBzY2hlbWEubWF4SXRlbXMgfHwgMTAwMCwgbmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zIHx8IDEwMDBcbiAgICApO1xuICAgIG5ld05vZGUub3B0aW9ucy5taW5JdGVtcyA9IE1hdGgubWF4KFxuICAgICAgc2NoZW1hLm1pbkl0ZW1zIHx8IDAsIG5ld05vZGUub3B0aW9ucy5taW5JdGVtcyB8fCAwXG4gICAgKTtcbiAgICBpZiAoIW5ld05vZGUub3B0aW9ucy5taW5JdGVtcyAmJiBpc0lucHV0UmVxdWlyZWQoanNmLnNjaGVtYSwgc2NoZW1hUG9pbnRlcikpIHtcbiAgICAgIG5ld05vZGUub3B0aW9ucy5taW5JdGVtcyA9IDE7XG4gICAgfVxuICAgIGlmICghaGFzT3duKG5ld05vZGUub3B0aW9ucywgJ2xpc3RJdGVtcycpKSB7IG5ld05vZGUub3B0aW9ucy5saXN0SXRlbXMgPSAxOyB9XG4gICAgbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXMgPSBpc0FycmF5KHNjaGVtYS5pdGVtcykgPyBzY2hlbWEuaXRlbXMubGVuZ3RoIDogMDtcbiAgICBpZiAobmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zIDw9IG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zKSB7XG4gICAgICBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcyA9IG5ld05vZGUub3B0aW9ucy5tYXhJdGVtcztcbiAgICAgIG5ld05vZGUub3B0aW9ucy5saXN0SXRlbXMgPSAwO1xuICAgIH0gZWxzZSBpZiAobmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zIDxcbiAgICAgIG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zICsgbmV3Tm9kZS5vcHRpb25zLmxpc3RJdGVtc1xuICAgICkge1xuICAgICAgbmV3Tm9kZS5vcHRpb25zLmxpc3RJdGVtcyA9IG5ld05vZGUub3B0aW9ucy5tYXhJdGVtcyAtIG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zO1xuICAgIH0gZWxzZSBpZiAobmV3Tm9kZS5vcHRpb25zLm1pbkl0ZW1zID5cbiAgICAgIG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zICsgbmV3Tm9kZS5vcHRpb25zLmxpc3RJdGVtc1xuICAgICkge1xuICAgICAgbmV3Tm9kZS5vcHRpb25zLmxpc3RJdGVtcyA9IG5ld05vZGUub3B0aW9ucy5taW5JdGVtcyAtIG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zO1xuICAgIH1cbiAgICBpZiAoIW5vZGVEYXRhTWFwLmhhcygnbWF4SXRlbXMnKSkge1xuICAgICAgbm9kZURhdGFNYXAuc2V0KCdtYXhJdGVtcycsIG5ld05vZGUub3B0aW9ucy5tYXhJdGVtcyk7XG4gICAgICBub2RlRGF0YU1hcC5zZXQoJ21pbkl0ZW1zJywgbmV3Tm9kZS5vcHRpb25zLm1pbkl0ZW1zKTtcbiAgICAgIG5vZGVEYXRhTWFwLnNldCgndHVwbGVJdGVtcycsIG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zKTtcbiAgICAgIG5vZGVEYXRhTWFwLnNldCgnbGlzdEl0ZW1zJywgbmV3Tm9kZS5vcHRpb25zLmxpc3RJdGVtcyk7XG4gICAgfVxuICAgIGlmICghanNmLmFycmF5TWFwLmhhcyhzaG9ydERhdGFQb2ludGVyKSkge1xuICAgICAganNmLmFycmF5TWFwLnNldChzaG9ydERhdGFQb2ludGVyLCBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcyk7XG4gICAgfVxuICAgIHJlbW92YWJsZSA9IG5ld05vZGUub3B0aW9ucy5yZW1vdmFibGUgIT09IGZhbHNlO1xuICAgIGxldCBhZGRpdGlvbmFsSXRlbXNTY2hlbWFQb2ludGVyOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgLy8gSWYgJ2l0ZW1zJyBpcyBhbiBhcnJheSA9IHR1cGxlIGl0ZW1zXG4gICAgaWYgKGlzQXJyYXkoc2NoZW1hLml0ZW1zKSkge1xuICAgICAgbmV3Tm9kZS5pdGVtcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtczsgaSsrKSB7XG4gICAgICAgIGxldCBuZXdJdGVtOiBhbnk7XG4gICAgICAgIGNvbnN0IGl0ZW1SZWZQb2ludGVyID0gcmVtb3ZlUmVjdXJzaXZlUmVmZXJlbmNlcyhcbiAgICAgICAgICBzaG9ydERhdGFQb2ludGVyICsgJy8nICsgaSwganNmLmRhdGFSZWN1cnNpdmVSZWZNYXAsIGpzZi5hcnJheU1hcFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBpdGVtUmVjdXJzaXZlID0gIWl0ZW1SZWZQb2ludGVyLmxlbmd0aCB8fFxuICAgICAgICAgIGl0ZW1SZWZQb2ludGVyICE9PSBzaG9ydERhdGFQb2ludGVyICsgJy8nICsgaTtcblxuICAgICAgICAvLyBJZiByZW1vdmFibGUsIGFkZCB0dXBsZSBpdGVtIGxheW91dCB0byBsYXlvdXRSZWZMaWJyYXJ5XG4gICAgICAgIGlmIChyZW1vdmFibGUgJiYgaSA+PSBuZXdOb2RlLm9wdGlvbnMubWluSXRlbXMpIHtcbiAgICAgICAgICBpZiAoIWhhc093bihqc2YubGF5b3V0UmVmTGlicmFyeSwgaXRlbVJlZlBvaW50ZXIpKSB7XG4gICAgICAgICAgICAvLyBTZXQgdG8gbnVsbCBmaXJzdCB0byBwcmV2ZW50IHJlY3Vyc2l2ZSByZWZlcmVuY2UgZnJvbSBjYXVzaW5nIGVuZGxlc3MgbG9vcFxuICAgICAgICAgICAganNmLmxheW91dFJlZkxpYnJhcnlbaXRlbVJlZlBvaW50ZXJdID0gbnVsbDtcbiAgICAgICAgICAgIGpzZi5sYXlvdXRSZWZMaWJyYXJ5W2l0ZW1SZWZQb2ludGVyXSA9IGJ1aWxkTGF5b3V0RnJvbVNjaGVtYShcbiAgICAgICAgICAgICAganNmLCB3aWRnZXRMaWJyYXJ5LCBpc0FycmF5KG5vZGVWYWx1ZSkgPyBub2RlVmFsdWVbaV0gOiBudWxsLFxuICAgICAgICAgICAgICBzY2hlbWFQb2ludGVyICsgJy9pdGVtcy8nICsgaSxcbiAgICAgICAgICAgICAgaXRlbVJlY3Vyc2l2ZSA/ICcnIDogZGF0YVBvaW50ZXIgKyAnLycgKyBpLFxuICAgICAgICAgICAgICB0cnVlLCAndHVwbGUnLCB0cnVlLCB0cnVlLCBpdGVtUmVjdXJzaXZlID8gZGF0YVBvaW50ZXIgKyAnLycgKyBpIDogJydcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoaXRlbVJlY3Vyc2l2ZSkge1xuICAgICAgICAgICAgICBqc2YubGF5b3V0UmVmTGlicmFyeVtpdGVtUmVmUG9pbnRlcl0ucmVjdXJzaXZlUmVmZXJlbmNlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgbmV3SXRlbSA9IGdldExheW91dE5vZGUoe1xuICAgICAgICAgICAgJHJlZjogaXRlbVJlZlBvaW50ZXIsXG4gICAgICAgICAgICBkYXRhUG9pbnRlcjogZGF0YVBvaW50ZXIgKyAnLycgKyBpLFxuICAgICAgICAgICAgcmVjdXJzaXZlUmVmZXJlbmNlOiBpdGVtUmVjdXJzaXZlLFxuICAgICAgICAgIH0sIGpzZiwgd2lkZ2V0TGlicmFyeSwgaXNBcnJheShub2RlVmFsdWUpID8gbm9kZVZhbHVlW2ldIDogbnVsbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3SXRlbSA9IGJ1aWxkTGF5b3V0RnJvbVNjaGVtYShcbiAgICAgICAgICAgIGpzZiwgd2lkZ2V0TGlicmFyeSwgaXNBcnJheShub2RlVmFsdWUpID8gbm9kZVZhbHVlW2ldIDogbnVsbCxcbiAgICAgICAgICAgIHNjaGVtYVBvaW50ZXIgKyAnL2l0ZW1zLycgKyBpLFxuICAgICAgICAgICAgZGF0YVBvaW50ZXIgKyAnLycgKyBpLFxuICAgICAgICAgICAgdHJ1ZSwgJ3R1cGxlJywgZmFsc2UsIGZvclJlZkxpYnJhcnksIGRhdGFQb2ludGVyUHJlZml4XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3SXRlbSkgeyBuZXdOb2RlLml0ZW1zLnB1c2gobmV3SXRlbSk7IH1cbiAgICAgIH1cblxuICAgICAgLy8gSWYgJ2FkZGl0aW9uYWxJdGVtcycgaXMgYW4gb2JqZWN0ID0gYWRkaXRpb25hbCBsaXN0IGl0ZW1zLCBhZnRlciB0dXBsZSBpdGVtc1xuICAgICAgaWYgKGlzT2JqZWN0KHNjaGVtYS5hZGRpdGlvbmFsSXRlbXMpKSB7XG4gICAgICAgIGFkZGl0aW9uYWxJdGVtc1NjaGVtYVBvaW50ZXIgPSBzY2hlbWFQb2ludGVyICsgJy9hZGRpdGlvbmFsSXRlbXMnO1xuICAgICAgfVxuXG4gICAgLy8gSWYgJ2l0ZW1zJyBpcyBhbiBvYmplY3QgPSBsaXN0IGl0ZW1zIG9ubHkgKG5vIHR1cGxlIGl0ZW1zKVxuICAgIH0gZWxzZSBpZiAoaXNPYmplY3Qoc2NoZW1hLml0ZW1zKSkge1xuICAgICAgYWRkaXRpb25hbEl0ZW1zU2NoZW1hUG9pbnRlciA9IHNjaGVtYVBvaW50ZXIgKyAnL2l0ZW1zJztcbiAgICB9XG5cbiAgICBpZiAoYWRkaXRpb25hbEl0ZW1zU2NoZW1hUG9pbnRlcikge1xuICAgICAgY29uc3QgaXRlbVJlZlBvaW50ZXIgPSByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzKFxuICAgICAgICBzaG9ydERhdGFQb2ludGVyICsgJy8tJywganNmLmRhdGFSZWN1cnNpdmVSZWZNYXAsIGpzZi5hcnJheU1hcFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGl0ZW1SZWN1cnNpdmUgPSAhaXRlbVJlZlBvaW50ZXIubGVuZ3RoIHx8XG4gICAgICAgIGl0ZW1SZWZQb2ludGVyICE9PSBzaG9ydERhdGFQb2ludGVyICsgJy8tJztcbiAgICAgIGNvbnN0IGl0ZW1TY2hlbWFQb2ludGVyID0gcmVtb3ZlUmVjdXJzaXZlUmVmZXJlbmNlcyhcbiAgICAgICAgYWRkaXRpb25hbEl0ZW1zU2NoZW1hUG9pbnRlciwganNmLnNjaGVtYVJlY3Vyc2l2ZVJlZk1hcCwganNmLmFycmF5TWFwXG4gICAgICApO1xuICAgICAgLy8gQWRkIGxpc3QgaXRlbSBsYXlvdXQgdG8gbGF5b3V0UmVmTGlicmFyeVxuICAgICAgaWYgKGl0ZW1SZWZQb2ludGVyLmxlbmd0aCAmJiAhaGFzT3duKGpzZi5sYXlvdXRSZWZMaWJyYXJ5LCBpdGVtUmVmUG9pbnRlcikpIHtcbiAgICAgICAgLy8gU2V0IHRvIG51bGwgZmlyc3QgdG8gcHJldmVudCByZWN1cnNpdmUgcmVmZXJlbmNlIGZyb20gY2F1c2luZyBlbmRsZXNzIGxvb3BcbiAgICAgICAganNmLmxheW91dFJlZkxpYnJhcnlbaXRlbVJlZlBvaW50ZXJdID0gbnVsbDtcbiAgICAgICAganNmLmxheW91dFJlZkxpYnJhcnlbaXRlbVJlZlBvaW50ZXJdID0gYnVpbGRMYXlvdXRGcm9tU2NoZW1hKFxuICAgICAgICAgIGpzZiwgd2lkZ2V0TGlicmFyeSwgbnVsbCxcbiAgICAgICAgICBpdGVtU2NoZW1hUG9pbnRlcixcbiAgICAgICAgICBpdGVtUmVjdXJzaXZlID8gJycgOiBkYXRhUG9pbnRlciArICcvLScsXG4gICAgICAgICAgdHJ1ZSwgJ2xpc3QnLCByZW1vdmFibGUsIHRydWUsIGl0ZW1SZWN1cnNpdmUgPyBkYXRhUG9pbnRlciArICcvLScgOiAnJ1xuICAgICAgICApO1xuICAgICAgICBpZiAoaXRlbVJlY3Vyc2l2ZSkge1xuICAgICAgICAgIGpzZi5sYXlvdXRSZWZMaWJyYXJ5W2l0ZW1SZWZQb2ludGVyXS5yZWN1cnNpdmVSZWZlcmVuY2UgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCBhbnkgYWRkaXRpb25hbCBkZWZhdWx0IGl0ZW1zXG4gICAgICBpZiAoIWl0ZW1SZWN1cnNpdmUgfHwgbmV3Tm9kZS5vcHRpb25zLnJlcXVpcmVkKSB7XG4gICAgICAgIGNvbnN0IGFycmF5TGVuZ3RoID0gTWF0aC5taW4oTWF0aC5tYXgoXG4gICAgICAgICAgaXRlbVJlY3Vyc2l2ZSA/IDAgOlxuICAgICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXMgKyBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zLFxuICAgICAgICAgIGlzQXJyYXkobm9kZVZhbHVlKSA/IG5vZGVWYWx1ZS5sZW5ndGggOiAwXG4gICAgICAgICksIG5ld05vZGUub3B0aW9ucy5tYXhJdGVtcyk7XG4gICAgICAgIGlmIChuZXdOb2RlLml0ZW1zLmxlbmd0aCA8IGFycmF5TGVuZ3RoKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IG5ld05vZGUuaXRlbXMubGVuZ3RoOyBpIDwgYXJyYXlMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbmV3Tm9kZS5pdGVtcy5wdXNoKGdldExheW91dE5vZGUoe1xuICAgICAgICAgICAgICAkcmVmOiBpdGVtUmVmUG9pbnRlcixcbiAgICAgICAgICAgICAgZGF0YVBvaW50ZXI6IGRhdGFQb2ludGVyICsgJy8tJyxcbiAgICAgICAgICAgICAgcmVjdXJzaXZlUmVmZXJlbmNlOiBpdGVtUmVjdXJzaXZlLFxuICAgICAgICAgICAgfSwganNmLCB3aWRnZXRMaWJyYXJ5LCBpc0FycmF5KG5vZGVWYWx1ZSkgPyBub2RlVmFsdWVbaV0gOiBudWxsKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIElmIG5lZWRlZCwgYWRkIGJ1dHRvbiB0byBhZGQgaXRlbXMgdG8gYXJyYXlcbiAgICAgIGlmIChuZXdOb2RlLm9wdGlvbnMuYWRkYWJsZSAhPT0gZmFsc2UgJiZcbiAgICAgICAgbmV3Tm9kZS5vcHRpb25zLm1pbkl0ZW1zIDwgbmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zICYmXG4gICAgICAgIChuZXdOb2RlLml0ZW1zW25ld05vZGUuaXRlbXMubGVuZ3RoIC0gMV0gfHwge30pLnR5cGUgIT09ICckcmVmJ1xuICAgICAgKSB7XG4gICAgICAgIGxldCBidXR0b25UZXh0ID1cbiAgICAgICAgICAoKGpzZi5sYXlvdXRSZWZMaWJyYXJ5W2l0ZW1SZWZQb2ludGVyXSB8fCB7fSkub3B0aW9ucyB8fCB7fSkudGl0bGU7XG4gICAgICAgIGNvbnN0IHByZWZpeCA9IGJ1dHRvblRleHQgPyAnQWRkICcgOiAnQWRkIHRvICc7XG4gICAgICAgIGlmICghYnV0dG9uVGV4dCkge1xuICAgICAgICAgIGJ1dHRvblRleHQgPSBzY2hlbWEudGl0bGUgfHwgZml4VGl0bGUoSnNvblBvaW50ZXIudG9LZXkoZGF0YVBvaW50ZXIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIS9eYWRkXFxiL2kudGVzdChidXR0b25UZXh0KSkgeyBidXR0b25UZXh0ID0gcHJlZml4ICsgYnV0dG9uVGV4dDsgfVxuICAgICAgICBuZXdOb2RlLml0ZW1zLnB1c2goe1xuICAgICAgICAgIF9pZDogXy51bmlxdWVJZCgpLFxuICAgICAgICAgIGFycmF5SXRlbTogdHJ1ZSxcbiAgICAgICAgICBhcnJheUl0ZW1UeXBlOiAnbGlzdCcsXG4gICAgICAgICAgZGF0YVBvaW50ZXI6IG5ld05vZGUuZGF0YVBvaW50ZXIgKyAnLy0nLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGxpc3RJdGVtczogbmV3Tm9kZS5vcHRpb25zLmxpc3RJdGVtcyxcbiAgICAgICAgICAgIG1heEl0ZW1zOiBuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXMsXG4gICAgICAgICAgICBtaW5JdGVtczogbmV3Tm9kZS5vcHRpb25zLm1pbkl0ZW1zLFxuICAgICAgICAgICAgcmVtb3ZhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHRpdGxlOiBidXR0b25UZXh0LFxuICAgICAgICAgICAgdHVwbGVJdGVtczogbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXMsXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZWN1cnNpdmVSZWZlcmVuY2U6IGl0ZW1SZWN1cnNpdmUsXG4gICAgICAgICAgdHlwZTogJyRyZWYnLFxuICAgICAgICAgIHdpZGdldDogd2lkZ2V0TGlicmFyeS5nZXRXaWRnZXQoJyRyZWYnKSxcbiAgICAgICAgICAkcmVmOiBpdGVtUmVmUG9pbnRlcixcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gIH0gZWxzZSBpZiAobmV3Tm9kZS5kYXRhVHlwZSA9PT0gJyRyZWYnKSB7XG4gICAgY29uc3Qgc2NoZW1hUmVmID0gSnNvblBvaW50ZXIuY29tcGlsZShzY2hlbWEuJHJlZik7XG4gICAgY29uc3QgZGF0YVJlZiA9IEpzb25Qb2ludGVyLnRvRGF0YVBvaW50ZXIoc2NoZW1hUmVmLCBqc2Yuc2NoZW1hKTtcbiAgICBsZXQgYnV0dG9uVGV4dCA9ICcnO1xuXG4gICAgLy8gR2V0IG5ld05vZGUgdGl0bGVcbiAgICBpZiAobmV3Tm9kZS5vcHRpb25zLmFkZCkge1xuICAgICAgYnV0dG9uVGV4dCA9IG5ld05vZGUub3B0aW9ucy5hZGQ7XG4gICAgfSBlbHNlIGlmIChuZXdOb2RlLm5hbWUgJiYgIS9eXFxkKyQvLnRlc3QobmV3Tm9kZS5uYW1lKSkge1xuICAgICAgYnV0dG9uVGV4dCA9XG4gICAgICAgICgvXmFkZFxcYi9pLnRlc3QobmV3Tm9kZS5uYW1lKSA/ICcnIDogJ0FkZCAnKSArIGZpeFRpdGxlKG5ld05vZGUubmFtZSk7XG5cbiAgICAvLyBJZiBuZXdOb2RlIGRvZXNuJ3QgaGF2ZSBhIHRpdGxlLCBsb29rIGZvciB0aXRsZSBvZiBwYXJlbnQgYXJyYXkgaXRlbVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwYXJlbnRTY2hlbWEgPVxuICAgICAgICBKc29uUG9pbnRlci5nZXQoanNmLnNjaGVtYSwgc2NoZW1hUG9pbnRlciwgMCwgLTEpO1xuICAgICAgaWYgKGhhc093bihwYXJlbnRTY2hlbWEsICd0aXRsZScpKSB7XG4gICAgICAgIGJ1dHRvblRleHQgPSAnQWRkIHRvICcgKyBwYXJlbnRTY2hlbWEudGl0bGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwb2ludGVyQXJyYXkgPSBKc29uUG9pbnRlci5wYXJzZShuZXdOb2RlLmRhdGFQb2ludGVyKTtcbiAgICAgICAgYnV0dG9uVGV4dCA9ICdBZGQgdG8gJyArIGZpeFRpdGxlKHBvaW50ZXJBcnJheVtwb2ludGVyQXJyYXkubGVuZ3RoIC0gMl0pO1xuICAgICAgfVxuICAgIH1cbiAgICBPYmplY3QuYXNzaWduKG5ld05vZGUsIHtcbiAgICAgIHJlY3Vyc2l2ZVJlZmVyZW5jZTogdHJ1ZSxcbiAgICAgIHdpZGdldDogd2lkZ2V0TGlicmFyeS5nZXRXaWRnZXQoJyRyZWYnKSxcbiAgICAgICRyZWY6IGRhdGFSZWYsXG4gICAgfSk7XG4gICAgT2JqZWN0LmFzc2lnbihuZXdOb2RlLm9wdGlvbnMsIHtcbiAgICAgIHJlbW92YWJsZTogZmFsc2UsXG4gICAgICB0aXRsZTogYnV0dG9uVGV4dCxcbiAgICB9KTtcbiAgICBpZiAoaXNOdW1iZXIoSnNvblBvaW50ZXIuZ2V0KGpzZi5zY2hlbWEsIHNjaGVtYVBvaW50ZXIsIDAsIC0xKS5tYXhJdGVtcykpIHtcbiAgICAgIG5ld05vZGUub3B0aW9ucy5tYXhJdGVtcyA9XG4gICAgICAgIEpzb25Qb2ludGVyLmdldChqc2Yuc2NoZW1hLCBzY2hlbWFQb2ludGVyLCAwLCAtMSkubWF4SXRlbXM7XG4gICAgfVxuXG4gICAgLy8gQWRkIGxheW91dCB0ZW1wbGF0ZSB0byBsYXlvdXRSZWZMaWJyYXJ5XG4gICAgaWYgKGRhdGFSZWYubGVuZ3RoKSB7XG4gICAgICBpZiAoIWhhc093bihqc2YubGF5b3V0UmVmTGlicmFyeSwgZGF0YVJlZikpIHtcbiAgICAgICAgLy8gU2V0IHRvIG51bGwgZmlyc3QgdG8gcHJldmVudCByZWN1cnNpdmUgcmVmZXJlbmNlIGZyb20gY2F1c2luZyBlbmRsZXNzIGxvb3BcbiAgICAgICAganNmLmxheW91dFJlZkxpYnJhcnlbZGF0YVJlZl0gPSBudWxsO1xuICAgICAgICBjb25zdCBuZXdMYXlvdXQgPSBidWlsZExheW91dEZyb21TY2hlbWEoXG4gICAgICAgICAganNmLCB3aWRnZXRMaWJyYXJ5LCBudWxsLCBzY2hlbWFSZWYsICcnLFxuICAgICAgICAgIG5ld05vZGUuYXJyYXlJdGVtLCBuZXdOb2RlLmFycmF5SXRlbVR5cGUsIHRydWUsIHRydWUsIGRhdGFQb2ludGVyXG4gICAgICAgICk7XG4gICAgICAgIGlmIChuZXdMYXlvdXQpIHtcbiAgICAgICAgICBuZXdMYXlvdXQucmVjdXJzaXZlUmVmZXJlbmNlID0gdHJ1ZTtcbiAgICAgICAgICBqc2YubGF5b3V0UmVmTGlicmFyeVtkYXRhUmVmXSA9IG5ld0xheW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGUganNmLmxheW91dFJlZkxpYnJhcnlbZGF0YVJlZl07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIWpzZi5sYXlvdXRSZWZMaWJyYXJ5W2RhdGFSZWZdLnJlY3Vyc2l2ZVJlZmVyZW5jZSkge1xuICAgICAgICBqc2YubGF5b3V0UmVmTGlicmFyeVtkYXRhUmVmXS5yZWN1cnNpdmVSZWZlcmVuY2UgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3Tm9kZTtcbn1cblxuLyoqXG4gKiAnbWFwTGF5b3V0JyBmdW5jdGlvblxuICpcbiAqIENyZWF0ZXMgYSBuZXcgbGF5b3V0IGJ5IHJ1bm5pbmcgZWFjaCBlbGVtZW50IGluIGFuIGV4aXN0aW5nIGxheW91dCB0aHJvdWdoXG4gKiBhbiBpdGVyYXRlZS4gUmVjdXJzaXZlbHkgbWFwcyB3aXRoaW4gYXJyYXkgZWxlbWVudHMgJ2l0ZW1zJyBhbmQgJ3RhYnMnLlxuICogVGhlIGl0ZXJhdGVlIGlzIGludm9rZWQgd2l0aCBmb3VyIGFyZ3VtZW50czogKHZhbHVlLCBpbmRleCwgbGF5b3V0LCBwYXRoKVxuICpcbiAqIFRoZSByZXR1cm5lZCBsYXlvdXQgbWF5IGJlIGxvbmdlciAob3Igc2hvcnRlcikgdGhlbiB0aGUgc291cmNlIGxheW91dC5cbiAqXG4gKiBJZiBhbiBpdGVtIGZyb20gdGhlIHNvdXJjZSBsYXlvdXQgcmV0dXJucyBtdWx0aXBsZSBpdGVtcyAoYXMgJyonIHVzdWFsbHkgd2lsbCksXG4gKiB0aGlzIGZ1bmN0aW9uIHdpbGwga2VlcCBhbGwgcmV0dXJuZWQgaXRlbXMgaW4tbGluZSB3aXRoIHRoZSBzdXJyb3VuZGluZyBpdGVtcy5cbiAqXG4gKiBJZiBhbiBpdGVtIGZyb20gdGhlIHNvdXJjZSBsYXlvdXQgY2F1c2VzIGFuIGVycm9yIGFuZCByZXR1cm5zIG51bGwsIGl0IGlzXG4gKiBza2lwcGVkIHdpdGhvdXQgZXJyb3IsIGFuZCB0aGUgZnVuY3Rpb24gd2lsbCBzdGlsbCByZXR1cm4gYWxsIG5vbi1udWxsIGl0ZW1zLlxuICpcbiAqIEBwYXJhbSAgeyBhbnlbXSB9IGxheW91dCAtIHRoZSBsYXlvdXQgdG8gbWFwXG4gKiBAcGFyYW0gIHsgKHY6IGFueSwgaT86IG51bWJlciwgbD86IGFueSwgcD86IHN0cmluZykgPT4gYW55IH1cbiAqICAgZnVuY3Rpb24gLSB0aGUgZnVuY2l0b24gdG8gaW52b2tlIG9uIGVhY2ggZWxlbWVudFxuICogQHBhcmFtICB7IHN0cmluZ3xzdHJpbmdbXSA9ICcnIH0gbGF5b3V0UG9pbnRlciAtIHRoZSBsYXlvdXRQb2ludGVyIHRvIGxheW91dCwgaW5zaWRlIHJvb3RMYXlvdXRcbiAqIEBwYXJhbSAgeyBhbnlbXSA9IGxheW91dCB9IHJvb3RMYXlvdXQgLSB0aGUgcm9vdCBsYXlvdXQsIHdoaWNoIGNvbmF0aW5zIGxheW91dFxuICogQHJldHVybiB7IGFueVtdIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcExheW91dChsYXlvdXQsIGZuLCBsYXlvdXRQb2ludGVyID0gJycsIHJvb3RMYXlvdXQgPSBsYXlvdXQpIHtcbiAgbGV0IGluZGV4UGFkID0gMDtcbiAgbGV0IG5ld0xheW91dDogYW55W10gPSBbXTtcbiAgZm9yRWFjaChsYXlvdXQsIChpdGVtLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHJlYWxJbmRleCA9ICtpbmRleCArIGluZGV4UGFkO1xuICAgIGNvbnN0IG5ld0xheW91dFBvaW50ZXIgPSBsYXlvdXRQb2ludGVyICsgJy8nICsgcmVhbEluZGV4O1xuICAgIGxldCBuZXdOb2RlOiBhbnkgPSBjb3B5KGl0ZW0pO1xuICAgIGxldCBpdGVtc0FycmF5OiBhbnlbXSA9IFtdO1xuICAgIGlmIChpc09iamVjdChpdGVtKSkge1xuICAgICAgaWYgKGhhc093bihpdGVtLCAndGFicycpKSB7XG4gICAgICAgIGl0ZW0uaXRlbXMgPSBpdGVtLnRhYnM7XG4gICAgICAgIGRlbGV0ZSBpdGVtLnRhYnM7XG4gICAgICB9XG4gICAgICBpZiAoaGFzT3duKGl0ZW0sICdpdGVtcycpKSB7XG4gICAgICAgIGl0ZW1zQXJyYXkgPSBpc0FycmF5KGl0ZW0uaXRlbXMpID8gaXRlbS5pdGVtcyA6IFtpdGVtLml0ZW1zXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGl0ZW1zQXJyYXkubGVuZ3RoKSB7XG4gICAgICBuZXdOb2RlLml0ZW1zID0gbWFwTGF5b3V0KGl0ZW1zQXJyYXksIGZuLCBuZXdMYXlvdXRQb2ludGVyICsgJy9pdGVtcycsIHJvb3RMYXlvdXQpO1xuICAgIH1cbiAgICBuZXdOb2RlID0gZm4obmV3Tm9kZSwgcmVhbEluZGV4LCBuZXdMYXlvdXRQb2ludGVyLCByb290TGF5b3V0KTtcbiAgICBpZiAoIWlzRGVmaW5lZChuZXdOb2RlKSkge1xuICAgICAgaW5kZXhQYWQtLTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGlzQXJyYXkobmV3Tm9kZSkpIHsgaW5kZXhQYWQgKz0gbmV3Tm9kZS5sZW5ndGggLSAxOyB9XG4gICAgICBuZXdMYXlvdXQgPSBuZXdMYXlvdXQuY29uY2F0KG5ld05vZGUpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBuZXdMYXlvdXQ7XG59XG5cbi8qKlxuICogJ2dldExheW91dE5vZGUnIGZ1bmN0aW9uXG4gKiBDb3B5IGEgbmV3IGxheW91dE5vZGUgZnJvbSBsYXlvdXRSZWZMaWJyYXJ5XG4gKlxuICogQHBhcmFtICB7IGFueSB9IHJlZk5vZGUgLVxuICogQHBhcmFtICB7IGFueSB9IGxheW91dFJlZkxpYnJhcnkgLVxuICogQHBhcmFtICB7IGFueSA9IG51bGwgfSB3aWRnZXRMaWJyYXJ5IC1cbiAqIEBwYXJhbSAgeyBhbnkgPSBudWxsIH0gbm9kZVZhbHVlIC1cbiAqIEByZXR1cm4geyBhbnkgfSBjb3BpZWQgbGF5b3V0Tm9kZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGF5b3V0Tm9kZShcbiAgcmVmTm9kZSwganNmLCB3aWRnZXRMaWJyYXJ5OiBhbnkgPSBudWxsLCBub2RlVmFsdWU6IGFueSA9IG51bGxcbikge1xuXG4gIC8vIElmIHJlY3Vyc2l2ZSByZWZlcmVuY2UgYW5kIGJ1aWxkaW5nIGluaXRpYWwgbGF5b3V0LCByZXR1cm4gQWRkIGJ1dHRvblxuICBpZiAocmVmTm9kZS5yZWN1cnNpdmVSZWZlcmVuY2UgJiYgd2lkZ2V0TGlicmFyeSkge1xuICAgIGNvbnN0IG5ld0xheW91dE5vZGUgPSBfLmNsb25lRGVlcChyZWZOb2RlKTtcbiAgICBpZiAoIW5ld0xheW91dE5vZGUub3B0aW9ucykgeyBuZXdMYXlvdXROb2RlLm9wdGlvbnMgPSB7fTsgfVxuICAgIE9iamVjdC5hc3NpZ24obmV3TGF5b3V0Tm9kZSwge1xuICAgICAgcmVjdXJzaXZlUmVmZXJlbmNlOiB0cnVlLFxuICAgICAgd2lkZ2V0OiB3aWRnZXRMaWJyYXJ5LmdldFdpZGdldCgnJHJlZicpLFxuICAgIH0pO1xuICAgIE9iamVjdC5hc3NpZ24obmV3TGF5b3V0Tm9kZS5vcHRpb25zLCB7XG4gICAgICByZW1vdmFibGU6IGZhbHNlLFxuICAgICAgdGl0bGU6ICdBZGQgJyArIG5ld0xheW91dE5vZGUuJHJlZixcbiAgICB9KTtcbiAgICByZXR1cm4gbmV3TGF5b3V0Tm9kZTtcblxuICAvLyBPdGhlcndpc2UsIHJldHVybiByZWZlcmVuY2VkIGxheW91dFxufSBlbHNlIHtcbiAgICBsZXQgbmV3TGF5b3V0Tm9kZSA9IGpzZi5sYXlvdXRSZWZMaWJyYXJ5W3JlZk5vZGUuJHJlZl07XG4gICAgLy8gSWYgdmFsdWUgZGVmaW5lZCwgYnVpbGQgbmV3IG5vZGUgZnJvbSBzY2hlbWEgKHRvIHNldCBhcnJheSBsZW5ndGhzKVxuICAgIGlmIChpc0RlZmluZWQobm9kZVZhbHVlKSkge1xuICAgICAgbmV3TGF5b3V0Tm9kZSA9IGJ1aWxkTGF5b3V0RnJvbVNjaGVtYShcbiAgICAgICAganNmLCB3aWRnZXRMaWJyYXJ5LCBub2RlVmFsdWUsXG4gICAgICAgIEpzb25Qb2ludGVyLnRvU2NoZW1hUG9pbnRlcihyZWZOb2RlLiRyZWYsIGpzZi5zY2hlbWEpLFxuICAgICAgICByZWZOb2RlLiRyZWYsIG5ld0xheW91dE5vZGUuYXJyYXlJdGVtLFxuICAgICAgICBuZXdMYXlvdXROb2RlLmFycmF5SXRlbVR5cGUsIG5ld0xheW91dE5vZGUub3B0aW9ucy5yZW1vdmFibGUsIGZhbHNlXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiB2YWx1ZSBub3QgZGVmaW5lZCwgY29weSBub2RlIGZyb20gbGF5b3V0UmVmTGlicmFyeVxuICAgICAgbmV3TGF5b3V0Tm9kZSA9IF8uY2xvbmVEZWVwKG5ld0xheW91dE5vZGUpO1xuICAgICAgSnNvblBvaW50ZXIuZm9yRWFjaERlZXAobmV3TGF5b3V0Tm9kZSwgKHN1Yk5vZGUsIHBvaW50ZXIpID0+IHtcblxuICAgICAgICAvLyBSZXNldCBhbGwgX2lkJ3MgaW4gbmV3TGF5b3V0Tm9kZSB0byB1bmlxdWUgdmFsdWVzXG4gICAgICAgIGlmIChoYXNPd24oc3ViTm9kZSwgJ19pZCcpKSB7IHN1Yk5vZGUuX2lkID0gXy51bmlxdWVJZCgpOyB9XG5cbiAgICAgICAgLy8gSWYgYWRkaW5nIGEgcmVjdXJzaXZlIGl0ZW0sIHByZWZpeCBjdXJyZW50IGRhdGFQb2ludGVyXG4gICAgICAgIC8vIHRvIGFsbCBkYXRhUG9pbnRlcnMgaW4gbmV3IGxheW91dE5vZGVcbiAgICAgICAgaWYgKHJlZk5vZGUucmVjdXJzaXZlUmVmZXJlbmNlICYmIGhhc093bihzdWJOb2RlLCAnZGF0YVBvaW50ZXInKSkge1xuICAgICAgICAgIHN1Yk5vZGUuZGF0YVBvaW50ZXIgPSByZWZOb2RlLmRhdGFQb2ludGVyICsgc3ViTm9kZS5kYXRhUG9pbnRlcjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBuZXdMYXlvdXROb2RlO1xuICB9XG59XG5cbi8qKlxuICogJ2J1aWxkVGl0bGVNYXAnIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtICB7IGFueSB9IHRpdGxlTWFwIC1cbiAqIEBwYXJhbSAgeyBhbnkgfSBlbnVtTGlzdCAtXG4gKiBAcGFyYW0gIHsgYm9vbGVhbiA9IHRydWUgfSBmaWVsZFJlcXVpcmVkIC1cbiAqIEBwYXJhbSAgeyBib29sZWFuID0gdHJ1ZSB9IGZsYXRMaXN0IC1cbiAqIEByZXR1cm4geyBUaXRsZU1hcEl0ZW1bXSB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFRpdGxlTWFwKFxuICB0aXRsZU1hcCwgZW51bUxpc3QsIGZpZWxkUmVxdWlyZWQgPSB0cnVlLCBmbGF0TGlzdCA9IHRydWVcbikge1xuICBsZXQgbmV3VGl0bGVNYXA6IFRpdGxlTWFwSXRlbVtdID0gW107XG4gIGxldCBoYXNFbXB0eVZhbHVlID0gZmFsc2U7XG4gIGlmICh0aXRsZU1hcCkge1xuICAgIGlmIChpc0FycmF5KHRpdGxlTWFwKSkge1xuICAgICAgaWYgKGVudW1MaXN0KSB7XG4gICAgICAgIGZvciAoY29uc3QgaSBvZiBPYmplY3Qua2V5cyh0aXRsZU1hcCkpIHtcbiAgICAgICAgICBpZiAoaXNPYmplY3QodGl0bGVNYXBbaV0pKSB7IC8vIEpTT04gRm9ybSBzdHlsZVxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aXRsZU1hcFtpXS52YWx1ZTtcbiAgICAgICAgICAgIGlmIChlbnVtTGlzdC5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IHRpdGxlTWFwW2ldLm5hbWU7XG4gICAgICAgICAgICAgIG5ld1RpdGxlTWFwLnB1c2goeyBuYW1lLCB2YWx1ZSB9KTtcbiAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHsgaGFzRW1wdHlWYWx1ZSA9IHRydWU7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKHRpdGxlTWFwW2ldKSkgeyAvLyBSZWFjdCBKc29uc2NoZW1hIEZvcm0gc3R5bGVcbiAgICAgICAgICAgIGlmIChpIDwgZW51bUxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSB0aXRsZU1hcFtpXTtcbiAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBlbnVtTGlzdFtpXTtcbiAgICAgICAgICAgICAgbmV3VGl0bGVNYXAucHVzaCh7IG5hbWUsIHZhbHVlIH0pO1xuICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkgeyBoYXNFbXB0eVZhbHVlID0gdHJ1ZTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHsgLy8gSWYgYXJyYXkgdGl0bGVNYXAgYW5kIG5vIGVudW0gbGlzdCwganVzdCByZXR1cm4gdGhlIHRpdGxlTWFwIC0gQW5ndWxhciBTY2hlbWEgRm9ybSBzdHlsZVxuICAgICAgICBuZXdUaXRsZU1hcCA9IHRpdGxlTWFwO1xuICAgICAgICBpZiAoIWZpZWxkUmVxdWlyZWQpIHtcbiAgICAgICAgICBoYXNFbXB0eVZhbHVlID0gISFuZXdUaXRsZU1hcFxuICAgICAgICAgICAgLmZpbHRlcihpID0+IGkudmFsdWUgPT09IHVuZGVmaW5lZCB8fCBpLnZhbHVlID09PSBudWxsKVxuICAgICAgICAgICAgLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZW51bUxpc3QpIHsgLy8gQWx0ZXJuYXRlIEpTT04gRm9ybSBzdHlsZSwgd2l0aCBlbnVtIGxpc3RcbiAgICAgIGZvciAoY29uc3QgaSBvZiBPYmplY3Qua2V5cyhlbnVtTGlzdCkpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBlbnVtTGlzdFtpXTtcbiAgICAgICAgaWYgKGhhc093bih0aXRsZU1hcCwgdmFsdWUpKSB7XG4gICAgICAgICAgY29uc3QgbmFtZSA9IHRpdGxlTWFwW3ZhbHVlXTtcbiAgICAgICAgICBuZXdUaXRsZU1hcC5wdXNoKHsgbmFtZSwgdmFsdWUgfSk7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHsgaGFzRW1wdHlWYWx1ZSA9IHRydWU7IH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7IC8vIEFsdGVybmF0ZSBKU09OIEZvcm0gc3R5bGUsIHdpdGhvdXQgZW51bSBsaXN0XG4gICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIE9iamVjdC5rZXlzKHRpdGxlTWFwKSkge1xuICAgICAgICBjb25zdCBuYW1lID0gdGl0bGVNYXBbdmFsdWVdO1xuICAgICAgICBuZXdUaXRsZU1hcC5wdXNoKHsgbmFtZSwgdmFsdWUgfSk7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7IGhhc0VtcHR5VmFsdWUgPSB0cnVlOyB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGVudW1MaXN0KSB7IC8vIEJ1aWxkIG1hcCBmcm9tIGVudW0gbGlzdCBhbG9uZVxuICAgIGZvciAoY29uc3QgaSBvZiBPYmplY3Qua2V5cyhlbnVtTGlzdCkpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBlbnVtTGlzdFtpXTtcbiAgICAgIGNvbnN0IHZhbHVlID0gZW51bUxpc3RbaV07XG4gICAgICBuZXdUaXRsZU1hcC5wdXNoKHsgbmFtZSwgdmFsdWV9KTtcbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7IGhhc0VtcHR5VmFsdWUgPSB0cnVlOyB9XG4gICAgfVxuICB9IGVsc2UgeyAvLyBJZiBubyB0aXRsZU1hcCBhbmQgbm8gZW51bSBsaXN0LCByZXR1cm4gZGVmYXVsdCBtYXAgb2YgYm9vbGVhbiB2YWx1ZXNcbiAgICBuZXdUaXRsZU1hcCA9IFsgeyBuYW1lOiAnVHJ1ZScsIHZhbHVlOiB0cnVlIH0sIHsgbmFtZTogJ0ZhbHNlJywgdmFsdWU6IGZhbHNlIH0gXTtcbiAgfVxuXG4gIC8vIERvZXMgdGl0bGVNYXAgaGF2ZSBncm91cHM/XG4gIGlmIChuZXdUaXRsZU1hcC5zb21lKHRpdGxlID0+IGhhc093bih0aXRsZSwgJ2dyb3VwJykpKSB7XG4gICAgaGFzRW1wdHlWYWx1ZSA9IGZhbHNlO1xuXG4gICAgLy8gSWYgZmxhdExpc3QgPSB0cnVlLCBmbGF0dGVuIGl0ZW1zICYgdXBkYXRlIG5hbWUgdG8gZ3JvdXA6IG5hbWVcbiAgICBpZiAoZmxhdExpc3QpIHtcbiAgICAgIG5ld1RpdGxlTWFwID0gbmV3VGl0bGVNYXAucmVkdWNlKChncm91cFRpdGxlTWFwLCB0aXRsZSkgPT4ge1xuICAgICAgICBpZiAoaGFzT3duKHRpdGxlLCAnZ3JvdXAnKSkge1xuICAgICAgICAgIGlmIChpc0FycmF5KHRpdGxlLml0ZW1zKSkge1xuICAgICAgICAgICAgZ3JvdXBUaXRsZU1hcCA9IFtcbiAgICAgICAgICAgICAgLi4uZ3JvdXBUaXRsZU1hcCxcbiAgICAgICAgICAgICAgLi4udGl0bGUuaXRlbXMubWFwKGl0ZW0gPT5cbiAgICAgICAgICAgICAgICAoeyAuLi5pdGVtLCAuLi57IG5hbWU6IGAke3RpdGxlLmdyb3VwfTogJHtpdGVtLm5hbWV9YCB9IH0pXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAodGl0bGUuaXRlbXMuc29tZShpdGVtID0+IGl0ZW0udmFsdWUgPT09IHVuZGVmaW5lZCB8fCBpdGVtLnZhbHVlID09PSBudWxsKSkge1xuICAgICAgICAgICAgICBoYXNFbXB0eVZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGhhc093bih0aXRsZSwgJ25hbWUnKSAmJiBoYXNPd24odGl0bGUsICd2YWx1ZScpKSB7XG4gICAgICAgICAgICB0aXRsZS5uYW1lID0gYCR7dGl0bGUuZ3JvdXB9OiAke3RpdGxlLm5hbWV9YDtcbiAgICAgICAgICAgIGRlbGV0ZSB0aXRsZS5ncm91cDtcbiAgICAgICAgICAgIGdyb3VwVGl0bGVNYXAucHVzaCh0aXRsZSk7XG4gICAgICAgICAgICBpZiAodGl0bGUudmFsdWUgPT09IHVuZGVmaW5lZCB8fCB0aXRsZS52YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICBoYXNFbXB0eVZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ3JvdXBUaXRsZU1hcC5wdXNoKHRpdGxlKTtcbiAgICAgICAgICBpZiAodGl0bGUudmFsdWUgPT09IHVuZGVmaW5lZCB8fCB0aXRsZS52YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaGFzRW1wdHlWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBncm91cFRpdGxlTWFwO1xuICAgICAgfSwgW10pO1xuXG4gICAgLy8gSWYgZmxhdExpc3QgPSBmYWxzZSwgY29tYmluZSBpdGVtcyBmcm9tIG1hdGNoaW5nIGdyb3Vwc1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdUaXRsZU1hcCA9IG5ld1RpdGxlTWFwLnJlZHVjZSgoZ3JvdXBUaXRsZU1hcCwgdGl0bGUpID0+IHtcbiAgICAgICAgaWYgKGhhc093bih0aXRsZSwgJ2dyb3VwJykpIHtcbiAgICAgICAgICBpZiAodGl0bGUuZ3JvdXAgIT09IChncm91cFRpdGxlTWFwW2dyb3VwVGl0bGVNYXAubGVuZ3RoIC0gMV0gfHwge30pLmdyb3VwKSB7XG4gICAgICAgICAgICBncm91cFRpdGxlTWFwLnB1c2goeyBncm91cDogdGl0bGUuZ3JvdXAsIGl0ZW1zOiB0aXRsZS5pdGVtcyB8fCBbXSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGhhc093bih0aXRsZSwgJ25hbWUnKSAmJiBoYXNPd24odGl0bGUsICd2YWx1ZScpKSB7XG4gICAgICAgICAgICBncm91cFRpdGxlTWFwW2dyb3VwVGl0bGVNYXAubGVuZ3RoIC0gMV0uaXRlbXNcbiAgICAgICAgICAgICAgLnB1c2goeyBuYW1lOiB0aXRsZS5uYW1lLCB2YWx1ZTogdGl0bGUudmFsdWUgfSk7XG4gICAgICAgICAgICBpZiAodGl0bGUudmFsdWUgPT09IHVuZGVmaW5lZCB8fCB0aXRsZS52YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICBoYXNFbXB0eVZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ3JvdXBUaXRsZU1hcC5wdXNoKHRpdGxlKTtcbiAgICAgICAgICBpZiAodGl0bGUudmFsdWUgPT09IHVuZGVmaW5lZCB8fCB0aXRsZS52YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaGFzRW1wdHlWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBncm91cFRpdGxlTWFwO1xuICAgICAgfSwgW10pO1xuICAgIH1cbiAgfVxuICBpZiAoIWZpZWxkUmVxdWlyZWQgJiYgIWhhc0VtcHR5VmFsdWUpIHtcbiAgICBuZXdUaXRsZU1hcC51bnNoaWZ0KHsgbmFtZTogJzxlbT5Ob25lPC9lbT4nLCB2YWx1ZTogbnVsbCB9KTtcbiAgfVxuICByZXR1cm4gbmV3VGl0bGVNYXA7XG59XG4iXX0=