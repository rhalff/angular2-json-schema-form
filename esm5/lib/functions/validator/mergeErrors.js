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
import { mergeObjects } from './mergeObjects';
import { isEmpty } from './isEmpty';
export function mergeErrors(arrayOfErrors) {
    var mergedErrors = mergeObjects.apply(void 0, __spread(arrayOfErrors));
    return isEmpty(mergedErrors) ? null : mergedErrors;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VFcnJvcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3NmLWNvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9mdW5jdGlvbnMvdmFsaWRhdG9yL21lcmdlRXJyb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFBO0FBQzNDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxXQUFXLENBQUE7QUFZakMsTUFBTSxVQUFVLFdBQVcsQ0FBQyxhQUFrQjtJQUM1QyxJQUFNLFlBQVksR0FBRyxZQUFZLHdCQUFJLGFBQWEsRUFBQyxDQUFBO0lBQ25ELE9BQU8sT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQTtBQUNwRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHttZXJnZU9iamVjdHN9IGZyb20gJy4vbWVyZ2VPYmplY3RzJ1xuaW1wb3J0IHtpc0VtcHR5fSBmcm9tICcuL2lzRW1wdHknXG5pbXBvcnQge1BsYWluT2JqZWN0fSBmcm9tICcuL3R5cGVzJ1xuXG4vKipcbiAqICdtZXJnZUVycm9ycycgdXRpbGl0eSBmdW5jdGlvblxuICpcbiAqIE1lcmdlcyBhbiBhcnJheSBvZiBvYmplY3RzLlxuICogVXNlZCBmb3IgY29tYmluaW5nIHRoZSB2YWxpZGF0b3IgZXJyb3JzIHJldHVybmVkIGZyb20gJ2V4ZWN1dGVWYWxpZGF0b3JzJ1xuICpcbiAqIEBwYXJhbSBhcnJheU9mRXJyb3JzIC0gYXJyYXkgb2Ygb2JqZWN0c1xuICogQHJldHVybiBtZXJnZWQgb2JqZWN0LCBvciBudWxsIGlmIG5vIHVzYWJsZSBpbnB1dCBvYmplY3RzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUVycm9ycyhhcnJheU9mRXJyb3JzOiBhbnkpOiBQbGFpbk9iamVjdCB7XG4gIGNvbnN0IG1lcmdlZEVycm9ycyA9IG1lcmdlT2JqZWN0cyguLi5hcnJheU9mRXJyb3JzKVxuICByZXR1cm4gaXNFbXB0eShtZXJnZWRFcnJvcnMpID8gbnVsbCA6IG1lcmdlZEVycm9yc1xufVxuIl19