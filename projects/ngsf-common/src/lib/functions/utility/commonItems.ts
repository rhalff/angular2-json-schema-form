/**
 * 'commonItems' function
 *
 * Accepts any number of strings or arrays of string values,
 * and returns a single array containing only values present in all inputs.
 */
export function commonItems(...arrays: string[]): string[] {
  let returnItems = null
  for (const value of arrays) {
    const array = typeof value === 'string' ? [value] : value

    returnItems = returnItems === null ? [...array] :
      returnItems.filter(item => array.includes(item))
    if (!returnItems.length) {
      return []
    }
  }
  return returnItems
}
