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
import { JsonPointer } from '../jsonpointer.functions';
import { inArray, isArray, isEmpty, isObject, isString } from '../validator';
import { fixTitle, forEach, hasOwn } from '../utility';
import { checkInlineType, getFromSchema, getInputType, isInputRequired, removeRecursiveReferences, updateInputOptions } from '../json-schema';
import { buildLayoutFromSchema, getLayoutNode } from './buildLayoutFromSchema';
import { mapLayout } from './mapLayout';
import * as _ from 'lodash';
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
                            for (var _b = __values(items.items), _c = _b.next(); !_c.done; _c = _b.next()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRMYXlvdXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3NmLWNvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9mdW5jdGlvbnMvbGF5b3V0L2J1aWxkTGF5b3V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDBCQUEwQixDQUFBO0FBQ3BELE9BQU8sRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBQzFFLE9BQU8sRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBQyxNQUFNLFlBQVksQ0FBQTtBQUNwRCxPQUFPLEVBQ0wsZUFBZSxFQUNmLGFBQWEsRUFDYixZQUFZLEVBQ1osZUFBZSxFQUNmLHlCQUF5QixFQUN6QixrQkFBa0IsRUFDbkIsTUFBTSxnQkFBZ0IsQ0FBQTtBQUN2QixPQUFPLEVBQUMscUJBQXFCLEVBQUUsYUFBYSxFQUFDLE1BQU0seUJBQXlCLENBQUE7QUFDNUUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGFBQWEsQ0FBQTtBQUNyQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQTtBQUszQixNQUFNLFVBQVUsV0FBVyxDQUFDLEdBQVEsRUFBRSxhQUFrQjtJQUN0RCxJQUFJLGVBQWUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLHdCQUF3QixDQUFDLENBQUE7SUFDckUsSUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsVUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLGFBQWE7UUFDeEUsSUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFBO1FBQzFCLElBQU0sT0FBTyxHQUFRO1lBQ25CLEdBQUcsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU8sRUFBRSxFQUFFO1NBQ1osQ0FBQTtRQUNELElBQUksUUFBUSxD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O1FBQ3hCLElBQU0sVUFBVSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDMUMsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQ3ZELFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtTQUNqQjtRQUNELEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsR0FBRztZQUN6QixHQUFHLEVBQUUsSUFBSTtZQUNULFdBQVcsRUFBRSxFQUFFO1lBQ2YsUUFBUSxFQUFFLFFBQVE7WUFDbEIsS0FBSyxFQUFFLFVBQVU7WUFDakIsSUFBSSxFQUFFLEVBQUU7WUFDUixPQUFPLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDO1lBQ3pELGtCQUFrQixFQUFFLElBQUk7WUFDeEIsUUFBUSxFQUFFLEtBQUs7WUFDZixJQUFJLEVBQUUsU0FBUztZQUNmLE1BQU0sRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztTQUMzQyxDQUFBO0tBQ0Y7SUFDRCxJQUFJLENBQUMsZUFBZSxFQUFFO1FBQ3BCLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDZCxHQUFHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPLEVBQUUsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFDO1lBQzFCLElBQUksRUFBRSxRQUFRO1lBQ2QsTUFBTSxFQUFFLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1NBQzFDLENBQUMsQ0FBQTtLQUNIO0lBQ0QsT0FBTyxVQUFVLENBQUE7QUFDbkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SnNvblBvaW50ZXJ9IGZyb20gJy4uL2pzb25wb2ludGVyLmZ1bmN0aW9ucydcbmltcG9ydCB7aW5BcnJheSwgaXNBcnJheSwgaXNFbXB0eSwgaXNPYmplY3QsIGlzU3RyaW5nfSBmcm9tICcuLi92YWxpZGF0b3InXG5pbXBvcnQge2ZpeFRpdGxlLCBmb3JFYWNoLCBoYXNPd259IGZyb20gJy4uL3V0aWxpdHknXG5pbXBvcnQge1xuICBjaGVja0lubGluZVR5cGUsXG4gIGdldEZyb21TY2hlbWEsXG4gIGdldElucHV0VHlwZSxcbiAgaXNJbnB1dFJlcXVpcmVkLFxuICByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzLFxuICB1cGRhdGVJbnB1dE9wdGlvbnNcbn0gZnJvbSAnLi4vanNvbi1zY2hlbWEnXG5pbXBvcnQge2J1aWxkTGF5b3V0RnJvbVNjaGVtYSwgZ2V0TGF5b3V0Tm9kZX0gZnJvbSAnLi9idWlsZExheW91dEZyb21TY2hlbWEnXG5pbXBvcnQge21hcExheW91dH0gZnJvbSAnLi9tYXBMYXlvdXQnXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCdcblxuLyoqXG4gKiAnYnVpbGRMYXlvdXQnIGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZExheW91dChqc2Y6IGFueSwgd2lkZ2V0TGlicmFyeTogYW55KTogYW55W10ge1xuICBsZXQgaGFzU3VibWl0QnV0dG9uID0gIUpzb25Qb2ludGVyLmdldChqc2YsICcvZm9ybU9wdGlvbnMvYWRkU3VibWl0JylcbiAgY29uc3QgZm9ybUxheW91dCA9IG1hcExheW91dChqc2YubGF5b3V0LCAobGF5b3V0SXRlbSwgaW5kZXgsIGxheW91dFBvaW50ZXIpID0+IHtcbiAgICBjb25zdCBjdXJyZW50SW5kZXggPSBpbmRleFxuICAgIGNvbnN0IG5ld05vZGU6IGFueSA9IHtcbiAgICAgIF9pZDogXy51bmlxdWVJZCgpLFxuICAgICAgb3B0aW9uczoge30sXG4gICAgfVxuICAgIGlmIChpc09iamVjdChsYXlvdXRJdGVtKSkge1xuICAgICAgT2JqZWN0LmFzc2lnbihuZXdOb2RlLCBsYXlvdXRJdGVtKVxuICAgICAgT2JqZWN0LmtleXMobmV3Tm9kZSlcbiAgICAgICAgLmZpbHRlcihvcHRpb24gPT4gIWluQXJyYXkob3B0aW9uLCBbXG4gICAgICAgICAgJ19pZCcsICckcmVmJywgJ2FycmF5SXRlbScsICdhcnJheUl0ZW1UeXBlJywgJ2RhdGFQb2ludGVyJywgJ2RhdGFUeXBlJyxcbiAgICAgICAgICAnaXRlbXMnLCAna2V5JywgJ25hbWUnLCAnb3B0aW9ucycsICdyZWN1cnNpdmVSZWZlcmVuY2UnLCAndHlwZScsICd3aWRnZXQnXG4gICAgICAgIF0pKVxuICAgICAgICAuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgICAgIG5ld05vZGUub3B0aW9uc1tvcHRpb25dID0gbmV3Tm9kZVtvcHRpb25dXG4gICAgICAgICAgZGVsZXRlIG5ld05vZGVbb3B0aW9uXVxuICAgICAgICB9KVxuICAgICAgaWYgKCFoYXNPd24obmV3Tm9kZSwgJ3R5cGUnKSAmJiBpc1N0cmluZyhuZXdOb2RlLndpZGdldCkpIHtcbiAgICAgICAgbmV3Tm9kZS50eXBlID0gbmV3Tm9kZS53aWRnZXRcbiAgICAgICAgZGVsZXRlIG5ld05vZGUud2lkZ2V0XG4gICAgICB9XG4gICAgICBpZiAoIWhhc093bihuZXdOb2RlLm9wdGlvbnMsICd0aXRsZScpKSB7XG4gICAgICAgIGlmIChoYXNPd24obmV3Tm9kZS5vcHRpb25zLCAnbGVnZW5kJykpIHtcbiAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMudGl0bGUgPSBuZXdOb2RlLm9wdGlvbnMubGVnZW5kXG4gICAgICAgICAgZGVsZXRlIG5ld05vZGUub3B0aW9ucy5sZWdlbmRcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFoYXNPd24obmV3Tm9kZS5vcHRpb25zLCAndmFsaWRhdGlvbk1lc3NhZ2VzJykpIHtcbiAgICAgICAgaWYgKGhhc093bihuZXdOb2RlLm9wdGlvbnMsICdlcnJvck1lc3NhZ2VzJykpIHtcbiAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMudmFsaWRhdGlvbk1lc3NhZ2VzID0gbmV3Tm9kZS5vcHRpb25zLmVycm9yTWVzc2FnZXNcbiAgICAgICAgICBkZWxldGUgbmV3Tm9kZS5vcHRpb25zLmVycm9yTWVzc2FnZXNcblxuICAgICAgICAgIC8vIENvbnZlcnQgQW5ndWxhciBTY2hlbWEgRm9ybSAoQW5ndWxhckpTKSAndmFsaWRhdGlvbk1lc3NhZ2UnIHRvXG4gICAgICAgICAgLy8gQW5ndWxhciBKU09OIFNjaGVtYSBGb3JtICd2YWxpZGF0aW9uTWVzc2FnZXMnXG4gICAgICAgICAgLy8gVFY0IGNvZGVzIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2dlcmFpbnRsdWZmL3R2NC9ibG9iL21hc3Rlci9zb3VyY2UvYXBpLmpzXG4gICAgICAgIH0gZWxzZSBpZiAoaGFzT3duKG5ld05vZGUub3B0aW9ucywgJ3ZhbGlkYXRpb25NZXNzYWdlJykpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIG5ld05vZGUub3B0aW9ucy52YWxpZGF0aW9uTWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIG5ld05vZGUub3B0aW9ucy52YWxpZGF0aW9uTWVzc2FnZXMgPSBuZXdOb2RlLm9wdGlvbnMudmFsaWRhdGlvbk1lc3NhZ2VcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLnZhbGlkYXRpb25NZXNzYWdlcyA9IHt9XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhuZXdOb2RlLm9wdGlvbnMudmFsaWRhdGlvbk1lc3NhZ2UpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgY29kZSA9IGtleSArICcnXG4gICAgICAgICAgICAgIGNvbnN0IG5ld0tleSA9XG4gICAgICAgICAgICAgICAgY29kZSA9PT0gJzAnID8gJ3R5cGUnIDpcbiAgICAgICAgICAgICAgICAgIGNvZGUgPT09ICcxJyA/ICdlbnVtJyA6XG4gICAgICAgICAgICAgICAgICAgIGNvZGUgPT09ICcxMDAnID8gJ211bHRpcGxlT2YnIDpcbiAgICAgICAgICAgICAgICAgICAgICBjb2RlID09PSAnMTAxJyA/ICdtaW5pbXVtJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlID09PSAnMTAyJyA/ICdleGNsdXNpdmVNaW5pbXVtJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvZGUgPT09ICcxMDMnID8gJ21heGltdW0nIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlID09PSAnMTA0JyA/ICdleGNsdXNpdmVNYXhpbXVtJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlID09PSAnMjAwJyA/ICdtaW5MZW5ndGgnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZSA9PT0gJzIwMScgPyAnbWF4TGVuZ3RoJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZSA9PT0gJzIwMicgPyAncGF0dGVybicgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZSA9PT0gJzMwMCcgPyAnbWluUHJvcGVydGllcycgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlID09PSAnMzAxJyA/ICdtYXhQcm9wZXJ0aWVzJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZSA9PT0gJzMwMicgPyAncmVxdWlyZWQnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZGUgPT09ICczMDQnID8gJ2RlcGVuZGVuY2llcycgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlID09PSAnNDAwJyA/ICdtaW5JdGVtcycgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZGUgPT09ICc0MDEnID8gJ21heEl0ZW1zJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlID09PSAnNDAyJyA/ICd1bmlxdWVJdGVtcycgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlID09PSAnNTAwJyA/ICdmb3JtYXQnIDogY29kZSArICcnXG4gICAgICAgICAgICAgIG5ld05vZGUub3B0aW9ucy52YWxpZGF0aW9uTWVzc2FnZXNbbmV3S2V5XSA9IG5ld05vZGUub3B0aW9ucy52YWxpZGF0aW9uTWVzc2FnZVtrZXldXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICBkZWxldGUgbmV3Tm9kZS5vcHRpb25zLnZhbGlkYXRpb25NZXNzYWdlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKEpzb25Qb2ludGVyLmlzSnNvblBvaW50ZXIobGF5b3V0SXRlbSkpIHtcbiAgICAgIG5ld05vZGUuZGF0YVBvaW50ZXIgPSBsYXlvdXRJdGVtXG4gICAgfSBlbHNlIGlmIChpc1N0cmluZyhsYXlvdXRJdGVtKSkge1xuICAgICAgbmV3Tm9kZS5rZXkgPSBsYXlvdXRJdGVtXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2J1aWxkTGF5b3V0IGVycm9yOiBGb3JtIGxheW91dCBlbGVtZW50IG5vdCByZWNvZ25pemVkOicpXG4gICAgICBjb25zb2xlLmVycm9yKGxheW91dEl0ZW0pXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBsZXQgbm9kZVNjaGVtYTogYW55ID0gbnVsbFxuXG4gICAgLy8gSWYgbmV3Tm9kZSBkb2VzIG5vdCBoYXZlIGEgZGF0YVBvaW50ZXIsIHRyeSB0byBmaW5kIGFuIGVxdWl2YWxlbnRcbiAgICBpZiAoIWhhc093bihuZXdOb2RlLCAnZGF0YVBvaW50ZXInKSkge1xuXG4gICAgICAvLyBJZiBuZXdOb2RlIGhhcyBhIGtleSwgY2hhbmdlIGl0IHRvIGEgZGF0YVBvaW50ZXJcbiAgICAgIGlmIChoYXNPd24obmV3Tm9kZSwgJ2tleScpKSB7XG4gICAgICAgIG5ld05vZGUuZGF0YVBvaW50ZXIgPSBuZXdOb2RlLmtleSA9PT0gJyonID8gbmV3Tm9kZS5rZXkgOlxuICAgICAgICAgIEpzb25Qb2ludGVyLmNvbXBpbGUoSnNvblBvaW50ZXIucGFyc2VPYmplY3RQYXRoKG5ld05vZGUua2V5KSwgJy0nKVxuICAgICAgICBkZWxldGUgbmV3Tm9kZS5rZXlcblxuICAgICAgICAvLyBJZiBuZXdOb2RlIGlzIGFuIGFycmF5LCBzZWFyY2ggZm9yIGRhdGFQb2ludGVyIGluIGNoaWxkIG5vZGVzXG4gICAgICB9IGVsc2UgaWYgKGhhc093bihuZXdOb2RlLCAndHlwZScpICYmIG5ld05vZGUudHlwZS5zbGljZSgtNSkgPT09ICdhcnJheScpIHtcbiAgICAgICAgY29uc3QgZmluZERhdGFQb2ludGVyID0gKGl0ZW1zKSA9PiB7XG4gICAgICAgICAgaWYgKGl0ZW1zID09PSBudWxsIHx8IHR5cGVvZiBpdGVtcyAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaGFzT3duKGl0ZW1zLCAnZGF0YVBvaW50ZXInKSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zLmRhdGFQb2ludGVyXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpc0FycmF5KGl0ZW1zLml0ZW1zKSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zLml0ZW1zKSB7XG4gICAgICAgICAgICAgIGlmIChoYXNPd24oaXRlbSwgJ2RhdGFQb2ludGVyJykgJiYgaXRlbS5kYXRhUG9pbnRlci5pbmRleE9mKCcvLScpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmRhdGFQb2ludGVyXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGhhc093bihpdGVtLCAnaXRlbXMnKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlYXJjaEl0ZW0gPSBmaW5kRGF0YVBvaW50ZXIoaXRlbSlcbiAgICAgICAgICAgICAgICBpZiAoc2VhcmNoSXRlbSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlYXJjaEl0ZW1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2hpbGREYXRhUG9pbnRlciA9IGZpbmREYXRhUG9pbnRlcihuZXdOb2RlKVxuICAgICAgICBpZiAoY2hpbGREYXRhUG9pbnRlcikge1xuICAgICAgICAgIG5ld05vZGUuZGF0YVBvaW50ZXIgPVxuICAgICAgICAgICAgY2hpbGREYXRhUG9pbnRlci5zbGljZSgwLCBjaGlsZERhdGFQb2ludGVyLmxhc3RJbmRleE9mKCcvLScpKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGhhc093bihuZXdOb2RlLCAnZGF0YVBvaW50ZXInKSkge1xuICAgICAgaWYgKG5ld05vZGUuZGF0YVBvaW50ZXIgPT09ICcqJykge1xuICAgICAgICByZXR1cm4gYnVpbGRMYXlvdXRGcm9tU2NoZW1hKGpzZiwgd2lkZ2V0TGlicmFyeSwganNmLmZvcm1WYWx1ZXMpXG4gICAgICB9XG4gICAgICBjb25zdCBub2RlVmFsdWUgPVxuICAgICAgICBKc29uUG9pbnRlci5nZXQoanNmLmZvcm1WYWx1ZXMsIG5ld05vZGUuZGF0YVBvaW50ZXIucmVwbGFjZSgvXFwvLS9nLCAnLzEnKSlcblxuICAgICAgLy8gVE9ETzogQ3JlYXRlIGZ1bmN0aW9uIGdldEZvcm1WYWx1ZXMoanNmLCBkYXRhUG9pbnRlciwgZm9yUmVmTGlicmFyeSlcbiAgICAgIC8vIGNoZWNrIGZvcm1PcHRpb25zLnNldFNjaGVtYURlZmF1bHRzIGFuZCBmb3JtT3B0aW9ucy5zZXRMYXlvdXREZWZhdWx0c1xuICAgICAgLy8gdGhlbiBzZXQgYXByb3ByaWF0ZSB2YWx1ZXMgZnJvbSBpbml0aWFsVmF1ZXMsIHNjaGVtYSwgb3IgbGF5b3V0XG5cbiAgICAgIG5ld05vZGUuZGF0YVBvaW50ZXIgPVxuICAgICAgICBKc29uUG9pbnRlci50b0dlbmVyaWNQb2ludGVyKG5ld05vZGUuZGF0YVBvaW50ZXIsIGpzZi5hcnJheU1hcClcbiAgICAgIGNvbnN0IExhc3RLZXkgPSBKc29uUG9pbnRlci50b0tleShuZXdOb2RlLmRhdGFQb2ludGVyKVxuICAgICAgaWYgKCFuZXdOb2RlLm5hbWUgJiYgaXNTdHJpbmcoTGFzdEtleSkgJiYgTGFzdEtleSAhPT0gJy0nKSB7XG4gICAgICAgIG5ld05vZGUubmFtZSA9IExhc3RLZXlcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNob3J0RGF0YVBvaW50ZXIgPSByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzKFxuICAgICAgICBuZXdOb2RlLmRhdGFQb2ludGVyLCBqc2YuZGF0YVJlY3Vyc2l2ZVJlZk1hcCwganNmLmFycmF5TWFwXG4gICAgICApXG4gICAgICBjb25zdCByZWN1cnNpdmUgPSAhc2hvcnREYXRhUG9pbnRlci5sZW5ndGggfHxcbiAgICAgICAgc2hvcnREYXRhUG9pbnRlciAhPT0gbmV3Tm9kZS5kYXRhUG9pbnRlclxuICAgICAgbGV0IHNjaGVtYVBvaW50ZXI6IHN0cmluZ1xuICAgICAgaWYgKCFqc2YuZGF0YU1hcC5oYXMoc2hvcnREYXRhUG9pbnRlcikpIHtcbiAgICAgICAganNmLmRhdGFNYXAuc2V0KHNob3J0RGF0YVBvaW50ZXIsIG5ldyBNYXAoKSlcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5vZGVEYXRhTWFwID0ganNmLmRhdGFNYXAuZ2V0KHNob3J0RGF0YVBvaW50ZXIpXG4gICAgICBpZiAobm9kZURhdGFNYXAuaGFzKCdzY2hlbWFQb2ludGVyJykpIHtcbiAgICAgICAgc2NoZW1hUG9pbnRlciA9IG5vZGVEYXRhTWFwLmdldCgnc2NoZW1hUG9pbnRlcicpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY2hlbWFQb2ludGVyID0gSnNvblBvaW50ZXIudG9TY2hlbWFQb2ludGVyKHNob3J0RGF0YVBvaW50ZXIsIGpzZi5zY2hlbWEpIGFzIGFueVxuICAgICAgICBub2RlRGF0YU1hcC5zZXQoJ3NjaGVtYVBvaW50ZXInLCBzY2hlbWFQb2ludGVyKVxuICAgICAgfVxuICAgICAgbm9kZURhdGFNYXAuc2V0KCdkaXNhYmxlZCcsICEhbmV3Tm9kZS5vcHRpb25zLmRpc2FibGVkKVxuICAgICAgbm9kZVNjaGVtYSA9IEpzb25Qb2ludGVyLmdldChqc2Yuc2NoZW1hLCBzY2hlbWFQb2ludGVyKVxuICAgICAgaWYgKG5vZGVTY2hlbWEpIHtcbiAgICAgICAgaWYgKCFoYXNPd24obmV3Tm9kZSwgJ3R5cGUnKSkge1xuICAgICAgICAgIG5ld05vZGUudHlwZSA9IGdldElucHV0VHlwZShub2RlU2NoZW1hLCBuZXdOb2RlKVxuICAgICAgICB9IGVsc2UgaWYgKCF3aWRnZXRMaWJyYXJ5Lmhhc1dpZGdldChuZXdOb2RlLnR5cGUpKSB7XG4gICAgICAgICAgY29uc3Qgb2xkV2lkZ2V0VHlwZSA9IG5ld05vZGUudHlwZVxuICAgICAgICAgIG5ld05vZGUudHlwZSA9IGdldElucHV0VHlwZShub2RlU2NoZW1hLCBuZXdOb2RlKVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYGVycm9yOiB3aWRnZXQgdHlwZSBcIiR7b2xkV2lkZ2V0VHlwZX1cIiBgICtcbiAgICAgICAgICAgIGBub3QgZm91bmQgaW4gbGlicmFyeS4gUmVwbGFjaW5nIHdpdGggXCIke25ld05vZGUudHlwZX1cIi5gKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld05vZGUudHlwZSA9IGNoZWNrSW5saW5lVHlwZShuZXdOb2RlLnR5cGUsIG5vZGVTY2hlbWEsIG5ld05vZGUpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGVTY2hlbWEudHlwZSA9PT0gJ29iamVjdCcgJiYgaXNBcnJheShub2RlU2NoZW1hLnJlcXVpcmVkKSkge1xuICAgICAgICAgIG5vZGVEYXRhTWFwLnNldCgncmVxdWlyZWQnLCBub2RlU2NoZW1hLnJlcXVpcmVkKVxuICAgICAgICB9XG4gICAgICAgIG5ld05vZGUuZGF0YVR5cGUgPVxuICAgICAgICAgIG5vZGVTY2hlbWEudHlwZSB8fCAoaGFzT3duKG5vZGVTY2hlbWEsICckcmVmJykgPyAnJHJlZicgOiBudWxsKVxuICAgICAgICB1cGRhdGVJbnB1dE9wdGlvbnMobmV3Tm9kZSwgbm9kZVNjaGVtYSwganNmKVxuXG4gICAgICAgIC8vIFByZXNlbnQgY2hlY2tib3hlcyBhcyBzaW5nbGUgY29udHJvbCwgcmF0aGVyIHRoYW4gYXJyYXlcbiAgICAgICAgaWYgKG5ld05vZGUudHlwZSA9PT0gJ2NoZWNrYm94ZXMnICYmIGhhc093bihub2RlU2NoZW1hLCAnaXRlbXMnKSkge1xuICAgICAgICAgIHVwZGF0ZUlucHV0T3B0aW9ucyhuZXdOb2RlLCBub2RlU2NoZW1hLml0ZW1zLCBqc2YpXG4gICAgICAgIH0gZWxzZSBpZiAobmV3Tm9kZS5kYXRhVHlwZSA9PT0gJ2FycmF5Jykge1xuICAgICAgICAgIG5ld05vZGUub3B0aW9ucy5tYXhJdGVtcyA9IE1hdGgubWluKFxuICAgICAgICAgICAgbm9kZVNjaGVtYS5tYXhJdGVtcyB8fCAxMDAwLCBuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXMgfHwgMTAwMFxuICAgICAgICAgIClcbiAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMubWluSXRlbXMgPSBNYXRoLm1heChcbiAgICAgICAgICAgIG5vZGVTY2hlbWEubWluSXRlbXMgfHwgMCwgbmV3Tm9kZS5vcHRpb25zLm1pbkl0ZW1zIHx8IDBcbiAgICAgICAgICApXG4gICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLmxpc3RJdGVtcyA9IE1hdGgubWF4KFxuICAgICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLmxpc3RJdGVtcyB8fCAwLCBpc0FycmF5KG5vZGVWYWx1ZSkgPyBub2RlVmFsdWUubGVuZ3RoIDogMFxuICAgICAgICAgIClcbiAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcyA9XG4gICAgICAgICAgICBpc0FycmF5KG5vZGVTY2hlbWEuaXRlbXMpID8gbm9kZVNjaGVtYS5pdGVtcy5sZW5ndGggOiAwXG4gICAgICAgICAgaWYgKG5ld05vZGUub3B0aW9ucy5tYXhJdGVtcyA8IG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zKSB7XG4gICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcyA9IG5ld05vZGUub3B0aW9ucy5tYXhJdGVtc1xuICAgICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLmxpc3RJdGVtcyA9IDBcbiAgICAgICAgICB9IGVsc2UgaWYgKG5ld05vZGUub3B0aW9ucy5tYXhJdGVtcyA8XG4gICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcyArIG5ld05vZGUub3B0aW9ucy5saXN0SXRlbXNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIG5ld05vZGUub3B0aW9ucy5saXN0SXRlbXMgPVxuICAgICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXMgLSBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtc1xuICAgICAgICAgIH0gZWxzZSBpZiAobmV3Tm9kZS5vcHRpb25zLm1pbkl0ZW1zID5cbiAgICAgICAgICAgIG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zICsgbmV3Tm9kZS5vcHRpb25zLmxpc3RJdGVtc1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLmxpc3RJdGVtcyA9XG4gICAgICAgICAgICAgIG5ld05vZGUub3B0aW9ucy5taW5JdGVtcyAtIG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghbm9kZURhdGFNYXAuaGFzKCdtYXhJdGVtcycpKSB7XG4gICAgICAgICAgICBub2RlRGF0YU1hcC5zZXQoJ21heEl0ZW1zJywgbmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zKVxuICAgICAgICAgICAgbm9kZURhdGFNYXAuc2V0KCdtaW5JdGVtcycsIG5ld05vZGUub3B0aW9ucy5taW5JdGVtcylcbiAgICAgICAgICAgIG5vZGVEYXRhTWFwLnNldCgndHVwbGVJdGVtcycsIG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zKVxuICAgICAgICAgICAgbm9kZURhdGFNYXAuc2V0KCdsaXN0SXRlbXMnLCBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWpzZi5hcnJheU1hcC5oYXMoc2hvcnREYXRhUG9pbnRlcikpIHtcbiAgICAgICAgICAgIGpzZi5hcnJheU1hcC5zZXQoc2hvcnREYXRhUG9pbnRlciwgbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXMpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc0lucHV0UmVxdWlyZWQoanNmLnNjaGVtYSwgc2NoZW1hUG9pbnRlcikpIHtcbiAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMucmVxdWlyZWQgPSB0cnVlXG4gICAgICAgICAganNmLmZpZWxkc1JlcXVpcmVkID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUT0RPOiBjcmVhdGUgaXRlbSBpbiBGb3JtR3JvdXAgbW9kZWwgZnJvbSBsYXlvdXQga2V5ICg/KVxuICAgICAgICB1cGRhdGVJbnB1dE9wdGlvbnMobmV3Tm9kZSwge30sIGpzZilcbiAgICAgIH1cblxuICAgICAgaWYgKCFuZXdOb2RlLm9wdGlvbnMudGl0bGUgJiYgIS9eXFxkKyQvLnRlc3QobmV3Tm9kZS5uYW1lKSkge1xuICAgICAgICBuZXdOb2RlLm9wdGlvbnMudGl0bGUgPSBmaXhUaXRsZShuZXdOb2RlLm5hbWUpXG4gICAgICB9XG5cbiAgICAgIGlmIChoYXNPd24obmV3Tm9kZS5vcHRpb25zLCAnY29weVZhbHVlVG8nKSkge1xuICAgICAgICBpZiAodHlwZW9mIG5ld05vZGUub3B0aW9ucy5jb3B5VmFsdWVUbyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMuY29weVZhbHVlVG8gPSBbbmV3Tm9kZS5vcHRpb25zLmNvcHlWYWx1ZVRvXVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FycmF5KG5ld05vZGUub3B0aW9ucy5jb3B5VmFsdWVUbykpIHtcbiAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMuY29weVZhbHVlVG8gPSBuZXdOb2RlLm9wdGlvbnMuY29weVZhbHVlVG8ubWFwKGl0ZW0gPT5cbiAgICAgICAgICAgIEpzb25Qb2ludGVyLmNvbXBpbGUoSnNvblBvaW50ZXIucGFyc2VPYmplY3RQYXRoKGl0ZW0pLCAnLScpXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG5ld05vZGUud2lkZ2V0ID0gd2lkZ2V0TGlicmFyeS5nZXRXaWRnZXQobmV3Tm9kZS50eXBlKVxuICAgICAgbm9kZURhdGFNYXAuc2V0KCdpbnB1dFR5cGUnLCBuZXdOb2RlLnR5cGUpXG4gICAgICBub2RlRGF0YU1hcC5zZXQoJ3dpZGdldCcsIG5ld05vZGUud2lkZ2V0KVxuXG4gICAgICBpZiAobmV3Tm9kZS5kYXRhVHlwZSA9PT0gJ2FycmF5JyAmJlxuICAgICAgICAoaGFzT3duKG5ld05vZGUsICdpdGVtcycpIHx8IGhhc093bihuZXdOb2RlLCAnYWRkaXRpb25hbEl0ZW1zJykpXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgaXRlbVJlZlBvaW50ZXIgPSByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzKFxuICAgICAgICAgIG5ld05vZGUuZGF0YVBvaW50ZXIgKyAnLy0nLCBqc2YuZGF0YVJlY3Vyc2l2ZVJlZk1hcCwganNmLmFycmF5TWFwXG4gICAgICAgIClcbiAgICAgICAgaWYgKCFqc2YuZGF0YU1hcC5oYXMoaXRlbVJlZlBvaW50ZXIpKSB7XG4gICAgICAgICAganNmLmRhdGFNYXAuc2V0KGl0ZW1SZWZQb2ludGVyLCBuZXcgTWFwKCkpXG4gICAgICAgIH1cbiAgICAgICAganNmLmRhdGFNYXAuZ2V0KGl0ZW1SZWZQb2ludGVyKS5zZXQoJ2lucHV0VHlwZScsICdzZWN0aW9uJylcblxuICAgICAgICAvLyBGaXggaW5zdWZmaWNpZW50bHkgbmVzdGVkIGFycmF5IGl0ZW0gZ3JvdXBzXG4gICAgICAgIGlmIChuZXdOb2RlLml0ZW1zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBjb25zdCBhcnJheUl0ZW1Hcm91cCA9IFtdXG4gICAgICAgICAgY29uc3QgYXJyYXlJdGVtR3JvdXBUZW1wbGF0ZSA9IFtdXG4gICAgICAgICAgbGV0IG5ld0luZGV4ID0gMFxuICAgICAgICAgIGZvciAobGV0IGkgPSBuZXdOb2RlLml0ZW1zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBjb25zdCBzdWJJdGVtID0gbmV3Tm9kZS5pdGVtc1tpXVxuICAgICAgICAgICAgaWYgKGhhc093bihzdWJJdGVtLCAnZGF0YVBvaW50ZXInKSAmJlxuICAgICAgICAgICAgICBzdWJJdGVtLmRhdGFQb2ludGVyLnNsaWNlKDAsIGl0ZW1SZWZQb2ludGVyLmxlbmd0aCkgPT09IGl0ZW1SZWZQb2ludGVyXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29uc3QgYXJyYXlJdGVtID0gbmV3Tm9kZS5pdGVtcy5zcGxpY2UoaSwgMSlbMF1cbiAgICAgICAgICAgICAgYXJyYXlJdGVtLmRhdGFQb2ludGVyID0gbmV3Tm9kZS5kYXRhUG9pbnRlciArICcvLScgK1xuICAgICAgICAgICAgICAgIGFycmF5SXRlbS5kYXRhUG9pbnRlci5zbGljZShpdGVtUmVmUG9pbnRlci5sZW5ndGgpXG4gICAgICAgICAgICAgIGFycmF5SXRlbUdyb3VwLnVuc2hpZnQoYXJyYXlJdGVtKVxuICAgICAgICAgICAgICBuZXdJbmRleCsrXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzdWJJdGVtLmFycmF5SXRlbSA9IHRydWVcbiAgICAgICAgICAgICAgLy8gVE9ETzogQ2hlY2sgc2NoZW1hIHRvIGdldCBhcnJheUl0ZW1UeXBlIGFuZCByZW1vdmFibGVcbiAgICAgICAgICAgICAgc3ViSXRlbS5hcnJheUl0ZW1UeXBlID0gJ2xpc3QnXG4gICAgICAgICAgICAgIHN1Ykl0ZW0ucmVtb3ZhYmxlID0gbmV3Tm9kZS5vcHRpb25zLnJlbW92YWJsZSAhPT0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFycmF5SXRlbUdyb3VwLmxlbmd0aCkge1xuICAgICAgICAgICAgbmV3Tm9kZS5pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgX2lkOiBfLnVuaXF1ZUlkKCksXG4gICAgICAgICAgICAgIGFycmF5SXRlbTogdHJ1ZSxcbiAgICAgICAgICAgICAgYXJyYXlJdGVtVHlwZTogbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXMgPiBuZXdOb2RlLml0ZW1zLmxlbmd0aCA/XG4gICAgICAgICAgICAgICAgJ3R1cGxlJyA6ICdsaXN0JyxcbiAgICAgICAgICAgICAgaXRlbXM6IGFycmF5SXRlbUdyb3VwLFxuICAgICAgICAgICAgICBvcHRpb25zOiB7cmVtb3ZhYmxlOiBuZXdOb2RlLm9wdGlvbnMucmVtb3ZhYmxlICE9PSBmYWxzZSx9LFxuICAgICAgICAgICAgICBkYXRhUG9pbnRlcjogbmV3Tm9kZS5kYXRhUG9pbnRlciArICcvLScsXG4gICAgICAgICAgICAgIHR5cGU6ICdzZWN0aW9uJyxcbiAgICAgICAgICAgICAgd2lkZ2V0OiB3aWRnZXRMaWJyYXJ5LmdldFdpZGdldCgnc2VjdGlvbicpLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gVE9ETzogRml4IHRvIGhuZGxlIG11bHRpcGxlIGl0ZW1zXG4gICAgICAgICAgbmV3Tm9kZS5pdGVtc1swXS5hcnJheUl0ZW0gPSB0cnVlXG4gICAgICAgICAgaWYgKCFuZXdOb2RlLml0ZW1zWzBdLmRhdGFQb2ludGVyKSB7XG4gICAgICAgICAgICBuZXdOb2RlLml0ZW1zWzBdLmRhdGFQb2ludGVyID1cbiAgICAgICAgICAgICAgSnNvblBvaW50ZXIudG9HZW5lcmljUG9pbnRlcihpdGVtUmVmUG9pbnRlciwganNmLmFycmF5TWFwKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIUpzb25Qb2ludGVyLmhhcyhuZXdOb2RlLCAnL2l0ZW1zLzAvb3B0aW9ucy9yZW1vdmFibGUnKSkge1xuICAgICAgICAgICAgbmV3Tm9kZS5pdGVtc1swXS5vcHRpb25zLnJlbW92YWJsZSA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG5ld05vZGUub3B0aW9ucy5vcmRlcmFibGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBuZXdOb2RlLml0ZW1zWzBdLm9wdGlvbnMub3JkZXJhYmxlID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgbmV3Tm9kZS5pdGVtc1swXS5hcnJheUl0ZW1UeXBlID1cbiAgICAgICAgICAgIG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zID8gJ3R1cGxlJyA6ICdsaXN0J1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQXJyYXkobmV3Tm9kZS5pdGVtcykpIHtcbiAgICAgICAgICBjb25zdCBhcnJheUxpc3RJdGVtcyA9XG4gICAgICAgICAgICBuZXdOb2RlLml0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW0udHlwZSAhPT0gJyRyZWYnKS5sZW5ndGggLVxuICAgICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXNcbiAgICAgICAgICBpZiAoYXJyYXlMaXN0SXRlbXMgPiBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zKSB7XG4gICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zID0gYXJyYXlMaXN0SXRlbXNcbiAgICAgICAgICAgIG5vZGVEYXRhTWFwLnNldCgnbGlzdEl0ZW1zJywgYXJyYXlMaXN0SXRlbXMpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFoYXNPd24oanNmLmxheW91dFJlZkxpYnJhcnksIGl0ZW1SZWZQb2ludGVyKSkge1xuICAgICAgICAgIGpzZi5sYXlvdXRSZWZMaWJyYXJ5W2l0ZW1SZWZQb2ludGVyXSA9XG4gICAgICAgICAgICBfLmNsb25lRGVlcChuZXdOb2RlLml0ZW1zW25ld05vZGUuaXRlbXMubGVuZ3RoIC0gMV0pXG4gICAgICAgICAgaWYgKHJlY3Vyc2l2ZSkge1xuICAgICAgICAgICAganNmLmxheW91dFJlZkxpYnJhcnlbaXRlbVJlZlBvaW50ZXJdLnJlY3Vyc2l2ZVJlZmVyZW5jZSA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yRWFjaChqc2YubGF5b3V0UmVmTGlicmFyeVtpdGVtUmVmUG9pbnRlcl0sIChpdGVtLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChoYXNPd24oaXRlbSwgJ19pZCcpKSB7XG4gICAgICAgICAgICAgIGl0ZW0uX2lkID0gbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlY3Vyc2l2ZSkge1xuICAgICAgICAgICAgICBpZiAoaGFzT3duKGl0ZW0sICdkYXRhUG9pbnRlcicpKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5kYXRhUG9pbnRlciA9IGl0ZW0uZGF0YVBvaW50ZXIuc2xpY2UoaXRlbVJlZlBvaW50ZXIubGVuZ3RoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgJ3RvcC1kb3duJylcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBhbnkgYWRkaXRpb25hbCBkZWZhdWx0IGl0ZW1zXG4gICAgICAgIGlmICghbmV3Tm9kZS5yZWN1cnNpdmVSZWZlcmVuY2UgfHwgbmV3Tm9kZS5vcHRpb25zLnJlcXVpcmVkKSB7XG4gICAgICAgICAgY29uc3QgYXJyYXlMZW5ndGggPSBNYXRoLm1pbihNYXRoLm1heChcbiAgICAgICAgICAgIG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zICsgbmV3Tm9kZS5vcHRpb25zLmxpc3RJdGVtcyxcbiAgICAgICAgICAgIGlzQXJyYXkobm9kZVZhbHVlKSA/IG5vZGVWYWx1ZS5sZW5ndGggOiAwXG4gICAgICAgICAgKSwgbmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zKVxuICAgICAgICAgIGZvciAobGV0IGkgPSBuZXdOb2RlLml0ZW1zLmxlbmd0aDsgaSA8IGFycmF5TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG5ld05vZGUuaXRlbXMucHVzaChnZXRMYXlvdXROb2RlKHtcbiAgICAgICAgICAgICAgJHJlZjogaXRlbVJlZlBvaW50ZXIsXG4gICAgICAgICAgICAgIGRhdGFQb2ludGVyOiBuZXdOb2RlLmRhdGFQb2ludGVyLFxuICAgICAgICAgICAgICByZWN1cnNpdmVSZWZlcmVuY2U6IG5ld05vZGUucmVjdXJzaXZlUmVmZXJlbmNlLFxuICAgICAgICAgICAgfSwganNmLCB3aWRnZXRMaWJyYXJ5KSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBuZWVkZWQsIGFkZCBidXR0b24gdG8gYWRkIGl0ZW1zIHRvIGFycmF5XG4gICAgICAgIGlmIChuZXdOb2RlLm9wdGlvbnMuYWRkYWJsZSAhPT0gZmFsc2UgJiZcbiAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMubWluSXRlbXMgPCBuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXMgJiZcbiAgICAgICAgICAobmV3Tm9kZS5pdGVtc1tuZXdOb2RlLml0ZW1zLmxlbmd0aCAtIDFdIHx8IHt9KS50eXBlICE9PSAnJHJlZidcbiAgICAgICAgKSB7XG4gICAgICAgICAgbGV0IGJ1dHRvblRleHQgPSAnQWRkJ1xuICAgICAgICAgIGlmIChuZXdOb2RlLm9wdGlvbnMudGl0bGUpIHtcbiAgICAgICAgICAgIGlmICgvXmFkZFxcYi9pLnRlc3QobmV3Tm9kZS5vcHRpb25zLnRpdGxlKSkge1xuICAgICAgICAgICAgICBidXR0b25UZXh0ID0gbmV3Tm9kZS5vcHRpb25zLnRpdGxlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBidXR0b25UZXh0ICs9ICcgJyArIG5ld05vZGUub3B0aW9ucy50aXRsZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAobmV3Tm9kZS5uYW1lICYmICEvXlxcZCskLy50ZXN0KG5ld05vZGUubmFtZSkpIHtcbiAgICAgICAgICAgIGlmICgvXmFkZFxcYi9pLnRlc3QobmV3Tm9kZS5uYW1lKSkge1xuICAgICAgICAgICAgICBidXR0b25UZXh0ICs9ICcgJyArIGZpeFRpdGxlKG5ld05vZGUubmFtZSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGJ1dHRvblRleHQgPSBmaXhUaXRsZShuZXdOb2RlLm5hbWUpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIElmIG5ld05vZGUgZG9lc24ndCBoYXZlIGEgdGl0bGUsIGxvb2sgZm9yIHRpdGxlIG9mIHBhcmVudCBhcnJheSBpdGVtXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudFNjaGVtYSA9XG4gICAgICAgICAgICAgIGdldEZyb21TY2hlbWEoanNmLnNjaGVtYSwgbmV3Tm9kZS5kYXRhUG9pbnRlciwgJ3BhcmVudFNjaGVtYScpXG4gICAgICAgICAgICBpZiAoaGFzT3duKHBhcmVudFNjaGVtYSwgJ3RpdGxlJykpIHtcbiAgICAgICAgICAgICAgYnV0dG9uVGV4dCArPSAnIHRvICcgKyBwYXJlbnRTY2hlbWEudGl0bGVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnN0IHBvaW50ZXJBcnJheSA9IEpzb25Qb2ludGVyLnBhcnNlKG5ld05vZGUuZGF0YVBvaW50ZXIpXG4gICAgICAgICAgICAgIGJ1dHRvblRleHQgKz0gJyB0byAnICsgZml4VGl0bGUocG9pbnRlckFycmF5W3BvaW50ZXJBcnJheS5sZW5ndGggLSAyXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgbmV3Tm9kZS5pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgIF9pZDogXy51bmlxdWVJZCgpLFxuICAgICAgICAgICAgYXJyYXlJdGVtOiB0cnVlLFxuICAgICAgICAgICAgYXJyYXlJdGVtVHlwZTogJ2xpc3QnLFxuICAgICAgICAgICAgZGF0YVBvaW50ZXI6IG5ld05vZGUuZGF0YVBvaW50ZXIgKyAnLy0nLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICBsaXN0SXRlbXM6IG5ld05vZGUub3B0aW9ucy5saXN0SXRlbXMsXG4gICAgICAgICAgICAgIG1heEl0ZW1zOiBuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXMsXG4gICAgICAgICAgICAgIG1pbkl0ZW1zOiBuZXdOb2RlLm9wdGlvbnMubWluSXRlbXMsXG4gICAgICAgICAgICAgIHJlbW92YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgIHRpdGxlOiBidXR0b25UZXh0LFxuICAgICAgICAgICAgICB0dXBsZUl0ZW1zOiBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWN1cnNpdmVSZWZlcmVuY2U6IHJlY3Vyc2l2ZSxcbiAgICAgICAgICAgIHR5cGU6ICckcmVmJyxcbiAgICAgICAgICAgIHdpZGdldDogd2lkZ2V0TGlicmFyeS5nZXRXaWRnZXQoJyRyZWYnKSxcbiAgICAgICAgICAgICRyZWY6IGl0ZW1SZWZQb2ludGVyLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgaWYgKGlzU3RyaW5nKEpzb25Qb2ludGVyLmdldChuZXdOb2RlLCAnL3N0eWxlL2FkZCcpKSkge1xuICAgICAgICAgICAgbmV3Tm9kZS5pdGVtc1tuZXdOb2RlLml0ZW1zLmxlbmd0aCAtIDFdLm9wdGlvbnMuZmllbGRTdHlsZSA9XG4gICAgICAgICAgICAgIG5ld05vZGUuc3R5bGUuYWRkXG4gICAgICAgICAgICBkZWxldGUgbmV3Tm9kZS5zdHlsZS5hZGRcbiAgICAgICAgICAgIGlmIChpc0VtcHR5KG5ld05vZGUuc3R5bGUpKSB7XG4gICAgICAgICAgICAgIGRlbGV0ZSBuZXdOb2RlLnN0eWxlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdOb2RlLmFycmF5SXRlbSA9IGZhbHNlXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChoYXNPd24obmV3Tm9kZSwgJ3R5cGUnKSB8fCBoYXNPd24obmV3Tm9kZSwgJ2l0ZW1zJykpIHtcbiAgICAgIGNvbnN0IHBhcmVudFR5cGU6IHN0cmluZyA9XG4gICAgICAgIEpzb25Qb2ludGVyLmdldChqc2YubGF5b3V0LCBsYXlvdXRQb2ludGVyLCAwLCAtMikudHlwZVxuICAgICAgaWYgKCFoYXNPd24obmV3Tm9kZSwgJ3R5cGUnKSkge1xuICAgICAgICBuZXdOb2RlLnR5cGUgPVxuICAgICAgICAgIGluQXJyYXkocGFyZW50VHlwZSwgWyd0YWJzJywgJ3RhYmFycmF5J10pID8gJ3RhYicgOiAnYXJyYXknXG4gICAgICB9XG4gICAgICBuZXdOb2RlLmFycmF5SXRlbSA9IHBhcmVudFR5cGUgPT09ICdhcnJheSdcbiAgICAgIG5ld05vZGUud2lkZ2V0ID0gd2lkZ2V0TGlicmFyeS5nZXRXaWRnZXQobmV3Tm9kZS50eXBlKVxuICAgICAgdXBkYXRlSW5wdXRPcHRpb25zKG5ld05vZGUsIHt9LCBqc2YpXG4gICAgfVxuICAgIGlmIChuZXdOb2RlLnR5cGUgPT09ICdzdWJtaXQnKSB7XG4gICAgICBoYXNTdWJtaXRCdXR0b24gPSB0cnVlXG4gICAgfVxuICAgIHJldHVybiBuZXdOb2RlXG4gIH0pXG4gIGlmIChqc2YuaGFzUm9vdFJlZmVyZW5jZSkge1xuICAgIGNvbnN0IGZ1bGxMYXlvdXQgPSBfLmNsb25lRGVlcChmb3JtTGF5b3V0KVxuICAgIGlmIChmdWxsTGF5b3V0W2Z1bGxMYXlvdXQubGVuZ3RoIC0gMV0udHlwZSA9PT0gJ3N1Ym1pdCcpIHtcbiAgICAgIGZ1bGxMYXlvdXQucG9wKClcbiAgICB9XG4gICAganNmLmxheW91dFJlZkxpYnJhcnlbJyddID0ge1xuICAgICAgX2lkOiBudWxsLFxuICAgICAgZGF0YVBvaW50ZXI6ICcnLFxuICAgICAgZGF0YVR5cGU6ICdvYmplY3QnLFxuICAgICAgaXRlbXM6IGZ1bGxMYXlvdXQsXG4gICAgICBuYW1lOiAnJyxcbiAgICAgIG9wdGlvbnM6IF8uY2xvbmVEZWVwKGpzZi5mb3JtT3B0aW9ucy5kZWZhdXRXaWRnZXRPcHRpb25zKSxcbiAgICAgIHJlY3Vyc2l2ZVJlZmVyZW5jZTogdHJ1ZSxcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6ICdzZWN0aW9uJyxcbiAgICAgIHdpZGdldDogd2lkZ2V0TGlicmFyeS5nZXRXaWRnZXQoJ3NlY3Rpb24nKSxcbiAgICB9XG4gIH1cbiAgaWYgKCFoYXNTdWJtaXRCdXR0b24pIHtcbiAgICBmb3JtTGF5b3V0LnB1c2goe1xuICAgICAgX2lkOiBfLnVuaXF1ZUlkKCksXG4gICAgICBvcHRpb25zOiB7dGl0bGU6ICdTdWJtaXQnfSxcbiAgICAgIHR5cGU6ICdzdWJtaXQnLFxuICAgICAgd2lkZ2V0OiB3aWRnZXRMaWJyYXJ5LmdldFdpZGdldCgnc3VibWl0JyksXG4gICAgfSlcbiAgfVxuICByZXR1cm4gZm9ybUxheW91dFxufVxuIl19