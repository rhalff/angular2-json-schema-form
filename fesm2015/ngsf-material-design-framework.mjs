import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, Input, Injectable, NgModule } from '@angular/core';
import * as i1 from '@ngsf/widget-library';
import { buildTitleMap, WidgetLibraryModule } from '@ngsf/widget-library';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/flex-layout/flex';
import * as i4 from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import * as i5 from '@angular/material/expansion';
import { MatExpansionModule } from '@angular/material/expansion';
import * as i4$1 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i3$1 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import { hasOwn, stringToDate, dateToString, isArray, isDefined, Framework } from '@ngsf/common';
import * as i4$2 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i3$2 from '@angular/material/button-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import * as i3$3 from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i4$3 from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as i6 from '@angular/material/slide-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import * as i4$4 from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import * as i5$1 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i4$5 from '@angular/material/autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import * as i4$6 from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import * as i5$2 from '@angular/material/radio';
import { MatRadioModule } from '@angular/material/radio';
import * as i6$1 from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import * as i5$3 from '@angular/material/slider';
import { MatSliderModule } from '@angular/material/slider';
import * as i3$4 from '@angular/material/tabs';
import { MatTabsModule } from '@angular/material/tabs';
import * as _ from 'lodash';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';

const _c0$1 = function () { return []; };
function FlexLayoutRootComponent_div_0_select_framework_widget_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "select-framework-widget", 3);
    }
    if (rf & 2) {
        const ctx_r4 = i0.ɵɵnextContext();
        const layoutNode_r1 = ctx_r4.$implicit;
        const i_r2 = ctx_r4.index;
        const ctx_r3 = i0.ɵɵnextContext();
        i0.ɵɵproperty("dataIndex", (layoutNode_r1 == null ? null : layoutNode_r1.arrayItem) ? (ctx_r3.dataIndex || i0.ɵɵpureFunction0(3, _c0$1)).concat(i_r2) : ctx_r3.dataIndex || i0.ɵɵpureFunction0(4, _c0$1))("layoutIndex", (ctx_r3.layoutIndex || i0.ɵɵpureFunction0(5, _c0$1)).concat(i_r2))("layoutNode", layoutNode_r1);
    }
}
const _c1 = function () { return {}; };
function FlexLayoutRootComponent_div_0_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 1);
        i0.ɵɵtemplate(1, FlexLayoutRootComponent_div_0_select_framework_widget_1_Template, 1, 6, "select-framework-widget", 2);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const layoutNode_r1 = ctx.$implicit;
        const ctx_r0 = i0.ɵɵnextContext();
        i0.ɵɵstyleProp("flex-grow", ctx_r0.getFlexAttribute(layoutNode_r1, "flex-grow"))("flex-shrink", ctx_r0.getFlexAttribute(layoutNode_r1, "flex-shrink"))("flex-basis", ctx_r0.getFlexAttribute(layoutNode_r1, "flex-basis"))("align-self", ((layoutNode_r1 == null ? null : layoutNode_r1.options) || i0.ɵɵpureFunction0(17, _c1))["align-self"])("order", layoutNode_r1 == null ? null : layoutNode_r1.options == null ? null : layoutNode_r1.options.order);
        i0.ɵɵclassProp("form-flex-item", ctx_r0.isFlexItem);
        i0.ɵɵproperty("fxFlex", layoutNode_r1 == null ? null : layoutNode_r1.options == null ? null : layoutNode_r1.options.fxFlex)("fxFlexOrder", layoutNode_r1 == null ? null : layoutNode_r1.options == null ? null : layoutNode_r1.options.fxFlexOrder)("fxFlexOffset", layoutNode_r1 == null ? null : layoutNode_r1.options == null ? null : layoutNode_r1.options.fxFlexOffset)("fxFlexAlign", layoutNode_r1 == null ? null : layoutNode_r1.options == null ? null : layoutNode_r1.options.fxFlexAlign);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r0.showWidget(layoutNode_r1));
    }
}
class FlexLayoutRootComponent {
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
FlexLayoutRootComponent.ɵcmp = i0.ɵɵdefineComponent({ type: FlexLayoutRootComponent, selectors: [["flex-layout-root-widget"]], inputs: { dataIndex: "dataIndex", layoutIndex: "layoutIndex", layout: "layout", isFlexItem: "isFlexItem" }, decls: 1, vars: 1, consts: [[3, "form-flex-item", "flex-grow", "flex-shrink", "flex-basis", "align-self", "order", "fxFlex", "fxFlexOrder", "fxFlexOffset", "fxFlexAlign", 4, "ngFor", "ngForOf"], [3, "fxFlex", "fxFlexOrder", "fxFlexOffset", "fxFlexAlign"], [3, "dataIndex", "layoutIndex", "layoutNode", 4, "ngIf"], [3, "dataIndex", "layoutIndex", "layoutNode"]], template: function FlexLayoutRootComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵtemplate(0, FlexLayoutRootComponent_div_0_Template, 2, 18, "div", 0);
        }
        if (rf & 2) {
            i0.ɵɵproperty("ngForOf", ctx.layout);
        }
    }, dependencies: [i2.NgForOf, i2.NgIf, i3.DefaultFlexOrderDirective, i3.DefaultFlexOffsetDirective, i3.DefaultFlexAlignDirective, i3.DefaultFlexDirective, i1.SelectFrameworkComponent], encapsulation: 2 });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FlexLayoutRootComponent, [{
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
            }] });
})();

function FlexLayoutSectionComponent_div_0_label_1_Template(rf, ctx) {
    if (rf & 1) {
        const _r8 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "label", 6);
        i0.ɵɵlistener("click", function FlexLayoutSectionComponent_div_0_label_1_Template_label_click_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r7.toggleExpanded()); });
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r4 = i0.ɵɵnextContext(2);
        i0.ɵɵclassMap("legend " + ((ctx_r4.options == null ? null : ctx_r4.options.labelHtmlClass) || ""));
        i0.ɵɵproperty("innerHTML", ctx_r4.sectionTitle, i0.ɵɵsanitizeHtml);
    }
}
function FlexLayoutSectionComponent_div_0_flex_layout_root_widget_2_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "flex-layout-root-widget", 7);
    }
    if (rf & 2) {
        const ctx_r5 = i0.ɵɵnextContext(2);
        i0.ɵɵstyleProp("display", ctx_r5.getFlexAttribute("display"))("flex-direction", ctx_r5.getFlexAttribute("flex-direction"))("flex-wrap", ctx_r5.getFlexAttribute("flex-wrap"))("justify-content", ctx_r5.getFlexAttribute("justify-content"))("align-items", ctx_r5.getFlexAttribute("align-items"))("align-content", ctx_r5.getFlexAttribute("align-content"));
        i0.ɵɵclassProp("form-flex-column", ctx_r5.getFlexAttribute("flex-direction") === "column")("form-flex-row", ctx_r5.getFlexAttribute("flex-direction") === "row");
        i0.ɵɵproperty("layout", ctx_r5.layoutNode.items)("dataIndex", ctx_r5.dataIndex)("layoutIndex", ctx_r5.layoutIndex)("isFlexItem", ctx_r5.getFlexAttribute("is-flex"))("fxLayout", ctx_r5.getFlexAttribute("layout"))("fxLayoutGap", ctx_r5.options == null ? null : ctx_r5.options.fxLayoutGap)("fxLayoutAlign", ctx_r5.options == null ? null : ctx_r5.options.fxLayoutAlign);
        i0.ɵɵattribute("fxFlexFill", ctx_r5.options == null ? null : ctx_r5.options.fxLayoutAlign);
    }
}
function FlexLayoutSectionComponent_div_0_mat_error_3_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "mat-error", 8);
    }
    if (rf & 2) {
        const ctx_r6 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("innerHTML", ctx_r6.options == null ? null : ctx_r6.options.errorMessage, i0.ɵɵsanitizeHtml);
    }
}
function FlexLayoutSectionComponent_div_0_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "div");
        i0.ɵɵtemplate(1, FlexLayoutSectionComponent_div_0_label_1_Template, 1, 3, "label", 3);
        i0.ɵɵtemplate(2, FlexLayoutSectionComponent_div_0_flex_layout_root_widget_2_Template, 1, 24, "flex-layout-root-widget", 4);
        i0.ɵɵtemplate(3, FlexLayoutSectionComponent_div_0_mat_error_3_Template, 1, 1, "mat-error", 5);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r0 = i0.ɵɵnextContext();
        i0.ɵɵclassMap((ctx_r0.options == null ? null : ctx_r0.options.htmlClass) || "");
        i0.ɵɵclassProp("expandable", (ctx_r0.options == null ? null : ctx_r0.options.expandable) && !ctx_r0.expanded)("expanded", (ctx_r0.options == null ? null : ctx_r0.options.expandable) && ctx_r0.expanded);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r0.sectionTitle);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r0.expanded);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx_r0.options == null ? null : ctx_r0.options.showErrors) && (ctx_r0.options == null ? null : ctx_r0.options.errorMessage));
    }
}
function FlexLayoutSectionComponent_fieldset_1_legend_1_Template(rf, ctx) {
    if (rf & 1) {
        const _r13 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "legend", 6);
        i0.ɵɵlistener("click", function FlexLayoutSectionComponent_fieldset_1_legend_1_Template_legend_click_0_listener() { i0.ɵɵrestoreView(_r13); const ctx_r12 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r12.toggleExpanded()); });
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r9 = i0.ɵɵnextContext(2);
        i0.ɵɵclassMap("legend " + ((ctx_r9.options == null ? null : ctx_r9.options.labelHtmlClass) || ""));
        i0.ɵɵproperty("innerHTML", ctx_r9.sectionTitle, i0.ɵɵsanitizeHtml);
    }
}
function FlexLayoutSectionComponent_fieldset_1_flex_layout_root_widget_2_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "flex-layout-root-widget", 7);
    }
    if (rf & 2) {
        const ctx_r10 = i0.ɵɵnextContext(2);
        i0.ɵɵstyleProp("display", ctx_r10.getFlexAttribute("display"))("flex-direction", ctx_r10.getFlexAttribute("flex-direction"))("flex-wrap", ctx_r10.getFlexAttribute("flex-wrap"))("justify-content", ctx_r10.getFlexAttribute("justify-content"))("align-items", ctx_r10.getFlexAttribute("align-items"))("align-content", ctx_r10.getFlexAttribute("align-content"));
        i0.ɵɵclassProp("form-flex-column", ctx_r10.getFlexAttribute("flex-direction") === "column")("form-flex-row", ctx_r10.getFlexAttribute("flex-direction") === "row");
        i0.ɵɵproperty("layout", ctx_r10.layoutNode.items)("dataIndex", ctx_r10.dataIndex)("layoutIndex", ctx_r10.layoutIndex)("isFlexItem", ctx_r10.getFlexAttribute("is-flex"))("fxLayout", ctx_r10.getFlexAttribute("layout"))("fxLayoutGap", ctx_r10.options == null ? null : ctx_r10.options.fxLayoutGap)("fxLayoutAlign", ctx_r10.options == null ? null : ctx_r10.options.fxLayoutAlign);
        i0.ɵɵattribute("fxFlexFill", ctx_r10.options == null ? null : ctx_r10.options.fxLayoutAlign);
    }
}
function FlexLayoutSectionComponent_fieldset_1_mat_error_3_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "mat-error", 8);
    }
    if (rf & 2) {
        const ctx_r11 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("innerHTML", ctx_r11.options == null ? null : ctx_r11.options.errorMessage, i0.ɵɵsanitizeHtml);
    }
}
function FlexLayoutSectionComponent_fieldset_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "fieldset", 9);
        i0.ɵɵtemplate(1, FlexLayoutSectionComponent_fieldset_1_legend_1_Template, 1, 3, "legend", 3);
        i0.ɵɵtemplate(2, FlexLayoutSectionComponent_fieldset_1_flex_layout_root_widget_2_Template, 1, 24, "flex-layout-root-widget", 4);
        i0.ɵɵtemplate(3, FlexLayoutSectionComponent_fieldset_1_mat_error_3_Template, 1, 1, "mat-error", 5);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r1 = i0.ɵɵnextContext();
        i0.ɵɵclassMap((ctx_r1.options == null ? null : ctx_r1.options.htmlClass) || "");
        i0.ɵɵclassProp("expandable", (ctx_r1.options == null ? null : ctx_r1.options.expandable) && !ctx_r1.expanded)("expanded", (ctx_r1.options == null ? null : ctx_r1.options.expandable) && ctx_r1.expanded);
        i0.ɵɵproperty("disabled", ctx_r1.options == null ? null : ctx_r1.options.readonly);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r1.sectionTitle);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r1.expanded);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx_r1.options == null ? null : ctx_r1.options.showErrors) && (ctx_r1.options == null ? null : ctx_r1.options.errorMessage));
    }
}
function FlexLayoutSectionComponent_mat_card_2_mat_card_header_1_Template(rf, ctx) {
    if (rf & 1) {
        const _r18 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "mat-card-header")(1, "legend", 6);
        i0.ɵɵlistener("click", function FlexLayoutSectionComponent_mat_card_2_mat_card_header_1_Template_legend_click_1_listener() { i0.ɵɵrestoreView(_r18); const ctx_r17 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r17.toggleExpanded()); });
        i0.ɵɵelementEnd()();
    }
    if (rf & 2) {
        const ctx_r14 = i0.ɵɵnextContext(2);
        i0.ɵɵadvance(1);
        i0.ɵɵclassMap("legend " + ((ctx_r14.options == null ? null : ctx_r14.options.labelHtmlClass) || ""));
        i0.ɵɵproperty("innerHTML", ctx_r14.sectionTitle, i0.ɵɵsanitizeHtml);
    }
}
function FlexLayoutSectionComponent_mat_card_2_mat_card_content_2_flex_layout_root_widget_2_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "flex-layout-root-widget", 7);
    }
    if (rf & 2) {
        const ctx_r19 = i0.ɵɵnextContext(3);
        i0.ɵɵstyleProp("display", ctx_r19.getFlexAttribute("display"))("flex-direction", ctx_r19.getFlexAttribute("flex-direction"))("flex-wrap", ctx_r19.getFlexAttribute("flex-wrap"))("justify-content", ctx_r19.getFlexAttribute("justify-content"))("align-items", ctx_r19.getFlexAttribute("align-items"))("align-content", ctx_r19.getFlexAttribute("align-content"));
        i0.ɵɵclassProp("form-flex-column", ctx_r19.getFlexAttribute("flex-direction") === "column")("form-flex-row", ctx_r19.getFlexAttribute("flex-direction") === "row");
        i0.ɵɵproperty("layout", ctx_r19.layoutNode.items)("dataIndex", ctx_r19.dataIndex)("layoutIndex", ctx_r19.layoutIndex)("isFlexItem", ctx_r19.getFlexAttribute("is-flex"))("fxLayout", ctx_r19.getFlexAttribute("layout"))("fxLayoutGap", ctx_r19.options == null ? null : ctx_r19.options.fxLayoutGap)("fxLayoutAlign", ctx_r19.options == null ? null : ctx_r19.options.fxLayoutAlign);
        i0.ɵɵattribute("fxFlexFill", ctx_r19.options == null ? null : ctx_r19.options.fxLayoutAlign);
    }
}
function FlexLayoutSectionComponent_mat_card_2_mat_card_content_2_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "mat-card-content")(1, "fieldset", 9);
        i0.ɵɵtemplate(2, FlexLayoutSectionComponent_mat_card_2_mat_card_content_2_flex_layout_root_widget_2_Template, 1, 24, "flex-layout-root-widget", 4);
        i0.ɵɵelementEnd()();
    }
    if (rf & 2) {
        const ctx_r15 = i0.ɵɵnextContext(2);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("disabled", ctx_r15.options == null ? null : ctx_r15.options.readonly);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r15.expanded);
    }
}
function FlexLayoutSectionComponent_mat_card_2_mat_error_4_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "mat-error", 8);
    }
    if (rf & 2) {
        const ctx_r16 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("innerHTML", ctx_r16.options == null ? null : ctx_r16.options.errorMessage, i0.ɵɵsanitizeHtml);
    }
}
function FlexLayoutSectionComponent_mat_card_2_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "mat-card");
        i0.ɵɵtemplate(1, FlexLayoutSectionComponent_mat_card_2_mat_card_header_1_Template, 2, 3, "mat-card-header", 10);
        i0.ɵɵtemplate(2, FlexLayoutSectionComponent_mat_card_2_mat_card_content_2_Template, 3, 2, "mat-card-content", 10);
        i0.ɵɵelementStart(3, "mat-card-footer");
        i0.ɵɵtemplate(4, FlexLayoutSectionComponent_mat_card_2_mat_error_4_Template, 1, 1, "mat-error", 5);
        i0.ɵɵelementEnd()();
    }
    if (rf & 2) {
        const ctx_r2 = i0.ɵɵnextContext();
        i0.ɵɵclassMap((ctx_r2.options == null ? null : ctx_r2.options.htmlClass) || "");
        i0.ɵɵclassProp("expandable", (ctx_r2.options == null ? null : ctx_r2.options.expandable) && !ctx_r2.expanded)("expanded", (ctx_r2.options == null ? null : ctx_r2.options.expandable) && ctx_r2.expanded);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r2.sectionTitle);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r2.expanded);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", (ctx_r2.options == null ? null : ctx_r2.options.showErrors) && (ctx_r2.options == null ? null : ctx_r2.options.errorMessage));
    }
}
function FlexLayoutSectionComponent_mat_expansion_panel_3_legend_3_Template(rf, ctx) {
    if (rf & 1) {
        const _r24 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "legend", 6);
        i0.ɵɵlistener("click", function FlexLayoutSectionComponent_mat_expansion_panel_3_legend_3_Template_legend_click_0_listener() { i0.ɵɵrestoreView(_r24); const ctx_r23 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r23.toggleExpanded()); });
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r20 = i0.ɵɵnextContext(2);
        i0.ɵɵclassMap(ctx_r20.options == null ? null : ctx_r20.options.labelHtmlClass);
        i0.ɵɵproperty("innerHTML", ctx_r20.sectionTitle, i0.ɵɵsanitizeHtml);
    }
}
function FlexLayoutSectionComponent_mat_expansion_panel_3_flex_layout_root_widget_5_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "flex-layout-root-widget", 7);
    }
    if (rf & 2) {
        const ctx_r21 = i0.ɵɵnextContext(2);
        i0.ɵɵstyleProp("display", ctx_r21.getFlexAttribute("display"))("flex-direction", ctx_r21.getFlexAttribute("flex-direction"))("flex-wrap", ctx_r21.getFlexAttribute("flex-wrap"))("justify-content", ctx_r21.getFlexAttribute("justify-content"))("align-items", ctx_r21.getFlexAttribute("align-items"))("align-content", ctx_r21.getFlexAttribute("align-content"));
        i0.ɵɵclassProp("form-flex-column", ctx_r21.getFlexAttribute("flex-direction") === "column")("form-flex-row", ctx_r21.getFlexAttribute("flex-direction") === "row");
        i0.ɵɵproperty("layout", ctx_r21.layoutNode.items)("dataIndex", ctx_r21.dataIndex)("layoutIndex", ctx_r21.layoutIndex)("isFlexItem", ctx_r21.getFlexAttribute("is-flex"))("fxLayout", ctx_r21.getFlexAttribute("layout"))("fxLayoutGap", ctx_r21.options == null ? null : ctx_r21.options.fxLayoutGap)("fxLayoutAlign", ctx_r21.options == null ? null : ctx_r21.options.fxLayoutAlign);
        i0.ɵɵattribute("fxFlexFill", ctx_r21.options == null ? null : ctx_r21.options.fxLayoutAlign);
    }
}
function FlexLayoutSectionComponent_mat_expansion_panel_3_mat_error_6_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "mat-error", 8);
    }
    if (rf & 2) {
        const ctx_r22 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("innerHTML", ctx_r22.options == null ? null : ctx_r22.options.errorMessage, i0.ɵɵsanitizeHtml);
    }
}
function FlexLayoutSectionComponent_mat_expansion_panel_3_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "mat-expansion-panel", 11)(1, "mat-expansion-panel-header")(2, "mat-panel-title");
        i0.ɵɵtemplate(3, FlexLayoutSectionComponent_mat_expansion_panel_3_legend_3_Template, 1, 3, "legend", 3);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(4, "fieldset", 9);
        i0.ɵɵtemplate(5, FlexLayoutSectionComponent_mat_expansion_panel_3_flex_layout_root_widget_5_Template, 1, 24, "flex-layout-root-widget", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(6, FlexLayoutSectionComponent_mat_expansion_panel_3_mat_error_6_Template, 1, 1, "mat-error", 5);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r3 = i0.ɵɵnextContext();
        i0.ɵɵproperty("expanded", ctx_r3.expanded)("hideToggle", !(ctx_r3.options == null ? null : ctx_r3.options.expandable));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx_r3.sectionTitle);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("disabled", ctx_r3.options == null ? null : ctx_r3.options.readonly);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r3.expanded);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx_r3.options == null ? null : ctx_r3.options.showErrors) && (ctx_r3.options == null ? null : ctx_r3.options.errorMessage));
    }
}
class FlexLayoutSectionComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.expanded = true;
        this.containerType = 'div';
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
            case 'section':
            case 'array':
            case 'fieldset':
            case 'advancedfieldset':
            case 'authfieldset':
            case 'optionfieldset':
            case 'selectfieldset':
                this.containerType = 'fieldset';
                break;
            case 'card':
                this.containerType = 'card';
                break;
            case 'expansion-panel':
                this.containerType = 'expansion-panel';
                break;
            default:
                this.containerType = 'div';
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
            case 'layout':
                return (this.options.fxLayout || 'row') +
                    this.options.fxLayoutWrap ? ' ' + this.options.fxLayoutWrap : '';
        }
    }
}
FlexLayoutSectionComponent.ɵfac = function FlexLayoutSectionComponent_Factory(t) { return new (t || FlexLayoutSectionComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
FlexLayoutSectionComponent.ɵcmp = i0.ɵɵdefineComponent({ type: FlexLayoutSectionComponent, selectors: [["flex-layout-section-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 4, vars: 4, consts: [[3, "class", "expandable", "expanded", 4, "ngIf"], [3, "class", "expandable", "expanded", "disabled", 4, "ngIf"], [3, "expanded", "hideToggle", 4, "ngIf"], [3, "class", "innerHTML", "click", 4, "ngIf"], [3, "layout", "dataIndex", "layoutIndex", "isFlexItem", "form-flex-column", "form-flex-row", "display", "flex-direction", "flex-wrap", "justify-content", "align-items", "align-content", "fxLayout", "fxLayoutGap", "fxLayoutAlign", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], [3, "innerHTML", "click"], [3, "layout", "dataIndex", "layoutIndex", "isFlexItem", "fxLayout", "fxLayoutGap", "fxLayoutAlign"], [3, "innerHTML"], [3, "disabled"], [4, "ngIf"], [3, "expanded", "hideToggle"]], template: function FlexLayoutSectionComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵtemplate(0, FlexLayoutSectionComponent_div_0_Template, 4, 9, "div", 0);
            i0.ɵɵtemplate(1, FlexLayoutSectionComponent_fieldset_1_Template, 4, 10, "fieldset", 1);
            i0.ɵɵtemplate(2, FlexLayoutSectionComponent_mat_card_2_Template, 5, 9, "mat-card", 0);
            i0.ɵɵtemplate(3, FlexLayoutSectionComponent_mat_expansion_panel_3_Template, 7, 6, "mat-expansion-panel", 2);
        }
        if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.containerType === "div");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.containerType === "fieldset");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.containerType === "card");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.containerType === "expansion-panel");
        }
    }, dependencies: [i2.NgIf, i3.DefaultLayoutDirective, i3.DefaultLayoutGapDirective, i3.DefaultLayoutAlignDirective, i3.FlexFillDirective, i4.MatCard, i4.MatCardContent, i4.MatCardFooter, i4.MatCardHeader, i5.MatExpansionPanel, i5.MatExpansionPanelHeader, i5.MatExpansionPanelTitle, i4$1.MatError, FlexLayoutRootComponent], styles: ["fieldset[_ngcontent-%COMP%]{border:0;margin:0;padding:0}.legend[_ngcontent-%COMP%]{font-weight:700}.expandable[_ngcontent-%COMP%] > .legend[_ngcontent-%COMP%]:before{content:\"\\25b6\";padding-right:.3em}.expanded[_ngcontent-%COMP%] > .legend[_ngcontent-%COMP%]:before{content:\"\\25bc\";padding-right:.2em}"] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FlexLayoutSectionComponent, [{
            type: Component,
            args: [{ selector: 'flex-layout-section-widget', template: `
      <div *ngIf="containerType === 'div'"
           [class]="options?.htmlClass || ''"
           [class.expandable]="options?.expandable && !expanded"
           [class.expanded]="options?.expandable && expanded">
          <label *ngIf="sectionTitle"
                 [class]="'legend ' + (options?.labelHtmlClass || '')"
                 [innerHTML]="sectionTitle"
                 (click)="toggleExpanded()"></label>
          <flex-layout-root-widget *ngIf="expanded"
                                   [layout]="layoutNode.items"
                                   [dataIndex]="dataIndex"
                                   [layoutIndex]="layoutIndex"
                                   [isFlexItem]="getFlexAttribute('is-flex')"
                                   [class.form-flex-column]="getFlexAttribute('flex-direction') === 'column'"
                                   [class.form-flex-row]="getFlexAttribute('flex-direction') === 'row'"
                                   [style.display]="getFlexAttribute('display')"
                                   [style.flex-direction]="getFlexAttribute('flex-direction')"
                                   [style.flex-wrap]="getFlexAttribute('flex-wrap')"
                                   [style.justify-content]="getFlexAttribute('justify-content')"
                                   [style.align-items]="getFlexAttribute('align-items')"
                                   [style.align-content]="getFlexAttribute('align-content')"
                                   [fxLayout]="getFlexAttribute('layout')"
                                   [fxLayoutGap]="options?.fxLayoutGap"
                                   [fxLayoutAlign]="options?.fxLayoutAlign"
                                   [attr.fxFlexFill]="options?.fxLayoutAlign"></flex-layout-root-widget>
          <mat-error *ngIf="options?.showErrors && options?.errorMessage"
                     [innerHTML]="options?.errorMessage"></mat-error>
      </div>

      <fieldset *ngIf="containerType === 'fieldset'"
                [class]="options?.htmlClass || ''"
                [class.expandable]="options?.expandable && !expanded"
                [class.expanded]="options?.expandable && expanded"
                [disabled]="options?.readonly">
          <legend *ngIf="sectionTitle"
                  [class]="'legend ' + (options?.labelHtmlClass || '')"
                  [innerHTML]="sectionTitle"
                  (click)="toggleExpanded()"></legend>
          <flex-layout-root-widget *ngIf="expanded"
                                   [layout]="layoutNode.items"
                                   [dataIndex]="dataIndex"
                                   [layoutIndex]="layoutIndex"
                                   [isFlexItem]="getFlexAttribute('is-flex')"
                                   [class.form-flex-column]="getFlexAttribute('flex-direction') === 'column'"
                                   [class.form-flex-row]="getFlexAttribute('flex-direction') === 'row'"
                                   [style.display]="getFlexAttribute('display')"
                                   [style.flex-direction]="getFlexAttribute('flex-direction')"
                                   [style.flex-wrap]="getFlexAttribute('flex-wrap')"
                                   [style.justify-content]="getFlexAttribute('justify-content')"
                                   [style.align-items]="getFlexAttribute('align-items')"
                                   [style.align-content]="getFlexAttribute('align-content')"
                                   [fxLayout]="getFlexAttribute('layout')"
                                   [fxLayoutGap]="options?.fxLayoutGap"
                                   [fxLayoutAlign]="options?.fxLayoutAlign"
                                   [attr.fxFlexFill]="options?.fxLayoutAlign"></flex-layout-root-widget>
          <mat-error *ngIf="options?.showErrors && options?.errorMessage"
                     [innerHTML]="options?.errorMessage"></mat-error>
      </fieldset>

      <mat-card *ngIf="containerType === 'card'"
                [class]="options?.htmlClass || ''"
                [class.expandable]="options?.expandable && !expanded"
                [class.expanded]="options?.expandable && expanded">
          <mat-card-header *ngIf="sectionTitle">
              <legend
                      [class]="'legend ' + (options?.labelHtmlClass || '')"
                      [innerHTML]="sectionTitle"
                      (click)="toggleExpanded()"></legend>
          </mat-card-header>
          <mat-card-content *ngIf="expanded">
              <fieldset [disabled]="options?.readonly">
                  <flex-layout-root-widget *ngIf="expanded"
                                           [layout]="layoutNode.items"
                                           [dataIndex]="dataIndex"
                                           [layoutIndex]="layoutIndex"
                                           [isFlexItem]="getFlexAttribute('is-flex')"
                                           [class.form-flex-column]="getFlexAttribute('flex-direction') === 'column'"
                                           [class.form-flex-row]="getFlexAttribute('flex-direction') === 'row'"
                                           [style.display]="getFlexAttribute('display')"
                                           [style.flex-direction]="getFlexAttribute('flex-direction')"
                                           [style.flex-wrap]="getFlexAttribute('flex-wrap')"
                                           [style.justify-content]="getFlexAttribute('justify-content')"
                                           [style.align-items]="getFlexAttribute('align-items')"
                                           [style.align-content]="getFlexAttribute('align-content')"
                                           [fxLayout]="getFlexAttribute('layout')"
                                           [fxLayoutGap]="options?.fxLayoutGap"
                                           [fxLayoutAlign]="options?.fxLayoutAlign"
                                           [attr.fxFlexFill]="options?.fxLayoutAlign"></flex-layout-root-widget>
              </fieldset>
          </mat-card-content>
          <mat-card-footer>
              <mat-error *ngIf="options?.showErrors && options?.errorMessage"
                         [innerHTML]="options?.errorMessage"></mat-error>
          </mat-card-footer>
      </mat-card>

      <mat-expansion-panel *ngIf="containerType === 'expansion-panel'"
                           [expanded]="expanded"
                           [hideToggle]="!options?.expandable">
          <mat-expansion-panel-header>
              <mat-panel-title>
                  <legend *ngIf="sectionTitle"
                          [class]="options?.labelHtmlClass"
                          [innerHTML]="sectionTitle"
                          (click)="toggleExpanded()"></legend>
              </mat-panel-title>
          </mat-expansion-panel-header>
          <fieldset [disabled]="options?.readonly">
              <flex-layout-root-widget *ngIf="expanded"
                                       [layout]="layoutNode.items"
                                       [dataIndex]="dataIndex"
                                       [layoutIndex]="layoutIndex"
                                       [isFlexItem]="getFlexAttribute('is-flex')"
                                       [class.form-flex-column]="getFlexAttribute('flex-direction') === 'column'"
                                       [class.form-flex-row]="getFlexAttribute('flex-direction') === 'row'"
                                       [style.display]="getFlexAttribute('display')"
                                       [style.flex-direction]="getFlexAttribute('flex-direction')"
                                       [style.flex-wrap]="getFlexAttribute('flex-wrap')"
                                       [style.justify-content]="getFlexAttribute('justify-content')"
                                       [style.align-items]="getFlexAttribute('align-items')"
                                       [style.align-content]="getFlexAttribute('align-content')"
                                       [fxLayout]="getFlexAttribute('layout')"
                                       [fxLayoutGap]="options?.fxLayoutGap"
                                       [fxLayoutAlign]="options?.fxLayoutAlign"
                                       [attr.fxFlexFill]="options?.fxLayoutAlign"></flex-layout-root-widget>
          </fieldset>
          <mat-error *ngIf="options?.showErrors && options?.errorMessage"
                     [innerHTML]="options?.errorMessage"></mat-error>
      </mat-expansion-panel>`, styles: ["fieldset{border:0;margin:0;padding:0}.legend{font-weight:700}.expandable>.legend:before{content:\"\\25b6\";padding-right:.3em}.expanded>.legend:before{content:\"\\25bc\";padding-right:.2em}\n"] }]
        }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] });
})();

