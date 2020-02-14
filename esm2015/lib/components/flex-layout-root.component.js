var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '@ngsf/widget-library';
let FlexLayoutRootComponent = class FlexLayoutRootComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.isFlexItem = false;
    }
    removeItem(item) {
        this.jsf.removeItem(item);
    }
    getFlexAttribute(node, attribute) {
        const index = ['flex-grow', 'flex-shrink', 'flex-basis'].indexOf(attribute);
        return ((node.options || {}).flex || '').split(/\s+/)[index] ||
            (node.options || {})[attribute] || ['1', '1', 'auto'][index];
    }
    showWidget(layoutNode) {
        return this.jsf.evaluateCondition(layoutNode, this.dataIndex);
    }
};
FlexLayoutRootComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
__decorate([
    Input(),
    __metadata("design:type", Array)
], FlexLayoutRootComponent.prototype, "dataIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], FlexLayoutRootComponent.prototype, "layoutIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], FlexLayoutRootComponent.prototype, "layout", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FlexLayoutRootComponent.prototype, "isFlexItem", void 0);
FlexLayoutRootComponent = __decorate([
    Component({
        selector: 'flex-layout-root-widget',
        template: `
      <div *ngFor="let layoutNode of layout; let i = index"
           [class.form-flex-item]="isFlexItem"
           [style.flex-grow]="getFlexAttribute(layoutNode, 'flex-grow')"
           [style.flex-shrink]="getFlexAttribute(layoutNode, 'flex-shrink')"
           [style.flex-basis]="getFlexAttribute(layoutNode, 'flex-basis')"
           [style.align-self]="(layoutNode?.options || {})['align-self']"
           [style.order]="layoutNode?.options?.order"
           [fxFlex]="layoutNode?.options?.fxFlex"
           [fxFlexOrder]="layoutNode?.options?.fxFlexOrder"
           [fxFlexOffset]="layoutNode?.options?.fxFlexOffset"
           [fxFlexAlign]="layoutNode?.options?.fxFlexAlign">
          <select-framework-widget *ngIf="showWidget(layoutNode)"
                                   [dataIndex]="layoutNode?.arrayItem ? (dataIndex || []).concat(i) : (dataIndex || [])"
                                   [layoutIndex]="(layoutIndex || []).concat(i)"
                                   [layoutNode]="layoutNode"></select-framework-widget>
          </div>`,
        changeDetection: ChangeDetectionStrategy.Default
    }),
    __metadata("design:paramtypes", [JsonSchemaFormService])
], FlexLayoutRootComponent);
export { FlexLayoutRootComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleC1sYXlvdXQtcm9vdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdzZi9tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZmxleC1sYXlvdXQtcm9vdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUE7QUFDdkUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7QUF1QjFELElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO0lBTWxDLFlBQ1UsR0FBMEI7UUFBMUIsUUFBRyxHQUFILEdBQUcsQ0FBdUI7UUFIM0IsZUFBVSxHQUFHLEtBQUssQ0FBQTtJQUszQixDQUFDO0lBRUQsVUFBVSxDQUFDLElBQUk7UUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMzQixDQUFDO0lBSUQsZ0JBQWdCLENBQUMsSUFBUyxFQUFFLFNBQWlCO1FBQzNDLE1BQU0sS0FBSyxHQUFHLENBQUMsV0FBVyxFQUFFLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDM0UsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUMxRCxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hFLENBQUM7SUFFRCxVQUFVLENBQUMsVUFBZTtRQUN4QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUMvRCxDQUFDO0NBQ0YsQ0FBQTs7WUFuQmdCLHFCQUFxQjs7QUFOM0I7SUFBUixLQUFLLEVBQUU7OzBEQUFvQjtBQUNuQjtJQUFSLEtBQUssRUFBRTs7NERBQXNCO0FBQ3JCO0lBQVIsS0FBSyxFQUFFOzt1REFBYztBQUNiO0lBQVIsS0FBSyxFQUFFOzsyREFBbUI7QUFKaEIsdUJBQXVCO0lBckJuQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUseUJBQXlCO1FBQ25DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztpQkFnQks7UUFDZixlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztLQUNqRCxDQUFDO3FDQVFlLHFCQUFxQjtHQVB6Qix1QkFBdUIsQ0EwQm5DO1NBMUJZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnQG5nc2Yvd2lkZ2V0LWxpYnJhcnknXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ZsZXgtbGF5b3V0LXJvb3Qtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGxheW91dE5vZGUgb2YgbGF5b3V0OyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgICAgW2NsYXNzLmZvcm0tZmxleC1pdGVtXT1cImlzRmxleEl0ZW1cIlxuICAgICAgICAgICBbc3R5bGUuZmxleC1ncm93XT1cImdldEZsZXhBdHRyaWJ1dGUobGF5b3V0Tm9kZSwgJ2ZsZXgtZ3JvdycpXCJcbiAgICAgICAgICAgW3N0eWxlLmZsZXgtc2hyaW5rXT1cImdldEZsZXhBdHRyaWJ1dGUobGF5b3V0Tm9kZSwgJ2ZsZXgtc2hyaW5rJylcIlxuICAgICAgICAgICBbc3R5bGUuZmxleC1iYXNpc109XCJnZXRGbGV4QXR0cmlidXRlKGxheW91dE5vZGUsICdmbGV4LWJhc2lzJylcIlxuICAgICAgICAgICBbc3R5bGUuYWxpZ24tc2VsZl09XCIobGF5b3V0Tm9kZT8ub3B0aW9ucyB8fCB7fSlbJ2FsaWduLXNlbGYnXVwiXG4gICAgICAgICAgIFtzdHlsZS5vcmRlcl09XCJsYXlvdXROb2RlPy5vcHRpb25zPy5vcmRlclwiXG4gICAgICAgICAgIFtmeEZsZXhdPVwibGF5b3V0Tm9kZT8ub3B0aW9ucz8uZnhGbGV4XCJcbiAgICAgICAgICAgW2Z4RmxleE9yZGVyXT1cImxheW91dE5vZGU/Lm9wdGlvbnM/LmZ4RmxleE9yZGVyXCJcbiAgICAgICAgICAgW2Z4RmxleE9mZnNldF09XCJsYXlvdXROb2RlPy5vcHRpb25zPy5meEZsZXhPZmZzZXRcIlxuICAgICAgICAgICBbZnhGbGV4QWxpZ25dPVwibGF5b3V0Tm9kZT8ub3B0aW9ucz8uZnhGbGV4QWxpZ25cIj5cbiAgICAgICAgICA8c2VsZWN0LWZyYW1ld29yay13aWRnZXQgKm5nSWY9XCJzaG93V2lkZ2V0KGxheW91dE5vZGUpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2RhdGFJbmRleF09XCJsYXlvdXROb2RlPy5hcnJheUl0ZW0gPyAoZGF0YUluZGV4IHx8IFtdKS5jb25jYXQoaSkgOiAoZGF0YUluZGV4IHx8IFtdKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsYXlvdXRJbmRleF09XCIobGF5b3V0SW5kZXggfHwgW10pLmNvbmNhdChpKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsYXlvdXROb2RlXT1cImxheW91dE5vZGVcIj48L3NlbGVjdC1mcmFtZXdvcmstd2lkZ2V0PlxuICAgICAgICAgIDwvZGl2PmAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbn0pXG5leHBvcnQgY2xhc3MgRmxleExheW91dFJvb3RDb21wb25lbnQge1xuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBsYXlvdXQ6IGFueVtdXG4gIEBJbnB1dCgpIGlzRmxleEl0ZW0gPSBmYWxzZVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICByZW1vdmVJdGVtKGl0ZW0pIHtcbiAgICB0aGlzLmpzZi5yZW1vdmVJdGVtKGl0ZW0pXG4gIH1cblxuICAvLyBTZXQgYXR0cmlidXRlcyBmb3IgZmxleGJveCBjaGlsZFxuICAvLyAoY29udGFpbmVyIGF0dHJpYnV0ZXMgYXJlIHNldCBpbiBmbGV4LWxheW91dC1zZWN0aW9uLmNvbXBvbmVudClcbiAgZ2V0RmxleEF0dHJpYnV0ZShub2RlOiBhbnksIGF0dHJpYnV0ZTogc3RyaW5nKSB7XG4gICAgY29uc3QgaW5kZXggPSBbJ2ZsZXgtZ3JvdycsICdmbGV4LXNocmluaycsICdmbGV4LWJhc2lzJ10uaW5kZXhPZihhdHRyaWJ1dGUpXG4gICAgcmV0dXJuICgobm9kZS5vcHRpb25zIHx8IHt9KS5mbGV4IHx8ICcnKS5zcGxpdCgvXFxzKy8pW2luZGV4XSB8fFxuICAgICAgKG5vZGUub3B0aW9ucyB8fCB7fSlbYXR0cmlidXRlXSB8fCBbJzEnLCAnMScsICdhdXRvJ11baW5kZXhdXG4gIH1cblxuICBzaG93V2lkZ2V0KGxheW91dE5vZGU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmpzZi5ldmFsdWF0ZUNvbmRpdGlvbihsYXlvdXROb2RlLCB0aGlzLmRhdGFJbmRleClcbiAgfVxufVxuIl19