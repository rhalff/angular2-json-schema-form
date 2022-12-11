import { Component, Input } from '@angular/core';
import { buildTitleMap, JsonSchemaFormService } from '@ngsf/widget-library';
import * as i0 from "@angular/core";
import * as i1 from "@ngsf/widget-library";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/button-toggle";
import * as i4 from "@angular/material/form-field";
function MaterialButtonGroupComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "label", 4);
    i0.ɵɵtext(2, " [disabled]=\"controlDisabled || options?.readonly\" ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap((ctx_r0.options == null ? null : ctx_r0.options.labelHtmlClass) || "");
    i0.ɵɵstyleProp("display", (ctx_r0.options == null ? null : ctx_r0.options.notitle) ? "none" : "");
    i0.ɵɵproperty("innerHTML", ctx_r0.options == null ? null : ctx_r0.options.title, i0.ɵɵsanitizeHtml);
    i0.ɵɵattribute("for", "control" + (ctx_r0.layoutNode == null ? null : ctx_r0.layoutNode._id));
} }
function MaterialButtonGroupComponent_mat_button_toggle_3_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-button-toggle", 5);
    i0.ɵɵlistener("click", function MaterialButtonGroupComponent_mat_button_toggle_3_Template_mat_button_toggle_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r5); const radioItem_r3 = restoredCtx.$implicit; const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.updateValue(radioItem_r3 == null ? null : radioItem_r3.value)); });
    i0.ɵɵelement(1, "span", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const radioItem_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "/" + (radioItem_r3 == null ? null : radioItem_r3.name))("value", radioItem_r3 == null ? null : radioItem_r3.value);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", radioItem_r3 == null ? null : radioItem_r3.name, i0.ɵɵsanitizeHtml);
} }
function MaterialButtonGroupComponent_mat_error_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-error", 4);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r2.options == null ? null : ctx_r2.options.errorMessage, i0.ɵɵsanitizeHtml);
} }
export class MaterialButtonGroupComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.radiosList = [];
        this.vertical = false;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.radiosList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
        this.jsf.initializeControl(this);
    }
    updateValue(value) {
        this.options.showErrors = true;
        this.jsf.updateValue(this, value);
    }
}
MaterialButtonGroupComponent.ɵfac = function MaterialButtonGroupComponent_Factory(t) { return new (t || MaterialButtonGroupComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialButtonGroupComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialButtonGroupComponent, selectors: [["material-button-group-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 5, vars: 9, consts: [[4, "ngIf"], [3, "name", "value", "vertical"], [3, "id", "value", "click", 4, "ngFor", "ngForOf"], [3, "innerHTML", 4, "ngIf"], [3, "innerHTML"], [3, "id", "value", "click"]], template: function MaterialButtonGroupComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div");
        i0.ɵɵtemplate(1, MaterialButtonGroupComponent_div_1_Template, 3, 6, "div", 0);
        i0.ɵɵelementStart(2, "mat-button-toggle-group", 1);
        i0.ɵɵtemplate(3, MaterialButtonGroupComponent_mat_button_toggle_3_Template, 2, 3, "mat-button-toggle", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(4, MaterialButtonGroupComponent_mat_error_4_Template, 1, 1, "mat-error", 3);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.title);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("name", ctx.controlName)("value", ctx.controlValue)("vertical", !!ctx.options.vertical);
        i0.ɵɵattribute("aria-describedby", "control" + (ctx.layoutNode == null ? null : ctx.layoutNode._id) + "Status")("readonly", (ctx.options == null ? null : ctx.options.readonly) ? "readonly" : null)("required", ctx.options == null ? null : ctx.options.required);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.radiosList);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.showErrors) && (ctx.options == null ? null : ctx.options.errorMessage));
    } }, dependencies: [i2.NgForOf, i2.NgIf, i3.MatButtonToggleGroup, i3.MatButtonToggle, i4.MatError], styles: ["mat-error[_ngcontent-%COMP%]{font-size:75%}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialButtonGroupComponent, [{
        type: Component,
        args: [{ selector: 'material-button-group-widget', template: `
      <div>
          <div *ngIf="options?.title">
              <label
                      [attr.for]="'control' + layoutNode?._id"
                      [class]="options?.labelHtmlClass || ''"
                      [style.display]="options?.notitle ? 'none' : ''"
                      [innerHTML]="options?.title"></label>
              [disabled]="controlDisabled || options?.readonly"
          </div>
          <mat-button-toggle-group
                  [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                  [attr.readonly]="options?.readonly ? 'readonly' : null"
                  [attr.required]="options?.required"
                  [name]="controlName"
                  [value]="controlValue"
                  [vertical]="!!options.vertical">
              <mat-button-toggle *ngFor="let radioItem of radiosList"
                                 [id]="'control' + layoutNode?._id + '/' + radioItem?.name"
                                 [value]="radioItem?.value"
                                 (click)="updateValue(radioItem?.value)">
                  <span [innerHTML]="radioItem?.name"></span>
              </mat-button-toggle>
          </mat-button-toggle-group>
          <mat-error *ngIf="options?.showErrors && options?.errorMessage"
                     [innerHTML]="options?.errorMessage"></mat-error>
      </div>`, styles: ["mat-error{font-size:75%}\n"] }]
    }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtYnV0dG9uLWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nc2YtbWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay9zcmMvbGliL2NvbXBvbmVudHMvbWF0ZXJpYWwtYnV0dG9uLWdyb3VwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQTtBQUV0RCxPQUFPLEVBQUMsYUFBYSxFQUFFLHFCQUFxQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7Ozs7Ozs7SUFNL0QsMkJBQTRCO0lBQ3hCLDJCQUk2QztJQUM3QyxxRUFDSjtJQUFBLGlCQUFNOzs7SUFKTSxlQUF1QztJQUF2QyxvRkFBdUM7SUFDdkMsaUdBQWdEO0lBQ2hELG1HQUE0QjtJQUg1Qiw2RkFBd0M7Ozs7SUFhaEQsNENBRzJEO0lBQXhDLGtRQUFTLGVBQUEsb0VBQTZCLENBQUEsSUFBQztJQUN0RCwwQkFBMkM7SUFDL0MsaUJBQW9COzs7O0lBSkQscUpBQTBELDJEQUFBO0lBR25FLGVBQTZCO0lBQTdCLDhGQUE2Qjs7O0lBRzNDLCtCQUMyRDs7O0lBQWhELDBHQUFtQzs7QUFNeEQsTUFBTSxPQUFPLDRCQUE0QjtJQWF2QyxZQUNVLEdBQTBCO1FBQTFCLFFBQUcsR0FBSCxHQUFHLENBQXVCO1FBVnBDLG9CQUFlLEdBQUcsS0FBSyxDQUFBO1FBQ3ZCLGlCQUFZLEdBQUcsS0FBSyxDQUFBO1FBRXBCLGVBQVUsR0FBVSxFQUFFLENBQUE7UUFDdEIsYUFBUSxHQUFHLEtBQUssQ0FBQTtJQVFoQixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFBO1FBQzVDLElBQUksQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUN4QixDQUFBO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNsQyxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQUs7UUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUE7UUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ25DLENBQUM7O3dHQTlCVSw0QkFBNEI7aUVBQTVCLDRCQUE0QjtRQTlCbkMsMkJBQUs7UUFDRCw2RUFPTTtRQUNOLGtEQU13QztRQUNwQyx5R0FLb0I7UUFDeEIsaUJBQTBCO1FBQzFCLHlGQUMyRDtRQUMvRCxpQkFBTTs7UUF4QkksZUFBb0I7UUFBcEIscUVBQW9CO1FBWWxCLGVBQW9CO1FBQXBCLHNDQUFvQiwyQkFBQSxvQ0FBQTtRQUhwQiwrR0FBZ0UscUZBQUEsK0RBQUE7UUFNM0IsZUFBYTtRQUFiLHdDQUFhO1FBTzlDLGVBQWtEO1FBQWxELHVJQUFrRDs7dUZBTzNELDRCQUE0QjtjQWpDeEMsU0FBUzsyQkFDRSw4QkFBOEIsWUFDOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2FBMEJDO3dFQWNGLFVBQVU7a0JBQWxCLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJ1xuaW1wb3J0IHtidWlsZFRpdGxlTWFwLCBKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJ0BuZ3NmL3dpZGdldC1saWJyYXJ5J1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXRlcmlhbC1idXR0b24tZ3JvdXAtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cIm9wdGlvbnM/LnRpdGxlXCI+XG4gICAgICAgICAgICAgIDxsYWJlbFxuICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmZvcl09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICAgICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5sYWJlbEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwib3B0aW9ucz8ubm90aXRsZSA/ICdub25lJyA6ICcnXCJcbiAgICAgICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LnRpdGxlXCI+PC9sYWJlbD5cbiAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImNvbnRyb2xEaXNhYmxlZCB8fCBvcHRpb25zPy5yZWFkb25seVwiXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPG1hdC1idXR0b24tdG9nZ2xlLWdyb3VwXG4gICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdTdGF0dXMnXCJcbiAgICAgICAgICAgICAgICAgIFthdHRyLnJlYWRvbmx5XT1cIm9wdGlvbnM/LnJlYWRvbmx5ID8gJ3JlYWRvbmx5JyA6IG51bGxcIlxuICAgICAgICAgICAgICAgICAgW2F0dHIucmVxdWlyZWRdPVwib3B0aW9ucz8ucmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgICAgW25hbWVdPVwiY29udHJvbE5hbWVcIlxuICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cImNvbnRyb2xWYWx1ZVwiXG4gICAgICAgICAgICAgICAgICBbdmVydGljYWxdPVwiISFvcHRpb25zLnZlcnRpY2FsXCI+XG4gICAgICAgICAgICAgIDxtYXQtYnV0dG9uLXRvZ2dsZSAqbmdGb3I9XCJsZXQgcmFkaW9JdGVtIG9mIHJhZGlvc0xpc3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICcvJyArIHJhZGlvSXRlbT8ubmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwicmFkaW9JdGVtPy52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwidXBkYXRlVmFsdWUocmFkaW9JdGVtPy52YWx1ZSlcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwicmFkaW9JdGVtPy5uYW1lXCI+PC9zcGFuPlxuICAgICAgICAgICAgICA8L21hdC1idXR0b24tdG9nZ2xlPlxuICAgICAgICAgIDwvbWF0LWJ1dHRvbi10b2dnbGUtZ3JvdXA+XG4gICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cIm9wdGlvbnM/LnNob3dFcnJvcnMgJiYgb3B0aW9ucz8uZXJyb3JNZXNzYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZXJyb3JNZXNzYWdlXCI+PC9tYXQtZXJyb3I+XG4gICAgICA8L2Rpdj5gLFxuICBzdHlsZXM6IFtgIG1hdC1lcnJvciB7XG4gICAgICBmb250LXNpemU6IDc1JTtcbiAgfSBgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxCdXR0b25Hcm91cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2xcbiAgY29udHJvbE5hbWU6IHN0cmluZ1xuICBjb250cm9sVmFsdWU6IGFueVxuICBjb250cm9sRGlzYWJsZWQgPSBmYWxzZVxuICBib3VuZENvbnRyb2wgPSBmYWxzZVxuICBvcHRpb25zOiBhbnlcbiAgcmFkaW9zTGlzdDogYW55W10gPSBbXVxuICB2ZXJ0aWNhbCA9IGZhbHNlXG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmxheW91dE5vZGUub3B0aW9ucyB8fCB7fVxuICAgIHRoaXMucmFkaW9zTGlzdCA9IGJ1aWxkVGl0bGVNYXAoXG4gICAgICB0aGlzLm9wdGlvbnMudGl0bGVNYXAgfHwgdGhpcy5vcHRpb25zLmVudW1OYW1lcyxcbiAgICAgIHRoaXMub3B0aW9ucy5lbnVtLCB0cnVlXG4gICAgKVxuICAgIHRoaXMuanNmLmluaXRpYWxpemVDb250cm9sKHRoaXMpXG4gIH1cblxuICB1cGRhdGVWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMub3B0aW9ucy5zaG93RXJyb3JzID0gdHJ1ZVxuICAgIHRoaXMuanNmLnVwZGF0ZVZhbHVlKHRoaXMsIHZhbHVlKVxuICB9XG59XG4iXX0=