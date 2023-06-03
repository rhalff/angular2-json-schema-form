import { Injectable } from '@angular/core';
import { Subject } from 'rxjs-compat/Subject';
import * as draft6 from 'ajv/lib/refs/json-schema-draft-06.json';
import Ajv from 'ajv';
import * as _ from 'lodash';
import addFormats from 'ajv-formats';
import { fixTitle, forEach, hasOwn, toTitleCase, hasValue, isArray, isDefined, isEmpty, isObject, JsonPointer, buildSchemaFromData, buildSchemaFromLayout, removeRecursiveReferences, buildFormGroup, buildFormGroupTemplate, formatFormData, getControl, buildLayout, getLayoutNode, enValidationMessages, frValidationMessages } from '@ngsf/common';
import * as i0 from "@angular/core";
class JsonSchemaFormService {
    JsonFormCompatibility = false;
    ReactJsonSchemaFormCompatibility = false;
    AngularSchemaFormCompatibility = false;
    tpldata = {};
    ajvOptions = { allErrors: true, jsonPointers: true, unknownFormats: 'ignore' };
    ajv = new Ajv(this.ajvOptions);
    validateFormData = null;
    formValues = {};
    data = {};
    schema = {};
    layout = [];
    formGroupTemplate = {};
    formGroup = null;
    framework = null;
    formOptions;
    validData = null;
    isValid = null;
    ajvErrors = null;
    validationErrors = null;
    dataErrors = new Map();
    formValueSubscription = null;
    dataChanges = new Subject();
    isValidChanges = new Subject();
    validationErrorChanges = new Subject();
    arrayMap = new Map();
    dataMap = new Map();
    dataRecursiveRefMap = new Map();
    schemaRecursiveRefMap = new Map();
    schemaRefLibrary = {};
    layoutRefLibrary = { '': null };
    templateRefLibrary = {};
    hasRootReference = false;
    language = 'en-US';
    defaultFormOptions = {
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
    constructor() {
        this.setLanguage(this.language);
        this.ajv.addMetaSchema(draft6);
        addFormats(this.ajv);
    }
    setLanguage(language = 'en-US') {
        this.language = language;
        const validationMessages = language.slice(0, 2) === 'fr' ?
            frValidationMessages : enValidationMessages;
        this.defaultFormOptions.defautWidgetOptions.validationMessages =
            _.cloneDeep(validationMessages);
    }
    getData() {
        return this.data;
    }
    getSchema() {
        return this.schema;
    }
    getLayout() {
        return this.layout;
    }
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
    buildRemoteError(errors) {
        forEach(errors, (value, key) => {
            if (key in this.formGroup.controls) {
                for (const error of value) {
                    const err = {};
                    err[error.code] = error.message;
                    if (typeof key === 'string') {
                        this.formGroup.get(key).setErrors(err, { emitEvent: true });
                    }
                    else {
                        console.error('Unhandled for error', key);
                    }
                }
            }
        });
    }
    validateData(newValue, updateSubscriptions = true) {
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
            if (isObject(addOptions.defaultOptions)) {
                Object.assign(this.formOptions.defautWidgetOptions, addOptions.defaultOptions);
                delete addOptions.defaultOptions;
            }
            if (isObject(addOptions.defautWidgetOptions)) {
                Object.assign(this.formOptions.defautWidgetOptions, addOptions.defautWidgetOptions);
                delete addOptions.defautWidgetOptions;
            }
            Object.assign(this.formOptions, addOptions);
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
        if (['"', '\'', ' ', '||', '&&', '+'].every(delimiter => expression.indexOf(delimiter) === -1)) {
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
        const addSpaces = (value) => value[0].toUpperCase() + (value.slice(1) || '')
            .replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ');
        const formatError = (error) => typeof error === 'object' ?
            Object.keys(error).map(key => error[key] === true ? addSpaces(key) :
                error[key] === false ? 'Not ' + addSpaces(key) :
                    addSpaces(key) + ': ' + formatError(error[key])).join(', ') :
            addSpaces(error.toString());
        const messages = [];
        return Object.keys(errors)
            .filter(errorKey => errorKey !== 'required' || Object.keys(errors).length === 1)
            .map(errorKey => typeof validationMessages === 'string' ? validationMessages :
            typeof validationMessages[errorKey] === 'function' ?
                validationMessages[errorKey](errors[errorKey]) :
                typeof validationMessages[errorKey] === 'string' ?
                    !/{{.+?}}/.test(validationMessages[errorKey]) ?
                        validationMessages[errorKey] :
                        Object.keys(errors[errorKey])
                            .reduce((errorMessage, errorProperty) => errorMessage.replace(new RegExp('{{' + errorProperty + '}}', 'g'), errors[errorKey][errorProperty]), validationMessages[errorKey]) :
                    addSpaces(errorKey) + ' Error: ' + formatError(errors[errorKey])).join('<br>');
    }
    updateValue(ctx, value) {
        ctx.controlValue = value;
        if (ctx.boundControl) {
            ctx.formControl.setValue(value);
            ctx.formControl.markAsDirty();
        }
        ctx.layoutNode.value = value;
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
        while (formArray.value.length) {
            formArray.removeAt(0);
        }
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
        const newFormGroup = buildFormGroup(this.templateRefLibrary[ctx.layoutNode.$ref]);
        if (ctx.layoutNode.arrayItem) {
            this.getFormControlGroup(ctx).push(newFormGroup);
        }
        else {
            this.getFormControlGroup(ctx)
                .addControl(name || this.getFormControlName(ctx), newFormGroup);
        }
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
        JsonPointer.insert(this.layout, this.getLayoutPointer(ctx), newLayoutNode);
        return true;
    }
    moveArrayItem(ctx, oldIndex, newIndex) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) ||
            !hasValue(ctx.dataIndex) || !hasValue(ctx.layoutIndex) ||
            !isDefined(oldIndex) || !isDefined(newIndex) || oldIndex === newIndex) {
            return false;
        }
        const formArray = this.getFormControlGroup(ctx);
        const arrayItem = formArray.at(oldIndex);
        formArray.removeAt(oldIndex);
        formArray.insert(newIndex, arrayItem);
        formArray.updateValueAndValidity();
        const layoutArray = this.getLayoutArray(ctx);
        layoutArray.splice(newIndex, 0, layoutArray.splice(oldIndex, 1)[0]);
        return true;
    }
    removeItem(ctx) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) ||
            !hasValue(ctx.dataIndex) || !hasValue(ctx.layoutIndex)) {
            return false;
        }
        if (ctx.layoutNode.arrayItem) {
            this.getFormControlGroup(ctx)
                .removeAt(ctx.dataIndex[ctx.dataIndex.length - 1]);
        }
        else {
            this.getFormControlGroup(ctx)
                .removeControl(this.getFormControlName(ctx));
        }
        JsonPointer.remove(this.layout, this.getLayoutPointer(ctx));
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: JsonSchemaFormService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: JsonSchemaFormService });
}
export { JsonSchemaFormService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: JsonSchemaFormService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmdzZi13aWRnZXQtbGlicmFyeS9zcmMvbGliL3NlcnZpY2VzL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFBO0FBRXhDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQTtBQUMzQyxPQUFPLEtBQUssTUFBTSxNQUFNLHdDQUF3QyxDQUFBO0FBQ2hFLE9BQU8sR0FBRyxNQUFNLEtBQUssQ0FBQTtBQUNyQixPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQTtBQUMzQixPQUFPLFVBQVUsTUFBTSxhQUFhLENBQUE7QUFFcEMsT0FBTyxFQUNMLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFDdEMsUUFBUSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFDL0MsV0FBVyxFQUNYLG1CQUFtQixFQUFFLHFCQUFxQixFQUFFLHlCQUF5QixFQUNyRSxjQUFjLEVBQUUsc0JBQXNCLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFDbEUsV0FBVyxFQUFFLGFBQWEsRUFDMUIsb0JBQW9CLEVBQ3BCLG9CQUFvQixFQUVyQixNQUFNLGNBQWMsQ0FBQTs7QUFJckIsTUFDYSxxQkFBcUI7SUFDaEMscUJBQXFCLEdBQUcsS0FBSyxDQUFBO0lBQzdCLGdDQUFnQyxHQUFHLEtBQUssQ0FBQTtJQUN4Qyw4QkFBOEIsR0FBRyxLQUFLLENBQUE7SUFDdEMsT0FBTyxHQUFRLEVBQUUsQ0FBQTtJQUVqQixVQUFVLEdBQVEsRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBQyxDQUFBO0lBQ2pGLEdBQUcs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QUMsTUFBTSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQzNELE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQzt1R0ExckJVLHFCQUFxQjsyR0FBckIscUJBQXFCOztTQUFyQixxQkFBcUI7MkZBQXJCLHFCQUFxQjtrQkFEakMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sLCBGb3JtQXJyYXksIEZvcm1Hcm91cH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMtY29tcGF0L1N1YmplY3QnXG5pbXBvcnQgKiBhcyBkcmFmdDYgZnJvbSAnYWp2L2xpYi9yZWZzL2pzb24tc2NoZW1hLWRyYWZ0LTA2Lmpzb24nXG5pbXBvcnQgQWp2IGZyb20gJ2FqdidcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IGFkZEZvcm1hdHMgZnJvbSAnYWp2LWZvcm1hdHMnXG5cbmltcG9ydCB7XG4gIGZpeFRpdGxlLCBmb3JFYWNoLCBoYXNPd24sIHRvVGl0bGVDYXNlLFxuICBoYXNWYWx1ZSwgaXNBcnJheSwgaXNEZWZpbmVkLCBpc0VtcHR5LCBpc09iamVjdCxcbiAgSnNvblBvaW50ZXIsXG4gIGJ1aWxkU2NoZW1hRnJvbURhdGEsIGJ1aWxkU2NoZW1hRnJvbUxheW91dCwgcmVtb3ZlUmVjdXJzaXZlUmVmZXJlbmNlcyxcbiAgYnVpbGRGb3JtR3JvdXAsIGJ1aWxkRm9ybUdyb3VwVGVtcGxhdGUsIGZvcm1hdEZvcm1EYXRhLCBnZXRDb250cm9sLFxuICBidWlsZExheW91dCwgZ2V0TGF5b3V0Tm9kZSxcbiAgZW5WYWxpZGF0aW9uTWVzc2FnZXMsXG4gIGZyVmFsaWRhdGlvbk1lc3NhZ2VzLFxuICBGcmFtZXdvcmtcbn0gZnJvbSAnQG5nc2YvY29tbW9uJ1xuaW1wb3J0IHtFcnJvck1lc3NhZ2VzfSBmcm9tICcuLi9pbnRlcmZhY2VzL2Vycm9yLW1lc3NhZ2VzJ1xuaW1wb3J0IHtUaXRsZU1hcEl0ZW19IGZyb20gJy4uL2ludGVyZmFjZXMvdGl0bGUtbWFwLWl0ZW0nXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKc29uU2NoZW1hRm9ybVNlcnZpY2Uge1xuICBKc29uRm9ybUNvbXBhdGliaWxpdHkgPSBmYWxzZVxuICBSZWFjdEpzb25TY2hlbWFGb3JtQ29tcGF0aWJpbGl0eSA9IGZhbHNlXG4gIEFuZ3VsYXJTY2hlbWFGb3JtQ29tcGF0aWJpbGl0eSA9IGZhbHNlXG4gIHRwbGRhdGE6IGFueSA9IHt9XG5cbiAgYWp2T3B0aW9uczogYW55ID0ge2FsbEVycm9yczogdHJ1ZSwganNvblBvaW50ZXJzOiB0cnVlLCB1bmtub3duRm9ybWF0czogJ2lnbm9yZSd9XG4gIGFqdjogYW55ID0gbmV3IEFqdih0aGlzLmFqdk9wdGlvbnMpIC8vIEFKVjogQW5vdGhlciBKU09OIFNjaGVtYSBWYWxpZGF0b3JcblxuICB2YWxpZGF0ZUZvcm1EYXRhOiBhbnkgPSBudWxsIC8vIENvbXBpbGVkIEFKViBmdW5jdGlvbiB0byB2YWxpZGF0ZSBhY3RpdmUgZm9ybSdzIHNjaGVtYVxuXG4gIGZvcm1WYWx1ZXM6IGFueSA9IHt9IC8vIEludGVybmFsIGZvcm0gZGF0YSAobWF5IG5vdCBoYXZlIGNvcnJlY3QgdHlwZXMpXG4gIGRhdGE6IGFueSA9IHt9IC8vIE91dHB1dCBmb3JtIGRhdGEgKGZvcm1WYWx1ZXMsIGZvcm1hdHRlZCB3aXRoIGNvcnJlY3QgZGF0YSB0eXBlcylcbiAgc2NoZW1hOiBhbnkgPSB7fSAvLyBJbnRlcm5hbCBKU09OIFNjaGVtYVxuICBsYXlvdXQ6IGFueVtdID0gW10gLy8gSW50ZXJuYWwgZm9ybSBsYXlvdXRcbiAgZm9ybUdyb3VwVGVtcGxhdGU6IGFueSA9IHt9IC8vIFRlbXBsYXRlIHVzZWQgdG8gY3JlYXRlIGZvcm1Hcm91cFxuICBmb3JtR3JvdXA6IEZvcm1Hcm91cCA9IG51bGwgLy8gQW5ndWxhciBmb3JtR3JvdXAsIHdoaWNoIHBvd2VycyB0aGUgcmVhY3RpdmUgZm9ybVxuICBmcmFtZXdvcms6IEZyYW1ld29yayA9IG51bGwgLy8gQWN0aXZlIGZyYW1ld29yayBjb21wb25lbnRcbiAgZm9ybU9wdGlvbnM6IGFueSAvLyBBY3RpdmUgb3B0aW9ucywgdXNlZCB0byBjb25maWd1cmUgdGhlIGZvcm1cblxuICB2YWxpZERhdGE6IGFueSA9IG51bGwgLy8gVmFsaWQgZm9ybSBkYXRhIChvciBudWxsKSAoPT09IGlzVmFsaWQgPyBkYXRhIDogbnVsbClcbiAgaXNWYWxpZDogYm9vbGVhbiA9IG51bGwgLy8gSXMgY3VycmVudCBmb3JtIGRhdGEgdmFsaWQ/XG4gIGFqdkVycm9yczogYW55ID0gbnVsbCAvLyBBanYgZXJyb3JzIGZvciBjdXJyZW50IGRhdGFcbiAgdmFsaWRhdGlvbkVycm9yczogYW55ID0gbnVsbCAvLyBBbnkgdmFsaWRhdGlvbiBlcnJvcnMgZm9yIGN1cnJlbnQgZGF0YVxuICBkYXRhRXJyb3JzOiBhbnkgPSBuZXcgTWFwKCkgLy9cbiAgZm9ybVZhbHVlU3Vic2NyaXB0aW9uOiBhbnkgPSBudWxsIC8vIFN1YnNjcmlwdGlvbiB0byBmb3JtR3JvdXAudmFsdWVDaGFuZ2VzIG9ic2VydmFibGUgKGZvciB1bi0gYW5kIHJlLXN1YnNjcmliaW5nKVxuICBkYXRhQ2hhbmdlczogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKSAvLyBGb3JtIGRhdGEgb2JzZXJ2YWJsZVxuICBpc1ZhbGlkQ2hhbmdlczogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKSAvLyBpc1ZhbGlkIG9ic2VydmFibGVcbiAgdmFsaWRhdGlvbkVycm9yQ2hhbmdlczogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKSAvLyB2YWxpZGF0aW9uRXJyb3JzIG9ic2VydmFibGVcblxuICBhcnJheU1hcDogTWFwPHN0cmluZywgbnVtYmVyPiA9IG5ldyBNYXAoKSAvLyBNYXBzIGFycmF5cyBpbiBkYXRhIG9iamVjdCBhbmQgbnVtYmVyIG9mIHR1cGxlIHZhbHVlc1xuICBkYXRhTWFwOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcCgpIC8vIE1hcHMgcGF0aHMgaW4gZm9ybSBkYXRhIHRvIHNjaGVtYSBhbmQgZm9ybUdyb3VwIHBhdGhzXG4gIGRhdGFSZWN1cnNpdmVSZWZNYXA6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBuZXcgTWFwKCkgLy8gTWFwcyByZWN1cnNpdmUgcmVmZXJlbmNlIHBvaW50cyBpbiBmb3JtIGRhdGFcbiAgc2NoZW1hUmVjdXJzaXZlUmVmTWFwOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpIC8vIE1hcHMgcmVjdXJzaXZlIHJlZmVyZW5jZSBwb2ludHMgaW4gc2NoZW1hXG4gIHNjaGVtYVJlZkxpYnJhcnk6IGFueSA9IHt9IC8vIExpYnJhcnkgb2Ygc2NoZW1hcyBmb3IgcmVzb2x2aW5nIHNjaGVtYSAkcmVmc1xuICBsYXlvdXRSZWZMaWJyYXJ5OiBhbnkgPSB7Jyc6IG51bGx9IC8vIExpYnJhcnkgb2YgbGF5b3V0IG5vZGVzIGZvciBhZGRpbmcgdG8gZm9ybVxuICB0ZW1wbGF0ZVJlZkxpYnJhcnk6IGFueSA9IHt9IC8vIExpYnJhcnkgb2YgZm9ybUdyb3VwIHRlbXBsYXRlcyBmb3IgYWRkaW5nIHRvIGZvcm1cbiAgaGFzUm9vdFJlZmVyZW5jZSA9IGZhbHNlIC8vIERvZXMgdGhlIGZvcm0gaW5jbHVkZSBhIHJlY3Vyc2l2ZSByZWZlcmVuY2UgdG8gaXRzZWxmP1xuXG4gIGxhbmd1YWdlID0gJ2VuLVVTJ1xuXG4gIC8vIERlZmF1bHQgZ2xvYmFsIGZvcm0gb3B0aW9uc1xuICBkZWZhdWx0Rm9ybU9wdGlvbnM6IGFueSA9IHtcbiAgICBhZGRTdWJtaXQ6ICdhdXRvJywgLy8gQWRkIGEgc3VibWl0IGJ1dHRvbiBpZiBsYXlvdXQgZG9lcyBub3QgaGF2ZSBvbmU/XG4gICAgLy8gZm9yIGFkZFN1Ym1pdDogdHJ1ZSA9IGFsd2F5cywgZmFsc2UgPSBuZXZlcixcbiAgICAvLyAnYXV0bycgPSBvbmx5IGlmIGxheW91dCBpcyB1bmRlZmluZWQgKGZvcm0gaXMgYnVpbHQgZnJvbSBzY2hlbWEgYWxvbmUpXG4gICAgZGVidWc6IGZhbHNlLCAvLyBTaG93IGRlYnVnZ2luZyBvdXRwdXQ/XG4gICAgZGlzYWJsZUludmFsaWRTdWJtaXQ6IHRydWUsIC8vIERpc2FibGUgc3VibWl0IGlmIGZvcm0gaW52YWxpZD9cbiAgICBmb3JtRGlzYWJsZWQ6IGZhbHNlLCAvLyBTZXQgZW50aXJlIGZvcm0gYXMgZGlzYWJsZWQ/IChub3QgZWRpdGFibGUsIGFuZCBkaXNhYmxlcyBvdXRwdXRzKVxuICAgIGZvcm1SZWFkb25seTogZmFsc2UsIC8vIFNldCBlbnRpcmUgZm9ybSBhcyByZWFkIG9ubHk/IChub3QgZWRpdGFibGUsIGJ1dCBvdXRwdXRzIHN0aWxsIGVuYWJsZWQpXG4gICAgZmllbGRzUmVxdWlyZWQ6IGZhbHNlLCAvLyAoc2V0IGF1dG9tYXRpY2FsbHkpIEFyZSB0aGVyZSBhbnkgcmVxdWlyZWQgZmllbGRzIGluIHRoZSBmb3JtP1xuICAgIGZyYW1ld29yazogJ25vLWZyYW1ld29yaycsIC8vIFRoZSBmcmFtZXdvcmsgdG8gbG9hZFxuICAgIGxvYWRFeHRlcm5hbEFzc2V0czogZmFsc2UsIC8vIExvYWQgZXh0ZXJuYWwgY3NzIGFuZCBKYXZhU2NyaXB0IGZvciBmcmFtZXdvcms/XG4gICAgcHJpc3RpbmU6IHtlcnJvcnM6IHRydWUsIHN1Y2Nlc3M6IHRydWV9LFxuICAgIHN1cHJlc3NQcm9wZXJ0eVRpdGxlczogZmFsc2UsXG4gICAgc2V0U2NoZW1hRGVmYXVsdHM6ICdhdXRvJywgLy8gU2V0IGZlZmF1bHQgdmFsdWVzIGZyb20gc2NoZW1hP1xuICAgIC8vIHRydWUgPSBhbHdheXMgc2V0ICh1bmxlc3Mgb3ZlcnJpZGRlbiBieSBsYXlvdXQgZGVmYXVsdCBvciBmb3JtVmFsdWVzKVxuICAgIC8vIGZhbHNlID0gbmV2ZXIgc2V0XG4gICAgLy8gJ2F1dG8nID0gc2V0IGluIGFkZGFibGUgY29tcG9uZW50cywgYW5kIGV2ZXJ5d2hlcmUgaWYgZm9ybVZhbHVlcyBub3Qgc2V0XG4gICAgc2V0TGF5b3V0RGVmYXVsdHM6ICdhdXRvJywgLy8gU2V0IGZlZmF1bHQgdmFsdWVzIGZyb20gbGF5b3V0P1xuICAgIC8vIHRydWUgPSBhbHdheXMgc2V0ICh1bmxlc3Mgb3ZlcnJpZGRlbiBieSBmb3JtVmFsdWVzKVxuICAgIC8vIGZhbHNlID0gbmV2ZXIgc2V0XG4gICAgLy8gJ2F1dG8nID0gc2V0IGluIGFkZGFibGUgY29tcG9uZW50cywgYW5kIGV2ZXJ5d2hlcmUgaWYgZm9ybVZhbHVlcyBub3Qgc2V0XG4gICAgdmFsaWRhdGVPblJlbmRlcjogJ2F1dG8nLCAvLyBWYWxpZGF0ZSBmaWVsZHMgaW1tZWRpYXRlbHksIGJlZm9yZSB0aGV5IGFyZSB0b3VjaGVkP1xuICAgIC8vIHRydWUgPSB2YWxpZGF0ZSBhbGwgZmllbGRzIGltbWVkaWF0ZWx5XG4gICAgLy8gZmFsc2UgPSBvbmx5IHZhbGlkYXRlIGZpZWxkcyBhZnRlciB0aGV5IGFyZSB0b3VjaGVkIGJ5IHVzZXJcbiAgICAvLyAnYXV0bycgPSB2YWxpZGF0ZSBmaWVsZHMgd2l0aCB2YWx1ZXMgaW1tZWRpYXRlbHksIGVtcHR5IGZpZWxkcyBhZnRlciB0aGV5IGFyZSB0b3VjaGVkXG4gICAgd2lkZ2V0czoge30sIC8vIEFueSBjdXN0b20gd2lkZ2V0cyB0byBsb2FkXG4gICAgZGVmYXV0V2lkZ2V0T3B0aW9uczogeyAvLyBEZWZhdWx0IG9wdGlvbnMgZm9yIGZvcm0gY29udHJvbCB3aWRnZXRzXG4gICAgICBsaXN0SXRlbXM6IDEsIC8vIE51bWJlciBvZiBsaXN0IGl0ZW1zIHRvIGluaXRpYWxseSBhZGQgdG8gYXJyYXlzIHdpdGggbm8gZGVmYXVsdCB2YWx1ZVxuICAgICAgYWRkYWJsZTogdHJ1ZSwgLy8gQWxsb3cgYWRkaW5nIGl0ZW1zIHRvIGFuIGFycmF5IG9yICRyZWYgcG9pbnQ/XG4gICAgICBvcmRlcmFibGU6IHRydWUsIC8vIEFsbG93IHJlb3JkZXJpbmcgaXRlbXMgd2l0aGluIGFuIGFycmF5P1xuICAgICAgcmVtb3ZhYmxlOiB0cnVlLCAvLyBBbGxvdyByZW1vdmluZyBpdGVtcyBmcm9tIGFuIGFycmF5IG9yICRyZWYgcG9pbnQ/XG4gICAgICBlbmFibGVFcnJvclN0YXRlOiB0cnVlLCAvLyBBcHBseSAnaGFzLWVycm9yJyBjbGFzcyB3aGVuIGZpZWxkIGZhaWxzIHZhbGlkYXRpb24/XG4gICAgICAvLyBkaXNhYmxlRXJyb3JTdGF0ZTogZmFsc2UsIC8vIERvbid0IGFwcGx5ICdoYXMtZXJyb3InIGNsYXNzIHdoZW4gZmllbGQgZmFpbHMgdmFsaWRhdGlvbj9cbiAgICAgIGVuYWJsZVN1Y2Nlc3NTdGF0ZTogdHJ1ZSwgLy8gQXBwbHkgJ2hhcy1zdWNjZXNzJyBjbGFzcyB3aGVuIGZpZWxkIHZhbGlkYXRlcz9cbiAgICAgIC8vIGRpc2FibGVTdWNjZXNzU3RhdGU6IGZhbHNlLCAvLyBEb24ndCBhcHBseSAnaGFzLXN1Y2Nlc3MnIGNsYXNzIHdoZW4gZmllbGQgdmFsaWRhdGVzP1xuICAgICAgZmVlZGJhY2s6IGZhbHNlLCAvLyBTaG93IGlubGluZSBmZWVkYmFjayBpY29ucz9cbiAgICAgIGZlZWRiYWNrT25SZW5kZXI6IGZhbHNlLCAvLyBTaG93IGVycm9yTWVzc2FnZSBvbiBSZW5kZXI/XG4gICAgICBub3RpdGxlOiBmYWxzZSwgLy8gSGlkZSB0aXRsZT9cbiAgICAgIGRpc2FibGVkOiBmYWxzZSwgLy8gU2V0IGNvbnRyb2wgYXMgZGlzYWJsZWQ/IChub3QgZWRpdGFibGUsIGFuZCBleGNsdWRlZCBmcm9tIG91dHB1dClcbiAgICAgIHJlYWRvbmx5OiBmYWxzZSwgLy8gU2V0IGNvbnRyb2wgYXMgcmVhZCBvbmx5PyAobm90IGVkaXRhYmxlLCBidXQgaW5jbHVkZWQgaW4gb3V0cHV0KVxuICAgICAgcmV0dXJuRW1wdHlGaWVsZHM6IHRydWUsIC8vIHJldHVybiB2YWx1ZXMgZm9yIGZpZWxkcyB0aGF0IGNvbnRhaW4gbm8gZGF0YT9cbiAgICAgIHZhbGlkYXRpb25NZXNzYWdlczoge30gLy8gc2V0IGJ5IHNldExhbmd1YWdlKClcbiAgICB9LFxuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zZXRMYW5ndWFnZSh0aGlzLmxhbmd1YWdlKVxuICAgIHRoaXMuYWp2LmFkZE1ldGFTY2hlbWEoZHJhZnQ2KVxuICAgIGFkZEZvcm1hdHModGhpcy5hanYpXG4gIH1cblxuICBzZXRMYW5ndWFnZShsYW5ndWFnZTogc3RyaW5nID0gJ2VuLVVTJykge1xuICAgIHRoaXMubGFuZ3VhZ2UgPSBsYW5ndWFnZVxuICAgIGNvbnN0IHZhbGlkYXRpb25NZXNzYWdlcyA9IGxhbmd1YWdlLnNsaWNlKDAsIDIpID09PSAnZnInID9cbiAgICAgIGZyVmFsaWRhdGlvbk1lc3NhZ2VzIDogZW5WYWxpZGF0aW9uTWVzc2FnZXNcbiAgICB0aGlzLmRlZmF1bHRGb3JtT3B0aW9ucy5kZWZhdXRXaWRnZXRPcHRpb25zLnZhbGlkYXRpb25NZXNzYWdlcyA9XG4gICAgICBfLmNsb25lRGVlcCh2YWxpZGF0aW9uTWVzc2FnZXMpXG4gIH1cblxuICBnZXREYXRhKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGFcbiAgfVxuXG4gIGdldFNjaGVtYSgpIHtcbiAgICByZXR1cm4gdGhpcy5zY2hlbWFcbiAgfVxuXG4gIGdldExheW91dCgpIHtcbiAgICByZXR1cm4gdGhpcy5sYXlvdXRcbiAgfVxuXG4gIHB1YmxpYyByZXNldEFsbFZhbHVlcygpIHtcbiAgICB0aGlzLkpzb25Gb3JtQ29tcGF0aWJpbGl0eSA9IGZhbHNlXG4gICAgdGhpcy5SZWFjdEpzb25TY2hlbWFGb3JtQ29tcGF0aWJpbGl0eSA9IGZhbHNlXG4gICAgdGhpcy5Bbmd1bGFyU2NoZW1hRm9ybUNvbXBhdGliaWxpdHkgPSBmYWxzZVxuICAgIHRoaXMudHBsZGF0YSA9IHt9XG4gICAgdGhpcy52YWxpZGF0ZUZvcm1EYXRhID0gbnVsbFxuICAgIHRoaXMuZm9ybVZhbHVlcyA9IHt9XG4gICAgdGhpcy5zY2hlbWEgPSB7fVxuICAgIHRoaXMubGF5b3V0ID0gW11cbiAgICB0aGlzLmZvcm1Hcm91cFRlbXBsYXRlID0ge31cbiAgICB0aGlzLmZvcm1Hcm91cCA9IG51bGxcbiAgICB0aGlzLmZyYW1ld29yayA9IG51bGxcbiAgICB0aGlzLmRhdGEgPSB7fVxuICAgIHRoaXMudmFsaWREYXRhID0gbnVsbFxuICAgIHRoaXMuaXNWYWxpZCA9IG51bGxcbiAgICB0aGlzLnZhbGlkYXRpb25FcnJvcnMgPSBudWxsXG4gICAgdGhpcy5hcnJheU1hcCA9IG5ldyBNYXAoKVxuICAgIHRoaXMuZGF0YU1hcCA9IG5ldyBNYXAoKVxuICAgIHRoaXMuZGF0YVJlY3Vyc2l2ZVJlZk1hcCA9IG5ldyBNYXAoKVxuICAgIHRoaXMuc2NoZW1hUmVjdXJzaXZlUmVmTWFwID0gbmV3IE1hcCgpXG4gICAgdGhpcy5sYXlvdXRSZWZMaWJyYXJ5ID0ge31cbiAgICB0aGlzLnNjaGVtYVJlZkxpYnJhcnkgPSB7fVxuICAgIHRoaXMudGVtcGxhdGVSZWZMaWJyYXJ5ID0ge31cbiAgICB0aGlzLmZvcm1PcHRpb25zID0gXy5jbG9uZURlZXAodGhpcy5kZWZhdWx0Rm9ybU9wdGlvbnMpXG4gIH1cblxuICAvKipcbiAgICogJ2J1aWxkUmVtb3RlRXJyb3InIGZ1bmN0aW9uXG4gICAqXG4gICAqIEV4YW1wbGUgZXJyb3JzOlxuICAgKiB7XG4gICAqICAgbGFzdF9uYW1lOiBbIHtcbiAgICogICAgIG1lc3NhZ2U6ICdMYXN0IG5hbWUgbXVzdCBzdGFydCB3aXRoIGNhcGl0YWwgbGV0dGVyLicsXG4gICAqICAgICBjb2RlOiAnY2FwaXRhbF9sZXR0ZXInXG4gICAqICAgfSBdLFxuICAgKiAgIGVtYWlsOiBbIHtcbiAgICogICAgIG1lc3NhZ2U6ICdFbWFpbCBtdXN0IGJlIGZyb20gZXhhbXBsZS5jb20gZG9tYWluLicsXG4gICAqICAgICBjb2RlOiAnc3BlY2lhbF9kb21haW4nXG4gICAqICAgfSwge1xuICAgKiAgICAgbWVzc2FnZTogJ0VtYWlsIG11c3QgY29udGFpbiBhbiBAIHN5bWJvbC4nLFxuICAgKiAgICAgY29kZTogJ2F0X3N5bWJvbCdcbiAgICogICB9IF1cbiAgICogfVxuICAgKi9cbiAgYnVpbGRSZW1vdGVFcnJvcihlcnJvcnM6IEVycm9yTWVzc2FnZXMpIHtcbiAgICBmb3JFYWNoKGVycm9ycywgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgIGlmIChrZXkgaW4gdGhpcy5mb3JtR3JvdXAuY29udHJvbHMpIHtcbiAgICAgICAgZm9yIChjb25zdCBlcnJvciBvZiB2YWx1ZSkge1xuICAgICAgICAgIGNvbnN0IGVyciA9IHt9XG4gICAgICAgICAgZXJyW2Vycm9yLmNvZGVdID0gZXJyb3IubWVzc2FnZVxuICAgICAgICAgIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5mb3JtR3JvdXAuZ2V0KGtleSkuc2V0RXJyb3JzKGVyciwge2VtaXRFdmVudDogdHJ1ZX0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBmb3IgZXJyb3InLCBrZXkpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHZhbGlkYXRlRGF0YShuZXdWYWx1ZTogYW55LCB1cGRhdGVTdWJzY3JpcHRpb25zID0gdHJ1ZSk6IHZvaWQge1xuXG4gICAgLy8gRm9ybWF0IHJhdyBmb3JtIGRhdGEgdG8gY29ycmVjdCBkYXRhIHR5cGVzXG4gICAgdGhpcy5kYXRhID0gZm9ybWF0Rm9ybURhdGEoXG4gICAgICBuZXdWYWx1ZSwgdGhpcy5kYXRhTWFwLCB0aGlzLmRhdGFSZWN1cnNpdmVSZWZNYXAsXG4gICAgICB0aGlzLmFycmF5TWFwLCB0aGlzLmZvcm1PcHRpb25zLnJldHVybkVtcHR5RmllbGRzXG4gICAgKVxuICAgIHRoaXMuaXNWYWxpZCA9IHRoaXMudmFsaWRhdGVGb3JtRGF0YSh0aGlzLmRhdGEpXG4gICAgdGhpcy52YWxpZERhdGEgPSB0aGlzLmlzVmFsaWQgPyB0aGlzLmRhdGEgOiBudWxsXG4gICAgY29uc3QgY29tcGlsZUVycm9ycyA9IGVycm9ycyA9PiB7XG4gICAgICBjb25zdCBjb21waWxlZEVycm9ycyA9IHt9IGFzIGFueVxuICAgICAgKGVycm9ycyB8fCBbXSkuZm9yRWFjaChlcnJvciA9PiB7XG4gICAgICAgIGlmICghY29tcGlsZWRFcnJvcnNbZXJyb3IuZGF0YVBhdGhdKSB7XG4gICAgICAgICAgY29tcGlsZWRFcnJvcnNbZXJyb3IuZGF0YVBhdGhdID0gW11cbiAgICAgICAgfVxuICAgICAgICBjb21waWxlZEVycm9yc1tlcnJvci5kYXRhUGF0aF0ucHVzaChlcnJvci5tZXNzYWdlKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBjb21waWxlZEVycm9yc1xuICAgIH1cbiAgICB0aGlzLmFqdkVycm9ycyA9IHRoaXMudmFsaWRhdGVGb3JtRGF0YS5lcnJvcnNcbiAgICB0aGlzLnZhbGlkYXRpb25FcnJvcnMgPSBjb21waWxlRXJyb3JzKHRoaXMudmFsaWRhdGVGb3JtRGF0YS5lcnJvcnMpXG4gICAgaWYgKHVwZGF0ZVN1YnNjcmlwdGlvbnMpIHtcbiAgICAgIHRoaXMuZGF0YUNoYW5nZXMubmV4dCh0aGlzLmRhdGEpXG4gICAgICB0aGlzLmlzVmFsaWRDaGFuZ2VzLm5leHQodGhpcy5pc1ZhbGlkKVxuICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3JDaGFuZ2VzLm5leHQodGhpcy5hanZFcnJvcnMpXG4gICAgfVxuICB9XG5cbiAgYnVpbGRGb3JtR3JvdXBUZW1wbGF0ZShmb3JtVmFsdWVzOiBhbnkgPSBudWxsLCBzZXRWYWx1ZXMgPSB0cnVlKSB7XG4gICAgdGhpcy5mb3JtR3JvdXBUZW1wbGF0ZSA9IGJ1aWxkRm9ybUdyb3VwVGVtcGxhdGUodGhpcywgZm9ybVZhbHVlcywgc2V0VmFsdWVzKVxuICB9XG5cbiAgYnVpbGRGb3JtR3JvdXAoKSB7XG4gICAgdGhpcy5mb3JtR3JvdXAgPSBidWlsZEZvcm1Hcm91cCh0aGlzLmZvcm1Hcm91cFRlbXBsYXRlKSBhcyBGb3JtR3JvdXBcbiAgICBpZiAodGhpcy5mb3JtR3JvdXApIHtcbiAgICAgIHRoaXMuY29tcGlsZUFqdlNjaGVtYSgpXG4gICAgICB0aGlzLnZhbGlkYXRlRGF0YSh0aGlzLmZvcm1Hcm91cC52YWx1ZSlcblxuICAgICAgLy8gU2V0IHVwIG9ic2VydmFibGVzIHRvIGVtaXQgZGF0YSBhbmQgdmFsaWRhdGlvbiBpbmZvIHdoZW4gZm9ybSBkYXRhIGNoYW5nZXNcbiAgICAgIGlmICh0aGlzLmZvcm1WYWx1ZVN1YnNjcmlwdGlvbikge1xuICAgICAgICB0aGlzLmZvcm1WYWx1ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpXG4gICAgICB9XG4gICAgICB0aGlzLmZvcm1WYWx1ZVN1YnNjcmlwdGlvbiA9IHRoaXMuZm9ybUdyb3VwLnZhbHVlQ2hhbmdlc1xuICAgICAgICAuc3Vic2NyaWJlKGZvcm1WYWx1ZSA9PiB0aGlzLnZhbGlkYXRlRGF0YShmb3JtVmFsdWUpKVxuICAgIH1cbiAgfVxuXG4gIGJ1aWxkTGF5b3V0KHdpZGdldExpYnJhcnk6IGFueSkge1xuICAgIHRoaXMubGF5b3V0ID0gYnVpbGRMYXlvdXQodGhpcywgd2lkZ2V0TGlicmFyeSlcbiAgfVxuXG4gIHNldE9wdGlvbnMobmV3T3B0aW9uczogYW55KSB7XG4gICAgaWYgKGlzT2JqZWN0KG5ld09wdGlvbnMpKSB7XG4gICAgICBjb25zdCBhZGRPcHRpb25zID0gXy5jbG9uZURlZXAobmV3T3B0aW9ucylcbiAgICAgIC8vIEJhY2t3YXJkIGNvbXBhdGliaWxpdHkgZm9yICdkZWZhdWx0T3B0aW9ucycgKHJlbmFtZWQgJ2RlZmF1dFdpZGdldE9wdGlvbnMnKVxuICAgICAgaWYgKGlzT2JqZWN0KGFkZE9wdGlvbnMuZGVmYXVsdE9wdGlvbnMpKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5mb3JtT3B0aW9ucy5kZWZhdXRXaWRnZXRPcHRpb25zLCBhZGRPcHRpb25zLmRlZmF1bHRPcHRpb25zKVxuICAgICAgICBkZWxldGUgYWRkT3B0aW9ucy5kZWZhdWx0T3B0aW9uc1xuICAgICAgfVxuICAgICAgaWYgKGlzT2JqZWN0KGFkZE9wdGlvbnMuZGVmYXV0V2lkZ2V0T3B0aW9ucykpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmZvcm1PcHRpb25zLmRlZmF1dFdpZGdldE9wdGlvbnMsIGFkZE9wdGlvbnMuZGVmYXV0V2lkZ2V0T3B0aW9ucylcbiAgICAgICAgZGVsZXRlIGFkZE9wdGlvbnMuZGVmYXV0V2lkZ2V0T3B0aW9uc1xuICAgICAgfVxuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmZvcm1PcHRpb25zLCBhZGRPcHRpb25zKVxuXG4gICAgICAvLyBjb252ZXJ0IGRpc2FibGVFcnJvclN0YXRlIC8gZGlzYWJsZVN1Y2Nlc3NTdGF0ZSB0byBlbmFibGUuLi5cbiAgICAgIGNvbnN0IGdsb2JhbERlZmF1bHRzID0gdGhpcy5mb3JtT3B0aW9ucy5kZWZhdXRXaWRnZXRPcHRpb25zXG4gICAgICA7WydFcnJvclN0YXRlJywgJ1N1Y2Nlc3NTdGF0ZSddXG4gICAgICAgIC5maWx0ZXIoc3VmZml4ID0+IGhhc093bihnbG9iYWxEZWZhdWx0cywgJ2Rpc2FibGUnICsgc3VmZml4KSlcbiAgICAgICAgLmZvckVhY2goc3VmZml4ID0+IHtcbiAgICAgICAgICBnbG9iYWxEZWZhdWx0c1snZW5hYmxlJyArIHN1ZmZpeF0gPSAhZ2xvYmFsRGVmYXVsdHNbJ2Rpc2FibGUnICsgc3VmZml4XVxuICAgICAgICAgIGRlbGV0ZSBnbG9iYWxEZWZhdWx0c1snZGlzYWJsZScgKyBzdWZmaXhdXG4gICAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgY29tcGlsZUFqdlNjaGVtYSgpIHtcbiAgICBpZiAoIXRoaXMudmFsaWRhdGVGb3JtRGF0YSkge1xuXG4gICAgICAvLyBpZiAndWk6b3JkZXInIGV4aXN0cyBpbiBwcm9wZXJ0aWVzLCBtb3ZlIGl0IHRvIHJvb3QgYmVmb3JlIGNvbXBpbGluZyB3aXRoIGFqdlxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5zY2hlbWEucHJvcGVydGllc1sndWk6b3JkZXInXSkpIHtcbiAgICAgICAgdGhpcy5zY2hlbWFbJ3VpOm9yZGVyJ10gPSB0aGlzLnNjaGVtYS5wcm9wZXJ0aWVzWyd1aTpvcmRlciddXG4gICAgICAgIGRlbGV0ZSB0aGlzLnNjaGVtYS5wcm9wZXJ0aWVzWyd1aTpvcmRlciddXG4gICAgICB9XG4gICAgICB0aGlzLmFqdi5yZW1vdmVTY2hlbWEodGhpcy5zY2hlbWEpXG4gICAgICB0aGlzLnZhbGlkYXRlRm9ybURhdGEgPSB0aGlzLmFqdi5jb21waWxlKHRoaXMuc2NoZW1hKVxuICAgIH1cbiAgfVxuXG4gIGJ1aWxkU2NoZW1hRnJvbURhdGEoZGF0YT86IGFueSwgcmVxdWlyZUFsbEZpZWxkcyA9IGZhbHNlKTogYW55IHtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgcmV0dXJuIGJ1aWxkU2NoZW1hRnJvbURhdGEoZGF0YSwgcmVxdWlyZUFsbEZpZWxkcylcbiAgICB9XG4gICAgdGhpcy5zY2hlbWEgPSBidWlsZFNjaGVtYUZyb21EYXRhKHRoaXMuZm9ybVZhbHVlcywgcmVxdWlyZUFsbEZpZWxkcylcbiAgfVxuXG4gIGJ1aWxkU2NoZW1hRnJvbUxheW91dChsYXlvdXQ/OiBhbnkpOiBhbnkge1xuICAgIGlmIChsYXlvdXQpIHtcbiAgICAgIHJldHVybiBidWlsZFNjaGVtYUZyb21MYXlvdXQobGF5b3V0KVxuICAgIH1cbiAgICB0aGlzLnNjaGVtYSA9IGJ1aWxkU2NoZW1hRnJvbUxheW91dCh0aGlzLmxheW91dClcbiAgfVxuXG5cbiAgc2V0VHBsZGF0YShuZXdUcGxkYXRhOiBhbnkgPSB7fSk6IHZvaWQge1xuICAgIHRoaXMudHBsZGF0YSA9IG5ld1RwbGRhdGFcbiAgfVxuXG4gIHBhcnNlVGV4dChcbiAgICB0ZXh0ID0gJycsIHZhbHVlOiBhbnkgPSB7fSwgdmFsdWVzOiBhbnkgPSB7fSwga2V5OiBudW1iZXIgfCBzdHJpbmcgPSBudWxsXG4gICk6IHN0cmluZyB7XG4gICAgaWYgKCF0ZXh0IHx8ICEve3suKz99fS8udGVzdCh0ZXh0KSkge1xuICAgICAgcmV0dXJuIHRleHRcbiAgICB9XG4gICAgcmV0dXJuIHRleHQucmVwbGFjZSgve3soLis/KX19L2csICguLi5hKSA9PlxuICAgICAgdGhpcy5wYXJzZUV4cHJlc3Npb24oYVsxXSwgdmFsdWUsIHZhbHVlcywga2V5LCB0aGlzLnRwbGRhdGEpXG4gICAgKVxuICB9XG5cbiAgcGFyc2VFeHByZXNzaW9uKFxuICAgIGV4cHJlc3Npb24gPSAnJywgdmFsdWU6IGFueSA9IHt9LCB2YWx1ZXM6IGFueSA9IHt9LFxuICAgIGtleTogbnVtYmVyIHwgc3RyaW5nID0gbnVsbCwgdHBsZGF0YTogYW55ID0gbnVsbFxuICApIHtcbiAgICBpZiAodHlwZW9mIGV4cHJlc3Npb24gIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gJydcbiAgICB9XG4gICAgY29uc3QgaW5kZXggPSB0eXBlb2Yga2V5ID09PSAnbnVtYmVyJyA/IChrZXkgKyAxKSArICcnIDogKGtleSB8fCAnJylcbiAgICBleHByZXNzaW9uID0gZXhwcmVzc2lvbi50cmltKClcbiAgICBpZiAoKGV4cHJlc3Npb25bMF0gPT09ICdcXCcnIHx8IGV4cHJlc3Npb25bMF0gPT09ICdcIicpICYmXG4gICAgICBleHByZXNzaW9uWzBdID09PSBleHByZXNzaW9uW2V4cHJlc3Npb24ubGVuZ3RoIC0gMV0gJiZcbiAgICAgIGV4cHJlc3Npb24uc2xpY2UoMSwgZXhwcmVzc2lvbi5sZW5ndGggLSAxKS5pbmRleE9mKGV4cHJlc3Npb25bMF0pID09PSAtMVxuICAgICkge1xuICAgICAgcmV0dXJuIGV4cHJlc3Npb24uc2xpY2UoMSwgZXhwcmVzc2lvbi5sZW5ndGggLSAxKVxuICAgIH1cbiAgICBpZiAoZXhwcmVzc2lvbiA9PT0gJ2lkeCcgfHwgZXhwcmVzc2lvbiA9PT0gJyRpbmRleCcpIHtcbiAgICAgIHJldHVybiBpbmRleFxuICAgIH1cbiAgICBpZiAoZXhwcmVzc2lvbiA9PT0gJ3ZhbHVlJyAmJiAhaGFzT3duKHZhbHVlcywgJ3ZhbHVlJykpIHtcbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cbiAgICBpZiAoWydcIicsICdcXCcnLCAnICcsICd8fCcsICcmJicsICcrJ10uZXZlcnkoZGVsaW1pdGVyID0+IGV4cHJlc3Npb24uaW5kZXhPZihkZWxpbWl0ZXIpID09PSAtMSkpIHtcbiAgICAgIGNvbnN0IHBvaW50ZXIgPSBKc29uUG9pbnRlci5wYXJzZU9iamVjdFBhdGgoZXhwcmVzc2lvbilcbiAgICAgIHJldHVybiBwb2ludGVyWzBdID09PSAndmFsdWUnICYmIEpzb25Qb2ludGVyLmhhcyh2YWx1ZSwgcG9pbnRlci5zbGljZSgxKSkgP1xuICAgICAgICBKc29uUG9pbnRlci5nZXQodmFsdWUsIHBvaW50ZXIuc2xpY2UoMSkpIDpcbiAgICAgICAgcG9pbnRlclswXSA9PT0gJ3ZhbHVlcycgJiYgSnNvblBvaW50ZXIuaGFzKHZhbHVlcywgcG9pbnRlci5zbGljZSgxKSkgP1xuICAgICAgICAgIEpzb25Qb2ludGVyLmdldCh2YWx1ZXMsIHBvaW50ZXIuc2xpY2UoMSkpIDpcbiAgICAgICAgICBwb2ludGVyWzBdID09PSAndHBsZGF0YScgJiYgSnNvblBvaW50ZXIuaGFzKHRwbGRhdGEsIHBvaW50ZXIuc2xpY2UoMSkpID9cbiAgICAgICAgICAgIEpzb25Qb2ludGVyLmdldCh0cGxkYXRhLCBwb2ludGVyLnNsaWNlKDEpKSA6XG4gICAgICAgICAgICBKc29uUG9pbnRlci5oYXModmFsdWVzLCBwb2ludGVyKSA/IEpzb25Qb2ludGVyLmdldCh2YWx1ZXMsIHBvaW50ZXIpIDogJydcbiAgICB9XG4gICAgaWYgKGV4cHJlc3Npb24uaW5kZXhPZignW2lkeF0nKSA+IC0xKSB7XG4gICAgICBleHByZXNzaW9uID0gZXhwcmVzc2lvbi5yZXBsYWNlKC9cXFtpZHhcXF0vZywgaW5kZXgpXG4gICAgfVxuICAgIGlmIChleHByZXNzaW9uLmluZGV4T2YoJ1skaW5kZXhdJykgPiAtMSkge1xuICAgICAgZXhwcmVzc2lvbiA9IGV4cHJlc3Npb24ucmVwbGFjZSgvXFxbJGluZGV4XFxdL2csIGluZGV4KVxuICAgIH1cbiAgICAvLyBUT0RPOiBJbXByb3ZlIGV4cHJlc3Npb24gZXZhbHVhdGlvbiBieSBwYXJzaW5nIHF1b3RlZCBzdHJpbmdzIGZpcnN0XG4gICAgLy8gbGV0IGV4cHJlc3Npb25BcnJheSA9IGV4cHJlc3Npb24ubWF0Y2goLyhbXlwiJ10rfFwiW15cIl0rXCJ8J1teJ10rJykvZylcbiAgICBpZiAoZXhwcmVzc2lvbi5pbmRleE9mKCd8fCcpID4gLTEpIHtcbiAgICAgIHJldHVybiBleHByZXNzaW9uLnNwbGl0KCd8fCcpLnJlZHVjZSgoYWxsLCB0ZXJtKSA9PlxuICAgICAgICBhbGwgfHwgdGhpcy5wYXJzZUV4cHJlc3Npb24odGVybSwgdmFsdWUsIHZhbHVlcywga2V5LCB0cGxkYXRhKSwgJydcbiAgICAgIClcbiAgICB9XG4gICAgaWYgKGV4cHJlc3Npb24uaW5kZXhPZignJiYnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gZXhwcmVzc2lvbi5zcGxpdCgnJiYnKS5yZWR1Y2UoKGFsbCwgdGVybSkgPT5cbiAgICAgICAgYWxsICYmIHRoaXMucGFyc2VFeHByZXNzaW9uKHRlcm0sIHZhbHVlLCB2YWx1ZXMsIGtleSwgdHBsZGF0YSksICcgJ1xuICAgICAgKS50cmltKClcbiAgICB9XG4gICAgaWYgKGV4cHJlc3Npb24uaW5kZXhPZignKycpID4gLTEpIHtcbiAgICAgIHJldHVybiBleHByZXNzaW9uLnNwbGl0KCcrJylcbiAgICAgICAgLm1hcCh0ZXJtID0+IHRoaXMucGFyc2VFeHByZXNzaW9uKHRlcm0sIHZhbHVlLCB2YWx1ZXMsIGtleSwgdHBsZGF0YSkpXG4gICAgICAgIC5qb2luKCcnKVxuICAgIH1cbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIHNldEFycmF5SXRlbVRpdGxlKFxuICAgIHBhcmVudEN0eDogYW55ID0ge30sIGNoaWxkTm9kZTogYW55ID0gbnVsbCwgaW5kZXg6IG51bWJlciA9IG51bGxcbiAgKTogc3RyaW5nIHtcbiAgICBjb25zdCBwYXJlbnROb2RlID0gcGFyZW50Q3R4LmxheW91dE5vZGVcbiAgICBjb25zdCBwYXJlbnRWYWx1ZXM6IGFueSA9IHRoaXMuZ2V0Rm9ybUNvbnRyb2xWYWx1ZShwYXJlbnRDdHgpXG4gICAgY29uc3QgaXNBcnJheUl0ZW0gPVxuICAgICAgKHBhcmVudE5vZGUudHlwZSB8fCAnJykuc2xpY2UoLTUpID09PSAnYXJyYXknICYmIGlzQXJyYXkocGFyZW50VmFsdWVzKVxuICAgIGNvbnN0IHRleHQgPSBKc29uUG9pbnRlci5nZXRGaXJzdChcbiAgICAgIGlzQXJyYXlJdGVtICYmIGNoaWxkTm9kZS50eXBlICE9PSAnJHJlZicgPyBbXG4gICAgICAgIFtjaGlsZE5vZGUsICcvb3B0aW9ucy9sZWdlbmQnXSxcbiAgICAgICAgW2NoaWxkTm9kZSwgJy9vcHRpb25zL3RpdGxlJ10sXG4gICAgICAgIFtwYXJlbnROb2RlLCAnL29wdGlvbnMvdGl0bGUnXSxcbiAgICAgICAgW3BhcmVudE5vZGUsICcvb3B0aW9ucy9sZWdlbmQnXSxcbiAgICAgIF0gOiBbXG4gICAgICAgIFtjaGlsZE5vZGUsICcvb3B0aW9ucy90aXRsZSddLFxuICAgICAgICBbY2hpbGROb2RlLCAnL29wdGlvbnMvbGVnZW5kJ10sXG4gICAgICAgIFtwYXJlbnROb2RlLCAnL29wdGlvbnMvdGl0bGUnXSxcbiAgICAgICAgW3BhcmVudE5vZGUsICcvb3B0aW9ucy9sZWdlbmQnXVxuICAgICAgXVxuICAgIClcbiAgICBpZiAoIXRleHQpIHtcbiAgICAgIHJldHVybiB0ZXh0XG4gICAgfVxuICAgIGNvbnN0IGNoaWxkVmFsdWUgPSBpc0FycmF5KHBhcmVudFZhbHVlcykgJiYgaW5kZXggPCBwYXJlbnRWYWx1ZXMubGVuZ3RoID9cbiAgICAgIHBhcmVudFZhbHVlc1tpbmRleF0gOiBwYXJlbnRWYWx1ZXNcbiAgICByZXR1cm4gdGhpcy5wYXJzZVRleHQodGV4dCwgY2hpbGRWYWx1ZSwgcGFyZW50VmFsdWVzLCBpbmRleClcbiAgfVxuXG4gIHNldEl0ZW1UaXRsZShjdHg6IGFueSkge1xuICAgIHJldHVybiAhY3R4Lm9wdGlvbnMudGl0bGUgJiYgL14oXFxkK3wtKSQvLnRlc3QoY3R4LmxheW91dE5vZGUubmFtZSkgP1xuICAgICAgbnVsbCA6XG4gICAgICB0aGlzLnBhcnNlVGV4dChcbiAgICAgICAgY3R4Lm9wdGlvbnMudGl0bGUgfHwgdG9UaXRsZUNhc2UoY3R4LmxheW91dE5vZGUubmFtZSksXG4gICAgICAgIHRoaXMuZ2V0Rm9ybUNvbnRyb2xWYWx1ZSh0aGlzKSxcbiAgICAgICAgKHRoaXMuZ2V0Rm9ybUNvbnRyb2xHcm91cCh0aGlzKSB8fCB7fSBhcyBhbnkpLnZhbHVlLFxuICAgICAgICBjdHguZGF0YUluZGV4W2N0eC5kYXRhSW5kZXgubGVuZ3RoIC0gMV1cbiAgICAgIClcbiAgfVxuXG4gIGV2YWx1YXRlQ29uZGl0aW9uKGxheW91dE5vZGU6IGFueSwgZGF0YUluZGV4OiBudW1iZXJbXSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGFycmF5SW5kZXggPSBkYXRhSW5kZXggJiYgZGF0YUluZGV4W2RhdGFJbmRleC5sZW5ndGggLSAxXVxuICAgIGxldCByZXN1bHQgPSB0cnVlXG4gICAgaWYgKGhhc1ZhbHVlKChsYXlvdXROb2RlLm9wdGlvbnMgfHwge30pLmNvbmRpdGlvbikpIHtcbiAgICAgIGlmICh0eXBlb2YgbGF5b3V0Tm9kZS5vcHRpb25zLmNvbmRpdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbGV0IHBvaW50ZXIgPSBsYXlvdXROb2RlLm9wdGlvbnMuY29uZGl0aW9uXG4gICAgICAgIGlmIChoYXNWYWx1ZShhcnJheUluZGV4KSkge1xuICAgICAgICAgIHBvaW50ZXIgPSBwb2ludGVyLnJlcGxhY2UoJ1thcnJheUluZGV4XScsIGBbJHthcnJheUluZGV4fV1gKVxuICAgICAgICB9XG4gICAgICAgIHBvaW50ZXIgPSBKc29uUG9pbnRlci5wYXJzZU9iamVjdFBhdGgocG9pbnRlcilcbiAgICAgICAgcmVzdWx0ID0gISFKc29uUG9pbnRlci5nZXQodGhpcy5kYXRhLCBwb2ludGVyKVxuICAgICAgICBpZiAoIXJlc3VsdCAmJiBwb2ludGVyWzBdID09PSAnbW9kZWwnKSB7XG4gICAgICAgICAgcmVzdWx0ID0gISFKc29uUG9pbnRlci5nZXQoe21vZGVsOiB0aGlzLmRhdGF9LCBwb2ludGVyKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsYXlvdXROb2RlLm9wdGlvbnMuY29uZGl0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJlc3VsdCA9IGxheW91dE5vZGUub3B0aW9ucy5jb25kaXRpb24odGhpcy5kYXRhKVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGF5b3V0Tm9kZS5vcHRpb25zLmNvbmRpdGlvbi5mdW5jdGlvbkJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgZHluRm4gPSBuZXcgRnVuY3Rpb24oXG4gICAgICAgICAgICAnbW9kZWwnLCAnYXJyYXlJbmRpY2VzJywgbGF5b3V0Tm9kZS5vcHRpb25zLmNvbmRpdGlvbi5mdW5jdGlvbkJvZHlcbiAgICAgICAgICApXG4gICAgICAgICAgcmVzdWx0ID0gZHluRm4odGhpcy5kYXRhLCBkYXRhSW5kZXgpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICByZXN1bHQgPSB0cnVlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignY29uZGl0aW9uIGZ1bmN0aW9uQm9keSBlcnJvcmVkIG91dCBvbiBldmFsdWF0aW9uOiAnICsgbGF5b3V0Tm9kZS5vcHRpb25zLmNvbmRpdGlvbi5mdW5jdGlvbkJvZHkpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgaW5pdGlhbGl6ZUNvbnRyb2woY3R4OiBhbnksIGJpbmQgPSB0cnVlKTogYm9vbGVhbiB7XG4gICAgaWYgKCFpc09iamVjdChjdHgpKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgaWYgKGlzRW1wdHkoY3R4Lm9wdGlvbnMpKSB7XG4gICAgICBjdHgub3B0aW9ucyA9ICFpc0VtcHR5KChjdHgubGF5b3V0Tm9kZSB8fCB7fSkub3B0aW9ucykgP1xuICAgICAgICBjdHgubGF5b3V0Tm9kZS5vcHRpb25zIDogXy5jbG9uZURlZXAodGhpcy5mb3JtT3B0aW9ucylcbiAgICB9XG4gICAgY3R4LmZvcm1Db250cm9sID0gdGhpcy5nZXRGb3JtQ29udHJvbChjdHgpXG4gICAgY3R4LmJvdW5kQ29udHJvbCA9IGJpbmQgJiYgISFjdHguZm9ybUNvbnRyb2xcbiAgICBpZiAoY3R4LmZvcm1Db250cm9sKSB7XG4gICAgICBjdHguY29udHJvbE5hbWUgPSB0aGlzLmdldEZvcm1Db250cm9sTmFtZShjdHgpXG4gICAgICBjdHguY29udHJvbFZhbHVlID0gY3R4LmZvcm1Db250cm9sLnZhbHVlXG4gICAgICBjdHguY29udHJvbERpc2FibGVkID0gY3R4LmZvcm1Db250cm9sLmRpc2FibGVkXG4gICAgICBjdHgub3B0aW9ucy5lcnJvck1lc3NhZ2UgPSBjdHguZm9ybUNvbnRyb2wuc3RhdHVzID09PSAnVkFMSUQnID8gbnVsbCA6XG4gICAgICAgIHRoaXMuZm9ybWF0RXJyb3JzKGN0eC5mb3JtQ29udHJvbC5lcnJvcnMsIGN0eC5vcHRpb25zLnZhbGlkYXRpb25NZXNzYWdlcylcbiAgICAgIGN0eC5vcHRpb25zLnNob3dFcnJvcnMgPSB0aGlzLmZvcm1PcHRpb25zLnZhbGlkYXRlT25SZW5kZXIgPT09IHRydWUgfHxcbiAgICAgICAgKHRoaXMuZm9ybU9wdGlvbnMudmFsaWRhdGVPblJlbmRlciA9PT0gJ2F1dG8nICYmIGhhc1ZhbHVlKGN0eC5jb250cm9sVmFsdWUpKVxuICAgICAgY3R4LmZvcm1Db250cm9sLnN0YXR1c0NoYW5nZXMuc3Vic2NyaWJlKHN0YXR1cyA9PlxuICAgICAgICBjdHgub3B0aW9ucy5lcnJvck1lc3NhZ2UgPSBzdGF0dXMgPT09ICdWQUxJRCcgPyBudWxsIDpcbiAgICAgICAgICB0aGlzLmZvcm1hdEVycm9ycyhjdHguZm9ybUNvbnRyb2wuZXJyb3JzLCBjdHgub3B0aW9ucy52YWxpZGF0aW9uTWVzc2FnZXMpXG4gICAgICApXG4gICAgICBjdHguZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICAgIGlmICghXy5pc0VxdWFsKGN0eC5jb250cm9sVmFsdWUsIHZhbHVlKSkge1xuICAgICAgICAgIGN0eC5jb250cm9sVmFsdWUgPSB2YWx1ZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBjdHguY29udHJvbE5hbWUgPSBjdHgubGF5b3V0Tm9kZS5uYW1lXG4gICAgICBjdHguY29udHJvbFZhbHVlID0gY3R4LmxheW91dE5vZGUudmFsdWUgfHwgbnVsbFxuICAgICAgY29uc3QgZGF0YVBvaW50ZXIgPSB0aGlzLmdldERhdGFQb2ludGVyKGN0eClcbiAgICAgIGlmIChiaW5kICYmIGRhdGFQb2ludGVyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYHdhcm5pbmc6IGNvbnRyb2wgXCIke2RhdGFQb2ludGVyfVwiIGlzIG5vdCBib3VuZCB0byB0aGUgQW5ndWxhciBGb3JtR3JvdXAuYClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGN0eC5ib3VuZENvbnRyb2xcbiAgfVxuXG4gIGZvcm1hdEVycm9ycyhlcnJvcnM6IGFueSwgdmFsaWRhdGlvbk1lc3NhZ2VzOiBhbnkgPSB7fSk6IHN0cmluZyB7XG4gICAgaWYgKGlzRW1wdHkoZXJyb3JzKSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgaWYgKCFpc09iamVjdCh2YWxpZGF0aW9uTWVzc2FnZXMpKSB7XG4gICAgICB2YWxpZGF0aW9uTWVzc2FnZXMgPSB7fVxuICAgIH1cbiAgICBjb25zdCBhZGRTcGFjZXMgPSAodmFsdWU6IHN0cmluZykgPT4gdmFsdWVbMF0udG9VcHBlckNhc2UoKSArICh2YWx1ZS5zbGljZSgxKSB8fCAnJylcbiAgICAgIC5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEgJDInKS5yZXBsYWNlKC9fL2csICcgJylcbiAgICBjb25zdCBmb3JtYXRFcnJvciA9IChlcnJvcikgPT4gdHlwZW9mIGVycm9yID09PSAnb2JqZWN0JyA/XG4gICAgICBPYmplY3Qua2V5cyhlcnJvcikubWFwKGtleSA9PlxuICAgICAgICBlcnJvcltrZXldID09PSB0cnVlID8gYWRkU3BhY2VzKGtleSkgOlxuICAgICAgICAgIGVycm9yW2tleV0gPT09IGZhbHNlID8gJ05vdCAnICsgYWRkU3BhY2VzKGtleSkgOlxuICAgICAgICAgICAgYWRkU3BhY2VzKGtleSkgKyAnOiAnICsgZm9ybWF0RXJyb3IoZXJyb3Jba2V5XSlcbiAgICAgICkuam9pbignLCAnKSA6XG4gICAgICBhZGRTcGFjZXMoZXJyb3IudG9TdHJpbmcoKSlcbiAgICBjb25zdCBtZXNzYWdlcyA9IFtdXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGVycm9ycylcbiAgICAvLyBIaWRlICdyZXF1aXJlZCcgZXJyb3IsIHVubGVzcyBpdCBpcyB0aGUgb25seSBvbmVcbiAgICAgIC5maWx0ZXIoZXJyb3JLZXkgPT4gZXJyb3JLZXkgIT09ICdyZXF1aXJlZCcgfHwgT2JqZWN0LmtleXMoZXJyb3JzKS5sZW5ndGggPT09IDEpXG4gICAgICAubWFwKGVycm9yS2V5ID0+XG4gICAgICAgIC8vIElmIHZhbGlkYXRpb25NZXNzYWdlcyBpcyBhIHN0cmluZywgcmV0dXJuIGl0XG4gICAgICAgIHR5cGVvZiB2YWxpZGF0aW9uTWVzc2FnZXMgPT09ICdzdHJpbmcnID8gdmFsaWRhdGlvbk1lc3NhZ2VzIDpcbiAgICAgICAgICAvLyBJZiBjdXN0b20gZXJyb3IgbWVzc2FnZSBpcyBhIGZ1bmN0aW9uLCByZXR1cm4gZnVuY3Rpb24gcmVzdWx0XG4gICAgICAgICAgdHlwZW9mIHZhbGlkYXRpb25NZXNzYWdlc1tlcnJvcktleV0gPT09ICdmdW5jdGlvbicgP1xuICAgICAgICAgICAgdmFsaWRhdGlvbk1lc3NhZ2VzW2Vycm9yS2V5XShlcnJvcnNbZXJyb3JLZXldKSA6XG4gICAgICAgICAgICAvLyBJZiBjdXN0b20gZXJyb3IgbWVzc2FnZSBpcyBhIHN0cmluZywgcmVwbGFjZSBwbGFjZWhvbGRlcnMgYW5kIHJldHVyblxuICAgICAgICAgICAgdHlwZW9mIHZhbGlkYXRpb25NZXNzYWdlc1tlcnJvcktleV0gPT09ICdzdHJpbmcnID9cbiAgICAgICAgICAgICAgLy8gRG9lcyBlcnJvciBtZXNzYWdlIGhhdmUgYW55IHt7cHJvcGVydHl9fSBwbGFjZWhvbGRlcnM/XG4gICAgICAgICAgICAgICEve3suKz99fS8udGVzdCh2YWxpZGF0aW9uTWVzc2FnZXNbZXJyb3JLZXldKSA/XG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbk1lc3NhZ2VzW2Vycm9yS2V5XSA6XG4gICAgICAgICAgICAgICAgLy8gUmVwbGFjZSB7e3Byb3BlcnR5fX0gcGxhY2Vob2xkZXJzIHdpdGggdmFsdWVzXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoZXJyb3JzW2Vycm9yS2V5XSlcbiAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGVycm9yTWVzc2FnZSwgZXJyb3JQcm9wZXJ0eSkgPT4gZXJyb3JNZXNzYWdlLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoJ3t7JyArIGVycm9yUHJvcGVydHkgKyAnfX0nLCAnZycpLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcnNbZXJyb3JLZXldW2Vycm9yUHJvcGVydHldXG4gICAgICAgICAgICAgICAgICApLCB2YWxpZGF0aW9uTWVzc2FnZXNbZXJyb3JLZXldKSA6XG4gICAgICAgICAgICAgIC8vIElmIG5vIGN1c3RvbSBlcnJvciBtZXNzYWdlLCByZXR1cm4gZm9ybWF0dGVkIGVycm9yIGRhdGEgaW5zdGVhZFxuICAgICAgICAgICAgICBhZGRTcGFjZXMoZXJyb3JLZXkpICsgJyBFcnJvcjogJyArIGZvcm1hdEVycm9yKGVycm9yc1tlcnJvcktleV0pXG4gICAgICApLmpvaW4oJzxicj4nKVxuICB9XG5cbiAgdXBkYXRlVmFsdWUoY3R4OiBhbnksIHZhbHVlOiBhbnkpOiB2b2lkIHtcblxuICAgIC8vIFNldCB2YWx1ZSBvZiBjdXJyZW50IGNvbnRyb2xcbiAgICBjdHguY29udHJvbFZhbHVlID0gdmFsdWVcbiAgICBpZiAoY3R4LmJvdW5kQ29udHJvbCkge1xuICAgICAgY3R4LmZvcm1Db250cm9sLnNldFZhbHVlKHZhbHVlKVxuICAgICAgY3R4LmZvcm1Db250cm9sLm1hcmtBc0RpcnR5KClcbiAgICB9XG4gICAgY3R4LmxheW91dE5vZGUudmFsdWUgPSB2YWx1ZVxuXG4gICAgLy8gU2V0IHZhbHVlcyBvZiBhbnkgcmVsYXRlZCBjb250cm9scyBpbiBjb3B5VmFsdWVUbyBhcnJheVxuICAgIGlmIChpc0FycmF5KGN0eC5vcHRpb25zLmNvcHlWYWx1ZVRvKSkge1xuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGN0eC5vcHRpb25zLmNvcHlWYWx1ZVRvKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldENvbnRyb2wgPSBnZXRDb250cm9sKHRoaXMuZm9ybUdyb3VwLCBpdGVtKVxuICAgICAgICBpZiAoaXNPYmplY3QodGFyZ2V0Q29udHJvbCkgJiYgdHlwZW9mIHRhcmdldENvbnRyb2wuc2V0VmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0YXJnZXRDb250cm9sLnNldFZhbHVlKHZhbHVlKVxuICAgICAgICAgIHRhcmdldENvbnRyb2wubWFya0FzRGlydHkoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlQXJyYXlDaGVja2JveExpc3QoY3R4OiBhbnksIGNoZWNrYm94TGlzdDogVGl0bGVNYXBJdGVtW10pOiB2b2lkIHtcbiAgICBjb25zdCBmb3JtQXJyYXkgPSB0aGlzLmdldEZvcm1Db250cm9sKGN0eCkgYXMgRm9ybUFycmF5XG5cbiAgICAvLyBSZW1vdmUgYWxsIGV4aXN0aW5nIGl0ZW1zXG4gICAgd2hpbGUgKGZvcm1BcnJheS52YWx1ZS5sZW5ndGgpIHtcbiAgICAgIGZvcm1BcnJheS5yZW1vdmVBdCgwKVxuICAgIH1cblxuICAgIC8vIFJlLWFkZCBhbiBpdGVtIGZvciBlYWNoIGNoZWNrZWQgYm94XG4gICAgY29uc3QgcmVmUG9pbnRlciA9IHJlbW92ZVJlY3Vyc2l2ZVJlZmVyZW5jZXMoXG4gICAgICBjdHgubGF5b3V0Tm9kZS5kYXRhUG9pbnRlciArICcvLScsIHRoaXMuZGF0YVJlY3Vyc2l2ZVJlZk1hcCwgdGhpcy5hcnJheU1hcFxuICAgIClcbiAgICBmb3IgKGNvbnN0IGNoZWNrYm94SXRlbSBvZiBjaGVja2JveExpc3QpIHtcbiAgICAgIGlmIChjaGVja2JveEl0ZW0uY2hlY2tlZCkge1xuICAgICAgICBjb25zdCBuZXdGb3JtQ29udHJvbCA9IGJ1aWxkRm9ybUdyb3VwKHRoaXMudGVtcGxhdGVSZWZMaWJyYXJ5W3JlZlBvaW50ZXJdKVxuICAgICAgICBuZXdGb3JtQ29udHJvbC5zZXRWYWx1ZShjaGVja2JveEl0ZW0udmFsdWUpXG4gICAgICAgIGZvcm1BcnJheS5wdXNoKG5ld0Zvcm1Db250cm9sKVxuICAgICAgfVxuICAgIH1cbiAgICBmb3JtQXJyYXkubWFya0FzRGlydHkoKVxuICB9XG5cbiAgZ2V0Rm9ybUNvbnRyb2woY3R4OiBhbnkpOiBBYnN0cmFjdENvbnRyb2wge1xuICAgIGlmIChcbiAgICAgICFjdHgubGF5b3V0Tm9kZSB8fCAhaXNEZWZpbmVkKGN0eC5sYXlvdXROb2RlLmRhdGFQb2ludGVyKSB8fFxuICAgICAgY3R4LmxheW91dE5vZGUudHlwZSA9PT0gJyRyZWYnXG4gICAgKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICByZXR1cm4gZ2V0Q29udHJvbCh0aGlzLmZvcm1Hcm91cCwgdGhpcy5nZXREYXRhUG9pbnRlcihjdHgpKVxuICB9XG5cbiAgZ2V0Rm9ybUNvbnRyb2xWYWx1ZShjdHg6IGFueSk6IEFic3RyYWN0Q29udHJvbCB7XG4gICAgaWYgKFxuICAgICAgIWN0eC5sYXlvdXROb2RlIHx8ICFpc0RlZmluZWQoY3R4LmxheW91dE5vZGUuZGF0YVBvaW50ZXIpIHx8XG4gICAgICBjdHgubGF5b3V0Tm9kZS50eXBlID09PSAnJHJlZidcbiAgICApIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGNvbnN0IGNvbnRyb2wgPSBnZXRDb250cm9sKHRoaXMuZm9ybUdyb3VwLCB0aGlzLmdldERhdGFQb2ludGVyKGN0eCkpXG4gICAgcmV0dXJuIGNvbnRyb2wgPyBjb250cm9sLnZhbHVlIDogbnVsbFxuICB9XG5cbiAgZ2V0Rm9ybUNvbnRyb2xHcm91cChjdHg6IGFueSk6IEZvcm1BcnJheSB8IEZvcm1Hcm91cCB7XG4gICAgaWYgKCFjdHgubGF5b3V0Tm9kZSB8fCAhaXNEZWZpbmVkKGN0eC5sYXlvdXROb2RlLmRhdGFQb2ludGVyKSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgcmV0dXJuIGdldENvbnRyb2wodGhpcy5mb3JtR3JvdXAsIHRoaXMuZ2V0RGF0YVBvaW50ZXIoY3R4KSwgdHJ1ZSlcbiAgfVxuXG4gIGdldEZvcm1Db250cm9sTmFtZShjdHg6IGFueSk6IHN0cmluZyB7XG4gICAgaWYgKFxuICAgICAgIWN0eC5sYXlvdXROb2RlIHx8ICFpc0RlZmluZWQoY3R4LmxheW91dE5vZGUuZGF0YVBvaW50ZXIpIHx8ICFoYXNWYWx1ZShjdHguZGF0YUluZGV4KVxuICAgICkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgcmV0dXJuIEpzb25Qb2ludGVyLnRvS2V5KHRoaXMuZ2V0RGF0YVBvaW50ZXIoY3R4KSlcbiAgfVxuXG4gIGdldExheW91dEFycmF5KGN0eDogYW55KTogYW55W10ge1xuICAgIHJldHVybiBKc29uUG9pbnRlci5nZXQodGhpcy5sYXlvdXQsIHRoaXMuZ2V0TGF5b3V0UG9pbnRlcihjdHgpLCAwLCAtMSlcbiAgfVxuXG4gIGdldFBhcmVudE5vZGUoY3R4OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBKc29uUG9pbnRlci5nZXQodGhpcy5sYXlvdXQsIHRoaXMuZ2V0TGF5b3V0UG9pbnRlcihjdHgpLCAwLCAtMilcbiAgfVxuXG4gIGdldERhdGFQb2ludGVyKGN0eDogYW55KTogc3RyaW5nIHtcbiAgICBpZiAoXG4gICAgICAhY3R4LmxheW91dE5vZGUgfHwgIWlzRGVmaW5lZChjdHgubGF5b3V0Tm9kZS5kYXRhUG9pbnRlcikgfHwgIWhhc1ZhbHVlKGN0eC5kYXRhSW5kZXgpXG4gICAgKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICByZXR1cm4gSnNvblBvaW50ZXIudG9JbmRleGVkUG9pbnRlcihcbiAgICAgIGN0eC5sYXlvdXROb2RlLmRhdGFQb2ludGVyLCBjdHguZGF0YUluZGV4LCB0aGlzLmFycmF5TWFwXG4gICAgKVxuICB9XG5cbiAgZ2V0TGF5b3V0UG9pbnRlcihjdHg6IGFueSk6IHN0cmluZyB7XG4gICAgaWYgKCFoYXNWYWx1ZShjdHgubGF5b3V0SW5kZXgpKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICByZXR1cm4gJy8nICsgY3R4LmxheW91dEluZGV4LmpvaW4oJy9pdGVtcy8nKVxuICB9XG5cbiAgaXNDb250cm9sQm91bmQoY3R4OiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAoXG4gICAgICAhY3R4LmxheW91dE5vZGUgfHwgIWlzRGVmaW5lZChjdHgubGF5b3V0Tm9kZS5kYXRhUG9pbnRlcikgfHwgIWhhc1ZhbHVlKGN0eC5kYXRhSW5kZXgpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgY29uc3QgY29udHJvbEdyb3VwID0gdGhpcy5nZXRGb3JtQ29udHJvbEdyb3VwKGN0eClcbiAgICBjb25zdCBuYW1lID0gdGhpcy5nZXRGb3JtQ29udHJvbE5hbWUoY3R4KVxuICAgIHJldHVybiBjb250cm9sR3JvdXAgPyBoYXNPd24oY29udHJvbEdyb3VwLmNvbnRyb2xzLCBuYW1lKSA6IGZhbHNlXG4gIH1cblxuICBhZGRJdGVtKGN0eDogYW55LCBuYW1lPzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKFxuICAgICAgIWN0eC5sYXlvdXROb2RlIHx8ICFpc0RlZmluZWQoY3R4LmxheW91dE5vZGUuJHJlZikgfHxcbiAgICAgICFoYXNWYWx1ZShjdHguZGF0YUluZGV4KSB8fCAhaGFzVmFsdWUoY3R4LmxheW91dEluZGV4KVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIGEgbmV3IEFuZ3VsYXIgZm9ybSBjb250cm9sIGZyb20gYSB0ZW1wbGF0ZSBpbiB0ZW1wbGF0ZVJlZkxpYnJhcnlcbiAgICBjb25zdCBuZXdGb3JtR3JvdXAgPSBidWlsZEZvcm1Hcm91cCh0aGlzLnRlbXBsYXRlUmVmTGlicmFyeVtjdHgubGF5b3V0Tm9kZS4kcmVmXSlcblxuICAgIC8vIEFkZCB0aGUgbmV3IGZvcm0gY29udHJvbCB0byB0aGUgcGFyZW50IGZvcm1BcnJheSBvciBmb3JtR3JvdXBcbiAgICBpZiAoY3R4LmxheW91dE5vZGUuYXJyYXlJdGVtKSB7IC8vIEFkZCBuZXcgYXJyYXkgaXRlbSB0byBmb3JtQXJyYXlcbiAgICAgICh0aGlzLmdldEZvcm1Db250cm9sR3JvdXAoY3R4KSBhcyBhbnkpLnB1c2gobmV3Rm9ybUdyb3VwKVxuICAgIH0gZWxzZSB7IC8vIEFkZCBuZXcgJHJlZiBpdGVtIHRvIGZvcm1Hcm91cFxuICAgICAgKHRoaXMuZ2V0Rm9ybUNvbnRyb2xHcm91cChjdHgpIGFzIGFueSlcbiAgICAgICAgLmFkZENvbnRyb2wobmFtZSB8fCB0aGlzLmdldEZvcm1Db250cm9sTmFtZShjdHgpLCBuZXdGb3JtR3JvdXApXG4gICAgfVxuXG4gICAgLy8gQ29weSBhIG5ldyBsYXlvdXROb2RlIGZyb20gbGF5b3V0UmVmTGlicmFyeVxuICAgIGNvbnN0IG5ld0xheW91dE5vZGUgPSBnZXRMYXlvdXROb2RlKGN0eC5sYXlvdXROb2RlLCB0aGlzKVxuICAgIG5ld0xheW91dE5vZGUuYXJyYXlJdGVtID0gY3R4LmxheW91dE5vZGUuYXJyYXlJdGVtXG4gICAgaWYgKGN0eC5sYXlvdXROb2RlLmFycmF5SXRlbVR5cGUpIHtcbiAgICAgIG5ld0xheW91dE5vZGUuYXJyYXlJdGVtVHlwZSA9IGN0eC5sYXlvdXROb2RlLmFycmF5SXRlbVR5cGVcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIG5ld0xheW91dE5vZGUuYXJyYXlJdGVtVHlwZVxuICAgIH1cbiAgICBpZiAobmFtZSkge1xuICAgICAgbmV3TGF5b3V0Tm9kZS5uYW1lID0gbmFtZVxuICAgICAgbmV3TGF5b3V0Tm9kZS5kYXRhUG9pbnRlciArPSAnLycgKyBKc29uUG9pbnRlci5lc2NhcGUobmFtZSlcbiAgICAgIG5ld0xheW91dE5vZGUub3B0aW9ucy50aXRsZSA9IGZpeFRpdGxlKG5hbWUpXG4gICAgfVxuXG4gICAgLy8gQWRkIHRoZSBuZXcgbGF5b3V0Tm9kZSB0byB0aGUgZm9ybSBsYXlvdXRcbiAgICBKc29uUG9pbnRlci5pbnNlcnQodGhpcy5sYXlvdXQsIHRoaXMuZ2V0TGF5b3V0UG9pbnRlcihjdHgpLCBuZXdMYXlvdXROb2RlKVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIG1vdmVBcnJheUl0ZW0oY3R4OiBhbnksIG9sZEluZGV4OiBudW1iZXIsIG5ld0luZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAoXG4gICAgICAhY3R4LmxheW91dE5vZGUgfHwgIWlzRGVmaW5lZChjdHgubGF5b3V0Tm9kZS5kYXRhUG9pbnRlcikgfHxcbiAgICAgICFoYXNWYWx1ZShjdHguZGF0YUluZGV4KSB8fCAhaGFzVmFsdWUoY3R4LmxheW91dEluZGV4KSB8fFxuICAgICAgIWlzRGVmaW5lZChvbGRJbmRleCkgfHwgIWlzRGVmaW5lZChuZXdJbmRleCkgfHwgb2xkSW5kZXggPT09IG5ld0luZGV4XG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBNb3ZlIGl0ZW0gaW4gdGhlIGZvcm1BcnJheVxuICAgIGNvbnN0IGZvcm1BcnJheSA9IHRoaXMuZ2V0Rm9ybUNvbnRyb2xHcm91cChjdHgpIGFzIEZvcm1BcnJheVxuICAgIGNvbnN0IGFycmF5SXRlbSA9IGZvcm1BcnJheS5hdChvbGRJbmRleClcbiAgICBmb3JtQXJyYXkucmVtb3ZlQXQob2xkSW5kZXgpXG4gICAgZm9ybUFycmF5Lmluc2VydChuZXdJbmRleCwgYXJyYXlJdGVtKVxuICAgIGZvcm1BcnJheS51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KClcblxuICAgIC8vIE1vdmUgbGF5b3V0IGl0ZW1cbiAgICBjb25zdCBsYXlvdXRBcnJheSA9IHRoaXMuZ2V0TGF5b3V0QXJyYXkoY3R4KVxuICAgIGxheW91dEFycmF5LnNwbGljZShuZXdJbmRleCwgMCwgbGF5b3V0QXJyYXkuc3BsaWNlKG9sZEluZGV4LCAxKVswXSlcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgcmVtb3ZlSXRlbShjdHg6IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmIChcbiAgICAgICFjdHgubGF5b3V0Tm9kZSB8fCAhaXNEZWZpbmVkKGN0eC5sYXlvdXROb2RlLmRhdGFQb2ludGVyKSB8fFxuICAgICAgIWhhc1ZhbHVlKGN0eC5kYXRhSW5kZXgpIHx8ICFoYXNWYWx1ZShjdHgubGF5b3V0SW5kZXgpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgdGhlIEFuZ3VsYXIgZm9ybSBjb250cm9sIGZyb20gdGhlIHBhcmVudCBmb3JtQXJyYXkgb3IgZm9ybUdyb3VwXG4gICAgaWYgKGN0eC5sYXlvdXROb2RlLmFycmF5SXRlbSkgeyAvLyBSZW1vdmUgYXJyYXkgaXRlbSBmcm9tIGZvcm1BcnJheVxuICAgICAgKHRoaXMuZ2V0Rm9ybUNvbnRyb2xHcm91cChjdHgpIGFzIEZvcm1BcnJheSlcbiAgICAgICAgLnJlbW92ZUF0KGN0eC5kYXRhSW5kZXhbY3R4LmRhdGFJbmRleC5sZW5ndGggLSAxXSlcbiAgICB9IGVsc2UgeyAvLyBSZW1vdmUgJHJlZiBpdGVtIGZyb20gZm9ybUdyb3VwXG4gICAgICAodGhpcy5nZXRGb3JtQ29udHJvbEdyb3VwKGN0eCkgYXMgRm9ybUdyb3VwKVxuICAgICAgICAucmVtb3ZlQ29udHJvbCh0aGlzLmdldEZvcm1Db250cm9sTmFtZShjdHgpKVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBsYXlvdXROb2RlIGZyb20gbGF5b3V0XG4gICAgSnNvblBvaW50ZXIucmVtb3ZlKHRoaXMubGF5b3V0LCB0aGlzLmdldExheW91dFBvaW50ZXIoY3R4KSlcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG59XG4iXX0=