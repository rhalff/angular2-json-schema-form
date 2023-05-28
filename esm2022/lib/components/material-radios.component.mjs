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
class MaterialRadiosComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    controlDisabled = false;
    boundControl = false;
    options;
    flexDirection = 'column';
    radiosList = [];
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
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
    static ɵfac = function MaterialRadiosComponent_Factory(t) { return new (t || MaterialRadiosComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
    static ɵcmp = i0.ɵɵdefineComponent({ type: MaterialRadiosComponent, selectors: [["material-radios-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 5, vars: 4, consts: [[4, "ngIf"], [3, "formControl", "flex-direction", "name", "blur", 4, "ngIf"], [3, "flex-direction", "disabled", "name", "value", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], [3, "innerHTML"], [3, "formControl", "name", "blur"], [3, "id", "value", 4, "ngFor", "ngForOf"], [3, "id", "value"], [3, "disabled", "name", "value"], [3, "id", "value", "click", 4, "ngFor", "ngForOf"], [3, "id", "value", "click"]], template: function MaterialRadiosComponent_Template(rf, ctx) { if (rf & 1) {
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
        } }, dependencies: [i2.NgForOf, i2.NgIf, i3.NgControlStatus, i3.FormControlDirective, i4.MatError, i5.MatRadioGroup, i5.MatRadioButton], styles: ["mat-radio-group[_ngcontent-%COMP%]{display:inline-flex}mat-radio-button[_ngcontent-%COMP%]{margin:2px}mat-error[_ngcontent-%COMP%]{font-size:75%}"] });
}
export { MaterialRadiosComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtcmFkaW9zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nc2YtbWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay9zcmMvbGliL2NvbXBvbmVudHMvbWF0ZXJpYWwtcmFkaW9zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQTtBQUV0RCxPQUFPLEVBQUMsYUFBYSxFQUFFLHFCQUFxQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7Ozs7Ozs7O0lBTS9ELDJCQUE0QjtJQUN4QiwyQkFJNkM7SUFDakQsaUJBQU07OztJQUhNLGVBQXVDO0lBQXZDLG9GQUF1QztJQUN2QyxpR0FBZ0Q7SUFDaEQsbUdBQTRCO0lBSDVCLDZGQUF3Qzs7O0lBYWhELDJDQUU2QztJQUN6QywwQkFBMkM7SUFDL0MsaUJBQW1COzs7O0lBSEQscUpBQTBELDJEQUFBO0lBRWxFLGVBQTZCO0lBQTdCLDhGQUE2Qjs7OztJQVgzQywwQ0FPb0Q7SUFBbkMsdUxBQVEsMkNBQXFCLElBQUksQ0FBQSxJQUFDO0lBQy9DLG9IQUltQjtJQUN2QixpQkFBa0I7OztJQVJELHNEQUFzQztJQUp0QyxnREFBMkIsNEJBQUE7SUFDM0IscUhBQWdFLDJGQUFBLHFFQUFBO0lBTXJDLGVBQWE7SUFBYiwyQ0FBYTs7OztJQWNyRCw0Q0FHMEQ7SUFBeEMsZ1JBQVMsZUFBQSxxRUFBNkIsQ0FBQSxJQUFDO0lBQ3JELDBCQUEyQztJQUMvQyxpQkFBbUI7Ozs7SUFKRCxxSkFBMEQsMkRBQUE7SUFHbEUsZUFBNkI7SUFBN0IsOEZBQTZCOzs7SUFaM0MsMENBT3dDO0lBQ3BDLG9IQUttQjtJQUN2QixpQkFBa0I7OztJQVZELHNEQUFzQztJQUN0Qyw4R0FBaUQsNEJBQUEsOEJBQUE7SUFKakQscUhBQWdFLDJGQUFBLHFFQUFBO0lBT3JDLGVBQWE7SUFBYiwyQ0FBYTs7O0lBT3pELCtCQUMyRDs7O0lBQWhELDBHQUFtQzs7QUF6Q3hELE1BeURhLHVCQUF1QjtJQWN4QjtJQWJWLFdBQVcsQ0FBaUI7SUFDNUIsV0FBVyxDQUFRO0lBQ25CLFlBQVksQ0FBSztJQUNqQixlQUFlLEdBQUcsS0FBSyxDQUFBO0lBQ3ZCLFlBQVksR0FBRyxLQUFLLENBQUE7SUFDcEIsT0FBTyxDQUFLO0lBQ1osYUFBYSxHQUFHLFFBQVEsQ0FBQTtJQUN4QixVQUFVLEdBQVUsRUFBRSxDQUFBO0lBQ2IsVUFBVSxDQUFLO0lBQ2YsV0FBVyxDQUFVO0lBQ3JCLFNBQVMsQ0FBVTtJQUU1QixZQUNVLEdBQTBCO1FBQTFCLFFBQUcsR0FBSCxHQUFHLENBQXVCO0lBRXBDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDNUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxlQUFlLEVBQUU7WUFDNUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUE7U0FDM0I7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FDeEIsQ0FBQTtRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxRCxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQUs7UUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUE7UUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ25DLENBQUM7aUZBakNVLHVCQUF1QjsrQ0FBdkIsdUJBQXVCO1lBdEQ5QiwyQkFBSztZQUNELHdFQU1NO1lBQ04sZ0dBYWtCO1lBQ2xCLGdHQWNrQjtZQUNsQixvRkFDMkQ7WUFDL0QsaUJBQU07O1lBdENJLGVBQW9CO1lBQXBCLHFFQUFvQjtZQU9SLGVBQWtCO1lBQWxCLHVDQUFrQjtZQWNsQixlQUFtQjtZQUFuQix3Q0FBbUI7WUFlekIsZUFBa0Q7WUFBbEQsdUlBQWtEOzs7U0FpQjNELHVCQUF1Qjt1RkFBdkIsdUJBQXVCO2NBekRuQyxTQUFTOzJCQUNFLHdCQUF3QixZQUN4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzthQXdDQzt3RUF3QkYsVUFBVTtrQkFBbEIsS0FBSztZQUNHLFdBQVc7a0JBQW5CLEtBQUs7WUFDRyxTQUFTO2tCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXG5pbXBvcnQge2J1aWxkVGl0bGVNYXAsIEpzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnQG5nc2Yvd2lkZ2V0LWxpYnJhcnknXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdGVyaWFsLXJhZGlvcy13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwib3B0aW9ucz8udGl0bGVcIj5cbiAgICAgICAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZm9yXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmxhYmVsSHRtbENsYXNzIHx8ICcnXCJcbiAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuZGlzcGxheV09XCJvcHRpb25zPy5ub3RpdGxlID8gJ25vbmUnIDogJydcIlxuICAgICAgICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8udGl0bGVcIj48L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxtYXQtcmFkaW8tZ3JvdXAgKm5nSWY9XCJib3VuZENvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ1N0YXR1cydcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIucmVhZG9ubHldPVwib3B0aW9ucz8ucmVhZG9ubHkgPyAncmVhZG9ubHknIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5yZXF1aXJlZF09XCJvcHRpb25zPy5yZXF1aXJlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuZmxleC1kaXJlY3Rpb25dPVwiZmxleERpcmVjdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAoYmx1cik9XCJvcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlXCI+XG4gICAgICAgICAgICAgIDxtYXQtcmFkaW8tYnV0dG9uICpuZ0Zvcj1cImxldCByYWRpb0l0ZW0gb2YgcmFkaW9zTGlzdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnLycgKyByYWRpb0l0ZW0/Lm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwicmFkaW9JdGVtPy52YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gW2lubmVySFRNTF09XCJyYWRpb0l0ZW0/Lm5hbWVcIj48L3NwYW4+XG4gICAgICAgICAgICAgIDwvbWF0LXJhZGlvLWJ1dHRvbj5cbiAgICAgICAgICA8L21hdC1yYWRpby1ncm91cD5cbiAgICAgICAgICA8bWF0LXJhZGlvLWdyb3VwICpuZ0lmPVwiIWJvdW5kQ29udHJvbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdTdGF0dXMnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnJlYWRvbmx5XT1cIm9wdGlvbnM/LnJlYWRvbmx5ID8gJ3JlYWRvbmx5JyA6IG51bGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIucmVxdWlyZWRdPVwib3B0aW9ucz8ucmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmZsZXgtZGlyZWN0aW9uXT1cImZsZXhEaXJlY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImNvbnRyb2xEaXNhYmxlZCB8fCBvcHRpb25zPy5yZWFkb25seVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwiY29udHJvbFZhbHVlXCI+XG4gICAgICAgICAgICAgIDxtYXQtcmFkaW8tYnV0dG9uICpuZ0Zvcj1cImxldCByYWRpb0l0ZW0gb2YgcmFkaW9zTGlzdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnLycgKyByYWRpb0l0ZW0/Lm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwicmFkaW9JdGVtPy52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJ1cGRhdGVWYWx1ZShyYWRpb0l0ZW0/LnZhbHVlKVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gW2lubmVySFRNTF09XCJyYWRpb0l0ZW0/Lm5hbWVcIj48L3NwYW4+XG4gICAgICAgICAgICAgIDwvbWF0LXJhZGlvLWJ1dHRvbj5cbiAgICAgICAgICA8L21hdC1yYWRpby1ncm91cD5cbiAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwib3B0aW9ucz8uc2hvd0Vycm9ycyAmJiBvcHRpb25zPy5lcnJvck1lc3NhZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5lcnJvck1lc3NhZ2VcIj48L21hdC1lcnJvcj5cbiAgICAgIDwvZGl2PmAsXG4gIHN0eWxlczogW2BcbiAgICAgIG1hdC1yYWRpby1ncm91cCB7XG4gICAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgICB9XG5cbiAgICAgIG1hdC1yYWRpby1idXR0b24ge1xuICAgICAgICAgIG1hcmdpbjogMnB4O1xuICAgICAgfVxuXG4gICAgICBtYXQtZXJyb3Ige1xuICAgICAgICAgIGZvbnQtc2l6ZTogNzUlO1xuICAgICAgfVxuICBgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbFJhZGlvc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2xcbiAgY29udHJvbE5hbWU6IHN0cmluZ1xuICBjb250cm9sVmFsdWU6IGFueVxuICBjb250cm9sRGlzYWJsZWQgPSBmYWxzZVxuICBib3VuZENvbnRyb2wgPSBmYWxzZVxuICBvcHRpb25zOiBhbnlcbiAgZmxleERpcmVjdGlvbiA9ICdjb2x1bW4nXG4gIHJhZGlvc0xpc3Q6IGFueVtdID0gW11cbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9XG4gICAgaWYgKHRoaXMubGF5b3V0Tm9kZS50eXBlID09PSAncmFkaW9zLWlubGluZScpIHtcbiAgICAgIHRoaXMuZmxleERpcmVjdGlvbiA9ICdyb3cnXG4gICAgfVxuICAgIHRoaXMucmFkaW9zTGlzdCA9IGJ1aWxkVGl0bGVNYXAoXG4gICAgICB0aGlzLm9wdGlvbnMudGl0bGVNYXAgfHwgdGhpcy5vcHRpb25zLmVudW1OYW1lcyxcbiAgICAgIHRoaXMub3B0aW9ucy5lbnVtLCB0cnVlXG4gICAgKVxuICAgIHRoaXMuanNmLmluaXRpYWxpemVDb250cm9sKHRoaXMsICF0aGlzLm9wdGlvbnMucmVhZG9ubHkpXG4gIH1cblxuICB1cGRhdGVWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMub3B0aW9ucy5zaG93RXJyb3JzID0gdHJ1ZVxuICAgIHRoaXMuanNmLnVwZGF0ZVZhbHVlKHRoaXMsIHZhbHVlKVxuICB9XG59XG4iXX0=