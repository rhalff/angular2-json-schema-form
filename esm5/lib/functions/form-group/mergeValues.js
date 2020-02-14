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
import { isArray, isEmpty, isObject } from '../validator';
export function mergeValues() {
    var e_1, _a, e_2, _b, e_3, _c;
    var valuesToMerge = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        valuesToMerge[_i] = arguments[_i];
    }
    var mergedValues = null;
    try {
        for (var valuesToMerge_1 = __values(valuesToMerge), valuesToMerge_1_1 = valuesToMerge_1.next(); !valuesToMerge_1_1.done; valuesToMerge_1_1 = valuesToMerge_1.next()) {
            var currentValue = valuesToMerge_1_1.value;
            if (!isEmpty(currentValue)) {
                if (typeof currentValue === 'object' &&
                    (isEmpty(mergedValues) || typeof mergedValues !== 'object')) {
                    if (isArray(currentValue)) {
                        mergedValues = __spread(currentValue);
                    }
                    else if (isObject(currentValue)) {
                        mergedValues = __assign({}, currentValue);
                    }
                }
                else if (typeof currentValue !== 'object') {
                    mergedValues = currentValue;
                }
                else if (isObject(mergedValues) && isObject(currentValue)) {
                    Object.assign(mergedValues, currentValue);
                }
                else if (isObject(mergedValues) && isArray(currentValue)) {
                    var newValues = [];
                    try {
                        for (var currentValue_1 = (e_2 = void 0, __values(currentValue)), currentValue_1_1 = currentValue_1.next(); !currentValue_1_1.done; currentValue_1_1 = currentValue_1.next()) {
                            var value = currentValue_1_1.value;
                            newValues.push(mergeValues(mergedValues, value));
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (currentValue_1_1 && !currentValue_1_1.done && (_b = currentValue_1.return)) _b.call(currentValue_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    mergedValues = newValues;
                }
                else if (isArray(mergedValues) && isObject(currentValue)) {
                    var newValues = [];
                    try {
                        for (var mergedValues_1 = (e_3 = void 0, __values(mergedValues)), mergedValues_1_1 = mergedValues_1.next(); !mergedValues_1_1.done; mergedValues_1_1 = mergedValues_1.next()) {
                            var value = mergedValues_1_1.value;
                            newValues.push(mergeValues(value, currentValue));
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (mergedValues_1_1 && !mergedValues_1_1.done && (_c = mergedValues_1.return)) _c.call(mergedValues_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    mergedValues = newValues;
                }
                else if (isArray(mergedValues) && isArray(currentValue)) {
                    var newValues = [];
                    for (var i = 0; i < Math.max(mergedValues.length, currentValue.length); i++) {
                        if (i < mergedValues.length && i < currentValue.length) {
                            newValues.push(mergeValues(mergedValues[i], currentValue[i]));
                        }
                        else if (i < mergedValues.length) {
                            newValues.push(mergedValues[i]);
                        }
                        else if (i < currentValue.length) {
                            newValues.push(currentValue[i]);
                        }
                    }
                    mergedValues = newValues;
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (valuesToMerge_1_1 && !valuesToMerge_1_1.done && (_a = valuesToMerge_1.return)) _a.call(valuesToMerge_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return mergedValues;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VWYWx1ZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3NmLWNvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9mdW5jdGlvbnMvZm9ybS1ncm91cC9tZXJnZVZhbHVlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFRdkQsTUFBTSxVQUFVLFdBQVc7O0lBQUMsdUJBQXVCO1NBQXZCLFVBQXVCLEVBQXZCLHFCQUF1QixFQUF2QixJQUF1QjtRQUF2QixrQ0FBdUI7O0lBQ2pELElBQUksWUFBWSxHQUFRLElBQUksQ0FBQTs7UUFDNUIsS0FBMkIsSUFBQSxrQkFBQSxTQUFBLGFBQWEsQ0FBQSw0Q0FBQSx1RUFBRTtZQUFyQyxJQUFNLFlBQVksMEJBQUE7WUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDMUIsSUFBSSxPQUFPLFlBQVksS0FBSyxRQUFRO29CQUNsQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxPQUFPLFlBQVksS0FBSyxRQUFRLENBQUMsRUFDM0Q7b0JBQ0EsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7d0JBQ3pCLFlBQVksWUFBTyxZQUFZLENBQUMsQ0FBQTtxQkFDakM7eUJBQU0sSUFBSSxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7d0JBQ2pDLFlBQVksZ0JBQU8sWUFBWSxDQUFDLENBQUE7cUJBQ2pDO2lCQUNGO3FCQUFNLElBQUksT0FBTyxZQUFZLEtBQUssUUFBUSxFQUFFO29CQUMzQyxZQUFZLEdBQUcsWUFBWSxDQUFBO2lCQUM1QjtxQkFBTSxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7b0JBQzNELE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFBO2lCQUMxQztxQkFBTSxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7b0JBQzFELElBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQTs7d0JBQ3BCLEtBQW9CLElBQUEsZ0NBQUEsU0FBQSxZQUFZLENBQUEsQ0FBQSwwQ0FBQSxvRUFBRTs0QkFBN0IsSUFBTSxLQUFLLHlCQUFBOzRCQUNkLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFBO3lCQUNqRDs7Ozs7Ozs7O29CQUNELFlBQVksR0FBRyxTQUFTLENBQUE7aUJBQ3pCO3FCQUFNLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtvQkFDMUQsSUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFBOzt3QkFDcEIsS0FBb0IsSUFBQSxnQ0FBQSxTQUFBLFlBQVksQ0FBQSxDQUFBLDBDQUFBLG9FQUFFOzRCQUE3QixJQUFNLEtBQUsseUJBQUE7NEJBQ2QsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUE7eUJBQ2pEOzs7Ozs7Ozs7b0JBQ0QsWUFBWSxHQUFHLFNBQVMsQ0FBQTtpQkFDekI7cUJBQU0sSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFO29CQUN6RCxJQUFNLFNBQVMsR0FBRyxFQUFFLENBQUE7b0JBQ3BCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUMzRSxJQUFJLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFOzRCQUN0RCxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTt5QkFDOUQ7NkJBQU0sSUFBSSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRTs0QkFDbEMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTt5QkFDaEM7NkJBQU0sSUFBSSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRTs0QkFDbEMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTt5QkFDaEM7cUJBQ0Y7b0JBQ0QsWUFBWSxHQUFHLFNBQVMsQ0FBQTtpQkFDekI7YUFDRjtTQUNGOzs7Ozs7Ozs7SUFDRCxPQUFPLFlBQVksQ0FBQTtBQUNyQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc0FycmF5LCBpc0VtcHR5LCBpc09iamVjdH0gZnJvbSAnLi4vdmFsaWRhdG9yJ1xuXG4vKipcbiAqICdtZXJnZVZhbHVlcycgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0gIHZhbHVlc1RvTWVyZ2UgLSBNdWx0aXBsZSB2YWx1ZXMgdG8gbWVyZ2VcbiAqIEByZXR1cm4gTWVyZ2VkIHZhbHVlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VWYWx1ZXMoLi4udmFsdWVzVG9NZXJnZTogYW55W10pIHtcbiAgbGV0IG1lcmdlZFZhbHVlczogYW55ID0gbnVsbFxuICBmb3IgKGNvbnN0IGN1cnJlbnRWYWx1ZSBvZiB2YWx1ZXNUb01lcmdlKSB7XG4gICAgaWYgKCFpc0VtcHR5KGN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgIGlmICh0eXBlb2YgY3VycmVudFZhbHVlID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAoaXNFbXB0eShtZXJnZWRWYWx1ZXMpIHx8IHR5cGVvZiBtZXJnZWRWYWx1ZXMgIT09ICdvYmplY3QnKVxuICAgICAgKSB7XG4gICAgICAgIGlmIChpc0FycmF5KGN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgICAgICBtZXJnZWRWYWx1ZXMgPSBbLi4uY3VycmVudFZhbHVlXVxuICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KGN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgICAgICBtZXJnZWRWYWx1ZXMgPSB7Li4uY3VycmVudFZhbHVlfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjdXJyZW50VmFsdWUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIG1lcmdlZFZhbHVlcyA9IGN1cnJlbnRWYWx1ZVxuICAgICAgfSBlbHNlIGlmIChpc09iamVjdChtZXJnZWRWYWx1ZXMpICYmIGlzT2JqZWN0KGN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihtZXJnZWRWYWx1ZXMsIGN1cnJlbnRWYWx1ZSlcbiAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QobWVyZ2VkVmFsdWVzKSAmJiBpc0FycmF5KGN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWVzID0gW11cbiAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiBjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICBuZXdWYWx1ZXMucHVzaChtZXJnZVZhbHVlcyhtZXJnZWRWYWx1ZXMsIHZhbHVlKSlcbiAgICAgICAgfVxuICAgICAgICBtZXJnZWRWYWx1ZXMgPSBuZXdWYWx1ZXNcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShtZXJnZWRWYWx1ZXMpICYmIGlzT2JqZWN0KGN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWVzID0gW11cbiAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiBtZXJnZWRWYWx1ZXMpIHtcbiAgICAgICAgICBuZXdWYWx1ZXMucHVzaChtZXJnZVZhbHVlcyh2YWx1ZSwgY3VycmVudFZhbHVlKSlcbiAgICAgICAgfVxuICAgICAgICBtZXJnZWRWYWx1ZXMgPSBuZXdWYWx1ZXNcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShtZXJnZWRWYWx1ZXMpICYmIGlzQXJyYXkoY3VycmVudFZhbHVlKSkge1xuICAgICAgICBjb25zdCBuZXdWYWx1ZXMgPSBbXVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1hdGgubWF4KG1lcmdlZFZhbHVlcy5sZW5ndGgsIGN1cnJlbnRWYWx1ZS5sZW5ndGgpOyBpKyspIHtcbiAgICAgICAgICBpZiAoaSA8IG1lcmdlZFZhbHVlcy5sZW5ndGggJiYgaSA8IGN1cnJlbnRWYWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlcy5wdXNoKG1lcmdlVmFsdWVzKG1lcmdlZFZhbHVlc1tpXSwgY3VycmVudFZhbHVlW2ldKSlcbiAgICAgICAgICB9IGVsc2UgaWYgKGkgPCBtZXJnZWRWYWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBuZXdWYWx1ZXMucHVzaChtZXJnZWRWYWx1ZXNbaV0pXG4gICAgICAgICAgfSBlbHNlIGlmIChpIDwgY3VycmVudFZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgbmV3VmFsdWVzLnB1c2goY3VycmVudFZhbHVlW2ldKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBtZXJnZWRWYWx1ZXMgPSBuZXdWYWx1ZXNcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1lcmdlZFZhbHVlc1xufVxuIl19