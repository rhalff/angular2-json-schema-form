import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/json-schema-form.service";
import * as i2 from "@angular/common";
function ButtonComponent_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap(ctx_r0.options == null ? null : ctx_r0.options.icon);
    i0.ɵɵproperty("innerHTML", ctx_r0.options == null ? null : ctx_r0.options.title, i0.ɵɵsanitizeHtml);
} }
export class ButtonComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    }
    updateValue(event) {
        if (typeof this.options.onClick === 'function') {
            this.options.onClick(event);
        }
        else {
            this.jsf.updateValue(this, event.target.value);
        }
    }
}
ButtonComponent.ɵfac = function ButtonComponent_Factory(t) { return new (t || ButtonComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
ButtonComponent.ɵcmp = i0.ɵɵdefineComponent({ type: ButtonComponent, selectors: [["button-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 3, vars: 11, consts: [[3, "disabled", "name", "type", "value", "click"], [3, "class", "innerHTML", 4, "ngIf"], [3, "innerHTML"]], template: function ButtonComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div")(1, "button", 0);
        i0.ɵɵlistener("click", function ButtonComponent_Template_button_click_1_listener($event) { return ctx.updateValue($event); });
        i0.ɵɵtemplate(2, ButtonComponent_span_2_Template, 1, 3, "span", 1);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.htmlClass) || "");
        i0.ɵɵadvance(1);
        i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.fieldHtmlClass) || "");
        i0.ɵɵproperty("disabled", ctx.controlDisabled)("name", ctx.controlName)("type", ctx.layoutNode == null ? null : ctx.layoutNode.type)("value", ctx.controlValue);
        i0.ɵɵattribute("readonly", (ctx.options == null ? null : ctx.options.readonly) ? "readonly" : null)("aria-describedby", "control" + (ctx.layoutNode == null ? null : ctx.layoutNode._id) + "Status");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.icon) || (ctx.options == null ? null : ctx.options.title));
    } }, dependencies: [i2.NgIf], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ButtonComponent, [{
        type: Component,
        args: [{
                selector: 'button-widget',
                template: `
      <div
              [class]="options?.htmlClass || ''">
          <button
                  [attr.readonly]="options?.readonly ? 'readonly' : null"
                  [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                  [class]="options?.fieldHtmlClass || ''"
                  [disabled]="controlDisabled"
                  [name]="controlName"
                  [type]="layoutNode?.type"
                  [value]="controlValue"
                  (click)="updateValue($event)">
        <span *ngIf="options?.icon || options?.title"
              [class]="options?.icon"
              [innerHTML]="options?.title"></span>
          </button>
      </div>`,
            }]
    }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nc2Ytd2lkZ2V0LWxpYnJhcnkvc3JjL2xpYi9jb21wb25lbnRzL2J1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUE7QUFFdEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUE7Ozs7O0lBZ0JsRSwwQkFFMEM7OztJQURwQyxrRUFBdUI7SUFDdkIsbUdBQTRCOztBQUkxQyxNQUFNLE9BQU8sZUFBZTtJQVcxQixZQUNVLEdBQTBCO1FBQTFCLFFBQUcsR0FBSCxHQUFHLENBQXVCO1FBUnBDLG9CQUFlLEdBQUcsS0FBSyxDQUFBO1FBQ3ZCLGlCQUFZLEdBQUcsS0FBSyxDQUFBO0lBU3BCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNsQyxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQUs7UUFDZixJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO1lBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQzVCO2FBQU07WUFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUMvQztJQUNILENBQUM7OzhFQTNCVSxlQUFlO29EQUFmLGVBQWU7UUFqQnRCLDJCQUMyQyxnQkFBQTtRQVMvQixrR0FBUyx1QkFBbUIsSUFBQztRQUN2QyxrRUFFMEM7UUFDeEMsaUJBQVMsRUFBQTs7UUFiTCx5RUFBa0M7UUFJOUIsZUFBdUM7UUFBdkMsOEVBQXVDO1FBQ3ZDLDhDQUE0Qix5QkFBQSw2REFBQSwyQkFBQTtRQUg1QixtR0FBdUQsaUdBQUE7UUFRMUQsZUFBcUM7UUFBckMsMEhBQXFDOzt1RkFNdkMsZUFBZTtjQXBCM0IsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7YUFnQkM7YUFDWjt3RUFRVSxVQUFVO2tCQUFsQixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3JtcydcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9qc29uLXNjaGVtYS1mb3JtLnNlcnZpY2UnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2J1dHRvbi13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPGRpdlxuICAgICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8uaHRtbENsYXNzIHx8ICcnXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgW2F0dHIucmVhZG9ubHldPVwib3B0aW9ucz8ucmVhZG9ubHkgPyAncmVhZG9ubHknIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdTdGF0dXMnXCJcbiAgICAgICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5maWVsZEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbERpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgICAgICAgICAgIFt0eXBlXT1cImxheW91dE5vZGU/LnR5cGVcIlxuICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cImNvbnRyb2xWYWx1ZVwiXG4gICAgICAgICAgICAgICAgICAoY2xpY2spPVwidXBkYXRlVmFsdWUoJGV2ZW50KVwiPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIm9wdGlvbnM/Lmljb24gfHwgb3B0aW9ucz8udGl0bGVcIlxuICAgICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8uaWNvblwiXG4gICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8udGl0bGVcIj48L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5gLFxufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sXG4gIGNvbnRyb2xOYW1lOiBzdHJpbmdcbiAgY29udHJvbFZhbHVlOiBhbnlcbiAgY29udHJvbERpc2FibGVkID0gZmFsc2VcbiAgYm91bmRDb250cm9sID0gZmFsc2VcbiAgb3B0aW9uczogYW55XG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmxheW91dE5vZGUub3B0aW9ucyB8fCB7fVxuICAgIHRoaXMuanNmLmluaXRpYWxpemVDb250cm9sKHRoaXMpXG4gIH1cblxuICB1cGRhdGVWYWx1ZShldmVudCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5vbkNsaWNrKGV2ZW50KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmpzZi51cGRhdGVWYWx1ZSh0aGlzLCBldmVudC50YXJnZXQudmFsdWUpXG4gICAgfVxuICB9XG59XG4iXX0=