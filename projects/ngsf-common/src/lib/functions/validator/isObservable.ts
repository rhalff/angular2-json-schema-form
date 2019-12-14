import {Observable} from 'rxjs'

/**
 * 'isObservable' function
 */
export function isObservable(object: any): object is Observable<any> {
  return !!object && typeof object.subscribe === 'function'
}
