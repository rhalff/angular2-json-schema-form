var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '@ngsf/widget-library';
var MaterialStepperComponent = (function () {
    function MaterialStepperComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    MaterialStepperComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    };
    MaterialStepperComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    MaterialStepperComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MaterialStepperComponent.prototype, "layoutNode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], MaterialStepperComponent.prototype, "layoutIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], MaterialStepperComponent.prototype, "dataIndex", void 0);
    MaterialStepperComponent = __decorate([
        Component({
            selector: 'material-stepper-widget',
            template: ""
        }),
        __metadata("design:paramtypes", [JsonSchemaFormService])
    ], MaterialStepperComponent);
    return MaterialStepperComponent;
}());
export { MaterialStepperComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtc3RlcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdzZi9tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbWF0ZXJpYWwtc3RlcHBlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUE7QUFFdEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7QUFRMUQ7SUFXRSxrQ0FDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQVJwQyxvQkFBZSxHQUFHLEtBQUssQ0FBQTtRQUN2QixpQkFBWSxHQUFHLEtBQUssQ0FBQTtJQVNwQixDQUFDO0lBRUQsMkNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFBO1FBQzVDLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbEMsQ0FBQztJQUVELDhDQUFXLEdBQVgsVUFBWSxLQUFLO1FBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDaEQsQ0FBQzs7Z0JBWGMscUJBQXFCOztJQUwzQjtRQUFSLEtBQUssRUFBRTs7Z0VBQWdCO0lBQ2Y7UUFBUixLQUFLLEVBQUU7O2lFQUFzQjtJQUNyQjtRQUFSLEtBQUssRUFBRTs7K0RBQW9CO0lBVGpCLHdCQUF3QjtRQUpwQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUseUJBQXlCO1lBQ25DLFFBQVEsRUFBRSxFQUFFO1NBQ2IsQ0FBQzt5Q0FhZSxxQkFBcUI7T0FaekIsd0JBQXdCLENBd0JwQztJQUFELCtCQUFDO0NBQUEsQUF4QkQsSUF3QkM7U0F4Qlksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnQG5nc2Yvd2lkZ2V0LWxpYnJhcnknXG5cbi8vIFRPRE86IEFkZCB0aGlzIGNvbnRyb2xcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0ZXJpYWwtc3RlcHBlci13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYGAsXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsU3RlcHBlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2xcbiAgY29udHJvbE5hbWU6IHN0cmluZ1xuICBjb250cm9sVmFsdWU6IGFueVxuICBjb250cm9sRGlzYWJsZWQgPSBmYWxzZVxuICBib3VuZENvbnRyb2wgPSBmYWxzZVxuICBvcHRpb25zOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9XG4gICAgdGhpcy5qc2YuaW5pdGlhbGl6ZUNvbnRyb2wodGhpcylcbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKGV2ZW50KSB7XG4gICAgdGhpcy5qc2YudXBkYXRlVmFsdWUodGhpcywgZXZlbnQudGFyZ2V0LnZhbHVlKVxuICB9XG59XG4iXX0=