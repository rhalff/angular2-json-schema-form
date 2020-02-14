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
var MaterialSliderComponent = (function () {
    function MaterialSliderComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.allowNegative = true;
        this.allowDecimal = true;
        this.allowExponents = false;
        this.lastValidNumber = '';
    }
    MaterialSliderComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this, !this.options.readonly);
    };
    MaterialSliderComponent.prototype.updateValue = function (event) {
        this.options.showErrors = true;
        this.jsf.updateValue(this, event.value);
    };
    MaterialSliderComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MaterialSliderComponent.prototype, "layoutNode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], MaterialSliderComponent.prototype, "layoutIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], MaterialSliderComponent.prototype, "dataIndex", void 0);
    MaterialSliderComponent = __decorate([
        Component({
            selector: 'material-slider-widget',
            template: "\n      <mat-slider thumbLabel *ngIf=\"boundControl\"\n                  [formControl]=\"formControl\"\n                  [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                  [id]=\"'control' + layoutNode?._id\"\n                  [max]=\"options?.maximum\"\n                  [min]=\"options?.minimum\"\n                  [step]=\"options?.multipleOf || options?.step || 'any'\"\n                  [style.width]=\"'100%'\"\n                  (blur)=\"options.showErrors = true\"></mat-slider>\n      <mat-slider thumbLabel *ngIf=\"!boundControl\"\n                  [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                  [disabled]=\"controlDisabled || options?.readonly\"\n                  [id]=\"'control' + layoutNode?._id\"\n                  [max]=\"options?.maximum\"\n                  [min]=\"options?.minimum\"\n                  [step]=\"options?.multipleOf || options?.step || 'any'\"\n                  [style.width]=\"'100%'\"\n                  [value]=\"controlValue\"\n                  (blur)=\"options.showErrors = true\"\n                  (change)=\"updateValue($event)\"></mat-slider>\n      <mat-error *ngIf=\"options?.showErrors && options?.errorMessage\"\n                 [innerHTML]=\"options?.errorMessage\"></mat-error>",
            styles: [" mat-error {\n      font-size: 75%;\n  } "]
        }),
        __metadata("design:paramtypes", [JsonSchemaFormService])
    ], MaterialSliderComponent);
    return MaterialSliderComponent;
}());
export { MaterialSliderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtc2xpZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL21hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9tYXRlcmlhbC1zbGlkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFBO0FBRXRELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNCQUFzQixDQUFBO0FBK0IxRDtJQWVFLGlDQUNVLEdBQTBCO1FBQTFCLFFBQUcsR0FBSCxHQUFHLENBQXVCO1FBWnBDLG9CQUFlLEdBQUcsS0FBSyxDQUFBO1FBQ3ZCLGlCQUFZLEdBQUcsS0FBSyxDQUFBO1FBRXBCLGtCQUFhLEdBQUcsSUFBSSxDQUFBO1FBQ3BCLGlCQUFZLEdBQUcsSUFBSSxDQUFBO1FBQ25CLG1CQUFjLEdBQUcsS0FBSyxDQUFBO1FBQ3RCLG9CQUFlLEdBQUcsRUFBRSxDQUFBO0lBUXBCLENBQUM7SUFFRCwwQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzFELENBQUM7SUFFRCw2Q0FBVyxHQUFYLFVBQVksS0FBSztRQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQTtRQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3pDLENBQUM7O2dCQVpjLHFCQUFxQjs7SUFMM0I7UUFBUixLQUFLLEVBQUU7OytEQUFnQjtJQUNmO1FBQVIsS0FBSyxFQUFFOztnRUFBc0I7SUFDckI7UUFBUixLQUFLLEVBQUU7OzhEQUFvQjtJQWJqQix1QkFBdUI7UUE3Qm5DLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSx3QkFBd0I7WUFDbEMsUUFBUSxFQUFFLG15Q0FzQnNEO3FCQUN2RCwyQ0FFTjtTQUNKLENBQUM7eUNBaUJlLHFCQUFxQjtPQWhCekIsdUJBQXVCLENBNkJuQztJQUFELDhCQUFDO0NBQUEsQUE3QkQsSUE2QkM7U0E3QlksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnQG5nc2Yvd2lkZ2V0LWxpYnJhcnknXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdGVyaWFsLXNsaWRlci13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPG1hdC1zbGlkZXIgdGh1bWJMYWJlbCAqbmdJZj1cImJvdW5kQ29udHJvbFwiXG4gICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnU3RhdHVzJ1wiXG4gICAgICAgICAgICAgICAgICBbaWRdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkXCJcbiAgICAgICAgICAgICAgICAgIFttYXhdPVwib3B0aW9ucz8ubWF4aW11bVwiXG4gICAgICAgICAgICAgICAgICBbbWluXT1cIm9wdGlvbnM/Lm1pbmltdW1cIlxuICAgICAgICAgICAgICAgICAgW3N0ZXBdPVwib3B0aW9ucz8ubXVsdGlwbGVPZiB8fCBvcHRpb25zPy5zdGVwIHx8ICdhbnknXCJcbiAgICAgICAgICAgICAgICAgIFtzdHlsZS53aWR0aF09XCInMTAwJSdcIlxuICAgICAgICAgICAgICAgICAgKGJsdXIpPVwib3B0aW9ucy5zaG93RXJyb3JzID0gdHJ1ZVwiPjwvbWF0LXNsaWRlcj5cbiAgICAgIDxtYXQtc2xpZGVyIHRodW1iTGFiZWwgKm5nSWY9XCIhYm91bmRDb250cm9sXCJcbiAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ1N0YXR1cydcIlxuICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImNvbnRyb2xEaXNhYmxlZCB8fCBvcHRpb25zPy5yZWFkb25seVwiXG4gICAgICAgICAgICAgICAgICBbaWRdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkXCJcbiAgICAgICAgICAgICAgICAgIFttYXhdPVwib3B0aW9ucz8ubWF4aW11bVwiXG4gICAgICAgICAgICAgICAgICBbbWluXT1cIm9wdGlvbnM/Lm1pbmltdW1cIlxuICAgICAgICAgICAgICAgICAgW3N0ZXBdPVwib3B0aW9ucz8ubXVsdGlwbGVPZiB8fCBvcHRpb25zPy5zdGVwIHx8ICdhbnknXCJcbiAgICAgICAgICAgICAgICAgIFtzdHlsZS53aWR0aF09XCInMTAwJSdcIlxuICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cImNvbnRyb2xWYWx1ZVwiXG4gICAgICAgICAgICAgICAgICAoYmx1cik9XCJvcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlXCJcbiAgICAgICAgICAgICAgICAgIChjaGFuZ2UpPVwidXBkYXRlVmFsdWUoJGV2ZW50KVwiPjwvbWF0LXNsaWRlcj5cbiAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJvcHRpb25zPy5zaG93RXJyb3JzICYmIG9wdGlvbnM/LmVycm9yTWVzc2FnZVwiXG4gICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZXJyb3JNZXNzYWdlXCI+PC9tYXQtZXJyb3I+YCxcbiAgc3R5bGVzOiBbYCBtYXQtZXJyb3Ige1xuICAgICAgZm9udC1zaXplOiA3NSU7XG4gIH0gYF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsU2xpZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbFxuICBjb250cm9sTmFtZTogc3RyaW5nXG4gIGNvbnRyb2xWYWx1ZTogYW55XG4gIGNvbnRyb2xEaXNhYmxlZCA9IGZhbHNlXG4gIGJvdW5kQ29udHJvbCA9IGZhbHNlXG4gIG9wdGlvbnM6IGFueVxuICBhbGxvd05lZ2F0aXZlID0gdHJ1ZVxuICBhbGxvd0RlY2ltYWwgPSB0cnVlXG4gIGFsbG93RXhwb25lbnRzID0gZmFsc2VcbiAgbGFzdFZhbGlkTnVtYmVyID0gJydcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9XG4gICAgdGhpcy5qc2YuaW5pdGlhbGl6ZUNvbnRyb2wodGhpcywgIXRoaXMub3B0aW9ucy5yZWFkb25seSlcbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKGV2ZW50KSB7XG4gICAgdGhpcy5vcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlXG4gICAgdGhpcy5qc2YudXBkYXRlVmFsdWUodGhpcywgZXZlbnQudmFsdWUpXG4gIH1cbn1cbiJdfQ==