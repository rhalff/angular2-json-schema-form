import { Input, Component, ChangeDetectionStrategy, ChangeDetectorRef, Injectable, NgModule } from '@angular/core';
import { JsonSchemaFormService, buildTitleMap, WidgetLibraryModule } from '@ngsf/widget-library';
import { hasOwn, stringToDate, dateToString, isArray, isDefined, Framework } from '@ngsf/common';
import { cloneDeep } from 'lodash';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let FlexLayoutRootComponent = class FlexLayoutRootComponent {
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
};
FlexLayoutRootComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
__decorate([
    Input(),
    __metadata("design:type", Array)
], FlexLayoutRootComponent.prototype, "dataIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], FlexLayoutRootComponent.prototype, "layoutIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], FlexLayoutRootComponent.prototype, "layout", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FlexLayoutRootComponent.prototype, "isFlexItem", void 0);
FlexLayoutRootComponent = __decorate([
    Component({
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
        changeDetection: ChangeDetectionStrategy.Default
    }),
    __metadata("design:paramtypes", [JsonSchemaFormService])
], FlexLayoutRootComponent);

var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let FlexLayoutSectionComponent = class FlexLayoutSectionComponent {
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
};
FlexLayoutSectionComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
__decorate$1([
    Input(),
    __metadata$1("design:type", Object)
], FlexLayoutSectionComponent.prototype, "layoutNode", void 0);
__decorate$1([
    Input(),
    __metadata$1("design:type", Array)
], FlexLayoutSectionComponent.prototype, "layoutIndex", void 0);
__decorate$1([
    Input(),
    __metadata$1("design:type", Array)
], FlexLayoutSectionComponent.prototype, "dataIndex", void 0);
FlexLayoutSectionComponent = __decorate$1([
    Component({
        selector: 'flex-layout-section-widget',
        template: `
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
      </mat-expansion-panel>`,
        styles: [`
      fieldset {
          border: 0;
          margin: 0;
          padding: 0;
      }

      .legend {
          font-weight: bold;
      }

      .expandable > .legend:before {
          content: '▶';
          padding-right: .3em;
      }

      .expanded > .legend:before {
          content: '▼';
          padding-right: .2em;
      }
  `]
    }),
    __metadata$1("design:paramtypes", [JsonSchemaFormService])
], FlexLayoutSectionComponent);

var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let MaterialAddReferenceComponent = class MaterialAddReferenceComponent {
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
};
MaterialAddReferenceComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
__decorate$2([
    Input(),
    __metadata$2("design:type", Object)
], MaterialAddReferenceComponent.prototype, "layoutNode", void 0);
__decorate$2([
    Input(),
    __metadata$2("design:type", Array)
], MaterialAddReferenceComponent.prototype, "layoutIndex", void 0);
__decorate$2([
    Input(),
    __metadata$2("design:type", Array)
], MaterialAddReferenceComponent.prototype, "dataIndex", void 0);
MaterialAddReferenceComponent = __decorate$2([
    Component({
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
        changeDetection: ChangeDetectionStrategy.Default
    }),
    __metadata$2("design:paramtypes", [JsonSchemaFormService])
], MaterialAddReferenceComponent);

var __decorate$3 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$3 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let MaterialButtonComponent = class MaterialButtonComponent {
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
};
MaterialButtonComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
__decorate$3([
    Input(),
    __metadata$3("design:type", Object)
], MaterialButtonComponent.prototype, "layoutNode", void 0);
__decorate$3([
    Input(),
    __metadata$3("design:type", Array)
], MaterialButtonComponent.prototype, "layoutIndex", void 0);
__decorate$3([
    Input(),
    __metadata$3("design:type", Array)
], MaterialButtonComponent.prototype, "dataIndex", void 0);
MaterialButtonComponent = __decorate$3([
    Component({
        selector: 'material-button-widget',
        template: `
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
      </div>`,
        styles: [` button {
      margin-top: 10px;
  } `]
    }),
    __metadata$3("design:paramtypes", [JsonSchemaFormService])
], MaterialButtonComponent);

