/**
 * 'isPromise' function
 */
export function isPromise(object: any): object is Promise<any> {
  return !!object && typeof object.then === 'function'
}
