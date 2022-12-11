import { Component, Input } from '@angular/core';
import { dateToString, stringToDate } from '@ngsf/common';
import { JsonSchemaFormService } from '@ngsf/widget-library';
import * as i0 from "@angular/core";
import * as i1 from "@ngsf/widget-library";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/material/datepicker";
import * as i5 from "@angular/material/form-field";
import * as i6 from "@angular/material/input";
function MaterialDatepickerComponent_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 8);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", (ctx_r0.options == null ? null : ctx_r0.options.prefix) || (ctx_r0.options == null ? null : ctx_r0.options.fieldAddonLeft), i0.ɵɵsanitizeHtml);
} }
function MaterialDatepickerComponent_input_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 9);
    i0.ɵɵlistener("blur", function MaterialDatepickerComponent_input_2_Template_input_blur_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.options.showErrors = true); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    const _r5 = i0.ɵɵreference(8);
    i0.ɵɵstyleProp("width", "100%");
    i0.ɵɵproperty("formControl", ctx_r1.formControl)("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id))("max", ctx_r1.options == null ? null : ctx_r1.options.maximum)("matDatepicker", _r5)("min", ctx_r1.options == null ? null : ctx_r1.options.minimum)("name", ctx_r1.controlName)("placeholder", ctx_r1.options == null ? null : ctx_r1.options.title)("required", ctx_r1.options == null ? null : ctx_r1.options.required);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Status")("list", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Autocomplete")("readonly", (ctx_r1.options == null ? null : ctx_r1.options.readonly) ? "readonly" : null);
} }
function MaterialDatepickerComponent_input_3_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 10);
    i0.ɵɵlistener("blur", function MaterialDatepickerComponent_input_3_Template_input_blur_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r9.options.showErrors = true); })("change", function MaterialDatepickerComponent_input_3_Template_input_change_0_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r11 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r11.updateValue($event)); })("input", function MaterialDatepickerComponent_input_3_Template_input_input_0_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r12 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r12.updateValue($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    const _r5 = i0.ɵɵreference(8);
    i0.ɵɵstyleProp("width", "100%");
    i0.ɵɵproperty("disabled", ctx_r2.controlDisabled || (ctx_r2.options == null ? null : ctx_r2.options.readonly))("id", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id))("max", ctx_r2.options == null ? null : ctx_r2.options.maximum)("matDatepicker", _r5)("min", ctx_r2.options == null ? null : ctx_r2.options.minimum)("name", ctx_r2.controlName)("placeholder", ctx_r2.options == null ? null : ctx_r2.options.title)("required", ctx_r2.options == null ? null : ctx_r2.options.required)("value", ctx_r2.dateValue);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Status")("list", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Autocomplete")("readonly", (ctx_r2.options == null ? null : ctx_r2.options.readonly) ? "readonly" : null);
} }
function MaterialDatepickerComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 11);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", (ctx_r3.options == null ? null : ctx_r3.options.suffix) || (ctx_r3.options == null ? null : ctx_r3.options.fieldAddonRight), i0.ɵɵsanitizeHtml);
} }
function MaterialDatepickerComponent_mat_hint_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-hint", 12);
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r4.options == null ? null : ctx_r4.options.description, i0.ɵɵsanitizeHtml);
} }
function MaterialDatepickerComponent_mat_error_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-error", 13);
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r6.options == null ? null : ctx_r6.options.errorMessage, i0.ɵɵsanitizeHtml);
} }
export class MaterialDatepickerComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.autoCompleteList = [];
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this, !this.options.readonly);
        this.setControlDate(this.controlValue);
        if (!this.options.notitle && !this.options.description && this.options.placeholder) {
            this.options.description = this.options.placeholder;
        }
    }
    ngOnChanges() {
        this.setControlDate(this.controlValue);
    }
    setControlDate(dateString) {
        this.dateValue = stringToDate(dateString);
    }
    updateValue(event) {
        this.options.showErrors = true;
        this.jsf.updateValue(this, dateToString(event, this.options));
    }
}
MaterialDatepickerComponent.ɵfac = function MaterialDatepickerComponent_Factory(t) { return new (t || MaterialDatepickerComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialDatepickerComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialDatepickerComponent, selectors: [["material-datepicker-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, features: [i0.ɵɵNgOnChangesFeature], decls: 10, vars: 9, consts: [["matPrefix", "", 3, "innerHTML", 4, "ngIf"], ["matInput", "", 3, "formControl", "id", "max", "matDatepicker", "min", "name", "placeholder", "required", "width", "blur", 4, "ngIf"], ["matInput", "", 3, "disabled", "id", "max", "matDatepicker", "min", "name", "placeholder", "required", "width", "value", "blur", "change", "input", 4, "ngIf"], ["matSuffix", "", 3, "innerHTML", 4, "ngIf"], ["align", "end", 3, "innerHTML", 4, "ngIf"], ["matSuffix", "", 3, "for"], ["picker", ""], [3, "innerHTML", 4, "ngIf"], ["matPrefix", "", 3, "innerHTML"], ["matInput", "", 3, "formControl", "id", "max", "matDatepicker", "min", "name", "placeholder", "required", "blur"], ["matInput", "", 3, "disabled", "id", "max", "matDatepicker", "min", "name", "placeholder", "required", "value", "blur", "change", "input"], ["matSuffix", "", 3, "innerHTML"], ["align", "end", 3, "innerHTML"], [3, "innerHTML"]], template: function MaterialDatepickerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "mat-form-field");
        i0.ɵɵtemplate(1, MaterialDatepickerComponent_span_1_Template, 1, 1, "span", 0);
        i0.ɵɵtemplate(2, MaterialDatepickerComponent_input_2_Template, 1, 13, "input", 1);
        i0.ɵɵtemplate(3, MaterialDatepickerComponent_input_3_Template, 1, 14, "input", 2);
        i0.ɵɵtemplate(4, MaterialDatepickerComponent_span_4_Template, 1, 1, "span", 3);
        i0.ɵɵtemplate(5, MaterialDatepickerComponent_mat_hint_5_Template, 1, 1, "mat-hint", 4);
        i0.ɵɵelement(6, "mat-datepicker-toggle", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelement(7, "mat-datepicker", null, 6);
        i0.ɵɵtemplate(9, MaterialDatepickerComponent_mat_error_9_Template, 1, 1, "mat-error", 7);
    } if (rf & 2) {
        const _r5 = i0.ɵɵreference(8);
        i0.ɵɵstyleProp("width", "100%");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.prefix) || (ctx.options == null ? null : ctx.options.fieldAddonLeft));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.boundControl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.boundControl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.suffix) || (ctx.options == null ? null : ctx.options.fieldAddonRight));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.description) && (!(ctx.options == null ? null : ctx.options.showErrors) || !(ctx.options == null ? null : ctx.options.errorMessage)));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("for", _r5);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.showErrors) && (ctx.options == null ? null : ctx.options.errorMessage));
    } }, dependencies: [i2.NgIf, i3.DefaultValueAccessor, i3.NgControlStatus, i3.RequiredValidator, i3.FormControlDirective, i4.MatDatepicker, i4.MatDatepickerInput, i4.MatDatepickerToggle, i5.MatFormField, i5.MatHint, i5.MatError, i5.MatPrefix, i5.MatSuffix, i6.MatInput], styles: ["mat-error[_ngcontent-%COMP%]{font-size:75%;margin-top:-1rem;margin-bottom:.5rem}  mat-form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix{width:initial}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialDatepickerComponent, [{
        type: Component,
        args: [{ selector: 'material-datepicker-widget', template: `
      <mat-form-field [style.width]="'100%'">
      <span matPrefix *ngIf="options?.prefix || options?.fieldAddonLeft"
            [innerHTML]="options?.prefix || options?.fieldAddonLeft"></span>
          <input matInput *ngIf="boundControl"
                 [formControl]="formControl"
                 [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                 [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
                 [attr.readonly]="options?.readonly ? 'readonly' : null"
                 [id]="'control' + layoutNode?._id"
                 [max]="options?.maximum"
                 [matDatepicker]="picker"
                 [min]="options?.minimum"
                 [name]="controlName"
                 [placeholder]="options?.title"
                 [required]="options?.required"
                 [style.width]="'100%'"
                 (blur)="options.showErrors = true">
          <input matInput *ngIf="!boundControl"
                 [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                 [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
                 [attr.readonly]="options?.readonly ? 'readonly' : null"
                 [disabled]="controlDisabled || options?.readonly"
                 [id]="'control' + layoutNode?._id"
                 [max]="options?.maximum"
                 [matDatepicker]="picker"
                 [min]="options?.minimum"
                 [name]="controlName"
                 [placeholder]="options?.title"
                 [required]="options?.required"
                 [style.width]="'100%'"
                 [value]="dateValue"
                 (blur)="options.showErrors = true"
                 (change)="updateValue($event)"
                 (input)="updateValue($event)">
          <span matSuffix *ngIf="options?.suffix || options?.fieldAddonRight"
                [innerHTML]="options?.suffix || options?.fieldAddonRight"></span>
          <mat-hint *ngIf="options?.description && (!options?.showErrors || !options?.errorMessage)"
                    align="end" [innerHTML]="options?.description"></mat-hint>
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      </mat-form-field>
      <mat-datepicker #picker></mat-datepicker>
      <mat-error *ngIf="options?.showErrors && options?.errorMessage"
                 [innerHTML]="options?.errorMessage"></mat-error>`, styles: ["mat-error{font-size:75%;margin-top:-1rem;margin-bottom:.5rem}::ng-deep mat-form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix{width:initial}\n"] }]
    }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGF0ZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLW1hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsvc3JjL2xpYi9jb21wb25lbnRzL21hdGVyaWFsLWRhdGVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFvQixNQUFNLGVBQWUsQ0FBQTtBQUVqRSxPQUFPLEVBQUMsWUFBWSxFQUFFLFlBQVksRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUN2RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQTs7Ozs7Ozs7O0lBTXBELDBCQUNzRTs7O0lBQWhFLHlLQUF3RDs7OztJQUMxRCxnQ0FhMEM7SUFBbkMsdUtBQVEsMkNBQXFCLElBQUksQ0FBQSxJQUFDO0lBYnpDLGlCQWEwQzs7OztJQURuQywrQkFBc0I7SUFYdEIsZ0RBQTJCLDhFQUFBLCtEQUFBLHNCQUFBLCtEQUFBLDRCQUFBLHFFQUFBLHFFQUFBO0lBQzNCLHFIQUFnRSxpR0FBQSwyRkFBQTs7OztJQVl2RSxpQ0FnQnFDO0lBRjlCLHdLQUFRLDJDQUFxQixJQUFJLENBQUEsSUFBQyxzS0FDeEIsZUFBQSwyQkFBbUIsQ0FBQSxJQURLLG9LQUV6QixlQUFBLDJCQUFtQixDQUFBLElBRk07SUFkekMsaUJBZ0JxQzs7OztJQUo5QiwrQkFBc0I7SUFSdEIsOEdBQWlELDhFQUFBLCtEQUFBLHNCQUFBLCtEQUFBLDRCQUFBLHFFQUFBLHFFQUFBLDJCQUFBO0lBSGpELHFIQUFnRSxpR0FBQSwyRkFBQTs7O0lBZ0J2RSwyQkFDdUU7OztJQUFqRSwwS0FBeUQ7OztJQUMvRCwrQkFDb0U7OztJQUE5Qyx5R0FBa0M7OztJQUk1RCxnQ0FDMkQ7OztJQUFoRCwwR0FBbUM7O0FBY3BELE1BQU0sT0FBTywyQkFBMkI7SUFhdEMsWUFDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQVRwQyxvQkFBZSxHQUFHLEtBQUssQ0FBQTtRQUN2QixpQkFBWSxHQUFHLEtBQUssQ0FBQTtRQUVwQixxQkFBZ0IsR0FBYSxFQUFFLENBQUE7SUFRL0IsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDeEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDbEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUE7U0FDcEQ7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ3hDLENBQUM7SUFFRCxjQUFjLENBQUMsVUFBa0I7UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDM0MsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFLO1FBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFBO1FBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBQy9ELENBQUM7O3NHQXRDVSwyQkFBMkI7Z0VBQTNCLDJCQUEyQjtRQXhEbEMsc0NBQXVDO1FBQ3ZDLDhFQUNzRTtRQUNsRSxpRkFhMEM7UUFDMUMsaUZBZ0JxQztRQUNyQyw4RUFDdUU7UUFDdkUsc0ZBQ29FO1FBQ3BFLDJDQUF3RTtRQUM1RSxpQkFBaUI7UUFDakIsMENBQXlDO1FBQ3pDLHdGQUMyRDs7O1FBMUMzQywrQkFBc0I7UUFDckIsZUFBZ0Q7UUFBaEQscUlBQWdEO1FBRTVDLGVBQWtCO1FBQWxCLHVDQUFrQjtRQWNsQixlQUFtQjtRQUFuQix3Q0FBbUI7UUFpQm5CLGVBQWlEO1FBQWpELHNJQUFpRDtRQUV2RCxlQUE4RTtRQUE5RSxxTUFBOEU7UUFFeEQsZUFBYztRQUFkLHlCQUFjO1FBR3ZDLGVBQWtEO1FBQWxELHVJQUFrRDs7dUZBZXZELDJCQUEyQjtjQTNEdkMsU0FBUzsyQkFDRSw0QkFBNEIsWUFDNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0VBMkNzRDt3RUF1QnZELFVBQVU7a0JBQWxCLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXG5pbXBvcnQge2RhdGVUb1N0cmluZywgc3RyaW5nVG9EYXRlfSBmcm9tICdAbmdzZi9jb21tb24nXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnQG5nc2Yvd2lkZ2V0LWxpYnJhcnknXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdGVyaWFsLWRhdGVwaWNrZXItd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxtYXQtZm9ybS1maWVsZCBbc3R5bGUud2lkdGhdPVwiJzEwMCUnXCI+XG4gICAgICA8c3BhbiBtYXRQcmVmaXggKm5nSWY9XCJvcHRpb25zPy5wcmVmaXggfHwgb3B0aW9ucz8uZmllbGRBZGRvbkxlZnRcIlxuICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5wcmVmaXggfHwgb3B0aW9ucz8uZmllbGRBZGRvbkxlZnRcIj48L3NwYW4+XG4gICAgICAgICAgPGlucHV0IG1hdElucHV0ICpuZ0lmPVwiYm91bmRDb250cm9sXCJcbiAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnU3RhdHVzJ1wiXG4gICAgICAgICAgICAgICAgIFthdHRyLmxpc3RdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ0F1dG9jb21wbGV0ZSdcIlxuICAgICAgICAgICAgICAgICBbYXR0ci5yZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgICAgICAgICAgIFttYXhdPVwib3B0aW9ucz8ubWF4aW11bVwiXG4gICAgICAgICAgICAgICAgIFttYXREYXRlcGlja2VyXT1cInBpY2tlclwiXG4gICAgICAgICAgICAgICAgIFttaW5dPVwib3B0aW9ucz8ubWluaW11bVwiXG4gICAgICAgICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cIm9wdGlvbnM/LnRpdGxlXCJcbiAgICAgICAgICAgICAgICAgW3JlcXVpcmVkXT1cIm9wdGlvbnM/LnJlcXVpcmVkXCJcbiAgICAgICAgICAgICAgICAgW3N0eWxlLndpZHRoXT1cIicxMDAlJ1wiXG4gICAgICAgICAgICAgICAgIChibHVyKT1cIm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWVcIj5cbiAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgKm5nSWY9XCIhYm91bmRDb250cm9sXCJcbiAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnU3RhdHVzJ1wiXG4gICAgICAgICAgICAgICAgIFthdHRyLmxpc3RdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ0F1dG9jb21wbGV0ZSdcIlxuICAgICAgICAgICAgICAgICBbYXR0ci5yZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImNvbnRyb2xEaXNhYmxlZCB8fCBvcHRpb25zPy5yZWFkb25seVwiXG4gICAgICAgICAgICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICAgICAgICAgICBbbWF4XT1cIm9wdGlvbnM/Lm1heGltdW1cIlxuICAgICAgICAgICAgICAgICBbbWF0RGF0ZXBpY2tlcl09XCJwaWNrZXJcIlxuICAgICAgICAgICAgICAgICBbbWluXT1cIm9wdGlvbnM/Lm1pbmltdW1cIlxuICAgICAgICAgICAgICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJvcHRpb25zPy50aXRsZVwiXG4gICAgICAgICAgICAgICAgIFtyZXF1aXJlZF09XCJvcHRpb25zPy5yZXF1aXJlZFwiXG4gICAgICAgICAgICAgICAgIFtzdHlsZS53aWR0aF09XCInMTAwJSdcIlxuICAgICAgICAgICAgICAgICBbdmFsdWVdPVwiZGF0ZVZhbHVlXCJcbiAgICAgICAgICAgICAgICAgKGJsdXIpPVwib3B0aW9ucy5zaG93RXJyb3JzID0gdHJ1ZVwiXG4gICAgICAgICAgICAgICAgIChjaGFuZ2UpPVwidXBkYXRlVmFsdWUoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgIChpbnB1dCk9XCJ1cGRhdGVWYWx1ZSgkZXZlbnQpXCI+XG4gICAgICAgICAgPHNwYW4gbWF0U3VmZml4ICpuZ0lmPVwib3B0aW9ucz8uc3VmZml4IHx8IG9wdGlvbnM/LmZpZWxkQWRkb25SaWdodFwiXG4gICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5zdWZmaXggfHwgb3B0aW9ucz8uZmllbGRBZGRvblJpZ2h0XCI+PC9zcGFuPlxuICAgICAgICAgIDxtYXQtaGludCAqbmdJZj1cIm9wdGlvbnM/LmRlc2NyaXB0aW9uICYmICghb3B0aW9ucz8uc2hvd0Vycm9ycyB8fCAhb3B0aW9ucz8uZXJyb3JNZXNzYWdlKVwiXG4gICAgICAgICAgICAgICAgICAgIGFsaWduPVwiZW5kXCIgW2lubmVySFRNTF09XCJvcHRpb25zPy5kZXNjcmlwdGlvblwiPjwvbWF0LWhpbnQ+XG4gICAgICAgICAgPG1hdC1kYXRlcGlja2VyLXRvZ2dsZSBtYXRTdWZmaXggW2Zvcl09XCJwaWNrZXJcIj48L21hdC1kYXRlcGlja2VyLXRvZ2dsZT5cbiAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICA8bWF0LWRhdGVwaWNrZXIgI3BpY2tlcj48L21hdC1kYXRlcGlja2VyPlxuICAgICAgPG1hdC1lcnJvciAqbmdJZj1cIm9wdGlvbnM/LnNob3dFcnJvcnMgJiYgb3B0aW9ucz8uZXJyb3JNZXNzYWdlXCJcbiAgICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5lcnJvck1lc3NhZ2VcIj48L21hdC1lcnJvcj5gLFxuICBzdHlsZXM6IFtgXG4gICAgICBtYXQtZXJyb3Ige1xuICAgICAgICAgIGZvbnQtc2l6ZTogNzUlO1xuICAgICAgICAgIG1hcmdpbi10b3A6IC0xcmVtO1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbiAgICAgIH1cblxuICAgICAgOjpuZy1kZWVwIG1hdC1mb3JtLWZpZWxkIC5tYXQtZm9ybS1maWVsZC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1mbGV4XG4gICAgICAubWF0LWZvcm0tZmllbGQtaW5maXgge1xuICAgICAgICAgIHdpZHRoOiBpbml0aWFsO1xuICAgICAgfVxuICBgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxEYXRlcGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sXG4gIGNvbnRyb2xOYW1lOiBzdHJpbmdcbiAgY29udHJvbFZhbHVlOiBhbnlcbiAgZGF0ZVZhbHVlOiBhbnlcbiAgY29udHJvbERpc2FibGVkID0gZmFsc2VcbiAgYm91bmRDb250cm9sID0gZmFsc2VcbiAgb3B0aW9uczogYW55XG4gIGF1dG9Db21wbGV0ZUxpc3Q6IHN0cmluZ1tdID0gW11cbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9XG4gICAgdGhpcy5qc2YuaW5pdGlhbGl6ZUNvbnRyb2wodGhpcywgIXRoaXMub3B0aW9ucy5yZWFkb25seSlcbiAgICB0aGlzLnNldENvbnRyb2xEYXRlKHRoaXMuY29udHJvbFZhbHVlKVxuICAgIGlmICghdGhpcy5vcHRpb25zLm5vdGl0bGUgJiYgIXRoaXMub3B0aW9ucy5kZXNjcmlwdGlvbiAmJiB0aGlzLm9wdGlvbnMucGxhY2Vob2xkZXIpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5kZXNjcmlwdGlvbiA9IHRoaXMub3B0aW9ucy5wbGFjZWhvbGRlclxuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuc2V0Q29udHJvbERhdGUodGhpcy5jb250cm9sVmFsdWUpXG4gIH1cblxuICBzZXRDb250cm9sRGF0ZShkYXRlU3RyaW5nOiBzdHJpbmcpIHtcbiAgICB0aGlzLmRhdGVWYWx1ZSA9IHN0cmluZ1RvRGF0ZShkYXRlU3RyaW5nKVxuICB9XG5cbiAgdXBkYXRlVmFsdWUoZXZlbnQpIHtcbiAgICB0aGlzLm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWVcbiAgICB0aGlzLmpzZi51cGRhdGVWYWx1ZSh0aGlzLCBkYXRlVG9TdHJpbmcoZXZlbnQsIHRoaXMub3B0aW9ucykpXG4gIH1cbn1cbiJdfQ==