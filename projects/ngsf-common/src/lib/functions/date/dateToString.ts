import {ordinal} from './ordinal'
import {stringToDate} from './stringToDate'

/**
 * 'dateToString' function
 */
export function dateToString(date: Date | string, options: any = {}): string {
  const dateFormat = options.dateFormat || 'YYYY-MM-DD'
  // TODO: Use options.locale to change default format and names
  // const locale = options.locale || 'en-US';
  if (typeof date === 'string') {
    date = stringToDate(date)
  }
  if (Object.prototype.toString.call(date) !== '[object Date]') {
    return null
  }
  const longMonths = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const longDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return dateFormat
    .replace(/YYYY/ig, date.getFullYear() + '')
    .replace(/YY/ig, (date.getFullYear() + '').slice(-2))
    .replace(/MMMM/ig, longMonths[date.getMonth()])
    .replace(/MMM/ig, shortMonths[date.getMonth()])
    .replace(/MM/ig, ('0' + (date.getMonth() + 1)).slice(-2))
    .replace(/M/ig, (date.getMonth() + 1) + '')
    .replace(/DDDD/ig, longDays[date.getDay()])
    .replace(/DDD/ig, shortDays[date.getDay()])
    .replace(/DD/ig, ('0' + date.getDate()).slice(-2))
    .replace(/D/ig, date.getDate() + '')
    .replace(/S/ig, ordinal(date.getDate()))
}
