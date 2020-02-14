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
import { isArray, isObject, isString, hasOwn } from '@ngsf/common';
export function buildTitleMap(titleMap, enumList, fieldRequired, flatList) {
    var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
    if (fieldRequired === void 0) { fieldRequired = true; }
    if (flatList === void 0) { flatList = true; }
    var newTitleMap = [];
    var hasEmptyValue = false;
    if (titleMap) {
        if (isArray(titleMap)) {
            if (enumList) {
                try {
                    for (var _e = __values(Object.keys(titleMap)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var i = _f.value;
                        if (isObject(titleMap[i])) {
                            var value = titleMap[i].value;
                            if (enumList.includes(value)) {
                                var name_1 = titleMap[i].name;
                                newTitleMap.push({ name: name_1, value: value });
                                if (value === undefined || value === null) {
                                    hasEmptyValue = true;
                                }
                            }
                        }
                        else if (isString(titleMap[i])) {
                            if (i < enumList.length) {
                                var name_2 = titleMap[i];
                                var value = enumList[i];
                                newTitleMap.push({ name: name_2, value: value });
                                if (value === undefined || value === null) {
                                    hasEmptyValue = true;
                                }
                            }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else {
                newTitleMap = titleMap;
                if (!fieldRequired) {
                    hasEmptyValue = !!newTitleMap
                        .filter((function (i) { return i.value === undefined || i.value === null; }))
                        .length;
                }
            }
        }
        else if (enumList) {
            try {
                for (var _g = __values(Object.keys(enumList)), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var i = _h.value;
                    var value = enumList[i];
                    if (hasOwn(titleMap, value)) {
                        var name_3 = titleMap[value];
                        newTitleMap.push({ name: name_3, value: value });
                        if (value === undefined || value === null) {
                            hasEmptyValue = true;
                        }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        else {
            try {
                for (var _j = __values(Object.keys(titleMap)), _k = _j.next(); !_k.done; _k = _j.next()) {
                    var value = _k.value;
                    var name_4 = titleMap[value];
                    newTitleMap.push({ name: name_4, value: value });
                    if (value === undefined || value === null) {
                        hasEmptyValue = true;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
    }
    else if (enumList) {
        try {
            for (var _l = __values(Object.keys(enumList)), _m = _l.next(); !_m.done; _m = _l.next()) {
                var i = _m.value;
                var name_5 = enumList[i];
                var value = enumList[i];
                newTitleMap.push({ name: name_5, value: value });
                if (value === undefined || value === null) {
                    hasEmptyValue = true;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
            }
            finally { if (e_4) throw e_4.error; }
        }
    }
    else {
        newTitleMap = [{ name: 'True', value: true }, { name: 'False', value: false }];
    }
    if (newTitleMap.some((function (title) { return hasOwn(title, 'group'); }))) {
        hasEmptyValue = false;
        if (flatList) {
            newTitleMap = newTitleMap.reduce((function (groupTitleMap, title) {
                if (hasOwn(title, 'group')) {
                    if (isArray(title.items)) {
                        groupTitleMap = __spread(groupTitleMap, title.items.map((function (item) {
                            return (__assign(__assign({}, item), { name: title.group + ": " + item.name }));
                        })));
                        if (title.items.some((function (item) { return item.value === undefined || item.value === null; }))) {
                            hasEmptyValue = true;
                        }
                    }
                    if (hasOwn(title, 'name') && hasOwn(title, 'value')) {
                        title.name = title.group + ": " + title.name;
                        delete title.group;
                        groupTitleMap.push(title);
                        if (title.value === undefined || title.value === null) {
                            hasEmptyValue = true;
                        }
                    }
                }
                else {
                    groupTitleMap.push(title);
                    if (title.value === undefined || title.value === null) {
                        hasEmptyValue = true;
                    }
                }
                return groupTitleMap;
            }), []);
        }
        else {
            newTitleMap = newTitleMap.reduce((function (groupTitleMap, title) {
                if (hasOwn(title, 'group')) {
                    if (title.group !== (groupTitleMap[groupTitleMap.length - 1] || {}).group) {
                        groupTitleMap.push({ group: title.group, items: title.items || [] });
                    }
                    if (hasOwn(title, 'name') && hasOwn(title, 'value')) {
                        groupTitleMap[groupTitleMap.length - 1].items
                            .push({ name: title.name, value: title.value });
                        if (title.value === undefined || title.value === null) {
                            hasEmptyValue = true;
                        }
                    }
                }
                else {
                    groupTitleMap.push(title);
                    if (title.value === undefined || title.value === null) {
                        hasEmptyValue = true;
                    }
                }
                return groupTitleMap;
            }), []);
        }
    }
    if (!fieldRequired && !hasEmptyValue) {
        newTitleMap.unshift({ name: '<em>None</em>', value: null });
    }
    return newTitleMap;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRUaXRsZU1hcC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL3dpZGdldC1saWJyYXJ5LyIsInNvdXJjZXMiOlsibGliL2Z1bmN0aW9ucy9idWlsZFRpdGxlTWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFNaEUsTUFBTSxVQUFVLGFBQWEsQ0FDM0IsUUFBYSxFQUNiLFFBQWEsRUFDYixhQUE2QixFQUM3QixRQUF3Qjs7SUFEeEIsOEJBQUEsRUFBQSxvQkFBNkI7SUFDN0IseUJBQUEsRUFBQSxlQUF3QjtRQUVwQixXQUFXLEdBQW1CLEVBQUU7UUFDaEMsYUFBYSxHQUFHLEtBQUs7SUFDekIsSUFBSSxRQUFRLEVBQUU7UUFDWixJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNyQixJQUFJLFFBQVEsRUFBRTs7b0JBQ1osS0FBZ0IsSUFBQSxLQUFBLFNBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTt3QkFBbEMsSUFBTSxDQUFDLFdBQUE7d0JBQ1YsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0NBQ25CLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSzs0QkFDL0IsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO29DQUN0QixNQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7Z0NBQzdCLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLFFBQUEsRUFBRSxLQUFLLE9BQUEsRUFBQyxDQUFDLENBQUE7Z0NBQy9CLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFB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QUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFBO3dCQUMvQyxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFOzRCQUNyRCxhQUFhLEdBQUcsSUFBSSxDQUFBO3lCQUNyQjtxQkFDRjtpQkFDRjtxQkFBTTtvQkFDTCxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUN6QixJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO3dCQUNyRCxhQUFhLEdBQUcsSUFBSSxDQUFBO3FCQUNyQjtpQkFDRjtnQkFDRCxPQUFPLGFBQWEsQ0FBQTtZQUN0QixDQUFDLEdBQUUsRUFBRSxDQUFDLENBQUE7U0FDUDtLQUNGO0lBQ0QsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLGFBQWEsRUFBRTtRQUNwQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtLQUMxRDtJQUNELE9BQU8sV0FBVyxDQUFBO0FBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzQXJyYXksIGlzT2JqZWN0LCBpc1N0cmluZywgaGFzT3dufSBmcm9tICdAbmdzZi9jb21tb24nXG5pbXBvcnQge1RpdGxlTWFwSXRlbX0gZnJvbSAnLi4vaW50ZXJmYWNlcy90aXRsZS1tYXAtaXRlbSdcblxuLyoqXG4gKiAnYnVpbGRUaXRsZU1hcCcgZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkVGl0bGVNYXAoXG4gIHRpdGxlTWFwOiBhbnksXG4gIGVudW1MaXN0OiBhbnksXG4gIGZpZWxkUmVxdWlyZWQ6IGJvb2xlYW4gPSB0cnVlLFxuICBmbGF0TGlzdDogYm9vbGVhbiA9IHRydWVcbik6IFRpdGxlTWFwSXRlbVtdIHtcbiAgbGV0IG5ld1RpdGxlTWFwOiBUaXRsZU1hcEl0ZW1bXSA9IFtdXG4gIGxldCBoYXNFbXB0eVZhbHVlID0gZmFsc2VcbiAgaWYgKHRpdGxlTWFwKSB7XG4gICAgaWYgKGlzQXJyYXkodGl0bGVNYXApKSB7XG4gICAgICBpZiAoZW51bUxpc3QpIHtcbiAgICAgICAgZm9yIChjb25zdCBpIG9mIE9iamVjdC5rZXlzKHRpdGxlTWFwKSkge1xuICAgICAgICAgIGlmIChpc09iamVjdCh0aXRsZU1hcFtpXSkpIHsgLy8gSlNPTiBGb3JtIHN0eWxlXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRpdGxlTWFwW2ldLnZhbHVlXG4gICAgICAgICAgICBpZiAoZW51bUxpc3QuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSB0aXRsZU1hcFtpXS5uYW1lXG4gICAgICAgICAgICAgIG5ld1RpdGxlTWFwLnB1c2goe25hbWUsIHZhbHVlfSlcbiAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBoYXNFbXB0eVZhbHVlID0gdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZyh0aXRsZU1hcFtpXSkpIHsgLy8gUmVhY3QgSnNvbnNjaGVtYSBGb3JtIHN0eWxlXG4gICAgICAgICAgICBpZiAoaSA8IGVudW1MaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICBjb25zdCBuYW1lID0gdGl0bGVNYXBbaV1cbiAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBlbnVtTGlzdFtpXVxuICAgICAgICAgICAgICBuZXdUaXRsZU1hcC5wdXNoKHtuYW1lLCB2YWx1ZX0pXG4gICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaGFzRW1wdHlWYWx1ZSA9IHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHsgLy8gSWYgYXJyYXkgdGl0bGVNYXAgYW5kIG5vIGVudW0gbGlzdCwganVzdCByZXR1cm4gdGhlIHRpdGxlTWFwIC0gQW5ndWxhciBTY2hlbWEgRm9ybSBzdHlsZVxuICAgICAgICBuZXdUaXRsZU1hcCA9IHRpdGxlTWFwXG4gICAgICAgIGlmICghZmllbGRSZXF1aXJlZCkge1xuICAgICAgICAgIGhhc0VtcHR5VmFsdWUgPSAhIW5ld1RpdGxlTWFwXG4gICAgICAgICAgICAuZmlsdGVyKGkgPT4gaS52YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IGkudmFsdWUgPT09IG51bGwpXG4gICAgICAgICAgICAubGVuZ3RoXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGVudW1MaXN0KSB7IC8vIEFsdGVybmF0ZSBKU09OIEZvcm0gc3R5bGUsIHdpdGggZW51bSBsaXN0XG4gICAgICBmb3IgKGNvbnN0IGkgb2YgT2JqZWN0LmtleXMoZW51bUxpc3QpKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZW51bUxpc3RbaV1cbiAgICAgICAgaWYgKGhhc093bih0aXRsZU1hcCwgdmFsdWUpKSB7XG4gICAgICAgICAgY29uc3QgbmFtZSA9IHRpdGxlTWFwW3ZhbHVlXVxuICAgICAgICAgIG5ld1RpdGxlTWFwLnB1c2goe25hbWUsIHZhbHVlfSlcbiAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaGFzRW1wdHlWYWx1ZSA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgeyAvLyBBbHRlcm5hdGUgSlNPTiBGb3JtIHN0eWxlLCB3aXRob3V0IGVudW0gbGlzdFxuICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiBPYmplY3Qua2V5cyh0aXRsZU1hcCkpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IHRpdGxlTWFwW3ZhbHVlXVxuICAgICAgICBuZXdUaXRsZU1hcC5wdXNoKHtuYW1lLCB2YWx1ZX0pXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgaGFzRW1wdHlWYWx1ZSA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChlbnVtTGlzdCkgeyAvLyBCdWlsZCBtYXAgZnJvbSBlbnVtIGxpc3QgYWxvbmVcbiAgICBmb3IgKGNvbnN0IGkgb2YgT2JqZWN0LmtleXMoZW51bUxpc3QpKSB7XG4gICAgICBjb25zdCBuYW1lID0gZW51bUxpc3RbaV1cbiAgICAgIGNvbnN0IHZhbHVlID0gZW51bUxpc3RbaV1cbiAgICAgIG5ld1RpdGxlTWFwLnB1c2goe25hbWUsIHZhbHVlfSlcbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIGhhc0VtcHR5VmFsdWUgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgeyAvLyBJZiBubyB0aXRsZU1hcCBhbmQgbm8gZW51bSBsaXN0LCByZXR1cm4gZGVmYXVsdCBtYXAgb2YgYm9vbGVhbiB2YWx1ZXNcbiAgICBuZXdUaXRsZU1hcCA9IFt7bmFtZTogJ1RydWUnLCB2YWx1ZTogdHJ1ZX0sIHtuYW1lOiAnRmFsc2UnLCB2YWx1ZTogZmFsc2V9XVxuICB9XG5cbiAgLy8gRG9lcyB0aXRsZU1hcCBoYXZlIGdyb3Vwcz9cbiAgaWYgKG5ld1RpdGxlTWFwLnNvbWUodGl0bGUgPT4gaGFzT3duKHRpdGxlLCAnZ3JvdXAnKSkpIHtcbiAgICBoYXNFbXB0eVZhbHVlID0gZmFsc2VcblxuICAgIC8vIElmIGZsYXRMaXN0ID0gdHJ1ZSwgZmxhdHRlbiBpdGVtcyAmIHVwZGF0ZSBuYW1lIHRvIGdyb3VwOiBuYW1lXG4gICAgaWYgKGZsYXRMaXN0KSB7XG4gICAgICBuZXdUaXRsZU1hcCA9IG5ld1RpdGxlTWFwLnJlZHVjZSgoZ3JvdXBUaXRsZU1hcCwgdGl0bGUpID0+IHtcbiAgICAgICAgaWYgKGhhc093bih0aXRsZSwgJ2dyb3VwJykpIHtcbiAgICAgICAgICBpZiAoaXNBcnJheSh0aXRsZS5pdGVtcykpIHtcbiAgICAgICAgICAgIGdyb3VwVGl0bGVNYXAgPSBbXG4gICAgICAgICAgICAgIC4uLmdyb3VwVGl0bGVNYXAsXG4gICAgICAgICAgICAgIC4uLnRpdGxlLml0ZW1zLm1hcChpdGVtID0+XG4gICAgICAgICAgICAgICAgKHsuLi5pdGVtLCAuLi57bmFtZTogYCR7dGl0bGUuZ3JvdXB9OiAke2l0ZW0ubmFtZX1gfX0pXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF1cbiAgICAgICAgICAgIGlmICh0aXRsZS5pdGVtcy5zb21lKGl0ZW0gPT4gaXRlbS52YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IGl0ZW0udmFsdWUgPT09IG51bGwpKSB7XG4gICAgICAgICAgICAgIGhhc0VtcHR5VmFsdWUgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChoYXNPd24odGl0bGUsICduYW1lJykgJiYgaGFzT3duKHRpdGxlLCAndmFsdWUnKSkge1xuICAgICAgICAgICAgdGl0bGUubmFtZSA9IGAke3RpdGxlLmdyb3VwfTogJHt0aXRsZS5uYW1lfWBcbiAgICAgICAgICAgIGRlbGV0ZSB0aXRsZS5ncm91cFxuICAgICAgICAgICAgZ3JvdXBUaXRsZU1hcC5wdXNoKHRpdGxlKVxuICAgICAgICAgICAgaWYgKHRpdGxlLnZhbHVlID09PSB1bmRlZmluZWQgfHwgdGl0bGUudmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgaGFzRW1wdHlWYWx1ZSA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ3JvdXBUaXRsZU1hcC5wdXNoKHRpdGxlKVxuICAgICAgICAgIGlmICh0aXRsZS52YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHRpdGxlLnZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICBoYXNFbXB0eVZhbHVlID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ3JvdXBUaXRsZU1hcFxuICAgICAgfSwgW10pXG5cbiAgICAgIC8vIElmIGZsYXRMaXN0ID0gZmFsc2UsIGNvbWJpbmUgaXRlbXMgZnJvbSBtYXRjaGluZyBncm91cHNcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3VGl0bGVNYXAgPSBuZXdUaXRsZU1hcC5yZWR1Y2UoKGdyb3VwVGl0bGVNYXAsIHRpdGxlKSA9PiB7XG4gICAgICAgIGlmIChoYXNPd24odGl0bGUsICdncm91cCcpKSB7XG4gICAgICAgICAgaWYgKHRpdGxlLmdyb3VwICE9PSAoZ3JvdXBUaXRsZU1hcFtncm91cFRpdGxlTWFwLmxlbmd0aCAtIDFdIHx8IHt9KS5ncm91cCkge1xuICAgICAgICAgICAgZ3JvdXBUaXRsZU1hcC5wdXNoKHtncm91cDogdGl0bGUuZ3JvdXAsIGl0ZW1zOiB0aXRsZS5pdGVtcyB8fCBbXX0pXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChoYXNPd24odGl0bGUsICduYW1lJykgJiYgaGFzT3duKHRpdGxlLCAndmFsdWUnKSkge1xuICAgICAgICAgICAgZ3JvdXBUaXRsZU1hcFtncm91cFRpdGxlTWFwLmxlbmd0aCAtIDFdLml0ZW1zXG4gICAgICAgICAgICAgIC5wdXNoKHtuYW1lOiB0aXRsZS5uYW1lLCB2YWx1ZTogdGl0bGUudmFsdWV9KVxuICAgICAgICAgICAgaWYgKHRpdGxlLnZhbHVlID09PSB1bmRlZmluZWQgfHwgdGl0bGUudmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgaGFzRW1wdHlWYWx1ZSA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ3JvdXBUaXRsZU1hcC5wdXNoKHRpdGxlKVxuICAgICAgICAgIGlmICh0aXRsZS52YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHRpdGxlLnZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICBoYXNFbXB0eVZhbHVlID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ3JvdXBUaXRsZU1hcFxuICAgICAgfSwgW10pXG4gICAgfVxuICB9XG4gIGlmICghZmllbGRSZXF1aXJlZCAmJiAhaGFzRW1wdHlWYWx1ZSkge1xuICAgIG5ld1RpdGxlTWFwLnVuc2hpZnQoe25hbWU6ICc8ZW0+Tm9uZTwvZW0+JywgdmFsdWU6IG51bGx9KVxuICB9XG4gIHJldHVybiBuZXdUaXRsZU1hcFxufVxuIl19