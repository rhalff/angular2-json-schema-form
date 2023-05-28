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
class ButtonComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    controlDisabled = false;
    boundControl = false;
    options;
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
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
    static ɵfac = function ButtonComponent_Factory(t) { return new (t || ButtonComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
    static ɵcmp = i0.ɵɵdefineComponent({ type: ButtonComponent, selectors: [["button-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 3, vars: 11, consts: [[3, "disabled", "name", "type", "value", "click"], [3, "class", "innerHTML", 4, "ngIf"], [3, "innerHTML"]], template: function ButtonComponent_Template(rf, ctx) { if (rf & 1) {
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
}
export { ButtonComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nc2Ytd2lkZ2V0LWxpYnJhcnkvc3JjL2xpYi9jb21wb25lbnRzL2J1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUE7QUFFdEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUE7Ozs7O0lBZ0JsRSwwQkFFMEM7OztJQURwQyxrRUFBdUI7SUFDdkIsbUdBQTRCOztBQWhCMUMsTUFvQmEsZUFBZTtJQVloQjtJQVhWLFdBQVcsQ0FBaUI7SUFDNUIsV0FBVyxDQUFRO0lBQ25CLFlBQVksQ0FBSztJQUNqQixlQUFlLEdBQUcsS0FBSyxDQUFBO0lBQ3ZCLFlBQVksR0FBRyxLQUFLLENBQUE7SUFDcEIsT0FBTyxDQUFLO0lBQ0gsVUFBVSxDQUFLO0lBQ2YsV0FBVyxDQUFVO0lBQ3JCLFNBQVMsQ0FBVTtJQUU1QixZQUNVLEdBQTBCO1FBQTFCLFFBQUcsR0FBSCxHQUFHLENBQXVCO0lBRXBDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNsQyxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQUs7UUFDZixJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO1lBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQzVCO2FBQU07WUFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUMvQztJQUNILENBQUM7eUVBM0JVLGVBQWU7K0NBQWYsZUFBZTtZQWpCdEIsMkJBQzJDLGdCQUFBO1lBUy9CLGtHQUFTLHVCQUFtQixJQUFDO1lBQ3ZDLGtFQUUwQztZQUN4QyxpQkFBUyxFQUFBOztZQWJMLHlFQUFrQztZQUk5QixlQUF1QztZQUF2Qyw4RUFBdUM7WUFDdkMsOENBQTRCLHlCQUFBLDZEQUFBLDJCQUFBO1lBSDVCLG1HQUF1RCxpR0FBQTtZQVExRCxlQUFxQztZQUFyQywwSEFBcUM7OztTQU12QyxlQUFlO3VGQUFmLGVBQWU7Y0FwQjNCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O2FBZ0JDO2FBQ1o7d0VBUVUsVUFBVTtrQkFBbEIsS0FBSztZQUNHLFdBQVc7a0JBQW5CLEtBQUs7WUFDRyxTQUFTO2tCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJ1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdidXR0b24td2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxkaXZcbiAgICAgICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/Lmh0bWxDbGFzcyB8fCAnJ1wiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIFthdHRyLnJlYWRvbmx5XT1cIm9wdGlvbnM/LnJlYWRvbmx5ID8gJ3JlYWRvbmx5JyA6IG51bGxcIlxuICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnU3RhdHVzJ1wiXG4gICAgICAgICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8uZmllbGRIdG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImNvbnRyb2xEaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICAgICAgICAgICAgICBbdHlwZV09XCJsYXlvdXROb2RlPy50eXBlXCJcbiAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJjb250cm9sVmFsdWVcIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInVwZGF0ZVZhbHVlKCRldmVudClcIj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJvcHRpb25zPy5pY29uIHx8IG9wdGlvbnM/LnRpdGxlXCJcbiAgICAgICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/Lmljb25cIlxuICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LnRpdGxlXCI+PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+YCxcbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbFxuICBjb250cm9sTmFtZTogc3RyaW5nXG4gIGNvbnRyb2xWYWx1ZTogYW55XG4gIGNvbnRyb2xEaXNhYmxlZCA9IGZhbHNlXG4gIGJvdW5kQ29udHJvbCA9IGZhbHNlXG4gIG9wdGlvbnM6IGFueVxuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge31cbiAgICB0aGlzLmpzZi5pbml0aWFsaXplQ29udHJvbCh0aGlzKVxuICB9XG5cbiAgdXBkYXRlVmFsdWUoZXZlbnQpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5vbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLm9wdGlvbnMub25DbGljayhldmVudClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5qc2YudXBkYXRlVmFsdWUodGhpcywgZXZlbnQudGFyZ2V0LnZhbHVlKVxuICAgIH1cbiAgfVxufVxuIl19