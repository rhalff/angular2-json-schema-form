/**
 * 'dateToString' function
 *
 * @param  { Date | string } date
 * @param  { any } options
 * @return { string }
 */
export function dateToString(date, options = {}) {
    const dateFormat = options.dateFormat || 'YYYY-MM-DD';
    // TODO: Use options.locale to change default format and names
    // const locale = options.locale || 'en-US';
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
export function ordinal(number) {
    if (typeof number === 'number') {
        number = number + '';
    }
    const last = number.slice(-1);
    const nextToLast = number.slice(-2, 1);
    return (nextToLast !== '1' && { '1': 'st', '2': 'nd', '3': 'rd' }[last]) || 'th';
}
/**
 * 'stringToDate' function
 *
 * @param  { string } dateString
 * @return { Date }
 */
export function stringToDate(dateString) {
    const getDate = findDate(dateString);
    if (!getDate) {
        return null;
    }
    let dateParts = [];
    // Split x-y-z to [x, y, z]
    if (/^\d+[^\d]\d+[^\d]\d+$/.test(getDate)) {
        dateParts = getDate.split(/[^\d]/).map(part => +part);
        // Split xxxxyyzz to [xxxx, yy, zz]
    }
    else if (/^\d{8}$/.test(getDate)) {
        dateParts = [+getDate.slice(0, 4), +getDate.slice(4, 6), +getDate.slice(6)];
    }
    const thisYear = +(new Date().getFullYear() + '').slice(-2);
    // Check for [YYYY, MM, DD]
    if (dateParts[0] > 1000 && dateParts[0] < 2100 && dateParts[1] <= 12 && dateParts[2] <= 31) {
        return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        // Check for [MM, DD, YYYY]
    }
    else if (dateParts[0] <= 12 && dateParts[1] <= 31 && dateParts[2] > 1000 && dateParts[2] < 2100) {
        return new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);
        // Check for [MM, DD, YY]
    }
    else if (dateParts[0] <= 12 && dateParts[1] <= 31 && dateParts[2] < 100) {
        const year = (dateParts[2] <= thisYear ? 2000 : 1900) + dateParts[2];
        return new Date(year, dateParts[0] - 1, dateParts[1]);
        // Check for [YY, MM, DD]
    }
    else if (dateParts[0] < 100 && dateParts[1] <= 12 && dateParts[2] <= 31) {
        const year = (dateParts[0] <= thisYear ? 2000 : 1900) + dateParts[0];
        return new Date(year, dateParts[1] - 1, dateParts[2]);
    }
    return null;
}
/**
 * 'findDate' function
 *
 * @param  { string } text
 * @return { string }
 */
