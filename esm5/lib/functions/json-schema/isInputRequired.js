import { isArray, isNumber, isObject } from '../validator';
import { JsonPointer } from '../jsonpointer.functions';
import { hasOwn } from '../utility';
export function isInputRequired(schema, schemaPointer) {
    if (!isObject(schema)) {
        console.error('isInputRequired error: Input schema must be an object.');
        return false;
    }
    var listPointerArray = JsonPointer.parse(schemaPointer);
    if (isArray(listPointerArray)) {
        if (!listPointerArray.length) {
            return schema.required === true;
        }
        var keyName = listPointerArray.pop();
        var nextToLastKey = listPointerArray[listPointerArray.length - 1];
        if (['properties', 'additionalProperties', 'patternProperties', 'items', 'additionalItems']
            .includes(nextToLastKey)) {
            listPointerArray.pop();
        }
        var parentSchema = JsonPointer.get(schema, listPointerArray) || {};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNJbnB1dFJlcXVpcmVkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nc2YvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2Z1bmN0aW9ucy9qc29uLXNjaGVtYS9pc0lucHV0UmVxdWlyZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBQ3hELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQTtBQUNwRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sWUFBWSxDQUFBO0FBV2pDLE1BQU0sVUFBVSxlQUFlLENBQzdCLE1BQVcsRUFDWCxhQUFxQjtJQUVyQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3JCLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQTtRQUN2RSxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBQ0QsSUFBTSxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQ3pELElBQUksT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7UUFDN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtZQUM1QixPQUFPLE1BQU0sQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFBO1NBQ2hDO1FBQ0QsSUFBTSxPQUFPLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLENBQUE7UUFDdEMsSUFBTSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ25FLElBQUksQ0FBQyxZQUFZLEVBQUUsc0JBQXNCLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixDQUFDO2FBQ3hGLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFDeEI7WUFDQSxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtTQUN2QjtRQUNELElBQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFBO1FBQ3BFLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNsQyxPQUFPLFlBQVksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQy9DO1FBQ0QsSUFBSSxZQUFZLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUNqQyxPQUFPLE1BQU0sQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDO2dCQUNyQyxRQUFRLENBQUMsT0FBTyxDQUFDO2dCQUNqQixDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxPQUFPLENBQUE7U0FDcEM7S0FDRjtJQUNELE9BQU8sS0FBSyxDQUFBO0FBQ2QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNBcnJheSwgaXNOdW1iZXIsIGlzT2JqZWN0fSBmcm9tICcuLi92YWxpZGF0b3InXG5pbXBvcnQge0pzb25Qb2ludGVyfSBmcm9tICcuLi9qc29ucG9pbnRlci5mdW5jdGlvbnMnXG5pbXBvcnQge2hhc093bn0gZnJvbSAnLi4vdXRpbGl0eSdcblxuLyoqXG4gKiAnaXNJbnB1dFJlcXVpcmVkJyBmdW5jdGlvblxuICpcbiAqIENoZWNrcyBhIEpTT04gU2NoZW1hIHRvIHNlZSBpZiBhbiBpdGVtIGlzIHJlcXVpcmVkXG4gKlxuICogQHBhcmFtIHNjaGVtYSAtIHRoZSBzY2hlbWEgdG8gY2hlY2tcbiAqIEBwYXJhbSBzY2hlbWFQb2ludGVyIC0gdGhlIHBvaW50ZXIgdG8gdGhlIGl0ZW0gdG8gY2hlY2tcbiAqIEByZXR1cm4gdHJ1ZSBpZiB0aGUgaXRlbSBpcyByZXF1aXJlZCwgZmFsc2UgaWYgbm90XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0lucHV0UmVxdWlyZWQoXG4gIHNjaGVtYTogYW55LFxuICBzY2hlbWFQb2ludGVyOiBzdHJpbmdcbik6IGJvb2xlYW4ge1xuICBpZiAoIWlzT2JqZWN0KHNjaGVtYSkpIHtcbiAgICBjb25zb2xlLmVycm9yKCdpc0lucHV0UmVxdWlyZWQgZXJyb3I6IElucHV0IHNjaGVtYSBtdXN0IGJlIGFuIG9iamVjdC4nKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGNvbnN0IGxpc3RQb2ludGVyQXJyYXkgPSBKc29uUG9pbnRlci5wYXJzZShzY2hlbWFQb2ludGVyKVxuICBpZiAoaXNBcnJheShsaXN0UG9pbnRlckFycmF5KSkge1xuICAgIGlmICghbGlzdFBvaW50ZXJBcnJheS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBzY2hlbWEucmVxdWlyZWQgPT09IHRydWVcbiAgICB9XG4gICAgY29uc3Qga2V5TmFtZSA9IGxpc3RQb2ludGVyQXJyYXkucG9wKClcbiAgICBjb25zdCBuZXh0VG9MYXN0S2V5ID0gbGlzdFBvaW50ZXJBcnJheVtsaXN0UG9pbnRlckFycmF5Lmxlbmd0aCAtIDFdXG4gICAgaWYgKFsncHJvcGVydGllcycsICdhZGRpdGlvbmFsUHJvcGVydGllcycsICdwYXR0ZXJuUHJvcGVydGllcycsICdpdGVtcycsICdhZGRpdGlvbmFsSXRlbXMnXVxuICAgICAgLmluY2x1ZGVzKG5leHRUb0xhc3RLZXkpXG4gICAgKSB7XG4gICAgICBsaXN0UG9pbnRlckFycmF5LnBvcCgpXG4gICAgfVxuICAgIGNvbnN0IHBhcmVudFNjaGVtYSA9IEpzb25Qb2ludGVyLmdldChzY2hlbWEsIGxpc3RQb2ludGVyQXJyYXkpIHx8IHt9XG4gICAgaWYgKGlzQXJyYXkocGFyZW50U2NoZW1hLnJlcXVpcmVkKSkge1xuICAgICAgcmV0dXJuIHBhcmVudFNjaGVtYS5yZXF1aXJlZC5pbmNsdWRlcyhrZXlOYW1lKVxuICAgIH1cbiAgICBpZiAocGFyZW50U2NoZW1hLnR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgIHJldHVybiBoYXNPd24ocGFyZW50U2NoZW1hLCAnbWluSXRlbXMnKSAmJlxuICAgICAgICBpc051bWJlcihrZXlOYW1lKSAmJlxuICAgICAgICArcGFyZW50U2NoZW1hLm1pbkl0ZW1zID4gK2tleU5hbWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG4iXX0=