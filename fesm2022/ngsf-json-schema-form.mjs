import * as i0 from '@angular/core';
import { forwardRef, EventEmitter, Component, ChangeDetectionStrategy, Input, Output, NgModule } from '@angular/core';
import * as i4 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i2 from '@angular/platform-browser';
import * as _ from 'lodash';
import * as i1 from '@ngsf/widget-library';
import { JsonSchemaFormService, FrameworkLibraryService, WidgetLibraryService, WidgetLibraryModule } from '@ngsf/widget-library';
import { isObject, hasOwn, isEmpty, inArray, convertSchemaToDraft6, resolveSchemaReferences, hasValue, isArray, forEach, JsonPointer, Framework } from '@ngsf/common';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import { NoFramework } from '@ngsf/no-framework';

function JsonSchemaFormComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "link", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const stylesheet_r3 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("href", stylesheet_r3, i0.ɵɵsanitizeResourceUrl);
} }
function JsonSchemaFormComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div");
} }
function JsonSchemaFormComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtext(1, " Debug output: ");
    i0.ɵɵelementStart(2, "pre");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.debugOutput);
} }
const JSON_SCHEMA_FORM_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JsonSchemaFormComponent),
    multi: true,
};
class JsonSchemaFormComponent {
    changeDetector;
    frameworkLibrary;
    widgetLibrary;
    jsf;
    sanitizer;
    debugOutput;
    formValueSubscription = null;
    formInitialized = false;
    objectWrap = false;
    formValuesInput;
    previousInputs = {
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
    schema;
    layout;
    data;
    options;
    framework;
    widgets;
    form;
    model;
    JSONSchema;
    UISchema;
    formData;
    ngModel;
    language;
    loadExternalAssets;
    debug;
    onChanges = new EventEmitter();
    onSubmit = new EventEmitter();
    isValid = new EventEmitter();
    validationErrors = new EventEmitter();
    formSchema = new EventEmitter();
    formLayout = new EventEmitter();
    dataChange = new EventEmitter();
    modelChange = new EventEmitter();
    formDataChange = new EventEmitter();
    ngModelChange = new EventEmitter();
    onChange;
    onTouched;
    constructor(changeDetector, frameworkLibrary, widgetLibrary, jsf, sanitizer) {
        this.changeDetector = changeDetector;
        this.frameworkLibrary = frameworkLibrary;
        this.widgetLibrary = widgetLibrary;
        this.jsf = jsf;
        this.sanitizer = sanitizer;
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
    static ɵfac = function JsonSchemaFormComponent_Factory(t) { return new (t || JsonSchemaFormComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.FrameworkLibraryService), i0.ɵɵdirectiveInject(i1.WidgetLibraryService), i0.ɵɵdirectiveInject(i1.JsonSchemaFormService), i0.ɵɵdirectiveInject(i2.DomSanitizer)); };
    static ɵcmp = i0.ɵɵdefineComponent({ type: JsonSchemaFormComponent, selectors: [["json-schema-form"]], inputs: { schema: "schema", layout: "layout", data: "data", options: "options", framework: "framework", widgets: "widgets", form: "form", model: "model", JSONSchema: "JSONSchema", UISchema: "UISchema", formData: "formData", ngModel: "ngModel", language: "language", loadExternalAssets: "loadExternalAssets", debug: "debug", value: "value" }, outputs: { onChanges: "onChanges", onSubmit: "onSubmit", isValid: "isValid", validationErrors: "validationErrors", formSchema: "formSchema", formLayout: "formLayout", dataChange: "dataChange", modelChange: "modelChange", formDataChange: "formDataChange", ngModelChange: "ngModelChange" }, features: [i0.ɵɵProvidersFeature([JsonSchemaFormService, JSON_SCHEMA_FORM_VALUE_ACCESSOR]), i0.ɵɵNgOnChangesFeature], decls: 5, vars: 4, consts: [[4, "ngFor", "ngForOf"], [1, "json-schema-form", 3, "ngSubmit"], [3, "layout"], [4, "ngIf"], ["rel", "stylesheet", 3, "href"]], template: function JsonSchemaFormComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, JsonSchemaFormComponent_div_0_Template, 2, 1, "div", 0);
            i0.ɵɵtemplate(1, JsonSchemaFormComponent_div_1_Template, 1, 0, "div", 0);
            i0.ɵɵelementStart(2, "form", 1);
            i0.ɵɵlistener("ngSubmit", function JsonSchemaFormComponent_Template_form_ngSubmit_2_listener() { return ctx.submitForm(); });
            i0.ɵɵelement(3, "root-widget", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(4, JsonSchemaFormComponent_div_4_Template, 4, 1, "div", 3);
        } if (rf & 2) {
            i0.ɵɵproperty("ngForOf", ctx.stylesheets);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx.scripts);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("layout", ctx.jsf == null ? null : ctx.jsf.layout);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.debug || (ctx.jsf == null ? null : ctx.jsf.formOptions == null ? null : ctx.jsf.formOptions.debug));
        } }, dependencies: [i3.NgForOf, i3.NgIf, i4.ɵNgNoValidate, i4.NgControlStatusGroup, i4.NgForm, i1.RootComponent], encapsulation: 2, changeDetection: 0 });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(JsonSchemaFormComponent, [{
        type: Component,
        args: [{
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
                providers: [JsonSchemaFormService, JSON_SCHEMA_FORM_VALUE_ACCESSOR],
            }]
    }], function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.FrameworkLibraryService }, { type: i1.WidgetLibraryService }, { type: i1.JsonSchemaFormService }, { type: i2.DomSanitizer }]; }, { schema: [{
            type: Input
        }], layout: [{
            type: Input
        }], data: [{
            type: Input
        }], options: [{
            type: Input
        }], framework: [{
            type: Input
        }], widgets: [{
            type: Input
        }], form: [{
            type: Input
        }], model: [{
            type: Input
        }], JSONSchema: [{
            type: Input
        }], UISchema: [{
            type: Input
        }], formData: [{
            type: Input
        }], ngModel: [{
            type: Input
        }], language: [{
            type: Input
        }], loadExternalAssets: [{
            type: Input
        }], debug: [{
            type: Input
        }], onChanges: [{
            type: Output
        }], onSubmit: [{
            type: Output
        }], isValid: [{
            type: Output
        }], validationErrors: [{
            type: Output
        }], formSchema: [{
            type: Output
        }], formLayout: [{
            type: Output
        }], dataChange: [{
            type: Output
        }], modelChange: [{
            type: Output
        }], formDataChange: [{
            type: Output
        }], ngModelChange: [{
            type: Output
        }], value: [{
            type: Input
        }] }); })();

