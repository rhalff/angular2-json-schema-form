import { ChangeDetectorRef, Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { addClasses, inArray } from '@ngsf/common';
import { JsonSchemaFormService } from '@ngsf/widget-library';
import * as i0 from "@angular/core";
import * as i1 from "@ngsf/widget-library";
import * as i2 from "@angular/common";
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
export { Bootstrap5FrameworkComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwNS1mcmFtZXdvcmsuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmdzZi1ib290c3RyYXA1LWZyYW1ld29yay9zcmMvbGliL2Jvb3RzdHJhcDUtZnJhbWV3b3JrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBb0IsTUFBTSxlQUFlLENBQUE7QUFDcEYsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUE7QUFDM0IsT0FBTyxFQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFDaEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7Ozs7QUFNMUQsTUE4RmEsNEJBQTRCO0lBZTlCO0lBQ0E7SUFmVCxvQkFBb0IsR0FBRyxLQUFLLENBQUE7SUFDNUIsYUFBYSxDQUFLO0lBQ2xCLGdCQUFnQixDQUFLO0lBQ3JCLE9BQU8sQ0FBSztJQUNaLFdBQVcsR0FBUSxJQUFJLENBQUE7SUFDdkIsV0FBVyxHQUFRLEVBQUUsQ0FBQTtJQUNyQixLQUFLLEdBQVEsRUFBRSxDQUFBO0lBQ2YsV0FBVyxHQUFRLElBQUksQ0FBQTtJQUN2QixXQUFXLEdBQUcsS0FBSyxDQUFBO0lBQ1YsVUFBVSxDQUFLO0lBQ2YsV0FBVyxDQUFVO0lBQ3JCLFNBQVMsQ0FBVTtJQUU1QixZQUNTLGNBQWlDLEVBQ2pDLEdBQTBCO1FBRDFCLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUNqQyxRQUFHLEdBQUgsR0FBRyxDQUF1QjtJQUVuQyxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLGFBQWE7WUFDMUQsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssSUFBSSxJQUFJ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Y3RvclJlZiwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCB7YWRkQ2xhc3NlcywgaW5BcnJheX0gZnJvbSAnQG5nc2YvY29tbW9uJ1xuaW1wb3J0IHtKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJ0BuZ3NmL3dpZGdldC1saWJyYXJ5J1xuXG4vKipcbiAqIEJvb3RzdHJhcCA1IGZyYW1ld29yayBmb3IgQW5ndWxhciBKU09OIFNjaGVtYSBGb3JtLlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYm9vdHN0cmFwLTUtZnJhbWV3b3JrJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBbY2xhc3NdPVwib3B0aW9ucz8uaHRtbENsYXNzIHx8ICcnXCJcbiAgICAgIFtjbGFzcy5oYXMtZmVlZGJhY2tdPSdoYXNGZWVkYmFjaydcbiAgICAgIFtjbGFzcy5oYXMtZXJyb3JdPSdoYXNFcnJvcidcbiAgICAgIFtjbGFzcy5oYXMtc3VjY2Vzc109J2hhc1N1Y2Nlc3MnPlxuXG4gICAgICA8YnV0dG9uICpuZ0lmPSdzaG93UmVtb3ZlQnV0dG9uJ1xuICAgICAgICAgICAgICBjbGFzcz0nY2xvc2UgcHVsbC1yaWdodCdcbiAgICAgICAgICAgICAgdHlwZT0nYnV0dG9uJ1xuICAgICAgICAgICAgICAoY2xpY2spPSdyZW1vdmVJdGVtKCknPlxuICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj0ndHJ1ZSc+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9J3NyLW9ubHknPkNsb3NlPC9zcGFuPlxuICAgICAgPC9idXR0b24+XG5cbiAgICAgIDxkaXYgKm5nSWY9XCJvcHRpb25zPy5tZXNzYWdlTG9jYXRpb24gPT09ICd0b3AnXCI+XG4gICAgICAgIDxwICpuZ0lmPSdvcHRpb25zPy5oZWxwQmxvY2snXG4gICAgICAgICAgIGNsYXNzPSdoZWxwLWJsb2NrJ1xuICAgICAgICAgICBbaW5uZXJIVE1MXT0nb3B0aW9ucz8uaGVscEJsb2NrJz48L3A+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxsYWJlbCAqbmdJZj1cIm9wdGlvbnM/LnRpdGxlICYmIGxheW91dE5vZGU/LnR5cGUgIT09ICd0YWInXCJcbiAgICAgICAgICAgICBbYXR0ci5mb3JdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkXCJcbiAgICAgICAgICAgICBbY2xhc3NdPVwiKG9wdGlvbnM/LmxhYmVsSHRtbENsYXNzIHx8ICcnKSArICcgZm9ybS1sYWJlbCdcIlxuICAgICAgICAgICAgIFtjbGFzcy5zci1vbmx5XT0nb3B0aW9ucz8ubm90aXRsZSdcbiAgICAgICAgICAgICBbaW5uZXJIVE1MXT0nb3B0aW9ucz8udGl0bGUnPjwvbGFiZWw+XG4gICAgICA8cCAqbmdJZj1cImxheW91dE5vZGU/LnR5cGUgPT09ICdzdWJtaXQnICYmIGpzZj8uZm9ybU9wdGlvbnM/LmZpZWxkc1JlcXVpcmVkXCI+XG4gICAgICAgIDxzdHJvbmcgY2xhc3M9J3RleHQtZGFuZ2VyJz4qPC9zdHJvbmc+ID0gcmVxdWlyZWQgZmllbGRzXG4gICAgICA8L3A+XG4gICAgICA8ZGl2IFtjbGFzcy5pbnB1dC1ncm91cF09J29wdGlvbnM/LmZpZWxkQWRkb25MZWZ0IHx8IG9wdGlvbnM/LmZpZWxkQWRkb25SaWdodCc+XG4gICAgICAgIDxzcGFuICpuZ0lmPSdvcHRpb25zPy5maWVsZEFkZG9uTGVmdCdcbiAgICAgICAgICAgICAgY2xhc3M9J2lucHV0LWdyb3VwLWFkZG9uJ1xuICAgICAgICAgICAgICBbaW5uZXJIVE1MXT0nb3B0aW9ucz8uZmllbGRBZGRvbkxlZnQnPjwvc3Bhbj5cblxuICAgICAgICA8c2VsZWN0LXdpZGdldC13aWRnZXRcbiAgICAgICAgICBbbGF5b3V0Tm9kZV09J3dpZGdldExheW91dE5vZGUnXG4gICAgICAgICAgW2RhdGFJbmRleF09J2RhdGFJbmRleCdcbiAgICAgICAgICBbbGF5b3V0SW5kZXhdPSdsYXlvdXRJbmRleCc+PC9zZWxlY3Qtd2lkZ2V0LXdpZGdldD5cblxuICAgICAgICA8c3BhbiAqbmdJZj0nb3B0aW9ucz8uZmllbGRBZGRvblJpZ2h0J1xuICAgICAgICAgICAgICBjbGFzcz0naW5wdXQtZ3JvdXAtYWRkb24nXG4gICAgICAgICAgICAgIFtpbm5lckhUTUxdPSdvcHRpb25zPy5maWVsZEFkZG9uUmlnaHQnPjwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8c3BhbiAqbmdJZj0nb3B0aW9ucz8uZmVlZGJhY2sgJiYgb3B0aW9ucz8uaXNJbnB1dFdpZGdldCAmJlxuICAgICAgICAgICFvcHRpb25zPy5maWVsZEFkZG9uUmlnaHQgJiYgIWxheW91dE5vZGUuYXJyYXlJdGVtICYmXG4gICAgICAgICAgKGZvcm1Db250cm9sPy5kaXJ0eSB8fCBvcHRpb25zPy5mZWVkYmFja09uUmVuZGVyKSdcbiAgICAgICAgICAgIFtjbGFzcy5nbHlwaGljb24tb2tdPSdvcHRpb25zPy5lbmFibGVTdWNjZXNzU3RhdGUgJiYgIWZvcm1Db250cm9sPy5lcnJvcnMnXG4gICAgICAgICAgICBbY2xhc3MuZ2x5cGhpY29uLXJlbW92ZV09J29wdGlvbnM/LmVuYWJsZUVycm9yU3RhdGUgJiYgZm9ybUNvbnRyb2w/LmVycm9ycydcbiAgICAgICAgICAgIGFyaWEtaGlkZGVuPSd0cnVlJ1xuICAgICAgICAgICAgY2xhc3M9J2Zvcm0tY29udHJvbC1mZWVkYmFjayBnbHlwaGljb24nPjwvc3Bhbj5cbiAgICAgIDxkaXYgKm5nSWY9XCJvcHRpb25zPy5tZXNzYWdlTG9jYXRpb24gIT09ICd0b3AnXCI+XG4gICAgICAgIDxwICpuZ0lmPSdvcHRpb25zPy5oZWxwQmxvY2snXG4gICAgICAgICAgIGNsYXNzPSdoZWxwLWJsb2NrJ1xuICAgICAgICAgICBbaW5uZXJIVE1MXT0nb3B0aW9ucz8uaGVscEJsb2NrJz48L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgKm5nSWY9J2RlYnVnICYmIGRlYnVnT3V0cHV0Jz5kZWJ1ZzpcbiAgICAgIDxwcmU+e3sgZGVidWdPdXRwdXQgfX08L3ByZT5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbYFxuICAgIDpob3N0IC9kZWVwLyAubGlzdC1ncm91cC1pdGVtIC5mb3JtLWNvbnRyb2wtZmVlZGJhY2sge1xuICAgICAgdG9wOiA0MHB4O1xuICAgIH1cblxuICAgIDpob3N0IC9kZWVwLyAuY2hlY2tib3gsXG4gICAgOmhvc3QgL2RlZXAvIC5yYWRpbyB7XG4gICAgICBtYXJnaW4tdG9wOiAwO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICB9XG5cbiAgICA6aG9zdCAvZGVlcC8gLmNoZWNrYm94LWlubGluZSxcbiAgICA6aG9zdCAvZGVlcC8gLmNoZWNrYm94LWlubGluZSArIC5jaGVja2JveC1pbmxpbmUsXG4gICAgOmhvc3QgL2RlZXAvIC5jaGVja2JveC1pbmxpbmUgKyAucmFkaW8taW5saW5lLFxuICAgIDpob3N0IC9kZWVwLyAucmFkaW8taW5saW5lLFxuICAgIDpob3N0IC9kZWVwLyAucmFkaW8taW5saW5lICsgLnJhZGlvLWlubGluZSxcbiAgICA6aG9zdCAvZGVlcC8gLnJhZGlvLWlubGluZSArIC5jaGVja2JveC1pbmxpbmUge1xuICAgICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gICAgfVxuXG4gICAgOmhvc3QgL2RlZXAvIC5jaGVja2JveC1pbmxpbmU6bGFzdC1jaGlsZCxcbiAgICA6aG9zdCAvZGVlcC8gLnJhZGlvLWlubGluZTpsYXN0LWNoaWxkIHtcbiAgICAgIG1hcmdpbi1yaWdodDogMDtcbiAgICB9XG5cbiAgICA6aG9zdCAvZGVlcC8gLm5nLWludmFsaWQubmctdG91Y2hlZCB7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZjQ0MzM2O1xuICAgIH1cbiAgYF0sXG59KVxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDVGcmFtZXdvcmtDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIGZyYW1ld29ya0luaXRpYWxpemVkID0gZmFsc2VcbiAgd2lkZ2V0T3B0aW9uczogYW55IC8vIE9wdGlvbnMgcGFzc2VkIHRvIGNoaWxkIHdpZGdldFxuICB3aWRnZXRMYXlvdXROb2RlOiBhbnkgLy8gbGF5b3V0Tm9kZSBwYXNzZWQgdG8gY2hpbGQgd2lkZ2V0XG4gIG9wdGlvbnM6IGFueSAvLyBPcHRpb25zIHVzZWQgaW4gdGhpcyBmcmFtZXdvcmtcbiAgZm9ybUNvbnRyb2w6IGFueSA9IG51bGxcbiAgZGVidWdPdXRwdXQ6IGFueSA9ICcnXG4gIGRlYnVnOiBhbnkgPSAnJ1xuICBwYXJlbnRBcnJheTogYW55ID0gbnVsbFxuICBpc09yZGVyYWJsZSA9IGZhbHNlXG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHVibGljIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlLFxuICApIHtcbiAgfVxuXG4gIGdldCBoYXNGZWVkYmFjaygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zPy5mZWVkYmFjayAmJiB0aGlzLm9wdGlvbnM/LmlzSW5wdXRXaWRnZXQgJiZcbiAgICAgICh0aGlzLmZvcm1Db250cm9sPy5kaXJ0eSB8fCB0aGlzLm9wdGlvbnM/LmZlZWRiYWNrT25SZW5kZXIpXG4gIH1cblxuICBnZXQgaGFzRXJyb3IoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucz8uZW5hYmxlRXJyb3JTdGF0ZSAmJiB0aGlzLmZvcm1Db250cm9sPy5lcnJvcnMgJiZcbiAgICAgICh0aGlzLmZvcm1Db250cm9sPy5kaXJ0eSB8fCB0aGlzLm9wdGlvbnM/LmZlZWRiYWNrT25SZW5kZXIpXG4gIH1cblxuICBnZXQgaGFzU3VjY2VzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zPy5lbmFibGVTdWNjZXNzU3RhdGUgJiYgIXRoaXMuZm9ybUNvbnRyb2w/LmVycm9ycyAmJlxuICAgICAgKHRoaXMuZm9ybUNvbnRyb2w/LmRpcnR5IHx8IHRoaXMub3B0aW9ucz8uZmVlZGJhY2tPblJlbmRlcilcbiAgfVxuXG5cbiAgZ2V0IHNob3dSZW1vdmVCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMucmVtb3ZhYmxlIHx8IHRoaXMub3B0aW9ucy5yZWFkb25seSB8fFxuICAgICAgdGhpcy5sYXlvdXROb2RlLnR5cGUgPT09ICckcmVmJ1xuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGlmICh0aGlzLmxheW91dE5vZGUucmVjdXJzaXZlUmVmZXJlbmNlKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICBpZiAoIXRoaXMubGF5b3V0Tm9kZS5hcnJheUl0ZW0gfHwgIXRoaXMucGFyZW50QXJyYXkpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICAvLyBJZiBhcnJheSBsZW5ndGggPD0gbWluSXRlbXMsIGRvbid0IGFsbG93IHJlbW92aW5nIGFueSBpdGVtc1xuICAgIHJldHVybiB0aGlzLnBhcmVudEFycmF5Lml0ZW1zLmxlbmd0aCAtIDEgPD0gdGhpcy5wYXJlbnRBcnJheS5vcHRpb25zLm1pbkl0ZW1zID8gZmFsc2UgOlxuICAgICAgLy8gRm9yIHJlbW92YWJsZSBsaXN0IGl0ZW1zLCBhbGxvdyByZW1vdmluZyBhbnkgaXRlbVxuICAgICAgdGhpcy5sYXlvdXROb2RlLmFycmF5SXRlbVR5cGUgPT09ICdsaXN0JyA/IHRydWUgOlxuICAgICAgICAvLyBGb3IgcmVtb3ZhYmxlIHR1cGxlIGl0ZW1zLCBvbmx5IGFsbG93IHJlbW92aW5nIGxhc3QgaXRlbSBpbiBsaXN0XG4gICAgICAgIHRoaXMubGF5b3V0SW5kZXhbdGhpcy5sYXlvdXRJbmRleC5sZW5ndGggLSAxXSA9PT0gdGhpcy5wYXJlbnRBcnJheS5pdGVtcy5sZW5ndGggLSAyXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVGcmFtZXdvcmsoKVxuICAgIGlmICh0aGlzLmxheW91dE5vZGUuYXJyYXlJdGVtICYmIHRoaXMubGF5b3V0Tm9kZS50eXBlICE9PSAnJHJlZicpIHtcbiAgICAgIHRoaXMucGFyZW50QXJyYXkgPSB0aGlzLmpzZi5nZXRQYXJlbnROb2RlKHRoaXMpXG4gICAgICBpZiAodGhpcy5wYXJlbnRBcnJheSkge1xuICAgICAgICB0aGlzLmlzT3JkZXJhYmxlID0gdGhpcy5sYXlvdXROb2RlLmFycmF5SXRlbVR5cGUgPT09ICdsaXN0JyAmJlxuICAgICAgICAgICF0aGlzLm9wdGlvbnMucmVhZG9ubHkgJiYgdGhpcy5wYXJlbnRBcnJheS5vcHRpb25zLm9yZGVyYWJsZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICghdGhpcy5mcmFtZXdvcmtJbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5pbml0aWFsaXplRnJhbWV3b3JrKClcbiAgICB9XG4gIH1cblxuICBpbml0aWFsaXplRnJhbWV3b3JrKCkge1xuICAgIGlmICh0aGlzLmxheW91dE5vZGUpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IF8uY2xvbmVEZWVwKHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zKVxuICAgICAgdGhpcy53aWRnZXRMYXlvdXROb2RlID0ge1xuICAgICAgICAuLi50aGlzLmxheW91dE5vZGUsXG4gICAgICAgIG9wdGlvbnM6IF8uY2xvbmVEZWVwKHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zKSxcbiAgICAgIH1cbiAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucyA9IHRoaXMud2lkZ2V0TGF5b3V0Tm9kZS5vcHRpb25zXG4gICAgICB0aGlzLmZvcm1Db250cm9sID0gdGhpcy5qc2YuZ2V0Rm9ybUNvbnRyb2wodGhpcylcblxuICAgICAgdGhpcy5vcHRpb25zLmlzSW5wdXRXaWRnZXQgPSBpbkFycmF5KHRoaXMubGF5b3V0Tm9kZS50eXBlLCBbXG4gICAgICAgICdidXR0b24nLCAnY2hlY2tib3gnLCAnY2hlY2tib3hlcy1pbmxpbmUnLCAnY2hlY2tib3hlcycsICdjb2xvcicsXG4gICAgICAgICdkYXRlJywgJ2RhdGV0aW1lLWxvY2FsJywgJ2RhdGV0aW1lJywgJ2VtYWlsJywgJ2ZpbGUnLCAnaGlkZGVuJyxcbiAgICAgICAgJ2ltYWdlJywgJ2ludGVnZXInLCAnbW9udGgnLCAnbnVtYmVyJywgJ3Bhc3N3b3JkJywgJ3JhZGlvJyxcbiAgICAgICAgJ3JhZGlvYnV0dG9ucycsICdyYWRpb3MtaW5saW5lJywgJ3JhZGlvcycsICdyYW5nZScsICdyZXNldCcsICdzZWFyY2gnLFxuICAgICAgICAnc2VsZWN0JywgJ3N1Ym1pdCcsICd0ZWwnLCAndGV4dCcsICd0ZXh0YXJlYScsICd0aW1lJywgJ3VybCcsICd3ZWVrJyxcbiAgICAgIF0pXG5cbiAgICAgIHRoaXMub3B0aW9ucy50aXRsZSA9IHRoaXMuc2V0VGl0bGUoKVxuXG4gICAgICB0aGlzLm9wdGlvbnMuaHRtbENsYXNzID1cbiAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLm9wdGlvbnMuaHRtbENsYXNzLCAnc2NoZW1hLWZvcm0tJyArIHRoaXMubGF5b3V0Tm9kZS50eXBlKVxuICAgICAgdGhpcy5vcHRpb25zLmh0bWxDbGFzcyA9XG4gICAgICAgIHRoaXMubGF5b3V0Tm9kZS50eXBlID09PSAnYXJyYXknID9cbiAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMub3B0aW9ucy5odG1sQ2xhc3MsICdsaXN0LWdyb3VwJykgOlxuICAgICAgICAgIHRoaXMubGF5b3V0Tm9kZS5hcnJheUl0ZW0gJiYgdGhpcy5sYXlvdXROb2RlLnR5cGUgIT09ICckcmVmJyA/XG4gICAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMub3B0aW9ucy5odG1sQ2xhc3MsICdsaXN0LWdyb3VwLWl0ZW0nKSA6XG4gICAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMub3B0aW9ucy5odG1sQ2xhc3MsICdmb3JtLWdyb3VwJylcbiAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MgPSAnJ1xuICAgICAgdGhpcy5vcHRpb25zLmxhYmVsSHRtbENsYXNzID1cbiAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLm9wdGlvbnMubGFiZWxIdG1sQ2xhc3MsICdjb250cm9sLWxhYmVsJylcbiAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5hY3RpdmVDbGFzcyA9XG4gICAgICAgIGFkZENsYXNzZXModGhpcy53aWRnZXRPcHRpb25zLmFjdGl2ZUNsYXNzLCAnYWN0aXZlJylcbiAgICAgIHRoaXMub3B0aW9ucy5maWVsZEFkZG9uTGVmdCA9XG4gICAgICAgIHRoaXMub3B0aW9ucy5maWVsZEFkZG9uTGVmdCB8fCB0aGlzLm9wdGlvbnMucHJlcGVuZFxuICAgICAgdGhpcy5vcHRpb25zLmZpZWxkQWRkb25SaWdodCA9XG4gICAgICAgIHRoaXMub3B0aW9ucy5maWVsZEFkZG9uUmlnaHQgfHwgdGhpcy5vcHRpb25zLmFwcGVuZFxuXG4gICAgICAvLyBBZGQgYXN0ZXJpc2sgdG8gdGl0bGVzIGlmIHJlcXVpcmVkXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnRpdGxlICYmIHRoaXMubGF5b3V0Tm9kZS50eXBlICE9PSAndGFiJyAmJlxuICAgICAgICAhdGhpcy5vcHRpb25zLm5vdGl0bGUgJiYgdGhpcy5vcHRpb25zLnJlcXVpcmVkICYmXG4gICAgICAgICF0aGlzLm9wdGlvbnMudGl0bGUuaW5jbHVkZXMoJyonKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy50aXRsZSArPSAnIDxzdHJvbmcgY2xhc3M9XCJ0ZXh0LWRhbmdlclwiPio8L3N0cm9uZz4nXG4gICAgICB9XG4gICAgICAvLyBTZXQgbWlzY2VsYW5lb3VzIHN0eWxlcyBhbmQgc2V0dGluZ3MgZm9yIGVhY2ggY29udHJvbCB0eXBlXG4gICAgICBzd2l0Y2ggKHRoaXMubGF5b3V0Tm9kZS50eXBlKSB7XG4gICAgICAgIC8vIENoZWNrYm94IGNvbnRyb2xzXG4gICAgICAgIGNhc2UgJ2NoZWNrYm94JzpcbiAgICAgICAgY2FzZSAnY2hlY2tib3hlcyc6XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzLCAnY2hlY2tib3gnKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ2NoZWNrYm94ZXMtaW5saW5lJzpcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MsICdjaGVja2JveCcpXG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLml0ZW1MYWJlbEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaXRlbUxhYmVsSHRtbENsYXNzLCAnY2hlY2tib3gtaW5saW5lJylcbiAgICAgICAgICBicmVha1xuICAgICAgICAvLyBSYWRpbyBjb250cm9sc1xuICAgICAgICBjYXNlICdyYWRpbyc6XG4gICAgICAgIGNhc2UgJ3JhZGlvcyc6XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzLCAncmFkaW8nKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ3JhZGlvcy1pbmxpbmUnOlxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcywgJ3JhZGlvJylcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaXRlbUxhYmVsSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5pdGVtTGFiZWxIdG1sQ2xhc3MsICdyYWRpby1pbmxpbmUnKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIC8vIEJ1dHRvbiBzZXRzIC0gY2hlY2tib3hidXR0b25zIGFuZCByYWRpb2J1dHRvbnNcbiAgICAgICAgY2FzZSAnY2hlY2tib3hidXR0b25zJzpcbiAgICAgICAgY2FzZSAncmFkaW9idXR0b25zJzpcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MsICdidG4tZ3JvdXAnKVxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5pdGVtTGFiZWxIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLml0ZW1MYWJlbEh0bWxDbGFzcywgJ2J0bicpXG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLml0ZW1MYWJlbEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaXRlbUxhYmVsSHRtbENsYXNzLCB0aGlzLm9wdGlvbnMuc3R5bGUgfHwgJ2J0bi1kZWZhdWx0JylcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzLCAnc3Itb25seScpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgLy8gU2luZ2xlIGJ1dHRvbiBjb250cm9sc1xuICAgICAgICBjYXNlICdidXR0b24nOlxuICAgICAgICBjYXNlICdzdWJtaXQnOlxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MsICdidG4nKVxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MsIHRoaXMub3B0aW9ucy5zdHlsZSB8fCAnYnRuLWluZm8nKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIC8vIENvbnRhaW5lcnMgLSBhcnJheXMgYW5kIGZpZWxkc2V0c1xuICAgICAgICBjYXNlICdhcnJheSc6XG4gICAgICAgIGNhc2UgJ2ZpZWxkc2V0JzpcbiAgICAgICAgY2FzZSAnc2VjdGlvbic6XG4gICAgICAgIGNhc2UgJ2NvbmRpdGlvbmFsJzpcbiAgICAgICAgY2FzZSAnYWR2YW5jZWRmaWVsZHNldCc6XG4gICAgICAgIGNhc2UgJ2F1dGhmaWVsZHNldCc6XG4gICAgICAgIGNhc2UgJ3NlbGVjdGZpZWxkc2V0JzpcbiAgICAgICAgY2FzZSAnb3B0aW9uZmllbGRzZXQnOlxuICAgICAgICAgIHRoaXMub3B0aW9ucy5tZXNzYWdlTG9jYXRpb24gPSAndG9wJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ3RhYmFycmF5JzpcbiAgICAgICAgY2FzZSAndGFicyc6XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzLCAndGFiLWNvbnRlbnQnKVxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MsICd0YWItcGFuZScpXG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmxhYmVsSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5sYWJlbEh0bWxDbGFzcywgJ25hdiBuYXYtdGFicycpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgLy8gJ0FkZCcgYnV0dG9ucyAtIHJlZmVyZW5jZXNcbiAgICAgICAgY2FzZSAnJHJlZic6XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcywgJ2J0biBwdWxsLXJpZ2h0JylcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzLCB0aGlzLm9wdGlvbnMuc3R5bGUgfHwgJ2J0bi1kZWZhdWx0JylcbiAgICAgICAgICB0aGlzLm9wdGlvbnMuaWNvbiA9ICdnbHlwaGljb24gZ2x5cGhpY29uLXBsdXMnXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgLy8gRGVmYXVsdCAtIGluY2x1ZGluZyByZWd1bGFyIGlucHV0c1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MsICdmb3JtLWNvbnRyb2wnKVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5mb3JtQ29udHJvbCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUhlbHBCbG9jayh0aGlzLmZvcm1Db250cm9sLnN0YXR1cylcbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zdGF0dXNDaGFuZ2VzLnN1YnNjcmliZShzdGF0dXMgPT4gdGhpcy51cGRhdGVIZWxwQmxvY2soc3RhdHVzKSlcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnKSB7XG4gICAgICAgICAgY29uc3QgdmFyczogYW55W10gPSBbXVxuICAgICAgICAgIHRoaXMuZGVidWdPdXRwdXQgPSBfLm1hcCh2YXJzLCB0aGlzVmFyID0+IEpTT04uc3RyaW5naWZ5KHRoaXNWYXIsIG51bGwsIDIpKS5qb2luKCdcXG4nKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmZyYW1ld29ya0luaXRpYWxpemVkID0gdHJ1ZVxuICAgIH1cblxuICB9XG5cbiAgdXBkYXRlSGVscEJsb2NrKHN0YXR1cykge1xuICAgIHRoaXMub3B0aW9ucy5oZWxwQmxvY2sgPSBzdGF0dXMgPT09ICdJTlZBTElEJyAmJlxuICAgIHRoaXMub3B0aW9ucy5lbmFibGVFcnJvclN0YXRlICYmIHRoaXMuZm9ybUNvbnRyb2wuZXJyb3JzICYmXG4gICAgKHRoaXMuZm9ybUNvbnRyb2wuZGlydHkgfHwgdGhpcy5vcHRpb25zLmZlZWRiYWNrT25SZW5kZXIpID9cbiAgICAgIHRoaXMuanNmLmZvcm1hdEVycm9ycyh0aGlzLmZvcm1Db250cm9sLmVycm9ycywgdGhpcy5vcHRpb25zLnZhbGlkYXRpb25NZXNzYWdlcykgOlxuICAgICAgdGhpcy5vcHRpb25zLmRlc2NyaXB0aW9uIHx8IHRoaXMub3B0aW9ucy5oZWxwIHx8IG51bGxcbiAgfVxuXG4gIHNldFRpdGxlKCk6IHN0cmluZyB7XG4gICAgc3dpdGNoICh0aGlzLmxheW91dE5vZGUudHlwZSkge1xuICAgICAgY2FzZSAnYnV0dG9uJzpcbiAgICAgIGNhc2UgJ2NoZWNrYm94JzpcbiAgICAgIGNhc2UgJ3NlY3Rpb24nOlxuICAgICAgY2FzZSAnaGVscCc6XG4gICAgICBjYXNlICdtc2cnOlxuICAgICAgY2FzZSAnc3VibWl0JzpcbiAgICAgIGNhc2UgJ21lc3NhZ2UnOlxuICAgICAgY2FzZSAndGFiYXJyYXknOlxuICAgICAgY2FzZSAndGFicyc6XG4gICAgICBjYXNlICckcmVmJzpcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIGNhc2UgJ2FkdmFuY2VkZmllbGRzZXQnOlxuICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZXhwYW5kYWJsZSA9IHRydWVcbiAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLnRpdGxlID0gJ0FkdmFuY2VkIG9wdGlvbnMnXG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICBjYXNlICdhdXRoZmllbGRzZXQnOlxuICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZXhwYW5kYWJsZSA9IHRydWVcbiAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLnRpdGxlID0gJ0F1dGhlbnRpY2F0aW9uIHNldHRpbmdzJ1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgY2FzZSAnZmllbGRzZXQnOlxuICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMudGl0bGUgPSB0aGlzLm9wdGlvbnMudGl0bGVcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy50aXRsZSA9IG51bGxcbiAgICAgICAgcmV0dXJuIHRoaXMuanNmLnNldEl0ZW1UaXRsZSh0aGlzKVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUl0ZW0oKSB7XG4gICAgdGhpcy5qc2YucmVtb3ZlSXRlbSh0aGlzKVxuICB9XG59XG4iXX0=