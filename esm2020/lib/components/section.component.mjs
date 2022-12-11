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
export class SectionComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.expanded = true;
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
}
SectionComponent.ɵfac = function SectionComponent_Factory(t) { return new (t || SectionComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
SectionComponent.ɵcmp = i0.ɵɵdefineComponent({ type: SectionComponent, selectors: [["section-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 2, vars: 2, consts: [[3, "class", "expandable", "expanded", 4, "ngIf"], [3, "class", "expandable", "expanded", "disabled", 4, "ngIf"], ["class", "legend", 3, "class", "innerHTML", "click", 4, "ngIf"], [3, "dataIndex", "layout", "layoutIndex", "isFlexItem", "isOrderable", "form-flex-column", "form-flex-row", "align-content", "align-items", "display", "flex-direction", "flex-wrap", "justify-content", 4, "ngIf"], [1, "legend", 3, "innerHTML", "click"], [3, "dataIndex", "layout", "layoutIndex", "isFlexItem", "isOrderable"], [3, "disabled"], [4, "ngIf"], ["class", "help-block", 3, "class", "innerHTML", 4, "ngIf"], [1, "help-block", 3, "innerHTML"]], template: function SectionComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, SectionComponent_div_0_Template, 3, 8, "div", 0);
        i0.ɵɵtemplate(1, SectionComponent_fieldset_1_Template, 5, 11, "fieldset", 1);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.containerType === "div");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.containerType === "fieldset");
    } }, dependencies: [i2.NgIf, i3.RootComponent], styles: [".legend[_ngcontent-%COMP%]{font-weight:700}.expandable[_ngcontent-%COMP%] > legend[_ngcontent-%COMP%]:before, .expandable[_ngcontent-%COMP%] > label[_ngcontent-%COMP%]:before{content:\"\\25b6\";padding-right:.3em}.expanded[_ngcontent-%COMP%] > legend[_ngcontent-%COMP%]:before, .expanded[_ngcontent-%COMP%] > label[_ngcontent-%COMP%]:before{content:\"\\25bc\";padding-right:.2em}"] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLXdpZGdldC1saWJyYXJ5L3NyYy9saWIvY29tcG9uZW50cy9zZWN0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQTtBQUN0RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQTs7Ozs7OztJQVNoRSxnQ0FJa0M7SUFBM0IscUtBQVMsZUFBQSx1QkFBZ0IsQ0FBQSxJQUFDO0lBQUMsaUJBQVE7OztJQUZuQyxvRkFBdUM7SUFDdkMsa0VBQTBCOzs7SUFFakMsaUNBYXlGOzs7SUFMNUUseUVBQXlELHVEQUFBLCtDQUFBLDZEQUFBLG1EQUFBLCtEQUFBO0lBRnpELDBGQUEwRSxzRUFBQTtJQUwxRSw0Q0FBdUIsbUNBQUEsbUNBQUEsa0RBQUEseUVBQUE7OztJQVZ4QywyQkFHd0Q7SUFDcEQsMkVBSTBDO0lBQzFDLHdGQWF5RjtJQUM3RixpQkFBTTs7O0lBdEJELCtFQUFrQztJQUNsQyw2R0FBcUQsNEZBQUE7SUFFOUMsZUFBa0I7SUFBbEIsMENBQWtCO0lBS1osZUFBYztJQUFkLHNDQUFjOzs7O0lBb0I1QixpQ0FJbUM7SUFBM0IsOEtBQVMsZUFBQSx3QkFBZ0IsQ0FBQSxJQUFDO0lBQUMsaUJBQVM7OztJQUZwQyxvRkFBdUM7SUFDdkMsa0VBQTBCOzs7SUFHOUIsdUJBRzBDOzs7SUFEdkMsMkZBQTRDO0lBQzVDLDJHQUFrQzs7O0lBSnpDLDJCQUFtRDtJQUMvQyw4RUFHMEM7SUFDOUMsaUJBQU07OztJQUpFLGVBQTBCO0lBQTFCLGlGQUEwQjs7O0lBS2xDLGlDQWF5Rjs7O0lBTDVFLHlFQUF5RCx1REFBQSwrQ0FBQSw2REFBQSxtREFBQSwrREFBQTtJQUZ6RCwwRkFBMEUsc0VBQUE7SUFM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QUE7Z0JBQ2hFLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUM7b0JBQzFELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDMUQsS0FBSyxpQkFBaUIsQ0FBQztZQUN2QixLQUFLLGFBQWEsQ0FBQztZQUNuQixLQUFLLGVBQWU7Z0JBQ2xCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtTQUNqQztJQUNILENBQUM7O2dGQXJFVSxnQkFBZ0I7cURBQWhCLGdCQUFnQjtRQW5FdkIsaUVBdUJNO1FBQ04sNEVBb0NXOztRQTVETCxrREFBNkI7UUF3QnhCLGVBQWtDO1FBQWxDLHVEQUFrQzs7dUZBMkN0QyxnQkFBZ0I7Y0F0RTVCLFNBQVM7MkJBQ0UsZ0JBQWdCLFlBQ2hCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQTZETTt3RUFXUCxVQUFVO2tCQUFsQixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9qc29uLXNjaGVtYS1mb3JtLnNlcnZpY2UnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NlY3Rpb24td2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxkaXYgKm5nSWY9XCJjb250YWluZXJUeXBlID09PSAnZGl2J1wiXG4gICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5odG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICBbY2xhc3MuZXhwYW5kYWJsZV09XCJvcHRpb25zPy5leHBhbmRhYmxlICYmICFleHBhbmRlZFwiXG4gICAgICAgICAgIFtjbGFzcy5leHBhbmRlZF09XCJvcHRpb25zPy5leHBhbmRhYmxlICYmIGV4cGFuZGVkXCI+XG4gICAgICAgICAgPGxhYmVsICpuZ0lmPVwic2VjdGlvblRpdGxlXCJcbiAgICAgICAgICAgICAgICAgY2xhc3M9XCJsZWdlbmRcIlxuICAgICAgICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8ubGFiZWxIdG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cInNlY3Rpb25UaXRsZVwiXG4gICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVFeHBhbmRlZCgpXCI+PC9sYWJlbD5cbiAgICAgICAgICA8cm9vdC13aWRnZXQgKm5nSWY9XCJleHBhbmRlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtkYXRhSW5kZXhdPVwiZGF0YUluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2xheW91dF09XCJsYXlvdXROb2RlLml0ZW1zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2xheW91dEluZGV4XT1cImxheW91dEluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2lzRmxleEl0ZW1dPVwiZ2V0RmxleEF0dHJpYnV0ZSgnaXMtZmxleCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2lzT3JkZXJhYmxlXT1cIm9wdGlvbnM/Lm9yZGVyYWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5mb3JtLWZsZXgtY29sdW1uXT1cImdldEZsZXhBdHRyaWJ1dGUoJ2ZsZXgtZGlyZWN0aW9uJykgPT09ICdjb2x1bW4nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmZvcm0tZmxleC1yb3ddPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC1kaXJlY3Rpb24nKSA9PT0gJ3JvdydcIlxuICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuYWxpZ24tY29udGVudF09XCJnZXRGbGV4QXR0cmlidXRlKCdhbGlnbi1jb250ZW50JylcIlxuICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuYWxpZ24taXRlbXNdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnYWxpZ24taXRlbXMnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2Rpc3BsYXknKVwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5mbGV4LWRpcmVjdGlvbl09XCJnZXRGbGV4QXR0cmlidXRlKCdmbGV4LWRpcmVjdGlvbicpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmZsZXgtd3JhcF09XCJnZXRGbGV4QXR0cmlidXRlKCdmbGV4LXdyYXAnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5qdXN0aWZ5LWNvbnRlbnRdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnanVzdGlmeS1jb250ZW50JylcIj48L3Jvb3Qtd2lkZ2V0PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZmllbGRzZXQgKm5nSWY9XCJjb250YWluZXJUeXBlID09PSAnZmllbGRzZXQnXCJcbiAgICAgICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8uaHRtbENsYXNzIHx8ICcnXCJcbiAgICAgICAgICAgICAgICBbY2xhc3MuZXhwYW5kYWJsZV09XCJvcHRpb25zPy5leHBhbmRhYmxlICYmICFleHBhbmRlZFwiXG4gICAgICAgICAgICAgICAgW2NsYXNzLmV4cGFuZGVkXT1cIm9wdGlvbnM/LmV4cGFuZGFibGUgJiYgZXhwYW5kZWRcIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJvcHRpb25zPy5yZWFkb25seVwiPlxuICAgICAgICAgIDxsZWdlbmQgKm5nSWY9XCJzZWN0aW9uVGl0bGVcIlxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJsZWdlbmRcIlxuICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmxhYmVsSHRtbENsYXNzIHx8ICcnXCJcbiAgICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwic2VjdGlvblRpdGxlXCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVFeHBhbmRlZCgpXCI+PC9sZWdlbmQ+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cIm9wdGlvbnM/Lm1lc3NhZ2VMb2NhdGlvbiAhPT0gJ2JvdHRvbSdcIj5cbiAgICAgICAgICAgICAgPHAgKm5nSWY9XCJvcHRpb25zPy5kZXNjcmlwdGlvblwiXG4gICAgICAgICAgICAgICAgIGNsYXNzPVwiaGVscC1ibG9ja1wiXG4gICAgICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5sYWJlbEhlbHBCbG9ja0NsYXNzIHx8ICcnXCJcbiAgICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5kZXNjcmlwdGlvblwiPjwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8cm9vdC13aWRnZXQgKm5nSWY9XCJleHBhbmRlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtkYXRhSW5kZXhdPVwiZGF0YUluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2xheW91dF09XCJsYXlvdXROb2RlLml0ZW1zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2xheW91dEluZGV4XT1cImxheW91dEluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2lzRmxleEl0ZW1dPVwiZ2V0RmxleEF0dHJpYnV0ZSgnaXMtZmxleCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2lzT3JkZXJhYmxlXT1cIm9wdGlvbnM/Lm9yZGVyYWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5mb3JtLWZsZXgtY29sdW1uXT1cImdldEZsZXhBdHRyaWJ1dGUoJ2ZsZXgtZGlyZWN0aW9uJykgPT09ICdjb2x1bW4nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmZvcm0tZmxleC1yb3ddPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC1kaXJlY3Rpb24nKSA9PT0gJ3JvdydcIlxuICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuYWxpZ24tY29udGVudF09XCJnZXRGbGV4QXR0cmlidXRlKCdhbGlnbi1jb250ZW50JylcIlxuICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuYWxpZ24taXRlbXNdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnYWxpZ24taXRlbXMnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2Rpc3BsYXknKVwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5mbGV4LWRpcmVjdGlvbl09XCJnZXRGbGV4QXR0cmlidXRlKCdmbGV4LWRpcmVjdGlvbicpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmZsZXgtd3JhcF09XCJnZXRGbGV4QXR0cmlidXRlKCdmbGV4LXdyYXAnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5qdXN0aWZ5LWNvbnRlbnRdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnanVzdGlmeS1jb250ZW50JylcIj48L3Jvb3Qtd2lkZ2V0PlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJvcHRpb25zPy5tZXNzYWdlTG9jYXRpb24gPT09ICdib3R0b20nXCI+XG4gICAgICAgICAgICAgIDxwICpuZ0lmPVwib3B0aW9ucz8uZGVzY3JpcHRpb25cIlxuICAgICAgICAgICAgICAgICBjbGFzcz1cImhlbHAtYmxvY2tcIlxuICAgICAgICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8ubGFiZWxIZWxwQmxvY2tDbGFzcyB8fCAnJ1wiXG4gICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZGVzY3JpcHRpb25cIj48L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L2ZpZWxkc2V0PmAsXG4gIHN0eWxlczogW2BcbiAgICAubGVnZW5kIHsgZm9udC13ZWlnaHQ6IGJvbGQ7IH1cbiAgICAuZXhwYW5kYWJsZSA+IGxlZ2VuZDpiZWZvcmUsIC5leHBhbmRhYmxlID4gbGFiZWw6YmVmb3JlICB7IGNvbnRlbnQ6ICfilrYnOyBwYWRkaW5nLXJpZ2h0OiAuM2VtOyB9XG4gICAgLmV4cGFuZGVkID4gbGVnZW5kOmJlZm9yZSwgLmV4cGFuZGVkID4gbGFiZWw6YmVmb3JlICB7IGNvbnRlbnQ6ICfilrwnOyBwYWRkaW5nLXJpZ2h0OiAuMmVtOyB9XG4gIGBdLFxufSlcbmV4cG9ydCBjbGFzcyBTZWN0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgb3B0aW9uczogYW55XG4gIGV4cGFuZGVkID0gdHJ1ZVxuICBjb250YWluZXJUeXBlOiBzdHJpbmdcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHtcbiAgfVxuXG4gIGdldCBzZWN0aW9uVGl0bGUoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5ub3RpdGxlID8gbnVsbCA6IHRoaXMuanNmLnNldEl0ZW1UaXRsZSh0aGlzKVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5qc2YuaW5pdGlhbGl6ZUNvbnRyb2wodGhpcylcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmxheW91dE5vZGUub3B0aW9ucyB8fCB7fVxuICAgIHRoaXMuZXhwYW5kZWQgPSB0eXBlb2YgdGhpcy5vcHRpb25zLmV4cGFuZGVkID09PSAnYm9vbGVhbicgP1xuICAgICAgdGhpcy5vcHRpb25zLmV4cGFuZGVkIDogIXRoaXMub3B0aW9ucy5leHBhbmRhYmxlXG4gICAgc3dpdGNoICh0aGlzLmxheW91dE5vZGUudHlwZSkge1xuICAgICAgY2FzZSAnZmllbGRzZXQnOlxuICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgY2FzZSAndGFiJzpcbiAgICAgIGNhc2UgJ2FkdmFuY2VkZmllbGRzZXQnOlxuICAgICAgY2FzZSAnYXV0aGZpZWxkc2V0JzpcbiAgICAgIGNhc2UgJ29wdGlvbmZpZWxkc2V0JzpcbiAgICAgIGNhc2UgJ3NlbGVjdGZpZWxkc2V0JzpcbiAgICAgICAgdGhpcy5jb250YWluZXJUeXBlID0gJ2ZpZWxkc2V0J1xuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDogLy8gJ2RpdicsICdmbGV4JywgJ3NlY3Rpb24nLCAnY29uZGl0aW9uYWwnLCAnYWN0aW9ucycsICd0YWdzaW5wdXQnXG4gICAgICAgIHRoaXMuY29udGFpbmVyVHlwZSA9ICdkaXYnXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlRXhwYW5kZWQoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5leHBhbmRhYmxlKSB7XG4gICAgICB0aGlzLmV4cGFuZGVkID0gIXRoaXMuZXhwYW5kZWRcbiAgICB9XG4gIH1cblxuICAvLyBTZXQgYXR0cmlidXRlcyBmb3IgZmxleGJveCBjb250YWluZXJcbiAgLy8gKGNoaWxkIGF0dHJpYnV0ZXMgYXJlIHNldCBpbiByb290LmNvbXBvbmVudClcbiAgZ2V0RmxleEF0dHJpYnV0ZShhdHRyaWJ1dGU6IHN0cmluZykge1xuICAgIGNvbnN0IGZsZXhBY3RpdmU6IGJvb2xlYW4gPVxuICAgICAgdGhpcy5sYXlvdXROb2RlLnR5cGUgPT09ICdmbGV4JyB8fFxuICAgICAgISF0aGlzLm9wdGlvbnMuZGlzcGxheUZsZXggfHxcbiAgICAgIHRoaXMub3B0aW9ucy5kaXNwbGF5ID09PSAnZmxleCdcbiAgICBpZiAoYXR0cmlidXRlICE9PSAnZmxleCcgJiYgIWZsZXhBY3RpdmUpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHN3aXRjaCAoYXR0cmlidXRlKSB7XG4gICAgICBjYXNlICdpcy1mbGV4JzpcbiAgICAgICAgcmV0dXJuIGZsZXhBY3RpdmVcbiAgICAgIGNhc2UgJ2Rpc3BsYXknOlxuICAgICAgICByZXR1cm4gZmxleEFjdGl2ZSA/ICdmbGV4JyA6ICdpbml0aWFsJ1xuICAgICAgY2FzZSAnZmxleC1kaXJlY3Rpb24nOlxuICAgICAgY2FzZSAnZmxleC13cmFwJzpcbiAgICAgICAgY29uc3QgaW5kZXggPSBbJ2ZsZXgtZGlyZWN0aW9uJywgJ2ZsZXgtd3JhcCddLmluZGV4T2YoYXR0cmlidXRlKVxuICAgICAgICByZXR1cm4gKHRoaXMub3B0aW9uc1snZmxleC1mbG93J10gfHwgJycpLnNwbGl0KC9cXHMrLylbaW5kZXhdIHx8XG4gICAgICAgICAgdGhpcy5vcHRpb25zW2F0dHJpYnV0ZV0gfHwgWydjb2x1bW4nLCAnbm93cmFwJ11baW5kZXhdXG4gICAgICBjYXNlICdqdXN0aWZ5LWNvbnRlbnQnOlxuICAgICAgY2FzZSAnYWxpZ24taXRlbXMnOlxuICAgICAgY2FzZSAnYWxpZ24tY29udGVudCc6XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnNbYXR0cmlidXRlXVxuICAgIH1cbiAgfVxufVxuIl19