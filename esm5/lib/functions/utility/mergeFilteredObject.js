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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VGaWx0ZXJlZE9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nc2YtY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2Z1bmN0aW9ucy91dGlsaXR5L21lcmdlRmlsdGVyZWRPYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQWMsTUFBTSxjQUFjLENBQUE7QUFrQnRFLE1BQU0sVUFBVSxtQkFBbUIsQ0FDakMsWUFBeUIsRUFDekIsWUFBeUIsRUFDekIsV0FBeUIsRUFDekIsS0FBb0MsRUFDcEMsS0FBOEI7O0lBRjlCLDRCQUFBLEVBQUEsZ0JBQXlCO0lBQ3pCLHNCQUFBLEVBQUEsa0JBQVMsR0FBVyxJQUFhLE9BQUEsR0FBRyxFQUFILENBQUc7SUFDcEMsc0JBQUEsRUFBQSxrQkFBUyxHQUFRLElBQVUsT0FBQSxHQUFHLEVBQUgsQ0FBRztJQUU5QixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQzNCLE9BQU8sWUFBWSxDQUFBO0tBQ3BCO0lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUMzQixZQUFZLEdBQUcsRUFBRSxDQUFBO0tBQ2xCOztRQUNELEtBQWtCLElBQUEsS0FBQSxTQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUEsZ0JBQUEsNEJBQUU7WUFBeEMsSUFBTSxHQUFHLFdBQUE7WUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsSUFBSSxTQUFTLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQzlELFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7YUFDcEQ7U0FDRjs7Ozs7Ozs7O0lBQ0QsT0FBTyxZQUFZLENBQUE7QUFDckIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5BcnJheSwgaXNEZWZpbmVkLCBpc09iamVjdCwgUGxhaW5PYmplY3R9IGZyb20gJy4uL3ZhbGlkYXRvcidcblxuLyoqXG4gKiAnbWVyZ2VGaWx0ZXJlZE9iamVjdCcgdXRpbGl0eSBmdW5jdGlvblxuICpcbiAqIFNoYWxsb3dseSBtZXJnZXMgdHdvIG9iamVjdHMsIHNldHRpbmcga2V5IGFuZCB2YWx1ZXMgZnJvbSBzb3VyY2Ugb2JqZWN0XG4gKiBpbiB0YXJnZXQgb2JqZWN0LCBleGNsdWRpbmcgc3BlY2lmaWVkIGtleXMuXG4gKlxuICogT3B0aW9uYWxseSwgaXQgY2FuIGFsc28gdXNlIGZ1bmN0aW9ucyB0byB0cmFuc2Zvcm0gdGhlIGtleSBuYW1lcyBhbmQvb3JcbiAqIHRoZSB2YWx1ZXMgb2YgdGhlIG1lcmdpbmcgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB0YXJnZXRPYmplY3QgLSBUYXJnZXQgb2JqZWN0IHRvIGFkZCBrZXlzIGFuZCB2YWx1ZXMgdG9cbiAqIEBwYXJhbSBzb3VyY2VPYmplY3QgLSBTb3VyY2Ugb2JqZWN0IHRvIGNvcHkga2V5cyBhbmQgdmFsdWVzIGZyb21cbiAqIEBwYXJhbSBleGNsdWRlS2V5cyAtIEFycmF5IG9mIGtleXMgdG8gZXhjbHVkZVxuICogQHBhcmFtIGtleUZuIC0gRnVuY3Rpb24gdG8gYXBwbHkgdG8ga2V5c1xuICogQHBhcmFtIHZhbEZuIC0gRnVuY3Rpb24gdG8gYXBwbHkgdG8gdmFsdWVzXG4gKiBAcmV0dXJuIFJldHVybnMgdGFyZ2V0T2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUZpbHRlcmVkT2JqZWN0KFxuICB0YXJnZXRPYmplY3Q6IFBsYWluT2JqZWN0LFxuICBzb3VyY2VPYmplY3Q6IFBsYWluT2JqZWN0LFxuICBleGNsdWRlS2V5czpzdHJpbmdbXSA9IFtdLFxuICBrZXlGbiA9IChrZXk6IHN0cmluZyk6IHN0cmluZyA9PiBrZXksXG4gIHZhbEZuID0gKHZhbDogYW55KTogYW55ID0+IHZhbFxuKTogUGxhaW5PYmplY3Qge1xuICBpZiAoIWlzT2JqZWN0KHNvdXJjZU9iamVjdCkpIHtcbiAgICByZXR1cm4gdGFyZ2V0T2JqZWN0XG4gIH1cbiAgaWYgKCFpc09iamVjdCh0YXJnZXRPYmplY3QpKSB7XG4gICAgdGFyZ2V0T2JqZWN0ID0ge31cbiAgfVxuICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhzb3VyY2VPYmplY3QpKSB7XG4gICAgaWYgKCFpbkFycmF5KGtleSwgZXhjbHVkZUtleXMpICYmIGlzRGVmaW5lZChzb3VyY2VPYmplY3Rba2V5XSkpIHtcbiAgICAgIHRhcmdldE9iamVjdFtrZXlGbihrZXkpXSA9IHZhbEZuKHNvdXJjZU9iamVjdFtrZXldKVxuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0T2JqZWN0XG59XG4iXX0=