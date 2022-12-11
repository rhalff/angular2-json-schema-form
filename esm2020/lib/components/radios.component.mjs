import { Component, Input } from '@angular/core';
import { buildTitleMap } from '../functions/buildTitleMap';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/json-schema-form.service";
import * as i2 from "@angular/common";
function RadiosComponent_label_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "label", 3);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r0.options == null ? null : ctx_r0.options.labelHtmlClass) || "");
    i0.ɵɵstyleProp("display", (ctx_r0.options == null ? null : ctx_r0.options.notitle) ? "none" : "");
    i0.ɵɵproperty("innerHTML", ctx_r0.options == null ? null : ctx_r0.options.title, i0.ɵɵsanitizeHtml);
    i0.ɵɵattribute("for", "control" + (ctx_r0.layoutNode == null ? null : ctx_r0.layoutNode._id));
} }
function RadiosComponent_div_1_label_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label")(1, "input", 5);
    i0.ɵɵlistener("change", function RadiosComponent_div_1_label_1_Template_input_change_1_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r5.updateValue($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(2, "span", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const radioItem_r4 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap(((ctx_r3.options == null ? null : ctx_r3.options.itemLabelHtmlClass) || "") + (ctx_r3.controlValue + "" === (radioItem_r4 == null ? null : radioItem_r4.value) + "" ? " " + ((ctx_r3.options == null ? null : ctx_r3.options.activeClass) || "") + " " + ((ctx_r3.options == null ? null : ctx_r3.options.style == null ? null : ctx_r3.options.style.selected) || "") : " " + ((ctx_r3.options == null ? null : ctx_r3.options.style == null ? null : ctx_r3.options.style.unselected) || "")));
    i0.ɵɵattribute("for", "control" + (ctx_r3.layoutNode == null ? null : ctx_r3.layoutNode._id) + "/" + (radioItem_r4 == null ? null : radioItem_r4.value));
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap((ctx_r3.options == null ? null : ctx_r3.options.fieldHtmlClass) || "");
    i0.ɵɵproperty("checked", (radioItem_r4 == null ? null : radioItem_r4.value) === ctx_r3.controlValue)("disabled", ctx_r3.controlDisabled)("id", "control" + (ctx_r3.layoutNode == null ? null : ctx_r3.layoutNode._id) + "/" + (radioItem_r4 == null ? null : radioItem_r4.value))("name", ctx_r3.controlName)("value", radioItem_r4 == null ? null : radioItem_r4.value);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r3.layoutNode == null ? null : ctx_r3.layoutNode._id) + "Status")("readonly", (ctx_r3.options == null ? null : ctx_r3.options.readonly) ? "readonly" : null)("required", ctx_r3.options == null ? null : ctx_r3.options.required);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", radioItem_r4 == null ? null : radioItem_r4.name, i0.ɵɵsanitizeHtml);
} }
function RadiosComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, RadiosComponent_div_1_label_1_Template, 3, 14, "label", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r1.options == null ? null : ctx_r1.options.htmlClass) || "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.radiosList);
} }
function RadiosComponent_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "label")(2, "input", 5);
    i0.ɵɵlistener("change", function RadiosComponent_div_2_div_1_Template_input_change_2_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r9.updateValue($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "span", 3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const radioItem_r8 = ctx.$implicit;
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap((ctx_r7.options == null ? null : ctx_r7.options.htmlClass) || "");
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap(((ctx_r7.options == null ? null : ctx_r7.options.itemLabelHtmlClass) || "") + (ctx_r7.controlValue + "" === (radioItem_r8 == null ? null : radioItem_r8.value) + "" ? " " + ((ctx_r7.options == null ? null : ctx_r7.options.activeClass) || "") + " " + ((ctx_r7.options == null ? null : ctx_r7.options.style == null ? null : ctx_r7.options.style.selected) || "") : " " + ((ctx_r7.options == null ? null : ctx_r7.options.style == null ? null : ctx_r7.options.style.unselected) || "")));
    i0.ɵɵattribute("for", "control" + (ctx_r7.layoutNode == null ? null : ctx_r7.layoutNode._id) + "/" + (radioItem_r8 == null ? null : radioItem_r8.value));
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap((ctx_r7.options == null ? null : ctx_r7.options.fieldHtmlClass) || "");
    i0.ɵɵproperty("checked", (radioItem_r8 == null ? null : radioItem_r8.value) === ctx_r7.controlValue)("disabled", ctx_r7.controlDisabled)("id", "control" + (ctx_r7.layoutNode == null ? null : ctx_r7.layoutNode._id) + "/" + (radioItem_r8 == null ? null : radioItem_r8.value))("name", ctx_r7.controlName)("value", radioItem_r8 == null ? null : radioItem_r8.value);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r7.layoutNode == null ? null : ctx_r7.layoutNode._id) + "Status")("readonly", (ctx_r7.options == null ? null : ctx_r7.options.readonly) ? "readonly" : null)("required", ctx_r7.options == null ? null : ctx_r7.options.required);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", radioItem_r8 == null ? null : radioItem_r8.name, i0.ɵɵsanitizeHtml);
} }
function RadiosComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, RadiosComponent_div_2_div_1_Template, 4, 16, "div", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.radiosList);
} }
export class RadiosComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.layoutOrientation = 'vertical';
        this.radiosList = [];
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        if (this.layoutNode.type === 'radios-inline' ||
            this.layoutNode.type === 'radiobuttons') {
            this.layoutOrientation = 'horizontal';
        }
        this.radiosList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
        this.jsf.initializeControl(this);
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
}
RadiosComponent.ɵfac = function RadiosComponent_Factory(t) { return new (t || RadiosComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
RadiosComponent.ɵcmp = i0.ɵɵdefineComponent({ type: RadiosComponent, selectors: [["radios-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 3, vars: 3, consts: [[3, "class", "display", "innerHTML", 4, "ngIf"], [3, "class", 4, "ngIf"], [4, "ngIf"], [3, "innerHTML"], [3, "class", 4, "ngFor", "ngForOf"], ["type", "radio", 3, "checked", "disabled", "id", "name", "value", "change"]], template: function RadiosComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, RadiosComponent_label_0_Template, 1, 6, "label", 0);
        i0.ɵɵtemplate(1, RadiosComponent_div_1_Template, 2, 3, "div", 1);
        i0.ɵɵtemplate(2, RadiosComponent_div_2_Template, 2, 1, "div", 2);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.title);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.layoutOrientation === "horizontal");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.layoutOrientation !== "horizontal");
    } }, dependencies: [i2.NgForOf, i2.NgIf], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RadiosComponent, [{
        type: Component,
        args: [{
                selector: 'radios-widget',
                template: `
    <label *ngIf="options?.title"
      [attr.for]="'control' + layoutNode?._id"
      [class]="options?.labelHtmlClass || ''"
      [style.display]="options?.notitle ? 'none' : ''"
      [innerHTML]="options?.title"></label>

    <!-- 'horizontal' = radios-inline or radiobuttons -->
    <div *ngIf="layoutOrientation === 'horizontal'"
      [class]="options?.htmlClass || ''">
      <label *ngFor="let radioItem of radiosList"
        [attr.for]="'control' + layoutNode?._id + '/' + radioItem?.value"
        [class]="(options?.itemLabelHtmlClass || '') +
          ((controlValue + '' === radioItem?.value + '') ?
          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :
          (' ' + (options?.style?.unselected || '')))">
        <input type="radio"
          [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
          [attr.readonly]="options?.readonly ? 'readonly' : null"
          [attr.required]="options?.required"
          [checked]="radioItem?.value === controlValue"
          [class]="options?.fieldHtmlClass || ''"
          [disabled]="controlDisabled"
          [id]="'control' + layoutNode?._id + '/' + radioItem?.value"
          [name]="controlName"
          [value]="radioItem?.value"
          (change)="updateValue($event)">
        <span [innerHTML]="radioItem?.name"></span>
      </label>
    </div>

    <!-- 'vertical' = regular radios -->
    <div *ngIf="layoutOrientation !== 'horizontal'">
      <div *ngFor="let radioItem of radiosList"
        [class]="options?.htmlClass || ''">
        <label
          [attr.for]="'control' + layoutNode?._id + '/' + radioItem?.value"
          [class]="(options?.itemLabelHtmlClass || '') +
            ((controlValue + '' === radioItem?.value + '') ?
            (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :
            (' ' + (options?.style?.unselected || '')))">
          <input type="radio"
            [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
            [attr.readonly]="options?.readonly ? 'readonly' : null"
            [attr.required]="options?.required"
            [checked]="radioItem?.value === controlValue"
            [class]="options?.fieldHtmlClass || ''"
            [disabled]="controlDisabled"
            [id]="'control' + layoutNode?._id + '/' + radioItem?.value"
            [name]="controlName"
            [value]="radioItem?.value"
            (change)="updateValue($event)">
          <span [innerHTML]="radioItem?.name"></span>
        </label>
      </div>
    </div>`,
            }]
    }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW9zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nc2Ytd2lkZ2V0LWxpYnJhcnkvc3JjL2xpYi9jb21wb25lbnRzL3JhZGlvcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUE7QUFFdEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDRCQUE0QixDQUFBO0FBQ3hELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFBOzs7OztJQUt0RSwyQkFJdUM7OztJQUZyQyxvRkFBdUM7SUFDdkMsaUdBQWdEO0lBQ2hELG1HQUE0QjtJQUg1Qiw2RkFBd0M7Ozs7SUFReEMsNkJBS2lELGVBQUE7SUFXN0MsNEtBQVUsZUFBQSwwQkFBbUIsQ0FBQSxJQUFDO0lBVmhDLGlCQVVpQztJQUNqQywwQkFBMkM7SUFDN0MsaUJBQVE7Ozs7SUFoQk4sOGVBRzhDO0lBSjlDLHdKQUFpRTtJQVUvRCxlQUF1QztJQUF2QyxvRkFBdUM7SUFEdkMsb0dBQTZDLG9DQUFBLHlJQUFBLDRCQUFBLDJEQUFBO0lBSDdDLHFIQUFnRSwyRkFBQSxxRUFBQTtJQVU1RCxlQUE2QjtJQUE3Qiw4RkFBNkI7OztJQW5CdkMsMkJBQ3FDO0lBQ25DLDJFQWtCUTtJQUNWLGlCQUFNOzs7SUFwQkosK0VBQWtDO0lBQ0wsZUFBYTtJQUFiLDJDQUFhOzs7O0lBdUIxQywyQkFDcUMsWUFBQSxlQUFBO0lBaUIvQiwyS0FBVSxlQUFBLDBCQUFtQixDQUFBLElBQUM7SUFWaEMsaUJBVWlDO0lBQ2pDLDBCQUEyQztJQUM3QyxpQkFBUSxFQUFBOzs7O0lBbkJSLCtFQUFrQztJQUdoQyxlQUc4QztJQUg5Qyw4ZUFHOEM7SUFKOUMsd0pBQWlFO0lBVS9ELGVBQXVDO0lBQXZDLG9GQUF1QztJQUR2QyxvR0FBNkMsb0NBQUEseUlBQUEsNEJBQUEsMkRBQUE7SUFIN0MscUhBQWdFLDJGQUFBLHFFQUFBO0lBVTVELGVBQTZCO0lBQTdCLDhGQUE2Qjs7O0lBcEJ6QywyQkFBZ0Q7SUFDOUMsdUVBcUJNO0lBQ1IsaUJBQU07OztJQXRCdUIsZUFBYTtJQUFiLDJDQUFhOztBQXdCOUMsTUFBTSxPQUFPLGVBQWU7SUFhMUIsWUFDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQVZwQyxvQkFBZSxHQUFHLEtBQUssQ0FBQTtRQUN2QixpQkFBWSxHQUFHLEtBQUssQ0FBQTtRQUVwQixzQkFBaUIsR0FBRyxVQUFVLENBQUE7UUFDOUIsZUFBVSxHQUFVLEVBQUUsQ0FBQTtJQVF0QixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFBO1FBQzVDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssZUFBZTtZQUMxQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxjQUFjLEVBQ3ZDO1lBQ0EsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFlBQVksQ0FBQTtTQUN0QztRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUN4QixDQUFBO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNsQyxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQUs7UUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNoRCxDQUFDOzs4RUFsQ1UsZUFBZTtvREFBZixlQUFlO1FBeER4QixvRUFJdUM7UUFHdkMsZ0VBcUJNO1FBR04sZ0VBdUJNOztRQXRERSxxRUFBb0I7UUFPdEIsZUFBd0M7UUFBeEMsNkRBQXdDO1FBd0J4QyxlQUF3QztRQUF4Qyw2REFBd0M7O3VGQXlCckMsZUFBZTtjQTNEM0IsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0F1REQ7YUFDVjt3RUFVVSxVQUFVO2tCQUFsQixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3JtcydcbmltcG9ydCB7YnVpbGRUaXRsZU1hcH0gZnJvbSAnLi4vZnVuY3Rpb25zL2J1aWxkVGl0bGVNYXAnXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJ1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdyYWRpb3Mtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bGFiZWwgKm5nSWY9XCJvcHRpb25zPy50aXRsZVwiXG4gICAgICBbYXR0ci5mb3JdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkXCJcbiAgICAgIFtjbGFzc109XCJvcHRpb25zPy5sYWJlbEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICBbc3R5bGUuZGlzcGxheV09XCJvcHRpb25zPy5ub3RpdGxlID8gJ25vbmUnIDogJydcIlxuICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy50aXRsZVwiPjwvbGFiZWw+XG5cbiAgICA8IS0tICdob3Jpem9udGFsJyA9IHJhZGlvcy1pbmxpbmUgb3IgcmFkaW9idXR0b25zIC0tPlxuICAgIDxkaXYgKm5nSWY9XCJsYXlvdXRPcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnXCJcbiAgICAgIFtjbGFzc109XCJvcHRpb25zPy5odG1sQ2xhc3MgfHwgJydcIj5cbiAgICAgIDxsYWJlbCAqbmdGb3I9XCJsZXQgcmFkaW9JdGVtIG9mIHJhZGlvc0xpc3RcIlxuICAgICAgICBbYXR0ci5mb3JdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJy8nICsgcmFkaW9JdGVtPy52YWx1ZVwiXG4gICAgICAgIFtjbGFzc109XCIob3B0aW9ucz8uaXRlbUxhYmVsSHRtbENsYXNzIHx8ICcnKSArXG4gICAgICAgICAgKChjb250cm9sVmFsdWUgKyAnJyA9PT0gcmFkaW9JdGVtPy52YWx1ZSArICcnKSA/XG4gICAgICAgICAgKCcgJyArIChvcHRpb25zPy5hY3RpdmVDbGFzcyB8fCAnJykgKyAnICcgKyAob3B0aW9ucz8uc3R5bGU/LnNlbGVjdGVkIHx8ICcnKSkgOlxuICAgICAgICAgICgnICcgKyAob3B0aW9ucz8uc3R5bGU/LnVuc2VsZWN0ZWQgfHwgJycpKSlcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnU3RhdHVzJ1wiXG4gICAgICAgICAgW2F0dHIucmVhZG9ubHldPVwib3B0aW9ucz8ucmVhZG9ubHkgPyAncmVhZG9ubHknIDogbnVsbFwiXG4gICAgICAgICAgW2F0dHIucmVxdWlyZWRdPVwib3B0aW9ucz8ucmVxdWlyZWRcIlxuICAgICAgICAgIFtjaGVja2VkXT1cInJhZGlvSXRlbT8udmFsdWUgPT09IGNvbnRyb2xWYWx1ZVwiXG4gICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmZpZWxkSHRtbENsYXNzIHx8ICcnXCJcbiAgICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbERpc2FibGVkXCJcbiAgICAgICAgICBbaWRdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJy8nICsgcmFkaW9JdGVtPy52YWx1ZVwiXG4gICAgICAgICAgW25hbWVdPVwiY29udHJvbE5hbWVcIlxuICAgICAgICAgIFt2YWx1ZV09XCJyYWRpb0l0ZW0/LnZhbHVlXCJcbiAgICAgICAgICAoY2hhbmdlKT1cInVwZGF0ZVZhbHVlKCRldmVudClcIj5cbiAgICAgICAgPHNwYW4gW2lubmVySFRNTF09XCJyYWRpb0l0ZW0/Lm5hbWVcIj48L3NwYW4+XG4gICAgICA8L2xhYmVsPlxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSAndmVydGljYWwnID0gcmVndWxhciByYWRpb3MgLS0+XG4gICAgPGRpdiAqbmdJZj1cImxheW91dE9yaWVudGF0aW9uICE9PSAnaG9yaXpvbnRhbCdcIj5cbiAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHJhZGlvSXRlbSBvZiByYWRpb3NMaXN0XCJcbiAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/Lmh0bWxDbGFzcyB8fCAnJ1wiPlxuICAgICAgICA8bGFiZWxcbiAgICAgICAgICBbYXR0ci5mb3JdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJy8nICsgcmFkaW9JdGVtPy52YWx1ZVwiXG4gICAgICAgICAgW2NsYXNzXT1cIihvcHRpb25zPy5pdGVtTGFiZWxIdG1sQ2xhc3MgfHwgJycpICtcbiAgICAgICAgICAgICgoY29udHJvbFZhbHVlICsgJycgPT09IHJhZGlvSXRlbT8udmFsdWUgKyAnJykgP1xuICAgICAgICAgICAgKCcgJyArIChvcHRpb25zPy5hY3RpdmVDbGFzcyB8fCAnJykgKyAnICcgKyAob3B0aW9ucz8uc3R5bGU/LnNlbGVjdGVkIHx8ICcnKSkgOlxuICAgICAgICAgICAgKCcgJyArIChvcHRpb25zPy5zdHlsZT8udW5zZWxlY3RlZCB8fCAnJykpKVwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnU3RhdHVzJ1wiXG4gICAgICAgICAgICBbYXR0ci5yZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgICAgIFthdHRyLnJlcXVpcmVkXT1cIm9wdGlvbnM/LnJlcXVpcmVkXCJcbiAgICAgICAgICAgIFtjaGVja2VkXT1cInJhZGlvSXRlbT8udmFsdWUgPT09IGNvbnRyb2xWYWx1ZVwiXG4gICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8uZmllbGRIdG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImNvbnRyb2xEaXNhYmxlZFwiXG4gICAgICAgICAgICBbaWRdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJy8nICsgcmFkaW9JdGVtPy52YWx1ZVwiXG4gICAgICAgICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICAgICAgICBbdmFsdWVdPVwicmFkaW9JdGVtPy52YWx1ZVwiXG4gICAgICAgICAgICAoY2hhbmdlKT1cInVwZGF0ZVZhbHVlKCRldmVudClcIj5cbiAgICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cInJhZGlvSXRlbT8ubmFtZVwiPjwvc3Bhbj5cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PmAsXG59KVxuZXhwb3J0IGNsYXNzIFJhZGlvc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2xcbiAgY29udHJvbE5hbWU6IHN0cmluZ1xuICBjb250cm9sVmFsdWU6IGFueVxuICBjb250cm9sRGlzYWJsZWQgPSBmYWxzZVxuICBib3VuZENvbnRyb2wgPSBmYWxzZVxuICBvcHRpb25zOiBhbnlcbiAgbGF5b3V0T3JpZW50YXRpb24gPSAndmVydGljYWwnXG4gIHJhZGlvc0xpc3Q6IGFueVtdID0gW11cbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9XG4gICAgaWYgKHRoaXMubGF5b3V0Tm9kZS50eXBlID09PSAncmFkaW9zLWlubGluZScgfHxcbiAgICAgIHRoaXMubGF5b3V0Tm9kZS50eXBlID09PSAncmFkaW9idXR0b25zJ1xuICAgICkge1xuICAgICAgdGhpcy5sYXlvdXRPcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJ1xuICAgIH1cbiAgICB0aGlzLnJhZGlvc0xpc3QgPSBidWlsZFRpdGxlTWFwKFxuICAgICAgdGhpcy5vcHRpb25zLnRpdGxlTWFwIHx8IHRoaXMub3B0aW9ucy5lbnVtTmFtZXMsXG4gICAgICB0aGlzLm9wdGlvbnMuZW51bSwgdHJ1ZVxuICAgIClcbiAgICB0aGlzLmpzZi5pbml0aWFsaXplQ29udHJvbCh0aGlzKVxuICB9XG5cbiAgdXBkYXRlVmFsdWUoZXZlbnQpIHtcbiAgICB0aGlzLmpzZi51cGRhdGVWYWx1ZSh0aGlzLCBldmVudC50YXJnZXQudmFsdWUpXG4gIH1cbn1cbiJdfQ==