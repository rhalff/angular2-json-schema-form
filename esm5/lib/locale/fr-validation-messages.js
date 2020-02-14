export var frValidationMessages = {
    required: 'Est obligatoire.',
    minLength: 'Doit avoir minimum {{minimumLength}} caractères (actuellement: {{currentLength}})',
    maxLength: 'Doit avoir maximum {{maximumLength}} caractères (actuellement: {{currentLength}})',
    pattern: 'Doit respecter: {{requiredPattern}}',
    format: function (error) {
        switch (error.requiredFormat) {
            case 'date':
                return 'Doit être une date, tel que "2000-12-31"';
            case 'time':
                return 'Doit être une heure, tel que "16:20" ou "03:14:15.9265"';
            case 'date-time':
                return 'Doit être une date et une heure, tel que "2000-03-14T01:59" ou "2000-03-14T01:59:26.535Z"';
            case 'email':
                return 'Doit être une adresse e-mail, tel que "name@example.com"';
            case 'hostname':
                return 'Doit être un nom de domaine, tel que "example.com"';
            case 'ipv4':
                return 'Doit être une adresse IPv4, tel que "127.0.0.1"';
            case 'ipv6':
                return 'Doit être une adresse IPv6, tel que "1234:5678:9ABC:DEF0:1234:5678:9ABC:DEF0"';
            case 'url':
                return 'Doit être une URL, tel que "http://www.example.com/page.html"';
            case 'uuid':
                return 'Doit être un UUID, tel que "12345678-9ABC-DEF0-1234-56789ABCDEF0"';
            case 'color':
                return 'Doit être une couleur, tel que "#FFFFFF" or "rgb(255, 255, 255)"';
            case 'json-pointer':
                return 'Doit être un JSON Pointer, tel que "/pointer/to/something"';
            case 'relative-json-pointer':
                return 'Doit être un relative JSON Pointer, tel que "2/pointer/to/something"';
            case 'regex':
                return 'Doit être une expression régulière, tel que "(1-)?\\d{3}-\\d{3}-\\d{4}"';
            default:
                return 'Doit être avoir le format correct: ' + error.requiredFormat;
        }
    },
    minimum: 'Doit être supérieur à {{minimumValue}}',
    exclusiveMinimum: 'Doit avoir minimum {{exclusiveMinimumValue}} charactères',
    maximum: 'Doit être inférieur à {{maximumValue}}',
    exclusiveMaximum: 'Doit avoir maximum {{exclusiveMaximumValue}} charactères',
    multipleOf: function (error) {
        if ((1 / error.multipleOfValue) % 10 === 0) {
            var decimals = Math.log10(1 / error.multipleOfValue);
            return "Doit comporter " + decimals + " ou moins de decimales.";
        }
        else {
            return "Doit \u00EAtre un multiple de " + error.multipleOfValue + ".";
        }
    },
    minProperties: 'Doit comporter au minimum {{minimumProperties}} éléments',
    maxProperties: 'Doit comporter au maximum {{maximumProperties}} éléments',
    minItems: 'Doit comporter au minimum {{minimumItems}} éléments',
    maxItems: 'Doit comporter au maximum {{minimumItems}} éléments',
    uniqueItems: 'Tous les éléments doivent être uniques',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnItdmFsaWRhdGlvbi1tZXNzYWdlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9sb2NhbGUvZnItdmFsaWRhdGlvbi1tZXNzYWdlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsSUFBTSxvQkFBb0IsR0FBUTtJQUN2QyxRQUFRLEVBQUUsa0JBQWtCO0lBQzVCLFNBQVMsRUFBRSxtRkFBbUY7SUFDOUYsU0FBUyxFQUFFLG1GQUFtRjtJQUM5RixPQUFPLEVBQUUscUNBQXFDO0lBQzlDLE1BQU0sWUFBQyxLQUFLO1FBQ1YsUUFBUSxLQUFLLENBQUMsY0FBYyxFQUFFO1lBQzVCLEtBQUssTUFBTTtnQkFDVCxPQUFPLDBDQUEwQyxDQUFBO1lBQ25ELEtBQUssTUFBTTtnQkFDVCxPQUFPLHlEQUF5RCxDQUFBO1lBQ2xFLEtBQUssV0FBVztnQkFDZCxPQUFPLDJGQUEyRixDQUFBO1lBQ3BHLEtBQUssT0FBTztnQkFDVixPQUFPLDBEQUEwRCxDQUFBO1lBQ25FLEtBQUssVUFBVTtnQkFDYixPQUFPLG9EQUFvRCxDQUFBO1lBQzdELEtBQUssTUFBTTtnQkFDVCxPQUFPLGlEQUFpRCxDQUFBO1lBQzFELEtBQUssTUFBTTtnQkFDVCxPQUFPLCtFQUErRSxDQUFBO1lBR3hGLEtBQUssS0FBSztnQkFDUixPQUFPLCtEQUErRCxDQUFBO1lBQ3hFLEtBQUssTUFBTTtnQkFDVCxPQUFPLG1FQUFtRSxDQUFBO1lBQzVFLEtBQUssT0FBTztnQkFDVixPQUFPLGtFQUFrRSxDQUFBO1lBQzNFLEtBQUssY0FBYztnQkFDakIsT0FBTyw0REFBNEQsQ0FBQTtZQUNyRSxLQUFLLHVCQUF1QjtnQkFDMUIsT0FBTyxzRUFBc0UsQ0FBQTtZQUMvRSxLQUFLLE9BQU87Z0JBQ1YsT0FBTyx5RUFBeUUsQ0FBQTtZQUNsRjtnQkFDRSxPQUFPLHFDQUFxQyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUE7U0FDdEU7SUFDSCxDQUFDO0lBQ0QsT0FBTyxFQUFFLHdDQUF3QztJQUNqRCxnQkFBZ0IsRUFBRSwwREFBMEQ7SUFDNUUsT0FBTyxFQUFFLHdDQUF3QztJQUNqRCxnQkFBZ0IsRUFBRSwwREFBMEQ7SUFDNUUsVUFBVSxZQUFDLEtBQUs7UUFDZCxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQzFDLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtZQUN0RCxPQUFPLG9CQUFrQixRQUFRLDRCQUF5QixDQUFBO1NBQzNEO2FBQU07WUFDTCxPQUFPLG1DQUE0QixLQUFLLENBQUMsZUFBZSxNQUFHLENBQUE7U0FDNUQ7SUFDSCxDQUFDO0lBQ0QsYUFBYSxFQUFFLDBEQUEwRDtJQUN6RSxhQUFhLEVBQUUsMERBQTBEO0lBQ3pFLFFBQVEsRUFBRSxxREFBcUQ7SUFDL0QsUUFBUSxFQUFFLHFEQUFxRDtJQUMvRCxXQUFXLEVBQUUsd0NBQXdDO0NBRXRELENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZnJWYWxpZGF0aW9uTWVzc2FnZXM6IGFueSA9IHsgLy8gRnJlbmNoIGVycm9yIG1lc3NhZ2VzXG4gIHJlcXVpcmVkOiAnRXN0IG9ibGlnYXRvaXJlLicsXG4gIG1pbkxlbmd0aDogJ0RvaXQgYXZvaXIgbWluaW11bSB7e21pbmltdW1MZW5ndGh9fSBjYXJhY3TDqHJlcyAoYWN0dWVsbGVtZW50OiB7e2N1cnJlbnRMZW5ndGh9fSknLFxuICBtYXhMZW5ndGg6ICdEb2l0IGF2b2lyIG1heGltdW0ge3ttYXhpbXVtTGVuZ3RofX0gY2FyYWN0w6hyZXMgKGFjdHVlbGxlbWVudDoge3tjdXJyZW50TGVuZ3RofX0pJyxcbiAgcGF0dGVybjogJ0RvaXQgcmVzcGVjdGVyOiB7e3JlcXVpcmVkUGF0dGVybn19JyxcbiAgZm9ybWF0KGVycm9yKSB7XG4gICAgc3dpdGNoIChlcnJvci5yZXF1aXJlZEZvcm1hdCkge1xuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiAnRG9pdCDDqnRyZSB1bmUgZGF0ZSwgdGVsIHF1ZSBcIjIwMDAtMTItMzFcIidcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICByZXR1cm4gJ0RvaXQgw6p0cmUgdW5lIGhldXJlLCB0ZWwgcXVlIFwiMTY6MjBcIiBvdSBcIjAzOjE0OjE1LjkyNjVcIidcbiAgICAgIGNhc2UgJ2RhdGUtdGltZSc6XG4gICAgICAgIHJldHVybiAnRG9pdCDDqnRyZSB1bmUgZGF0ZSBldCB1bmUgaGV1cmUsIHRlbCBxdWUgXCIyMDAwLTAzLTE0VDAxOjU5XCIgb3UgXCIyMDAwLTAzLTE0VDAxOjU5OjI2LjUzNVpcIidcbiAgICAgIGNhc2UgJ2VtYWlsJzpcbiAgICAgICAgcmV0dXJuICdEb2l0IMOqdHJlIHVuZSBhZHJlc3NlIGUtbWFpbCwgdGVsIHF1ZSBcIm5hbWVAZXhhbXBsZS5jb21cIidcbiAgICAgIGNhc2UgJ2hvc3RuYW1lJzpcbiAgICAgICAgcmV0dXJuICdEb2l0IMOqdHJlIHVuIG5vbSBkZSBkb21haW5lLCB0ZWwgcXVlIFwiZXhhbXBsZS5jb21cIidcbiAgICAgIGNhc2UgJ2lwdjQnOlxuICAgICAgICByZXR1cm4gJ0RvaXQgw6p0cmUgdW5lIGFkcmVzc2UgSVB2NCwgdGVsIHF1ZSBcIjEyNy4wLjAuMVwiJ1xuICAgICAgY2FzZSAnaXB2Nic6XG4gICAgICAgIHJldHVybiAnRG9pdCDDqnRyZSB1bmUgYWRyZXNzZSBJUHY2LCB0ZWwgcXVlIFwiMTIzNDo1Njc4OjlBQkM6REVGMDoxMjM0OjU2Nzg6OUFCQzpERUYwXCInXG4gICAgICAvLyBUT0RPOiBhZGQgZXhhbXBsZXMgZm9yICd1cmknLCAndXJpLXJlZmVyZW5jZScsIGFuZCAndXJpLXRlbXBsYXRlJ1xuICAgICAgLy8gY2FzZSAndXJpJzogY2FzZSAndXJpLXJlZmVyZW5jZSc6IGNhc2UgJ3VyaS10ZW1wbGF0ZSc6XG4gICAgICBjYXNlICd1cmwnOlxuICAgICAgICByZXR1cm4gJ0RvaXQgw6p0cmUgdW5lIFVSTCwgdGVsIHF1ZSBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb20vcGFnZS5odG1sXCInXG4gICAgICBjYXNlICd1dWlkJzpcbiAgICAgICAgcmV0dXJuICdEb2l0IMOqdHJlIHVuIFVVSUQsIHRlbCBxdWUgXCIxMjM0NTY3OC05QUJDLURFRjAtMTIzNC01Njc4OUFCQ0RFRjBcIidcbiAgICAgIGNhc2UgJ2NvbG9yJzpcbiAgICAgICAgcmV0dXJuICdEb2l0IMOqdHJlIHVuZSBjb3VsZXVyLCB0ZWwgcXVlIFwiI0ZGRkZGRlwiIG9yIFwicmdiKDI1NSwgMjU1LCAyNTUpXCInXG4gICAgICBjYXNlICdqc29uLXBvaW50ZXInOlxuICAgICAgICByZXR1cm4gJ0RvaXQgw6p0cmUgdW4gSlNPTiBQb2ludGVyLCB0ZWwgcXVlIFwiL3BvaW50ZXIvdG8vc29tZXRoaW5nXCInXG4gICAgICBjYXNlICdyZWxhdGl2ZS1qc29uLXBvaW50ZXInOlxuICAgICAgICByZXR1cm4gJ0RvaXQgw6p0cmUgdW4gcmVsYXRpdmUgSlNPTiBQb2ludGVyLCB0ZWwgcXVlIFwiMi9wb2ludGVyL3RvL3NvbWV0aGluZ1wiJ1xuICAgICAgY2FzZSAncmVnZXgnOlxuICAgICAgICByZXR1cm4gJ0RvaXQgw6p0cmUgdW5lIGV4cHJlc3Npb24gcsOpZ3VsacOocmUsIHRlbCBxdWUgXCIoMS0pP1xcXFxkezN9LVxcXFxkezN9LVxcXFxkezR9XCInXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ0RvaXQgw6p0cmUgYXZvaXIgbGUgZm9ybWF0IGNvcnJlY3Q6ICcgKyBlcnJvci5yZXF1aXJlZEZvcm1hdFxuICAgIH1cbiAgfSxcbiAgbWluaW11bTogJ0RvaXQgw6p0cmUgc3Vww6lyaWV1ciDDoCB7e21pbmltdW1WYWx1ZX19JyxcbiAgZXhjbHVzaXZlTWluaW11bTogJ0RvaXQgYXZvaXIgbWluaW11bSB7e2V4Y2x1c2l2ZU1pbmltdW1WYWx1ZX19IGNoYXJhY3TDqHJlcycsXG4gIG1heGltdW06ICdEb2l0IMOqdHJlIGluZsOpcmlldXIgw6Age3ttYXhpbXVtVmFsdWV9fScsXG4gIGV4Y2x1c2l2ZU1heGltdW06ICdEb2l0IGF2b2lyIG1heGltdW0ge3tleGNsdXNpdmVNYXhpbXVtVmFsdWV9fSBjaGFyYWN0w6hyZXMnLFxuICBtdWx0aXBsZU9mKGVycm9yKSB7XG4gICAgaWYgKCgxIC8gZXJyb3IubXVsdGlwbGVPZlZhbHVlKSAlIDEwID09PSAwKSB7XG4gICAgICBjb25zdCBkZWNpbWFscyA9IE1hdGgubG9nMTAoMSAvIGVycm9yLm11bHRpcGxlT2ZWYWx1ZSlcbiAgICAgIHJldHVybiBgRG9pdCBjb21wb3J0ZXIgJHtkZWNpbWFsc30gb3UgbW9pbnMgZGUgZGVjaW1hbGVzLmBcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGBEb2l0IMOqdHJlIHVuIG11bHRpcGxlIGRlICR7ZXJyb3IubXVsdGlwbGVPZlZhbHVlfS5gXG4gICAgfVxuICB9LFxuICBtaW5Qcm9wZXJ0aWVzOiAnRG9pdCBjb21wb3J0ZXIgYXUgbWluaW11bSB7e21pbmltdW1Qcm9wZXJ0aWVzfX0gw6lsw6ltZW50cycsXG4gIG1heFByb3BlcnRpZXM6ICdEb2l0IGNvbXBvcnRlciBhdSBtYXhpbXVtIHt7bWF4aW11bVByb3BlcnRpZXN9fSDDqWzDqW1lbnRzJyxcbiAgbWluSXRlbXM6ICdEb2l0IGNvbXBvcnRlciBhdSBtaW5pbXVtIHt7bWluaW11bUl0ZW1zfX0gw6lsw6ltZW50cycsXG4gIG1heEl0ZW1zOiAnRG9pdCBjb21wb3J0ZXIgYXUgbWF4aW11bSB7e21pbmltdW1JdGVtc319IMOpbMOpbWVudHMnLFxuICB1bmlxdWVJdGVtczogJ1RvdXMgbGVzIMOpbMOpbWVudHMgZG9pdmVudCDDqnRyZSB1bmlxdWVzJyxcbiAgLy8gTm90ZTogTm8gZGVmYXVsdCBlcnJvciBtZXNzYWdlcyBmb3IgJ3R5cGUnLCAnY29uc3QnLCAnZW51bScsIG9yICdkZXBlbmRlbmNpZXMnXG59XG4iXX0=