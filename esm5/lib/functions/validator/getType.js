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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VHlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nc2YtY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2Z1bmN0aW9ucy92YWxpZGF0b3IvZ2V0VHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sV0FBVyxDQUFBO0FBQ2pDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxZQUFZLENBQUE7QUFDbkMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGFBQWEsQ0FBQTtBQUNyQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sYUFBYSxDQUFBO0FBQ3JDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxZQUFZLENBQUE7QUFDbkMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLFlBQVksQ0FBQTtBQUNuQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFBO0FBQy9CLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxhQUFhLENBQUE7QUFtQ3JDLE1BQU0sVUFBVSxPQUFPLENBQUMsS0FBVSxFQUFFLE1BQW1CO0lBQW5CLHVCQUFBLEVBQUEsY0FBbUI7SUFDckQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNyQixPQUFPLE1BQU0sQ0FBQTtLQUNkO0lBQ0QsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDbEIsT0FBTyxPQUFPLENBQUE7S0FDZjtJQUNELElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ25CLE9BQU8sUUFBUSxDQUFBO0tBQ2hCO0lBQ0QsSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxFQUFFO1FBQzlCLE9BQU8sU0FBUyxDQUFBO0tBQ2pCO0lBQ0QsSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQzVCLE9BQU8sU0FBUyxDQUFBO0tBQ2pCO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQzNCLE9BQU8sUUFBUSxDQUFBO0tBQ2hCO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNqRCxPQUFPLFFBQVEsQ0FBQTtLQUNoQjtJQUNELE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNBcnJheX0gZnJvbSAnLi9pc0FycmF5J1xuaW1wb3J0IHtpc09iamVjdH0gZnJvbSAnLi9pc09iamVjdCdcbmltcG9ydCB7aXNCb29sZWFufSBmcm9tICcuL2lzQm9vbGVhbidcbmltcG9ydCB7aXNJbnRlZ2VyfSBmcm9tICcuL2lzSW50ZWdlcidcbmltcG9ydCB7aXNOdW1iZXJ9IGZyb20gJy4vaXNOdW1iZXInXG5pbXBvcnQge2lzU3RyaW5nfSBmcm9tICcuL2lzU3RyaW5nJ1xuaW1wb3J0IHtpc0RhdGV9IGZyb20gJy4vaXNEYXRlJ1xuaW1wb3J0IHtpc0RlZmluZWR9IGZyb20gJy4vaXNEZWZpbmVkJ1xuLyoqXG4gKiAnZ2V0VHlwZScgZnVuY3Rpb25cbiAqXG4gKiBEZXRlY3RzIHRoZSBKU09OIFNjaGVtYSBUeXBlIG9mIGEgdmFsdWUuXG4gKiBCeSBkZWZhdWx0LCBkZXRlY3RzIG51bWJlcnMgYW5kIGludGVnZXJzIGV2ZW4gaWYgZm9ybWF0dGVkIGFzIHN0cmluZ3MuXG4gKiAoU28gYWxsIGludGVnZXJzIGFyZSBhbHNvIG51bWJlcnMsIGFuZCBhbnkgbnVtYmVyIG1heSBhbHNvIGJlIGEgc3RyaW5nLilcbiAqIEhvd2V2ZXIsIGl0IG9ubHkgZGV0ZWN0cyB0cnVlIGJvb2xlYW4gdmFsdWVzICh0byBkZXRlY3QgYm9vbGVhbiB2YWx1ZXNcbiAqIGluIG5vbi1ib29sZWFuIGZvcm1hdHMsIHVzZSBpc0Jvb2xlYW4oKSBpbnN0ZWFkKS5cbiAqXG4gKiBJZiBwYXNzZWQgYSBzZWNvbmQgb3B0aW9uYWwgcGFyYW1ldGVyIG9mICdzdHJpY3QnLCBpdCB3aWxsIG9ubHkgZGV0ZWN0XG4gKiBudW1iZXJzIGFuZCBpbnRlZ2VycyBpZiB0aGV5IGFyZSBmb3JtYXR0ZWQgYXMgSmF2YVNjcmlwdCBudW1iZXJzLlxuICpcbiAqIEV4YW1wbGVzOlxuICogZ2V0VHlwZSgnMTAuNScpID0gJ251bWJlcidcbiAqIGdldFR5cGUoMTAuNSkgPSAnbnVtYmVyJ1xuICogZ2V0VHlwZSgnMTAnKSA9ICdpbnRlZ2VyJ1xuICogZ2V0VHlwZSgxMCkgPSAnaW50ZWdlcidcbiAqIGdldFR5cGUoJ3RydWUnKSA9ICdzdHJpbmcnXG4gKiBnZXRUeXBlKHRydWUpID0gJ2Jvb2xlYW4nXG4gKiBnZXRUeXBlKG51bGwpID0gJ251bGwnXG4gKiBnZXRUeXBlKHsgfSkgPSAnb2JqZWN0J1xuICogZ2V0VHlwZShbXSkgPSAnYXJyYXknXG4gKlxuICogZ2V0VHlwZSgnMTAuNScsICdzdHJpY3QnKSA9ICdzdHJpbmcnXG4gKiBnZXRUeXBlKDEwLjUsICdzdHJpY3QnKSA9ICdudW1iZXInXG4gKiBnZXRUeXBlKCcxMCcsICdzdHJpY3QnKSA9ICdzdHJpbmcnXG4gKiBnZXRUeXBlKDEwLCAnc3RyaWN0JykgPSAnaW50ZWdlcidcbiAqIGdldFR5cGUoJ3RydWUnLCAnc3RyaWN0JykgPSAnc3RyaW5nJ1xuICogZ2V0VHlwZSh0cnVlLCAnc3RyaWN0JykgPSAnYm9vbGVhbidcbiAqXG4gKiBAcGFyYW0gdmFsdWUgLSB2YWx1ZSB0byBjaGVja1xuICogQHBhcmFtIHN0cmljdCAtIGlmIHRydXRoeSwgYWxzbyBjaGVja3MgSmF2YVNjcmlwdCB0eW9lXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFR5cGUodmFsdWU6IGFueSwgc3RyaWN0OiBhbnkgPSBmYWxzZSkge1xuICBpZiAoIWlzRGVmaW5lZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gJ251bGwnXG4gIH1cbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuICdhcnJheSdcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuICdvYmplY3QnXG4gIH1cbiAgaWYgKGlzQm9vbGVhbih2YWx1ZSwgJ3N0cmljdCcpKSB7XG4gICAgcmV0dXJuICdib29sZWFuJ1xuICB9XG4gIGlmIChpc0ludGVnZXIodmFsdWUsIHN0cmljdCkpIHtcbiAgICByZXR1cm4gJ2ludGVnZXInXG4gIH1cbiAgaWYgKGlzTnVtYmVyKHZhbHVlLCBzdHJpY3QpKSB7XG4gICAgcmV0dXJuICdudW1iZXInXG4gIH1cbiAgaWYgKGlzU3RyaW5nKHZhbHVlKSB8fCAoIXN0cmljdCAmJiBpc0RhdGUodmFsdWUpKSkge1xuICAgIHJldHVybiAnc3RyaW5nJ1xuICB9XG4gIHJldHVybiBudWxsXG59XG4iXX0=