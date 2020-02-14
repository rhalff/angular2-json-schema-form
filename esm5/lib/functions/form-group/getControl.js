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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Q29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9mdW5jdGlvbnMvZm9ybS1ncm91cC9nZXRDb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFdBQVcsRUFBVSxNQUFNLDBCQUEwQixDQUFBO0FBQzdELE9BQU8sRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBQzlDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxZQUFZLENBQUE7QUFrQmpDLE1BQU0sVUFBVSxVQUFVLENBQ3hCLFNBQW9CLEVBQUUsV0FBb0IsRUFBRSxXQUFtQjs7SUFBbkIsNEJBQUEsRUFBQSxtQkFBbUI7SUFFL0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDbkUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFHM0MsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7Z0JBQ25DLElBQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7Z0JBQzlDLElBQUksV0FBVyxFQUFFO29CQUNmLE9BQU8sV0FBVyxDQUFBO2lCQUNuQjthQUNGO1lBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyw2Q0FBMkMsV0FBYSxDQUFDLENBQUE7U0FDeEU7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsMENBQXdDLFNBQVcsQ0FBQyxDQUFBO1NBQ25FO1FBQ0QsT0FBTyxJQUFJLENBQUE7S0FDWjtJQUNELElBQUksZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUNyRCxJQUFJLFdBQVcsRUFBRTtRQUNmLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUNqRDtJQUlELElBQUksT0FBTyxTQUFTLENBQUMsR0FBRyxLQUFLLFVBQVU7UUFDckMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxFQUN0RDtRQUNBLElBQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDN0QsSUFBSSxXQUFXLEVBQUU7WUFDZixPQUFPLFdBQVcsQ0FBQTtTQUNuQjtLQUNGO0lBS0QsSUFBSSxRQUFRLEdBQVEsU0FBUyxDQUFBOztRQUM3QixLQUFrQixJQUFBLHFCQUFBLFNBQUEsZ0JBQWdCLENBQUEsa0RBQUEsZ0ZBQUU7WUFBL0IsSUFBTSxHQUFHLDZCQUFBO1lBQ1osSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxFQUFFO2dCQUNoQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQTthQUM3QjtZQUNELElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxFQUFFO2dCQUN0QyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7YUFDekM7aUJBQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUNoQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ3pCO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0NBQXFDLEdBQUcsMEJBQXNCLENBQUMsQ0FBQTtnQkFDN0UsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQTtnQkFDMUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTtnQkFDeEIsT0FBTTthQUNQO1NBQ0Y7Ozs7Ozs7OztJQUNELE9BQU8sUUFBUSxDQUFBO0FBQ2pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0pzb25Qb2ludGVyLCBQb2ludGVyfSBmcm9tICcuLi9qc29ucG9pbnRlci5mdW5jdGlvbnMnXG5pbXBvcnQge2lzQXJyYXksIGlzT2JqZWN0fSBmcm9tICcuLi92YWxpZGF0b3InXG5pbXBvcnQge2hhc093bn0gZnJvbSAnLi4vdXRpbGl0eSdcbmltcG9ydCB7Rm9ybUdyb3VwfSBmcm9tICdAYW5ndWxhci9mb3JtcydcblxuLyoqXG4gKiAnZ2V0Q29udHJvbCcgZnVuY3Rpb25cbiAqXG4gKiBVc2VzIGEgSlNPTiBQb2ludGVyIGZvciBhIGRhdGEgb2JqZWN0IHRvIHJldHJpZXZlIGEgY29udHJvbCBmcm9tXG4gKiBhbiBBbmd1bGFyIGZvcm1Hcm91cCBvciBmb3JtR3JvdXAgdGVtcGxhdGUuIChOb3RlOiB0aG91Z2ggYSBmb3JtR3JvdXBcbiAqIHRlbXBsYXRlIGlzIG11Y2ggc2ltcGxlciwgaXRzIGJhc2ljIHN0cnVjdHVyZSBpcyBpZGVudGlhbCB0byBhIGZvcm1Hcm91cCkuXG4gKlxuICogSWYgdGhlIG9wdGlvbmFsIHRoaXJkIHBhcmFtZXRlciAncmV0dXJuR3JvdXAnIGlzIHNldCB0byBUUlVFLCB0aGUgZ3JvdXBcbiAqIGNvbnRhaW5pbmcgdGhlIGNvbnRyb2wgaXMgcmV0dXJuZWQsIHJhdGhlciB0aGFuIHRoZSBjb250cm9sIGl0c2VsZi5cbiAqXG4gKiBAcGFyYW0gZm9ybUdyb3VwIC0gQW5ndWxhciBGb3JtR3JvdXAgdG8gZ2V0IHZhbHVlIGZyb21cbiAqIEBwYXJhbSBkYXRhUG9pbnRlciAtIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICogQHBhcmFtIHJldHVybkdyb3VwIC0gSWYgdHJ1ZSwgcmV0dXJuIGdyb3VwIGNvbnRhaW5pbmcgY29udHJvbFxuICogQHJldHVybiBMb2NhdGVkIHZhbHVlIChvciBudWxsLCBpZiBubyBjb250cm9sIGZvdW5kKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29udHJvbChcbiAgZm9ybUdyb3VwOiBGb3JtR3JvdXAsIGRhdGFQb2ludGVyOiBQb2ludGVyLCByZXR1cm5Hcm91cCA9IGZhbHNlXG4pIHtcbiAgaWYgKCFpc09iamVjdChmb3JtR3JvdXApIHx8ICFKc29uUG9pbnRlci5pc0pzb25Qb2ludGVyKGRhdGFQb2ludGVyKSkge1xuICAgIGlmICghSnNvblBvaW50ZXIuaXNKc29uUG9pbnRlcihkYXRhUG9pbnRlcikpIHtcbiAgICAgIC8vIElmIGRhdGFQb2ludGVyIGlucHV0IGlzIG5vdCBhIHZhbGlkIEpTT04gcG9pbnRlciwgY2hlY2sgdG9cbiAgICAgIC8vIHNlZSBpZiBpdCBpcyBpbnN0ZWFkIGEgdmFsaWQgb2JqZWN0IHBhdGgsIHVzaW5nIGRvdCBub3RhaW9uXG4gICAgICBpZiAodHlwZW9mIGRhdGFQb2ludGVyID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCBmb3JtQ29udHJvbCA9IGZvcm1Hcm91cC5nZXQoZGF0YVBvaW50ZXIpXG4gICAgICAgIGlmIChmb3JtQ29udHJvbCkge1xuICAgICAgICAgIHJldHVybiBmb3JtQ29udHJvbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zb2xlLmVycm9yKGBnZXRDb250cm9sIGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlcjogJHtkYXRhUG9pbnRlcn1gKVxuICAgIH1cbiAgICBpZiAoIWlzT2JqZWN0KGZvcm1Hcm91cCkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYGdldENvbnRyb2wgZXJyb3I6IEludmFsaWQgZm9ybUdyb3VwOiAke2Zvcm1Hcm91cH1gKVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIGxldCBkYXRhUG9pbnRlckFycmF5ID0gSnNvblBvaW50ZXIucGFyc2UoZGF0YVBvaW50ZXIpXG4gIGlmIChyZXR1cm5Hcm91cCkge1xuICAgIGRhdGFQb2ludGVyQXJyYXkgPSBkYXRhUG9pbnRlckFycmF5LnNsaWNlKDAsIC0xKVxuICB9XG5cbiAgLy8gSWYgZm9ybUdyb3VwIGlucHV0IGlzIGEgcmVhbCBmb3JtR3JvdXAgKG5vdCBhIGZvcm1Hcm91cCB0ZW1wbGF0ZSlcbiAgLy8gdHJ5IHVzaW5nIGZvcm1Hcm91cC5nZXQoKSB0byByZXR1cm4gdGhlIGNvbnRyb2xcbiAgaWYgKHR5cGVvZiBmb3JtR3JvdXAuZ2V0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgZGF0YVBvaW50ZXJBcnJheS5ldmVyeShrZXkgPT4ga2V5LmluZGV4T2YoJy4nKSA9PT0gLTEpXG4gICkge1xuICAgIGNvbnN0IGZvcm1Db250cm9sID0gZm9ybUdyb3VwLmdldChkYXRhUG9pbnRlckFycmF5LmpvaW4oJy4nKSlcbiAgICBpZiAoZm9ybUNvbnRyb2wpIHtcbiAgICAgIHJldHVybiBmb3JtQ29udHJvbFxuICAgIH1cbiAgfVxuXG4gIC8vIElmIGZvcm1Hcm91cCBpbnB1dCBpcyBhIGZvcm1Hcm91cCB0ZW1wbGF0ZSxcbiAgLy8gb3IgZm9ybUdyb3VwLmdldCgpIGZhaWxlZCB0byByZXR1cm4gdGhlIGNvbnRyb2wsXG4gIC8vIHNlYXJjaCB0aGUgZm9ybUdyb3VwIG9iamVjdCBmb3IgZGF0YVBvaW50ZXIncyBjb250cm9sXG4gIGxldCBzdWJHcm91cDogYW55ID0gZm9ybUdyb3VwXG4gIGZvciAoY29uc3Qga2V5IG9mIGRhdGFQb2ludGVyQXJyYXkpIHtcbiAgICBpZiAoaGFzT3duKHN1Ykdyb3VwLCAnY29udHJvbHMnKSkge1xuICAgICAgc3ViR3JvdXAgPSBzdWJHcm91cC5jb250cm9sc1xuICAgIH1cbiAgICBpZiAoaXNBcnJheShzdWJHcm91cCkgJiYgKGtleSA9PT0gJy0nKSkge1xuICAgICAgc3ViR3JvdXAgPSBzdWJHcm91cFtzdWJHcm91cC5sZW5ndGggLSAxXVxuICAgIH0gZWxzZSBpZiAoaGFzT3duKHN1Ykdyb3VwLCBrZXkpKSB7XG4gICAgICBzdWJHcm91cCA9IHN1Ykdyb3VwW2tleV1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcihgZ2V0Q29udHJvbCBlcnJvcjogVW5hYmxlIHRvIGZpbmQgXCIke2tleX1cIiBpdGVtIGluIEZvcm1Hcm91cC5gKVxuICAgICAgY29uc29sZS5lcnJvcihkYXRhUG9pbnRlcilcbiAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybUdyb3VwKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG4gIHJldHVybiBzdWJHcm91cFxufVxuIl19