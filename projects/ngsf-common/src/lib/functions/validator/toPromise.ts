import {isPromise} from './isPromise'

/**
 * 'toPromise' function
 */
export function toPromise(object: object): Promise<any> {
  return isPromise(object) ? object : toPromise.call(object)
}
