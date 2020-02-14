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
import { isArray } from '../validator';
import { hasOwn } from '../utility';
export function getTitleMapFromOneOf(schema, flatList, validateOnly) {
    if (schema === void 0) { schema = {}; }
    if (flatList === void 0) { flatList = null; }
    if (validateOnly === void 0) { validateOnly = false; }
    var titleMap = null;
    var oneOf = schema.oneOf || schema.anyOf || null;
    if (isArray(oneOf) && oneOf.every(function (item) { return item.title; })) {
        if (oneOf.every(function (item) { return isArray(item.enum) && item.enum.length === 1; })) {
            if (validateOnly) {
                return true;
            }
            titleMap = oneOf.map(function (item) { return ({ name: item.title, value: item.enum[0] }); });
        }
        else if (oneOf.every(function (item) { return item.const; })) {
            if (validateOnly) {
                return true;
            }
            titleMap = oneOf.map(function (item) { return ({ name: item.title, value: item.const }); });
        }
        if (flatList !== false && (titleMap || [])
            .filter(function (title) { return ((title || {}).name || '').indexOf(': '); }).length > 1) {
            var newTitleMap_1 = titleMap.map(function (title) {
                var _a = __read(title.name.split(/: (.+)/), 2), group = _a[0], name = _a[1];
                return group && name ? __assign(__assign({}, title), { group: group, name: name }) : title;
            });
            if (flatList === true || newTitleMap_1.some(function (title, index) { return index &&
                hasOwn(title, 'group') && title.group === newTitleMap_1[index - 1].group; })) {
                titleMap = newTitleMap_1;
            }
        }
    }
    return validateOnly ? false : titleMap;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VGl0bGVNYXBGcm9tT25lT2YuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3NmLWNvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9mdW5jdGlvbnMvanNvbi1zY2hlbWEvZ2V0VGl0bGVNYXBGcm9tT25lT2YudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUNwQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sWUFBWSxDQUFBO0FBS2pDLE1BQU0sVUFBVSxvQkFBb0IsQ0FDbEMsTUFBZ0IsRUFDaEIsUUFBd0IsRUFDeEIsWUFBb0I7SUFGcEIsdUJBQUEsRUFBQSxXQUFnQjtJQUNoQix5QkFBQSxFQUFBLGVBQXdCO0lBQ3hCLDZCQUFBLEVBQUEsb0JBQW9CO0lBRXBCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQTtJQUNuQixJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFBO0lBQ2xELElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsS0FBSyxFQUFWLENBQVUsQ0FBQyxFQUFFO1FBQ3JELElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUE1QyxDQUE0QyxDQUFDLEVBQUU7WUFDckUsSUFBSSxZQUFZLEVBQUU7Z0JBQ2hCLE9BQU8sSUFBSSxDQUFBO2FBQ1o7WUFDRCxRQUFRLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQXpDLENBQXlDLENBQUMsQ0FBQTtTQUN4RTthQUFNLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxLQUFLLEVBQVYsQ0FBVSxDQUFDLEVBQUU7WUFDMUMsSUFBSSxZQUFZLEVBQUU7Z0JBQ2hCLE9BQU8sSUFBSSxDQUFBO2FBQ1o7WUFDRCxRQUFRLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLEVBQXZDLENBQXVDLENBQUMsQ0FBQTtTQUN0RTtRQUdELElBQUksUUFBUSxLQUFLLEtBQUssSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7YUFDdkMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUF4QyxDQUF3QyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDckU7WUFHQSxJQUFNLGFBQVcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSztnQkFDOUIsSUFBQSwwQ0FBMEMsRUFBekMsYUFBSyxFQUFFLFlBQWtDLENBQUE7Z0JBQ2hELE9BQU8sS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLHVCQUFLLEtBQUssS0FBRSxLQUFLLE9BQUEsRUFBRSxJQUFJLE1BQUEsSUFBRSxDQUFDLENBQUMsS0FBSyxDQUFBO1lBQ3hELENBQUMsQ0FBQyxDQUFBO1lBR0YsSUFBSSxRQUFRLEtBQUssSUFBSSxJQUFJLGFBQVcsQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFLLEVBQUUsS0FBSyxJQUFLLE9BQUEsS0FBSztnQkFDL0QsTUFBTSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLGFBQVcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQURaLENBQ1ksQ0FDdkUsRUFBRTtnQkFDRCxRQUFRLEdBQUcsYUFBVyxDQUFBO2FBQ3ZCO1NBQ0Y7S0FDRjtJQUNELE9BQU8sWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQTtBQUN4QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc0FycmF5fSBmcm9tICcuLi92YWxpZGF0b3InXG5pbXBvcnQge2hhc093bn0gZnJvbSAnLi4vdXRpbGl0eSdcblxuLyoqXG4gKiAnZ2V0VGl0bGVNYXBGcm9tT25lT2YnIGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUaXRsZU1hcEZyb21PbmVPZihcbiAgc2NoZW1hOiBhbnkgPSB7fSxcbiAgZmxhdExpc3Q6IGJvb2xlYW4gPSBudWxsLFxuICB2YWxpZGF0ZU9ubHkgPSBmYWxzZVxuKSB7XG4gIGxldCB0aXRsZU1hcCA9IG51bGxcbiAgY29uc3Qgb25lT2YgPSBzY2hlbWEub25lT2YgfHwgc2NoZW1hLmFueU9mIHx8IG51bGxcbiAgaWYgKGlzQXJyYXkob25lT2YpICYmIG9uZU9mLmV2ZXJ5KGl0ZW0gPT4gaXRlbS50aXRsZSkpIHtcbiAgICBpZiAob25lT2YuZXZlcnkoaXRlbSA9PiBpc0FycmF5KGl0ZW0uZW51bSkgJiYgaXRlbS5lbnVtLmxlbmd0aCA9PT0gMSkpIHtcbiAgICAgIGlmICh2YWxpZGF0ZU9ubHkpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICAgIHRpdGxlTWFwID0gb25lT2YubWFwKGl0ZW0gPT4gKHtuYW1lOiBpdGVtLnRpdGxlLCB2YWx1ZTogaXRlbS5lbnVtWzBdfSkpXG4gICAgfSBlbHNlIGlmIChvbmVPZi5ldmVyeShpdGVtID0+IGl0ZW0uY29uc3QpKSB7XG4gICAgICBpZiAodmFsaWRhdGVPbmx5KSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICB0aXRsZU1hcCA9IG9uZU9mLm1hcChpdGVtID0+ICh7bmFtZTogaXRlbS50aXRsZSwgdmFsdWU6IGl0ZW0uY29uc3R9KSlcbiAgICB9XG5cbiAgICAvLyBpZiBmbGF0TGlzdCAhPT0gZmFsc2UgYW5kIHNvbWUgaXRlbXMgaGF2ZSBjb2xvbnMsIG1ha2UgZ3JvdXBlZCBtYXBcbiAgICBpZiAoZmxhdExpc3QgIT09IGZhbHNlICYmICh0aXRsZU1hcCB8fCBbXSlcbiAgICAgIC5maWx0ZXIodGl0bGUgPT4gKCh0aXRsZSB8fCB7fSkubmFtZSB8fCAnJykuaW5kZXhPZignOiAnKSkubGVuZ3RoID4gMVxuICAgICkge1xuXG4gICAgICAvLyBTcGxpdCBuYW1lIG9uIGZpcnN0IGNvbG9uIHRvIGNyZWF0ZSBncm91cGVkIG1hcCAobmFtZSAtPiBncm91cDogbmFtZSlcbiAgICAgIGNvbnN0IG5ld1RpdGxlTWFwID0gdGl0bGVNYXAubWFwKHRpdGxlID0+IHtcbiAgICAgICAgY29uc3QgW2dyb3VwLCBuYW1lXSA9IHRpdGxlLm5hbWUuc3BsaXQoLzogKC4rKS8pXG4gICAgICAgIHJldHVybiBncm91cCAmJiBuYW1lID8gey4uLnRpdGxlLCBncm91cCwgbmFtZX0gOiB0aXRsZVxuICAgICAgfSlcblxuICAgICAgLy8gSWYgZmxhdExpc3QgPT09IHRydWUgb3IgYXQgbGVhc3Qgb25lIGdyb3VwIGhhcyBtdWx0aXBsZSBpdGVtcywgdXNlIGdyb3VwZWQgbWFwXG4gICAgICBpZiAoZmxhdExpc3QgPT09IHRydWUgfHwgbmV3VGl0bGVNYXAuc29tZSgodGl0bGUsIGluZGV4KSA9PiBpbmRleCAmJlxuICAgICAgICBoYXNPd24odGl0bGUsICdncm91cCcpICYmIHRpdGxlLmdyb3VwID09PSBuZXdUaXRsZU1hcFtpbmRleCAtIDFdLmdyb3VwXG4gICAgICApKSB7XG4gICAgICAgIHRpdGxlTWFwID0gbmV3VGl0bGVNYXBcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZhbGlkYXRlT25seSA/IGZhbHNlIDogdGl0bGVNYXBcbn1cbiJdfQ==