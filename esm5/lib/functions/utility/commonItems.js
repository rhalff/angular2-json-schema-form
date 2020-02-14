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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uSXRlbXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdzZi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZnVuY3Rpb25zL3V0aWxpdHkvY29tbW9uSXRlbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1BLE1BQU0sVUFBVSxXQUFXOztJQUFDLGdCQUFtQjtTQUFuQixVQUFtQixFQUFuQixxQkFBbUIsRUFBbkIsSUFBbUI7UUFBbkIsMkJBQW1COztJQUM3QyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUE7NEJBQ1gsS0FBSztRQUNkLElBQU0sS0FBSyxHQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO1FBRXpELFdBQVcsR0FBRyxXQUFXLEtBQUssSUFBSSxDQUFDLENBQUMsVUFBSyxLQUFLLEVBQUUsQ0FBQztZQUMvQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFBO1FBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFOzRCQUNoQixFQUFFO1NBQ1Y7OztRQVBILEtBQW9CLElBQUEsV0FBQSxTQUFBLE1BQU0sQ0FBQSw4QkFBQTtZQUFyQixJQUFNLEtBQUssbUJBQUE7a0NBQUwsS0FBSzs7O1NBUWY7Ozs7Ozs7OztJQUNELE9BQU8sV0FBVyxDQUFBO0FBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqICdjb21tb25JdGVtcycgZnVuY3Rpb25cbiAqXG4gKiBBY2NlcHRzIGFueSBudW1iZXIgb2Ygc3RyaW5ncyBvciBhcnJheXMgb2Ygc3RyaW5nIHZhbHVlcyxcbiAqIGFuZCByZXR1cm5zIGEgc2luZ2xlIGFycmF5IGNvbnRhaW5pbmcgb25seSB2YWx1ZXMgcHJlc2VudCBpbiBhbGwgaW5wdXRzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tbW9uSXRlbXMoLi4uYXJyYXlzOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgbGV0IHJldHVybkl0ZW1zID0gbnVsbFxuICBmb3IgKGNvbnN0IHZhbHVlIG9mIGFycmF5cykge1xuICAgIGNvbnN0IGFycmF5ID0gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IFt2YWx1ZV0gOiB2YWx1ZVxuXG4gICAgcmV0dXJuSXRlbXMgPSByZXR1cm5JdGVtcyA9PT0gbnVsbCA/IFsuLi5hcnJheV0gOlxuICAgICAgcmV0dXJuSXRlbXMuZmlsdGVyKGl0ZW0gPT4gYXJyYXkuaW5jbHVkZXMoaXRlbSkpXG4gICAgaWYgKCFyZXR1cm5JdGVtcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBbXVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmV0dXJuSXRlbXNcbn1cbiJdfQ==