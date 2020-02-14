import { Injectable, Directive, ElementRef, NgZone, Input, Component, ChangeDetectionStrategy, ComponentFactoryResolver, ViewChild, ViewContainerRef, Inject, NgModule } from '@angular/core';
import { Subject } from 'rxjs-compat/Subject';
import * as draft6 from 'ajv/lib/refs/json-schema-draft-06.json';
import Ajv from 'ajv';
import { cloneDeep, isEqual } from 'lodash';
import { frValidationMessages, enValidationMessages, forEach, formatFormData, buildFormGroupTemplate, buildFormGroup, buildLayout, isObject, hasOwn, buildSchemaFromData, buildSchemaFromLayout, JsonPointer, isArray, toTitleCase, hasValue, isEmpty, getControl, removeRecursiveReferences, isDefined, getLayoutNode, fixTitle, isString, Framework } from '@ngsf/common';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
var JsonSchemaFormService = (function () {
    function JsonSchemaFormService() {
        this.JsonFormCompatibility = false;
        this.ReactJsonSchemaFormCompatibility = false;
        this.AngularSchemaFormCompatibility = false;
        this.tpldata = {};
        this.ajvOptions = { allErrors: true, jsonPointers: true, unknownFormats: 'ignore' };
        this.ajv = new Ajv(this.ajvOptions);
        this.validateFormData = null;
        this.formValues = {};
        this.data = {};
        this.schema = {};
        this.layout = [];
        this.formGroupTemplate = {};
        this.formGroup = null;
        this.framework = null;
        this.validData = null;
        this.isValid = null;
        this.ajvErrors = null;
        this.validationErrors = null;
        this.dataErrors = new Map();
        this.formValueSubscription = null;
        this.dataChanges = new Subject();
        this.isValidChanges = new Subject();
        this.validationErrorChanges = new Subject();
        this.arrayMap = new Map();
        this.dataMap = new Map();
        this.dataRecursiveRefMap = new Map();
        this.schemaRecursiveRefMap = new Map();
        this.schemaRefLibrary = {};
        this.layoutRefLibrary = { '': null };
        this.templateRefLibrary = {};
        this.hasRootReference = false;
        this.language = 'en-US';
        this.defaultFormOptions = {
            addSubmit: 'auto',
            debug: false,
            disableInvalidSubmit: true,
            formDisabled: false,
            formReadonly: false,
            fieldsRequired: false,
            framework: 'no-framework',
            loadExternalAssets: false,
            pristine: { errors: true, success: true },
            supressPropertyTitles: false,
            setSchemaDefaults: 'auto',
            setLayoutDefaults: 'auto',
            validateOnRender: 'auto',
            widgets: {},
            defautWidgetOptions: {
                listItems: 1,
                addable: true,
                orderable: true,
                removable: true,
                enableErrorState: true,
                enableSuccessState: true,
                feedback: false,
                feedbackOnRender: false,
                notitle: false,
                disabled: false,
                readonly: false,
                returnEmptyFields: true,
                validationMessages: {}
            },
        };
        this.setLanguage(this.language);
        this.ajv.addMetaSchema(draft6);
    }
    JsonSchemaFormService.prototype.setLanguage = function (language) {
        if (language === void 0) { language = 'en-US'; }
        this.language = language;
        var validationMessages = language.slice(0, 2) === 'fr' ?
            frValidationMessages : enValidationMessages;
        this.defaultFormOptions.defautWidgetOptions.validationMessages =
            cloneDeep(validationMessages);
    };
    JsonSchemaFormService.prototype.getData = function () {
        return this.data;
    };
    JsonSchemaFormService.prototype.getSchema = function () {
        return this.schema;
    };
    JsonSchemaFormService.prototype.getLayout = function () {
        return this.layout;
    };
    JsonSchemaFormService.prototype.resetAllValues = function () {
        this.JsonFormCompatibility = false;
        this.ReactJsonSchemaFormCompatibility = false;
        this.AngularSchemaFormCompatibility = false;
        this.tpldata = {};
        this.validateFormData = null;
        this.formValues = {};
        this.schema = {};
        this.layout = [];
        this.formGroupTemplate = {};
        this.formGroup = null;
        this.framework = null;
        this.data = {};
        this.validData = null;
        this.isValid = null;
        this.validationErrors = null;
        this.arrayMap = new Map();
        this.dataMap = new Map();
        this.dataRecursiveRefMap = new Map();
        this.schemaRecursiveRefMap = new Map();
        this.layoutRefLibrary = {};
        this.schemaRefLibrary = {};
        this.templateRefLibrary = {};
        this.formOptions = cloneDeep(this.defaultFormOptions);
    };
    JsonSchemaFormService.prototype.buildRemoteError = function (errors) {
        var _this = this;
        forEach(errors, (function (value, key) {
            var e_1, _a;
            if (key in _this.formGroup.controls) {
                try {
                    for (var value_1 = __values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
                        var error = value_1_1.value;
                        var err = {};
                        err[error.code] = error.message;
                        if (typeof key === 'string') {
                            _this.formGroup.get(key).setErrors(err, { emitEvent: true });
                        }
                        else {
                            console.error('Unhandled for error', key);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (value_1_1 && !value_1_1.done && (_a = value_1.return)) _a.call(value_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        }));
    };
    JsonSchemaFormService.prototype.validateData = function (newValue, updateSubscriptions) {
        if (updateSubscriptions === void 0) { updateSubscriptions = true; }
        this.data = formatFormData(newValue, this.dataMap, this.dataRecursiveRefMap, this.arrayMap, this.formOptions.returnEmptyFields);
        this.isValid = this.validateFormData(this.data);
        this.validData = this.isValid ? this.data : null;
        var compileErrors = (function (errors) {
            var compiledErrors = (({}));
            (errors || []).forEach((function (error) {
                if (!compiledErrors[error.dataPath]) {
                    compiledErrors[error.dataPath] = [];
                }
                compiledErrors[error.dataPath].push(error.message);
            }));
            return compiledErrors;
        });
        this.ajvErrors = this.validateFormData.errors;
        this.validationErrors = compileErrors(this.validateFormData.errors);
        if (updateSubscriptions) {
            this.dataChanges.next(this.data);
            this.isValidChanges.next(this.isValid);
            this.validationErrorChanges.next(this.ajvErrors);
        }
    };
    JsonSchemaFormService.prototype.buildFormGroupTemplate = function (formValues, setValues) {
        if (formValues === void 0) { formValues = null; }
        if (setValues === void 0) { setValues = true; }
        this.formGroupTemplate = buildFormGroupTemplate(this, formValues, setValues);
    };
    JsonSchemaFormService.prototype.buildFormGroup = function () {
        var _this = this;
        this.formGroup = ((buildFormGroup(this.formGroupTemplate)));
        if (this.formGroup) {
            this.compileAjvSchema();
            this.validateData(this.formGroup.value);
            if (this.formValueSubscription) {
                this.formValueSubscription.unsubscribe();
            }
            this.formValueSubscription = this.formGroup.valueChanges
                .subscribe((function (formValue) { return _this.validateData(formValue); }));
        }
    };
    JsonSchemaFormService.prototype.buildLayout = function (widgetLibrary) {
        this.layout = buildLayout(this, widgetLibrary);
    };
    JsonSchemaFormService.prototype.setOptions = function (newOptions) {
        if (isObject(newOptions)) {
            var addOptions = cloneDeep(newOptions);
            if (isObject(addOptions.defaultOptions)) {
                Object.assign(this.formOptions.defautWidgetOptions, addOptions.defaultOptions);
                delete addOptions.defaultOptions;
            }
            if (isObject(addOptions.defautWidgetOptions)) {
                Object.assign(this.formOptions.defautWidgetOptions, addOptions.defautWidgetOptions);
                delete addOptions.defautWidgetOptions;
            }
            Object.assign(this.formOptions, addOptions);
            var globalDefaults_1 = this.formOptions.defautWidgetOptions;
            ['ErrorState', 'SuccessState']
                .filter((function (suffix) { return hasOwn(globalDefaults_1, 'disable' + suffix); }))
                .forEach((function (suffix) {
                globalDefaults_1['enable' + suffix] = !globalDefaults_1['disable' + suffix];
                delete globalDefaults_1['disable' + suffix];
            }));
        }
    };
    JsonSchemaFormService.prototype.compileAjvSchema = function () {
        if (!this.validateFormData) {
            if (Array.isArray(this.schema.properties['ui:order'])) {
                this.schema['ui:order'] = this.schema.properties['ui:order'];
                delete this.schema.properties['ui:order'];
            }
            this.ajv.removeSchema(this.schema);
            this.validateFormData = this.ajv.compile(this.schema);
        }
    };
    JsonSchemaFormService.prototype.buildSchemaFromData = function (data, requireAllFields) {
        if (requireAllFields === void 0) { requireAllFields = false; }
        if (data) {
            return buildSchemaFromData(data, requireAllFields);
        }
        this.schema = buildSchemaFromData(this.formValues, requireAllFields);
    };
    JsonSchemaFormService.prototype.buildSchemaFromLayout = function (layout) {
        if (layout) {
            return buildSchemaFromLayout(layout);
        }
        this.schema = buildSchemaFromLayout(this.layout);
    };
    JsonSchemaFormService.prototype.setTpldata = function (newTpldata) {
        if (newTpldata === void 0) { newTpldata = {}; }
        this.tpldata = newTpldata;
    };
    JsonSchemaFormService.prototype.parseText = function (text, value, values, key) {
        var _this = this;
        if (text === void 0) { text = ''; }
        if (value === void 0) { value = {}; }
        if (values === void 0) { values = {}; }
        if (key === void 0) { key = null; }
        if (!text || !/{{.+?}}/.test(text)) {
            return text;
        }
        return text.replace(/{{(.+?)}}/g, (function () {
            var a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                a[_i] = arguments[_i];
            }
            return _this.parseExpression(a[1], value, values, key, _this.tpldata);
        }));
    };
    JsonSchemaFormService.prototype.parseExpression = function (expression, value, values, key, tpldata) {
        var _this = this;
        if (expression === void 0) { expression = ''; }
        if (value === void 0) { value = {}; }
        if (values === void 0) { values = {}; }
        if (key === void 0) { key = null; }
        if (tpldata === void 0) { tpldata = null; }
        if (typeof expression !== 'string') {
            return '';
        }
        var index = typeof key === 'number' ? (key + 1) + '' : (key || '');
        expression = expression.trim();
        if ((expression[0] === '\'' || expression[0] === '"') &&
            expression[0] === expression[expression.length - 1] &&
            expression.slice(1, expression.length - 1).indexOf(expression[0]) === -1) {
            return expression.slice(1, expression.length - 1);
        }
        if (expression === 'idx' || expression === '$index') {
            return index;
        }
        if (expression === 'value' && !hasOwn(values, 'value')) {
            return value;
        }
        if (['"', '\'', ' ', '||', '&&', '+'].every((function (delimiter) { return expression.indexOf(delimiter) === -1; }))) {
            var pointer = JsonPointer.parseObjectPath(expression);
            return pointer[0] === 'value' && JsonPointer.has(value, pointer.slice(1)) ?
                JsonPointer.get(value, pointer.slice(1)) :
                pointer[0] === 'values' && JsonPointer.has(values, pointer.slice(1)) ?
                    JsonPointer.get(values, pointer.slice(1)) :
                    pointer[0] === 'tpldata' && JsonPointer.has(tpldata, pointer.slice(1)) ?
                        JsonPointer.get(tpldata, pointer.slice(1)) :
                        JsonPointer.has(values, pointer) ? JsonPointer.get(values, pointer) : '';
        }
        if (expression.indexOf('[idx]') > -1) {
            expression = expression.replace(/\[idx\]/g, index);
        }
        if (expression.indexOf('[$index]') > -1) {
            expression = expression.replace(/\[$index\]/g, index);
        }
        if (expression.indexOf('||') > -1) {
            return expression.split('||').reduce((function (all, term) {
                return all || _this.parseExpression(term, value, values, key, tpldata);
            }), '');
        }
        if (expression.indexOf('&&') > -1) {
            return expression.split('&&').reduce((function (all, term) {
                return all && _this.parseExpression(term, value, values, key, tpldata);
            }), ' ').trim();
        }
        if (expression.indexOf('+') > -1) {
            return expression.split('+')
                .map((function (term) { return _this.parseExpression(term, value, values, key, tpldata); }))
                .join('');
        }
        return '';
    };
    JsonSchemaFormService.prototype.setArrayItemTitle = function (parentCtx, childNode, index) {
        if (parentCtx === void 0) { parentCtx = {}; }
        if (childNode === void 0) { childNode = null; }
        if (index === void 0) { index = null; }
        var parentNode = parentCtx.layoutNode;
        var parentValues = this.getFormControlValue(parentCtx);
        var isArrayItem = (parentNode.type || '').slice(-5) === 'array' && isArray(parentValues);
        var text = JsonPointer.getFirst(isArrayItem && childNode.type !== '$ref' ? [
            [childNode, '/options/legend'],
            [childNode, '/options/title'],
            [parentNode, '/options/title'],
            [parentNode, '/options/legend'],
        ] : [
            [childNode, '/options/title'],
            [childNode, '/options/legend'],
            [parentNode, '/options/title'],
            [parentNode, '/options/legend']
        ]);
        if (!text) {
            return text;
        }
        var childValue = isArray(parentValues) && index < parentValues.length ?
            parentValues[index] : parentValues;
        return this.parseText(text, childValue, parentValues, index);
    };
    JsonSchemaFormService.prototype.setItemTitle = function (ctx) {
        return !ctx.options.title && /^(\d+|-)$/.test(ctx.layoutNode.name) ?
            null :
            this.parseText(ctx.options.title || toTitleCase(ctx.layoutNode.name), this.getFormControlValue(this), (this.getFormControlGroup(this) || (({}))).value, ctx.dataIndex[ctx.dataIndex.length - 1]);
    };
    JsonSchemaFormService.prototype.evaluateCondition = function (layoutNode, dataIndex) {
        var arrayIndex = dataIndex && dataIndex[dataIndex.length - 1];
        var result = true;
        if (hasValue((layoutNode.options || {}).condition)) {
            if (typeof layoutNode.options.condition === 'string') {
                var pointer = layoutNode.options.condition;
                if (hasValue(arrayIndex)) {
                    pointer = pointer.replace('[arrayIndex]', "[" + arrayIndex + "]");
                }
                pointer = JsonPointer.parseObjectPath(pointer);
                result = !!JsonPointer.get(this.data, pointer);
                if (!result && pointer[0] === 'model') {
                    result = !!JsonPointer.get({ model: this.data }, pointer);
                }
            }
            else if (typeof layoutNode.options.condition === 'function') {
                result = layoutNode.options.condition(this.data);
            }
            else if (typeof layoutNode.options.condition.functionBody === 'string') {
                try {
                    var dynFn = new Function('model', 'arrayIndices', layoutNode.options.condition.functionBody);
                    result = dynFn(this.data, dataIndex);
                }
                catch (e) {
                    result = true;
                    console.error('condition functionBody errored out on evaluation: ' + layoutNode.options.condition.functionBody);
                }
            }
        }
        return result;
    };
    JsonSchemaFormService.prototype.initializeControl = function (ctx, bind) {
        var _this = this;
        if (bind === void 0) { bind = true; }
        if (!isObject(ctx)) {
            return false;
        }
        if (isEmpty(ctx.options)) {
            ctx.options = !isEmpty((ctx.layoutNode || {}).options) ?
                ctx.layoutNode.options : cloneDeep(this.formOptions);
        }
        ctx.formControl = this.getFormControl(ctx);
        ctx.boundControl = bind && !!ctx.formControl;
        if (ctx.formControl) {
            ctx.controlName = this.getFormControlName(ctx);
            ctx.controlValue = ctx.formControl.value;
            ctx.controlDisabled = ctx.formControl.disabled;
            ctx.options.errorMessage = ctx.formControl.status === 'VALID' ? null :
                this.formatErrors(ctx.formControl.errors, ctx.options.validationMessages);
            ctx.options.showErrors = this.formOptions.validateOnRender === true ||
                (this.formOptions.validateOnRender === 'auto' && hasValue(ctx.controlValue));
            ctx.formControl.statusChanges.subscribe((function (status) {
                return ctx.options.errorMessage = status === 'VALID' ? null :
                    _this.formatErrors(ctx.formControl.errors, ctx.options.validationMessages);
            }));
            ctx.formControl.valueChanges.subscribe((function (value) {
                if (!isEqual(ctx.controlValue, value)) {
                    ctx.controlValue = value;
                }
            }));
        }
        else {
            ctx.controlName = ctx.layoutNode.name;
            ctx.controlValue = ctx.layoutNode.value || null;
            var dataPointer = this.getDataPointer(ctx);
            if (bind && dataPointer) {
                console.error("warning: control \"" + dataPointer + "\" is not bound to the Angular FormGroup.");
            }
        }
        return ctx.boundControl;
    };
    JsonSchemaFormService.prototype.formatErrors = function (errors, validationMessages) {
        if (validationMessages === void 0) { validationMessages = {}; }
        if (isEmpty(errors)) {
            return null;
        }
        if (!isObject(validationMessages)) {
            validationMessages = {};
        }
        var addSpaces = (function (value) { return value[0].toUpperCase() + (value.slice(1) || '')
            .replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' '); });
        var formatError = (function (error) { return typeof error === 'object' ?
            Object.keys(error).map((function (key) {
                return error[key] === true ? addSpaces(key) :
                    error[key] === false ? 'Not ' + addSpaces(key) :
                        addSpaces(key) + ': ' + formatError(error[key]);
            })).join(', ') :
            addSpaces(error.toString()); });
        var messages = [];
        return Object.keys(errors)
            .filter((function (errorKey) { return errorKey !== 'required' || Object.keys(errors).length === 1; }))
            .map((function (errorKey) {
            return typeof validationMessages === 'string' ? validationMessages :
                typeof validationMessages[errorKey] === 'function' ?
                    validationMessages[errorKey](errors[errorKey]) :
                    typeof validationMessages[errorKey] === 'string' ?
                        !/{{.+?}}/.test(validationMessages[errorKey]) ?
                            validationMessages[errorKey] :
                            Object.keys(errors[errorKey])
                                .reduce((function (errorMessage, errorProperty) { return errorMessage.replace(new RegExp('{{' + errorProperty + '}}', 'g'), errors[errorKey][errorProperty]); }), validationMessages[errorKey]) :
                        addSpaces(errorKey) + ' Error: ' + formatError(errors[errorKey]);
        })).join('<br>');
    };
    JsonSchemaFormService.prototype.updateValue = function (ctx, value) {
        var e_2, _a;
        ctx.controlValue = value;
        if (ctx.boundControl) {
            ctx.formControl.setValue(value);
            ctx.formControl.markAsDirty();
        }
        ctx.layoutNode.value = value;
        if (isArray(ctx.options.copyValueTo)) {
            try {
                for (var _b = __values(ctx.options.copyValueTo), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    var targetControl = getControl(this.formGroup, item);
                    if (isObject(targetControl) && typeof targetControl.setValue === 'function') {
                        targetControl.setValue(value);
                        targetControl.markAsDirty();
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    };
    JsonSchemaFormService.prototype.updateArrayCheckboxList = function (ctx, checkboxList) {
        var e_3, _a;
        var formArray = ((this.getFormControl(ctx)));
        while (formArray.value.length) {
            formArray.removeAt(0);
        }
        var refPointer = removeRecursiveReferences(ctx.layoutNode.dataPointer + '/-', this.dataRecursiveRefMap, this.arrayMap);
        try {
            for (var checkboxList_1 = __values(checkboxList), checkboxList_1_1 = checkboxList_1.next(); !checkboxList_1_1.done; checkboxList_1_1 = checkboxList_1.next()) {
                var checkboxItem = checkboxList_1_1.value;
                if (checkboxItem.checked) {
                    var newFormControl = buildFormGroup(this.templateRefLibrary[refPointer]);
                    newFormControl.setValue(checkboxItem.value);
                    formArray.push(newFormControl);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (checkboxList_1_1 && !checkboxList_1_1.done && (_a = checkboxList_1.return)) _a.call(checkboxList_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        formArray.markAsDirty();
    };
    JsonSchemaFormService.prototype.getFormControl = function (ctx) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) ||
            ctx.layoutNode.type === '$ref') {
            return null;
        }
        return getControl(this.formGroup, this.getDataPointer(ctx));
    };
    JsonSchemaFormService.prototype.getFormControlValue = function (ctx) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) ||
            ctx.layoutNode.type === '$ref') {
            return null;
        }
        var control = getControl(this.formGroup, this.getDataPointer(ctx));
        return control ? control.value : null;
    };
    JsonSchemaFormService.prototype.getFormControlGroup = function (ctx) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer)) {
            return null;
        }
        return getControl(this.formGroup, this.getDataPointer(ctx), true);
    };
    JsonSchemaFormService.prototype.getFormControlName = function (ctx) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) || !hasValue(ctx.dataIndex)) {
            return null;
        }
        return JsonPointer.toKey(this.getDataPointer(ctx));
    };
    JsonSchemaFormService.prototype.getLayoutArray = function (ctx) {
        return JsonPointer.get(this.layout, this.getLayoutPointer(ctx), 0, -1);
    };
    JsonSchemaFormService.prototype.getParentNode = function (ctx) {
        return JsonPointer.get(this.layout, this.getLayoutPointer(ctx), 0, -2);
    };
    JsonSchemaFormService.prototype.getDataPointer = function (ctx) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) || !hasValue(ctx.dataIndex)) {
            return null;
        }
        return JsonPointer.toIndexedPointer(ctx.layoutNode.dataPointer, ctx.dataIndex, this.arrayMap);
    };
    JsonSchemaFormService.prototype.getLayoutPointer = function (ctx) {
        if (!hasValue(ctx.layoutIndex)) {
            return null;
        }
        return '/' + ctx.layoutIndex.join('/items/');
    };
    JsonSchemaFormService.prototype.isControlBound = function (ctx) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) || !hasValue(ctx.dataIndex)) {
            return false;
        }
        var controlGroup = this.getFormControlGroup(ctx);
        var name = this.getFormControlName(ctx);
        return controlGroup ? hasOwn(controlGroup.controls, name) : false;
    };
    JsonSchemaFormService.prototype.addItem = function (ctx, name) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.$ref) ||
            !hasValue(ctx.dataIndex) || !hasValue(ctx.layoutIndex)) {
            return false;
        }
        var newFormGroup = buildFormGroup(this.templateRefLibrary[ctx.layoutNode.$ref]);
        if (ctx.layoutNode.arrayItem) {
            (((this.getFormControlGroup(ctx)))).push(newFormGroup);
        }
        else {
            (((this.getFormControlGroup(ctx))))
                .addControl(name || this.getFormControlName(ctx), newFormGroup);
        }
        var newLayoutNode = getLayoutNode(ctx.layoutNode, this);
        newLayoutNode.arrayItem = ctx.layoutNode.arrayItem;
        if (ctx.layoutNode.arrayItemType) {
            newLayoutNode.arrayItemType = ctx.layoutNode.arrayItemType;
        }
        else {
            delete newLayoutNode.arrayItemType;
        }
        if (name) {
            newLayoutNode.name = name;
            newLayoutNode.dataPointer += '/' + JsonPointer.escape(name);
            newLayoutNode.options.title = fixTitle(name);
        }
        JsonPointer.insert(this.layout, this.getLayoutPointer(ctx), newLayoutNode);
        return true;
    };
    JsonSchemaFormService.prototype.moveArrayItem = function (ctx, oldIndex, newIndex) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) ||
            !hasValue(ctx.dataIndex) || !hasValue(ctx.layoutIndex) ||
            !isDefined(oldIndex) || !isDefined(newIndex) || oldIndex === newIndex) {
            return false;
        }
        var formArray = ((this.getFormControlGroup(ctx)));
        var arrayItem = formArray.at(oldIndex);
        formArray.removeAt(oldIndex);
        formArray.insert(newIndex, arrayItem);
        formArray.updateValueAndValidity();
        var layoutArray = this.getLayoutArray(ctx);
        layoutArray.splice(newIndex, 0, layoutArray.splice(oldIndex, 1)[0]);
        return true;
    };
    JsonSchemaFormService.prototype.removeItem = function (ctx) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) ||
            !hasValue(ctx.dataIndex) || !hasValue(ctx.layoutIndex)) {
            return false;
        }
        if (ctx.layoutNode.arrayItem) {
            (((this.getFormControlGroup(ctx))))
                .removeAt(ctx.dataIndex[ctx.dataIndex.length - 1]);
        }
        else {
            (((this.getFormControlGroup(ctx))))
                .removeControl(this.getFormControlName(ctx));
        }
        JsonPointer.remove(this.layout, this.getLayoutPointer(ctx));
        return true;
    };
    JsonSchemaFormService.decorators = [
        { type: Injectable }
    ];
    JsonSchemaFormService.ctorParameters = function () { return []; };
    return JsonSchemaFormService;
}());
if (false) {
    JsonSchemaFormService.prototype.JsonFormCompatibility;
    JsonSchemaFormService.prototype.ReactJsonSchemaFormCompatibility;
    JsonSchemaFormService.prototype.AngularSchemaFormCompatibility;
    JsonSchemaFormService.prototype.tpldata;
    JsonSchemaFormService.prototype.ajvOptions;
    JsonSchemaFormService.prototype.ajv;
    JsonSchemaFormService.prototype.validateFormData;
    JsonSchemaFormService.prototype.formValues;
    JsonSchemaFormService.prototype.data;
    JsonSchemaFormService.prototype.schema;
    JsonSchemaFormService.prototype.layout;
    JsonSchemaFormService.prototype.formGroupTemplate;
    JsonSchemaFormService.prototype.formGroup;
    JsonSchemaFormService.prototype.framework;
    JsonSchemaFormService.prototype.formOptions;
    JsonSchemaFormService.prototype.validData;
    JsonSchemaFormService.prototype.isValid;
    JsonSchemaFormService.prototype.ajvErrors;
    JsonSchemaFormService.prototype.validationErrors;
    JsonSchemaFormService.prototype.dataErrors;
    JsonSchemaFormService.prototype.formValueSubscription;
    JsonSchemaFormService.prototype.dataChanges;
    JsonSchemaFormService.prototype.isValidChanges;
    JsonSchemaFormService.prototype.validationErrorChanges;
    JsonSchemaFormService.prototype.arrayMap;
    JsonSchemaFormService.prototype.dataMap;
    JsonSchemaFormService.prototype.dataRecursiveRefMap;
    JsonSchemaFormService.prototype.schemaRecursiveRefMap;
    JsonSchemaFormService.prototype.schemaRefLibrary;
    JsonSchemaFormService.prototype.layoutRefLibrary;
    JsonSchemaFormService.prototype.templateRefLibrary;
    JsonSchemaFormService.prototype.hasRootReference;
    JsonSchemaFormService.prototype.language;
    JsonSchemaFormService.prototype.defaultFormOptions;
}