function MaterialAddReferenceComponent_button_1_span_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "span");
    }
    if (rf & 2) {
        const ctx_r1 = i0.ɵɵnextContext(2);
        i0.ɵɵclassMap(ctx_r1.options == null ? null : ctx_r1.options.icon);
    }
}
function MaterialAddReferenceComponent_button_1_span_2_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "span", 5);
    }
    if (rf & 2) {
        const ctx_r2 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("innerHTML", ctx_r2.buttonText, i0.ɵɵsanitizeHtml);
    }
}
function MaterialAddReferenceComponent_button_1_Template(rf, ctx) {
    if (rf & 1) {
        const _r4 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "button", 2);
        i0.ɵɵlistener("click", function MaterialAddReferenceComponent_button_1_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.addItem($event)); });
        i0.ɵɵtemplate(1, MaterialAddReferenceComponent_button_1_span_1_Template, 1, 2, "span", 3);
        i0.ɵɵtemplate(2, MaterialAddReferenceComponent_button_1_span_2_Template, 1, 1, "span", 4);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r0 = i0.ɵɵnextContext();
        i0.ɵɵproperty("color", (ctx_r0.options == null ? null : ctx_r0.options.color) || "accent")("disabled", ctx_r0.options == null ? null : ctx_r0.options.readonly);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r0.options == null ? null : ctx_r0.options.icon);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r0.options == null ? null : ctx_r0.options.title);
    }
}
class MaterialAddReferenceComponent {
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
}
MaterialAddReferenceComponent.ɵfac = function MaterialAddReferenceComponent_Factory(t) { return new (t || MaterialAddReferenceComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialAddReferenceComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialAddReferenceComponent, selectors: [["material-add-reference-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 2, vars: 3, consts: [["align", "end"], ["mat-raised-button", "", 3, "color", "disabled", "click", 4, "ngIf"], ["mat-raised-button", "", 3, "color", "disabled", "click"], [3, "class", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], [3, "innerHTML"]], template: function MaterialAddReferenceComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0);
            i0.ɵɵtemplate(1, MaterialAddReferenceComponent_button_1_Template, 3, 4, "button", 1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.htmlClass) || "");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.showAddButton);
        }
    }, dependencies: [i2.NgIf, i3$1.MatButton], encapsulation: 2 });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialAddReferenceComponent, [{
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
            }] });
})();

function MaterialButtonComponent_mat_icon_2_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "mat-icon", 4);
        i0.ɵɵtext(1);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r0 = i0.ɵɵnextContext();
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx_r0.options == null ? null : ctx_r0.options.icon);
    }
}
function MaterialButtonComponent_span_3_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "span", 5);
    }
    if (rf & 2) {
        const ctx_r1 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", ctx_r1.options == null ? null : ctx_r1.options.title, i0.ɵɵsanitizeHtml);
    }
}
class MaterialButtonComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (hasOwn(this.options, 'disabled')) {
            this.controlDisabled = this.options.disabled;
        }
        else if (this.jsf.formOptions.disableInvalidSubmit) {
            this.controlDisabled = !this.jsf.isValid;
            this.jsf.isValidChanges.subscribe(isValid => this.controlDisabled = !isValid);
        }
    }
    updateValue(event) {
        if (typeof this.options.onClick === 'function') {
            this.options.onClick(event);
        }
        else {
            this.jsf.updateValue(this, event.target.value);
        }
    }
}
MaterialButtonComponent.ɵfac = function MaterialButtonComponent_Factory(t) { return new (t || MaterialButtonComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialButtonComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialButtonComponent, selectors: [["material-button-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 4, vars: 11, consts: [[1, "button-row"], ["mat-raised-button", "", 3, "disabled", "id", "name", "type", "value", "click"], ["class", "mat-24", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], [1, "mat-24"], [3, "innerHTML"]], template: function MaterialButtonComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "button", 1);
            i0.ɵɵlistener("click", function MaterialButtonComponent_Template_button_click_1_listener($event) { return ctx.updateValue($event); });
            i0.ɵɵtemplate(2, MaterialButtonComponent_mat_icon_2_Template, 2, 1, "mat-icon", 2);
            i0.ɵɵtemplate(3, MaterialButtonComponent_span_3_Template, 1, 1, "span", 3);
            i0.ɵɵelementEnd()();
        }
        if (rf & 2) {
            i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.htmlClass) || "");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("disabled", ctx.controlDisabled || (ctx.options == null ? null : ctx.options.readonly))("id", "control" + (ctx.layoutNode == null ? null : ctx.layoutNode._id))("name", ctx.controlName)("type", ctx.layoutNode == null ? null : ctx.layoutNode.type)("value", ctx.controlValue);
            i0.ɵɵattribute("readonly", (ctx.options == null ? null : ctx.options.readonly) ? "readonly" : null)("aria-describedby", "control" + (ctx.layoutNode == null ? null : ctx.layoutNode._id) + "Status");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.icon);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.title);
        }
    }, dependencies: [i2.NgIf, i3$1.MatButton, i4$2.MatIcon], styles: ["button[_ngcontent-%COMP%]{margin-top:10px}"] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialButtonComponent, [{
            type: Component,
            args: [{ selector: 'material-button-widget', template: `
      <div class="button-row" [class]="options?.htmlClass || ''">
          <!-- [color]="options?.color || 'primary'" -->
          <button mat-raised-button
                  [attr.readonly]="options?.readonly ? 'readonly' : null"
                  [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                  [disabled]="controlDisabled || options?.readonly"
                  [id]="'control' + layoutNode?._id"
                  [name]="controlName"
                  [type]="layoutNode?.type"
                  [value]="controlValue"
                  (click)="updateValue($event)">
              <mat-icon *ngIf="options?.icon" class="mat-24">{{options?.icon}}</mat-icon>
              <span *ngIf="options?.title" [innerHTML]="options?.title"></span>
          </button>
      </div>`, styles: ["button{margin-top:10px}\n"] }]
        }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] });
})();

