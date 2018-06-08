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
export class JsonSchemaFormService {
    constructor() {
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
    }
    setLanguage(language = 'en-US') {
        this.language = language;
        const validationMessages = language.slice(0, 2) === 'fr' ?
            frValidationMessages : enValidationMessages;
        this.defaultFormOptions.defautWidgetOptions.validationMessages =
            _.cloneDeep(validationMessages);
    }
    getData() { return this.data; }
    getSchema() { return this.schema; }
    getLayout() { return this.layout; }
    resetAllValues() {
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
    }
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
    buildRemoteError(errors) {
        forEach(errors, (value, key) => {
            if (key in this.formGroup.controls) {
                for (const error of value) {
                    const err = {};
                    err[error['code']] = error['message'];
                    this.formGroup.get(key).setErrors(err, { emitEvent: true });
                }
            }
        });
    }
    validateData(newValue, updateSubscriptions = true) {
        // Format raw form data to correct data types
        this.data = formatFormData(newValue, this.dataMap, this.dataRecursiveRefMap, this.arrayMap, this.formOptions.returnEmptyFields);
        this.isValid = this.validateFormData(this.data);
        this.validData = this.isValid ? this.data : null;
        const compileErrors = errors => {
            const compiledErrors = {};
            (errors || []).forEach(error => {
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
    }
    buildFormGroupTemplate(formValues = null, setValues = true) {
        this.formGroupTemplate = buildFormGroupTemplate(this, formValues, setValues);
    }
    buildFormGroup() {
        this.formGroup = buildFormGroup(this.formGroupTemplate);
        if (this.formGroup) {
            this.compileAjvSchema();
            this.validateData(this.formGroup.value);
            // Set up observables to emit data and validation info when form data changes
            if (this.formValueSubscription) {
                this.formValueSubscription.unsubscribe();
            }
            this.formValueSubscription = this.formGroup.valueChanges
                .subscribe(formValue => this.validateData(formValue));
        }
    }
    buildLayout(widgetLibrary) {
        this.layout = buildLayout(this, widgetLibrary);
    }
    setOptions(newOptions) {
        if (isObject(newOptions)) {
            const addOptions = _.cloneDeep(newOptions);
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
            const globalDefaults = this.formOptions.defautWidgetOptions;
            ['ErrorState', 'SuccessState']
                .filter(suffix => hasOwn(globalDefaults, 'disable' + suffix))
                .forEach(suffix => {
                globalDefaults['enable' + suffix] = !globalDefaults['disable' + suffix];
                delete globalDefaults['disable' + suffix];
            });
        }
    }
    compileAjvSchema() {
        if (!this.validateFormData) {
            // if 'ui:order' exists in properties, move it to root before compiling with ajv
            if (Array.isArray(this.schema.properties['ui:order'])) {
                this.schema['ui:order'] = this.schema.properties['ui:order'];
                delete this.schema.properties['ui:order'];
            }
            this.ajv.removeSchema(this.schema);
            this.validateFormData = this.ajv.compile(this.schema);
        }
    }
    buildSchemaFromData(data, requireAllFields = false) {
        if (data) {
            return buildSchemaFromData(data, requireAllFields);
        }
        this.schema = buildSchemaFromData(this.formValues, requireAllFields);
    }
    buildSchemaFromLayout(layout) {
        if (layout) {
            return buildSchemaFromLayout(layout);
        }
        this.schema = buildSchemaFromLayout(this.layout);
    }
    setTpldata(newTpldata = {}) {
        this.tpldata = newTpldata;
    }
    parseText(text = '', value = {}, values = {}, key = null) {
        if (!text || !/{{.+?}}/.test(text)) {
            return text;
        }
        return text.replace(/{{(.+?)}}/g, (...a) => this.parseExpression(a[1], value, values, key, this.tpldata));
    }
    parseExpression(expression = '', value = {}, values = {}, key = null, tpldata = null) {
        if (typeof expression !== 'string') {
            return '';
        }
        const index = typeof key === 'number' ? (key + 1) + '' : (key || '');
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
        if (['"', '\'', ' ', '||', '&&', '+'].every(delim => expression.indexOf(delim) === -1)) {
            const pointer = JsonPointer.parseObjectPath(expression);
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
            return expression.split('||').reduce((all, term) => all || this.parseExpression(term, value, values, key, tpldata), '');
        }
        if (expression.indexOf('&&') > -1) {
            return expression.split('&&').reduce((all, term) => all && this.parseExpression(term, value, values, key, tpldata), ' ').trim();
        }
        if (expression.indexOf('+') > -1) {
            return expression.split('+')
                .map(term => this.parseExpression(term, value, values, key, tpldata))
                .join('');
        }
        return '';
    }
    setArrayItemTitle(parentCtx = {}, childNode = null, index = null) {
        const parentNode = parentCtx.layoutNode;
        const parentValues = this.getFormControlValue(parentCtx);
        const isArrayItem = (parentNode.type || '').slice(-5) === 'array' && isArray(parentValues);
        const text = JsonPointer.getFirst(isArrayItem && childNode.type !== '$ref' ? [
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
        const childValue = isArray(parentValues) && index < parentValues.length ?
            parentValues[index] : parentValues;
        return this.parseText(text, childValue, parentValues, index);
    }
    setItemTitle(ctx) {
        return !ctx.options.title && /^(\d+|-)$/.test(ctx.layoutNode.name) ?
            null :
            this.parseText(ctx.options.title || toTitleCase(ctx.layoutNode.name), this.getFormControlValue(this), (this.getFormControlGroup(this) || {}).value, ctx.dataIndex[ctx.dataIndex.length - 1]);
    }
    evaluateCondition(layoutNode, dataIndex) {
        const arrayIndex = dataIndex && dataIndex[dataIndex.length - 1];
        let result = true;
        if (hasValue((layoutNode.options || {}).condition)) {
            if (typeof layoutNode.options.condition === 'string') {
                let pointer = layoutNode.options.condition;
                if (hasValue(arrayIndex)) {
                    pointer = pointer.replace('[arrayIndex]', `[${arrayIndex}]`);
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
                    const dynFn = new Function('model', 'arrayIndices', layoutNode.options.condition.functionBody);
                    result = dynFn(this.data, dataIndex);
                }
                catch (e) {
                    result = true;
                    console.error('condition functionBody errored out on evaluation: ' + layoutNode.options.condition.functionBody);
                }
            }
        }
        return result;
    }
    initializeControl(ctx, bind = true) {
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
            ctx.formControl.statusChanges.subscribe(status => ctx.options.errorMessage = status === 'VALID' ? null :
                this.formatErrors(ctx.formControl.errors, ctx.options.validationMessages));
            ctx.formControl.valueChanges.subscribe(value => {
                if (!_.isEqual(ctx.controlValue, value)) {
                    ctx.controlValue = value;
                }
            });
        }
        else {
            ctx.controlName = ctx.layoutNode.name;
            ctx.controlValue = ctx.layoutNode.value || null;
            const dataPointer = this.getDataPointer(ctx);
            if (bind && dataPointer) {
                console.error(`warning: control "${dataPointer}" is not bound to the Angular FormGroup.`);
            }
        }
        return ctx.boundControl;
    }
    formatErrors(errors, validationMessages = {}) {
        if (isEmpty(errors)) {
            return null;
        }
        if (!isObject(validationMessages)) {
            validationMessages = {};
        }
        const addSpaces = string => string[0].toUpperCase() + (string.slice(1) || '')
            .replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ');
        const formatError = (error) => typeof error === 'object' ?
            Object.keys(error).map(key => error[key] === true ? addSpaces(key) :
                error[key] === false ? 'Not ' + addSpaces(key) :
                    addSpaces(key) + ': ' + formatError(error[key])).join(', ') :
            addSpaces(error.toString());
        const messages = [];
        return Object.keys(errors)
            .filter(errorKey => errorKey !== 'required' || Object.keys(errors).length === 1)
            .map(errorKey => 
        // If validationMessages is a string, return it
        typeof validationMessages === 'string' ? validationMessages :
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
                            .reduce((errorMessage, errorProperty) => errorMessage.replace(new RegExp('{{' + errorProperty + '}}', 'g'), errors[errorKey][errorProperty]), validationMessages[errorKey]) :
                    // If no custom error message, return formatted error data instead
                    addSpaces(errorKey) + ' Error: ' + formatError(errors[errorKey])).join('<br>');
    }
    updateValue(ctx, value) {
        // Set value of current control
        ctx.controlValue = value;
        if (ctx.boundControl) {
            ctx.formControl.setValue(value);
            ctx.formControl.markAsDirty();
        }
        ctx.layoutNode.value = value;
        // Set values of any related controls in copyValueTo array
        if (isArray(ctx.options.copyValueTo)) {
            for (const item of ctx.options.copyValueTo) {
                const targetControl = getControl(this.formGroup, item);
                if (isObject(targetControl) && typeof targetControl.setValue === 'function') {
                    targetControl.setValue(value);
                    targetControl.markAsDirty();
                }
            }
        }
    }
    updateArrayCheckboxList(ctx, checkboxList) {
        const formArray = this.getFormControl(ctx);
        // Remove all existing items
        while (formArray.value.length) {
            formArray.removeAt(0);
        }
        // Re-add an item for each checked box
        const refPointer = removeRecursiveReferences(ctx.layoutNode.dataPointer + '/-', this.dataRecursiveRefMap, this.arrayMap);
        for (const checkboxItem of checkboxList) {
            if (checkboxItem.checked) {
                const newFormControl = buildFormGroup(this.templateRefLibrary[refPointer]);
                newFormControl.setValue(checkboxItem.value);
                formArray.push(newFormControl);
            }
        }
        formArray.markAsDirty();
    }
    getFormControl(ctx) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) ||
            ctx.layoutNode.type === '$ref') {
            return null;
        }
        return getControl(this.formGroup, this.getDataPointer(ctx));
    }
    getFormControlValue(ctx) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) ||
            ctx.layoutNode.type === '$ref') {
            return null;
        }
        const control = getControl(this.formGroup, this.getDataPointer(ctx));
        return control ? control.value : null;
    }
    getFormControlGroup(ctx) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer)) {
            return null;
        }
        return getControl(this.formGroup, this.getDataPointer(ctx), true);
    }
    getFormControlName(ctx) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) || !hasValue(ctx.dataIndex)) {
            return null;
        }
        return JsonPointer.toKey(this.getDataPointer(ctx));
    }
    getLayoutArray(ctx) {
        return JsonPointer.get(this.layout, this.getLayoutPointer(ctx), 0, -1);
    }
    getParentNode(ctx) {
        return JsonPointer.get(this.layout, this.getLayoutPointer(ctx), 0, -2);
    }
    getDataPointer(ctx) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) || !hasValue(ctx.dataIndex)) {
            return null;
        }
        return JsonPointer.toIndexedPointer(ctx.layoutNode.dataPointer, ctx.dataIndex, this.arrayMap);
    }
    getLayoutPointer(ctx) {
        if (!hasValue(ctx.layoutIndex)) {
            return null;
        }
        return '/' + ctx.layoutIndex.join('/items/');
    }
    isControlBound(ctx) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) || !hasValue(ctx.dataIndex)) {
            return false;
        }
        const controlGroup = this.getFormControlGroup(ctx);
        const name = this.getFormControlName(ctx);
        return controlGroup ? hasOwn(controlGroup.controls, name) : false;
    }
    addItem(ctx, name) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.$ref) ||
            !hasValue(ctx.dataIndex) || !hasValue(ctx.layoutIndex)) {
            return false;
        }
        // Create a new Angular form control from a template in templateRefLibrary
        const newFormGroup = buildFormGroup(this.templateRefLibrary[ctx.layoutNode.$ref]);
        // Add the new form control to the parent formArray or formGroup
        if (ctx.layoutNode.arrayItem) {
            this.getFormControlGroup(ctx).push(newFormGroup);
        }
        else {
            this.getFormControlGroup(ctx)
                .addControl(name || this.getFormControlName(ctx), newFormGroup);
        }
        // Copy a new layoutNode from layoutRefLibrary
        const newLayoutNode = getLayoutNode(ctx.layoutNode, this);
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
    }
    moveArrayItem(ctx, oldIndex, newIndex) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) ||
            !hasValue(ctx.dataIndex) || !hasValue(ctx.layoutIndex) ||
            !isDefined(oldIndex) || !isDefined(newIndex) || oldIndex === newIndex) {
            return false;
        }
        // Move item in the formArray
        const formArray = this.getFormControlGroup(ctx);
        const arrayItem = formArray.at(oldIndex);
        formArray.removeAt(oldIndex);
        formArray.insert(newIndex, arrayItem);
        formArray.updateValueAndValidity();
        // Move layout item
        const layoutArray = this.getLayoutArray(ctx);
        layoutArray.splice(newIndex, 0, layoutArray.splice(oldIndex, 1)[0]);
        return true;
    }
    removeItem(ctx) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) ||
            !hasValue(ctx.dataIndex) || !hasValue(ctx.layoutIndex)) {
            return false;
        }
        // Remove the Angular form control from the parent formArray or formGroup
        if (ctx.layoutNode.arrayItem) {
            this.getFormControlGroup(ctx)
                .removeAt(ctx.dataIndex[ctx.dataIndex.length - 1]);
        }
        else {
            this.getFormControlGroup(ctx)
                .removeControl(this.getFormControlName(ctx));
        }
        // Remove layoutNode from layout
        JsonPointer.remove(this.layout, this.getLayoutPointer(ctx));
        return true;
    }
}
JsonSchemaFormService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
JsonSchemaFormService.ctorParameters = () => [];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcjItanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbInNyYy9qc29uLXNjaGVtYS1mb3JtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFOUMsT0FBTyxLQUFLLEdBQUcsTUFBTSxLQUFLLENBQUM7QUFDM0IsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFNUIsT0FBTyxFQUNMLFFBQVEsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQ2hELE1BQU0sOEJBQThCLENBQUM7QUFDdEMsT0FBTyxFQUNMLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFDdkMsTUFBTSw0QkFBNEIsQ0FBQztBQUNwQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0QsT0FBTyxFQUNMLG1CQUFtQixFQUFFLHFCQUFxQixFQUFFLHlCQUF5QixFQUV0RSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hDLE9BQU8sRUFDTCxjQUFjLEVBQUUsc0JBQXNCLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFDbkUsTUFBTSwrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBV3ZFLE1BQU07SUFzRko7UUFyRkEsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLHFDQUFnQyxHQUFHLEtBQUssQ0FBQztRQUN6QyxtQ0FBOEIsR0FB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Q0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7WUEvbkJGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEZvcm1BcnJheSwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy1jb21wYXQvb3BlcmF0b3JzL2ZpbHRlcic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy1jb21wYXQvU3ViamVjdCc7XG5cbmltcG9ydCAqIGFzIEFqdiBmcm9tICdhanYnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQge1xuICBoYXNWYWx1ZSwgaXNBcnJheSwgaXNEZWZpbmVkLCBpc0VtcHR5LCBpc09iamVjdCwgaXNTdHJpbmdcbn0gZnJvbSAnLi9zaGFyZWQvdmFsaWRhdG9yLmZ1bmN0aW9ucyc7XG5pbXBvcnQge1xuICBmaXhUaXRsZSwgZm9yRWFjaCwgaGFzT3duLCB0b1RpdGxlQ2FzZVxufSBmcm9tICcuL3NoYXJlZC91dGlsaXR5LmZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBKc29uUG9pbnRlciB9IGZyb20gJy4vc2hhcmVkL2pzb25wb2ludGVyLmZ1bmN0aW9ucyc7XG5pbXBvcnQge1xuICBidWlsZFNjaGVtYUZyb21EYXRhLCBidWlsZFNjaGVtYUZyb21MYXlvdXQsIHJlbW92ZVJlY3Vyc2l2ZVJlZmVyZW5jZXMsXG4gIHJlc29sdmVTY2hlbWFSZWZlcmVuY2VzXG59IGZyb20gJy4vc2hhcmVkL2pzb24tc2NoZW1hLmZ1bmN0aW9ucyc7XG5pbXBvcnQge1xuICBidWlsZEZvcm1Hcm91cCwgYnVpbGRGb3JtR3JvdXBUZW1wbGF0ZSwgZm9ybWF0Rm9ybURhdGEsIGdldENvbnRyb2xcbn0gZnJvbSAnLi9zaGFyZWQvZm9ybS1ncm91cC5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgYnVpbGRMYXlvdXQsIGdldExheW91dE5vZGUgfSBmcm9tICcuL3NoYXJlZC9sYXlvdXQuZnVuY3Rpb25zJztcbmltcG9ydCB7IGVuVmFsaWRhdGlvbk1lc3NhZ2VzIH0gZnJvbSAnLi9sb2NhbGUvZW4tdmFsaWRhdGlvbi1tZXNzYWdlcyc7XG5pbXBvcnQgeyBmclZhbGlkYXRpb25NZXNzYWdlcyB9IGZyb20gJy4vbG9jYWxlL2ZyLXZhbGlkYXRpb24tbWVzc2FnZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRpdGxlTWFwSXRlbSB7XG4gIG5hbWU/OiBzdHJpbmc7IHZhbHVlPzogYW55OyBjaGVja2VkPzogYm9vbGVhbjsgZ3JvdXA/OiBzdHJpbmc7IGl0ZW1zPzogVGl0bGVNYXBJdGVtW107XG59XG5leHBvcnQgaW50ZXJmYWNlIEVycm9yTWVzc2FnZXMge1xuICBbY29udHJvbF9uYW1lOiBzdHJpbmddOiB7IG1lc3NhZ2U6IHN0cmluZ3xGdW5jdGlvbnxPYmplY3QsIGNvZGU6IHN0cmluZyB9W107XG59XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEpzb25TY2hlbWFGb3JtU2VydmljZSB7XG4gIEpzb25Gb3JtQ29tcGF0aWJpbGl0eSA9IGZhbHNlO1xuICBSZWFjdEpzb25TY2hlbWFGb3JtQ29tcGF0aWJpbGl0eSA9IGZhbHNlO1xuICBBbmd1bGFyU2NoZW1hRm9ybUNvbXBhdGliaWxpdHkgPSBmYWxzZTtcbiAgdHBsZGF0YTogYW55ID0ge307XG5cbiAgYWp2T3B0aW9uczogYW55ID0geyBhbGxFcnJvcnM6IHRydWUsIGpzb25Qb2ludGVyczogdHJ1ZSwgdW5rbm93bkZvcm1hdHM6ICdpZ25vcmUnIH07XG4gIGFqdjogYW55ID0gbmV3IEFqdih0aGlzLmFqdk9wdGlvbnMpOyAvLyBBSlY6IEFub3RoZXIgSlNPTiBTY2hlbWEgVmFsaWRhdG9yXG4gIHZhbGlkYXRlRm9ybURhdGE6IGFueSA9IG51bGw7IC8vIENvbXBpbGVkIEFKViBmdW5jdGlvbiB0byB2YWxpZGF0ZSBhY3RpdmUgZm9ybSdzIHNjaGVtYVxuXG4gIGZvcm1WYWx1ZXM6IGFueSA9IHt9OyAvLyBJbnRlcm5hbCBmb3JtIGRhdGEgKG1heSBub3QgaGF2ZSBjb3JyZWN0IHR5cGVzKVxuICBkYXRhOiBhbnkgPSB7fTsgLy8gT3V0cHV0IGZvcm0gZGF0YSAoZm9ybVZhbHVlcywgZm9ybWF0dGVkIHdpdGggY29ycmVjdCBkYXRhIHR5cGVzKVxuICBzY2hlbWE6IGFueSA9IHt9OyAvLyBJbnRlcm5hbCBKU09OIFNjaGVtYVxuICBsYXlvdXQ6IGFueVtdID0gW107IC8vIEludGVybmFsIGZvcm0gbGF5b3V0XG4gIGZvcm1Hcm91cFRlbXBsYXRlOiBhbnkgPSB7fTsgLy8gVGVtcGxhdGUgdXNlZCB0byBjcmVhdGUgZm9ybUdyb3VwXG4gIGZvcm1Hcm91cDogYW55ID0gbnVsbDsgLy8gQW5ndWxhciBmb3JtR3JvdXAsIHdoaWNoIHBvd2VycyB0aGUgcmVhY3RpdmUgZm9ybVxuICBmcmFtZXdvcms6IGFueSA9IG51bGw7IC8vIEFjdGl2ZSBmcmFtZXdvcmsgY29tcG9uZW50XG4gIGZvcm1PcHRpb25zOiBhbnk7IC8vIEFjdGl2ZSBvcHRpb25zLCB1c2VkIHRvIGNvbmZpZ3VyZSB0aGUgZm9ybVxuXG4gIHZhbGlkRGF0YTogYW55ID0gbnVsbDsgLy8gVmFsaWQgZm9ybSBkYXRhIChvciBudWxsKSAoPT09IGlzVmFsaWQgPyBkYXRhIDogbnVsbClcbiAgaXNWYWxpZDogYm9vbGVhbiA9IG51bGw7IC8vIElzIGN1cnJlbnQgZm9ybSBkYXRhIHZhbGlkP1xuICBhanZFcnJvcnM6IGFueSA9IG51bGw7IC8vIEFqdiBlcnJvcnMgZm9yIGN1cnJlbnQgZGF0YVxuICB2YWxpZGF0aW9uRXJyb3JzOiBhbnkgPSBudWxsOyAvLyBBbnkgdmFsaWRhdGlvbiBlcnJvcnMgZm9yIGN1cnJlbnQgZGF0YVxuICBkYXRhRXJyb3JzOiBhbnkgPSBuZXcgTWFwKCk7IC8vXG4gIGZvcm1WYWx1ZVN1YnNjcmlwdGlvbjogYW55ID0gbnVsbDsgLy8gU3Vic2NyaXB0aW9uIHRvIGZvcm1Hcm91cC52YWx1ZUNoYW5nZXMgb2JzZXJ2YWJsZSAoZm9yIHVuLSBhbmQgcmUtc3Vic2NyaWJpbmcpXG4gIGRhdGFDaGFuZ2VzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpOyAvLyBGb3JtIGRhdGEgb2JzZXJ2YWJsZVxuICBpc1ZhbGlkQ2hhbmdlczogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTsgLy8gaXNWYWxpZCBvYnNlcnZhYmxlXG4gIHZhbGlkYXRpb25FcnJvckNoYW5nZXM6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7IC8vIHZhbGlkYXRpb25FcnJvcnMgb2JzZXJ2YWJsZVxuXG4gIGFycmF5TWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcCgpOyAvLyBNYXBzIGFycmF5cyBpbiBkYXRhIG9iamVjdCBhbmQgbnVtYmVyIG9mIHR1cGxlIHZhbHVlc1xuICBkYXRhTWFwOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcCgpOyAvLyBNYXBzIHBhdGhzIGluIGZvcm0gZGF0YSB0byBzY2hlbWEgYW5kIGZvcm1Hcm91cCBwYXRoc1xuICBkYXRhUmVjdXJzaXZlUmVmTWFwOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpOyAvLyBNYXBzIHJlY3Vyc2l2ZSByZWZlcmVuY2UgcG9pbnRzIGluIGZvcm0gZGF0YVxuICBzY2hlbWFSZWN1cnNpdmVSZWZNYXA6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBuZXcgTWFwKCk7IC8vIE1hcHMgcmVjdXJzaXZlIHJlZmVyZW5jZSBwb2ludHMgaW4gc2NoZW1hXG4gIHNjaGVtYVJlZkxpYnJhcnk6IGFueSA9IHt9OyAvLyBMaWJyYXJ5IG9mIHNjaGVtYXMgZm9yIHJlc29sdmluZyBzY2hlbWEgJHJlZnNcbiAgbGF5b3V0UmVmTGlicmFyeTogYW55ID0geyAnJzogbnVsbCB9OyAvLyBMaWJyYXJ5IG9mIGxheW91dCBub2RlcyBmb3IgYWRkaW5nIHRvIGZvcm1cbiAgdGVtcGxhdGVSZWZMaWJyYXJ5OiBhbnkgPSB7fTsgLy8gTGlicmFyeSBvZiBmb3JtR3JvdXAgdGVtcGxhdGVzIGZvciBhZGRpbmcgdG8gZm9ybVxuICBoYXNSb290UmVmZXJlbmNlID0gZmFsc2U7IC8vIERvZXMgdGhlIGZvcm0gaW5jbHVkZSBhIHJlY3Vyc2l2ZSByZWZlcmVuY2UgdG8gaXRzZWxmP1xuXG4gIGxhbmd1YWdlID0gJ2VuLVVTJzsgLy8gRG9lcyB0aGUgZm9ybSBpbmNsdWRlIGEgcmVjdXJzaXZlIHJlZmVyZW5jZSB0byBpdHNlbGY/XG5cbiAgLy8gRGVmYXVsdCBnbG9iYWwgZm9ybSBvcHRpb25zXG4gIGRlZmF1bHRGb3JtT3B0aW9uczogYW55ID0ge1xuICAgIGFkZFN1Ym1pdDogJ2F1dG8nLCAvLyBBZGQgYSBzdWJtaXQgYnV0dG9uIGlmIGxheW91dCBkb2VzIG5vdCBoYXZlIG9uZT9cbiAgICAgIC8vIGZvciBhZGRTdWJtaXQ6IHRydWUgPSBhbHdheXMsIGZhbHNlID0gbmV2ZXIsXG4gICAgICAvLyAnYXV0bycgPSBvbmx5IGlmIGxheW91dCBpcyB1bmRlZmluZWQgKGZvcm0gaXMgYnVpbHQgZnJvbSBzY2hlbWEgYWxvbmUpXG4gICAgZGVidWc6IGZhbHNlLCAvLyBTaG93IGRlYnVnZ2luZyBvdXRwdXQ/XG4gICAgZGlzYWJsZUludmFsaWRTdWJtaXQ6IHRydWUsIC8vIERpc2FibGUgc3VibWl0IGlmIGZvcm0gaW52YWxpZD9cbiAgICBmb3JtRGlzYWJsZWQ6IGZhbHNlLCAvLyBTZXQgZW50aXJlIGZvcm0gYXMgZGlzYWJsZWQ/IChub3QgZWRpdGFibGUsIGFuZCBkaXNhYmxlcyBvdXRwdXRzKVxuICAgIGZvcm1SZWFkb25seTogZmFsc2UsIC8vIFNldCBlbnRpcmUgZm9ybSBhcyByZWFkIG9ubHk/IChub3QgZWRpdGFibGUsIGJ1dCBvdXRwdXRzIHN0aWxsIGVuYWJsZWQpXG4gICAgZmllbGRzUmVxdWlyZWQ6IGZhbHNlLCAvLyAoc2V0IGF1dG9tYXRpY2FsbHkpIEFyZSB0aGVyZSBhbnkgcmVxdWlyZWQgZmllbGRzIGluIHRoZSBmb3JtP1xuICAgIGZyYW1ld29yazogJ25vLWZyYW1ld29yaycsIC8vIFRoZSBmcmFtZXdvcmsgdG8gbG9hZFxuICAgIGxvYWRFeHRlcm5hbEFzc2V0czogZmFsc2UsIC8vIExvYWQgZXh0ZXJuYWwgY3NzIGFuZCBKYXZhU2NyaXB0IGZvciBmcmFtZXdvcms/XG4gICAgcHJpc3RpbmU6IHsgZXJyb3JzOiB0cnVlLCBzdWNjZXNzOiB0cnVlIH0sXG4gICAgc3VwcmVzc1Byb3BlcnR5VGl0bGVzOiBmYWxzZSxcbiAgICBzZXRTY2hlbWFEZWZhdWx0czogJ2F1dG8nLCAvLyBTZXQgZmVmYXVsdCB2YWx1ZXMgZnJvbSBzY2hlbWE/XG4gICAgICAvLyB0cnVlID0gYWx3YXlzIHNldCAodW5sZXNzIG92ZXJyaWRkZW4gYnkgbGF5b3V0IGRlZmF1bHQgb3IgZm9ybVZhbHVlcylcbiAgICAgIC8vIGZhbHNlID0gbmV2ZXIgc2V0XG4gICAgICAvLyAnYXV0bycgPSBzZXQgaW4gYWRkYWJsZSBjb21wb25lbnRzLCBhbmQgZXZlcnl3aGVyZSBpZiBmb3JtVmFsdWVzIG5vdCBzZXRcbiAgICBzZXRMYXlvdXREZWZhdWx0czogJ2F1dG8nLCAvLyBTZXQgZmVmYXVsdCB2YWx1ZXMgZnJvbSBsYXlvdXQ/XG4gICAgICAvLyB0cnVlID0gYWx3YXlzIHNldCAodW5sZXNzIG92ZXJyaWRkZW4gYnkgZm9ybVZhbHVlcylcbiAgICAgIC8vIGZhbHNlID0gbmV2ZXIgc2V0XG4gICAgICAvLyAnYXV0bycgPSBzZXQgaW4gYWRkYWJsZSBjb21wb25lbnRzLCBhbmQgZXZlcnl3aGVyZSBpZiBmb3JtVmFsdWVzIG5vdCBzZXRcbiAgICB2YWxpZGF0ZU9uUmVuZGVyOiAnYXV0bycsIC8vIFZhbGlkYXRlIGZpZWxkcyBpbW1lZGlhdGVseSwgYmVmb3JlIHRoZXkgYXJlIHRvdWNoZWQ/XG4gICAgICAvLyB0cnVlID0gdmFsaWRhdGUgYWxsIGZpZWxkcyBpbW1lZGlhdGVseVxuICAgICAgLy8gZmFsc2UgPSBvbmx5IHZhbGlkYXRlIGZpZWxkcyBhZnRlciB0aGV5IGFyZSB0b3VjaGVkIGJ5IHVzZXJcbiAgICAgIC8vICdhdXRvJyA9IHZhbGlkYXRlIGZpZWxkcyB3aXRoIHZhbHVlcyBpbW1lZGlhdGVseSwgZW1wdHkgZmllbGRzIGFmdGVyIHRoZXkgYXJlIHRvdWNoZWRcbiAgICB3aWRnZXRzOiB7fSwgLy8gQW55IGN1c3RvbSB3aWRnZXRzIHRvIGxvYWRcbiAgICBkZWZhdXRXaWRnZXRPcHRpb25zOiB7IC8vIERlZmF1bHQgb3B0aW9ucyBmb3IgZm9ybSBjb250cm9sIHdpZGdldHNcbiAgICAgIGxpc3RJdGVtczogMSwgLy8gTnVtYmVyIG9mIGxpc3QgaXRlbXMgdG8gaW5pdGlhbGx5IGFkZCB0byBhcnJheXMgd2l0aCBubyBkZWZhdWx0IHZhbHVlXG4gICAgICBhZGRhYmxlOiB0cnVlLCAvLyBBbGxvdyBhZGRpbmcgaXRlbXMgdG8gYW4gYXJyYXkgb3IgJHJlZiBwb2ludD9cbiAgICAgIG9yZGVyYWJsZTogdHJ1ZSwgLy8gQWxsb3cgcmVvcmRlcmluZyBpdGVtcyB3aXRoaW4gYW4gYXJyYXk/XG4gICAgICByZW1vdmFibGU6IHRydWUsIC8vIEFsbG93IHJlbW92aW5nIGl0ZW1zIGZyb20gYW4gYXJyYXkgb3IgJHJlZiBwb2ludD9cbiAgICAgIGVuYWJsZUVycm9yU3RhdGU6IHRydWUsIC8vIEFwcGx5ICdoYXMtZXJyb3InIGNsYXNzIHdoZW4gZmllbGQgZmFpbHMgdmFsaWRhdGlvbj9cbiAgICAgIC8vIGRpc2FibGVFcnJvclN0YXRlOiBmYWxzZSwgLy8gRG9uJ3QgYXBwbHkgJ2hhcy1lcnJvcicgY2xhc3Mgd2hlbiBmaWVsZCBmYWlscyB2YWxpZGF0aW9uP1xuICAgICAgZW5hYmxlU3VjY2Vzc1N0YXRlOiB0cnVlLCAvLyBBcHBseSAnaGFzLXN1Y2Nlc3MnIGNsYXNzIHdoZW4gZmllbGQgdmFsaWRhdGVzP1xuICAgICAgLy8gZGlzYWJsZVN1Y2Nlc3NTdGF0ZTogZmFsc2UsIC8vIERvbid0IGFwcGx5ICdoYXMtc3VjY2VzcycgY2xhc3Mgd2hlbiBmaWVsZCB2YWxpZGF0ZXM/XG4gICAgICBmZWVkYmFjazogZmFsc2UsIC8vIFNob3cgaW5saW5lIGZlZWRiYWNrIGljb25zP1xuICAgICAgZmVlZGJhY2tPblJlbmRlcjogZmFsc2UsIC8vIFNob3cgZXJyb3JNZXNzYWdlIG9uIFJlbmRlcj9cbiAgICAgIG5vdGl0bGU6IGZhbHNlLCAvLyBIaWRlIHRpdGxlP1xuICAgICAgZGlzYWJsZWQ6IGZhbHNlLCAvLyBTZXQgY29udHJvbCBhcyBkaXNhYmxlZD8gKG5vdCBlZGl0YWJsZSwgYW5kIGV4Y2x1ZGVkIGZyb20gb3V0cHV0KVxuICAgICAgcmVhZG9ubHk6IGZhbHNlLCAvLyBTZXQgY29udHJvbCBhcyByZWFkIG9ubHk/IChub3QgZWRpdGFibGUsIGJ1dCBpbmNsdWRlZCBpbiBvdXRwdXQpXG4gICAgICByZXR1cm5FbXB0eUZpZWxkczogdHJ1ZSwgLy8gcmV0dXJuIHZhbHVlcyBmb3IgZmllbGRzIHRoYXQgY29udGFpbiBubyBkYXRhP1xuICAgICAgdmFsaWRhdGlvbk1lc3NhZ2VzOiB7fSAvLyBzZXQgYnkgc2V0TGFuZ3VhZ2UoKVxuICAgIH0sXG4gIH07XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zZXRMYW5ndWFnZSh0aGlzLmxhbmd1YWdlKTtcbiAgfVxuXG4gIHNldExhbmd1YWdlKGxhbmd1YWdlOiBzdHJpbmcgPSAnZW4tVVMnKSB7XG4gICAgdGhpcy5sYW5ndWFnZSA9IGxhbmd1YWdlO1xuICAgIGNvbnN0IHZhbGlkYXRpb25NZXNzYWdlcyA9IGxhbmd1YWdlLnNsaWNlKDAsIDIpID09PSAnZnInID9cbiAgICAgIGZyVmFsaWRhdGlvbk1lc3NhZ2VzIDogZW5WYWxpZGF0aW9uTWVzc2FnZXM7XG4gICAgdGhpcy5kZWZhdWx0Rm9ybU9wdGlvbnMuZGVmYXV0V2lkZ2V0T3B0aW9ucy52YWxpZGF0aW9uTWVzc2FnZXMgPVxuICAgICAgXy5jbG9uZURlZXAodmFsaWRhdGlvbk1lc3NhZ2VzKTtcbiAgfVxuXG4gIGdldERhdGEoKSB7IHJldHVybiB0aGlzLmRhdGE7IH1cblxuICBnZXRTY2hlbWEoKSB7IHJldHVybiB0aGlzLnNjaGVtYTsgfVxuXG4gIGdldExheW91dCgpIHsgcmV0dXJuIHRoaXMubGF5b3V0OyB9XG5cbiAgcmVzZXRBbGxWYWx1ZXMoKSB7XG4gICAgdGhpcy5Kc29uRm9ybUNvbXBhdGliaWxpdHkgPSBmYWxzZTtcbiAgICB0aGlzLlJlYWN0SnNvblNjaGVtYUZvcm1Db21wYXRpYmlsaXR5ID0gZmFsc2U7XG4gICAgdGhpcy5Bbmd1bGFyU2NoZW1hRm9ybUNvbXBhdGliaWxpdHkgPSBmYWxzZTtcbiAgICB0aGlzLnRwbGRhdGEgPSB7fTtcbiAgICB0aGlzLnZhbGlkYXRlRm9ybURhdGEgPSBudWxsO1xuICAgIHRoaXMuZm9ybVZhbHVlcyA9IHt9O1xuICAgIHRoaXMuc2NoZW1hID0ge307XG4gICAgdGhpcy5sYXlvdXQgPSBbXTtcbiAgICB0aGlzLmZvcm1Hcm91cFRlbXBsYXRlID0ge307XG4gICAgdGhpcy5mb3JtR3JvdXAgPSBudWxsO1xuICAgIHRoaXMuZnJhbWV3b3JrID0gbnVsbDtcbiAgICB0aGlzLmRhdGEgPSB7fTtcbiAgICB0aGlzLnZhbGlkRGF0YSA9IG51bGw7XG4gICAgdGhpcy5pc1ZhbGlkID0gbnVsbDtcbiAgICB0aGlzLnZhbGlkYXRpb25FcnJvcnMgPSBudWxsO1xuICAgIHRoaXMuYXJyYXlNYXAgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5kYXRhTWFwID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuZGF0YVJlY3Vyc2l2ZVJlZk1hcCA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLnNjaGVtYVJlY3Vyc2l2ZVJlZk1hcCA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmxheW91dFJlZkxpYnJhcnkgPSB7fTtcbiAgICB0aGlzLnNjaGVtYVJlZkxpYnJhcnkgPSB7fTtcbiAgICB0aGlzLnRlbXBsYXRlUmVmTGlicmFyeSA9IHt9O1xuICAgIHRoaXMuZm9ybU9wdGlvbnMgPSBfLmNsb25lRGVlcCh0aGlzLmRlZmF1bHRGb3JtT3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogJ2J1aWxkUmVtb3RlRXJyb3InIGZ1bmN0aW9uXG4gICAqXG4gICAqIEV4YW1wbGUgZXJyb3JzOlxuICAgKiB7XG4gICAqICAgbGFzdF9uYW1lOiBbIHtcbiAgICogICAgIG1lc3NhZ2U6ICdMYXN0IG5hbWUgbXVzdCBieSBzdGFydCB3aXRoIGNhcGl0YWwgbGV0dGVyLicsXG4gICAqICAgICBjb2RlOiAnY2FwaXRhbF9sZXR0ZXInXG4gICAqICAgfSBdLFxuICAgKiAgIGVtYWlsOiBbIHtcbiAgICogICAgIG1lc3NhZ2U6ICdFbWFpbCBtdXN0IGJlIGZyb20gZXhhbXBsZS5jb20gZG9tYWluLicsXG4gICAqICAgICBjb2RlOiAnc3BlY2lhbF9kb21haW4nXG4gICAqICAgfSwge1xuICAgKiAgICAgbWVzc2FnZTogJ0VtYWlsIG11c3QgY29udGFpbiBhbiBAIHN5bWJvbC4nLFxuICAgKiAgICAgY29kZTogJ2F0X3N5bWJvbCdcbiAgICogICB9IF1cbiAgICogfVxuICAgKiBAcGFyYW0ge0Vycm9yTWVzc2FnZXN9IGVycm9yc1xuICAgKi9cbiAgYnVpbGRSZW1vdGVFcnJvcihlcnJvcnM6IEVycm9yTWVzc2FnZXMpIHtcbiAgICBmb3JFYWNoKGVycm9ycywgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgIGlmIChrZXkgaW4gdGhpcy5mb3JtR3JvdXAuY29udHJvbHMpIHtcbiAgICAgICAgZm9yIChjb25zdCBlcnJvciBvZiB2YWx1ZSkge1xuICAgICAgICAgIGNvbnN0IGVyciA9IHt9O1xuICAgICAgICAgIGVycltlcnJvclsnY29kZSddXSA9IGVycm9yWydtZXNzYWdlJ107XG4gICAgICAgICAgdGhpcy5mb3JtR3JvdXAuZ2V0KGtleSkuc2V0RXJyb3JzKGVyciwgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHZhbGlkYXRlRGF0YShuZXdWYWx1ZTogYW55LCB1cGRhdGVTdWJzY3JpcHRpb25zID0gdHJ1ZSk6IHZvaWQge1xuXG4gICAgLy8gRm9ybWF0IHJhdyBmb3JtIGRhdGEgdG8gY29ycmVjdCBkYXRhIHR5cGVzXG4gICAgdGhpcy5kYXRhID0gZm9ybWF0Rm9ybURhdGEoXG4gICAgICBuZXdWYWx1ZSwgdGhpcy5kYXRhTWFwLCB0aGlzLmRhdGFSZWN1cnNpdmVSZWZNYXAsXG4gICAgICB0aGlzLmFycmF5TWFwLCB0aGlzLmZvcm1PcHRpb25zLnJldHVybkVtcHR5RmllbGRzXG4gICAgKTtcbiAgICB0aGlzLmlzVmFsaWQgPSB0aGlzLnZhbGlkYXRlRm9ybURhdGEodGhpcy5kYXRhKTtcbiAgICB0aGlzLnZhbGlkRGF0YSA9IHRoaXMuaXNWYWxpZCA/IHRoaXMuZGF0YSA6IG51bGw7XG4gICAgY29uc3QgY29tcGlsZUVycm9ycyA9IGVycm9ycyA9PiB7XG4gICAgICBjb25zdCBjb21waWxlZEVycm9ycyA9IHt9O1xuICAgICAgKGVycm9ycyB8fCBbXSkuZm9yRWFjaChlcnJvciA9PiB7XG4gICAgICAgIGlmICghY29tcGlsZWRFcnJvcnNbZXJyb3IuZGF0YVBhdGhdKSB7IGNvbXBpbGVkRXJyb3JzW2Vycm9yLmRhdGFQYXRoXSA9IFtdOyB9XG4gICAgICAgIGNvbXBpbGVkRXJyb3JzW2Vycm9yLmRhdGFQYXRoXS5wdXNoKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gY29tcGlsZWRFcnJvcnM7XG4gICAgfTtcbiAgICB0aGlzLmFqdkVycm9ycyA9IHRoaXMudmFsaWRhdGVGb3JtRGF0YS5lcnJvcnM7XG4gICAgdGhpcy52YWxpZGF0aW9uRXJyb3JzID0gY29tcGlsZUVycm9ycyh0aGlzLnZhbGlkYXRlRm9ybURhdGEuZXJyb3JzKTtcbiAgICBpZiAodXBkYXRlU3Vic2NyaXB0aW9ucykge1xuICAgICAgdGhpcy5kYXRhQ2hhbmdlcy5uZXh0KHRoaXMuZGF0YSk7XG4gICAgICB0aGlzLmlzVmFsaWRDaGFuZ2VzLm5leHQodGhpcy5pc1ZhbGlkKTtcbiAgICAgIHRoaXMudmFsaWRhdGlvbkVycm9yQ2hhbmdlcy5uZXh0KHRoaXMuYWp2RXJyb3JzKTtcbiAgICB9XG4gIH1cblxuICBidWlsZEZvcm1Hcm91cFRlbXBsYXRlKGZvcm1WYWx1ZXM6IGFueSA9IG51bGwsIHNldFZhbHVlcyA9IHRydWUpIHtcbiAgICB0aGlzLmZvcm1Hcm91cFRlbXBsYXRlID0gYnVpbGRGb3JtR3JvdXBUZW1wbGF0ZSh0aGlzLCBmb3JtVmFsdWVzLCBzZXRWYWx1ZXMpO1xuICB9XG5cbiAgYnVpbGRGb3JtR3JvdXAoKSB7XG4gICAgdGhpcy5mb3JtR3JvdXAgPSA8Rm9ybUdyb3VwPmJ1aWxkRm9ybUdyb3VwKHRoaXMuZm9ybUdyb3VwVGVtcGxhdGUpO1xuICAgIGlmICh0aGlzLmZvcm1Hcm91cCkge1xuICAgICAgdGhpcy5jb21waWxlQWp2U2NoZW1hKCk7XG4gICAgICB0aGlzLnZhbGlkYXRlRGF0YSh0aGlzLmZvcm1Hcm91cC52YWx1ZSk7XG5cbiAgICAgIC8vIFNldCB1cCBvYnNlcnZhYmxlcyB0byBlbWl0IGRhdGEgYW5kIHZhbGlkYXRpb24gaW5mbyB3aGVuIGZvcm0gZGF0YSBjaGFuZ2VzXG4gICAgICBpZiAodGhpcy5mb3JtVmFsdWVTdWJzY3JpcHRpb24pIHsgdGhpcy5mb3JtVmFsdWVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTsgfVxuICAgICAgdGhpcy5mb3JtVmFsdWVTdWJzY3JpcHRpb24gPSB0aGlzLmZvcm1Hcm91cC52YWx1ZUNoYW5nZXNcbiAgICAgICAgLnN1YnNjcmliZShmb3JtVmFsdWUgPT4gdGhpcy52YWxpZGF0ZURhdGEoZm9ybVZhbHVlKSk7XG4gICAgfVxuICB9XG5cbiAgYnVpbGRMYXlvdXQod2lkZ2V0TGlicmFyeTogYW55KSB7XG4gICAgdGhpcy5sYXlvdXQgPSBidWlsZExheW91dCh0aGlzLCB3aWRnZXRMaWJyYXJ5KTtcbiAgfVxuXG4gIHNldE9wdGlvbnMobmV3T3B0aW9uczogYW55KSB7XG4gICAgaWYgKGlzT2JqZWN0KG5ld09wdGlvbnMpKSB7XG4gICAgICBjb25zdCBhZGRPcHRpb25zID0gXy5jbG9uZURlZXAobmV3T3B0aW9ucyk7XG4gICAgICAvLyBCYWNrd2FyZCBjb21wYXRpYmlsaXR5IGZvciAnZGVmYXVsdE9wdGlvbnMnIChyZW5hbWVkICdkZWZhdXRXaWRnZXRPcHRpb25zJylcbiAgICAgIGlmIChpc09iamVjdChhZGRPcHRpb25zLmRlZmF1bHRPcHRpb25zKSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuZm9ybU9wdGlvbnMuZGVmYXV0V2lkZ2V0T3B0aW9ucywgYWRkT3B0aW9ucy5kZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIGRlbGV0ZSBhZGRPcHRpb25zLmRlZmF1bHRPcHRpb25zO1xuICAgICAgfVxuICAgICAgaWYgKGlzT2JqZWN0KGFkZE9wdGlvbnMuZGVmYXV0V2lkZ2V0T3B0aW9ucykpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmZvcm1PcHRpb25zLmRlZmF1dFdpZGdldE9wdGlvbnMsIGFkZE9wdGlvbnMuZGVmYXV0V2lkZ2V0T3B0aW9ucyk7XG4gICAgICAgIGRlbGV0ZSBhZGRPcHRpb25zLmRlZmF1dFdpZGdldE9wdGlvbnM7XG4gICAgICB9XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMuZm9ybU9wdGlvbnMsIGFkZE9wdGlvbnMpO1xuXG4gICAgICAvLyBjb252ZXJ0IGRpc2FibGVFcnJvclN0YXRlIC8gZGlzYWJsZVN1Y2Nlc3NTdGF0ZSB0byBlbmFibGUuLi5cbiAgICAgIGNvbnN0IGdsb2JhbERlZmF1bHRzID0gdGhpcy5mb3JtT3B0aW9ucy5kZWZhdXRXaWRnZXRPcHRpb25zO1xuICAgICAgWydFcnJvclN0YXRlJywgJ1N1Y2Nlc3NTdGF0ZSddXG4gICAgICAgIC5maWx0ZXIoc3VmZml4ID0+IGhhc093bihnbG9iYWxEZWZhdWx0cywgJ2Rpc2FibGUnICsgc3VmZml4KSlcbiAgICAgICAgLmZvckVhY2goc3VmZml4ID0+IHtcbiAgICAgICAgICBnbG9iYWxEZWZhdWx0c1snZW5hYmxlJyArIHN1ZmZpeF0gPSAhZ2xvYmFsRGVmYXVsdHNbJ2Rpc2FibGUnICsgc3VmZml4XTtcbiAgICAgICAgICBkZWxldGUgZ2xvYmFsRGVmYXVsdHNbJ2Rpc2FibGUnICsgc3VmZml4XTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcGlsZUFqdlNjaGVtYSgpIHtcbiAgICBpZiAoIXRoaXMudmFsaWRhdGVGb3JtRGF0YSkge1xuXG4gICAgICAvLyBpZiAndWk6b3JkZXInIGV4aXN0cyBpbiBwcm9wZXJ0aWVzLCBtb3ZlIGl0IHRvIHJvb3QgYmVmb3JlIGNvbXBpbGluZyB3aXRoIGFqdlxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5zY2hlbWEucHJvcGVydGllc1sndWk6b3JkZXInXSkpIHtcbiAgICAgICAgdGhpcy5zY2hlbWFbJ3VpOm9yZGVyJ10gPSB0aGlzLnNjaGVtYS5wcm9wZXJ0aWVzWyd1aTpvcmRlciddO1xuICAgICAgICBkZWxldGUgdGhpcy5zY2hlbWEucHJvcGVydGllc1sndWk6b3JkZXInXTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYWp2LnJlbW92ZVNjaGVtYSh0aGlzLnNjaGVtYSk7XG4gICAgICB0aGlzLnZhbGlkYXRlRm9ybURhdGEgPSB0aGlzLmFqdi5jb21waWxlKHRoaXMuc2NoZW1hKTtcbiAgICB9XG4gIH1cblxuICBidWlsZFNjaGVtYUZyb21EYXRhKGRhdGE/OiBhbnksIHJlcXVpcmVBbGxGaWVsZHMgPSBmYWxzZSk6IGFueSB7XG4gICAgaWYgKGRhdGEpIHsgcmV0dXJuIGJ1aWxkU2NoZW1hRnJvbURhdGEoZGF0YSwgcmVxdWlyZUFsbEZpZWxkcyk7IH1cbiAgICB0aGlzLnNjaGVtYSA9IGJ1aWxkU2NoZW1hRnJvbURhdGEodGhpcy5mb3JtVmFsdWVzLCByZXF1aXJlQWxsRmllbGRzKTtcbiAgfVxuXG4gIGJ1aWxkU2NoZW1hRnJvbUxheW91dChsYXlvdXQ/OiBhbnkpOiBhbnkge1xuICAgIGlmIChsYXlvdXQpIHsgcmV0dXJuIGJ1aWxkU2NoZW1hRnJvbUxheW91dChsYXlvdXQpOyB9XG4gICAgdGhpcy5zY2hlbWEgPSBidWlsZFNjaGVtYUZyb21MYXlvdXQodGhpcy5sYXlvdXQpO1xuICB9XG5cblxuICBzZXRUcGxkYXRhKG5ld1RwbGRhdGE6IGFueSA9IHt9KTogdm9pZCB7XG4gICAgdGhpcy50cGxkYXRhID0gbmV3VHBsZGF0YTtcbiAgfVxuXG4gIHBhcnNlVGV4dChcbiAgICB0ZXh0ID0gJycsIHZhbHVlOiBhbnkgPSB7fSwgdmFsdWVzOiBhbnkgPSB7fSwga2V5OiBudW1iZXJ8c3RyaW5nID0gbnVsbFxuICApOiBzdHJpbmcge1xuICAgIGlmICghdGV4dCB8fCAhL3t7Lis/fX0vLnRlc3QodGV4dCkpIHsgcmV0dXJuIHRleHQ7IH1cbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC97eyguKz8pfX0vZywgKC4uLmEpID0+XG4gICAgICB0aGlzLnBhcnNlRXhwcmVzc2lvbihhWzFdLCB2YWx1ZSwgdmFsdWVzLCBrZXksIHRoaXMudHBsZGF0YSlcbiAgICApO1xuICB9XG5cbiAgcGFyc2VFeHByZXNzaW9uKFxuICAgIGV4cHJlc3Npb24gPSAnJywgdmFsdWU6IGFueSA9IHt9LCB2YWx1ZXM6IGFueSA9IHt9LFxuICAgIGtleTogbnVtYmVyfHN0cmluZyA9IG51bGwsIHRwbGRhdGE6IGFueSA9IG51bGxcbiAgKSB7XG4gICAgaWYgKHR5cGVvZiBleHByZXNzaW9uICE9PSAnc3RyaW5nJykgeyByZXR1cm4gJyc7IH1cbiAgICBjb25zdCBpbmRleCA9IHR5cGVvZiBrZXkgPT09ICdudW1iZXInID8gKGtleSArIDEpICsgJycgOiAoa2V5IHx8ICcnKTtcbiAgICBleHByZXNzaW9uID0gZXhwcmVzc2lvbi50cmltKCk7XG4gICAgaWYgKChleHByZXNzaW9uWzBdID09PSAnXFwnJyB8fCBleHByZXNzaW9uWzBdID09PSAnXCInKSAmJlxuICAgICAgZXhwcmVzc2lvblswXSA9PT0gZXhwcmVzc2lvbltleHByZXNzaW9uLmxlbmd0aCAtIDFdICYmXG4gICAgICBleHByZXNzaW9uLnNsaWNlKDEsIGV4cHJlc3Npb24ubGVuZ3RoIC0gMSkuaW5kZXhPZihleHByZXNzaW9uWzBdKSA9PT0gLTFcbiAgICApIHtcbiAgICAgIHJldHVybiBleHByZXNzaW9uLnNsaWNlKDEsIGV4cHJlc3Npb24ubGVuZ3RoIC0gMSk7XG4gICAgfVxuICAgIGlmIChleHByZXNzaW9uID09PSAnaWR4JyB8fCBleHByZXNzaW9uID09PSAnJGluZGV4JykgeyByZXR1cm4gaW5kZXg7IH1cbiAgICBpZiAoZXhwcmVzc2lvbiA9PT0gJ3ZhbHVlJyAmJiAhaGFzT3duKHZhbHVlcywgJ3ZhbHVlJykpIHsgcmV0dXJuIHZhbHVlOyB9XG4gICAgaWYgKFsnXCInLCAnXFwnJywgJyAnLCAnfHwnLCAnJiYnLCAnKyddLmV2ZXJ5KGRlbGltID0+IGV4cHJlc3Npb24uaW5kZXhPZihkZWxpbSkgPT09IC0xKSkge1xuICAgICAgY29uc3QgcG9pbnRlciA9IEpzb25Qb2ludGVyLnBhcnNlT2JqZWN0UGF0aChleHByZXNzaW9uKTtcbiAgICAgIHJldHVybiBwb2ludGVyWzBdID09PSAndmFsdWUnICYmIEpzb25Qb2ludGVyLmhhcyh2YWx1ZSwgcG9pbnRlci5zbGljZSgxKSkgP1xuICAgICAgICAgIEpzb25Qb2ludGVyLmdldCh2YWx1ZSwgcG9pbnRlci5zbGljZSgxKSkgOlxuICAgICAgICBwb2ludGVyWzBdID09PSAndmFsdWVzJyAmJiBKc29uUG9pbnRlci5oYXModmFsdWVzLCBwb2ludGVyLnNsaWNlKDEpKSA/XG4gICAgICAgICAgSnNvblBvaW50ZXIuZ2V0KHZhbHVlcywgcG9pbnRlci5zbGljZSgxKSkgOlxuICAgICAgICBwb2ludGVyWzBdID09PSAndHBsZGF0YScgJiYgSnNvblBvaW50ZXIuaGFzKHRwbGRhdGEsIHBvaW50ZXIuc2xpY2UoMSkpID9cbiAgICAgICAgICBKc29uUG9pbnRlci5nZXQodHBsZGF0YSwgcG9pbnRlci5zbGljZSgxKSkgOlxuICAgICAgICBKc29uUG9pbnRlci5oYXModmFsdWVzLCBwb2ludGVyKSA/IEpzb25Qb2ludGVyLmdldCh2YWx1ZXMsIHBvaW50ZXIpIDogJyc7XG4gICAgfVxuICAgIGlmIChleHByZXNzaW9uLmluZGV4T2YoJ1tpZHhdJykgPiAtMSkge1xuICAgICAgZXhwcmVzc2lvbiA9IGV4cHJlc3Npb24ucmVwbGFjZSgvXFxbaWR4XFxdL2csIDxzdHJpbmc+aW5kZXgpO1xuICAgIH1cbiAgICBpZiAoZXhwcmVzc2lvbi5pbmRleE9mKCdbJGluZGV4XScpID4gLTEpIHtcbiAgICAgIGV4cHJlc3Npb24gPSBleHByZXNzaW9uLnJlcGxhY2UoL1xcWyRpbmRleFxcXS9nLCA8c3RyaW5nPmluZGV4KTtcbiAgICB9XG4gICAgLy8gVE9ETzogSW1wcm92ZSBleHByZXNzaW9uIGV2YWx1YXRpb24gYnkgcGFyc2luZyBxdW90ZWQgc3RyaW5ncyBmaXJzdFxuICAgIC8vIGxldCBleHByZXNzaW9uQXJyYXkgPSBleHByZXNzaW9uLm1hdGNoKC8oW15cIiddK3xcIlteXCJdK1wifCdbXiddKycpL2cpO1xuICAgIGlmIChleHByZXNzaW9uLmluZGV4T2YoJ3x8JykgPiAtMSkge1xuICAgICAgcmV0dXJuIGV4cHJlc3Npb24uc3BsaXQoJ3x8JykucmVkdWNlKChhbGwsIHRlcm0pID0+XG4gICAgICAgIGFsbCB8fCB0aGlzLnBhcnNlRXhwcmVzc2lvbih0ZXJtLCB2YWx1ZSwgdmFsdWVzLCBrZXksIHRwbGRhdGEpLCAnJ1xuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGV4cHJlc3Npb24uaW5kZXhPZignJiYnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gZXhwcmVzc2lvbi5zcGxpdCgnJiYnKS5yZWR1Y2UoKGFsbCwgdGVybSkgPT5cbiAgICAgICAgYWxsICYmIHRoaXMucGFyc2VFeHByZXNzaW9uKHRlcm0sIHZhbHVlLCB2YWx1ZXMsIGtleSwgdHBsZGF0YSksICcgJ1xuICAgICAgKS50cmltKCk7XG4gICAgfVxuICAgIGlmIChleHByZXNzaW9uLmluZGV4T2YoJysnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gZXhwcmVzc2lvbi5zcGxpdCgnKycpXG4gICAgICAgIC5tYXAodGVybSA9PiB0aGlzLnBhcnNlRXhwcmVzc2lvbih0ZXJtLCB2YWx1ZSwgdmFsdWVzLCBrZXksIHRwbGRhdGEpKVxuICAgICAgICAuam9pbignJyk7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHNldEFycmF5SXRlbVRpdGxlKFxuICAgIHBhcmVudEN0eDogYW55ID0ge30sIGNoaWxkTm9kZTogYW55ID0gbnVsbCwgaW5kZXg6IG51bWJlciA9IG51bGxcbiAgKTogc3RyaW5nIHtcbiAgICBjb25zdCBwYXJlbnROb2RlID0gcGFyZW50Q3R4LmxheW91dE5vZGU7XG4gICAgY29uc3QgcGFyZW50VmFsdWVzOiBhbnkgPSB0aGlzLmdldEZvcm1Db250cm9sVmFsdWUocGFyZW50Q3R4KTtcbiAgICBjb25zdCBpc0FycmF5SXRlbSA9XG4gICAgICAocGFyZW50Tm9kZS50eXBlIHx8ICcnKS5zbGljZSgtNSkgPT09ICdhcnJheScgJiYgaXNBcnJheShwYXJlbnRWYWx1ZXMpO1xuICAgIGNvbnN0IHRleHQgPSBKc29uUG9pbnRlci5nZXRGaXJzdChcbiAgICAgIGlzQXJyYXlJdGVtICYmIGNoaWxkTm9kZS50eXBlICE9PSAnJHJlZicgPyBbXG4gICAgICAgIFtjaGlsZE5vZGUsICcvb3B0aW9ucy9sZWdlbmQnXSxcbiAgICAgICAgW2NoaWxkTm9kZSwgJy9vcHRpb25zL3RpdGxlJ10sXG4gICAgICAgIFtwYXJlbnROb2RlLCAnL29wdGlvbnMvdGl0bGUnXSxcbiAgICAgICAgW3BhcmVudE5vZGUsICcvb3B0aW9ucy9sZWdlbmQnXSxcbiAgICAgIF0gOiBbXG4gICAgICAgIFtjaGlsZE5vZGUsICcvb3B0aW9ucy90aXRsZSddLFxuICAgICAgICBbY2hpbGROb2RlLCAnL29wdGlvbnMvbGVnZW5kJ10sXG4gICAgICAgIFtwYXJlbnROb2RlLCAnL29wdGlvbnMvdGl0bGUnXSxcbiAgICAgICAgW3BhcmVudE5vZGUsICcvb3B0aW9ucy9sZWdlbmQnXVxuICAgICAgXVxuICAgICk7XG4gICAgaWYgKCF0ZXh0KSB7IHJldHVybiB0ZXh0OyB9XG4gICAgY29uc3QgY2hpbGRWYWx1ZSA9IGlzQXJyYXkocGFyZW50VmFsdWVzKSAmJiBpbmRleCA8IHBhcmVudFZhbHVlcy5sZW5ndGggP1xuICAgICAgcGFyZW50VmFsdWVzW2luZGV4XSA6IHBhcmVudFZhbHVlcztcbiAgICByZXR1cm4gdGhpcy5wYXJzZVRleHQodGV4dCwgY2hpbGRWYWx1ZSwgcGFyZW50VmFsdWVzLCBpbmRleCk7XG4gIH1cblxuICBzZXRJdGVtVGl0bGUoY3R4OiBhbnkpIHtcbiAgICByZXR1cm4gIWN0eC5vcHRpb25zLnRpdGxlICYmIC9eKFxcZCt8LSkkLy50ZXN0KGN0eC5sYXlvdXROb2RlLm5hbWUpID9cbiAgICAgIG51bGwgOlxuICAgICAgdGhpcy5wYXJzZVRleHQoXG4gICAgICAgIGN0eC5vcHRpb25zLnRpdGxlIHx8IHRvVGl0bGVDYXNlKGN0eC5sYXlvdXROb2RlLm5hbWUpLFxuICAgICAgICB0aGlzLmdldEZvcm1Db250cm9sVmFsdWUodGhpcyksXG4gICAgICAgICh0aGlzLmdldEZvcm1Db250cm9sR3JvdXAodGhpcykgfHwgPGFueT57fSkudmFsdWUsXG4gICAgICAgIGN0eC5kYXRhSW5kZXhbY3R4LmRhdGFJbmRleC5sZW5ndGggLSAxXVxuICAgICAgKTtcbiAgfVxuXG4gIGV2YWx1YXRlQ29uZGl0aW9uKGxheW91dE5vZGU6IGFueSwgZGF0YUluZGV4OiBudW1iZXJbXSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGFycmF5SW5kZXggPSBkYXRhSW5kZXggJiYgZGF0YUluZGV4W2RhdGFJbmRleC5sZW5ndGggLSAxXTtcbiAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcbiAgICBpZiAoaGFzVmFsdWUoKGxheW91dE5vZGUub3B0aW9ucyB8fCB7fSkuY29uZGl0aW9uKSkge1xuICAgICAgaWYgKHR5cGVvZiBsYXlvdXROb2RlLm9wdGlvbnMuY29uZGl0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICBsZXQgcG9pbnRlciA9IGxheW91dE5vZGUub3B0aW9ucy5jb25kaXRpb247XG4gICAgICAgIGlmIChoYXNWYWx1ZShhcnJheUluZGV4KSkge1xuICAgICAgICAgIHBvaW50ZXIgPSBwb2ludGVyLnJlcGxhY2UoJ1thcnJheUluZGV4XScsIGBbJHthcnJheUluZGV4fV1gKTtcbiAgICAgICAgfVxuICAgICAgICBwb2ludGVyID0gSnNvblBvaW50ZXIucGFyc2VPYmplY3RQYXRoKHBvaW50ZXIpO1xuICAgICAgICByZXN1bHQgPSAhIUpzb25Qb2ludGVyLmdldCh0aGlzLmRhdGEsIHBvaW50ZXIpO1xuICAgICAgICBpZiAoIXJlc3VsdCAmJiBwb2ludGVyWzBdID09PSAnbW9kZWwnKSB7XG4gICAgICAgICAgcmVzdWx0ID0gISFKc29uUG9pbnRlci5nZXQoeyBtb2RlbDogdGhpcy5kYXRhIH0sIHBvaW50ZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsYXlvdXROb2RlLm9wdGlvbnMuY29uZGl0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJlc3VsdCA9IGxheW91dE5vZGUub3B0aW9ucy5jb25kaXRpb24odGhpcy5kYXRhKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxheW91dE5vZGUub3B0aW9ucy5jb25kaXRpb24uZnVuY3Rpb25Cb2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGR5bkZuID0gbmV3IEZ1bmN0aW9uKFxuICAgICAgICAgICAgJ21vZGVsJywgJ2FycmF5SW5kaWNlcycsIGxheW91dE5vZGUub3B0aW9ucy5jb25kaXRpb24uZnVuY3Rpb25Cb2R5XG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXN1bHQgPSBkeW5Gbih0aGlzLmRhdGEsIGRhdGFJbmRleCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2NvbmRpdGlvbiBmdW5jdGlvbkJvZHkgZXJyb3JlZCBvdXQgb24gZXZhbHVhdGlvbjogJyArIGxheW91dE5vZGUub3B0aW9ucy5jb25kaXRpb24uZnVuY3Rpb25Cb2R5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaW5pdGlhbGl6ZUNvbnRyb2woY3R4OiBhbnksIGJpbmQgPSB0cnVlKTogYm9vbGVhbiB7XG4gICAgaWYgKCFpc09iamVjdChjdHgpKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGlmIChpc0VtcHR5KGN0eC5vcHRpb25zKSkge1xuICAgICAgY3R4Lm9wdGlvbnMgPSAhaXNFbXB0eSgoY3R4LmxheW91dE5vZGUgfHwge30pLm9wdGlvbnMpID9cbiAgICAgICAgY3R4LmxheW91dE5vZGUub3B0aW9ucyA6IF8uY2xvbmVEZWVwKHRoaXMuZm9ybU9wdGlvbnMpO1xuICAgIH1cbiAgICBjdHguZm9ybUNvbnRyb2wgPSB0aGlzLmdldEZvcm1Db250cm9sKGN0eCk7XG4gICAgY3R4LmJvdW5kQ29udHJvbCA9IGJpbmQgJiYgISFjdHguZm9ybUNvbnRyb2w7XG4gICAgaWYgKGN0eC5mb3JtQ29udHJvbCkge1xuICAgICAgY3R4LmNvbnRyb2xOYW1lID0gdGhpcy5nZXRGb3JtQ29udHJvbE5hbWUoY3R4KTtcbiAgICAgIGN0eC5jb250cm9sVmFsdWUgPSBjdHguZm9ybUNvbnRyb2wudmFsdWU7XG4gICAgICBjdHguY29udHJvbERpc2FibGVkID0gY3R4LmZvcm1Db250cm9sLmRpc2FibGVkO1xuICAgICAgY3R4Lm9wdGlvbnMuZXJyb3JNZXNzYWdlID0gY3R4LmZvcm1Db250cm9sLnN0YXR1cyA9PT0gJ1ZBTElEJyA/IG51bGwgOlxuICAgICAgICB0aGlzLmZvcm1hdEVycm9ycyhjdHguZm9ybUNvbnRyb2wuZXJyb3JzLCBjdHgub3B0aW9ucy52YWxpZGF0aW9uTWVzc2FnZXMpO1xuICAgICAgY3R4Lm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRoaXMuZm9ybU9wdGlvbnMudmFsaWRhdGVPblJlbmRlciA9PT0gdHJ1ZSB8fFxuICAgICAgICAodGhpcy5mb3JtT3B0aW9ucy52YWxpZGF0ZU9uUmVuZGVyID09PSAnYXV0bycgJiYgaGFzVmFsdWUoY3R4LmNvbnRyb2xWYWx1ZSkpO1xuICAgICAgY3R4LmZvcm1Db250cm9sLnN0YXR1c0NoYW5nZXMuc3Vic2NyaWJlKHN0YXR1cyA9PlxuICAgICAgICBjdHgub3B0aW9ucy5lcnJvck1lc3NhZ2UgPSBzdGF0dXMgPT09ICdWQUxJRCcgPyBudWxsIDpcbiAgICAgICAgICB0aGlzLmZvcm1hdEVycm9ycyhjdHguZm9ybUNvbnRyb2wuZXJyb3JzLCBjdHgub3B0aW9ucy52YWxpZGF0aW9uTWVzc2FnZXMpXG4gICAgICApO1xuICAgICAgY3R4LmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICBpZiAoIV8uaXNFcXVhbChjdHguY29udHJvbFZhbHVlLCB2YWx1ZSkpIHsgY3R4LmNvbnRyb2xWYWx1ZSA9IHZhbHVlOyB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3R4LmNvbnRyb2xOYW1lID0gY3R4LmxheW91dE5vZGUubmFtZTtcbiAgICAgIGN0eC5jb250cm9sVmFsdWUgPSBjdHgubGF5b3V0Tm9kZS52YWx1ZSB8fCBudWxsO1xuICAgICAgY29uc3QgZGF0YVBvaW50ZXIgPSB0aGlzLmdldERhdGFQb2ludGVyKGN0eCk7XG4gICAgICBpZiAoYmluZCAmJiBkYXRhUG9pbnRlcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGB3YXJuaW5nOiBjb250cm9sIFwiJHtkYXRhUG9pbnRlcn1cIiBpcyBub3QgYm91bmQgdG8gdGhlIEFuZ3VsYXIgRm9ybUdyb3VwLmApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3R4LmJvdW5kQ29udHJvbDtcbiAgfVxuXG4gIGZvcm1hdEVycm9ycyhlcnJvcnM6IGFueSwgdmFsaWRhdGlvbk1lc3NhZ2VzOiBhbnkgPSB7fSk6IHN0cmluZyB7XG4gICAgaWYgKGlzRW1wdHkoZXJyb3JzKSkgeyByZXR1cm4gbnVsbDsgfVxuICAgIGlmICghaXNPYmplY3QodmFsaWRhdGlvbk1lc3NhZ2VzKSkgeyB2YWxpZGF0aW9uTWVzc2FnZXMgPSB7fTsgfVxuICAgIGNvbnN0IGFkZFNwYWNlcyA9IHN0cmluZyA9PiBzdHJpbmdbMF0udG9VcHBlckNhc2UoKSArIChzdHJpbmcuc2xpY2UoMSkgfHwgJycpXG4gICAgICAucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxICQyJykucmVwbGFjZSgvXy9nLCAnICcpO1xuICAgIGNvbnN0IGZvcm1hdEVycm9yID0gKGVycm9yKSA9PiB0eXBlb2YgZXJyb3IgPT09ICdvYmplY3QnID9cbiAgICAgIE9iamVjdC5rZXlzKGVycm9yKS5tYXAoa2V5ID0+XG4gICAgICAgIGVycm9yW2tleV0gPT09IHRydWUgPyBhZGRTcGFjZXMoa2V5KSA6XG4gICAgICAgIGVycm9yW2tleV0gPT09IGZhbHNlID8gJ05vdCAnICsgYWRkU3BhY2VzKGtleSkgOlxuICAgICAgICBhZGRTcGFjZXMoa2V5KSArICc6ICcgKyBmb3JtYXRFcnJvcihlcnJvcltrZXldKVxuICAgICAgKS5qb2luKCcsICcpIDpcbiAgICAgIGFkZFNwYWNlcyhlcnJvci50b1N0cmluZygpKTtcbiAgICBjb25zdCBtZXNzYWdlcyA9IFtdO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhlcnJvcnMpXG4gICAgICAvLyBIaWRlICdyZXF1aXJlZCcgZXJyb3IsIHVubGVzcyBpdCBpcyB0aGUgb25seSBvbmVcbiAgICAgIC5maWx0ZXIoZXJyb3JLZXkgPT4gZXJyb3JLZXkgIT09ICdyZXF1aXJlZCcgfHwgT2JqZWN0LmtleXMoZXJyb3JzKS5sZW5ndGggPT09IDEpXG4gICAgICAubWFwKGVycm9yS2V5ID0+XG4gICAgICAgIC8vIElmIHZhbGlkYXRpb25NZXNzYWdlcyBpcyBhIHN0cmluZywgcmV0dXJuIGl0XG4gICAgICAgIHR5cGVvZiB2YWxpZGF0aW9uTWVzc2FnZXMgPT09ICdzdHJpbmcnID8gdmFsaWRhdGlvbk1lc3NhZ2VzIDpcbiAgICAgICAgLy8gSWYgY3VzdG9tIGVycm9yIG1lc3NhZ2UgaXMgYSBmdW5jdGlvbiwgcmV0dXJuIGZ1bmN0aW9uIHJlc3VsdFxuICAgICAgICB0eXBlb2YgdmFsaWRhdGlvbk1lc3NhZ2VzW2Vycm9yS2V5XSA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgICAgdmFsaWRhdGlvbk1lc3NhZ2VzW2Vycm9yS2V5XShlcnJvcnNbZXJyb3JLZXldKSA6XG4gICAgICAgIC8vIElmIGN1c3RvbSBlcnJvciBtZXNzYWdlIGlzIGEgc3RyaW5nLCByZXBsYWNlIHBsYWNlaG9sZGVycyBhbmQgcmV0dXJuXG4gICAgICAgIHR5cGVvZiB2YWxpZGF0aW9uTWVzc2FnZXNbZXJyb3JLZXldID09PSAnc3RyaW5nJyA/XG4gICAgICAgICAgLy8gRG9lcyBlcnJvciBtZXNzYWdlIGhhdmUgYW55IHt7cHJvcGVydHl9fSBwbGFjZWhvbGRlcnM/XG4gICAgICAgICAgIS97ey4rP319Ly50ZXN0KHZhbGlkYXRpb25NZXNzYWdlc1tlcnJvcktleV0pID9cbiAgICAgICAgICAgIHZhbGlkYXRpb25NZXNzYWdlc1tlcnJvcktleV0gOlxuICAgICAgICAgICAgLy8gUmVwbGFjZSB7e3Byb3BlcnR5fX0gcGxhY2Vob2xkZXJzIHdpdGggdmFsdWVzXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhlcnJvcnNbZXJyb3JLZXldKVxuICAgICAgICAgICAgICAucmVkdWNlKChlcnJvck1lc3NhZ2UsIGVycm9yUHJvcGVydHkpID0+IGVycm9yTWVzc2FnZS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoJ3t7JyArIGVycm9yUHJvcGVydHkgKyAnfX0nLCAnZycpLFxuICAgICAgICAgICAgICAgIGVycm9yc1tlcnJvcktleV1bZXJyb3JQcm9wZXJ0eV1cbiAgICAgICAgICAgICAgKSwgdmFsaWRhdGlvbk1lc3NhZ2VzW2Vycm9yS2V5XSkgOlxuICAgICAgICAgIC8vIElmIG5vIGN1c3RvbSBlcnJvciBtZXNzYWdlLCByZXR1cm4gZm9ybWF0dGVkIGVycm9yIGRhdGEgaW5zdGVhZFxuICAgICAgICAgIGFkZFNwYWNlcyhlcnJvcktleSkgKyAnIEVycm9yOiAnICsgZm9ybWF0RXJyb3IoZXJyb3JzW2Vycm9yS2V5XSlcbiAgICAgICkuam9pbignPGJyPicpO1xuICB9XG5cbiAgdXBkYXRlVmFsdWUoY3R4OiBhbnksIHZhbHVlOiBhbnkpOiB2b2lkIHtcblxuICAgIC8vIFNldCB2YWx1ZSBvZiBjdXJyZW50IGNvbnRyb2xcbiAgICBjdHguY29udHJvbFZhbHVlID0gdmFsdWU7XG4gICAgaWYgKGN0eC5ib3VuZENvbnRyb2wpIHtcbiAgICAgIGN0eC5mb3JtQ29udHJvbC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICBjdHguZm9ybUNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICB9XG4gICAgY3R4LmxheW91dE5vZGUudmFsdWUgPSB2YWx1ZTtcblxuICAgIC8vIFNldCB2YWx1ZXMgb2YgYW55IHJlbGF0ZWQgY29udHJvbHMgaW4gY29weVZhbHVlVG8gYXJyYXlcbiAgICBpZiAoaXNBcnJheShjdHgub3B0aW9ucy5jb3B5VmFsdWVUbykpIHtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjdHgub3B0aW9ucy5jb3B5VmFsdWVUbykge1xuICAgICAgICBjb25zdCB0YXJnZXRDb250cm9sID0gZ2V0Q29udHJvbCh0aGlzLmZvcm1Hcm91cCwgaXRlbSk7XG4gICAgICAgIGlmIChpc09iamVjdCh0YXJnZXRDb250cm9sKSAmJiB0eXBlb2YgdGFyZ2V0Q29udHJvbC5zZXRWYWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRhcmdldENvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICAgIHRhcmdldENvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUFycmF5Q2hlY2tib3hMaXN0KGN0eDogYW55LCBjaGVja2JveExpc3Q6IFRpdGxlTWFwSXRlbVtdKTogdm9pZCB7XG4gICAgY29uc3QgZm9ybUFycmF5ID0gPEZvcm1BcnJheT50aGlzLmdldEZvcm1Db250cm9sKGN0eCk7XG5cbiAgICAvLyBSZW1vdmUgYWxsIGV4aXN0aW5nIGl0ZW1zXG4gICAgd2hpbGUgKGZvcm1BcnJheS52YWx1ZS5sZW5ndGgpIHsgZm9ybUFycmF5LnJlbW92ZUF0KDApOyB9XG5cbiAgICAvLyBSZS1hZGQgYW4gaXRlbSBmb3IgZWFjaCBjaGVja2VkIGJveFxuICAgIGNvbnN0IHJlZlBvaW50ZXIgPSByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzKFxuICAgICAgY3R4LmxheW91dE5vZGUuZGF0YVBvaW50ZXIgKyAnLy0nLCB0aGlzLmRhdGFSZWN1cnNpdmVSZWZNYXAsIHRoaXMuYXJyYXlNYXBcbiAgICApO1xuICAgIGZvciAoY29uc3QgY2hlY2tib3hJdGVtIG9mIGNoZWNrYm94TGlzdCkge1xuICAgICAgaWYgKGNoZWNrYm94SXRlbS5jaGVja2VkKSB7XG4gICAgICAgIGNvbnN0IG5ld0Zvcm1Db250cm9sID0gYnVpbGRGb3JtR3JvdXAodGhpcy50ZW1wbGF0ZVJlZkxpYnJhcnlbcmVmUG9pbnRlcl0pO1xuICAgICAgICBuZXdGb3JtQ29udHJvbC5zZXRWYWx1ZShjaGVja2JveEl0ZW0udmFsdWUpO1xuICAgICAgICBmb3JtQXJyYXkucHVzaChuZXdGb3JtQ29udHJvbCk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvcm1BcnJheS5tYXJrQXNEaXJ0eSgpO1xuICB9XG5cbiAgZ2V0Rm9ybUNvbnRyb2woY3R4OiBhbnkpOiBBYnN0cmFjdENvbnRyb2wge1xuICAgIGlmIChcbiAgICAgICFjdHgubGF5b3V0Tm9kZSB8fCAhaXNEZWZpbmVkKGN0eC5sYXlvdXROb2RlLmRhdGFQb2ludGVyKSB8fFxuICAgICAgY3R4LmxheW91dE5vZGUudHlwZSA9PT0gJyRyZWYnXG4gICAgKSB7IHJldHVybiBudWxsOyB9XG4gICAgcmV0dXJuIGdldENvbnRyb2wodGhpcy5mb3JtR3JvdXAsIHRoaXMuZ2V0RGF0YVBvaW50ZXIoY3R4KSk7XG4gIH1cblxuICBnZXRGb3JtQ29udHJvbFZhbHVlKGN0eDogYW55KTogQWJzdHJhY3RDb250cm9sIHtcbiAgICBpZiAoXG4gICAgICAhY3R4LmxheW91dE5vZGUgfHwgIWlzRGVmaW5lZChjdHgubGF5b3V0Tm9kZS5kYXRhUG9pbnRlcikgfHxcbiAgICAgIGN0eC5sYXlvdXROb2RlLnR5cGUgPT09ICckcmVmJ1xuICAgICkgeyByZXR1cm4gbnVsbDsgfVxuICAgIGNvbnN0IGNvbnRyb2wgPSBnZXRDb250cm9sKHRoaXMuZm9ybUdyb3VwLCB0aGlzLmdldERhdGFQb2ludGVyKGN0eCkpO1xuICAgIHJldHVybiBjb250cm9sID8gY29udHJvbC52YWx1ZSA6IG51bGw7XG4gIH1cblxuICBnZXRGb3JtQ29udHJvbEdyb3VwKGN0eDogYW55KTogRm9ybUFycmF5IHwgRm9ybUdyb3VwIHtcbiAgICBpZiAoIWN0eC5sYXlvdXROb2RlIHx8ICFpc0RlZmluZWQoY3R4LmxheW91dE5vZGUuZGF0YVBvaW50ZXIpKSB7IHJldHVybiBudWxsOyB9XG4gICAgcmV0dXJuIGdldENvbnRyb2wodGhpcy5mb3JtR3JvdXAsIHRoaXMuZ2V0RGF0YVBvaW50ZXIoY3R4KSwgdHJ1ZSk7XG4gIH1cblxuICBnZXRGb3JtQ29udHJvbE5hbWUoY3R4OiBhbnkpOiBzdHJpbmcge1xuICAgIGlmIChcbiAgICAgICFjdHgubGF5b3V0Tm9kZSB8fCAhaXNEZWZpbmVkKGN0eC5sYXlvdXROb2RlLmRhdGFQb2ludGVyKSB8fCAhaGFzVmFsdWUoY3R4LmRhdGFJbmRleClcbiAgICApIHsgcmV0dXJuIG51bGw7IH1cbiAgICByZXR1cm4gSnNvblBvaW50ZXIudG9LZXkodGhpcy5nZXREYXRhUG9pbnRlcihjdHgpKTtcbiAgfVxuXG4gIGdldExheW91dEFycmF5KGN0eDogYW55KTogYW55W10ge1xuICAgIHJldHVybiBKc29uUG9pbnRlci5nZXQodGhpcy5sYXlvdXQsIHRoaXMuZ2V0TGF5b3V0UG9pbnRlcihjdHgpLCAwLCAtMSk7XG4gIH1cblxuICBnZXRQYXJlbnROb2RlKGN0eDogYW55KTogYW55IHtcbiAgICByZXR1cm4gSnNvblBvaW50ZXIuZ2V0KHRoaXMubGF5b3V0LCB0aGlzLmdldExheW91dFBvaW50ZXIoY3R4KSwgMCwgLTIpO1xuICB9XG5cbiAgZ2V0RGF0YVBvaW50ZXIoY3R4OiBhbnkpOiBzdHJpbmcge1xuICAgIGlmIChcbiAgICAgICFjdHgubGF5b3V0Tm9kZSB8fCAhaXNEZWZpbmVkKGN0eC5sYXlvdXROb2RlLmRhdGFQb2ludGVyKSB8fCAhaGFzVmFsdWUoY3R4LmRhdGFJbmRleClcbiAgICApIHsgcmV0dXJuIG51bGw7IH1cbiAgICByZXR1cm4gSnNvblBvaW50ZXIudG9JbmRleGVkUG9pbnRlcihcbiAgICAgIGN0eC5sYXlvdXROb2RlLmRhdGFQb2ludGVyLCBjdHguZGF0YUluZGV4LCB0aGlzLmFycmF5TWFwXG4gICAgKTtcbiAgfVxuXG4gIGdldExheW91dFBvaW50ZXIoY3R4OiBhbnkpOiBzdHJpbmcge1xuICAgIGlmICghaGFzVmFsdWUoY3R4LmxheW91dEluZGV4KSkgeyByZXR1cm4gbnVsbDsgfVxuICAgIHJldHVybiAnLycgKyBjdHgubGF5b3V0SW5kZXguam9pbignL2l0ZW1zLycpO1xuICB9XG5cbiAgaXNDb250cm9sQm91bmQoY3R4OiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAoXG4gICAgICAhY3R4LmxheW91dE5vZGUgfHwgIWlzRGVmaW5lZChjdHgubGF5b3V0Tm9kZS5kYXRhUG9pbnRlcikgfHwgIWhhc1ZhbHVlKGN0eC5kYXRhSW5kZXgpXG4gICAgKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGNvbnN0IGNvbnRyb2xHcm91cCA9IHRoaXMuZ2V0Rm9ybUNvbnRyb2xHcm91cChjdHgpO1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldEZvcm1Db250cm9sTmFtZShjdHgpO1xuICAgIHJldHVybiBjb250cm9sR3JvdXAgPyBoYXNPd24oY29udHJvbEdyb3VwLmNvbnRyb2xzLCBuYW1lKSA6IGZhbHNlO1xuICB9XG5cbiAgYWRkSXRlbShjdHg6IGFueSwgbmFtZT86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmIChcbiAgICAgICFjdHgubGF5b3V0Tm9kZSB8fCAhaXNEZWZpbmVkKGN0eC5sYXlvdXROb2RlLiRyZWYpIHx8XG4gICAgICAhaGFzVmFsdWUoY3R4LmRhdGFJbmRleCkgfHwgIWhhc1ZhbHVlKGN0eC5sYXlvdXRJbmRleClcbiAgICApIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAvLyBDcmVhdGUgYSBuZXcgQW5ndWxhciBmb3JtIGNvbnRyb2wgZnJvbSBhIHRlbXBsYXRlIGluIHRlbXBsYXRlUmVmTGlicmFyeVxuICAgIGNvbnN0IG5ld0Zvcm1Hcm91cCA9IGJ1aWxkRm9ybUdyb3VwKHRoaXMudGVtcGxhdGVSZWZMaWJyYXJ5W2N0eC5sYXlvdXROb2RlLiRyZWZdKTtcblxuICAgIC8vIEFkZCB0aGUgbmV3IGZvcm0gY29udHJvbCB0byB0aGUgcGFyZW50IGZvcm1BcnJheSBvciBmb3JtR3JvdXBcbiAgICBpZiAoY3R4LmxheW91dE5vZGUuYXJyYXlJdGVtKSB7IC8vIEFkZCBuZXcgYXJyYXkgaXRlbSB0byBmb3JtQXJyYXlcbiAgICAgICg8Rm9ybUFycmF5PnRoaXMuZ2V0Rm9ybUNvbnRyb2xHcm91cChjdHgpKS5wdXNoKG5ld0Zvcm1Hcm91cCk7XG4gICAgfSBlbHNlIHsgLy8gQWRkIG5ldyAkcmVmIGl0ZW0gdG8gZm9ybUdyb3VwXG4gICAgICAoPEZvcm1Hcm91cD50aGlzLmdldEZvcm1Db250cm9sR3JvdXAoY3R4KSlcbiAgICAgICAgLmFkZENvbnRyb2wobmFtZSB8fCB0aGlzLmdldEZvcm1Db250cm9sTmFtZShjdHgpLCBuZXdGb3JtR3JvdXApO1xuICAgIH1cblxuICAgIC8vIENvcHkgYSBuZXcgbGF5b3V0Tm9kZSBmcm9tIGxheW91dFJlZkxpYnJhcnlcbiAgICBjb25zdCBuZXdMYXlvdXROb2RlID0gZ2V0TGF5b3V0Tm9kZShjdHgubGF5b3V0Tm9kZSwgdGhpcyk7XG4gICAgbmV3TGF5b3V0Tm9kZS5hcnJheUl0ZW0gPSBjdHgubGF5b3V0Tm9kZS5hcnJheUl0ZW07XG4gICAgaWYgKGN0eC5sYXlvdXROb2RlLmFycmF5SXRlbVR5cGUpIHtcbiAgICAgIG5ld0xheW91dE5vZGUuYXJyYXlJdGVtVHlwZSA9IGN0eC5sYXlvdXROb2RlLmFycmF5SXRlbVR5cGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSBuZXdMYXlvdXROb2RlLmFycmF5SXRlbVR5cGU7XG4gICAgfVxuICAgIGlmIChuYW1lKSB7XG4gICAgICBuZXdMYXlvdXROb2RlLm5hbWUgPSBuYW1lO1xuICAgICAgbmV3TGF5b3V0Tm9kZS5kYXRhUG9pbnRlciArPSAnLycgKyBKc29uUG9pbnRlci5lc2NhcGUobmFtZSk7XG4gICAgICBuZXdMYXlvdXROb2RlLm9wdGlvbnMudGl0bGUgPSBmaXhUaXRsZShuYW1lKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgdGhlIG5ldyBsYXlvdXROb2RlIHRvIHRoZSBmb3JtIGxheW91dFxuICAgIEpzb25Qb2ludGVyLmluc2VydCh0aGlzLmxheW91dCwgdGhpcy5nZXRMYXlvdXRQb2ludGVyKGN0eCksIG5ld0xheW91dE5vZGUpO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBtb3ZlQXJyYXlJdGVtKGN0eDogYW55LCBvbGRJbmRleDogbnVtYmVyLCBuZXdJbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgaWYgKFxuICAgICAgIWN0eC5sYXlvdXROb2RlIHx8ICFpc0RlZmluZWQoY3R4LmxheW91dE5vZGUuZGF0YVBvaW50ZXIpIHx8XG4gICAgICAhaGFzVmFsdWUoY3R4LmRhdGFJbmRleCkgfHwgIWhhc1ZhbHVlKGN0eC5sYXlvdXRJbmRleCkgfHxcbiAgICAgICFpc0RlZmluZWQob2xkSW5kZXgpIHx8ICFpc0RlZmluZWQobmV3SW5kZXgpIHx8IG9sZEluZGV4ID09PSBuZXdJbmRleFxuICAgICkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIC8vIE1vdmUgaXRlbSBpbiB0aGUgZm9ybUFycmF5XG4gICAgY29uc3QgZm9ybUFycmF5ID0gPEZvcm1BcnJheT50aGlzLmdldEZvcm1Db250cm9sR3JvdXAoY3R4KTtcbiAgICBjb25zdCBhcnJheUl0ZW0gPSBmb3JtQXJyYXkuYXQob2xkSW5kZXgpO1xuICAgIGZvcm1BcnJheS5yZW1vdmVBdChvbGRJbmRleCk7XG4gICAgZm9ybUFycmF5Lmluc2VydChuZXdJbmRleCwgYXJyYXlJdGVtKTtcbiAgICBmb3JtQXJyYXkudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuXG4gICAgLy8gTW92ZSBsYXlvdXQgaXRlbVxuICAgIGNvbnN0IGxheW91dEFycmF5ID0gdGhpcy5nZXRMYXlvdXRBcnJheShjdHgpO1xuICAgIGxheW91dEFycmF5LnNwbGljZShuZXdJbmRleCwgMCwgbGF5b3V0QXJyYXkuc3BsaWNlKG9sZEluZGV4LCAxKVswXSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZW1vdmVJdGVtKGN0eDogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKFxuICAgICAgIWN0eC5sYXlvdXROb2RlIHx8ICFpc0RlZmluZWQoY3R4LmxheW91dE5vZGUuZGF0YVBvaW50ZXIpIHx8XG4gICAgICAhaGFzVmFsdWUoY3R4LmRhdGFJbmRleCkgfHwgIWhhc1ZhbHVlKGN0eC5sYXlvdXRJbmRleClcbiAgICApIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAvLyBSZW1vdmUgdGhlIEFuZ3VsYXIgZm9ybSBjb250cm9sIGZyb20gdGhlIHBhcmVudCBmb3JtQXJyYXkgb3IgZm9ybUdyb3VwXG4gICAgaWYgKGN0eC5sYXlvdXROb2RlLmFycmF5SXRlbSkgeyAvLyBSZW1vdmUgYXJyYXkgaXRlbSBmcm9tIGZvcm1BcnJheVxuICAgICAgKDxGb3JtQXJyYXk+dGhpcy5nZXRGb3JtQ29udHJvbEdyb3VwKGN0eCkpXG4gICAgICAgIC5yZW1vdmVBdChjdHguZGF0YUluZGV4W2N0eC5kYXRhSW5kZXgubGVuZ3RoIC0gMV0pO1xuICAgIH0gZWxzZSB7IC8vIFJlbW92ZSAkcmVmIGl0ZW0gZnJvbSBmb3JtR3JvdXBcbiAgICAgICg8Rm9ybUdyb3VwPnRoaXMuZ2V0Rm9ybUNvbnRyb2xHcm91cChjdHgpKVxuICAgICAgICAucmVtb3ZlQ29udHJvbCh0aGlzLmdldEZvcm1Db250cm9sTmFtZShjdHgpKTtcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgbGF5b3V0Tm9kZSBmcm9tIGxheW91dFxuICAgIEpzb25Qb2ludGVyLnJlbW92ZSh0aGlzLmxheW91dCwgdGhpcy5nZXRMYXlvdXRQb2ludGVyKGN0eCkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iXX0=