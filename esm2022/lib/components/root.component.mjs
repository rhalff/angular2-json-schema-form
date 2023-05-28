import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/json-schema-form.service";
import * as i2 from "@angular/common";
import * as i3 from "./select-framework.component";
import * as i4 from "../directives/orderable.directive";
const _c0 = function () { return []; };
function RootComponent_div_0_select_framework_widget_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "select-framework-widget", 3);
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    const layoutItem_r1 = ctx_r4.$implicit;
    const i_r2 = ctx_r4.index;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("dataIndex", (layoutItem_r1 == null ? null : layoutItem_r1.arrayItem) ? (ctx_r3.dataIndex || i0.ɵɵpureFunction0(3, _c0)).concat(i_r2) : ctx_r3.dataIndex || i0.ɵɵpureFunction0(4, _c0))("layoutIndex", (ctx_r3.layoutIndex || i0.ɵɵpureFunction0(5, _c0)).concat(i_r2))("layoutNode", layoutItem_r1);
} }
const _c1 = function () { return {}; };
function RootComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 1);
    i0.ɵɵtemplate(2, RootComponent_div_0_select_framework_widget_2_Template, 1, 6, "select-framework-widget", 2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const layoutItem_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("align-self", (layoutItem_r1.options || i0.ɵɵpureFunction0(17, _c1))["align-self"])("flex-basis", ctx_r0.getFlexAttribute(layoutItem_r1, "flex-basis"))("flex-grow", ctx_r0.getFlexAttribute(layoutItem_r1, "flex-grow"))("flex-shrink", ctx_r0.getFlexAttribute(layoutItem_r1, "flex-shrink"))("order", (layoutItem_r1.options || i0.ɵɵpureFunction0(18, _c1)).order);
    i0.ɵɵclassProp("form-flex-item", ctx_r0.isFlexItem);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("dataIndex", (layoutItem_r1 == null ? null : layoutItem_r1.arrayItem) ? (ctx_r0.dataIndex || i0.ɵɵpureFunction0(19, _c0)).concat(i_r2) : ctx_r0.dataIndex || i0.ɵɵpureFunction0(20, _c0))("layoutIndex", (ctx_r0.layoutIndex || i0.ɵɵpureFunction0(21, _c0)).concat(i_r2))("layoutNode", layoutItem_r1)("orderable", ctx_r0.isDraggable(layoutItem_r1));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.showWidget(layoutItem_r1));
} }
class RootComponent {
    jsf;
    options;
    dataIndex;
    layoutIndex;
    layout;
    isOrderable;
    isFlexItem = false;
    constructor(jsf) {
        this.jsf = jsf;
    }
    isDraggable(node) {
        return node.arrayItem && node.type !== '$ref' &&
            node.arrayItemType === 'list' && this.isOrderable !== false;
    }
    getFlexAttribute(node, attribute) {
        const index = ['flex-grow', 'flex-shrink', 'flex-basis'].indexOf(attribute);
        return ((node.options || {}).flex || '').split(/\s+/)[index] ||
            (node.options || {})[attribute] || ['1', '1', 'auto'][index];
    }
    showWidget(layoutNode) {
        return this.jsf.evaluateCondition(layoutNode, this.dataIndex);
    }
    static ɵfac = function RootComponent_Factory(t) { return new (t || RootComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
    static ɵcmp = i0.ɵɵdefineComponent({ type: RootComponent, selectors: [["root-widget"]], inputs: { dataIndex: "dataIndex", layoutIndex: "layoutIndex", layout: "layout", isOrderable: "isOrderable", isFlexItem: "isFlexItem" }, decls: 1, vars: 1, consts: [[3, "form-flex-item", "align-self", "flex-basis", "flex-grow", "flex-shrink", "order", 4, "ngFor", "ngForOf"], [3, "dataIndex", "layoutIndex", "layoutNode", "orderable"], [3, "dataIndex", "layoutIndex", "layoutNode", 4, "ngIf"], [3, "dataIndex", "layoutIndex", "layoutNode"]], template: function RootComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, RootComponent_div_0_Template, 3, 22, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngForOf", ctx.layout);
        } }, dependencies: [i2.NgForOf, i2.NgIf, i3.SelectFrameworkComponent, i4.OrderableDirective], styles: ["[draggable=true][_ngcontent-%COMP%]{transition:all .15s cubic-bezier(.4,0,.2,1)}[draggable=true][_ngcontent-%COMP%]:hover{cursor:move;box-shadow:2px 2px 4px #0003;position:relative;z-index:10;margin:-1px 1px 1px -1px}[draggable=true].drag-target-top[_ngcontent-%COMP%]{box-shadow:0 -2px #000;position:relative;z-index:20}[draggable=true].drag-target-bottom[_ngcontent-%COMP%]{box-shadow:0 2px #000;position:relative;z-index:20}"] });
}
export { RootComponent };
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RootComponent, [{
        type: Component,
        args: [{ selector: 'root-widget', template: `
    <div *ngFor="let layoutItem of layout; let i = index"
      [class.form-flex-item]="isFlexItem"
      [style.align-self]="(layoutItem.options || {})['align-self']"
      [style.flex-basis]="getFlexAttribute(layoutItem, 'flex-basis')"
      [style.flex-grow]="getFlexAttribute(layoutItem, 'flex-grow')"
      [style.flex-shrink]="getFlexAttribute(layoutItem, 'flex-shrink')"
      [style.order]="(layoutItem.options || {}).order">
      <div
        [dataIndex]="layoutItem?.arrayItem ? (dataIndex || []).concat(i) : (dataIndex || [])"
        [layoutIndex]="(layoutIndex || []).concat(i)"
        [layoutNode]="layoutItem"
        [orderable]="isDraggable(layoutItem)">
        <select-framework-widget *ngIf="showWidget(layoutItem)"
          [dataIndex]="layoutItem?.arrayItem ? (dataIndex || []).concat(i) : (dataIndex || [])"
          [layoutIndex]="(layoutIndex || []).concat(i)"
          [layoutNode]="layoutItem"></select-framework-widget>
      </div>
    </div>`, styles: ["[draggable=true]{transition:all .15s cubic-bezier(.4,0,.2,1)}[draggable=true]:hover{cursor:move;box-shadow:2px 2px 4px #0003;position:relative;z-index:10;margin:-1px 1px 1px -1px}[draggable=true].drag-target-top{box-shadow:0 -2px #000;position:relative;z-index:20}[draggable=true].drag-target-bottom{box-shadow:0 2px #000;position:relative;z-index:20}\n"] }]
    }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { dataIndex: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], layout: [{
            type: Input
        }], isOrderable: [{
            type: Input
        }], isFlexItem: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLXdpZGdldC1saWJyYXJ5L3NyYy9saWIvY29tcG9uZW50cy9yb290LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUM5QyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQTs7Ozs7Ozs7SUFpQmxFLDZDQUdzRDs7Ozs7O0lBRnBELHFNQUFxRixnRkFBQSw2QkFBQTs7OztJQWIzRiwyQkFNbUQsYUFBQTtJQU0vQyw0R0FHc0Q7SUFDeEQsaUJBQU0sRUFBQTs7Ozs7SUFkTixrR0FBNkQsb0VBQUEsa0VBQUEsc0VBQUEsdUVBQUE7SUFEN0QsbURBQW1DO0lBT2pDLGVBQXFGO0lBQXJGLHVNQUFxRixpRkFBQSw2QkFBQSxnREFBQTtJQUkzRCxlQUE0QjtJQUE1Qix1REFBNEI7O0FBZjlELE1BNENhLGFBQWE7SUFTZDtJQVJWLE9BQU8sQ0FBSztJQUNILFNBQVMsQ0FBVTtJQUNuQixXQUFXLENBQVU7SUFDckIsTUFBTSxDQUFPO0lBQ2IsV0FBVyxDQUFTO0lBQ3BCLFVBQVUsR0FBRyxLQUFLLENBQUE7SUFFM0IsWUFDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtJQUVwQyxDQUFDO0lBRUQsV0FBVyxDQUFDLElBQVM7UUFDbkIsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTTtZQUMzQyxJQUFJLENBQUMsYUFBYSxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLEtBQUssQ0FBQTtJQUMvRCxDQUFDO0lBSUQsZ0JBQWdCLENBQUMsSUFBUyxFQUFFLFNBQWlCO1FBQzNDLE1BQU0sS0FBSyxHQUFHLENBQUMsV0FBVyxFQUFFLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDM0UsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUMxRCxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hFLENBQUM7SUFFRCxVQUFVLENBQUMsVUFBZTtRQUN4QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUMvRCxDQUFDO3VFQTVCVSxhQUFhOytDQUFiLGFBQWE7WUF6Q3RCLCtEQWlCTTs7WUFqQnNCLG9DQUFXOzs7U0F5QzlCLGFBQWE7dUZBQWIsYUFBYTtjQTVDekIsU0FBUzsyQkFDRSxhQUFhLFlBQ2I7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQWtCRDt3RUEwQkEsU0FBUztrQkFBakIsS0FBSztZQUNHLFdBQVc7a0JBQW5CLEtBQUs7WUFDRyxNQUFNO2tCQUFkLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csVUFBVTtrQkFBbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9qc29uLXNjaGVtYS1mb3JtLnNlcnZpY2UnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Jvb3Qtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCBsYXlvdXRJdGVtIG9mIGxheW91dDsgbGV0IGkgPSBpbmRleFwiXG4gICAgICBbY2xhc3MuZm9ybS1mbGV4LWl0ZW1dPVwiaXNGbGV4SXRlbVwiXG4gICAgICBbc3R5bGUuYWxpZ24tc2VsZl09XCIobGF5b3V0SXRlbS5vcHRpb25zIHx8IHt9KVsnYWxpZ24tc2VsZiddXCJcbiAgICAgIFtzdHlsZS5mbGV4LWJhc2lzXT1cImdldEZsZXhBdHRyaWJ1dGUobGF5b3V0SXRlbSwgJ2ZsZXgtYmFzaXMnKVwiXG4gICAgICBbc3R5bGUuZmxleC1ncm93XT1cImdldEZsZXhBdHRyaWJ1dGUobGF5b3V0SXRlbSwgJ2ZsZXgtZ3JvdycpXCJcbiAgICAgIFtzdHlsZS5mbGV4LXNocmlua109XCJnZXRGbGV4QXR0cmlidXRlKGxheW91dEl0ZW0sICdmbGV4LXNocmluaycpXCJcbiAgICAgIFtzdHlsZS5vcmRlcl09XCIobGF5b3V0SXRlbS5vcHRpb25zIHx8IHt9KS5vcmRlclwiPlxuICAgICAgPGRpdlxuICAgICAgICBbZGF0YUluZGV4XT1cImxheW91dEl0ZW0/LmFycmF5SXRlbSA/IChkYXRhSW5kZXggfHwgW10pLmNvbmNhdChpKSA6IChkYXRhSW5kZXggfHwgW10pXCJcbiAgICAgICAgW2xheW91dEluZGV4XT1cIihsYXlvdXRJbmRleCB8fCBbXSkuY29uY2F0KGkpXCJcbiAgICAgICAgW2xheW91dE5vZGVdPVwibGF5b3V0SXRlbVwiXG4gICAgICAgIFtvcmRlcmFibGVdPVwiaXNEcmFnZ2FibGUobGF5b3V0SXRlbSlcIj5cbiAgICAgICAgPHNlbGVjdC1mcmFtZXdvcmstd2lkZ2V0ICpuZ0lmPVwic2hvd1dpZGdldChsYXlvdXRJdGVtKVwiXG4gICAgICAgICAgW2RhdGFJbmRleF09XCJsYXlvdXRJdGVtPy5hcnJheUl0ZW0gPyAoZGF0YUluZGV4IHx8IFtdKS5jb25jYXQoaSkgOiAoZGF0YUluZGV4IHx8IFtdKVwiXG4gICAgICAgICAgW2xheW91dEluZGV4XT1cIihsYXlvdXRJbmRleCB8fCBbXSkuY29uY2F0KGkpXCJcbiAgICAgICAgICBbbGF5b3V0Tm9kZV09XCJsYXlvdXRJdGVtXCI+PC9zZWxlY3QtZnJhbWV3b3JrLXdpZGdldD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PmAsXG4gIHN0eWxlczogW2BcbiAgICBbZHJhZ2dhYmxlPXRydWVdIHtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAxNTBtcyBjdWJpYy1iZXppZXIoLjQsIDAsIC4yLCAxKTtcbiAgICB9XG4gICAgW2RyYWdnYWJsZT10cnVlXTpob3ZlciB7XG4gICAgICBjdXJzb3I6IG1vdmU7XG4gICAgICBib3gtc2hhZG93OiAycHggMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMik7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7IHotaW5kZXg6IDEwO1xuICAgICAgbWFyZ2luLXRvcDogLTFweDtcbiAgICAgIG1hcmdpbi1sZWZ0OiAtMXB4O1xuICAgICAgbWFyZ2luLXJpZ2h0OiAxcHg7XG4gICAgICBtYXJnaW4tYm90dG9tOiAxcHg7XG4gICAgfVxuICAgIFtkcmFnZ2FibGU9dHJ1ZV0uZHJhZy10YXJnZXQtdG9wIHtcbiAgICAgIGJveC1zaGFkb3c6IDAgLTJweCAwICMwMDA7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7IHotaW5kZXg6IDIwO1xuICAgIH1cbiAgICBbZHJhZ2dhYmxlPXRydWVdLmRyYWctdGFyZ2V0LWJvdHRvbSB7XG4gICAgICBib3gtc2hhZG93OiAwIDJweCAwICMwMDA7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7IHotaW5kZXg6IDIwO1xuICAgIH1cbiAgYF0sXG59KVxuZXhwb3J0IGNsYXNzIFJvb3RDb21wb25lbnQge1xuICBvcHRpb25zOiBhbnlcbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgbGF5b3V0OiBhbnlbXVxuICBASW5wdXQoKSBpc09yZGVyYWJsZTogYm9vbGVhblxuICBASW5wdXQoKSBpc0ZsZXhJdGVtID0gZmFsc2VcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgaXNEcmFnZ2FibGUobm9kZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG5vZGUuYXJyYXlJdGVtICYmIG5vZGUudHlwZSAhPT0gJyRyZWYnICYmXG4gICAgICBub2RlLmFycmF5SXRlbVR5cGUgPT09ICdsaXN0JyAmJiB0aGlzLmlzT3JkZXJhYmxlICE9PSBmYWxzZVxuICB9XG5cbiAgLy8gU2V0IGF0dHJpYnV0ZXMgZm9yIGZsZXhib3ggY2hpbGRcbiAgLy8gKGNvbnRhaW5lciBhdHRyaWJ1dGVzIGFyZSBzZXQgaW4gc2VjdGlvbi5jb21wb25lbnQpXG4gIGdldEZsZXhBdHRyaWJ1dGUobm9kZTogYW55LCBhdHRyaWJ1dGU6IHN0cmluZykge1xuICAgIGNvbnN0IGluZGV4ID0gWydmbGV4LWdyb3cnLCAnZmxleC1zaHJpbmsnLCAnZmxleC1iYXNpcyddLmluZGV4T2YoYXR0cmlidXRlKVxuICAgIHJldHVybiAoKG5vZGUub3B0aW9ucyB8fCB7fSkuZmxleCB8fCAnJykuc3BsaXQoL1xccysvKVtpbmRleF0gfHxcbiAgICAgIChub2RlLm9wdGlvbnMgfHwge30pW2F0dHJpYnV0ZV0gfHwgWycxJywgJzEnLCAnYXV0byddW2luZGV4XVxuICB9XG5cbiAgc2hvd1dpZGdldChsYXlvdXROb2RlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5qc2YuZXZhbHVhdGVDb25kaXRpb24obGF5b3V0Tm9kZSwgdGhpcy5kYXRhSW5kZXgpXG4gIH1cbn1cbiJdfQ==