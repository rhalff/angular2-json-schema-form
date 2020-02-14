import { isArray, isEmpty, isNumber, isObject, isString } from '../validator';
import { commonItems, hasOwn, uniqueItems } from '../utility';
import * as _ from 'lodash';
export function mergeSchemas(...schemas) {
    schemas = schemas.filter(schema => !isEmpty(schema));
    if (schemas.some(schema => !isObject(schema))) {
        return null;
    }
    const combinedSchema = {};
    for (const schema of schemas) {
        for (const key of Object.keys(schema)) {
            const combinedValue = combinedSchema[key];
            const schemaValue = schema[key];
            if (!hasOwn(combinedSchema, key) || _.isEqual(combinedValue, schemaValue)) {
                combinedSchema[key] = schemaValue;
            }
            else {
                switch (key) {
                    case 'allOf':
                        if (isArray(combinedValue) && isArray(schemaValue)) {
                            combinedSchema.allOf = mergeSchemas(...combinedValue, ...schemaValue);
                        }
                        else {
                            return { allOf: [...schemas] };
                        }
                        break;
                    case 'additionalItems':
                    case 'additionalProperties':
                    case 'contains':
                    case 'propertyNames':
                        if (isObject(combinedValue) && isObject(schemaValue)) {
                            combinedSchema[key] = mergeSchemas(combinedValue, schemaValue);
                        }
                        else if (key === 'additionalProperties' &&
                            (combinedValue === false || schemaValue === false)) {
                            combinedSchema.combinedSchema = false;
                        }
                        else {
                            return { allOf: [...schemas] };
                        }
                        break;
                    case 'anyOf':
                    case 'oneOf':
                    case 'enum':
                        if (isArray(combinedValue) && isArray(schemaValue)) {
                            combinedSchema[key] = combinedValue.filter(item1 => schemaValue.findIndex(item2 => _.isEqual(item1, item2)) > -1);
                            if (!combinedSchema[key].length) {
                                return { allOf: [...schemas] };
                            }
                        }
                        else {
                            return { allOf: [...schemas] };
                        }
                        break;
                    case 'definitions':
                        if (isObject(combinedValue) && isObject(schemaValue)) {
                            const combinedObject = Object.assign({}, combinedValue);
                            for (const subKey of Object.keys(schemaValue)) {
                                if (!hasOwn(combinedObject, subKey) ||
                                    _.isEqual(combinedObject[subKey], schemaValue[subKey])) {
                                    combinedObject[subKey] = schemaValue[subKey];
                                }
                                else {
                                    return { allOf: [...schemas] };
                                }
                            }
                            combinedSchema.definitions = combinedObject;
                        }
                        else {
                            return { allOf: [...schemas] };
                        }
                        break;
                    case 'dependencies':
                        if (isObject(combinedValue) && isObject(schemaValue)) {
                            const combinedObject = Object.assign({}, combinedValue);
                            for (const subKey of Object.keys(schemaValue)) {
                                if (!hasOwn(combinedObject, subKey) ||
                                    _.isEqual(combinedObject[subKey], schemaValue[subKey])) {
                                    combinedObject[subKey] = schemaValue[subKey];
                                }
                                else if (isArray(schemaValue[subKey]) && isArray(combinedObject[subKey])) {
                                    combinedObject[subKey] =
                                        uniqueItems(...combinedObject[subKey], ...schemaValue[subKey]);
                                }
                                else if ((isArray(schemaValue[subKey]) || isObject(schemaValue[subKey])) &&
                                    (isArray(combinedObject[subKey]) || isObject(combinedObject[subKey]))) {
                                    const required = isArray(combinedSchema.required) ?
                                        combinedSchema.required : [];
                                    const combinedDependency = isArray(combinedObject[subKey]) ?
                                        { required: uniqueItems(...required, combinedObject[subKey]) } :
                                        combinedObject[subKey];
                                    const schemaDependency = isArray(schemaValue[subKey]) ?
                                        { required: uniqueItems(...required, schemaValue[subKey]) } :
                                        schemaValue[subKey];
                                    combinedObject[subKey] =
                                        mergeSchemas(combinedDependency, schemaDependency);
                                }
                                else {
                                    return { allOf: [...schemas] };
                                }
                            }
                            combinedSchema.dependencies = combinedObject;
                        }
                        else {
                            return { allOf: [...schemas] };
                        }
                        break;
                    case 'items':
                        if (isArray(combinedValue) && isArray(schemaValue)) {
                            combinedSchema.items = combinedValue.filter(item1 => schemaValue.findIndex(item2 => _.isEqual(item1, item2)) > -1);
                            if (!combinedSchema.items.length) {
                                return { allOf: [...schemas] };
                            }
                        }
                        else if (isObject(combinedValue) && isObject(schemaValue)) {
                            combinedSchema.items = mergeSchemas(combinedValue, schemaValue);
                        }
                        else if (isArray(combinedValue) && isObject(schemaValue)) {
                            combinedSchema.items =
                                combinedValue.map(item => mergeSchemas(item, schemaValue));
                        }
                        else if (isObject(combinedValue) && isArray(schemaValue)) {
                            combinedSchema.items =
                                schemaValue.map(item => mergeSchemas(item, combinedValue));
                        }
                        else {
                            return { allOf: [...schemas] };
                        }
                        break;
                    case 'multipleOf':
                        if (isNumber(combinedValue) && isNumber(schemaValue)) {
                            const gcd = (x, y) => !y ? x : gcd(y, x % y);
                            const lcm = (x, y) => (x * y) / gcd(x, y);
                            combinedSchema.multipleOf = lcm(combinedValue, schemaValue);
                        }
                        else {
                            return { allOf: [...schemas] };
                        }
                        break;
                    case 'maximum':
                    case 'exclusiveMaximum':
                    case 'maxLength':
                    case 'maxItems':
                    case 'maxProperties':
                        if (isNumber(combinedValue) && isNumber(schemaValue)) {
                            combinedSchema[key] = Math.min(combinedValue, schemaValue);
                        }
                        else {
                            return { allOf: [...schemas] };
                        }
                        break;
                    case 'minimum':
                    case 'exclusiveMinimum':
                    case 'minLength':
                    case 'minItems':
                    case 'minProperties':
                        if (isNumber(combinedValue) && isNumber(schemaValue)) {
                            combinedSchema[key] = Math.max(combinedValue, schemaValue);
                        }
                        else {
                            return { allOf: [...schemas] };
                        }
                        break;
                    case 'not':
                        if (isObject(combinedValue) && isObject(schemaValue)) {
                            const notAnyOf = [combinedValue, schemaValue]
                                .reduce((notAnyOfArray, notSchema) => isArray(notSchema.anyOf) &&
                                Object.keys(notSchema).length === 1 ?
                                [...notAnyOfArray, ...notSchema.anyOf] :
                                [...notAnyOfArray, notSchema], []);
                            combinedSchema.not = { anyOf: notAnyOf };
                        }
                        else {
                            return { allOf: [...schemas] };
                        }
                        break;
                    case 'patternProperties':
                        if (isObject(combinedValue) && isObject(schemaValue)) {
                            const combinedObject = Object.assign({}, combinedValue);
                            for (const subKey of Object.keys(schemaValue)) {
                                if (!hasOwn(combinedObject, subKey) ||
                                    _.isEqual(combinedObject[subKey], schemaValue[subKey])) {
                                    combinedObject[subKey] = schemaValue[subKey];
                                }
                                else if (isObject(schemaValue[subKey]) && isObject(combinedObject[subKey])) {
                                    combinedObject[subKey] =
                                        mergeSchemas(combinedObject[subKey], schemaValue[subKey]);
                                }
                                else {
                                    return { allOf: [...schemas] };
                                }
                            }
                            combinedSchema.patternProperties = combinedObject;
                        }
                        else {
                            return { allOf: [...schemas] };
                        }
                        break;
                    case 'properties':
                        if (isObject(combinedValue) && isObject(schemaValue)) {
                            const combinedObject = Object.assign({}, combinedValue);
                            if (hasOwn(schemaValue, 'additionalProperties')) {
                                Object.keys(combinedValue)
                                    .filter(combinedKey => !Object.keys(schemaValue).includes(combinedKey))
                                    .forEach(nonMatchingKey => {
                                    if (schemaValue.additionalProperties === false) {
                                        delete combinedObject[nonMatchingKey];
                                    }
                                    else if (isObject(schemaValue.additionalProperties)) {
                                        combinedObject[nonMatchingKey] = mergeSchemas(combinedObject[nonMatchingKey], schemaValue.additionalProperties);
                                    }
                                });
                            }
                            for (const subKey of Object.keys(schemaValue)) {
                                if (_.isEqual(combinedObject[subKey], schemaValue[subKey]) || (!hasOwn(combinedObject, subKey) &&
                                    !hasOwn(combinedObject, 'additionalProperties'))) {
                                    combinedObject[subKey] = schemaValue[subKey];
                                }
                                else if (!hasOwn(combinedObject, subKey) &&
                                    hasOwn(combinedObject, 'additionalProperties')) {
                                    if (isObject(combinedObject.additionalProperties)) {
                                        combinedObject[subKey] = mergeSchemas(combinedObject.additionalProperties, schemaValue[subKey]);
                                    }
                                }
                                else if (isObject(schemaValue[subKey]) &&
                                    isObject(combinedObject[subKey])) {
                                    combinedObject[subKey] =
                                        mergeSchemas(combinedObject[subKey], schemaValue[subKey]);
                                }
                                else {
                                    return { allOf: [...schemas] };
                                }
                            }
                            combinedSchema.properties = combinedObject;
                        }
                        else {
                            return { allOf: [...schemas] };
                        }
                        break;
                    case 'required':
                        if (isArray(combinedValue) && isArray(schemaValue)) {
                            combinedSchema.required = uniqueItems(...combinedValue, ...schemaValue);
                        }
                        else if (typeof schemaValue === 'boolean' &&
                            typeof combinedValue === 'boolean') {
                            combinedSchema.required = !!combinedValue || !!schemaValue;
                        }
                        else {
                            return { allOf: [...schemas] };
                        }
                        break;
                    case '$schema':
                    case '$id':
                    case 'id':
                        break;
                    case 'title':
                    case 'description':
                        combinedSchema[key] = schemaValue;
                        break;
                    case 'type':
                        if ((isArray(schemaValue) || isString(schemaValue)) &&
                            (isArray(combinedValue) || isString(combinedValue))) {
                            const combinedTypes = commonItems(combinedValue, schemaValue);
                            if (!combinedTypes.length) {
                                return { allOf: [...schemas] };
                            }
                            combinedSchema.type = combinedTypes.length > 1 ? combinedTypes : combinedTypes[0];
                        }
                        else {
                            return { allOf: [...schemas] };
                        }
                        break;
                    case 'uniqueItems':
                        combinedSchema.uniqueItems = !!combinedValue || !!schemaValue;
                        break;
                    default:
                        return { allOf: [...schemas] };
                }
            }
        }
    }
    return combinedSchema;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VTY2hlbWFzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdzZi1jb21tb24vIiwic291cmNlcyI6WyJsaWIvZnVuY3Rpb25zL21lcmdlLXNjaGVtYXMvbWVyZ2VTY2hlbWFzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBQzNFLE9BQU8sRUFBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBQyxNQUFNLFlBQVksQ0FBQTtBQUMzRCxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQTtBQW9CM0IsTUFBTSxVQUFVLFlBQVksQ0FBQyxHQUFHLE9BQVk7SUFDMUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQ3BELElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUU7UUFDN0MsT0FBTyxJQUFJLENBQUE7S0FDWjtJQUNELE1BQU0sY0FBYyxHQUFRLEVBQUUsQ0FBQTtJQUM5QixLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtRQUM1QixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDckMsTUFBTSxhQUFhLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3pDLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsRUFBRTtnQkFDekUsY0FBYyxDQUFD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QUFhLEVBQUUsV0FBVyxDQUFDLENBQUE7NEJBQzdELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO2dDQUN6QixPQUFPLEVBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBQyxDQUFBOzZCQUM3Qjs0QkFDRCxjQUFjLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQTt5QkFDbEY7NkJBQU07NEJBQ0wsT0FBTyxFQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUMsQ0FBQTt5QkFDN0I7d0JBQ0QsTUFBSztvQkFDUCxLQUFLLGFBQWE7d0JBRWhCLGNBQWMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFBO3dCQUM3RCxNQUFLO29CQUNQO3dCQUNFLE9BQU8sRUFBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFDLENBQUE7aUJBQy9CO2FBQ0Y7U0FDRjtLQUNGO0lBQ0QsT0FBTyxjQUFjLENBQUE7QUFDdkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNBcnJheSwgaXNFbXB0eSwgaXNOdW1iZXIsIGlzT2JqZWN0LCBpc1N0cmluZ30gZnJvbSAnLi4vdmFsaWRhdG9yJ1xuaW1wb3J0IHtjb21tb25JdGVtcywgaGFzT3duLCB1bmlxdWVJdGVtc30gZnJvbSAnLi4vdXRpbGl0eSdcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJ1xuXG4vKipcbiAqICdtZXJnZVNjaGVtYXMnIGZ1bmN0aW9uXG4gKlxuICogTWVyZ2VzIG11bHRpcGxlIEpTT04gc2NoZW1hcyBpbnRvIGEgc2luZ2xlIHNjaGVtYSB3aXRoIGNvbWJpbmVkIHJ1bGVzLlxuICpcbiAqIElmIGFibGUgdG8gbG9naWNhbGx5IG1lcmdlIHByb3BlcnRpZXMgZnJvbSBhbGwgc2NoZW1hcyxcbiAqIHJldHVybnMgYSBzaW5nbGUgc2NoZW1hIG9iamVjdCBjb250YWluaW5nIGFsbCBtZXJnZWQgcHJvcGVydGllcy5cbiAqXG4gKiBFeGFtcGxlOiAoeyBhOiBiLCBtYXg6IDEgfSwgeyBjOiBkLCBtYXg6IDIgfSkgPT4geyBhOiBiLCBjOiBkLCBtYXg6IDEgfVxuICpcbiAqIElmIHVuYWJsZSB0byBsb2dpY2FsbHkgbWVyZ2UsIHJldHVybnMgYW4gYWxsT2Ygc2NoZW1hIG9iamVjdCBjb250YWluaW5nXG4gKiBhbiBhcnJheSBvZiB0aGUgb3JpZ2luYWwgc2NoZW1hcztcbiAqXG4gKiBFeGFtcGxlOiAoeyBhOiBiIH0sIHsgYTogZCB9KSA9PiB7IGFsbE9mOiBbIHsgYTogYiB9LCB7IGE6IGQgfSBdIH1cbiAqXG4gKiBAcGFyYW0gc2NoZW1hcyAtIG9uZSBvciBtb3JlIGlucHV0IHNjaGVtYXNcbiAqIEByZXR1cm4gbWVyZ2VkIHNjaGVtYVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VTY2hlbWFzKC4uLnNjaGVtYXM6IGFueSkge1xuICBzY2hlbWFzID0gc2NoZW1hcy5maWx0ZXIoc2NoZW1hID0+ICFpc0VtcHR5KHNjaGVtYSkpXG4gIGlmIChzY2hlbWFzLnNvbWUoc2NoZW1hID0+ICFpc09iamVjdChzY2hlbWEpKSkge1xuICAgIHJldHVybiBudWxsXG4gIH1cbiAgY29uc3QgY29tYmluZWRTY2hlbWE6IGFueSA9IHt9XG4gIGZvciAoY29uc3Qgc2NoZW1hIG9mIHNjaGVtYXMpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhzY2hlbWEpKSB7XG4gICAgICBjb25zdCBjb21iaW5lZFZhbHVlID0gY29tYmluZWRTY2hlbWFba2V5XVxuICAgICAgY29uc3Qgc2NoZW1hVmFsdWUgPSBzY2hlbWFba2V5XVxuICAgICAgaWYgKCFoYXNPd24oY29tYmluZWRTY2hlbWEsIGtleSkgfHwgXy5pc0VxdWFsKGNvbWJpbmVkVmFsdWUsIHNjaGVtYVZhbHVlKSkge1xuICAgICAgICBjb21iaW5lZFNjaGVtYVtrZXldID0gc2NoZW1hVmFsdWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgY2FzZSAnYWxsT2YnOlxuICAgICAgICAgICAgLy8gQ29tYmluZSBhbGwgaXRlbXMgZnJvbSBib3RoIGFycmF5c1xuICAgICAgICAgICAgaWYgKGlzQXJyYXkoY29tYmluZWRWYWx1ZSkgJiYgaXNBcnJheShzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEuYWxsT2YgPSBtZXJnZVNjaGVtYXMoLi4uY29tYmluZWRWYWx1ZSwgLi4uc2NoZW1hVmFsdWUpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ2FkZGl0aW9uYWxJdGVtcyc6XG4gICAgICAgICAgY2FzZSAnYWRkaXRpb25hbFByb3BlcnRpZXMnOlxuICAgICAgICAgIGNhc2UgJ2NvbnRhaW5zJzpcbiAgICAgICAgICBjYXNlICdwcm9wZXJ0eU5hbWVzJzpcbiAgICAgICAgICAgIC8vIE1lcmdlIHNjaGVtYSBvYmplY3RzXG4gICAgICAgICAgICBpZiAoaXNPYmplY3QoY29tYmluZWRWYWx1ZSkgJiYgaXNPYmplY3Qoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hW2tleV0gPSBtZXJnZVNjaGVtYXMoY29tYmluZWRWYWx1ZSwgc2NoZW1hVmFsdWUpXG4gICAgICAgICAgICAgIC8vIGFkZGl0aW9uYWxQcm9wZXJ0aWVzID09IGZhbHNlIGluIGFueSBzY2hlbWEgb3ZlcnJpZGVzIGFsbCBvdGhlciB2YWx1ZXNcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgIGtleSA9PT0gJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJyAmJlxuICAgICAgICAgICAgICAoY29tYmluZWRWYWx1ZSA9PT0gZmFsc2UgfHwgc2NoZW1hVmFsdWUgPT09IGZhbHNlKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLmNvbWJpbmVkU2NoZW1hID0gZmFsc2VcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnYW55T2YnOlxuICAgICAgICAgIGNhc2UgJ29uZU9mJzpcbiAgICAgICAgICBjYXNlICdlbnVtJzpcbiAgICAgICAgICAgIC8vIEtlZXAgb25seSBpdGVtcyB0aGF0IGFwcGVhciBpbiBib3RoIGFycmF5c1xuICAgICAgICAgICAgaWYgKGlzQXJyYXkoY29tYmluZWRWYWx1ZSkgJiYgaXNBcnJheShzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWFba2V5XSA9IGNvbWJpbmVkVmFsdWUuZmlsdGVyKGl0ZW0xID0+XG4gICAgICAgICAgICAgICAgc2NoZW1hVmFsdWUuZmluZEluZGV4KGl0ZW0yID0+IF8uaXNFcXVhbChpdGVtMSwgaXRlbTIpKSA+IC0xXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgaWYgKCFjb21iaW5lZFNjaGVtYVtrZXldLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdkZWZpbml0aW9ucyc6XG4gICAgICAgICAgICAvLyBDb21iaW5lIGtleXMgZnJvbSBib3RoIG9iamVjdHNcbiAgICAgICAgICAgIGlmIChpc09iamVjdChjb21iaW5lZFZhbHVlKSAmJiBpc09iamVjdChzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29uc3QgY29tYmluZWRPYmplY3QgPSB7Li4uY29tYmluZWRWYWx1ZX1cbiAgICAgICAgICAgICAgZm9yIChjb25zdCBzdWJLZXkgb2YgT2JqZWN0LmtleXMoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFoYXNPd24oY29tYmluZWRPYmplY3QsIHN1YktleSkgfHxcbiAgICAgICAgICAgICAgICAgIF8uaXNFcXVhbChjb21iaW5lZE9iamVjdFtzdWJLZXldLCBzY2hlbWFWYWx1ZVtzdWJLZXldKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgY29tYmluZWRPYmplY3Rbc3ViS2V5XSA9IHNjaGVtYVZhbHVlW3N1YktleV1cbiAgICAgICAgICAgICAgICAgIC8vIERvbid0IGNvbWJpbmUgbWF0Y2hpbmcga2V5cyB3aXRoIGRpZmZlcmVudCB2YWx1ZXNcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5kZWZpbml0aW9ucyA9IGNvbWJpbmVkT2JqZWN0XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ2RlcGVuZGVuY2llcyc6XG4gICAgICAgICAgICAvLyBDb21iaW5lIGFsbCBrZXlzIGZyb20gYm90aCBvYmplY3RzXG4gICAgICAgICAgICAvLyBhbmQgbWVyZ2Ugc2NoZW1hcyBvbiBtYXRjaGluZyBrZXlzLFxuICAgICAgICAgICAgLy8gY29udmVydGluZyBmcm9tIGFycmF5cyB0byBvYmplY3RzIGlmIG5lY2Vzc2FyeVxuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGNvbWJpbmVkVmFsdWUpICYmIGlzT2JqZWN0KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb25zdCBjb21iaW5lZE9iamVjdCA9IHsuLi5jb21iaW5lZFZhbHVlfVxuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN1YktleSBvZiBPYmplY3Qua2V5cyhzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWhhc093bihjb21iaW5lZE9iamVjdCwgc3ViS2V5KSB8fFxuICAgICAgICAgICAgICAgICAgXy5pc0VxdWFsKGNvbWJpbmVkT2JqZWN0W3N1YktleV0sIHNjaGVtYVZhbHVlW3N1YktleV0pXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdFtzdWJLZXldID0gc2NoZW1hVmFsdWVbc3ViS2V5XVxuICAgICAgICAgICAgICAgICAgLy8gSWYgYm90aCBrZXlzIGFyZSBhcnJheXMsIGluY2x1ZGUgYWxsIGl0ZW1zIGZyb20gYm90aCBhcnJheXMsXG4gICAgICAgICAgICAgICAgICAvLyBleGNsdWRpbmcgZHVwbGljYXRlc1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICBpc0FycmF5KHNjaGVtYVZhbHVlW3N1YktleV0pICYmIGlzQXJyYXkoY29tYmluZWRPYmplY3Rbc3ViS2V5XSlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W3N1YktleV0gPVxuICAgICAgICAgICAgICAgICAgICB1bmlxdWVJdGVtcyguLi5jb21iaW5lZE9iamVjdFtzdWJLZXldLCAuLi5zY2hlbWFWYWx1ZVtzdWJLZXldKVxuICAgICAgICAgICAgICAgICAgLy8gSWYgZWl0aGVyIGtleSBpcyBhbiBvYmplY3QsIG1lcmdlIHRoZSBzY2hlbWFzXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgIChpc0FycmF5KHNjaGVtYVZhbHVlW3N1YktleV0pIHx8IGlzT2JqZWN0KHNjaGVtYVZhbHVlW3N1YktleV0pKSAmJlxuICAgICAgICAgICAgICAgICAgKGlzQXJyYXkoY29tYmluZWRPYmplY3Rbc3ViS2V5XSkgfHwgaXNPYmplY3QoY29tYmluZWRPYmplY3Rbc3ViS2V5XSkpXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAvLyBJZiBlaXRoZXIga2V5IGlzIGFuIGFycmF5LCBjb252ZXJ0IGl0IHRvIGFuIG9iamVjdCBmaXJzdFxuICAgICAgICAgICAgICAgICAgY29uc3QgcmVxdWlyZWQgPSBpc0FycmF5KGNvbWJpbmVkU2NoZW1hLnJlcXVpcmVkKSA/XG4gICAgICAgICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLnJlcXVpcmVkIDogW11cbiAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbWJpbmVkRGVwZW5kZW5jeSA9IGlzQXJyYXkoY29tYmluZWRPYmplY3Rbc3ViS2V5XSkgP1xuICAgICAgICAgICAgICAgICAgICB7cmVxdWlyZWQ6IHVuaXF1ZUl0ZW1zKC4uLnJlcXVpcmVkLCBjb21iaW5lZE9iamVjdFtzdWJLZXldKX0gOlxuICAgICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdFtzdWJLZXldXG4gICAgICAgICAgICAgICAgICBjb25zdCBzY2hlbWFEZXBlbmRlbmN5ID0gaXNBcnJheShzY2hlbWFWYWx1ZVtzdWJLZXldKSA/XG4gICAgICAgICAgICAgICAgICAgIHtyZXF1aXJlZDogdW5pcXVlSXRlbXMoLi4ucmVxdWlyZWQsIHNjaGVtYVZhbHVlW3N1YktleV0pfSA6XG4gICAgICAgICAgICAgICAgICAgIHNjaGVtYVZhbHVlW3N1YktleV1cbiAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W3N1YktleV0gPVxuICAgICAgICAgICAgICAgICAgICBtZXJnZVNjaGVtYXMoY29tYmluZWREZXBlbmRlbmN5LCBzY2hlbWFEZXBlbmRlbmN5KVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLmRlcGVuZGVuY2llcyA9IGNvbWJpbmVkT2JqZWN0XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ2l0ZW1zJzpcbiAgICAgICAgICAgIC8vIElmIGFycmF5cywga2VlcCBvbmx5IGl0ZW1zIHRoYXQgYXBwZWFyIGluIGJvdGggYXJyYXlzXG4gICAgICAgICAgICBpZiAoaXNBcnJheShjb21iaW5lZFZhbHVlKSAmJiBpc0FycmF5KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5pdGVtcyA9IGNvbWJpbmVkVmFsdWUuZmlsdGVyKGl0ZW0xID0+XG4gICAgICAgICAgICAgICAgc2NoZW1hVmFsdWUuZmluZEluZGV4KGl0ZW0yID0+IF8uaXNFcXVhbChpdGVtMSwgaXRlbTIpKSA+IC0xXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgaWYgKCFjb21iaW5lZFNjaGVtYS5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gSWYgYm90aCBrZXlzIGFyZSBvYmplY3RzLCBtZXJnZSB0aGVtXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KGNvbWJpbmVkVmFsdWUpICYmIGlzT2JqZWN0KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5pdGVtcyA9IG1lcmdlU2NoZW1hcyhjb21iaW5lZFZhbHVlLCBzY2hlbWFWYWx1ZSlcbiAgICAgICAgICAgICAgLy8gSWYgb2JqZWN0ICsgYXJyYXksIGNvbWJpbmUgb2JqZWN0IHdpdGggZWFjaCBhcnJheSBpdGVtXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoY29tYmluZWRWYWx1ZSkgJiYgaXNPYmplY3Qoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLml0ZW1zID1cbiAgICAgICAgICAgICAgICBjb21iaW5lZFZhbHVlLm1hcChpdGVtID0+IG1lcmdlU2NoZW1hcyhpdGVtLCBzY2hlbWFWYWx1ZSkpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KGNvbWJpbmVkVmFsdWUpICYmIGlzQXJyYXkoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLml0ZW1zID1cbiAgICAgICAgICAgICAgICBzY2hlbWFWYWx1ZS5tYXAoaXRlbSA9PiBtZXJnZVNjaGVtYXMoaXRlbSwgY29tYmluZWRWYWx1ZSkpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ211bHRpcGxlT2YnOlxuICAgICAgICAgICAgLy8gVE9ETzogQWRqdXN0IHRvIGNvcnJlY3RseSBoYW5kbGUgZGVjaW1hbCB2YWx1ZXNcbiAgICAgICAgICAgIC8vIElmIG51bWJlcnMsIHNldCB0byBsZWFzdCBjb21tb24gbXVsdGlwbGVcbiAgICAgICAgICAgIGlmIChpc051bWJlcihjb21iaW5lZFZhbHVlKSAmJiBpc051bWJlcihzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29uc3QgZ2NkID0gKHgsIHkpID0+ICF5ID8geCA6IGdjZCh5LCB4ICUgeSlcbiAgICAgICAgICAgICAgY29uc3QgbGNtID0gKHgsIHkpID0+ICh4ICogeSkgLyBnY2QoeCwgeSlcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEubXVsdGlwbGVPZiA9IGxjbShjb21iaW5lZFZhbHVlLCBzY2hlbWFWYWx1ZSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnbWF4aW11bSc6XG4gICAgICAgICAgY2FzZSAnZXhjbHVzaXZlTWF4aW11bSc6XG4gICAgICAgICAgY2FzZSAnbWF4TGVuZ3RoJzpcbiAgICAgICAgICBjYXNlICdtYXhJdGVtcyc6XG4gICAgICAgICAgY2FzZSAnbWF4UHJvcGVydGllcyc6XG4gICAgICAgICAgICAvLyBJZiBudW1iZXJzLCBzZXQgdG8gbG93ZXN0IHZhbHVlXG4gICAgICAgICAgICBpZiAoaXNOdW1iZXIoY29tYmluZWRWYWx1ZSkgJiYgaXNOdW1iZXIoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hW2tleV0gPSBNYXRoLm1pbihjb21iaW5lZFZhbHVlLCBzY2hlbWFWYWx1ZSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnbWluaW11bSc6XG4gICAgICAgICAgY2FzZSAnZXhjbHVzaXZlTWluaW11bSc6XG4gICAgICAgICAgY2FzZSAnbWluTGVuZ3RoJzpcbiAgICAgICAgICBjYXNlICdtaW5JdGVtcyc6XG4gICAgICAgICAgY2FzZSAnbWluUHJvcGVydGllcyc6XG4gICAgICAgICAgICAvLyBJZiBudW1iZXJzLCBzZXQgdG8gaGlnaGVzdCB2YWx1ZVxuICAgICAgICAgICAgaWYgKGlzTnVtYmVyKGNvbWJpbmVkVmFsdWUpICYmIGlzTnVtYmVyKHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYVtrZXldID0gTWF0aC5tYXgoY29tYmluZWRWYWx1ZSwgc2NoZW1hVmFsdWUpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ25vdCc6XG4gICAgICAgICAgICAvLyBDb21iaW5lIG5vdCB2YWx1ZXMgaW50byBhbnlPZiBhcnJheVxuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGNvbWJpbmVkVmFsdWUpICYmIGlzT2JqZWN0KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb25zdCBub3RBbnlPZiA9IFtjb21iaW5lZFZhbHVlLCBzY2hlbWFWYWx1ZV1cbiAgICAgICAgICAgICAgICAucmVkdWNlKChub3RBbnlPZkFycmF5LCBub3RTY2hlbWEpID0+XG4gICAgICAgICAgICAgICAgICAgIGlzQXJyYXkobm90U2NoZW1hLmFueU9mKSAmJlxuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhub3RTY2hlbWEpLmxlbmd0aCA9PT0gMSA/XG4gICAgICAgICAgICAgICAgICAgICAgWy4uLm5vdEFueU9mQXJyYXksIC4uLm5vdFNjaGVtYS5hbnlPZl0gOlxuICAgICAgICAgICAgICAgICAgICAgIFsuLi5ub3RBbnlPZkFycmF5LCBub3RTY2hlbWFdXG4gICAgICAgICAgICAgICAgICAsIFtdKVxuICAgICAgICAgICAgICAvLyBUT0RPOiBSZW1vdmUgZHVwbGljYXRlIGl0ZW1zIGZyb20gYXJyYXlcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEubm90ID0ge2FueU9mOiBub3RBbnlPZn1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAncGF0dGVyblByb3BlcnRpZXMnOlxuICAgICAgICAgICAgLy8gQ29tYmluZSBhbGwga2V5cyBmcm9tIGJvdGggb2JqZWN0c1xuICAgICAgICAgICAgLy8gYW5kIG1lcmdlIHNjaGVtYXMgb24gbWF0Y2hpbmcga2V5c1xuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGNvbWJpbmVkVmFsdWUpICYmIGlzT2JqZWN0KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb25zdCBjb21iaW5lZE9iamVjdCA9IHsuLi5jb21iaW5lZFZhbHVlfVxuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN1YktleSBvZiBPYmplY3Qua2V5cyhzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWhhc093bihjb21iaW5lZE9iamVjdCwgc3ViS2V5KSB8fFxuICAgICAgICAgICAgICAgICAgXy5pc0VxdWFsKGNvbWJpbmVkT2JqZWN0W3N1YktleV0sIHNjaGVtYVZhbHVlW3N1YktleV0pXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdFtzdWJLZXldID0gc2NoZW1hVmFsdWVbc3ViS2V5XVxuICAgICAgICAgICAgICAgICAgLy8gSWYgYm90aCBrZXlzIGFyZSBvYmplY3RzLCBtZXJnZSB0aGVtXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgIGlzT2JqZWN0KHNjaGVtYVZhbHVlW3N1YktleV0pICYmIGlzT2JqZWN0KGNvbWJpbmVkT2JqZWN0W3N1YktleV0pXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdFtzdWJLZXldID1cbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VTY2hlbWFzKGNvbWJpbmVkT2JqZWN0W3N1YktleV0sIHNjaGVtYVZhbHVlW3N1YktleV0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEucGF0dGVyblByb3BlcnRpZXMgPSBjb21iaW5lZE9iamVjdFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdwcm9wZXJ0aWVzJzpcbiAgICAgICAgICAgIC8vIENvbWJpbmUgYWxsIGtleXMgZnJvbSBib3RoIG9iamVjdHNcbiAgICAgICAgICAgIC8vIHVubGVzcyBhZGRpdGlvbmFsUHJvcGVydGllcyA9PT0gZmFsc2VcbiAgICAgICAgICAgIC8vIGFuZCBtZXJnZSBzY2hlbWFzIG9uIG1hdGNoaW5nIGtleXNcbiAgICAgICAgICAgIGlmIChpc09iamVjdChjb21iaW5lZFZhbHVlKSAmJiBpc09iamVjdChzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29uc3QgY29tYmluZWRPYmplY3QgPSB7Li4uY29tYmluZWRWYWx1ZX1cbiAgICAgICAgICAgICAgLy8gSWYgbmV3IHNjaGVtYSBoYXMgYWRkaXRpb25hbFByb3BlcnRpZXMsXG4gICAgICAgICAgICAgIC8vIG1lcmdlIG9yIHJlbW92ZSBub24tbWF0Y2hpbmcgcHJvcGVydHkga2V5cyBpbiBjb21iaW5lZCBzY2hlbWFcbiAgICAgICAgICAgICAgaWYgKGhhc093bihzY2hlbWFWYWx1ZSwgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJykpIHtcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjb21iaW5lZFZhbHVlKVxuICAgICAgICAgICAgICAgICAgLmZpbHRlcihjb21iaW5lZEtleSA9PiAhT2JqZWN0LmtleXMoc2NoZW1hVmFsdWUpLmluY2x1ZGVzKGNvbWJpbmVkS2V5KSlcbiAgICAgICAgICAgICAgICAgIC5mb3JFYWNoKG5vbk1hdGNoaW5nS2V5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjaGVtYVZhbHVlLmFkZGl0aW9uYWxQcm9wZXJ0aWVzID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjb21iaW5lZE9iamVjdFtub25NYXRjaGluZ0tleV1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc09iamVjdChzY2hlbWFWYWx1ZS5hZGRpdGlvbmFsUHJvcGVydGllcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdFtub25NYXRjaGluZ0tleV0gPSBtZXJnZVNjaGVtYXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdFtub25NYXRjaGluZ0tleV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2hlbWFWYWx1ZS5hZGRpdGlvbmFsUHJvcGVydGllc1xuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN1YktleSBvZiBPYmplY3Qua2V5cyhzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoXy5pc0VxdWFsKGNvbWJpbmVkT2JqZWN0W3N1YktleV0sIHNjaGVtYVZhbHVlW3N1YktleV0pIHx8IChcbiAgICAgICAgICAgICAgICAgICFoYXNPd24oY29tYmluZWRPYmplY3QsIHN1YktleSkgJiZcbiAgICAgICAgICAgICAgICAgICFoYXNPd24oY29tYmluZWRPYmplY3QsICdhZGRpdGlvbmFsUHJvcGVydGllcycpXG4gICAgICAgICAgICAgICAgKSkge1xuICAgICAgICAgICAgICAgICAgY29tYmluZWRPYmplY3Rbc3ViS2V5XSA9IHNjaGVtYVZhbHVlW3N1YktleV1cbiAgICAgICAgICAgICAgICAgIC8vIElmIGNvbWJpbmVkIHNjaGVtYSBoYXMgYWRkaXRpb25hbFByb3BlcnRpZXMsXG4gICAgICAgICAgICAgICAgICAvLyBtZXJnZSBvciBpZ25vcmUgbm9uLW1hdGNoaW5nIHByb3BlcnR5IGtleXMgaW4gbmV3IHNjaGVtYVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAhaGFzT3duKGNvbWJpbmVkT2JqZWN0LCBzdWJLZXkpICYmXG4gICAgICAgICAgICAgICAgICBoYXNPd24oY29tYmluZWRPYmplY3QsICdhZGRpdGlvbmFsUHJvcGVydGllcycpXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAvLyBJZiBjb21iaW5lZE9iamVjdC5hZGRpdGlvbmFsUHJvcGVydGllcyA9PT0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAvLyBkbyBub3RoaW5nIChkb24ndCBzZXQga2V5KVxuICAgICAgICAgICAgICAgICAgLy8gSWYgYWRkaXRpb25hbFByb3BlcnRpZXMgaXMgb2JqZWN0LCBtZXJnZSB3aXRoIG5ldyBrZXlcbiAgICAgICAgICAgICAgICAgIGlmIChpc09iamVjdChjb21iaW5lZE9iamVjdC5hZGRpdGlvbmFsUHJvcGVydGllcykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tYmluZWRPYmplY3Rbc3ViS2V5XSA9IG1lcmdlU2NoZW1hcyhcbiAgICAgICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdC5hZGRpdGlvbmFsUHJvcGVydGllcywgc2NoZW1hVmFsdWVbc3ViS2V5XVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAvLyBJZiBib3RoIGtleXMgYXJlIG9iamVjdHMsIG1lcmdlIHRoZW1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgaXNPYmplY3Qoc2NoZW1hVmFsdWVbc3ViS2V5XSkgJiZcbiAgICAgICAgICAgICAgICAgIGlzT2JqZWN0KGNvbWJpbmVkT2JqZWN0W3N1YktleV0pXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdFtzdWJLZXldID1cbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VTY2hlbWFzKGNvbWJpbmVkT2JqZWN0W3N1YktleV0sIHNjaGVtYVZhbHVlW3N1YktleV0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEucHJvcGVydGllcyA9IGNvbWJpbmVkT2JqZWN0XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ3JlcXVpcmVkJzpcbiAgICAgICAgICAgIC8vIElmIGFycmF5cywgaW5jbHVkZSBhbGwgaXRlbXMgZnJvbSBib3RoIGFycmF5cywgZXhjbHVkaW5nIGR1cGxpY2F0ZXNcbiAgICAgICAgICAgIGlmIChpc0FycmF5KGNvbWJpbmVkVmFsdWUpICYmIGlzQXJyYXkoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLnJlcXVpcmVkID0gdW5pcXVlSXRlbXMoLi4uY29tYmluZWRWYWx1ZSwgLi4uc2NoZW1hVmFsdWUpXG4gICAgICAgICAgICAgIC8vIElmIGJvb2xlYW5zLCBhZXQgdHJ1ZSBpZiBlaXRoZXIgdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgdHlwZW9mIHNjaGVtYVZhbHVlID09PSAnYm9vbGVhbicgJiZcbiAgICAgICAgICAgICAgdHlwZW9mIGNvbWJpbmVkVmFsdWUgPT09ICdib29sZWFuJ1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLnJlcXVpcmVkID0gISFjb21iaW5lZFZhbHVlIHx8ICEhc2NoZW1hVmFsdWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnJHNjaGVtYSc6XG4gICAgICAgICAgY2FzZSAnJGlkJzpcbiAgICAgICAgICBjYXNlICdpZCc6XG4gICAgICAgICAgICAvLyBEb24ndCBjb21iaW5lIHRoZXNlIGtleXNcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAndGl0bGUnOlxuICAgICAgICAgIGNhc2UgJ2Rlc2NyaXB0aW9uJzpcbiAgICAgICAgICAgIC8vIFJldHVybiB0aGUgbGFzdCB2YWx1ZSwgb3ZlcndyaXRpbmcgYW55IHByZXZpb3VzIG9uZVxuICAgICAgICAgICAgLy8gVGhlc2UgcHJvcGVydGllcyBhcmUgbm90IHVzZWQgZm9yIHZhbGlkYXRpb24sIHNvIGNvbmZsaWN0cyBkb24ndCBtYXR0ZXJcbiAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hW2tleV0gPSBzY2hlbWFWYWx1ZVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICd0eXBlJzpcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgKGlzQXJyYXkoc2NoZW1hVmFsdWUpIHx8IGlzU3RyaW5nKHNjaGVtYVZhbHVlKSkgJiZcbiAgICAgICAgICAgICAgKGlzQXJyYXkoY29tYmluZWRWYWx1ZSkgfHwgaXNTdHJpbmcoY29tYmluZWRWYWx1ZSkpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29uc3QgY29tYmluZWRUeXBlcyA9IGNvbW1vbkl0ZW1zKGNvbWJpbmVkVmFsdWUsIHNjaGVtYVZhbHVlKVxuICAgICAgICAgICAgICBpZiAoIWNvbWJpbmVkVHlwZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLnR5cGUgPSBjb21iaW5lZFR5cGVzLmxlbmd0aCA+IDEgPyBjb21iaW5lZFR5cGVzIDogY29tYmluZWRUeXBlc1swXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICd1bmlxdWVJdGVtcyc6XG4gICAgICAgICAgICAvLyBTZXQgdHJ1ZSBpZiBlaXRoZXIgdHJ1ZVxuICAgICAgICAgICAgY29tYmluZWRTY2hlbWEudW5pcXVlSXRlbXMgPSAhIWNvbWJpbmVkVmFsdWUgfHwgISFzY2hlbWFWYWx1ZVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb21iaW5lZFNjaGVtYVxufVxuIl19