import { isArray } from './isArray';
import { isObject } from './isObject';
import { isBoolean } from './isBoolean';
import { isInteger } from './isInteger';
import { isNumber } from './isNumber';
import { isString } from './isString';
import { isDate } from './isDate';
import { isDefined } from './isDefined';
export function getType(value, strict) {
    if (strict === void 0) { strict = false; }
    if (!isDefined(value)) {
        return 'null';
    }
    if (isArray(value)) {
        return 'array';
    }
    if (isObject(value)) {
        return 'object';
    }
    if (isBoolean(value, 'strict')) {
        return 'boolean';
    }
    if (isInteger(value, strict)) {
        return 'integer';
    }
    if (isNumber(value, strict)) {
        return 'number';
    }
    if (isString(value) || (!strict && isDate(value))) {
        return 'string';
    }
    return null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VHlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9mdW5jdGlvbnMvdmFsaWRhdG9yL2dldFR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFdBQVcsQ0FBQTtBQUNqQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sWUFBWSxDQUFBO0FBQ25DLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxhQUFhLENBQUE7QUFDckMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGFBQWEsQ0FBQTtBQUNyQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sWUFBWSxDQUFBO0FBQ25DLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxZQUFZLENBQUE7QUFDbkMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQTtBQUMvQixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sYUFBYSxDQUFBO0FBbUNyQyxNQUFNLFVBQVUsT0FBTyxDQUFDLEtBQVUsRUFBRSxNQUFtQjtJQUFuQix1QkFBQSxFQUFBLGNBQW1CO0lBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDckIsT0FBTyxNQUFNLENBQUE7S0FDZDtJQUNELElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2xCLE9BQU8sT0FBTyxDQUFBO0tBQ2Y7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNuQixPQUFPLFFBQVEsQ0FBQTtLQUNoQjtJQUNELElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsRUFBRTtRQUM5QixPQUFPLFNBQVMsQ0FBQTtLQUNqQjtJQUNELElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRTtRQUM1QixPQUFPLFNBQVMsQ0FBQTtLQUNqQjtJQUNELElBQUksUUFBUSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRTtRQUMzQixPQUFPLFFBQVEsQ0FBQTtLQUNoQjtJQUNELElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDakQsT0FBTyxRQUFRLENBQUE7S0FDaEI7SUFDRCxPQUFPLElBQUksQ0FBQTtBQUNiLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzQXJyYXl9IGZyb20gJy4vaXNBcnJheSdcbmltcG9ydCB7aXNPYmplY3R9IGZyb20gJy4vaXNPYmplY3QnXG5pbXBvcnQge2lzQm9vbGVhbn0gZnJvbSAnLi9pc0Jvb2xlYW4nXG5pbXBvcnQge2lzSW50ZWdlcn0gZnJvbSAnLi9pc0ludGVnZXInXG5pbXBvcnQge2lzTnVtYmVyfSBmcm9tICcuL2lzTnVtYmVyJ1xuaW1wb3J0IHtpc1N0cmluZ30gZnJvbSAnLi9pc1N0cmluZydcbmltcG9ydCB7aXNEYXRlfSBmcm9tICcuL2lzRGF0ZSdcbmltcG9ydCB7aXNEZWZpbmVkfSBmcm9tICcuL2lzRGVmaW5lZCdcbi8qKlxuICogJ2dldFR5cGUnIGZ1bmN0aW9uXG4gKlxuICogRGV0ZWN0cyB0aGUgSlNPTiBTY2hlbWEgVHlwZSBvZiBhIHZhbHVlLlxuICogQnkgZGVmYXVsdCwgZGV0ZWN0cyBudW1iZXJzIGFuZCBpbnRlZ2VycyBldmVuIGlmIGZvcm1hdHRlZCBhcyBzdHJpbmdzLlxuICogKFNvIGFsbCBpbnRlZ2VycyBhcmUgYWxzbyBudW1iZXJzLCBhbmQgYW55IG51bWJlciBtYXkgYWxzbyBiZSBhIHN0cmluZy4pXG4gKiBIb3dldmVyLCBpdCBvbmx5IGRldGVjdHMgdHJ1ZSBib29sZWFuIHZhbHVlcyAodG8gZGV0ZWN0IGJvb2xlYW4gdmFsdWVzXG4gKiBpbiBub24tYm9vbGVhbiBmb3JtYXRzLCB1c2UgaXNCb29sZWFuKCkgaW5zdGVhZCkuXG4gKlxuICogSWYgcGFzc2VkIGEgc2Vjb25kIG9wdGlvbmFsIHBhcmFtZXRlciBvZiAnc3RyaWN0JywgaXQgd2lsbCBvbmx5IGRldGVjdFxuICogbnVtYmVycyBhbmQgaW50ZWdlcnMgaWYgdGhleSBhcmUgZm9ybWF0dGVkIGFzIEphdmFTY3JpcHQgbnVtYmVycy5cbiAqXG4gKiBFeGFtcGxlczpcbiAqIGdldFR5cGUoJzEwLjUnKSA9ICdudW1iZXInXG4gKiBnZXRUeXBlKDEwLjUpID0gJ251bWJlcidcbiAqIGdldFR5cGUoJzEwJykgPSAnaW50ZWdlcidcbiAqIGdldFR5cGUoMTApID0gJ2ludGVnZXInXG4gKiBnZXRUeXBlKCd0cnVlJykgPSAnc3RyaW5nJ1xuICogZ2V0VHlwZSh0cnVlKSA9ICdib29sZWFuJ1xuICogZ2V0VHlwZShudWxsKSA9ICdudWxsJ1xuICogZ2V0VHlwZSh7IH0pID0gJ29iamVjdCdcbiAqIGdldFR5cGUoW10pID0gJ2FycmF5J1xuICpcbiAqIGdldFR5cGUoJzEwLjUnLCAnc3RyaWN0JykgPSAnc3RyaW5nJ1xuICogZ2V0VHlwZSgxMC41LCAnc3RyaWN0JykgPSAnbnVtYmVyJ1xuICogZ2V0VHlwZSgnMTAnLCAnc3RyaWN0JykgPSAnc3RyaW5nJ1xuICogZ2V0VHlwZSgxMCwgJ3N0cmljdCcpID0gJ2ludGVnZXInXG4gKiBnZXRUeXBlKCd0cnVlJywgJ3N0cmljdCcpID0gJ3N0cmluZydcbiAqIGdldFR5cGUodHJ1ZSwgJ3N0cmljdCcpID0gJ2Jvb2xlYW4nXG4gKlxuICogQHBhcmFtIHZhbHVlIC0gdmFsdWUgdG8gY2hlY2tcbiAqIEBwYXJhbSBzdHJpY3QgLSBpZiB0cnV0aHksIGFsc28gY2hlY2tzIEphdmFTY3JpcHQgdHlvZVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUeXBlKHZhbHVlOiBhbnksIHN0cmljdDogYW55ID0gZmFsc2UpIHtcbiAgaWYgKCFpc0RlZmluZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuICdudWxsJ1xuICB9XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiAnYXJyYXknXG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiAnb2JqZWN0J1xuICB9XG4gIGlmIChpc0Jvb2xlYW4odmFsdWUsICdzdHJpY3QnKSkge1xuICAgIHJldHVybiAnYm9vbGVhbidcbiAgfVxuICBpZiAoaXNJbnRlZ2VyKHZhbHVlLCBzdHJpY3QpKSB7XG4gICAgcmV0dXJuICdpbnRlZ2VyJ1xuICB9XG4gIGlmIChpc051bWJlcih2YWx1ZSwgc3RyaWN0KSkge1xuICAgIHJldHVybiAnbnVtYmVyJ1xuICB9XG4gIGlmIChpc1N0cmluZyh2YWx1ZSkgfHwgKCFzdHJpY3QgJiYgaXNEYXRlKHZhbHVlKSkpIHtcbiAgICByZXR1cm4gJ3N0cmluZydcbiAgfVxuICByZXR1cm4gbnVsbFxufVxuIl19