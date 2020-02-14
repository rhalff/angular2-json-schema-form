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
import { JsonPointer } from '../jsonpointer.functions';
import { isArray, isObject, isString } from '../validator';
import { mergeSchemas } from '../merge-schemas';
import { combineAllOf } from './combineAllOf';
import { fixRequiredArrayProperties } from './fixRequiredArrayProperties';
import { removeRecursiveReferences } from './removeRecursiveReferences';
import * as _ from 'lodash';
export function getSubSchema(schema, pointerArg, schemaRefLibrary, schemaRecursiveRefMap, usedPointers) {
    if (schemaRefLibrary === void 0) { schemaRefLibrary = null; }
    if (schemaRecursiveRefMap === void 0) { schemaRecursiveRefMap = null; }
    if (usedPointers === void 0) { usedPointers = []; }
    if (!schemaRefLibrary || !schemaRecursiveRefMap) {
        return JsonPointer.getCopy(schema, pointerArg);
    }
    var pointer = typeof pointerArg !== 'string' ? JsonPointer.compile(pointerArg) : pointerArg;
    usedPointers = __spread(usedPointers, [pointer]);
    var newSchema = null;
    if (pointer === '') {
        newSchema = _.cloneDeep(schema);
    }
    else {
        var shortPointer = removeRecursiveReferences(pointer, schemaRecursiveRefMap);
        if (shortPointer !== pointer) {
            usedPointers = __spread(usedPointers, [shortPointer]);
        }
        newSchema = JsonPointer.getFirstCopy([
            [schemaRefLibrary, [shortPointer]],
            [schema, pointer],
            [schema, shortPointer]
        ]);
    }
    return JsonPointer.forEachDeepCopy(newSchema, function (subSchema, subPointer) {
        if (isObject(subSchema)) {
            if (isString(subSchema.$ref)) {
                var refPointer_1 = JsonPointer.compile(subSchema.$ref);
                if (refPointer_1.length && usedPointers.every(function (ptr) {
                    return !JsonPointer.isSubPointer(refPointer_1, ptr, true);
                })) {
                    var refSchema = getSubSchema(schema, refPointer_1, schemaRefLibrary, schemaRecursiveRefMap, usedPointers);
                    if (Object.keys(subSchema).length === 1) {
                        return refSchema;
                    }
                    else {
                        var extraKeys = __assign({}, subSchema);
                        delete extraKeys.$ref;
                        return mergeSchemas(refSchema, extraKeys);
                    }
                }
            }
            if (isArray(subSchema.allOf)) {
                return combineAllOf(subSchema);
            }
            if (subSchema.type === 'array' && isArray(subSchema.required)) {
                return fixRequiredArrayProperties(subSchema);
            }
        }
        return subSchema;
    }, true, pointer);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0U3ViU2NoZW1hLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdzZi1jb21tb24vIiwic291cmNlcyI6WyJsaWIvZnVuY3Rpb25zL2pzb24tc2NoZW1hL2dldFN1YlNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFdBQVcsRUFBVSxNQUFNLDBCQUEwQixDQUFBO0FBQzdELE9BQU8sRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUN4RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sa0JBQWtCLENBQUE7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFBO0FBQzNDLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLDhCQUE4QixDQUFBO0FBQ3ZFLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLDZCQUE2QixDQUFBO0FBQ3JFLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFBO0FBSzNCLE1BQU0sVUFBVSxZQUFZLENBQzFCLE1BQVcsRUFDWCxVQUE0QixFQUM1QixnQkFBK0IsRUFDL0IscUJBQWlELEVBQ2pELFlBQTJCO0lBRjNCLGlDQUFBLEVBQUEsdUJBQStCO0lBQy9CLHNDQUFBLEVBQUEsNEJBQWlEO0lBQ2pELDZCQUFBLEVBQUEsaUJBQTJCO0lBRTNCLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLHFCQUFxQixFQUFFO1FBQy9DLE9BQU8sV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUE7S0FDL0M7SUFDRCxJQUFNLE9BQU8sR0FBVyxPQUFPLFVBQVUsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQTtJQUVyRyxZQUFZLFlBQU8sWUFBWSxHQUFFLE9BQU8sRUFBQyxDQUFBO0lBQ3pDLElBQUksU0FBUyxHQUFRLElBQUksQ0FBQTtJQUN6QixJQUFJLE9BQU8sS0FBSyxFQUFFLEVBQUU7UUFDbEIsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7S0FDaEM7U0FBTTtRQUNMLElBQU0sWUFBWSxHQUFHLHlCQUF5QixDQUFDLE9BQU8sRUFBRSxxQkFBcUIsQ0FBQyxDQUFBO1FBQzlFLElBQUksWUFBWSxLQUFLLE9BQU8sRUFBRTtZQUM1QixZQUFZLFlBQU8sWUFBWSxHQUFFLFlBQVksRUFBQyxDQUFBO1NBQy9DO1FBQ0QsU0FBUyxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUM7WUFDbkMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2xDLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQztZQUNqQixDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUM7U0FDdkIsQ0FBQyxDQUFBO0tBQ0g7SUFDRCxPQUFPLFdBQVcsQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLFVBQUMsU0FBUyxFQUFFLFVBQVU7UUFDbEUsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFFdkIsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM1QixJQUFNLFlBQVUsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDdEQsSUFBSSxZQUFVLENBQUMsTUFBTSxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsVUFBQSxHQUFHO29CQUM3QyxPQUFBLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxZQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQztnQkFBaEQsQ0FBZ0QsQ0FDakQsRUFBRTtvQkFDRCxJQUFNLFNBQVMsR0FBRyxZQUFZLENBQzVCLE1BQU0sRUFBRSxZQUFVLEVBQUUsZ0JBQWdCLEVBQUUscUJBQXFCLEVBQUUsWUFBWSxDQUMxRSxDQUFBO29CQUNELElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO3dCQUN2QyxPQUFPLFNBQVMsQ0FBQTtxQkFDakI7eUJBQU07d0JBQ0wsSUFBTSxTQUFTLGdCQUFPLFNBQVMsQ0FBQyxDQUFBO3dCQUNoQyxPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUE7d0JBQ3JCLE9BQU8sWUFBWSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQTtxQkFDMUM7aUJBQ0Y7YUFDRjtZQUtELElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDNUIsT0FBTyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUE7YUFDL0I7WUFHRCxJQUFJLFNBQVMsQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQzdELE9BQU8sMEJBQTBCLENBQUMsU0FBUyxDQUFDLENBQUE7YUFDN0M7U0FDRjtRQUNELE9BQU8sU0FBUyxDQUFBO0lBQ2xCLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDbkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SnNvblBvaW50ZXIsIFBvaW50ZXJ9IGZyb20gJy4uL2pzb25wb2ludGVyLmZ1bmN0aW9ucydcbmltcG9ydCB7aXNBcnJheSwgaXNPYmplY3QsIGlzU3RyaW5nfSBmcm9tICcuLi92YWxpZGF0b3InXG5pbXBvcnQge21lcmdlU2NoZW1hc30gZnJvbSAnLi4vbWVyZ2Utc2NoZW1hcydcbmltcG9ydCB7Y29tYmluZUFsbE9mfSBmcm9tICcuL2NvbWJpbmVBbGxPZidcbmltcG9ydCB7Zml4UmVxdWlyZWRBcnJheVByb3BlcnRpZXN9IGZyb20gJy4vZml4UmVxdWlyZWRBcnJheVByb3BlcnRpZXMnXG5pbXBvcnQge3JlbW92ZVJlY3Vyc2l2ZVJlZmVyZW5jZXN9IGZyb20gJy4vcmVtb3ZlUmVjdXJzaXZlUmVmZXJlbmNlcydcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJ1xuXG4vKipcbiAqICdnZXRTdWJTY2hlbWEnIGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdWJTY2hlbWEoXG4gIHNjaGVtYTogYW55LFxuICBwb2ludGVyQXJnOiBQb2ludGVyIHwgc3RyaW5nLFxuICBzY2hlbWFSZWZMaWJyYXJ5OiBvYmplY3QgPSBudWxsLFxuICBzY2hlbWFSZWN1cnNpdmVSZWZNYXA6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBudWxsLFxuICB1c2VkUG9pbnRlcnM6IHN0cmluZ1tdID0gW11cbikge1xuICBpZiAoIXNjaGVtYVJlZkxpYnJhcnkgfHwgIXNjaGVtYVJlY3Vyc2l2ZVJlZk1hcCkge1xuICAgIHJldHVybiBKc29uUG9pbnRlci5nZXRDb3B5KHNjaGVtYSwgcG9pbnRlckFyZylcbiAgfVxuICBjb25zdCBwb2ludGVyOiBzdHJpbmcgPSB0eXBlb2YgcG9pbnRlckFyZyAhPT0gJ3N0cmluZycgPyBKc29uUG9pbnRlci5jb21waWxlKHBvaW50ZXJBcmcpIDogcG9pbnRlckFyZ1xuXG4gIHVzZWRQb2ludGVycyA9IFsuLi51c2VkUG9pbnRlcnMsIHBvaW50ZXJdXG4gIGxldCBuZXdTY2hlbWE6IGFueSA9IG51bGxcbiAgaWYgKHBvaW50ZXIgPT09ICcnKSB7XG4gICAgbmV3U2NoZW1hID0gXy5jbG9uZURlZXAoc2NoZW1hKVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IHNob3J0UG9pbnRlciA9IHJlbW92ZVJlY3Vyc2l2ZVJlZmVyZW5jZXMocG9pbnRlciwgc2NoZW1hUmVjdXJzaXZlUmVmTWFwKVxuICAgIGlmIChzaG9ydFBvaW50ZXIgIT09IHBvaW50ZXIpIHtcbiAgICAgIHVzZWRQb2ludGVycyA9IFsuLi51c2VkUG9pbnRlcnMsIHNob3J0UG9pbnRlcl1cbiAgICB9XG4gICAgbmV3U2NoZW1hID0gSnNvblBvaW50ZXIuZ2V0Rmlyc3RDb3B5KFtcbiAgICAgIFtzY2hlbWFSZWZMaWJyYXJ5LCBbc2hvcnRQb2ludGVyXV0sXG4gICAgICBbc2NoZW1hLCBwb2ludGVyXSxcbiAgICAgIFtzY2hlbWEsIHNob3J0UG9pbnRlcl1cbiAgICBdKVxuICB9XG4gIHJldHVybiBKc29uUG9pbnRlci5mb3JFYWNoRGVlcENvcHkobmV3U2NoZW1hLCAoc3ViU2NoZW1hLCBzdWJQb2ludGVyKSA9PiB7XG4gICAgaWYgKGlzT2JqZWN0KHN1YlNjaGVtYSkpIHtcbiAgICAgIC8vIFJlcGxhY2Ugbm9uLXJlY3Vyc2l2ZSAkcmVmIGxpbmtzIHdpdGggcmVmZXJlbmNlZCBzY2hlbWFzXG4gICAgICBpZiAoaXNTdHJpbmcoc3ViU2NoZW1hLiRyZWYpKSB7XG4gICAgICAgIGNvbnN0IHJlZlBvaW50ZXIgPSBKc29uUG9pbnRlci5jb21waWxlKHN1YlNjaGVtYS4kcmVmKVxuICAgICAgICBpZiAocmVmUG9pbnRlci5sZW5ndGggJiYgdXNlZFBvaW50ZXJzLmV2ZXJ5KHB0ciA9PlxuICAgICAgICAgICFKc29uUG9pbnRlci5pc1N1YlBvaW50ZXIocmVmUG9pbnRlciwgcHRyLCB0cnVlKVxuICAgICAgICApKSB7XG4gICAgICAgICAgY29uc3QgcmVmU2NoZW1hID0gZ2V0U3ViU2NoZW1hKFxuICAgICAgICAgICAgc2NoZW1hLCByZWZQb2ludGVyLCBzY2hlbWFSZWZMaWJyYXJ5LCBzY2hlbWFSZWN1cnNpdmVSZWZNYXAsIHVzZWRQb2ludGVyc1xuICAgICAgICAgIClcbiAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoc3ViU2NoZW1hKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiByZWZTY2hlbWFcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZXh0cmFLZXlzID0gey4uLnN1YlNjaGVtYX1cbiAgICAgICAgICAgIGRlbGV0ZSBleHRyYUtleXMuJHJlZlxuICAgICAgICAgICAgcmV0dXJuIG1lcmdlU2NoZW1hcyhyZWZTY2hlbWEsIGV4dHJhS2V5cylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVE9ETzogQ29udmVydCBzY2hlbWFzIHdpdGggJ3R5cGUnIGFycmF5cyB0byAnb25lT2YnXG5cbiAgICAgIC8vIENvbWJpbmUgYWxsT2Ygc3ViU2NoZW1hc1xuICAgICAgaWYgKGlzQXJyYXkoc3ViU2NoZW1hLmFsbE9mKSkge1xuICAgICAgICByZXR1cm4gY29tYmluZUFsbE9mKHN1YlNjaGVtYSlcbiAgICAgIH1cblxuICAgICAgLy8gRml4IGluY29ycmVjdGx5IHBsYWNlZCBhcnJheSBvYmplY3QgcmVxdWlyZWQgbGlzdHNcbiAgICAgIGlmIChzdWJTY2hlbWEudHlwZSA9PT0gJ2FycmF5JyAmJiBpc0FycmF5KHN1YlNjaGVtYS5yZXF1aXJlZCkpIHtcbiAgICAgICAgcmV0dXJuIGZpeFJlcXVpcmVkQXJyYXlQcm9wZXJ0aWVzKHN1YlNjaGVtYSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN1YlNjaGVtYVxuICB9LCB0cnVlLCBwb2ludGVyKVxufVxuIl19