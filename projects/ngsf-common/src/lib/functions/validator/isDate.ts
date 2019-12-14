export function isDate(item: any): boolean {
  return typeof item === 'object' &&
    Object.prototype.toString.call(item) === '[object Date]'
}
