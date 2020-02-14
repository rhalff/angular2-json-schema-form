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
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { addClasses, inArray } from '@ngsf/common';
import { JsonSchemaFormService } from '@ngsf/widget-library';
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
            this.options = _.cloneDeep(this.layoutNode.options);
            this.widgetLayoutNode = __assign(__assign({}, this.layoutNode), { options: _.cloneDeep(this.layoutNode.options) });
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
                    this.debugOutput = _.map(vars, function (thisVar) { return JSON.stringify(thisVar, null, 2); }).join('\n');
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
export { Bootstrap4FrameworkComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwNC1mcmFtZXdvcmsuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nc2YvYm9vdHN0cmFwNC1mcmFtZXdvcmsvIiwic291cmNlcyI6WyJsaWIvYm9vdHN0cmFwNC1mcmFtZXdvcmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUNwRixPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQTtBQUMzQixPQUFPLEVBQUMsVUFBVSxFQUFFLE9BQU8sRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUNoRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQTtBQXVHMUQ7SUFjRSxzQ0FDUyxjQUFpQyxFQUNqQyxHQUEwQjtRQUQxQixtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFDakMsUUFBRyxHQUFILEdBQUcsQ0FBdUI7UUFmbkMseUJBQW9CLEdBQUcsS0FBSyxDQUFBO1FBSTVCLGdCQUFXLEdBQVEsSUFBSSxDQUFBO1FBQ3ZCLGdCQUFXLEdBQVEsRUFBRSxDQUFBO1FBQ3JCLFVBQUssR0FBUSxFQUFFLENBQUE7UUFDZixnQkFBVyxHQUFRLElBQUksQ0FBQTtRQUN2QixnQkFBVyxHQUFHLEtBQUssQ0FBQTtJQVNuQixDQUFDO0lBRUQsc0JBQUksMERBQWdCO2FBQXBCO1lBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUTtnQkFDbEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUMvQjtnQkFDQSxPQUFPLEtBQUssQ0FBQTthQUNiO1lBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFO2dCQUN0QyxPQUFPLElB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Q0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMzQixDQUFDOztnQkE3TndCLGlCQUFpQjtnQkFDNUIscUJBQXFCOztJQU4xQjtRQUFSLEtBQUssRUFBRTs7b0VBQWdCO0lBQ2Y7UUFBUixLQUFLLEVBQUU7O3FFQUFzQjtJQUNyQjtRQUFSLEtBQUssRUFBRTs7bUVBQW9CO0lBWmpCLDRCQUE0QjtRQWpHeEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxRQUFRLEVBQUUsKzlGQStEVDtxQkFDUSw2eUJBNkJSO1NBQ0YsQ0FBQzt5Q0FnQnlCLGlCQUFpQjtZQUM1QixxQkFBcUI7T0FoQnhCLDRCQUE0QixDQTZPeEM7SUFBRCxtQ0FBQztDQUFBLEFBN09ELElBNk9DO1NBN09ZLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQge2FkZENsYXNzZXMsIGluQXJyYXl9IGZyb20gJ0BuZ3NmL2NvbW1vbidcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICdAbmdzZi93aWRnZXQtbGlicmFyeSdcblxuLyoqXG4gKiBCb290c3RyYXAgNCBmcmFtZXdvcmsgZm9yIEFuZ3VsYXIgSlNPTiBTY2hlbWEgRm9ybS5cbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Jvb3RzdHJhcC00LWZyYW1ld29yaycsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8ZGl2XG4gICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5odG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICBbY2xhc3MuaGFzLWZlZWRiYWNrXT1cIm9wdGlvbnM/LmZlZWRiYWNrICYmIG9wdGlvbnM/LmlzSW5wdXRXaWRnZXQgJiZcbiAgICAgICAgKGZvcm1Db250cm9sPy5kaXJ0eSB8fCBvcHRpb25zPy5mZWVkYmFja09uUmVuZGVyKVwiXG4gICAgICAgICAgICAgIFtjbGFzcy5oYXMtZXJyb3JdPVwib3B0aW9ucz8uZW5hYmxlRXJyb3JTdGF0ZSAmJiBmb3JtQ29udHJvbD8uZXJyb3JzICYmXG4gICAgICAgIChmb3JtQ29udHJvbD8uZGlydHkgfHwgb3B0aW9ucz8uZmVlZGJhY2tPblJlbmRlcilcIlxuICAgICAgICAgICAgICBbY2xhc3MuaGFzLXN1Y2Nlc3NdPVwib3B0aW9ucz8uZW5hYmxlU3VjY2Vzc1N0YXRlICYmICFmb3JtQ29udHJvbD8uZXJyb3JzICYmXG4gICAgICAgIChmb3JtQ29udHJvbD8uZGlydHkgfHwgb3B0aW9ucz8uZmVlZGJhY2tPblJlbmRlcilcIj5cblxuICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJzaG93UmVtb3ZlQnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwiY2xvc2UgcHVsbC1yaWdodFwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJyZW1vdmVJdGVtKClcIj5cbiAgICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+Q2xvc2U8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cIm9wdGlvbnM/Lm1lc3NhZ2VMb2NhdGlvbiA9PT0gJ3RvcCdcIj5cbiAgICAgICAgICAgICAgPHAgKm5nSWY9XCJvcHRpb25zPy5oZWxwQmxvY2tcIlxuICAgICAgICAgICAgICAgICBjbGFzcz1cImhlbHAtYmxvY2tcIlxuICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmhlbHBCbG9ja1wiPjwvcD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxsYWJlbCAqbmdJZj1cIm9wdGlvbnM/LnRpdGxlICYmIGxheW91dE5vZGU/LnR5cGUgIT09ICd0YWInXCJcbiAgICAgICAgICAgICAgICAgW2F0dHIuZm9yXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5sYWJlbEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgICAgICAgICAgIFtjbGFzcy5zci1vbmx5XT1cIm9wdGlvbnM/Lm5vdGl0bGVcIlxuICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LnRpdGxlXCI+PC9sYWJlbD5cbiAgICAgICAgICA8cCAqbmdJZj1cImxheW91dE5vZGU/LnR5cGUgPT09ICdzdWJtaXQnICYmIGpzZj8uZm9ybU9wdGlvbnM/LmZpZWxkc1JlcXVpcmVkXCI+XG4gICAgICAgICAgICAgIDxzdHJvbmcgY2xhc3M9XCJ0ZXh0LWRhbmdlclwiPio8L3N0cm9uZz4gPSByZXF1aXJlZCBmaWVsZHNcbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgPGRpdiBbY2xhc3MuaW5wdXQtZ3JvdXBdPVwib3B0aW9ucz8uZmllbGRBZGRvbkxlZnQgfHwgb3B0aW9ucz8uZmllbGRBZGRvblJpZ2h0XCI+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwib3B0aW9ucz8uZmllbGRBZGRvbkxlZnRcIlxuICAgICAgICAgICAgICBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uXCJcbiAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5maWVsZEFkZG9uTGVmdFwiPjwvc3Bhbj5cblxuICAgICAgICAgICAgICA8c2VsZWN0LXdpZGdldC13aWRnZXRcbiAgICAgICAgICAgICAgICAgICAgICBbbGF5b3V0Tm9kZV09XCJ3aWRnZXRMYXlvdXROb2RlXCJcbiAgICAgICAgICAgICAgICAgICAgICBbZGF0YUluZGV4XT1cImRhdGFJbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgW2xheW91dEluZGV4XT1cImxheW91dEluZGV4XCI+PC9zZWxlY3Qtd2lkZ2V0LXdpZGdldD5cblxuICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIm9wdGlvbnM/LmZpZWxkQWRkb25SaWdodFwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb25cIlxuICAgICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmZpZWxkQWRkb25SaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwib3B0aW9ucz8uZmVlZGJhY2sgJiYgb3B0aW9ucz8uaXNJbnB1dFdpZGdldCAmJlxuICAgICAgICAgICFvcHRpb25zPy5maWVsZEFkZG9uUmlnaHQgJiYgIWxheW91dE5vZGUuYXJyYXlJdGVtICYmXG4gICAgICAgICAgKGZvcm1Db250cm9sPy5kaXJ0eSB8fCBvcHRpb25zPy5mZWVkYmFja09uUmVuZGVyKVwiXG4gICAgICAgICAgICAgICAgW2NsYXNzLmdseXBoaWNvbi1va109XCJvcHRpb25zPy5lbmFibGVTdWNjZXNzU3RhdGUgJiYgIWZvcm1Db250cm9sPy5lcnJvcnNcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5nbHlwaGljb24tcmVtb3ZlXT1cIm9wdGlvbnM/LmVuYWJsZUVycm9yU3RhdGUgJiYgZm9ybUNvbnRyb2w/LmVycm9yc1wiXG4gICAgICAgICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbC1mZWVkYmFjayBnbHlwaGljb25cIj48L3NwYW4+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cIm9wdGlvbnM/Lm1lc3NhZ2VMb2NhdGlvbiAhPT0gJ3RvcCdcIj5cbiAgICAgICAgICAgICAgPHAgKm5nSWY9XCJvcHRpb25zPy5oZWxwQmxvY2tcIlxuICAgICAgICAgICAgICAgICBjbGFzcz1cImhlbHAtYmxvY2tcIlxuICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmhlbHBCbG9ja1wiPjwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2ICpuZ0lmPVwiZGVidWcgJiYgZGVidWdPdXRwdXRcIj5kZWJ1ZzpcbiAgICAgICAgICA8cHJlPnt7ZGVidWdPdXRwdXR9fTwvcHJlPlxuICAgICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlczogW2BcbiAgICAgIDpob3N0IC9kZWVwLyAubGlzdC1ncm91cC1pdGVtIC5mb3JtLWNvbnRyb2wtZmVlZGJhY2sge1xuICAgICAgICAgIHRvcDogNDBweDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QgL2RlZXAvIC5jaGVja2JveCxcbiAgICAgIDpob3N0IC9kZWVwLyAucmFkaW8ge1xuICAgICAgICAgIG1hcmdpbi10b3A6IDA7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QgL2RlZXAvIC5jaGVja2JveC1pbmxpbmUsXG4gICAgICA6aG9zdCAvZGVlcC8gLmNoZWNrYm94LWlubGluZSArIC5jaGVja2JveC1pbmxpbmUsXG4gICAgICA6aG9zdCAvZGVlcC8gLmNoZWNrYm94LWlubGluZSArIC5yYWRpby1pbmxpbmUsXG4gICAgICA6aG9zdCAvZGVlcC8gLnJhZGlvLWlubGluZSxcbiAgICAgIDpob3N0IC9kZWVwLyAucmFkaW8taW5saW5lICsgLnJhZGlvLWlubGluZSxcbiAgICAgIDpob3N0IC9kZWVwLyAucmFkaW8taW5saW5lICsgLmNoZWNrYm94LWlubGluZSB7XG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICAgICAgfVxuXG4gICAgICA6aG9zdCAvZGVlcC8gLmNoZWNrYm94LWlubGluZTpsYXN0LWNoaWxkLFxuICAgICAgOmhvc3QgL2RlZXAvIC5yYWRpby1pbmxpbmU6bGFzdC1jaGlsZCB7XG4gICAgICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCAvZGVlcC8gLm5nLWludmFsaWQubmctdG91Y2hlZCB7XG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2Y0NDMzNjtcbiAgICAgIH1cbiAgYF0sXG59KVxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDRGcmFtZXdvcmtDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIGZyYW1ld29ya0luaXRpYWxpemVkID0gZmFsc2VcbiAgd2lkZ2V0T3B0aW9uczogYW55IC8vIE9wdGlvbnMgcGFzc2VkIHRvIGNoaWxkIHdpZGdldFxuICB3aWRnZXRMYXlvdXROb2RlOiBhbnkgLy8gbGF5b3V0Tm9kZSBwYXNzZWQgdG8gY2hpbGQgd2lkZ2V0XG4gIG9wdGlvbnM6IGFueSAvLyBPcHRpb25zIHVzZWQgaW4gdGhpcyBmcmFtZXdvcmtcbiAgZm9ybUNvbnRyb2w6IGFueSA9IG51bGxcbiAgZGVidWdPdXRwdXQ6IGFueSA9ICcnXG4gIGRlYnVnOiBhbnkgPSAnJ1xuICBwYXJlbnRBcnJheTogYW55ID0gbnVsbFxuICBpc09yZGVyYWJsZSA9IGZhbHNlXG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHVibGljIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgZ2V0IHNob3dSZW1vdmVCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMucmVtb3ZhYmxlIHx8IHRoaXMub3B0aW9ucy5yZWFkb25seSB8fFxuICAgICAgdGhpcy5sYXlvdXROb2RlLnR5cGUgPT09ICckcmVmJ1xuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGlmICh0aGlzLmxheW91dE5vZGUucmVjdXJzaXZlUmVmZXJlbmNlKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICBpZiAoIXRoaXMubGF5b3V0Tm9kZS5hcnJheUl0ZW0gfHwgIXRoaXMucGFyZW50QXJyYXkpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICAvLyBJZiBhcnJheSBsZW5ndGggPD0gbWluSXRlbXMsIGRvbid0IGFsbG93IHJlbW92aW5nIGFueSBpdGVtc1xuICAgIHJldHVybiB0aGlzLnBhcmVudEFycmF5Lml0ZW1zLmxlbmd0aCAtIDEgPD0gdGhpcy5wYXJlbnRBcnJheS5vcHRpb25zLm1pbkl0ZW1zID8gZmFsc2UgOlxuICAgICAgLy8gRm9yIHJlbW92YWJsZSBsaXN0IGl0ZW1zLCBhbGxvdyByZW1vdmluZyBhbnkgaXRlbVxuICAgICAgdGhpcy5sYXlvdXROb2RlLmFycmF5SXRlbVR5cGUgPT09ICdsaXN0JyA/IHRydWUgOlxuICAgICAgICAvLyBGb3IgcmVtb3ZhYmxlIHR1cGxlIGl0ZW1zLCBvbmx5IGFsbG93IHJlbW92aW5nIGxhc3QgaXRlbSBpbiBsaXN0XG4gICAgICAgIHRoaXMubGF5b3V0SW5kZXhbdGhpcy5sYXlvdXRJbmRleC5sZW5ndGggLSAxXSA9PT0gdGhpcy5wYXJlbnRBcnJheS5pdGVtcy5sZW5ndGggLSAyXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVGcmFtZXdvcmsoKVxuICAgIGlmICh0aGlzLmxheW91dE5vZGUuYXJyYXlJdGVtICYmIHRoaXMubGF5b3V0Tm9kZS50eXBlICE9PSAnJHJlZicpIHtcbiAgICAgIHRoaXMucGFyZW50QXJyYXkgPSB0aGlzLmpzZi5nZXRQYXJlbnROb2RlKHRoaXMpXG4gICAgICBpZiAodGhpcy5wYXJlbnRBcnJheSkge1xuICAgICAgICB0aGlzLmlzT3JkZXJhYmxlID0gdGhpcy5sYXlvdXROb2RlLmFycmF5SXRlbVR5cGUgPT09ICdsaXN0JyAmJlxuICAgICAgICAgICF0aGlzLm9wdGlvbnMucmVhZG9ubHkgJiYgdGhpcy5wYXJlbnRBcnJheS5vcHRpb25zLm9yZGVyYWJsZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICghdGhpcy5mcmFtZXdvcmtJbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5pbml0aWFsaXplRnJhbWV3b3JrKClcbiAgICB9XG4gIH1cblxuICBpbml0aWFsaXplRnJhbWV3b3JrKCkge1xuICAgIGlmICh0aGlzLmxheW91dE5vZGUpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IF8uY2xvbmVEZWVwKHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zKVxuICAgICAgdGhpcy53aWRnZXRMYXlvdXROb2RlID0ge1xuICAgICAgICAuLi50aGlzLmxheW91dE5vZGUsXG4gICAgICAgIG9wdGlvbnM6IF8uY2xvbmVEZWVwKHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zKVxuICAgICAgfVxuICAgICAgdGhpcy53aWRnZXRPcHRpb25zID0gdGhpcy53aWRnZXRMYXlvdXROb2RlLm9wdGlvbnNcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wgPSB0aGlzLmpzZi5nZXRGb3JtQ29udHJvbCh0aGlzKVxuXG4gICAgICB0aGlzLm9wdGlvbnMuaXNJbnB1dFdpZGdldCA9IGluQXJyYXkodGhpcy5sYXlvdXROb2RlLnR5cGUsIFtcbiAgICAgICAgJ2J1dHRvbicsICdjaGVja2JveCcsICdjaGVja2JveGVzLWlubGluZScsICdjaGVja2JveGVzJywgJ2NvbG9yJyxcbiAgICAgICAgJ2RhdGUnLCAnZGF0ZXRpbWUtbG9jYWwnLCAnZGF0ZXRpbWUnLCAnZW1haWwnLCAnZmlsZScsICdoaWRkZW4nLFxuICAgICAgICAnaW1hZ2UnLCAnaW50ZWdlcicsICdtb250aCcsICdudW1iZXInLCAncGFzc3dvcmQnLCAncmFkaW8nLFxuICAgICAgICAncmFkaW9idXR0b25zJywgJ3JhZGlvcy1pbmxpbmUnLCAncmFkaW9zJywgJ3JhbmdlJywgJ3Jlc2V0JywgJ3NlYXJjaCcsXG4gICAgICAgICdzZWxlY3QnLCAnc3VibWl0JywgJ3RlbCcsICd0ZXh0JywgJ3RleHRhcmVhJywgJ3RpbWUnLCAndXJsJywgJ3dlZWsnXG4gICAgICBdKVxuXG4gICAgICB0aGlzLm9wdGlvbnMudGl0bGUgPSB0aGlzLnNldFRpdGxlKClcblxuICAgICAgdGhpcy5vcHRpb25zLmh0bWxDbGFzcyA9XG4gICAgICAgIGFkZENsYXNzZXModGhpcy5vcHRpb25zLmh0bWxDbGFzcywgJ3NjaGVtYS1mb3JtLScgKyB0aGlzLmxheW91dE5vZGUudHlwZSlcbiAgICAgIHRoaXMub3B0aW9ucy5odG1sQ2xhc3MgPVxuICAgICAgICB0aGlzLmxheW91dE5vZGUudHlwZSA9PT0gJ2FycmF5JyA/XG4gICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLm9wdGlvbnMuaHRtbENsYXNzLCAnbGlzdC1ncm91cCcpIDpcbiAgICAgICAgICB0aGlzLmxheW91dE5vZGUuYXJyYXlJdGVtICYmIHRoaXMubGF5b3V0Tm9kZS50eXBlICE9PSAnJHJlZicgP1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLm9wdGlvbnMuaHRtbENsYXNzLCAnbGlzdC1ncm91cC1pdGVtJykgOlxuICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLm9wdGlvbnMuaHRtbENsYXNzLCAnZm9ybS1ncm91cCcpXG4gICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzID0gJydcbiAgICAgIHRoaXMub3B0aW9ucy5sYWJlbEh0bWxDbGFzcyA9XG4gICAgICAgIGFkZENsYXNzZXModGhpcy5vcHRpb25zLmxhYmVsSHRtbENsYXNzLCAnY29udHJvbC1sYWJlbCcpXG4gICAgICB0aGlzLndpZGdldE9wdGlvbnMuYWN0aXZlQ2xhc3MgPVxuICAgICAgICBhZGRDbGFzc2VzKHRoaXMud2lkZ2V0T3B0aW9ucy5hY3RpdmVDbGFzcywgJ2FjdGl2ZScpXG4gICAgICB0aGlzLm9wdGlvbnMuZmllbGRBZGRvbkxlZnQgPVxuICAgICAgICB0aGlzLm9wdGlvbnMuZmllbGRBZGRvbkxlZnQgfHwgdGhpcy5vcHRpb25zLnByZXBlbmRcbiAgICAgIHRoaXMub3B0aW9ucy5maWVsZEFkZG9uUmlnaHQgPVxuICAgICAgICB0aGlzLm9wdGlvbnMuZmllbGRBZGRvblJpZ2h0IHx8IHRoaXMub3B0aW9ucy5hcHBlbmRcblxuICAgICAgLy8gQWRkIGFzdGVyaXNrIHRvIHRpdGxlcyBpZiByZXF1aXJlZFxuICAgICAgaWYgKHRoaXMub3B0aW9ucy50aXRsZSAmJiB0aGlzLmxheW91dE5vZGUudHlwZSAhPT0gJ3RhYicgJiZcbiAgICAgICAgIXRoaXMub3B0aW9ucy5ub3RpdGxlICYmIHRoaXMub3B0aW9ucy5yZXF1aXJlZCAmJlxuICAgICAgICAhdGhpcy5vcHRpb25zLnRpdGxlLmluY2x1ZGVzKCcqJylcbiAgICAgICkge1xuICAgICAgICB0aGlzLm9wdGlvbnMudGl0bGUgKz0gJyA8c3Ryb25nIGNsYXNzPVwidGV4dC1kYW5nZXJcIj4qPC9zdHJvbmc+J1xuICAgICAgfVxuICAgICAgLy8gU2V0IG1pc2NlbGFuZW91cyBzdHlsZXMgYW5kIHNldHRpbmdzIGZvciBlYWNoIGNvbnRyb2wgdHlwZVxuICAgICAgc3dpdGNoICh0aGlzLmxheW91dE5vZGUudHlwZSkge1xuICAgICAgICAvLyBDaGVja2JveCBjb250cm9sc1xuICAgICAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICAgIGNhc2UgJ2NoZWNrYm94ZXMnOlxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcywgJ2NoZWNrYm94JylcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdjaGVja2JveGVzLWlubGluZSc6XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzLCAnY2hlY2tib3gnKVxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5pdGVtTGFiZWxIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLml0ZW1MYWJlbEh0bWxDbGFzcywgJ2NoZWNrYm94LWlubGluZScpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgLy8gUmFkaW8gY29udHJvbHNcbiAgICAgICAgY2FzZSAncmFkaW8nOlxuICAgICAgICBjYXNlICdyYWRpb3MnOlxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcywgJ3JhZGlvJylcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdyYWRpb3MtaW5saW5lJzpcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MsICdyYWRpbycpXG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLml0ZW1MYWJlbEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaXRlbUxhYmVsSHRtbENsYXNzLCAncmFkaW8taW5saW5lJylcbiAgICAgICAgICBicmVha1xuICAgICAgICAvLyBCdXR0b24gc2V0cyAtIGNoZWNrYm94YnV0dG9ucyBhbmQgcmFkaW9idXR0b25zXG4gICAgICAgIGNhc2UgJ2NoZWNrYm94YnV0dG9ucyc6XG4gICAgICAgIGNhc2UgJ3JhZGlvYnV0dG9ucyc6XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzLCAnYnRuLWdyb3VwJylcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaXRlbUxhYmVsSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5pdGVtTGFiZWxIdG1sQ2xhc3MsICdidG4nKVxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5pdGVtTGFiZWxIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLml0ZW1MYWJlbEh0bWxDbGFzcywgdGhpcy5vcHRpb25zLnN0eWxlIHx8ICdidG4tZGVmYXVsdCcpXG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcywgJ3NyLW9ubHknKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIC8vIFNpbmdsZSBidXR0b24gY29udHJvbHNcbiAgICAgICAgY2FzZSAnYnV0dG9uJzpcbiAgICAgICAgY2FzZSAnc3VibWl0JzpcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzLCAnYnRuJylcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzLCB0aGlzLm9wdGlvbnMuc3R5bGUgfHwgJ2J0bi1pbmZvJylcbiAgICAgICAgICBicmVha1xuICAgICAgICAvLyBDb250YWluZXJzIC0gYXJyYXlzIGFuZCBmaWVsZHNldHNcbiAgICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICBjYXNlICdmaWVsZHNldCc6XG4gICAgICAgIGNhc2UgJ3NlY3Rpb24nOlxuICAgICAgICBjYXNlICdjb25kaXRpb25hbCc6XG4gICAgICAgIGNhc2UgJ2FkdmFuY2VkZmllbGRzZXQnOlxuICAgICAgICBjYXNlICdhdXRoZmllbGRzZXQnOlxuICAgICAgICBjYXNlICdzZWxlY3RmaWVsZHNldCc6XG4gICAgICAgIGNhc2UgJ29wdGlvbmZpZWxkc2V0JzpcbiAgICAgICAgICB0aGlzLm9wdGlvbnMubWVzc2FnZUxvY2F0aW9uID0gJ3RvcCdcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICd0YWJhcnJheSc6XG4gICAgICAgIGNhc2UgJ3RhYnMnOlxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcywgJ3RhYi1jb250ZW50JylcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzLCAndGFiLXBhbmUnKVxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5sYWJlbEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMubGFiZWxIdG1sQ2xhc3MsICduYXYgbmF2LXRhYnMnKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIC8vICdBZGQnIGJ1dHRvbnMgLSByZWZlcmVuY2VzXG4gICAgICAgIGNhc2UgJyRyZWYnOlxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MsICdidG4gcHVsbC1yaWdodCcpXG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcywgdGhpcy5vcHRpb25zLnN0eWxlIHx8ICdidG4tZGVmYXVsdCcpXG4gICAgICAgICAgdGhpcy5vcHRpb25zLmljb24gPSAnZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIC8vIERlZmF1bHQgLSBpbmNsdWRpbmcgcmVndWxhciBpbnB1dHNcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzLCAnZm9ybS1jb250cm9sJylcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgdGhpcy51cGRhdGVIZWxwQmxvY2sodGhpcy5mb3JtQ29udHJvbC5zdGF0dXMpXG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoc3RhdHVzID0+IHRoaXMudXBkYXRlSGVscEJsb2NrKHN0YXR1cykpXG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1Zykge1xuICAgICAgICAgIGNvbnN0IHZhcnM6IGFueVtdID0gW11cbiAgICAgICAgICB0aGlzLmRlYnVnT3V0cHV0ID0gXy5tYXAodmFycywgdGhpc1ZhciA9PiBKU09OLnN0cmluZ2lmeSh0aGlzVmFyLCBudWxsLCAyKSkuam9pbignXFxuJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5mcmFtZXdvcmtJbml0aWFsaXplZCA9IHRydWVcbiAgICB9XG5cbiAgfVxuXG4gIHVwZGF0ZUhlbHBCbG9jayhzdGF0dXMpIHtcbiAgICB0aGlzLm9wdGlvbnMuaGVscEJsb2NrID0gc3RhdHVzID09PSAnSU5WQUxJRCcgJiZcbiAgICB0aGlzLm9wdGlvbnMuZW5hYmxlRXJyb3JTdGF0ZSAmJiB0aGlzLmZvcm1Db250cm9sLmVycm9ycyAmJlxuICAgICh0aGlzLmZvcm1Db250cm9sLmRpcnR5IHx8IHRoaXMub3B0aW9ucy5mZWVkYmFja09uUmVuZGVyKSA/XG4gICAgICB0aGlzLmpzZi5mb3JtYXRFcnJvcnModGhpcy5mb3JtQ29udHJvbC5lcnJvcnMsIHRoaXMub3B0aW9ucy52YWxpZGF0aW9uTWVzc2FnZXMpIDpcbiAgICAgIHRoaXMub3B0aW9ucy5kZXNjcmlwdGlvbiB8fCB0aGlzLm9wdGlvbnMuaGVscCB8fCBudWxsXG4gIH1cblxuICBzZXRUaXRsZSgpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAodGhpcy5sYXlvdXROb2RlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2J1dHRvbic6XG4gICAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICBjYXNlICdzZWN0aW9uJzpcbiAgICAgIGNhc2UgJ2hlbHAnOlxuICAgICAgY2FzZSAnbXNnJzpcbiAgICAgIGNhc2UgJ3N1Ym1pdCc6XG4gICAgICBjYXNlICdtZXNzYWdlJzpcbiAgICAgIGNhc2UgJ3RhYmFycmF5JzpcbiAgICAgIGNhc2UgJ3RhYnMnOlxuICAgICAgY2FzZSAnJHJlZic6XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICBjYXNlICdhZHZhbmNlZGZpZWxkc2V0JzpcbiAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmV4cGFuZGFibGUgPSB0cnVlXG4gICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy50aXRsZSA9ICdBZHZhbmNlZCBvcHRpb25zJ1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgY2FzZSAnYXV0aGZpZWxkc2V0JzpcbiAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmV4cGFuZGFibGUgPSB0cnVlXG4gICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy50aXRsZSA9ICdBdXRoZW50aWNhdGlvbiBzZXR0aW5ncydcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIGNhc2UgJ2ZpZWxkc2V0JzpcbiAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLnRpdGxlID0gdGhpcy5vcHRpb25zLnRpdGxlXG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMudGl0bGUgPSBudWxsXG4gICAgICAgIHJldHVybiB0aGlzLmpzZi5zZXRJdGVtVGl0bGUodGhpcylcbiAgICB9XG4gIH1cblxuICByZW1vdmVJdGVtKCkge1xuICAgIHRoaXMuanNmLnJlbW92ZUl0ZW0odGhpcylcbiAgfVxufVxuIl19