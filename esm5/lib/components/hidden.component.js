import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
var HiddenComponent = (function () {
    function HiddenComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    HiddenComponent.prototype.ngOnInit = function () {
        this.jsf.initializeControl(this);
    };
    HiddenComponent.decorators = [
        { type: Component, args: [{
                    selector: 'hidden-widget',
                    template: "\n    <input *ngIf=\"boundControl\"\n      [formControl]=\"formControl\"\n      [id]=\"'control' + layoutNode?._id\"\n      [name]=\"controlName\"\n      type=\"hidden\">\n    <input *ngIf=\"!boundControl\"\n      [disabled]=\"controlDisabled\"\n      [name]=\"controlName\"\n      [id]=\"'control' + layoutNode?._id\"\n      type=\"hidden\"\n      [value]=\"controlValue\">"
                }] }
    ];
    HiddenComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    HiddenComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return HiddenComponent;
}());
export { HiddenComponent };
if (false) {
    HiddenComponent.prototype.formControl;
    HiddenComponent.prototype.controlName;
    HiddenComponent.prototype.controlValue;
    HiddenComponent.prototype.controlDisabled;
    HiddenComponent.prototype.boundControl;
    HiddenComponent.prototype.layoutNode;
    HiddenComponent.prototype.layoutIndex;
    HiddenComponent.prototype.dataIndex;
    HiddenComponent.prototype.jsf;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZGVuLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL3dpZGdldC1saWJyYXJ5LyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvaGlkZGVuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQTtBQUV0RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQTtBQUUxRTtJQXlCRSx5QkFDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQVBwQyxvQkFBZSxHQUFHLEtBQUssQ0FBQTtRQUN2QixpQkFBWSxHQUFHLEtBQUssQ0FBQTtJQVFwQixDQUFDO0lBRUQsa0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbEMsQ0FBQzs7Z0JBaENGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFLHdYQVdrQjtpQkFDN0I7OztnQkFoQk8scUJBQXFCOzs7NkJBdUIxQixLQUFLOzhCQUNMLEtBQUs7NEJBQ0wsS0FBSzs7SUFVUixzQkFBQztDQUFBLEFBakNELElBaUNDO1NBbEJZLGVBQWU7O0lBQzFCLHNDQUE0QjtJQUM1QixzQ0FBbUI7SUFDbkIsdUNBQWlCO0lBQ2pCLDBDQUF1QjtJQUN2Qix1Q0FBb0I7SUFDcEIscUNBQXdCO0lBQ3hCLHNDQUE4QjtJQUM5QixvQ0FBNEI7SUFHMUIsOEJBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJ1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdoaWRkZW4td2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aW5wdXQgKm5nSWY9XCJib3VuZENvbnRyb2xcIlxuICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgW25hbWVdPVwiY29udHJvbE5hbWVcIlxuICAgICAgdHlwZT1cImhpZGRlblwiPlxuICAgIDxpbnB1dCAqbmdJZj1cIiFib3VuZENvbnRyb2xcIlxuICAgICAgW2Rpc2FibGVkXT1cImNvbnRyb2xEaXNhYmxlZFwiXG4gICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICBbaWRdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkXCJcbiAgICAgIHR5cGU9XCJoaWRkZW5cIlxuICAgICAgW3ZhbHVlXT1cImNvbnRyb2xWYWx1ZVwiPmAsXG59KVxuZXhwb3J0IGNsYXNzIEhpZGRlbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2xcbiAgY29udHJvbE5hbWU6IHN0cmluZ1xuICBjb250cm9sVmFsdWU6IGFueVxuICBjb250cm9sRGlzYWJsZWQgPSBmYWxzZVxuICBib3VuZENvbnRyb2wgPSBmYWxzZVxuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5qc2YuaW5pdGlhbGl6ZUNvbnRyb2wodGhpcylcbiAgfVxufVxuIl19