var OrderableDirective = (function () {
    function OrderableDirective(elementRef, jsf, ngZone) {
        this.elementRef = elementRef;
        this.jsf = jsf;
        this.ngZone = ngZone;
        this.overParentElement = false;
        this.overChildElement = false;
    }
    OrderableDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.orderable && this.layoutNode && this.layoutIndex && this.dataIndex) {
            this.element = this.elementRef.nativeElement;
            this.element.draggable = true;
            this.arrayLayoutIndex = 'move:' + this.layoutIndex.slice(0, -1).toString();
            this.ngZone.runOutsideAngular((function () {
                _this.element.addEventListener('dragstart', (function (event) {
                    event.dataTransfer.effectAllowed = 'move';
                    var sourceArrayIndex = _this.dataIndex[_this.dataIndex.length - 1];
                    sessionStorage.setItem(_this.arrayLayoutIndex, sourceArrayIndex + '');
                }));
                _this.element.addEventListener('dragover', (function (event) {
                    if (event.preventDefault) {
                        event.preventDefault();
                    }
                    event.dataTransfer.dropEffect = 'move';
                    return false;
                }));
                _this.element.addEventListener('dragenter', (function (event) {
                    if (_this.overParentElement) {
                        return _this.overChildElement = true;
                    }
                    else {
                        _this.overParentElement = true;
                    }
                    var sourceArrayIndex = sessionStorage.getItem(_this.arrayLayoutIndex);
                    if (sourceArrayIndex !== null) {
                        if (_this.dataIndex[_this.dataIndex.length - 1] < +sourceArrayIndex) {
                            _this.element.classList.add('drag-target-top');
                        }
                        else if (_this.dataIndex[_this.dataIndex.length - 1] > +sourceArrayIndex) {
                            _this.element.classList.add('drag-target-bottom');
                        }
                    }
                }));
                _this.element.addEventListener('dragleave', (function (event) {
                    if (_this.overChildElement) {
                        _this.overChildElement = false;
                    }
                    else if (_this.overParentElement) {
                        _this.overParentElement = false;
                    }
                    var sourceArrayIndex = sessionStorage.getItem(_this.arrayLayoutIndex);
                    if (!_this.overParentElement && !_this.overChildElement && sourceArrayIndex !== null) {
                        _this.element.classList.remove('drag-target-top');
                        _this.element.classList.remove('drag-target-bottom');
                    }
                }));
                _this.element.addEventListener('drop', (function (event) {
                    _this.element.classList.remove('drag-target-top');
                    _this.element.classList.remove('drag-target-bottom');
                    var sourceArrayIndex = sessionStorage.getItem(_this.arrayLayoutIndex);
                    var destArrayIndex = _this.dataIndex[_this.dataIndex.length - 1];
                    if (sourceArrayIndex !== null && +sourceArrayIndex !== destArrayIndex) {
                        _this.jsf.moveArrayItem(_this, +sourceArrayIndex, destArrayIndex);
                    }
                    sessionStorage.removeItem(_this.arrayLayoutIndex);
                    return false;
                }));
            }));
        }
    };
    OrderableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[orderable]',
                },] }
    ];
    OrderableDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: JsonSchemaFormService },
        { type: NgZone }
    ]; };
    OrderableDirective.propDecorators = {
        orderable: [{ type: Input }],
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return OrderableDirective;
}());
if (false) {
    OrderableDirective.prototype.arrayLayoutIndex;
    OrderableDirective.prototype.element;
    OrderableDirective.prototype.overParentElement;
    OrderableDirective.prototype.overChildElement;
    OrderableDirective.prototype.orderable;
    OrderableDirective.prototype.layoutNode;
    OrderableDirective.prototype.layoutIndex;
    OrderableDirective.prototype.dataIndex;
    OrderableDirective.prototype.elementRef;
    OrderableDirective.prototype.jsf;
    OrderableDirective.prototype.ngZone;
}

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
var __values$1 = (this && this.__values) || function(o) {
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
function buildTitleMap(titleMap, enumList, fieldRequired, flatList) {
    var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
    if (fieldRequired === void 0) { fieldRequired = true; }
    if (flatList === void 0) { flatList = true; }
    var newTitleMap = [];
    var hasEmptyValue = false;
    if (titleMap) {
        if (isArray(titleMap)) {
            if (enumList) {
                try {
                    for (var _e = __values$1(Object.keys(titleMap)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var i = _f.value;
                        if (isObject(titleMap[i])) {
                            var value = titleMap[i].value;
                            if (enumList.includes(value)) {
                                var name_1 = titleMap[i].name;
                                newTitleMap.push({ name: name_1, value: value });
                                if (value === undefined || value === null) {
                                    hasEmptyValue = true;
                                }
                            }
                        }
                        else if (isString(titleMap[i])) {
                            if (i < enumList.length) {
                                var name_2 = titleMap[i];
                                var value = enumList[i];
                                newTitleMap.push({ name: name_2, value: value });
                                if (value === undefined || value === null) {
                                    hasEmptyValue = true;
                                }
                            }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else {
                newTitleMap = titleMap;
                if (!fieldRequired) {
                    hasEmptyValue = !!newTitleMap
                        .filter((function (i) { return i.value === undefined || i.value === null; }))
                        .length;
                }
            }
        }
        else if (enumList) {
            try {
                for (var _g = __values$1(Object.keys(enumList)), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var i = _h.value;
                    var value = enumList[i];
                    if (hasOwn(titleMap, value)) {
                        var name_3 = titleMap[value];
                        newTitleMap.push({ name: name_3, value: value });
                        if (value === undefined || value === null) {
                            hasEmptyValue = true;
                        }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        else {
            try {
                for (var _j = __values$1(Object.keys(titleMap)), _k = _j.next(); !_k.done; _k = _j.next()) {
                    var value = _k.value;
                    var name_4 = titleMap[value];
                    newTitleMap.push({ name: name_4, value: value });
                    if (value === undefined || value === null) {
                        hasEmptyValue = true;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
    }
    else if (enumList) {
        try {
            for (var _l = __values$1(Object.keys(enumList)), _m = _l.next(); !_m.done; _m = _l.next()) {
                var i = _m.value;
                var name_5 = enumList[i];
                var value = enumList[i];
                newTitleMap.push({ name: name_5, value: value });
                if (value === undefined || value === null) {
                    hasEmptyValue = true;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
            }
            finally { if (e_4) throw e_4.error; }
        }
    }
    else {
        newTitleMap = [{ name: 'True', value: true }, { name: 'False', value: false }];
    }
    if (newTitleMap.some((function (title) { return hasOwn(title, 'group'); }))) {
        hasEmptyValue = false;
        if (flatList) {
            newTitleMap = newTitleMap.reduce((function (groupTitleMap, title) {
                if (hasOwn(title, 'group')) {
                    if (isArray(title.items)) {
                        groupTitleMap = __spread(groupTitleMap, title.items.map((function (item) {
                            return (__assign(__assign({}, item), { name: title.group + ": " + item.name }));
                        })));
                        if (title.items.some((function (item) { return item.value === undefined || item.value === null; }))) {
                            hasEmptyValue = true;
                        }
                    }
                    if (hasOwn(title, 'name') && hasOwn(title, 'value')) {
                        title.name = title.group + ": " + title.name;
                        delete title.group;
                        groupTitleMap.push(title);
                        if (title.value === undefined || title.value === null) {
                            hasEmptyValue = true;
                        }
                    }
                }
                else {
                    groupTitleMap.push(title);
                    if (title.value === undefined || title.value === null) {
                        hasEmptyValue = true;
                    }
                }
                return groupTitleMap;
            }), []);
        }
        else {
            newTitleMap = newTitleMap.reduce((function (groupTitleMap, title) {
                if (hasOwn(title, 'group')) {
                    if (title.group !== (groupTitleMap[groupTitleMap.length - 1] || {}).group) {
                        groupTitleMap.push({ group: title.group, items: title.items || [] });
                    }
                    if (hasOwn(title, 'name') && hasOwn(title, 'value')) {
                        groupTitleMap[groupTitleMap.length - 1].items
                            .push({ name: title.name, value: title.value });
                        if (title.value === undefined || title.value === null) {
                            hasEmptyValue = true;
                        }
                    }
                }
                else {
                    groupTitleMap.push(title);
                    if (title.value === undefined || title.value === null) {
                        hasEmptyValue = true;
                    }
                }
                return groupTitleMap;
            }), []);
        }
    }
    if (!fieldRequired && !hasEmptyValue) {
        newTitleMap.unshift({ name: '<em>None</em>', value: null });
    }
    return newTitleMap;
}

function TitleMapItem() { }
if (false) {
    TitleMapItem.prototype.name;
    TitleMapItem.prototype.value;
    TitleMapItem.prototype.checked;
    TitleMapItem.prototype.group;
    TitleMapItem.prototype.items;
}

function ErrorMessages() { }

var AddReferenceComponent = (function () {
    function AddReferenceComponent(jsf) {
        this.jsf = jsf;
    }
    Object.defineProperty(AddReferenceComponent.prototype, "showAddButton", {
        get: function () {
            return !this.layoutNode.arrayItem ||
                this.layoutIndex[this.layoutIndex.length - 1] < this.options.maxItems;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddReferenceComponent.prototype, "buttonText", {
        get: function () {
            var parent = {
                dataIndex: this.dataIndex.slice(0, -1),
                layoutIndex: this.layoutIndex.slice(0, -1),
                layoutNode: this.jsf.getParentNode(this)
            };
            return parent.layoutNode.add ||
                this.jsf.setArrayItemTitle(parent, this.layoutNode, this.itemCount);
        },
        enumerable: true,
        configurable: true
    });
    AddReferenceComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
    };
    AddReferenceComponent.prototype.addItem = function (event) {
        event.preventDefault();
        this.jsf.addItem(this);
    };
    AddReferenceComponent.decorators = [
        { type: Component, args: [{
                    selector: 'add-reference-widget',
                    template: "\n      <button *ngIf=\"showAddButton\"\n              [class]=\"options?.fieldHtmlClass || ''\"\n              [disabled]=\"options?.readonly\"\n              (click)=\"addItem($event)\">\n          <span *ngIf=\"options?.icon\" [class]=\"options?.icon\"></span>\n          <span *ngIf=\"options?.title\" [innerHTML]=\"buttonText\"></span>\n      </button>",
                    changeDetection: ChangeDetectionStrategy.Default
                }] }
    ];
    AddReferenceComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    AddReferenceComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return AddReferenceComponent;
}());
if (false) {
    AddReferenceComponent.prototype.options;
    AddReferenceComponent.prototype.itemCount;
    AddReferenceComponent.prototype.previousLayoutIndex;
    AddReferenceComponent.prototype.previousDataIndex;
    AddReferenceComponent.prototype.layoutNode;
    AddReferenceComponent.prototype.layoutIndex;
    AddReferenceComponent.prototype.dataIndex;
    AddReferenceComponent.prototype.jsf;
}

var OneOfComponent = (function () {
    function OneOfComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    OneOfComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    };
    OneOfComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    OneOfComponent.decorators = [
        { type: Component, args: [{
                    selector: 'one-of-widget',
                    template: ""
                }] }
    ];
    OneOfComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    OneOfComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return OneOfComponent;
}());
if (false) {
    OneOfComponent.prototype.formControl;
    OneOfComponent.prototype.controlName;
    OneOfComponent.prototype.controlValue;
    OneOfComponent.prototype.controlDisabled;
    OneOfComponent.prototype.boundControl;
    OneOfComponent.prototype.options;
    OneOfComponent.prototype.layoutNode;
    OneOfComponent.prototype.layoutIndex;
    OneOfComponent.prototype.dataIndex;
    OneOfComponent.prototype.jsf;
}

var ButtonComponent = (function () {
    function ButtonComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    ButtonComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    };
    ButtonComponent.prototype.updateValue = function (event) {
        if (typeof this.options.onClick === 'function') {
            this.options.onClick(event);
        }
        else {
            this.jsf.updateValue(this, event.target.value);
        }
    };
    ButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'button-widget',
                    template: "\n      <div\n              [class]=\"options?.htmlClass || ''\">\n          <button\n                  [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n                  [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                  [class]=\"options?.fieldHtmlClass || ''\"\n                  [disabled]=\"controlDisabled\"\n                  [name]=\"controlName\"\n                  [type]=\"layoutNode?.type\"\n                  [value]=\"controlValue\"\n                  (click)=\"updateValue($event)\">\n        <span *ngIf=\"options?.icon || options?.title\"\n              [class]=\"options?.icon\"\n              [innerHTML]=\"options?.title\"></span>\n          </button>\n      </div>"
                }] }
    ];
    ButtonComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    ButtonComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return ButtonComponent;
}());
if (false) {
    ButtonComponent.prototype.formControl;
    ButtonComponent.prototype.controlName;
    ButtonComponent.prototype.controlValue;
    ButtonComponent.prototype.controlDisabled;
    ButtonComponent.prototype.boundControl;
    ButtonComponent.prototype.options;
    ButtonComponent.prototype.layoutNode;
    ButtonComponent.prototype.layoutIndex;
    ButtonComponent.prototype.dataIndex;
    ButtonComponent.prototype.jsf;
}

var CheckboxComponent = (function () {
    function CheckboxComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.trueValue = true;
        this.falseValue = false;
    }
    Object.defineProperty(CheckboxComponent.prototype, "isChecked", {
        get: function () {
            return this.jsf.getFormControlValue(this) === this.trueValue;
        },
        enumerable: true,
        configurable: true
    });
    CheckboxComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (this.controlValue === null || this.controlValue === undefined) {
            this.controlValue = this.options.title;
        }
    };
    CheckboxComponent.prototype.updateValue = function (event) {
        event.preventDefault();
        this.jsf.updateValue(this, event.target.checked ? this.trueValue : this.falseValue);
    };
    CheckboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'checkbox-widget',
                    template: "\n      <label\n              [attr.for]=\"'control' + layoutNode?._id\"\n              [class]=\"options?.itemLabelHtmlClass || ''\">\n          <input *ngIf=\"boundControl\"\n                 [formControl]=\"formControl\"\n                 [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                 [class]=\"(options?.fieldHtmlClass || '') + (isChecked ?\n          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :\n          (' ' + (options?.style?.unselected || '')))\"\n                 [id]=\"'control' + layoutNode?._id\"\n                 [name]=\"controlName\"\n                 [readonly]=\"options?.readonly ? 'readonly' : null\"\n                 type=\"checkbox\">\n          <input *ngIf=\"!boundControl\"\n                 [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                 [checked]=\"isChecked ? 'checked' : null\"\n                 [class]=\"(options?.fieldHtmlClass || '') + (isChecked ?\n          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :\n          (' ' + (options?.style?.unselected || '')))\"\n                 [disabled]=\"controlDisabled\"\n                 [id]=\"'control' + layoutNode?._id\"\n                 [name]=\"controlName\"\n                 [readonly]=\"options?.readonly ? 'readonly' : null\"\n                 [value]=\"controlValue\"\n                 type=\"checkbox\"\n                 (change)=\"updateValue($event)\">\n          <span *ngIf=\"options?.title\"\n                [style.display]=\"options?.notitle ? 'none' : ''\"\n                [innerHTML]=\"options?.title\"></span>\n      </label>"
                }] }
    ];
    CheckboxComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    CheckboxComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return CheckboxComponent;
}());
if (false) {
    CheckboxComponent.prototype.formControl;
    CheckboxComponent.prototype.controlName;
    CheckboxComponent.prototype.controlValue;
    CheckboxComponent.prototype.controlDisabled;
    CheckboxComponent.prototype.boundControl;
    CheckboxComponent.prototype.options;
    CheckboxComponent.prototype.trueValue;
    CheckboxComponent.prototype.falseValue;
    CheckboxComponent.prototype.layoutNode;
    CheckboxComponent.prototype.layoutIndex;
    CheckboxComponent.prototype.dataIndex;
    CheckboxComponent.prototype.jsf;
}

var __values$2 = (this && this.__values) || function(o) {
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
var CheckboxesComponent = (function () {
    function CheckboxesComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.checkboxList = [];
    }
    CheckboxesComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.layoutOrientation = (this.layoutNode.type === 'checkboxes-inline' ||
            this.layoutNode.type === 'checkboxbuttons') ? 'horizontal' : 'vertical';
        this.jsf.initializeControl(this);
        this.checkboxList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
        if (this.boundControl) {
            var formArray_1 = this.jsf.getFormControl(this);
            this.checkboxList.forEach((function (checkboxItem) {
                return checkboxItem.checked = formArray_1.value.includes(checkboxItem.value);
            }));
        }
    };
    CheckboxesComponent.prototype.updateValue = function (event) {
        var e_1, _a;
        try {
            for (var _b = __values$2(this.checkboxList), _c = _b.next(); !_c.done; _c = _b.next()) {
                var checkboxItem = _c.value;
                if (event.target.value === checkboxItem.value) {
                    checkboxItem.checked = event.target.checked;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (this.boundControl) {
            this.jsf.updateArrayCheckboxList(this, this.checkboxList);
        }
    };
    CheckboxesComponent.decorators = [
        { type: Component, args: [{
                    selector: 'checkboxes-widget',
                    template: "\n      <label *ngIf=\"options?.title\"\n             [class]=\"options?.labelHtmlClass || ''\"\n             [style.display]=\"options?.notitle ? 'none' : ''\"\n             [innerHTML]=\"options?.title\"></label>\n\n      <!-- 'horizontal' = checkboxes-inline or checkboxbuttons -->\n      <div *ngIf=\"layoutOrientation === 'horizontal'\" [class]=\"options?.htmlClass || ''\">\n          <label *ngFor=\"let checkboxItem of checkboxList\"\n                 [attr.for]=\"'control' + layoutNode?._id + '/' + checkboxItem.value\"\n                 [class]=\"(options?.itemLabelHtmlClass || '') + (checkboxItem.checked ?\n          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :\n          (' ' + (options?.style?.unselected || '')))\">\n              <input type=\"checkbox\"\n                     [attr.required]=\"options?.required\"\n                     [checked]=\"checkboxItem.checked\"\n                     [class]=\"options?.fieldHtmlClass || ''\"\n                     [disabled]=\"controlDisabled\"\n                     [id]=\"'control' + layoutNode?._id + '/' + checkboxItem.value\"\n                     [name]=\"checkboxItem?.name\"\n                     [readonly]=\"options?.readonly ? 'readonly' : null\"\n                     [value]=\"checkboxItem.value\"\n                     (change)=\"updateValue($event)\">\n              <span [innerHTML]=\"checkboxItem.name\"></span>\n          </label>\n      </div>\n\n      <!-- 'vertical' = regular checkboxes -->\n      <div *ngIf=\"layoutOrientation === 'vertical'\">\n          <div *ngFor=\"let checkboxItem of checkboxList\" [class]=\"options?.htmlClass || ''\">\n              <label\n                      [attr.for]=\"'control' + layoutNode?._id + '/' + checkboxItem.value\"\n                      [class]=\"(options?.itemLabelHtmlClass || '') + (checkboxItem.checked ?\n            (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :\n            (' ' + (options?.style?.unselected || '')))\">\n                  <input type=\"checkbox\"\n                         [attr.required]=\"options?.required\"\n                         [checked]=\"checkboxItem.checked\"\n                         [class]=\"options?.fieldHtmlClass || ''\"\n                         [disabled]=\"controlDisabled\"\n                         [id]=\"options?.name + '/' + checkboxItem.value\"\n                         [name]=\"checkboxItem?.name\"\n                         [readonly]=\"options?.readonly ? 'readonly' : null\"\n                         [value]=\"checkboxItem.value\"\n                         (change)=\"updateValue($event)\">\n                  <span [innerHTML]=\"checkboxItem?.name\"></span>\n              </label>\n          </div>\n      </div>"
                }] }
    ];
    CheckboxesComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    CheckboxesComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return CheckboxesComponent;
}());
if (false) {
    CheckboxesComponent.prototype.formControl;
    CheckboxesComponent.prototype.controlName;
    CheckboxesComponent.prototype.controlValue;
    CheckboxesComponent.prototype.controlDisabled;
    CheckboxesComponent.prototype.boundControl;
    CheckboxesComponent.prototype.options;
    CheckboxesComponent.prototype.layoutOrientation;
    CheckboxesComponent.prototype.formArray;
    CheckboxesComponent.prototype.checkboxList;
    CheckboxesComponent.prototype.layoutNode;
    CheckboxesComponent.prototype.layoutIndex;
    CheckboxesComponent.prototype.dataIndex;
    CheckboxesComponent.prototype.jsf;
}

var FileComponent = (function () {
    function FileComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    FileComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    };
    FileComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    FileComponent.decorators = [
        { type: Component, args: [{
                    selector: 'file-widget',
                    template: ""
                }] }
    ];
    FileComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    FileComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return FileComponent;
}());
if (false) {
    FileComponent.prototype.formControl;
    FileComponent.prototype.controlName;
    FileComponent.prototype.controlValue;
    FileComponent.prototype.controlDisabled;
    FileComponent.prototype.boundControl;
    FileComponent.prototype.options;
    FileComponent.prototype.layoutNode;
    FileComponent.prototype.layoutIndex;
    FileComponent.prototype.dataIndex;
    FileComponent.prototype.jsf;
}

var InputComponent = (function () {
    function InputComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.autoCompleteList = [];
    }
    InputComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    };
    InputComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    InputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'input-widget',
                    template: "\n    <div [class]=\"options?.htmlClass || ''\">\n      <label *ngIf=\"options?.title\"\n        [attr.for]=\"'control' + layoutNode?._id\"\n        [class]=\"options?.labelHtmlClass || ''\"\n        [style.display]=\"options?.notitle ? 'none' : ''\"\n        [innerHTML]=\"options?.title\"></label>\n      <input *ngIf=\"boundControl\"\n        [formControl]=\"formControl\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.list]=\"'control' + layoutNode?._id + 'Autocomplete'\"\n        [attr.maxlength]=\"options?.maxLength\"\n        [attr.minlength]=\"options?.minLength\"\n        [attr.pattern]=\"options?.pattern\"\n        [attr.placeholder]=\"options?.placeholder\"\n        [attr.required]=\"options?.required\"\n        [class]=\"options?.fieldHtmlClass || ''\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        [readonly]=\"options?.readonly ? 'readonly' : null\"\n        [type]=\"layoutNode?.type\">\n      <input *ngIf=\"!boundControl\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.list]=\"'control' + layoutNode?._id + 'Autocomplete'\"\n        [attr.maxlength]=\"options?.maxLength\"\n        [attr.minlength]=\"options?.minLength\"\n        [attr.pattern]=\"options?.pattern\"\n        [attr.placeholder]=\"options?.placeholder\"\n        [attr.required]=\"options?.required\"\n        [class]=\"options?.fieldHtmlClass || ''\"\n        [disabled]=\"controlDisabled\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        [readonly]=\"options?.readonly ? 'readonly' : null\"\n        [type]=\"layoutNode?.type\"\n        [value]=\"controlValue\"\n        (input)=\"updateValue($event)\">\n        <datalist *ngIf=\"options?.typeahead?.source\"\n          [id]=\"'control' + layoutNode?._id + 'Autocomplete'\">\n          <option *ngFor=\"let word of options?.typeahead?.source\" [value]=\"word\">\n        </datalist>\n    </div>"
                }] }
    ];
    InputComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    InputComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return InputComponent;
}());
if (false) {
    InputComponent.prototype.formControl;
    InputComponent.prototype.controlName;
    InputComponent.prototype.controlValue;
    InputComponent.prototype.controlDisabled;
    InputComponent.prototype.boundControl;
    InputComponent.prototype.options;
    InputComponent.prototype.autoCompleteList;
    InputComponent.prototype.layoutNode;
    InputComponent.prototype.layoutIndex;
    InputComponent.prototype.dataIndex;
    InputComponent.prototype.jsf;
}

