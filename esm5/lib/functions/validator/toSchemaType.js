import { isArray } from './isArray';
import { toJavaScriptType } from './toJavascriptType';
import { isNumber } from './isNumber';
import { isString } from './isString';
import { isBoolean } from './isBoolean';
import { hasValue } from './hasValue';
export function toSchemaType(value, type) {
    var types = isArray(type) ? type : [type];
    if (types.includes('null') && !hasValue(value)) {
        return null;
    }
    if (types.includes('boolean') && !isBoolean(value, 'strict')) {
        return value;
    }
    if (types.includes('integer')) {
        var testValue = toJavaScriptType(value, 'integer');
        if (testValue !== null) {
            return +testValue;
        }
    }
    if (types.includes('number')) {
        var testValue = toJavaScriptType(value, 'number');
        if (testValue !== null) {
            return +testValue;
        }
    }
    if ((isString(value) || isNumber(value, 'strict')) &&
        types.includes('string')) {
        return toJavaScriptType(value, 'string');
    }
    if (types.includes('boolean') && isBoolean(value)) {
        return toJavaScriptType(value, 'boolean');
    }
    if (types.includes('string')) {
        if (value === null) {
            return '';
        }
        var testValue = toJavaScriptType(value, 'string');
        if (testValue !== null) {
            return testValue;
        }
    }
    if (types.includes('number') ||
        types.includes('integer')) {
        if (value === true) {
            return 1;
        }
        if (value === false || value === null || value === '') {
            return 0;
        }
    }
    if (types.includes('number')) {
        var testValue = parseFloat(value);
        if (!!testValue) {
            return testValue;
        }
    }
    if (types.includes('integer')) {
        var testValue = parseInt(value, 10);
        if (!!testValue) {
            return testValue;
        }
    }
    if (types.includes('boolean')) {
        return !!value;
    }
    if ((types.includes('number') ||
        types.includes('integer')) && !types.includes('null')) {
        return 0;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9TY2hlbWFUeXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nc2YvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2Z1bmN0aW9ucy92YWxpZGF0b3IvdG9TY2hlbWFUeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxXQUFXLENBQUE7QUFDakMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sb0JBQW9CLENBQUE7QUFDbkQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLFlBQVksQ0FBQTtBQUNuQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sWUFBWSxDQUFBO0FBQ25DLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxhQUFhLENBQUE7QUFDckMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLFlBQVksQ0FBQTtBQTZDbkMsTUFBTSxVQUFVLFlBQVksQ0FDMUIsS0FBcUIsRUFDckIsSUFBaUQ7SUFFakQsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7SUFFM0MsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzlDLE9BQU8sSUFBSSxDQUFBO0tBQ1o7SUFDRCxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxFQUFFO1FBQzVELE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFDRCxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDN0IsSUFBTSxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFBO1FBQ3BELElBQUksU0FBUyxLQUFLLElBQUksRUFBRTtZQUN0QixPQUFPLENBQUMsU0FBUyxDQUFBO1NBQ2xCO0tBQ0Y7SUFDRCxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDNUIsSUFBTSxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQ25ELElBQUksU0FBUyxLQUFLLElBQUksRUFBRTtZQUN0QixPQUFPLENBQUMsU0FBUyxDQUFBO1NBQ2xCO0tBQ0Y7SUFDRCxJQUNFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFDeEI7UUFDQSxPQUFPLGdCQUFnQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQTtLQUN6QztJQUNELElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDakQsT0FBTyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUE7S0FDMUM7SUFDRCxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDNUIsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ2xCLE9BQU8sRUFBRSxDQUFBO1NBQ1Y7UUFDRCxJQUFNLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDbkQsSUFBSSxTQUFTLEtBQUssSUFBSSxFQUFFO1lBQ3RCLE9BQU8sU0FBUyxDQUFBO1NBQ2pCO0tBQ0Y7SUFDRCxJQUNFLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQ3pCO1FBQ0EsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ2xCLE9BQU8sQ0FBQyxDQUFBO1NBQ1Q7UUFDRCxJQUFJLEtBQUssS0FBSyxLQUFLLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO1lBQ3JELE9BQU8sQ0FBQyxDQUFBO1NBQ1Q7S0FDRjtJQUNELElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUM1QixJQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsS0FBZSxDQUFDLENBQUE7UUFDN0MsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFO1lBQ2YsT0FBTyxTQUFTLENBQUE7U0FDakI7S0FDRjtJQUNELElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUM3QixJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsS0FBZSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQy9DLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRTtZQUNmLE9BQU8sU0FBUyxDQUFBO1NBQ2pCO0tBQ0Y7SUFDRCxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDN0IsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFBO0tBQ2Y7SUFDRCxJQUFJLENBQ0YsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDeEIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQzFCO1FBQ0EsT0FBTyxDQUFDLENBQUE7S0FDVDtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1ByaW1pdGl2ZVZhbHVlLCBTY2hlbWFQcmltaXRpdmVUeXBlfSBmcm9tICcuL3R5cGVzJ1xuaW1wb3J0IHtpc0FycmF5fSBmcm9tICcuL2lzQXJyYXknXG5pbXBvcnQge3RvSmF2YVNjcmlwdFR5cGV9IGZyb20gJy4vdG9KYXZhc2NyaXB0VHlwZSdcbmltcG9ydCB7aXNOdW1iZXJ9IGZyb20gJy4vaXNOdW1iZXInXG5pbXBvcnQge2lzU3RyaW5nfSBmcm9tICcuL2lzU3RyaW5nJ1xuaW1wb3J0IHtpc0Jvb2xlYW59IGZyb20gJy4vaXNCb29sZWFuJ1xuaW1wb3J0IHtoYXNWYWx1ZX0gZnJvbSAnLi9oYXNWYWx1ZSdcblxuLyoqXG4gKiAndG9TY2hlbWFUeXBlJyBmdW5jdGlvblxuICpcbiAqIENvbnZlcnRzIGFuIGlucHV0IChwcm9iYWJseSBzdHJpbmcpIHZhbHVlIHRvIHRoZSBcImJlc3RcIiBKYXZhU2NyaXB0XG4gKiBlcXVpdmFsZW50IGF2YWlsYWJsZSBmcm9tIGFuIGFsbG93ZWQgbGlzdCBvZiBKU09OIFNjaGVtYSB0eXBlcywgd2hpY2ggbWF5XG4gKiBjb250YWluICdzdHJpbmcnLCAnbnVtYmVyJywgJ2ludGVnZXInLCAnYm9vbGVhbicsIGFuZC9vciAnbnVsbCcuXG4gKiBJZiBuZWNlc3NhcnksIGl0IGRvZXMgcHJvZ3Jlc3NpdmVseSBhZ2dyZXNzaXZlIHR5cGUgY29lcnNpb24uXG4gKiBJdCB3aWxsIG5vdCByZXR1cm4gbnVsbCB1bmxlc3MgbnVsbCBpcyBpbiB0aGUgbGlzdCBvZiBhbGxvd2VkIHR5cGVzLlxuICpcbiAqIE51bWJlciBjb252ZXJzaW9uIGV4YW1wbGVzOlxuICogdG9TY2hlbWFUeXBlKCcxMCcsIFsnbnVtYmVyJywnaW50ZWdlcicsJ3N0cmluZyddKSA9IDEwIC8vIGludGVnZXJcbiAqIHRvU2NoZW1hVHlwZSgnMTAnLCBbJ251bWJlcicsJ3N0cmluZyddKSA9IDEwIC8vIG51bWJlclxuICogdG9TY2hlbWFUeXBlKCcxMCcsIFsnc3RyaW5nJ10pID0gJzEwJyAvLyBzdHJpbmdcbiAqIHRvU2NoZW1hVHlwZSgnMTAuNScsIFsnbnVtYmVyJywnaW50ZWdlcicsJ3N0cmluZyddKSA9IDEwLjUgLy8gbnVtYmVyXG4gKiB0b1NjaGVtYVR5cGUoJzEwLjUnLCBbJ2ludGVnZXInLCdzdHJpbmcnXSkgPSAnMTAuNScgLy8gc3RyaW5nXG4gKiB0b1NjaGVtYVR5cGUoJzEwLjUnLCBbJ2ludGVnZXInXSkgPSAxMCAvLyBpbnRlZ2VyXG4gKiB0b1NjaGVtYVR5cGUoMTAuNSwgWydudWxsJywnYm9vbGVhbicsJ3N0cmluZyddKSA9ICcxMC41JyAvLyBzdHJpbmdcbiAqIHRvU2NoZW1hVHlwZSgxMC41LCBbJ251bGwnLCdib29sZWFuJ10pID0gdHJ1ZSAvLyBib29sZWFuXG4gKlxuICogU3RyaW5nIGNvbnZlcnNpb24gZXhhbXBsZXM6XG4gKiB0b1NjaGVtYVR5cGUoJzEuNXgnLCBbJ2Jvb2xlYW4nLCdudW1iZXInLCdpbnRlZ2VyJywnc3RyaW5nJ10pID0gJzEuNXgnIC8vIHN0cmluZ1xuICogdG9TY2hlbWFUeXBlKCcxLjV4JywgWydib29sZWFuJywnbnVtYmVyJywnaW50ZWdlciddKSA9ICcxLjUnIC8vIG51bWJlclxuICogdG9TY2hlbWFUeXBlKCcxLjV4JywgWydib29sZWFuJywnaW50ZWdlciddKSA9ICcxJyAvLyBpbnRlZ2VyXG4gKiB0b1NjaGVtYVR5cGUoJzEuNXgnLCBbJ2Jvb2xlYW4nXSkgPSB0cnVlIC8vIGJvb2xlYW5cbiAqIHRvU2NoZW1hVHlwZSgneHl6JywgWydudW1iZXInLCdpbnRlZ2VyJywnYm9vbGVhbicsJ251bGwnXSkgPSB0cnVlIC8vIGJvb2xlYW5cbiAqIHRvU2NoZW1hVHlwZSgneHl6JywgWydudW1iZXInLCdpbnRlZ2VyJywnbnVsbCddKSA9IG51bGwgLy8gbnVsbFxuICogdG9TY2hlbWFUeXBlKCd4eXonLCBbJ251bWJlcicsJ2ludGVnZXInXSkgPSAwIC8vIG51bWJlclxuICpcbiAqIEJvb2xlYW4gY29udmVyc2lvbiBleGFtcGxlczpcbiAqIHRvU2NoZW1hVHlwZSgnMScsIFsnaW50ZWdlcicsJ251bWJlcicsJ3N0cmluZycsJ2Jvb2xlYW4nXSkgPSAxIC8vIGludGVnZXJcbiAqIHRvU2NoZW1hVHlwZSgnMScsIFsnbnVtYmVyJywnc3RyaW5nJywnYm9vbGVhbiddKSA9IDEgLy8gbnVtYmVyXG4gKiB0b1NjaGVtYVR5cGUoJzEnLCBbJ3N0cmluZycsJ2Jvb2xlYW4nXSkgPSAnMScgLy8gc3RyaW5nXG4gKiB0b1NjaGVtYVR5cGUoJzEnLCBbJ2Jvb2xlYW4nXSkgPSB0cnVlIC8vIGJvb2xlYW5cbiAqIHRvU2NoZW1hVHlwZSgndHJ1ZScsIFsnbnVtYmVyJywnc3RyaW5nJywnYm9vbGVhbiddKSA9ICd0cnVlJyAvLyBzdHJpbmdcbiAqIHRvU2NoZW1hVHlwZSgndHJ1ZScsIFsnYm9vbGVhbiddKSA9IHRydWUgLy8gYm9vbGVhblxuICogdG9TY2hlbWFUeXBlKCd0cnVlJywgWydudW1iZXInXSkgPSAwIC8vIG51bWJlclxuICogdG9TY2hlbWFUeXBlKHRydWUsIFsnbnVtYmVyJywnc3RyaW5nJywnYm9vbGVhbiddKSA9IHRydWUgLy8gYm9vbGVhblxuICogdG9TY2hlbWFUeXBlKHRydWUsIFsnbnVtYmVyJywnc3RyaW5nJ10pID0gJ3RydWUnIC8vIHN0cmluZ1xuICogdG9TY2hlbWFUeXBlKHRydWUsIFsnbnVtYmVyJ10pID0gMSAvLyBudW1iZXJcbiAqXG4gKiBAcGFyYW0gdmFsdWUgLSB2YWx1ZSB0byBjb252ZXJ0XG4gKiBAcGFyYW0gdHlwZSAtIGFsbG93ZWQgdHlwZXMgdG8gY29udmVydCB0b1xuICovXG5leHBvcnQgZnVuY3Rpb24gdG9TY2hlbWFUeXBlKFxuICB2YWx1ZTogUHJpbWl0aXZlVmFsdWUsXG4gIHR5cGU6IFNjaGVtYVByaW1pdGl2ZVR5cGUgfCBTY2hlbWFQcmltaXRpdmVUeXBlW11cbikge1xuICBjb25zdCB0eXBlcyA9IGlzQXJyYXkodHlwZSkgPyB0eXBlIDogW3R5cGVdXG5cbiAgaWYgKHR5cGVzLmluY2x1ZGVzKCdudWxsJykgJiYgIWhhc1ZhbHVlKHZhbHVlKSkge1xuICAgIHJldHVybiBudWxsXG4gIH1cbiAgaWYgKHR5cGVzLmluY2x1ZGVzKCdib29sZWFuJykgJiYgIWlzQm9vbGVhbih2YWx1ZSwgJ3N0cmljdCcpKSB7XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cbiAgaWYgKHR5cGVzLmluY2x1ZGVzKCdpbnRlZ2VyJykpIHtcbiAgICBjb25zdCB0ZXN0VmFsdWUgPSB0b0phdmFTY3JpcHRUeXBlKHZhbHVlLCAnaW50ZWdlcicpXG4gICAgaWYgKHRlc3RWYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuICt0ZXN0VmFsdWVcbiAgICB9XG4gIH1cbiAgaWYgKHR5cGVzLmluY2x1ZGVzKCdudW1iZXInKSkge1xuICAgIGNvbnN0IHRlc3RWYWx1ZSA9IHRvSmF2YVNjcmlwdFR5cGUodmFsdWUsICdudW1iZXInKVxuICAgIGlmICh0ZXN0VmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiArdGVzdFZhbHVlXG4gICAgfVxuICB9XG4gIGlmIChcbiAgICAoaXNTdHJpbmcodmFsdWUpIHx8IGlzTnVtYmVyKHZhbHVlLCAnc3RyaWN0JykpICYmXG4gICAgdHlwZXMuaW5jbHVkZXMoJ3N0cmluZycpXG4gICkgeyAvLyBDb252ZXJ0IG51bWJlciB0byBzdHJpbmdcbiAgICByZXR1cm4gdG9KYXZhU2NyaXB0VHlwZSh2YWx1ZSwgJ3N0cmluZycpXG4gIH1cbiAgaWYgKHR5cGVzLmluY2x1ZGVzKCdib29sZWFuJykgJiYgaXNCb29sZWFuKHZhbHVlKSkge1xuICAgIHJldHVybiB0b0phdmFTY3JpcHRUeXBlKHZhbHVlLCAnYm9vbGVhbicpXG4gIH1cbiAgaWYgKHR5cGVzLmluY2x1ZGVzKCdzdHJpbmcnKSkgeyAvLyBDb252ZXJ0IG51bGwgJiBib29sZWFuIHRvIHN0cmluZ1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnXG4gICAgfVxuICAgIGNvbnN0IHRlc3RWYWx1ZSA9IHRvSmF2YVNjcmlwdFR5cGUodmFsdWUsICdzdHJpbmcnKVxuICAgIGlmICh0ZXN0VmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiB0ZXN0VmFsdWVcbiAgICB9XG4gIH1cbiAgaWYgKFxuICAgIHR5cGVzLmluY2x1ZGVzKCdudW1iZXInKSB8fFxuICAgIHR5cGVzLmluY2x1ZGVzKCdpbnRlZ2VyJylcbiAgKSB7XG4gICAgaWYgKHZhbHVlID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gMVxuICAgIH0gLy8gQ29udmVydCBib29sZWFuICYgbnVsbCB0byBudW1iZXJcbiAgICBpZiAodmFsdWUgPT09IGZhbHNlIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuIDBcbiAgICB9XG4gIH1cbiAgaWYgKHR5cGVzLmluY2x1ZGVzKCdudW1iZXInKSkgeyAvLyBDb252ZXJ0IG1peGVkIHN0cmluZyB0byBudW1iZXJcbiAgICBjb25zdCB0ZXN0VmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlIGFzIHN0cmluZylcbiAgICBpZiAoISF0ZXN0VmFsdWUpIHtcbiAgICAgIHJldHVybiB0ZXN0VmFsdWVcbiAgICB9XG4gIH1cbiAgaWYgKHR5cGVzLmluY2x1ZGVzKCdpbnRlZ2VyJykpIHsgLy8gQ29udmVydCBzdHJpbmcgb3IgbnVtYmVyIHRvIGludGVnZXJcbiAgICBjb25zdCB0ZXN0VmFsdWUgPSBwYXJzZUludCh2YWx1ZSBhcyBzdHJpbmcsIDEwKVxuICAgIGlmICghIXRlc3RWYWx1ZSkge1xuICAgICAgcmV0dXJuIHRlc3RWYWx1ZVxuICAgIH1cbiAgfVxuICBpZiAodHlwZXMuaW5jbHVkZXMoJ2Jvb2xlYW4nKSkgeyAvLyBDb252ZXJ0IGFueXRoaW5nIHRvIGJvb2xlYW5cbiAgICByZXR1cm4gISF2YWx1ZVxuICB9XG4gIGlmICgoXG4gICAgdHlwZXMuaW5jbHVkZXMoJ251bWJlcicpIHx8XG4gICAgdHlwZXMuaW5jbHVkZXMoJ2ludGVnZXInKVxuICApICYmICF0eXBlcy5pbmNsdWRlcygnbnVsbCcpXG4gICkge1xuICAgIHJldHVybiAwIC8vIElmIG51bGwgbm90IGFsbG93ZWQsIHJldHVybiAwIGZvciBub24tY29udmVydGFibGUgdmFsdWVzXG4gIH1cbn1cbiJdfQ==