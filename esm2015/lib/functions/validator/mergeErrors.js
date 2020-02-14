import { mergeObjects } from './mergeObjects';
import { isEmpty } from './isEmpty';
export function mergeErrors(arrayOfErrors) {
    const mergedErrors = mergeObjects(...arrayOfErrors);
    return isEmpty(mergedErrors) ? null : mergedErrors;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VFcnJvcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdzZi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZnVuY3Rpb25zL3ZhbGlkYXRvci9tZXJnZUVycm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUE7QUFDM0MsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFdBQVcsQ0FBQTtBQVlqQyxNQUFNLFVBQVUsV0FBVyxDQUFDLGFBQWtCO0lBQzVDLE1BQU0sWUFBWSxHQUFHLFlBQVksQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFBO0lBQ25ELE9BQU8sT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQTtBQUNwRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHttZXJnZU9iamVjdHN9IGZyb20gJy4vbWVyZ2VPYmplY3RzJ1xuaW1wb3J0IHtpc0VtcHR5fSBmcm9tICcuL2lzRW1wdHknXG5pbXBvcnQge1BsYWluT2JqZWN0fSBmcm9tICcuL3R5cGVzJ1xuXG4vKipcbiAqICdtZXJnZUVycm9ycycgdXRpbGl0eSBmdW5jdGlvblxuICpcbiAqIE1lcmdlcyBhbiBhcnJheSBvZiBvYmplY3RzLlxuICogVXNlZCBmb3IgY29tYmluaW5nIHRoZSB2YWxpZGF0b3IgZXJyb3JzIHJldHVybmVkIGZyb20gJ2V4ZWN1dGVWYWxpZGF0b3JzJ1xuICpcbiAqIEBwYXJhbSBhcnJheU9mRXJyb3JzIC0gYXJyYXkgb2Ygb2JqZWN0c1xuICogQHJldHVybiBtZXJnZWQgb2JqZWN0LCBvciBudWxsIGlmIG5vIHVzYWJsZSBpbnB1dCBvYmplY3RzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUVycm9ycyhhcnJheU9mRXJyb3JzOiBhbnkpOiBQbGFpbk9iamVjdCB7XG4gIGNvbnN0IG1lcmdlZEVycm9ycyA9IG1lcmdlT2JqZWN0cyguLi5hcnJheU9mRXJyb3JzKVxuICByZXR1cm4gaXNFbXB0eShtZXJnZWRFcnJvcnMpID8gbnVsbCA6IG1lcmdlZEVycm9yc1xufVxuIl19