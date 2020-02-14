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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC1zY2hlbWEtdG8tZHJhZnQ2LmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdzZi1jb21tb24vIiwic291cmNlcyI6WyJsaWIvZnVuY3Rpb25zL2NvbnZlcnQtc2NoZW1hLXRvLWRyYWZ0Ni5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQTtBQXVCM0IsTUFBTSxVQUFVLHFCQUFxQixDQUNuQyxNQUFXLEVBQ1gsT0FBMEI7O0lBQTFCLHdCQUFBLEVBQUEsWUFBMEI7SUFFMUIsSUFBSSxLQUFLLEdBQVcsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUE7SUFDekMsSUFBSSxPQUFPLEdBQVksT0FBTyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUE7SUFFL0MsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7UUFDOUIsT0FBTyxNQUFNLENBQUE7S0FDZDtJQUNELElBQUksT0FBTyxNQUFNLENBQUMsR0FBRyxLQUFLLFVBQVUsRUFBRTtRQUNwQyxnQkFBVyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsU0FBUyxJQUFJLE9BQUEscUJBQXFCLENBQUMsU0FBUyxFQUFFLEVBQUMsT0FBTyxTQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUMsQ0FBQyxFQUFsRCxDQUFrRCxDQUFDLEVBQUM7S0FDeEY7SUFDRCxJQUFJLFNBQVMsZ0JBQU8sTUFBTSxDQUFDLENBQUE7SUFDM0IsSUFBTSxXQUFXLEdBQUcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUV6RixJQUFJLE9BQU8sU0FBUyxDQUFDLE9BQU8sS0FBSyxRQUFRO1FBQ3ZDLG1EQUFtRCxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxD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LENBQUMsSUFBSSxPQUFPLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssVUFBVSxFQUM1RDtZQUNBLElBQU0sUUFBTSxHQUFHLEVBQUUsQ0FBQTtZQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLFFBQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQzFELHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFDLE9BQU8sU0FBQSxFQUFFLEtBQUssT0FBQSxFQUFDLENBQUMsRUFEbkIsQ0FDbUIsQ0FDaEUsQ0FBQTtZQUNELFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFNLENBQUE7U0FDeEI7YUFBTSxJQUNMLENBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHNCQUFzQjtZQUNqRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQ2pEO1lBQ0EsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFDLE9BQU8sU0FBQSxFQUFFLEtBQUssT0FBQSxFQUFDLENBQUMsQ0FBQTtTQUN6RTthQUFNO1lBQ0wsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7U0FDN0M7SUFDSCxDQUFDLENBQUMsQ0FBQTtJQUVKLE9BQU8sU0FBUyxDQUFBO0FBQ2xCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCdcblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25PYmplY3Qge1xuICBjaGFuZ2VkPzogYm9vbGVhblxuICBkcmFmdD86IG51bWJlclxufVxuXG4vKipcbiAqICdjb252ZXJ0U2NoZW1hVG9EcmFmdDYnIGZ1bmN0aW9uXG4gKlxuICogQ29udmVydHMgYSBKU09OIFNjaGVtYSBmcm9tIGRyYWZ0IDEgdGhyb3VnaCA0IGZvcm1hdCB0byBkcmFmdCA2IGZvcm1hdFxuICpcbiAqIEluc3BpcmVkIGJ5IG9uIGdlcmFpbnRsdWZmJ3MgSlNPTiBTY2hlbWEgMyB0byA0IGNvbXBhdGliaWxpdHkgZnVuY3Rpb246XG4gKiAgIGh0dHBzOi8vZ2l0aHViLmNvbS9nZXJhaW50bHVmZi9qc29uLXNjaGVtYS1jb21wYXRpYmlsaXR5XG4gKiBBbHNvIHVzZXMgc3VnZ2VzdGlvbnMgZnJvbSBBSlYncyBKU09OIFNjaGVtYSA0IHRvIDYgbWlncmF0aW9uIGd1aWRlOlxuICogICBodHRwczovL2dpdGh1Yi5jb20vZXBvYmVyZXpraW4vYWp2L3JlbGVhc2VzL3RhZy81LjAuMFxuICogQW5kIGFkZGl0aW9uYWwgZGV0YWlscyBmcm9tIHRoZSBvZmZpY2lhbCBKU09OIFNjaGVtYSBkb2N1bWVudGF0aW9uOlxuICogICBodHRwOi8vanNvbi1zY2hlbWEub3JnXG4gKlxuICogQHBhcmFtIHNjaGVtYSAtIEpTT04gc2NoZW1hIChkcmFmdCAxLCAyLCAzLCA0LCBvciA2KVxuICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25zOiBwYXJlbnQgc2NoZW1hIGNoYW5nZWQ/LCBzY2hlbWEgZHJhZnQgbnVtYmVyP1xuICogQHJldHVybiBKU09OIHNjaGVtYSAoZHJhZnQgNilcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRTY2hlbWFUb0RyYWZ0NihcbiAgc2NoZW1hOiBhbnksXG4gIG9wdGlvbnM6IE9wdGlvbk9iamVjdCA9IHt9XG4pIHtcbiAgbGV0IGRyYWZ0OiBudW1iZXIgPSBvcHRpb25zLmRyYWZ0IHx8IG51bGxcbiAgbGV0IGNoYW5nZWQ6IGJvb2xlYW4gPSBvcHRpb25zLmNoYW5nZWQgfHwgZmFsc2VcblxuICBpZiAodHlwZW9mIHNjaGVtYSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gc2NoZW1hXG4gIH1cbiAgaWYgKHR5cGVvZiBzY2hlbWEubWFwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIFsuLi5zY2hlbWEubWFwKHN1YlNjaGVtYSA9PiBjb252ZXJ0U2NoZW1hVG9EcmFmdDYoc3ViU2NoZW1hLCB7Y2hhbmdlZCwgZHJhZnR9KSldXG4gIH1cbiAgbGV0IG5ld1NjaGVtYSA9IHsuLi5zY2hlbWF9XG4gIGNvbnN0IHNpbXBsZVR5cGVzID0gWydhcnJheScsICdib29sZWFuJywgJ2ludGVnZXInLCAnbnVsbCcsICdudW1iZXInLCAnb2JqZWN0JywgJ3N0cmluZyddXG5cbiAgaWYgKHR5cGVvZiBuZXdTY2hlbWEuJHNjaGVtYSA9PT0gJ3N0cmluZycgJiZcbiAgICAvaHR0cFxcOlxcL1xcL2pzb25cXC1zY2hlbWFcXC5vcmdcXC9kcmFmdFxcLTBcXGRcXC9zY2hlbWFcXCMvLnRlc3QobmV3U2NoZW1hLiRzY2hlbWEpXG4gICkge1xuICAgIGRyYWZ0ID0gbmV3U2NoZW1hLiRzY2hlbWFbMzBdXG4gIH1cblxuICAvLyBDb252ZXJ0IHYxLXYyICdjb250ZW50RW5jb2RpbmcnIHRvICdtZWRpYS5iaW5hcnlFbmNvZGluZydcbiAgLy8gTm90ZTogVGhpcyBpcyBvbmx5IHVzZWQgaW4gSlNPTiBoeXBlci1zY2hlbWEgKG5vdCByZWd1bGFyIEpTT04gc2NoZW1hKVxuICBpZiAobmV3U2NoZW1hLmNvbnRlbnRFbmNvZGluZykge1xuICAgIG5ld1NjaGVtYS5tZWRpYSA9IHtiaW5hcnlFbmNvZGluZzogbmV3U2NoZW1hLmNvbnRlbnRFbmNvZGluZ31cbiAgICBkZWxldGUgbmV3U2NoZW1hLmNvbnRlbnRFbmNvZGluZ1xuICAgIGNoYW5nZWQgPSB0cnVlXG4gIH1cblxuICAvLyBDb252ZXJ0IHYxLXYzICdleHRlbmRzJyB0byAnYWxsT2YnXG4gIGlmICh0eXBlb2YgbmV3U2NoZW1hLmV4dGVuZHMgPT09ICdvYmplY3QnKSB7XG4gICAgbmV3U2NoZW1hLmFsbE9mID0gdHlwZW9mIG5ld1NjaGVtYS5leHRlbmRzLm1hcCA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgICBuZXdTY2hlbWEuZXh0ZW5kcy5tYXAoc3ViU2NoZW1hID0+IGNvbnZlcnRTY2hlbWFUb0RyYWZ0NihzdWJTY2hlbWEsIHtjaGFuZ2VkLCBkcmFmdH0pKSA6XG4gICAgICBbY29udmVydFNjaGVtYVRvRHJhZnQ2KG5ld1NjaGVtYS5leHRlbmRzLCB7Y2hhbmdlZCwgZHJhZnR9KV1cbiAgICBkZWxldGUgbmV3U2NoZW1hLmV4dGVuZHNcbiAgICBjaGFuZ2VkID0gdHJ1ZVxuICB9XG5cbiAgLy8gQ29udmVydCB2MS12MyAnZGlzYWxsb3cnIHRvICdub3QnXG4gIGlmIChuZXdTY2hlbWEuZGlzYWxsb3cpIHtcbiAgICBpZiAodHlwZW9mIG5ld1NjaGVtYS5kaXNhbGxvdyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG5ld1NjaGVtYS5ub3QgPSB7dHlwZTogbmV3U2NoZW1hLmRpc2FsbG93fVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIG5ld1NjaGVtYS5kaXNhbGxvdy5tYXAgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG5ld1NjaGVtYS5ub3QgPSB7XG4gICAgICAgIGFueU9mOiBuZXdTY2hlbWEuZGlzYWxsb3dcbiAgICAgICAgICAubWFwKHR5cGUgPT4gdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnID8gdHlwZSA6IHt0eXBlfSlcbiAgICAgIH1cbiAgICB9XG4gICAgZGVsZXRlIG5ld1NjaGVtYS5kaXNhbGxvd1xuICAgIGNoYW5nZWQgPSB0cnVlXG4gIH1cblxuICAvLyBDb252ZXJ0IHYzIHN0cmluZyAnZGVwZW5kZW5jaWVzJyBwcm9wZXJ0aWVzIHRvIGFycmF5c1xuICBpZiAodHlwZW9mIG5ld1NjaGVtYS5kZXBlbmRlbmNpZXMgPT09ICdvYmplY3QnICYmXG4gICAgT2JqZWN0LmtleXMobmV3U2NoZW1hLmRlcGVuZGVuY2llcylcbiAgICAgIC5zb21lKGtleSA9PiB0eXBlb2YgbmV3U2NoZW1hLmRlcGVuZGVuY2llc1trZXldID09PSAnc3RyaW5nJylcbiAgKSB7XG4gICAgbmV3U2NoZW1hLmRlcGVuZGVuY2llcyA9IHsuLi5uZXdTY2hlbWEuZGVwZW5kZW5jaWVzfVxuICAgIE9iamVjdC5rZXlzKG5ld1NjaGVtYS5kZXBlbmRlbmNpZXMpXG4gICAgICAuZmlsdGVyKGtleSA9PiB0eXBlb2YgbmV3U2NoZW1hLmRlcGVuZGVuY2llc1trZXldID09PSAnc3RyaW5nJylcbiAgICAgIC5mb3JFYWNoKGtleSA9PiBuZXdTY2hlbWEuZGVwZW5kZW5jaWVzW2tleV0gPSBbbmV3U2NoZW1hLmRlcGVuZGVuY2llc1trZXldXSlcbiAgICBjaGFuZ2VkID0gdHJ1ZVxuICB9XG5cbiAgLy8gQ29udmVydCB2MSAnbWF4RGVjaW1hbCcgdG8gJ211bHRpcGxlT2YnXG4gIGlmICh0eXBlb2YgbmV3U2NoZW1hLm1heERlY2ltYWwgPT09ICdudW1iZXInKSB7XG4gICAgbmV3U2NoZW1hLm11bHRpcGxlT2YgPSAxIC8gTWF0aC5wb3coMTAsIG5ld1NjaGVtYS5tYXhEZWNpbWFsKVxuICAgIGRlbGV0ZSBuZXdTY2hlbWEuZGl2aXNpYmxlQnlcbiAgICBjaGFuZ2VkID0gdHJ1ZVxuICAgIGlmICghZHJhZnQgfHwgZHJhZnQgPT09IDIpIHtcbiAgICAgIGRyYWZ0ID0gMVxuICAgIH1cbiAgfVxuXG4gIC8vIENvbnZlcnQgdjItdjMgJ2RpdmlzaWJsZUJ5JyB0byAnbXVsdGlwbGVPZidcbiAgaWYgKHR5cGVvZiBuZXdTY2hlbWEuZGl2aXNpYmxlQnkgPT09ICdudW1iZXInKSB7XG4gICAgbmV3U2NoZW1hLm11bHRpcGxlT2YgPSBuZXdTY2hlbWEuZGl2aXNpYmxlQnlcbiAgICBkZWxldGUgbmV3U2NoZW1hLmRpdmlzaWJsZUJ5XG4gICAgY2hhbmdlZCA9IHRydWVcbiAgfVxuXG4gIC8vIENvbnZlcnQgdjEtdjIgYm9vbGVhbiAnbWluaW11bUNhbkVxdWFsJyB0byAnZXhjbHVzaXZlTWluaW11bSdcbiAgaWYgKHR5cGVvZiBuZXdTY2hlbWEubWluaW11bSA9PT0gJ251bWJlcicgJiYgbmV3U2NoZW1hLm1pbmltdW1DYW5FcXVhbCA9PT0gZmFsc2UpIHtcbiAgICBuZXdTY2hlbWEuZXhjbHVzaXZlTWluaW11bSA9IG5ld1NjaGVtYS5taW5pbXVtXG4gICAgZGVsZXRlIG5ld1NjaGVtYS5taW5pbXVtXG4gICAgY2hhbmdlZCA9IHRydWVcbiAgICBpZiAoIWRyYWZ0KSB7XG4gICAgICBkcmFmdCA9IDJcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIG5ld1NjaGVtYS5taW5pbXVtQ2FuRXF1YWwgPT09ICdib29sZWFuJykge1xuICAgIGRlbGV0ZSBuZXdTY2hlbWEubWluaW11bUNhbkVxdWFsXG4gICAgY2hhbmdlZCA9IHRydWVcbiAgICBpZiAoIWRyYWZ0KSB7XG4gICAgICBkcmFmdCA9IDJcbiAgICB9XG4gIH1cblxuICAvLyBDb252ZXJ0IHYzLXY0IGJvb2xlYW4gJ2V4Y2x1c2l2ZU1pbmltdW0nIHRvIG51bWVyaWNcbiAgaWYgKHR5cGVvZiBuZXdTY2hlbWEubWluaW11bSA9PT0gJ251bWJlcicgJiYgbmV3U2NoZW1hLmV4Y2x1c2l2ZU1pbmltdW0gPT09IHRydWUpIHtcbiAgICBuZXdTY2hlbWEuZXhjbHVzaXZlTWluaW11bSA9IG5ld1NjaGVtYS5taW5pbXVtXG4gICAgZGVsZXRlIG5ld1NjaGVtYS5taW5pbXVtXG4gICAgY2hhbmdlZCA9IHRydWVcbiAgfSBlbHNlIGlmICh0eXBlb2YgbmV3U2NoZW1hLmV4Y2x1c2l2ZU1pbmltdW0gPT09ICdib29sZWFuJykge1xuICAgIGRlbGV0ZSBuZXdTY2hlbWEuZXhjbHVzaXZlTWluaW11bVxuICAgIGNoYW5nZWQgPSB0cnVlXG4gIH1cblxuICAvLyBDb252ZXJ0IHYxLXYyIGJvb2xlYW4gJ21heGltdW1DYW5FcXVhbCcgdG8gJ2V4Y2x1c2l2ZU1heGltdW0nXG4gIGlmICh0eXBlb2YgbmV3U2NoZW1hLm1heGltdW0gPT09ICdudW1iZXInICYmIG5ld1NjaGVtYS5tYXhpbXVtQ2FuRXF1YWwgPT09IGZhbHNlKSB7XG4gICAgbmV3U2NoZW1hLmV4Y2x1c2l2ZU1heGltdW0gPSBuZXdTY2hlbWEubWF4aW11bVxuICAgIGRlbGV0ZSBuZXdTY2hlbWEubWF4aW11bVxuICAgIGNoYW5nZWQgPSB0cnVlXG4gICAgaWYgKCFkcmFmdCkge1xuICAgICAgZHJhZnQgPSAyXG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBuZXdTY2hlbWEubWF4aW11bUNhbkVxdWFsID09PSAnYm9vbGVhbicpIHtcbiAgICBkZWxldGUgbmV3U2NoZW1hLm1heGltdW1DYW5FcXVhbFxuICAgIGNoYW5nZWQgPSB0cnVlXG4gICAgaWYgKCFkcmFmdCkge1xuICAgICAgZHJhZnQgPSAyXG4gICAgfVxuICB9XG5cbiAgLy8gQ29udmVydCB2My12NCBib29sZWFuICdleGNsdXNpdmVNYXhpbXVtJyB0byBudW1lcmljXG4gIGlmICh0eXBlb2YgbmV3U2NoZW1hLm1heGltdW0gPT09ICdudW1iZXInICYmIG5ld1NjaGVtYS5leGNsdXNpdmVNYXhpbXVtID09PSB0cnVlKSB7XG4gICAgbmV3U2NoZW1hLmV4Y2x1c2l2ZU1heGltdW0gPSBuZXdTY2hlbWEubWF4aW11bVxuICAgIGRlbGV0ZSBuZXdTY2hlbWEubWF4aW11bVxuICAgIGNoYW5nZWQgPSB0cnVlXG4gIH0gZWxzZSBpZiAodHlwZW9mIG5ld1NjaGVtYS5leGNsdXNpdmVNYXhpbXVtID09PSAnYm9vbGVhbicpIHtcbiAgICBkZWxldGUgbmV3U2NoZW1hLmV4Y2x1c2l2ZU1heGltdW1cbiAgICBjaGFuZ2VkID0gdHJ1ZVxuICB9XG5cbiAgLy8gU2VhcmNoIG9iamVjdCAncHJvcGVydGllcycgZm9yICdvcHRpb25hbCcsICdyZXF1aXJlZCcsIGFuZCAncmVxdWlyZXMnIGl0ZW1zLFxuICAvLyBhbmQgY29udmVydCB0aGVtIGludG8gb2JqZWN0ICdyZXF1aXJlZCcgYXJyYXlzIGFuZCAnZGVwZW5kZW5jaWVzJyBvYmplY3RzXG4gIGlmICh0eXBlb2YgbmV3U2NoZW1hLnByb3BlcnRpZXMgPT09ICdvYmplY3QnKSB7XG4gICAgY29uc3QgcHJvcGVydGllcyA9IHsuLi5uZXdTY2hlbWEucHJvcGVydGllc31cbiAgICBjb25zdCByZXF1aXJlZEtleXMgPSBBcnJheS5pc0FycmF5KG5ld1NjaGVtYS5yZXF1aXJlZCkgP1xuICAgICAgbmV3IFNldChuZXdTY2hlbWEucmVxdWlyZWQpIDogbmV3IFNldCgpXG5cbiAgICAvLyBDb252ZXJ0IHYxLXYyIGJvb2xlYW4gJ29wdGlvbmFsJyBwcm9wZXJ0aWVzIHRvICdyZXF1aXJlZCcgYXJyYXlcbiAgICBpZiAoZHJhZnQgPT09IDEgfHwgZHJhZnQgPT09IDIgfHxcbiAgICAgIE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLnNvbWUoa2V5ID0+IHByb3BlcnRpZXNba2V5XS5vcHRpb25hbCA9PT0gdHJ1ZSlcbiAgICApIHtcbiAgICAgIE9iamVjdC5rZXlzKHByb3BlcnRpZXMpXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IHByb3BlcnRpZXNba2V5XS5vcHRpb25hbCAhPT0gdHJ1ZSlcbiAgICAgICAgLmZvckVhY2goa2V5ID0+IHJlcXVpcmVkS2V5cy5hZGQoa2V5KSlcbiAgICAgIGNoYW5nZWQgPSB0cnVlXG4gICAgICBpZiAoIWRyYWZ0KSB7XG4gICAgICAgIGRyYWZ0ID0gMlxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENvbnZlcnQgdjMgYm9vbGVhbiAncmVxdWlyZWQnIHByb3BlcnRpZXMgdG8gJ3JlcXVpcmVkJyBhcnJheVxuICAgIGlmIChPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKS5zb21lKGtleSA9PiBwcm9wZXJ0aWVzW2tleV0ucmVxdWlyZWQgPT09IHRydWUpKSB7XG4gICAgICBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBwcm9wZXJ0aWVzW2tleV0ucmVxdWlyZWQgPT09IHRydWUpXG4gICAgICAgIC5mb3JFYWNoKGtleSA9PiByZXF1aXJlZEtleXMuYWRkKGtleSkpXG4gICAgICBjaGFuZ2VkID0gdHJ1ZVxuICAgIH1cblxuICAgIGlmIChyZXF1aXJlZEtleXMuc2l6ZSkge1xuICAgICAgbmV3U2NoZW1hLnJlcXVpcmVkID0gQXJyYXkuZnJvbShyZXF1aXJlZEtleXMpXG4gICAgfVxuXG4gICAgLy8gQ29udmVydCB2MS12MiBhcnJheSBvciBzdHJpbmcgJ3JlcXVpcmVzJyBwcm9wZXJ0aWVzIHRvICdkZXBlbmRlbmNpZXMnIG9iamVjdFxuICAgIGlmIChPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKS5zb21lKGtleSA9PiBwcm9wZXJ0aWVzW2tleV0ucmVxdWlyZXMpKSB7XG4gICAgICBjb25zdCBkZXBlbmRlbmNpZXMgPSB0eXBlb2YgbmV3U2NoZW1hLmRlcGVuZGVuY2llcyA9PT0gJ29iamVjdCcgP1xuICAgICAgICB7Li4ubmV3U2NoZW1hLmRlcGVuZGVuY2llc30gOiB7fVxuICAgICAgT2JqZWN0LmtleXMocHJvcGVydGllcylcbiAgICAgICAgLmZpbHRlcihrZXkgPT4gcHJvcGVydGllc1trZXldLnJlcXVpcmVzKVxuICAgICAgICAuZm9yRWFjaChrZXkgPT4gZGVwZW5kZW5jaWVzW2tleV0gPVxuICAgICAgICAgIHR5cGVvZiBwcm9wZXJ0aWVzW2tleV0ucmVxdWlyZXMgPT09ICdzdHJpbmcnID9cbiAgICAgICAgICAgIFtwcm9wZXJ0aWVzW2tleV0ucmVxdWlyZXNdIDogcHJvcGVydGllc1trZXldLnJlcXVpcmVzXG4gICAgICAgIClcbiAgICAgIG5ld1NjaGVtYS5kZXBlbmRlbmNpZXMgPSBkZXBlbmRlbmNpZXNcbiAgICAgIGNoYW5nZWQgPSB0cnVlXG4gICAgICBpZiAoIWRyYWZ0KSB7XG4gICAgICAgIGRyYWZ0ID0gMlxuICAgICAgfVxuICAgIH1cblxuICAgIG5ld1NjaGVtYS5wcm9wZXJ0aWVzID0gcHJvcGVydGllc1xuICB9XG5cbiAgLy8gUmV2b3ZlIHYxLXYyIGJvb2xlYW4gJ29wdGlvbmFsJyBrZXlcbiAgaWYgKHR5cGVvZiBuZXdTY2hlbWEub3B0aW9uYWwgPT09ICdib29sZWFuJykge1xuICAgIGRlbGV0ZSBuZXdTY2hlbWEub3B0aW9uYWxcbiAgICBjaGFuZ2VkID0gdHJ1ZVxuICAgIGlmICghZHJhZnQpIHtcbiAgICAgIGRyYWZ0ID0gMlxuICAgIH1cbiAgfVxuXG4gIC8vIFJldm92ZSB2MS12MiAncmVxdWlyZXMnIGtleVxuICBpZiAobmV3U2NoZW1hLnJlcXVpcmVzKSB7XG4gICAgZGVsZXRlIG5ld1NjaGVtYS5yZXF1aXJlc1xuICB9XG5cbiAgLy8gUmV2b3ZlIHYzIGJvb2xlYW4gJ3JlcXVpcmVkJyBrZXlcbiAgaWYgKHR5cGVvZiBuZXdTY2hlbWEucmVxdWlyZWQgPT09ICdib29sZWFuJykge1xuICAgIGRlbGV0ZSBuZXdTY2hlbWEucmVxdWlyZWRcbiAgfVxuXG4gIC8vIENvbnZlcnQgaWQgdG8gJGlkXG4gIGlmICh0eXBlb2YgbmV3U2NoZW1hLmlkID09PSAnc3RyaW5nJyAmJiAhbmV3U2NoZW1hLiRpZCkge1xuICAgIGlmIChuZXdTY2hlbWEuaWQuc2xpY2UoLTEpID09PSAnIycpIHtcbiAgICAgIG5ld1NjaGVtYS5pZCA9IG5ld1NjaGVtYS5pZC5zbGljZSgwLCAtMSlcbiAgICB9XG4gICAgbmV3U2NoZW1hLiRpZCA9IG5ld1NjaGVtYS5pZCArICctQ09OVkVSVEVELVRPLURSQUZULTA2IydcbiAgICBkZWxldGUgbmV3U2NoZW1hLmlkXG4gICAgY2hhbmdlZCA9IHRydWVcbiAgfVxuXG4gIC8vIENoZWNrIGlmIHYxLXYzICdhbnknIG9yIG9iamVjdCB0eXBlcyB3aWxsIGJlIGNvbnZlcnRlZFxuICBpZiAobmV3U2NoZW1hLnR5cGUgJiYgKHR5cGVvZiBuZXdTY2hlbWEudHlwZS5ldmVyeSA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAhbmV3U2NoZW1hLnR5cGUuZXZlcnkodHlwZSA9PiBzaW1wbGVUeXBlcy5pbmNsdWRlcyh0eXBlKSkgOlxuICAgICAgIXNpbXBsZVR5cGVzLmluY2x1ZGVzKG5ld1NjaGVtYS50eXBlKVxuICApKSB7XG4gICAgY2hhbmdlZCA9IHRydWVcbiAgfVxuXG4gIC8vIElmIHNjaGVtYSBjaGFuZ2VkLCB1cGRhdGUgb3IgcmVtb3ZlICRzY2hlbWEgaWRlbnRpZmllclxuICBpZiAodHlwZW9mIG5ld1NjaGVtYS4kc2NoZW1hID09PSAnc3RyaW5nJyAmJlxuICAgIC9odHRwXFw6XFwvXFwvanNvblxcLXNjaGVtYVxcLm9yZ1xcL2RyYWZ0XFwtMFsxLTRdXFwvc2NoZW1hXFwjLy50ZXN0KG5ld1NjaGVtYS4kc2NoZW1hKVxuICApIHtcbiAgICBuZXdTY2hlbWEuJHNjaGVtYSA9ICdodHRwOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LTA2L3NjaGVtYSMnXG4gICAgY2hhbmdlZCA9IHRydWVcbiAgfSBlbHNlIGlmIChjaGFuZ2VkICYmIHR5cGVvZiBuZXdTY2hlbWEuJHNjaGVtYSA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25zdCBhZGRUb0Rlc2NyaXB0aW9uID0gJ0NvbnZlcnRlZCB0byBkcmFmdCA2IGZyb20gJyArIG5ld1NjaGVtYS4kc2NoZW1hXG4gICAgaWYgKHR5cGVvZiBuZXdTY2hlbWEuZGVzY3JpcHRpb24gPT09ICdzdHJpbmcnICYmIG5ld1NjaGVtYS5kZXNjcmlwdGlvbi5sZW5ndGgpIHtcbiAgICAgIG5ld1NjaGVtYS5kZXNjcmlwdGlvbiArPSAnXFxuJyArIGFkZFRvRGVzY3JpcHRpb25cbiAgICB9IGVsc2Uge1xuICAgICAgbmV3U2NoZW1hLmRlc2NyaXB0aW9uID0gYWRkVG9EZXNjcmlwdGlvblxuICAgIH1cbiAgICBkZWxldGUgbmV3U2NoZW1hLiRzY2hlbWFcbiAgfVxuXG4gIC8vIENvbnZlcnQgdjEtdjMgJ2FueScgYW5kIG9iamVjdCB0eXBlc1xuICBpZiAobmV3U2NoZW1hLnR5cGUgJiYgKHR5cGVvZiBuZXdTY2hlbWEudHlwZS5ldmVyeSA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAhbmV3U2NoZW1hLnR5cGUuZXZlcnkodHlwZSA9PiBzaW1wbGVUeXBlcy5pbmNsdWRlcyh0eXBlKSkgOlxuICAgICAgIXNpbXBsZVR5cGVzLmluY2x1ZGVzKG5ld1NjaGVtYS50eXBlKVxuICApKSB7XG4gICAgaWYgKG5ld1NjaGVtYS50eXBlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgbmV3U2NoZW1hLnR5cGUgPSBuZXdTY2hlbWEudHlwZVswXVxuICAgIH1cbiAgICBpZiAodHlwZW9mIG5ld1NjaGVtYS50eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gQ29udmVydCBzdHJpbmcgJ2FueScgdHlwZSB0byBhcnJheSBvZiBhbGwgc3RhbmRhcmQgdHlwZXNcbiAgICAgIGlmIChuZXdTY2hlbWEudHlwZSA9PT0gJ2FueScpIHtcbiAgICAgICAgbmV3U2NoZW1hLnR5cGUgPSBzaW1wbGVUeXBlc1xuICAgICAgICAvLyBEZWxldGUgbm9uLXN0YW5kYXJkIHN0cmluZyB0eXBlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgbmV3U2NoZW1hLnR5cGVcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBuZXdTY2hlbWEudHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICh0eXBlb2YgbmV3U2NoZW1hLnR5cGUuZXZlcnkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gSWYgYXJyYXkgb2Ygc3RyaW5ncywgb25seSBhbGxvdyBzdGFuZGFyZCB0eXBlc1xuICAgICAgICBpZiAobmV3U2NoZW1hLnR5cGUuZXZlcnkodHlwZSA9PiB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpKSB7XG4gICAgICAgICAgbmV3U2NoZW1hLnR5cGUgPSBuZXdTY2hlbWEudHlwZS5zb21lKHR5cGUgPT4gdHlwZSA9PT0gJ2FueScpID9cbiAgICAgICAgICAgIG5ld1NjaGVtYS50eXBlID0gc2ltcGxlVHlwZXMgOlxuICAgICAgICAgICAgbmV3U2NoZW1hLnR5cGUuZmlsdGVyKHR5cGUgPT4gc2ltcGxlVHlwZXMuaW5jbHVkZXModHlwZSkpXG4gICAgICAgICAgLy8gSWYgdHlwZSBpcyBhbiBhcnJheSB3aXRoIG9iamVjdHMsIGNvbnZlcnQgdGhlIGN1cnJlbnQgc2NoZW1hIHRvIGFuICdhbnlPZicgYXJyYXlcbiAgICAgICAgfSBlbHNlIGlmIChuZXdTY2hlbWEudHlwZS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgY29uc3QgYXJyYXlLZXlzID0gWydhZGRpdGlvbmFsSXRlbXMnLCAnaXRlbXMnLCAnbWF4SXRlbXMnLCAnbWluSXRlbXMnLCAndW5pcXVlSXRlbXMnLCAnY29udGFpbnMnXVxuICAgICAgICAgIGNvbnN0IG51bWJlcktleXMgPSBbJ211bHRpcGxlT2YnLCAnbWF4aW11bScsICdleGNsdXNpdmVNYXhpbXVtJywgJ21pbmltdW0nLCAnZXhjbHVzaXZlTWluaW11bSddXG4gICAgICAgICAgY29uc3Qgb2JqZWN0S2V5cyA9IFsnbWF4UHJvcGVydGllcycsICdtaW5Qcm9wZXJ0aWVzJywgJ3JlcXVpcmVkJywgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJyxcbiAgICAgICAgICAgICdwcm9wZXJ0aWVzJywgJ3BhdHRlcm5Qcm9wZXJ0aWVzJywgJ2RlcGVuZGVuY2llcycsICdwcm9wZXJ0eU5hbWVzJ11cbiAgICAgICAgICBjb25zdCBzdHJpbmdLZXlzID0gWydtYXhMZW5ndGgnLCAnbWluTGVuZ3RoJywgJ3BhdHRlcm4nLCAnZm9ybWF0J11cbiAgICAgICAgICBjb25zdCBmaWx0ZXJLZXlzID0ge1xuICAgICAgICAgICAgYXJyYXk6IFsuLi5udW1iZXJLZXlzLCAuLi5vYmplY3RLZXlzLCAuLi5zdHJpbmdLZXlzXSxcbiAgICAgICAgICAgIGludGVnZXI6IFsuLi5hcnJheUtleXMsIC4uLm9iamVjdEtleXMsIC4uLnN0cmluZ0tleXNdLFxuICAgICAgICAgICAgbnVtYmVyOiBbLi4uYXJyYXlLZXlzLCAuLi5vYmplY3RLZXlzLCAuLi5zdHJpbmdLZXlzXSxcbiAgICAgICAgICAgIG9iamVjdDogWy4uLmFycmF5S2V5cywgLi4ubnVtYmVyS2V5cywgLi4uc3RyaW5nS2V5c10sXG4gICAgICAgICAgICBzdHJpbmc6IFsuLi5hcnJheUtleXMsIC4uLm51bWJlcktleXMsIC4uLm9iamVjdEtleXNdLFxuICAgICAgICAgICAgYWxsOiBbLi4uYXJyYXlLZXlzLCAuLi5udW1iZXJLZXlzLCAuLi5vYmplY3RLZXlzLCAuLi5zdHJpbmdLZXlzXSxcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgYW55T2YgPSBbXVxuICAgICAgICAgIGZvciAoY29uc3QgdHlwZSBvZiBuZXdTY2hlbWEudHlwZSkge1xuICAgICAgICAgICAgY29uc3QgbmV3VHlwZSA9IHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyA/IHt0eXBlfSA6IHsuLi50eXBlfVxuICAgICAgICAgICAgT2JqZWN0LmtleXMobmV3U2NoZW1hKVxuICAgICAgICAgICAgICAuZmlsdGVyKGtleSA9PiAhbmV3VHlwZS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmXG4gICAgICAgICAgICAgICAgIVsuLi4oZmlsdGVyS2V5c1tuZXdUeXBlLnR5cGVdIHx8IGZpbHRlcktleXMuYWxsKSwgJ3R5cGUnLCAnZGVmYXVsdCddXG4gICAgICAgICAgICAgICAgICAuaW5jbHVkZXMoa2V5KVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5mb3JFYWNoKGtleSA9PiBuZXdUeXBlW2tleV0gPSBuZXdTY2hlbWFba2V5XSlcbiAgICAgICAgICAgIGFueU9mLnB1c2gobmV3VHlwZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgbmV3U2NoZW1hID0gbmV3U2NoZW1hLmhhc093blByb3BlcnR5KCdkZWZhdWx0JykgP1xuICAgICAgICAgICAge2FueU9mLCBkZWZhdWx0OiBuZXdTY2hlbWEuZGVmYXVsdH0gOiB7YW55T2Z9XG4gICAgICAgICAgLy8gSWYgdHlwZSBpcyBhbiBvYmplY3QsIG1lcmdlIGl0IHdpdGggdGhlIGN1cnJlbnQgc2NoZW1hXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgdHlwZVNjaGVtYSA9IG5ld1NjaGVtYS50eXBlXG4gICAgICAgICAgZGVsZXRlIG5ld1NjaGVtYS50eXBlXG4gICAgICAgICAgT2JqZWN0LmFzc2lnbihuZXdTY2hlbWEsIHR5cGVTY2hlbWEpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIG5ld1NjaGVtYS50eXBlXG4gICAgfVxuICB9XG5cbiAgLy8gQ29udmVydCBzdWIgc2NoZW1hc1xuICBPYmplY3Qua2V5cyhuZXdTY2hlbWEpXG4gICAgLmZpbHRlcihrZXkgPT4gdHlwZW9mIG5ld1NjaGVtYVtrZXldID09PSAnb2JqZWN0JylcbiAgICAuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBbJ2RlZmluaXRpb25zJywgJ2RlcGVuZGVuY2llcycsICdwcm9wZXJ0aWVzJywgJ3BhdHRlcm5Qcm9wZXJ0aWVzJ11cbiAgICAgICAgICAuaW5jbHVkZXMoa2V5KSAmJiB0eXBlb2YgbmV3U2NoZW1hW2tleV0ubWFwICE9PSAnZnVuY3Rpb24nXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgbmV3S2V5ID0ge31cbiAgICAgICAgT2JqZWN0LmtleXMobmV3U2NoZW1hW2tleV0pLmZvckVhY2goc3ViS2V5ID0+IG5ld0tleVtzdWJLZXldID1cbiAgICAgICAgICBjb252ZXJ0U2NoZW1hVG9EcmFmdDYobmV3U2NoZW1hW2tleV1bc3ViS2V5XSwge2NoYW5nZWQsIGRyYWZ0fSlcbiAgICAgICAgKVxuICAgICAgICBuZXdTY2hlbWFba2V5XSA9IG5ld0tleVxuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgWydpdGVtcycsICdhZGRpdGlvbmFsSXRlbXMnLCAnYWRkaXRpb25hbFByb3BlcnRpZXMnLFxuICAgICAgICAgICdhbGxPZicsICdhbnlPZicsICdvbmVPZicsICdub3QnXS5pbmNsdWRlcyhrZXkpXG4gICAgICApIHtcbiAgICAgICAgbmV3U2NoZW1hW2tleV0gPSBjb252ZXJ0U2NoZW1hVG9EcmFmdDYobmV3U2NoZW1hW2tleV0sIHtjaGFuZ2VkLCBkcmFmdH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdTY2hlbWFba2V5XSA9IF8uY2xvbmVEZWVwKG5ld1NjaGVtYVtrZXldKVxuICAgICAgfVxuICAgIH0pXG5cbiAgcmV0dXJuIG5ld1NjaGVtYVxufVxuIl19