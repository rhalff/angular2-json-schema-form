import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '@ngsf/widget-library';
import * as i0 from "@angular/core";
import * as i1 from "@ngsf/widget-library";
import * as i2 from "@angular/common";
import * as i3 from "@angular/flex-layout/flex";
const _c0 = function () { return []; };
function FlexLayoutRootComponent_div_0_select_framework_widget_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "select-framework-widget", 3);
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    const layoutNode_r1 = ctx_r4.$implicit;
    const i_r2 = ctx_r4.index;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("dataIndex", (layoutNode_r1 == null ? null : layoutNode_r1.arrayItem) ? (ctx_r3.dataIndex || i0.ɵɵpureFunction0(3, _c0)).concat(i_r2) : ctx_r3.dataIndex || i0.ɵɵpureFunction0(4, _c0))("layoutIndex", (ctx_r3.layoutIndex || i0.ɵɵpureFunction0(5, _c0)).concat(i_r2))("layoutNode", layoutNode_r1);
} }
const _c1 = function () { return {}; };
function FlexLayoutRootComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtemplate(1, FlexLayoutRootComponent_div_0_select_framework_widget_1_Template, 1, 6, "select-framework-widget", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const layoutNode_r1 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("flex-grow", ctx_r0.getFlexAttribute(layoutNode_r1, "flex-grow"))("flex-shrink", ctx_r0.getFlexAttribute(layoutNode_r1, "flex-shrink"))("flex-basis", ctx_r0.getFlexAttribute(layoutNode_r1, "flex-basis"))("align-self", ((layoutNode_r1 == null ? null : layoutNode_r1.options) || i0.ɵɵpureFunction0(17, _c1))["align-self"])("order", layoutNode_r1 == null ? null : layoutNode_r1.options == null ? null : layoutNode_r1.options.order);
    i0.ɵɵclassProp("form-flex-item", ctx_r0.isFlexItem);
    i0.ɵɵproperty("fxFlex", layoutNode_r1 == null ? null : layoutNode_r1.options == null ? null : layoutNode_r1.options.fxFlex)("fxFlexOrder", layoutNode_r1 == null ? null : layoutNode_r1.options == null ? null : layoutNode_r1.options.fxFlexOrder)("fxFlexOffset", layoutNode_r1 == null ? null : layoutNode_r1.options == null ? null : layoutNode_r1.options.fxFlexOffset)("fxFlexAlign", layoutNode_r1 == null ? null : layoutNode_r1.options == null ? null : layoutNode_r1.options.fxFlexAlign);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.showWidget(layoutNode_r1));
} }
export class FlexLayoutRootComponent {
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
}
FlexLayoutRootComponent.ɵfac = function FlexLayoutRootComponent_Factory(t) { return new (t || FlexLayoutRootComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
FlexLayoutRootComponent.ɵcmp = i0.ɵɵdefineComponent({ type: FlexLayoutRootComponent, selectors: [["flex-layout-root-widget"]], inputs: { dataIndex: "dataIndex", layoutIndex: "layoutIndex", layout: "layout", isFlexItem: "isFlexItem" }, decls: 1, vars: 1, consts: [[3, "form-flex-item", "flex-grow", "flex-shrink", "flex-basis", "align-self", "order", "fxFlex", "fxFlexOrder", "fxFlexOffset", "fxFlexAlign", 4, "ngFor", "ngForOf"], [3, "fxFlex", "fxFlexOrder", "fxFlexOffset", "fxFlexAlign"], [3, "dataIndex", "layoutIndex", "layoutNode", 4, "ngIf"], [3, "dataIndex", "layoutIndex", "layoutNode"]], template: function FlexLayoutRootComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, FlexLayoutRootComponent_div_0_Template, 2, 18, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngForOf", ctx.layout);
    } }, dependencies: [i2.NgForOf, i2.NgIf, i3.DefaultFlexOrderDirective, i3.DefaultFlexOffsetDirective, i3.DefaultFlexAlignDirective, i3.DefaultFlexDirective, i1.SelectFrameworkComponent], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FlexLayoutRootComponent, [{
        type: Component,
        args: [{
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
                changeDetection: ChangeDetectionStrategy.Default,
            }]
    }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { dataIndex: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], layout: [{
            type: Input
        }], isFlexItem: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleC1sYXlvdXQtcm9vdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLW1hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsvc3JjL2xpYi9jb21wb25lbnRzL2ZsZXgtbGF5b3V0LXJvb3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFBO0FBQ3ZFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNCQUFzQixDQUFBOzs7Ozs7O0lBZ0JoRCw2Q0FHNkU7Ozs7OztJQUZwRCxxTUFBcUYsZ0ZBQUEsNkJBQUE7Ozs7SUFabEgsOEJBVXNEO0lBQ2xELHNIQUc2RTtJQUM3RSxpQkFBTTs7OztJQWJMLGdGQUE2RCxzRUFBQSxvRUFBQSxxSEFBQSw0R0FBQTtJQUQ3RCxtREFBbUM7SUFNbkMsMkhBQXNDLHdIQUFBLDBIQUFBLHdIQUFBO0lBSWIsZUFBNEI7SUFBNUIsdURBQTRCOztBQU9oRSxNQUFNLE9BQU8sdUJBQXVCO0lBTWxDLFlBQ1UsR0FBMEI7UUFBMUIsUUFBRyxHQUFILEdBQUcsQ0FBdUI7UUFIM0IsZUFBVSxHQUFHLEtBQUssQ0FBQTtJQUszQixDQUFDO0lBRUQsVUFBVSxDQUFDLElBQUk7UUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMzQixDQUFDO0lBSUQsZ0JBQWdCLENBQUMsSUFBUyxFQUFFLFNBQWlCO1FBQzNDLE1BQU0sS0FBSyxHQUFHLENBQUMsV0FBVyxFQUFFLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDM0UsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUMxRCxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hFLENBQUM7SUFFRCxVQUFVLENBQUMsVUFBZTtRQUN4QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUMvRCxDQUFDOzs4RkF6QlUsdUJBQXVCOzREQUF2Qix1QkFBdUI7UUFsQjlCLHlFQWVVOztRQWZrQixvQ0FBVzs7dUZBa0JoQyx1QkFBdUI7Y0FyQm5DLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7aUJBZ0JLO2dCQUNmLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO2FBQ2pEO3dFQUVVLFNBQVM7a0JBQWpCLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csTUFBTTtrQkFBZCxLQUFLO1lBQ0csVUFBVTtrQkFBbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnQG5nc2Yvd2lkZ2V0LWxpYnJhcnknXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ZsZXgtbGF5b3V0LXJvb3Qtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGxheW91dE5vZGUgb2YgbGF5b3V0OyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgICAgW2NsYXNzLmZvcm0tZmxleC1pdGVtXT1cImlzRmxleEl0ZW1cIlxuICAgICAgICAgICBbc3R5bGUuZmxleC1ncm93XT1cImdldEZsZXhBdHRyaWJ1dGUobGF5b3V0Tm9kZSwgJ2ZsZXgtZ3JvdycpXCJcbiAgICAgICAgICAgW3N0eWxlLmZsZXgtc2hyaW5rXT1cImdldEZsZXhBdHRyaWJ1dGUobGF5b3V0Tm9kZSwgJ2ZsZXgtc2hyaW5rJylcIlxuICAgICAgICAgICBbc3R5bGUuZmxleC1iYXNpc109XCJnZXRGbGV4QXR0cmlidXRlKGxheW91dE5vZGUsICdmbGV4LWJhc2lzJylcIlxuICAgICAgICAgICBbc3R5bGUuYWxpZ24tc2VsZl09XCIobGF5b3V0Tm9kZT8ub3B0aW9ucyB8fCB7fSlbJ2FsaWduLXNlbGYnXVwiXG4gICAgICAgICAgIFtzdHlsZS5vcmRlcl09XCJsYXlvdXROb2RlPy5vcHRpb25zPy5vcmRlclwiXG4gICAgICAgICAgIFtmeEZsZXhdPVwibGF5b3V0Tm9kZT8ub3B0aW9ucz8uZnhGbGV4XCJcbiAgICAgICAgICAgW2Z4RmxleE9yZGVyXT1cImxheW91dE5vZGU/Lm9wdGlvbnM/LmZ4RmxleE9yZGVyXCJcbiAgICAgICAgICAgW2Z4RmxleE9mZnNldF09XCJsYXlvdXROb2RlPy5vcHRpb25zPy5meEZsZXhPZmZzZXRcIlxuICAgICAgICAgICBbZnhGbGV4QWxpZ25dPVwibGF5b3V0Tm9kZT8ub3B0aW9ucz8uZnhGbGV4QWxpZ25cIj5cbiAgICAgICAgICA8c2VsZWN0LWZyYW1ld29yay13aWRnZXQgKm5nSWY9XCJzaG93V2lkZ2V0KGxheW91dE5vZGUpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2RhdGFJbmRleF09XCJsYXlvdXROb2RlPy5hcnJheUl0ZW0gPyAoZGF0YUluZGV4IHx8IFtdKS5jb25jYXQoaSkgOiAoZGF0YUluZGV4IHx8IFtdKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsYXlvdXRJbmRleF09XCIobGF5b3V0SW5kZXggfHwgW10pLmNvbmNhdChpKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsYXlvdXROb2RlXT1cImxheW91dE5vZGVcIj48L3NlbGVjdC1mcmFtZXdvcmstd2lkZ2V0PlxuICAgICAgICAgIDwvZGl2PmAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbn0pXG5leHBvcnQgY2xhc3MgRmxleExheW91dFJvb3RDb21wb25lbnQge1xuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBsYXlvdXQ6IGFueVtdXG4gIEBJbnB1dCgpIGlzRmxleEl0ZW0gPSBmYWxzZVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICByZW1vdmVJdGVtKGl0ZW0pIHtcbiAgICB0aGlzLmpzZi5yZW1vdmVJdGVtKGl0ZW0pXG4gIH1cblxuICAvLyBTZXQgYXR0cmlidXRlcyBmb3IgZmxleGJveCBjaGlsZFxuICAvLyAoY29udGFpbmVyIGF0dHJpYnV0ZXMgYXJlIHNldCBpbiBmbGV4LWxheW91dC1zZWN0aW9uLmNvbXBvbmVudClcbiAgZ2V0RmxleEF0dHJpYnV0ZShub2RlOiBhbnksIGF0dHJpYnV0ZTogc3RyaW5nKSB7XG4gICAgY29uc3QgaW5kZXggPSBbJ2ZsZXgtZ3JvdycsICdmbGV4LXNocmluaycsICdmbGV4LWJhc2lzJ10uaW5kZXhPZihhdHRyaWJ1dGUpXG4gICAgcmV0dXJuICgobm9kZS5vcHRpb25zIHx8IHt9KS5mbGV4IHx8ICcnKS5zcGxpdCgvXFxzKy8pW2luZGV4XSB8fFxuICAgICAgKG5vZGUub3B0aW9ucyB8fCB7fSlbYXR0cmlidXRlXSB8fCBbJzEnLCAnMScsICdhdXRvJ11baW5kZXhdXG4gIH1cblxuICBzaG93V2lkZ2V0KGxheW91dE5vZGU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmpzZi5ldmFsdWF0ZUNvbmRpdGlvbihsYXlvdXROb2RlLCB0aGlzLmRhdGFJbmRleClcbiAgfVxufVxuIl19