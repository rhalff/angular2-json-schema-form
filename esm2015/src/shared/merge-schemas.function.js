import * as _ from 'lodash';
import { isArray, isEmpty, isNumber, isObject, isString } from './validator.functions';
import { hasOwn, uniqueItems, commonItems } from './utility.functions';
/**
 * 'mergeSchemas' function
 *
 * Merges multiple JSON schemas into a single schema with combined rules.
 *
 * If able to logically merge properties from all schemas,
 * returns a single schema object containing all merged properties.
 *
 * Example: ({ a: b, max: 1 }, { c: d, max: 2 }) => { a: b, c: d, max: 1 }
 *
 * If unable to logically merge, returns an allOf schema object containing
 * an array of the original schemas;
 *
 * Example: ({ a: b }, { a: d }) => { allOf: [ { a: b }, { a: d } ] }
 *
 * @param  { any } schemas - one or more input schemas
 * @return { any } - merged schema
 */
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
                        // Combine all items from both arrays
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
                        // Merge schema objects
                        if (isObject(combinedValue) && isObject(schemaValue)) {
                            combinedSchema[key] = mergeSchemas(combinedValue, schemaValue);
                            // additionalProperties == false in any schema overrides all other values
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
                        // Keep only items that appear in both arrays
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
                        // Combine keys from both objects
                        if (isObject(combinedValue) && isObject(schemaValue)) {
                            const combinedObject = Object.assign({}, combinedValue);
                            for (const subKey of Object.keys(schemaValue)) {
                                if (!hasOwn(combinedObject, subKey) ||
                                    _.isEqual(combinedObject[subKey], schemaValue[subKey])) {
                                    combinedObject[subKey] = schemaValue[subKey];
                                    // Don't combine matching keys with different values
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
                        // Combine all keys from both objects
                        // and merge schemas on matching keys,
                        // converting from arrays to objects if necessary
                        if (isObject(combinedValue) && isObject(schemaValue)) {
                            const combinedObject = Object.assign({}, combinedValue);
                            for (const subKey of Object.keys(schemaValue)) {
                                if (!hasOwn(combinedObject, subKey) ||
                                    _.isEqual(combinedObject[subKey], schemaValue[subKey])) {
                                    combinedObject[subKey] = schemaValue[subKey];
                                    // If both keys are arrays, include all items from both arrays,
                                    // excluding duplicates
                                }
                                else if (isArray(schemaValue[subKey]) && isArray(combinedObject[subKey])) {
                                    combinedObject[subKey] =
                                        uniqueItems(...combinedObject[subKey], ...schemaValue[subKey]);
                                    // If either key is an object, merge the schemas
                                }
                                else if ((isArray(schemaValue[subKey]) || isObject(schemaValue[subKey])) &&
                                    (isArray(combinedObject[subKey]) || isObject(combinedObject[subKey]))) {
                                    // If either key is an array, convert it to an object first
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
                        // If arrays, keep only items that appear in both arrays
                        if (isArray(combinedValue) && isArray(schemaValue)) {
                            combinedSchema.items = combinedValue.filter(item1 => schemaValue.findIndex(item2 => _.isEqual(item1, item2)) > -1);
                            if (!combinedSchema.items.length) {
                                return { allOf: [...schemas] };
                            }
                            // If both keys are objects, merge them
                        }
                        else if (isObject(combinedValue) && isObject(schemaValue)) {
                            combinedSchema.items = mergeSchemas(combinedValue, schemaValue);
                            // If object + array, combine object with each array item
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
                        // TODO: Adjust to correctly handle decimal values
                        // If numbers, set to least common multiple
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
                        // If numbers, set to lowest value
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
                        // If numbers, set to highest value
                        if (isNumber(combinedValue) && isNumber(schemaValue)) {
                            combinedSchema[key] = Math.max(combinedValue, schemaValue);
                        }
                        else {
                            return { allOf: [...schemas] };
                        }
                        break;
                    case 'not':
                        // Combine not values into anyOf array
                        if (isObject(combinedValue) && isObject(schemaValue)) {
                            const notAnyOf = [combinedValue, schemaValue]
                                .reduce((notAnyOfArray, notSchema) => isArray(notSchema.anyOf) &&
                                Object.keys(notSchema).length === 1 ?
                                [...notAnyOfArray, ...notSchema.anyOf] :
                                [...notAnyOfArray, notSchema], []);
                            // TODO: Remove duplicate items from array
                            combinedSchema.not = { anyOf: notAnyOf };
                        }
                        else {
                            return { allOf: [...schemas] };
                        }
                        break;
                    case 'patternProperties':
                        // Combine all keys from both objects
                        // and merge schemas on matching keys
                        if (isObject(combinedValue) && isObject(schemaValue)) {
                            const combinedObject = Object.assign({}, combinedValue);
                            for (const subKey of Object.keys(schemaValue)) {
                                if (!hasOwn(combinedObject, subKey) ||
                                    _.isEqual(combinedObject[subKey], schemaValue[subKey])) {
                                    combinedObject[subKey] = schemaValue[subKey];
                                    // If both keys are objects, merge them
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
                        // Combine all keys from both objects
                        // unless additionalProperties === false
                        // and merge schemas on matching keys
                        if (isObject(combinedValue) && isObject(schemaValue)) {
                            const combinedObject = Object.assign({}, combinedValue);
                            // If new schema has additionalProperties,
                            // merge or remove non-matching property keys in combined schema
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
                                    // If combined schema has additionalProperties,
                                    // merge or ignore non-matching property keys in new schema
                                }
                                else if (!hasOwn(combinedObject, subKey) &&
                                    hasOwn(combinedObject, 'additionalProperties')) {
                                    // If combinedObject.additionalProperties === false,
                                    // do nothing (don't set key)
                                    // If additionalProperties is object, merge with new key
                                    if (isObject(combinedObject.additionalProperties)) {
                                        combinedObject[subKey] = mergeSchemas(combinedObject.additionalProperties, schemaValue[subKey]);
                                    }
                                    // If both keys are objects, merge them
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
                        // If arrays, include all items from both arrays, excluding duplicates
                        if (isArray(combinedValue) && isArray(schemaValue)) {
                            combinedSchema.required = uniqueItems(...combinedValue, ...schemaValue);
                            // If booleans, aet true if either true
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
                        // Don't combine these keys
                        break;
                    case 'title':
                    case 'description':
                        // Return the last value, overwriting any previous one
                        // These properties are not used for validation, so conflicts don't matter
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
                        // Set true if either true
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2Utc2NoZW1hcy5mdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWpzb24tc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJzcmMvc2hhcmVkL21lcmdlLXNjaGVtYXMuZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFNUIsT0FBTyxFQUNMLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQy9DLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHdkU7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsTUFBTSxVQUFVLFlBQVksQ0FBQyxHQUFHLE9BQU87SUFDckMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3JELElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUU7UUFBRSxPQUFPLElBQUksQ0FBQztLQUFFO0lBQy9ELE1BQU0sY0FBYyxHQUFRLEVBQUUsQ0FBQztJQUMvQixLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtRQUM1QixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDckMsTUFBTSxhQUFhLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsT0FB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T0FBTyxDQUFFLEVBQUUsQ0FBQzt5QkFDbEM7d0JBQ0gsTUFBTTtvQkFDTixLQUFLLGFBQWE7d0JBQ2hCLDBCQUEwQjt3QkFDMUIsY0FBYyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUM7d0JBQ2hFLE1BQU07b0JBQ047d0JBQ0UsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFFLEdBQUcsT0FBTyxDQUFFLEVBQUUsQ0FBQztpQkFDcEM7YUFDRjtTQUNGO0tBQ0Y7SUFDRCxPQUFPLGNBQWMsQ0FBQztBQUN4QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQge1xuICBpc0FycmF5LCBpc0VtcHR5LCBpc051bWJlciwgaXNPYmplY3QsIGlzU3RyaW5nXG59IGZyb20gJy4vdmFsaWRhdG9yLmZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBoYXNPd24sIHVuaXF1ZUl0ZW1zLCBjb21tb25JdGVtcyB9IGZyb20gJy4vdXRpbGl0eS5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgSnNvblBvaW50ZXIsIFBvaW50ZXIgfSBmcm9tICcuL2pzb25wb2ludGVyLmZ1bmN0aW9ucyc7XG5cbi8qKlxuICogJ21lcmdlU2NoZW1hcycgZnVuY3Rpb25cbiAqXG4gKiBNZXJnZXMgbXVsdGlwbGUgSlNPTiBzY2hlbWFzIGludG8gYSBzaW5nbGUgc2NoZW1hIHdpdGggY29tYmluZWQgcnVsZXMuXG4gKlxuICogSWYgYWJsZSB0byBsb2dpY2FsbHkgbWVyZ2UgcHJvcGVydGllcyBmcm9tIGFsbCBzY2hlbWFzLFxuICogcmV0dXJucyBhIHNpbmdsZSBzY2hlbWEgb2JqZWN0IGNvbnRhaW5pbmcgYWxsIG1lcmdlZCBwcm9wZXJ0aWVzLlxuICpcbiAqIEV4YW1wbGU6ICh7IGE6IGIsIG1heDogMSB9LCB7IGM6IGQsIG1heDogMiB9KSA9PiB7IGE6IGIsIGM6IGQsIG1heDogMSB9XG4gKlxuICogSWYgdW5hYmxlIHRvIGxvZ2ljYWxseSBtZXJnZSwgcmV0dXJucyBhbiBhbGxPZiBzY2hlbWEgb2JqZWN0IGNvbnRhaW5pbmdcbiAqIGFuIGFycmF5IG9mIHRoZSBvcmlnaW5hbCBzY2hlbWFzO1xuICpcbiAqIEV4YW1wbGU6ICh7IGE6IGIgfSwgeyBhOiBkIH0pID0+IHsgYWxsT2Y6IFsgeyBhOiBiIH0sIHsgYTogZCB9IF0gfVxuICpcbiAqIEBwYXJhbSAgeyBhbnkgfSBzY2hlbWFzIC0gb25lIG9yIG1vcmUgaW5wdXQgc2NoZW1hc1xuICogQHJldHVybiB7IGFueSB9IC0gbWVyZ2VkIHNjaGVtYVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VTY2hlbWFzKC4uLnNjaGVtYXMpIHtcbiAgc2NoZW1hcyA9IHNjaGVtYXMuZmlsdGVyKHNjaGVtYSA9PiAhaXNFbXB0eShzY2hlbWEpKTtcbiAgaWYgKHNjaGVtYXMuc29tZShzY2hlbWEgPT4gIWlzT2JqZWN0KHNjaGVtYSkpKSB7IHJldHVybiBudWxsOyB9XG4gIGNvbnN0IGNvbWJpbmVkU2NoZW1hOiBhbnkgPSB7fTtcbiAgZm9yIChjb25zdCBzY2hlbWEgb2Ygc2NoZW1hcykge1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHNjaGVtYSkpIHtcbiAgICAgIGNvbnN0IGNvbWJpbmVkVmFsdWUgPSBjb21iaW5lZFNjaGVtYVtrZXldO1xuICAgICAgY29uc3Qgc2NoZW1hVmFsdWUgPSBzY2hlbWFba2V5XTtcbiAgICAgIGlmICghaGFzT3duKGNvbWJpbmVkU2NoZW1hLCBrZXkpIHx8IF8uaXNFcXVhbChjb21iaW5lZFZhbHVlLCBzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgY29tYmluZWRTY2hlbWFba2V5XSA9IHNjaGVtYVZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICBjYXNlICdhbGxPZic6XG4gICAgICAgICAgICAvLyBDb21iaW5lIGFsbCBpdGVtcyBmcm9tIGJvdGggYXJyYXlzXG4gICAgICAgICAgICBpZiAoaXNBcnJheShjb21iaW5lZFZhbHVlKSAmJiBpc0FycmF5KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5hbGxPZiA9IG1lcmdlU2NoZW1hcyguLi5jb21iaW5lZFZhbHVlLCAuLi5zY2hlbWFWYWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4geyBhbGxPZjogWyAuLi5zY2hlbWFzIF0gfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdhZGRpdGlvbmFsSXRlbXMnOiBjYXNlICdhZGRpdGlvbmFsUHJvcGVydGllcyc6XG4gICAgICAgICAgY2FzZSAnY29udGFpbnMnOiBjYXNlICdwcm9wZXJ0eU5hbWVzJzpcbiAgICAgICAgICAgIC8vIE1lcmdlIHNjaGVtYSBvYmplY3RzXG4gICAgICAgICAgICBpZiAoaXNPYmplY3QoY29tYmluZWRWYWx1ZSkgJiYgaXNPYmplY3Qoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hW2tleV0gPSBtZXJnZVNjaGVtYXMoY29tYmluZWRWYWx1ZSwgc2NoZW1hVmFsdWUpO1xuICAgICAgICAgICAgLy8gYWRkaXRpb25hbFByb3BlcnRpZXMgPT0gZmFsc2UgaW4gYW55IHNjaGVtYSBvdmVycmlkZXMgYWxsIG90aGVyIHZhbHVlc1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAga2V5ID09PSAnYWRkaXRpb25hbFByb3BlcnRpZXMnICYmXG4gICAgICAgICAgICAgIChjb21iaW5lZFZhbHVlID09PSBmYWxzZSB8fCBzY2hlbWFWYWx1ZSA9PT0gZmFsc2UpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEuY29tYmluZWRTY2hlbWEgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IGFsbE9mOiBbIC4uLnNjaGVtYXMgXSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2FueU9mJzogY2FzZSAnb25lT2YnOiBjYXNlICdlbnVtJzpcbiAgICAgICAgICAgIC8vIEtlZXAgb25seSBpdGVtcyB0aGF0IGFwcGVhciBpbiBib3RoIGFycmF5c1xuICAgICAgICAgICAgaWYgKGlzQXJyYXkoY29tYmluZWRWYWx1ZSkgJiYgaXNBcnJheShzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWFba2V5XSA9IGNvbWJpbmVkVmFsdWUuZmlsdGVyKGl0ZW0xID0+XG4gICAgICAgICAgICAgICAgc2NoZW1hVmFsdWUuZmluZEluZGV4KGl0ZW0yID0+IF8uaXNFcXVhbChpdGVtMSwgaXRlbTIpKSA+IC0xXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmICghY29tYmluZWRTY2hlbWFba2V5XS5sZW5ndGgpIHsgcmV0dXJuIHsgYWxsT2Y6IFsgLi4uc2NoZW1hcyBdIH07IH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IGFsbE9mOiBbIC4uLnNjaGVtYXMgXSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2RlZmluaXRpb25zJzpcbiAgICAgICAgICAgIC8vIENvbWJpbmUga2V5cyBmcm9tIGJvdGggb2JqZWN0c1xuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGNvbWJpbmVkVmFsdWUpICYmIGlzT2JqZWN0KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb25zdCBjb21iaW5lZE9iamVjdCA9IHsgLi4uY29tYmluZWRWYWx1ZSB9O1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN1YktleSBvZiBPYmplY3Qua2V5cyhzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWhhc093bihjb21iaW5lZE9iamVjdCwgc3ViS2V5KSB8fFxuICAgICAgICAgICAgICAgICAgXy5pc0VxdWFsKGNvbWJpbmVkT2JqZWN0W3N1YktleV0sIHNjaGVtYVZhbHVlW3N1YktleV0pXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdFtzdWJLZXldID0gc2NoZW1hVmFsdWVbc3ViS2V5XTtcbiAgICAgICAgICAgICAgICAvLyBEb24ndCBjb21iaW5lIG1hdGNoaW5nIGtleXMgd2l0aCBkaWZmZXJlbnQgdmFsdWVzXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbE9mOiBbIC4uLnNjaGVtYXMgXSB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5kZWZpbml0aW9ucyA9IGNvbWJpbmVkT2JqZWN0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsT2Y6IFsgLi4uc2NoZW1hcyBdIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnZGVwZW5kZW5jaWVzJzpcbiAgICAgICAgICAgIC8vIENvbWJpbmUgYWxsIGtleXMgZnJvbSBib3RoIG9iamVjdHNcbiAgICAgICAgICAgIC8vIGFuZCBtZXJnZSBzY2hlbWFzIG9uIG1hdGNoaW5nIGtleXMsXG4gICAgICAgICAgICAvLyBjb252ZXJ0aW5nIGZyb20gYXJyYXlzIHRvIG9iamVjdHMgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgICBpZiAoaXNPYmplY3QoY29tYmluZWRWYWx1ZSkgJiYgaXNPYmplY3Qoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbWJpbmVkT2JqZWN0ID0geyAuLi5jb21iaW5lZFZhbHVlIH07XG4gICAgICAgICAgICAgIGZvciAoY29uc3Qgc3ViS2V5IG9mIE9iamVjdC5rZXlzKHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICghaGFzT3duKGNvbWJpbmVkT2JqZWN0LCBzdWJLZXkpIHx8XG4gICAgICAgICAgICAgICAgICBfLmlzRXF1YWwoY29tYmluZWRPYmplY3Rbc3ViS2V5XSwgc2NoZW1hVmFsdWVbc3ViS2V5XSlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W3N1YktleV0gPSBzY2hlbWFWYWx1ZVtzdWJLZXldO1xuICAgICAgICAgICAgICAgIC8vIElmIGJvdGgga2V5cyBhcmUgYXJyYXlzLCBpbmNsdWRlIGFsbCBpdGVtcyBmcm9tIGJvdGggYXJyYXlzLFxuICAgICAgICAgICAgICAgIC8vIGV4Y2x1ZGluZyBkdXBsaWNhdGVzXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgIGlzQXJyYXkoc2NoZW1hVmFsdWVbc3ViS2V5XSkgJiYgaXNBcnJheShjb21iaW5lZE9iamVjdFtzdWJLZXldKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgY29tYmluZWRPYmplY3Rbc3ViS2V5XSA9XG4gICAgICAgICAgICAgICAgICAgIHVuaXF1ZUl0ZW1zKC4uLmNvbWJpbmVkT2JqZWN0W3N1YktleV0sIC4uLnNjaGVtYVZhbHVlW3N1YktleV0pO1xuICAgICAgICAgICAgICAgIC8vIElmIGVpdGhlciBrZXkgaXMgYW4gb2JqZWN0LCBtZXJnZSB0aGUgc2NoZW1hc1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAoaXNBcnJheShzY2hlbWFWYWx1ZVtzdWJLZXldKSB8fCBpc09iamVjdChzY2hlbWFWYWx1ZVtzdWJLZXldKSkgJiZcbiAgICAgICAgICAgICAgICAgIChpc0FycmF5KGNvbWJpbmVkT2JqZWN0W3N1YktleV0pIHx8IGlzT2JqZWN0KGNvbWJpbmVkT2JqZWN0W3N1YktleV0pKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgLy8gSWYgZWl0aGVyIGtleSBpcyBhbiBhcnJheSwgY29udmVydCBpdCB0byBhbiBvYmplY3QgZmlyc3RcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVpcmVkID0gaXNBcnJheShjb21iaW5lZFNjaGVtYS5yZXF1aXJlZCkgP1xuICAgICAgICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5yZXF1aXJlZCA6IFtdO1xuICAgICAgICAgICAgICAgICAgY29uc3QgY29tYmluZWREZXBlbmRlbmN5ID0gaXNBcnJheShjb21iaW5lZE9iamVjdFtzdWJLZXldKSA/XG4gICAgICAgICAgICAgICAgICAgIHsgcmVxdWlyZWQ6IHVuaXF1ZUl0ZW1zKC4uLnJlcXVpcmVkLCBjb21iaW5lZE9iamVjdFtzdWJLZXldKSB9IDpcbiAgICAgICAgICAgICAgICAgICAgY29tYmluZWRPYmplY3Rbc3ViS2V5XTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHNjaGVtYURlcGVuZGVuY3kgPSBpc0FycmF5KHNjaGVtYVZhbHVlW3N1YktleV0pID9cbiAgICAgICAgICAgICAgICAgICAgeyByZXF1aXJlZDogdW5pcXVlSXRlbXMoLi4ucmVxdWlyZWQsIHNjaGVtYVZhbHVlW3N1YktleV0pIH0gOlxuICAgICAgICAgICAgICAgICAgICBzY2hlbWFWYWx1ZVtzdWJLZXldO1xuICAgICAgICAgICAgICAgICAgY29tYmluZWRPYmplY3Rbc3ViS2V5XSA9XG4gICAgICAgICAgICAgICAgICAgIG1lcmdlU2NoZW1hcyhjb21iaW5lZERlcGVuZGVuY3ksIHNjaGVtYURlcGVuZGVuY3kpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxPZjogWyAuLi5zY2hlbWFzIF0gfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEuZGVwZW5kZW5jaWVzID0gY29tYmluZWRPYmplY3Q7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4geyBhbGxPZjogWyAuLi5zY2hlbWFzIF0gfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdpdGVtcyc6XG4gICAgICAgICAgICAvLyBJZiBhcnJheXMsIGtlZXAgb25seSBpdGVtcyB0aGF0IGFwcGVhciBpbiBib3RoIGFycmF5c1xuICAgICAgICAgICAgaWYgKGlzQXJyYXkoY29tYmluZWRWYWx1ZSkgJiYgaXNBcnJheShzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEuaXRlbXMgPSBjb21iaW5lZFZhbHVlLmZpbHRlcihpdGVtMSA9PlxuICAgICAgICAgICAgICAgIHNjaGVtYVZhbHVlLmZpbmRJbmRleChpdGVtMiA9PiBfLmlzRXF1YWwoaXRlbTEsIGl0ZW0yKSkgPiAtMVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBpZiAoIWNvbWJpbmVkU2NoZW1hLml0ZW1zLmxlbmd0aCkgeyByZXR1cm4geyBhbGxPZjogWyAuLi5zY2hlbWFzIF0gfTsgfVxuICAgICAgICAgICAgLy8gSWYgYm90aCBrZXlzIGFyZSBvYmplY3RzLCBtZXJnZSB0aGVtXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KGNvbWJpbmVkVmFsdWUpICYmIGlzT2JqZWN0KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5pdGVtcyA9IG1lcmdlU2NoZW1hcyhjb21iaW5lZFZhbHVlLCBzY2hlbWFWYWx1ZSk7XG4gICAgICAgICAgICAvLyBJZiBvYmplY3QgKyBhcnJheSwgY29tYmluZSBvYmplY3Qgd2l0aCBlYWNoIGFycmF5IGl0ZW1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShjb21iaW5lZFZhbHVlKSAmJiBpc09iamVjdChzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEuaXRlbXMgPVxuICAgICAgICAgICAgICAgIGNvbWJpbmVkVmFsdWUubWFwKGl0ZW0gPT4gbWVyZ2VTY2hlbWFzKGl0ZW0sIHNjaGVtYVZhbHVlKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KGNvbWJpbmVkVmFsdWUpICYmIGlzQXJyYXkoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLml0ZW1zID1cbiAgICAgICAgICAgICAgICBzY2hlbWFWYWx1ZS5tYXAoaXRlbSA9PiBtZXJnZVNjaGVtYXMoaXRlbSwgY29tYmluZWRWYWx1ZSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsT2Y6IFsgLi4uc2NoZW1hcyBdIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbXVsdGlwbGVPZic6XG4gICAgICAgICAgICAvLyBUT0RPOiBBZGp1c3QgdG8gY29ycmVjdGx5IGhhbmRsZSBkZWNpbWFsIHZhbHVlc1xuICAgICAgICAgICAgLy8gSWYgbnVtYmVycywgc2V0IHRvIGxlYXN0IGNvbW1vbiBtdWx0aXBsZVxuICAgICAgICAgICAgaWYgKGlzTnVtYmVyKGNvbWJpbmVkVmFsdWUpICYmIGlzTnVtYmVyKHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb25zdCBnY2QgPSAoeCwgeSkgPT4gIXkgPyB4IDogZ2NkKHksIHggJSB5KTtcbiAgICAgICAgICAgICAgY29uc3QgbGNtID0gKHgsIHkpID0+ICh4ICogeSkgLyBnY2QoeCwgeSk7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLm11bHRpcGxlT2YgPSBsY20oY29tYmluZWRWYWx1ZSwgc2NoZW1hVmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsT2Y6IFsgLi4uc2NoZW1hcyBdIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbWF4aW11bSc6IGNhc2UgJ2V4Y2x1c2l2ZU1heGltdW0nOiBjYXNlICdtYXhMZW5ndGgnOlxuICAgICAgICAgIGNhc2UgJ21heEl0ZW1zJzogY2FzZSAnbWF4UHJvcGVydGllcyc6XG4gICAgICAgICAgICAvLyBJZiBudW1iZXJzLCBzZXQgdG8gbG93ZXN0IHZhbHVlXG4gICAgICAgICAgICBpZiAoaXNOdW1iZXIoY29tYmluZWRWYWx1ZSkgJiYgaXNOdW1iZXIoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hW2tleV0gPSBNYXRoLm1pbihjb21iaW5lZFZhbHVlLCBzY2hlbWFWYWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4geyBhbGxPZjogWyAuLi5zY2hlbWFzIF0gfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdtaW5pbXVtJzogY2FzZSAnZXhjbHVzaXZlTWluaW11bSc6IGNhc2UgJ21pbkxlbmd0aCc6XG4gICAgICAgICAgY2FzZSAnbWluSXRlbXMnOiBjYXNlICdtaW5Qcm9wZXJ0aWVzJzpcbiAgICAgICAgICAgIC8vIElmIG51bWJlcnMsIHNldCB0byBoaWdoZXN0IHZhbHVlXG4gICAgICAgICAgICBpZiAoaXNOdW1iZXIoY29tYmluZWRWYWx1ZSkgJiYgaXNOdW1iZXIoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hW2tleV0gPSBNYXRoLm1heChjb21iaW5lZFZhbHVlLCBzY2hlbWFWYWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4geyBhbGxPZjogWyAuLi5zY2hlbWFzIF0gfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdub3QnOlxuICAgICAgICAgICAgLy8gQ29tYmluZSBub3QgdmFsdWVzIGludG8gYW55T2YgYXJyYXlcbiAgICAgICAgICAgIGlmIChpc09iamVjdChjb21iaW5lZFZhbHVlKSAmJiBpc09iamVjdChzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29uc3Qgbm90QW55T2YgPSBbY29tYmluZWRWYWx1ZSwgc2NoZW1hVmFsdWVdXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgobm90QW55T2ZBcnJheSwgbm90U2NoZW1hKSA9PlxuICAgICAgICAgICAgICAgICAgaXNBcnJheShub3RTY2hlbWEuYW55T2YpICYmXG4gICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhub3RTY2hlbWEpLmxlbmd0aCA9PT0gMSA/XG4gICAgICAgICAgICAgICAgICAgIFsgLi4ubm90QW55T2ZBcnJheSwgLi4ubm90U2NoZW1hLmFueU9mIF0gOlxuICAgICAgICAgICAgICAgICAgICBbIC4uLm5vdEFueU9mQXJyYXksIG5vdFNjaGVtYSBdXG4gICAgICAgICAgICAgICAgLCBbXSk7XG4gICAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSBkdXBsaWNhdGUgaXRlbXMgZnJvbSBhcnJheVxuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5ub3QgPSB7IGFueU9mOiBub3RBbnlPZiB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsT2Y6IFsgLi4uc2NoZW1hcyBdIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncGF0dGVyblByb3BlcnRpZXMnOlxuICAgICAgICAgICAgLy8gQ29tYmluZSBhbGwga2V5cyBmcm9tIGJvdGggb2JqZWN0c1xuICAgICAgICAgICAgLy8gYW5kIG1lcmdlIHNjaGVtYXMgb24gbWF0Y2hpbmcga2V5c1xuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGNvbWJpbmVkVmFsdWUpICYmIGlzT2JqZWN0KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb25zdCBjb21iaW5lZE9iamVjdCA9IHsgLi4uY29tYmluZWRWYWx1ZSB9O1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN1YktleSBvZiBPYmplY3Qua2V5cyhzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWhhc093bihjb21iaW5lZE9iamVjdCwgc3ViS2V5KSB8fFxuICAgICAgICAgICAgICAgICAgXy5pc0VxdWFsKGNvbWJpbmVkT2JqZWN0W3N1YktleV0sIHNjaGVtYVZhbHVlW3N1YktleV0pXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdFtzdWJLZXldID0gc2NoZW1hVmFsdWVbc3ViS2V5XTtcbiAgICAgICAgICAgICAgICAvLyBJZiBib3RoIGtleXMgYXJlIG9iamVjdHMsIG1lcmdlIHRoZW1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgaXNPYmplY3Qoc2NoZW1hVmFsdWVbc3ViS2V5XSkgJiYgaXNPYmplY3QoY29tYmluZWRPYmplY3Rbc3ViS2V5XSlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W3N1YktleV0gPVxuICAgICAgICAgICAgICAgICAgICBtZXJnZVNjaGVtYXMoY29tYmluZWRPYmplY3Rbc3ViS2V5XSwgc2NoZW1hVmFsdWVbc3ViS2V5XSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbE9mOiBbIC4uLnNjaGVtYXMgXSB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5wYXR0ZXJuUHJvcGVydGllcyA9IGNvbWJpbmVkT2JqZWN0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsT2Y6IFsgLi4uc2NoZW1hcyBdIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncHJvcGVydGllcyc6XG4gICAgICAgICAgICAvLyBDb21iaW5lIGFsbCBrZXlzIGZyb20gYm90aCBvYmplY3RzXG4gICAgICAgICAgICAvLyB1bmxlc3MgYWRkaXRpb25hbFByb3BlcnRpZXMgPT09IGZhbHNlXG4gICAgICAgICAgICAvLyBhbmQgbWVyZ2Ugc2NoZW1hcyBvbiBtYXRjaGluZyBrZXlzXG4gICAgICAgICAgICBpZiAoaXNPYmplY3QoY29tYmluZWRWYWx1ZSkgJiYgaXNPYmplY3Qoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbWJpbmVkT2JqZWN0ID0geyAuLi5jb21iaW5lZFZhbHVlIH07XG4gICAgICAgICAgICAgIC8vIElmIG5ldyBzY2hlbWEgaGFzIGFkZGl0aW9uYWxQcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICAvLyBtZXJnZSBvciByZW1vdmUgbm9uLW1hdGNoaW5nIHByb3BlcnR5IGtleXMgaW4gY29tYmluZWQgc2NoZW1hXG4gICAgICAgICAgICAgIGlmIChoYXNPd24oc2NoZW1hVmFsdWUsICdhZGRpdGlvbmFsUHJvcGVydGllcycpKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoY29tYmluZWRWYWx1ZSlcbiAgICAgICAgICAgICAgICAgIC5maWx0ZXIoY29tYmluZWRLZXkgPT4gIU9iamVjdC5rZXlzKHNjaGVtYVZhbHVlKS5pbmNsdWRlcyhjb21iaW5lZEtleSkpXG4gICAgICAgICAgICAgICAgICAuZm9yRWFjaChub25NYXRjaGluZ0tleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzY2hlbWFWYWx1ZS5hZGRpdGlvbmFsUHJvcGVydGllcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgY29tYmluZWRPYmplY3Rbbm9uTWF0Y2hpbmdLZXldO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHNjaGVtYVZhbHVlLmFkZGl0aW9uYWxQcm9wZXJ0aWVzKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W25vbk1hdGNoaW5nS2V5XSA9IG1lcmdlU2NoZW1hcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W25vbk1hdGNoaW5nS2V5XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVtYVZhbHVlLmFkZGl0aW9uYWxQcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZm9yIChjb25zdCBzdWJLZXkgb2YgT2JqZWN0LmtleXMoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKF8uaXNFcXVhbChjb21iaW5lZE9iamVjdFtzdWJLZXldLCBzY2hlbWFWYWx1ZVtzdWJLZXldKSB8fCAoXG4gICAgICAgICAgICAgICAgICAhaGFzT3duKGNvbWJpbmVkT2JqZWN0LCBzdWJLZXkpICYmXG4gICAgICAgICAgICAgICAgICAhaGFzT3duKGNvbWJpbmVkT2JqZWN0LCAnYWRkaXRpb25hbFByb3BlcnRpZXMnKVxuICAgICAgICAgICAgICAgICkpIHtcbiAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W3N1YktleV0gPSBzY2hlbWFWYWx1ZVtzdWJLZXldO1xuICAgICAgICAgICAgICAgIC8vIElmIGNvbWJpbmVkIHNjaGVtYSBoYXMgYWRkaXRpb25hbFByb3BlcnRpZXMsXG4gICAgICAgICAgICAgICAgLy8gbWVyZ2Ugb3IgaWdub3JlIG5vbi1tYXRjaGluZyBwcm9wZXJ0eSBrZXlzIGluIG5ldyBzY2hlbWFcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgIWhhc093bihjb21iaW5lZE9iamVjdCwgc3ViS2V5KSAmJlxuICAgICAgICAgICAgICAgICAgaGFzT3duKGNvbWJpbmVkT2JqZWN0LCAnYWRkaXRpb25hbFByb3BlcnRpZXMnKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgLy8gSWYgY29tYmluZWRPYmplY3QuYWRkaXRpb25hbFByb3BlcnRpZXMgPT09IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgLy8gZG8gbm90aGluZyAoZG9uJ3Qgc2V0IGtleSlcbiAgICAgICAgICAgICAgICAgIC8vIElmIGFkZGl0aW9uYWxQcm9wZXJ0aWVzIGlzIG9iamVjdCwgbWVyZ2Ugd2l0aCBuZXcga2V5XG4gICAgICAgICAgICAgICAgICBpZiAoaXNPYmplY3QoY29tYmluZWRPYmplY3QuYWRkaXRpb25hbFByb3BlcnRpZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W3N1YktleV0gPSBtZXJnZVNjaGVtYXMoXG4gICAgICAgICAgICAgICAgICAgICAgY29tYmluZWRPYmplY3QuYWRkaXRpb25hbFByb3BlcnRpZXMsIHNjaGVtYVZhbHVlW3N1YktleV1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBJZiBib3RoIGtleXMgYXJlIG9iamVjdHMsIG1lcmdlIHRoZW1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgaXNPYmplY3Qoc2NoZW1hVmFsdWVbc3ViS2V5XSkgJiZcbiAgICAgICAgICAgICAgICAgIGlzT2JqZWN0KGNvbWJpbmVkT2JqZWN0W3N1YktleV0pXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdFtzdWJLZXldID1cbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VTY2hlbWFzKGNvbWJpbmVkT2JqZWN0W3N1YktleV0sIHNjaGVtYVZhbHVlW3N1YktleV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxPZjogWyAuLi5zY2hlbWFzIF0gfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEucHJvcGVydGllcyA9IGNvbWJpbmVkT2JqZWN0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsT2Y6IFsgLi4uc2NoZW1hcyBdIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncmVxdWlyZWQnOlxuICAgICAgICAgICAgLy8gSWYgYXJyYXlzLCBpbmNsdWRlIGFsbCBpdGVtcyBmcm9tIGJvdGggYXJyYXlzLCBleGNsdWRpbmcgZHVwbGljYXRlc1xuICAgICAgICAgICAgaWYgKGlzQXJyYXkoY29tYmluZWRWYWx1ZSkgJiYgaXNBcnJheShzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEucmVxdWlyZWQgPSB1bmlxdWVJdGVtcyguLi5jb21iaW5lZFZhbHVlLCAuLi5zY2hlbWFWYWx1ZSk7XG4gICAgICAgICAgICAvLyBJZiBib29sZWFucywgYWV0IHRydWUgaWYgZWl0aGVyIHRydWVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgIHR5cGVvZiBzY2hlbWFWYWx1ZSA9PT0gJ2Jvb2xlYW4nICYmXG4gICAgICAgICAgICAgIHR5cGVvZiBjb21iaW5lZFZhbHVlID09PSAnYm9vbGVhbidcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5yZXF1aXJlZCA9ICEhY29tYmluZWRWYWx1ZSB8fCAhIXNjaGVtYVZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsT2Y6IFsgLi4uc2NoZW1hcyBdIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnJHNjaGVtYSc6IGNhc2UgJyRpZCc6IGNhc2UgJ2lkJzpcbiAgICAgICAgICAgIC8vIERvbid0IGNvbWJpbmUgdGhlc2Uga2V5c1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3RpdGxlJzogY2FzZSAnZGVzY3JpcHRpb24nOlxuICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBsYXN0IHZhbHVlLCBvdmVyd3JpdGluZyBhbnkgcHJldmlvdXMgb25lXG4gICAgICAgICAgICAvLyBUaGVzZSBwcm9wZXJ0aWVzIGFyZSBub3QgdXNlZCBmb3IgdmFsaWRhdGlvbiwgc28gY29uZmxpY3RzIGRvbid0IG1hdHRlclxuICAgICAgICAgICAgY29tYmluZWRTY2hlbWFba2V5XSA9IHNjaGVtYVZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3R5cGUnOlxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAoaXNBcnJheShzY2hlbWFWYWx1ZSkgfHwgaXNTdHJpbmcoc2NoZW1hVmFsdWUpKSAmJlxuICAgICAgICAgICAgICAoaXNBcnJheShjb21iaW5lZFZhbHVlKSB8fCBpc1N0cmluZyhjb21iaW5lZFZhbHVlKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb25zdCBjb21iaW5lZFR5cGVzID0gY29tbW9uSXRlbXMoY29tYmluZWRWYWx1ZSwgc2NoZW1hVmFsdWUpO1xuICAgICAgICAgICAgICBpZiAoIWNvbWJpbmVkVHlwZXMubGVuZ3RoKSB7IHJldHVybiB7IGFsbE9mOiBbIC4uLnNjaGVtYXMgXSB9OyB9XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLnR5cGUgPSBjb21iaW5lZFR5cGVzLmxlbmd0aCA+IDEgPyBjb21iaW5lZFR5cGVzIDogY29tYmluZWRUeXBlc1swXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IGFsbE9mOiBbIC4uLnNjaGVtYXMgXSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3VuaXF1ZUl0ZW1zJzpcbiAgICAgICAgICAgIC8vIFNldCB0cnVlIGlmIGVpdGhlciB0cnVlXG4gICAgICAgICAgICBjb21iaW5lZFNjaGVtYS51bmlxdWVJdGVtcyA9ICEhY29tYmluZWRWYWx1ZSB8fCAhIXNjaGVtYVZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4geyBhbGxPZjogWyAuLi5zY2hlbWFzIF0gfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY29tYmluZWRTY2hlbWE7XG59XG4iXX0=