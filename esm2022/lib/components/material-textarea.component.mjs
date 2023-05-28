import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '@ngsf/widget-library';
import * as i0 from "@angular/core";
import * as i1 from "@ngsf/widget-library";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/material/form-field";
import * as i5 from "@angular/material/input";
function MaterialTextareaComponent_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 7);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", (ctx_r0.options == null ? null : ctx_r0.options.prefix) || (ctx_r0.options == null ? null : ctx_r0.options.fieldAddonLeft), i0.ɵɵsanitizeHtml);
} }
function MaterialTextareaComponent_textarea_2_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "textarea", 8);
    i0.ɵɵlistener("blur", function MaterialTextareaComponent_textarea_2_Template_textarea_blur_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r6 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r6.options.showErrors = true); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("width", "100%");
    i0.ɵɵproperty("formControl", ctx_r1.formControl)("required", ctx_r1.options == null ? null : ctx_r1.options.required)("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id))("name", ctx_r1.controlName)("placeholder", (ctx_r1.options == null ? null : ctx_r1.options.notitle) ? ctx_r1.options == null ? null : ctx_r1.options.placeholder : ctx_r1.options == null ? null : ctx_r1.options.title)("readonly", (ctx_r1.options == null ? null : ctx_r1.options.readonly) ? "readonly" : null);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Status")("list", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Autocomplete")("maxlength", ctx_r1.options == null ? null : ctx_r1.options.maxLength)("minlength", ctx_r1.options == null ? null : ctx_r1.options.minLength)("pattern", ctx_r1.options == null ? null : ctx_r1.options.pattern);
} }
function MaterialTextareaComponent_textarea_3_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "textarea", 9);
    i0.ɵɵlistener("input", function MaterialTextareaComponent_textarea_3_Template_textarea_input_0_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r8 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r8.updateValue($event)); })("blur", function MaterialTextareaComponent_textarea_3_Template_textarea_blur_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r10 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r10.options.showErrors = true); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("width", "100%");
    i0.ɵɵproperty("required", ctx_r2.options == null ? null : ctx_r2.options.required)("disabled", ctx_r2.controlDisabled)("id", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id))("name", ctx_r2.controlName)("placeholder", (ctx_r2.options == null ? null : ctx_r2.options.notitle) ? ctx_r2.options == null ? null : ctx_r2.options.placeholder : ctx_r2.options == null ? null : ctx_r2.options.title)("readonly", (ctx_r2.options == null ? null : ctx_r2.options.readonly) ? "readonly" : null)("value", ctx_r2.controlValue);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Status")("list", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Autocomplete")("maxlength", ctx_r2.options == null ? null : ctx_r2.options.maxLength)("minlength", ctx_r2.options == null ? null : ctx_r2.options.minLength)("pattern", ctx_r2.options == null ? null : ctx_r2.options.pattern);
} }
function MaterialTextareaComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 10);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", (ctx_r3.options == null ? null : ctx_r3.options.suffix) || (ctx_r3.options == null ? null : ctx_r3.options.fieldAddonRight), i0.ɵɵsanitizeHtml);
} }
function MaterialTextareaComponent_mat_hint_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-hint", 11);
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r4.options == null ? null : ctx_r4.options.description, i0.ɵɵsanitizeHtml);
} }
function MaterialTextareaComponent_mat_error_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-error", 12);
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r5.options == null ? null : ctx_r5.options.errorMessage, i0.ɵɵsanitizeHtml);
} }
class MaterialTextareaComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    controlDisabled = false;
    boundControl = false;
    options;
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
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
    static ɵfac = function MaterialTextareaComponent_Factory(t) { return new (t || MaterialTextareaComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
    static ɵcmp = i0.ɵɵdefineComponent({ type: MaterialTextareaComponent, selectors: [["material-textarea-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 7, vars: 11, consts: [[3, "floatLabel"], ["matPrefix", "", 3, "innerHTML", 4, "ngIf"], ["matInput", "", 3, "formControl", "required", "id", "name", "placeholder", "readonly", "width", "blur", 4, "ngIf"], ["matInput", "", 3, "required", "disabled", "id", "name", "placeholder", "readonly", "width", "value", "input", "blur", 4, "ngIf"], ["matSuffix", "", 3, "innerHTML", 4, "ngIf"], ["align", "end", 3, "innerHTML", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], ["matPrefix", "", 3, "innerHTML"], ["matInput", "", 3, "formControl", "required", "id", "name", "placeholder", "readonly", "blur"], ["matInput", "", 3, "required", "disabled", "id", "name", "placeholder", "readonly", "value", "input", "blur"], ["matSuffix", "", 3, "innerHTML"], ["align", "end", 3, "innerHTML"], [3, "innerHTML"]], template: function MaterialTextareaComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "mat-form-field", 0);
            i0.ɵɵtemplate(1, MaterialTextareaComponent_span_1_Template, 1, 1, "span", 1);
            i0.ɵɵtemplate(2, MaterialTextareaComponent_textarea_2_Template, 1, 13, "textarea", 2);
            i0.ɵɵtemplate(3, MaterialTextareaComponent_textarea_3_Template, 1, 14, "textarea", 3);
            i0.ɵɵtemplate(4, MaterialTextareaComponent_span_4_Template, 1, 1, "span", 4);
            i0.ɵɵtemplate(5, MaterialTextareaComponent_mat_hint_5_Template, 1, 1, "mat-hint", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(6, MaterialTextareaComponent_mat_error_6_Template, 1, 1, "mat-error", 6);
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
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.showErrors) && (ctx.options == null ? null : ctx.options.errorMessage));
        } }, dependencies: [i2.NgIf, i3.DefaultValueAccessor, i3.NgControlStatus, i3.RequiredValidator, i3.FormControlDirective, i4.MatFormField, i4.MatHint, i4.MatError, i4.MatPrefix, i4.MatSuffix, i5.MatInput], styles: ["mat-error[_ngcontent-%COMP%]{font-size:75%;margin-top:-1rem;margin-bottom:.5rem}  mat-form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix{width:initial}"] });
}
export { MaterialTextareaComponent };
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialTextareaComponent, [{
        type: Component,
        args: [{ selector: 'material-textarea-widget', template: `
      <mat-form-field
              [class]="options?.htmlClass || ''"
              [floatLabel]="options?.floatPlaceholder || (options?.notitle ? 'never' : 'auto')"
              [style.width]="'100%'">
      <span matPrefix *ngIf="options?.prefix || options?.fieldAddonLeft"
            [innerHTML]="options?.prefix || options?.fieldAddonLeft"></span>
          <textarea matInput *ngIf="boundControl"
                    [formControl]="formControl"
                    [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                    [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
                    [attr.maxlength]="options?.maxLength"
                    [attr.minlength]="options?.minLength"
                    [attr.pattern]="options?.pattern"
                    [required]="options?.required"
                    [id]="'control' + layoutNode?._id"
                    [name]="controlName"
                    [placeholder]="options?.notitle ? options?.placeholder : options?.title"
                    [readonly]="options?.readonly ? 'readonly' : null"
                    [style.width]="'100%'"
                    (blur)="options.showErrors = true"></textarea>
          <textarea matInput *ngIf="!boundControl"
                    [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                    [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
                    [attr.maxlength]="options?.maxLength"
                    [attr.minlength]="options?.minLength"
                    [attr.pattern]="options?.pattern"
                    [required]="options?.required"
                    [disabled]="controlDisabled"
                    [id]="'control' + layoutNode?._id"
                    [name]="controlName"
                    [placeholder]="options?.notitle ? options?.placeholder : options?.title"
                    [readonly]="options?.readonly ? 'readonly' : null"
                    [style.width]="'100%'"
                    [value]="controlValue"
                    (input)="updateValue($event)"
                    (blur)="options.showErrors = true"></textarea>
          <span matSuffix *ngIf="options?.suffix || options?.fieldAddonRight"
                [innerHTML]="options?.suffix || options?.fieldAddonRight"></span>
          <mat-hint *ngIf="options?.description && (!options?.showErrors || !options?.errorMessage)"
                    align="end" [innerHTML]="options?.description"></mat-hint>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtdGV4dGFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmdzZi1tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrL3NyYy9saWIvY29tcG9uZW50cy9tYXRlcmlhbC10ZXh0YXJlYS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUE7QUFFdEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7Ozs7Ozs7O0lBU3BELDBCQUNzRTs7O0lBQWhFLHlLQUF3RDs7OztJQUMxRCxtQ0FhNkM7SUFBbkMsMktBQVEsMkNBQXFCLElBQUksQ0FBQSxJQUFDO0lBQUMsaUJBQVc7OztJQUQ5QywrQkFBc0I7SUFYdEIsZ0RBQTJCLHFFQUFBLDhFQUFBLDRCQUFBLDZMQUFBLDJGQUFBO0lBQzNCLHFIQUFnRSxpR0FBQSx1RUFBQSx1RUFBQSxtRUFBQTs7OztJQVkxRSxtQ0FlNkM7SUFEbkMsbUxBQVMsZUFBQSwwQkFBbUIsQ0FBQSxJQUFDLCtKQUNyQiw0Q0FBcUIsSUFBSSxDQUFBLElBREo7SUFDTSxpQkFBVzs7O0lBSDlDLCtCQUFzQjtJQU50QixrRkFBOEIsb0NBQUEsOEVBQUEsNEJBQUEsNkxBQUEsMkZBQUEsOEJBQUE7SUFMOUIscUhBQWdFLGlHQUFBLHVFQUFBLHVFQUFBLG1FQUFBOzs7SUFlMUUsMkJBQ3VFOzs7SUFBakUsMEtBQXlEOzs7SUFDL0QsK0JBQ29FOzs7SUFBOUMseUdBQWtDOzs7SUFFNUQsZ0NBQzJEOzs7SUFBaEQsMEdBQW1DOztBQTdDcEQsTUEyRGEseUJBQXlCO0lBWTFCO0lBWFYsV0FBVyxDQUFpQjtJQUM1QixXQUFXLENBQVE7SUFDbkIsWUFBWSxDQUFLO0lBQ2pCLGVBQWUsR0FBRyxLQUFLLENBQUE7SUFDdkIsWUFBWSxHQUFHLEtBQUssQ0FBQTtJQUNwQixPQUFPLENBQUs7SUFDSCxVQUFVLENBQUs7SUFDZixXQUFXLENBQVU7SUFDckIsU0FBUyxDQUFVO0lBRTVCLFlBQ1UsR0FBMEI7UUFBMUIsUUFBRyxHQUFILEdBQUcsQ0FBdUI7SUFFcEMsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQ2xGLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFBO1NBQ3BEO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFLO1FBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDaEQsQ0FBQzttRkExQlUseUJBQXlCOytDQUF6Qix5QkFBeUI7WUF4RGhDLHlDQUcrQjtZQUMvQiw0RUFDc0U7WUFDbEUscUZBYXdEO1lBQ3hELHFGQWV3RDtZQUN4RCw0RUFDdUU7WUFDdkUsb0ZBQ29FO1lBQ3hFLGlCQUFpQjtZQUNqQixzRkFDMkQ7O1lBekNuRCx5RUFBa0M7WUFFbEMsK0JBQXNCO1lBRHRCLG1LQUFpRjtZQUV4RSxlQUFnRDtZQUFoRCxxSUFBZ0Q7WUFFekMsZUFBa0I7WUFBbEIsdUNBQWtCO1lBY2xCLGVBQW1CO1lBQW5CLHdDQUFtQjtZQWdCdEIsZUFBaUQ7WUFBakQsc0lBQWlEO1lBRXZELGVBQThFO1lBQTlFLHFNQUE4RTtZQUdqRixlQUFrRDtZQUFsRCx1SUFBa0Q7OztTQWV2RCx5QkFBeUI7dUZBQXpCLHlCQUF5QjtjQTNEckMsU0FBUzsyQkFDRSwwQkFBMEIsWUFDMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0VBMkNzRDt3RUFxQnZELFVBQVU7a0JBQWxCLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJ1xuaW1wb3J0IHtKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJ0BuZ3NmL3dpZGdldC1saWJyYXJ5J1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXRlcmlhbC10ZXh0YXJlYS13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPG1hdC1mb3JtLWZpZWxkXG4gICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5odG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICBbZmxvYXRMYWJlbF09XCJvcHRpb25zPy5mbG9hdFBsYWNlaG9sZGVyIHx8IChvcHRpb25zPy5ub3RpdGxlID8gJ25ldmVyJyA6ICdhdXRvJylcIlxuICAgICAgICAgICAgICBbc3R5bGUud2lkdGhdPVwiJzEwMCUnXCI+XG4gICAgICA8c3BhbiBtYXRQcmVmaXggKm5nSWY9XCJvcHRpb25zPy5wcmVmaXggfHwgb3B0aW9ucz8uZmllbGRBZGRvbkxlZnRcIlxuICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5wcmVmaXggfHwgb3B0aW9ucz8uZmllbGRBZGRvbkxlZnRcIj48L3NwYW4+XG4gICAgICAgICAgPHRleHRhcmVhIG1hdElucHV0ICpuZ0lmPVwiYm91bmRDb250cm9sXCJcbiAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnU3RhdHVzJ1wiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmxpc3RdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ0F1dG9jb21wbGV0ZSdcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5tYXhsZW5ndGhdPVwib3B0aW9ucz8ubWF4TGVuZ3RoXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIubWlubGVuZ3RoXT1cIm9wdGlvbnM/Lm1pbkxlbmd0aFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLnBhdHRlcm5dPVwib3B0aW9ucz8ucGF0dGVyblwiXG4gICAgICAgICAgICAgICAgICAgIFtyZXF1aXJlZF09XCJvcHRpb25zPy5yZXF1aXJlZFwiXG4gICAgICAgICAgICAgICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICAgICAgICAgICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJvcHRpb25zPy5ub3RpdGxlID8gb3B0aW9ucz8ucGxhY2Vob2xkZXIgOiBvcHRpb25zPy50aXRsZVwiXG4gICAgICAgICAgICAgICAgICAgIFtyZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgICAgW3N0eWxlLndpZHRoXT1cIicxMDAlJ1wiXG4gICAgICAgICAgICAgICAgICAgIChibHVyKT1cIm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWVcIj48L3RleHRhcmVhPlxuICAgICAgICAgIDx0ZXh0YXJlYSBtYXRJbnB1dCAqbmdJZj1cIiFib3VuZENvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdTdGF0dXMnXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIubGlzdF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnQXV0b2NvbXBsZXRlJ1wiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLm1heGxlbmd0aF09XCJvcHRpb25zPy5tYXhMZW5ndGhcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5taW5sZW5ndGhdPVwib3B0aW9ucz8ubWluTGVuZ3RoXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIucGF0dGVybl09XCJvcHRpb25zPy5wYXR0ZXJuXCJcbiAgICAgICAgICAgICAgICAgICAgW3JlcXVpcmVkXT1cIm9wdGlvbnM/LnJlcXVpcmVkXCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImNvbnRyb2xEaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICAgICAgICAgICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJvcHRpb25zPy5ub3RpdGxlID8gb3B0aW9ucz8ucGxhY2Vob2xkZXIgOiBvcHRpb25zPy50aXRsZVwiXG4gICAgICAgICAgICAgICAgICAgIFtyZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgICAgW3N0eWxlLndpZHRoXT1cIicxMDAlJ1wiXG4gICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJjb250cm9sVmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICAoaW5wdXQpPVwidXBkYXRlVmFsdWUoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIChibHVyKT1cIm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWVcIj48L3RleHRhcmVhPlxuICAgICAgICAgIDxzcGFuIG1hdFN1ZmZpeCAqbmdJZj1cIm9wdGlvbnM/LnN1ZmZpeCB8fCBvcHRpb25zPy5maWVsZEFkZG9uUmlnaHRcIlxuICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uc3VmZml4IHx8IG9wdGlvbnM/LmZpZWxkQWRkb25SaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICA8bWF0LWhpbnQgKm5nSWY9XCJvcHRpb25zPy5kZXNjcmlwdGlvbiAmJiAoIW9wdGlvbnM/LnNob3dFcnJvcnMgfHwgIW9wdGlvbnM/LmVycm9yTWVzc2FnZSlcIlxuICAgICAgICAgICAgICAgICAgICBhbGlnbj1cImVuZFwiIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZGVzY3JpcHRpb25cIj48L21hdC1oaW50PlxuICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJvcHRpb25zPy5zaG93RXJyb3JzICYmIG9wdGlvbnM/LmVycm9yTWVzc2FnZVwiXG4gICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZXJyb3JNZXNzYWdlXCI+PC9tYXQtZXJyb3I+YCxcbiAgc3R5bGVzOiBbYFxuICAgICAgbWF0LWVycm9yIHtcbiAgICAgICAgICBmb250LXNpemU6IDc1JTtcbiAgICAgICAgICBtYXJnaW4tdG9wOiAtMXJlbTtcbiAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG4gICAgICB9XG5cbiAgICAgIDo6bmctZGVlcCBtYXQtZm9ybS1maWVsZCAubWF0LWZvcm0tZmllbGQtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtZmxleFxuICAgICAgLm1hdC1mb3JtLWZpZWxkLWluZml4IHtcbiAgICAgICAgICB3aWR0aDogaW5pdGlhbDtcbiAgICAgIH1cbiAgYF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsVGV4dGFyZWFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sXG4gIGNvbnRyb2xOYW1lOiBzdHJpbmdcbiAgY29udHJvbFZhbHVlOiBhbnlcbiAgY29udHJvbERpc2FibGVkID0gZmFsc2VcbiAgYm91bmRDb250cm9sID0gZmFsc2VcbiAgb3B0aW9uczogYW55XG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmxheW91dE5vZGUub3B0aW9ucyB8fCB7fVxuICAgIHRoaXMuanNmLmluaXRpYWxpemVDb250cm9sKHRoaXMpXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMubm90aXRsZSAmJiAhdGhpcy5vcHRpb25zLmRlc2NyaXB0aW9uICYmIHRoaXMub3B0aW9ucy5wbGFjZWhvbGRlcikge1xuICAgICAgdGhpcy5vcHRpb25zLmRlc2NyaXB0aW9uID0gdGhpcy5vcHRpb25zLnBsYWNlaG9sZGVyXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlVmFsdWUoZXZlbnQpIHtcbiAgICB0aGlzLmpzZi51cGRhdGVWYWx1ZSh0aGlzLCBldmVudC50YXJnZXQudmFsdWUpXG4gIH1cbn1cbiJdfQ==