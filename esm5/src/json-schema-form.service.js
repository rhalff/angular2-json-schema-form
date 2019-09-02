import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs-compat/Subject';
import * as Ajv from 'ajv';
import * as _ from 'lodash';
import { hasValue, isArray, isDefined, isEmpty, isObject } from './shared/validator.functions';
import { fixTitle, forEach, hasOwn, toTitleCase } from './shared/utility.functions';
import { JsonPointer } from './shared/jsonpointer.functions';
import { buildSchemaFromData, buildSchemaFromLayout, removeRecursiveReferences } from './shared/json-schema.functions';
import { buildFormGroup, buildFormGroupTemplate, formatFormData, getControl } from './shared/form-group.functions';
import { buildLayout, getLayoutNode } from './shared/layout.functions';
import { enValidationMessages } from './locale/en-validation-messages';
import { frValidationMessages } from './locale/fr-validation-messages';
var JsonSchemaFormService = /** @class */ (function () {
    function JsonSchemaFormService() {
        this.JsonFormCompatibility = false;
        this.ReactJsonSchemaFormCompatibility = false;
        this.AngularSchemaFormCompatibility = false;
        this.tpldata = {};
        this.ajvOptions = { allErrors: true, jsonPointers: true, unknownFormats: 'ignore' };
        this.ajv = new Ajv(this.ajvOptions); // AJV: Another JSON Schema Validator
        this.validateFormData = null; // Compiled AJV function to validate active form's schema
        this.formValues = {}; // Internal form data (may not have correct types)
        this.data = {}; // Output form data (formValues, formatted with correct data types)
        this.schema = {}; // Internal JSON Schema
        this.layout = []; // Internal form layout
        this.formGroupTemplate = {}; // Template used to create formGroup
        this.formGroup = null; // Angular formGroup, which powers the reactive form
        this.framework = null; // Active framework component
        this.validData = null; // Valid form data (or null) (=== isValid ? data : null)
        this.isValid = null; // Is current form data valid?
        this.ajvErrors = null; // Ajv errors for current data
        this.validationErrors = null; // Any validation errors for current data
        this.dataErrors = new Map(); //
        this.formValueSubscription = null; // Subscription to formGroup.valueChanges observable (for un- and re-subscribing)
        this.dataChanges = new Subject(); // Form data observable
        this.isValidChanges = new Subject(); // isValid observable
        this.validationErrorChanges = new Subject(); // validationErrors observable
        this.arrayMap = new Map(); // Maps arrays in data object and number of tuple values
        this.dataMap = new Map(); // Maps paths in form data to schema and formGroup paths
        this.dataRecursiveRefMap = new Map(); // Maps recursive reference points in form data
        this.schemaRecursiveRefMap = new Map(); // Maps recursive reference points in schema
        this.schemaRefLibrary = {}; // Library of schemas for resolving schema $refs
        this.layoutRefLibrary = { '': null }; // Library of layout nodes for adding to form
        this.templateRefLibrary = {}; // Library of formGroup templates for adding to form
        this.hasRootReference = false; // Does the form include a recursive reference to itself?
        this.language = 'en-US'; // Does the form include a recursive reference to itself?
        // Default global form options
        this.defaultFormOptions = {
            addSubmit: 'auto',
            // for addSubmit: true = always, false = never,
            // 'auto' = only if layout is undefined (form is built from schema alone)
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
            // true = always set (unless overridden by layout default or formValues)
            // false = never set
            // 'auto' = set in addable components, and everywhere if formValues not set
            setLayoutDefaults: 'auto',
            // true = always set (unless overridden by formValues)
            // false = never set
            // 'auto' = set in addable components, and everywhere if formValues not set
            validateOnRender: 'auto',
            // true = validate all fields immediately
            // false = only validate fields after they are touched by user
            // 'auto' = validate fields with values immediately, empty fields after they are touched
            widgets: {},
            defautWidgetOptions: {
                listItems: 1,
                addable: true,
                orderable: true,
                removable: true,
                enableErrorState: true,
                // disableErrorState: false, // Don't apply 'has-error' class when field fails validation?
                enableSuccessState: true,
                // disableSuccessState: false, // Don't apply 'has-success' class when field validates?
                feedback: false,
                feedbackOnRender: false,
                notitle: false,
                disabled: false,
                readonly: false,
                returnEmptyFields: true,
                validationMessages: {} // set by setLanguage()
            },
        };
        this.setLanguage(this.language);
        var draft6 = require('ajv/lib/refs/json-schema-draft-06.json');
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
    JsonSchemaFormService.prototype.getData = function () { return this.data; };
    JsonSchemaFormService.prototype.getSchema = function () { return this.schema; };
    JsonSchemaFormService.prototype.getLayout = function () { return this.layout; };
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
    /**
     * 'buildRemoteError' function
     *
     * Example errors:
     * {
     *   last_name: [ {
     *     message: 'Last name must by start with capital letter.',
     *     code: 'capital_letter'
     *   } ],
     *   email: [ {
     *     message: 'Email must be from example.com domain.',
     *     code: 'special_domain'
     *   }, {
     *     message: 'Email must contain an @ symbol.',
     *     code: 'at_symbol'
     *   } ]
     * }
     * @param {ErrorMessages} errors
     */
    JsonSchemaFormService.prototype.buildRemoteError = function (errors) {
        var _this = this;
        forEach(errors, function (value, key) {
            var e_1, _a;
            if (key in _this.formGroup.controls) {
                try {
                    for (var value_1 = tslib_1.__values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
                        var error = value_1_1.value;
                        var err = {};
                        err[error['code']] = error['message'];
                        _this.formGroup.get(key).setErrors(err, { emitEvent: true });
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
        });
    };
    JsonSchemaFormService.prototype.validateData = function (newValue, updateSubscriptions) {
        if (updateSubscriptions === void 0) { updateSubscriptions = true; }
        // Format raw form data to correct data types
        this.data = formatFormData(newValue, this.dataMap, this.dataRecursiveRefMap, this.arrayMap, this.formOptions.returnEmptyFields);
        this.isValid = this.validateFormData(this.data);
        this.validData = this.isValid ? this.data : null;
        var compileErrors = function (errors) {
            var compiledErrors = {};
            (errors || []).forEach(function (error) {
                if (!compiledErrors[error.dataPath]) {
                    compiledErrors[error.dataPath] = [];
                }
                compiledErrors[error.dataPath].push(error.message);
            });
            return compiledErrors;
        };
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
        this.formGroup = buildFormGroup(this.formGroupTemplate);
        if (this.formGroup) {
            this.compileAjvSchema();
            this.validateData(this.formGroup.value);
            // Set up observables to emit data and validation info when form data changes
            if (this.formValueSubscription) {
                this.formValueSubscription.unsubscribe();
            }
            this.formValueSubscription = this.formGroup.valueChanges
                .subscribe(function (formValue) { return _this.validateData(formValue); });
        }
    };
    JsonSchemaFormService.prototype.buildLayout = function (widgetLibrary) {
        this.layout = buildLayout(this, widgetLibrary);
    };
    JsonSchemaFormService.prototype.setOptions = function (newOptions) {
        if (isObject(newOptions)) {
            var addOptions = _.cloneDeep(newOptions);
            // Backward compatibility for 'defaultOptions' (renamed 'defautWidgetOptions')
            if (isObject(addOptions.defaultOptions)) {
                Object.assign(this.formOptions.defautWidgetOptions, addOptions.defaultOptions);
                delete addOptions.defaultOptions;
            }
            if (isObject(addOptions.defautWidgetOptions)) {
                Object.assign(this.formOptions.defautWidgetOptions, addOptions.defautWidgetOptions);
                delete addOptions.defautWidgetOptions;
            }
            Object.assign(this.formOptions, addOptions);
            // convert disableErrorState / disableSuccessState to enable...
            var globalDefaults_1 = this.formOptions.defautWidgetOptions;
            ['ErrorState', 'SuccessState']
                .filter(function (suffix) { return hasOwn(globalDefaults_1, 'disable' + suffix); })
                .forEach(function (suffix) {
                globalDefaults_1['enable' + suffix] = !globalDefaults_1['disable' + suffix];
                delete globalDefaults_1['disable' + suffix];
            });
        }
    };
    JsonSchemaFormService.prototype.compileAjvSchema = function () {
        if (!this.validateFormData) {
            // if 'ui:order' exists in properties, move it to root before compiling with ajv
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
        return text.replace(/{{(.+?)}}/g, function () {
            var a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                a[_i] = arguments[_i];
            }
            return _this.parseExpression(a[1], value, values, key, _this.tpldata);
        });
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
        if (['"', '\'', ' ', '||', '&&', '+'].every(function (delim) { return expression.indexOf(delim) === -1; })) {
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
        // TODO: Improve expression evaluation by parsing quoted strings first
        // let expressionArray = expression.match(/([^"']+|"[^"]+"|'[^']+')/g);
        if (expression.indexOf('||') > -1) {
            return expression.split('||').reduce(function (all, term) {
                return all || _this.parseExpression(term, value, values, key, tpldata);
            }, '');
        }
        if (expression.indexOf('&&') > -1) {
            return expression.split('&&').reduce(function (all, term) {
                return all && _this.parseExpression(term, value, values, key, tpldata);
            }, ' ').trim();
        }
        if (expression.indexOf('+') > -1) {
            return expression.split('+')
                .map(function (term) { return _this.parseExpression(term, value, values, key, tpldata); })
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
            this.parseText(ctx.options.title || toTitleCase(ctx.layoutNode.name), this.getFormControlValue(this), (this.getFormControlGroup(this) || {}).value, ctx.dataIndex[ctx.dataIndex.length - 1]);
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
            ctx.formControl.statusChanges.subscribe(function (status) {
                return ctx.options.errorMessage = status === 'VALID' ? null :
                    _this.formatErrors(ctx.formControl.errors, ctx.options.validationMessages);
            });
            ctx.formControl.valueChanges.subscribe(function (value) {
                if (!_.isEqual(ctx.controlValue, value)) {
                    ctx.controlValue = value;
                }
            });
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
        var addSpaces = function (string) { return string[0].toUpperCase() + (string.slice(1) || '')
            .replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' '); };
        var formatError = function (error) { return typeof error === 'object' ?
            Object.keys(error).map(function (key) {
                return error[key] === true ? addSpaces(key) :
                    error[key] === false ? 'Not ' + addSpaces(key) :
                        addSpaces(key) + ': ' + formatError(error[key]);
            }).join(', ') :
            addSpaces(error.toString()); };
        var messages = [];
        return Object.keys(errors)
            // Hide 'required' error, unless it is the only one
            .filter(function (errorKey) { return errorKey !== 'required' || Object.keys(errors).length === 1; })
            .map(function (errorKey) {
            // If validationMessages is a string, return it
            return typeof validationMessages === 'string' ? validationMessages :
                // If custom error message is a function, return function result
                typeof validationMessages[errorKey] === 'function' ?
                    validationMessages[errorKey](errors[errorKey]) :
                    // If custom error message is a string, replace placeholders and return
                    typeof validationMessages[errorKey] === 'string' ?
                        // Does error message have any {{property}} placeholders?
                        !/{{.+?}}/.test(validationMessages[errorKey]) ?
                            validationMessages[errorKey] :
                            // Replace {{property}} placeholders with values
                            Object.keys(errors[errorKey])
                                .reduce(function (errorMessage, errorProperty) { return errorMessage.replace(new RegExp('{{' + errorProperty + '}}', 'g'), errors[errorKey][errorProperty]); }, validationMessages[errorKey]) :
                        // If no custom error message, return formatted error data instead
                        addSpaces(errorKey) + ' Error: ' + formatError(errors[errorKey]);
        }).join('<br>');
    };
    JsonSchemaFormService.prototype.updateValue = function (ctx, value) {
        var e_2, _a;
        // Set value of current control
        ctx.controlValue = value;
        if (ctx.boundControl) {
            ctx.formControl.setValue(value);
            ctx.formControl.markAsDirty();
        }
        ctx.layoutNode.value = value;
        // Set values of any related controls in copyValueTo array
        if (isArray(ctx.options.copyValueTo)) {
            try {
                for (var _b = tslib_1.__values(ctx.options.copyValueTo), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        var formArray = this.getFormControl(ctx);
        // Remove all existing items
        while (formArray.value.length) {
            formArray.removeAt(0);
        }
        // Re-add an item for each checked box
        var refPointer = removeRecursiveReferences(ctx.layoutNode.dataPointer + '/-', this.dataRecursiveRefMap, this.arrayMap);
        try {
            for (var checkboxList_1 = tslib_1.__values(checkboxList), checkboxList_1_1 = checkboxList_1.next(); !checkboxList_1_1.done; checkboxList_1_1 = checkboxList_1.next()) {
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
        // Create a new Angular form control from a template in templateRefLibrary
        var newFormGroup = buildFormGroup(this.templateRefLibrary[ctx.layoutNode.$ref]);
        // Add the new form control to the parent formArray or formGroup
        if (ctx.layoutNode.arrayItem) { // Add new array item to formArray
            this.getFormControlGroup(ctx).push(newFormGroup);
        }
        else { // Add new $ref item to formGroup
            this.getFormControlGroup(ctx)
                .addControl(name || this.getFormControlName(ctx), newFormGroup);
        }
        // Copy a new layoutNode from layoutRefLibrary
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
        // Add the new layoutNode to the form layout
        JsonPointer.insert(this.layout, this.getLayoutPointer(ctx), newLayoutNode);
        return true;
    };
    JsonSchemaFormService.prototype.moveArrayItem = function (ctx, oldIndex, newIndex) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) ||
            !hasValue(ctx.dataIndex) || !hasValue(ctx.layoutIndex) ||
            !isDefined(oldIndex) || !isDefined(newIndex) || oldIndex === newIndex) {
            return false;
        }
        // Move item in the formArray
        var formArray = this.getFormControlGroup(ctx);
        var arrayItem = formArray.at(oldIndex);
        formArray.removeAt(oldIndex);
        formArray.insert(newIndex, arrayItem);
        formArray.updateValueAndValidity();
        // Move layout item
        var layoutArray = this.getLayoutArray(ctx);
        layoutArray.splice(newIndex, 0, layoutArray.splice(oldIndex, 1)[0]);
        return true;
    };
    JsonSchemaFormService.prototype.removeItem = function (ctx) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) ||
            !hasValue(ctx.dataIndex) || !hasValue(ctx.layoutIndex)) {
            return false;
        }
        // Remove the Angular form control from the parent formArray or formGroup
        if (ctx.layoutNode.arrayItem) { // Remove array item from formArray
            this.getFormControlGroup(ctx)
                .removeAt(ctx.dataIndex[ctx.dataIndex.length - 1]);
        }
        else { // Remove $ref item from formGroup
            this.getFormControlGroup(ctx)
                .removeControl(this.getFormControlName(ctx));
        }
        // Remove layoutNode from layout
        JsonPointer.remove(this.layout, this.getLayoutPointer(ctx));
        return true;
    };
    JsonSchemaFormService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], JsonSchemaFormService);
    return JsonSchemaFormService;
}());
export { JsonSchemaFormService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcjItanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbInNyYy9qc29uLXNjaGVtYS1mb3JtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTlDLE9BQU8sS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE9BQU8sRUFDTCxRQUFRLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUNoRCxNQUFNLDhCQUE4QixDQUFDO0FBQ3RDLE9BQU8sRUFDTCxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQ3ZDLE1BQU0sNEJBQTRCLENBQUM7QUFDcEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdELE9BQU8sRUFDTCxtQkFBbUIsRUFBRSxxQkFBcUIsRUFBRSx5QkFBeUIsRUFFdEUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN4QyxPQUFPLEVBQ0wsY0FBYyxFQUFFLHNCQUFzQixFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQ25FLE1BQU0sK0JBQStCLENBQUM7QUFDdkMsT0FBTyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQVd2RTtJQXVGRTtRQXRGQSwwQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDOUIscUNBQWdDLEdBQUcsS0FBSyxDQUFDO1FBQ3pDLG1DQUE4QixHQUFHLEtB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LENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNoRDtRQUVELGdDQUFnQztRQUNoQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDNUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBbm9CVSxxQkFBcUI7UUFEakMsVUFBVSxFQUFFOztPQUNBLHFCQUFxQixDQW9vQmpDO0lBQUQsNEJBQUM7Q0FBQSxBQXBvQkQsSUFvb0JDO1NBcG9CWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEZvcm1BcnJheSwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy1jb21wYXQvb3BlcmF0b3JzL2ZpbHRlcic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy1jb21wYXQvU3ViamVjdCc7XG5cbmltcG9ydCAqIGFzIEFqdiBmcm9tICdhanYnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQge1xuICBoYXNWYWx1ZSwgaXNBcnJheSwgaXNEZWZpbmVkLCBpc0VtcHR5LCBpc09iamVjdCwgaXNTdHJpbmdcbn0gZnJvbSAnLi9zaGFyZWQvdmFsaWRhdG9yLmZ1bmN0aW9ucyc7XG5pbXBvcnQge1xuICBmaXhUaXRsZSwgZm9yRWFjaCwgaGFzT3duLCB0b1RpdGxlQ2FzZVxufSBmcm9tICcuL3NoYXJlZC91dGlsaXR5LmZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBKc29uUG9pbnRlciB9IGZyb20gJy4vc2hhcmVkL2pzb25wb2ludGVyLmZ1bmN0aW9ucyc7XG5pbXBvcnQge1xuICBidWlsZFNjaGVtYUZyb21EYXRhLCBidWlsZFNjaGVtYUZyb21MYXlvdXQsIHJlbW92ZVJlY3Vyc2l2ZVJlZmVyZW5jZXMsXG4gIHJlc29sdmVTY2hlbWFSZWZlcmVuY2VzXG59IGZyb20gJy4vc2hhcmVkL2pzb24tc2NoZW1hLmZ1bmN0aW9ucyc7XG5pbXBvcnQge1xuICBidWlsZEZvcm1Hcm91cCwgYnVpbGRGb3JtR3JvdXBUZW1wbGF0ZSwgZm9ybWF0Rm9ybURhdGEsIGdldENvbnRyb2xcbn0gZnJvbSAnLi9zaGFyZWQvZm9ybS1ncm91cC5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgYnVpbGRMYXlvdXQsIGdldExheW91dE5vZGUgfSBmcm9tICcuL3NoYXJlZC9sYXlvdXQuZnVuY3Rpb25zJztcbmltcG9ydCB7IGVuVmFsaWRhdGlvbk1lc3NhZ2VzIH0gZnJvbSAnLi9sb2NhbGUvZW4tdmFsaWRhdGlvbi1tZXNzYWdlcyc7XG5pbXBvcnQgeyBmclZhbGlkYXRpb25NZXNzYWdlcyB9IGZyb20gJy4vbG9jYWxlL2ZyLXZhbGlkYXRpb24tbWVzc2FnZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRpdGxlTWFwSXRlbSB7XG4gIG5hbWU/OiBzdHJpbmc7IHZhbHVlPzogYW55OyBjaGVja2VkPzogYm9vbGVhbjsgZ3JvdXA/OiBzdHJpbmc7IGl0ZW1zPzogVGl0bGVNYXBJdGVtW107XG59XG5leHBvcnQgaW50ZXJmYWNlIEVycm9yTWVzc2FnZXMge1xuICBbY29udHJvbF9uYW1lOiBzdHJpbmddOiB7IG1lc3NhZ2U6IHN0cmluZ3xGdW5jdGlvbnxPYmplY3QsIGNvZGU6IHN0cmluZyB9W107XG59XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEpzb25TY2hlbWFGb3JtU2VydmljZSB7XG4gIEpzb25Gb3JtQ29tcGF0aWJpbGl0eSA9IGZhbHNlO1xuICBSZWFjdEpzb25TY2hlbWFGb3JtQ29tcGF0aWJpbGl0eSA9IGZhbHNlO1xuICBBbmd1bGFyU2NoZW1hRm9ybUNvbXBhdGliaWxpdHkgPSBmYWxzZTtcbiAgdHBsZGF0YTogYW55ID0ge307XG5cbiAgYWp2T3B0aW9uczogYW55ID0geyBhbGxFcnJvcnM6IHRydWUsIGpzb25Qb2ludGVyczogdHJ1ZSwgdW5rbm93bkZvcm1hdHM6ICdpZ25vcmUnIH07XG4gIGFqdjogYW55ID0gbmV3IEFqdih0aGlzLmFqdk9wdGlvbnMpOyAvLyBBSlY6IEFub3RoZXIgSlNPTiBTY2hlbWEgVmFsaWRhdG9yXG5cbiAgdmFsaWRhdGVGb3JtRGF0YTogYW55ID0gbnVsbDsgLy8gQ29tcGlsZWQgQUpWIGZ1bmN0aW9uIHRvIHZhbGlkYXRlIGFjdGl2ZSBmb3JtJ3Mgc2NoZW1hXG5cbiAgZm9ybVZhbHVlczogYW55ID0ge307IC8vIEludGVybmFsIGZvcm0gZGF0YSAobWF5IG5vdCBoYXZlIGNvcnJlY3QgdHlwZXMpXG4gIGRhdGE6IGFueSA9IHt9OyAvLyBPdXRwdXQgZm9ybSBkYXRhIChmb3JtVmFsdWVzLCBmb3JtYXR0ZWQgd2l0aCBjb3JyZWN0IGRhdGEgdHlwZXMpXG4gIHNjaGVtYTogYW55ID0ge307IC8vIEludGVybmFsIEpTT04gU2NoZW1hXG4gIGxheW91dDogYW55W10gPSBbXTsgLy8gSW50ZXJuYWwgZm9ybSBsYXlvdXRcbiAgZm9ybUdyb3VwVGVtcGxhdGU6IGFueSA9IHt9OyAvLyBUZW1wbGF0ZSB1c2VkIHRvIGNyZWF0ZSBmb3JtR3JvdXBcbiAgZm9ybUdyb3VwOiBhbnkgPSBudWxsOyAvLyBBbmd1bGFyIGZvcm1Hcm91cCwgd2hpY2ggcG93ZXJzIHRoZSByZWFjdGl2ZSBmb3JtXG4gIGZyYW1ld29yazogYW55ID0gbnVsbDsgLy8gQWN0aXZlIGZyYW1ld29yayBjb21wb25lbnRcbiAgZm9ybU9wdGlvbnM6IGFueTsgLy8gQWN0aXZlIG9wdGlvbnMsIHVzZWQgdG8gY29uZmlndXJlIHRoZSBmb3JtXG5cbiAgdmFsaWREYXRhOiBhbnkgPSBudWxsOyAvLyBWYWxpZCBmb3JtIGRhdGEgKG9yIG51bGwpICg9PT0gaXNWYWxpZCA/IGRhdGEgOiBudWxsKVxuICBpc1ZhbGlkOiBib29sZWFuID0gbnVsbDsgLy8gSXMgY3VycmVudCBmb3JtIGRhdGEgdmFsaWQ/XG4gIGFqdkVycm9yczogYW55ID0gbnVsbDsgLy8gQWp2IGVycm9ycyBmb3IgY3VycmVudCBkYXRhXG4gIHZhbGlkYXRpb25FcnJvcnM6IGFueSA9IG51bGw7IC8vIEFueSB2YWxpZGF0aW9uIGVycm9ycyBmb3IgY3VycmVudCBkYXRhXG4gIGRhdGFFcnJvcnM6IGFueSA9IG5ldyBNYXAoKTsgLy9cbiAgZm9ybVZhbHVlU3Vic2NyaXB0aW9uOiBhbnkgPSBudWxsOyAvLyBTdWJzY3JpcHRpb24gdG8gZm9ybUdyb3VwLnZhbHVlQ2hhbmdlcyBvYnNlcnZhYmxlIChmb3IgdW4tIGFuZCByZS1zdWJzY3JpYmluZylcbiAgZGF0YUNoYW5nZXM6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7IC8vIEZvcm0gZGF0YSBvYnNlcnZhYmxlXG4gIGlzVmFsaWRDaGFuZ2VzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpOyAvLyBpc1ZhbGlkIG9ic2VydmFibGVcbiAgdmFsaWRhdGlvbkVycm9yQ2hhbmdlczogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTsgLy8gdmFsaWRhdGlvbkVycm9ycyBvYnNlcnZhYmxlXG5cbiAgYXJyYXlNYXA6IE1hcDxzdHJpbmcsIG51bWJlcj4gPSBuZXcgTWFwKCk7IC8vIE1hcHMgYXJyYXlzIGluIGRhdGEgb2JqZWN0IGFuZCBudW1iZXIgb2YgdHVwbGUgdmFsdWVzXG4gIGRhdGFNYXA6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwKCk7IC8vIE1hcHMgcGF0aHMgaW4gZm9ybSBkYXRhIHRvIHNjaGVtYSBhbmQgZm9ybUdyb3VwIHBhdGhzXG4gIGRhdGFSZWN1cnNpdmVSZWZNYXA6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBuZXcgTWFwKCk7IC8vIE1hcHMgcmVjdXJzaXZlIHJlZmVyZW5jZSBwb2ludHMgaW4gZm9ybSBkYXRhXG4gIHNjaGVtYVJlY3Vyc2l2ZVJlZk1hcDogTWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKTsgLy8gTWFwcyByZWN1cnNpdmUgcmVmZXJlbmNlIHBvaW50cyBpbiBzY2hlbWFcbiAgc2NoZW1hUmVmTGlicmFyeTogYW55ID0ge307IC8vIExpYnJhcnkgb2Ygc2NoZW1hcyBmb3IgcmVzb2x2aW5nIHNjaGVtYSAkcmVmc1xuICBsYXlvdXRSZWZMaWJyYXJ5OiBhbnkgPSB7ICcnOiBudWxsIH07IC8vIExpYnJhcnkgb2YgbGF5b3V0IG5vZGVzIGZvciBhZGRpbmcgdG8gZm9ybVxuICB0ZW1wbGF0ZVJlZkxpYnJhcnk6IGFueSA9IHt9OyAvLyBMaWJyYXJ5IG9mIGZvcm1Hcm91cCB0ZW1wbGF0ZXMgZm9yIGFkZGluZyB0byBmb3JtXG4gIGhhc1Jvb3RSZWZlcmVuY2UgPSBmYWxzZTsgLy8gRG9lcyB0aGUgZm9ybSBpbmNsdWRlIGEgcmVjdXJzaXZlIHJlZmVyZW5jZSB0byBpdHNlbGY/XG5cbiAgbGFuZ3VhZ2UgPSAnZW4tVVMnOyAvLyBEb2VzIHRoZSBmb3JtIGluY2x1ZGUgYSByZWN1cnNpdmUgcmVmZXJlbmNlIHRvIGl0c2VsZj9cblxuICAvLyBEZWZhdWx0IGdsb2JhbCBmb3JtIG9wdGlvbnNcbiAgZGVmYXVsdEZvcm1PcHRpb25zOiBhbnkgPSB7XG4gICAgYWRkU3VibWl0OiAnYXV0bycsIC8vIEFkZCBhIHN1Ym1pdCBidXR0b24gaWYgbGF5b3V0IGRvZXMgbm90IGhhdmUgb25lP1xuICAgICAgLy8gZm9yIGFkZFN1Ym1pdDogdHJ1ZSA9IGFsd2F5cywgZmFsc2UgPSBuZXZlcixcbiAgICAgIC8vICdhdXRvJyA9IG9ubHkgaWYgbGF5b3V0IGlzIHVuZGVmaW5lZCAoZm9ybSBpcyBidWlsdCBmcm9tIHNjaGVtYSBhbG9uZSlcbiAgICBkZWJ1ZzogZmFsc2UsIC8vIFNob3cgZGVidWdnaW5nIG91dHB1dD9cbiAgICBkaXNhYmxlSW52YWxpZFN1Ym1pdDogdHJ1ZSwgLy8gRGlzYWJsZSBzdWJtaXQgaWYgZm9ybSBpbnZhbGlkP1xuICAgIGZvcm1EaXNhYmxlZDogZmFsc2UsIC8vIFNldCBlbnRpcmUgZm9ybSBhcyBkaXNhYmxlZD8gKG5vdCBlZGl0YWJsZSwgYW5kIGRpc2FibGVzIG91dHB1dHMpXG4gICAgZm9ybVJlYWRvbmx5OiBmYWxzZSwgLy8gU2V0IGVudGlyZSBmb3JtIGFzIHJlYWQgb25seT8gKG5vdCBlZGl0YWJsZSwgYnV0IG91dHB1dHMgc3RpbGwgZW5hYmxlZClcbiAgICBmaWVsZHNSZXF1aXJlZDogZmFsc2UsIC8vIChzZXQgYXV0b21hdGljYWxseSkgQXJlIHRoZXJlIGFueSByZXF1aXJlZCBmaWVsZHMgaW4gdGhlIGZvcm0/XG4gICAgZnJhbWV3b3JrOiAnbm8tZnJhbWV3b3JrJywgLy8gVGhlIGZyYW1ld29yayB0byBsb2FkXG4gICAgbG9hZEV4dGVybmFsQXNzZXRzOiBmYWxzZSwgLy8gTG9hZCBleHRlcm5hbCBjc3MgYW5kIEphdmFTY3JpcHQgZm9yIGZyYW1ld29yaz9cbiAgICBwcmlzdGluZTogeyBlcnJvcnM6IHRydWUsIHN1Y2Nlc3M6IHRydWUgfSxcbiAgICBzdXByZXNzUHJvcGVydHlUaXRsZXM6IGZhbHNlLFxuICAgIHNldFNjaGVtYURlZmF1bHRzOiAnYXV0bycsIC8vIFNldCBmZWZhdWx0IHZhbHVlcyBmcm9tIHNjaGVtYT9cbiAgICAgIC8vIHRydWUgPSBhbHdheXMgc2V0ICh1bmxlc3Mgb3ZlcnJpZGRlbiBieSBsYXlvdXQgZGVmYXVsdCBvciBmb3JtVmFsdWVzKVxuICAgICAgLy8gZmFsc2UgPSBuZXZlciBzZXRcbiAgICAgIC8vICdhdXRvJyA9IHNldCBpbiBhZGRhYmxlIGNvbXBvbmVudHMsIGFuZCBldmVyeXdoZXJlIGlmIGZvcm1WYWx1ZXMgbm90IHNldFxuICAgIHNldExheW91dERlZmF1bHRzOiAnYXV0bycsIC8vIFNldCBmZWZhdWx0IHZhbHVlcyBmcm9tIGxheW91dD9cbiAgICAgIC8vIHRydWUgPSBhbHdheXMgc2V0ICh1bmxlc3Mgb3ZlcnJpZGRlbiBieSBmb3JtVmFsdWVzKVxuICAgICAgLy8gZmFsc2UgPSBuZXZlciBzZXRcbiAgICAgIC8vICdhdXRvJyA9IHNldCBpbiBhZGRhYmxlIGNvbXBvbmVudHMsIGFuZCBldmVyeXdoZXJlIGlmIGZvcm1WYWx1ZXMgbm90IHNldFxuICAgIHZhbGlkYXRlT25SZW5kZXI6ICdhdXRvJywgLy8gVmFsaWRhdGUgZmllbGRzIGltbWVkaWF0ZWx5LCBiZWZvcmUgdGhleSBhcmUgdG91Y2hlZD9cbiAgICAgIC8vIHRydWUgPSB2YWxpZGF0ZSBhbGwgZmllbGRzIGltbWVkaWF0ZWx5XG4gICAgICAvLyBmYWxzZSA9IG9ubHkgdmFsaWRhdGUgZmllbGRzIGFmdGVyIHRoZXkgYXJlIHRvdWNoZWQgYnkgdXNlclxuICAgICAgLy8gJ2F1dG8nID0gdmFsaWRhdGUgZmllbGRzIHdpdGggdmFsdWVzIGltbWVkaWF0ZWx5LCBlbXB0eSBmaWVsZHMgYWZ0ZXIgdGhleSBhcmUgdG91Y2hlZFxuICAgIHdpZGdldHM6IHt9LCAvLyBBbnkgY3VzdG9tIHdpZGdldHMgdG8gbG9hZFxuICAgIGRlZmF1dFdpZGdldE9wdGlvbnM6IHsgLy8gRGVmYXVsdCBvcHRpb25zIGZvciBmb3JtIGNvbnRyb2wgd2lkZ2V0c1xuICAgICAgbGlzdEl0ZW1zOiAxLCAvLyBOdW1iZXIgb2YgbGlzdCBpdGVtcyB0byBpbml0aWFsbHkgYWRkIHRvIGFycmF5cyB3aXRoIG5vIGRlZmF1bHQgdmFsdWVcbiAgICAgIGFkZGFibGU6IHRydWUsIC8vIEFsbG93IGFkZGluZyBpdGVtcyB0byBhbiBhcnJheSBvciAkcmVmIHBvaW50P1xuICAgICAgb3JkZXJhYmxlOiB0cnVlLCAvLyBBbGxvdyByZW9yZGVyaW5nIGl0ZW1zIHdpdGhpbiBhbiBhcnJheT9cbiAgICAgIHJlbW92YWJsZTogdHJ1ZSwgLy8gQWxsb3cgcmVtb3ZpbmcgaXRlbXMgZnJvbSBhbiBhcnJheSBvciAkcmVmIHBvaW50P1xuICAgICAgZW5hYmxlRXJyb3JTdGF0ZTogdHJ1ZSwgLy8gQXBwbHkgJ2hhcy1lcnJvcicgY2xhc3Mgd2hlbiBmaWVsZCBmYWlscyB2YWxpZGF0aW9uP1xuICAgICAgLy8gZGlzYWJsZUVycm9yU3RhdGU6IGZhbHNlLCAvLyBEb24ndCBhcHBseSAnaGFzLWVycm9yJyBjbGFzcyB3aGVuIGZpZWxkIGZhaWxzIHZhbGlkYXRpb24/XG4gICAgICBlbmFibGVTdWNjZXNzU3RhdGU6IHRydWUsIC8vIEFwcGx5ICdoYXMtc3VjY2VzcycgY2xhc3Mgd2hlbiBmaWVsZCB2YWxpZGF0ZXM/XG4gICAgICAvLyBkaXNhYmxlU3VjY2Vzc1N0YXRlOiBmYWxzZSwgLy8gRG9uJ3QgYXBwbHkgJ2hhcy1zdWNjZXNzJyBjbGFzcyB3aGVuIGZpZWxkIHZhbGlkYXRlcz9cbiAgICAgIGZlZWRiYWNrOiBmYWxzZSwgLy8gU2hvdyBpbmxpbmUgZmVlZGJhY2sgaWNvbnM/XG4gICAgICBmZWVkYmFja09uUmVuZGVyOiBmYWxzZSwgLy8gU2hvdyBlcnJvck1lc3NhZ2Ugb24gUmVuZGVyP1xuICAgICAgbm90aXRsZTogZmFsc2UsIC8vIEhpZGUgdGl0bGU/XG4gICAgICBkaXNhYmxlZDogZmFsc2UsIC8vIFNldCBjb250cm9sIGFzIGRpc2FibGVkPyAobm90IGVkaXRhYmxlLCBhbmQgZXhjbHVkZWQgZnJvbSBvdXRwdXQpXG4gICAgICByZWFkb25seTogZmFsc2UsIC8vIFNldCBjb250cm9sIGFzIHJlYWQgb25seT8gKG5vdCBlZGl0YWJsZSwgYnV0IGluY2x1ZGVkIGluIG91dHB1dClcbiAgICAgIHJldHVybkVtcHR5RmllbGRzOiB0cnVlLCAvLyByZXR1cm4gdmFsdWVzIGZvciBmaWVsZHMgdGhhdCBjb250YWluIG5vIGRhdGE/XG4gICAgICB2YWxpZGF0aW9uTWVzc2FnZXM6IHt9IC8vIHNldCBieSBzZXRMYW5ndWFnZSgpXG4gICAgfSxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNldExhbmd1YWdlKHRoaXMubGFuZ3VhZ2UpO1xuXG4gICAgY29uc3QgZHJhZnQ2ID0gcmVxdWlyZSgnYWp2L2xpYi9yZWZzL2pzb24tc2NoZW1hLWRyYWZ0LTA2Lmpzb24nKTtcblxuICAgIHRoaXMuYWp2LmFkZE1ldGFTY2hlbWEoZHJhZnQ2KTtcbiAgfVxuXG4gIHNldExhbmd1YWdlKGxhbmd1YWdlOiBzdHJpbmcgPSAnZW4tVVMnKSB7XG4gICAgdGhpcy5sYW5ndWFnZSA9IGxhbmd1YWdlO1xuICAgIGNvbnN0IHZhbGlkYXRpb25NZXNzYWdlcyA9IGxhbmd1YWdlLnNsaWNlKDAsIDIpID09PSAnZnInID9cbiAgICAgIGZyVmFsaWRhdGlvbk1lc3NhZ2VzIDogZW5WYWxpZGF0aW9uTWVzc2FnZXM7XG4gICAgdGhpcy5kZWZhdWx0Rm9ybU9wdGlvbnMuZGVmYXV0V2lkZ2V0T3B0aW9ucy52YWxpZGF0aW9uTWVzc2FnZXMgPVxuICAgICAgXy5jbG9uZURlZXAodmFsaWRhdGlvbk1lc3NhZ2VzKTtcbiAgfVxuXG4gIGdldERhdGEoKSB7IHJldHVybiB0aGlzLmRhdGE7IH1cblxuICBnZXRTY2hlbWEoKSB7IHJldHVybiB0aGlzLnNjaGVtYTsgfVxuXG4gIGdldExheW91dCgpIHsgcmV0dXJuIHRoaXMubGF5b3V0OyB9XG5cbiAgcmVzZXRBbGxWYWx1ZXMoKSB7XG4gICAgdGhpcy5Kc29uRm9ybUNvbXBhdGliaWxpdHkgPSBmYWxzZTtcbiAgICB0aGlzLlJlYWN0SnNvblNjaGVtYUZvcm1Db21wYXRpYmlsaXR5ID0gZmFsc2U7XG4gICAgdGhpcy5Bbmd1bGFyU2NoZW1hRm9ybUNvbXBhdGliaWxpdHkgPSBmYWxzZTtcbiAgICB0aGlzLnRwbGRhdGEgPSB7fTtcbiAgICB0aGlzLnZhbGlkYXRlRm9ybURhdGEgPSBudWxsO1xuICAgIHRoaXMuZm9ybVZhbHVlcyA9IHt9O1xuICAgIHRoaXMuc2NoZW1hID0ge307XG4gICAgdGhpcy5sYXlvdXQgPSBbXTtcbiAgICB0aGlzLmZvcm1Hcm91cFRlbXBsYXRlID0ge307XG4gICAgdGhpcy5mb3JtR3JvdXAgPSBudWxsO1xuICAgIHRoaXMuZnJhbWV3b3JrID0gbnVsbDtcbiAgICB0aGlzLmRhdGEgPSB7fTtcbiAgICB0aGlzLnZhbGlkRGF0YSA9IG51bGw7XG4gICAgdGhpcy5pc1ZhbGlkID0gbnVsbDtcbiAgICB0aGlzLnZhbGlkYXRpb25FcnJvcnMgPSBudWxsO1xuICAgIHRoaXMuYXJyYXlNYXAgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5kYXRhTWFwID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuZGF0YVJlY3Vyc2l2ZVJlZk1hcCA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLnNjaGVtYVJlY3Vyc2l2ZVJlZk1hcCA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmxheW91dFJlZkxpYnJhcnkgPSB7fTtcbiAgICB0aGlzLnNjaGVtYVJlZkxpYnJhcnkgPSB7fTtcbiAgICB0aGlzLnRlbXBsYXRlUmVmTGlicmFyeSA9IHt9O1xuICAgIHRoaXMuZm9ybU9wdGlvbnMgPSBfLmNsb25lRGVlcCh0aGlzLmRlZmF1bHRGb3JtT3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogJ2J1aWxkUmVtb3RlRXJyb3InIGZ1bmN0aW9uXG4gICAqXG4gICAqIEV4YW1wbGUgZXJyb3JzOlxuICAgKiB7XG4gICAqICAgbGFzdF9uYW1lOiBbIHtcbiAgICogICAgIG1lc3NhZ2U6ICdMYXN0IG5hbWUgbXVzdCBieSBzdGFydCB3aXRoIGNhcGl0YWwgbGV0dGVyLicsXG4gICAqICAgICBjb2RlOiAnY2FwaXRhbF9sZXR0ZXInXG4gICAqICAgfSBdLFxuICAgKiAgIGVtYWlsOiBbIHtcbiAgICogICAgIG1lc3NhZ2U6ICdFbWFpbCBtdXN0IGJlIGZyb20gZXhhbXBsZS5jb20gZG9tYWluLicsXG4gICAqICAgICBjb2RlOiAnc3BlY2lhbF9kb21haW4nXG4gICAqICAgfSwge1xuICAgKiAgICAgbWVzc2FnZTogJ0VtYWlsIG11c3QgY29udGFpbiBhbiBAIHN5bWJvbC4nLFxuICAgKiAgICAgY29kZTogJ2F0X3N5bWJvbCdcbiAgICogICB9IF1cbiAgICogfVxuICAgKiBAcGFyYW0ge0Vycm9yTWVzc2FnZXN9IGVycm9yc1xuICAgKi9cbiAgYnVpbGRSZW1vdGVFcnJvcihlcnJvcnM6IEVycm9yTWVzc2FnZXMpIHtcbiAgICBmb3JFYWNoKGVycm9ycywgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgIGlmIChrZXkgaW4gdGhpcy5mb3JtR3JvdXAuY29udHJvbHMpIHtcbiAgICAgICAgZm9yIChjb25zdCBlcnJvciBvZiB2YWx1ZSkge1xuICAgICAgICAgIGNvbnN0IGVyciA9IHt9O1xuICAgICAgICAgIGVycltlcnJvclsnY29kZSddXSA9IGVycm9yWydtZXNzYWdlJ107XG4gICAgICAgICAgdGhpcy5mb3JtR3JvdXAuZ2V0KGtleSkuc2V0RXJyb3JzKGVyciwgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHZhbGlkYXRlRGF0YShuZXdWYWx1ZTogYW55LCB1cGRhdGVTdWJzY3JpcHRpb25zID0gdHJ1ZSk6IHZvaWQge1xuXG4gICAgLy8gRm9ybWF0IHJhdyBmb3JtIGRhdGEgdG8gY29ycmVjdCBkYXRhIHR5cGVzXG4gICAgdGhpcy5kYXRhID0gZm9ybWF0Rm9ybURhdGEoXG4gICAgICBuZXdWYWx1ZSwgdGhpcy5kYXRhTWFwLCB0aGlzLmRhdGFSZWN1cnNpdmVSZWZNYXAsXG4gICAgICB0aGlzLmFycmF5TWFwLCB0aGlzLmZvcm1PcHRpb25zLnJldHVybkVtcHR5RmllbGRzXG4gICAgKTtcbiAgICB0aGlzLmlzVmFsaWQgPSB0aGlzLnZhbGlkYXRlRm9ybURhdGEodGhpcy5kYXRhKTtcbiAgICB0aGlzLnZhbGlkRGF0YSA9IHRoaXMuaXNWYWxpZCA/IHRoaXMuZGF0YSA6IG51bGw7XG4gICAgY29uc3QgY29tcGlsZUVycm9ycyA9IGVycm9ycyA9PiB7XG4gICAgICBjb25zdCBjb21waWxlZEVycm9ycyA9IHt9O1xuICAgICAgKGVycm9ycyB8fCBbXSkuZm9yRWFjaChlcnJvciA9PiB7XG4gICAgICAgIGlmICghY29tcGlsZWRFcnJvcnNbZXJyb3IuZGF0YVBhdGhdKSB7IGNvbXBpbGVkRXJyb3JzW2Vycm9yLmRhdGFQYXRoXSA9IFtdOyB9XG4gICAgICAgIGNvbXBpbGVkRXJyb3JzW2Vycm9yLmRhdGFQYXRoXS5wdXNoKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gY29tcGlsZWRFcnJvcnM7XG4gICAgfTtcbiAgICB0aGlzLmFqdkVycm9ycyA9IHRoaXMudmFsaWRhdGVGb3JtRGF0YS5lcnJvcnM7XG4gICAgdGhpcy52YWxpZGF0aW9uRXJyb3JzID0gY29tcGlsZUVycm9ycyh0aGlzLnZhbGlkYXRlRm9ybURhdGEuZXJyb3JzKTtcbiAgICBpZiAodXBkYXRlU3Vic2NyaXB0aW9ucykge1xuICAgICAgdGhpcy5kYXRhQ2hhbmdlcy5uZXh0KHRoaXMuZGF0YSk7XG4gICAgICB0aGlzLmlzVmFsaWRDaGFuZ2VzLm5leHQodGhpcy5pc1ZhbGlkKTtcbiAgICAgIHRoaXMudmFsaWRhdGlvbkVycm9yQ2hhbmdlcy5uZXh0KHRoaXMuYWp2RXJyb3JzKTtcbiAgICB9XG4gIH1cblxuICBidWlsZEZvcm1Hcm91cFRlbXBsYXRlKGZvcm1WYWx1ZXM6IGFueSA9IG51bGwsIHNldFZhbHVlcyA9IHRydWUpIHtcbiAgICB0aGlzLmZvcm1Hcm91cFRlbXBsYXRlID0gYnVpbGRGb3JtR3JvdXBUZW1wbGF0ZSh0aGlzLCBmb3JtVmFsdWVzLCBzZXRWYWx1ZXMpO1xuICB9XG5cbiAgYnVpbGRGb3JtR3JvdXAoKSB7XG4gICAgdGhpcy5mb3JtR3JvdXAgPSA8Rm9ybUdyb3VwPmJ1aWxkRm9ybUdyb3VwKHRoaXMuZm9ybUdyb3VwVGVtcGxhdGUpO1xuICAgIGlmICh0aGlzLmZvcm1Hcm91cCkge1xuICAgICAgdGhpcy5jb21waWxlQWp2U2NoZW1hKCk7XG4gICAgICB0aGlzLnZhbGlkYXRlRGF0YSh0aGlzLmZvcm1Hcm91cC52YWx1ZSk7XG5cbiAgICAgIC8vIFNldCB1cCBvYnNlcnZhYmxlcyB0byBlbWl0IGRhdGEgYW5kIHZhbGlkYXRpb24gaW5mbyB3aGVuIGZvcm0gZGF0YSBjaGFuZ2VzXG4gICAgICBpZiAodGhpcy5mb3JtVmFsdWVTdWJzY3JpcHRpb24pIHsgdGhpcy5mb3JtVmFsdWVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTsgfVxuICAgICAgdGhpcy5mb3JtVmFsdWVTdWJzY3JpcHRpb24gPSB0aGlzLmZvcm1Hcm91cC52YWx1ZUNoYW5nZXNcbiAgICAgICAgLnN1YnNjcmliZShmb3JtVmFsdWUgPT4gdGhpcy52YWxpZGF0ZURhdGEoZm9ybVZhbHVlKSk7XG4gICAgfVxuICB9XG5cbiAgYnVpbGRMYXlvdXQod2lkZ2V0TGlicmFyeTogYW55KSB7XG4gICAgdGhpcy5sYXlvdXQgPSBidWlsZExheW91dCh0aGlzLCB3aWRnZXRMaWJyYXJ5KTtcbiAgfVxuXG4gIHNldE9wdGlvbnMobmV3T3B0aW9uczogYW55KSB7XG4gICAgaWYgKGlzT2JqZWN0KG5ld09wdGlvbnMpKSB7XG4gICAgICBjb25zdCBhZGRPcHRpb25zID0gXy5jbG9uZURlZXAobmV3T3B0aW9ucyk7XG4gICAgICAvLyBCYWNrd2FyZCBjb21wYXRpYmlsaXR5IGZvciAnZGVmYXVsdE9wdGlvbnMnIChyZW5hbWVkICdkZWZhdXRXaWRnZXRPcHRpb25zJylcbiAgICAgIGlmIChpc09iamVjdChhZGRPcHRpb25zLmRlZmF1bHRPcHRpb25zKSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuZm9ybU9wdGlvbnMuZGVmYXV0V2lkZ2V0T3B0aW9ucywgYWRkT3B0aW9ucy5kZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIGRlbGV0ZSBhZGRPcHRpb25zLmRlZmF1bHRPcHRpb25zO1xuICAgICAgfVxuICAgICAgaWYgKGlzT2JqZWN0KGFkZE9wdGlvbnMuZGVmYXV0V2lkZ2V0T3B0aW9ucykpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmZvcm1PcHRpb25zLmRlZmF1dFdpZGdldE9wdGlvbnMsIGFkZE9wdGlvbnMuZGVmYXV0V2lkZ2V0T3B0aW9ucyk7XG4gICAgICAgIGRlbGV0ZSBhZGRPcHRpb25zLmRlZmF1dFdpZGdldE9wdGlvbnM7XG4gICAgICB9XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMuZm9ybU9wdGlvbnMsIGFkZE9wdGlvbnMpO1xuXG4gICAgICAvLyBjb252ZXJ0IGRpc2FibGVFcnJvclN0YXRlIC8gZGlzYWJsZVN1Y2Nlc3NTdGF0ZSB0byBlbmFibGUuLi5cbiAgICAgIGNvbnN0IGdsb2JhbERlZmF1bHRzID0gdGhpcy5mb3JtT3B0aW9ucy5kZWZhdXRXaWRnZXRPcHRpb25zO1xuICAgICAgWydFcnJvclN0YXRlJywgJ1N1Y2Nlc3NTdGF0ZSddXG4gICAgICAgIC5maWx0ZXIoc3VmZml4ID0+IGhhc093bihnbG9iYWxEZWZhdWx0cywgJ2Rpc2FibGUnICsgc3VmZml4KSlcbiAgICAgICAgLmZvckVhY2goc3VmZml4ID0+IHtcbiAgICAgICAgICBnbG9iYWxEZWZhdWx0c1snZW5hYmxlJyArIHN1ZmZpeF0gPSAhZ2xvYmFsRGVmYXVsdHNbJ2Rpc2FibGUnICsgc3VmZml4XTtcbiAgICAgICAgICBkZWxldGUgZ2xvYmFsRGVmYXVsdHNbJ2Rpc2FibGUnICsgc3VmZml4XTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcGlsZUFqdlNjaGVtYSgpIHtcbiAgICBpZiAoIXRoaXMudmFsaWRhdGVGb3JtRGF0YSkge1xuXG4gICAgICAvLyBpZiAndWk6b3JkZXInIGV4aXN0cyBpbiBwcm9wZXJ0aWVzLCBtb3ZlIGl0IHRvIHJvb3QgYmVmb3JlIGNvbXBpbGluZyB3aXRoIGFqdlxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5zY2hlbWEucHJvcGVydGllc1sndWk6b3JkZXInXSkpIHtcbiAgICAgICAgdGhpcy5zY2hlbWFbJ3VpOm9yZGVyJ10gPSB0aGlzLnNjaGVtYS5wcm9wZXJ0aWVzWyd1aTpvcmRlciddO1xuICAgICAgICBkZWxldGUgdGhpcy5zY2hlbWEucHJvcGVydGllc1sndWk6b3JkZXInXTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYWp2LnJlbW92ZVNjaGVtYSh0aGlzLnNjaGVtYSk7XG4gICAgICB0aGlzLnZhbGlkYXRlRm9ybURhdGEgPSB0aGlzLmFqdi5jb21waWxlKHRoaXMuc2NoZW1hKTtcbiAgICB9XG4gIH1cblxuICBidWlsZFNjaGVtYUZyb21EYXRhKGRhdGE/OiBhbnksIHJlcXVpcmVBbGxGaWVsZHMgPSBmYWxzZSk6IGFueSB7XG4gICAgaWYgKGRhdGEpIHsgcmV0dXJuIGJ1aWxkU2NoZW1hRnJvbURhdGEoZGF0YSwgcmVxdWlyZUFsbEZpZWxkcyk7IH1cbiAgICB0aGlzLnNjaGVtYSA9IGJ1aWxkU2NoZW1hRnJvbURhdGEodGhpcy5mb3JtVmFsdWVzLCByZXF1aXJlQWxsRmllbGRzKTtcbiAgfVxuXG4gIGJ1aWxkU2NoZW1hRnJvbUxheW91dChsYXlvdXQ/OiBhbnkpOiBhbnkge1xuICAgIGlmIChsYXlvdXQpIHsgcmV0dXJuIGJ1aWxkU2NoZW1hRnJvbUxheW91dChsYXlvdXQpOyB9XG4gICAgdGhpcy5zY2hlbWEgPSBidWlsZFNjaGVtYUZyb21MYXlvdXQodGhpcy5sYXlvdXQpO1xuICB9XG5cblxuICBzZXRUcGxkYXRhKG5ld1RwbGRhdGE6IGFueSA9IHt9KTogdm9pZCB7XG4gICAgdGhpcy50cGxkYXRhID0gbmV3VHBsZGF0YTtcbiAgfVxuXG4gIHBhcnNlVGV4dChcbiAgICB0ZXh0ID0gJycsIHZhbHVlOiBhbnkgPSB7fSwgdmFsdWVzOiBhbnkgPSB7fSwga2V5OiBudW1iZXJ8c3RyaW5nID0gbnVsbFxuICApOiBzdHJpbmcge1xuICAgIGlmICghdGV4dCB8fCAhL3t7Lis/fX0vLnRlc3QodGV4dCkpIHsgcmV0dXJuIHRleHQ7IH1cbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC97eyguKz8pfX0vZywgKC4uLmEpID0+XG4gICAgICB0aGlzLnBhcnNlRXhwcmVzc2lvbihhWzFdLCB2YWx1ZSwgdmFsdWVzLCBrZXksIHRoaXMudHBsZGF0YSlcbiAgICApO1xuICB9XG5cbiAgcGFyc2VFeHByZXNzaW9uKFxuICAgIGV4cHJlc3Npb24gPSAnJywgdmFsdWU6IGFueSA9IHt9LCB2YWx1ZXM6IGFueSA9IHt9LFxuICAgIGtleTogbnVtYmVyfHN0cmluZyA9IG51bGwsIHRwbGRhdGE6IGFueSA9IG51bGxcbiAgKSB7XG4gICAgaWYgKHR5cGVvZiBleHByZXNzaW9uICE9PSAnc3RyaW5nJykgeyByZXR1cm4gJyc7IH1cbiAgICBjb25zdCBpbmRleCA9IHR5cGVvZiBrZXkgPT09ICdudW1iZXInID8gKGtleSArIDEpICsgJycgOiAoa2V5IHx8ICcnKTtcbiAgICBleHByZXNzaW9uID0gZXhwcmVzc2lvbi50cmltKCk7XG4gICAgaWYgKChleHByZXNzaW9uWzBdID09PSAnXFwnJyB8fCBleHByZXNzaW9uWzBdID09PSAnXCInKSAmJlxuICAgICAgZXhwcmVzc2lvblswXSA9PT0gZXhwcmVzc2lvbltleHByZXNzaW9uLmxlbmd0aCAtIDFdICYmXG4gICAgICBleHByZXNzaW9uLnNsaWNlKDEsIGV4cHJlc3Npb24ubGVuZ3RoIC0gMSkuaW5kZXhPZihleHByZXNzaW9uWzBdKSA9PT0gLTFcbiAgICApIHtcbiAgICAgIHJldHVybiBleHByZXNzaW9uLnNsaWNlKDEsIGV4cHJlc3Npb24ubGVuZ3RoIC0gMSk7XG4gICAgfVxuICAgIGlmIChleHByZXNzaW9uID09PSAnaWR4JyB8fCBleHByZXNzaW9uID09PSAnJGluZGV4JykgeyByZXR1cm4gaW5kZXg7IH1cbiAgICBpZiAoZXhwcmVzc2lvbiA9PT0gJ3ZhbHVlJyAmJiAhaGFzT3duKHZhbHVlcywgJ3ZhbHVlJykpIHsgcmV0dXJuIHZhbHVlOyB9XG4gICAgaWYgKFsnXCInLCAnXFwnJywgJyAnLCAnfHwnLCAnJiYnLCAnKyddLmV2ZXJ5KGRlbGltID0+IGV4cHJlc3Npb24uaW5kZXhPZihkZWxpbSkgPT09IC0xKSkge1xuICAgICAgY29uc3QgcG9pbnRlciA9IEpzb25Qb2ludGVyLnBhcnNlT2JqZWN0UGF0aChleHByZXNzaW9uKTtcbiAgICAgIHJldHVybiBwb2ludGVyWzBdID09PSAndmFsdWUnICYmIEpzb25Qb2ludGVyLmhhcyh2YWx1ZSwgcG9pbnRlci5zbGljZSgxKSkgP1xuICAgICAgICAgIEpzb25Qb2ludGVyLmdldCh2YWx1ZSwgcG9pbnRlci5zbGljZSgxKSkgOlxuICAgICAgICBwb2ludGVyWzBdID09PSAndmFsdWVzJyAmJiBKc29uUG9pbnRlci5oYXModmFsdWVzLCBwb2ludGVyLnNsaWNlKDEpKSA/XG4gICAgICAgICAgSnNvblBvaW50ZXIuZ2V0KHZhbHVlcywgcG9pbnRlci5zbGljZSgxKSkgOlxuICAgICAgICBwb2ludGVyWzBdID09PSAndHBsZGF0YScgJiYgSnNvblBvaW50ZXIuaGFzKHRwbGRhdGEsIHBvaW50ZXIuc2xpY2UoMSkpID9cbiAgICAgICAgICBKc29uUG9pbnRlci5nZXQodHBsZGF0YSwgcG9pbnRlci5zbGljZSgxKSkgOlxuICAgICAgICBKc29uUG9pbnRlci5oYXModmFsdWVzLCBwb2ludGVyKSA/IEpzb25Qb2ludGVyLmdldCh2YWx1ZXMsIHBvaW50ZXIpIDogJyc7XG4gICAgfVxuICAgIGlmIChleHByZXNzaW9uLmluZGV4T2YoJ1tpZHhdJykgPiAtMSkge1xuICAgICAgZXhwcmVzc2lvbiA9IGV4cHJlc3Npb24ucmVwbGFjZSgvXFxbaWR4XFxdL2csIDxzdHJpbmc+aW5kZXgpO1xuICAgIH1cbiAgICBpZiAoZXhwcmVzc2lvbi5pbmRleE9mKCdbJGluZGV4XScpID4gLTEpIHtcbiAgICAgIGV4cHJlc3Npb24gPSBleHByZXNzaW9uLnJlcGxhY2UoL1xcWyRpbmRleFxcXS9nLCA8c3RyaW5nPmluZGV4KTtcbiAgICB9XG4gICAgLy8gVE9ETzogSW1wcm92ZSBleHByZXNzaW9uIGV2YWx1YXRpb24gYnkgcGFyc2luZyBxdW90ZWQgc3RyaW5ncyBmaXJzdFxuICAgIC8vIGxldCBleHByZXNzaW9uQXJyYXkgPSBleHByZXNzaW9uLm1hdGNoKC8oW15cIiddK3xcIlteXCJdK1wifCdbXiddKycpL2cpO1xuICAgIGlmIChleHByZXNzaW9uLmluZGV4T2YoJ3x8JykgPiAtMSkge1xuICAgICAgcmV0dXJuIGV4cHJlc3Npb24uc3BsaXQoJ3x8JykucmVkdWNlKChhbGwsIHRlcm0pID0+XG4gICAgICAgIGFsbCB8fCB0aGlzLnBhcnNlRXhwcmVzc2lvbih0ZXJtLCB2YWx1ZSwgdmFsdWVzLCBrZXksIHRwbGRhdGEpLCAnJ1xuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGV4cHJlc3Npb24uaW5kZXhPZignJiYnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gZXhwcmVzc2lvbi5zcGxpdCgnJiYnKS5yZWR1Y2UoKGFsbCwgdGVybSkgPT5cbiAgICAgICAgYWxsICYmIHRoaXMucGFyc2VFeHByZXNzaW9uKHRlcm0sIHZhbHVlLCB2YWx1ZXMsIGtleSwgdHBsZGF0YSksICcgJ1xuICAgICAgKS50cmltKCk7XG4gICAgfVxuICAgIGlmIChleHByZXNzaW9uLmluZGV4T2YoJysnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gZXhwcmVzc2lvbi5zcGxpdCgnKycpXG4gICAgICAgIC5tYXAodGVybSA9PiB0aGlzLnBhcnNlRXhwcmVzc2lvbih0ZXJtLCB2YWx1ZSwgdmFsdWVzLCBrZXksIHRwbGRhdGEpKVxuICAgICAgICAuam9pbignJyk7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHNldEFycmF5SXRlbVRpdGxlKFxuICAgIHBhcmVudEN0eDogYW55ID0ge30sIGNoaWxkTm9kZTogYW55ID0gbnVsbCwgaW5kZXg6IG51bWJlciA9IG51bGxcbiAgKTogc3RyaW5nIHtcbiAgICBjb25zdCBwYXJlbnROb2RlID0gcGFyZW50Q3R4LmxheW91dE5vZGU7XG4gICAgY29uc3QgcGFyZW50VmFsdWVzOiBhbnkgPSB0aGlzLmdldEZvcm1Db250cm9sVmFsdWUocGFyZW50Q3R4KTtcbiAgICBjb25zdCBpc0FycmF5SXRlbSA9XG4gICAgICAocGFyZW50Tm9kZS50eXBlIHx8ICcnKS5zbGljZSgtNSkgPT09ICdhcnJheScgJiYgaXNBcnJheShwYXJlbnRWYWx1ZXMpO1xuICAgIGNvbnN0IHRleHQgPSBKc29uUG9pbnRlci5nZXRGaXJzdChcbiAgICAgIGlzQXJyYXlJdGVtICYmIGNoaWxkTm9kZS50eXBlICE9PSAnJHJlZicgPyBbXG4gICAgICAgIFtjaGlsZE5vZGUsICcvb3B0aW9ucy9sZWdlbmQnXSxcbiAgICAgICAgW2NoaWxkTm9kZSwgJy9vcHRpb25zL3RpdGxlJ10sXG4gICAgICAgIFtwYXJlbnROb2RlLCAnL29wdGlvbnMvdGl0bGUnXSxcbiAgICAgICAgW3BhcmVudE5vZGUsICcvb3B0aW9ucy9sZWdlbmQnXSxcbiAgICAgIF0gOiBbXG4gICAgICAgIFtjaGlsZE5vZGUsICcvb3B0aW9ucy90aXRsZSddLFxuICAgICAgICBbY2hpbGROb2RlLCAnL29wdGlvbnMvbGVnZW5kJ10sXG4gICAgICAgIFtwYXJlbnROb2RlLCAnL29wdGlvbnMvdGl0bGUnXSxcbiAgICAgICAgW3BhcmVudE5vZGUsICcvb3B0aW9ucy9sZWdlbmQnXVxuICAgICAgXVxuICAgICk7XG4gICAgaWYgKCF0ZXh0KSB7IHJldHVybiB0ZXh0OyB9XG4gICAgY29uc3QgY2hpbGRWYWx1ZSA9IGlzQXJyYXkocGFyZW50VmFsdWVzKSAmJiBpbmRleCA8IHBhcmVudFZhbHVlcy5sZW5ndGggP1xuICAgICAgcGFyZW50VmFsdWVzW2luZGV4XSA6IHBhcmVudFZhbHVlcztcbiAgICByZXR1cm4gdGhpcy5wYXJzZVRleHQodGV4dCwgY2hpbGRWYWx1ZSwgcGFyZW50VmFsdWVzLCBpbmRleCk7XG4gIH1cblxuICBzZXRJdGVtVGl0bGUoY3R4OiBhbnkpIHtcbiAgICByZXR1cm4gIWN0eC5vcHRpb25zLnRpdGxlICYmIC9eKFxcZCt8LSkkLy50ZXN0KGN0eC5sYXlvdXROb2RlLm5hbWUpID9cbiAgICAgIG51bGwgOlxuICAgICAgdGhpcy5wYXJzZVRleHQoXG4gICAgICAgIGN0eC5vcHRpb25zLnRpdGxlIHx8IHRvVGl0bGVDYXNlKGN0eC5sYXlvdXROb2RlLm5hbWUpLFxuICAgICAgICB0aGlzLmdldEZvcm1Db250cm9sVmFsdWUodGhpcyksXG4gICAgICAgICh0aGlzLmdldEZvcm1Db250cm9sR3JvdXAodGhpcykgfHwgPGFueT57fSkudmFsdWUsXG4gICAgICAgIGN0eC5kYXRhSW5kZXhbY3R4LmRhdGFJbmRleC5sZW5ndGggLSAxXVxuICAgICAgKTtcbiAgfVxuXG4gIGV2YWx1YXRlQ29uZGl0aW9uKGxheW91dE5vZGU6IGFueSwgZGF0YUluZGV4OiBudW1iZXJbXSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGFycmF5SW5kZXggPSBkYXRhSW5kZXggJiYgZGF0YUluZGV4W2RhdGFJbmRleC5sZW5ndGggLSAxXTtcbiAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcbiAgICBpZiAoaGFzVmFsdWUoKGxheW91dE5vZGUub3B0aW9ucyB8fCB7fSkuY29uZGl0aW9uKSkge1xuICAgICAgaWYgKHR5cGVvZiBsYXlvdXROb2RlLm9wdGlvbnMuY29uZGl0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICBsZXQgcG9pbnRlciA9IGxheW91dE5vZGUub3B0aW9ucy5jb25kaXRpb247XG4gICAgICAgIGlmIChoYXNWYWx1ZShhcnJheUluZGV4KSkge1xuICAgICAgICAgIHBvaW50ZXIgPSBwb2ludGVyLnJlcGxhY2UoJ1thcnJheUluZGV4XScsIGBbJHthcnJheUluZGV4fV1gKTtcbiAgICAgICAgfVxuICAgICAgICBwb2ludGVyID0gSnNvblBvaW50ZXIucGFyc2VPYmplY3RQYXRoKHBvaW50ZXIpO1xuICAgICAgICByZXN1bHQgPSAhIUpzb25Qb2ludGVyLmdldCh0aGlzLmRhdGEsIHBvaW50ZXIpO1xuICAgICAgICBpZiAoIXJlc3VsdCAmJiBwb2ludGVyWzBdID09PSAnbW9kZWwnKSB7XG4gICAgICAgICAgcmVzdWx0ID0gISFKc29uUG9pbnRlci5nZXQoeyBtb2RlbDogdGhpcy5kYXRhIH0sIHBvaW50ZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsYXlvdXROb2RlLm9wdGlvbnMuY29uZGl0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJlc3VsdCA9IGxheW91dE5vZGUub3B0aW9ucy5jb25kaXRpb24odGhpcy5kYXRhKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxheW91dE5vZGUub3B0aW9ucy5jb25kaXRpb24uZnVuY3Rpb25Cb2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGR5bkZuID0gbmV3IEZ1bmN0aW9uKFxuICAgICAgICAgICAgJ21vZGVsJywgJ2FycmF5SW5kaWNlcycsIGxheW91dE5vZGUub3B0aW9ucy5jb25kaXRpb24uZnVuY3Rpb25Cb2R5XG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXN1bHQgPSBkeW5Gbih0aGlzLmRhdGEsIGRhdGFJbmRleCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2NvbmRpdGlvbiBmdW5jdGlvbkJvZHkgZXJyb3JlZCBvdXQgb24gZXZhbHVhdGlvbjogJyArIGxheW91dE5vZGUub3B0aW9ucy5jb25kaXRpb24uZnVuY3Rpb25Cb2R5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaW5pdGlhbGl6ZUNvbnRyb2woY3R4OiBhbnksIGJpbmQgPSB0cnVlKTogYm9vbGVhbiB7XG4gICAgaWYgKCFpc09iamVjdChjdHgpKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGlmIChpc0VtcHR5KGN0eC5vcHRpb25zKSkge1xuICAgICAgY3R4Lm9wdGlvbnMgPSAhaXNFbXB0eSgoY3R4LmxheW91dE5vZGUgfHwge30pLm9wdGlvbnMpID9cbiAgICAgICAgY3R4LmxheW91dE5vZGUub3B0aW9ucyA6IF8uY2xvbmVEZWVwKHRoaXMuZm9ybU9wdGlvbnMpO1xuICAgIH1cbiAgICBjdHguZm9ybUNvbnRyb2wgPSB0aGlzLmdldEZvcm1Db250cm9sKGN0eCk7XG4gICAgY3R4LmJvdW5kQ29udHJvbCA9IGJpbmQgJiYgISFjdHguZm9ybUNvbnRyb2w7XG4gICAgaWYgKGN0eC5mb3JtQ29udHJvbCkge1xuICAgICAgY3R4LmNvbnRyb2xOYW1lID0gdGhpcy5nZXRGb3JtQ29udHJvbE5hbWUoY3R4KTtcbiAgICAgIGN0eC5jb250cm9sVmFsdWUgPSBjdHguZm9ybUNvbnRyb2wudmFsdWU7XG4gICAgICBjdHguY29udHJvbERpc2FibGVkID0gY3R4LmZvcm1Db250cm9sLmRpc2FibGVkO1xuICAgICAgY3R4Lm9wdGlvbnMuZXJyb3JNZXNzYWdlID0gY3R4LmZvcm1Db250cm9sLnN0YXR1cyA9PT0gJ1ZBTElEJyA/IG51bGwgOlxuICAgICAgICB0aGlzLmZvcm1hdEVycm9ycyhjdHguZm9ybUNvbnRyb2wuZXJyb3JzLCBjdHgub3B0aW9ucy52YWxpZGF0aW9uTWVzc2FnZXMpO1xuICAgICAgY3R4Lm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRoaXMuZm9ybU9wdGlvbnMudmFsaWRhdGVPblJlbmRlciA9PT0gdHJ1ZSB8fFxuICAgICAgICAodGhpcy5mb3JtT3B0aW9ucy52YWxpZGF0ZU9uUmVuZGVyID09PSAnYXV0bycgJiYgaGFzVmFsdWUoY3R4LmNvbnRyb2xWYWx1ZSkpO1xuICAgICAgY3R4LmZvcm1Db250cm9sLnN0YXR1c0NoYW5nZXMuc3Vic2NyaWJlKHN0YXR1cyA9PlxuICAgICAgICBjdHgub3B0aW9ucy5lcnJvck1lc3NhZ2UgPSBzdGF0dXMgPT09ICdWQUxJRCcgPyBudWxsIDpcbiAgICAgICAgICB0aGlzLmZvcm1hdEVycm9ycyhjdHguZm9ybUNvbnRyb2wuZXJyb3JzLCBjdHgub3B0aW9ucy52YWxpZGF0aW9uTWVzc2FnZXMpXG4gICAgICApO1xuICAgICAgY3R4LmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICBpZiAoIV8uaXNFcXVhbChjdHguY29udHJvbFZhbHVlLCB2YWx1ZSkpIHsgY3R4LmNvbnRyb2xWYWx1ZSA9IHZhbHVlOyB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3R4LmNvbnRyb2xOYW1lID0gY3R4LmxheW91dE5vZGUubmFtZTtcbiAgICAgIGN0eC5jb250cm9sVmFsdWUgPSBjdHgubGF5b3V0Tm9kZS52YWx1ZSB8fCBudWxsO1xuICAgICAgY29uc3QgZGF0YVBvaW50ZXIgPSB0aGlzLmdldERhdGFQb2ludGVyKGN0eCk7XG4gICAgICBpZiAoYmluZCAmJiBkYXRhUG9pbnRlcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGB3YXJuaW5nOiBjb250cm9sIFwiJHtkYXRhUG9pbnRlcn1cIiBpcyBub3QgYm91bmQgdG8gdGhlIEFuZ3VsYXIgRm9ybUdyb3VwLmApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3R4LmJvdW5kQ29udHJvbDtcbiAgfVxuXG4gIGZvcm1hdEVycm9ycyhlcnJvcnM6IGFueSwgdmFsaWRhdGlvbk1lc3NhZ2VzOiBhbnkgPSB7fSk6IHN0cmluZyB7XG4gICAgaWYgKGlzRW1wdHkoZXJyb3JzKSkgeyByZXR1cm4gbnVsbDsgfVxuICAgIGlmICghaXNPYmplY3QodmFsaWRhdGlvbk1lc3NhZ2VzKSkgeyB2YWxpZGF0aW9uTWVzc2FnZXMgPSB7fTsgfVxuICAgIGNvbnN0IGFkZFNwYWNlcyA9IHN0cmluZyA9PiBzdHJpbmdbMF0udG9VcHBlckNhc2UoKSArIChzdHJpbmcuc2xpY2UoMSkgfHwgJycpXG4gICAgICAucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxICQyJykucmVwbGFjZSgvXy9nLCAnICcpO1xuICAgIGNvbnN0IGZvcm1hdEVycm9yID0gKGVycm9yKSA9PiB0eXBlb2YgZXJyb3IgPT09ICdvYmplY3QnID9cbiAgICAgIE9iamVjdC5rZXlzKGVycm9yKS5tYXAoa2V5ID0+XG4gICAgICAgIGVycm9yW2tleV0gPT09IHRydWUgPyBhZGRTcGFjZXMoa2V5KSA6XG4gICAgICAgIGVycm9yW2tleV0gPT09IGZhbHNlID8gJ05vdCAnICsgYWRkU3BhY2VzKGtleSkgOlxuICAgICAgICBhZGRTcGFjZXMoa2V5KSArICc6ICcgKyBmb3JtYXRFcnJvcihlcnJvcltrZXldKVxuICAgICAgKS5qb2luKCcsICcpIDpcbiAgICAgIGFkZFNwYWNlcyhlcnJvci50b1N0cmluZygpKTtcbiAgICBjb25zdCBtZXNzYWdlcyA9IFtdO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhlcnJvcnMpXG4gICAgICAvLyBIaWRlICdyZXF1aXJlZCcgZXJyb3IsIHVubGVzcyBpdCBpcyB0aGUgb25seSBvbmVcbiAgICAgIC5maWx0ZXIoZXJyb3JLZXkgPT4gZXJyb3JLZXkgIT09ICdyZXF1aXJlZCcgfHwgT2JqZWN0LmtleXMoZXJyb3JzKS5sZW5ndGggPT09IDEpXG4gICAgICAubWFwKGVycm9yS2V5ID0+XG4gICAgICAgIC8vIElmIHZhbGlkYXRpb25NZXNzYWdlcyBpcyBhIHN0cmluZywgcmV0dXJuIGl0XG4gICAgICAgIHR5cGVvZiB2YWxpZGF0aW9uTWVzc2FnZXMgPT09ICdzdHJpbmcnID8gdmFsaWRhdGlvbk1lc3NhZ2VzIDpcbiAgICAgICAgLy8gSWYgY3VzdG9tIGVycm9yIG1lc3NhZ2UgaXMgYSBmdW5jdGlvbiwgcmV0dXJuIGZ1bmN0aW9uIHJlc3VsdFxuICAgICAgICB0eXBlb2YgdmFsaWRhdGlvbk1lc3NhZ2VzW2Vycm9yS2V5XSA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgICAgdmFsaWRhdGlvbk1lc3NhZ2VzW2Vycm9yS2V5XShlcnJvcnNbZXJyb3JLZXldKSA6XG4gICAgICAgIC8vIElmIGN1c3RvbSBlcnJvciBtZXNzYWdlIGlzIGEgc3RyaW5nLCByZXBsYWNlIHBsYWNlaG9sZGVycyBhbmQgcmV0dXJuXG4gICAgICAgIHR5cGVvZiB2YWxpZGF0aW9uTWVzc2FnZXNbZXJyb3JLZXldID09PSAnc3RyaW5nJyA/XG4gICAgICAgICAgLy8gRG9lcyBlcnJvciBtZXNzYWdlIGhhdmUgYW55IHt7cHJvcGVydHl9fSBwbGFjZWhvbGRlcnM/XG4gICAgICAgICAgIS97ey4rP319Ly50ZXN0KHZhbGlkYXRpb25NZXNzYWdlc1tlcnJvcktleV0pID9cbiAgICAgICAgICAgIHZhbGlkYXRpb25NZXNzYWdlc1tlcnJvcktleV0gOlxuICAgICAgICAgICAgLy8gUmVwbGFjZSB7e3Byb3BlcnR5fX0gcGxhY2Vob2xkZXJzIHdpdGggdmFsdWVzXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhlcnJvcnNbZXJyb3JLZXldKVxuICAgICAgICAgICAgICAucmVkdWNlKChlcnJvck1lc3NhZ2UsIGVycm9yUHJvcGVydHkpID0+IGVycm9yTWVzc2FnZS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoJ3t7JyArIGVycm9yUHJvcGVydHkgKyAnfX0nLCAnZycpLFxuICAgICAgICAgICAgICAgIGVycm9yc1tlcnJvcktleV1bZXJyb3JQcm9wZXJ0eV1cbiAgICAgICAgICAgICAgKSwgdmFsaWRhdGlvbk1lc3NhZ2VzW2Vycm9yS2V5XSkgOlxuICAgICAgICAgIC8vIElmIG5vIGN1c3RvbSBlcnJvciBtZXNzYWdlLCByZXR1cm4gZm9ybWF0dGVkIGVycm9yIGRhdGEgaW5zdGVhZFxuICAgICAgICAgIGFkZFNwYWNlcyhlcnJvcktleSkgKyAnIEVycm9yOiAnICsgZm9ybWF0RXJyb3IoZXJyb3JzW2Vycm9yS2V5XSlcbiAgICAgICkuam9pbignPGJyPicpO1xuICB9XG5cbiAgdXBkYXRlVmFsdWUoY3R4OiBhbnksIHZhbHVlOiBhbnkpOiB2b2lkIHtcblxuICAgIC8vIFNldCB2YWx1ZSBvZiBjdXJyZW50IGNvbnRyb2xcbiAgICBjdHguY29udHJvbFZhbHVlID0gdmFsdWU7XG4gICAgaWYgKGN0eC5ib3VuZENvbnRyb2wpIHtcbiAgICAgIGN0eC5mb3JtQ29udHJvbC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICBjdHguZm9ybUNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICB9XG4gICAgY3R4LmxheW91dE5vZGUudmFsdWUgPSB2YWx1ZTtcblxuICAgIC8vIFNldCB2YWx1ZXMgb2YgYW55IHJlbGF0ZWQgY29udHJvbHMgaW4gY29weVZhbHVlVG8gYXJyYXlcbiAgICBpZiAoaXNBcnJheShjdHgub3B0aW9ucy5jb3B5VmFsdWVUbykpIHtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjdHgub3B0aW9ucy5jb3B5VmFsdWVUbykge1xuICAgICAgICBjb25zdCB0YXJnZXRDb250cm9sID0gZ2V0Q29udHJvbCh0aGlzLmZvcm1Hcm91cCwgaXRlbSk7XG4gICAgICAgIGlmIChpc09iamVjdCh0YXJnZXRDb250cm9sKSAmJiB0eXBlb2YgdGFyZ2V0Q29udHJvbC5zZXRWYWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRhcmdldENvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICAgIHRhcmdldENvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUFycmF5Q2hlY2tib3hMaXN0KGN0eDogYW55LCBjaGVja2JveExpc3Q6IFRpdGxlTWFwSXRlbVtdKTogdm9pZCB7XG4gICAgY29uc3QgZm9ybUFycmF5ID0gPEZvcm1BcnJheT50aGlzLmdldEZvcm1Db250cm9sKGN0eCk7XG5cbiAgICAvLyBSZW1vdmUgYWxsIGV4aXN0aW5nIGl0ZW1zXG4gICAgd2hpbGUgKGZvcm1BcnJheS52YWx1ZS5sZW5ndGgpIHsgZm9ybUFycmF5LnJlbW92ZUF0KDApOyB9XG5cbiAgICAvLyBSZS1hZGQgYW4gaXRlbSBmb3IgZWFjaCBjaGVja2VkIGJveFxuICAgIGNvbnN0IHJlZlBvaW50ZXIgPSByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzKFxuICAgICAgY3R4LmxheW91dE5vZGUuZGF0YVBvaW50ZXIgKyAnLy0nLCB0aGlzLmRhdGFSZWN1cnNpdmVSZWZNYXAsIHRoaXMuYXJyYXlNYXBcbiAgICApO1xuICAgIGZvciAoY29uc3QgY2hlY2tib3hJdGVtIG9mIGNoZWNrYm94TGlzdCkge1xuICAgICAgaWYgKGNoZWNrYm94SXRlbS5jaGVja2VkKSB7XG4gICAgICAgIGNvbnN0IG5ld0Zvcm1Db250cm9sID0gYnVpbGRGb3JtR3JvdXAodGhpcy50ZW1wbGF0ZVJlZkxpYnJhcnlbcmVmUG9pbnRlcl0pO1xuICAgICAgICBuZXdGb3JtQ29udHJvbC5zZXRWYWx1ZShjaGVja2JveEl0ZW0udmFsdWUpO1xuICAgICAgICBmb3JtQXJyYXkucHVzaChuZXdGb3JtQ29udHJvbCk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvcm1BcnJheS5tYXJrQXNEaXJ0eSgpO1xuICB9XG5cbiAgZ2V0Rm9ybUNvbnRyb2woY3R4OiBhbnkpOiBBYnN0cmFjdENvbnRyb2wge1xuICAgIGlmIChcbiAgICAgICFjdHgubGF5b3V0Tm9kZSB8fCAhaXNEZWZpbmVkKGN0eC5sYXlvdXROb2RlLmRhdGFQb2ludGVyKSB8fFxuICAgICAgY3R4LmxheW91dE5vZGUudHlwZSA9PT0gJyRyZWYnXG4gICAgKSB7IHJldHVybiBudWxsOyB9XG4gICAgcmV0dXJuIGdldENvbnRyb2wodGhpcy5mb3JtR3JvdXAsIHRoaXMuZ2V0RGF0YVBvaW50ZXIoY3R4KSk7XG4gIH1cblxuICBnZXRGb3JtQ29udHJvbFZhbHVlKGN0eDogYW55KTogQWJzdHJhY3RDb250cm9sIHtcbiAgICBpZiAoXG4gICAgICAhY3R4LmxheW91dE5vZGUgfHwgIWlzRGVmaW5lZChjdHgubGF5b3V0Tm9kZS5kYXRhUG9pbnRlcikgfHxcbiAgICAgIGN0eC5sYXlvdXROb2RlLnR5cGUgPT09ICckcmVmJ1xuICAgICkgeyByZXR1cm4gbnVsbDsgfVxuICAgIGNvbnN0IGNvbnRyb2wgPSBnZXRDb250cm9sKHRoaXMuZm9ybUdyb3VwLCB0aGlzLmdldERhdGFQb2ludGVyKGN0eCkpO1xuICAgIHJldHVybiBjb250cm9sID8gY29udHJvbC52YWx1ZSA6IG51bGw7XG4gIH1cblxuICBnZXRGb3JtQ29udHJvbEdyb3VwKGN0eDogYW55KTogRm9ybUFycmF5IHwgRm9ybUdyb3VwIHtcbiAgICBpZiAoIWN0eC5sYXlvdXROb2RlIHx8ICFpc0RlZmluZWQoY3R4LmxheW91dE5vZGUuZGF0YVBvaW50ZXIpKSB7IHJldHVybiBudWxsOyB9XG4gICAgcmV0dXJuIGdldENvbnRyb2wodGhpcy5mb3JtR3JvdXAsIHRoaXMuZ2V0RGF0YVBvaW50ZXIoY3R4KSwgdHJ1ZSk7XG4gIH1cblxuICBnZXRGb3JtQ29udHJvbE5hbWUoY3R4OiBhbnkpOiBzdHJpbmcge1xuICAgIGlmIChcbiAgICAgICFjdHgubGF5b3V0Tm9kZSB8fCAhaXNEZWZpbmVkKGN0eC5sYXlvdXROb2RlLmRhdGFQb2ludGVyKSB8fCAhaGFzVmFsdWUoY3R4LmRhdGFJbmRleClcbiAgICApIHsgcmV0dXJuIG51bGw7IH1cbiAgICByZXR1cm4gSnNvblBvaW50ZXIudG9LZXkodGhpcy5nZXREYXRhUG9pbnRlcihjdHgpKTtcbiAgfVxuXG4gIGdldExheW91dEFycmF5KGN0eDogYW55KTogYW55W10ge1xuICAgIHJldHVybiBKc29uUG9pbnRlci5nZXQodGhpcy5sYXlvdXQsIHRoaXMuZ2V0TGF5b3V0UG9pbnRlcihjdHgpLCAwLCAtMSk7XG4gIH1cblxuICBnZXRQYXJlbnROb2RlKGN0eDogYW55KTogYW55IHtcbiAgICByZXR1cm4gSnNvblBvaW50ZXIuZ2V0KHRoaXMubGF5b3V0LCB0aGlzLmdldExheW91dFBvaW50ZXIoY3R4KSwgMCwgLTIpO1xuICB9XG5cbiAgZ2V0RGF0YVBvaW50ZXIoY3R4OiBhbnkpOiBzdHJpbmcge1xuICAgIGlmIChcbiAgICAgICFjdHgubGF5b3V0Tm9kZSB8fCAhaXNEZWZpbmVkKGN0eC5sYXlvdXROb2RlLmRhdGFQb2ludGVyKSB8fCAhaGFzVmFsdWUoY3R4LmRhdGFJbmRleClcbiAgICApIHsgcmV0dXJuIG51bGw7IH1cbiAgICByZXR1cm4gSnNvblBvaW50ZXIudG9JbmRleGVkUG9pbnRlcihcbiAgICAgIGN0eC5sYXlvdXROb2RlLmRhdGFQb2ludGVyLCBjdHguZGF0YUluZGV4LCB0aGlzLmFycmF5TWFwXG4gICAgKTtcbiAgfVxuXG4gIGdldExheW91dFBvaW50ZXIoY3R4OiBhbnkpOiBzdHJpbmcge1xuICAgIGlmICghaGFzVmFsdWUoY3R4LmxheW91dEluZGV4KSkgeyByZXR1cm4gbnVsbDsgfVxuICAgIHJldHVybiAnLycgKyBjdHgubGF5b3V0SW5kZXguam9pbignL2l0ZW1zLycpO1xuICB9XG5cbiAgaXNDb250cm9sQm91bmQoY3R4OiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAoXG4gICAgICAhY3R4LmxheW91dE5vZGUgfHwgIWlzRGVmaW5lZChjdHgubGF5b3V0Tm9kZS5kYXRhUG9pbnRlcikgfHwgIWhhc1ZhbHVlKGN0eC5kYXRhSW5kZXgpXG4gICAgKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGNvbnN0IGNvbnRyb2xHcm91cCA9IHRoaXMuZ2V0Rm9ybUNvbnRyb2xHcm91cChjdHgpO1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldEZvcm1Db250cm9sTmFtZShjdHgpO1xuICAgIHJldHVybiBjb250cm9sR3JvdXAgPyBoYXNPd24oY29udHJvbEdyb3VwLmNvbnRyb2xzLCBuYW1lKSA6IGZhbHNlO1xuICB9XG5cbiAgYWRkSXRlbShjdHg6IGFueSwgbmFtZT86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmIChcbiAgICAgICFjdHgubGF5b3V0Tm9kZSB8fCAhaXNEZWZpbmVkKGN0eC5sYXlvdXROb2RlLiRyZWYpIHx8XG4gICAgICAhaGFzVmFsdWUoY3R4LmRhdGFJbmRleCkgfHwgIWhhc1ZhbHVlKGN0eC5sYXlvdXRJbmRleClcbiAgICApIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAvLyBDcmVhdGUgYSBuZXcgQW5ndWxhciBmb3JtIGNvbnRyb2wgZnJvbSBhIHRlbXBsYXRlIGluIHRlbXBsYXRlUmVmTGlicmFyeVxuICAgIGNvbnN0IG5ld0Zvcm1Hcm91cCA9IGJ1aWxkRm9ybUdyb3VwKHRoaXMudGVtcGxhdGVSZWZMaWJyYXJ5W2N0eC5sYXlvdXROb2RlLiRyZWZdKTtcblxuICAgIC8vIEFkZCB0aGUgbmV3IGZvcm0gY29udHJvbCB0byB0aGUgcGFyZW50IGZvcm1BcnJheSBvciBmb3JtR3JvdXBcbiAgICBpZiAoY3R4LmxheW91dE5vZGUuYXJyYXlJdGVtKSB7IC8vIEFkZCBuZXcgYXJyYXkgaXRlbSB0byBmb3JtQXJyYXlcbiAgICAgICg8Rm9ybUFycmF5PnRoaXMuZ2V0Rm9ybUNvbnRyb2xHcm91cChjdHgpKS5wdXNoKG5ld0Zvcm1Hcm91cCk7XG4gICAgfSBlbHNlIHsgLy8gQWRkIG5ldyAkcmVmIGl0ZW0gdG8gZm9ybUdyb3VwXG4gICAgICAoPEZvcm1Hcm91cD50aGlzLmdldEZvcm1Db250cm9sR3JvdXAoY3R4KSlcbiAgICAgICAgLmFkZENvbnRyb2wobmFtZSB8fCB0aGlzLmdldEZvcm1Db250cm9sTmFtZShjdHgpLCBuZXdGb3JtR3JvdXApO1xuICAgIH1cblxuICAgIC8vIENvcHkgYSBuZXcgbGF5b3V0Tm9kZSBmcm9tIGxheW91dFJlZkxpYnJhcnlcbiAgICBjb25zdCBuZXdMYXlvdXROb2RlID0gZ2V0TGF5b3V0Tm9kZShjdHgubGF5b3V0Tm9kZSwgdGhpcyk7XG4gICAgbmV3TGF5b3V0Tm9kZS5hcnJheUl0ZW0gPSBjdHgubGF5b3V0Tm9kZS5hcnJheUl0ZW07XG4gICAgaWYgKGN0eC5sYXlvdXROb2RlLmFycmF5SXRlbVR5cGUpIHtcbiAgICAgIG5ld0xheW91dE5vZGUuYXJyYXlJdGVtVHlwZSA9IGN0eC5sYXlvdXROb2RlLmFycmF5SXRlbVR5cGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSBuZXdMYXlvdXROb2RlLmFycmF5SXRlbVR5cGU7XG4gICAgfVxuICAgIGlmIChuYW1lKSB7XG4gICAgICBuZXdMYXlvdXROb2RlLm5hbWUgPSBuYW1lO1xuICAgICAgbmV3TGF5b3V0Tm9kZS5kYXRhUG9pbnRlciArPSAnLycgKyBKc29uUG9pbnRlci5lc2NhcGUobmFtZSk7XG4gICAgICBuZXdMYXlvdXROb2RlLm9wdGlvbnMudGl0bGUgPSBmaXhUaXRsZShuYW1lKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgdGhlIG5ldyBsYXlvdXROb2RlIHRvIHRoZSBmb3JtIGxheW91dFxuICAgIEpzb25Qb2ludGVyLmluc2VydCh0aGlzLmxheW91dCwgdGhpcy5nZXRMYXlvdXRQb2ludGVyKGN0eCksIG5ld0xheW91dE5vZGUpO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBtb3ZlQXJyYXlJdGVtKGN0eDogYW55LCBvbGRJbmRleDogbnVtYmVyLCBuZXdJbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgaWYgKFxuICAgICAgIWN0eC5sYXlvdXROb2RlIHx8ICFpc0RlZmluZWQoY3R4LmxheW91dE5vZGUuZGF0YVBvaW50ZXIpIHx8XG4gICAgICAhaGFzVmFsdWUoY3R4LmRhdGFJbmRleCkgfHwgIWhhc1ZhbHVlKGN0eC5sYXlvdXRJbmRleCkgfHxcbiAgICAgICFpc0RlZmluZWQob2xkSW5kZXgpIHx8ICFpc0RlZmluZWQobmV3SW5kZXgpIHx8IG9sZEluZGV4ID09PSBuZXdJbmRleFxuICAgICkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIC8vIE1vdmUgaXRlbSBpbiB0aGUgZm9ybUFycmF5XG4gICAgY29uc3QgZm9ybUFycmF5ID0gPEZvcm1BcnJheT50aGlzLmdldEZvcm1Db250cm9sR3JvdXAoY3R4KTtcbiAgICBjb25zdCBhcnJheUl0ZW0gPSBmb3JtQXJyYXkuYXQob2xkSW5kZXgpO1xuICAgIGZvcm1BcnJheS5yZW1vdmVBdChvbGRJbmRleCk7XG4gICAgZm9ybUFycmF5Lmluc2VydChuZXdJbmRleCwgYXJyYXlJdGVtKTtcbiAgICBmb3JtQXJyYXkudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuXG4gICAgLy8gTW92ZSBsYXlvdXQgaXRlbVxuICAgIGNvbnN0IGxheW91dEFycmF5ID0gdGhpcy5nZXRMYXlvdXRBcnJheShjdHgpO1xuICAgIGxheW91dEFycmF5LnNwbGljZShuZXdJbmRleCwgMCwgbGF5b3V0QXJyYXkuc3BsaWNlKG9sZEluZGV4LCAxKVswXSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZW1vdmVJdGVtKGN0eDogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKFxuICAgICAgIWN0eC5sYXlvdXROb2RlIHx8ICFpc0RlZmluZWQoY3R4LmxheW91dE5vZGUuZGF0YVBvaW50ZXIpIHx8XG4gICAgICAhaGFzVmFsdWUoY3R4LmRhdGFJbmRleCkgfHwgIWhhc1ZhbHVlKGN0eC5sYXlvdXRJbmRleClcbiAgICApIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAvLyBSZW1vdmUgdGhlIEFuZ3VsYXIgZm9ybSBjb250cm9sIGZyb20gdGhlIHBhcmVudCBmb3JtQXJyYXkgb3IgZm9ybUdyb3VwXG4gICAgaWYgKGN0eC5sYXlvdXROb2RlLmFycmF5SXRlbSkgeyAvLyBSZW1vdmUgYXJyYXkgaXRlbSBmcm9tIGZvcm1BcnJheVxuICAgICAgKDxGb3JtQXJyYXk+dGhpcy5nZXRGb3JtQ29udHJvbEdyb3VwKGN0eCkpXG4gICAgICAgIC5yZW1vdmVBdChjdHguZGF0YUluZGV4W2N0eC5kYXRhSW5kZXgubGVuZ3RoIC0gMV0pO1xuICAgIH0gZWxzZSB7IC8vIFJlbW92ZSAkcmVmIGl0ZW0gZnJvbSBmb3JtR3JvdXBcbiAgICAgICg8Rm9ybUdyb3VwPnRoaXMuZ2V0Rm9ybUNvbnRyb2xHcm91cChjdHgpKVxuICAgICAgICAucmVtb3ZlQ29udHJvbCh0aGlzLmdldEZvcm1Db250cm9sTmFtZShjdHgpKTtcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgbGF5b3V0Tm9kZSBmcm9tIGxheW91dFxuICAgIEpzb25Qb2ludGVyLnJlbW92ZSh0aGlzLmxheW91dCwgdGhpcy5nZXRMYXlvdXRQb2ludGVyKGN0eCkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iXX0=