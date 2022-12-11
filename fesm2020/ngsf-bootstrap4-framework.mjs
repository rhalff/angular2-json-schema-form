import * as i0 from '@angular/core';
import { Component, Input, Injectable, NgModule } from '@angular/core';
import { inArray, addClasses, Framework } from '@ngsf/common';
import * as _ from 'lodash';
import * as i1 from '@ngsf/widget-library';
import { WidgetLibraryModule } from '@ngsf/widget-library';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';

function Bootstrap4FrameworkComponent_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 6);
    i0.ɵɵlistener("click", function Bootstrap4FrameworkComponent_button_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r9.removeItem()); });
    i0.ɵɵelementStart(1, "span", 7);
    i0.ɵɵtext(2, "\u00D7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 8);
    i0.ɵɵtext(4, "Close");
    i0.ɵɵelementEnd()();
} }
function Bootstrap4FrameworkComponent_div_2_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p", 10);
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("innerHTML", ctx_r11.options == null ? null : ctx_r11.options.helpBlock, i0.ɵɵsanitizeHtml);
} }
function Bootstrap4FrameworkComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, Bootstrap4FrameworkComponent_div_2_p_1_Template, 1, 1, "p", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.options == null ? null : ctx_r1.options.helpBlock);
} }
function Bootstrap4FrameworkComponent_label_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "label", 11);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r2.options == null ? null : ctx_r2.options.labelHtmlClass) || "");
    i0.ɵɵclassProp("sr-only", ctx_r2.options == null ? null : ctx_r2.options.notitle);
    i0.ɵɵproperty("innerHTML", ctx_r2.options == null ? null : ctx_r2.options.title, i0.ɵɵsanitizeHtml);
    i0.ɵɵattribute("for", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id));
} }
function Bootstrap4FrameworkComponent_p_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p")(1, "strong", 12);
    i0.ɵɵtext(2, "*");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " = required fields ");
    i0.ɵɵelementEnd();
} }
function Bootstrap4FrameworkComponent_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 13);
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r4.options == null ? null : ctx_r4.options.fieldAddonLeft, i0.ɵɵsanitizeHtml);
} }
function Bootstrap4FrameworkComponent_span_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 13);
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r5.options == null ? null : ctx_r5.options.fieldAddonRight, i0.ɵɵsanitizeHtml);
} }
function Bootstrap4FrameworkComponent_span_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 14);
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("glyphicon-ok", (ctx_r6.options == null ? null : ctx_r6.options.enableSuccessState) && !(ctx_r6.formControl == null ? null : ctx_r6.formControl.errors))("glyphicon-remove", (ctx_r6.options == null ? null : ctx_r6.options.enableErrorState) && (ctx_r6.formControl == null ? null : ctx_r6.formControl.errors));
} }
function Bootstrap4FrameworkComponent_div_10_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p", 10);
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("innerHTML", ctx_r12.options == null ? null : ctx_r12.options.helpBlock, i0.ɵɵsanitizeHtml);
} }
function Bootstrap4FrameworkComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, Bootstrap4FrameworkComponent_div_10_p_1_Template, 1, 1, "p", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r7.options == null ? null : ctx_r7.options.helpBlock);
} }
function Bootstrap4FrameworkComponent_div_11_Template(rf, ctx) { if (rf & 1) {
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
class Bootstrap4FrameworkComponent {
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
            this.options.htmlClass =
                this.layoutNode.type === 'array' ?
                    addClasses(this.options.htmlClass, 'list-group') :
                    this.layoutNode.arrayItem && this.layoutNode.type !== '$ref' ?
                        addClasses(this.options.htmlClass, 'list-group-item') :
                        addClasses(this.options.htmlClass, 'form-group');
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
Bootstrap4FrameworkComponent.ɵfac = function Bootstrap4FrameworkComponent_Factory(t) { return new (t || Bootstrap4FrameworkComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
Bootstrap4FrameworkComponent.ɵcmp = i0.ɵɵdefineComponent({ type: Bootstrap4FrameworkComponent, selectors: [["bootstrap-4-framework"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, features: [i0.ɵɵNgOnChangesFeature], decls: 12, vars: 22, consts: [["class", "close pull-right", "type", "button", 3, "click", 4, "ngIf"], [4, "ngIf"], [3, "class", "sr-only", "innerHTML", 4, "ngIf"], ["class", "input-group-addon", 3, "innerHTML", 4, "ngIf"], [3, "layoutNode", "dataIndex", "layoutIndex"], ["aria-hidden", "true", "class", "form-control-feedback glyphicon", 3, "glyphicon-ok", "glyphicon-remove", 4, "ngIf"], ["type", "button", 1, "close", "pull-right", 3, "click"], ["aria-hidden", "true"], [1, "sr-only"], ["class", "help-block", 3, "innerHTML", 4, "ngIf"], [1, "help-block", 3, "innerHTML"], [3, "innerHTML"], [1, "text-danger"], [1, "input-group-addon", 3, "innerHTML"], ["aria-hidden", "true", 1, "form-control-feedback", "glyphicon"]], template: function Bootstrap4FrameworkComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div");
        i0.ɵɵtemplate(1, Bootstrap4FrameworkComponent_button_1_Template, 5, 0, "button", 0);
        i0.ɵɵtemplate(2, Bootstrap4FrameworkComponent_div_2_Template, 2, 1, "div", 1);
        i0.ɵɵtemplate(3, Bootstrap4FrameworkComponent_label_3_Template, 1, 6, "label", 2);
        i0.ɵɵtemplate(4, Bootstrap4FrameworkComponent_p_4_Template, 4, 0, "p", 1);
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵtemplate(6, Bootstrap4FrameworkComponent_span_6_Template, 1, 1, "span", 3);
        i0.ɵɵelement(7, "select-widget-widget", 4);
        i0.ɵɵtemplate(8, Bootstrap4FrameworkComponent_span_8_Template, 1, 1, "span", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(9, Bootstrap4FrameworkComponent_span_9_Template, 1, 4, "span", 5);
        i0.ɵɵtemplate(10, Bootstrap4FrameworkComponent_div_10_Template, 2, 1, "div", 1);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(11, Bootstrap4FrameworkComponent_div_11_Template, 4, 1, "div", 1);
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
    } }, dependencies: [i2.NgIf, i1.SelectWidgetComponent], styles: ["[_nghost-%COMP%]     .list-group-item .form-control-feedback{top:40px}[_nghost-%COMP%]     .checkbox, [_nghost-%COMP%]     .radio{margin-top:0;margin-bottom:0}[_nghost-%COMP%]     .checkbox-inline, [_nghost-%COMP%]     .checkbox-inline+.checkbox-inline, [_nghost-%COMP%]     .checkbox-inline+.radio-inline, [_nghost-%COMP%]     .radio-inline, [_nghost-%COMP%]     .radio-inline+.radio-inline, [_nghost-%COMP%]     .radio-inline+.checkbox-inline{margin-left:0;margin-right:10px}[_nghost-%COMP%]     .checkbox-inline:last-child, [_nghost-%COMP%]     .radio-inline:last-child{margin-right:0}[_nghost-%COMP%]     .ng-invalid.ng-touched{border:1px solid #f44336}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Bootstrap4FrameworkComponent, [{
        type: Component,
        args: [{ selector: 'bootstrap-4-framework', template: `
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
  `, styles: [":host ::ng-deep .list-group-item .form-control-feedback{top:40px}:host ::ng-deep .checkbox,:host ::ng-deep .radio{margin-top:0;margin-bottom:0}:host ::ng-deep .checkbox-inline,:host ::ng-deep .checkbox-inline+.checkbox-inline,:host ::ng-deep .checkbox-inline+.radio-inline,:host ::ng-deep .radio-inline,:host ::ng-deep .radio-inline+.radio-inline,:host ::ng-deep .radio-inline+.checkbox-inline{margin-left:0;margin-right:10px}:host ::ng-deep .checkbox-inline:last-child,:host ::ng-deep .radio-inline:last-child{margin-right:0}:host ::ng-deep .ng-invalid.ng-touched{border:1px solid #f44336}\n"] }]
    }], function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();

class Bootstrap4Framework extends Framework {
    constructor() {
        super(...arguments);
        this.name = 'bootstrap-4';
        this.framework = Bootstrap4FrameworkComponent;
        this.stylesheets = [
            '//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css'
        ];
        this.scripts = [
            '//code.jquery.com/jquery-3.2.1.slim.min.js',
            '//cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js',
            '//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js',
        ];
    }
}
Bootstrap4Framework.ɵfac = function () { let ɵBootstrap4Framework_BaseFactory; return function Bootstrap4Framework_Factory(t) { return (ɵBootstrap4Framework_BaseFactory || (ɵBootstrap4Framework_BaseFactory = i0.ɵɵgetInheritedFactory(Bootstrap4Framework)))(t || Bootstrap4Framework); }; }();
Bootstrap4Framework.ɵprov = i0.ɵɵdefineInjectable({ token: Bootstrap4Framework, factory: Bootstrap4Framework.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Bootstrap4Framework, [{
        type: Injectable
    }], null, null); })();

class Bootstrap4FrameworkModule {
    static forRoot() {
        return {
            ngModule: Bootstrap4FrameworkModule,
            providers: [
                {
                    provide: Framework,
                    useClass: Bootstrap4Framework,
                    multi: true
                }
            ]
        };
    }
}
Bootstrap4FrameworkModule.ɵfac = function Bootstrap4FrameworkModule_Factory(t) { return new (t || Bootstrap4FrameworkModule)(); };
Bootstrap4FrameworkModule.ɵmod = i0.ɵɵdefineNgModule({ type: Bootstrap4FrameworkModule });
Bootstrap4FrameworkModule.ɵinj = i0.ɵɵdefineInjector({ imports: [CommonModule,
        WidgetLibraryModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Bootstrap4FrameworkModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    WidgetLibraryModule
                ],
                declarations: [Bootstrap4FrameworkComponent],
                exports: [Bootstrap4FrameworkComponent],
                entryComponents: [Bootstrap4FrameworkComponent]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(Bootstrap4FrameworkModule, { declarations: [Bootstrap4FrameworkComponent], imports: [CommonModule,
        WidgetLibraryModule], exports: [Bootstrap4FrameworkComponent] }); })();

export { Bootstrap4Framework, Bootstrap4FrameworkComponent, Bootstrap4FrameworkModule };
//# sourceMappingURL=ngsf-bootstrap4-framework.mjs.map
//# sourceMappingURL=ngsf-bootstrap4-framework.mjs.map
