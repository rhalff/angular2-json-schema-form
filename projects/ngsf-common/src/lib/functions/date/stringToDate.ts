import {findDate} from './findDate'

/**
 * 'stringToDate' function
 */
export function stringToDate(dateString: string): Date {
  const getDate: string = findDate(dateString)
  if (!getDate) {
    return null
  }
  let dateParts: number[] = []
  // Split x-y-z to [x, y, z]
  if (/^\d+[^\d]\d+[^\d]\d+$/.test(getDate)) {
    dateParts = getDate.split(/[^\d]/).map(part => +part)
    // Split xxxxyyzz to [xxxx, yy, zz]
  } else if (/^\d{8}$/.test(getDate)) {
    dateParts = [+getDate.slice(0, 4), +getDate.slice(4, 6), +getDate.slice(6)]
  }
  const thisYear = +(new Date().getFullYear() + '').slice(-2)
  // Check for [YYYY, MM, DD]
  if (dateParts[0] > 1000 && dateParts[0] < 2100 && dateParts[1] <= 12 && dateParts[2] <= 31) {
    return new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
    // Check for [MM, DD, YYYY]
  } else if (dateParts[0] <= 12 && dateParts[1] <= 31 && dateParts[2] > 1000 && dateParts[2] < 2100) {
    return new Date(dateParts[2], dateParts[0] - 1, dateParts[1])
    // Check for [MM, DD, YY]
  } else if (dateParts[0] <= 12 && dateParts[1] <= 31 && dateParts[2] < 100) {
    const year = (dateParts[2] <= thisYear ? 2000 : 1900) + dateParts[2]
    return new Date(year, dateParts[0] - 1, dateParts[1])
    // Check for [YY, MM, DD]
  } else if (dateParts[0] < 100 && dateParts[1] <= 12 && dateParts[2] <= 31) {
    const year = (dateParts[0] <= thisYear ? 2000 : 1900) + dateParts[0]
    return new Date(year, dateParts[1] - 1, dateParts[2])
  }
  return null
}
