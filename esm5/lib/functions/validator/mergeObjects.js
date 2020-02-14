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
import { isObject } from './isObject';
import { isDefined } from './isDefined';
import { isBoolean } from './isBoolean';
import { getType } from './getType';
import { xor } from './xor';
export function mergeObjects() {
    var e_1, _a, e_2, _b;
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    var mergedObject = {};
    try {
        for (var objects_1 = __values(objects), objects_1_1 = objects_1.next(); !objects_1_1.done; objects_1_1 = objects_1.next()) {
            var currentObject = objects_1_1.value;
            if (isObject(currentObject)) {
                try {
                    for (var _c = (e_2 = void 0, __values(Object.keys(currentObject))), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var key = _d.value;
                        var currentValue = currentObject[key];
                        var mergedValue = mergedObject[key];
                        mergedObject[key] = !isDefined(mergedValue) ? currentValue :
                            key === 'not' && isBoolean(mergedValue, 'strict') &&
                                isBoolean(currentValue, 'strict') ? xor(mergedValue, currentValue) :
                                getType(mergedValue) === 'object' && getType(currentValue) === 'object' ?
                                    mergeObjects(mergedValue, currentValue) :
                                    currentValue;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (objects_1_1 && !objects_1_1.done && (_a = objects_1.return)) _a.call(objects_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return mergedObject;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VPYmplY3RzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdzZi1jb21tb24vIiwic291cmNlcyI6WyJsaWIvZnVuY3Rpb25zL3ZhbGlkYXRvci9tZXJnZU9iamVjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sWUFBWSxDQUFBO0FBQ25DLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxhQUFhLENBQUE7QUFDckMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGFBQWEsQ0FBQTtBQUNyQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sV0FBVyxDQUFBO0FBQ2pDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxPQUFPLENBQUE7QUFZekIsTUFBTSxVQUFVLFlBQVk7O0lBQUMsaUJBQXlCO1NBQXpCLFVBQXlCLEVBQXpCLHFCQUF5QixFQUF6QixJQUF5QjtRQUF6Qiw0QkFBeUI7O0lBQ3BELElBQU0sWUFBWSxHQUFnQixFQUFFLENBQUE7O1FBQ3BDLEtBQTRCLElBQUEsWUFBQSxTQUFBLE9BQU8sQ0FBQSxnQ0FBQSxxREFBRTtZQUFoQyxJQUFNLGFBQWEsb0JBQUE7WUFDdEIsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7O29CQUMzQixLQUFrQixJQUFBLG9CQUFBLFNBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQSxDQUFBLGdCQUFBLDRCQUFFO3dCQUF6QyxJQUFNLEdBQUcsV0FBQTt3QkFDWixJQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUE7d0JBQ3ZDLElBQU0sV0FBVyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQTt3QkFDckMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQzs0QkFDMUQsR0FBRyxLQUFLLEtBQUssSUFBSSxTQUFTLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQztnQ0FDakQsU0FBUyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO2dDQUNsRSxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQztvQ0FDdkUsWUFBWSxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO29DQUN6QyxZQUFZLENBQUE7cUJBQ25COzs7Ozs7Ozs7YUFDRjtTQUNGOzs7Ozs7Ozs7SUFDRCxPQUFPLFlBQVksQ0FBQTtBQUNyQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQbGFpbk9iamVjdH0gZnJvbSAnLi90eXBlcydcbmltcG9ydCB7aXNPYmplY3R9IGZyb20gJy4vaXNPYmplY3QnXG5pbXBvcnQge2lzRGVmaW5lZH0gZnJvbSAnLi9pc0RlZmluZWQnXG5pbXBvcnQge2lzQm9vbGVhbn0gZnJvbSAnLi9pc0Jvb2xlYW4nXG5pbXBvcnQge2dldFR5cGV9IGZyb20gJy4vZ2V0VHlwZSdcbmltcG9ydCB7eG9yfSBmcm9tICcuL3hvcidcblxuLyoqXG4gKiAnbWVyZ2VPYmplY3RzJyB1dGlsaXR5IGZ1bmN0aW9uXG4gKlxuICogUmVjdXJzaXZlbHkgTWVyZ2VzIG9uZSBvciBtb3JlIG9iamVjdHMgaW50byBhIHNpbmdsZSBvYmplY3Qgd2l0aCBjb21iaW5lZCBrZXlzLlxuICogQXV0b21hdGljYWxseSBkZXRlY3RzIGFuZCBpZ25vcmVzIG51bGwgYW5kIHVuZGVmaW5lZCBpbnB1dHMuXG4gKiBBbHNvIGRldGVjdHMgZHVwbGljYXRlZCBib29sZWFuICdub3QnIGtleXMgYW5kIFhPUnMgdGhlaXIgdmFsdWVzLlxuICpcbiAqIEBwYXJhbSBvYmplY3RzIC0gb25lIG9yIG1vcmUgb2JqZWN0cyB0byBtZXJnZVxuICogQHJldHVybiBtZXJnZWQgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZU9iamVjdHMoLi4ub2JqZWN0czogUGxhaW5PYmplY3RbXSk6IFBsYWluT2JqZWN0IHtcbiAgY29uc3QgbWVyZ2VkT2JqZWN0OiBQbGFpbk9iamVjdCA9IHt9XG4gIGZvciAoY29uc3QgY3VycmVudE9iamVjdCBvZiBvYmplY3RzKSB7XG4gICAgaWYgKGlzT2JqZWN0KGN1cnJlbnRPYmplY3QpKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhjdXJyZW50T2JqZWN0KSkge1xuICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBjdXJyZW50T2JqZWN0W2tleV1cbiAgICAgICAgY29uc3QgbWVyZ2VkVmFsdWUgPSBtZXJnZWRPYmplY3Rba2V5XVxuICAgICAgICBtZXJnZWRPYmplY3Rba2V5XSA9ICFpc0RlZmluZWQobWVyZ2VkVmFsdWUpID8gY3VycmVudFZhbHVlIDpcbiAgICAgICAgICBrZXkgPT09ICdub3QnICYmIGlzQm9vbGVhbihtZXJnZWRWYWx1ZSwgJ3N0cmljdCcpICYmXG4gICAgICAgICAgaXNCb29sZWFuKGN1cnJlbnRWYWx1ZSwgJ3N0cmljdCcpID8geG9yKG1lcmdlZFZhbHVlLCBjdXJyZW50VmFsdWUpIDpcbiAgICAgICAgICAgIGdldFR5cGUobWVyZ2VkVmFsdWUpID09PSAnb2JqZWN0JyAmJiBnZXRUeXBlKGN1cnJlbnRWYWx1ZSkgPT09ICdvYmplY3QnID9cbiAgICAgICAgICAgICAgbWVyZ2VPYmplY3RzKG1lcmdlZFZhbHVlLCBjdXJyZW50VmFsdWUpIDpcbiAgICAgICAgICAgICAgY3VycmVudFZhbHVlXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBtZXJnZWRPYmplY3Rcbn1cbiJdfQ==