function MaterialButtonGroupComponent_div_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "div");
        i0.ɵɵelement(1, "label", 4);
        i0.ɵɵtext(2, " [disabled]=\"controlDisabled || options?.readonly\" ");
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r0 = i0.ɵɵnextContext();
        i0.ɵɵadvance(1);
        i0.ɵɵclassMap((ctx_r0.options == null ? null : ctx_r0.options.labelHtmlClass) || "");
        i0.ɵɵstyleProp("display", (ctx_r0.options == null ? null : ctx_r0.options.notitle) ? "none" : "");
        i0.ɵɵproperty("innerHTML", ctx_r0.options == null ? null : ctx_r0.options.title, i0.ɵɵsanitizeHtml);
        i0.ɵɵattribute("for", "control" + (ctx_r0.layoutNode == null ? null : ctx_r0.layoutNode._id));
    }
}
function MaterialButtonGroupComponent_mat_button_toggle_3_Template(rf, ctx) {
    if (rf & 1) {
        const _r5 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "mat-button-toggle", 5);
        i0.ɵɵlistener("click", function MaterialButtonGroupComponent_mat_button_toggle_3_Template_mat_button_toggle_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r5); const radioItem_r3 = restoredCtx.$implicit; const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.updateValue(radioItem_r3 == null ? null : radioItem_r3.value)); });
        i0.ɵɵelement(1, "span", 4);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const radioItem_r3 = ctx.$implicit;
        const ctx_r1 = i0.ɵɵnextContext();
        i0.ɵɵproperty("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "/" + (radioItem_r3 == null ? null : radioItem_r3.name))("value", radioItem_r3 == null ? null : radioItem_r3.value);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("innerHTML", radioItem_r3 == null ? null : radioItem_r3.name, i0.ɵɵsanitizeHtml);
    }
}
function MaterialButtonGroupComponent_mat_error_4_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "mat-error", 4);
    }
    if (rf & 2) {
        const ctx_r2 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", ctx_r2.options == null ? null : ctx_r2.options.errorMessage, i0.ɵɵsanitizeHtml);
    }
}
class MaterialButtonGroupComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.radiosList = [];
        this.vertical = false;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.radiosList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
        this.jsf.initializeControl(this);
    }
    updateValue(value) {
        this.options.showErrors = true;
        this.jsf.updateValue(this, value);
    }
}
MaterialButtonGroupComponent.ɵfac = function MaterialButtonGroupComponent_Factory(t) { return new (t || MaterialButtonGroupComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialButtonGroupComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialButtonGroupComponent, selectors: [["material-button-group-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 5, vars: 9, consts: [[4, "ngIf"], [3, "name", "value", "vertical"], [3, "id", "value", "click", 4, "ngFor", "ngForOf"], [3, "innerHTML", 4, "ngIf"], [3, "innerHTML"], [3, "id", "value", "click"]], template: function MaterialButtonGroupComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵtemplate(1, MaterialButtonGroupComponent_div_1_Template, 3, 6, "div", 0);
            i0.ɵɵelementStart(2, "mat-button-toggle-group", 1);
            i0.ɵɵtemplate(3, MaterialButtonGroupComponent_mat_button_toggle_3_Template, 2, 3, "mat-button-toggle", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(4, MaterialButtonGroupComponent_mat_error_4_Template, 1, 1, "mat-error", 3);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.title);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("name", ctx.controlName)("value", ctx.controlValue)("vertical", !!ctx.options.vertical);
            i0.ɵɵattribute("aria-describedby", "control" + (ctx.layoutNode == null ? null : ctx.layoutNode._id) + "Status")("readonly", (ctx.options == null ? null : ctx.options.readonly) ? "readonly" : null)("required", ctx.options == null ? null : ctx.options.required);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx.radiosList);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.showErrors) && (ctx.options == null ? null : ctx.options.errorMessage));
        }
    }, dependencies: [i2.NgForOf, i2.NgIf, i3$2.MatButtonToggleGroup, i3$2.MatButtonToggle, i4$1.MatError], styles: ["mat-error[_ngcontent-%COMP%]{font-size:75%}"] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialButtonGroupComponent, [{
            type: Component,
            args: [{ selector: 'material-button-group-widget', template: `
      <div>
          <div *ngIf="options?.title">
              <label
                      [attr.for]="'control' + layoutNode?._id"
                      [class]="options?.labelHtmlClass || ''"
                      [style.display]="options?.notitle ? 'none' : ''"
                      [innerHTML]="options?.title"></label>
              [disabled]="controlDisabled || options?.readonly"
          </div>
          <mat-button-toggle-group
                  [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                  [attr.readonly]="options?.readonly ? 'readonly' : null"
                  [attr.required]="options?.required"
                  [name]="controlName"
                  [value]="controlValue"
                  [vertical]="!!options.vertical">
              <mat-button-toggle *ngFor="let radioItem of radiosList"
                                 [id]="'control' + layoutNode?._id + '/' + radioItem?.name"
                                 [value]="radioItem?.value"
                                 (click)="updateValue(radioItem?.value)">
                  <span [innerHTML]="radioItem?.name"></span>
              </mat-button-toggle>
          </mat-button-toggle-group>
          <mat-error *ngIf="options?.showErrors && options?.errorMessage"
                     [innerHTML]="options?.errorMessage"></mat-error>
      </div>`, styles: ["mat-error{font-size:75%}\n"] }]
        }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] });
})();

function MaterialCheckboxComponent_mat_checkbox_0_span_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "span", 5);
    }
    if (rf & 2) {
        const ctx_r5 = i0.ɵɵnextContext(2);
        i0.ɵɵstyleProp("display", (ctx_r5.options == null ? null : ctx_r5.options.notitle) ? "none" : "");
        i0.ɵɵproperty("innerHTML", ctx_r5.options == null ? null : ctx_r5.options.title, i0.ɵɵsanitizeHtml);
    }
}
function MaterialCheckboxComponent_mat_checkbox_0_Template(rf, ctx) {
    if (rf & 1) {
        const _r7 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "mat-checkbox", 3);
        i0.ɵɵlistener("blur", function MaterialCheckboxComponent_mat_checkbox_0_Template_mat_checkbox_blur_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r6 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r6.options.showErrors = true); });
        i0.ɵɵtemplate(1, MaterialCheckboxComponent_mat_checkbox_0_span_1_Template, 1, 3, "span", 4);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r0 = i0.ɵɵnextContext();
        i0.ɵɵproperty("formControl", ctx_r0.formControl)("color", (ctx_r0.options == null ? null : ctx_r0.options.color) || "primary")("id", "control" + (ctx_r0.layoutNode == null ? null : ctx_r0.layoutNode._id))("name", ctx_r0.controlName);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r0.options == null ? null : ctx_r0.options.title);
    }
}
function MaterialCheckboxComponent_mat_checkbox_1_span_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "span", 5);
    }
    if (rf & 2) {
        const ctx_r8 = i0.ɵɵnextContext(2);
        i0.ɵɵstyleProp("display", (ctx_r8.options == null ? null : ctx_r8.options.notitle) ? "none" : "");
        i0.ɵɵproperty("innerHTML", ctx_r8.options == null ? null : ctx_r8.options.title, i0.ɵɵsanitizeHtml);
    }
}
function MaterialCheckboxComponent_mat_checkbox_1_Template(rf, ctx) {
    if (rf & 1) {
        const _r10 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "mat-checkbox", 6);
        i0.ɵɵlistener("blur", function MaterialCheckboxComponent_mat_checkbox_1_Template_mat_checkbox_blur_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r9.options.showErrors = true); })("change", function MaterialCheckboxComponent_mat_checkbox_1_Template_mat_checkbox_change_0_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r11 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r11.updateValue($event)); });
        i0.ɵɵtemplate(1, MaterialCheckboxComponent_mat_checkbox_1_span_1_Template, 1, 3, "span", 4);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r1 = i0.ɵɵnextContext();
        i0.ɵɵproperty("color", (ctx_r1.options == null ? null : ctx_r1.options.color) || "primary")("disabled", ctx_r1.controlDisabled || (ctx_r1.options == null ? null : ctx_r1.options.readonly))("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id))("name", ctx_r1.controlName)("checked", ctx_r1.isChecked);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r1.options == null ? null : ctx_r1.options.title);
    }
}
function MaterialCheckboxComponent_mat_slide_toggle_2_span_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "span", 5);
    }
    if (rf & 2) {
        const ctx_r12 = i0.ɵɵnextContext(2);
        i0.ɵɵstyleProp("display", (ctx_r12.options == null ? null : ctx_r12.options.notitle) ? "none" : "");
        i0.ɵɵproperty("innerHTML", ctx_r12.options == null ? null : ctx_r12.options.title, i0.ɵɵsanitizeHtml);
    }
}
function MaterialCheckboxComponent_mat_slide_toggle_2_Template(rf, ctx) {
    if (rf & 1) {
        const _r14 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "mat-slide-toggle", 3);
        i0.ɵɵlistener("blur", function MaterialCheckboxComponent_mat_slide_toggle_2_Template_mat_slide_toggle_blur_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r13 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r13.options.showErrors = true); });
        i0.ɵɵtemplate(1, MaterialCheckboxComponent_mat_slide_toggle_2_span_1_Template, 1, 3, "span", 4);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r2 = i0.ɵɵnextContext();
        i0.ɵɵproperty("formControl", ctx_r2.formControl)("color", (ctx_r2.options == null ? null : ctx_r2.options.color) || "primary")("id", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id))("name", ctx_r2.controlName);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r2.options == null ? null : ctx_r2.options.title);
    }
}
function MaterialCheckboxComponent_mat_slide_toggle_3_span_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "span", 5);
    }
    if (rf & 2) {
        const ctx_r15 = i0.ɵɵnextContext(2);
        i0.ɵɵstyleProp("display", (ctx_r15.options == null ? null : ctx_r15.options.notitle) ? "none" : "");
        i0.ɵɵproperty("innerHTML", ctx_r15.options == null ? null : ctx_r15.options.title, i0.ɵɵsanitizeHtml);
    }
}
function MaterialCheckboxComponent_mat_slide_toggle_3_Template(rf, ctx) {
    if (rf & 1) {
        const _r17 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "mat-slide-toggle", 6);
        i0.ɵɵlistener("blur", function MaterialCheckboxComponent_mat_slide_toggle_3_Template_mat_slide_toggle_blur_0_listener() { i0.ɵɵrestoreView(_r17); const ctx_r16 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r16.options.showErrors = true); })("change", function MaterialCheckboxComponent_mat_slide_toggle_3_Template_mat_slide_toggle_change_0_listener($event) { i0.ɵɵrestoreView(_r17); const ctx_r18 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r18.updateValue($event)); });
        i0.ɵɵtemplate(1, MaterialCheckboxComponent_mat_slide_toggle_3_span_1_Template, 1, 3, "span", 4);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r3 = i0.ɵɵnextContext();
        i0.ɵɵproperty("color", (ctx_r3.options == null ? null : ctx_r3.options.color) || "primary")("disabled", ctx_r3.controlDisabled || (ctx_r3.options == null ? null : ctx_r3.options.readonly))("id", "control" + (ctx_r3.layoutNode == null ? null : ctx_r3.layoutNode._id))("name", ctx_r3.controlName)("checked", ctx_r3.isChecked);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r3.options == null ? null : ctx_r3.options.title);
    }
}
function MaterialCheckboxComponent_mat_error_4_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "mat-error", 7);
    }
    if (rf & 2) {
        const ctx_r4 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", ctx_r4.options == null ? null : ctx_r4.options.errorMessage, i0.ɵɵsanitizeHtml);
    }
}
class MaterialCheckboxComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.trueValue = true;
        this.falseValue = false;
        this.showSlideToggle = false;
    }
    get isChecked() {
        return this.jsf.getFormControlValue(this) === this.trueValue;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this, !this.options.readonly);
        if (this.controlValue === null || this.controlValue === undefined) {
            this.controlValue = false;
            this.jsf.updateValue(this, this.falseValue);
        }
        if (this.layoutNode.type === 'slide-toggle' ||
            this.layoutNode.format === 'slide-toggle') {
            this.showSlideToggle = true;
        }
    }
    updateValue(event) {
        this.options.showErrors = true;
        this.jsf.updateValue(this, event.checked ? this.trueValue : this.falseValue);
    }
}
MaterialCheckboxComponent.ɵfac = function MaterialCheckboxComponent_Factory(t) { return new (t || MaterialCheckboxComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialCheckboxComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialCheckboxComponent, selectors: [["material-checkbox-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 5, vars: 5, consts: [["align", "left", "labelPosition", "after", 3, "formControl", "color", "id", "name", "blur", 4, "ngIf"], ["align", "left", "labelPosition", "after", 3, "color", "disabled", "id", "name", "checked", "blur", "change", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], ["align", "left", "labelPosition", "after", 3, "formControl", "color", "id", "name", "blur"], ["class", "checkbox-name", 3, "display", "innerHTML", 4, "ngIf"], [1, "checkbox-name", 3, "innerHTML"], ["align", "left", "labelPosition", "after", 3, "color", "disabled", "id", "name", "checked", "blur", "change"], [3, "innerHTML"]], template: function MaterialCheckboxComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵtemplate(0, MaterialCheckboxComponent_mat_checkbox_0_Template, 2, 5, "mat-checkbox", 0);
            i0.ɵɵtemplate(1, MaterialCheckboxComponent_mat_checkbox_1_Template, 2, 6, "mat-checkbox", 1);
            i0.ɵɵtemplate(2, MaterialCheckboxComponent_mat_slide_toggle_2_Template, 2, 5, "mat-slide-toggle", 0);
            i0.ɵɵtemplate(3, MaterialCheckboxComponent_mat_slide_toggle_3_Template, 2, 6, "mat-slide-toggle", 1);
            i0.ɵɵtemplate(4, MaterialCheckboxComponent_mat_error_4_Template, 1, 1, "mat-error", 2);
        }
        if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.boundControl && !ctx.showSlideToggle);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.boundControl && !ctx.showSlideToggle);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.boundControl && ctx.showSlideToggle);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.boundControl && ctx.showSlideToggle);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.showErrors) && (ctx.options == null ? null : ctx.options.errorMessage));
        }
    }, dependencies: [i2.NgIf, i3$3.NgControlStatus, i3$3.FormControlDirective, i4$3.MatCheckbox, i4$1.MatError, i6.MatSlideToggle], styles: [".checkbox-name[_ngcontent-%COMP%]{white-space:nowrap}mat-error[_ngcontent-%COMP%]{font-size:75%}"] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialCheckboxComponent, [{
            type: Component,
            args: [{ selector: 'material-checkbox-widget', template: `
      <mat-checkbox *ngIf="boundControl && !showSlideToggle"
                    [formControl]="formControl"
                    align="left"
                    [color]="options?.color || 'primary'"
                    [id]="'control' + layoutNode?._id"
                    labelPosition="after"
                    [name]="controlName"
                    (blur)="options.showErrors = true">
      <span *ngIf="options?.title"
            class="checkbox-name"
            [style.display]="options?.notitle ? 'none' : ''"
            [innerHTML]="options?.title"></span>
      </mat-checkbox>
      <mat-checkbox *ngIf="!boundControl && !showSlideToggle"
                    align="left"
                    [color]="options?.color || 'primary'"
                    [disabled]="controlDisabled || options?.readonly"
                    [id]="'control' + layoutNode?._id"
                    labelPosition="after"
                    [name]="controlName"
                    [checked]="isChecked"
                    (blur)="options.showErrors = true"
                    (change)="updateValue($event)">
      <span *ngIf="options?.title"
            class="checkbox-name"
            [style.display]="options?.notitle ? 'none' : ''"
            [innerHTML]="options?.title"></span>
      </mat-checkbox>
      <mat-slide-toggle *ngIf="boundControl && showSlideToggle"
                        [formControl]="formControl"
                        align="left"
                        [color]="options?.color || 'primary'"
                        [id]="'control' + layoutNode?._id"
                        labelPosition="after"
                        [name]="controlName"
                        (blur)="options.showErrors = true">
      <span *ngIf="options?.title"
            class="checkbox-name"
            [style.display]="options?.notitle ? 'none' : ''"
            [innerHTML]="options?.title"></span>
      </mat-slide-toggle>
      <mat-slide-toggle *ngIf="!boundControl && showSlideToggle"
                        align="left"
                        [color]="options?.color || 'primary'"
                        [disabled]="controlDisabled || options?.readonly"
                        [id]="'control' + layoutNode?._id"
                        labelPosition="after"
                        [name]="controlName"
                        [checked]="isChecked"
                        (blur)="options.showErrors = true"
                        (change)="updateValue($event)">
      <span *ngIf="options?.title"
            class="checkbox-name"
            [style.display]="options?.notitle ? 'none' : ''"
            [innerHTML]="options?.title"></span>
      </mat-slide-toggle>
      <mat-error *ngIf="options?.showErrors && options?.errorMessage"
                 [innerHTML]="options?.errorMessage"></mat-error>`, styles: [".checkbox-name{white-space:nowrap}mat-error{font-size:75%}\n"] }]
        }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] });
})();

