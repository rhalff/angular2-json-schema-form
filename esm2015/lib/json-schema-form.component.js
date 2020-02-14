var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as _ from 'lodash';
import { FrameworkLibraryService, JsonSchemaFormService, WidgetLibraryService, } from '@ngsf/widget-library';
import { hasValue, inArray, isArray, isEmpty, isObject, forEach, hasOwn, JsonPointer, resolveSchemaReferences, convertSchemaToDraft6, } from '@ngsf/common';
export const JSON_SCHEMA_FORM_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JsonSchemaFormComponent),
    multi: true,
};
let JsonSchemaFormComponent = class JsonSchemaFormComponent {
    constructor(changeDetector, frameworkLibrary, widgetLibrary, jsf, sanitizer) {
        this.changeDetector = changeDetector;
        this.frameworkLibrary = frameworkLibrary;
        this.widgetLibrary = widgetLibrary;
        this.jsf = jsf;
        this.sanitizer = sanitizer;
        this.formValueSubscription = null;
        this.formInitialized = false;
        this.objectWrap = false;
        this.previousInputs = {
            schema: null,
            layout: null,
            data: null,
            options: null,
            framework: null,
            widgets: null,
            form: null,
            model: null,
            JSONSchema: null,
            UISchema: null,
            formData: null,
            loadExternalAssets: null,
            debug: null,
        };
        this.onChanges = new EventEmitter();
        this.onSubmit = new EventEmitter();
        this.isValid = new EventEmitter();
        this.validationErrors = new EventEmitter();
        this.formSchema = new EventEmitter();
        this.formLayout = new EventEmitter();
        this.dataChange = new EventEmitter();
        this.modelChange = new EventEmitter();
        this.formDataChange = new EventEmitter();
        this.ngModelChange = new EventEmitter();
    }
    get value() {
        return this.objectWrap ? this.jsf.data['1'] : this.jsf.data;
    }
    set value(value) {
        this.setFormValues(value, false);
    }
    get stylesheets() {
        const stylesheets = this.frameworkLibrary.getFrameworkStylesheets();
        const load = this.sanitizer.bypassSecurityTrustResourceUrl;
        return stylesheets.map(stylesheet => load(stylesheet));
    }
    get scripts() {
        const scripts = this.frameworkLibrary.getFrameworkScripts();
        const load = this.sanitizer.bypassSecurityTrustResourceUrl;
        return scripts.map(script => load(script));
    }
    ngOnInit() {
        this.updateForm();
    }
    ngOnChanges() {
        this.updateForm();
    }
    writeValue(value) {
        this.setFormValues(value, false);
        if (!this.formValuesInput) {
            this.formValuesInput = 'ngModel';
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        if (this.jsf.formOptions.formDisabled !== !!isDisabled) {
            this.jsf.formOptions.formDisabled = !!isDisabled;
            this.initializeForm();
        }
    }
    updateForm() {
        if (!this.formInitialized ||
            !this.formValuesInput ||
            (this.language && this.language !== this.jsf.language)) {
            this.initializeForm();
        }
        else {
            if (this.language && this.language !== this.jsf.language) {
                this.jsf.setLanguage(this.language);
            }
            let changedInput = Object.keys(this.previousInputs).filter(input => this.previousInputs[input] !== this[input]);
            let resetFirst = true;
            if (changedInput.length === 1 &&
                changedInput[0] === 'form' &&
                this.formValuesInput.startsWith('form.')) {
                changedInput = Object.keys(this.previousInputs.form || {})
                    .filter(key => !_.isEqual(this.previousInputs.form[key], this.form[key]))
                    .map(key => `form.${key}`);
                resetFirst = false;
            }
            if (changedInput.length === 1 &&
                changedInput[0] === this.formValuesInput) {
                if (this.formValuesInput.indexOf('.') === -1) {
                    this.setFormValues(this[this.formValuesInput], resetFirst);
                }
                else {
                    const [input, key] = this.formValuesInput.split('.');
                    this.setFormValues(this[input][key], resetFirst);
                }
            }
            else if (changedInput.length) {
                this.initializeForm();
                if (this.onChange) {
                    this.onChange(this.jsf.formValues);
                }
                if (this.onTouched) {
                    this.onTouched(this.jsf.formValues);
                }
            }
            Object.keys(this.previousInputs)
                .filter(input => this.previousInputs[input] !== this[input])
                .forEach(input => (this.previousInputs[input] = this[input]));
        }
    }
    setFormValues(formValues, resetFirst = true) {
        if (formValues) {
            const newFormValues = this.objectWrap ? formValues['1'] : formValues;
            if (!this.jsf.formGroup) {
                this.jsf.formValues = formValues;
                this.activateForm();
            }
            else if (resetFirst) {
                this.jsf.formGroup.reset();
            }
            if (this.jsf.formGroup) {
                this.jsf.formGroup.patchValue(newFormValues);
            }
            if (this.onChange) {
                this.onChange(newFormValues);
            }
            if (this.onTouched) {
                this.onTouched(newFormValues);
            }
        }
        else {
            this.jsf.formGroup.reset();
        }
    }
    submitForm() {
        const validData = this.jsf.validData;
        this.onSubmit.emit(this.objectWrap ? validData['1'] : validData);
    }
    initializeForm() {
        if (this.schema ||
            this.layout ||
            this.data ||
            this.form ||
            this.model ||
            this.JSONSchema ||
            this.UISchema ||
            this.formData ||
            this.ngModel ||
            this.jsf.data) {
            this.jsf.resetAllValues();
            this.initializeOptions();
            this.initializeSchema();
            this.initializeLayout();
            this.initializeData();
            this.activateForm();
            if (this.debug || this.jsf.formOptions.debug) {
                const vars = [];
                this.debugOutput = vars.map(v => JSON.stringify(v, null, 2)).join('\n');
            }
            this.formInitialized = true;
        }
    }
    initializeOptions() {
        if (this.language && this.language !== this.jsf.language) {
            this.jsf.setLanguage(this.language);
        }
        this.jsf.setOptions({ debug: !!this.debug });
        let loadExternalAssets = this.loadExternalAssets || false;
        let framework = this.framework || 'default';
        if (isObject(this.options)) {
            this.jsf.setOptions(this.options);
            loadExternalAssets = this.options.loadExternalAssets || loadExternalAssets;
            framework = this.options.framework || framework;
        }
        if (isObject(this.form) && isObject(this.form.options)) {
            this.jsf.setOptions(this.form.options);
            loadExternalAssets =
                this.form.options.loadExternalAssets || loadExternalAssets;
            framework = this.form.options.framework || framework;
        }
        if (isObject(this.widgets)) {
            this.jsf.setOptions({ widgets: this.widgets });
        }
        this.frameworkLibrary.setLoadExternalAssets(loadExternalAssets);
        this.frameworkLibrary.setFramework(framework);
        this.jsf.framework = this.frameworkLibrary.getFramework();
        if (isObject(this.jsf.formOptions.widgets)) {
            for (const widget of Object.keys(this.jsf.formOptions.widgets)) {
                this.widgetLibrary.registerWidget(widget, this.jsf.formOptions.widgets[widget]);
            }
        }
        if (isObject(this.form) && isObject(this.form.tpldata)) {
            this.jsf.setTpldata(this.form.tpldata);
        }
    }
    initializeSchema() {
        if (isObject(this.schema)) {
            this.jsf.AngularSchemaFormCompatibility = true;
            this.jsf.schema = _.cloneDeep(this.schema);
        }
        else if (hasOwn(this.form, 'schema') && isObject(this.form.schema)) {
            this.jsf.schema = _.cloneDeep(this.form.schema);
        }
        else if (isObject(this.JSONSchema)) {
            this.jsf.ReactJsonSchemaFormCompatibility = true;
            this.jsf.schema = _.cloneDeep(this.JSONSchema);
        }
        else if (hasOwn(this.form, 'JSONSchema') &&
            isObject(this.form.JSONSchema)) {
            this.jsf.ReactJsonSchemaFormCompatibility = true;
            this.jsf.schema = _.cloneDeep(this.form.JSONSchema);
        }
        else if (hasOwn(this.form, 'properties') &&
            isObject(this.form.properties)) {
            this.jsf.schema = _.cloneDeep(this.form);
        }
        else if (isObject(this.form)) {
        }
        if (!isEmpty(this.jsf.schema)) {
            if (inArray('object', this.jsf.schema.type)) {
                this.jsf.schema.type = 'object';
            }
            if (hasOwn(this.jsf.schema, 'type') &&
                this.jsf.schema.type !== 'object') {
                this.jsf.schema = {
                    type: 'object',
                    properties: { 1: this.jsf.schema },
                };
                this.objectWrap = true;
            }
            else if (!hasOwn(this.jsf.schema, 'type')) {
                if (isObject(this.jsf.schema.properties) ||
                    isObject(this.jsf.schema.patternProperties) ||
                    isObject(this.jsf.schema.additionalProperties)) {
                    this.jsf.schema.type = 'object';
                }
                else {
                    this.jsf.JsonFormCompatibility = true;
                    this.jsf.schema = {
                        type: 'object',
                        properties: this.jsf.schema,
                    };
                }
            }
            this.jsf.schema = convertSchemaToDraft6(this.jsf.schema);
            this.jsf.compileAjvSchema();
            this.jsf.schema = resolveSchemaReferences(this.jsf.schema, this.jsf.schemaRefLibrary, this.jsf.schemaRecursiveRefMap, this.jsf.dataRecursiveRefMap, this.jsf.arrayMap);
            if (hasOwn(this.jsf.schemaRefLibrary, '')) {
                this.jsf.hasRootReference = true;
            }
        }
    }
    initializeData() {
        if (hasValue(this.data)) {
            this.jsf.formValues = _.cloneDeep(this.data);
            this.formValuesInput = 'data';
        }
        else if (hasValue(this.model)) {
            this.jsf.AngularSchemaFormCompatibility = true;
            this.jsf.formValues = _.cloneDeep(this.model);
            this.formValuesInput = 'model';
        }
        else if (hasValue(this.ngModel)) {
            this.jsf.AngularSchemaFormCompatibility = true;
            this.jsf.formValues = _.cloneDeep(this.ngModel);
            this.formValuesInput = 'ngModel';
        }
        else if (isObject(this.form) && hasValue(this.form.value)) {
            this.jsf.JsonFormCompatibility = true;
            this.jsf.formValues = _.cloneDeep(this.form.value);
            this.formValuesInput = 'form.value';
        }
        else if (isObject(this.form) && hasValue(this.form.data)) {
            this.jsf.formValues = _.cloneDeep(this.form.data);
            this.formValuesInput = 'form.data';
        }
        else if (hasValue(this.formData)) {
            this.jsf.ReactJsonSchemaFormCompatibility = true;
            this.formValuesInput = 'formData';
        }
        else if (hasOwn(this.form, 'formData') && hasValue(this.form.formData)) {
            this.jsf.ReactJsonSchemaFormCompatibility = true;
            this.jsf.formValues = _.cloneDeep(this.form.formData);
            this.formValuesInput = 'form.formData';
        }
        else {
            this.formValuesInput = null;
        }
    }
    initializeLayout() {
        const fixJsonFormOptions = (layout) => {
            if (isObject(layout) || isArray(layout)) {
                forEach(layout, (value, key) => {
                    if (hasOwn(value, 'options') && isObject(value.options)) {
                        value.titleMap = value.options;
                        delete value.options;
                    }
                }, 'top-down');
            }
            return layout;
        };
        if (isArray(this.layout)) {
            this.jsf.layout = _.cloneDeep(this.layout);
        }
        else if (isArray(this.form)) {
            this.jsf.AngularSchemaFormCompatibility = true;
            this.jsf.layout = _.cloneDeep(this.form);
        }
        else if (this.form && isArray(this.form.form)) {
            this.jsf.JsonFormCompatibility = true;
            this.jsf.layout = fixJsonFormOptions(_.cloneDeep(this.form.form));
        }
        else if (this.form && isArray(this.form.layout)) {
            this.jsf.layout = _.cloneDeep(this.form.layout);
        }
        else {
            this.jsf.layout = ['*'];
        }
        let alternateLayout = null;
        if (isObject(this.UISchema)) {
            this.jsf.ReactJsonSchemaFormCompatibility = true;
            alternateLayout = _.cloneDeep(this.UISchema);
        }
        else if (hasOwn(this.form, 'UISchema')) {
            this.jsf.ReactJsonSchemaFormCompatibility = true;
            alternateLayout = _.cloneDeep(this.form.UISchema);
        }
        else if (hasOwn(this.form, 'uiSchema')) {
            this.jsf.ReactJsonSchemaFormCompatibility = true;
            alternateLayout = _.cloneDeep(this.form.uiSchema);
        }
        else if (hasOwn(this.form, 'customFormItems')) {
            this.jsf.JsonFormCompatibility = true;
            alternateLayout = fixJsonFormOptions(_.cloneDeep(this.form.customFormItems));
        }
        if (alternateLayout) {
            JsonPointer.forEachDeep(alternateLayout, (value, pointer) => {
                const schemaPointer = pointer
                    .replace(/\//g, '/properties/')
                    .replace(/\/properties\/items\/properties\//g, '/items/properties/')
                    .replace(/\/properties\/titleMap\/properties\//g, '/titleMap/properties/');
                if (hasValue(value) && hasValue(pointer)) {
                    let key = JsonPointer.toKey(pointer);
                    const groupPointer = (JsonPointer.parse(schemaPointer) || []).slice(0, -2);
                    let itemPointer;
                    if (key.toLowerCase() === 'ui:order') {
                        itemPointer = [...groupPointer, 'ui:order'];
                    }
                    else {
                        if (key.slice(0, 3).toLowerCase() === 'ui:') {
                            key = key.slice(3);
                        }
                        itemPointer = [...groupPointer, 'x-schema-form', key];
                    }
                    if (JsonPointer.has(this.jsf.schema, groupPointer) &&
                        !JsonPointer.has(this.jsf.schema, itemPointer)) {
                        JsonPointer.set(this.jsf.schema, itemPointer, value);
                    }
                }
            });
        }
    }
    activateForm() {
        if (isEmpty(this.jsf.schema)) {
            if (!isEmpty(this.jsf.formValues)) {
                this.jsf.buildSchemaFromData();
            }
        }
        if (!isEmpty(this.jsf.schema)) {
            this.jsf.compileAjvSchema();
            this.jsf.buildLayout(this.widgetLibrary);
            this.jsf.buildFormGroupTemplate(this.jsf.formValues);
            this.jsf.buildFormGroup();
        }
        if (this.jsf.formGroup) {
            if (!isEmpty(this.jsf.formValues) &&
                this.jsf.formOptions.setSchemaDefaults !== true &&
                this.jsf.formOptions.setLayoutDefaults !== true) {
                this.setFormValues(this.jsf.formValues);
            }
            this.jsf.dataChanges.subscribe(data => {
                this.onChanges.emit(this.objectWrap ? data['1'] : data);
                if (this.formValuesInput && this.formValuesInput.indexOf('.') === -1) {
                    this[`${this.formValuesInput}Change`].emit(this.objectWrap ? data['1'] : data);
                }
            });
            this.jsf.formGroup.statusChanges.subscribe(() => this.changeDetector.markForCheck());
            this.jsf.isValidChanges.subscribe(isValid => this.isValid.emit(isValid));
            this.jsf.validationErrorChanges.subscribe(err => this.validationErrors.emit(err));
            this.formSchema.emit(this.jsf.schema);
            this.formLayout.emit(this.jsf.layout);
            this.onChanges.emit(this.objectWrap ? this.jsf.data['1'] : this.jsf.data);
            const validateOnRender = JsonPointer.get(this.jsf, '/formOptions/validateOnRender');
            if (validateOnRender) {
                const touchAll = control => {
                    if (validateOnRender === true || hasValue(control.value)) {
                        control.markAsTouched();
                    }
                    Object.keys(control.controls || {}).forEach(key => touchAll(control.controls[key]));
                };
                touchAll(this.jsf.formGroup);
                this.isValid.emit(this.jsf.isValid);
                this.validationErrors.emit(this.jsf.ajvErrors);
            }
        }
    }
};
JsonSchemaFormComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: FrameworkLibraryService },
    { type: WidgetLibraryService },
    { type: JsonSchemaFormService },
    { type: DomSanitizer }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], JsonSchemaFormComponent.prototype, "schema", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], JsonSchemaFormComponent.prototype, "layout", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], JsonSchemaFormComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], JsonSchemaFormComponent.prototype, "options", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], JsonSchemaFormComponent.prototype, "framework", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], JsonSchemaFormComponent.prototype, "widgets", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], JsonSchemaFormComponent.prototype, "form", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], JsonSchemaFormComponent.prototype, "model", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], JsonSchemaFormComponent.prototype, "JSONSchema", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], JsonSchemaFormComponent.prototype, "UISchema", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], JsonSchemaFormComponent.prototype, "formData", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], JsonSchemaFormComponent.prototype, "ngModel", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], JsonSchemaFormComponent.prototype, "language", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], JsonSchemaFormComponent.prototype, "loadExternalAssets", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], JsonSchemaFormComponent.prototype, "debug", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], JsonSchemaFormComponent.prototype, "onChanges", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], JsonSchemaFormComponent.prototype, "onSubmit", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], JsonSchemaFormComponent.prototype, "isValid", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], JsonSchemaFormComponent.prototype, "validationErrors", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], JsonSchemaFormComponent.prototype, "formSchema", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], JsonSchemaFormComponent.prototype, "formLayout", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], JsonSchemaFormComponent.prototype, "dataChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], JsonSchemaFormComponent.prototype, "modelChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], JsonSchemaFormComponent.prototype, "formDataChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], JsonSchemaFormComponent.prototype, "ngModelChange", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], JsonSchemaFormComponent.prototype, "value", null);