var MessageComponent = (function () {
    function MessageComponent(jsf) {
        this.jsf = jsf;
        this.message = null;
    }
    MessageComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.message = this.options.help || this.options.helpvalue ||
            this.options.msg || this.options.message;
    };
    MessageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'message-widget',
                    template: "\n    <span *ngIf=\"message\"\n      [class]=\"options?.labelHtmlClass || ''\"\n      [innerHTML]=\"message\"></span>"
                }] }
    ];
    MessageComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    MessageComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return MessageComponent;
}());
if (false) {
    MessageComponent.prototype.options;
    MessageComponent.prototype.message;
    MessageComponent.prototype.layoutNode;
    MessageComponent.prototype.layoutIndex;
    MessageComponent.prototype.dataIndex;
    MessageComponent.prototype.jsf;
}

var NoneComponent = (function () {
    function NoneComponent() {
    }
    NoneComponent.decorators = [
        { type: Component, args: [{
                    selector: 'none-widget',
                    template: ""
                }] }
    ];
    NoneComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return NoneComponent;
}());
if (false) {
    NoneComponent.prototype.layoutNode;
    NoneComponent.prototype.layoutIndex;
    NoneComponent.prototype.dataIndex;
}

var NumberComponent = (function () {
    function NumberComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.allowNegative = true;
        this.allowDecimal = true;
        this.allowExponents = false;
        this.lastValidNumber = '';
    }
    NumberComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (this.layoutNode.dataType === 'integer') {
            this.allowDecimal = false;
        }
    };
    NumberComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    NumberComponent.decorators = [
        { type: Component, args: [{
                    selector: 'number-widget',
                    template: "\n      <div [class]=\"options?.htmlClass || ''\">\n          <label *ngIf=\"options?.title\"\n                 [attr.for]=\"'control' + layoutNode?._id\"\n                 [class]=\"options?.labelHtmlClass || ''\"\n                 [style.display]=\"options?.notitle ? 'none' : ''\"\n                 [innerHTML]=\"options?.title\"></label>\n          <input *ngIf=\"boundControl\"\n                 [formControl]=\"formControl\"\n                 [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                 [attr.max]=\"options?.maximum\"\n                 [attr.min]=\"options?.minimum\"\n                 [attr.placeholder]=\"options?.placeholder\"\n                 [attr.required]=\"options?.required\"\n                 [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n                 [attr.step]=\"options?.multipleOf || options?.step || 'any'\"\n                 [class]=\"options?.fieldHtmlClass || ''\"\n                 [id]=\"'control' + layoutNode?._id\"\n                 [name]=\"controlName\"\n                 [readonly]=\"options?.readonly ? 'readonly' : null\"\n                 [title]=\"lastValidNumber\"\n                 [type]=\"layoutNode?.type === 'range' ? 'range' : 'number'\">\n          <input *ngIf=\"!boundControl\"\n                 [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                 [attr.max]=\"options?.maximum\"\n                 [attr.min]=\"options?.minimum\"\n                 [attr.placeholder]=\"options?.placeholder\"\n                 [attr.required]=\"options?.required\"\n                 [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n                 [attr.step]=\"options?.multipleOf || options?.step || 'any'\"\n                 [class]=\"options?.fieldHtmlClass || ''\"\n                 [disabled]=\"controlDisabled\"\n                 [id]=\"'control' + layoutNode?._id\"\n                 [name]=\"controlName\"\n                 [readonly]=\"options?.readonly ? 'readonly' : null\"\n                 [title]=\"lastValidNumber\"\n                 [type]=\"layoutNode?.type === 'range' ? 'range' : 'number'\"\n                 [value]=\"controlValue\"\n                 (input)=\"updateValue($event)\">\n          <span *ngIf=\"layoutNode?.type === 'range'\" [innerHTML]=\"controlValue\"></span>\n      </div>"
                }] }
    ];
    NumberComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    NumberComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return NumberComponent;
}());
if (false) {
    NumberComponent.prototype.formControl;
    NumberComponent.prototype.controlName;
    NumberComponent.prototype.controlValue;
    NumberComponent.prototype.controlDisabled;
    NumberComponent.prototype.boundControl;
    NumberComponent.prototype.options;
    NumberComponent.prototype.allowNegative;
    NumberComponent.prototype.allowDecimal;
    NumberComponent.prototype.allowExponents;
    NumberComponent.prototype.lastValidNumber;
    NumberComponent.prototype.layoutNode;
    NumberComponent.prototype.layoutIndex;
    NumberComponent.prototype.dataIndex;
    NumberComponent.prototype.jsf;
}

