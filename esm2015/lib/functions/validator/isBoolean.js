export function isBoolean(value, option = null) {
    if (option === 'strict') {
        return value === true || value === false;
    }
    if (option === true) {
        return value === true || value === 1 || value === 'true' || value === '1';
    }
    if (option === false) {
        return value === false || value === 0 || value === 'false' || value === '0';
    }
    return value === true || value === 1 || value === 'true' || value === '1' ||
        value === false || value === 0 || value === 'false' || value === '0';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNCb29sZWFuLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nc2YvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2Z1bmN0aW9ucy92YWxpZGF0b3IvaXNCb29sZWFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVVBLE1BQU0sVUFBVSxTQUFTLENBQUMsS0FBVSxFQUFFLFNBQWMsSUFBSTtJQUN0RCxJQUFJLE1BQU0sS0FBSyxRQUFRLEVBQUU7UUFDdkIsT0FBTyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxLQUFLLENBQUE7S0FDekM7SUFDRCxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7UUFDbkIsT0FBTyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksS0FBSyxLQUFLLE1BQU0sSUFBSSxLQUFLLEtBQUssR0FBRyxDQUFBO0tBQzFFO0lBQ0QsSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFFO1FBQ3BCLE9BQU8sS0FBSyxLQUFLLEtBQUssSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxPQUFPLElBQUksS0FBSyxLQUFLLEdBQUcsQ0FBQTtLQUM1RTtJQUNELE9BQU8sS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxNQUFNLElBQUksS0FBSyxLQUFLLEdBQUc7UUFDdkUsS0FBSyxLQUFLLEtBQUssSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxPQUFPLElBQUksS0FBSyxLQUFLLEdBQUcsQ0FBQTtBQUN4RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAnaXNCb29sZWFuJyB1dGlsaXR5IGZ1bmN0aW9uXG4gKlxuICogQ2hlY2tzIGlmIGEgdmFsdWUgaXMgYSBib29sZWFuLlxuICpcbiAqIEBwYXJhbSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBjaGVja1xuICogQHBhcmFtIG9wdGlvbiAtIGlmICdzdHJpY3QnLCBhbHNvIGNoZWNrcyBKYXZhU2NyaXB0IHR5cGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgVFJVRSBvciBGQUxTRSwgY2hlY2tzIG9ubHkgZm9yIHRoYXQgdmFsdWVcbiAqIEByZXR1cm4gdHJ1ZSBpZiBib29sZWFuLCBmYWxzZSBpZiBub3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZTogYW55LCBvcHRpb246IGFueSA9IG51bGwpOiBib29sZWFuIHtcbiAgaWYgKG9wdGlvbiA9PT0gJ3N0cmljdCcpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHRydWUgfHwgdmFsdWUgPT09IGZhbHNlXG4gIH1cbiAgaWYgKG9wdGlvbiA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gMSB8fCB2YWx1ZSA9PT0gJ3RydWUnIHx8IHZhbHVlID09PSAnMSdcbiAgfVxuICBpZiAob3B0aW9uID09PSBmYWxzZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT09IDAgfHwgdmFsdWUgPT09ICdmYWxzZScgfHwgdmFsdWUgPT09ICcwJ1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gMSB8fCB2YWx1ZSA9PT0gJ3RydWUnIHx8IHZhbHVlID09PSAnMScgfHxcbiAgICB2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT09IDAgfHwgdmFsdWUgPT09ICdmYWxzZScgfHwgdmFsdWUgPT09ICcwJ1xufVxuIl19