import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
export class RootComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.isFlexItem = false;
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
}
RootComponent.decorators = [
    { type: Component, args: [{
                selector: 'root-widget',
                template: `
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
    </div>`,
                styles: [`
    [draggable=true] {
      transition: all 150ms cubic-bezier(.4, 0, .2, 1);
    }
    [draggable=true]:hover {
      cursor: move;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      position: relative; z-index: 10;
      margin-top: -1px;
      margin-left: -1px;
      margin-right: 1px;
      margin-bottom: 1px;
    }
    [draggable=true].drag-target-top {
      box-shadow: 0 -2px 0 #000;
      position: relative; z-index: 20;
    }
    [draggable=true].drag-target-bottom {
      box-shadow: 0 2px 0 #000;
      position: relative; z-index: 20;
    }
  `]
            }] }
];
RootComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
RootComponent.propDecorators = {
    dataIndex: [{ type: Input }],
    layoutIndex: [{ type: Input }],
    layout: [{ type: Input }],
    isOrderable: [{ type: Input }],
    isFlexItem: [{ type: Input }]
};
if (false) {
    RootComponent.prototype.options;
    RootComponent.prototype.dataIndex;
    RootComponent.prototype.layoutIndex;
    RootComponent.prototype.layout;
    RootComponent.prototype.isOrderable;
    RootComponent.prototype.isFlexItem;
    RootComponent.prototype.jsf;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdzZi93aWRnZXQtbGlicmFyeS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3Jvb3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFBO0FBQzlDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFBO0FBOEMxRSxNQUFNLE9BQU8sYUFBYTtJQVF4QixZQUNVLEdBQTBCO1FBQTFCLFFBQUcsR0FBSCxHQUFHLENBQXVCO1FBSDNCLGVBQVUsR0FBRyxLQUFLLENBQUE7SUFLM0IsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFTO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU07WUFDM0MsSUFBSSxDQUFDLGFBQWEsS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxLQUFLLENBQUE7SUFDL0QsQ0FBQztJQUlELGdCQUFnQixDQUFDLElBQVMsRUFBRSxTQUFpQjtjQUNyQyxLQUFLLEdBQUcsQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDM0UsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUMxRCxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hFLENBQUM7SUFFRCxVQUFVLENBQUMsVUFBZTtRQUN4QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUMvRCxDQUFDOzs7WUF4RUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQWtCRDt5QkFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJSO2FBQ0Y7OztZQTdDTyxxQkFBcUI7Ozt3QkFnRDFCLEtBQUs7MEJBQ0wsS0FBSztxQkFDTCxLQUFLOzBCQUNMLEtBQUs7eUJBQ0wsS0FBSzs7O0lBTE4sZ0NBQVk7SUFDWixrQ0FBNEI7SUFDNUIsb0NBQThCO0lBQzlCLCtCQUFzQjtJQUN0QixvQ0FBNkI7SUFDN0IsbUNBQTJCO0lBR3pCLDRCQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9qc29uLXNjaGVtYS1mb3JtLnNlcnZpY2UnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Jvb3Qtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCBsYXlvdXRJdGVtIG9mIGxheW91dDsgbGV0IGkgPSBpbmRleFwiXG4gICAgICBbY2xhc3MuZm9ybS1mbGV4LWl0ZW1dPVwiaXNGbGV4SXRlbVwiXG4gICAgICBbc3R5bGUuYWxpZ24tc2VsZl09XCIobGF5b3V0SXRlbS5vcHRpb25zIHx8IHt9KVsnYWxpZ24tc2VsZiddXCJcbiAgICAgIFtzdHlsZS5mbGV4LWJhc2lzXT1cImdldEZsZXhBdHRyaWJ1dGUobGF5b3V0SXRlbSwgJ2ZsZXgtYmFzaXMnKVwiXG4gICAgICBbc3R5bGUuZmxleC1ncm93XT1cImdldEZsZXhBdHRyaWJ1dGUobGF5b3V0SXRlbSwgJ2ZsZXgtZ3JvdycpXCJcbiAgICAgIFtzdHlsZS5mbGV4LXNocmlua109XCJnZXRGbGV4QXR0cmlidXRlKGxheW91dEl0ZW0sICdmbGV4LXNocmluaycpXCJcbiAgICAgIFtzdHlsZS5vcmRlcl09XCIobGF5b3V0SXRlbS5vcHRpb25zIHx8IHt9KS5vcmRlclwiPlxuICAgICAgPGRpdlxuICAgICAgICBbZGF0YUluZGV4XT1cImxheW91dEl0ZW0/LmFycmF5SXRlbSA/IChkYXRhSW5kZXggfHwgW10pLmNvbmNhdChpKSA6IChkYXRhSW5kZXggfHwgW10pXCJcbiAgICAgICAgW2xheW91dEluZGV4XT1cIihsYXlvdXRJbmRleCB8fCBbXSkuY29uY2F0KGkpXCJcbiAgICAgICAgW2xheW91dE5vZGVdPVwibGF5b3V0SXRlbVwiXG4gICAgICAgIFtvcmRlcmFibGVdPVwiaXNEcmFnZ2FibGUobGF5b3V0SXRlbSlcIj5cbiAgICAgICAgPHNlbGVjdC1mcmFtZXdvcmstd2lkZ2V0ICpuZ0lmPVwic2hvd1dpZGdldChsYXlvdXRJdGVtKVwiXG4gICAgICAgICAgW2RhdGFJbmRleF09XCJsYXlvdXRJdGVtPy5hcnJheUl0ZW0gPyAoZGF0YUluZGV4IHx8IFtdKS5jb25jYXQoaSkgOiAoZGF0YUluZGV4IHx8IFtdKVwiXG4gICAgICAgICAgW2xheW91dEluZGV4XT1cIihsYXlvdXRJbmRleCB8fCBbXSkuY29uY2F0KGkpXCJcbiAgICAgICAgICBbbGF5b3V0Tm9kZV09XCJsYXlvdXRJdGVtXCI+PC9zZWxlY3QtZnJhbWV3b3JrLXdpZGdldD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PmAsXG4gIHN0eWxlczogW2BcbiAgICBbZHJhZ2dhYmxlPXRydWVdIHtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAxNTBtcyBjdWJpYy1iZXppZXIoLjQsIDAsIC4yLCAxKTtcbiAgICB9XG4gICAgW2RyYWdnYWJsZT10cnVlXTpob3ZlciB7XG4gICAgICBjdXJzb3I6IG1vdmU7XG4gICAgICBib3gtc2hhZG93OiAycHggMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMik7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7IHotaW5kZXg6IDEwO1xuICAgICAgbWFyZ2luLXRvcDogLTFweDtcbiAgICAgIG1hcmdpbi1sZWZ0OiAtMXB4O1xuICAgICAgbWFyZ2luLXJpZ2h0OiAxcHg7XG4gICAgICBtYXJnaW4tYm90dG9tOiAxcHg7XG4gICAgfVxuICAgIFtkcmFnZ2FibGU9dHJ1ZV0uZHJhZy10YXJnZXQtdG9wIHtcbiAgICAgIGJveC1zaGFkb3c6IDAgLTJweCAwICMwMDA7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7IHotaW5kZXg6IDIwO1xuICAgIH1cbiAgICBbZHJhZ2dhYmxlPXRydWVdLmRyYWctdGFyZ2V0LWJvdHRvbSB7XG4gICAgICBib3gtc2hhZG93OiAwIDJweCAwICMwMDA7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7IHotaW5kZXg6IDIwO1xuICAgIH1cbiAgYF0sXG59KVxuZXhwb3J0IGNsYXNzIFJvb3RDb21wb25lbnQge1xuICBvcHRpb25zOiBhbnlcbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgbGF5b3V0OiBhbnlbXVxuICBASW5wdXQoKSBpc09yZGVyYWJsZTogYm9vbGVhblxuICBASW5wdXQoKSBpc0ZsZXhJdGVtID0gZmFsc2VcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgaXNEcmFnZ2FibGUobm9kZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG5vZGUuYXJyYXlJdGVtICYmIG5vZGUudHlwZSAhPT0gJyRyZWYnICYmXG4gICAgICBub2RlLmFycmF5SXRlbVR5cGUgPT09ICdsaXN0JyAmJiB0aGlzLmlzT3JkZXJhYmxlICE9PSBmYWxzZVxuICB9XG5cbiAgLy8gU2V0IGF0dHJpYnV0ZXMgZm9yIGZsZXhib3ggY2hpbGRcbiAgLy8gKGNvbnRhaW5lciBhdHRyaWJ1dGVzIGFyZSBzZXQgaW4gc2VjdGlvbi5jb21wb25lbnQpXG4gIGdldEZsZXhBdHRyaWJ1dGUobm9kZTogYW55LCBhdHRyaWJ1dGU6IHN0cmluZykge1xuICAgIGNvbnN0IGluZGV4ID0gWydmbGV4LWdyb3cnLCAnZmxleC1zaHJpbmsnLCAnZmxleC1iYXNpcyddLmluZGV4T2YoYXR0cmlidXRlKVxuICAgIHJldHVybiAoKG5vZGUub3B0aW9ucyB8fCB7fSkuZmxleCB8fCAnJykuc3BsaXQoL1xccysvKVtpbmRleF0gfHxcbiAgICAgIChub2RlLm9wdGlvbnMgfHwge30pW2F0dHJpYnV0ZV0gfHwgWycxJywgJzEnLCAnYXV0byddW2luZGV4XVxuICB9XG5cbiAgc2hvd1dpZGdldChsYXlvdXROb2RlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5qc2YuZXZhbHVhdGVDb25kaXRpb24obGF5b3V0Tm9kZSwgdGhpcy5kYXRhSW5kZXgpXG4gIH1cbn1cbiJdfQ==