import { isArray, isMap, isObject, isSet } from '../validator';
export function copy(object, errors = false) {
    if (typeof object !== 'object' || object === null) {
        return object;
    }
    if (isMap(object)) {
        return new Map(object);
    }
    if (isSet(object)) {
        return new Set(object);
    }
    if (isArray(object)) {
        return [...object];
    }
    if (isObject(object)) {
        return Object.assign({}, object);
    }
    if (errors) {
        console.error('copy error: Object to copy must be a JavaScript object or value.');
    }
    return object;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9mdW5jdGlvbnMvdXRpbGl0eS9jb3B5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFhNUQsTUFBTSxVQUFVLElBQUksQ0FDbEIsTUFBVyxFQUNYLFNBQWtCLEtBQUs7SUFFdkIsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtRQUNqRCxPQUFPLE1BQU0sQ0FBQTtLQUNkO0lBQ0QsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDakIsT0FBTyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtLQUN2QjtJQUNELElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2pCLE9BQU8sSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7S0FDdkI7SUFDRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNuQixPQUFPLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQTtLQUNuQjtJQUNELElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3BCLHlCQUFXLE1BQU0sRUFBQztLQUNuQjtJQUNELElBQUksTUFBTSxFQUFFO1FBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxDQUFBO0tBQ2xGO0lBQ0QsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc0FycmF5LCBpc01hcCwgaXNPYmplY3QsIGlzU2V0fSBmcm9tICcuLi92YWxpZGF0b3InXG5cbi8qKlxuICogJ2NvcHknIGZ1bmN0aW9uXG4gKlxuICogTWFrZXMgYSBzaGFsbG93IGNvcHkgb2YgYSBKYXZhU2NyaXB0IG9iamVjdCwgYXJyYXksIE1hcCwgb3IgU2V0LlxuICogSWYgcGFzc2VkIGEgSmF2YVNjcmlwdCBwcmltaXRpdmUgdmFsdWUgKHN0cmluZywgbnVtYmVyLCBib29sZWFuLCBvciBudWxsKSxcbiAqIGl0IHJldHVybnMgdGhlIHZhbHVlLlxuICpcbiAqIEBwYXJhbSBvYmplY3QgLSBUaGUgb2JqZWN0IHRvIGNvcHlcbiAqIEBwYXJhbSBlcnJvcnMgLSBTaG93IGVycm9ycz9cbiAqIEByZXR1cm4gVGhlIGNvcGllZCBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcHkoXG4gIG9iamVjdDogYW55LFxuICBlcnJvcnM6IGJvb2xlYW4gPSBmYWxzZVxuKSB7XG4gIGlmICh0eXBlb2Ygb2JqZWN0ICE9PSAnb2JqZWN0JyB8fCBvYmplY3QgPT09IG51bGwpIHtcbiAgICByZXR1cm4gb2JqZWN0XG4gIH1cbiAgaWYgKGlzTWFwKG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmV3IE1hcChvYmplY3QpXG4gIH1cbiAgaWYgKGlzU2V0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmV3IFNldChvYmplY3QpXG4gIH1cbiAgaWYgKGlzQXJyYXkob2JqZWN0KSkge1xuICAgIHJldHVybiBbLi4ub2JqZWN0XVxuICB9XG4gIGlmIChpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIHsuLi5vYmplY3R9XG4gIH1cbiAgaWYgKGVycm9ycykge1xuICAgIGNvbnNvbGUuZXJyb3IoJ2NvcHkgZXJyb3I6IE9iamVjdCB0byBjb3B5IG11c3QgYmUgYSBKYXZhU2NyaXB0IG9iamVjdCBvciB2YWx1ZS4nKVxuICB9XG4gIHJldHVybiBvYmplY3Rcbn1cbiJdfQ==