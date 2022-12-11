import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '@ngsf/widget-library';
import * as i0 from "@angular/core";
import * as i1 from "@ngsf/widget-library";
import * as i2 from "@angular/common";
import * as i3 from "@angular/flex-layout/flex";
import * as i4 from "@angular/material/card";
import * as i5 from "@angular/material/expansion";
import * as i6 from "@angular/material/form-field";
import * as i7 from "./flex-layout-root.component";
function FlexLayoutSectionComponent_div_0_label_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 6);
    i0.ɵɵlistener("click", function FlexLayoutSectionComponent_div_0_label_1_Template_label_click_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r7.toggleExpanded()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap("legend " + ((ctx_r4.options == null ? null : ctx_r4.options.labelHtmlClass) || ""));
    i0.ɵɵproperty("innerHTML", ctx_r4.sectionTitle, i0.ɵɵsanitizeHtml);
} }
function FlexLayoutSectionComponent_div_0_flex_layout_root_widget_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "flex-layout-root-widget", 7);
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("display", ctx_r5.getFlexAttribute("display"))("flex-direction", ctx_r5.getFlexAttribute("flex-direction"))("flex-wrap", ctx_r5.getFlexAttribute("flex-wrap"))("justify-content", ctx_r5.getFlexAttribute("justify-content"))("align-items", ctx_r5.getFlexAttribute("align-items"))("align-content", ctx_r5.getFlexAttribute("align-content"));
    i0.ɵɵclassProp("form-flex-column", ctx_r5.getFlexAttribute("flex-direction") === "column")("form-flex-row", ctx_r5.getFlexAttribute("flex-direction") === "row");
    i0.ɵɵproperty("layout", ctx_r5.layoutNode.items)("dataIndex", ctx_r5.dataIndex)("layoutIndex", ctx_r5.layoutIndex)("isFlexItem", ctx_r5.getFlexAttribute("is-flex"))("fxLayout", ctx_r5.getFlexAttribute("layout"))("fxLayoutGap", ctx_r5.options == null ? null : ctx_r5.options.fxLayoutGap)("fxLayoutAlign", ctx_r5.options == null ? null : ctx_r5.options.fxLayoutAlign);
    i0.ɵɵattribute("fxFlexFill", ctx_r5.options == null ? null : ctx_r5.options.fxLayoutAlign);
} }
function FlexLayoutSectionComponent_div_0_mat_error_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-error", 8);
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("innerHTML", ctx_r6.options == null ? null : ctx_r6.options.errorMessage, i0.ɵɵsanitizeHtml);
} }
function FlexLayoutSectionComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, FlexLayoutSectionComponent_div_0_label_1_Template, 1, 3, "label", 3);
    i0.ɵɵtemplate(2, FlexLayoutSectionComponent_div_0_flex_layout_root_widget_2_Template, 1, 24, "flex-layout-root-widget", 4);
    i0.ɵɵtemplate(3, FlexLayoutSectionComponent_div_0_mat_error_3_Template, 1, 1, "mat-error", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r0.options == null ? null : ctx_r0.options.htmlClass) || "");
    i0.ɵɵclassProp("expandable", (ctx_r0.options == null ? null : ctx_r0.options.expandable) && !ctx_r0.expanded)("expanded", (ctx_r0.options == null ? null : ctx_r0.options.expandable) && ctx_r0.expanded);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.sectionTitle);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.expanded);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r0.options == null ? null : ctx_r0.options.showErrors) && (ctx_r0.options == null ? null : ctx_r0.options.errorMessage));
} }
function FlexLayoutSectionComponent_fieldset_1_legend_1_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "legend", 6);
    i0.ɵɵlistener("click", function FlexLayoutSectionComponent_fieldset_1_legend_1_Template_legend_click_0_listener() { i0.ɵɵrestoreView(_r13); const ctx_r12 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r12.toggleExpanded()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap("legend " + ((ctx_r9.options == null ? null : ctx_r9.options.labelHtmlClass) || ""));
    i0.ɵɵproperty("innerHTML", ctx_r9.sectionTitle, i0.ɵɵsanitizeHtml);
} }
function FlexLayoutSectionComponent_fieldset_1_flex_layout_root_widget_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "flex-layout-root-widget", 7);
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("display", ctx_r10.getFlexAttribute("display"))("flex-direction", ctx_r10.getFlexAttribute("flex-direction"))("flex-wrap", ctx_r10.getFlexAttribute("flex-wrap"))("justify-content", ctx_r10.getFlexAttribute("justify-content"))("align-items", ctx_r10.getFlexAttribute("align-items"))("align-content", ctx_r10.getFlexAttribute("align-content"));
    i0.ɵɵclassProp("form-flex-column", ctx_r10.getFlexAttribute("flex-direction") === "column")("form-flex-row", ctx_r10.getFlexAttribute("flex-direction") === "row");
    i0.ɵɵproperty("layout", ctx_r10.layoutNode.items)("dataIndex", ctx_r10.dataIndex)("layoutIndex", ctx_r10.layoutIndex)("isFlexItem", ctx_r10.getFlexAttribute("is-flex"))("fxLayout", ctx_r10.getFlexAttribute("layout"))("fxLayoutGap", ctx_r10.options == null ? null : ctx_r10.options.fxLayoutGap)("fxLayoutAlign", ctx_r10.options == null ? null : ctx_r10.options.fxLayoutAlign);
    i0.ɵɵattribute("fxFlexFill", ctx_r10.options == null ? null : ctx_r10.options.fxLayoutAlign);
} }
function FlexLayoutSectionComponent_fieldset_1_mat_error_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-error", 8);
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("innerHTML", ctx_r11.options == null ? null : ctx_r11.options.errorMessage, i0.ɵɵsanitizeHtml);
} }
function FlexLayoutSectionComponent_fieldset_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "fieldset", 9);
    i0.ɵɵtemplate(1, FlexLayoutSectionComponent_fieldset_1_legend_1_Template, 1, 3, "legend", 3);
    i0.ɵɵtemplate(2, FlexLayoutSectionComponent_fieldset_1_flex_layout_root_widget_2_Template, 1, 24, "flex-layout-root-widget", 4);
    i0.ɵɵtemplate(3, FlexLayoutSectionComponent_fieldset_1_mat_error_3_Template, 1, 1, "mat-error", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
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
} }
function FlexLayoutSectionComponent_mat_card_2_mat_card_header_1_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-card-header")(1, "legend", 6);
    i0.ɵɵlistener("click", function FlexLayoutSectionComponent_mat_card_2_mat_card_header_1_Template_legend_click_1_listener() { i0.ɵɵrestoreView(_r18); const ctx_r17 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r17.toggleExpanded()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r14 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap("legend " + ((ctx_r14.options == null ? null : ctx_r14.options.labelHtmlClass) || ""));
    i0.ɵɵproperty("innerHTML", ctx_r14.sectionTitle, i0.ɵɵsanitizeHtml);
} }
function FlexLayoutSectionComponent_mat_card_2_mat_card_content_2_flex_layout_root_widget_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "flex-layout-root-widget", 7);
} if (rf & 2) {
    const ctx_r19 = i0.ɵɵnextContext(3);
    i0.ɵɵstyleProp("display", ctx_r19.getFlexAttribute("display"))("flex-direction", ctx_r19.getFlexAttribute("flex-direction"))("flex-wrap", ctx_r19.getFlexAttribute("flex-wrap"))("justify-content", ctx_r19.getFlexAttribute("justify-content"))("align-items", ctx_r19.getFlexAttribute("align-items"))("align-content", ctx_r19.getFlexAttribute("align-content"));
    i0.ɵɵclassProp("form-flex-column", ctx_r19.getFlexAttribute("flex-direction") === "column")("form-flex-row", ctx_r19.getFlexAttribute("flex-direction") === "row");
    i0.ɵɵproperty("layout", ctx_r19.layoutNode.items)("dataIndex", ctx_r19.dataIndex)("layoutIndex", ctx_r19.layoutIndex)("isFlexItem", ctx_r19.getFlexAttribute("is-flex"))("fxLayout", ctx_r19.getFlexAttribute("layout"))("fxLayoutGap", ctx_r19.options == null ? null : ctx_r19.options.fxLayoutGap)("fxLayoutAlign", ctx_r19.options == null ? null : ctx_r19.options.fxLayoutAlign);
    i0.ɵɵattribute("fxFlexFill", ctx_r19.options == null ? null : ctx_r19.options.fxLayoutAlign);
} }
function FlexLayoutSectionComponent_mat_card_2_mat_card_content_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-card-content")(1, "fieldset", 9);
    i0.ɵɵtemplate(2, FlexLayoutSectionComponent_mat_card_2_mat_card_content_2_flex_layout_root_widget_2_Template, 1, 24, "flex-layout-root-widget", 4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r15 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r15.options == null ? null : ctx_r15.options.readonly);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r15.expanded);
} }
function FlexLayoutSectionComponent_mat_card_2_mat_error_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-error", 8);
} if (rf & 2) {
    const ctx_r16 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("innerHTML", ctx_r16.options == null ? null : ctx_r16.options.errorMessage, i0.ɵɵsanitizeHtml);
} }
function FlexLayoutSectionComponent_mat_card_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-card");
    i0.ɵɵtemplate(1, FlexLayoutSectionComponent_mat_card_2_mat_card_header_1_Template, 2, 3, "mat-card-header", 10);
    i0.ɵɵtemplate(2, FlexLayoutSectionComponent_mat_card_2_mat_card_content_2_Template, 3, 2, "mat-card-content", 10);
    i0.ɵɵelementStart(3, "mat-card-footer");
    i0.ɵɵtemplate(4, FlexLayoutSectionComponent_mat_card_2_mat_error_4_Template, 1, 1, "mat-error", 5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r2.options == null ? null : ctx_r2.options.htmlClass) || "");
    i0.ɵɵclassProp("expandable", (ctx_r2.options == null ? null : ctx_r2.options.expandable) && !ctx_r2.expanded)("expanded", (ctx_r2.options == null ? null : ctx_r2.options.expandable) && ctx_r2.expanded);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.sectionTitle);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.expanded);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", (ctx_r2.options == null ? null : ctx_r2.options.showErrors) && (ctx_r2.options == null ? null : ctx_r2.options.errorMessage));
} }
function FlexLayoutSectionComponent_mat_expansion_panel_3_legend_3_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "legend", 6);
    i0.ɵɵlistener("click", function FlexLayoutSectionComponent_mat_expansion_panel_3_legend_3_Template_legend_click_0_listener() { i0.ɵɵrestoreView(_r24); const ctx_r23 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r23.toggleExpanded()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r20 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap(ctx_r20.options == null ? null : ctx_r20.options.labelHtmlClass);
    i0.ɵɵproperty("innerHTML", ctx_r20.sectionTitle, i0.ɵɵsanitizeHtml);
} }
function FlexLayoutSectionComponent_mat_expansion_panel_3_flex_layout_root_widget_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "flex-layout-root-widget", 7);
} if (rf & 2) {
    const ctx_r21 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("display", ctx_r21.getFlexAttribute("display"))("flex-direction", ctx_r21.getFlexAttribute("flex-direction"))("flex-wrap", ctx_r21.getFlexAttribute("flex-wrap"))("justify-content", ctx_r21.getFlexAttribute("justify-content"))("align-items", ctx_r21.getFlexAttribute("align-items"))("align-content", ctx_r21.getFlexAttribute("align-content"));
    i0.ɵɵclassProp("form-flex-column", ctx_r21.getFlexAttribute("flex-direction") === "column")("form-flex-row", ctx_r21.getFlexAttribute("flex-direction") === "row");
    i0.ɵɵproperty("layout", ctx_r21.layoutNode.items)("dataIndex", ctx_r21.dataIndex)("layoutIndex", ctx_r21.layoutIndex)("isFlexItem", ctx_r21.getFlexAttribute("is-flex"))("fxLayout", ctx_r21.getFlexAttribute("layout"))("fxLayoutGap", ctx_r21.options == null ? null : ctx_r21.options.fxLayoutGap)("fxLayoutAlign", ctx_r21.options == null ? null : ctx_r21.options.fxLayoutAlign);
    i0.ɵɵattribute("fxFlexFill", ctx_r21.options == null ? null : ctx_r21.options.fxLayoutAlign);
} }
function FlexLayoutSectionComponent_mat_expansion_panel_3_mat_error_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-error", 8);
} if (rf & 2) {
    const ctx_r22 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("innerHTML", ctx_r22.options == null ? null : ctx_r22.options.errorMessage, i0.ɵɵsanitizeHtml);
} }
function FlexLayoutSectionComponent_mat_expansion_panel_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-expansion-panel", 11)(1, "mat-expansion-panel-header")(2, "mat-panel-title");
    i0.ɵɵtemplate(3, FlexLayoutSectionComponent_mat_expansion_panel_3_legend_3_Template, 1, 3, "legend", 3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "fieldset", 9);
    i0.ɵɵtemplate(5, FlexLayoutSectionComponent_mat_expansion_panel_3_flex_layout_root_widget_5_Template, 1, 24, "flex-layout-root-widget", 4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, FlexLayoutSectionComponent_mat_expansion_panel_3_mat_error_6_Template, 1, 1, "mat-error", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
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
} }
export class FlexLayoutSectionComponent {
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
FlexLayoutSectionComponent.ɵcmp = i0.ɵɵdefineComponent({ type: FlexLayoutSectionComponent, selectors: [["flex-layout-section-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 4, vars: 4, consts: [[3, "class", "expandable", "expanded", 4, "ngIf"], [3, "class", "expandable", "expanded", "disabled", 4, "ngIf"], [3, "expanded", "hideToggle", 4, "ngIf"], [3, "class", "innerHTML", "click", 4, "ngIf"], [3, "layout", "dataIndex", "layoutIndex", "isFlexItem", "form-flex-column", "form-flex-row", "display", "flex-direction", "flex-wrap", "justify-content", "align-items", "align-content", "fxLayout", "fxLayoutGap", "fxLayoutAlign", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], [3, "innerHTML", "click"], [3, "layout", "dataIndex", "layoutIndex", "isFlexItem", "fxLayout", "fxLayoutGap", "fxLayoutAlign"], [3, "innerHTML"], [3, "disabled"], [4, "ngIf"], [3, "expanded", "hideToggle"]], template: function FlexLayoutSectionComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, FlexLayoutSectionComponent_div_0_Template, 4, 9, "div", 0);
        i0.ɵɵtemplate(1, FlexLayoutSectionComponent_fieldset_1_Template, 4, 10, "fieldset", 1);
        i0.ɵɵtemplate(2, FlexLayoutSectionComponent_mat_card_2_Template, 5, 9, "mat-card", 0);
        i0.ɵɵtemplate(3, FlexLayoutSectionComponent_mat_expansion_panel_3_Template, 7, 6, "mat-expansion-panel", 2);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.containerType === "div");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.containerType === "fieldset");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.containerType === "card");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.containerType === "expansion-panel");
    } }, dependencies: [i2.NgIf, i3.DefaultLayoutDirective, i3.DefaultLayoutGapDirective, i3.DefaultLayoutAlignDirective, i3.FlexFillDirective, i4.MatCard, i4.MatCardContent, i4.MatCardFooter, i4.MatCardHeader, i5.MatExpansionPanel, i5.MatExpansionPanelHeader, i5.MatExpansionPanelTitle, i6.MatError, i7.FlexLayoutRootComponent], styles: ["fieldset[_ngcontent-%COMP%]{border:0;margin:0;padding:0}.legend[_ngcontent-%COMP%]{font-weight:700}.expandable[_ngcontent-%COMP%] > .legend[_ngcontent-%COMP%]:before{content:\"\\25b6\";padding-right:.3em}.expanded[_ngcontent-%COMP%] > .legend[_ngcontent-%COMP%]:before{content:\"\\25bc\";padding-right:.2em}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FlexLayoutSectionComponent, [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleC1sYXlvdXQtc2VjdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLW1hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsvc3JjL2xpYi9jb21wb25lbnRzL2ZsZXgtbGF5b3V0LXNlY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFBO0FBRXRELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNCQUFzQixDQUFBOzs7Ozs7Ozs7OztJQVNoRCxnQ0FHa0M7SUFBM0IsK0tBQVMsZUFBQSx1QkFBZ0IsQ0FBQSxJQUFDO0lBQUMsaUJBQVE7OztJQUZuQyxrR0FBcUQ7SUFDckQsa0VBQTBCOzs7SUFFakMsNkNBZ0I4Rjs7O0lBVHJFLDZEQUE2Qyw2REFBQSxtREFBQSwrREFBQSx1REFBQSwyREFBQTtJQUY3QywwRkFBMEUsc0VBQUE7SUFKMUUsZ0RBQTJCLCtCQUFBLG1DQUFBLGtEQUFBLCtDQUFBLDJFQUFBLCtFQUFBO0lBZTNCLDBGQUEwQzs7O0lBQ25FLCtCQUMyRDs7O0lBQWhELDBHQUFtQzs7O0lBMUJsRCwyQkFHd0Q7SUFDcEQscUZBRzBDO0lBQzFDLDBIQWdCOEY7SUFDOUYsNkZBQzJEO0lBQy9ELGlCQUFNOzs7SUExQkQsK0VBQWtDO0lBQ2xDLDZHQUFxRCw0RkFBQTtJQUU5QyxlQUFrQjtJQUFsQiwwQ0FBa0I7SUFJQSxlQUFjO0lBQWQsc0NBQWM7SUFpQjVCLGVBQWtEO0lBQWxELG1KQUFrRDs7OztJQVM5RCxpQ0FHbUM7SUFBM0Isd0xBQVMsZUFBQSx3QkFBZ0IsQ0FBQSxJQUFDO0lBQUMsaUJBQVM7OztJQUZwQyxrR0FBcUQ7SUFDckQsa0VBQTBCOzs7SUFFbEMsNkNBZ0I4Rjs7O0lBVHJFLDhEQUE2Qyw4REFBQSxvREFBQSxnRUFBQSx3REFBQSw0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ZUFBeUM7UUFBekMsOERBQXlDOzt1RkF1RHhELDBCQUEwQjtjQTFKdEMsU0FBUzsyQkFDRSw0QkFBNEIsWUFDNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFpSWlCO3dFQWdDbEIsVUFBVTtrQkFBbEIsS0FBSztZQUNHLFdBQVc7a0JBQW5CLEtBQUs7WUFDRyxTQUFTO2tCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnQG5nc2Yvd2lkZ2V0LWxpYnJhcnknXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ZsZXgtbGF5b3V0LXNlY3Rpb24td2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxkaXYgKm5nSWY9XCJjb250YWluZXJUeXBlID09PSAnZGl2J1wiXG4gICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5odG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICBbY2xhc3MuZXhwYW5kYWJsZV09XCJvcHRpb25zPy5leHBhbmRhYmxlICYmICFleHBhbmRlZFwiXG4gICAgICAgICAgIFtjbGFzcy5leHBhbmRlZF09XCJvcHRpb25zPy5leHBhbmRhYmxlICYmIGV4cGFuZGVkXCI+XG4gICAgICAgICAgPGxhYmVsICpuZ0lmPVwic2VjdGlvblRpdGxlXCJcbiAgICAgICAgICAgICAgICAgW2NsYXNzXT1cIidsZWdlbmQgJyArIChvcHRpb25zPy5sYWJlbEh0bWxDbGFzcyB8fCAnJylcIlxuICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cInNlY3Rpb25UaXRsZVwiXG4gICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVFeHBhbmRlZCgpXCI+PC9sYWJlbD5cbiAgICAgICAgICA8ZmxleC1sYXlvdXQtcm9vdC13aWRnZXQgKm5nSWY9XCJleHBhbmRlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsYXlvdXRdPVwibGF5b3V0Tm9kZS5pdGVtc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkYXRhSW5kZXhdPVwiZGF0YUluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2xheW91dEluZGV4XT1cImxheW91dEluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lzRmxleEl0ZW1dPVwiZ2V0RmxleEF0dHJpYnV0ZSgnaXMtZmxleCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmZvcm0tZmxleC1jb2x1bW5dPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC1kaXJlY3Rpb24nKSA9PT0gJ2NvbHVtbidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MuZm9ybS1mbGV4LXJvd109XCJnZXRGbGV4QXR0cmlidXRlKCdmbGV4LWRpcmVjdGlvbicpID09PSAncm93J1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2Rpc3BsYXknKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5mbGV4LWRpcmVjdGlvbl09XCJnZXRGbGV4QXR0cmlidXRlKCdmbGV4LWRpcmVjdGlvbicpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmZsZXgtd3JhcF09XCJnZXRGbGV4QXR0cmlidXRlKCdmbGV4LXdyYXAnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5qdXN0aWZ5LWNvbnRlbnRdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnanVzdGlmeS1jb250ZW50JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuYWxpZ24taXRlbXNdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnYWxpZ24taXRlbXMnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5hbGlnbi1jb250ZW50XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2FsaWduLWNvbnRlbnQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmeExheW91dF09XCJnZXRGbGV4QXR0cmlidXRlKCdsYXlvdXQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmeExheW91dEdhcF09XCJvcHRpb25zPy5meExheW91dEdhcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmeExheW91dEFsaWduXT1cIm9wdGlvbnM/LmZ4TGF5b3V0QWxpZ25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5meEZsZXhGaWxsXT1cIm9wdGlvbnM/LmZ4TGF5b3V0QWxpZ25cIj48L2ZsZXgtbGF5b3V0LXJvb3Qtd2lkZ2V0PlxuICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJvcHRpb25zPy5zaG93RXJyb3JzICYmIG9wdGlvbnM/LmVycm9yTWVzc2FnZVwiXG4gICAgICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmVycm9yTWVzc2FnZVwiPjwvbWF0LWVycm9yPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxmaWVsZHNldCAqbmdJZj1cImNvbnRhaW5lclR5cGUgPT09ICdmaWVsZHNldCdcIlxuICAgICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5odG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5leHBhbmRhYmxlXT1cIm9wdGlvbnM/LmV4cGFuZGFibGUgJiYgIWV4cGFuZGVkXCJcbiAgICAgICAgICAgICAgICBbY2xhc3MuZXhwYW5kZWRdPVwib3B0aW9ucz8uZXhwYW5kYWJsZSAmJiBleHBhbmRlZFwiXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIm9wdGlvbnM/LnJlYWRvbmx5XCI+XG4gICAgICAgICAgPGxlZ2VuZCAqbmdJZj1cInNlY3Rpb25UaXRsZVwiXG4gICAgICAgICAgICAgICAgICBbY2xhc3NdPVwiJ2xlZ2VuZCAnICsgKG9wdGlvbnM/LmxhYmVsSHRtbENsYXNzIHx8ICcnKVwiXG4gICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cInNlY3Rpb25UaXRsZVwiXG4gICAgICAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlRXhwYW5kZWQoKVwiPjwvbGVnZW5kPlxuICAgICAgICAgIDxmbGV4LWxheW91dC1yb290LXdpZGdldCAqbmdJZj1cImV4cGFuZGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2xheW91dF09XCJsYXlvdXROb2RlLml0ZW1zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2RhdGFJbmRleF09XCJkYXRhSW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbGF5b3V0SW5kZXhdPVwibGF5b3V0SW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaXNGbGV4SXRlbV09XCJnZXRGbGV4QXR0cmlidXRlKCdpcy1mbGV4JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MuZm9ybS1mbGV4LWNvbHVtbl09XCJnZXRGbGV4QXR0cmlidXRlKCdmbGV4LWRpcmVjdGlvbicpID09PSAnY29sdW1uJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5mb3JtLWZsZXgtcm93XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2ZsZXgtZGlyZWN0aW9uJykgPT09ICdyb3cnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZGlzcGxheScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmZsZXgtZGlyZWN0aW9uXT1cImdldEZsZXhBdHRyaWJ1dGUoJ2ZsZXgtZGlyZWN0aW9uJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuZmxleC13cmFwXT1cImdldEZsZXhBdHRyaWJ1dGUoJ2ZsZXgtd3JhcCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmp1c3RpZnktY29udGVudF09XCJnZXRGbGV4QXR0cmlidXRlKCdqdXN0aWZ5LWNvbnRlbnQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5hbGlnbi1pdGVtc109XCJnZXRGbGV4QXR0cmlidXRlKCdhbGlnbi1pdGVtcycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmFsaWduLWNvbnRlbnRdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnYWxpZ24tY29udGVudCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Z4TGF5b3V0XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2xheW91dCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Z4TGF5b3V0R2FwXT1cIm9wdGlvbnM/LmZ4TGF5b3V0R2FwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Z4TGF5b3V0QWxpZ25dPVwib3B0aW9ucz8uZnhMYXlvdXRBbGlnblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmZ4RmxleEZpbGxdPVwib3B0aW9ucz8uZnhMYXlvdXRBbGlnblwiPjwvZmxleC1sYXlvdXQtcm9vdC13aWRnZXQ+XG4gICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cIm9wdGlvbnM/LnNob3dFcnJvcnMgJiYgb3B0aW9ucz8uZXJyb3JNZXNzYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZXJyb3JNZXNzYWdlXCI+PC9tYXQtZXJyb3I+XG4gICAgICA8L2ZpZWxkc2V0PlxuXG4gICAgICA8bWF0LWNhcmQgKm5nSWY9XCJjb250YWluZXJUeXBlID09PSAnY2FyZCdcIlxuICAgICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5odG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5leHBhbmRhYmxlXT1cIm9wdGlvbnM/LmV4cGFuZGFibGUgJiYgIWV4cGFuZGVkXCJcbiAgICAgICAgICAgICAgICBbY2xhc3MuZXhwYW5kZWRdPVwib3B0aW9ucz8uZXhwYW5kYWJsZSAmJiBleHBhbmRlZFwiPlxuICAgICAgICAgIDxtYXQtY2FyZC1oZWFkZXIgKm5nSWY9XCJzZWN0aW9uVGl0bGVcIj5cbiAgICAgICAgICAgICAgPGxlZ2VuZFxuICAgICAgICAgICAgICAgICAgICAgIFtjbGFzc109XCInbGVnZW5kICcgKyAob3B0aW9ucz8ubGFiZWxIdG1sQ2xhc3MgfHwgJycpXCJcbiAgICAgICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cInNlY3Rpb25UaXRsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZUV4cGFuZGVkKClcIj48L2xlZ2VuZD5cbiAgICAgICAgICA8L21hdC1jYXJkLWhlYWRlcj5cbiAgICAgICAgICA8bWF0LWNhcmQtY29udGVudCAqbmdJZj1cImV4cGFuZGVkXCI+XG4gICAgICAgICAgICAgIDxmaWVsZHNldCBbZGlzYWJsZWRdPVwib3B0aW9ucz8ucmVhZG9ubHlcIj5cbiAgICAgICAgICAgICAgICAgIDxmbGV4LWxheW91dC1yb290LXdpZGdldCAqbmdJZj1cImV4cGFuZGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbGF5b3V0XT1cImxheW91dE5vZGUuaXRlbXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkYXRhSW5kZXhdPVwiZGF0YUluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbGF5b3V0SW5kZXhdPVwibGF5b3V0SW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpc0ZsZXhJdGVtXT1cImdldEZsZXhBdHRyaWJ1dGUoJ2lzLWZsZXgnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmZvcm0tZmxleC1jb2x1bW5dPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC1kaXJlY3Rpb24nKSA9PT0gJ2NvbHVtbidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5mb3JtLWZsZXgtcm93XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2ZsZXgtZGlyZWN0aW9uJykgPT09ICdyb3cnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuZGlzcGxheV09XCJnZXRGbGV4QXR0cmlidXRlKCdkaXNwbGF5JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5mbGV4LWRpcmVjdGlvbl09XCJnZXRGbGV4QXR0cmlidXRlKCdmbGV4LWRpcmVjdGlvbicpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuZmxleC13cmFwXT1cImdldEZsZXhBdHRyaWJ1dGUoJ2ZsZXgtd3JhcCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuanVzdGlmeS1jb250ZW50XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2p1c3RpZnktY29udGVudCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuYWxpZ24taXRlbXNdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnYWxpZ24taXRlbXMnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmFsaWduLWNvbnRlbnRdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnYWxpZ24tY29udGVudCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZnhMYXlvdXRdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnbGF5b3V0JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmeExheW91dEdhcF09XCJvcHRpb25zPy5meExheW91dEdhcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Z4TGF5b3V0QWxpZ25dPVwib3B0aW9ucz8uZnhMYXlvdXRBbGlnblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZnhGbGV4RmlsbF09XCJvcHRpb25zPy5meExheW91dEFsaWduXCI+PC9mbGV4LWxheW91dC1yb290LXdpZGdldD5cbiAgICAgICAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgICA8L21hdC1jYXJkLWNvbnRlbnQ+XG4gICAgICAgICAgPG1hdC1jYXJkLWZvb3Rlcj5cbiAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cIm9wdGlvbnM/LnNob3dFcnJvcnMgJiYgb3B0aW9ucz8uZXJyb3JNZXNzYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmVycm9yTWVzc2FnZVwiPjwvbWF0LWVycm9yPlxuICAgICAgICAgIDwvbWF0LWNhcmQtZm9vdGVyPlxuICAgICAgPC9tYXQtY2FyZD5cblxuICAgICAgPG1hdC1leHBhbnNpb24tcGFuZWwgKm5nSWY9XCJjb250YWluZXJUeXBlID09PSAnZXhwYW5zaW9uLXBhbmVsJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbZXhwYW5kZWRdPVwiZXhwYW5kZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW2hpZGVUb2dnbGVdPVwiIW9wdGlvbnM/LmV4cGFuZGFibGVcIj5cbiAgICAgICAgICA8bWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI+XG4gICAgICAgICAgICAgIDxtYXQtcGFuZWwtdGl0bGU+XG4gICAgICAgICAgICAgICAgICA8bGVnZW5kICpuZ0lmPVwic2VjdGlvblRpdGxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmxhYmVsSHRtbENsYXNzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJzZWN0aW9uVGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlRXhwYW5kZWQoKVwiPjwvbGVnZW5kPlxuICAgICAgICAgICAgICA8L21hdC1wYW5lbC10aXRsZT5cbiAgICAgICAgICA8L21hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyPlxuICAgICAgICAgIDxmaWVsZHNldCBbZGlzYWJsZWRdPVwib3B0aW9ucz8ucmVhZG9ubHlcIj5cbiAgICAgICAgICAgICAgPGZsZXgtbGF5b3V0LXJvb3Qtd2lkZ2V0ICpuZ0lmPVwiZXhwYW5kZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2xheW91dF09XCJsYXlvdXROb2RlLml0ZW1zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkYXRhSW5kZXhdPVwiZGF0YUluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsYXlvdXRJbmRleF09XCJsYXlvdXRJbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaXNGbGV4SXRlbV09XCJnZXRGbGV4QXR0cmlidXRlKCdpcy1mbGV4JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmZvcm0tZmxleC1jb2x1bW5dPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC1kaXJlY3Rpb24nKSA9PT0gJ2NvbHVtbidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmZvcm0tZmxleC1yb3ddPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC1kaXJlY3Rpb24nKSA9PT0gJ3JvdydcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZGlzcGxheScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5mbGV4LWRpcmVjdGlvbl09XCJnZXRGbGV4QXR0cmlidXRlKCdmbGV4LWRpcmVjdGlvbicpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5mbGV4LXdyYXBdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC13cmFwJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmp1c3RpZnktY29udGVudF09XCJnZXRGbGV4QXR0cmlidXRlKCdqdXN0aWZ5LWNvbnRlbnQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuYWxpZ24taXRlbXNdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnYWxpZ24taXRlbXMnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuYWxpZ24tY29udGVudF09XCJnZXRGbGV4QXR0cmlidXRlKCdhbGlnbi1jb250ZW50JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Z4TGF5b3V0XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2xheW91dCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmeExheW91dEdhcF09XCJvcHRpb25zPy5meExheW91dEdhcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZnhMYXlvdXRBbGlnbl09XCJvcHRpb25zPy5meExheW91dEFsaWduXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmZ4RmxleEZpbGxdPVwib3B0aW9ucz8uZnhMYXlvdXRBbGlnblwiPjwvZmxleC1sYXlvdXQtcm9vdC13aWRnZXQ+XG4gICAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwib3B0aW9ucz8uc2hvd0Vycm9ycyAmJiBvcHRpb25zPy5lcnJvck1lc3NhZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5lcnJvck1lc3NhZ2VcIj48L21hdC1lcnJvcj5cbiAgICAgIDwvbWF0LWV4cGFuc2lvbi1wYW5lbD5gLFxuICBzdHlsZXM6IFtgXG4gICAgICBmaWVsZHNldCB7XG4gICAgICAgICAgYm9yZGVyOiAwO1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgfVxuXG4gICAgICAubGVnZW5kIHtcbiAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgIH1cblxuICAgICAgLmV4cGFuZGFibGUgPiAubGVnZW5kOmJlZm9yZSB7XG4gICAgICAgICAgY29udGVudDogJ+KWtic7XG4gICAgICAgICAgcGFkZGluZy1yaWdodDogLjNlbTtcbiAgICAgIH1cblxuICAgICAgLmV4cGFuZGVkID4gLmxlZ2VuZDpiZWZvcmUge1xuICAgICAgICAgIGNvbnRlbnQ6ICfilrwnO1xuICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IC4yZW07XG4gICAgICB9XG4gIGBdLFxufSlcbmV4cG9ydCBjbGFzcyBGbGV4TGF5b3V0U2VjdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2xcbiAgY29udHJvbE5hbWU6IHN0cmluZ1xuICBjb250cm9sVmFsdWU6IGFueVxuICBjb250cm9sRGlzYWJsZWQgPSBmYWxzZVxuICBib3VuZENvbnRyb2wgPSBmYWxzZVxuICBvcHRpb25zOiBhbnlcbiAgZXhwYW5kZWQgPSB0cnVlXG4gIGNvbnRhaW5lclR5cGUgPSAnZGl2J1xuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgZ2V0IHNlY3Rpb25UaXRsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLm5vdGl0bGUgPyBudWxsIDogdGhpcy5qc2Yuc2V0SXRlbVRpdGxlKHRoaXMpXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmpzZi5pbml0aWFsaXplQ29udHJvbCh0aGlzKVxuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9XG4gICAgdGhpcy5leHBhbmRlZCA9IHR5cGVvZiB0aGlzLm9wdGlvbnMuZXhwYW5kZWQgPT09ICdib29sZWFuJyA/XG4gICAgICB0aGlzLm9wdGlvbnMuZXhwYW5kZWQgOiAhdGhpcy5vcHRpb25zLmV4cGFuZGFibGVcbiAgICBzd2l0Y2ggKHRoaXMubGF5b3V0Tm9kZS50eXBlKSB7XG4gICAgICBjYXNlICdzZWN0aW9uJzpcbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgIGNhc2UgJ2ZpZWxkc2V0JzpcbiAgICAgIGNhc2UgJ2FkdmFuY2VkZmllbGRzZXQnOlxuICAgICAgY2FzZSAnYXV0aGZpZWxkc2V0JzpcbiAgICAgIGNhc2UgJ29wdGlvbmZpZWxkc2V0JzpcbiAgICAgIGNhc2UgJ3NlbGVjdGZpZWxkc2V0JzpcbiAgICAgICAgdGhpcy5jb250YWluZXJUeXBlID0gJ2ZpZWxkc2V0J1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnY2FyZCc6XG4gICAgICAgIHRoaXMuY29udGFpbmVyVHlwZSA9ICdjYXJkJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnZXhwYW5zaW9uLXBhbmVsJzpcbiAgICAgICAgdGhpcy5jb250YWluZXJUeXBlID0gJ2V4cGFuc2lvbi1wYW5lbCdcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6IC8vICdkaXYnLCAnZmxleCcsICd0YWInLCAnY29uZGl0aW9uYWwnLCAnYWN0aW9ucydcbiAgICAgICAgdGhpcy5jb250YWluZXJUeXBlID0gJ2RpdidcbiAgICB9XG4gIH1cblxuICB0b2dnbGVFeHBhbmRlZCgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmV4cGFuZGFibGUpIHtcbiAgICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZFxuICAgIH1cbiAgfVxuXG4gIC8vIFNldCBhdHRyaWJ1dGVzIGZvciBmbGV4Ym94IGNvbnRhaW5lclxuICAvLyAoY2hpbGQgYXR0cmlidXRlcyBhcmUgc2V0IGluIGZsZXgtbGF5b3V0LXJvb3QuY29tcG9uZW50KVxuICBnZXRGbGV4QXR0cmlidXRlKGF0dHJpYnV0ZTogc3RyaW5nKSB7XG4gICAgY29uc3QgZmxleEFjdGl2ZTogYm9vbGVhbiA9XG4gICAgICB0aGlzLmxheW91dE5vZGUudHlwZSA9PT0gJ2ZsZXgnIHx8XG4gICAgICAhIXRoaXMub3B0aW9ucy5kaXNwbGF5RmxleCB8fFxuICAgICAgdGhpcy5vcHRpb25zLmRpc3BsYXkgPT09ICdmbGV4J1xuICAgIC8vIGlmIChhdHRyaWJ1dGUgIT09ICdmbGV4JyAmJiAhZmxleEFjdGl2ZSkgeyByZXR1cm4gbnVsbDsgfVxuICAgIHN3aXRjaCAoYXR0cmlidXRlKSB7XG4gICAgICBjYXNlICdpcy1mbGV4JzpcbiAgICAgICAgcmV0dXJuIGZsZXhBY3RpdmVcbiAgICAgIGNhc2UgJ2Rpc3BsYXknOlxuICAgICAgICByZXR1cm4gZmxleEFjdGl2ZSA/ICdmbGV4JyA6ICdpbml0aWFsJ1xuICAgICAgY2FzZSAnZmxleC1kaXJlY3Rpb24nOlxuICAgICAgY2FzZSAnZmxleC13cmFwJzpcbiAgICAgICAgY29uc3QgaW5kZXggPSBbJ2ZsZXgtZGlyZWN0aW9uJywgJ2ZsZXgtd3JhcCddLmluZGV4T2YoYXR0cmlidXRlKVxuICAgICAgICByZXR1cm4gKHRoaXMub3B0aW9uc1snZmxleC1mbG93J10gfHwgJycpLnNwbGl0KC9cXHMrLylbaW5kZXhdIHx8XG4gICAgICAgICAgdGhpcy5vcHRpb25zW2F0dHJpYnV0ZV0gfHwgWydjb2x1bW4nLCAnbm93cmFwJ11baW5kZXhdXG4gICAgICBjYXNlICdqdXN0aWZ5LWNvbnRlbnQnOlxuICAgICAgY2FzZSAnYWxpZ24taXRlbXMnOlxuICAgICAgY2FzZSAnYWxpZ24tY29udGVudCc6XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnNbYXR0cmlidXRlXVxuICAgICAgY2FzZSAnbGF5b3V0JzpcbiAgICAgICAgcmV0dXJuICh0aGlzLm9wdGlvbnMuZnhMYXlvdXQgfHwgJ3JvdycpICtcbiAgICAgICAgdGhpcy5vcHRpb25zLmZ4TGF5b3V0V3JhcCA/ICcgJyArIHRoaXMub3B0aW9ucy5meExheW91dFdyYXAgOiAnJ1xuICAgIH1cbiAgfVxufVxuIl19