var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { isArray, isEmpty, isNumber, isObject, isString } from '../validator';
import { commonItems, hasOwn, uniqueItems } from '../utility';
import * as _ from 'lodash';
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
        for (var schemas_1 = __values(schemas), schemas_1_1 = schemas_1.next(); !schemas_1_1.done; schemas_1_1 = schemas_1.next()) {
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
                            if (isArray(combinedValue) && isArray(schemaValue)) {
                                combinedSchema.allOf = mergeSchemas.apply(void 0, __spread(combinedValue, schemaValue));
                            }
                            else {
                                return { value: { allOf: __spread(schemas) } };
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
                                return { value: { allOf: __spread(schemas) } };
                            }
                            break;
                        case 'anyOf':
                        case 'oneOf':
                        case 'enum':
                            if (isArray(combinedValue) && isArray(schemaValue)) {
                                combinedSchema[key] = combinedValue.filter(function (item1) {
                                    return schemaValue.findIndex(function (item2) { return _.isEqual(item1, item2); }) > -1;
                                });
                                if (!combinedSchema[key].length) {
                                    return { value: { allOf: __spread(schemas) } };
                                }
                            }
                            else {
                                return { value: { allOf: __spread(schemas) } };
                            }
                            break;
                        case 'definitions':
                            if (isObject(combinedValue) && isObject(schemaValue)) {
                                var combinedObject = __assign({}, combinedValue);
                                try {
                                    for (var _e = (e_3 = void 0, __values(Object.keys(schemaValue))), _f = _e.next(); !_f.done; _f = _e.next()) {
                                        var subKey = _f.value;
                                        if (!hasOwn(combinedObject, subKey) ||
                                            _.isEqual(combinedObject[subKey], schemaValue[subKey])) {
                                            combinedObject[subKey] = schemaValue[subKey];
                                        }
                                        else {
                                            return { value: { allOf: __spread(schemas) } };
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
                                return { value: { allOf: __spread(schemas) } };
                            }
                            break;
                        case 'dependencies':
                            if (isObject(combinedValue) && isObject(schemaValue)) {
                                var combinedObject = __assign({}, combinedValue);
                                try {
                                    for (var _g = (e_4 = void 0, __values(Object.keys(schemaValue))), _h = _g.next(); !_h.done; _h = _g.next()) {
                                        var subKey = _h.value;
                                        if (!hasOwn(combinedObject, subKey) ||
                                            _.isEqual(combinedObject[subKey], schemaValue[subKey])) {
                                            combinedObject[subKey] = schemaValue[subKey];
                                        }
                                        else if (isArray(schemaValue[subKey]) && isArray(combinedObject[subKey])) {
                                            combinedObject[subKey] = uniqueItems.apply(void 0, __spread(combinedObject[subKey], schemaValue[subKey]));
                                        }
                                        else if ((isArray(schemaValue[subKey]) || isObject(schemaValue[subKey])) &&
                                            (isArray(combinedObject[subKey]) || isObject(combinedObject[subKey]))) {
                                            var required = isArray(combinedSchema.required) ?
                                                combinedSchema.required : [];
                                            var combinedDependency = isArray(combinedObject[subKey]) ?
                                                { required: uniqueItems.apply(void 0, __spread(required, [combinedObject[subKey]])) } :
                                                combinedObject[subKey];
                                            var schemaDependency = isArray(schemaValue[subKey]) ?
                                                { required: uniqueItems.apply(void 0, __spread(required, [schemaValue[subKey]])) } :
                                                schemaValue[subKey];
                                            combinedObject[subKey] =
                                                mergeSchemas(combinedDependency, schemaDependency);
                                        }
                                        else {
                                            return { value: { allOf: __spread(schemas) } };
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
                                return { value: { allOf: __spread(schemas) } };
                            }
                            break;
                        case 'items':
                            if (isArray(combinedValue) && isArray(schemaValue)) {
                                combinedSchema.items = combinedValue.filter(function (item1) {
                                    return schemaValue.findIndex(function (item2) { return _.isEqual(item1, item2); }) > -1;
                                });
                                if (!combinedSchema.items.length) {
                                    return { value: { allOf: __spread(schemas) } };
                                }
                            }
                            else if (isObject(combinedValue) && isObject(schemaValue)) {
                                combinedSchema.items = mergeSchemas(combinedValue, schemaValue);
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
                                return { value: { allOf: __spread(schemas) } };
                            }
                            break;
                        case 'multipleOf':
                            if (isNumber(combinedValue) && isNumber(schemaValue)) {
                                var gcd_1 = function (x, y) { return !y ? x : gcd_1(y, x % y); };
                                var lcm = function (x, y) { return (x * y) / gcd_1(x, y); };
                                combinedSchema.multipleOf = lcm(combinedValue, schemaValue);
                            }
                            else {
                                return { value: { allOf: __spread(schemas) } };
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
                                return { value: { allOf: __spread(schemas) } };
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
                                return { value: { allOf: __spread(schemas) } };
                            }
                            break;
                        case 'not':
                            if (isObject(combinedValue) && isObject(schemaValue)) {
                                var notAnyOf = [combinedValue, schemaValue]
                                    .reduce(function (notAnyOfArray, notSchema) {
                                    return isArray(notSchema.anyOf) &&
                                        Object.keys(notSchema).length === 1 ? __spread(notAnyOfArray, notSchema.anyOf) : __spread(notAnyOfArray, [notSchema]);
                                }, []);
                                combinedSchema.not = { anyOf: notAnyOf };
                            }
                            else {
                                return { value: { allOf: __spread(schemas) } };
                            }
                            break;
                        case 'patternProperties':
                            if (isObject(combinedValue) && isObject(schemaValue)) {
                                var combinedObject = __assign({}, combinedValue);
                                try {
                                    for (var _j = (e_5 = void 0, __values(Object.keys(schemaValue))), _k = _j.next(); !_k.done; _k = _j.next()) {
                                        var subKey = _k.value;
                                        if (!hasOwn(combinedObject, subKey) ||
                                            _.isEqual(combinedObject[subKey], schemaValue[subKey])) {
                                            combinedObject[subKey] = schemaValue[subKey];
                                        }
                                        else if (isObject(schemaValue[subKey]) && isObject(combinedObject[subKey])) {
                                            combinedObject[subKey] =
                                                mergeSchemas(combinedObject[subKey], schemaValue[subKey]);
                                        }
                                        else {
                                            return { value: { allOf: __spread(schemas) } };
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
                                return { value: { allOf: __spread(schemas) } };
                            }
                            break;
                        case 'properties':
                            if (isObject(combinedValue) && isObject(schemaValue)) {
                                var combinedObject_1 = __assign({}, combinedValue);
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
                                    for (var _l = (e_6 = void 0, __values(Object.keys(schemaValue))), _m = _l.next(); !_m.done; _m = _l.next()) {
                                        var subKey = _m.value;
                                        if (_.isEqual(combinedObject_1[subKey], schemaValue[subKey]) || (!hasOwn(combinedObject_1, subKey) &&
                                            !hasOwn(combinedObject_1, 'additionalProperties'))) {
                                            combinedObject_1[subKey] = schemaValue[subKey];
                                        }
                                        else if (!hasOwn(combinedObject_1, subKey) &&
                                            hasOwn(combinedObject_1, 'additionalProperties')) {
                                            if (isObject(combinedObject_1.additionalProperties)) {
                                                combinedObject_1[subKey] = mergeSchemas(combinedObject_1.additionalProperties, schemaValue[subKey]);
                                            }
                                        }
                                        else if (isObject(schemaValue[subKey]) &&
                                            isObject(combinedObject_1[subKey])) {
                                            combinedObject_1[subKey] =
                                                mergeSchemas(combinedObject_1[subKey], schemaValue[subKey]);
                                        }
                                        else {
                                            return { value: { allOf: __spread(schemas) } };
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
                                return { value: { allOf: __spread(schemas) } };
                            }
                            break;
                        case 'required':
                            if (isArray(combinedValue) && isArray(schemaValue)) {
                                combinedSchema.required = uniqueItems.apply(void 0, __spread(combinedValue, schemaValue));
                            }
                            else if (typeof schemaValue === 'boolean' &&
                                typeof combinedValue === 'boolean') {
                                combinedSchema.required = !!combinedValue || !!schemaValue;
                            }
                            else {
                                return { value: { allOf: __spread(schemas) } };
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
                                var combinedTypes = commonItems(combinedValue, schemaValue);
                                if (!combinedTypes.length) {
                                    return { value: { allOf: __spread(schemas) } };
                                }
                                combinedSchema.type = combinedTypes.length > 1 ? combinedTypes : combinedTypes[0];
                            }
                            else {
                                return { value: { allOf: __spread(schemas) } };
                            }
                            break;
                        case 'uniqueItems':
                            combinedSchema.uniqueItems = !!combinedValue || !!schemaValue;
                            break;
                        default: return { value: { allOf: __spread(schemas) } };
                    }
                }
            };
            try {
                for (var _c = (e_2 = void 0, __values(Object.keys(schema))), _d = _c.next(); !_d.done; _d = _c.next()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VTY2hlbWFzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nc2YvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2Z1bmN0aW9ucy9tZXJnZS1zY2hlbWFzL21lcmdlU2NoZW1hcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUMzRSxPQUFPLEVBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUMsTUFBTSxZQUFZLENBQUE7QUFDM0QsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUE7QUFvQjNCLE1BQU0sVUFBVSxZQUFZOztJQUFDLGlCQUFlO1NBQWYsVUFBZSxFQUFmLHFCQUFlLEVBQWYsSUFBZTtRQUFmLDRCQUFlOztJQUMxQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFoQixDQUFnQixDQUFDLENBQUE7SUFDcEQsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQWpCLENBQWlCLENBQUMsRUFBRTtRQUM3QyxPQUFPLElBQUksQ0FBQTtLQUNaO0lBQ0QsSUFBTSxjQUFjLEdBQVEsRUFBRSxDQUFBOztRQUM5QixLQUFxQixJQUFBLFlBQUEsU0FBQSxPQUFPLENBQUEsZ0NBQUEscURBQUU7WUFBekIsSUFBTSxNQUFNLG9CQUFBO29DQUNKLEdBQUc7O2dCQUNaLElBQU0sYUFBYSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDekMsSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUMvQixJQUFJLENBQUMs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QUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRTtvREFDbEIsRUFBQyxLQUFLLFdBQU0sT0FBTyxDQUFDLEVBQUM7aUNBQzdCO2dDQUNELGNBQWMsQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFBOzZCQUNsRjtpQ0FBTTtnREFDRSxFQUFDLEtBQUssV0FBTSxPQUFPLENBQUMsRUFBQzs2QkFDN0I7NEJBQ0QsTUFBSzt3QkFDUCxLQUFLLGFBQWE7NEJBRWhCLGNBQWMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFBOzRCQUM3RCxNQUFLO3dCQUNQLE9BQU8sQ0FBQyxpQkFDQyxFQUFDLEtBQUssV0FBTSxPQUFPLENBQUMsRUFBQyxHQUFBO3FCQUMvQjtpQkFDRjs7O2dCQXhUSCxLQUFrQixJQUFBLG9CQUFBLFNBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFBLGdCQUFBO29CQUFoQyxJQUFNLEdBQUcsV0FBQTswQ0FBSCxHQUFHOzs7aUJBeVRiOzs7Ozs7Ozs7U0FDRjs7Ozs7Ozs7O0lBQ0QsT0FBTyxjQUFjLENBQUE7QUFDdkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNBcnJheSwgaXNFbXB0eSwgaXNOdW1iZXIsIGlzT2JqZWN0LCBpc1N0cmluZ30gZnJvbSAnLi4vdmFsaWRhdG9yJ1xuaW1wb3J0IHtjb21tb25JdGVtcywgaGFzT3duLCB1bmlxdWVJdGVtc30gZnJvbSAnLi4vdXRpbGl0eSdcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJ1xuXG4vKipcbiAqICdtZXJnZVNjaGVtYXMnIGZ1bmN0aW9uXG4gKlxuICogTWVyZ2VzIG11bHRpcGxlIEpTT04gc2NoZW1hcyBpbnRvIGEgc2luZ2xlIHNjaGVtYSB3aXRoIGNvbWJpbmVkIHJ1bGVzLlxuICpcbiAqIElmIGFibGUgdG8gbG9naWNhbGx5IG1lcmdlIHByb3BlcnRpZXMgZnJvbSBhbGwgc2NoZW1hcyxcbiAqIHJldHVybnMgYSBzaW5nbGUgc2NoZW1hIG9iamVjdCBjb250YWluaW5nIGFsbCBtZXJnZWQgcHJvcGVydGllcy5cbiAqXG4gKiBFeGFtcGxlOiAoeyBhOiBiLCBtYXg6IDEgfSwgeyBjOiBkLCBtYXg6IDIgfSkgPT4geyBhOiBiLCBjOiBkLCBtYXg6IDEgfVxuICpcbiAqIElmIHVuYWJsZSB0byBsb2dpY2FsbHkgbWVyZ2UsIHJldHVybnMgYW4gYWxsT2Ygc2NoZW1hIG9iamVjdCBjb250YWluaW5nXG4gKiBhbiBhcnJheSBvZiB0aGUgb3JpZ2luYWwgc2NoZW1hcztcbiAqXG4gKiBFeGFtcGxlOiAoeyBhOiBiIH0sIHsgYTogZCB9KSA9PiB7IGFsbE9mOiBbIHsgYTogYiB9LCB7IGE6IGQgfSBdIH1cbiAqXG4gKiBAcGFyYW0gc2NoZW1hcyAtIG9uZSBvciBtb3JlIGlucHV0IHNjaGVtYXNcbiAqIEByZXR1cm4gbWVyZ2VkIHNjaGVtYVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VTY2hlbWFzKC4uLnNjaGVtYXM6IGFueSkge1xuICBzY2hlbWFzID0gc2NoZW1hcy5maWx0ZXIoc2NoZW1hID0+ICFpc0VtcHR5KHNjaGVtYSkpXG4gIGlmIChzY2hlbWFzLnNvbWUoc2NoZW1hID0+ICFpc09iamVjdChzY2hlbWEpKSkge1xuICAgIHJldHVybiBudWxsXG4gIH1cbiAgY29uc3QgY29tYmluZWRTY2hlbWE6IGFueSA9IHt9XG4gIGZvciAoY29uc3Qgc2NoZW1hIG9mIHNjaGVtYXMpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhzY2hlbWEpKSB7XG4gICAgICBjb25zdCBjb21iaW5lZFZhbHVlID0gY29tYmluZWRTY2hlbWFba2V5XVxuICAgICAgY29uc3Qgc2NoZW1hVmFsdWUgPSBzY2hlbWFba2V5XVxuICAgICAgaWYgKCFoYXNPd24oY29tYmluZWRTY2hlbWEsIGtleSkgfHwgXy5pc0VxdWFsKGNvbWJpbmVkVmFsdWUsIHNjaGVtYVZhbHVlKSkge1xuICAgICAgICBjb21iaW5lZFNjaGVtYVtrZXldID0gc2NoZW1hVmFsdWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgY2FzZSAnYWxsT2YnOlxuICAgICAgICAgICAgLy8gQ29tYmluZSBhbGwgaXRlbXMgZnJvbSBib3RoIGFycmF5c1xuICAgICAgICAgICAgaWYgKGlzQXJyYXkoY29tYmluZWRWYWx1ZSkgJiYgaXNBcnJheShzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEuYWxsT2YgPSBtZXJnZVNjaGVtYXMoLi4uY29tYmluZWRWYWx1ZSwgLi4uc2NoZW1hVmFsdWUpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ2FkZGl0aW9uYWxJdGVtcyc6XG4gICAgICAgICAgY2FzZSAnYWRkaXRpb25hbFByb3BlcnRpZXMnOlxuICAgICAgICAgIGNhc2UgJ2NvbnRhaW5zJzpcbiAgICAgICAgICBjYXNlICdwcm9wZXJ0eU5hbWVzJzpcbiAgICAgICAgICAgIC8vIE1lcmdlIHNjaGVtYSBvYmplY3RzXG4gICAgICAgICAgICBpZiAoaXNPYmplY3QoY29tYmluZWRWYWx1ZSkgJiYgaXNPYmplY3Qoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hW2tleV0gPSBtZXJnZVNjaGVtYXMoY29tYmluZWRWYWx1ZSwgc2NoZW1hVmFsdWUpXG4gICAgICAgICAgICAgIC8vIGFkZGl0aW9uYWxQcm9wZXJ0aWVzID09IGZhbHNlIGluIGFueSBzY2hlbWEgb3ZlcnJpZGVzIGFsbCBvdGhlciB2YWx1ZXNcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgIGtleSA9PT0gJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJyAmJlxuICAgICAgICAgICAgICAoY29tYmluZWRWYWx1ZSA9PT0gZmFsc2UgfHwgc2NoZW1hVmFsdWUgPT09IGZhbHNlKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLmNvbWJpbmVkU2NoZW1hID0gZmFsc2VcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnYW55T2YnOlxuICAgICAgICAgIGNhc2UgJ29uZU9mJzpcbiAgICAgICAgICBjYXNlICdlbnVtJzpcbiAgICAgICAgICAgIC8vIEtlZXAgb25seSBpdGVtcyB0aGF0IGFwcGVhciBpbiBib3RoIGFycmF5c1xuICAgICAgICAgICAgaWYgKGlzQXJyYXkoY29tYmluZWRWYWx1ZSkgJiYgaXNBcnJheShzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWFba2V5XSA9IGNvbWJpbmVkVmFsdWUuZmlsdGVyKGl0ZW0xID0+XG4gICAgICAgICAgICAgICAgc2NoZW1hVmFsdWUuZmluZEluZGV4KGl0ZW0yID0+IF8uaXNFcXVhbChpdGVtMSwgaXRlbTIpKSA+IC0xXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgaWYgKCFjb21iaW5lZFNjaGVtYVtrZXldLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdkZWZpbml0aW9ucyc6XG4gICAgICAgICAgICAvLyBDb21iaW5lIGtleXMgZnJvbSBib3RoIG9iamVjdHNcbiAgICAgICAgICAgIGlmIChpc09iamVjdChjb21iaW5lZFZhbHVlKSAmJiBpc09iamVjdChzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29uc3QgY29tYmluZWRPYmplY3QgPSB7Li4uY29tYmluZWRWYWx1ZX1cbiAgICAgICAgICAgICAgZm9yIChjb25zdCBzdWJLZXkgb2YgT2JqZWN0LmtleXMoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFoYXNPd24oY29tYmluZWRPYmplY3QsIHN1YktleSkgfHxcbiAgICAgICAgICAgICAgICAgIF8uaXNFcXVhbChjb21iaW5lZE9iamVjdFtzdWJLZXldLCBzY2hlbWFWYWx1ZVtzdWJLZXldKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgY29tYmluZWRPYmplY3Rbc3ViS2V5XSA9IHNjaGVtYVZhbHVlW3N1YktleV1cbiAgICAgICAgICAgICAgICAgIC8vIERvbid0IGNvbWJpbmUgbWF0Y2hpbmcga2V5cyB3aXRoIGRpZmZlcmVudCB2YWx1ZXNcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5kZWZpbml0aW9ucyA9IGNvbWJpbmVkT2JqZWN0XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ2RlcGVuZGVuY2llcyc6XG4gICAgICAgICAgICAvLyBDb21iaW5lIGFsbCBrZXlzIGZyb20gYm90aCBvYmplY3RzXG4gICAgICAgICAgICAvLyBhbmQgbWVyZ2Ugc2NoZW1hcyBvbiBtYXRjaGluZyBrZXlzLFxuICAgICAgICAgICAgLy8gY29udmVydGluZyBmcm9tIGFycmF5cyB0byBvYmplY3RzIGlmIG5lY2Vzc2FyeVxuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGNvbWJpbmVkVmFsdWUpICYmIGlzT2JqZWN0KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb25zdCBjb21iaW5lZE9iamVjdCA9IHsuLi5jb21iaW5lZFZhbHVlfVxuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN1YktleSBvZiBPYmplY3Qua2V5cyhzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWhhc093bihjb21iaW5lZE9iamVjdCwgc3ViS2V5KSB8fFxuICAgICAgICAgICAgICAgICAgXy5pc0VxdWFsKGNvbWJpbmVkT2JqZWN0W3N1YktleV0sIHNjaGVtYVZhbHVlW3N1YktleV0pXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdFtzdWJLZXldID0gc2NoZW1hVmFsdWVbc3ViS2V5XVxuICAgICAgICAgICAgICAgICAgLy8gSWYgYm90aCBrZXlzIGFyZSBhcnJheXMsIGluY2x1ZGUgYWxsIGl0ZW1zIGZyb20gYm90aCBhcnJheXMsXG4gICAgICAgICAgICAgICAgICAvLyBleGNsdWRpbmcgZHVwbGljYXRlc1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICBpc0FycmF5KHNjaGVtYVZhbHVlW3N1YktleV0pICYmIGlzQXJyYXkoY29tYmluZWRPYmplY3Rbc3ViS2V5XSlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W3N1YktleV0gPVxuICAgICAgICAgICAgICAgICAgICB1bmlxdWVJdGVtcyguLi5jb21iaW5lZE9iamVjdFtzdWJLZXldLCAuLi5zY2hlbWFWYWx1ZVtzdWJLZXldKVxuICAgICAgICAgICAgICAgICAgLy8gSWYgZWl0aGVyIGtleSBpcyBhbiBvYmplY3QsIG1lcmdlIHRoZSBzY2hlbWFzXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgIChpc0FycmF5KHNjaGVtYVZhbHVlW3N1YktleV0pIHx8IGlzT2JqZWN0KHNjaGVtYVZhbHVlW3N1YktleV0pKSAmJlxuICAgICAgICAgICAgICAgICAgKGlzQXJyYXkoY29tYmluZWRPYmplY3Rbc3ViS2V5XSkgfHwgaXNPYmplY3QoY29tYmluZWRPYmplY3Rbc3ViS2V5XSkpXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAvLyBJZiBlaXRoZXIga2V5IGlzIGFuIGFycmF5LCBjb252ZXJ0IGl0IHRvIGFuIG9iamVjdCBmaXJzdFxuICAgICAgICAgICAgICAgICAgY29uc3QgcmVxdWlyZWQgPSBpc0FycmF5KGNvbWJpbmVkU2NoZW1hLnJlcXVpcmVkKSA/XG4gICAgICAgICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLnJlcXVpcmVkIDogW11cbiAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbWJpbmVkRGVwZW5kZW5jeSA9IGlzQXJyYXkoY29tYmluZWRPYmplY3Rbc3ViS2V5XSkgP1xuICAgICAgICAgICAgICAgICAgICB7cmVxdWlyZWQ6IHVuaXF1ZUl0ZW1zKC4uLnJlcXVpcmVkLCBjb21iaW5lZE9iamVjdFtzdWJLZXldKX0gOlxuICAgICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdFtzdWJLZXldXG4gICAgICAgICAgICAgICAgICBjb25zdCBzY2hlbWFEZXBlbmRlbmN5ID0gaXNBcnJheShzY2hlbWFWYWx1ZVtzdWJLZXldKSA/XG4gICAgICAgICAgICAgICAgICAgIHtyZXF1aXJlZDogdW5pcXVlSXRlbXMoLi4ucmVxdWlyZWQsIHNjaGVtYVZhbHVlW3N1YktleV0pfSA6XG4gICAgICAgICAgICAgICAgICAgIHNjaGVtYVZhbHVlW3N1YktleV1cbiAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W3N1YktleV0gPVxuICAgICAgICAgICAgICAgICAgICBtZXJnZVNjaGVtYXMoY29tYmluZWREZXBlbmRlbmN5LCBzY2hlbWFEZXBlbmRlbmN5KVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLmRlcGVuZGVuY2llcyA9IGNvbWJpbmVkT2JqZWN0XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ2l0ZW1zJzpcbiAgICAgICAgICAgIC8vIElmIGFycmF5cywga2VlcCBvbmx5IGl0ZW1zIHRoYXQgYXBwZWFyIGluIGJvdGggYXJyYXlzXG4gICAgICAgICAgICBpZiAoaXNBcnJheShjb21iaW5lZFZhbHVlKSAmJiBpc0FycmF5KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5pdGVtcyA9IGNvbWJpbmVkVmFsdWUuZmlsdGVyKGl0ZW0xID0+XG4gICAgICAgICAgICAgICAgc2NoZW1hVmFsdWUuZmluZEluZGV4KGl0ZW0yID0+IF8uaXNFcXVhbChpdGVtMSwgaXRlbTIpKSA+IC0xXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgaWYgKCFjb21iaW5lZFNjaGVtYS5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gSWYgYm90aCBrZXlzIGFyZSBvYmplY3RzLCBtZXJnZSB0aGVtXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KGNvbWJpbmVkVmFsdWUpICYmIGlzT2JqZWN0KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5pdGVtcyA9IG1lcmdlU2NoZW1hcyhjb21iaW5lZFZhbHVlLCBzY2hlbWFWYWx1ZSlcbiAgICAgICAgICAgICAgLy8gSWYgb2JqZWN0ICsgYXJyYXksIGNvbWJpbmUgb2JqZWN0IHdpdGggZWFjaCBhcnJheSBpdGVtXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoY29tYmluZWRWYWx1ZSkgJiYgaXNPYmplY3Qoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLml0ZW1zID1cbiAgICAgICAgICAgICAgICBjb21iaW5lZFZhbHVlLm1hcChpdGVtID0+IG1lcmdlU2NoZW1hcyhpdGVtLCBzY2hlbWFWYWx1ZSkpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KGNvbWJpbmVkVmFsdWUpICYmIGlzQXJyYXkoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLml0ZW1zID1cbiAgICAgICAgICAgICAgICBzY2hlbWFWYWx1ZS5tYXAoaXRlbSA9PiBtZXJnZVNjaGVtYXMoaXRlbSwgY29tYmluZWRWYWx1ZSkpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ211bHRpcGxlT2YnOlxuICAgICAgICAgICAgLy8gVE9ETzogQWRqdXN0IHRvIGNvcnJlY3RseSBoYW5kbGUgZGVjaW1hbCB2YWx1ZXNcbiAgICAgICAgICAgIC8vIElmIG51bWJlcnMsIHNldCB0byBsZWFzdCBjb21tb24gbXVsdGlwbGVcbiAgICAgICAgICAgIGlmIChpc051bWJlcihjb21iaW5lZFZhbHVlKSAmJiBpc051bWJlcihzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29uc3QgZ2NkID0gKHgsIHkpID0+ICF5ID8geCA6IGdjZCh5LCB4ICUgeSlcbiAgICAgICAgICAgICAgY29uc3QgbGNtID0gKHgsIHkpID0+ICh4ICogeSkgLyBnY2QoeCwgeSlcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEubXVsdGlwbGVPZiA9IGxjbShjb21iaW5lZFZhbHVlLCBzY2hlbWFWYWx1ZSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnbWF4aW11bSc6XG4gICAgICAgICAgY2FzZSAnZXhjbHVzaXZlTWF4aW11bSc6XG4gICAgICAgICAgY2FzZSAnbWF4TGVuZ3RoJzpcbiAgICAgICAgICBjYXNlICdtYXhJdGVtcyc6XG4gICAgICAgICAgY2FzZSAnbWF4UHJvcGVydGllcyc6XG4gICAgICAgICAgICAvLyBJZiBudW1iZXJzLCBzZXQgdG8gbG93ZXN0IHZhbHVlXG4gICAgICAgICAgICBpZiAoaXNOdW1iZXIoY29tYmluZWRWYWx1ZSkgJiYgaXNOdW1iZXIoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hW2tleV0gPSBNYXRoLm1pbihjb21iaW5lZFZhbHVlLCBzY2hlbWFWYWx1ZSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnbWluaW11bSc6XG4gICAgICAgICAgY2FzZSAnZXhjbHVzaXZlTWluaW11bSc6XG4gICAgICAgICAgY2FzZSAnbWluTGVuZ3RoJzpcbiAgICAgICAgICBjYXNlICdtaW5JdGVtcyc6XG4gICAgICAgICAgY2FzZSAnbWluUHJvcGVydGllcyc6XG4gICAgICAgICAgICAvLyBJZiBudW1iZXJzLCBzZXQgdG8gaGlnaGVzdCB2YWx1ZVxuICAgICAgICAgICAgaWYgKGlzTnVtYmVyKGNvbWJpbmVkVmFsdWUpICYmIGlzTnVtYmVyKHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYVtrZXldID0gTWF0aC5tYXgoY29tYmluZWRWYWx1ZSwgc2NoZW1hVmFsdWUpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ25vdCc6XG4gICAgICAgICAgICAvLyBDb21iaW5lIG5vdCB2YWx1ZXMgaW50byBhbnlPZiBhcnJheVxuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGNvbWJpbmVkVmFsdWUpICYmIGlzT2JqZWN0KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb25zdCBub3RBbnlPZiA9IFtjb21iaW5lZFZhbHVlLCBzY2hlbWFWYWx1ZV1cbiAgICAgICAgICAgICAgICAucmVkdWNlKChub3RBbnlPZkFycmF5LCBub3RTY2hlbWEpID0+XG4gICAgICAgICAgICAgICAgICAgIGlzQXJyYXkobm90U2NoZW1hLmFueU9mKSAmJlxuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhub3RTY2hlbWEpLmxlbmd0aCA9PT0gMSA/XG4gICAgICAgICAgICAgICAgICAgICAgWy4uLm5vdEFueU9mQXJyYXksIC4uLm5vdFNjaGVtYS5hbnlPZl0gOlxuICAgICAgICAgICAgICAgICAgICAgIFsuLi5ub3RBbnlPZkFycmF5LCBub3RTY2hlbWFdXG4gICAgICAgICAgICAgICAgICAsIFtdKVxuICAgICAgICAgICAgICAvLyBUT0RPOiBSZW1vdmUgZHVwbGljYXRlIGl0ZW1zIGZyb20gYXJyYXlcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEubm90ID0ge2FueU9mOiBub3RBbnlPZn1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAncGF0dGVyblByb3BlcnRpZXMnOlxuICAgICAgICAgICAgLy8gQ29tYmluZSBhbGwga2V5cyBmcm9tIGJvdGggb2JqZWN0c1xuICAgICAgICAgICAgLy8gYW5kIG1lcmdlIHNjaGVtYXMgb24gbWF0Y2hpbmcga2V5c1xuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGNvbWJpbmVkVmFsdWUpICYmIGlzT2JqZWN0KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb25zdCBjb21iaW5lZE9iamVjdCA9IHsuLi5jb21iaW5lZFZhbHVlfVxuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN1YktleSBvZiBPYmplY3Qua2V5cyhzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWhhc093bihjb21iaW5lZE9iamVjdCwgc3ViS2V5KSB8fFxuICAgICAgICAgICAgICAgICAgXy5pc0VxdWFsKGNvbWJpbmVkT2JqZWN0W3N1YktleV0sIHNjaGVtYVZhbHVlW3N1YktleV0pXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdFtzdWJLZXldID0gc2NoZW1hVmFsdWVbc3ViS2V5XVxuICAgICAgICAgICAgICAgICAgLy8gSWYgYm90aCBrZXlzIGFyZSBvYmplY3RzLCBtZXJnZSB0aGVtXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgIGlzT2JqZWN0KHNjaGVtYVZhbHVlW3N1YktleV0pICYmIGlzT2JqZWN0KGNvbWJpbmVkT2JqZWN0W3N1YktleV0pXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdFtzdWJLZXldID1cbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VTY2hlbWFzKGNvbWJpbmVkT2JqZWN0W3N1YktleV0sIHNjaGVtYVZhbHVlW3N1YktleV0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEucGF0dGVyblByb3BlcnRpZXMgPSBjb21iaW5lZE9iamVjdFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdwcm9wZXJ0aWVzJzpcbiAgICAgICAgICAgIC8vIENvbWJpbmUgYWxsIGtleXMgZnJvbSBib3RoIG9iamVjdHNcbiAgICAgICAgICAgIC8vIHVubGVzcyBhZGRpdGlvbmFsUHJvcGVydGllcyA9PT0gZmFsc2VcbiAgICAgICAgICAgIC8vIGFuZCBtZXJnZSBzY2hlbWFzIG9uIG1hdGNoaW5nIGtleXNcbiAgICAgICAgICAgIGlmIChpc09iamVjdChjb21iaW5lZFZhbHVlKSAmJiBpc09iamVjdChzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29uc3QgY29tYmluZWRPYmplY3QgPSB7Li4uY29tYmluZWRWYWx1ZX1cbiAgICAgICAgICAgICAgLy8gSWYgbmV3IHNjaGVtYSBoYXMgYWRkaXRpb25hbFByb3BlcnRpZXMsXG4gICAgICAgICAgICAgIC8vIG1lcmdlIG9yIHJlbW92ZSBub24tbWF0Y2hpbmcgcHJvcGVydHkga2V5cyBpbiBjb21iaW5lZCBzY2hlbWFcbiAgICAgICAgICAgICAgaWYgKGhhc093bihzY2hlbWFWYWx1ZSwgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJykpIHtcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjb21iaW5lZFZhbHVlKVxuICAgICAgICAgICAgICAgICAgLmZpbHRlcihjb21iaW5lZEtleSA9PiAhT2JqZWN0LmtleXMoc2NoZW1hVmFsdWUpLmluY2x1ZGVzKGNvbWJpbmVkS2V5KSlcbiAgICAgICAgICAgICAgICAgIC5mb3JFYWNoKG5vbk1hdGNoaW5nS2V5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjaGVtYVZhbHVlLmFkZGl0aW9uYWxQcm9wZXJ0aWVzID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjb21iaW5lZE9iamVjdFtub25NYXRjaGluZ0tleV1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc09iamVjdChzY2hlbWFWYWx1ZS5hZGRpdGlvbmFsUHJvcGVydGllcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdFtub25NYXRjaGluZ0tleV0gPSBtZXJnZVNjaGVtYXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdFtub25NYXRjaGluZ0tleV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2hlbWFWYWx1ZS5hZGRpdGlvbmFsUHJvcGVydGllc1xuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN1YktleSBvZiBPYmplY3Qua2V5cyhzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoXy5pc0VxdWFsKGNvbWJpbmVkT2JqZWN0W3N1YktleV0sIHNjaGVtYVZhbHVlW3N1YktleV0pIHx8IChcbiAgICAgICAgICAgICAgICAgICFoYXNPd24oY29tYmluZWRPYmplY3QsIHN1YktleSkgJiZcbiAgICAgICAgICAgICAgICAgICFoYXNPd24oY29tYmluZWRPYmplY3QsICdhZGRpdGlvbmFsUHJvcGVydGllcycpXG4gICAgICAgICAgICAgICAgKSkge1xuICAgICAgICAgICAgICAgICAgY29tYmluZWRPYmplY3Rbc3ViS2V5XSA9IHNjaGVtYVZhbHVlW3N1YktleV1cbiAgICAgICAgICAgICAgICAgIC8vIElmIGNvbWJpbmVkIHNjaGVtYSBoYXMgYWRkaXRpb25hbFByb3BlcnRpZXMsXG4gICAgICAgICAgICAgICAgICAvLyBtZXJnZSBvciBpZ25vcmUgbm9uLW1hdGNoaW5nIHByb3BlcnR5IGtleXMgaW4gbmV3IHNjaGVtYVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAhaGFzT3duKGNvbWJpbmVkT2JqZWN0LCBzdWJLZXkpICYmXG4gICAgICAgICAgICAgICAgICBoYXNPd24oY29tYmluZWRPYmplY3QsICdhZGRpdGlvbmFsUHJvcGVydGllcycpXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAvLyBJZiBjb21iaW5lZE9iamVjdC5hZGRpdGlvbmFsUHJvcGVydGllcyA9PT0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAvLyBkbyBub3RoaW5nIChkb24ndCBzZXQga2V5KVxuICAgICAgICAgICAgICAgICAgLy8gSWYgYWRkaXRpb25hbFByb3BlcnRpZXMgaXMgb2JqZWN0LCBtZXJnZSB3aXRoIG5ldyBrZXlcbiAgICAgICAgICAgICAgICAgIGlmIChpc09iamVjdChjb21iaW5lZE9iamVjdC5hZGRpdGlvbmFsUHJvcGVydGllcykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tYmluZWRPYmplY3Rbc3ViS2V5XSA9IG1lcmdlU2NoZW1hcyhcbiAgICAgICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdC5hZGRpdGlvbmFsUHJvcGVydGllcywgc2NoZW1hVmFsdWVbc3ViS2V5XVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAvLyBJZiBib3RoIGtleXMgYXJlIG9iamVjdHMsIG1lcmdlIHRoZW1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgaXNPYmplY3Qoc2NoZW1hVmFsdWVbc3ViS2V5XSkgJiZcbiAgICAgICAgICAgICAgICAgIGlzT2JqZWN0KGNvbWJpbmVkT2JqZWN0W3N1YktleV0pXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdFtzdWJLZXldID1cbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VTY2hlbWFzKGNvbWJpbmVkT2JqZWN0W3N1YktleV0sIHNjaGVtYVZhbHVlW3N1YktleV0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEucHJvcGVydGllcyA9IGNvbWJpbmVkT2JqZWN0XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ3JlcXVpcmVkJzpcbiAgICAgICAgICAgIC8vIElmIGFycmF5cywgaW5jbHVkZSBhbGwgaXRlbXMgZnJvbSBib3RoIGFycmF5cywgZXhjbHVkaW5nIGR1cGxpY2F0ZXNcbiAgICAgICAgICAgIGlmIChpc0FycmF5KGNvbWJpbmVkVmFsdWUpICYmIGlzQXJyYXkoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLnJlcXVpcmVkID0gdW5pcXVlSXRlbXMoLi4uY29tYmluZWRWYWx1ZSwgLi4uc2NoZW1hVmFsdWUpXG4gICAgICAgICAgICAgIC8vIElmIGJvb2xlYW5zLCBhZXQgdHJ1ZSBpZiBlaXRoZXIgdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgdHlwZW9mIHNjaGVtYVZhbHVlID09PSAnYm9vbGVhbicgJiZcbiAgICAgICAgICAgICAgdHlwZW9mIGNvbWJpbmVkVmFsdWUgPT09ICdib29sZWFuJ1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLnJlcXVpcmVkID0gISFjb21iaW5lZFZhbHVlIHx8ICEhc2NoZW1hVmFsdWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnJHNjaGVtYSc6XG4gICAgICAgICAgY2FzZSAnJGlkJzpcbiAgICAgICAgICBjYXNlICdpZCc6XG4gICAgICAgICAgICAvLyBEb24ndCBjb21iaW5lIHRoZXNlIGtleXNcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAndGl0bGUnOlxuICAgICAgICAgIGNhc2UgJ2Rlc2NyaXB0aW9uJzpcbiAgICAgICAgICAgIC8vIFJldHVybiB0aGUgbGFzdCB2YWx1ZSwgb3ZlcndyaXRpbmcgYW55IHByZXZpb3VzIG9uZVxuICAgICAgICAgICAgLy8gVGhlc2UgcHJvcGVydGllcyBhcmUgbm90IHVzZWQgZm9yIHZhbGlkYXRpb24sIHNvIGNvbmZsaWN0cyBkb24ndCBtYXR0ZXJcbiAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hW2tleV0gPSBzY2hlbWFWYWx1ZVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICd0eXBlJzpcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgKGlzQXJyYXkoc2NoZW1hVmFsdWUpIHx8IGlzU3RyaW5nKHNjaGVtYVZhbHVlKSkgJiZcbiAgICAgICAgICAgICAgKGlzQXJyYXkoY29tYmluZWRWYWx1ZSkgfHwgaXNTdHJpbmcoY29tYmluZWRWYWx1ZSkpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29uc3QgY29tYmluZWRUeXBlcyA9IGNvbW1vbkl0ZW1zKGNvbWJpbmVkVmFsdWUsIHNjaGVtYVZhbHVlKVxuICAgICAgICAgICAgICBpZiAoIWNvbWJpbmVkVHlwZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLnR5cGUgPSBjb21iaW5lZFR5cGVzLmxlbmd0aCA+IDEgPyBjb21iaW5lZFR5cGVzIDogY29tYmluZWRUeXBlc1swXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICd1bmlxdWVJdGVtcyc6XG4gICAgICAgICAgICAvLyBTZXQgdHJ1ZSBpZiBlaXRoZXIgdHJ1ZVxuICAgICAgICAgICAgY29tYmluZWRTY2hlbWEudW5pcXVlSXRlbXMgPSAhIWNvbWJpbmVkVmFsdWUgfHwgISFzY2hlbWFWYWx1ZVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb21iaW5lZFNjaGVtYVxufVxuIl19