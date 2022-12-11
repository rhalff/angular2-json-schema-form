import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '@ngsf/widget-library';
import * as i0 from "@angular/core";
import * as i1 from "@ngsf/widget-library";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/material/form-field";
import * as i5 from "@angular/material/slider";
function MaterialSliderComponent_mat_slider_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-slider", 3);
    i0.ɵɵlistener("blur", function MaterialSliderComponent_mat_slider_0_Template_mat_slider_blur_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.options.showErrors = true); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("width", "100%");
    i0.ɵɵproperty("formControl", ctx_r0.formControl)("id", "control" + (ctx_r0.layoutNode == null ? null : ctx_r0.layoutNode._id))("max", ctx_r0.options == null ? null : ctx_r0.options.maximum)("min", ctx_r0.options == null ? null : ctx_r0.options.minimum)("step", (ctx_r0.options == null ? null : ctx_r0.options.multipleOf) || (ctx_r0.options == null ? null : ctx_r0.options.step) || "any");
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r0.layoutNode == null ? null : ctx_r0.layoutNode._id) + "Status");
} }
function MaterialSliderComponent_mat_slider_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-slider", 4);
    i0.ɵɵlistener("blur", function MaterialSliderComponent_mat_slider_1_Template_mat_slider_blur_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r5.options.showErrors = true); })("change", function MaterialSliderComponent_mat_slider_1_Template_mat_slider_change_0_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.updateValue($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("width", "100%");
    i0.ɵɵproperty("disabled", ctx_r1.controlDisabled || (ctx_r1.options == null ? null : ctx_r1.options.readonly))("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id))("max", ctx_r1.options == null ? null : ctx_r1.options.maximum)("min", ctx_r1.options == null ? null : ctx_r1.options.minimum)("step", (ctx_r1.options == null ? null : ctx_r1.options.multipleOf) || (ctx_r1.options == null ? null : ctx_r1.options.step) || "any")("value", ctx_r1.controlValue);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Status");
} }
function MaterialSliderComponent_mat_error_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-error", 5);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r2.options == null ? null : ctx_r2.options.errorMessage, i0.ɵɵsanitizeHtml);
} }
export class MaterialSliderComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.allowNegative = true;
        this.allowDecimal = true;
        this.allowExponents = false;
        this.lastValidNumber = '';
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this, !this.options.readonly);
    }
    updateValue(event) {
        this.options.showErrors = true;
        this.jsf.updateValue(this, event.value);
    }
}
MaterialSliderComponent.ɵfac = function MaterialSliderComponent_Factory(t) { return new (t || MaterialSliderComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialSliderComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialSliderComponent, selectors: [["material-slider-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 3, vars: 3, consts: [["thumbLabel", "", 3, "formControl", "id", "max", "min", "step", "width", "blur", 4, "ngIf"], ["thumbLabel", "", 3, "disabled", "id", "max", "min", "step", "width", "value", "blur", "change", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], ["thumbLabel", "", 3, "formControl", "id", "max", "min", "step", "blur"], ["thumbLabel", "", 3, "disabled", "id", "max", "min", "step", "value", "blur", "change"], [3, "innerHTML"]], template: function MaterialSliderComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, MaterialSliderComponent_mat_slider_0_Template, 1, 8, "mat-slider", 0);
        i0.ɵɵtemplate(1, MaterialSliderComponent_mat_slider_1_Template, 1, 9, "mat-slider", 1);
        i0.ɵɵtemplate(2, MaterialSliderComponent_mat_error_2_Template, 1, 1, "mat-error", 2);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.boundControl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.boundControl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.showErrors) && (ctx.options == null ? null : ctx.options.errorMessage));
    } }, dependencies: [i2.NgIf, i3.NgControlStatus, i3.FormControlDirective, i4.MatError, i5.MatSlider], styles: ["mat-error[_ngcontent-%COMP%]{font-size:75%}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialSliderComponent, [{
        type: Component,
        args: [{ selector: 'material-slider-widget', template: `
      <mat-slider thumbLabel *ngIf="boundControl"
                  [formControl]="formControl"
                  [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                  [id]="'control' + layoutNode?._id"
                  [max]="options?.maximum"
                  [min]="options?.minimum"
                  [step]="options?.multipleOf || options?.step || 'any'"
                  [style.width]="'100%'"
                  (blur)="options.showErrors = true"></mat-slider>
      <mat-slider thumbLabel *ngIf="!boundControl"
                  [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                  [disabled]="controlDisabled || options?.readonly"
                  [id]="'control' + layoutNode?._id"
                  [max]="options?.maximum"
                  [min]="options?.minimum"
                  [step]="options?.multipleOf || options?.step || 'any'"
                  [style.width]="'100%'"
                  [value]="controlValue"
                  (blur)="options.showErrors = true"
                  (change)="updateValue($event)"></mat-slider>
      <mat-error *ngIf="options?.showErrors && options?.errorMessage"
                 [innerHTML]="options?.errorMessage"></mat-error>`, styles: ["mat-error{font-size:75%}\n"] }]
    }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtc2xpZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nc2YtbWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay9zcmMvbGliL2NvbXBvbmVudHMvbWF0ZXJpYWwtc2xpZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQTtBQUV0RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQTs7Ozs7Ozs7O0lBS3BELHFDQVErQztJQUFuQyw2S0FBUSwyQ0FBcUIsSUFBSSxDQUFBLElBQUM7SUFBQyxpQkFBYTs7O0lBRGhELCtCQUFzQjtJQU50QixnREFBMkIsOEVBQUEsK0RBQUEsK0RBQUEsdUlBQUE7SUFDM0IscUhBQWdFOzs7O0lBTzVFLHFDQVUyQztJQUQvQiw2S0FBUSwyQ0FBcUIsSUFBSSxDQUFBLElBQUMsMEtBQ3hCLGVBQUEsMEJBQW1CLENBQUEsSUFESztJQUNILGlCQUFhOzs7SUFINUMsK0JBQXNCO0lBTHRCLDhHQUFpRCw4RUFBQSwrREFBQSwrREFBQSx1SUFBQSw4QkFBQTtJQURqRCxxSEFBZ0U7OztJQVU1RSwrQkFDMkQ7OztJQUFoRCwwR0FBbUM7O0FBS3BELE1BQU0sT0FBTyx1QkFBdUI7SUFlbEMsWUFDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQVpwQyxvQkFBZSxHQUFHLEtBQUssQ0FBQTtRQUN2QixpQkFBWSxHQUFHLEtBQUssQ0FBQTtRQUVwQixrQkFBYSxHQUFHLElBQUksQ0FBQTtRQUNwQixpQkFBWSxHQUFHLElBQUksQ0FBQTtRQUNuQixtQkFBYyxHQUFHLEtBQUssQ0FBQTtRQUN0QixvQkFBZSxHQUFHLEVBQUUsQ0FBQTtJQVFwQixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFBO1FBQzVDLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxRCxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQUs7UUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUE7UUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUN6QyxDQUFDOzs4RkE1QlUsdUJBQXVCOzREQUF2Qix1QkFBdUI7UUExQjlCLHNGQVE0RDtRQUM1RCxzRkFVd0Q7UUFDeEQsb0ZBQzJEOztRQXJCbkMsdUNBQWtCO1FBU2xCLGVBQW1CO1FBQW5CLHdDQUFtQjtRQVcvQixlQUFrRDtRQUFsRCx1SUFBa0Q7O3VGQU12RCx1QkFBdUI7Y0E3Qm5DLFNBQVM7MkJBQ0Usd0JBQXdCLFlBQ3hCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tFQXNCc0Q7d0VBZ0J2RCxVQUFVO2tCQUFsQixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3JtcydcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICdAbmdzZi93aWRnZXQtbGlicmFyeSdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0ZXJpYWwtc2xpZGVyLXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8bWF0LXNsaWRlciB0aHVtYkxhYmVsICpuZ0lmPVwiYm91bmRDb250cm9sXCJcbiAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiXG4gICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdTdGF0dXMnXCJcbiAgICAgICAgICAgICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICAgICAgICAgICAgW21heF09XCJvcHRpb25zPy5tYXhpbXVtXCJcbiAgICAgICAgICAgICAgICAgIFttaW5dPVwib3B0aW9ucz8ubWluaW11bVwiXG4gICAgICAgICAgICAgICAgICBbc3RlcF09XCJvcHRpb25zPy5tdWx0aXBsZU9mIHx8IG9wdGlvbnM/LnN0ZXAgfHwgJ2FueSdcIlxuICAgICAgICAgICAgICAgICAgW3N0eWxlLndpZHRoXT1cIicxMDAlJ1wiXG4gICAgICAgICAgICAgICAgICAoYmx1cik9XCJvcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlXCI+PC9tYXQtc2xpZGVyPlxuICAgICAgPG1hdC1zbGlkZXIgdGh1bWJMYWJlbCAqbmdJZj1cIiFib3VuZENvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnU3RhdHVzJ1wiXG4gICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbERpc2FibGVkIHx8IG9wdGlvbnM/LnJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICAgICAgICAgICAgW21heF09XCJvcHRpb25zPy5tYXhpbXVtXCJcbiAgICAgICAgICAgICAgICAgIFttaW5dPVwib3B0aW9ucz8ubWluaW11bVwiXG4gICAgICAgICAgICAgICAgICBbc3RlcF09XCJvcHRpb25zPy5tdWx0aXBsZU9mIHx8IG9wdGlvbnM/LnN0ZXAgfHwgJ2FueSdcIlxuICAgICAgICAgICAgICAgICAgW3N0eWxlLndpZHRoXT1cIicxMDAlJ1wiXG4gICAgICAgICAgICAgICAgICBbdmFsdWVdPVwiY29udHJvbFZhbHVlXCJcbiAgICAgICAgICAgICAgICAgIChibHVyKT1cIm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWVcIlxuICAgICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJ1cGRhdGVWYWx1ZSgkZXZlbnQpXCI+PC9tYXQtc2xpZGVyPlxuICAgICAgPG1hdC1lcnJvciAqbmdJZj1cIm9wdGlvbnM/LnNob3dFcnJvcnMgJiYgb3B0aW9ucz8uZXJyb3JNZXNzYWdlXCJcbiAgICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5lcnJvck1lc3NhZ2VcIj48L21hdC1lcnJvcj5gLFxuICBzdHlsZXM6IFtgIG1hdC1lcnJvciB7XG4gICAgICBmb250LXNpemU6IDc1JTtcbiAgfSBgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxTbGlkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sXG4gIGNvbnRyb2xOYW1lOiBzdHJpbmdcbiAgY29udHJvbFZhbHVlOiBhbnlcbiAgY29udHJvbERpc2FibGVkID0gZmFsc2VcbiAgYm91bmRDb250cm9sID0gZmFsc2VcbiAgb3B0aW9uczogYW55XG4gIGFsbG93TmVnYXRpdmUgPSB0cnVlXG4gIGFsbG93RGVjaW1hbCA9IHRydWVcbiAgYWxsb3dFeHBvbmVudHMgPSBmYWxzZVxuICBsYXN0VmFsaWROdW1iZXIgPSAnJ1xuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge31cbiAgICB0aGlzLmpzZi5pbml0aWFsaXplQ29udHJvbCh0aGlzLCAhdGhpcy5vcHRpb25zLnJlYWRvbmx5KVxuICB9XG5cbiAgdXBkYXRlVmFsdWUoZXZlbnQpIHtcbiAgICB0aGlzLm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWVcbiAgICB0aGlzLmpzZi51cGRhdGVWYWx1ZSh0aGlzLCBldmVudC52YWx1ZSlcbiAgfVxufVxuIl19