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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRTY2hlbWFGcm9tRGF0YS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9mdW5jdGlvbnMvanNvbi1zY2hlbWEvYnVpbGRTY2hlbWFGcm9tRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQVlwQyxNQUFNLFVBQVUsbUJBQW1CLENBQ2pDLElBQVMsRUFDVCxnQkFBd0IsRUFDeEIsTUFBYTs7SUFEYixpQ0FBQSxFQUFBLHdCQUF3QjtJQUN4Qix1QkFBQSxFQUFBLGFBQWE7SUFFYixJQUFNLFNBQVMsR0FBUSxFQUFFLENBQUE7SUFDekIsSUFBTSxZQUFZLEdBQUcsVUFBQyxLQUFVO1FBQzlCLElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDMUMsT0FBTyxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVMsQ0FBQTtJQUNwRSxDQUFDLENBQUE7SUFDRCxJQUFNLGNBQWMsR0FBRyxVQUFDLEtBQUs7UUFDM0IsT0FBQSxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDO0lBQW5ELENBQW1ELENBQUE7SUFDckQsSUFBSSxNQUFNLEVBQUU7UUFDVixTQUFTLENBQUMsT0FBTyxHQUFHLHlDQUF5QyxDQUFBO0tBQzlEO0lBQ0QsU0FBUyxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbkMsSUFBSSxTQUFTLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUMvQixTQUFTLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQTtRQUN6QixJQUFJLGdCQUFnQixFQUFFO1lBQ3BCLFNBQVMsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFBO1NBQ3hCOztZQUNELEtBQWtCLElBQUEsS0FBQSxTQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQWhDLElBQU0sR0FBRyxXQUFBO2dCQUNaLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO2dCQUNyRCxJQUFJLGdCQUFnQixFQUFFO29CQUNwQixTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtpQkFDN0I7YUFDRjs7Ozs7Ozs7O0tBQ0Y7U0FBTSxJQUFJLFNBQVMsQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1FBQ3JDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUUxQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtZQUNoRCxTQUFTLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLHVCQUFLLENBQUMsR0FBSyxDQUFDLEVBQUUsRUFBZCxDQUFjLEVBQUUsRUFBRSxDQUFDLENBQUE7U0FDdkU7UUFDRCxJQUFJLGdCQUFnQixFQUFFO1lBQ3BCLFNBQVMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFBO1NBQ3ZCO0tBQ0Y7SUFDRCxPQUFPLFNBQVMsQ0FBQTtBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtnZXRUeXBlfSBmcm9tICcuLi92YWxpZGF0b3InXG5cbi8qKlxuICogJ2J1aWxkU2NoZW1hRnJvbURhdGEnIGZ1bmN0aW9uXG4gKlxuICogQnVpbGQgYSBKU09OIFNjaGVtYSBmcm9tIGEgZGF0YSBvYmplY3RcbiAqXG4gKiBAcGFyYW0gIGRhdGEgLSBUaGUgZGF0YSBvYmplY3RcbiAqIEBwYXJhbSAgcmVxdWlyZUFsbEZpZWxkcyAtIFJlcXVpcmUgYWxsIGZpZWxkcz9cbiAqIEBwYXJhbSAgaXNSb290IC0gaXMgcm9vdFxuICogQHJldHVybiBUaGUgbmV3IEpTT04gU2NoZW1hXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFNjaGVtYUZyb21EYXRhKFxuICBkYXRhOiBhbnksXG4gIHJlcXVpcmVBbGxGaWVsZHMgPSBmYWxzZSxcbiAgaXNSb290ID0gdHJ1ZVxuKSB7XG4gIGNvbnN0IG5ld1NjaGVtYTogYW55ID0ge31cbiAgY29uc3QgZ2V0RmllbGRUeXBlID0gKHZhbHVlOiBhbnkpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IGZpZWxkVHlwZSA9IGdldFR5cGUodmFsdWUsICdzdHJpY3QnKVxuICAgIHJldHVybiB7aW50ZWdlcjogJ251bWJlcicsIG51bGw6ICdzdHJpbmcnfVtmaWVsZFR5cGVdIHx8IGZpZWxkVHlwZVxuICB9XG4gIGNvbnN0IGJ1aWxkU3ViU2NoZW1hID0gKHZhbHVlKSA9PlxuICAgIGJ1aWxkU2NoZW1hRnJvbURhdGEodmFsdWUsIHJlcXVpcmVBbGxGaWVsZHMsIGZhbHNlKVxuICBpZiAoaXNSb290KSB7XG4gICAgbmV3U2NoZW1hLiRzY2hlbWEgPSAnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNi9zY2hlbWEjJ1xuICB9XG4gIG5ld1NjaGVtYS50eXBlID0gZ2V0RmllbGRUeXBlKGRhdGEpXG4gIGlmIChuZXdTY2hlbWEudHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBuZXdTY2hlbWEucHJvcGVydGllcyA9IHt9XG4gICAgaWYgKHJlcXVpcmVBbGxGaWVsZHMpIHtcbiAgICAgIG5ld1NjaGVtYS5yZXF1aXJlZCA9IFtdXG4gICAgfVxuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGRhdGEpKSB7XG4gICAgICBuZXdTY2hlbWEucHJvcGVydGllc1trZXldID0gYnVpbGRTdWJTY2hlbWEoZGF0YVtrZXldKVxuICAgICAgaWYgKHJlcXVpcmVBbGxGaWVsZHMpIHtcbiAgICAgICAgbmV3U2NoZW1hLnJlcXVpcmVkLnB1c2goa2V5KVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChuZXdTY2hlbWEudHlwZSA9PT0gJ2FycmF5Jykge1xuICAgIG5ld1NjaGVtYS5pdGVtcyA9IGRhdGEubWFwKGJ1aWxkU3ViU2NoZW1hKVxuICAgIC8vIElmIGFsbCBpdGVtcyBhcmUgdGhlIHNhbWUgdHlwZSwgdXNlIGFuIG9iamVjdCBmb3IgaXRlbXMgaW5zdGVhZCBvZiBhbiBhcnJheVxuICAgIGlmICgobmV3IFNldChkYXRhLm1hcChnZXRGaWVsZFR5cGUpKSkuc2l6ZSA9PT0gMSkge1xuICAgICAgbmV3U2NoZW1hLml0ZW1zID0gbmV3U2NoZW1hLml0ZW1zLnJlZHVjZSgoYSwgYikgPT4gKHsuLi5hLCAuLi5ifSksIHt9KVxuICAgIH1cbiAgICBpZiAocmVxdWlyZUFsbEZpZWxkcykge1xuICAgICAgbmV3U2NoZW1hLm1pbkl0ZW1zID0gMVxuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3U2NoZW1hXG59XG4iXX0=