class JsonSchemaFormModule {
    static forRoot(...frameworks) {
        const loadFrameworks = frameworks.length
            ? frameworks.map(framework => framework.forRoot().providers[0])
            : [{ provide: Framework, useClass: NoFramework, multi: true }];
        return {
            ngModule: JsonSchemaFormModule,
            providers: [
                JsonSchemaFormService,
                FrameworkLibraryService,
                WidgetLibraryService,
                ...loadFrameworks,
            ],
        };
    }
    static ɵfac = function JsonSchemaFormModule_Factory(t) { return new (t || JsonSchemaFormModule)(); };
    static ɵmod = i0.ɵɵdefineNgModule({ type: JsonSchemaFormModule });
    static ɵinj = i0.ɵɵdefineInjector({ imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            WidgetLibraryModule, WidgetLibraryModule] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(JsonSchemaFormModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    WidgetLibraryModule,
                ],
                declarations: [JsonSchemaFormComponent],
                exports: [JsonSchemaFormComponent, WidgetLibraryModule],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(JsonSchemaFormModule, { declarations: [JsonSchemaFormComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        WidgetLibraryModule], exports: [JsonSchemaFormComponent, WidgetLibraryModule] }); })();

export { JSON_SCHEMA_FORM_VALUE_ACCESSOR, JsonSchemaFormComponent, JsonSchemaFormModule };
//# sourceMappingURL=ngsf-json-schema-form.mjs.map
