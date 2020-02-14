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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VPYmplY3RzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nc2YvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2Z1bmN0aW9ucy92YWxpZGF0b3IvbWVyZ2VPYmplY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLFlBQVksQ0FBQTtBQUNuQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sYUFBYSxDQUFBO0FBQ3JDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxhQUFhLENBQUE7QUFDckMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFdBQVcsQ0FBQTtBQUNqQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sT0FBTyxDQUFBO0FBWXpCLE1BQU0sVUFBVSxZQUFZOztJQUFDLGlCQUF5QjtTQUF6QixVQUF5QixFQUF6QixxQkFBeUIsRUFBekIsSUFBeUI7UUFBekIsNEJBQXlCOztJQUNwRCxJQUFNLFlBQVksR0FBZ0IsRUFBRSxDQUFBOztRQUNwQyxLQUE0QixJQUFBLFlBQUEsU0FBQSxPQUFPLENBQUEsZ0NBQUEscURBQUU7WUFBaEMsSUFBTSxhQUFhLG9CQUFBO1lBQ3RCLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFOztvQkFDM0IsS0FBa0IsSUFBQSxvQkFBQSxTQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUEsQ0FBQSxnQkFBQSw0QkFBRTt3QkFBekMsSUFBTSxHQUFHLFdBQUE7d0JBQ1osSUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFBO3dCQUN2QyxJQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUE7d0JBQ3JDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7NEJBQzFELEdBQUcsS0FBSyxLQUFLLElBQUksU0FBUyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUM7Z0NBQ2pELFNBQVMsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztnQ0FDbEUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLFFBQVEsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUM7b0NBQ3ZFLFlBQVksQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztvQ0FDekMsWUFBWSxDQUFBO3FCQUNuQjs7Ozs7Ozs7O2FBQ0Y7U0FDRjs7Ozs7Ozs7O0lBQ0QsT0FBTyxZQUFZLENBQUE7QUFDckIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGxhaW5PYmplY3R9IGZyb20gJy4vdHlwZXMnXG5pbXBvcnQge2lzT2JqZWN0fSBmcm9tICcuL2lzT2JqZWN0J1xuaW1wb3J0IHtpc0RlZmluZWR9IGZyb20gJy4vaXNEZWZpbmVkJ1xuaW1wb3J0IHtpc0Jvb2xlYW59IGZyb20gJy4vaXNCb29sZWFuJ1xuaW1wb3J0IHtnZXRUeXBlfSBmcm9tICcuL2dldFR5cGUnXG5pbXBvcnQge3hvcn0gZnJvbSAnLi94b3InXG5cbi8qKlxuICogJ21lcmdlT2JqZWN0cycgdXRpbGl0eSBmdW5jdGlvblxuICpcbiAqIFJlY3Vyc2l2ZWx5IE1lcmdlcyBvbmUgb3IgbW9yZSBvYmplY3RzIGludG8gYSBzaW5nbGUgb2JqZWN0IHdpdGggY29tYmluZWQga2V5cy5cbiAqIEF1dG9tYXRpY2FsbHkgZGV0ZWN0cyBhbmQgaWdub3JlcyBudWxsIGFuZCB1bmRlZmluZWQgaW5wdXRzLlxuICogQWxzbyBkZXRlY3RzIGR1cGxpY2F0ZWQgYm9vbGVhbiAnbm90JyBrZXlzIGFuZCBYT1JzIHRoZWlyIHZhbHVlcy5cbiAqXG4gKiBAcGFyYW0gb2JqZWN0cyAtIG9uZSBvciBtb3JlIG9iamVjdHMgdG8gbWVyZ2VcbiAqIEByZXR1cm4gbWVyZ2VkIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VPYmplY3RzKC4uLm9iamVjdHM6IFBsYWluT2JqZWN0W10pOiBQbGFpbk9iamVjdCB7XG4gIGNvbnN0IG1lcmdlZE9iamVjdDogUGxhaW5PYmplY3QgPSB7fVxuICBmb3IgKGNvbnN0IGN1cnJlbnRPYmplY3Qgb2Ygb2JqZWN0cykge1xuICAgIGlmIChpc09iamVjdChjdXJyZW50T2JqZWN0KSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoY3VycmVudE9iamVjdCkpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gY3VycmVudE9iamVjdFtrZXldXG4gICAgICAgIGNvbnN0IG1lcmdlZFZhbHVlID0gbWVyZ2VkT2JqZWN0W2tleV1cbiAgICAgICAgbWVyZ2VkT2JqZWN0W2tleV0gPSAhaXNEZWZpbmVkKG1lcmdlZFZhbHVlKSA/IGN1cnJlbnRWYWx1ZSA6XG4gICAgICAgICAga2V5ID09PSAnbm90JyAmJiBpc0Jvb2xlYW4obWVyZ2VkVmFsdWUsICdzdHJpY3QnKSAmJlxuICAgICAgICAgIGlzQm9vbGVhbihjdXJyZW50VmFsdWUsICdzdHJpY3QnKSA/IHhvcihtZXJnZWRWYWx1ZSwgY3VycmVudFZhbHVlKSA6XG4gICAgICAgICAgICBnZXRUeXBlKG1lcmdlZFZhbHVlKSA9PT0gJ29iamVjdCcgJiYgZ2V0VHlwZShjdXJyZW50VmFsdWUpID09PSAnb2JqZWN0JyA/XG4gICAgICAgICAgICAgIG1lcmdlT2JqZWN0cyhtZXJnZWRWYWx1ZSwgY3VycmVudFZhbHVlKSA6XG4gICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbWVyZ2VkT2JqZWN0XG59XG4iXX0=