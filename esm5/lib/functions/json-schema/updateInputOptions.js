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
import { hasValue, isObject } from '../validator';
import { hasOwn, mergeFilteredObject } from '../utility';
import { JsonPointer } from '../jsonpointer.functions';
import { getTitleMapFromOneOf } from './getTitleMapFromOneOf';
export function updateInputOptions(layoutNode, schema, jsf) {
    if (!isObject(layoutNode) || !isObject(layoutNode.options)) {
        return;
    }
    var newOptions = {};
    var fixUiKeys = function (key) { return key.slice(0, 3).toLowerCase() === 'ui:' ? key.slice(3) : key; };
    mergeFilteredObject(newOptions, jsf.formOptions.defautWidgetOptions, [], fixUiKeys);
    [[JsonPointer.get(schema, '/ui:widget/options'), []],
        [JsonPointer.get(schema, '/ui:widget'), []],
        [schema, [
                'additionalProperties', 'additionalItems', 'properties', 'items',
                'required', 'type', 'x-schema-form', '$ref'
            ]],
        [JsonPointer.get(schema, '/x-schema-form/options'), []],
        [JsonPointer.get(schema, '/x-schema-form'), ['items', 'options']],
        [layoutNode, [
                '_id', '$ref', 'arrayItem', 'arrayItemType', 'dataPointer', 'dataType',
                'items', 'key', 'name', 'options', 'recursiveReference', 'type', 'widget'
            ]],
        [layoutNode.options, []],
    ].forEach(function (_a) {
        var _b = __read(_a, 2), object = _b[0], excludeKeys = _b[1];
        return mergeFilteredObject(newOptions, object, excludeKeys, fixUiKeys);
    });
    if (!hasOwn(newOptions, 'titleMap')) {
        var newTitleMap = null;
        newTitleMap = getTitleMapFromOneOf(schema, newOptions.flatList);
        if (newTitleMap) {
            newOptions.titleMap = newTitleMap;
        }
        if (!hasOwn(newOptions, 'titleMap') && !hasOwn(newOptions, 'enum') && hasOwn(schema, 'items')) {
            if (JsonPointer.has(schema, '/items/titleMap')) {
                newOptions.titleMap = schema.items.titleMap;
            }
            else if (JsonPointer.has(schema, '/items/enum')) {
                newOptions.enum = schema.items.enum;
                if (!hasOwn(newOptions, 'enumNames') && JsonPointer.has(schema, '/items/enumNames')) {
                    newOptions.enumNames = schema.items.enumNames;
                }
            }
            else if (JsonPointer.has(schema, '/items/oneOf')) {
                newTitleMap = getTitleMapFromOneOf(schema.items, newOptions.flatList);
                if (newTitleMap) {
                    newOptions.titleMap = newTitleMap;
                }
            }
        }
    }
    if (schema.type === 'integer' && !hasValue(newOptions.multipleOf)) {
        newOptions.multipleOf = 1;
    }
    if (JsonPointer.has(newOptions, '/autocomplete/source')) {
        newOptions.typeahead = newOptions.autocomplete;
    }
    else if (JsonPointer.has(newOptions, '/tagsinput/source')) {
        newOptions.typeahead = newOptions.tagsinput;
    }
    else if (JsonPointer.has(newOptions, '/tagsinput/typeahead/source')) {
        newOptions.typeahead = newOptions.tagsinput.typeahead;
    }
    layoutNode.options = newOptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlSW5wdXRPcHRpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdzZi1jb21tb24vIiwic291cmNlcyI6WyJsaWIvZnVuY3Rpb25zL2pzb24tc2NoZW1hL3VwZGF0ZUlucHV0T3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFDL0MsT0FBTyxFQUFDLE1BQU0sRUFBRSxtQkFBbUIsRUFBQyxNQUFNLFlBQVksQ0FBQTtBQUN0RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sMEJBQTBCLENBQUE7QUFDcEQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sd0JBQXdCLENBQUE7QUFLM0QsTUFBTSxVQUFVLGtCQUFrQixDQUNoQyxVQUFlLEVBQ2YsTUFBVyxFQUNYLEdBQVE7SUFFUixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUMxRCxPQUFNO0tBQ1A7SUFHRCxJQUFNLFVBQVUsR0FBUSxFQUFFLENBQUE7SUFDMUIsSUFBTSxTQUFTLEdBQUcsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBNUQsQ0FBNEQsQ0FBQTtJQUNyRixtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDcEYsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLG9CQUFvQixDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ2xE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c0JBQXNCLENBQUMsRUFBRTtRQUN2RCxVQUFVLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUE7S0FDL0M7U0FBTSxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLG1CQUFtQixDQUFDLEVBQUU7UUFDM0QsVUFBVSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFBO0tBQzVDO1NBQU0sSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSw2QkFBNkIsQ0FBQyxFQUFFO1FBQ3JFLFVBQVUsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUE7S0FDdEQ7SUFFRCxVQUFVLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQTtBQUNqQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtoYXNWYWx1ZSwgaXNPYmplY3R9IGZyb20gJy4uL3ZhbGlkYXRvcidcbmltcG9ydCB7aGFzT3duLCBtZXJnZUZpbHRlcmVkT2JqZWN0fSBmcm9tICcuLi91dGlsaXR5J1xuaW1wb3J0IHtKc29uUG9pbnRlcn0gZnJvbSAnLi4vanNvbnBvaW50ZXIuZnVuY3Rpb25zJ1xuaW1wb3J0IHtnZXRUaXRsZU1hcEZyb21PbmVPZn0gZnJvbSAnLi9nZXRUaXRsZU1hcEZyb21PbmVPZidcblxuLyoqXG4gKiAndXBkYXRlSW5wdXRPcHRpb25zJyBmdW5jdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlSW5wdXRPcHRpb25zKFxuICBsYXlvdXROb2RlOiBhbnksXG4gIHNjaGVtYTogYW55LFxuICBqc2Y6IGFueVxuKTogdm9pZCB7XG4gIGlmICghaXNPYmplY3QobGF5b3V0Tm9kZSkgfHwgIWlzT2JqZWN0KGxheW91dE5vZGUub3B0aW9ucykpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIC8vIFNldCBhbGwgb3B0aW9uIHZhbHVlcyBpbiBsYXlvdXROb2RlLm9wdGlvbnNcbiAgY29uc3QgbmV3T3B0aW9uczogYW55ID0ge31cbiAgY29uc3QgZml4VWlLZXlzID0ga2V5ID0+IGtleS5zbGljZSgwLCAzKS50b0xvd2VyQ2FzZSgpID09PSAndWk6JyA/IGtleS5zbGljZSgzKSA6IGtleVxuICBtZXJnZUZpbHRlcmVkT2JqZWN0KG5ld09wdGlvbnMsIGpzZi5mb3JtT3B0aW9ucy5kZWZhdXRXaWRnZXRPcHRpb25zLCBbXSwgZml4VWlLZXlzKTtcbiAgW1tKc29uUG9pbnRlci5nZXQoc2NoZW1hLCAnL3VpOndpZGdldC9vcHRpb25zJyksIFtdXSxcbiAgICBbSnNvblBvaW50ZXIuZ2V0KHNjaGVtYSwgJy91aTp3aWRnZXQnKSwgW11dLFxuICAgIFtzY2hlbWEsIFtcbiAgICAgICdhZGRpdGlvbmFsUHJvcGVydGllcycsICdhZGRpdGlvbmFsSXRlbXMnLCAncHJvcGVydGllcycsICdpdGVtcycsXG4gICAgICAncmVxdWlyZWQnLCAndHlwZScsICd4LXNjaGVtYS1mb3JtJywgJyRyZWYnXG4gICAgXV0sXG4gICAgW0pzb25Qb2ludGVyLmdldChzY2hlbWEsICcveC1zY2hlbWEtZm9ybS9vcHRpb25zJyksIFtdXSxcbiAgICBbSnNvblBvaW50ZXIuZ2V0KHNjaGVtYSwgJy94LXNjaGVtYS1mb3JtJyksIFsnaXRlbXMnLCAnb3B0aW9ucyddXSxcbiAgICBbbGF5b3V0Tm9kZSwgW1xuICAgICAgJ19pZCcsICckcmVmJywgJ2FycmF5SXRlbScsICdhcnJheUl0ZW1UeXBlJywgJ2RhdGFQb2ludGVyJywgJ2RhdGFUeXBlJyxcbiAgICAgICdpdGVtcycsICdrZXknLCAnbmFtZScsICdvcHRpb25zJywgJ3JlY3Vyc2l2ZVJlZmVyZW5jZScsICd0eXBlJywgJ3dpZGdldCdcbiAgICBdXSxcbiAgICBbbGF5b3V0Tm9kZS5vcHRpb25zLCBbXV0sXG4gIF0uZm9yRWFjaCgoW29iamVjdCwgZXhjbHVkZUtleXNdKSA9PlxuICAgIG1lcmdlRmlsdGVyZWRPYmplY3QobmV3T3B0aW9ucywgb2JqZWN0LCBleGNsdWRlS2V5cywgZml4VWlLZXlzKVxuICApXG4gIGlmICghaGFzT3duKG5ld09wdGlvbnMsICd0aXRsZU1hcCcpKSB7XG4gICAgbGV0IG5ld1RpdGxlTWFwOiBhbnkgPSBudWxsXG4gICAgbmV3VGl0bGVNYXAgPSBnZXRUaXRsZU1hcEZyb21PbmVPZihzY2hlbWEsIG5ld09wdGlvbnMuZmxhdExpc3QpXG4gICAgaWYgKG5ld1RpdGxlTWFwKSB7XG4gICAgICBuZXdPcHRpb25zLnRpdGxlTWFwID0gbmV3VGl0bGVNYXBcbiAgICB9XG4gICAgaWYgKCFoYXNPd24obmV3T3B0aW9ucywgJ3RpdGxlTWFwJykgJiYgIWhhc093bihuZXdPcHRpb25zLCAnZW51bScpICYmIGhhc093bihzY2hlbWEsICdpdGVtcycpKSB7XG4gICAgICBpZiAoSnNvblBvaW50ZXIuaGFzKHNjaGVtYSwgJy9pdGVtcy90aXRsZU1hcCcpKSB7XG4gICAgICAgIG5ld09wdGlvbnMudGl0bGVNYXAgPSBzY2hlbWEuaXRlbXMudGl0bGVNYXBcbiAgICAgIH0gZWxzZSBpZiAoSnNvblBvaW50ZXIuaGFzKHNjaGVtYSwgJy9pdGVtcy9lbnVtJykpIHtcbiAgICAgICAgbmV3T3B0aW9ucy5lbnVtID0gc2NoZW1hLml0ZW1zLmVudW1cbiAgICAgICAgaWYgKCFoYXNPd24obmV3T3B0aW9ucywgJ2VudW1OYW1lcycpICYmIEpzb25Qb2ludGVyLmhhcyhzY2hlbWEsICcvaXRlbXMvZW51bU5hbWVzJykpIHtcbiAgICAgICAgICBuZXdPcHRpb25zLmVudW1OYW1lcyA9IHNjaGVtYS5pdGVtcy5lbnVtTmFtZXNcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChKc29uUG9pbnRlci5oYXMoc2NoZW1hLCAnL2l0ZW1zL29uZU9mJykpIHtcbiAgICAgICAgbmV3VGl0bGVNYXAgPSBnZXRUaXRsZU1hcEZyb21PbmVPZihzY2hlbWEuaXRlbXMsIG5ld09wdGlvbnMuZmxhdExpc3QpXG4gICAgICAgIGlmIChuZXdUaXRsZU1hcCkge1xuICAgICAgICAgIG5ld09wdGlvbnMudGl0bGVNYXAgPSBuZXdUaXRsZU1hcFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gSWYgc2NoZW1hIHR5cGUgaXMgaW50ZWdlciwgZW5mb3JjZSBieSBzZXR0aW5nIG11bHRpcGxlT2YgPSAxXG4gIGlmIChzY2hlbWEudHlwZSA9PT0gJ2ludGVnZXInICYmICFoYXNWYWx1ZShuZXdPcHRpb25zLm11bHRpcGxlT2YpKSB7XG4gICAgbmV3T3B0aW9ucy5tdWx0aXBsZU9mID0gMVxuICB9XG5cbiAgLy8gQ29weSBhbnkgdHlwZWFoZWFkIHdvcmQgbGlzdHMgdG8gb3B0aW9ucy50eXBlYWhlYWQuc291cmNlXG4gIGlmIChKc29uUG9pbnRlci5oYXMobmV3T3B0aW9ucywgJy9hdXRvY29tcGxldGUvc291cmNlJykpIHtcbiAgICBuZXdPcHRpb25zLnR5cGVhaGVhZCA9IG5ld09wdGlvbnMuYXV0b2NvbXBsZXRlXG4gIH0gZWxzZSBpZiAoSnNvblBvaW50ZXIuaGFzKG5ld09wdGlvbnMsICcvdGFnc2lucHV0L3NvdXJjZScpKSB7XG4gICAgbmV3T3B0aW9ucy50eXBlYWhlYWQgPSBuZXdPcHRpb25zLnRhZ3NpbnB1dFxuICB9IGVsc2UgaWYgKEpzb25Qb2ludGVyLmhhcyhuZXdPcHRpb25zLCAnL3RhZ3NpbnB1dC90eXBlYWhlYWQvc291cmNlJykpIHtcbiAgICBuZXdPcHRpb25zLnR5cGVhaGVhZCA9IG5ld09wdGlvbnMudGFnc2lucHV0LnR5cGVhaGVhZFxuICB9XG5cbiAgbGF5b3V0Tm9kZS5vcHRpb25zID0gbmV3T3B0aW9uc1xufVxuIl19