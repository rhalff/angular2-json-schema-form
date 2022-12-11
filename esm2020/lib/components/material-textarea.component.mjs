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
export class MaterialTextareaComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
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
MaterialTextareaComponent.ɵfac = function MaterialTextareaComponent_Factory(t) { return new (t || MaterialTextareaComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialTextareaComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialTextareaComponent, selectors: [["material-textarea-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 7, vars: 11, consts: [[3, "floatLabel"], ["matPrefix", "", 3, "innerHTML", 4, "ngIf"], ["matInput", "", 3, "formControl", "required", "id", "name", "placeholder", "readonly", "width", "blur", 4, "ngIf"], ["matInput", "", 3, "required", "disabled", "id", "name", "placeholder", "readonly", "width", "value", "input", "blur", 4, "ngIf"], ["matSuffix", "", 3, "innerHTML", 4, "ngIf"], ["align", "end", 3, "innerHTML", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], ["matPrefix", "", 3, "innerHTML"], ["matInput", "", 3, "formControl", "required", "id", "name", "placeholder", "readonly", "blur"], ["matInput", "", 3, "required", "disabled", "id", "name", "placeholder", "readonly", "value", "input", "blur"], ["matSuffix", "", 3, "innerHTML"], ["align", "end", 3, "innerHTML"], [3, "innerHTML"]], template: function MaterialTextareaComponent_Template(rf, ctx) { if (rf & 1) {
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
    } }, dependencies: [i2.NgIf, i3.DefaultValueAccessor, i3.NgControlStatus, i3.RequiredValidator, i3.MinLengthValidator, i3.MaxLengthValidator, i3.PatternValidator, i3.FormControlDirective, i4.MatFormField, i4.MatHint, i4.MatError, i4.MatPrefix, i4.MatSuffix, i5.MatInput], styles: ["mat-error[_ngcontent-%COMP%]{font-size:75%;margin-top:-1rem;margin-bottom:.5rem}  mat-form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix{width:initial}"] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtdGV4dGFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmdzZi1tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrL3NyYy9saWIvY29tcG9uZW50cy9tYXRlcmlhbC10ZXh0YXJlYS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUE7QUFFdEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7Ozs7Ozs7O0lBU3BELDBCQUNzRTs7O0lBQWhFLHlLQUF3RDs7OztJQUMxRCxtQ0FhNkM7SUFBbkMsMktBQVEsMkNBQXFCLElBQUksQ0FBQSxJQUFDO0lBQUMsaUJBQVc7OztJQUQ5QywrQkFBc0I7SUFYdEIsZ0RBQTJCLHFFQUFBLDhFQUFBLDRCQUFBLDZMQUFBLDJGQUFBO0lBQzNCLHFIQUFnRSxpR0FBQSx1RUFBQSx1RUFBQSxtRUFBQTs7OztJQVkxRSxtQ0FlNkM7SUFEbkMsbUxBQVMsZUFBQSwwQkFBbUIsQ0FBQSxJQUFDLCtKQUNyQiw0Q0FBcUIsSUFBSSxDQUFBLElBREo7SUFDTSxpQkFBVzs7O0lBSDlDLCtCQUFzQjtJQU50QixrRkFBOEIsb0NBQUEsOEVBQUEsNEJBQUEsNkxBQUEsMkZBQUEsOEJBQUE7SUFMOUIscUhBQWdFLGlHQUFBLHVFQUFBLHVFQUFBLG1FQUFBOzs7SUFlMUUsMkJBQ3VFOzs7SUFBakUsMEtBQXlEOzs7SUFDL0QsK0JBQ29FOzs7SUFBOUMseUdBQWtDOzs7SUFFNUQsZ0NBQzJEOzs7SUFBaEQsMEdBQW1DOztBQWNwRCxNQUFNLE9BQU8seUJBQXlCO0lBV3BDLFlBQ1UsR0FBMEI7UUFBMUIsUUFBRyxHQUFILEdBQUcsQ0FBdUI7UUFScEMsb0JBQWUsR0FBRyxLQUFLLENBQUE7UUFDdkIsaUJBQVksR0FBRyxLQUFLLENBQUE7SUFTcEIsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQ2xGLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFBO1NBQ3BEO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFLO1FBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDaEQsQ0FBQzs7a0dBMUJVLHlCQUF5Qjs4REFBekIseUJBQXlCO1FBeERoQyx5Q0FHK0I7UUFDL0IsNEVBQ3NFO1FBQ2xFLHFGQWF3RDtRQUN4RCxxRkFld0Q7UUFDeEQsNEVBQ3VFO1FBQ3ZFLG9GQUNvRTtRQUN4RSxpQkFBaUI7UUFDakIsc0ZBQzJEOztRQXpDbkQseUVBQWtDO1FBRWxDLCtCQUFzQjtRQUR0QixtS0FBaUY7UUFFeEUsZUFBZ0Q7UUFBaEQscUlBQWdEO1FBRXpDLGVBQWtCO1FBQWxCLHVDQUFrQjtRQWNsQixlQUFtQjtRQUFuQix3Q0FBbUI7UUFnQnRCLGVBQWlEO1FBQWpELHNJQUFpRDtRQUV2RCxlQUE4RTtRQUE5RSxxTUFBOEU7UUFHakYsZUFBa0Q7UUFBbEQsdUlBQWtEOzt1RkFldkQseUJBQXlCO2NBM0RyQyxTQUFTOzJCQUNFLDBCQUEwQixZQUMxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrRUEyQ3NEO3dFQXFCdkQsVUFBVTtrQkFBbEIsS0FBSztZQUNHLFdBQVc7a0JBQW5CLEtBQUs7WUFDRyxTQUFTO2tCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnQG5nc2Yvd2lkZ2V0LWxpYnJhcnknXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdGVyaWFsLXRleHRhcmVhLXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8bWF0LWZvcm0tZmllbGRcbiAgICAgICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/Lmh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgICAgICAgIFtmbG9hdExhYmVsXT1cIm9wdGlvbnM/LmZsb2F0UGxhY2Vob2xkZXIgfHwgKG9wdGlvbnM/Lm5vdGl0bGUgPyAnbmV2ZXInIDogJ2F1dG8nKVwiXG4gICAgICAgICAgICAgIFtzdHlsZS53aWR0aF09XCInMTAwJSdcIj5cbiAgICAgIDxzcGFuIG1hdFByZWZpeCAqbmdJZj1cIm9wdGlvbnM/LnByZWZpeCB8fCBvcHRpb25zPy5maWVsZEFkZG9uTGVmdFwiXG4gICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LnByZWZpeCB8fCBvcHRpb25zPy5maWVsZEFkZG9uTGVmdFwiPjwvc3Bhbj5cbiAgICAgICAgICA8dGV4dGFyZWEgbWF0SW5wdXQgKm5nSWY9XCJib3VuZENvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdTdGF0dXMnXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIubGlzdF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnQXV0b2NvbXBsZXRlJ1wiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLm1heGxlbmd0aF09XCJvcHRpb25zPy5tYXhMZW5ndGhcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5taW5sZW5ndGhdPVwib3B0aW9ucz8ubWluTGVuZ3RoXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIucGF0dGVybl09XCJvcHRpb25zPy5wYXR0ZXJuXCJcbiAgICAgICAgICAgICAgICAgICAgW3JlcXVpcmVkXT1cIm9wdGlvbnM/LnJlcXVpcmVkXCJcbiAgICAgICAgICAgICAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgICAgICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cIm9wdGlvbnM/Lm5vdGl0bGUgPyBvcHRpb25zPy5wbGFjZWhvbGRlciA6IG9wdGlvbnM/LnRpdGxlXCJcbiAgICAgICAgICAgICAgICAgICAgW3JlYWRvbmx5XT1cIm9wdGlvbnM/LnJlYWRvbmx5ID8gJ3JlYWRvbmx5JyA6IG51bGxcIlxuICAgICAgICAgICAgICAgICAgICBbc3R5bGUud2lkdGhdPVwiJzEwMCUnXCJcbiAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwib3B0aW9ucy5zaG93RXJyb3JzID0gdHJ1ZVwiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgPHRleHRhcmVhIG1hdElucHV0ICpuZ0lmPVwiIWJvdW5kQ29udHJvbFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ1N0YXR1cydcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5saXN0XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdBdXRvY29tcGxldGUnXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIubWF4bGVuZ3RoXT1cIm9wdGlvbnM/Lm1heExlbmd0aFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLm1pbmxlbmd0aF09XCJvcHRpb25zPy5taW5MZW5ndGhcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5wYXR0ZXJuXT1cIm9wdGlvbnM/LnBhdHRlcm5cIlxuICAgICAgICAgICAgICAgICAgICBbcmVxdWlyZWRdPVwib3B0aW9ucz8ucmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbERpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgICAgICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cIm9wdGlvbnM/Lm5vdGl0bGUgPyBvcHRpb25zPy5wbGFjZWhvbGRlciA6IG9wdGlvbnM/LnRpdGxlXCJcbiAgICAgICAgICAgICAgICAgICAgW3JlYWRvbmx5XT1cIm9wdGlvbnM/LnJlYWRvbmx5ID8gJ3JlYWRvbmx5JyA6IG51bGxcIlxuICAgICAgICAgICAgICAgICAgICBbc3R5bGUud2lkdGhdPVwiJzEwMCUnXCJcbiAgICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cImNvbnRyb2xWYWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgIChpbnB1dCk9XCJ1cGRhdGVWYWx1ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwib3B0aW9ucy5zaG93RXJyb3JzID0gdHJ1ZVwiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgPHNwYW4gbWF0U3VmZml4ICpuZ0lmPVwib3B0aW9ucz8uc3VmZml4IHx8IG9wdGlvbnM/LmZpZWxkQWRkb25SaWdodFwiXG4gICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5zdWZmaXggfHwgb3B0aW9ucz8uZmllbGRBZGRvblJpZ2h0XCI+PC9zcGFuPlxuICAgICAgICAgIDxtYXQtaGludCAqbmdJZj1cIm9wdGlvbnM/LmRlc2NyaXB0aW9uICYmICghb3B0aW9ucz8uc2hvd0Vycm9ycyB8fCAhb3B0aW9ucz8uZXJyb3JNZXNzYWdlKVwiXG4gICAgICAgICAgICAgICAgICAgIGFsaWduPVwiZW5kXCIgW2lubmVySFRNTF09XCJvcHRpb25zPy5kZXNjcmlwdGlvblwiPjwvbWF0LWhpbnQ+XG4gICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgPG1hdC1lcnJvciAqbmdJZj1cIm9wdGlvbnM/LnNob3dFcnJvcnMgJiYgb3B0aW9ucz8uZXJyb3JNZXNzYWdlXCJcbiAgICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5lcnJvck1lc3NhZ2VcIj48L21hdC1lcnJvcj5gLFxuICBzdHlsZXM6IFtgXG4gICAgICBtYXQtZXJyb3Ige1xuICAgICAgICAgIGZvbnQtc2l6ZTogNzUlO1xuICAgICAgICAgIG1hcmdpbi10b3A6IC0xcmVtO1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbiAgICAgIH1cblxuICAgICAgOjpuZy1kZWVwIG1hdC1mb3JtLWZpZWxkIC5tYXQtZm9ybS1maWVsZC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1mbGV4XG4gICAgICAubWF0LWZvcm0tZmllbGQtaW5maXgge1xuICAgICAgICAgIHdpZHRoOiBpbml0aWFsO1xuICAgICAgfVxuICBgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxUZXh0YXJlYUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2xcbiAgY29udHJvbE5hbWU6IHN0cmluZ1xuICBjb250cm9sVmFsdWU6IGFueVxuICBjb250cm9sRGlzYWJsZWQgPSBmYWxzZVxuICBib3VuZENvbnRyb2wgPSBmYWxzZVxuICBvcHRpb25zOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9XG4gICAgdGhpcy5qc2YuaW5pdGlhbGl6ZUNvbnRyb2wodGhpcylcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5ub3RpdGxlICYmICF0aGlzLm9wdGlvbnMuZGVzY3JpcHRpb24gJiYgdGhpcy5vcHRpb25zLnBsYWNlaG9sZGVyKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZGVzY3JpcHRpb24gPSB0aGlzLm9wdGlvbnMucGxhY2Vob2xkZXJcbiAgICB9XG4gIH1cblxuICB1cGRhdGVWYWx1ZShldmVudCkge1xuICAgIHRoaXMuanNmLnVwZGF0ZVZhbHVlKHRoaXMsIGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgfVxufVxuIl19