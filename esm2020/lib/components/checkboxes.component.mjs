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
export class CheckboxesComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.checkboxList = [];
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
}
CheckboxesComponent.ɵfac = function CheckboxesComponent_Factory(t) { return new (t || CheckboxesComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
CheckboxesComponent.ɵcmp = i0.ɵɵdefineComponent({ type: CheckboxesComponent, selectors: [["checkboxes-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 3, vars: 3, consts: [[3, "class", "display", "innerHTML", 4, "ngIf"], [3, "class", 4, "ngIf"], [4, "ngIf"], [3, "innerHTML"], [3, "class", 4, "ngFor", "ngForOf"], ["type", "checkbox", 3, "checked", "disabled", "id", "name", "readonly", "value", "change"]], template: function CheckboxesComponent_Template(rf, ctx) { if (rf & 1) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3hlcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLXdpZGdldC1saWJyYXJ5L3NyYy9saWIvY29tcG9uZW50cy9jaGVja2JveGVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQTtBQUV0RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNEJBQTRCLENBQUE7QUFDeEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUE7Ozs7O0lBTXBFLDJCQUc0Qzs7O0lBRnJDLG9GQUF1QztJQUN2QyxpR0FBZ0Q7SUFDaEQsbUdBQTRCOzs7O0lBSS9CLDZCQUk2QyxlQUFBO0lBVWxDLGdMQUFVLGVBQUEsMEJBQW1CLENBQUEsSUFBQztJQVRyQyxpQkFTc0M7SUFDdEMsMEJBQTZDO0lBQ2pELGlCQUFROzs7O0lBZEQsaWJBRXFDO0lBSHJDLDJIQUFtRTtJQU8vRCxlQUF1QztJQUF2QyxvRkFBdUM7SUFEdkMsaURBQWdDLG9DQUFBLDRHQUFBLCtEQUFBLDJGQUFBLGdDQUFBO0lBRGhDLG1GQUFtQztJQVNwQyxlQUErQjtJQUEvQixtRUFBK0I7OztJQWhCN0MsMkJBQW1GO0lBQy9FLCtFQWdCUTtJQUNaLGlCQUFNOzs7SUFsQjBDLCtFQUFrQztJQUM5QyxlQUFlO0lBQWYsNkNBQWU7Ozs7SUFxQi9DLDJCQUFrRixZQUFBLGVBQUE7SUFlbkUsK0tBQVUsZUFBQSwwQkFBbUIsQ0FBQSxJQUFDO0lBVHJDLGlCQVNzQztJQUN0QywwQkFBOEM7SUFDbEQsaUJBQVEsRUFBQTs7OztJQWpCbUMsK0VBQWtDO0lBR3JFLGVBRWtDO0lBRmxDLGliQUVrQztJQUhsQywySEFBbUU7SUFPaEUsZUFBdUM7SUFBdkMsb0ZBQXVDO0lBRHZDLGlEQUFnQyxvQ0FBQSwyRkFBQSwrREFBQSwyRkFBQSxnQ0FBQTtJQURoQyxtRkFBbUM7SUFTcEMsZUFBZ0M7SUFBaEMsb0dBQWdDOzs7SUFqQmxELDJCQUE4QztJQUMxQywyRUFrQk07SUFDVixpQkFBTTs7O0lBbkI0QixlQUFlO0lBQWYsNkNBQWU7O0FBcUJ2RCxNQUFNLE9BQU8sbUJBQW1CO0lBYzlCLFlBQ1UsR0FBMEI7UUFBMUIsUUFBRyxHQUFILEdBQUcsQ0FBdUI7UUFYcEMsb0JBQWUsR0FBRyxLQUFLLENBQUE7UUFDdkIsaUJBQVksR0FBRyxLQUFLLENBQUE7UUFJcEIsaUJBQVksR0FBbUIsRUFBRSxDQUFBO0lBUWpDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssbUJBQW1CO1lBQ3BFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFBO1FBQ3pFLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxhQUFhLENBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FDekUsQ0FBQTtRQUNELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUMvQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUN2QyxZQUFZLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FDcEUsQ0FBQTtTQUNGO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFLO1FBQ2YsS0FBSyxNQUFNLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzVDLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssWUFBWSxDQUFDLEtBQUssRUFBRTtnQkFDN0MsWUFBWSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQTthQUM1QztTQUNGO1FBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtTQUMxRDtJQUNILENBQUM7O3NGQTVDVSxtQkFBbUI7d0RBQW5CLG1CQUFtQjtRQWpEMUIsd0VBRzRDO1FBRzVDLG9FQWtCTTtRQUdOLG9FQW9CTTs7UUEvQ0UscUVBQW9CO1FBTXRCLGVBQXdDO1FBQXhDLDZEQUF3QztRQXFCeEMsZUFBc0M7UUFBdEMsMkRBQXNDOzt1RkFzQnJDLG1CQUFtQjtjQXBEL0IsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2FBZ0RDO2FBQ1o7d0VBV1UsVUFBVTtrQkFBbEIsS0FBSztZQUNHLFdBQVc7a0JBQW5CLEtBQUs7WUFDRyxTQUFTO2tCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXG5pbXBvcnQge2J1aWxkVGl0bGVNYXB9IGZyb20gJy4uL2Z1bmN0aW9ucy9idWlsZFRpdGxlTWFwJ1xuaW1wb3J0IHtKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSdcbmltcG9ydCB7VGl0bGVNYXBJdGVtfSBmcm9tICcuLi9pbnRlcmZhY2VzL3RpdGxlLW1hcC1pdGVtJ1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjaGVja2JveGVzLXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8bGFiZWwgKm5nSWY9XCJvcHRpb25zPy50aXRsZVwiXG4gICAgICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmxhYmVsSHRtbENsYXNzIHx8ICcnXCJcbiAgICAgICAgICAgICBbc3R5bGUuZGlzcGxheV09XCJvcHRpb25zPy5ub3RpdGxlID8gJ25vbmUnIDogJydcIlxuICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8udGl0bGVcIj48L2xhYmVsPlxuXG4gICAgICA8IS0tICdob3Jpem9udGFsJyA9IGNoZWNrYm94ZXMtaW5saW5lIG9yIGNoZWNrYm94YnV0dG9ucyAtLT5cbiAgICAgIDxkaXYgKm5nSWY9XCJsYXlvdXRPcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnXCIgW2NsYXNzXT1cIm9wdGlvbnM/Lmh0bWxDbGFzcyB8fCAnJ1wiPlxuICAgICAgICAgIDxsYWJlbCAqbmdGb3I9XCJsZXQgY2hlY2tib3hJdGVtIG9mIGNoZWNrYm94TGlzdFwiXG4gICAgICAgICAgICAgICAgIFthdHRyLmZvcl09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnLycgKyBjaGVja2JveEl0ZW0udmFsdWVcIlxuICAgICAgICAgICAgICAgICBbY2xhc3NdPVwiKG9wdGlvbnM/Lml0ZW1MYWJlbEh0bWxDbGFzcyB8fCAnJykgKyAoY2hlY2tib3hJdGVtLmNoZWNrZWQgP1xuICAgICAgICAgICgnICcgKyAob3B0aW9ucz8uYWN0aXZlQ2xhc3MgfHwgJycpICsgJyAnICsgKG9wdGlvbnM/LnN0eWxlPy5zZWxlY3RlZCB8fCAnJykpIDpcbiAgICAgICAgICAoJyAnICsgKG9wdGlvbnM/LnN0eWxlPy51bnNlbGVjdGVkIHx8ICcnKSkpXCI+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgW2F0dHIucmVxdWlyZWRdPVwib3B0aW9ucz8ucmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgICAgICAgW2NoZWNrZWRdPVwiY2hlY2tib3hJdGVtLmNoZWNrZWRcIlxuICAgICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmZpZWxkSHRtbENsYXNzIHx8ICcnXCJcbiAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJjb250cm9sRGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICcvJyArIGNoZWNrYm94SXRlbS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgICBbbmFtZV09XCJjaGVja2JveEl0ZW0/Lm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgW3JlYWRvbmx5XT1cIm9wdGlvbnM/LnJlYWRvbmx5ID8gJ3JlYWRvbmx5JyA6IG51bGxcIlxuICAgICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cImNoZWNrYm94SXRlbS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAoY2hhbmdlKT1cInVwZGF0ZVZhbHVlKCRldmVudClcIj5cbiAgICAgICAgICAgICAgPHNwYW4gW2lubmVySFRNTF09XCJjaGVja2JveEl0ZW0ubmFtZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDwhLS0gJ3ZlcnRpY2FsJyA9IHJlZ3VsYXIgY2hlY2tib3hlcyAtLT5cbiAgICAgIDxkaXYgKm5nSWY9XCJsYXlvdXRPcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJ1wiPlxuICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGNoZWNrYm94SXRlbSBvZiBjaGVja2JveExpc3RcIiBbY2xhc3NdPVwib3B0aW9ucz8uaHRtbENsYXNzIHx8ICcnXCI+XG4gICAgICAgICAgICAgIDxsYWJlbFxuICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmZvcl09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnLycgKyBjaGVja2JveEl0ZW0udmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICAgIFtjbGFzc109XCIob3B0aW9ucz8uaXRlbUxhYmVsSHRtbENsYXNzIHx8ICcnKSArIChjaGVja2JveEl0ZW0uY2hlY2tlZCA/XG4gICAgICAgICAgICAoJyAnICsgKG9wdGlvbnM/LmFjdGl2ZUNsYXNzIHx8ICcnKSArICcgJyArIChvcHRpb25zPy5zdHlsZT8uc2VsZWN0ZWQgfHwgJycpKSA6XG4gICAgICAgICAgICAoJyAnICsgKG9wdGlvbnM/LnN0eWxlPy51bnNlbGVjdGVkIHx8ICcnKSkpXCI+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5yZXF1aXJlZF09XCJvcHRpb25zPy5yZXF1aXJlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgW2NoZWNrZWRdPVwiY2hlY2tib3hJdGVtLmNoZWNrZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5maWVsZEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImNvbnRyb2xEaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cIm9wdGlvbnM/Lm5hbWUgKyAnLycgKyBjaGVja2JveEl0ZW0udmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtuYW1lXT1cImNoZWNrYm94SXRlbT8ubmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgW3JlYWRvbmx5XT1cIm9wdGlvbnM/LnJlYWRvbmx5ID8gJ3JlYWRvbmx5JyA6IG51bGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJjaGVja2JveEl0ZW0udmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIChjaGFuZ2UpPVwidXBkYXRlVmFsdWUoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gW2lubmVySFRNTF09XCJjaGVja2JveEl0ZW0/Lm5hbWVcIj48L3NwYW4+XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2JveGVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbFxuICBjb250cm9sTmFtZTogc3RyaW5nXG4gIGNvbnRyb2xWYWx1ZTogYW55XG4gIGNvbnRyb2xEaXNhYmxlZCA9IGZhbHNlXG4gIGJvdW5kQ29udHJvbCA9IGZhbHNlXG4gIG9wdGlvbnM6IGFueVxuICBsYXlvdXRPcmllbnRhdGlvbjogc3RyaW5nXG4gIGZvcm1BcnJheTogQWJzdHJhY3RDb250cm9sXG4gIGNoZWNrYm94TGlzdDogVGl0bGVNYXBJdGVtW10gPSBbXVxuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge31cbiAgICB0aGlzLmxheW91dE9yaWVudGF0aW9uID0gKHRoaXMubGF5b3V0Tm9kZS50eXBlID09PSAnY2hlY2tib3hlcy1pbmxpbmUnIHx8XG4gICAgICB0aGlzLmxheW91dE5vZGUudHlwZSA9PT0gJ2NoZWNrYm94YnV0dG9ucycpID8gJ2hvcml6b250YWwnIDogJ3ZlcnRpY2FsJ1xuICAgIHRoaXMuanNmLmluaXRpYWxpemVDb250cm9sKHRoaXMpXG4gICAgdGhpcy5jaGVja2JveExpc3QgPSBidWlsZFRpdGxlTWFwKFxuICAgICAgdGhpcy5vcHRpb25zLnRpdGxlTWFwIHx8IHRoaXMub3B0aW9ucy5lbnVtTmFtZXMsIHRoaXMub3B0aW9ucy5lbnVtLCB0cnVlXG4gICAgKVxuICAgIGlmICh0aGlzLmJvdW5kQ29udHJvbCkge1xuICAgICAgY29uc3QgZm9ybUFycmF5ID0gdGhpcy5qc2YuZ2V0Rm9ybUNvbnRyb2wodGhpcylcbiAgICAgIHRoaXMuY2hlY2tib3hMaXN0LmZvckVhY2goY2hlY2tib3hJdGVtID0+XG4gICAgICAgIGNoZWNrYm94SXRlbS5jaGVja2VkID0gZm9ybUFycmF5LnZhbHVlLmluY2x1ZGVzKGNoZWNrYm94SXRlbS52YWx1ZSlcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICB1cGRhdGVWYWx1ZShldmVudCkge1xuICAgIGZvciAoY29uc3QgY2hlY2tib3hJdGVtIG9mIHRoaXMuY2hlY2tib3hMaXN0KSB7XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0LnZhbHVlID09PSBjaGVja2JveEl0ZW0udmFsdWUpIHtcbiAgICAgICAgY2hlY2tib3hJdGVtLmNoZWNrZWQgPSBldmVudC50YXJnZXQuY2hlY2tlZFxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5ib3VuZENvbnRyb2wpIHtcbiAgICAgIHRoaXMuanNmLnVwZGF0ZUFycmF5Q2hlY2tib3hMaXN0KHRoaXMsIHRoaXMuY2hlY2tib3hMaXN0KVxuICAgIH1cbiAgfVxufVxuIl19