var RadiosComponent = (function () {
    function RadiosComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.layoutOrientation = 'vertical';
        this.radiosList = [];
    }
    RadiosComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        if (this.layoutNode.type === 'radios-inline' ||
            this.layoutNode.type === 'radiobuttons') {
            this.layoutOrientation = 'horizontal';
        }
        this.radiosList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
        this.jsf.initializeControl(this);
    };
    RadiosComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    RadiosComponent.decorators = [
        { type: Component, args: [{
                    selector: 'radios-widget',
                    template: "\n    <label *ngIf=\"options?.title\"\n      [attr.for]=\"'control' + layoutNode?._id\"\n      [class]=\"options?.labelHtmlClass || ''\"\n      [style.display]=\"options?.notitle ? 'none' : ''\"\n      [innerHTML]=\"options?.title\"></label>\n\n    <!-- 'horizontal' = radios-inline or radiobuttons -->\n    <div *ngIf=\"layoutOrientation === 'horizontal'\"\n      [class]=\"options?.htmlClass || ''\">\n      <label *ngFor=\"let radioItem of radiosList\"\n        [attr.for]=\"'control' + layoutNode?._id + '/' + radioItem?.value\"\n        [class]=\"(options?.itemLabelHtmlClass || '') +\n          ((controlValue + '' === radioItem?.value + '') ?\n          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :\n          (' ' + (options?.style?.unselected || '')))\">\n        <input type=\"radio\"\n          [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n          [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n          [attr.required]=\"options?.required\"\n          [checked]=\"radioItem?.value === controlValue\"\n          [class]=\"options?.fieldHtmlClass || ''\"\n          [disabled]=\"controlDisabled\"\n          [id]=\"'control' + layoutNode?._id + '/' + radioItem?.value\"\n          [name]=\"controlName\"\n          [value]=\"radioItem?.value\"\n          (change)=\"updateValue($event)\">\n        <span [innerHTML]=\"radioItem?.name\"></span>\n      </label>\n    </div>\n\n    <!-- 'vertical' = regular radios -->\n    <div *ngIf=\"layoutOrientation !== 'horizontal'\">\n      <div *ngFor=\"let radioItem of radiosList\"\n        [class]=\"options?.htmlClass || ''\">\n        <label\n          [attr.for]=\"'control' + layoutNode?._id + '/' + radioItem?.value\"\n          [class]=\"(options?.itemLabelHtmlClass || '') +\n            ((controlValue + '' === radioItem?.value + '') ?\n            (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :\n            (' ' + (options?.style?.unselected || '')))\">\n          <input type=\"radio\"\n            [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n            [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n            [attr.required]=\"options?.required\"\n            [checked]=\"radioItem?.value === controlValue\"\n            [class]=\"options?.fieldHtmlClass || ''\"\n            [disabled]=\"controlDisabled\"\n            [id]=\"'control' + layoutNode?._id + '/' + radioItem?.value\"\n            [name]=\"controlName\"\n            [value]=\"radioItem?.value\"\n            (change)=\"updateValue($event)\">\n          <span [innerHTML]=\"radioItem?.name\"></span>\n        </label>\n      </div>\n    </div>"
                }] }
    ];
    RadiosComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    RadiosComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return RadiosComponent;
}());
if (false) {
    RadiosComponent.prototype.formControl;
    RadiosComponent.prototype.controlName;
    RadiosComponent.prototype.controlValue;
    RadiosComponent.prototype.controlDisabled;
    RadiosComponent.prototype.boundControl;
    RadiosComponent.prototype.options;
    RadiosComponent.prototype.layoutOrientation;
    RadiosComponent.prototype.radiosList;
    RadiosComponent.prototype.layoutNode;
    RadiosComponent.prototype.layoutIndex;
    RadiosComponent.prototype.dataIndex;
    RadiosComponent.prototype.jsf;
}

