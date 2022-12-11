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
export class MaterialCheckboxComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.trueValue = true;
        this.falseValue = false;
        this.showSlideToggle = false;
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
}
MaterialCheckboxComponent.ɵfac = function MaterialCheckboxComponent_Factory(t) { return new (t || MaterialCheckboxComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialCheckboxComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialCheckboxComponent, selectors: [["material-checkbox-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 5, vars: 5, consts: [["align", "left", "labelPosition", "after", 3, "formControl", "color", "id", "name", "blur", 4, "ngIf"], ["align", "left", "labelPosition", "after", 3, "color", "disabled", "id", "name", "checked", "blur", "change", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], ["align", "left", "labelPosition", "after", 3, "formControl", "color", "id", "name", "blur"], ["class", "checkbox-name", 3, "display", "innerHTML", 4, "ngIf"], [1, "checkbox-name", 3, "innerHTML"], ["align", "left", "labelPosition", "after", 3, "color", "disabled", "id", "name", "checked", "blur", "change"], [3, "innerHTML"]], template: function MaterialCheckboxComponent_Template(rf, ctx) { if (rf & 1) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmdzZi1tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrL3NyYy9saWIvY29tcG9uZW50cy9tYXRlcmlhbC1jaGVja2JveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUE7QUFFdEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7Ozs7Ozs7OztJQWFwRCwwQkFHMEM7OztJQURwQyxpR0FBZ0Q7SUFDaEQsbUdBQTRCOzs7O0lBWGxDLHVDQU9pRDtJQUFuQyxtTEFBUSwyQ0FBcUIsSUFBSSxDQUFBLElBQUM7SUFDaEQsMkZBRzBDO0lBQzFDLGlCQUFlOzs7SUFYRCxnREFBMkIsOEVBQUEsOEVBQUEsNEJBQUE7SUFPbEMsZUFBb0I7SUFBcEIsMkVBQW9COzs7SUFlM0IsMEJBRzBDOzs7SUFEcEMsaUdBQWdEO0lBQ2hELG1HQUE0Qjs7OztJQWJsQyx1Q0FTNkM7SUFEL0Isb0xBQVEsMkNBQXFCLElBQUksQ0FBQSxJQUFDLGtMQUN4QixlQUFBLDJCQUFtQixDQUFBLElBREs7SUFFaEQsMkZBRzBDO0lBQzFDLGlCQUFlOzs7SUFaRCwyRkFBcUMsaUdBQUEsOEVBQUEsNEJBQUEsNkJBQUE7SUFRNUMsZUFBb0I7SUFBcEIsMkVBQW9COzs7SUFhM0IsMEJBRzBDOzs7SUFEcEMsbUdBQWdEO0lBQ2hELHFHQUE0Qjs7OztJQVhsQywyQ0FPcUQ7SUFBbkMsNkxBQVEsNENBQXFCLElBQUksQ0FBQSxJQUFDO0lBQ3BELCtGQUcwQztJQUMxQyxpQkFBbUI7OztJQVhELGdEQUEyQiw4RUFBQSw4RUFBQSw0QkFBQTtJQU90QyxlQUFvQjtJQUFwQiwyRUFBb0I7OztJQWUzQiwwQkFHMEM7OztJQURwQyxtR0FBZ0Q7SUFDaEQscUdBQTRCOzs7O0lBYmxDLDJDQVNpRDtJQUQvQiw2TEFBUSw0Q0FBcUIsSUFBSSxDQUFBLElBQUMsMExBQ3hCLGVBQUEsMkJBQW1CLENBQUEsSUFESztJQUVwRCwrRkFHMEM7SUFDMUMsaUJBQW1COzs7SUFaRCwyRkFBcUMsaUdBQUEsOEVBQUEsNEJBQUEsNkJBQUE7SUFRaEQsZUFBb0I7SUFBcEIsMkVBQW9COzs7SUFLM0IsK0JBQzJEOzs7SUFBaEQsMEdBQW1DOztBQVdwRCxNQUFNLE9BQU8seUJBQXlCO0lBY3BDLFlBQ1UsR0FBMEI7UUFBMUIsUUFBRyxHQUFILEdBQUcsQ0FBdUI7UUFYcEMsb0JBQWUsR0FBRyxLQUFLLENBQUE7UUFDdkIsaUJBQVksR0FBRyxLQUFLLENBQUE7UUFFcEIsY0FBUyxHQUFRLElBQUksQ0FBQTtRQUNyQixlQUFVLEdBQVEsS0FBSyxDQUFBO1FBQ3ZCLG9CQUFlLEdBQUcsS0FBSyxDQUFBO0lBUXZCLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQTtJQUM5RCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFBO1FBQzVDLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN4RCxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssU0FBUyxFQUFFO1lBQ2pFLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFBO1lBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7U0FDNUM7UUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLGNBQWM7WUFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssY0FBYyxFQUN6QztZQUNBLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFBO1NBQzVCO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFLO1FBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFBO1FBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDOUUsQ0FBQzs7a0dBeENVLHlCQUF5Qjs4REFBekIseUJBQXlCO1FBcEVoQyw0RkFZZTtRQUNmLDRGQWNlO1FBQ2Ysb0dBWW1CO1FBQ25CLG9HQWNtQjtRQUNuQixzRkFDMkQ7O1FBekQ1QywrREFBc0M7UUFhdEMsZUFBdUM7UUFBdkMsZ0VBQXVDO1FBZW5DLGVBQXFDO1FBQXJDLDhEQUFxQztRQWFyQyxlQUFzQztRQUF0QywrREFBc0M7UUFlN0MsZUFBa0Q7UUFBbEQsdUlBQWtEOzt1RkFZdkQseUJBQXlCO2NBdkVyQyxTQUFTOzJCQUNFLDBCQUEwQixZQUMxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrRUEwRHNEO3dFQXFCdkQsVUFBVTtrQkFBbEIsS0FBSztZQUNHLFdBQVc7a0JBQW5CLEtBQUs7WUFDRyxTQUFTO2tCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnQG5nc2Yvd2lkZ2V0LWxpYnJhcnknXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdGVyaWFsLWNoZWNrYm94LXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8bWF0LWNoZWNrYm94ICpuZ0lmPVwiYm91bmRDb250cm9sICYmICFzaG93U2xpZGVUb2dnbGVcIlxuICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICBhbGlnbj1cImxlZnRcIlxuICAgICAgICAgICAgICAgICAgICBbY29sb3JdPVwib3B0aW9ucz8uY29sb3IgfHwgJ3ByaW1hcnknXCJcbiAgICAgICAgICAgICAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsUG9zaXRpb249XCJhZnRlclwiXG4gICAgICAgICAgICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwib3B0aW9ucy5zaG93RXJyb3JzID0gdHJ1ZVwiPlxuICAgICAgPHNwYW4gKm5nSWY9XCJvcHRpb25zPy50aXRsZVwiXG4gICAgICAgICAgICBjbGFzcz1cImNoZWNrYm94LW5hbWVcIlxuICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwib3B0aW9ucz8ubm90aXRsZSA/ICdub25lJyA6ICcnXCJcbiAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8udGl0bGVcIj48L3NwYW4+XG4gICAgICA8L21hdC1jaGVja2JveD5cbiAgICAgIDxtYXQtY2hlY2tib3ggKm5nSWY9XCIhYm91bmRDb250cm9sICYmICFzaG93U2xpZGVUb2dnbGVcIlxuICAgICAgICAgICAgICAgICAgICBhbGlnbj1cImxlZnRcIlxuICAgICAgICAgICAgICAgICAgICBbY29sb3JdPVwib3B0aW9ucz8uY29sb3IgfHwgJ3ByaW1hcnknXCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImNvbnRyb2xEaXNhYmxlZCB8fCBvcHRpb25zPy5yZWFkb25seVwiXG4gICAgICAgICAgICAgICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICAgICAgICAgICAgICBsYWJlbFBvc2l0aW9uPVwiYWZ0ZXJcIlxuICAgICAgICAgICAgICAgICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIFtjaGVja2VkXT1cImlzQ2hlY2tlZFwiXG4gICAgICAgICAgICAgICAgICAgIChibHVyKT1cIm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWVcIlxuICAgICAgICAgICAgICAgICAgICAoY2hhbmdlKT1cInVwZGF0ZVZhbHVlKCRldmVudClcIj5cbiAgICAgIDxzcGFuICpuZ0lmPVwib3B0aW9ucz8udGl0bGVcIlxuICAgICAgICAgICAgY2xhc3M9XCJjaGVja2JveC1uYW1lXCJcbiAgICAgICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cIm9wdGlvbnM/Lm5vdGl0bGUgPyAnbm9uZScgOiAnJ1wiXG4gICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LnRpdGxlXCI+PC9zcGFuPlxuICAgICAgPC9tYXQtY2hlY2tib3g+XG4gICAgICA8bWF0LXNsaWRlLXRvZ2dsZSAqbmdJZj1cImJvdW5kQ29udHJvbCAmJiBzaG93U2xpZGVUb2dnbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduPVwibGVmdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY29sb3JdPVwib3B0aW9ucz8uY29sb3IgfHwgJ3ByaW1hcnknXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxQb3NpdGlvbj1cImFmdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChibHVyKT1cIm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWVcIj5cbiAgICAgIDxzcGFuICpuZ0lmPVwib3B0aW9ucz8udGl0bGVcIlxuICAgICAgICAgICAgY2xhc3M9XCJjaGVja2JveC1uYW1lXCJcbiAgICAgICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cIm9wdGlvbnM/Lm5vdGl0bGUgPyAnbm9uZScgOiAnJ1wiXG4gICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LnRpdGxlXCI+PC9zcGFuPlxuICAgICAgPC9tYXQtc2xpZGUtdG9nZ2xlPlxuICAgICAgPG1hdC1zbGlkZS10b2dnbGUgKm5nSWY9XCIhYm91bmRDb250cm9sICYmIHNob3dTbGlkZVRvZ2dsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbj1cImxlZnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NvbG9yXT1cIm9wdGlvbnM/LmNvbG9yIHx8ICdwcmltYXJ5J1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbERpc2FibGVkIHx8IG9wdGlvbnM/LnJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxQb3NpdGlvbj1cImFmdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjaGVja2VkXT1cImlzQ2hlY2tlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoYmx1cik9XCJvcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjaGFuZ2UpPVwidXBkYXRlVmFsdWUoJGV2ZW50KVwiPlxuICAgICAgPHNwYW4gKm5nSWY9XCJvcHRpb25zPy50aXRsZVwiXG4gICAgICAgICAgICBjbGFzcz1cImNoZWNrYm94LW5hbWVcIlxuICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwib3B0aW9ucz8ubm90aXRsZSA/ICdub25lJyA6ICcnXCJcbiAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8udGl0bGVcIj48L3NwYW4+XG4gICAgICA8L21hdC1zbGlkZS10b2dnbGU+XG4gICAgICA8bWF0LWVycm9yICpuZ0lmPVwib3B0aW9ucz8uc2hvd0Vycm9ycyAmJiBvcHRpb25zPy5lcnJvck1lc3NhZ2VcIlxuICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmVycm9yTWVzc2FnZVwiPjwvbWF0LWVycm9yPmAsXG4gIHN0eWxlczogW2BcbiAgICAgIC5jaGVja2JveC1uYW1lIHtcbiAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgfVxuXG4gICAgICBtYXQtZXJyb3Ige1xuICAgICAgICAgIGZvbnQtc2l6ZTogNzUlO1xuICAgICAgfVxuICBgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxDaGVja2JveENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2xcbiAgY29udHJvbE5hbWU6IHN0cmluZ1xuICBjb250cm9sVmFsdWU6IGFueVxuICBjb250cm9sRGlzYWJsZWQgPSBmYWxzZVxuICBib3VuZENvbnRyb2wgPSBmYWxzZVxuICBvcHRpb25zOiBhbnlcbiAgdHJ1ZVZhbHVlOiBhbnkgPSB0cnVlXG4gIGZhbHNlVmFsdWU6IGFueSA9IGZhbHNlXG4gIHNob3dTbGlkZVRvZ2dsZSA9IGZhbHNlXG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBnZXQgaXNDaGVja2VkKCkge1xuICAgIHJldHVybiB0aGlzLmpzZi5nZXRGb3JtQ29udHJvbFZhbHVlKHRoaXMpID09PSB0aGlzLnRydWVWYWx1ZVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge31cbiAgICB0aGlzLmpzZi5pbml0aWFsaXplQ29udHJvbCh0aGlzLCAhdGhpcy5vcHRpb25zLnJlYWRvbmx5KVxuICAgIGlmICh0aGlzLmNvbnRyb2xWYWx1ZSA9PT0gbnVsbCB8fCB0aGlzLmNvbnRyb2xWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmNvbnRyb2xWYWx1ZSA9IGZhbHNlXG4gICAgICB0aGlzLmpzZi51cGRhdGVWYWx1ZSh0aGlzLCB0aGlzLmZhbHNlVmFsdWUpXG4gICAgfVxuICAgIGlmICh0aGlzLmxheW91dE5vZGUudHlwZSA9PT0gJ3NsaWRlLXRvZ2dsZScgfHxcbiAgICAgIHRoaXMubGF5b3V0Tm9kZS5mb3JtYXQgPT09ICdzbGlkZS10b2dnbGUnXG4gICAgKSB7XG4gICAgICB0aGlzLnNob3dTbGlkZVRvZ2dsZSA9IHRydWVcbiAgICB9XG4gIH1cblxuICB1cGRhdGVWYWx1ZShldmVudCkge1xuICAgIHRoaXMub3B0aW9ucy5zaG93RXJyb3JzID0gdHJ1ZVxuICAgIHRoaXMuanNmLnVwZGF0ZVZhbHVlKHRoaXMsIGV2ZW50LmNoZWNrZWQgPyB0aGlzLnRydWVWYWx1ZSA6IHRoaXMuZmFsc2VWYWx1ZSlcbiAgfVxufVxuIl19