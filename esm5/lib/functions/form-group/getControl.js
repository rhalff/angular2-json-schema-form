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
import { JsonPointer } from '../jsonpointer.functions';
import { isArray, isObject } from '../validator';
import { hasOwn } from '../utility';
export function getControl(formGroup, dataPointer, returnGroup) {
    var e_1, _a;
    if (returnGroup === void 0) { returnGroup = false; }
    if (!isObject(formGroup) || !JsonPointer.isJsonPointer(dataPointer)) {
        if (!JsonPointer.isJsonPointer(dataPointer)) {
            if (typeof dataPointer === 'string') {
                var formControl = formGroup.get(dataPointer);
                if (formControl) {
                    return formControl;
                }
            }
            console.error("getControl error: Invalid JSON Pointer: " + dataPointer);
        }
        if (!isObject(formGroup)) {
            console.error("getControl error: Invalid formGroup: " + formGroup);
        }
        return null;
    }
    var dataPointerArray = JsonPointer.parse(dataPointer);
    if (returnGroup) {
        dataPointerArray = dataPointerArray.slice(0, -1);
    }
    if (typeof formGroup.get === 'function' &&
        dataPointerArray.every(function (key) { return key.indexOf('.') === -1; })) {
        var formControl = formGroup.get(dataPointerArray.join('.'));
        if (formControl) {
            return formControl;
        }
    }
    var subGroup = formGroup;
    try {
        for (var dataPointerArray_1 = __values(dataPointerArray), dataPointerArray_1_1 = dataPointerArray_1.next(); !dataPointerArray_1_1.done; dataPointerArray_1_1 = dataPointerArray_1.next()) {
            var key = dataPointerArray_1_1.value;
            if (hasOwn(subGroup, 'controls')) {
                subGroup = subGroup.controls;
            }
            if (isArray(subGroup) && (key === '-')) {
                subGroup = subGroup[subGroup.length - 1];
            }
            else if (hasOwn(subGroup, key)) {
                subGroup = subGroup[key];
            }
            else {
                console.error("getControl error: Unable to find \"" + key + "\" item in FormGroup.");
                console.error(dataPointer);
                console.error(formGroup);
                return;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (dataPointerArray_1_1 && !dataPointerArray_1_1.done && (_a = dataPointerArray_1.return)) _a.call(dataPointerArray_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return subGroup;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Q29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nc2YtY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2Z1bmN0aW9ucy9mb3JtLWdyb3VwL2dldENvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsV0FBVyxFQUFVLE1BQU0sMEJBQTBCLENBQUE7QUFDN0QsT0FBTyxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFDOUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFlBQVksQ0FBQTtBQWtCakMsTUFBTSxVQUFVLFVBQVUsQ0FDeEIsU0FBb0IsRUFBRSxXQUFvQixFQUFFLFdBQW1COztJQUFuQiw0QkFBQSxFQUFBLG1CQUFtQjtJQUUvRCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUNuRSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUczQyxJQUFJLE9BQU8sV0FBVyxLQUFLLFFBQVEsRUFBRTtnQkFDbkMsSUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtnQkFDOUMsSUFBSSxXQUFXLEVBQUU7b0JBQ2YsT0FBTyxXQUFXLENBQUE7aUJBQ25CO2FBQ0Y7WUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLDZDQUEyQyxXQUFhLENBQUMsQ0FBQTtTQUN4RTtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxDQUFDLEtBQUssQ0FBQywwQ0FBd0MsU0FBVyxDQUFDLENBQUE7U0FDbkU7UUFDRCxPQUFPLElBQUksQ0FBQTtLQUNaO0lBQ0QsSUFBSSxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ3JELElBQUksV0FBVyxFQUFFO1FBQ2YsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ2pEO0lBSUQsSUFBSSxPQUFPLFNBQVMsQ0FBQyxHQUFHLEtBQUssVUFBVTtRQUNyQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUF2QixDQUF1QixDQUFDLEVBQ3REO1FBQ0EsSUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUM3RCxJQUFJLFdBQVcsRUFBRTtZQUNmLE9BQU8sV0FBVyxDQUFBO1NBQ25CO0tBQ0Y7SUFLRCxJQUFJLFFBQVEsR0FBUSxTQUFTLENBQUE7O1FBQzdCLEtBQWtCLElBQUEscUJBQUEsU0FBQSxnQkFBZ0IsQ0FBQSxrREFBQSxnRkFBRTtZQUEvQixJQUFNLEdBQUcsNkJBQUE7WUFDWixJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLEVBQUU7Z0JBQ2hDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFBO2FBQzdCO1lBQ0QsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ3RDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTthQUN6QztpQkFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hDLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDekI7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyx3Q0FBcUMsR0FBRywwQkFBc0IsQ0FBQyxDQUFBO2dCQUM3RSxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFBO2dCQUMxQixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO2dCQUN4QixPQUFNO2FBQ1A7U0FDRjs7Ozs7Ozs7O0lBQ0QsT0FBTyxRQUFRLENBQUE7QUFDakIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SnNvblBvaW50ZXIsIFBvaW50ZXJ9IGZyb20gJy4uL2pzb25wb2ludGVyLmZ1bmN0aW9ucydcbmltcG9ydCB7aXNBcnJheSwgaXNPYmplY3R9IGZyb20gJy4uL3ZhbGlkYXRvcidcbmltcG9ydCB7aGFzT3dufSBmcm9tICcuLi91dGlsaXR5J1xuaW1wb3J0IHtGb3JtR3JvdXB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJ1xuXG4vKipcbiAqICdnZXRDb250cm9sJyBmdW5jdGlvblxuICpcbiAqIFVzZXMgYSBKU09OIFBvaW50ZXIgZm9yIGEgZGF0YSBvYmplY3QgdG8gcmV0cmlldmUgYSBjb250cm9sIGZyb21cbiAqIGFuIEFuZ3VsYXIgZm9ybUdyb3VwIG9yIGZvcm1Hcm91cCB0ZW1wbGF0ZS4gKE5vdGU6IHRob3VnaCBhIGZvcm1Hcm91cFxuICogdGVtcGxhdGUgaXMgbXVjaCBzaW1wbGVyLCBpdHMgYmFzaWMgc3RydWN0dXJlIGlzIGlkZW50aWFsIHRvIGEgZm9ybUdyb3VwKS5cbiAqXG4gKiBJZiB0aGUgb3B0aW9uYWwgdGhpcmQgcGFyYW1ldGVyICdyZXR1cm5Hcm91cCcgaXMgc2V0IHRvIFRSVUUsIHRoZSBncm91cFxuICogY29udGFpbmluZyB0aGUgY29udHJvbCBpcyByZXR1cm5lZCwgcmF0aGVyIHRoYW4gdGhlIGNvbnRyb2wgaXRzZWxmLlxuICpcbiAqIEBwYXJhbSBmb3JtR3JvdXAgLSBBbmd1bGFyIEZvcm1Hcm91cCB0byBnZXQgdmFsdWUgZnJvbVxuICogQHBhcmFtIGRhdGFQb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gKiBAcGFyYW0gcmV0dXJuR3JvdXAgLSBJZiB0cnVlLCByZXR1cm4gZ3JvdXAgY29udGFpbmluZyBjb250cm9sXG4gKiBAcmV0dXJuIExvY2F0ZWQgdmFsdWUgKG9yIG51bGwsIGlmIG5vIGNvbnRyb2wgZm91bmQpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250cm9sKFxuICBmb3JtR3JvdXA6IEZvcm1Hcm91cCwgZGF0YVBvaW50ZXI6IFBvaW50ZXIsIHJldHVybkdyb3VwID0gZmFsc2Vcbikge1xuICBpZiAoIWlzT2JqZWN0KGZvcm1Hcm91cCkgfHwgIUpzb25Qb2ludGVyLmlzSnNvblBvaW50ZXIoZGF0YVBvaW50ZXIpKSB7XG4gICAgaWYgKCFKc29uUG9pbnRlci5pc0pzb25Qb2ludGVyKGRhdGFQb2ludGVyKSkge1xuICAgICAgLy8gSWYgZGF0YVBvaW50ZXIgaW5wdXQgaXMgbm90IGEgdmFsaWQgSlNPTiBwb2ludGVyLCBjaGVjayB0b1xuICAgICAgLy8gc2VlIGlmIGl0IGlzIGluc3RlYWQgYSB2YWxpZCBvYmplY3QgcGF0aCwgdXNpbmcgZG90IG5vdGFpb25cbiAgICAgIGlmICh0eXBlb2YgZGF0YVBvaW50ZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IGZvcm1Db250cm9sID0gZm9ybUdyb3VwLmdldChkYXRhUG9pbnRlcilcbiAgICAgICAgaWYgKGZvcm1Db250cm9sKSB7XG4gICAgICAgICAgcmV0dXJuIGZvcm1Db250cm9sXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnNvbGUuZXJyb3IoYGdldENvbnRyb2wgZXJyb3I6IEludmFsaWQgSlNPTiBQb2ludGVyOiAke2RhdGFQb2ludGVyfWApXG4gICAgfVxuICAgIGlmICghaXNPYmplY3QoZm9ybUdyb3VwKSkge1xuICAgICAgY29uc29sZS5lcnJvcihgZ2V0Q29udHJvbCBlcnJvcjogSW52YWxpZCBmb3JtR3JvdXA6ICR7Zm9ybUdyb3VwfWApXG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cbiAgbGV0IGRhdGFQb2ludGVyQXJyYXkgPSBKc29uUG9pbnRlci5wYXJzZShkYXRhUG9pbnRlcilcbiAgaWYgKHJldHVybkdyb3VwKSB7XG4gICAgZGF0YVBvaW50ZXJBcnJheSA9IGRhdGFQb2ludGVyQXJyYXkuc2xpY2UoMCwgLTEpXG4gIH1cblxuICAvLyBJZiBmb3JtR3JvdXAgaW5wdXQgaXMgYSByZWFsIGZvcm1Hcm91cCAobm90IGEgZm9ybUdyb3VwIHRlbXBsYXRlKVxuICAvLyB0cnkgdXNpbmcgZm9ybUdyb3VwLmdldCgpIHRvIHJldHVybiB0aGUgY29udHJvbFxuICBpZiAodHlwZW9mIGZvcm1Hcm91cC5nZXQgPT09ICdmdW5jdGlvbicgJiZcbiAgICBkYXRhUG9pbnRlckFycmF5LmV2ZXJ5KGtleSA9PiBrZXkuaW5kZXhPZignLicpID09PSAtMSlcbiAgKSB7XG4gICAgY29uc3QgZm9ybUNvbnRyb2wgPSBmb3JtR3JvdXAuZ2V0KGRhdGFQb2ludGVyQXJyYXkuam9pbignLicpKVxuICAgIGlmIChmb3JtQ29udHJvbCkge1xuICAgICAgcmV0dXJuIGZvcm1Db250cm9sXG4gICAgfVxuICB9XG5cbiAgLy8gSWYgZm9ybUdyb3VwIGlucHV0IGlzIGEgZm9ybUdyb3VwIHRlbXBsYXRlLFxuICAvLyBvciBmb3JtR3JvdXAuZ2V0KCkgZmFpbGVkIHRvIHJldHVybiB0aGUgY29udHJvbCxcbiAgLy8gc2VhcmNoIHRoZSBmb3JtR3JvdXAgb2JqZWN0IGZvciBkYXRhUG9pbnRlcidzIGNvbnRyb2xcbiAgbGV0IHN1Ykdyb3VwOiBhbnkgPSBmb3JtR3JvdXBcbiAgZm9yIChjb25zdCBrZXkgb2YgZGF0YVBvaW50ZXJBcnJheSkge1xuICAgIGlmIChoYXNPd24oc3ViR3JvdXAsICdjb250cm9scycpKSB7XG4gICAgICBzdWJHcm91cCA9IHN1Ykdyb3VwLmNvbnRyb2xzXG4gICAgfVxuICAgIGlmIChpc0FycmF5KHN1Ykdyb3VwKSAmJiAoa2V5ID09PSAnLScpKSB7XG4gICAgICBzdWJHcm91cCA9IHN1Ykdyb3VwW3N1Ykdyb3VwLmxlbmd0aCAtIDFdXG4gICAgfSBlbHNlIGlmIChoYXNPd24oc3ViR3JvdXAsIGtleSkpIHtcbiAgICAgIHN1Ykdyb3VwID0gc3ViR3JvdXBba2V5XVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBnZXRDb250cm9sIGVycm9yOiBVbmFibGUgdG8gZmluZCBcIiR7a2V5fVwiIGl0ZW0gaW4gRm9ybUdyb3VwLmApXG4gICAgICBjb25zb2xlLmVycm9yKGRhdGFQb2ludGVyKVxuICAgICAgY29uc29sZS5lcnJvcihmb3JtR3JvdXApXG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN1Ykdyb3VwXG59XG4iXX0=