import {isArray, isObject, isString} from '../validator'
import {JsonPointer} from '../jsonpointer.functions'
import {hasOwn} from '../utility'
import {getSubSchema} from './getSubSchema'
import {removeRecursiveReferences} from './removeRecursiveReferences'

/**
 * 'resolveSchemaReferences' function
 *
 * Find all $ref links in schema and save links and referenced schemas in
 * schemaRefLibrary, schemaRecursiveRefMap, and dataRecursiveRefMap
 */
export function resolveSchemaReferences(
  schema: any,
  schemaRefLibrary: any,
  schemaRecursiveRefMap: Map<string, string>,
  dataRecursiveRefMap: Map<string, string>,
  arrayMap: Map<string, number>
) {
  if (!isObject(schema)) {
    console.error('resolveSchemaReferences error: schema must be an object.')
    return
  }
  const refLinks = new Set<string>()
  const refMapSet = new Set<string>()
  const refMap = new Map<string, string>()
  const recursiveRefMap = new Map<string, string>()
  const refLibrary: any = {}

  // Search schema for all $ref links, and build full refLibrary
  JsonPointer.forEachDeep(schema, (subSchema, subSchemaPointer) => {
    if (hasOwn(subSchema, '$ref') && isString(subSchema.$ref)) {
      const refPointer = JsonPointer.compile(subSchema.$ref)
      refLinks.add(refPointer)
      refMapSet.add(subSchemaPointer + '~~' + refPointer)
      refMap.set(subSchemaPointer, refPointer)
    }
  })
  refLinks.forEach(ref => refLibrary[ref] = getSubSchema(schema, ref))

  // Follow all ref links and save in refMapSet,
  // to find any multi-link recursive refernces
  let checkRefLinks = true
  while (checkRefLinks) {
    checkRefLinks = false
    Array.from(refMap).forEach(([fromRef1, toRef1]) => Array.from(refMap)
      .filter(([fromRef2, toRef2]) =>
        JsonPointer.isSubPointer(toRef1, fromRef2, true) &&
        !JsonPointer.isSubPointer(toRef2, toRef1, true) &&
        !refMapSet.has(fromRef1 + fromRef2.slice(toRef1.length) + '~~' + toRef2)
      )
      .forEach(([fromRef2, toRef2]) => {
        refMapSet.add(fromRef1 + fromRef2.slice(toRef1.length) + '~~' + toRef2)
        checkRefLinks = true
      })
    )
  }

  // Build full recursiveRefMap
  // First pass - save all internally recursive refs from refMapSet
  Array.from(refMapSet)
    .map(refLink => refLink.split('~~'))
    .filter(([fromRef, toRef]) => JsonPointer.isSubPointer(toRef, fromRef))
    .forEach(([fromRef, toRef]) => recursiveRefMap.set(fromRef, toRef))
  // Second pass - create recursive versions of any other refs that link to recursive refs
  Array.from(refMap)
    .filter(([fromRef1, toRef1]) => Array.from(recursiveRefMap.keys())
      .every(fromRef2 => !JsonPointer.isSubPointer(fromRef1, fromRef2, true))
    )
    .forEach(([fromRef1, toRef1]) => Array.from(recursiveRefMap)
      .filter(([fromRef2, toRef2]) =>
        !recursiveRefMap.has(fromRef1 + fromRef2.slice(toRef1.length)) &&
        JsonPointer.isSubPointer(toRef1, fromRef2, true) &&
        !JsonPointer.isSubPointer(toRef1, fromRef1, true)
      )
      .forEach(([fromRef2, toRef2]) => recursiveRefMap.set(
        fromRef1 + fromRef2.slice(toRef1.length),
        fromRef1 + toRef2.slice(toRef1.length)
      ))
    )

  // Create compiled schema by replacing all non-recursive $ref links with
  // thieir linked schemas and, where possible, combining schemas in allOf arrays.
  let compiledSchema = {...schema}
  delete compiledSchema.definitions
  compiledSchema =
    getSubSchema(compiledSchema, '', refLibrary, recursiveRefMap)

  // Make sure all remaining schema $refs are recursive, and build final
  // schemaRefLibrary, schemaRecursiveRefMap, dataRecursiveRefMap, & arrayMap
  JsonPointer.forEachDeep(compiledSchema, (subSchema, subSchemaPointer) => {
    if (isString(subSchema.$ref)) {
      let refPointer = JsonPointer.compile(subSchema.$ref)
      if (!JsonPointer.isSubPointer(refPointer, subSchemaPointer, true)) {
        refPointer = removeRecursiveReferences(subSchemaPointer, recursiveRefMap)
        JsonPointer.set(compiledSchema, subSchemaPointer, {$ref: `#${refPointer}`})
      }
      if (!hasOwn(schemaRefLibrary, 'refPointer')) {
        schemaRefLibrary[refPointer] = !refPointer.length ? compiledSchema :
          getSubSchema(compiledSchema, refPointer, schemaRefLibrary, recursiveRefMap)
      }
      if (!schemaRecursiveRefMap.has(subSchemaPointer)) {
        schemaRecursiveRefMap.set(subSchemaPointer, refPointer)
      }
      const fromDataRef = JsonPointer.toDataPointer(subSchemaPointer, compiledSchema) as any
      if (!dataRecursiveRefMap.has(fromDataRef)) {
        const toDataRef = JsonPointer.toDataPointer(refPointer, compiledSchema) as any
        dataRecursiveRefMap.set(fromDataRef, toDataRef)
      }
    }
    if (subSchema.type === 'array' &&
      (hasOwn(subSchema, 'items') || hasOwn(subSchema, 'additionalItems'))
    ) {
      const dataPointer = JsonPointer.toDataPointer(subSchemaPointer, compiledSchema) as any
      if (!arrayMap.has(dataPointer)) {
        const tupleItems = isArray(subSchema.items) ? subSchema.items.length : 0
        arrayMap.set(dataPointer, tupleItems)
      }
    }
  }, true)
  return compiledSchema
}
