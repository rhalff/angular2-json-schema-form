import { Component, Input } from '@angular/core';
import { isArray } from '@ngsf/common';
import { buildTitleMap, JsonSchemaFormService } from '@ngsf/widget-library';
import * as i0 from "@angular/core";
import * as i1 from "@ngsf/widget-library";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/material/core";
import * as i5 from "@angular/material/form-field";
import * as i6 from "@angular/material/select";
function MaterialSelectComponent_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 7);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", (ctx_r0.options == null ? null : ctx_r0.options.prefix) || (ctx_r0.options == null ? null : ctx_r0.options.fieldAddonLeft), i0.ɵɵsanitizeHtml);
} }
function MaterialSelectComponent_mat_select_2_ng_template_1_mat_option_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 12);
    i0.ɵɵelement(1, "span", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const selectItem_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("value", selectItem_r7 == null ? null : selectItem_r7.value);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", selectItem_r7 == null ? null : selectItem_r7.name, i0.ɵɵsanitizeHtml);
} }
function MaterialSelectComponent_mat_select_2_ng_template_1_mat_optgroup_1_mat_option_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 12);
    i0.ɵɵelement(1, "span", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const subItem_r12 = ctx.$implicit;
    i0.ɵɵproperty("value", subItem_r12 == null ? null : subItem_r12.value);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", subItem_r12 == null ? null : subItem_r12.name, i0.ɵɵsanitizeHtml);
} }
function MaterialSelectComponent_mat_select_2_ng_template_1_mat_optgroup_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-optgroup", 14);
    i0.ɵɵtemplate(1, MaterialSelectComponent_mat_select_2_ng_template_1_mat_optgroup_1_mat_option_1_Template, 2, 2, "mat-option", 15);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const selectItem_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("label", selectItem_r7 == null ? null : selectItem_r7.group);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", selectItem_r7.items);
} }
function MaterialSelectComponent_mat_select_2_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, MaterialSelectComponent_mat_select_2_ng_template_1_mat_option_0_Template, 2, 2, "mat-option", 10);
    i0.ɵɵtemplate(1, MaterialSelectComponent_mat_select_2_ng_template_1_mat_optgroup_1_Template, 2, 2, "mat-optgroup", 11);
} if (rf & 2) {
    const selectItem_r7 = ctx.$implicit;
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngIf", !ctx_r6.isArray(selectItem_r7 == null ? null : selectItem_r7.items));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r6.isArray(selectItem_r7 == null ? null : selectItem_r7.items));
} }
function MaterialSelectComponent_mat_select_2_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-select", 8);
    i0.ɵɵlistener("blur", function MaterialSelectComponent_mat_select_2_Template_mat_select_blur_0_listener() { i0.ɵɵrestoreView(_r15); const ctx_r14 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r14.options.showErrors = true); });
    i0.ɵɵtemplate(1, MaterialSelectComponent_mat_select_2_ng_template_1_Template, 2, 2, "ng-template", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("width", "100%");
    i0.ɵɵproperty("formControl", ctx_r1.formControl)("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id))("multiple", ctx_r1.options == null ? null : ctx_r1.options.multiple)("placeholder", (ctx_r1.options == null ? null : ctx_r1.options.notitle) ? ctx_r1.options == null ? null : ctx_r1.options.placeholder : ctx_r1.options == null ? null : ctx_r1.options.title)("required", ctx_r1.options == null ? null : ctx_r1.options.required);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Status")("name", ctx_r1.controlName);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.selectList);
} }
function MaterialSelectComponent_mat_select_3_ng_template_1_mat_option_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 12);
    i0.ɵɵelement(1, "span", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const selectItem_r17 = i0.ɵɵnextContext().$implicit;
    const ctx_r18 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("value", selectItem_r17 == null ? null : selectItem_r17.value);
    i0.ɵɵattribute("selected", (selectItem_r17 == null ? null : selectItem_r17.value) === ctx_r18.controlValue);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", selectItem_r17 == null ? null : selectItem_r17.name, i0.ɵɵsanitizeHtml);
} }
function MaterialSelectComponent_mat_select_3_ng_template_1_mat_optgroup_1_mat_option_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 12);
    i0.ɵɵelement(1, "span", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const subItem_r22 = ctx.$implicit;
    const ctx_r21 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("value", subItem_r22 == null ? null : subItem_r22.value);
    i0.ɵɵattribute("selected", (subItem_r22 == null ? null : subItem_r22.value) === ctx_r21.controlValue);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", subItem_r22 == null ? null : subItem_r22.name, i0.ɵɵsanitizeHtml);
} }
function MaterialSelectComponent_mat_select_3_ng_template_1_mat_optgroup_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-optgroup", 14);
    i0.ɵɵtemplate(1, MaterialSelectComponent_mat_select_3_ng_template_1_mat_optgroup_1_mat_option_1_Template, 2, 3, "mat-option", 15);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const selectItem_r17 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("label", selectItem_r17 == null ? null : selectItem_r17.group);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", selectItem_r17.items);
} }
function MaterialSelectComponent_mat_select_3_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, MaterialSelectComponent_mat_select_3_ng_template_1_mat_option_0_Template, 2, 3, "mat-option", 10);
    i0.ɵɵtemplate(1, MaterialSelectComponent_mat_select_3_ng_template_1_mat_optgroup_1_Template, 2, 2, "mat-optgroup", 11);
} if (rf & 2) {
    const selectItem_r17 = ctx.$implicit;
    const ctx_r16 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngIf", !ctx_r16.isArray(selectItem_r17 == null ? null : selectItem_r17.items));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r16.isArray(selectItem_r17 == null ? null : selectItem_r17.items));
} }
function MaterialSelectComponent_mat_select_3_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-select", 16);
    i0.ɵɵlistener("blur", function MaterialSelectComponent_mat_select_3_Template_mat_select_blur_0_listener() { i0.ɵɵrestoreView(_r25); const ctx_r24 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r24.options.showErrors = true); })("selectionChange", function MaterialSelectComponent_mat_select_3_Template_mat_select_selectionChange_0_listener($event) { i0.ɵɵrestoreView(_r25); const ctx_r26 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r26.updateValue($event)); });
    i0.ɵɵtemplate(1, MaterialSelectComponent_mat_select_3_ng_template_1_Template, 2, 2, "ng-template", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("width", "100%");
    i0.ɵɵproperty("disabled", ctx_r2.controlDisabled || (ctx_r2.options == null ? null : ctx_r2.options.readonly))("id", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id))("multiple", ctx_r2.options == null ? null : ctx_r2.options.multiple)("placeholder", (ctx_r2.options == null ? null : ctx_r2.options.notitle) ? ctx_r2.options == null ? null : ctx_r2.options.placeholder : ctx_r2.options == null ? null : ctx_r2.options.title)("required", ctx_r2.options == null ? null : ctx_r2.options.required)("value", ctx_r2.controlValue);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Status")("name", ctx_r2.controlName);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.selectList);
} }
function MaterialSelectComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 17);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", (ctx_r3.options == null ? null : ctx_r3.options.suffix) || (ctx_r3.options == null ? null : ctx_r3.options.fieldAddonRight), i0.ɵɵsanitizeHtml);
} }
function MaterialSelectComponent_mat_hint_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-hint", 18);
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r4.options == null ? null : ctx_r4.options.description, i0.ɵɵsanitizeHtml);
} }
function MaterialSelectComponent_mat_error_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-error", 13);
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r5.options == null ? null : ctx_r5.options.errorMessage, i0.ɵɵsanitizeHtml);
} }
export class MaterialSelectComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.selectList = [];
        this.isArray = isArray;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.selectList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, !!this.options.required, !!this.options.flatList);
        this.jsf.initializeControl(this, !this.options.readonly);
        if (!this.options.notitle && !this.options.description && this.options.placeholder) {
            this.options.description = this.options.placeholder;
        }
    }
    updateValue(event) {
        this.options.showErrors = true;
        this.jsf.updateValue(this, event.value);
    }
}
MaterialSelectComponent.ɵfac = function MaterialSelectComponent_Factory(t) { return new (t || MaterialSelectComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialSelectComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialSelectComponent, selectors: [["material-select-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 7, vars: 11, consts: [[3, "floatLabel"], ["matPrefix", "", 3, "innerHTML", 4, "ngIf"], [3, "formControl", "id", "multiple", "placeholder", "required", "width", "blur", 4, "ngIf"], [3, "disabled", "id", "multiple", "placeholder", "required", "width", "value", "blur", "selectionChange", 4, "ngIf"], ["matSuffix", "", 3, "innerHTML", 4, "ngIf"], ["align", "end", 3, "innerHTML", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], ["matPrefix", "", 3, "innerHTML"], [3, "formControl", "id", "multiple", "placeholder", "required", "blur"], ["ngFor", "", 3, "ngForOf"], [3, "value", 4, "ngIf"], [3, "label", 4, "ngIf"], [3, "value"], [3, "innerHTML"], [3, "label"], [3, "value", 4, "ngFor", "ngForOf"], [3, "disabled", "id", "multiple", "placeholder", "required", "value", "blur", "selectionChange"], ["matSuffix", "", 3, "innerHTML"], ["align", "end", 3, "innerHTML"]], template: function MaterialSelectComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "mat-form-field", 0);
        i0.ɵɵtemplate(1, MaterialSelectComponent_span_1_Template, 1, 1, "span", 1);
        i0.ɵɵtemplate(2, MaterialSelectComponent_mat_select_2_Template, 2, 10, "mat-select", 2);
        i0.ɵɵtemplate(3, MaterialSelectComponent_mat_select_3_Template, 2, 11, "mat-select", 3);
        i0.ɵɵtemplate(4, MaterialSelectComponent_span_4_Template, 1, 1, "span", 4);
        i0.ɵɵtemplate(5, MaterialSelectComponent_mat_hint_5_Template, 1, 1, "mat-hint", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(6, MaterialSelectComponent_mat_error_6_Template, 1, 1, "mat-error", 6);
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
    } }, dependencies: [i2.NgForOf, i2.NgIf, i3.NgControlStatus, i3.RequiredValidator, i3.FormControlDirective, i4.MatOption, i4.MatOptgroup, i5.MatFormField, i5.MatHint, i5.MatError, i5.MatPrefix, i5.MatSuffix, i6.MatSelect], styles: ["mat-error[_ngcontent-%COMP%]{font-size:75%;margin-top:-1rem;margin-bottom:.5rem}  mat-form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix{width:initial}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialSelectComponent, [{
        type: Component,
        args: [{ selector: 'material-select-widget', template: `
      <mat-form-field
              [class]="options?.htmlClass || ''"
              [floatLabel]="options?.floatPlaceholder || (options?.notitle ? 'never' : 'auto')"
              [style.width]="'100%'">
      <span matPrefix *ngIf="options?.prefix || options?.fieldAddonLeft"
            [innerHTML]="options?.prefix || options?.fieldAddonLeft"></span>
          <mat-select *ngIf="boundControl"
                      [formControl]="formControl"
                      [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                      [attr.name]="controlName"
                      [id]="'control' + layoutNode?._id"
                      [multiple]="options?.multiple"
                      [placeholder]="options?.notitle ? options?.placeholder : options?.title"
                      [required]="options?.required"
                      [style.width]="'100%'"
                      (blur)="options.showErrors = true">
              <ng-template ngFor let-selectItem [ngForOf]="selectList">
                  <mat-option *ngIf="!isArray(selectItem?.items)"
                              [value]="selectItem?.value">
                      <span [innerHTML]="selectItem?.name"></span>
                  </mat-option>
                  <mat-optgroup *ngIf="isArray(selectItem?.items)"
                                [label]="selectItem?.group">
                      <mat-option *ngFor="let subItem of selectItem.items"
                                  [value]="subItem?.value">
                          <span [innerHTML]="subItem?.name"></span>
                      </mat-option>
                  </mat-optgroup>
              </ng-template>
          </mat-select>
          <mat-select *ngIf="!boundControl"
                      [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                      [attr.name]="controlName"
                      [disabled]="controlDisabled || options?.readonly"
                      [id]="'control' + layoutNode?._id"
                      [multiple]="options?.multiple"
                      [placeholder]="options?.notitle ? options?.placeholder : options?.title"
                      [required]="options?.required"
                      [style.width]="'100%'"
                      [value]="controlValue"
                      (blur)="options.showErrors = true"
                      (selectionChange)="updateValue($event)">
              <ng-template ngFor let-selectItem [ngForOf]="selectList">
                  <mat-option *ngIf="!isArray(selectItem?.items)"
                              [attr.selected]="selectItem?.value === controlValue"
                              [value]="selectItem?.value">
                      <span [innerHTML]="selectItem?.name"></span>
                  </mat-option>
                  <mat-optgroup *ngIf="isArray(selectItem?.items)"
                                [label]="selectItem?.group">
                      <mat-option *ngFor="let subItem of selectItem.items"
                                  [attr.selected]="subItem?.value === controlValue"
                                  [value]="subItem?.value">
                          <span [innerHTML]="subItem?.name"></span>
                      </mat-option>
                  </mat-optgroup>
              </ng-template>
          </mat-select>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nc2YtbWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay9zcmMvbGliL2NvbXBvbmVudHMvbWF0ZXJpYWwtc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQTtBQUV0RCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBQ3BDLE9BQU8sRUFBQyxhQUFhLEVBQUUscUJBQXFCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQTs7Ozs7Ozs7O0lBU25FLDBCQUNzRTs7O0lBQWhFLHlLQUF3RDs7O0lBWWxELHNDQUN3QztJQUNwQywyQkFBNEM7SUFDaEQsaUJBQWE7OztJQUZELDBFQUEyQjtJQUM3QixlQUE4QjtJQUE5QixnR0FBOEI7OztJQUlwQyxzQ0FDcUM7SUFDakMsMkJBQXlDO0lBQzdDLGlCQUFhOzs7SUFGRCxzRUFBd0I7SUFDMUIsZUFBMkI7SUFBM0IsNEZBQTJCOzs7SUFKekMsd0NBQzBDO0lBQ3RDLGlJQUdhO0lBQ2pCLGlCQUFlOzs7SUFMRCwwRUFBMkI7SUFDTCxlQUFtQjtJQUFuQiw2Q0FBbUI7OztJQU52RCxrSEFHYTtJQUNiLHNIQU1lOzs7O0lBVkYsMEZBQWlDO0lBSS9CLGVBQWdDO0lBQWhDLHlGQUFnQzs7OztJQWZ2RCxxQ0FTK0M7SUFBbkMsK0tBQVEsNENBQXFCLElBQUksQ0FBQSxJQUFDO0lBQzFDLHFHQVljO0lBQ2xCLGlCQUFhOzs7SUFmRCwrQkFBc0I7SUFQdEIsZ0RBQTJCLDhFQUFBLHFFQUFBLDZMQUFBLHFFQUFBO0lBQzNCLHFIQUFnRSw0QkFBQTtJQVF0QyxlQUFzQjtJQUF0QiwyQ0FBc0I7OztJQTJCcEQsc0NBRXdDO0lBQ3BDLDJCQUE0QztJQUNoRCxpQkFBYTs7OztJQUZELDRFQUEyQjtJQUQzQiwyR0FBb0Q7SUFFdEQsZUFBOEI7SUFBOUIsa0dBQThCOzs7SUFJcEMsc0NBRXFDO0lBQ2pDLDJCQUF5QztJQUM3QyxpQkFBYTs7OztJQUZELHNFQUF3QjtJQUR4QixxR0FBaUQ7SUFFbkQsZUFBMkI7SUFBM0IsNEZBQTJCOzs7SUFMekMsd0NBQzBDO0lBQ3RDLGlJQUlhO0lBQ2pCLGlCQUFlOzs7SUFORCw0RUFBMkI7SUFDTCxlQUFtQjtJQUFuQiw4Q0FBbUI7OztJQVB2RCxrSEFJYTtJQUNiLHNIQU9lOzs7O0lBWkYsNkZBQWlDO0lBSy9CLGVBQWdDO0lBQWhDLDRGQUFnQzs7OztJQWxCdkQsc0NBV29EO0lBRHhDLCtLQUFRLDRDQUFxQixJQUFJLENBQUEsSUFBQyw4TEFDZixlQUFBLDJCQUFtQixDQUFBLElBREo7SUFFMUMscUdBY2M7SUFDbEIsaUJBQWE7OztJQW5CRCwrQkFBc0I7SUFMdEIsOEdBQWlELDhFQUFBLHFFQUFBLDZMQUFBLHFFQUFBLDhCQUFBO0lBRmpELHFIQUFnRSw0QkFBQTtJQVd0QyxlQUFzQjtJQUF0QiwyQ0FBc0I7OztJQWdCNUQsMkJBQ3VFOzs7SUFBakUsMEtBQXlEOzs7SUFDL0QsK0JBQ29FOzs7SUFBOUMseUdBQWtDOzs7SUFFNUQsZ0NBQzJEOzs7SUFBaEQsMEdBQW1DOztBQWNwRCxNQUFNLE9BQU8sdUJBQXVCO0lBYWxDLFlBQ1UsR0FBMEI7UUFBMUIsUUFBRyxHQUFILEdBQUcsQ0FBdUI7UUFWcEMsb0JBQWUsR0FBRyxLQUFLLENBQUE7UUFDdkIsaUJBQVksR0FBRyxLQUFLLENBQUE7UUFFcEIsZUFBVSxHQUFVLEVBQUUsQ0FBQTtRQUN0QixZQUFPLEdBQUcsT0FBTyxDQUFBO0lBUWpCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUNwRSxDQUFBO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3hELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQ2xGLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFBO1NBQ3BEO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFLO1FBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFBO1FBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDekMsQ0FBQzs7OEZBakNVLHVCQUF1Qjs0REFBdkIsdUJBQXVCO1FBOUU5Qix5Q0FHK0I7UUFDL0IsMEVBQ3NFO1FBQ2xFLHVGQXVCYTtRQUNiLHVGQTJCYTtRQUNiLDBFQUN1RTtRQUN2RSxrRkFDb0U7UUFDeEUsaUJBQWlCO1FBQ2pCLG9GQUMyRDs7UUEvRG5ELHlFQUFrQztRQUVsQywrQkFBc0I7UUFEdEIsbUtBQWlGO1FBRXhFLGVBQWdEO1FBQWhELHFJQUFnRDtRQUVoRCxlQUFrQjtRQUFsQix1Q0FBa0I7UUF3QmxCLGVBQW1CO1FBQW5CLHdDQUFtQjtRQTRCZixlQUFpRDtRQUFqRCxzSUFBaUQ7UUFFdkQsZUFBOEU7UUFBOUUscU1BQThFO1FBR2pGLGVBQWtEO1FBQWxELHVJQUFrRDs7dUZBZXZELHVCQUF1QjtjQWpGbkMsU0FBUzsyQkFDRSx3QkFBd0IsWUFDeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tFQWlFc0Q7d0VBdUJ2RCxVQUFVO2tCQUFsQixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3JtcydcbmltcG9ydCB7aXNBcnJheX0gZnJvbSAnQG5nc2YvY29tbW9uJ1xuaW1wb3J0IHtidWlsZFRpdGxlTWFwLCBKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJ0BuZ3NmL3dpZGdldC1saWJyYXJ5J1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXRlcmlhbC1zZWxlY3Qtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxtYXQtZm9ybS1maWVsZFxuICAgICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8uaHRtbENsYXNzIHx8ICcnXCJcbiAgICAgICAgICAgICAgW2Zsb2F0TGFiZWxdPVwib3B0aW9ucz8uZmxvYXRQbGFjZWhvbGRlciB8fCAob3B0aW9ucz8ubm90aXRsZSA/ICduZXZlcicgOiAnYXV0bycpXCJcbiAgICAgICAgICAgICAgW3N0eWxlLndpZHRoXT1cIicxMDAlJ1wiPlxuICAgICAgPHNwYW4gbWF0UHJlZml4ICpuZ0lmPVwib3B0aW9ucz8ucHJlZml4IHx8IG9wdGlvbnM/LmZpZWxkQWRkb25MZWZ0XCJcbiAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8ucHJlZml4IHx8IG9wdGlvbnM/LmZpZWxkQWRkb25MZWZ0XCI+PC9zcGFuPlxuICAgICAgICAgIDxtYXQtc2VsZWN0ICpuZ0lmPVwiYm91bmRDb250cm9sXCJcbiAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ1N0YXR1cydcIlxuICAgICAgICAgICAgICAgICAgICAgIFthdHRyLm5hbWVdPVwiY29udHJvbE5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICAgICAgICAgICAgICAgIFttdWx0aXBsZV09XCJvcHRpb25zPy5tdWx0aXBsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cIm9wdGlvbnM/Lm5vdGl0bGUgPyBvcHRpb25zPy5wbGFjZWhvbGRlciA6IG9wdGlvbnM/LnRpdGxlXCJcbiAgICAgICAgICAgICAgICAgICAgICBbcmVxdWlyZWRdPVwib3B0aW9ucz8ucmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS53aWR0aF09XCInMTAwJSdcIlxuICAgICAgICAgICAgICAgICAgICAgIChibHVyKT1cIm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWVcIj5cbiAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1zZWxlY3RJdGVtIFtuZ0Zvck9mXT1cInNlbGVjdExpc3RcIj5cbiAgICAgICAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0lmPVwiIWlzQXJyYXkoc2VsZWN0SXRlbT8uaXRlbXMpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJzZWxlY3RJdGVtPy52YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwic2VsZWN0SXRlbT8ubmFtZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxtYXQtb3B0Z3JvdXAgKm5nSWY9XCJpc0FycmF5KHNlbGVjdEl0ZW0/Lml0ZW1zKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsYWJlbF09XCJzZWxlY3RJdGVtPy5ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBzdWJJdGVtIG9mIHNlbGVjdEl0ZW0uaXRlbXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJzdWJJdGVtPy52YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cInN1Ykl0ZW0/Lm5hbWVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9tYXQtb3B0Z3JvdXA+XG4gICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgPC9tYXQtc2VsZWN0PlxuICAgICAgICAgIDxtYXQtc2VsZWN0ICpuZ0lmPVwiIWJvdW5kQ29udHJvbFwiXG4gICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnU3RhdHVzJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgW2F0dHIubmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImNvbnRyb2xEaXNhYmxlZCB8fCBvcHRpb25zPy5yZWFkb25seVwiXG4gICAgICAgICAgICAgICAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgW211bHRpcGxlXT1cIm9wdGlvbnM/Lm11bHRpcGxlXCJcbiAgICAgICAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwib3B0aW9ucz8ubm90aXRsZSA/IG9wdGlvbnM/LnBsYWNlaG9sZGVyIDogb3B0aW9ucz8udGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICAgIFtyZXF1aXJlZF09XCJvcHRpb25zPy5yZXF1aXJlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLndpZHRoXT1cIicxMDAlJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cImNvbnRyb2xWYWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwib3B0aW9ucy5zaG93RXJyb3JzID0gdHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgKHNlbGVjdGlvbkNoYW5nZSk9XCJ1cGRhdGVWYWx1ZSgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtc2VsZWN0SXRlbSBbbmdGb3JPZl09XCJzZWxlY3RMaXN0XCI+XG4gICAgICAgICAgICAgICAgICA8bWF0LW9wdGlvbiAqbmdJZj1cIiFpc0FycmF5KHNlbGVjdEl0ZW0/Lml0ZW1zKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5zZWxlY3RlZF09XCJzZWxlY3RJdGVtPy52YWx1ZSA9PT0gY29udHJvbFZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJzZWxlY3RJdGVtPy52YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwic2VsZWN0SXRlbT8ubmFtZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxtYXQtb3B0Z3JvdXAgKm5nSWY9XCJpc0FycmF5KHNlbGVjdEl0ZW0/Lml0ZW1zKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsYWJlbF09XCJzZWxlY3RJdGVtPy5ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBzdWJJdGVtIG9mIHNlbGVjdEl0ZW0uaXRlbXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnNlbGVjdGVkXT1cInN1Ykl0ZW0/LnZhbHVlID09PSBjb250cm9sVmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJzdWJJdGVtPy52YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cInN1Ykl0ZW0/Lm5hbWVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9tYXQtb3B0Z3JvdXA+XG4gICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgPC9tYXQtc2VsZWN0PlxuICAgICAgICAgIDxzcGFuIG1hdFN1ZmZpeCAqbmdJZj1cIm9wdGlvbnM/LnN1ZmZpeCB8fCBvcHRpb25zPy5maWVsZEFkZG9uUmlnaHRcIlxuICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uc3VmZml4IHx8IG9wdGlvbnM/LmZpZWxkQWRkb25SaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICA8bWF0LWhpbnQgKm5nSWY9XCJvcHRpb25zPy5kZXNjcmlwdGlvbiAmJiAoIW9wdGlvbnM/LnNob3dFcnJvcnMgfHwgIW9wdGlvbnM/LmVycm9yTWVzc2FnZSlcIlxuICAgICAgICAgICAgICAgICAgICBhbGlnbj1cImVuZFwiIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZGVzY3JpcHRpb25cIj48L21hdC1oaW50PlxuICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJvcHRpb25zPy5zaG93RXJyb3JzICYmIG9wdGlvbnM/LmVycm9yTWVzc2FnZVwiXG4gICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZXJyb3JNZXNzYWdlXCI+PC9tYXQtZXJyb3I+YCxcbiAgc3R5bGVzOiBbYFxuICAgICAgbWF0LWVycm9yIHtcbiAgICAgICAgICBmb250LXNpemU6IDc1JTtcbiAgICAgICAgICBtYXJnaW4tdG9wOiAtMXJlbTtcbiAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG4gICAgICB9XG5cbiAgICAgIDo6bmctZGVlcCBtYXQtZm9ybS1maWVsZCAubWF0LWZvcm0tZmllbGQtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtZmxleFxuICAgICAgLm1hdC1mb3JtLWZpZWxkLWluZml4IHtcbiAgICAgICAgICB3aWR0aDogaW5pdGlhbDtcbiAgICAgIH1cbiAgYF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbFxuICBjb250cm9sTmFtZTogc3RyaW5nXG4gIGNvbnRyb2xWYWx1ZTogYW55XG4gIGNvbnRyb2xEaXNhYmxlZCA9IGZhbHNlXG4gIGJvdW5kQ29udHJvbCA9IGZhbHNlXG4gIG9wdGlvbnM6IGFueVxuICBzZWxlY3RMaXN0OiBhbnlbXSA9IFtdXG4gIGlzQXJyYXkgPSBpc0FycmF5XG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmxheW91dE5vZGUub3B0aW9ucyB8fCB7fVxuICAgIHRoaXMuc2VsZWN0TGlzdCA9IGJ1aWxkVGl0bGVNYXAoXG4gICAgICB0aGlzLm9wdGlvbnMudGl0bGVNYXAgfHwgdGhpcy5vcHRpb25zLmVudW1OYW1lcyxcbiAgICAgIHRoaXMub3B0aW9ucy5lbnVtLCAhIXRoaXMub3B0aW9ucy5yZXF1aXJlZCwgISF0aGlzLm9wdGlvbnMuZmxhdExpc3RcbiAgICApXG4gICAgdGhpcy5qc2YuaW5pdGlhbGl6ZUNvbnRyb2wodGhpcywgIXRoaXMub3B0aW9ucy5yZWFkb25seSlcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5ub3RpdGxlICYmICF0aGlzLm9wdGlvbnMuZGVzY3JpcHRpb24gJiYgdGhpcy5vcHRpb25zLnBsYWNlaG9sZGVyKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZGVzY3JpcHRpb24gPSB0aGlzLm9wdGlvbnMucGxhY2Vob2xkZXJcbiAgICB9XG4gIH1cblxuICB1cGRhdGVWYWx1ZShldmVudCkge1xuICAgIHRoaXMub3B0aW9ucy5zaG93RXJyb3JzID0gdHJ1ZVxuICAgIHRoaXMuanNmLnVwZGF0ZVZhbHVlKHRoaXMsIGV2ZW50LnZhbHVlKVxuICB9XG59XG4iXX0=