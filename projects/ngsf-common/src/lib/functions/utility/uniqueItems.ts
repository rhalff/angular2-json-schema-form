/**
 * 'uniqueItems' function
 *
 * Accepts any number of string value inputs,
 * and returns an array of all input vaues, excluding duplicates.
 */
export function uniqueItems(...items: string[]): string[] {
  const returnItems = []
  for (const item of items) {
    if (!returnItems.includes(item)) {
      returnItems.push(item)
    }
  }
  return returnItems
}
