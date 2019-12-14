import {AbstractControl} from '@angular/forms'

export type SchemaPrimitiveType =
  'string' | 'number' | 'integer' | 'boolean' | 'null'
export type SchemaType =
  'string' | 'number' | 'integer' | 'boolean' | 'null' | 'object' | 'array'
export type JavaScriptPrimitiveType =
  'string' | 'number' | 'boolean' | 'null' | 'undefined'
export type JavaScriptType =
  'string' | 'number' | 'boolean' | 'null' | 'undefined' | 'object' | 'array' |
  'map' | 'set' | 'arguments' | 'date' | 'error' | 'function' | 'json' |
  'math' | 'regexp' // Note: this list is incomplete
export type PrimitiveValue = string | number | boolean | null | undefined

export interface PlainObject {
  [k: string]: any
}

export type IValidatorFn = (c: AbstractControl, i?: boolean) => PlainObject
export type AsyncIValidatorFn = (c: AbstractControl, i?: boolean) => any
