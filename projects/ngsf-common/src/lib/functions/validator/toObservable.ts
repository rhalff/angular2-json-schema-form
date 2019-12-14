import {isObservable, Observable} from 'rxjs'
import {fromPromise} from 'rxjs-compat/observable/fromPromise'
import {isPromise} from './isPromise'

/**
 * 'toObservable' function
 *
 */
export function toObservable(object: object): Observable<any> {
  const observable = isPromise(object) ? fromPromise(object) : object
  if (isObservable(observable)) {
    return observable
  }
  console.error('toObservable error: Expected validator to return Promise or Observable.')
  return new Observable()
}
