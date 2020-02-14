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
import { hasOwn } from '@ngsf/common';
import { JsonSchemaFormService } from '@ngsf/widget-library';
var MaterialButtonComponent = (function () {
    function MaterialButtonComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    MaterialButtonComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (hasOwn(this.options, 'disabled')) {
            this.controlDisabled = this.options.disabled;
        }
        else if (this.jsf.formOptions.disableInvalidSubmit) {
            this.controlDisabled = !this.jsf.isValid;
            this.jsf.isValidChanges.subscribe(function (isValid) { return _this.controlDisabled = !isValid; });
        }
    };
    MaterialButtonComponent.prototype.updateValue = function (event) {
        if (typeof this.options.onClick === 'function') {
            this.options.onClick(event);
        }
        else {
            this.jsf.updateValue(this, event.target.value);
        }
    };
    MaterialButtonComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MaterialButtonComponent.prototype, "layoutNode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], MaterialButtonComponent.prototype, "layoutIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], MaterialButtonComponent.prototype, "dataIndex", void 0);
    MaterialButtonComponent = __decorate([
        Component({
            selector: 'material-button-widget',
            template: "\n      <div class=\"button-row\" [class]=\"options?.htmlClass || ''\">\n          <!-- [color]=\"options?.color || 'primary'\" -->\n          <button mat-raised-button\n                  [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n                  [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                  [disabled]=\"controlDisabled || options?.readonly\"\n                  [id]=\"'control' + layoutNode?._id\"\n                  [name]=\"controlName\"\n                  [type]=\"layoutNode?.type\"\n                  [value]=\"controlValue\"\n                  (click)=\"updateValue($event)\">\n              <mat-icon *ngIf=\"options?.icon\" class=\"mat-24\">{{options?.icon}}</mat-icon>\n              <span *ngIf=\"options?.title\" [innerHTML]=\"options?.title\"></span>\n          </button>\n      </div>",
            styles: [" button {\n      margin-top: 10px;\n  } "]
        }),
        __metadata("design:paramtypes", [JsonSchemaFormService])
    ], MaterialButtonComponent);
    return MaterialButtonComponent;
}());
export { MaterialButtonComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL21hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9tYXRlcmlhbC1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFBO0FBRXRELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFDbkMsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7QUF3QjFEO0lBV0UsaUNBQ1UsR0FBMEI7UUFBMUIsUUFBRyxHQUFILEdBQUcsQ0FBdUI7UUFScEMsb0JBQWUsR0FBRyxLQUFLLENBQUE7UUFDdkIsaUJBQVksR0FBRyxLQUFLLENBQUE7SUFTcEIsQ0FBQztJQUVELDBDQUFRLEdBQVI7UUFBQSxpQkFTQztRQVJDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFBO1FBQzVDLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDaEMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsRUFBRTtZQUNwQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFBO1NBQzdDO2FBQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsRUFBRTtZQUNwRCxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUE7WUFDeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsS0FBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLE9BQU8sRUFBL0IsQ0FBK0IsQ0FBQyxDQUFBO1NBQzlFO0lBQ0gsQ0FBQztJQUVELDZDQUFXLEdBQVgsVUFBWSxLQUFLO1FBQ2YsSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtZQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUM1QjthQUFNO1lBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDL0M7SUFDSCxDQUFDOztnQkFyQmMscUJBQXFCOztJQUwzQjtRQUFSLEtBQUssRUFBRTs7K0RBQWdCO0lBQ2Y7UUFBUixLQUFLLEVBQUU7O2dFQUFzQjtJQUNyQjtRQUFSLEtBQUssRUFBRTs7OERBQW9CO0lBVGpCLHVCQUF1QjtRQXRCbkMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHdCQUF3QjtZQUNsQyxRQUFRLEVBQUUsNDFCQWVDO3FCQUNGLDBDQUVOO1NBQ0osQ0FBQzt5Q0FhZSxxQkFBcUI7T0FaekIsdUJBQXVCLENBa0NuQztJQUFELDhCQUFDO0NBQUEsQUFsQ0QsSUFrQ0M7U0FsQ1ksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXG5pbXBvcnQge2hhc093bn0gZnJvbSAnQG5nc2YvY29tbW9uJ1xuaW1wb3J0IHtKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJ0BuZ3NmL3dpZGdldC1saWJyYXJ5J1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXRlcmlhbC1idXR0b24td2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24tcm93XCIgW2NsYXNzXT1cIm9wdGlvbnM/Lmh0bWxDbGFzcyB8fCAnJ1wiPlxuICAgICAgICAgIDwhLS0gW2NvbG9yXT1cIm9wdGlvbnM/LmNvbG9yIHx8ICdwcmltYXJ5J1wiIC0tPlxuICAgICAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b25cbiAgICAgICAgICAgICAgICAgIFthdHRyLnJlYWRvbmx5XT1cIm9wdGlvbnM/LnJlYWRvbmx5ID8gJ3JlYWRvbmx5JyA6IG51bGxcIlxuICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnU3RhdHVzJ1wiXG4gICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbERpc2FibGVkIHx8IG9wdGlvbnM/LnJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICAgICAgICAgICAgW25hbWVdPVwiY29udHJvbE5hbWVcIlxuICAgICAgICAgICAgICAgICAgW3R5cGVdPVwibGF5b3V0Tm9kZT8udHlwZVwiXG4gICAgICAgICAgICAgICAgICBbdmFsdWVdPVwiY29udHJvbFZhbHVlXCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJ1cGRhdGVWYWx1ZSgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgIDxtYXQtaWNvbiAqbmdJZj1cIm9wdGlvbnM/Lmljb25cIiBjbGFzcz1cIm1hdC0yNFwiPnt7b3B0aW9ucz8uaWNvbn19PC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJvcHRpb25zPy50aXRsZVwiIFtpbm5lckhUTUxdPVwib3B0aW9ucz8udGl0bGVcIj48L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5gLFxuICBzdHlsZXM6IFtgIGJ1dHRvbiB7XG4gICAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICB9IGBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbEJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2xcbiAgY29udHJvbE5hbWU6IHN0cmluZ1xuICBjb250cm9sVmFsdWU6IGFueVxuICBjb250cm9sRGlzYWJsZWQgPSBmYWxzZVxuICBib3VuZENvbnRyb2wgPSBmYWxzZVxuICBvcHRpb25zOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9XG4gICAgdGhpcy5qc2YuaW5pdGlhbGl6ZUNvbnRyb2wodGhpcylcbiAgICBpZiAoaGFzT3duKHRoaXMub3B0aW9ucywgJ2Rpc2FibGVkJykpIHtcbiAgICAgIHRoaXMuY29udHJvbERpc2FibGVkID0gdGhpcy5vcHRpb25zLmRpc2FibGVkXG4gICAgfSBlbHNlIGlmICh0aGlzLmpzZi5mb3JtT3B0aW9ucy5kaXNhYmxlSW52YWxpZFN1Ym1pdCkge1xuICAgICAgdGhpcy5jb250cm9sRGlzYWJsZWQgPSAhdGhpcy5qc2YuaXNWYWxpZFxuICAgICAgdGhpcy5qc2YuaXNWYWxpZENoYW5nZXMuc3Vic2NyaWJlKGlzVmFsaWQgPT4gdGhpcy5jb250cm9sRGlzYWJsZWQgPSAhaXNWYWxpZClcbiAgICB9XG4gIH1cblxuICB1cGRhdGVWYWx1ZShldmVudCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5vbkNsaWNrKGV2ZW50KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmpzZi51cGRhdGVWYWx1ZSh0aGlzLCBldmVudC50YXJnZXQudmFsdWUpXG4gICAgfVxuICB9XG59XG4iXX0=