var RootComponent = (function () {
    function RootComponent(jsf) {
        this.jsf = jsf;
        this.isFlexItem = false;
    }
    RootComponent.prototype.isDraggable = function (node) {
        return node.arrayItem && node.type !== '$ref' &&
            node.arrayItemType === 'list' && this.isOrderable !== false;
    };
    RootComponent.prototype.getFlexAttribute = function (node, attribute) {
        var index = ['flex-grow', 'flex-shrink', 'flex-basis'].indexOf(attribute);
        return ((node.options || {}).flex || '').split(/\s+/)[index] ||
            (node.options || {})[attribute] || ['1', '1', 'auto'][index];
    };
    RootComponent.prototype.showWidget = function (layoutNode) {
        return this.jsf.evaluateCondition(layoutNode, this.dataIndex);
    };
    RootComponent.decorators = [
        { type: Component, args: [{
                    selector: 'root-widget',
                    template: "\n    <div *ngFor=\"let layoutItem of layout; let i = index\"\n      [class.form-flex-item]=\"isFlexItem\"\n      [style.align-self]=\"(layoutItem.options || {})['align-self']\"\n      [style.flex-basis]=\"getFlexAttribute(layoutItem, 'flex-basis')\"\n      [style.flex-grow]=\"getFlexAttribute(layoutItem, 'flex-grow')\"\n      [style.flex-shrink]=\"getFlexAttribute(layoutItem, 'flex-shrink')\"\n      [style.order]=\"(layoutItem.options || {}).order\">\n      <div\n        [dataIndex]=\"layoutItem?.arrayItem ? (dataIndex || []).concat(i) : (dataIndex || [])\"\n        [layoutIndex]=\"(layoutIndex || []).concat(i)\"\n        [layoutNode]=\"layoutItem\"\n        [orderable]=\"isDraggable(layoutItem)\">\n        <select-framework-widget *ngIf=\"showWidget(layoutItem)\"\n          [dataIndex]=\"layoutItem?.arrayItem ? (dataIndex || []).concat(i) : (dataIndex || [])\"\n          [layoutIndex]=\"(layoutIndex || []).concat(i)\"\n          [layoutNode]=\"layoutItem\"></select-framework-widget>\n      </div>\n    </div>",
                    styles: ["\n    [draggable=true] {\n      transition: all 150ms cubic-bezier(.4, 0, .2, 1);\n    }\n    [draggable=true]:hover {\n      cursor: move;\n      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);\n      position: relative; z-index: 10;\n      margin-top: -1px;\n      margin-left: -1px;\n      margin-right: 1px;\n      margin-bottom: 1px;\n    }\n    [draggable=true].drag-target-top {\n      box-shadow: 0 -2px 0 #000;\n      position: relative; z-index: 20;\n    }\n    [draggable=true].drag-target-bottom {\n      box-shadow: 0 2px 0 #000;\n      position: relative; z-index: 20;\n    }\n  "]
                }] }
    ];
    RootComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    RootComponent.propDecorators = {
        dataIndex: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        layout: [{ type: Input }],
        isOrderable: [{ type: Input }],
        isFlexItem: [{ type: Input }]
    };
    return RootComponent;
}());
if (false) {
    RootComponent.prototype.options;
    RootComponent.prototype.dataIndex;
    RootComponent.prototype.layoutIndex;
    RootComponent.prototype.layout;
    RootComponent.prototype.isOrderable;
    RootComponent.prototype.isFlexItem;
    RootComponent.prototype.jsf;
}

var SectionComponent = (function () {
    function SectionComponent(jsf) {
        this.jsf = jsf;
        this.expanded = true;
    }
    Object.defineProperty(SectionComponent.prototype, "sectionTitle", {
        get: function () {
            return this.options.notitle ? null : this.jsf.setItemTitle(this);
        },
        enumerable: true,
        configurable: true
    });
    SectionComponent.prototype.ngOnInit = function () {
        this.jsf.initializeControl(this);
        this.options = this.layoutNode.options || {};
        this.expanded = typeof this.options.expanded === 'boolean' ?
            this.options.expanded : !this.options.expandable;
        switch (this.layoutNode.type) {
            case 'fieldset':
            case 'array':
            case 'tab':
            case 'advancedfieldset':
            case 'authfieldset':
            case 'optionfieldset':
            case 'selectfieldset':
                this.containerType = 'fieldset';
                break;
            default:
                this.containerType = 'div';
                break;
        }
    };
    SectionComponent.prototype.toggleExpanded = function () {
        if (this.options.expandable) {
            this.expanded = !this.expanded;
        }
    };
    SectionComponent.prototype.getFlexAttribute = function (attribute) {
        var flexActive = this.layoutNode.type === 'flex' ||
            !!this.options.displayFlex ||
            this.options.display === 'flex';
        if (attribute !== 'flex' && !flexActive) {
            return null;
        }
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
        }
    };
    SectionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'section-widget',
                    template: "\n      <div *ngIf=\"containerType === 'div'\"\n           [class]=\"options?.htmlClass || ''\"\n           [class.expandable]=\"options?.expandable && !expanded\"\n           [class.expanded]=\"options?.expandable && expanded\">\n          <label *ngIf=\"sectionTitle\"\n                 class=\"legend\"\n                 [class]=\"options?.labelHtmlClass || ''\"\n                 [innerHTML]=\"sectionTitle\"\n                 (click)=\"toggleExpanded()\"></label>\n          <root-widget *ngIf=\"expanded\"\n                       [dataIndex]=\"dataIndex\"\n                       [layout]=\"layoutNode.items\"\n                       [layoutIndex]=\"layoutIndex\"\n                       [isFlexItem]=\"getFlexAttribute('is-flex')\"\n                       [isOrderable]=\"options?.orderable\"\n                       [class.form-flex-column]=\"getFlexAttribute('flex-direction') === 'column'\"\n                       [class.form-flex-row]=\"getFlexAttribute('flex-direction') === 'row'\"\n                       [style.align-content]=\"getFlexAttribute('align-content')\"\n                       [style.align-items]=\"getFlexAttribute('align-items')\"\n                       [style.display]=\"getFlexAttribute('display')\"\n                       [style.flex-direction]=\"getFlexAttribute('flex-direction')\"\n                       [style.flex-wrap]=\"getFlexAttribute('flex-wrap')\"\n                       [style.justify-content]=\"getFlexAttribute('justify-content')\"></root-widget>\n      </div>\n      <fieldset *ngIf=\"containerType === 'fieldset'\"\n                [class]=\"options?.htmlClass || ''\"\n                [class.expandable]=\"options?.expandable && !expanded\"\n                [class.expanded]=\"options?.expandable && expanded\"\n                [disabled]=\"options?.readonly\">\n          <legend *ngIf=\"sectionTitle\"\n                  class=\"legend\"\n                  [class]=\"options?.labelHtmlClass || ''\"\n                  [innerHTML]=\"sectionTitle\"\n                  (click)=\"toggleExpanded()\"></legend>\n          <div *ngIf=\"options?.messageLocation !== 'bottom'\">\n              <p *ngIf=\"options?.description\"\n                 class=\"help-block\"\n                 [class]=\"options?.labelHelpBlockClass || ''\"\n                 [innerHTML]=\"options?.description\"></p>\n          </div>\n          <root-widget *ngIf=\"expanded\"\n                       [dataIndex]=\"dataIndex\"\n                       [layout]=\"layoutNode.items\"\n                       [layoutIndex]=\"layoutIndex\"\n                       [isFlexItem]=\"getFlexAttribute('is-flex')\"\n                       [isOrderable]=\"options?.orderable\"\n                       [class.form-flex-column]=\"getFlexAttribute('flex-direction') === 'column'\"\n                       [class.form-flex-row]=\"getFlexAttribute('flex-direction') === 'row'\"\n                       [style.align-content]=\"getFlexAttribute('align-content')\"\n                       [style.align-items]=\"getFlexAttribute('align-items')\"\n                       [style.display]=\"getFlexAttribute('display')\"\n                       [style.flex-direction]=\"getFlexAttribute('flex-direction')\"\n                       [style.flex-wrap]=\"getFlexAttribute('flex-wrap')\"\n                       [style.justify-content]=\"getFlexAttribute('justify-content')\"></root-widget>\n          <div *ngIf=\"options?.messageLocation === 'bottom'\">\n              <p *ngIf=\"options?.description\"\n                 class=\"help-block\"\n                 [class]=\"options?.labelHelpBlockClass || ''\"\n                 [innerHTML]=\"options?.description\"></p>\n          </div>\n      </fieldset>",
                    styles: ["\n    .legend { font-weight: bold; }\n    .expandable > legend:before, .expandable > label:before  { content: '\u25B6'; padding-right: .3em; }\n    .expanded > legend:before, .expanded > label:before  { content: '\u25BC'; padding-right: .2em; }\n  "]
                }] }
    ];
    SectionComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    SectionComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return SectionComponent;
}());
if (false) {
    SectionComponent.prototype.options;
    SectionComponent.prototype.expanded;
    SectionComponent.prototype.containerType;
    SectionComponent.prototype.layoutNode;
    SectionComponent.prototype.layoutIndex;
    SectionComponent.prototype.dataIndex;
    SectionComponent.prototype.jsf;
}

var SelectComponent = (function () {
    function SelectComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.selectList = [];
        this.isArray = isArray;
    }
    SelectComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.selectList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, !!this.options.required, !!this.options.flatList);
        this.jsf.initializeControl(this);
    };
    SelectComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    SelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'select-widget',
                    template: "\n    <div\n      [class]=\"options?.htmlClass || ''\">\n      <label *ngIf=\"options?.title\"\n        [attr.for]=\"'control' + layoutNode?._id\"\n        [class]=\"options?.labelHtmlClass || ''\"\n        [style.display]=\"options?.notitle ? 'none' : ''\"\n        [innerHTML]=\"options?.title\"></label>\n      <select *ngIf=\"boundControl\"\n        [formControl]=\"formControl\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.required]=\"options?.required\"\n        [class]=\"options?.fieldHtmlClass || ''\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\">\n        <ng-template ngFor let-selectItem [ngForOf]=\"selectList\">\n          <option *ngIf=\"!isArray(selectItem?.items)\"\n            [value]=\"selectItem?.value\">\n            <span [innerHTML]=\"selectItem?.name\"></span>\n          </option>\n          <optgroup *ngIf=\"isArray(selectItem?.items)\"\n            [label]=\"selectItem?.group\">\n            <option *ngFor=\"let subItem of selectItem.items\"\n              [value]=\"subItem?.value\">\n              <span [innerHTML]=\"subItem?.name\"></span>\n            </option>\n          </optgroup>\n        </ng-template>\n      </select>\n      <select *ngIf=\"!boundControl\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.required]=\"options?.required\"\n        [class]=\"options?.fieldHtmlClass || ''\"\n        [disabled]=\"controlDisabled\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        (change)=\"updateValue($event)\">\n        <ng-template ngFor let-selectItem [ngForOf]=\"selectList\">\n          <option *ngIf=\"!isArray(selectItem?.items)\"\n            [selected]=\"selectItem?.value === controlValue\"\n            [value]=\"selectItem?.value\">\n            <span [innerHTML]=\"selectItem?.name\"></span>\n          </option>\n          <optgroup *ngIf=\"isArray(selectItem?.items)\"\n            [label]=\"selectItem?.group\">\n            <option *ngFor=\"let subItem of selectItem.items\"\n              [attr.selected]=\"subItem?.value === controlValue\"\n              [value]=\"subItem?.value\">\n              <span [innerHTML]=\"subItem?.name\"></span>\n            </option>\n          </optgroup>\n        </ng-template>\n      </select>\n    </div>"
                }] }
    ];
    SelectComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    SelectComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return SelectComponent;
}());
if (false) {
    SelectComponent.prototype.formControl;
    SelectComponent.prototype.controlName;
    SelectComponent.prototype.controlValue;
    SelectComponent.prototype.controlDisabled;
    SelectComponent.prototype.boundControl;
    SelectComponent.prototype.options;
    SelectComponent.prototype.selectList;
    SelectComponent.prototype.isArray;
    SelectComponent.prototype.layoutNode;
    SelectComponent.prototype.layoutIndex;
    SelectComponent.prototype.dataIndex;
    SelectComponent.prototype.jsf;
}

var __values$3 = (this && this.__values) || function(o) {
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
var SelectFrameworkComponent = (function () {
    function SelectFrameworkComponent(componentFactory, jsf) {
        this.componentFactory = componentFactory;
        this.jsf = jsf;
        this.newComponent = null;
    }
    SelectFrameworkComponent.prototype.ngOnInit = function () {
        this.updateComponent();
    };
    SelectFrameworkComponent.prototype.ngOnChanges = function () {
        this.updateComponent();
    };
    SelectFrameworkComponent.prototype.updateComponent = function () {
        var e_1, _a;
        if (!this.newComponent && this.jsf.framework) {
            this.newComponent = this.widgetContainer.createComponent(this.componentFactory.resolveComponentFactory(((this.jsf.framework))));
        }
        if (this.newComponent) {
            try {
                for (var _b = __values$3(['layoutNode', 'layoutIndex', 'dataIndex']), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var input = _c.value;
                    this.newComponent.instance[input] = this[input];
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
    SelectFrameworkComponent.decorators = [
        { type: Component, args: [{
                    selector: 'select-framework-widget',
                    template: "\n    <div #widgetContainer></div>\n  "
                }] }
    ];
    SelectFrameworkComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: JsonSchemaFormService }
    ]; };
    SelectFrameworkComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }],
        widgetContainer: [{ type: ViewChild, args: ['widgetContainer', { read: ViewContainerRef, static: true },] }]
    };
    return SelectFrameworkComponent;
}());
if (false) {
    SelectFrameworkComponent.prototype.newComponent;
    SelectFrameworkComponent.prototype.layoutNode;
    SelectFrameworkComponent.prototype.layoutIndex;
    SelectFrameworkComponent.prototype.dataIndex;
    SelectFrameworkComponent.prototype.widgetContainer;
    SelectFrameworkComponent.prototype.componentFactory;
    SelectFrameworkComponent.prototype.jsf;
}

var __values$4 = (this && this.__values) || function(o) {
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
var SelectWidgetComponent = (function () {
    function SelectWidgetComponent(componentFactory, jsf) {
        this.componentFactory = componentFactory;
        this.jsf = jsf;
        this.newComponent = null;
    }
    SelectWidgetComponent.prototype.ngOnInit = function () {
        this.updateComponent();
    };
    SelectWidgetComponent.prototype.ngOnChanges = function () {
        this.updateComponent();
    };
    SelectWidgetComponent.prototype.updateComponent = function () {
        var e_1, _a;
        if (!this.newComponent && (this.layoutNode || {}).widget) {
            this.newComponent = this.widgetContainer.createComponent(this.componentFactory.resolveComponentFactory(this.layoutNode.widget));
        }
        if (this.newComponent) {
            try {
                for (var _b = __values$4(['layoutNode', 'layoutIndex', 'dataIndex']), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var input = _c.value;
                    this.newComponent.instance[input] = this[input];
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
    SelectWidgetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'select-widget-widget',
                    template: "<div #widgetContainer></div>"
                }] }
    ];
    SelectWidgetComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: JsonSchemaFormService }
    ]; };
    SelectWidgetComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }],
        widgetContainer: [{ type: ViewChild, args: ['widgetContainer', { read: ViewContainerRef, static: true },] }]
    };
    return SelectWidgetComponent;
}());
if (false) {
    SelectWidgetComponent.prototype.newComponent;
    SelectWidgetComponent.prototype.layoutNode;
    SelectWidgetComponent.prototype.layoutIndex;
    SelectWidgetComponent.prototype.dataIndex;
    SelectWidgetComponent.prototype.widgetContainer;
    SelectWidgetComponent.prototype.componentFactory;
    SelectWidgetComponent.prototype.jsf;
}

var SubmitComponent = (function () {
    function SubmitComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    SubmitComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (hasOwn(this.options, 'disabled')) {
            this.controlDisabled = this.options.disabled;
        }
        else if (this.jsf.formOptions.disableInvalidSubmit) {
            this.controlDisabled = !this.jsf.isValid;
            this.jsf.isValidChanges.subscribe((function (isValid) { return _this.controlDisabled = !isValid; }));
        }
        if (this.controlValue === null || this.controlValue === undefined) {
            this.controlValue = this.options.title;
        }
    };
    SubmitComponent.prototype.updateValue = function (event) {
        if (typeof this.options.onClick === 'function') {
            this.options.onClick(event);
        }
        else {
            this.jsf.updateValue(this, event.target.value);
        }
    };
    SubmitComponent.decorators = [
        { type: Component, args: [{
                    selector: 'submit-widget',
                    template: "\n    <div\n      [class]=\"options?.htmlClass || ''\">\n      <input\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.required]=\"options?.required\"\n        [class]=\"options?.fieldHtmlClass || ''\"\n        [disabled]=\"controlDisabled\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        [type]=\"layoutNode?.type\"\n        [value]=\"controlValue\"\n        (click)=\"updateValue($event)\">\n    </div>"
                }] }
    ];
    SubmitComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    SubmitComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return SubmitComponent;
}());
if (false) {
    SubmitComponent.prototype.formControl;
    SubmitComponent.prototype.controlName;
    SubmitComponent.prototype.controlValue;
    SubmitComponent.prototype.controlDisabled;
    SubmitComponent.prototype.boundControl;
    SubmitComponent.prototype.options;
    SubmitComponent.prototype.layoutNode;
    SubmitComponent.prototype.layoutIndex;
    SubmitComponent.prototype.dataIndex;
    SubmitComponent.prototype.jsf;
}

var TabsComponent = (function () {
    function TabsComponent(jsf) {
        this.jsf = jsf;
        this.selectedItem = 0;
        this.showAddTab = true;
    }
    TabsComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.itemCount = this.layoutNode.items.length - 1;
        this.updateControl();
    };
    TabsComponent.prototype.select = function (index) {
        if (this.layoutNode.items[index].type === '$ref') {
            this.itemCount = this.layoutNode.items.length;
            this.jsf.addItem({
                layoutNode: this.layoutNode.items[index],
                layoutIndex: this.layoutIndex.concat(index),
                dataIndex: this.dataIndex.concat(index)
            });
            this.updateControl();
        }
        this.selectedItem = index;
    };
    TabsComponent.prototype.updateControl = function () {
        var lastItem = this.layoutNode.items[this.layoutNode.items.length - 1];
        if (lastItem.type === '$ref' &&
            this.itemCount >= (lastItem.options.maxItems || 1000)) {
            this.showAddTab = false;
        }
    };
    TabsComponent.prototype.setTabTitle = function (item, index) {
        return this.jsf.setArrayItemTitle(this, item, index);
    };
    TabsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'tabs-widget',
                    template: "\n    <ul\n      [class]=\"options?.labelHtmlClass || ''\">\n      <li *ngFor=\"let item of layoutNode?.items; let i = index\"\n        [class]=\"(options?.itemLabelHtmlClass || '') + (selectedItem === i ?\n          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :\n          (' ' + options?.style?.unselected))\"\n        role=\"presentation\"\n        data-tabs>\n        <a *ngIf=\"showAddTab || item.type !== '$ref'\"\n           [class]=\"'nav-link' + (selectedItem === i ? (' ' + options?.activeClass + ' ' + options?.style?.selected) :\n            (' ' + options?.style?.unselected))\"\n          [innerHTML]=\"setTabTitle(item, i)\"\n          (click)=\"select(i)\"></a>\n      </li>\n    </ul>\n\n    <div *ngFor=\"let layoutItem of layoutNode?.items; let i = index\"\n      [class]=\"options?.htmlClass || ''\">\n\n      <select-framework-widget *ngIf=\"selectedItem === i\"\n        [class]=\"(options?.fieldHtmlClass || '') +\n          ' ' + (options?.activeClass || '') +\n          ' ' + (options?.style?.selected || '')\"\n        [dataIndex]=\"layoutNode?.dataType === 'array' ? (dataIndex || []).concat(i) : dataIndex\"\n        [layoutIndex]=\"(layoutIndex || []).concat(i)\"\n        [layoutNode]=\"layoutItem\"></select-framework-widget>\n\n    </div>",
                    styles: [" a { cursor: pointer; } "]
                }] }
    ];
    TabsComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    TabsComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return TabsComponent;
}());
if (false) {
    TabsComponent.prototype.options;
    TabsComponent.prototype.itemCount;
    TabsComponent.prototype.selectedItem;
    TabsComponent.prototype.showAddTab;
    TabsComponent.prototype.layoutNode;
    TabsComponent.prototype.layoutIndex;
    TabsComponent.prototype.dataIndex;
    TabsComponent.prototype.jsf;
}

var __values$5 = (this && this.__values) || function(o) {
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
var TemplateComponent = (function () {
    function TemplateComponent(componentFactory, jsf) {
        this.componentFactory = componentFactory;
        this.jsf = jsf;
        this.newComponent = null;
    }
    TemplateComponent.prototype.ngOnInit = function () {
        this.updateComponent();
    };
    TemplateComponent.prototype.ngOnChanges = function () {
        this.updateComponent();
    };
    TemplateComponent.prototype.updateComponent = function () {
        var e_1, _a;
        if (!this.newComponent && this.layoutNode.options.template) {
            this.newComponent = this.widgetContainer.createComponent(this.componentFactory.resolveComponentFactory(this.layoutNode.options.template));
        }
        if (this.newComponent) {
            try {
                for (var _b = __values$5(['layoutNode', 'layoutIndex', 'dataIndex']), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var input = _c.value;
                    this.newComponent.instance[input] = this[input];
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
    TemplateComponent.decorators = [
        { type: Component, args: [{
                    selector: 'template-widget',
                    template: "<div #widgetContainer></div>"
                }] }
    ];
    TemplateComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: JsonSchemaFormService }
    ]; };
    TemplateComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }],
        widgetContainer: [{ type: ViewChild, args: ['widgetContainer', { read: ViewContainerRef, static: true },] }]
    };
    return TemplateComponent;
}());
if (false) {
    TemplateComponent.prototype.newComponent;
    TemplateComponent.prototype.layoutNode;
    TemplateComponent.prototype.layoutIndex;
    TemplateComponent.prototype.dataIndex;
    TemplateComponent.prototype.widgetContainer;
    TemplateComponent.prototype.componentFactory;
    TemplateComponent.prototype.jsf;
}

var TextareaComponent = (function () {
    function TextareaComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    TextareaComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    };
    TextareaComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    TextareaComponent.decorators = [
        { type: Component, args: [{
                    selector: 'textarea-widget',
                    template: "\n    <div\n      [class]=\"options?.htmlClass || ''\">\n      <label *ngIf=\"options?.title\"\n        [attr.for]=\"'control' + layoutNode?._id\"\n        [class]=\"options?.labelHtmlClass || ''\"\n        [style.display]=\"options?.notitle ? 'none' : ''\"\n        [innerHTML]=\"options?.title\"></label>\n      <textarea *ngIf=\"boundControl\"\n        [formControl]=\"formControl\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.maxlength]=\"options?.maxLength\"\n        [attr.minlength]=\"options?.minLength\"\n        [attr.pattern]=\"options?.pattern\"\n        [attr.placeholder]=\"options?.placeholder\"\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.required]=\"options?.required\"\n        [class]=\"options?.fieldHtmlClass || ''\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"></textarea>\n      <textarea *ngIf=\"!boundControl\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.maxlength]=\"options?.maxLength\"\n        [attr.minlength]=\"options?.minLength\"\n        [attr.pattern]=\"options?.pattern\"\n        [attr.placeholder]=\"options?.placeholder\"\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.required]=\"options?.required\"\n        [class]=\"options?.fieldHtmlClass || ''\"\n        [disabled]=\"controlDisabled\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        [value]=\"controlValue\"\n        (input)=\"updateValue($event)\">{{controlValue}}</textarea>\n    </div>"
                }] }
    ];
    TextareaComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    TextareaComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return TextareaComponent;
}());
if (false) {
    TextareaComponent.prototype.formControl;
    TextareaComponent.prototype.controlName;
    TextareaComponent.prototype.controlValue;
    TextareaComponent.prototype.controlDisabled;
    TextareaComponent.prototype.boundControl;
    TextareaComponent.prototype.options;
    TextareaComponent.prototype.layoutNode;
    TextareaComponent.prototype.layoutIndex;
    TextareaComponent.prototype.dataIndex;
    TextareaComponent.prototype.jsf;
}

