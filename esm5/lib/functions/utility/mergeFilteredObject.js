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
import { inArray, isDefined, isObject } from '../validator';
export function mergeFilteredObject(targetObject, sourceObject, excludeKeys, keyFn, valFn) {
    var e_1, _a;
    if (excludeKeys === void 0) { excludeKeys = []; }
    if (keyFn === void 0) { keyFn = function (key) { return key; }; }
    if (valFn === void 0) { valFn = function (val) { return val; }; }
    if (!isObject(sourceObject)) {
        return targetObject;
    }
    if (!isObject(targetObject)) {
        targetObject = {};
    }
    try {
        for (var _b = __values(Object.keys(sourceObject)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            if (!inArray(key, excludeKeys) && isDefined(sourceObject[key])) {
                targetObject[keyFn(key)] = valFn(sourceObject[key]);
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
    return targetObject;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VGaWx0ZXJlZE9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9mdW5jdGlvbnMvdXRpbGl0eS9tZXJnZUZpbHRlcmVkT2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFjLE1BQU0sY0FBYyxDQUFBO0FBa0J0RSxNQUFNLFVBQVUsbUJBQW1CLENBQ2pDLFlBQXlCLEVBQ3pCLFlBQXlCLEVBQ3pCLFdBQXlCLEVBQ3pCLEtBQW9DLEVBQ3BDLEtBQThCOztJQUY5Qiw0QkFBQSxFQUFBLGdCQUF5QjtJQUN6QixzQkFBQSxFQUFBLGtCQUFTLEdBQVcsSUFBYSxPQUFBLEdBQUcsRUFBSCxDQUFHO0lBQ3BDLHNCQUFBLEVBQUEsa0JBQVMsR0FBUSxJQUFVLE9BQUEsR0FBRyxFQUFILENBQUc7SUFFOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUMzQixPQUFPLFlBQVksQ0FBQTtLQUNwQjtJQUNELElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDM0IsWUFBWSxHQUFHLEVBQUUsQ0FBQTtLQUNsQjs7UUFDRCxLQUFrQixJQUFBLEtBQUEsU0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBLGdCQUFBLDRCQUFFO1lBQXhDLElBQU0sR0FBRyxXQUFBO1lBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLElBQUksU0FBUyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUM5RCxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO2FBQ3BEO1NBQ0Y7Ozs7Ozs7OztJQUNELE9BQU8sWUFBWSxDQUFBO0FBQ3JCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luQXJyYXksIGlzRGVmaW5lZCwgaXNPYmplY3QsIFBsYWluT2JqZWN0fSBmcm9tICcuLi92YWxpZGF0b3InXG5cbi8qKlxuICogJ21lcmdlRmlsdGVyZWRPYmplY3QnIHV0aWxpdHkgZnVuY3Rpb25cbiAqXG4gKiBTaGFsbG93bHkgbWVyZ2VzIHR3byBvYmplY3RzLCBzZXR0aW5nIGtleSBhbmQgdmFsdWVzIGZyb20gc291cmNlIG9iamVjdFxuICogaW4gdGFyZ2V0IG9iamVjdCwgZXhjbHVkaW5nIHNwZWNpZmllZCBrZXlzLlxuICpcbiAqIE9wdGlvbmFsbHksIGl0IGNhbiBhbHNvIHVzZSBmdW5jdGlvbnMgdG8gdHJhbnNmb3JtIHRoZSBrZXkgbmFtZXMgYW5kL29yXG4gKiB0aGUgdmFsdWVzIG9mIHRoZSBtZXJnaW5nIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0T2JqZWN0IC0gVGFyZ2V0IG9iamVjdCB0byBhZGQga2V5cyBhbmQgdmFsdWVzIHRvXG4gKiBAcGFyYW0gc291cmNlT2JqZWN0IC0gU291cmNlIG9iamVjdCB0byBjb3B5IGtleXMgYW5kIHZhbHVlcyBmcm9tXG4gKiBAcGFyYW0gZXhjbHVkZUtleXMgLSBBcnJheSBvZiBrZXlzIHRvIGV4Y2x1ZGVcbiAqIEBwYXJhbSBrZXlGbiAtIEZ1bmN0aW9uIHRvIGFwcGx5IHRvIGtleXNcbiAqIEBwYXJhbSB2YWxGbiAtIEZ1bmN0aW9uIHRvIGFwcGx5IHRvIHZhbHVlc1xuICogQHJldHVybiBSZXR1cm5zIHRhcmdldE9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VGaWx0ZXJlZE9iamVjdChcbiAgdGFyZ2V0T2JqZWN0OiBQbGFpbk9iamVjdCxcbiAgc291cmNlT2JqZWN0OiBQbGFpbk9iamVjdCxcbiAgZXhjbHVkZUtleXM6c3RyaW5nW10gPSBbXSxcbiAga2V5Rm4gPSAoa2V5OiBzdHJpbmcpOiBzdHJpbmcgPT4ga2V5LFxuICB2YWxGbiA9ICh2YWw6IGFueSk6IGFueSA9PiB2YWxcbik6IFBsYWluT2JqZWN0IHtcbiAgaWYgKCFpc09iamVjdChzb3VyY2VPYmplY3QpKSB7XG4gICAgcmV0dXJuIHRhcmdldE9iamVjdFxuICB9XG4gIGlmICghaXNPYmplY3QodGFyZ2V0T2JqZWN0KSkge1xuICAgIHRhcmdldE9iamVjdCA9IHt9XG4gIH1cbiAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc291cmNlT2JqZWN0KSkge1xuICAgIGlmICghaW5BcnJheShrZXksIGV4Y2x1ZGVLZXlzKSAmJiBpc0RlZmluZWQoc291cmNlT2JqZWN0W2tleV0pKSB7XG4gICAgICB0YXJnZXRPYmplY3Rba2V5Rm4oa2V5KV0gPSB2YWxGbihzb3VyY2VPYmplY3Rba2V5XSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldE9iamVjdFxufVxuIl19