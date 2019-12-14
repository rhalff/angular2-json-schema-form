import {JsonPointer, Pointer} from '../jsonpointer.functions'

/**
 * 'removeRecursiveReferences' function
 *
 * Checks a JSON Pointer against a map of recursive references and returns
 * a JSON Pointer to the shallowest equivalent location in the same object.
 *
 * Using this functions enables an object to be constructed with unlimited
 * recursion, while maintaing a fixed set of metadata, such as field data types.
 * The object can grow as large as it wants, and deeply recursed nodes can
 * just refer to the metadata for their shallow equivalents, instead of having
 * to add additional redundant metadata for each recursively added node.
 *
 * Example:
 *
 * pointer:         '/stuff/and/more/and/more/and/more/and/more/stuff'
 * recursiveRefMap: [['/stuff/and/more/and/more', '/stuff/and/more/']]
 * returned:        '/stuff/and/more/stuff'
 */
export function removeRecursiveReferences(
  pointer: Pointer,
  recursiveRefMap: Map<string, string>,
  arrayMap:Map<string, number> = new Map()
): string {
  if (!pointer) {
    return ''
  }
  let genericPointer =
    JsonPointer.toGenericPointer(JsonPointer.compile(pointer), arrayMap)
  if (genericPointer.indexOf('/') === -1) {
    return genericPointer
  }
  let possibleReferences = true
  while (possibleReferences) {
    possibleReferences = false
    recursiveRefMap.forEach((toPointer, fromPointer) => {
      if (JsonPointer.isSubPointer(toPointer, fromPointer)) {
        while (JsonPointer.isSubPointer(fromPointer, genericPointer, true)) {
          genericPointer = JsonPointer.toGenericPointer(
            toPointer + genericPointer.slice(fromPointer.length), arrayMap
          )
          possibleReferences = true
        }
      }
    })
  }
  return genericPointer
}