JsonSchemaFormComponent = __decorate([
    Component({
        selector: 'json-schema-form',
        template: `
    <div *ngFor="let stylesheet of stylesheets">
      <link rel="stylesheet" [href]="stylesheet" />
    </div>
    <div *ngFor="let script of scripts">
      <script type="text/javascript" [src]="script"></script>
    </div>
    <form class="json-schema-form" (ngSubmit)="submitForm()">
      <root-widget [layout]="jsf?.layout"></root-widget>
    </form>
    <div *ngIf="debug || jsf?.formOptions?.debug">
      Debug output:
      <pre>{{ debugOutput }}</pre>
    </div>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        providers: [JsonSchemaFormService, JSON_SCHEMA_FORM_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef,
        FrameworkLibraryService,
        WidgetLibraryService,
        JsonSchemaFormService,
        DomSanitizer])
], JsonSchemaFormComponent);
export { JsonSchemaFormComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zY2hlbWEtZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdzZi9qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2pzb24tc2NoZW1hLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQTtBQUN0QixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUE7QUFDdEUsT0FBTyxFQUFDLFlBQVksRUFBRSxlQUFlLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQTtBQUN2RSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQTtBQUMzQixPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLHFCQUFxQixFQUNyQixvQkFBb0IsR0FDckIsTUFBTSxzQkFBc0IsQ0FBQTtBQUM3QixPQUFPLEVBQ0wsUUFBUSxFQUNSLE9BQU8sRUFDUCxPQUFPLEVBQ1AsT0FBTyxFQUNQLFFBQVEsRUFDUixPQUFPLEVBQ1AsTUFBTSxFQUNOLFdBQVcsRUFDWCx1QkFBdUIsRUFDdkIscUJBQXFCLEdBQ3RCLE1BQU0sY0FBYyxDQUFBO0FBRXJCLE1BQU0sQ0FBQyxNQUFNLCtCQUErQixHQUFRO0lBQ2xELE9BQU8sRUFBRSxpQkFBaUI7SUFFMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztJQUN0RCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUE7QUEwREQsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7SUF1RmxDLFlBQ1UsY0FBaUMsRUFDakMsZ0JBQXlDLEVBQ3pDLGFBQW1DLEVBQ3BDLEdBQTBCLEVBQ3pCLFNBQXVCO1FBSnZCLG1CQUFj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QWlCO1FBQ2YsdUJBQXVCO1FBQzFCLG9CQUFvQjtRQUMvQixxQkFBcUI7UUFDZCxZQUFZO0dBNUZ0Qix1QkFBdUIsQ0Fnc0JuQztTQWhzQlksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXG5pbXBvcnQge0RvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJ1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQge1xuICBGcmFtZXdvcmtMaWJyYXJ5U2VydmljZSxcbiAgSnNvblNjaGVtYUZvcm1TZXJ2aWNlLFxuICBXaWRnZXRMaWJyYXJ5U2VydmljZSxcbn0gZnJvbSAnQG5nc2Yvd2lkZ2V0LWxpYnJhcnknXG5pbXBvcnQge1xuICBoYXNWYWx1ZSxcbiAgaW5BcnJheSxcbiAgaXNBcnJheSxcbiAgaXNFbXB0eSxcbiAgaXNPYmplY3QsXG4gIGZvckVhY2gsXG4gIGhhc093bixcbiAgSnNvblBvaW50ZXIsXG4gIHJlc29sdmVTY2hlbWFSZWZlcmVuY2VzLFxuICBjb252ZXJ0U2NoZW1hVG9EcmFmdDYsXG59IGZyb20gJ0BuZ3NmL2NvbW1vbidcblxuZXhwb3J0IGNvbnN0IEpTT05fU0NIRU1BX0ZPUk1fVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlY2xhcmVcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSnNvblNjaGVtYUZvcm1Db21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn1cblxuLyoqXG4gKiBBbmd1bGFyIEpTT04gU2NoZW1hIEZvcm1cbiAqXG4gKiBSb290IG1vZHVsZSBvZiB0aGUgQW5ndWxhciBKU09OIFNjaGVtYSBGb3JtIGNsaWVudC1zaWRlIGxpYnJhcnksXG4gKiBhbiBBbmd1bGFyIGxpYnJhcnkgd2hpY2ggZ2VuZXJhdGVzIGFuIEhUTUwgZm9ybSBmcm9tIGEgSlNPTiBzY2hlbWFcbiAqIHN0cnVjdHVyZWQgZGF0YSBtb2RlbCBhbmQvb3IgYSBKU09OIFNjaGVtYSBGb3JtIGxheW91dCBkZXNjcmlwdGlvbi5cbiAqXG4gKiBUaGlzIGxpYnJhcnkgYWxzbyB2YWxpZGF0ZXMgaW5wdXQgZGF0YSBieSB0aGUgdXNlciwgdXNpbmcgYm90aCB2YWxpZGF0b3JzIG9uXG4gKiBpbmRpdmlkdWFsIGNvbnRyb2xzIHRvIHByb3ZpZGUgcmVhbC10aW1lIGZlZWRiYWNrIHdoaWxlIHRoZSB1c2VyIGlzIGZpbGxpbmdcbiAqIG91dCB0aGUgZm9ybSwgYW5kIHRoZW4gdmFsaWRhdGluZyB0aGUgZW50aXJlIGlucHV0IGFnYWluc3QgdGhlIHNjaGVtYSB3aGVuXG4gKiB0aGUgZm9ybSBpcyBzdWJtaXR0ZWQgdG8gbWFrZSBzdXJlIHRoZSByZXR1cm5lZCBKU09OIGRhdGEgb2JqZWN0IGlzIHZhbGlkLlxuICpcbiAqIFRoaXMgbGlicmFyeSBpcyBzaW1pbGFyIHRvLCBhbmQgbW9zdGx5IEFQSSBjb21wYXRpYmxlIHdpdGg6XG4gKlxuICogLSBKU09OIFNjaGVtYSBGb3JtJ3MgQW5ndWxhciBTY2hlbWEgRm9ybSBsaWJyYXJ5IGZvciBBbmd1bGFySnNcbiAqICAgaHR0cDovL3NjaGVtYWZvcm0uaW9cbiAqICAgaHR0cDovL3NjaGVtYWZvcm0uaW8vZXhhbXBsZXMvYm9vdHN0cmFwLWV4YW1wbGUuaHRtbCAoZXhhbXBsZXMpXG4gKlxuICogLSBNb3ppbGxhJ3MgcmVhY3QtanNvbnNjaGVtYS1mb3JtIGxpYnJhcnkgZm9yIFJlYWN0XG4gKiAgIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhLXNlcnZpY2VzL3JlYWN0LWpzb25zY2hlbWEtZm9ybVxuICogICBodHRwczovL21vemlsbGEtc2VydmljZXMuZ2l0aHViLmlvL3JlYWN0LWpzb25zY2hlbWEtZm9ybSAoZXhhbXBsZXMpXG4gKlxuICogLSBKb3NoZmlyZSdzIEpTT04gRm9ybSBsaWJyYXJ5IGZvciBqUXVlcnlcbiAqICAgaHR0cHM6Ly9naXRodWIuY29tL2pvc2hmaXJlL2pzb25mb3JtXG4gKiAgIGh0dHA6Ly91bGlvbi5naXRodWIuaW8vanNvbmZvcm0vcGxheWdyb3VuZCAoZXhhbXBsZXMpXG4gKlxuICogVGhpcyBsaWJyYXJ5IGRlcGVuZHMgb246XG4gKiAgLSBBbmd1bGFyIChvYnZpb3VzbHkpICAgICAgICAgICAgICAgICAgaHR0cHM6Ly9hbmd1bGFyLmlvXG4gKiAgLSBsb2Rhc2gsIEphdmFTY3JpcHQgdXRpbGl0eSBsaWJyYXJ5ICAgaHR0cHM6Ly9naXRodWIuY29tL2xvZGFzaC9sb2Rhc2hcbiAqICAtIGFqdiwgQW5vdGhlciBKU09OIFNjaGVtYSB2YWxpZGF0b3IgICBodHRwczovL2dpdGh1Yi5jb20vZXBvYmVyZXpraW4vYWp2XG4gKlxuICogSW4gYWRkaXRpb24sIHRoZSBFeGFtcGxlIFBsYXlncm91bmQgYWxzbyBkZXBlbmRzIG9uOlxuICogIC0gYnJhY2UsIEJyb3dzZXJpZmllZCBBY2UgZWRpdG9yICAgICAgIGh0dHA6Ly90aGxvcmVuei5naXRodWIuaW8vYnJhY2VcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnanNvbi1zY2hlbWEtZm9ybScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgc3R5bGVzaGVldCBvZiBzdHlsZXNoZWV0c1wiPlxuICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIFtocmVmXT1cInN0eWxlc2hlZXRcIiAvPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgKm5nRm9yPVwibGV0IHNjcmlwdCBvZiBzY3JpcHRzXCI+XG4gICAgICA8c2NyaXB0IHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIiBbc3JjXT1cInNjcmlwdFwiPjwvc2NyaXB0PlxuICAgIDwvZGl2PlxuICAgIDxmb3JtIGNsYXNzPVwianNvbi1zY2hlbWEtZm9ybVwiIChuZ1N1Ym1pdCk9XCJzdWJtaXRGb3JtKClcIj5cbiAgICAgIDxyb290LXdpZGdldCBbbGF5b3V0XT1cImpzZj8ubGF5b3V0XCI+PC9yb290LXdpZGdldD5cbiAgICA8L2Zvcm0+XG4gICAgPGRpdiAqbmdJZj1cImRlYnVnIHx8IGpzZj8uZm9ybU9wdGlvbnM/LmRlYnVnXCI+XG4gICAgICBEZWJ1ZyBvdXRwdXQ6XG4gICAgICA8cHJlPnt7IGRlYnVnT3V0cHV0IH19PC9wcmU+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAvLyBBZGRpbmcgJ0pzb25TY2hlbWFGb3JtU2VydmljZScgaGVyZSwgaW5zdGVhZCBvZiBpbiB0aGUgbW9kdWxlLFxuICAvLyBjcmVhdGVzIGEgc2VwYXJhdGUgaW5zdGFuY2Ugb2YgdGhlIHNlcnZpY2UgZm9yIGVhY2ggY29tcG9uZW50XG4gIHByb3ZpZGVyczogW0pzb25TY2hlbWFGb3JtU2VydmljZSwgSlNPTl9TQ0hFTUFfRk9STV9WQUxVRV9BQ0NFU1NPUl0sXG59KVxuZXhwb3J0IGNsYXNzIEpzb25TY2hlbWFGb3JtQ29tcG9uZW50XG4gIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgZGVidWdPdXRwdXQ6IGFueSAvLyBEZWJ1ZyBpbmZvcm1hdGlvbiwgaWYgcmVxdWVzdGVkXG4gIGZvcm1WYWx1ZVN1YnNjcmlwdGlvbjogYW55ID0gbnVsbFxuICBmb3JtSW5pdGlhbGl6ZWQgPSBmYWxzZVxuICBvYmplY3RXcmFwID0gZmFsc2UgLy8gSXMgbm9uLW9iamVjdCBpbnB1dCBzY2hlbWEgd3JhcHBlZCBpbiBhbiBvYmplY3Q/XG5cbiAgZm9ybVZhbHVlc0lucHV0OiBzdHJpbmcgLy8gTmFtZSBvZiB0aGUgaW5wdXQgcHJvdmlkaW5nIHRoZSBmb3JtIGRhdGFcbiAgcHJldmlvdXNJbnB1dHM6IHtcbiAgICAvLyBQcmV2aW91cyBpbnB1dCB2YWx1ZXMsIHRvIGRldGVjdCB3aGljaCBpbnB1dCB0cmlnZ2VycyBvbkNoYW5nZXNcbiAgICBzY2hlbWE6IGFueVxuICAgIGxheW91dDogYW55W11cbiAgICBkYXRhOiBhbnlcbiAgICBvcHRpb25zOiBhbnlcbiAgICBmcmFtZXdvcms6IGFueSB8IHN0cmluZ1xuICAgIHdpZGdldHM6IGFueVxuICAgIGZvcm06IGFueVxuICAgIG1vZGVsOiBhbnlcbiAgICBKU09OU2NoZW1hOiBhbnlcbiAgICBVSVNjaGVtYTogYW55XG4gICAgZm9ybURhdGE6IGFueVxuICAgIGxvYWRFeHRlcm5hbEFzc2V0czogYm9vbGVhblxuICAgIGRlYnVnOiBib29sZWFuXG4gIH0gPSB7XG4gICAgc2NoZW1hOiBudWxsLFxuICAgIGxheW91dDogbnVsbCxcbiAgICBkYXRhOiBudWxsLFxuICAgIG9wdGlvbnM6IG51bGwsXG4gICAgZnJhbWV3b3JrOiBudWxsLFxuICAgIHdpZGdldHM6IG51bGwsXG4gICAgZm9ybTogbnVsbCxcbiAgICBtb2RlbDogbnVsbCxcbiAgICBKU09OU2NoZW1hOiBudWxsLFxuICAgIFVJU2NoZW1hOiBudWxsLFxuICAgIGZvcm1EYXRhOiBudWxsLFxuICAgIGxvYWRFeHRlcm5hbEFzc2V0czogbnVsbCxcbiAgICBkZWJ1ZzogbnVsbCxcbiAgfVxuXG4gIC8vIFJlY29tbWVuZGVkIGlucHV0c1xuICBASW5wdXQoKSBzY2hlbWE6IGFueSAvLyBUaGUgSlNPTiBTY2hlbWFcbiAgQElucHV0KCkgbGF5b3V0OiBhbnlbXSAvLyBUaGUgZm9ybSBsYXlvdXRcbiAgQElucHV0KCkgZGF0YTogYW55IC8vIFRoZSBmb3JtIGRhdGFcbiAgQElucHV0KCkgb3B0aW9uczogYW55IC8vIFRoZSBnbG9iYWwgZm9ybSBvcHRpb25zXG4gIEBJbnB1dCgpIGZyYW1ld29yazogYW55IHwgc3RyaW5nIC8vIFRoZSBmcmFtZXdvcmsgdG8gbG9hZFxuICBASW5wdXQoKSB3aWRnZXRzOiBhbnkgLy8gQW55IGN1c3RvbSB3aWRnZXRzIHRvIGxvYWRcblxuICAvLyBBbHRlcm5hdGUgY29tYmluZWQgc2luZ2xlIGlucHV0XG4gIEBJbnB1dCgpIGZvcm06IGFueSAvLyBGb3IgdGVzdGluZywgYW5kIEpTT04gU2NoZW1hIEZvcm0gQVBJIGNvbXBhdGliaWxpdHlcblxuICAvLyBBbmd1bGFyIFNjaGVtYSBGb3JtIEFQSSBjb21wYXRpYmlsaXR5IGlucHV0XG4gIEBJbnB1dCgpIG1vZGVsOiBhbnkgLy8gQWx0ZXJuYXRlIGlucHV0IGZvciBmb3JtIGRhdGFcblxuICAvLyBSZWFjdCBKU09OIFNjaGVtYSBGb3JtIEFQSSBjb21wYXRpYmlsaXR5IGlucHV0c1xuICBASW5wdXQoKSBKU09OU2NoZW1hOiBhbnkgLy8gQWx0ZXJuYXRlIGlucHV0IGZvciBKU09OIFNjaGVtYVxuICBASW5wdXQoKSBVSVNjaGVtYTogYW55IC8vIFVJIHNjaGVtYSAtIGFsdGVybmF0ZSBmb3JtIGxheW91dCBmb3JtYXRcbiAgQElucHV0KCkgZm9ybURhdGE6IGFueSAvLyBBbHRlcm5hdGUgaW5wdXQgZm9yIGZvcm0gZGF0YVxuXG4gIEBJbnB1dCgpIG5nTW9kZWw6IGFueSAvLyBBbHRlcm5hdGUgaW5wdXQgZm9yIEFuZ3VsYXIgZm9ybXNcblxuICBASW5wdXQoKSBsYW5ndWFnZTogc3RyaW5nIC8vIExhbmd1YWdlXG5cbiAgLy8gRGV2ZWxvcG1lbnQgaW5wdXRzLCBmb3IgdGVzdGluZyBhbmQgZGVidWdnaW5nXG4gIEBJbnB1dCgpIGxvYWRFeHRlcm5hbEFzc2V0czogYm9vbGVhbiAvLyBMb2FkIGV4dGVybmFsIGZyYW1ld29yayBhc3NldHM/XG4gIEBJbnB1dCgpIGRlYnVnOiBib29sZWFuIC8vIFNob3cgZGVidWcgaW5mb3JtYXRpb24/XG4gIC8vIHRzbGludDpkaXNhYmxlIG5vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpIG9uQ2hhbmdlcyA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpIC8vIExpdmUgdW52YWxpZGF0ZWQgaW50ZXJuYWwgZm9ybSBkYXRhXG4gIEBPdXRwdXQoKSBvblN1Ym1pdCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpIC8vIENvbXBsZXRlIHZhbGlkYXRlZCBmb3JtIGRhdGFcblxuICAvLyBPdXRwdXRzXG4gIC8vIHRzbGludDplbmFibGUgbm8tb3V0cHV0LW9uLXByZWZpeFxuICBAT3V0cHV0KCkgaXNWYWxpZCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKSAvLyBJcyBjdXJyZW50IGRhdGEgdmFsaWQ/XG4gIEBPdXRwdXQoKSB2YWxpZGF0aW9uRXJyb3JzID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCkgLy8gVmFsaWRhdGlvbiBlcnJvcnMgKGlmIGFueSlcbiAgQE91dHB1dCgpIGZvcm1TY2hlbWEgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKSAvLyBGaW5hbCBzY2hlbWEgdXNlZCB0byBjcmVhdGUgZm9ybVxuICBAT3V0cHV0KCkgZm9ybUxheW91dCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpIC8vIEZpbmFsIGxheW91dCB1c2VkIHRvIGNyZWF0ZSBmb3JtXG4gIC8vIFRoZXJlIGlzIG5vIDItd2F5IGJpbmRpbmcgaWYgaW5pdGFsIGRhdGEgaXMgY29tYmluZWQgaW5zaWRlIHRoZSAnZm9ybScgaW5wdXQuXG4gIEBPdXRwdXQoKSBkYXRhQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KClcbiAgQE91dHB1dCgpIG1vZGVsQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KClcblxuICAvLyBPdXRwdXRzIGZvciBwb3NzaWJsZSAyLXdheSBkYXRhIGJpbmRpbmdcbiAgLy8gT25seSB0aGUgb25lIGlucHV0IHByb3ZpZGluZyB0aGUgaW5pdGlhbCBmb3JtIGRhdGEgd2lsbCBiZSBib3VuZC5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gaW5pdGFsIGRhdGEsIGlucHV0ICd7fScgdG8gYWN0aXZhdGUgMi13YXkgZGF0YSBiaW5kaW5nLlxuICBAT3V0cHV0KCkgZm9ybURhdGFDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKVxuICBAT3V0cHV0KCkgbmdNb2RlbENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpXG4gIG9uQ2hhbmdlOiAoZm9ybVZhbHVlczogYW55KSA9PiB2b2lkXG4gIG9uVG91Y2hlZDogKGZvcm1WYWx1ZXM6IGFueSkgPT4gdm9pZFxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgZnJhbWV3b3JrTGlicmFyeTogRnJhbWV3b3JrTGlicmFyeVNlcnZpY2UsXG4gICAgcHJpdmF0ZSB3aWRnZXRMaWJyYXJ5OiBXaWRnZXRMaWJyYXJ5U2VydmljZSxcbiAgICBwdWJsaWMganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplclxuICApIHt9XG5cbiAgQElucHV0KClcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMub2JqZWN0V3JhcCA/IHRoaXMuanNmLmRhdGFbJzEnXSA6IHRoaXMuanNmLmRhdGFcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5zZXRGb3JtVmFsdWVzKHZhbHVlLCBmYWxzZSlcbiAgfVxuXG4gIGdldCBzdHlsZXNoZWV0cygpOiBTYWZlUmVzb3VyY2VVcmxbXSB7XG4gICAgY29uc3Qgc3R5bGVzaGVldHMgPSB0aGlzLmZyYW1ld29ya0xpYnJhcnkuZ2V0RnJhbWV3b3JrU3R5bGVzaGVldHMoKVxuICAgIGNvbnN0IGxvYWQgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmxcbiAgICByZXR1cm4gc3R5bGVzaGVldHMubWFwKHN0eWxlc2hlZXQgPT4gbG9hZChzdHlsZXNoZWV0KSlcbiAgfVxuXG4gIGdldCBzY3JpcHRzKCk6IFNhZmVSZXNvdXJjZVVybFtdIHtcbiAgICBjb25zdCBzY3JpcHRzID0gdGhpcy5mcmFtZXdvcmtMaWJyYXJ5LmdldEZyYW1ld29ya1NjcmlwdHMoKVxuICAgIGNvbnN0IGxvYWQgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmxcbiAgICByZXR1cm4gc2NyaXB0cy5tYXAoc2NyaXB0ID0+IGxvYWQoc2NyaXB0KSlcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudXBkYXRlRm9ybSgpXG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLnVwZGF0ZUZvcm0oKVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5zZXRGb3JtVmFsdWVzKHZhbHVlLCBmYWxzZSlcbiAgICBpZiAoIXRoaXMuZm9ybVZhbHVlc0lucHV0KSB7XG4gICAgICB0aGlzLmZvcm1WYWx1ZXNJbnB1dCA9ICduZ01vZGVsJ1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChmb3JtVmFsdWVzOiBhbnkpID0+IHZvaWQpIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm5cbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoZm9ybVZhbHVlczogYW55KSA9PiB2b2lkKSB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmblxuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuanNmLmZvcm1PcHRpb25zLmZvcm1EaXNhYmxlZCAhPT0gISFpc0Rpc2FibGVkKSB7XG4gICAgICB0aGlzLmpzZi5mb3JtT3B0aW9ucy5mb3JtRGlzYWJsZWQgPSAhIWlzRGlzYWJsZWRcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZUZvcm0oKVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUZvcm0oKSB7XG4gICAgaWYgKFxuICAgICAgIXRoaXMuZm9ybUluaXRpYWxpemVkIHx8XG4gICAgICAhdGhpcy5mb3JtVmFsdWVzSW5wdXQgfHxcbiAgICAgICh0aGlzLmxhbmd1YWdlICYmIHRoaXMubGFuZ3VhZ2UgIT09IHRoaXMuanNmLmxhbmd1YWdlKVxuICAgICkge1xuICAgICAgdGhpcy5pbml0aWFsaXplRm9ybSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmxhbmd1YWdlICYmIHRoaXMubGFuZ3VhZ2UgIT09IHRoaXMuanNmLmxhbmd1YWdlKSB7XG4gICAgICAgIHRoaXMuanNmLnNldExhbmd1YWdlKHRoaXMubGFuZ3VhZ2UpXG4gICAgICB9XG5cbiAgICAgIC8vIEdldCBuYW1lcyBvZiBjaGFuZ2VkIGlucHV0c1xuICAgICAgbGV0IGNoYW5nZWRJbnB1dCA9IE9iamVjdC5rZXlzKHRoaXMucHJldmlvdXNJbnB1dHMpLmZpbHRlcihcbiAgICAgICAgaW5wdXQgPT4gdGhpcy5wcmV2aW91c0lucHV0c1tpbnB1dF0gIT09IHRoaXNbaW5wdXRdXG4gICAgICApXG4gICAgICBsZXQgcmVzZXRGaXJzdCA9IHRydWVcbiAgICAgIGlmIChcbiAgICAgICAgY2hhbmdlZElucHV0Lmxlbmd0aCA9PT0gMSAmJlxuICAgICAgICBjaGFuZ2VkSW5wdXRbMF0gPT09ICdmb3JtJyAmJlxuICAgICAgICB0aGlzLmZvcm1WYWx1ZXNJbnB1dC5zdGFydHNXaXRoKCdmb3JtLicpXG4gICAgICApIHtcbiAgICAgICAgLy8gSWYgb25seSAnZm9ybScgaW5wdXQgY2hhbmdlZCwgZ2V0IG5hbWVzIG9mIGNoYW5nZWQga2V5c1xuICAgICAgICBjaGFuZ2VkSW5wdXQgPSBPYmplY3Qua2V5cyh0aGlzLnByZXZpb3VzSW5wdXRzLmZvcm0gfHwge30pXG4gICAgICAgICAgLmZpbHRlcihcbiAgICAgICAgICAgIGtleSA9PiAhXy5pc0VxdWFsKHRoaXMucHJldmlvdXNJbnB1dHMuZm9ybVtrZXldLCB0aGlzLmZvcm1ba2V5XSlcbiAgICAgICAgICApXG4gICAgICAgICAgLm1hcChrZXkgPT4gYGZvcm0uJHtrZXl9YClcbiAgICAgICAgcmVzZXRGaXJzdCA9IGZhbHNlXG4gICAgICB9XG5cbiAgICAgIC8vIElmIG9ubHkgaW5wdXQgdmFsdWVzIGhhdmUgY2hhbmdlZCwgdXBkYXRlIHRoZSBmb3JtIHZhbHVlc1xuICAgICAgaWYgKFxuICAgICAgICBjaGFuZ2VkSW5wdXQubGVuZ3RoID09PSAxICYmXG4gICAgICAgIGNoYW5nZWRJbnB1dFswXSA9PT0gdGhpcy5mb3JtVmFsdWVzSW5wdXRcbiAgICAgICkge1xuICAgICAgICBpZiAodGhpcy5mb3JtVmFsdWVzSW5wdXQuaW5kZXhPZignLicpID09PSAtMSkge1xuICAgICAgICAgIHRoaXMuc2V0Rm9ybVZhbHVlcyh0aGlzW3RoaXMuZm9ybVZhbHVlc0lucHV0XSwgcmVzZXRGaXJzdClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBbaW5wdXQsIGtleV0gPSB0aGlzLmZvcm1WYWx1ZXNJbnB1dC5zcGxpdCgnLicpXG4gICAgICAgICAgdGhpcy5zZXRGb3JtVmFsdWVzKHRoaXNbaW5wdXRdW2tleV0sIHJlc2V0Rmlyc3QpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBhbnl0aGluZyBlbHNlIGhhcyBjaGFuZ2VkLCByZS1yZW5kZXIgdGhlIGVudGlyZSBmb3JtXG4gICAgICB9IGVsc2UgaWYgKGNoYW5nZWRJbnB1dC5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplRm9ybSgpXG4gICAgICAgIGlmICh0aGlzLm9uQ2hhbmdlKSB7XG4gICAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLmpzZi5mb3JtVmFsdWVzKVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9uVG91Y2hlZCkge1xuICAgICAgICAgIHRoaXMub25Ub3VjaGVkKHRoaXMuanNmLmZvcm1WYWx1ZXMpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIHByZXZpb3VzIGlucHV0c1xuICAgICAgT2JqZWN0LmtleXModGhpcy5wcmV2aW91c0lucHV0cylcbiAgICAgICAgLmZpbHRlcihpbnB1dCA9PiB0aGlzLnByZXZpb3VzSW5wdXRzW2lucHV0XSAhPT0gdGhpc1tpbnB1dF0pXG4gICAgICAgIC5mb3JFYWNoKGlucHV0ID0+ICh0aGlzLnByZXZpb3VzSW5wdXRzW2lucHV0XSA9IHRoaXNbaW5wdXRdKSlcbiAgICB9XG4gIH1cblxuICBzZXRGb3JtVmFsdWVzKGZvcm1WYWx1ZXM6IGFueSwgcmVzZXRGaXJzdCA9IHRydWUpIHtcbiAgICBpZiAoZm9ybVZhbHVlcykge1xuICAgICAgY29uc3QgbmV3Rm9ybVZhbHVlcyA9IHRoaXMub2JqZWN0V3JhcCA/IGZvcm1WYWx1ZXNbJzEnXSA6IGZvcm1WYWx1ZXNcbiAgICAgIGlmICghdGhpcy5qc2YuZm9ybUdyb3VwKSB7XG4gICAgICAgIHRoaXMuanNmLmZvcm1WYWx1ZXMgPSBmb3JtVmFsdWVzXG4gICAgICAgIHRoaXMuYWN0aXZhdGVGb3JtKClcbiAgICAgIH0gZWxzZSBpZiAocmVzZXRGaXJzdCkge1xuICAgICAgICB0aGlzLmpzZi5mb3JtR3JvdXAucmVzZXQoKVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuanNmLmZvcm1Hcm91cCkge1xuICAgICAgICB0aGlzLmpzZi5mb3JtR3JvdXAucGF0Y2hWYWx1ZShuZXdGb3JtVmFsdWVzKVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMub25DaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZShuZXdGb3JtVmFsdWVzKVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMub25Ub3VjaGVkKSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKG5ld0Zvcm1WYWx1ZXMpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuanNmLmZvcm1Hcm91cC5yZXNldCgpXG4gICAgfVxuICB9XG5cbiAgc3VibWl0Rm9ybSgpIHtcbiAgICBjb25zdCB2YWxpZERhdGEgPSB0aGlzLmpzZi52YWxpZERhdGFcbiAgICB0aGlzLm9uU3VibWl0LmVtaXQodGhpcy5vYmplY3RXcmFwID8gdmFsaWREYXRhWycxJ10gOiB2YWxpZERhdGEpXG4gIH1cblxuICAvKipcbiAgICogJ2luaXRpYWxpemVGb3JtJyBmdW5jdGlvblxuICAgKlxuICAgKiAtIFVwZGF0ZSAnc2NoZW1hJywgJ2xheW91dCcsIGFuZCAnZm9ybVZhbHVlcycsIGZyb20gaW5wdXRzLlxuICAgKlxuICAgKiAtIENyZWF0ZSAnc2NoZW1hUmVmTGlicmFyeScgYW5kICdzY2hlbWFSZWN1cnNpdmVSZWZNYXAnXG4gICAqICAgdG8gcmVzb2x2ZSBzY2hlbWEgJHJlZiBsaW5rcywgaW5jbHVkaW5nIHJlY3Vyc2l2ZSAkcmVmIGxpbmtzLlxuICAgKlxuICAgKiAtIENyZWF0ZSAnZGF0YVJlY3Vyc2l2ZVJlZk1hcCcgdG8gcmVzb2x2ZSByZWN1cnNpdmUgbGlua3MgaW4gZGF0YVxuICAgKiAgIGFuZCBjb3JlY3RseSBzZXQgb3V0cHV0IGZvcm1hdHMgZm9yIHJlY3Vyc2l2ZWx5IG5lc3RlZCB2YWx1ZXMuXG4gICAqXG4gICAqIC0gQ3JlYXRlICdsYXlvdXRSZWZMaWJyYXJ5JyBhbmQgJ3RlbXBsYXRlUmVmTGlicmFyeScgdG8gc3RvcmVcbiAgICogICBuZXcgbGF5b3V0IG5vZGVzIGFuZCBmb3JtR3JvdXAgZWxlbWVudHMgdG8gdXNlIHdoZW4gZHluYW1pY2FsbHlcbiAgICogICBhZGRpbmcgZm9ybSBjb21wb25lbnRzIHRvIGFycmF5cyBhbmQgcmVjdXJzaXZlICRyZWYgcG9pbnRzLlxuICAgKlxuICAgKiAtIENyZWF0ZSAnZGF0YU1hcCcgdG8gbWFwIHRoZSBkYXRhIHRvIHRoZSBzY2hlbWEgYW5kIHRlbXBsYXRlLlxuICAgKlxuICAgKiAtIENyZWF0ZSB0aGUgbWFzdGVyICdmb3JtR3JvdXBUZW1wbGF0ZScgdGhlbiBmcm9tIGl0ICdmb3JtR3JvdXAnXG4gICAqICAgdGhlIEFuZ3VsYXIgZm9ybUdyb3VwIHVzZWQgdG8gY29udHJvbCB0aGUgcmVhY3RpdmUgZm9ybS5cbiAgICovXG4gIGluaXRpYWxpemVGb3JtKCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuc2NoZW1hIHx8XG4gICAgICB0aGlzLmxheW91dCB8fFxuICAgICAgdGhpcy5kYXRhIHx8XG4gICAgICB0aGlzLmZvcm0gfHxcbiAgICAgIHRoaXMubW9kZWwgfHxcbiAgICAgIHRoaXMuSlNPTlNjaGVtYSB8fFxuICAgICAgdGhpcy5VSVNjaGVtYSB8fFxuICAgICAgdGhpcy5mb3JtRGF0YSB8fFxuICAgICAgdGhpcy5uZ01vZGVsIHx8XG4gICAgICB0aGlzLmpzZi5kYXRhXG4gICAgKSB7XG4gICAgICB0aGlzLmpzZi5yZXNldEFsbFZhbHVlcygpIC8vIFJlc2V0IGFsbCBmb3JtIHZhbHVlcyB0byBkZWZhdWx0c1xuICAgICAgdGhpcy5pbml0aWFsaXplT3B0aW9ucygpIC8vIFVwZGF0ZSBvcHRpb25zXG4gICAgICB0aGlzLmluaXRpYWxpemVTY2hlbWEoKSAvLyBVcGRhdGUgc2NoZW1hLCBzY2hlbWFSZWZMaWJyYXJ5LFxuICAgICAgLy8gc2NoZW1hUmVjdXJzaXZlUmVmTWFwLCAmIGRhdGFSZWN1cnNpdmVSZWZNYXBcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZUxheW91dCgpIC8vIFVwZGF0ZSBsYXlvdXQsIGxheW91dFJlZkxpYnJhcnksXG4gICAgICB0aGlzLmluaXRpYWxpemVEYXRhKCkgLy8gVXBkYXRlIGZvcm1WYWx1ZXNcbiAgICAgIHRoaXMuYWN0aXZhdGVGb3JtKCkgLy8gVXBkYXRlIGRhdGFNYXAsIHRlbXBsYXRlUmVmTGlicmFyeSxcbiAgICAgIC8vIGZvcm1Hcm91cFRlbXBsYXRlLCBmb3JtR3JvdXBcblxuICAgICAgaWYgKHRoaXMuZGVidWcgfHwgdGhpcy5qc2YuZm9ybU9wdGlvbnMuZGVidWcpIHtcbiAgICAgICAgY29uc3QgdmFyczogYW55W10gPSBbXVxuICAgICAgICB0aGlzLmRlYnVnT3V0cHV0ID0gdmFycy5tYXAodiA9PiBKU09OLnN0cmluZ2lmeSh2LCBudWxsLCAyKSkuam9pbignXFxuJylcbiAgICAgIH1cbiAgICAgIHRoaXMuZm9ybUluaXRpYWxpemVkID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnaW5pdGlhbGl6ZU9wdGlvbnMnIGZ1bmN0aW9uXG4gICAqXG4gICAqIEluaXRpYWxpemUgJ29wdGlvbnMnIChnbG9iYWwgZm9ybSBvcHRpb25zKSBhbmQgc2V0IGZyYW1ld29ya1xuICAgKiBDb21iaW5lIGF2YWlsYWJsZSBpbnB1dHM6XG4gICAqIDEuIG9wdGlvbnMgLSByZWNvbW1lbmRlZFxuICAgKiAyLiBmb3JtLm9wdGlvbnMgLSBTaW5nbGUgaW5wdXQgc3R5bGVcbiAgICovXG4gIHByaXZhdGUgaW5pdGlhbGl6ZU9wdGlvbnMoKSB7XG4gICAgaWYgKHRoaXMubGFuZ3VhZ2UgJiYgdGhpcy5sYW5ndWFnZSAhPT0gdGhpcy5qc2YubGFuZ3VhZ2UpIHtcbiAgICAgIHRoaXMuanNmLnNldExhbmd1YWdlKHRoaXMubGFuZ3VhZ2UpXG4gICAgfVxuICAgIHRoaXMuanNmLnNldE9wdGlvbnMoe2RlYnVnOiAhIXRoaXMuZGVidWd9KVxuICAgIGxldCBsb2FkRXh0ZXJuYWxBc3NldHM6IGJvb2xlYW4gPSB0aGlzLmxvYWRFeHRlcm5hbEFzc2V0cyB8fCBmYWxzZVxuICAgIGxldCBmcmFtZXdvcms6IGFueSA9IHRoaXMuZnJhbWV3b3JrIHx8ICdkZWZhdWx0J1xuICAgIGlmIChpc09iamVjdCh0aGlzLm9wdGlvbnMpKSB7XG4gICAgICB0aGlzLmpzZi5zZXRPcHRpb25zKHRoaXMub3B0aW9ucylcbiAgICAgIGxvYWRFeHRlcm5hbEFzc2V0cyA9IHRoaXMub3B0aW9ucy5sb2FkRXh0ZXJuYWxBc3NldHMgfHwgbG9hZEV4dGVybmFsQXNzZXRzXG4gICAgICBmcmFtZXdvcmsgPSB0aGlzLm9wdGlvbnMuZnJhbWV3b3JrIHx8IGZyYW1ld29ya1xuICAgIH1cbiAgICBpZiAoaXNPYmplY3QodGhpcy5mb3JtKSAmJiBpc09iamVjdCh0aGlzLmZvcm0ub3B0aW9ucykpIHtcbiAgICAgIHRoaXMuanNmLnNldE9wdGlvbnModGhpcy5mb3JtLm9wdGlvbnMpXG4gICAgICBsb2FkRXh0ZXJuYWxBc3NldHMgPVxuICAgICAgICB0aGlzLmZvcm0ub3B0aW9ucy5sb2FkRXh0ZXJuYWxBc3NldHMgfHwgbG9hZEV4dGVybmFsQXNzZXRzXG4gICAgICBmcmFtZXdvcmsgPSB0aGlzLmZvcm0ub3B0aW9ucy5mcmFtZXdvcmsgfHwgZnJhbWV3b3JrXG4gICAgfVxuICAgIGlmIChpc09iamVjdCh0aGlzLndpZGdldHMpKSB7XG4gICAgICB0aGlzLmpzZi5zZXRPcHRpb25zKHt3aWRnZXRzOiB0aGlzLndpZGdldHN9KVxuICAgIH1cbiAgICB0aGlzLmZyYW1ld29ya0xpYnJhcnkuc2V0TG9hZEV4dGVybmFsQXNzZXRzKGxvYWRFeHRlcm5hbEFzc2V0cylcbiAgICB0aGlzLmZyYW1ld29ya0xpYnJhcnkuc2V0RnJhbWV3b3JrKGZyYW1ld29yaylcbiAgICB0aGlzLmpzZi5mcmFtZXdvcmsgPSB0aGlzLmZyYW1ld29ya0xpYnJhcnkuZ2V0RnJhbWV3b3JrKClcbiAgICBpZiAoaXNPYmplY3QodGhpcy5qc2YuZm9ybU9wdGlvbnMud2lkZ2V0cykpIHtcbiAgICAgIGZvciAoY29uc3Qgd2lkZ2V0IG9mIE9iamVjdC5rZXlzKHRoaXMuanNmLmZvcm1PcHRpb25zLndpZGdldHMpKSB7XG4gICAgICAgIHRoaXMud2lkZ2V0TGlicmFyeS5yZWdpc3RlcldpZGdldChcbiAgICAgICAgICB3aWRnZXQsXG4gICAgICAgICAgdGhpcy5qc2YuZm9ybU9wdGlvbnMud2lkZ2V0c1t3aWRnZXRdXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMuZm9ybSkgJiYgaXNPYmplY3QodGhpcy5mb3JtLnRwbGRhdGEpKSB7XG4gICAgICB0aGlzLmpzZi5zZXRUcGxkYXRhKHRoaXMuZm9ybS50cGxkYXRhKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnaW5pdGlhbGl6ZVNjaGVtYScgZnVuY3Rpb25cbiAgICpcbiAgICogSW5pdGlhbGl6ZSAnc2NoZW1hJ1xuICAgKiBVc2UgZmlyc3QgYXZhaWxhYmxlIGlucHV0OlxuICAgKiAxLiBzY2hlbWEgLSByZWNvbW1lbmRlZCAvIEFuZ3VsYXIgU2NoZW1hIEZvcm0gc3R5bGVcbiAgICogMi4gZm9ybS5zY2hlbWEgLSBTaW5nbGUgaW5wdXQgLyBKU09OIEZvcm0gc3R5bGVcbiAgICogMy4gSlNPTlNjaGVtYSAtIFJlYWN0IEpTT04gU2NoZW1hIEZvcm0gc3R5bGVcbiAgICogNC4gZm9ybS5KU09OU2NoZW1hIC0gRm9yIHRlc3Rpbmcgc2luZ2xlIGlucHV0IFJlYWN0IEpTT04gU2NoZW1hIEZvcm1zXG4gICAqIDUuIGZvcm0gLSBGb3IgdGVzdGluZyBzaW5nbGUgc2NoZW1hLW9ubHkgaW5wdXRzXG4gICAqXG4gICAqIC4uLiBpZiBubyBzY2hlbWEgaW5wdXQgZm91bmQsIHRoZSAnYWN0aXZhdGVGb3JtJyBmdW5jdGlvbiwgYmVsb3csXG4gICAqICAgICB3aWxsIG1ha2UgdHdvIGFkZGl0aW9uYWwgYXR0ZW1wdHMgdG8gYnVpbGQgYSBzY2hlbWFcbiAgICogNi4gSWYgbGF5b3V0IGlucHV0IC0gYnVpbGQgc2NoZW1hIGZyb20gbGF5b3V0XG4gICAqIDcuIElmIGRhdGEgaW5wdXQgLSBidWlsZCBzY2hlbWEgZnJvbSBkYXRhXG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxpemVTY2hlbWEoKSB7XG4gICAgLy8gVE9ETzogdXBkYXRlIHRvIGFsbG93IG5vbi1vYmplY3Qgc2NoZW1hc1xuXG4gICAgaWYgKGlzT2JqZWN0KHRoaXMuc2NoZW1hKSkge1xuICAgICAgdGhpcy5qc2YuQW5ndWxhclNjaGVtYUZvcm1Db21wYXRpYmlsaXR5ID0gdHJ1ZVxuICAgICAgdGhpcy5qc2Yuc2NoZW1hID0gXy5jbG9uZURlZXAodGhpcy5zY2hlbWEpXG4gICAgfSBlbHNlIGlmIChoYXNPd24odGhpcy5mb3JtLCAnc2NoZW1hJykgJiYgaXNPYmplY3QodGhpcy5mb3JtLnNjaGVtYSkpIHtcbiAgICAgIHRoaXMuanNmLnNjaGVtYSA9IF8uY2xvbmVEZWVwKHRoaXMuZm9ybS5zY2hlbWEpXG4gICAgfSBlbHNlIGlmIChpc09iamVjdCh0aGlzLkpTT05TY2hlbWEpKSB7XG4gICAgICB0aGlzLmpzZi5SZWFjdEpzb25TY2hlbWFGb3JtQ29tcGF0aWJpbGl0eSA9IHRydWVcbiAgICAgIHRoaXMuanNmLnNjaGVtYSA9IF8uY2xvbmVEZWVwKHRoaXMuSlNPTlNjaGVtYSlcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgaGFzT3duKHRoaXMuZm9ybSwgJ0pTT05TY2hlbWEnKSAmJlxuICAgICAgaXNPYmplY3QodGhpcy5mb3JtLkpTT05TY2hlbWEpXG4gICAgKSB7XG4gICAgICB0aGlzLmpzZi5SZWFjdEpzb25TY2hlbWFGb3JtQ29tcGF0aWJpbGl0eSA9IHRydWVcbiAgICAgIHRoaXMuanNmLnNjaGVtYSA9IF8uY2xvbmVEZWVwKHRoaXMuZm9ybS5KU09OU2NoZW1hKVxuICAgIH0gZWxzZSBpZiAoXG4gICAgICBoYXNPd24odGhpcy5mb3JtLCAncHJvcGVydGllcycpICYmXG4gICAgICBpc09iamVjdCh0aGlzLmZvcm0ucHJvcGVydGllcylcbiAgICApIHtcbiAgICAgIHRoaXMuanNmLnNjaGVtYSA9IF8uY2xvbmVEZWVwKHRoaXMuZm9ybSlcbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuZm9ybSkpIHtcbiAgICAgIC8vIFRPRE86IEhhbmRsZSBvdGhlciB0eXBlcyBvZiBmb3JtIGlucHV0XG4gICAgfVxuXG4gICAgaWYgKCFpc0VtcHR5KHRoaXMuanNmLnNjaGVtYSkpIHtcbiAgICAgIC8vIElmIG90aGVyIHR5cGVzIGFsc28gYWxsb3dlZCwgcmVuZGVyIHNjaGVtYSBhcyBhbiBvYmplY3RcbiAgICAgIGlmIChpbkFycmF5KCdvYmplY3QnLCB0aGlzLmpzZi5zY2hlbWEudHlwZSkpIHtcbiAgICAgICAgdGhpcy5qc2Yuc2NoZW1hLnR5cGUgPSAnb2JqZWN0J1xuICAgICAgfVxuXG4gICAgICAvLyBXcmFwIG5vbi1vYmplY3Qgc2NoZW1hcyBpbiBvYmplY3QuXG4gICAgICBpZiAoXG4gICAgICAgIGhhc093bih0aGlzLmpzZi5zY2hlbWEsICd0eXBlJykgJiZcbiAgICAgICAgdGhpcy5qc2Yuc2NoZW1hLnR5cGUgIT09ICdvYmplY3QnXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5qc2Yuc2NoZW1hID0ge1xuICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgIHByb3BlcnRpZXM6IHsxOiB0aGlzLmpzZi5zY2hlbWF9LFxuICAgICAgICB9XG4gICAgICAgIHRoaXMub2JqZWN0V3JhcCA9IHRydWVcbiAgICAgIH0gZWxzZSBpZiAoIWhhc093bih0aGlzLmpzZi5zY2hlbWEsICd0eXBlJykpIHtcbiAgICAgICAgLy8gQWRkIHR5cGUgPSAnb2JqZWN0JyBpZiBtaXNzaW5nXG4gICAgICAgIGlmIChcbiAgICAgICAgICBpc09iamVjdCh0aGlzLmpzZi5zY2hlbWEucHJvcGVydGllcykgfHxcbiAgICAgICAgICBpc09iamVjdCh0aGlzLmpzZi5zY2hlbWEucGF0dGVyblByb3BlcnRpZXMpIHx8XG4gICAgICAgICAgaXNPYmplY3QodGhpcy5qc2Yuc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzKVxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmpzZi5zY2hlbWEudHlwZSA9ICdvYmplY3QnXG5cbiAgICAgICAgICAvLyBGaXggSlNPTiBzY2hlbWEgc2hvcnRoYW5kIChKU09OIEZvcm0gc3R5bGUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5qc2YuSnNvbkZvcm1Db21wYXRpYmlsaXR5ID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuanNmLnNjaGVtYSA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczogdGhpcy5qc2Yuc2NoZW1hLFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBJZiBuZWVkZWQsIHVwZGF0ZSBKU09OIFNjaGVtYSB0byBkcmFmdCA2IGZvcm1hdCwgaW5jbHVkaW5nXG4gICAgICAvLyBkcmFmdCAzIChKU09OIEZvcm0gc3R5bGUpIGFuZCBkcmFmdCA0IChBbmd1bGFyIFNjaGVtYSBGb3JtIHN0eWxlKVxuICAgICAgdGhpcy5qc2Yuc2NoZW1hID0gY29udmVydFNjaGVtYVRvRHJhZnQ2KHRoaXMuanNmLnNjaGVtYSlcblxuICAgICAgLy8gSW5pdGlhbGl6ZSBhanYgYW5kIGNvbXBpbGUgc2NoZW1hXG4gICAgICB0aGlzLmpzZi5jb21waWxlQWp2U2NoZW1hKClcblxuICAgICAgLy8gQ3JlYXRlIHNjaGVtYVJlZkxpYnJhcnksIHNjaGVtYVJlY3Vyc2l2ZVJlZk1hcCwgZGF0YVJlY3Vyc2l2ZVJlZk1hcCwgJiBhcnJheU1hcFxuICAgICAgdGhpcy5qc2Yuc2NoZW1hID0gcmVzb2x2ZVNjaGVtYVJlZmVyZW5jZXMoXG4gICAgICAgIHRoaXMuanNmLnNjaGVtYSxcbiAgICAgICAgdGhpcy5qc2Yuc2NoZW1hUmVmTGlicmFyeSxcbiAgICAgICAgdGhpcy5qc2Yuc2NoZW1hUmVjdXJzaXZlUmVmTWFwLFxuICAgICAgICB0aGlzLmpzZi5kYXRhUmVjdXJzaXZlUmVmTWFwLFxuICAgICAgICB0aGlzLmpzZi5hcnJheU1hcFxuICAgICAgKVxuICAgICAgaWYgKGhhc093bih0aGlzLmpzZi5zY2hlbWFSZWZMaWJyYXJ5LCAnJykpIHtcbiAgICAgICAgdGhpcy5qc2YuaGFzUm9vdFJlZmVyZW5jZSA9IHRydWVcbiAgICAgIH1cblxuICAgICAgLy8gVE9ETzogKD8pIFJlc29sdmUgZXh0ZXJuYWwgJHJlZiBsaW5rc1xuICAgICAgLy8gLy8gQ3JlYXRlIHNjaGVtYVJlZkxpYnJhcnkgJiBzY2hlbWFSZWN1cnNpdmVSZWZNYXBcbiAgICAgIC8vIHRoaXMucGFyc2VyLmJ1bmRsZSh0aGlzLnNjaGVtYSlcbiAgICAgIC8vICAgLnRoZW4oc2NoZW1hID0+IHRoaXMuc2NoZW1hID0gcmVzb2x2ZVNjaGVtYVJlZmVyZW5jZXMoXG4gICAgICAvLyAgICAgc2NoZW1hLCB0aGlzLmpzZi5zY2hlbWFSZWZMaWJyYXJ5LFxuICAgICAgLy8gICAgIHRoaXMuanNmLnNjaGVtYVJlY3Vyc2l2ZVJlZk1hcCwgdGhpcy5qc2YuZGF0YVJlY3Vyc2l2ZVJlZk1hcFxuICAgICAgLy8gICApKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ2luaXRpYWxpemVEYXRhJyBmdW5jdGlvblxuICAgKlxuICAgKiBJbml0aWFsaXplICdmb3JtVmFsdWVzJ1xuICAgKiBkZWZ1bGF0IG9yIHByZXZpb3VzbHkgc3VibWl0dGVkIHZhbHVlcyB1c2VkIHRvIHBvcHVsYXRlIGZvcm1cbiAgICogVXNlIGZpcnN0IGF2YWlsYWJsZSBpbnB1dDpcbiAgICogMS4gZGF0YSAtIHJlY29tbWVuZGVkXG4gICAqIDIuIG1vZGVsIC0gQW5ndWxhciBTY2hlbWEgRm9ybSBzdHlsZVxuICAgKiAzLiBmb3JtLnZhbHVlIC0gSlNPTiBGb3JtIHN0eWxlXG4gICAqIDQuIGZvcm0uZGF0YSAtIFNpbmdsZSBpbnB1dCBzdHlsZVxuICAgKiA1LiBmb3JtRGF0YSAtIFJlYWN0IEpTT04gU2NoZW1hIEZvcm0gc3R5bGVcbiAgICogNi4gZm9ybS5mb3JtRGF0YSAtIEZvciBlYXNpZXIgdGVzdGluZyBvZiBSZWFjdCBKU09OIFNjaGVtYSBGb3Jtc1xuICAgKiA3LiAobm9uZSkgbm8gZGF0YSAtIGluaXRpYWxpemUgZGF0YSBmcm9tIHNjaGVtYSBhbmQgbGF5b3V0IGRlZmF1bHRzIG9ubHlcbiAgICovXG4gIHByaXZhdGUgaW5pdGlhbGl6ZURhdGEoKSB7XG4gICAgaWYgKGhhc1ZhbHVlKHRoaXMuZGF0YSkpIHtcbiAgICAgIHRoaXMuanNmLmZvcm1WYWx1ZXMgPSBfLmNsb25lRGVlcCh0aGlzLmRhdGEpXG4gICAgICB0aGlzLmZvcm1WYWx1ZXNJbnB1dCA9ICdkYXRhJ1xuICAgIH0gZWxzZSBpZiAoaGFzVmFsdWUodGhpcy5tb2RlbCkpIHtcbiAgICAgIHRoaXMuanNmLkFuZ3VsYXJTY2hlbWFGb3JtQ29tcGF0aWJpbGl0eSA9IHRydWVcbiAgICAgIHRoaXMuanNmLmZvcm1WYWx1ZXMgPSBfLmNsb25lRGVlcCh0aGlzLm1vZGVsKVxuICAgICAgdGhpcy5mb3JtVmFsdWVzSW5wdXQgPSAnbW9kZWwnXG4gICAgfSBlbHNlIGlmIChoYXNWYWx1ZSh0aGlzLm5nTW9kZWwpKSB7XG4gICAgICB0aGlzLmpzZi5Bbmd1bGFyU2NoZW1hRm9ybUNvbXBhdGliaWxpdHkgPSB0cnVlXG4gICAgICB0aGlzLmpzZi5mb3JtVmFsdWVzID0gXy5jbG9uZURlZXAodGhpcy5uZ01vZGVsKVxuICAgICAgdGhpcy5mb3JtVmFsdWVzSW5wdXQgPSAnbmdNb2RlbCdcbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuZm9ybSkgJiYgaGFzVmFsdWUodGhpcy5mb3JtLnZhbHVlKSkge1xuICAgICAgdGhpcy5qc2YuSnNvbkZvcm1Db21wYXRpYmlsaXR5ID0gdHJ1ZVxuICAgICAgdGhpcy5qc2YuZm9ybVZhbHVlcyA9IF8uY2xvbmVEZWVwKHRoaXMuZm9ybS52YWx1ZSlcbiAgICAgIHRoaXMuZm9ybVZhbHVlc0lucHV0ID0gJ2Zvcm0udmFsdWUnXG4gICAgfSBlbHNlIGlmIChpc09iamVjdCh0aGlzLmZvcm0pICYmIGhhc1ZhbHVlKHRoaXMuZm9ybS5kYXRhKSkge1xuICAgICAgdGhpcy5qc2YuZm9ybVZhbHVlcyA9IF8uY2xvbmVEZWVwKHRoaXMuZm9ybS5kYXRhKVxuICAgICAgdGhpcy5mb3JtVmFsdWVzSW5wdXQgPSAnZm9ybS5kYXRhJ1xuICAgIH0gZWxzZSBpZiAoaGFzVmFsdWUodGhpcy5mb3JtRGF0YSkpIHtcbiAgICAgIHRoaXMuanNmLlJlYWN0SnNvblNjaGVtYUZvcm1Db21wYXRpYmlsaXR5ID0gdHJ1ZVxuICAgICAgdGhpcy5mb3JtVmFsdWVzSW5wdXQgPSAnZm9ybURhdGEnXG4gICAgfSBlbHNlIGlmIChoYXNPd24odGhpcy5mb3JtLCAnZm9ybURhdGEnKSAmJiBoYXNWYWx1ZSh0aGlzLmZvcm0uZm9ybURhdGEpKSB7XG4gICAgICB0aGlzLmpzZi5SZWFjdEpzb25TY2hlbWFGb3JtQ29tcGF0aWJpbGl0eSA9IHRydWVcbiAgICAgIHRoaXMuanNmLmZvcm1WYWx1ZXMgPSBfLmNsb25lRGVlcCh0aGlzLmZvcm0uZm9ybURhdGEpXG4gICAgICB0aGlzLmZvcm1WYWx1ZXNJbnB1dCA9ICdmb3JtLmZvcm1EYXRhJ1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZvcm1WYWx1ZXNJbnB1dCA9IG51bGxcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ2luaXRpYWxpemVMYXlvdXQnIGZ1bmN0aW9uXG4gICAqXG4gICAqIEluaXRpYWxpemUgJ2xheW91dCdcbiAgICogVXNlIGZpcnN0IGF2YWlsYWJsZSBhcnJheSBpbnB1dDpcbiAgICogMS4gbGF5b3V0IC0gcmVjb21tZW5kZWRcbiAgICogMi4gZm9ybSAtIEFuZ3VsYXIgU2NoZW1hIEZvcm0gc3R5bGVcbiAgICogMy4gZm9ybS5mb3JtIC0gSlNPTiBGb3JtIHN0eWxlXG4gICAqIDQuIGZvcm0ubGF5b3V0IC0gU2luZ2xlIGlucHV0IHN0eWxlXG4gICAqIDUuIChub25lKSBubyBsYXlvdXQgLSBzZXQgZGVmYXVsdCBsYXlvdXQgaW5zdGVhZFxuICAgKiAgICAoZnVsbCBsYXlvdXQgd2lsbCBiZSBidWlsdCBsYXRlciBmcm9tIHRoZSBzY2hlbWEpXG4gICAqXG4gICAqIEFsc28sIGlmIGFsdGVybmF0ZSBsYXlvdXQgZm9ybWF0cyBhcmUgYXZhaWxhYmxlLFxuICAgKiBpbXBvcnQgZnJvbSAnVUlTY2hlbWEnIG9yICdjdXN0b21Gb3JtSXRlbXMnXG4gICAqIHVzZWQgZm9yIFJlYWN0IEpTT04gU2NoZW1hIEZvcm0gYW5kIEpTT04gRm9ybSBBUEkgY29tcGF0aWJpbGl0eVxuICAgKiBVc2UgZmlyc3QgYXZhaWxhYmxlIGlucHV0OlxuICAgKiAxLiBVSVNjaGVtYSAtIFJlYWN0IEpTT04gU2NoZW1hIEZvcm0gc3R5bGVcbiAgICogMi4gZm9ybS5VSVNjaGVtYSAtIEZvciB0ZXN0aW5nIHNpbmdsZSBpbnB1dCBSZWFjdCBKU09OIFNjaGVtYSBGb3Jtc1xuICAgKiAyLiBmb3JtLmN1c3RvbUZvcm1JdGVtcyAtIEpTT04gRm9ybSBzdHlsZVxuICAgKiAzLiAobm9uZSkgbm8gaW5wdXQgLSBkb24ndCBpbXBvcnRcbiAgICovXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUxheW91dCgpIHtcbiAgICAvLyBSZW5hbWUgSlNPTiBGb3JtLXN0eWxlICdvcHRpb25zJyBsaXN0cyB0b1xuICAgIC8vIEFuZ3VsYXIgU2NoZW1hIEZvcm0tc3R5bGUgJ3RpdGxlTWFwJyBsaXN0cy5cbiAgICBjb25zdCBmaXhKc29uRm9ybU9wdGlvbnMgPSAobGF5b3V0OiBhbnkpOiBhbnkgPT4ge1xuICAgICAgaWYgKGlzT2JqZWN0KGxheW91dCkgfHwgaXNBcnJheShsYXlvdXQpKSB7XG4gICAgICAgIGZvckVhY2goXG4gICAgICAgICAgbGF5b3V0LFxuICAgICAgICAgICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoaGFzT3duKHZhbHVlLCAnb3B0aW9ucycpICYmIGlzT2JqZWN0KHZhbHVlLm9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgIHZhbHVlLnRpdGxlTWFwID0gdmFsdWUub3B0aW9uc1xuICAgICAgICAgICAgICBkZWxldGUgdmFsdWUub3B0aW9uc1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgJ3RvcC1kb3duJ1xuICAgICAgICApXG4gICAgICB9XG4gICAgICByZXR1cm4gbGF5b3V0XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxheW91dCBpbnB1dHMgYW5kLCBpZiBmb3VuZCwgaW5pdGlhbGl6ZSBmb3JtIGxheW91dFxuICAgIGlmIChpc0FycmF5KHRoaXMubGF5b3V0KSkge1xuICAgICAgdGhpcy5qc2YubGF5b3V0ID0gXy5jbG9uZURlZXAodGhpcy5sYXlvdXQpXG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHRoaXMuZm9ybSkpIHtcbiAgICAgIHRoaXMuanNmLkFuZ3VsYXJTY2hlbWFGb3JtQ29tcGF0aWJpbGl0eSA9IHRydWVcbiAgICAgIHRoaXMuanNmLmxheW91dCA9IF8uY2xvbmVEZWVwKHRoaXMuZm9ybSlcbiAgICB9IGVsc2UgaWYgKHRoaXMuZm9ybSAmJiBpc0FycmF5KHRoaXMuZm9ybS5mb3JtKSkge1xuICAgICAgdGhpcy5qc2YuSnNvbkZvcm1Db21wYXRpYmlsaXR5ID0gdHJ1ZVxuICAgICAgdGhpcy5qc2YubGF5b3V0ID0gZml4SnNvbkZvcm1PcHRpb25zKF8uY2xvbmVEZWVwKHRoaXMuZm9ybS5mb3JtKSlcbiAgICB9IGVsc2UgaWYgKHRoaXMuZm9ybSAmJiBpc0FycmF5KHRoaXMuZm9ybS5sYXlvdXQpKSB7XG4gICAgICB0aGlzLmpzZi5sYXlvdXQgPSBfLmNsb25lRGVlcCh0aGlzLmZvcm0ubGF5b3V0KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmpzZi5sYXlvdXQgPSBbJyonXVxuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBhbHRlcm5hdGUgbGF5b3V0IGlucHV0c1xuICAgIGxldCBhbHRlcm5hdGVMYXlvdXQ6IGFueSA9IG51bGxcbiAgICBpZiAoaXNPYmplY3QodGhpcy5VSVNjaGVtYSkpIHtcbiAgICAgIHRoaXMuanNmLlJlYWN0SnNvblNjaGVtYUZvcm1Db21wYXRpYmlsaXR5ID0gdHJ1ZVxuICAgICAgYWx0ZXJuYXRlTGF5b3V0ID0gXy5jbG9uZURlZXAodGhpcy5VSVNjaGVtYSlcbiAgICB9IGVsc2UgaWYgKGhhc093bih0aGlzLmZvcm0sICdVSVNjaGVtYScpKSB7XG4gICAgICB0aGlzLmpzZi5SZWFjdEpzb25TY2hlbWFGb3JtQ29tcGF0aWJpbGl0eSA9IHRydWVcbiAgICAgIGFsdGVybmF0ZUxheW91dCA9IF8uY2xvbmVEZWVwKHRoaXMuZm9ybS5VSVNjaGVtYSlcbiAgICB9IGVsc2UgaWYgKGhhc093bih0aGlzLmZvcm0sICd1aVNjaGVtYScpKSB7XG4gICAgICB0aGlzLmpzZi5SZWFjdEpzb25TY2hlbWFGb3JtQ29tcGF0aWJpbGl0eSA9IHRydWVcbiAgICAgIGFsdGVybmF0ZUxheW91dCA9IF8uY2xvbmVEZWVwKHRoaXMuZm9ybS51aVNjaGVtYSlcbiAgICB9IGVsc2UgaWYgKGhhc093bih0aGlzLmZvcm0sICdjdXN0b21Gb3JtSXRlbXMnKSkge1xuICAgICAgdGhpcy5qc2YuSnNvbkZvcm1Db21wYXRpYmlsaXR5ID0gdHJ1ZVxuICAgICAgYWx0ZXJuYXRlTGF5b3V0ID0gZml4SnNvbkZvcm1PcHRpb25zKFxuICAgICAgICBfLmNsb25lRGVlcCh0aGlzLmZvcm0uY3VzdG9tRm9ybUl0ZW1zKVxuICAgICAgKVxuICAgIH1cblxuICAgIC8vIGlmIGFsdGVybmF0ZSBsYXlvdXQgZm91bmQsIGNvcHkgYWx0ZXJuYXRlIGxheW91dCBvcHRpb25zIGludG8gc2NoZW1hXG4gICAgaWYgKGFsdGVybmF0ZUxheW91dCkge1xuICAgICAgSnNvblBvaW50ZXIuZm9yRWFjaERlZXAoYWx0ZXJuYXRlTGF5b3V0LCAodmFsdWUsIHBvaW50ZXIpID0+IHtcbiAgICAgICAgY29uc3Qgc2NoZW1hUG9pbnRlciA9IHBvaW50ZXJcbiAgICAgICAgICAucmVwbGFjZSgvXFwvL2csICcvcHJvcGVydGllcy8nKVxuICAgICAgICAgIC5yZXBsYWNlKC9cXC9wcm9wZXJ0aWVzXFwvaXRlbXNcXC9wcm9wZXJ0aWVzXFwvL2csICcvaXRlbXMvcHJvcGVydGllcy8nKVxuICAgICAgICAgIC5yZXBsYWNlKFxuICAgICAgICAgICAgL1xcL3Byb3BlcnRpZXNcXC90aXRsZU1hcFxcL3Byb3BlcnRpZXNcXC8vZyxcbiAgICAgICAgICAgICcvdGl0bGVNYXAvcHJvcGVydGllcy8nXG4gICAgICAgICAgKVxuICAgICAgICBpZiAoaGFzVmFsdWUodmFsdWUpICYmIGhhc1ZhbHVlKHBvaW50ZXIpKSB7XG4gICAgICAgICAgbGV0IGtleSA9IEpzb25Qb2ludGVyLnRvS2V5KHBvaW50ZXIpXG4gICAgICAgICAgY29uc3QgZ3JvdXBQb2ludGVyID0gKEpzb25Qb2ludGVyLnBhcnNlKHNjaGVtYVBvaW50ZXIpIHx8IFtdKS5zbGljZShcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAtMlxuICAgICAgICAgIClcbiAgICAgICAgICBsZXQgaXRlbVBvaW50ZXI6IHN0cmluZyB8IHN0cmluZ1tdXG5cbiAgICAgICAgICAvLyBJZiAndWk6b3JkZXInIG9iamVjdCBmb3VuZCwgY29weSBpbnRvIG9iamVjdCBzY2hlbWEgcm9vdFxuICAgICAgICAgIGlmIChrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ3VpOm9yZGVyJykge1xuICAgICAgICAgICAgaXRlbVBvaW50ZXIgPSBbLi4uZ3JvdXBQb2ludGVyLCAndWk6b3JkZXInXVxuXG4gICAgICAgICAgICAvLyBDb3B5IG90aGVyIGFsdGVybmF0ZSBsYXlvdXQgb3B0aW9ucyB0byBzY2hlbWEgJ3gtc2NoZW1hLWZvcm0nLFxuICAgICAgICAgICAgLy8gKGxpa2UgQW5ndWxhciBTY2hlbWEgRm9ybSBvcHRpb25zKSBhbmQgcmVtb3ZlIGFueSAndWk6JyBwcmVmaXhlc1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoa2V5LnNsaWNlKDAsIDMpLnRvTG93ZXJDYXNlKCkgPT09ICd1aTonKSB7XG4gICAgICAgICAgICAgIGtleSA9IGtleS5zbGljZSgzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXRlbVBvaW50ZXIgPSBbLi4uZ3JvdXBQb2ludGVyLCAneC1zY2hlbWEtZm9ybScsIGtleV1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgSnNvblBvaW50ZXIuaGFzKHRoaXMuanNmLnNjaGVtYSwgZ3JvdXBQb2ludGVyKSAmJlxuICAgICAgICAgICAgIUpzb25Qb2ludGVyLmhhcyh0aGlzLmpzZi5zY2hlbWEsIGl0ZW1Qb2ludGVyKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgSnNvblBvaW50ZXIuc2V0KHRoaXMuanNmLnNjaGVtYSwgaXRlbVBvaW50ZXIsIHZhbHVlKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ2FjdGl2YXRlRm9ybScgZnVuY3Rpb25cbiAgICpcbiAgICogLi4uY29udGludWVkIGZyb20gJ2luaXRpYWxpemVTY2hlbWEnIGZ1bmN0aW9uLCBhYm92ZVxuICAgKiBJZiAnc2NoZW1hJyBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZWQgKGkuZS4gbm8gc2NoZW1hIGlucHV0IGZvdW5kKVxuICAgKiA2LiBJZiBsYXlvdXQgaW5wdXQgLSBidWlsZCBzY2hlbWEgZnJvbSBsYXlvdXQgaW5wdXRcbiAgICogNy4gSWYgZGF0YSBpbnB1dCAtIGJ1aWxkIHNjaGVtYSBmcm9tIGRhdGEgaW5wdXRcbiAgICpcbiAgICogQ3JlYXRlIGZpbmFsIGxheW91dCxcbiAgICogYnVpbGQgdGhlIEZvcm1Hcm91cCB0ZW1wbGF0ZSBhbmQgdGhlIEFuZ3VsYXIgRm9ybUdyb3VwLFxuICAgKiBzdWJzY3JpYmUgdG8gY2hhbmdlcyxcbiAgICogYW5kIGFjdGl2YXRlIHRoZSBmb3JtLlxuICAgKi9cbiAgcHJpdmF0ZSBhY3RpdmF0ZUZvcm0oKSB7XG4gICAgLy8gSWYgJ3NjaGVtYScgbm90IGluaXRpYWxpemVkXG4gICAgaWYgKGlzRW1wdHkodGhpcy5qc2Yuc2NoZW1hKSkge1xuICAgICAgLy8gVE9ETzogSWYgZnVsbCBsYXlvdXQgaW5wdXQgKHdpdGggbm8gJyonKSwgYnVpbGQgc2NoZW1hIGZyb20gbGF5b3V0XG4gICAgICAvLyBpZiAoIXRoaXMuanNmLmxheW91dC5pbmNsdWRlcygnKicpKSB7XG4gICAgICAvLyAgIHRoaXMuanNmLmJ1aWxkU2NoZW1hRnJvbUxheW91dCgpO1xuICAgICAgLy8gfSBlbHNlXG5cbiAgICAgIC8vIElmIGRhdGEgaW5wdXQsIGJ1aWxkIHNjaGVtYSBmcm9tIGRhdGFcbiAgICAgIGlmICghaXNFbXB0eSh0aGlzLmpzZi5mb3JtVmFsdWVzKSkge1xuICAgICAgICB0aGlzLmpzZi5idWlsZFNjaGVtYUZyb21EYXRhKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWlzRW1wdHkodGhpcy5qc2Yuc2NoZW1hKSkge1xuICAgICAgLy8gSWYgbm90IGFscmVhZHkgaW5pdGlhbGl6ZWQsIGluaXRpYWxpemUgYWp2IGFuZCBjb21waWxlIHNjaGVtYVxuICAgICAgdGhpcy5qc2YuY29tcGlsZUFqdlNjaGVtYSgpXG5cbiAgICAgIC8vIFVwZGF0ZSBhbGwgbGF5b3V0IGVsZW1lbnRzLCBhZGQgdmFsdWVzLCB3aWRnZXRzLCBhbmQgdmFsaWRhdG9ycyxcbiAgICAgIC8vIHJlcGxhY2UgYW55ICcqJyB3aXRoIGEgbGF5b3V0IGJ1aWx0IGZyb20gYWxsIHNjaGVtYSBlbGVtZW50cyxcbiAgICAgIC8vIGFuZCB1cGRhdGUgdGhlIEZvcm1Hcm91cCB0ZW1wbGF0ZSB3aXRoIGFueSBuZXcgdmFsaWRhdG9yc1xuICAgICAgdGhpcy5qc2YuYnVpbGRMYXlvdXQodGhpcy53aWRnZXRMaWJyYXJ5KVxuXG4gICAgICAvLyBCdWlsZCB0aGUgQW5ndWxhciBGb3JtR3JvdXAgdGVtcGxhdGUgZnJvbSB0aGUgc2NoZW1hXG4gICAgICB0aGlzLmpzZi5idWlsZEZvcm1Hcm91cFRlbXBsYXRlKHRoaXMuanNmLmZvcm1WYWx1ZXMpXG5cbiAgICAgIC8vIEJ1aWxkIHRoZSByZWFsIEFuZ3VsYXIgRm9ybUdyb3VwIGZyb20gdGhlIEZvcm1Hcm91cCB0ZW1wbGF0ZVxuICAgICAgdGhpcy5qc2YuYnVpbGRGb3JtR3JvdXAoKVxuICAgIH1cblxuICAgIGlmICh0aGlzLmpzZi5mb3JtR3JvdXApIHtcbiAgICAgIC8vIFJlc2V0IGluaXRpYWwgZm9ybSB2YWx1ZXNcbiAgICAgIGlmIChcbiAgICAgICAgIWlzRW1wdHkodGhpcy5qc2YuZm9ybVZhbHVlcykgJiZcbiAgICAgICAgdGhpcy5qc2YuZm9ybU9wdGlvbnMuc2V0U2NoZW1hRGVmYXVsdHMgIT09IHRydWUgJiZcbiAgICAgICAgdGhpcy5qc2YuZm9ybU9wdGlvbnMuc2V0TGF5b3V0RGVmYXVsdHMgIT09IHRydWVcbiAgICAgICkge1xuICAgICAgICB0aGlzLnNldEZvcm1WYWx1ZXModGhpcy5qc2YuZm9ybVZhbHVlcylcbiAgICAgIH1cblxuICAgICAgLy8gVE9ETzogRmlndXJlIG91dCBob3cgdG8gZGlzcGxheSBjYWxjdWxhdGVkIHZhbHVlcyB3aXRob3V0IGNoYW5naW5nIG9iamVjdCBkYXRhXG4gICAgICAvLyBTZWUgaHR0cDovL3VsaW9uLmdpdGh1Yi5pby9qc29uZm9ybS9wbGF5Z3JvdW5kLz9leGFtcGxlPXRlbXBsYXRpbmctdmFsdWVzXG4gICAgICAvLyBDYWxjdWxhdGUgcmVmZXJlbmNlcyB0byBvdGhlciBmaWVsZHNcbiAgICAgIC8vIGlmICghaXNFbXB0eSh0aGlzLmpzZi5mb3JtR3JvdXAudmFsdWUpKSB7XG4gICAgICAvLyAgIGZvckVhY2godGhpcy5qc2YuZm9ybUdyb3VwLnZhbHVlLCAodmFsdWUsIGtleSwgb2JqZWN0LCByb290T2JqZWN0KSA9PiB7XG4gICAgICAvLyAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vICAgICAgIG9iamVjdFtrZXldID0gdGhpcy5qc2YucGFyc2VUZXh0KHZhbHVlLCB2YWx1ZSwgcm9vdE9iamVjdCwga2V5KTtcbiAgICAgIC8vICAgICB9XG4gICAgICAvLyAgIH0sICd0b3AtZG93bicpO1xuICAgICAgLy8gfVxuXG4gICAgICAvLyBTdWJzY3JpYmUgdG8gZm9ybSBjaGFuZ2VzIHRvIG91dHB1dCBsaXZlIGRhdGEsIHZhbGlkYXRpb24sIGFuZCBlcnJvcnNcbiAgICAgIHRoaXMuanNmLmRhdGFDaGFuZ2VzLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZXMuZW1pdCh0aGlzLm9iamVjdFdyYXAgPyBkYXRhWycxJ10gOiBkYXRhKVxuICAgICAgICBpZiAodGhpcy5mb3JtVmFsdWVzSW5wdXQgJiYgdGhpcy5mb3JtVmFsdWVzSW5wdXQuaW5kZXhPZignLicpID09PSAtMSkge1xuICAgICAgICAgIHRoaXNbYCR7dGhpcy5mb3JtVmFsdWVzSW5wdXR9Q2hhbmdlYF0uZW1pdChcbiAgICAgICAgICAgIHRoaXMub2JqZWN0V3JhcCA/IGRhdGFbJzEnXSA6IGRhdGFcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIC8vIFRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiBvbiBzdGF0dXNDaGFuZ2VzIHRvIHNob3cgdXBkYXRlZCBlcnJvcnNcbiAgICAgIHRoaXMuanNmLmZvcm1Hcm91cC5zdGF0dXNDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PlxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpXG4gICAgICApXG4gICAgICB0aGlzLmpzZi5pc1ZhbGlkQ2hhbmdlcy5zdWJzY3JpYmUoaXNWYWxpZCA9PiB0aGlzLmlzVmFsaWQuZW1pdChpc1ZhbGlkKSlcbiAgICAgIHRoaXMuanNmLnZhbGlkYXRpb25FcnJvckNoYW5nZXMuc3Vic2NyaWJlKGVyciA9PlxuICAgICAgICB0aGlzLnZhbGlkYXRpb25FcnJvcnMuZW1pdChlcnIpXG4gICAgICApXG5cbiAgICAgIC8vIE91dHB1dCBmaW5hbCBzY2hlbWEsIGZpbmFsIGxheW91dCwgYW5kIGluaXRpYWwgZGF0YVxuICAgICAgdGhpcy5mb3JtU2NoZW1hLmVtaXQodGhpcy5qc2Yuc2NoZW1hKVxuICAgICAgdGhpcy5mb3JtTGF5b3V0LmVtaXQodGhpcy5qc2YubGF5b3V0KVxuICAgICAgdGhpcy5vbkNoYW5nZXMuZW1pdCh0aGlzLm9iamVjdFdyYXAgPyB0aGlzLmpzZi5kYXRhWycxJ10gOiB0aGlzLmpzZi5kYXRhKVxuXG4gICAgICAvLyBJZiB2YWxpZGF0ZU9uUmVuZGVyLCBvdXRwdXQgaW5pdGlhbCB2YWxpZGF0aW9uIGFuZCBhbnkgZXJyb3JzXG4gICAgICBjb25zdCB2YWxpZGF0ZU9uUmVuZGVyID0gSnNvblBvaW50ZXIuZ2V0KFxuICAgICAgICB0aGlzLmpzZixcbiAgICAgICAgJy9mb3JtT3B0aW9ucy92YWxpZGF0ZU9uUmVuZGVyJ1xuICAgICAgKVxuICAgICAgaWYgKHZhbGlkYXRlT25SZW5kZXIpIHtcbiAgICAgICAgLy8gdmFsaWRhdGVPblJlbmRlciA9PT0gJ2F1dG8nIHx8IHRydWVcbiAgICAgICAgY29uc3QgdG91Y2hBbGwgPSBjb250cm9sID0+IHtcbiAgICAgICAgICBpZiAodmFsaWRhdGVPblJlbmRlciA9PT0gdHJ1ZSB8fCBoYXNWYWx1ZShjb250cm9sLnZhbHVlKSkge1xuICAgICAgICAgICAgY29udHJvbC5tYXJrQXNUb3VjaGVkKClcbiAgICAgICAgICB9XG4gICAgICAgICAgT2JqZWN0LmtleXMoY29udHJvbC5jb250cm9scyB8fCB7fSkuZm9yRWFjaChrZXkgPT5cbiAgICAgICAgICAgIHRvdWNoQWxsKGNvbnRyb2wuY29udHJvbHNba2V5XSlcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgdG91Y2hBbGwodGhpcy5qc2YuZm9ybUdyb3VwKVxuICAgICAgICB0aGlzLmlzVmFsaWQuZW1pdCh0aGlzLmpzZi5pc1ZhbGlkKVxuICAgICAgICB0aGlzLnZhbGlkYXRpb25FcnJvcnMuZW1pdCh0aGlzLmpzZi5hanZFcnJvcnMpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=