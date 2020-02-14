(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ngsf/widget-library'), require('@ngsf/common'), require('lodash'), require('@angular/common'), require('@angular/forms'), require('@angular/flex-layout'), require('@angular/material/autocomplete'), require('@angular/material/button'), require('@angular/material/button-toggle'), require('@angular/material/card'), require('@angular/material/checkbox'), require('@angular/material/chips'), require('@angular/material/datepicker'), require('@angular/material/expansion'), require('@angular/material/form-field'), require('@angular/material/icon'), require('@angular/material/input'), require('@angular/material/core'), require('@angular/material/radio'), require('@angular/material/select'), require('@angular/material/slider'), require('@angular/material/slide-toggle'), require('@angular/material/stepper'), require('@angular/material/tabs'), require('@angular/material/tooltip')) :
    typeof define === 'function' && define.amd ? define('@ngsf/material-design-framework', ['exports', '@angular/core', '@ngsf/widget-library', '@ngsf/common', 'lodash', '@angular/common', '@angular/forms', '@angular/flex-layout', '@angular/material/autocomplete', '@angular/material/button', '@angular/material/button-toggle', '@angular/material/card', '@angular/material/checkbox', '@angular/material/chips', '@angular/material/datepicker', '@angular/material/expansion', '@angular/material/form-field', '@angular/material/icon', '@angular/material/input', '@angular/material/core', '@angular/material/radio', '@angular/material/select', '@angular/material/slider', '@angular/material/slide-toggle', '@angular/material/stepper', '@angular/material/tabs', '@angular/material/tooltip'], factory) :
    (global = global || self, factory((global.ngsf = global.ngsf || {}, global.ngsf['material-design-framework'] = {}), global.ng.core, global.widgetLibrary, global.common, global.lodash, global.ng.common, global.ng.forms, global.ng['flex-layout'], global.ng.material.autocomplete, global.ng.material.button, global.ng.material['button-toggle'], global.ng.material.card, global.ng.material.checkbox, global.ng.material.chips, global.ng.material.datepicker, global.ng.material.expansion, global.ng.material['form-field'], global.ng.material.icon, global.ng.material.input, global.ng.material.core, global.ng.material.radio, global.ng.material.select, global.ng.material.slider, global.ng.material['slide-toggle'], global.ng.material.stepper, global.ng.material.tabs, global.ng.material.tooltip));
}(this, (function (exports, core, widgetLibrary, common, lodash, common$1, forms, flexLayout, autocomplete, button, buttonToggle, card, checkbox, chips, datepicker, expansion, formField, icon, input, core$1, radio, select, slider, slideToggle, stepper, tabs, tooltip) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var FlexLayoutRootComponent = (function () {
        function FlexLayoutRootComponent(jsf) {
            this.jsf = jsf;
            this.isFlexItem = false;
        }
        FlexLayoutRootComponent.prototype.removeItem = function (item) {
            this.jsf.removeItem(item);
        };
        FlexLayoutRootComponent.prototype.getFlexAttribute = function (node, attribute) {
            var index = ['flex-grow', 'flex-shrink', 'flex-basis'].indexOf(attribute);
            return ((node.options || {}).flex || '').split(/\s+/)[index] ||
                (node.options || {})[attribute] || ['1', '1', 'auto'][index];
        };
        FlexLayoutRootComponent.prototype.showWidget = function (layoutNode) {
            return this.jsf.evaluateCondition(layoutNode, this.dataIndex);
        };
        FlexLayoutRootComponent.ctorParameters = function () { return [
            { type: widgetLibrary.JsonSchemaFormService }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], FlexLayoutRootComponent.prototype, "dataIndex", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], FlexLayoutRootComponent.prototype, "layoutIndex", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], FlexLayoutRootComponent.prototype, "layout", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], FlexLayoutRootComponent.prototype, "isFlexItem", void 0);
        FlexLayoutRootComponent = __decorate([
            core.Component({
                selector: 'flex-layout-root-widget',
                template: "\n      <div *ngFor=\"let layoutNode of layout; let i = index\"\n           [class.form-flex-item]=\"isFlexItem\"\n           [style.flex-grow]=\"getFlexAttribute(layoutNode, 'flex-grow')\"\n           [style.flex-shrink]=\"getFlexAttribute(layoutNode, 'flex-shrink')\"\n           [style.flex-basis]=\"getFlexAttribute(layoutNode, 'flex-basis')\"\n           [style.align-self]=\"(layoutNode?.options || {})['align-self']\"\n           [style.order]=\"layoutNode?.options?.order\"\n           [fxFlex]=\"layoutNode?.options?.fxFlex\"\n           [fxFlexOrder]=\"layoutNode?.options?.fxFlexOrder\"\n           [fxFlexOffset]=\"layoutNode?.options?.fxFlexOffset\"\n           [fxFlexAlign]=\"layoutNode?.options?.fxFlexAlign\">\n          <select-framework-widget *ngIf=\"showWidget(layoutNode)\"\n                                   [dataIndex]=\"layoutNode?.arrayItem ? (dataIndex || []).concat(i) : (dataIndex || [])\"\n                                   [layoutIndex]=\"(layoutIndex || []).concat(i)\"\n                                   [layoutNode]=\"layoutNode\"></select-framework-widget>\n          </div>",
                changeDetection: core.ChangeDetectionStrategy.Default
            }),
            __metadata("design:paramtypes", [widgetLibrary.JsonSchemaFormService])
        ], FlexLayoutRootComponent);
        return FlexLayoutRootComponent;
    }());

    var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$1 = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var FlexLayoutSectionComponent = (function () {
        function FlexLayoutSectionComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
            this.expanded = true;
            this.containerType = 'div';
        }
        Object.defineProperty(FlexLayoutSectionComponent.prototype, "sectionTitle", {
            get: function () {
                return this.options.notitle ? null : this.jsf.setItemTitle(this);
            },
            enumerable: true,
            configurable: true
        });
        FlexLayoutSectionComponent.prototype.ngOnInit = function () {
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
        };
        FlexLayoutSectionComponent.prototype.toggleExpanded = function () {
            if (this.options.expandable) {
                this.expanded = !this.expanded;
            }
        };
        FlexLayoutSectionComponent.prototype.getFlexAttribute = function (attribute) {
            var flexActive = this.layoutNode.type === 'flex' ||
                !!this.options.displayFlex ||
                this.options.display === 'flex';
            switch (attribute) {
                case 'is-flex':
                    return flexActive;
                case 'display':
                    return flexActive ? 'flex' : 'initial';
                case 'flex-direction':
                case 'flex-wrap':
                    var index = ['flex-direction', 'flex-wrap'].indexOf(attribute);
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
        };
        FlexLayoutSectionComponent.ctorParameters = function () { return [
            { type: widgetLibrary.JsonSchemaFormService }
        ]; };
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", Object)
        ], FlexLayoutSectionComponent.prototype, "layoutNode", void 0);
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", Array)
        ], FlexLayoutSectionComponent.prototype, "layoutIndex", void 0);
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", Array)
        ], FlexLayoutSectionComponent.prototype, "dataIndex", void 0);
        FlexLayoutSectionComponent = __decorate$1([
            core.Component({
                selector: 'flex-layout-section-widget',
                template: "\n      <div *ngIf=\"containerType === 'div'\"\n           [class]=\"options?.htmlClass || ''\"\n           [class.expandable]=\"options?.expandable && !expanded\"\n           [class.expanded]=\"options?.expandable && expanded\">\n          <label *ngIf=\"sectionTitle\"\n                 [class]=\"'legend ' + (options?.labelHtmlClass || '')\"\n                 [innerHTML]=\"sectionTitle\"\n                 (click)=\"toggleExpanded()\"></label>\n          <flex-layout-root-widget *ngIf=\"expanded\"\n                                   [layout]=\"layoutNode.items\"\n                                   [dataIndex]=\"dataIndex\"\n                                   [layoutIndex]=\"layoutIndex\"\n                                   [isFlexItem]=\"getFlexAttribute('is-flex')\"\n                                   [class.form-flex-column]=\"getFlexAttribute('flex-direction') === 'column'\"\n                                   [class.form-flex-row]=\"getFlexAttribute('flex-direction') === 'row'\"\n                                   [style.display]=\"getFlexAttribute('display')\"\n                                   [style.flex-direction]=\"getFlexAttribute('flex-direction')\"\n                                   [style.flex-wrap]=\"getFlexAttribute('flex-wrap')\"\n                                   [style.justify-content]=\"getFlexAttribute('justify-content')\"\n                                   [style.align-items]=\"getFlexAttribute('align-items')\"\n                                   [style.align-content]=\"getFlexAttribute('align-content')\"\n                                   [fxLayout]=\"getFlexAttribute('layout')\"\n                                   [fxLayoutGap]=\"options?.fxLayoutGap\"\n                                   [fxLayoutAlign]=\"options?.fxLayoutAlign\"\n                                   [attr.fxFlexFill]=\"options?.fxLayoutAlign\"></flex-layout-root-widget>\n          <mat-error *ngIf=\"options?.showErrors && options?.errorMessage\"\n                     [innerHTML]=\"options?.errorMessage\"></mat-error>\n      </div>\n\n      <fieldset *ngIf=\"containerType === 'fieldset'\"\n                [class]=\"options?.htmlClass || ''\"\n                [class.expandable]=\"options?.expandable && !expanded\"\n                [class.expanded]=\"options?.expandable && expanded\"\n                [disabled]=\"options?.readonly\">\n          <legend *ngIf=\"sectionTitle\"\n                  [class]=\"'legend ' + (options?.labelHtmlClass || '')\"\n                  [innerHTML]=\"sectionTitle\"\n                  (click)=\"toggleExpanded()\"></legend>\n          <flex-layout-root-widget *ngIf=\"expanded\"\n                                   [layout]=\"layoutNode.items\"\n                                   [dataIndex]=\"dataIndex\"\n                                   [layoutIndex]=\"layoutIndex\"\n                                   [isFlexItem]=\"getFlexAttribute('is-flex')\"\n                                   [class.form-flex-column]=\"getFlexAttribute('flex-direction') === 'column'\"\n                                   [class.form-flex-row]=\"getFlexAttribute('flex-direction') === 'row'\"\n                                   [style.display]=\"getFlexAttribute('display')\"\n                                   [style.flex-direction]=\"getFlexAttribute('flex-direction')\"\n                                   [style.flex-wrap]=\"getFlexAttribute('flex-wrap')\"\n                                   [style.justify-content]=\"getFlexAttribute('justify-content')\"\n                                   [style.align-items]=\"getFlexAttribute('align-items')\"\n                                   [style.align-content]=\"getFlexAttribute('align-content')\"\n                                   [fxLayout]=\"getFlexAttribute('layout')\"\n                                   [fxLayoutGap]=\"options?.fxLayoutGap\"\n                                   [fxLayoutAlign]=\"options?.fxLayoutAlign\"\n                                   [attr.fxFlexFill]=\"options?.fxLayoutAlign\"></flex-layout-root-widget>\n          <mat-error *ngIf=\"options?.showErrors && options?.errorMessage\"\n                     [innerHTML]=\"options?.errorMessage\"></mat-error>\n      </fieldset>\n\n      <mat-card *ngIf=\"containerType === 'card'\"\n                [class]=\"options?.htmlClass || ''\"\n                [class.expandable]=\"options?.expandable && !expanded\"\n                [class.expanded]=\"options?.expandable && expanded\">\n          <mat-card-header *ngIf=\"sectionTitle\">\n              <legend\n                      [class]=\"'legend ' + (options?.labelHtmlClass || '')\"\n                      [innerHTML]=\"sectionTitle\"\n                      (click)=\"toggleExpanded()\"></legend>\n          </mat-card-header>\n          <mat-card-content *ngIf=\"expanded\">\n              <fieldset [disabled]=\"options?.readonly\">\n                  <flex-layout-root-widget *ngIf=\"expanded\"\n                                           [layout]=\"layoutNode.items\"\n                                           [dataIndex]=\"dataIndex\"\n                                           [layoutIndex]=\"layoutIndex\"\n                                           [isFlexItem]=\"getFlexAttribute('is-flex')\"\n                                           [class.form-flex-column]=\"getFlexAttribute('flex-direction') === 'column'\"\n                                           [class.form-flex-row]=\"getFlexAttribute('flex-direction') === 'row'\"\n                                           [style.display]=\"getFlexAttribute('display')\"\n                                           [style.flex-direction]=\"getFlexAttribute('flex-direction')\"\n                                           [style.flex-wrap]=\"getFlexAttribute('flex-wrap')\"\n                                           [style.justify-content]=\"getFlexAttribute('justify-content')\"\n                                           [style.align-items]=\"getFlexAttribute('align-items')\"\n                                           [style.align-content]=\"getFlexAttribute('align-content')\"\n                                           [fxLayout]=\"getFlexAttribute('layout')\"\n                                           [fxLayoutGap]=\"options?.fxLayoutGap\"\n                                           [fxLayoutAlign]=\"options?.fxLayoutAlign\"\n                                           [attr.fxFlexFill]=\"options?.fxLayoutAlign\"></flex-layout-root-widget>\n              </fieldset>\n          </mat-card-content>\n          <mat-card-footer>\n              <mat-error *ngIf=\"options?.showErrors && options?.errorMessage\"\n                         [innerHTML]=\"options?.errorMessage\"></mat-error>\n          </mat-card-footer>\n      </mat-card>\n\n      <mat-expansion-panel *ngIf=\"containerType === 'expansion-panel'\"\n                           [expanded]=\"expanded\"\n                           [hideToggle]=\"!options?.expandable\">\n          <mat-expansion-panel-header>\n              <mat-panel-title>\n                  <legend *ngIf=\"sectionTitle\"\n                          [class]=\"options?.labelHtmlClass\"\n                          [innerHTML]=\"sectionTitle\"\n                          (click)=\"toggleExpanded()\"></legend>\n              </mat-panel-title>\n          </mat-expansion-panel-header>\n          <fieldset [disabled]=\"options?.readonly\">\n              <flex-layout-root-widget *ngIf=\"expanded\"\n                                       [layout]=\"layoutNode.items\"\n                                       [dataIndex]=\"dataIndex\"\n                                       [layoutIndex]=\"layoutIndex\"\n                                       [isFlexItem]=\"getFlexAttribute('is-flex')\"\n                                       [class.form-flex-column]=\"getFlexAttribute('flex-direction') === 'column'\"\n                                       [class.form-flex-row]=\"getFlexAttribute('flex-direction') === 'row'\"\n                                       [style.display]=\"getFlexAttribute('display')\"\n                                       [style.flex-direction]=\"getFlexAttribute('flex-direction')\"\n                                       [style.flex-wrap]=\"getFlexAttribute('flex-wrap')\"\n                                       [style.justify-content]=\"getFlexAttribute('justify-content')\"\n                                       [style.align-items]=\"getFlexAttribute('align-items')\"\n                                       [style.align-content]=\"getFlexAttribute('align-content')\"\n                                       [fxLayout]=\"getFlexAttribute('layout')\"\n                                       [fxLayoutGap]=\"options?.fxLayoutGap\"\n                                       [fxLayoutAlign]=\"options?.fxLayoutAlign\"\n                                       [attr.fxFlexFill]=\"options?.fxLayoutAlign\"></flex-layout-root-widget>\n          </fieldset>\n          <mat-error *ngIf=\"options?.showErrors && options?.errorMessage\"\n                     [innerHTML]=\"options?.errorMessage\"></mat-error>\n      </mat-expansion-panel>",
                styles: ["\n      fieldset {\n          border: 0;\n          margin: 0;\n          padding: 0;\n      }\n\n      .legend {\n          font-weight: bold;\n      }\n\n      .expandable > .legend:before {\n          content: '\u25B6';\n          padding-right: .3em;\n      }\n\n      .expanded > .legend:before {\n          content: '\u25BC';\n          padding-right: .2em;\n      }\n  "]
            }),
            __metadata$1("design:paramtypes", [widgetLibrary.JsonSchemaFormService])
        ], FlexLayoutSectionComponent);
        return FlexLayoutSectionComponent;
    }());

    var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$2 = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MaterialAddReferenceComponent = (function () {
        function MaterialAddReferenceComponent(jsf) {
            this.jsf = jsf;
        }
        Object.defineProperty(MaterialAddReferenceComponent.prototype, "showAddButton", {
            get: function () {
                return !this.layoutNode.arrayItem ||
                    this.layoutIndex[this.layoutIndex.length - 1] < this.options.maxItems;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialAddReferenceComponent.prototype, "buttonText", {
            get: function () {
                var parent = {
                    dataIndex: this.dataIndex.slice(0, -1),
                    layoutIndex: this.layoutIndex.slice(0, -1),
                    layoutNode: this.jsf.getParentNode(this),
                };
                return parent.layoutNode.add ||
                    this.jsf.setArrayItemTitle(parent, this.layoutNode, this.itemCount);
            },
            enumerable: true,
            configurable: true
        });
        MaterialAddReferenceComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
        };
        MaterialAddReferenceComponent.prototype.addItem = function (event) {
            event.preventDefault();
            this.jsf.addItem(this);
        };
        MaterialAddReferenceComponent.ctorParameters = function () { return [
            { type: widgetLibrary.JsonSchemaFormService }
        ]; };
        __decorate$2([
            core.Input(),
            __metadata$2("design:type", Object)
        ], MaterialAddReferenceComponent.prototype, "layoutNode", void 0);
        __decorate$2([
            core.Input(),
            __metadata$2("design:type", Array)
        ], MaterialAddReferenceComponent.prototype, "layoutIndex", void 0);
        __decorate$2([
            core.Input(),
            __metadata$2("design:type", Array)
        ], MaterialAddReferenceComponent.prototype, "dataIndex", void 0);
        MaterialAddReferenceComponent = __decorate$2([
            core.Component({
                selector: 'material-add-reference-widget',
                template: "\n      <section [class]=\"options?.htmlClass || ''\" align=\"end\">\n          <button mat-raised-button *ngIf=\"showAddButton\"\n                  [color]=\"options?.color || 'accent'\"\n                  [disabled]=\"options?.readonly\"\n                  (click)=\"addItem($event)\">\n              <span *ngIf=\"options?.icon\" [class]=\"options?.icon\"></span>\n              <span *ngIf=\"options?.title\" [innerHTML]=\"buttonText\"></span>\n          </button>\n      </section>",
                changeDetection: core.ChangeDetectionStrategy.Default
            }),
            __metadata$2("design:paramtypes", [widgetLibrary.JsonSchemaFormService])
        ], MaterialAddReferenceComponent);
        return MaterialAddReferenceComponent;
    }());

    var __decorate$3 = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$3 = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MaterialButtonComponent = (function () {
        function MaterialButtonComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
        }
        MaterialButtonComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.options = this.layoutNode.options || {};
            this.jsf.initializeControl(this);
            if (common.hasOwn(this.options, 'disabled')) {
                this.controlDisabled = this.options.disabled;
            }
            else if (this.jsf.formOptions.disableInvalidSubmit) {
                this.controlDisabled = !this.jsf.isValid;
                this.jsf.isValidChanges.subscribe(function (isValid) { return _this.controlDisabled = !isValid; });
            }
        };
        MaterialButtonComponent.prototype.updateValue = function (event) {
            if (typeof this.options.onClick === 'function') {
                this.options.onClick(event);
            }
            else {
                this.jsf.updateValue(this, event.target.value);
            }
        };
        MaterialButtonComponent.ctorParameters = function () { return [
            { type: widgetLibrary.JsonSchemaFormService }
        ]; };
        __decorate$3([
            core.Input(),
            __metadata$3("design:type", Object)
        ], MaterialButtonComponent.prototype, "layoutNode", void 0);
        __decorate$3([
            core.Input(),
            __metadata$3("design:type", Array)
        ], MaterialButtonComponent.prototype, "layoutIndex", void 0);
        __decorate$3([
            core.Input(),
            __metadata$3("design:type", Array)
        ], MaterialButtonComponent.prototype, "dataIndex", void 0);
        MaterialButtonComponent = __decorate$3([
            core.Component({
                selector: 'material-button-widget',
                template: "\n      <div class=\"button-row\" [class]=\"options?.htmlClass || ''\">\n          <!-- [color]=\"options?.color || 'primary'\" -->\n          <button mat-raised-button\n                  [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n                  [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                  [disabled]=\"controlDisabled || options?.readonly\"\n                  [id]=\"'control' + layoutNode?._id\"\n                  [name]=\"controlName\"\n                  [type]=\"layoutNode?.type\"\n                  [value]=\"controlValue\"\n                  (click)=\"updateValue($event)\">\n              <mat-icon *ngIf=\"options?.icon\" class=\"mat-24\">{{options?.icon}}</mat-icon>\n              <span *ngIf=\"options?.title\" [innerHTML]=\"options?.title\"></span>\n          </button>\n      </div>",
                styles: [" button {\n      margin-top: 10px;\n  } "]
            }),
            __metadata$3("design:paramtypes", [widgetLibrary.JsonSchemaFormService])
        ], MaterialButtonComponent);
        return MaterialButtonComponent;
    }());

    var __decorate$4 = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$4 = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MaterialButtonGroupComponent = (function () {
        function MaterialButtonGroupComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
            this.radiosList = [];
            this.vertical = false;
        }
        MaterialButtonGroupComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
            this.radiosList = widgetLibrary.buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
            this.jsf.initializeControl(this);
        };
        MaterialButtonGroupComponent.prototype.updateValue = function (value) {
            this.options.showErrors = true;
            this.jsf.updateValue(this, value);
        };
        MaterialButtonGroupComponent.ctorParameters = function () { return [
            { type: widgetLibrary.JsonSchemaFormService }
        ]; };
        __decorate$4([
            core.Input(),
            __metadata$4("design:type", Object)
        ], MaterialButtonGroupComponent.prototype, "layoutNode", void 0);
        __decorate$4([
            core.Input(),
            __metadata$4("design:type", Array)
        ], MaterialButtonGroupComponent.prototype, "layoutIndex", void 0);
        __decorate$4([
            core.Input(),
            __metadata$4("design:type", Array)
        ], MaterialButtonGroupComponent.prototype, "dataIndex", void 0);
        MaterialButtonGroupComponent = __decorate$4([
            core.Component({
                selector: 'material-button-group-widget',
                template: "\n      <div>\n          <div *ngIf=\"options?.title\">\n              <label\n                      [attr.for]=\"'control' + layoutNode?._id\"\n                      [class]=\"options?.labelHtmlClass || ''\"\n                      [style.display]=\"options?.notitle ? 'none' : ''\"\n                      [innerHTML]=\"options?.title\"></label>\n              [disabled]=\"controlDisabled || options?.readonly\"\n          </div>\n          <mat-button-toggle-group\n                  [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                  [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n                  [attr.required]=\"options?.required\"\n                  [name]=\"controlName\"\n                  [value]=\"controlValue\"\n                  [vertical]=\"!!options.vertical\">\n              <mat-button-toggle *ngFor=\"let radioItem of radiosList\"\n                                 [id]=\"'control' + layoutNode?._id + '/' + radioItem?.name\"\n                                 [value]=\"radioItem?.value\"\n                                 (click)=\"updateValue(radioItem?.value)\">\n                  <span [innerHTML]=\"radioItem?.name\"></span>\n              </mat-button-toggle>\n          </mat-button-toggle-group>\n          <mat-error *ngIf=\"options?.showErrors && options?.errorMessage\"\n                     [innerHTML]=\"options?.errorMessage\"></mat-error>\n      </div>",
                styles: [" mat-error {\n      font-size: 75%;\n  } "]
            }),
            __metadata$4("design:paramtypes", [widgetLibrary.JsonSchemaFormService])
        ], MaterialButtonGroupComponent);
        return MaterialButtonGroupComponent;
    }());

    var __decorate$5 = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$5 = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MaterialCheckboxComponent = (function () {
        function MaterialCheckboxComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
            this.trueValue = true;
            this.falseValue = false;
            this.showSlideToggle = false;
        }
        Object.defineProperty(MaterialCheckboxComponent.prototype, "isChecked", {
            get: function () {
                return this.jsf.getFormControlValue(this) === this.trueValue;
            },
            enumerable: true,
            configurable: true
        });
        MaterialCheckboxComponent.prototype.ngOnInit = function () {
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
        };
        MaterialCheckboxComponent.prototype.updateValue = function (event) {
            this.options.showErrors = true;
            this.jsf.updateValue(this, event.checked ? this.trueValue : this.falseValue);
        };
        MaterialCheckboxComponent.ctorParameters = function () { return [
            { type: widgetLibrary.JsonSchemaFormService }
        ]; };
        __decorate$5([
            core.Input(),
            __metadata$5("design:type", Object)
        ], MaterialCheckboxComponent.prototype, "layoutNode", void 0);
        __decorate$5([
            core.Input(),
            __metadata$5("design:type", Array)
        ], MaterialCheckboxComponent.prototype, "layoutIndex", void 0);
        __decorate$5([
            core.Input(),
            __metadata$5("design:type", Array)
        ], MaterialCheckboxComponent.prototype, "dataIndex", void 0);
        MaterialCheckboxComponent = __decorate$5([
            core.Component({
                selector: 'material-checkbox-widget',
                template: "\n      <mat-checkbox *ngIf=\"boundControl && !showSlideToggle\"\n                    [formControl]=\"formControl\"\n                    align=\"left\"\n                    [color]=\"options?.color || 'primary'\"\n                    [id]=\"'control' + layoutNode?._id\"\n                    labelPosition=\"after\"\n                    [name]=\"controlName\"\n                    (blur)=\"options.showErrors = true\">\n      <span *ngIf=\"options?.title\"\n            class=\"checkbox-name\"\n            [style.display]=\"options?.notitle ? 'none' : ''\"\n            [innerHTML]=\"options?.title\"></span>\n      </mat-checkbox>\n      <mat-checkbox *ngIf=\"!boundControl && !showSlideToggle\"\n                    align=\"left\"\n                    [color]=\"options?.color || 'primary'\"\n                    [disabled]=\"controlDisabled || options?.readonly\"\n                    [id]=\"'control' + layoutNode?._id\"\n                    labelPosition=\"after\"\n                    [name]=\"controlName\"\n                    [checked]=\"isChecked\"\n                    (blur)=\"options.showErrors = true\"\n                    (change)=\"updateValue($event)\">\n      <span *ngIf=\"options?.title\"\n            class=\"checkbox-name\"\n            [style.display]=\"options?.notitle ? 'none' : ''\"\n            [innerHTML]=\"options?.title\"></span>\n      </mat-checkbox>\n      <mat-slide-toggle *ngIf=\"boundControl && showSlideToggle\"\n                        [formControl]=\"formControl\"\n                        align=\"left\"\n                        [color]=\"options?.color || 'primary'\"\n                        [id]=\"'control' + layoutNode?._id\"\n                        labelPosition=\"after\"\n                        [name]=\"controlName\"\n                        (blur)=\"options.showErrors = true\">\n      <span *ngIf=\"options?.title\"\n            class=\"checkbox-name\"\n            [style.display]=\"options?.notitle ? 'none' : ''\"\n            [innerHTML]=\"options?.title\"></span>\n      </mat-slide-toggle>\n      <mat-slide-toggle *ngIf=\"!boundControl && showSlideToggle\"\n                        align=\"left\"\n                        [color]=\"options?.color || 'primary'\"\n                        [disabled]=\"controlDisabled || options?.readonly\"\n                        [id]=\"'control' + layoutNode?._id\"\n                        labelPosition=\"after\"\n                        [name]=\"controlName\"\n                        [checked]=\"isChecked\"\n                        (blur)=\"options.showErrors = true\"\n                        (change)=\"updateValue($event)\">\n      <span *ngIf=\"options?.title\"\n            class=\"checkbox-name\"\n            [style.display]=\"options?.notitle ? 'none' : ''\"\n            [innerHTML]=\"options?.title\"></span>\n      </mat-slide-toggle>\n      <mat-error *ngIf=\"options?.showErrors && options?.errorMessage\"\n                 [innerHTML]=\"options?.errorMessage\"></mat-error>",
                styles: ["\n      .checkbox-name {\n          white-space: nowrap;\n      }\n\n      mat-error {\n          font-size: 75%;\n      }\n  "]
            }),
            __metadata$5("design:paramtypes", [widgetLibrary.JsonSchemaFormService])
        ], MaterialCheckboxComponent);
        return MaterialCheckboxComponent;
    }());

    var __decorate$6 = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$6 = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __values = (this && this.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var MaterialCheckboxesComponent = (function () {
        function MaterialCheckboxesComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
            this.horizontalList = false;
            this.checkboxList = [];
        }
        Object.defineProperty(MaterialCheckboxesComponent.prototype, "allChecked", {
            get: function () {
                return this.checkboxList.filter(function (t) { return t.checked; }).length === this.checkboxList.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialCheckboxesComponent.prototype, "someChecked", {
            get: function () {
                var checkedItems = this.checkboxList.filter(function (t) { return t.checked; }).length;
                return checkedItems > 0 && checkedItems < this.checkboxList.length;
            },
            enumerable: true,
            configurable: true
        });
        MaterialCheckboxesComponent.prototype.ngOnInit = function () {
            var e_1, _a;
            this.options = this.layoutNode.options || {};
            this.horizontalList = this.layoutNode.type === 'checkboxes-inline' ||
                this.layoutNode.type === 'checkboxbuttons';
            this.jsf.initializeControl(this);
            this.checkboxList = widgetLibrary.buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
            if (this.boundControl) {
                var formArray = this.jsf.getFormControl(this);
                try {
                    for (var _b = __values(this.checkboxList), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var checkboxItem = _c.value;
                        checkboxItem.checked = formArray.value.includes(checkboxItem.value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        MaterialCheckboxesComponent.prototype.updateValue = function () {
            this.options.showErrors = true;
            if (this.boundControl) {
                this.jsf.updateArrayCheckboxList(this, this.checkboxList);
            }
        };
        MaterialCheckboxesComponent.prototype.updateAllValues = function (event) {
            this.options.showErrors = true;
            this.checkboxList.forEach(function (t) { return t.checked = event.checked; });
            this.updateValue();
        };
        MaterialCheckboxesComponent.ctorParameters = function () { return [
            { type: widgetLibrary.JsonSchemaFormService }
        ]; };
        __decorate$6([
            core.Input(),
            __metadata$6("design:type", Object)
        ], MaterialCheckboxesComponent.prototype, "layoutNode", void 0);
        __decorate$6([
            core.Input(),
            __metadata$6("design:type", Array)
        ], MaterialCheckboxesComponent.prototype, "layoutIndex", void 0);
        __decorate$6([
            core.Input(),
            __metadata$6("design:type", Array)
        ], MaterialCheckboxesComponent.prototype, "dataIndex", void 0);
        MaterialCheckboxesComponent = __decorate$6([
            core.Component({
                selector: 'material-checkboxes-widget',
                template: "\n      <div>\n          <mat-checkbox type=\"checkbox\"\n                        [checked]=\"allChecked\"\n                        [color]=\"options?.color || 'primary'\"\n                        [disabled]=\"controlDisabled || options?.readonly\"\n                        [indeterminate]=\"someChecked\"\n                        [name]=\"options?.name\"\n                        (blur)=\"options.showErrors = true\"\n                        (change)=\"updateAllValues($event)\">\n              <span class=\"checkbox-name\" [innerHTML]=\"options?.name\"></span>\n          </mat-checkbox>\n          <label *ngIf=\"options?.title\"\n                 class=\"title\"\n                 [class]=\"options?.labelHtmlClass || ''\"\n                 [style.display]=\"options?.notitle ? 'none' : ''\"\n                 [innerHTML]=\"options?.title\"></label>\n          <ul class=\"checkbox-list\" [class.horizontal-list]=\"horizontalList\">\n              <li *ngFor=\"let checkboxItem of checkboxList\"\n                  [class]=\"options?.htmlClass || ''\">\n                  <mat-checkbox type=\"checkbox\"\n                                [(ngModel)]=\"checkboxItem.checked\"\n                                [color]=\"options?.color || 'primary'\"\n                                [disabled]=\"controlDisabled || options?.readonly\"\n                                [name]=\"checkboxItem?.name\"\n                                (blur)=\"options.showErrors = true\"\n                                (change)=\"updateValue()\">\n                      <span class=\"checkbox-name\" [innerHTML]=\"checkboxItem?.name\"></span>\n                  </mat-checkbox>\n              </li>\n          </ul>\n          <mat-error *ngIf=\"options?.showErrors && options?.errorMessage\"\n                     [innerHTML]=\"options?.errorMessage\"></mat-error>\n      </div>",
                styles: ["\n      .title {\n          font-weight: bold;\n      }\n\n      .checkbox-list {\n          list-style-type: none;\n      }\n\n      .horizontal-list > li {\n          display: inline-block;\n          margin-right: 10px;\n          zoom: 1;\n      }\n\n      .checkbox-name {\n          white-space: nowrap;\n      }\n\n      mat-error {\n          font-size: 75%;\n      }\n  "]
            }),
            __metadata$6("design:paramtypes", [widgetLibrary.JsonSchemaFormService])
        ], MaterialCheckboxesComponent);
        return MaterialCheckboxesComponent;
    }());

    var __decorate$7 = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$7 = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MaterialChipListComponent = (function () {
        function MaterialChipListComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
        }
        MaterialChipListComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
            this.jsf.initializeControl(this);
        };
        MaterialChipListComponent.prototype.updateValue = function (event) {
            this.jsf.updateValue(this, event.target.value);
        };
        MaterialChipListComponent.ctorParameters = function () { return [
            { type: widgetLibrary.JsonSchemaFormService }
        ]; };
        __decorate$7([
            core.Input(),
            __metadata$7("design:type", Object)
        ], MaterialChipListComponent.prototype, "layoutNode", void 0);
        __decorate$7([
            core.Input(),
            __metadata$7("design:type", Array)
        ], MaterialChipListComponent.prototype, "layoutIndex", void 0);
        __decorate$7([
            core.Input(),
            __metadata$7("design:type", Array)
        ], MaterialChipListComponent.prototype, "dataIndex", void 0);
        MaterialChipListComponent = __decorate$7([
            core.Component({
                selector: 'material-chip-list-widget',
                template: ""
            }),
            __metadata$7("design:paramtypes", [widgetLibrary.JsonSchemaFormService])
        ], MaterialChipListComponent);
        return MaterialChipListComponent;
    }());

    var __decorate$8 = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$8 = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MaterialDatepickerComponent = (function () {
        function MaterialDatepickerComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
            this.autoCompleteList = [];
        }
        MaterialDatepickerComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
            this.jsf.initializeControl(this, !this.options.readonly);
            this.setControlDate(this.controlValue);
            if (!this.options.notitle && !this.options.description && this.options.placeholder) {
                this.options.description = this.options.placeholder;
            }
        };
        MaterialDatepickerComponent.prototype.ngOnChanges = function () {
            this.setControlDate(this.controlValue);
        };
        MaterialDatepickerComponent.prototype.setControlDate = function (dateString) {
            this.dateValue = common.stringToDate(dateString);
        };
        MaterialDatepickerComponent.prototype.updateValue = function (event) {
            this.options.showErrors = true;
            this.jsf.updateValue(this, common.dateToString(event, this.options));
        };
        MaterialDatepickerComponent.ctorParameters = function () { return [
            { type: widgetLibrary.JsonSchemaFormService }
        ]; };
        __decorate$8([
            core.Input(),
            __metadata$8("design:type", Object)
        ], MaterialDatepickerComponent.prototype, "layoutNode", void 0);
        __decorate$8([
            core.Input(),
            __metadata$8("design:type", Array)
        ], MaterialDatepickerComponent.prototype, "layoutIndex", void 0);
        __decorate$8([
            core.Input(),
            __metadata$8("design:type", Array)
        ], MaterialDatepickerComponent.prototype, "dataIndex", void 0);
        MaterialDatepickerComponent = __decorate$8([
            core.Component({
                selector: 'material-datepicker-widget',
                template: "\n      <mat-form-field [style.width]=\"'100%'\">\n      <span matPrefix *ngIf=\"options?.prefix || options?.fieldAddonLeft\"\n            [innerHTML]=\"options?.prefix || options?.fieldAddonLeft\"></span>\n          <input matInput *ngIf=\"boundControl\"\n                 [formControl]=\"formControl\"\n                 [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                 [attr.list]=\"'control' + layoutNode?._id + 'Autocomplete'\"\n                 [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n                 [id]=\"'control' + layoutNode?._id\"\n                 [max]=\"options?.maximum\"\n                 [matDatepicker]=\"picker\"\n                 [min]=\"options?.minimum\"\n                 [name]=\"controlName\"\n                 [placeholder]=\"options?.title\"\n                 [required]=\"options?.required\"\n                 [style.width]=\"'100%'\"\n                 (blur)=\"options.showErrors = true\">\n          <input matInput *ngIf=\"!boundControl\"\n                 [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                 [attr.list]=\"'control' + layoutNode?._id + 'Autocomplete'\"\n                 [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n                 [disabled]=\"controlDisabled || options?.readonly\"\n                 [id]=\"'control' + layoutNode?._id\"\n                 [max]=\"options?.maximum\"\n                 [matDatepicker]=\"picker\"\n                 [min]=\"options?.minimum\"\n                 [name]=\"controlName\"\n                 [placeholder]=\"options?.title\"\n                 [required]=\"options?.required\"\n                 [style.width]=\"'100%'\"\n                 [value]=\"dateValue\"\n                 (blur)=\"options.showErrors = true\"\n                 (change)=\"updateValue($event)\"\n                 (input)=\"updateValue($event)\">\n          <span matSuffix *ngIf=\"options?.suffix || options?.fieldAddonRight\"\n                [innerHTML]=\"options?.suffix || options?.fieldAddonRight\"></span>\n          <mat-hint *ngIf=\"options?.description && (!options?.showErrors || !options?.errorMessage)\"\n                    align=\"end\" [innerHTML]=\"options?.description\"></mat-hint>\n          <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n      </mat-form-field>\n      <mat-datepicker #picker></mat-datepicker>\n      <mat-error *ngIf=\"options?.showErrors && options?.errorMessage\"\n                 [innerHTML]=\"options?.errorMessage\"></mat-error>",
                styles: ["\n      mat-error {\n          font-size: 75%;\n          margin-top: -1rem;\n          margin-bottom: 0.5rem;\n      }\n\n      ::ng-deep mat-form-field .mat-form-field-wrapper .mat-form-field-flex\n      .mat-form-field-infix {\n          width: initial;\n      }\n  "]
            }),
            __metadata$8("design:paramtypes", [widgetLibrary.JsonSchemaFormService])
        ], MaterialDatepickerComponent);
        return MaterialDatepickerComponent;
    }());

    var __decorate$9 = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$9 = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MaterialFileComponent = (function () {
        function MaterialFileComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
        }
        MaterialFileComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
            this.jsf.initializeControl(this);
        };
        MaterialFileComponent.prototype.updateValue = function (event) {
            this.jsf.updateValue(this, event.target.value);
        };
        MaterialFileComponent.ctorParameters = function () { return [
            { type: widgetLibrary.JsonSchemaFormService }
        ]; };
        __decorate$9([
            core.Input(),
            __metadata$9("design:type", Object)
        ], MaterialFileComponent.prototype, "layoutNode", void 0);
        __decorate$9([
            core.Input(),
            __metadata$9("design:type", Array)
        ], MaterialFileComponent.prototype, "layoutIndex", void 0);
        __decorate$9([
            core.Input(),
            __metadata$9("design:type", Array)
        ], MaterialFileComponent.prototype, "dataIndex", void 0);
        MaterialFileComponent = __decorate$9([
            core.Component({
                selector: 'material-file-widget',
                template: ""
            }),
            __metadata$9("design:paramtypes", [widgetLibrary.JsonSchemaFormService])
        ], MaterialFileComponent);
        return MaterialFileComponent;
    }());

    var __decorate$a = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$a = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MaterialInputComponent = (function () {
        function MaterialInputComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
            this.autoCompleteList = [];
        }
        MaterialInputComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
            this.jsf.initializeControl(this);
            if (!this.options.notitle && !this.options.description && this.options.placeholder) {
                this.options.description = this.options.placeholder;
            }
        };
        MaterialInputComponent.prototype.updateValue = function (event) {
            this.jsf.updateValue(this, event.target.value);
        };
        MaterialInputComponent.ctorParameters = function () { return [
            { type: widgetLibrary.JsonSchemaFormService }
        ]; };
        __decorate$a([
            core.Input(),
            __metadata$a("design:type", Object)
        ], MaterialInputComponent.prototype, "layoutNode", void 0);
        __decorate$a([
            core.Input(),
            __metadata$a("design:type", Array)
        ], MaterialInputComponent.prototype, "layoutIndex", void 0);
        __decorate$a([
            core.Input(),
            __metadata$a("design:type", Array)
        ], MaterialInputComponent.prototype, "dataIndex", void 0);
        MaterialInputComponent = __decorate$a([
            core.Component({
                selector: 'material-input-widget',
                template: "\n      <mat-form-field\n              [class]=\"options?.htmlClass || ''\"\n              [floatLabel]=\"options?.floatPlaceholder || (options?.notitle ? 'never' : 'auto')\"\n              [style.width]=\"'100%'\">\n      <span matPrefix *ngIf=\"options?.prefix || options?.fieldAddonLeft\"\n            [innerHTML]=\"options?.prefix || options?.fieldAddonLeft\"></span>\n          <input matInput *ngIf=\"boundControl\"\n                 [formControl]=\"formControl\"\n                 [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                 [attr.list]=\"'control' + layoutNode?._id + 'Autocomplete'\"\n                 [attr.maxlength]=\"options?.maxLength\"\n                 [attr.minlength]=\"options?.minLength\"\n                 [attr.pattern]=\"options?.pattern\"\n                 [readonly]=\"options?.readonly ? 'readonly' : null\"\n                 [id]=\"'control' + layoutNode?._id\"\n                 [name]=\"controlName\"\n                 [placeholder]=\"options?.notitle ? options?.placeholder : options?.title\"\n                 [required]=\"options?.required\"\n                 [style.width]=\"'100%'\"\n                 [type]=\"layoutNode?.type\"\n                 (blur)=\"options.showErrors = true\">\n          <input matInput *ngIf=\"!boundControl\"\n                 [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                 [attr.list]=\"'control' + layoutNode?._id + 'Autocomplete'\"\n                 [attr.maxlength]=\"options?.maxLength\"\n                 [attr.minlength]=\"options?.minLength\"\n                 [attr.pattern]=\"options?.pattern\"\n                 [disabled]=\"controlDisabled\"\n                 [id]=\"'control' + layoutNode?._id\"\n                 [name]=\"controlName\"\n                 [placeholder]=\"options?.notitle ? options?.placeholder : options?.title\"\n                 [readonly]=\"options?.readonly ? 'readonly' : null\"\n                 [required]=\"options?.required\"\n                 [style.width]=\"'100%'\"\n                 [type]=\"layoutNode?.type\"\n                 [value]=\"controlValue\"\n                 (input)=\"updateValue($event)\"\n                 (blur)=\"options.showErrors = true\">\n          <span matSuffix *ngIf=\"options?.suffix || options?.fieldAddonRight\"\n                [innerHTML]=\"options?.suffix || options?.fieldAddonRight\"></span>\n          <mat-hint *ngIf=\"options?.description && (!options?.showErrors || !options?.errorMessage)\"\n                    align=\"end\" [innerHTML]=\"options?.description\"></mat-hint>\n          <mat-autocomplete *ngIf=\"options?.typeahead?.source\">\n              <mat-option *ngFor=\"let word of options?.typeahead?.source\"\n                          [value]=\"word\">{{word}}</mat-option>\n          </mat-autocomplete>\n      </mat-form-field>\n      <mat-error *ngIf=\"options?.showErrors && options?.errorMessage\"\n                 [innerHTML]=\"options?.errorMessage\"></mat-error>",
                styles: ["\n      mat-error {\n          font-size: 75%;\n          margin-top: -1rem;\n          margin-bottom: 0.5rem;\n      }\n\n      ::ng-deep mat-form-field .mat-form-field-wrapper .mat-form-field-flex\n      .mat-form-field-infix {\n          width: initial;\n      }\n  "]
            }),
            __metadata$a("design:paramtypes", [widgetLibrary.JsonSchemaFormService])
        ], MaterialInputComponent);
        return MaterialInputComponent;
    }());

    var __decorate$b = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$b = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MaterialNumberComponent = (function () {
        function MaterialNumberComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
            this.allowNegative = true;
            this.allowDecimal = true;
            this.allowExponents = false;
            this.lastValidNumber = '';
        }
        MaterialNumberComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
            this.jsf.initializeControl(this);
            if (this.layoutNode.dataType === 'integer') {
                this.allowDecimal = false;
            }
            if (!this.options.notitle && !this.options.description && this.options.placeholder) {
                this.options.description = this.options.placeholder;
            }
        };
        MaterialNumberComponent.prototype.updateValue = function (event) {
            this.jsf.updateValue(this, event.target.value);
        };
        MaterialNumberComponent.ctorParameters = function () { return [
            { type: widgetLibrary.JsonSchemaFormService }
        ]; };
        __decorate$b([
            core.Input(),
            __metadata$b("design:type", Object)
        ], MaterialNumberComponent.prototype, "layoutNode", void 0);
        __decorate$b([
            core.Input(),
            __metadata$b("design:type", Array)
        ], MaterialNumberComponent.prototype, "layoutIndex", void 0);
        __decorate$b([
            core.Input(),
            __metadata$b("design:type", Array)
        ], MaterialNumberComponent.prototype, "dataIndex", void 0);
        MaterialNumberComponent = __decorate$b([
            core.Component({
                selector: 'material-number-widget',
                template: "\n      <mat-form-field\n              [class]=\"options?.htmlClass || ''\"\n              [floatLabel]=\"options?.floatPlaceholder || (options?.notitle ? 'never' : 'auto')\"\n              [style.width]=\"'100%'\">\n      <span matPrefix *ngIf=\"options?.prefix || options?.fieldAddonLeft\"\n            [innerHTML]=\"options?.prefix || options?.fieldAddonLeft\"></span>\n          <input matInput *ngIf=\"boundControl\"\n                 [formControl]=\"formControl\"\n                 [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                 [attr.max]=\"options?.maximum\"\n                 [attr.min]=\"options?.minimum\"\n                 [attr.step]=\"options?.multipleOf || options?.step || 'any'\"\n                 [id]=\"'control' + layoutNode?._id\"\n                 [name]=\"controlName\"\n                 [placeholder]=\"options?.notitle ? options?.placeholder : options?.title\"\n                 [readonly]=\"options?.readonly ? 'readonly' : null\"\n                 [required]=\"options?.required\"\n                 [style.width]=\"'100%'\"\n                 [type]=\"'number'\"\n                 (blur)=\"options.showErrors = true\">\n          <input matInput *ngIf=\"!boundControl\"\n                 [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                 [attr.max]=\"options?.maximum\"\n                 [attr.min]=\"options?.minimum\"\n                 [attr.step]=\"options?.multipleOf || options?.step || 'any'\"\n                 [disabled]=\"controlDisabled\"\n                 [id]=\"'control' + layoutNode?._id\"\n                 [name]=\"controlName\"\n                 [placeholder]=\"options?.notitle ? options?.placeholder : options?.title\"\n                 [readonly]=\"options?.readonly ? 'readonly' : null\"\n                 [required]=\"options?.required\"\n                 [style.width]=\"'100%'\"\n                 [type]=\"'number'\"\n                 [value]=\"controlValue\"\n                 (input)=\"updateValue($event)\"\n                 (blur)=\"options.showErrors = true\">\n          <span matSuffix *ngIf=\"options?.suffix || options?.fieldAddonRight\"\n                [innerHTML]=\"options?.suffix || options?.fieldAddonRight\"></span>\n          <mat-hint *ngIf=\"layoutNode?.type === 'range'\" align=\"start\"\n                    [innerHTML]=\"controlValue\"></mat-hint>\n          <mat-hint *ngIf=\"options?.description && (!options?.showErrors || !options?.errorMessage)\"\n                    align=\"end\" [innerHTML]=\"options?.description\"></mat-hint>\n      </mat-form-field>\n      <mat-error *ngIf=\"options?.showErrors && options?.errorMessage\"\n                 [innerHTML]=\"options?.errorMessage\"></mat-error>",
                styles: ["\n      mat-error {\n          font-size: 75%;\n          margin-top: -1rem;\n          margin-bottom: 0.5rem;\n      }\n\n      ::ng-deep mat-form-field .mat-form-field-wrapper .mat-form-field-flex\n      .mat-form-field-infix {\n          width: initial;\n      }\n  "]
            }),
            __metadata$b("design:paramtypes", [widgetLibrary.JsonSchemaFormService])
        ], MaterialNumberComponent);
        return MaterialNumberComponent;
    }());

    var __decorate$c = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$c = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MaterialOneOfComponent = (function () {
        function MaterialOneOfComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
        }
        MaterialOneOfComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
            this.jsf.initializeControl(this);
        };
        MaterialOneOfComponent.prototype.updateValue = function (event) {
            this.jsf.updateValue(this, event.target.value);
        };
        MaterialOneOfComponent.ctorParameters = function () { return [
            { type: widgetLibrary.JsonSchemaFormService }
        ]; };
        __decorate$c([
            core.Input(),
            __metadata$c("design:type", Object)
        ], MaterialOneOfComponent.prototype, "layoutNode", void 0);
        __decorate$c([
            core.Input(),
            __metadata$c("design:type", Array)
        ], MaterialOneOfComponent.prototype, "layoutIndex", void 0);
        __decorate$c([
            core.Input(),
            __metadata$c("design:type", Array)
        ], MaterialOneOfComponent.prototype, "dataIndex", void 0);
        MaterialOneOfComponent = __decorate$c([
            core.Component({
                selector: 'material-one-of-widget',
                template: ""
            }),
            __metadata$c("design:paramtypes", [widgetLibrary.JsonSchemaFormService])
        ], MaterialOneOfComponent);
        return MaterialOneOfComponent;
    }());

    var __decorate$d = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$d = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MaterialRadiosComponent = (function () {
        function MaterialRadiosComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
            this.flexDirection = 'column';
            this.radiosList = [];
        }
        MaterialRadiosComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
            if (this.layoutNode.type === 'radios-inline') {
                this.flexDirection = 'row';
            }
            this.radiosList = widgetLibrary.buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
            this.jsf.initializeControl(this, !this.options.readonly);
        };
        MaterialRadiosComponent.prototype.updateValue = function (value) {
            this.options.showErrors = true;
            this.jsf.updateValue(this, value);
        };
        MaterialRadiosComponent.ctorParameters = function () { return [
            { type: widgetLibrary.JsonSchemaFormService }
        ]; };
        __decorate$d([
            core.Input(),
            __metadata$d("design:type", Object)
        ], MaterialRadiosComponent.prototype, "layoutNode", void 0);
        __decorate$d([
            core.Input(),
            __metadata$d("design:type", Array)
        ], MaterialRadiosComponent.prototype, "layoutIndex", void 0);
        __decorate$d([
            core.Input(),
            __metadata$d("design:type", Array)
        ], MaterialRadiosComponent.prototype, "dataIndex", void 0);
        MaterialRadiosComponent = __decorate$d([
            core.Component({
                selector: 'material-radios-widget',
                template: "\n      <div>\n          <div *ngIf=\"options?.title\">\n              <label\n                      [attr.for]=\"'control' + layoutNode?._id\"\n                      [class]=\"options?.labelHtmlClass || ''\"\n                      [style.display]=\"options?.notitle ? 'none' : ''\"\n                      [innerHTML]=\"options?.title\"></label>\n          </div>\n          <mat-radio-group *ngIf=\"boundControl\"\n                           [formControl]=\"formControl\"\n                           [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                           [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n                           [attr.required]=\"options?.required\"\n                           [style.flex-direction]=\"flexDirection\"\n                           [name]=\"controlName\"\n                           (blur)=\"options.showErrors = true\">\n              <mat-radio-button *ngFor=\"let radioItem of radiosList\"\n                                [id]=\"'control' + layoutNode?._id + '/' + radioItem?.name\"\n                                [value]=\"radioItem?.value\">\n                  <span [innerHTML]=\"radioItem?.name\"></span>\n              </mat-radio-button>\n          </mat-radio-group>\n          <mat-radio-group *ngIf=\"!boundControl\"\n                           [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                           [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n                           [attr.required]=\"options?.required\"\n                           [style.flex-direction]=\"flexDirection\"\n                           [disabled]=\"controlDisabled || options?.readonly\"\n                           [name]=\"controlName\"\n                           [value]=\"controlValue\">\n              <mat-radio-button *ngFor=\"let radioItem of radiosList\"\n                                [id]=\"'control' + layoutNode?._id + '/' + radioItem?.name\"\n                                [value]=\"radioItem?.value\"\n                                (click)=\"updateValue(radioItem?.value)\">\n                  <span [innerHTML]=\"radioItem?.name\"></span>\n              </mat-radio-button>\n          </mat-radio-group>\n          <mat-error *ngIf=\"options?.showErrors && options?.errorMessage\"\n                     [innerHTML]=\"options?.errorMessage\"></mat-error>\n      </div>",
                styles: ["\n      mat-radio-group {\n          display: inline-flex;\n      }\n\n      mat-radio-button {\n          margin: 2px;\n      }\n\n      mat-error {\n          font-size: 75%;\n      }\n  "]
            }),
            __metadata$d("design:paramtypes", [widgetLibrary.JsonSchemaFormService])
        ], MaterialRadiosComponent);
        return MaterialRadiosComponent;
    }());

    var __decorate$e = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$e = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MaterialSelectComponent = (function () {
        function MaterialSelectComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
            this.selectList = [];
            this.isArray = common.isArray;
        }
        MaterialSelectComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
            this.selectList = widgetLibrary.buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, !!this.options.required, !!this.options.flatList);
            this.jsf.initializeControl(this, !this.options.readonly);
            if (!this.options.notitle && !this.options.description && this.options.placeholder) {
                this.options.description = this.options.placeholder;
            }
        };
        MaterialSelectComponent.prototype.updateValue = function (event) {
            this.options.showErrors = true;
            this.jsf.updateValue(this, event.value);
        };
        MaterialSelectComponent.ctorParameters = function () { return [
            { type: widgetLibrary.JsonSchemaFormService }
        ]; };
        __decorate$e([
            core.Input(),
            __metadata$e("design:type", Object)
        ], MaterialSelectComponent.prototype, "layoutNode", void 0);
        __decorate$e([
            core.Input(),
            __metadata$e("design:type", Array)
        ], MaterialSelectComponent.prototype, "layoutIndex", void 0);
        __decorate$e([
            core.Input(),
            __metadata$e("design:type", Array)
        ], MaterialSelectComponent.prototype, "dataIndex", void 0);
        MaterialSelectComponent = __decorate$e([
            core.Component({
                selector: 'material-select-widget',
                template: "\n      <mat-form-field\n              [class]=\"options?.htmlClass || ''\"\n              [floatLabel]=\"options?.floatPlaceholder || (options?.notitle ? 'never' : 'auto')\"\n              [style.width]=\"'100%'\">\n      <span matPrefix *ngIf=\"options?.prefix || options?.fieldAddonLeft\"\n            [innerHTML]=\"options?.prefix || options?.fieldAddonLeft\"></span>\n          <mat-select *ngIf=\"boundControl\"\n                      [formControl]=\"formControl\"\n                      [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                      [attr.name]=\"controlName\"\n                      [id]=\"'control' + layoutNode?._id\"\n                      [multiple]=\"options?.multiple\"\n                      [placeholder]=\"options?.notitle ? options?.placeholder : options?.title\"\n                      [required]=\"options?.required\"\n                      [style.width]=\"'100%'\"\n                      (blur)=\"options.showErrors = true\">\n              <ng-template ngFor let-selectItem [ngForOf]=\"selectList\">\n                  <mat-option *ngIf=\"!isArray(selectItem?.items)\"\n                              [value]=\"selectItem?.value\">\n                      <span [innerHTML]=\"selectItem?.name\"></span>\n                  </mat-option>\n                  <mat-optgroup *ngIf=\"isArray(selectItem?.items)\"\n                                [label]=\"selectItem?.group\">\n                      <mat-option *ngFor=\"let subItem of selectItem.items\"\n                                  [value]=\"subItem?.value\">\n                          <span [innerHTML]=\"subItem?.name\"></span>\n                      </mat-option>\n                  </mat-optgroup>\n              </ng-template>\n          </mat-select>\n          <mat-select *ngIf=\"!boundControl\"\n                      [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                      [attr.name]=\"controlName\"\n                      [disabled]=\"controlDisabled || options?.readonly\"\n                      [id]=\"'control' + layoutNode?._id\"\n                      [multiple]=\"options?.multiple\"\n                      [placeholder]=\"options?.notitle ? options?.placeholder : options?.title\"\n                      [required]=\"options?.required\"\n                      [style.width]=\"'100%'\"\n                      [value]=\"controlValue\"\n                      (blur)=\"options.showErrors = true\"\n                      (selectionChange)=\"updateValue($event)\">\n              <ng-template ngFor let-selectItem [ngForOf]=\"selectList\">\n                  <mat-option *ngIf=\"!isArray(selectItem?.items)\"\n                              [attr.selected]=\"selectItem?.value === controlValue\"\n                              [value]=\"selectItem?.value\">\n                      <span [innerHTML]=\"selectItem?.name\"></span>\n                  </mat-option>\n                  <mat-optgroup *ngIf=\"isArray(selectItem?.items)\"\n                                [label]=\"selectItem?.group\">\n                      <mat-option *ngFor=\"let subItem of selectItem.items\"\n                                  [attr.selected]=\"subItem?.value === controlValue\"\n                                  [value]=\"subItem?.value\">\n                          <span [innerHTML]=\"subItem?.name\"></span>\n                      </mat-option>\n                  </mat-optgroup>\n              </ng-template>\n          </mat-select>\n          <span matSuffix *ngIf=\"options?.suffix || options?.fieldAddonRight\"\n                [innerHTML]=\"options?.suffix || options?.fieldAddonRight\"></span>\n          <mat-hint *ngIf=\"options?.description && (!options?.showErrors || !options?.errorMessage)\"\n                    align=\"end\" [innerHTML]=\"options?.description\"></mat-hint>\n      </mat-form-field>\n      <mat-error *ngIf=\"options?.showErrors && options?.errorMessage\"\n                 [innerHTML]=\"options?.errorMessage\"></mat-error>",
                styles: ["\n      mat-error {\n          font-size: 75%;\n          margin-top: -1rem;\n          margin-bottom: 0.5rem;\n      }\n\n      ::ng-deep mat-form-field .mat-form-field-wrapper .mat-form-field-flex\n      .mat-form-field-infix {\n          width: initial;\n      }\n  "]
            }),
            __metadata$e("design:paramtypes", [widgetLibrary.JsonSchemaFormService])
        ], MaterialSelectComponent);
        return MaterialSelectComponent;
    }());

    var __decorate$f = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$f = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MaterialSliderComponent = (function () {
        function MaterialSliderComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
            this.allowNegative = true;
            this.allowDecimal = true;
            this.allowExponents = false;
            this.lastValidNumber = '';
        }
        MaterialSliderComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
            this.jsf.initializeControl(this, !this.options.readonly);
        };
        MaterialSliderComponent.prototype.updateValue = function (event) {
            this.options.showErrors = true;
            this.jsf.updateValue(this, event.value);
        };
        MaterialSliderComponent.ctorParameters = function () { return [
            { type: widgetLibrary.JsonSchemaFormService }
        ]; };
        __decorate$f([
            core.Input(),
            __metadata$f("design:type", Object)
        ], MaterialSliderComponent.prototype, "layoutNode", void 0);
        __decorate$f([
            core.Input(),
            __metadata$f("design:type", Array)
        ], MaterialSliderComponent.prototype, "layoutIndex", void 0);
        __decorate$f([
            core.Input(),
            __metadata$f("design:type", Array)
        ], MaterialSliderComponent.prototype, "dataIndex", void 0);
        MaterialSliderComponent = __decorate$f([
            core.Component({
                selector: 'material-slider-widget',
                template: "\n      <mat-slider thumbLabel *ngIf=\"boundControl\"\n                  [formControl]=\"formControl\"\n                  [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                  [id]=\"'control' + layoutNode?._id\"\n                  [max]=\"options?.maximum\"\n                  [min]=\"options?.minimum\"\n                  [step]=\"options?.multipleOf || options?.step || 'any'\"\n                  [style.width]=\"'100%'\"\n                  (blur)=\"options.showErrors = true\"></mat-slider>\n      <mat-slider thumbLabel *ngIf=\"!boundControl\"\n                  [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                  [disabled]=\"controlDisabled || options?.readonly\"\n                  [id]=\"'control' + layoutNode?._id\"\n                  [max]=\"options?.maximum\"\n                  [min]=\"options?.minimum\"\n                  [step]=\"options?.multipleOf || options?.step || 'any'\"\n                  [style.width]=\"'100%'\"\n                  [value]=\"controlValue\"\n                  (blur)=\"options.showErrors = true\"\n                  (change)=\"updateValue($event)\"></mat-slider>\n      <mat-error *ngIf=\"options?.showErrors && options?.errorMessage\"\n                 [innerHTML]=\"options?.errorMessage\"></mat-error>",
                styles: [" mat-error {\n      font-size: 75%;\n  } "]
            }),
            __metadata$f("design:paramtypes", [widgetLibrary.JsonSchemaFormService])
        ], MaterialSliderComponent);
        return MaterialSliderComponent;
    }());

    var __decorate$g = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$g = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MaterialStepperComponent = (function () {
        function MaterialStepperComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
        }
        MaterialStepperComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
            this.jsf.initializeControl(this);
        };
        MaterialStepperComponent.prototype.updateValue = function (event) {
            this.jsf.updateValue(this, event.target.value);
        };
        MaterialStepperComponent.ctorParameters = function () { return [
            { type: widgetLibrary.JsonSchemaFormService }
        ]; };
        __decorate$g([
            core.Input(),
            __metadata$g("design:type", Object)
        ], MaterialStepperComponent.prototype, "layoutNode", void 0);
        __decorate$g([
            core.Input(),
            __metadata$g("design:type", Array)
        ], MaterialStepperComponent.prototype, "layoutIndex", void 0);
        __decorate$g([
            core.Input(),
            __metadata$g("design:type", Array)
        ], MaterialStepperComponent.prototype, "dataIndex", void 0);
        MaterialStepperComponent = __decorate$g([
            core.Component({
                selector: 'material-stepper-widget',
                template: ""
            }),
            __metadata$g("design:paramtypes", [widgetLibrary.JsonSchemaFormService])
        ], MaterialStepperComponent);
        return MaterialStepperComponent;
    }());

    var __decorate$h = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$h = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MaterialTabsComponent = (function () {
        function MaterialTabsComponent(jsf) {
            this.jsf = jsf;
            this.selectedItem = 0;
            this.showAddTab = true;
        }
        MaterialTabsComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
            this.itemCount = this.layoutNode.items.length - 1;
            this.updateControl();
        };
        MaterialTabsComponent.prototype.select = function (index) {
            if (this.layoutNode.items[index].type === '$ref') {
                this.jsf.addItem({
                    layoutNode: this.layoutNode.items[index],
                    layoutIndex: this.layoutIndex.concat(index),
                    dataIndex: this.dataIndex.concat(index)
                });
                this.updateControl();
            }
            this.selectedItem = index;
        };
        MaterialTabsComponent.prototype.updateControl = function () {
            this.itemCount = this.layoutNode.items.length - 1;
            var lastItem = this.layoutNode.items[this.layoutNode.items.length - 1];
            this.showAddTab = lastItem.type === '$ref' &&
                this.itemCount < (lastItem.options.maxItems || 1000);
        };
        MaterialTabsComponent.prototype.setTabTitle = function (item, index) {
            return this.jsf.setArrayItemTitle(this, item, index);
        };
        MaterialTabsComponent.ctorParameters = function () { return [
            { type: widgetLibrary.JsonSchemaFormService }
        ]; };
        __decorate$h([
            core.Input(),
            __metadata$h("design:type", Object)
        ], MaterialTabsComponent.prototype, "layoutNode", void 0);
        __decorate$h([
            core.Input(),
            __metadata$h("design:type", Array)
        ], MaterialTabsComponent.prototype, "layoutIndex", void 0);
        __decorate$h([
            core.Input(),
            __metadata$h("design:type", Array)
        ], MaterialTabsComponent.prototype, "dataIndex", void 0);
        MaterialTabsComponent = __decorate$h([
            core.Component({
                selector: 'material-tabs-widget',
                template: "\n      <nav mat-tab-nav-bar\n           [attr.aria-label]=\"options?.label || options?.title || ''\"\n           [style.width]=\"'100%'\">\n          <a mat-tab-link *ngFor=\"let item of layoutNode?.items; let i = index\"\n             [active]=\"selectedItem === i\"\n             (click)=\"select(i)\">\n          <span *ngIf=\"showAddTab || item.type !== '$ref'\"\n                [innerHTML]=\"setTabTitle(item, i)\"></span>\n          </a>\n      </nav>\n      <div *ngFor=\"let layoutItem of layoutNode?.items; let i = index\"\n           [class]=\"options?.htmlClass || ''\">\n          <select-framework-widget *ngIf=\"selectedItem === i\"\n                                   [class]=\"(options?.fieldHtmlClass || '') + ' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')\"\n                                   [dataIndex]=\"layoutNode?.dataType === 'array' ? (dataIndex || []).concat(i) : dataIndex\"\n                                   [layoutIndex]=\"(layoutIndex || []).concat(i)\"\n                                   [layoutNode]=\"layoutItem\"></select-framework-widget>\n      </div>",
                styles: [" a {\n      cursor: pointer;\n  } "]
            }),
            __metadata$h("design:paramtypes", [widgetLibrary.JsonSchemaFormService])
        ], MaterialTabsComponent);
        return MaterialTabsComponent;
    }());

    var __decorate$i = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$i = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MaterialTextareaComponent = (function () {
        function MaterialTextareaComponent(jsf) {
            this.jsf = jsf;
            this.controlDisabled = false;
            this.boundControl = false;
        }
        MaterialTextareaComponent.prototype.ngOnInit = function () {
            this.options = this.layoutNode.options || {};
            this.jsf.initializeControl(this);
            if (!this.options.notitle && !this.options.description && this.options.placeholder) {
                this.options.description = this.options.placeholder;
            }
        };
        MaterialTextareaComponent.prototype.updateValue = function (event) {
            this.jsf.updateValue(this, event.target.value);
        };
        MaterialTextareaComponent.ctorParameters = function () { return [
            { type: widgetLibrary.JsonSchemaFormService }
        ]; };
        __decorate$i([
            core.Input(),
            __metadata$i("design:type", Object)
        ], MaterialTextareaComponent.prototype, "layoutNode", void 0);
        __decorate$i([
            core.Input(),
            __metadata$i("design:type", Array)
        ], MaterialTextareaComponent.prototype, "layoutIndex", void 0);
        __decorate$i([
            core.Input(),
            __metadata$i("design:type", Array)
        ], MaterialTextareaComponent.prototype, "dataIndex", void 0);
        MaterialTextareaComponent = __decorate$i([
            core.Component({
                selector: 'material-textarea-widget',
                template: "\n      <mat-form-field\n              [class]=\"options?.htmlClass || ''\"\n              [floatLabel]=\"options?.floatPlaceholder || (options?.notitle ? 'never' : 'auto')\"\n              [style.width]=\"'100%'\">\n      <span matPrefix *ngIf=\"options?.prefix || options?.fieldAddonLeft\"\n            [innerHTML]=\"options?.prefix || options?.fieldAddonLeft\"></span>\n          <textarea matInput *ngIf=\"boundControl\"\n                    [formControl]=\"formControl\"\n                    [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                    [attr.list]=\"'control' + layoutNode?._id + 'Autocomplete'\"\n                    [attr.maxlength]=\"options?.maxLength\"\n                    [attr.minlength]=\"options?.minLength\"\n                    [attr.pattern]=\"options?.pattern\"\n                    [required]=\"options?.required\"\n                    [id]=\"'control' + layoutNode?._id\"\n                    [name]=\"controlName\"\n                    [placeholder]=\"options?.notitle ? options?.placeholder : options?.title\"\n                    [readonly]=\"options?.readonly ? 'readonly' : null\"\n                    [style.width]=\"'100%'\"\n                    (blur)=\"options.showErrors = true\"></textarea>\n          <textarea matInput *ngIf=\"!boundControl\"\n                    [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                    [attr.list]=\"'control' + layoutNode?._id + 'Autocomplete'\"\n                    [attr.maxlength]=\"options?.maxLength\"\n                    [attr.minlength]=\"options?.minLength\"\n                    [attr.pattern]=\"options?.pattern\"\n                    [required]=\"options?.required\"\n                    [disabled]=\"controlDisabled\"\n                    [id]=\"'control' + layoutNode?._id\"\n                    [name]=\"controlName\"\n                    [placeholder]=\"options?.notitle ? options?.placeholder : options?.title\"\n                    [readonly]=\"options?.readonly ? 'readonly' : null\"\n                    [style.width]=\"'100%'\"\n                    [value]=\"controlValue\"\n                    (input)=\"updateValue($event)\"\n                    (blur)=\"options.showErrors = true\"></textarea>\n          <span matSuffix *ngIf=\"options?.suffix || options?.fieldAddonRight\"\n                [innerHTML]=\"options?.suffix || options?.fieldAddonRight\"></span>\n          <mat-hint *ngIf=\"options?.description && (!options?.showErrors || !options?.errorMessage)\"\n                    align=\"end\" [innerHTML]=\"options?.description\"></mat-hint>\n      </mat-form-field>\n      <mat-error *ngIf=\"options?.showErrors && options?.errorMessage\"\n                 [innerHTML]=\"options?.errorMessage\"></mat-error>",
                styles: ["\n      mat-error {\n          font-size: 75%;\n          margin-top: -1rem;\n          margin-bottom: 0.5rem;\n      }\n\n      ::ng-deep mat-form-field .mat-form-field-wrapper .mat-form-field-flex\n      .mat-form-field-infix {\n          width: initial;\n      }\n  "]
            }),
            __metadata$i("design:paramtypes", [widgetLibrary.JsonSchemaFormService])
        ], MaterialTextareaComponent);
        return MaterialTextareaComponent;
    }());

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
    var __decorate$j = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$j = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MaterialDesignFrameworkComponent = (function () {
        function MaterialDesignFrameworkComponent(changeDetector, jsf) {
            this.changeDetector = changeDetector;
            this.jsf = jsf;
            this.frameworkInitialized = false;
            this.formControl = null;
            this.parentArray = null;
            this.isOrderable = false;
            this.dynamicTitle = null;
        }
        Object.defineProperty(MaterialDesignFrameworkComponent.prototype, "showRemoveButton", {
            get: function () {
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
            },
            enumerable: true,
            configurable: true
        });
        MaterialDesignFrameworkComponent.prototype.ngOnInit = function () {
            this.initializeFramework();
        };
        MaterialDesignFrameworkComponent.prototype.ngOnChanges = function () {
            if (!this.frameworkInitialized) {
                this.initializeFramework();
            }
            if (this.dynamicTitle) {
                this.updateTitle();
            }
        };
        MaterialDesignFrameworkComponent.prototype.initializeFramework = function () {
            if (this.layoutNode) {
                this.options = lodash.cloneDeep(this.layoutNode.options || {});
                this.widgetLayoutNode = __assign(__assign({}, this.layoutNode), { options: lodash.cloneDeep(this.layoutNode.options || {}) });
                this.widgetOptions = this.widgetLayoutNode.options;
                this.formControl = this.jsf.getFormControl(this);
                if (common.isDefined(this.widgetOptions.minimum) &&
                    common.isDefined(this.widgetOptions.maximum) &&
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
        };
        MaterialDesignFrameworkComponent.prototype.updateTitle = function () {
            this.widgetLayoutNode.options.title = this.jsf.parseText(this.dynamicTitle, this.jsf.getFormControlValue(this), this.jsf.getFormControlGroup(this).value, this.dataIndex[this.dataIndex.length - 1]);
        };
        MaterialDesignFrameworkComponent.prototype.removeItem = function () {
            this.jsf.removeItem(this);
        };
        MaterialDesignFrameworkComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: widgetLibrary.JsonSchemaFormService }
        ]; };
        __decorate$j([
            core.Input(),
            __metadata$j("design:type", Object)
        ], MaterialDesignFrameworkComponent.prototype, "layoutNode", void 0);
        __decorate$j([
            core.Input(),
            __metadata$j("design:type", Array)
        ], MaterialDesignFrameworkComponent.prototype, "layoutIndex", void 0);
        __decorate$j([
            core.Input(),
            __metadata$j("design:type", Array)
        ], MaterialDesignFrameworkComponent.prototype, "dataIndex", void 0);
        MaterialDesignFrameworkComponent = __decorate$j([
            core.Component({
                selector: 'material-design-framework',
                template: "\n      <div\n              [class.array-item]=\"widgetLayoutNode?.arrayItem && widgetLayoutNode?.type !== '$ref'\"\n              [orderable]=\"isOrderable\"\n              [dataIndex]=\"dataIndex\"\n              [layoutIndex]=\"layoutIndex\"\n              [layoutNode]=\"widgetLayoutNode\">\n          <svg *ngIf=\"showRemoveButton\"\n               xmlns=\"http://www.w3.org/2000/svg\"\n               height=\"18\" width=\"18\" viewBox=\"0 0 24 24\"\n               class=\"close-button\"\n               (click)=\"removeItem()\">\n              <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z\"/>\n          </svg>\n          <select-widget-widget\n                  [dataIndex]=\"dataIndex\"\n                  [layoutIndex]=\"layoutIndex\"\n                  [layoutNode]=\"widgetLayoutNode\"></select-widget-widget>\n      </div>\n      <div class=\"spacer\" *ngIf=\"widgetLayoutNode?.arrayItem && widgetLayoutNode?.type !== '$ref'\"></div>",
                styles: ["\n      .array-item {\n          border-radius: 2px;\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2),\n          0 2px 2px 0 rgba(0, 0, 0, .14),\n          0 1px 5px 0 rgba(0, 0, 0, .12);\n          padding: 6px;\n          position: relative;\n          transition: all 280ms cubic-bezier(.4, 0, .2, 1);\n      }\n\n      .close-button {\n          cursor: pointer;\n          position: absolute;\n          top: 6px;\n          right: 6px;\n          fill: rgba(0, 0, 0, .4);\n          visibility: hidden;\n          z-index: 500;\n      }\n\n      .close-button:hover {\n          fill: rgba(0, 0, 0, .8);\n      }\n\n      .array-item:hover > .close-button {\n          visibility: visible;\n      }\n\n      .spacer {\n          margin: 6px 0;\n      }\n\n      [draggable=true]:hover {\n          box-shadow: 0 5px 5px -3px rgba(0, 0, 0, .2),\n          0 8px 10px 1px rgba(0, 0, 0, .14),\n          0 3px 14px 2px rgba(0, 0, 0, .12);\n          cursor: move;\n          z-index: 10;\n      }\n\n      [draggable=true].drag-target-top {\n          box-shadow: 0 -2px 0 #000;\n          position: relative;\n          z-index: 20;\n      }\n\n      [draggable=true].drag-target-bottom {\n          box-shadow: 0 2px 0 #000;\n          position: relative;\n          z-index: 20;\n      }\n  "]
            }),
            __metadata$j("design:paramtypes", [core.ChangeDetectorRef,
                widgetLibrary.JsonSchemaFormService])
        ], MaterialDesignFrameworkComponent);
        return MaterialDesignFrameworkComponent;
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
    var __decorate$k = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var MaterialDesignFramework = (function (_super) {
        __extends(MaterialDesignFramework, _super);
        function MaterialDesignFramework() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.name = 'material-design';
            _this.framework = MaterialDesignFrameworkComponent;
            _this.stylesheets = [
                '//fonts.googleapis.com/icon?family=Material+Icons',
                '//fonts.googleapis.com/css?family=Roboto:300,400,500,700',
            ];
            _this.widgets = {
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
            return _this;
        }
        MaterialDesignFramework = __decorate$k([
            core.Injectable()
        ], MaterialDesignFramework);
        return MaterialDesignFramework;
    }(common.Framework));

    var __decorate$l = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var MaterialDesignFrameworkModule = (function () {
        function MaterialDesignFrameworkModule() {
        }
        MaterialDesignFrameworkModule_1 = MaterialDesignFrameworkModule;
        MaterialDesignFrameworkModule.forRoot = function () {
            return {
                ngModule: MaterialDesignFrameworkModule_1,
                providers: [
                    {
                        provide: common.Framework,
                        useClass: MaterialDesignFramework,
                        multi: true,
                    },
                ],
            };
        };
        var MaterialDesignFrameworkModule_1;
        MaterialDesignFrameworkModule = MaterialDesignFrameworkModule_1 = __decorate$l([
            core.NgModule({
                imports: [
                    common$1.CommonModule,
                    forms.FormsModule,
                    forms.ReactiveFormsModule,
                    flexLayout.FlexLayoutModule,
                    autocomplete.MatAutocompleteModule,
                    button.MatButtonModule,
                    buttonToggle.MatButtonToggleModule,
                    card.MatCardModule,
                    checkbox.MatCheckboxModule,
                    chips.MatChipsModule,
                    datepicker.MatDatepickerModule,
                    expansion.MatExpansionModule,
                    formField.MatFormFieldModule,
                    icon.MatIconModule,
                    input.MatInputModule,
                    core$1.MatNativeDateModule,
                    radio.MatRadioModule,
                    select.MatSelectModule,
                    slider.MatSliderModule,
                    slideToggle.MatSlideToggleModule,
                    stepper.MatStepperModule,
                    tabs.MatTabsModule,
                    tooltip.MatTooltipModule,
                    widgetLibrary.WidgetLibraryModule,
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
            })
        ], MaterialDesignFrameworkModule);
        return MaterialDesignFrameworkModule;
    }());

    exports.FlexLayoutRootComponent = FlexLayoutRootComponent;
    exports.FlexLayoutSectionComponent = FlexLayoutSectionComponent;
    exports.MaterialAddReferenceComponent = MaterialAddReferenceComponent;
    exports.MaterialButtonComponent = MaterialButtonComponent;
    exports.MaterialButtonGroupComponent = MaterialButtonGroupComponent;
    exports.MaterialCheckboxComponent = MaterialCheckboxComponent;
    exports.MaterialCheckboxesComponent = MaterialCheckboxesComponent;
    exports.MaterialChipListComponent = MaterialChipListComponent;
    exports.MaterialDatepickerComponent = MaterialDatepickerComponent;
    exports.MaterialDesignFramework = MaterialDesignFramework;
    exports.MaterialDesignFrameworkComponent = MaterialDesignFrameworkComponent;
    exports.MaterialDesignFrameworkModule = MaterialDesignFrameworkModule;
    exports.MaterialFileComponent = MaterialFileComponent;
    exports.MaterialInputComponent = MaterialInputComponent;
    exports.MaterialNumberComponent = MaterialNumberComponent;
    exports.MaterialOneOfComponent = MaterialOneOfComponent;
    exports.MaterialRadiosComponent = MaterialRadiosComponent;
    exports.MaterialSelectComponent = MaterialSelectComponent;
    exports.MaterialSliderComponent = MaterialSliderComponent;
    exports.MaterialStepperComponent = MaterialStepperComponent;
    exports.MaterialTabsComponent = MaterialTabsComponent;
    exports.MaterialTextareaComponent = MaterialTextareaComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngsf-material-design-framework.umd.js.map
