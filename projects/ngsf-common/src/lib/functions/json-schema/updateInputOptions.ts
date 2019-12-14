import {hasValue, isObject} from '../validator'
import {hasOwn, mergeFilteredObject} from '../utility'
import {JsonPointer} from '../jsonpointer.functions'
import {getTitleMapFromOneOf} from './getTitleMapFromOneOf'

/**
 * 'updateInputOptions' function
 */
export function updateInputOptions(
  layoutNode: any,
  schema: any,
  jsf: any
): void {
  if (!isObject(layoutNode) || !isObject(layoutNode.options)) {
    return
  }

  // Set all option values in layoutNode.options
  const newOptions: any = {}
  const fixUiKeys = key => key.slice(0, 3).toLowerCase() === 'ui:' ? key.slice(3) : key
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
  ].forEach(([object, excludeKeys]) =>
    mergeFilteredObject(newOptions, object, excludeKeys, fixUiKeys)
  )
  if (!hasOwn(newOptions, 'titleMap')) {
    let newTitleMap: any = null
    newTitleMap = getTitleMapFromOneOf(schema, newOptions.flatList)
    if (newTitleMap) {
      newOptions.titleMap = newTitleMap
    }
    if (!hasOwn(newOptions, 'titleMap') && !hasOwn(newOptions, 'enum') && hasOwn(schema, 'items')) {
      if (JsonPointer.has(schema, '/items/titleMap')) {
        newOptions.titleMap = schema.items.titleMap
      } else if (JsonPointer.has(schema, '/items/enum')) {
        newOptions.enum = schema.items.enum
        if (!hasOwn(newOptions, 'enumNames') && JsonPointer.has(schema, '/items/enumNames')) {
          newOptions.enumNames = schema.items.enumNames
        }
      } else if (JsonPointer.has(schema, '/items/oneOf')) {
        newTitleMap = getTitleMapFromOneOf(schema.items, newOptions.flatList)
        if (newTitleMap) {
          newOptions.titleMap = newTitleMap
        }
      }
    }
  }

  // If schema type is integer, enforce by setting multipleOf = 1
  if (schema.type === 'integer' && !hasValue(newOptions.multipleOf)) {
    newOptions.multipleOf = 1
  }

  // Copy any typeahead word lists to options.typeahead.source
  if (JsonPointer.has(newOptions, '/autocomplete/source')) {
    newOptions.typeahead = newOptions.autocomplete
  } else if (JsonPointer.has(newOptions, '/tagsinput/source')) {
    newOptions.typeahead = newOptions.tagsinput
  } else if (JsonPointer.has(newOptions, '/tagsinput/typeahead/source')) {
    newOptions.typeahead = newOptions.tagsinput.typeahead
  }

  layoutNode.options = newOptions
}
