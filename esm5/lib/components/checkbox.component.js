import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
var CheckboxComponent = (function () {
    function CheckboxComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.trueValue = true;
        this.falseValue = false;
    }
    Object.defineProperty(CheckboxComponent.prototype, "isChecked", {
        get: function () {
            return this.jsf.getFormControlValue(this) === this.trueValue;
        },
        enumerable: true,
        configurable: true
    });
    CheckboxComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (this.controlValue === null || this.controlValue === undefined) {
            this.controlValue = this.options.title;
        }
    };
    CheckboxComponent.prototype.updateValue = function (event) {
        event.preventDefault();
        this.jsf.updateValue(this, event.target.checked ? this.trueValue : this.falseValue);
    };
    CheckboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'checkbox-widget',
                    template: "\n      <label\n              [attr.for]=\"'control' + layoutNode?._id\"\n              [class]=\"options?.itemLabelHtmlClass || ''\">\n          <input *ngIf=\"boundControl\"\n                 [formControl]=\"formControl\"\n                 [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                 [class]=\"(options?.fieldHtmlClass || '') + (isChecked ?\n          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :\n          (' ' + (options?.style?.unselected || '')))\"\n                 [id]=\"'control' + layoutNode?._id\"\n                 [name]=\"controlName\"\n                 [readonly]=\"options?.readonly ? 'readonly' : null\"\n                 type=\"checkbox\">\n          <input *ngIf=\"!boundControl\"\n                 [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                 [checked]=\"isChecked ? 'checked' : null\"\n                 [class]=\"(options?.fieldHtmlClass || '') + (isChecked ?\n          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :\n          (' ' + (options?.style?.unselected || '')))\"\n                 [disabled]=\"controlDisabled\"\n                 [id]=\"'control' + layoutNode?._id\"\n                 [name]=\"controlName\"\n                 [readonly]=\"options?.readonly ? 'readonly' : null\"\n                 [value]=\"controlValue\"\n                 type=\"checkbox\"\n                 (change)=\"updateValue($event)\">\n          <span *ngIf=\"options?.title\"\n                [style.display]=\"options?.notitle ? 'none' : ''\"\n                [innerHTML]=\"options?.title\"></span>\n      </label>"
                }] }
    ];
    CheckboxComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    CheckboxComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return CheckboxComponent;
}());
export { CheckboxComponent };
if (false) {
    CheckboxComponent.prototype.formControl;
    CheckboxComponent.prototype.controlName;
    CheckboxComponent.prototype.controlValue;
    CheckboxComponent.prototype.controlDisabled;
    CheckboxComponent.prototype.boundControl;
    CheckboxComponent.prototype.options;
    CheckboxComponent.prototype.trueValue;
    CheckboxComponent.prototype.falseValue;
    CheckboxComponent.prototype.layoutNode;
    CheckboxComponent.prototype.layoutIndex;
    CheckboxComponent.prototype.dataIndex;
    CheckboxComponent.prototype.jsf;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nc2Yvd2lkZ2V0LWxpYnJhcnkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9jaGVja2JveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUE7QUFFdEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUE7QUFFMUU7SUErQ0UsMkJBQ1UsR0FBMEI7UUFBMUIsUUFBRyxHQUFILEdBQUcsQ0FBdUI7UUFWcEMsb0JBQWUsR0FBRyxLQUFLLENBQUE7UUFDdkIsaUJBQVksR0FBRyxLQUFLLENBQUE7UUFFcEIsY0FBUyxHQUFRLElBQUksQ0FBQTtRQUNyQixlQUFVLEdBQVEsS0FBSyxDQUFBO0lBUXZCLENBQUM7SUFFRCxzQkFBSSx3Q0FBUzthQUFiO1lBQ0UsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUE7UUFDOUQsQ0FBQzs7O09BQUE7SUFFRCxvQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNoQyxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssU0FBUyxFQUFFO1lBQ2pFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUE7U0FDdkM7SUFDSCxDQUFDO0lBRUQsdUNBQVcsR0FBWCxVQUFZLEtBQUs7UUFDZixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDckYsQ0FBQzs7Z0JBbkVGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsNm9EQThCRztpQkFDZDs7O2dCQW5DTyxxQkFBcUI7Ozs2QkE2QzFCLEtBQUs7OEJBQ0wsS0FBSzs0QkFDTCxLQUFLOztJQXVCUix3QkFBQztDQUFBLEFBcEVELElBb0VDO1NBbENZLGlCQUFpQjs7SUFDNUIsd0NBQTRCO0lBQzVCLHdDQUFtQjtJQUNuQix5Q0FBaUI7SUFDakIsNENBQXVCO0lBQ3ZCLHlDQUFvQjtJQUNwQixvQ0FBWTtJQUNaLHNDQUFxQjtJQUNyQix1Q0FBdUI7SUFDdkIsdUNBQXdCO0lBQ3hCLHdDQUE4QjtJQUM5QixzQ0FBNEI7SUFHMUIsZ0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJ1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjaGVja2JveC13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPGxhYmVsXG4gICAgICAgICAgICAgIFthdHRyLmZvcl09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8uaXRlbUxhYmVsSHRtbENsYXNzIHx8ICcnXCI+XG4gICAgICAgICAgPGlucHV0ICpuZ0lmPVwiYm91bmRDb250cm9sXCJcbiAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnU3RhdHVzJ1wiXG4gICAgICAgICAgICAgICAgIFtjbGFzc109XCIob3B0aW9ucz8uZmllbGRIdG1sQ2xhc3MgfHwgJycpICsgKGlzQ2hlY2tlZCA/XG4gICAgICAgICAgKCcgJyArIChvcHRpb25zPy5hY3RpdmVDbGFzcyB8fCAnJykgKyAnICcgKyAob3B0aW9ucz8uc3R5bGU/LnNlbGVjdGVkIHx8ICcnKSkgOlxuICAgICAgICAgICgnICcgKyAob3B0aW9ucz8uc3R5bGU/LnVuc2VsZWN0ZWQgfHwgJycpKSlcIlxuICAgICAgICAgICAgICAgICBbaWRdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkXCJcbiAgICAgICAgICAgICAgICAgW25hbWVdPVwiY29udHJvbE5hbWVcIlxuICAgICAgICAgICAgICAgICBbcmVhZG9ubHldPVwib3B0aW9ucz8ucmVhZG9ubHkgPyAncmVhZG9ubHknIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiPlxuICAgICAgICAgIDxpbnB1dCAqbmdJZj1cIiFib3VuZENvbnRyb2xcIlxuICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdTdGF0dXMnXCJcbiAgICAgICAgICAgICAgICAgW2NoZWNrZWRdPVwiaXNDaGVja2VkID8gJ2NoZWNrZWQnIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgIFtjbGFzc109XCIob3B0aW9ucz8uZmllbGRIdG1sQ2xhc3MgfHwgJycpICsgKGlzQ2hlY2tlZCA/XG4gICAgICAgICAgKCcgJyArIChvcHRpb25zPy5hY3RpdmVDbGFzcyB8fCAnJykgKyAnICcgKyAob3B0aW9ucz8uc3R5bGU/LnNlbGVjdGVkIHx8ICcnKSkgOlxuICAgICAgICAgICgnICcgKyAob3B0aW9ucz8uc3R5bGU/LnVuc2VsZWN0ZWQgfHwgJycpKSlcIlxuICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbERpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgICAgICAgICAgW3JlYWRvbmx5XT1cIm9wdGlvbnM/LnJlYWRvbmx5ID8gJ3JlYWRvbmx5JyA6IG51bGxcIlxuICAgICAgICAgICAgICAgICBbdmFsdWVdPVwiY29udHJvbFZhbHVlXCJcbiAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJ1cGRhdGVWYWx1ZSgkZXZlbnQpXCI+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJvcHRpb25zPy50aXRsZVwiXG4gICAgICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwib3B0aW9ucz8ubm90aXRsZSA/ICdub25lJyA6ICcnXCJcbiAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LnRpdGxlXCI+PC9zcGFuPlxuICAgICAgPC9sYWJlbD5gLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2JveENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2xcbiAgY29udHJvbE5hbWU6IHN0cmluZ1xuICBjb250cm9sVmFsdWU6IGFueVxuICBjb250cm9sRGlzYWJsZWQgPSBmYWxzZVxuICBib3VuZENvbnRyb2wgPSBmYWxzZVxuICBvcHRpb25zOiBhbnlcbiAgdHJ1ZVZhbHVlOiBhbnkgPSB0cnVlXG4gIGZhbHNlVmFsdWU6IGFueSA9IGZhbHNlXG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBnZXQgaXNDaGVja2VkKCkge1xuICAgIHJldHVybiB0aGlzLmpzZi5nZXRGb3JtQ29udHJvbFZhbHVlKHRoaXMpID09PSB0aGlzLnRydWVWYWx1ZVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge31cbiAgICB0aGlzLmpzZi5pbml0aWFsaXplQ29udHJvbCh0aGlzKVxuICAgIGlmICh0aGlzLmNvbnRyb2xWYWx1ZSA9PT0gbnVsbCB8fCB0aGlzLmNvbnRyb2xWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmNvbnRyb2xWYWx1ZSA9IHRoaXMub3B0aW9ucy50aXRsZVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIHRoaXMuanNmLnVwZGF0ZVZhbHVlKHRoaXMsIGV2ZW50LnRhcmdldC5jaGVja2VkID8gdGhpcy50cnVlVmFsdWUgOiB0aGlzLmZhbHNlVmFsdWUpXG4gIH1cbn1cbiJdfQ==