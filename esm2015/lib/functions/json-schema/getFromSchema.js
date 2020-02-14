import { JsonPointer } from '../jsonpointer.functions';
import { hasOwn } from '../utility';
import { isArray, isObject } from '../validator';
export function getFromSchema(schema, dataPointer, returnType = 'schema') {
    const dataPointerArray = JsonPointer.parse(dataPointer);
    if (dataPointerArray === null) {
        console.error(`getFromSchema error: Invalid JSON Pointer: ${dataPointer}`);
        return null;
    }
    let subSchema = schema;
    const schemaPointer = [];
    const length = dataPointerArray.length;
    if (returnType.slice(0, 6) === 'parent') {
        dataPointerArray.length--;
    }
    for (let i = 0; i < length; ++i) {
        const parentSchema = subSchema;
        const key = dataPointerArray[i];
        let subSchemaFound = false;
        if (typeof subSchema !== 'object') {
            console.error(`getFromSchema error: Unable to find "${key}" key in schema.`);
            console.error(schema);
            console.error(dataPointer);
            return null;
        }
        if (subSchema.type === 'array' && (!isNaN(key) || key === '-')) {
            if (hasOwn(subSchema, 'items')) {
                if (isObject(subSchema.items)) {
                    subSchemaFound = true;
                    subSchema = subSchema.items;
                    schemaPointer.push('items');
                }
                else if (isArray(subSchema.items)) {
                    if (!isNaN(key) && subSchema.items.length >= +key) {
                        subSchemaFound = true;
                        subSchema = subSchema.items[+key];
                        schemaPointer.push('items', key);
                    }
                }
            }
            if (!subSchemaFound && isObject(subSchema.additionalItems)) {
                subSchemaFound = true;
                subSchema = subSchema.additionalItems;
                schemaPointer.push('additionalItems');
            }
            else if (subSchema.additionalItems !== false) {
                subSchemaFound = true;
                subSchema = {};
                schemaPointer.push('additionalItems');
            }
        }
        else if (subSchema.type === 'object') {
            if (isObject(subSchema.properties) && hasOwn(subSchema.properties, key)) {
                subSchemaFound = true;
                subSchema = subSchema.properties[key];
                schemaPointer.push('properties', key);
            }
            else if (isObject(subSchema.additionalProperties)) {
                subSchemaFound = true;
                subSchema = subSchema.additionalProperties;
                schemaPointer.push('additionalProperties');
            }
            else if (subSchema.additionalProperties !== false) {
                subSchemaFound = true;
                subSchema = {};
                schemaPointer.push('additionalProperties');
            }
        }
        if (!subSchemaFound) {
            console.error(`getFromSchema error: Unable to find "${key}" item in schema.`);
            console.error(schema);
            console.error(dataPointer);
            return;
        }
    }
    return returnType.slice(-7) === 'Pointer' ? schemaPointer : subSchema;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RnJvbVNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9mdW5jdGlvbnMvanNvbi1zY2hlbWEvZ2V0RnJvbVNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsV0FBVyxFQUFVLE1BQU0sMEJBQTBCLENBQUE7QUFDN0QsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFlBQVksQ0FBQTtBQUNqQyxPQUFPLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQW1COUMsTUFBTSxVQUFVLGFBQWEsQ0FDM0IsTUFBVyxFQUNYLFdBQW9CLEVBQ3BCLFVBQVUsR0FBRyxRQUFRO0lBRXJCLE1BQU0sZ0JBQWdCLEdBQVUsV0FBVyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUM5RCxJQUFJLGdCQUFnQixLQUFLLElBQUksRUFBRTtRQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLDhDQUE4QyxXQUFXLEVBQUUsQ0FBQyxDQUFBO1FBQzFFLE9BQU8sSUFBSSxDQUFBO0tBQ1o7SUFDRCxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUE7SUFDdEIsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFBO0lBQ3hCLE1BQU0sTUFBTSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQTtJQUN0QyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtRQUN2QyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtLQUMxQjtJQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUU7UUFDL0IsTUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFBO1FBQzlCLE1BQU0sR0FBRyxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQy9CLElBQUksY0FBYyxHQUFH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Q0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDckIsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQTtZQUMxQixPQUFNO1NBQ1A7S0FDRjtJQUNELE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUE7QUFDdkUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SnNvblBvaW50ZXIsIFBvaW50ZXJ9IGZyb20gJy4uL2pzb25wb2ludGVyLmZ1bmN0aW9ucydcbmltcG9ydCB7aGFzT3dufSBmcm9tICcuLi91dGlsaXR5J1xuaW1wb3J0IHtpc0FycmF5LCBpc09iamVjdH0gZnJvbSAnLi4vdmFsaWRhdG9yJ1xuXG4vKipcbiAqICdnZXRGcm9tU2NoZW1hJyBmdW5jdGlvblxuICpcbiAqIFVzZXMgYSBKU09OIFBvaW50ZXIgZm9yIGEgdmFsdWUgd2l0aGluIGEgZGF0YSBvYmplY3QgdG8gcmV0cmlldmVcbiAqIHRoZSBzY2hlbWEgZm9yIHRoYXQgdmFsdWUgd2l0aGluIHNjaGVtYSBmb3IgdGhlIGRhdGEgb2JqZWN0LlxuICpcbiAqIFRoZSBvcHRpb25hbCB0aGlyZCBwYXJhbWV0ZXIgY2FuIGFsc28gYmUgc2V0IHRvIHJldHVybiBzb21ldGhpbmcgZWxzZTpcbiAqICdzY2hlbWEnIChkZWZhdWx0KTogdGhlIHNjaGVtYSBmb3IgdGhlIHZhbHVlIGluZGljYXRlZCBieSB0aGUgZGF0YSBwb2ludGVyXG4gKiAncGFyZW50U2NoZW1hJzogdGhlIHNjaGVtYSBmb3IgdGhlIHZhbHVlJ3MgcGFyZW50IG9iamVjdCBvciBhcnJheVxuICogJ3NjaGVtYVBvaW50ZXInOiBhIHBvaW50ZXIgdG8gdGhlIHZhbHVlJ3Mgc2NoZW1hIHdpdGhpbiB0aGUgb2JqZWN0J3Mgc2NoZW1hXG4gKiAncGFyZW50U2NoZW1hUG9pbnRlcic6IGEgcG9pbnRlciB0byB0aGUgc2NoZW1hIGZvciB0aGUgdmFsdWUncyBwYXJlbnQgb2JqZWN0IG9yIGFycmF5XG4gKlxuICogQHBhcmFtICBzY2hlbWEgLSBUaGUgc2NoZW1hIHRvIGdldCB0aGUgc3ViLXNjaGVtYSBmcm9tXG4gKiBAcGFyYW0gIGRhdGFQb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gKiBAcGFyYW0gIHJldHVyblR5cGUgLSB3aGF0IHRvIHJldHVybj9cbiAqIEByZXR1cm4gVGhlIGxvY2F0ZWQgc3ViLXNjaGVtYVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RnJvbVNjaGVtYShcbiAgc2NoZW1hOiBhbnksXG4gIGRhdGFQb2ludGVyOiBQb2ludGVyLFxuICByZXR1cm5UeXBlID0gJ3NjaGVtYSdcbikge1xuICBjb25zdCBkYXRhUG9pbnRlckFycmF5OiBhbnlbXSA9IEpzb25Qb2ludGVyLnBhcnNlKGRhdGFQb2ludGVyKVxuICBpZiAoZGF0YVBvaW50ZXJBcnJheSA9PT0gbnVsbCkge1xuICAgIGNvbnNvbGUuZXJyb3IoYGdldEZyb21TY2hlbWEgZXJyb3I6IEludmFsaWQgSlNPTiBQb2ludGVyOiAke2RhdGFQb2ludGVyfWApXG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICBsZXQgc3ViU2NoZW1hID0gc2NoZW1hXG4gIGNvbnN0IHNjaGVtYVBvaW50ZXIgPSBbXVxuICBjb25zdCBsZW5ndGggPSBkYXRhUG9pbnRlckFycmF5Lmxlbmd0aFxuICBpZiAocmV0dXJuVHlwZS5zbGljZSgwLCA2KSA9PT0gJ3BhcmVudCcpIHtcbiAgICBkYXRhUG9pbnRlckFycmF5Lmxlbmd0aC0tXG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IHBhcmVudFNjaGVtYSA9IHN1YlNjaGVtYVxuICAgIGNvbnN0IGtleSA9IGRhdGFQb2ludGVyQXJyYXlbaV1cbiAgICBsZXQgc3ViU2NoZW1hRm91bmQgPSBmYWxzZVxuICAgIGlmICh0eXBlb2Ygc3ViU2NoZW1hICE9PSAnb2JqZWN0Jykge1xuICAgICAgY29uc29sZS5lcnJvcihgZ2V0RnJvbVNjaGVtYSBlcnJvcjogVW5hYmxlIHRvIGZpbmQgXCIke2tleX1cIiBrZXkgaW4gc2NoZW1hLmApXG4gICAgICBjb25zb2xlLmVycm9yKHNjaGVtYSlcbiAgICAgIGNvbnNvbGUuZXJyb3IoZGF0YVBvaW50ZXIpXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBpZiAoc3ViU2NoZW1hLnR5cGUgPT09ICdhcnJheScgJiYgKCFpc05hTihrZXkpIHx8IGtleSA9PT0gJy0nKSkge1xuICAgICAgaWYgKGhhc093bihzdWJTY2hlbWEsICdpdGVtcycpKSB7XG4gICAgICAgIGlmIChpc09iamVjdChzdWJTY2hlbWEuaXRlbXMpKSB7XG4gICAgICAgICAgc3ViU2NoZW1hRm91bmQgPSB0cnVlXG4gICAgICAgICAgc3ViU2NoZW1hID0gc3ViU2NoZW1hLml0ZW1zXG4gICAgICAgICAgc2NoZW1hUG9pbnRlci5wdXNoKCdpdGVtcycpXG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShzdWJTY2hlbWEuaXRlbXMpKSB7XG4gICAgICAgICAgaWYgKCFpc05hTihrZXkpICYmIHN1YlNjaGVtYS5pdGVtcy5sZW5ndGggPj0gK2tleSkge1xuICAgICAgICAgICAgc3ViU2NoZW1hRm91bmQgPSB0cnVlXG4gICAgICAgICAgICBzdWJTY2hlbWEgPSBzdWJTY2hlbWEuaXRlbXNbK2tleV1cbiAgICAgICAgICAgIHNjaGVtYVBvaW50ZXIucHVzaCgnaXRlbXMnLCBrZXkpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIXN1YlNjaGVtYUZvdW5kICYmIGlzT2JqZWN0KHN1YlNjaGVtYS5hZGRpdGlvbmFsSXRlbXMpKSB7XG4gICAgICAgIHN1YlNjaGVtYUZvdW5kID0gdHJ1ZVxuICAgICAgICBzdWJTY2hlbWEgPSBzdWJTY2hlbWEuYWRkaXRpb25hbEl0ZW1zXG4gICAgICAgIHNjaGVtYVBvaW50ZXIucHVzaCgnYWRkaXRpb25hbEl0ZW1zJylcbiAgICAgIH0gZWxzZSBpZiAoc3ViU2NoZW1hLmFkZGl0aW9uYWxJdGVtcyAhPT0gZmFsc2UpIHtcbiAgICAgICAgc3ViU2NoZW1hRm91bmQgPSB0cnVlXG4gICAgICAgIHN1YlNjaGVtYSA9IHt9XG4gICAgICAgIHNjaGVtYVBvaW50ZXIucHVzaCgnYWRkaXRpb25hbEl0ZW1zJylcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHN1YlNjaGVtYS50eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKGlzT2JqZWN0KHN1YlNjaGVtYS5wcm9wZXJ0aWVzKSAmJiBoYXNPd24oc3ViU2NoZW1hLnByb3BlcnRpZXMsIGtleSkpIHtcbiAgICAgICAgc3ViU2NoZW1hRm91bmQgPSB0cnVlXG4gICAgICAgIHN1YlNjaGVtYSA9IHN1YlNjaGVtYS5wcm9wZXJ0aWVzW2tleV1cbiAgICAgICAgc2NoZW1hUG9pbnRlci5wdXNoKCdwcm9wZXJ0aWVzJywga2V5KVxuICAgICAgfSBlbHNlIGlmIChpc09iamVjdChzdWJTY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMpKSB7XG4gICAgICAgIHN1YlNjaGVtYUZvdW5kID0gdHJ1ZVxuICAgICAgICBzdWJTY2hlbWEgPSBzdWJTY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXNcbiAgICAgICAgc2NoZW1hUG9pbnRlci5wdXNoKCdhZGRpdGlvbmFsUHJvcGVydGllcycpXG4gICAgICB9IGVsc2UgaWYgKHN1YlNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcyAhPT0gZmFsc2UpIHtcbiAgICAgICAgc3ViU2NoZW1hRm91bmQgPSB0cnVlXG4gICAgICAgIHN1YlNjaGVtYSA9IHt9XG4gICAgICAgIHNjaGVtYVBvaW50ZXIucHVzaCgnYWRkaXRpb25hbFByb3BlcnRpZXMnKVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXN1YlNjaGVtYUZvdW5kKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBnZXRGcm9tU2NoZW1hIGVycm9yOiBVbmFibGUgdG8gZmluZCBcIiR7a2V5fVwiIGl0ZW0gaW4gc2NoZW1hLmApXG4gICAgICBjb25zb2xlLmVycm9yKHNjaGVtYSlcbiAgICAgIGNvbnNvbGUuZXJyb3IoZGF0YVBvaW50ZXIpXG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJldHVyblR5cGUuc2xpY2UoLTcpID09PSAnUG9pbnRlcicgPyBzY2hlbWFQb2ludGVyIDogc3ViU2NoZW1hXG59XG4iXX0=