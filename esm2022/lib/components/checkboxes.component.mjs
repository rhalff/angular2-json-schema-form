import { Component, Input } from '@angular/core';
import { buildTitleMap } from '../functions/buildTitleMap';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/json-schema-form.service";
import * as i2 from "@angular/common";
function CheckboxesComponent_label_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "label", 3);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r0.options == null ? null : ctx_r0.options.labelHtmlClass) || "");
    i0.ɵɵstyleProp("display", (ctx_r0.options == null ? null : ctx_r0.options.notitle) ? "none" : "");
    i0.ɵɵproperty("innerHTML", ctx_r0.options == null ? null : ctx_r0.options.title, i0.ɵɵsanitizeHtml);
} }
function CheckboxesComponent_div_1_label_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label")(1, "input", 5);
    i0.ɵɵlistener("change", function CheckboxesComponent_div_1_label_1_Template_input_change_1_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r5.updateValue($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(2, "span", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const checkboxItem_r4 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap(((ctx_r3.options == null ? null : ctx_r3.options.itemLabelHtmlClass) || "") + (checkboxItem_r4.checked ? " " + ((ctx_r3.options == null ? null : ctx_r3.options.activeClass) || "") + " " + ((ctx_r3.options == null ? null : ctx_r3.options.style == null ? null : ctx_r3.options.style.selected) || "") : " " + ((ctx_r3.options == null ? null : ctx_r3.options.style == null ? null : ctx_r3.options.style.unselected) || "")));
    i0.ɵɵattribute("for", "control" + (ctx_r3.layoutNode == null ? null : ctx_r3.layoutNode._id) + "/" + checkboxItem_r4.value);
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap((ctx_r3.options == null ? null : ctx_r3.options.fieldHtmlClass) || "");
    i0.ɵɵproperty("checked", checkboxItem_r4.checked)("disabled", ctx_r3.controlDisabled)("id", "control" + (ctx_r3.layoutNode == null ? null : ctx_r3.layoutNode._id) + "/" + checkboxItem_r4.value)("name", checkboxItem_r4 == null ? null : checkboxItem_r4.name)("readonly", (ctx_r3.options == null ? null : ctx_r3.options.readonly) ? "readonly" : null)("value", checkboxItem_r4.value);
    i0.ɵɵattribute("required", ctx_r3.options == null ? null : ctx_r3.options.required);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", checkboxItem_r4.name, i0.ɵɵsanitizeHtml);
} }
function CheckboxesComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, CheckboxesComponent_div_1_label_1_Template, 3, 13, "label", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r1.options == null ? null : ctx_r1.options.htmlClass) || "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.checkboxList);
} }
function CheckboxesComponent_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "label")(2, "input", 5);
    i0.ɵɵlistener("change", function CheckboxesComponent_div_2_div_1_Template_input_change_2_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r9.updateValue($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "span", 3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const checkboxItem_r8 = ctx.$implicit;
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap((ctx_r7.options == null ? null : ctx_r7.options.htmlClass) || "");
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap(((ctx_r7.options == null ? null : ctx_r7.options.itemLabelHtmlClass) || "") + (checkboxItem_r8.checked ? " " + ((ctx_r7.options == null ? null : ctx_r7.options.activeClass) || "") + " " + ((ctx_r7.options == null ? null : ctx_r7.options.style == null ? null : ctx_r7.options.style.selected) || "") : " " + ((ctx_r7.options == null ? null : ctx_r7.options.style == null ? null : ctx_r7.options.style.unselected) || "")));
    i0.ɵɵattribute("for", "control" + (ctx_r7.layoutNode == null ? null : ctx_r7.layoutNode._id) + "/" + checkboxItem_r8.value);
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap((ctx_r7.options == null ? null : ctx_r7.options.fieldHtmlClass) || "");
    i0.ɵɵproperty("checked", checkboxItem_r8.checked)("disabled", ctx_r7.controlDisabled)("id", (ctx_r7.options == null ? null : ctx_r7.options.name) + "/" + checkboxItem_r8.value)("name", checkboxItem_r8 == null ? null : checkboxItem_r8.name)("readonly", (ctx_r7.options == null ? null : ctx_r7.options.readonly) ? "readonly" : null)("value", checkboxItem_r8.value);
    i0.ɵɵattribute("required", ctx_r7.options == null ? null : ctx_r7.options.required);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", checkboxItem_r8 == null ? null : checkboxItem_r8.name, i0.ɵɵsanitizeHtml);
} }
function CheckboxesComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, CheckboxesComponent_div_2_div_1_Template, 4, 15, "div", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.checkboxList);
} }
class CheckboxesComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    controlDisabled = false;
    boundControl = false;
    options;
    layoutOrientation;
    formArray;
    checkboxList = [];
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.layoutOrientation = (this.layoutNode.type === 'checkboxes-inline' ||
            this.layoutNode.type === 'checkboxbuttons') ? 'horizontal' : 'vertical';
        this.jsf.initializeControl(this);
        this.checkboxList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
        if (this.boundControl) {
            const formArray = this.jsf.getFormControl(this);
            this.checkboxList.forEach(checkboxItem => checkboxItem.checked = formArray.value.includes(checkboxItem.value));
        }
    }
    updateValue(event) {
        for (const checkboxItem of this.checkboxList) {
            if (event.target.value === checkboxItem.value) {
                checkboxItem.checked = event.target.checked;
            }
        }
        if (this.boundControl) {
            this.jsf.updateArrayCheckboxList(this, this.checkboxList);
        }
    }
    static ɵfac = function CheckboxesComponent_Factory(t) { return new (t || CheckboxesComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
    static ɵcmp = i0.ɵɵdefineComponent({ type: CheckboxesComponent, selectors: [["checkboxes-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 3, vars: 3, consts: [[3, "class", "display", "innerHTML", 4, "ngIf"], [3, "class", 4, "ngIf"], [4, "ngIf"], [3, "innerHTML"], [3, "class", 4, "ngFor", "ngForOf"], ["type", "checkbox", 3, "checked", "disabled", "id", "name", "readonly", "value", "change"]], template: function CheckboxesComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, CheckboxesComponent_label_0_Template, 1, 5, "label", 0);
            i0.ɵɵtemplate(1, CheckboxesComponent_div_1_Template, 2, 3, "div", 1);
            i0.ɵɵtemplate(2, CheckboxesComponent_div_2_Template, 2, 1, "div", 2);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.title);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.layoutOrientation === "horizontal");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.layoutOrientation === "vertical");
        } }, dependencies: [i2.NgForOf, i2.NgIf], encapsulation: 2 });
}
export { CheckboxesComponent };
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CheckboxesComponent, [{
        type: Component,
        args: [{
                selector: 'checkboxes-widget',
                template: `
      <label *ngIf="options?.title"
             [class]="options?.labelHtmlClass || ''"
             [style.display]="options?.notitle ? 'none' : ''"
             [innerHTML]="options?.title"></label>

      <!-- 'horizontal' = checkboxes-inline or checkboxbuttons -->
      <div *ngIf="layoutOrientation === 'horizontal'" [class]="options?.htmlClass || ''">
          <label *ngFor="let checkboxItem of checkboxList"
                 [attr.for]="'control' + layoutNode?._id + '/' + checkboxItem.value"
                 [class]="(options?.itemLabelHtmlClass || '') + (checkboxItem.checked ?
          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :
          (' ' + (options?.style?.unselected || '')))">
              <input type="checkbox"
                     [attr.required]="options?.required"
                     [checked]="checkboxItem.checked"
                     [class]="options?.fieldHtmlClass || ''"
                     [disabled]="controlDisabled"
                     [id]="'control' + layoutNode?._id + '/' + checkboxItem.value"
                     [name]="checkboxItem?.name"
                     [readonly]="options?.readonly ? 'readonly' : null"
                     [value]="checkboxItem.value"
                     (change)="updateValue($event)">
              <span [innerHTML]="checkboxItem.name"></span>
          </label>
      </div>

      <!-- 'vertical' = regular checkboxes -->
      <div *ngIf="layoutOrientation === 'vertical'">
          <div *ngFor="let checkboxItem of checkboxList" [class]="options?.htmlClass || ''">
              <label
                      [attr.for]="'control' + layoutNode?._id + '/' + checkboxItem.value"
                      [class]="(options?.itemLabelHtmlClass || '') + (checkboxItem.checked ?
            (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :
            (' ' + (options?.style?.unselected || '')))">
                  <input type="checkbox"
                         [attr.required]="options?.required"
                         [checked]="checkboxItem.checked"
                         [class]="options?.fieldHtmlClass || ''"
                         [disabled]="controlDisabled"
                         [id]="options?.name + '/' + checkboxItem.value"
                         [name]="checkboxItem?.name"
                         [readonly]="options?.readonly ? 'readonly' : null"
                         [value]="checkboxItem.value"
                         (change)="updateValue($event)">
                  <span [innerHTML]="checkboxItem?.name"></span>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3hlcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLXdpZGdldC1saWJyYXJ5L3NyYy9saWIvY29tcG9uZW50cy9jaGVja2JveGVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQTtBQUV0RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNEJBQTRCLENBQUE7QUFDeEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUE7Ozs7O0lBTXBFLDJCQUc0Qzs7O0lBRnJDLG9GQUF1QztJQUN2QyxpR0FBZ0Q7SUFDaEQsbUdBQTRCOzs7O0lBSS9CLDZCQUk2QyxlQUFBO0lBVWxDLGdMQUFVLGVBQUEsMEJBQW1CLENBQUEsSUFBQztJQVRyQyxpQkFTc0M7SUFDdEMsMEJBQTZDO0lBQ2pELGlCQUFROzs7O0lBZEQsaWJBRXFDO0lBSHJDLDJIQUFtRTtJQU8vRCxlQUF1QztJQUF2QyxvRkFBdUM7SUFEdkMsaURBQWdDLG9DQUFBLDRHQUFBLCtEQUFBLDJGQUFBLGdDQUFBO0lBRGhDLG1GQUFtQztJQVNwQyxlQUErQjtJQUEvQixtRUFBK0I7OztJQWhCN0MsMkJBQW1GO0lBQy9FLCtFQWdCUTtJQUNaLGlCQUFNOzs7SUFsQjBDLCtFQUFrQztJQUM5QyxlQUFlO0lBQWYsNkNBQWU7Ozs7SUFxQi9DLDJCQUFrRixZQUFBLGVBQUE7SUFlbkUsK0tBQVUsZUFBQSwwQkFBbUIsQ0FBQSxJQUFDO0lBVHJDLGlCQVNzQztJQUN0QywwQkFBOEM7SUFDbEQsaUJBQVEsRUFBQTs7OztJQWpCbUMsK0VBQWtDO0lBR3JFLGVBRWtDO0lBRmxDLGliQUVrQztJQUhsQywySEFBbUU7SUFPaEUsZUFBdUM7SUFBdkMsb0ZBQXVDO0lBRHZDLGlEQUFnQyxvQ0FBQSwyRkFBQSwr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ZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJ1xuaW1wb3J0IHtidWlsZFRpdGxlTWFwfSBmcm9tICcuLi9mdW5jdGlvbnMvYnVpbGRUaXRsZU1hcCdcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9qc29uLXNjaGVtYS1mb3JtLnNlcnZpY2UnXG5pbXBvcnQge1RpdGxlTWFwSXRlbX0gZnJvbSAnLi4vaW50ZXJmYWNlcy90aXRsZS1tYXAtaXRlbSdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2hlY2tib3hlcy13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPGxhYmVsICpuZ0lmPVwib3B0aW9ucz8udGl0bGVcIlxuICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5sYWJlbEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwib3B0aW9ucz8ubm90aXRsZSA/ICdub25lJyA6ICcnXCJcbiAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LnRpdGxlXCI+PC9sYWJlbD5cblxuICAgICAgPCEtLSAnaG9yaXpvbnRhbCcgPSBjaGVja2JveGVzLWlubGluZSBvciBjaGVja2JveGJ1dHRvbnMgLS0+XG4gICAgICA8ZGl2ICpuZ0lmPVwibGF5b3V0T3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJ1wiIFtjbGFzc109XCJvcHRpb25zPy5odG1sQ2xhc3MgfHwgJydcIj5cbiAgICAgICAgICA8bGFiZWwgKm5nRm9yPVwibGV0IGNoZWNrYm94SXRlbSBvZiBjaGVja2JveExpc3RcIlxuICAgICAgICAgICAgICAgICBbYXR0ci5mb3JdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJy8nICsgY2hlY2tib3hJdGVtLnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgW2NsYXNzXT1cIihvcHRpb25zPy5pdGVtTGFiZWxIdG1sQ2xhc3MgfHwgJycpICsgKGNoZWNrYm94SXRlbS5jaGVja2VkID9cbiAgICAgICAgICAoJyAnICsgKG9wdGlvbnM/LmFjdGl2ZUNsYXNzIHx8ICcnKSArICcgJyArIChvcHRpb25zPy5zdHlsZT8uc2VsZWN0ZWQgfHwgJycpKSA6XG4gICAgICAgICAgKCcgJyArIChvcHRpb25zPy5zdHlsZT8udW5zZWxlY3RlZCB8fCAnJykpKVwiPlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgIFthdHRyLnJlcXVpcmVkXT1cIm9wdGlvbnM/LnJlcXVpcmVkXCJcbiAgICAgICAgICAgICAgICAgICAgIFtjaGVja2VkXT1cImNoZWNrYm94SXRlbS5jaGVja2VkXCJcbiAgICAgICAgICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5maWVsZEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbERpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnLycgKyBjaGVja2JveEl0ZW0udmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICAgW25hbWVdPVwiY2hlY2tib3hJdGVtPy5uYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgIFtyZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJjaGVja2JveEl0ZW0udmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJ1cGRhdGVWYWx1ZSgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwiY2hlY2tib3hJdGVtLm5hbWVcIj48L3NwYW4+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8IS0tICd2ZXJ0aWNhbCcgPSByZWd1bGFyIGNoZWNrYm94ZXMgLS0+XG4gICAgICA8ZGl2ICpuZ0lmPVwibGF5b3V0T3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCdcIj5cbiAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBjaGVja2JveEl0ZW0gb2YgY2hlY2tib3hMaXN0XCIgW2NsYXNzXT1cIm9wdGlvbnM/Lmh0bWxDbGFzcyB8fCAnJ1wiPlxuICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5mb3JdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJy8nICsgY2hlY2tib3hJdGVtLnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICBbY2xhc3NdPVwiKG9wdGlvbnM/Lml0ZW1MYWJlbEh0bWxDbGFzcyB8fCAnJykgKyAoY2hlY2tib3hJdGVtLmNoZWNrZWQgP1xuICAgICAgICAgICAgKCcgJyArIChvcHRpb25zPy5hY3RpdmVDbGFzcyB8fCAnJykgKyAnICcgKyAob3B0aW9ucz8uc3R5bGU/LnNlbGVjdGVkIHx8ICcnKSkgOlxuICAgICAgICAgICAgKCcgJyArIChvcHRpb25zPy5zdHlsZT8udW5zZWxlY3RlZCB8fCAnJykpKVwiPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIucmVxdWlyZWRdPVwib3B0aW9ucz8ucmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtjaGVja2VkXT1cImNoZWNrYm94SXRlbS5jaGVja2VkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8uZmllbGRIdG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJjb250cm9sRGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJvcHRpb25zPy5uYW1lICsgJy8nICsgY2hlY2tib3hJdGVtLnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbbmFtZV09XCJjaGVja2JveEl0ZW0/Lm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtyZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwiY2hlY2tib3hJdGVtLnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAoY2hhbmdlKT1cInVwZGF0ZVZhbHVlKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwiY2hlY2tib3hJdGVtPy5uYW1lXCI+PC9zcGFuPlxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YCxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tib3hlc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2xcbiAgY29udHJvbE5hbWU6IHN0cmluZ1xuICBjb250cm9sVmFsdWU6IGFueVxuICBjb250cm9sRGlzYWJsZWQgPSBmYWxzZVxuICBib3VuZENvbnRyb2wgPSBmYWxzZVxuICBvcHRpb25zOiBhbnlcbiAgbGF5b3V0T3JpZW50YXRpb246IHN0cmluZ1xuICBmb3JtQXJyYXk6IEFic3RyYWN0Q29udHJvbFxuICBjaGVja2JveExpc3Q6IFRpdGxlTWFwSXRlbVtdID0gW11cbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9XG4gICAgdGhpcy5sYXlvdXRPcmllbnRhdGlvbiA9ICh0aGlzLmxheW91dE5vZGUudHlwZSA9PT0gJ2NoZWNrYm94ZXMtaW5saW5lJyB8fFxuICAgICAgdGhpcy5sYXlvdXROb2RlLnR5cGUgPT09ICdjaGVja2JveGJ1dHRvbnMnKSA/ICdob3Jpem9udGFsJyA6ICd2ZXJ0aWNhbCdcbiAgICB0aGlzLmpzZi5pbml0aWFsaXplQ29udHJvbCh0aGlzKVxuICAgIHRoaXMuY2hlY2tib3hMaXN0ID0gYnVpbGRUaXRsZU1hcChcbiAgICAgIHRoaXMub3B0aW9ucy50aXRsZU1hcCB8fCB0aGlzLm9wdGlvbnMuZW51bU5hbWVzLCB0aGlzLm9wdGlvbnMuZW51bSwgdHJ1ZVxuICAgIClcbiAgICBpZiAodGhpcy5ib3VuZENvbnRyb2wpIHtcbiAgICAgIGNvbnN0IGZvcm1BcnJheSA9IHRoaXMuanNmLmdldEZvcm1Db250cm9sKHRoaXMpXG4gICAgICB0aGlzLmNoZWNrYm94TGlzdC5mb3JFYWNoKGNoZWNrYm94SXRlbSA9PlxuICAgICAgICBjaGVja2JveEl0ZW0uY2hlY2tlZCA9IGZvcm1BcnJheS52YWx1ZS5pbmNsdWRlcyhjaGVja2JveEl0ZW0udmFsdWUpXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlVmFsdWUoZXZlbnQpIHtcbiAgICBmb3IgKGNvbnN0IGNoZWNrYm94SXRlbSBvZiB0aGlzLmNoZWNrYm94TGlzdCkge1xuICAgICAgaWYgKGV2ZW50LnRhcmdldC52YWx1ZSA9PT0gY2hlY2tib3hJdGVtLnZhbHVlKSB7XG4gICAgICAgIGNoZWNrYm94SXRlbS5jaGVja2VkID0gZXZlbnQudGFyZ2V0LmNoZWNrZWRcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuYm91bmRDb250cm9sKSB7XG4gICAgICB0aGlzLmpzZi51cGRhdGVBcnJheUNoZWNrYm94TGlzdCh0aGlzLCB0aGlzLmNoZWNrYm94TGlzdClcbiAgICB9XG4gIH1cbn1cbiJdfQ==