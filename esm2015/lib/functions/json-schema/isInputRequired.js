import { isArray, isNumber, isObject } from '../validator';
import { JsonPointer } from '../jsonpointer.functions';
import { hasOwn } from '../utility';
export function isInputRequired(schema, schemaPointer) {
    if (!isObject(schema)) {
        console.error('isInputRequired error: Input schema must be an object.');
        return false;
    }
    const listPointerArray = JsonPointer.parse(schemaPointer);
    if (isArray(listPointerArray)) {
        if (!listPointerArray.length) {
            return schema.required === true;
        }
        const keyName = listPointerArray.pop();
        const nextToLastKey = listPointerArray[listPointerArray.length - 1];
        if (['properties', 'additionalProperties', 'patternProperties', 'items', 'additionalItems']
            .includes(nextToLastKey)) {
            listPointerArray.pop();
        }
        const parentSchema = JsonPointer.get(schema, listPointerArray) || {};
        if (isArray(parentSchema.required)) {
            return parentSchema.required.includes(keyName);
        }
        if (parentSchema.type === 'array') {
            return hasOwn(parentSchema, 'minItems') &&
                isNumber(keyName) &&
                +parentSchema.minItems > +keyName;
        }
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNJbnB1dFJlcXVpcmVkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdzZi1jb21tb24vIiwic291cmNlcyI6WyJsaWIvZnVuY3Rpb25zL2pzb24tc2NoZW1hL2lzSW5wdXRSZXF1aXJlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFDeEQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDBCQUEwQixDQUFBO0FBQ3BELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxZQUFZLENBQUE7QUFXakMsTUFBTSxVQUFVLGVBQWUsQ0FDN0IsTUFBVyxFQUNYLGFBQXFCO0lBRXJCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDckIsT0FBTyxDQUFDLEtBQUssQ0FBQyx3REFBd0QsQ0FBQyxDQUFBO1FBQ3ZFLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFDRCxNQUFNLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDekQsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUM3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO1lBQzVCLE9BQU8sTUFBTSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUE7U0FDaEM7UUFDRCxNQUFNLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUN0QyxNQUFNLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDbkUsSUFBSSxDQUFDLFlBQVksRUFBRSxzQkFBc0IsRUFBRSxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLENBQUM7YUFDeEYsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUN4QjtZQUNBLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxDQUFBO1NBQ3ZCO1FBQ0QsTUFBTSxZQUFZLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDcEUsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2xDLE9BQU8sWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7U0FDL0M7UUFDRCxJQUFJLFlBQVksQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1lBQ2pDLE9BQU8sTUFBTSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUM7Z0JBQ3JDLFFBQVEsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQTtTQUNwQztLQUNGO0lBQ0QsT0FBTyxLQUFLLENBQUE7QUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc0FycmF5LCBpc051bWJlciwgaXNPYmplY3R9IGZyb20gJy4uL3ZhbGlkYXRvcidcbmltcG9ydCB7SnNvblBvaW50ZXJ9IGZyb20gJy4uL2pzb25wb2ludGVyLmZ1bmN0aW9ucydcbmltcG9ydCB7aGFzT3dufSBmcm9tICcuLi91dGlsaXR5J1xuXG4vKipcbiAqICdpc0lucHV0UmVxdWlyZWQnIGZ1bmN0aW9uXG4gKlxuICogQ2hlY2tzIGEgSlNPTiBTY2hlbWEgdG8gc2VlIGlmIGFuIGl0ZW0gaXMgcmVxdWlyZWRcbiAqXG4gKiBAcGFyYW0gc2NoZW1hIC0gdGhlIHNjaGVtYSB0byBjaGVja1xuICogQHBhcmFtIHNjaGVtYVBvaW50ZXIgLSB0aGUgcG9pbnRlciB0byB0aGUgaXRlbSB0byBjaGVja1xuICogQHJldHVybiB0cnVlIGlmIHRoZSBpdGVtIGlzIHJlcXVpcmVkLCBmYWxzZSBpZiBub3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW5wdXRSZXF1aXJlZChcbiAgc2NoZW1hOiBhbnksXG4gIHNjaGVtYVBvaW50ZXI6IHN0cmluZ1xuKTogYm9vbGVhbiB7XG4gIGlmICghaXNPYmplY3Qoc2NoZW1hKSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ2lzSW5wdXRSZXF1aXJlZCBlcnJvcjogSW5wdXQgc2NoZW1hIG11c3QgYmUgYW4gb2JqZWN0LicpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgY29uc3QgbGlzdFBvaW50ZXJBcnJheSA9IEpzb25Qb2ludGVyLnBhcnNlKHNjaGVtYVBvaW50ZXIpXG4gIGlmIChpc0FycmF5KGxpc3RQb2ludGVyQXJyYXkpKSB7XG4gICAgaWYgKCFsaXN0UG9pbnRlckFycmF5Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHNjaGVtYS5yZXF1aXJlZCA9PT0gdHJ1ZVxuICAgIH1cbiAgICBjb25zdCBrZXlOYW1lID0gbGlzdFBvaW50ZXJBcnJheS5wb3AoKVxuICAgIGNvbnN0IG5leHRUb0xhc3RLZXkgPSBsaXN0UG9pbnRlckFycmF5W2xpc3RQb2ludGVyQXJyYXkubGVuZ3RoIC0gMV1cbiAgICBpZiAoWydwcm9wZXJ0aWVzJywgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJywgJ3BhdHRlcm5Qcm9wZXJ0aWVzJywgJ2l0ZW1zJywgJ2FkZGl0aW9uYWxJdGVtcyddXG4gICAgICAuaW5jbHVkZXMobmV4dFRvTGFzdEtleSlcbiAgICApIHtcbiAgICAgIGxpc3RQb2ludGVyQXJyYXkucG9wKClcbiAgICB9XG4gICAgY29uc3QgcGFyZW50U2NoZW1hID0gSnNvblBvaW50ZXIuZ2V0KHNjaGVtYSwgbGlzdFBvaW50ZXJBcnJheSkgfHwge31cbiAgICBpZiAoaXNBcnJheShwYXJlbnRTY2hlbWEucmVxdWlyZWQpKSB7XG4gICAgICByZXR1cm4gcGFyZW50U2NoZW1hLnJlcXVpcmVkLmluY2x1ZGVzKGtleU5hbWUpXG4gICAgfVxuICAgIGlmIChwYXJlbnRTY2hlbWEudHlwZSA9PT0gJ2FycmF5Jykge1xuICAgICAgcmV0dXJuIGhhc093bihwYXJlbnRTY2hlbWEsICdtaW5JdGVtcycpICYmXG4gICAgICAgIGlzTnVtYmVyKGtleU5hbWUpICYmXG4gICAgICAgICtwYXJlbnRTY2hlbWEubWluSXRlbXMgPiAra2V5TmFtZVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cbiJdfQ==