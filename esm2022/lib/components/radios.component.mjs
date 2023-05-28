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
class RadiosComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    controlDisabled = false;
    boundControl = false;
    options;
    layoutOrientation = 'vertical';
    radiosList = [];
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
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
    static ɵfac = function RadiosComponent_Factory(t) { return new (t || RadiosComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
    static ɵcmp = i0.ɵɵdefineComponent({ type: RadiosComponent, selectors: [["radios-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 3, vars: 3, consts: [[3, "class", "display", "innerHTML", 4, "ngIf"], [3, "class", 4, "ngIf"], [4, "ngIf"], [3, "innerHTML"], [3, "class", 4, "ngFor", "ngForOf"], ["type", "radio", 3, "checked", "disabled", "id", "name", "value", "change"]], template: function RadiosComponent_Template(rf, ctx) { if (rf & 1) {
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
}
export { RadiosComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW9zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nc2Ytd2lkZ2V0LWxpYnJhcnkvc3JjL2xpYi9jb21wb25lbnRzL3JhZGlvcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUE7QUFFdEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDRCQUE0QixDQUFBO0FBQ3hELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFBOzs7OztJQUt0RSwyQkFJdUM7OztJQUZyQyxvRkFBdUM7SUFDdkMsaUdBQWdEO0lBQ2hELG1HQUE0QjtJQUg1Qiw2RkFBd0M7Ozs7SUFReEMsNkJBS2lELGVBQUE7SUFXN0MsNEtBQVUsZUFBQSwwQkFBbUIsQ0FBQSxJQUFDO0lBVmhDLGlCQVVpQztJQUNqQywwQkFBMkM7SUFDN0MsaUJBQVE7Ozs7SUFoQk4sOGVBRzhDO0lBSjlDLHdKQUFpRTtJQVUvRCxlQUF1QztJQUF2QyxvRkFBdUM7SUFEdkMsb0dBQTZDLG9DQUFBLHlJQUFBLDRCQUFBLDJEQUFBO0lBSDdDLHFIQUFnRSwyRkFBQSxxRUFBQTtJQVU1RCxlQUE2QjtJQUE3Qiw4RkFBNkI7OztJQW5CdkMsMkJBQ3FDO0lBQ25DLDJFQWtCUTtJQUNWLGlCQUFNOzs7SUFwQkosK0VBQWtDO0lBQ0wsZUFBYTtJQUFiLDJDQUFhOzs7O0lBdUIxQywyQkFDcUMsWUFBQSxlQUFBO0lBaUIvQiwyS0FBVSxlQUFBLDBCQUFtQixDQUFBLElBQUM7SUFWaEMsaUJBVWlDO0lBQ2pDLDBCQUEyQztJQUM3QyxpQkFBUSxFQUFBOzs7O0lBbkJSLCtFQUFrQztJQUdoQyxlQUc4QztJQUg5Qyw4ZUFHOEM7SUFKOUMsd0pBQWlFO0lBVS9ELGVBQXVDO0lBQXZDLG9GQUF1QztJQUR2QyxvR0FBNkMsb0NBQUEseUlBQUEsNEJBQUEsMkRBQUE7SUFIN0MscUhBQWdFLDJGQUFBLHFFQUFBO0lBVTVELGVBQTZCO0lBQTdCLDhGQUE2Qjs7O0lBcEJ6QywyQkFBZ0Q7SUFDOUMsdUVBcUJNO0lBQ1IsaUJBQU07OztJQXRCdUIsZUFBYTtJQUFiLDJDQUFhOztBQW5DOUMsTUEyRGEsZUFBZTtJQWNoQjtJQWJWLFdBQVcsQ0FBaUI7SUFDNUIsV0FBVyxDQUFRO0lBQ25CLFlBQVksQ0FBSztJQUNqQixlQUFlLEdBQUcsS0FBSyxDQUFBO0lBQ3ZCLFlBQVksR0FBRyxLQUFLLENBQUE7SUFDcEIsT0FBTyxDQUFLO0lBQ1osaUJBQWlCLEdBQUcsVUFBVSxDQUFBO0lBQzlCLFVBQVUsR0FBVSxFQUFFLENBQUE7SUFDYixVQUFVLENBQUs7SUFDZixXQUFXLENBQVU7SUFDckIsU0FBUyxDQUFVO0lBRTVCLFlBQ1UsR0FBMEI7UUFBMUIsUUFBRyxHQUFILEdBQUcsQ0FBdUI7SUFFcEMsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLGVBQWU7WUFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssY0FBYyxFQUN2QztZQUNBLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxZQUFZLENBQUE7U0FDdEM7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FDeEIsQ0FBQTtRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbEMsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFLO1FBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDaEQsQ0FBQzt5RUFsQ1UsZUFBZTsrQ0FBZixlQUFlO1lBeER4QixvRUFJdUM7WUFHdkMsZ0VBcUJNO1lBR04sZ0VBdUJNOztZQXRERSxxRUFBb0I7WUFPdEIsZUFBd0M7WUFBeEMsNkRBQXdDO1lBd0J4QyxlQUF3QztZQUF4Qyw2REFBd0M7OztTQXlCckMsZUFBZTt1RkFBZixlQUFlO2NBM0QzQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQXVERDthQUNWO3dFQVVVLFVBQVU7a0JBQWxCLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJ1xuaW1wb3J0IHtidWlsZFRpdGxlTWFwfSBmcm9tICcuLi9mdW5jdGlvbnMvYnVpbGRUaXRsZU1hcCdcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9qc29uLXNjaGVtYS1mb3JtLnNlcnZpY2UnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3JhZGlvcy13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxsYWJlbCAqbmdJZj1cIm9wdGlvbnM/LnRpdGxlXCJcbiAgICAgIFthdHRyLmZvcl09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmxhYmVsSHRtbENsYXNzIHx8ICcnXCJcbiAgICAgIFtzdHlsZS5kaXNwbGF5XT1cIm9wdGlvbnM/Lm5vdGl0bGUgPyAnbm9uZScgOiAnJ1wiXG4gICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LnRpdGxlXCI+PC9sYWJlbD5cblxuICAgIDwhLS0gJ2hvcml6b250YWwnID0gcmFkaW9zLWlubGluZSBvciByYWRpb2J1dHRvbnMgLS0+XG4gICAgPGRpdiAqbmdJZj1cImxheW91dE9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCdcIlxuICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/Lmh0bWxDbGFzcyB8fCAnJ1wiPlxuICAgICAgPGxhYmVsICpuZ0Zvcj1cImxldCByYWRpb0l0ZW0gb2YgcmFkaW9zTGlzdFwiXG4gICAgICAgIFthdHRyLmZvcl09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnLycgKyByYWRpb0l0ZW0/LnZhbHVlXCJcbiAgICAgICAgW2NsYXNzXT1cIihvcHRpb25zPy5pdGVtTGFiZWxIdG1sQ2xhc3MgfHwgJycpICtcbiAgICAgICAgICAoKGNvbnRyb2xWYWx1ZSArICcnID09PSByYWRpb0l0ZW0/LnZhbHVlICsgJycpID9cbiAgICAgICAgICAoJyAnICsgKG9wdGlvbnM/LmFjdGl2ZUNsYXNzIHx8ICcnKSArICcgJyArIChvcHRpb25zPy5zdHlsZT8uc2VsZWN0ZWQgfHwgJycpKSA6XG4gICAgICAgICAgKCcgJyArIChvcHRpb25zPy5zdHlsZT8udW5zZWxlY3RlZCB8fCAnJykpKVwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdTdGF0dXMnXCJcbiAgICAgICAgICBbYXR0ci5yZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgICBbYXR0ci5yZXF1aXJlZF09XCJvcHRpb25zPy5yZXF1aXJlZFwiXG4gICAgICAgICAgW2NoZWNrZWRdPVwicmFkaW9JdGVtPy52YWx1ZSA9PT0gY29udHJvbFZhbHVlXCJcbiAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8uZmllbGRIdG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgIFtkaXNhYmxlZF09XCJjb250cm9sRGlzYWJsZWRcIlxuICAgICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnLycgKyByYWRpb0l0ZW0/LnZhbHVlXCJcbiAgICAgICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICAgICAgW3ZhbHVlXT1cInJhZGlvSXRlbT8udmFsdWVcIlxuICAgICAgICAgIChjaGFuZ2UpPVwidXBkYXRlVmFsdWUoJGV2ZW50KVwiPlxuICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cInJhZGlvSXRlbT8ubmFtZVwiPjwvc3Bhbj5cbiAgICAgIDwvbGFiZWw+XG4gICAgPC9kaXY+XG5cbiAgICA8IS0tICd2ZXJ0aWNhbCcgPSByZWd1bGFyIHJhZGlvcyAtLT5cbiAgICA8ZGl2ICpuZ0lmPVwibGF5b3V0T3JpZW50YXRpb24gIT09ICdob3Jpem9udGFsJ1wiPlxuICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgcmFkaW9JdGVtIG9mIHJhZGlvc0xpc3RcIlxuICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8uaHRtbENsYXNzIHx8ICcnXCI+XG4gICAgICAgIDxsYWJlbFxuICAgICAgICAgIFthdHRyLmZvcl09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnLycgKyByYWRpb0l0ZW0/LnZhbHVlXCJcbiAgICAgICAgICBbY2xhc3NdPVwiKG9wdGlvbnM/Lml0ZW1MYWJlbEh0bWxDbGFzcyB8fCAnJykgK1xuICAgICAgICAgICAgKChjb250cm9sVmFsdWUgKyAnJyA9PT0gcmFkaW9JdGVtPy52YWx1ZSArICcnKSA/XG4gICAgICAgICAgICAoJyAnICsgKG9wdGlvbnM/LmFjdGl2ZUNsYXNzIHx8ICcnKSArICcgJyArIChvcHRpb25zPy5zdHlsZT8uc2VsZWN0ZWQgfHwgJycpKSA6XG4gICAgICAgICAgICAoJyAnICsgKG9wdGlvbnM/LnN0eWxlPy51bnNlbGVjdGVkIHx8ICcnKSkpXCI+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdTdGF0dXMnXCJcbiAgICAgICAgICAgIFthdHRyLnJlYWRvbmx5XT1cIm9wdGlvbnM/LnJlYWRvbmx5ID8gJ3JlYWRvbmx5JyA6IG51bGxcIlxuICAgICAgICAgICAgW2F0dHIucmVxdWlyZWRdPVwib3B0aW9ucz8ucmVxdWlyZWRcIlxuICAgICAgICAgICAgW2NoZWNrZWRdPVwicmFkaW9JdGVtPy52YWx1ZSA9PT0gY29udHJvbFZhbHVlXCJcbiAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5maWVsZEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbERpc2FibGVkXCJcbiAgICAgICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnLycgKyByYWRpb0l0ZW0/LnZhbHVlXCJcbiAgICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJyYWRpb0l0ZW0/LnZhbHVlXCJcbiAgICAgICAgICAgIChjaGFuZ2UpPVwidXBkYXRlVmFsdWUoJGV2ZW50KVwiPlxuICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwicmFkaW9JdGVtPy5uYW1lXCI+PC9zcGFuPlxuICAgICAgICA8L2xhYmVsPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+YCxcbn0pXG5leHBvcnQgY2xhc3MgUmFkaW9zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbFxuICBjb250cm9sTmFtZTogc3RyaW5nXG4gIGNvbnRyb2xWYWx1ZTogYW55XG4gIGNvbnRyb2xEaXNhYmxlZCA9IGZhbHNlXG4gIGJvdW5kQ29udHJvbCA9IGZhbHNlXG4gIG9wdGlvbnM6IGFueVxuICBsYXlvdXRPcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCdcbiAgcmFkaW9zTGlzdDogYW55W10gPSBbXVxuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge31cbiAgICBpZiAodGhpcy5sYXlvdXROb2RlLnR5cGUgPT09ICdyYWRpb3MtaW5saW5lJyB8fFxuICAgICAgdGhpcy5sYXlvdXROb2RlLnR5cGUgPT09ICdyYWRpb2J1dHRvbnMnXG4gICAgKSB7XG4gICAgICB0aGlzLmxheW91dE9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnXG4gICAgfVxuICAgIHRoaXMucmFkaW9zTGlzdCA9IGJ1aWxkVGl0bGVNYXAoXG4gICAgICB0aGlzLm9wdGlvbnMudGl0bGVNYXAgfHwgdGhpcy5vcHRpb25zLmVudW1OYW1lcyxcbiAgICAgIHRoaXMub3B0aW9ucy5lbnVtLCB0cnVlXG4gICAgKVxuICAgIHRoaXMuanNmLmluaXRpYWxpemVDb250cm9sKHRoaXMpXG4gIH1cblxuICB1cGRhdGVWYWx1ZShldmVudCkge1xuICAgIHRoaXMuanNmLnVwZGF0ZVZhbHVlKHRoaXMsIGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgfVxufVxuIl19