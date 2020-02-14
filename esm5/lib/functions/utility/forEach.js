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
import { isArray, isEmpty, isObject } from '../validator';
export function forEach(object, fn, recurse, rootObject, errors) {
    var e_1, _a;
    if (recurse === void 0) { recurse = false; }
    if (rootObject === void 0) { rootObject = object; }
    if (errors === void 0) { errors = false; }
    if (isEmpty(object)) {
        return;
    }
    if ((isObject(object) || isArray(object)) && typeof fn === 'function') {
        try {
            for (var _b = __values(Object.keys(object)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                var value = object[key];
                if (recurse === 'bottom-up' && (isObject(value) || isArray(value))) {
                    forEach(value, fn, recurse, rootObject);
                }
                fn(value, key, object, rootObject);
                if (recurse === 'top-down' && (isObject(value) || isArray(value))) {
                    forEach(value, fn, recurse, rootObject);
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
    if (errors) {
        if (typeof fn !== 'function') {
            console.error('forEach error: Iterator must be a function.');
            console.error('function', fn);
        }
        if (!isObject(object) && !isArray(object)) {
            console.error('forEach error: Input object must be an object or array.');
            console.error('object', object);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yRWFjaC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nc2YtY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2Z1bmN0aW9ucy91dGlsaXR5L2ZvckVhY2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUE7QUF3QnZELE1BQU0sVUFBVSxPQUFPLENBQ3JCLE1BQW1CLEVBQ25CLEVBQTJELEVBQzNELE9BQWlDLEVBQ2pDLFVBQXdCLEVBQ3hCLE1BQWM7O0lBRmQsd0JBQUEsRUFBQSxlQUFpQztJQUNqQywyQkFBQSxFQUFBLG1CQUF3QjtJQUN4Qix1QkFBQSxFQUFBLGNBQWM7SUFFZCxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNuQixPQUFNO0tBQ1A7SUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLE9BQU8sRUFBRSxLQUFLLFVBQVUsRUFBRTs7WUFDckUsS0FBa0IsSUFBQSxLQUFBLFNBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTtnQkFBbEMsSUFBTSxHQUFHLFdBQUE7Z0JBQ1osSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUN6QixJQUFJLE9BQU8sS0FBSyxXQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQ2xFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQTtpQkFDeEM7Z0JBQ0QsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFBO2dCQUNsQyxJQUFJLE9BQU8sS0FBSyxVQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQ2pFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQTtpQkFDeEM7YUFDRjs7Ozs7Ozs7O0tBQ0Y7SUFDRCxJQUFJLE1BQU0sRUFBRTtRQUNWLElBQUksT0FBTyxFQUFFLEtBQUssVUFBVSxFQUFFO1lBQzVCLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQTtZQUM1RCxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQTtTQUM5QjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDekMsT0FBTyxDQUFDLEtBQUssQ0FBQyx5REFBeUQsQ0FBQyxDQUFBO1lBQ3hFLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1NBQ2hDO0tBQ0Y7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc0FycmF5LCBpc0VtcHR5LCBpc09iamVjdH0gZnJvbSAnLi4vdmFsaWRhdG9yJ1xuXG4vKipcbiAqICdmb3JFYWNoJyBmdW5jdGlvblxuICpcbiAqIEl0ZXJhdGVzIG92ZXIgYWxsIGl0ZW1zIGluIHRoZSBmaXJzdCBsZXZlbCBvZiBhbiBvYmplY3Qgb3IgYXJyYXlcbiAqIGFuZCBjYWxscyBhbiBpdGVyYXRvciBmdW5jdGlvbiBvbiBlYWNoIGl0ZW0uXG4gKlxuICogVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aXRoIGZvdXIgdmFsdWVzOlxuICogMS4gVGhlIGN1cnJlbnQgaXRlbSdzIHZhbHVlXG4gKiAyLiBUaGUgY3VycmVudCBpdGVtJ3Mga2V5XG4gKiAzLiBUaGUgcGFyZW50IG9iamVjdCwgd2hpY2ggY29udGFpbnMgdGhlIGN1cnJlbnQgaXRlbVxuICogNC4gVGhlIHJvb3Qgb2JqZWN0XG4gKlxuICogU2V0dGluZyB0aGUgb3B0aW9uYWwgdGhpcmQgcGFyYW1ldGVyIHRvICd0b3AtZG93bicgb3IgJ2JvdHRvbS11cCcgd2lsbCBjYXVzZVxuICogaXQgdG8gYWxzbyByZWN1cnNpdmVseSBpdGVyYXRlIG92ZXIgaXRlbXMgaW4gc3ViLW9iamVjdHMgb3Igc3ViLWFycmF5cyBpbiB0aGVcbiAqIHNwZWNpZmllZCBkaXJlY3Rpb24uXG4gKlxuICogQHBhcmFtIG9iamVjdCAtIFRoZSBvYmplY3Qgb3IgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyXG4gKiBAcGFyYW0gZm4gLSB0aGUgaXRlcmF0b3IgZnVuY3Rpb24gdG8gY2FsbCBvbiBlYWNoIGl0ZW1cbiAqIEBwYXJhbSByZWN1cnNlIC1cbiAqIEBwYXJhbSByb290T2JqZWN0IC1cbiAqIEBwYXJhbSBlcnJvcnMgLSBTaG93IGVycm9ycz9cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvckVhY2goXG4gIG9iamVjdDogYW55IHwgYW55W10sXG4gIGZuOiAodjogYW55LCBrPzogc3RyaW5nIHwgbnVtYmVyLCBjPzogYW55LCByYz86IGFueSkgPT4gYW55LFxuICByZWN1cnNlOiBib29sZWFuIHwgc3RyaW5nID0gZmFsc2UsXG4gIHJvb3RPYmplY3Q6IGFueSA9IG9iamVjdCxcbiAgZXJyb3JzID0gZmFsc2Vcbik6IHZvaWQge1xuICBpZiAoaXNFbXB0eShvYmplY3QpKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKChpc09iamVjdChvYmplY3QpIHx8IGlzQXJyYXkob2JqZWN0KSkgJiYgdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMob2JqZWN0KSkge1xuICAgICAgY29uc3QgdmFsdWUgPSBvYmplY3Rba2V5XVxuICAgICAgaWYgKHJlY3Vyc2UgPT09ICdib3R0b20tdXAnICYmIChpc09iamVjdCh2YWx1ZSkgfHwgaXNBcnJheSh2YWx1ZSkpKSB7XG4gICAgICAgIGZvckVhY2godmFsdWUsIGZuLCByZWN1cnNlLCByb290T2JqZWN0KVxuICAgICAgfVxuICAgICAgZm4odmFsdWUsIGtleSwgb2JqZWN0LCByb290T2JqZWN0KVxuICAgICAgaWYgKHJlY3Vyc2UgPT09ICd0b3AtZG93bicgJiYgKGlzT2JqZWN0KHZhbHVlKSB8fCBpc0FycmF5KHZhbHVlKSkpIHtcbiAgICAgICAgZm9yRWFjaCh2YWx1ZSwgZm4sIHJlY3Vyc2UsIHJvb3RPYmplY3QpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChlcnJvcnMpIHtcbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdmb3JFYWNoIGVycm9yOiBJdGVyYXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJylcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2Z1bmN0aW9uJywgZm4pXG4gICAgfVxuICAgIGlmICghaXNPYmplY3Qob2JqZWN0KSAmJiAhaXNBcnJheShvYmplY3QpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdmb3JFYWNoIGVycm9yOiBJbnB1dCBvYmplY3QgbXVzdCBiZSBhbiBvYmplY3Qgb3IgYXJyYXkuJylcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ29iamVjdCcsIG9iamVjdClcbiAgICB9XG4gIH1cbn1cbiJdfQ==