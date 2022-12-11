import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/json-schema-form.service";
import * as i2 from "@angular/common";
function AddReferenceComponent_button_0_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span");
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap(ctx_r1.options == null ? null : ctx_r1.options.icon);
} }
function AddReferenceComponent_button_0_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 4);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("innerHTML", ctx_r2.buttonText, i0.ɵɵsanitizeHtml);
} }
function AddReferenceComponent_button_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 1);
    i0.ɵɵlistener("click", function AddReferenceComponent_button_0_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.addItem($event)); });
    i0.ɵɵtemplate(1, AddReferenceComponent_button_0_span_1_Template, 1, 2, "span", 2);
    i0.ɵɵtemplate(2, AddReferenceComponent_button_0_span_2_Template, 1, 1, "span", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r0.options == null ? null : ctx_r0.options.fieldHtmlClass) || "");
    i0.ɵɵproperty("disabled", ctx_r0.options == null ? null : ctx_r0.options.readonly);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.options == null ? null : ctx_r0.options.icon);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.options == null ? null : ctx_r0.options.title);
} }
export class AddReferenceComponent {
    constructor(jsf) {
        this.jsf = jsf;
    }
    get showAddButton() {
        return !this.layoutNode.arrayItem ||
            this.layoutIndex[this.layoutIndex.length - 1] < this.options.maxItems;
    }
    get buttonText() {
        const parent = {
            dataIndex: this.dataIndex.slice(0, -1),
            layoutIndex: this.layoutIndex.slice(0, -1),
            layoutNode: this.jsf.getParentNode(this)
        };
        return parent.layoutNode.add ||
            this.jsf.setArrayItemTitle(parent, this.layoutNode, this.itemCount);
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
    }
    addItem(event) {
        event.preventDefault();
        this.jsf.addItem(this);
    }
}
AddReferenceComponent.ɵfac = function AddReferenceComponent_Factory(t) { return new (t || AddReferenceComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
AddReferenceComponent.ɵcmp = i0.ɵɵdefineComponent({ type: AddReferenceComponent, selectors: [["add-reference-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 1, vars: 1, consts: [[3, "class", "disabled", "click", 4, "ngIf"], [3, "disabled", "click"], [3, "class", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], [3, "innerHTML"]], template: function AddReferenceComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, AddReferenceComponent_button_0_Template, 3, 5, "button", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.showAddButton);
    } }, dependencies: [i2.NgIf], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AddReferenceComponent, [{
        type: Component,
        args: [{
                selector: 'add-reference-widget',
                template: `
      <button *ngIf="showAddButton"
              [class]="options?.fieldHtmlClass || ''"
              [disabled]="options?.readonly"
              (click)="addItem($event)">
          <span *ngIf="options?.icon" [class]="options?.icon"></span>
          <span *ngIf="options?.title" [innerHTML]="buttonText"></span>
      </button>`,
                changeDetection: ChangeDetectionStrategy.Default,
            }]
    }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXJlZmVyZW5jZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLXdpZGdldC1saWJyYXJ5L3NyYy9saWIvY29tcG9uZW50cy9hZGQtcmVmZXJlbmNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQTtBQUMvRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQTs7Ozs7SUFTaEUsdUJBQTJEOzs7SUFBL0Isa0VBQXVCOzs7SUFDbkQsMEJBQTZEOzs7SUFBaEMsZ0VBQXdCOzs7O0lBTHpELGlDQUdrQztJQUExQiwyS0FBUyxlQUFBLHNCQUFlLENBQUEsSUFBQztJQUM3QixpRkFBMkQ7SUFDM0QsaUZBQTZEO0lBQ2pFLGlCQUFTOzs7SUFMRCxvRkFBdUM7SUFDdkMsa0ZBQThCO0lBRTNCLGVBQW1CO0lBQW5CLDBFQUFtQjtJQUNuQixlQUFvQjtJQUFwQiwyRUFBb0I7O0FBSXJDLE1BQU0sT0FBTyxxQkFBcUI7SUFTaEMsWUFDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtJQUVwQyxDQUFDO0lBRUQsSUFBSSxhQUFhO1FBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUztZQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFBO0lBQ3pFLENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDWixNQUFNLE1BQU0sR0FBUTtZQUNsQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUMsVUFBVSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztTQUN6QyxDQUFBO1FBQ0QsT0FBTyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUc7WUFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDdkUsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQTtJQUM5QyxDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQUs7UUFDWCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDeEIsQ0FBQzs7MEZBcENVLHFCQUFxQjswREFBckIscUJBQXFCO1FBVDVCLDRFQU1TOztRQU5BLHdDQUFtQjs7dUZBU3JCLHFCQUFxQjtjQVpqQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsUUFBUSxFQUFFOzs7Ozs7O2dCQU9JO2dCQUNkLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO2FBQ2pEO3dFQU1VLFVBQVU7a0JBQWxCLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9qc29uLXNjaGVtYS1mb3JtLnNlcnZpY2UnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FkZC1yZWZlcmVuY2Utd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxidXR0b24gKm5nSWY9XCJzaG93QWRkQnV0dG9uXCJcbiAgICAgICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmZpZWxkSHRtbENsYXNzIHx8ICcnXCJcbiAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIm9wdGlvbnM/LnJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cImFkZEl0ZW0oJGV2ZW50KVwiPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwib3B0aW9ucz8uaWNvblwiIFtjbGFzc109XCJvcHRpb25zPy5pY29uXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwib3B0aW9ucz8udGl0bGVcIiBbaW5uZXJIVE1MXT1cImJ1dHRvblRleHRcIj48L3NwYW4+XG4gICAgICA8L2J1dHRvbj5gLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG59KVxuZXhwb3J0IGNsYXNzIEFkZFJlZmVyZW5jZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIG9wdGlvbnM6IGFueVxuICBpdGVtQ291bnQ6IG51bWJlclxuICBwcmV2aW91c0xheW91dEluZGV4OiBudW1iZXJbXVxuICBwcmV2aW91c0RhdGFJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHtcbiAgfVxuXG4gIGdldCBzaG93QWRkQnV0dG9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5sYXlvdXROb2RlLmFycmF5SXRlbSB8fFxuICAgICAgdGhpcy5sYXlvdXRJbmRleFt0aGlzLmxheW91dEluZGV4Lmxlbmd0aCAtIDFdIDwgdGhpcy5vcHRpb25zLm1heEl0ZW1zXG4gIH1cblxuICBnZXQgYnV0dG9uVGV4dCgpOiBzdHJpbmcge1xuICAgIGNvbnN0IHBhcmVudDogYW55ID0ge1xuICAgICAgZGF0YUluZGV4OiB0aGlzLmRhdGFJbmRleC5zbGljZSgwLCAtMSksXG4gICAgICBsYXlvdXRJbmRleDogdGhpcy5sYXlvdXRJbmRleC5zbGljZSgwLCAtMSksXG4gICAgICBsYXlvdXROb2RlOiB0aGlzLmpzZi5nZXRQYXJlbnROb2RlKHRoaXMpXG4gICAgfVxuICAgIHJldHVybiBwYXJlbnQubGF5b3V0Tm9kZS5hZGQgfHxcbiAgICAgIHRoaXMuanNmLnNldEFycmF5SXRlbVRpdGxlKHBhcmVudCwgdGhpcy5sYXlvdXROb2RlLCB0aGlzLml0ZW1Db3VudClcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9XG4gIH1cblxuICBhZGRJdGVtKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIHRoaXMuanNmLmFkZEl0ZW0odGhpcylcbiAgfVxufVxuIl19