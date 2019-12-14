import {JsonPointer} from '../jsonpointer.functions'
import {fixTitle, hasOwn} from '../utility'
import {getInputType, isInputRequired, removeRecursiveReferences, updateInputOptions} from '../json-schema'
import {isArray, isDefined, isEmpty, isNumber, isObject} from '../validator'
import * as _ from 'lodash'
/**
 * 'getLayoutNode' function
 * Copy a new layoutNode from layoutRefLibrary
 */
export function getLayoutNode(
  refNode: any,
  jsf: any,
  widgetLibrary: any = null,
  nodeValue: any = null
) {

  // If recursive reference and building initial layout, return Add button
  if (refNode.recursiveReference && widgetLibrary) {
    const newLayoutNode = _.cloneDeep(refNode)
    if (!newLayoutNode.options) {
      newLayoutNode.options = {}
    }
    Object.assign(newLayoutNode, {
      recursiveReference: true,
      widget: widgetLibrary.getWidget('$ref'),
    })
    Object.assign(newLayoutNode.options, {
      removable: false,
      title: 'Add ' + newLayoutNode.$ref,
    })
    return newLayoutNode

    // Otherwise, return referenced layout
  } else {
    let newLayoutNode = jsf.layoutRefLibrary[refNode.$ref]
    // If value defined, build new node from schema (to set array lengths)
    if (isDefined(nodeValue)) {
      newLayoutNode = buildLayoutFromSchema(
        jsf, widgetLibrary, nodeValue,
        JsonPointer.toSchemaPointer(refNode.$ref, jsf.schema) as any,
        refNode.$ref, newLayoutNode.arrayItem,
        newLayoutNode.arrayItemType, newLayoutNode.options.removable, false
      )
    } else {
      // If value not defined, copy node from layoutRefLibrary
      newLayoutNode = _.cloneDeep(newLayoutNode)
      JsonPointer.forEachDeep(newLayoutNode, (subNode, pointer) => {

        // Reset all _id's in newLayoutNode to unique values
        if (hasOwn(subNode, '_id')) {
          subNode._id = _.uniqueId()
        }

        // If adding a recursive item, prefix current dataPointer
        // to all dataPointers in new layoutNode
        if (refNode.recursiveReference && hasOwn(subNode, 'dataPointer')) {
          subNode.dataPointer = refNode.dataPointer + subNode.dataPointer
        }
      })
    }
    return newLayoutNode
  }
}
/**
 * 'buildLayoutFromSchema' function
 */
