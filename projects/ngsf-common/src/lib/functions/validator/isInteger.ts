/**
 * 'isInteger' utility function
 *
 * Checks if a value is an integer.
 *
 * @param value - the value to check
 * @param strict - if truthy, also checks JavaScript tyoe
 * @return true if number, false if not
 */
export function isInteger(value: any, strict: any = false): boolean {
  if (strict && typeof value !== 'number') {
    return false
  }
  return !isNaN(value) && value !== value / 0 && value % 1 === 0
}
