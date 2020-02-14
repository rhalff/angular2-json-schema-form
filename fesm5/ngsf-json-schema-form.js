import { forwardRef, EventEmitter, ChangeDetectorRef, Input, Output, Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { isEqual, cloneDeep } from 'lodash';
import { FrameworkLibraryService, WidgetLibraryService, JsonSchemaFormService, WidgetLibraryModule } from '@ngsf/widget-library';
import { isObject, hasOwn, isEmpty, inArray, convertSchemaToDraft6, resolveSchemaReferences, hasValue, isArray, forEach, JsonPointer, Framework } from '@ngsf/common';
import { CommonModule } from '@angular/common';
import { NoFramework } from '@ngsf/no-framework';

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
var JSON_SCHEMA_FORM_VALUE_ACCESSOR = {
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
                    .filter(function (key) { return !isEqual(_this.previousInputs.form[key], _this.form[key]); })
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
            this.jsf.schema = cloneDeep(this.schema);
        }
        else if (hasOwn(this.form, 'schema') && isObject(this.form.schema)) {
            this.jsf.schema = cloneDeep(this.form.schema);
        }
        else if (isObject(this.JSONSchema)) {
            this.jsf.ReactJsonSchemaFormCompatibility = true;
            this.jsf.schema = cloneDeep(this.JSONSchema);
        }
        else if (hasOwn(this.form, 'JSONSchema') &&
            isObject(this.form.JSONSchema)) {
            this.jsf.ReactJsonSchemaFormCompatibility = true;
            this.jsf.schema = cloneDeep(this.form.JSONSchema);
        }
        else if (hasOwn(this.form, 'properties') &&
            isObject(this.form.properties)) {
            this.jsf.schema = cloneDeep(this.form);
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
            this.jsf.formValues = cloneDeep(this.data);
            this.formValuesInput = 'data';
        }
        else if (hasValue(this.model)) {
            this.jsf.AngularSchemaFormCompatibility = true;
            this.jsf.formValues = cloneDeep(this.model);
            this.formValuesInput = 'model';
        }
        else if (hasValue(this.ngModel)) {
            this.jsf.AngularSchemaFormCompatibility = true;
            this.jsf.formValues = cloneDeep(this.ngModel);
            this.formValuesInput = 'ngModel';
        }
        else if (isObject(this.form) && hasValue(this.form.value)) {
            this.jsf.JsonFormCompatibility = true;
            this.jsf.formValues = cloneDeep(this.form.value);
            this.formValuesInput = 'form.value';
        }
        else if (isObject(this.form) && hasValue(this.form.data)) {
            this.jsf.formValues = cloneDeep(this.form.data);
            this.formValuesInput = 'form.data';
        }
        else if (hasValue(this.formData)) {
            this.jsf.ReactJsonSchemaFormCompatibility = true;
            this.formValuesInput = 'formData';
        }
        else if (hasOwn(this.form, 'formData') && hasValue(this.form.formData)) {
            this.jsf.ReactJsonSchemaFormCompatibility = true;
            this.jsf.formValues = cloneDeep(this.form.formData);
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
            this.jsf.layout = cloneDeep(this.layout);
        }
        else if (isArray(this.form)) {
            this.jsf.AngularSchemaFormCompatibility = true;
            this.jsf.layout = cloneDeep(this.form);
        }
        else if (this.form && isArray(this.form.form)) {
            this.jsf.JsonFormCompatibility = true;
            this.jsf.layout = fixJsonFormOptions(cloneDeep(this.form.form));
        }
        else if (this.form && isArray(this.form.layout)) {
            this.jsf.layout = cloneDeep(this.form.layout);
        }
        else {
            this.jsf.layout = ['*'];
        }
        var alternateLayout = null;
        if (isObject(this.UISchema)) {
            this.jsf.ReactJsonSchemaFormCompatibility = true;
            alternateLayout = cloneDeep(this.UISchema);
        }
        else if (hasOwn(this.form, 'UISchema')) {
            this.jsf.ReactJsonSchemaFormCompatibility = true;
            alternateLayout = cloneDeep(this.form.UISchema);
        }
        else if (hasOwn(this.form, 'uiSchema')) {
            this.jsf.ReactJsonSchemaFormCompatibility = true;
            alternateLayout = cloneDeep(this.form.uiSchema);
        }
        else if (hasOwn(this.form, 'customFormItems')) {
            this.jsf.JsonFormCompatibility = true;
            alternateLayout = fixJsonFormOptions(cloneDeep(this.form.customFormItems));
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

var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __read$1 = (this && this.__read) || function (o, n) {
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
var __spread$1 = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$1(arguments[i]));
    return ar;
};
var JsonSchemaFormModule = (function () {
    function JsonSchemaFormModule() {
    }
    JsonSchemaFormModule_1 = JsonSchemaFormModule;
    JsonSchemaFormModule.forRoot = function () {
        var frameworks = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            frameworks[_i] = arguments[_i];
        }
        var loadFrameworks = frameworks.length
            ? frameworks.map(function (framework) { return framework.forRoot().providers[0]; })
            : [{ provide: Framework, useClass: NoFramework, multi: true }];
        return {
            ngModule: JsonSchemaFormModule_1,
            providers: __spread$1([
                JsonSchemaFormService,
                FrameworkLibraryService,
                WidgetLibraryService
            ], loadFrameworks),
        };
    };
    var JsonSchemaFormModule_1;
    JsonSchemaFormModule = JsonSchemaFormModule_1 = __decorate$1([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                WidgetLibraryModule,
            ],
            declarations: [JsonSchemaFormComponent],
            exports: [JsonSchemaFormComponent, WidgetLibraryModule],
        })
    ], JsonSchemaFormModule);
    return JsonSchemaFormModule;
}());

export { JSON_SCHEMA_FORM_VALUE_ACCESSOR, JsonSchemaFormComponent, JsonSchemaFormModule };
//# sourceMappingURL=ngsf-json-schema-form.js.map
