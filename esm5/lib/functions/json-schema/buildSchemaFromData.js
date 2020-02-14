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
import { getType } from '../validator';
export function buildSchemaFromData(data, requireAllFields, isRoot) {
    var e_1, _a;
    if (requireAllFields === void 0) { requireAllFields = false; }
    if (isRoot === void 0) { isRoot = true; }
    var newSchema = {};
    var getFieldType = function (value) {
        var fieldType = getType(value, 'strict');
        return { integer: 'number', null: 'string' }[fieldType] || fieldType;
    };
    var buildSubSchema = function (value) {
        return buildSchemaFromData(value, requireAllFields, false);
    };
    if (isRoot) {
        newSchema.$schema = 'http://json-schema.org/draft-06/schema#';
    }
    newSchema.type = getFieldType(data);
    if (newSchema.type === 'object') {
        newSchema.properties = {};
        if (requireAllFields) {
            newSchema.required = [];
        }
        try {
            for (var _b = __values(Object.keys(data)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                newSchema.properties[key] = buildSubSchema(data[key]);
                if (requireAllFields) {
                    newSchema.required.push(key);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    else if (newSchema.type === 'array') {
        newSchema.items = data.map(buildSubSchema);
        if ((new Set(data.map(getFieldType))).size === 1) {
            newSchema.items = newSchema.items.reduce(function (a, b) { return (__assign(__assign({}, a), b)); }, {});
        }
        if (requireAllFields) {
            newSchema.minItems = 1;
        }
    }
    return newSchema;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRTY2hlbWFGcm9tRGF0YS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nc2YtY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2Z1bmN0aW9ucy9qc29uLXNjaGVtYS9idWlsZFNjaGVtYUZyb21EYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBWXBDLE1BQU0sVUFBVSxtQkFBbUIsQ0FDakMsSUFBUyxFQUNULGdCQUF3QixFQUN4QixNQUFhOztJQURiLGlDQUFBLEVBQUEsd0JBQXdCO0lBQ3hCLHVCQUFBLEVBQUEsYUFBYTtJQUViLElBQU0sU0FBUyxHQUFRLEVBQUUsQ0FBQTtJQUN6QixJQUFNLFlBQVksR0FBRyxVQUFDLEtBQVU7UUFDOUIsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUMxQyxPQUFPLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUMsU0FBUyxDQUFDLElBQUksU0FBUyxDQUFBO0lBQ3BFLENBQUMsQ0FBQTtJQUNELElBQU0sY0FBYyxHQUFHLFVBQUMsS0FBSztRQUMzQixPQUFBLG1CQUFtQixDQUFDLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLENBQUM7SUFBbkQsQ0FBbUQsQ0FBQTtJQUNyRCxJQUFJLE1BQU0sRUFBRTtRQUNWLFNBQVMsQ0FBQyxPQUFPLEdBQUcseUNBQXlDLENBQUE7S0FDOUQ7SUFDRCxTQUFTLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNuQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQy9CLFNBQVMsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFBO1FBQ3pCLElBQUksZ0JBQWdCLEVBQUU7WUFDcEIsU0FBUyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUE7U0FDeEI7O1lBQ0QsS0FBa0IsSUFBQSxLQUFBLFNBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTtnQkFBaEMsSUFBTSxHQUFHLFdBQUE7Z0JBQ1osU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQ3JELElBQUksZ0JBQWdCLEVBQUU7b0JBQ3BCLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2lCQUM3QjthQUNGOzs7Ozs7Ozs7S0FDRjtTQUFNLElBQUksU0FBUyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7UUFDckMsU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBRTFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO1lBQ2hELFNBQVMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsdUJBQUssQ0FBQyxHQUFLLENBQUMsRUFBRSxFQUFkLENBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQTtTQUN2RTtRQUNELElBQUksZ0JBQWdCLEVBQUU7WUFDcEIsU0FBUyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUE7U0FDdkI7S0FDRjtJQUNELE9BQU8sU0FBUyxDQUFBO0FBQ2xCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dldFR5cGV9IGZyb20gJy4uL3ZhbGlkYXRvcidcblxuLyoqXG4gKiAnYnVpbGRTY2hlbWFGcm9tRGF0YScgZnVuY3Rpb25cbiAqXG4gKiBCdWlsZCBhIEpTT04gU2NoZW1hIGZyb20gYSBkYXRhIG9iamVjdFxuICpcbiAqIEBwYXJhbSAgZGF0YSAtIFRoZSBkYXRhIG9iamVjdFxuICogQHBhcmFtICByZXF1aXJlQWxsRmllbGRzIC0gUmVxdWlyZSBhbGwgZmllbGRzP1xuICogQHBhcmFtICBpc1Jvb3QgLSBpcyByb290XG4gKiBAcmV0dXJuIFRoZSBuZXcgSlNPTiBTY2hlbWFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkU2NoZW1hRnJvbURhdGEoXG4gIGRhdGE6IGFueSxcbiAgcmVxdWlyZUFsbEZpZWxkcyA9IGZhbHNlLFxuICBpc1Jvb3QgPSB0cnVlXG4pIHtcbiAgY29uc3QgbmV3U2NoZW1hOiBhbnkgPSB7fVxuICBjb25zdCBnZXRGaWVsZFR5cGUgPSAodmFsdWU6IGFueSk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgZmllbGRUeXBlID0gZ2V0VHlwZSh2YWx1ZSwgJ3N0cmljdCcpXG4gICAgcmV0dXJuIHtpbnRlZ2VyOiAnbnVtYmVyJywgbnVsbDogJ3N0cmluZyd9W2ZpZWxkVHlwZV0gfHwgZmllbGRUeXBlXG4gIH1cbiAgY29uc3QgYnVpbGRTdWJTY2hlbWEgPSAodmFsdWUpID0+XG4gICAgYnVpbGRTY2hlbWFGcm9tRGF0YSh2YWx1ZSwgcmVxdWlyZUFsbEZpZWxkcywgZmFsc2UpXG4gIGlmIChpc1Jvb3QpIHtcbiAgICBuZXdTY2hlbWEuJHNjaGVtYSA9ICdodHRwOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LTA2L3NjaGVtYSMnXG4gIH1cbiAgbmV3U2NoZW1hLnR5cGUgPSBnZXRGaWVsZFR5cGUoZGF0YSlcbiAgaWYgKG5ld1NjaGVtYS50eXBlID09PSAnb2JqZWN0Jykge1xuICAgIG5ld1NjaGVtYS5wcm9wZXJ0aWVzID0ge31cbiAgICBpZiAocmVxdWlyZUFsbEZpZWxkcykge1xuICAgICAgbmV3U2NoZW1hLnJlcXVpcmVkID0gW11cbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZGF0YSkpIHtcbiAgICAgIG5ld1NjaGVtYS5wcm9wZXJ0aWVzW2tleV0gPSBidWlsZFN1YlNjaGVtYShkYXRhW2tleV0pXG4gICAgICBpZiAocmVxdWlyZUFsbEZpZWxkcykge1xuICAgICAgICBuZXdTY2hlbWEucmVxdWlyZWQucHVzaChrZXkpXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKG5ld1NjaGVtYS50eXBlID09PSAnYXJyYXknKSB7XG4gICAgbmV3U2NoZW1hLml0ZW1zID0gZGF0YS5tYXAoYnVpbGRTdWJTY2hlbWEpXG4gICAgLy8gSWYgYWxsIGl0ZW1zIGFyZSB0aGUgc2FtZSB0eXBlLCB1c2UgYW4gb2JqZWN0IGZvciBpdGVtcyBpbnN0ZWFkIG9mIGFuIGFycmF5XG4gICAgaWYgKChuZXcgU2V0KGRhdGEubWFwKGdldEZpZWxkVHlwZSkpKS5zaXplID09PSAxKSB7XG4gICAgICBuZXdTY2hlbWEuaXRlbXMgPSBuZXdTY2hlbWEuaXRlbXMucmVkdWNlKChhLCBiKSA9PiAoey4uLmEsIC4uLmJ9KSwge30pXG4gICAgfVxuICAgIGlmIChyZXF1aXJlQWxsRmllbGRzKSB7XG4gICAgICBuZXdTY2hlbWEubWluSXRlbXMgPSAxXG4gICAgfVxuICB9XG4gIHJldHVybiBuZXdTY2hlbWFcbn1cbiJdfQ==