import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/json-schema-form.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
function CheckboxComponent_input_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 3);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap(((ctx_r0.options == null ? null : ctx_r0.options.fieldHtmlClass) || "") + (ctx_r0.isChecked ? " " + ((ctx_r0.options == null ? null : ctx_r0.options.activeClass) || "") + " " + ((ctx_r0.options == null ? null : ctx_r0.options.style == null ? null : ctx_r0.options.style.selected) || "") : " " + ((ctx_r0.options == null ? null : ctx_r0.options.style == null ? null : ctx_r0.options.style.unselected) || "")));
    i0.ɵɵproperty("formControl", ctx_r0.formControl)("id", "control" + (ctx_r0.layoutNode == null ? null : ctx_r0.layoutNode._id))("name", ctx_r0.controlName)("readonly", (ctx_r0.options == null ? null : ctx_r0.options.readonly) ? "readonly" : null);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r0.layoutNode == null ? null : ctx_r0.layoutNode._id) + "Status");
} }
function CheckboxComponent_input_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 4);
    i0.ɵɵlistener("change", function CheckboxComponent_input_2_Template_input_change_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.updateValue($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassMap(((ctx_r1.options == null ? null : ctx_r1.options.fieldHtmlClass) || "") + (ctx_r1.isChecked ? " " + ((ctx_r1.options == null ? null : ctx_r1.options.activeClass) || "") + " " + ((ctx_r1.options == null ? null : ctx_r1.options.style == null ? null : ctx_r1.options.style.selected) || "") : " " + ((ctx_r1.options == null ? null : ctx_r1.options.style == null ? null : ctx_r1.options.style.unselected) || "")));
    i0.ɵɵproperty("checked", ctx_r1.isChecked ? "checked" : null)("disabled", ctx_r1.controlDisabled)("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id))("name", ctx_r1.controlName)("readonly", (ctx_r1.options == null ? null : ctx_r1.options.readonly) ? "readonly" : null)("value", ctx_r1.controlValue);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Status");
} }
function CheckboxComponent_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 5);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("display", (ctx_r2.options == null ? null : ctx_r2.options.notitle) ? "none" : "");
    i0.ɵɵproperty("innerHTML", ctx_r2.options == null ? null : ctx_r2.options.title, i0.ɵɵsanitizeHtml);
} }
class CheckboxComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    controlDisabled = false;
    boundControl = false;
    options;
    trueValue = true;
    falseValue = false;
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
        this.jsf.initializeControl(this);
        if (this.controlValue === null || this.controlValue === undefined) {
            this.controlValue = this.options.title;
        }
    }
    updateValue(event) {
        event.preventDefault();
        this.jsf.updateValue(this, event.target.checked ? this.trueValue : this.falseValue);
    }
    static ɵfac = function CheckboxComponent_Factory(t) { return new (t || CheckboxComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
    static ɵcmp = i0.ɵɵdefineComponent({ type: CheckboxComponent, selectors: [["checkbox-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 4, vars: 6, consts: [["type", "checkbox", 3, "formControl", "class", "id", "name", "readonly", 4, "ngIf"], ["type", "checkbox", 3, "checked", "class", "disabled", "id", "name", "readonly", "value", "change", 4, "ngIf"], [3, "display", "innerHTML", 4, "ngIf"], ["type", "checkbox", 3, "formControl", "id", "name", "readonly"], ["type", "checkbox", 3, "checked", "disabled", "id", "name", "readonly", "value", "change"], [3, "innerHTML"]], template: function CheckboxComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "label");
            i0.ɵɵtemplate(1, CheckboxComponent_input_1_Template, 1, 7, "input", 0);
            i0.ɵɵtemplate(2, CheckboxComponent_input_2_Template, 1, 9, "input", 1);
            i0.ɵɵtemplate(3, CheckboxComponent_span_3_Template, 1, 3, "span", 2);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.itemLabelHtmlClass) || "");
            i0.ɵɵattribute("for", "control" + (ctx.layoutNode == null ? null : ctx.layoutNode._id));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.boundControl);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.boundControl);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.title);
        } }, dependencies: [i2.NgIf, i3.CheckboxControlValueAccessor, i3.NgControlStatus, i3.FormControlDirective], encapsulation: 2 });
}
export { CheckboxComponent };
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CheckboxComponent, [{
        type: Component,
        args: [{
                selector: 'checkbox-widget',
                template: `
      <label
              [attr.for]="'control' + layoutNode?._id"
              [class]="options?.itemLabelHtmlClass || ''">
          <input *ngIf="boundControl"
                 [formControl]="formControl"
                 [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                 [class]="(options?.fieldHtmlClass || '') + (isChecked ?
          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :
          (' ' + (options?.style?.unselected || '')))"
                 [id]="'control' + layoutNode?._id"
                 [name]="controlName"
                 [readonly]="options?.readonly ? 'readonly' : null"
                 type="checkbox">
          <input *ngIf="!boundControl"
                 [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                 [checked]="isChecked ? 'checked' : null"
                 [class]="(options?.fieldHtmlClass || '') + (isChecked ?
          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :
          (' ' + (options?.style?.unselected || '')))"
                 [disabled]="controlDisabled"
                 [id]="'control' + layoutNode?._id"
                 [name]="controlName"
                 [readonly]="options?.readonly ? 'readonly' : null"
                 [value]="controlValue"
                 type="checkbox"
                 (change)="updateValue($event)">
          <span *ngIf="options?.title"
                [style.display]="options?.notitle ? 'none' : ''"
                [innerHTML]="options?.title"></span>
      </label>`,
            }]
    }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmdzZi13aWRnZXQtbGlicmFyeS9zcmMvbGliL2NvbXBvbmVudHMvY2hlY2tib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFBO0FBRXRELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFBOzs7Ozs7SUFRaEUsMkJBU3VCOzs7SUFOaEIsc2FBRXFDO0lBSnJDLGdEQUEyQiw4RUFBQSw0QkFBQSwyRkFBQTtJQUMzQixxSEFBZ0U7Ozs7SUFRdkUsZ0NBWXNDO0lBQS9CLHVLQUFVLGVBQUEsMEJBQW1CLENBQUEsSUFBQztJQVpyQyxpQkFZc0M7OztJQVQvQixzYUFFcUM7SUFIckMsNkRBQXdDLG9DQUFBLDhFQUFBLDRCQUFBLDJGQUFBLDhCQUFBO0lBRHhDLHFIQUFnRTs7O0lBWXZFLDBCQUUwQzs7O0lBRHBDLGlHQUFnRDtJQUNoRCxtR0FBNEI7O0FBL0I1QyxNQWtDYSxpQkFBaUI7SUFjbEI7SUFiVixXQUFXLENBQWlCO0lBQzVCLFdBQVcsQ0FBUTtJQUNuQixZQUFZLENBQUs7SUFDakIsZUFBZSxHQUFHLEtBQUssQ0FBQTtJQUN2QixZQUFZLEdBQUcsS0FBSyxDQUFBO0lBQ3BCLE9BQU8sQ0FBSztJQUNaLFNBQVMsR0FBUSxJQUFJLENBQUE7SUFDckIsVUFBVSxHQUFRLEtBQUssQ0FBQTtJQUNkLFVBQVUsQ0FBSztJQUNmLFdBQVcsQ0FBVTtJQUNyQixTQUFTLENBQVU7SUFFNUIsWUFDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtJQUVwQyxDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUE7SUFDOUQsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2hDLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxTQUFTLEVBQUU7WUFDakUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQTtTQUN2QztJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsS0FBSztRQUNmLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQTtRQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNyRixDQUFDOzJFQWpDVSxpQkFBaUI7K0NBQWpCLGlCQUFpQjtZQS9CeEIsNkJBRW9EO1lBQ2hELHNFQVN1QjtZQUN2QixzRUFZc0M7WUFDdEMsb0VBRTBDO1lBQzlDLGlCQUFROztZQTNCQSxrRkFBMkM7WUFEM0MsdUZBQXdDO1lBRXBDLGVBQWtCO1lBQWxCLHVDQUFrQjtZQVVsQixlQUFtQjtZQUFuQix3Q0FBbUI7WUFhcEIsZUFBb0I7WUFBcEIscUVBQW9COzs7U0FLeEIsaUJBQWlCO3VGQUFqQixpQkFBaUI7Y0FsQzdCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQThCRzthQUNkO3dFQVVVLFVBQVU7a0JBQWxCLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJ1xuaW1wb3J0IHtKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2hlY2tib3gtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxsYWJlbFxuICAgICAgICAgICAgICBbYXR0ci5mb3JdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkXCJcbiAgICAgICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/Lml0ZW1MYWJlbEh0bWxDbGFzcyB8fCAnJ1wiPlxuICAgICAgICAgIDxpbnB1dCAqbmdJZj1cImJvdW5kQ29udHJvbFwiXG4gICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiXG4gICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ1N0YXR1cydcIlxuICAgICAgICAgICAgICAgICBbY2xhc3NdPVwiKG9wdGlvbnM/LmZpZWxkSHRtbENsYXNzIHx8ICcnKSArIChpc0NoZWNrZWQgP1xuICAgICAgICAgICgnICcgKyAob3B0aW9ucz8uYWN0aXZlQ2xhc3MgfHwgJycpICsgJyAnICsgKG9wdGlvbnM/LnN0eWxlPy5zZWxlY3RlZCB8fCAnJykpIDpcbiAgICAgICAgICAoJyAnICsgKG9wdGlvbnM/LnN0eWxlPy51bnNlbGVjdGVkIHx8ICcnKSkpXCJcbiAgICAgICAgICAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgICAgICAgICAgW3JlYWRvbmx5XT1cIm9wdGlvbnM/LnJlYWRvbmx5ID8gJ3JlYWRvbmx5JyA6IG51bGxcIlxuICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIj5cbiAgICAgICAgICA8aW5wdXQgKm5nSWY9XCIhYm91bmRDb250cm9sXCJcbiAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnU3RhdHVzJ1wiXG4gICAgICAgICAgICAgICAgIFtjaGVja2VkXT1cImlzQ2hlY2tlZCA/ICdjaGVja2VkJyA6IG51bGxcIlxuICAgICAgICAgICAgICAgICBbY2xhc3NdPVwiKG9wdGlvbnM/LmZpZWxkSHRtbENsYXNzIHx8ICcnKSArIChpc0NoZWNrZWQgP1xuICAgICAgICAgICgnICcgKyAob3B0aW9ucz8uYWN0aXZlQ2xhc3MgfHwgJycpICsgJyAnICsgKG9wdGlvbnM/LnN0eWxlPy5zZWxlY3RlZCB8fCAnJykpIDpcbiAgICAgICAgICAoJyAnICsgKG9wdGlvbnM/LnN0eWxlPy51bnNlbGVjdGVkIHx8ICcnKSkpXCJcbiAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImNvbnRyb2xEaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICAgICAgICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICAgICAgICAgICAgIFtyZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cImNvbnRyb2xWYWx1ZVwiXG4gICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgIChjaGFuZ2UpPVwidXBkYXRlVmFsdWUoJGV2ZW50KVwiPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwib3B0aW9ucz8udGl0bGVcIlxuICAgICAgICAgICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cIm9wdGlvbnM/Lm5vdGl0bGUgPyAnbm9uZScgOiAnJ1wiXG4gICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy50aXRsZVwiPjwvc3Bhbj5cbiAgICAgIDwvbGFiZWw+YCxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tib3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sXG4gIGNvbnRyb2xOYW1lOiBzdHJpbmdcbiAgY29udHJvbFZhbHVlOiBhbnlcbiAgY29udHJvbERpc2FibGVkID0gZmFsc2VcbiAgYm91bmRDb250cm9sID0gZmFsc2VcbiAgb3B0aW9uczogYW55XG4gIHRydWVWYWx1ZTogYW55ID0gdHJ1ZVxuICBmYWxzZVZhbHVlOiBhbnkgPSBmYWxzZVxuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgZ2V0IGlzQ2hlY2tlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5qc2YuZ2V0Rm9ybUNvbnRyb2xWYWx1ZSh0aGlzKSA9PT0gdGhpcy50cnVlVmFsdWVcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9XG4gICAgdGhpcy5qc2YuaW5pdGlhbGl6ZUNvbnRyb2wodGhpcylcbiAgICBpZiAodGhpcy5jb250cm9sVmFsdWUgPT09IG51bGwgfHwgdGhpcy5jb250cm9sVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jb250cm9sVmFsdWUgPSB0aGlzLm9wdGlvbnMudGl0bGVcbiAgICB9XG4gIH1cblxuICB1cGRhdGVWYWx1ZShldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB0aGlzLmpzZi51cGRhdGVWYWx1ZSh0aGlzLCBldmVudC50YXJnZXQuY2hlY2tlZCA/IHRoaXMudHJ1ZVZhbHVlIDogdGhpcy5mYWxzZVZhbHVlKVxuICB9XG59XG4iXX0=