var __values$6 = (this && this.__values) || function(o) {
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
var WidgetLibraryService = (function () {
    function WidgetLibraryService() {
        this.defaultWidget = 'text';
        this.widgetLibrary = {
            none: NoneComponent,
            root: RootComponent,
            'select-framework': SelectFrameworkComponent,
            'select-widget': SelectWidgetComponent,
            $ref: AddReferenceComponent,
            email: 'text',
            integer: 'number',
            number: NumberComponent,
            password: 'text',
            search: 'text',
            tel: 'text',
            text: InputComponent,
            ur: 'text',
            color: 'text',
            date: 'text',
            datetime: 'text',
            'datetime-local': 'text',
            month: 'text',
            range: 'number',
            time: 'text',
            week: 'text',
            checkbox: CheckboxComponent,
            file: FileComponent,
            hidden: 'text',
            image: 'text',
            radio: 'radios',
            reset: 'submit',
            submit: SubmitComponent,
            button: ButtonComponent,
            select: SelectComponent,
            textarea: TextareaComponent,
            checkboxes: CheckboxesComponent,
            'checkboxes-inline': 'checkboxes',
            checkboxbuttons: 'checkboxes',
            radios: RadiosComponent,
            'radios-inline': 'radios',
            radiobuttons: 'radios',
            section: SectionComponent,
            div: 'section',
            fieldset: 'section',
            flex: 'section',
            'one-of': OneOfComponent,
            array: 'section',
            tabarray: 'tabs',
            tab: 'section',
            tabs: TabsComponent,
            message: MessageComponent,
            help: 'message',
            msg: 'message',
            html: 'message',
            template: TemplateComponent,
            advancedfieldset: 'section',
            authfieldset: 'section',
            optionfieldset: 'one-of',
            selectfieldset: 'one-of',
            conditional: 'section',
            actions: 'section',
            tagsinput: 'section',
            updown: 'number',
            'date-time': 'datetime-local',
            'alt-datetime': 'datetime-local',
            'alt-date': 'date',
            wizard: 'section',
            textline: 'text',
        };
        this.registeredWidgets = {};
        this.frameworkWidgets = {};
        this.activeWidgets = {};
        this.setActiveWidgets();
    }
    WidgetLibraryService.prototype.setActiveWidgets = function () {
        var e_1, _a;
        this.activeWidgets = Object.assign({}, this.widgetLibrary, this.frameworkWidgets, this.registeredWidgets);
        try {
            for (var _b = __values$6(Object.keys(this.activeWidgets)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var widgetName = _c.value;
                var widget = this.activeWidgets[widgetName];
                if (typeof widget === 'string') {
                    var usedAliases = [];
                    while (typeof widget === 'string' && !usedAliases.includes(widget)) {
                        usedAliases.push(widget);
                        widget = this.activeWidgets[widget];
                    }
                    if (typeof widget !== 'string') {
                        this.activeWidgets[widgetName] = widget;
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return true;
    };
    WidgetLibraryService.prototype.setDefaultWidget = function (type) {
        if (!this.hasWidget(type)) {
            return false;
        }
        this.defaultWidget = type;
        return true;
    };
    WidgetLibraryService.prototype.hasWidget = function (type, widgetSet) {
        if (widgetSet === void 0) { widgetSet = 'activeWidgets'; }
        if (!type || typeof type !== 'string') {
            return false;
        }
        return hasOwn(this[widgetSet], type);
    };
    WidgetLibraryService.prototype.hasDefaultWidget = function (type) {
        return this.hasWidget(type, 'widgetLibrary');
    };
    WidgetLibraryService.prototype.registerWidget = function (type, widget) {
        if (!type || !widget || typeof type !== 'string') {
            return false;
        }
        this.registeredWidgets[type] = widget;
        return this.setActiveWidgets();
    };
    WidgetLibraryService.prototype.unRegisterWidget = function (type) {
        if (!hasOwn(this.registeredWidgets, type)) {
            return false;
        }
        delete this.registeredWidgets[type];
        return this.setActiveWidgets();
    };
    WidgetLibraryService.prototype.unRegisterAllWidgets = function (unRegisterFrameworkWidgets) {
        if (unRegisterFrameworkWidgets === void 0) { unRegisterFrameworkWidgets = true; }
        this.registeredWidgets = {};
        if (unRegisterFrameworkWidgets) {
            this.frameworkWidgets = {};
        }
        return this.setActiveWidgets();
    };
    WidgetLibraryService.prototype.registerFrameworkWidgets = function (widgets) {
        if (widgets === null || typeof widgets !== 'object') {
            widgets = {};
        }
        this.frameworkWidgets = widgets;
        return this.setActiveWidgets();
    };
    WidgetLibraryService.prototype.unRegisterFrameworkWidgets = function () {
        if (Object.keys(this.frameworkWidgets).length) {
            this.frameworkWidgets = {};
            return this.setActiveWidgets();
        }
        return false;
    };
    WidgetLibraryService.prototype.getWidget = function (type, widgetSet) {
        if (widgetSet === void 0) { widgetSet = 'activeWidgets'; }
        if (this.hasWidget(type, widgetSet)) {
            return this[widgetSet][type];
        }
        else if (this.hasWidget(this.defaultWidget, widgetSet)) {
            return this[widgetSet][this.defaultWidget];
        }
        else {
            return null;
        }
    };
    WidgetLibraryService.prototype.getAllWidgets = function () {
        return {
            widgetLibrary: this.widgetLibrary,
            registeredWidgets: this.registeredWidgets,
            frameworkWidgets: this.frameworkWidgets,
            activeWidgets: this.activeWidgets,
        };
    };
    WidgetLibraryService.decorators = [
        { type: Injectable }
    ];
    WidgetLibraryService.ctorParameters = function () { return []; };
    return WidgetLibraryService;
}());
if (false) {
    WidgetLibraryService.prototype.defaultWidget;
    WidgetLibraryService.prototype.widgetLibrary;
    WidgetLibraryService.prototype.registeredWidgets;
    WidgetLibraryService.prototype.frameworkWidgets;
    WidgetLibraryService.prototype.activeWidgets;
}

var FrameworkLibraryService = (function () {
    function FrameworkLibraryService(frameworks, widgetLibrary) {
        var _this = this;
        this.frameworks = frameworks;
        this.widgetLibrary = widgetLibrary;
        this.activeFramework = null;
        this.loadExternalAssets = false;
        this.frameworkLibrary = {};
        this.frameworks.forEach((function (framework) {
            return _this.frameworkLibrary[framework.name] = framework;
        }));
        this.defaultFramework = this.frameworks[0].name;
        this.setFramework(this.defaultFramework);
    }
    FrameworkLibraryService.prototype.setLoadExternalAssets = function (loadExternalAssets) {
        if (loadExternalAssets === void 0) { loadExternalAssets = true; }
        this.loadExternalAssets = !!loadExternalAssets;
    };
    FrameworkLibraryService.prototype.setFramework = function (framework, loadExternalAssets) {
        if (framework === void 0) { framework = this.defaultFramework; }
        if (loadExternalAssets === void 0) { loadExternalAssets = this.loadExternalAssets; }
        this.activeFramework =
            typeof framework === 'string' && this.hasFramework(framework) ?
                this.frameworkLibrary[framework] :
                typeof framework === 'object' && hasOwn(framework, 'framework') ?
                    framework :
                    this.frameworkLibrary[this.defaultFramework];
        return this.registerFrameworkWidgets(this.activeFramework);
    };
    FrameworkLibraryService.prototype.registerFrameworkWidgets = function (framework) {
        return hasOwn(framework, 'widgets') ?
            this.widgetLibrary.registerFrameworkWidgets(framework.widgets) :
            this.widgetLibrary.unRegisterFrameworkWidgets();
    };
    FrameworkLibraryService.prototype.hasFramework = function (type) {
        return hasOwn(this.frameworkLibrary, type);
    };
    FrameworkLibraryService.prototype.getFramework = function () {
        if (!this.activeFramework) {
            this.setFramework('default', true);
        }
        return this.activeFramework.framework;
    };
    FrameworkLibraryService.prototype.getFrameworkWidgets = function () {
        return this.activeFramework.widgets || {};
    };
    FrameworkLibraryService.prototype.getFrameworkStylesheets = function (load) {
        if (load === void 0) { load = this.loadExternalAssets; }
        return (load && this.activeFramework.stylesheets) || [];
    };
    FrameworkLibraryService.prototype.getFrameworkScripts = function (load) {
        if (load === void 0) { load = this.loadExternalAssets; }
        return (load && this.activeFramework.scripts) || [];
    };
    FrameworkLibraryService.decorators = [
        { type: Injectable }
    ];
    FrameworkLibraryService.ctorParameters = function () { return [
        { type: Array, decorators: [{ type: Inject, args: [Framework,] }] },
        { type: WidgetLibraryService, decorators: [{ type: Inject, args: [WidgetLibraryService,] }] }
    ]; };
    return FrameworkLibraryService;
}());
if (false) {
    FrameworkLibraryService.prototype.activeFramework;
    FrameworkLibraryService.prototype.stylesheets;
    FrameworkLibraryService.prototype.scripts;
    FrameworkLibraryService.prototype.loadExternalAssets;
    FrameworkLibraryService.prototype.defaultFramework;
    FrameworkLibraryService.prototype.frameworkLibrary;
    FrameworkLibraryService.prototype.frameworks;
    FrameworkLibraryService.prototype.widgetLibrary;
}

var HiddenComponent = (function () {
    function HiddenComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    HiddenComponent.prototype.ngOnInit = function () {
        this.jsf.initializeControl(this);
    };
    HiddenComponent.decorators = [
        { type: Component, args: [{
                    selector: 'hidden-widget',
                    template: "\n    <input *ngIf=\"boundControl\"\n      [formControl]=\"formControl\"\n      [id]=\"'control' + layoutNode?._id\"\n      [name]=\"controlName\"\n      type=\"hidden\">\n    <input *ngIf=\"!boundControl\"\n      [disabled]=\"controlDisabled\"\n      [name]=\"controlName\"\n      [id]=\"'control' + layoutNode?._id\"\n      type=\"hidden\"\n      [value]=\"controlValue\">"
                }] }
    ];
    HiddenComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    HiddenComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return HiddenComponent;
}());
if (false) {
    HiddenComponent.prototype.formControl;
    HiddenComponent.prototype.controlName;
    HiddenComponent.prototype.controlValue;
    HiddenComponent.prototype.controlDisabled;
    HiddenComponent.prototype.boundControl;
    HiddenComponent.prototype.layoutNode;
    HiddenComponent.prototype.layoutIndex;
    HiddenComponent.prototype.dataIndex;
    HiddenComponent.prototype.jsf;
}

var TabComponent = (function () {
    function TabComponent(jsf) {
        this.jsf = jsf;
    }
    TabComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
    };
    TabComponent.decorators = [
        { type: Component, args: [{
                    selector: 'tab-widget',
                    template: "\n    <div [class]=\"options?.htmlClass || ''\">\n      <root-widget\n        [dataIndex]=\"dataIndex\"\n        [layoutIndex]=\"layoutIndex\"\n        [layout]=\"layoutNode.items\"></root-widget>\n    </div>"
                }] }
    ];
    TabComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    TabComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return TabComponent;
}());
if (false) {
    TabComponent.prototype.options;
    TabComponent.prototype.layoutNode;
    TabComponent.prototype.layoutIndex;
    TabComponent.prototype.dataIndex;
    TabComponent.prototype.jsf;
}

var WidgetLibraryModule = (function () {
    function WidgetLibraryModule() {
    }
    WidgetLibraryModule.forRoot = function () {
        return {
            ngModule: WidgetLibraryModule,
            providers: [JsonSchemaFormService],
        };
    };
    WidgetLibraryModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule, ReactiveFormsModule],
                    declarations: [
                        AddReferenceComponent,
                        OneOfComponent,
                        ButtonComponent,
                        CheckboxComponent,
                        CheckboxesComponent,
                        FileComponent,
                        HiddenComponent,
                        InputComponent,
                        MessageComponent,
                        NoneComponent,
                        NumberComponent,
                        RadiosComponent,
                        RootComponent,
                        SectionComponent,
                        SelectComponent,
                        SelectFrameworkComponent,
                        SelectWidgetComponent,
                        SubmitComponent,
                        TabComponent,
                        TabsComponent,
                        TemplateComponent,
                        TextareaComponent,
                        OrderableDirective,
                    ],
                    entryComponents: [
                        AddReferenceComponent,
                        OneOfComponent,
                        ButtonComponent,
                        CheckboxComponent,
                        CheckboxesComponent,
                        FileComponent,
                        HiddenComponent,
                        InputComponent,
                        MessageComponent,
                        NoneComponent,
                        NumberComponent,
                        RadiosComponent,
                        RootComponent,
                        SectionComponent,
                        SelectComponent,
                        SelectFrameworkComponent,
                        SelectWidgetComponent,
                        SubmitComponent,
                        TabComponent,
                        TabsComponent,
                        TemplateComponent,
                        TextareaComponent,
                    ],
                    exports: [
                        AddReferenceComponent,
                        OneOfComponent,
                        ButtonComponent,
                        CheckboxComponent,
                        CheckboxesComponent,
                        FileComponent,
                        HiddenComponent,
                        InputComponent,
                        MessageComponent,
                        NoneComponent,
                        NumberComponent,
                        RadiosComponent,
                        RootComponent,
                        SectionComponent,
                        SelectComponent,
                        SelectFrameworkComponent,
                        SelectWidgetComponent,
                        SubmitComponent,
                        TabComponent,
                        TabsComponent,
                        TemplateComponent,
                        TextareaComponent,
                        OrderableDirective,
                    ],
                    providers: [JsonSchemaFormService],
                },] }
    ];
    return WidgetLibraryModule;
}());

export { AddReferenceComponent, ButtonComponent, CheckboxComponent, CheckboxesComponent, FileComponent, FrameworkLibraryService, HiddenComponent, InputComponent, JsonSchemaFormService, MessageComponent, NoneComponent, NumberComponent, OneOfComponent, OrderableDirective, RadiosComponent, RootComponent, SectionComponent, SelectComponent, SelectFrameworkComponent, SelectWidgetComponent, SubmitComponent, TabComponent, TabsComponent, TemplateComponent, TextareaComponent, WidgetLibraryModule, WidgetLibraryService, buildTitleMap };
//# sourceMappingURL=ngsf-widget-library.js.map
