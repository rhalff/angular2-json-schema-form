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
import { Component, Input } from '@angular/core';
import { buildTitleMap } from '../functions/buildTitleMap';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
var CheckboxesComponent = (function () {
    function CheckboxesComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.checkboxList = [];
    }
    CheckboxesComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.layoutOrientation = (this.layoutNode.type === 'checkboxes-inline' ||
            this.layoutNode.type === 'checkboxbuttons') ? 'horizontal' : 'vertical';
        this.jsf.initializeControl(this);
        this.checkboxList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
        if (this.boundControl) {
            var formArray_1 = this.jsf.getFormControl(this);
            this.checkboxList.forEach((function (checkboxItem) {
                return checkboxItem.checked = formArray_1.value.includes(checkboxItem.value);
            }));
        }
    };
    CheckboxesComponent.prototype.updateValue = function (event) {
        var e_1, _a;
        try {
            for (var _b = __values(this.checkboxList), _c = _b.next(); !_c.done; _c = _b.next()) {
                var checkboxItem = _c.value;
                if (event.target.value === checkboxItem.value) {
                    checkboxItem.checked = event.target.checked;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (this.boundControl) {
            this.jsf.updateArrayCheckboxList(this, this.checkboxList);
        }
    };
    CheckboxesComponent.decorators = [
        { type: Component, args: [{
                    selector: 'checkboxes-widget',
                    template: "\n      <label *ngIf=\"options?.title\"\n             [class]=\"options?.labelHtmlClass || ''\"\n             [style.display]=\"options?.notitle ? 'none' : ''\"\n             [innerHTML]=\"options?.title\"></label>\n\n      <!-- 'horizontal' = checkboxes-inline or checkboxbuttons -->\n      <div *ngIf=\"layoutOrientation === 'horizontal'\" [class]=\"options?.htmlClass || ''\">\n          <label *ngFor=\"let checkboxItem of checkboxList\"\n                 [attr.for]=\"'control' + layoutNode?._id + '/' + checkboxItem.value\"\n                 [class]=\"(options?.itemLabelHtmlClass || '') + (checkboxItem.checked ?\n          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :\n          (' ' + (options?.style?.unselected || '')))\">\n              <input type=\"checkbox\"\n                     [attr.required]=\"options?.required\"\n                     [checked]=\"checkboxItem.checked\"\n                     [class]=\"options?.fieldHtmlClass || ''\"\n                     [disabled]=\"controlDisabled\"\n                     [id]=\"'control' + layoutNode?._id + '/' + checkboxItem.value\"\n                     [name]=\"checkboxItem?.name\"\n                     [readonly]=\"options?.readonly ? 'readonly' : null\"\n                     [value]=\"checkboxItem.value\"\n                     (change)=\"updateValue($event)\">\n              <span [innerHTML]=\"checkboxItem.name\"></span>\n          </label>\n      </div>\n\n      <!-- 'vertical' = regular checkboxes -->\n      <div *ngIf=\"layoutOrientation === 'vertical'\">\n          <div *ngFor=\"let checkboxItem of checkboxList\" [class]=\"options?.htmlClass || ''\">\n              <label\n                      [attr.for]=\"'control' + layoutNode?._id + '/' + checkboxItem.value\"\n                      [class]=\"(options?.itemLabelHtmlClass || '') + (checkboxItem.checked ?\n            (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :\n            (' ' + (options?.style?.unselected || '')))\">\n                  <input type=\"checkbox\"\n                         [attr.required]=\"options?.required\"\n                         [checked]=\"checkboxItem.checked\"\n                         [class]=\"options?.fieldHtmlClass || ''\"\n                         [disabled]=\"controlDisabled\"\n                         [id]=\"options?.name + '/' + checkboxItem.value\"\n                         [name]=\"checkboxItem?.name\"\n                         [readonly]=\"options?.readonly ? 'readonly' : null\"\n                         [value]=\"checkboxItem.value\"\n                         (change)=\"updateValue($event)\">\n                  <span [innerHTML]=\"checkboxItem?.name\"></span>\n              </label>\n          </div>\n      </div>"
                }] }
    ];
    CheckboxesComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    CheckboxesComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return CheckboxesComponent;
}());
export { CheckboxesComponent };
if (false) {
    CheckboxesComponent.prototype.formControl;
    CheckboxesComponent.prototype.controlName;
    CheckboxesComponent.prototype.controlValue;
    CheckboxesComponent.prototype.controlDisabled;
    CheckboxesComponent.prototype.boundControl;
    CheckboxesComponent.prototype.options;
    CheckboxesComponent.prototype.layoutOrientation;
    CheckboxesComponent.prototype.formArray;
    CheckboxesComponent.prototype.checkboxList;
    CheckboxesComponent.prototype.layoutNode;
    CheckboxesComponent.prototype.layoutIndex;
    CheckboxesComponent.prototype.dataIndex;
    CheckboxesComponent.prototype.jsf;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3hlcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdzZi93aWRnZXQtbGlicmFyeS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2NoZWNrYm94ZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUE7QUFFdEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDRCQUE0QixDQUFBO0FBQ3hELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFBO0FBRzFFO0lBa0VFLDZCQUNVLEdBQTBCO1FBQTFCLFFBQUcsR0FBSCxHQUFHLENBQXVCO1FBWHBDLG9CQUFlLEdBQUcsS0FBSyxDQUFBO1FBQ3ZCLGlCQUFZLEdBQUcsS0FBSyxDQUFBO1FBSXBCLGlCQUFZLEdBQW1CLEVBQUUsQ0FBQTtJQVFqQyxDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFBO1FBQzVDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLG1CQUFtQjtZQUNwRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQTtRQUN6RSxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQ3pFLENBQUE7UUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ2YsV0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztZQUMvQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBQyxVQUFBLFlBQVk7Z0JBQ3BDLE9BQUEsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBQW5FLENBQW1FLEVBQ3BFLENBQUE7U0FDRjtJQUNILENBQUM7SUFFRCx5Q0FBVyxHQUFYLFVBQVksS0FBSzs7O1lBQ2YsS0FBMkIsSUFBQSxLQUFBLFNBQUEsSUFBSSxDQUFDLFlBQVksQ0FBQSxnQkFBQSw0QkFBRTtnQkFBekMsSUFBTSxZQUFZLFdBQUE7Z0JBQ3JCLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssWUFBWSxDQUFDLEtBQUssRUFBRTtvQkFDN0MsWUFBWSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQTtpQkFDNUM7YUFDRjs7Ozs7Ozs7O1FBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtTQUMxRDtJQUNILENBQUM7O2dCQWhHRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLHd0RkFnREM7aUJBQ1o7OztnQkF0RE8scUJBQXFCOzs7NkJBaUUxQixLQUFLOzhCQUNMLEtBQUs7NEJBQ0wsS0FBSzs7SUFpQ1IsMEJBQUM7Q0FBQSxBQWpHRCxJQWlHQztTQTdDWSxtQkFBbUI7O0lBQzlCLDBDQUE0QjtJQUM1QiwwQ0FBbUI7SUFDbkIsMkNBQWlCO0lBQ2pCLDhDQUF1QjtJQUN2QiwyQ0FBb0I7SUFDcEIsc0NBQVk7SUFDWixnREFBeUI7SUFDekIsd0NBQTBCO0lBQzFCLDJDQUFpQztJQUNqQyx5Q0FBd0I7SUFDeEIsMENBQThCO0lBQzlCLHdDQUE0QjtJQUcxQixrQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3JtcydcbmltcG9ydCB7YnVpbGRUaXRsZU1hcH0gZnJvbSAnLi4vZnVuY3Rpb25zL2J1aWxkVGl0bGVNYXAnXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJ1xuaW1wb3J0IHtUaXRsZU1hcEl0ZW19IGZyb20gJy4uL2ludGVyZmFjZXMvdGl0bGUtbWFwLWl0ZW0nXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NoZWNrYm94ZXMtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxsYWJlbCAqbmdJZj1cIm9wdGlvbnM/LnRpdGxlXCJcbiAgICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8ubGFiZWxIdG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cIm9wdGlvbnM/Lm5vdGl0bGUgPyAnbm9uZScgOiAnJ1wiXG4gICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy50aXRsZVwiPjwvbGFiZWw+XG5cbiAgICAgIDwhLS0gJ2hvcml6b250YWwnID0gY2hlY2tib3hlcy1pbmxpbmUgb3IgY2hlY2tib3hidXR0b25zIC0tPlxuICAgICAgPGRpdiAqbmdJZj1cImxheW91dE9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCdcIiBbY2xhc3NdPVwib3B0aW9ucz8uaHRtbENsYXNzIHx8ICcnXCI+XG4gICAgICAgICAgPGxhYmVsICpuZ0Zvcj1cImxldCBjaGVja2JveEl0ZW0gb2YgY2hlY2tib3hMaXN0XCJcbiAgICAgICAgICAgICAgICAgW2F0dHIuZm9yXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICcvJyArIGNoZWNrYm94SXRlbS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgIFtjbGFzc109XCIob3B0aW9ucz8uaXRlbUxhYmVsSHRtbENsYXNzIHx8ICcnKSArIChjaGVja2JveEl0ZW0uY2hlY2tlZCA/XG4gICAgICAgICAgKCcgJyArIChvcHRpb25zPy5hY3RpdmVDbGFzcyB8fCAnJykgKyAnICcgKyAob3B0aW9ucz8uc3R5bGU/LnNlbGVjdGVkIHx8ICcnKSkgOlxuICAgICAgICAgICgnICcgKyAob3B0aW9ucz8uc3R5bGU/LnVuc2VsZWN0ZWQgfHwgJycpKSlcIj5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgICBbYXR0ci5yZXF1aXJlZF09XCJvcHRpb25zPy5yZXF1aXJlZFwiXG4gICAgICAgICAgICAgICAgICAgICBbY2hlY2tlZF09XCJjaGVja2JveEl0ZW0uY2hlY2tlZFwiXG4gICAgICAgICAgICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8uZmllbGRIdG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImNvbnRyb2xEaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgICBbaWRdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJy8nICsgY2hlY2tib3hJdGVtLnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgIFtuYW1lXT1cImNoZWNrYm94SXRlbT8ubmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICBbcmVhZG9ubHldPVwib3B0aW9ucz8ucmVhZG9ubHkgPyAncmVhZG9ubHknIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwiY2hlY2tib3hJdGVtLnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgIChjaGFuZ2UpPVwidXBkYXRlVmFsdWUoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cImNoZWNrYm94SXRlbS5uYW1lXCI+PC9zcGFuPlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPCEtLSAndmVydGljYWwnID0gcmVndWxhciBjaGVja2JveGVzIC0tPlxuICAgICAgPGRpdiAqbmdJZj1cImxheW91dE9yaWVudGF0aW9uID09PSAndmVydGljYWwnXCI+XG4gICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgY2hlY2tib3hJdGVtIG9mIGNoZWNrYm94TGlzdFwiIFtjbGFzc109XCJvcHRpb25zPy5odG1sQ2xhc3MgfHwgJydcIj5cbiAgICAgICAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZm9yXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICcvJyArIGNoZWNrYm94SXRlbS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cIihvcHRpb25zPy5pdGVtTGFiZWxIdG1sQ2xhc3MgfHwgJycpICsgKGNoZWNrYm94SXRlbS5jaGVja2VkID9cbiAgICAgICAgICAgICgnICcgKyAob3B0aW9ucz8uYWN0aXZlQ2xhc3MgfHwgJycpICsgJyAnICsgKG9wdGlvbnM/LnN0eWxlPy5zZWxlY3RlZCB8fCAnJykpIDpcbiAgICAgICAgICAgICgnICcgKyAob3B0aW9ucz8uc3R5bGU/LnVuc2VsZWN0ZWQgfHwgJycpKSlcIj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnJlcXVpcmVkXT1cIm9wdGlvbnM/LnJlcXVpcmVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbY2hlY2tlZF09XCJjaGVja2JveEl0ZW0uY2hlY2tlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmZpZWxkSHRtbENsYXNzIHx8ICcnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbERpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwib3B0aW9ucz8ubmFtZSArICcvJyArIGNoZWNrYm94SXRlbS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgW25hbWVdPVwiY2hlY2tib3hJdGVtPy5uYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbcmVhZG9ubHldPVwib3B0aW9ucz8ucmVhZG9ubHkgPyAncmVhZG9ubHknIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cImNoZWNrYm94SXRlbS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJ1cGRhdGVWYWx1ZSgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cImNoZWNrYm94SXRlbT8ubmFtZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PmAsXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrYm94ZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sXG4gIGNvbnRyb2xOYW1lOiBzdHJpbmdcbiAgY29udHJvbFZhbHVlOiBhbnlcbiAgY29udHJvbERpc2FibGVkID0gZmFsc2VcbiAgYm91bmRDb250cm9sID0gZmFsc2VcbiAgb3B0aW9uczogYW55XG4gIGxheW91dE9yaWVudGF0aW9uOiBzdHJpbmdcbiAgZm9ybUFycmF5OiBBYnN0cmFjdENvbnRyb2xcbiAgY2hlY2tib3hMaXN0OiBUaXRsZU1hcEl0ZW1bXSA9IFtdXG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmxheW91dE5vZGUub3B0aW9ucyB8fCB7fVxuICAgIHRoaXMubGF5b3V0T3JpZW50YXRpb24gPSAodGhpcy5sYXlvdXROb2RlLnR5cGUgPT09ICdjaGVja2JveGVzLWlubGluZScgfHxcbiAgICAgIHRoaXMubGF5b3V0Tm9kZS50eXBlID09PSAnY2hlY2tib3hidXR0b25zJykgPyAnaG9yaXpvbnRhbCcgOiAndmVydGljYWwnXG4gICAgdGhpcy5qc2YuaW5pdGlhbGl6ZUNvbnRyb2wodGhpcylcbiAgICB0aGlzLmNoZWNrYm94TGlzdCA9IGJ1aWxkVGl0bGVNYXAoXG4gICAgICB0aGlzLm9wdGlvbnMudGl0bGVNYXAgfHwgdGhpcy5vcHRpb25zLmVudW1OYW1lcywgdGhpcy5vcHRpb25zLmVudW0sIHRydWVcbiAgICApXG4gICAgaWYgKHRoaXMuYm91bmRDb250cm9sKSB7XG4gICAgICBjb25zdCBmb3JtQXJyYXkgPSB0aGlzLmpzZi5nZXRGb3JtQ29udHJvbCh0aGlzKVxuICAgICAgdGhpcy5jaGVja2JveExpc3QuZm9yRWFjaChjaGVja2JveEl0ZW0gPT5cbiAgICAgICAgY2hlY2tib3hJdGVtLmNoZWNrZWQgPSBmb3JtQXJyYXkudmFsdWUuaW5jbHVkZXMoY2hlY2tib3hJdGVtLnZhbHVlKVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKGV2ZW50KSB7XG4gICAgZm9yIChjb25zdCBjaGVja2JveEl0ZW0gb2YgdGhpcy5jaGVja2JveExpc3QpIHtcbiAgICAgIGlmIChldmVudC50YXJnZXQudmFsdWUgPT09IGNoZWNrYm94SXRlbS52YWx1ZSkge1xuICAgICAgICBjaGVja2JveEl0ZW0uY2hlY2tlZCA9IGV2ZW50LnRhcmdldC5jaGVja2VkXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmJvdW5kQ29udHJvbCkge1xuICAgICAgdGhpcy5qc2YudXBkYXRlQXJyYXlDaGVja2JveExpc3QodGhpcywgdGhpcy5jaGVja2JveExpc3QpXG4gICAgfVxuICB9XG59XG4iXX0=