function MaterialCheckboxesComponent_label_3_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "label", 6);
    }
    if (rf & 2) {
        const ctx_r0 = i0.ɵɵnextContext();
        i0.ɵɵclassMap((ctx_r0.options == null ? null : ctx_r0.options.labelHtmlClass) || "");
        i0.ɵɵstyleProp("display", (ctx_r0.options == null ? null : ctx_r0.options.notitle) ? "none" : "");
        i0.ɵɵproperty("innerHTML", ctx_r0.options == null ? null : ctx_r0.options.title, i0.ɵɵsanitizeHtml);
    }
}
function MaterialCheckboxesComponent_li_5_Template(rf, ctx) {
    if (rf & 1) {
        const _r5 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "li")(1, "mat-checkbox", 7);
        i0.ɵɵlistener("ngModelChange", function MaterialCheckboxesComponent_li_5_Template_mat_checkbox_ngModelChange_1_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r5); const checkboxItem_r3 = restoredCtx.$implicit; return i0.ɵɵresetView(checkboxItem_r3.checked = $event); })("blur", function MaterialCheckboxesComponent_li_5_Template_mat_checkbox_blur_1_listener() { i0.ɵɵrestoreView(_r5); const ctx_r6 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r6.options.showErrors = true); })("change", function MaterialCheckboxesComponent_li_5_Template_mat_checkbox_change_1_listener() { i0.ɵɵrestoreView(_r5); const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.updateValue()); });
        i0.ɵɵelement(2, "span", 1);
        i0.ɵɵelementEnd()();
    }
    if (rf & 2) {
        const checkboxItem_r3 = ctx.$implicit;
        const ctx_r1 = i0.ɵɵnextContext();
        i0.ɵɵclassMap((ctx_r1.options == null ? null : ctx_r1.options.htmlClass) || "");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngModel", checkboxItem_r3.checked)("color", (ctx_r1.options == null ? null : ctx_r1.options.color) || "primary")("disabled", ctx_r1.controlDisabled || (ctx_r1.options == null ? null : ctx_r1.options.readonly))("name", checkboxItem_r3 == null ? null : checkboxItem_r3.name);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("innerHTML", checkboxItem_r3 == null ? null : checkboxItem_r3.name, i0.ɵɵsanitizeHtml);
    }
}
function MaterialCheckboxesComponent_mat_error_6_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "mat-error", 8);
    }
    if (rf & 2) {
        const ctx_r2 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", ctx_r2.options == null ? null : ctx_r2.options.errorMessage, i0.ɵɵsanitizeHtml);
    }
}
class MaterialCheckboxesComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.horizontalList = false;
        this.checkboxList = [];
    }
    get allChecked() {
        return this.checkboxList.filter(t => t.checked).length === this.checkboxList.length;
    }
    get someChecked() {
        const checkedItems = this.checkboxList.filter(t => t.checked).length;
        return checkedItems > 0 && checkedItems < this.checkboxList.length;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.horizontalList = this.layoutNode.type === 'checkboxes-inline' ||
            this.layoutNode.type === 'checkboxbuttons';
        this.jsf.initializeControl(this);
        this.checkboxList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
        if (this.boundControl) {
            const formArray = this.jsf.getFormControl(this);
            for (const checkboxItem of this.checkboxList) {
                checkboxItem.checked = formArray.value.includes(checkboxItem.value);
            }
        }
    }
    updateValue() {
        this.options.showErrors = true;
        if (this.boundControl) {
            this.jsf.updateArrayCheckboxList(this, this.checkboxList);
        }
    }
    updateAllValues(event) {
        this.options.showErrors = true;
        this.checkboxList.forEach(t => t.checked = event.checked);
        this.updateValue();
    }
}
MaterialCheckboxesComponent.ɵfac = function MaterialCheckboxesComponent_Factory(t) { return new (t || MaterialCheckboxesComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialCheckboxesComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialCheckboxesComponent, selectors: [["material-checkboxes-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 7, vars: 11, consts: [["type", "checkbox", 3, "checked", "color", "disabled", "indeterminate", "name", "blur", "change"], [1, "checkbox-name", 3, "innerHTML"], ["class", "title", 3, "class", "display", "innerHTML", 4, "ngIf"], [1, "checkbox-list"], [3, "class", 4, "ngFor", "ngForOf"], [3, "innerHTML", 4, "ngIf"], [1, "title", 3, "innerHTML"], ["type", "checkbox", 3, "ngModel", "color", "disabled", "name", "ngModelChange", "blur", "change"], [3, "innerHTML"]], template: function MaterialCheckboxesComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div")(1, "mat-checkbox", 0);
            i0.ɵɵlistener("blur", function MaterialCheckboxesComponent_Template_mat_checkbox_blur_1_listener() { return ctx.options.showErrors = true; })("change", function MaterialCheckboxesComponent_Template_mat_checkbox_change_1_listener($event) { return ctx.updateAllValues($event); });
            i0.ɵɵelement(2, "span", 1);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(3, MaterialCheckboxesComponent_label_3_Template, 1, 5, "label", 2);
            i0.ɵɵelementStart(4, "ul", 3);
            i0.ɵɵtemplate(5, MaterialCheckboxesComponent_li_5_Template, 3, 7, "li", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(6, MaterialCheckboxesComponent_mat_error_6_Template, 1, 1, "mat-error", 5);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("checked", ctx.allChecked)("color", (ctx.options == null ? null : ctx.options.color) || "primary")("disabled", ctx.controlDisabled || (ctx.options == null ? null : ctx.options.readonly))("indeterminate", ctx.someChecked)("name", ctx.options == null ? null : ctx.options.name);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("innerHTML", ctx.options == null ? null : ctx.options.name, i0.ɵɵsanitizeHtml);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.title);
            i0.ɵɵadvance(1);
            i0.ɵɵclassProp("horizontal-list", ctx.horizontalList);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx.checkboxList);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.showErrors) && (ctx.options == null ? null : ctx.options.errorMessage));
        }
    }, dependencies: [i2.NgForOf, i2.NgIf, i3$3.NgControlStatus, i3$3.NgModel, i4$3.MatCheckbox, i4$1.MatError], styles: [".title[_ngcontent-%COMP%]{font-weight:700}.checkbox-list[_ngcontent-%COMP%]{list-style-type:none}.horizontal-list[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{display:inline-block;margin-right:10px;zoom:1}.checkbox-name[_ngcontent-%COMP%]{white-space:nowrap}mat-error[_ngcontent-%COMP%]{font-size:75%}"] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialCheckboxesComponent, [{
            type: Component,
            args: [{ selector: 'material-checkboxes-widget', template: `
      <div>
          <mat-checkbox type="checkbox"
                        [checked]="allChecked"
                        [color]="options?.color || 'primary'"
                        [disabled]="controlDisabled || options?.readonly"
                        [indeterminate]="someChecked"
                        [name]="options?.name"
                        (blur)="options.showErrors = true"
                        (change)="updateAllValues($event)">
              <span class="checkbox-name" [innerHTML]="options?.name"></span>
          </mat-checkbox>
          <label *ngIf="options?.title"
                 class="title"
                 [class]="options?.labelHtmlClass || ''"
                 [style.display]="options?.notitle ? 'none' : ''"
                 [innerHTML]="options?.title"></label>
          <ul class="checkbox-list" [class.horizontal-list]="horizontalList">
              <li *ngFor="let checkboxItem of checkboxList"
                  [class]="options?.htmlClass || ''">
                  <mat-checkbox type="checkbox"
                                [(ngModel)]="checkboxItem.checked"
                                [color]="options?.color || 'primary'"
                                [disabled]="controlDisabled || options?.readonly"
                                [name]="checkboxItem?.name"
                                (blur)="options.showErrors = true"
                                (change)="updateValue()">
                      <span class="checkbox-name" [innerHTML]="checkboxItem?.name"></span>
                  </mat-checkbox>
              </li>
          </ul>
          <mat-error *ngIf="options?.showErrors && options?.errorMessage"
                     [innerHTML]="options?.errorMessage"></mat-error>
      </div>`, styles: [".title{font-weight:700}.checkbox-list{list-style-type:none}.horizontal-list>li{display:inline-block;margin-right:10px;zoom:1}.checkbox-name{white-space:nowrap}mat-error{font-size:75%}\n"] }]
        }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] });
})();

class MaterialChipListComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
}
MaterialChipListComponent.ɵfac = function MaterialChipListComponent_Factory(t) { return new (t || MaterialChipListComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialChipListComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialChipListComponent, selectors: [["material-chip-list-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 0, vars: 0, template: function MaterialChipListComponent_Template(rf, ctx) { }, encapsulation: 2 });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialChipListComponent, [{
            type: Component,
            args: [{
                    selector: 'material-chip-list-widget',
                    template: ``,
                }]
        }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] });
})();

function MaterialDatepickerComponent_span_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "span", 8);
    }
    if (rf & 2) {
        const ctx_r0 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", (ctx_r0.options == null ? null : ctx_r0.options.prefix) || (ctx_r0.options == null ? null : ctx_r0.options.fieldAddonLeft), i0.ɵɵsanitizeHtml);
    }
}
function MaterialDatepickerComponent_input_2_Template(rf, ctx) {
    if (rf & 1) {
        const _r8 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "input", 9);
        i0.ɵɵlistener("blur", function MaterialDatepickerComponent_input_2_Template_input_blur_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.options.showErrors = true); });
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r1 = i0.ɵɵnextContext();
        const _r5 = i0.ɵɵreference(8);
        i0.ɵɵstyleProp("width", "100%");
        i0.ɵɵproperty("formControl", ctx_r1.formControl)("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id))("max", ctx_r1.options == null ? null : ctx_r1.options.maximum)("matDatepicker", _r5)("min", ctx_r1.options == null ? null : ctx_r1.options.minimum)("name", ctx_r1.controlName)("placeholder", ctx_r1.options == null ? null : ctx_r1.options.title)("required", ctx_r1.options == null ? null : ctx_r1.options.required);
        i0.ɵɵattribute("aria-describedby", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Status")("list", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Autocomplete")("readonly", (ctx_r1.options == null ? null : ctx_r1.options.readonly) ? "readonly" : null);
    }
}
function MaterialDatepickerComponent_input_3_Template(rf, ctx) {
    if (rf & 1) {
        const _r10 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "input", 10);
        i0.ɵɵlistener("blur", function MaterialDatepickerComponent_input_3_Template_input_blur_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r9.options.showErrors = true); })("change", function MaterialDatepickerComponent_input_3_Template_input_change_0_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r11 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r11.updateValue($event)); })("input", function MaterialDatepickerComponent_input_3_Template_input_input_0_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r12 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r12.updateValue($event)); });
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r2 = i0.ɵɵnextContext();
        const _r5 = i0.ɵɵreference(8);
        i0.ɵɵstyleProp("width", "100%");
        i0.ɵɵproperty("disabled", ctx_r2.controlDisabled || (ctx_r2.options == null ? null : ctx_r2.options.readonly))("id", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id))("max", ctx_r2.options == null ? null : ctx_r2.options.maximum)("matDatepicker", _r5)("min", ctx_r2.options == null ? null : ctx_r2.options.minimum)("name", ctx_r2.controlName)("placeholder", ctx_r2.options == null ? null : ctx_r2.options.title)("required", ctx_r2.options == null ? null : ctx_r2.options.required)("value", ctx_r2.dateValue);
        i0.ɵɵattribute("aria-describedby", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Status")("list", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Autocomplete")("readonly", (ctx_r2.options == null ? null : ctx_r2.options.readonly) ? "readonly" : null);
    }
}
function MaterialDatepickerComponent_span_4_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "span", 11);
    }
    if (rf & 2) {
        const ctx_r3 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", (ctx_r3.options == null ? null : ctx_r3.options.suffix) || (ctx_r3.options == null ? null : ctx_r3.options.fieldAddonRight), i0.ɵɵsanitizeHtml);
    }
}
function MaterialDatepickerComponent_mat_hint_5_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "mat-hint", 12);
    }
    if (rf & 2) {
        const ctx_r4 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", ctx_r4.options == null ? null : ctx_r4.options.description, i0.ɵɵsanitizeHtml);
    }
}
function MaterialDatepickerComponent_mat_error_9_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "mat-error", 13);
    }
    if (rf & 2) {
        const ctx_r6 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", ctx_r6.options == null ? null : ctx_r6.options.errorMessage, i0.ɵɵsanitizeHtml);
    }
}
class MaterialDatepickerComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.autoCompleteList = [];
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this, !this.options.readonly);
        this.setControlDate(this.controlValue);
        if (!this.options.notitle && !this.options.description && this.options.placeholder) {
            this.options.description = this.options.placeholder;
        }
    }
    ngOnChanges() {
        this.setControlDate(this.controlValue);
    }
    setControlDate(dateString) {
        this.dateValue = stringToDate(dateString);
    }
    updateValue(event) {
        this.options.showErrors = true;
        this.jsf.updateValue(this, dateToString(event, this.options));
    }
}
MaterialDatepickerComponent.ɵfac = function MaterialDatepickerComponent_Factory(t) { return new (t || MaterialDatepickerComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialDatepickerComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialDatepickerComponent, selectors: [["material-datepicker-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, features: [i0.ɵɵNgOnChangesFeature], decls: 10, vars: 9, consts: [["matPrefix", "", 3, "innerHTML", 4, "ngIf"], ["matInput", "", 3, "formControl", "id", "max", "matDatepicker", "min", "name", "placeholder", "required", "width", "blur", 4, "ngIf"], ["matInput", "", 3, "disabled", "id", "max", "matDatepicker", "min", "name", "placeholder", "required", "width", "value", "blur", "change", "input", 4, "ngIf"], ["matSuffix", "", 3, "innerHTML", 4, "ngIf"], ["align", "end", 3, "innerHTML", 4, "ngIf"], ["matSuffix", "", 3, "for"], ["picker", ""], [3, "innerHTML", 4, "ngIf"], ["matPrefix", "", 3, "innerHTML"], ["matInput", "", 3, "formControl", "id", "max", "matDatepicker", "min", "name", "placeholder", "required", "blur"], ["matInput", "", 3, "disabled", "id", "max", "matDatepicker", "min", "name", "placeholder", "required", "value", "blur", "change", "input"], ["matSuffix", "", 3, "innerHTML"], ["align", "end", 3, "innerHTML"], [3, "innerHTML"]], template: function MaterialDatepickerComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "mat-form-field");
            i0.ɵɵtemplate(1, MaterialDatepickerComponent_span_1_Template, 1, 1, "span", 0);
            i0.ɵɵtemplate(2, MaterialDatepickerComponent_input_2_Template, 1, 13, "input", 1);
            i0.ɵɵtemplate(3, MaterialDatepickerComponent_input_3_Template, 1, 14, "input", 2);
            i0.ɵɵtemplate(4, MaterialDatepickerComponent_span_4_Template, 1, 1, "span", 3);
            i0.ɵɵtemplate(5, MaterialDatepickerComponent_mat_hint_5_Template, 1, 1, "mat-hint", 4);
            i0.ɵɵelement(6, "mat-datepicker-toggle", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(7, "mat-datepicker", null, 6);
            i0.ɵɵtemplate(9, MaterialDatepickerComponent_mat_error_9_Template, 1, 1, "mat-error", 7);
        }
        if (rf & 2) {
            const _r5 = i0.ɵɵreference(8);
            i0.ɵɵstyleProp("width", "100%");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.prefix) || (ctx.options == null ? null : ctx.options.fieldAddonLeft));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.boundControl);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.boundControl);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.suffix) || (ctx.options == null ? null : ctx.options.fieldAddonRight));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.description) && (!(ctx.options == null ? null : ctx.options.showErrors) || !(ctx.options == null ? null : ctx.options.errorMessage)));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("for", _r5);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.showErrors) && (ctx.options == null ? null : ctx.options.errorMessage));
        }
    }, dependencies: [i2.NgIf, i3$3.DefaultValueAccessor, i3$3.NgControlStatus, i3$3.RequiredValidator, i3$3.FormControlDirective, i4$4.MatDatepicker, i4$4.MatDatepickerInput, i4$4.MatDatepickerToggle, i4$1.MatFormField, i4$1.MatHint, i4$1.MatError, i4$1.MatPrefix, i4$1.MatSuffix, i5$1.MatInput], styles: ["mat-error[_ngcontent-%COMP%]{font-size:75%;margin-top:-1rem;margin-bottom:.5rem}  mat-form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix{width:initial}"] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialDatepickerComponent, [{
            type: Component,
            args: [{ selector: 'material-datepicker-widget', template: `
      <mat-form-field [style.width]="'100%'">
      <span matPrefix *ngIf="options?.prefix || options?.fieldAddonLeft"
            [innerHTML]="options?.prefix || options?.fieldAddonLeft"></span>
          <input matInput *ngIf="boundControl"
                 [formControl]="formControl"
                 [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                 [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
                 [attr.readonly]="options?.readonly ? 'readonly' : null"
                 [id]="'control' + layoutNode?._id"
                 [max]="options?.maximum"
                 [matDatepicker]="picker"
                 [min]="options?.minimum"
                 [name]="controlName"
                 [placeholder]="options?.title"
                 [required]="options?.required"
                 [style.width]="'100%'"
                 (blur)="options.showErrors = true">
          <input matInput *ngIf="!boundControl"
                 [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                 [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
                 [attr.readonly]="options?.readonly ? 'readonly' : null"
                 [disabled]="controlDisabled || options?.readonly"
                 [id]="'control' + layoutNode?._id"
                 [max]="options?.maximum"
                 [matDatepicker]="picker"
                 [min]="options?.minimum"
                 [name]="controlName"
                 [placeholder]="options?.title"
                 [required]="options?.required"
                 [style.width]="'100%'"
                 [value]="dateValue"
                 (blur)="options.showErrors = true"
                 (change)="updateValue($event)"
                 (input)="updateValue($event)">
          <span matSuffix *ngIf="options?.suffix || options?.fieldAddonRight"
                [innerHTML]="options?.suffix || options?.fieldAddonRight"></span>
          <mat-hint *ngIf="options?.description && (!options?.showErrors || !options?.errorMessage)"
                    align="end" [innerHTML]="options?.description"></mat-hint>
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      </mat-form-field>
      <mat-datepicker #picker></mat-datepicker>
      <mat-error *ngIf="options?.showErrors && options?.errorMessage"
                 [innerHTML]="options?.errorMessage"></mat-error>`, styles: ["mat-error{font-size:75%;margin-top:-1rem;margin-bottom:.5rem}::ng-deep mat-form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix{width:initial}\n"] }]
        }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] });
})();

class MaterialFileComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
}
MaterialFileComponent.ɵfac = function MaterialFileComponent_Factory(t) { return new (t || MaterialFileComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialFileComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialFileComponent, selectors: [["material-file-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 0, vars: 0, template: function MaterialFileComponent_Template(rf, ctx) { }, encapsulation: 2 });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialFileComponent, [{
            type: Component,
            args: [{
                    selector: 'material-file-widget',
                    template: ``,
                }]
        }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] });
})();

