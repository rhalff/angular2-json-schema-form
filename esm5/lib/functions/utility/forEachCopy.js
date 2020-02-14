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
import { hasValue, isArray, isObject } from '../validator';
export function forEachCopy(object, fn, errors) {
    var e_1, _a;
    if (errors === void 0) { errors = false; }
    if (!hasValue(object)) {
        return;
    }
    if ((isObject(object) || isArray(object)) && typeof object !== 'function') {
        var newObject = isArray(object) ? [] : {};
        try {
            for (var _b = __values(Object.keys(object)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                newObject[key] = fn(object[key], key, object);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return newObject;
    }
    if (errors) {
        if (typeof fn !== 'function') {
            console.error('forEachCopy error: Iterator must be a function.');
            console.error('function', fn);
        }
        if (!isObject(object) && !isArray(object)) {
            console.error('forEachCopy error: Input object must be an object or array.');
            console.error('object', object);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yRWFjaENvcHkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3NmLWNvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9mdW5jdGlvbnMvdXRpbGl0eS9mb3JFYWNoQ29weS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQWlCeEQsTUFBTSxVQUFVLFdBQVcsQ0FDekIsTUFBbUIsRUFDbkIsRUFBNkQsRUFDN0QsTUFBYzs7SUFBZCx1QkFBQSxFQUFBLGNBQWM7SUFFZCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3JCLE9BQU07S0FDUDtJQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksT0FBTyxNQUFNLEtBQUssVUFBVSxFQUFFO1FBQ3pFLElBQU0sU0FBUyxHQUFRLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7O1lBQ2hELEtBQWtCLElBQUEsS0FBQSxTQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQWxDLElBQU0sR0FBRyxXQUFBO2dCQUNaLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTthQUM5Qzs7Ozs7Ozs7O1FBQ0QsT0FBTyxTQUFTLENBQUE7S0FDakI7SUFDRCxJQUFJLE1BQU0sRUFBRTtRQUNWLElBQUksT0FBTyxFQUFFLEtBQUssVUFBVSxFQUFFO1lBQzVCLE9BQU8sQ0FBQyxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQTtZQUNoRSxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQTtTQUM5QjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDekMsT0FBTyxDQUFDLEtBQUssQ0FBQyw2REFBNkQsQ0FBQyxDQUFBO1lBQzVFLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1NBQ2hDO0tBQ0Y7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtoYXNWYWx1ZSwgaXNBcnJheSwgaXNPYmplY3R9IGZyb20gJy4uL3ZhbGlkYXRvcidcblxuLyoqXG4gKiAnZm9yRWFjaENvcHknIGZ1bmN0aW9uXG4gKlxuICogSXRlcmF0ZXMgb3ZlciBhbGwgaXRlbXMgaW4gdGhlIGZpcnN0IGxldmVsIG9mIGFuIG9iamVjdCBvciBhcnJheVxuICogYW5kIGNhbGxzIGFuIGl0ZXJhdG9yIGZ1bmN0aW9uIG9uIGVhY2ggaXRlbS4gUmV0dXJucyBhIG5ldyBvYmplY3Qgb3IgYXJyYXlcbiAqIHdpdGggdGhlIHNhbWUga2V5cyBvciBpbmRleGVzIGFzIHRoZSBvcmlnaW5hbCwgYW5kIHZhbHVlcyBzZXQgdG8gdGhlIHJlc3VsdHNcbiAqIG9mIHRoZSBpdGVyYXRvciBmdW5jdGlvbi5cbiAqXG4gKiBEb2VzIE5PVCByZWN1cnNpdmVseSBpdGVyYXRlIG92ZXIgaXRlbXMgaW4gc3ViLW9iamVjdHMgb3Igc3ViLWFycmF5cy5cbiAqXG4gKiBAcGFyYW0gb2JqZWN0IC0gVGhlIG9iamVjdCBvciBhcnJheSB0byBpdGVyYXRlIG92ZXJcbiAqIEBwYXJhbSBmbiAtIFRoZSBpdGVyYXRvciBmdW5jdGlvbiB0byBjYWxsIG9uIGVhY2ggaXRlbVxuICogQHBhcmFtIGVycm9ycyAtIFNob3cgZXJyb3JzP1xuICogQHJldHVybiBUaGUgcmVzdWx0aW5nIG9iamVjdCBvciBhcnJheVxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaENvcHkoXG4gIG9iamVjdDogYW55IHwgYW55W10sXG4gIGZuOiAodjogYW55LCBrPzogc3RyaW5nIHwgbnVtYmVyLCBvPzogYW55LCBwPzogc3RyaW5nKSA9PiBhbnksXG4gIGVycm9ycyA9IGZhbHNlXG4pOiBhbnkgfCBhbnlbXSB7XG4gIGlmICghaGFzVmFsdWUob2JqZWN0KSkge1xuICAgIHJldHVyblxuICB9XG4gIGlmICgoaXNPYmplY3Qob2JqZWN0KSB8fCBpc0FycmF5KG9iamVjdCkpICYmIHR5cGVvZiBvYmplY3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zdCBuZXdPYmplY3Q6IGFueSA9IGlzQXJyYXkob2JqZWN0KSA/IFtdIDoge31cbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhvYmplY3QpKSB7XG4gICAgICBuZXdPYmplY3Rba2V5XSA9IGZuKG9iamVjdFtrZXldLCBrZXksIG9iamVjdClcbiAgICB9XG4gICAgcmV0dXJuIG5ld09iamVjdFxuICB9XG4gIGlmIChlcnJvcnMpIHtcbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdmb3JFYWNoQ29weSBlcnJvcjogSXRlcmF0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpXG4gICAgICBjb25zb2xlLmVycm9yKCdmdW5jdGlvbicsIGZuKVxuICAgIH1cbiAgICBpZiAoIWlzT2JqZWN0KG9iamVjdCkgJiYgIWlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgY29uc29sZS5lcnJvcignZm9yRWFjaENvcHkgZXJyb3I6IElucHV0IG9iamVjdCBtdXN0IGJlIGFuIG9iamVjdCBvciBhcnJheS4nKVxuICAgICAgY29uc29sZS5lcnJvcignb2JqZWN0Jywgb2JqZWN0KVxuICAgIH1cbiAgfVxufVxuIl19