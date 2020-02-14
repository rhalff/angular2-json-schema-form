import { isDefined } from './isDefined';
import { isString } from './isString';
import { isInteger } from './isInteger';
import { isNumber } from './isNumber';
import { isDate } from './isDate';
import { isBoolean } from './isBoolean';
import { inArray } from './inArray';
export function toJavaScriptType(value, types, strictIntegers = true) {
    if (!isDefined(value)) {
        return null;
    }
    types = typeof types === 'string' ? [types] : types;
    if (strictIntegers && inArray('integer', types)) {
        if (isInteger(value, 'strict')) {
            return value;
        }
        if (isInteger(value)) {
            return parseInt(value, 10);
        }
    }
    if (inArray('number', types) || (!strictIntegers && inArray('integer', types))) {
        if (isNumber(value, 'strict')) {
            return value;
        }
        if (isNumber(value)) {
            return parseFloat(value);
        }
    }
    if (inArray('string', types)) {
        if (isString(value)) {
            return value;
        }
        if (isDate(value)) {
            return value.toISOString().slice(0, 10);
        }
        if (isNumber(value)) {
            return value.toString();
        }
    }
    if (isDate(value) && (inArray('integer', types) || inArray('number', types))) {
        return value.getTime();
    }
    if (inArray('boolean', types)) {
        if (isBoolean(value, true)) {
            return true;
        }
        if (isBoolean(value, false)) {
            return false;
        }
    }
    return null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9KYXZhc2NyaXB0VHlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nc2YtY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2Z1bmN0aW9ucy92YWxpZGF0b3IvdG9KYXZhc2NyaXB0VHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sYUFBYSxDQUFBO0FBQ3JDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxZQUFZLENBQUE7QUFDbkMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGFBQWEsQ0FBQTtBQUNyQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sWUFBWSxDQUFBO0FBQ25DLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxVQUFVLENBQUE7QUFDL0IsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGFBQWEsQ0FBQTtBQUNyQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sV0FBVyxDQUFBO0FBaUNqQyxNQUFNLFVBQVUsZ0JBQWdCLENBQzlCLEtBQXFCLEVBQ3JCLEtBQWtELEVBQ2xELGNBQWMsR0FBRyxJQUFJO0lBRXJCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDckIsT0FBTyxJQUFJLENBQUE7S0FDWjtJQUNELEtBQUssR0FBRyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUEwQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7SUFFNUUsSUFBSSxjQUFjLElBQUksT0FBTyxDQUFzQixTQUFTLEVBQUUsS0FBSyxDQUFDLEVBQUU7UUFDcEUsSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxFQUFFO1lBQzlCLE9BQU8sS0FBSyxDQUFBO1NBQ2I7UUFDRCxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNwQixPQUFPLFFBQVEsQ0FBQyxLQUFlLEVBQUUsRUFBRSxDQUFDLENBQUE7U0FDckM7S0FDRjtJQUNELElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUM5RSxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEVBQUU7WUFDN0IsT0FBTyxLQUFLLENBQUE7U0FDYjtRQUNELElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ25CLE9BQU8sVUFBVSxDQUFDLEtBQWUsQ0FBQyxDQUFBO1NBQ25DO0tBQ0Y7SUFDRCxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQUU7UUFDNUIsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbkIsT0FBTyxLQUFLLENBQUE7U0FDYjtRQUdELElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pCLE9BQVEsS0FBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7U0FDakQ7UUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNuQixPQUFPLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQTtTQUN4QjtLQUNGO0lBR0QsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUM1RSxPQUFRLEtBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtLQUNoQztJQUNELElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBRTtRQUM3QixJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDMUIsT0FBTyxJQUFJLENBQUE7U0FDWjtRQUNELElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRTtZQUMzQixPQUFPLEtBQUssQ0FBQTtTQUNiO0tBQ0Y7SUFDRCxPQUFPLElBQUksQ0FBQTtBQUNiLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzRGVmaW5lZH0gZnJvbSAnLi9pc0RlZmluZWQnXG5pbXBvcnQge2lzU3RyaW5nfSBmcm9tICcuL2lzU3RyaW5nJ1xuaW1wb3J0IHtpc0ludGVnZXJ9IGZyb20gJy4vaXNJbnRlZ2VyJ1xuaW1wb3J0IHtpc051bWJlcn0gZnJvbSAnLi9pc051bWJlcidcbmltcG9ydCB7aXNEYXRlfSBmcm9tICcuL2lzRGF0ZSdcbmltcG9ydCB7aXNCb29sZWFufSBmcm9tICcuL2lzQm9vbGVhbidcbmltcG9ydCB7aW5BcnJheX0gZnJvbSAnLi9pbkFycmF5J1xuaW1wb3J0IHtQcmltaXRpdmVWYWx1ZSwgU2NoZW1hUHJpbWl0aXZlVHlwZX0gZnJvbSAnLi90eXBlcydcblxuLyoqXG4gKiAndG9KYXZhU2NyaXB0VHlwZScgZnVuY3Rpb25cbiAqXG4gKiBDb252ZXJ0cyBhbiBpbnB1dCAocHJvYmFibHkgc3RyaW5nKSB2YWx1ZSB0byBhIEphdmFTY3JpcHQgcHJpbWl0aXZlIHR5cGUgLVxuICogJ3N0cmluZycsICdudW1iZXInLCAnYm9vbGVhbicsIG9yICdudWxsJyAtIGJlZm9yZSBzdG9yaW5nIGluIGEgSlNPTiBvYmplY3QuXG4gKlxuICogRG9lcyBub3QgY29lcmNlIHZhbHVlcyAob3RoZXIgdGhhbiBudWxsKSwgYW5kIG9ubHkgY29udmVydHMgdGhlIHR5cGVzXG4gKiBvZiB2YWx1ZXMgdGhhdCB3b3VsZCBvdGhlcndpc2UgYmUgdmFsaWQuXG4gKlxuICogSWYgdGhlIG9wdGlvbmFsIHRoaXJkIHBhcmFtZXRlciAnc3RyaWN0SW50ZWdlcnMnIGlzIFRSVUUsIGFuZCB0aGVcbiAqIEpTT04gU2NoZW1hIHR5cGUgJ2ludGVnZXInIGlzIHNwZWNpZmllZCwgaXQgYWxzbyB2ZXJpZmllcyB0aGUgaW5wdXQgdmFsdWVcbiAqIGlzIGFuIGludGVnZXIgYW5kLCBpZiBpdCBpcywgcmV0dXJucyBpdCBhcyBhIEphdmVTY3JpcHQgbnVtYmVyLlxuICogSWYgJ3N0cmljdEludGVnZXJzJyBpcyBGQUxTRSAob3Igbm90IHNldCkgdGhlIHR5cGUgJ2ludGVnZXInIGlzIHRyZWF0ZWRcbiAqIGV4YWN0bHkgdGhlIHNhbWUgYXMgJ251bWJlcicsIGFuZCBhbGxvd3MgZGVjaW1hbHMuXG4gKlxuICogVmFsaWQgRXhhbXBsZXM6XG4gKiB0b0phdmFTY3JpcHRUeXBlKCcxMCcsICAgJ251bWJlcicgKSA9IDEwICAgLy8gJzEwJyAgIGlzIGEgbnVtYmVyXG4gKiB0b0phdmFTY3JpcHRUeXBlKCcxMCcsICAgJ2ludGVnZXInKSA9IDEwICAgLy8gJzEwJyAgIGlzIGFsc28gYW4gaW50ZWdlclxuICogdG9KYXZhU2NyaXB0VHlwZSggMTAsICAgICdpbnRlZ2VyJykgPSAxMCAgIC8vICAxMCAgICBpcyBzdGlsbCBhbiBpbnRlZ2VyXG4gKiB0b0phdmFTY3JpcHRUeXBlKCAxMCwgICAgJ3N0cmluZycgKSA9ICcxMCcgLy8gIDEwICAgIGNhbiBiZSBtYWRlIGludG8gYSBzdHJpbmdcbiAqIHRvSmF2YVNjcmlwdFR5cGUoJzEwLjUnLCAnbnVtYmVyJyApID0gMTAuNSAvLyAnMTAuNScgaXMgYSBudW1iZXJcbiAqXG4gKiBJbnZhbGlkIEV4YW1wbGVzOlxuICogdG9KYXZhU2NyaXB0VHlwZSgnMTAuNScsICdpbnRlZ2VyJykgPSBudWxsIC8vICcxMC41JyBpcyBub3QgYW4gaW50ZWdlclxuICogdG9KYXZhU2NyaXB0VHlwZSggMTAuNSwgICdpbnRlZ2VyJykgPSBudWxsIC8vICAxMC41ICBpcyBzdGlsbCBub3QgYW4gaW50ZWdlclxuICpcbiAqIEBwYXJhbSB2YWx1ZSB0byBjb252ZXJ0XG4gKiBAcGFyYW0gdHlwZXMgLSB0eXBlcyB0byBjb252ZXJ0IHRvXG4gKiBAcGFyYW0gc3RyaWN0SW50ZWdlcnMgLSBpZiBGQUxTRSwgdHJlYXQgaW50ZWdlcnMgYXMgbnVtYmVyc1xuICovXG5leHBvcnQgZnVuY3Rpb24gdG9KYXZhU2NyaXB0VHlwZShcbiAgdmFsdWU6IFByaW1pdGl2ZVZhbHVlLFxuICB0eXBlczogU2NoZW1hUHJpbWl0aXZlVHlwZSB8IFNjaGVtYVByaW1pdGl2ZVR5cGVbXSxcbiAgc3RyaWN0SW50ZWdlcnMgPSB0cnVlXG4pOiBQcmltaXRpdmVWYWx1ZSB7XG4gIGlmICghaXNEZWZpbmVkKHZhbHVlKSkge1xuICAgIHJldHVybiBudWxsXG4gIH1cbiAgdHlwZXMgPSB0eXBlb2YgdHlwZXMgPT09ICdzdHJpbmcnID8gW3R5cGVzXSBhcyBTY2hlbWFQcmltaXRpdmVUeXBlW10gOiB0eXBlc1xuXG4gIGlmIChzdHJpY3RJbnRlZ2VycyAmJiBpbkFycmF5PFNjaGVtYVByaW1pdGl2ZVR5cGU+KCdpbnRlZ2VyJywgdHlwZXMpKSB7XG4gICAgaWYgKGlzSW50ZWdlcih2YWx1ZSwgJ3N0cmljdCcpKSB7XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG4gICAgaWYgKGlzSW50ZWdlcih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBwYXJzZUludCh2YWx1ZSBhcyBzdHJpbmcsIDEwKVxuICAgIH1cbiAgfVxuICBpZiAoaW5BcnJheSgnbnVtYmVyJywgdHlwZXMpIHx8ICghc3RyaWN0SW50ZWdlcnMgJiYgaW5BcnJheSgnaW50ZWdlcicsIHR5cGVzKSkpIHtcbiAgICBpZiAoaXNOdW1iZXIodmFsdWUsICdzdHJpY3QnKSkge1xuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuICAgIGlmIChpc051bWJlcih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlIGFzIHN0cmluZylcbiAgICB9XG4gIH1cbiAgaWYgKGluQXJyYXkoJ3N0cmluZycsIHR5cGVzKSkge1xuICAgIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cbiAgICAvLyBJZiB2YWx1ZSBpcyBhIGRhdGUsIGFuZCB0eXBlcyBpbmNsdWRlcyAnc3RyaW5nJyxcbiAgICAvLyBjb252ZXJ0IHRoZSBkYXRlIHRvIGEgc3RyaW5nXG4gICAgaWYgKGlzRGF0ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiAodmFsdWUgYXMgYW55KS50b0lTT1N0cmluZygpLnNsaWNlKDAsIDEwKVxuICAgIH1cbiAgICBpZiAoaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKVxuICAgIH1cbiAgfVxuICAvLyBJZiB2YWx1ZSBpcyBhIGRhdGUsIGFuZCB0eXBlcyBpbmNsdWRlcyAnaW50ZWdlcicgb3IgJ251bWJlcicsXG4gIC8vIGJ1dCBub3QgJ3N0cmluZycsIGNvbnZlcnQgdGhlIGRhdGUgdG8gYSBudW1iZXJcbiAgaWYgKGlzRGF0ZSh2YWx1ZSkgJiYgKGluQXJyYXkoJ2ludGVnZXInLCB0eXBlcykgfHwgaW5BcnJheSgnbnVtYmVyJywgdHlwZXMpKSkge1xuICAgIHJldHVybiAodmFsdWUgYXMgYW55KS5nZXRUaW1lKClcbiAgfVxuICBpZiAoaW5BcnJheSgnYm9vbGVhbicsIHR5cGVzKSkge1xuICAgIGlmIChpc0Jvb2xlYW4odmFsdWUsIHRydWUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICBpZiAoaXNCb29sZWFuKHZhbHVlLCBmYWxzZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbFxufVxuIl19