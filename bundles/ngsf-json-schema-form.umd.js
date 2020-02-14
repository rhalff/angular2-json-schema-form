(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/platform-browser'), require('lodash'), require('@ngsf/widget-library'), require('@ngsf/common'), require('@angular/common'), require('@ngsf/no-framework')) :
    typeof define === 'function' && define.amd ? define('@ngsf/json-schema-form', ['exports', '@angular/core', '@angular/forms', '@angular/platform-browser', 'lodash', '@ngsf/widget-library', '@ngsf/common', '@angular/common', '@ngsf/no-framework'], factory) :
    (global = global || self, factory((global.ngsf = global.ngsf || {}, global.ngsf['json-schema-form'] = {}), global.ng.core, global.ng.forms, global.ng.platformBrowser, global.lodash, global.widgetLibrary, global.common, global.ng.common, global.noFramework));
}(this, (function (exports, core, forms, platformBrowser, lodash, widgetLibrary, common, common$1, noFramework) { 'use strict';

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
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return JsonSchemaFormComponent; }),
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
            this.onChanges = new core.EventEmitter();
            this.onSubmit = new core.EventEmitter();
            this.isValid = new core.EventEmitter();
            this.validationErrors = new core.EventEmitter();
            this.formSchema = new core.EventEmitter();
            this.formLayout = new core.EventEmitter();
            this.dataChange = new core.EventEmitter();
            this.modelChange = new core.EventEmitter();
            this.formDataChange = new core.EventEmitter();
            this.ngModelChange = new core.EventEmitter();
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
                        .filter(function (key) { return !lodash.isEqual(_this.previousInputs.form[key], _this.form[key]); })
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
            if (common.isObject(this.options)) {
                this.jsf.setOptions(this.options);
                loadExternalAssets = this.options.loadExternalAssets || loadExternalAssets;
                framework = this.options.framework || framework;
            }
            if (common.isObject(this.form) && common.isObject(this.form.options)) {
                this.jsf.setOptions(this.form.options);
                loadExternalAssets =
                    this.form.options.loadExternalAssets || loadExternalAssets;
                framework = this.form.options.framework || framework;
            }
            if (common.isObject(this.widgets)) {
                this.jsf.setOptions({ widgets: this.widgets });
            }
            this.frameworkLibrary.setLoadExternalAssets(loadExternalAssets);
            this.frameworkLibrary.setFramework(framework);
            this.jsf.framework = this.frameworkLibrary.getFramework();
            if (common.isObject(this.jsf.formOptions.widgets)) {
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
            if (common.isObject(this.form) && common.isObject(this.form.tpldata)) {
                this.jsf.setTpldata(this.form.tpldata);
            }
        };
        JsonSchemaFormComponent.prototype.initializeSchema = function () {
            if (common.isObject(this.schema)) {
                this.jsf.AngularSchemaFormCompatibility = true;
                this.jsf.schema = lodash.cloneDeep(this.schema);
            }
            else if (common.hasOwn(this.form, 'schema') && common.isObject(this.form.schema)) {
                this.jsf.schema = lodash.cloneDeep(this.form.schema);
            }
            else if (common.isObject(this.JSONSchema)) {
                this.jsf.ReactJsonSchemaFormCompatibility = true;
                this.jsf.schema = lodash.cloneDeep(this.JSONSchema);
            }
            else if (common.hasOwn(this.form, 'JSONSchema') &&
                common.isObject(this.form.JSONSchema)) {
                this.jsf.ReactJsonSchemaFormCompatibility = true;
                this.jsf.schema = lodash.cloneDeep(this.form.JSONSchema);
            }
            else if (common.hasOwn(this.form, 'properties') &&
                common.isObject(this.form.properties)) {
                this.jsf.schema = lodash.cloneDeep(this.form);
            }
            else if (common.isObject(this.form)) {
            }
            if (!common.isEmpty(this.jsf.schema)) {
                if (common.inArray('object', this.jsf.schema.type)) {
                    this.jsf.schema.type = 'object';
                }
                if (common.hasOwn(this.jsf.schema, 'type') &&
                    this.jsf.schema.type !== 'object') {
                    this.jsf.schema = {
                        type: 'object',
                        properties: { 1: this.jsf.schema },
                    };
                    this.objectWrap = true;
                }
                else if (!common.hasOwn(this.jsf.schema, 'type')) {
                    if (common.isObject(this.jsf.schema.properties) ||
                        common.isObject(this.jsf.schema.patternProperties) ||
                        common.isObject(this.jsf.schema.additionalProperties)) {
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
                this.jsf.schema = common.convertSchemaToDraft6(this.jsf.schema);
                this.jsf.compileAjvSchema();
                this.jsf.schema = common.resolveSchemaReferences(this.jsf.schema, this.jsf.schemaRefLibrary, this.jsf.schemaRecursiveRefMap, this.jsf.dataRecursiveRefMap, this.jsf.arrayMap);
                if (common.hasOwn(this.jsf.schemaRefLibrary, '')) {
                    this.jsf.hasRootReference = true;
                }
            }
        };
        JsonSchemaFormComponent.prototype.initializeData = function () {
            if (common.hasValue(this.data)) {
                this.jsf.formValues = lodash.cloneDeep(this.data);
                this.formValuesInput = 'data';
            }
            else if (common.hasValue(this.model)) {
                this.jsf.AngularSchemaFormCompatibility = true;
                this.jsf.formValues = lodash.cloneDeep(this.model);
                this.formValuesInput = 'model';
            }
            else if (common.hasValue(this.ngModel)) {
                this.jsf.AngularSchemaFormCompatibility = true;
                this.jsf.formValues = lodash.cloneDeep(this.ngModel);
                this.formValuesInput = 'ngModel';
            }
            else if (common.isObject(this.form) && common.hasValue(this.form.value)) {
                this.jsf.JsonFormCompatibility = true;
                this.jsf.formValues = lodash.cloneDeep(this.form.value);
                this.formValuesInput = 'form.value';
            }
            else if (common.isObject(this.form) && common.hasValue(this.form.data)) {
                this.jsf.formValues = lodash.cloneDeep(this.form.data);
                this.formValuesInput = 'form.data';
            }
            else if (common.hasValue(this.formData)) {
                this.jsf.ReactJsonSchemaFormCompatibility = true;
                this.formValuesInput = 'formData';
            }
            else if (common.hasOwn(this.form, 'formData') && common.hasValue(this.form.formData)) {
                this.jsf.ReactJsonSchemaFormCompatibility = true;
                this.jsf.formValues = lodash.cloneDeep(this.form.formData);
                this.formValuesInput = 'form.formData';
            }
            else {
                this.formValuesInput = null;
            }
        };
        JsonSchemaFormComponent.prototype.initializeLayout = function () {
            var _this = this;
            var fixJsonFormOptions = function (layout) {
                if (common.isObject(layout) || common.isArray(layout)) {
                    common.forEach(layout, function (value, key) {
                        if (common.hasOwn(value, 'options') && common.isObject(value.options)) {
                            value.titleMap = value.options;
                            delete value.options;
                        }
                    }, 'top-down');
                }
                return layout;
            };
            if (common.isArray(this.layout)) {
                this.jsf.layout = lodash.cloneDeep(this.layout);
            }
            else if (common.isArray(this.form)) {
                this.jsf.AngularSchemaFormCompatibility = true;
                this.jsf.layout = lodash.cloneDeep(this.form);
            }
            else if (this.form && common.isArray(this.form.form)) {
                this.jsf.JsonFormCompatibility = true;
                this.jsf.layout = fixJsonFormOptions(lodash.cloneDeep(this.form.form));
            }
            else if (this.form && common.isArray(this.form.layout)) {
                this.jsf.layout = lodash.cloneDeep(this.form.layout);
            }
            else {
                this.jsf.layout = ['*'];
            }
            var alternateLayout = null;
            if (common.isObject(this.UISchema)) {
                this.jsf.ReactJsonSchemaFormCompatibility = true;
                alternateLayout = lodash.cloneDeep(this.UISchema);
            }
            else if (common.hasOwn(this.form, 'UISchema')) {
                this.jsf.ReactJsonSchemaFormCompatibility = true;
                alternateLayout = lodash.cloneDeep(this.form.UISchema);
            }
            else if (common.hasOwn(this.form, 'uiSchema')) {
                this.jsf.ReactJsonSchemaFormCompatibility = true;
                alternateLayout = lodash.cloneDeep(this.form.uiSchema);
            }
            else if (common.hasOwn(this.form, 'customFormItems')) {
                this.jsf.JsonFormCompatibility = true;
                alternateLayout = fixJsonFormOptions(lodash.cloneDeep(this.form.customFormItems));
            }
            if (alternateLayout) {
                common.JsonPointer.forEachDeep(alternateLayout, function (value, pointer) {
                    var schemaPointer = pointer
                        .replace(/\//g, '/properties/')
                        .replace(/\/properties\/items\/properties\//g, '/items/properties/')
                        .replace(/\/properties\/titleMap\/properties\//g, '/titleMap/properties/');
                    if (common.hasValue(value) && common.hasValue(pointer)) {
                        var key = common.JsonPointer.toKey(pointer);
                        var groupPointer = (common.JsonPointer.parse(schemaPointer) || []).slice(0, -2);
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
                        if (common.JsonPointer.has(_this.jsf.schema, groupPointer) &&
                            !common.JsonPointer.has(_this.jsf.schema, itemPointer)) {
                            common.JsonPointer.set(_this.jsf.schema, itemPointer, value);
                        }
                    }
                });
            }
        };
        JsonSchemaFormComponent.prototype.activateForm = function () {
            var _this = this;
            if (common.isEmpty(this.jsf.schema)) {
                if (!common.isEmpty(this.jsf.formValues)) {
                    this.jsf.buildSchemaFromData();
                }
            }
            if (!common.isEmpty(this.jsf.schema)) {
                this.jsf.compileAjvSchema();
                this.jsf.buildLayout(this.widgetLibrary);
                this.jsf.buildFormGroupTemplate(this.jsf.formValues);
                this.jsf.buildFormGroup();
            }
            if (this.jsf.formGroup) {
                if (!common.isEmpty(this.jsf.formValues) &&
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
                var validateOnRender_1 = common.JsonPointer.get(this.jsf, '/formOptions/validateOnRender');
                if (validateOnRender_1) {
                    var touchAll_1 = function (control) {
                        if (validateOnRender_1 === true || common.hasValue(control.value)) {
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
            { type: core.ChangeDetectorRef },
            { type: widgetLibrary.FrameworkLibraryService },
            { type: widgetLibrary.WidgetLibraryService },
            { type: widgetLibrary.JsonSchemaFormService },
            { type: platformBrowser.DomSanitizer }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], JsonSchemaFormComponent.prototype, "schema", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], JsonSchemaFormComponent.prototype, "layout", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], JsonSchemaFormComponent.prototype, "data", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], JsonSchemaFormComponent.prototype, "options", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], JsonSchemaFormComponent.prototype, "framework", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], JsonSchemaFormComponent.prototype, "widgets", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], JsonSchemaFormComponent.prototype, "form", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], JsonSchemaFormComponent.prototype, "model", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], JsonSchemaFormComponent.prototype, "JSONSchema", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], JsonSchemaFormComponent.prototype, "UISchema", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], JsonSchemaFormComponent.prototype, "formData", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], JsonSchemaFormComponent.prototype, "ngModel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], JsonSchemaFormComponent.prototype, "language", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], JsonSchemaFormComponent.prototype, "loadExternalAssets", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], JsonSchemaFormComponent.prototype, "debug", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], JsonSchemaFormComponent.prototype, "onChanges", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], JsonSchemaFormComponent.prototype, "onSubmit", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], JsonSchemaFormComponent.prototype, "isValid", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], JsonSchemaFormComponent.prototype, "validationErrors", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], JsonSchemaFormComponent.prototype, "formSchema", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], JsonSchemaFormComponent.prototype, "formLayout", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], JsonSchemaFormComponent.prototype, "dataChange", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], JsonSchemaFormComponent.prototype, "modelChange", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], JsonSchemaFormComponent.prototype, "formDataChange", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], JsonSchemaFormComponent.prototype, "ngModelChange", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], JsonSchemaFormComponent.prototype, "value", null);
        JsonSchemaFormComponent = __decorate([
            core.Component({
                selector: 'json-schema-form',
                template: "\n    <div *ngFor=\"let stylesheet of stylesheets\">\n      <link rel=\"stylesheet\" [href]=\"stylesheet\" />\n    </div>\n    <div *ngFor=\"let script of scripts\">\n      <script type=\"text/javascript\" [src]=\"script\"></script>\n    </div>\n    <form class=\"json-schema-form\" (ngSubmit)=\"submitForm()\">\n      <root-widget [layout]=\"jsf?.layout\"></root-widget>\n    </form>\n    <div *ngIf=\"debug || jsf?.formOptions?.debug\">\n      Debug output:\n      <pre>{{ debugOutput }}</pre>\n    </div>\n  ",
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                providers: [widgetLibrary.JsonSchemaFormService, JSON_SCHEMA_FORM_VALUE_ACCESSOR]
            }),
            __metadata("design:paramtypes", [core.ChangeDetectorRef,
                widgetLibrary.FrameworkLibraryService,
                widgetLibrary.WidgetLibraryService,
                widgetLibrary.JsonSchemaFormService,
                platformBrowser.DomSanitizer])
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
                : [{ provide: common.Framework, useClass: noFramework.NoFramework, multi: true }];
            return {
                ngModule: JsonSchemaFormModule_1,
                providers: __spread$1([
                    widgetLibrary.JsonSchemaFormService,
                    widgetLibrary.FrameworkLibraryService,
                    widgetLibrary.WidgetLibraryService
                ], loadFrameworks),
            };
        };
        var JsonSchemaFormModule_1;
        JsonSchemaFormModule = JsonSchemaFormModule_1 = __decorate$1([
            core.NgModule({
                imports: [
                    common$1.CommonModule,
                    forms.FormsModule,
                    forms.ReactiveFormsModule,
                    widgetLibrary.WidgetLibraryModule,
                ],
                declarations: [JsonSchemaFormComponent],
                exports: [JsonSchemaFormComponent, widgetLibrary.WidgetLibraryModule],
            })
        ], JsonSchemaFormModule);
        return JsonSchemaFormModule;
    }());

    exports.JSON_SCHEMA_FORM_VALUE_ACCESSOR = JSON_SCHEMA_FORM_VALUE_ACCESSOR;
    exports.JsonSchemaFormComponent = JsonSchemaFormComponent;
    exports.JsonSchemaFormModule = JsonSchemaFormModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngsf-json-schema-form.umd.js.map
