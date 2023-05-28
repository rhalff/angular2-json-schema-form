import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '@ngsf/widget-library';
import * as i0 from "@angular/core";
import * as i1 from "@ngsf/widget-library";
import * as i2 from "@angular/common";
import * as i3 from "@ngbracket/ngx-layout/flex";
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
class FlexLayoutRootComponent {
    jsf;
    dataIndex;
    layoutIndex;
    layout;
    isFlexItem = false;
    constructor(jsf) {
        this.jsf = jsf;
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
    static ɵfac = function FlexLayoutRootComponent_Factory(t) { return new (t || FlexLayoutRootComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
    static ɵcmp = i0.ɵɵdefineComponent({ type: FlexLayoutRootComponent, selectors: [["flex-layout-root-widget"]], inputs: { dataIndex: "dataIndex", layoutIndex: "layoutIndex", layout: "layout", isFlexItem: "isFlexItem" }, decls: 1, vars: 1, consts: [[3, "form-flex-item", "flex-grow", "flex-shrink", "flex-basis", "align-self", "order", "fxFlex", "fxFlexOrder", "fxFlexOffset", "fxFlexAlign", 4, "ngFor", "ngForOf"], [3, "fxFlex", "fxFlexOrder", "fxFlexOffset", "fxFlexAlign"], [3, "dataIndex", "layoutIndex", "layoutNode", 4, "ngIf"], [3, "dataIndex", "layoutIndex", "layoutNode"]], template: function FlexLayoutRootComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, FlexLayoutRootComponent_div_0_Template, 2, 18, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngForOf", ctx.layout);
        } }, dependencies: [i2.NgForOf, i2.NgIf, i3.DefaultFlexOrderDirective, i3.DefaultFlexOffsetDirective, i3.DefaultFlexAlignDirective, i3.DefaultFlexDirective, i1.SelectFrameworkComponent], encapsulation: 2 });
}
export { FlexLayoutRootComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleC1sYXlvdXQtcm9vdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLW1hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsvc3JjL2xpYi9jb21wb25lbnRzL2ZsZXgtbGF5b3V0LXJvb3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFBO0FBQ3ZFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNCQUFzQixDQUFBOzs7Ozs7O0lBZ0JoRCw2Q0FHNkU7Ozs7OztJQUZwRCxxTUFBcUYsZ0ZBQUEsNkJBQUE7Ozs7SUFabEgsOEJBVXNEO0lBQ2xELHNIQUc2RTtJQUM3RSxpQkFBTTs7OztJQWJMLGdGQUE2RCxzRUFBQSxvRUFBQSxxSEFBQSw0R0FBQTtJQUQ3RCxtREFBbUM7SUFNbkMsMkhBQXNDLHdIQUFBLDBIQUFBLHdIQUFBO0lBSWIsZUFBNEI7SUFBNUIsdURBQTRCOztBQWRoRSxNQXFCYSx1QkFBdUI7SUFPeEI7SUFORCxTQUFTLENBQVU7SUFDbkIsV0FBVyxDQUFVO0lBQ3JCLE1BQU0sQ0FBTztJQUNiLFVBQVUsR0FBRyxLQUFLLENBQUE7SUFFM0IsWUFDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtJQUVwQyxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQUk7UUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMzQixDQUFDO0lBSUQsZ0JBQWdCLENBQUMsSUFBUyxFQUFFLFNBQWlCO1FBQzNDLE1BQU0sS0FBSyxHQUFHLENBQUMsV0FBVyxFQUFFLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDM0UsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUMxRCxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hFLENBQUM7SUFFRCxVQUFVLENBQUMsVUFBZTtRQUN4QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUMvRCxDQUFDO2lGQXpCVSx1QkFBdUI7K0NBQXZCLHVCQUF1QjtZQWxCOUIseUVBZVU7O1lBZmtCLG9DQUFXOzs7U0FrQmhDLHVCQUF1Qjt1RkFBdkIsdUJBQXVCO2NBckJuQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O2lCQWdCSztnQkFDZixlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTzthQUNqRDt3RUFFVSxTQUFTO2tCQUFqQixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUNHLE1BQU07a0JBQWQsS0FBSztZQUNHLFVBQVU7a0JBQWxCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJ0BuZ3NmL3dpZGdldC1saWJyYXJ5J1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmbGV4LWxheW91dC1yb290LXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBsYXlvdXROb2RlIG9mIGxheW91dDsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgICAgIFtjbGFzcy5mb3JtLWZsZXgtaXRlbV09XCJpc0ZsZXhJdGVtXCJcbiAgICAgICAgICAgW3N0eWxlLmZsZXgtZ3Jvd109XCJnZXRGbGV4QXR0cmlidXRlKGxheW91dE5vZGUsICdmbGV4LWdyb3cnKVwiXG4gICAgICAgICAgIFtzdHlsZS5mbGV4LXNocmlua109XCJnZXRGbGV4QXR0cmlidXRlKGxheW91dE5vZGUsICdmbGV4LXNocmluaycpXCJcbiAgICAgICAgICAgW3N0eWxlLmZsZXgtYmFzaXNdPVwiZ2V0RmxleEF0dHJpYnV0ZShsYXlvdXROb2RlLCAnZmxleC1iYXNpcycpXCJcbiAgICAgICAgICAgW3N0eWxlLmFsaWduLXNlbGZdPVwiKGxheW91dE5vZGU/Lm9wdGlvbnMgfHwge30pWydhbGlnbi1zZWxmJ11cIlxuICAgICAgICAgICBbc3R5bGUub3JkZXJdPVwibGF5b3V0Tm9kZT8ub3B0aW9ucz8ub3JkZXJcIlxuICAgICAgICAgICBbZnhGbGV4XT1cImxheW91dE5vZGU/Lm9wdGlvbnM/LmZ4RmxleFwiXG4gICAgICAgICAgIFtmeEZsZXhPcmRlcl09XCJsYXlvdXROb2RlPy5vcHRpb25zPy5meEZsZXhPcmRlclwiXG4gICAgICAgICAgIFtmeEZsZXhPZmZzZXRdPVwibGF5b3V0Tm9kZT8ub3B0aW9ucz8uZnhGbGV4T2Zmc2V0XCJcbiAgICAgICAgICAgW2Z4RmxleEFsaWduXT1cImxheW91dE5vZGU/Lm9wdGlvbnM/LmZ4RmxleEFsaWduXCI+XG4gICAgICAgICAgPHNlbGVjdC1mcmFtZXdvcmstd2lkZ2V0ICpuZ0lmPVwic2hvd1dpZGdldChsYXlvdXROb2RlKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkYXRhSW5kZXhdPVwibGF5b3V0Tm9kZT8uYXJyYXlJdGVtID8gKGRhdGFJbmRleCB8fCBbXSkuY29uY2F0KGkpIDogKGRhdGFJbmRleCB8fCBbXSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbGF5b3V0SW5kZXhdPVwiKGxheW91dEluZGV4IHx8IFtdKS5jb25jYXQoaSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbGF5b3V0Tm9kZV09XCJsYXlvdXROb2RlXCI+PC9zZWxlY3QtZnJhbWV3b3JrLXdpZGdldD5cbiAgICAgICAgICA8L2Rpdj5gLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG59KVxuZXhwb3J0IGNsYXNzIEZsZXhMYXlvdXRSb290Q29tcG9uZW50IHtcbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgbGF5b3V0OiBhbnlbXVxuICBASW5wdXQoKSBpc0ZsZXhJdGVtID0gZmFsc2VcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgcmVtb3ZlSXRlbShpdGVtKSB7XG4gICAgdGhpcy5qc2YucmVtb3ZlSXRlbShpdGVtKVxuICB9XG5cbiAgLy8gU2V0IGF0dHJpYnV0ZXMgZm9yIGZsZXhib3ggY2hpbGRcbiAgLy8gKGNvbnRhaW5lciBhdHRyaWJ1dGVzIGFyZSBzZXQgaW4gZmxleC1sYXlvdXQtc2VjdGlvbi5jb21wb25lbnQpXG4gIGdldEZsZXhBdHRyaWJ1dGUobm9kZTogYW55LCBhdHRyaWJ1dGU6IHN0cmluZykge1xuICAgIGNvbnN0IGluZGV4ID0gWydmbGV4LWdyb3cnLCAnZmxleC1zaHJpbmsnLCAnZmxleC1iYXNpcyddLmluZGV4T2YoYXR0cmlidXRlKVxuICAgIHJldHVybiAoKG5vZGUub3B0aW9ucyB8fCB7fSkuZmxleCB8fCAnJykuc3BsaXQoL1xccysvKVtpbmRleF0gfHxcbiAgICAgIChub2RlLm9wdGlvbnMgfHwge30pW2F0dHJpYnV0ZV0gfHwgWycxJywgJzEnLCAnYXV0byddW2luZGV4XVxuICB9XG5cbiAgc2hvd1dpZGdldChsYXlvdXROb2RlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5qc2YuZXZhbHVhdGVDb25kaXRpb24obGF5b3V0Tm9kZSwgdGhpcy5kYXRhSW5kZXgpXG4gIH1cbn1cbiJdfQ==