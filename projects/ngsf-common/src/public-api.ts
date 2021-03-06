// Warning: Changing the following order may cause errors if the new order
// causes a library to be imported before another library it depends on.

export {
  executeValidators, executeAsyncValidators, mergeObjects, mergeErrors,
  isDefined, hasValue, isEmpty, isString, isNumber, isInteger, isBoolean,
  isFunction, isObject, isArray, isDate, isMap, isSet, isPromise, isObservable,
  getType, isType, isPrimitive, toJavaScriptType, toSchemaType, toPromise,
  toObservable, inArray, xor, SchemaPrimitiveType, SchemaType, JavaScriptPrimitiveType,
  JavaScriptType, PrimitiveValue, PlainObject, IValidatorFn, AsyncIValidatorFn
} from './lib/functions/validator'

export {
  addClasses, copy, forEach, forEachCopy, hasOwn, mergeFilteredObject,
  uniqueItems, commonItems, fixTitle, toTitleCase
} from './lib/functions/utility'

// export { Pointer, JsonPointer } from './lib/functions/jsonpointer.functions'
export * from './lib/functions/jsonpointer.functions'

export { JsonValidators } from './lib/json.validators'

export {
  buildSchemaFromLayout, buildSchemaFromData, getFromSchema,
  removeRecursiveReferences, getInputType, checkInlineType, isInputRequired,
  updateInputOptions, getTitleMapFromOneOf, getControlValidators,
  resolveSchemaReferences, getSubSchema, combineAllOf, fixRequiredArrayProperties
} from './lib/functions/json-schema'

export { convertSchemaToDraft6 } from './lib/functions/convert-schema-to-draft6.function'

export { mergeSchemas } from './lib/functions/merge-schemas'

export {
  buildFormGroupTemplate,
  buildFormGroup,
  formatFormData,
  getControl,
  setRequiredFields
} from './lib/functions/form-group'

export {
  buildLayout,
  buildLayoutFromSchema,
  mapLayout,
  getLayoutNode,
} from './lib/functions/layout'

export {
  dateToString,
  stringToDate,
  findDate
} from './lib/functions/date'

export * from './lib/framework'
export * from './lib/locale/en-validation-messages'
export * from './lib/locale/fr-validation-messages'
