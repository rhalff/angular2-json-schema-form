import { Component, Input } from '@angular/core';
import { hasOwn } from '@ngsf/common';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
var SubmitComponent = (function () {
    function SubmitComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    SubmitComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (hasOwn(this.options, 'disabled')) {
            this.controlDisabled = this.options.disabled;
        }
        else if (this.jsf.formOptions.disableInvalidSubmit) {
            this.controlDisabled = !this.jsf.isValid;
            this.jsf.isValidChanges.subscribe((function (isValid) { return _this.controlDisabled = !isValid; }));
        }
        if (this.controlValue === null || this.controlValue === undefined) {
            this.controlValue = this.options.title;
        }
    };
    SubmitComponent.prototype.updateValue = function (event) {
        if (typeof this.options.onClick === 'function') {
            this.options.onClick(event);
        }
        else {
            this.jsf.updateValue(this, event.target.value);
        }
    };
    SubmitComponent.decorators = [
        { type: Component, args: [{
                    selector: 'submit-widget',
                    template: "\n    <div\n      [class]=\"options?.htmlClass || ''\">\n      <input\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.required]=\"options?.required\"\n        [class]=\"options?.fieldHtmlClass || ''\"\n        [disabled]=\"controlDisabled\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        [type]=\"layoutNode?.type\"\n        [value]=\"controlValue\"\n        (click)=\"updateValue($event)\">\n    </div>"
                }] }
    ];
    SubmitComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    SubmitComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return SubmitComponent;
}());
export { SubmitComponent };
if (false) {
    SubmitComponent.prototype.formControl;
    SubmitComponent.prototype.controlName;
    SubmitComponent.prototype.controlValue;
    SubmitComponent.prototype.controlDisabled;
    SubmitComponent.prototype.boundControl;
    SubmitComponent.prototype.options;
    SubmitComponent.prototype.layoutNode;
    SubmitComponent.prototype.layoutIndex;
    SubmitComponent.prototype.dataIndex;
    SubmitComponent.prototype.jsf;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VibWl0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL3dpZGdldC1saWJyYXJ5LyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvc3VibWl0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQTtBQUV0RCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBQ25DLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFBO0FBRTFFO0lBNkJFLHlCQUNVLEdBQTBCO1FBQTFCLFFBQUcsR0FBSCxHQUFHLENBQXVCO1FBUnBDLG9CQUFlLEdBQUcsS0FBSyxDQUFBO1FBQ3ZCLGlCQUFZLEdBQUcsS0FBSyxDQUFBO0lBU3BCLENBQUM7SUFFRCxrQ0FBUSxHQUFSO1FBQUEsaUJBWUM7UUFYQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2hDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQUU7WUFDcEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQTtTQUM3QzthQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsb0JBQW9CLEVBQUU7WUFDcEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFBO1lBQ3hDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLEtBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxPQUFPLEVBQS9CLENBQStCLEVBQUMsQ0FBQTtTQUM5RTtRQUNELElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxTQUFTLEVBQUU7WUFDakUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQTtTQUN2QztJQUNILENBQUM7SUFFRCxxQ0FBVyxHQUFYLFVBQVksS0FBSztRQUNmLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7WUFDOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDNUI7YUFBTTtZQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQy9DO0lBQ0gsQ0FBQzs7Z0JBdERGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFLDJpQkFjRDtpQkFDVjs7O2dCQW5CTyxxQkFBcUI7Ozs2QkEyQjFCLEtBQUs7OEJBQ0wsS0FBSzs0QkFDTCxLQUFLOztJQTRCUixzQkFBQztDQUFBLEFBdkRELElBdURDO1NBckNZLGVBQWU7O0lBQzFCLHNDQUE0QjtJQUM1QixzQ0FBbUI7SUFDbkIsdUNBQWlCO0lBQ2pCLDBDQUF1QjtJQUN2Qix1Q0FBb0I7SUFDcEIsa0NBQVk7SUFDWixxQ0FBd0I7SUFDeEIsc0NBQThCO0lBQzlCLG9DQUE0QjtJQUcxQiw4QkFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3JtcydcbmltcG9ydCB7aGFzT3dufSBmcm9tICdAbmdzZi9jb21tb24nXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJ1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzdWJtaXQtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBbY2xhc3NdPVwib3B0aW9ucz8uaHRtbENsYXNzIHx8ICcnXCI+XG4gICAgICA8aW5wdXRcbiAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnU3RhdHVzJ1wiXG4gICAgICAgIFthdHRyLnJlYWRvbmx5XT1cIm9wdGlvbnM/LnJlYWRvbmx5ID8gJ3JlYWRvbmx5JyA6IG51bGxcIlxuICAgICAgICBbYXR0ci5yZXF1aXJlZF09XCJvcHRpb25zPy5yZXF1aXJlZFwiXG4gICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5maWVsZEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgIFtkaXNhYmxlZF09XCJjb250cm9sRGlzYWJsZWRcIlxuICAgICAgICBbaWRdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkXCJcbiAgICAgICAgW25hbWVdPVwiY29udHJvbE5hbWVcIlxuICAgICAgICBbdHlwZV09XCJsYXlvdXROb2RlPy50eXBlXCJcbiAgICAgICAgW3ZhbHVlXT1cImNvbnRyb2xWYWx1ZVwiXG4gICAgICAgIChjbGljayk9XCJ1cGRhdGVWYWx1ZSgkZXZlbnQpXCI+XG4gICAgPC9kaXY+YCxcbn0pXG5leHBvcnQgY2xhc3MgU3VibWl0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbFxuICBjb250cm9sTmFtZTogc3RyaW5nXG4gIGNvbnRyb2xWYWx1ZTogYW55XG4gIGNvbnRyb2xEaXNhYmxlZCA9IGZhbHNlXG4gIGJvdW5kQ29udHJvbCA9IGZhbHNlXG4gIG9wdGlvbnM6IGFueVxuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge31cbiAgICB0aGlzLmpzZi5pbml0aWFsaXplQ29udHJvbCh0aGlzKVxuICAgIGlmIChoYXNPd24odGhpcy5vcHRpb25zLCAnZGlzYWJsZWQnKSkge1xuICAgICAgdGhpcy5jb250cm9sRGlzYWJsZWQgPSB0aGlzLm9wdGlvbnMuZGlzYWJsZWRcbiAgICB9IGVsc2UgaWYgKHRoaXMuanNmLmZvcm1PcHRpb25zLmRpc2FibGVJbnZhbGlkU3VibWl0KSB7XG4gICAgICB0aGlzLmNvbnRyb2xEaXNhYmxlZCA9ICF0aGlzLmpzZi5pc1ZhbGlkXG4gICAgICB0aGlzLmpzZi5pc1ZhbGlkQ2hhbmdlcy5zdWJzY3JpYmUoaXNWYWxpZCA9PiB0aGlzLmNvbnRyb2xEaXNhYmxlZCA9ICFpc1ZhbGlkKVxuICAgIH1cbiAgICBpZiAodGhpcy5jb250cm9sVmFsdWUgPT09IG51bGwgfHwgdGhpcy5jb250cm9sVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jb250cm9sVmFsdWUgPSB0aGlzLm9wdGlvbnMudGl0bGVcbiAgICB9XG4gIH1cblxuICB1cGRhdGVWYWx1ZShldmVudCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5vbkNsaWNrKGV2ZW50KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmpzZi51cGRhdGVWYWx1ZSh0aGlzLCBldmVudC50YXJnZXQudmFsdWUpXG4gICAgfVxuICB9XG59XG4iXX0=