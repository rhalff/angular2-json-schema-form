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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnItdmFsaWRhdGlvbi1tZXNzYWdlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nc2YtY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2xvY2FsZS9mci12YWxpZGF0aW9uLW1lc3NhZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFRO0lBQ3ZDLFFBQVEsRUFBRSxrQkFBa0I7SUFDNUIsU0FBUyxFQUFFLG1GQUFtRjtJQUM5RixTQUFTLEVBQUUsbUZBQW1GO0lBQzlGLE9BQU8sRUFBRSxxQ0FBcUM7SUFDOUMsTUFBTSxDQUFDLEtBQUs7UUFDVixRQUFRLEtBQUssQ0FBQyxjQUFjLEVBQUU7WUFDNUIsS0FBSyxNQUFNO2dCQUNULE9BQU8sMENBQTBDLENBQUE7WUFDbkQsS0FBSyxNQUFNO2dCQUNULE9BQU8seURBQXlELENBQUE7WUFDbEUsS0FBSyxXQUFXO2dCQUNkLE9BQU8sMkZBQTJGLENBQUE7WUFDcEcsS0FBSyxPQUFPO2dCQUNWLE9BQU8sMERBQTBELENBQUE7WUFDbkUsS0FBSyxVQUFVO2dCQUNiLE9BQU8sb0RBQW9ELENBQUE7WUFDN0QsS0FBSyxNQUFNO2dCQUNULE9BQU8saURBQWlELENBQUE7WUFDMUQsS0FBSyxNQUFNO2dCQUNULE9BQU8sK0VBQStFLENBQUE7WUFHeEYsS0FBSyxLQUFLO2dCQUNSLE9BQU8sK0RBQStELENBQUE7WUFDeEUsS0FBSyxNQUFNO2dCQUNULE9BQU8sbUVBQW1FLENBQUE7WUFDNUUsS0FBSyxPQUFPO2dCQUNWLE9BQU8sa0VBQWtFLENBQUE7WUFDM0UsS0FBSyxjQUFjO2dCQUNqQixPQUFPLDREQUE0RCxDQUFBO1lBQ3JFLEtBQUssdUJBQXVCO2dCQUMxQixPQUFPLHNFQUFzRSxDQUFBO1lBQy9FLEtBQUssT0FBTztnQkFDVixPQUFPLHlFQUF5RSxDQUFBO1lBQ2xGO2dCQUNFLE9BQU8scUNBQXFDLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQTtTQUN0RTtJQUNILENBQUM7SUFDRCxPQUFPLEVBQUUsd0NBQXdDO0lBQ2pELGdCQUFnQixFQUFFLDBEQUEwRDtJQUM1RSxPQUFPLEVBQUUsd0NBQXdDO0lBQ2pELGdCQUFnQixFQUFFLDBEQUEwRDtJQUM1RSxVQUFVLENBQUMsS0FBSztRQUNkLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUU7WUFDMUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1lBQ3RELE9BQU8sa0JBQWtCLFFBQVEseUJBQXlCLENBQUE7U0FDM0Q7YUFBTTtZQUNMLE9BQU8sNEJBQTRCLEtBQUssQ0FBQyxlQUFlLEdBQUcsQ0FBQTtTQUM1RDtJQUNILENBQUM7SUFDRCxhQUFhLEVBQUUsMERBQTBEO0lBQ3pFLGFBQWEsRUFBRSwwREFBMEQ7SUFDekUsUUFBUSxFQUFFLHFEQUFxRDtJQUMvRCxRQUFRLEVBQUUscURBQXFEO0lBQy9ELFdBQVcsRUFBRSx3Q0FBd0M7Q0FFdEQsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBmclZhbGlkYXRpb25NZXNzYWdlczogYW55ID0geyAvLyBGcmVuY2ggZXJyb3IgbWVzc2FnZXNcbiAgcmVxdWlyZWQ6ICdFc3Qgb2JsaWdhdG9pcmUuJyxcbiAgbWluTGVuZ3RoOiAnRG9pdCBhdm9pciBtaW5pbXVtIHt7bWluaW11bUxlbmd0aH19IGNhcmFjdMOocmVzIChhY3R1ZWxsZW1lbnQ6IHt7Y3VycmVudExlbmd0aH19KScsXG4gIG1heExlbmd0aDogJ0RvaXQgYXZvaXIgbWF4aW11bSB7e21heGltdW1MZW5ndGh9fSBjYXJhY3TDqHJlcyAoYWN0dWVsbGVtZW50OiB7e2N1cnJlbnRMZW5ndGh9fSknLFxuICBwYXR0ZXJuOiAnRG9pdCByZXNwZWN0ZXI6IHt7cmVxdWlyZWRQYXR0ZXJufX0nLFxuICBmb3JtYXQoZXJyb3IpIHtcbiAgICBzd2l0Y2ggKGVycm9yLnJlcXVpcmVkRm9ybWF0KSB7XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgcmV0dXJuICdEb2l0IMOqdHJlIHVuZSBkYXRlLCB0ZWwgcXVlIFwiMjAwMC0xMi0zMVwiJ1xuICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgIHJldHVybiAnRG9pdCDDqnRyZSB1bmUgaGV1cmUsIHRlbCBxdWUgXCIxNjoyMFwiIG91IFwiMDM6MTQ6MTUuOTI2NVwiJ1xuICAgICAgY2FzZSAnZGF0ZS10aW1lJzpcbiAgICAgICAgcmV0dXJuICdEb2l0IMOqdHJlIHVuZSBkYXRlIGV0IHVuZSBoZXVyZSwgdGVsIHF1ZSBcIjIwMDAtMDMtMTRUMDE6NTlcIiBvdSBcIjIwMDAtMDMtMTRUMDE6NTk6MjYuNTM1WlwiJ1xuICAgICAgY2FzZSAnZW1haWwnOlxuICAgICAgICByZXR1cm4gJ0RvaXQgw6p0cmUgdW5lIGFkcmVzc2UgZS1tYWlsLCB0ZWwgcXVlIFwibmFtZUBleGFtcGxlLmNvbVwiJ1xuICAgICAgY2FzZSAnaG9zdG5hbWUnOlxuICAgICAgICByZXR1cm4gJ0RvaXQgw6p0cmUgdW4gbm9tIGRlIGRvbWFpbmUsIHRlbCBxdWUgXCJleGFtcGxlLmNvbVwiJ1xuICAgICAgY2FzZSAnaXB2NCc6XG4gICAgICAgIHJldHVybiAnRG9pdCDDqnRyZSB1bmUgYWRyZXNzZSBJUHY0LCB0ZWwgcXVlIFwiMTI3LjAuMC4xXCInXG4gICAgICBjYXNlICdpcHY2JzpcbiAgICAgICAgcmV0dXJuICdEb2l0IMOqdHJlIHVuZSBhZHJlc3NlIElQdjYsIHRlbCBxdWUgXCIxMjM0OjU2Nzg6OUFCQzpERUYwOjEyMzQ6NTY3ODo5QUJDOkRFRjBcIidcbiAgICAgIC8vIFRPRE86IGFkZCBleGFtcGxlcyBmb3IgJ3VyaScsICd1cmktcmVmZXJlbmNlJywgYW5kICd1cmktdGVtcGxhdGUnXG4gICAgICAvLyBjYXNlICd1cmknOiBjYXNlICd1cmktcmVmZXJlbmNlJzogY2FzZSAndXJpLXRlbXBsYXRlJzpcbiAgICAgIGNhc2UgJ3VybCc6XG4gICAgICAgIHJldHVybiAnRG9pdCDDqnRyZSB1bmUgVVJMLCB0ZWwgcXVlIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbS9wYWdlLmh0bWxcIidcbiAgICAgIGNhc2UgJ3V1aWQnOlxuICAgICAgICByZXR1cm4gJ0RvaXQgw6p0cmUgdW4gVVVJRCwgdGVsIHF1ZSBcIjEyMzQ1Njc4LTlBQkMtREVGMC0xMjM0LTU2Nzg5QUJDREVGMFwiJ1xuICAgICAgY2FzZSAnY29sb3InOlxuICAgICAgICByZXR1cm4gJ0RvaXQgw6p0cmUgdW5lIGNvdWxldXIsIHRlbCBxdWUgXCIjRkZGRkZGXCIgb3IgXCJyZ2IoMjU1LCAyNTUsIDI1NSlcIidcbiAgICAgIGNhc2UgJ2pzb24tcG9pbnRlcic6XG4gICAgICAgIHJldHVybiAnRG9pdCDDqnRyZSB1biBKU09OIFBvaW50ZXIsIHRlbCBxdWUgXCIvcG9pbnRlci90by9zb21ldGhpbmdcIidcbiAgICAgIGNhc2UgJ3JlbGF0aXZlLWpzb24tcG9pbnRlcic6XG4gICAgICAgIHJldHVybiAnRG9pdCDDqnRyZSB1biByZWxhdGl2ZSBKU09OIFBvaW50ZXIsIHRlbCBxdWUgXCIyL3BvaW50ZXIvdG8vc29tZXRoaW5nXCInXG4gICAgICBjYXNlICdyZWdleCc6XG4gICAgICAgIHJldHVybiAnRG9pdCDDqnRyZSB1bmUgZXhwcmVzc2lvbiByw6lndWxpw6hyZSwgdGVsIHF1ZSBcIigxLSk/XFxcXGR7M30tXFxcXGR7M30tXFxcXGR7NH1cIidcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnRG9pdCDDqnRyZSBhdm9pciBsZSBmb3JtYXQgY29ycmVjdDogJyArIGVycm9yLnJlcXVpcmVkRm9ybWF0XG4gICAgfVxuICB9LFxuICBtaW5pbXVtOiAnRG9pdCDDqnRyZSBzdXDDqXJpZXVyIMOgIHt7bWluaW11bVZhbHVlfX0nLFxuICBleGNsdXNpdmVNaW5pbXVtOiAnRG9pdCBhdm9pciBtaW5pbXVtIHt7ZXhjbHVzaXZlTWluaW11bVZhbHVlfX0gY2hhcmFjdMOocmVzJyxcbiAgbWF4aW11bTogJ0RvaXQgw6p0cmUgaW5mw6lyaWV1ciDDoCB7e21heGltdW1WYWx1ZX19JyxcbiAgZXhjbHVzaXZlTWF4aW11bTogJ0RvaXQgYXZvaXIgbWF4aW11bSB7e2V4Y2x1c2l2ZU1heGltdW1WYWx1ZX19IGNoYXJhY3TDqHJlcycsXG4gIG11bHRpcGxlT2YoZXJyb3IpIHtcbiAgICBpZiAoKDEgLyBlcnJvci5tdWx0aXBsZU9mVmFsdWUpICUgMTAgPT09IDApIHtcbiAgICAgIGNvbnN0IGRlY2ltYWxzID0gTWF0aC5sb2cxMCgxIC8gZXJyb3IubXVsdGlwbGVPZlZhbHVlKVxuICAgICAgcmV0dXJuIGBEb2l0IGNvbXBvcnRlciAke2RlY2ltYWxzfSBvdSBtb2lucyBkZSBkZWNpbWFsZXMuYFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYERvaXQgw6p0cmUgdW4gbXVsdGlwbGUgZGUgJHtlcnJvci5tdWx0aXBsZU9mVmFsdWV9LmBcbiAgICB9XG4gIH0sXG4gIG1pblByb3BlcnRpZXM6ICdEb2l0IGNvbXBvcnRlciBhdSBtaW5pbXVtIHt7bWluaW11bVByb3BlcnRpZXN9fSDDqWzDqW1lbnRzJyxcbiAgbWF4UHJvcGVydGllczogJ0RvaXQgY29tcG9ydGVyIGF1IG1heGltdW0ge3ttYXhpbXVtUHJvcGVydGllc319IMOpbMOpbWVudHMnLFxuICBtaW5JdGVtczogJ0RvaXQgY29tcG9ydGVyIGF1IG1pbmltdW0ge3ttaW5pbXVtSXRlbXN9fSDDqWzDqW1lbnRzJyxcbiAgbWF4SXRlbXM6ICdEb2l0IGNvbXBvcnRlciBhdSBtYXhpbXVtIHt7bWluaW11bUl0ZW1zfX0gw6lsw6ltZW50cycsXG4gIHVuaXF1ZUl0ZW1zOiAnVG91cyBsZXMgw6lsw6ltZW50cyBkb2l2ZW50IMOqdHJlIHVuaXF1ZXMnLFxuICAvLyBOb3RlOiBObyBkZWZhdWx0IGVycm9yIG1lc3NhZ2VzIGZvciAndHlwZScsICdjb25zdCcsICdlbnVtJywgb3IgJ2RlcGVuZGVuY2llcydcbn1cbiJdfQ==