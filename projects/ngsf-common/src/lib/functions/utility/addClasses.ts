import {isArray, isSet, isString} from '../validator'

/**
 * 'addClasses' function
 *
 * Merges two space-delimited lists of CSS classes and removes duplicates.
 */
export function addClasses(
  oldClasses: string | string[] | Set<string>,
  newClasses: string | string[] | Set<string>
): string | string[] | Set<string> {
  const badType = i => !isSet(i) && !isArray(i) && !isString(i)
  if (badType(newClasses)) {
    return oldClasses
  }
  if (badType(oldClasses)) {
    oldClasses = ''
  }
  const toSet = i => isSet(i) ? i : isArray(i) ? new Set(i) : new Set(i.split(' '))
  const combinedSet: Set<any> = toSet(oldClasses)
  const newSet: Set<any> = toSet(newClasses)
  newSet.forEach(c => combinedSet.add(c))
  if (isSet(oldClasses)) {
    return combinedSet
  }
  if (isArray(oldClasses)) {
    return Array.from(combinedSet)
  }
  return Array.from(combinedSet).join(' ')
}
