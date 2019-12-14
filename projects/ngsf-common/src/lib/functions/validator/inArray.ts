import {isDefined} from './isDefined'
import {isArray} from './isArray'

/**
 * 'inArray' function
 *
 * Searches an array for an item, or one of a list of items, and returns true
 * as soon as a match is found, or false if no match.
 *
 * If the optional third parameter allIn is set to TRUE, and the item to find
 * is an array, then the function returns true only if all elements from item
 * are found in the array list, and false if any element is not found. If the
 * item to find is not an array, setting allIn to TRUE has no effect.
 *
 * @param item - the item to search for
 * @param array - the array to search
 * @param allIn - if TRUE, all items must be in array
 * @return true if item(s) in array, false otherwise
 */
export function inArray<T>(
  item: any | any[],
  array: T[],
  allIn = false
): boolean {
  if (!isDefined(item) || !isArray(array)) {
    return false
  }
  return isArray(item) ?
    item[allIn ? 'every' : 'some'](subItem => array.includes(subItem)) :
    array.includes(item)
}
