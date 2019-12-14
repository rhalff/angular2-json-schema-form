import {JsonPointer, Pointer} from '../jsonpointer.functions'
import {isArray, isObject, isString} from '../validator'
import {mergeSchemas} from '../merge-schemas'
import {combineAllOf} from './combineAllOf'
import {fixRequiredArrayProperties} from './fixRequiredArrayProperties'
import {removeRecursiveReferences} from './removeRecursiveReferences'
import * as _ from 'lodash'

/**
 * 'getSubSchema' function
 */
export function getSubSchema(
  schema: any,
  pointerArg: Pointer | string,
  schemaRefLibrary: object = null,
  schemaRecursiveRefMap: Map<string, string> = null,
  usedPointers: string[] = []
) {
  if (!schemaRefLibrary || !schemaRecursiveRefMap) {
    return JsonPointer.getCopy(schema, pointerArg)
  }
  const pointer: string = typeof pointerArg !== 'string' ? JsonPointer.compile(pointerArg) : pointerArg

  usedPointers = [...usedPointers, pointer]
  let newSchema: any = null
  if (pointer === '') {
    newSchema = _.cloneDeep(schema)
  } else {
    const shortPointer = removeRecursiveReferences(pointer, schemaRecursiveRefMap)
    if (shortPointer !== pointer) {
      usedPointers = [...usedPointers, shortPointer]
    }
    newSchema = JsonPointer.getFirstCopy([
      [schemaRefLibrary, [shortPointer]],
      [schema, pointer],
      [schema, shortPointer]
    ])
  }
  return JsonPointer.forEachDeepCopy(newSchema, (subSchema, subPointer) => {
    if (isObject(subSchema)) {
      // Replace non-recursive $ref links with referenced schemas
      if (isString(subSchema.$ref)) {
        const refPointer = JsonPointer.compile(subSchema.$ref)
        if (refPointer.length && usedPointers.every(ptr =>
          !JsonPointer.isSubPointer(refPointer, ptr, true)
        )) {
          const refSchema = getSubSchema(
            schema, refPointer, schemaRefLibrary, schemaRecursiveRefMap, usedPointers
          )
          if (Object.keys(subSchema).length === 1) {
            return refSchema
          } else {
            const extraKeys = {...subSchema}
            delete extraKeys.$ref
            return mergeSchemas(refSchema, extraKeys)
          }
        }
      }

      // TODO: Convert schemas with 'type' arrays to 'oneOf'

      // Combine allOf subSchemas
      if (isArray(subSchema.allOf)) {
        return combineAllOf(subSchema)
      }

      // Fix incorrectly placed array object required lists
      if (subSchema.type === 'array' && isArray(subSchema.required)) {
        return fixRequiredArrayProperties(subSchema)
      }
    }
    return subSchema
  }, true, pointer)
}
