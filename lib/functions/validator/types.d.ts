import { AbstractControl } from '@angular/forms';
export declare type SchemaPrimitiveType = 'string' | 'number' | 'integer' | 'boolean' | 'null';
export declare type SchemaType = 'string' | 'number' | 'integer' | 'boolean' | 'null' | 'object' | 'array';
export declare type JavaScriptPrimitiveType = 'string' | 'number' | 'boolean' | 'null' | 'undefined';
export declare type JavaScriptType = 'string' | 'number' | 'boolean' | 'null' | 'undefined' | 'object' | 'array' | 'map' | 'set' | 'arguments' | 'date' | 'error' | 'function' | 'json' | 'math' | 'regexp';
export declare type PrimitiveValue = string | number | boolean | null | undefined;
export interface PlainObject {
    [k: string]: any;
}
export declare type IValidatorFn = (c: AbstractControl, i?: boolean) => PlainObject;
export declare type AsyncIValidatorFn = (c: AbstractControl, i?: boolean) => any;
