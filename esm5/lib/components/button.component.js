import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
var ButtonComponent = (function () {
    function ButtonComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    ButtonComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    };
    ButtonComponent.prototype.updateValue = function (event) {
        if (typeof this.options.onClick === 'function') {
            this.options.onClick(event);
        }
        else {
            this.jsf.updateValue(this, event.target.value);
        }
    };
    ButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'button-widget',
                    template: "\n      <div\n              [class]=\"options?.htmlClass || ''\">\n          <button\n                  [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n                  [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                  [class]=\"options?.fieldHtmlClass || ''\"\n                  [disabled]=\"controlDisabled\"\n                  [name]=\"controlName\"\n                  [type]=\"layoutNode?.type\"\n                  [value]=\"controlValue\"\n                  (click)=\"updateValue($event)\">\n        <span *ngIf=\"options?.icon || options?.title\"\n              [class]=\"options?.icon\"\n              [innerHTML]=\"options?.title\"></span>\n          </button>\n      </div>"
                }] }
    ];
    ButtonComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    ButtonComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return ButtonComponent;
}());
export { ButtonComponent };
if (false) {
    ButtonComponent.prototype.formControl;
    ButtonComponent.prototype.controlName;
    ButtonComponent.prototype.controlValue;
    ButtonComponent.prototype.controlDisabled;
    ButtonComponent.prototype.boundControl;
    ButtonComponent.prototype.options;
    ButtonComponent.prototype.layoutNode;
    ButtonComponent.prototype.layoutIndex;
    ButtonComponent.prototype.dataIndex;
    ButtonComponent.prototype.jsf;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL3dpZGdldC1saWJyYXJ5LyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQTtBQUV0RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQTtBQUUxRTtJQStCRSx5QkFDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQVJwQyxvQkFBZSxHQUFHLEtBQUssQ0FBQTtRQUN2QixpQkFBWSxHQUFHLEtBQUssQ0FBQTtJQVNwQixDQUFDO0lBRUQsa0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFBO1FBQzVDLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbEMsQ0FBQztJQUVELHFDQUFXLEdBQVgsVUFBWSxLQUFLO1FBQ2YsSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtZQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUM1QjthQUFNO1lBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDL0M7SUFDSCxDQUFDOztnQkEvQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUUsNHRCQWdCQztpQkFDWjs7O2dCQXJCTyxxQkFBcUI7Ozs2QkE2QjFCLEtBQUs7OEJBQ0wsS0FBSzs0QkFDTCxLQUFLOztJQW1CUixzQkFBQztDQUFBLEFBaERELElBZ0RDO1NBNUJZLGVBQWU7O0lBQzFCLHNDQUE0QjtJQUM1QixzQ0FBbUI7SUFDbkIsdUNBQWlCO0lBQ2pCLDBDQUF1QjtJQUN2Qix1Q0FBb0I7SUFDcEIsa0NBQVk7SUFDWixxQ0FBd0I7SUFDeEIsc0NBQThCO0lBQzlCLG9DQUE0QjtJQUcxQiw4QkFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3JtcydcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9qc29uLXNjaGVtYS1mb3JtLnNlcnZpY2UnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2J1dHRvbi13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPGRpdlxuICAgICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8uaHRtbENsYXNzIHx8ICcnXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgW2F0dHIucmVhZG9ubHldPVwib3B0aW9ucz8ucmVhZG9ubHkgPyAncmVhZG9ubHknIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdTdGF0dXMnXCJcbiAgICAgICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5maWVsZEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbERpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgICAgICAgICAgIFt0eXBlXT1cImxheW91dE5vZGU/LnR5cGVcIlxuICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cImNvbnRyb2xWYWx1ZVwiXG4gICAgICAgICAgICAgICAgICAoY2xpY2spPVwidXBkYXRlVmFsdWUoJGV2ZW50KVwiPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIm9wdGlvbnM/Lmljb24gfHwgb3B0aW9ucz8udGl0bGVcIlxuICAgICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8uaWNvblwiXG4gICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8udGl0bGVcIj48L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5gLFxufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sXG4gIGNvbnRyb2xOYW1lOiBzdHJpbmdcbiAgY29udHJvbFZhbHVlOiBhbnlcbiAgY29udHJvbERpc2FibGVkID0gZmFsc2VcbiAgYm91bmRDb250cm9sID0gZmFsc2VcbiAgb3B0aW9uczogYW55XG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmxheW91dE5vZGUub3B0aW9ucyB8fCB7fVxuICAgIHRoaXMuanNmLmluaXRpYWxpemVDb250cm9sKHRoaXMpXG4gIH1cblxuICB1cGRhdGVWYWx1ZShldmVudCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5vbkNsaWNrKGV2ZW50KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmpzZi51cGRhdGVWYWx1ZSh0aGlzLCBldmVudC50YXJnZXQudmFsdWUpXG4gICAgfVxuICB9XG59XG4iXX0=