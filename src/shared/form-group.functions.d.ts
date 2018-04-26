import { AbstractControl } from '@angular/forms';
import { Pointer } from './jsonpointer.functions';
/**
 * FormGroup function library:
 *
 * buildFormGroupTemplate:  Builds a FormGroupTemplate from schema
 *
 * buildFormGroup:          Builds an Angular FormGroup from a FormGroupTemplate
 *
 * mergeValues:
 *
 * setRequiredFields:
 *
 * formatFormData:
 *
 * getControl:
 *
 * ---- TODO: ----
 * TODO: add buildFormGroupTemplateFromLayout function
 * buildFormGroupTemplateFromLayout: Builds a FormGroupTemplate from a form layout
 */
/**
 * 'buildFormGroupTemplate' function
 *
 * Builds a template for an Angular FormGroup from a JSON Schema.
 *
 * TODO: add support for pattern properties
 * https://spacetelescope.github.io/understanding-json-schema/reference/object.html
 *
 * @param  {any} jsf -
 * @param  {any = null} nodeValue -
 * @param  {boolean = true} mapArrays -
 * @param  {string = ''} schemaPointer -
 * @param  {string = ''} dataPointer -
 * @param  {any = ''} templatePointer -
 * @return {any} -
 */
export declare function buildFormGroupTemplate(jsf: any, nodeValue?: any, setValues?: boolean, schemaPointer?: string, dataPointer?: string, templatePointer?: string): {
    controlType: string;
    controls: any;
    validators: any;
    value?: undefined;
} | {
    controlType: string;
    value: {
        value: any;
        disabled: any;
    };
    validators: any;
    controls?: undefined;
};
/**
 * 'buildFormGroup' function
 *
 * @param {any} template -
 * @return {AbstractControl}
*/
export declare function buildFormGroup(template: any): AbstractControl;
/**
 * 'mergeValues' function
 *
 * @param  {any[]} ...valuesToMerge - Multiple values to merge
 * @return {any} - Merged values
 */
export declare function mergeValues(...valuesToMerge: any[]): any;
/**
 * 'setRequiredFields' function
 *
 * @param {schema} schema - JSON Schema
 * @param {object} formControlTemplate - Form Control Template object
 * @return {boolean} - true if any fields have been set to required, false if not
 */
export declare function setRequiredFields(schema: any, formControlTemplate: any): boolean;
/**
 * 'formatFormData' function
 *
 * @param {any} formData - Angular FormGroup data object
 * @param {Map<string, any>} dataMap -
 * @param {Map<string, string>} recursiveRefMap -
 * @param {Map<string, number>} arrayMap -
 * @param {boolean = false} fixErrors - if TRUE, tries to fix data
 * @return {any} - formatted data object
 */
export declare function formatFormData(formData: any, dataMap: Map<string, any>, recursiveRefMap: Map<string, string>, arrayMap: Map<string, number>, returnEmptyFields?: boolean, fixErrors?: boolean): any;
/**
 * 'getControl' function
 *
 * Uses a JSON Pointer for a data object to retrieve a control from
 * an Angular formGroup or formGroup template. (Note: though a formGroup
 * template is much simpler, its basic structure is idential to a formGroup).
 *
 * If the optional third parameter 'returnGroup' is set to TRUE, the group
 * containing the control is returned, rather than the control itself.
 *
 * @param {FormGroup} formGroup - Angular FormGroup to get value from
 * @param {Pointer} dataPointer - JSON Pointer (string or array)
 * @param {boolean = false} returnGroup - If true, return group containing control
 * @return {group} - Located value (or null, if no control found)
 */
export declare function getControl(formGroup: any, dataPointer: Pointer, returnGroup?: boolean): any;
