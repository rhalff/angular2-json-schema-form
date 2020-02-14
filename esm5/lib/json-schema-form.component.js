var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as _ from 'lodash';
import { FrameworkLibraryService, JsonSchemaFormService, WidgetLibraryService, } from '@ngsf/widget-library';
import { hasValue, inArray, isArray, isEmpty, isObject, forEach, hasOwn, JsonPointer, resolveSchemaReferences, convertSchemaToDraft6, } from '@ngsf/common';
export var JSON_SCHEMA_FORM_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return JsonSchemaFormComponent; }),
    multi: true,
};
var JsonSchemaFormComponent = (function () {
    function JsonSchemaFormComponent(changeDetector, frameworkLibrary, widgetLibrary, jsf, sanitizer) {
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
    Object.defineProperty(JsonSchemaFormComponent.prototype, "value", {
        get: function () {
            return this.objectWrap ? this.jsf.data['1'] : this.jsf.data;
        },
        set: function (value) {
            this.setFormValues(value, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JsonSchemaFormComponent.prototype, "stylesheets", {
        get: function () {
            var stylesheets = this.frameworkLibrary.getFrameworkStylesheets();
            var load = this.sanitizer.bypassSecurityTrustResourceUrl;
            return stylesheets.map(function (stylesheet) { return load(stylesheet); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JsonSchemaFormComponent.prototype, "scripts", {
        get: function () {
            var scripts = this.frameworkLibrary.getFrameworkScripts();
            var load = this.sanitizer.bypassSecurityTrustResourceUrl;
            return scripts.map(function (script) { return load(script); });
        },
        enumerable: true,
        configurable: true
    });
    JsonSchemaFormComponent.prototype.ngOnInit = function () {
        this.updateForm();
    };
    JsonSchemaFormComponent.prototype.ngOnChanges = function () {
        this.updateForm();
    };
    JsonSchemaFormComponent.prototype.writeValue = function (value) {
        this.setFormValues(value, false);
        if (!this.formValuesInput) {
            this.formValuesInput = 'ngModel';
        }
    };
    JsonSchemaFormComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    JsonSchemaFormComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    JsonSchemaFormComponent.prototype.setDisabledState = function (isDisabled) {
        if (this.jsf.formOptions.formDisabled !== !!isDisabled) {
            this.jsf.formOptions.formDisabled = !!isDisabled;
            this.initializeForm();
        }
    };
    JsonSchemaFormComponent.prototype.updateForm = function () {
        var _this = this;
        if (!this.formInitialized ||
            !this.formValuesInput ||
            (this.language && this.language !== this.jsf.language)) {
            this.initializeForm();
        }
        else {
            if (this.language && this.language !== this.jsf.language) {
                this.jsf.setLanguage(this.language);
            }
            var changedInput = Object.keys(this.previousInputs).filter(function (input) { return _this.previousInputs[input] !== _this[input]; });
            var resetFirst = true;
            if (changedInput.length === 1 &&
                changedInput[0] === 'form' &&
                this.formValuesInput.startsWith('form.')) {
                changedInput = Object.keys(this.previousInputs.form || {})
                    .filter(function (key) { return !_.isEqual(_this.previousInputs.form[key], _this.form[key]); })
                    .map(function (key) { return "form." + key; });
                resetFirst = false;
            }
            if (changedInput.length === 1 &&
                changedInput[0] === this.formValuesInput) {
                if (this.formValuesInput.indexOf('.') === -1) {
                    this.setFormValues(this[this.formValuesInput], resetFirst);
                }
                else {
                    var _a = __read(this.formValuesInput.split('.'), 2), input = _a[0], key = _a[1];
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
                .filter(function (input) { return _this.previousInputs[input] !== _this[input]; })
                .forEach(function (input) { return (_this.previousInputs[input] = _this[input]); });
        }
    };
    JsonSchemaFormComponent.prototype.setFormValues = function (formValues, resetFirst) {
        if (resetFirst === void 0) { resetFirst = true; }
        if (formValues) {
            var newFormValues = this.objectWrap ? formValues['1'] : formValues;
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
    };
    JsonSchemaFormComponent.prototype.submitForm = function () {
        var validData = this.jsf.validData;
        this.onSubmit.emit(this.objectWrap ? validData['1'] : validData);
    };
    JsonSchemaFormComponent.prototype.initializeForm = function () {
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
                var vars = [];
                this.debugOutput = vars.map(function (v) { return JSON.stringify(v, null, 2); }).join('\n');
            }
            this.formInitialized = true;
        }
    };
    JsonSchemaFormComponent.prototype.initializeOptions = function () {
        var e_1, _a;
        if (this.language && this.language !== this.jsf.language) {
            this.jsf.setLanguage(this.language);
        }
        this.jsf.setOptions({ debug: !!this.debug });
        var loadExternalAssets = this.loadExternalAssets || false;
        var framework = this.framework || 'default';
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
            try {
                for (var _b = __values(Object.keys(this.jsf.formOptions.widgets)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var widget = _c.value;
                    this.widgetLibrary.registerWidget(widget, this.jsf.formOptions.widgets[widget]);
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
        if (isObject(this.form) && isObject(this.form.tpldata)) {
            this.jsf.setTpldata(this.form.tpldata);
        }
    };
    JsonSchemaFormComponent.prototype.initializeSchema = function () {
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
    };
    JsonSchemaFormComponent.prototype.initializeData = function () {
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
    };
    JsonSchemaFormComponent.prototype.initializeLayout = function () {
        var _this = this;
        var fixJsonFormOptions = function (layout) {
            if (isObject(layout) || isArray(layout)) {
                forEach(layout, function (value, key) {
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
        var alternateLayout = null;
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
            JsonPointer.forEachDeep(alternateLayout, function (value, pointer) {
                var schemaPointer = pointer
                    .replace(/\//g, '/properties/')
                    .replace(/\/properties\/items\/properties\//g, '/items/properties/')
                    .replace(/\/properties\/titleMap\/properties\//g, '/titleMap/properties/');
                if (hasValue(value) && hasValue(pointer)) {
                    var key = JsonPointer.toKey(pointer);
                    var groupPointer = (JsonPointer.parse(schemaPointer) || []).slice(0, -2);
                    var itemPointer = void 0;
                    if (key.toLowerCase() === 'ui:order') {
                        itemPointer = __spread(groupPointer, ['ui:order']);
                    }
                    else {
                        if (key.slice(0, 3).toLowerCase() === 'ui:') {
                            key = key.slice(3);
                        }
                        itemPointer = __spread(groupPointer, ['x-schema-form', key]);
                    }
                    if (JsonPointer.has(_this.jsf.schema, groupPointer) &&
                        !JsonPointer.has(_this.jsf.schema, itemPointer)) {
                        JsonPointer.set(_this.jsf.schema, itemPointer, value);
                    }
                }
            });
        }
    };
    JsonSchemaFormComponent.prototype.activateForm = function () {
        var _this = this;
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
            this.jsf.dataChanges.subscribe(function (data) {
                _this.onChanges.emit(_this.objectWrap ? data['1'] : data);
                if (_this.formValuesInput && _this.formValuesInput.indexOf('.') === -1) {
                    _this[_this.formValuesInput + "Change"].emit(_this.objectWrap ? data['1'] : data);
                }
            });
            this.jsf.formGroup.statusChanges.subscribe(function () {
                return _this.changeDetector.markForCheck();
            });
            this.jsf.isValidChanges.subscribe(function (isValid) { return _this.isValid.emit(isValid); });
            this.jsf.validationErrorChanges.subscribe(function (err) {
                return _this.validationErrors.emit(err);
            });
            this.formSchema.emit(this.jsf.schema);
            this.formLayout.emit(this.jsf.layout);
            this.onChanges.emit(this.objectWrap ? this.jsf.data['1'] : this.jsf.data);
            var validateOnRender_1 = JsonPointer.get(this.jsf, '/formOptions/validateOnRender');
            if (validateOnRender_1) {
                var touchAll_1 = function (control) {
                    if (validateOnRender_1 === true || hasValue(control.value)) {
                        control.markAsTouched();
                    }
                    Object.keys(control.controls || {}).forEach(function (key) {
                        return touchAll_1(control.controls[key]);
                    });
                };
                touchAll_1(this.jsf.formGroup);
                this.isValid.emit(this.jsf.isValid);
                this.validationErrors.emit(this.jsf.ajvErrors);
            }
        }
    };
    JsonSchemaFormComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: FrameworkLibraryService },
        { type: WidgetLibraryService },
        { type: JsonSchemaFormService },
        { type: DomSanitizer }
    ]; };
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
            template: "\n    <div *ngFor=\"let stylesheet of stylesheets\">\n      <link rel=\"stylesheet\" [href]=\"stylesheet\" />\n    </div>\n    <div *ngFor=\"let script of scripts\">\n      <script type=\"text/javascript\" [src]=\"script\"></script>\n    </div>\n    <form class=\"json-schema-form\" (ngSubmit)=\"submitForm()\">\n      <root-widget [layout]=\"jsf?.layout\"></root-widget>\n    </form>\n    <div *ngIf=\"debug || jsf?.formOptions?.debug\">\n      Debug output:\n      <pre>{{ debugOutput }}</pre>\n    </div>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [JsonSchemaFormService, JSON_SCHEMA_FORM_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            FrameworkLibraryService,
            WidgetLibraryService,
            JsonSchemaFormService,
            DomSanitizer])
    ], JsonSchemaFormComponent);
    return JsonSchemaFormComponent;
}());
export { JsonSchemaFormComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zY2hlbWEtZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdzZi9qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2pzb24tc2NoZW1hLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFDTixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUE7QUFDdEIsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFBO0FBQ3RFLE9BQU8sRUFBQyxZQUFZLEVBQUUsZUFBZSxFQUFDLE1BQU0sMkJBQTJCLENBQUE7QUFDdkUsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUE7QUFDM0IsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixxQkFBcUIsRUFDckIsb0JBQW9CLEdBQ3JCLE1BQU0sc0JBQXNCLENBQUE7QUFDN0IsT0FBTyxFQUNMLFFBQVEsRUFDUixPQUFPLEVBQ1AsT0FBTyxFQUNQLE9BQU8sRUFDUCxRQUFRLEVBQ1IsT0FBTyxFQUNQLE1BQU0sRUFDTixXQUFXLEVBQ1gsdUJBQXVCLEVBQ3ZCLHFCQUFxQixHQUN0QixNQUFNLGNBQWMsQ0FBQTtBQUVyQixNQUFNLENBQUMsSUFBTSwrQkFBK0IsR0FBUTtJQUNsRCxPQUFPLEVBQUUsaUJBQWlCO0lBRTFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLHVCQUF1QixFQUF2QixDQUF1QixDQUFDO0lBQ3RELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQTtBQTBERDtJQXVGRSxpQ0FDVSxjQUFpQyxFQUNqQyxnQkFBeUMsRUFDekMsYUFBbUMsRUFDcEMsR0FBMEIsRUFDekIsU0FBdUI7UUFK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TSxFQUFFOzttRUFBeUM7SUFDeEM7UUFBVCxNQUFNLEVBQUU7O2tFQUF3QztJQWFqRDtRQURDLEtBQUssRUFBRTs7O3dEQUdQO0lBbEdVLHVCQUF1QjtRQXRCbkMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixRQUFRLEVBQUUsaWdCQWNUO1lBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07WUFHL0MsU0FBUyxFQUFFLENBQUMscUJBQXFCLEVBQUUsK0JBQStCLENBQUM7U0FDcEUsQ0FBQzt5Q0F5RjBCLGlCQUFpQjtZQUNmLHVCQUF1QjtZQUMxQixvQkFBb0I7WUFDL0IscUJBQXFCO1lBQ2QsWUFBWTtPQTVGdEIsdUJBQXVCLENBZ3NCbkM7SUFBRCw4QkFBQztDQUFBLEFBaHNCRCxJQWdzQkM7U0Foc0JZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJ1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlcidcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IHtcbiAgRnJhbWV3b3JrTGlicmFyeVNlcnZpY2UsXG4gIEpzb25TY2hlbWFGb3JtU2VydmljZSxcbiAgV2lkZ2V0TGlicmFyeVNlcnZpY2UsXG59IGZyb20gJ0BuZ3NmL3dpZGdldC1saWJyYXJ5J1xuaW1wb3J0IHtcbiAgaGFzVmFsdWUsXG4gIGluQXJyYXksXG4gIGlzQXJyYXksXG4gIGlzRW1wdHksXG4gIGlzT2JqZWN0LFxuICBmb3JFYWNoLFxuICBoYXNPd24sXG4gIEpzb25Qb2ludGVyLFxuICByZXNvbHZlU2NoZW1hUmVmZXJlbmNlcyxcbiAgY29udmVydFNjaGVtYVRvRHJhZnQ2LFxufSBmcm9tICdAbmdzZi9jb21tb24nXG5cbmV4cG9ydCBjb25zdCBKU09OX1NDSEVNQV9GT1JNX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWNsYXJlXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEpzb25TY2hlbWFGb3JtQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWUsXG59XG5cbi8qKlxuICogQW5ndWxhciBKU09OIFNjaGVtYSBGb3JtXG4gKlxuICogUm9vdCBtb2R1bGUgb2YgdGhlIEFuZ3VsYXIgSlNPTiBTY2hlbWEgRm9ybSBjbGllbnQtc2lkZSBsaWJyYXJ5LFxuICogYW4gQW5ndWxhciBsaWJyYXJ5IHdoaWNoIGdlbmVyYXRlcyBhbiBIVE1MIGZvcm0gZnJvbSBhIEpTT04gc2NoZW1hXG4gKiBzdHJ1Y3R1cmVkIGRhdGEgbW9kZWwgYW5kL29yIGEgSlNPTiBTY2hlbWEgRm9ybSBsYXlvdXQgZGVzY3JpcHRpb24uXG4gKlxuICogVGhpcyBsaWJyYXJ5IGFsc28gdmFsaWRhdGVzIGlucHV0IGRhdGEgYnkgdGhlIHVzZXIsIHVzaW5nIGJvdGggdmFsaWRhdG9ycyBvblxuICogaW5kaXZpZHVhbCBjb250cm9scyB0byBwcm92aWRlIHJlYWwtdGltZSBmZWVkYmFjayB3aGlsZSB0aGUgdXNlciBpcyBmaWxsaW5nXG4gKiBvdXQgdGhlIGZvcm0sIGFuZCB0aGVuIHZhbGlkYXRpbmcgdGhlIGVudGlyZSBpbnB1dCBhZ2FpbnN0IHRoZSBzY2hlbWEgd2hlblxuICogdGhlIGZvcm0gaXMgc3VibWl0dGVkIHRvIG1ha2Ugc3VyZSB0aGUgcmV0dXJuZWQgSlNPTiBkYXRhIG9iamVjdCBpcyB2YWxpZC5cbiAqXG4gKiBUaGlzIGxpYnJhcnkgaXMgc2ltaWxhciB0bywgYW5kIG1vc3RseSBBUEkgY29tcGF0aWJsZSB3aXRoOlxuICpcbiAqIC0gSlNPTiBTY2hlbWEgRm9ybSdzIEFuZ3VsYXIgU2NoZW1hIEZvcm0gbGlicmFyeSBmb3IgQW5ndWxhckpzXG4gKiAgIGh0dHA6Ly9zY2hlbWFmb3JtLmlvXG4gKiAgIGh0dHA6Ly9zY2hlbWFmb3JtLmlvL2V4YW1wbGVzL2Jvb3RzdHJhcC1leGFtcGxlLmh0bWwgKGV4YW1wbGVzKVxuICpcbiAqIC0gTW96aWxsYSdzIHJlYWN0LWpzb25zY2hlbWEtZm9ybSBsaWJyYXJ5IGZvciBSZWFjdFxuICogICBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS1zZXJ2aWNlcy9yZWFjdC1qc29uc2NoZW1hLWZvcm1cbiAqICAgaHR0cHM6Ly9tb3ppbGxhLXNlcnZpY2VzLmdpdGh1Yi5pby9yZWFjdC1qc29uc2NoZW1hLWZvcm0gKGV4YW1wbGVzKVxuICpcbiAqIC0gSm9zaGZpcmUncyBKU09OIEZvcm0gbGlicmFyeSBmb3IgalF1ZXJ5XG4gKiAgIGh0dHBzOi8vZ2l0aHViLmNvbS9qb3NoZmlyZS9qc29uZm9ybVxuICogICBodHRwOi8vdWxpb24uZ2l0aHViLmlvL2pzb25mb3JtL3BsYXlncm91bmQgKGV4YW1wbGVzKVxuICpcbiAqIFRoaXMgbGlicmFyeSBkZXBlbmRzIG9uOlxuICogIC0gQW5ndWxhciAob2J2aW91c2x5KSAgICAgICAgICAgICAgICAgIGh0dHBzOi8vYW5ndWxhci5pb1xuICogIC0gbG9kYXNoLCBKYXZhU2NyaXB0IHV0aWxpdHkgbGlicmFyeSAgIGh0dHBzOi8vZ2l0aHViLmNvbS9sb2Rhc2gvbG9kYXNoXG4gKiAgLSBhanYsIEFub3RoZXIgSlNPTiBTY2hlbWEgdmFsaWRhdG9yICAgaHR0cHM6Ly9naXRodWIuY29tL2Vwb2JlcmV6a2luL2FqdlxuICpcbiAqIEluIGFkZGl0aW9uLCB0aGUgRXhhbXBsZSBQbGF5Z3JvdW5kIGFsc28gZGVwZW5kcyBvbjpcbiAqICAtIGJyYWNlLCBCcm93c2VyaWZpZWQgQWNlIGVkaXRvciAgICAgICBodHRwOi8vdGhsb3JlbnouZ2l0aHViLmlvL2JyYWNlXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2pzb24tc2NoZW1hLWZvcm0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgKm5nRm9yPVwibGV0IHN0eWxlc2hlZXQgb2Ygc3R5bGVzaGVldHNcIj5cbiAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBbaHJlZl09XCJzdHlsZXNoZWV0XCIgLz5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCBzY3JpcHQgb2Ygc2NyaXB0c1wiPlxuICAgICAgPHNjcmlwdCB0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCIgW3NyY109XCJzY3JpcHRcIj48L3NjcmlwdD5cbiAgICA8L2Rpdj5cbiAgICA8Zm9ybSBjbGFzcz1cImpzb24tc2NoZW1hLWZvcm1cIiAobmdTdWJtaXQpPVwic3VibWl0Rm9ybSgpXCI+XG4gICAgICA8cm9vdC13aWRnZXQgW2xheW91dF09XCJqc2Y/LmxheW91dFwiPjwvcm9vdC13aWRnZXQ+XG4gICAgPC9mb3JtPlxuICAgIDxkaXYgKm5nSWY9XCJkZWJ1ZyB8fCBqc2Y/LmZvcm1PcHRpb25zPy5kZWJ1Z1wiPlxuICAgICAgRGVidWcgb3V0cHV0OlxuICAgICAgPHByZT57eyBkZWJ1Z091dHB1dCB9fTwvcHJlPlxuICAgIDwvZGl2PlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgLy8gQWRkaW5nICdKc29uU2NoZW1hRm9ybVNlcnZpY2UnIGhlcmUsIGluc3RlYWQgb2YgaW4gdGhlIG1vZHVsZSxcbiAgLy8gY3JlYXRlcyBhIHNlcGFyYXRlIGluc3RhbmNlIG9mIHRoZSBzZXJ2aWNlIGZvciBlYWNoIGNvbXBvbmVudFxuICBwcm92aWRlcnM6IFtKc29uU2NoZW1hRm9ybVNlcnZpY2UsIEpTT05fU0NIRU1BX0ZPUk1fVkFMVUVfQUNDRVNTT1JdLFxufSlcbmV4cG9ydCBjbGFzcyBKc29uU2NoZW1hRm9ybUNvbXBvbmVudFxuICBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkNoYW5nZXMsIE9uSW5pdCB7XG4gIGRlYnVnT3V0cHV0OiBhbnkgLy8gRGVidWcgaW5mb3JtYXRpb24sIGlmIHJlcXVlc3RlZFxuICBmb3JtVmFsdWVTdWJzY3JpcHRpb246IGFueSA9IG51bGxcbiAgZm9ybUluaXRpYWxpemVkID0gZmFsc2VcbiAgb2JqZWN0V3JhcCA9IGZhbHNlIC8vIElzIG5vbi1vYmplY3QgaW5wdXQgc2NoZW1hIHdyYXBwZWQgaW4gYW4gb2JqZWN0P1xuXG4gIGZvcm1WYWx1ZXNJbnB1dDogc3RyaW5nIC8vIE5hbWUgb2YgdGhlIGlucHV0IHByb3ZpZGluZyB0aGUgZm9ybSBkYXRhXG4gIHByZXZpb3VzSW5wdXRzOiB7XG4gICAgLy8gUHJldmlvdXMgaW5wdXQgdmFsdWVzLCB0byBkZXRlY3Qgd2hpY2ggaW5wdXQgdHJpZ2dlcnMgb25DaGFuZ2VzXG4gICAgc2NoZW1hOiBhbnlcbiAgICBsYXlvdXQ6IGFueVtdXG4gICAgZGF0YTogYW55XG4gICAgb3B0aW9uczogYW55XG4gICAgZnJhbWV3b3JrOiBhbnkgfCBzdHJpbmdcbiAgICB3aWRnZXRzOiBhbnlcbiAgICBmb3JtOiBhbnlcbiAgICBtb2RlbDogYW55XG4gICAgSlNPTlNjaGVtYTogYW55XG4gICAgVUlTY2hlbWE6IGFueVxuICAgIGZvcm1EYXRhOiBhbnlcbiAgICBsb2FkRXh0ZXJuYWxBc3NldHM6IGJvb2xlYW5cbiAgICBkZWJ1ZzogYm9vbGVhblxuICB9ID0ge1xuICAgIHNjaGVtYTogbnVsbCxcbiAgICBsYXlvdXQ6IG51bGwsXG4gICAgZGF0YTogbnVsbCxcbiAgICBvcHRpb25zOiBudWxsLFxuICAgIGZyYW1ld29yazogbnVsbCxcbiAgICB3aWRnZXRzOiBudWxsLFxuICAgIGZvcm06IG51bGwsXG4gICAgbW9kZWw6IG51bGwsXG4gICAgSlNPTlNjaGVtYTogbnVsbCxcbiAgICBVSVNjaGVtYTogbnVsbCxcbiAgICBmb3JtRGF0YTogbnVsbCxcbiAgICBsb2FkRXh0ZXJuYWxBc3NldHM6IG51bGwsXG4gICAgZGVidWc6IG51bGwsXG4gIH1cblxuICAvLyBSZWNvbW1lbmRlZCBpbnB1dHNcbiAgQElucHV0KCkgc2NoZW1hOiBhbnkgLy8gVGhlIEpTT04gU2NoZW1hXG4gIEBJbnB1dCgpIGxheW91dDogYW55W10gLy8gVGhlIGZvcm0gbGF5b3V0XG4gIEBJbnB1dCgpIGRhdGE6IGFueSAvLyBUaGUgZm9ybSBkYXRhXG4gIEBJbnB1dCgpIG9wdGlvbnM6IGFueSAvLyBUaGUgZ2xvYmFsIGZvcm0gb3B0aW9uc1xuICBASW5wdXQoKSBmcmFtZXdvcms6IGFueSB8IHN0cmluZyAvLyBUaGUgZnJhbWV3b3JrIHRvIGxvYWRcbiAgQElucHV0KCkgd2lkZ2V0czogYW55IC8vIEFueSBjdXN0b20gd2lkZ2V0cyB0byBsb2FkXG5cbiAgLy8gQWx0ZXJuYXRlIGNvbWJpbmVkIHNpbmdsZSBpbnB1dFxuICBASW5wdXQoKSBmb3JtOiBhbnkgLy8gRm9yIHRlc3RpbmcsIGFuZCBKU09OIFNjaGVtYSBGb3JtIEFQSSBjb21wYXRpYmlsaXR5XG5cbiAgLy8gQW5ndWxhciBTY2hlbWEgRm9ybSBBUEkgY29tcGF0aWJpbGl0eSBpbnB1dFxuICBASW5wdXQoKSBtb2RlbDogYW55IC8vIEFsdGVybmF0ZSBpbnB1dCBmb3IgZm9ybSBkYXRhXG5cbiAgLy8gUmVhY3QgSlNPTiBTY2hlbWEgRm9ybSBBUEkgY29tcGF0aWJpbGl0eSBpbnB1dHNcbiAgQElucHV0KCkgSlNPTlNjaGVtYTogYW55IC8vIEFsdGVybmF0ZSBpbnB1dCBmb3IgSlNPTiBTY2hlbWFcbiAgQElucHV0KCkgVUlTY2hlbWE6IGFueSAvLyBVSSBzY2hlbWEgLSBhbHRlcm5hdGUgZm9ybSBsYXlvdXQgZm9ybWF0XG4gIEBJbnB1dCgpIGZvcm1EYXRhOiBhbnkgLy8gQWx0ZXJuYXRlIGlucHV0IGZvciBmb3JtIGRhdGFcblxuICBASW5wdXQoKSBuZ01vZGVsOiBhbnkgLy8gQWx0ZXJuYXRlIGlucHV0IGZvciBBbmd1bGFyIGZvcm1zXG5cbiAgQElucHV0KCkgbGFuZ3VhZ2U6IHN0cmluZyAvLyBMYW5ndWFnZVxuXG4gIC8vIERldmVsb3BtZW50IGlucHV0cywgZm9yIHRlc3RpbmcgYW5kIGRlYnVnZ2luZ1xuICBASW5wdXQoKSBsb2FkRXh0ZXJuYWxBc3NldHM6IGJvb2xlYW4gLy8gTG9hZCBleHRlcm5hbCBmcmFtZXdvcmsgYXNzZXRzP1xuICBASW5wdXQoKSBkZWJ1ZzogYm9vbGVhbiAvLyBTaG93IGRlYnVnIGluZm9ybWF0aW9uP1xuICAvLyB0c2xpbnQ6ZGlzYWJsZSBuby1vdXRwdXQtb24tcHJlZml4XG4gIEBPdXRwdXQoKSBvbkNoYW5nZXMgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKSAvLyBMaXZlIHVudmFsaWRhdGVkIGludGVybmFsIGZvcm0gZGF0YVxuICBAT3V0cHV0KCkgb25TdWJtaXQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKSAvLyBDb21wbGV0ZSB2YWxpZGF0ZWQgZm9ybSBkYXRhXG5cbiAgLy8gT3V0cHV0c1xuICAvLyB0c2xpbnQ6ZW5hYmxlIG5vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpIGlzVmFsaWQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCkgLy8gSXMgY3VycmVudCBkYXRhIHZhbGlkP1xuICBAT3V0cHV0KCkgdmFsaWRhdGlvbkVycm9ycyA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpIC8vIFZhbGlkYXRpb24gZXJyb3JzIChpZiBhbnkpXG4gIEBPdXRwdXQoKSBmb3JtU2NoZW1hID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCkgLy8gRmluYWwgc2NoZW1hIHVzZWQgdG8gY3JlYXRlIGZvcm1cbiAgQE91dHB1dCgpIGZvcm1MYXlvdXQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKSAvLyBGaW5hbCBsYXlvdXQgdXNlZCB0byBjcmVhdGUgZm9ybVxuICAvLyBUaGVyZSBpcyBubyAyLXdheSBiaW5kaW5nIGlmIGluaXRhbCBkYXRhIGlzIGNvbWJpbmVkIGluc2lkZSB0aGUgJ2Zvcm0nIGlucHV0LlxuICBAT3V0cHV0KCkgZGF0YUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpXG4gIEBPdXRwdXQoKSBtb2RlbENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpXG5cbiAgLy8gT3V0cHV0cyBmb3IgcG9zc2libGUgMi13YXkgZGF0YSBiaW5kaW5nXG4gIC8vIE9ubHkgdGhlIG9uZSBpbnB1dCBwcm92aWRpbmcgdGhlIGluaXRpYWwgZm9ybSBkYXRhIHdpbGwgYmUgYm91bmQuXG4gIC8vIElmIHRoZXJlIGlzIG5vIGluaXRhbCBkYXRhLCBpbnB1dCAne30nIHRvIGFjdGl2YXRlIDItd2F5IGRhdGEgYmluZGluZy5cbiAgQE91dHB1dCgpIGZvcm1EYXRhQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KClcbiAgQE91dHB1dCgpIG5nTW9kZWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKVxuICBvbkNoYW5nZTogKGZvcm1WYWx1ZXM6IGFueSkgPT4gdm9pZFxuICBvblRvdWNoZWQ6IChmb3JtVmFsdWVzOiBhbnkpID0+IHZvaWRcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGZyYW1ld29ya0xpYnJhcnk6IEZyYW1ld29ya0xpYnJhcnlTZXJ2aWNlLFxuICAgIHByaXZhdGUgd2lkZ2V0TGlicmFyeTogV2lkZ2V0TGlicmFyeVNlcnZpY2UsXG4gICAgcHVibGljIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlLFxuICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXJcbiAgKSB7fVxuXG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLm9iamVjdFdyYXAgPyB0aGlzLmpzZi5kYXRhWycxJ10gOiB0aGlzLmpzZi5kYXRhXG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMuc2V0Rm9ybVZhbHVlcyh2YWx1ZSwgZmFsc2UpXG4gIH1cblxuICBnZXQgc3R5bGVzaGVldHMoKTogU2FmZVJlc291cmNlVXJsW10ge1xuICAgIGNvbnN0IHN0eWxlc2hlZXRzID0gdGhpcy5mcmFtZXdvcmtMaWJyYXJ5LmdldEZyYW1ld29ya1N0eWxlc2hlZXRzKClcbiAgICBjb25zdCBsb2FkID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsXG4gICAgcmV0dXJuIHN0eWxlc2hlZXRzLm1hcChzdHlsZXNoZWV0ID0+IGxvYWQoc3R5bGVzaGVldCkpXG4gIH1cblxuICBnZXQgc2NyaXB0cygpOiBTYWZlUmVzb3VyY2VVcmxbXSB7XG4gICAgY29uc3Qgc2NyaXB0cyA9IHRoaXMuZnJhbWV3b3JrTGlicmFyeS5nZXRGcmFtZXdvcmtTY3JpcHRzKClcbiAgICBjb25zdCBsb2FkID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsXG4gICAgcmV0dXJuIHNjcmlwdHMubWFwKHNjcmlwdCA9PiBsb2FkKHNjcmlwdCkpXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnVwZGF0ZUZvcm0oKVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy51cGRhdGVGb3JtKClcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMuc2V0Rm9ybVZhbHVlcyh2YWx1ZSwgZmFsc2UpXG4gICAgaWYgKCF0aGlzLmZvcm1WYWx1ZXNJbnB1dCkge1xuICAgICAgdGhpcy5mb3JtVmFsdWVzSW5wdXQgPSAnbmdNb2RlbCdcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoZm9ybVZhbHVlczogYW55KSA9PiB2b2lkKSB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuXG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKGZvcm1WYWx1ZXM6IGFueSkgPT4gdm9pZCkge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm5cbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLmpzZi5mb3JtT3B0aW9ucy5mb3JtRGlzYWJsZWQgIT09ICEhaXNEaXNhYmxlZCkge1xuICAgICAgdGhpcy5qc2YuZm9ybU9wdGlvbnMuZm9ybURpc2FibGVkID0gISFpc0Rpc2FibGVkXG4gICAgICB0aGlzLmluaXRpYWxpemVGb3JtKClcbiAgICB9XG4gIH1cblxuICB1cGRhdGVGb3JtKCkge1xuICAgIGlmIChcbiAgICAgICF0aGlzLmZvcm1Jbml0aWFsaXplZCB8fFxuICAgICAgIXRoaXMuZm9ybVZhbHVlc0lucHV0IHx8XG4gICAgICAodGhpcy5sYW5ndWFnZSAmJiB0aGlzLmxhbmd1YWdlICE9PSB0aGlzLmpzZi5sYW5ndWFnZSlcbiAgICApIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZUZvcm0oKVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5sYW5ndWFnZSAmJiB0aGlzLmxhbmd1YWdlICE9PSB0aGlzLmpzZi5sYW5ndWFnZSkge1xuICAgICAgICB0aGlzLmpzZi5zZXRMYW5ndWFnZSh0aGlzLmxhbmd1YWdlKVxuICAgICAgfVxuXG4gICAgICAvLyBHZXQgbmFtZXMgb2YgY2hhbmdlZCBpbnB1dHNcbiAgICAgIGxldCBjaGFuZ2VkSW5wdXQgPSBPYmplY3Qua2V5cyh0aGlzLnByZXZpb3VzSW5wdXRzKS5maWx0ZXIoXG4gICAgICAgIGlucHV0ID0+IHRoaXMucHJldmlvdXNJbnB1dHNbaW5wdXRdICE9PSB0aGlzW2lucHV0XVxuICAgICAgKVxuICAgICAgbGV0IHJlc2V0Rmlyc3QgPSB0cnVlXG4gICAgICBpZiAoXG4gICAgICAgIGNoYW5nZWRJbnB1dC5sZW5ndGggPT09IDEgJiZcbiAgICAgICAgY2hhbmdlZElucHV0WzBdID09PSAnZm9ybScgJiZcbiAgICAgICAgdGhpcy5mb3JtVmFsdWVzSW5wdXQuc3RhcnRzV2l0aCgnZm9ybS4nKVxuICAgICAgKSB7XG4gICAgICAgIC8vIElmIG9ubHkgJ2Zvcm0nIGlucHV0IGNoYW5nZWQsIGdldCBuYW1lcyBvZiBjaGFuZ2VkIGtleXNcbiAgICAgICAgY2hhbmdlZElucHV0ID0gT2JqZWN0LmtleXModGhpcy5wcmV2aW91c0lucHV0cy5mb3JtIHx8IHt9KVxuICAgICAgICAgIC5maWx0ZXIoXG4gICAgICAgICAgICBrZXkgPT4gIV8uaXNFcXVhbCh0aGlzLnByZXZpb3VzSW5wdXRzLmZvcm1ba2V5XSwgdGhpcy5mb3JtW2tleV0pXG4gICAgICAgICAgKVxuICAgICAgICAgIC5tYXAoa2V5ID0+IGBmb3JtLiR7a2V5fWApXG4gICAgICAgIHJlc2V0Rmlyc3QgPSBmYWxzZVxuICAgICAgfVxuXG4gICAgICAvLyBJZiBvbmx5IGlucHV0IHZhbHVlcyBoYXZlIGNoYW5nZWQsIHVwZGF0ZSB0aGUgZm9ybSB2YWx1ZXNcbiAgICAgIGlmIChcbiAgICAgICAgY2hhbmdlZElucHV0Lmxlbmd0aCA9PT0gMSAmJlxuICAgICAgICBjaGFuZ2VkSW5wdXRbMF0gPT09IHRoaXMuZm9ybVZhbHVlc0lucHV0XG4gICAgICApIHtcbiAgICAgICAgaWYgKHRoaXMuZm9ybVZhbHVlc0lucHV0LmluZGV4T2YoJy4nKSA9PT0gLTEpIHtcbiAgICAgICAgICB0aGlzLnNldEZvcm1WYWx1ZXModGhpc1t0aGlzLmZvcm1WYWx1ZXNJbnB1dF0sIHJlc2V0Rmlyc3QpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgW2lucHV0LCBrZXldID0gdGhpcy5mb3JtVmFsdWVzSW5wdXQuc3BsaXQoJy4nKVxuICAgICAgICAgIHRoaXMuc2V0Rm9ybVZhbHVlcyh0aGlzW2lucHV0XVtrZXldLCByZXNldEZpcnN0KVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgYW55dGhpbmcgZWxzZSBoYXMgY2hhbmdlZCwgcmUtcmVuZGVyIHRoZSBlbnRpcmUgZm9ybVxuICAgICAgfSBlbHNlIGlmIChjaGFuZ2VkSW5wdXQubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUZvcm0oKVxuICAgICAgICBpZiAodGhpcy5vbkNoYW5nZSkge1xuICAgICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5qc2YuZm9ybVZhbHVlcylcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vblRvdWNoZWQpIHtcbiAgICAgICAgICB0aGlzLm9uVG91Y2hlZCh0aGlzLmpzZi5mb3JtVmFsdWVzKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSBwcmV2aW91cyBpbnB1dHNcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMucHJldmlvdXNJbnB1dHMpXG4gICAgICAgIC5maWx0ZXIoaW5wdXQgPT4gdGhpcy5wcmV2aW91c0lucHV0c1tpbnB1dF0gIT09IHRoaXNbaW5wdXRdKVxuICAgICAgICAuZm9yRWFjaChpbnB1dCA9PiAodGhpcy5wcmV2aW91c0lucHV0c1tpbnB1dF0gPSB0aGlzW2lucHV0XSkpXG4gICAgfVxuICB9XG5cbiAgc2V0Rm9ybVZhbHVlcyhmb3JtVmFsdWVzOiBhbnksIHJlc2V0Rmlyc3QgPSB0cnVlKSB7XG4gICAgaWYgKGZvcm1WYWx1ZXMpIHtcbiAgICAgIGNvbnN0IG5ld0Zvcm1WYWx1ZXMgPSB0aGlzLm9iamVjdFdyYXAgPyBmb3JtVmFsdWVzWycxJ10gOiBmb3JtVmFsdWVzXG4gICAgICBpZiAoIXRoaXMuanNmLmZvcm1Hcm91cCkge1xuICAgICAgICB0aGlzLmpzZi5mb3JtVmFsdWVzID0gZm9ybVZhbHVlc1xuICAgICAgICB0aGlzLmFjdGl2YXRlRm9ybSgpXG4gICAgICB9IGVsc2UgaWYgKHJlc2V0Rmlyc3QpIHtcbiAgICAgICAgdGhpcy5qc2YuZm9ybUdyb3VwLnJlc2V0KClcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmpzZi5mb3JtR3JvdXApIHtcbiAgICAgICAgdGhpcy5qc2YuZm9ybUdyb3VwLnBhdGNoVmFsdWUobmV3Rm9ybVZhbHVlcylcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm9uQ2hhbmdlKSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UobmV3Rm9ybVZhbHVlcylcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm9uVG91Y2hlZCkge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZChuZXdGb3JtVmFsdWVzKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmpzZi5mb3JtR3JvdXAucmVzZXQoKVxuICAgIH1cbiAgfVxuXG4gIHN1Ym1pdEZvcm0oKSB7XG4gICAgY29uc3QgdmFsaWREYXRhID0gdGhpcy5qc2YudmFsaWREYXRhXG4gICAgdGhpcy5vblN1Ym1pdC5lbWl0KHRoaXMub2JqZWN0V3JhcCA/IHZhbGlkRGF0YVsnMSddIDogdmFsaWREYXRhKVxuICB9XG5cbiAgLyoqXG4gICAqICdpbml0aWFsaXplRm9ybScgZnVuY3Rpb25cbiAgICpcbiAgICogLSBVcGRhdGUgJ3NjaGVtYScsICdsYXlvdXQnLCBhbmQgJ2Zvcm1WYWx1ZXMnLCBmcm9tIGlucHV0cy5cbiAgICpcbiAgICogLSBDcmVhdGUgJ3NjaGVtYVJlZkxpYnJhcnknIGFuZCAnc2NoZW1hUmVjdXJzaXZlUmVmTWFwJ1xuICAgKiAgIHRvIHJlc29sdmUgc2NoZW1hICRyZWYgbGlua3MsIGluY2x1ZGluZyByZWN1cnNpdmUgJHJlZiBsaW5rcy5cbiAgICpcbiAgICogLSBDcmVhdGUgJ2RhdGFSZWN1cnNpdmVSZWZNYXAnIHRvIHJlc29sdmUgcmVjdXJzaXZlIGxpbmtzIGluIGRhdGFcbiAgICogICBhbmQgY29yZWN0bHkgc2V0IG91dHB1dCBmb3JtYXRzIGZvciByZWN1cnNpdmVseSBuZXN0ZWQgdmFsdWVzLlxuICAgKlxuICAgKiAtIENyZWF0ZSAnbGF5b3V0UmVmTGlicmFyeScgYW5kICd0ZW1wbGF0ZVJlZkxpYnJhcnknIHRvIHN0b3JlXG4gICAqICAgbmV3IGxheW91dCBub2RlcyBhbmQgZm9ybUdyb3VwIGVsZW1lbnRzIHRvIHVzZSB3aGVuIGR5bmFtaWNhbGx5XG4gICAqICAgYWRkaW5nIGZvcm0gY29tcG9uZW50cyB0byBhcnJheXMgYW5kIHJlY3Vyc2l2ZSAkcmVmIHBvaW50cy5cbiAgICpcbiAgICogLSBDcmVhdGUgJ2RhdGFNYXAnIHRvIG1hcCB0aGUgZGF0YSB0byB0aGUgc2NoZW1hIGFuZCB0ZW1wbGF0ZS5cbiAgICpcbiAgICogLSBDcmVhdGUgdGhlIG1hc3RlciAnZm9ybUdyb3VwVGVtcGxhdGUnIHRoZW4gZnJvbSBpdCAnZm9ybUdyb3VwJ1xuICAgKiAgIHRoZSBBbmd1bGFyIGZvcm1Hcm91cCB1c2VkIHRvIGNvbnRyb2wgdGhlIHJlYWN0aXZlIGZvcm0uXG4gICAqL1xuICBpbml0aWFsaXplRm9ybSgpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnNjaGVtYSB8fFxuICAgICAgdGhpcy5sYXlvdXQgfHxcbiAgICAgIHRoaXMuZGF0YSB8fFxuICAgICAgdGhpcy5mb3JtIHx8XG4gICAgICB0aGlzLm1vZGVsIHx8XG4gICAgICB0aGlzLkpTT05TY2hlbWEgfHxcbiAgICAgIHRoaXMuVUlTY2hlbWEgfHxcbiAgICAgIHRoaXMuZm9ybURhdGEgfHxcbiAgICAgIHRoaXMubmdNb2RlbCB8fFxuICAgICAgdGhpcy5qc2YuZGF0YVxuICAgICkge1xuICAgICAgdGhpcy5qc2YucmVzZXRBbGxWYWx1ZXMoKSAvLyBSZXNldCBhbGwgZm9ybSB2YWx1ZXMgdG8gZGVmYXVsdHNcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZU9wdGlvbnMoKSAvLyBVcGRhdGUgb3B0aW9uc1xuICAgICAgdGhpcy5pbml0aWFsaXplU2NoZW1hKCkgLy8gVXBkYXRlIHNjaGVtYSwgc2NoZW1hUmVmTGlicmFyeSxcbiAgICAgIC8vIHNjaGVtYVJlY3Vyc2l2ZVJlZk1hcCwgJiBkYXRhUmVjdXJzaXZlUmVmTWFwXG4gICAgICB0aGlzLmluaXRpYWxpemVMYXlvdXQoKSAvLyBVcGRhdGUgbGF5b3V0LCBsYXlvdXRSZWZMaWJyYXJ5LFxuICAgICAgdGhpcy5pbml0aWFsaXplRGF0YSgpIC8vIFVwZGF0ZSBmb3JtVmFsdWVzXG4gICAgICB0aGlzLmFjdGl2YXRlRm9ybSgpIC8vIFVwZGF0ZSBkYXRhTWFwLCB0ZW1wbGF0ZVJlZkxpYnJhcnksXG4gICAgICAvLyBmb3JtR3JvdXBUZW1wbGF0ZSwgZm9ybUdyb3VwXG5cbiAgICAgIGlmICh0aGlzLmRlYnVnIHx8IHRoaXMuanNmLmZvcm1PcHRpb25zLmRlYnVnKSB7XG4gICAgICAgIGNvbnN0IHZhcnM6IGFueVtdID0gW11cbiAgICAgICAgdGhpcy5kZWJ1Z091dHB1dCA9IHZhcnMubWFwKHYgPT4gSlNPTi5zdHJpbmdpZnkodiwgbnVsbCwgMikpLmpvaW4oJ1xcbicpXG4gICAgICB9XG4gICAgICB0aGlzLmZvcm1Jbml0aWFsaXplZCA9IHRydWVcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ2luaXRpYWxpemVPcHRpb25zJyBmdW5jdGlvblxuICAgKlxuICAgKiBJbml0aWFsaXplICdvcHRpb25zJyAoZ2xvYmFsIGZvcm0gb3B0aW9ucykgYW5kIHNldCBmcmFtZXdvcmtcbiAgICogQ29tYmluZSBhdmFpbGFibGUgaW5wdXRzOlxuICAgKiAxLiBvcHRpb25zIC0gcmVjb21tZW5kZWRcbiAgICogMi4gZm9ybS5vcHRpb25zIC0gU2luZ2xlIGlucHV0IHN0eWxlXG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxpemVPcHRpb25zKCkge1xuICAgIGlmICh0aGlzLmxhbmd1YWdlICYmIHRoaXMubGFuZ3VhZ2UgIT09IHRoaXMuanNmLmxhbmd1YWdlKSB7XG4gICAgICB0aGlzLmpzZi5zZXRMYW5ndWFnZSh0aGlzLmxhbmd1YWdlKVxuICAgIH1cbiAgICB0aGlzLmpzZi5zZXRPcHRpb25zKHtkZWJ1ZzogISF0aGlzLmRlYnVnfSlcbiAgICBsZXQgbG9hZEV4dGVybmFsQXNzZXRzOiBib29sZWFuID0gdGhpcy5sb2FkRXh0ZXJuYWxBc3NldHMgfHwgZmFsc2VcbiAgICBsZXQgZnJhbWV3b3JrOiBhbnkgPSB0aGlzLmZyYW1ld29yayB8fCAnZGVmYXVsdCdcbiAgICBpZiAoaXNPYmplY3QodGhpcy5vcHRpb25zKSkge1xuICAgICAgdGhpcy5qc2Yuc2V0T3B0aW9ucyh0aGlzLm9wdGlvbnMpXG4gICAgICBsb2FkRXh0ZXJuYWxBc3NldHMgPSB0aGlzLm9wdGlvbnMubG9hZEV4dGVybmFsQXNzZXRzIHx8IGxvYWRFeHRlcm5hbEFzc2V0c1xuICAgICAgZnJhbWV3b3JrID0gdGhpcy5vcHRpb25zLmZyYW1ld29yayB8fCBmcmFtZXdvcmtcbiAgICB9XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMuZm9ybSkgJiYgaXNPYmplY3QodGhpcy5mb3JtLm9wdGlvbnMpKSB7XG4gICAgICB0aGlzLmpzZi5zZXRPcHRpb25zKHRoaXMuZm9ybS5vcHRpb25zKVxuICAgICAgbG9hZEV4dGVybmFsQXNzZXRzID1cbiAgICAgICAgdGhpcy5mb3JtLm9wdGlvbnMubG9hZEV4dGVybmFsQXNzZXRzIHx8IGxvYWRFeHRlcm5hbEFzc2V0c1xuICAgICAgZnJhbWV3b3JrID0gdGhpcy5mb3JtLm9wdGlvbnMuZnJhbWV3b3JrIHx8IGZyYW1ld29ya1xuICAgIH1cbiAgICBpZiAoaXNPYmplY3QodGhpcy53aWRnZXRzKSkge1xuICAgICAgdGhpcy5qc2Yuc2V0T3B0aW9ucyh7d2lkZ2V0czogdGhpcy53aWRnZXRzfSlcbiAgICB9XG4gICAgdGhpcy5mcmFtZXdvcmtMaWJyYXJ5LnNldExvYWRFeHRlcm5hbEFzc2V0cyhsb2FkRXh0ZXJuYWxBc3NldHMpXG4gICAgdGhpcy5mcmFtZXdvcmtMaWJyYXJ5LnNldEZyYW1ld29yayhmcmFtZXdvcmspXG4gICAgdGhpcy5qc2YuZnJhbWV3b3JrID0gdGhpcy5mcmFtZXdvcmtMaWJyYXJ5LmdldEZyYW1ld29yaygpXG4gICAgaWYgKGlzT2JqZWN0KHRoaXMuanNmLmZvcm1PcHRpb25zLndpZGdldHMpKSB7XG4gICAgICBmb3IgKGNvbnN0IHdpZGdldCBvZiBPYmplY3Qua2V5cyh0aGlzLmpzZi5mb3JtT3B0aW9ucy53aWRnZXRzKSkge1xuICAgICAgICB0aGlzLndpZGdldExpYnJhcnkucmVnaXN0ZXJXaWRnZXQoXG4gICAgICAgICAgd2lkZ2V0LFxuICAgICAgICAgIHRoaXMuanNmLmZvcm1PcHRpb25zLndpZGdldHNbd2lkZ2V0XVxuICAgICAgICApXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChpc09iamVjdCh0aGlzLmZvcm0pICYmIGlzT2JqZWN0KHRoaXMuZm9ybS50cGxkYXRhKSkge1xuICAgICAgdGhpcy5qc2Yuc2V0VHBsZGF0YSh0aGlzLmZvcm0udHBsZGF0YSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ2luaXRpYWxpemVTY2hlbWEnIGZ1bmN0aW9uXG4gICAqXG4gICAqIEluaXRpYWxpemUgJ3NjaGVtYSdcbiAgICogVXNlIGZpcnN0IGF2YWlsYWJsZSBpbnB1dDpcbiAgICogMS4gc2NoZW1hIC0gcmVjb21tZW5kZWQgLyBBbmd1bGFyIFNjaGVtYSBGb3JtIHN0eWxlXG4gICAqIDIuIGZvcm0uc2NoZW1hIC0gU2luZ2xlIGlucHV0IC8gSlNPTiBGb3JtIHN0eWxlXG4gICAqIDMuIEpTT05TY2hlbWEgLSBSZWFjdCBKU09OIFNjaGVtYSBGb3JtIHN0eWxlXG4gICAqIDQuIGZvcm0uSlNPTlNjaGVtYSAtIEZvciB0ZXN0aW5nIHNpbmdsZSBpbnB1dCBSZWFjdCBKU09OIFNjaGVtYSBGb3Jtc1xuICAgKiA1LiBmb3JtIC0gRm9yIHRlc3Rpbmcgc2luZ2xlIHNjaGVtYS1vbmx5IGlucHV0c1xuICAgKlxuICAgKiAuLi4gaWYgbm8gc2NoZW1hIGlucHV0IGZvdW5kLCB0aGUgJ2FjdGl2YXRlRm9ybScgZnVuY3Rpb24sIGJlbG93LFxuICAgKiAgICAgd2lsbCBtYWtlIHR3byBhZGRpdGlvbmFsIGF0dGVtcHRzIHRvIGJ1aWxkIGEgc2NoZW1hXG4gICAqIDYuIElmIGxheW91dCBpbnB1dCAtIGJ1aWxkIHNjaGVtYSBmcm9tIGxheW91dFxuICAgKiA3LiBJZiBkYXRhIGlucHV0IC0gYnVpbGQgc2NoZW1hIGZyb20gZGF0YVxuICAgKi9cbiAgcHJpdmF0ZSBpbml0aWFsaXplU2NoZW1hKCkge1xuICAgIC8vIFRPRE86IHVwZGF0ZSB0byBhbGxvdyBub24tb2JqZWN0IHNjaGVtYXNcblxuICAgIGlmIChpc09iamVjdCh0aGlzLnNjaGVtYSkpIHtcbiAgICAgIHRoaXMuanNmLkFuZ3VsYXJTY2hlbWFGb3JtQ29tcGF0aWJpbGl0eSA9IHRydWVcbiAgICAgIHRoaXMuanNmLnNjaGVtYSA9IF8uY2xvbmVEZWVwKHRoaXMuc2NoZW1hKVxuICAgIH0gZWxzZSBpZiAoaGFzT3duKHRoaXMuZm9ybSwgJ3NjaGVtYScpICYmIGlzT2JqZWN0KHRoaXMuZm9ybS5zY2hlbWEpKSB7XG4gICAgICB0aGlzLmpzZi5zY2hlbWEgPSBfLmNsb25lRGVlcCh0aGlzLmZvcm0uc2NoZW1hKVxuICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodGhpcy5KU09OU2NoZW1hKSkge1xuICAgICAgdGhpcy5qc2YuUmVhY3RKc29uU2NoZW1hRm9ybUNvbXBhdGliaWxpdHkgPSB0cnVlXG4gICAgICB0aGlzLmpzZi5zY2hlbWEgPSBfLmNsb25lRGVlcCh0aGlzLkpTT05TY2hlbWEpXG4gICAgfSBlbHNlIGlmIChcbiAgICAgIGhhc093bih0aGlzLmZvcm0sICdKU09OU2NoZW1hJykgJiZcbiAgICAgIGlzT2JqZWN0KHRoaXMuZm9ybS5KU09OU2NoZW1hKVxuICAgICkge1xuICAgICAgdGhpcy5qc2YuUmVhY3RKc29uU2NoZW1hRm9ybUNvbXBhdGliaWxpdHkgPSB0cnVlXG4gICAgICB0aGlzLmpzZi5zY2hlbWEgPSBfLmNsb25lRGVlcCh0aGlzLmZvcm0uSlNPTlNjaGVtYSlcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgaGFzT3duKHRoaXMuZm9ybSwgJ3Byb3BlcnRpZXMnKSAmJlxuICAgICAgaXNPYmplY3QodGhpcy5mb3JtLnByb3BlcnRpZXMpXG4gICAgKSB7XG4gICAgICB0aGlzLmpzZi5zY2hlbWEgPSBfLmNsb25lRGVlcCh0aGlzLmZvcm0pXG4gICAgfSBlbHNlIGlmIChpc09iamVjdCh0aGlzLmZvcm0pKSB7XG4gICAgICAvLyBUT0RPOiBIYW5kbGUgb3RoZXIgdHlwZXMgb2YgZm9ybSBpbnB1dFxuICAgIH1cblxuICAgIGlmICghaXNFbXB0eSh0aGlzLmpzZi5zY2hlbWEpKSB7XG4gICAgICAvLyBJZiBvdGhlciB0eXBlcyBhbHNvIGFsbG93ZWQsIHJlbmRlciBzY2hlbWEgYXMgYW4gb2JqZWN0XG4gICAgICBpZiAoaW5BcnJheSgnb2JqZWN0JywgdGhpcy5qc2Yuc2NoZW1hLnR5cGUpKSB7XG4gICAgICAgIHRoaXMuanNmLnNjaGVtYS50eXBlID0gJ29iamVjdCdcbiAgICAgIH1cblxuICAgICAgLy8gV3JhcCBub24tb2JqZWN0IHNjaGVtYXMgaW4gb2JqZWN0LlxuICAgICAgaWYgKFxuICAgICAgICBoYXNPd24odGhpcy5qc2Yuc2NoZW1hLCAndHlwZScpICYmXG4gICAgICAgIHRoaXMuanNmLnNjaGVtYS50eXBlICE9PSAnb2JqZWN0J1xuICAgICAgKSB7XG4gICAgICAgIHRoaXMuanNmLnNjaGVtYSA9IHtcbiAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICBwcm9wZXJ0aWVzOiB7MTogdGhpcy5qc2Yuc2NoZW1hfSxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9iamVjdFdyYXAgPSB0cnVlXG4gICAgICB9IGVsc2UgaWYgKCFoYXNPd24odGhpcy5qc2Yuc2NoZW1hLCAndHlwZScpKSB7XG4gICAgICAgIC8vIEFkZCB0eXBlID0gJ29iamVjdCcgaWYgbWlzc2luZ1xuICAgICAgICBpZiAoXG4gICAgICAgICAgaXNPYmplY3QodGhpcy5qc2Yuc2NoZW1hLnByb3BlcnRpZXMpIHx8XG4gICAgICAgICAgaXNPYmplY3QodGhpcy5qc2Yuc2NoZW1hLnBhdHRlcm5Qcm9wZXJ0aWVzKSB8fFxuICAgICAgICAgIGlzT2JqZWN0KHRoaXMuanNmLnNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcylcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5qc2Yuc2NoZW1hLnR5cGUgPSAnb2JqZWN0J1xuXG4gICAgICAgICAgLy8gRml4IEpTT04gc2NoZW1hIHNob3J0aGFuZCAoSlNPTiBGb3JtIHN0eWxlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuanNmLkpzb25Gb3JtQ29tcGF0aWJpbGl0eSA9IHRydWVcbiAgICAgICAgICB0aGlzLmpzZi5zY2hlbWEgPSB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHRoaXMuanNmLnNjaGVtYSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSWYgbmVlZGVkLCB1cGRhdGUgSlNPTiBTY2hlbWEgdG8gZHJhZnQgNiBmb3JtYXQsIGluY2x1ZGluZ1xuICAgICAgLy8gZHJhZnQgMyAoSlNPTiBGb3JtIHN0eWxlKSBhbmQgZHJhZnQgNCAoQW5ndWxhciBTY2hlbWEgRm9ybSBzdHlsZSlcbiAgICAgIHRoaXMuanNmLnNjaGVtYSA9IGNvbnZlcnRTY2hlbWFUb0RyYWZ0Nih0aGlzLmpzZi5zY2hlbWEpXG5cbiAgICAgIC8vIEluaXRpYWxpemUgYWp2IGFuZCBjb21waWxlIHNjaGVtYVxuICAgICAgdGhpcy5qc2YuY29tcGlsZUFqdlNjaGVtYSgpXG5cbiAgICAgIC8vIENyZWF0ZSBzY2hlbWFSZWZMaWJyYXJ5LCBzY2hlbWFSZWN1cnNpdmVSZWZNYXAsIGRhdGFSZWN1cnNpdmVSZWZNYXAsICYgYXJyYXlNYXBcbiAgICAgIHRoaXMuanNmLnNjaGVtYSA9IHJlc29sdmVTY2hlbWFSZWZlcmVuY2VzKFxuICAgICAgICB0aGlzLmpzZi5zY2hlbWEsXG4gICAgICAgIHRoaXMuanNmLnNjaGVtYVJlZkxpYnJhcnksXG4gICAgICAgIHRoaXMuanNmLnNjaGVtYVJlY3Vyc2l2ZVJlZk1hcCxcbiAgICAgICAgdGhpcy5qc2YuZGF0YVJlY3Vyc2l2ZVJlZk1hcCxcbiAgICAgICAgdGhpcy5qc2YuYXJyYXlNYXBcbiAgICAgIClcbiAgICAgIGlmIChoYXNPd24odGhpcy5qc2Yuc2NoZW1hUmVmTGlicmFyeSwgJycpKSB7XG4gICAgICAgIHRoaXMuanNmLmhhc1Jvb3RSZWZlcmVuY2UgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIC8vIFRPRE86ICg/KSBSZXNvbHZlIGV4dGVybmFsICRyZWYgbGlua3NcbiAgICAgIC8vIC8vIENyZWF0ZSBzY2hlbWFSZWZMaWJyYXJ5ICYgc2NoZW1hUmVjdXJzaXZlUmVmTWFwXG4gICAgICAvLyB0aGlzLnBhcnNlci5idW5kbGUodGhpcy5zY2hlbWEpXG4gICAgICAvLyAgIC50aGVuKHNjaGVtYSA9PiB0aGlzLnNjaGVtYSA9IHJlc29sdmVTY2hlbWFSZWZlcmVuY2VzKFxuICAgICAgLy8gICAgIHNjaGVtYSwgdGhpcy5qc2Yuc2NoZW1hUmVmTGlicmFyeSxcbiAgICAgIC8vICAgICB0aGlzLmpzZi5zY2hlbWFSZWN1cnNpdmVSZWZNYXAsIHRoaXMuanNmLmRhdGFSZWN1cnNpdmVSZWZNYXBcbiAgICAgIC8vICAgKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdpbml0aWFsaXplRGF0YScgZnVuY3Rpb25cbiAgICpcbiAgICogSW5pdGlhbGl6ZSAnZm9ybVZhbHVlcydcbiAgICogZGVmdWxhdCBvciBwcmV2aW91c2x5IHN1Ym1pdHRlZCB2YWx1ZXMgdXNlZCB0byBwb3B1bGF0ZSBmb3JtXG4gICAqIFVzZSBmaXJzdCBhdmFpbGFibGUgaW5wdXQ6XG4gICAqIDEuIGRhdGEgLSByZWNvbW1lbmRlZFxuICAgKiAyLiBtb2RlbCAtIEFuZ3VsYXIgU2NoZW1hIEZvcm0gc3R5bGVcbiAgICogMy4gZm9ybS52YWx1ZSAtIEpTT04gRm9ybSBzdHlsZVxuICAgKiA0LiBmb3JtLmRhdGEgLSBTaW5nbGUgaW5wdXQgc3R5bGVcbiAgICogNS4gZm9ybURhdGEgLSBSZWFjdCBKU09OIFNjaGVtYSBGb3JtIHN0eWxlXG4gICAqIDYuIGZvcm0uZm9ybURhdGEgLSBGb3IgZWFzaWVyIHRlc3Rpbmcgb2YgUmVhY3QgSlNPTiBTY2hlbWEgRm9ybXNcbiAgICogNy4gKG5vbmUpIG5vIGRhdGEgLSBpbml0aWFsaXplIGRhdGEgZnJvbSBzY2hlbWEgYW5kIGxheW91dCBkZWZhdWx0cyBvbmx5XG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxpemVEYXRhKCkge1xuICAgIGlmIChoYXNWYWx1ZSh0aGlzLmRhdGEpKSB7XG4gICAgICB0aGlzLmpzZi5mb3JtVmFsdWVzID0gXy5jbG9uZURlZXAodGhpcy5kYXRhKVxuICAgICAgdGhpcy5mb3JtVmFsdWVzSW5wdXQgPSAnZGF0YSdcbiAgICB9IGVsc2UgaWYgKGhhc1ZhbHVlKHRoaXMubW9kZWwpKSB7XG4gICAgICB0aGlzLmpzZi5Bbmd1bGFyU2NoZW1hRm9ybUNvbXBhdGliaWxpdHkgPSB0cnVlXG4gICAgICB0aGlzLmpzZi5mb3JtVmFsdWVzID0gXy5jbG9uZURlZXAodGhpcy5tb2RlbClcbiAgICAgIHRoaXMuZm9ybVZhbHVlc0lucHV0ID0gJ21vZGVsJ1xuICAgIH0gZWxzZSBpZiAoaGFzVmFsdWUodGhpcy5uZ01vZGVsKSkge1xuICAgICAgdGhpcy5qc2YuQW5ndWxhclNjaGVtYUZvcm1Db21wYXRpYmlsaXR5ID0gdHJ1ZVxuICAgICAgdGhpcy5qc2YuZm9ybVZhbHVlcyA9IF8uY2xvbmVEZWVwKHRoaXMubmdNb2RlbClcbiAgICAgIHRoaXMuZm9ybVZhbHVlc0lucHV0ID0gJ25nTW9kZWwnXG4gICAgfSBlbHNlIGlmIChpc09iamVjdCh0aGlzLmZvcm0pICYmIGhhc1ZhbHVlKHRoaXMuZm9ybS52YWx1ZSkpIHtcbiAgICAgIHRoaXMuanNmLkpzb25Gb3JtQ29tcGF0aWJpbGl0eSA9IHRydWVcbiAgICAgIHRoaXMuanNmLmZvcm1WYWx1ZXMgPSBfLmNsb25lRGVlcCh0aGlzLmZvcm0udmFsdWUpXG4gICAgICB0aGlzLmZvcm1WYWx1ZXNJbnB1dCA9ICdmb3JtLnZhbHVlJ1xuICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodGhpcy5mb3JtKSAmJiBoYXNWYWx1ZSh0aGlzLmZvcm0uZGF0YSkpIHtcbiAgICAgIHRoaXMuanNmLmZvcm1WYWx1ZXMgPSBfLmNsb25lRGVlcCh0aGlzLmZvcm0uZGF0YSlcbiAgICAgIHRoaXMuZm9ybVZhbHVlc0lucHV0ID0gJ2Zvcm0uZGF0YSdcbiAgICB9IGVsc2UgaWYgKGhhc1ZhbHVlKHRoaXMuZm9ybURhdGEpKSB7XG4gICAgICB0aGlzLmpzZi5SZWFjdEpzb25TY2hlbWFGb3JtQ29tcGF0aWJpbGl0eSA9IHRydWVcbiAgICAgIHRoaXMuZm9ybVZhbHVlc0lucHV0ID0gJ2Zvcm1EYXRhJ1xuICAgIH0gZWxzZSBpZiAoaGFzT3duKHRoaXMuZm9ybSwgJ2Zvcm1EYXRhJykgJiYgaGFzVmFsdWUodGhpcy5mb3JtLmZvcm1EYXRhKSkge1xuICAgICAgdGhpcy5qc2YuUmVhY3RKc29uU2NoZW1hRm9ybUNvbXBhdGliaWxpdHkgPSB0cnVlXG4gICAgICB0aGlzLmpzZi5mb3JtVmFsdWVzID0gXy5jbG9uZURlZXAodGhpcy5mb3JtLmZvcm1EYXRhKVxuICAgICAgdGhpcy5mb3JtVmFsdWVzSW5wdXQgPSAnZm9ybS5mb3JtRGF0YSdcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mb3JtVmFsdWVzSW5wdXQgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdpbml0aWFsaXplTGF5b3V0JyBmdW5jdGlvblxuICAgKlxuICAgKiBJbml0aWFsaXplICdsYXlvdXQnXG4gICAqIFVzZSBmaXJzdCBhdmFpbGFibGUgYXJyYXkgaW5wdXQ6XG4gICAqIDEuIGxheW91dCAtIHJlY29tbWVuZGVkXG4gICAqIDIuIGZvcm0gLSBBbmd1bGFyIFNjaGVtYSBGb3JtIHN0eWxlXG4gICAqIDMuIGZvcm0uZm9ybSAtIEpTT04gRm9ybSBzdHlsZVxuICAgKiA0LiBmb3JtLmxheW91dCAtIFNpbmdsZSBpbnB1dCBzdHlsZVxuICAgKiA1LiAobm9uZSkgbm8gbGF5b3V0IC0gc2V0IGRlZmF1bHQgbGF5b3V0IGluc3RlYWRcbiAgICogICAgKGZ1bGwgbGF5b3V0IHdpbGwgYmUgYnVpbHQgbGF0ZXIgZnJvbSB0aGUgc2NoZW1hKVxuICAgKlxuICAgKiBBbHNvLCBpZiBhbHRlcm5hdGUgbGF5b3V0IGZvcm1hdHMgYXJlIGF2YWlsYWJsZSxcbiAgICogaW1wb3J0IGZyb20gJ1VJU2NoZW1hJyBvciAnY3VzdG9tRm9ybUl0ZW1zJ1xuICAgKiB1c2VkIGZvciBSZWFjdCBKU09OIFNjaGVtYSBGb3JtIGFuZCBKU09OIEZvcm0gQVBJIGNvbXBhdGliaWxpdHlcbiAgICogVXNlIGZpcnN0IGF2YWlsYWJsZSBpbnB1dDpcbiAgICogMS4gVUlTY2hlbWEgLSBSZWFjdCBKU09OIFNjaGVtYSBGb3JtIHN0eWxlXG4gICAqIDIuIGZvcm0uVUlTY2hlbWEgLSBGb3IgdGVzdGluZyBzaW5nbGUgaW5wdXQgUmVhY3QgSlNPTiBTY2hlbWEgRm9ybXNcbiAgICogMi4gZm9ybS5jdXN0b21Gb3JtSXRlbXMgLSBKU09OIEZvcm0gc3R5bGVcbiAgICogMy4gKG5vbmUpIG5vIGlucHV0IC0gZG9uJ3QgaW1wb3J0XG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxpemVMYXlvdXQoKSB7XG4gICAgLy8gUmVuYW1lIEpTT04gRm9ybS1zdHlsZSAnb3B0aW9ucycgbGlzdHMgdG9cbiAgICAvLyBBbmd1bGFyIFNjaGVtYSBGb3JtLXN0eWxlICd0aXRsZU1hcCcgbGlzdHMuXG4gICAgY29uc3QgZml4SnNvbkZvcm1PcHRpb25zID0gKGxheW91dDogYW55KTogYW55ID0+IHtcbiAgICAgIGlmIChpc09iamVjdChsYXlvdXQpIHx8IGlzQXJyYXkobGF5b3V0KSkge1xuICAgICAgICBmb3JFYWNoKFxuICAgICAgICAgIGxheW91dCxcbiAgICAgICAgICAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKGhhc093bih2YWx1ZSwgJ29wdGlvbnMnKSAmJiBpc09iamVjdCh2YWx1ZS5vcHRpb25zKSkge1xuICAgICAgICAgICAgICB2YWx1ZS50aXRsZU1hcCA9IHZhbHVlLm9wdGlvbnNcbiAgICAgICAgICAgICAgZGVsZXRlIHZhbHVlLm9wdGlvbnNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgICd0b3AtZG93bidcbiAgICAgICAgKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGxheW91dFxuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsYXlvdXQgaW5wdXRzIGFuZCwgaWYgZm91bmQsIGluaXRpYWxpemUgZm9ybSBsYXlvdXRcbiAgICBpZiAoaXNBcnJheSh0aGlzLmxheW91dCkpIHtcbiAgICAgIHRoaXMuanNmLmxheW91dCA9IF8uY2xvbmVEZWVwKHRoaXMubGF5b3V0KVxuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh0aGlzLmZvcm0pKSB7XG4gICAgICB0aGlzLmpzZi5Bbmd1bGFyU2NoZW1hRm9ybUNvbXBhdGliaWxpdHkgPSB0cnVlXG4gICAgICB0aGlzLmpzZi5sYXlvdXQgPSBfLmNsb25lRGVlcCh0aGlzLmZvcm0pXG4gICAgfSBlbHNlIGlmICh0aGlzLmZvcm0gJiYgaXNBcnJheSh0aGlzLmZvcm0uZm9ybSkpIHtcbiAgICAgIHRoaXMuanNmLkpzb25Gb3JtQ29tcGF0aWJpbGl0eSA9IHRydWVcbiAgICAgIHRoaXMuanNmLmxheW91dCA9IGZpeEpzb25Gb3JtT3B0aW9ucyhfLmNsb25lRGVlcCh0aGlzLmZvcm0uZm9ybSkpXG4gICAgfSBlbHNlIGlmICh0aGlzLmZvcm0gJiYgaXNBcnJheSh0aGlzLmZvcm0ubGF5b3V0KSkge1xuICAgICAgdGhpcy5qc2YubGF5b3V0ID0gXy5jbG9uZURlZXAodGhpcy5mb3JtLmxheW91dClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5qc2YubGF5b3V0ID0gWycqJ11cbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgYWx0ZXJuYXRlIGxheW91dCBpbnB1dHNcbiAgICBsZXQgYWx0ZXJuYXRlTGF5b3V0OiBhbnkgPSBudWxsXG4gICAgaWYgKGlzT2JqZWN0KHRoaXMuVUlTY2hlbWEpKSB7XG4gICAgICB0aGlzLmpzZi5SZWFjdEpzb25TY2hlbWFGb3JtQ29tcGF0aWJpbGl0eSA9IHRydWVcbiAgICAgIGFsdGVybmF0ZUxheW91dCA9IF8uY2xvbmVEZWVwKHRoaXMuVUlTY2hlbWEpXG4gICAgfSBlbHNlIGlmIChoYXNPd24odGhpcy5mb3JtLCAnVUlTY2hlbWEnKSkge1xuICAgICAgdGhpcy5qc2YuUmVhY3RKc29uU2NoZW1hRm9ybUNvbXBhdGliaWxpdHkgPSB0cnVlXG4gICAgICBhbHRlcm5hdGVMYXlvdXQgPSBfLmNsb25lRGVlcCh0aGlzLmZvcm0uVUlTY2hlbWEpXG4gICAgfSBlbHNlIGlmIChoYXNPd24odGhpcy5mb3JtLCAndWlTY2hlbWEnKSkge1xuICAgICAgdGhpcy5qc2YuUmVhY3RKc29uU2NoZW1hRm9ybUNvbXBhdGliaWxpdHkgPSB0cnVlXG4gICAgICBhbHRlcm5hdGVMYXlvdXQgPSBfLmNsb25lRGVlcCh0aGlzLmZvcm0udWlTY2hlbWEpXG4gICAgfSBlbHNlIGlmIChoYXNPd24odGhpcy5mb3JtLCAnY3VzdG9tRm9ybUl0ZW1zJykpIHtcbiAgICAgIHRoaXMuanNmLkpzb25Gb3JtQ29tcGF0aWJpbGl0eSA9IHRydWVcbiAgICAgIGFsdGVybmF0ZUxheW91dCA9IGZpeEpzb25Gb3JtT3B0aW9ucyhcbiAgICAgICAgXy5jbG9uZURlZXAodGhpcy5mb3JtLmN1c3RvbUZvcm1JdGVtcylcbiAgICAgIClcbiAgICB9XG5cbiAgICAvLyBpZiBhbHRlcm5hdGUgbGF5b3V0IGZvdW5kLCBjb3B5IGFsdGVybmF0ZSBsYXlvdXQgb3B0aW9ucyBpbnRvIHNjaGVtYVxuICAgIGlmIChhbHRlcm5hdGVMYXlvdXQpIHtcbiAgICAgIEpzb25Qb2ludGVyLmZvckVhY2hEZWVwKGFsdGVybmF0ZUxheW91dCwgKHZhbHVlLCBwb2ludGVyKSA9PiB7XG4gICAgICAgIGNvbnN0IHNjaGVtYVBvaW50ZXIgPSBwb2ludGVyXG4gICAgICAgICAgLnJlcGxhY2UoL1xcLy9nLCAnL3Byb3BlcnRpZXMvJylcbiAgICAgICAgICAucmVwbGFjZSgvXFwvcHJvcGVydGllc1xcL2l0ZW1zXFwvcHJvcGVydGllc1xcLy9nLCAnL2l0ZW1zL3Byb3BlcnRpZXMvJylcbiAgICAgICAgICAucmVwbGFjZShcbiAgICAgICAgICAgIC9cXC9wcm9wZXJ0aWVzXFwvdGl0bGVNYXBcXC9wcm9wZXJ0aWVzXFwvL2csXG4gICAgICAgICAgICAnL3RpdGxlTWFwL3Byb3BlcnRpZXMvJ1xuICAgICAgICAgIClcbiAgICAgICAgaWYgKGhhc1ZhbHVlKHZhbHVlKSAmJiBoYXNWYWx1ZShwb2ludGVyKSkge1xuICAgICAgICAgIGxldCBrZXkgPSBKc29uUG9pbnRlci50b0tleShwb2ludGVyKVxuICAgICAgICAgIGNvbnN0IGdyb3VwUG9pbnRlciA9IChKc29uUG9pbnRlci5wYXJzZShzY2hlbWFQb2ludGVyKSB8fCBbXSkuc2xpY2UoXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgLTJcbiAgICAgICAgICApXG4gICAgICAgICAgbGV0IGl0ZW1Qb2ludGVyOiBzdHJpbmcgfCBzdHJpbmdbXVxuXG4gICAgICAgICAgLy8gSWYgJ3VpOm9yZGVyJyBvYmplY3QgZm91bmQsIGNvcHkgaW50byBvYmplY3Qgc2NoZW1hIHJvb3RcbiAgICAgICAgICBpZiAoa2V5LnRvTG93ZXJDYXNlKCkgPT09ICd1aTpvcmRlcicpIHtcbiAgICAgICAgICAgIGl0ZW1Qb2ludGVyID0gWy4uLmdyb3VwUG9pbnRlciwgJ3VpOm9yZGVyJ11cblxuICAgICAgICAgICAgLy8gQ29weSBvdGhlciBhbHRlcm5hdGUgbGF5b3V0IG9wdGlvbnMgdG8gc2NoZW1hICd4LXNjaGVtYS1mb3JtJyxcbiAgICAgICAgICAgIC8vIChsaWtlIEFuZ3VsYXIgU2NoZW1hIEZvcm0gb3B0aW9ucykgYW5kIHJlbW92ZSBhbnkgJ3VpOicgcHJlZml4ZXNcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGtleS5zbGljZSgwLCAzKS50b0xvd2VyQ2FzZSgpID09PSAndWk6Jykge1xuICAgICAgICAgICAgICBrZXkgPSBrZXkuc2xpY2UoMylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGl0ZW1Qb2ludGVyID0gWy4uLmdyb3VwUG9pbnRlciwgJ3gtc2NoZW1hLWZvcm0nLCBrZXldXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIEpzb25Qb2ludGVyLmhhcyh0aGlzLmpzZi5zY2hlbWEsIGdyb3VwUG9pbnRlcikgJiZcbiAgICAgICAgICAgICFKc29uUG9pbnRlci5oYXModGhpcy5qc2Yuc2NoZW1hLCBpdGVtUG9pbnRlcilcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIEpzb25Qb2ludGVyLnNldCh0aGlzLmpzZi5zY2hlbWEsIGl0ZW1Qb2ludGVyLCB2YWx1ZSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdhY3RpdmF0ZUZvcm0nIGZ1bmN0aW9uXG4gICAqXG4gICAqIC4uLmNvbnRpbnVlZCBmcm9tICdpbml0aWFsaXplU2NoZW1hJyBmdW5jdGlvbiwgYWJvdmVcbiAgICogSWYgJ3NjaGVtYScgaGFzIG5vdCBiZWVuIGluaXRpYWxpemVkIChpLmUuIG5vIHNjaGVtYSBpbnB1dCBmb3VuZClcbiAgICogNi4gSWYgbGF5b3V0IGlucHV0IC0gYnVpbGQgc2NoZW1hIGZyb20gbGF5b3V0IGlucHV0XG4gICAqIDcuIElmIGRhdGEgaW5wdXQgLSBidWlsZCBzY2hlbWEgZnJvbSBkYXRhIGlucHV0XG4gICAqXG4gICAqIENyZWF0ZSBmaW5hbCBsYXlvdXQsXG4gICAqIGJ1aWxkIHRoZSBGb3JtR3JvdXAgdGVtcGxhdGUgYW5kIHRoZSBBbmd1bGFyIEZvcm1Hcm91cCxcbiAgICogc3Vic2NyaWJlIHRvIGNoYW5nZXMsXG4gICAqIGFuZCBhY3RpdmF0ZSB0aGUgZm9ybS5cbiAgICovXG4gIHByaXZhdGUgYWN0aXZhdGVGb3JtKCkge1xuICAgIC8vIElmICdzY2hlbWEnIG5vdCBpbml0aWFsaXplZFxuICAgIGlmIChpc0VtcHR5KHRoaXMuanNmLnNjaGVtYSkpIHtcbiAgICAgIC8vIFRPRE86IElmIGZ1bGwgbGF5b3V0IGlucHV0ICh3aXRoIG5vICcqJyksIGJ1aWxkIHNjaGVtYSBmcm9tIGxheW91dFxuICAgICAgLy8gaWYgKCF0aGlzLmpzZi5sYXlvdXQuaW5jbHVkZXMoJyonKSkge1xuICAgICAgLy8gICB0aGlzLmpzZi5idWlsZFNjaGVtYUZyb21MYXlvdXQoKTtcbiAgICAgIC8vIH0gZWxzZVxuXG4gICAgICAvLyBJZiBkYXRhIGlucHV0LCBidWlsZCBzY2hlbWEgZnJvbSBkYXRhXG4gICAgICBpZiAoIWlzRW1wdHkodGhpcy5qc2YuZm9ybVZhbHVlcykpIHtcbiAgICAgICAgdGhpcy5qc2YuYnVpbGRTY2hlbWFGcm9tRGF0YSgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFpc0VtcHR5KHRoaXMuanNmLnNjaGVtYSkpIHtcbiAgICAgIC8vIElmIG5vdCBhbHJlYWR5IGluaXRpYWxpemVkLCBpbml0aWFsaXplIGFqdiBhbmQgY29tcGlsZSBzY2hlbWFcbiAgICAgIHRoaXMuanNmLmNvbXBpbGVBanZTY2hlbWEoKVxuXG4gICAgICAvLyBVcGRhdGUgYWxsIGxheW91dCBlbGVtZW50cywgYWRkIHZhbHVlcywgd2lkZ2V0cywgYW5kIHZhbGlkYXRvcnMsXG4gICAgICAvLyByZXBsYWNlIGFueSAnKicgd2l0aCBhIGxheW91dCBidWlsdCBmcm9tIGFsbCBzY2hlbWEgZWxlbWVudHMsXG4gICAgICAvLyBhbmQgdXBkYXRlIHRoZSBGb3JtR3JvdXAgdGVtcGxhdGUgd2l0aCBhbnkgbmV3IHZhbGlkYXRvcnNcbiAgICAgIHRoaXMuanNmLmJ1aWxkTGF5b3V0KHRoaXMud2lkZ2V0TGlicmFyeSlcblxuICAgICAgLy8gQnVpbGQgdGhlIEFuZ3VsYXIgRm9ybUdyb3VwIHRlbXBsYXRlIGZyb20gdGhlIHNjaGVtYVxuICAgICAgdGhpcy5qc2YuYnVpbGRGb3JtR3JvdXBUZW1wbGF0ZSh0aGlzLmpzZi5mb3JtVmFsdWVzKVxuXG4gICAgICAvLyBCdWlsZCB0aGUgcmVhbCBBbmd1bGFyIEZvcm1Hcm91cCBmcm9tIHRoZSBGb3JtR3JvdXAgdGVtcGxhdGVcbiAgICAgIHRoaXMuanNmLmJ1aWxkRm9ybUdyb3VwKClcbiAgICB9XG5cbiAgICBpZiAodGhpcy5qc2YuZm9ybUdyb3VwKSB7XG4gICAgICAvLyBSZXNldCBpbml0aWFsIGZvcm0gdmFsdWVzXG4gICAgICBpZiAoXG4gICAgICAgICFpc0VtcHR5KHRoaXMuanNmLmZvcm1WYWx1ZXMpICYmXG4gICAgICAgIHRoaXMuanNmLmZvcm1PcHRpb25zLnNldFNjaGVtYURlZmF1bHRzICE9PSB0cnVlICYmXG4gICAgICAgIHRoaXMuanNmLmZvcm1PcHRpb25zLnNldExheW91dERlZmF1bHRzICE9PSB0cnVlXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5zZXRGb3JtVmFsdWVzKHRoaXMuanNmLmZvcm1WYWx1ZXMpXG4gICAgICB9XG5cbiAgICAgIC8vIFRPRE86IEZpZ3VyZSBvdXQgaG93IHRvIGRpc3BsYXkgY2FsY3VsYXRlZCB2YWx1ZXMgd2l0aG91dCBjaGFuZ2luZyBvYmplY3QgZGF0YVxuICAgICAgLy8gU2VlIGh0dHA6Ly91bGlvbi5naXRodWIuaW8vanNvbmZvcm0vcGxheWdyb3VuZC8/ZXhhbXBsZT10ZW1wbGF0aW5nLXZhbHVlc1xuICAgICAgLy8gQ2FsY3VsYXRlIHJlZmVyZW5jZXMgdG8gb3RoZXIgZmllbGRzXG4gICAgICAvLyBpZiAoIWlzRW1wdHkodGhpcy5qc2YuZm9ybUdyb3VwLnZhbHVlKSkge1xuICAgICAgLy8gICBmb3JFYWNoKHRoaXMuanNmLmZvcm1Hcm91cC52YWx1ZSwgKHZhbHVlLCBrZXksIG9iamVjdCwgcm9vdE9iamVjdCkgPT4ge1xuICAgICAgLy8gICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyAgICAgICBvYmplY3Rba2V5XSA9IHRoaXMuanNmLnBhcnNlVGV4dCh2YWx1ZSwgdmFsdWUsIHJvb3RPYmplY3QsIGtleSk7XG4gICAgICAvLyAgICAgfVxuICAgICAgLy8gICB9LCAndG9wLWRvd24nKTtcbiAgICAgIC8vIH1cblxuICAgICAgLy8gU3Vic2NyaWJlIHRvIGZvcm0gY2hhbmdlcyB0byBvdXRwdXQgbGl2ZSBkYXRhLCB2YWxpZGF0aW9uLCBhbmQgZXJyb3JzXG4gICAgICB0aGlzLmpzZi5kYXRhQ2hhbmdlcy5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgIHRoaXMub25DaGFuZ2VzLmVtaXQodGhpcy5vYmplY3RXcmFwID8gZGF0YVsnMSddIDogZGF0YSlcbiAgICAgICAgaWYgKHRoaXMuZm9ybVZhbHVlc0lucHV0ICYmIHRoaXMuZm9ybVZhbHVlc0lucHV0LmluZGV4T2YoJy4nKSA9PT0gLTEpIHtcbiAgICAgICAgICB0aGlzW2Ake3RoaXMuZm9ybVZhbHVlc0lucHV0fUNoYW5nZWBdLmVtaXQoXG4gICAgICAgICAgICB0aGlzLm9iamVjdFdyYXAgPyBkYXRhWycxJ10gOiBkYXRhXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICAvLyBUcmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb24gb24gc3RhdHVzQ2hhbmdlcyB0byBzaG93IHVwZGF0ZWQgZXJyb3JzXG4gICAgICB0aGlzLmpzZi5mb3JtR3JvdXAuc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT5cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKVxuICAgICAgKVxuICAgICAgdGhpcy5qc2YuaXNWYWxpZENoYW5nZXMuc3Vic2NyaWJlKGlzVmFsaWQgPT4gdGhpcy5pc1ZhbGlkLmVtaXQoaXNWYWxpZCkpXG4gICAgICB0aGlzLmpzZi52YWxpZGF0aW9uRXJyb3JDaGFuZ2VzLnN1YnNjcmliZShlcnIgPT5cbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3JzLmVtaXQoZXJyKVxuICAgICAgKVxuXG4gICAgICAvLyBPdXRwdXQgZmluYWwgc2NoZW1hLCBmaW5hbCBsYXlvdXQsIGFuZCBpbml0aWFsIGRhdGFcbiAgICAgIHRoaXMuZm9ybVNjaGVtYS5lbWl0KHRoaXMuanNmLnNjaGVtYSlcbiAgICAgIHRoaXMuZm9ybUxheW91dC5lbWl0KHRoaXMuanNmLmxheW91dClcbiAgICAgIHRoaXMub25DaGFuZ2VzLmVtaXQodGhpcy5vYmplY3RXcmFwID8gdGhpcy5qc2YuZGF0YVsnMSddIDogdGhpcy5qc2YuZGF0YSlcblxuICAgICAgLy8gSWYgdmFsaWRhdGVPblJlbmRlciwgb3V0cHV0IGluaXRpYWwgdmFsaWRhdGlvbiBhbmQgYW55IGVycm9yc1xuICAgICAgY29uc3QgdmFsaWRhdGVPblJlbmRlciA9IEpzb25Qb2ludGVyLmdldChcbiAgICAgICAgdGhpcy5qc2YsXG4gICAgICAgICcvZm9ybU9wdGlvbnMvdmFsaWRhdGVPblJlbmRlcidcbiAgICAgIClcbiAgICAgIGlmICh2YWxpZGF0ZU9uUmVuZGVyKSB7XG4gICAgICAgIC8vIHZhbGlkYXRlT25SZW5kZXIgPT09ICdhdXRvJyB8fCB0cnVlXG4gICAgICAgIGNvbnN0IHRvdWNoQWxsID0gY29udHJvbCA9PiB7XG4gICAgICAgICAgaWYgKHZhbGlkYXRlT25SZW5kZXIgPT09IHRydWUgfHwgaGFzVmFsdWUoY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgICAgIGNvbnRyb2wubWFya0FzVG91Y2hlZCgpXG4gICAgICAgICAgfVxuICAgICAgICAgIE9iamVjdC5rZXlzKGNvbnRyb2wuY29udHJvbHMgfHwge30pLmZvckVhY2goa2V5ID0+XG4gICAgICAgICAgICB0b3VjaEFsbChjb250cm9sLmNvbnRyb2xzW2tleV0pXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIHRvdWNoQWxsKHRoaXMuanNmLmZvcm1Hcm91cClcbiAgICAgICAgdGhpcy5pc1ZhbGlkLmVtaXQodGhpcy5qc2YuaXNWYWxpZClcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3JzLmVtaXQodGhpcy5qc2YuYWp2RXJyb3JzKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19