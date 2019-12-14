import {isString} from '../validator'
import {JsonPointer} from '../jsonpointer.functions'

/**
 * 'checkInlineType' function
 *
 * Checks layout and schema nodes for 'inline: true', and converts
 * 'radios' or 'checkboxes' to 'radios-inline' or 'checkboxes-inline'
 */
export function checkInlineType(
  controlType: string,
  schema: any,
  layoutNode: any = null
): string {
  if (!isString(controlType) || (
    controlType.slice(0, 8) !== 'checkbox' && controlType.slice(0, 5) !== 'radio'
  )) {
    return controlType
  }
  if (
    JsonPointer.getFirst([
      [layoutNode, '/inline'],
      [layoutNode, '/options/inline'],
      [schema, '/inline'],
      [schema, '/x-schema-form/inline'],
      [schema, '/x-schema-form/options/inline'],
      [schema, '/x-schema-form/widget/inline'],
      [schema, '/x-schema-form/widget/component/inline'],
      [schema, '/x-schema-form/widget/component/options/inline'],
      [schema, '/widget/inline'],
      [schema, '/widget/component/inline'],
      [schema, '/widget/component/options/inline'],
    ]) === true
  ) {
    return controlType.slice(0, 5) === 'radio' ?
      'radios-inline' : 'checkboxes-inline'
  } else {
    return controlType
  }
}
