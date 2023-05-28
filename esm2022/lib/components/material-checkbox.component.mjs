import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '@ngsf/widget-library';
import * as i0 from "@angular/core";
import * as i1 from "@ngsf/widget-library";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/material/checkbox";
import * as i5 from "@angular/material/form-field";
import * as i6 from "@angular/material/slide-toggle";
function MaterialCheckboxComponent_mat_checkbox_0_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 5);
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("display", (ctx_r5.options == null ? null : ctx_r5.options.notitle) ? "none" : "");
    i0.ɵɵproperty("innerHTML", ctx_r5.options == null ? null : ctx_r5.options.title, i0.ɵɵsanitizeHtml);
} }
function MaterialCheckboxComponent_mat_checkbox_0_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-checkbox", 3);
    i0.ɵɵlistener("blur", function MaterialCheckboxComponent_mat_checkbox_0_Template_mat_checkbox_blur_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r6 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r6.options.showErrors = true); });
    i0.ɵɵtemplate(1, MaterialCheckboxComponent_mat_checkbox_0_span_1_Template, 1, 3, "span", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formControl", ctx_r0.formControl)("color", (ctx_r0.options == null ? null : ctx_r0.options.color) || "primary")("id", "control" + (ctx_r0.layoutNode == null ? null : ctx_r0.layoutNode._id))("name", ctx_r0.controlName);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.options == null ? null : ctx_r0.options.title);
} }
function MaterialCheckboxComponent_mat_checkbox_1_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 5);
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("display", (ctx_r8.options == null ? null : ctx_r8.options.notitle) ? "none" : "");
    i0.ɵɵproperty("innerHTML", ctx_r8.options == null ? null : ctx_r8.options.title, i0.ɵɵsanitizeHtml);
} }
function MaterialCheckboxComponent_mat_checkbox_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-checkbox", 6);
    i0.ɵɵlistener("blur", function MaterialCheckboxComponent_mat_checkbox_1_Template_mat_checkbox_blur_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r9.options.showErrors = true); })("change", function MaterialCheckboxComponent_mat_checkbox_1_Template_mat_checkbox_change_0_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r11 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r11.updateValue($event)); });
    i0.ɵɵtemplate(1, MaterialCheckboxComponent_mat_checkbox_1_span_1_Template, 1, 3, "span", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("color", (ctx_r1.options == null ? null : ctx_r1.options.color) || "primary")("disabled", ctx_r1.controlDisabled || (ctx_r1.options == null ? null : ctx_r1.options.readonly))("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id))("name", ctx_r1.controlName)("checked", ctx_r1.isChecked);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.options == null ? null : ctx_r1.options.title);
} }
function MaterialCheckboxComponent_mat_slide_toggle_2_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 5);
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("display", (ctx_r12.options == null ? null : ctx_r12.options.notitle) ? "none" : "");
    i0.ɵɵproperty("innerHTML", ctx_r12.options == null ? null : ctx_r12.options.title, i0.ɵɵsanitizeHtml);
} }
function MaterialCheckboxComponent_mat_slide_toggle_2_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-slide-toggle", 3);
    i0.ɵɵlistener("blur", function MaterialCheckboxComponent_mat_slide_toggle_2_Template_mat_slide_toggle_blur_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r13 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r13.options.showErrors = true); });
    i0.ɵɵtemplate(1, MaterialCheckboxComponent_mat_slide_toggle_2_span_1_Template, 1, 3, "span", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formControl", ctx_r2.formControl)("color", (ctx_r2.options == null ? null : ctx_r2.options.color) || "primary")("id", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id))("name", ctx_r2.controlName);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.options == null ? null : ctx_r2.options.title);
} }
function MaterialCheckboxComponent_mat_slide_toggle_3_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 5);
} if (rf & 2) {
    const ctx_r15 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("display", (ctx_r15.options == null ? null : ctx_r15.options.notitle) ? "none" : "");
    i0.ɵɵproperty("innerHTML", ctx_r15.options == null ? null : ctx_r15.options.title, i0.ɵɵsanitizeHtml);
} }
function MaterialCheckboxComponent_mat_slide_toggle_3_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-slide-toggle", 6);
    i0.ɵɵlistener("blur", function MaterialCheckboxComponent_mat_slide_toggle_3_Template_mat_slide_toggle_blur_0_listener() { i0.ɵɵrestoreView(_r17); const ctx_r16 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r16.options.showErrors = true); })("change", function MaterialCheckboxComponent_mat_slide_toggle_3_Template_mat_slide_toggle_change_0_listener($event) { i0.ɵɵrestoreView(_r17); const ctx_r18 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r18.updateValue($event)); });
    i0.ɵɵtemplate(1, MaterialCheckboxComponent_mat_slide_toggle_3_span_1_Template, 1, 3, "span", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("color", (ctx_r3.options == null ? null : ctx_r3.options.color) || "primary")("disabled", ctx_r3.controlDisabled || (ctx_r3.options == null ? null : ctx_r3.options.readonly))("id", "control" + (ctx_r3.layoutNode == null ? null : ctx_r3.layoutNode._id))("name", ctx_r3.controlName)("checked", ctx_r3.isChecked);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.options == null ? null : ctx_r3.options.title);
} }
function MaterialCheckboxComponent_mat_error_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-error", 7);
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r4.options == null ? null : ctx_r4.options.errorMessage, i0.ɵɵsanitizeHtml);
} }
class MaterialCheckboxComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    controlDisabled = false;
    boundControl = false;
    options;
    trueValue = true;
    falseValue = false;
    showSlideToggle = false;
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
    }
    get isChecked() {
        return this.jsf.getFormControlValue(this) === this.trueValue;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this, !this.options.readonly);
        if (this.controlValue === null || this.controlValue === undefined) {
            this.controlValue = false;
            this.jsf.updateValue(this, this.falseValue);
        }
        if (this.layoutNode.type === 'slide-toggle' ||
            this.layoutNode.format === 'slide-toggle') {
            this.showSlideToggle = true;
        }
    }
    updateValue(event) {
        this.options.showErrors = true;
        this.jsf.updateValue(this, event.checked ? this.trueValue : this.falseValue);
    }
    static ɵfac = function MaterialCheckboxComponent_Factory(t) { return new (t || MaterialCheckboxComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
    static ɵcmp = i0.ɵɵdefineComponent({ type: MaterialCheckboxComponent, selectors: [["material-checkbox-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 5, vars: 5, consts: [["align", "left", "labelPosition", "after", 3, "formControl", "color", "id", "name", "blur", 4, "ngIf"], ["align", "left", "labelPosition", "after", 3, "color", "disabled", "id", "name", "checked", "blur", "change", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], ["align", "left", "labelPosition", "after", 3, "formControl", "color", "id", "name", "blur"], ["class", "checkbox-name", 3, "display", "innerHTML", 4, "ngIf"], [1, "checkbox-name", 3, "innerHTML"], ["align", "left", "labelPosition", "after", 3, "color", "disabled", "id", "name", "checked", "blur", "change"], [3, "innerHTML"]], template: function MaterialCheckboxComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, MaterialCheckboxComponent_mat_checkbox_0_Template, 2, 5, "mat-checkbox", 0);
            i0.ɵɵtemplate(1, MaterialCheckboxComponent_mat_checkbox_1_Template, 2, 6, "mat-checkbox", 1);
            i0.ɵɵtemplate(2, MaterialCheckboxComponent_mat_slide_toggle_2_Template, 2, 5, "mat-slide-toggle", 0);
            i0.ɵɵtemplate(3, MaterialCheckboxComponent_mat_slide_toggle_3_Template, 2, 6, "mat-slide-toggle", 1);
            i0.ɵɵtemplate(4, MaterialCheckboxComponent_mat_error_4_Template, 1, 1, "mat-error", 2);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.boundControl && !ctx.showSlideToggle);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.boundControl && !ctx.showSlideToggle);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.boundControl && ctx.showSlideToggle);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.boundControl && ctx.showSlideToggle);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.showErrors) && (ctx.options == null ? null : ctx.options.errorMessage));
        } }, dependencies: [i2.NgIf, i3.NgControlStatus, i3.FormControlDirective, i4.MatCheckbox, i5.MatError, i6.MatSlideToggle], styles: [".checkbox-name[_ngcontent-%COMP%]{white-space:nowrap}mat-error[_ngcontent-%COMP%]{font-size:75%}"] });
}
export { MaterialCheckboxComponent };
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialCheckboxComponent, [{
        type: Component,
        args: [{ selector: 'material-checkbox-widget', template: `
      <mat-checkbox *ngIf="boundControl && !showSlideToggle"
                    [formControl]="formControl"
                    align="left"
                    [color]="options?.color || 'primary'"
                    [id]="'control' + layoutNode?._id"
                    labelPosition="after"
                    [name]="controlName"
                    (blur)="options.showErrors = true">
      <span *ngIf="options?.title"
            class="checkbox-name"
            [style.display]="options?.notitle ? 'none' : ''"
            [innerHTML]="options?.title"></span>
      </mat-checkbox>
      <mat-checkbox *ngIf="!boundControl && !showSlideToggle"
                    align="left"
                    [color]="options?.color || 'primary'"
                    [disabled]="controlDisabled || options?.readonly"
                    [id]="'control' + layoutNode?._id"
                    labelPosition="after"
                    [name]="controlName"
                    [checked]="isChecked"
                    (blur)="options.showErrors = true"
                    (change)="updateValue($event)">
      <span *ngIf="options?.title"
            class="checkbox-name"
            [style.display]="options?.notitle ? 'none' : ''"
            [innerHTML]="options?.title"></span>
      </mat-checkbox>
      <mat-slide-toggle *ngIf="boundControl && showSlideToggle"
                        [formControl]="formControl"
                        align="left"
                        [color]="options?.color || 'primary'"
                        [id]="'control' + layoutNode?._id"
                        labelPosition="after"
                        [name]="controlName"
                        (blur)="options.showErrors = true">
      <span *ngIf="options?.title"
            class="checkbox-name"
            [style.display]="options?.notitle ? 'none' : ''"
            [innerHTML]="options?.title"></span>
      </mat-slide-toggle>
      <mat-slide-toggle *ngIf="!boundControl && showSlideToggle"
                        align="left"
                        [color]="options?.color || 'primary'"
                        [disabled]="controlDisabled || options?.readonly"
                        [id]="'control' + layoutNode?._id"
                        labelPosition="after"
                        [name]="controlName"
                        [checked]="isChecked"
                        (blur)="options.showErrors = true"
                        (change)="updateValue($event)">
      <span *ngIf="options?.title"
            class="checkbox-name"
            [style.display]="options?.notitle ? 'none' : ''"
            [innerHTML]="options?.title"></span>
      </mat-slide-toggle>
      <mat-error *ngIf="options?.showErrors && options?.errorMessage"
                 [innerHTML]="options?.errorMessage"></mat-error>`, styles: [".checkbox-name{white-space:nowrap}mat-error{font-size:75%}\n"] }]
    }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmdzZi1tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrL3NyYy9saWIvY29tcG9uZW50cy9tYXRlcmlhbC1jaGVja2JveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUE7QUFFdEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7Ozs7Ozs7OztJQWFwRCwwQkFHMEM7OztJQURwQyxpR0FBZ0Q7SUFDaEQsbUdBQTRCOzs7O0lBWGxDLHVDQU9pRDtJQUFuQyxtTEFBUSwyQ0FBcUIsSUFBSSxDQUFBLElBQUM7SUFDaEQsMkZBRzBDO0lBQzFDLGlCQUFlOzs7SUFYRCxnREFBMkIsOEVBQUEsOEVBQUEsNEJBQUE7SUFPbEMsZUFBb0I7SUFBcEIsMkVBQW9COzs7SUFlM0IsMEJBRzBDOzs7SUFEcEMsaUdBQWdEO0lBQ2hELG1HQUE0Qjs7OztJQWJsQyx1Q0FTNkM7SUFEL0Isb0xBQVEsMkNBQXFCLElBQUksQ0FBQSxJQUFDLGtMQUN4QixlQUFBLDJCQUFtQixDQUFBLElBREs7SUFFaEQsMkZBRzBDO0lBQzFDLGlCQUFlOzs7SUFaRCwyRkFBcUMsaUdBQUEsOEVBQUEsNEJBQUEsNkJBQUE7SUFRNUMsZUFBb0I7SUFBcEIsMkVBQW9COzs7SUFhM0IsMEJBRzBDOzs7SUFEcEMsbUdBQWdEO0lBQ2hELHFHQUE0Qjs7OztJQVhsQywyQ0FPcUQ7SUFBbkMsNkxBQVEsNENBQXFCLElBQUksQ0FBQSxJQUFDO0lBQ3BELCtGQUcwQztJQUMxQyxpQkFBbUI7OztJQVhELGdEQUEyQiw4RUFBQSw4RUFBQSw0QkFBQTtJQU90QyxlQUFvQjtJQUFwQiwyRUFBb0I7OztJQWUzQiwwQkFHMEM7OztJQURwQyxt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Z3VsYXIvY29yZSdcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3JtcydcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICdAbmdzZi93aWRnZXQtbGlicmFyeSdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0ZXJpYWwtY2hlY2tib3gtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxtYXQtY2hlY2tib3ggKm5nSWY9XCJib3VuZENvbnRyb2wgJiYgIXNob3dTbGlkZVRvZ2dsZVwiXG4gICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiXG4gICAgICAgICAgICAgICAgICAgIGFsaWduPVwibGVmdFwiXG4gICAgICAgICAgICAgICAgICAgIFtjb2xvcl09XCJvcHRpb25zPy5jb2xvciB8fCAncHJpbWFyeSdcIlxuICAgICAgICAgICAgICAgICAgICBbaWRdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkXCJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxQb3NpdGlvbj1cImFmdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgW25hbWVdPVwiY29udHJvbE5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAoYmx1cik9XCJvcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlXCI+XG4gICAgICA8c3BhbiAqbmdJZj1cIm9wdGlvbnM/LnRpdGxlXCJcbiAgICAgICAgICAgIGNsYXNzPVwiY2hlY2tib3gtbmFtZVwiXG4gICAgICAgICAgICBbc3R5bGUuZGlzcGxheV09XCJvcHRpb25zPy5ub3RpdGxlID8gJ25vbmUnIDogJydcIlxuICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy50aXRsZVwiPjwvc3Bhbj5cbiAgICAgIDwvbWF0LWNoZWNrYm94PlxuICAgICAgPG1hdC1jaGVja2JveCAqbmdJZj1cIiFib3VuZENvbnRyb2wgJiYgIXNob3dTbGlkZVRvZ2dsZVwiXG4gICAgICAgICAgICAgICAgICAgIGFsaWduPVwibGVmdFwiXG4gICAgICAgICAgICAgICAgICAgIFtjb2xvcl09XCJvcHRpb25zPy5jb2xvciB8fCAncHJpbWFyeSdcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbERpc2FibGVkIHx8IG9wdGlvbnM/LnJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsUG9zaXRpb249XCJhZnRlclwiXG4gICAgICAgICAgICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgW2NoZWNrZWRdPVwiaXNDaGVja2VkXCJcbiAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwib3B0aW9ucy5zaG93RXJyb3JzID0gdHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgIChjaGFuZ2UpPVwidXBkYXRlVmFsdWUoJGV2ZW50KVwiPlxuICAgICAgPHNwYW4gKm5nSWY9XCJvcHRpb25zPy50aXRsZVwiXG4gICAgICAgICAgICBjbGFzcz1cImNoZWNrYm94LW5hbWVcIlxuICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwib3B0aW9ucz8ubm90aXRsZSA/ICdub25lJyA6ICcnXCJcbiAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8udGl0bGVcIj48L3NwYW4+XG4gICAgICA8L21hdC1jaGVja2JveD5cbiAgICAgIDxtYXQtc2xpZGUtdG9nZ2xlICpuZ0lmPVwiYm91bmRDb250cm9sICYmIHNob3dTbGlkZVRvZ2dsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ249XCJsZWZ0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjb2xvcl09XCJvcHRpb25zPy5jb2xvciB8fCAncHJpbWFyeSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbFBvc2l0aW9uPVwiYWZ0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW25hbWVdPVwiY29udHJvbE5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwib3B0aW9ucy5zaG93RXJyb3JzID0gdHJ1ZVwiPlxuICAgICAgPHNwYW4gKm5nSWY9XCJvcHRpb25zPy50aXRsZVwiXG4gICAgICAgICAgICBjbGFzcz1cImNoZWNrYm94LW5hbWVcIlxuICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwib3B0aW9ucz8ubm90aXRsZSA/ICdub25lJyA6ICcnXCJcbiAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8udGl0bGVcIj48L3NwYW4+XG4gICAgICA8L21hdC1zbGlkZS10b2dnbGU+XG4gICAgICA8bWF0LXNsaWRlLXRvZ2dsZSAqbmdJZj1cIiFib3VuZENvbnRyb2wgJiYgc2hvd1NsaWRlVG9nZ2xlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduPVwibGVmdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY29sb3JdPVwib3B0aW9ucz8uY29sb3IgfHwgJ3ByaW1hcnknXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJjb250cm9sRGlzYWJsZWQgfHwgb3B0aW9ucz8ucmVhZG9ubHlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbFBvc2l0aW9uPVwiYWZ0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW25hbWVdPVwiY29udHJvbE5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NoZWNrZWRdPVwiaXNDaGVja2VkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChibHVyKT1cIm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJ1cGRhdGVWYWx1ZSgkZXZlbnQpXCI+XG4gICAgICA8c3BhbiAqbmdJZj1cIm9wdGlvbnM/LnRpdGxlXCJcbiAgICAgICAgICAgIGNsYXNzPVwiY2hlY2tib3gtbmFtZVwiXG4gICAgICAgICAgICBbc3R5bGUuZGlzcGxheV09XCJvcHRpb25zPy5ub3RpdGxlID8gJ25vbmUnIDogJydcIlxuICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy50aXRsZVwiPjwvc3Bhbj5cbiAgICAgIDwvbWF0LXNsaWRlLXRvZ2dsZT5cbiAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJvcHRpb25zPy5zaG93RXJyb3JzICYmIG9wdGlvbnM/LmVycm9yTWVzc2FnZVwiXG4gICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZXJyb3JNZXNzYWdlXCI+PC9tYXQtZXJyb3I+YCxcbiAgc3R5bGVzOiBbYFxuICAgICAgLmNoZWNrYm94LW5hbWUge1xuICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICB9XG5cbiAgICAgIG1hdC1lcnJvciB7XG4gICAgICAgICAgZm9udC1zaXplOiA3NSU7XG4gICAgICB9XG4gIGBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbENoZWNrYm94Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbFxuICBjb250cm9sTmFtZTogc3RyaW5nXG4gIGNvbnRyb2xWYWx1ZTogYW55XG4gIGNvbnRyb2xEaXNhYmxlZCA9IGZhbHNlXG4gIGJvdW5kQ29udHJvbCA9IGZhbHNlXG4gIG9wdGlvbnM6IGFueVxuICB0cnVlVmFsdWU6IGFueSA9IHRydWVcbiAgZmFsc2VWYWx1ZTogYW55ID0gZmFsc2VcbiAgc2hvd1NsaWRlVG9nZ2xlID0gZmFsc2VcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHtcbiAgfVxuXG4gIGdldCBpc0NoZWNrZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuanNmLmdldEZvcm1Db250cm9sVmFsdWUodGhpcykgPT09IHRoaXMudHJ1ZVZhbHVlXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmxheW91dE5vZGUub3B0aW9ucyB8fCB7fVxuICAgIHRoaXMuanNmLmluaXRpYWxpemVDb250cm9sKHRoaXMsICF0aGlzLm9wdGlvbnMucmVhZG9ubHkpXG4gICAgaWYgKHRoaXMuY29udHJvbFZhbHVlID09PSBudWxsIHx8IHRoaXMuY29udHJvbFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuY29udHJvbFZhbHVlID0gZmFsc2VcbiAgICAgIHRoaXMuanNmLnVwZGF0ZVZhbHVlKHRoaXMsIHRoaXMuZmFsc2VWYWx1ZSlcbiAgICB9XG4gICAgaWYgKHRoaXMubGF5b3V0Tm9kZS50eXBlID09PSAnc2xpZGUtdG9nZ2xlJyB8fFxuICAgICAgdGhpcy5sYXlvdXROb2RlLmZvcm1hdCA9PT0gJ3NsaWRlLXRvZ2dsZSdcbiAgICApIHtcbiAgICAgIHRoaXMuc2hvd1NsaWRlVG9nZ2xlID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKGV2ZW50KSB7XG4gICAgdGhpcy5vcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlXG4gICAgdGhpcy5qc2YudXBkYXRlVmFsdWUodGhpcywgZXZlbnQuY2hlY2tlZCA/IHRoaXMudHJ1ZVZhbHVlIDogdGhpcy5mYWxzZVZhbHVlKVxuICB9XG59XG4iXX0=