import { Component, Input } from '@angular/core';
import { isArray } from '@ngsf/common';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
import { buildTitleMap } from '../functions/buildTitleMap';
import * as i0 from "@angular/core";
import * as i1 from "../services/json-schema-form.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
function SelectComponent_label_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "label", 3);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r0.options == null ? null : ctx_r0.options.labelHtmlClass) || "");
    i0.ɵɵstyleProp("display", (ctx_r0.options == null ? null : ctx_r0.options.notitle) ? "none" : "");
    i0.ɵɵproperty("innerHTML", ctx_r0.options == null ? null : ctx_r0.options.title, i0.ɵɵsanitizeHtml);
    i0.ɵɵattribute("for", "control" + (ctx_r0.layoutNode == null ? null : ctx_r0.layoutNode._id));
} }
function SelectComponent_select_2_ng_template_1_option_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 8);
    i0.ɵɵelement(1, "span", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const selectItem_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("value", selectItem_r4 == null ? null : selectItem_r4.value);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", selectItem_r4 == null ? null : selectItem_r4.name, i0.ɵɵsanitizeHtml);
} }
function SelectComponent_select_2_ng_template_1_optgroup_1_option_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 8);
    i0.ɵɵelement(1, "span", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const subItem_r9 = ctx.$implicit;
    i0.ɵɵproperty("value", subItem_r9 == null ? null : subItem_r9.value);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", subItem_r9 == null ? null : subItem_r9.name, i0.ɵɵsanitizeHtml);
} }
function SelectComponent_select_2_ng_template_1_optgroup_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "optgroup", 9);
    i0.ɵɵtemplate(1, SelectComponent_select_2_ng_template_1_optgroup_1_option_1_Template, 2, 2, "option", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const selectItem_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("label", selectItem_r4 == null ? null : selectItem_r4.group);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", selectItem_r4.items);
} }
function SelectComponent_select_2_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, SelectComponent_select_2_ng_template_1_option_0_Template, 2, 2, "option", 6);
    i0.ɵɵtemplate(1, SelectComponent_select_2_ng_template_1_optgroup_1_Template, 2, 2, "optgroup", 7);
} if (rf & 2) {
    const selectItem_r4 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngIf", !ctx_r3.isArray(selectItem_r4 == null ? null : selectItem_r4.items));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.isArray(selectItem_r4 == null ? null : selectItem_r4.items));
} }
function SelectComponent_select_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "select", 4);
    i0.ɵɵtemplate(1, SelectComponent_select_2_ng_template_1_Template, 2, 2, "ng-template", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r1.options == null ? null : ctx_r1.options.fieldHtmlClass) || "");
    i0.ɵɵproperty("formControl", ctx_r1.formControl)("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id))("name", ctx_r1.controlName);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Status")("readonly", (ctx_r1.options == null ? null : ctx_r1.options.readonly) ? "readonly" : null)("required", ctx_r1.options == null ? null : ctx_r1.options.required);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.selectList);
} }
function SelectComponent_select_3_ng_template_1_option_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 13);
    i0.ɵɵelement(1, "span", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const selectItem_r12 = i0.ɵɵnextContext().$implicit;
    const ctx_r13 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("selected", (selectItem_r12 == null ? null : selectItem_r12.value) === ctx_r13.controlValue)("value", selectItem_r12 == null ? null : selectItem_r12.value);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", selectItem_r12 == null ? null : selectItem_r12.name, i0.ɵɵsanitizeHtml);
} }
function SelectComponent_select_3_ng_template_1_optgroup_1_option_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 8);
    i0.ɵɵelement(1, "span", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const subItem_r17 = ctx.$implicit;
    const ctx_r16 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("value", subItem_r17 == null ? null : subItem_r17.value);
    i0.ɵɵattribute("selected", (subItem_r17 == null ? null : subItem_r17.value) === ctx_r16.controlValue);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", subItem_r17 == null ? null : subItem_r17.name, i0.ɵɵsanitizeHtml);
} }
function SelectComponent_select_3_ng_template_1_optgroup_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "optgroup", 9);
    i0.ɵɵtemplate(1, SelectComponent_select_3_ng_template_1_optgroup_1_option_1_Template, 2, 3, "option", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const selectItem_r12 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("label", selectItem_r12 == null ? null : selectItem_r12.group);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", selectItem_r12.items);
} }
function SelectComponent_select_3_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, SelectComponent_select_3_ng_template_1_option_0_Template, 2, 3, "option", 12);
    i0.ɵɵtemplate(1, SelectComponent_select_3_ng_template_1_optgroup_1_Template, 2, 2, "optgroup", 7);
} if (rf & 2) {
    const selectItem_r12 = ctx.$implicit;
    const ctx_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngIf", !ctx_r11.isArray(selectItem_r12 == null ? null : selectItem_r12.items));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r11.isArray(selectItem_r12 == null ? null : selectItem_r12.items));
} }
function SelectComponent_select_3_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "select", 11);
    i0.ɵɵlistener("change", function SelectComponent_select_3_Template_select_change_0_listener($event) { i0.ɵɵrestoreView(_r20); const ctx_r19 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r19.updateValue($event)); });
    i0.ɵɵtemplate(1, SelectComponent_select_3_ng_template_1_Template, 2, 2, "ng-template", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r2.options == null ? null : ctx_r2.options.fieldHtmlClass) || "");
    i0.ɵɵproperty("disabled", ctx_r2.controlDisabled)("id", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id))("name", ctx_r2.controlName);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Status")("readonly", (ctx_r2.options == null ? null : ctx_r2.options.readonly) ? "readonly" : null)("required", ctx_r2.options == null ? null : ctx_r2.options.required);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.selectList);
} }
export class SelectComponent {
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
        this.jsf.initializeControl(this);
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
}
SelectComponent.ɵfac = function SelectComponent_Factory(t) { return new (t || SelectComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
SelectComponent.ɵcmp = i0.ɵɵdefineComponent({ type: SelectComponent, selectors: [["select-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 4, vars: 5, consts: [[3, "class", "display", "innerHTML", 4, "ngIf"], [3, "formControl", "class", "id", "name", 4, "ngIf"], [3, "class", "disabled", "id", "name", "change", 4, "ngIf"], [3, "innerHTML"], [3, "formControl", "id", "name"], ["ngFor", "", 3, "ngForOf"], [3, "value", 4, "ngIf"], [3, "label", 4, "ngIf"], [3, "value"], [3, "label"], [3, "value", 4, "ngFor", "ngForOf"], [3, "disabled", "id", "name", "change"], [3, "selected", "value", 4, "ngIf"], [3, "selected", "value"]], template: function SelectComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div");
        i0.ɵɵtemplate(1, SelectComponent_label_1_Template, 1, 6, "label", 0);
        i0.ɵɵtemplate(2, SelectComponent_select_2_Template, 2, 9, "select", 1);
        i0.ɵɵtemplate(3, SelectComponent_select_3_Template, 2, 9, "select", 2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.htmlClass) || "");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.title);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.boundControl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.boundControl);
    } }, dependencies: [i2.NgForOf, i2.NgIf, i3.NgSelectOption, i3.ɵNgSelectMultipleOption, i3.SelectControlValueAccessor, i3.NgControlStatus, i3.RequiredValidator, i3.FormControlDirective], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SelectComponent, [{
        type: Component,
        args: [{
                selector: 'select-widget',
                template: `
    <div
      [class]="options?.htmlClass || ''">
      <label *ngIf="options?.title"
        [attr.for]="'control' + layoutNode?._id"
        [class]="options?.labelHtmlClass || ''"
        [style.display]="options?.notitle ? 'none' : ''"
        [innerHTML]="options?.title"></label>
      <select *ngIf="boundControl"
        [formControl]="formControl"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.required]="options?.required"
        [class]="options?.fieldHtmlClass || ''"
        [id]="'control' + layoutNode?._id"
        [name]="controlName">
        <ng-template ngFor let-selectItem [ngForOf]="selectList">
          <option *ngIf="!isArray(selectItem?.items)"
            [value]="selectItem?.value">
            <span [innerHTML]="selectItem?.name"></span>
          </option>
          <optgroup *ngIf="isArray(selectItem?.items)"
            [label]="selectItem?.group">
            <option *ngFor="let subItem of selectItem.items"
              [value]="subItem?.value">
              <span [innerHTML]="subItem?.name"></span>
            </option>
          </optgroup>
        </ng-template>
      </select>
      <select *ngIf="!boundControl"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.required]="options?.required"
        [class]="options?.fieldHtmlClass || ''"
        [disabled]="controlDisabled"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        (change)="updateValue($event)">
        <ng-template ngFor let-selectItem [ngForOf]="selectList">
          <option *ngIf="!isArray(selectItem?.items)"
            [selected]="selectItem?.value === controlValue"
            [value]="selectItem?.value">
            <span [innerHTML]="selectItem?.name"></span>
          </option>
          <optgroup *ngIf="isArray(selectItem?.items)"
            [label]="selectItem?.group">
            <option *ngFor="let subItem of selectItem.items"
              [attr.selected]="subItem?.value === controlValue"
              [value]="subItem?.value">
              <span [innerHTML]="subItem?.name"></span>
            </option>
          </optgroup>
        </ng-template>
      </select>
    </div>`,
            }]
    }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nc2Ytd2lkZ2V0LWxpYnJhcnkvc3JjL2xpYi9jb21wb25lbnRzL3NlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUE7QUFFdEQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUNwQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQTtBQUMxRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNEJBQTRCLENBQUE7Ozs7OztJQU9sRCwyQkFJdUM7OztJQUZyQyxvRkFBdUM7SUFDdkMsaUdBQWdEO0lBQ2hELG1HQUE0QjtJQUg1Qiw2RkFBd0M7OztJQWF0QyxpQ0FDOEI7SUFDNUIsMEJBQTRDO0lBQzlDLGlCQUFTOzs7SUFGUCwwRUFBMkI7SUFDckIsZUFBOEI7SUFBOUIsZ0dBQThCOzs7SUFJcEMsaUNBQzJCO0lBQ3pCLDBCQUF5QztJQUMzQyxpQkFBUzs7O0lBRlAsb0VBQXdCO0lBQ2xCLGVBQTJCO0lBQTNCLDBGQUEyQjs7O0lBSnJDLG1DQUM4QjtJQUM1Qix5R0FHUztJQUNYLGlCQUFXOzs7SUFMVCwwRUFBMkI7SUFDQyxlQUFtQjtJQUFuQiw2Q0FBbUI7OztJQU5qRCw2RkFHUztJQUNULGlHQU1XOzs7O0lBVkYsMEZBQWlDO0lBSS9CLGVBQWdDO0lBQWhDLHlGQUFnQzs7O0lBYi9DLGlDQU91QjtJQUNyQix5RkFZYztJQUNoQixpQkFBUzs7O0lBaEJQLG9GQUF1QztJQUp2QyxnREFBMkIsOEVBQUEsNEJBQUE7SUFDM0IscUhBQWdFLDJGQUFBLHFFQUFBO0lBTTlCLGVBQXNCO0lBQXRCLDJDQUFzQjs7O0lBd0J0RCxrQ0FFOEI7SUFDNUIsMEJBQTRDO0lBQzlDLGlCQUFTOzs7O0lBSFAsMEdBQStDLCtEQUFBO0lBRXpDLGVBQThCO0lBQTlCLGtHQUE4Qjs7O0lBSXBDLGlDQUUyQjtJQUN6QiwwQkFBeUM7SUFDM0MsaUJBQVM7Ozs7SUFGUCxzRUFBd0I7SUFEeEIscUdBQWlEO0lBRTNDLGVBQTJCO0lBQTNCLDRGQUEyQjs7O0lBTHJDLG1DQUM4QjtJQUM1Qix5R0FJUztJQUNYLGlCQUFXOzs7SUFOVCw0RUFBMkI7SUFDQyxlQUFtQjtJQUFuQiw4Q0FBbUI7OztJQVBqRCw4RkFJUztJQUNULGlHQU9XOzs7O0lBWkYsNkZBQWlDO0lBSy9CLGVBQWdDO0lBQWhDLDRGQUFnQzs7OztJQWYvQyxrQ0FRaUM7SUFBL0IseUtBQVUsZUFBQSwyQkFBbUIsQ0FBQSxJQUFDO0lBQzlCLHlGQWNjO0lBQ2hCLGlCQUFTOzs7SUFwQlAsb0ZBQXVDO0lBQ3ZDLGlEQUE0Qiw4RUFBQSw0QkFBQTtJQUo1QixxSEFBZ0UsMkZBQUEscUVBQUE7SUFROUIsZUFBc0I7SUFBdEIsMkNBQXNCOztBQWtCaEUsTUFBTSxPQUFPLGVBQWU7SUFhMUIsWUFDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQVZwQyxvQkFBZSxHQUFHLEtBQUssQ0FBQTtRQUN2QixpQkFBWSxHQUFHLEtBQUssQ0FBQTtRQUVwQixlQUFVLEdBQVUsRUFBRSxDQUFBO1FBQ3RCLFlBQU8sR0FBRyxPQUFPLENBQUE7SUFRakIsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQ3BFLENBQUE7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2xDLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBSztRQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hELENBQUM7OzhFQTdCVSxlQUFlO29EQUFmLGVBQWU7UUF4RHhCLDJCQUNxQztRQUNuQyxvRUFJdUM7UUFDdkMsc0VBcUJTO1FBQ1Qsc0VBd0JTO1FBQ1gsaUJBQU07O1FBckRKLHlFQUFrQztRQUMxQixlQUFvQjtRQUFwQixxRUFBb0I7UUFLbkIsZUFBa0I7UUFBbEIsdUNBQWtCO1FBc0JsQixlQUFtQjtRQUFuQix3Q0FBbUI7O3VGQTJCckIsZUFBZTtjQTNEM0IsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0F1REQ7YUFDVjt3RUFVVSxVQUFVO2tCQUFsQixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3JtcydcbmltcG9ydCB7aXNBcnJheX0gZnJvbSAnQG5nc2YvY29tbW9uJ1xuaW1wb3J0IHtKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSdcbmltcG9ydCB7YnVpbGRUaXRsZU1hcH0gZnJvbSAnLi4vZnVuY3Rpb25zL2J1aWxkVGl0bGVNYXAnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NlbGVjdC13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIFtjbGFzc109XCJvcHRpb25zPy5odG1sQ2xhc3MgfHwgJydcIj5cbiAgICAgIDxsYWJlbCAqbmdJZj1cIm9wdGlvbnM/LnRpdGxlXCJcbiAgICAgICAgW2F0dHIuZm9yXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5sYWJlbEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cIm9wdGlvbnM/Lm5vdGl0bGUgPyAnbm9uZScgOiAnJ1wiXG4gICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8udGl0bGVcIj48L2xhYmVsPlxuICAgICAgPHNlbGVjdCAqbmdJZj1cImJvdW5kQ29udHJvbFwiXG4gICAgICAgIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiXG4gICAgICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ1N0YXR1cydcIlxuICAgICAgICBbYXR0ci5yZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgW2F0dHIucmVxdWlyZWRdPVwib3B0aW9ucz8ucmVxdWlyZWRcIlxuICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8uZmllbGRIdG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICBbaWRdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkXCJcbiAgICAgICAgW25hbWVdPVwiY29udHJvbE5hbWVcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1zZWxlY3RJdGVtIFtuZ0Zvck9mXT1cInNlbGVjdExpc3RcIj5cbiAgICAgICAgICA8b3B0aW9uICpuZ0lmPVwiIWlzQXJyYXkoc2VsZWN0SXRlbT8uaXRlbXMpXCJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJzZWxlY3RJdGVtPy52YWx1ZVwiPlxuICAgICAgICAgICAgPHNwYW4gW2lubmVySFRNTF09XCJzZWxlY3RJdGVtPy5uYW1lXCI+PC9zcGFuPlxuICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRncm91cCAqbmdJZj1cImlzQXJyYXkoc2VsZWN0SXRlbT8uaXRlbXMpXCJcbiAgICAgICAgICAgIFtsYWJlbF09XCJzZWxlY3RJdGVtPy5ncm91cFwiPlxuICAgICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgc3ViSXRlbSBvZiBzZWxlY3RJdGVtLml0ZW1zXCJcbiAgICAgICAgICAgICAgW3ZhbHVlXT1cInN1Ykl0ZW0/LnZhbHVlXCI+XG4gICAgICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwic3ViSXRlbT8ubmFtZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgIDwvb3B0Z3JvdXA+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L3NlbGVjdD5cbiAgICAgIDxzZWxlY3QgKm5nSWY9XCIhYm91bmRDb250cm9sXCJcbiAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnU3RhdHVzJ1wiXG4gICAgICAgIFthdHRyLnJlYWRvbmx5XT1cIm9wdGlvbnM/LnJlYWRvbmx5ID8gJ3JlYWRvbmx5JyA6IG51bGxcIlxuICAgICAgICBbYXR0ci5yZXF1aXJlZF09XCJvcHRpb25zPy5yZXF1aXJlZFwiXG4gICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5maWVsZEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgIFtkaXNhYmxlZF09XCJjb250cm9sRGlzYWJsZWRcIlxuICAgICAgICBbaWRdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkXCJcbiAgICAgICAgW25hbWVdPVwiY29udHJvbE5hbWVcIlxuICAgICAgICAoY2hhbmdlKT1cInVwZGF0ZVZhbHVlKCRldmVudClcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1zZWxlY3RJdGVtIFtuZ0Zvck9mXT1cInNlbGVjdExpc3RcIj5cbiAgICAgICAgICA8b3B0aW9uICpuZ0lmPVwiIWlzQXJyYXkoc2VsZWN0SXRlbT8uaXRlbXMpXCJcbiAgICAgICAgICAgIFtzZWxlY3RlZF09XCJzZWxlY3RJdGVtPy52YWx1ZSA9PT0gY29udHJvbFZhbHVlXCJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJzZWxlY3RJdGVtPy52YWx1ZVwiPlxuICAgICAgICAgICAgPHNwYW4gW2lubmVySFRNTF09XCJzZWxlY3RJdGVtPy5uYW1lXCI+PC9zcGFuPlxuICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRncm91cCAqbmdJZj1cImlzQXJyYXkoc2VsZWN0SXRlbT8uaXRlbXMpXCJcbiAgICAgICAgICAgIFtsYWJlbF09XCJzZWxlY3RJdGVtPy5ncm91cFwiPlxuICAgICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgc3ViSXRlbSBvZiBzZWxlY3RJdGVtLml0ZW1zXCJcbiAgICAgICAgICAgICAgW2F0dHIuc2VsZWN0ZWRdPVwic3ViSXRlbT8udmFsdWUgPT09IGNvbnRyb2xWYWx1ZVwiXG4gICAgICAgICAgICAgIFt2YWx1ZV09XCJzdWJJdGVtPy52YWx1ZVwiPlxuICAgICAgICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cInN1Ykl0ZW0/Lm5hbWVcIj48L3NwYW4+XG4gICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICA8L29wdGdyb3VwPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9zZWxlY3Q+XG4gICAgPC9kaXY+YCxcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbFxuICBjb250cm9sTmFtZTogc3RyaW5nXG4gIGNvbnRyb2xWYWx1ZTogYW55XG4gIGNvbnRyb2xEaXNhYmxlZCA9IGZhbHNlXG4gIGJvdW5kQ29udHJvbCA9IGZhbHNlXG4gIG9wdGlvbnM6IGFueVxuICBzZWxlY3RMaXN0OiBhbnlbXSA9IFtdXG4gIGlzQXJyYXkgPSBpc0FycmF5XG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmxheW91dE5vZGUub3B0aW9ucyB8fCB7fVxuICAgIHRoaXMuc2VsZWN0TGlzdCA9IGJ1aWxkVGl0bGVNYXAoXG4gICAgICB0aGlzLm9wdGlvbnMudGl0bGVNYXAgfHwgdGhpcy5vcHRpb25zLmVudW1OYW1lcyxcbiAgICAgIHRoaXMub3B0aW9ucy5lbnVtLCAhIXRoaXMub3B0aW9ucy5yZXF1aXJlZCwgISF0aGlzLm9wdGlvbnMuZmxhdExpc3RcbiAgICApXG4gICAgdGhpcy5qc2YuaW5pdGlhbGl6ZUNvbnRyb2wodGhpcylcbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKGV2ZW50KSB7XG4gICAgdGhpcy5qc2YudXBkYXRlVmFsdWUodGhpcywgZXZlbnQudGFyZ2V0LnZhbHVlKVxuICB9XG59XG4iXX0=