var __decorate$4 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$4 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let MaterialButtonGroupComponent = class MaterialButtonGroupComponent {
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
};
MaterialButtonGroupComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
__decorate$4([
    Input(),
    __metadata$4("design:type", Object)
], MaterialButtonGroupComponent.prototype, "layoutNode", void 0);
__decorate$4([
    Input(),
    __metadata$4("design:type", Array)
], MaterialButtonGroupComponent.prototype, "layoutIndex", void 0);
__decorate$4([
    Input(),
    __metadata$4("design:type", Array)
], MaterialButtonGroupComponent.prototype, "dataIndex", void 0);
MaterialButtonGroupComponent = __decorate$4([
    Component({
        selector: 'material-button-group-widget',
        template: `
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
      </div>`,
        styles: [` mat-error {
      font-size: 75%;
  } `]
    }),
    __metadata$4("design:paramtypes", [JsonSchemaFormService])
], MaterialButtonGroupComponent);

var __decorate$5 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$5 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let MaterialCheckboxComponent = class MaterialCheckboxComponent {
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
};
MaterialCheckboxComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
__decorate$5([
    Input(),
    __metadata$5("design:type", Object)
], MaterialCheckboxComponent.prototype, "layoutNode", void 0);
__decorate$5([
    Input(),
    __metadata$5("design:type", Array)
], MaterialCheckboxComponent.prototype, "layoutIndex", void 0);
__decorate$5([
    Input(),
    __metadata$5("design:type", Array)
], MaterialCheckboxComponent.prototype, "dataIndex", void 0);
MaterialCheckboxComponent = __decorate$5([
    Component({
        selector: 'material-checkbox-widget',
        template: `
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
                 [innerHTML]="options?.errorMessage"></mat-error>`,
        styles: [`
      .checkbox-name {
          white-space: nowrap;
      }

      mat-error {
          font-size: 75%;
      }
  `]
    }),
    __metadata$5("design:paramtypes", [JsonSchemaFormService])
], MaterialCheckboxComponent);

var __decorate$6 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$6 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let MaterialCheckboxesComponent = class MaterialCheckboxesComponent {
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
};
MaterialCheckboxesComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
__decorate$6([
    Input(),
    __metadata$6("design:type", Object)
], MaterialCheckboxesComponent.prototype, "layoutNode", void 0);
__decorate$6([
    Input(),
    __metadata$6("design:type", Array)
], MaterialCheckboxesComponent.prototype, "layoutIndex", void 0);
__decorate$6([
    Input(),
    __metadata$6("design:type", Array)
], MaterialCheckboxesComponent.prototype, "dataIndex", void 0);
MaterialCheckboxesComponent = __decorate$6([
    Component({
        selector: 'material-checkboxes-widget',
        template: `
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
      </div>`,
        styles: [`
      .title {
          font-weight: bold;
      }

      .checkbox-list {
          list-style-type: none;
      }

      .horizontal-list > li {
          display: inline-block;
          margin-right: 10px;
          zoom: 1;
      }

      .checkbox-name {
          white-space: nowrap;
      }

      mat-error {
          font-size: 75%;
      }
  `]
    }),
    __metadata$6("design:paramtypes", [JsonSchemaFormService])
], MaterialCheckboxesComponent);

var __decorate$7 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$7 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let MaterialChipListComponent = class MaterialChipListComponent {
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
};
MaterialChipListComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
__decorate$7([
    Input(),
    __metadata$7("design:type", Object)
], MaterialChipListComponent.prototype, "layoutNode", void 0);
__decorate$7([
    Input(),
    __metadata$7("design:type", Array)
], MaterialChipListComponent.prototype, "layoutIndex", void 0);
__decorate$7([
    Input(),
    __metadata$7("design:type", Array)
], MaterialChipListComponent.prototype, "dataIndex", void 0);
MaterialChipListComponent = __decorate$7([
    Component({
        selector: 'material-chip-list-widget',
        template: ``
    }),
    __metadata$7("design:paramtypes", [JsonSchemaFormService])
], MaterialChipListComponent);

