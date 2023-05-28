import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/json-schema-form.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
function NumberComponent_label_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "label", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r0.options == null ? null : ctx_r0.options.labelHtmlClass) || "");
    i0.ɵɵstyleProp("display", (ctx_r0.options == null ? null : ctx_r0.options.notitle) ? "none" : "");
    i0.ɵɵproperty("innerHTML", ctx_r0.options == null ? null : ctx_r0.options.title, i0.ɵɵsanitizeHtml);
    i0.ɵɵattribute("for", "control" + (ctx_r0.layoutNode == null ? null : ctx_r0.layoutNode._id));
} }
function NumberComponent_input_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 5);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r1.options == null ? null : ctx_r1.options.fieldHtmlClass) || "");
    i0.ɵɵproperty("formControl", ctx_r1.formControl)("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id))("name", ctx_r1.controlName)("readonly", (ctx_r1.options == null ? null : ctx_r1.options.readonly) ? "readonly" : null)("title", ctx_r1.lastValidNumber)("type", (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode.type) === "range" ? "range" : "number");
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Status")("max", ctx_r1.options == null ? null : ctx_r1.options.maximum)("min", ctx_r1.options == null ? null : ctx_r1.options.minimum)("placeholder", ctx_r1.options == null ? null : ctx_r1.options.placeholder)("required", ctx_r1.options == null ? null : ctx_r1.options.required)("readonly", (ctx_r1.options == null ? null : ctx_r1.options.readonly) ? "readonly" : null)("step", (ctx_r1.options == null ? null : ctx_r1.options.multipleOf) || (ctx_r1.options == null ? null : ctx_r1.options.step) || "any");
} }
function NumberComponent_input_3_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 6);
    i0.ɵɵlistener("input", function NumberComponent_input_3_Template_input_input_0_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.updateValue($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r2.options == null ? null : ctx_r2.options.fieldHtmlClass) || "");
    i0.ɵɵproperty("disabled", ctx_r2.controlDisabled)("id", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id))("name", ctx_r2.controlName)("readonly", (ctx_r2.options == null ? null : ctx_r2.options.readonly) ? "readonly" : null)("title", ctx_r2.lastValidNumber)("type", (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode.type) === "range" ? "range" : "number")("value", ctx_r2.controlValue);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Status")("max", ctx_r2.options == null ? null : ctx_r2.options.maximum)("min", ctx_r2.options == null ? null : ctx_r2.options.minimum)("placeholder", ctx_r2.options == null ? null : ctx_r2.options.placeholder)("required", ctx_r2.options == null ? null : ctx_r2.options.required)("readonly", (ctx_r2.options == null ? null : ctx_r2.options.readonly) ? "readonly" : null)("step", (ctx_r2.options == null ? null : ctx_r2.options.multipleOf) || (ctx_r2.options == null ? null : ctx_r2.options.step) || "any");
} }
function NumberComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 4);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r3.controlValue, i0.ɵɵsanitizeHtml);
} }
class NumberComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    controlDisabled = false;
    boundControl = false;
    options;
    allowNegative = true;
    allowDecimal = true;
    allowExponents = false;
    lastValidNumber = '';
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (this.layoutNode.dataType === 'integer') {
            this.allowDecimal = false;
        }
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
    static ɵfac = function NumberComponent_Factory(t) { return new (t || NumberComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
    static ɵcmp = i0.ɵɵdefineComponent({ type: NumberComponent, selectors: [["number-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 5, vars: 6, consts: [[3, "class", "display", "innerHTML", 4, "ngIf"], [3, "formControl", "class", "id", "name", "readonly", "title", "type", 4, "ngIf"], [3, "class", "disabled", "id", "name", "readonly", "title", "type", "value", "input", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], [3, "innerHTML"], [3, "formControl", "id", "name", "readonly", "title", "type"], [3, "disabled", "id", "name", "readonly", "title", "type", "value", "input"]], template: function NumberComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵtemplate(1, NumberComponent_label_1_Template, 1, 6, "label", 0);
            i0.ɵɵtemplate(2, NumberComponent_input_2_Template, 1, 15, "input", 1);
            i0.ɵɵtemplate(3, NumberComponent_input_3_Template, 1, 16, "input", 2);
            i0.ɵɵtemplate(4, NumberComponent_span_4_Template, 1, 1, "span", 3);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.htmlClass) || "");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.title);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.boundControl);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.boundControl);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.layoutNode == null ? null : ctx.layoutNode.type) === "range");
        } }, dependencies: [i2.NgIf, i3.DefaultValueAccessor, i3.NgControlStatus, i3.FormControlDirective], encapsulation: 2 });
}
export { NumberComponent };
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NumberComponent, [{
        type: Component,
        args: [{
                selector: 'number-widget',
                template: `
      <div [class]="options?.htmlClass || ''">
          <label *ngIf="options?.title"
                 [attr.for]="'control' + layoutNode?._id"
                 [class]="options?.labelHtmlClass || ''"
                 [style.display]="options?.notitle ? 'none' : ''"
                 [innerHTML]="options?.title"></label>
          <input *ngIf="boundControl"
                 [formControl]="formControl"
                 [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                 [attr.max]="options?.maximum"
                 [attr.min]="options?.minimum"
                 [attr.placeholder]="options?.placeholder"
                 [attr.required]="options?.required"
                 [attr.readonly]="options?.readonly ? 'readonly' : null"
                 [attr.step]="options?.multipleOf || options?.step || 'any'"
                 [class]="options?.fieldHtmlClass || ''"
                 [id]="'control' + layoutNode?._id"
                 [name]="controlName"
                 [readonly]="options?.readonly ? 'readonly' : null"
                 [title]="lastValidNumber"
                 [type]="layoutNode?.type === 'range' ? 'range' : 'number'">
          <input *ngIf="!boundControl"
                 [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                 [attr.max]="options?.maximum"
                 [attr.min]="options?.minimum"
                 [attr.placeholder]="options?.placeholder"
                 [attr.required]="options?.required"
                 [attr.readonly]="options?.readonly ? 'readonly' : null"
                 [attr.step]="options?.multipleOf || options?.step || 'any'"
                 [class]="options?.fieldHtmlClass || ''"
                 [disabled]="controlDisabled"
                 [id]="'control' + layoutNode?._id"
                 [name]="controlName"
                 [readonly]="options?.readonly ? 'readonly' : null"
                 [title]="lastValidNumber"
                 [type]="layoutNode?.type === 'range' ? 'range' : 'number'"
                 [value]="controlValue"
                 (input)="updateValue($event)">
          <span *ngIf="layoutNode?.type === 'range'" [innerHTML]="controlValue"></span>
      </div>`,
            }]
    }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nc2Ytd2lkZ2V0LWxpYnJhcnkvc3JjL2xpYi9jb21wb25lbnRzL251bWJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUE7QUFFdEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUE7Ozs7OztJQU1oRSwyQkFJNEM7OztJQUZyQyxvRkFBdUM7SUFDdkMsaUdBQWdEO0lBQ2hELG1HQUE0QjtJQUg1Qiw2RkFBd0M7OztJQUkvQywyQkFja0U7OztJQUwzRCxvRkFBdUM7SUFSdkMsZ0RBQTJCLDhFQUFBLDRCQUFBLDJGQUFBLGlDQUFBLHNHQUFBO0lBQzNCLHFIQUFnRSwrREFBQSwrREFBQSwyRUFBQSxxRUFBQSwyRkFBQSx1SUFBQTs7OztJQWF2RSxnQ0FnQnFDO0lBQTlCLG1LQUFTLGVBQUEsMEJBQW1CLENBQUEsSUFBQztJQWhCcEMsaUJBZ0JxQzs7O0lBUjlCLG9GQUF1QztJQUN2QyxpREFBNEIsOEVBQUEsNEJBQUEsMkZBQUEsaUNBQUEsc0dBQUEsOEJBQUE7SUFSNUIscUhBQWdFLCtEQUFBLCtEQUFBLDJFQUFBLHFFQUFBLDJGQUFBLHVJQUFBOzs7SUFnQnZFLDBCQUE2RTs7O0lBQWxDLGtFQUEwQjs7QUF6Qy9FLE1BNENhLGVBQWU7SUFnQmhCO0lBZlYsV0FBVyxDQUFpQjtJQUM1QixXQUFXLENBQVE7SUFDbkIsWUFBWSxDQUFLO0lBQ2pCLGVBQWUsR0FBRyxLQUFLLENBQUE7SUFDdkIsWUFBWSxHQUFHLEtBQUssQ0FBQTtJQUNwQixPQUFPLENBQUs7SUFDWixhQUFhLEdBQUcsSUFBSSxDQUFBO0lBQ3BCLFlBQVksR0FBRyxJQUFJLENBQUE7SUFDbkIsY0FBYyxHQUFHLEtBQUssQ0FBQTtJQUN0QixlQUFlLEdBQUcsRUFBRSxDQUFBO0lBQ1gsVUFBVSxDQUFLO0lBQ2YsV0FBVyxDQUFVO0lBQ3JCLFNBQVMsQ0FBVTtJQUU1QixZQUNVLEdBQTBCO1FBQTFCLFFBQUcsR0FBSCxHQUFHLENBQXVCO0lBRXBDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNoQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTtZQUMxQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQTtTQUMxQjtJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsS0FBSztRQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hELENBQUM7eUVBOUJVLGVBQWU7K0NBQWYsZUFBZTtZQXpDdEIsMkJBQXdDO1lBQ3BDLG9FQUk0QztZQUM1QyxxRUFja0U7WUFDbEUscUVBZ0JxQztZQUNyQyxrRUFBNkU7WUFDakYsaUJBQU07O1lBdkNELHlFQUFrQztZQUMzQixlQUFvQjtZQUFwQixxRUFBb0I7WUFLcEIsZUFBa0I7WUFBbEIsdUNBQWtCO1lBZWxCLGVBQW1CO1lBQW5CLHdDQUFtQjtZQWlCcEIsZUFBa0M7WUFBbEMsd0ZBQWtDOzs7U0FHdEMsZUFBZTt1RkFBZixlQUFlO2NBNUMzQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzthQXdDQzthQUNaO3dFQVlVLFVBQVU7a0JBQWxCLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJ1xuaW1wb3J0IHtKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnVtYmVyLXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8ZGl2IFtjbGFzc109XCJvcHRpb25zPy5odG1sQ2xhc3MgfHwgJydcIj5cbiAgICAgICAgICA8bGFiZWwgKm5nSWY9XCJvcHRpb25zPy50aXRsZVwiXG4gICAgICAgICAgICAgICAgIFthdHRyLmZvcl09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8ubGFiZWxIdG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICAgICBbc3R5bGUuZGlzcGxheV09XCJvcHRpb25zPy5ub3RpdGxlID8gJ25vbmUnIDogJydcIlxuICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LnRpdGxlXCI+PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgKm5nSWY9XCJib3VuZENvbnRyb2xcIlxuICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdTdGF0dXMnXCJcbiAgICAgICAgICAgICAgICAgW2F0dHIubWF4XT1cIm9wdGlvbnM/Lm1heGltdW1cIlxuICAgICAgICAgICAgICAgICBbYXR0ci5taW5dPVwib3B0aW9ucz8ubWluaW11bVwiXG4gICAgICAgICAgICAgICAgIFthdHRyLnBsYWNlaG9sZGVyXT1cIm9wdGlvbnM/LnBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgICAgICAgW2F0dHIucmVxdWlyZWRdPVwib3B0aW9ucz8ucmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgICBbYXR0ci5yZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgW2F0dHIuc3RlcF09XCJvcHRpb25zPy5tdWx0aXBsZU9mIHx8IG9wdGlvbnM/LnN0ZXAgfHwgJ2FueSdcIlxuICAgICAgICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8uZmllbGRIdG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICAgICBbaWRdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkXCJcbiAgICAgICAgICAgICAgICAgW25hbWVdPVwiY29udHJvbE5hbWVcIlxuICAgICAgICAgICAgICAgICBbcmVhZG9ubHldPVwib3B0aW9ucz8ucmVhZG9ubHkgPyAncmVhZG9ubHknIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgIFt0aXRsZV09XCJsYXN0VmFsaWROdW1iZXJcIlxuICAgICAgICAgICAgICAgICBbdHlwZV09XCJsYXlvdXROb2RlPy50eXBlID09PSAncmFuZ2UnID8gJ3JhbmdlJyA6ICdudW1iZXInXCI+XG4gICAgICAgICAgPGlucHV0ICpuZ0lmPVwiIWJvdW5kQ29udHJvbFwiXG4gICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ1N0YXR1cydcIlxuICAgICAgICAgICAgICAgICBbYXR0ci5tYXhdPVwib3B0aW9ucz8ubWF4aW11bVwiXG4gICAgICAgICAgICAgICAgIFthdHRyLm1pbl09XCJvcHRpb25zPy5taW5pbXVtXCJcbiAgICAgICAgICAgICAgICAgW2F0dHIucGxhY2Vob2xkZXJdPVwib3B0aW9ucz8ucGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgICAgICBbYXR0ci5yZXF1aXJlZF09XCJvcHRpb25zPy5yZXF1aXJlZFwiXG4gICAgICAgICAgICAgICAgIFthdHRyLnJlYWRvbmx5XT1cIm9wdGlvbnM/LnJlYWRvbmx5ID8gJ3JlYWRvbmx5JyA6IG51bGxcIlxuICAgICAgICAgICAgICAgICBbYXR0ci5zdGVwXT1cIm9wdGlvbnM/Lm11bHRpcGxlT2YgfHwgb3B0aW9ucz8uc3RlcCB8fCAnYW55J1wiXG4gICAgICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5maWVsZEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJjb250cm9sRGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICBbaWRdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkXCJcbiAgICAgICAgICAgICAgICAgW25hbWVdPVwiY29udHJvbE5hbWVcIlxuICAgICAgICAgICAgICAgICBbcmVhZG9ubHldPVwib3B0aW9ucz8ucmVhZG9ubHkgPyAncmVhZG9ubHknIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgIFt0aXRsZV09XCJsYXN0VmFsaWROdW1iZXJcIlxuICAgICAgICAgICAgICAgICBbdHlwZV09XCJsYXlvdXROb2RlPy50eXBlID09PSAncmFuZ2UnID8gJ3JhbmdlJyA6ICdudW1iZXInXCJcbiAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cImNvbnRyb2xWYWx1ZVwiXG4gICAgICAgICAgICAgICAgIChpbnB1dCk9XCJ1cGRhdGVWYWx1ZSgkZXZlbnQpXCI+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJsYXlvdXROb2RlPy50eXBlID09PSAncmFuZ2UnXCIgW2lubmVySFRNTF09XCJjb250cm9sVmFsdWVcIj48L3NwYW4+XG4gICAgICA8L2Rpdj5gLFxufSlcbmV4cG9ydCBjbGFzcyBOdW1iZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sXG4gIGNvbnRyb2xOYW1lOiBzdHJpbmdcbiAgY29udHJvbFZhbHVlOiBhbnlcbiAgY29udHJvbERpc2FibGVkID0gZmFsc2VcbiAgYm91bmRDb250cm9sID0gZmFsc2VcbiAgb3B0aW9uczogYW55XG4gIGFsbG93TmVnYXRpdmUgPSB0cnVlXG4gIGFsbG93RGVjaW1hbCA9IHRydWVcbiAgYWxsb3dFeHBvbmVudHMgPSBmYWxzZVxuICBsYXN0VmFsaWROdW1iZXIgPSAnJ1xuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge31cbiAgICB0aGlzLmpzZi5pbml0aWFsaXplQ29udHJvbCh0aGlzKVxuICAgIGlmICh0aGlzLmxheW91dE5vZGUuZGF0YVR5cGUgPT09ICdpbnRlZ2VyJykge1xuICAgICAgdGhpcy5hbGxvd0RlY2ltYWwgPSBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKGV2ZW50KSB7XG4gICAgdGhpcy5qc2YudXBkYXRlVmFsdWUodGhpcywgZXZlbnQudGFyZ2V0LnZhbHVlKVxuICB9XG59XG4iXX0=