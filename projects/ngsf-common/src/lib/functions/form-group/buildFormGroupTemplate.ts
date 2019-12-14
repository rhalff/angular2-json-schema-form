import {JsonPointer} from '../jsonpointer.functions'
import {isArray, isDefined, isEmpty, isObject, isPrimitive} from '../validator'
import {hasOwn} from '../utility'
import {getControlValidators, removeRecursiveReferences} from '../json-schema'
import {setRequiredFields} from './setRequiredFields'
import * as _ from 'lodash'

/**
 * 'buildFormGroupTemplate' function
 *
 * Builds a template for an Angular FormGroup from a JSON Schema.
 *
 * TODO: add support for pattern properties
 * https://spacetelescope.github.io/understanding-json-schema/reference/object.html
 */
export function buildFormGroupTemplate(
  jsf: any,
  nodeValue: any = null,
  setValues = true,
  schemaPointer = '',
  dataPointer = '',
  templatePointer = ''
) {
  const schema = JsonPointer.get(jsf.schema, schemaPointer)
  if (setValues) {
    if (!isDefined(nodeValue) && (
      jsf.formOptions.setSchemaDefaults === true ||
      (jsf.formOptions.setSchemaDefaults === 'auto' && isEmpty(jsf.formValues))
    )) {
      nodeValue = JsonPointer.get(jsf.schema, schemaPointer + '/default')
    }
  } else {
    nodeValue = null
  }
  // TODO: If nodeValue still not set, check layout for default value
  const schemaType: string | string[] = JsonPointer.get(schema, '/type')
  const controlType =
    (hasOwn(schema, 'properties') || hasOwn(schema, 'additionalProperties')) &&
    schemaType === 'object' ? 'FormGroup' :
      (hasOwn(schema, 'items') || hasOwn(schema, 'additionalItems')) &&
      schemaType === 'array' ? 'FormArray' :
        !schemaType && hasOwn(schema, '$ref') ? '$ref' : 'FormControl'
  const shortDataPointer =
    removeRecursiveReferences(dataPointer, jsf.dataRecursiveRefMap, jsf.arrayMap)
  if (!jsf.dataMap.has(shortDataPointer)) {
    jsf.dataMap.set(shortDataPointer, new Map())
  }
  const nodeOptions = jsf.dataMap.get(shortDataPointer)
  if (!nodeOptions.has('schemaType')) {
    nodeOptions.set('schemaPointer', schemaPointer)
    nodeOptions.set('schemaType', schema.type)
    if (schema.format) {
      nodeOptions.set('schemaFormat', schema.format)
      if (!schema.type) {
        nodeOptions.set('schemaType', 'string')
      }
    }
    if (controlType) {
      nodeOptions.set('templatePointer', templatePointer)
      nodeOptions.set('templateType', controlType)
    }
  }
  let controls: any
  const validators = getControlValidators(schema)
  switch (controlType) {
    case 'FormGroup':
      controls = {}
      if (hasOwn(schema, 'ui:order') || hasOwn(schema, 'properties')) {
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
          .forEach(key => controls[key] = buildFormGroupTemplate(
            jsf, JsonPointer.get(nodeValue, [key]), setValues,
            schemaPointer + (hasOwn(schema.properties, key) ?
              '/properties/' + key : '/additionalProperties'
            ),
            dataPointer + '/' + key,
            templatePointer + '/controls/' + key
          ))
        jsf.formOptions.fieldsRequired = setRequiredFields(schema, controls)
      }
      return {controlType, controls, validators}

    case 'FormArray':
      controls = []
      const minItems =
        Math.max(schema.minItems || 0, nodeOptions.get('minItems') || 0)
      const maxItems =
        Math.min(schema.maxItems || 1000, nodeOptions.get('maxItems') || 1000)
      let additionalItemsPointer: string = null
      if (isArray(schema.items)) { // 'items' is an array = tuple items
        const tupleItems = nodeOptions.get('tupleItems') ||
          (isArray(schema.items) ? Math.min(schema.items.length, maxItems) : 0)
        for (let i = 0; i < tupleItems; i++) {
          if (i < minItems) {
            controls.push(buildFormGroupTemplate(
              jsf, isArray(nodeValue) ? nodeValue[i] : nodeValue, setValues,
              schemaPointer + '/items/' + i,
              dataPointer + '/' + i,
              templatePointer + '/controls/' + i
            ))
          } else {
            const schemaRefPointer = removeRecursiveReferences(
              schemaPointer + '/items/' + i, jsf.schemaRecursiveRefMap
            )
            const itemRefPointer = removeRecursiveReferences(
              shortDataPointer + '/' + i, jsf.dataRecursiveRefMap, jsf.arrayMap
            )
            const itemRecursive = itemRefPointer !== shortDataPointer + '/' + i
            if (!hasOwn(jsf.templateRefLibrary, itemRefPointer)) {
              jsf.templateRefLibrary[itemRefPointer] = null
              jsf.templateRefLibrary[itemRefPointer] = buildFormGroupTemplate(
                jsf, null, setValues,
                schemaRefPointer,
                itemRefPointer,
                templatePointer + '/controls/' + i
              )
            }
            controls.push(
              isArray(nodeValue) ?
                buildFormGroupTemplate(
                  jsf, nodeValue[i], setValues,
                  schemaPointer + '/items/' + i,
                  dataPointer + '/' + i,
                  templatePointer + '/controls/' + i
                ) :
                itemRecursive ?
                  null : _.cloneDeep(jsf.templateRefLibrary[itemRefPointer])
            )
          }
        }

        // If 'additionalItems' is an object = additional list items (after tuple items)
        if (schema.items.length < maxItems && isObject(schema.additionalItems)) {
          additionalItemsPointer = schemaPointer + '/additionalItems'
        }

        // If 'items' is an object = list items only (no tuple items)
      } else {
        additionalItemsPointer = schemaPointer + '/items'
      }

      if (additionalItemsPointer) {
        const schemaRefPointer = removeRecursiveReferences(
          additionalItemsPointer, jsf.schemaRecursiveRefMap
        )
        const itemRefPointer = removeRecursiveReferences(
          shortDataPointer + '/-', jsf.dataRecursiveRefMap, jsf.arrayMap
        )
        const itemRecursive = itemRefPointer !== shortDataPointer + '/-'
        if (!hasOwn(jsf.templateRefLibrary, itemRefPointer)) {
          jsf.templateRefLibrary[itemRefPointer] = null
          jsf.templateRefLibrary[itemRefPointer] = buildFormGroupTemplate(
            jsf, null, setValues,
            schemaRefPointer,
            itemRefPointer,
            templatePointer + '/controls/-'
          )
        }
        // const itemOptions = jsf.dataMap.get(itemRefPointer) || new Map();
        const itemOptions = nodeOptions
        if (!itemRecursive || hasOwn(validators, 'required')) {
          const arrayLength = Math.min(Math.max(
            itemRecursive ? 0 :
              (itemOptions.get('tupleItems') + itemOptions.get('listItems')) || 0,
            isArray(nodeValue) ? nodeValue.length : 0
          ), maxItems)
          for (let i = controls.length; i < arrayLength; i++) {
            controls.push(
              isArray(nodeValue) ?
                buildFormGroupTemplate(
                  jsf, nodeValue[i], setValues,
                  schemaRefPointer,
                  dataPointer + '/-',
                  templatePointer + '/controls/-'
                ) :
                itemRecursive ?
                  null : _.cloneDeep(jsf.templateRefLibrary[itemRefPointer])
            )
          }
        }
      }
      return {controlType, controls, validators}

    case '$ref':
      const schemaRef = JsonPointer.compile(schema.$ref)
      const dataRef = JsonPointer.toDataPointer(schemaRef, schema)
      const refPointer = removeRecursiveReferences(
        dataRef, jsf.dataRecursiveRefMap, jsf.arrayMap
      )
      if (refPointer && !hasOwn(jsf.templateRefLibrary, refPointer)) {
        // Set to null first to prevent recursive reference from causing endless loop
        jsf.templateRefLibrary[refPointer] = null
        const newTemplate = buildFormGroupTemplate(jsf, setValues, setValues, schemaRef)
        if (newTemplate) {
          jsf.templateRefLibrary[refPointer] = newTemplate
        } else {
          delete jsf.templateRefLibrary[refPointer]
        }
      }
      return null

    case 'FormControl':
      const value = {
        value: setValues && isPrimitive(nodeValue) ? nodeValue : null,
        disabled: nodeOptions.get('disabled') || false
      }
      return {controlType, value, validators}

    default:
      return null
  }
}