function MaterialInputComponent_span_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "span", 8);
    }
    if (rf & 2) {
        const ctx_r0 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", (ctx_r0.options == null ? null : ctx_r0.options.prefix) || (ctx_r0.options == null ? null : ctx_r0.options.fieldAddonLeft), i0.ɵɵsanitizeHtml);
    }
}
function MaterialInputComponent_input_2_Template(rf, ctx) {
    if (rf & 1) {
        const _r8 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "input", 9);
        i0.ɵɵlistener("blur", function MaterialInputComponent_input_2_Template_input_blur_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.options.showErrors = true); });
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r1 = i0.ɵɵnextContext();
        i0.ɵɵstyleProp("width", "100%");
        i0.ɵɵproperty("formControl", ctx_r1.formControl)("readonly", (ctx_r1.options == null ? null : ctx_r1.options.readonly) ? "readonly" : null)("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id))("name", ctx_r1.controlName)("placeholder", (ctx_r1.options == null ? null : ctx_r1.options.notitle) ? ctx_r1.options == null ? null : ctx_r1.options.placeholder : ctx_r1.options == null ? null : ctx_r1.options.title)("required", ctx_r1.options == null ? null : ctx_r1.options.required)("type", ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode.type);
        i0.ɵɵattribute("aria-describedby", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Status")("list", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Autocomplete")("maxlength", ctx_r1.options == null ? null : ctx_r1.options.maxLength)("minlength", ctx_r1.options == null ? null : ctx_r1.options.minLength)("pattern", ctx_r1.options == null ? null : ctx_r1.options.pattern);
    }
}
function MaterialInputComponent_input_3_Template(rf, ctx) {
    if (rf & 1) {
        const _r10 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "input", 10);
        i0.ɵɵlistener("input", function MaterialInputComponent_input_3_Template_input_input_0_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r9.updateValue($event)); })("blur", function MaterialInputComponent_input_3_Template_input_blur_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r11 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r11.options.showErrors = true); });
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r2 = i0.ɵɵnextContext();
        i0.ɵɵstyleProp("width", "100%");
        i0.ɵɵproperty("disabled", ctx_r2.controlDisabled)("id", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id))("name", ctx_r2.controlName)("placeholder", (ctx_r2.options == null ? null : ctx_r2.options.notitle) ? ctx_r2.options == null ? null : ctx_r2.options.placeholder : ctx_r2.options == null ? null : ctx_r2.options.title)("readonly", (ctx_r2.options == null ? null : ctx_r2.options.readonly) ? "readonly" : null)("required", ctx_r2.options == null ? null : ctx_r2.options.required)("type", ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode.type)("value", ctx_r2.controlValue);
        i0.ɵɵattribute("aria-describedby", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Status")("list", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Autocomplete")("maxlength", ctx_r2.options == null ? null : ctx_r2.options.maxLength)("minlength", ctx_r2.options == null ? null : ctx_r2.options.minLength)("pattern", ctx_r2.options == null ? null : ctx_r2.options.pattern);
    }
}
function MaterialInputComponent_span_4_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "span", 11);
    }
    if (rf & 2) {
        const ctx_r3 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", (ctx_r3.options == null ? null : ctx_r3.options.suffix) || (ctx_r3.options == null ? null : ctx_r3.options.fieldAddonRight), i0.ɵɵsanitizeHtml);
    }
}
function MaterialInputComponent_mat_hint_5_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "mat-hint", 12);
    }
    if (rf & 2) {
        const ctx_r4 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", ctx_r4.options == null ? null : ctx_r4.options.description, i0.ɵɵsanitizeHtml);
    }
}
function MaterialInputComponent_mat_autocomplete_6_mat_option_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "mat-option", 14);
        i0.ɵɵtext(1);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const word_r13 = ctx.$implicit;
        i0.ɵɵproperty("value", word_r13);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(word_r13);
    }
}
function MaterialInputComponent_mat_autocomplete_6_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "mat-autocomplete");
        i0.ɵɵtemplate(1, MaterialInputComponent_mat_autocomplete_6_mat_option_1_Template, 2, 2, "mat-option", 13);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r5 = i0.ɵɵnextContext();
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx_r5.options == null ? null : ctx_r5.options.typeahead == null ? null : ctx_r5.options.typeahead.source);
    }
}
function MaterialInputComponent_mat_error_7_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "mat-error", 15);
    }
    if (rf & 2) {
        const ctx_r6 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", ctx_r6.options == null ? null : ctx_r6.options.errorMessage, i0.ɵɵsanitizeHtml);
    }
}
class MaterialInputComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.autoCompleteList = [];
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (!this.options.notitle && !this.options.description && this.options.placeholder) {
            this.options.description = this.options.placeholder;
        }
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
}
MaterialInputComponent.ɵfac = function MaterialInputComponent_Factory(t) { return new (t || MaterialInputComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialInputComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialInputComponent, selectors: [["material-input-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 8, vars: 12, consts: [[3, "floatLabel"], ["matPrefix", "", 3, "innerHTML", 4, "ngIf"], ["matInput", "", 3, "formControl", "readonly", "id", "name", "placeholder", "required", "width", "type", "blur", 4, "ngIf"], ["matInput", "", 3, "disabled", "id", "name", "placeholder", "readonly", "required", "width", "type", "value", "input", "blur", 4, "ngIf"], ["matSuffix", "", 3, "innerHTML", 4, "ngIf"], ["align", "end", 3, "innerHTML", 4, "ngIf"], [4, "ngIf"], [3, "innerHTML", 4, "ngIf"], ["matPrefix", "", 3, "innerHTML"], ["matInput", "", 3, "formControl", "readonly", "id", "name", "placeholder", "required", "type", "blur"], ["matInput", "", 3, "disabled", "id", "name", "placeholder", "readonly", "required", "type", "value", "input", "blur"], ["matSuffix", "", 3, "innerHTML"], ["align", "end", 3, "innerHTML"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], [3, "innerHTML"]], template: function MaterialInputComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "mat-form-field", 0);
            i0.ɵɵtemplate(1, MaterialInputComponent_span_1_Template, 1, 1, "span", 1);
            i0.ɵɵtemplate(2, MaterialInputComponent_input_2_Template, 1, 14, "input", 2);
            i0.ɵɵtemplate(3, MaterialInputComponent_input_3_Template, 1, 15, "input", 3);
            i0.ɵɵtemplate(4, MaterialInputComponent_span_4_Template, 1, 1, "span", 4);
            i0.ɵɵtemplate(5, MaterialInputComponent_mat_hint_5_Template, 1, 1, "mat-hint", 5);
            i0.ɵɵtemplate(6, MaterialInputComponent_mat_autocomplete_6_Template, 2, 1, "mat-autocomplete", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(7, MaterialInputComponent_mat_error_7_Template, 1, 1, "mat-error", 7);
        }
        if (rf & 2) {
            i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.htmlClass) || "");
            i0.ɵɵstyleProp("width", "100%");
            i0.ɵɵproperty("floatLabel", (ctx.options == null ? null : ctx.options.floatPlaceholder) || ((ctx.options == null ? null : ctx.options.notitle) ? "never" : "auto"));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.prefix) || (ctx.options == null ? null : ctx.options.fieldAddonLeft));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.boundControl);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.boundControl);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.suffix) || (ctx.options == null ? null : ctx.options.fieldAddonRight));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.description) && (!(ctx.options == null ? null : ctx.options.showErrors) || !(ctx.options == null ? null : ctx.options.errorMessage)));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.typeahead == null ? null : ctx.options.typeahead.source);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.showErrors) && (ctx.options == null ? null : ctx.options.errorMessage));
        }
    }, dependencies: [i2.NgForOf, i2.NgIf, i3$3.DefaultValueAccessor, i3$3.NgControlStatus, i3$3.RequiredValidator, i3$3.MinLengthValidator, i3$3.MaxLengthValidator, i3$3.PatternValidator, i3$3.FormControlDirective, i4$5.MatAutocomplete, i4$6.MatOption, i4$1.MatFormField, i4$1.MatHint, i4$1.MatError, i4$1.MatPrefix, i4$1.MatSuffix, i5$1.MatInput], styles: ["mat-error[_ngcontent-%COMP%]{font-size:75%;margin-top:-1rem;margin-bottom:.5rem}  mat-form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix{width:initial}"] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialInputComponent, [{
            type: Component,
            args: [{ selector: 'material-input-widget', template: `
      <mat-form-field
              [class]="options?.htmlClass || ''"
              [floatLabel]="options?.floatPlaceholder || (options?.notitle ? 'never' : 'auto')"
              [style.width]="'100%'">
      <span matPrefix *ngIf="options?.prefix || options?.fieldAddonLeft"
            [innerHTML]="options?.prefix || options?.fieldAddonLeft"></span>
          <input matInput *ngIf="boundControl"
                 [formControl]="formControl"
                 [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                 [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
                 [attr.maxlength]="options?.maxLength"
                 [attr.minlength]="options?.minLength"
                 [attr.pattern]="options?.pattern"
                 [readonly]="options?.readonly ? 'readonly' : null"
                 [id]="'control' + layoutNode?._id"
                 [name]="controlName"
                 [placeholder]="options?.notitle ? options?.placeholder : options?.title"
                 [required]="options?.required"
                 [style.width]="'100%'"
                 [type]="layoutNode?.type"
                 (blur)="options.showErrors = true">
          <input matInput *ngIf="!boundControl"
                 [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                 [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
                 [attr.maxlength]="options?.maxLength"
                 [attr.minlength]="options?.minLength"
                 [attr.pattern]="options?.pattern"
                 [disabled]="controlDisabled"
                 [id]="'control' + layoutNode?._id"
                 [name]="controlName"
                 [placeholder]="options?.notitle ? options?.placeholder : options?.title"
                 [readonly]="options?.readonly ? 'readonly' : null"
                 [required]="options?.required"
                 [style.width]="'100%'"
                 [type]="layoutNode?.type"
                 [value]="controlValue"
                 (input)="updateValue($event)"
                 (blur)="options.showErrors = true">
          <span matSuffix *ngIf="options?.suffix || options?.fieldAddonRight"
                [innerHTML]="options?.suffix || options?.fieldAddonRight"></span>
          <mat-hint *ngIf="options?.description && (!options?.showErrors || !options?.errorMessage)"
                    align="end" [innerHTML]="options?.description"></mat-hint>
          <mat-autocomplete *ngIf="options?.typeahead?.source">
              <mat-option *ngFor="let word of options?.typeahead?.source"
                          [value]="word">{{word}}</mat-option>
          </mat-autocomplete>
      </mat-form-field>
      <mat-error *ngIf="options?.showErrors && options?.errorMessage"
                 [innerHTML]="options?.errorMessage"></mat-error>`, styles: ["mat-error{font-size:75%;margin-top:-1rem;margin-bottom:.5rem}::ng-deep mat-form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix{width:initial}\n"] }]
        }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] });
})();

function MaterialNumberComponent_span_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "span", 8);
    }
    if (rf & 2) {
        const ctx_r0 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", (ctx_r0.options == null ? null : ctx_r0.options.prefix) || (ctx_r0.options == null ? null : ctx_r0.options.fieldAddonLeft), i0.ɵɵsanitizeHtml);
    }
}
function MaterialNumberComponent_input_2_Template(rf, ctx) {
    if (rf & 1) {
        const _r8 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "input", 9);
        i0.ɵɵlistener("blur", function MaterialNumberComponent_input_2_Template_input_blur_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.options.showErrors = true); });
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r1 = i0.ɵɵnextContext();
        i0.ɵɵstyleProp("width", "100%");
        i0.ɵɵproperty("formControl", ctx_r1.formControl)("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id))("name", ctx_r1.controlName)("placeholder", (ctx_r1.options == null ? null : ctx_r1.options.notitle) ? ctx_r1.options == null ? null : ctx_r1.options.placeholder : ctx_r1.options == null ? null : ctx_r1.options.title)("readonly", (ctx_r1.options == null ? null : ctx_r1.options.readonly) ? "readonly" : null)("required", ctx_r1.options == null ? null : ctx_r1.options.required)("type", "number");
        i0.ɵɵattribute("aria-describedby", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Status")("max", ctx_r1.options == null ? null : ctx_r1.options.maximum)("min", ctx_r1.options == null ? null : ctx_r1.options.minimum)("step", (ctx_r1.options == null ? null : ctx_r1.options.multipleOf) || (ctx_r1.options == null ? null : ctx_r1.options.step) || "any");
    }
}
function MaterialNumberComponent_input_3_Template(rf, ctx) {
    if (rf & 1) {
        const _r10 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "input", 10);
        i0.ɵɵlistener("input", function MaterialNumberComponent_input_3_Template_input_input_0_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r9.updateValue($event)); })("blur", function MaterialNumberComponent_input_3_Template_input_blur_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r11 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r11.options.showErrors = true); });
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r2 = i0.ɵɵnextContext();
        i0.ɵɵstyleProp("width", "100%");
        i0.ɵɵproperty("disabled", ctx_r2.controlDisabled)("id", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id))("name", ctx_r2.controlName)("placeholder", (ctx_r2.options == null ? null : ctx_r2.options.notitle) ? ctx_r2.options == null ? null : ctx_r2.options.placeholder : ctx_r2.options == null ? null : ctx_r2.options.title)("readonly", (ctx_r2.options == null ? null : ctx_r2.options.readonly) ? "readonly" : null)("required", ctx_r2.options == null ? null : ctx_r2.options.required)("type", "number")("value", ctx_r2.controlValue);
        i0.ɵɵattribute("aria-describedby", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Status")("max", ctx_r2.options == null ? null : ctx_r2.options.maximum)("min", ctx_r2.options == null ? null : ctx_r2.options.minimum)("step", (ctx_r2.options == null ? null : ctx_r2.options.multipleOf) || (ctx_r2.options == null ? null : ctx_r2.options.step) || "any");
    }
}
function MaterialNumberComponent_span_4_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "span", 11);
    }
    if (rf & 2) {
        const ctx_r3 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", (ctx_r3.options == null ? null : ctx_r3.options.suffix) || (ctx_r3.options == null ? null : ctx_r3.options.fieldAddonRight), i0.ɵɵsanitizeHtml);
    }
}
function MaterialNumberComponent_mat_hint_5_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "mat-hint", 12);
    }
    if (rf & 2) {
        const ctx_r4 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", ctx_r4.controlValue, i0.ɵɵsanitizeHtml);
    }
}
function MaterialNumberComponent_mat_hint_6_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "mat-hint", 13);
    }
    if (rf & 2) {
        const ctx_r5 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", ctx_r5.options == null ? null : ctx_r5.options.description, i0.ɵɵsanitizeHtml);
    }
}
function MaterialNumberComponent_mat_error_7_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "mat-error", 14);
    }
    if (rf & 2) {
        const ctx_r6 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", ctx_r6.options == null ? null : ctx_r6.options.errorMessage, i0.ɵɵsanitizeHtml);
    }
}
class MaterialNumberComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.allowNegative = true;
        this.allowDecimal = true;
        this.allowExponents = false;
        this.lastValidNumber = '';
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (this.layoutNode.dataType === 'integer') {
            this.allowDecimal = false;
        }
        if (!this.options.notitle && !this.options.description && this.options.placeholder) {
            this.options.description = this.options.placeholder;
        }
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
}
MaterialNumberComponent.ɵfac = function MaterialNumberComponent_Factory(t) { return new (t || MaterialNumberComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialNumberComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialNumberComponent, selectors: [["material-number-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 8, vars: 12, consts: [[3, "floatLabel"], ["matPrefix", "", 3, "innerHTML", 4, "ngIf"], ["matInput", "", 3, "formControl", "id", "name", "placeholder", "readonly", "required", "width", "type", "blur", 4, "ngIf"], ["matInput", "", 3, "disabled", "id", "name", "placeholder", "readonly", "required", "width", "type", "value", "input", "blur", 4, "ngIf"], ["matSuffix", "", 3, "innerHTML", 4, "ngIf"], ["align", "start", 3, "innerHTML", 4, "ngIf"], ["align", "end", 3, "innerHTML", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], ["matPrefix", "", 3, "innerHTML"], ["matInput", "", 3, "formControl", "id", "name", "placeholder", "readonly", "required", "type", "blur"], ["matInput", "", 3, "disabled", "id", "name", "placeholder", "readonly", "required", "type", "value", "input", "blur"], ["matSuffix", "", 3, "innerHTML"], ["align", "start", 3, "innerHTML"], ["align", "end", 3, "innerHTML"], [3, "innerHTML"]], template: function MaterialNumberComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "mat-form-field", 0);
            i0.ɵɵtemplate(1, MaterialNumberComponent_span_1_Template, 1, 1, "span", 1);
            i0.ɵɵtemplate(2, MaterialNumberComponent_input_2_Template, 1, 13, "input", 2);
            i0.ɵɵtemplate(3, MaterialNumberComponent_input_3_Template, 1, 14, "input", 3);
            i0.ɵɵtemplate(4, MaterialNumberComponent_span_4_Template, 1, 1, "span", 4);
            i0.ɵɵtemplate(5, MaterialNumberComponent_mat_hint_5_Template, 1, 1, "mat-hint", 5);
            i0.ɵɵtemplate(6, MaterialNumberComponent_mat_hint_6_Template, 1, 1, "mat-hint", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(7, MaterialNumberComponent_mat_error_7_Template, 1, 1, "mat-error", 7);
        }
        if (rf & 2) {
            i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.htmlClass) || "");
            i0.ɵɵstyleProp("width", "100%");
            i0.ɵɵproperty("floatLabel", (ctx.options == null ? null : ctx.options.floatPlaceholder) || ((ctx.options == null ? null : ctx.options.notitle) ? "never" : "auto"));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.prefix) || (ctx.options == null ? null : ctx.options.fieldAddonLeft));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.boundControl);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.boundControl);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.suffix) || (ctx.options == null ? null : ctx.options.fieldAddonRight));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.layoutNode == null ? null : ctx.layoutNode.type) === "range");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.description) && (!(ctx.options == null ? null : ctx.options.showErrors) || !(ctx.options == null ? null : ctx.options.errorMessage)));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.showErrors) && (ctx.options == null ? null : ctx.options.errorMessage));
        }
    }, dependencies: [i2.NgIf, i3$3.DefaultValueAccessor, i3$3.NgControlStatus, i3$3.RequiredValidator, i3$3.FormControlDirective, i4$1.MatFormField, i4$1.MatHint, i4$1.MatError, i4$1.MatPrefix, i4$1.MatSuffix, i5$1.MatInput], styles: ["mat-error[_ngcontent-%COMP%]{font-size:75%;margin-top:-1rem;margin-bottom:.5rem}  mat-form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix{width:initial}"] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialNumberComponent, [{
            type: Component,
            args: [{ selector: 'material-number-widget', template: `
      <mat-form-field
              [class]="options?.htmlClass || ''"
              [floatLabel]="options?.floatPlaceholder || (options?.notitle ? 'never' : 'auto')"
              [style.width]="'100%'">
      <span matPrefix *ngIf="options?.prefix || options?.fieldAddonLeft"
            [innerHTML]="options?.prefix || options?.fieldAddonLeft"></span>
          <input matInput *ngIf="boundControl"
                 [formControl]="formControl"
                 [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                 [attr.max]="options?.maximum"
                 [attr.min]="options?.minimum"
                 [attr.step]="options?.multipleOf || options?.step || 'any'"
                 [id]="'control' + layoutNode?._id"
                 [name]="controlName"
                 [placeholder]="options?.notitle ? options?.placeholder : options?.title"
                 [readonly]="options?.readonly ? 'readonly' : null"
                 [required]="options?.required"
                 [style.width]="'100%'"
                 [type]="'number'"
                 (blur)="options.showErrors = true">
          <input matInput *ngIf="!boundControl"
                 [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                 [attr.max]="options?.maximum"
                 [attr.min]="options?.minimum"
                 [attr.step]="options?.multipleOf || options?.step || 'any'"
                 [disabled]="controlDisabled"
                 [id]="'control' + layoutNode?._id"
                 [name]="controlName"
                 [placeholder]="options?.notitle ? options?.placeholder : options?.title"
                 [readonly]="options?.readonly ? 'readonly' : null"
                 [required]="options?.required"
                 [style.width]="'100%'"
                 [type]="'number'"
                 [value]="controlValue"
                 (input)="updateValue($event)"
                 (blur)="options.showErrors = true">
          <span matSuffix *ngIf="options?.suffix || options?.fieldAddonRight"
                [innerHTML]="options?.suffix || options?.fieldAddonRight"></span>
          <mat-hint *ngIf="layoutNode?.type === 'range'" align="start"
                    [innerHTML]="controlValue"></mat-hint>
          <mat-hint *ngIf="options?.description && (!options?.showErrors || !options?.errorMessage)"
                    align="end" [innerHTML]="options?.description"></mat-hint>
      </mat-form-field>
      <mat-error *ngIf="options?.showErrors && options?.errorMessage"
                 [innerHTML]="options?.errorMessage"></mat-error>`, styles: ["mat-error{font-size:75%;margin-top:-1rem;margin-bottom:.5rem}::ng-deep mat-form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix{width:initial}\n"] }]
        }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] });
})();

class MaterialOneOfComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
}
MaterialOneOfComponent.ɵfac = function MaterialOneOfComponent_Factory(t) { return new (t || MaterialOneOfComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialOneOfComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialOneOfComponent, selectors: [["material-one-of-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 0, vars: 0, template: function MaterialOneOfComponent_Template(rf, ctx) { }, encapsulation: 2 });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialOneOfComponent, [{
            type: Component,
            args: [{
                    selector: 'material-one-of-widget',
                    template: ``,
                }]
        }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] });
})();

