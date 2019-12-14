import {
  hasValue,
  inArray,
  isArray,
  isDate,
  isDefined,
  isObject,
  SchemaType,
  toJavaScriptType,
  toSchemaType
} from '../validator'
import {JsonPointer} from '../jsonpointer.functions'
import {removeRecursiveReferences} from '../json-schema'

/**
 * 'formatFormData' function
 *
 * @param formData - Angular FormGroup data object
 * @param dataMap -
 * @param recursiveRefMap -
 * @param arrayMap -
 * @param returnEmptyFields -
 * @param fixErrors - if TRUE, tries to fix data
 * @return formatted data object
 */
export function formatFormData(
  formData: any,
  dataMap: Map<string, any>,
  recursiveRefMap: Map<string, string>,
  arrayMap: Map<string, number>,
  returnEmptyFields = false,
  fixErrors = false
): any {
  if (formData === null || typeof formData !== 'object') {
    return formData
  }
  const formattedData = isArray(formData) ? [] : {}
  JsonPointer.forEachDeep(formData, (value, dataPointer) => {

    // If returnEmptyFields === true,
    // add empty arrays and objects to all allowed keys
    if (returnEmptyFields && isArray(value)) {
      JsonPointer.set(formattedData, dataPointer, [])
    } else if (returnEmptyFields && isObject(value) && !isDate(value)) {
      JsonPointer.set(formattedData, dataPointer, {})
    } else {
      const genericPointer =
        JsonPointer.has(dataMap, [dataPointer, 'schemaType']) ? dataPointer :
          removeRecursiveReferences(dataPointer, recursiveRefMap, arrayMap)
      if (JsonPointer.has(dataMap, [genericPointer, 'schemaType'])) {
        const schemaType: SchemaType | SchemaType[] =
          dataMap.get(genericPointer).get('schemaType')
        if (schemaType === 'null') {
          JsonPointer.set(formattedData, dataPointer, null)
        } else if ((hasValue(value) || returnEmptyFields) &&
          inArray(schemaType, ['string', 'integer', 'number', 'boolean'])
        ) {
          const newValue = (fixErrors || (value === null && returnEmptyFields)) ?
            toSchemaType(value, schemaType as any) : toJavaScriptType(value, schemaType as any)
          if (isDefined(newValue) || returnEmptyFields) {
            JsonPointer.set(formattedData, dataPointer, newValue)
          }

          // If returnEmptyFields === false,
          // only add empty arrays and objects to required keys
        } else if (schemaType === 'object' && !returnEmptyFields) {
          (dataMap.get(genericPointer).get('required') || []).forEach(key => {
            const keySchemaType =
              dataMap.get(`${genericPointer}/${key}`).get('schemaType')
            if (keySchemaType === 'array') {
              JsonPointer.set(formattedData, `${dataPointer}/${key}`, [])
            } else if (keySchemaType === 'object') {
              JsonPointer.set(formattedData, `${dataPointer}/${key}`, {})
            }
          })
        }

        // Finish incomplete 'date-time' entries
        if (dataMap.get(genericPointer).get('schemaFormat') === 'date-time') {
          // "2000-03-14T01:59:26.535" -> "2000-03-14T01:59:26.535Z" (add "Z")
          if (/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s][0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?$/i.test(value)) {
            JsonPointer.set(formattedData, dataPointer, `${value}Z`)
            // "2000-03-14T01:59" -> "2000-03-14T01:59:00Z" (add ":00Z")
          } else if (/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s][0-2]\d:[0-5]\d$/i.test(value)) {
            JsonPointer.set(formattedData, dataPointer, `${value}:00Z`)
            // "2000-03-14" -> "2000-03-14T00:00:00Z" (add "T00:00:00Z")
          } else if (fixErrors && /^\d\d\d\d-[0-1]\d-[0-3]\d$/i.test(value)) {
            JsonPointer.set(formattedData, dataPointer, `${value}:00:00:00Z`)
          }
        }
      } else if (typeof value !== 'object' || isDate(value) ||
        (value === null && returnEmptyFields)
      ) {
        console.error('formatFormData error: ' +
          `Schema type not found for form value at ${genericPointer}`)
        console.error('dataMap', dataMap)
        console.error('recursiveRefMap', recursiveRefMap)
        console.error('genericPointer', genericPointer)
      }
    }
  })
  return formattedData
}
