export var enValidationMessages = {
    required: 'This field is required.',
    minLength: 'Must be {{minimumLength}} characters or longer (current length: {{currentLength}})',
    maxLength: 'Must be {{maximumLength}} characters or shorter (current length: {{currentLength}})',
    pattern: 'Must match pattern: {{requiredPattern}}',
    format: function (error) {
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
    multipleOf: function (error) {
        if ((1 / error.multipleOfValue) % 10 === 0) {
            var decimals = Math.log10(1 / error.multipleOfValue);
            return "Must have " + decimals + " or fewer decimal places.";
        }
        else {
            return "Must be a multiple of " + error.multipleOfValue + ".";
        }
    },
    minProperties: 'Must have {{minimumProperties}} or more items (current items: {{currentProperties}})',
    maxProperties: 'Must have {{maximumProperties}} or fewer items (current items: {{currentProperties}})',
    minItems: 'Must have {{minimumItems}} or more items (current items: {{currentItems}})',
    maxItems: 'Must have {{maximumItems}} or fewer items (current items: {{currentItems}})',
    uniqueItems: 'All items must be unique',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW4tdmFsaWRhdGlvbi1tZXNzYWdlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nc2YtY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2xvY2FsZS9lbi12YWxpZGF0aW9uLW1lc3NhZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxJQUFNLG9CQUFvQixHQUFRO0lBQ3ZDLFFBQVEsRUFBRSx5QkFBeUI7SUFDbkMsU0FBUyxFQUFFLG9GQUFvRjtJQUMvRixTQUFTLEVBQUUscUZBQXFGO0lBQ2hHLE9BQU8sRUFBRSx5Q0FBeUM7SUFDbEQsTUFBTSxZQUFDLEtBQUs7UUFDVixRQUFRLEtBQUssQ0FBQyxjQUFjLEVBQUU7WUFDNUIsS0FBSyxNQUFNO2dCQUNULE9BQU8sbUNBQW1DLENBQUE7WUFDNUMsS0FBSyxNQUFNO2dCQUNULE9BQU8saURBQWlELENBQUE7WUFDMUQsS0FBSyxXQUFXO2dCQUNkLE9BQU8sNEVBQTRFLENBQUE7WUFDckYsS0FBSyxPQUFPO2dCQUNWLE9BQU8sbURBQW1ELENBQUE7WUFDNUQsS0FBSyxVQUFVO2dCQUNiLE9BQU8sd0NBQXdDLENBQUE7WUFDakQsS0FBSyxNQUFNO2dCQUNULE9BQU8sMkNBQTJDLENBQUE7WUFDcEQsS0FBSyxNQUFNO2dCQUNULE9BQU8seUVBQXlFLENBQUE7WUFHbEYsS0FBSyxLQUFLO2dCQUNSLE9BQU8sd0RBQXdELENBQUE7WUFDakUsS0FBSyxNQUFNO2dCQUNULE9BQU8sNkRBQTZELENBQUE7WUFDdEUsS0FBSyxPQUFPO2dCQUNWLE9BQU8seURBQXlELENBQUE7WUFDbEUsS0FBSyxjQUFjO2dCQUNqQixPQUFPLHNEQUFzRCxDQUFBO1lBQy9ELEtBQUssdUJBQXVCO2dCQUMxQixPQUFPLGdFQUFnRSxDQUFBO1lBQ3pFLEtBQUssT0FBTztnQkFDVixPQUFPLGdFQUFnRSxDQUFBO1lBQ3pFO2dCQUNFLE9BQU8sZ0NBQWdDLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQTtTQUNqRTtJQUNILENBQUM7SUFDRCxPQUFPLEVBQUUsa0NBQWtDO0lBQzNDLGdCQUFnQixFQUFFLDZDQUE2QztJQUMvRCxPQUFPLEVBQUUsa0NBQWtDO0lBQzNDLGdCQUFnQixFQUFFLDZDQUE2QztJQUMvRCxVQUFVLFlBQUMsS0FBSztRQUNkLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUU7WUFDMUMsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1lBQ3RELE9BQU8sZUFBYSxRQUFRLDhCQUEyQixDQUFBO1NBQ3hEO2FBQU07WUFDTCxPQUFPLDJCQUF5QixLQUFLLENBQUMsZUFBZSxNQUFHLENBQUE7U0FDekQ7SUFDSCxDQUFDO0lBQ0QsYUFBYSxFQUFFLHNGQUFzRjtJQUNyRyxhQUFhLEVBQUUsdUZBQXVGO0lBQ3RHLFFBQVEsRUFBRSw0RUFBNEU7SUFDdEYsUUFBUSxFQUFFLDZFQUE2RTtJQUN2RixXQUFXLEVBQUUsMEJBQTBCO0NBRXhDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZW5WYWxpZGF0aW9uTWVzc2FnZXM6IGFueSA9IHsgLy8gRGVmYXVsdCBFbmdsaXNoIGVycm9yIG1lc3NhZ2VzXG4gIHJlcXVpcmVkOiAnVGhpcyBmaWVsZCBpcyByZXF1aXJlZC4nLFxuICBtaW5MZW5ndGg6ICdNdXN0IGJlIHt7bWluaW11bUxlbmd0aH19IGNoYXJhY3RlcnMgb3IgbG9uZ2VyIChjdXJyZW50IGxlbmd0aDoge3tjdXJyZW50TGVuZ3RofX0pJyxcbiAgbWF4TGVuZ3RoOiAnTXVzdCBiZSB7e21heGltdW1MZW5ndGh9fSBjaGFyYWN0ZXJzIG9yIHNob3J0ZXIgKGN1cnJlbnQgbGVuZ3RoOiB7e2N1cnJlbnRMZW5ndGh9fSknLFxuICBwYXR0ZXJuOiAnTXVzdCBtYXRjaCBwYXR0ZXJuOiB7e3JlcXVpcmVkUGF0dGVybn19JyxcbiAgZm9ybWF0KGVycm9yKSB7XG4gICAgc3dpdGNoIChlcnJvci5yZXF1aXJlZEZvcm1hdCkge1xuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiAnTXVzdCBiZSBhIGRhdGUsIGxpa2UgXCIyMDAwLTEyLTMxXCInXG4gICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgcmV0dXJuICdNdXN0IGJlIGEgdGltZSwgbGlrZSBcIjE2OjIwXCIgb3IgXCIwMzoxNDoxNS45MjY1XCInXG4gICAgICBjYXNlICdkYXRlLXRpbWUnOlxuICAgICAgICByZXR1cm4gJ011c3QgYmUgYSBkYXRlLXRpbWUsIGxpa2UgXCIyMDAwLTAzLTE0VDAxOjU5XCIgb3IgXCIyMDAwLTAzLTE0VDAxOjU5OjI2LjUzNVpcIidcbiAgICAgIGNhc2UgJ2VtYWlsJzpcbiAgICAgICAgcmV0dXJuICdNdXN0IGJlIGFuIGVtYWlsIGFkZHJlc3MsIGxpa2UgXCJuYW1lQGV4YW1wbGUuY29tXCInXG4gICAgICBjYXNlICdob3N0bmFtZSc6XG4gICAgICAgIHJldHVybiAnTXVzdCBiZSBhIGhvc3RuYW1lLCBsaWtlIFwiZXhhbXBsZS5jb21cIidcbiAgICAgIGNhc2UgJ2lwdjQnOlxuICAgICAgICByZXR1cm4gJ011c3QgYmUgYW4gSVB2NCBhZGRyZXNzLCBsaWtlIFwiMTI3LjAuMC4xXCInXG4gICAgICBjYXNlICdpcHY2JzpcbiAgICAgICAgcmV0dXJuICdNdXN0IGJlIGFuIElQdjYgYWRkcmVzcywgbGlrZSBcIjEyMzQ6NTY3ODo5QUJDOkRFRjA6MTIzNDo1Njc4OjlBQkM6REVGMFwiJ1xuICAgICAgLy8gVE9ETzogYWRkIGV4YW1wbGVzIGZvciAndXJpJywgJ3VyaS1yZWZlcmVuY2UnLCBhbmQgJ3VyaS10ZW1wbGF0ZSdcbiAgICAgIC8vIGNhc2UgJ3VyaSc6IGNhc2UgJ3VyaS1yZWZlcmVuY2UnOiBjYXNlICd1cmktdGVtcGxhdGUnOlxuICAgICAgY2FzZSAndXJsJzpcbiAgICAgICAgcmV0dXJuICdNdXN0IGJlIGEgdXJsLCBsaWtlIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbS9wYWdlLmh0bWxcIidcbiAgICAgIGNhc2UgJ3V1aWQnOlxuICAgICAgICByZXR1cm4gJ011c3QgYmUgYSB1dWlkLCBsaWtlIFwiMTIzNDU2NzgtOUFCQy1ERUYwLTEyMzQtNTY3ODlBQkNERUYwXCInXG4gICAgICBjYXNlICdjb2xvcic6XG4gICAgICAgIHJldHVybiAnTXVzdCBiZSBhIGNvbG9yLCBsaWtlIFwiI0ZGRkZGRlwiIG9yIFwicmdiKDI1NSwgMjU1LCAyNTUpXCInXG4gICAgICBjYXNlICdqc29uLXBvaW50ZXInOlxuICAgICAgICByZXR1cm4gJ011c3QgYmUgYSBKU09OIFBvaW50ZXIsIGxpa2UgXCIvcG9pbnRlci90by9zb21ldGhpbmdcIidcbiAgICAgIGNhc2UgJ3JlbGF0aXZlLWpzb24tcG9pbnRlcic6XG4gICAgICAgIHJldHVybiAnTXVzdCBiZSBhIHJlbGF0aXZlIEpTT04gUG9pbnRlciwgbGlrZSBcIjIvcG9pbnRlci90by9zb21ldGhpbmdcIidcbiAgICAgIGNhc2UgJ3JlZ2V4JzpcbiAgICAgICAgcmV0dXJuICdNdXN0IGJlIGEgcmVndWxhciBleHByZXNzaW9uLCBsaWtlIFwiKDEtKT9cXFxcZHszfS1cXFxcZHszfS1cXFxcZHs0fVwiJ1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdNdXN0IGJlIGEgY29ycmVjdGx5IGZvcm1hdHRlZCAnICsgZXJyb3IucmVxdWlyZWRGb3JtYXRcbiAgICB9XG4gIH0sXG4gIG1pbmltdW06ICdNdXN0IGJlIHt7bWluaW11bVZhbHVlfX0gb3IgbW9yZScsXG4gIGV4Y2x1c2l2ZU1pbmltdW06ICdNdXN0IGJlIG1vcmUgdGhhbiB7e2V4Y2x1c2l2ZU1pbmltdW1WYWx1ZX19JyxcbiAgbWF4aW11bTogJ011c3QgYmUge3ttYXhpbXVtVmFsdWV9fSBvciBsZXNzJyxcbiAgZXhjbHVzaXZlTWF4aW11bTogJ011c3QgYmUgbGVzcyB0aGFuIHt7ZXhjbHVzaXZlTWF4aW11bVZhbHVlfX0nLFxuICBtdWx0aXBsZU9mKGVycm9yKSB7XG4gICAgaWYgKCgxIC8gZXJyb3IubXVsdGlwbGVPZlZhbHVlKSAlIDEwID09PSAwKSB7XG4gICAgICBjb25zdCBkZWNpbWFscyA9IE1hdGgubG9nMTAoMSAvIGVycm9yLm11bHRpcGxlT2ZWYWx1ZSlcbiAgICAgIHJldHVybiBgTXVzdCBoYXZlICR7ZGVjaW1hbHN9IG9yIGZld2VyIGRlY2ltYWwgcGxhY2VzLmBcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGBNdXN0IGJlIGEgbXVsdGlwbGUgb2YgJHtlcnJvci5tdWx0aXBsZU9mVmFsdWV9LmBcbiAgICB9XG4gIH0sXG4gIG1pblByb3BlcnRpZXM6ICdNdXN0IGhhdmUge3ttaW5pbXVtUHJvcGVydGllc319IG9yIG1vcmUgaXRlbXMgKGN1cnJlbnQgaXRlbXM6IHt7Y3VycmVudFByb3BlcnRpZXN9fSknLFxuICBtYXhQcm9wZXJ0aWVzOiAnTXVzdCBoYXZlIHt7bWF4aW11bVByb3BlcnRpZXN9fSBvciBmZXdlciBpdGVtcyAoY3VycmVudCBpdGVtczoge3tjdXJyZW50UHJvcGVydGllc319KScsXG4gIG1pbkl0ZW1zOiAnTXVzdCBoYXZlIHt7bWluaW11bUl0ZW1zfX0gb3IgbW9yZSBpdGVtcyAoY3VycmVudCBpdGVtczoge3tjdXJyZW50SXRlbXN9fSknLFxuICBtYXhJdGVtczogJ011c3QgaGF2ZSB7e21heGltdW1JdGVtc319IG9yIGZld2VyIGl0ZW1zIChjdXJyZW50IGl0ZW1zOiB7e2N1cnJlbnRJdGVtc319KScsXG4gIHVuaXF1ZUl0ZW1zOiAnQWxsIGl0ZW1zIG11c3QgYmUgdW5pcXVlJyxcbiAgLy8gTm90ZTogTm8gZGVmYXVsdCBlcnJvciBtZXNzYWdlcyBmb3IgJ3R5cGUnLCAnY29uc3QnLCAnZW51bScsIG9yICdkZXBlbmRlbmNpZXMnXG59XG4iXX0=