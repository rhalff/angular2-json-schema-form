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
import { isArray, isObject } from '../validator';
import { mergeSchemas } from '../merge-schemas';
export function combineAllOf(schema) {
    if (!isObject(schema) || !isArray(schema.allOf)) {
        return schema;
    }
    var mergedSchema = mergeSchemas.apply(void 0, __spread(schema.allOf));
    if (Object.keys(schema).length > 1) {
        var extraKeys = __assign({}, schema);
        delete extraKeys.allOf;
        mergedSchema = mergeSchemas(mergedSchema, extraKeys);
    }
    return mergedSchema;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tYmluZUFsbE9mLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdzZi1jb21tb24vIiwic291cmNlcyI6WyJsaWIvZnVuY3Rpb25zL2pzb24tc2NoZW1hL2NvbWJpbmVBbGxPZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFDOUMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFBO0FBVzdDLE1BQU0sVUFBVSxZQUFZLENBQUMsTUFBVztJQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUMvQyxPQUFPLE1BQU0sQ0FBQTtLQUNkO0lBQ0QsSUFBSSxZQUFZLEdBQUcsWUFBWSx3QkFBSSxNQUFNLENBQUMsS0FBSyxFQUFDLENBQUE7SUFDaEQsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDbEMsSUFBTSxTQUFTLGdCQUFPLE1BQU0sQ0FBQyxDQUFBO1FBQzdCLE9BQU8sU0FBUyxDQUFDLEtBQUssQ0FBQTtRQUN0QixZQUFZLEdBQUcsWUFBWSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQTtLQUNyRDtJQUNELE9BQU8sWUFBWSxDQUFBO0FBQ3JCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzQXJyYXksIGlzT2JqZWN0fSBmcm9tICcuLi92YWxpZGF0b3InXG5pbXBvcnQge21lcmdlU2NoZW1hc30gZnJvbSAnLi4vbWVyZ2Utc2NoZW1hcydcblxuLyoqXG4gKiAnY29tYmluZUFsbE9mJyBmdW5jdGlvblxuICpcbiAqIEF0dGVtcHQgdG8gY29udmVydCBhbiBhbGxPZiBzY2hlbWEgb2JqZWN0IGludG9cbiAqIGEgbm9uLWFsbE9mIHNjaGVtYSBvYmplY3Qgd2l0aCBlcXVpdmFsZW50IHJ1bGVzLlxuICpcbiAqIEBwYXJhbSAgc2NoZW1hIC0gYWxsT2Ygc2NoZW1hIG9iamVjdFxuICogQHJldHVybiBjb252ZXJ0ZWQgc2NoZW1hIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUFsbE9mKHNjaGVtYTogYW55KSB7XG4gIGlmICghaXNPYmplY3Qoc2NoZW1hKSB8fCAhaXNBcnJheShzY2hlbWEuYWxsT2YpKSB7XG4gICAgcmV0dXJuIHNjaGVtYVxuICB9XG4gIGxldCBtZXJnZWRTY2hlbWEgPSBtZXJnZVNjaGVtYXMoLi4uc2NoZW1hLmFsbE9mKVxuICBpZiAoT2JqZWN0LmtleXMoc2NoZW1hKS5sZW5ndGggPiAxKSB7XG4gICAgY29uc3QgZXh0cmFLZXlzID0gey4uLnNjaGVtYX1cbiAgICBkZWxldGUgZXh0cmFLZXlzLmFsbE9mXG4gICAgbWVyZ2VkU2NoZW1hID0gbWVyZ2VTY2hlbWFzKG1lcmdlZFNjaGVtYSwgZXh0cmFLZXlzKVxuICB9XG4gIHJldHVybiBtZXJnZWRTY2hlbWFcbn1cbiJdfQ==