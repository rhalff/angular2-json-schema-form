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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VTY2hlbWFzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdzZi1jb21tb24vIiwic291cmNlcyI6WyJsaWIvZnVuY3Rpb25zL21lcmdlLXNjaGVtYXMvbWVyZ2VTY2hlbWFzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBQzNFLE9BQU8sRUFBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBQyxNQUFNLFlBQVksQ0FBQTtBQUMzRCxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQTtBQW9CM0IsTUFBTSxVQUFVLFlBQVk7O0lBQUMsaUJBQWU7U0FBZixVQUFlLEVBQWYscUJBQWUsRUFBZixJQUFlO1FBQWYsNEJBQWU7O0lBQzFDLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQWhCLENBQWdCLENBQUMsQ0FBQTtJQUNwRCxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBakIsQ0FBaUIsQ0FBQyxFQUFFO1FBQzdDLE9BQU8sSUFBSSxDQUFBO0tBQ1o7SUFDRCxJQUFNLGNBQWMsR0FBUSxFQUFFLENBQUE7O1FBQzlCLEtBQXFCLElBQUEsWUFBQSxTQUFBLE9BQU8sQ0FBQSxnQ0FBQSxxREFBRTtZQUF6QixJQUFNLE1BQU0sb0JBQUE7b0NBQ0osR0FBRzs7Z0JBQ1osSUFBTSxhQUFhLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUN6QyxJQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQy9CLElBQUksQ0FBQyxN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QUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO29EQUNsQixFQUFDLEtBQUssV0FBTSxPQUFPLENBQUMsRUFBQztpQ0FDN0I7Z0NBQ0QsY0FBYyxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUE7NkJBQ2xGO2lDQUFNO2dEQUNFLEVBQUMsS0FBSyxXQUFNLE9BQU8sQ0FBQyxFQUFDOzZCQUM3Qjs0QkFDRCxNQUFLO3dCQUNQLEtBQUssYUFBYTs0QkFFaEIsY0FBYyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUE7NEJBQzdELE1BQUs7d0JBQ1AsT0FBTyxDQUFDLGlCQUNDLEVBQUMsS0FBSyxXQUFNLE9BQU8sQ0FBQyxFQUFDLEdBQUE7cUJBQy9CO2lCQUNGOzs7Z0JBeFRILEtBQWtCLElBQUEsb0JBQUEsU0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUEsZ0JBQUE7b0JBQWhDLElBQU0sR0FBRyxXQUFBOzBDQUFILEdBQUc7OztpQkF5VGI7Ozs7Ozs7OztTQUNGOzs7Ozs7Ozs7SUFDRCxPQUFPLGNBQWMsQ0FBQTtBQUN2QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc0FycmF5LCBpc0VtcHR5LCBpc051bWJlciwgaXNPYmplY3QsIGlzU3RyaW5nfSBmcm9tICcuLi92YWxpZGF0b3InXG5pbXBvcnQge2NvbW1vbkl0ZW1zLCBoYXNPd24sIHVuaXF1ZUl0ZW1zfSBmcm9tICcuLi91dGlsaXR5J1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnXG5cbi8qKlxuICogJ21lcmdlU2NoZW1hcycgZnVuY3Rpb25cbiAqXG4gKiBNZXJnZXMgbXVsdGlwbGUgSlNPTiBzY2hlbWFzIGludG8gYSBzaW5nbGUgc2NoZW1hIHdpdGggY29tYmluZWQgcnVsZXMuXG4gKlxuICogSWYgYWJsZSB0byBsb2dpY2FsbHkgbWVyZ2UgcHJvcGVydGllcyBmcm9tIGFsbCBzY2hlbWFzLFxuICogcmV0dXJucyBhIHNpbmdsZSBzY2hlbWEgb2JqZWN0IGNvbnRhaW5pbmcgYWxsIG1lcmdlZCBwcm9wZXJ0aWVzLlxuICpcbiAqIEV4YW1wbGU6ICh7IGE6IGIsIG1heDogMSB9LCB7IGM6IGQsIG1heDogMiB9KSA9PiB7IGE6IGIsIGM6IGQsIG1heDogMSB9XG4gKlxuICogSWYgdW5hYmxlIHRvIGxvZ2ljYWxseSBtZXJnZSwgcmV0dXJucyBhbiBhbGxPZiBzY2hlbWEgb2JqZWN0IGNvbnRhaW5pbmdcbiAqIGFuIGFycmF5IG9mIHRoZSBvcmlnaW5hbCBzY2hlbWFzO1xuICpcbiAqIEV4YW1wbGU6ICh7IGE6IGIgfSwgeyBhOiBkIH0pID0+IHsgYWxsT2Y6IFsgeyBhOiBiIH0sIHsgYTogZCB9IF0gfVxuICpcbiAqIEBwYXJhbSBzY2hlbWFzIC0gb25lIG9yIG1vcmUgaW5wdXQgc2NoZW1hc1xuICogQHJldHVybiBtZXJnZWQgc2NoZW1hXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZVNjaGVtYXMoLi4uc2NoZW1hczogYW55KSB7XG4gIHNjaGVtYXMgPSBzY2hlbWFzLmZpbHRlcihzY2hlbWEgPT4gIWlzRW1wdHkoc2NoZW1hKSlcbiAgaWYgKHNjaGVtYXMuc29tZShzY2hlbWEgPT4gIWlzT2JqZWN0KHNjaGVtYSkpKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICBjb25zdCBjb21iaW5lZFNjaGVtYTogYW55ID0ge31cbiAgZm9yIChjb25zdCBzY2hlbWEgb2Ygc2NoZW1hcykge1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHNjaGVtYSkpIHtcbiAgICAgIGNvbnN0IGNvbWJpbmVkVmFsdWUgPSBjb21iaW5lZFNjaGVtYVtrZXldXG4gICAgICBjb25zdCBzY2hlbWFWYWx1ZSA9IHNjaGVtYVtrZXldXG4gICAgICBpZiAoIWhhc093bihjb21iaW5lZFNjaGVtYSwga2V5KSB8fCBfLmlzRXF1YWwoY29tYmluZWRWYWx1ZSwgc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgIGNvbWJpbmVkU2NoZW1hW2tleV0gPSBzY2hlbWFWYWx1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICBjYXNlICdhbGxPZic6XG4gICAgICAgICAgICAvLyBDb21iaW5lIGFsbCBpdGVtcyBmcm9tIGJvdGggYXJyYXlzXG4gICAgICAgICAgICBpZiAoaXNBcnJheShjb21iaW5lZFZhbHVlKSAmJiBpc0FycmF5KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5hbGxPZiA9IG1lcmdlU2NoZW1hcyguLi5jb21iaW5lZFZhbHVlLCAuLi5zY2hlbWFWYWx1ZSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnYWRkaXRpb25hbEl0ZW1zJzpcbiAgICAgICAgICBjYXNlICdhZGRpdGlvbmFsUHJvcGVydGllcyc6XG4gICAgICAgICAgY2FzZSAnY29udGFpbnMnOlxuICAgICAgICAgIGNhc2UgJ3Byb3BlcnR5TmFtZXMnOlxuICAgICAgICAgICAgLy8gTWVyZ2Ugc2NoZW1hIG9iamVjdHNcbiAgICAgICAgICAgIGlmIChpc09iamVjdChjb21iaW5lZFZhbHVlKSAmJiBpc09iamVjdChzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWFba2V5XSA9IG1lcmdlU2NoZW1hcyhjb21iaW5lZFZhbHVlLCBzY2hlbWFWYWx1ZSlcbiAgICAgICAgICAgICAgLy8gYWRkaXRpb25hbFByb3BlcnRpZXMgPT0gZmFsc2UgaW4gYW55IHNjaGVtYSBvdmVycmlkZXMgYWxsIG90aGVyIHZhbHVlc1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAga2V5ID09PSAnYWRkaXRpb25hbFByb3BlcnRpZXMnICYmXG4gICAgICAgICAgICAgIChjb21iaW5lZFZhbHVlID09PSBmYWxzZSB8fCBzY2hlbWFWYWx1ZSA9PT0gZmFsc2UpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEuY29tYmluZWRTY2hlbWEgPSBmYWxzZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdhbnlPZic6XG4gICAgICAgICAgY2FzZSAnb25lT2YnOlxuICAgICAgICAgIGNhc2UgJ2VudW0nOlxuICAgICAgICAgICAgLy8gS2VlcCBvbmx5IGl0ZW1zIHRoYXQgYXBwZWFyIGluIGJvdGggYXJyYXlzXG4gICAgICAgICAgICBpZiAoaXNBcnJheShjb21iaW5lZFZhbHVlKSAmJiBpc0FycmF5KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYVtrZXldID0gY29tYmluZWRWYWx1ZS5maWx0ZXIoaXRlbTEgPT5cbiAgICAgICAgICAgICAgICBzY2hlbWFWYWx1ZS5maW5kSW5kZXgoaXRlbTIgPT4gXy5pc0VxdWFsKGl0ZW0xLCBpdGVtMikpID4gLTFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBpZiAoIWNvbWJpbmVkU2NoZW1hW2tleV0ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ2RlZmluaXRpb25zJzpcbiAgICAgICAgICAgIC8vIENvbWJpbmUga2V5cyBmcm9tIGJvdGggb2JqZWN0c1xuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGNvbWJpbmVkVmFsdWUpICYmIGlzT2JqZWN0KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb25zdCBjb21iaW5lZE9iamVjdCA9IHsuLi5jb21iaW5lZFZhbHVlfVxuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN1YktleSBvZiBPYmplY3Qua2V5cyhzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWhhc093bihjb21iaW5lZE9iamVjdCwgc3ViS2V5KSB8fFxuICAgICAgICAgICAgICAgICAgXy5pc0VxdWFsKGNvbWJpbmVkT2JqZWN0W3N1YktleV0sIHNjaGVtYVZhbHVlW3N1YktleV0pXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdFtzdWJLZXldID0gc2NoZW1hVmFsdWVbc3ViS2V5XVxuICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgY29tYmluZSBtYXRjaGluZyBrZXlzIHdpdGggZGlmZmVyZW50IHZhbHVlc1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLmRlZmluaXRpb25zID0gY29tYmluZWRPYmplY3RcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnZGVwZW5kZW5jaWVzJzpcbiAgICAgICAgICAgIC8vIENvbWJpbmUgYWxsIGtleXMgZnJvbSBib3RoIG9iamVjdHNcbiAgICAgICAgICAgIC8vIGFuZCBtZXJnZSBzY2hlbWFzIG9uIG1hdGNoaW5nIGtleXMsXG4gICAgICAgICAgICAvLyBjb252ZXJ0aW5nIGZyb20gYXJyYXlzIHRvIG9iamVjdHMgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgICBpZiAoaXNPYmplY3QoY29tYmluZWRWYWx1ZSkgJiYgaXNPYmplY3Qoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbWJpbmVkT2JqZWN0ID0gey4uLmNvbWJpbmVkVmFsdWV9XG4gICAgICAgICAgICAgIGZvciAoY29uc3Qgc3ViS2V5IG9mIE9iamVjdC5rZXlzKHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICghaGFzT3duKGNvbWJpbmVkT2JqZWN0LCBzdWJLZXkpIHx8XG4gICAgICAgICAgICAgICAgICBfLmlzRXF1YWwoY29tYmluZWRPYmplY3Rbc3ViS2V5XSwgc2NoZW1hVmFsdWVbc3ViS2V5XSlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W3N1YktleV0gPSBzY2hlbWFWYWx1ZVtzdWJLZXldXG4gICAgICAgICAgICAgICAgICAvLyBJZiBib3RoIGtleXMgYXJlIGFycmF5cywgaW5jbHVkZSBhbGwgaXRlbXMgZnJvbSBib3RoIGFycmF5cyxcbiAgICAgICAgICAgICAgICAgIC8vIGV4Y2x1ZGluZyBkdXBsaWNhdGVzXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgIGlzQXJyYXkoc2NoZW1hVmFsdWVbc3ViS2V5XSkgJiYgaXNBcnJheShjb21iaW5lZE9iamVjdFtzdWJLZXldKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgY29tYmluZWRPYmplY3Rbc3ViS2V5XSA9XG4gICAgICAgICAgICAgICAgICAgIHVuaXF1ZUl0ZW1zKC4uLmNvbWJpbmVkT2JqZWN0W3N1YktleV0sIC4uLnNjaGVtYVZhbHVlW3N1YktleV0pXG4gICAgICAgICAgICAgICAgICAvLyBJZiBlaXRoZXIga2V5IGlzIGFuIG9iamVjdCwgbWVyZ2UgdGhlIHNjaGVtYXNcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgKGlzQXJyYXkoc2NoZW1hVmFsdWVbc3ViS2V5XSkgfHwgaXNPYmplY3Qoc2NoZW1hVmFsdWVbc3ViS2V5XSkpICYmXG4gICAgICAgICAgICAgICAgICAoaXNBcnJheShjb21iaW5lZE9iamVjdFtzdWJLZXldKSB8fCBpc09iamVjdChjb21iaW5lZE9iamVjdFtzdWJLZXldKSlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIC8vIElmIGVpdGhlciBrZXkgaXMgYW4gYXJyYXksIGNvbnZlcnQgaXQgdG8gYW4gb2JqZWN0IGZpcnN0XG4gICAgICAgICAgICAgICAgICBjb25zdCByZXF1aXJlZCA9IGlzQXJyYXkoY29tYmluZWRTY2hlbWEucmVxdWlyZWQpID9cbiAgICAgICAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEucmVxdWlyZWQgOiBbXVxuICAgICAgICAgICAgICAgICAgY29uc3QgY29tYmluZWREZXBlbmRlbmN5ID0gaXNBcnJheShjb21iaW5lZE9iamVjdFtzdWJLZXldKSA/XG4gICAgICAgICAgICAgICAgICAgIHtyZXF1aXJlZDogdW5pcXVlSXRlbXMoLi4ucmVxdWlyZWQsIGNvbWJpbmVkT2JqZWN0W3N1YktleV0pfSA6XG4gICAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W3N1YktleV1cbiAgICAgICAgICAgICAgICAgIGNvbnN0IHNjaGVtYURlcGVuZGVuY3kgPSBpc0FycmF5KHNjaGVtYVZhbHVlW3N1YktleV0pID9cbiAgICAgICAgICAgICAgICAgICAge3JlcXVpcmVkOiB1bmlxdWVJdGVtcyguLi5yZXF1aXJlZCwgc2NoZW1hVmFsdWVbc3ViS2V5XSl9IDpcbiAgICAgICAgICAgICAgICAgICAgc2NoZW1hVmFsdWVbc3ViS2V5XVxuICAgICAgICAgICAgICAgICAgY29tYmluZWRPYmplY3Rbc3ViS2V5XSA9XG4gICAgICAgICAgICAgICAgICAgIG1lcmdlU2NoZW1hcyhjb21iaW5lZERlcGVuZGVuY3ksIHNjaGVtYURlcGVuZGVuY3kpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEuZGVwZW5kZW5jaWVzID0gY29tYmluZWRPYmplY3RcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnaXRlbXMnOlxuICAgICAgICAgICAgLy8gSWYgYXJyYXlzLCBrZWVwIG9ubHkgaXRlbXMgdGhhdCBhcHBlYXIgaW4gYm90aCBhcnJheXNcbiAgICAgICAgICAgIGlmIChpc0FycmF5KGNvbWJpbmVkVmFsdWUpICYmIGlzQXJyYXkoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLml0ZW1zID0gY29tYmluZWRWYWx1ZS5maWx0ZXIoaXRlbTEgPT5cbiAgICAgICAgICAgICAgICBzY2hlbWFWYWx1ZS5maW5kSW5kZXgoaXRlbTIgPT4gXy5pc0VxdWFsKGl0ZW0xLCBpdGVtMikpID4gLTFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBpZiAoIWNvbWJpbmVkU2NoZW1hLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBJZiBib3RoIGtleXMgYXJlIG9iamVjdHMsIG1lcmdlIHRoZW1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QoY29tYmluZWRWYWx1ZSkgJiYgaXNPYmplY3Qoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hLml0ZW1zID0gbWVyZ2VTY2hlbWFzKGNvbWJpbmVkVmFsdWUsIHNjaGVtYVZhbHVlKVxuICAgICAgICAgICAgICAvLyBJZiBvYmplY3QgKyBhcnJheSwgY29tYmluZSBvYmplY3Qgd2l0aCBlYWNoIGFycmF5IGl0ZW1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShjb21iaW5lZFZhbHVlKSAmJiBpc09iamVjdChzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEuaXRlbXMgPVxuICAgICAgICAgICAgICAgIGNvbWJpbmVkVmFsdWUubWFwKGl0ZW0gPT4gbWVyZ2VTY2hlbWFzKGl0ZW0sIHNjaGVtYVZhbHVlKSlcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QoY29tYmluZWRWYWx1ZSkgJiYgaXNBcnJheShzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEuaXRlbXMgPVxuICAgICAgICAgICAgICAgIHNjaGVtYVZhbHVlLm1hcChpdGVtID0+IG1lcmdlU2NoZW1hcyhpdGVtLCBjb21iaW5lZFZhbHVlKSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnbXVsdGlwbGVPZic6XG4gICAgICAgICAgICAvLyBUT0RPOiBBZGp1c3QgdG8gY29ycmVjdGx5IGhhbmRsZSBkZWNpbWFsIHZhbHVlc1xuICAgICAgICAgICAgLy8gSWYgbnVtYmVycywgc2V0IHRvIGxlYXN0IGNvbW1vbiBtdWx0aXBsZVxuICAgICAgICAgICAgaWYgKGlzTnVtYmVyKGNvbWJpbmVkVmFsdWUpICYmIGlzTnVtYmVyKHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb25zdCBnY2QgPSAoeCwgeSkgPT4gIXkgPyB4IDogZ2NkKHksIHggJSB5KVxuICAgICAgICAgICAgICBjb25zdCBsY20gPSAoeCwgeSkgPT4gKHggKiB5KSAvIGdjZCh4LCB5KVxuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5tdWx0aXBsZU9mID0gbGNtKGNvbWJpbmVkVmFsdWUsIHNjaGVtYVZhbHVlKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdtYXhpbXVtJzpcbiAgICAgICAgICBjYXNlICdleGNsdXNpdmVNYXhpbXVtJzpcbiAgICAgICAgICBjYXNlICdtYXhMZW5ndGgnOlxuICAgICAgICAgIGNhc2UgJ21heEl0ZW1zJzpcbiAgICAgICAgICBjYXNlICdtYXhQcm9wZXJ0aWVzJzpcbiAgICAgICAgICAgIC8vIElmIG51bWJlcnMsIHNldCB0byBsb3dlc3QgdmFsdWVcbiAgICAgICAgICAgIGlmIChpc051bWJlcihjb21iaW5lZFZhbHVlKSAmJiBpc051bWJlcihzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWFba2V5XSA9IE1hdGgubWluKGNvbWJpbmVkVmFsdWUsIHNjaGVtYVZhbHVlKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdtaW5pbXVtJzpcbiAgICAgICAgICBjYXNlICdleGNsdXNpdmVNaW5pbXVtJzpcbiAgICAgICAgICBjYXNlICdtaW5MZW5ndGgnOlxuICAgICAgICAgIGNhc2UgJ21pbkl0ZW1zJzpcbiAgICAgICAgICBjYXNlICdtaW5Qcm9wZXJ0aWVzJzpcbiAgICAgICAgICAgIC8vIElmIG51bWJlcnMsIHNldCB0byBoaWdoZXN0IHZhbHVlXG4gICAgICAgICAgICBpZiAoaXNOdW1iZXIoY29tYmluZWRWYWx1ZSkgJiYgaXNOdW1iZXIoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbWJpbmVkU2NoZW1hW2tleV0gPSBNYXRoLm1heChjb21iaW5lZFZhbHVlLCBzY2hlbWFWYWx1ZSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnbm90JzpcbiAgICAgICAgICAgIC8vIENvbWJpbmUgbm90IHZhbHVlcyBpbnRvIGFueU9mIGFycmF5XG4gICAgICAgICAgICBpZiAoaXNPYmplY3QoY29tYmluZWRWYWx1ZSkgJiYgaXNPYmplY3Qoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IG5vdEFueU9mID0gW2NvbWJpbmVkVmFsdWUsIHNjaGVtYVZhbHVlXVxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoKG5vdEFueU9mQXJyYXksIG5vdFNjaGVtYSkgPT5cbiAgICAgICAgICAgICAgICAgICAgaXNBcnJheShub3RTY2hlbWEuYW55T2YpICYmXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKG5vdFNjaGVtYSkubGVuZ3RoID09PSAxID9cbiAgICAgICAgICAgICAgICAgICAgICBbLi4ubm90QW55T2ZBcnJheSwgLi4ubm90U2NoZW1hLmFueU9mXSA6XG4gICAgICAgICAgICAgICAgICAgICAgWy4uLm5vdEFueU9mQXJyYXksIG5vdFNjaGVtYV1cbiAgICAgICAgICAgICAgICAgICwgW10pXG4gICAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSBkdXBsaWNhdGUgaXRlbXMgZnJvbSBhcnJheVxuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5ub3QgPSB7YW55T2Y6IG5vdEFueU9mfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdwYXR0ZXJuUHJvcGVydGllcyc6XG4gICAgICAgICAgICAvLyBDb21iaW5lIGFsbCBrZXlzIGZyb20gYm90aCBvYmplY3RzXG4gICAgICAgICAgICAvLyBhbmQgbWVyZ2Ugc2NoZW1hcyBvbiBtYXRjaGluZyBrZXlzXG4gICAgICAgICAgICBpZiAoaXNPYmplY3QoY29tYmluZWRWYWx1ZSkgJiYgaXNPYmplY3Qoc2NoZW1hVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbWJpbmVkT2JqZWN0ID0gey4uLmNvbWJpbmVkVmFsdWV9XG4gICAgICAgICAgICAgIGZvciAoY29uc3Qgc3ViS2V5IG9mIE9iamVjdC5rZXlzKHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICghaGFzT3duKGNvbWJpbmVkT2JqZWN0LCBzdWJLZXkpIHx8XG4gICAgICAgICAgICAgICAgICBfLmlzRXF1YWwoY29tYmluZWRPYmplY3Rbc3ViS2V5XSwgc2NoZW1hVmFsdWVbc3ViS2V5XSlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W3N1YktleV0gPSBzY2hlbWFWYWx1ZVtzdWJLZXldXG4gICAgICAgICAgICAgICAgICAvLyBJZiBib3RoIGtleXMgYXJlIG9iamVjdHMsIG1lcmdlIHRoZW1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgaXNPYmplY3Qoc2NoZW1hVmFsdWVbc3ViS2V5XSkgJiYgaXNPYmplY3QoY29tYmluZWRPYmplY3Rbc3ViS2V5XSlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W3N1YktleV0gPVxuICAgICAgICAgICAgICAgICAgICBtZXJnZVNjaGVtYXMoY29tYmluZWRPYmplY3Rbc3ViS2V5XSwgc2NoZW1hVmFsdWVbc3ViS2V5XSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5wYXR0ZXJuUHJvcGVydGllcyA9IGNvbWJpbmVkT2JqZWN0XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ3Byb3BlcnRpZXMnOlxuICAgICAgICAgICAgLy8gQ29tYmluZSBhbGwga2V5cyBmcm9tIGJvdGggb2JqZWN0c1xuICAgICAgICAgICAgLy8gdW5sZXNzIGFkZGl0aW9uYWxQcm9wZXJ0aWVzID09PSBmYWxzZVxuICAgICAgICAgICAgLy8gYW5kIG1lcmdlIHNjaGVtYXMgb24gbWF0Y2hpbmcga2V5c1xuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGNvbWJpbmVkVmFsdWUpICYmIGlzT2JqZWN0KHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICBjb25zdCBjb21iaW5lZE9iamVjdCA9IHsuLi5jb21iaW5lZFZhbHVlfVxuICAgICAgICAgICAgICAvLyBJZiBuZXcgc2NoZW1hIGhhcyBhZGRpdGlvbmFsUHJvcGVydGllcyxcbiAgICAgICAgICAgICAgLy8gbWVyZ2Ugb3IgcmVtb3ZlIG5vbi1tYXRjaGluZyBwcm9wZXJ0eSBrZXlzIGluIGNvbWJpbmVkIHNjaGVtYVxuICAgICAgICAgICAgICBpZiAoaGFzT3duKHNjaGVtYVZhbHVlLCAnYWRkaXRpb25hbFByb3BlcnRpZXMnKSkge1xuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGNvbWJpbmVkVmFsdWUpXG4gICAgICAgICAgICAgICAgICAuZmlsdGVyKGNvbWJpbmVkS2V5ID0+ICFPYmplY3Qua2V5cyhzY2hlbWFWYWx1ZSkuaW5jbHVkZXMoY29tYmluZWRLZXkpKVxuICAgICAgICAgICAgICAgICAgLmZvckVhY2gobm9uTWF0Y2hpbmdLZXkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2NoZW1hVmFsdWUuYWRkaXRpb25hbFByb3BlcnRpZXMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNvbWJpbmVkT2JqZWN0W25vbk1hdGNoaW5nS2V5XVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHNjaGVtYVZhbHVlLmFkZGl0aW9uYWxQcm9wZXJ0aWVzKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W25vbk1hdGNoaW5nS2V5XSA9IG1lcmdlU2NoZW1hcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W25vbk1hdGNoaW5nS2V5XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVtYVZhbHVlLmFkZGl0aW9uYWxQcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGZvciAoY29uc3Qgc3ViS2V5IG9mIE9iamVjdC5rZXlzKHNjaGVtYVZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmIChfLmlzRXF1YWwoY29tYmluZWRPYmplY3Rbc3ViS2V5XSwgc2NoZW1hVmFsdWVbc3ViS2V5XSkgfHwgKFxuICAgICAgICAgICAgICAgICAgIWhhc093bihjb21iaW5lZE9iamVjdCwgc3ViS2V5KSAmJlxuICAgICAgICAgICAgICAgICAgIWhhc093bihjb21iaW5lZE9iamVjdCwgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJylcbiAgICAgICAgICAgICAgICApKSB7XG4gICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdFtzdWJLZXldID0gc2NoZW1hVmFsdWVbc3ViS2V5XVxuICAgICAgICAgICAgICAgICAgLy8gSWYgY29tYmluZWQgc2NoZW1hIGhhcyBhZGRpdGlvbmFsUHJvcGVydGllcyxcbiAgICAgICAgICAgICAgICAgIC8vIG1lcmdlIG9yIGlnbm9yZSBub24tbWF0Y2hpbmcgcHJvcGVydHkga2V5cyBpbiBuZXcgc2NoZW1hXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICFoYXNPd24oY29tYmluZWRPYmplY3QsIHN1YktleSkgJiZcbiAgICAgICAgICAgICAgICAgIGhhc093bihjb21iaW5lZE9iamVjdCwgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJylcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIC8vIElmIGNvbWJpbmVkT2JqZWN0LmFkZGl0aW9uYWxQcm9wZXJ0aWVzID09PSBmYWxzZSxcbiAgICAgICAgICAgICAgICAgIC8vIGRvIG5vdGhpbmcgKGRvbid0IHNldCBrZXkpXG4gICAgICAgICAgICAgICAgICAvLyBJZiBhZGRpdGlvbmFsUHJvcGVydGllcyBpcyBvYmplY3QsIG1lcmdlIHdpdGggbmV3IGtleVxuICAgICAgICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGNvbWJpbmVkT2JqZWN0LmFkZGl0aW9uYWxQcm9wZXJ0aWVzKSkge1xuICAgICAgICAgICAgICAgICAgICBjb21iaW5lZE9iamVjdFtzdWJLZXldID0gbWVyZ2VTY2hlbWFzKFxuICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0LmFkZGl0aW9uYWxQcm9wZXJ0aWVzLCBzY2hlbWFWYWx1ZVtzdWJLZXldXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIC8vIElmIGJvdGgga2V5cyBhcmUgb2JqZWN0cywgbWVyZ2UgdGhlbVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICBpc09iamVjdChzY2hlbWFWYWx1ZVtzdWJLZXldKSAmJlxuICAgICAgICAgICAgICAgICAgaXNPYmplY3QoY29tYmluZWRPYmplY3Rbc3ViS2V5XSlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqZWN0W3N1YktleV0gPVxuICAgICAgICAgICAgICAgICAgICBtZXJnZVNjaGVtYXMoY29tYmluZWRPYmplY3Rbc3ViS2V5XSwgc2NoZW1hVmFsdWVbc3ViS2V5XSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb21iaW5lZFNjaGVtYS5wcm9wZXJ0aWVzID0gY29tYmluZWRPYmplY3RcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7YWxsT2Y6IFsuLi5zY2hlbWFzXX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAncmVxdWlyZWQnOlxuICAgICAgICAgICAgLy8gSWYgYXJyYXlzLCBpbmNsdWRlIGFsbCBpdGVtcyBmcm9tIGJvdGggYXJyYXlzLCBleGNsdWRpbmcgZHVwbGljYXRlc1xuICAgICAgICAgICAgaWYgKGlzQXJyYXkoY29tYmluZWRWYWx1ZSkgJiYgaXNBcnJheShzY2hlbWFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEucmVxdWlyZWQgPSB1bmlxdWVJdGVtcyguLi5jb21iaW5lZFZhbHVlLCAuLi5zY2hlbWFWYWx1ZSlcbiAgICAgICAgICAgICAgLy8gSWYgYm9vbGVhbnMsIGFldCB0cnVlIGlmIGVpdGhlciB0cnVlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICB0eXBlb2Ygc2NoZW1hVmFsdWUgPT09ICdib29sZWFuJyAmJlxuICAgICAgICAgICAgICB0eXBlb2YgY29tYmluZWRWYWx1ZSA9PT0gJ2Jvb2xlYW4nXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEucmVxdWlyZWQgPSAhIWNvbWJpbmVkVmFsdWUgfHwgISFzY2hlbWFWYWx1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHthbGxPZjogWy4uLnNjaGVtYXNdfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICckc2NoZW1hJzpcbiAgICAgICAgICBjYXNlICckaWQnOlxuICAgICAgICAgIGNhc2UgJ2lkJzpcbiAgICAgICAgICAgIC8vIERvbid0IGNvbWJpbmUgdGhlc2Uga2V5c1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICd0aXRsZSc6XG4gICAgICAgICAgY2FzZSAnZGVzY3JpcHRpb24nOlxuICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBsYXN0IHZhbHVlLCBvdmVyd3JpdGluZyBhbnkgcHJldmlvdXMgb25lXG4gICAgICAgICAgICAvLyBUaGVzZSBwcm9wZXJ0aWVzIGFyZSBub3QgdXNlZCBmb3IgdmFsaWRhdGlvbiwgc28gY29uZmxpY3RzIGRvbid0IG1hdHRlclxuICAgICAgICAgICAgY29tYmluZWRTY2hlbWFba2V5XSA9IHNjaGVtYVZhbHVlXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ3R5cGUnOlxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAoaXNBcnJheShzY2hlbWFWYWx1ZSkgfHwgaXNTdHJpbmcoc2NoZW1hVmFsdWUpKSAmJlxuICAgICAgICAgICAgICAoaXNBcnJheShjb21iaW5lZFZhbHVlKSB8fCBpc1N0cmluZyhjb21iaW5lZFZhbHVlKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb25zdCBjb21iaW5lZFR5cGVzID0gY29tbW9uSXRlbXMoY29tYmluZWRWYWx1ZSwgc2NoZW1hVmFsdWUpXG4gICAgICAgICAgICAgIGlmICghY29tYmluZWRUeXBlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29tYmluZWRTY2hlbWEudHlwZSA9IGNvbWJpbmVkVHlwZXMubGVuZ3RoID4gMSA/IGNvbWJpbmVkVHlwZXMgOiBjb21iaW5lZFR5cGVzWzBdXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ3VuaXF1ZUl0ZW1zJzpcbiAgICAgICAgICAgIC8vIFNldCB0cnVlIGlmIGVpdGhlciB0cnVlXG4gICAgICAgICAgICBjb21iaW5lZFNjaGVtYS51bmlxdWVJdGVtcyA9ICEhY29tYmluZWRWYWx1ZSB8fCAhIXNjaGVtYVZhbHVlXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4ge2FsbE9mOiBbLi4uc2NoZW1hc119XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbWJpbmVkU2NoZW1hXG59XG4iXX0=