import { Component, Input } from '@angular/core';
import { hasOwn } from '@ngsf/common';
import { JsonSchemaFormService } from '@ngsf/widget-library';
import * as i0 from "@angular/core";
import * as i1 from "@ngsf/widget-library";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/material/icon";
function MaterialButtonComponent_mat_icon_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r0.options == null ? null : ctx_r0.options.icon);
} }
function MaterialButtonComponent_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 5);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r1.options == null ? null : ctx_r1.options.title, i0.ɵɵsanitizeHtml);
} }
export class MaterialButtonComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (hasOwn(this.options, 'disabled')) {
            this.controlDisabled = this.options.disabled;
        }
        else if (this.jsf.formOptions.disableInvalidSubmit) {
            this.controlDisabled = !this.jsf.isValid;
            this.jsf.isValidChanges.subscribe(isValid => this.controlDisabled = !isValid);
        }
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
MaterialButtonComponent.ɵfac = function MaterialButtonComponent_Factory(t) { return new (t || MaterialButtonComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialButtonComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialButtonComponent, selectors: [["material-button-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 4, vars: 11, consts: [[1, "button-row"], ["mat-raised-button", "", 3, "disabled", "id", "name", "type", "value", "click"], ["class", "mat-24", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], [1, "mat-24"], [3, "innerHTML"]], template: function MaterialButtonComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "button", 1);
        i0.ɵɵlistener("click", function MaterialButtonComponent_Template_button_click_1_listener($event) { return ctx.updateValue($event); });
        i0.ɵɵtemplate(2, MaterialButtonComponent_mat_icon_2_Template, 2, 1, "mat-icon", 2);
        i0.ɵɵtemplate(3, MaterialButtonComponent_span_3_Template, 1, 1, "span", 3);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.htmlClass) || "");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("disabled", ctx.controlDisabled || (ctx.options == null ? null : ctx.options.readonly))("id", "control" + (ctx.layoutNode == null ? null : ctx.layoutNode._id))("name", ctx.controlName)("type", ctx.layoutNode == null ? null : ctx.layoutNode.type)("value", ctx.controlValue);
        i0.ɵɵattribute("readonly", (ctx.options == null ? null : ctx.options.readonly) ? "readonly" : null)("aria-describedby", "control" + (ctx.layoutNode == null ? null : ctx.layoutNode._id) + "Status");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.icon);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.title);
    } }, dependencies: [i2.NgIf, i3.MatButton, i4.MatIcon], styles: ["button[_ngcontent-%COMP%]{margin-top:10px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialButtonComponent, [{
        type: Component,
        args: [{ selector: 'material-button-widget', template: `
      <div class="button-row" [class]="options?.htmlClass || ''">
          <!-- [color]="options?.color || 'primary'" -->
          <button mat-raised-button
                  [attr.readonly]="options?.readonly ? 'readonly' : null"
                  [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                  [disabled]="controlDisabled || options?.readonly"
                  [id]="'control' + layoutNode?._id"
                  [name]="controlName"
                  [type]="layoutNode?.type"
                  [value]="controlValue"
                  (click)="updateValue($event)">
              <mat-icon *ngIf="options?.icon" class="mat-24">{{options?.icon}}</mat-icon>
              <span *ngIf="options?.title" [innerHTML]="options?.title"></span>
          </button>
      </div>`, styles: ["button{margin-top:10px}\n"] }]
    }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nc2YtbWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay9zcmMvbGliL2NvbXBvbmVudHMvbWF0ZXJpYWwtYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQTtBQUV0RCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBQ25DLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNCQUFzQixDQUFBOzs7Ozs7O0lBZ0I1QyxtQ0FBK0M7SUFBQSxZQUFpQjtJQUFBLGlCQUFXOzs7SUFBNUIsZUFBaUI7SUFBakIseUVBQWlCOzs7SUFDaEUsMEJBQWlFOzs7SUFBcEMsbUdBQTRCOztBQU92RSxNQUFNLE9BQU8sdUJBQXVCO0lBV2xDLFlBQ1UsR0FBMEI7UUFBMUIsUUFBRyxHQUFILEdBQUcsQ0FBdUI7UUFScEMsb0JBQWUsR0FBRyxLQUFLLENBQUE7UUFDdkIsaUJBQVksR0FBRyxLQUFLLENBQUE7SUFTcEIsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2hDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQUU7WUFDcEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQTtTQUM3QzthQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsb0JBQW9CLEVBQUU7WUFDcEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFBO1lBQ3hDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtTQUM5RTtJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsS0FBSztRQUNmLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7WUFDOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDNUI7YUFBTTtZQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQy9DO0lBQ0gsQ0FBQzs7OEZBakNVLHVCQUF1Qjs0REFBdkIsdUJBQXVCO1FBbkI5Qiw4QkFBMkQsZ0JBQUE7UUFVL0MsMEdBQVMsdUJBQW1CLElBQUM7UUFDakMsa0ZBQTJFO1FBQzNFLDBFQUFpRTtRQUNyRSxpQkFBUyxFQUFBOztRQWJXLHlFQUFrQztRQUs5QyxlQUFpRDtRQUFqRCxxR0FBaUQsd0VBQUEseUJBQUEsNkRBQUEsMkJBQUE7UUFGakQsbUdBQXVELGlHQUFBO1FBUWhELGVBQW1CO1FBQW5CLG9FQUFtQjtRQUN2QixlQUFvQjtRQUFwQixxRUFBb0I7O3VGQU81Qix1QkFBdUI7Y0F0Qm5DLFNBQVM7MkJBQ0Usd0JBQXdCLFlBQ3hCOzs7Ozs7Ozs7Ozs7Ozs7YUFlQzt3RUFZRixVQUFVO2tCQUFsQixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3JtcydcbmltcG9ydCB7aGFzT3dufSBmcm9tICdAbmdzZi9jb21tb24nXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnQG5nc2Yvd2lkZ2V0LWxpYnJhcnknXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdGVyaWFsLWJ1dHRvbi13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1yb3dcIiBbY2xhc3NdPVwib3B0aW9ucz8uaHRtbENsYXNzIHx8ICcnXCI+XG4gICAgICAgICAgPCEtLSBbY29sb3JdPVwib3B0aW9ucz8uY29sb3IgfHwgJ3ByaW1hcnknXCIgLS0+XG4gICAgICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgW2F0dHIucmVhZG9ubHldPVwib3B0aW9ucz8ucmVhZG9ubHkgPyAncmVhZG9ubHknIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdTdGF0dXMnXCJcbiAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJjb250cm9sRGlzYWJsZWQgfHwgb3B0aW9ucz8ucmVhZG9ubHlcIlxuICAgICAgICAgICAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgICAgICAgICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICAgICAgICAgICAgICBbdHlwZV09XCJsYXlvdXROb2RlPy50eXBlXCJcbiAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJjb250cm9sVmFsdWVcIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInVwZGF0ZVZhbHVlKCRldmVudClcIj5cbiAgICAgICAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwib3B0aW9ucz8uaWNvblwiIGNsYXNzPVwibWF0LTI0XCI+e3tvcHRpb25zPy5pY29ufX08L21hdC1pY29uPlxuICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIm9wdGlvbnM/LnRpdGxlXCIgW2lubmVySFRNTF09XCJvcHRpb25zPy50aXRsZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PmAsXG4gIHN0eWxlczogW2AgYnV0dG9uIHtcbiAgICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gIH0gYF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbFxuICBjb250cm9sTmFtZTogc3RyaW5nXG4gIGNvbnRyb2xWYWx1ZTogYW55XG4gIGNvbnRyb2xEaXNhYmxlZCA9IGZhbHNlXG4gIGJvdW5kQ29udHJvbCA9IGZhbHNlXG4gIG9wdGlvbnM6IGFueVxuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge31cbiAgICB0aGlzLmpzZi5pbml0aWFsaXplQ29udHJvbCh0aGlzKVxuICAgIGlmIChoYXNPd24odGhpcy5vcHRpb25zLCAnZGlzYWJsZWQnKSkge1xuICAgICAgdGhpcy5jb250cm9sRGlzYWJsZWQgPSB0aGlzLm9wdGlvbnMuZGlzYWJsZWRcbiAgICB9IGVsc2UgaWYgKHRoaXMuanNmLmZvcm1PcHRpb25zLmRpc2FibGVJbnZhbGlkU3VibWl0KSB7XG4gICAgICB0aGlzLmNvbnRyb2xEaXNhYmxlZCA9ICF0aGlzLmpzZi5pc1ZhbGlkXG4gICAgICB0aGlzLmpzZi5pc1ZhbGlkQ2hhbmdlcy5zdWJzY3JpYmUoaXNWYWxpZCA9PiB0aGlzLmNvbnRyb2xEaXNhYmxlZCA9ICFpc1ZhbGlkKVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKGV2ZW50KSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5vcHRpb25zLm9uQ2xpY2soZXZlbnQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuanNmLnVwZGF0ZVZhbHVlKHRoaXMsIGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==