function MaterialRadiosComponent_div_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "div");
        i0.ɵɵelement(1, "label", 4);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r0 = i0.ɵɵnextContext();
        i0.ɵɵadvance(1);
        i0.ɵɵclassMap((ctx_r0.options == null ? null : ctx_r0.options.labelHtmlClass) || "");
        i0.ɵɵstyleProp("display", (ctx_r0.options == null ? null : ctx_r0.options.notitle) ? "none" : "");
        i0.ɵɵproperty("innerHTML", ctx_r0.options == null ? null : ctx_r0.options.title, i0.ɵɵsanitizeHtml);
        i0.ɵɵattribute("for", "control" + (ctx_r0.layoutNode == null ? null : ctx_r0.layoutNode._id));
    }
}
function MaterialRadiosComponent_mat_radio_group_2_mat_radio_button_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "mat-radio-button", 7);
        i0.ɵɵelement(1, "span", 4);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const radioItem_r5 = ctx.$implicit;
        const ctx_r4 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("id", "control" + (ctx_r4.layoutNode == null ? null : ctx_r4.layoutNode._id) + "/" + (radioItem_r5 == null ? null : radioItem_r5.name))("value", radioItem_r5 == null ? null : radioItem_r5.value);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("innerHTML", radioItem_r5 == null ? null : radioItem_r5.name, i0.ɵɵsanitizeHtml);
    }
}
function MaterialRadiosComponent_mat_radio_group_2_Template(rf, ctx) {
    if (rf & 1) {
        const _r7 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "mat-radio-group", 5);
        i0.ɵɵlistener("blur", function MaterialRadiosComponent_mat_radio_group_2_Template_mat_radio_group_blur_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r6 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r6.options.showErrors = true); });
        i0.ɵɵtemplate(1, MaterialRadiosComponent_mat_radio_group_2_mat_radio_button_1_Template, 2, 3, "mat-radio-button", 6);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r1 = i0.ɵɵnextContext();
        i0.ɵɵstyleProp("flex-direction", ctx_r1.flexDirection);
        i0.ɵɵproperty("formControl", ctx_r1.formControl)("name", ctx_r1.controlName);
        i0.ɵɵattribute("aria-describedby", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Status")("readonly", (ctx_r1.options == null ? null : ctx_r1.options.readonly) ? "readonly" : null)("required", ctx_r1.options == null ? null : ctx_r1.options.required);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx_r1.radiosList);
    }
}
function MaterialRadiosComponent_mat_radio_group_3_mat_radio_button_1_Template(rf, ctx) {
    if (rf & 1) {
        const _r11 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "mat-radio-button", 10);
        i0.ɵɵlistener("click", function MaterialRadiosComponent_mat_radio_group_3_mat_radio_button_1_Template_mat_radio_button_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r11); const radioItem_r9 = restoredCtx.$implicit; const ctx_r10 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r10.updateValue(radioItem_r9 == null ? null : radioItem_r9.value)); });
        i0.ɵɵelement(1, "span", 4);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const radioItem_r9 = ctx.$implicit;
        const ctx_r8 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("id", "control" + (ctx_r8.layoutNode == null ? null : ctx_r8.layoutNode._id) + "/" + (radioItem_r9 == null ? null : radioItem_r9.name))("value", radioItem_r9 == null ? null : radioItem_r9.value);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("innerHTML", radioItem_r9 == null ? null : radioItem_r9.name, i0.ɵɵsanitizeHtml);
    }
}
function MaterialRadiosComponent_mat_radio_group_3_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "mat-radio-group", 8);
        i0.ɵɵtemplate(1, MaterialRadiosComponent_mat_radio_group_3_mat_radio_button_1_Template, 2, 3, "mat-radio-button", 9);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r2 = i0.ɵɵnextContext();
        i0.ɵɵstyleProp("flex-direction", ctx_r2.flexDirection);
        i0.ɵɵproperty("disabled", ctx_r2.controlDisabled || (ctx_r2.options == null ? null : ctx_r2.options.readonly))("name", ctx_r2.controlName)("value", ctx_r2.controlValue);
        i0.ɵɵattribute("aria-describedby", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Status")("readonly", (ctx_r2.options == null ? null : ctx_r2.options.readonly) ? "readonly" : null)("required", ctx_r2.options == null ? null : ctx_r2.options.required);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx_r2.radiosList);
    }
}
function MaterialRadiosComponent_mat_error_4_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "mat-error", 4);
    }
    if (rf & 2) {
        const ctx_r3 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", ctx_r3.options == null ? null : ctx_r3.options.errorMessage, i0.ɵɵsanitizeHtml);
    }
}
class MaterialRadiosComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.flexDirection = 'column';
        this.radiosList = [];
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        if (this.layoutNode.type === 'radios-inline') {
            this.flexDirection = 'row';
        }
        this.radiosList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
        this.jsf.initializeControl(this, !this.options.readonly);
    }
    updateValue(value) {
        this.options.showErrors = true;
        this.jsf.updateValue(this, value);
    }
}
MaterialRadiosComponent.ɵfac = function MaterialRadiosComponent_Factory(t) { return new (t || MaterialRadiosComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialRadiosComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialRadiosComponent, selectors: [["material-radios-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 5, vars: 4, consts: [[4, "ngIf"], [3, "formControl", "flex-direction", "name", "blur", 4, "ngIf"], [3, "flex-direction", "disabled", "name", "value", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], [3, "innerHTML"], [3, "formControl", "name", "blur"], [3, "id", "value", 4, "ngFor", "ngForOf"], [3, "id", "value"], [3, "disabled", "name", "value"], [3, "id", "value", "click", 4, "ngFor", "ngForOf"], [3, "id", "value", "click"]], template: function MaterialRadiosComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵtemplate(1, MaterialRadiosComponent_div_1_Template, 2, 6, "div", 0);
            i0.ɵɵtemplate(2, MaterialRadiosComponent_mat_radio_group_2_Template, 2, 8, "mat-radio-group", 1);
            i0.ɵɵtemplate(3, MaterialRadiosComponent_mat_radio_group_3_Template, 2, 9, "mat-radio-group", 2);
            i0.ɵɵtemplate(4, MaterialRadiosComponent_mat_error_4_Template, 1, 1, "mat-error", 3);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.title);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.boundControl);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.boundControl);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.showErrors) && (ctx.options == null ? null : ctx.options.errorMessage));
        }
    }, dependencies: [i2.NgForOf, i2.NgIf, i3$3.NgControlStatus, i3$3.RequiredValidator, i3$3.FormControlDirective, i4$1.MatError, i5$2.MatRadioGroup, i5$2.MatRadioButton], styles: ["mat-radio-group[_ngcontent-%COMP%]{display:inline-flex}mat-radio-button[_ngcontent-%COMP%]{margin:2px}mat-error[_ngcontent-%COMP%]{font-size:75%}"] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialRadiosComponent, [{
            type: Component,
            args: [{ selector: 'material-radios-widget', template: `
      <div>
          <div *ngIf="options?.title">
              <label
                      [attr.for]="'control' + layoutNode?._id"
                      [class]="options?.labelHtmlClass || ''"
                      [style.display]="options?.notitle ? 'none' : ''"
                      [innerHTML]="options?.title"></label>
          </div>
          <mat-radio-group *ngIf="boundControl"
                           [formControl]="formControl"
                           [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                           [attr.readonly]="options?.readonly ? 'readonly' : null"
                           [attr.required]="options?.required"
                           [style.flex-direction]="flexDirection"
                           [name]="controlName"
                           (blur)="options.showErrors = true">
              <mat-radio-button *ngFor="let radioItem of radiosList"
                                [id]="'control' + layoutNode?._id + '/' + radioItem?.name"
                                [value]="radioItem?.value">
                  <span [innerHTML]="radioItem?.name"></span>
              </mat-radio-button>
          </mat-radio-group>
          <mat-radio-group *ngIf="!boundControl"
                           [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                           [attr.readonly]="options?.readonly ? 'readonly' : null"
                           [attr.required]="options?.required"
                           [style.flex-direction]="flexDirection"
                           [disabled]="controlDisabled || options?.readonly"
                           [name]="controlName"
                           [value]="controlValue">
              <mat-radio-button *ngFor="let radioItem of radiosList"
                                [id]="'control' + layoutNode?._id + '/' + radioItem?.name"
                                [value]="radioItem?.value"
                                (click)="updateValue(radioItem?.value)">
                  <span [innerHTML]="radioItem?.name"></span>
              </mat-radio-button>
          </mat-radio-group>
          <mat-error *ngIf="options?.showErrors && options?.errorMessage"
                     [innerHTML]="options?.errorMessage"></mat-error>
      </div>`, styles: ["mat-radio-group{display:inline-flex}mat-radio-button{margin:2px}mat-error{font-size:75%}\n"] }]
        }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] });
})();

function MaterialSelectComponent_span_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "span", 7);
    }
    if (rf & 2) {
        const ctx_r0 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", (ctx_r0.options == null ? null : ctx_r0.options.prefix) || (ctx_r0.options == null ? null : ctx_r0.options.fieldAddonLeft), i0.ɵɵsanitizeHtml);
    }
}
function MaterialSelectComponent_mat_select_2_ng_template_1_mat_option_0_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "mat-option", 12);
        i0.ɵɵelement(1, "span", 13);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const selectItem_r7 = i0.ɵɵnextContext().$implicit;
        i0.ɵɵproperty("value", selectItem_r7 == null ? null : selectItem_r7.value);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("innerHTML", selectItem_r7 == null ? null : selectItem_r7.name, i0.ɵɵsanitizeHtml);
    }
}
function MaterialSelectComponent_mat_select_2_ng_template_1_mat_optgroup_1_mat_option_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "mat-option", 12);
        i0.ɵɵelement(1, "span", 13);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const subItem_r12 = ctx.$implicit;
        i0.ɵɵproperty("value", subItem_r12 == null ? null : subItem_r12.value);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("innerHTML", subItem_r12 == null ? null : subItem_r12.name, i0.ɵɵsanitizeHtml);
    }
}
function MaterialSelectComponent_mat_select_2_ng_template_1_mat_optgroup_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "mat-optgroup", 14);
        i0.ɵɵtemplate(1, MaterialSelectComponent_mat_select_2_ng_template_1_mat_optgroup_1_mat_option_1_Template, 2, 2, "mat-option", 15);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const selectItem_r7 = i0.ɵɵnextContext().$implicit;
        i0.ɵɵproperty("label", selectItem_r7 == null ? null : selectItem_r7.group);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", selectItem_r7.items);
    }
}
function MaterialSelectComponent_mat_select_2_ng_template_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵtemplate(0, MaterialSelectComponent_mat_select_2_ng_template_1_mat_option_0_Template, 2, 2, "mat-option", 10);
        i0.ɵɵtemplate(1, MaterialSelectComponent_mat_select_2_ng_template_1_mat_optgroup_1_Template, 2, 2, "mat-optgroup", 11);
    }
    if (rf & 2) {
        const selectItem_r7 = ctx.$implicit;
        const ctx_r6 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("ngIf", !ctx_r6.isArray(selectItem_r7 == null ? null : selectItem_r7.items));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r6.isArray(selectItem_r7 == null ? null : selectItem_r7.items));
    }
}
function MaterialSelectComponent_mat_select_2_Template(rf, ctx) {
    if (rf & 1) {
        const _r15 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "mat-select", 8);
        i0.ɵɵlistener("blur", function MaterialSelectComponent_mat_select_2_Template_mat_select_blur_0_listener() { i0.ɵɵrestoreView(_r15); const ctx_r14 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r14.options.showErrors = true); });
        i0.ɵɵtemplate(1, MaterialSelectComponent_mat_select_2_ng_template_1_Template, 2, 2, "ng-template", 9);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r1 = i0.ɵɵnextContext();
        i0.ɵɵstyleProp("width", "100%");
        i0.ɵɵproperty("formControl", ctx_r1.formControl)("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id))("multiple", ctx_r1.options == null ? null : ctx_r1.options.multiple)("placeholder", (ctx_r1.options == null ? null : ctx_r1.options.notitle) ? ctx_r1.options == null ? null : ctx_r1.options.placeholder : ctx_r1.options == null ? null : ctx_r1.options.title)("required", ctx_r1.options == null ? null : ctx_r1.options.required);
        i0.ɵɵattribute("aria-describedby", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Status")("name", ctx_r1.controlName);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx_r1.selectList);
    }
}
function MaterialSelectComponent_mat_select_3_ng_template_1_mat_option_0_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "mat-option", 12);
        i0.ɵɵelement(1, "span", 13);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const selectItem_r17 = i0.ɵɵnextContext().$implicit;
        const ctx_r18 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("value", selectItem_r17 == null ? null : selectItem_r17.value);
        i0.ɵɵattribute("selected", (selectItem_r17 == null ? null : selectItem_r17.value) === ctx_r18.controlValue);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("innerHTML", selectItem_r17 == null ? null : selectItem_r17.name, i0.ɵɵsanitizeHtml);
    }
}
function MaterialSelectComponent_mat_select_3_ng_template_1_mat_optgroup_1_mat_option_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "mat-option", 12);
        i0.ɵɵelement(1, "span", 13);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const subItem_r22 = ctx.$implicit;
        const ctx_r21 = i0.ɵɵnextContext(4);
        i0.ɵɵproperty("value", subItem_r22 == null ? null : subItem_r22.value);
        i0.ɵɵattribute("selected", (subItem_r22 == null ? null : subItem_r22.value) === ctx_r21.controlValue);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("innerHTML", subItem_r22 == null ? null : subItem_r22.name, i0.ɵɵsanitizeHtml);
    }
}
function MaterialSelectComponent_mat_select_3_ng_template_1_mat_optgroup_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "mat-optgroup", 14);
        i0.ɵɵtemplate(1, MaterialSelectComponent_mat_select_3_ng_template_1_mat_optgroup_1_mat_option_1_Template, 2, 3, "mat-option", 15);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const selectItem_r17 = i0.ɵɵnextContext().$implicit;
        i0.ɵɵproperty("label", selectItem_r17 == null ? null : selectItem_r17.group);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", selectItem_r17.items);
    }
}
function MaterialSelectComponent_mat_select_3_ng_template_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵtemplate(0, MaterialSelectComponent_mat_select_3_ng_template_1_mat_option_0_Template, 2, 3, "mat-option", 10);
        i0.ɵɵtemplate(1, MaterialSelectComponent_mat_select_3_ng_template_1_mat_optgroup_1_Template, 2, 2, "mat-optgroup", 11);
    }
    if (rf & 2) {
        const selectItem_r17 = ctx.$implicit;
        const ctx_r16 = i0.ɵɵnextContext(2);
        i0.ɵɵproperty("ngIf", !ctx_r16.isArray(selectItem_r17 == null ? null : selectItem_r17.items));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r16.isArray(selectItem_r17 == null ? null : selectItem_r17.items));
    }
}
function MaterialSelectComponent_mat_select_3_Template(rf, ctx) {
    if (rf & 1) {
        const _r25 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "mat-select", 16);
        i0.ɵɵlistener("blur", function MaterialSelectComponent_mat_select_3_Template_mat_select_blur_0_listener() { i0.ɵɵrestoreView(_r25); const ctx_r24 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r24.options.showErrors = true); })("selectionChange", function MaterialSelectComponent_mat_select_3_Template_mat_select_selectionChange_0_listener($event) { i0.ɵɵrestoreView(_r25); const ctx_r26 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r26.updateValue($event)); });
        i0.ɵɵtemplate(1, MaterialSelectComponent_mat_select_3_ng_template_1_Template, 2, 2, "ng-template", 9);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r2 = i0.ɵɵnextContext();
        i0.ɵɵstyleProp("width", "100%");
        i0.ɵɵproperty("disabled", ctx_r2.controlDisabled || (ctx_r2.options == null ? null : ctx_r2.options.readonly))("id", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id))("multiple", ctx_r2.options == null ? null : ctx_r2.options.multiple)("placeholder", (ctx_r2.options == null ? null : ctx_r2.options.notitle) ? ctx_r2.options == null ? null : ctx_r2.options.placeholder : ctx_r2.options == null ? null : ctx_r2.options.title)("required", ctx_r2.options == null ? null : ctx_r2.options.required)("value", ctx_r2.controlValue);
        i0.ɵɵattribute("aria-describedby", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Status")("name", ctx_r2.controlName);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx_r2.selectList);
    }
}
function MaterialSelectComponent_span_4_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "span", 17);
    }
    if (rf & 2) {
        const ctx_r3 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", (ctx_r3.options == null ? null : ctx_r3.options.suffix) || (ctx_r3.options == null ? null : ctx_r3.options.fieldAddonRight), i0.ɵɵsanitizeHtml);
    }
}
function MaterialSelectComponent_mat_hint_5_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "mat-hint", 18);
    }
    if (rf & 2) {
        const ctx_r4 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", ctx_r4.options == null ? null : ctx_r4.options.description, i0.ɵɵsanitizeHtml);
    }
}
function MaterialSelectComponent_mat_error_6_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "mat-error", 13);
    }
    if (rf & 2) {
        const ctx_r5 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", ctx_r5.options == null ? null : ctx_r5.options.errorMessage, i0.ɵɵsanitizeHtml);
    }
}
class MaterialSelectComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.selectList = [];
        this.isArray = isArray;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.selectList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, !!this.options.required, !!this.options.flatList);
        this.jsf.initializeControl(this, !this.options.readonly);
        if (!this.options.notitle && !this.options.description && this.options.placeholder) {
            this.options.description = this.options.placeholder;
        }
    }
    updateValue(event) {
        this.options.showErrors = true;
        this.jsf.updateValue(this, event.value);
    }
}
MaterialSelectComponent.ɵfac = function MaterialSelectComponent_Factory(t) { return new (t || MaterialSelectComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialSelectComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialSelectComponent, selectors: [["material-select-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 7, vars: 11, consts: [[3, "floatLabel"], ["matPrefix", "", 3, "innerHTML", 4, "ngIf"], [3, "formControl", "id", "multiple", "placeholder", "required", "width", "blur", 4, "ngIf"], [3, "disabled", "id", "multiple", "placeholder", "required", "width", "value", "blur", "selectionChange", 4, "ngIf"], ["matSuffix", "", 3, "innerHTML", 4, "ngIf"], ["align", "end", 3, "innerHTML", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], ["matPrefix", "", 3, "innerHTML"], [3, "formControl", "id", "multiple", "placeholder", "required", "blur"], ["ngFor", "", 3, "ngForOf"], [3, "value", 4, "ngIf"], [3, "label", 4, "ngIf"], [3, "value"], [3, "innerHTML"], [3, "label"], [3, "value", 4, "ngFor", "ngForOf"], [3, "disabled", "id", "multiple", "placeholder", "required", "value", "blur", "selectionChange"], ["matSuffix", "", 3, "innerHTML"], ["align", "end", 3, "innerHTML"]], template: function MaterialSelectComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "mat-form-field", 0);
            i0.ɵɵtemplate(1, MaterialSelectComponent_span_1_Template, 1, 1, "span", 1);
            i0.ɵɵtemplate(2, MaterialSelectComponent_mat_select_2_Template, 2, 10, "mat-select", 2);
            i0.ɵɵtemplate(3, MaterialSelectComponent_mat_select_3_Template, 2, 11, "mat-select", 3);
            i0.ɵɵtemplate(4, MaterialSelectComponent_span_4_Template, 1, 1, "span", 4);
            i0.ɵɵtemplate(5, MaterialSelectComponent_mat_hint_5_Template, 1, 1, "mat-hint", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(6, MaterialSelectComponent_mat_error_6_Template, 1, 1, "mat-error", 6);
        }
        if (rf & 2) {
            i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.htmlClass) || "");
            i0.ɵɵstyleProp("width", "100%");
            i0.ɵɵproperty("floatLabel", (ctx.options == null ? null : ctx.options.floatPlaceholder) || ((ctx.options == null ? null : ctx.options.notitle) ? "never" : "auto"));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.prefix) || (ctx.options == null ? null : ctx.options.fieldAddonLeft));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.boundControl);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.boundControl);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.suffix) || (ctx.options == null ? null : ctx.options.fieldAddonRight));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.description) && (!(ctx.options == null ? null : ctx.options.showErrors) || !(ctx.options == null ? null : ctx.options.errorMessage)));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.showErrors) && (ctx.options == null ? null : ctx.options.errorMessage));
        }
    }, dependencies: [i2.NgForOf, i2.NgIf, i3$3.NgControlStatus, i3$3.RequiredValidator, i3$3.FormControlDirective, i4$6.MatOption, i4$6.MatOptgroup, i4$1.MatFormField, i4$1.MatHint, i4$1.MatError, i4$1.MatPrefix, i4$1.MatSuffix, i6$1.MatSelect], styles: ["mat-error[_ngcontent-%COMP%]{font-size:75%;margin-top:-1rem;margin-bottom:.5rem}  mat-form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix{width:initial}"] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialSelectComponent, [{
            type: Component,
            args: [{ selector: 'material-select-widget', template: `
      <mat-form-field
              [class]="options?.htmlClass || ''"
              [floatLabel]="options?.floatPlaceholder || (options?.notitle ? 'never' : 'auto')"
              [style.width]="'100%'">
      <span matPrefix *ngIf="options?.prefix || options?.fieldAddonLeft"
            [innerHTML]="options?.prefix || options?.fieldAddonLeft"></span>
          <mat-select *ngIf="boundControl"
                      [formControl]="formControl"
                      [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                      [attr.name]="controlName"
                      [id]="'control' + layoutNode?._id"
                      [multiple]="options?.multiple"
                      [placeholder]="options?.notitle ? options?.placeholder : options?.title"
                      [required]="options?.required"
                      [style.width]="'100%'"
                      (blur)="options.showErrors = true">
              <ng-template ngFor let-selectItem [ngForOf]="selectList">
                  <mat-option *ngIf="!isArray(selectItem?.items)"
                              [value]="selectItem?.value">
                      <span [innerHTML]="selectItem?.name"></span>
                  </mat-option>
                  <mat-optgroup *ngIf="isArray(selectItem?.items)"
                                [label]="selectItem?.group">
                      <mat-option *ngFor="let subItem of selectItem.items"
                                  [value]="subItem?.value">
                          <span [innerHTML]="subItem?.name"></span>
                      </mat-option>
                  </mat-optgroup>
              </ng-template>
          </mat-select>
          <mat-select *ngIf="!boundControl"
                      [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                      [attr.name]="controlName"
                      [disabled]="controlDisabled || options?.readonly"
                      [id]="'control' + layoutNode?._id"
                      [multiple]="options?.multiple"
                      [placeholder]="options?.notitle ? options?.placeholder : options?.title"
                      [required]="options?.required"
                      [style.width]="'100%'"
                      [value]="controlValue"
                      (blur)="options.showErrors = true"
                      (selectionChange)="updateValue($event)">
              <ng-template ngFor let-selectItem [ngForOf]="selectList">
                  <mat-option *ngIf="!isArray(selectItem?.items)"
                              [attr.selected]="selectItem?.value === controlValue"
                              [value]="selectItem?.value">
                      <span [innerHTML]="selectItem?.name"></span>
                  </mat-option>
                  <mat-optgroup *ngIf="isArray(selectItem?.items)"
                                [label]="selectItem?.group">
                      <mat-option *ngFor="let subItem of selectItem.items"
                                  [attr.selected]="subItem?.value === controlValue"
                                  [value]="subItem?.value">
                          <span [innerHTML]="subItem?.name"></span>
                      </mat-option>
                  </mat-optgroup>
              </ng-template>
          </mat-select>
          <span matSuffix *ngIf="options?.suffix || options?.fieldAddonRight"
                [innerHTML]="options?.suffix || options?.fieldAddonRight"></span>
          <mat-hint *ngIf="options?.description && (!options?.showErrors || !options?.errorMessage)"
                    align="end" [innerHTML]="options?.description"></mat-hint>
      </mat-form-field>
      <mat-error *ngIf="options?.showErrors && options?.errorMessage"
                 [innerHTML]="options?.errorMessage"></mat-error>`, styles: ["mat-error{font-size:75%;margin-top:-1rem;margin-bottom:.5rem}::ng-deep mat-form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix{width:initial}\n"] }]
        }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] });
})();

