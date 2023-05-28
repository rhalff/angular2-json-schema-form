export const frValidationMessages = {
    required: 'Est obligatoire.',
    minLength: 'Doit avoir minimum {{minimumLength}} caractères (actuellement: {{currentLength}})',
    maxLength: 'Doit avoir maximum {{maximumLength}} caractères (actuellement: {{currentLength}})',
    pattern: 'Doit respecter: {{requiredPattern}}',
    format(error) {
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
    multipleOf(error) {
        if ((1 / error.multipleOfValue) % 10 === 0) {
            const decimals = Math.log10(1 / error.multipleOfValue);
            return `Doit comporter ${decimals} ou moins de decimales.`;
        }
        else {
            return `Doit être un multiple de ${error.multipleOfValue}.`;
        }
    },
    minProperties: 'Doit comporter au minimum {{minimumProperties}} éléments',
    maxProperties: 'Doit comporter au maximum {{maximumProperties}} éléments',
    minItems: 'Doit comporter au minimum {{minimumItems}} éléments',
    maxItems: 'Doit comporter au maximum {{minimumItems}} éléments',
    uniqueItems: 'Tous les éléments doivent être uniques',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnItdmFsaWRhdGlvbi1tZXNzYWdlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nc2YtY29tbW9uL3NyYy9saWIvbG9jYWxlL2ZyLXZhbGlkYXRpb24tbWVzc2FnZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQVE7SUFDdkMsUUFBUSxFQUFFLGtCQUFrQjtJQUM1QixTQUFTLEVBQUUsbUZBQW1GO0lBQzlGLFNBQVMsRUFBRSxtRkFBbUY7SUFDOUYsT0FBTyxFQUFFLHFDQUFxQztJQUM5QyxNQUFNLENBQUMsS0FBSztRQUNWLFFBQVEsS0FBSyxDQUFDLGNBQWMsRUFBRTtZQUM1QixLQUFLLE1BQU07Z0JBQ1QsT0FBTywwQ0FBMEMsQ0FBQTtZQUNuRCxLQUFLLE1BQU07Z0JBQ1QsT0FBTyx5REFBeUQsQ0FBQTtZQUNsRSxLQUFLLFdBQVc7Z0JBQ2QsT0FBTywyRkFBMkYsQ0FBQTtZQUNwRyxLQUFLLE9BQU87Z0JBQ1YsT0FBTywwREFBMEQsQ0FBQTtZQUNuRSxLQUFLLFVBQVU7Z0JBQ2IsT0FBTyxvREFBb0QsQ0FBQTtZQUM3RCxLQUFLLE1BQU07Z0JBQ1QsT0FBTyxpREFBaUQsQ0FBQTtZQUMxRCxLQUFLLE1BQU07Z0JBQ1QsT0FBTywrRUFBK0UsQ0FBQTtZQUd4RixLQUFLLEtBQUs7Z0JBQ1IsT0FBTywrREFBK0QsQ0FBQTtZQUN4RSxLQUFLLE1BQU07Z0JBQ1QsT0FBTyxtRUFBbUUsQ0FBQTtZQUM1RSxLQUFLLE9BQU87Z0JBQ1YsT0FBTyxrRUFBa0UsQ0FBQTtZQUMzRSxLQUFLLGNBQWM7Z0JBQ2pCLE9BQU8sNERBQTRELENBQUE7WUFDckUsS0FBSyx1QkFBdUI7Z0JBQzFCLE9BQU8sc0VBQXNFLENBQUE7WUFDL0UsS0FBSyxPQUFPO2dCQUNWLE9BQU8seUVBQXlFLENBQUE7WUFDbEY7Z0JBQ0UsT0FBTyxxQ0FBcUMsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFBO1NBQ3RFO0lBQ0gsQ0FBQztJQUNELE9BQU8sRUFBRSx3Q0FBd0M7SUFDakQsZ0JBQWdCLEVBQUUsMERBQTBEO0lBQzVFLE9BQU8sRUFBRSx3Q0FBd0M7SUFDakQsZ0JBQWdCLEVBQUUsMERBQTBEO0lBQzVFLFVBQVUsQ0FBQyxLQUFLO1FBQ2QsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRTtZQUMxQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7WUFDdEQsT0FBTyxrQkFBa0IsUUFBUSx5QkFBeUIsQ0FBQTtTQUMzRDthQUFNO1lBQ0wsT0FBTyw0QkFBNEIsS0FBSyxDQUFDLGVBQWUsR0FBRyxDQUFBO1NBQzVEO0lBQ0gsQ0FBQztJQUNELGFBQWEsRUFBRSwwREFBMEQ7SUFDekUsYUFBYSxFQUFFLDBEQUEwRDtJQUN6RSxRQUFRLEVBQUUscURBQXFEO0lBQy9ELFFBQVEsRUFBRSxxREFBcUQ7SUFDL0QsV0FBVyxFQUFFLHdDQUF3QztDQUV0RCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGZyVmFsaWRhdGlvbk1lc3NhZ2VzOiBhbnkgPSB7IC8vIEZyZW5jaCBlcnJvciBtZXNzYWdlc1xuICByZXF1aXJlZDogJ0VzdCBvYmxpZ2F0b2lyZS4nLFxuICBtaW5MZW5ndGg6ICdEb2l0IGF2b2lyIG1pbmltdW0ge3ttaW5pbXVtTGVuZ3RofX0gY2FyYWN0w6hyZXMgKGFjdHVlbGxlbWVudDoge3tjdXJyZW50TGVuZ3RofX0pJyxcbiAgbWF4TGVuZ3RoOiAnRG9pdCBhdm9pciBtYXhpbXVtIHt7bWF4aW11bUxlbmd0aH19IGNhcmFjdMOocmVzIChhY3R1ZWxsZW1lbnQ6IHt7Y3VycmVudExlbmd0aH19KScsXG4gIHBhdHRlcm46ICdEb2l0IHJlc3BlY3Rlcjoge3tyZXF1aXJlZFBhdHRlcm59fScsXG4gIGZvcm1hdChlcnJvcikge1xuICAgIHN3aXRjaCAoZXJyb3IucmVxdWlyZWRGb3JtYXQpIHtcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICByZXR1cm4gJ0RvaXQgw6p0cmUgdW5lIGRhdGUsIHRlbCBxdWUgXCIyMDAwLTEyLTMxXCInXG4gICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgcmV0dXJuICdEb2l0IMOqdHJlIHVuZSBoZXVyZSwgdGVsIHF1ZSBcIjE2OjIwXCIgb3UgXCIwMzoxNDoxNS45MjY1XCInXG4gICAgICBjYXNlICdkYXRlLXRpbWUnOlxuICAgICAgICByZXR1cm4gJ0RvaXQgw6p0cmUgdW5lIGRhdGUgZXQgdW5lIGhldXJlLCB0ZWwgcXVlIFwiMjAwMC0wMy0xNFQwMTo1OVwiIG91IFwiMjAwMC0wMy0xNFQwMTo1OToyNi41MzVaXCInXG4gICAgICBjYXNlICdlbWFpbCc6XG4gICAgICAgIHJldHVybiAnRG9pdCDDqnRyZSB1bmUgYWRyZXNzZSBlLW1haWwsIHRlbCBxdWUgXCJuYW1lQGV4YW1wbGUuY29tXCInXG4gICAgICBjYXNlICdob3N0bmFtZSc6XG4gICAgICAgIHJldHVybiAnRG9pdCDDqnRyZSB1biBub20gZGUgZG9tYWluZSwgdGVsIHF1ZSBcImV4YW1wbGUuY29tXCInXG4gICAgICBjYXNlICdpcHY0JzpcbiAgICAgICAgcmV0dXJuICdEb2l0IMOqdHJlIHVuZSBhZHJlc3NlIElQdjQsIHRlbCBxdWUgXCIxMjcuMC4wLjFcIidcbiAgICAgIGNhc2UgJ2lwdjYnOlxuICAgICAgICByZXR1cm4gJ0RvaXQgw6p0cmUgdW5lIGFkcmVzc2UgSVB2NiwgdGVsIHF1ZSBcIjEyMzQ6NTY3ODo5QUJDOkRFRjA6MTIzNDo1Njc4OjlBQkM6REVGMFwiJ1xuICAgICAgLy8gVE9ETzogYWRkIGV4YW1wbGVzIGZvciAndXJpJywgJ3VyaS1yZWZlcmVuY2UnLCBhbmQgJ3VyaS10ZW1wbGF0ZSdcbiAgICAgIC8vIGNhc2UgJ3VyaSc6IGNhc2UgJ3VyaS1yZWZlcmVuY2UnOiBjYXNlICd1cmktdGVtcGxhdGUnOlxuICAgICAgY2FzZSAndXJsJzpcbiAgICAgICAgcmV0dXJuICdEb2l0IMOqdHJlIHVuZSBVUkwsIHRlbCBxdWUgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tL3BhZ2UuaHRtbFwiJ1xuICAgICAgY2FzZSAndXVpZCc6XG4gICAgICAgIHJldHVybiAnRG9pdCDDqnRyZSB1biBVVUlELCB0ZWwgcXVlIFwiMTIzNDU2NzgtOUFCQy1ERUYwLTEyMzQtNTY3ODlBQkNERUYwXCInXG4gICAgICBjYXNlICdjb2xvcic6XG4gICAgICAgIHJldHVybiAnRG9pdCDDqnRyZSB1bmUgY291bGV1ciwgdGVsIHF1ZSBcIiNGRkZGRkZcIiBvciBcInJnYigyNTUsIDI1NSwgMjU1KVwiJ1xuICAgICAgY2FzZSAnanNvbi1wb2ludGVyJzpcbiAgICAgICAgcmV0dXJuICdEb2l0IMOqdHJlIHVuIEpTT04gUG9pbnRlciwgdGVsIHF1ZSBcIi9wb2ludGVyL3RvL3NvbWV0aGluZ1wiJ1xuICAgICAgY2FzZSAncmVsYXRpdmUtanNvbi1wb2ludGVyJzpcbiAgICAgICAgcmV0dXJuICdEb2l0IMOqdHJlIHVuIHJlbGF0aXZlIEpTT04gUG9pbnRlciwgdGVsIHF1ZSBcIjIvcG9pbnRlci90by9zb21ldGhpbmdcIidcbiAgICAgIGNhc2UgJ3JlZ2V4JzpcbiAgICAgICAgcmV0dXJuICdEb2l0IMOqdHJlIHVuZSBleHByZXNzaW9uIHLDqWd1bGnDqHJlLCB0ZWwgcXVlIFwiKDEtKT9cXFxcZHszfS1cXFxcZHszfS1cXFxcZHs0fVwiJ1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdEb2l0IMOqdHJlIGF2b2lyIGxlIGZvcm1hdCBjb3JyZWN0OiAnICsgZXJyb3IucmVxdWlyZWRGb3JtYXRcbiAgICB9XG4gIH0sXG4gIG1pbmltdW06ICdEb2l0IMOqdHJlIHN1cMOpcmlldXIgw6Age3ttaW5pbXVtVmFsdWV9fScsXG4gIGV4Y2x1c2l2ZU1pbmltdW06ICdEb2l0IGF2b2lyIG1pbmltdW0ge3tleGNsdXNpdmVNaW5pbXVtVmFsdWV9fSBjaGFyYWN0w6hyZXMnLFxuICBtYXhpbXVtOiAnRG9pdCDDqnRyZSBpbmbDqXJpZXVyIMOgIHt7bWF4aW11bVZhbHVlfX0nLFxuICBleGNsdXNpdmVNYXhpbXVtOiAnRG9pdCBhdm9pciBtYXhpbXVtIHt7ZXhjbHVzaXZlTWF4aW11bVZhbHVlfX0gY2hhcmFjdMOocmVzJyxcbiAgbXVsdGlwbGVPZihlcnJvcikge1xuICAgIGlmICgoMSAvIGVycm9yLm11bHRpcGxlT2ZWYWx1ZSkgJSAxMCA9PT0gMCkge1xuICAgICAgY29uc3QgZGVjaW1hbHMgPSBNYXRoLmxvZzEwKDEgLyBlcnJvci5tdWx0aXBsZU9mVmFsdWUpXG4gICAgICByZXR1cm4gYERvaXQgY29tcG9ydGVyICR7ZGVjaW1hbHN9IG91IG1vaW5zIGRlIGRlY2ltYWxlcy5gXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgRG9pdCDDqnRyZSB1biBtdWx0aXBsZSBkZSAke2Vycm9yLm11bHRpcGxlT2ZWYWx1ZX0uYFxuICAgIH1cbiAgfSxcbiAgbWluUHJvcGVydGllczogJ0RvaXQgY29tcG9ydGVyIGF1IG1pbmltdW0ge3ttaW5pbXVtUHJvcGVydGllc319IMOpbMOpbWVudHMnLFxuICBtYXhQcm9wZXJ0aWVzOiAnRG9pdCBjb21wb3J0ZXIgYXUgbWF4aW11bSB7e21heGltdW1Qcm9wZXJ0aWVzfX0gw6lsw6ltZW50cycsXG4gIG1pbkl0ZW1zOiAnRG9pdCBjb21wb3J0ZXIgYXUgbWluaW11bSB7e21pbmltdW1JdGVtc319IMOpbMOpbWVudHMnLFxuICBtYXhJdGVtczogJ0RvaXQgY29tcG9ydGVyIGF1IG1heGltdW0ge3ttaW5pbXVtSXRlbXN9fSDDqWzDqW1lbnRzJyxcbiAgdW5pcXVlSXRlbXM6ICdUb3VzIGxlcyDDqWzDqW1lbnRzIGRvaXZlbnQgw6p0cmUgdW5pcXVlcycsXG4gIC8vIE5vdGU6IE5vIGRlZmF1bHQgZXJyb3IgbWVzc2FnZXMgZm9yICd0eXBlJywgJ2NvbnN0JywgJ2VudW0nLCBvciAnZGVwZW5kZW5jaWVzJ1xufVxuIl19