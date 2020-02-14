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
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs-compat/Subject';
import * as draft6 from 'ajv/lib/refs/json-schema-draft-06.json';
import Ajv from 'ajv';
import * as _ from 'lodash';
import { fixTitle, forEach, hasOwn, toTitleCase, hasValue, isArray, isDefined, isEmpty, isObject, JsonPointer, buildSchemaFromData, buildSchemaFromLayout, removeRecursiveReferences, buildFormGroup, buildFormGroupTemplate, formatFormData, getControl, buildLayout, getLayoutNode, enValidationMessages, frValidationMessages } from '@ngsf/common';
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
            _.cloneDeep(validationMessages);
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
        this.formOptions = _.cloneDeep(this.defaultFormOptions);
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
            var addOptions = _.cloneDeep(newOptions);
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
                ctx.layoutNode.options : _.cloneDeep(this.formOptions);
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
                if (!_.isEqual(ctx.controlValue, value)) {
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
export { JsonSchemaFormService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nc2Yvd2lkZ2V0LWxpYnJhcnkvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUV4QyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0scUJBQXFCLENBQUE7QUFDM0MsT0FBTyxLQUFLLE1BQU0sTUFBTSx3Q0FBd0MsQ0FBQTtBQUNoRSxPQUFPLEdBQUcsTUFBTSxLQUFLLENBQUE7QUFDckIsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUE7QUFFM0IsT0FBTyxFQUNMLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFDdEMsUUFBUSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFDL0MsV0FBVyxFQUNYLG1CQUFtQixFQUFFLHFCQUFxQixFQUFFLHlCQUF5QixFQUNyRSxjQUFjLEVBQUUsc0JBQXNCLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFDbEUsV0FBVyxFQUFFLGFBQWEsRUFDMUIsb0JBQW9CLEVBQ3BCLG9CQUFvQixFQUVyQixNQUFNLGNBQWMsQ0FBQTtBQUlyQjtJQXdGRTtRQXRGQSwwQkFBcUIsR0FBRyxLQUFLLENBQUE7UUFDN0IscUNBQWdDLEdBQUcsS0FBSyxDQUFBO1FBQ3hDLG1DQUE4QixHQUFHLEtBQUssQ0FBQTtRQUN0QyxZQUFPLEdBQVEsRUFBRSxDQUFBO1FBRWpCLGVBQVUsR0FBUSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFDLENBQUE7UUFDakYsUUFBRyxHQUFRLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUVuQyxx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ZCx1Q0FBZ0I7SUFDaEIsdUNBQWtCO0lBQ2xCLGtEQUEyQjtJQUMzQiwwQ0FBMkI7SUFDM0IsMENBQTJCO0lBQzNCLDRDQUFnQjtJQUVoQiwwQ0FBcUI7SUFDckIsd0NBQXVCO0lBQ3ZCLDBDQUFxQjtJQUNyQixpREFBNEI7SUFDNUIsMkNBQTJCO0lBQzNCLHNEQUFpQztJQUNqQyw0Q0FBeUM7SUFDekMsK0NBQTRDO0lBQzVDLHVEQUFvRDtJQUVwRCx5Q0FBeUM7SUFDekMsd0NBQXFDO0lBQ3JDLG9EQUFvRDtJQUNwRCxzREFBc0Q7SUFDdEQsaURBQTBCO0lBQzFCLGlEQUFrQztJQUNsQyxtREFBNEI7SUFDNUIsaURBQXdCO0lBRXhCLHlDQUFrQjtJQUdsQixtREEyQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbCwgRm9ybUFycmF5LCBGb3JtR3JvdXB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJ1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzLWNvbXBhdC9TdWJqZWN0J1xuaW1wb3J0ICogYXMgZHJhZnQ2IGZyb20gJ2Fqdi9saWIvcmVmcy9qc29uLXNjaGVtYS1kcmFmdC0wNi5qc29uJ1xuaW1wb3J0IEFqdiBmcm9tICdhanYnXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCdcblxuaW1wb3J0IHtcbiAgZml4VGl0bGUsIGZvckVhY2gsIGhhc093biwgdG9UaXRsZUNhc2UsXG4gIGhhc1ZhbHVlLCBpc0FycmF5LCBpc0RlZmluZWQsIGlzRW1wdHksIGlzT2JqZWN0LFxuICBKc29uUG9pbnRlcixcbiAgYnVpbGRTY2hlbWFGcm9tRGF0YSwgYnVpbGRTY2hlbWFGcm9tTGF5b3V0LCByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzLFxuICBidWlsZEZvcm1Hcm91cCwgYnVpbGRGb3JtR3JvdXBUZW1wbGF0ZSwgZm9ybWF0Rm9ybURhdGEsIGdldENvbnRyb2wsXG4gIGJ1aWxkTGF5b3V0LCBnZXRMYXlvdXROb2RlLFxuICBlblZhbGlkYXRpb25NZXNzYWdlcyxcbiAgZnJWYWxpZGF0aW9uTWVzc2FnZXMsXG4gIEZyYW1ld29ya1xufSBmcm9tICdAbmdzZi9jb21tb24nXG5pbXBvcnQge0Vycm9yTWVzc2FnZXN9IGZyb20gJy4uL2ludGVyZmFjZXMvZXJyb3ItbWVzc2FnZXMnXG5pbXBvcnQge1RpdGxlTWFwSXRlbX0gZnJvbSAnLi4vaW50ZXJmYWNlcy90aXRsZS1tYXAtaXRlbSdcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEpzb25TY2hlbWFGb3JtU2VydmljZSB7XG4gIEpzb25Gb3JtQ29tcGF0aWJpbGl0eSA9IGZhbHNlXG4gIFJlYWN0SnNvblNjaGVtYUZvcm1Db21wYXRpYmlsaXR5ID0gZmFsc2VcbiAgQW5ndWxhclNjaGVtYUZvcm1Db21wYXRpYmlsaXR5ID0gZmFsc2VcbiAgdHBsZGF0YTogYW55ID0ge31cblxuICBhanZPcHRpb25zOiBhbnkgPSB7YWxsRXJyb3JzOiB0cnVlLCBqc29uUG9pbnRlcnM6IHRydWUsIHVua25vd25Gb3JtYXRzOiAnaWdub3JlJ31cbiAgYWp2OiBhbnkgPSBuZXcgQWp2KHRoaXMuYWp2T3B0aW9ucykgLy8gQUpWOiBBbm90aGVyIEpTT04gU2NoZW1hIFZhbGlkYXRvclxuXG4gIHZhbGlkYXRlRm9ybURhdGE6IGFueSA9IG51bGwgLy8gQ29tcGlsZWQgQUpWIGZ1bmN0aW9uIHRvIHZhbGlkYXRlIGFjdGl2ZSBmb3JtJ3Mgc2NoZW1hXG5cbiAgZm9ybVZhbHVlczogYW55ID0ge30gLy8gSW50ZXJuYWwgZm9ybSBkYXRhIChtYXkgbm90IGhhdmUgY29ycmVjdCB0eXBlcylcbiAgZGF0YTogYW55ID0ge30gLy8gT3V0cHV0IGZvcm0gZGF0YSAoZm9ybVZhbHVlcywgZm9ybWF0dGVkIHdpdGggY29ycmVjdCBkYXRhIHR5cGVzKVxuICBzY2hlbWE6IGFueSA9IHt9IC8vIEludGVybmFsIEpTT04gU2NoZW1hXG4gIGxheW91dDogYW55W10gPSBbXSAvLyBJbnRlcm5hbCBmb3JtIGxheW91dFxuICBmb3JtR3JvdXBUZW1wbGF0ZTogYW55ID0ge30gLy8gVGVtcGxhdGUgdXNlZCB0byBjcmVhdGUgZm9ybUdyb3VwXG4gIGZvcm1Hcm91cDogRm9ybUdyb3VwID0gbnVsbCAvLyBBbmd1bGFyIGZvcm1Hcm91cCwgd2hpY2ggcG93ZXJzIHRoZSByZWFjdGl2ZSBmb3JtXG4gIGZyYW1ld29yazogRnJhbWV3b3JrID0gbnVsbCAvLyBBY3RpdmUgZnJhbWV3b3JrIGNvbXBvbmVudFxuICBmb3JtT3B0aW9uczogYW55IC8vIEFjdGl2ZSBvcHRpb25zLCB1c2VkIHRvIGNvbmZpZ3VyZSB0aGUgZm9ybVxuXG4gIHZhbGlkRGF0YTogYW55ID0gbnVsbCAvLyBWYWxpZCBmb3JtIGRhdGEgKG9yIG51bGwpICg9PT0gaXNWYWxpZCA/IGRhdGEgOiBudWxsKVxuICBpc1ZhbGlkOiBib29sZWFuID0gbnVsbCAvLyBJcyBjdXJyZW50IGZvcm0gZGF0YSB2YWxpZD9cbiAgYWp2RXJyb3JzOiBhbnkgPSBudWxsIC8vIEFqdiBlcnJvcnMgZm9yIGN1cnJlbnQgZGF0YVxuICB2YWxpZGF0aW9uRXJyb3JzOiBhbnkgPSBudWxsIC8vIEFueSB2YWxpZGF0aW9uIGVycm9ycyBmb3IgY3VycmVudCBkYXRhXG4gIGRhdGFFcnJvcnM6IGFueSA9IG5ldyBNYXAoKSAvL1xuICBmb3JtVmFsdWVTdWJzY3JpcHRpb246IGFueSA9IG51bGwgLy8gU3Vic2NyaXB0aW9uIHRvIGZvcm1Hcm91cC52YWx1ZUNoYW5nZXMgb2JzZXJ2YWJsZSAoZm9yIHVuLSBhbmQgcmUtc3Vic2NyaWJpbmcpXG4gIGRhdGFDaGFuZ2VzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpIC8vIEZvcm0gZGF0YSBvYnNlcnZhYmxlXG4gIGlzVmFsaWRDaGFuZ2VzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpIC8vIGlzVmFsaWQgb2JzZXJ2YWJsZVxuICB2YWxpZGF0aW9uRXJyb3JDaGFuZ2VzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpIC8vIHZhbGlkYXRpb25FcnJvcnMgb2JzZXJ2YWJsZVxuXG4gIGFycmF5TWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcCgpIC8vIE1hcHMgYXJyYXlzIGluIGRhdGEgb2JqZWN0IGFuZCBudW1iZXIgb2YgdHVwbGUgdmFsdWVzXG4gIGRhdGFNYXA6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwKCkgLy8gTWFwcyBwYXRocyBpbiBmb3JtIGRhdGEgdG8gc2NoZW1hIGFuZCBmb3JtR3JvdXAgcGF0aHNcbiAgZGF0YVJlY3Vyc2l2ZVJlZk1hcDogTWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKSAvLyBNYXBzIHJlY3Vyc2l2ZSByZWZlcmVuY2UgcG9pbnRzIGluIGZvcm0gZGF0YVxuICBzY2hlbWFSZWN1cnNpdmVSZWZNYXA6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBuZXcgTWFwKCkgLy8gTWFwcyByZWN1cnNpdmUgcmVmZXJlbmNlIHBvaW50cyBpbiBzY2hlbWFcbiAgc2NoZW1hUmVmTGlicmFyeTogYW55ID0ge30gLy8gTGlicmFyeSBvZiBzY2hlbWFzIGZvciByZXNvbHZpbmcgc2NoZW1hICRyZWZzXG4gIGxheW91dFJlZkxpYnJhcnk6IGFueSA9IHsnJzogbnVsbH0gLy8gTGlicmFyeSBvZiBsYXlvdXQgbm9kZXMgZm9yIGFkZGluZyB0byBmb3JtXG4gIHRlbXBsYXRlUmVmTGlicmFyeTogYW55ID0ge30gLy8gTGlicmFyeSBvZiBmb3JtR3JvdXAgdGVtcGxhdGVzIGZvciBhZGRpbmcgdG8gZm9ybVxuICBoYXNSb290UmVmZXJlbmNlID0gZmFsc2UgLy8gRG9lcyB0aGUgZm9ybSBpbmNsdWRlIGEgcmVjdXJzaXZlIHJlZmVyZW5jZSB0byBpdHNlbGY/XG5cbiAgbGFuZ3VhZ2UgPSAnZW4tVVMnXG5cbiAgLy8gRGVmYXVsdCBnbG9iYWwgZm9ybSBvcHRpb25zXG4gIGRlZmF1bHRGb3JtT3B0aW9uczogYW55ID0ge1xuICAgIGFkZFN1Ym1pdDogJ2F1dG8nLCAvLyBBZGQgYSBzdWJtaXQgYnV0dG9uIGlmIGxheW91dCBkb2VzIG5vdCBoYXZlIG9uZT9cbiAgICAvLyBmb3IgYWRkU3VibWl0OiB0cnVlID0gYWx3YXlzLCBmYWxzZSA9IG5ldmVyLFxuICAgIC8vICdhdXRvJyA9IG9ubHkgaWYgbGF5b3V0IGlzIHVuZGVmaW5lZCAoZm9ybSBpcyBidWlsdCBmcm9tIHNjaGVtYSBhbG9uZSlcbiAgICBkZWJ1ZzogZmFsc2UsIC8vIFNob3cgZGVidWdnaW5nIG91dHB1dD9cbiAgICBkaXNhYmxlSW52YWxpZFN1Ym1pdDogdHJ1ZSwgLy8gRGlzYWJsZSBzdWJtaXQgaWYgZm9ybSBpbnZhbGlkP1xuICAgIGZvcm1EaXNhYmxlZDogZmFsc2UsIC8vIFNldCBlbnRpcmUgZm9ybSBhcyBkaXNhYmxlZD8gKG5vdCBlZGl0YWJsZSwgYW5kIGRpc2FibGVzIG91dHB1dHMpXG4gICAgZm9ybVJlYWRvbmx5OiBmYWxzZSwgLy8gU2V0IGVudGlyZSBmb3JtIGFzIHJlYWQgb25seT8gKG5vdCBlZGl0YWJsZSwgYnV0IG91dHB1dHMgc3RpbGwgZW5hYmxlZClcbiAgICBmaWVsZHNSZXF1aXJlZDogZmFsc2UsIC8vIChzZXQgYXV0b21hdGljYWxseSkgQXJlIHRoZXJlIGFueSByZXF1aXJlZCBmaWVsZHMgaW4gdGhlIGZvcm0/XG4gICAgZnJhbWV3b3JrOiAnbm8tZnJhbWV3b3JrJywgLy8gVGhlIGZyYW1ld29yayB0byBsb2FkXG4gICAgbG9hZEV4dGVybmFsQXNzZXRzOiBmYWxzZSwgLy8gTG9hZCBleHRlcm5hbCBjc3MgYW5kIEphdmFTY3JpcHQgZm9yIGZyYW1ld29yaz9cbiAgICBwcmlzdGluZToge2Vycm9yczogdHJ1ZSwgc3VjY2VzczogdHJ1ZX0sXG4gICAgc3VwcmVzc1Byb3BlcnR5VGl0bGVzOiBmYWxzZSxcbiAgICBzZXRTY2hlbWFEZWZhdWx0czogJ2F1dG8nLCAvLyBTZXQgZmVmYXVsdCB2YWx1ZXMgZnJvbSBzY2hlbWE/XG4gICAgLy8gdHJ1ZSA9IGFsd2F5cyBzZXQgKHVubGVzcyBvdmVycmlkZGVuIGJ5IGxheW91dCBkZWZhdWx0IG9yIGZvcm1WYWx1ZXMpXG4gICAgLy8gZmFsc2UgPSBuZXZlciBzZXRcbiAgICAvLyAnYXV0bycgPSBzZXQgaW4gYWRkYWJsZSBjb21wb25lbnRzLCBhbmQgZXZlcnl3aGVyZSBpZiBmb3JtVmFsdWVzIG5vdCBzZXRcbiAgICBzZXRMYXlvdXREZWZhdWx0czogJ2F1dG8nLCAvLyBTZXQgZmVmYXVsdCB2YWx1ZXMgZnJvbSBsYXlvdXQ/XG4gICAgLy8gdHJ1ZSA9IGFsd2F5cyBzZXQgKHVubGVzcyBvdmVycmlkZGVuIGJ5IGZvcm1WYWx1ZXMpXG4gICAgLy8gZmFsc2UgPSBuZXZlciBzZXRcbiAgICAvLyAnYXV0bycgPSBzZXQgaW4gYWRkYWJsZSBjb21wb25lbnRzLCBhbmQgZXZlcnl3aGVyZSBpZiBmb3JtVmFsdWVzIG5vdCBzZXRcbiAgICB2YWxpZGF0ZU9uUmVuZGVyOiAnYXV0bycsIC8vIFZhbGlkYXRlIGZpZWxkcyBpbW1lZGlhdGVseSwgYmVmb3JlIHRoZXkgYXJlIHRvdWNoZWQ/XG4gICAgLy8gdHJ1ZSA9IHZhbGlkYXRlIGFsbCBmaWVsZHMgaW1tZWRpYXRlbHlcbiAgICAvLyBmYWxzZSA9IG9ubHkgdmFsaWRhdGUgZmllbGRzIGFmdGVyIHRoZXkgYXJlIHRvdWNoZWQgYnkgdXNlclxuICAgIC8vICdhdXRvJyA9IHZhbGlkYXRlIGZpZWxkcyB3aXRoIHZhbHVlcyBpbW1lZGlhdGVseSwgZW1wdHkgZmllbGRzIGFmdGVyIHRoZXkgYXJlIHRvdWNoZWRcbiAgICB3aWRnZXRzOiB7fSwgLy8gQW55IGN1c3RvbSB3aWRnZXRzIHRvIGxvYWRcbiAgICBkZWZhdXRXaWRnZXRPcHRpb25zOiB7IC8vIERlZmF1bHQgb3B0aW9ucyBmb3IgZm9ybSBjb250cm9sIHdpZGdldHNcbiAgICAgIGxpc3RJdGVtczogMSwgLy8gTnVtYmVyIG9mIGxpc3QgaXRlbXMgdG8gaW5pdGlhbGx5IGFkZCB0byBhcnJheXMgd2l0aCBubyBkZWZhdWx0IHZhbHVlXG4gICAgICBhZGRhYmxlOiB0cnVlLCAvLyBBbGxvdyBhZGRpbmcgaXRlbXMgdG8gYW4gYXJyYXkgb3IgJHJlZiBwb2ludD9cbiAgICAgIG9yZGVyYWJsZTogdHJ1ZSwgLy8gQWxsb3cgcmVvcmRlcmluZyBpdGVtcyB3aXRoaW4gYW4gYXJyYXk/XG4gICAgICByZW1vdmFibGU6IHRydWUsIC8vIEFsbG93IHJlbW92aW5nIGl0ZW1zIGZyb20gYW4gYXJyYXkgb3IgJHJlZiBwb2ludD9cbiAgICAgIGVuYWJsZUVycm9yU3RhdGU6IHRydWUsIC8vIEFwcGx5ICdoYXMtZXJyb3InIGNsYXNzIHdoZW4gZmllbGQgZmFpbHMgdmFsaWRhdGlvbj9cbiAgICAgIC8vIGRpc2FibGVFcnJvclN0YXRlOiBmYWxzZSwgLy8gRG9uJ3QgYXBwbHkgJ2hhcy1lcnJvcicgY2xhc3Mgd2hlbiBmaWVsZCBmYWlscyB2YWxpZGF0aW9uP1xuICAgICAgZW5hYmxlU3VjY2Vzc1N0YXRlOiB0cnVlLCAvLyBBcHBseSAnaGFzLXN1Y2Nlc3MnIGNsYXNzIHdoZW4gZmllbGQgdmFsaWRhdGVzP1xuICAgICAgLy8gZGlzYWJsZVN1Y2Nlc3NTdGF0ZTogZmFsc2UsIC8vIERvbid0IGFwcGx5ICdoYXMtc3VjY2VzcycgY2xhc3Mgd2hlbiBmaWVsZCB2YWxpZGF0ZXM/XG4gICAgICBmZWVkYmFjazogZmFsc2UsIC8vIFNob3cgaW5saW5lIGZlZWRiYWNrIGljb25zP1xuICAgICAgZmVlZGJhY2tPblJlbmRlcjogZmFsc2UsIC8vIFNob3cgZXJyb3JNZXNzYWdlIG9uIFJlbmRlcj9cbiAgICAgIG5vdGl0bGU6IGZhbHNlLCAvLyBIaWRlIHRpdGxlP1xuICAgICAgZGlzYWJsZWQ6IGZhbHNlLCAvLyBTZXQgY29udHJvbCBhcyBkaXNhYmxlZD8gKG5vdCBlZGl0YWJsZSwgYW5kIGV4Y2x1ZGVkIGZyb20gb3V0cHV0KVxuICAgICAgcmVhZG9ubHk6IGZhbHNlLCAvLyBTZXQgY29udHJvbCBhcyByZWFkIG9ubHk/IChub3QgZWRpdGFibGUsIGJ1dCBpbmNsdWRlZCBpbiBvdXRwdXQpXG4gICAgICByZXR1cm5FbXB0eUZpZWxkczogdHJ1ZSwgLy8gcmV0dXJuIHZhbHVlcyBmb3IgZmllbGRzIHRoYXQgY29udGFpbiBubyBkYXRhP1xuICAgICAgdmFsaWRhdGlvbk1lc3NhZ2VzOiB7fSAvLyBzZXQgYnkgc2V0TGFuZ3VhZ2UoKVxuICAgIH0sXG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNldExhbmd1YWdlKHRoaXMubGFuZ3VhZ2UpXG5cbiAgICB0aGlzLmFqdi5hZGRNZXRhU2NoZW1hKGRyYWZ0NilcbiAgfVxuXG4gIHNldExhbmd1YWdlKGxhbmd1YWdlOiBzdHJpbmcgPSAnZW4tVVMnKSB7XG4gICAgdGhpcy5sYW5ndWFnZSA9IGxhbmd1YWdlXG4gICAgY29uc3QgdmFsaWRhdGlvbk1lc3NhZ2VzID0gbGFuZ3VhZ2Uuc2xpY2UoMCwgMikgPT09ICdmcicgP1xuICAgICAgZnJWYWxpZGF0aW9uTWVzc2FnZXMgOiBlblZhbGlkYXRpb25NZXNzYWdlc1xuICAgIHRoaXMuZGVmYXVsdEZvcm1PcHRpb25zLmRlZmF1dFdpZGdldE9wdGlvbnMudmFsaWRhdGlvbk1lc3NhZ2VzID1cbiAgICAgIF8uY2xvbmVEZWVwKHZhbGlkYXRpb25NZXNzYWdlcylcbiAgfVxuXG4gIGdldERhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVxuICB9XG5cbiAgZ2V0U2NoZW1hKCkge1xuICAgIHJldHVybiB0aGlzLnNjaGVtYVxuICB9XG5cbiAgZ2V0TGF5b3V0KCkge1xuICAgIHJldHVybiB0aGlzLmxheW91dFxuICB9XG5cbiAgcHVibGljIHJlc2V0QWxsVmFsdWVzKCkge1xuICAgIHRoaXMuSnNvbkZvcm1Db21wYXRpYmlsaXR5ID0gZmFsc2VcbiAgICB0aGlzLlJlYWN0SnNvblNjaGVtYUZvcm1Db21wYXRpYmlsaXR5ID0gZmFsc2VcbiAgICB0aGlzLkFuZ3VsYXJTY2hlbWFGb3JtQ29tcGF0aWJpbGl0eSA9IGZhbHNlXG4gICAgdGhpcy50cGxkYXRhID0ge31cbiAgICB0aGlzLnZhbGlkYXRlRm9ybURhdGEgPSBudWxsXG4gICAgdGhpcy5mb3JtVmFsdWVzID0ge31cbiAgICB0aGlzLnNjaGVtYSA9IHt9XG4gICAgdGhpcy5sYXlvdXQgPSBbXVxuICAgIHRoaXMuZm9ybUdyb3VwVGVtcGxhdGUgPSB7fVxuICAgIHRoaXMuZm9ybUdyb3VwID0gbnVsbFxuICAgIHRoaXMuZnJhbWV3b3JrID0gbnVsbFxuICAgIHRoaXMuZGF0YSA9IHt9XG4gICAgdGhpcy52YWxpZERhdGEgPSBudWxsXG4gICAgdGhpcy5pc1ZhbGlkID0gbnVsbFxuICAgIHRoaXMudmFsaWRhdGlvbkVycm9ycyA9IG51bGxcbiAgICB0aGlzLmFycmF5TWFwID0gbmV3IE1hcCgpXG4gICAgdGhpcy5kYXRhTWFwID0gbmV3IE1hcCgpXG4gICAgdGhpcy5kYXRhUmVjdXJzaXZlUmVmTWFwID0gbmV3IE1hcCgpXG4gICAgdGhpcy5zY2hlbWFSZWN1cnNpdmVSZWZNYXAgPSBuZXcgTWFwKClcbiAgICB0aGlzLmxheW91dFJlZkxpYnJhcnkgPSB7fVxuICAgIHRoaXMuc2NoZW1hUmVmTGlicmFyeSA9IHt9XG4gICAgdGhpcy50ZW1wbGF0ZVJlZkxpYnJhcnkgPSB7fVxuICAgIHRoaXMuZm9ybU9wdGlvbnMgPSBfLmNsb25lRGVlcCh0aGlzLmRlZmF1bHRGb3JtT3B0aW9ucylcbiAgfVxuXG4gIC8qKlxuICAgKiAnYnVpbGRSZW1vdGVFcnJvcicgZnVuY3Rpb25cbiAgICpcbiAgICogRXhhbXBsZSBlcnJvcnM6XG4gICAqIHtcbiAgICogICBsYXN0X25hbWU6IFsge1xuICAgKiAgICAgbWVzc2FnZTogJ0xhc3QgbmFtZSBtdXN0IHN0YXJ0IHdpdGggY2FwaXRhbCBsZXR0ZXIuJyxcbiAgICogICAgIGNvZGU6ICdjYXBpdGFsX2xldHRlcidcbiAgICogICB9IF0sXG4gICAqICAgZW1haWw6IFsge1xuICAgKiAgICAgbWVzc2FnZTogJ0VtYWlsIG11c3QgYmUgZnJvbSBleGFtcGxlLmNvbSBkb21haW4uJyxcbiAgICogICAgIGNvZGU6ICdzcGVjaWFsX2RvbWFpbidcbiAgICogICB9LCB7XG4gICAqICAgICBtZXNzYWdlOiAnRW1haWwgbXVzdCBjb250YWluIGFuIEAgc3ltYm9sLicsXG4gICAqICAgICBjb2RlOiAnYXRfc3ltYm9sJ1xuICAgKiAgIH0gXVxuICAgKiB9XG4gICAqL1xuICBidWlsZFJlbW90ZUVycm9yKGVycm9yczogRXJyb3JNZXNzYWdlcykge1xuICAgIGZvckVhY2goZXJyb3JzLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgaWYgKGtleSBpbiB0aGlzLmZvcm1Hcm91cC5jb250cm9scykge1xuICAgICAgICBmb3IgKGNvbnN0IGVycm9yIG9mIHZhbHVlKSB7XG4gICAgICAgICAgY29uc3QgZXJyID0ge31cbiAgICAgICAgICBlcnJbZXJyb3IuY29kZV0gPSBlcnJvci5tZXNzYWdlXG4gICAgICAgICAgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Hcm91cC5nZXQoa2V5KS5zZXRFcnJvcnMoZXJyLCB7ZW1pdEV2ZW50OiB0cnVlfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIGZvciBlcnJvcicsIGtleSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgdmFsaWRhdGVEYXRhKG5ld1ZhbHVlOiBhbnksIHVwZGF0ZVN1YnNjcmlwdGlvbnMgPSB0cnVlKTogdm9pZCB7XG5cbiAgICAvLyBGb3JtYXQgcmF3IGZvcm0gZGF0YSB0byBjb3JyZWN0IGRhdGEgdHlwZXNcbiAgICB0aGlzLmRhdGEgPSBmb3JtYXRGb3JtRGF0YShcbiAgICAgIG5ld1ZhbHVlLCB0aGlzLmRhdGFNYXAsIHRoaXMuZGF0YVJlY3Vyc2l2ZVJlZk1hcCxcbiAgICAgIHRoaXMuYXJyYXlNYXAsIHRoaXMuZm9ybU9wdGlvbnMucmV0dXJuRW1wdHlGaWVsZHNcbiAgICApXG4gICAgdGhpcy5pc1ZhbGlkID0gdGhpcy52YWxpZGF0ZUZvcm1EYXRhKHRoaXMuZGF0YSlcbiAgICB0aGlzLnZhbGlkRGF0YSA9IHRoaXMuaXNWYWxpZCA/IHRoaXMuZGF0YSA6IG51bGxcbiAgICBjb25zdCBjb21waWxlRXJyb3JzID0gZXJyb3JzID0+IHtcbiAgICAgIGNvbnN0IGNvbXBpbGVkRXJyb3JzID0ge30gYXMgYW55XG4gICAgICAoZXJyb3JzIHx8IFtdKS5mb3JFYWNoKGVycm9yID0+IHtcbiAgICAgICAgaWYgKCFjb21waWxlZEVycm9yc1tlcnJvci5kYXRhUGF0aF0pIHtcbiAgICAgICAgICBjb21waWxlZEVycm9yc1tlcnJvci5kYXRhUGF0aF0gPSBbXVxuICAgICAgICB9XG4gICAgICAgIGNvbXBpbGVkRXJyb3JzW2Vycm9yLmRhdGFQYXRoXS5wdXNoKGVycm9yLm1lc3NhZ2UpXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGNvbXBpbGVkRXJyb3JzXG4gICAgfVxuICAgIHRoaXMuYWp2RXJyb3JzID0gdGhpcy52YWxpZGF0ZUZvcm1EYXRhLmVycm9yc1xuICAgIHRoaXMudmFsaWRhdGlvbkVycm9ycyA9IGNvbXBpbGVFcnJvcnModGhpcy52YWxpZGF0ZUZvcm1EYXRhLmVycm9ycylcbiAgICBpZiAodXBkYXRlU3Vic2NyaXB0aW9ucykge1xuICAgICAgdGhpcy5kYXRhQ2hhbmdlcy5uZXh0KHRoaXMuZGF0YSlcbiAgICAgIHRoaXMuaXNWYWxpZENoYW5nZXMubmV4dCh0aGlzLmlzVmFsaWQpXG4gICAgICB0aGlzLnZhbGlkYXRpb25FcnJvckNoYW5nZXMubmV4dCh0aGlzLmFqdkVycm9ycylcbiAgICB9XG4gIH1cblxuICBidWlsZEZvcm1Hcm91cFRlbXBsYXRlKGZvcm1WYWx1ZXM6IGFueSA9IG51bGwsIHNldFZhbHVlcyA9IHRydWUpIHtcbiAgICB0aGlzLmZvcm1Hcm91cFRlbXBsYXRlID0gYnVpbGRGb3JtR3JvdXBUZW1wbGF0ZSh0aGlzLCBmb3JtVmFsdWVzLCBzZXRWYWx1ZXMpXG4gIH1cblxuICBidWlsZEZvcm1Hcm91cCgpIHtcbiAgICB0aGlzLmZvcm1Hcm91cCA9IGJ1aWxkRm9ybUdyb3VwKHRoaXMuZm9ybUdyb3VwVGVtcGxhdGUpIGFzIEZvcm1Hcm91cFxuICAgIGlmICh0aGlzLmZvcm1Hcm91cCkge1xuICAgICAgdGhpcy5jb21waWxlQWp2U2NoZW1hKClcbiAgICAgIHRoaXMudmFsaWRhdGVEYXRhKHRoaXMuZm9ybUdyb3VwLnZhbHVlKVxuXG4gICAgICAvLyBTZXQgdXAgb2JzZXJ2YWJsZXMgdG8gZW1pdCBkYXRhIGFuZCB2YWxpZGF0aW9uIGluZm8gd2hlbiBmb3JtIGRhdGEgY2hhbmdlc1xuICAgICAgaWYgKHRoaXMuZm9ybVZhbHVlU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMuZm9ybVZhbHVlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKClcbiAgICAgIH1cbiAgICAgIHRoaXMuZm9ybVZhbHVlU3Vic2NyaXB0aW9uID0gdGhpcy5mb3JtR3JvdXAudmFsdWVDaGFuZ2VzXG4gICAgICAgIC5zdWJzY3JpYmUoZm9ybVZhbHVlID0+IHRoaXMudmFsaWRhdGVEYXRhKGZvcm1WYWx1ZSkpXG4gICAgfVxuICB9XG5cbiAgYnVpbGRMYXlvdXQod2lkZ2V0TGlicmFyeTogYW55KSB7XG4gICAgdGhpcy5sYXlvdXQgPSBidWlsZExheW91dCh0aGlzLCB3aWRnZXRMaWJyYXJ5KVxuICB9XG5cbiAgc2V0T3B0aW9ucyhuZXdPcHRpb25zOiBhbnkpIHtcbiAgICBpZiAoaXNPYmplY3QobmV3T3B0aW9ucykpIHtcbiAgICAgIGNvbnN0IGFkZE9wdGlvbnMgPSBfLmNsb25lRGVlcChuZXdPcHRpb25zKVxuICAgICAgLy8gQmFja3dhcmQgY29tcGF0aWJpbGl0eSBmb3IgJ2RlZmF1bHRPcHRpb25zJyAocmVuYW1lZCAnZGVmYXV0V2lkZ2V0T3B0aW9ucycpXG4gICAgICBpZiAoaXNPYmplY3QoYWRkT3B0aW9ucy5kZWZhdWx0T3B0aW9ucykpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmZvcm1PcHRpb25zLmRlZmF1dFdpZGdldE9wdGlvbnMsIGFkZE9wdGlvbnMuZGVmYXVsdE9wdGlvbnMpXG4gICAgICAgIGRlbGV0ZSBhZGRPcHRpb25zLmRlZmF1bHRPcHRpb25zXG4gICAgICB9XG4gICAgICBpZiAoaXNPYmplY3QoYWRkT3B0aW9ucy5kZWZhdXRXaWRnZXRPcHRpb25zKSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuZm9ybU9wdGlvbnMuZGVmYXV0V2lkZ2V0T3B0aW9ucywgYWRkT3B0aW9ucy5kZWZhdXRXaWRnZXRPcHRpb25zKVxuICAgICAgICBkZWxldGUgYWRkT3B0aW9ucy5kZWZhdXRXaWRnZXRPcHRpb25zXG4gICAgICB9XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMuZm9ybU9wdGlvbnMsIGFkZE9wdGlvbnMpXG5cbiAgICAgIC8vIGNvbnZlcnQgZGlzYWJsZUVycm9yU3RhdGUgLyBkaXNhYmxlU3VjY2Vzc1N0YXRlIHRvIGVuYWJsZS4uLlxuICAgICAgY29uc3QgZ2xvYmFsRGVmYXVsdHMgPSB0aGlzLmZvcm1PcHRpb25zLmRlZmF1dFdpZGdldE9wdGlvbnNcbiAgICAgIDtbJ0Vycm9yU3RhdGUnLCAnU3VjY2Vzc1N0YXRlJ11cbiAgICAgICAgLmZpbHRlcihzdWZmaXggPT4gaGFzT3duKGdsb2JhbERlZmF1bHRzLCAnZGlzYWJsZScgKyBzdWZmaXgpKVxuICAgICAgICAuZm9yRWFjaChzdWZmaXggPT4ge1xuICAgICAgICAgIGdsb2JhbERlZmF1bHRzWydlbmFibGUnICsgc3VmZml4XSA9ICFnbG9iYWxEZWZhdWx0c1snZGlzYWJsZScgKyBzdWZmaXhdXG4gICAgICAgICAgZGVsZXRlIGdsb2JhbERlZmF1bHRzWydkaXNhYmxlJyArIHN1ZmZpeF1cbiAgICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBjb21waWxlQWp2U2NoZW1hKCkge1xuICAgIGlmICghdGhpcy52YWxpZGF0ZUZvcm1EYXRhKSB7XG5cbiAgICAgIC8vIGlmICd1aTpvcmRlcicgZXhpc3RzIGluIHByb3BlcnRpZXMsIG1vdmUgaXQgdG8gcm9vdCBiZWZvcmUgY29tcGlsaW5nIHdpdGggYWp2XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnNjaGVtYS5wcm9wZXJ0aWVzWyd1aTpvcmRlciddKSkge1xuICAgICAgICB0aGlzLnNjaGVtYVsndWk6b3JkZXInXSA9IHRoaXMuc2NoZW1hLnByb3BlcnRpZXNbJ3VpOm9yZGVyJ11cbiAgICAgICAgZGVsZXRlIHRoaXMuc2NoZW1hLnByb3BlcnRpZXNbJ3VpOm9yZGVyJ11cbiAgICAgIH1cbiAgICAgIHRoaXMuYWp2LnJlbW92ZVNjaGVtYSh0aGlzLnNjaGVtYSlcbiAgICAgIHRoaXMudmFsaWRhdGVGb3JtRGF0YSA9IHRoaXMuYWp2LmNvbXBpbGUodGhpcy5zY2hlbWEpXG4gICAgfVxuICB9XG5cbiAgYnVpbGRTY2hlbWFGcm9tRGF0YShkYXRhPzogYW55LCByZXF1aXJlQWxsRmllbGRzID0gZmFsc2UpOiBhbnkge1xuICAgIGlmIChkYXRhKSB7XG4gICAgICByZXR1cm4gYnVpbGRTY2hlbWFGcm9tRGF0YShkYXRhLCByZXF1aXJlQWxsRmllbGRzKVxuICAgIH1cbiAgICB0aGlzLnNjaGVtYSA9IGJ1aWxkU2NoZW1hRnJvbURhdGEodGhpcy5mb3JtVmFsdWVzLCByZXF1aXJlQWxsRmllbGRzKVxuICB9XG5cbiAgYnVpbGRTY2hlbWFGcm9tTGF5b3V0KGxheW91dD86IGFueSk6IGFueSB7XG4gICAgaWYgKGxheW91dCkge1xuICAgICAgcmV0dXJuIGJ1aWxkU2NoZW1hRnJvbUxheW91dChsYXlvdXQpXG4gICAgfVxuICAgIHRoaXMuc2NoZW1hID0gYnVpbGRTY2hlbWFGcm9tTGF5b3V0KHRoaXMubGF5b3V0KVxuICB9XG5cblxuICBzZXRUcGxkYXRhKG5ld1RwbGRhdGE6IGFueSA9IHt9KTogdm9pZCB7XG4gICAgdGhpcy50cGxkYXRhID0gbmV3VHBsZGF0YVxuICB9XG5cbiAgcGFyc2VUZXh0KFxuICAgIHRleHQgPSAnJywgdmFsdWU6IGFueSA9IHt9LCB2YWx1ZXM6IGFueSA9IHt9LCBrZXk6IG51bWJlciB8IHN0cmluZyA9IG51bGxcbiAgKTogc3RyaW5nIHtcbiAgICBpZiAoIXRleHQgfHwgIS97ey4rP319Ly50ZXN0KHRleHQpKSB7XG4gICAgICByZXR1cm4gdGV4dFxuICAgIH1cbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC97eyguKz8pfX0vZywgKC4uLmEpID0+XG4gICAgICB0aGlzLnBhcnNlRXhwcmVzc2lvbihhWzFdLCB2YWx1ZSwgdmFsdWVzLCBrZXksIHRoaXMudHBsZGF0YSlcbiAgICApXG4gIH1cblxuICBwYXJzZUV4cHJlc3Npb24oXG4gICAgZXhwcmVzc2lvbiA9ICcnLCB2YWx1ZTogYW55ID0ge30sIHZhbHVlczogYW55ID0ge30sXG4gICAga2V5OiBudW1iZXIgfCBzdHJpbmcgPSBudWxsLCB0cGxkYXRhOiBhbnkgPSBudWxsXG4gICkge1xuICAgIGlmICh0eXBlb2YgZXhwcmVzc2lvbiAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cbiAgICBjb25zdCBpbmRleCA9IHR5cGVvZiBrZXkgPT09ICdudW1iZXInID8gKGtleSArIDEpICsgJycgOiAoa2V5IHx8ICcnKVxuICAgIGV4cHJlc3Npb24gPSBleHByZXNzaW9uLnRyaW0oKVxuICAgIGlmICgoZXhwcmVzc2lvblswXSA9PT0gJ1xcJycgfHwgZXhwcmVzc2lvblswXSA9PT0gJ1wiJykgJiZcbiAgICAgIGV4cHJlc3Npb25bMF0gPT09IGV4cHJlc3Npb25bZXhwcmVzc2lvbi5sZW5ndGggLSAxXSAmJlxuICAgICAgZXhwcmVzc2lvbi5zbGljZSgxLCBleHByZXNzaW9uLmxlbmd0aCAtIDEpLmluZGV4T2YoZXhwcmVzc2lvblswXSkgPT09IC0xXG4gICAgKSB7XG4gICAgICByZXR1cm4gZXhwcmVzc2lvbi5zbGljZSgxLCBleHByZXNzaW9uLmxlbmd0aCAtIDEpXG4gICAgfVxuICAgIGlmIChleHByZXNzaW9uID09PSAnaWR4JyB8fCBleHByZXNzaW9uID09PSAnJGluZGV4Jykge1xuICAgICAgcmV0dXJuIGluZGV4XG4gICAgfVxuICAgIGlmIChleHByZXNzaW9uID09PSAndmFsdWUnICYmICFoYXNPd24odmFsdWVzLCAndmFsdWUnKSkge1xuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuICAgIGlmIChbJ1wiJywgJ1xcJycsICcgJywgJ3x8JywgJyYmJywgJysnXS5ldmVyeShkZWxpbWl0ZXIgPT4gZXhwcmVzc2lvbi5pbmRleE9mKGRlbGltaXRlcikgPT09IC0xKSkge1xuICAgICAgY29uc3QgcG9pbnRlciA9IEpzb25Qb2ludGVyLnBhcnNlT2JqZWN0UGF0aChleHByZXNzaW9uKVxuICAgICAgcmV0dXJuIHBvaW50ZXJbMF0gPT09ICd2YWx1ZScgJiYgSnNvblBvaW50ZXIuaGFzKHZhbHVlLCBwb2ludGVyLnNsaWNlKDEpKSA/XG4gICAgICAgIEpzb25Qb2ludGVyLmdldCh2YWx1ZSwgcG9pbnRlci5zbGljZSgxKSkgOlxuICAgICAgICBwb2ludGVyWzBdID09PSAndmFsdWVzJyAmJiBKc29uUG9pbnRlci5oYXModmFsdWVzLCBwb2ludGVyLnNsaWNlKDEpKSA/XG4gICAgICAgICAgSnNvblBvaW50ZXIuZ2V0KHZhbHVlcywgcG9pbnRlci5zbGljZSgxKSkgOlxuICAgICAgICAgIHBvaW50ZXJbMF0gPT09ICd0cGxkYXRhJyAmJiBKc29uUG9pbnRlci5oYXModHBsZGF0YSwgcG9pbnRlci5zbGljZSgxKSkgP1xuICAgICAgICAgICAgSnNvblBvaW50ZXIuZ2V0KHRwbGRhdGEsIHBvaW50ZXIuc2xpY2UoMSkpIDpcbiAgICAgICAgICAgIEpzb25Qb2ludGVyLmhhcyh2YWx1ZXMsIHBvaW50ZXIpID8gSnNvblBvaW50ZXIuZ2V0KHZhbHVlcywgcG9pbnRlcikgOiAnJ1xuICAgIH1cbiAgICBpZiAoZXhwcmVzc2lvbi5pbmRleE9mKCdbaWR4XScpID4gLTEpIHtcbiAgICAgIGV4cHJlc3Npb24gPSBleHByZXNzaW9uLnJlcGxhY2UoL1xcW2lkeFxcXS9nLCBpbmRleClcbiAgICB9XG4gICAgaWYgKGV4cHJlc3Npb24uaW5kZXhPZignWyRpbmRleF0nKSA+IC0xKSB7XG4gICAgICBleHByZXNzaW9uID0gZXhwcmVzc2lvbi5yZXBsYWNlKC9cXFskaW5kZXhcXF0vZywgaW5kZXgpXG4gICAgfVxuICAgIC8vIFRPRE86IEltcHJvdmUgZXhwcmVzc2lvbiBldmFsdWF0aW9uIGJ5IHBhcnNpbmcgcXVvdGVkIHN0cmluZ3MgZmlyc3RcbiAgICAvLyBsZXQgZXhwcmVzc2lvbkFycmF5ID0gZXhwcmVzc2lvbi5tYXRjaCgvKFteXCInXSt8XCJbXlwiXStcInwnW14nXSsnKS9nKVxuICAgIGlmIChleHByZXNzaW9uLmluZGV4T2YoJ3x8JykgPiAtMSkge1xuICAgICAgcmV0dXJuIGV4cHJlc3Npb24uc3BsaXQoJ3x8JykucmVkdWNlKChhbGwsIHRlcm0pID0+XG4gICAgICAgIGFsbCB8fCB0aGlzLnBhcnNlRXhwcmVzc2lvbih0ZXJtLCB2YWx1ZSwgdmFsdWVzLCBrZXksIHRwbGRhdGEpLCAnJ1xuICAgICAgKVxuICAgIH1cbiAgICBpZiAoZXhwcmVzc2lvbi5pbmRleE9mKCcmJicpID4gLTEpIHtcbiAgICAgIHJldHVybiBleHByZXNzaW9uLnNwbGl0KCcmJicpLnJlZHVjZSgoYWxsLCB0ZXJtKSA9PlxuICAgICAgICBhbGwgJiYgdGhpcy5wYXJzZUV4cHJlc3Npb24odGVybSwgdmFsdWUsIHZhbHVlcywga2V5LCB0cGxkYXRhKSwgJyAnXG4gICAgICApLnRyaW0oKVxuICAgIH1cbiAgICBpZiAoZXhwcmVzc2lvbi5pbmRleE9mKCcrJykgPiAtMSkge1xuICAgICAgcmV0dXJuIGV4cHJlc3Npb24uc3BsaXQoJysnKVxuICAgICAgICAubWFwKHRlcm0gPT4gdGhpcy5wYXJzZUV4cHJlc3Npb24odGVybSwgdmFsdWUsIHZhbHVlcywga2V5LCB0cGxkYXRhKSlcbiAgICAgICAgLmpvaW4oJycpXG4gICAgfVxuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgc2V0QXJyYXlJdGVtVGl0bGUoXG4gICAgcGFyZW50Q3R4OiBhbnkgPSB7fSwgY2hpbGROb2RlOiBhbnkgPSBudWxsLCBpbmRleDogbnVtYmVyID0gbnVsbFxuICApOiBzdHJpbmcge1xuICAgIGNvbnN0IHBhcmVudE5vZGUgPSBwYXJlbnRDdHgubGF5b3V0Tm9kZVxuICAgIGNvbnN0IHBhcmVudFZhbHVlczogYW55ID0gdGhpcy5nZXRGb3JtQ29udHJvbFZhbHVlKHBhcmVudEN0eClcbiAgICBjb25zdCBpc0FycmF5SXRlbSA9XG4gICAgICAocGFyZW50Tm9kZS50eXBlIHx8ICcnKS5zbGljZSgtNSkgPT09ICdhcnJheScgJiYgaXNBcnJheShwYXJlbnRWYWx1ZXMpXG4gICAgY29uc3QgdGV4dCA9IEpzb25Qb2ludGVyLmdldEZpcnN0KFxuICAgICAgaXNBcnJheUl0ZW0gJiYgY2hpbGROb2RlLnR5cGUgIT09ICckcmVmJyA/IFtcbiAgICAgICAgW2NoaWxkTm9kZSwgJy9vcHRpb25zL2xlZ2VuZCddLFxuICAgICAgICBbY2hpbGROb2RlLCAnL29wdGlvbnMvdGl0bGUnXSxcbiAgICAgICAgW3BhcmVudE5vZGUsICcvb3B0aW9ucy90aXRsZSddLFxuICAgICAgICBbcGFyZW50Tm9kZSwgJy9vcHRpb25zL2xlZ2VuZCddLFxuICAgICAgXSA6IFtcbiAgICAgICAgW2NoaWxkTm9kZSwgJy9vcHRpb25zL3RpdGxlJ10sXG4gICAgICAgIFtjaGlsZE5vZGUsICcvb3B0aW9ucy9sZWdlbmQnXSxcbiAgICAgICAgW3BhcmVudE5vZGUsICcvb3B0aW9ucy90aXRsZSddLFxuICAgICAgICBbcGFyZW50Tm9kZSwgJy9vcHRpb25zL2xlZ2VuZCddXG4gICAgICBdXG4gICAgKVxuICAgIGlmICghdGV4dCkge1xuICAgICAgcmV0dXJuIHRleHRcbiAgICB9XG4gICAgY29uc3QgY2hpbGRWYWx1ZSA9IGlzQXJyYXkocGFyZW50VmFsdWVzKSAmJiBpbmRleCA8IHBhcmVudFZhbHVlcy5sZW5ndGggP1xuICAgICAgcGFyZW50VmFsdWVzW2luZGV4XSA6IHBhcmVudFZhbHVlc1xuICAgIHJldHVybiB0aGlzLnBhcnNlVGV4dCh0ZXh0LCBjaGlsZFZhbHVlLCBwYXJlbnRWYWx1ZXMsIGluZGV4KVxuICB9XG5cbiAgc2V0SXRlbVRpdGxlKGN0eDogYW55KSB7XG4gICAgcmV0dXJuICFjdHgub3B0aW9ucy50aXRsZSAmJiAvXihcXGQrfC0pJC8udGVzdChjdHgubGF5b3V0Tm9kZS5uYW1lKSA/XG4gICAgICBudWxsIDpcbiAgICAgIHRoaXMucGFyc2VUZXh0KFxuICAgICAgICBjdHgub3B0aW9ucy50aXRsZSB8fCB0b1RpdGxlQ2FzZShjdHgubGF5b3V0Tm9kZS5uYW1lKSxcbiAgICAgICAgdGhpcy5nZXRGb3JtQ29udHJvbFZhbHVlKHRoaXMpLFxuICAgICAgICAodGhpcy5nZXRGb3JtQ29udHJvbEdyb3VwKHRoaXMpIHx8IHt9IGFzIGFueSkudmFsdWUsXG4gICAgICAgIGN0eC5kYXRhSW5kZXhbY3R4LmRhdGFJbmRleC5sZW5ndGggLSAxXVxuICAgICAgKVxuICB9XG5cbiAgZXZhbHVhdGVDb25kaXRpb24obGF5b3V0Tm9kZTogYW55LCBkYXRhSW5kZXg6IG51bWJlcltdKTogYm9vbGVhbiB7XG4gICAgY29uc3QgYXJyYXlJbmRleCA9IGRhdGFJbmRleCAmJiBkYXRhSW5kZXhbZGF0YUluZGV4Lmxlbmd0aCAtIDFdXG4gICAgbGV0IHJlc3VsdCA9IHRydWVcbiAgICBpZiAoaGFzVmFsdWUoKGxheW91dE5vZGUub3B0aW9ucyB8fCB7fSkuY29uZGl0aW9uKSkge1xuICAgICAgaWYgKHR5cGVvZiBsYXlvdXROb2RlLm9wdGlvbnMuY29uZGl0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICBsZXQgcG9pbnRlciA9IGxheW91dE5vZGUub3B0aW9ucy5jb25kaXRpb25cbiAgICAgICAgaWYgKGhhc1ZhbHVlKGFycmF5SW5kZXgpKSB7XG4gICAgICAgICAgcG9pbnRlciA9IHBvaW50ZXIucmVwbGFjZSgnW2FycmF5SW5kZXhdJywgYFske2FycmF5SW5kZXh9XWApXG4gICAgICAgIH1cbiAgICAgICAgcG9pbnRlciA9IEpzb25Qb2ludGVyLnBhcnNlT2JqZWN0UGF0aChwb2ludGVyKVxuICAgICAgICByZXN1bHQgPSAhIUpzb25Qb2ludGVyLmdldCh0aGlzLmRhdGEsIHBvaW50ZXIpXG4gICAgICAgIGlmICghcmVzdWx0ICYmIHBvaW50ZXJbMF0gPT09ICdtb2RlbCcpIHtcbiAgICAgICAgICByZXN1bHQgPSAhIUpzb25Qb2ludGVyLmdldCh7bW9kZWw6IHRoaXMuZGF0YX0sIHBvaW50ZXIpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxheW91dE5vZGUub3B0aW9ucy5jb25kaXRpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmVzdWx0ID0gbGF5b3V0Tm9kZS5vcHRpb25zLmNvbmRpdGlvbih0aGlzLmRhdGEpXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsYXlvdXROb2RlLm9wdGlvbnMuY29uZGl0aW9uLmZ1bmN0aW9uQm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBkeW5GbiA9IG5ldyBGdW5jdGlvbihcbiAgICAgICAgICAgICdtb2RlbCcsICdhcnJheUluZGljZXMnLCBsYXlvdXROb2RlLm9wdGlvbnMuY29uZGl0aW9uLmZ1bmN0aW9uQm9keVxuICAgICAgICAgIClcbiAgICAgICAgICByZXN1bHQgPSBkeW5Gbih0aGlzLmRhdGEsIGRhdGFJbmRleClcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJlc3VsdCA9IHRydWVcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdjb25kaXRpb24gZnVuY3Rpb25Cb2R5IGVycm9yZWQgb3V0IG9uIGV2YWx1YXRpb246ICcgKyBsYXlvdXROb2RlLm9wdGlvbnMuY29uZGl0aW9uLmZ1bmN0aW9uQm9keSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICBpbml0aWFsaXplQ29udHJvbChjdHg6IGFueSwgYmluZCA9IHRydWUpOiBib29sZWFuIHtcbiAgICBpZiAoIWlzT2JqZWN0KGN0eCkpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBpZiAoaXNFbXB0eShjdHgub3B0aW9ucykpIHtcbiAgICAgIGN0eC5vcHRpb25zID0gIWlzRW1wdHkoKGN0eC5sYXlvdXROb2RlIHx8IHt9KS5vcHRpb25zKSA/XG4gICAgICAgIGN0eC5sYXlvdXROb2RlLm9wdGlvbnMgOiBfLmNsb25lRGVlcCh0aGlzLmZvcm1PcHRpb25zKVxuICAgIH1cbiAgICBjdHguZm9ybUNvbnRyb2wgPSB0aGlzLmdldEZvcm1Db250cm9sKGN0eClcbiAgICBjdHguYm91bmRDb250cm9sID0gYmluZCAmJiAhIWN0eC5mb3JtQ29udHJvbFxuICAgIGlmIChjdHguZm9ybUNvbnRyb2wpIHtcbiAgICAgIGN0eC5jb250cm9sTmFtZSA9IHRoaXMuZ2V0Rm9ybUNvbnRyb2xOYW1lKGN0eClcbiAgICAgIGN0eC5jb250cm9sVmFsdWUgPSBjdHguZm9ybUNvbnRyb2wudmFsdWVcbiAgICAgIGN0eC5jb250cm9sRGlzYWJsZWQgPSBjdHguZm9ybUNvbnRyb2wuZGlzYWJsZWRcbiAgICAgIGN0eC5vcHRpb25zLmVycm9yTWVzc2FnZSA9IGN0eC5mb3JtQ29udHJvbC5zdGF0dXMgPT09ICdWQUxJRCcgPyBudWxsIDpcbiAgICAgICAgdGhpcy5mb3JtYXRFcnJvcnMoY3R4LmZvcm1Db250cm9sLmVycm9ycywgY3R4Lm9wdGlvbnMudmFsaWRhdGlvbk1lc3NhZ2VzKVxuICAgICAgY3R4Lm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRoaXMuZm9ybU9wdGlvbnMudmFsaWRhdGVPblJlbmRlciA9PT0gdHJ1ZSB8fFxuICAgICAgICAodGhpcy5mb3JtT3B0aW9ucy52YWxpZGF0ZU9uUmVuZGVyID09PSAnYXV0bycgJiYgaGFzVmFsdWUoY3R4LmNvbnRyb2xWYWx1ZSkpXG4gICAgICBjdHguZm9ybUNvbnRyb2wuc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoc3RhdHVzID0+XG4gICAgICAgIGN0eC5vcHRpb25zLmVycm9yTWVzc2FnZSA9IHN0YXR1cyA9PT0gJ1ZBTElEJyA/IG51bGwgOlxuICAgICAgICAgIHRoaXMuZm9ybWF0RXJyb3JzKGN0eC5mb3JtQ29udHJvbC5lcnJvcnMsIGN0eC5vcHRpb25zLnZhbGlkYXRpb25NZXNzYWdlcylcbiAgICAgIClcbiAgICAgIGN0eC5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgICAgaWYgKCFfLmlzRXF1YWwoY3R4LmNvbnRyb2xWYWx1ZSwgdmFsdWUpKSB7XG4gICAgICAgICAgY3R4LmNvbnRyb2xWYWx1ZSA9IHZhbHVlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGN0eC5jb250cm9sTmFtZSA9IGN0eC5sYXlvdXROb2RlLm5hbWVcbiAgICAgIGN0eC5jb250cm9sVmFsdWUgPSBjdHgubGF5b3V0Tm9kZS52YWx1ZSB8fCBudWxsXG4gICAgICBjb25zdCBkYXRhUG9pbnRlciA9IHRoaXMuZ2V0RGF0YVBvaW50ZXIoY3R4KVxuICAgICAgaWYgKGJpbmQgJiYgZGF0YVBvaW50ZXIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgd2FybmluZzogY29udHJvbCBcIiR7ZGF0YVBvaW50ZXJ9XCIgaXMgbm90IGJvdW5kIHRvIHRoZSBBbmd1bGFyIEZvcm1Hcm91cC5gKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3R4LmJvdW5kQ29udHJvbFxuICB9XG5cbiAgZm9ybWF0RXJyb3JzKGVycm9yczogYW55LCB2YWxpZGF0aW9uTWVzc2FnZXM6IGFueSA9IHt9KTogc3RyaW5nIHtcbiAgICBpZiAoaXNFbXB0eShlcnJvcnMpKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBpZiAoIWlzT2JqZWN0KHZhbGlkYXRpb25NZXNzYWdlcykpIHtcbiAgICAgIHZhbGlkYXRpb25NZXNzYWdlcyA9IHt9XG4gICAgfVxuICAgIGNvbnN0IGFkZFNwYWNlcyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB2YWx1ZVswXS50b1VwcGVyQ2FzZSgpICsgKHZhbHVlLnNsaWNlKDEpIHx8ICcnKVxuICAgICAgLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMSAkMicpLnJlcGxhY2UoL18vZywgJyAnKVxuICAgIGNvbnN0IGZvcm1hdEVycm9yID0gKGVycm9yKSA9PiB0eXBlb2YgZXJyb3IgPT09ICdvYmplY3QnID9cbiAgICAgIE9iamVjdC5rZXlzKGVycm9yKS5tYXAoa2V5ID0+XG4gICAgICAgIGVycm9yW2tleV0gPT09IHRydWUgPyBhZGRTcGFjZXMoa2V5KSA6XG4gICAgICAgICAgZXJyb3Jba2V5XSA9PT0gZmFsc2UgPyAnTm90ICcgKyBhZGRTcGFjZXMoa2V5KSA6XG4gICAgICAgICAgICBhZGRTcGFjZXMoa2V5KSArICc6ICcgKyBmb3JtYXRFcnJvcihlcnJvcltrZXldKVxuICAgICAgKS5qb2luKCcsICcpIDpcbiAgICAgIGFkZFNwYWNlcyhlcnJvci50b1N0cmluZygpKVxuICAgIGNvbnN0IG1lc3NhZ2VzID0gW11cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoZXJyb3JzKVxuICAgIC8vIEhpZGUgJ3JlcXVpcmVkJyBlcnJvciwgdW5sZXNzIGl0IGlzIHRoZSBvbmx5IG9uZVxuICAgICAgLmZpbHRlcihlcnJvcktleSA9PiBlcnJvcktleSAhPT0gJ3JlcXVpcmVkJyB8fCBPYmplY3Qua2V5cyhlcnJvcnMpLmxlbmd0aCA9PT0gMSlcbiAgICAgIC5tYXAoZXJyb3JLZXkgPT5cbiAgICAgICAgLy8gSWYgdmFsaWRhdGlvbk1lc3NhZ2VzIGlzIGEgc3RyaW5nLCByZXR1cm4gaXRcbiAgICAgICAgdHlwZW9mIHZhbGlkYXRpb25NZXNzYWdlcyA9PT0gJ3N0cmluZycgPyB2YWxpZGF0aW9uTWVzc2FnZXMgOlxuICAgICAgICAgIC8vIElmIGN1c3RvbSBlcnJvciBtZXNzYWdlIGlzIGEgZnVuY3Rpb24sIHJldHVybiBmdW5jdGlvbiByZXN1bHRcbiAgICAgICAgICB0eXBlb2YgdmFsaWRhdGlvbk1lc3NhZ2VzW2Vycm9yS2V5XSA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgICAgICB2YWxpZGF0aW9uTWVzc2FnZXNbZXJyb3JLZXldKGVycm9yc1tlcnJvcktleV0pIDpcbiAgICAgICAgICAgIC8vIElmIGN1c3RvbSBlcnJvciBtZXNzYWdlIGlzIGEgc3RyaW5nLCByZXBsYWNlIHBsYWNlaG9sZGVycyBhbmQgcmV0dXJuXG4gICAgICAgICAgICB0eXBlb2YgdmFsaWRhdGlvbk1lc3NhZ2VzW2Vycm9yS2V5XSA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAgICAvLyBEb2VzIGVycm9yIG1lc3NhZ2UgaGF2ZSBhbnkge3twcm9wZXJ0eX19IHBsYWNlaG9sZGVycz9cbiAgICAgICAgICAgICAgIS97ey4rP319Ly50ZXN0KHZhbGlkYXRpb25NZXNzYWdlc1tlcnJvcktleV0pID9cbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uTWVzc2FnZXNbZXJyb3JLZXldIDpcbiAgICAgICAgICAgICAgICAvLyBSZXBsYWNlIHt7cHJvcGVydHl9fSBwbGFjZWhvbGRlcnMgd2l0aCB2YWx1ZXNcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhlcnJvcnNbZXJyb3JLZXldKVxuICAgICAgICAgICAgICAgICAgLnJlZHVjZSgoZXJyb3JNZXNzYWdlLCBlcnJvclByb3BlcnR5KSA9PiBlcnJvck1lc3NhZ2UucmVwbGFjZShcbiAgICAgICAgICAgICAgICAgICAgbmV3IFJlZ0V4cCgne3snICsgZXJyb3JQcm9wZXJ0eSArICd9fScsICdnJyksXG4gICAgICAgICAgICAgICAgICAgIGVycm9yc1tlcnJvcktleV1bZXJyb3JQcm9wZXJ0eV1cbiAgICAgICAgICAgICAgICAgICksIHZhbGlkYXRpb25NZXNzYWdlc1tlcnJvcktleV0pIDpcbiAgICAgICAgICAgICAgLy8gSWYgbm8gY3VzdG9tIGVycm9yIG1lc3NhZ2UsIHJldHVybiBmb3JtYXR0ZWQgZXJyb3IgZGF0YSBpbnN0ZWFkXG4gICAgICAgICAgICAgIGFkZFNwYWNlcyhlcnJvcktleSkgKyAnIEVycm9yOiAnICsgZm9ybWF0RXJyb3IoZXJyb3JzW2Vycm9yS2V5XSlcbiAgICAgICkuam9pbignPGJyPicpXG4gIH1cblxuICB1cGRhdGVWYWx1ZShjdHg6IGFueSwgdmFsdWU6IGFueSk6IHZvaWQge1xuXG4gICAgLy8gU2V0IHZhbHVlIG9mIGN1cnJlbnQgY29udHJvbFxuICAgIGN0eC5jb250cm9sVmFsdWUgPSB2YWx1ZVxuICAgIGlmIChjdHguYm91bmRDb250cm9sKSB7XG4gICAgICBjdHguZm9ybUNvbnRyb2wuc2V0VmFsdWUodmFsdWUpXG4gICAgICBjdHguZm9ybUNvbnRyb2wubWFya0FzRGlydHkoKVxuICAgIH1cbiAgICBjdHgubGF5b3V0Tm9kZS52YWx1ZSA9IHZhbHVlXG5cbiAgICAvLyBTZXQgdmFsdWVzIG9mIGFueSByZWxhdGVkIGNvbnRyb2xzIGluIGNvcHlWYWx1ZVRvIGFycmF5XG4gICAgaWYgKGlzQXJyYXkoY3R4Lm9wdGlvbnMuY29weVZhbHVlVG8pKSB7XG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY3R4Lm9wdGlvbnMuY29weVZhbHVlVG8pIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0Q29udHJvbCA9IGdldENvbnRyb2wodGhpcy5mb3JtR3JvdXAsIGl0ZW0pXG4gICAgICAgIGlmIChpc09iamVjdCh0YXJnZXRDb250cm9sKSAmJiB0eXBlb2YgdGFyZ2V0Q29udHJvbC5zZXRWYWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRhcmdldENvbnRyb2wuc2V0VmFsdWUodmFsdWUpXG4gICAgICAgICAgdGFyZ2V0Q29udHJvbC5tYXJrQXNEaXJ0eSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1cGRhdGVBcnJheUNoZWNrYm94TGlzdChjdHg6IGFueSwgY2hlY2tib3hMaXN0OiBUaXRsZU1hcEl0ZW1bXSk6IHZvaWQge1xuICAgIGNvbnN0IGZvcm1BcnJheSA9IHRoaXMuZ2V0Rm9ybUNvbnRyb2woY3R4KSBhcyBGb3JtQXJyYXlcblxuICAgIC8vIFJlbW92ZSBhbGwgZXhpc3RpbmcgaXRlbXNcbiAgICB3aGlsZSAoZm9ybUFycmF5LnZhbHVlLmxlbmd0aCkge1xuICAgICAgZm9ybUFycmF5LnJlbW92ZUF0KDApXG4gICAgfVxuXG4gICAgLy8gUmUtYWRkIGFuIGl0ZW0gZm9yIGVhY2ggY2hlY2tlZCBib3hcbiAgICBjb25zdCByZWZQb2ludGVyID0gcmVtb3ZlUmVjdXJzaXZlUmVmZXJlbmNlcyhcbiAgICAgIGN0eC5sYXlvdXROb2RlLmRhdGFQb2ludGVyICsgJy8tJywgdGhpcy5kYXRhUmVjdXJzaXZlUmVmTWFwLCB0aGlzLmFycmF5TWFwXG4gICAgKVxuICAgIGZvciAoY29uc3QgY2hlY2tib3hJdGVtIG9mIGNoZWNrYm94TGlzdCkge1xuICAgICAgaWYgKGNoZWNrYm94SXRlbS5jaGVja2VkKSB7XG4gICAgICAgIGNvbnN0IG5ld0Zvcm1Db250cm9sID0gYnVpbGRGb3JtR3JvdXAodGhpcy50ZW1wbGF0ZVJlZkxpYnJhcnlbcmVmUG9pbnRlcl0pXG4gICAgICAgIG5ld0Zvcm1Db250cm9sLnNldFZhbHVlKGNoZWNrYm94SXRlbS52YWx1ZSlcbiAgICAgICAgZm9ybUFycmF5LnB1c2gobmV3Rm9ybUNvbnRyb2wpXG4gICAgICB9XG4gICAgfVxuICAgIGZvcm1BcnJheS5tYXJrQXNEaXJ0eSgpXG4gIH1cblxuICBnZXRGb3JtQ29udHJvbChjdHg6IGFueSk6IEFic3RyYWN0Q29udHJvbCB7XG4gICAgaWYgKFxuICAgICAgIWN0eC5sYXlvdXROb2RlIHx8ICFpc0RlZmluZWQoY3R4LmxheW91dE5vZGUuZGF0YVBvaW50ZXIpIHx8XG4gICAgICBjdHgubGF5b3V0Tm9kZS50eXBlID09PSAnJHJlZidcbiAgICApIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHJldHVybiBnZXRDb250cm9sKHRoaXMuZm9ybUdyb3VwLCB0aGlzLmdldERhdGFQb2ludGVyKGN0eCkpXG4gIH1cblxuICBnZXRGb3JtQ29udHJvbFZhbHVlKGN0eDogYW55KTogQWJzdHJhY3RDb250cm9sIHtcbiAgICBpZiAoXG4gICAgICAhY3R4LmxheW91dE5vZGUgfHwgIWlzRGVmaW5lZChjdHgubGF5b3V0Tm9kZS5kYXRhUG9pbnRlcikgfHxcbiAgICAgIGN0eC5sYXlvdXROb2RlLnR5cGUgPT09ICckcmVmJ1xuICAgICkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgY29uc3QgY29udHJvbCA9IGdldENvbnRyb2wodGhpcy5mb3JtR3JvdXAsIHRoaXMuZ2V0RGF0YVBvaW50ZXIoY3R4KSlcbiAgICByZXR1cm4gY29udHJvbCA/IGNvbnRyb2wudmFsdWUgOiBudWxsXG4gIH1cblxuICBnZXRGb3JtQ29udHJvbEdyb3VwKGN0eDogYW55KTogRm9ybUFycmF5IHwgRm9ybUdyb3VwIHtcbiAgICBpZiAoIWN0eC5sYXlvdXROb2RlIHx8ICFpc0RlZmluZWQoY3R4LmxheW91dE5vZGUuZGF0YVBvaW50ZXIpKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICByZXR1cm4gZ2V0Q29udHJvbCh0aGlzLmZvcm1Hcm91cCwgdGhpcy5nZXREYXRhUG9pbnRlcihjdHgpLCB0cnVlKVxuICB9XG5cbiAgZ2V0Rm9ybUNvbnRyb2xOYW1lKGN0eDogYW55KTogc3RyaW5nIHtcbiAgICBpZiAoXG4gICAgICAhY3R4LmxheW91dE5vZGUgfHwgIWlzRGVmaW5lZChjdHgubGF5b3V0Tm9kZS5kYXRhUG9pbnRlcikgfHwgIWhhc1ZhbHVlKGN0eC5kYXRhSW5kZXgpXG4gICAgKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICByZXR1cm4gSnNvblBvaW50ZXIudG9LZXkodGhpcy5nZXREYXRhUG9pbnRlcihjdHgpKVxuICB9XG5cbiAgZ2V0TGF5b3V0QXJyYXkoY3R4OiBhbnkpOiBhbnlbXSB7XG4gICAgcmV0dXJuIEpzb25Qb2ludGVyLmdldCh0aGlzLmxheW91dCwgdGhpcy5nZXRMYXlvdXRQb2ludGVyKGN0eCksIDAsIC0xKVxuICB9XG5cbiAgZ2V0UGFyZW50Tm9kZShjdHg6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIEpzb25Qb2ludGVyLmdldCh0aGlzLmxheW91dCwgdGhpcy5nZXRMYXlvdXRQb2ludGVyKGN0eCksIDAsIC0yKVxuICB9XG5cbiAgZ2V0RGF0YVBvaW50ZXIoY3R4OiBhbnkpOiBzdHJpbmcge1xuICAgIGlmIChcbiAgICAgICFjdHgubGF5b3V0Tm9kZSB8fCAhaXNEZWZpbmVkKGN0eC5sYXlvdXROb2RlLmRhdGFQb2ludGVyKSB8fCAhaGFzVmFsdWUoY3R4LmRhdGFJbmRleClcbiAgICApIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHJldHVybiBKc29uUG9pbnRlci50b0luZGV4ZWRQb2ludGVyKFxuICAgICAgY3R4LmxheW91dE5vZGUuZGF0YVBvaW50ZXIsIGN0eC5kYXRhSW5kZXgsIHRoaXMuYXJyYXlNYXBcbiAgICApXG4gIH1cblxuICBnZXRMYXlvdXRQb2ludGVyKGN0eDogYW55KTogc3RyaW5nIHtcbiAgICBpZiAoIWhhc1ZhbHVlKGN0eC5sYXlvdXRJbmRleCkpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHJldHVybiAnLycgKyBjdHgubGF5b3V0SW5kZXguam9pbignL2l0ZW1zLycpXG4gIH1cblxuICBpc0NvbnRyb2xCb3VuZChjdHg6IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmIChcbiAgICAgICFjdHgubGF5b3V0Tm9kZSB8fCAhaXNEZWZpbmVkKGN0eC5sYXlvdXROb2RlLmRhdGFQb2ludGVyKSB8fCAhaGFzVmFsdWUoY3R4LmRhdGFJbmRleClcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBjb25zdCBjb250cm9sR3JvdXAgPSB0aGlzLmdldEZvcm1Db250cm9sR3JvdXAoY3R4KVxuICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldEZvcm1Db250cm9sTmFtZShjdHgpXG4gICAgcmV0dXJuIGNvbnRyb2xHcm91cCA/IGhhc093bihjb250cm9sR3JvdXAuY29udHJvbHMsIG5hbWUpIDogZmFsc2VcbiAgfVxuXG4gIGFkZEl0ZW0oY3R4OiBhbnksIG5hbWU/OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAoXG4gICAgICAhY3R4LmxheW91dE5vZGUgfHwgIWlzRGVmaW5lZChjdHgubGF5b3V0Tm9kZS4kcmVmKSB8fFxuICAgICAgIWhhc1ZhbHVlKGN0eC5kYXRhSW5kZXgpIHx8ICFoYXNWYWx1ZShjdHgubGF5b3V0SW5kZXgpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgYSBuZXcgQW5ndWxhciBmb3JtIGNvbnRyb2wgZnJvbSBhIHRlbXBsYXRlIGluIHRlbXBsYXRlUmVmTGlicmFyeVxuICAgIGNvbnN0IG5ld0Zvcm1Hcm91cCA9IGJ1aWxkRm9ybUdyb3VwKHRoaXMudGVtcGxhdGVSZWZMaWJyYXJ5W2N0eC5sYXlvdXROb2RlLiRyZWZdKVxuXG4gICAgLy8gQWRkIHRoZSBuZXcgZm9ybSBjb250cm9sIHRvIHRoZSBwYXJlbnQgZm9ybUFycmF5IG9yIGZvcm1Hcm91cFxuICAgIGlmIChjdHgubGF5b3V0Tm9kZS5hcnJheUl0ZW0pIHsgLy8gQWRkIG5ldyBhcnJheSBpdGVtIHRvIGZvcm1BcnJheVxuICAgICAgKHRoaXMuZ2V0Rm9ybUNvbnRyb2xHcm91cChjdHgpIGFzIGFueSkucHVzaChuZXdGb3JtR3JvdXApXG4gICAgfSBlbHNlIHsgLy8gQWRkIG5ldyAkcmVmIGl0ZW0gdG8gZm9ybUdyb3VwXG4gICAgICAodGhpcy5nZXRGb3JtQ29udHJvbEdyb3VwKGN0eCkgYXMgYW55KVxuICAgICAgICAuYWRkQ29udHJvbChuYW1lIHx8IHRoaXMuZ2V0Rm9ybUNvbnRyb2xOYW1lKGN0eCksIG5ld0Zvcm1Hcm91cClcbiAgICB9XG5cbiAgICAvLyBDb3B5IGEgbmV3IGxheW91dE5vZGUgZnJvbSBsYXlvdXRSZWZMaWJyYXJ5XG4gICAgY29uc3QgbmV3TGF5b3V0Tm9kZSA9IGdldExheW91dE5vZGUoY3R4LmxheW91dE5vZGUsIHRoaXMpXG4gICAgbmV3TGF5b3V0Tm9kZS5hcnJheUl0ZW0gPSBjdHgubGF5b3V0Tm9kZS5hcnJheUl0ZW1cbiAgICBpZiAoY3R4LmxheW91dE5vZGUuYXJyYXlJdGVtVHlwZSkge1xuICAgICAgbmV3TGF5b3V0Tm9kZS5hcnJheUl0ZW1UeXBlID0gY3R4LmxheW91dE5vZGUuYXJyYXlJdGVtVHlwZVxuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgbmV3TGF5b3V0Tm9kZS5hcnJheUl0ZW1UeXBlXG4gICAgfVxuICAgIGlmIChuYW1lKSB7XG4gICAgICBuZXdMYXlvdXROb2RlLm5hbWUgPSBuYW1lXG4gICAgICBuZXdMYXlvdXROb2RlLmRhdGFQb2ludGVyICs9ICcvJyArIEpzb25Qb2ludGVyLmVzY2FwZShuYW1lKVxuICAgICAgbmV3TGF5b3V0Tm9kZS5vcHRpb25zLnRpdGxlID0gZml4VGl0bGUobmFtZSlcbiAgICB9XG5cbiAgICAvLyBBZGQgdGhlIG5ldyBsYXlvdXROb2RlIHRvIHRoZSBmb3JtIGxheW91dFxuICAgIEpzb25Qb2ludGVyLmluc2VydCh0aGlzLmxheW91dCwgdGhpcy5nZXRMYXlvdXRQb2ludGVyKGN0eCksIG5ld0xheW91dE5vZGUpXG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgbW92ZUFycmF5SXRlbShjdHg6IGFueSwgb2xkSW5kZXg6IG51bWJlciwgbmV3SW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmIChcbiAgICAgICFjdHgubGF5b3V0Tm9kZSB8fCAhaXNEZWZpbmVkKGN0eC5sYXlvdXROb2RlLmRhdGFQb2ludGVyKSB8fFxuICAgICAgIWhhc1ZhbHVlKGN0eC5kYXRhSW5kZXgpIHx8ICFoYXNWYWx1ZShjdHgubGF5b3V0SW5kZXgpIHx8XG4gICAgICAhaXNEZWZpbmVkKG9sZEluZGV4KSB8fCAhaXNEZWZpbmVkKG5ld0luZGV4KSB8fCBvbGRJbmRleCA9PT0gbmV3SW5kZXhcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIE1vdmUgaXRlbSBpbiB0aGUgZm9ybUFycmF5XG4gICAgY29uc3QgZm9ybUFycmF5ID0gdGhpcy5nZXRGb3JtQ29udHJvbEdyb3VwKGN0eCkgYXMgRm9ybUFycmF5XG4gICAgY29uc3QgYXJyYXlJdGVtID0gZm9ybUFycmF5LmF0KG9sZEluZGV4KVxuICAgIGZvcm1BcnJheS5yZW1vdmVBdChvbGRJbmRleClcbiAgICBmb3JtQXJyYXkuaW5zZXJ0KG5ld0luZGV4LCBhcnJheUl0ZW0pXG4gICAgZm9ybUFycmF5LnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKVxuXG4gICAgLy8gTW92ZSBsYXlvdXQgaXRlbVxuICAgIGNvbnN0IGxheW91dEFycmF5ID0gdGhpcy5nZXRMYXlvdXRBcnJheShjdHgpXG4gICAgbGF5b3V0QXJyYXkuc3BsaWNlKG5ld0luZGV4LCAwLCBsYXlvdXRBcnJheS5zcGxpY2Uob2xkSW5kZXgsIDEpWzBdKVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICByZW1vdmVJdGVtKGN0eDogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKFxuICAgICAgIWN0eC5sYXlvdXROb2RlIHx8ICFpc0RlZmluZWQoY3R4LmxheW91dE5vZGUuZGF0YVBvaW50ZXIpIHx8XG4gICAgICAhaGFzVmFsdWUoY3R4LmRhdGFJbmRleCkgfHwgIWhhc1ZhbHVlKGN0eC5sYXlvdXRJbmRleClcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSB0aGUgQW5ndWxhciBmb3JtIGNvbnRyb2wgZnJvbSB0aGUgcGFyZW50IGZvcm1BcnJheSBvciBmb3JtR3JvdXBcbiAgICBpZiAoY3R4LmxheW91dE5vZGUuYXJyYXlJdGVtKSB7IC8vIFJlbW92ZSBhcnJheSBpdGVtIGZyb20gZm9ybUFycmF5XG4gICAgICAodGhpcy5nZXRGb3JtQ29udHJvbEdyb3VwKGN0eCkgYXMgRm9ybUFycmF5KVxuICAgICAgICAucmVtb3ZlQXQoY3R4LmRhdGFJbmRleFtjdHguZGF0YUluZGV4Lmxlbmd0aCAtIDFdKVxuICAgIH0gZWxzZSB7IC8vIFJlbW92ZSAkcmVmIGl0ZW0gZnJvbSBmb3JtR3JvdXBcbiAgICAgICh0aGlzLmdldEZvcm1Db250cm9sR3JvdXAoY3R4KSBhcyBGb3JtR3JvdXApXG4gICAgICAgIC5yZW1vdmVDb250cm9sKHRoaXMuZ2V0Rm9ybUNvbnRyb2xOYW1lKGN0eCkpXG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGxheW91dE5vZGUgZnJvbSBsYXlvdXRcbiAgICBKc29uUG9pbnRlci5yZW1vdmUodGhpcy5sYXlvdXQsIHRoaXMuZ2V0TGF5b3V0UG9pbnRlcihjdHgpKVxuICAgIHJldHVybiB0cnVlXG4gIH1cbn1cbiJdfQ==