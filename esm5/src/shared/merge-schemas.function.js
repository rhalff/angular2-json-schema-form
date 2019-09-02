import * as tslib_1 from "tslib";
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
export function mergeSchemas() {
    var e_1, _a, e_2, _b;
    var schemas = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        schemas[_i] = arguments[_i];
    }
    schemas = schemas.filter(function (schema) { return !isEmpty(schema); });
    if (schemas.some(function (schema) { return !isObject(schema); })) {
        return null;
    }
    var combinedSchema = {};
    try {
        for (var schemas_1 = tslib_1.__values(schemas), schemas_1_1 = schemas_1.next(); !schemas_1_1.done; schemas_1_1 = schemas_1.next()) {
            var schema = schemas_1_1.value;
            var _loop_1 = function (key) {
                var e_3, _a, e_4, _b, e_5, _c, e_6, _d;
                var combinedValue = combinedSchema[key];
                var schemaValue = schema[key];
                if (!hasOwn(combinedSchema, key) || _.isEqual(combinedValue, schemaValue)) {
                    combinedSchema[key] = schemaValue;
                }
                else {
                    switch (key) {
                        case 'allOf':
                            // Combine all items from both arrays
                            if (isArray(combinedValue) && isArray(schemaValue)) {
                                combinedSchema.allOf = mergeSchemas.apply(void 0, tslib_1.__spread(combinedValue, schemaValue));
                            }
                            else {
                                return { value: { allOf: tslib_1.__spread(schemas) } };
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
                                return { value: { allOf: tslib_1.__spread(schemas) } };
                            }
                            break;
                        case 'anyOf':
                        case 'oneOf':
                        case 'enum':
                            // Keep only items that appear in both arrays
                            if (isArray(combinedValue) && isArray(schemaValue)) {
                                combinedSchema[key] = combinedValue.filter(function (item1) {
                                    return schemaValue.findIndex(function (item2) { return _.isEqual(item1, item2); }) > -1;
                                });
                                if (!combinedSchema[key].length) {
                                    return { value: { allOf: tslib_1.__spread(schemas) } };
                                }
                            }
                            else {
                                return { value: { allOf: tslib_1.__spread(schemas) } };
                            }
                            break;
                        case 'definitions':
                            // Combine keys from both objects
                            if (isObject(combinedValue) && isObject(schemaValue)) {
                                var combinedObject = tslib_1.__assign({}, combinedValue);
                                try {
                                    for (var _e = (e_3 = void 0, tslib_1.__values(Object.keys(schemaValue))), _f = _e.next(); !_f.done; _f = _e.next()) {
                                        var subKey = _f.value;
                                        if (!hasOwn(combinedObject, subKey) ||
                                            _.isEqual(combinedObject[subKey], schemaValue[subKey])) {
                                            combinedObject[subKey] = schemaValue[subKey];
                                            // Don't combine matching keys with different values
                                        }
                                        else {
                                            return { value: { allOf: tslib_1.__spread(schemas) } };
                                        }
                                    }
                                }
                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                finally {
                                    try {
                                        if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                                    }
                                    finally { if (e_3) throw e_3.error; }
                                }
                                combinedSchema.definitions = combinedObject;
                            }
                            else {
                                return { value: { allOf: tslib_1.__spread(schemas) } };
                            }
                            break;
                        case 'dependencies':
                            // Combine all keys from both objects
                            // and merge schemas on matching keys,
                            // converting from arrays to objects if necessary
                            if (isObject(combinedValue) && isObject(schemaValue)) {
                                var combinedObject = tslib_1.__assign({}, combinedValue);
                                try {
                                    for (var _g = (e_4 = void 0, tslib_1.__values(Object.keys(schemaValue))), _h = _g.next(); !_h.done; _h = _g.next()) {
                                        var subKey = _h.value;
                                        if (!hasOwn(combinedObject, subKey) ||
                                            _.isEqual(combinedObject[subKey], schemaValue[subKey])) {
                                            combinedObject[subKey] = schemaValue[subKey];
                                            // If both keys are arrays, include all items from both arrays,
                                            // excluding duplicates
                                        }
                                        else if (isArray(schemaValue[subKey]) && isArray(combinedObject[subKey])) {
                                            combinedObject[subKey] = uniqueItems.apply(void 0, tslib_1.__spread(combinedObject[subKey], schemaValue[subKey]));
                                            // If either key is an object, merge the schemas
                                        }
                                        else if ((isArray(schemaValue[subKey]) || isObject(schemaValue[subKey])) &&
                                            (isArray(combinedObject[subKey]) || isObject(combinedObject[subKey]))) {
                                            // If either key is an array, convert it to an object first
                                            var required = isArray(combinedSchema.required) ?
                                                combinedSchema.required : [];
                                            var combinedDependency = isArray(combinedObject[subKey]) ?
                                                { required: uniqueItems.apply(void 0, tslib_1.__spread(required, [combinedObject[subKey]])) } :
                                                combinedObject[subKey];
                                            var schemaDependency = isArray(schemaValue[subKey]) ?
                                                { required: uniqueItems.apply(void 0, tslib_1.__spread(required, [schemaValue[subKey]])) } :
                                                schemaValue[subKey];
                                            combinedObject[subKey] =
                                                mergeSchemas(combinedDependency, schemaDependency);
                                        }
                                        else {
                                            return { value: { allOf: tslib_1.__spread(schemas) } };
                                        }
                                    }
                                }
                                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                finally {
                                    try {
                                        if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                                    }
                                    finally { if (e_4) throw e_4.error; }
                                }
                                combinedSchema.dependencies = combinedObject;
                            }
                            else {
                                return { value: { allOf: tslib_1.__spread(schemas) } };
                            }
                            break;
                        case 'items':
                            // If arrays, keep only items that appear in both arrays
                            if (isArray(combinedValue) && isArray(schemaValue)) {
                                combinedSchema.items = combinedValue.filter(function (item1) {
                                    return schemaValue.findIndex(function (item2) { return _.isEqual(item1, item2); }) > -1;
                                });
                                if (!combinedSchema.items.length) {
                                    return { value: { allOf: tslib_1.__spread(schemas) } };
                                }
                                // If both keys are objects, merge them
                            }
                            else if (isObject(combinedValue) && isObject(schemaValue)) {
                                combinedSchema.items = mergeSchemas(combinedValue, schemaValue);
                                // If object + array, combine object with each array item
                            }
                            else if (isArray(combinedValue) && isObject(schemaValue)) {
                                combinedSchema.items =
                                    combinedValue.map(function (item) { return mergeSchemas(item, schemaValue); });
                            }
                            else if (isObject(combinedValue) && isArray(schemaValue)) {
                                combinedSchema.items =
                                    schemaValue.map(function (item) { return mergeSchemas(item, combinedValue); });
                            }
                            else {
                                return { value: { allOf: tslib_1.__spread(schemas) } };
                            }
                            break;
                        case 'multipleOf':
                            // TODO: Adjust to correctly handle decimal values
                            // If numbers, set to least common multiple
                            if (isNumber(combinedValue) && isNumber(schemaValue)) {
                                var gcd_1 = function (x, y) { return !y ? x : gcd_1(y, x % y); };
                                var lcm = function (x, y) { return (x * y) / gcd_1(x, y); };
                                combinedSchema.multipleOf = lcm(combinedValue, schemaValue);
                            }
                            else {
                                return { value: { allOf: tslib_1.__spread(schemas) } };
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
                                return { value: { allOf: tslib_1.__spread(schemas) } };
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
                                return { value: { allOf: tslib_1.__spread(schemas) } };
                            }
                            break;
                        case 'not':
                            // Combine not values into anyOf array
                            if (isObject(combinedValue) && isObject(schemaValue)) {
                                var notAnyOf = [combinedValue, schemaValue]
                                    .reduce(function (notAnyOfArray, notSchema) {
                                    return isArray(notSchema.anyOf) &&
                                        Object.keys(notSchema).length === 1 ? tslib_1.__spread(notAnyOfArray, notSchema.anyOf) : tslib_1.__spread(notAnyOfArray, [notSchema]);
                                }, []);
                                // TODO: Remove duplicate items from array
                                combinedSchema.not = { anyOf: notAnyOf };
                            }
                            else {
                                return { value: { allOf: tslib_1.__spread(schemas) } };
                            }
                            break;
                        case 'patternProperties':
                            // Combine all keys from both objects
                            // and merge schemas on matching keys
                            if (isObject(combinedValue) && isObject(schemaValue)) {
                                var combinedObject = tslib_1.__assign({}, combinedValue);
                                try {
                                    for (var _j = (e_5 = void 0, tslib_1.__values(Object.keys(schemaValue))), _k = _j.next(); !_k.done; _k = _j.next()) {
                                        var subKey = _k.value;
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
                                            return { value: { allOf: tslib_1.__spread(schemas) } };
                                        }
                                    }
                                }
                                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                finally {
                                    try {
                                        if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                                    }
                                    finally { if (e_5) throw e_5.error; }
                                }
                                combinedSchema.patternProperties = combinedObject;
                            }
                            else {
                                return { value: { allOf: tslib_1.__spread(schemas) } };
                            }
                            break;
                        case 'properties':
                            // Combine all keys from both objects
                            // unless additionalProperties === false
                            // and merge schemas on matching keys
                            if (isObject(combinedValue) && isObject(schemaValue)) {
                                var combinedObject_1 = tslib_1.__assign({}, combinedValue);
                                // If new schema has additionalProperties,
                                // merge or remove non-matching property keys in combined schema
                                if (hasOwn(schemaValue, 'additionalProperties')) {
                                    Object.keys(combinedValue)
                                        .filter(function (combinedKey) { return !Object.keys(schemaValue).includes(combinedKey); })
                                        .forEach(function (nonMatchingKey) {
                                        if (schemaValue.additionalProperties === false) {
                                            delete combinedObject_1[nonMatchingKey];
                                        }
                                        else if (isObject(schemaValue.additionalProperties)) {
                                            combinedObject_1[nonMatchingKey] = mergeSchemas(combinedObject_1[nonMatchingKey], schemaValue.additionalProperties);
                                        }
                                    });
                                }
                                try {
                                    for (var _l = (e_6 = void 0, tslib_1.__values(Object.keys(schemaValue))), _m = _l.next(); !_m.done; _m = _l.next()) {
                                        var subKey = _m.value;
                                        if (_.isEqual(combinedObject_1[subKey], schemaValue[subKey]) || (!hasOwn(combinedObject_1, subKey) &&
                                            !hasOwn(combinedObject_1, 'additionalProperties'))) {
                                            combinedObject_1[subKey] = schemaValue[subKey];
                                            // If combined schema has additionalProperties,
                                            // merge or ignore non-matching property keys in new schema
                                        }
                                        else if (!hasOwn(combinedObject_1, subKey) &&
                                            hasOwn(combinedObject_1, 'additionalProperties')) {
                                            // If combinedObject.additionalProperties === false,
                                            // do nothing (don't set key)
                                            // If additionalProperties is object, merge with new key
                                            if (isObject(combinedObject_1.additionalProperties)) {
                                                combinedObject_1[subKey] = mergeSchemas(combinedObject_1.additionalProperties, schemaValue[subKey]);
                                            }
                                            // If both keys are objects, merge them
                                        }
                                        else if (isObject(schemaValue[subKey]) &&
                                            isObject(combinedObject_1[subKey])) {
                                            combinedObject_1[subKey] =
                                                mergeSchemas(combinedObject_1[subKey], schemaValue[subKey]);
                                        }
                                        else {
                                            return { value: { allOf: tslib_1.__spread(schemas) } };
                                        }
                                    }
                                }
                                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                                finally {
                                    try {
                                        if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                                    }
                                    finally { if (e_6) throw e_6.error; }
                                }
                                combinedSchema.properties = combinedObject_1;
                            }
                            else {
                                return { value: { allOf: tslib_1.__spread(schemas) } };
                            }
                            break;
                        case 'required':
                            // If arrays, include all items from both arrays, excluding duplicates
                            if (isArray(combinedValue) && isArray(schemaValue)) {
                                combinedSchema.required = uniqueItems.apply(void 0, tslib_1.__spread(combinedValue, schemaValue));
                                // If booleans, aet true if either true
                            }
                            else if (typeof schemaValue === 'boolean' &&
                                typeof combinedValue === 'boolean') {
                                combinedSchema.required = !!combinedValue || !!schemaValue;
                            }
                            else {
                                return { value: { allOf: tslib_1.__spread(schemas) } };
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
                                var combinedTypes = commonItems(combinedValue, schemaValue);
                                if (!combinedTypes.length) {
                                    return { value: { allOf: tslib_1.__spread(schemas) } };
                                }
                                combinedSchema.type = combinedTypes.length > 1 ? combinedTypes : combinedTypes[0];
                            }
                            else {
                                return { value: { allOf: tslib_1.__spread(schemas) } };
                            }
                            break;
                        case 'uniqueItems':
                            // Set true if either true
                            combinedSchema.uniqueItems = !!combinedValue || !!schemaValue;
                            break;
                        default: return { value: { allOf: tslib_1.__spread(schemas) } };
                    }
                }
            };
            try {
                for (var _c = (e_2 = void 0, tslib_1.__values(Object.keys(schema))), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var key = _d.value;
                    var state_1 = _loop_1(key);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (schemas_1_1 && !schemas_1_1.done && (_a = schemas_1.return)) _a.call(schemas_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return combinedSchema;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2Utc2NoZW1hcy5mdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWpzb24tc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJzcmMvc2hhcmVkL21lcmdlLXNjaGVtYXMuZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE9BQU8sRUFDTCxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUMvQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR3ZFOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sVUFBVSxZQUFZOztJQUFDLGlCQUFVO1NBQVYsVUFBVSxFQUFWLHFCQUFVLEVBQVYsSUFBVTtRQUFWLDRCQUFVOztJQUNyQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFoQixDQUFnQixDQUFDLENBQUM7SUFDckQsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQWpCLENBQWlCLENBQUMsRUFBRTtRQUFFLE9BQU8sSUFBSSxDQUFDO0tBQUU7SUFDL0QsSUFBTSxjQUFjLEdBQVEsRUFBRSxDQUFDOztRQUMvQixLQUFxQixJQUFBLFlBQUEsaUJBQUEsT0FBTyxDQUFBLGdDQUFBLHFEQUFFO1lBQXpCLElBQU0sTUFBTSxvQkFBQTtvQ0FDSixHQUFHOztnQkFDWixJQUFNLGFBQWEsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzFDLElBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDaEMsSUFB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QUFXLEdBQUcsQ0FBQyxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDOzRCQUNoRSxNQUFNO3dCQUNOLE9BQU8sQ0FBQyxpQkFDQyxFQUFFLEtBQUssbUJBQU8sT0FBTyxDQUFFLEVBQUUsR0FBQztxQkFDcEM7aUJBQ0Y7OztnQkFyU0gsS0FBa0IsSUFBQSxvQkFBQSxpQkFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUEsZ0JBQUE7b0JBQWhDLElBQU0sR0FBRyxXQUFBOzBDQUFILEdBQUc7OztpQkFzU2I7Ozs7Ozs7OztTQUNGOzs7Ozs7Ozs7SUFDRCxPQUFPLGNBQWMsQ0FBQztBQUN4QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQge1xuICBpc0FycmF5LCBpc0VtcHR5LCBpc051bWJlciwgaXNPYmplY3QsIGlzU3RyaW5nXG59IGZyb20gJy4vdmFsaWRhdG9yLmZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBoYXNPd24sIHVuaXF1ZUl0ZW1zLCBjb21tb25JdGVtcyB9IGZyb20gJy4vdXRpbGl0eS5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgSnNvblBvaW50ZXIsIFBvaW50ZXIgfSBmcm9tICcuL2pzb25wb2ludGVyLmZ1bmN0aW9ucyc7XG5cbi8qKlxuICogJ21lcmdlU2NoZW1hcycgZnVuY3Rpb25cbiAqXG4gKiBNZXJnZXMgbXVsdGlwbGUgSlNPTiBzY2hlbWFzIGludG8gYSBzaW5nbGUgc2NoZW1hIHdpdGggY29tYmluZWQgcnVsZXMuXG4gKlxuICogSWYgYWJsZSB0byBsb2dpY2FsbHkgbWVyZ2UgcHJvcGVydGllcyBmcm9tIGFsbCBzY2hlbWFzLFxuICogcmV0dXJucyBhIHNpbmdsZSBzY2hlbWEgb2JqZWN0IGNvbnRhaW5pbmcgYWxsIG1lcmdlZCBwcm9wZXJ0aWVzLlxuICpcbiAqIEV4YW1wbGU6ICh7IGE6IGIsIG1heDogMSB9LCB7IGM6IGQsIG1heDogMiB9KSA9PiB7IGE6IGIsIGM6IGQsIG1heDogMSB9XG4gKlxuICogSWYgdW5hYmxlIHRvIGxvZ2ljYWxseSBtZXJnZSwgcmV0dXJucyBhbiBhbGxPZiBzY2hlbWEgb2JqZWN0IGNvbnRhaW5pbmdcbiAqIGFuIGFycmF5IG9mIHRoZSBvcmlnaW5hbCBzY2hlbWFzO1xuICpcbiAqIEV4YW1wbGU6ICh7IGE6IGIgfSwgeyBhOiBkIH0pID0+IHsgYWxsT2Y6IFsgeyBhOiBiIH0sIHsgYTogZCB9IF0gfVxuICpcbiAqIEBwYXJhbSAgeyBhbnkgfSBzY2hlbWFzIC0gb25lIG9yIG1vcmUgaW5wdXQgc2NoZW1hc1xuICogQHJldHVybiB7IGFueSB9IC0gbWVyZ2VkIHNjaGVtYVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VTY2hlbWFzKC4uLnNjaGVtYXMpIHtcbiAgc2NoZW1hcyA9IHNjaGVtYXMuZmlsdGVyKHNjaGVtYSA9PiAhaXNFbXB0eShzY2hlbWEpKTtcbiAgaWYgKHNjaGVtYXMuc29tZShzY2hlbWEgPT4gIWlzT2JqZWN0KHNjaGVtYSkpKSB7IHJldHVybiBudWxsOyB9XG4gIGNvbnN0IGNvbWJpbmVkU2NoZW1hOiBhbnkgPSB7fTtcbiAgZm9yIChjb25zdCBzY2hlbWEgb2Ygc2NoZW1hcykge1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHNjaGVtYSkpIHtcbiAgICAgIGNvbnN0IGNvbWJpbmVkVmFsdWUgPSBjb21iaW5lZFNjaGVtYVtrZXldO1xuICAgICAgY29uc3Qgc2NoZW1hVmFsdWUgPSBzY2hlbWFba2V5XTtcbiAgICAgIGlmICghaGFzT3duKGNvbWJpbmVkU2NoZW1hLCBrZXkpIHx8IF8uaXNFcXVhbChjb21iaW5lZFZhbHVlLCBzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgY29tYmluZWRTY2hlbWFba2V5XSA9IHNjaGVtYVZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICBjYXNlICdhbGxPZic6XG4gICAgICAgICAgICAvLyBDb21iaW5lIGFsbCBpdGVtcyBmcm9tIGJvdGggYXJyYXlzXG4gICAgICAgICAgICBpZiAoaXNBcnJheShjb21iaW5lZFZhbHVlKSAmJiBpc0FycmF5KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5hbGxPZiA9IG1lcmdlU2NoZW1hcyguLi5jb21iaW5lZFZhbHVlLCAuLi5zY2hlbWFWYWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4geyBhbGxPZjogWyAuLi5zY2hlbWFzIF0gfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdhZGRpdGlvbmFsSXRlbXMnOiBjYXNlICdhZGRpdGlvbmFsUHJvcGVydGllcyc6XG4gICAgICAgICAgY2FzZSAnY29udGFpbnMnOiBjYXNlICdwcm9wZXJ0eU5hbWVzJzpcbiAgICAgICAgICAgIC8vIE1lcmdlIHNjaGVtYSBvYmplY3RzXG4gICAgICAgICAgICBpZiAoaXNPYmplY3QoY29tYmluZWRWYWx1ZSkgJiYgaXNPYmplY3Qoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hW2tleV0gPSBtZXJnZVNjaGVtYXMoY29tYmluZWRWYWx1ZSwgc2NoZW1hVmFsdWUpO1xuICAgICAgICAgICAgLy8gYWRkaXRpb25hbFByb3BlcnRpZXMgPT0gZmFsc2UgaW4gYW55IHNjaGVtYSBvdmVycmlkZXMgYWxsIG90aGVyIHZhbHVlc1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAga2V5ID09PSAnYWRkaXRpb25hbFByb3BlcnRpZXMnICYmXG4gICAgICAgICAgICAgIChjb21iaW5lZFZhbHVlID09PSBmYWxzZSB8fCBzY2hlbWFWYWx1ZSA9PT0gZmFsc2UpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEuY29tYmluZWRTY2hlbWEgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IGFsbE9mOiBbIC4uLnNjaGVtYXMgXSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2FueU9mJzogY2FzZSAnb25lT2YnOiBjYXNlICdlbnVtJzpcbiAgICAgICAgICAgIC8vIEtlZXAgb25seSBpdGVtcyB0aGF0IGFwcGVhciBpbiBib3RoIGFycmF5c1xuICAgICAgICAgICAgaWYgKGlzQXJyYXkoY29tYmluZWRWYWx1ZSkgJiYgaXNBcnJheShzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWFba2V5XSA9IGNvbWJpbmVkVmFsdWUuZmlsdGVyKGl0ZW0xID0+XG4gICAgICAgICAgICAgICAgc2NoZW1hVmFsdWUuZmluZEluZGV4KGl0ZW0yID0+IF8uaXNFcXVhbChpdGVtMSwgaXRlbTIpKSA+IC0xXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmICghY29tYmluZWRTY2hlbWFba2V5XS5sZW5ndGgpIHsgcmV0dXJuIHsgYWxsT2Y6IFsgLi4uc2NoZW1hcyBdIH07IH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IGFsbE9mOiBbIC4uLnNjaGVtYXMgXSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2RlZmluaXRpb25zJzpcbiAgICAgICAgICAgIC8vIENvbWJpbmUga2V5cyBmcm9tIGJvdGggb2JqZWN0c1xuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGNvbWJpbmVkVmFsdWUpICYmIGlzT2JqZWN0KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb25zdCBjb21iaW5lZE9iamVjdCA9IHsgLi4uY29tYmluZWRWYWx1ZSB9O1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN1YktleSBvZiBPYmplY3Qua2V5cyhzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWhhc093bihjb21iaW5lZE9iamVjdCwgc3ViS2V5KSB8fFxuICAgICAgICAgICAgICAgICAgXy5pc0VxdWFsKGNvbWJpbmVkT2JqZWN0W3N1YktleV0sIHNjaGVtYVZhbHVlW3N1YktleV0pXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdFtzdWJLZXldID0gc2NoZW1hVmFsdWVbc3ViS2V5XTtcbiAgICAgICAgICAgICAgICAvLyBEb24ndCBjb21iaW5lIG1hdGNoaW5nIGtleXMgd2l0aCBkaWZmZXJlbnQgdmFsdWVzXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbE9mOiBbIC4uLnNjaGVtYXMgXSB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5kZWZpbml0aW9ucyA9IGNvbWJpbmVkT2JqZWN0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsT2Y6IFsgLi4uc2NoZW1hcyBdIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnZGVwZW5kZW5jaWVzJzpcbiAgICAgICAgICAgIC8vIENvbWJpbmUgYWxsIGtleXMgZnJvbSBib3RoIG9iamVjdHNcbiAgICAgICAgICAgIC8vIGFuZCBtZXJnZSBzY2hlbWFzIG9uIG1hdGNoaW5nIGtleXMsXG4gICAgICAgICAgICAvLyBjb252ZXJ0aW5nIGZyb20gYXJyYXlzIHRvIG9iamVjdHMgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgICBpZiAoaXNPYmplY3QoY29tYmluZWRWYWx1ZSkgJiYgaXNPYmplY3Qoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbWJpbmVkT2JqZWN0ID0geyAuLi5jb21iaW5lZFZhbHVlIH07XG4gICAgICAgICAgICAgIGZvciAoY29uc3Qgc3ViS2V5IG9mIE9iamVjdC5rZXlzKHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICghaGFzT3duKGNvbWJpbmVkT2JqZWN0LCBzdWJLZXkpIHx8XG4gICAgICAgICAgICAgICAgICBfLmlzRXF1YWwoY29tYmluZWRPYmplY3Rbc3ViS2V5XSwgc2NoZW1hVmFsdWVbc3ViS2V5XSlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W3N1YktleV0gPSBzY2hlbWFWYWx1ZVtzdWJLZXldO1xuICAgICAgICAgICAgICAgIC8vIElmIGJvdGgga2V5cyBhcmUgYXJyYXlzLCBpbmNsdWRlIGFsbCBpdGVtcyBmcm9tIGJvdGggYXJyYXlzLFxuICAgICAgICAgICAgICAgIC8vIGV4Y2x1ZGluZyBkdXBsaWNhdGVzXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgIGlzQXJyYXkoc2NoZW1hVmFsdWVbc3ViS2V5XSkgJiYgaXNBcnJheShjb21iaW5lZE9iamVjdFtzdWJLZXldKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgY29tYmluZWRPYmplY3Rbc3ViS2V5XSA9XG4gICAgICAgICAgICAgICAgICAgIHVuaXF1ZUl0ZW1zKC4uLmNvbWJpbmVkT2JqZWN0W3N1YktleV0sIC4uLnNjaGVtYVZhbHVlW3N1YktleV0pO1xuICAgICAgICAgICAgICAgIC8vIElmIGVpdGhlciBrZXkgaXMgYW4gb2JqZWN0LCBtZXJnZSB0aGUgc2NoZW1hc1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAoaXNBcnJheShzY2hlbWFWYWx1ZVtzdWJLZXldKSB8fCBpc09iamVjdChzY2hlbWFWYWx1ZVtzdWJLZXldKSkgJiZcbiAgICAgICAgICAgICAgICAgIChpc0FycmF5KGNvbWJpbmVkT2JqZWN0W3N1YktleV0pIHx8IGlzT2JqZWN0KGNvbWJpbmVkT2JqZWN0W3N1YktleV0pKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgLy8gSWYgZWl0aGVyIGtleSBpcyBhbiBhcnJheSwgY29udmVydCBpdCB0byBhbiBvYmplY3QgZmlyc3RcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVpcmVkID0gaXNBcnJheShjb21iaW5lZFNjaGVtYS5yZXF1aXJlZCkgP1xuICAgICAgICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5yZXF1aXJlZCA6IFtdO1xuICAgICAgICAgICAgICAgICAgY29uc3QgY29tYmluZWREZXBlbmRlbmN5ID0gaXNBcnJheShjb21iaW5lZE9iamVjdFtzdWJLZXldKSA/XG4gICAgICAgICAgICAgICAgICAgIHsgcmVxdWlyZWQ6IHVuaXF1ZUl0ZW1zKC4uLnJlcXVpcmVkLCBjb21iaW5lZE9iamVjdFtzdWJLZXldKSB9IDpcbiAgICAgICAgICAgICAgICAgICAgY29tYmluZWRPYmplY3Rbc3ViS2V5XTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHNjaGVtYURlcGVuZGVuY3kgPSBpc0FycmF5KHNjaGVtYVZhbHVlW3N1YktleV0pID9cbiAgICAgICAgICAgICAgICAgICAgeyByZXF1aXJlZDogdW5pcXVlSXRlbXMoLi4ucmVxdWlyZWQsIHNjaGVtYVZhbHVlW3N1YktleV0pIH0gOlxuICAgICAgICAgICAgICAgICAgICBzY2hlbWFWYWx1ZVtzdWJLZXldO1xuICAgICAgICAgICAgICAgICAgY29tYmluZWRPYmplY3Rbc3ViS2V5XSA9XG4gICAgICAgICAgICAgICAgICAgIG1lcmdlU2NoZW1hcyhjb21iaW5lZERlcGVuZGVuY3ksIHNjaGVtYURlcGVuZGVuY3kpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxPZjogWyAuLi5zY2hlbWFzIF0gfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEuZGVwZW5kZW5jaWVzID0gY29tYmluZWRPYmplY3Q7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4geyBhbGxPZjogWyAuLi5zY2hlbWFzIF0gfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdpdGVtcyc6XG4gICAgICAgICAgICAvLyBJZiBhcnJheXMsIGtlZXAgb25seSBpdGVtcyB0aGF0IGFwcGVhciBpbiBib3RoIGFycmF5c1xuICAgICAgICAgICAgaWYgKGlzQXJyYXkoY29tYmluZWRWYWx1ZSkgJiYgaXNBcnJheShzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEuaXRlbXMgPSBjb21iaW5lZFZhbHVlLmZpbHRlcihpdGVtMSA9PlxuICAgICAgICAgICAgICAgIHNjaGVtYVZhbHVlLmZpbmRJbmRleChpdGVtMiA9PiBfLmlzRXF1YWwoaXRlbTEsIGl0ZW0yKSkgPiAtMVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBpZiAoIWNvbWJpbmVkU2NoZW1hLml0ZW1zLmxlbmd0aCkgeyByZXR1cm4geyBhbGxPZjogWyAuLi5zY2hlbWFzIF0gfTsgfVxuICAgICAgICAgICAgLy8gSWYgYm90aCBrZXlzIGFyZSBvYmplY3RzLCBtZXJnZSB0aGVtXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KGNvbWJpbmVkVmFsdWUpICYmIGlzT2JqZWN0KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5pdGVtcyA9IG1lcmdlU2NoZW1hcyhjb21iaW5lZFZhbHVlLCBzY2hlbWFWYWx1ZSk7XG4gICAgICAgICAgICAvLyBJZiBvYmplY3QgKyBhcnJheSwgY29tYmluZSBvYmplY3Qgd2l0aCBlYWNoIGFycmF5IGl0ZW1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShjb21iaW5lZFZhbHVlKSAmJiBpc09iamVjdChzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEuaXRlbXMgPVxuICAgICAgICAgICAgICAgIGNvbWJpbmVkVmFsdWUubWFwKGl0ZW0gPT4gbWVyZ2VTY2hlbWFzKGl0ZW0sIHNjaGVtYVZhbHVlKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KGNvbWJpbmVkVmFsdWUpICYmIGlzQXJyYXkoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLml0ZW1zID1cbiAgICAgICAgICAgICAgICBzY2hlbWFWYWx1ZS5tYXAoaXRlbSA9PiBtZXJnZVNjaGVtYXMoaXRlbSwgY29tYmluZWRWYWx1ZSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsT2Y6IFsgLi4uc2NoZW1hcyBdIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbXVsdGlwbGVPZic6XG4gICAgICAgICAgICAvLyBUT0RPOiBBZGp1c3QgdG8gY29ycmVjdGx5IGhhbmRsZSBkZWNpbWFsIHZhbHVlc1xuICAgICAgICAgICAgLy8gSWYgbnVtYmVycywgc2V0IHRvIGxlYXN0IGNvbW1vbiBtdWx0aXBsZVxuICAgICAgICAgICAgaWYgKGlzTnVtYmVyKGNvbWJpbmVkVmFsdWUpICYmIGlzTnVtYmVyKHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb25zdCBnY2QgPSAoeCwgeSkgPT4gIXkgPyB4IDogZ2NkKHksIHggJSB5KTtcbiAgICAgICAgICAgICAgY29uc3QgbGNtID0gKHgsIHkpID0+ICh4ICogeSkgLyBnY2QoeCwgeSk7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLm11bHRpcGxlT2YgPSBsY20oY29tYmluZWRWYWx1ZSwgc2NoZW1hVmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsT2Y6IFsgLi4uc2NoZW1hcyBdIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbWF4aW11bSc6IGNhc2UgJ2V4Y2x1c2l2ZU1heGltdW0nOiBjYXNlICdtYXhMZW5ndGgnOlxuICAgICAgICAgIGNhc2UgJ21heEl0ZW1zJzogY2FzZSAnbWF4UHJvcGVydGllcyc6XG4gICAgICAgICAgICAvLyBJZiBudW1iZXJzLCBzZXQgdG8gbG93ZXN0IHZhbHVlXG4gICAgICAgICAgICBpZiAoaXNOdW1iZXIoY29tYmluZWRWYWx1ZSkgJiYgaXNOdW1iZXIoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hW2tleV0gPSBNYXRoLm1pbihjb21iaW5lZFZhbHVlLCBzY2hlbWFWYWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4geyBhbGxPZjogWyAuLi5zY2hlbWFzIF0gfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdtaW5pbXVtJzogY2FzZSAnZXhjbHVzaXZlTWluaW11bSc6IGNhc2UgJ21pbkxlbmd0aCc6XG4gICAgICAgICAgY2FzZSAnbWluSXRlbXMnOiBjYXNlICdtaW5Qcm9wZXJ0aWVzJzpcbiAgICAgICAgICAgIC8vIElmIG51bWJlcnMsIHNldCB0byBoaWdoZXN0IHZhbHVlXG4gICAgICAgICAgICBpZiAoaXNOdW1iZXIoY29tYmluZWRWYWx1ZSkgJiYgaXNOdW1iZXIoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hW2tleV0gPSBNYXRoLm1heChjb21iaW5lZFZhbHVlLCBzY2hlbWFWYWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4geyBhbGxPZjogWyAuLi5zY2hlbWFzIF0gfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdub3QnOlxuICAgICAgICAgICAgLy8gQ29tYmluZSBub3QgdmFsdWVzIGludG8gYW55T2YgYXJyYXlcbiAgICAgICAgICAgIGlmIChpc09iamVjdChjb21iaW5lZFZhbHVlKSAmJiBpc09iamVjdChzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29uc3Qgbm90QW55T2YgPSBbY29tYmluZWRWYWx1ZSwgc2NoZW1hVmFsdWVdXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgobm90QW55T2ZBcnJheSwgbm90U2NoZW1hKSA9PlxuICAgICAgICAgICAgICAgICAgaXNBcnJheShub3RTY2hlbWEuYW55T2YpICYmXG4gICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhub3RTY2hlbWEpLmxlbmd0aCA9PT0gMSA/XG4gICAgICAgICAgICAgICAgICAgIFsgLi4ubm90QW55T2ZBcnJheSwgLi4ubm90U2NoZW1hLmFueU9mIF0gOlxuICAgICAgICAgICAgICAgICAgICBbIC4uLm5vdEFueU9mQXJyYXksIG5vdFNjaGVtYSBdXG4gICAgICAgICAgICAgICAgLCBbXSk7XG4gICAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSBkdXBsaWNhdGUgaXRlbXMgZnJvbSBhcnJheVxuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5ub3QgPSB7IGFueU9mOiBub3RBbnlPZiB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsT2Y6IFsgLi4uc2NoZW1hcyBdIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncGF0dGVyblByb3BlcnRpZXMnOlxuICAgICAgICAgICAgLy8gQ29tYmluZSBhbGwga2V5cyBmcm9tIGJvdGggb2JqZWN0c1xuICAgICAgICAgICAgLy8gYW5kIG1lcmdlIHNjaGVtYXMgb24gbWF0Y2hpbmcga2V5c1xuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGNvbWJpbmVkVmFsdWUpICYmIGlzT2JqZWN0KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb25zdCBjb21iaW5lZE9iamVjdCA9IHsgLi4uY29tYmluZWRWYWx1ZSB9O1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN1YktleSBvZiBPYmplY3Qua2V5cyhzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWhhc093bihjb21iaW5lZE9iamVjdCwgc3ViS2V5KSB8fFxuICAgICAgICAgICAgICAgICAgXy5pc0VxdWFsKGNvbWJpbmVkT2JqZWN0W3N1YktleV0sIHNjaGVtYVZhbHVlW3N1YktleV0pXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdFtzdWJLZXldID0gc2NoZW1hVmFsdWVbc3ViS2V5XTtcbiAgICAgICAgICAgICAgICAvLyBJZiBib3RoIGtleXMgYXJlIG9iamVjdHMsIG1lcmdlIHRoZW1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgaXNPYmplY3Qoc2NoZW1hVmFsdWVbc3ViS2V5XSkgJiYgaXNPYmplY3QoY29tYmluZWRPYmplY3Rbc3ViS2V5XSlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W3N1YktleV0gPVxuICAgICAgICAgICAgICAgICAgICBtZXJnZVNjaGVtYXMoY29tYmluZWRPYmplY3Rbc3ViS2V5XSwgc2NoZW1hVmFsdWVbc3ViS2V5XSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbE9mOiBbIC4uLnNjaGVtYXMgXSB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5wYXR0ZXJuUHJvcGVydGllcyA9IGNvbWJpbmVkT2JqZWN0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsT2Y6IFsgLi4uc2NoZW1hcyBdIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncHJvcGVydGllcyc6XG4gICAgICAgICAgICAvLyBDb21iaW5lIGFsbCBrZXlzIGZyb20gYm90aCBvYmplY3RzXG4gICAgICAgICAgICAvLyB1bmxlc3MgYWRkaXRpb25hbFByb3BlcnRpZXMgPT09IGZhbHNlXG4gICAgICAgICAgICAvLyBhbmQgbWVyZ2Ugc2NoZW1hcyBvbiBtYXRjaGluZyBrZXlzXG4gICAgICAgICAgICBpZiAoaXNPYmplY3QoY29tYmluZWRWYWx1ZSkgJiYgaXNPYmplY3Qoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbWJpbmVkT2JqZWN0ID0geyAuLi5jb21iaW5lZFZhbHVlIH07XG4gICAgICAgICAgICAgIC8vIElmIG5ldyBzY2hlbWEgaGFzIGFkZGl0aW9uYWxQcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICAvLyBtZXJnZSBvciByZW1vdmUgbm9uLW1hdGNoaW5nIHByb3BlcnR5IGtleXMgaW4gY29tYmluZWQgc2NoZW1hXG4gICAgICAgICAgICAgIGlmIChoYXNPd24oc2NoZW1hVmFsdWUsICdhZGRpdGlvbmFsUHJvcGVydGllcycpKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoY29tYmluZWRWYWx1ZSlcbiAgICAgICAgICAgICAgICAgIC5maWx0ZXIoY29tYmluZWRLZXkgPT4gIU9iamVjdC5rZXlzKHNjaGVtYVZhbHVlKS5pbmNsdWRlcyhjb21iaW5lZEtleSkpXG4gICAgICAgICAgICAgICAgICAuZm9yRWFjaChub25NYXRjaGluZ0tleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzY2hlbWFWYWx1ZS5hZGRpdGlvbmFsUHJvcGVydGllcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgY29tYmluZWRPYmplY3Rbbm9uTWF0Y2hpbmdLZXldO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHNjaGVtYVZhbHVlLmFkZGl0aW9uYWxQcm9wZXJ0aWVzKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W25vbk1hdGNoaW5nS2V5XSA9IG1lcmdlU2NoZW1hcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W25vbk1hdGNoaW5nS2V5XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVtYVZhbHVlLmFkZGl0aW9uYWxQcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZm9yIChjb25zdCBzdWJLZXkgb2YgT2JqZWN0LmtleXMoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKF8uaXNFcXVhbChjb21iaW5lZE9iamVjdFtzdWJLZXldLCBzY2hlbWFWYWx1ZVtzdWJLZXldKSB8fCAoXG4gICAgICAgICAgICAgICAgICAhaGFzT3duKGNvbWJpbmVkT2JqZWN0LCBzdWJLZXkpICYmXG4gICAgICAgICAgICAgICAgICAhaGFzT3duKGNvbWJpbmVkT2JqZWN0LCAnYWRkaXRpb25hbFByb3BlcnRpZXMnKVxuICAgICAgICAgICAgICAgICkpIHtcbiAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W3N1YktleV0gPSBzY2hlbWFWYWx1ZVtzdWJLZXldO1xuICAgICAgICAgICAgICAgIC8vIElmIGNvbWJpbmVkIHNjaGVtYSBoYXMgYWRkaXRpb25hbFByb3BlcnRpZXMsXG4gICAgICAgICAgICAgICAgLy8gbWVyZ2Ugb3IgaWdub3JlIG5vbi1tYXRjaGluZyBwcm9wZXJ0eSBrZXlzIGluIG5ldyBzY2hlbWFcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgIWhhc093bihjb21iaW5lZE9iamVjdCwgc3ViS2V5KSAmJlxuICAgICAgICAgICAgICAgICAgaGFzT3duKGNvbWJpbmVkT2JqZWN0LCAnYWRkaXRpb25hbFByb3BlcnRpZXMnKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgLy8gSWYgY29tYmluZWRPYmplY3QuYWRkaXRpb25hbFByb3BlcnRpZXMgPT09IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgLy8gZG8gbm90aGluZyAoZG9uJ3Qgc2V0IGtleSlcbiAgICAgICAgICAgICAgICAgIC8vIElmIGFkZGl0aW9uYWxQcm9wZXJ0aWVzIGlzIG9iamVjdCwgbWVyZ2Ugd2l0aCBuZXcga2V5XG4gICAgICAgICAgICAgICAgICBpZiAoaXNPYmplY3QoY29tYmluZWRPYmplY3QuYWRkaXRpb25hbFByb3BlcnRpZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W3N1YktleV0gPSBtZXJnZVNjaGVtYXMoXG4gICAgICAgICAgICAgICAgICAgICAgY29tYmluZWRPYmplY3QuYWRkaXRpb25hbFByb3BlcnRpZXMsIHNjaGVtYVZhbHVlW3N1YktleV1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBJZiBib3RoIGtleXMgYXJlIG9iamVjdHMsIG1lcmdlIHRoZW1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgaXNPYmplY3Qoc2NoZW1hVmFsdWVbc3ViS2V5XSkgJiZcbiAgICAgICAgICAgICAgICAgIGlzT2JqZWN0KGNvbWJpbmVkT2JqZWN0W3N1YktleV0pXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdFtzdWJLZXldID1cbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VTY2hlbWFzKGNvbWJpbmVkT2JqZWN0W3N1YktleV0sIHNjaGVtYVZhbHVlW3N1YktleV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxPZjogWyAuLi5zY2hlbWFzIF0gfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEucHJvcGVydGllcyA9IGNvbWJpbmVkT2JqZWN0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsT2Y6IFsgLi4uc2NoZW1hcyBdIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncmVxdWlyZWQnOlxuICAgICAgICAgICAgLy8gSWYgYXJyYXlzLCBpbmNsdWRlIGFsbCBpdGVtcyBmcm9tIGJvdGggYXJyYXlzLCBleGNsdWRpbmcgZHVwbGljYXRlc1xuICAgICAgICAgICAgaWYgKGlzQXJyYXkoY29tYmluZWRWYWx1ZSkgJiYgaXNBcnJheShzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEucmVxdWlyZWQgPSB1bmlxdWVJdGVtcyguLi5jb21iaW5lZFZhbHVlLCAuLi5zY2hlbWFWYWx1ZSk7XG4gICAgICAgICAgICAvLyBJZiBib29sZWFucywgYWV0IHRydWUgaWYgZWl0aGVyIHRydWVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgIHR5cGVvZiBzY2hlbWFWYWx1ZSA9PT0gJ2Jvb2xlYW4nICYmXG4gICAgICAgICAgICAgIHR5cGVvZiBjb21iaW5lZFZhbHVlID09PSAnYm9vbGVhbidcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5yZXF1aXJlZCA9ICEhY29tYmluZWRWYWx1ZSB8fCAhIXNjaGVtYVZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsT2Y6IFsgLi4uc2NoZW1hcyBdIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnJHNjaGVtYSc6IGNhc2UgJyRpZCc6IGNhc2UgJ2lkJzpcbiAgICAgICAgICAgIC8vIERvbid0IGNvbWJpbmUgdGhlc2Uga2V5c1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3RpdGxlJzogY2FzZSAnZGVzY3JpcHRpb24nOlxuICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBsYXN0IHZhbHVlLCBvdmVyd3JpdGluZyBhbnkgcHJldmlvdXMgb25lXG4gICAgICAgICAgICAvLyBUaGVzZSBwcm9wZXJ0aWVzIGFyZSBub3QgdXNlZCBmb3IgdmFsaWRhdGlvbiwgc28gY29uZmxpY3RzIGRvbid0IG1hdHRlclxuICAgICAgICAgICAgY29tYmluZWRTY2hlbWFba2V5XSA9IHNjaGVtYVZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3R5cGUnOlxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAoaXNBcnJheShzY2hlbWFWYWx1ZSkgfHwgaXNTdHJpbmcoc2NoZW1hVmFsdWUpKSAmJlxuICAgICAgICAgICAgICAoaXNBcnJheShjb21iaW5lZFZhbHVlKSB8fCBpc1N0cmluZyhjb21iaW5lZFZhbHVlKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb25zdCBjb21iaW5lZFR5cGVzID0gY29tbW9uSXRlbXMoY29tYmluZWRWYWx1ZSwgc2NoZW1hVmFsdWUpO1xuICAgICAgICAgICAgICBpZiAoIWNvbWJpbmVkVHlwZXMubGVuZ3RoKSB7IHJldHVybiB7IGFsbE9mOiBbIC4uLnNjaGVtYXMgXSB9OyB9XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLnR5cGUgPSBjb21iaW5lZFR5cGVzLmxlbmd0aCA+IDEgPyBjb21iaW5lZFR5cGVzIDogY29tYmluZWRUeXBlc1swXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IGFsbE9mOiBbIC4uLnNjaGVtYXMgXSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3VuaXF1ZUl0ZW1zJzpcbiAgICAgICAgICAgIC8vIFNldCB0cnVlIGlmIGVpdGhlciB0cnVlXG4gICAgICAgICAgICBjb21iaW5lZFNjaGVtYS51bmlxdWVJdGVtcyA9ICEhY29tYmluZWRWYWx1ZSB8fCAhIXNjaGVtYVZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4geyBhbGxPZjogWyAuLi5zY2hlbWFzIF0gfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY29tYmluZWRTY2hlbWE7XG59XG4iXX0=