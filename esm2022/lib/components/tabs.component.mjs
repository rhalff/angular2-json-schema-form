import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/json-schema-form.service";
import * as i2 from "@angular/common";
import * as i3 from "./select-framework.component";
function TabsComponent_li_1_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 4);
    i0.ɵɵlistener("click", function TabsComponent_li_1_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r7); const i_r3 = i0.ɵɵnextContext().index; const ctx_r5 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r5.select(i_r3)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    const i_r3 = ctx_r8.index;
    const item_r2 = ctx_r8.$implicit;
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵclassMap("nav-link" + (ctx_r4.selectedItem === i_r3 ? " " + (ctx_r4.options == null ? null : ctx_r4.options.activeClass) + " " + (ctx_r4.options == null ? null : ctx_r4.options.style == null ? null : ctx_r4.options.style.selected) : " " + (ctx_r4.options == null ? null : ctx_r4.options.style == null ? null : ctx_r4.options.style.unselected)));
    i0.ɵɵproperty("innerHTML", ctx_r4.setTabTitle(item_r2, i_r3), i0.ɵɵsanitizeHtml);
} }
function TabsComponent_li_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 2);
    i0.ɵɵtemplate(1, TabsComponent_li_1_a_1_Template, 1, 3, "a", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap(((ctx_r0.options == null ? null : ctx_r0.options.itemLabelHtmlClass) || "") + (ctx_r0.selectedItem === i_r3 ? " " + ((ctx_r0.options == null ? null : ctx_r0.options.activeClass) || "") + " " + ((ctx_r0.options == null ? null : ctx_r0.options.style == null ? null : ctx_r0.options.style.selected) || "") : " " + (ctx_r0.options == null ? null : ctx_r0.options.style == null ? null : ctx_r0.options.style.unselected)));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.showAddTab || item_r2.type !== "$ref");
} }
const _c0 = function () { return []; };
function TabsComponent_div_2_select_framework_widget_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "select-framework-widget", 6);
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext();
    const i_r10 = ctx_r12.index;
    const layoutItem_r9 = ctx_r12.$implicit;
    const ctx_r11 = i0.ɵɵnextContext();
    i0.ɵɵclassMap(((ctx_r11.options == null ? null : ctx_r11.options.fieldHtmlClass) || "") + " " + ((ctx_r11.options == null ? null : ctx_r11.options.activeClass) || "") + " " + ((ctx_r11.options == null ? null : ctx_r11.options.style == null ? null : ctx_r11.options.style.selected) || ""));
    i0.ɵɵproperty("dataIndex", (ctx_r11.layoutNode == null ? null : ctx_r11.layoutNode.dataType) === "array" ? (ctx_r11.dataIndex || i0.ɵɵpureFunction0(5, _c0)).concat(i_r10) : ctx_r11.dataIndex)("layoutIndex", (ctx_r11.layoutIndex || i0.ɵɵpureFunction0(6, _c0)).concat(i_r10))("layoutNode", layoutItem_r9);
} }
function TabsComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, TabsComponent_div_2_select_framework_widget_1_Template, 1, 7, "select-framework-widget", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r10 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r1.options == null ? null : ctx_r1.options.htmlClass) || "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.selectedItem === i_r10);
} }
class TabsComponent {
    jsf;
    options;
    itemCount;
    selectedItem = 0;
    showAddTab = true;
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.itemCount = this.layoutNode.items.length - 1;
        this.updateControl();
    }
    select(index) {
        if (this.layoutNode.items[index].type === '$ref') {
            this.itemCount = this.layoutNode.items.length;
            this.jsf.addItem({
                layoutNode: this.layoutNode.items[index],
                layoutIndex: this.layoutIndex.concat(index),
                dataIndex: this.dataIndex.concat(index)
            });
            this.updateControl();
        }
        this.selectedItem = index;
    }
    updateControl() {
        const lastItem = this.layoutNode.items[this.layoutNode.items.length - 1];
        if (lastItem.type === '$ref' &&
            this.itemCount >= (lastItem.options.maxItems || 1000)) {
            this.showAddTab = false;
        }
    }
    setTabTitle(item, index) {
        return this.jsf.setArrayItemTitle(this, item, index);
    }
    static ɵfac = function TabsComponent_Factory(t) { return new (t || TabsComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
    static ɵcmp = i0.ɵɵdefineComponent({ type: TabsComponent, selectors: [["tabs-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 3, vars: 4, consts: [["role", "presentation", "data-tabs", "", 3, "class", 4, "ngFor", "ngForOf"], [3, "class", 4, "ngFor", "ngForOf"], ["role", "presentation", "data-tabs", ""], [3, "class", "innerHTML", "click", 4, "ngIf"], [3, "innerHTML", "click"], [3, "class", "dataIndex", "layoutIndex", "layoutNode", 4, "ngIf"], [3, "dataIndex", "layoutIndex", "layoutNode"]], template: function TabsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ul");
            i0.ɵɵtemplate(1, TabsComponent_li_1_Template, 2, 3, "li", 0);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(2, TabsComponent_div_2_Template, 2, 3, "div", 1);
        } if (rf & 2) {
            i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.labelHtmlClass) || "");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx.layoutNode == null ? null : ctx.layoutNode.items);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx.layoutNode == null ? null : ctx.layoutNode.items);
        } }, dependencies: [i2.NgForOf, i2.NgIf, i3.SelectFrameworkComponent], styles: ["a[_ngcontent-%COMP%]{cursor:pointer}"] });
}
export { TabsComponent };
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TabsComponent, [{
        type: Component,
        args: [{ selector: 'tabs-widget', template: `
    <ul
      [class]="options?.labelHtmlClass || ''">
      <li *ngFor="let item of layoutNode?.items; let i = index"
        [class]="(options?.itemLabelHtmlClass || '') + (selectedItem === i ?
          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :
          (' ' + options?.style?.unselected))"
        role="presentation"
        data-tabs>
        <a *ngIf="showAddTab || item.type !== '$ref'"
           [class]="'nav-link' + (selectedItem === i ? (' ' + options?.activeClass + ' ' + options?.style?.selected) :
            (' ' + options?.style?.unselected))"
          [innerHTML]="setTabTitle(item, i)"
          (click)="select(i)"></a>
      </li>
    </ul>

    <div *ngFor="let layoutItem of layoutNode?.items; let i = index"
      [class]="options?.htmlClass || ''">

      <select-framework-widget *ngIf="selectedItem === i"
        [class]="(options?.fieldHtmlClass || '') +
          ' ' + (options?.activeClass || '') +
          ' ' + (options?.style?.selected || '')"
        [dataIndex]="layoutNode?.dataType === 'array' ? (dataIndex || []).concat(i) : dataIndex"
        [layoutIndex]="(layoutIndex || []).concat(i)"
        [layoutNode]="layoutItem"></select-framework-widget>

    </div>`, styles: ["a{cursor:pointer}\n"] }]
    }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLXdpZGdldC1saWJyYXJ5L3NyYy9saWIvY29tcG9uZW50cy90YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQTtBQUN0RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQTs7Ozs7OztJQWFsRSw0QkFJc0I7SUFBcEIsK0xBQVMsZUFBQSxtQkFBUyxDQUFBLElBQUM7SUFBQyxpQkFBSTs7Ozs7O0lBSHZCLDZWQUNxQztJQUN0QyxnRkFBa0M7OztJQVR0Qyw2QkFLWTtJQUNWLCtEQUkwQjtJQUM1QixpQkFBSzs7Ozs7SUFWSCw4YUFFc0M7SUFHbEMsZUFBd0M7SUFBeEMsbUVBQXdDOzs7O0lBVzlDLDZDQU1zRDs7Ozs7O0lBTHBELGdTQUV5QztJQUN6QywrTEFBd0Ysa0ZBQUEsNkJBQUE7OztJQVA1RiwyQkFDcUM7SUFFbkMsNEdBTXNEO0lBRXhELGlCQUFNOzs7O0lBVkosK0VBQWtDO0lBRVIsZUFBd0I7SUFBeEIsb0RBQXdCOztBQXRCeEQsTUFpQ2EsYUFBYTtJQVVkO0lBVFYsT0FBTyxDQUFLO0lBQ1osU0FBUyxDQUFRO0lBQ2pCLFlBQVksR0FBRyxDQUFDLENBQUE7SUFDaEIsVUFBVSxHQUFHLElBQUksQ0FBQTtJQUNSLFVBQVUsQ0FBSztJQUNmLFdBQVcsQ0FBVTtJQUNyQixTQUFTLENBQVU7SUFFNUIsWUFDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtJQUVwQyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFBO1FBQzVDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtRQUNqRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7SUFDdEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLO1FBQ1YsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1lBQ2hELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFBO1lBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO2dCQUNmLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQ3hDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQzNDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7YUFDeEMsQ0FBQyxDQUFBO1lBQ0YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO1NBQ3JCO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUE7SUFDM0IsQ0FBQztJQUVELGFBQWE7UUFDWCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDeEUsSUFBSSxRQUFRLENBQUMsSUFBSSxLQUFLLE1BQU07WUFDMUIsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxFQUNyRDtZQUNBLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFBO1NBQ3hCO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFTLEVBQUUsS0FBYTtRQUNsQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUN0RCxDQUFDO3VFQTVDVSxhQUFhOytDQUFiLGFBQWE7WUE5QnRCLDBCQUMwQztZQUN4Qyw0REFXSztZQUNQLGlCQUFLO1lBRUwsOERBV007O1lBMUJKLDhFQUF1QztZQUNsQixlQUFzQjtZQUF0Qiw4RUFBc0I7WUFjakIsZUFBc0I7WUFBdEIsOEVBQXNCOzs7U0FjekMsYUFBYTt1RkFBYixhQUFhO2NBakN6QixTQUFTOzJCQUNFLGFBQWEsWUFDYjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQTRCRDt3RUFRQSxVQUFVO2tCQUFsQixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9qc29uLXNjaGVtYS1mb3JtLnNlcnZpY2UnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RhYnMtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8dWxcbiAgICAgIFtjbGFzc109XCJvcHRpb25zPy5sYWJlbEh0bWxDbGFzcyB8fCAnJ1wiPlxuICAgICAgPGxpICpuZ0Zvcj1cImxldCBpdGVtIG9mIGxheW91dE5vZGU/Lml0ZW1zOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgW2NsYXNzXT1cIihvcHRpb25zPy5pdGVtTGFiZWxIdG1sQ2xhc3MgfHwgJycpICsgKHNlbGVjdGVkSXRlbSA9PT0gaSA/XG4gICAgICAgICAgKCcgJyArIChvcHRpb25zPy5hY3RpdmVDbGFzcyB8fCAnJykgKyAnICcgKyAob3B0aW9ucz8uc3R5bGU/LnNlbGVjdGVkIHx8ICcnKSkgOlxuICAgICAgICAgICgnICcgKyBvcHRpb25zPy5zdHlsZT8udW5zZWxlY3RlZCkpXCJcbiAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICAgIGRhdGEtdGFicz5cbiAgICAgICAgPGEgKm5nSWY9XCJzaG93QWRkVGFiIHx8IGl0ZW0udHlwZSAhPT0gJyRyZWYnXCJcbiAgICAgICAgICAgW2NsYXNzXT1cIiduYXYtbGluaycgKyAoc2VsZWN0ZWRJdGVtID09PSBpID8gKCcgJyArIG9wdGlvbnM/LmFjdGl2ZUNsYXNzICsgJyAnICsgb3B0aW9ucz8uc3R5bGU/LnNlbGVjdGVkKSA6XG4gICAgICAgICAgICAoJyAnICsgb3B0aW9ucz8uc3R5bGU/LnVuc2VsZWN0ZWQpKVwiXG4gICAgICAgICAgW2lubmVySFRNTF09XCJzZXRUYWJUaXRsZShpdGVtLCBpKVwiXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdChpKVwiPjwvYT5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cblxuICAgIDxkaXYgKm5nRm9yPVwibGV0IGxheW91dEl0ZW0gb2YgbGF5b3V0Tm9kZT8uaXRlbXM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/Lmh0bWxDbGFzcyB8fCAnJ1wiPlxuXG4gICAgICA8c2VsZWN0LWZyYW1ld29yay13aWRnZXQgKm5nSWY9XCJzZWxlY3RlZEl0ZW0gPT09IGlcIlxuICAgICAgICBbY2xhc3NdPVwiKG9wdGlvbnM/LmZpZWxkSHRtbENsYXNzIHx8ICcnKSArXG4gICAgICAgICAgJyAnICsgKG9wdGlvbnM/LmFjdGl2ZUNsYXNzIHx8ICcnKSArXG4gICAgICAgICAgJyAnICsgKG9wdGlvbnM/LnN0eWxlPy5zZWxlY3RlZCB8fCAnJylcIlxuICAgICAgICBbZGF0YUluZGV4XT1cImxheW91dE5vZGU/LmRhdGFUeXBlID09PSAnYXJyYXknID8gKGRhdGFJbmRleCB8fCBbXSkuY29uY2F0KGkpIDogZGF0YUluZGV4XCJcbiAgICAgICAgW2xheW91dEluZGV4XT1cIihsYXlvdXRJbmRleCB8fCBbXSkuY29uY2F0KGkpXCJcbiAgICAgICAgW2xheW91dE5vZGVdPVwibGF5b3V0SXRlbVwiPjwvc2VsZWN0LWZyYW1ld29yay13aWRnZXQ+XG5cbiAgICA8L2Rpdj5gLFxuICBzdHlsZXM6IFtgIGEgeyBjdXJzb3I6IHBvaW50ZXI7IH0gYF0sXG59KVxuZXhwb3J0IGNsYXNzIFRhYnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBvcHRpb25zOiBhbnlcbiAgaXRlbUNvdW50OiBudW1iZXJcbiAgc2VsZWN0ZWRJdGVtID0gMFxuICBzaG93QWRkVGFiID0gdHJ1ZVxuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge31cbiAgICB0aGlzLml0ZW1Db3VudCA9IHRoaXMubGF5b3V0Tm9kZS5pdGVtcy5sZW5ndGggLSAxXG4gICAgdGhpcy51cGRhdGVDb250cm9sKClcbiAgfVxuXG4gIHNlbGVjdChpbmRleCkge1xuICAgIGlmICh0aGlzLmxheW91dE5vZGUuaXRlbXNbaW5kZXhdLnR5cGUgPT09ICckcmVmJykge1xuICAgICAgdGhpcy5pdGVtQ291bnQgPSB0aGlzLmxheW91dE5vZGUuaXRlbXMubGVuZ3RoXG4gICAgICB0aGlzLmpzZi5hZGRJdGVtKHtcbiAgICAgICAgbGF5b3V0Tm9kZTogdGhpcy5sYXlvdXROb2RlLml0ZW1zW2luZGV4XSxcbiAgICAgICAgbGF5b3V0SW5kZXg6IHRoaXMubGF5b3V0SW5kZXguY29uY2F0KGluZGV4KSxcbiAgICAgICAgZGF0YUluZGV4OiB0aGlzLmRhdGFJbmRleC5jb25jYXQoaW5kZXgpXG4gICAgICB9KVxuICAgICAgdGhpcy51cGRhdGVDb250cm9sKClcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSBpbmRleFxuICB9XG5cbiAgdXBkYXRlQ29udHJvbCgpIHtcbiAgICBjb25zdCBsYXN0SXRlbSA9IHRoaXMubGF5b3V0Tm9kZS5pdGVtc1t0aGlzLmxheW91dE5vZGUuaXRlbXMubGVuZ3RoIC0gMV1cbiAgICBpZiAobGFzdEl0ZW0udHlwZSA9PT0gJyRyZWYnICYmXG4gICAgICB0aGlzLml0ZW1Db3VudCA+PSAobGFzdEl0ZW0ub3B0aW9ucy5tYXhJdGVtcyB8fCAxMDAwKVxuICAgICkge1xuICAgICAgdGhpcy5zaG93QWRkVGFiID0gZmFsc2VcbiAgICB9XG4gIH1cblxuICBzZXRUYWJUaXRsZShpdGVtOiBhbnksIGluZGV4OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmpzZi5zZXRBcnJheUl0ZW1UaXRsZSh0aGlzLCBpdGVtLCBpbmRleClcbiAgfVxufVxuIl19