var __decorate$8 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$8 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let MaterialDatepickerComponent = class MaterialDatepickerComponent {
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
};
MaterialDatepickerComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
__decorate$8([
    Input(),
    __metadata$8("design:type", Object)
], MaterialDatepickerComponent.prototype, "layoutNode", void 0);
__decorate$8([
    Input(),
    __metadata$8("design:type", Array)
], MaterialDatepickerComponent.prototype, "layoutIndex", void 0);
__decorate$8([
    Input(),
    __metadata$8("design:type", Array)
], MaterialDatepickerComponent.prototype, "dataIndex", void 0);
MaterialDatepickerComponent = __decorate$8([
    Component({
        selector: 'material-datepicker-widget',
        template: `
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
                 [innerHTML]="options?.errorMessage"></mat-error>`,
        styles: [`
      mat-error {
          font-size: 75%;
          margin-top: -1rem;
          margin-bottom: 0.5rem;
      }

      ::ng-deep mat-form-field .mat-form-field-wrapper .mat-form-field-flex
      .mat-form-field-infix {
          width: initial;
      }
  `]
    }),
    __metadata$8("design:paramtypes", [JsonSchemaFormService])
], MaterialDatepickerComponent);

var __decorate$9 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$9 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let MaterialFileComponent = class MaterialFileComponent {
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
};
MaterialFileComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
__decorate$9([
    Input(),
    __metadata$9("design:type", Object)
], MaterialFileComponent.prototype, "layoutNode", void 0);
__decorate$9([
    Input(),
    __metadata$9("design:type", Array)
], MaterialFileComponent.prototype, "layoutIndex", void 0);
__decorate$9([
    Input(),
    __metadata$9("design:type", Array)
], MaterialFileComponent.prototype, "dataIndex", void 0);
MaterialFileComponent = __decorate$9([
    Component({
        selector: 'material-file-widget',
        template: ``
    }),
    __metadata$9("design:paramtypes", [JsonSchemaFormService])
], MaterialFileComponent);

var __decorate$a = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$a = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let MaterialInputComponent = class MaterialInputComponent {
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
};
MaterialInputComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
__decorate$a([
    Input(),
    __metadata$a("design:type", Object)
], MaterialInputComponent.prototype, "layoutNode", void 0);
__decorate$a([
    Input(),
    __metadata$a("design:type", Array)
], MaterialInputComponent.prototype, "layoutIndex", void 0);
__decorate$a([
    Input(),
    __metadata$a("design:type", Array)
], MaterialInputComponent.prototype, "dataIndex", void 0);
MaterialInputComponent = __decorate$a([
    Component({
        selector: 'material-input-widget',
        template: `
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
                 [innerHTML]="options?.errorMessage"></mat-error>`,
        styles: [`
      mat-error {
          font-size: 75%;
          margin-top: -1rem;
          margin-bottom: 0.5rem;
      }

      ::ng-deep mat-form-field .mat-form-field-wrapper .mat-form-field-flex
      .mat-form-field-infix {
          width: initial;
      }
  `]
    }),
    __metadata$a("design:paramtypes", [JsonSchemaFormService])
], MaterialInputComponent);

