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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VTY2hlbWFzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nc2YvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2Z1bmN0aW9ucy9tZXJnZS1zY2hlbWFzL21lcmdlU2NoZW1hcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUMzRSxPQUFPLEVBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUMsTUFBTSxZQUFZLENBQUE7QUFDM0QsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUE7QUFvQjNCLE1BQU0sVUFBVSxZQUFZLENBQUMsR0FBRyxPQUFZO0lBQzFDLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUNwRCxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFO1FBQzdDLE9BQU8sSUFBSSxDQUFBO0tBQ1o7SUFDRCxNQUFNLGNBQWMsR0FBUSxFQUFFLENBQUE7SUFDOUIsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUU7UUFDNUIsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3JDLE1BQU0sYUFBYSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUN6QyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLEVBQUU7Z0JBQ3pFLGNBQWMsQ0FB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YUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFBOzRCQUM3RCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRTtnQ0FDekIsT0FBTyxFQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUMsQ0FBQTs2QkFDN0I7NEJBQ0QsY0FBYyxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUE7eUJBQ2xGOzZCQUFNOzRCQUNMLE9BQU8sRUFBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFDLENBQUE7eUJBQzdCO3dCQUNELE1BQUs7b0JBQ1AsS0FBSyxhQUFhO3dCQUVoQixjQUFjLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQTt3QkFDN0QsTUFBSztvQkFDUDt3QkFDRSxPQUFPLEVBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBQyxDQUFBO2lCQUMvQjthQUNGO1NBQ0Y7S0FDRjtJQUNELE9BQU8sY0FBYyxDQUFBO0FBQ3ZCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzQXJyYXksIGlzRW1wdHksIGlzTnVtYmVyLCBpc09iamVjdCwgaXNTdHJpbmd9IGZyb20gJy4uL3ZhbGlkYXRvcidcbmltcG9ydCB7Y29tbW9uSXRlbXMsIGhhc093biwgdW5pcXVlSXRlbXN9IGZyb20gJy4uL3V0aWxpdHknXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCdcblxuLyoqXG4gKiAnbWVyZ2VTY2hlbWFzJyBmdW5jdGlvblxuICpcbiAqIE1lcmdlcyBtdWx0aXBsZSBKU09OIHNjaGVtYXMgaW50byBhIHNpbmdsZSBzY2hlbWEgd2l0aCBjb21iaW5lZCBydWxlcy5cbiAqXG4gKiBJZiBhYmxlIHRvIGxvZ2ljYWxseSBtZXJnZSBwcm9wZXJ0aWVzIGZyb20gYWxsIHNjaGVtYXMsXG4gKiByZXR1cm5zIGEgc2luZ2xlIHNjaGVtYSBvYmplY3QgY29udGFpbmluZyBhbGwgbWVyZ2VkIHByb3BlcnRpZXMuXG4gKlxuICogRXhhbXBsZTogKHsgYTogYiwgbWF4OiAxIH0sIHsgYzogZCwgbWF4OiAyIH0pID0+IHsgYTogYiwgYzogZCwgbWF4OiAxIH1cbiAqXG4gKiBJZiB1bmFibGUgdG8gbG9naWNhbGx5IG1lcmdlLCByZXR1cm5zIGFuIGFsbE9mIHNjaGVtYSBvYmplY3QgY29udGFpbmluZ1xuICogYW4gYXJyYXkgb2YgdGhlIG9yaWdpbmFsIHNjaGVtYXM7XG4gKlxuICogRXhhbXBsZTogKHsgYTogYiB9LCB7IGE6IGQgfSkgPT4geyBhbGxPZjogWyB7IGE6IGIgfSwgeyBhOiBkIH0gXSB9XG4gKlxuICogQHBhcmFtIHNjaGVtYXMgLSBvbmUgb3IgbW9yZSBpbnB1dCBzY2hlbWFzXG4gKiBAcmV0dXJuIG1lcmdlZCBzY2hlbWFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlU2NoZW1hcyguLi5zY2hlbWFzOiBhbnkpIHtcbiAgc2NoZW1hcyA9IHNjaGVtYXMuZmlsdGVyKHNjaGVtYSA9PiAhaXNFbXB0eShzY2hlbWEpKVxuICBpZiAoc2NoZW1hcy5zb21lKHNjaGVtYSA9PiAhaXNPYmplY3Qoc2NoZW1hKSkpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIGNvbnN0IGNvbWJpbmVkU2NoZW1hOiBhbnkgPSB7fVxuICBmb3IgKGNvbnN0IHNjaGVtYSBvZiBzY2hlbWFzKSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc2NoZW1hKSkge1xuICAgICAgY29uc3QgY29tYmluZWRWYWx1ZSA9IGNvbWJpbmVkU2NoZW1hW2tleV1cbiAgICAgIGNvbnN0IHNjaGVtYVZhbHVlID0gc2NoZW1hW2tleV1cbiAgICAgIGlmICghaGFzT3duKGNvbWJpbmVkU2NoZW1hLCBrZXkpIHx8IF8uaXNFcXVhbChjb21iaW5lZFZhbHVlLCBzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgY29tYmluZWRTY2hlbWFba2V5XSA9IHNjaGVtYVZhbHVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgIGNhc2UgJ2FsbE9mJzpcbiAgICAgICAgICAgIC8vIENvbWJpbmUgYWxsIGl0ZW1zIGZyb20gYm90aCBhcnJheXNcbiAgICAgICAgICAgIGlmIChpc0FycmF5KGNvbWJpbmVkVmFsdWUpICYmIGlzQXJyYXkoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLmFsbE9mID0gbWVyZ2VTY2hlbWFzKC4uLmNvbWJpbmVkVmFsdWUsIC4uLnNjaGVtYVZhbHVlKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdhZGRpdGlvbmFsSXRlbXMnOlxuICAgICAgICAgIGNhc2UgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJzpcbiAgICAgICAgICBjYXNlICdjb250YWlucyc6XG4gICAgICAgICAgY2FzZSAncHJvcGVydHlOYW1lcyc6XG4gICAgICAgICAgICAvLyBNZXJnZSBzY2hlbWEgb2JqZWN0c1xuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGNvbWJpbmVkVmFsdWUpICYmIGlzT2JqZWN0KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYVtrZXldID0gbWVyZ2VTY2hlbWFzKGNvbWJpbmVkVmFsdWUsIHNjaGVtYVZhbHVlKVxuICAgICAgICAgICAgICAvLyBhZGRpdGlvbmFsUHJvcGVydGllcyA9PSBmYWxzZSBpbiBhbnkgc2NoZW1hIG92ZXJyaWRlcyBhbGwgb3RoZXIgdmFsdWVzXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICBrZXkgPT09ICdhZGRpdGlvbmFsUHJvcGVydGllcycgJiZcbiAgICAgICAgICAgICAgKGNvbWJpbmVkVmFsdWUgPT09IGZhbHNlIHx8IHNjaGVtYVZhbHVlID09PSBmYWxzZSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5jb21iaW5lZFNjaGVtYSA9IGZhbHNlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ2FueU9mJzpcbiAgICAgICAgICBjYXNlICdvbmVPZic6XG4gICAgICAgICAgY2FzZSAnZW51bSc6XG4gICAgICAgICAgICAvLyBLZWVwIG9ubHkgaXRlbXMgdGhhdCBhcHBlYXIgaW4gYm90aCBhcnJheXNcbiAgICAgICAgICAgIGlmIChpc0FycmF5KGNvbWJpbmVkVmFsdWUpICYmIGlzQXJyYXkoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hW2tleV0gPSBjb21iaW5lZFZhbHVlLmZpbHRlcihpdGVtMSA9PlxuICAgICAgICAgICAgICAgIHNjaGVtYVZhbHVlLmZpbmRJbmRleChpdGVtMiA9PiBfLmlzRXF1YWwoaXRlbTEsIGl0ZW0yKSkgPiAtMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIGlmICghY29tYmluZWRTY2hlbWFba2V5XS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnZGVmaW5pdGlvbnMnOlxuICAgICAgICAgICAgLy8gQ29tYmluZSBrZXlzIGZyb20gYm90aCBvYmplY3RzXG4gICAgICAgICAgICBpZiAoaXNPYmplY3QoY29tYmluZWRWYWx1ZSkgJiYgaXNPYmplY3Qoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbWJpbmVkT2JqZWN0ID0gey4uLmNvbWJpbmVkVmFsdWV9XG4gICAgICAgICAgICAgIGZvciAoY29uc3Qgc3ViS2V5IG9mIE9iamVjdC5rZXlzKHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICghaGFzT3duKGNvbWJpbmVkT2JqZWN0LCBzdWJLZXkpIHx8XG4gICAgICAgICAgICAgICAgICBfLmlzRXF1YWwoY29tYmluZWRPYmplY3Rbc3ViS2V5XSwgc2NoZW1hVmFsdWVbc3ViS2V5XSlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W3N1YktleV0gPSBzY2hlbWFWYWx1ZVtzdWJLZXldXG4gICAgICAgICAgICAgICAgICAvLyBEb24ndCBjb21iaW5lIG1hdGNoaW5nIGtleXMgd2l0aCBkaWZmZXJlbnQgdmFsdWVzXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEuZGVmaW5pdGlvbnMgPSBjb21iaW5lZE9iamVjdFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdkZXBlbmRlbmNpZXMnOlxuICAgICAgICAgICAgLy8gQ29tYmluZSBhbGwga2V5cyBmcm9tIGJvdGggb2JqZWN0c1xuICAgICAgICAgICAgLy8gYW5kIG1lcmdlIHNjaGVtYXMgb24gbWF0Y2hpbmcga2V5cyxcbiAgICAgICAgICAgIC8vIGNvbnZlcnRpbmcgZnJvbSBhcnJheXMgdG8gb2JqZWN0cyBpZiBuZWNlc3NhcnlcbiAgICAgICAgICAgIGlmIChpc09iamVjdChjb21iaW5lZFZhbHVlKSAmJiBpc09iamVjdChzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29uc3QgY29tYmluZWRPYmplY3QgPSB7Li4uY29tYmluZWRWYWx1ZX1cbiAgICAgICAgICAgICAgZm9yIChjb25zdCBzdWJLZXkgb2YgT2JqZWN0LmtleXMoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFoYXNPd24oY29tYmluZWRPYmplY3QsIHN1YktleSkgfHxcbiAgICAgICAgICAgICAgICAgIF8uaXNFcXVhbChjb21iaW5lZE9iamVjdFtzdWJLZXldLCBzY2hlbWFWYWx1ZVtzdWJLZXldKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgY29tYmluZWRPYmplY3Rbc3ViS2V5XSA9IHNjaGVtYVZhbHVlW3N1YktleV1cbiAgICAgICAgICAgICAgICAgIC8vIElmIGJvdGgga2V5cyBhcmUgYXJyYXlzLCBpbmNsdWRlIGFsbCBpdGVtcyBmcm9tIGJvdGggYXJyYXlzLFxuICAgICAgICAgICAgICAgICAgLy8gZXhjbHVkaW5nIGR1cGxpY2F0ZXNcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgaXNBcnJheShzY2hlbWFWYWx1ZVtzdWJLZXldKSAmJiBpc0FycmF5KGNvbWJpbmVkT2JqZWN0W3N1YktleV0pXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdFtzdWJLZXldID1cbiAgICAgICAgICAgICAgICAgICAgdW5pcXVlSXRlbXMoLi4uY29tYmluZWRPYmplY3Rbc3ViS2V5XSwgLi4uc2NoZW1hVmFsdWVbc3ViS2V5XSlcbiAgICAgICAgICAgICAgICAgIC8vIElmIGVpdGhlciBrZXkgaXMgYW4gb2JqZWN0LCBtZXJnZSB0aGUgc2NoZW1hc1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAoaXNBcnJheShzY2hlbWFWYWx1ZVtzdWJLZXldKSB8fCBpc09iamVjdChzY2hlbWFWYWx1ZVtzdWJLZXldKSkgJiZcbiAgICAgICAgICAgICAgICAgIChpc0FycmF5KGNvbWJpbmVkT2JqZWN0W3N1YktleV0pIHx8IGlzT2JqZWN0KGNvbWJpbmVkT2JqZWN0W3N1YktleV0pKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgLy8gSWYgZWl0aGVyIGtleSBpcyBhbiBhcnJheSwgY29udmVydCBpdCB0byBhbiBvYmplY3QgZmlyc3RcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVpcmVkID0gaXNBcnJheShjb21iaW5lZFNjaGVtYS5yZXF1aXJlZCkgP1xuICAgICAgICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5yZXF1aXJlZCA6IFtdXG4gICAgICAgICAgICAgICAgICBjb25zdCBjb21iaW5lZERlcGVuZGVuY3kgPSBpc0FycmF5KGNvbWJpbmVkT2JqZWN0W3N1YktleV0pID9cbiAgICAgICAgICAgICAgICAgICAge3JlcXVpcmVkOiB1bmlxdWVJdGVtcyguLi5yZXF1aXJlZCwgY29tYmluZWRPYmplY3Rbc3ViS2V5XSl9IDpcbiAgICAgICAgICAgICAgICAgICAgY29tYmluZWRPYmplY3Rbc3ViS2V5XVxuICAgICAgICAgICAgICAgICAgY29uc3Qgc2NoZW1hRGVwZW5kZW5jeSA9IGlzQXJyYXkoc2NoZW1hVmFsdWVbc3ViS2V5XSkgP1xuICAgICAgICAgICAgICAgICAgICB7cmVxdWlyZWQ6IHVuaXF1ZUl0ZW1zKC4uLnJlcXVpcmVkLCBzY2hlbWFWYWx1ZVtzdWJLZXldKX0gOlxuICAgICAgICAgICAgICAgICAgICBzY2hlbWFWYWx1ZVtzdWJLZXldXG4gICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdFtzdWJLZXldID1cbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VTY2hlbWFzKGNvbWJpbmVkRGVwZW5kZW5jeSwgc2NoZW1hRGVwZW5kZW5jeSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5kZXBlbmRlbmNpZXMgPSBjb21iaW5lZE9iamVjdFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdpdGVtcyc6XG4gICAgICAgICAgICAvLyBJZiBhcnJheXMsIGtlZXAgb25seSBpdGVtcyB0aGF0IGFwcGVhciBpbiBib3RoIGFycmF5c1xuICAgICAgICAgICAgaWYgKGlzQXJyYXkoY29tYmluZWRWYWx1ZSkgJiYgaXNBcnJheShzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEuaXRlbXMgPSBjb21iaW5lZFZhbHVlLmZpbHRlcihpdGVtMSA9PlxuICAgICAgICAgICAgICAgIHNjaGVtYVZhbHVlLmZpbmRJbmRleChpdGVtMiA9PiBfLmlzRXF1YWwoaXRlbTEsIGl0ZW0yKSkgPiAtMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIGlmICghY29tYmluZWRTY2hlbWEuaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIElmIGJvdGgga2V5cyBhcmUgb2JqZWN0cywgbWVyZ2UgdGhlbVxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc09iamVjdChjb21iaW5lZFZhbHVlKSAmJiBpc09iamVjdChzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEuaXRlbXMgPSBtZXJnZVNjaGVtYXMoY29tYmluZWRWYWx1ZSwgc2NoZW1hVmFsdWUpXG4gICAgICAgICAgICAgIC8vIElmIG9iamVjdCArIGFycmF5LCBjb21iaW5lIG9iamVjdCB3aXRoIGVhY2ggYXJyYXkgaXRlbVxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KGNvbWJpbmVkVmFsdWUpICYmIGlzT2JqZWN0KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5pdGVtcyA9XG4gICAgICAgICAgICAgICAgY29tYmluZWRWYWx1ZS5tYXAoaXRlbSA9PiBtZXJnZVNjaGVtYXMoaXRlbSwgc2NoZW1hVmFsdWUpKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc09iamVjdChjb21iaW5lZFZhbHVlKSAmJiBpc0FycmF5KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5pdGVtcyA9XG4gICAgICAgICAgICAgICAgc2NoZW1hVmFsdWUubWFwKGl0ZW0gPT4gbWVyZ2VTY2hlbWFzKGl0ZW0sIGNvbWJpbmVkVmFsdWUpKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdtdWx0aXBsZU9mJzpcbiAgICAgICAgICAgIC8vIFRPRE86IEFkanVzdCB0byBjb3JyZWN0bHkgaGFuZGxlIGRlY2ltYWwgdmFsdWVzXG4gICAgICAgICAgICAvLyBJZiBudW1iZXJzLCBzZXQgdG8gbGVhc3QgY29tbW9uIG11bHRpcGxlXG4gICAgICAgICAgICBpZiAoaXNOdW1iZXIoY29tYmluZWRWYWx1ZSkgJiYgaXNOdW1iZXIoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGdjZCA9ICh4LCB5KSA9PiAheSA/IHggOiBnY2QoeSwgeCAlIHkpXG4gICAgICAgICAgICAgIGNvbnN0IGxjbSA9ICh4LCB5KSA9PiAoeCAqIHkpIC8gZ2NkKHgsIHkpXG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLm11bHRpcGxlT2YgPSBsY20oY29tYmluZWRWYWx1ZSwgc2NoZW1hVmFsdWUpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ21heGltdW0nOlxuICAgICAgICAgIGNhc2UgJ2V4Y2x1c2l2ZU1heGltdW0nOlxuICAgICAgICAgIGNhc2UgJ21heExlbmd0aCc6XG4gICAgICAgICAgY2FzZSAnbWF4SXRlbXMnOlxuICAgICAgICAgIGNhc2UgJ21heFByb3BlcnRpZXMnOlxuICAgICAgICAgICAgLy8gSWYgbnVtYmVycywgc2V0IHRvIGxvd2VzdCB2YWx1ZVxuICAgICAgICAgICAgaWYgKGlzTnVtYmVyKGNvbWJpbmVkVmFsdWUpICYmIGlzTnVtYmVyKHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYVtrZXldID0gTWF0aC5taW4oY29tYmluZWRWYWx1ZSwgc2NoZW1hVmFsdWUpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ21pbmltdW0nOlxuICAgICAgICAgIGNhc2UgJ2V4Y2x1c2l2ZU1pbmltdW0nOlxuICAgICAgICAgIGNhc2UgJ21pbkxlbmd0aCc6XG4gICAgICAgICAgY2FzZSAnbWluSXRlbXMnOlxuICAgICAgICAgIGNhc2UgJ21pblByb3BlcnRpZXMnOlxuICAgICAgICAgICAgLy8gSWYgbnVtYmVycywgc2V0IHRvIGhpZ2hlc3QgdmFsdWVcbiAgICAgICAgICAgIGlmIChpc051bWJlcihjb21iaW5lZFZhbHVlKSAmJiBpc051bWJlcihzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWFba2V5XSA9IE1hdGgubWF4KGNvbWJpbmVkVmFsdWUsIHNjaGVtYVZhbHVlKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdub3QnOlxuICAgICAgICAgICAgLy8gQ29tYmluZSBub3QgdmFsdWVzIGludG8gYW55T2YgYXJyYXlcbiAgICAgICAgICAgIGlmIChpc09iamVjdChjb21iaW5lZFZhbHVlKSAmJiBpc09iamVjdChzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29uc3Qgbm90QW55T2YgPSBbY29tYmluZWRWYWx1ZSwgc2NoZW1hVmFsdWVdXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgobm90QW55T2ZBcnJheSwgbm90U2NoZW1hKSA9PlxuICAgICAgICAgICAgICAgICAgICBpc0FycmF5KG5vdFNjaGVtYS5hbnlPZikgJiZcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMobm90U2NoZW1hKS5sZW5ndGggPT09IDEgP1xuICAgICAgICAgICAgICAgICAgICAgIFsuLi5ub3RBbnlPZkFycmF5LCAuLi5ub3RTY2hlbWEuYW55T2ZdIDpcbiAgICAgICAgICAgICAgICAgICAgICBbLi4ubm90QW55T2ZBcnJheSwgbm90U2NoZW1hXVxuICAgICAgICAgICAgICAgICAgLCBbXSlcbiAgICAgICAgICAgICAgLy8gVE9ETzogUmVtb3ZlIGR1cGxpY2F0ZSBpdGVtcyBmcm9tIGFycmF5XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLm5vdCA9IHthbnlPZjogbm90QW55T2Z9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ3BhdHRlcm5Qcm9wZXJ0aWVzJzpcbiAgICAgICAgICAgIC8vIENvbWJpbmUgYWxsIGtleXMgZnJvbSBib3RoIG9iamVjdHNcbiAgICAgICAgICAgIC8vIGFuZCBtZXJnZSBzY2hlbWFzIG9uIG1hdGNoaW5nIGtleXNcbiAgICAgICAgICAgIGlmIChpc09iamVjdChjb21iaW5lZFZhbHVlKSAmJiBpc09iamVjdChzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29uc3QgY29tYmluZWRPYmplY3QgPSB7Li4uY29tYmluZWRWYWx1ZX1cbiAgICAgICAgICAgICAgZm9yIChjb25zdCBzdWJLZXkgb2YgT2JqZWN0LmtleXMoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFoYXNPd24oY29tYmluZWRPYmplY3QsIHN1YktleSkgfHxcbiAgICAgICAgICAgICAgICAgIF8uaXNFcXVhbChjb21iaW5lZE9iamVjdFtzdWJLZXldLCBzY2hlbWFWYWx1ZVtzdWJLZXldKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgY29tYmluZWRPYmplY3Rbc3ViS2V5XSA9IHNjaGVtYVZhbHVlW3N1YktleV1cbiAgICAgICAgICAgICAgICAgIC8vIElmIGJvdGgga2V5cyBhcmUgb2JqZWN0cywgbWVyZ2UgdGhlbVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICBpc09iamVjdChzY2hlbWFWYWx1ZVtzdWJLZXldKSAmJiBpc09iamVjdChjb21iaW5lZE9iamVjdFtzdWJLZXldKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgY29tYmluZWRPYmplY3Rbc3ViS2V5XSA9XG4gICAgICAgICAgICAgICAgICAgIG1lcmdlU2NoZW1hcyhjb21iaW5lZE9iamVjdFtzdWJLZXldLCBzY2hlbWFWYWx1ZVtzdWJLZXldKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLnBhdHRlcm5Qcm9wZXJ0aWVzID0gY29tYmluZWRPYmplY3RcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAncHJvcGVydGllcyc6XG4gICAgICAgICAgICAvLyBDb21iaW5lIGFsbCBrZXlzIGZyb20gYm90aCBvYmplY3RzXG4gICAgICAgICAgICAvLyB1bmxlc3MgYWRkaXRpb25hbFByb3BlcnRpZXMgPT09IGZhbHNlXG4gICAgICAgICAgICAvLyBhbmQgbWVyZ2Ugc2NoZW1hcyBvbiBtYXRjaGluZyBrZXlzXG4gICAgICAgICAgICBpZiAoaXNPYmplY3QoY29tYmluZWRWYWx1ZSkgJiYgaXNPYmplY3Qoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbWJpbmVkT2JqZWN0ID0gey4uLmNvbWJpbmVkVmFsdWV9XG4gICAgICAgICAgICAgIC8vIElmIG5ldyBzY2hlbWEgaGFzIGFkZGl0aW9uYWxQcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICAvLyBtZXJnZSBvciByZW1vdmUgbm9uLW1hdGNoaW5nIHByb3BlcnR5IGtleXMgaW4gY29tYmluZWQgc2NoZW1hXG4gICAgICAgICAgICAgIGlmIChoYXNPd24oc2NoZW1hVmFsdWUsICdhZGRpdGlvbmFsUHJvcGVydGllcycpKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoY29tYmluZWRWYWx1ZSlcbiAgICAgICAgICAgICAgICAgIC5maWx0ZXIoY29tYmluZWRLZXkgPT4gIU9iamVjdC5rZXlzKHNjaGVtYVZhbHVlKS5pbmNsdWRlcyhjb21iaW5lZEtleSkpXG4gICAgICAgICAgICAgICAgICAuZm9yRWFjaChub25NYXRjaGluZ0tleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzY2hlbWFWYWx1ZS5hZGRpdGlvbmFsUHJvcGVydGllcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgY29tYmluZWRPYmplY3Rbbm9uTWF0Y2hpbmdLZXldXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3Qoc2NoZW1hVmFsdWUuYWRkaXRpb25hbFByb3BlcnRpZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29tYmluZWRPYmplY3Rbbm9uTWF0Y2hpbmdLZXldID0gbWVyZ2VTY2hlbWFzKFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluZWRPYmplY3Rbbm9uTWF0Y2hpbmdLZXldLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NoZW1hVmFsdWUuYWRkaXRpb25hbFByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZm9yIChjb25zdCBzdWJLZXkgb2YgT2JqZWN0LmtleXMoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKF8uaXNFcXVhbChjb21iaW5lZE9iamVjdFtzdWJLZXldLCBzY2hlbWFWYWx1ZVtzdWJLZXldKSB8fCAoXG4gICAgICAgICAgICAgICAgICAhaGFzT3duKGNvbWJpbmVkT2JqZWN0LCBzdWJLZXkpICYmXG4gICAgICAgICAgICAgICAgICAhaGFzT3duKGNvbWJpbmVkT2JqZWN0LCAnYWRkaXRpb25hbFByb3BlcnRpZXMnKVxuICAgICAgICAgICAgICAgICkpIHtcbiAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W3N1YktleV0gPSBzY2hlbWFWYWx1ZVtzdWJLZXldXG4gICAgICAgICAgICAgICAgICAvLyBJZiBjb21iaW5lZCBzY2hlbWEgaGFzIGFkZGl0aW9uYWxQcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICAgICAgLy8gbWVyZ2Ugb3IgaWdub3JlIG5vbi1tYXRjaGluZyBwcm9wZXJ0eSBrZXlzIGluIG5ldyBzY2hlbWFcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgIWhhc093bihjb21iaW5lZE9iamVjdCwgc3ViS2V5KSAmJlxuICAgICAgICAgICAgICAgICAgaGFzT3duKGNvbWJpbmVkT2JqZWN0LCAnYWRkaXRpb25hbFByb3BlcnRpZXMnKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgLy8gSWYgY29tYmluZWRPYmplY3QuYWRkaXRpb25hbFByb3BlcnRpZXMgPT09IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgLy8gZG8gbm90aGluZyAoZG9uJ3Qgc2V0IGtleSlcbiAgICAgICAgICAgICAgICAgIC8vIElmIGFkZGl0aW9uYWxQcm9wZXJ0aWVzIGlzIG9iamVjdCwgbWVyZ2Ugd2l0aCBuZXcga2V5XG4gICAgICAgICAgICAgICAgICBpZiAoaXNPYmplY3QoY29tYmluZWRPYmplY3QuYWRkaXRpb25hbFByb3BlcnRpZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W3N1YktleV0gPSBtZXJnZVNjaGVtYXMoXG4gICAgICAgICAgICAgICAgICAgICAgY29tYmluZWRPYmplY3QuYWRkaXRpb25hbFByb3BlcnRpZXMsIHNjaGVtYVZhbHVlW3N1YktleV1cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgLy8gSWYgYm90aCBrZXlzIGFyZSBvYmplY3RzLCBtZXJnZSB0aGVtXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgIGlzT2JqZWN0KHNjaGVtYVZhbHVlW3N1YktleV0pICYmXG4gICAgICAgICAgICAgICAgICBpc09iamVjdChjb21iaW5lZE9iamVjdFtzdWJLZXldKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgY29tYmluZWRPYmplY3Rbc3ViS2V5XSA9XG4gICAgICAgICAgICAgICAgICAgIG1lcmdlU2NoZW1hcyhjb21iaW5lZE9iamVjdFtzdWJLZXldLCBzY2hlbWFWYWx1ZVtzdWJLZXldKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLnByb3BlcnRpZXMgPSBjb21iaW5lZE9iamVjdFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdyZXF1aXJlZCc6XG4gICAgICAgICAgICAvLyBJZiBhcnJheXMsIGluY2x1ZGUgYWxsIGl0ZW1zIGZyb20gYm90aCBhcnJheXMsIGV4Y2x1ZGluZyBkdXBsaWNhdGVzXG4gICAgICAgICAgICBpZiAoaXNBcnJheShjb21iaW5lZFZhbHVlKSAmJiBpc0FycmF5KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5yZXF1aXJlZCA9IHVuaXF1ZUl0ZW1zKC4uLmNvbWJpbmVkVmFsdWUsIC4uLnNjaGVtYVZhbHVlKVxuICAgICAgICAgICAgICAvLyBJZiBib29sZWFucywgYWV0IHRydWUgaWYgZWl0aGVyIHRydWVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgIHR5cGVvZiBzY2hlbWFWYWx1ZSA9PT0gJ2Jvb2xlYW4nICYmXG4gICAgICAgICAgICAgIHR5cGVvZiBjb21iaW5lZFZhbHVlID09PSAnYm9vbGVhbidcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5yZXF1aXJlZCA9ICEhY29tYmluZWRWYWx1ZSB8fCAhIXNjaGVtYVZhbHVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJyRzY2hlbWEnOlxuICAgICAgICAgIGNhc2UgJyRpZCc6XG4gICAgICAgICAgY2FzZSAnaWQnOlxuICAgICAgICAgICAgLy8gRG9uJ3QgY29tYmluZSB0aGVzZSBrZXlzXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ3RpdGxlJzpcbiAgICAgICAgICBjYXNlICdkZXNjcmlwdGlvbic6XG4gICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGxhc3QgdmFsdWUsIG92ZXJ3cml0aW5nIGFueSBwcmV2aW91cyBvbmVcbiAgICAgICAgICAgIC8vIFRoZXNlIHByb3BlcnRpZXMgYXJlIG5vdCB1c2VkIGZvciB2YWxpZGF0aW9uLCBzbyBjb25mbGljdHMgZG9uJ3QgbWF0dGVyXG4gICAgICAgICAgICBjb21iaW5lZFNjaGVtYVtrZXldID0gc2NoZW1hVmFsdWVcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAndHlwZSc6XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIChpc0FycmF5KHNjaGVtYVZhbHVlKSB8fCBpc1N0cmluZyhzY2hlbWFWYWx1ZSkpICYmXG4gICAgICAgICAgICAgIChpc0FycmF5KGNvbWJpbmVkVmFsdWUpIHx8IGlzU3RyaW5nKGNvbWJpbmVkVmFsdWUpKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbWJpbmVkVHlwZXMgPSBjb21tb25JdGVtcyhjb21iaW5lZFZhbHVlLCBzY2hlbWFWYWx1ZSlcbiAgICAgICAgICAgICAgaWYgKCFjb21iaW5lZFR5cGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS50eXBlID0gY29tYmluZWRUeXBlcy5sZW5ndGggPiAxID8gY29tYmluZWRUeXBlcyA6IGNvbWJpbmVkVHlwZXNbMF1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAndW5pcXVlSXRlbXMnOlxuICAgICAgICAgICAgLy8gU2V0IHRydWUgaWYgZWl0aGVyIHRydWVcbiAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLnVuaXF1ZUl0ZW1zID0gISFjb21iaW5lZFZhbHVlIHx8ICEhc2NoZW1hVmFsdWVcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY29tYmluZWRTY2hlbWFcbn1cbiJdfQ==