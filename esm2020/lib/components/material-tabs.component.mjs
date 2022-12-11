import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '@ngsf/widget-library';
import * as i0 from "@angular/core";
import * as i1 from "@ngsf/widget-library";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/tabs";
function MaterialTabsComponent_a_1_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 5);
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    const item_r2 = ctx_r5.$implicit;
    const i_r3 = ctx_r5.index;
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r4.setTabTitle(item_r2, i_r3), i0.ɵɵsanitizeHtml);
} }
function MaterialTabsComponent_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 3);
    i0.ɵɵlistener("click", function MaterialTabsComponent_a_1_Template_a_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r7); const i_r3 = restoredCtx.index; const ctx_r6 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r6.select(i_r3)); });
    i0.ɵɵtemplate(1, MaterialTabsComponent_a_1_span_1_Template, 1, 1, "span", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("active", ctx_r0.selectedItem === i_r3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.showAddTab || item_r2.type !== "$ref");
} }
const _c0 = function () { return []; };
function MaterialTabsComponent_div_2_select_framework_widget_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "select-framework-widget", 7);
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext();
    const i_r9 = ctx_r11.index;
    const layoutItem_r8 = ctx_r11.$implicit;
    const ctx_r10 = i0.ɵɵnextContext();
    i0.ɵɵclassMap(((ctx_r10.options == null ? null : ctx_r10.options.fieldHtmlClass) || "") + " " + ((ctx_r10.options == null ? null : ctx_r10.options.activeClass) || "") + " " + ((ctx_r10.options == null ? null : ctx_r10.options.style == null ? null : ctx_r10.options.style.selected) || ""));
    i0.ɵɵproperty("dataIndex", (ctx_r10.layoutNode == null ? null : ctx_r10.layoutNode.dataType) === "array" ? (ctx_r10.dataIndex || i0.ɵɵpureFunction0(5, _c0)).concat(i_r9) : ctx_r10.dataIndex)("layoutIndex", (ctx_r10.layoutIndex || i0.ɵɵpureFunction0(6, _c0)).concat(i_r9))("layoutNode", layoutItem_r8);
} }
function MaterialTabsComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, MaterialTabsComponent_div_2_select_framework_widget_1_Template, 1, 7, "select-framework-widget", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r9 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r1.options == null ? null : ctx_r1.options.htmlClass) || "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.selectedItem === i_r9);
} }
export class MaterialTabsComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.selectedItem = 0;
        this.showAddTab = true;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.itemCount = this.layoutNode.items.length - 1;
        this.updateControl();
    }
    select(index) {
        if (this.layoutNode.items[index].type === '$ref') {
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
        this.itemCount = this.layoutNode.items.length - 1;
        const lastItem = this.layoutNode.items[this.layoutNode.items.length - 1];
        this.showAddTab = lastItem.type === '$ref' &&
            this.itemCount < (lastItem.options.maxItems || 1000);
    }
    setTabTitle(item, index) {
        return this.jsf.setArrayItemTitle(this, item, index);
    }
}
MaterialTabsComponent.ɵfac = function MaterialTabsComponent_Factory(t) { return new (t || MaterialTabsComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialTabsComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialTabsComponent, selectors: [["material-tabs-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 3, vars: 5, consts: [["mat-tab-nav-bar", ""], ["mat-tab-link", "", 3, "active", "click", 4, "ngFor", "ngForOf"], [3, "class", 4, "ngFor", "ngForOf"], ["mat-tab-link", "", 3, "active", "click"], [3, "innerHTML", 4, "ngIf"], [3, "innerHTML"], [3, "class", "dataIndex", "layoutIndex", "layoutNode", 4, "ngIf"], [3, "dataIndex", "layoutIndex", "layoutNode"]], template: function MaterialTabsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "nav", 0);
        i0.ɵɵtemplate(1, MaterialTabsComponent_a_1_Template, 2, 2, "a", 1);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(2, MaterialTabsComponent_div_2_Template, 2, 3, "div", 2);
    } if (rf & 2) {
        i0.ɵɵstyleProp("width", "100%");
        i0.ɵɵattribute("aria-label", (ctx.options == null ? null : ctx.options.label) || (ctx.options == null ? null : ctx.options.title) || "");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.layoutNode == null ? null : ctx.layoutNode.items);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.layoutNode == null ? null : ctx.layoutNode.items);
    } }, dependencies: [i2.NgForOf, i2.NgIf, i3.MatTabNav, i3.MatTabLink, i1.SelectFrameworkComponent], styles: ["a[_ngcontent-%COMP%]{cursor:pointer}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialTabsComponent, [{
        type: Component,
        args: [{ selector: 'material-tabs-widget', template: `
      <nav mat-tab-nav-bar
           [attr.aria-label]="options?.label || options?.title || ''"
           [style.width]="'100%'">
          <a mat-tab-link *ngFor="let item of layoutNode?.items; let i = index"
             [active]="selectedItem === i"
             (click)="select(i)">
          <span *ngIf="showAddTab || item.type !== '$ref'"
                [innerHTML]="setTabTitle(item, i)"></span>
          </a>
      </nav>
      <div *ngFor="let layoutItem of layoutNode?.items; let i = index"
           [class]="options?.htmlClass || ''">
          <select-framework-widget *ngIf="selectedItem === i"
                                   [class]="(options?.fieldHtmlClass || '') + ' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtdGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLW1hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsvc3JjL2xpYi9jb21wb25lbnRzL21hdGVyaWFsLXRhYnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFBO0FBQ3RELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNCQUFzQixDQUFBOzs7Ozs7SUFXaEQsMEJBQ2dEOzs7Ozs7SUFBMUMsZ0ZBQWtDOzs7O0lBSnhDLDRCQUV1QjtJQUFwQiwrTUFBUyxlQUFBLG1CQUFTLENBQUEsSUFBQztJQUN0Qiw0RUFDZ0Q7SUFDaEQsaUJBQUk7Ozs7O0lBSkQscURBQTZCO0lBRXpCLGVBQXdDO0lBQXhDLG1FQUF3Qzs7OztJQU0vQyw2Q0FJNkU7Ozs7OztJQUhwRCxnU0FBdUg7SUFDdkgsOExBQXdGLGlGQUFBLDZCQUFBOzs7SUFKckgsMkJBQ3dDO0lBQ3BDLG9IQUk2RTtJQUNqRixpQkFBTTs7OztJQU5ELCtFQUFrQztJQUNULGVBQXdCO0lBQXhCLG1EQUF3Qjs7QUFVNUQsTUFBTSxPQUFPLHFCQUFxQjtJQVNoQyxZQUNVLEdBQTBCO1FBQTFCLFFBQUcsR0FBSCxHQUFHLENBQXVCO1FBUHBDLGlCQUFZLEdBQUcsQ0FBQyxDQUFBO1FBQ2hCLGVBQVUsR0FBRyxJQUFJLENBQUE7SUFRakIsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7UUFDakQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO0lBQ3RCLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSztRQUNWLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUNoRCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztnQkFDZixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUN4QyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUMzQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ3hDLENBQUMsQ0FBQTtZQUNGLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTtTQUNyQjtRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFBO0lBQzNCLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1FBQ2pELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUN4RSxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEtBQUssTUFBTTtZQUN4QyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUE7SUFDeEQsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFTLEVBQUUsS0FBYTtRQUNsQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUN0RCxDQUFDOzswRkF6Q1UscUJBQXFCOzBEQUFyQixxQkFBcUI7UUF0QjVCLDhCQUU0QjtRQUN4QixrRUFLSTtRQUNSLGlCQUFNO1FBQ04sc0VBT007O1FBZkQsK0JBQXNCO1FBRHRCLHdJQUEwRDtRQUUxQixlQUFzQjtRQUF0Qiw4RUFBc0I7UUFPL0IsZUFBc0I7UUFBdEIsOEVBQXNCOzt1RkFZM0MscUJBQXFCO2NBekJqQyxTQUFTOzJCQUNFLHNCQUFzQixZQUN0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7O2FBa0JDO3dFQVVGLFVBQVU7a0JBQWxCLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJ0BuZ3NmL3dpZGdldC1saWJyYXJ5J1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXRlcmlhbC10YWJzLXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8bmF2IG1hdC10YWItbmF2LWJhclxuICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm9wdGlvbnM/LmxhYmVsIHx8IG9wdGlvbnM/LnRpdGxlIHx8ICcnXCJcbiAgICAgICAgICAgW3N0eWxlLndpZHRoXT1cIicxMDAlJ1wiPlxuICAgICAgICAgIDxhIG1hdC10YWItbGluayAqbmdGb3I9XCJsZXQgaXRlbSBvZiBsYXlvdXROb2RlPy5pdGVtczsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgICAgICAgW2FjdGl2ZV09XCJzZWxlY3RlZEl0ZW0gPT09IGlcIlxuICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3QoaSlcIj5cbiAgICAgICAgICA8c3BhbiAqbmdJZj1cInNob3dBZGRUYWIgfHwgaXRlbS50eXBlICE9PSAnJHJlZidcIlxuICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwic2V0VGFiVGl0bGUoaXRlbSwgaSlcIj48L3NwYW4+XG4gICAgICAgICAgPC9hPlxuICAgICAgPC9uYXY+XG4gICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBsYXlvdXRJdGVtIG9mIGxheW91dE5vZGU/Lml0ZW1zOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/Lmh0bWxDbGFzcyB8fCAnJ1wiPlxuICAgICAgICAgIDxzZWxlY3QtZnJhbWV3b3JrLXdpZGdldCAqbmdJZj1cInNlbGVjdGVkSXRlbSA9PT0gaVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzc109XCIob3B0aW9ucz8uZmllbGRIdG1sQ2xhc3MgfHwgJycpICsgJyAnICsgKG9wdGlvbnM/LmFjdGl2ZUNsYXNzIHx8ICcnKSArICcgJyArIChvcHRpb25zPy5zdHlsZT8uc2VsZWN0ZWQgfHwgJycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2RhdGFJbmRleF09XCJsYXlvdXROb2RlPy5kYXRhVHlwZSA9PT0gJ2FycmF5JyA/IChkYXRhSW5kZXggfHwgW10pLmNvbmNhdChpKSA6IGRhdGFJbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsYXlvdXRJbmRleF09XCIobGF5b3V0SW5kZXggfHwgW10pLmNvbmNhdChpKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsYXlvdXROb2RlXT1cImxheW91dEl0ZW1cIj48L3NlbGVjdC1mcmFtZXdvcmstd2lkZ2V0PlxuICAgICAgPC9kaXY+YCxcbiAgc3R5bGVzOiBbYCBhIHtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfSBgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxUYWJzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgb3B0aW9uczogYW55XG4gIGl0ZW1Db3VudDogbnVtYmVyXG4gIHNlbGVjdGVkSXRlbSA9IDBcbiAgc2hvd0FkZFRhYiA9IHRydWVcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9XG4gICAgdGhpcy5pdGVtQ291bnQgPSB0aGlzLmxheW91dE5vZGUuaXRlbXMubGVuZ3RoIC0gMVxuICAgIHRoaXMudXBkYXRlQ29udHJvbCgpXG4gIH1cblxuICBzZWxlY3QoaW5kZXgpIHtcbiAgICBpZiAodGhpcy5sYXlvdXROb2RlLml0ZW1zW2luZGV4XS50eXBlID09PSAnJHJlZicpIHtcbiAgICAgIHRoaXMuanNmLmFkZEl0ZW0oe1xuICAgICAgICBsYXlvdXROb2RlOiB0aGlzLmxheW91dE5vZGUuaXRlbXNbaW5kZXhdLFxuICAgICAgICBsYXlvdXRJbmRleDogdGhpcy5sYXlvdXRJbmRleC5jb25jYXQoaW5kZXgpLFxuICAgICAgICBkYXRhSW5kZXg6IHRoaXMuZGF0YUluZGV4LmNvbmNhdChpbmRleClcbiAgICAgIH0pXG4gICAgICB0aGlzLnVwZGF0ZUNvbnRyb2woKVxuICAgIH1cbiAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IGluZGV4XG4gIH1cblxuICB1cGRhdGVDb250cm9sKCkge1xuICAgIHRoaXMuaXRlbUNvdW50ID0gdGhpcy5sYXlvdXROb2RlLml0ZW1zLmxlbmd0aCAtIDFcbiAgICBjb25zdCBsYXN0SXRlbSA9IHRoaXMubGF5b3V0Tm9kZS5pdGVtc1t0aGlzLmxheW91dE5vZGUuaXRlbXMubGVuZ3RoIC0gMV1cbiAgICB0aGlzLnNob3dBZGRUYWIgPSBsYXN0SXRlbS50eXBlID09PSAnJHJlZicgJiZcbiAgICAgIHRoaXMuaXRlbUNvdW50IDwgKGxhc3RJdGVtLm9wdGlvbnMubWF4SXRlbXMgfHwgMTAwMClcbiAgfVxuXG4gIHNldFRhYlRpdGxlKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuanNmLnNldEFycmF5SXRlbVRpdGxlKHRoaXMsIGl0ZW0sIGluZGV4KVxuICB9XG59XG4iXX0=