var __decorate$b = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$b = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let MaterialNumberComponent = class MaterialNumberComponent {
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
};
MaterialNumberComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
__decorate$b([
    Input(),
    __metadata$b("design:type", Object)
], MaterialNumberComponent.prototype, "layoutNode", void 0);
__decorate$b([
    Input(),
    __metadata$b("design:type", Array)
], MaterialNumberComponent.prototype, "layoutIndex", void 0);
__decorate$b([
    Input(),
    __metadata$b("design:type", Array)
], MaterialNumberComponent.prototype, "dataIndex", void 0);
MaterialNumberComponent = __decorate$b([
    Component({
        selector: 'material-number-widget',
        template: `
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
                 [innerHTML]="options?.errorMessage"></mat-error>`,
        styles: [`
      mat-error {
          font-size: 75%;
          margin-top: -1rem;
          margin-bottom: 0.5rem;
      }

      ::ng-deep mat-form-field .mat-form-field-wrapper .mat-form-field-flex
      .mat-form-field-infix {
          width: initial;
      }
  `]
    }),
    __metadata$b("design:paramtypes", [JsonSchemaFormService])
], MaterialNumberComponent);

var __decorate$c = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$c = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let MaterialOneOfComponent = class MaterialOneOfComponent {
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
};
MaterialOneOfComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
__decorate$c([
    Input(),
    __metadata$c("design:type", Object)
], MaterialOneOfComponent.prototype, "layoutNode", void 0);
__decorate$c([
    Input(),
    __metadata$c("design:type", Array)
], MaterialOneOfComponent.prototype, "layoutIndex", void 0);
__decorate$c([
    Input(),
    __metadata$c("design:type", Array)
], MaterialOneOfComponent.prototype, "dataIndex", void 0);
MaterialOneOfComponent = __decorate$c([
    Component({
        selector: 'material-one-of-widget',
        template: ``
    }),
    __metadata$c("design:paramtypes", [JsonSchemaFormService])
], MaterialOneOfComponent);

var __decorate$d = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$d = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let MaterialRadiosComponent = class MaterialRadiosComponent {
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
};
MaterialRadiosComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
__decorate$d([
    Input(),
    __metadata$d("design:type", Object)
], MaterialRadiosComponent.prototype, "layoutNode", void 0);
__decorate$d([
    Input(),
    __metadata$d("design:type", Array)
], MaterialRadiosComponent.prototype, "layoutIndex", void 0);
__decorate$d([
    Input(),
    __metadata$d("design:type", Array)
], MaterialRadiosComponent.prototype, "dataIndex", void 0);
MaterialRadiosComponent = __decorate$d([
    Component({
        selector: 'material-radios-widget',
        template: `
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
      </div>`,
        styles: [`
      mat-radio-group {
          display: inline-flex;
      }

      mat-radio-button {
          margin: 2px;
      }

      mat-error {
          font-size: 75%;
      }
  `]
    }),
    __metadata$d("design:paramtypes", [JsonSchemaFormService])
], MaterialRadiosComponent);

var __decorate$e = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$e = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let MaterialSelectComponent = class MaterialSelectComponent {
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
};
MaterialSelectComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
__decorate$e([
    Input(),
    __metadata$e("design:type", Object)
], MaterialSelectComponent.prototype, "layoutNode", void 0);
__decorate$e([
    Input(),
    __metadata$e("design:type", Array)
], MaterialSelectComponent.prototype, "layoutIndex", void 0);
__decorate$e([
    Input(),
    __metadata$e("design:type", Array)
], MaterialSelectComponent.prototype, "dataIndex", void 0);
MaterialSelectComponent = __decorate$e([
    Component({
        selector: 'material-select-widget',
        template: `
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
                 [innerHTML]="options?.errorMessage"></mat-error>`,
        styles: [`
      mat-error {
          font-size: 75%;
          margin-top: -1rem;
          margin-bottom: 0.5rem;
      }

      ::ng-deep mat-form-field .mat-form-field-wrapper .mat-form-field-flex
      .mat-form-field-infix {
          width: initial;
      }
  `]
    }),
    __metadata$e("design:paramtypes", [JsonSchemaFormService])
], MaterialSelectComponent);

