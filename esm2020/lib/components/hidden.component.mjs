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
export class HiddenComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    ngOnInit() {
        this.jsf.initializeControl(this);
    }
}
HiddenComponent.ɵfac = function HiddenComponent_Factory(t) { return new (t || HiddenComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
HiddenComponent.ɵcmp = i0.ɵɵdefineComponent({ type: HiddenComponent, selectors: [["hidden-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 2, vars: 2, consts: [["type", "hidden", 3, "formControl", "id", "name", 4, "ngIf"], ["type", "hidden", 3, "disabled", "name", "id", "value", 4, "ngIf"], ["type", "hidden", 3, "formControl", "id", "name"], ["type", "hidden", 3, "disabled", "name", "id", "value"]], template: function HiddenComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, HiddenComponent_input_0_Template, 1, 3, "input", 0);
        i0.ɵɵtemplate(1, HiddenComponent_input_1_Template, 1, 4, "input", 1);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.boundControl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.boundControl);
    } }, dependencies: [i2.NgIf, i3.DefaultValueAccessor, i3.NgControlStatus, i3.FormControlDirective], encapsulation: 2 });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZGVuLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nc2Ytd2lkZ2V0LWxpYnJhcnkvc3JjL2xpYi9jb21wb25lbnRzL2hpZGRlbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUE7QUFFdEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUE7Ozs7OztJQUt0RSwyQkFJZ0I7OztJQUhkLGdEQUEyQiw4RUFBQSw0QkFBQTs7O0lBSTdCLDJCQUt5Qjs7O0lBSnZCLGlEQUE0Qiw0QkFBQSw4RUFBQSw4QkFBQTs7QUFNbEMsTUFBTSxPQUFPLGVBQWU7SUFVMUIsWUFDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQVBwQyxvQkFBZSxHQUFHLEtBQUssQ0FBQTtRQUN2QixpQkFBWSxHQUFHLEtBQUssQ0FBQTtJQVFwQixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbEMsQ0FBQzs7OEVBakJVLGVBQWU7b0RBQWYsZUFBZTtRQVp4QixvRUFJZ0I7UUFDaEIsb0VBS3lCOztRQVZqQix1Q0FBa0I7UUFLbEIsZUFBbUI7UUFBbkIsd0NBQW1COzt1RkFPbEIsZUFBZTtjQWYzQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7OEJBV2tCO2FBQzdCO3dFQU9VLFVBQVU7a0JBQWxCLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJ1xuaW1wb3J0IHtKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaGlkZGVuLXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGlucHV0ICpuZ0lmPVwiYm91bmRDb250cm9sXCJcbiAgICAgIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiXG4gICAgICBbaWRdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkXCJcbiAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgIHR5cGU9XCJoaWRkZW5cIj5cbiAgICA8aW5wdXQgKm5nSWY9XCIhYm91bmRDb250cm9sXCJcbiAgICAgIFtkaXNhYmxlZF09XCJjb250cm9sRGlzYWJsZWRcIlxuICAgICAgW25hbWVdPVwiY29udHJvbE5hbWVcIlxuICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICB0eXBlPVwiaGlkZGVuXCJcbiAgICAgIFt2YWx1ZV09XCJjb250cm9sVmFsdWVcIj5gLFxufSlcbmV4cG9ydCBjbGFzcyBIaWRkZW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sXG4gIGNvbnRyb2xOYW1lOiBzdHJpbmdcbiAgY29udHJvbFZhbHVlOiBhbnlcbiAgY29udHJvbERpc2FibGVkID0gZmFsc2VcbiAgYm91bmRDb250cm9sID0gZmFsc2VcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuanNmLmluaXRpYWxpemVDb250cm9sKHRoaXMpXG4gIH1cbn1cbiJdfQ==