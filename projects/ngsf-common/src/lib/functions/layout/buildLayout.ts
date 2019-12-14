import {JsonPointer} from '../jsonpointer.functions'
import {inArray, isArray, isEmpty, isObject, isString} from '../validator'
import {fixTitle, forEach, hasOwn} from '../utility'
import {
  checkInlineType,
  getFromSchema,
  getInputType,
  isInputRequired,
  removeRecursiveReferences,
  updateInputOptions
} from '../json-schema'
import {buildLayoutFromSchema, getLayoutNode} from './buildLayoutFromSchema'
import {mapLayout} from './mapLayout'
import * as _ from 'lodash'

/**
 * 'buildLayout' function
 */
export function buildLayout(jsf: any, widgetLibrary: any): any[] {
  let hasSubmitButton = !JsonPointer.get(jsf, '/formOptions/addSubmit')
  const formLayout = mapLayout(jsf.layout, (layoutItem, index, layoutPointer) => {
    const currentIndex = index
    const newNode: any = {
      _id: _.uniqueId(),
      options: {},
    }
    if (isObject(layoutItem)) {
      Object.assign(newNode, layoutItem)
      Object.keys(newNode)
        .filter(option => !inArray(option, [
          '_id', '$ref', 'arrayItem', 'arrayItemType', 'dataPointer', 'dataType',
          'items', 'key', 'name', 'options', 'recursiveReference', 'type', 'widget'
        ]))
        .forEach(option => {
          newNode.options[option] = newNode[option]
          delete newNode[option]
        })
      if (!hasOwn(newNode, 'type') && isString(newNode.widget)) {
        newNode.type = newNode.widget
        delete newNode.widget
      }
      if (!hasOwn(newNode.options, 'title')) {
        if (hasOwn(newNode.options, 'legend')) {
          newNode.options.title = newNode.options.legend
          delete newNode.options.legend
        }
      }
      if (!hasOwn(newNode.options, 'validationMessages')) {
        if (hasOwn(newNode.options, 'errorMessages')) {
          newNode.options.validationMessages = newNode.options.errorMessages
          delete newNode.options.errorMessages

          // Convert Angular Schema Form (AngularJS) 'validationMessage' to
          // Angular JSON Schema Form 'validationMessages'
          // TV4 codes from https://github.com/geraintluff/tv4/blob/master/source/api.js
        } else if (hasOwn(newNode.options, 'validationMessage')) {
          if (typeof newNode.options.validationMessage === 'string') {
            newNode.options.validationMessages = newNode.options.validationMessage
          } else {
            newNode.options.validationMessages = {}
            Object.keys(newNode.options.validationMessage).forEach(key => {
              const code = key + ''
              const newKey =
                code === '0' ? 'type' :
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
                                                  code === '500' ? 'format' : code + ''
              newNode.options.validationMessages[newKey] = newNode.options.validationMessage[key]
            })
          }
          delete newNode.options.validationMessage
        }
      }
    } else if (JsonPointer.isJsonPointer(layoutItem)) {
      newNode.dataPointer = layoutItem
    } else if (isString(layoutItem)) {
      newNode.key = layoutItem
    } else {
      console.error('buildLayout error: Form layout element not recognized:')
      console.error(layoutItem)
      return null
    }
    let nodeSchema: any = null

    // If newNode does not have a dataPointer, try to find an equivalent
    if (!hasOwn(newNode, 'dataPointer')) {

      // If newNode has a key, change it to a dataPointer
      if (hasOwn(newNode, 'key')) {
        newNode.dataPointer = newNode.key === '*' ? newNode.key :
          JsonPointer.compile(JsonPointer.parseObjectPath(newNode.key), '-')
        delete newNode.key

        // If newNode is an array, search for dataPointer in child nodes
      } else if (hasOwn(newNode, 'type') && newNode.type.slice(-5) === 'array') {
        const findDataPointer = (items) => {
          if (items === null || typeof items !== 'object') {
            return
          }
          if (hasOwn(items, 'dataPointer')) {
            return items.dataPointer
          }
          if (isArray(items.items)) {
            for (const item of items.items) {
              if (hasOwn(item, 'dataPointer') && item.dataPointer.indexOf('/-') !== -1) {
                return item.dataPointer
              }
              if (hasOwn(item, 'items')) {
                const searchItem = findDataPointer(item)
                if (searchItem) {
                  return searchItem
                }
              }
            }
          }
        }
        const childDataPointer = findDataPointer(newNode)
        if (childDataPointer) {
          newNode.dataPointer =
            childDataPointer.slice(0, childDataPointer.lastIndexOf('/-'))
        }
      }
    }

    if (hasOwn(newNode, 'dataPointer')) {
      if (newNode.dataPointer === '*') {
        return buildLayoutFromSchema(jsf, widgetLibrary, jsf.formValues)
      }
      const nodeValue =
        JsonPointer.get(jsf.formValues, newNode.dataPointer.replace(/\/-/g, '/1'))

      // TODO: Create function getFormValues(jsf, dataPointer, forRefLibrary)
      // check formOptions.setSchemaDefaults and formOptions.setLayoutDefaults
      // then set apropriate values from initialVaues, schema, or layout

      newNode.dataPointer =
        JsonPointer.toGenericPointer(newNode.dataPointer, jsf.arrayMap)
      const LastKey = JsonPointer.toKey(newNode.dataPointer)
      if (!newNode.name && isString(LastKey) && LastKey !== '-') {
        newNode.name = LastKey
      }
      const shortDataPointer = removeRecursiveReferences(
        newNode.dataPointer, jsf.dataRecursiveRefMap, jsf.arrayMap
      )
      const recursive = !shortDataPointer.length ||
        shortDataPointer !== newNode.dataPointer
      let schemaPointer: string
      if (!jsf.dataMap.has(shortDataPointer)) {
        jsf.dataMap.set(shortDataPointer, new Map())
      }
      const nodeDataMap = jsf.dataMap.get(shortDataPointer)
      if (nodeDataMap.has('schemaPointer')) {
        schemaPointer = nodeDataMap.get('schemaPointer')
      } else {
        schemaPointer = JsonPointer.toSchemaPointer(shortDataPointer, jsf.schema) as any
        nodeDataMap.set('schemaPointer', schemaPointer)
      }
      nodeDataMap.set('disabled', !!newNode.options.disabled)
      nodeSchema = JsonPointer.get(jsf.schema, schemaPointer)
      if (nodeSchema) {
        if (!hasOwn(newNode, 'type')) {
          newNode.type = getInputType(nodeSchema, newNode)
        } else if (!widgetLibrary.hasWidget(newNode.type)) {
          const oldWidgetType = newNode.type
          newNode.type = getInputType(nodeSchema, newNode)
          console.error(`error: widget type "${oldWidgetType}" ` +
            `not found in library. Replacing with "${newNode.type}".`)
        } else {
          newNode.type = checkInlineType(newNode.type, nodeSchema, newNode)
        }
        if (nodeSchema.type === 'object' && isArray(nodeSchema.required)) {
          nodeDataMap.set('required', nodeSchema.required)
        }
        newNode.dataType =
          nodeSchema.type || (hasOwn(nodeSchema, '$ref') ? '$ref' : null)
        updateInputOptions(newNode, nodeSchema, jsf)

        // Present checkboxes as single control, rather than array
        if (newNode.type === 'checkboxes' && hasOwn(nodeSchema, 'items')) {
          updateInputOptions(newNode, nodeSchema.items, jsf)
        } else if (newNode.dataType === 'array') {
          newNode.options.maxItems = Math.min(
            nodeSchema.maxItems || 1000, newNode.options.maxItems || 1000
          )
          newNode.options.minItems = Math.max(
            nodeSchema.minItems || 0, newNode.options.minItems || 0
          )
          newNode.options.listItems = Math.max(
            newNode.options.listItems || 0, isArray(nodeValue) ? nodeValue.length : 0
          )
          newNode.options.tupleItems =
            isArray(nodeSchema.items) ? nodeSchema.items.length : 0
          if (newNode.options.maxItems < newNode.options.tupleItems) {
            newNode.options.tupleItems = newNode.options.maxItems
            newNode.options.listItems = 0
          } else if (newNode.options.maxItems <
            newNode.options.tupleItems + newNode.options.listItems
          ) {
            newNode.options.listItems =
              newNode.options.maxItems - newNode.options.tupleItems
          } else if (newNode.options.minItems >
            newNode.options.tupleItems + newNode.options.listItems
          ) {
            newNode.options.listItems =
              newNode.options.minItems - newNode.options.tupleItems
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
        }
        if (isInputRequired(jsf.schema, schemaPointer)) {
          newNode.options.required = true
          jsf.fieldsRequired = true
        }
      } else {
        // TODO: create item in FormGroup model from layout key (?)
        updateInputOptions(newNode, {}, jsf)
      }

      if (!newNode.options.title && !/^\d+$/.test(newNode.name)) {
        newNode.options.title = fixTitle(newNode.name)
      }

      if (hasOwn(newNode.options, 'copyValueTo')) {
        if (typeof newNode.options.copyValueTo === 'string') {
          newNode.options.copyValueTo = [newNode.options.copyValueTo]
        }
        if (isArray(newNode.options.copyValueTo)) {
          newNode.options.copyValueTo = newNode.options.copyValueTo.map(item =>
            JsonPointer.compile(JsonPointer.parseObjectPath(item), '-')
          )
        }
      }

      newNode.widget = widgetLibrary.getWidget(newNode.type)
      nodeDataMap.set('inputType', newNode.type)
      nodeDataMap.set('widget', newNode.widget)

      if (newNode.dataType === 'array' &&
        (hasOwn(newNode, 'items') || hasOwn(newNode, 'additionalItems'))
      ) {
        const itemRefPointer = removeRecursiveReferences(
          newNode.dataPointer + '/-', jsf.dataRecursiveRefMap, jsf.arrayMap
        )
        if (!jsf.dataMap.has(itemRefPointer)) {
          jsf.dataMap.set(itemRefPointer, new Map())
        }
        jsf.dataMap.get(itemRefPointer).set('inputType', 'section')

        // Fix insufficiently nested array item groups
        if (newNode.items.length > 1) {
          const arrayItemGroup = []
          const arrayItemGroupTemplate = []
          let newIndex = 0
          for (let i = newNode.items.length - 1; i >= 0; i--) {
            const subItem = newNode.items[i]
            if (hasOwn(subItem, 'dataPointer') &&
              subItem.dataPointer.slice(0, itemRefPointer.length) === itemRefPointer
            ) {
              const arrayItem = newNode.items.splice(i, 1)[0]
              arrayItem.dataPointer = newNode.dataPointer + '/-' +
                arrayItem.dataPointer.slice(itemRefPointer.length)
              arrayItemGroup.unshift(arrayItem)
              newIndex++
            } else {
              subItem.arrayItem = true
              // TODO: Check schema to get arrayItemType and removable
              subItem.arrayItemType = 'list'
              subItem.removable = newNode.options.removable !== false
            }
          }
          if (arrayItemGroup.length) {
            newNode.items.push({
              _id: _.uniqueId(),
              arrayItem: true,
              arrayItemType: newNode.options.tupleItems > newNode.items.length ?
                'tuple' : 'list',
              items: arrayItemGroup,
              options: {removable: newNode.options.removable !== false,},
              dataPointer: newNode.dataPointer + '/-',
              type: 'section',
              widget: widgetLibrary.getWidget('section'),
            })
          }
        } else {
          // TODO: Fix to hndle multiple items
          newNode.items[0].arrayItem = true
          if (!newNode.items[0].dataPointer) {
            newNode.items[0].dataPointer =
              JsonPointer.toGenericPointer(itemRefPointer, jsf.arrayMap)
          }
          if (!JsonPointer.has(newNode, '/items/0/options/removable')) {
            newNode.items[0].options.removable = true
          }
          if (newNode.options.orderable === false) {
            newNode.items[0].options.orderable = false
          }
          newNode.items[0].arrayItemType =
            newNode.options.tupleItems ? 'tuple' : 'list'
        }

        if (isArray(newNode.items)) {
          const arrayListItems =
            newNode.items.filter(item => item.type !== '$ref').length -
            newNode.options.tupleItems
          if (arrayListItems > newNode.options.listItems) {
            newNode.options.listItems = arrayListItems
            nodeDataMap.set('listItems', arrayListItems)
          }
        }

        if (!hasOwn(jsf.layoutRefLibrary, itemRefPointer)) {
          jsf.layoutRefLibrary[itemRefPointer] =
            _.cloneDeep(newNode.items[newNode.items.length - 1])
          if (recursive) {
            jsf.layoutRefLibrary[itemRefPointer].recursiveReference = true
          }
          forEach(jsf.layoutRefLibrary[itemRefPointer], (item, key) => {
            if (hasOwn(item, '_id')) {
              item._id = null
            }
            if (recursive) {
              if (hasOwn(item, 'dataPointer')) {
                item.dataPointer = item.dataPointer.slice(itemRefPointer.length)
              }
            }
          }, 'top-down')
        }

        // Add any additional default items
        if (!newNode.recursiveReference || newNode.options.required) {
          const arrayLength = Math.min(Math.max(
            newNode.options.tupleItems + newNode.options.listItems,
            isArray(nodeValue) ? nodeValue.length : 0
          ), newNode.options.maxItems)
          for (let i = newNode.items.length; i < arrayLength; i++) {
            newNode.items.push(getLayoutNode({
              $ref: itemRefPointer,
              dataPointer: newNode.dataPointer,
              recursiveReference: newNode.recursiveReference,
            }, jsf, widgetLibrary))
          }
        }

        // If needed, add button to add items to array
        if (newNode.options.addable !== false &&
          newNode.options.minItems < newNode.options.maxItems &&
          (newNode.items[newNode.items.length - 1] || {}).type !== '$ref'
        ) {
          let buttonText = 'Add'
          if (newNode.options.title) {
            if (/^add\b/i.test(newNode.options.title)) {
              buttonText = newNode.options.title
            } else {
              buttonText += ' ' + newNode.options.title
            }
          } else if (newNode.name && !/^\d+$/.test(newNode.name)) {
            if (/^add\b/i.test(newNode.name)) {
              buttonText += ' ' + fixTitle(newNode.name)
            } else {
              buttonText = fixTitle(newNode.name)
            }

            // If newNode doesn't have a title, look for title of parent array item
          } else {
            const parentSchema =
              getFromSchema(jsf.schema, newNode.dataPointer, 'parentSchema')
            if (hasOwn(parentSchema, 'title')) {
              buttonText += ' to ' + parentSchema.title
            } else {
              const pointerArray = JsonPointer.parse(newNode.dataPointer)
              buttonText += ' to ' + fixTitle(pointerArray[pointerArray.length - 2])
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
          })
          if (isString(JsonPointer.get(newNode, '/style/add'))) {
            newNode.items[newNode.items.length - 1].options.fieldStyle =
              newNode.style.add
            delete newNode.style.add
            if (isEmpty(newNode.style)) {
              delete newNode.style
            }
          }
        }
      } else {
        newNode.arrayItem = false
      }
    } else if (hasOwn(newNode, 'type') || hasOwn(newNode, 'items')) {
      const parentType: string =
        JsonPointer.get(jsf.layout, layoutPointer, 0, -2).type
      if (!hasOwn(newNode, 'type')) {
        newNode.type =
          inArray(parentType, ['tabs', 'tabarray']) ? 'tab' : 'array'
      }
      newNode.arrayItem = parentType === 'array'
      newNode.widget = widgetLibrary.getWidget(newNode.type)
      updateInputOptions(newNode, {}, jsf)
    }
    if (newNode.type === 'submit') {
      hasSubmitButton = true
    }
    return newNode
  })
  if (jsf.hasRootReference) {
    const fullLayout = _.cloneDeep(formLayout)
    if (fullLayout[fullLayout.length - 1].type === 'submit') {
      fullLayout.pop()
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
    }
  }
  if (!hasSubmitButton) {
    formLayout.push({
      _id: _.uniqueId(),
      options: {title: 'Submit'},
      type: 'submit',
      widget: widgetLibrary.getWidget('submit'),
    })
  }
  return formLayout
}