function MaterialSliderComponent_mat_slider_0_Template(rf, ctx) {
    if (rf & 1) {
        const _r4 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "mat-slider", 3);
        i0.ɵɵlistener("blur", function MaterialSliderComponent_mat_slider_0_Template_mat_slider_blur_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.options.showErrors = true); });
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r0 = i0.ɵɵnextContext();
        i0.ɵɵstyleProp("width", "100%");
        i0.ɵɵproperty("formControl", ctx_r0.formControl)("id", "control" + (ctx_r0.layoutNode == null ? null : ctx_r0.layoutNode._id))("max", ctx_r0.options == null ? null : ctx_r0.options.maximum)("min", ctx_r0.options == null ? null : ctx_r0.options.minimum)("step", (ctx_r0.options == null ? null : ctx_r0.options.multipleOf) || (ctx_r0.options == null ? null : ctx_r0.options.step) || "any");
        i0.ɵɵattribute("aria-describedby", "control" + (ctx_r0.layoutNode == null ? null : ctx_r0.layoutNode._id) + "Status");
    }
}
function MaterialSliderComponent_mat_slider_1_Template(rf, ctx) {
    if (rf & 1) {
        const _r6 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "mat-slider", 4);
        i0.ɵɵlistener("blur", function MaterialSliderComponent_mat_slider_1_Template_mat_slider_blur_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r5.options.showErrors = true); })("change", function MaterialSliderComponent_mat_slider_1_Template_mat_slider_change_0_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.updateValue($event)); });
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r1 = i0.ɵɵnextContext();
        i0.ɵɵstyleProp("width", "100%");
        i0.ɵɵproperty("disabled", ctx_r1.controlDisabled || (ctx_r1.options == null ? null : ctx_r1.options.readonly))("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id))("max", ctx_r1.options == null ? null : ctx_r1.options.maximum)("min", ctx_r1.options == null ? null : ctx_r1.options.minimum)("step", (ctx_r1.options == null ? null : ctx_r1.options.multipleOf) || (ctx_r1.options == null ? null : ctx_r1.options.step) || "any")("value", ctx_r1.controlValue);
        i0.ɵɵattribute("aria-describedby", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Status");
    }
}
function MaterialSliderComponent_mat_error_2_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "mat-error", 5);
    }
    if (rf & 2) {
        const ctx_r2 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", ctx_r2.options == null ? null : ctx_r2.options.errorMessage, i0.ɵɵsanitizeHtml);
    }
}
class MaterialSliderComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.allowNegative = true;
        this.allowDecimal = true;
        this.allowExponents = false;
        this.lastValidNumber = '';
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this, !this.options.readonly);
    }
    updateValue(event) {
        this.options.showErrors = true;
        this.jsf.updateValue(this, event.value);
    }
}
MaterialSliderComponent.ɵfac = function MaterialSliderComponent_Factory(t) { return new (t || MaterialSliderComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialSliderComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialSliderComponent, selectors: [["material-slider-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 3, vars: 3, consts: [["thumbLabel", "", 3, "formControl", "id", "max", "min", "step", "width", "blur", 4, "ngIf"], ["thumbLabel", "", 3, "disabled", "id", "max", "min", "step", "width", "value", "blur", "change", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], ["thumbLabel", "", 3, "formControl", "id", "max", "min", "step", "blur"], ["thumbLabel", "", 3, "disabled", "id", "max", "min", "step", "value", "blur", "change"], [3, "innerHTML"]], template: function MaterialSliderComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵtemplate(0, MaterialSliderComponent_mat_slider_0_Template, 1, 8, "mat-slider", 0);
            i0.ɵɵtemplate(1, MaterialSliderComponent_mat_slider_1_Template, 1, 9, "mat-slider", 1);
            i0.ɵɵtemplate(2, MaterialSliderComponent_mat_error_2_Template, 1, 1, "mat-error", 2);
        }
        if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.boundControl);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.boundControl);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.showErrors) && (ctx.options == null ? null : ctx.options.errorMessage));
        }
    }, dependencies: [i2.NgIf, i3$3.NgControlStatus, i3$3.FormControlDirective, i4$1.MatError, i5$3.MatSlider], styles: ["mat-error[_ngcontent-%COMP%]{font-size:75%}"] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialSliderComponent, [{
            type: Component,
            args: [{ selector: 'material-slider-widget', template: `
      <mat-slider thumbLabel *ngIf="boundControl"
                  [formControl]="formControl"
                  [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                  [id]="'control' + layoutNode?._id"
                  [max]="options?.maximum"
                  [min]="options?.minimum"
                  [step]="options?.multipleOf || options?.step || 'any'"
                  [style.width]="'100%'"
                  (blur)="options.showErrors = true"></mat-slider>
      <mat-slider thumbLabel *ngIf="!boundControl"
                  [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                  [disabled]="controlDisabled || options?.readonly"
                  [id]="'control' + layoutNode?._id"
                  [max]="options?.maximum"
                  [min]="options?.minimum"
                  [step]="options?.multipleOf || options?.step || 'any'"
                  [style.width]="'100%'"
                  [value]="controlValue"
                  (blur)="options.showErrors = true"
                  (change)="updateValue($event)"></mat-slider>
      <mat-error *ngIf="options?.showErrors && options?.errorMessage"
                 [innerHTML]="options?.errorMessage"></mat-error>`, styles: ["mat-error{font-size:75%}\n"] }]
        }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] });
})();

class MaterialStepperComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
}
MaterialStepperComponent.ɵfac = function MaterialStepperComponent_Factory(t) { return new (t || MaterialStepperComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialStepperComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialStepperComponent, selectors: [["material-stepper-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 0, vars: 0, template: function MaterialStepperComponent_Template(rf, ctx) { }, encapsulation: 2 });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialStepperComponent, [{
            type: Component,
            args: [{
                    selector: 'material-stepper-widget',
                    template: ``,
                }]
        }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] });
})();

function MaterialTabsComponent_a_1_span_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "span", 5);
    }
    if (rf & 2) {
        const ctx_r5 = i0.ɵɵnextContext();
        const item_r2 = ctx_r5.$implicit;
        const i_r3 = ctx_r5.index;
        const ctx_r4 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", ctx_r4.setTabTitle(item_r2, i_r3), i0.ɵɵsanitizeHtml);
    }
}
function MaterialTabsComponent_a_1_Template(rf, ctx) {
    if (rf & 1) {
        const _r7 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "a", 3);
        i0.ɵɵlistener("click", function MaterialTabsComponent_a_1_Template_a_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r7); const i_r3 = restoredCtx.index; const ctx_r6 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r6.select(i_r3)); });
        i0.ɵɵtemplate(1, MaterialTabsComponent_a_1_span_1_Template, 1, 1, "span", 4);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const item_r2 = ctx.$implicit;
        const i_r3 = ctx.index;
        const ctx_r0 = i0.ɵɵnextContext();
        i0.ɵɵproperty("active", ctx_r0.selectedItem === i_r3);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r0.showAddTab || item_r2.type !== "$ref");
    }
}
const _c0 = function () { return []; };
function MaterialTabsComponent_div_2_select_framework_widget_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "select-framework-widget", 7);
    }
    if (rf & 2) {
        const ctx_r11 = i0.ɵɵnextContext();
        const i_r9 = ctx_r11.index;
        const layoutItem_r8 = ctx_r11.$implicit;
        const ctx_r10 = i0.ɵɵnextContext();
        i0.ɵɵclassMap(((ctx_r10.options == null ? null : ctx_r10.options.fieldHtmlClass) || "") + " " + ((ctx_r10.options == null ? null : ctx_r10.options.activeClass) || "") + " " + ((ctx_r10.options == null ? null : ctx_r10.options.style == null ? null : ctx_r10.options.style.selected) || ""));
        i0.ɵɵproperty("dataIndex", (ctx_r10.layoutNode == null ? null : ctx_r10.layoutNode.dataType) === "array" ? (ctx_r10.dataIndex || i0.ɵɵpureFunction0(5, _c0)).concat(i_r9) : ctx_r10.dataIndex)("layoutIndex", (ctx_r10.layoutIndex || i0.ɵɵpureFunction0(6, _c0)).concat(i_r9))("layoutNode", layoutItem_r8);
    }
}
function MaterialTabsComponent_div_2_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "div");
        i0.ɵɵtemplate(1, MaterialTabsComponent_div_2_select_framework_widget_1_Template, 1, 7, "select-framework-widget", 6);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const i_r9 = ctx.index;
        const ctx_r1 = i0.ɵɵnextContext();
        i0.ɵɵclassMap((ctx_r1.options == null ? null : ctx_r1.options.htmlClass) || "");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r1.selectedItem === i_r9);
    }
}
class MaterialTabsComponent {
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
MaterialTabsComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialTabsComponent, selectors: [["material-tabs-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 3, vars: 5, consts: [["mat-tab-nav-bar", ""], ["mat-tab-link", "", 3, "active", "click", 4, "ngFor", "ngForOf"], [3, "class", 4, "ngFor", "ngForOf"], ["mat-tab-link", "", 3, "active", "click"], [3, "innerHTML", 4, "ngIf"], [3, "innerHTML"], [3, "class", "dataIndex", "layoutIndex", "layoutNode", 4, "ngIf"], [3, "dataIndex", "layoutIndex", "layoutNode"]], template: function MaterialTabsComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "nav", 0);
            i0.ɵɵtemplate(1, MaterialTabsComponent_a_1_Template, 2, 2, "a", 1);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(2, MaterialTabsComponent_div_2_Template, 2, 3, "div", 2);
        }
        if (rf & 2) {
            i0.ɵɵstyleProp("width", "100%");
            i0.ɵɵattribute("aria-label", (ctx.options == null ? null : ctx.options.label) || (ctx.options == null ? null : ctx.options.title) || "");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx.layoutNode == null ? null : ctx.layoutNode.items);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx.layoutNode == null ? null : ctx.layoutNode.items);
        }
    }, dependencies: [i2.NgForOf, i2.NgIf, i3$4.MatTabNav, i3$4.MatTabLink, i1.SelectFrameworkComponent], styles: ["a[_ngcontent-%COMP%]{cursor:pointer}"] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialTabsComponent, [{
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
            }] });
})();

function MaterialTextareaComponent_span_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "span", 7);
    }
    if (rf & 2) {
        const ctx_r0 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", (ctx_r0.options == null ? null : ctx_r0.options.prefix) || (ctx_r0.options == null ? null : ctx_r0.options.fieldAddonLeft), i0.ɵɵsanitizeHtml);
    }
}
function MaterialTextareaComponent_textarea_2_Template(rf, ctx) {
    if (rf & 1) {
        const _r7 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "textarea", 8);
        i0.ɵɵlistener("blur", function MaterialTextareaComponent_textarea_2_Template_textarea_blur_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r6 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r6.options.showErrors = true); });
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r1 = i0.ɵɵnextContext();
        i0.ɵɵstyleProp("width", "100%");
        i0.ɵɵproperty("formControl", ctx_r1.formControl)("required", ctx_r1.options == null ? null : ctx_r1.options.required)("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id))("name", ctx_r1.controlName)("placeholder", (ctx_r1.options == null ? null : ctx_r1.options.notitle) ? ctx_r1.options == null ? null : ctx_r1.options.placeholder : ctx_r1.options == null ? null : ctx_r1.options.title)("readonly", (ctx_r1.options == null ? null : ctx_r1.options.readonly) ? "readonly" : null);
        i0.ɵɵattribute("aria-describedby", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Status")("list", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Autocomplete")("maxlength", ctx_r1.options == null ? null : ctx_r1.options.maxLength)("minlength", ctx_r1.options == null ? null : ctx_r1.options.minLength)("pattern", ctx_r1.options == null ? null : ctx_r1.options.pattern);
    }
}
function MaterialTextareaComponent_textarea_3_Template(rf, ctx) {
    if (rf & 1) {
        const _r9 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "textarea", 9);
        i0.ɵɵlistener("input", function MaterialTextareaComponent_textarea_3_Template_textarea_input_0_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r8 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r8.updateValue($event)); })("blur", function MaterialTextareaComponent_textarea_3_Template_textarea_blur_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r10 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r10.options.showErrors = true); });
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r2 = i0.ɵɵnextContext();
        i0.ɵɵstyleProp("width", "100%");
        i0.ɵɵproperty("required", ctx_r2.options == null ? null : ctx_r2.options.required)("disabled", ctx_r2.controlDisabled)("id", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id))("name", ctx_r2.controlName)("placeholder", (ctx_r2.options == null ? null : ctx_r2.options.notitle) ? ctx_r2.options == null ? null : ctx_r2.options.placeholder : ctx_r2.options == null ? null : ctx_r2.options.title)("readonly", (ctx_r2.options == null ? null : ctx_r2.options.readonly) ? "readonly" : null)("value", ctx_r2.controlValue);
        i0.ɵɵattribute("aria-describedby", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Status")("list", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Autocomplete")("maxlength", ctx_r2.options == null ? null : ctx_r2.options.maxLength)("minlength", ctx_r2.options == null ? null : ctx_r2.options.minLength)("pattern", ctx_r2.options == null ? null : ctx_r2.options.pattern);
    }
}
function MaterialTextareaComponent_span_4_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "span", 10);
    }
    if (rf & 2) {
        const ctx_r3 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", (ctx_r3.options == null ? null : ctx_r3.options.suffix) || (ctx_r3.options == null ? null : ctx_r3.options.fieldAddonRight), i0.ɵɵsanitizeHtml);
    }
}
function MaterialTextareaComponent_mat_hint_5_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "mat-hint", 11);
    }
    if (rf & 2) {
        const ctx_r4 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", ctx_r4.options == null ? null : ctx_r4.options.description, i0.ɵɵsanitizeHtml);
    }
}
function MaterialTextareaComponent_mat_error_6_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "mat-error", 12);
    }
    if (rf & 2) {
        const ctx_r5 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", ctx_r5.options == null ? null : ctx_r5.options.errorMessage, i0.ɵɵsanitizeHtml);
    }
}
class MaterialTextareaComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (!this.options.notitle && !this.options.description && this.options.placeholder) {
            this.options.description = this.options.placeholder;
        }
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
}
MaterialTextareaComponent.ɵfac = function MaterialTextareaComponent_Factory(t) { return new (t || MaterialTextareaComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialTextareaComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialTextareaComponent, selectors: [["material-textarea-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 7, vars: 11, consts: [[3, "floatLabel"], ["matPrefix", "", 3, "innerHTML", 4, "ngIf"], ["matInput", "", 3, "formControl", "required", "id", "name", "placeholder", "readonly", "width", "blur", 4, "ngIf"], ["matInput", "", 3, "required", "disabled", "id", "name", "placeholder", "readonly", "width", "value", "input", "blur", 4, "ngIf"], ["matSuffix", "", 3, "innerHTML", 4, "ngIf"], ["align", "end", 3, "innerHTML", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], ["matPrefix", "", 3, "innerHTML"], ["matInput", "", 3, "formControl", "required", "id", "name", "placeholder", "readonly", "blur"], ["matInput", "", 3, "required", "disabled", "id", "name", "placeholder", "readonly", "value", "input", "blur"], ["matSuffix", "", 3, "innerHTML"], ["align", "end", 3, "innerHTML"], [3, "innerHTML"]], template: function MaterialTextareaComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "mat-form-field", 0);
            i0.ɵɵtemplate(1, MaterialTextareaComponent_span_1_Template, 1, 1, "span", 1);
            i0.ɵɵtemplate(2, MaterialTextareaComponent_textarea_2_Template, 1, 13, "textarea", 2);
            i0.ɵɵtemplate(3, MaterialTextareaComponent_textarea_3_Template, 1, 14, "textarea", 3);
            i0.ɵɵtemplate(4, MaterialTextareaComponent_span_4_Template, 1, 1, "span", 4);
            i0.ɵɵtemplate(5, MaterialTextareaComponent_mat_hint_5_Template, 1, 1, "mat-hint", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(6, MaterialTextareaComponent_mat_error_6_Template, 1, 1, "mat-error", 6);
        }
        if (rf & 2) {
            i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.htmlClass) || "");
            i0.ɵɵstyleProp("width", "100%");
            i0.ɵɵproperty("floatLabel", (ctx.options == null ? null : ctx.options.floatPlaceholder) || ((ctx.options == null ? null : ctx.options.notitle) ? "never" : "auto"));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.prefix) || (ctx.options == null ? null : ctx.options.fieldAddonLeft));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.boundControl);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.boundControl);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.suffix) || (ctx.options == null ? null : ctx.options.fieldAddonRight));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.description) && (!(ctx.options == null ? null : ctx.options.showErrors) || !(ctx.options == null ? null : ctx.options.errorMessage)));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.showErrors) && (ctx.options == null ? null : ctx.options.errorMessage));
        }
    }, dependencies: [i2.NgIf, i3$3.DefaultValueAccessor, i3$3.NgControlStatus, i3$3.RequiredValidator, i3$3.MinLengthValidator, i3$3.MaxLengthValidator, i3$3.PatternValidator, i3$3.FormControlDirective, i4$1.MatFormField, i4$1.MatHint, i4$1.MatError, i4$1.MatPrefix, i4$1.MatSuffix, i5$1.MatInput], styles: ["mat-error[_ngcontent-%COMP%]{font-size:75%;margin-top:-1rem;margin-bottom:.5rem}  mat-form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix{width:initial}"] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialTextareaComponent, [{
            type: Component,
            args: [{ selector: 'material-textarea-widget', template: `
      <mat-form-field
              [class]="options?.htmlClass || ''"
              [floatLabel]="options?.floatPlaceholder || (options?.notitle ? 'never' : 'auto')"
              [style.width]="'100%'">
      <span matPrefix *ngIf="options?.prefix || options?.fieldAddonLeft"
            [innerHTML]="options?.prefix || options?.fieldAddonLeft"></span>
          <textarea matInput *ngIf="boundControl"
                    [formControl]="formControl"
                    [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                    [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
                    [attr.maxlength]="options?.maxLength"
                    [attr.minlength]="options?.minLength"
                    [attr.pattern]="options?.pattern"
                    [required]="options?.required"
                    [id]="'control' + layoutNode?._id"
                    [name]="controlName"
                    [placeholder]="options?.notitle ? options?.placeholder : options?.title"
                    [readonly]="options?.readonly ? 'readonly' : null"
                    [style.width]="'100%'"
                    (blur)="options.showErrors = true"></textarea>
          <textarea matInput *ngIf="!boundControl"
                    [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                    [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
                    [attr.maxlength]="options?.maxLength"
                    [attr.minlength]="options?.minLength"
                    [attr.pattern]="options?.pattern"
                    [required]="options?.required"
                    [disabled]="controlDisabled"
                    [id]="'control' + layoutNode?._id"
                    [name]="controlName"
                    [placeholder]="options?.notitle ? options?.placeholder : options?.title"
                    [readonly]="options?.readonly ? 'readonly' : null"
                    [style.width]="'100%'"
                    [value]="controlValue"
                    (input)="updateValue($event)"
                    (blur)="options.showErrors = true"></textarea>
          <span matSuffix *ngIf="options?.suffix || options?.fieldAddonRight"
                [innerHTML]="options?.suffix || options?.fieldAddonRight"></span>
          <mat-hint *ngIf="options?.description && (!options?.showErrors || !options?.errorMessage)"
                    align="end" [innerHTML]="options?.description"></mat-hint>
      </mat-form-field>
      <mat-error *ngIf="options?.showErrors && options?.errorMessage"
                 [innerHTML]="options?.errorMessage"></mat-error>`, styles: ["mat-error{font-size:75%;margin-top:-1rem;margin-bottom:.5rem}::ng-deep mat-form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix{width:initial}\n"] }]
        }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] });
})();

