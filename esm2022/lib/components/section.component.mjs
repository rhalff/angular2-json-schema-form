import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/json-schema-form.service";
import * as i2 from "@angular/common";
import * as i3 from "./root.component";
function SectionComponent_div_0_label_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 4);
    i0.ɵɵlistener("click", function SectionComponent_div_0_label_1_Template_label_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r4 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r4.toggleExpanded()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap((ctx_r2.options == null ? null : ctx_r2.options.labelHtmlClass) || "");
    i0.ɵɵproperty("innerHTML", ctx_r2.sectionTitle, i0.ɵɵsanitizeHtml);
} }
function SectionComponent_div_0_root_widget_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "root-widget", 5);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("align-content", ctx_r3.getFlexAttribute("align-content"))("align-items", ctx_r3.getFlexAttribute("align-items"))("display", ctx_r3.getFlexAttribute("display"))("flex-direction", ctx_r3.getFlexAttribute("flex-direction"))("flex-wrap", ctx_r3.getFlexAttribute("flex-wrap"))("justify-content", ctx_r3.getFlexAttribute("justify-content"));
    i0.ɵɵclassProp("form-flex-column", ctx_r3.getFlexAttribute("flex-direction") === "column")("form-flex-row", ctx_r3.getFlexAttribute("flex-direction") === "row");
    i0.ɵɵproperty("dataIndex", ctx_r3.dataIndex)("layout", ctx_r3.layoutNode.items)("layoutIndex", ctx_r3.layoutIndex)("isFlexItem", ctx_r3.getFlexAttribute("is-flex"))("isOrderable", ctx_r3.options == null ? null : ctx_r3.options.orderable);
} }
function SectionComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, SectionComponent_div_0_label_1_Template, 1, 3, "label", 2);
    i0.ɵɵtemplate(2, SectionComponent_div_0_root_widget_2_Template, 1, 21, "root-widget", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r0.options == null ? null : ctx_r0.options.htmlClass) || "");
    i0.ɵɵclassProp("expandable", (ctx_r0.options == null ? null : ctx_r0.options.expandable) && !ctx_r0.expanded)("expanded", (ctx_r0.options == null ? null : ctx_r0.options.expandable) && ctx_r0.expanded);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.sectionTitle);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.expanded);
} }
function SectionComponent_fieldset_1_legend_1_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "legend", 4);
    i0.ɵɵlistener("click", function SectionComponent_fieldset_1_legend_1_Template_legend_click_0_listener() { i0.ɵɵrestoreView(_r11); const ctx_r10 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r10.toggleExpanded()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap((ctx_r6.options == null ? null : ctx_r6.options.labelHtmlClass) || "");
    i0.ɵɵproperty("innerHTML", ctx_r6.sectionTitle, i0.ɵɵsanitizeHtml);
} }
function SectionComponent_fieldset_1_div_2_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p", 9);
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext(3);
    i0.ɵɵclassMap((ctx_r12.options == null ? null : ctx_r12.options.labelHelpBlockClass) || "");
    i0.ɵɵproperty("innerHTML", ctx_r12.options == null ? null : ctx_r12.options.description, i0.ɵɵsanitizeHtml);
} }
function SectionComponent_fieldset_1_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, SectionComponent_fieldset_1_div_2_p_1_Template, 1, 3, "p", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r7.options == null ? null : ctx_r7.options.description);
} }
function SectionComponent_fieldset_1_root_widget_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "root-widget", 5);
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("align-content", ctx_r8.getFlexAttribute("align-content"))("align-items", ctx_r8.getFlexAttribute("align-items"))("display", ctx_r8.getFlexAttribute("display"))("flex-direction", ctx_r8.getFlexAttribute("flex-direction"))("flex-wrap", ctx_r8.getFlexAttribute("flex-wrap"))("justify-content", ctx_r8.getFlexAttribute("justify-content"));
    i0.ɵɵclassProp("form-flex-column", ctx_r8.getFlexAttribute("flex-direction") === "column")("form-flex-row", ctx_r8.getFlexAttribute("flex-direction") === "row");
    i0.ɵɵproperty("dataIndex", ctx_r8.dataIndex)("layout", ctx_r8.layoutNode.items)("layoutIndex", ctx_r8.layoutIndex)("isFlexItem", ctx_r8.getFlexAttribute("is-flex"))("isOrderable", ctx_r8.options == null ? null : ctx_r8.options.orderable);
} }
function SectionComponent_fieldset_1_div_4_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p", 9);
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(3);
    i0.ɵɵclassMap((ctx_r13.options == null ? null : ctx_r13.options.labelHelpBlockClass) || "");
    i0.ɵɵproperty("innerHTML", ctx_r13.options == null ? null : ctx_r13.options.description, i0.ɵɵsanitizeHtml);
} }
function SectionComponent_fieldset_1_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, SectionComponent_fieldset_1_div_4_p_1_Template, 1, 3, "p", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r9.options == null ? null : ctx_r9.options.description);
} }
function SectionComponent_fieldset_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "fieldset", 6);
    i0.ɵɵtemplate(1, SectionComponent_fieldset_1_legend_1_Template, 1, 3, "legend", 2);
    i0.ɵɵtemplate(2, SectionComponent_fieldset_1_div_2_Template, 2, 1, "div", 7);
    i0.ɵɵtemplate(3, SectionComponent_fieldset_1_root_widget_3_Template, 1, 21, "root-widget", 3);
    i0.ɵɵtemplate(4, SectionComponent_fieldset_1_div_4_Template, 2, 1, "div", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r1.options == null ? null : ctx_r1.options.htmlClass) || "");
    i0.ɵɵclassProp("expandable", (ctx_r1.options == null ? null : ctx_r1.options.expandable) && !ctx_r1.expanded)("expanded", (ctx_r1.options == null ? null : ctx_r1.options.expandable) && ctx_r1.expanded);
    i0.ɵɵproperty("disabled", ctx_r1.options == null ? null : ctx_r1.options.readonly);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.sectionTitle);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r1.options == null ? null : ctx_r1.options.messageLocation) !== "bottom");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.expanded);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r1.options == null ? null : ctx_r1.options.messageLocation) === "bottom");
} }
class SectionComponent {
    jsf;
    options;
    expanded = true;
    containerType;
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
    }
    get sectionTitle() {
        return this.options.notitle ? null : this.jsf.setItemTitle(this);
    }
    ngOnInit() {
        this.jsf.initializeControl(this);
        this.options = this.layoutNode.options || {};
        this.expanded = typeof this.options.expanded === 'boolean' ?
            this.options.expanded : !this.options.expandable;
        switch (this.layoutNode.type) {
            case 'fieldset':
            case 'array':
            case 'tab':
            case 'advancedfieldset':
            case 'authfieldset':
            case 'optionfieldset':
            case 'selectfieldset':
                this.containerType = 'fieldset';
                break;
            default:
                this.containerType = 'div';
                break;
        }
    }
    toggleExpanded() {
        if (this.options.expandable) {
            this.expanded = !this.expanded;
        }
    }
    getFlexAttribute(attribute) {
        const flexActive = this.layoutNode.type === 'flex' ||
            !!this.options.displayFlex ||
            this.options.display === 'flex';
        if (attribute !== 'flex' && !flexActive) {
            return null;
        }
        switch (attribute) {
            case 'is-flex':
                return flexActive;
            case 'display':
                return flexActive ? 'flex' : 'initial';
            case 'flex-direction':
            case 'flex-wrap':
                const index = ['flex-direction', 'flex-wrap'].indexOf(attribute);
                return (this.options['flex-flow'] || '').split(/\s+/)[index] ||
                    this.options[attribute] || ['column', 'nowrap'][index];
            case 'justify-content':
            case 'align-items':
            case 'align-content':
                return this.options[attribute];
        }
    }
    static ɵfac = function SectionComponent_Factory(t) { return new (t || SectionComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
    static ɵcmp = i0.ɵɵdefineComponent({ type: SectionComponent, selectors: [["section-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 2, vars: 2, consts: [[3, "class", "expandable", "expanded", 4, "ngIf"], [3, "class", "expandable", "expanded", "disabled", 4, "ngIf"], ["class", "legend", 3, "class", "innerHTML", "click", 4, "ngIf"], [3, "dataIndex", "layout", "layoutIndex", "isFlexItem", "isOrderable", "form-flex-column", "form-flex-row", "align-content", "align-items", "display", "flex-direction", "flex-wrap", "justify-content", 4, "ngIf"], [1, "legend", 3, "innerHTML", "click"], [3, "dataIndex", "layout", "layoutIndex", "isFlexItem", "isOrderable"], [3, "disabled"], [4, "ngIf"], ["class", "help-block", 3, "class", "innerHTML", 4, "ngIf"], [1, "help-block", 3, "innerHTML"]], template: function SectionComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, SectionComponent_div_0_Template, 3, 8, "div", 0);
            i0.ɵɵtemplate(1, SectionComponent_fieldset_1_Template, 5, 11, "fieldset", 1);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.containerType === "div");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.containerType === "fieldset");
        } }, dependencies: [i2.NgIf, i3.RootComponent], styles: [".legend[_ngcontent-%COMP%]{font-weight:700}.expandable[_ngcontent-%COMP%] > legend[_ngcontent-%COMP%]:before, .expandable[_ngcontent-%COMP%] > label[_ngcontent-%COMP%]:before{content:\"\\25b6\";padding-right:.3em}.expanded[_ngcontent-%COMP%] > legend[_ngcontent-%COMP%]:before, .expanded[_ngcontent-%COMP%] > label[_ngcontent-%COMP%]:before{content:\"\\25bc\";padding-right:.2em}"] });
}
export { SectionComponent };
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SectionComponent, [{
        type: Component,
        args: [{ selector: 'section-widget', template: `
      <div *ngIf="containerType === 'div'"
           [class]="options?.htmlClass || ''"
           [class.expandable]="options?.expandable && !expanded"
           [class.expanded]="options?.expandable && expanded">
          <label *ngIf="sectionTitle"
                 class="legend"
                 [class]="options?.labelHtmlClass || ''"
                 [innerHTML]="sectionTitle"
                 (click)="toggleExpanded()"></label>
          <root-widget *ngIf="expanded"
                       [dataIndex]="dataIndex"
                       [layout]="layoutNode.items"
                       [layoutIndex]="layoutIndex"
                       [isFlexItem]="getFlexAttribute('is-flex')"
                       [isOrderable]="options?.orderable"
                       [class.form-flex-column]="getFlexAttribute('flex-direction') === 'column'"
                       [class.form-flex-row]="getFlexAttribute('flex-direction') === 'row'"
                       [style.align-content]="getFlexAttribute('align-content')"
                       [style.align-items]="getFlexAttribute('align-items')"
                       [style.display]="getFlexAttribute('display')"
                       [style.flex-direction]="getFlexAttribute('flex-direction')"
                       [style.flex-wrap]="getFlexAttribute('flex-wrap')"
                       [style.justify-content]="getFlexAttribute('justify-content')"></root-widget>
      </div>
      <fieldset *ngIf="containerType === 'fieldset'"
                [class]="options?.htmlClass || ''"
                [class.expandable]="options?.expandable && !expanded"
                [class.expanded]="options?.expandable && expanded"
                [disabled]="options?.readonly">
          <legend *ngIf="sectionTitle"
                  class="legend"
                  [class]="options?.labelHtmlClass || ''"
                  [innerHTML]="sectionTitle"
                  (click)="toggleExpanded()"></legend>
          <div *ngIf="options?.messageLocation !== 'bottom'">
              <p *ngIf="options?.description"
                 class="help-block"
                 [class]="options?.labelHelpBlockClass || ''"
                 [innerHTML]="options?.description"></p>
          </div>
          <root-widget *ngIf="expanded"
                       [dataIndex]="dataIndex"
                       [layout]="layoutNode.items"
                       [layoutIndex]="layoutIndex"
                       [isFlexItem]="getFlexAttribute('is-flex')"
                       [isOrderable]="options?.orderable"
                       [class.form-flex-column]="getFlexAttribute('flex-direction') === 'column'"
                       [class.form-flex-row]="getFlexAttribute('flex-direction') === 'row'"
                       [style.align-content]="getFlexAttribute('align-content')"
                       [style.align-items]="getFlexAttribute('align-items')"
                       [style.display]="getFlexAttribute('display')"
                       [style.flex-direction]="getFlexAttribute('flex-direction')"
                       [style.flex-wrap]="getFlexAttribute('flex-wrap')"
                       [style.justify-content]="getFlexAttribute('justify-content')"></root-widget>
          <div *ngIf="options?.messageLocation === 'bottom'">
              <p *ngIf="options?.description"
                 class="help-block"
                 [class]="options?.labelHelpBlockClass || ''"
                 [innerHTML]="options?.description"></p>
          </div>
      </fieldset>`, styles: [".legend{font-weight:700}.expandable>legend:before,.expandable>label:before{content:\"\\25b6\";padding-right:.3em}.expanded>legend:before,.expanded>label:before{content:\"\\25bc\";padding-right:.2em}\n"] }]
    }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLXdpZGdldC1saWJyYXJ5L3NyYy9saWIvY29tcG9uZW50cy9zZWN0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQTtBQUN0RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQTs7Ozs7OztJQVNoRSxnQ0FJa0M7SUFBM0IscUtBQVMsZUFBQSx1QkFBZ0IsQ0FBQSxJQUFDO0lBQUMsaUJBQVE7OztJQUZuQyxvRkFBdUM7SUFDdkMsa0VBQTBCOzs7SUFFakMsaUNBYXlGOzs7SUFMNUUseUVBQXlELHVEQUFBLCtDQUFBLDZEQUFBLG1EQUFBLCtEQUFBO0lBRnpELDBGQUEwRSxzRUFBQTtJQUwxRSw0Q0FBdUIsbUNBQUEsbUNBQUEsa0RBQUEseUVBQUE7OztJQVZ4QywyQkFHd0Q7SUFDcEQsMkVBSTBDO0lBQzFDLHdGQWF5RjtJQUM3RixpQkFBTTs7O0lBdEJELCtFQUFrQztJQUNsQyw2R0FBcUQsNEZBQUE7SUFFOUMsZUFBa0I7SUFBbEIsMENBQWtCO0lBS1osZUFBYztJQUFkLHNDQUFjOzs7O0lBb0I1QixpQ0FJbUM7SUFBM0IsOEtBQVMsZUFBQSx3QkFBZ0IsQ0FBQSxJQUFDO0lBQUMsaUJBQVM7OztJQUZwQyxvRkFBdUM7SUFDdkMsa0VBQTBCOzs7SUFHOUIsdUJBRzBDOzs7SUFEdkMsMkZBQTRDO0lBQzVDLDJHQUFrQzs7O0lBSnpDLDJCQUFtRDtJQUMvQyw4RUFHMEM7SUFDOUMsaUJBQU07OztJQUpFLGVBQTBCO0lBQTFCLGlGQUEwQjs7O0lBS2xDLGlDQWF5Rjs7O0lBTDVFLHlFQUF5RCx1REFBQSwrQ0FBQSw2REFBQSxtREFBQSwrREFBQTtJQUZ6RCwwRkFBMEUsc0VBQUE7SUFM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QUFXO2dCQUNkLE1BQU0sS0FBSyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO2dCQUNoRSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDO29CQUMxRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQzFELEtBQUssaUJBQWlCLENBQUM7WUFDdkIsS0FBSyxhQUFhLENBQUM7WUFDbkIsS0FBSyxlQUFlO2dCQUNsQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7U0FDakM7SUFDSCxDQUFDOzBFQXJFVSxnQkFBZ0I7K0NBQWhCLGdCQUFnQjtZQW5FdkIsaUVBdUJNO1lBQ04sNEVBb0NXOztZQTVETCxrREFBNkI7WUF3QnhCLGVBQWtDO1lBQWxDLHVEQUFrQzs7O1NBMkN0QyxnQkFBZ0I7dUZBQWhCLGdCQUFnQjtjQXRFNUIsU0FBUzsyQkFDRSxnQkFBZ0IsWUFDaEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBNkRNO3dFQVdQLFVBQVU7a0JBQWxCLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2VjdGlvbi13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPGRpdiAqbmdJZj1cImNvbnRhaW5lclR5cGUgPT09ICdkaXYnXCJcbiAgICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/Lmh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgICAgIFtjbGFzcy5leHBhbmRhYmxlXT1cIm9wdGlvbnM/LmV4cGFuZGFibGUgJiYgIWV4cGFuZGVkXCJcbiAgICAgICAgICAgW2NsYXNzLmV4cGFuZGVkXT1cIm9wdGlvbnM/LmV4cGFuZGFibGUgJiYgZXhwYW5kZWRcIj5cbiAgICAgICAgICA8bGFiZWwgKm5nSWY9XCJzZWN0aW9uVGl0bGVcIlxuICAgICAgICAgICAgICAgICBjbGFzcz1cImxlZ2VuZFwiXG4gICAgICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5sYWJlbEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwic2VjdGlvblRpdGxlXCJcbiAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZUV4cGFuZGVkKClcIj48L2xhYmVsPlxuICAgICAgICAgIDxyb290LXdpZGdldCAqbmdJZj1cImV4cGFuZGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2RhdGFJbmRleF09XCJkYXRhSW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICBbbGF5b3V0XT1cImxheW91dE5vZGUuaXRlbXNcIlxuICAgICAgICAgICAgICAgICAgICAgICBbbGF5b3V0SW5kZXhdPVwibGF5b3V0SW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICBbaXNGbGV4SXRlbV09XCJnZXRGbGV4QXR0cmlidXRlKCdpcy1mbGV4JylcIlxuICAgICAgICAgICAgICAgICAgICAgICBbaXNPcmRlcmFibGVdPVwib3B0aW9ucz8ub3JkZXJhYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmZvcm0tZmxleC1jb2x1bW5dPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC1kaXJlY3Rpb24nKSA9PT0gJ2NvbHVtbidcIlxuICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MuZm9ybS1mbGV4LXJvd109XCJnZXRGbGV4QXR0cmlidXRlKCdmbGV4LWRpcmVjdGlvbicpID09PSAncm93J1wiXG4gICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5hbGlnbi1jb250ZW50XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2FsaWduLWNvbnRlbnQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5hbGlnbi1pdGVtc109XCJnZXRGbGV4QXR0cmlidXRlKCdhbGlnbi1pdGVtcycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZGlzcGxheScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmZsZXgtZGlyZWN0aW9uXT1cImdldEZsZXhBdHRyaWJ1dGUoJ2ZsZXgtZGlyZWN0aW9uJylcIlxuICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuZmxleC13cmFwXT1cImdldEZsZXhBdHRyaWJ1dGUoJ2ZsZXgtd3JhcCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmp1c3RpZnktY29udGVudF09XCJnZXRGbGV4QXR0cmlidXRlKCdqdXN0aWZ5LWNvbnRlbnQnKVwiPjwvcm9vdC13aWRnZXQ+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxmaWVsZHNldCAqbmdJZj1cImNvbnRhaW5lclR5cGUgPT09ICdmaWVsZHNldCdcIlxuICAgICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5odG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5leHBhbmRhYmxlXT1cIm9wdGlvbnM/LmV4cGFuZGFibGUgJiYgIWV4cGFuZGVkXCJcbiAgICAgICAgICAgICAgICBbY2xhc3MuZXhwYW5kZWRdPVwib3B0aW9ucz8uZXhwYW5kYWJsZSAmJiBleHBhbmRlZFwiXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIm9wdGlvbnM/LnJlYWRvbmx5XCI+XG4gICAgICAgICAgPGxlZ2VuZCAqbmdJZj1cInNlY3Rpb25UaXRsZVwiXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImxlZ2VuZFwiXG4gICAgICAgICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8ubGFiZWxIdG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJzZWN0aW9uVGl0bGVcIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZUV4cGFuZGVkKClcIj48L2xlZ2VuZD5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwib3B0aW9ucz8ubWVzc2FnZUxvY2F0aW9uICE9PSAnYm90dG9tJ1wiPlxuICAgICAgICAgICAgICA8cCAqbmdJZj1cIm9wdGlvbnM/LmRlc2NyaXB0aW9uXCJcbiAgICAgICAgICAgICAgICAgY2xhc3M9XCJoZWxwLWJsb2NrXCJcbiAgICAgICAgICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmxhYmVsSGVscEJsb2NrQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmRlc2NyaXB0aW9uXCI+PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxyb290LXdpZGdldCAqbmdJZj1cImV4cGFuZGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2RhdGFJbmRleF09XCJkYXRhSW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICBbbGF5b3V0XT1cImxheW91dE5vZGUuaXRlbXNcIlxuICAgICAgICAgICAgICAgICAgICAgICBbbGF5b3V0SW5kZXhdPVwibGF5b3V0SW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICBbaXNGbGV4SXRlbV09XCJnZXRGbGV4QXR0cmlidXRlKCdpcy1mbGV4JylcIlxuICAgICAgICAgICAgICAgICAgICAgICBbaXNPcmRlcmFibGVdPVwib3B0aW9ucz8ub3JkZXJhYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmZvcm0tZmxleC1jb2x1bW5dPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC1kaXJlY3Rpb24nKSA9PT0gJ2NvbHVtbidcIlxuICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MuZm9ybS1mbGV4LXJvd109XCJnZXRGbGV4QXR0cmlidXRlKCdmbGV4LWRpcmVjdGlvbicpID09PSAncm93J1wiXG4gICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5hbGlnbi1jb250ZW50XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2FsaWduLWNvbnRlbnQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5hbGlnbi1pdGVtc109XCJnZXRGbGV4QXR0cmlidXRlKCdhbGlnbi1pdGVtcycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZGlzcGxheScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmZsZXgtZGlyZWN0aW9uXT1cImdldEZsZXhBdHRyaWJ1dGUoJ2ZsZXgtZGlyZWN0aW9uJylcIlxuICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuZmxleC13cmFwXT1cImdldEZsZXhBdHRyaWJ1dGUoJ2ZsZXgtd3JhcCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmp1c3RpZnktY29udGVudF09XCJnZXRGbGV4QXR0cmlidXRlKCdqdXN0aWZ5LWNvbnRlbnQnKVwiPjwvcm9vdC13aWRnZXQ+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cIm9wdGlvbnM/Lm1lc3NhZ2VMb2NhdGlvbiA9PT0gJ2JvdHRvbSdcIj5cbiAgICAgICAgICAgICAgPHAgKm5nSWY9XCJvcHRpb25zPy5kZXNjcmlwdGlvblwiXG4gICAgICAgICAgICAgICAgIGNsYXNzPVwiaGVscC1ibG9ja1wiXG4gICAgICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5sYWJlbEhlbHBCbG9ja0NsYXNzIHx8ICcnXCJcbiAgICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5kZXNjcmlwdGlvblwiPjwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZmllbGRzZXQ+YCxcbiAgc3R5bGVzOiBbYFxuICAgIC5sZWdlbmQgeyBmb250LXdlaWdodDogYm9sZDsgfVxuICAgIC5leHBhbmRhYmxlID4gbGVnZW5kOmJlZm9yZSwgLmV4cGFuZGFibGUgPiBsYWJlbDpiZWZvcmUgIHsgY29udGVudDogJ+KWtic7IHBhZGRpbmctcmlnaHQ6IC4zZW07IH1cbiAgICAuZXhwYW5kZWQgPiBsZWdlbmQ6YmVmb3JlLCAuZXhwYW5kZWQgPiBsYWJlbDpiZWZvcmUgIHsgY29udGVudDogJ+KWvCc7IHBhZGRpbmctcmlnaHQ6IC4yZW07IH1cbiAgYF0sXG59KVxuZXhwb3J0IGNsYXNzIFNlY3Rpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBvcHRpb25zOiBhbnlcbiAgZXhwYW5kZWQgPSB0cnVlXG4gIGNvbnRhaW5lclR5cGU6IHN0cmluZ1xuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgZ2V0IHNlY3Rpb25UaXRsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLm5vdGl0bGUgPyBudWxsIDogdGhpcy5qc2Yuc2V0SXRlbVRpdGxlKHRoaXMpXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmpzZi5pbml0aWFsaXplQ29udHJvbCh0aGlzKVxuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9XG4gICAgdGhpcy5leHBhbmRlZCA9IHR5cGVvZiB0aGlzLm9wdGlvbnMuZXhwYW5kZWQgPT09ICdib29sZWFuJyA/XG4gICAgICB0aGlzLm9wdGlvbnMuZXhwYW5kZWQgOiAhdGhpcy5vcHRpb25zLmV4cGFuZGFibGVcbiAgICBzd2l0Y2ggKHRoaXMubGF5b3V0Tm9kZS50eXBlKSB7XG4gICAgICBjYXNlICdmaWVsZHNldCc6XG4gICAgICBjYXNlICdhcnJheSc6XG4gICAgICBjYXNlICd0YWInOlxuICAgICAgY2FzZSAnYWR2YW5jZWRmaWVsZHNldCc6XG4gICAgICBjYXNlICdhdXRoZmllbGRzZXQnOlxuICAgICAgY2FzZSAnb3B0aW9uZmllbGRzZXQnOlxuICAgICAgY2FzZSAnc2VsZWN0ZmllbGRzZXQnOlxuICAgICAgICB0aGlzLmNvbnRhaW5lclR5cGUgPSAnZmllbGRzZXQnXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OiAvLyAnZGl2JywgJ2ZsZXgnLCAnc2VjdGlvbicsICdjb25kaXRpb25hbCcsICdhY3Rpb25zJywgJ3RhZ3NpbnB1dCdcbiAgICAgICAgdGhpcy5jb250YWluZXJUeXBlID0gJ2RpdidcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICB0b2dnbGVFeHBhbmRlZCgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmV4cGFuZGFibGUpIHtcbiAgICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZFxuICAgIH1cbiAgfVxuXG4gIC8vIFNldCBhdHRyaWJ1dGVzIGZvciBmbGV4Ym94IGNvbnRhaW5lclxuICAvLyAoY2hpbGQgYXR0cmlidXRlcyBhcmUgc2V0IGluIHJvb3QuY29tcG9uZW50KVxuICBnZXRGbGV4QXR0cmlidXRlKGF0dHJpYnV0ZTogc3RyaW5nKSB7XG4gICAgY29uc3QgZmxleEFjdGl2ZTogYm9vbGVhbiA9XG4gICAgICB0aGlzLmxheW91dE5vZGUudHlwZSA9PT0gJ2ZsZXgnIHx8XG4gICAgICAhIXRoaXMub3B0aW9ucy5kaXNwbGF5RmxleCB8fFxuICAgICAgdGhpcy5vcHRpb25zLmRpc3BsYXkgPT09ICdmbGV4J1xuICAgIGlmIChhdHRyaWJ1dGUgIT09ICdmbGV4JyAmJiAhZmxleEFjdGl2ZSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgc3dpdGNoIChhdHRyaWJ1dGUpIHtcbiAgICAgIGNhc2UgJ2lzLWZsZXgnOlxuICAgICAgICByZXR1cm4gZmxleEFjdGl2ZVxuICAgICAgY2FzZSAnZGlzcGxheSc6XG4gICAgICAgIHJldHVybiBmbGV4QWN0aXZlID8gJ2ZsZXgnIDogJ2luaXRpYWwnXG4gICAgICBjYXNlICdmbGV4LWRpcmVjdGlvbic6XG4gICAgICBjYXNlICdmbGV4LXdyYXAnOlxuICAgICAgICBjb25zdCBpbmRleCA9IFsnZmxleC1kaXJlY3Rpb24nLCAnZmxleC13cmFwJ10uaW5kZXhPZihhdHRyaWJ1dGUpXG4gICAgICAgIHJldHVybiAodGhpcy5vcHRpb25zWydmbGV4LWZsb3cnXSB8fCAnJykuc3BsaXQoL1xccysvKVtpbmRleF0gfHxcbiAgICAgICAgICB0aGlzLm9wdGlvbnNbYXR0cmlidXRlXSB8fCBbJ2NvbHVtbicsICdub3dyYXAnXVtpbmRleF1cbiAgICAgIGNhc2UgJ2p1c3RpZnktY29udGVudCc6XG4gICAgICBjYXNlICdhbGlnbi1pdGVtcyc6XG4gICAgICBjYXNlICdhbGlnbi1jb250ZW50JzpcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uc1thdHRyaWJ1dGVdXG4gICAgfVxuICB9XG59XG4iXX0=