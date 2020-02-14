import { isObject } from '../validator';
import { forEach, hasOwn } from '../utility';
export function getControlValidators(schema) {
    if (!isObject(schema)) {
        return null;
    }
    var validators = {};
    if (hasOwn(schema, 'type')) {
        switch (schema.type) {
            case 'string':
                forEach(['pattern', 'format', 'minLength', 'maxLength'], function (prop) {
                    if (hasOwn(schema, prop)) {
                        validators[prop] = [schema[prop]];
                    }
                });
                break;
            case 'number':
            case 'integer':
                forEach(['Minimum', 'Maximum'], function (ucLimit) {
                    var eLimit = 'exclusive' + ucLimit;
                    var limit = ucLimit.toLowerCase();
                    if (hasOwn(schema, limit)) {
                        var exclusive = hasOwn(schema, eLimit) && schema[eLimit] === true;
                        validators[limit] = [schema[limit], exclusive];
                    }
                });
                forEach(['multipleOf', 'type'], function (prop) {
                    if (hasOwn(schema, prop)) {
                        validators[prop] = [schema[prop]];
                    }
                });
                break;
            case 'object':
                forEach(['minProperties', 'maxProperties', 'dependencies'], function (prop) {
                    if (hasOwn(schema, prop)) {
                        validators[prop] = [schema[prop]];
                    }
                });
                break;
            case 'array':
                forEach(['minItems', 'maxItems', 'uniqueItems'], function (prop) {
                    if (hasOwn(schema, prop)) {
                        validators[prop] = [schema[prop]];
                    }
                });
                break;
        }
    }
    if (hasOwn(schema, 'enum')) {
        validators.enum = [schema.enum];
    }
    return validators;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Q29udHJvbFZhbGlkYXRvcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdzZi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZnVuY3Rpb25zL2pzb24tc2NoZW1hL2dldENvbnRyb2xWYWxpZGF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFDckMsT0FBTyxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUMsTUFBTSxZQUFZLENBQUE7QUFLMUMsTUFBTSxVQUFVLG9CQUFvQixDQUFDLE1BQVc7SUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNyQixPQUFPLElBQUksQ0FBQTtLQUNaO0lBQ0QsSUFBTSxVQUFVLEdBQVEsRUFBRSxDQUFBO0lBQzFCLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRTtRQUMxQixRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDbkIsS0FBSyxRQUFRO2dCQUNYLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxFQUFFLFVBQUMsSUFBSTtvQkFDNUQsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFO3dCQUN4QixVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtxQkFDbEM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsTUFBSztZQUNQLEtBQUssUUFBUSxDQUFDO1lBQ2QsS0FBSyxTQUFTO2dCQUNaLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBRSxVQUFDLE9BQU87b0JBQ3RDLElBQU0sTUFBTSxHQUFHLFdBQVcsR0FBRyxPQUFPLENBQUE7b0JBQ3BDLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQTtvQkFDbkMsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFFO3dCQUN6QixJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUE7d0JBQ25FLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQTtxQkFDL0M7Z0JBQ0gsQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsT0FBTyxDQUFDLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxFQUFFLFVBQUMsSUFBSTtvQkFDbkMsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFO3dCQUN4QixVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtxQkFDbEM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsTUFBSztZQUNQLEtBQUssUUFBUTtnQkFDWCxPQUFPLENBQUMsQ0FBQyxlQUFlLEVBQUUsZUFBZSxFQUFFLGNBQWMsQ0FBQyxFQUFFLFVBQUMsSUFBSTtvQkFDL0QsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFO3dCQUN4QixVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtxQkFDbEM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsTUFBSztZQUNQLEtBQUssT0FBTztnQkFDVixPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLGFBQWEsQ0FBQyxFQUFFLFVBQUMsSUFBSTtvQkFDcEQsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFO3dCQUN4QixVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtxQkFDbEM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsTUFBSztTQUNSO0tBQ0Y7SUFDRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDMUIsVUFBVSxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUNoQztJQUNELE9BQU8sVUFBVSxDQUFBO0FBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzT2JqZWN0fSBmcm9tICcuLi92YWxpZGF0b3InXG5pbXBvcnQge2ZvckVhY2gsIGhhc093bn0gZnJvbSAnLi4vdXRpbGl0eSdcblxuLyoqXG4gKiAnZ2V0Q29udHJvbFZhbGlkYXRvcnMnIGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250cm9sVmFsaWRhdG9ycyhzY2hlbWE6IGFueSkge1xuICBpZiAoIWlzT2JqZWN0KHNjaGVtYSkpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIGNvbnN0IHZhbGlkYXRvcnM6IGFueSA9IHt9XG4gIGlmIChoYXNPd24oc2NoZW1hLCAndHlwZScpKSB7XG4gICAgc3dpdGNoIChzY2hlbWEudHlwZSkge1xuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgZm9yRWFjaChbJ3BhdHRlcm4nLCAnZm9ybWF0JywgJ21pbkxlbmd0aCcsICdtYXhMZW5ndGgnXSwgKHByb3ApID0+IHtcbiAgICAgICAgICBpZiAoaGFzT3duKHNjaGVtYSwgcHJvcCkpIHtcbiAgICAgICAgICAgIHZhbGlkYXRvcnNbcHJvcF0gPSBbc2NoZW1hW3Byb3BdXVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdpbnRlZ2VyJzpcbiAgICAgICAgZm9yRWFjaChbJ01pbmltdW0nLCAnTWF4aW11bSddLCAodWNMaW1pdCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGVMaW1pdCA9ICdleGNsdXNpdmUnICsgdWNMaW1pdFxuICAgICAgICAgIGNvbnN0IGxpbWl0ID0gdWNMaW1pdC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgaWYgKGhhc093bihzY2hlbWEsIGxpbWl0KSkge1xuICAgICAgICAgICAgY29uc3QgZXhjbHVzaXZlID0gaGFzT3duKHNjaGVtYSwgZUxpbWl0KSAmJiBzY2hlbWFbZUxpbWl0XSA9PT0gdHJ1ZVxuICAgICAgICAgICAgdmFsaWRhdG9yc1tsaW1pdF0gPSBbc2NoZW1hW2xpbWl0XSwgZXhjbHVzaXZlXVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgZm9yRWFjaChbJ211bHRpcGxlT2YnLCAndHlwZSddLCAocHJvcCkgPT4ge1xuICAgICAgICAgIGlmIChoYXNPd24oc2NoZW1hLCBwcm9wKSkge1xuICAgICAgICAgICAgdmFsaWRhdG9yc1twcm9wXSA9IFtzY2hlbWFbcHJvcF1dXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgZm9yRWFjaChbJ21pblByb3BlcnRpZXMnLCAnbWF4UHJvcGVydGllcycsICdkZXBlbmRlbmNpZXMnXSwgKHByb3ApID0+IHtcbiAgICAgICAgICBpZiAoaGFzT3duKHNjaGVtYSwgcHJvcCkpIHtcbiAgICAgICAgICAgIHZhbGlkYXRvcnNbcHJvcF0gPSBbc2NoZW1hW3Byb3BdXVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgICAgZm9yRWFjaChbJ21pbkl0ZW1zJywgJ21heEl0ZW1zJywgJ3VuaXF1ZUl0ZW1zJ10sIChwcm9wKSA9PiB7XG4gICAgICAgICAgaWYgKGhhc093bihzY2hlbWEsIHByb3ApKSB7XG4gICAgICAgICAgICB2YWxpZGF0b3JzW3Byb3BdID0gW3NjaGVtYVtwcm9wXV1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIGlmIChoYXNPd24oc2NoZW1hLCAnZW51bScpKSB7XG4gICAgdmFsaWRhdG9ycy5lbnVtID0gW3NjaGVtYS5lbnVtXVxuICB9XG4gIHJldHVybiB2YWxpZGF0b3JzXG59XG4iXX0=