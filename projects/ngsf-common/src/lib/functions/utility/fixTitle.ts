import {toTitleCase} from './toTitleCase'

/**
 * 'fixTitle' function
 */
export function fixTitle(name: string): string {
  return name && toTitleCase(name.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' '))
}
