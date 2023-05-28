import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '@ngsf/widget-library';
import * as i0 from "@angular/core";
import * as i1 from "@ngsf/widget-library";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/button";
function MaterialAddReferenceComponent_button_1_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span");
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap(ctx_r1.options == null ? null : ctx_r1.options.icon);
} }
function MaterialAddReferenceComponent_button_1_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 5);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("innerHTML", ctx_r2.buttonText, i0.ɵɵsanitizeHtml);
} }
function MaterialAddReferenceComponent_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 2);
    i0.ɵɵlistener("click", function MaterialAddReferenceComponent_button_1_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.addItem($event)); });
    i0.ɵɵtemplate(1, MaterialAddReferenceComponent_button_1_span_1_Template, 1, 2, "span", 3);
    i0.ɵɵtemplate(2, MaterialAddReferenceComponent_button_1_span_2_Template, 1, 1, "span", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("color", (ctx_r0.options == null ? null : ctx_r0.options.color) || "accent")("disabled", ctx_r0.options == null ? null : ctx_r0.options.readonly);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.options == null ? null : ctx_r0.options.icon);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.options == null ? null : ctx_r0.options.title);
} }
class MaterialAddReferenceComponent {
    jsf;
    options;
    itemCount;
    previousLayoutIndex;
    previousDataIndex;
    layoutNode;
    layoutIndex;
    dataIndex;
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
            layoutNode: this.jsf.getParentNode(this),
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
    static ɵfac = function MaterialAddReferenceComponent_Factory(t) { return new (t || MaterialAddReferenceComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
    static ɵcmp = i0.ɵɵdefineComponent({ type: MaterialAddReferenceComponent, selectors: [["material-add-reference-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 2, vars: 3, consts: [["align", "end"], ["mat-raised-button", "", 3, "color", "disabled", "click", 4, "ngIf"], ["mat-raised-button", "", 3, "color", "disabled", "click"], [3, "class", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], [3, "innerHTML"]], template: function MaterialAddReferenceComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0);
            i0.ɵɵtemplate(1, MaterialAddReferenceComponent_button_1_Template, 3, 4, "button", 1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.htmlClass) || "");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.showAddButton);
        } }, dependencies: [i2.NgIf, i3.MatButton], encapsulation: 2 });
}
export { MaterialAddReferenceComponent };
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialAddReferenceComponent, [{
        type: Component,
        args: [{
                selector: 'material-add-reference-widget',
                template: `
      <section [class]="options?.htmlClass || ''" align="end">
          <button mat-raised-button *ngIf="showAddButton"
                  [color]="options?.color || 'accent'"
                  [disabled]="options?.readonly"
                  (click)="addItem($event)">
              <span *ngIf="options?.icon" [class]="options?.icon"></span>
              <span *ngIf="options?.title" [innerHTML]="buttonText"></span>
          </button>
      </section>`,
                changeDetection: ChangeDetectionStrategy.Default,
            }]
    }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtYWRkLXJlZmVyZW5jZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLW1hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsvc3JjL2xpYi9jb21wb25lbnRzL21hdGVyaWFsLWFkZC1yZWZlcmVuY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFBO0FBQy9FLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNCQUFzQixDQUFBOzs7Ozs7SUFVNUMsdUJBQTJEOzs7SUFBL0Isa0VBQXVCOzs7SUFDbkQsMEJBQTZEOzs7SUFBaEMsZ0VBQXdCOzs7O0lBTHpELGlDQUdrQztJQUExQixtTEFBUyxlQUFBLHNCQUFlLENBQUEsSUFBQztJQUM3Qix5RkFBMkQ7SUFDM0QseUZBQTZEO0lBQ2pFLGlCQUFTOzs7SUFMRCwwRkFBb0MscUVBQUE7SUFHakMsZUFBbUI7SUFBbkIsMEVBQW1CO0lBQ25CLGVBQW9CO0lBQXBCLDJFQUFvQjs7QUFUekMsTUFjYSw2QkFBNkI7SUFVOUI7SUFUVixPQUFPLENBQUs7SUFDWixTQUFTLENBQVE7SUFDakIsbUJBQW1CLENBQVU7SUFDN0IsaUJBQWlCLENBQVU7SUFDbEIsVUFBVSxDQUFLO0lBQ2YsV0FBVyxDQUFVO0lBQ3JCLFNBQVMsQ0FBVTtJQUU1QixZQUNVLEdBQTBCO1FBQTFCLFFBQUcsR0FBSCxHQUFHLENBQXVCO0lBRXBDLENBQUM7SUFFRCxJQUFJLGFBQWE7UUFDZixPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTO1lBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUE7SUFDekUsQ0FBQztJQUVELElBQUksVUFBVTtRQUNaLE1BQU0sTUFBTSxHQUFRO1lBQ2xCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMxQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1NBQ3pDLENBQUE7UUFDRCxPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRztZQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUN2RSxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFBO0lBQzlDLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBSztRQUNYLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQTtRQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN4QixDQUFDO3VGQXBDVSw2QkFBNkI7K0NBQTdCLDZCQUE2QjtZQVhwQyxrQ0FBd0Q7WUFDcEQsb0ZBTVM7WUFDYixpQkFBVTs7WUFSRCx5RUFBa0M7WUFDWixlQUFtQjtZQUFuQix3Q0FBbUI7OztTQVUzQyw2QkFBNkI7dUZBQTdCLDZCQUE2QjtjQWR6QyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLCtCQUErQjtnQkFDekMsUUFBUSxFQUFFOzs7Ozs7Ozs7aUJBU0s7Z0JBQ2YsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87YUFDakQ7d0VBTVUsVUFBVTtrQkFBbEIsS0FBSztZQUNHLFdBQVc7a0JBQW5CLEtBQUs7WUFDRyxTQUFTO2tCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJ0BuZ3NmL3dpZGdldC1saWJyYXJ5J1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXRlcmlhbC1hZGQtcmVmZXJlbmNlLXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8c2VjdGlvbiBbY2xhc3NdPVwib3B0aW9ucz8uaHRtbENsYXNzIHx8ICcnXCIgYWxpZ249XCJlbmRcIj5cbiAgICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uICpuZ0lmPVwic2hvd0FkZEJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBbY29sb3JdPVwib3B0aW9ucz8uY29sb3IgfHwgJ2FjY2VudCdcIlxuICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIm9wdGlvbnM/LnJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJhZGRJdGVtKCRldmVudClcIj5cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJvcHRpb25zPy5pY29uXCIgW2NsYXNzXT1cIm9wdGlvbnM/Lmljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwib3B0aW9ucz8udGl0bGVcIiBbaW5uZXJIVE1MXT1cImJ1dHRvblRleHRcIj48L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICA8L3NlY3Rpb24+YCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbEFkZFJlZmVyZW5jZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIG9wdGlvbnM6IGFueVxuICBpdGVtQ291bnQ6IG51bWJlclxuICBwcmV2aW91c0xheW91dEluZGV4OiBudW1iZXJbXVxuICBwcmV2aW91c0RhdGFJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHtcbiAgfVxuXG4gIGdldCBzaG93QWRkQnV0dG9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5sYXlvdXROb2RlLmFycmF5SXRlbSB8fFxuICAgICAgdGhpcy5sYXlvdXRJbmRleFt0aGlzLmxheW91dEluZGV4Lmxlbmd0aCAtIDFdIDwgdGhpcy5vcHRpb25zLm1heEl0ZW1zXG4gIH1cblxuICBnZXQgYnV0dG9uVGV4dCgpOiBzdHJpbmcge1xuICAgIGNvbnN0IHBhcmVudDogYW55ID0ge1xuICAgICAgZGF0YUluZGV4OiB0aGlzLmRhdGFJbmRleC5zbGljZSgwLCAtMSksXG4gICAgICBsYXlvdXRJbmRleDogdGhpcy5sYXlvdXRJbmRleC5zbGljZSgwLCAtMSksXG4gICAgICBsYXlvdXROb2RlOiB0aGlzLmpzZi5nZXRQYXJlbnROb2RlKHRoaXMpLFxuICAgIH1cbiAgICByZXR1cm4gcGFyZW50LmxheW91dE5vZGUuYWRkIHx8XG4gICAgICB0aGlzLmpzZi5zZXRBcnJheUl0ZW1UaXRsZShwYXJlbnQsIHRoaXMubGF5b3V0Tm9kZSwgdGhpcy5pdGVtQ291bnQpXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmxheW91dE5vZGUub3B0aW9ucyB8fCB7fVxuICB9XG5cbiAgYWRkSXRlbShldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB0aGlzLmpzZi5hZGRJdGVtKHRoaXMpXG4gIH1cbn1cbiJdfQ==