import { ChangeDetectorRef, Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { JsonSchemaFormService } from '../../json-schema-form.service';
import { addClasses, inArray } from '../../shared';
/**
 * Bootstrap 4 framework for Angular JSON Schema Form.
 *
 */
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
        // If array length <= minItems, don't allow removing any items
        return this.parentArray.items.length - 1 <= this.parentArray.options.minItems ? false :
            // For removable list items, allow removing any item
            this.layoutNode.arrayItemType === 'list' ? true :
                // For removable tuple items, only allow removing last item in list
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
            this.widgetLayoutNode = Object.assign({}, this.layoutNode, { options: _.cloneDeep(this.layoutNode.options) });
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
            // Add asterisk to titles if required
            if (this.options.title && this.layoutNode.type !== 'tab' &&
                !this.options.notitle && this.options.required &&
                !this.options.title.includes('*')) {
                this.options.title += ' <strong class="text-danger">*</strong>';
            }
            // Set miscelaneous styles and settings for each control type
            switch (this.layoutNode.type) {
                // Checkbox controls
                case 'checkbox':
                case 'checkboxes':
                    this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'checkbox');
                    break;
                case 'checkboxes-inline':
                    this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'checkbox');
                    this.widgetOptions.itemLabelHtmlClass = addClasses(this.widgetOptions.itemLabelHtmlClass, 'checkbox-inline');
                    break;
                // Radio controls
                case 'radio':
                case 'radios':
                    this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'radio');
                    break;
                case 'radios-inline':
                    this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'radio');
                    this.widgetOptions.itemLabelHtmlClass = addClasses(this.widgetOptions.itemLabelHtmlClass, 'radio-inline');
                    break;
                // Button sets - checkboxbuttons and radiobuttons
                case 'checkboxbuttons':
                case 'radiobuttons':
                    this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'btn-group');
                    this.widgetOptions.itemLabelHtmlClass = addClasses(this.widgetOptions.itemLabelHtmlClass, 'btn');
                    this.widgetOptions.itemLabelHtmlClass = addClasses(this.widgetOptions.itemLabelHtmlClass, this.options.style || 'btn-default');
                    this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, 'sr-only');
                    break;
                // Single button controls
                case 'button':
                case 'submit':
                    this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, 'btn');
                    this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, this.options.style || 'btn-info');
                    break;
                // Containers - arrays and fieldsets
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
                // 'Add' buttons - references
                case '$ref':
                    this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, 'btn pull-right');
                    this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, this.options.style || 'btn-default');
                    this.options.icon = 'glyphicon glyphicon-plus';
                    break;
                // Default - including regular inputs
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
Bootstrap4FrameworkComponent.decorators = [
    { type: Component, args: [{
                selector: 'bootstrap-4-framework',
                template: `
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

    <div *ngIf="debug && debugOutput">debug: <pre>{{debugOutput}}</pre></div>
  `,
                styles: [`
    :host /deep/ .list-group-item .form-control-feedback { top: 40px; }
    :host /deep/ .checkbox,
    :host /deep/ .radio { margin-top: 0; margin-bottom: 0; }
    :host /deep/ .checkbox-inline,
    :host /deep/ .checkbox-inline + .checkbox-inline,
    :host /deep/ .checkbox-inline + .radio-inline,
    :host /deep/ .radio-inline,
    :host /deep/ .radio-inline + .radio-inline,
    :host /deep/ .radio-inline + .checkbox-inline { margin-left: 0; margin-right: 10px; }
    :host /deep/ .checkbox-inline:last-child,
    :host /deep/ .radio-inline:last-child { margin-right: 0; }
    :host /deep/ .ng-invalid.ng-touched { border: 1px solid #f44336; }
  `],
            },] },
];
/** @nocollapse */
Bootstrap4FrameworkComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: JsonSchemaFormService }
];
Bootstrap4FrameworkComponent.propDecorators = {
    layoutNode: [{ type: Input }],
    layoutIndex: [{ type: Input }],
    dataIndex: [{ type: Input }]
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLTQtZnJhbWV3b3JrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWpzb24tc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJzcmMvZnJhbWV3b3JrLWxpYnJhcnkvYm9vdHN0cmFwLTQtZnJhbWV3b3JrL2Jvb3RzdHJhcC00LWZyYW1ld29yay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBRXZGLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZFLE9BQU8sRUFDTCxVQUFVLEVBQVUsT0FBTyxFQUM1QixNQUFNLGNBQWMsQ0FBQztBQUV0Qjs7O0dBR0c7QUFnRkgsTUFBTTtJQWNKLFlBQ1MsY0FBaUMsRUFDakMsR0FBMEI7UUFEMUIsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBQ2pDLFFBQUcsR0FBSCxHQUFHLENBQXVCO1FBZm5DLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUk3QixnQkFBVyxHQUFRLElBQUksQ0FBQztRQUN4QixnQkFBVyxHQUFRLEVBQUUsQ0FBQztRQUN0QixVQUFLLEdBQVEsRUFBRSxDQUFDO1FBQ2hCLGdCQUFXLEdBQVEsSUFBSSxDQUFDO1FBQ3hCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO0lBUWhCLENBQUM7SUFFTCxJQUFJLGdCQUFnQjtRQUNsQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUTtZQUNsRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxNQUMzQixDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFBQyxDQUFDO1FBQ25CLEVBQUUsQ0FB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QyxhQUFhLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDO2dCQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2QsS0FBSyxjQUFjO2dCQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLHlCQUF5QixDQUFDO2dCQUNyRCxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2QsS0FBSyxVQUFVO2dCQUNiLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2Q7Z0JBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsQ0FBQztJQUNILENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7O1lBaFNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2RFQ7Z0JBQ0QsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7R0FhUixDQUFDO2FBQ0g7Ozs7WUEzRlEsaUJBQWlCO1lBSWpCLHFCQUFxQjs7O3lCQWtHM0IsS0FBSzswQkFDTCxLQUFLO3dCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBKc29uU2NoZW1hRm9ybVNlcnZpY2UgfSBmcm9tICcuLi8uLi9qc29uLXNjaGVtYS1mb3JtLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgYWRkQ2xhc3NlcywgaGFzT3duLCBpbkFycmF5LCBpc0FycmF5LCBKc29uUG9pbnRlciwgdG9UaXRsZUNhc2Vcbn0gZnJvbSAnLi4vLi4vc2hhcmVkJztcblxuLyoqXG4gKiBCb290c3RyYXAgNCBmcmFtZXdvcmsgZm9yIEFuZ3VsYXIgSlNPTiBTY2hlbWEgRm9ybS5cbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Jvb3RzdHJhcC00LWZyYW1ld29yaycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/Lmh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICBbY2xhc3MuaGFzLWZlZWRiYWNrXT1cIm9wdGlvbnM/LmZlZWRiYWNrICYmIG9wdGlvbnM/LmlzSW5wdXRXaWRnZXQgJiZcbiAgICAgICAgKGZvcm1Db250cm9sPy5kaXJ0eSB8fCBvcHRpb25zPy5mZWVkYmFja09uUmVuZGVyKVwiXG4gICAgICBbY2xhc3MuaGFzLWVycm9yXT1cIm9wdGlvbnM/LmVuYWJsZUVycm9yU3RhdGUgJiYgZm9ybUNvbnRyb2w/LmVycm9ycyAmJlxuICAgICAgICAoZm9ybUNvbnRyb2w/LmRpcnR5IHx8IG9wdGlvbnM/LmZlZWRiYWNrT25SZW5kZXIpXCJcbiAgICAgIFtjbGFzcy5oYXMtc3VjY2Vzc109XCJvcHRpb25zPy5lbmFibGVTdWNjZXNzU3RhdGUgJiYgIWZvcm1Db250cm9sPy5lcnJvcnMgJiZcbiAgICAgICAgKGZvcm1Db250cm9sPy5kaXJ0eSB8fCBvcHRpb25zPy5mZWVkYmFja09uUmVuZGVyKVwiPlxuXG4gICAgICA8YnV0dG9uICpuZ0lmPVwic2hvd1JlbW92ZUJ1dHRvblwiXG4gICAgICAgIGNsYXNzPVwiY2xvc2UgcHVsbC1yaWdodFwiXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAoY2xpY2spPVwicmVtb3ZlSXRlbSgpXCI+XG4gICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiPkNsb3NlPC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8ZGl2ICpuZ0lmPVwib3B0aW9ucz8ubWVzc2FnZUxvY2F0aW9uID09PSAndG9wJ1wiPlxuICAgICAgICA8cCAqbmdJZj1cIm9wdGlvbnM/LmhlbHBCbG9ja1wiXG4gICAgICAgICAgY2xhc3M9XCJoZWxwLWJsb2NrXCJcbiAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmhlbHBCbG9ja1wiPjwvcD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8bGFiZWwgKm5nSWY9XCJvcHRpb25zPy50aXRsZSAmJiBsYXlvdXROb2RlPy50eXBlICE9PSAndGFiJ1wiXG4gICAgICAgIFthdHRyLmZvcl09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8ubGFiZWxIdG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICBbY2xhc3Muc3Itb25seV09XCJvcHRpb25zPy5ub3RpdGxlXCJcbiAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy50aXRsZVwiPjwvbGFiZWw+XG4gICAgICA8cCAqbmdJZj1cImxheW91dE5vZGU/LnR5cGUgPT09ICdzdWJtaXQnICYmIGpzZj8uZm9ybU9wdGlvbnM/LmZpZWxkc1JlcXVpcmVkXCI+XG4gICAgICAgIDxzdHJvbmcgY2xhc3M9XCJ0ZXh0LWRhbmdlclwiPio8L3N0cm9uZz4gPSByZXF1aXJlZCBmaWVsZHNcbiAgICAgIDwvcD5cbiAgICAgIDxkaXYgW2NsYXNzLmlucHV0LWdyb3VwXT1cIm9wdGlvbnM/LmZpZWxkQWRkb25MZWZ0IHx8IG9wdGlvbnM/LmZpZWxkQWRkb25SaWdodFwiPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIm9wdGlvbnM/LmZpZWxkQWRkb25MZWZ0XCJcbiAgICAgICAgICBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uXCJcbiAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmZpZWxkQWRkb25MZWZ0XCI+PC9zcGFuPlxuXG4gICAgICAgIDxzZWxlY3Qtd2lkZ2V0LXdpZGdldFxuICAgICAgICAgIFtsYXlvdXROb2RlXT1cIndpZGdldExheW91dE5vZGVcIlxuICAgICAgICAgIFtkYXRhSW5kZXhdPVwiZGF0YUluZGV4XCJcbiAgICAgICAgICBbbGF5b3V0SW5kZXhdPVwibGF5b3V0SW5kZXhcIj48L3NlbGVjdC13aWRnZXQtd2lkZ2V0PlxuXG4gICAgICAgIDxzcGFuICpuZ0lmPVwib3B0aW9ucz8uZmllbGRBZGRvblJpZ2h0XCJcbiAgICAgICAgICBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uXCJcbiAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmZpZWxkQWRkb25SaWdodFwiPjwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8c3BhbiAqbmdJZj1cIm9wdGlvbnM/LmZlZWRiYWNrICYmIG9wdGlvbnM/LmlzSW5wdXRXaWRnZXQgJiZcbiAgICAgICAgICAhb3B0aW9ucz8uZmllbGRBZGRvblJpZ2h0ICYmICFsYXlvdXROb2RlLmFycmF5SXRlbSAmJlxuICAgICAgICAgIChmb3JtQ29udHJvbD8uZGlydHkgfHwgb3B0aW9ucz8uZmVlZGJhY2tPblJlbmRlcilcIlxuICAgICAgICBbY2xhc3MuZ2x5cGhpY29uLW9rXT1cIm9wdGlvbnM/LmVuYWJsZVN1Y2Nlc3NTdGF0ZSAmJiAhZm9ybUNvbnRyb2w/LmVycm9yc1wiXG4gICAgICAgIFtjbGFzcy5nbHlwaGljb24tcmVtb3ZlXT1cIm9wdGlvbnM/LmVuYWJsZUVycm9yU3RhdGUgJiYgZm9ybUNvbnRyb2w/LmVycm9yc1wiXG4gICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sLWZlZWRiYWNrIGdseXBoaWNvblwiPjwvc3Bhbj5cbiAgICAgIDxkaXYgKm5nSWY9XCJvcHRpb25zPy5tZXNzYWdlTG9jYXRpb24gIT09ICd0b3AnXCI+XG4gICAgICAgIDxwICpuZ0lmPVwib3B0aW9ucz8uaGVscEJsb2NrXCJcbiAgICAgICAgICBjbGFzcz1cImhlbHAtYmxvY2tcIlxuICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uaGVscEJsb2NrXCI+PC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2ICpuZ0lmPVwiZGVidWcgJiYgZGVidWdPdXRwdXRcIj5kZWJ1ZzogPHByZT57e2RlYnVnT3V0cHV0fX08L3ByZT48L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbYFxuICAgIDpob3N0IC9kZWVwLyAubGlzdC1ncm91cC1pdGVtIC5mb3JtLWNvbnRyb2wtZmVlZGJhY2sgeyB0b3A6IDQwcHg7IH1cbiAgICA6aG9zdCAvZGVlcC8gLmNoZWNrYm94LFxuICAgIDpob3N0IC9kZWVwLyAucmFkaW8geyBtYXJnaW4tdG9wOiAwOyBtYXJnaW4tYm90dG9tOiAwOyB9XG4gICAgOmhvc3QgL2RlZXAvIC5jaGVja2JveC1pbmxpbmUsXG4gICAgOmhvc3QgL2RlZXAvIC5jaGVja2JveC1pbmxpbmUgKyAuY2hlY2tib3gtaW5saW5lLFxuICAgIDpob3N0IC9kZWVwLyAuY2hlY2tib3gtaW5saW5lICsgLnJhZGlvLWlubGluZSxcbiAgICA6aG9zdCAvZGVlcC8gLnJhZGlvLWlubGluZSxcbiAgICA6aG9zdCAvZGVlcC8gLnJhZGlvLWlubGluZSArIC5yYWRpby1pbmxpbmUsXG4gICAgOmhvc3QgL2RlZXAvIC5yYWRpby1pbmxpbmUgKyAuY2hlY2tib3gtaW5saW5lIHsgbWFyZ2luLWxlZnQ6IDA7IG1hcmdpbi1yaWdodDogMTBweDsgfVxuICAgIDpob3N0IC9kZWVwLyAuY2hlY2tib3gtaW5saW5lOmxhc3QtY2hpbGQsXG4gICAgOmhvc3QgL2RlZXAvIC5yYWRpby1pbmxpbmU6bGFzdC1jaGlsZCB7IG1hcmdpbi1yaWdodDogMDsgfVxuICAgIDpob3N0IC9kZWVwLyAubmctaW52YWxpZC5uZy10b3VjaGVkIHsgYm9yZGVyOiAxcHggc29saWQgI2Y0NDMzNjsgfVxuICBgXSxcbn0pXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwNEZyYW1ld29ya0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgZnJhbWV3b3JrSW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgd2lkZ2V0T3B0aW9uczogYW55OyAvLyBPcHRpb25zIHBhc3NlZCB0byBjaGlsZCB3aWRnZXRcbiAgd2lkZ2V0TGF5b3V0Tm9kZTogYW55OyAvLyBsYXlvdXROb2RlIHBhc3NlZCB0byBjaGlsZCB3aWRnZXRcbiAgb3B0aW9uczogYW55OyAvLyBPcHRpb25zIHVzZWQgaW4gdGhpcyBmcmFtZXdvcmtcbiAgZm9ybUNvbnRyb2w6IGFueSA9IG51bGw7XG4gIGRlYnVnT3V0cHV0OiBhbnkgPSAnJztcbiAgZGVidWc6IGFueSA9ICcnO1xuICBwYXJlbnRBcnJheTogYW55ID0gbnVsbDtcbiAgaXNPcmRlcmFibGUgPSBmYWxzZTtcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55O1xuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW107XG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwdWJsaWMganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7IH1cblxuICBnZXQgc2hvd1JlbW92ZUJ1dHRvbigpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5yZW1vdmFibGUgfHwgdGhpcy5vcHRpb25zLnJlYWRvbmx5IHx8XG4gICAgICB0aGlzLmxheW91dE5vZGUudHlwZSA9PT0gJyRyZWYnXG4gICAgKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGlmICh0aGlzLmxheW91dE5vZGUucmVjdXJzaXZlUmVmZXJlbmNlKSB7IHJldHVybiB0cnVlOyB9XG4gICAgaWYgKCF0aGlzLmxheW91dE5vZGUuYXJyYXlJdGVtIHx8ICF0aGlzLnBhcmVudEFycmF5KSB7IHJldHVybiBmYWxzZTsgfVxuICAgIC8vIElmIGFycmF5IGxlbmd0aCA8PSBtaW5JdGVtcywgZG9uJ3QgYWxsb3cgcmVtb3ZpbmcgYW55IGl0ZW1zXG4gICAgcmV0dXJuIHRoaXMucGFyZW50QXJyYXkuaXRlbXMubGVuZ3RoIC0gMSA8PSB0aGlzLnBhcmVudEFycmF5Lm9wdGlvbnMubWluSXRlbXMgPyBmYWxzZSA6XG4gICAgICAvLyBGb3IgcmVtb3ZhYmxlIGxpc3QgaXRlbXMsIGFsbG93IHJlbW92aW5nIGFueSBpdGVtXG4gICAgICB0aGlzLmxheW91dE5vZGUuYXJyYXlJdGVtVHlwZSA9PT0gJ2xpc3QnID8gdHJ1ZSA6XG4gICAgICAgIC8vIEZvciByZW1vdmFibGUgdHVwbGUgaXRlbXMsIG9ubHkgYWxsb3cgcmVtb3ZpbmcgbGFzdCBpdGVtIGluIGxpc3RcbiAgICAgICAgdGhpcy5sYXlvdXRJbmRleFt0aGlzLmxheW91dEluZGV4Lmxlbmd0aCAtIDFdID09PSB0aGlzLnBhcmVudEFycmF5Lml0ZW1zLmxlbmd0aCAtIDI7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVGcmFtZXdvcmsoKTtcbiAgICBpZiAodGhpcy5sYXlvdXROb2RlLmFycmF5SXRlbSAmJiB0aGlzLmxheW91dE5vZGUudHlwZSAhPT0gJyRyZWYnKSB7XG4gICAgICB0aGlzLnBhcmVudEFycmF5ID0gdGhpcy5qc2YuZ2V0UGFyZW50Tm9kZSh0aGlzKTtcbiAgICAgIGlmICh0aGlzLnBhcmVudEFycmF5KSB7XG4gICAgICAgIHRoaXMuaXNPcmRlcmFibGUgPSB0aGlzLmxheW91dE5vZGUuYXJyYXlJdGVtVHlwZSA9PT0gJ2xpc3QnICYmXG4gICAgICAgICAgIXRoaXMub3B0aW9ucy5yZWFkb25seSAmJiB0aGlzLnBhcmVudEFycmF5Lm9wdGlvbnMub3JkZXJhYmxlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICghdGhpcy5mcmFtZXdvcmtJbml0aWFsaXplZCkgeyB0aGlzLmluaXRpYWxpemVGcmFtZXdvcmsoKTsgfVxuICB9XG5cbiAgaW5pdGlhbGl6ZUZyYW1ld29yaygpIHtcbiAgICBpZiAodGhpcy5sYXlvdXROb2RlKSB7XG4gICAgICB0aGlzLm9wdGlvbnMgPSBfLmNsb25lRGVlcCh0aGlzLmxheW91dE5vZGUub3B0aW9ucyk7XG4gICAgICB0aGlzLndpZGdldExheW91dE5vZGUgPSB7XG4gICAgICAgIC4uLnRoaXMubGF5b3V0Tm9kZSxcbiAgICAgICAgb3B0aW9uczogXy5jbG9uZURlZXAodGhpcy5sYXlvdXROb2RlLm9wdGlvbnMpXG4gICAgICB9O1xuICAgICAgdGhpcy53aWRnZXRPcHRpb25zID0gdGhpcy53aWRnZXRMYXlvdXROb2RlLm9wdGlvbnM7XG4gICAgICB0aGlzLmZvcm1Db250cm9sID0gdGhpcy5qc2YuZ2V0Rm9ybUNvbnRyb2wodGhpcyk7XG5cbiAgICAgIHRoaXMub3B0aW9ucy5pc0lucHV0V2lkZ2V0ID0gaW5BcnJheSh0aGlzLmxheW91dE5vZGUudHlwZSwgW1xuICAgICAgICAnYnV0dG9uJywgJ2NoZWNrYm94JywgJ2NoZWNrYm94ZXMtaW5saW5lJywgJ2NoZWNrYm94ZXMnLCAnY29sb3InLFxuICAgICAgICAnZGF0ZScsICdkYXRldGltZS1sb2NhbCcsICdkYXRldGltZScsICdlbWFpbCcsICdmaWxlJywgJ2hpZGRlbicsXG4gICAgICAgICdpbWFnZScsICdpbnRlZ2VyJywgJ21vbnRoJywgJ251bWJlcicsICdwYXNzd29yZCcsICdyYWRpbycsXG4gICAgICAgICdyYWRpb2J1dHRvbnMnLCAncmFkaW9zLWlubGluZScsICdyYWRpb3MnLCAncmFuZ2UnLCAncmVzZXQnLCAnc2VhcmNoJyxcbiAgICAgICAgJ3NlbGVjdCcsICdzdWJtaXQnLCAndGVsJywgJ3RleHQnLCAndGV4dGFyZWEnLCAndGltZScsICd1cmwnLCAnd2VlaydcbiAgICAgIF0pO1xuXG4gICAgICB0aGlzLm9wdGlvbnMudGl0bGUgPSB0aGlzLnNldFRpdGxlKCk7XG5cbiAgICAgIHRoaXMub3B0aW9ucy5odG1sQ2xhc3MgPVxuICAgICAgICBhZGRDbGFzc2VzKHRoaXMub3B0aW9ucy5odG1sQ2xhc3MsICdzY2hlbWEtZm9ybS0nICsgdGhpcy5sYXlvdXROb2RlLnR5cGUpO1xuICAgICAgdGhpcy5vcHRpb25zLmh0bWxDbGFzcyA9XG4gICAgICAgIHRoaXMubGF5b3V0Tm9kZS50eXBlID09PSAnYXJyYXknID9cbiAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMub3B0aW9ucy5odG1sQ2xhc3MsICdsaXN0LWdyb3VwJykgOlxuICAgICAgICAgIHRoaXMubGF5b3V0Tm9kZS5hcnJheUl0ZW0gJiYgdGhpcy5sYXlvdXROb2RlLnR5cGUgIT09ICckcmVmJyA/XG4gICAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMub3B0aW9ucy5odG1sQ2xhc3MsICdsaXN0LWdyb3VwLWl0ZW0nKSA6XG4gICAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMub3B0aW9ucy5odG1sQ2xhc3MsICdmb3JtLWdyb3VwJyk7XG4gICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzID0gJyc7XG4gICAgICB0aGlzLm9wdGlvbnMubGFiZWxIdG1sQ2xhc3MgPVxuICAgICAgICBhZGRDbGFzc2VzKHRoaXMub3B0aW9ucy5sYWJlbEh0bWxDbGFzcywgJ2NvbnRyb2wtbGFiZWwnKTtcbiAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5hY3RpdmVDbGFzcyA9XG4gICAgICAgIGFkZENsYXNzZXModGhpcy53aWRnZXRPcHRpb25zLmFjdGl2ZUNsYXNzLCAnYWN0aXZlJyk7XG4gICAgICB0aGlzLm9wdGlvbnMuZmllbGRBZGRvbkxlZnQgPVxuICAgICAgICB0aGlzLm9wdGlvbnMuZmllbGRBZGRvbkxlZnQgfHwgdGhpcy5vcHRpb25zLnByZXBlbmQ7XG4gICAgICB0aGlzLm9wdGlvbnMuZmllbGRBZGRvblJpZ2h0ID1cbiAgICAgICAgdGhpcy5vcHRpb25zLmZpZWxkQWRkb25SaWdodCB8fCB0aGlzLm9wdGlvbnMuYXBwZW5kO1xuXG4gICAgICAvLyBBZGQgYXN0ZXJpc2sgdG8gdGl0bGVzIGlmIHJlcXVpcmVkXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnRpdGxlICYmIHRoaXMubGF5b3V0Tm9kZS50eXBlICE9PSAndGFiJyAmJlxuICAgICAgICAhdGhpcy5vcHRpb25zLm5vdGl0bGUgJiYgdGhpcy5vcHRpb25zLnJlcXVpcmVkICAmJlxuICAgICAgICAhdGhpcy5vcHRpb25zLnRpdGxlLmluY2x1ZGVzKCcqJylcbiAgICAgICkge1xuICAgICAgICB0aGlzLm9wdGlvbnMudGl0bGUgKz0gJyA8c3Ryb25nIGNsYXNzPVwidGV4dC1kYW5nZXJcIj4qPC9zdHJvbmc+JztcbiAgICAgIH1cbiAgICAgIC8vIFNldCBtaXNjZWxhbmVvdXMgc3R5bGVzIGFuZCBzZXR0aW5ncyBmb3IgZWFjaCBjb250cm9sIHR5cGVcbiAgICAgIHN3aXRjaCAodGhpcy5sYXlvdXROb2RlLnR5cGUpIHtcbiAgICAgICAgLy8gQ2hlY2tib3ggY29udHJvbHNcbiAgICAgICAgY2FzZSAnY2hlY2tib3gnOiBjYXNlICdjaGVja2JveGVzJzpcbiAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcywgJ2NoZWNrYm94Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjaGVja2JveGVzLWlubGluZSc6XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzLCAnY2hlY2tib3gnKTtcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaXRlbUxhYmVsSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5pdGVtTGFiZWxIdG1sQ2xhc3MsICdjaGVja2JveC1pbmxpbmUnKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8gUmFkaW8gY29udHJvbHNcbiAgICAgICAgY2FzZSAncmFkaW8nOiBjYXNlICdyYWRpb3MnOlxuICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzLCAncmFkaW8nKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3JhZGlvcy1pbmxpbmUnOlxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcywgJ3JhZGlvJyk7XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLml0ZW1MYWJlbEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaXRlbUxhYmVsSHRtbENsYXNzLCAncmFkaW8taW5saW5lJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIEJ1dHRvbiBzZXRzIC0gY2hlY2tib3hidXR0b25zIGFuZCByYWRpb2J1dHRvbnNcbiAgICAgICAgY2FzZSAnY2hlY2tib3hidXR0b25zJzogY2FzZSAncmFkaW9idXR0b25zJzpcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MsICdidG4tZ3JvdXAnKTtcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaXRlbUxhYmVsSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5pdGVtTGFiZWxIdG1sQ2xhc3MsICdidG4nKTtcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaXRlbUxhYmVsSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5pdGVtTGFiZWxIdG1sQ2xhc3MsIHRoaXMub3B0aW9ucy5zdHlsZSB8fCAnYnRuLWRlZmF1bHQnKTtcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzLCAnc3Itb25seScpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgLy8gU2luZ2xlIGJ1dHRvbiBjb250cm9sc1xuICAgICAgICBjYXNlICdidXR0b24nOiBjYXNlICdzdWJtaXQnOlxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MsICdidG4nKTtcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzLCB0aGlzLm9wdGlvbnMuc3R5bGUgfHwgJ2J0bi1pbmZvJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICAvLyBDb250YWluZXJzIC0gYXJyYXlzIGFuZCBmaWVsZHNldHNcbiAgICAgICAgY2FzZSAnYXJyYXknOiBjYXNlICdmaWVsZHNldCc6IGNhc2UgJ3NlY3Rpb24nOiBjYXNlICdjb25kaXRpb25hbCc6XG4gICAgICAgIGNhc2UgJ2FkdmFuY2VkZmllbGRzZXQnOiBjYXNlICdhdXRoZmllbGRzZXQnOlxuICAgICAgICBjYXNlICdzZWxlY3RmaWVsZHNldCc6IGNhc2UgJ29wdGlvbmZpZWxkc2V0JzpcbiAgICAgICAgICB0aGlzLm9wdGlvbnMubWVzc2FnZUxvY2F0aW9uID0gJ3RvcCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd0YWJhcnJheSc6IGNhc2UgJ3RhYnMnOlxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcywgJ3RhYi1jb250ZW50Jyk7XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcywgJ3RhYi1wYW5lJyk7XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmxhYmVsSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5sYWJlbEh0bWxDbGFzcywgJ25hdiBuYXYtdGFicycpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgLy8gJ0FkZCcgYnV0dG9ucyAtIHJlZmVyZW5jZXNcbiAgICAgICAgY2FzZSAnJHJlZic6XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcywgJ2J0biBwdWxsLXJpZ2h0Jyk7XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcywgdGhpcy5vcHRpb25zLnN0eWxlIHx8ICdidG4tZGVmYXVsdCcpO1xuICAgICAgICAgIHRoaXMub3B0aW9ucy5pY29uID0gJ2dseXBoaWNvbiBnbHlwaGljb24tcGx1cyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICAvLyBEZWZhdWx0IC0gaW5jbHVkaW5nIHJlZ3VsYXIgaW5wdXRzXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcywgJ2Zvcm0tY29udHJvbCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5mb3JtQ29udHJvbCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUhlbHBCbG9jayh0aGlzLmZvcm1Db250cm9sLnN0YXR1cyk7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoc3RhdHVzID0+IHRoaXMudXBkYXRlSGVscEJsb2NrKHN0YXR1cykpO1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcpIHtcbiAgICAgICAgICBjb25zdCB2YXJzOiBhbnlbXSA9IFtdO1xuICAgICAgICAgIHRoaXMuZGVidWdPdXRwdXQgPSBfLm1hcCh2YXJzLCB0aGlzVmFyID0+IEpTT04uc3RyaW5naWZ5KHRoaXNWYXIsIG51bGwsIDIpKS5qb2luKCdcXG4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5mcmFtZXdvcmtJbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG4gIH1cblxuICB1cGRhdGVIZWxwQmxvY2soc3RhdHVzKSB7XG4gICAgdGhpcy5vcHRpb25zLmhlbHBCbG9jayA9IHN0YXR1cyA9PT0gJ0lOVkFMSUQnICYmXG4gICAgICB0aGlzLm9wdGlvbnMuZW5hYmxlRXJyb3JTdGF0ZSAmJiB0aGlzLmZvcm1Db250cm9sLmVycm9ycyAmJlxuICAgICAgKHRoaXMuZm9ybUNvbnRyb2wuZGlydHkgfHwgdGhpcy5vcHRpb25zLmZlZWRiYWNrT25SZW5kZXIpID9cbiAgICAgICAgdGhpcy5qc2YuZm9ybWF0RXJyb3JzKHRoaXMuZm9ybUNvbnRyb2wuZXJyb3JzLCB0aGlzLm9wdGlvbnMudmFsaWRhdGlvbk1lc3NhZ2VzKSA6XG4gICAgICAgIHRoaXMub3B0aW9ucy5kZXNjcmlwdGlvbiB8fCB0aGlzLm9wdGlvbnMuaGVscCB8fCBudWxsO1xuICB9XG5cbiAgc2V0VGl0bGUoKTogc3RyaW5nIHtcbiAgICBzd2l0Y2ggKHRoaXMubGF5b3V0Tm9kZS50eXBlKSB7XG4gICAgICBjYXNlICdidXR0b24nOiBjYXNlICdjaGVja2JveCc6IGNhc2UgJ3NlY3Rpb24nOiBjYXNlICdoZWxwJzogY2FzZSAnbXNnJzpcbiAgICAgIGNhc2UgJ3N1Ym1pdCc6IGNhc2UgJ21lc3NhZ2UnOiBjYXNlICd0YWJhcnJheSc6IGNhc2UgJ3RhYnMnOiBjYXNlICckcmVmJzpcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICBjYXNlICdhZHZhbmNlZGZpZWxkc2V0JzpcbiAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmV4cGFuZGFibGUgPSB0cnVlO1xuICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMudGl0bGUgPSAnQWR2YW5jZWQgb3B0aW9ucyc7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgY2FzZSAnYXV0aGZpZWxkc2V0JzpcbiAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmV4cGFuZGFibGUgPSB0cnVlO1xuICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMudGl0bGUgPSAnQXV0aGVudGljYXRpb24gc2V0dGluZ3MnO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIGNhc2UgJ2ZpZWxkc2V0JzpcbiAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLnRpdGxlID0gdGhpcy5vcHRpb25zLnRpdGxlO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy50aXRsZSA9IG51bGw7XG4gICAgICAgIHJldHVybiB0aGlzLmpzZi5zZXRJdGVtVGl0bGUodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlSXRlbSgpIHtcbiAgICB0aGlzLmpzZi5yZW1vdmVJdGVtKHRoaXMpO1xuICB9XG59XG4iXX0=