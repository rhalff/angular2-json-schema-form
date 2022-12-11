export const enValidationMessages = {
    required: 'This field is required.',
    minLength: 'Must be {{minimumLength}} characters or longer (current length: {{currentLength}})',
    maxLength: 'Must be {{maximumLength}} characters or shorter (current length: {{currentLength}})',
    pattern: 'Must match pattern: {{requiredPattern}}',
    format(error) {
        switch (error.requiredFormat) {
            case 'date':
                return 'Must be a date, like "2000-12-31"';
            case 'time':
                return 'Must be a time, like "16:20" or "03:14:15.9265"';
            case 'date-time':
                return 'Must be a date-time, like "2000-03-14T01:59" or "2000-03-14T01:59:26.535Z"';
            case 'email':
                return 'Must be an email address, like "name@example.com"';
            case 'hostname':
                return 'Must be a hostname, like "example.com"';
            case 'ipv4':
                return 'Must be an IPv4 address, like "127.0.0.1"';
            case 'ipv6':
                return 'Must be an IPv6 address, like "1234:5678:9ABC:DEF0:1234:5678:9ABC:DEF0"';
            case 'url':
                return 'Must be a url, like "http://www.example.com/page.html"';
            case 'uuid':
                return 'Must be a uuid, like "12345678-9ABC-DEF0-1234-56789ABCDEF0"';
            case 'color':
                return 'Must be a color, like "#FFFFFF" or "rgb(255, 255, 255)"';
            case 'json-pointer':
                return 'Must be a JSON Pointer, like "/pointer/to/something"';
            case 'relative-json-pointer':
                return 'Must be a relative JSON Pointer, like "2/pointer/to/something"';
            case 'regex':
                return 'Must be a regular expression, like "(1-)?\\d{3}-\\d{3}-\\d{4}"';
            default:
                return 'Must be a correctly formatted ' + error.requiredFormat;
        }
    },
    minimum: 'Must be {{minimumValue}} or more',
    exclusiveMinimum: 'Must be more than {{exclusiveMinimumValue}}',
    maximum: 'Must be {{maximumValue}} or less',
    exclusiveMaximum: 'Must be less than {{exclusiveMaximumValue}}',
    multipleOf(error) {
        if ((1 / error.multipleOfValue) % 10 === 0) {
            const decimals = Math.log10(1 / error.multipleOfValue);
            return `Must have ${decimals} or fewer decimal places.`;
        }
        else {
            return `Must be a multiple of ${error.multipleOfValue}.`;
        }
    },
    minProperties: 'Must have {{minimumProperties}} or more items (current items: {{currentProperties}})',
    maxProperties: 'Must have {{maximumProperties}} or fewer items (current items: {{currentProperties}})',
    minItems: 'Must have {{minimumItems}} or more items (current items: {{currentItems}})',
    maxItems: 'Must have {{maximumItems}} or fewer items (current items: {{currentItems}})',
    uniqueItems: 'All items must be unique',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW4tdmFsaWRhdGlvbi1tZXNzYWdlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nc2YtY29tbW9uL3NyYy9saWIvbG9jYWxlL2VuLXZhbGlkYXRpb24tbWVzc2FnZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQVE7SUFDdkMsUUFBUSxFQUFFLHlCQUF5QjtJQUNuQyxTQUFTLEVBQUUsb0ZBQW9GO0lBQy9GLFNBQVMsRUFBRSxxRkFBcUY7SUFDaEcsT0FBTyxFQUFFLHlDQUF5QztJQUNsRCxNQUFNLENBQUMsS0FBSztRQUNWLFFBQVEsS0FBSyxDQUFDLGNBQWMsRUFBRTtZQUM1QixLQUFLLE1BQU07Z0JBQ1QsT0FBTyxtQ0FBbUMsQ0FBQTtZQUM1QyxLQUFLLE1BQU07Z0JBQ1QsT0FBTyxpREFBaUQsQ0FBQTtZQUMxRCxLQUFLLFdBQVc7Z0JBQ2QsT0FBTyw0RUFBNEUsQ0FBQTtZQUNyRixLQUFLLE9BQU87Z0JBQ1YsT0FBTyxtREFBbUQsQ0FBQTtZQUM1RCxLQUFLLFVBQVU7Z0JBQ2IsT0FBTyx3Q0FBd0MsQ0FBQTtZQUNqRCxLQUFLLE1BQU07Z0JBQ1QsT0FBTywyQ0FBMkMsQ0FBQTtZQUNwRCxLQUFLLE1BQU07Z0JBQ1QsT0FBTyx5RUFBeUUsQ0FBQTtZQUdsRixLQUFLLEtBQUs7Z0JBQ1IsT0FBTyx3REFBd0QsQ0FBQTtZQUNqRSxLQUFLLE1BQU07Z0JBQ1QsT0FBTyw2REFBNkQsQ0FBQTtZQUN0RSxLQUFLLE9BQU87Z0JBQ1YsT0FBTyx5REFBeUQsQ0FBQTtZQUNsRSxLQUFLLGNBQWM7Z0JBQ2pCLE9BQU8sc0RBQXNELENBQUE7WUFDL0QsS0FBSyx1QkFBdUI7Z0JBQzFCLE9BQU8sZ0VBQWdFLENBQUE7WUFDekUsS0FBSyxPQUFPO2dCQUNWLE9BQU8sZ0VBQWdFLENBQUE7WUFDekU7Z0JBQ0UsT0FBTyxnQ0FBZ0MsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFBO1NBQ2pFO0lBQ0gsQ0FBQztJQUNELE9BQU8sRUFBRSxrQ0FBa0M7SUFDM0MsZ0JBQWdCLEVBQUUsNkNBQTZDO0lBQy9ELE9BQU8sRUFBRSxrQ0FBa0M7SUFDM0MsZ0JBQWdCLEVBQUUsNkNBQTZDO0lBQy9ELFVBQVUsQ0FBQyxLQUFLO1FBQ2QsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRTtZQUMxQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7WUFDdEQsT0FBTyxhQUFhLFFBQVEsMkJBQTJCLENBQUE7U0FDeEQ7YUFBTTtZQUNMLE9BQU8seUJBQXlCLEtBQUssQ0FBQyxlQUFlLEdBQUcsQ0FBQTtTQUN6RDtJQUNILENBQUM7SUFDRCxhQUFhLEVBQUUsc0ZBQXNGO0lBQ3JHLGFBQWEsRUFBRSx1RkFBdUY7SUFDdEcsUUFBUSxFQUFFLDRFQUE0RTtJQUN0RixRQUFRLEVBQUUsNkVBQTZFO0lBQ3ZGLFdBQVcsRUFBRSwwQkFBMEI7Q0FFeEMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBlblZhbGlkYXRpb25NZXNzYWdlczogYW55ID0geyAvLyBEZWZhdWx0IEVuZ2xpc2ggZXJyb3IgbWVzc2FnZXNcbiAgcmVxdWlyZWQ6ICdUaGlzIGZpZWxkIGlzIHJlcXVpcmVkLicsXG4gIG1pbkxlbmd0aDogJ011c3QgYmUge3ttaW5pbXVtTGVuZ3RofX0gY2hhcmFjdGVycyBvciBsb25nZXIgKGN1cnJlbnQgbGVuZ3RoOiB7e2N1cnJlbnRMZW5ndGh9fSknLFxuICBtYXhMZW5ndGg6ICdNdXN0IGJlIHt7bWF4aW11bUxlbmd0aH19IGNoYXJhY3RlcnMgb3Igc2hvcnRlciAoY3VycmVudCBsZW5ndGg6IHt7Y3VycmVudExlbmd0aH19KScsXG4gIHBhdHRlcm46ICdNdXN0IG1hdGNoIHBhdHRlcm46IHt7cmVxdWlyZWRQYXR0ZXJufX0nLFxuICBmb3JtYXQoZXJyb3IpIHtcbiAgICBzd2l0Y2ggKGVycm9yLnJlcXVpcmVkRm9ybWF0KSB7XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgcmV0dXJuICdNdXN0IGJlIGEgZGF0ZSwgbGlrZSBcIjIwMDAtMTItMzFcIidcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICByZXR1cm4gJ011c3QgYmUgYSB0aW1lLCBsaWtlIFwiMTY6MjBcIiBvciBcIjAzOjE0OjE1LjkyNjVcIidcbiAgICAgIGNhc2UgJ2RhdGUtdGltZSc6XG4gICAgICAgIHJldHVybiAnTXVzdCBiZSBhIGRhdGUtdGltZSwgbGlrZSBcIjIwMDAtMDMtMTRUMDE6NTlcIiBvciBcIjIwMDAtMDMtMTRUMDE6NTk6MjYuNTM1WlwiJ1xuICAgICAgY2FzZSAnZW1haWwnOlxuICAgICAgICByZXR1cm4gJ011c3QgYmUgYW4gZW1haWwgYWRkcmVzcywgbGlrZSBcIm5hbWVAZXhhbXBsZS5jb21cIidcbiAgICAgIGNhc2UgJ2hvc3RuYW1lJzpcbiAgICAgICAgcmV0dXJuICdNdXN0IGJlIGEgaG9zdG5hbWUsIGxpa2UgXCJleGFtcGxlLmNvbVwiJ1xuICAgICAgY2FzZSAnaXB2NCc6XG4gICAgICAgIHJldHVybiAnTXVzdCBiZSBhbiBJUHY0IGFkZHJlc3MsIGxpa2UgXCIxMjcuMC4wLjFcIidcbiAgICAgIGNhc2UgJ2lwdjYnOlxuICAgICAgICByZXR1cm4gJ011c3QgYmUgYW4gSVB2NiBhZGRyZXNzLCBsaWtlIFwiMTIzNDo1Njc4OjlBQkM6REVGMDoxMjM0OjU2Nzg6OUFCQzpERUYwXCInXG4gICAgICAvLyBUT0RPOiBhZGQgZXhhbXBsZXMgZm9yICd1cmknLCAndXJpLXJlZmVyZW5jZScsIGFuZCAndXJpLXRlbXBsYXRlJ1xuICAgICAgLy8gY2FzZSAndXJpJzogY2FzZSAndXJpLXJlZmVyZW5jZSc6IGNhc2UgJ3VyaS10ZW1wbGF0ZSc6XG4gICAgICBjYXNlICd1cmwnOlxuICAgICAgICByZXR1cm4gJ011c3QgYmUgYSB1cmwsIGxpa2UgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tL3BhZ2UuaHRtbFwiJ1xuICAgICAgY2FzZSAndXVpZCc6XG4gICAgICAgIHJldHVybiAnTXVzdCBiZSBhIHV1aWQsIGxpa2UgXCIxMjM0NTY3OC05QUJDLURFRjAtMTIzNC01Njc4OUFCQ0RFRjBcIidcbiAgICAgIGNhc2UgJ2NvbG9yJzpcbiAgICAgICAgcmV0dXJuICdNdXN0IGJlIGEgY29sb3IsIGxpa2UgXCIjRkZGRkZGXCIgb3IgXCJyZ2IoMjU1LCAyNTUsIDI1NSlcIidcbiAgICAgIGNhc2UgJ2pzb24tcG9pbnRlcic6XG4gICAgICAgIHJldHVybiAnTXVzdCBiZSBhIEpTT04gUG9pbnRlciwgbGlrZSBcIi9wb2ludGVyL3RvL3NvbWV0aGluZ1wiJ1xuICAgICAgY2FzZSAncmVsYXRpdmUtanNvbi1wb2ludGVyJzpcbiAgICAgICAgcmV0dXJuICdNdXN0IGJlIGEgcmVsYXRpdmUgSlNPTiBQb2ludGVyLCBsaWtlIFwiMi9wb2ludGVyL3RvL3NvbWV0aGluZ1wiJ1xuICAgICAgY2FzZSAncmVnZXgnOlxuICAgICAgICByZXR1cm4gJ011c3QgYmUgYSByZWd1bGFyIGV4cHJlc3Npb24sIGxpa2UgXCIoMS0pP1xcXFxkezN9LVxcXFxkezN9LVxcXFxkezR9XCInXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ011c3QgYmUgYSBjb3JyZWN0bHkgZm9ybWF0dGVkICcgKyBlcnJvci5yZXF1aXJlZEZvcm1hdFxuICAgIH1cbiAgfSxcbiAgbWluaW11bTogJ011c3QgYmUge3ttaW5pbXVtVmFsdWV9fSBvciBtb3JlJyxcbiAgZXhjbHVzaXZlTWluaW11bTogJ011c3QgYmUgbW9yZSB0aGFuIHt7ZXhjbHVzaXZlTWluaW11bVZhbHVlfX0nLFxuICBtYXhpbXVtOiAnTXVzdCBiZSB7e21heGltdW1WYWx1ZX19IG9yIGxlc3MnLFxuICBleGNsdXNpdmVNYXhpbXVtOiAnTXVzdCBiZSBsZXNzIHRoYW4ge3tleGNsdXNpdmVNYXhpbXVtVmFsdWV9fScsXG4gIG11bHRpcGxlT2YoZXJyb3IpIHtcbiAgICBpZiAoKDEgLyBlcnJvci5tdWx0aXBsZU9mVmFsdWUpICUgMTAgPT09IDApIHtcbiAgICAgIGNvbnN0IGRlY2ltYWxzID0gTWF0aC5sb2cxMCgxIC8gZXJyb3IubXVsdGlwbGVPZlZhbHVlKVxuICAgICAgcmV0dXJuIGBNdXN0IGhhdmUgJHtkZWNpbWFsc30gb3IgZmV3ZXIgZGVjaW1hbCBwbGFjZXMuYFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYE11c3QgYmUgYSBtdWx0aXBsZSBvZiAke2Vycm9yLm11bHRpcGxlT2ZWYWx1ZX0uYFxuICAgIH1cbiAgfSxcbiAgbWluUHJvcGVydGllczogJ011c3QgaGF2ZSB7e21pbmltdW1Qcm9wZXJ0aWVzfX0gb3IgbW9yZSBpdGVtcyAoY3VycmVudCBpdGVtczoge3tjdXJyZW50UHJvcGVydGllc319KScsXG4gIG1heFByb3BlcnRpZXM6ICdNdXN0IGhhdmUge3ttYXhpbXVtUHJvcGVydGllc319IG9yIGZld2VyIGl0ZW1zIChjdXJyZW50IGl0ZW1zOiB7e2N1cnJlbnRQcm9wZXJ0aWVzfX0pJyxcbiAgbWluSXRlbXM6ICdNdXN0IGhhdmUge3ttaW5pbXVtSXRlbXN9fSBvciBtb3JlIGl0ZW1zIChjdXJyZW50IGl0ZW1zOiB7e2N1cnJlbnRJdGVtc319KScsXG4gIG1heEl0ZW1zOiAnTXVzdCBoYXZlIHt7bWF4aW11bUl0ZW1zfX0gb3IgZmV3ZXIgaXRlbXMgKGN1cnJlbnQgaXRlbXM6IHt7Y3VycmVudEl0ZW1zfX0pJyxcbiAgdW5pcXVlSXRlbXM6ICdBbGwgaXRlbXMgbXVzdCBiZSB1bmlxdWUnLFxuICAvLyBOb3RlOiBObyBkZWZhdWx0IGVycm9yIG1lc3NhZ2VzIGZvciAndHlwZScsICdjb25zdCcsICdlbnVtJywgb3IgJ2RlcGVuZGVuY2llcydcbn1cbiJdfQ==