export function isObject(item: any): boolean {
  return item !== null && typeof item === 'object' &&
    Object.prototype.toString.call(item) === '[object Object]'
}
