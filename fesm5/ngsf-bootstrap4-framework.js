import { ChangeDetectorRef, Input, Component, Injectable, NgModule } from '@angular/core';
import { inArray, addClasses, Framework } from '@ngsf/common';
import { cloneDeep, map } from 'lodash';
import { JsonSchemaFormService, WidgetLibraryModule } from '@ngsf/widget-library';
import { CommonModule } from '@angular/common';

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Bootstrap4FrameworkComponent = (function () {
    function Bootstrap4FrameworkComponent(changeDetector, jsf) {
        this.changeDetector = changeDetector;
        this.jsf = jsf;
        this.frameworkInitialized = false;
        this.formControl = null;
        this.debugOutput = '';
        this.debug = '';
        this.parentArray = null;
        this.isOrderable = false;
    }
    Object.defineProperty(Bootstrap4FrameworkComponent.prototype, "showRemoveButton", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    Bootstrap4FrameworkComponent.prototype.ngOnInit = function () {
        this.initializeFramework();
        if (this.layoutNode.arrayItem && this.layoutNode.type !== '$ref') {
            this.parentArray = this.jsf.getParentNode(this);
            if (this.parentArray) {
                this.isOrderable = this.layoutNode.arrayItemType === 'list' &&
                    !this.options.readonly && this.parentArray.options.orderable;
            }
        }
    };
    Bootstrap4FrameworkComponent.prototype.ngOnChanges = function () {
        if (!this.frameworkInitialized) {
            this.initializeFramework();
        }
    };
    Bootstrap4FrameworkComponent.prototype.initializeFramework = function () {
        var _this = this;
        if (this.layoutNode) {
            this.options = cloneDeep(this.layoutNode.options);
            this.widgetLayoutNode = __assign(__assign({}, this.layoutNode), { options: cloneDeep(this.layoutNode.options) });
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
                this.formControl.statusChanges.subscribe(function (status) { return _this.updateHelpBlock(status); });
                if (this.options.debug) {
                    var vars = [];
                    this.debugOutput = map(vars, function (thisVar) { return JSON.stringify(thisVar, null, 2); }).join('\n');
                }
            }
            this.frameworkInitialized = true;
        }
    };
    Bootstrap4FrameworkComponent.prototype.updateHelpBlock = function (status) {
        this.options.helpBlock = status === 'INVALID' &&
            this.options.enableErrorState && this.formControl.errors &&
            (this.formControl.dirty || this.options.feedbackOnRender) ?
            this.jsf.formatErrors(this.formControl.errors, this.options.validationMessages) :
            this.options.description || this.options.help || null;
    };
    Bootstrap4FrameworkComponent.prototype.setTitle = function () {
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
    };
    Bootstrap4FrameworkComponent.prototype.removeItem = function () {
        this.jsf.removeItem(this);
    };
    Bootstrap4FrameworkComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: JsonSchemaFormService }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Bootstrap4FrameworkComponent.prototype, "layoutNode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], Bootstrap4FrameworkComponent.prototype, "layoutIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], Bootstrap4FrameworkComponent.prototype, "dataIndex", void 0);
    Bootstrap4FrameworkComponent = __decorate([
        Component({
            selector: 'bootstrap-4-framework',
            template: "\n      <div\n              [class]=\"options?.htmlClass || ''\"\n              [class.has-feedback]=\"options?.feedback && options?.isInputWidget &&\n        (formControl?.dirty || options?.feedbackOnRender)\"\n              [class.has-error]=\"options?.enableErrorState && formControl?.errors &&\n        (formControl?.dirty || options?.feedbackOnRender)\"\n              [class.has-success]=\"options?.enableSuccessState && !formControl?.errors &&\n        (formControl?.dirty || options?.feedbackOnRender)\">\n\n          <button *ngIf=\"showRemoveButton\"\n                  class=\"close pull-right\"\n                  type=\"button\"\n                  (click)=\"removeItem()\">\n              <span aria-hidden=\"true\">&times;</span>\n              <span class=\"sr-only\">Close</span>\n          </button>\n          <div *ngIf=\"options?.messageLocation === 'top'\">\n              <p *ngIf=\"options?.helpBlock\"\n                 class=\"help-block\"\n                 [innerHTML]=\"options?.helpBlock\"></p>\n          </div>\n\n          <label *ngIf=\"options?.title && layoutNode?.type !== 'tab'\"\n                 [attr.for]=\"'control' + layoutNode?._id\"\n                 [class]=\"options?.labelHtmlClass || ''\"\n                 [class.sr-only]=\"options?.notitle\"\n                 [innerHTML]=\"options?.title\"></label>\n          <p *ngIf=\"layoutNode?.type === 'submit' && jsf?.formOptions?.fieldsRequired\">\n              <strong class=\"text-danger\">*</strong> = required fields\n          </p>\n          <div [class.input-group]=\"options?.fieldAddonLeft || options?.fieldAddonRight\">\n        <span *ngIf=\"options?.fieldAddonLeft\"\n              class=\"input-group-addon\"\n              [innerHTML]=\"options?.fieldAddonLeft\"></span>\n\n              <select-widget-widget\n                      [layoutNode]=\"widgetLayoutNode\"\n                      [dataIndex]=\"dataIndex\"\n                      [layoutIndex]=\"layoutIndex\"></select-widget-widget>\n\n              <span *ngIf=\"options?.fieldAddonRight\"\n                    class=\"input-group-addon\"\n                    [innerHTML]=\"options?.fieldAddonRight\"></span>\n          </div>\n\n          <span *ngIf=\"options?.feedback && options?.isInputWidget &&\n          !options?.fieldAddonRight && !layoutNode.arrayItem &&\n          (formControl?.dirty || options?.feedbackOnRender)\"\n                [class.glyphicon-ok]=\"options?.enableSuccessState && !formControl?.errors\"\n                [class.glyphicon-remove]=\"options?.enableErrorState && formControl?.errors\"\n                aria-hidden=\"true\"\n                class=\"form-control-feedback glyphicon\"></span>\n          <div *ngIf=\"options?.messageLocation !== 'top'\">\n              <p *ngIf=\"options?.helpBlock\"\n                 class=\"help-block\"\n                 [innerHTML]=\"options?.helpBlock\"></p>\n          </div>\n      </div>\n\n      <div *ngIf=\"debug && debugOutput\">debug:\n          <pre>{{debugOutput}}</pre>\n      </div>\n  ",
            styles: ["\n      :host /deep/ .list-group-item .form-control-feedback {\n          top: 40px;\n      }\n\n      :host /deep/ .checkbox,\n      :host /deep/ .radio {\n          margin-top: 0;\n          margin-bottom: 0;\n      }\n\n      :host /deep/ .checkbox-inline,\n      :host /deep/ .checkbox-inline + .checkbox-inline,\n      :host /deep/ .checkbox-inline + .radio-inline,\n      :host /deep/ .radio-inline,\n      :host /deep/ .radio-inline + .radio-inline,\n      :host /deep/ .radio-inline + .checkbox-inline {\n          margin-left: 0;\n          margin-right: 10px;\n      }\n\n      :host /deep/ .checkbox-inline:last-child,\n      :host /deep/ .radio-inline:last-child {\n          margin-right: 0;\n      }\n\n      :host /deep/ .ng-invalid.ng-touched {\n          border: 1px solid #f44336;\n      }\n  "]
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            JsonSchemaFormService])
    ], Bootstrap4FrameworkComponent);
    return Bootstrap4FrameworkComponent;
}());

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Bootstrap4Framework = (function (_super) {
    __extends(Bootstrap4Framework, _super);
    function Bootstrap4Framework() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'bootstrap-4';
        _this.framework = Bootstrap4FrameworkComponent;
        _this.stylesheets = [
            '//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css'
        ];
        _this.scripts = [
            '//code.jquery.com/jquery-3.2.1.slim.min.js',
            '//cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js',
            '//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js',
        ];
        return _this;
    }
    Bootstrap4Framework = __decorate$1([
        Injectable()
    ], Bootstrap4Framework);
    return Bootstrap4Framework;
}(Framework));

var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Bootstrap4FrameworkModule = (function () {
    function Bootstrap4FrameworkModule() {
    }
    Bootstrap4FrameworkModule_1 = Bootstrap4FrameworkModule;
    Bootstrap4FrameworkModule.forRoot = function () {
        return {
            ngModule: Bootstrap4FrameworkModule_1,
            providers: [
                {
                    provide: Framework,
                    useClass: Bootstrap4Framework,
                    multi: true
                }
            ]
        };
    };
    var Bootstrap4FrameworkModule_1;
    Bootstrap4FrameworkModule = Bootstrap4FrameworkModule_1 = __decorate$2([
        NgModule({
            imports: [
                CommonModule,
                WidgetLibraryModule
            ],
            declarations: [Bootstrap4FrameworkComponent],
            exports: [Bootstrap4FrameworkComponent],
            entryComponents: [Bootstrap4FrameworkComponent]
        })
    ], Bootstrap4FrameworkModule);
    return Bootstrap4FrameworkModule;
}());

export { Bootstrap4Framework, Bootstrap4FrameworkComponent, Bootstrap4FrameworkModule };
//# sourceMappingURL=ngsf-bootstrap4-framework.js.map
