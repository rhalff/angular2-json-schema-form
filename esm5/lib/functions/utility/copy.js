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
import { isArray, isMap, isObject, isSet } from '../validator';
export function copy(object, errors) {
    if (errors === void 0) { errors = false; }
    if (typeof object !== 'object' || object === null) {
        return object;
    }
    if (isMap(object)) {
        return new Map(object);
    }
    if (isSet(object)) {
        return new Set(object);
    }
    if (isArray(object)) {
        return __spread(object);
    }
    if (isObject(object)) {
        return __assign({}, object);
    }
    if (errors) {
        console.error('copy error: Object to copy must be a JavaScript object or value.');
    }
    return object;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nc2YtY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2Z1bmN0aW9ucy91dGlsaXR5L2NvcHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFhNUQsTUFBTSxVQUFVLElBQUksQ0FDbEIsTUFBVyxFQUNYLE1BQXVCO0lBQXZCLHVCQUFBLEVBQUEsY0FBdUI7SUFFdkIsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtRQUNqRCxPQUFPLE1BQU0sQ0FBQTtLQUNkO0lBQ0QsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDakIsT0FBTyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtLQUN2QjtJQUNELElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2pCLE9BQU8sSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7S0FDdkI7SUFDRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNuQixnQkFBVyxNQUFNLEVBQUM7S0FDbkI7SUFDRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNwQixvQkFBVyxNQUFNLEVBQUM7S0FDbkI7SUFDRCxJQUFJLE1BQU0sRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0VBQWtFLENBQUMsQ0FBQTtLQUNsRjtJQUNELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNBcnJheSwgaXNNYXAsIGlzT2JqZWN0LCBpc1NldH0gZnJvbSAnLi4vdmFsaWRhdG9yJ1xuXG4vKipcbiAqICdjb3B5JyBmdW5jdGlvblxuICpcbiAqIE1ha2VzIGEgc2hhbGxvdyBjb3B5IG9mIGEgSmF2YVNjcmlwdCBvYmplY3QsIGFycmF5LCBNYXAsIG9yIFNldC5cbiAqIElmIHBhc3NlZCBhIEphdmFTY3JpcHQgcHJpbWl0aXZlIHZhbHVlIChzdHJpbmcsIG51bWJlciwgYm9vbGVhbiwgb3IgbnVsbCksXG4gKiBpdCByZXR1cm5zIHRoZSB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0gb2JqZWN0IC0gVGhlIG9iamVjdCB0byBjb3B5XG4gKiBAcGFyYW0gZXJyb3JzIC0gU2hvdyBlcnJvcnM/XG4gKiBAcmV0dXJuIFRoZSBjb3BpZWQgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3B5KFxuICBvYmplY3Q6IGFueSxcbiAgZXJyb3JzOiBib29sZWFuID0gZmFsc2Vcbikge1xuICBpZiAodHlwZW9mIG9iamVjdCAhPT0gJ29iamVjdCcgfHwgb2JqZWN0ID09PSBudWxsKSB7XG4gICAgcmV0dXJuIG9iamVjdFxuICB9XG4gIGlmIChpc01hcChvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5ldyBNYXAob2JqZWN0KVxuICB9XG4gIGlmIChpc1NldChvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5ldyBTZXQob2JqZWN0KVxuICB9XG4gIGlmIChpc0FycmF5KG9iamVjdCkpIHtcbiAgICByZXR1cm4gWy4uLm9iamVjdF1cbiAgfVxuICBpZiAoaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiB7Li4ub2JqZWN0fVxuICB9XG4gIGlmIChlcnJvcnMpIHtcbiAgICBjb25zb2xlLmVycm9yKCdjb3B5IGVycm9yOiBPYmplY3QgdG8gY29weSBtdXN0IGJlIGEgSmF2YVNjcmlwdCBvYmplY3Qgb3IgdmFsdWUuJylcbiAgfVxuICByZXR1cm4gb2JqZWN0XG59XG4iXX0=