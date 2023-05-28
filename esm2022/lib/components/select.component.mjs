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
class SelectComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    controlDisabled = false;
    boundControl = false;
    options;
    selectList = [];
    isArray = isArray;
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.selectList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, !!this.options.required, !!this.options.flatList);
        this.jsf.initializeControl(this);
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
    static ɵfac = function SelectComponent_Factory(t) { return new (t || SelectComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
    static ɵcmp = i0.ɵɵdefineComponent({ type: SelectComponent, selectors: [["select-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 4, vars: 5, consts: [[3, "class", "display", "innerHTML", 4, "ngIf"], [3, "formControl", "class", "id", "name", 4, "ngIf"], [3, "class", "disabled", "id", "name", "change", 4, "ngIf"], [3, "innerHTML"], [3, "formControl", "id", "name"], ["ngFor", "", 3, "ngForOf"], [3, "value", 4, "ngIf"], [3, "label", 4, "ngIf"], [3, "value"], [3, "label"], [3, "value", 4, "ngFor", "ngForOf"], [3, "disabled", "id", "name", "change"], [3, "selected", "value", 4, "ngIf"], [3, "selected", "value"]], template: function SelectComponent_Template(rf, ctx) { if (rf & 1) {
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
        } }, dependencies: [i2.NgForOf, i2.NgIf, i3.NgSelectOption, i3.ɵNgSelectMultipleOption, i3.SelectControlValueAccessor, i3.NgControlStatus, i3.FormControlDirective], encapsulation: 2 });
}
export { SelectComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nc2Ytd2lkZ2V0LWxpYnJhcnkvc3JjL2xpYi9jb21wb25lbnRzL3NlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUE7QUFFdEQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUNwQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQTtBQUMxRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNEJBQTRCLENBQUE7Ozs7OztJQU9sRCwyQkFJdUM7OztJQUZyQyxvRkFBdUM7SUFDdkMsaUdBQWdEO0lBQ2hELG1HQUE0QjtJQUg1Qiw2RkFBd0M7OztJQWF0QyxpQ0FDOEI7SUFDNUIsMEJBQTRDO0lBQzlDLGlCQUFTOzs7SUFGUCwwRUFBMkI7SUFDckIsZUFBOEI7SUFBOUIsZ0dBQThCOzs7SUFJcEMsaUNBQzJCO0lBQ3pCLDBCQUF5QztJQUMzQyxpQkFBUzs7O0lBRlAsb0VBQXdCO0lBQ2xCLGVBQTJCO0lBQTNCLDBGQUEyQjs7O0lBSnJDLG1DQUM4QjtJQUM1Qix5R0FHUztJQUNYLGlCQUFXOzs7SUFMVCwwRUFBMkI7SUFDQyxlQUFtQjtJQUFuQiw2Q0FBbUI7OztJQU5qRCw2RkFHUztJQUNULGlHQU1XOzs7O0lBVkYsMEZBQWlDO0lBSS9CLGVBQWdDO0lBQWhDLHlGQUFnQzs7O0lBYi9DLGlDQU91QjtJQUNyQix5RkFZYztJQUNoQixpQkFBUzs7O0lBaEJQLG9GQUF1QztJQUp2QyxnREFBMkIsOEVBQUEsNEJBQUE7SUFDM0IscUhBQWdFLDJGQUFBLHFFQUFBO0lBTTlCLGVBQXNCO0lBQXRCLDJDQUFzQjs7O0lBd0J0RCxrQ0FFOEI7SUFDNUIsMEJBQTRDO0lBQzlDLGlCQUFTOzs7O0lBSFAsMEdBQStDLCtEQUFBO0lBRXpDLGVBQThCO0lBQTlCLGtHQUE4Qjs7O0lBSXBDLGlDQUUyQjtJQUN6QiwwQkFBeUM7SUFDM0MsaUJBQVM7Ozs7SUFGUCxzRUFBd0I7SUFEeEIscUdBQWlEO0lBRTNDLGVBQTJCO0lBQTNCLDRGQUEyQjs7O0lBTHJDLG1DQUM4QjtJQUM1Qix5R0FJUztJQUNYLGlCQUFXOzs7SUFOVCw0RUFBMkI7SUFDQyxlQUFtQjtJQUFuQiw4Q0FBbUI7OztJQVBqRCw4RkFJUztJQUNULGlHQU9XOzs7O0lBWkYsNkZBQWlDO0lBSy9CLGVBQWdDO0lBQWhDLDRGQUFnQzs7OztJQWYvQyxrQ0FRaUM7SUFBL0IseUtBQVUsZUFBQSwyQkFBbUIsQ0FBQSxJQUFDO0lBQzlCLHlGQWNjO0lBQ2hCLGlCQUFTOzs7SUFwQlAsb0ZBQXVDO0lBQ3ZDLGlEQUE0Qiw4RUFBQSw0QkFBQTtJQUo1QixxSEFBZ0UsMkZBQUEscUVBQUE7SUFROUIsZUFBc0I7SUFBdEIsMkNBQXNCOztBQXpDaEUsTUEyRGEsZUFBZTtJQWNoQjtJQWJWLFdBQVcsQ0FBaUI7SUFDNUIsV0FBVyxDQUFRO0lBQ25CLFlBQVksQ0FBSztJQUNqQixlQUFlLEdBQUcsS0FBSyxDQUFBO0lBQ3ZCLFlBQVksR0FBRyxLQUFLLENBQUE7SUFDcEIsT0FBTyxDQUFLO0lBQ1osVUFBVSxHQUFVLEVBQUUsQ0FBQTtJQUN0QixPQUFPLEdBQUcsT0FBTyxDQUFBO0lBQ1IsVUFBVSxDQUFLO0lBQ2YsV0FBVyxDQUFVO0lBQ3JCLFNBQVMsQ0FBVTtJQUU1QixZQUNVLEdBQTBCO1FBQTFCLFFBQUcsR0FBSCxHQUFHLENBQXVCO0lBRXBDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUNwRSxDQUFBO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNsQyxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQUs7UUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNoRCxDQUFDO3lFQTdCVSxlQUFlOytDQUFmLGVBQWU7WUF4RHhCLDJCQUNxQztZQUNuQyxvRUFJdUM7WUFDdkMsc0VBcUJTO1lBQ1Qsc0VBd0JTO1lBQ1gsaUJBQU07O1lBckRKLHlFQUFrQztZQUMxQixlQUFvQjtZQUFwQixxRUFBb0I7WUFLbkIsZUFBa0I7WUFBbEIsdUNBQWtCO1lBc0JsQixlQUFtQjtZQUFuQix3Q0FBbUI7OztTQTJCckIsZUFBZTt1RkFBZixlQUFlO2NBM0QzQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQXVERDthQUNWO3dFQVVVLFVBQVU7a0JBQWxCLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJ1xuaW1wb3J0IHtpc0FycmF5fSBmcm9tICdAbmdzZi9jb21tb24nXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJ1xuaW1wb3J0IHtidWlsZFRpdGxlTWFwfSBmcm9tICcuLi9mdW5jdGlvbnMvYnVpbGRUaXRsZU1hcCdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2VsZWN0LXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/Lmh0bWxDbGFzcyB8fCAnJ1wiPlxuICAgICAgPGxhYmVsICpuZ0lmPVwib3B0aW9ucz8udGl0bGVcIlxuICAgICAgICBbYXR0ci5mb3JdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkXCJcbiAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmxhYmVsSHRtbENsYXNzIHx8ICcnXCJcbiAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwib3B0aW9ucz8ubm90aXRsZSA/ICdub25lJyA6ICcnXCJcbiAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy50aXRsZVwiPjwvbGFiZWw+XG4gICAgICA8c2VsZWN0ICpuZ0lmPVwiYm91bmRDb250cm9sXCJcbiAgICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnU3RhdHVzJ1wiXG4gICAgICAgIFthdHRyLnJlYWRvbmx5XT1cIm9wdGlvbnM/LnJlYWRvbmx5ID8gJ3JlYWRvbmx5JyA6IG51bGxcIlxuICAgICAgICBbYXR0ci5yZXF1aXJlZF09XCJvcHRpb25zPy5yZXF1aXJlZFwiXG4gICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5maWVsZEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiPlxuICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXNlbGVjdEl0ZW0gW25nRm9yT2ZdPVwic2VsZWN0TGlzdFwiPlxuICAgICAgICAgIDxvcHRpb24gKm5nSWY9XCIhaXNBcnJheShzZWxlY3RJdGVtPy5pdGVtcylcIlxuICAgICAgICAgICAgW3ZhbHVlXT1cInNlbGVjdEl0ZW0/LnZhbHVlXCI+XG4gICAgICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cInNlbGVjdEl0ZW0/Lm5hbWVcIj48L3NwYW4+XG4gICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGdyb3VwICpuZ0lmPVwiaXNBcnJheShzZWxlY3RJdGVtPy5pdGVtcylcIlxuICAgICAgICAgICAgW2xhYmVsXT1cInNlbGVjdEl0ZW0/Lmdyb3VwXCI+XG4gICAgICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBzdWJJdGVtIG9mIHNlbGVjdEl0ZW0uaXRlbXNcIlxuICAgICAgICAgICAgICBbdmFsdWVdPVwic3ViSXRlbT8udmFsdWVcIj5cbiAgICAgICAgICAgICAgPHNwYW4gW2lubmVySFRNTF09XCJzdWJJdGVtPy5uYW1lXCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgPC9vcHRncm91cD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvc2VsZWN0PlxuICAgICAgPHNlbGVjdCAqbmdJZj1cIiFib3VuZENvbnRyb2xcIlxuICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdTdGF0dXMnXCJcbiAgICAgICAgW2F0dHIucmVhZG9ubHldPVwib3B0aW9ucz8ucmVhZG9ubHkgPyAncmVhZG9ubHknIDogbnVsbFwiXG4gICAgICAgIFthdHRyLnJlcXVpcmVkXT1cIm9wdGlvbnM/LnJlcXVpcmVkXCJcbiAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmZpZWxkSHRtbENsYXNzIHx8ICcnXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImNvbnRyb2xEaXNhYmxlZFwiXG4gICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICAgIChjaGFuZ2UpPVwidXBkYXRlVmFsdWUoJGV2ZW50KVwiPlxuICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXNlbGVjdEl0ZW0gW25nRm9yT2ZdPVwic2VsZWN0TGlzdFwiPlxuICAgICAgICAgIDxvcHRpb24gKm5nSWY9XCIhaXNBcnJheShzZWxlY3RJdGVtPy5pdGVtcylcIlxuICAgICAgICAgICAgW3NlbGVjdGVkXT1cInNlbGVjdEl0ZW0/LnZhbHVlID09PSBjb250cm9sVmFsdWVcIlxuICAgICAgICAgICAgW3ZhbHVlXT1cInNlbGVjdEl0ZW0/LnZhbHVlXCI+XG4gICAgICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cInNlbGVjdEl0ZW0/Lm5hbWVcIj48L3NwYW4+XG4gICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGdyb3VwICpuZ0lmPVwiaXNBcnJheShzZWxlY3RJdGVtPy5pdGVtcylcIlxuICAgICAgICAgICAgW2xhYmVsXT1cInNlbGVjdEl0ZW0/Lmdyb3VwXCI+XG4gICAgICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBzdWJJdGVtIG9mIHNlbGVjdEl0ZW0uaXRlbXNcIlxuICAgICAgICAgICAgICBbYXR0ci5zZWxlY3RlZF09XCJzdWJJdGVtPy52YWx1ZSA9PT0gY29udHJvbFZhbHVlXCJcbiAgICAgICAgICAgICAgW3ZhbHVlXT1cInN1Ykl0ZW0/LnZhbHVlXCI+XG4gICAgICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwic3ViSXRlbT8ubmFtZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgIDwvb3B0Z3JvdXA+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L3NlbGVjdD5cbiAgICA8L2Rpdj5gLFxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sXG4gIGNvbnRyb2xOYW1lOiBzdHJpbmdcbiAgY29udHJvbFZhbHVlOiBhbnlcbiAgY29udHJvbERpc2FibGVkID0gZmFsc2VcbiAgYm91bmRDb250cm9sID0gZmFsc2VcbiAgb3B0aW9uczogYW55XG4gIHNlbGVjdExpc3Q6IGFueVtdID0gW11cbiAgaXNBcnJheSA9IGlzQXJyYXlcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9XG4gICAgdGhpcy5zZWxlY3RMaXN0ID0gYnVpbGRUaXRsZU1hcChcbiAgICAgIHRoaXMub3B0aW9ucy50aXRsZU1hcCB8fCB0aGlzLm9wdGlvbnMuZW51bU5hbWVzLFxuICAgICAgdGhpcy5vcHRpb25zLmVudW0sICEhdGhpcy5vcHRpb25zLnJlcXVpcmVkLCAhIXRoaXMub3B0aW9ucy5mbGF0TGlzdFxuICAgIClcbiAgICB0aGlzLmpzZi5pbml0aWFsaXplQ29udHJvbCh0aGlzKVxuICB9XG5cbiAgdXBkYXRlVmFsdWUoZXZlbnQpIHtcbiAgICB0aGlzLmpzZi51cGRhdGVWYWx1ZSh0aGlzLCBldmVudC50YXJnZXQudmFsdWUpXG4gIH1cbn1cbiJdfQ==