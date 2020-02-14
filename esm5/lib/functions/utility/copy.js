var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { isArray, isMap, isObject, isSet } from '../validator';
export function copy(object, errors) {
    if (errors === void 0) { errors = false; }
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
        return __spread(object);
    }
    if (isObject(object)) {
        return __assign({}, object);
    }
    if (errors) {
        console.error('copy error: Object to copy must be a JavaScript object or value.');
    }
    return object;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9mdW5jdGlvbnMvdXRpbGl0eS9jb3B5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBYTVELE1BQU0sVUFBVSxJQUFJLENBQ2xCLE1BQVcsRUFDWCxNQUF1QjtJQUF2Qix1QkFBQSxFQUFBLGNBQXVCO0lBRXZCLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7UUFDakQsT0FBTyxNQUFNLENBQUE7S0FDZDtJQUNELElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2pCLE9BQU8sSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7S0FDdkI7SUFDRCxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNqQixPQUFPLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0tBQ3ZCO0lBQ0QsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDbkIsZ0JBQVcsTUFBTSxFQUFDO0tBQ25CO0lBQ0QsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDcEIsb0JBQVcsTUFBTSxFQUFDO0tBQ25CO0lBQ0QsSUFBSSxNQUFNLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLGtFQUFrRSxDQUFDLENBQUE7S0FDbEY7SUFDRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzQXJyYXksIGlzTWFwLCBpc09iamVjdCwgaXNTZXR9IGZyb20gJy4uL3ZhbGlkYXRvcidcblxuLyoqXG4gKiAnY29weScgZnVuY3Rpb25cbiAqXG4gKiBNYWtlcyBhIHNoYWxsb3cgY29weSBvZiBhIEphdmFTY3JpcHQgb2JqZWN0LCBhcnJheSwgTWFwLCBvciBTZXQuXG4gKiBJZiBwYXNzZWQgYSBKYXZhU2NyaXB0IHByaW1pdGl2ZSB2YWx1ZSAoc3RyaW5nLCBudW1iZXIsIGJvb2xlYW4sIG9yIG51bGwpLFxuICogaXQgcmV0dXJucyB0aGUgdmFsdWUuXG4gKlxuICogQHBhcmFtIG9iamVjdCAtIFRoZSBvYmplY3QgdG8gY29weVxuICogQHBhcmFtIGVycm9ycyAtIFNob3cgZXJyb3JzP1xuICogQHJldHVybiBUaGUgY29waWVkIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gY29weShcbiAgb2JqZWN0OiBhbnksXG4gIGVycm9yczogYm9vbGVhbiA9IGZhbHNlXG4pIHtcbiAgaWYgKHR5cGVvZiBvYmplY3QgIT09ICdvYmplY3QnIHx8IG9iamVjdCA9PT0gbnVsbCkge1xuICAgIHJldHVybiBvYmplY3RcbiAgfVxuICBpZiAoaXNNYXAob2JqZWN0KSkge1xuICAgIHJldHVybiBuZXcgTWFwKG9iamVjdClcbiAgfVxuICBpZiAoaXNTZXQob2JqZWN0KSkge1xuICAgIHJldHVybiBuZXcgU2V0KG9iamVjdClcbiAgfVxuICBpZiAoaXNBcnJheShvYmplY3QpKSB7XG4gICAgcmV0dXJuIFsuLi5vYmplY3RdXG4gIH1cbiAgaWYgKGlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gey4uLm9iamVjdH1cbiAgfVxuICBpZiAoZXJyb3JzKSB7XG4gICAgY29uc29sZS5lcnJvcignY29weSBlcnJvcjogT2JqZWN0IHRvIGNvcHkgbXVzdCBiZSBhIEphdmFTY3JpcHQgb2JqZWN0IG9yIHZhbHVlLicpXG4gIH1cbiAgcmV0dXJuIG9iamVjdFxufVxuIl19