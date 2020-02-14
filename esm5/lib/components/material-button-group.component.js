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
import { buildTitleMap, JsonSchemaFormService } from '@ngsf/widget-library';
var MaterialButtonGroupComponent = (function () {
    function MaterialButtonGroupComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.radiosList = [];
        this.vertical = false;
    }
    MaterialButtonGroupComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.radiosList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
        this.jsf.initializeControl(this);
    };
    MaterialButtonGroupComponent.prototype.updateValue = function (value) {
        this.options.showErrors = true;
        this.jsf.updateValue(this, value);
    };
    MaterialButtonGroupComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MaterialButtonGroupComponent.prototype, "layoutNode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], MaterialButtonGroupComponent.prototype, "layoutIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], MaterialButtonGroupComponent.prototype, "dataIndex", void 0);
    MaterialButtonGroupComponent = __decorate([
        Component({
            selector: 'material-button-group-widget',
            template: "\n      <div>\n          <div *ngIf=\"options?.title\">\n              <label\n                      [attr.for]=\"'control' + layoutNode?._id\"\n                      [class]=\"options?.labelHtmlClass || ''\"\n                      [style.display]=\"options?.notitle ? 'none' : ''\"\n                      [innerHTML]=\"options?.title\"></label>\n              [disabled]=\"controlDisabled || options?.readonly\"\n          </div>\n          <mat-button-toggle-group\n                  [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                  [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n                  [attr.required]=\"options?.required\"\n                  [name]=\"controlName\"\n                  [value]=\"controlValue\"\n                  [vertical]=\"!!options.vertical\">\n              <mat-button-toggle *ngFor=\"let radioItem of radiosList\"\n                                 [id]=\"'control' + layoutNode?._id + '/' + radioItem?.name\"\n                                 [value]=\"radioItem?.value\"\n                                 (click)=\"updateValue(radioItem?.value)\">\n                  <span [innerHTML]=\"radioItem?.name\"></span>\n              </mat-button-toggle>\n          </mat-button-toggle-group>\n          <mat-error *ngIf=\"options?.showErrors && options?.errorMessage\"\n                     [innerHTML]=\"options?.errorMessage\"></mat-error>\n      </div>",
            styles: [" mat-error {\n      font-size: 75%;\n  } "]
        }),
        __metadata("design:paramtypes", [JsonSchemaFormService])
    ], MaterialButtonGroupComponent);
    return MaterialButtonGroupComponent;
}());
export { MaterialButtonGroupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtYnV0dG9uLWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL21hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9tYXRlcmlhbC1idXR0b24tZ3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFBO0FBRXRELE9BQU8sRUFBQyxhQUFhLEVBQUUscUJBQXFCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQTtBQW1DekU7SUFhRSxzQ0FDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQVZwQyxvQkFBZSxHQUFHLEtBQUssQ0FBQTtRQUN2QixpQkFBWSxHQUFHLEtBQUssQ0FBQTtRQUVwQixlQUFVLEdBQVUsRUFBRSxDQUFBO1FBQ3RCLGFBQVEsR0FBRyxLQUFLLENBQUE7SUFRaEIsQ0FBQztJQUVELCtDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FDeEIsQ0FBQTtRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbEMsQ0FBQztJQUVELGtEQUFXLEdBQVgsVUFBWSxLQUFLO1FBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFBO1FBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUNuQyxDQUFDOztnQkFoQmMscUJBQXFCOztJQUwzQjtRQUFSLEtBQUssRUFBRTs7b0VBQWdCO0lBQ2Y7UUFBUixLQUFLLEVBQUU7O3FFQUFzQjtJQUNyQjtRQUFSLEtBQUssRUFBRTs7bUVBQW9CO0lBWGpCLDRCQUE0QjtRQWpDeEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDhCQUE4QjtZQUN4QyxRQUFRLEVBQUUsKzVDQTBCQztxQkFDRiwyQ0FFTjtTQUNKLENBQUM7eUNBZWUscUJBQXFCO09BZHpCLDRCQUE0QixDQStCeEM7SUFBRCxtQ0FBQztDQUFBLEFBL0JELElBK0JDO1NBL0JZLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJ1xuaW1wb3J0IHtidWlsZFRpdGxlTWFwLCBKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJ0BuZ3NmL3dpZGdldC1saWJyYXJ5J1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXRlcmlhbC1idXR0b24tZ3JvdXAtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cIm9wdGlvbnM/LnRpdGxlXCI+XG4gICAgICAgICAgICAgIDxsYWJlbFxuICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmZvcl09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICAgICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5sYWJlbEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwib3B0aW9ucz8ubm90aXRsZSA/ICdub25lJyA6ICcnXCJcbiAgICAgICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LnRpdGxlXCI+PC9sYWJlbD5cbiAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImNvbnRyb2xEaXNhYmxlZCB8fCBvcHRpb25zPy5yZWFkb25seVwiXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPG1hdC1idXR0b24tdG9nZ2xlLWdyb3VwXG4gICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdTdGF0dXMnXCJcbiAgICAgICAgICAgICAgICAgIFthdHRyLnJlYWRvbmx5XT1cIm9wdGlvbnM/LnJlYWRvbmx5ID8gJ3JlYWRvbmx5JyA6IG51bGxcIlxuICAgICAgICAgICAgICAgICAgW2F0dHIucmVxdWlyZWRdPVwib3B0aW9ucz8ucmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgICAgW25hbWVdPVwiY29udHJvbE5hbWVcIlxuICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cImNvbnRyb2xWYWx1ZVwiXG4gICAgICAgICAgICAgICAgICBbdmVydGljYWxdPVwiISFvcHRpb25zLnZlcnRpY2FsXCI+XG4gICAgICAgICAgICAgIDxtYXQtYnV0dG9uLXRvZ2dsZSAqbmdGb3I9XCJsZXQgcmFkaW9JdGVtIG9mIHJhZGlvc0xpc3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICcvJyArIHJhZGlvSXRlbT8ubmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwicmFkaW9JdGVtPy52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwidXBkYXRlVmFsdWUocmFkaW9JdGVtPy52YWx1ZSlcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwicmFkaW9JdGVtPy5uYW1lXCI+PC9zcGFuPlxuICAgICAgICAgICAgICA8L21hdC1idXR0b24tdG9nZ2xlPlxuICAgICAgICAgIDwvbWF0LWJ1dHRvbi10b2dnbGUtZ3JvdXA+XG4gICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cIm9wdGlvbnM/LnNob3dFcnJvcnMgJiYgb3B0aW9ucz8uZXJyb3JNZXNzYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZXJyb3JNZXNzYWdlXCI+PC9tYXQtZXJyb3I+XG4gICAgICA8L2Rpdj5gLFxuICBzdHlsZXM6IFtgIG1hdC1lcnJvciB7XG4gICAgICBmb250LXNpemU6IDc1JTtcbiAgfSBgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxCdXR0b25Hcm91cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2xcbiAgY29udHJvbE5hbWU6IHN0cmluZ1xuICBjb250cm9sVmFsdWU6IGFueVxuICBjb250cm9sRGlzYWJsZWQgPSBmYWxzZVxuICBib3VuZENvbnRyb2wgPSBmYWxzZVxuICBvcHRpb25zOiBhbnlcbiAgcmFkaW9zTGlzdDogYW55W10gPSBbXVxuICB2ZXJ0aWNhbCA9IGZhbHNlXG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmxheW91dE5vZGUub3B0aW9ucyB8fCB7fVxuICAgIHRoaXMucmFkaW9zTGlzdCA9IGJ1aWxkVGl0bGVNYXAoXG4gICAgICB0aGlzLm9wdGlvbnMudGl0bGVNYXAgfHwgdGhpcy5vcHRpb25zLmVudW1OYW1lcyxcbiAgICAgIHRoaXMub3B0aW9ucy5lbnVtLCB0cnVlXG4gICAgKVxuICAgIHRoaXMuanNmLmluaXRpYWxpemVDb250cm9sKHRoaXMpXG4gIH1cblxuICB1cGRhdGVWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMub3B0aW9ucy5zaG93RXJyb3JzID0gdHJ1ZVxuICAgIHRoaXMuanNmLnVwZGF0ZVZhbHVlKHRoaXMsIHZhbHVlKVxuICB9XG59XG4iXX0=