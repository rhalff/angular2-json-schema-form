import * as tslib_1 from "tslib";
import * as _ from 'lodash';
export function convertSchemaToDraft6(schema, options) {
    if (options === void 0) { options = {}; }
    var draft = options.draft || null;
    var changed = options.changed || false;
    if (typeof schema !== 'object') {
        return schema;
    }
    if (typeof schema.map === 'function') {
        return tslib_1.__spread(schema.map(function (subSchema) { return convertSchemaToDraft6(subSchema, { changed: changed, draft: draft }); }));
    }
    var newSchema = tslib_1.__assign({}, schema);
    var simpleTypes = ['array', 'boolean', 'integer', 'null', 'number', 'object', 'string'];
    if (typeof newSchema.$schema === 'string' &&
        /http\:\/\/json\-schema\.org\/draft\-0\d\/schema\#/.test(newSchema.$schema)) {
        draft = newSchema.$schema[30];
    }
    // Convert v1-v2 'contentEncoding' to 'media.binaryEncoding'
    // Note: This is only used in JSON hyper-schema (not regular JSON schema)
    if (newSchema.contentEncoding) {
        newSchema.media = { binaryEncoding: newSchema.contentEncoding };
        delete newSchema.contentEncoding;
        changed = true;
    }
    // Convert v1-v3 'extends' to 'allOf'
    if (typeof newSchema.extends === 'object') {
        newSchema.allOf = typeof newSchema.extends.map === 'function' ?
            newSchema.extends.map(function (subSchema) { return convertSchemaToDraft6(subSchema, { changed: changed, draft: draft }); }) :
            [convertSchemaToDraft6(newSchema.extends, { changed: changed, draft: draft })];
        delete newSchema.extends;
        changed = true;
    }
    // Convert v1-v3 'disallow' to 'not'
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
    // Convert v3 string 'dependencies' properties to arrays
    if (typeof newSchema.dependencies === 'object' &&
        Object.keys(newSchema.dependencies)
            .some(function (key) { return typeof newSchema.dependencies[key] === 'string'; })) {
        newSchema.dependencies = tslib_1.__assign({}, newSchema.dependencies);
        Object.keys(newSchema.dependencies)
            .filter(function (key) { return typeof newSchema.dependencies[key] === 'string'; })
            .forEach(function (key) { return newSchema.dependencies[key] = [newSchema.dependencies[key]]; });
        changed = true;
    }
    // Convert v1 'maxDecimal' to 'multipleOf'
    if (typeof newSchema.maxDecimal === 'number') {
        newSchema.multipleOf = 1 / Math.pow(10, newSchema.maxDecimal);
        delete newSchema.divisibleBy;
        changed = true;
        if (!draft || draft === 2) {
            draft = 1;
        }
    }
    // Convert v2-v3 'divisibleBy' to 'multipleOf'
    if (typeof newSchema.divisibleBy === 'number') {
        newSchema.multipleOf = newSchema.divisibleBy;
        delete newSchema.divisibleBy;
        changed = true;
    }
    // Convert v1-v2 boolean 'minimumCanEqual' to 'exclusiveMinimum'
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
    // Convert v3-v4 boolean 'exclusiveMinimum' to numeric
    if (typeof newSchema.minimum === 'number' && newSchema.exclusiveMinimum === true) {
        newSchema.exclusiveMinimum = newSchema.minimum;
        delete newSchema.minimum;
        changed = true;
    }
    else if (typeof newSchema.exclusiveMinimum === 'boolean') {
        delete newSchema.exclusiveMinimum;
        changed = true;
    }
    // Convert v1-v2 boolean 'maximumCanEqual' to 'exclusiveMaximum'
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
    // Convert v3-v4 boolean 'exclusiveMaximum' to numeric
    if (typeof newSchema.maximum === 'number' && newSchema.exclusiveMaximum === true) {
        newSchema.exclusiveMaximum = newSchema.maximum;
        delete newSchema.maximum;
        changed = true;
    }
    else if (typeof newSchema.exclusiveMaximum === 'boolean') {
        delete newSchema.exclusiveMaximum;
        changed = true;
    }
    // Search object 'properties' for 'optional', 'required', and 'requires' items,
    // and convert them into object 'required' arrays and 'dependencies' objects
    if (typeof newSchema.properties === 'object') {
        var properties_1 = tslib_1.__assign({}, newSchema.properties);
        var requiredKeys_1 = Array.isArray(newSchema.required) ?
            new Set(newSchema.required) : new Set();
        // Convert v1-v2 boolean 'optional' properties to 'required' array
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
        // Convert v3 boolean 'required' properties to 'required' array
        if (Object.keys(properties_1).some(function (key) { return properties_1[key].required === true; })) {
            Object.keys(properties_1)
                .filter(function (key) { return properties_1[key].required === true; })
                .forEach(function (key) { return requiredKeys_1.add(key); });
            changed = true;
        }
        if (requiredKeys_1.size) {
            newSchema.required = Array.from(requiredKeys_1);
        }
        // Convert v1-v2 array or string 'requires' properties to 'dependencies' object
        if (Object.keys(properties_1).some(function (key) { return properties_1[key].requires; })) {
            var dependencies_1 = typeof newSchema.dependencies === 'object' ? tslib_1.__assign({}, newSchema.dependencies) : {};
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
    // Revove v1-v2 boolean 'optional' key
    if (typeof newSchema.optional === 'boolean') {
        delete newSchema.optional;
        changed = true;
        if (!draft) {
            draft = 2;
        }
    }
    // Revove v1-v2 'requires' key
    if (newSchema.requires) {
        delete newSchema.requires;
    }
    // Revove v3 boolean 'required' key
    if (typeof newSchema.required === 'boolean') {
        delete newSchema.required;
    }
    // Convert id to $id
    if (typeof newSchema.id === 'string' && !newSchema.$id) {
        if (newSchema.id.slice(-1) === '#') {
            newSchema.id = newSchema.id.slice(0, -1);
        }
        newSchema.$id = newSchema.id + '-CONVERTED-TO-DRAFT-06#';
        delete newSchema.id;
        changed = true;
    }
    // Check if v1-v3 'any' or object types will be converted
    if (newSchema.type && (typeof newSchema.type.every === 'function' ?
        !newSchema.type.every(function (type) { return simpleTypes.includes(type); }) :
        !simpleTypes.includes(newSchema.type))) {
        changed = true;
    }
    // If schema changed, update or remove $schema identifier
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
    // Convert v1-v3 'any' and object types
    if (newSchema.type && (typeof newSchema.type.every === 'function' ?
        !newSchema.type.every(function (type) { return simpleTypes.includes(type); }) :
        !simpleTypes.includes(newSchema.type))) {
        if (newSchema.type.length === 1) {
            newSchema.type = newSchema.type[0];
        }
        if (typeof newSchema.type === 'string') {
            // Convert string 'any' type to array of all standard types
            if (newSchema.type === 'any') {
                newSchema.type = simpleTypes;
                // Delete non-standard string type
            }
            else {
                delete newSchema.type;
            }
        }
        else if (typeof newSchema.type === 'object') {
            if (typeof newSchema.type.every === 'function') {
                // If array of strings, only allow standard types
                if (newSchema.type.every(function (type) { return typeof type === 'string'; })) {
                    newSchema.type = newSchema.type.some(function (type) { return type === 'any'; }) ?
                        newSchema.type = simpleTypes :
                        newSchema.type.filter(function (type) { return simpleTypes.includes(type); });
                    // If type is an array with objects, convert the current schema to an 'anyOf' array
                }
                else if (newSchema.type.length > 1) {
                    var arrayKeys = ['additionalItems', 'items', 'maxItems', 'minItems', 'uniqueItems', 'contains'];
                    var numberKeys = ['multipleOf', 'maximum', 'exclusiveMaximum', 'minimum', 'exclusiveMinimum'];
                    var objectKeys = ['maxProperties', 'minProperties', 'required', 'additionalProperties',
                        'properties', 'patternProperties', 'dependencies', 'propertyNames'];
                    var stringKeys = ['maxLength', 'minLength', 'pattern', 'format'];
                    var filterKeys_1 = {
                        'array': tslib_1.__spread(numberKeys, objectKeys, stringKeys),
                        'integer': tslib_1.__spread(arrayKeys, objectKeys, stringKeys),
                        'number': tslib_1.__spread(arrayKeys, objectKeys, stringKeys),
                        'object': tslib_1.__spread(arrayKeys, numberKeys, stringKeys),
                        'string': tslib_1.__spread(arrayKeys, numberKeys, objectKeys),
                        'all': tslib_1.__spread(arrayKeys, numberKeys, objectKeys, stringKeys),
                    };
                    var anyOf = [];
                    var _loop_1 = function (type) {
                        var newType = typeof type === 'string' ? { type: type } : tslib_1.__assign({}, type);
                        Object.keys(newSchema)
                            .filter(function (key) { return !newType.hasOwnProperty(key) &&
                            !tslib_1.__spread((filterKeys_1[newType.type] || filterKeys_1.all), ['type', 'default']).includes(key); })
                            .forEach(function (key) { return newType[key] = newSchema[key]; });
                        anyOf.push(newType);
                    };
                    try {
                        for (var _a = tslib_1.__values(newSchema.type), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var type = _b.value;
                            _loop_1(type);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    newSchema = newSchema.hasOwnProperty('default') ?
                        { anyOf: anyOf, default: newSchema.default } : { anyOf: anyOf };
                    // If type is an object, merge it with the current schema
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
    // Convert sub schemas
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
    var e_1, _c;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC1zY2hlbWEtdG8tZHJhZnQ2LmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcjItanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbInNyYy9zaGFyZWQvY29udmVydC1zY2hlbWEtdG8tZHJhZnQ2LmZ1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQW1CNUIsTUFBTSxnQ0FBZ0MsTUFBTSxFQUFFLE9BQTBCO0lBQTFCLHdCQUFBLEVBQUEsWUFBMEI7SUFDdEUsSUFBSSxLQUFLLEdBQVcsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUM7SUFDMUMsSUFBSSxPQUFPLEdBQVksT0FBTyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUM7SUFFaEQsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFBQyxDQUFDO0lBQ2xELEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxDQUFDLEdBQUcsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sa0JBQU0sTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLFNBQVMsSUFBSSxPQUFBLHFCQUFxQixDQUFDLFNBQVMsRUFBRSxFQUFFLE9BQU8sU0FBQSxFQUFFLEtBQUssT0FBQSxFQUFFLENBQUMsRUFBcEQsQ0FBb0QsQ0FBQyxFQUFHO0lBQzlGLENBQUM7SUFDRCxJQUFJLFNBQVMsd0JBQVEsTUFBTSxDQUFFLENBQUM7SUFDOUIsSUFBTSxXQUFXLEdBQUcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUUxRixFQUFFLENBQUMsQ0FBQyxPQUFPLFNBQVMsQ0FBQyxPQUFPLEtBQUssUUFBUTtRQUN2QyxtREFBbUQsQ0FB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LE9BQU8sU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxVQUNwRCxDQUFDLENBQUMsQ0FBQztZQUNELElBQU0sUUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLFFBQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQzFELHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sU0FBQSxFQUFFLEtBQUssT0FBQSxFQUFFLENBQUMsRUFEckIsQ0FDcUIsQ0FDbEUsQ0FBQztZQUNGLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFNLENBQUM7UUFDMUIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FDUixDQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxzQkFBc0I7WUFDbEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FDbkQsQ0FBQyxDQUFDLENBQUM7WUFDRCxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcscUJBQXFCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsT0FBTyxTQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUUsQ0FBQyxDQUFDO1FBQzdFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQy9DLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVMLE1BQU0sQ0FBQyxTQUFTLENBQUM7O0FBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogJ2NvbnZlcnRTY2hlbWFUb0RyYWZ0NicgZnVuY3Rpb25cbiAqXG4gKiBDb252ZXJ0cyBhIEpTT04gU2NoZW1hIGZyb20gZHJhZnQgMSB0aHJvdWdoIDQgZm9ybWF0IHRvIGRyYWZ0IDYgZm9ybWF0XG4gKlxuICogSW5zcGlyZWQgYnkgb24gZ2VyYWludGx1ZmYncyBKU09OIFNjaGVtYSAzIHRvIDQgY29tcGF0aWJpbGl0eSBmdW5jdGlvbjpcbiAqICAgaHR0cHM6Ly9naXRodWIuY29tL2dlcmFpbnRsdWZmL2pzb24tc2NoZW1hLWNvbXBhdGliaWxpdHlcbiAqIEFsc28gdXNlcyBzdWdnZXN0aW9ucyBmcm9tIEFKVidzIEpTT04gU2NoZW1hIDQgdG8gNiBtaWdyYXRpb24gZ3VpZGU6XG4gKiAgIGh0dHBzOi8vZ2l0aHViLmNvbS9lcG9iZXJlemtpbi9hanYvcmVsZWFzZXMvdGFnLzUuMC4wXG4gKiBBbmQgYWRkaXRpb25hbCBkZXRhaWxzIGZyb20gdGhlIG9mZmljaWFsIEpTT04gU2NoZW1hIGRvY3VtZW50YXRpb246XG4gKiAgIGh0dHA6Ly9qc29uLXNjaGVtYS5vcmdcbiAqXG4gKiBAcGFyYW0gIHsgb2JqZWN0IH0gb3JpZ2luYWxTY2hlbWEgLSBKU09OIHNjaGVtYSAoZHJhZnQgMSwgMiwgMywgNCwgb3IgNilcbiAqIEBwYXJhbSAgeyBPcHRpb25PYmplY3QgPSB7fSB9IG9wdGlvbnMgLSBvcHRpb25zOiBwYXJlbnQgc2NoZW1hIGNoYW5nZWQ/LCBzY2hlbWEgZHJhZnQgbnVtYmVyP1xuICogQHJldHVybiB7IG9iamVjdCB9IC0gSlNPTiBzY2hlbWEgKGRyYWZ0IDYpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uT2JqZWN0IHsgY2hhbmdlZD86IGJvb2xlYW47IGRyYWZ0PzogbnVtYmVyOyB9XG5leHBvcnQgZnVuY3Rpb24gY29udmVydFNjaGVtYVRvRHJhZnQ2KHNjaGVtYSwgb3B0aW9uczogT3B0aW9uT2JqZWN0ID0ge30pIHtcbiAgbGV0IGRyYWZ0OiBudW1iZXIgPSBvcHRpb25zLmRyYWZ0IHx8IG51bGw7XG4gIGxldCBjaGFuZ2VkOiBib29sZWFuID0gb3B0aW9ucy5jaGFuZ2VkIHx8IGZhbHNlO1xuXG4gIGlmICh0eXBlb2Ygc2NoZW1hICE9PSAnb2JqZWN0JykgeyByZXR1cm4gc2NoZW1hOyB9XG4gIGlmICh0eXBlb2Ygc2NoZW1hLm1hcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBbIC4uLnNjaGVtYS5tYXAoc3ViU2NoZW1hID0+IGNvbnZlcnRTY2hlbWFUb0RyYWZ0NihzdWJTY2hlbWEsIHsgY2hhbmdlZCwgZHJhZnQgfSkpIF07XG4gIH1cbiAgbGV0IG5ld1NjaGVtYSA9IHsgLi4uc2NoZW1hIH07XG4gIGNvbnN0IHNpbXBsZVR5cGVzID0gWydhcnJheScsICdib29sZWFuJywgJ2ludGVnZXInLCAnbnVsbCcsICdudW1iZXInLCAnb2JqZWN0JywgJ3N0cmluZyddO1xuXG4gIGlmICh0eXBlb2YgbmV3U2NoZW1hLiRzY2hlbWEgPT09ICdzdHJpbmcnICYmXG4gICAgL2h0dHBcXDpcXC9cXC9qc29uXFwtc2NoZW1hXFwub3JnXFwvZHJhZnRcXC0wXFxkXFwvc2NoZW1hXFwjLy50ZXN0KG5ld1NjaGVtYS4kc2NoZW1hKVxuICApIHtcbiAgICBkcmFmdCA9IG5ld1NjaGVtYS4kc2NoZW1hWzMwXTtcbiAgfVxuXG4gIC8vIENvbnZlcnQgdjEtdjIgJ2NvbnRlbnRFbmNvZGluZycgdG8gJ21lZGlhLmJpbmFyeUVuY29kaW5nJ1xuICAvLyBOb3RlOiBUaGlzIGlzIG9ubHkgdXNlZCBpbiBKU09OIGh5cGVyLXNjaGVtYSAobm90IHJlZ3VsYXIgSlNPTiBzY2hlbWEpXG4gIGlmIChuZXdTY2hlbWEuY29udGVudEVuY29kaW5nKSB7XG4gICAgbmV3U2NoZW1hLm1lZGlhID0geyBiaW5hcnlFbmNvZGluZzogbmV3U2NoZW1hLmNvbnRlbnRFbmNvZGluZyB9O1xuICAgIGRlbGV0ZSBuZXdTY2hlbWEuY29udGVudEVuY29kaW5nO1xuICAgIGNoYW5nZWQgPSB0cnVlO1xuICB9XG5cbiAgLy8gQ29udmVydCB2MS12MyAnZXh0ZW5kcycgdG8gJ2FsbE9mJ1xuICBpZiAodHlwZW9mIG5ld1NjaGVtYS5leHRlbmRzID09PSAnb2JqZWN0Jykge1xuICAgIG5ld1NjaGVtYS5hbGxPZiA9IHR5cGVvZiBuZXdTY2hlbWEuZXh0ZW5kcy5tYXAgPT09ICdmdW5jdGlvbicgP1xuICAgICAgbmV3U2NoZW1hLmV4dGVuZHMubWFwKHN1YlNjaGVtYSA9PiBjb252ZXJ0U2NoZW1hVG9EcmFmdDYoc3ViU2NoZW1hLCB7IGNoYW5nZWQsIGRyYWZ0IH0pKSA6XG4gICAgICBbIGNvbnZlcnRTY2hlbWFUb0RyYWZ0NihuZXdTY2hlbWEuZXh0ZW5kcywgeyBjaGFuZ2VkLCBkcmFmdCB9KSBdO1xuICAgIGRlbGV0ZSBuZXdTY2hlbWEuZXh0ZW5kcztcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIENvbnZlcnQgdjEtdjMgJ2Rpc2FsbG93JyB0byAnbm90J1xuICBpZiAobmV3U2NoZW1hLmRpc2FsbG93KSB7XG4gICAgaWYgKHR5cGVvZiBuZXdTY2hlbWEuZGlzYWxsb3cgPT09ICdzdHJpbmcnKSB7XG4gICAgICBuZXdTY2hlbWEubm90ID0geyB0eXBlOiBuZXdTY2hlbWEuZGlzYWxsb3cgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBuZXdTY2hlbWEuZGlzYWxsb3cubWFwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBuZXdTY2hlbWEubm90ID0ge1xuICAgICAgICBhbnlPZjogbmV3U2NoZW1hLmRpc2FsbG93XG4gICAgICAgICAgLm1hcCh0eXBlID0+IHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyA/IHR5cGUgOiB7IHR5cGUgfSlcbiAgICAgIH07XG4gICAgfVxuICAgIGRlbGV0ZSBuZXdTY2hlbWEuZGlzYWxsb3c7XG4gICAgY2hhbmdlZCA9IHRydWU7XG4gIH1cblxuICAvLyBDb252ZXJ0IHYzIHN0cmluZyAnZGVwZW5kZW5jaWVzJyBwcm9wZXJ0aWVzIHRvIGFycmF5c1xuICBpZiAodHlwZW9mIG5ld1NjaGVtYS5kZXBlbmRlbmNpZXMgPT09ICdvYmplY3QnICYmXG4gICAgT2JqZWN0LmtleXMobmV3U2NoZW1hLmRlcGVuZGVuY2llcylcbiAgICAgIC5zb21lKGtleSA9PiB0eXBlb2YgbmV3U2NoZW1hLmRlcGVuZGVuY2llc1trZXldID09PSAnc3RyaW5nJylcbiAgKSB7XG4gICAgbmV3U2NoZW1hLmRlcGVuZGVuY2llcyA9IHsgLi4ubmV3U2NoZW1hLmRlcGVuZGVuY2llcyB9O1xuICAgIE9iamVjdC5rZXlzKG5ld1NjaGVtYS5kZXBlbmRlbmNpZXMpXG4gICAgICAuZmlsdGVyKGtleSA9PiB0eXBlb2YgbmV3U2NoZW1hLmRlcGVuZGVuY2llc1trZXldID09PSAnc3RyaW5nJylcbiAgICAgIC5mb3JFYWNoKGtleSA9PiBuZXdTY2hlbWEuZGVwZW5kZW5jaWVzW2tleV0gPSBbIG5ld1NjaGVtYS5kZXBlbmRlbmNpZXNba2V5XSBdKTtcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIENvbnZlcnQgdjEgJ21heERlY2ltYWwnIHRvICdtdWx0aXBsZU9mJ1xuICBpZiAodHlwZW9mIG5ld1NjaGVtYS5tYXhEZWNpbWFsID09PSAnbnVtYmVyJykge1xuICAgIG5ld1NjaGVtYS5tdWx0aXBsZU9mID0gMSAvIE1hdGgucG93KDEwLCBuZXdTY2hlbWEubWF4RGVjaW1hbCk7XG4gICAgZGVsZXRlIG5ld1NjaGVtYS5kaXZpc2libGVCeTtcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICBpZiAoIWRyYWZ0IHx8IGRyYWZ0ID09PSAyKSB7IGRyYWZ0ID0gMTsgfVxuICB9XG5cbiAgLy8gQ29udmVydCB2Mi12MyAnZGl2aXNpYmxlQnknIHRvICdtdWx0aXBsZU9mJ1xuICBpZiAodHlwZW9mIG5ld1NjaGVtYS5kaXZpc2libGVCeSA9PT0gJ251bWJlcicpIHtcbiAgICBuZXdTY2hlbWEubXVsdGlwbGVPZiA9IG5ld1NjaGVtYS5kaXZpc2libGVCeTtcbiAgICBkZWxldGUgbmV3U2NoZW1hLmRpdmlzaWJsZUJ5O1xuICAgIGNoYW5nZWQgPSB0cnVlO1xuICB9XG5cbiAgLy8gQ29udmVydCB2MS12MiBib29sZWFuICdtaW5pbXVtQ2FuRXF1YWwnIHRvICdleGNsdXNpdmVNaW5pbXVtJ1xuICBpZiAodHlwZW9mIG5ld1NjaGVtYS5taW5pbXVtID09PSAnbnVtYmVyJyAmJiBuZXdTY2hlbWEubWluaW11bUNhbkVxdWFsID09PSBmYWxzZSkge1xuICAgIG5ld1NjaGVtYS5leGNsdXNpdmVNaW5pbXVtID0gbmV3U2NoZW1hLm1pbmltdW07XG4gICAgZGVsZXRlIG5ld1NjaGVtYS5taW5pbXVtO1xuICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgIGlmICghZHJhZnQpIHsgZHJhZnQgPSAyOyB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIG5ld1NjaGVtYS5taW5pbXVtQ2FuRXF1YWwgPT09ICdib29sZWFuJykge1xuICAgIGRlbGV0ZSBuZXdTY2hlbWEubWluaW11bUNhbkVxdWFsO1xuICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgIGlmICghZHJhZnQpIHsgZHJhZnQgPSAyOyB9XG4gIH1cblxuICAvLyBDb252ZXJ0IHYzLXY0IGJvb2xlYW4gJ2V4Y2x1c2l2ZU1pbmltdW0nIHRvIG51bWVyaWNcbiAgaWYgKHR5cGVvZiBuZXdTY2hlbWEubWluaW11bSA9PT0gJ251bWJlcicgJiYgbmV3U2NoZW1hLmV4Y2x1c2l2ZU1pbmltdW0gPT09IHRydWUpIHtcbiAgICBuZXdTY2hlbWEuZXhjbHVzaXZlTWluaW11bSA9IG5ld1NjaGVtYS5taW5pbXVtO1xuICAgIGRlbGV0ZSBuZXdTY2hlbWEubWluaW11bTtcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbmV3U2NoZW1hLmV4Y2x1c2l2ZU1pbmltdW0gPT09ICdib29sZWFuJykge1xuICAgIGRlbGV0ZSBuZXdTY2hlbWEuZXhjbHVzaXZlTWluaW11bTtcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIENvbnZlcnQgdjEtdjIgYm9vbGVhbiAnbWF4aW11bUNhbkVxdWFsJyB0byAnZXhjbHVzaXZlTWF4aW11bSdcbiAgaWYgKHR5cGVvZiBuZXdTY2hlbWEubWF4aW11bSA9PT0gJ251bWJlcicgJiYgbmV3U2NoZW1hLm1heGltdW1DYW5FcXVhbCA9PT0gZmFsc2UpIHtcbiAgICBuZXdTY2hlbWEuZXhjbHVzaXZlTWF4aW11bSA9IG5ld1NjaGVtYS5tYXhpbXVtO1xuICAgIGRlbGV0ZSBuZXdTY2hlbWEubWF4aW11bTtcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICBpZiAoIWRyYWZ0KSB7IGRyYWZ0ID0gMjsgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBuZXdTY2hlbWEubWF4aW11bUNhbkVxdWFsID09PSAnYm9vbGVhbicpIHtcbiAgICBkZWxldGUgbmV3U2NoZW1hLm1heGltdW1DYW5FcXVhbDtcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICBpZiAoIWRyYWZ0KSB7IGRyYWZ0ID0gMjsgfVxuICB9XG5cbiAgLy8gQ29udmVydCB2My12NCBib29sZWFuICdleGNsdXNpdmVNYXhpbXVtJyB0byBudW1lcmljXG4gIGlmICh0eXBlb2YgbmV3U2NoZW1hLm1heGltdW0gPT09ICdudW1iZXInICYmIG5ld1NjaGVtYS5leGNsdXNpdmVNYXhpbXVtID09PSB0cnVlKSB7XG4gICAgbmV3U2NoZW1hLmV4Y2x1c2l2ZU1heGltdW0gPSBuZXdTY2hlbWEubWF4aW11bTtcbiAgICBkZWxldGUgbmV3U2NoZW1hLm1heGltdW07XG4gICAgY2hhbmdlZCA9IHRydWU7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG5ld1NjaGVtYS5leGNsdXNpdmVNYXhpbXVtID09PSAnYm9vbGVhbicpIHtcbiAgICBkZWxldGUgbmV3U2NoZW1hLmV4Y2x1c2l2ZU1heGltdW07XG4gICAgY2hhbmdlZCA9IHRydWU7XG4gIH1cblxuICAvLyBTZWFyY2ggb2JqZWN0ICdwcm9wZXJ0aWVzJyBmb3IgJ29wdGlvbmFsJywgJ3JlcXVpcmVkJywgYW5kICdyZXF1aXJlcycgaXRlbXMsXG4gIC8vIGFuZCBjb252ZXJ0IHRoZW0gaW50byBvYmplY3QgJ3JlcXVpcmVkJyBhcnJheXMgYW5kICdkZXBlbmRlbmNpZXMnIG9iamVjdHNcbiAgaWYgKHR5cGVvZiBuZXdTY2hlbWEucHJvcGVydGllcyA9PT0gJ29iamVjdCcpIHtcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0geyAuLi5uZXdTY2hlbWEucHJvcGVydGllcyB9O1xuICAgIGNvbnN0IHJlcXVpcmVkS2V5cyA9IEFycmF5LmlzQXJyYXkobmV3U2NoZW1hLnJlcXVpcmVkKSA/XG4gICAgICBuZXcgU2V0KG5ld1NjaGVtYS5yZXF1aXJlZCkgOiBuZXcgU2V0KCk7XG5cbiAgICAvLyBDb252ZXJ0IHYxLXYyIGJvb2xlYW4gJ29wdGlvbmFsJyBwcm9wZXJ0aWVzIHRvICdyZXF1aXJlZCcgYXJyYXlcbiAgICBpZiAoZHJhZnQgPT09IDEgfHwgZHJhZnQgPT09IDIgfHxcbiAgICAgIE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLnNvbWUoa2V5ID0+IHByb3BlcnRpZXNba2V5XS5vcHRpb25hbCA9PT0gdHJ1ZSlcbiAgICApIHtcbiAgICAgIE9iamVjdC5rZXlzKHByb3BlcnRpZXMpXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IHByb3BlcnRpZXNba2V5XS5vcHRpb25hbCAhPT0gdHJ1ZSlcbiAgICAgICAgLmZvckVhY2goa2V5ID0+IHJlcXVpcmVkS2V5cy5hZGQoa2V5KSk7XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIGlmICghZHJhZnQpIHsgZHJhZnQgPSAyOyB9XG4gICAgfVxuXG4gICAgLy8gQ29udmVydCB2MyBib29sZWFuICdyZXF1aXJlZCcgcHJvcGVydGllcyB0byAncmVxdWlyZWQnIGFycmF5XG4gICAgaWYgKE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLnNvbWUoa2V5ID0+IHByb3BlcnRpZXNba2V5XS5yZXF1aXJlZCA9PT0gdHJ1ZSkpIHtcbiAgICAgIE9iamVjdC5rZXlzKHByb3BlcnRpZXMpXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IHByb3BlcnRpZXNba2V5XS5yZXF1aXJlZCA9PT0gdHJ1ZSlcbiAgICAgICAgLmZvckVhY2goa2V5ID0+IHJlcXVpcmVkS2V5cy5hZGQoa2V5KSk7XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAocmVxdWlyZWRLZXlzLnNpemUpIHsgbmV3U2NoZW1hLnJlcXVpcmVkID0gQXJyYXkuZnJvbShyZXF1aXJlZEtleXMpOyB9XG5cbiAgICAvLyBDb252ZXJ0IHYxLXYyIGFycmF5IG9yIHN0cmluZyAncmVxdWlyZXMnIHByb3BlcnRpZXMgdG8gJ2RlcGVuZGVuY2llcycgb2JqZWN0XG4gICAgaWYgKE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLnNvbWUoa2V5ID0+IHByb3BlcnRpZXNba2V5XS5yZXF1aXJlcykpIHtcbiAgICAgIGNvbnN0IGRlcGVuZGVuY2llcyA9IHR5cGVvZiBuZXdTY2hlbWEuZGVwZW5kZW5jaWVzID09PSAnb2JqZWN0JyA/XG4gICAgICAgIHsgLi4ubmV3U2NoZW1hLmRlcGVuZGVuY2llcyB9IDoge307XG4gICAgICBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBwcm9wZXJ0aWVzW2tleV0ucmVxdWlyZXMpXG4gICAgICAgIC5mb3JFYWNoKGtleSA9PiBkZXBlbmRlbmNpZXNba2V5XSA9XG4gICAgICAgICAgdHlwZW9mIHByb3BlcnRpZXNba2V5XS5yZXF1aXJlcyA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAgWyBwcm9wZXJ0aWVzW2tleV0ucmVxdWlyZXMgXSA6IHByb3BlcnRpZXNba2V5XS5yZXF1aXJlc1xuICAgICAgICApO1xuICAgICAgbmV3U2NoZW1hLmRlcGVuZGVuY2llcyA9IGRlcGVuZGVuY2llcztcbiAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgaWYgKCFkcmFmdCkgeyBkcmFmdCA9IDI7IH1cbiAgICB9XG5cbiAgICBuZXdTY2hlbWEucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XG4gIH1cblxuICAvLyBSZXZvdmUgdjEtdjIgYm9vbGVhbiAnb3B0aW9uYWwnIGtleVxuICBpZiAodHlwZW9mIG5ld1NjaGVtYS5vcHRpb25hbCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgZGVsZXRlIG5ld1NjaGVtYS5vcHRpb25hbDtcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICBpZiAoIWRyYWZ0KSB7IGRyYWZ0ID0gMjsgfVxuICB9XG5cbiAgLy8gUmV2b3ZlIHYxLXYyICdyZXF1aXJlcycga2V5XG4gIGlmIChuZXdTY2hlbWEucmVxdWlyZXMpIHtcbiAgICBkZWxldGUgbmV3U2NoZW1hLnJlcXVpcmVzO1xuICB9XG5cbiAgLy8gUmV2b3ZlIHYzIGJvb2xlYW4gJ3JlcXVpcmVkJyBrZXlcbiAgaWYgKHR5cGVvZiBuZXdTY2hlbWEucmVxdWlyZWQgPT09ICdib29sZWFuJykge1xuICAgIGRlbGV0ZSBuZXdTY2hlbWEucmVxdWlyZWQ7XG4gIH1cblxuICAvLyBDb252ZXJ0IGlkIHRvICRpZFxuICBpZiAodHlwZW9mIG5ld1NjaGVtYS5pZCA9PT0gJ3N0cmluZycgJiYgIW5ld1NjaGVtYS4kaWQpIHtcbiAgICBpZiAobmV3U2NoZW1hLmlkLnNsaWNlKC0xKSA9PT0gJyMnKSB7XG4gICAgICBuZXdTY2hlbWEuaWQgPSBuZXdTY2hlbWEuaWQuc2xpY2UoMCwgLTEpO1xuICAgIH1cbiAgICBuZXdTY2hlbWEuJGlkID0gbmV3U2NoZW1hLmlkICsgJy1DT05WRVJURUQtVE8tRFJBRlQtMDYjJztcbiAgICBkZWxldGUgbmV3U2NoZW1hLmlkO1xuICAgIGNoYW5nZWQgPSB0cnVlO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgdjEtdjMgJ2FueScgb3Igb2JqZWN0IHR5cGVzIHdpbGwgYmUgY29udmVydGVkXG4gIGlmIChuZXdTY2hlbWEudHlwZSAmJiAodHlwZW9mIG5ld1NjaGVtYS50eXBlLmV2ZXJ5ID09PSAnZnVuY3Rpb24nID9cbiAgICAhbmV3U2NoZW1hLnR5cGUuZXZlcnkodHlwZSA9PiBzaW1wbGVUeXBlcy5pbmNsdWRlcyh0eXBlKSkgOlxuICAgICFzaW1wbGVUeXBlcy5pbmNsdWRlcyhuZXdTY2hlbWEudHlwZSlcbiAgKSkge1xuICAgIGNoYW5nZWQgPSB0cnVlO1xuICB9XG5cbiAgLy8gSWYgc2NoZW1hIGNoYW5nZWQsIHVwZGF0ZSBvciByZW1vdmUgJHNjaGVtYSBpZGVudGlmaWVyXG4gIGlmICh0eXBlb2YgbmV3U2NoZW1hLiRzY2hlbWEgPT09ICdzdHJpbmcnICYmXG4gICAgL2h0dHBcXDpcXC9cXC9qc29uXFwtc2NoZW1hXFwub3JnXFwvZHJhZnRcXC0wWzEtNF1cXC9zY2hlbWFcXCMvLnRlc3QobmV3U2NoZW1hLiRzY2hlbWEpXG4gICkge1xuICAgIG5ld1NjaGVtYS4kc2NoZW1hID0gJ2h0dHA6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQtMDYvc2NoZW1hIyc7XG4gICAgY2hhbmdlZCA9IHRydWU7XG4gIH0gZWxzZSBpZiAoY2hhbmdlZCAmJiB0eXBlb2YgbmV3U2NoZW1hLiRzY2hlbWEgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3QgYWRkVG9EZXNjcmlwdGlvbiA9ICdDb252ZXJ0ZWQgdG8gZHJhZnQgNiBmcm9tICcgKyBuZXdTY2hlbWEuJHNjaGVtYTtcbiAgICBpZiAodHlwZW9mIG5ld1NjaGVtYS5kZXNjcmlwdGlvbiA9PT0gJ3N0cmluZycgJiYgbmV3U2NoZW1hLmRlc2NyaXB0aW9uLmxlbmd0aCkge1xuICAgICAgbmV3U2NoZW1hLmRlc2NyaXB0aW9uICs9ICdcXG4nICsgYWRkVG9EZXNjcmlwdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3U2NoZW1hLmRlc2NyaXB0aW9uID0gYWRkVG9EZXNjcmlwdGlvbjtcbiAgICB9XG4gICAgZGVsZXRlIG5ld1NjaGVtYS4kc2NoZW1hO1xuICB9XG5cbiAgLy8gQ29udmVydCB2MS12MyAnYW55JyBhbmQgb2JqZWN0IHR5cGVzXG4gIGlmIChuZXdTY2hlbWEudHlwZSAmJiAodHlwZW9mIG5ld1NjaGVtYS50eXBlLmV2ZXJ5ID09PSAnZnVuY3Rpb24nID9cbiAgICAhbmV3U2NoZW1hLnR5cGUuZXZlcnkodHlwZSA9PiBzaW1wbGVUeXBlcy5pbmNsdWRlcyh0eXBlKSkgOlxuICAgICFzaW1wbGVUeXBlcy5pbmNsdWRlcyhuZXdTY2hlbWEudHlwZSlcbiAgKSkge1xuICAgIGlmIChuZXdTY2hlbWEudHlwZS5sZW5ndGggPT09IDEpIHsgbmV3U2NoZW1hLnR5cGUgPSBuZXdTY2hlbWEudHlwZVswXTsgfVxuICAgIGlmICh0eXBlb2YgbmV3U2NoZW1hLnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBDb252ZXJ0IHN0cmluZyAnYW55JyB0eXBlIHRvIGFycmF5IG9mIGFsbCBzdGFuZGFyZCB0eXBlc1xuICAgICAgaWYgKG5ld1NjaGVtYS50eXBlID09PSAnYW55Jykge1xuICAgICAgICBuZXdTY2hlbWEudHlwZSA9IHNpbXBsZVR5cGVzO1xuICAgICAgLy8gRGVsZXRlIG5vbi1zdGFuZGFyZCBzdHJpbmcgdHlwZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIG5ld1NjaGVtYS50eXBlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIG5ld1NjaGVtYS50eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHR5cGVvZiBuZXdTY2hlbWEudHlwZS5ldmVyeSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBJZiBhcnJheSBvZiBzdHJpbmdzLCBvbmx5IGFsbG93IHN0YW5kYXJkIHR5cGVzXG4gICAgICAgIGlmIChuZXdTY2hlbWEudHlwZS5ldmVyeSh0eXBlID0+IHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykpIHtcbiAgICAgICAgICBuZXdTY2hlbWEudHlwZSA9IG5ld1NjaGVtYS50eXBlLnNvbWUodHlwZSA9PiB0eXBlID09PSAnYW55JykgP1xuICAgICAgICAgICAgbmV3U2NoZW1hLnR5cGUgPSBzaW1wbGVUeXBlcyA6XG4gICAgICAgICAgICBuZXdTY2hlbWEudHlwZS5maWx0ZXIodHlwZSA9PiBzaW1wbGVUeXBlcy5pbmNsdWRlcyh0eXBlKSk7XG4gICAgICAgIC8vIElmIHR5cGUgaXMgYW4gYXJyYXkgd2l0aCBvYmplY3RzLCBjb252ZXJ0IHRoZSBjdXJyZW50IHNjaGVtYSB0byBhbiAnYW55T2YnIGFycmF5XG4gICAgICAgIH0gZWxzZSBpZiAobmV3U2NoZW1hLnR5cGUubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGNvbnN0IGFycmF5S2V5cyA9IFsgJ2FkZGl0aW9uYWxJdGVtcycsICdpdGVtcycsICdtYXhJdGVtcycsICdtaW5JdGVtcycsICd1bmlxdWVJdGVtcycsICdjb250YWlucyddO1xuICAgICAgICAgIGNvbnN0IG51bWJlcktleXMgPSBbICdtdWx0aXBsZU9mJywgJ21heGltdW0nLCAnZXhjbHVzaXZlTWF4aW11bScsICdtaW5pbXVtJywgJ2V4Y2x1c2l2ZU1pbmltdW0nXTtcbiAgICAgICAgICBjb25zdCBvYmplY3RLZXlzID0gWyAnbWF4UHJvcGVydGllcycsICdtaW5Qcm9wZXJ0aWVzJywgJ3JlcXVpcmVkJywgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJyxcbiAgICAgICAgICAgICdwcm9wZXJ0aWVzJywgJ3BhdHRlcm5Qcm9wZXJ0aWVzJywgJ2RlcGVuZGVuY2llcycsICdwcm9wZXJ0eU5hbWVzJ107XG4gICAgICAgICAgY29uc3Qgc3RyaW5nS2V5cyA9IFsgJ21heExlbmd0aCcsICdtaW5MZW5ndGgnLCAncGF0dGVybicsICdmb3JtYXQnXTtcbiAgICAgICAgICBjb25zdCBmaWx0ZXJLZXlzID0ge1xuICAgICAgICAgICAgJ2FycmF5JzogICBbIC4uLm51bWJlcktleXMsIC4uLm9iamVjdEtleXMsIC4uLnN0cmluZ0tleXMgXSxcbiAgICAgICAgICAgICdpbnRlZ2VyJzogWyAgLi4uYXJyYXlLZXlzLCAuLi5vYmplY3RLZXlzLCAuLi5zdHJpbmdLZXlzIF0sXG4gICAgICAgICAgICAnbnVtYmVyJzogIFsgIC4uLmFycmF5S2V5cywgLi4ub2JqZWN0S2V5cywgLi4uc3RyaW5nS2V5cyBdLFxuICAgICAgICAgICAgJ29iamVjdCc6ICBbICAuLi5hcnJheUtleXMsIC4uLm51bWJlcktleXMsIC4uLnN0cmluZ0tleXMgXSxcbiAgICAgICAgICAgICdzdHJpbmcnOiAgWyAgLi4uYXJyYXlLZXlzLCAuLi5udW1iZXJLZXlzLCAuLi5vYmplY3RLZXlzIF0sXG4gICAgICAgICAgICAnYWxsJzogICAgIFsgIC4uLmFycmF5S2V5cywgLi4ubnVtYmVyS2V5cywgLi4ub2JqZWN0S2V5cywgLi4uc3RyaW5nS2V5cyBdLFxuICAgICAgICAgIH07XG4gICAgICAgICAgY29uc3QgYW55T2YgPSBbXTtcbiAgICAgICAgICBmb3IgKGNvbnN0IHR5cGUgb2YgbmV3U2NoZW1hLnR5cGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1R5cGUgPSB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgPyB7IHR5cGUgfSA6IHsgLi4udHlwZSB9O1xuICAgICAgICAgICAgT2JqZWN0LmtleXMobmV3U2NoZW1hKVxuICAgICAgICAgICAgICAuZmlsdGVyKGtleSA9PiAhbmV3VHlwZS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmXG4gICAgICAgICAgICAgICAgIVsgLi4uKGZpbHRlcktleXNbbmV3VHlwZS50eXBlXSB8fCBmaWx0ZXJLZXlzLmFsbCksICd0eXBlJywgJ2RlZmF1bHQnIF1cbiAgICAgICAgICAgICAgICAgIC5pbmNsdWRlcyhrZXkpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmZvckVhY2goa2V5ID0+IG5ld1R5cGVba2V5XSA9IG5ld1NjaGVtYVtrZXldKTtcbiAgICAgICAgICAgIGFueU9mLnB1c2gobmV3VHlwZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG5ld1NjaGVtYSA9IG5ld1NjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnZGVmYXVsdCcpID9cbiAgICAgICAgICAgIHsgYW55T2YsIGRlZmF1bHQ6IG5ld1NjaGVtYS5kZWZhdWx0IH0gOiB7IGFueU9mIH07XG4gICAgICAgIC8vIElmIHR5cGUgaXMgYW4gb2JqZWN0LCBtZXJnZSBpdCB3aXRoIHRoZSBjdXJyZW50IHNjaGVtYVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHR5cGVTY2hlbWEgPSBuZXdTY2hlbWEudHlwZTtcbiAgICAgICAgICBkZWxldGUgbmV3U2NoZW1hLnR5cGU7XG4gICAgICAgICAgT2JqZWN0LmFzc2lnbihuZXdTY2hlbWEsIHR5cGVTY2hlbWEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSBuZXdTY2hlbWEudHlwZTtcbiAgICB9XG4gIH1cblxuICAvLyBDb252ZXJ0IHN1YiBzY2hlbWFzXG4gIE9iamVjdC5rZXlzKG5ld1NjaGVtYSlcbiAgICAuZmlsdGVyKGtleSA9PiB0eXBlb2YgbmV3U2NoZW1hW2tleV0gPT09ICdvYmplY3QnKVxuICAgIC5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIFsgJ2RlZmluaXRpb25zJywgJ2RlcGVuZGVuY2llcycsICdwcm9wZXJ0aWVzJywgJ3BhdHRlcm5Qcm9wZXJ0aWVzJyBdXG4gICAgICAgICAgLmluY2x1ZGVzKGtleSkgJiYgdHlwZW9mIG5ld1NjaGVtYVtrZXldLm1hcCAhPT0gJ2Z1bmN0aW9uJ1xuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IG5ld0tleSA9IHt9O1xuICAgICAgICBPYmplY3Qua2V5cyhuZXdTY2hlbWFba2V5XSkuZm9yRWFjaChzdWJLZXkgPT4gbmV3S2V5W3N1YktleV0gPVxuICAgICAgICAgIGNvbnZlcnRTY2hlbWFUb0RyYWZ0NihuZXdTY2hlbWFba2V5XVtzdWJLZXldLCB7IGNoYW5nZWQsIGRyYWZ0IH0pXG4gICAgICAgICk7XG4gICAgICAgIG5ld1NjaGVtYVtrZXldID0gbmV3S2V5O1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgWyAnaXRlbXMnLCAnYWRkaXRpb25hbEl0ZW1zJywgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJyxcbiAgICAgICAgICAnYWxsT2YnLCAnYW55T2YnLCAnb25lT2YnLCAnbm90JyBdLmluY2x1ZGVzKGtleSlcbiAgICAgICkge1xuICAgICAgICBuZXdTY2hlbWFba2V5XSA9IGNvbnZlcnRTY2hlbWFUb0RyYWZ0NihuZXdTY2hlbWFba2V5XSwgeyBjaGFuZ2VkLCBkcmFmdCB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld1NjaGVtYVtrZXldID0gXy5jbG9uZURlZXAobmV3U2NoZW1hW2tleV0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIHJldHVybiBuZXdTY2hlbWE7XG59XG4iXX0=