/**
 * 'isBoolean' utility function
 *
 * Checks if a value is a boolean.
 *
 * @param value - the value to check
 * @param option - if 'strict', also checks JavaScript type
 *                              if TRUE or FALSE, checks only for that value
 * @return true if boolean, false if not
 */
export function isBoolean(value: any, option: any = null): boolean {
  if (option === 'strict') {
    return value === true || value === false
  }
  if (option === true) {
    return value === true || value === 1 || value === 'true' || value === '1'
  }
  if (option === false) {
    return value === false || value === 0 || value === 'false' || value === '0'
  }
  return value === true || value === 1 || value === 'true' || value === '1' ||
    value === false || value === 0 || value === 'false' || value === '0'
}