var __decorate$f = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$f = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let MaterialSliderComponent = class MaterialSliderComponent {
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
};
MaterialSliderComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
__decorate$f([
    Input(),
    __metadata$f("design:type", Object)
], MaterialSliderComponent.prototype, "layoutNode", void 0);
__decorate$f([
    Input(),
    __metadata$f("design:type", Array)
], MaterialSliderComponent.prototype, "layoutIndex", void 0);
__decorate$f([
    Input(),
    __metadata$f("design:type", Array)
], MaterialSliderComponent.prototype, "dataIndex", void 0);
MaterialSliderComponent = __decorate$f([
    Component({
        selector: 'material-slider-widget',
        template: `
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
                 [innerHTML]="options?.errorMessage"></mat-error>`,
        styles: [` mat-error {
      font-size: 75%;
  } `]
    }),
    __metadata$f("design:paramtypes", [JsonSchemaFormService])
], MaterialSliderComponent);

var __decorate$g = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$g = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let MaterialStepperComponent = class MaterialStepperComponent {
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
};
MaterialStepperComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
__decorate$g([
    Input(),
    __metadata$g("design:type", Object)
], MaterialStepperComponent.prototype, "layoutNode", void 0);
__decorate$g([
    Input(),
    __metadata$g("design:type", Array)
], MaterialStepperComponent.prototype, "layoutIndex", void 0);
__decorate$g([
    Input(),
    __metadata$g("design:type", Array)
], MaterialStepperComponent.prototype, "dataIndex", void 0);
MaterialStepperComponent = __decorate$g([
    Component({
        selector: 'material-stepper-widget',
        template: ``
    }),
    __metadata$g("design:paramtypes", [JsonSchemaFormService])
], MaterialStepperComponent);

var __decorate$h = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$h = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let MaterialTabsComponent = class MaterialTabsComponent {
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
};
MaterialTabsComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
__decorate$h([
    Input(),
    __metadata$h("design:type", Object)
], MaterialTabsComponent.prototype, "layoutNode", void 0);
__decorate$h([
    Input(),
    __metadata$h("design:type", Array)
], MaterialTabsComponent.prototype, "layoutIndex", void 0);
__decorate$h([
    Input(),
    __metadata$h("design:type", Array)
], MaterialTabsComponent.prototype, "dataIndex", void 0);
MaterialTabsComponent = __decorate$h([
    Component({
        selector: 'material-tabs-widget',
        template: `
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
      </div>`,
        styles: [` a {
      cursor: pointer;
  } `]
    }),
    __metadata$h("design:paramtypes", [JsonSchemaFormService])
], MaterialTabsComponent);

var __decorate$i = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$i = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let MaterialTextareaComponent = class MaterialTextareaComponent {
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
};
MaterialTextareaComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
__decorate$i([
    Input(),
    __metadata$i("design:type", Object)
], MaterialTextareaComponent.prototype, "layoutNode", void 0);
__decorate$i([
    Input(),
    __metadata$i("design:type", Array)
], MaterialTextareaComponent.prototype, "layoutIndex", void 0);
__decorate$i([
    Input(),
    __metadata$i("design:type", Array)
], MaterialTextareaComponent.prototype, "dataIndex", void 0);
MaterialTextareaComponent = __decorate$i([
    Component({
        selector: 'material-textarea-widget',
        template: `
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
                 [innerHTML]="options?.errorMessage"></mat-error>`,
        styles: [`
      mat-error {
          font-size: 75%;
          margin-top: -1rem;
          margin-bottom: 0.5rem;
      }

      ::ng-deep mat-form-field .mat-form-field-wrapper .mat-form-field-flex
      .mat-form-field-infix {
          width: initial;
      }
  `]
    }),
    __metadata$i("design:paramtypes", [JsonSchemaFormService])
], MaterialTextareaComponent);

