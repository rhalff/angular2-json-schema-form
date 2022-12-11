import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '@ngsf/widget-library';
import * as i0 from "@angular/core";
import * as i1 from "@ngsf/widget-library";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/material/autocomplete";
import * as i5 from "@angular/material/core";
import * as i6 from "@angular/material/form-field";
import * as i7 from "@angular/material/input";
function MaterialInputComponent_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 8);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", (ctx_r0.options == null ? null : ctx_r0.options.prefix) || (ctx_r0.options == null ? null : ctx_r0.options.fieldAddonLeft), i0.ɵɵsanitizeHtml);
} }
function MaterialInputComponent_input_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 9);
    i0.ɵɵlistener("blur", function MaterialInputComponent_input_2_Template_input_blur_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.options.showErrors = true); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("width", "100%");
    i0.ɵɵproperty("formControl", ctx_r1.formControl)("readonly", (ctx_r1.options == null ? null : ctx_r1.options.readonly) ? "readonly" : null)("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id))("name", ctx_r1.controlName)("placeholder", (ctx_r1.options == null ? null : ctx_r1.options.notitle) ? ctx_r1.options == null ? null : ctx_r1.options.placeholder : ctx_r1.options == null ? null : ctx_r1.options.title)("required", ctx_r1.options == null ? null : ctx_r1.options.required)("type", ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode.type);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Status")("list", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Autocomplete")("maxlength", ctx_r1.options == null ? null : ctx_r1.options.maxLength)("minlength", ctx_r1.options == null ? null : ctx_r1.options.minLength)("pattern", ctx_r1.options == null ? null : ctx_r1.options.pattern);
} }
function MaterialInputComponent_input_3_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 10);
    i0.ɵɵlistener("input", function MaterialInputComponent_input_3_Template_input_input_0_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r9.updateValue($event)); })("blur", function MaterialInputComponent_input_3_Template_input_blur_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r11 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r11.options.showErrors = true); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("width", "100%");
    i0.ɵɵproperty("disabled", ctx_r2.controlDisabled)("id", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id))("name", ctx_r2.controlName)("placeholder", (ctx_r2.options == null ? null : ctx_r2.options.notitle) ? ctx_r2.options == null ? null : ctx_r2.options.placeholder : ctx_r2.options == null ? null : ctx_r2.options.title)("readonly", (ctx_r2.options == null ? null : ctx_r2.options.readonly) ? "readonly" : null)("required", ctx_r2.options == null ? null : ctx_r2.options.required)("type", ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode.type)("value", ctx_r2.controlValue);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Status")("list", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Autocomplete")("maxlength", ctx_r2.options == null ? null : ctx_r2.options.maxLength)("minlength", ctx_r2.options == null ? null : ctx_r2.options.minLength)("pattern", ctx_r2.options == null ? null : ctx_r2.options.pattern);
} }
function MaterialInputComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 11);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", (ctx_r3.options == null ? null : ctx_r3.options.suffix) || (ctx_r3.options == null ? null : ctx_r3.options.fieldAddonRight), i0.ɵɵsanitizeHtml);
} }
function MaterialInputComponent_mat_hint_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-hint", 12);
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r4.options == null ? null : ctx_r4.options.description, i0.ɵɵsanitizeHtml);
} }
function MaterialInputComponent_mat_autocomplete_6_mat_option_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const word_r13 = ctx.$implicit;
    i0.ɵɵproperty("value", word_r13);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(word_r13);
} }
function MaterialInputComponent_mat_autocomplete_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-autocomplete");
    i0.ɵɵtemplate(1, MaterialInputComponent_mat_autocomplete_6_mat_option_1_Template, 2, 2, "mat-option", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r5.options == null ? null : ctx_r5.options.typeahead == null ? null : ctx_r5.options.typeahead.source);
} }
function MaterialInputComponent_mat_error_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-error", 15);
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r6.options == null ? null : ctx_r6.options.errorMessage, i0.ɵɵsanitizeHtml);
} }
export class MaterialInputComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.autoCompleteList = [];
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (!this.options.notitle && !this.options.description && this.options.placeholder) {
            this.options.description = this.options.placeholder;
        }
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
}
MaterialInputComponent.ɵfac = function MaterialInputComponent_Factory(t) { return new (t || MaterialInputComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialInputComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialInputComponent, selectors: [["material-input-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 8, vars: 12, consts: [[3, "floatLabel"], ["matPrefix", "", 3, "innerHTML", 4, "ngIf"], ["matInput", "", 3, "formControl", "readonly", "id", "name", "placeholder", "required", "width", "type", "blur", 4, "ngIf"], ["matInput", "", 3, "disabled", "id", "name", "placeholder", "readonly", "required", "width", "type", "value", "input", "blur", 4, "ngIf"], ["matSuffix", "", 3, "innerHTML", 4, "ngIf"], ["align", "end", 3, "innerHTML", 4, "ngIf"], [4, "ngIf"], [3, "innerHTML", 4, "ngIf"], ["matPrefix", "", 3, "innerHTML"], ["matInput", "", 3, "formControl", "readonly", "id", "name", "placeholder", "required", "type", "blur"], ["matInput", "", 3, "disabled", "id", "name", "placeholder", "readonly", "required", "type", "value", "input", "blur"], ["matSuffix", "", 3, "innerHTML"], ["align", "end", 3, "innerHTML"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], [3, "innerHTML"]], template: function MaterialInputComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "mat-form-field", 0);
        i0.ɵɵtemplate(1, MaterialInputComponent_span_1_Template, 1, 1, "span", 1);
        i0.ɵɵtemplate(2, MaterialInputComponent_input_2_Template, 1, 14, "input", 2);
        i0.ɵɵtemplate(3, MaterialInputComponent_input_3_Template, 1, 15, "input", 3);
        i0.ɵɵtemplate(4, MaterialInputComponent_span_4_Template, 1, 1, "span", 4);
        i0.ɵɵtemplate(5, MaterialInputComponent_mat_hint_5_Template, 1, 1, "mat-hint", 5);
        i0.ɵɵtemplate(6, MaterialInputComponent_mat_autocomplete_6_Template, 2, 1, "mat-autocomplete", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(7, MaterialInputComponent_mat_error_7_Template, 1, 1, "mat-error", 7);
    } if (rf & 2) {
        i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.htmlClass) || "");
        i0.ɵɵstyleProp("width", "100%");
        i0.ɵɵproperty("floatLabel", (ctx.options == null ? null : ctx.options.floatPlaceholder) || ((ctx.options == null ? null : ctx.options.notitle) ? "never" : "auto"));
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
        i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.typeahead == null ? null : ctx.options.typeahead.source);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.showErrors) && (ctx.options == null ? null : ctx.options.errorMessage));
    } }, dependencies: [i2.NgForOf, i2.NgIf, i3.DefaultValueAccessor, i3.NgControlStatus, i3.RequiredValidator, i3.MinLengthValidator, i3.MaxLengthValidator, i3.PatternValidator, i3.FormControlDirective, i4.MatAutocomplete, i5.MatOption, i6.MatFormField, i6.MatHint, i6.MatError, i6.MatPrefix, i6.MatSuffix, i7.MatInput], styles: ["mat-error[_ngcontent-%COMP%]{font-size:75%;margin-top:-1rem;margin-bottom:.5rem}  mat-form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix{width:initial}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialInputComponent, [{
        type: Component,
        args: [{ selector: 'material-input-widget', template: `
      <mat-form-field
              [class]="options?.htmlClass || ''"
              [floatLabel]="options?.floatPlaceholder || (options?.notitle ? 'never' : 'auto')"
              [style.width]="'100%'">
      <span matPrefix *ngIf="options?.prefix || options?.fieldAddonLeft"
            [innerHTML]="options?.prefix || options?.fieldAddonLeft"></span>
          <input matInput *ngIf="boundControl"
                 [formControl]="formControl"
                 [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                 [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
                 [attr.maxlength]="options?.maxLength"
                 [attr.minlength]="options?.minLength"
                 [attr.pattern]="options?.pattern"
                 [readonly]="options?.readonly ? 'readonly' : null"
                 [id]="'control' + layoutNode?._id"
                 [name]="controlName"
                 [placeholder]="options?.notitle ? options?.placeholder : options?.title"
                 [required]="options?.required"
                 [style.width]="'100%'"
                 [type]="layoutNode?.type"
                 (blur)="options.showErrors = true">
          <input matInput *ngIf="!boundControl"
                 [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                 [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
                 [attr.maxlength]="options?.maxLength"
                 [attr.minlength]="options?.minLength"
                 [attr.pattern]="options?.pattern"
                 [disabled]="controlDisabled"
                 [id]="'control' + layoutNode?._id"
                 [name]="controlName"
                 [placeholder]="options?.notitle ? options?.placeholder : options?.title"
                 [readonly]="options?.readonly ? 'readonly' : null"
                 [required]="options?.required"
                 [style.width]="'100%'"
                 [type]="layoutNode?.type"
                 [value]="controlValue"
                 (input)="updateValue($event)"
                 (blur)="options.showErrors = true">
          <span matSuffix *ngIf="options?.suffix || options?.fieldAddonRight"
                [innerHTML]="options?.suffix || options?.fieldAddonRight"></span>
          <mat-hint *ngIf="options?.description && (!options?.showErrors || !options?.errorMessage)"
                    align="end" [innerHTML]="options?.description"></mat-hint>
          <mat-autocomplete *ngIf="options?.typeahead?.source">
              <mat-option *ngFor="let word of options?.typeahead?.source"
                          [value]="word">{{word}}</mat-option>
          </mat-autocomplete>
      </mat-form-field>
      <mat-error *ngIf="options?.showErrors && options?.errorMessage"
                 [innerHTML]="options?.errorMessage"></mat-error>`, styles: ["mat-error{font-size:75%;margin-top:-1rem;margin-bottom:.5rem}::ng-deep mat-form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix{width:initial}\n"] }]
    }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmdzZi1tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrL3NyYy9saWIvY29tcG9uZW50cy9tYXRlcmlhbC1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUE7QUFFdEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7Ozs7Ozs7Ozs7SUFTcEQsMEJBQ3NFOzs7SUFBaEUseUtBQXdEOzs7O0lBQzFELGdDQWMwQztJQUFuQyxrS0FBUSwyQ0FBcUIsSUFBSSxDQUFBLElBQUM7SUFkekMsaUJBYzBDOzs7SUFGbkMsK0JBQXNCO0lBWHRCLGdEQUEyQiwyRkFBQSw4RUFBQSw0QkFBQSw2TEFBQSxxRUFBQSxtRUFBQTtJQUMzQixxSEFBZ0UsaUdBQUEsdUVBQUEsdUVBQUEsbUVBQUE7Ozs7SUFhdkUsaUNBZ0IwQztJQURuQywyS0FBUyxlQUFBLDBCQUFtQixDQUFBLElBQUMsdUpBQ3JCLDRDQUFxQixJQUFJLENBQUEsSUFESjtJQWZwQyxpQkFnQjBDOzs7SUFKbkMsK0JBQXNCO0lBTnRCLGlEQUE0Qiw4RUFBQSw0QkFBQSw2TEFBQSwyRkFBQSxxRUFBQSxtRUFBQSw4QkFBQTtJQUw1QixxSEFBZ0UsaUdBQUEsdUVBQUEsdUVBQUEsbUVBQUE7OztJQWdCdkUsMkJBQ3VFOzs7SUFBakUsMEtBQXlEOzs7SUFDL0QsK0JBQ29FOzs7SUFBOUMseUdBQWtDOzs7SUFFcEQsc0NBQzJCO0lBQUEsWUFBUTtJQUFBLGlCQUFhOzs7SUFBcEMsZ0NBQWM7SUFBQyxlQUFRO0lBQVIsOEJBQVE7OztJQUZ2Qyx3Q0FBcUQ7SUFDakQseUdBQ2dEO0lBQ3BELGlCQUFtQjs7O0lBRmMsZUFBNkI7SUFBN0IsbUlBQTZCOzs7SUFJbEUsZ0NBQzJEOzs7SUFBaEQsMEdBQW1DOztBQWNwRCxNQUFNLE9BQU8sc0JBQXNCO0lBWWpDLFlBQ1UsR0FBMEI7UUFBMUIsUUFBRyxHQUFILEdBQUcsQ0FBdUI7UUFUcEMsb0JBQWUsR0FBRyxLQUFLLENBQUE7UUFDdkIsaUJBQVksR0FBRyxLQUFLLENBQUE7UUFFcEIscUJBQWdCLEdBQWEsRUFBRSxDQUFBO0lBUS9CLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtZQUNsRixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQTtTQUNwRDtJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsS0FBSztRQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hELENBQUM7OzRGQTNCVSxzQkFBc0I7MkRBQXRCLHNCQUFzQjtRQTlEN0IseUNBRytCO1FBQy9CLHlFQUNzRTtRQUNsRSw0RUFjMEM7UUFDMUMsNEVBZ0IwQztRQUMxQyx5RUFDdUU7UUFDdkUsaUZBQ29FO1FBQ3BFLGlHQUdtQjtRQUN2QixpQkFBaUI7UUFDakIsbUZBQzJEOztRQS9DbkQseUVBQWtDO1FBRWxDLCtCQUFzQjtRQUR0QixtS0FBaUY7UUFFeEUsZUFBZ0Q7UUFBaEQscUlBQWdEO1FBRTVDLGVBQWtCO1FBQWxCLHVDQUFrQjtRQWVsQixlQUFtQjtRQUFuQix3Q0FBbUI7UUFpQm5CLGVBQWlEO1FBQWpELHNJQUFpRDtRQUV2RCxlQUE4RTtRQUE5RSxxTUFBOEU7UUFFdEUsZUFBZ0M7UUFBaEMsdUhBQWdDO1FBSzNDLGVBQWtEO1FBQWxELHVJQUFrRDs7dUZBZXZELHNCQUFzQjtjQWpFbEMsU0FBUzsyQkFDRSx1QkFBdUIsWUFDdkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0VBaURzRDt3RUFzQnZELFVBQVU7a0JBQWxCLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJ1xuaW1wb3J0IHtKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJ0BuZ3NmL3dpZGdldC1saWJyYXJ5J1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXRlcmlhbC1pbnB1dC13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPG1hdC1mb3JtLWZpZWxkXG4gICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5odG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICBbZmxvYXRMYWJlbF09XCJvcHRpb25zPy5mbG9hdFBsYWNlaG9sZGVyIHx8IChvcHRpb25zPy5ub3RpdGxlID8gJ25ldmVyJyA6ICdhdXRvJylcIlxuICAgICAgICAgICAgICBbc3R5bGUud2lkdGhdPVwiJzEwMCUnXCI+XG4gICAgICA8c3BhbiBtYXRQcmVmaXggKm5nSWY9XCJvcHRpb25zPy5wcmVmaXggfHwgb3B0aW9ucz8uZmllbGRBZGRvbkxlZnRcIlxuICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5wcmVmaXggfHwgb3B0aW9ucz8uZmllbGRBZGRvbkxlZnRcIj48L3NwYW4+XG4gICAgICAgICAgPGlucHV0IG1hdElucHV0ICpuZ0lmPVwiYm91bmRDb250cm9sXCJcbiAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnU3RhdHVzJ1wiXG4gICAgICAgICAgICAgICAgIFthdHRyLmxpc3RdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ0F1dG9jb21wbGV0ZSdcIlxuICAgICAgICAgICAgICAgICBbYXR0ci5tYXhsZW5ndGhdPVwib3B0aW9ucz8ubWF4TGVuZ3RoXCJcbiAgICAgICAgICAgICAgICAgW2F0dHIubWlubGVuZ3RoXT1cIm9wdGlvbnM/Lm1pbkxlbmd0aFwiXG4gICAgICAgICAgICAgICAgIFthdHRyLnBhdHRlcm5dPVwib3B0aW9ucz8ucGF0dGVyblwiXG4gICAgICAgICAgICAgICAgIFtyZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cIm9wdGlvbnM/Lm5vdGl0bGUgPyBvcHRpb25zPy5wbGFjZWhvbGRlciA6IG9wdGlvbnM/LnRpdGxlXCJcbiAgICAgICAgICAgICAgICAgW3JlcXVpcmVkXT1cIm9wdGlvbnM/LnJlcXVpcmVkXCJcbiAgICAgICAgICAgICAgICAgW3N0eWxlLndpZHRoXT1cIicxMDAlJ1wiXG4gICAgICAgICAgICAgICAgIFt0eXBlXT1cImxheW91dE5vZGU/LnR5cGVcIlxuICAgICAgICAgICAgICAgICAoYmx1cik9XCJvcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlXCI+XG4gICAgICAgICAgPGlucHV0IG1hdElucHV0ICpuZ0lmPVwiIWJvdW5kQ29udHJvbFwiXG4gICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ1N0YXR1cydcIlxuICAgICAgICAgICAgICAgICBbYXR0ci5saXN0XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdBdXRvY29tcGxldGUnXCJcbiAgICAgICAgICAgICAgICAgW2F0dHIubWF4bGVuZ3RoXT1cIm9wdGlvbnM/Lm1heExlbmd0aFwiXG4gICAgICAgICAgICAgICAgIFthdHRyLm1pbmxlbmd0aF09XCJvcHRpb25zPy5taW5MZW5ndGhcIlxuICAgICAgICAgICAgICAgICBbYXR0ci5wYXR0ZXJuXT1cIm9wdGlvbnM/LnBhdHRlcm5cIlxuICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbERpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cIm9wdGlvbnM/Lm5vdGl0bGUgPyBvcHRpb25zPy5wbGFjZWhvbGRlciA6IG9wdGlvbnM/LnRpdGxlXCJcbiAgICAgICAgICAgICAgICAgW3JlYWRvbmx5XT1cIm9wdGlvbnM/LnJlYWRvbmx5ID8gJ3JlYWRvbmx5JyA6IG51bGxcIlxuICAgICAgICAgICAgICAgICBbcmVxdWlyZWRdPVwib3B0aW9ucz8ucmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgICBbc3R5bGUud2lkdGhdPVwiJzEwMCUnXCJcbiAgICAgICAgICAgICAgICAgW3R5cGVdPVwibGF5b3V0Tm9kZT8udHlwZVwiXG4gICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJjb250cm9sVmFsdWVcIlxuICAgICAgICAgICAgICAgICAoaW5wdXQpPVwidXBkYXRlVmFsdWUoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgIChibHVyKT1cIm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWVcIj5cbiAgICAgICAgICA8c3BhbiBtYXRTdWZmaXggKm5nSWY9XCJvcHRpb25zPy5zdWZmaXggfHwgb3B0aW9ucz8uZmllbGRBZGRvblJpZ2h0XCJcbiAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LnN1ZmZpeCB8fCBvcHRpb25zPy5maWVsZEFkZG9uUmlnaHRcIj48L3NwYW4+XG4gICAgICAgICAgPG1hdC1oaW50ICpuZ0lmPVwib3B0aW9ucz8uZGVzY3JpcHRpb24gJiYgKCFvcHRpb25zPy5zaG93RXJyb3JzIHx8ICFvcHRpb25zPy5lcnJvck1lc3NhZ2UpXCJcbiAgICAgICAgICAgICAgICAgICAgYWxpZ249XCJlbmRcIiBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmRlc2NyaXB0aW9uXCI+PC9tYXQtaGludD5cbiAgICAgICAgICA8bWF0LWF1dG9jb21wbGV0ZSAqbmdJZj1cIm9wdGlvbnM/LnR5cGVhaGVhZD8uc291cmNlXCI+XG4gICAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCB3b3JkIG9mIG9wdGlvbnM/LnR5cGVhaGVhZD8uc291cmNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cIndvcmRcIj57e3dvcmR9fTwvbWF0LW9wdGlvbj5cbiAgICAgICAgICA8L21hdC1hdXRvY29tcGxldGU+XG4gICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgPG1hdC1lcnJvciAqbmdJZj1cIm9wdGlvbnM/LnNob3dFcnJvcnMgJiYgb3B0aW9ucz8uZXJyb3JNZXNzYWdlXCJcbiAgICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5lcnJvck1lc3NhZ2VcIj48L21hdC1lcnJvcj5gLFxuICBzdHlsZXM6IFtgXG4gICAgICBtYXQtZXJyb3Ige1xuICAgICAgICAgIGZvbnQtc2l6ZTogNzUlO1xuICAgICAgICAgIG1hcmdpbi10b3A6IC0xcmVtO1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbiAgICAgIH1cblxuICAgICAgOjpuZy1kZWVwIG1hdC1mb3JtLWZpZWxkIC5tYXQtZm9ybS1maWVsZC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1mbGV4XG4gICAgICAubWF0LWZvcm0tZmllbGQtaW5maXgge1xuICAgICAgICAgIHdpZHRoOiBpbml0aWFsO1xuICAgICAgfVxuICBgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2xcbiAgY29udHJvbE5hbWU6IHN0cmluZ1xuICBjb250cm9sVmFsdWU6IHN0cmluZ1xuICBjb250cm9sRGlzYWJsZWQgPSBmYWxzZVxuICBib3VuZENvbnRyb2wgPSBmYWxzZVxuICBvcHRpb25zOiBhbnlcbiAgYXV0b0NvbXBsZXRlTGlzdDogc3RyaW5nW10gPSBbXVxuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge31cbiAgICB0aGlzLmpzZi5pbml0aWFsaXplQ29udHJvbCh0aGlzKVxuICAgIGlmICghdGhpcy5vcHRpb25zLm5vdGl0bGUgJiYgIXRoaXMub3B0aW9ucy5kZXNjcmlwdGlvbiAmJiB0aGlzLm9wdGlvbnMucGxhY2Vob2xkZXIpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5kZXNjcmlwdGlvbiA9IHRoaXMub3B0aW9ucy5wbGFjZWhvbGRlclxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKGV2ZW50KSB7XG4gICAgdGhpcy5qc2YudXBkYXRlVmFsdWUodGhpcywgZXZlbnQudGFyZ2V0LnZhbHVlKVxuICB9XG59XG4iXX0=