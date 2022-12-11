import { ChangeDetectorRef, Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { addClasses, inArray } from '@ngsf/common';
import { JsonSchemaFormService } from '@ngsf/widget-library';
import * as i0 from "@angular/core";
import * as i1 from "@ngsf/widget-library";
import * as i2 from "@angular/common";
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
export class Bootstrap4FrameworkComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwNC1mcmFtZXdvcmsuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmdzZi1ib290c3RyYXA0LWZyYW1ld29yay9zcmMvbGliL2Jvb3RzdHJhcDQtZnJhbWV3b3JrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBb0IsTUFBTSxlQUFlLENBQUE7QUFDcEYsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUE7QUFDM0IsT0FBTyxFQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFDaEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7Ozs7OztJQWtCaEQsaUNBRytCO0lBQXZCLDZLQUFTLGVBQUEsbUJBQVksQ0FBQSxJQUFDO0lBQzFCLCtCQUF5QjtJQUFBLHNCQUFPO0lBQUEsaUJBQU87SUFDdkMsK0JBQXNCO0lBQUEscUJBQUs7SUFBQSxpQkFBTyxFQUFBOzs7SUFHbEMsd0JBRXdDOzs7SUFBckMseUdBQWdDOzs7SUFIdkMsMkJBQWdEO0lBQzVDLCtFQUV3QztJQUM1QyxpQkFBTTs7O0lBSEUsZUFBd0I7SUFBeEIsK0VBQXdCOzs7SUFLaEMsNEJBSTRDOzs7SUFGckMsb0ZBQXVDO0lBQ3ZDLGlGQUFrQztJQUNsQyxtR0FBNEI7SUFINUIsNkZBQXdDOzs7SUFJL0MseUJBQTZFLGlCQUFBO0lBQzdDLGlCQUFDO0lBQUEsaUJBQVM7SUFBQyxtQ0FDM0M7SUFBQSxpQkFBSTs7O0lBRU4sMkJBRW1EOzs7SUFBN0MsNEdBQXFDOzs7SUFPckMsMkJBRW9EOzs7SUFBOUMsNkdBQXNDOzs7SUFHaEQsMkJBTXFEOzs7SUFIL0MsdUtBQTBFLDBKQUFBOzs7SUFLNUUsd0JBRXdDOzs7SUFBckMseUdBQWdDOzs7SUFIdkMsMkJBQWdEO0lBQzVD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a0Q7UUFLdEQsZUFBdUU7UUFBdkUsK0xBQXVFO1FBR3RFLGVBQXlFO1FBQXpFLHNKQUF5RTtRQUN6RSxlQUE2QjtRQUE3Qiw4RUFBNkI7UUFLdEIsZUFBK0I7UUFBL0IsaURBQStCLDRCQUFBLGdDQUFBO1FBSWhDLGVBQThCO1FBQTlCLCtFQUE4QjtRQUtsQyxlQUUwQztRQUYxQywrVkFFMEM7UUFLM0MsZUFBd0M7UUFBeEMsMkZBQXdDO1FBTzVDLGVBQTBCO1FBQTFCLG1EQUEwQjs7dUZBbUN6Qiw0QkFBNEI7Y0FqR3hDLFNBQVM7MkJBQ0UsdUJBQXVCLFlBQ3ZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErRFQ7d0dBMENRLFVBQVU7a0JBQWxCLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQge2FkZENsYXNzZXMsIGluQXJyYXl9IGZyb20gJ0BuZ3NmL2NvbW1vbidcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICdAbmdzZi93aWRnZXQtbGlicmFyeSdcblxuLyoqXG4gKiBCb290c3RyYXAgNCBmcmFtZXdvcmsgZm9yIEFuZ3VsYXIgSlNPTiBTY2hlbWEgRm9ybS5cbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Jvb3RzdHJhcC00LWZyYW1ld29yaycsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8ZGl2XG4gICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5odG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICBbY2xhc3MuaGFzLWZlZWRiYWNrXT1cIm9wdGlvbnM/LmZlZWRiYWNrICYmIG9wdGlvbnM/LmlzSW5wdXRXaWRnZXQgJiZcbiAgICAgICAgKGZvcm1Db250cm9sPy5kaXJ0eSB8fCBvcHRpb25zPy5mZWVkYmFja09uUmVuZGVyKVwiXG4gICAgICAgICAgICAgIFtjbGFzcy5oYXMtZXJyb3JdPVwib3B0aW9ucz8uZW5hYmxlRXJyb3JTdGF0ZSAmJiBmb3JtQ29udHJvbD8uZXJyb3JzICYmXG4gICAgICAgIChmb3JtQ29udHJvbD8uZGlydHkgfHwgb3B0aW9ucz8uZmVlZGJhY2tPblJlbmRlcilcIlxuICAgICAgICAgICAgICBbY2xhc3MuaGFzLXN1Y2Nlc3NdPVwib3B0aW9ucz8uZW5hYmxlU3VjY2Vzc1N0YXRlICYmICFmb3JtQ29udHJvbD8uZXJyb3JzICYmXG4gICAgICAgIChmb3JtQ29udHJvbD8uZGlydHkgfHwgb3B0aW9ucz8uZmVlZGJhY2tPblJlbmRlcilcIj5cblxuICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJzaG93UmVtb3ZlQnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwiY2xvc2UgcHVsbC1yaWdodFwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJyZW1vdmVJdGVtKClcIj5cbiAgICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+Q2xvc2U8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cIm9wdGlvbnM/Lm1lc3NhZ2VMb2NhdGlvbiA9PT0gJ3RvcCdcIj5cbiAgICAgICAgICAgICAgPHAgKm5nSWY9XCJvcHRpb25zPy5oZWxwQmxvY2tcIlxuICAgICAgICAgICAgICAgICBjbGFzcz1cImhlbHAtYmxvY2tcIlxuICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmhlbHBCbG9ja1wiPjwvcD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxsYWJlbCAqbmdJZj1cIm9wdGlvbnM/LnRpdGxlICYmIGxheW91dE5vZGU/LnR5cGUgIT09ICd0YWInXCJcbiAgICAgICAgICAgICAgICAgW2F0dHIuZm9yXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5sYWJlbEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgICAgICAgICAgIFtjbGFzcy5zci1vbmx5XT1cIm9wdGlvbnM/Lm5vdGl0bGVcIlxuICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LnRpdGxlXCI+PC9sYWJlbD5cbiAgICAgICAgICA8cCAqbmdJZj1cImxheW91dE5vZGU/LnR5cGUgPT09ICdzdWJtaXQnICYmIGpzZj8uZm9ybU9wdGlvbnM/LmZpZWxkc1JlcXVpcmVkXCI+XG4gICAgICAgICAgICAgIDxzdHJvbmcgY2xhc3M9XCJ0ZXh0LWRhbmdlclwiPio8L3N0cm9uZz4gPSByZXF1aXJlZCBmaWVsZHNcbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgPGRpdiBbY2xhc3MuaW5wdXQtZ3JvdXBdPVwib3B0aW9ucz8uZmllbGRBZGRvbkxlZnQgfHwgb3B0aW9ucz8uZmllbGRBZGRvblJpZ2h0XCI+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwib3B0aW9ucz8uZmllbGRBZGRvbkxlZnRcIlxuICAgICAgICAgICAgICBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uXCJcbiAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5maWVsZEFkZG9uTGVmdFwiPjwvc3Bhbj5cblxuICAgICAgICAgICAgICA8c2VsZWN0LXdpZGdldC13aWRnZXRcbiAgICAgICAgICAgICAgICAgICAgICBbbGF5b3V0Tm9kZV09XCJ3aWRnZXRMYXlvdXROb2RlXCJcbiAgICAgICAgICAgICAgICAgICAgICBbZGF0YUluZGV4XT1cImRhdGFJbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgW2xheW91dEluZGV4XT1cImxheW91dEluZGV4XCI+PC9zZWxlY3Qtd2lkZ2V0LXdpZGdldD5cblxuICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIm9wdGlvbnM/LmZpZWxkQWRkb25SaWdodFwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb25cIlxuICAgICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmZpZWxkQWRkb25SaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwib3B0aW9ucz8uZmVlZGJhY2sgJiYgb3B0aW9ucz8uaXNJbnB1dFdpZGdldCAmJlxuICAgICAgICAgICFvcHRpb25zPy5maWVsZEFkZG9uUmlnaHQgJiYgIWxheW91dE5vZGUuYXJyYXlJdGVtICYmXG4gICAgICAgICAgKGZvcm1Db250cm9sPy5kaXJ0eSB8fCBvcHRpb25zPy5mZWVkYmFja09uUmVuZGVyKVwiXG4gICAgICAgICAgICAgICAgW2NsYXNzLmdseXBoaWNvbi1va109XCJvcHRpb25zPy5lbmFibGVTdWNjZXNzU3RhdGUgJiYgIWZvcm1Db250cm9sPy5lcnJvcnNcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5nbHlwaGljb24tcmVtb3ZlXT1cIm9wdGlvbnM/LmVuYWJsZUVycm9yU3RhdGUgJiYgZm9ybUNvbnRyb2w/LmVycm9yc1wiXG4gICAgICAgICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbC1mZWVkYmFjayBnbHlwaGljb25cIj48L3NwYW4+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cIm9wdGlvbnM/Lm1lc3NhZ2VMb2NhdGlvbiAhPT0gJ3RvcCdcIj5cbiAgICAgICAgICAgICAgPHAgKm5nSWY9XCJvcHRpb25zPy5oZWxwQmxvY2tcIlxuICAgICAgICAgICAgICAgICBjbGFzcz1cImhlbHAtYmxvY2tcIlxuICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmhlbHBCbG9ja1wiPjwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2ICpuZ0lmPVwiZGVidWcgJiYgZGVidWdPdXRwdXRcIj5kZWJ1ZzpcbiAgICAgICAgICA8cHJlPnt7ZGVidWdPdXRwdXR9fTwvcHJlPlxuICAgICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlczogW2BcbiAgICAgIDpob3N0IDo6bmctZGVlcCAubGlzdC1ncm91cC1pdGVtIC5mb3JtLWNvbnRyb2wtZmVlZGJhY2sge1xuICAgICAgICAgIHRvcDogNDBweDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QgOjpuZy1kZWVwIC5jaGVja2JveCxcbiAgICAgIDpob3N0IDo6bmctZGVlcCAucmFkaW8ge1xuICAgICAgICAgIG1hcmdpbi10b3A6IDA7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QgOjpuZy1kZWVwIC5jaGVja2JveC1pbmxpbmUsXG4gICAgICA6aG9zdCA6Om5nLWRlZXAgLmNoZWNrYm94LWlubGluZSArIC5jaGVja2JveC1pbmxpbmUsXG4gICAgICA6aG9zdCA6Om5nLWRlZXAgLmNoZWNrYm94LWlubGluZSArIC5yYWRpby1pbmxpbmUsXG4gICAgICA6aG9zdCA6Om5nLWRlZXAgLnJhZGlvLWlubGluZSxcbiAgICAgIDpob3N0IDo6bmctZGVlcCAucmFkaW8taW5saW5lICsgLnJhZGlvLWlubGluZSxcbiAgICAgIDpob3N0IDo6bmctZGVlcCAucmFkaW8taW5saW5lICsgLmNoZWNrYm94LWlubGluZSB7XG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICAgICAgfVxuXG4gICAgICA6aG9zdCA6Om5nLWRlZXAgLmNoZWNrYm94LWlubGluZTpsYXN0LWNoaWxkLFxuICAgICAgOmhvc3QgOjpuZy1kZWVwIC5yYWRpby1pbmxpbmU6bGFzdC1jaGlsZCB7XG4gICAgICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCA6Om5nLWRlZXAgLm5nLWludmFsaWQubmctdG91Y2hlZCB7XG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2Y0NDMzNjtcbiAgICAgIH1cbiAgYF0sXG59KVxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDRGcmFtZXdvcmtDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIGZyYW1ld29ya0luaXRpYWxpemVkID0gZmFsc2VcbiAgd2lkZ2V0T3B0aW9uczogYW55IC8vIE9wdGlvbnMgcGFzc2VkIHRvIGNoaWxkIHdpZGdldFxuICB3aWRnZXRMYXlvdXROb2RlOiBhbnkgLy8gbGF5b3V0Tm9kZSBwYXNzZWQgdG8gY2hpbGQgd2lkZ2V0XG4gIG9wdGlvbnM6IGFueSAvLyBPcHRpb25zIHVzZWQgaW4gdGhpcyBmcmFtZXdvcmtcbiAgZm9ybUNvbnRyb2w6IGFueSA9IG51bGxcbiAgZGVidWdPdXRwdXQ6IGFueSA9ICcnXG4gIGRlYnVnOiBhbnkgPSAnJ1xuICBwYXJlbnRBcnJheTogYW55ID0gbnVsbFxuICBpc09yZGVyYWJsZSA9IGZhbHNlXG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHVibGljIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgZ2V0IHNob3dSZW1vdmVCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMucmVtb3ZhYmxlIHx8IHRoaXMub3B0aW9ucy5yZWFkb25seSB8fFxuICAgICAgdGhpcy5sYXlvdXROb2RlLnR5cGUgPT09ICckcmVmJ1xuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGlmICh0aGlzLmxheW91dE5vZGUucmVjdXJzaXZlUmVmZXJlbmNlKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICBpZiAoIXRoaXMubGF5b3V0Tm9kZS5hcnJheUl0ZW0gfHwgIXRoaXMucGFyZW50QXJyYXkpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICAvLyBJZiBhcnJheSBsZW5ndGggPD0gbWluSXRlbXMsIGRvbid0IGFsbG93IHJlbW92aW5nIGFueSBpdGVtc1xuICAgIHJldHVybiB0aGlzLnBhcmVudEFycmF5Lml0ZW1zLmxlbmd0aCAtIDEgPD0gdGhpcy5wYXJlbnRBcnJheS5vcHRpb25zLm1pbkl0ZW1zID8gZmFsc2UgOlxuICAgICAgLy8gRm9yIHJlbW92YWJsZSBsaXN0IGl0ZW1zLCBhbGxvdyByZW1vdmluZyBhbnkgaXRlbVxuICAgICAgdGhpcy5sYXlvdXROb2RlLmFycmF5SXRlbVR5cGUgPT09ICdsaXN0JyA/IHRydWUgOlxuICAgICAgICAvLyBGb3IgcmVtb3ZhYmxlIHR1cGxlIGl0ZW1zLCBvbmx5IGFsbG93IHJlbW92aW5nIGxhc3QgaXRlbSBpbiBsaXN0XG4gICAgICAgIHRoaXMubGF5b3V0SW5kZXhbdGhpcy5sYXlvdXRJbmRleC5sZW5ndGggLSAxXSA9PT0gdGhpcy5wYXJlbnRBcnJheS5pdGVtcy5sZW5ndGggLSAyXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVGcmFtZXdvcmsoKVxuICAgIGlmICh0aGlzLmxheW91dE5vZGUuYXJyYXlJdGVtICYmIHRoaXMubGF5b3V0Tm9kZS50eXBlICE9PSAnJHJlZicpIHtcbiAgICAgIHRoaXMucGFyZW50QXJyYXkgPSB0aGlzLmpzZi5nZXRQYXJlbnROb2RlKHRoaXMpXG4gICAgICBpZiAodGhpcy5wYXJlbnRBcnJheSkge1xuICAgICAgICB0aGlzLmlzT3JkZXJhYmxlID0gdGhpcy5sYXlvdXROb2RlLmFycmF5SXRlbVR5cGUgPT09ICdsaXN0JyAmJlxuICAgICAgICAgICF0aGlzLm9wdGlvbnMucmVhZG9ubHkgJiYgdGhpcy5wYXJlbnRBcnJheS5vcHRpb25zLm9yZGVyYWJsZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICghdGhpcy5mcmFtZXdvcmtJbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5pbml0aWFsaXplRnJhbWV3b3JrKClcbiAgICB9XG4gIH1cblxuICBpbml0aWFsaXplRnJhbWV3b3JrKCkge1xuICAgIGlmICh0aGlzLmxheW91dE5vZGUpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IF8uY2xvbmVEZWVwKHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zKVxuICAgICAgdGhpcy53aWRnZXRMYXlvdXROb2RlID0ge1xuICAgICAgICAuLi50aGlzLmxheW91dE5vZGUsXG4gICAgICAgIG9wdGlvbnM6IF8uY2xvbmVEZWVwKHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zKVxuICAgICAgfVxuICAgICAgdGhpcy53aWRnZXRPcHRpb25zID0gdGhpcy53aWRnZXRMYXlvdXROb2RlLm9wdGlvbnNcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wgPSB0aGlzLmpzZi5nZXRGb3JtQ29udHJvbCh0aGlzKVxuXG4gICAgICB0aGlzLm9wdGlvbnMuaXNJbnB1dFdpZGdldCA9IGluQXJyYXkodGhpcy5sYXlvdXROb2RlLnR5cGUsIFtcbiAgICAgICAgJ2J1dHRvbicsICdjaGVja2JveCcsICdjaGVja2JveGVzLWlubGluZScsICdjaGVja2JveGVzJywgJ2NvbG9yJyxcbiAgICAgICAgJ2RhdGUnLCAnZGF0ZXRpbWUtbG9jYWwnLCAnZGF0ZXRpbWUnLCAnZW1haWwnLCAnZmlsZScsICdoaWRkZW4nLFxuICAgICAgICAnaW1hZ2UnLCAnaW50ZWdlcicsICdtb250aCcsICdudW1iZXInLCAncGFzc3dvcmQnLCAncmFkaW8nLFxuICAgICAgICAncmFkaW9idXR0b25zJywgJ3JhZGlvcy1pbmxpbmUnLCAncmFkaW9zJywgJ3JhbmdlJywgJ3Jlc2V0JywgJ3NlYXJjaCcsXG4gICAgICAgICdzZWxlY3QnLCAnc3VibWl0JywgJ3RlbCcsICd0ZXh0JywgJ3RleHRhcmVhJywgJ3RpbWUnLCAndXJsJywgJ3dlZWsnXG4gICAgICBdKVxuXG4gICAgICB0aGlzLm9wdGlvbnMudGl0bGUgPSB0aGlzLnNldFRpdGxlKClcblxuICAgICAgdGhpcy5vcHRpb25zLmh0bWxDbGFzcyA9XG4gICAgICAgIGFkZENsYXNzZXModGhpcy5vcHRpb25zLmh0bWxDbGFzcywgJ3NjaGVtYS1mb3JtLScgKyB0aGlzLmxheW91dE5vZGUudHlwZSlcbiAgICAgIHRoaXMub3B0aW9ucy5odG1sQ2xhc3MgPVxuICAgICAgICB0aGlzLmxheW91dE5vZGUudHlwZSA9PT0gJ2FycmF5JyA/XG4gICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLm9wdGlvbnMuaHRtbENsYXNzLCAnbGlzdC1ncm91cCcpIDpcbiAgICAgICAgICB0aGlzLmxheW91dE5vZGUuYXJyYXlJdGVtICYmIHRoaXMubGF5b3V0Tm9kZS50eXBlICE9PSAnJHJlZicgP1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLm9wdGlvbnMuaHRtbENsYXNzLCAnbGlzdC1ncm91cC1pdGVtJykgOlxuICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLm9wdGlvbnMuaHRtbENsYXNzLCAnZm9ybS1ncm91cCcpXG4gICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzID0gJydcbiAgICAgIHRoaXMub3B0aW9ucy5sYWJlbEh0bWxDbGFzcyA9XG4gICAgICAgIGFkZENsYXNzZXModGhpcy5vcHRpb25zLmxhYmVsSHRtbENsYXNzLCAnY29udHJvbC1sYWJlbCcpXG4gICAgICB0aGlzLndpZGdldE9wdGlvbnMuYWN0aXZlQ2xhc3MgPVxuICAgICAgICBhZGRDbGFzc2VzKHRoaXMud2lkZ2V0T3B0aW9ucy5hY3RpdmVDbGFzcywgJ2FjdGl2ZScpXG4gICAgICB0aGlzLm9wdGlvbnMuZmllbGRBZGRvbkxlZnQgPVxuICAgICAgICB0aGlzLm9wdGlvbnMuZmllbGRBZGRvbkxlZnQgfHwgdGhpcy5vcHRpb25zLnByZXBlbmRcbiAgICAgIHRoaXMub3B0aW9ucy5maWVsZEFkZG9uUmlnaHQgPVxuICAgICAgICB0aGlzLm9wdGlvbnMuZmllbGRBZGRvblJpZ2h0IHx8IHRoaXMub3B0aW9ucy5hcHBlbmRcblxuICAgICAgLy8gQWRkIGFzdGVyaXNrIHRvIHRpdGxlcyBpZiByZXF1aXJlZFxuICAgICAgaWYgKHRoaXMub3B0aW9ucy50aXRsZSAmJiB0aGlzLmxheW91dE5vZGUudHlwZSAhPT0gJ3RhYicgJiZcbiAgICAgICAgIXRoaXMub3B0aW9ucy5ub3RpdGxlICYmIHRoaXMub3B0aW9ucy5yZXF1aXJlZCAmJlxuICAgICAgICAhdGhpcy5vcHRpb25zLnRpdGxlLmluY2x1ZGVzKCcqJylcbiAgICAgICkge1xuICAgICAgICB0aGlzLm9wdGlvbnMudGl0bGUgKz0gJyA8c3Ryb25nIGNsYXNzPVwidGV4dC1kYW5nZXJcIj4qPC9zdHJvbmc+J1xuICAgICAgfVxuICAgICAgLy8gU2V0IG1pc2NlbGFuZW91cyBzdHlsZXMgYW5kIHNldHRpbmdzIGZvciBlYWNoIGNvbnRyb2wgdHlwZVxuICAgICAgc3dpdGNoICh0aGlzLmxheW91dE5vZGUudHlwZSkge1xuICAgICAgICAvLyBDaGVja2JveCBjb250cm9sc1xuICAgICAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICAgIGNhc2UgJ2NoZWNrYm94ZXMnOlxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcywgJ2NoZWNrYm94JylcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdjaGVja2JveGVzLWlubGluZSc6XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzLCAnY2hlY2tib3gnKVxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5pdGVtTGFiZWxIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLml0ZW1MYWJlbEh0bWxDbGFzcywgJ2NoZWNrYm94LWlubGluZScpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgLy8gUmFkaW8gY29udHJvbHNcbiAgICAgICAgY2FzZSAncmFkaW8nOlxuICAgICAgICBjYXNlICdyYWRpb3MnOlxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcywgJ3JhZGlvJylcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdyYWRpb3MtaW5saW5lJzpcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MsICdyYWRpbycpXG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLml0ZW1MYWJlbEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaXRlbUxhYmVsSHRtbENsYXNzLCAncmFkaW8taW5saW5lJylcbiAgICAgICAgICBicmVha1xuICAgICAgICAvLyBCdXR0b24gc2V0cyAtIGNoZWNrYm94YnV0dG9ucyBhbmQgcmFkaW9idXR0b25zXG4gICAgICAgIGNhc2UgJ2NoZWNrYm94YnV0dG9ucyc6XG4gICAgICAgIGNhc2UgJ3JhZGlvYnV0dG9ucyc6XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzLCAnYnRuLWdyb3VwJylcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaXRlbUxhYmVsSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5pdGVtTGFiZWxIdG1sQ2xhc3MsICdidG4nKVxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5pdGVtTGFiZWxIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLml0ZW1MYWJlbEh0bWxDbGFzcywgdGhpcy5vcHRpb25zLnN0eWxlIHx8ICdidG4tZGVmYXVsdCcpXG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcywgJ3NyLW9ubHknKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIC8vIFNpbmdsZSBidXR0b24gY29udHJvbHNcbiAgICAgICAgY2FzZSAnYnV0dG9uJzpcbiAgICAgICAgY2FzZSAnc3VibWl0JzpcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzLCAnYnRuJylcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzLCB0aGlzLm9wdGlvbnMuc3R5bGUgfHwgJ2J0bi1pbmZvJylcbiAgICAgICAgICBicmVha1xuICAgICAgICAvLyBDb250YWluZXJzIC0gYXJyYXlzIGFuZCBmaWVsZHNldHNcbiAgICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICBjYXNlICdmaWVsZHNldCc6XG4gICAgICAgIGNhc2UgJ3NlY3Rpb24nOlxuICAgICAgICBjYXNlICdjb25kaXRpb25hbCc6XG4gICAgICAgIGNhc2UgJ2FkdmFuY2VkZmllbGRzZXQnOlxuICAgICAgICBjYXNlICdhdXRoZmllbGRzZXQnOlxuICAgICAgICBjYXNlICdzZWxlY3RmaWVsZHNldCc6XG4gICAgICAgIGNhc2UgJ29wdGlvbmZpZWxkc2V0JzpcbiAgICAgICAgICB0aGlzLm9wdGlvbnMubWVzc2FnZUxvY2F0aW9uID0gJ3RvcCdcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICd0YWJhcnJheSc6XG4gICAgICAgIGNhc2UgJ3RhYnMnOlxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcywgJ3RhYi1jb250ZW50JylcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzLCAndGFiLXBhbmUnKVxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5sYWJlbEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMubGFiZWxIdG1sQ2xhc3MsICduYXYgbmF2LXRhYnMnKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIC8vICdBZGQnIGJ1dHRvbnMgLSByZWZlcmVuY2VzXG4gICAgICAgIGNhc2UgJyRyZWYnOlxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MsICdidG4gcHVsbC1yaWdodCcpXG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcywgdGhpcy5vcHRpb25zLnN0eWxlIHx8ICdidG4tZGVmYXVsdCcpXG4gICAgICAgICAgdGhpcy5vcHRpb25zLmljb24gPSAnZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIC8vIERlZmF1bHQgLSBpbmNsdWRpbmcgcmVndWxhciBpbnB1dHNcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzLCAnZm9ybS1jb250cm9sJylcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgdGhpcy51cGRhdGVIZWxwQmxvY2sodGhpcy5mb3JtQ29udHJvbC5zdGF0dXMpXG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoc3RhdHVzID0+IHRoaXMudXBkYXRlSGVscEJsb2NrKHN0YXR1cykpXG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1Zykge1xuICAgICAgICAgIGNvbnN0IHZhcnM6IGFueVtdID0gW11cbiAgICAgICAgICB0aGlzLmRlYnVnT3V0cHV0ID0gXy5tYXAodmFycywgdGhpc1ZhciA9PiBKU09OLnN0cmluZ2lmeSh0aGlzVmFyLCBudWxsLCAyKSkuam9pbignXFxuJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5mcmFtZXdvcmtJbml0aWFsaXplZCA9IHRydWVcbiAgICB9XG5cbiAgfVxuXG4gIHVwZGF0ZUhlbHBCbG9jayhzdGF0dXMpIHtcbiAgICB0aGlzLm9wdGlvbnMuaGVscEJsb2NrID0gc3RhdHVzID09PSAnSU5WQUxJRCcgJiZcbiAgICB0aGlzLm9wdGlvbnMuZW5hYmxlRXJyb3JTdGF0ZSAmJiB0aGlzLmZvcm1Db250cm9sLmVycm9ycyAmJlxuICAgICh0aGlzLmZvcm1Db250cm9sLmRpcnR5IHx8IHRoaXMub3B0aW9ucy5mZWVkYmFja09uUmVuZGVyKSA/XG4gICAgICB0aGlzLmpzZi5mb3JtYXRFcnJvcnModGhpcy5mb3JtQ29udHJvbC5lcnJvcnMsIHRoaXMub3B0aW9ucy52YWxpZGF0aW9uTWVzc2FnZXMpIDpcbiAgICAgIHRoaXMub3B0aW9ucy5kZXNjcmlwdGlvbiB8fCB0aGlzLm9wdGlvbnMuaGVscCB8fCBudWxsXG4gIH1cblxuICBzZXRUaXRsZSgpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAodGhpcy5sYXlvdXROb2RlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2J1dHRvbic6XG4gICAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICBjYXNlICdzZWN0aW9uJzpcbiAgICAgIGNhc2UgJ2hlbHAnOlxuICAgICAgY2FzZSAnbXNnJzpcbiAgICAgIGNhc2UgJ3N1Ym1pdCc6XG4gICAgICBjYXNlICdtZXNzYWdlJzpcbiAgICAgIGNhc2UgJ3RhYmFycmF5JzpcbiAgICAgIGNhc2UgJ3RhYnMnOlxuICAgICAgY2FzZSAnJHJlZic6XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICBjYXNlICdhZHZhbmNlZGZpZWxkc2V0JzpcbiAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmV4cGFuZGFibGUgPSB0cnVlXG4gICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy50aXRsZSA9ICdBZHZhbmNlZCBvcHRpb25zJ1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgY2FzZSAnYXV0aGZpZWxkc2V0JzpcbiAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmV4cGFuZGFibGUgPSB0cnVlXG4gICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy50aXRsZSA9ICdBdXRoZW50aWNhdGlvbiBzZXR0aW5ncydcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIGNhc2UgJ2ZpZWxkc2V0JzpcbiAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLnRpdGxlID0gdGhpcy5vcHRpb25zLnRpdGxlXG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMudGl0bGUgPSBudWxsXG4gICAgICAgIHJldHVybiB0aGlzLmpzZi5zZXRJdGVtVGl0bGUodGhpcylcbiAgICB9XG4gIH1cblxuICByZW1vdmVJdGVtKCkge1xuICAgIHRoaXMuanNmLnJlbW92ZUl0ZW0odGhpcylcbiAgfVxufVxuIl19