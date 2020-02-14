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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW4tdmFsaWRhdGlvbi1tZXNzYWdlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9sb2NhbGUvZW4tdmFsaWRhdGlvbi1tZXNzYWdlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsSUFBTSxvQkFBb0IsR0FBUTtJQUN2QyxRQUFRLEVBQUUseUJBQXlCO0lBQ25DLFNBQVMsRUFBRSxvRkFBb0Y7SUFDL0YsU0FBUyxFQUFFLHFGQUFxRjtJQUNoRyxPQUFPLEVBQUUseUNBQXlDO0lBQ2xELE1BQU0sWUFBQyxLQUFLO1FBQ1YsUUFBUSxLQUFLLENBQUMsY0FBYyxFQUFFO1lBQzVCLEtBQUssTUFBTTtnQkFDVCxPQUFPLG1DQUFtQyxDQUFBO1lBQzVDLEtBQUssTUFBTTtnQkFDVCxPQUFPLGlEQUFpRCxDQUFBO1lBQzFELEtBQUssV0FBVztnQkFDZCxPQUFPLDRFQUE0RSxDQUFBO1lBQ3JGLEtBQUssT0FBTztnQkFDVixPQUFPLG1EQUFtRCxDQUFBO1lBQzVELEtBQUssVUFBVTtnQkFDYixPQUFPLHdDQUF3QyxDQUFBO1lBQ2pELEtBQUssTUFBTTtnQkFDVCxPQUFPLDJDQUEyQyxDQUFBO1lBQ3BELEtBQUssTUFBTTtnQkFDVCxPQUFPLHlFQUF5RSxDQUFBO1lBR2xGLEtBQUssS0FBSztnQkFDUixPQUFPLHdEQUF3RCxDQUFBO1lBQ2pFLEtBQUssTUFBTTtnQkFDVCxPQUFPLDZEQUE2RCxDQUFBO1lBQ3RFLEtBQUssT0FBTztnQkFDVixPQUFPLHlEQUF5RCxDQUFBO1lBQ2xFLEtBQUssY0FBYztnQkFDakIsT0FBTyxzREFBc0QsQ0FBQTtZQUMvRCxLQUFLLHVCQUF1QjtnQkFDMUIsT0FBTyxnRUFBZ0UsQ0FBQTtZQUN6RSxLQUFLLE9BQU87Z0JBQ1YsT0FBTyxnRUFBZ0UsQ0FBQTtZQUN6RTtnQkFDRSxPQUFPLGdDQUFnQyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUE7U0FDakU7SUFDSCxDQUFDO0lBQ0QsT0FBTyxFQUFFLGtDQUFrQztJQUMzQyxnQkFBZ0IsRUFBRSw2Q0FBNkM7SUFDL0QsT0FBTyxFQUFFLGtDQUFrQztJQUMzQyxnQkFBZ0IsRUFBRSw2Q0FBNkM7SUFDL0QsVUFBVSxZQUFDLEtBQUs7UUFDZCxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQzFDLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtZQUN0RCxPQUFPLGVBQWEsUUFBUSw4QkFBMkIsQ0FBQTtTQUN4RDthQUFNO1lBQ0wsT0FBTywyQkFBeUIsS0FBSyxDQUFDLGVBQWUsTUFBRyxDQUFBO1NBQ3pEO0lBQ0gsQ0FBQztJQUNELGFBQWEsRUFBRSxzRkFBc0Y7SUFDckcsYUFBYSxFQUFFLHVGQUF1RjtJQUN0RyxRQUFRLEVBQUUsNEVBQTRFO0lBQ3RGLFFBQVEsRUFBRSw2RUFBNkU7SUFDdkYsV0FBVyxFQUFFLDBCQUEwQjtDQUV4QyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGVuVmFsaWRhdGlvbk1lc3NhZ2VzOiBhbnkgPSB7IC8vIERlZmF1bHQgRW5nbGlzaCBlcnJvciBtZXNzYWdlc1xuICByZXF1aXJlZDogJ1RoaXMgZmllbGQgaXMgcmVxdWlyZWQuJyxcbiAgbWluTGVuZ3RoOiAnTXVzdCBiZSB7e21pbmltdW1MZW5ndGh9fSBjaGFyYWN0ZXJzIG9yIGxvbmdlciAoY3VycmVudCBsZW5ndGg6IHt7Y3VycmVudExlbmd0aH19KScsXG4gIG1heExlbmd0aDogJ011c3QgYmUge3ttYXhpbXVtTGVuZ3RofX0gY2hhcmFjdGVycyBvciBzaG9ydGVyIChjdXJyZW50IGxlbmd0aDoge3tjdXJyZW50TGVuZ3RofX0pJyxcbiAgcGF0dGVybjogJ011c3QgbWF0Y2ggcGF0dGVybjoge3tyZXF1aXJlZFBhdHRlcm59fScsXG4gIGZvcm1hdChlcnJvcikge1xuICAgIHN3aXRjaCAoZXJyb3IucmVxdWlyZWRGb3JtYXQpIHtcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICByZXR1cm4gJ011c3QgYmUgYSBkYXRlLCBsaWtlIFwiMjAwMC0xMi0zMVwiJ1xuICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgIHJldHVybiAnTXVzdCBiZSBhIHRpbWUsIGxpa2UgXCIxNjoyMFwiIG9yIFwiMDM6MTQ6MTUuOTI2NVwiJ1xuICAgICAgY2FzZSAnZGF0ZS10aW1lJzpcbiAgICAgICAgcmV0dXJuICdNdXN0IGJlIGEgZGF0ZS10aW1lLCBsaWtlIFwiMjAwMC0wMy0xNFQwMTo1OVwiIG9yIFwiMjAwMC0wMy0xNFQwMTo1OToyNi41MzVaXCInXG4gICAgICBjYXNlICdlbWFpbCc6XG4gICAgICAgIHJldHVybiAnTXVzdCBiZSBhbiBlbWFpbCBhZGRyZXNzLCBsaWtlIFwibmFtZUBleGFtcGxlLmNvbVwiJ1xuICAgICAgY2FzZSAnaG9zdG5hbWUnOlxuICAgICAgICByZXR1cm4gJ011c3QgYmUgYSBob3N0bmFtZSwgbGlrZSBcImV4YW1wbGUuY29tXCInXG4gICAgICBjYXNlICdpcHY0JzpcbiAgICAgICAgcmV0dXJuICdNdXN0IGJlIGFuIElQdjQgYWRkcmVzcywgbGlrZSBcIjEyNy4wLjAuMVwiJ1xuICAgICAgY2FzZSAnaXB2Nic6XG4gICAgICAgIHJldHVybiAnTXVzdCBiZSBhbiBJUHY2IGFkZHJlc3MsIGxpa2UgXCIxMjM0OjU2Nzg6OUFCQzpERUYwOjEyMzQ6NTY3ODo5QUJDOkRFRjBcIidcbiAgICAgIC8vIFRPRE86IGFkZCBleGFtcGxlcyBmb3IgJ3VyaScsICd1cmktcmVmZXJlbmNlJywgYW5kICd1cmktdGVtcGxhdGUnXG4gICAgICAvLyBjYXNlICd1cmknOiBjYXNlICd1cmktcmVmZXJlbmNlJzogY2FzZSAndXJpLXRlbXBsYXRlJzpcbiAgICAgIGNhc2UgJ3VybCc6XG4gICAgICAgIHJldHVybiAnTXVzdCBiZSBhIHVybCwgbGlrZSBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb20vcGFnZS5odG1sXCInXG4gICAgICBjYXNlICd1dWlkJzpcbiAgICAgICAgcmV0dXJuICdNdXN0IGJlIGEgdXVpZCwgbGlrZSBcIjEyMzQ1Njc4LTlBQkMtREVGMC0xMjM0LTU2Nzg5QUJDREVGMFwiJ1xuICAgICAgY2FzZSAnY29sb3InOlxuICAgICAgICByZXR1cm4gJ011c3QgYmUgYSBjb2xvciwgbGlrZSBcIiNGRkZGRkZcIiBvciBcInJnYigyNTUsIDI1NSwgMjU1KVwiJ1xuICAgICAgY2FzZSAnanNvbi1wb2ludGVyJzpcbiAgICAgICAgcmV0dXJuICdNdXN0IGJlIGEgSlNPTiBQb2ludGVyLCBsaWtlIFwiL3BvaW50ZXIvdG8vc29tZXRoaW5nXCInXG4gICAgICBjYXNlICdyZWxhdGl2ZS1qc29uLXBvaW50ZXInOlxuICAgICAgICByZXR1cm4gJ011c3QgYmUgYSByZWxhdGl2ZSBKU09OIFBvaW50ZXIsIGxpa2UgXCIyL3BvaW50ZXIvdG8vc29tZXRoaW5nXCInXG4gICAgICBjYXNlICdyZWdleCc6XG4gICAgICAgIHJldHVybiAnTXVzdCBiZSBhIHJlZ3VsYXIgZXhwcmVzc2lvbiwgbGlrZSBcIigxLSk/XFxcXGR7M30tXFxcXGR7M30tXFxcXGR7NH1cIidcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnTXVzdCBiZSBhIGNvcnJlY3RseSBmb3JtYXR0ZWQgJyArIGVycm9yLnJlcXVpcmVkRm9ybWF0XG4gICAgfVxuICB9LFxuICBtaW5pbXVtOiAnTXVzdCBiZSB7e21pbmltdW1WYWx1ZX19IG9yIG1vcmUnLFxuICBleGNsdXNpdmVNaW5pbXVtOiAnTXVzdCBiZSBtb3JlIHRoYW4ge3tleGNsdXNpdmVNaW5pbXVtVmFsdWV9fScsXG4gIG1heGltdW06ICdNdXN0IGJlIHt7bWF4aW11bVZhbHVlfX0gb3IgbGVzcycsXG4gIGV4Y2x1c2l2ZU1heGltdW06ICdNdXN0IGJlIGxlc3MgdGhhbiB7e2V4Y2x1c2l2ZU1heGltdW1WYWx1ZX19JyxcbiAgbXVsdGlwbGVPZihlcnJvcikge1xuICAgIGlmICgoMSAvIGVycm9yLm11bHRpcGxlT2ZWYWx1ZSkgJSAxMCA9PT0gMCkge1xuICAgICAgY29uc3QgZGVjaW1hbHMgPSBNYXRoLmxvZzEwKDEgLyBlcnJvci5tdWx0aXBsZU9mVmFsdWUpXG4gICAgICByZXR1cm4gYE11c3QgaGF2ZSAke2RlY2ltYWxzfSBvciBmZXdlciBkZWNpbWFsIHBsYWNlcy5gXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgTXVzdCBiZSBhIG11bHRpcGxlIG9mICR7ZXJyb3IubXVsdGlwbGVPZlZhbHVlfS5gXG4gICAgfVxuICB9LFxuICBtaW5Qcm9wZXJ0aWVzOiAnTXVzdCBoYXZlIHt7bWluaW11bVByb3BlcnRpZXN9fSBvciBtb3JlIGl0ZW1zIChjdXJyZW50IGl0ZW1zOiB7e2N1cnJlbnRQcm9wZXJ0aWVzfX0pJyxcbiAgbWF4UHJvcGVydGllczogJ011c3QgaGF2ZSB7e21heGltdW1Qcm9wZXJ0aWVzfX0gb3IgZmV3ZXIgaXRlbXMgKGN1cnJlbnQgaXRlbXM6IHt7Y3VycmVudFByb3BlcnRpZXN9fSknLFxuICBtaW5JdGVtczogJ011c3QgaGF2ZSB7e21pbmltdW1JdGVtc319IG9yIG1vcmUgaXRlbXMgKGN1cnJlbnQgaXRlbXM6IHt7Y3VycmVudEl0ZW1zfX0pJyxcbiAgbWF4SXRlbXM6ICdNdXN0IGhhdmUge3ttYXhpbXVtSXRlbXN9fSBvciBmZXdlciBpdGVtcyAoY3VycmVudCBpdGVtczoge3tjdXJyZW50SXRlbXN9fSknLFxuICB1bmlxdWVJdGVtczogJ0FsbCBpdGVtcyBtdXN0IGJlIHVuaXF1ZScsXG4gIC8vIE5vdGU6IE5vIGRlZmF1bHQgZXJyb3IgbWVzc2FnZXMgZm9yICd0eXBlJywgJ2NvbnN0JywgJ2VudW0nLCBvciAnZGVwZW5kZW5jaWVzJ1xufVxuIl19