export function findDate(text) {
    if (!text) {
        return null;
    }
    let foundDate;
    // Match ...YYYY-MM-DD...
    foundDate = text.match(/(?:19|20)\d\d[-_\\\/\. ](?:0?\d|1[012])[-_\\\/\. ](?:[012]?\d|3[01])(?!\d)/);
    if (foundDate) {
        return foundDate[0];
    }
    // Match ...MM-DD-YYYY...
    foundDate = text.match(/(?:[012]?\d|3[01])[-_\\\/\. ](?:0?\d|1[012])[-_\\\/\. ](?:19|20)\d\d(?!\d)/);
    if (foundDate) {
        return foundDate[0];
    }
    // Match MM-DD-YY...
    foundDate = text.match(/^(?:[012]?\d|3[01])[-_\\\/\. ](?:0?\d|1[012])[-_\\\/\. ]\d\d(?!\d)/);
    if (foundDate) {
        return foundDate[0];
    }
    // Match YY-MM-DD...
    foundDate = text.match(/^\d\d[-_\\\/\. ](?:[012]?\d|3[01])[-_\\\/\. ](?:0?\d|1[012])(?!\d)/);
    if (foundDate) {
        return foundDate[0];
    }
    // Match YYYYMMDD...
    foundDate = text.match(/^(?:19|20)\d\d(?:0\d|1[012])(?:[012]\d|3[01])/);
    if (foundDate) {
        return foundDate[0];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5mdW5jdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsic3JjL3NoYXJlZC9kYXRlLmZ1bmN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsWUFBWSxDQUFDLElBQUksRUFBRSxVQUFlLEVBQUU7SUFDbEQsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsSUFBSSxZQUFZLENBQUM7SUFDdEQsOERBQThEO0lBQzlELDRDQUE0QztJQUM1QyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUFFLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7S0FBRTtJQUM1RCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxlQUFlLEVBQUU7UUFBRSxPQUFPLElBQUksQ0FBQztLQUFFO0lBQzlFLE1BQU0sVUFBVSxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNO1FBQ3hFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDcEUsTUFBTSxXQUFXLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3pHLE1BQU0sUUFBUSxHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDaEcsTUFBTSxTQUFTLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNwRSxPQUFPLFVBQVU7U0FDZCxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUM7U0FDMUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwRCxPQUFPLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUM5QyxPQUFPLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUM5QyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEQsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDMUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDMUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDMUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqRCxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7U0FDbkMsT0FBTyxDQUFDLEtB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QztLQUFFO0lBQ3ZDLHlCQUF5QjtJQUN6QixTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyw0RUFBNEUsQ0FBQyxDQUFDO0lBQ3JHLElBQUksU0FBUyxFQUFFO1FBQUUsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FBRTtJQUN2QyxvQkFBb0I7SUFDcEIsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsb0VBQW9FLENBQUMsQ0FBQztJQUM3RixJQUFJLFNBQVMsRUFBRTtRQUFFLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQUU7SUFDdkMsb0JBQW9CO0lBQ3BCLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLG9FQUFvRSxDQUFDLENBQUM7SUFDN0YsSUFBSSxTQUFTLEVBQUU7UUFBRSxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUFFO0lBQ3ZDLG9CQUFvQjtJQUNwQixTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO0lBQ3hFLElBQUksU0FBUyxFQUFFO1FBQUUsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FBRTtBQUN6QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAnZGF0ZVRvU3RyaW5nJyBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSAgeyBEYXRlIHwgc3RyaW5nIH0gZGF0ZVxuICogQHBhcmFtICB7IGFueSB9IG9wdGlvbnNcbiAqIEByZXR1cm4geyBzdHJpbmcgfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGF0ZVRvU3RyaW5nKGRhdGUsIG9wdGlvbnM6IGFueSA9IHt9KSB7XG4gIGNvbnN0IGRhdGVGb3JtYXQgPSBvcHRpb25zLmRhdGVGb3JtYXQgfHwgJ1lZWVktTU0tREQnO1xuICAvLyBUT0RPOiBVc2Ugb3B0aW9ucy5sb2NhbGUgdG8gY2hhbmdlIGRlZmF1bHQgZm9ybWF0IGFuZCBuYW1lc1xuICAvLyBjb25zdCBsb2NhbGUgPSBvcHRpb25zLmxvY2FsZSB8fCAnZW4tVVMnO1xuICBpZiAodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnKSB7IGRhdGUgPSBzdHJpbmdUb0RhdGUoZGF0ZSk7IH1cbiAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChkYXRlKSAhPT0gJ1tvYmplY3QgRGF0ZV0nKSB7IHJldHVybiBudWxsOyB9XG4gIGNvbnN0IGxvbmdNb250aHMgPSBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLFxuICAgICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddO1xuICBjb25zdCBzaG9ydE1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2N0JywgJ05vdicsICdEZWMnXTtcbiAgY29uc3QgbG9uZ0RheXMgPSBbJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J107XG4gIGNvbnN0IHNob3J0RGF5cyA9IFsnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0J107XG4gIHJldHVybiBkYXRlRm9ybWF0XG4gICAgLnJlcGxhY2UoL1lZWVkvaWcsIGRhdGUuZ2V0RnVsbFllYXIoKSArICcnKVxuICAgIC5yZXBsYWNlKC9ZWS9pZywgKGRhdGUuZ2V0RnVsbFllYXIoKSArICcnKS5zbGljZSgtMikpXG4gICAgLnJlcGxhY2UoL01NTU0vaWcsIGxvbmdNb250aHNbZGF0ZS5nZXRNb250aCgpXSlcbiAgICAucmVwbGFjZSgvTU1NL2lnLCBzaG9ydE1vbnRoc1tkYXRlLmdldE1vbnRoKCldKVxuICAgIC5yZXBsYWNlKC9NTS9pZywgKCcwJyArIChkYXRlLmdldE1vbnRoKCkgKyAxKSkuc2xpY2UoLTIpKVxuICAgIC5yZXBsYWNlKC9NL2lnLCAoZGF0ZS5nZXRNb250aCgpICsgMSkgKyAnJylcbiAgICAucmVwbGFjZSgvRERERC9pZywgbG9uZ0RheXNbZGF0ZS5nZXREYXkoKV0pXG4gICAgLnJlcGxhY2UoL0RERC9pZywgc2hvcnREYXlzW2RhdGUuZ2V0RGF5KCldKVxuICAgIC5yZXBsYWNlKC9ERC9pZywgKCcwJyArIGRhdGUuZ2V0RGF0ZSgpKS5zbGljZSgtMikpXG4gICAgLnJlcGxhY2UoL0QvaWcsIGRhdGUuZ2V0RGF0ZSgpICsgJycpXG4gICAgLnJlcGxhY2UoL1MvaWcsIG9yZGluYWwoZGF0ZS5nZXREYXRlKCkpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9yZGluYWwobnVtYmVyOiBudW1iZXJ8c3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKHR5cGVvZiBudW1iZXIgPT09ICdudW1iZXInKSB7IG51bWJlciA9IG51bWJlciArICcnOyB9XG4gIGNvbnN0IGxhc3QgPSBudW1iZXIuc2xpY2UoLTEpO1xuICBjb25zdCBuZXh0VG9MYXN0ID0gbnVtYmVyLnNsaWNlKC0yLCAxKTtcbiAgcmV0dXJuIChuZXh0VG9MYXN0ICE9PSAnMScgJiYgeyAnMSc6ICdzdCcsICcyJzogJ25kJywgJzMnOiAncmQnIH1bbGFzdF0pIHx8ICd0aCc7XG59XG5cbi8qKlxuICogJ3N0cmluZ1RvRGF0ZScgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0gIHsgc3RyaW5nIH0gZGF0ZVN0cmluZ1xuICogQHJldHVybiB7IERhdGUgfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nVG9EYXRlKGRhdGVTdHJpbmcpIHtcbiAgY29uc3QgZ2V0RGF0ZTogc3RyaW5nID0gZmluZERhdGUoZGF0ZVN0cmluZyk7XG4gIGlmICghZ2V0RGF0ZSkgeyByZXR1cm4gbnVsbDsgfVxuICBsZXQgZGF0ZVBhcnRzOiBudW1iZXJbXSA9IFtdO1xuICAvLyBTcGxpdCB4LXkteiB0byBbeCwgeSwgel1cbiAgaWYgKC9eXFxkK1teXFxkXVxcZCtbXlxcZF1cXGQrJC8udGVzdChnZXREYXRlKSkge1xuICAgIGRhdGVQYXJ0cyA9IGdldERhdGUuc3BsaXQoL1teXFxkXS8pLm1hcChwYXJ0ID0+ICtwYXJ0KTtcbiAgLy8gU3BsaXQgeHh4eHl5enogdG8gW3h4eHgsIHl5LCB6el1cbiAgfSBlbHNlIGlmICgvXlxcZHs4fSQvLnRlc3QoZ2V0RGF0ZSkpIHtcbiAgICBkYXRlUGFydHMgPSBbK2dldERhdGUuc2xpY2UoMCwgNCksICtnZXREYXRlLnNsaWNlKDQsIDYpLCArZ2V0RGF0ZS5zbGljZSg2KV07XG4gIH1cbiAgY29uc3QgdGhpc1llYXIgPSArKG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSArICcnKS5zbGljZSgtMik7XG4gIC8vIENoZWNrIGZvciBbWVlZWSwgTU0sIEREXVxuICBpZiAoZGF0ZVBhcnRzWzBdID4gMTAwMCAmJiBkYXRlUGFydHNbMF0gPCAyMTAwICYmIGRhdGVQYXJ0c1sxXSA8PSAxMiAmJiBkYXRlUGFydHNbMl0gPD0gMzEpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoZGF0ZVBhcnRzWzBdLCBkYXRlUGFydHNbMV0gLSAxLCBkYXRlUGFydHNbMl0pO1xuICAvLyBDaGVjayBmb3IgW01NLCBERCwgWVlZWV1cbiAgfSBlbHNlIGlmIChkYXRlUGFydHNbMF0gPD0gMTIgJiYgZGF0ZVBhcnRzWzFdIDw9IDMxICYmIGRhdGVQYXJ0c1syXSA+IDEwMDAgJiYgZGF0ZVBhcnRzWzJdIDwgMjEwMCkge1xuICAgIHJldHVybiBuZXcgRGF0ZShkYXRlUGFydHNbMl0sIGRhdGVQYXJ0c1swXSAtIDEsIGRhdGVQYXJ0c1sxXSk7XG4gIC8vIENoZWNrIGZvciBbTU0sIERELCBZWV1cbiAgfSBlbHNlIGlmIChkYXRlUGFydHNbMF0gPD0gMTIgJiYgZGF0ZVBhcnRzWzFdIDw9IDMxICYmIGRhdGVQYXJ0c1syXSA8IDEwMCkge1xuICAgIGNvbnN0IHllYXIgPSAoZGF0ZVBhcnRzWzJdIDw9IHRoaXNZZWFyID8gMjAwMCA6IDE5MDApICsgZGF0ZVBhcnRzWzJdO1xuICAgIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBkYXRlUGFydHNbMF0gLSAxLCBkYXRlUGFydHNbMV0pO1xuICAvLyBDaGVjayBmb3IgW1lZLCBNTSwgRERdXG4gIH0gZWxzZSBpZiAoZGF0ZVBhcnRzWzBdIDwgMTAwICYmIGRhdGVQYXJ0c1sxXSA8PSAxMiAmJiBkYXRlUGFydHNbMl0gPD0gMzEpIHtcbiAgICBjb25zdCB5ZWFyID0gKGRhdGVQYXJ0c1swXSA8PSB0aGlzWWVhciA/IDIwMDAgOiAxOTAwKSArIGRhdGVQYXJ0c1swXTtcbiAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgZGF0ZVBhcnRzWzFdIC0gMSwgZGF0ZVBhcnRzWzJdKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiAnZmluZERhdGUnIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtICB7IHN0cmluZyB9IHRleHRcbiAqIEByZXR1cm4geyBzdHJpbmcgfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZERhdGUodGV4dCkge1xuICBpZiAoIXRleHQpIHsgcmV0dXJuIG51bGw7IH1cbiAgbGV0IGZvdW5kRGF0ZTogYW55W107XG4gIC8vIE1hdGNoIC4uLllZWVktTU0tREQuLi5cbiAgZm91bmREYXRlID0gdGV4dC5tYXRjaCgvKD86MTl8MjApXFxkXFxkWy1fXFxcXFxcL1xcLiBdKD86MD9cXGR8MVswMTJdKVstX1xcXFxcXC9cXC4gXSg/OlswMTJdP1xcZHwzWzAxXSkoPyFcXGQpLyk7XG4gIGlmIChmb3VuZERhdGUpIHsgcmV0dXJuIGZvdW5kRGF0ZVswXTsgfVxuICAvLyBNYXRjaCAuLi5NTS1ERC1ZWVlZLi4uXG4gIGZvdW5kRGF0ZSA9IHRleHQubWF0Y2goLyg/OlswMTJdP1xcZHwzWzAxXSlbLV9cXFxcXFwvXFwuIF0oPzowP1xcZHwxWzAxMl0pWy1fXFxcXFxcL1xcLiBdKD86MTl8MjApXFxkXFxkKD8hXFxkKS8pO1xuICBpZiAoZm91bmREYXRlKSB7IHJldHVybiBmb3VuZERhdGVbMF07IH1cbiAgLy8gTWF0Y2ggTU0tREQtWVkuLi5cbiAgZm91bmREYXRlID0gdGV4dC5tYXRjaCgvXig/OlswMTJdP1xcZHwzWzAxXSlbLV9cXFxcXFwvXFwuIF0oPzowP1xcZHwxWzAxMl0pWy1fXFxcXFxcL1xcLiBdXFxkXFxkKD8hXFxkKS8pO1xuICBpZiAoZm91bmREYXRlKSB7IHJldHVybiBmb3VuZERhdGVbMF07IH1cbiAgLy8gTWF0Y2ggWVktTU0tREQuLi5cbiAgZm91bmREYXRlID0gdGV4dC5tYXRjaCgvXlxcZFxcZFstX1xcXFxcXC9cXC4gXSg/OlswMTJdP1xcZHwzWzAxXSlbLV9cXFxcXFwvXFwuIF0oPzowP1xcZHwxWzAxMl0pKD8hXFxkKS8pO1xuICBpZiAoZm91bmREYXRlKSB7IHJldHVybiBmb3VuZERhdGVbMF07IH1cbiAgLy8gTWF0Y2ggWVlZWU1NREQuLi5cbiAgZm91bmREYXRlID0gdGV4dC5tYXRjaCgvXig/OjE5fDIwKVxcZFxcZCg/OjBcXGR8MVswMTJdKSg/OlswMTJdXFxkfDNbMDFdKS8pO1xuICBpZiAoZm91bmREYXRlKSB7IHJldHVybiBmb3VuZERhdGVbMF07IH1cbn1cbiJdfQ==