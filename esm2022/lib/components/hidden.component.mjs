import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/json-schema-form.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
function HiddenComponent_input_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formControl", ctx_r0.formControl)("id", "control" + (ctx_r0.layoutNode == null ? null : ctx_r0.layoutNode._id))("name", ctx_r0.controlName);
} }
function HiddenComponent_input_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 3);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r1.controlDisabled)("name", ctx_r1.controlName)("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id))("value", ctx_r1.controlValue);
} }
class HiddenComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    controlDisabled = false;
    boundControl = false;
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
    }
    ngOnInit() {
        this.jsf.initializeControl(this);
    }
    static ɵfac = function HiddenComponent_Factory(t) { return new (t || HiddenComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
    static ɵcmp = i0.ɵɵdefineComponent({ type: HiddenComponent, selectors: [["hidden-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 2, vars: 2, consts: [["type", "hidden", 3, "formControl", "id", "name", 4, "ngIf"], ["type", "hidden", 3, "disabled", "name", "id", "value", 4, "ngIf"], ["type", "hidden", 3, "formControl", "id", "name"], ["type", "hidden", 3, "disabled", "name", "id", "value"]], template: function HiddenComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, HiddenComponent_input_0_Template, 1, 3, "input", 0);
            i0.ɵɵtemplate(1, HiddenComponent_input_1_Template, 1, 4, "input", 1);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.boundControl);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.boundControl);
        } }, dependencies: [i2.NgIf, i3.DefaultValueAccessor, i3.NgControlStatus, i3.FormControlDirective], encapsulation: 2 });
}
export { HiddenComponent };
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HiddenComponent, [{
        type: Component,
        args: [{
                selector: 'hidden-widget',
                template: `
    <input *ngIf="boundControl"
      [formControl]="formControl"
      [id]="'control' + layoutNode?._id"
      [name]="controlName"
      type="hidden">
    <input *ngIf="!boundControl"
      [disabled]="controlDisabled"
      [name]="controlName"
      [id]="'control' + layoutNode?._id"
      type="hidden"
      [value]="controlValue">`,
            }]
    }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZGVuLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nc2Ytd2lkZ2V0LWxpYnJhcnkvc3JjL2xpYi9jb21wb25lbnRzL2hpZGRlbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUE7QUFFdEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUE7Ozs7OztJQUt0RSwyQkFJZ0I7OztJQUhkLGdEQUEyQiw4RUFBQSw0QkFBQTs7O0lBSTdCLDJCQUt5Qjs7O0lBSnZCLGlEQUE0Qiw0QkFBQSw4RUFBQSw4QkFBQTs7QUFUbEMsTUFlYSxlQUFlO0lBV2hCO0lBVlYsV0FBVyxDQUFpQjtJQUM1QixXQUFXLENBQVE7SUFDbkIsWUFBWSxDQUFLO0lBQ2pCLGVBQWUsR0FBRyxLQUFLLENBQUE7SUFDdkIsWUFBWSxHQUFHLEtBQUssQ0FBQTtJQUNYLFVBQVUsQ0FBSztJQUNmLFdBQVcsQ0FBVTtJQUNyQixTQUFTLENBQVU7SUFFNUIsWUFDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtJQUVwQyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbEMsQ0FBQzt5RUFqQlUsZUFBZTsrQ0FBZixlQUFlO1lBWnhCLG9FQUlnQjtZQUNoQixvRUFLeUI7O1lBVmpCLHVDQUFrQjtZQUtsQixlQUFtQjtZQUFuQix3Q0FBbUI7OztTQU9sQixlQUFlO3VGQUFmLGVBQWU7Y0FmM0IsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7OzhCQVdrQjthQUM3Qjt3RUFPVSxVQUFVO2tCQUFsQixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3JtcydcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9qc29uLXNjaGVtYS1mb3JtLnNlcnZpY2UnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2hpZGRlbi13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxpbnB1dCAqbmdJZj1cImJvdW5kQ29udHJvbFwiXG4gICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICB0eXBlPVwiaGlkZGVuXCI+XG4gICAgPGlucHV0ICpuZ0lmPVwiIWJvdW5kQ29udHJvbFwiXG4gICAgICBbZGlzYWJsZWRdPVwiY29udHJvbERpc2FibGVkXCJcbiAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgdHlwZT1cImhpZGRlblwiXG4gICAgICBbdmFsdWVdPVwiY29udHJvbFZhbHVlXCI+YCxcbn0pXG5leHBvcnQgY2xhc3MgSGlkZGVuQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbFxuICBjb250cm9sTmFtZTogc3RyaW5nXG4gIGNvbnRyb2xWYWx1ZTogYW55XG4gIGNvbnRyb2xEaXNhYmxlZCA9IGZhbHNlXG4gIGJvdW5kQ29udHJvbCA9IGZhbHNlXG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmpzZi5pbml0aWFsaXplQ29udHJvbCh0aGlzKVxuICB9XG59XG4iXX0=