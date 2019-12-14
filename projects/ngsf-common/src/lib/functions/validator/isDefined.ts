/**
 * 'isDefined' utility function
 *
 * Checks if a variable contains a value of any type.
 * Returns true even for otherwise 'falsey' values of 0, '', and false.
 *
 * @param value - the value to check
 * @return false if undefined or null, otherwise true
 */
export function isDefined(value: any): boolean {
  return value !== undefined && value !== null
}
