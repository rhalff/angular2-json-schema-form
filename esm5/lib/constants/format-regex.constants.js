export var jsonSchemaFormatTests = {
    date: /^\d\d\d\d-[0-1]\d-[0-3]\d$/,
    time: /^[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:z|[+-]\d\d:\d\d)?$/i,
    'date-time': /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s][0-2]\d:[0-5]\d(?::[0-5]\d)?(?:\.\d+)?(?:z|[+-]\d\d:\d\d)?$/i,
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i,
    hostname: /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*$/i,
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
    ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
    uri: /^(?:[a-z][a-z0-9+-.]*)(?::|\/)\/?[^\s]*$/i,
    'uri-reference': /^(?:(?:[a-z][a-z0-9+-.]*:)?\/\/)?[^\s]*$/i,
    'uri-template': /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    url: /^(?:(?:http[s\u017F]?|ftp):\/\/)(?:(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+(?::(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?@)?(?:(?!10(?:\.[0-9]{1,3}){3})(?!127(?:\.[0-9]{1,3}){3})(?!169\.254(?:\.[0-9]{1,3}){2})(?!192\.168(?:\.[0-9]{1,3}){2})(?!172\.(?:1[6-9]|2[0-9]|3[01])(?:\.[0-9]{1,3}){2})(?:[1-9][0-9]?|1[0-9][0-9]|2[01][0-9]|22[0-3])(?:\.(?:1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])){2}(?:\.(?:[1-9][0-9]?|1[0-9][0-9]|2[0-4][0-9]|25[0-4]))|(?:(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)(?:\.(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)*(?:\.(?:(?:[KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){2,})))(?::[0-9]{2,5})?(?:\/(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?$/i,
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    color: /^\s*(#(?:[\da-f]{3}){1,2}|rgb\((?:\d{1,3},\s*){2}\d{1,3}\)|rgba\((?:\d{1,3},\s*){3}\d*\.?\d+\)|hsl\(\d{1,3}(?:,\s*\d{1,3}%){2}\)|hsla\(\d{1,3}(?:,\s*\d{1,3}%){2},\s*\d*\.?\d+\))\s*$/gi,
    'json-pointer': /^(?:\/(?:[^~/]|~0|~1)*)*$|^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    'relative-json-pointer': /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    regex: function (str) {
        if (/[^\\]\\Z/.test(str)) {
            return false;
        }
        try {
            new RegExp(str);
            return true;
        }
        catch (e) {
            return false;
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LXJlZ2V4LmNvbnN0YW50cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9jb25zdGFudHMvZm9ybWF0LXJlZ2V4LmNvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSxNQUFNLENBQUMsSUFBTSxxQkFBcUIsR0FBRztJQUNuQyxJQUFJLEVBQUUsNEJBQTRCO0lBRWxDLElBQUksRUFBRSwwREFBMEQ7SUFJaEUsV0FBVyxFQUFFLDRGQUE0RjtJQUt6RyxLQUFLLEVBQUUsa0hBQWtIO0lBRXpILFFBQVEsRUFBRSxvRkFBb0Y7SUFHOUYsSUFBSSxFQUFFLDJFQUEyRTtJQUdqRixJQUFJLEVBQUUsb3BDQUFvcEM7SUFHMXBDLEdBQUcsRUFBRSwyQ0FBMkM7SUFHaEQsZUFBZSxFQUFFLDJDQUEyQztJQUc1RCxjQUFjLEVBQUUsbUxBQW1MO0lBTW5NLEdBQUcsRUFBRSwyckRBQTJyRDtJQUdoc0QsSUFBSSxFQUFFLDhEQUE4RDtJQUdwRSxLQUFLLEVBQUUseUxBQXlMO0lBR2hNLGNBQWMsRUFBRSx3RkFBd0Y7SUFFeEcsdUJBQXVCLEVBQUUsa0RBQWtEO0lBRTNFLEtBQUssWUFBQyxHQUFHO1FBQ1AsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3hCLE9BQU8sS0FBSyxDQUFBO1NBQ2I7UUFDRCxJQUFJO1lBRUYsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDZixPQUFPLElBQUksQ0FBQTtTQUNaO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLEtBQUssQ0FBQTtTQUNiO0lBQ0gsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZSBtYXgtbGluZS1sZW5ndGhcbi8vIHVwZGF0ZWQgZnJvbSBBSlYgZmFzdCBmb3JtYXQgcmVndWxhciBleHByZXNzaW9uczpcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9lcG9iZXJlemtpbi9hanYvYmxvYi9tYXN0ZXIvbGliL2NvbXBpbGUvZm9ybWF0cy5qc1xuXG5leHBvcnQgY29uc3QganNvblNjaGVtYUZvcm1hdFRlc3RzID0ge1xuICBkYXRlOiAvXlxcZFxcZFxcZFxcZC1bMC0xXVxcZC1bMC0zXVxcZCQvLFxuXG4gIHRpbWU6IC9eWzAtMl1cXGQ6WzAtNV1cXGQ6WzAtNV1cXGQoPzpcXC5cXGQrKT8oPzp6fFsrLV1cXGRcXGQ6XFxkXFxkKT8kL2ksXG5cbiAgLy8gTW9kaWZpZWQgdG8gYWxsb3cgaW5jb21wbGV0ZSBlbnRyaWVzLCBzdWNoIGFzXG4gIC8vIFwiMjAwMC0wMy0xNFQwMTo1OToyNi41MzVcIiAobmVlZHMgXCJaXCIpIG9yIFwiMjAwMC0wMy0xNFQwMTo1OVwiIChuZWVkcyBcIjowMFpcIilcbiAgJ2RhdGUtdGltZSc6IC9eXFxkXFxkXFxkXFxkLVswLTFdXFxkLVswLTNdXFxkW3RcXHNdWzAtMl1cXGQ6WzAtNV1cXGQoPzo6WzAtNV1cXGQpPyg/OlxcLlxcZCspPyg/Onp8WystXVxcZFxcZDpcXGRcXGQpPyQvaSxcblxuICAvLyBlbWFpbCAoc291cmNlcyBmcm9tIGpzZW4gdmFsaWRhdG9yKTpcbiAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMDEzMjMvdXNpbmctYS1yZWd1bGFyLWV4cHJlc3Npb24tdG8tdmFsaWRhdGUtYW4tZW1haWwtYWRkcmVzcyNhbnN3ZXItODgyOTM2M1xuICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9odG1sNS9mb3Jtcy5odG1sI3ZhbGlkLWUtbWFpbC1hZGRyZXNzIChzZWFyY2ggZm9yICd3aWxsZnVsIHZpb2xhdGlvbicpXG4gIGVtYWlsOiAvXlthLXowLTkuISMkJSYnKisvPT9eX2B7fH1+LV0rQFthLXowLTldKD86W2EtejAtOS1dezAsNjF9W2EtejAtOV0pPyg/OlxcLlthLXowLTldKD86W2EtejAtOS1dezAsNjF9W2EtejAtOV0pPykqJC9pLFxuXG4gIGhvc3RuYW1lOiAvXlthLXowLTldKD86W2EtejAtOS1dezAsNjF9W2EtejAtOV0pPyg/OlxcLlthLXowLTldKD86Wy0wLTlhLXpdezAsNjF9WzAtOWEtel0pPykqJC9pLFxuXG4gIC8vIG9wdGltaXplZCBodHRwczovL3d3dy5zYWZhcmlib29rc29ubGluZS5jb20vbGlicmFyeS92aWV3L3JlZ3VsYXItZXhwcmVzc2lvbnMtY29va2Jvb2svOTc4MDU5NjgwMjgzNy9jaDA3czE2Lmh0bWxcbiAgaXB2NDogL14oPzooPzoyNVswLTVdfDJbMC00XVxcZHxbMDFdP1xcZFxcZD8pXFwuKXszfSg/OjI1WzAtNV18MlswLTRdXFxkfFswMV0/XFxkXFxkPykkLyxcblxuICAvLyBvcHRpbWl6ZWQgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81MzQ5Ny9yZWd1bGFyLWV4cHJlc3Npb24tdGhhdC1tYXRjaGVzLXZhbGlkLWlwdjYtYWRkcmVzc2VzXG4gIGlwdjY6IC9eXFxzKig/Oig/Oig/OlswLTlhLWZdezEsNH06KXs3fSg/OlswLTlhLWZdezEsNH18OikpfCg/Oig/OlswLTlhLWZdezEsNH06KXs2fSg/OjpbMC05YS1mXXsxLDR9fCg/Oig/OjI1WzAtNV18MlswLTRdXFxkfDFcXGRcXGR8WzEtOV0/XFxkKSg/OlxcLig/OjI1WzAtNV18MlswLTRdXFxkfDFcXGRcXGR8WzEtOV0/XFxkKSl7M30pfDopKXwoPzooPzpbMC05YS1mXXsxLDR9Oil7NX0oPzooPzooPzo6WzAtOWEtZl17MSw0fSl7MSwyfSl8Oig/Oig/OjI1WzAtNV18MlswLTRdXFxkfDFcXGRcXGR8WzEtOV0/XFxkKSg/OlxcLig/OjI1WzAtNV18MlswLTRdXFxkfDFcXGRcXGR8WzEtOV0/XFxkKSl7M30pfDopKXwoPzooPzpbMC05YS1mXXsxLDR9Oil7NH0oPzooPzooPzo6WzAtOWEtZl17MSw0fSl7MSwzfSl8KD86KD86OlswLTlhLWZdezEsNH0pPzooPzooPzoyNVswLTVdfDJbMC00XVxcZHwxXFxkXFxkfFsxLTldP1xcZCkoPzpcXC4oPzoyNVswLTVdfDJbMC00XVxcZHwxXFxkXFxkfFsxLTldP1xcZCkpezN9KSl8OikpfCg/Oig/OlswLTlhLWZdezEsNH06KXszfSg/Oig/Oig/OjpbMC05YS1mXXsxLDR9KXsxLDR9KXwoPzooPzo6WzAtOWEtZl17MSw0fSl7MCwyfTooPzooPzoyNVswLTVdfDJbMC00XVxcZHwxXFxkXFxkfFsxLTldP1xcZCkoPzpcXC4oPzoyNVswLTVdfDJbMC00XVxcZHwxXFxkXFxkfFsxLTldP1xcZCkpezN9KSl8OikpfCg/Oig/OlswLTlhLWZdezEsNH06KXsyfSg/Oig/Oig/OjpbMC05YS1mXXsxLDR9KXsxLDV9KXwoPzooPzo6WzAtOWEtZl17MSw0fSl7MCwzfTooPzooPzoyNVswLTVdfDJbMC00XVxcZHwxXFxkXFxkfFsxLTldP1xcZCkoPzpcXC4oPzoyNVswLTVdfDJbMC00XVxcZHwxXFxkXFxkfFsxLTldP1xcZCkpezN9KSl8OikpfCg/Oig/OlswLTlhLWZdezEsNH06KXsxfSg/Oig/Oig/OjpbMC05YS1mXXsxLDR9KXsxLDZ9KXwoPzooPzo6WzAtOWEtZl17MSw0fSl7MCw0fTooPzooPzoyNVswLTVdfDJbMC00XVxcZHwxXFxkXFxkfFsxLTldP1xcZCkoPzpcXC4oPzoyNVswLTVdfDJbMC00XVxcZHwxXFxkXFxkfFsxLTldP1xcZCkpezN9KSl8OikpfCg/OjooPzooPzooPzo6WzAtOWEtZl17MSw0fSl7MSw3fSl8KD86KD86OlswLTlhLWZdezEsNH0pezAsNX06KD86KD86MjVbMC01XXwyWzAtNF1cXGR8MVxcZFxcZHxbMS05XT9cXGQpKD86XFwuKD86MjVbMC01XXwyWzAtNF1cXGR8MVxcZFxcZHxbMS05XT9cXGQpKXszfSkpfDopKSkoPzolLispP1xccyokL2ksXG5cbiAgLy8gdXJpOiBodHRwczovL2dpdGh1Yi5jb20vbWFmaW50b3NoL2lzLW15LWpzb24tdmFsaWQvYmxvYi9tYXN0ZXIvZm9ybWF0cy5qc1xuICB1cmk6IC9eKD86W2Etel1bYS16MC05Ky0uXSopKD86OnxcXC8pXFwvP1teXFxzXSokL2ksXG5cbiAgLy8gdXJpIGZyYWdtZW50OiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNhcHBlbmRpeC1BXG4gICd1cmktcmVmZXJlbmNlJzogL14oPzooPzpbYS16XVthLXowLTkrLS5dKjopP1xcL1xcLyk/W15cXHNdKiQvaSxcblxuICAvLyB1cmktdGVtcGxhdGU6IGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NTcwXG4gICd1cmktdGVtcGxhdGUnOiAvXig/Oig/OlteXFx4MDAtXFx4MjBcIic8PiVcXFxcXmB7fH1dfCVbMC05YS1mXXsyfSl8XFx7WysjLi87PyY9LCFAfF0/KD86W2EtejAtOV9dfCVbMC05YS1mXXsyfSkrKD86OlsxLTldWzAtOV17MCwzfXxcXCopPyg/OiwoPzpbYS16MC05X118JVswLTlhLWZdezJ9KSsoPzo6WzEtOV1bMC05XXswLDN9fFxcKik/KSpcXH0pKiQvaSxcblxuICAvLyBGb3IgdGhlIHNvdXJjZTogaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vZHBlcmluaS83MjkyOTRcbiAgLy8gRm9yIHRlc3QgY2FzZXM6IGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9kZW1vL3VybC1yZWdleFxuICAvLyBAdG9kbyBEZWxldGUgY3VycmVudCBVUkwgaW4gZmF2b3VyIG9mIHRoZSBjb21tZW50ZWQgb3V0IFVSTCBydWxlIHdoZW4gdGhpcyBhanYgaXNzdWUgaXMgZml4ZWQgaHR0cHM6Ly9naXRodWIuY29tL2VzbGludC9lc2xpbnQvaXNzdWVzLzc5ODMuXG4gIC8vIFVSTDogL14oPzooPzpodHRwcz98ZnRwKTpcXC9cXC8pKD86XFxTKyg/OjpcXFMqKT9AKT8oPzooPyExMCg/OlxcLlxcZHsxLDN9KXszfSkoPyExMjcoPzpcXC5cXGR7MSwzfSl7M30pKD8hMTY5XFwuMjU0KD86XFwuXFxkezEsM30pezJ9KSg/ITE5MlxcLjE2OCg/OlxcLlxcZHsxLDN9KXsyfSkoPyExNzJcXC4oPzoxWzYtOV18MlxcZHwzWzAtMV0pKD86XFwuXFxkezEsM30pezJ9KSg/OlsxLTldXFxkP3wxXFxkXFxkfDJbMDFdXFxkfDIyWzAtM10pKD86XFwuKD86MT9cXGR7MSwyfXwyWzAtNF1cXGR8MjVbMC01XSkpezJ9KD86XFwuKD86WzEtOV1cXGQ/fDFcXGRcXGR8MlswLTRdXFxkfDI1WzAtNF0pKXwoPzooPzpbYS16XFx1ezAwYTF9LVxcdXtmZmZmfTAtOV0rLT8pKlthLXpcXHV7MDBhMX0tXFx1e2ZmZmZ9MC05XSspKD86XFwuKD86W2EtelxcdXswMGExfS1cXHV7ZmZmZn0wLTldKy0/KSpbYS16XFx1ezAwYTF9LVxcdXtmZmZmfTAtOV0rKSooPzpcXC4oPzpbYS16XFx1ezAwYTF9LVxcdXtmZmZmfV17Mix9KSkpKD86OlxcZHsyLDV9KT8oPzpcXC9bXlxcc10qKT8kL2l1LFxuICB1cmw6IC9eKD86KD86aHR0cFtzXFx1MDE3Rl0/fGZ0cCk6XFwvXFwvKSg/Oig/OltcXDAtXFx4MDhcXHgwRS1cXHgxRiEtXFx4OUZcXHhBMS1cXHUxNjdGXFx1MTY4MS1cXHUxRkZGXFx1MjAwQi1cXHUyMDI3XFx1MjAyQS1cXHUyMDJFXFx1MjAzMC1cXHUyMDVFXFx1MjA2MC1cXHUyRkZGXFx1MzAwMS1cXHVEN0ZGXFx1RTAwMC1cXHVGRUZFXFx1RkYwMC1cXHVGRkZGXXxbXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdfFtcXHVEODAwLVxcdURCRkZdKD8hW1xcdURDMDAtXFx1REZGRl0pfCg/OlteXFx1RDgwMC1cXHVEQkZGXXxeKVtcXHVEQzAwLVxcdURGRkZdKSsoPzo6KD86W1xcMC1cXHgwOFxceDBFLVxceDFGIS1cXHg5RlxceEExLVxcdTE2N0ZcXHUxNjgxLVxcdTFGRkZcXHUyMDBCLVxcdTIwMjdcXHUyMDJBLVxcdTIwMkVcXHUyMDMwLVxcdTIwNUVcXHUyMDYwLVxcdTJGRkZcXHUzMDAxLVxcdUQ3RkZcXHVFMDAwLVxcdUZFRkVcXHVGRjAwLVxcdUZGRkZdfFtcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl18W1xcdUQ4MDAtXFx1REJGRl0oPyFbXFx1REMwMC1cXHVERkZGXSl8KD86W15cXHVEODAwLVxcdURCRkZdfF4pW1xcdURDMDAtXFx1REZGRl0pKik/QCk/KD86KD8hMTAoPzpcXC5bMC05XXsxLDN9KXszfSkoPyExMjcoPzpcXC5bMC05XXsxLDN9KXszfSkoPyExNjlcXC4yNTQoPzpcXC5bMC05XXsxLDN9KXsyfSkoPyExOTJcXC4xNjgoPzpcXC5bMC05XXsxLDN9KXsyfSkoPyExNzJcXC4oPzoxWzYtOV18MlswLTldfDNbMDFdKSg/OlxcLlswLTldezEsM30pezJ9KSg/OlsxLTldWzAtOV0/fDFbMC05XVswLTldfDJbMDFdWzAtOV18MjJbMC0zXSkoPzpcXC4oPzoxP1swLTldezEsMn18MlswLTRdWzAtOV18MjVbMC01XSkpezJ9KD86XFwuKD86WzEtOV1bMC05XT98MVswLTldWzAtOV18MlswLTRdWzAtOV18MjVbMC00XSkpfCg/Oig/Oig/OlswLTlLU2EtelxceEExLVxcdUQ3RkZcXHVFMDAwLVxcdUZGRkZdfFtcXHVEODAwLVxcdURCRkZdKD8hW1xcdURDMDAtXFx1REZGRl0pfCg/OlteXFx1RDgwMC1cXHVEQkZGXXxeKVtcXHVEQzAwLVxcdURGRkZdKSstPykqKD86WzAtOUtTYS16XFx4QTEtXFx1RDdGRlxcdUUwMDAtXFx1RkZGRl18W1xcdUQ4MDAtXFx1REJGRl0oPyFbXFx1REMwMC1cXHVERkZGXSl8KD86W15cXHVEODAwLVxcdURCRkZdfF4pW1xcdURDMDAtXFx1REZGRl0pKykoPzpcXC4oPzooPzpbMC05S1NhLXpcXHhBMS1cXHVEN0ZGXFx1RTAwMC1cXHVGRkZGXXxbXFx1RDgwMC1cXHVEQkZGXSg/IVtcXHVEQzAwLVxcdURGRkZdKXwoPzpbXlxcdUQ4MDAtXFx1REJGRl18XilbXFx1REMwMC1cXHVERkZGXSkrLT8pKig/OlswLTlLU2EtelxceEExLVxcdUQ3RkZcXHVFMDAwLVxcdUZGRkZdfFtcXHVEODAwLVxcdURCRkZdKD8hW1xcdURDMDAtXFx1REZGRl0pfCg/OlteXFx1RDgwMC1cXHVEQkZGXXxeKVtcXHVEQzAwLVxcdURGRkZdKSspKig/OlxcLig/Oig/OltLU2EtelxceEExLVxcdUQ3RkZcXHVFMDAwLVxcdUZGRkZdfFtcXHVEODAwLVxcdURCRkZdKD8hW1xcdURDMDAtXFx1REZGRl0pfCg/OlteXFx1RDgwMC1cXHVEQkZGXXxeKVtcXHVEQzAwLVxcdURGRkZdKXsyLH0pKSkoPzo6WzAtOV17Miw1fSk/KD86XFwvKD86W1xcMC1cXHgwOFxceDBFLVxceDFGIS1cXHg5RlxceEExLVxcdTE2N0ZcXHUxNjgxLVxcdTFGRkZcXHUyMDBCLVxcdTIwMjdcXHUyMDJBLVxcdTIwMkVcXHUyMDMwLVxcdTIwNUVcXHUyMDYwLVxcdTJGRkZcXHUzMDAxLVxcdUQ3RkZcXHVFMDAwLVxcdUZFRkVcXHVGRjAwLVxcdUZGRkZdfFtcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl18W1xcdUQ4MDAtXFx1REJGRl0oPyFbXFx1REMwMC1cXHVERkZGXSl8KD86W15cXHVEODAwLVxcdURCRkZdfF4pW1xcdURDMDAtXFx1REZGRl0pKik/JC9pLFxuXG4gIC8vIHV1aWQ6IGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzQxMjJcbiAgdXVpZDogL14oPzp1cm46dXVpZDopP1swLTlhLWZdezh9LSg/OlswLTlhLWZdezR9LSl7M31bMC05YS1mXXsxMn0kL2ksXG5cbiAgLy8gb3B0aW1pemVkIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL29sbW9rcmFtZXIvODJjY2NlNjczZjg2ZGI3Y2RhNWVcbiAgY29sb3I6IC9eXFxzKigjKD86W1xcZGEtZl17M30pezEsMn18cmdiXFwoKD86XFxkezEsM30sXFxzKil7Mn1cXGR7MSwzfVxcKXxyZ2JhXFwoKD86XFxkezEsM30sXFxzKil7M31cXGQqXFwuP1xcZCtcXCl8aHNsXFwoXFxkezEsM30oPzosXFxzKlxcZHsxLDN9JSl7Mn1cXCl8aHNsYVxcKFxcZHsxLDN9KD86LFxccypcXGR7MSwzfSUpezJ9LFxccypcXGQqXFwuP1xcZCtcXCkpXFxzKiQvZ2ksXG5cbiAgLy8gSlNPTi1wb2ludGVyOiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjkwMVxuICAnanNvbi1wb2ludGVyJzogL14oPzpcXC8oPzpbXn4vXXx+MHx+MSkqKSokfF4jKD86XFwvKD86W2EtejAtOV9cXC0uISQmJygpKissOzo9QF18JVswLTlhLWZdezJ9fH4wfH4xKSopKiQvaSxcblxuICAncmVsYXRpdmUtanNvbi1wb2ludGVyJzogL14oPzowfFsxLTldWzAtOV0qKSg/OiN8KD86XFwvKD86W15+L118fjB8fjEpKikqKSQvLFxuXG4gIHJlZ2V4KHN0cikge1xuICAgIGlmICgvW15cXFxcXVxcXFxaLy50ZXN0KHN0cikpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uXG4gICAgICBuZXcgUmVnRXhwKHN0cilcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB0eXBlIEpzb25TY2hlbWFGb3JtYXROYW1lcyA9XG4gICdkYXRlJyB8ICd0aW1lJyB8ICdkYXRlLXRpbWUnIHwgJ2VtYWlsJyB8ICdob3N0bmFtZScgfCAnaXB2NCcgfCAnaXB2NicgfFxuICAndXJpJyB8ICd1cmktcmVmZXJlbmNlJyB8ICd1cmktdGVtcGxhdGUnIHwgJ3VybCcgfCAndXVpZCcgfCAnY29sb3InIHxcbiAgJ2pzb24tcG9pbnRlcicgfCAncmVsYXRpdmUtanNvbi1wb2ludGVyJyB8ICdyZWdleCdcbiJdfQ==