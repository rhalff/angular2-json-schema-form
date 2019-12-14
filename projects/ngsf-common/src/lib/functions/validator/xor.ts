/**
 * 'xor' utility function - exclusive or
 *
 * Returns true if exactly one of two values is truthy.
 *
 * @param value1 - first value to check
 * @param value2 - second value to check
 * @return true if exactly one input value is truthy, false if not
 */
export function xor(value1: any, value2: any): boolean {
  return (!!value1 && !value2) || (!value1 && !!value2)
}
