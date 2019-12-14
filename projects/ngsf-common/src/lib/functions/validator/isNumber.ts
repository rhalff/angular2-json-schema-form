/**
 * 'isNumber' utility function
 *
 * Checks if a value is a regular number, numeric string, or JavaScript Date.
 *
 * @param value - the value to check
 * @param strict - if truthy, also checks JavaScript tyoe
 * @return true if number, false if not
 */
export function isNumber(value: any, strict: any = false): boolean {
  if (strict && typeof value !== 'number') {
    return false
  }
  return !isNaN(value) && value !== value / 0
}