function MaterialDesignFrameworkComponent__svg_svg_1_Template(rf, ctx) {
    if (rf & 1) {
        const _r3 = i0.ɵɵgetCurrentView();
        i0.ɵɵnamespaceSVG();
        i0.ɵɵelementStart(0, "svg", 4);
        i0.ɵɵlistener("click", function MaterialDesignFrameworkComponent__svg_svg_1_Template__svg_svg_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.removeItem()); });
        i0.ɵɵelement(1, "path", 5);
        i0.ɵɵelementEnd();
    }
}
function MaterialDesignFrameworkComponent_div_3_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "div", 6);
    }
}
class MaterialDesignFrameworkComponent {
    constructor(changeDetector, jsf) {
        this.changeDetector = changeDetector;
        this.jsf = jsf;
        this.frameworkInitialized = false;
        this.formControl = null;
        this.parentArray = null;
        this.isOrderable = false;
        this.dynamicTitle = null;
    }
    get showRemoveButton() {
        if (!this.layoutNode || !this.widgetOptions.removable ||
            this.widgetOptions.readonly || this.layoutNode.type === '$ref') {
            return false;
        }
        if (this.layoutNode.recursiveReference) {
            return true;
        }
        if (!this.layoutNode.arrayItem || !this.parentArray) {
            return false;
        }
        return this.parentArray.items.length - 1 <= this.parentArray.options.minItems ? false :
            this.layoutNode.arrayItemType === 'list' ? true :
                this.layoutIndex[this.layoutIndex.length - 1] === this.parentArray.items.length - 2;
    }
    ngOnInit() {
        this.initializeFramework();
    }
    ngOnChanges() {
        if (!this.frameworkInitialized) {
            this.initializeFramework();
        }
        if (this.dynamicTitle) {
            this.updateTitle();
        }
    }
    initializeFramework() {
        if (this.layoutNode) {
            this.options = _.cloneDeep(this.layoutNode.options || {});
            this.widgetLayoutNode = Object.assign(Object.assign({}, this.layoutNode), { options: _.cloneDeep(this.layoutNode.options || {}) });
            this.widgetOptions = this.widgetLayoutNode.options;
            this.formControl = this.jsf.getFormControl(this);
            if (isDefined(this.widgetOptions.minimum) &&
                isDefined(this.widgetOptions.maximum) &&
                this.widgetOptions.multipleOf >= 1) {
                this.layoutNode.type = 'range';
            }
            if (!['$ref', 'advancedfieldset', 'authfieldset', 'button', 'card',
                'checkbox', 'expansion-panel', 'help', 'message', 'msg', 'section',
                'submit', 'tabarray', 'tabs'].includes(this.layoutNode.type) &&
                /{{.+?}}/.test(this.widgetOptions.title || '')) {
                this.dynamicTitle = this.widgetOptions.title;
                this.updateTitle();
            }
            if (this.layoutNode.arrayItem && this.layoutNode.type !== '$ref') {
                this.parentArray = this.jsf.getParentNode(this);
                if (this.parentArray) {
                    this.isOrderable =
                        this.parentArray.type.slice(0, 3) !== 'tab' &&
                            this.layoutNode.arrayItemType === 'list' &&
                            !this.widgetOptions.readonly &&
                            this.parentArray.options.orderable;
                }
            }
            this.frameworkInitialized = true;
        }
        else {
            this.options = {};
        }
    }
    updateTitle() {
        this.widgetLayoutNode.options.title = this.jsf.parseText(this.dynamicTitle, this.jsf.getFormControlValue(this), this.jsf.getFormControlGroup(this).value, this.dataIndex[this.dataIndex.length - 1]);
    }
    removeItem() {
        this.jsf.removeItem(this);
    }
}
MaterialDesignFrameworkComponent.ɵfac = function MaterialDesignFrameworkComponent_Factory(t) { return new (t || MaterialDesignFrameworkComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialDesignFrameworkComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialDesignFrameworkComponent, selectors: [["material-design-framework"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, features: [i0.ɵɵNgOnChangesFeature], decls: 4, vars: 11, consts: [[3, "orderable", "dataIndex", "layoutIndex", "layoutNode"], ["xmlns", "http://www.w3.org/2000/svg", "height", "18", "width", "18", "viewBox", "0 0 24 24", "class", "close-button", 3, "click", 4, "ngIf"], [3, "dataIndex", "layoutIndex", "layoutNode"], ["class", "spacer", 4, "ngIf"], ["xmlns", "http://www.w3.org/2000/svg", "height", "18", "width", "18", "viewBox", "0 0 24 24", 1, "close-button", 3, "click"], ["d", "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"], [1, "spacer"]], template: function MaterialDesignFrameworkComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, MaterialDesignFrameworkComponent__svg_svg_1_Template, 2, 0, "svg", 1);
            i0.ɵɵelement(2, "select-widget-widget", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(3, MaterialDesignFrameworkComponent_div_3_Template, 1, 0, "div", 3);
        }
        if (rf & 2) {
            i0.ɵɵclassProp("array-item", (ctx.widgetLayoutNode == null ? null : ctx.widgetLayoutNode.arrayItem) && (ctx.widgetLayoutNode == null ? null : ctx.widgetLayoutNode.type) !== "$ref");
            i0.ɵɵproperty("orderable", ctx.isOrderable)("dataIndex", ctx.dataIndex)("layoutIndex", ctx.layoutIndex)("layoutNode", ctx.widgetLayoutNode);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.showRemoveButton);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("dataIndex", ctx.dataIndex)("layoutIndex", ctx.layoutIndex)("layoutNode", ctx.widgetLayoutNode);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.widgetLayoutNode == null ? null : ctx.widgetLayoutNode.arrayItem) && (ctx.widgetLayoutNode == null ? null : ctx.widgetLayoutNode.type) !== "$ref");
        }
    }, dependencies: [i2.NgIf, i1.SelectWidgetComponent, i1.OrderableDirective], styles: [".array-item[_ngcontent-%COMP%]{border-radius:2px;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;padding:6px;position:relative;transition:all .28s cubic-bezier(.4,0,.2,1)}.close-button[_ngcontent-%COMP%]{cursor:pointer;position:absolute;top:6px;right:6px;fill:#0006;visibility:hidden;z-index:500}.close-button[_ngcontent-%COMP%]:hover{fill:#000c}.array-item[_ngcontent-%COMP%]:hover > .close-button[_ngcontent-%COMP%]{visibility:visible}.spacer[_ngcontent-%COMP%]{margin:6px 0}[draggable=true][_ngcontent-%COMP%]:hover{box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f;cursor:move;z-index:10}[draggable=true].drag-target-top[_ngcontent-%COMP%]{box-shadow:0 -2px #000;position:relative;z-index:20}[draggable=true].drag-target-bottom[_ngcontent-%COMP%]{box-shadow:0 2px #000;position:relative;z-index:20}"] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialDesignFrameworkComponent, [{
            type: Component,
            args: [{ selector: 'material-design-framework', template: `
      <div
              [class.array-item]="widgetLayoutNode?.arrayItem && widgetLayoutNode?.type !== '$ref'"
              [orderable]="isOrderable"
              [dataIndex]="dataIndex"
              [layoutIndex]="layoutIndex"
              [layoutNode]="widgetLayoutNode">
          <svg *ngIf="showRemoveButton"
               xmlns="http://www.w3.org/2000/svg"
               height="18" width="18" viewBox="0 0 24 24"
               class="close-button"
               (click)="removeItem()">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
          </svg>
          <select-widget-widget
                  [dataIndex]="dataIndex"
                  [layoutIndex]="layoutIndex"
                  [layoutNode]="widgetLayoutNode"></select-widget-widget>
      </div>
      <div class="spacer" *ngIf="widgetLayoutNode?.arrayItem && widgetLayoutNode?.type !== '$ref'"></div>`, styles: [".array-item{border-radius:2px;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;padding:6px;position:relative;transition:all .28s cubic-bezier(.4,0,.2,1)}.close-button{cursor:pointer;position:absolute;top:6px;right:6px;fill:#0006;visibility:hidden;z-index:500}.close-button:hover{fill:#000c}.array-item:hover>.close-button{visibility:visible}.spacer{margin:6px 0}[draggable=true]:hover{box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f;cursor:move;z-index:10}[draggable=true].drag-target-top{box-shadow:0 -2px #000;position:relative;z-index:20}[draggable=true].drag-target-bottom{box-shadow:0 2px #000;position:relative;z-index:20}\n"] }]
        }], function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] });
})();

class MaterialDesignFramework extends Framework {
    constructor() {
        super(...arguments);
        this.name = 'material-design';
        this.framework = MaterialDesignFrameworkComponent;
        this.stylesheets = [
            '//fonts.googleapis.com/icon?family=Material+Icons',
            '//fonts.googleapis.com/css?family=Roboto:300,400,500,700',
        ];
        this.widgets = {
            root: FlexLayoutRootComponent,
            section: FlexLayoutSectionComponent,
            $ref: MaterialAddReferenceComponent,
            button: MaterialButtonComponent,
            'button-group': MaterialButtonGroupComponent,
            checkbox: MaterialCheckboxComponent,
            checkboxes: MaterialCheckboxesComponent,
            'chip-list': MaterialChipListComponent,
            date: MaterialDatepickerComponent,
            file: MaterialFileComponent,
            number: MaterialNumberComponent,
            'one-of': MaterialOneOfComponent,
            radios: MaterialRadiosComponent,
            select: MaterialSelectComponent,
            slider: MaterialSliderComponent,
            stepper: MaterialStepperComponent,
            tabs: MaterialTabsComponent,
            text: MaterialInputComponent,
            textarea: MaterialTextareaComponent,
            'alt-date': 'date',
            'any-of': 'one-of',
            card: 'section',
            color: 'text',
            'expansion-panel': 'section',
            hidden: 'none',
            image: 'none',
            integer: 'number',
            radiobuttons: 'button-group',
            range: 'slider',
            submit: 'button',
            tagsinput: 'chip-list',
            wizard: 'stepper',
        };
    }
}
MaterialDesignFramework.ɵfac = function () { let ɵMaterialDesignFramework_BaseFactory; return function MaterialDesignFramework_Factory(t) { return (ɵMaterialDesignFramework_BaseFactory || (ɵMaterialDesignFramework_BaseFactory = i0.ɵɵgetInheritedFactory(MaterialDesignFramework)))(t || MaterialDesignFramework); }; }();
MaterialDesignFramework.ɵprov = i0.ɵɵdefineInjectable({ token: MaterialDesignFramework, factory: MaterialDesignFramework.ɵfac });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialDesignFramework, [{
            type: Injectable
        }], null, null);
})();

class MaterialDesignFrameworkModule {
    static forRoot() {
        return {
            ngModule: MaterialDesignFrameworkModule,
            providers: [
                {
                    provide: Framework,
                    useClass: MaterialDesignFramework,
                    multi: true,
                },
            ],
        };
    }
}
MaterialDesignFrameworkModule.ɵfac = function MaterialDesignFrameworkModule_Factory(t) { return new (t || MaterialDesignFrameworkModule)(); };
MaterialDesignFrameworkModule.ɵmod = i0.ɵɵdefineNgModule({ type: MaterialDesignFrameworkModule });
MaterialDesignFrameworkModule.ɵinj = i0.ɵɵdefineInjector({ imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatStepperModule,
        MatTabsModule,
        MatTooltipModule,
        WidgetLibraryModule] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialDesignFrameworkModule, [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        FlexLayoutModule,
                        MatAutocompleteModule,
                        MatButtonModule,
                        MatButtonToggleModule,
                        MatCardModule,
                        MatCheckboxModule,
                        MatChipsModule,
                        MatDatepickerModule,
                        MatExpansionModule,
                        MatFormFieldModule,
                        MatIconModule,
                        MatInputModule,
                        MatNativeDateModule,
                        MatRadioModule,
                        MatSelectModule,
                        MatSliderModule,
                        MatSlideToggleModule,
                        MatStepperModule,
                        MatTabsModule,
                        MatTooltipModule,
                        WidgetLibraryModule,
                    ],
                    declarations: [
                        FlexLayoutRootComponent,
                        FlexLayoutSectionComponent,
                        MaterialAddReferenceComponent,
                        MaterialOneOfComponent,
                        MaterialButtonComponent,
                        MaterialButtonGroupComponent,
                        MaterialCheckboxComponent,
                        MaterialCheckboxesComponent,
                        MaterialChipListComponent,
                        MaterialDatepickerComponent,
                        MaterialFileComponent,
                        MaterialInputComponent,
                        MaterialNumberComponent,
                        MaterialRadiosComponent,
                        MaterialSelectComponent,
                        MaterialSliderComponent,
                        MaterialStepperComponent,
                        MaterialTabsComponent,
                        MaterialTextareaComponent,
                        MaterialDesignFrameworkComponent,
                    ],
                    exports: [
                        FlexLayoutRootComponent,
                        FlexLayoutSectionComponent,
                        MaterialAddReferenceComponent,
                        MaterialOneOfComponent,
                        MaterialButtonComponent,
                        MaterialButtonGroupComponent,
                        MaterialCheckboxComponent,
                        MaterialCheckboxesComponent,
                        MaterialChipListComponent,
                        MaterialDatepickerComponent,
                        MaterialFileComponent,
                        MaterialInputComponent,
                        MaterialNumberComponent,
                        MaterialRadiosComponent,
                        MaterialSelectComponent,
                        MaterialSliderComponent,
                        MaterialStepperComponent,
                        MaterialTabsComponent,
                        MaterialTextareaComponent,
                        MaterialDesignFrameworkComponent,
                    ],
                    entryComponents: [
                        FlexLayoutRootComponent,
                        FlexLayoutSectionComponent,
                        MaterialAddReferenceComponent,
                        MaterialOneOfComponent,
                        MaterialButtonComponent,
                        MaterialButtonGroupComponent,
                        MaterialCheckboxComponent,
                        MaterialCheckboxesComponent,
                        MaterialChipListComponent,
                        MaterialDatepickerComponent,
                        MaterialFileComponent,
                        MaterialInputComponent,
                        MaterialNumberComponent,
                        MaterialRadiosComponent,
                        MaterialSelectComponent,
                        MaterialSliderComponent,
                        MaterialStepperComponent,
                        MaterialTabsComponent,
                        MaterialTextareaComponent,
                        MaterialDesignFrameworkComponent,
                    ],
                }]
        }], null, null);
})();
(function () {
    (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(MaterialDesignFrameworkModule, { declarations: [FlexLayoutRootComponent,
            FlexLayoutSectionComponent,
            MaterialAddReferenceComponent,
            MaterialOneOfComponent,
            MaterialButtonComponent,
            MaterialButtonGroupComponent,
            MaterialCheckboxComponent,
            MaterialCheckboxesComponent,
            MaterialChipListComponent,
            MaterialDatepickerComponent,
            MaterialFileComponent,
            MaterialInputComponent,
            MaterialNumberComponent,
            MaterialRadiosComponent,
            MaterialSelectComponent,
            MaterialSliderComponent,
            MaterialStepperComponent,
            MaterialTabsComponent,
            MaterialTextareaComponent,
            MaterialDesignFrameworkComponent], imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            FlexLayoutModule,
            MatAutocompleteModule,
            MatButtonModule,
            MatButtonToggleModule,
            MatCardModule,
            MatCheckboxModule,
            MatChipsModule,
            MatDatepickerModule,
            MatExpansionModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatNativeDateModule,
            MatRadioModule,
            MatSelectModule,
            MatSliderModule,
            MatSlideToggleModule,
            MatStepperModule,
            MatTabsModule,
            MatTooltipModule,
            WidgetLibraryModule], exports: [FlexLayoutRootComponent,
            FlexLayoutSectionComponent,
            MaterialAddReferenceComponent,
            MaterialOneOfComponent,
            MaterialButtonComponent,
            MaterialButtonGroupComponent,
            MaterialCheckboxComponent,
            MaterialCheckboxesComponent,
            MaterialChipListComponent,
            MaterialDatepickerComponent,
            MaterialFileComponent,
            MaterialInputComponent,
            MaterialNumberComponent,
            MaterialRadiosComponent,
            MaterialSelectComponent,
            MaterialSliderComponent,
            MaterialStepperComponent,
            MaterialTabsComponent,
            MaterialTextareaComponent,
            MaterialDesignFrameworkComponent] });
})();

export { FlexLayoutRootComponent, FlexLayoutSectionComponent, MaterialAddReferenceComponent, MaterialButtonComponent, MaterialButtonGroupComponent, MaterialCheckboxComponent, MaterialCheckboxesComponent, MaterialChipListComponent, MaterialDatepickerComponent, MaterialDesignFramework, MaterialDesignFrameworkComponent, MaterialDesignFrameworkModule, MaterialFileComponent, MaterialInputComponent, MaterialNumberComponent, MaterialOneOfComponent, MaterialRadiosComponent, MaterialSelectComponent, MaterialSliderComponent, MaterialStepperComponent, MaterialTabsComponent, MaterialTextareaComponent };
//# sourceMappingURL=ngsf-material-design-framework.mjs.map
//# sourceMappingURL=ngsf-material-design-framework.mjs.map
