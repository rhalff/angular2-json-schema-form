import { ChangeDetectorRef, Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { addClasses, inArray } from '@ngsf/common';
import { JsonSchemaFormService } from '@ngsf/widget-library';
import * as i0 from "@angular/core";
import * as i1 from "@ngsf/widget-library";
import * as i2 from "@angular/common";
function Bootstrap3FrameworkComponent_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 6);
    i0.ɵɵlistener("click", function Bootstrap3FrameworkComponent_button_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r9.removeItem()); });
    i0.ɵɵelementStart(1, "span", 7);
    i0.ɵɵtext(2, "\u00D7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 8);
    i0.ɵɵtext(4, "Close");
    i0.ɵɵelementEnd()();
} }
function Bootstrap3FrameworkComponent_div_2_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p", 10);
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("innerHTML", ctx_r11.options == null ? null : ctx_r11.options.helpBlock, i0.ɵɵsanitizeHtml);
} }
function Bootstrap3FrameworkComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, Bootstrap3FrameworkComponent_div_2_p_1_Template, 1, 1, "p", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.options == null ? null : ctx_r1.options.helpBlock);
} }
function Bootstrap3FrameworkComponent_label_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "label", 11);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r2.options == null ? null : ctx_r2.options.labelHtmlClass) || "");
    i0.ɵɵclassProp("sr-only", ctx_r2.options == null ? null : ctx_r2.options.notitle);
    i0.ɵɵproperty("innerHTML", ctx_r2.options == null ? null : ctx_r2.options.title, i0.ɵɵsanitizeHtml);
    i0.ɵɵattribute("for", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id));
} }
function Bootstrap3FrameworkComponent_p_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p")(1, "strong", 12);
    i0.ɵɵtext(2, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " = required fields ");
    i0.ɵɵelementEnd();
} }
function Bootstrap3FrameworkComponent_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 13);
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r4.options == null ? null : ctx_r4.options.fieldAddonLeft, i0.ɵɵsanitizeHtml);
} }
function Bootstrap3FrameworkComponent_span_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 13);
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r5.options == null ? null : ctx_r5.options.fieldAddonRight, i0.ɵɵsanitizeHtml);
} }
function Bootstrap3FrameworkComponent_span_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 14);
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("glyphicon-ok", (ctx_r6.options == null ? null : ctx_r6.options.enableSuccessState) && !(ctx_r6.formControl == null ? null : ctx_r6.formControl.errors))("glyphicon-remove", (ctx_r6.options == null ? null : ctx_r6.options.enableErrorState) && (ctx_r6.formControl == null ? null : ctx_r6.formControl.errors));
} }
function Bootstrap3FrameworkComponent_div_10_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p", 10);
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("innerHTML", ctx_r12.options == null ? null : ctx_r12.options.helpBlock, i0.ɵɵsanitizeHtml);
} }
function Bootstrap3FrameworkComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, Bootstrap3FrameworkComponent_div_10_p_1_Template, 1, 1, "p", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r7.options == null ? null : ctx_r7.options.helpBlock);
} }
function Bootstrap3FrameworkComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtext(1, "debug: ");
    i0.ɵɵelementStart(2, "pre");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r8.debugOutput);
} }
export class Bootstrap3FrameworkComponent {
    constructor(changeDetector, jsf) {
        this.changeDetector = changeDetector;
        this.jsf = jsf;
        this.frameworkInitialized = false;
        this.formControl = null;
        this.debugOutput = '';
        this.debug = '';
        this.parentArray = null;
        this.isOrderable = false;
    }
    get showRemoveButton() {
        if (!this.options.removable || this.options.readonly ||
            this.layoutNode.type === '$ref') {
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
        if (this.layoutNode.arrayItem && this.layoutNode.type !== '$ref') {
            this.parentArray = this.jsf.getParentNode(this);
            if (this.parentArray) {
                this.isOrderable = this.layoutNode.arrayItemType === 'list' &&
                    !this.options.readonly && this.parentArray.options.orderable;
            }
        }
    }
    ngOnChanges() {
        if (!this.frameworkInitialized) {
            this.initializeFramework();
        }
    }
    initializeFramework() {
        if (this.layoutNode) {
            this.options = _.cloneDeep(this.layoutNode.options);
            this.widgetLayoutNode = {
                ...this.layoutNode,
                options: _.cloneDeep(this.layoutNode.options)
            };
            this.widgetOptions = this.widgetLayoutNode.options;
            this.formControl = this.jsf.getFormControl(this);
            this.options.isInputWidget = inArray(this.layoutNode.type, [
                'button', 'checkbox', 'checkboxes-inline', 'checkboxes', 'color',
                'date', 'datetime-local', 'datetime', 'email', 'file', 'hidden',
                'image', 'integer', 'month', 'number', 'password', 'radio',
                'radiobuttons', 'radios-inline', 'radios', 'range', 'reset', 'search',
                'select', 'submit', 'tel', 'text', 'textarea', 'time', 'url', 'week'
            ]);
            this.options.title = this.setTitle();
            this.options.htmlClass =
                addClasses(this.options.htmlClass, 'schema-form-' + this.layoutNode.type);
            if (this.layoutNode.type !== 'flex') {
                this.options.htmlClass =
                    this.layoutNode.type === 'array' ?
                        addClasses(this.options.htmlClass, 'list-group') :
                        this.layoutNode.arrayItem && this.layoutNode.type !== '$ref' ?
                            addClasses(this.options.htmlClass, 'list-group-item') :
                            addClasses(this.options.htmlClass, 'form-group');
            }
            this.widgetOptions.htmlClass = '';
            this.options.labelHtmlClass =
                addClasses(this.options.labelHtmlClass, 'control-label');
            this.widgetOptions.activeClass =
                addClasses(this.widgetOptions.activeClass, 'active');
            this.options.fieldAddonLeft =
                this.options.fieldAddonLeft || this.options.prepend;
            this.options.fieldAddonRight =
                this.options.fieldAddonRight || this.options.append;
            if (this.options.title && this.layoutNode.type !== 'tab' &&
                !this.options.notitle && this.options.required &&
                !this.options.title.includes('*')) {
                this.options.title += ' <strong class="text-danger">*</strong>';
            }
            switch (this.layoutNode.type) {
                case 'checkbox':
                case 'checkboxes':
                    this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'checkbox');
                    break;
                case 'checkboxes-inline':
                    this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'checkbox');
                    this.widgetOptions.itemLabelHtmlClass = addClasses(this.widgetOptions.itemLabelHtmlClass, 'checkbox-inline');
                    break;
                case 'radio':
                case 'radios':
                    this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'radio');
                    break;
                case 'radios-inline':
                    this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'radio');
                    this.widgetOptions.itemLabelHtmlClass = addClasses(this.widgetOptions.itemLabelHtmlClass, 'radio-inline');
                    break;
                case 'checkboxbuttons':
                case 'radiobuttons':
                    this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'btn-group');
                    this.widgetOptions.itemLabelHtmlClass = addClasses(this.widgetOptions.itemLabelHtmlClass, 'btn');
                    this.widgetOptions.itemLabelHtmlClass = addClasses(this.widgetOptions.itemLabelHtmlClass, this.options.style || 'btn-default');
                    this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, 'sr-only');
                    break;
                case 'button':
                case 'submit':
                    this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, 'btn');
                    this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, this.options.style || 'btn-info');
                    break;
                case 'array':
                case 'fieldset':
                case 'section':
                case 'conditional':
                case 'advancedfieldset':
                case 'authfieldset':
                case 'selectfieldset':
                case 'optionfieldset':
                    this.options.messageLocation = 'top';
                    break;
                case 'tabarray':
                case 'tabs':
                    this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'tab-content');
                    this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, 'tab-pane');
                    this.widgetOptions.labelHtmlClass = addClasses(this.widgetOptions.labelHtmlClass, 'nav nav-tabs');
                    break;
                case '$ref':
                    this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, 'btn pull-right');
                    this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, this.options.style || 'btn-default');
                    this.options.icon = 'glyphicon glyphicon-plus';
                    break;
                default:
                    this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, 'form-control');
            }
            if (this.formControl) {
                this.updateHelpBlock(this.formControl.status);
                this.formControl.statusChanges.subscribe(status => this.updateHelpBlock(status));
                if (this.options.debug) {
                    const vars = [];
                    this.debugOutput = _.map(vars, thisVar => JSON.stringify(thisVar, null, 2)).join('\n');
                }
            }
            this.frameworkInitialized = true;
        }
    }
    updateHelpBlock(status) {
        this.options.helpBlock = status === 'INVALID' &&
            this.options.enableErrorState && this.formControl.errors &&
            (this.formControl.dirty || this.options.feedbackOnRender) ?
            this.jsf.formatErrors(this.formControl.errors, this.options.validationMessages) :
            this.options.description || this.options.help || null;
    }
    setTitle() {
        switch (this.layoutNode.type) {
            case 'button':
            case 'checkbox':
            case 'section':
            case 'help':
            case 'msg':
            case 'submit':
            case 'message':
            case 'tabarray':
            case 'tabs':
            case '$ref':
                return null;
            case 'advancedfieldset':
                this.widgetOptions.expandable = true;
                this.widgetOptions.title = 'Advanced options';
                return null;
            case 'authfieldset':
                this.widgetOptions.expandable = true;
                this.widgetOptions.title = 'Authentication settings';
                return null;
            case 'fieldset':
                this.widgetOptions.title = this.options.title;
                return null;
            default:
                this.widgetOptions.title = null;
                return this.jsf.setItemTitle(this);
        }
    }
    removeItem() {
        this.jsf.removeItem(this);
    }
}
Bootstrap3FrameworkComponent.ɵfac = function Bootstrap3FrameworkComponent_Factory(t) { return new (t || Bootstrap3FrameworkComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
Bootstrap3FrameworkComponent.ɵcmp = i0.ɵɵdefineComponent({ type: Bootstrap3FrameworkComponent, selectors: [["bootstrap3-framework"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, features: [i0.ɵɵNgOnChangesFeature], decls: 12, vars: 22, consts: [["class", "close pull-right", "type", "button", 3, "click", 4, "ngIf"], [4, "ngIf"], [3, "class", "sr-only", "innerHTML", 4, "ngIf"], ["class", "input-group-addon", 3, "innerHTML", 4, "ngIf"], [3, "layoutNode", "dataIndex", "layoutIndex"], ["aria-hidden", "true", "class", "form-control-feedback glyphicon", 3, "glyphicon-ok", "glyphicon-remove", 4, "ngIf"], ["type", "button", 1, "close", "pull-right", 3, "click"], ["aria-hidden", "true"], [1, "sr-only"], ["class", "help-block", 3, "innerHTML", 4, "ngIf"], [1, "help-block", 3, "innerHTML"], [3, "innerHTML"], [1, "text-danger"], [1, "input-group-addon", 3, "innerHTML"], ["aria-hidden", "true", 1, "form-control-feedback", "glyphicon"]], template: function Bootstrap3FrameworkComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div");
        i0.ɵɵtemplate(1, Bootstrap3FrameworkComponent_button_1_Template, 5, 0, "button", 0);
        i0.ɵɵtemplate(2, Bootstrap3FrameworkComponent_div_2_Template, 2, 1, "div", 1);
        i0.ɵɵtemplate(3, Bootstrap3FrameworkComponent_label_3_Template, 1, 6, "label", 2);
        i0.ɵɵtemplate(4, Bootstrap3FrameworkComponent_p_4_Template, 4, 0, "p", 1);
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵtemplate(6, Bootstrap3FrameworkComponent_span_6_Template, 1, 1, "span", 3);
        i0.ɵɵelement(7, "select-widget-widget", 4);
        i0.ɵɵtemplate(8, Bootstrap3FrameworkComponent_span_8_Template, 1, 1, "span", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(9, Bootstrap3FrameworkComponent_span_9_Template, 1, 4, "span", 5);
        i0.ɵɵtemplate(10, Bootstrap3FrameworkComponent_div_10_Template, 2, 1, "div", 1);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(11, Bootstrap3FrameworkComponent_div_11_Template, 4, 1, "div", 1);
    } if (rf & 2) {
        i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.htmlClass) || "");
        i0.ɵɵclassProp("has-feedback", (ctx.options == null ? null : ctx.options.feedback) && (ctx.options == null ? null : ctx.options.isInputWidget) && ((ctx.formControl == null ? null : ctx.formControl.dirty) || (ctx.options == null ? null : ctx.options.feedbackOnRender)))("has-error", (ctx.options == null ? null : ctx.options.enableErrorState) && (ctx.formControl == null ? null : ctx.formControl.errors) && ((ctx.formControl == null ? null : ctx.formControl.dirty) || (ctx.options == null ? null : ctx.options.feedbackOnRender)))("has-success", (ctx.options == null ? null : ctx.options.enableSuccessState) && !(ctx.formControl == null ? null : ctx.formControl.errors) && ((ctx.formControl == null ? null : ctx.formControl.dirty) || (ctx.options == null ? null : ctx.options.feedbackOnRender)));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showRemoveButton);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.messageLocation) === "top");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.title) && (ctx.layoutNode == null ? null : ctx.layoutNode.type) !== "tab");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx.layoutNode == null ? null : ctx.layoutNode.type) === "submit" && (ctx.jsf == null ? null : ctx.jsf.formOptions == null ? null : ctx.jsf.formOptions.fieldsRequired));
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("input-group", (ctx.options == null ? null : ctx.options.fieldAddonLeft) || (ctx.options == null ? null : ctx.options.fieldAddonRight));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.fieldAddonLeft);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("layoutNode", ctx.widgetLayoutNode)("dataIndex", ctx.dataIndex)("layoutIndex", ctx.layoutIndex);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.fieldAddonRight);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.feedback) && (ctx.options == null ? null : ctx.options.isInputWidget) && !(ctx.options == null ? null : ctx.options.fieldAddonRight) && !ctx.layoutNode.arrayItem && ((ctx.formControl == null ? null : ctx.formControl.dirty) || (ctx.options == null ? null : ctx.options.feedbackOnRender)));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.messageLocation) !== "top");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.debug && ctx.debugOutput);
    } }, dependencies: [i2.NgIf, i1.SelectWidgetComponent], styles: ["[_nghost-%COMP%]     .list-group-item .form-control-feedback{top:40}[_nghost-%COMP%]     .checkbox, [_nghost-%COMP%]     .radio{margin-top:0;margin-bottom:0}[_nghost-%COMP%]     .checkbox-inline, [_nghost-%COMP%]     .checkbox-inline+.checkbox-inline, [_nghost-%COMP%]     .checkbox-inline+.radio-inline, [_nghost-%COMP%]     .radio-inline, [_nghost-%COMP%]     .radio-inline+.radio-inline, [_nghost-%COMP%]     .radio-inline+.checkbox-inline{margin-left:0;margin-right:10px}[_nghost-%COMP%]     .checkbox-inline:last-child, [_nghost-%COMP%]     .radio-inline:last-child{margin-right:0}[_nghost-%COMP%]     .ng-invalid.ng-touched{border:1px solid #f44336}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Bootstrap3FrameworkComponent, [{
        type: Component,
        args: [{ selector: 'bootstrap3-framework', template: `
      <div
              [class]="options?.htmlClass || ''"
              [class.has-feedback]="options?.feedback && options?.isInputWidget &&
        (formControl?.dirty || options?.feedbackOnRender)"
              [class.has-error]="options?.enableErrorState && formControl?.errors &&
        (formControl?.dirty || options?.feedbackOnRender)"
              [class.has-success]="options?.enableSuccessState && !formControl?.errors &&
        (formControl?.dirty || options?.feedbackOnRender)">

          <button *ngIf="showRemoveButton"
                  class="close pull-right"
                  type="button"
                  (click)="removeItem()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only">Close</span>
          </button>
          <div *ngIf="options?.messageLocation === 'top'">
              <p *ngIf="options?.helpBlock"
                 class="help-block"
                 [innerHTML]="options?.helpBlock"></p>
          </div>

          <label *ngIf="options?.title && layoutNode?.type !== 'tab'"
                 [attr.for]="'control' + layoutNode?._id"
                 [class]="options?.labelHtmlClass || ''"
                 [class.sr-only]="options?.notitle"
                 [innerHTML]="options?.title"></label>
          <p *ngIf="layoutNode?.type === 'submit' && jsf?.formOptions?.fieldsRequired">
              <strong class="text-danger">*</strong> = required fields
          </p>
          <div [class.input-group]="options?.fieldAddonLeft || options?.fieldAddonRight">
        <span *ngIf="options?.fieldAddonLeft"
              class="input-group-addon"
              [innerHTML]="options?.fieldAddonLeft"></span>

              <select-widget-widget
                      [layoutNode]="widgetLayoutNode"
                      [dataIndex]="dataIndex"
                      [layoutIndex]="layoutIndex"></select-widget-widget>

              <span *ngIf="options?.fieldAddonRight"
                    class="input-group-addon"
                    [innerHTML]="options?.fieldAddonRight"></span>
          </div>

          <span *ngIf="options?.feedback && options?.isInputWidget &&
          !options?.fieldAddonRight && !layoutNode.arrayItem &&
          (formControl?.dirty || options?.feedbackOnRender)"
                [class.glyphicon-ok]="options?.enableSuccessState && !formControl?.errors"
                [class.glyphicon-remove]="options?.enableErrorState && formControl?.errors"
                aria-hidden="true"
                class="form-control-feedback glyphicon"></span>
          <div *ngIf="options?.messageLocation !== 'top'">
              <p *ngIf="options?.helpBlock"
                 class="help-block"
                 [innerHTML]="options?.helpBlock"></p>
          </div>
      </div>

      <div *ngIf="debug && debugOutput">debug:
          <pre>{{debugOutput}}</pre>
      </div>
  `, styles: [":host ::ng-deep .list-group-item .form-control-feedback{top:40}:host ::ng-deep .checkbox,:host ::ng-deep .radio{margin-top:0;margin-bottom:0}:host ::ng-deep .checkbox-inline,:host ::ng-deep .checkbox-inline+.checkbox-inline,:host ::ng-deep .checkbox-inline+.radio-inline,:host ::ng-deep .radio-inline,:host ::ng-deep .radio-inline+.radio-inline,:host ::ng-deep .radio-inline+.checkbox-inline{margin-left:0;margin-right:10px}:host ::ng-deep .checkbox-inline:last-child,:host ::ng-deep .radio-inline:last-child{margin-right:0}:host ::ng-deep .ng-invalid.ng-touched{border:1px solid #f44336}\n"] }]
    }], function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwMy1mcmFtZXdvcmsuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmdzZi1ib290c3RyYXAzLWZyYW1ld29yay9zcmMvbGliL2Jvb3RzdHJhcDMtZnJhbWV3b3JrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBb0IsTUFBTSxlQUFlLENBQUE7QUFDcEYsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUE7QUFDM0IsT0FBTyxFQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFDaEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7Ozs7OztJQWtCaEQsaUNBRytCO0lBQXZCLDZLQUFTLGVBQUEsbUJBQVksQ0FBQSxJQUFDO0lBQzFCLCtCQUF5QjtJQUFBLHNCQUFPO0lBQUEsaUJBQU87SUFDdkMsK0JBQXNCO0lBQUEscUJBQUs7SUFBQSxpQkFBTyxFQUFBOzs7SUFHbEMsd0JBRXdDOzs7SUFBckMseUdBQWdDOzs7SUFIdkMsMkJBQWdEO0lBQzVDLCtFQUV3QztJQUM1QyxpQkFBTTs7O0lBSEUsZUFBd0I7SUFBeEIsK0VBQXdCOzs7SUFLaEMsNEJBSTRDOzs7SUFGckMsb0ZBQXVDO0lBQ3ZDLGlGQUFrQztJQUNsQyxtR0FBNEI7SUFINUIsNkZBQXdDOzs7SUFJL0MseUJBQTZFLGlCQUFBO0lBQzdDLGlCQUFDO0lBQUEsaUJBQVM7SUFBQyxtQ0FDM0M7SUFBQSxpQkFBSTs7O0lBRU4sMkJBRW1EOzs7SUFBN0MsNEdBQXFDOzs7SUFPckMsMkJBRW9EOzs7SUFBOUMsNkdBQXNDOzs7SUFHaEQsMkJBTXFEOzs7SUFIL0MsdUtBQTBFLDBKQUFBOzs7SUFLNUUsd0JBRXdDOzs7SUFBckMseUdBQWdDOzs7SUFIdkMsMkJBQWdEO0lBQzVD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dEIsMkNBQXNCO1FBT3pCLGVBQXdDO1FBQXhDLDJGQUF3QztRQU10QyxlQUFrRDtRQUFsRCwwSUFBa0Q7UUFLdEQsZUFBdUU7UUFBdkUsK0xBQXVFO1FBR3RFLGVBQXlFO1FBQXpFLHNKQUF5RTtRQUN6RSxlQUE2QjtRQUE3Qiw4RUFBNkI7UUFLdEIsZUFBK0I7UUFBL0IsaURBQStCLDRCQUFBLGdDQUFBO1FBSWhDLGVBQThCO1FBQTlCLCtFQUE4QjtRQUtsQyxlQUUwQztRQUYxQywrVkFFMEM7UUFLM0MsZUFBd0M7UUFBeEMsMkZBQXdDO1FBTzVDLGVBQTBCO1FBQTFCLG1EQUEwQjs7dUZBbUN6Qiw0QkFBNEI7Y0FqR3hDLFNBQVM7MkJBQ0Usc0JBQXNCLFlBQ3RCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErRFQ7d0dBMENRLFVBQVU7a0JBQWxCLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQge2FkZENsYXNzZXMsIGluQXJyYXl9IGZyb20gJ0BuZ3NmL2NvbW1vbidcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICdAbmdzZi93aWRnZXQtbGlicmFyeSdcblxuLyoqXG4gKiBCb290c3RyYXAgMyBmcmFtZXdvcmsgZm9yIEFuZ3VsYXIgSlNPTiBTY2hlbWEgRm9ybS5cbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Jvb3RzdHJhcDMtZnJhbWV3b3JrJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxkaXZcbiAgICAgICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/Lmh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgICAgICAgIFtjbGFzcy5oYXMtZmVlZGJhY2tdPVwib3B0aW9ucz8uZmVlZGJhY2sgJiYgb3B0aW9ucz8uaXNJbnB1dFdpZGdldCAmJlxuICAgICAgICAoZm9ybUNvbnRyb2w/LmRpcnR5IHx8IG9wdGlvbnM/LmZlZWRiYWNrT25SZW5kZXIpXCJcbiAgICAgICAgICAgICAgW2NsYXNzLmhhcy1lcnJvcl09XCJvcHRpb25zPy5lbmFibGVFcnJvclN0YXRlICYmIGZvcm1Db250cm9sPy5lcnJvcnMgJiZcbiAgICAgICAgKGZvcm1Db250cm9sPy5kaXJ0eSB8fCBvcHRpb25zPy5mZWVkYmFja09uUmVuZGVyKVwiXG4gICAgICAgICAgICAgIFtjbGFzcy5oYXMtc3VjY2Vzc109XCJvcHRpb25zPy5lbmFibGVTdWNjZXNzU3RhdGUgJiYgIWZvcm1Db250cm9sPy5lcnJvcnMgJiZcbiAgICAgICAgKGZvcm1Db250cm9sPy5kaXJ0eSB8fCBvcHRpb25zPy5mZWVkYmFja09uUmVuZGVyKVwiPlxuXG4gICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInNob3dSZW1vdmVCdXR0b25cIlxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJjbG9zZSBwdWxsLXJpZ2h0XCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInJlbW92ZUl0ZW0oKVwiPlxuICAgICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIj5DbG9zZTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwib3B0aW9ucz8ubWVzc2FnZUxvY2F0aW9uID09PSAndG9wJ1wiPlxuICAgICAgICAgICAgICA8cCAqbmdJZj1cIm9wdGlvbnM/LmhlbHBCbG9ja1wiXG4gICAgICAgICAgICAgICAgIGNsYXNzPVwiaGVscC1ibG9ja1wiXG4gICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uaGVscEJsb2NrXCI+PC9wPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGxhYmVsICpuZ0lmPVwib3B0aW9ucz8udGl0bGUgJiYgbGF5b3V0Tm9kZT8udHlwZSAhPT0gJ3RhYidcIlxuICAgICAgICAgICAgICAgICBbYXR0ci5mb3JdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkXCJcbiAgICAgICAgICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmxhYmVsSHRtbENsYXNzIHx8ICcnXCJcbiAgICAgICAgICAgICAgICAgW2NsYXNzLnNyLW9ubHldPVwib3B0aW9ucz8ubm90aXRsZVwiXG4gICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8udGl0bGVcIj48L2xhYmVsPlxuICAgICAgICAgIDxwICpuZ0lmPVwibGF5b3V0Tm9kZT8udHlwZSA9PT0gJ3N1Ym1pdCcgJiYganNmPy5mb3JtT3B0aW9ucz8uZmllbGRzUmVxdWlyZWRcIj5cbiAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzcz1cInRleHQtZGFuZ2VyXCI+Kjwvc3Ryb25nPiA9IHJlcXVpcmVkIGZpZWxkc1xuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8ZGl2IFtjbGFzcy5pbnB1dC1ncm91cF09XCJvcHRpb25zPy5maWVsZEFkZG9uTGVmdCB8fCBvcHRpb25zPy5maWVsZEFkZG9uUmlnaHRcIj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJvcHRpb25zPy5maWVsZEFkZG9uTGVmdFwiXG4gICAgICAgICAgICAgIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb25cIlxuICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmZpZWxkQWRkb25MZWZ0XCI+PC9zcGFuPlxuXG4gICAgICAgICAgICAgIDxzZWxlY3Qtd2lkZ2V0LXdpZGdldFxuICAgICAgICAgICAgICAgICAgICAgIFtsYXlvdXROb2RlXT1cIndpZGdldExheW91dE5vZGVcIlxuICAgICAgICAgICAgICAgICAgICAgIFtkYXRhSW5kZXhdPVwiZGF0YUluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICBbbGF5b3V0SW5kZXhdPVwibGF5b3V0SW5kZXhcIj48L3NlbGVjdC13aWRnZXQtd2lkZ2V0PlxuXG4gICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwib3B0aW9ucz8uZmllbGRBZGRvblJpZ2h0XCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvblwiXG4gICAgICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZmllbGRBZGRvblJpZ2h0XCI+PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJvcHRpb25zPy5mZWVkYmFjayAmJiBvcHRpb25zPy5pc0lucHV0V2lkZ2V0ICYmXG4gICAgICAgICAgIW9wdGlvbnM/LmZpZWxkQWRkb25SaWdodCAmJiAhbGF5b3V0Tm9kZS5hcnJheUl0ZW0gJiZcbiAgICAgICAgICAoZm9ybUNvbnRyb2w/LmRpcnR5IHx8IG9wdGlvbnM/LmZlZWRiYWNrT25SZW5kZXIpXCJcbiAgICAgICAgICAgICAgICBbY2xhc3MuZ2x5cGhpY29uLW9rXT1cIm9wdGlvbnM/LmVuYWJsZVN1Y2Nlc3NTdGF0ZSAmJiAhZm9ybUNvbnRyb2w/LmVycm9yc1wiXG4gICAgICAgICAgICAgICAgW2NsYXNzLmdseXBoaWNvbi1yZW1vdmVdPVwib3B0aW9ucz8uZW5hYmxlRXJyb3JTdGF0ZSAmJiBmb3JtQ29udHJvbD8uZXJyb3JzXCJcbiAgICAgICAgICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sLWZlZWRiYWNrIGdseXBoaWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwib3B0aW9ucz8ubWVzc2FnZUxvY2F0aW9uICE9PSAndG9wJ1wiPlxuICAgICAgICAgICAgICA8cCAqbmdJZj1cIm9wdGlvbnM/LmhlbHBCbG9ja1wiXG4gICAgICAgICAgICAgICAgIGNsYXNzPVwiaGVscC1ibG9ja1wiXG4gICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uaGVscEJsb2NrXCI+PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgKm5nSWY9XCJkZWJ1ZyAmJiBkZWJ1Z091dHB1dFwiPmRlYnVnOlxuICAgICAgICAgIDxwcmU+e3tkZWJ1Z091dHB1dH19PC9wcmU+XG4gICAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbYFxuICAgICAgOmhvc3QgOjpuZy1kZWVwIC5saXN0LWdyb3VwLWl0ZW0gLmZvcm0tY29udHJvbC1mZWVkYmFjayB7XG4gICAgICAgICAgdG9wOiA0MDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QgOjpuZy1kZWVwIC5jaGVja2JveCxcbiAgICAgIDpob3N0IDo6bmctZGVlcCAucmFkaW8ge1xuICAgICAgICAgIG1hcmdpbi10b3A6IDA7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QgOjpuZy1kZWVwIC5jaGVja2JveC1pbmxpbmUsXG4gICAgICA6aG9zdCA6Om5nLWRlZXAgLmNoZWNrYm94LWlubGluZSArIC5jaGVja2JveC1pbmxpbmUsXG4gICAgICA6aG9zdCA6Om5nLWRlZXAgLmNoZWNrYm94LWlubGluZSArIC5yYWRpby1pbmxpbmUsXG4gICAgICA6aG9zdCA6Om5nLWRlZXAgLnJhZGlvLWlubGluZSxcbiAgICAgIDpob3N0IDo6bmctZGVlcCAucmFkaW8taW5saW5lICsgLnJhZGlvLWlubGluZSxcbiAgICAgIDpob3N0IDo6bmctZGVlcCAucmFkaW8taW5saW5lICsgLmNoZWNrYm94LWlubGluZSB7XG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICAgICAgfVxuXG4gICAgICA6aG9zdCA6Om5nLWRlZXAgLmNoZWNrYm94LWlubGluZTpsYXN0LWNoaWxkLFxuICAgICAgOmhvc3QgOjpuZy1kZWVwIC5yYWRpby1pbmxpbmU6bGFzdC1jaGlsZCB7XG4gICAgICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCA6Om5nLWRlZXAgLm5nLWludmFsaWQubmctdG91Y2hlZCB7XG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2Y0NDMzNjtcbiAgICAgIH1cbiAgYF0sXG59KVxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDNGcmFtZXdvcmtDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIGZyYW1ld29ya0luaXRpYWxpemVkID0gZmFsc2VcbiAgd2lkZ2V0T3B0aW9uczogYW55IC8vIE9wdGlvbnMgcGFzc2VkIHRvIGNoaWxkIHdpZGdldFxuICB3aWRnZXRMYXlvdXROb2RlOiBhbnkgLy8gbGF5b3V0Tm9kZSBwYXNzZWQgdG8gY2hpbGQgd2lkZ2V0XG4gIG9wdGlvbnM6IGFueSAvLyBPcHRpb25zIHVzZWQgaW4gdGhpcyBmcmFtZXdvcmtcbiAgZm9ybUNvbnRyb2w6IGFueSA9IG51bGxcbiAgZGVidWdPdXRwdXQ6IGFueSA9ICcnXG4gIGRlYnVnOiBhbnkgPSAnJ1xuICBwYXJlbnRBcnJheTogYW55ID0gbnVsbFxuICBpc09yZGVyYWJsZSA9IGZhbHNlXG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHVibGljIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgZ2V0IHNob3dSZW1vdmVCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMucmVtb3ZhYmxlIHx8IHRoaXMub3B0aW9ucy5yZWFkb25seSB8fFxuICAgICAgdGhpcy5sYXlvdXROb2RlLnR5cGUgPT09ICckcmVmJ1xuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGlmICh0aGlzLmxheW91dE5vZGUucmVjdXJzaXZlUmVmZXJlbmNlKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICBpZiAoIXRoaXMubGF5b3V0Tm9kZS5hcnJheUl0ZW0gfHwgIXRoaXMucGFyZW50QXJyYXkpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICAvLyBJZiBhcnJheSBsZW5ndGggPD0gbWluSXRlbXMsIGRvbid0IGFsbG93IHJlbW92aW5nIGFueSBpdGVtc1xuICAgIHJldHVybiB0aGlzLnBhcmVudEFycmF5Lml0ZW1zLmxlbmd0aCAtIDEgPD0gdGhpcy5wYXJlbnRBcnJheS5vcHRpb25zLm1pbkl0ZW1zID8gZmFsc2UgOlxuICAgICAgLy8gRm9yIHJlbW92YWJsZSBsaXN0IGl0ZW1zLCBhbGxvdyByZW1vdmluZyBhbnkgaXRlbVxuICAgICAgdGhpcy5sYXlvdXROb2RlLmFycmF5SXRlbVR5cGUgPT09ICdsaXN0JyA/IHRydWUgOlxuICAgICAgICAvLyBGb3IgcmVtb3ZhYmxlIHR1cGxlIGl0ZW1zLCBvbmx5IGFsbG93IHJlbW92aW5nIGxhc3QgaXRlbSBpbiBsaXN0XG4gICAgICAgIHRoaXMubGF5b3V0SW5kZXhbdGhpcy5sYXlvdXRJbmRleC5sZW5ndGggLSAxXSA9PT0gdGhpcy5wYXJlbnRBcnJheS5pdGVtcy5sZW5ndGggLSAyXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVGcmFtZXdvcmsoKVxuICAgIGlmICh0aGlzLmxheW91dE5vZGUuYXJyYXlJdGVtICYmIHRoaXMubGF5b3V0Tm9kZS50eXBlICE9PSAnJHJlZicpIHtcbiAgICAgIHRoaXMucGFyZW50QXJyYXkgPSB0aGlzLmpzZi5nZXRQYXJlbnROb2RlKHRoaXMpXG4gICAgICBpZiAodGhpcy5wYXJlbnRBcnJheSkge1xuICAgICAgICB0aGlzLmlzT3JkZXJhYmxlID0gdGhpcy5sYXlvdXROb2RlLmFycmF5SXRlbVR5cGUgPT09ICdsaXN0JyAmJlxuICAgICAgICAgICF0aGlzLm9wdGlvbnMucmVhZG9ubHkgJiYgdGhpcy5wYXJlbnRBcnJheS5vcHRpb25zLm9yZGVyYWJsZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICghdGhpcy5mcmFtZXdvcmtJbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5pbml0aWFsaXplRnJhbWV3b3JrKClcbiAgICB9XG4gIH1cblxuICBpbml0aWFsaXplRnJhbWV3b3JrKCkge1xuICAgIGlmICh0aGlzLmxheW91dE5vZGUpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IF8uY2xvbmVEZWVwKHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zKVxuICAgICAgdGhpcy53aWRnZXRMYXlvdXROb2RlID0ge1xuICAgICAgICAuLi50aGlzLmxheW91dE5vZGUsXG4gICAgICAgIG9wdGlvbnM6IF8uY2xvbmVEZWVwKHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zKVxuICAgICAgfVxuICAgICAgdGhpcy53aWRnZXRPcHRpb25zID0gdGhpcy53aWRnZXRMYXlvdXROb2RlLm9wdGlvbnNcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wgPSB0aGlzLmpzZi5nZXRGb3JtQ29udHJvbCh0aGlzKVxuXG4gICAgICB0aGlzLm9wdGlvbnMuaXNJbnB1dFdpZGdldCA9IGluQXJyYXkodGhpcy5sYXlvdXROb2RlLnR5cGUsIFtcbiAgICAgICAgJ2J1dHRvbicsICdjaGVja2JveCcsICdjaGVja2JveGVzLWlubGluZScsICdjaGVja2JveGVzJywgJ2NvbG9yJyxcbiAgICAgICAgJ2RhdGUnLCAnZGF0ZXRpbWUtbG9jYWwnLCAnZGF0ZXRpbWUnLCAnZW1haWwnLCAnZmlsZScsICdoaWRkZW4nLFxuICAgICAgICAnaW1hZ2UnLCAnaW50ZWdlcicsICdtb250aCcsICdudW1iZXInLCAncGFzc3dvcmQnLCAncmFkaW8nLFxuICAgICAgICAncmFkaW9idXR0b25zJywgJ3JhZGlvcy1pbmxpbmUnLCAncmFkaW9zJywgJ3JhbmdlJywgJ3Jlc2V0JywgJ3NlYXJjaCcsXG4gICAgICAgICdzZWxlY3QnLCAnc3VibWl0JywgJ3RlbCcsICd0ZXh0JywgJ3RleHRhcmVhJywgJ3RpbWUnLCAndXJsJywgJ3dlZWsnXG4gICAgICBdKVxuXG4gICAgICB0aGlzLm9wdGlvbnMudGl0bGUgPSB0aGlzLnNldFRpdGxlKClcblxuICAgICAgdGhpcy5vcHRpb25zLmh0bWxDbGFzcyA9XG4gICAgICAgIGFkZENsYXNzZXModGhpcy5vcHRpb25zLmh0bWxDbGFzcywgJ3NjaGVtYS1mb3JtLScgKyB0aGlzLmxheW91dE5vZGUudHlwZSlcbiAgICAgIGlmICh0aGlzLmxheW91dE5vZGUudHlwZSAhPT0gJ2ZsZXgnKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5odG1sQ2xhc3MgPVxuICAgICAgICAgIHRoaXMubGF5b3V0Tm9kZS50eXBlID09PSAnYXJyYXknID9cbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5vcHRpb25zLmh0bWxDbGFzcywgJ2xpc3QtZ3JvdXAnKSA6XG4gICAgICAgICAgICB0aGlzLmxheW91dE5vZGUuYXJyYXlJdGVtICYmIHRoaXMubGF5b3V0Tm9kZS50eXBlICE9PSAnJHJlZicgP1xuICAgICAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMub3B0aW9ucy5odG1sQ2xhc3MsICdsaXN0LWdyb3VwLWl0ZW0nKSA6XG4gICAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5vcHRpb25zLmh0bWxDbGFzcywgJ2Zvcm0tZ3JvdXAnKVxuICAgICAgfVxuICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcyA9ICcnXG4gICAgICB0aGlzLm9wdGlvbnMubGFiZWxIdG1sQ2xhc3MgPVxuICAgICAgICBhZGRDbGFzc2VzKHRoaXMub3B0aW9ucy5sYWJlbEh0bWxDbGFzcywgJ2NvbnRyb2wtbGFiZWwnKVxuICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmFjdGl2ZUNsYXNzID1cbiAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLndpZGdldE9wdGlvbnMuYWN0aXZlQ2xhc3MsICdhY3RpdmUnKVxuICAgICAgdGhpcy5vcHRpb25zLmZpZWxkQWRkb25MZWZ0ID1cbiAgICAgICAgdGhpcy5vcHRpb25zLmZpZWxkQWRkb25MZWZ0IHx8IHRoaXMub3B0aW9ucy5wcmVwZW5kXG4gICAgICB0aGlzLm9wdGlvbnMuZmllbGRBZGRvblJpZ2h0ID1cbiAgICAgICAgdGhpcy5vcHRpb25zLmZpZWxkQWRkb25SaWdodCB8fCB0aGlzLm9wdGlvbnMuYXBwZW5kXG5cbiAgICAgIC8vIEFkZCBhc3RlcmlzayB0byB0aXRsZXMgaWYgcmVxdWlyZWRcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMudGl0bGUgJiYgdGhpcy5sYXlvdXROb2RlLnR5cGUgIT09ICd0YWInICYmXG4gICAgICAgICF0aGlzLm9wdGlvbnMubm90aXRsZSAmJiB0aGlzLm9wdGlvbnMucmVxdWlyZWQgJiZcbiAgICAgICAgIXRoaXMub3B0aW9ucy50aXRsZS5pbmNsdWRlcygnKicpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnRpdGxlICs9ICcgPHN0cm9uZyBjbGFzcz1cInRleHQtZGFuZ2VyXCI+Kjwvc3Ryb25nPidcbiAgICAgIH1cbiAgICAgIC8vIFNldCBtaXNjZWxhbmVvdXMgc3R5bGVzIGFuZCBzZXR0aW5ncyBmb3IgZWFjaCBjb250cm9sIHR5cGVcbiAgICAgIHN3aXRjaCAodGhpcy5sYXlvdXROb2RlLnR5cGUpIHtcbiAgICAgICAgLy8gQ2hlY2tib3ggY29udHJvbHNcbiAgICAgICAgY2FzZSAnY2hlY2tib3gnOlxuICAgICAgICBjYXNlICdjaGVja2JveGVzJzpcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MsICdjaGVja2JveCcpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnY2hlY2tib3hlcy1pbmxpbmUnOlxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcywgJ2NoZWNrYm94JylcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaXRlbUxhYmVsSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5pdGVtTGFiZWxIdG1sQ2xhc3MsICdjaGVja2JveC1pbmxpbmUnKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIC8vIFJhZGlvIGNvbnRyb2xzXG4gICAgICAgIGNhc2UgJ3JhZGlvJzpcbiAgICAgICAgY2FzZSAncmFkaW9zJzpcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MsICdyYWRpbycpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAncmFkaW9zLWlubGluZSc6XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzLCAncmFkaW8nKVxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5pdGVtTGFiZWxIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLml0ZW1MYWJlbEh0bWxDbGFzcywgJ3JhZGlvLWlubGluZScpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgLy8gQnV0dG9uIHNldHMgLSBjaGVja2JveGJ1dHRvbnMgYW5kIHJhZGlvYnV0dG9uc1xuICAgICAgICBjYXNlICdjaGVja2JveGJ1dHRvbnMnOlxuICAgICAgICBjYXNlICdyYWRpb2J1dHRvbnMnOlxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcywgJ2J0bi1ncm91cCcpXG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLml0ZW1MYWJlbEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaXRlbUxhYmVsSHRtbENsYXNzLCAnYnRuJylcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaXRlbUxhYmVsSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5pdGVtTGFiZWxIdG1sQ2xhc3MsIHRoaXMub3B0aW9ucy5zdHlsZSB8fCAnYnRuLWRlZmF1bHQnKVxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MsICdzci1vbmx5JylcbiAgICAgICAgICBicmVha1xuICAgICAgICAvLyBTaW5nbGUgYnV0dG9uIGNvbnRyb2xzXG4gICAgICAgIGNhc2UgJ2J1dHRvbic6XG4gICAgICAgIGNhc2UgJ3N1Ym1pdCc6XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcywgJ2J0bicpXG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcywgdGhpcy5vcHRpb25zLnN0eWxlIHx8ICdidG4taW5mbycpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgLy8gQ29udGFpbmVycyAtIGFycmF5cyBhbmQgZmllbGRzZXRzXG4gICAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgICAgY2FzZSAnZmllbGRzZXQnOlxuICAgICAgICBjYXNlICdzZWN0aW9uJzpcbiAgICAgICAgY2FzZSAnY29uZGl0aW9uYWwnOlxuICAgICAgICBjYXNlICdhZHZhbmNlZGZpZWxkc2V0JzpcbiAgICAgICAgY2FzZSAnYXV0aGZpZWxkc2V0JzpcbiAgICAgICAgY2FzZSAnc2VsZWN0ZmllbGRzZXQnOlxuICAgICAgICBjYXNlICdvcHRpb25maWVsZHNldCc6XG4gICAgICAgICAgdGhpcy5vcHRpb25zLm1lc3NhZ2VMb2NhdGlvbiA9ICd0b3AnXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAndGFiYXJyYXknOlxuICAgICAgICBjYXNlICd0YWJzJzpcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MsICd0YWItY29udGVudCcpXG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcywgJ3RhYi1wYW5lJylcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMubGFiZWxIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmxhYmVsSHRtbENsYXNzLCAnbmF2IG5hdi10YWJzJylcbiAgICAgICAgICBicmVha1xuICAgICAgICAvLyAnQWRkJyBidXR0b25zIC0gcmVmZXJlbmNlc1xuICAgICAgICBjYXNlICckcmVmJzpcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzLCAnYnRuIHB1bGwtcmlnaHQnKVxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MsIHRoaXMub3B0aW9ucy5zdHlsZSB8fCAnYnRuLWRlZmF1bHQnKVxuICAgICAgICAgIHRoaXMub3B0aW9ucy5pY29uID0gJ2dseXBoaWNvbiBnbHlwaGljb24tcGx1cydcbiAgICAgICAgICBicmVha1xuICAgICAgICAvLyBEZWZhdWx0IC0gaW5jbHVkaW5nIHJlZ3VsYXIgaW5wdXRzXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcywgJ2Zvcm0tY29udHJvbCcpXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmZvcm1Db250cm9sKSB7XG4gICAgICAgIHRoaXMudXBkYXRlSGVscEJsb2NrKHRoaXMuZm9ybUNvbnRyb2wuc3RhdHVzKVxuICAgICAgICB0aGlzLmZvcm1Db250cm9sLnN0YXR1c0NoYW5nZXMuc3Vic2NyaWJlKHN0YXR1cyA9PiB0aGlzLnVwZGF0ZUhlbHBCbG9jayhzdGF0dXMpKVxuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcpIHtcbiAgICAgICAgICBjb25zdCB2YXJzOiBhbnlbXSA9IFtdXG4gICAgICAgICAgdGhpcy5kZWJ1Z091dHB1dCA9IF8ubWFwKHZhcnMsIHRoaXNWYXIgPT4gSlNPTi5zdHJpbmdpZnkodGhpc1ZhciwgbnVsbCwgMikpLmpvaW4oJ1xcbicpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuZnJhbWV3b3JrSW5pdGlhbGl6ZWQgPSB0cnVlXG4gICAgfVxuXG4gIH1cblxuICB1cGRhdGVIZWxwQmxvY2soc3RhdHVzKSB7XG4gICAgdGhpcy5vcHRpb25zLmhlbHBCbG9jayA9IHN0YXR1cyA9PT0gJ0lOVkFMSUQnICYmXG4gICAgdGhpcy5vcHRpb25zLmVuYWJsZUVycm9yU3RhdGUgJiYgdGhpcy5mb3JtQ29udHJvbC5lcnJvcnMgJiZcbiAgICAodGhpcy5mb3JtQ29udHJvbC5kaXJ0eSB8fCB0aGlzLm9wdGlvbnMuZmVlZGJhY2tPblJlbmRlcikgP1xuICAgICAgdGhpcy5qc2YuZm9ybWF0RXJyb3JzKHRoaXMuZm9ybUNvbnRyb2wuZXJyb3JzLCB0aGlzLm9wdGlvbnMudmFsaWRhdGlvbk1lc3NhZ2VzKSA6XG4gICAgICB0aGlzLm9wdGlvbnMuZGVzY3JpcHRpb24gfHwgdGhpcy5vcHRpb25zLmhlbHAgfHwgbnVsbFxuICB9XG5cbiAgc2V0VGl0bGUoKTogc3RyaW5nIHtcbiAgICBzd2l0Y2ggKHRoaXMubGF5b3V0Tm9kZS50eXBlKSB7XG4gICAgICBjYXNlICdidXR0b24nOlxuICAgICAgY2FzZSAnY2hlY2tib3gnOlxuICAgICAgY2FzZSAnc2VjdGlvbic6XG4gICAgICBjYXNlICdoZWxwJzpcbiAgICAgIGNhc2UgJ21zZyc6XG4gICAgICBjYXNlICdzdWJtaXQnOlxuICAgICAgY2FzZSAnbWVzc2FnZSc6XG4gICAgICBjYXNlICd0YWJhcnJheSc6XG4gICAgICBjYXNlICd0YWJzJzpcbiAgICAgIGNhc2UgJyRyZWYnOlxuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgY2FzZSAnYWR2YW5jZWRmaWVsZHNldCc6XG4gICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5leHBhbmRhYmxlID0gdHJ1ZVxuICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMudGl0bGUgPSAnQWR2YW5jZWQgb3B0aW9ucydcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIGNhc2UgJ2F1dGhmaWVsZHNldCc6XG4gICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5leHBhbmRhYmxlID0gdHJ1ZVxuICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMudGl0bGUgPSAnQXV0aGVudGljYXRpb24gc2V0dGluZ3MnXG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICBjYXNlICdmaWVsZHNldCc6XG4gICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy50aXRsZSA9IHRoaXMub3B0aW9ucy50aXRsZVxuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLnRpdGxlID0gbnVsbFxuICAgICAgICByZXR1cm4gdGhpcy5qc2Yuc2V0SXRlbVRpdGxlKHRoaXMpXG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlSXRlbSgpIHtcbiAgICB0aGlzLmpzZi5yZW1vdmVJdGVtKHRoaXMpXG4gIH1cbn1cbiJdfQ==