export function buildLayoutFromSchema(
  jsf: any,
  widgetLibrary: any,
  nodeValue: any = null,
  schemaPointer: string = '',
  dataPointer: string = '',
  arrayItem: boolean = false,
  arrayItemType: string = null,
  removable: boolean = null,
  forRefLibrary: boolean = false,
  dataPointerPrefix: string = ''
) {
  const schema = JsonPointer.get(jsf.schema, schemaPointer)
  if (!hasOwn(schema, 'type') && !hasOwn(schema, '$ref') &&
    !hasOwn(schema, 'x-schema-form')
  ) {
    return null
  }
  const newNodeType: string = getInputType(schema)
  if (!isDefined(nodeValue) && (
    jsf.formOptions.setSchemaDefaults === true ||
    (jsf.formOptions.setSchemaDefaults === 'auto' && isEmpty(jsf.formValues))
  )) {
    nodeValue = JsonPointer.get(jsf.schema, schemaPointer + '/default')
  }
  let newNode: any = {
    _id: forRefLibrary ? null : _.uniqueId(),
    arrayItem,
    dataPointer: JsonPointer.toGenericPointer(dataPointer, jsf.arrayMap),
    dataType: schema.type || (hasOwn(schema, '$ref') ? '$ref' : null),
    options: {},
    required: isInputRequired(jsf.schema, schemaPointer),
    type: newNodeType,
    widget: widgetLibrary.getWidget(newNodeType),
  }
  const lastDataKey = JsonPointer.toKey(newNode.dataPointer)
  if (lastDataKey !== '-') {
    newNode.name = lastDataKey
  }
  if (newNode.arrayItem) {
    newNode.arrayItemType = arrayItemType
    newNode.options.removable = removable !== false
  }
  const shortDataPointer = removeRecursiveReferences(
    dataPointerPrefix + dataPointer, jsf.dataRecursiveRefMap, jsf.arrayMap
  )
  const recursive = !shortDataPointer.length ||
    shortDataPointer !== dataPointerPrefix + dataPointer
  if (!jsf.dataMap.has(shortDataPointer)) {
    jsf.dataMap.set(shortDataPointer, new Map())
  }
  const nodeDataMap = jsf.dataMap.get(shortDataPointer)
  if (!nodeDataMap.has('inputType')) {
    nodeDataMap.set('schemaPointer', schemaPointer)
    nodeDataMap.set('inputType', newNode.type)
    nodeDataMap.set('widget', newNode.widget)
    nodeDataMap.set('disabled', !!newNode.options.disabled)
  }
  updateInputOptions(newNode, schema, jsf)
  if (!newNode.options.title && newNode.name && !/^\d+$/.test(newNode.name)) {
    newNode.options.title = fixTitle(newNode.name)
  }

  if (newNode.dataType === 'object') {
    if (isArray(schema.required) && !nodeDataMap.has('required')) {
      nodeDataMap.set('required', schema.required)
    }
    if (isObject(schema.properties)) {
      const newSection: any[] = []
      const propertyKeys = schema['ui:order'] || Object.keys(schema.properties)
      if (propertyKeys.includes('*') && !hasOwn(schema.properties, '*')) {
        const unnamedKeys = Object.keys(schema.properties)
          .filter(key => !propertyKeys.includes(key))
        for (let i = propertyKeys.length - 1; i >= 0; i--) {
          if (propertyKeys[i] === '*') {
            propertyKeys.splice(i, 1, ...unnamedKeys)
          }
        }
      }
      propertyKeys
        .filter(key => hasOwn(schema.properties, key) ||
          hasOwn(schema, 'additionalProperties')
        )
        .forEach(key => {
          const keySchemaPointer = hasOwn(schema.properties, key) ?
            '/properties/' + key : '/additionalProperties'
          const innerItem = buildLayoutFromSchema(
            jsf, widgetLibrary, isObject(nodeValue) ? nodeValue[key] : null,
            schemaPointer + keySchemaPointer,
            dataPointer + '/' + key,
            false, null, null, forRefLibrary, dataPointerPrefix
          )
          if (innerItem) {
            if (isInputRequired(schema, '/' + key)) {
              innerItem.options.required = true
              jsf.fieldsRequired = true
            }
            newSection.push(innerItem)
          }
        })
      if (dataPointer === '' && !forRefLibrary) {
        newNode = newSection
      } else {
        newNode.items = newSection
      }
    }
    // TODO: Add patternProperties and additionalProperties inputs?
    // ... possibly provide a way to enter both key names and values?
    // if (isObject(schema.patternProperties)) { }
    // if (isObject(schema.additionalProperties)) { }

  } else if (newNode.dataType === 'array') {
    newNode.items = []
    const templateArray: any[] = []
    newNode.options.maxItems = Math.min(
      schema.maxItems || 1000, newNode.options.maxItems || 1000
    )
    newNode.options.minItems = Math.max(
      schema.minItems || 0, newNode.options.minItems || 0
    )
    if (!newNode.options.minItems && isInputRequired(jsf.schema, schemaPointer)) {
      newNode.options.minItems = 1
    }
    if (!hasOwn(newNode.options, 'listItems')) {
      newNode.options.listItems = 1
    }
    newNode.options.tupleItems = isArray(schema.items) ? schema.items.length : 0
    if (newNode.options.maxItems <= newNode.options.tupleItems) {
      newNode.options.tupleItems = newNode.options.maxItems
      newNode.options.listItems = 0
    } else if (newNode.options.maxItems <
      newNode.options.tupleItems + newNode.options.listItems
    ) {
      newNode.options.listItems = newNode.options.maxItems - newNode.options.tupleItems
    } else if (newNode.options.minItems >
      newNode.options.tupleItems + newNode.options.listItems
    ) {
      newNode.options.listItems = newNode.options.minItems - newNode.options.tupleItems
    }
    if (!nodeDataMap.has('maxItems')) {
      nodeDataMap.set('maxItems', newNode.options.maxItems)
      nodeDataMap.set('minItems', newNode.options.minItems)
      nodeDataMap.set('tupleItems', newNode.options.tupleItems)
      nodeDataMap.set('listItems', newNode.options.listItems)
    }
    if (!jsf.arrayMap.has(shortDataPointer)) {
      jsf.arrayMap.set(shortDataPointer, newNode.options.tupleItems)
    }
    removable = newNode.options.removable !== false
    let additionalItemsSchemaPointer: string = null

    // If 'items' is an array = tuple items
    if (isArray(schema.items)) {
      newNode.items = []
      for (let i = 0; i < newNode.options.tupleItems; i++) {
        let newItem: any
        const itemRefPointer = removeRecursiveReferences(
          shortDataPointer + '/' + i, jsf.dataRecursiveRefMap, jsf.arrayMap
        )
        const itemRecursive = !itemRefPointer.length ||
          itemRefPointer !== shortDataPointer + '/' + i

        // If removable, add tuple item layout to layoutRefLibrary
        if (removable && i >= newNode.options.minItems) {
          if (!hasOwn(jsf.layoutRefLibrary, itemRefPointer)) {
            // Set to null first to prevent recursive reference from causing endless loop
            jsf.layoutRefLibrary[itemRefPointer] = null
            jsf.layoutRefLibrary[itemRefPointer] = buildLayoutFromSchema(
              jsf, widgetLibrary, isArray(nodeValue) ? nodeValue[i] : null,
              schemaPointer + '/items/' + i,
              itemRecursive ? '' : dataPointer + '/' + i,
              true, 'tuple', true, true, itemRecursive ? dataPointer + '/' + i : ''
            )
            if (itemRecursive) {
              jsf.layoutRefLibrary[itemRefPointer].recursiveReference = true
            }
          }
          newItem = getLayoutNode({
            $ref: itemRefPointer,
            dataPointer: dataPointer + '/' + i,
            recursiveReference: itemRecursive,
          }, jsf, widgetLibrary, isArray(nodeValue) ? nodeValue[i] : null)
        } else {
          newItem = buildLayoutFromSchema(
            jsf, widgetLibrary, isArray(nodeValue) ? nodeValue[i] : null,
            schemaPointer + '/items/' + i,
            dataPointer + '/' + i,
            true, 'tuple', false, forRefLibrary, dataPointerPrefix
          )
        }
        if (newItem) {
          newNode.items.push(newItem)
        }
      }

      // If 'additionalItems' is an object = additional list items, after tuple items
      if (isObject(schema.additionalItems)) {
        additionalItemsSchemaPointer = schemaPointer + '/additionalItems'
      }

      // If 'items' is an object = list items only (no tuple items)
    } else if (isObject(schema.items)) {
      additionalItemsSchemaPointer = schemaPointer + '/items'
    }

    if (additionalItemsSchemaPointer) {
      const itemRefPointer = removeRecursiveReferences(
        shortDataPointer + '/-', jsf.dataRecursiveRefMap, jsf.arrayMap
      )
      const itemRecursive = !itemRefPointer.length ||
        itemRefPointer !== shortDataPointer + '/-'
      const itemSchemaPointer = removeRecursiveReferences(
        additionalItemsSchemaPointer, jsf.schemaRecursiveRefMap, jsf.arrayMap
      )
      // Add list item layout to layoutRefLibrary
      if (itemRefPointer.length && !hasOwn(jsf.layoutRefLibrary, itemRefPointer)) {
        // Set to null first to prevent recursive reference from causing endless loop
        jsf.layoutRefLibrary[itemRefPointer] = null
        jsf.layoutRefLibrary[itemRefPointer] = buildLayoutFromSchema(
          jsf, widgetLibrary, null,
          itemSchemaPointer,
          itemRecursive ? '' : dataPointer + '/-',
          true, 'list', removable, true, itemRecursive ? dataPointer + '/-' : ''
        )
        if (itemRecursive) {
          jsf.layoutRefLibrary[itemRefPointer].recursiveReference = true
        }
      }

      // Add any additional default items
      if (!itemRecursive || newNode.options.required) {
        const arrayLength = Math.min(Math.max(
          itemRecursive ? 0 :
            newNode.options.tupleItems + newNode.options.listItems,
          isArray(nodeValue) ? nodeValue.length : 0
        ), newNode.options.maxItems)
        if (newNode.items.length < arrayLength) {
          for (let i = newNode.items.length; i < arrayLength; i++) {
            newNode.items.push(getLayoutNode({
              $ref: itemRefPointer,
              dataPointer: dataPointer + '/-',
              recursiveReference: itemRecursive,
            }, jsf, widgetLibrary, isArray(nodeValue) ? nodeValue[i] : null))
          }
        }
      }

      // If needed, add button to add items to array
      if (newNode.options.addable !== false &&
        newNode.options.minItems < newNode.options.maxItems &&
        (newNode.items[newNode.items.length - 1] || {}).type !== '$ref'
      ) {
        let buttonText =
          ((jsf.layoutRefLibrary[itemRefPointer] || {}).options || {}).title
        const prefix = buttonText ? 'Add ' : 'Add to '
        if (!buttonText) {
          buttonText = schema.title || fixTitle(JsonPointer.toKey(dataPointer))
        }
        if (!/^add\b/i.test(buttonText)) {
          buttonText = prefix + buttonText
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
        })
      }
    }

  } else if (newNode.dataType === '$ref') {
    const schemaRef = JsonPointer.compile(schema.$ref)
    const dataRef = JsonPointer.toDataPointer(schemaRef, jsf.schema) as any
    let buttonText = ''

    // Get newNode title
    if (newNode.options.add) {
      buttonText = newNode.options.add
    } else if (newNode.name && !/^\d+$/.test(newNode.name)) {
      buttonText =
        (/^add\b/i.test(newNode.name) ? '' : 'Add ') + fixTitle(newNode.name)

      // If newNode doesn't have a title, look for title of parent array item
    } else {
      const parentSchema =
        JsonPointer.get(jsf.schema, schemaPointer, 0, -1)
      if (hasOwn(parentSchema, 'title')) {
        buttonText = 'Add to ' + parentSchema.title
      } else {
        const pointerArray = JsonPointer.parse(newNode.dataPointer)
        buttonText = 'Add to ' + fixTitle(pointerArray[pointerArray.length - 2])
      }
    }
    Object.assign(newNode, {
      recursiveReference: true,
      widget: widgetLibrary.getWidget('$ref'),
      $ref: dataRef,
    })
    Object.assign(newNode.options, {
      removable: false,
      title: buttonText,
    })
    if (isNumber(JsonPointer.get(jsf.schema, schemaPointer, 0, -1).maxItems)) {
      newNode.options.maxItems =
        JsonPointer.get(jsf.schema, schemaPointer, 0, -1).maxItems
    }

    // Add layout template to layoutRefLibrary
    if (dataRef.length) {
      if (!hasOwn(jsf.layoutRefLibrary, dataRef)) {
        // Set to null first to prevent recursive reference from causing endless loop
        jsf.layoutRefLibrary[dataRef] = null
        const newLayout = buildLayoutFromSchema(
          jsf, widgetLibrary, null, schemaRef, '',
          newNode.arrayItem, newNode.arrayItemType, true, true, dataPointer
        )
        if (newLayout) {
          newLayout.recursiveReference = true
          jsf.layoutRefLibrary[dataRef] = newLayout
        } else {
          delete jsf.layoutRefLibrary[dataRef]
        }
      } else if (!jsf.layoutRefLibrary[dataRef].recursiveReference) {
        jsf.layoutRefLibrary[dataRef].recursiveReference = true
      }
    }
  }
  return newNode
}
