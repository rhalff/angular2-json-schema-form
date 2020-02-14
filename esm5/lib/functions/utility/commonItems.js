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
export function commonItems() {
    var e_1, _a;
    var arrays = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arrays[_i] = arguments[_i];
    }
    var returnItems = null;
    var _loop_1 = function (value) {
        var array = typeof value === 'string' ? [value] : value;
        returnItems = returnItems === null ? __spread(array) :
            returnItems.filter(function (item) { return array.includes(item); });
        if (!returnItems.length) {
            return { value: [] };
        }
    };
    try {
        for (var arrays_1 = __values(arrays), arrays_1_1 = arrays_1.next(); !arrays_1_1.done; arrays_1_1 = arrays_1.next()) {
            var value = arrays_1_1.value;
            var state_1 = _loop_1(value);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (arrays_1_1 && !arrays_1_1.done && (_a = arrays_1.return)) _a.call(arrays_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return returnItems;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uSXRlbXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3NmLWNvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9mdW5jdGlvbnMvdXRpbGl0eS9jb21tb25JdGVtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTUEsTUFBTSxVQUFVLFdBQVc7O0lBQUMsZ0JBQW1CO1NBQW5CLFVBQW1CLEVBQW5CLHFCQUFtQixFQUFuQixJQUFtQjtRQUFuQiwyQkFBbUI7O0lBQzdDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQTs0QkFDWCxLQUFLO1FBQ2QsSUFBTSxLQUFLLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7UUFFekQsV0FBVyxHQUFHLFdBQVcsS0FBSyxJQUFJLENBQUMsQ0FBQyxVQUFLLEtBQUssRUFBRSxDQUFDO1lBQy9DLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFwQixDQUFvQixDQUFDLENBQUE7UUFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7NEJBQ2hCLEVBQUU7U0FDVjs7O1FBUEgsS0FBb0IsSUFBQSxXQUFBLFNBQUEsTUFBTSxDQUFBLDhCQUFBO1lBQXJCLElBQU0sS0FBSyxtQkFBQTtrQ0FBTCxLQUFLOzs7U0FRZjs7Ozs7Ozs7O0lBQ0QsT0FBTyxXQUFXLENBQUE7QUFDcEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogJ2NvbW1vbkl0ZW1zJyBmdW5jdGlvblxuICpcbiAqIEFjY2VwdHMgYW55IG51bWJlciBvZiBzdHJpbmdzIG9yIGFycmF5cyBvZiBzdHJpbmcgdmFsdWVzLFxuICogYW5kIHJldHVybnMgYSBzaW5nbGUgYXJyYXkgY29udGFpbmluZyBvbmx5IHZhbHVlcyBwcmVzZW50IGluIGFsbCBpbnB1dHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21tb25JdGVtcyguLi5hcnJheXM6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICBsZXQgcmV0dXJuSXRlbXMgPSBudWxsXG4gIGZvciAoY29uc3QgdmFsdWUgb2YgYXJyYXlzKSB7XG4gICAgY29uc3QgYXJyYXkgPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gW3ZhbHVlXSA6IHZhbHVlXG5cbiAgICByZXR1cm5JdGVtcyA9IHJldHVybkl0ZW1zID09PSBudWxsID8gWy4uLmFycmF5XSA6XG4gICAgICByZXR1cm5JdGVtcy5maWx0ZXIoaXRlbSA9PiBhcnJheS5pbmNsdWRlcyhpdGVtKSlcbiAgICBpZiAoIXJldHVybkl0ZW1zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIFtdXG4gICAgfVxuICB9XG4gIHJldHVybiByZXR1cm5JdGVtc1xufVxuIl19