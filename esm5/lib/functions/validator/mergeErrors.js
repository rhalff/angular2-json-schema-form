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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VFcnJvcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdzZi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZnVuY3Rpb25zL3ZhbGlkYXRvci9tZXJnZUVycm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQTtBQUMzQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sV0FBVyxDQUFBO0FBWWpDLE1BQU0sVUFBVSxXQUFXLENBQUMsYUFBa0I7SUFDNUMsSUFBTSxZQUFZLEdBQUcsWUFBWSx3QkFBSSxhQUFhLEVBQUMsQ0FBQTtJQUNuRCxPQUFPLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUE7QUFDcEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7bWVyZ2VPYmplY3RzfSBmcm9tICcuL21lcmdlT2JqZWN0cydcbmltcG9ydCB7aXNFbXB0eX0gZnJvbSAnLi9pc0VtcHR5J1xuaW1wb3J0IHtQbGFpbk9iamVjdH0gZnJvbSAnLi90eXBlcydcblxuLyoqXG4gKiAnbWVyZ2VFcnJvcnMnIHV0aWxpdHkgZnVuY3Rpb25cbiAqXG4gKiBNZXJnZXMgYW4gYXJyYXkgb2Ygb2JqZWN0cy5cbiAqIFVzZWQgZm9yIGNvbWJpbmluZyB0aGUgdmFsaWRhdG9yIGVycm9ycyByZXR1cm5lZCBmcm9tICdleGVjdXRlVmFsaWRhdG9ycydcbiAqXG4gKiBAcGFyYW0gYXJyYXlPZkVycm9ycyAtIGFycmF5IG9mIG9iamVjdHNcbiAqIEByZXR1cm4gbWVyZ2VkIG9iamVjdCwgb3IgbnVsbCBpZiBubyB1c2FibGUgaW5wdXQgb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VFcnJvcnMoYXJyYXlPZkVycm9yczogYW55KTogUGxhaW5PYmplY3Qge1xuICBjb25zdCBtZXJnZWRFcnJvcnMgPSBtZXJnZU9iamVjdHMoLi4uYXJyYXlPZkVycm9ycylcbiAgcmV0dXJuIGlzRW1wdHkobWVyZ2VkRXJyb3JzKSA/IG51bGwgOiBtZXJnZWRFcnJvcnNcbn1cbiJdfQ==