/**
 * 'hasValue' utility function
 *
 * Checks if a variable contains a value.
 * Returs false for null, undefined, or a zero-length strng, '',
 * otherwise returns true.
 * (Stricter than 'isDefined' because it also returns false for '',
 * though it stil returns true for otherwise 'falsey' values 0 and false.)
 *
 * @param value - the value to check
 * @return false if undefined, null, or '', otherwise true
 */
export function hasValue(value: any): boolean {
  return value !== undefined && value !== null && value !== ''
}
