import {JsonPointer} from '../jsonpointer.functions'
import {inArray, isArray, isString} from '../validator'
import {hasOwn} from '../utility'
import {checkInlineType} from './checkInlineType'
import {getTitleMapFromOneOf} from './getTitleMapFromOneOf'

/**
 * 'getInputType' function
 */
export function getInputType(
  schema: any,
  layoutNode: any = null
): string {
  // x-schema-form = Angular Schema Form compatibility
  // widget & component = React Jsonschema Form compatibility
  const controlType = JsonPointer.getFirst([
    [schema, '/x-schema-form/type'],
    [schema, '/x-schema-form/widget/component'],
    [schema, '/x-schema-form/widget'],
    [schema, '/widget/component'],
    [schema, '/widget']
  ])
  if (isString(controlType)) {
    return checkInlineType(controlType, schema, layoutNode)
  }
  let schemaType = schema.type
  if (schemaType) {
    if (isArray(schemaType)) { // If multiple types listed, use most inclusive type
      schemaType =
        inArray('object', schemaType) && hasOwn(schema, 'properties') ? 'object' :
          inArray('array', schemaType) && hasOwn(schema, 'items') ? 'array' :
            inArray('array', schemaType) && hasOwn(schema, 'additionalItems') ? 'array' :
              inArray('string', schemaType) ? 'string' :
                inArray('number', schemaType) ? 'number' :
                  inArray('integer', schemaType) ? 'integer' :
                    inArray('boolean', schemaType) ? 'boolean' : 'unknown'
    }
    if (schemaType === 'boolean') {
      return 'checkbox'
    }
    if (schemaType === 'object') {
      if (hasOwn(schema, 'properties') || hasOwn(schema, 'additionalProperties')) {
        return 'section'
      }
      // TODO: Figure out how to handle additionalProperties
      if (hasOwn(schema, '$ref')) {
        return '$ref'
      }
    }
    if (schemaType === 'array') {
      const itemsObject = JsonPointer.getFirst([
        [schema, '/items'],
        [schema, '/additionalItems']
      ]) || {}
      return hasOwn(itemsObject, 'enum') && schema.maxItems !== 1 ?
        checkInlineType('checkboxes', schema, layoutNode) : 'array'
    }
    if (schemaType === 'null') {
      return 'none'
    }
    if (JsonPointer.has(layoutNode, '/options/titleMap') ||
      hasOwn(schema, 'enum') || getTitleMapFromOneOf(schema, null, true)
    ) {
      return 'select'
    }
    if (schemaType === 'number' || schemaType === 'integer') {
      return (schemaType === 'integer' || hasOwn(schema, 'multipleOf')) &&
      hasOwn(schema, 'maximum') && hasOwn(schema, 'minimum') ? 'range' : schemaType
    }
    if (schemaType === 'string') {
      return {
        color: 'color',
        date: 'date',
        'date-time': 'datetime-local',
        email: 'email',
        uri: 'url',
      }[schema.format] || 'text'
    }
  }
  if (hasOwn(schema, '$ref')) {
    return '$ref'
  }
  if (isArray(schema.oneOf) || isArray(schema.anyOf)) {
    return 'one-of'
  }
  console.error(`getInputType error: Unable to determine input type for ${schemaType}`)
  console.error('schema', schema)
  if (layoutNode) {
    console.error('layoutNode', layoutNode)
  }
  return 'none'
}
