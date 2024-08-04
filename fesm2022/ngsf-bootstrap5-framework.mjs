import * as i0 from '@angular/core';
import { Component, Input, Injectable, NgModule } from '@angular/core';
import { inArray, addClasses, Framework } from '@ngsf/common';
import * as _ from 'lodash';
import * as i1 from '@ngsf/widget-library';
import { WidgetLibraryModule } from '@ngsf/widget-library';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';

class Bootstrap5FrameworkComponent {
    changeDetector;
    jsf;
    frameworkInitialized = false;
    widgetOptions;
    widgetLayoutNode;
    options;
    formControl = null;
    debugOutput = '';
    debug = '';
    parentArray = null;
    isOrderable = false;
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(changeDetector, jsf) {
        this.changeDetector = changeDetector;
        this.jsf = jsf;
    }
    get hasFeedback() {
        return this.options?.feedback && this.options?.isInputWidget &&
            (this.formControl?.dirty || this.options?.feedbackOnRender);
    }
    get hasError() {
        return this.options?.enableErrorState && this.formControl?.errors &&
            (this.formControl?.dirty || this.options?.feedbackOnRender);
    }
    get hasSuccess() {
        return this.options?.enableSuccessState && !this.formControl?.errors &&
            (this.formControl?.dirty || this.options?.feedbackOnRender);
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
                options: _.cloneDeep(this.layoutNode.options),
            };
            this.widgetOptions = this.widgetLayoutNode.options;
            this.formControl = this.jsf.getFormControl(this);
            this.options.isInputWidget = inArray(this.layoutNode.type, [
                'button', 'checkbox', 'checkboxes-inline', 'checkboxes', 'color',
                'date', 'datetime-local', 'datetime', 'email', 'file', 'hidden',
                'image', 'integer', 'month', 'number', 'password', 'radio',
                'radiobuttons', 'radios-inline', 'radios', 'range', 'reset', 'search',
                'select', 'submit', 'tel', 'text', 'textarea', 'time', 'url', 'week',
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap5FrameworkComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.JsonSchemaFormService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: Bootstrap5FrameworkComponent, selector: "bootstrap-5-framework", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, usesOnChanges: true, ngImport: i0, template: `
    <div
      [class]="options?.htmlClass || ''"
      [class.has-feedback]='hasFeedback'
      [class.has-error]='hasError'
      [class.has-success]='hasSuccess'>

      <button *ngIf='showRemoveButton'
              class='close pull-right'
              type='button'
              (click)='removeItem()'>
        <span aria-hidden='true'>&times;</span>
        <span class='sr-only'>Close</span>
      </button>

      <div *ngIf="options?.messageLocation === 'top'">
        <p *ngIf='options?.helpBlock'
           class='help-block'
           [innerHTML]='options?.helpBlock'></p>
      </div>
      <label *ngIf="options?.title && layoutNode?.type !== 'tab'"
             [attr.for]="'control' + layoutNode?._id"
             [class]="(options?.labelHtmlClass || '') + ' form-label'"
             [class.sr-only]='options?.notitle'
             [innerHTML]='options?.title'></label>
      <p *ngIf="layoutNode?.type === 'submit' && jsf?.formOptions?.fieldsRequired">
        <strong class='text-danger'>*</strong> = required fields
      </p>
      <div [class.input-group]='options?.fieldAddonLeft || options?.fieldAddonRight'>
        <span *ngIf='options?.fieldAddonLeft'
              class='input-group-addon'
              [innerHTML]='options?.fieldAddonLeft'></span>

        <select-widget-widget
          [layoutNode]='widgetLayoutNode'
          [dataIndex]='dataIndex'
          [layoutIndex]='layoutIndex'></select-widget-widget>

        <span *ngIf='options?.fieldAddonRight'
              class='input-group-addon'
              [innerHTML]='options?.fieldAddonRight'></span>
      </div>

      <span *ngIf='options?.feedback && options?.isInputWidget &&
          !options?.fieldAddonRight && !layoutNode.arrayItem &&
          (formControl?.dirty || options?.feedbackOnRender)'
            [class.glyphicon-ok]='options?.enableSuccessState && !formControl?.errors'
            [class.glyphicon-remove]='options?.enableErrorState && formControl?.errors'
            aria-hidden='true'
            class='form-control-feedback glyphicon'></span>
      <div *ngIf="options?.messageLocation !== 'top'">
        <p *ngIf='options?.helpBlock'
           class='help-block'
           [innerHTML]='options?.helpBlock'></p>
      </div>
    </div>

    <div *ngIf='debug && debugOutput'>debug:
      <pre>{{ debugOutput }}</pre>
    </div>
  `, isInline: true, styles: [":host /deep/ .list-group-item .form-control-feedback{top:40px}:host /deep/ .checkbox,:host /deep/ .radio{margin-top:0;margin-bottom:0}:host /deep/ .checkbox-inline,:host /deep/ .checkbox-inline + .checkbox-inline,:host /deep/ .checkbox-inline + .radio-inline,:host /deep/ .radio-inline,:host /deep/ .radio-inline + .radio-inline,:host /deep/ .radio-inline + .checkbox-inline{margin-left:0;margin-right:10px}:host /deep/ .checkbox-inline:last-child,:host /deep/ .radio-inline:last-child{margin-right:0}:host /deep/ .ng-invalid.ng-touched{border:1px solid #f44336}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.SelectWidgetComponent, selector: "select-widget-widget", inputs: ["layoutNode", "layoutIndex", "dataIndex"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap5FrameworkComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bootstrap-5-framework', template: `
    <div
      [class]="options?.htmlClass || ''"
      [class.has-feedback]='hasFeedback'
      [class.has-error]='hasError'
      [class.has-success]='hasSuccess'>

      <button *ngIf='showRemoveButton'
              class='close pull-right'
              type='button'
              (click)='removeItem()'>
        <span aria-hidden='true'>&times;</span>
        <span class='sr-only'>Close</span>
      </button>

      <div *ngIf="options?.messageLocation === 'top'">
        <p *ngIf='options?.helpBlock'
           class='help-block'
           [innerHTML]='options?.helpBlock'></p>
      </div>
      <label *ngIf="options?.title && layoutNode?.type !== 'tab'"
             [attr.for]="'control' + layoutNode?._id"
             [class]="(options?.labelHtmlClass || '') + ' form-label'"
             [class.sr-only]='options?.notitle'
             [innerHTML]='options?.title'></label>
      <p *ngIf="layoutNode?.type === 'submit' && jsf?.formOptions?.fieldsRequired">
        <strong class='text-danger'>*</strong> = required fields
      </p>
      <div [class.input-group]='options?.fieldAddonLeft || options?.fieldAddonRight'>
        <span *ngIf='options?.fieldAddonLeft'
              class='input-group-addon'
              [innerHTML]='options?.fieldAddonLeft'></span>

        <select-widget-widget
          [layoutNode]='widgetLayoutNode'
          [dataIndex]='dataIndex'
          [layoutIndex]='layoutIndex'></select-widget-widget>

        <span *ngIf='options?.fieldAddonRight'
              class='input-group-addon'
              [innerHTML]='options?.fieldAddonRight'></span>
      </div>

      <span *ngIf='options?.feedback && options?.isInputWidget &&
          !options?.fieldAddonRight && !layoutNode.arrayItem &&
          (formControl?.dirty || options?.feedbackOnRender)'
            [class.glyphicon-ok]='options?.enableSuccessState && !formControl?.errors'
            [class.glyphicon-remove]='options?.enableErrorState && formControl?.errors'
            aria-hidden='true'
            class='form-control-feedback glyphicon'></span>
      <div *ngIf="options?.messageLocation !== 'top'">
        <p *ngIf='options?.helpBlock'
           class='help-block'
           [innerHTML]='options?.helpBlock'></p>
      </div>
    </div>

    <div *ngIf='debug && debugOutput'>debug:
      <pre>{{ debugOutput }}</pre>
    </div>
  `, styles: [":host /deep/ .list-group-item .form-control-feedback{top:40px}:host /deep/ .checkbox,:host /deep/ .radio{margin-top:0;margin-bottom:0}:host /deep/ .checkbox-inline,:host /deep/ .checkbox-inline + .checkbox-inline,:host /deep/ .checkbox-inline + .radio-inline,:host /deep/ .radio-inline,:host /deep/ .radio-inline + .radio-inline,:host /deep/ .radio-inline + .checkbox-inline{margin-left:0;margin-right:10px}:host /deep/ .checkbox-inline:last-child,:host /deep/ .radio-inline:last-child{margin-right:0}:host /deep/ .ng-invalid.ng-touched{border:1px solid #f44336}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.JsonSchemaFormService }]; }, propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] } });

class Bootstrap5Framework extends Framework {
    name = 'bootstrap-5';
    framework = Bootstrap5FrameworkComponent;
    stylesheets = [
        '//cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
    ];
    scripts = [
        '//cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js',
        '//cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'
    ];
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap5Framework, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap5Framework });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap5Framework, decorators: [{
            type: Injectable
        }] });

class Bootstrap5FrameworkModule {
    static forRoot() {
        return {
            ngModule: Bootstrap5FrameworkModule,
            providers: [
                {
                    provide: Framework,
                    useClass: Bootstrap5Framework,
                    multi: true
                }
            ]
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap5FrameworkModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap5FrameworkModule, declarations: [Bootstrap5FrameworkComponent], imports: [CommonModule,
            WidgetLibraryModule], exports: [Bootstrap5FrameworkComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap5FrameworkModule, imports: [CommonModule,
            WidgetLibraryModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap5FrameworkModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        WidgetLibraryModule
                    ],
                    declarations: [Bootstrap5FrameworkComponent],
                    exports: [Bootstrap5FrameworkComponent]
                }]
        }] });

export { Bootstrap5Framework, Bootstrap5FrameworkComponent, Bootstrap5FrameworkModule };
//# sourceMappingURL=ngsf-bootstrap5-framework.mjs.map
