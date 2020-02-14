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
import * as _ from 'lodash';
export function convertSchemaToDraft6(schema, options) {
    var e_1, _a;
    if (options === void 0) { options = {}; }
    var draft = options.draft || null;
    var changed = options.changed || false;
    if (typeof schema !== 'object') {
        return schema;
    }
    if (typeof schema.map === 'function') {
        return __spread(schema.map(function (subSchema) { return convertSchemaToDraft6(subSchema, { changed: changed, draft: draft }); }));
    }
    var newSchema = __assign({}, schema);
    var simpleTypes = ['array', 'boolean', 'integer', 'null', 'number', 'object', 'string'];
    if (typeof newSchema.$schema === 'string' &&
        /http\:\/\/json\-schema\.org\/draft\-0\d\/schema\#/.test(newSchema.$schema)) {
        draft = newSchema.$schema[30];
    }
    if (newSchema.contentEncoding) {
        newSchema.media = { binaryEncoding: newSchema.contentEncoding };
        delete newSchema.contentEncoding;
        changed = true;
    }
    if (typeof newSchema.extends === 'object') {
        newSchema.allOf = typeof newSchema.extends.map === 'function' ?
            newSchema.extends.map(function (subSchema) { return convertSchemaToDraft6(subSchema, { changed: changed, draft: draft }); }) :
            [convertSchemaToDraft6(newSchema.extends, { changed: changed, draft: draft })];
        delete newSchema.extends;
        changed = true;
    }
    if (newSchema.disallow) {
        if (typeof newSchema.disallow === 'string') {
            newSchema.not = { type: newSchema.disallow };
        }
        else if (typeof newSchema.disallow.map === 'function') {
            newSchema.not = {
                anyOf: newSchema.disallow
                    .map(function (type) { return typeof type === 'object' ? type : { type: type }; })
            };
        }
        delete newSchema.disallow;
        changed = true;
    }
    if (typeof newSchema.dependencies === 'object' &&
        Object.keys(newSchema.dependencies)
            .some(function (key) { return typeof newSchema.dependencies[key] === 'string'; })) {
        newSchema.dependencies = __assign({}, newSchema.dependencies);
        Object.keys(newSchema.dependencies)
            .filter(function (key) { return typeof newSchema.dependencies[key] === 'string'; })
            .forEach(function (key) { return newSchema.dependencies[key] = [newSchema.dependencies[key]]; });
        changed = true;
    }
    if (typeof newSchema.maxDecimal === 'number') {
        newSchema.multipleOf = 1 / Math.pow(10, newSchema.maxDecimal);
        delete newSchema.divisibleBy;
        changed = true;
        if (!draft || draft === 2) {
            draft = 1;
        }
    }
    if (typeof newSchema.divisibleBy === 'number') {
        newSchema.multipleOf = newSchema.divisibleBy;
        delete newSchema.divisibleBy;
        changed = true;
    }
    if (typeof newSchema.minimum === 'number' && newSchema.minimumCanEqual === false) {
        newSchema.exclusiveMinimum = newSchema.minimum;
        delete newSchema.minimum;
        changed = true;
        if (!draft) {
            draft = 2;
        }
    }
    else if (typeof newSchema.minimumCanEqual === 'boolean') {
        delete newSchema.minimumCanEqual;
        changed = true;
        if (!draft) {
            draft = 2;
        }
    }
    if (typeof newSchema.minimum === 'number' && newSchema.exclusiveMinimum === true) {
        newSchema.exclusiveMinimum = newSchema.minimum;
        delete newSchema.minimum;
        changed = true;
    }
    else if (typeof newSchema.exclusiveMinimum === 'boolean') {
        delete newSchema.exclusiveMinimum;
        changed = true;
    }
    if (typeof newSchema.maximum === 'number' && newSchema.maximumCanEqual === false) {
        newSchema.exclusiveMaximum = newSchema.maximum;
        delete newSchema.maximum;
        changed = true;
        if (!draft) {
            draft = 2;
        }
    }
    else if (typeof newSchema.maximumCanEqual === 'boolean') {
        delete newSchema.maximumCanEqual;
        changed = true;
        if (!draft) {
            draft = 2;
        }
    }
    if (typeof newSchema.maximum === 'number' && newSchema.exclusiveMaximum === true) {
        newSchema.exclusiveMaximum = newSchema.maximum;
        delete newSchema.maximum;
        changed = true;
    }
    else if (typeof newSchema.exclusiveMaximum === 'boolean') {
        delete newSchema.exclusiveMaximum;
        changed = true;
    }
    if (typeof newSchema.properties === 'object') {
        var properties_1 = __assign({}, newSchema.properties);
        var requiredKeys_1 = Array.isArray(newSchema.required) ?
            new Set(newSchema.required) : new Set();
        if (draft === 1 || draft === 2 ||
            Object.keys(properties_1).some(function (key) { return properties_1[key].optional === true; })) {
            Object.keys(properties_1)
                .filter(function (key) { return properties_1[key].optional !== true; })
                .forEach(function (key) { return requiredKeys_1.add(key); });
            changed = true;
            if (!draft) {
                draft = 2;
            }
        }
        if (Object.keys(properties_1).some(function (key) { return properties_1[key].required === true; })) {
            Object.keys(properties_1)
                .filter(function (key) { return properties_1[key].required === true; })
                .forEach(function (key) { return requiredKeys_1.add(key); });
            changed = true;
        }
        if (requiredKeys_1.size) {
            newSchema.required = Array.from(requiredKeys_1);
        }
        if (Object.keys(properties_1).some(function (key) { return properties_1[key].requires; })) {
            var dependencies_1 = typeof newSchema.dependencies === 'object' ? __assign({}, newSchema.dependencies) : {};
            Object.keys(properties_1)
                .filter(function (key) { return properties_1[key].requires; })
                .forEach(function (key) { return dependencies_1[key] =
                typeof properties_1[key].requires === 'string' ?
                    [properties_1[key].requires] : properties_1[key].requires; });
            newSchema.dependencies = dependencies_1;
            changed = true;
            if (!draft) {
                draft = 2;
            }
        }
        newSchema.properties = properties_1;
    }
    if (typeof newSchema.optional === 'boolean') {
        delete newSchema.optional;
        changed = true;
        if (!draft) {
            draft = 2;
        }
    }
    if (newSchema.requires) {
        delete newSchema.requires;
    }
    if (typeof newSchema.required === 'boolean') {
        delete newSchema.required;
    }
    if (typeof newSchema.id === 'string' && !newSchema.$id) {
        if (newSchema.id.slice(-1) === '#') {
            newSchema.id = newSchema.id.slice(0, -1);
        }
        newSchema.$id = newSchema.id + '-CONVERTED-TO-DRAFT-06#';
        delete newSchema.id;
        changed = true;
    }
    if (newSchema.type && (typeof newSchema.type.every === 'function' ?
        !newSchema.type.every(function (type) { return simpleTypes.includes(type); }) :
        !simpleTypes.includes(newSchema.type))) {
        changed = true;
    }
    if (typeof newSchema.$schema === 'string' &&
        /http\:\/\/json\-schema\.org\/draft\-0[1-4]\/schema\#/.test(newSchema.$schema)) {
        newSchema.$schema = 'http://json-schema.org/draft-06/schema#';
        changed = true;
    }
    else if (changed && typeof newSchema.$schema === 'string') {
        var addToDescription = 'Converted to draft 6 from ' + newSchema.$schema;
        if (typeof newSchema.description === 'string' && newSchema.description.length) {
            newSchema.description += '\n' + addToDescription;
        }
        else {
            newSchema.description = addToDescription;
        }
        delete newSchema.$schema;
    }
    if (newSchema.type && (typeof newSchema.type.every === 'function' ?
        !newSchema.type.every(function (type) { return simpleTypes.includes(type); }) :
        !simpleTypes.includes(newSchema.type))) {
        if (newSchema.type.length === 1) {
            newSchema.type = newSchema.type[0];
        }
        if (typeof newSchema.type === 'string') {
            if (newSchema.type === 'any') {
                newSchema.type = simpleTypes;
            }
            else {
                delete newSchema.type;
            }
        }
        else if (typeof newSchema.type === 'object') {
            if (typeof newSchema.type.every === 'function') {
                if (newSchema.type.every(function (type) { return typeof type === 'string'; })) {
                    newSchema.type = newSchema.type.some(function (type) { return type === 'any'; }) ?
                        newSchema.type = simpleTypes :
                        newSchema.type.filter(function (type) { return simpleTypes.includes(type); });
                }
                else if (newSchema.type.length > 1) {
                    var arrayKeys = ['additionalItems', 'items', 'maxItems', 'minItems', 'uniqueItems', 'contains'];
                    var numberKeys = ['multipleOf', 'maximum', 'exclusiveMaximum', 'minimum', 'exclusiveMinimum'];
                    var objectKeys = ['maxProperties', 'minProperties', 'required', 'additionalProperties',
                        'properties', 'patternProperties', 'dependencies', 'propertyNames'];
                    var stringKeys = ['maxLength', 'minLength', 'pattern', 'format'];
                    var filterKeys_1 = {
                        array: __spread(numberKeys, objectKeys, stringKeys),
                        integer: __spread(arrayKeys, objectKeys, stringKeys),
                        number: __spread(arrayKeys, objectKeys, stringKeys),
                        object: __spread(arrayKeys, numberKeys, stringKeys),
                        string: __spread(arrayKeys, numberKeys, objectKeys),
                        all: __spread(arrayKeys, numberKeys, objectKeys, stringKeys),
                    };
                    var anyOf = [];
                    var _loop_1 = function (type) {
                        var newType = typeof type === 'string' ? { type: type } : __assign({}, type);
                        Object.keys(newSchema)
                            .filter(function (key) { return !newType.hasOwnProperty(key) &&
                            !__spread((filterKeys_1[newType.type] || filterKeys_1.all), ['type', 'default']).includes(key); })
                            .forEach(function (key) { return newType[key] = newSchema[key]; });
                        anyOf.push(newType);
                    };
                    try {
                        for (var _b = __values(newSchema.type), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var type = _c.value;
                            _loop_1(type);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    newSchema = newSchema.hasOwnProperty('default') ?
                        { anyOf: anyOf, default: newSchema.default } : { anyOf: anyOf };
                }
                else {
                    var typeSchema = newSchema.type;
                    delete newSchema.type;
                    Object.assign(newSchema, typeSchema);
                }
            }
        }
        else {
            delete newSchema.type;
        }
    }
    Object.keys(newSchema)
        .filter(function (key) { return typeof newSchema[key] === 'object'; })
        .forEach(function (key) {
        if (['definitions', 'dependencies', 'properties', 'patternProperties']
            .includes(key) && typeof newSchema[key].map !== 'function') {
            var newKey_1 = {};
            Object.keys(newSchema[key]).forEach(function (subKey) { return newKey_1[subKey] =
                convertSchemaToDraft6(newSchema[key][subKey], { changed: changed, draft: draft }); });
            newSchema[key] = newKey_1;
        }
        else if (['items', 'additionalItems', 'additionalProperties',
            'allOf', 'anyOf', 'oneOf', 'not'].includes(key)) {
            newSchema[key] = convertSchemaToDraft6(newSchema[key], { changed: changed, draft: draft });
        }
        else {
            newSchema[key] = _.cloneDeep(newSchema[key]);
        }
    });
    return newSchema;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC1zY2hlbWEtdG8tZHJhZnQ2LmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nc2YvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2Z1bmN0aW9ucy9jb252ZXJ0LXNjaGVtYS10by1kcmFmdDYuZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUE7QUF1QjNCLE1BQU0sVUFBVSxxQkFBcUIsQ0FDbkMsTUFBVyxFQUNYLE9BQTBCOztJQUExQix3QkFBQSxFQUFBLFlBQTBCO0lBRTFCLElBQUksS0FBSyxHQUFXLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFBO0lBQ3pDLElBQUksT0FBTyxHQUFZLE9BQU8sQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFBO0lBRS9DLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1FBQzlCLE9BQU8sTUFBTSxDQUFBO0tBQ2Q7SUFDRCxJQUFJLE9BQU8sTUFBTSxDQUFDLEdBQUcsS0FBSyxVQUFVLEVBQUU7UUFDcEMsZ0JBQVcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLFNBQVMsSUFBSSxPQUFBLHFCQUFxQixDQUFDLFNBQVMsRUFBRSxFQUFDLE9BQU8sU0FBQSxFQUFFLEtBQUssT0FBQSxFQUFDLENBQUMsRUFBbEQsQ0FBa0QsQ0FBQyxFQUFDO0tBQ3hGO0lBQ0QsSUFBSSxTQUFTLGdCQUFPLE1BQU0sQ0FBQyxDQUFBO0lBQzNCLElBQU0sV0FBVyxHQUFHLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFekYsSUFBSSxPQUFPLFNBQVMsQ0FBQyxPQUFPLEtBQUssUUFBUTtRQUN2QyxtREFBbUQsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8s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RyxDQUFDLElBQUksT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLFVBQVUsRUFDNUQ7WUFDQSxJQUFNLFFBQU0sR0FBRyxFQUFFLENBQUE7WUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxRQUFNLENBQUMsTUFBTSxDQUFDO2dCQUMxRCxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBQyxPQUFPLFNBQUEsRUFBRSxLQUFLLE9BQUEsRUFBQyxDQUFDLEVBRG5CLENBQ21CLENBQ2hFLENBQUE7WUFDRCxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBTSxDQUFBO1NBQ3hCO2FBQU0sSUFDTCxDQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxzQkFBc0I7WUFDakQsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUNqRDtZQUNBLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBQyxPQUFPLFNBQUEsRUFBRSxLQUFLLE9BQUEsRUFBQyxDQUFDLENBQUE7U0FDekU7YUFBTTtZQUNMLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1NBQzdDO0lBQ0gsQ0FBQyxDQUFDLENBQUE7SUFFSixPQUFPLFNBQVMsQ0FBQTtBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnXG5cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uT2JqZWN0IHtcbiAgY2hhbmdlZD86IGJvb2xlYW5cbiAgZHJhZnQ/OiBudW1iZXJcbn1cblxuLyoqXG4gKiAnY29udmVydFNjaGVtYVRvRHJhZnQ2JyBmdW5jdGlvblxuICpcbiAqIENvbnZlcnRzIGEgSlNPTiBTY2hlbWEgZnJvbSBkcmFmdCAxIHRocm91Z2ggNCBmb3JtYXQgdG8gZHJhZnQgNiBmb3JtYXRcbiAqXG4gKiBJbnNwaXJlZCBieSBvbiBnZXJhaW50bHVmZidzIEpTT04gU2NoZW1hIDMgdG8gNCBjb21wYXRpYmlsaXR5IGZ1bmN0aW9uOlxuICogICBodHRwczovL2dpdGh1Yi5jb20vZ2VyYWludGx1ZmYvanNvbi1zY2hlbWEtY29tcGF0aWJpbGl0eVxuICogQWxzbyB1c2VzIHN1Z2dlc3Rpb25zIGZyb20gQUpWJ3MgSlNPTiBTY2hlbWEgNCB0byA2IG1pZ3JhdGlvbiBndWlkZTpcbiAqICAgaHR0cHM6Ly9naXRodWIuY29tL2Vwb2JlcmV6a2luL2Fqdi9yZWxlYXNlcy90YWcvNS4wLjBcbiAqIEFuZCBhZGRpdGlvbmFsIGRldGFpbHMgZnJvbSB0aGUgb2ZmaWNpYWwgSlNPTiBTY2hlbWEgZG9jdW1lbnRhdGlvbjpcbiAqICAgaHR0cDovL2pzb24tc2NoZW1hLm9yZ1xuICpcbiAqIEBwYXJhbSBzY2hlbWEgLSBKU09OIHNjaGVtYSAoZHJhZnQgMSwgMiwgMywgNCwgb3IgNilcbiAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uczogcGFyZW50IHNjaGVtYSBjaGFuZ2VkPywgc2NoZW1hIGRyYWZ0IG51bWJlcj9cbiAqIEByZXR1cm4gSlNPTiBzY2hlbWEgKGRyYWZ0IDYpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0U2NoZW1hVG9EcmFmdDYoXG4gIHNjaGVtYTogYW55LFxuICBvcHRpb25zOiBPcHRpb25PYmplY3QgPSB7fVxuKSB7XG4gIGxldCBkcmFmdDogbnVtYmVyID0gb3B0aW9ucy5kcmFmdCB8fCBudWxsXG4gIGxldCBjaGFuZ2VkOiBib29sZWFuID0gb3B0aW9ucy5jaGFuZ2VkIHx8IGZhbHNlXG5cbiAgaWYgKHR5cGVvZiBzY2hlbWEgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHNjaGVtYVxuICB9XG4gIGlmICh0eXBlb2Ygc2NoZW1hLm1hcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBbLi4uc2NoZW1hLm1hcChzdWJTY2hlbWEgPT4gY29udmVydFNjaGVtYVRvRHJhZnQ2KHN1YlNjaGVtYSwge2NoYW5nZWQsIGRyYWZ0fSkpXVxuICB9XG4gIGxldCBuZXdTY2hlbWEgPSB7Li4uc2NoZW1hfVxuICBjb25zdCBzaW1wbGVUeXBlcyA9IFsnYXJyYXknLCAnYm9vbGVhbicsICdpbnRlZ2VyJywgJ251bGwnLCAnbnVtYmVyJywgJ29iamVjdCcsICdzdHJpbmcnXVxuXG4gIGlmICh0eXBlb2YgbmV3U2NoZW1hLiRzY2hlbWEgPT09ICdzdHJpbmcnICYmXG4gICAgL2h0dHBcXDpcXC9cXC9qc29uXFwtc2NoZW1hXFwub3JnXFwvZHJhZnRcXC0wXFxkXFwvc2NoZW1hXFwjLy50ZXN0KG5ld1NjaGVtYS4kc2NoZW1hKVxuICApIHtcbiAgICBkcmFmdCA9IG5ld1NjaGVtYS4kc2NoZW1hWzMwXVxuICB9XG5cbiAgLy8gQ29udmVydCB2MS12MiAnY29udGVudEVuY29kaW5nJyB0byAnbWVkaWEuYmluYXJ5RW5jb2RpbmcnXG4gIC8vIE5vdGU6IFRoaXMgaXMgb25seSB1c2VkIGluIEpTT04gaHlwZXItc2NoZW1hIChub3QgcmVndWxhciBKU09OIHNjaGVtYSlcbiAgaWYgKG5ld1NjaGVtYS5jb250ZW50RW5jb2RpbmcpIHtcbiAgICBuZXdTY2hlbWEubWVkaWEgPSB7YmluYXJ5RW5jb2Rpbmc6IG5ld1NjaGVtYS5jb250ZW50RW5jb2Rpbmd9XG4gICAgZGVsZXRlIG5ld1NjaGVtYS5jb250ZW50RW5jb2RpbmdcbiAgICBjaGFuZ2VkID0gdHJ1ZVxuICB9XG5cbiAgLy8gQ29udmVydCB2MS12MyAnZXh0ZW5kcycgdG8gJ2FsbE9mJ1xuICBpZiAodHlwZW9mIG5ld1NjaGVtYS5leHRlbmRzID09PSAnb2JqZWN0Jykge1xuICAgIG5ld1NjaGVtYS5hbGxPZiA9IHR5cGVvZiBuZXdTY2hlbWEuZXh0ZW5kcy5tYXAgPT09ICdmdW5jdGlvbicgP1xuICAgICAgbmV3U2NoZW1hLmV4dGVuZHMubWFwKHN1YlNjaGVtYSA9PiBjb252ZXJ0U2NoZW1hVG9EcmFmdDYoc3ViU2NoZW1hLCB7Y2hhbmdlZCwgZHJhZnR9KSkgOlxuICAgICAgW2NvbnZlcnRTY2hlbWFUb0RyYWZ0NihuZXdTY2hlbWEuZXh0ZW5kcywge2NoYW5nZWQsIGRyYWZ0fSldXG4gICAgZGVsZXRlIG5ld1NjaGVtYS5leHRlbmRzXG4gICAgY2hhbmdlZCA9IHRydWVcbiAgfVxuXG4gIC8vIENvbnZlcnQgdjEtdjMgJ2Rpc2FsbG93JyB0byAnbm90J1xuICBpZiAobmV3U2NoZW1hLmRpc2FsbG93KSB7XG4gICAgaWYgKHR5cGVvZiBuZXdTY2hlbWEuZGlzYWxsb3cgPT09ICdzdHJpbmcnKSB7XG4gICAgICBuZXdTY2hlbWEubm90ID0ge3R5cGU6IG5ld1NjaGVtYS5kaXNhbGxvd31cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBuZXdTY2hlbWEuZGlzYWxsb3cubWFwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBuZXdTY2hlbWEubm90ID0ge1xuICAgICAgICBhbnlPZjogbmV3U2NoZW1hLmRpc2FsbG93XG4gICAgICAgICAgLm1hcCh0eXBlID0+IHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyA/IHR5cGUgOiB7dHlwZX0pXG4gICAgICB9XG4gICAgfVxuICAgIGRlbGV0ZSBuZXdTY2hlbWEuZGlzYWxsb3dcbiAgICBjaGFuZ2VkID0gdHJ1ZVxuICB9XG5cbiAgLy8gQ29udmVydCB2MyBzdHJpbmcgJ2RlcGVuZGVuY2llcycgcHJvcGVydGllcyB0byBhcnJheXNcbiAgaWYgKHR5cGVvZiBuZXdTY2hlbWEuZGVwZW5kZW5jaWVzID09PSAnb2JqZWN0JyAmJlxuICAgIE9iamVjdC5rZXlzKG5ld1NjaGVtYS5kZXBlbmRlbmNpZXMpXG4gICAgICAuc29tZShrZXkgPT4gdHlwZW9mIG5ld1NjaGVtYS5kZXBlbmRlbmNpZXNba2V5XSA9PT0gJ3N0cmluZycpXG4gICkge1xuICAgIG5ld1NjaGVtYS5kZXBlbmRlbmNpZXMgPSB7Li4ubmV3U2NoZW1hLmRlcGVuZGVuY2llc31cbiAgICBPYmplY3Qua2V5cyhuZXdTY2hlbWEuZGVwZW5kZW5jaWVzKVxuICAgICAgLmZpbHRlcihrZXkgPT4gdHlwZW9mIG5ld1NjaGVtYS5kZXBlbmRlbmNpZXNba2V5XSA9PT0gJ3N0cmluZycpXG4gICAgICAuZm9yRWFjaChrZXkgPT4gbmV3U2NoZW1hLmRlcGVuZGVuY2llc1trZXldID0gW25ld1NjaGVtYS5kZXBlbmRlbmNpZXNba2V5XV0pXG4gICAgY2hhbmdlZCA9IHRydWVcbiAgfVxuXG4gIC8vIENvbnZlcnQgdjEgJ21heERlY2ltYWwnIHRvICdtdWx0aXBsZU9mJ1xuICBpZiAodHlwZW9mIG5ld1NjaGVtYS5tYXhEZWNpbWFsID09PSAnbnVtYmVyJykge1xuICAgIG5ld1NjaGVtYS5tdWx0aXBsZU9mID0gMSAvIE1hdGgucG93KDEwLCBuZXdTY2hlbWEubWF4RGVjaW1hbClcbiAgICBkZWxldGUgbmV3U2NoZW1hLmRpdmlzaWJsZUJ5XG4gICAgY2hhbmdlZCA9IHRydWVcbiAgICBpZiAoIWRyYWZ0IHx8IGRyYWZ0ID09PSAyKSB7XG4gICAgICBkcmFmdCA9IDFcbiAgICB9XG4gIH1cblxuICAvLyBDb252ZXJ0IHYyLXYzICdkaXZpc2libGVCeScgdG8gJ211bHRpcGxlT2YnXG4gIGlmICh0eXBlb2YgbmV3U2NoZW1hLmRpdmlzaWJsZUJ5ID09PSAnbnVtYmVyJykge1xuICAgIG5ld1NjaGVtYS5tdWx0aXBsZU9mID0gbmV3U2NoZW1hLmRpdmlzaWJsZUJ5XG4gICAgZGVsZXRlIG5ld1NjaGVtYS5kaXZpc2libGVCeVxuICAgIGNoYW5nZWQgPSB0cnVlXG4gIH1cblxuICAvLyBDb252ZXJ0IHYxLXYyIGJvb2xlYW4gJ21pbmltdW1DYW5FcXVhbCcgdG8gJ2V4Y2x1c2l2ZU1pbmltdW0nXG4gIGlmICh0eXBlb2YgbmV3U2NoZW1hLm1pbmltdW0gPT09ICdudW1iZXInICYmIG5ld1NjaGVtYS5taW5pbXVtQ2FuRXF1YWwgPT09IGZhbHNlKSB7XG4gICAgbmV3U2NoZW1hLmV4Y2x1c2l2ZU1pbmltdW0gPSBuZXdTY2hlbWEubWluaW11bVxuICAgIGRlbGV0ZSBuZXdTY2hlbWEubWluaW11bVxuICAgIGNoYW5nZWQgPSB0cnVlXG4gICAgaWYgKCFkcmFmdCkge1xuICAgICAgZHJhZnQgPSAyXG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBuZXdTY2hlbWEubWluaW11bUNhbkVxdWFsID09PSAnYm9vbGVhbicpIHtcbiAgICBkZWxldGUgbmV3U2NoZW1hLm1pbmltdW1DYW5FcXVhbFxuICAgIGNoYW5nZWQgPSB0cnVlXG4gICAgaWYgKCFkcmFmdCkge1xuICAgICAgZHJhZnQgPSAyXG4gICAgfVxuICB9XG5cbiAgLy8gQ29udmVydCB2My12NCBib29sZWFuICdleGNsdXNpdmVNaW5pbXVtJyB0byBudW1lcmljXG4gIGlmICh0eXBlb2YgbmV3U2NoZW1hLm1pbmltdW0gPT09ICdudW1iZXInICYmIG5ld1NjaGVtYS5leGNsdXNpdmVNaW5pbXVtID09PSB0cnVlKSB7XG4gICAgbmV3U2NoZW1hLmV4Y2x1c2l2ZU1pbmltdW0gPSBuZXdTY2hlbWEubWluaW11bVxuICAgIGRlbGV0ZSBuZXdTY2hlbWEubWluaW11bVxuICAgIGNoYW5nZWQgPSB0cnVlXG4gIH0gZWxzZSBpZiAodHlwZW9mIG5ld1NjaGVtYS5leGNsdXNpdmVNaW5pbXVtID09PSAnYm9vbGVhbicpIHtcbiAgICBkZWxldGUgbmV3U2NoZW1hLmV4Y2x1c2l2ZU1pbmltdW1cbiAgICBjaGFuZ2VkID0gdHJ1ZVxuICB9XG5cbiAgLy8gQ29udmVydCB2MS12MiBib29sZWFuICdtYXhpbXVtQ2FuRXF1YWwnIHRvICdleGNsdXNpdmVNYXhpbXVtJ1xuICBpZiAodHlwZW9mIG5ld1NjaGVtYS5tYXhpbXVtID09PSAnbnVtYmVyJyAmJiBuZXdTY2hlbWEubWF4aW11bUNhbkVxdWFsID09PSBmYWxzZSkge1xuICAgIG5ld1NjaGVtYS5leGNsdXNpdmVNYXhpbXVtID0gbmV3U2NoZW1hLm1heGltdW1cbiAgICBkZWxldGUgbmV3U2NoZW1hLm1heGltdW1cbiAgICBjaGFuZ2VkID0gdHJ1ZVxuICAgIGlmICghZHJhZnQpIHtcbiAgICAgIGRyYWZ0ID0gMlxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgbmV3U2NoZW1hLm1heGltdW1DYW5FcXVhbCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgZGVsZXRlIG5ld1NjaGVtYS5tYXhpbXVtQ2FuRXF1YWxcbiAgICBjaGFuZ2VkID0gdHJ1ZVxuICAgIGlmICghZHJhZnQpIHtcbiAgICAgIGRyYWZ0ID0gMlxuICAgIH1cbiAgfVxuXG4gIC8vIENvbnZlcnQgdjMtdjQgYm9vbGVhbiAnZXhjbHVzaXZlTWF4aW11bScgdG8gbnVtZXJpY1xuICBpZiAodHlwZW9mIG5ld1NjaGVtYS5tYXhpbXVtID09PSAnbnVtYmVyJyAmJiBuZXdTY2hlbWEuZXhjbHVzaXZlTWF4aW11bSA9PT0gdHJ1ZSkge1xuICAgIG5ld1NjaGVtYS5leGNsdXNpdmVNYXhpbXVtID0gbmV3U2NoZW1hLm1heGltdW1cbiAgICBkZWxldGUgbmV3U2NoZW1hLm1heGltdW1cbiAgICBjaGFuZ2VkID0gdHJ1ZVxuICB9IGVsc2UgaWYgKHR5cGVvZiBuZXdTY2hlbWEuZXhjbHVzaXZlTWF4aW11bSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgZGVsZXRlIG5ld1NjaGVtYS5leGNsdXNpdmVNYXhpbXVtXG4gICAgY2hhbmdlZCA9IHRydWVcbiAgfVxuXG4gIC8vIFNlYXJjaCBvYmplY3QgJ3Byb3BlcnRpZXMnIGZvciAnb3B0aW9uYWwnLCAncmVxdWlyZWQnLCBhbmQgJ3JlcXVpcmVzJyBpdGVtcyxcbiAgLy8gYW5kIGNvbnZlcnQgdGhlbSBpbnRvIG9iamVjdCAncmVxdWlyZWQnIGFycmF5cyBhbmQgJ2RlcGVuZGVuY2llcycgb2JqZWN0c1xuICBpZiAodHlwZW9mIG5ld1NjaGVtYS5wcm9wZXJ0aWVzID09PSAnb2JqZWN0Jykge1xuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB7Li4ubmV3U2NoZW1hLnByb3BlcnRpZXN9XG4gICAgY29uc3QgcmVxdWlyZWRLZXlzID0gQXJyYXkuaXNBcnJheShuZXdTY2hlbWEucmVxdWlyZWQpID9cbiAgICAgIG5ldyBTZXQobmV3U2NoZW1hLnJlcXVpcmVkKSA6IG5ldyBTZXQoKVxuXG4gICAgLy8gQ29udmVydCB2MS12MiBib29sZWFuICdvcHRpb25hbCcgcHJvcGVydGllcyB0byAncmVxdWlyZWQnIGFycmF5XG4gICAgaWYgKGRyYWZ0ID09PSAxIHx8IGRyYWZ0ID09PSAyIHx8XG4gICAgICBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKS5zb21lKGtleSA9PiBwcm9wZXJ0aWVzW2tleV0ub3B0aW9uYWwgPT09IHRydWUpXG4gICAgKSB7XG4gICAgICBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBwcm9wZXJ0aWVzW2tleV0ub3B0aW9uYWwgIT09IHRydWUpXG4gICAgICAgIC5mb3JFYWNoKGtleSA9PiByZXF1aXJlZEtleXMuYWRkKGtleSkpXG4gICAgICBjaGFuZ2VkID0gdHJ1ZVxuICAgICAgaWYgKCFkcmFmdCkge1xuICAgICAgICBkcmFmdCA9IDJcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDb252ZXJ0IHYzIGJvb2xlYW4gJ3JlcXVpcmVkJyBwcm9wZXJ0aWVzIHRvICdyZXF1aXJlZCcgYXJyYXlcbiAgICBpZiAoT2JqZWN0LmtleXMocHJvcGVydGllcykuc29tZShrZXkgPT4gcHJvcGVydGllc1trZXldLnJlcXVpcmVkID09PSB0cnVlKSkge1xuICAgICAgT2JqZWN0LmtleXMocHJvcGVydGllcylcbiAgICAgICAgLmZpbHRlcihrZXkgPT4gcHJvcGVydGllc1trZXldLnJlcXVpcmVkID09PSB0cnVlKVxuICAgICAgICAuZm9yRWFjaChrZXkgPT4gcmVxdWlyZWRLZXlzLmFkZChrZXkpKVxuICAgICAgY2hhbmdlZCA9IHRydWVcbiAgICB9XG5cbiAgICBpZiAocmVxdWlyZWRLZXlzLnNpemUpIHtcbiAgICAgIG5ld1NjaGVtYS5yZXF1aXJlZCA9IEFycmF5LmZyb20ocmVxdWlyZWRLZXlzKVxuICAgIH1cblxuICAgIC8vIENvbnZlcnQgdjEtdjIgYXJyYXkgb3Igc3RyaW5nICdyZXF1aXJlcycgcHJvcGVydGllcyB0byAnZGVwZW5kZW5jaWVzJyBvYmplY3RcbiAgICBpZiAoT2JqZWN0LmtleXMocHJvcGVydGllcykuc29tZShrZXkgPT4gcHJvcGVydGllc1trZXldLnJlcXVpcmVzKSkge1xuICAgICAgY29uc3QgZGVwZW5kZW5jaWVzID0gdHlwZW9mIG5ld1NjaGVtYS5kZXBlbmRlbmNpZXMgPT09ICdvYmplY3QnID9cbiAgICAgICAgey4uLm5ld1NjaGVtYS5kZXBlbmRlbmNpZXN9IDoge31cbiAgICAgIE9iamVjdC5rZXlzKHByb3BlcnRpZXMpXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IHByb3BlcnRpZXNba2V5XS5yZXF1aXJlcylcbiAgICAgICAgLmZvckVhY2goa2V5ID0+IGRlcGVuZGVuY2llc1trZXldID1cbiAgICAgICAgICB0eXBlb2YgcHJvcGVydGllc1trZXldLnJlcXVpcmVzID09PSAnc3RyaW5nJyA/XG4gICAgICAgICAgICBbcHJvcGVydGllc1trZXldLnJlcXVpcmVzXSA6IHByb3BlcnRpZXNba2V5XS5yZXF1aXJlc1xuICAgICAgICApXG4gICAgICBuZXdTY2hlbWEuZGVwZW5kZW5jaWVzID0gZGVwZW5kZW5jaWVzXG4gICAgICBjaGFuZ2VkID0gdHJ1ZVxuICAgICAgaWYgKCFkcmFmdCkge1xuICAgICAgICBkcmFmdCA9IDJcbiAgICAgIH1cbiAgICB9XG5cbiAgICBuZXdTY2hlbWEucHJvcGVydGllcyA9IHByb3BlcnRpZXNcbiAgfVxuXG4gIC8vIFJldm92ZSB2MS12MiBib29sZWFuICdvcHRpb25hbCcga2V5XG4gIGlmICh0eXBlb2YgbmV3U2NoZW1hLm9wdGlvbmFsID09PSAnYm9vbGVhbicpIHtcbiAgICBkZWxldGUgbmV3U2NoZW1hLm9wdGlvbmFsXG4gICAgY2hhbmdlZCA9IHRydWVcbiAgICBpZiAoIWRyYWZ0KSB7XG4gICAgICBkcmFmdCA9IDJcbiAgICB9XG4gIH1cblxuICAvLyBSZXZvdmUgdjEtdjIgJ3JlcXVpcmVzJyBrZXlcbiAgaWYgKG5ld1NjaGVtYS5yZXF1aXJlcykge1xuICAgIGRlbGV0ZSBuZXdTY2hlbWEucmVxdWlyZXNcbiAgfVxuXG4gIC8vIFJldm92ZSB2MyBib29sZWFuICdyZXF1aXJlZCcga2V5XG4gIGlmICh0eXBlb2YgbmV3U2NoZW1hLnJlcXVpcmVkID09PSAnYm9vbGVhbicpIHtcbiAgICBkZWxldGUgbmV3U2NoZW1hLnJlcXVpcmVkXG4gIH1cblxuICAvLyBDb252ZXJ0IGlkIHRvICRpZFxuICBpZiAodHlwZW9mIG5ld1NjaGVtYS5pZCA9PT0gJ3N0cmluZycgJiYgIW5ld1NjaGVtYS4kaWQpIHtcbiAgICBpZiAobmV3U2NoZW1hLmlkLnNsaWNlKC0xKSA9PT0gJyMnKSB7XG4gICAgICBuZXdTY2hlbWEuaWQgPSBuZXdTY2hlbWEuaWQuc2xpY2UoMCwgLTEpXG4gICAgfVxuICAgIG5ld1NjaGVtYS4kaWQgPSBuZXdTY2hlbWEuaWQgKyAnLUNPTlZFUlRFRC1UTy1EUkFGVC0wNiMnXG4gICAgZGVsZXRlIG5ld1NjaGVtYS5pZFxuICAgIGNoYW5nZWQgPSB0cnVlXG4gIH1cblxuICAvLyBDaGVjayBpZiB2MS12MyAnYW55JyBvciBvYmplY3QgdHlwZXMgd2lsbCBiZSBjb252ZXJ0ZWRcbiAgaWYgKG5ld1NjaGVtYS50eXBlICYmICh0eXBlb2YgbmV3U2NoZW1hLnR5cGUuZXZlcnkgPT09ICdmdW5jdGlvbicgP1xuICAgICAgIW5ld1NjaGVtYS50eXBlLmV2ZXJ5KHR5cGUgPT4gc2ltcGxlVHlwZXMuaW5jbHVkZXModHlwZSkpIDpcbiAgICAgICFzaW1wbGVUeXBlcy5pbmNsdWRlcyhuZXdTY2hlbWEudHlwZSlcbiAgKSkge1xuICAgIGNoYW5nZWQgPSB0cnVlXG4gIH1cblxuICAvLyBJZiBzY2hlbWEgY2hhbmdlZCwgdXBkYXRlIG9yIHJlbW92ZSAkc2NoZW1hIGlkZW50aWZpZXJcbiAgaWYgKHR5cGVvZiBuZXdTY2hlbWEuJHNjaGVtYSA9PT0gJ3N0cmluZycgJiZcbiAgICAvaHR0cFxcOlxcL1xcL2pzb25cXC1zY2hlbWFcXC5vcmdcXC9kcmFmdFxcLTBbMS00XVxcL3NjaGVtYVxcIy8udGVzdChuZXdTY2hlbWEuJHNjaGVtYSlcbiAgKSB7XG4gICAgbmV3U2NoZW1hLiRzY2hlbWEgPSAnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNi9zY2hlbWEjJ1xuICAgIGNoYW5nZWQgPSB0cnVlXG4gIH0gZWxzZSBpZiAoY2hhbmdlZCAmJiB0eXBlb2YgbmV3U2NoZW1hLiRzY2hlbWEgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3QgYWRkVG9EZXNjcmlwdGlvbiA9ICdDb252ZXJ0ZWQgdG8gZHJhZnQgNiBmcm9tICcgKyBuZXdTY2hlbWEuJHNjaGVtYVxuICAgIGlmICh0eXBlb2YgbmV3U2NoZW1hLmRlc2NyaXB0aW9uID09PSAnc3RyaW5nJyAmJiBuZXdTY2hlbWEuZGVzY3JpcHRpb24ubGVuZ3RoKSB7XG4gICAgICBuZXdTY2hlbWEuZGVzY3JpcHRpb24gKz0gJ1xcbicgKyBhZGRUb0Rlc2NyaXB0aW9uXG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1NjaGVtYS5kZXNjcmlwdGlvbiA9IGFkZFRvRGVzY3JpcHRpb25cbiAgICB9XG4gICAgZGVsZXRlIG5ld1NjaGVtYS4kc2NoZW1hXG4gIH1cblxuICAvLyBDb252ZXJ0IHYxLXYzICdhbnknIGFuZCBvYmplY3QgdHlwZXNcbiAgaWYgKG5ld1NjaGVtYS50eXBlICYmICh0eXBlb2YgbmV3U2NoZW1hLnR5cGUuZXZlcnkgPT09ICdmdW5jdGlvbicgP1xuICAgICAgIW5ld1NjaGVtYS50eXBlLmV2ZXJ5KHR5cGUgPT4gc2ltcGxlVHlwZXMuaW5jbHVkZXModHlwZSkpIDpcbiAgICAgICFzaW1wbGVUeXBlcy5pbmNsdWRlcyhuZXdTY2hlbWEudHlwZSlcbiAgKSkge1xuICAgIGlmIChuZXdTY2hlbWEudHlwZS5sZW5ndGggPT09IDEpIHtcbiAgICAgIG5ld1NjaGVtYS50eXBlID0gbmV3U2NoZW1hLnR5cGVbMF1cbiAgICB9XG4gICAgaWYgKHR5cGVvZiBuZXdTY2hlbWEudHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIENvbnZlcnQgc3RyaW5nICdhbnknIHR5cGUgdG8gYXJyYXkgb2YgYWxsIHN0YW5kYXJkIHR5cGVzXG4gICAgICBpZiAobmV3U2NoZW1hLnR5cGUgPT09ICdhbnknKSB7XG4gICAgICAgIG5ld1NjaGVtYS50eXBlID0gc2ltcGxlVHlwZXNcbiAgICAgICAgLy8gRGVsZXRlIG5vbi1zdGFuZGFyZCBzdHJpbmcgdHlwZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIG5ld1NjaGVtYS50eXBlXG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbmV3U2NoZW1hLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAodHlwZW9mIG5ld1NjaGVtYS50eXBlLmV2ZXJ5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIElmIGFycmF5IG9mIHN0cmluZ3MsIG9ubHkgYWxsb3cgc3RhbmRhcmQgdHlwZXNcbiAgICAgICAgaWYgKG5ld1NjaGVtYS50eXBlLmV2ZXJ5KHR5cGUgPT4gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnKSkge1xuICAgICAgICAgIG5ld1NjaGVtYS50eXBlID0gbmV3U2NoZW1hLnR5cGUuc29tZSh0eXBlID0+IHR5cGUgPT09ICdhbnknKSA/XG4gICAgICAgICAgICBuZXdTY2hlbWEudHlwZSA9IHNpbXBsZVR5cGVzIDpcbiAgICAgICAgICAgIG5ld1NjaGVtYS50eXBlLmZpbHRlcih0eXBlID0+IHNpbXBsZVR5cGVzLmluY2x1ZGVzKHR5cGUpKVxuICAgICAgICAgIC8vIElmIHR5cGUgaXMgYW4gYXJyYXkgd2l0aCBvYmplY3RzLCBjb252ZXJ0IHRoZSBjdXJyZW50IHNjaGVtYSB0byBhbiAnYW55T2YnIGFycmF5XG4gICAgICAgIH0gZWxzZSBpZiAobmV3U2NoZW1hLnR5cGUubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGNvbnN0IGFycmF5S2V5cyA9IFsnYWRkaXRpb25hbEl0ZW1zJywgJ2l0ZW1zJywgJ21heEl0ZW1zJywgJ21pbkl0ZW1zJywgJ3VuaXF1ZUl0ZW1zJywgJ2NvbnRhaW5zJ11cbiAgICAgICAgICBjb25zdCBudW1iZXJLZXlzID0gWydtdWx0aXBsZU9mJywgJ21heGltdW0nLCAnZXhjbHVzaXZlTWF4aW11bScsICdtaW5pbXVtJywgJ2V4Y2x1c2l2ZU1pbmltdW0nXVxuICAgICAgICAgIGNvbnN0IG9iamVjdEtleXMgPSBbJ21heFByb3BlcnRpZXMnLCAnbWluUHJvcGVydGllcycsICdyZXF1aXJlZCcsICdhZGRpdGlvbmFsUHJvcGVydGllcycsXG4gICAgICAgICAgICAncHJvcGVydGllcycsICdwYXR0ZXJuUHJvcGVydGllcycsICdkZXBlbmRlbmNpZXMnLCAncHJvcGVydHlOYW1lcyddXG4gICAgICAgICAgY29uc3Qgc3RyaW5nS2V5cyA9IFsnbWF4TGVuZ3RoJywgJ21pbkxlbmd0aCcsICdwYXR0ZXJuJywgJ2Zvcm1hdCddXG4gICAgICAgICAgY29uc3QgZmlsdGVyS2V5cyA9IHtcbiAgICAgICAgICAgIGFycmF5OiBbLi4ubnVtYmVyS2V5cywgLi4ub2JqZWN0S2V5cywgLi4uc3RyaW5nS2V5c10sXG4gICAgICAgICAgICBpbnRlZ2VyOiBbLi4uYXJyYXlLZXlzLCAuLi5vYmplY3RLZXlzLCAuLi5zdHJpbmdLZXlzXSxcbiAgICAgICAgICAgIG51bWJlcjogWy4uLmFycmF5S2V5cywgLi4ub2JqZWN0S2V5cywgLi4uc3RyaW5nS2V5c10sXG4gICAgICAgICAgICBvYmplY3Q6IFsuLi5hcnJheUtleXMsIC4uLm51bWJlcktleXMsIC4uLnN0cmluZ0tleXNdLFxuICAgICAgICAgICAgc3RyaW5nOiBbLi4uYXJyYXlLZXlzLCAuLi5udW1iZXJLZXlzLCAuLi5vYmplY3RLZXlzXSxcbiAgICAgICAgICAgIGFsbDogWy4uLmFycmF5S2V5cywgLi4ubnVtYmVyS2V5cywgLi4ub2JqZWN0S2V5cywgLi4uc3RyaW5nS2V5c10sXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGFueU9mID0gW11cbiAgICAgICAgICBmb3IgKGNvbnN0IHR5cGUgb2YgbmV3U2NoZW1hLnR5cGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1R5cGUgPSB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgPyB7dHlwZX0gOiB7Li4udHlwZX1cbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG5ld1NjaGVtYSlcbiAgICAgICAgICAgICAgLmZpbHRlcihrZXkgPT4gIW5ld1R5cGUuaGFzT3duUHJvcGVydHkoa2V5KSAmJlxuICAgICAgICAgICAgICAgICFbLi4uKGZpbHRlcktleXNbbmV3VHlwZS50eXBlXSB8fCBmaWx0ZXJLZXlzLmFsbCksICd0eXBlJywgJ2RlZmF1bHQnXVxuICAgICAgICAgICAgICAgICAgLmluY2x1ZGVzKGtleSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuZm9yRWFjaChrZXkgPT4gbmV3VHlwZVtrZXldID0gbmV3U2NoZW1hW2tleV0pXG4gICAgICAgICAgICBhbnlPZi5wdXNoKG5ld1R5cGUpXG4gICAgICAgICAgfVxuICAgICAgICAgIG5ld1NjaGVtYSA9IG5ld1NjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnZGVmYXVsdCcpID9cbiAgICAgICAgICAgIHthbnlPZiwgZGVmYXVsdDogbmV3U2NoZW1hLmRlZmF1bHR9IDoge2FueU9mfVxuICAgICAgICAgIC8vIElmIHR5cGUgaXMgYW4gb2JqZWN0LCBtZXJnZSBpdCB3aXRoIHRoZSBjdXJyZW50IHNjaGVtYVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHR5cGVTY2hlbWEgPSBuZXdTY2hlbWEudHlwZVxuICAgICAgICAgIGRlbGV0ZSBuZXdTY2hlbWEudHlwZVxuICAgICAgICAgIE9iamVjdC5hc3NpZ24obmV3U2NoZW1hLCB0eXBlU2NoZW1hKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSBuZXdTY2hlbWEudHlwZVxuICAgIH1cbiAgfVxuXG4gIC8vIENvbnZlcnQgc3ViIHNjaGVtYXNcbiAgT2JqZWN0LmtleXMobmV3U2NoZW1hKVxuICAgIC5maWx0ZXIoa2V5ID0+IHR5cGVvZiBuZXdTY2hlbWFba2V5XSA9PT0gJ29iamVjdCcpXG4gICAgLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgWydkZWZpbml0aW9ucycsICdkZXBlbmRlbmNpZXMnLCAncHJvcGVydGllcycsICdwYXR0ZXJuUHJvcGVydGllcyddXG4gICAgICAgICAgLmluY2x1ZGVzKGtleSkgJiYgdHlwZW9mIG5ld1NjaGVtYVtrZXldLm1hcCAhPT0gJ2Z1bmN0aW9uJ1xuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IG5ld0tleSA9IHt9XG4gICAgICAgIE9iamVjdC5rZXlzKG5ld1NjaGVtYVtrZXldKS5mb3JFYWNoKHN1YktleSA9PiBuZXdLZXlbc3ViS2V5XSA9XG4gICAgICAgICAgY29udmVydFNjaGVtYVRvRHJhZnQ2KG5ld1NjaGVtYVtrZXldW3N1YktleV0sIHtjaGFuZ2VkLCBkcmFmdH0pXG4gICAgICAgIClcbiAgICAgICAgbmV3U2NoZW1hW2tleV0gPSBuZXdLZXlcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIFsnaXRlbXMnLCAnYWRkaXRpb25hbEl0ZW1zJywgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJyxcbiAgICAgICAgICAnYWxsT2YnLCAnYW55T2YnLCAnb25lT2YnLCAnbm90J10uaW5jbHVkZXMoa2V5KVxuICAgICAgKSB7XG4gICAgICAgIG5ld1NjaGVtYVtrZXldID0gY29udmVydFNjaGVtYVRvRHJhZnQ2KG5ld1NjaGVtYVtrZXldLCB7Y2hhbmdlZCwgZHJhZnR9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3U2NoZW1hW2tleV0gPSBfLmNsb25lRGVlcChuZXdTY2hlbWFba2V5XSlcbiAgICAgIH1cbiAgICB9KVxuXG4gIHJldHVybiBuZXdTY2hlbWFcbn1cbiJdfQ==