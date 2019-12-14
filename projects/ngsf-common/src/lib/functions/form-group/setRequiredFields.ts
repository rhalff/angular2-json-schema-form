import {forEach, hasOwn} from '../utility'
import {isArray, isEmpty} from '../validator'
import {JsonPointer} from '../jsonpointer.functions'

/**
 * 'setRequiredFields' function
 *
 * @param schema - JSON Schema
 * @param formControlTemplate - Form Control Template object
 * @return true if any fields have been set to required, false if not
 */
export function setRequiredFields(
  schema: any,
  formControlTemplate: any
): boolean {
  let fieldsRequired = false
  if (hasOwn(schema, 'required') && !isEmpty(schema.required)) {
    fieldsRequired = true
    let requiredArray = isArray(schema.required) ? schema.required : [schema.required]
    requiredArray = forEach(requiredArray,
      key => JsonPointer.set(formControlTemplate, '/' + key + '/validators/required', [])
    )
  }
  return fieldsRequired

  // TODO: Add support for patternProperties
  // https://spacetelescope.github.io/understanding-json-schema/reference/object.html#pattern-properties
}
