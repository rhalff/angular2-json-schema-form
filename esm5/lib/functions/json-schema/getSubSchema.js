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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0U3ViU2NoZW1hLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nc2YvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2Z1bmN0aW9ucy9qc29uLXNjaGVtYS9nZXRTdWJTY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxXQUFXLEVBQVUsTUFBTSwwQkFBMEIsQ0FBQTtBQUM3RCxPQUFPLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFDeEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFBO0FBQzdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQTtBQUMzQyxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQTtBQUN2RSxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQTtBQUNyRSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQTtBQUszQixNQUFNLFVBQVUsWUFBWSxDQUMxQixNQUFXLEVBQ1gsVUFBNEIsRUFDNUIsZ0JBQStCLEVBQy9CLHFCQUFpRCxFQUNqRCxZQUEyQjtJQUYzQixpQ0FBQSxFQUFBLHVCQUErQjtJQUMvQixzQ0FBQSxFQUFBLDRCQUFpRDtJQUNqRCw2QkFBQSxFQUFBLGlCQUEyQjtJQUUzQixJQUFJLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtRQUMvQyxPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFBO0tBQy9DO0lBQ0QsSUFBTSxPQUFPLEdBQVcsT0FBTyxVQUFVLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUE7SUFFckcsWUFBWSxZQUFPLFlBQVksR0FBRSxPQUFPLEVBQUMsQ0FBQTtJQUN6QyxJQUFJLFNBQVMsR0FBUSxJQUFJLENBQUE7SUFDekIsSUFBSSxPQUFPLEtBQUssRUFBRSxFQUFFO1FBQ2xCLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0tBQ2hDO1NBQU07UUFDTCxJQUFNLFlBQVksR0FBRyx5QkFBeUIsQ0FBQyxPQUFPLEVBQUUscUJBQXFCLENBQUMsQ0FBQTtRQUM5RSxJQUFJLFlBQVksS0FBSyxPQUFPLEVBQUU7WUFDNUIsWUFBWSxZQUFPLFlBQVksR0FBRSxZQUFZLEVBQUMsQ0FBQTtTQUMvQztRQUNELFNBQVMsR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFDO1lBQ25DLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNsQyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7WUFDakIsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDO1NBQ3ZCLENBQUMsQ0FBQTtLQUNIO0lBQ0QsT0FBTyxXQUFXLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxVQUFDLFNBQVMsRUFBRSxVQUFVO1FBQ2xFLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBRXZCLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDNUIsSUFBTSxZQUFVLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ3RELElBQUksWUFBVSxDQUFDLE1BQU0sSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLFVBQUEsR0FBRztvQkFDN0MsT0FBQSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsWUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7Z0JBQWhELENBQWdELENBQ2pELEVBQUU7b0JBQ0QsSUFBTSxTQUFTLEdBQUcsWUFBWSxDQUM1QixNQUFNLEVBQUUsWUFBVSxFQUFFLGdCQUFnQixFQUFFLHFCQUFxQixFQUFFLFlBQVksQ0FDMUUsQ0FBQTtvQkFDRCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTt3QkFDdkMsT0FBTyxTQUFTLENBQUE7cUJBQ2pCO3lCQUFNO3dCQUNMLElBQU0sU0FBUyxnQkFBTyxTQUFTLENBQUMsQ0FBQTt3QkFDaEMsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFBO3dCQUNyQixPQUFPLFlBQVksQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUE7cUJBQzFDO2lCQUNGO2FBQ0Y7WUFLRCxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzVCLE9BQU8sWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFBO2FBQy9CO1lBR0QsSUFBSSxTQUFTLENBQUMsSUFBSSxLQUFLLE9BQU8sSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUM3RCxPQUFPLDBCQUEwQixDQUFDLFNBQVMsQ0FBQyxDQUFBO2FBQzdDO1NBQ0Y7UUFDRCxPQUFPLFNBQVMsQ0FBQTtJQUNsQixDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0pzb25Qb2ludGVyLCBQb2ludGVyfSBmcm9tICcuLi9qc29ucG9pbnRlci5mdW5jdGlvbnMnXG5pbXBvcnQge2lzQXJyYXksIGlzT2JqZWN0LCBpc1N0cmluZ30gZnJvbSAnLi4vdmFsaWRhdG9yJ1xuaW1wb3J0IHttZXJnZVNjaGVtYXN9IGZyb20gJy4uL21lcmdlLXNjaGVtYXMnXG5pbXBvcnQge2NvbWJpbmVBbGxPZn0gZnJvbSAnLi9jb21iaW5lQWxsT2YnXG5pbXBvcnQge2ZpeFJlcXVpcmVkQXJyYXlQcm9wZXJ0aWVzfSBmcm9tICcuL2ZpeFJlcXVpcmVkQXJyYXlQcm9wZXJ0aWVzJ1xuaW1wb3J0IHtyZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzfSBmcm9tICcuL3JlbW92ZVJlY3Vyc2l2ZVJlZmVyZW5jZXMnXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCdcblxuLyoqXG4gKiAnZ2V0U3ViU2NoZW1hJyBmdW5jdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3ViU2NoZW1hKFxuICBzY2hlbWE6IGFueSxcbiAgcG9pbnRlckFyZzogUG9pbnRlciB8IHN0cmluZyxcbiAgc2NoZW1hUmVmTGlicmFyeTogb2JqZWN0ID0gbnVsbCxcbiAgc2NoZW1hUmVjdXJzaXZlUmVmTWFwOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbnVsbCxcbiAgdXNlZFBvaW50ZXJzOiBzdHJpbmdbXSA9IFtdXG4pIHtcbiAgaWYgKCFzY2hlbWFSZWZMaWJyYXJ5IHx8ICFzY2hlbWFSZWN1cnNpdmVSZWZNYXApIHtcbiAgICByZXR1cm4gSnNvblBvaW50ZXIuZ2V0Q29weShzY2hlbWEsIHBvaW50ZXJBcmcpXG4gIH1cbiAgY29uc3QgcG9pbnRlcjogc3RyaW5nID0gdHlwZW9mIHBvaW50ZXJBcmcgIT09ICdzdHJpbmcnID8gSnNvblBvaW50ZXIuY29tcGlsZShwb2ludGVyQXJnKSA6IHBvaW50ZXJBcmdcblxuICB1c2VkUG9pbnRlcnMgPSBbLi4udXNlZFBvaW50ZXJzLCBwb2ludGVyXVxuICBsZXQgbmV3U2NoZW1hOiBhbnkgPSBudWxsXG4gIGlmIChwb2ludGVyID09PSAnJykge1xuICAgIG5ld1NjaGVtYSA9IF8uY2xvbmVEZWVwKHNjaGVtYSlcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBzaG9ydFBvaW50ZXIgPSByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzKHBvaW50ZXIsIHNjaGVtYVJlY3Vyc2l2ZVJlZk1hcClcbiAgICBpZiAoc2hvcnRQb2ludGVyICE9PSBwb2ludGVyKSB7XG4gICAgICB1c2VkUG9pbnRlcnMgPSBbLi4udXNlZFBvaW50ZXJzLCBzaG9ydFBvaW50ZXJdXG4gICAgfVxuICAgIG5ld1NjaGVtYSA9IEpzb25Qb2ludGVyLmdldEZpcnN0Q29weShbXG4gICAgICBbc2NoZW1hUmVmTGlicmFyeSwgW3Nob3J0UG9pbnRlcl1dLFxuICAgICAgW3NjaGVtYSwgcG9pbnRlcl0sXG4gICAgICBbc2NoZW1hLCBzaG9ydFBvaW50ZXJdXG4gICAgXSlcbiAgfVxuICByZXR1cm4gSnNvblBvaW50ZXIuZm9yRWFjaERlZXBDb3B5KG5ld1NjaGVtYSwgKHN1YlNjaGVtYSwgc3ViUG9pbnRlcikgPT4ge1xuICAgIGlmIChpc09iamVjdChzdWJTY2hlbWEpKSB7XG4gICAgICAvLyBSZXBsYWNlIG5vbi1yZWN1cnNpdmUgJHJlZiBsaW5rcyB3aXRoIHJlZmVyZW5jZWQgc2NoZW1hc1xuICAgICAgaWYgKGlzU3RyaW5nKHN1YlNjaGVtYS4kcmVmKSkge1xuICAgICAgICBjb25zdCByZWZQb2ludGVyID0gSnNvblBvaW50ZXIuY29tcGlsZShzdWJTY2hlbWEuJHJlZilcbiAgICAgICAgaWYgKHJlZlBvaW50ZXIubGVuZ3RoICYmIHVzZWRQb2ludGVycy5ldmVyeShwdHIgPT5cbiAgICAgICAgICAhSnNvblBvaW50ZXIuaXNTdWJQb2ludGVyKHJlZlBvaW50ZXIsIHB0ciwgdHJ1ZSlcbiAgICAgICAgKSkge1xuICAgICAgICAgIGNvbnN0IHJlZlNjaGVtYSA9IGdldFN1YlNjaGVtYShcbiAgICAgICAgICAgIHNjaGVtYSwgcmVmUG9pbnRlciwgc2NoZW1hUmVmTGlicmFyeSwgc2NoZW1hUmVjdXJzaXZlUmVmTWFwLCB1c2VkUG9pbnRlcnNcbiAgICAgICAgICApXG4gICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHN1YlNjaGVtYSkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVmU2NoZW1hXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGV4dHJhS2V5cyA9IHsuLi5zdWJTY2hlbWF9XG4gICAgICAgICAgICBkZWxldGUgZXh0cmFLZXlzLiRyZWZcbiAgICAgICAgICAgIHJldHVybiBtZXJnZVNjaGVtYXMocmVmU2NoZW1hLCBleHRyYUtleXMpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRPRE86IENvbnZlcnQgc2NoZW1hcyB3aXRoICd0eXBlJyBhcnJheXMgdG8gJ29uZU9mJ1xuXG4gICAgICAvLyBDb21iaW5lIGFsbE9mIHN1YlNjaGVtYXNcbiAgICAgIGlmIChpc0FycmF5KHN1YlNjaGVtYS5hbGxPZikpIHtcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVBbGxPZihzdWJTY2hlbWEpXG4gICAgICB9XG5cbiAgICAgIC8vIEZpeCBpbmNvcnJlY3RseSBwbGFjZWQgYXJyYXkgb2JqZWN0IHJlcXVpcmVkIGxpc3RzXG4gICAgICBpZiAoc3ViU2NoZW1hLnR5cGUgPT09ICdhcnJheScgJiYgaXNBcnJheShzdWJTY2hlbWEucmVxdWlyZWQpKSB7XG4gICAgICAgIHJldHVybiBmaXhSZXF1aXJlZEFycmF5UHJvcGVydGllcyhzdWJTY2hlbWEpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdWJTY2hlbWFcbiAgfSwgdHJ1ZSwgcG9pbnRlcilcbn1cbiJdfQ==