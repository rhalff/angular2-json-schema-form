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
export function uniqueItems() {
    var e_1, _a;
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
    }
    var returnItems = [];
    try {
        for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
            var item = items_1_1.value;
            if (!returnItems.includes(item)) {
                returnItems.push(item);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return returnItems;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pcXVlSXRlbXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3NmLWNvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9mdW5jdGlvbnMvdXRpbGl0eS91bmlxdWVJdGVtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQU1BLE1BQU0sVUFBVSxXQUFXOztJQUFDLGVBQWtCO1NBQWxCLFVBQWtCLEVBQWxCLHFCQUFrQixFQUFsQixJQUFrQjtRQUFsQiwwQkFBa0I7O0lBQzVDLElBQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQTs7UUFDdEIsS0FBbUIsSUFBQSxVQUFBLFNBQUEsS0FBSyxDQUFBLDRCQUFBLCtDQUFFO1lBQXJCLElBQU0sSUFBSSxrQkFBQTtZQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMvQixXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO2FBQ3ZCO1NBQ0Y7Ozs7Ozs7OztJQUNELE9BQU8sV0FBVyxDQUFBO0FBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqICd1bmlxdWVJdGVtcycgZnVuY3Rpb25cbiAqXG4gKiBBY2NlcHRzIGFueSBudW1iZXIgb2Ygc3RyaW5nIHZhbHVlIGlucHV0cyxcbiAqIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIGFsbCBpbnB1dCB2YXVlcywgZXhjbHVkaW5nIGR1cGxpY2F0ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bmlxdWVJdGVtcyguLi5pdGVtczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gIGNvbnN0IHJldHVybkl0ZW1zID0gW11cbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgaWYgKCFyZXR1cm5JdGVtcy5pbmNsdWRlcyhpdGVtKSkge1xuICAgICAgcmV0dXJuSXRlbXMucHVzaChpdGVtKVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmV0dXJuSXRlbXNcbn1cbiJdfQ==