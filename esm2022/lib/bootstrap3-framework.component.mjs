import { ChangeDetectorRef, Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { addClasses, inArray } from '@ngsf/common';
import { JsonSchemaFormService } from '@ngsf/widget-library';
import * as i0 from "@angular/core";
import * as i1 from "@ngsf/widget-library";
import * as i2 from "@angular/common";
class Bootstrap3FrameworkComponent {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap3FrameworkComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.JsonSchemaFormService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: Bootstrap3FrameworkComponent, selector: "bootstrap3-framework", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, usesOnChanges: true, ngImport: i0, template: `
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
  `, isInline: true, styles: [":host /deep/ .list-group-item .form-control-feedback{top:40}:host /deep/ .checkbox,:host /deep/ .radio{margin-top:0;margin-bottom:0}:host /deep/ .checkbox-inline,:host /deep/ .checkbox-inline + .checkbox-inline,:host /deep/ .checkbox-inline + .radio-inline,:host /deep/ .radio-inline,:host /deep/ .radio-inline + .radio-inline,:host /deep/ .radio-inline + .checkbox-inline{margin-left:0;margin-right:10px}:host /deep/ .checkbox-inline:last-child,:host /deep/ .radio-inline:last-child{margin-right:0}:host /deep/ .ng-invalid.ng-touched{border:1px solid #f44336}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.SelectWidgetComponent, selector: "select-widget-widget", inputs: ["layoutNode", "layoutIndex", "dataIndex"] }] });
}
export { Bootstrap3FrameworkComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap3FrameworkComponent, decorators: [{
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
  `, styles: [":host /deep/ .list-group-item .form-control-feedback{top:40}:host /deep/ .checkbox,:host /deep/ .radio{margin-top:0;margin-bottom:0}:host /deep/ .checkbox-inline,:host /deep/ .checkbox-inline + .checkbox-inline,:host /deep/ .checkbox-inline + .radio-inline,:host /deep/ .radio-inline,:host /deep/ .radio-inline + .radio-inline,:host /deep/ .radio-inline + .checkbox-inline{margin-left:0;margin-right:10px}:host /deep/ .checkbox-inline:last-child,:host /deep/ .radio-inline:last-child{margin-right:0}:host /deep/ .ng-invalid.ng-touched{border:1px solid #f44336}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.JsonSchemaFormService }]; }, propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwMy1mcmFtZXdvcmsuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmdzZi1ib290c3RyYXAzLWZyYW1ld29yay9zcmMvbGliL2Jvb3RzdHJhcDMtZnJhbWV3b3JrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBb0IsTUFBTSxlQUFlLENBQUE7QUFDcEYsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUE7QUFDM0IsT0FBTyxFQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFDaEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7Ozs7QUFNMUQsTUFpR2EsNEJBQTRCO0lBZTlCO0lBQ0E7SUFmVCxvQkFBb0IsR0FBRyxLQUFLLENBQUE7SUFDNUIsYUFBYSxDQUFLO0lBQ2xCLGdCQUFnQixDQUFLO0lBQ3JCLE9BQU8sQ0FBSztJQUNaLFdBQVcsR0FBUSxJQUFJLENBQUE7SUFDdkIsV0FBVyxHQUFRLEVBQUUsQ0FBQTtJQUNyQixLQUFLLEdBQVEsRUFBRSxDQUFBO0lBQ2YsV0FBVyxHQUFRLElBQUksQ0FBQTtJQUN2QixXQUFXLEdBQUcsS0FBSyxDQUFBO0lBQ1YsVUFBVSxDQUFLO0lBQ2YsV0FBVyxDQUFVO0lBQ3JCLFNBQVMsQ0FBVTtJQUU1QixZQUNTLGNBQWlDLEVBQ2pDLEdBQTBCO1FBRDFCLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUNqQyxRQUFHLEdBQUgsR0FBRyxDQUF1QjtJQUVuQyxDQUFDO0lBRUQsSUFBSSxnQkFBZ0I7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUTtZQUNsRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxN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Q0FBQyxJQUFJLENBQUMsQ0FBQTtTQUNyQztJQUNILENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDM0IsQ0FBQzt1R0E5T1UsNEJBQTRCOzJGQUE1Qiw0QkFBNEIsMktBL0Y3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0RUOztTQWdDVSw0QkFBNEI7MkZBQTVCLDRCQUE0QjtrQkFqR3hDLFNBQVM7K0JBQ0Usc0JBQXNCLFlBQ3RCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErRFQ7NElBMENRLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCB7YWRkQ2xhc3NlcywgaW5BcnJheX0gZnJvbSAnQG5nc2YvY29tbW9uJ1xuaW1wb3J0IHtKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJ0BuZ3NmL3dpZGdldC1saWJyYXJ5J1xuXG4vKipcbiAqIEJvb3RzdHJhcCAzIGZyYW1ld29yayBmb3IgQW5ndWxhciBKU09OIFNjaGVtYSBGb3JtLlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYm9vdHN0cmFwMy1mcmFtZXdvcmsnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPGRpdlxuICAgICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8uaHRtbENsYXNzIHx8ICcnXCJcbiAgICAgICAgICAgICAgW2NsYXNzLmhhcy1mZWVkYmFja109XCJvcHRpb25zPy5mZWVkYmFjayAmJiBvcHRpb25zPy5pc0lucHV0V2lkZ2V0ICYmXG4gICAgICAgIChmb3JtQ29udHJvbD8uZGlydHkgfHwgb3B0aW9ucz8uZmVlZGJhY2tPblJlbmRlcilcIlxuICAgICAgICAgICAgICBbY2xhc3MuaGFzLWVycm9yXT1cIm9wdGlvbnM/LmVuYWJsZUVycm9yU3RhdGUgJiYgZm9ybUNvbnRyb2w/LmVycm9ycyAmJlxuICAgICAgICAoZm9ybUNvbnRyb2w/LmRpcnR5IHx8IG9wdGlvbnM/LmZlZWRiYWNrT25SZW5kZXIpXCJcbiAgICAgICAgICAgICAgW2NsYXNzLmhhcy1zdWNjZXNzXT1cIm9wdGlvbnM/LmVuYWJsZVN1Y2Nlc3NTdGF0ZSAmJiAhZm9ybUNvbnRyb2w/LmVycm9ycyAmJlxuICAgICAgICAoZm9ybUNvbnRyb2w/LmRpcnR5IHx8IG9wdGlvbnM/LmZlZWRiYWNrT25SZW5kZXIpXCI+XG5cbiAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwic2hvd1JlbW92ZUJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImNsb3NlIHB1bGwtcmlnaHRcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAoY2xpY2spPVwicmVtb3ZlSXRlbSgpXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiPkNsb3NlPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJvcHRpb25zPy5tZXNzYWdlTG9jYXRpb24gPT09ICd0b3AnXCI+XG4gICAgICAgICAgICAgIDxwICpuZ0lmPVwib3B0aW9ucz8uaGVscEJsb2NrXCJcbiAgICAgICAgICAgICAgICAgY2xhc3M9XCJoZWxwLWJsb2NrXCJcbiAgICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5oZWxwQmxvY2tcIj48L3A+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8bGFiZWwgKm5nSWY9XCJvcHRpb25zPy50aXRsZSAmJiBsYXlvdXROb2RlPy50eXBlICE9PSAndGFiJ1wiXG4gICAgICAgICAgICAgICAgIFthdHRyLmZvcl09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8ubGFiZWxIdG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICAgICBbY2xhc3Muc3Itb25seV09XCJvcHRpb25zPy5ub3RpdGxlXCJcbiAgICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy50aXRsZVwiPjwvbGFiZWw+XG4gICAgICAgICAgPHAgKm5nSWY9XCJsYXlvdXROb2RlPy50eXBlID09PSAnc3VibWl0JyAmJiBqc2Y/LmZvcm1PcHRpb25zPy5maWVsZHNSZXF1aXJlZFwiPlxuICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzPVwidGV4dC1kYW5nZXJcIj4qPC9zdHJvbmc+ID0gcmVxdWlyZWQgZmllbGRzXG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxkaXYgW2NsYXNzLmlucHV0LWdyb3VwXT1cIm9wdGlvbnM/LmZpZWxkQWRkb25MZWZ0IHx8IG9wdGlvbnM/LmZpZWxkQWRkb25SaWdodFwiPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIm9wdGlvbnM/LmZpZWxkQWRkb25MZWZ0XCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvblwiXG4gICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZmllbGRBZGRvbkxlZnRcIj48L3NwYW4+XG5cbiAgICAgICAgICAgICAgPHNlbGVjdC13aWRnZXQtd2lkZ2V0XG4gICAgICAgICAgICAgICAgICAgICAgW2xheW91dE5vZGVdPVwid2lkZ2V0TGF5b3V0Tm9kZVwiXG4gICAgICAgICAgICAgICAgICAgICAgW2RhdGFJbmRleF09XCJkYXRhSW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgIFtsYXlvdXRJbmRleF09XCJsYXlvdXRJbmRleFwiPjwvc2VsZWN0LXdpZGdldC13aWRnZXQ+XG5cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJvcHRpb25zPy5maWVsZEFkZG9uUmlnaHRcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uXCJcbiAgICAgICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5maWVsZEFkZG9uUmlnaHRcIj48L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8c3BhbiAqbmdJZj1cIm9wdGlvbnM/LmZlZWRiYWNrICYmIG9wdGlvbnM/LmlzSW5wdXRXaWRnZXQgJiZcbiAgICAgICAgICAhb3B0aW9ucz8uZmllbGRBZGRvblJpZ2h0ICYmICFsYXlvdXROb2RlLmFycmF5SXRlbSAmJlxuICAgICAgICAgIChmb3JtQ29udHJvbD8uZGlydHkgfHwgb3B0aW9ucz8uZmVlZGJhY2tPblJlbmRlcilcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5nbHlwaGljb24tb2tdPVwib3B0aW9ucz8uZW5hYmxlU3VjY2Vzc1N0YXRlICYmICFmb3JtQ29udHJvbD8uZXJyb3JzXCJcbiAgICAgICAgICAgICAgICBbY2xhc3MuZ2x5cGhpY29uLXJlbW92ZV09XCJvcHRpb25zPy5lbmFibGVFcnJvclN0YXRlICYmIGZvcm1Db250cm9sPy5lcnJvcnNcIlxuICAgICAgICAgICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2wtZmVlZGJhY2sgZ2x5cGhpY29uXCI+PC9zcGFuPlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJvcHRpb25zPy5tZXNzYWdlTG9jYXRpb24gIT09ICd0b3AnXCI+XG4gICAgICAgICAgICAgIDxwICpuZ0lmPVwib3B0aW9ucz8uaGVscEJsb2NrXCJcbiAgICAgICAgICAgICAgICAgY2xhc3M9XCJoZWxwLWJsb2NrXCJcbiAgICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5oZWxwQmxvY2tcIj48L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiAqbmdJZj1cImRlYnVnICYmIGRlYnVnT3V0cHV0XCI+ZGVidWc6XG4gICAgICAgICAgPHByZT57e2RlYnVnT3V0cHV0fX08L3ByZT5cbiAgICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZXM6IFtgXG4gICAgICA6aG9zdCAvZGVlcC8gLmxpc3QtZ3JvdXAtaXRlbSAuZm9ybS1jb250cm9sLWZlZWRiYWNrIHtcbiAgICAgICAgICB0b3A6IDQwO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCAvZGVlcC8gLmNoZWNrYm94LFxuICAgICAgOmhvc3QgL2RlZXAvIC5yYWRpbyB7XG4gICAgICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgICAgfVxuXG4gICAgICA6aG9zdCAvZGVlcC8gLmNoZWNrYm94LWlubGluZSxcbiAgICAgIDpob3N0IC9kZWVwLyAuY2hlY2tib3gtaW5saW5lICsgLmNoZWNrYm94LWlubGluZSxcbiAgICAgIDpob3N0IC9kZWVwLyAuY2hlY2tib3gtaW5saW5lICsgLnJhZGlvLWlubGluZSxcbiAgICAgIDpob3N0IC9kZWVwLyAucmFkaW8taW5saW5lLFxuICAgICAgOmhvc3QgL2RlZXAvIC5yYWRpby1pbmxpbmUgKyAucmFkaW8taW5saW5lLFxuICAgICAgOmhvc3QgL2RlZXAvIC5yYWRpby1pbmxpbmUgKyAuY2hlY2tib3gtaW5saW5lIHtcbiAgICAgICAgICBtYXJnaW4tbGVmdDogMDtcbiAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gICAgICB9XG5cbiAgICAgIDpob3N0IC9kZWVwLyAuY2hlY2tib3gtaW5saW5lOmxhc3QtY2hpbGQsXG4gICAgICA6aG9zdCAvZGVlcC8gLnJhZGlvLWlubGluZTpsYXN0LWNoaWxkIHtcbiAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgICB9XG5cbiAgICAgIDpob3N0IC9kZWVwLyAubmctaW52YWxpZC5uZy10b3VjaGVkIHtcbiAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZjQ0MzM2O1xuICAgICAgfVxuICBgXSxcbn0pXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwM0ZyYW1ld29ya0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgZnJhbWV3b3JrSW5pdGlhbGl6ZWQgPSBmYWxzZVxuICB3aWRnZXRPcHRpb25zOiBhbnkgLy8gT3B0aW9ucyBwYXNzZWQgdG8gY2hpbGQgd2lkZ2V0XG4gIHdpZGdldExheW91dE5vZGU6IGFueSAvLyBsYXlvdXROb2RlIHBhc3NlZCB0byBjaGlsZCB3aWRnZXRcbiAgb3B0aW9uczogYW55IC8vIE9wdGlvbnMgdXNlZCBpbiB0aGlzIGZyYW1ld29ya1xuICBmb3JtQ29udHJvbDogYW55ID0gbnVsbFxuICBkZWJ1Z091dHB1dDogYW55ID0gJydcbiAgZGVidWc6IGFueSA9ICcnXG4gIHBhcmVudEFycmF5OiBhbnkgPSBudWxsXG4gIGlzT3JkZXJhYmxlID0gZmFsc2VcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwdWJsaWMganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBnZXQgc2hvd1JlbW92ZUJ1dHRvbigpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5yZW1vdmFibGUgfHwgdGhpcy5vcHRpb25zLnJlYWRvbmx5IHx8XG4gICAgICB0aGlzLmxheW91dE5vZGUudHlwZSA9PT0gJyRyZWYnXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgaWYgKHRoaXMubGF5b3V0Tm9kZS5yZWN1cnNpdmVSZWZlcmVuY2UpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIGlmICghdGhpcy5sYXlvdXROb2RlLmFycmF5SXRlbSB8fCAhdGhpcy5wYXJlbnRBcnJheSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIC8vIElmIGFycmF5IGxlbmd0aCA8PSBtaW5JdGVtcywgZG9uJ3QgYWxsb3cgcmVtb3ZpbmcgYW55IGl0ZW1zXG4gICAgcmV0dXJuIHRoaXMucGFyZW50QXJyYXkuaXRlbXMubGVuZ3RoIC0gMSA8PSB0aGlzLnBhcmVudEFycmF5Lm9wdGlvbnMubWluSXRlbXMgPyBmYWxzZSA6XG4gICAgICAvLyBGb3IgcmVtb3ZhYmxlIGxpc3QgaXRlbXMsIGFsbG93IHJlbW92aW5nIGFueSBpdGVtXG4gICAgICB0aGlzLmxheW91dE5vZGUuYXJyYXlJdGVtVHlwZSA9PT0gJ2xpc3QnID8gdHJ1ZSA6XG4gICAgICAgIC8vIEZvciByZW1vdmFibGUgdHVwbGUgaXRlbXMsIG9ubHkgYWxsb3cgcmVtb3ZpbmcgbGFzdCBpdGVtIGluIGxpc3RcbiAgICAgICAgdGhpcy5sYXlvdXRJbmRleFt0aGlzLmxheW91dEluZGV4Lmxlbmd0aCAtIDFdID09PSB0aGlzLnBhcmVudEFycmF5Lml0ZW1zLmxlbmd0aCAtIDJcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZUZyYW1ld29yaygpXG4gICAgaWYgKHRoaXMubGF5b3V0Tm9kZS5hcnJheUl0ZW0gJiYgdGhpcy5sYXlvdXROb2RlLnR5cGUgIT09ICckcmVmJykge1xuICAgICAgdGhpcy5wYXJlbnRBcnJheSA9IHRoaXMuanNmLmdldFBhcmVudE5vZGUodGhpcylcbiAgICAgIGlmICh0aGlzLnBhcmVudEFycmF5KSB7XG4gICAgICAgIHRoaXMuaXNPcmRlcmFibGUgPSB0aGlzLmxheW91dE5vZGUuYXJyYXlJdGVtVHlwZSA9PT0gJ2xpc3QnICYmXG4gICAgICAgICAgIXRoaXMub3B0aW9ucy5yZWFkb25seSAmJiB0aGlzLnBhcmVudEFycmF5Lm9wdGlvbnMub3JkZXJhYmxlXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgaWYgKCF0aGlzLmZyYW1ld29ya0luaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLmluaXRpYWxpemVGcmFtZXdvcmsoKVxuICAgIH1cbiAgfVxuXG4gIGluaXRpYWxpemVGcmFtZXdvcmsoKSB7XG4gICAgaWYgKHRoaXMubGF5b3V0Tm9kZSkge1xuICAgICAgdGhpcy5vcHRpb25zID0gXy5jbG9uZURlZXAodGhpcy5sYXlvdXROb2RlLm9wdGlvbnMpXG4gICAgICB0aGlzLndpZGdldExheW91dE5vZGUgPSB7XG4gICAgICAgIC4uLnRoaXMubGF5b3V0Tm9kZSxcbiAgICAgICAgb3B0aW9uczogXy5jbG9uZURlZXAodGhpcy5sYXlvdXROb2RlLm9wdGlvbnMpXG4gICAgICB9XG4gICAgICB0aGlzLndpZGdldE9wdGlvbnMgPSB0aGlzLndpZGdldExheW91dE5vZGUub3B0aW9uc1xuICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IHRoaXMuanNmLmdldEZvcm1Db250cm9sKHRoaXMpXG5cbiAgICAgIHRoaXMub3B0aW9ucy5pc0lucHV0V2lkZ2V0ID0gaW5BcnJheSh0aGlzLmxheW91dE5vZGUudHlwZSwgW1xuICAgICAgICAnYnV0dG9uJywgJ2NoZWNrYm94JywgJ2NoZWNrYm94ZXMtaW5saW5lJywgJ2NoZWNrYm94ZXMnLCAnY29sb3InLFxuICAgICAgICAnZGF0ZScsICdkYXRldGltZS1sb2NhbCcsICdkYXRldGltZScsICdlbWFpbCcsICdmaWxlJywgJ2hpZGRlbicsXG4gICAgICAgICdpbWFnZScsICdpbnRlZ2VyJywgJ21vbnRoJywgJ251bWJlcicsICdwYXNzd29yZCcsICdyYWRpbycsXG4gICAgICAgICdyYWRpb2J1dHRvbnMnLCAncmFkaW9zLWlubGluZScsICdyYWRpb3MnLCAncmFuZ2UnLCAncmVzZXQnLCAnc2VhcmNoJyxcbiAgICAgICAgJ3NlbGVjdCcsICdzdWJtaXQnLCAndGVsJywgJ3RleHQnLCAndGV4dGFyZWEnLCAndGltZScsICd1cmwnLCAnd2VlaydcbiAgICAgIF0pXG5cbiAgICAgIHRoaXMub3B0aW9ucy50aXRsZSA9IHRoaXMuc2V0VGl0bGUoKVxuXG4gICAgICB0aGlzLm9wdGlvbnMuaHRtbENsYXNzID1cbiAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLm9wdGlvbnMuaHRtbENsYXNzLCAnc2NoZW1hLWZvcm0tJyArIHRoaXMubGF5b3V0Tm9kZS50eXBlKVxuICAgICAgaWYgKHRoaXMubGF5b3V0Tm9kZS50eXBlICE9PSAnZmxleCcpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmh0bWxDbGFzcyA9XG4gICAgICAgICAgdGhpcy5sYXlvdXROb2RlLnR5cGUgPT09ICdhcnJheScgP1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLm9wdGlvbnMuaHRtbENsYXNzLCAnbGlzdC1ncm91cCcpIDpcbiAgICAgICAgICAgIHRoaXMubGF5b3V0Tm9kZS5hcnJheUl0ZW0gJiYgdGhpcy5sYXlvdXROb2RlLnR5cGUgIT09ICckcmVmJyA/XG4gICAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5vcHRpb25zLmh0bWxDbGFzcywgJ2xpc3QtZ3JvdXAtaXRlbScpIDpcbiAgICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLm9wdGlvbnMuaHRtbENsYXNzLCAnZm9ybS1ncm91cCcpXG4gICAgICB9XG4gICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzID0gJydcbiAgICAgIHRoaXMub3B0aW9ucy5sYWJlbEh0bWxDbGFzcyA9XG4gICAgICAgIGFkZENsYXNzZXModGhpcy5vcHRpb25zLmxhYmVsSHRtbENsYXNzLCAnY29udHJvbC1sYWJlbCcpXG4gICAgICB0aGlzLndpZGdldE9wdGlvbnMuYWN0aXZlQ2xhc3MgPVxuICAgICAgICBhZGRDbGFzc2VzKHRoaXMud2lkZ2V0T3B0aW9ucy5hY3RpdmVDbGFzcywgJ2FjdGl2ZScpXG4gICAgICB0aGlzLm9wdGlvbnMuZmllbGRBZGRvbkxlZnQgPVxuICAgICAgICB0aGlzLm9wdGlvbnMuZmllbGRBZGRvbkxlZnQgfHwgdGhpcy5vcHRpb25zLnByZXBlbmRcbiAgICAgIHRoaXMub3B0aW9ucy5maWVsZEFkZG9uUmlnaHQgPVxuICAgICAgICB0aGlzLm9wdGlvbnMuZmllbGRBZGRvblJpZ2h0IHx8IHRoaXMub3B0aW9ucy5hcHBlbmRcblxuICAgICAgLy8gQWRkIGFzdGVyaXNrIHRvIHRpdGxlcyBpZiByZXF1aXJlZFxuICAgICAgaWYgKHRoaXMub3B0aW9ucy50aXRsZSAmJiB0aGlzLmxheW91dE5vZGUudHlwZSAhPT0gJ3RhYicgJiZcbiAgICAgICAgIXRoaXMub3B0aW9ucy5ub3RpdGxlICYmIHRoaXMub3B0aW9ucy5yZXF1aXJlZCAmJlxuICAgICAgICAhdGhpcy5vcHRpb25zLnRpdGxlLmluY2x1ZGVzKCcqJylcbiAgICAgICkge1xuICAgICAgICB0aGlzLm9wdGlvbnMudGl0bGUgKz0gJyA8c3Ryb25nIGNsYXNzPVwidGV4dC1kYW5nZXJcIj4qPC9zdHJvbmc+J1xuICAgICAgfVxuICAgICAgLy8gU2V0IG1pc2NlbGFuZW91cyBzdHlsZXMgYW5kIHNldHRpbmdzIGZvciBlYWNoIGNvbnRyb2wgdHlwZVxuICAgICAgc3dpdGNoICh0aGlzLmxheW91dE5vZGUudHlwZSkge1xuICAgICAgICAvLyBDaGVja2JveCBjb250cm9sc1xuICAgICAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICAgIGNhc2UgJ2NoZWNrYm94ZXMnOlxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcywgJ2NoZWNrYm94JylcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdjaGVja2JveGVzLWlubGluZSc6XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzLCAnY2hlY2tib3gnKVxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5pdGVtTGFiZWxIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLml0ZW1MYWJlbEh0bWxDbGFzcywgJ2NoZWNrYm94LWlubGluZScpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgLy8gUmFkaW8gY29udHJvbHNcbiAgICAgICAgY2FzZSAncmFkaW8nOlxuICAgICAgICBjYXNlICdyYWRpb3MnOlxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcywgJ3JhZGlvJylcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdyYWRpb3MtaW5saW5lJzpcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MsICdyYWRpbycpXG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLml0ZW1MYWJlbEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaXRlbUxhYmVsSHRtbENsYXNzLCAncmFkaW8taW5saW5lJylcbiAgICAgICAgICBicmVha1xuICAgICAgICAvLyBCdXR0b24gc2V0cyAtIGNoZWNrYm94YnV0dG9ucyBhbmQgcmFkaW9idXR0b25zXG4gICAgICAgIGNhc2UgJ2NoZWNrYm94YnV0dG9ucyc6XG4gICAgICAgIGNhc2UgJ3JhZGlvYnV0dG9ucyc6XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzLCAnYnRuLWdyb3VwJylcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaXRlbUxhYmVsSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5pdGVtTGFiZWxIdG1sQ2xhc3MsICdidG4nKVxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5pdGVtTGFiZWxIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLml0ZW1MYWJlbEh0bWxDbGFzcywgdGhpcy5vcHRpb25zLnN0eWxlIHx8ICdidG4tZGVmYXVsdCcpXG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcywgJ3NyLW9ubHknKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIC8vIFNpbmdsZSBidXR0b24gY29udHJvbHNcbiAgICAgICAgY2FzZSAnYnV0dG9uJzpcbiAgICAgICAgY2FzZSAnc3VibWl0JzpcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzLCAnYnRuJylcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzLCB0aGlzLm9wdGlvbnMuc3R5bGUgfHwgJ2J0bi1pbmZvJylcbiAgICAgICAgICBicmVha1xuICAgICAgICAvLyBDb250YWluZXJzIC0gYXJyYXlzIGFuZCBmaWVsZHNldHNcbiAgICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICBjYXNlICdmaWVsZHNldCc6XG4gICAgICAgIGNhc2UgJ3NlY3Rpb24nOlxuICAgICAgICBjYXNlICdjb25kaXRpb25hbCc6XG4gICAgICAgIGNhc2UgJ2FkdmFuY2VkZmllbGRzZXQnOlxuICAgICAgICBjYXNlICdhdXRoZmllbGRzZXQnOlxuICAgICAgICBjYXNlICdzZWxlY3RmaWVsZHNldCc6XG4gICAgICAgIGNhc2UgJ29wdGlvbmZpZWxkc2V0JzpcbiAgICAgICAgICB0aGlzLm9wdGlvbnMubWVzc2FnZUxvY2F0aW9uID0gJ3RvcCdcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICd0YWJhcnJheSc6XG4gICAgICAgIGNhc2UgJ3RhYnMnOlxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcywgJ3RhYi1jb250ZW50JylcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzLCAndGFiLXBhbmUnKVxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5sYWJlbEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMubGFiZWxIdG1sQ2xhc3MsICduYXYgbmF2LXRhYnMnKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIC8vICdBZGQnIGJ1dHRvbnMgLSByZWZlcmVuY2VzXG4gICAgICAgIGNhc2UgJyRyZWYnOlxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MsICdidG4gcHVsbC1yaWdodCcpXG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcywgdGhpcy5vcHRpb25zLnN0eWxlIHx8ICdidG4tZGVmYXVsdCcpXG4gICAgICAgICAgdGhpcy5vcHRpb25zLmljb24gPSAnZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIC8vIERlZmF1bHQgLSBpbmNsdWRpbmcgcmVndWxhciBpbnB1dHNcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzLCAnZm9ybS1jb250cm9sJylcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgdGhpcy51cGRhdGVIZWxwQmxvY2sodGhpcy5mb3JtQ29udHJvbC5zdGF0dXMpXG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoc3RhdHVzID0+IHRoaXMudXBkYXRlSGVscEJsb2NrKHN0YXR1cykpXG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1Zykge1xuICAgICAgICAgIGNvbnN0IHZhcnM6IGFueVtdID0gW11cbiAgICAgICAgICB0aGlzLmRlYnVnT3V0cHV0ID0gXy5tYXAodmFycywgdGhpc1ZhciA9PiBKU09OLnN0cmluZ2lmeSh0aGlzVmFyLCBudWxsLCAyKSkuam9pbignXFxuJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5mcmFtZXdvcmtJbml0aWFsaXplZCA9IHRydWVcbiAgICB9XG5cbiAgfVxuXG4gIHVwZGF0ZUhlbHBCbG9jayhzdGF0dXMpIHtcbiAgICB0aGlzLm9wdGlvbnMuaGVscEJsb2NrID0gc3RhdHVzID09PSAnSU5WQUxJRCcgJiZcbiAgICB0aGlzLm9wdGlvbnMuZW5hYmxlRXJyb3JTdGF0ZSAmJiB0aGlzLmZvcm1Db250cm9sLmVycm9ycyAmJlxuICAgICh0aGlzLmZvcm1Db250cm9sLmRpcnR5IHx8IHRoaXMub3B0aW9ucy5mZWVkYmFja09uUmVuZGVyKSA/XG4gICAgICB0aGlzLmpzZi5mb3JtYXRFcnJvcnModGhpcy5mb3JtQ29udHJvbC5lcnJvcnMsIHRoaXMub3B0aW9ucy52YWxpZGF0aW9uTWVzc2FnZXMpIDpcbiAgICAgIHRoaXMub3B0aW9ucy5kZXNjcmlwdGlvbiB8fCB0aGlzLm9wdGlvbnMuaGVscCB8fCBudWxsXG4gIH1cblxuICBzZXRUaXRsZSgpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAodGhpcy5sYXlvdXROb2RlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2J1dHRvbic6XG4gICAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICBjYXNlICdzZWN0aW9uJzpcbiAgICAgIGNhc2UgJ2hlbHAnOlxuICAgICAgY2FzZSAnbXNnJzpcbiAgICAgIGNhc2UgJ3N1Ym1pdCc6XG4gICAgICBjYXNlICdtZXNzYWdlJzpcbiAgICAgIGNhc2UgJ3RhYmFycmF5JzpcbiAgICAgIGNhc2UgJ3RhYnMnOlxuICAgICAgY2FzZSAnJHJlZic6XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICBjYXNlICdhZHZhbmNlZGZpZWxkc2V0JzpcbiAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmV4cGFuZGFibGUgPSB0cnVlXG4gICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy50aXRsZSA9ICdBZHZhbmNlZCBvcHRpb25zJ1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgY2FzZSAnYXV0aGZpZWxkc2V0JzpcbiAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmV4cGFuZGFibGUgPSB0cnVlXG4gICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy50aXRsZSA9ICdBdXRoZW50aWNhdGlvbiBzZXR0aW5ncydcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIGNhc2UgJ2ZpZWxkc2V0JzpcbiAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLnRpdGxlID0gdGhpcy5vcHRpb25zLnRpdGxlXG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMudGl0bGUgPSBudWxsXG4gICAgICAgIHJldHVybiB0aGlzLmpzZi5zZXRJdGVtVGl0bGUodGhpcylcbiAgICB9XG4gIH1cblxuICByZW1vdmVJdGVtKCkge1xuICAgIHRoaXMuanNmLnJlbW92ZUl0ZW0odGhpcylcbiAgfVxufVxuIl19