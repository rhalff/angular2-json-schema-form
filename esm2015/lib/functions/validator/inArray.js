import { isDefined } from './isDefined';
import { isArray } from './isArray';
export function inArray(item, array, allIn = false) {
    if (!isDefined(item) || !isArray(array)) {
        return false;
    }
    return isArray(item) ?
        item[allIn ? 'every' : 'some'](subItem => array.includes(subItem)) :
        array.includes(item);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5BcnJheS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9mdW5jdGlvbnMvdmFsaWRhdG9yL2luQXJyYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGFBQWEsQ0FBQTtBQUNyQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sV0FBVyxDQUFBO0FBa0JqQyxNQUFNLFVBQVUsT0FBTyxDQUNyQixJQUFpQixFQUNqQixLQUFVLEVBQ1YsS0FBSyxHQUFHLEtBQUs7SUFFYixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3ZDLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFDRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzRGVmaW5lZH0gZnJvbSAnLi9pc0RlZmluZWQnXG5pbXBvcnQge2lzQXJyYXl9IGZyb20gJy4vaXNBcnJheSdcblxuLyoqXG4gKiAnaW5BcnJheScgZnVuY3Rpb25cbiAqXG4gKiBTZWFyY2hlcyBhbiBhcnJheSBmb3IgYW4gaXRlbSwgb3Igb25lIG9mIGEgbGlzdCBvZiBpdGVtcywgYW5kIHJldHVybnMgdHJ1ZVxuICogYXMgc29vbiBhcyBhIG1hdGNoIGlzIGZvdW5kLCBvciBmYWxzZSBpZiBubyBtYXRjaC5cbiAqXG4gKiBJZiB0aGUgb3B0aW9uYWwgdGhpcmQgcGFyYW1ldGVyIGFsbEluIGlzIHNldCB0byBUUlVFLCBhbmQgdGhlIGl0ZW0gdG8gZmluZFxuICogaXMgYW4gYXJyYXksIHRoZW4gdGhlIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSBvbmx5IGlmIGFsbCBlbGVtZW50cyBmcm9tIGl0ZW1cbiAqIGFyZSBmb3VuZCBpbiB0aGUgYXJyYXkgbGlzdCwgYW5kIGZhbHNlIGlmIGFueSBlbGVtZW50IGlzIG5vdCBmb3VuZC4gSWYgdGhlXG4gKiBpdGVtIHRvIGZpbmQgaXMgbm90IGFuIGFycmF5LCBzZXR0aW5nIGFsbEluIHRvIFRSVUUgaGFzIG5vIGVmZmVjdC5cbiAqXG4gKiBAcGFyYW0gaXRlbSAtIHRoZSBpdGVtIHRvIHNlYXJjaCBmb3JcbiAqIEBwYXJhbSBhcnJheSAtIHRoZSBhcnJheSB0byBzZWFyY2hcbiAqIEBwYXJhbSBhbGxJbiAtIGlmIFRSVUUsIGFsbCBpdGVtcyBtdXN0IGJlIGluIGFycmF5XG4gKiBAcmV0dXJuIHRydWUgaWYgaXRlbShzKSBpbiBhcnJheSwgZmFsc2Ugb3RoZXJ3aXNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbkFycmF5PFQ+KFxuICBpdGVtOiBhbnkgfCBhbnlbXSxcbiAgYXJyYXk6IFRbXSxcbiAgYWxsSW4gPSBmYWxzZVxuKTogYm9vbGVhbiB7XG4gIGlmICghaXNEZWZpbmVkKGl0ZW0pIHx8ICFpc0FycmF5KGFycmF5KSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiBpc0FycmF5KGl0ZW0pID9cbiAgICBpdGVtW2FsbEluID8gJ2V2ZXJ5JyA6ICdzb21lJ10oc3ViSXRlbSA9PiBhcnJheS5pbmNsdWRlcyhzdWJJdGVtKSkgOlxuICAgIGFycmF5LmluY2x1ZGVzKGl0ZW0pXG59XG4iXX0=