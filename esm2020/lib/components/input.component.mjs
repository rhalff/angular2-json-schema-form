import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/json-schema-form.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
function InputComponent_label_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "label", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r0.options == null ? null : ctx_r0.options.labelHtmlClass) || "");
    i0.ɵɵstyleProp("display", (ctx_r0.options == null ? null : ctx_r0.options.notitle) ? "none" : "");
    i0.ɵɵproperty("innerHTML", ctx_r0.options == null ? null : ctx_r0.options.title, i0.ɵɵsanitizeHtml);
    i0.ɵɵattribute("for", "control" + (ctx_r0.layoutNode == null ? null : ctx_r0.layoutNode._id));
} }
function InputComponent_input_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 5);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r1.options == null ? null : ctx_r1.options.fieldHtmlClass) || "");
    i0.ɵɵproperty("formControl", ctx_r1.formControl)("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id))("name", ctx_r1.controlName)("readonly", (ctx_r1.options == null ? null : ctx_r1.options.readonly) ? "readonly" : null)("type", ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode.type);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Status")("list", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Autocomplete")("maxlength", ctx_r1.options == null ? null : ctx_r1.options.maxLength)("minlength", ctx_r1.options == null ? null : ctx_r1.options.minLength)("pattern", ctx_r1.options == null ? null : ctx_r1.options.pattern)("placeholder", ctx_r1.options == null ? null : ctx_r1.options.placeholder)("required", ctx_r1.options == null ? null : ctx_r1.options.required);
} }
function InputComponent_input_3_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 6);
    i0.ɵɵlistener("input", function InputComponent_input_3_Template_input_input_0_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.updateValue($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r2.options == null ? null : ctx_r2.options.fieldHtmlClass) || "");
    i0.ɵɵproperty("disabled", ctx_r2.controlDisabled)("id", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id))("name", ctx_r2.controlName)("readonly", (ctx_r2.options == null ? null : ctx_r2.options.readonly) ? "readonly" : null)("type", ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode.type)("value", ctx_r2.controlValue);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Status")("list", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Autocomplete")("maxlength", ctx_r2.options == null ? null : ctx_r2.options.maxLength)("minlength", ctx_r2.options == null ? null : ctx_r2.options.minLength)("pattern", ctx_r2.options == null ? null : ctx_r2.options.pattern)("placeholder", ctx_r2.options == null ? null : ctx_r2.options.placeholder)("required", ctx_r2.options == null ? null : ctx_r2.options.required);
} }
function InputComponent_datalist_4_option_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "option", 9);
} if (rf & 2) {
    const word_r7 = ctx.$implicit;
    i0.ɵɵproperty("value", word_r7);
} }
function InputComponent_datalist_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "datalist", 7);
    i0.ɵɵtemplate(1, InputComponent_datalist_4_option_1_Template, 1, 1, "option", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", "control" + (ctx_r3.layoutNode == null ? null : ctx_r3.layoutNode._id) + "Autocomplete");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r3.options == null ? null : ctx_r3.options.typeahead == null ? null : ctx_r3.options.typeahead.source);
} }
export class InputComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.autoCompleteList = [];
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
}
InputComponent.ɵfac = function InputComponent_Factory(t) { return new (t || InputComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
InputComponent.ɵcmp = i0.ɵɵdefineComponent({ type: InputComponent, selectors: [["input-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 5, vars: 6, consts: [[3, "class", "display", "innerHTML", 4, "ngIf"], [3, "formControl", "class", "id", "name", "readonly", "type", 4, "ngIf"], [3, "class", "disabled", "id", "name", "readonly", "type", "value", "input", 4, "ngIf"], [3, "id", 4, "ngIf"], [3, "innerHTML"], [3, "formControl", "id", "name", "readonly", "type"], [3, "disabled", "id", "name", "readonly", "type", "value", "input"], [3, "id"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"]], template: function InputComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div");
        i0.ɵɵtemplate(1, InputComponent_label_1_Template, 1, 6, "label", 0);
        i0.ɵɵtemplate(2, InputComponent_input_2_Template, 1, 14, "input", 1);
        i0.ɵɵtemplate(3, InputComponent_input_3_Template, 1, 15, "input", 2);
        i0.ɵɵtemplate(4, InputComponent_datalist_4_Template, 2, 2, "datalist", 3);
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
        i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.typeahead == null ? null : ctx.options.typeahead.source);
    } }, dependencies: [i2.NgForOf, i2.NgIf, i3.NgSelectOption, i3.ɵNgSelectMultipleOption, i3.DefaultValueAccessor, i3.NgControlStatus, i3.RequiredValidator, i3.MinLengthValidator, i3.MaxLengthValidator, i3.PatternValidator, i3.FormControlDirective], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InputComponent, [{
        type: Component,
        args: [{
                selector: 'input-widget',
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
        [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
        [attr.maxlength]="options?.maxLength"
        [attr.minlength]="options?.minLength"
        [attr.pattern]="options?.pattern"
        [attr.placeholder]="options?.placeholder"
        [attr.required]="options?.required"
        [class]="options?.fieldHtmlClass || ''"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [readonly]="options?.readonly ? 'readonly' : null"
        [type]="layoutNode?.type">
      <input *ngIf="!boundControl"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
        [attr.maxlength]="options?.maxLength"
        [attr.minlength]="options?.minLength"
        [attr.pattern]="options?.pattern"
        [attr.placeholder]="options?.placeholder"
        [attr.required]="options?.required"
        [class]="options?.fieldHtmlClass || ''"
        [disabled]="controlDisabled"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [readonly]="options?.readonly ? 'readonly' : null"
        [type]="layoutNode?.type"
        [value]="controlValue"
        (input)="updateValue($event)">
        <datalist *ngIf="options?.typeahead?.source"
          [id]="'control' + layoutNode?._id + 'Autocomplete'">
          <option *ngFor="let word of options?.typeahead?.source" [value]="word">
        </datalist>
    </div>`,
            }]
    }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmdzZi13aWRnZXQtbGlicmFyeS9zcmMvbGliL2NvbXBvbmVudHMvaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFBO0FBRXRELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFBOzs7Ozs7SUFNcEUsMkJBSXVDOzs7SUFGckMsb0ZBQXVDO0lBQ3ZDLGlHQUFnRDtJQUNoRCxtR0FBNEI7SUFINUIsNkZBQXdDOzs7SUFJMUMsMkJBYTRCOzs7SUFKMUIsb0ZBQXVDO0lBUnZDLGdEQUEyQiw4RUFBQSw0QkFBQSwyRkFBQSxtRUFBQTtJQUMzQixxSEFBZ0UsaUdBQUEsdUVBQUEsdUVBQUEsbUVBQUEsMkVBQUEscUVBQUE7Ozs7SUFZbEUsZ0NBZWdDO0lBQTlCLGtLQUFTLGVBQUEsMEJBQW1CLENBQUEsSUFBQztJQWYvQixpQkFlZ0M7OztJQVA5QixvRkFBdUM7SUFDdkMsaURBQTRCLDhFQUFBLDRCQUFBLDJGQUFBLG1FQUFBLDhCQUFBO0lBUjVCLHFIQUFnRSxpR0FBQSx1RUFBQSx1RUFBQSxtRUFBQSwyRUFBQSxxRUFBQTs7O0lBaUI5RCw0QkFBdUU7OztJQUFmLCtCQUFjOzs7SUFGeEUsbUNBQ3NEO0lBQ3BELGdGQUF1RTtJQUN6RSxpQkFBVzs7O0lBRlQsNEdBQW1EO0lBQzFCLGVBQTZCO0lBQTdCLG1JQUE2Qjs7QUFJaEUsTUFBTSxPQUFPLGNBQWM7SUFZekIsWUFDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQVRwQyxvQkFBZSxHQUFHLEtBQUssQ0FBQTtRQUN2QixpQkFBWSxHQUFHLEtBQUssQ0FBQTtRQUVwQixxQkFBZ0IsR0FBYSxFQUFFLENBQUE7SUFRL0IsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2xDLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBSztRQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hELENBQUM7OzRFQXhCVSxjQUFjO21EQUFkLGNBQWM7UUExQ3ZCLDJCQUF3QztRQUN0QyxtRUFJdUM7UUFDdkMsb0VBYTRCO1FBQzVCLG9FQWVnQztRQUM5Qix5RUFHVztRQUNmLGlCQUFNOztRQXhDRCx5RUFBa0M7UUFDN0IsZUFBb0I7UUFBcEIscUVBQW9CO1FBS3BCLGVBQWtCO1FBQWxCLHVDQUFrQjtRQWNsQixlQUFtQjtRQUFuQix3Q0FBbUI7UUFnQmQsZUFBZ0M7UUFBaEMsdUhBQWdDOzt1RkFNdEMsY0FBYztjQTdDMUIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBeUNEO2FBQ1Y7d0VBU1UsVUFBVTtrQkFBbEIsS0FBSztZQUNHLFdBQVc7a0JBQW5CLEtBQUs7WUFDRyxTQUFTO2tCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJ1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpbnB1dC13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzXT1cIm9wdGlvbnM/Lmh0bWxDbGFzcyB8fCAnJ1wiPlxuICAgICAgPGxhYmVsICpuZ0lmPVwib3B0aW9ucz8udGl0bGVcIlxuICAgICAgICBbYXR0ci5mb3JdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkXCJcbiAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmxhYmVsSHRtbENsYXNzIHx8ICcnXCJcbiAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwib3B0aW9ucz8ubm90aXRsZSA/ICdub25lJyA6ICcnXCJcbiAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy50aXRsZVwiPjwvbGFiZWw+XG4gICAgICA8aW5wdXQgKm5nSWY9XCJib3VuZENvbnRyb2xcIlxuICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdTdGF0dXMnXCJcbiAgICAgICAgW2F0dHIubGlzdF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnQXV0b2NvbXBsZXRlJ1wiXG4gICAgICAgIFthdHRyLm1heGxlbmd0aF09XCJvcHRpb25zPy5tYXhMZW5ndGhcIlxuICAgICAgICBbYXR0ci5taW5sZW5ndGhdPVwib3B0aW9ucz8ubWluTGVuZ3RoXCJcbiAgICAgICAgW2F0dHIucGF0dGVybl09XCJvcHRpb25zPy5wYXR0ZXJuXCJcbiAgICAgICAgW2F0dHIucGxhY2Vob2xkZXJdPVwib3B0aW9ucz8ucGxhY2Vob2xkZXJcIlxuICAgICAgICBbYXR0ci5yZXF1aXJlZF09XCJvcHRpb25zPy5yZXF1aXJlZFwiXG4gICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5maWVsZEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICAgIFtyZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgW3R5cGVdPVwibGF5b3V0Tm9kZT8udHlwZVwiPlxuICAgICAgPGlucHV0ICpuZ0lmPVwiIWJvdW5kQ29udHJvbFwiXG4gICAgICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ1N0YXR1cydcIlxuICAgICAgICBbYXR0ci5saXN0XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdBdXRvY29tcGxldGUnXCJcbiAgICAgICAgW2F0dHIubWF4bGVuZ3RoXT1cIm9wdGlvbnM/Lm1heExlbmd0aFwiXG4gICAgICAgIFthdHRyLm1pbmxlbmd0aF09XCJvcHRpb25zPy5taW5MZW5ndGhcIlxuICAgICAgICBbYXR0ci5wYXR0ZXJuXT1cIm9wdGlvbnM/LnBhdHRlcm5cIlxuICAgICAgICBbYXR0ci5wbGFjZWhvbGRlcl09XCJvcHRpb25zPy5wbGFjZWhvbGRlclwiXG4gICAgICAgIFthdHRyLnJlcXVpcmVkXT1cIm9wdGlvbnM/LnJlcXVpcmVkXCJcbiAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmZpZWxkSHRtbENsYXNzIHx8ICcnXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImNvbnRyb2xEaXNhYmxlZFwiXG4gICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICAgIFtyZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgW3R5cGVdPVwibGF5b3V0Tm9kZT8udHlwZVwiXG4gICAgICAgIFt2YWx1ZV09XCJjb250cm9sVmFsdWVcIlxuICAgICAgICAoaW5wdXQpPVwidXBkYXRlVmFsdWUoJGV2ZW50KVwiPlxuICAgICAgICA8ZGF0YWxpc3QgKm5nSWY9XCJvcHRpb25zPy50eXBlYWhlYWQ/LnNvdXJjZVwiXG4gICAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdBdXRvY29tcGxldGUnXCI+XG4gICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgd29yZCBvZiBvcHRpb25zPy50eXBlYWhlYWQ/LnNvdXJjZVwiIFt2YWx1ZV09XCJ3b3JkXCI+XG4gICAgICAgIDwvZGF0YWxpc3Q+XG4gICAgPC9kaXY+YCxcbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sXG4gIGNvbnRyb2xOYW1lOiBzdHJpbmdcbiAgY29udHJvbFZhbHVlOiBzdHJpbmdcbiAgY29udHJvbERpc2FibGVkID0gZmFsc2VcbiAgYm91bmRDb250cm9sID0gZmFsc2VcbiAgb3B0aW9uczogYW55XG4gIGF1dG9Db21wbGV0ZUxpc3Q6IHN0cmluZ1tdID0gW11cbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9XG4gICAgdGhpcy5qc2YuaW5pdGlhbGl6ZUNvbnRyb2wodGhpcylcbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKGV2ZW50KSB7XG4gICAgdGhpcy5qc2YudXBkYXRlVmFsdWUodGhpcywgZXZlbnQudGFyZ2V0LnZhbHVlKVxuICB9XG59XG4iXX0=