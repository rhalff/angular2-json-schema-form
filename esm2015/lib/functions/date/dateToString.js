import { ordinal } from './ordinal';
import { stringToDate } from './stringToDate';
export function dateToString(date, options = {}) {
    const dateFormat = options.dateFormat || 'YYYY-MM-DD';
    if (typeof date === 'string') {
        date = stringToDate(date);
    }
    if (Object.prototype.toString.call(date) !== '[object Date]') {
        return null;
    }
    const longMonths = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const longDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
        .replace(/S/ig, ordinal(date.getDate()));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVRvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdzZi1jb21tb24vIiwic291cmNlcyI6WyJsaWIvZnVuY3Rpb25zL2RhdGUvZGF0ZVRvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxXQUFXLENBQUE7QUFDakMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFBO0FBSzNDLE1BQU0sVUFBVSxZQUFZLENBQUMsSUFBbUIsRUFBRSxVQUFlLEVBQUU7SUFDakUsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsSUFBSSxZQUFZLENBQUE7SUFHckQsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDNUIsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUMxQjtJQUNELElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLGVBQWUsRUFBRTtRQUM1RCxPQUFPLElBQUksQ0FBQTtLQUNaO0lBQ0QsTUFBTSxVQUFVLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU07UUFDeEUsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQTtJQUNuRSxNQUFNLFdBQVcsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDeEcsTUFBTSxRQUFRLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQTtJQUMvRixNQUFNLFNBQVMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ25FLE9BQU8sVUFBVTtTQUNkLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQztTQUMxQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BELE9BQU8sQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQzlDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQzlDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN4RCxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUMxQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUMxQyxPQUFPLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUMxQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pELE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQztTQUNuQyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQzVDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge29yZGluYWx9IGZyb20gJy4vb3JkaW5hbCdcbmltcG9ydCB7c3RyaW5nVG9EYXRlfSBmcm9tICcuL3N0cmluZ1RvRGF0ZSdcblxuLyoqXG4gKiAnZGF0ZVRvU3RyaW5nJyBmdW5jdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZGF0ZVRvU3RyaW5nKGRhdGU6IERhdGUgfCBzdHJpbmcsIG9wdGlvbnM6IGFueSA9IHt9KTogc3RyaW5nIHtcbiAgY29uc3QgZGF0ZUZvcm1hdCA9IG9wdGlvbnMuZGF0ZUZvcm1hdCB8fCAnWVlZWS1NTS1ERCdcbiAgLy8gVE9ETzogVXNlIG9wdGlvbnMubG9jYWxlIHRvIGNoYW5nZSBkZWZhdWx0IGZvcm1hdCBhbmQgbmFtZXNcbiAgLy8gY29uc3QgbG9jYWxlID0gb3B0aW9ucy5sb2NhbGUgfHwgJ2VuLVVTJztcbiAgaWYgKHR5cGVvZiBkYXRlID09PSAnc3RyaW5nJykge1xuICAgIGRhdGUgPSBzdHJpbmdUb0RhdGUoZGF0ZSlcbiAgfVxuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGRhdGUpICE9PSAnW29iamVjdCBEYXRlXScpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIGNvbnN0IGxvbmdNb250aHMgPSBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLFxuICAgICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddXG4gIGNvbnN0IHNob3J0TW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddXG4gIGNvbnN0IGxvbmdEYXlzID0gWydTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSddXG4gIGNvbnN0IHNob3J0RGF5cyA9IFsnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0J11cbiAgcmV0dXJuIGRhdGVGb3JtYXRcbiAgICAucmVwbGFjZSgvWVlZWS9pZywgZGF0ZS5nZXRGdWxsWWVhcigpICsgJycpXG4gICAgLnJlcGxhY2UoL1lZL2lnLCAoZGF0ZS5nZXRGdWxsWWVhcigpICsgJycpLnNsaWNlKC0yKSlcbiAgICAucmVwbGFjZSgvTU1NTS9pZywgbG9uZ01vbnRoc1tkYXRlLmdldE1vbnRoKCldKVxuICAgIC5yZXBsYWNlKC9NTU0vaWcsIHNob3J0TW9udGhzW2RhdGUuZ2V0TW9udGgoKV0pXG4gICAgLnJlcGxhY2UoL01NL2lnLCAoJzAnICsgKGRhdGUuZ2V0TW9udGgoKSArIDEpKS5zbGljZSgtMikpXG4gICAgLnJlcGxhY2UoL00vaWcsIChkYXRlLmdldE1vbnRoKCkgKyAxKSArICcnKVxuICAgIC5yZXBsYWNlKC9EREREL2lnLCBsb25nRGF5c1tkYXRlLmdldERheSgpXSlcbiAgICAucmVwbGFjZSgvREREL2lnLCBzaG9ydERheXNbZGF0ZS5nZXREYXkoKV0pXG4gICAgLnJlcGxhY2UoL0REL2lnLCAoJzAnICsgZGF0ZS5nZXREYXRlKCkpLnNsaWNlKC0yKSlcbiAgICAucmVwbGFjZSgvRC9pZywgZGF0ZS5nZXREYXRlKCkgKyAnJylcbiAgICAucmVwbGFjZSgvUy9pZywgb3JkaW5hbChkYXRlLmdldERhdGUoKSkpXG59XG4iXX0=