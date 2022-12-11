import { Component, Input } from '@angular/core';
import { buildTitleMap, JsonSchemaFormService } from '@ngsf/widget-library';
import * as i0 from "@angular/core";
import * as i1 from "@ngsf/widget-library";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/material/form-field";
import * as i5 from "@angular/material/radio";
function MaterialRadiosComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "label", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap((ctx_r0.options == null ? null : ctx_r0.options.labelHtmlClass) || "");
    i0.ɵɵstyleProp("display", (ctx_r0.options == null ? null : ctx_r0.options.notitle) ? "none" : "");
    i0.ɵɵproperty("innerHTML", ctx_r0.options == null ? null : ctx_r0.options.title, i0.ɵɵsanitizeHtml);
    i0.ɵɵattribute("for", "control" + (ctx_r0.layoutNode == null ? null : ctx_r0.layoutNode._id));
} }
function MaterialRadiosComponent_mat_radio_group_2_mat_radio_button_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-radio-button", 7);
    i0.ɵɵelement(1, "span", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const radioItem_r5 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("id", "control" + (ctx_r4.layoutNode == null ? null : ctx_r4.layoutNode._id) + "/" + (radioItem_r5 == null ? null : radioItem_r5.name))("value", radioItem_r5 == null ? null : radioItem_r5.value);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", radioItem_r5 == null ? null : radioItem_r5.name, i0.ɵɵsanitizeHtml);
} }
function MaterialRadiosComponent_mat_radio_group_2_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-radio-group", 5);
    i0.ɵɵlistener("blur", function MaterialRadiosComponent_mat_radio_group_2_Template_mat_radio_group_blur_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r6 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r6.options.showErrors = true); });
    i0.ɵɵtemplate(1, MaterialRadiosComponent_mat_radio_group_2_mat_radio_button_1_Template, 2, 3, "mat-radio-button", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("flex-direction", ctx_r1.flexDirection);
    i0.ɵɵproperty("formControl", ctx_r1.formControl)("name", ctx_r1.controlName);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Status")("readonly", (ctx_r1.options == null ? null : ctx_r1.options.readonly) ? "readonly" : null)("required", ctx_r1.options == null ? null : ctx_r1.options.required);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.radiosList);
} }
function MaterialRadiosComponent_mat_radio_group_3_mat_radio_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-radio-button", 10);
    i0.ɵɵlistener("click", function MaterialRadiosComponent_mat_radio_group_3_mat_radio_button_1_Template_mat_radio_button_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r11); const radioItem_r9 = restoredCtx.$implicit; const ctx_r10 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r10.updateValue(radioItem_r9 == null ? null : radioItem_r9.value)); });
    i0.ɵɵelement(1, "span", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const radioItem_r9 = ctx.$implicit;
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("id", "control" + (ctx_r8.layoutNode == null ? null : ctx_r8.layoutNode._id) + "/" + (radioItem_r9 == null ? null : radioItem_r9.name))("value", radioItem_r9 == null ? null : radioItem_r9.value);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", radioItem_r9 == null ? null : radioItem_r9.name, i0.ɵɵsanitizeHtml);
} }
function MaterialRadiosComponent_mat_radio_group_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-radio-group", 8);
    i0.ɵɵtemplate(1, MaterialRadiosComponent_mat_radio_group_3_mat_radio_button_1_Template, 2, 3, "mat-radio-button", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("flex-direction", ctx_r2.flexDirection);
    i0.ɵɵproperty("disabled", ctx_r2.controlDisabled || (ctx_r2.options == null ? null : ctx_r2.options.readonly))("name", ctx_r2.controlName)("value", ctx_r2.controlValue);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Status")("readonly", (ctx_r2.options == null ? null : ctx_r2.options.readonly) ? "readonly" : null)("required", ctx_r2.options == null ? null : ctx_r2.options.required);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.radiosList);
} }
function MaterialRadiosComponent_mat_error_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-error", 4);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r3.options == null ? null : ctx_r3.options.errorMessage, i0.ɵɵsanitizeHtml);
} }
export class MaterialRadiosComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.flexDirection = 'column';
        this.radiosList = [];
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        if (this.layoutNode.type === 'radios-inline') {
            this.flexDirection = 'row';
        }
        this.radiosList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
        this.jsf.initializeControl(this, !this.options.readonly);
    }
    updateValue(value) {
        this.options.showErrors = true;
        this.jsf.updateValue(this, value);
    }
}
MaterialRadiosComponent.ɵfac = function MaterialRadiosComponent_Factory(t) { return new (t || MaterialRadiosComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialRadiosComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialRadiosComponent, selectors: [["material-radios-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 5, vars: 4, consts: [[4, "ngIf"], [3, "formControl", "flex-direction", "name", "blur", 4, "ngIf"], [3, "flex-direction", "disabled", "name", "value", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], [3, "innerHTML"], [3, "formControl", "name", "blur"], [3, "id", "value", 4, "ngFor", "ngForOf"], [3, "id", "value"], [3, "disabled", "name", "value"], [3, "id", "value", "click", 4, "ngFor", "ngForOf"], [3, "id", "value", "click"]], template: function MaterialRadiosComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div");
        i0.ɵɵtemplate(1, MaterialRadiosComponent_div_1_Template, 2, 6, "div", 0);
        i0.ɵɵtemplate(2, MaterialRadiosComponent_mat_radio_group_2_Template, 2, 8, "mat-radio-group", 1);
        i0.ɵɵtemplate(3, MaterialRadiosComponent_mat_radio_group_3_Template, 2, 9, "mat-radio-group", 2);
        i0.ɵɵtemplate(4, MaterialRadiosComponent_mat_error_4_Template, 1, 1, "mat-error", 3);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.title);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.boundControl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.boundControl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.showErrors) && (ctx.options == null ? null : ctx.options.errorMessage));
    } }, dependencies: [i2.NgForOf, i2.NgIf, i3.NgControlStatus, i3.RequiredValidator, i3.FormControlDirective, i4.MatError, i5.MatRadioGroup, i5.MatRadioButton], styles: ["mat-radio-group[_ngcontent-%COMP%]{display:inline-flex}mat-radio-button[_ngcontent-%COMP%]{margin:2px}mat-error[_ngcontent-%COMP%]{font-size:75%}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialRadiosComponent, [{
        type: Component,
        args: [{ selector: 'material-radios-widget', template: `
      <div>
          <div *ngIf="options?.title">
              <label
                      [attr.for]="'control' + layoutNode?._id"
                      [class]="options?.labelHtmlClass || ''"
                      [style.display]="options?.notitle ? 'none' : ''"
                      [innerHTML]="options?.title"></label>
          </div>
          <mat-radio-group *ngIf="boundControl"
                           [formControl]="formControl"
                           [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                           [attr.readonly]="options?.readonly ? 'readonly' : null"
                           [attr.required]="options?.required"
                           [style.flex-direction]="flexDirection"
                           [name]="controlName"
                           (blur)="options.showErrors = true">
              <mat-radio-button *ngFor="let radioItem of radiosList"
                                [id]="'control' + layoutNode?._id + '/' + radioItem?.name"
                                [value]="radioItem?.value">
                  <span [innerHTML]="radioItem?.name"></span>
              </mat-radio-button>
          </mat-radio-group>
          <mat-radio-group *ngIf="!boundControl"
                           [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                           [attr.readonly]="options?.readonly ? 'readonly' : null"
                           [attr.required]="options?.required"
                           [style.flex-direction]="flexDirection"
                           [disabled]="controlDisabled || options?.readonly"
                           [name]="controlName"
                           [value]="controlValue">
              <mat-radio-button *ngFor="let radioItem of radiosList"
                                [id]="'control' + layoutNode?._id + '/' + radioItem?.name"
                                [value]="radioItem?.value"
                                (click)="updateValue(radioItem?.value)">
                  <span [innerHTML]="radioItem?.name"></span>
              </mat-radio-button>
          </mat-radio-group>
          <mat-error *ngIf="options?.showErrors && options?.errorMessage"
                     [innerHTML]="options?.errorMessage"></mat-error>
      </div>`, styles: ["mat-radio-group{display:inline-flex}mat-radio-button{margin:2px}mat-error{font-size:75%}\n"] }]
    }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtcmFkaW9zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nc2YtbWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay9zcmMvbGliL2NvbXBvbmVudHMvbWF0ZXJpYWwtcmFkaW9zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQTtBQUV0RCxPQUFPLEVBQUMsYUFBYSxFQUFFLHFCQUFxQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7Ozs7Ozs7O0lBTS9ELDJCQUE0QjtJQUN4QiwyQkFJNkM7SUFDakQsaUJBQU07OztJQUhNLGVBQXVDO0lBQXZDLG9GQUF1QztJQUN2QyxpR0FBZ0Q7SUFDaEQsbUdBQTRCO0lBSDVCLDZGQUF3Qzs7O0lBYWhELDJDQUU2QztJQUN6QywwQkFBMkM7SUFDL0MsaUJBQW1COzs7O0lBSEQscUpBQTBELDJEQUFBO0lBRWxFLGVBQTZCO0lBQTdCLDhGQUE2Qjs7OztJQVgzQywwQ0FPb0Q7SUFBbkMsdUxBQVEsMkNBQXFCLElBQUksQ0FBQSxJQUFDO0lBQy9DLG9IQUltQjtJQUN2QixpQkFBa0I7OztJQVJELHNEQUFzQztJQUp0QyxnREFBMkIsNEJBQUE7SUFDM0IscUhBQWdFLDJGQUFBLHFFQUFBO0lBTXJDLGVBQWE7SUFBYiwyQ0FBYTs7OztJQWNyRCw0Q0FHMEQ7SUFBeEMsZ1JBQVMsZUFBQSxxRUFBNkIsQ0FBQSxJQUFDO0lBQ3JELDBCQUEyQztJQUMvQyxpQkFBbUI7Ozs7SUFKRCxxSkFBMEQsMkRBQUE7SUFHbEUsZUFBNkI7SUFBN0IsOEZBQTZCOzs7SUFaM0MsMENBT3dDO0lBQ3BDLG9IQUttQjtJQUN2QixpQkFBa0I7OztJQVZELHNEQUFzQztJQUN0Qyw4R0FBaUQsNEJBQUEsOEJBQUE7SUFKakQscUhBQWdFLDJGQUFBLHFFQUFBO0lBT3JDLGVBQWE7SUFBYiwyQ0FBYTs7O0lBT3pELCtCQUMyRDs7O0lBQWhELDBHQUFtQzs7QUFnQnhELE1BQU0sT0FBTyx1QkFBdUI7SUFhbEMsWUFDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQVZwQyxvQkFBZSxHQUFHLEtBQUssQ0FBQTtRQUN2QixpQkFBWSxHQUFHLEtBQUssQ0FBQTtRQUVwQixrQkFBYSxHQUFHLFFBQVEsQ0FBQTtRQUN4QixlQUFVLEdBQVUsRUFBRSxDQUFBO0lBUXRCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDNUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxlQUFlLEVBQUU7WUFDNUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUE7U0FDM0I7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FDeEIsQ0FBQTtRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxRCxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQUs7UUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUE7UUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ25DLENBQUM7OzhGQWpDVSx1QkFBdUI7NERBQXZCLHVCQUF1QjtRQXREOUIsMkJBQUs7UUFDRCx3RUFNTTtRQUNOLGdHQWFrQjtRQUNsQixnR0Fja0I7UUFDbEIsb0ZBQzJEO1FBQy9ELGlCQUFNOztRQXRDSSxlQUFvQjtRQUFwQixxRUFBb0I7UUFPUixlQUFrQjtRQUFsQix1Q0FBa0I7UUFjbEIsZUFBbUI7UUFBbkIsd0NBQW1CO1FBZXpCLGVBQWtEO1FBQWxELHVJQUFrRDs7dUZBaUIzRCx1QkFBdUI7Y0F6RG5DLFNBQVM7MkJBQ0Usd0JBQXdCLFlBQ3hCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2FBd0NDO3dFQXdCRixVQUFVO2tCQUFsQixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3JtcydcbmltcG9ydCB7YnVpbGRUaXRsZU1hcCwgSnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICdAbmdzZi93aWRnZXQtbGlicmFyeSdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0ZXJpYWwtcmFkaW9zLXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJvcHRpb25zPy50aXRsZVwiPlxuICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5mb3JdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkXCJcbiAgICAgICAgICAgICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8ubGFiZWxIdG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cIm9wdGlvbnM/Lm5vdGl0bGUgPyAnbm9uZScgOiAnJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy50aXRsZVwiPjwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPG1hdC1yYWRpby1ncm91cCAqbmdJZj1cImJvdW5kQ29udHJvbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnU3RhdHVzJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5yZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnJlcXVpcmVkXT1cIm9wdGlvbnM/LnJlcXVpcmVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5mbGV4LWRpcmVjdGlvbl09XCJmbGV4RGlyZWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIChibHVyKT1cIm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWVcIj5cbiAgICAgICAgICAgICAgPG1hdC1yYWRpby1idXR0b24gKm5nRm9yPVwibGV0IHJhZGlvSXRlbSBvZiByYWRpb3NMaXN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICcvJyArIHJhZGlvSXRlbT8ubmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJyYWRpb0l0ZW0/LnZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cInJhZGlvSXRlbT8ubmFtZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9tYXQtcmFkaW8tYnV0dG9uPlxuICAgICAgICAgIDwvbWF0LXJhZGlvLWdyb3VwPlxuICAgICAgICAgIDxtYXQtcmFkaW8tZ3JvdXAgKm5nSWY9XCIhYm91bmRDb250cm9sXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ1N0YXR1cydcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIucmVhZG9ubHldPVwib3B0aW9ucz8ucmVhZG9ubHkgPyAncmVhZG9ubHknIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5yZXF1aXJlZF09XCJvcHRpb25zPy5yZXF1aXJlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuZmxleC1kaXJlY3Rpb25dPVwiZmxleERpcmVjdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbERpc2FibGVkIHx8IG9wdGlvbnM/LnJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJjb250cm9sVmFsdWVcIj5cbiAgICAgICAgICAgICAgPG1hdC1yYWRpby1idXR0b24gKm5nRm9yPVwibGV0IHJhZGlvSXRlbSBvZiByYWRpb3NMaXN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICcvJyArIHJhZGlvSXRlbT8ubmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJyYWRpb0l0ZW0/LnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInVwZGF0ZVZhbHVlKHJhZGlvSXRlbT8udmFsdWUpXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cInJhZGlvSXRlbT8ubmFtZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9tYXQtcmFkaW8tYnV0dG9uPlxuICAgICAgICAgIDwvbWF0LXJhZGlvLWdyb3VwPlxuICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJvcHRpb25zPy5zaG93RXJyb3JzICYmIG9wdGlvbnM/LmVycm9yTWVzc2FnZVwiXG4gICAgICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmVycm9yTWVzc2FnZVwiPjwvbWF0LWVycm9yPlxuICAgICAgPC9kaXY+YCxcbiAgc3R5bGVzOiBbYFxuICAgICAgbWF0LXJhZGlvLWdyb3VwIHtcbiAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICAgIH1cblxuICAgICAgbWF0LXJhZGlvLWJ1dHRvbiB7XG4gICAgICAgICAgbWFyZ2luOiAycHg7XG4gICAgICB9XG5cbiAgICAgIG1hdC1lcnJvciB7XG4gICAgICAgICAgZm9udC1zaXplOiA3NSU7XG4gICAgICB9XG4gIGBdXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsUmFkaW9zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbFxuICBjb250cm9sTmFtZTogc3RyaW5nXG4gIGNvbnRyb2xWYWx1ZTogYW55XG4gIGNvbnRyb2xEaXNhYmxlZCA9IGZhbHNlXG4gIGJvdW5kQ29udHJvbCA9IGZhbHNlXG4gIG9wdGlvbnM6IGFueVxuICBmbGV4RGlyZWN0aW9uID0gJ2NvbHVtbidcbiAgcmFkaW9zTGlzdDogYW55W10gPSBbXVxuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge31cbiAgICBpZiAodGhpcy5sYXlvdXROb2RlLnR5cGUgPT09ICdyYWRpb3MtaW5saW5lJykge1xuICAgICAgdGhpcy5mbGV4RGlyZWN0aW9uID0gJ3JvdydcbiAgICB9XG4gICAgdGhpcy5yYWRpb3NMaXN0ID0gYnVpbGRUaXRsZU1hcChcbiAgICAgIHRoaXMub3B0aW9ucy50aXRsZU1hcCB8fCB0aGlzLm9wdGlvbnMuZW51bU5hbWVzLFxuICAgICAgdGhpcy5vcHRpb25zLmVudW0sIHRydWVcbiAgICApXG4gICAgdGhpcy5qc2YuaW5pdGlhbGl6ZUNvbnRyb2wodGhpcywgIXRoaXMub3B0aW9ucy5yZWFkb25seSlcbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5vcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlXG4gICAgdGhpcy5qc2YudXBkYXRlVmFsdWUodGhpcywgdmFsdWUpXG4gIH1cbn1cbiJdfQ==