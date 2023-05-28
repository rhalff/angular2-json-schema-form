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
class MaterialDatepickerComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    dateValue;
    controlDisabled = false;
    boundControl = false;
    options;
    autoCompleteList = [];
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
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
    static ɵfac = function MaterialDatepickerComponent_Factory(t) { return new (t || MaterialDatepickerComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
    static ɵcmp = i0.ɵɵdefineComponent({ type: MaterialDatepickerComponent, selectors: [["material-datepicker-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, features: [i0.ɵɵNgOnChangesFeature], decls: 10, vars: 9, consts: [["matPrefix", "", 3, "innerHTML", 4, "ngIf"], ["matInput", "", 3, "formControl", "id", "max", "matDatepicker", "min", "name", "placeholder", "required", "width", "blur", 4, "ngIf"], ["matInput", "", 3, "disabled", "id", "max", "matDatepicker", "min", "name", "placeholder", "required", "width", "value", "blur", "change", "input", 4, "ngIf"], ["matSuffix", "", 3, "innerHTML", 4, "ngIf"], ["align", "end", 3, "innerHTML", 4, "ngIf"], ["matSuffix", "", 3, "for"], ["picker", ""], [3, "innerHTML", 4, "ngIf"], ["matPrefix", "", 3, "innerHTML"], ["matInput", "", 3, "formControl", "id", "max", "matDatepicker", "min", "name", "placeholder", "required", "blur"], ["matInput", "", 3, "disabled", "id", "max", "matDatepicker", "min", "name", "placeholder", "required", "value", "blur", "change", "input"], ["matSuffix", "", 3, "innerHTML"], ["align", "end", 3, "innerHTML"], [3, "innerHTML"]], template: function MaterialDatepickerComponent_Template(rf, ctx) { if (rf & 1) {
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
}
export { MaterialDatepickerComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGF0ZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLW1hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsvc3JjL2xpYi9jb21wb25lbnRzL21hdGVyaWFsLWRhdGVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFvQixNQUFNLGVBQWUsQ0FBQTtBQUVqRSxPQUFPLEVBQUMsWUFBWSxFQUFFLFlBQVksRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUN2RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQTs7Ozs7Ozs7O0lBTXBELDBCQUNzRTs7O0lBQWhFLHlLQUF3RDs7OztJQUMxRCxnQ0FhMEM7SUFBbkMsdUtBQVEsMkNBQXFCLElBQUksQ0FBQSxJQUFDO0lBYnpDLGlCQWEwQzs7OztJQURuQywrQkFBc0I7SUFYdEIsZ0RBQTJCLDhFQUFBLCtEQUFBLHNCQUFBLCtEQUFBLDRCQUFBLHFFQUFBLHFFQUFBO0lBQzNCLHFIQUFnRSxpR0FBQSwyRkFBQTs7OztJQVl2RSxpQ0FnQnFDO0lBRjlCLHdLQUFRLDJDQUFxQixJQUFJLENBQUEsSUFBQyxzS0FDeEIsZUFBQSwyQkFBbUIsQ0FBQSxJQURLLG9LQUV6QixlQUFBLDJCQUFtQixDQUFBLElBRk07SUFkekMsaUJBZ0JxQzs7OztJQUo5QiwrQkFBc0I7SUFSdEIsOEdBQWlELDhFQUFBLCtEQUFBLHNCQUFBLCtEQUFBLDRCQUFBLHFFQUFBLHFFQUFBLDJCQUFBO0lBSGpELHFIQUFnRSxpR0FBQSwyRkFBQTs7O0lBZ0J2RSwyQkFDdUU7OztJQUFqRSwwS0FBeUQ7OztJQUMvRCwrQkFDb0U7OztJQUE5Qyx5R0FBa0M7OztJQUk1RCxnQ0FDMkQ7OztJQUFoRCwwR0FBbUM7O0FBN0NwRCxNQTJEYSwyQkFBMkI7SUFjNUI7SUFiVixXQUFXLENBQWlCO0lBQzVCLFdBQVcsQ0FBUTtJQUNuQixZQUFZLENBQUs7SUFDakIsU0FBUyxDQUFLO0lBQ2QsZUFBZSxHQUFHLEtBQUssQ0FBQTtJQUN2QixZQUFZLEdBQUcsS0FBSyxDQUFBO0lBQ3BCLE9BQU8sQ0FBSztJQUNaLGdCQUFnQixHQUFhLEVBQUUsQ0FBQTtJQUN0QixVQUFVLENBQUs7SUFDZixXQUFXLENBQVU7SUFDckIsU0FBUyxDQUFVO0lBRTVCLFlBQ1UsR0FBMEI7UUFBMUIsUUFBRyxHQUFILEdBQUcsQ0FBdUI7SUFFcEMsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDeEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDbEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUE7U0FDcEQ7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ3hDLENBQUM7SUFFRCxjQUFjLENBQUMsVUFBa0I7UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDM0MsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFLO1FBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFBO1FBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBQy9ELENBQUM7cUZBdENVLDJCQUEyQjsrQ0FBM0IsMkJBQTJCO1lBeERsQyxzQ0FBdUM7WUFDdkMsOEVBQ3NFO1lBQ2xFLGlGQWEwQztZQUMxQyxpRkFnQnFDO1lBQ3JDLDhFQUN1RTtZQUN2RSxzRkFDb0U7WUFDcEUsMkNBQXdFO1lBQzVFLGlCQUFpQjtZQUNqQiwwQ0FBeUM7WUFDekMsd0ZBQzJEOzs7WUExQzNDLCtCQUFzQjtZQUNyQixlQUFnRDtZQUFoRCxxSUFBZ0Q7WUFFNUMsZUFBa0I7WUFBbEIsdUNBQWtCO1lBY2xCLGVBQW1CO1lBQW5CLHdDQUFtQjtZQWlCbkIsZUFBaUQ7WUFBakQsc0lBQWlEO1lBRXZELGVBQThFO1lBQTlFLHFNQUE4RTtZQUV4RCxlQUFjO1lBQWQseUJBQWM7WUFHdkMsZUFBa0Q7WUFBbEQsdUlBQWtEOzs7U0FldkQsMkJBQTJCO3VGQUEzQiwyQkFBMkI7Y0EzRHZDLFNBQVM7MkJBQ0UsNEJBQTRCLFlBQzVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tFQTJDc0Q7d0VBdUJ2RCxVQUFVO2tCQUFsQixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJ1xuaW1wb3J0IHtkYXRlVG9TdHJpbmcsIHN0cmluZ1RvRGF0ZX0gZnJvbSAnQG5nc2YvY29tbW9uJ1xuaW1wb3J0IHtKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJ0BuZ3NmL3dpZGdldC1saWJyYXJ5J1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXRlcmlhbC1kYXRlcGlja2VyLXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8bWF0LWZvcm0tZmllbGQgW3N0eWxlLndpZHRoXT1cIicxMDAlJ1wiPlxuICAgICAgPHNwYW4gbWF0UHJlZml4ICpuZ0lmPVwib3B0aW9ucz8ucHJlZml4IHx8IG9wdGlvbnM/LmZpZWxkQWRkb25MZWZ0XCJcbiAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8ucHJlZml4IHx8IG9wdGlvbnM/LmZpZWxkQWRkb25MZWZ0XCI+PC9zcGFuPlxuICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCAqbmdJZj1cImJvdW5kQ29udHJvbFwiXG4gICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiXG4gICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ1N0YXR1cydcIlxuICAgICAgICAgICAgICAgICBbYXR0ci5saXN0XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdBdXRvY29tcGxldGUnXCJcbiAgICAgICAgICAgICAgICAgW2F0dHIucmVhZG9ubHldPVwib3B0aW9ucz8ucmVhZG9ubHkgPyAncmVhZG9ubHknIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICAgICAgICAgICBbbWF4XT1cIm9wdGlvbnM/Lm1heGltdW1cIlxuICAgICAgICAgICAgICAgICBbbWF0RGF0ZXBpY2tlcl09XCJwaWNrZXJcIlxuICAgICAgICAgICAgICAgICBbbWluXT1cIm9wdGlvbnM/Lm1pbmltdW1cIlxuICAgICAgICAgICAgICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJvcHRpb25zPy50aXRsZVwiXG4gICAgICAgICAgICAgICAgIFtyZXF1aXJlZF09XCJvcHRpb25zPy5yZXF1aXJlZFwiXG4gICAgICAgICAgICAgICAgIFtzdHlsZS53aWR0aF09XCInMTAwJSdcIlxuICAgICAgICAgICAgICAgICAoYmx1cik9XCJvcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlXCI+XG4gICAgICAgICAgPGlucHV0IG1hdElucHV0ICpuZ0lmPVwiIWJvdW5kQ29udHJvbFwiXG4gICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ1N0YXR1cydcIlxuICAgICAgICAgICAgICAgICBbYXR0ci5saXN0XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdBdXRvY29tcGxldGUnXCJcbiAgICAgICAgICAgICAgICAgW2F0dHIucmVhZG9ubHldPVwib3B0aW9ucz8ucmVhZG9ubHkgPyAncmVhZG9ubHknIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJjb250cm9sRGlzYWJsZWQgfHwgb3B0aW9ucz8ucmVhZG9ubHlcIlxuICAgICAgICAgICAgICAgICBbaWRdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkXCJcbiAgICAgICAgICAgICAgICAgW21heF09XCJvcHRpb25zPy5tYXhpbXVtXCJcbiAgICAgICAgICAgICAgICAgW21hdERhdGVwaWNrZXJdPVwicGlja2VyXCJcbiAgICAgICAgICAgICAgICAgW21pbl09XCJvcHRpb25zPy5taW5pbXVtXCJcbiAgICAgICAgICAgICAgICAgW25hbWVdPVwiY29udHJvbE5hbWVcIlxuICAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwib3B0aW9ucz8udGl0bGVcIlxuICAgICAgICAgICAgICAgICBbcmVxdWlyZWRdPVwib3B0aW9ucz8ucmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgICBbc3R5bGUud2lkdGhdPVwiJzEwMCUnXCJcbiAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cImRhdGVWYWx1ZVwiXG4gICAgICAgICAgICAgICAgIChibHVyKT1cIm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWVcIlxuICAgICAgICAgICAgICAgICAoY2hhbmdlKT1cInVwZGF0ZVZhbHVlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAoaW5wdXQpPVwidXBkYXRlVmFsdWUoJGV2ZW50KVwiPlxuICAgICAgICAgIDxzcGFuIG1hdFN1ZmZpeCAqbmdJZj1cIm9wdGlvbnM/LnN1ZmZpeCB8fCBvcHRpb25zPy5maWVsZEFkZG9uUmlnaHRcIlxuICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uc3VmZml4IHx8IG9wdGlvbnM/LmZpZWxkQWRkb25SaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICA8bWF0LWhpbnQgKm5nSWY9XCJvcHRpb25zPy5kZXNjcmlwdGlvbiAmJiAoIW9wdGlvbnM/LnNob3dFcnJvcnMgfHwgIW9wdGlvbnM/LmVycm9yTWVzc2FnZSlcIlxuICAgICAgICAgICAgICAgICAgICBhbGlnbj1cImVuZFwiIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZGVzY3JpcHRpb25cIj48L21hdC1oaW50PlxuICAgICAgICAgIDxtYXQtZGF0ZXBpY2tlci10b2dnbGUgbWF0U3VmZml4IFtmb3JdPVwicGlja2VyXCI+PC9tYXQtZGF0ZXBpY2tlci10b2dnbGU+XG4gICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgPG1hdC1kYXRlcGlja2VyICNwaWNrZXI+PC9tYXQtZGF0ZXBpY2tlcj5cbiAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJvcHRpb25zPy5zaG93RXJyb3JzICYmIG9wdGlvbnM/LmVycm9yTWVzc2FnZVwiXG4gICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZXJyb3JNZXNzYWdlXCI+PC9tYXQtZXJyb3I+YCxcbiAgc3R5bGVzOiBbYFxuICAgICAgbWF0LWVycm9yIHtcbiAgICAgICAgICBmb250LXNpemU6IDc1JTtcbiAgICAgICAgICBtYXJnaW4tdG9wOiAtMXJlbTtcbiAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG4gICAgICB9XG5cbiAgICAgIDo6bmctZGVlcCBtYXQtZm9ybS1maWVsZCAubWF0LWZvcm0tZmllbGQtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtZmxleFxuICAgICAgLm1hdC1mb3JtLWZpZWxkLWluZml4IHtcbiAgICAgICAgICB3aWR0aDogaW5pdGlhbDtcbiAgICAgIH1cbiAgYF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsRGF0ZXBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbFxuICBjb250cm9sTmFtZTogc3RyaW5nXG4gIGNvbnRyb2xWYWx1ZTogYW55XG4gIGRhdGVWYWx1ZTogYW55XG4gIGNvbnRyb2xEaXNhYmxlZCA9IGZhbHNlXG4gIGJvdW5kQ29udHJvbCA9IGZhbHNlXG4gIG9wdGlvbnM6IGFueVxuICBhdXRvQ29tcGxldGVMaXN0OiBzdHJpbmdbXSA9IFtdXG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmxheW91dE5vZGUub3B0aW9ucyB8fCB7fVxuICAgIHRoaXMuanNmLmluaXRpYWxpemVDb250cm9sKHRoaXMsICF0aGlzLm9wdGlvbnMucmVhZG9ubHkpXG4gICAgdGhpcy5zZXRDb250cm9sRGF0ZSh0aGlzLmNvbnRyb2xWYWx1ZSlcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5ub3RpdGxlICYmICF0aGlzLm9wdGlvbnMuZGVzY3JpcHRpb24gJiYgdGhpcy5vcHRpb25zLnBsYWNlaG9sZGVyKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZGVzY3JpcHRpb24gPSB0aGlzLm9wdGlvbnMucGxhY2Vob2xkZXJcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLnNldENvbnRyb2xEYXRlKHRoaXMuY29udHJvbFZhbHVlKVxuICB9XG5cbiAgc2V0Q29udHJvbERhdGUoZGF0ZVN0cmluZzogc3RyaW5nKSB7XG4gICAgdGhpcy5kYXRlVmFsdWUgPSBzdHJpbmdUb0RhdGUoZGF0ZVN0cmluZylcbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKGV2ZW50KSB7XG4gICAgdGhpcy5vcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlXG4gICAgdGhpcy5qc2YudXBkYXRlVmFsdWUodGhpcywgZGF0ZVRvU3RyaW5nKGV2ZW50LCB0aGlzLm9wdGlvbnMpKVxuICB9XG59XG4iXX0=