var __decorate$j = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$j = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let MaterialDesignFrameworkComponent = class MaterialDesignFrameworkComponent {
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
            this.options = cloneDeep(this.layoutNode.options || {});
            this.widgetLayoutNode = Object.assign(Object.assign({}, this.layoutNode), { options: cloneDeep(this.layoutNode.options || {}) });
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
};
MaterialDesignFrameworkComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: JsonSchemaFormService }
];
__decorate$j([
    Input(),
    __metadata$j("design:type", Object)
], MaterialDesignFrameworkComponent.prototype, "layoutNode", void 0);
__decorate$j([
    Input(),
    __metadata$j("design:type", Array)
], MaterialDesignFrameworkComponent.prototype, "layoutIndex", void 0);
__decorate$j([
    Input(),
    __metadata$j("design:type", Array)
], MaterialDesignFrameworkComponent.prototype, "dataIndex", void 0);
MaterialDesignFrameworkComponent = __decorate$j([
    Component({
        selector: 'material-design-framework',
        template: `
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
      <div class="spacer" *ngIf="widgetLayoutNode?.arrayItem && widgetLayoutNode?.type !== '$ref'"></div>`,
        styles: [`
      .array-item {
          border-radius: 2px;
          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2),
          0 2px 2px 0 rgba(0, 0, 0, .14),
          0 1px 5px 0 rgba(0, 0, 0, .12);
          padding: 6px;
          position: relative;
          transition: all 280ms cubic-bezier(.4, 0, .2, 1);
      }

      .close-button {
          cursor: pointer;
          position: absolute;
          top: 6px;
          right: 6px;
          fill: rgba(0, 0, 0, .4);
          visibility: hidden;
          z-index: 500;
      }

      .close-button:hover {
          fill: rgba(0, 0, 0, .8);
      }

      .array-item:hover > .close-button {
          visibility: visible;
      }

      .spacer {
          margin: 6px 0;
      }

      [draggable=true]:hover {
          box-shadow: 0 5px 5px -3px rgba(0, 0, 0, .2),
          0 8px 10px 1px rgba(0, 0, 0, .14),
          0 3px 14px 2px rgba(0, 0, 0, .12);
          cursor: move;
          z-index: 10;
      }

      [draggable=true].drag-target-top {
          box-shadow: 0 -2px 0 #000;
          position: relative;
          z-index: 20;
      }

      [draggable=true].drag-target-bottom {
          box-shadow: 0 2px 0 #000;
          position: relative;
          z-index: 20;
      }
  `]
    }),
    __metadata$j("design:paramtypes", [ChangeDetectorRef,
        JsonSchemaFormService])
], MaterialDesignFrameworkComponent);

var __decorate$k = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let MaterialDesignFramework = class MaterialDesignFramework extends Framework {
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
};
MaterialDesignFramework = __decorate$k([
    Injectable()
], MaterialDesignFramework);

var __decorate$l = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MaterialDesignFrameworkModule_1;
let MaterialDesignFrameworkModule = MaterialDesignFrameworkModule_1 = class MaterialDesignFrameworkModule {
    static forRoot() {
        return {
            ngModule: MaterialDesignFrameworkModule_1,
            providers: [
                {
                    provide: Framework,
                    useClass: MaterialDesignFramework,
                    multi: true,
                },
            ],
        };
    }
};
MaterialDesignFrameworkModule = MaterialDesignFrameworkModule_1 = __decorate$l([
    NgModule({
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
    })
], MaterialDesignFrameworkModule);

export { FlexLayoutRootComponent, FlexLayoutSectionComponent, MaterialAddReferenceComponent, MaterialButtonComponent, MaterialButtonGroupComponent, MaterialCheckboxComponent, MaterialCheckboxesComponent, MaterialChipListComponent, MaterialDatepickerComponent, MaterialDesignFramework, MaterialDesignFrameworkComponent, MaterialDesignFrameworkModule, MaterialFileComponent, MaterialInputComponent, MaterialNumberComponent, MaterialOneOfComponent, MaterialRadiosComponent, MaterialSelectComponent, MaterialSliderComponent, MaterialStepperComponent, MaterialTabsComponent, MaterialTextareaComponent };
//# sourceMappingURL=ngsf-material-design-framework.js.map
