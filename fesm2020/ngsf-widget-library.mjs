import * as i0 from '@angular/core';
import { Injectable, Directive, Input, Component, ChangeDetectionStrategy, ViewContainerRef, ViewChild, Inject, NgModule } from '@angular/core';
import { Subject } from 'rxjs-compat/Subject';
import * as draft6 from 'ajv/lib/refs/json-schema-draft-06.json';
import Ajv from 'ajv';
import * as _ from 'lodash';
import { frValidationMessages, enValidationMessages, forEach, formatFormData, buildFormGroupTemplate, buildFormGroup, buildLayout, isObject, hasOwn, buildSchemaFromData, buildSchemaFromLayout, JsonPointer, isArray, toTitleCase, hasValue, isEmpty, getControl, removeRecursiveReferences, isDefined, getLayoutNode, fixTitle, isString, Framework } from '@ngsf/common';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

class JsonSchemaFormService {
    constructor() {
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
}
JsonSchemaFormService.ɵfac = function JsonSchemaFormService_Factory(t) { return new (t || JsonSchemaFormService)(); };
JsonSchemaFormService.ɵprov = i0.ɵɵdefineInjectable({ token: JsonSchemaFormService, factory: JsonSchemaFormService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(JsonSchemaFormService, [{
        type: Injectable
    }], function () { return []; }, null); })();

class OrderableDirective {
    constructor(elementRef, jsf, ngZone) {
        this.elementRef = elementRef;
        this.jsf = jsf;
        this.ngZone = ngZone;
        this.overParentElement = false;
        this.overChildElement = false;
    }
    ngOnInit() {
        if (this.orderable && this.layoutNode && this.layoutIndex && this.dataIndex) {
            this.element = this.elementRef.nativeElement;
            this.element.draggable = true;
            this.arrayLayoutIndex = 'move:' + this.layoutIndex.slice(0, -1).toString();
            this.ngZone.runOutsideAngular(() => {
                this.element.addEventListener('dragstart', (event) => {
                    event.dataTransfer.effectAllowed = 'move';
                    const sourceArrayIndex = this.dataIndex[this.dataIndex.length - 1];
                    sessionStorage.setItem(this.arrayLayoutIndex, sourceArrayIndex + '');
                });
                this.element.addEventListener('dragover', (event) => {
                    if (event.preventDefault) {
                        event.preventDefault();
                    }
                    event.dataTransfer.dropEffect = 'move';
                    return false;
                });
                this.element.addEventListener('dragenter', (event) => {
                    if (this.overParentElement) {
                        return this.overChildElement = true;
                    }
                    else {
                        this.overParentElement = true;
                    }
                    const sourceArrayIndex = sessionStorage.getItem(this.arrayLayoutIndex);
                    if (sourceArrayIndex !== null) {
                        if (this.dataIndex[this.dataIndex.length - 1] < +sourceArrayIndex) {
                            this.element.classList.add('drag-target-top');
                        }
                        else if (this.dataIndex[this.dataIndex.length - 1] > +sourceArrayIndex) {
                            this.element.classList.add('drag-target-bottom');
                        }
                    }
                });
                this.element.addEventListener('dragleave', (event) => {
                    if (this.overChildElement) {
                        this.overChildElement = false;
                    }
                    else if (this.overParentElement) {
                        this.overParentElement = false;
                    }
                    const sourceArrayIndex = sessionStorage.getItem(this.arrayLayoutIndex);
                    if (!this.overParentElement && !this.overChildElement && sourceArrayIndex !== null) {
                        this.element.classList.remove('drag-target-top');
                        this.element.classList.remove('drag-target-bottom');
                    }
                });
                this.element.addEventListener('drop', (event) => {
                    this.element.classList.remove('drag-target-top');
                    this.element.classList.remove('drag-target-bottom');
                    const sourceArrayIndex = sessionStorage.getItem(this.arrayLayoutIndex);
                    const destArrayIndex = this.dataIndex[this.dataIndex.length - 1];
                    if (sourceArrayIndex !== null && +sourceArrayIndex !== destArrayIndex) {
                        this.jsf.moveArrayItem(this, +sourceArrayIndex, destArrayIndex);
                    }
                    sessionStorage.removeItem(this.arrayLayoutIndex);
                    return false;
                });
            });
        }
    }
}
OrderableDirective.ɵfac = function OrderableDirective_Factory(t) { return new (t || OrderableDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(JsonSchemaFormService), i0.ɵɵdirectiveInject(i0.NgZone)); };
OrderableDirective.ɵdir = i0.ɵɵdefineDirective({ type: OrderableDirective, selectors: [["", "orderable", ""]], inputs: { orderable: "orderable", layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OrderableDirective, [{
        type: Directive,
        args: [{
                selector: '[orderable]',
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: JsonSchemaFormService }, { type: i0.NgZone }]; }, { orderable: [{
            type: Input
        }], layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();

function buildTitleMap(titleMap, enumList, fieldRequired = true, flatList = true) {
    let newTitleMap = [];
    let hasEmptyValue = false;
    if (titleMap) {
        if (isArray(titleMap)) {
            if (enumList) {
                for (const i of Object.keys(titleMap)) {
                    if (isObject(titleMap[i])) {
                        const value = titleMap[i].value;
                        if (enumList.includes(value)) {
                            const name = titleMap[i].name;
                            newTitleMap.push({ name, value });
                            if (value === undefined || value === null) {
                                hasEmptyValue = true;
                            }
                        }
                    }
                    else if (isString(titleMap[i])) {
                        if (i < enumList.length) {
                            const name = titleMap[i];
                            const value = enumList[i];
                            newTitleMap.push({ name, value });
                            if (value === undefined || value === null) {
                                hasEmptyValue = true;
                            }
                        }
                    }
                }
            }
            else {
                newTitleMap = titleMap;
                if (!fieldRequired) {
                    hasEmptyValue = !!newTitleMap
                        .filter(i => i.value === undefined || i.value === null)
                        .length;
                }
            }
        }
        else if (enumList) {
            for (const i of Object.keys(enumList)) {
                const value = enumList[i];
                if (hasOwn(titleMap, value)) {
                    const name = titleMap[value];
                    newTitleMap.push({ name, value });
                    if (value === undefined || value === null) {
                        hasEmptyValue = true;
                    }
                }
            }
        }
        else {
            for (const value of Object.keys(titleMap)) {
                const name = titleMap[value];
                newTitleMap.push({ name, value });
                if (value === undefined || value === null) {
                    hasEmptyValue = true;
                }
            }
        }
    }
    else if (enumList) {
        for (const i of Object.keys(enumList)) {
            const name = enumList[i];
            const value = enumList[i];
            newTitleMap.push({ name, value });
            if (value === undefined || value === null) {
                hasEmptyValue = true;
            }
        }
    }
    else {
        newTitleMap = [{ name: 'True', value: true }, { name: 'False', value: false }];
    }
    if (newTitleMap.some(title => hasOwn(title, 'group'))) {
        hasEmptyValue = false;
        if (flatList) {
            newTitleMap = newTitleMap.reduce((groupTitleMap, title) => {
                if (hasOwn(title, 'group')) {
                    if (isArray(title.items)) {
                        groupTitleMap = [
                            ...groupTitleMap,
                            ...title.items.map(item => ({ ...item, ...{ name: `${title.group}: ${item.name}` } }))
                        ];
                        if (title.items.some(item => item.value === undefined || item.value === null)) {
                            hasEmptyValue = true;
                        }
                    }
                    if (hasOwn(title, 'name') && hasOwn(title, 'value')) {
                        title.name = `${title.group}: ${title.name}`;
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
            }, []);
        }
        else {
            newTitleMap = newTitleMap.reduce((groupTitleMap, title) => {
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
            }, []);
        }
    }
    if (!fieldRequired && !hasEmptyValue) {
        newTitleMap.unshift({ name: '<em>None</em>', value: null });
    }
    return newTitleMap;
}

function AddReferenceComponent_button_0_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span");
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap(ctx_r1.options == null ? null : ctx_r1.options.icon);
} }
function AddReferenceComponent_button_0_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 4);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("innerHTML", ctx_r2.buttonText, i0.ɵɵsanitizeHtml);
} }
function AddReferenceComponent_button_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 1);
    i0.ɵɵlistener("click", function AddReferenceComponent_button_0_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.addItem($event)); });
    i0.ɵɵtemplate(1, AddReferenceComponent_button_0_span_1_Template, 1, 2, "span", 2);
    i0.ɵɵtemplate(2, AddReferenceComponent_button_0_span_2_Template, 1, 1, "span", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r0.options == null ? null : ctx_r0.options.fieldHtmlClass) || "");
    i0.ɵɵproperty("disabled", ctx_r0.options == null ? null : ctx_r0.options.readonly);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.options == null ? null : ctx_r0.options.icon);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.options == null ? null : ctx_r0.options.title);
} }
class AddReferenceComponent {
    constructor(jsf) {
        this.jsf = jsf;
    }
    get showAddButton() {
        return !this.layoutNode.arrayItem ||
            this.layoutIndex[this.layoutIndex.length - 1] < this.options.maxItems;
    }
    get buttonText() {
        const parent = {
            dataIndex: this.dataIndex.slice(0, -1),
            layoutIndex: this.layoutIndex.slice(0, -1),
            layoutNode: this.jsf.getParentNode(this)
        };
        return parent.layoutNode.add ||
            this.jsf.setArrayItemTitle(parent, this.layoutNode, this.itemCount);
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
    }
    addItem(event) {
        event.preventDefault();
        this.jsf.addItem(this);
    }
}
AddReferenceComponent.ɵfac = function AddReferenceComponent_Factory(t) { return new (t || AddReferenceComponent)(i0.ɵɵdirectiveInject(JsonSchemaFormService)); };
AddReferenceComponent.ɵcmp = i0.ɵɵdefineComponent({ type: AddReferenceComponent, selectors: [["add-reference-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 1, vars: 1, consts: [[3, "class", "disabled", "click", 4, "ngIf"], [3, "disabled", "click"], [3, "class", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], [3, "innerHTML"]], template: function AddReferenceComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, AddReferenceComponent_button_0_Template, 3, 5, "button", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.showAddButton);
    } }, dependencies: [i2.NgIf], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AddReferenceComponent, [{
        type: Component,
        args: [{
                selector: 'add-reference-widget',
                template: `
      <button *ngIf="showAddButton"
              [class]="options?.fieldHtmlClass || ''"
              [disabled]="options?.readonly"
              (click)="addItem($event)">
          <span *ngIf="options?.icon" [class]="options?.icon"></span>
          <span *ngIf="options?.title" [innerHTML]="buttonText"></span>
      </button>`,
                changeDetection: ChangeDetectionStrategy.Default,
            }]
    }], function () { return [{ type: JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();

class OneOfComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
}
OneOfComponent.ɵfac = function OneOfComponent_Factory(t) { return new (t || OneOfComponent)(i0.ɵɵdirectiveInject(JsonSchemaFormService)); };
OneOfComponent.ɵcmp = i0.ɵɵdefineComponent({ type: OneOfComponent, selectors: [["one-of-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 0, vars: 0, template: function OneOfComponent_Template(rf, ctx) { }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OneOfComponent, [{
        type: Component,
        args: [{
                selector: 'one-of-widget',
                template: ``,
            }]
    }], function () { return [{ type: JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();

function ButtonComponent_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap(ctx_r0.options == null ? null : ctx_r0.options.icon);
    i0.ɵɵproperty("innerHTML", ctx_r0.options == null ? null : ctx_r0.options.title, i0.ɵɵsanitizeHtml);
} }
class ButtonComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    }
    updateValue(event) {
        if (typeof this.options.onClick === 'function') {
            this.options.onClick(event);
        }
        else {
            this.jsf.updateValue(this, event.target.value);
        }
    }
}
ButtonComponent.ɵfac = function ButtonComponent_Factory(t) { return new (t || ButtonComponent)(i0.ɵɵdirectiveInject(JsonSchemaFormService)); };
ButtonComponent.ɵcmp = i0.ɵɵdefineComponent({ type: ButtonComponent, selectors: [["button-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 3, vars: 11, consts: [[3, "disabled", "name", "type", "value", "click"], [3, "class", "innerHTML", 4, "ngIf"], [3, "innerHTML"]], template: function ButtonComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div")(1, "button", 0);
        i0.ɵɵlistener("click", function ButtonComponent_Template_button_click_1_listener($event) { return ctx.updateValue($event); });
        i0.ɵɵtemplate(2, ButtonComponent_span_2_Template, 1, 3, "span", 1);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.htmlClass) || "");
        i0.ɵɵadvance(1);
        i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.fieldHtmlClass) || "");
        i0.ɵɵproperty("disabled", ctx.controlDisabled)("name", ctx.controlName)("type", ctx.layoutNode == null ? null : ctx.layoutNode.type)("value", ctx.controlValue);
        i0.ɵɵattribute("readonly", (ctx.options == null ? null : ctx.options.readonly) ? "readonly" : null)("aria-describedby", "control" + (ctx.layoutNode == null ? null : ctx.layoutNode._id) + "Status");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.icon) || (ctx.options == null ? null : ctx.options.title));
    } }, dependencies: [i2.NgIf], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ButtonComponent, [{
        type: Component,
        args: [{
                selector: 'button-widget',
                template: `
      <div
              [class]="options?.htmlClass || ''">
          <button
                  [attr.readonly]="options?.readonly ? 'readonly' : null"
                  [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                  [class]="options?.fieldHtmlClass || ''"
                  [disabled]="controlDisabled"
                  [name]="controlName"
                  [type]="layoutNode?.type"
                  [value]="controlValue"
                  (click)="updateValue($event)">
        <span *ngIf="options?.icon || options?.title"
              [class]="options?.icon"
              [innerHTML]="options?.title"></span>
          </button>
      </div>`,
            }]
    }], function () { return [{ type: JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();

function CheckboxComponent_input_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 3);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap(((ctx_r0.options == null ? null : ctx_r0.options.fieldHtmlClass) || "") + (ctx_r0.isChecked ? " " + ((ctx_r0.options == null ? null : ctx_r0.options.activeClass) || "") + " " + ((ctx_r0.options == null ? null : ctx_r0.options.style == null ? null : ctx_r0.options.style.selected) || "") : " " + ((ctx_r0.options == null ? null : ctx_r0.options.style == null ? null : ctx_r0.options.style.unselected) || "")));
    i0.ɵɵproperty("formControl", ctx_r0.formControl)("id", "control" + (ctx_r0.layoutNode == null ? null : ctx_r0.layoutNode._id))("name", ctx_r0.controlName)("readonly", (ctx_r0.options == null ? null : ctx_r0.options.readonly) ? "readonly" : null);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r0.layoutNode == null ? null : ctx_r0.layoutNode._id) + "Status");
} }
function CheckboxComponent_input_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 4);
    i0.ɵɵlistener("change", function CheckboxComponent_input_2_Template_input_change_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.updateValue($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassMap(((ctx_r1.options == null ? null : ctx_r1.options.fieldHtmlClass) || "") + (ctx_r1.isChecked ? " " + ((ctx_r1.options == null ? null : ctx_r1.options.activeClass) || "") + " " + ((ctx_r1.options == null ? null : ctx_r1.options.style == null ? null : ctx_r1.options.style.selected) || "") : " " + ((ctx_r1.options == null ? null : ctx_r1.options.style == null ? null : ctx_r1.options.style.unselected) || "")));
    i0.ɵɵproperty("checked", ctx_r1.isChecked ? "checked" : null)("disabled", ctx_r1.controlDisabled)("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id))("name", ctx_r1.controlName)("readonly", (ctx_r1.options == null ? null : ctx_r1.options.readonly) ? "readonly" : null)("value", ctx_r1.controlValue);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Status");
} }
function CheckboxComponent_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 5);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("display", (ctx_r2.options == null ? null : ctx_r2.options.notitle) ? "none" : "");
    i0.ɵɵproperty("innerHTML", ctx_r2.options == null ? null : ctx_r2.options.title, i0.ɵɵsanitizeHtml);
} }
class CheckboxComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.trueValue = true;
        this.falseValue = false;
    }
    get isChecked() {
        return this.jsf.getFormControlValue(this) === this.trueValue;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (this.controlValue === null || this.controlValue === undefined) {
            this.controlValue = this.options.title;
        }
    }
    updateValue(event) {
        event.preventDefault();
        this.jsf.updateValue(this, event.target.checked ? this.trueValue : this.falseValue);
    }
}
CheckboxComponent.ɵfac = function CheckboxComponent_Factory(t) { return new (t || CheckboxComponent)(i0.ɵɵdirectiveInject(JsonSchemaFormService)); };
CheckboxComponent.ɵcmp = i0.ɵɵdefineComponent({ type: CheckboxComponent, selectors: [["checkbox-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 4, vars: 6, consts: [["type", "checkbox", 3, "formControl", "class", "id", "name", "readonly", 4, "ngIf"], ["type", "checkbox", 3, "checked", "class", "disabled", "id", "name", "readonly", "value", "change", 4, "ngIf"], [3, "display", "innerHTML", 4, "ngIf"], ["type", "checkbox", 3, "formControl", "id", "name", "readonly"], ["type", "checkbox", 3, "checked", "disabled", "id", "name", "readonly", "value", "change"], [3, "innerHTML"]], template: function CheckboxComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "label");
        i0.ɵɵtemplate(1, CheckboxComponent_input_1_Template, 1, 7, "input", 0);
        i0.ɵɵtemplate(2, CheckboxComponent_input_2_Template, 1, 9, "input", 1);
        i0.ɵɵtemplate(3, CheckboxComponent_span_3_Template, 1, 3, "span", 2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.itemLabelHtmlClass) || "");
        i0.ɵɵattribute("for", "control" + (ctx.layoutNode == null ? null : ctx.layoutNode._id));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.boundControl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.boundControl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.title);
    } }, dependencies: [i2.NgIf, i3.CheckboxControlValueAccessor, i3.NgControlStatus, i3.FormControlDirective], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CheckboxComponent, [{
        type: Component,
        args: [{
                selector: 'checkbox-widget',
                template: `
      <label
              [attr.for]="'control' + layoutNode?._id"
              [class]="options?.itemLabelHtmlClass || ''">
          <input *ngIf="boundControl"
                 [formControl]="formControl"
                 [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                 [class]="(options?.fieldHtmlClass || '') + (isChecked ?
          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :
          (' ' + (options?.style?.unselected || '')))"
                 [id]="'control' + layoutNode?._id"
                 [name]="controlName"
                 [readonly]="options?.readonly ? 'readonly' : null"
                 type="checkbox">
          <input *ngIf="!boundControl"
                 [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                 [checked]="isChecked ? 'checked' : null"
                 [class]="(options?.fieldHtmlClass || '') + (isChecked ?
          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :
          (' ' + (options?.style?.unselected || '')))"
                 [disabled]="controlDisabled"
                 [id]="'control' + layoutNode?._id"
                 [name]="controlName"
                 [readonly]="options?.readonly ? 'readonly' : null"
                 [value]="controlValue"
                 type="checkbox"
                 (change)="updateValue($event)">
          <span *ngIf="options?.title"
                [style.display]="options?.notitle ? 'none' : ''"
                [innerHTML]="options?.title"></span>
      </label>`,
            }]
    }], function () { return [{ type: JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();

function CheckboxesComponent_label_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "label", 3);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r0.options == null ? null : ctx_r0.options.labelHtmlClass) || "");
    i0.ɵɵstyleProp("display", (ctx_r0.options == null ? null : ctx_r0.options.notitle) ? "none" : "");
    i0.ɵɵproperty("innerHTML", ctx_r0.options == null ? null : ctx_r0.options.title, i0.ɵɵsanitizeHtml);
} }
function CheckboxesComponent_div_1_label_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label")(1, "input", 5);
    i0.ɵɵlistener("change", function CheckboxesComponent_div_1_label_1_Template_input_change_1_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r5.updateValue($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(2, "span", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const checkboxItem_r4 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap(((ctx_r3.options == null ? null : ctx_r3.options.itemLabelHtmlClass) || "") + (checkboxItem_r4.checked ? " " + ((ctx_r3.options == null ? null : ctx_r3.options.activeClass) || "") + " " + ((ctx_r3.options == null ? null : ctx_r3.options.style == null ? null : ctx_r3.options.style.selected) || "") : " " + ((ctx_r3.options == null ? null : ctx_r3.options.style == null ? null : ctx_r3.options.style.unselected) || "")));
    i0.ɵɵattribute("for", "control" + (ctx_r3.layoutNode == null ? null : ctx_r3.layoutNode._id) + "/" + checkboxItem_r4.value);
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap((ctx_r3.options == null ? null : ctx_r3.options.fieldHtmlClass) || "");
    i0.ɵɵproperty("checked", checkboxItem_r4.checked)("disabled", ctx_r3.controlDisabled)("id", "control" + (ctx_r3.layoutNode == null ? null : ctx_r3.layoutNode._id) + "/" + checkboxItem_r4.value)("name", checkboxItem_r4 == null ? null : checkboxItem_r4.name)("readonly", (ctx_r3.options == null ? null : ctx_r3.options.readonly) ? "readonly" : null)("value", checkboxItem_r4.value);
    i0.ɵɵattribute("required", ctx_r3.options == null ? null : ctx_r3.options.required);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", checkboxItem_r4.name, i0.ɵɵsanitizeHtml);
} }
function CheckboxesComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, CheckboxesComponent_div_1_label_1_Template, 3, 13, "label", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r1.options == null ? null : ctx_r1.options.htmlClass) || "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.checkboxList);
} }
function CheckboxesComponent_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "label")(2, "input", 5);
    i0.ɵɵlistener("change", function CheckboxesComponent_div_2_div_1_Template_input_change_2_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r9.updateValue($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "span", 3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const checkboxItem_r8 = ctx.$implicit;
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap((ctx_r7.options == null ? null : ctx_r7.options.htmlClass) || "");
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap(((ctx_r7.options == null ? null : ctx_r7.options.itemLabelHtmlClass) || "") + (checkboxItem_r8.checked ? " " + ((ctx_r7.options == null ? null : ctx_r7.options.activeClass) || "") + " " + ((ctx_r7.options == null ? null : ctx_r7.options.style == null ? null : ctx_r7.options.style.selected) || "") : " " + ((ctx_r7.options == null ? null : ctx_r7.options.style == null ? null : ctx_r7.options.style.unselected) || "")));
    i0.ɵɵattribute("for", "control" + (ctx_r7.layoutNode == null ? null : ctx_r7.layoutNode._id) + "/" + checkboxItem_r8.value);
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap((ctx_r7.options == null ? null : ctx_r7.options.fieldHtmlClass) || "");
    i0.ɵɵproperty("checked", checkboxItem_r8.checked)("disabled", ctx_r7.controlDisabled)("id", (ctx_r7.options == null ? null : ctx_r7.options.name) + "/" + checkboxItem_r8.value)("name", checkboxItem_r8 == null ? null : checkboxItem_r8.name)("readonly", (ctx_r7.options == null ? null : ctx_r7.options.readonly) ? "readonly" : null)("value", checkboxItem_r8.value);
    i0.ɵɵattribute("required", ctx_r7.options == null ? null : ctx_r7.options.required);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", checkboxItem_r8 == null ? null : checkboxItem_r8.name, i0.ɵɵsanitizeHtml);
} }
function CheckboxesComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, CheckboxesComponent_div_2_div_1_Template, 4, 15, "div", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.checkboxList);
} }
class CheckboxesComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.checkboxList = [];
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.layoutOrientation = (this.layoutNode.type === 'checkboxes-inline' ||
            this.layoutNode.type === 'checkboxbuttons') ? 'horizontal' : 'vertical';
        this.jsf.initializeControl(this);
        this.checkboxList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
        if (this.boundControl) {
            const formArray = this.jsf.getFormControl(this);
            this.checkboxList.forEach(checkboxItem => checkboxItem.checked = formArray.value.includes(checkboxItem.value));
        }
    }
    updateValue(event) {
        for (const checkboxItem of this.checkboxList) {
            if (event.target.value === checkboxItem.value) {
                checkboxItem.checked = event.target.checked;
            }
        }
        if (this.boundControl) {
            this.jsf.updateArrayCheckboxList(this, this.checkboxList);
        }
    }
}
CheckboxesComponent.ɵfac = function CheckboxesComponent_Factory(t) { return new (t || CheckboxesComponent)(i0.ɵɵdirectiveInject(JsonSchemaFormService)); };
CheckboxesComponent.ɵcmp = i0.ɵɵdefineComponent({ type: CheckboxesComponent, selectors: [["checkboxes-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 3, vars: 3, consts: [[3, "class", "display", "innerHTML", 4, "ngIf"], [3, "class", 4, "ngIf"], [4, "ngIf"], [3, "innerHTML"], [3, "class", 4, "ngFor", "ngForOf"], ["type", "checkbox", 3, "checked", "disabled", "id", "name", "readonly", "value", "change"]], template: function CheckboxesComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CheckboxesComponent_label_0_Template, 1, 5, "label", 0);
        i0.ɵɵtemplate(1, CheckboxesComponent_div_1_Template, 2, 3, "div", 1);
        i0.ɵɵtemplate(2, CheckboxesComponent_div_2_Template, 2, 1, "div", 2);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.title);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.layoutOrientation === "horizontal");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.layoutOrientation === "vertical");
    } }, dependencies: [i2.NgForOf, i2.NgIf], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CheckboxesComponent, [{
        type: Component,
        args: [{
                selector: 'checkboxes-widget',
                template: `
      <label *ngIf="options?.title"
             [class]="options?.labelHtmlClass || ''"
             [style.display]="options?.notitle ? 'none' : ''"
             [innerHTML]="options?.title"></label>

      <!-- 'horizontal' = checkboxes-inline or checkboxbuttons -->
      <div *ngIf="layoutOrientation === 'horizontal'" [class]="options?.htmlClass || ''">
          <label *ngFor="let checkboxItem of checkboxList"
                 [attr.for]="'control' + layoutNode?._id + '/' + checkboxItem.value"
                 [class]="(options?.itemLabelHtmlClass || '') + (checkboxItem.checked ?
          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :
          (' ' + (options?.style?.unselected || '')))">
              <input type="checkbox"
                     [attr.required]="options?.required"
                     [checked]="checkboxItem.checked"
                     [class]="options?.fieldHtmlClass || ''"
                     [disabled]="controlDisabled"
                     [id]="'control' + layoutNode?._id + '/' + checkboxItem.value"
                     [name]="checkboxItem?.name"
                     [readonly]="options?.readonly ? 'readonly' : null"
                     [value]="checkboxItem.value"
                     (change)="updateValue($event)">
              <span [innerHTML]="checkboxItem.name"></span>
          </label>
      </div>

      <!-- 'vertical' = regular checkboxes -->
      <div *ngIf="layoutOrientation === 'vertical'">
          <div *ngFor="let checkboxItem of checkboxList" [class]="options?.htmlClass || ''">
              <label
                      [attr.for]="'control' + layoutNode?._id + '/' + checkboxItem.value"
                      [class]="(options?.itemLabelHtmlClass || '') + (checkboxItem.checked ?
            (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :
            (' ' + (options?.style?.unselected || '')))">
                  <input type="checkbox"
                         [attr.required]="options?.required"
                         [checked]="checkboxItem.checked"
                         [class]="options?.fieldHtmlClass || ''"
                         [disabled]="controlDisabled"
                         [id]="options?.name + '/' + checkboxItem.value"
                         [name]="checkboxItem?.name"
                         [readonly]="options?.readonly ? 'readonly' : null"
                         [value]="checkboxItem.value"
                         (change)="updateValue($event)">
                  <span [innerHTML]="checkboxItem?.name"></span>
              </label>
          </div>
      </div>`,
            }]
    }], function () { return [{ type: JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();

class FileComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
}
FileComponent.ɵfac = function FileComponent_Factory(t) { return new (t || FileComponent)(i0.ɵɵdirectiveInject(JsonSchemaFormService)); };
FileComponent.ɵcmp = i0.ɵɵdefineComponent({ type: FileComponent, selectors: [["file-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 0, vars: 0, template: function FileComponent_Template(rf, ctx) { }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FileComponent, [{
        type: Component,
        args: [{
                selector: 'file-widget',
                template: ``,
            }]
    }], function () { return [{ type: JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();

function InputComponent_label_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "label", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r0.options == null ? null : ctx_r0.options.labelHtmlClass) || "");
    i0.ɵɵstyleProp("display", (ctx_r0.options == null ? null : ctx_r0.options.notitle) ? "none" : "");
    i0.ɵɵproperty("innerHTML", ctx_r0.options == null ? null : ctx_r0.options.title, i0.ɵɵsanitizeHtml);
    i0.ɵɵattribute("for", "control" + (ctx_r0.layoutNode == null ? null : ctx_r0.layoutNode._id));
} }
function InputComponent_input_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 5);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r1.options == null ? null : ctx_r1.options.fieldHtmlClass) || "");
    i0.ɵɵproperty("formControl", ctx_r1.formControl)("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id))("name", ctx_r1.controlName)("readonly", (ctx_r1.options == null ? null : ctx_r1.options.readonly) ? "readonly" : null)("type", ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode.type);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Status")("list", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Autocomplete")("maxlength", ctx_r1.options == null ? null : ctx_r1.options.maxLength)("minlength", ctx_r1.options == null ? null : ctx_r1.options.minLength)("pattern", ctx_r1.options == null ? null : ctx_r1.options.pattern)("placeholder", ctx_r1.options == null ? null : ctx_r1.options.placeholder)("required", ctx_r1.options == null ? null : ctx_r1.options.required);
} }
function InputComponent_input_3_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 6);
    i0.ɵɵlistener("input", function InputComponent_input_3_Template_input_input_0_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.updateValue($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r2.options == null ? null : ctx_r2.options.fieldHtmlClass) || "");
    i0.ɵɵproperty("disabled", ctx_r2.controlDisabled)("id", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id))("name", ctx_r2.controlName)("readonly", (ctx_r2.options == null ? null : ctx_r2.options.readonly) ? "readonly" : null)("type", ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode.type)("value", ctx_r2.controlValue);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Status")("list", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Autocomplete")("maxlength", ctx_r2.options == null ? null : ctx_r2.options.maxLength)("minlength", ctx_r2.options == null ? null : ctx_r2.options.minLength)("pattern", ctx_r2.options == null ? null : ctx_r2.options.pattern)("placeholder", ctx_r2.options == null ? null : ctx_r2.options.placeholder)("required", ctx_r2.options == null ? null : ctx_r2.options.required);
} }
function InputComponent_datalist_4_option_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "option", 9);
} if (rf & 2) {
    const word_r7 = ctx.$implicit;
    i0.ɵɵproperty("value", word_r7);
} }
function InputComponent_datalist_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "datalist", 7);
    i0.ɵɵtemplate(1, InputComponent_datalist_4_option_1_Template, 1, 1, "option", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", "control" + (ctx_r3.layoutNode == null ? null : ctx_r3.layoutNode._id) + "Autocomplete");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r3.options == null ? null : ctx_r3.options.typeahead == null ? null : ctx_r3.options.typeahead.source);
} }
class InputComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.autoCompleteList = [];
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
}
InputComponent.ɵfac = function InputComponent_Factory(t) { return new (t || InputComponent)(i0.ɵɵdirectiveInject(JsonSchemaFormService)); };
InputComponent.ɵcmp = i0.ɵɵdefineComponent({ type: InputComponent, selectors: [["input-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 5, vars: 6, consts: [[3, "class", "display", "innerHTML", 4, "ngIf"], [3, "formControl", "class", "id", "name", "readonly", "type", 4, "ngIf"], [3, "class", "disabled", "id", "name", "readonly", "type", "value", "input", 4, "ngIf"], [3, "id", 4, "ngIf"], [3, "innerHTML"], [3, "formControl", "id", "name", "readonly", "type"], [3, "disabled", "id", "name", "readonly", "type", "value", "input"], [3, "id"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"]], template: function InputComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div");
        i0.ɵɵtemplate(1, InputComponent_label_1_Template, 1, 6, "label", 0);
        i0.ɵɵtemplate(2, InputComponent_input_2_Template, 1, 14, "input", 1);
        i0.ɵɵtemplate(3, InputComponent_input_3_Template, 1, 15, "input", 2);
        i0.ɵɵtemplate(4, InputComponent_datalist_4_Template, 2, 2, "datalist", 3);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.htmlClass) || "");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.title);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.boundControl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.boundControl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.typeahead == null ? null : ctx.options.typeahead.source);
    } }, dependencies: [i2.NgForOf, i2.NgIf, i3.NgSelectOption, i3.ɵNgSelectMultipleOption, i3.DefaultValueAccessor, i3.NgControlStatus, i3.RequiredValidator, i3.MinLengthValidator, i3.MaxLengthValidator, i3.PatternValidator, i3.FormControlDirective], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InputComponent, [{
        type: Component,
        args: [{
                selector: 'input-widget',
                template: `
    <div [class]="options?.htmlClass || ''">
      <label *ngIf="options?.title"
        [attr.for]="'control' + layoutNode?._id"
        [class]="options?.labelHtmlClass || ''"
        [style.display]="options?.notitle ? 'none' : ''"
        [innerHTML]="options?.title"></label>
      <input *ngIf="boundControl"
        [formControl]="formControl"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
        [attr.maxlength]="options?.maxLength"
        [attr.minlength]="options?.minLength"
        [attr.pattern]="options?.pattern"
        [attr.placeholder]="options?.placeholder"
        [attr.required]="options?.required"
        [class]="options?.fieldHtmlClass || ''"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [readonly]="options?.readonly ? 'readonly' : null"
        [type]="layoutNode?.type">
      <input *ngIf="!boundControl"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
        [attr.maxlength]="options?.maxLength"
        [attr.minlength]="options?.minLength"
        [attr.pattern]="options?.pattern"
        [attr.placeholder]="options?.placeholder"
        [attr.required]="options?.required"
        [class]="options?.fieldHtmlClass || ''"
        [disabled]="controlDisabled"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [readonly]="options?.readonly ? 'readonly' : null"
        [type]="layoutNode?.type"
        [value]="controlValue"
        (input)="updateValue($event)">
        <datalist *ngIf="options?.typeahead?.source"
          [id]="'control' + layoutNode?._id + 'Autocomplete'">
          <option *ngFor="let word of options?.typeahead?.source" [value]="word">
        </datalist>
    </div>`,
            }]
    }], function () { return [{ type: JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();

function MessageComponent_span_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 1);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r0.options == null ? null : ctx_r0.options.labelHtmlClass) || "");
    i0.ɵɵproperty("innerHTML", ctx_r0.message, i0.ɵɵsanitizeHtml);
} }
class MessageComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.message = null;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.message = this.options.help || this.options.helpvalue ||
            this.options.msg || this.options.message;
    }
}
MessageComponent.ɵfac = function MessageComponent_Factory(t) { return new (t || MessageComponent)(i0.ɵɵdirectiveInject(JsonSchemaFormService)); };
MessageComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MessageComponent, selectors: [["message-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 1, vars: 1, consts: [[3, "class", "innerHTML", 4, "ngIf"], [3, "innerHTML"]], template: function MessageComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, MessageComponent_span_0_Template, 1, 3, "span", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.message);
    } }, dependencies: [i2.NgIf], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MessageComponent, [{
        type: Component,
        args: [{
                selector: 'message-widget',
                template: `
    <span *ngIf="message"
      [class]="options?.labelHtmlClass || ''"
      [innerHTML]="message"></span>`,
            }]
    }], function () { return [{ type: JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();

class NoneComponent {
}
NoneComponent.ɵfac = function NoneComponent_Factory(t) { return new (t || NoneComponent)(); };
NoneComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NoneComponent, selectors: [["none-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 0, vars: 0, template: function NoneComponent_Template(rf, ctx) { }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NoneComponent, [{
        type: Component,
        args: [{
                selector: 'none-widget',
                template: ``,
            }]
    }], null, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();

function NumberComponent_label_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "label", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r0.options == null ? null : ctx_r0.options.labelHtmlClass) || "");
    i0.ɵɵstyleProp("display", (ctx_r0.options == null ? null : ctx_r0.options.notitle) ? "none" : "");
    i0.ɵɵproperty("innerHTML", ctx_r0.options == null ? null : ctx_r0.options.title, i0.ɵɵsanitizeHtml);
    i0.ɵɵattribute("for", "control" + (ctx_r0.layoutNode == null ? null : ctx_r0.layoutNode._id));
} }
function NumberComponent_input_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 5);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r1.options == null ? null : ctx_r1.options.fieldHtmlClass) || "");
    i0.ɵɵproperty("formControl", ctx_r1.formControl)("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id))("name", ctx_r1.controlName)("readonly", (ctx_r1.options == null ? null : ctx_r1.options.readonly) ? "readonly" : null)("title", ctx_r1.lastValidNumber)("type", (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode.type) === "range" ? "range" : "number");
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Status")("max", ctx_r1.options == null ? null : ctx_r1.options.maximum)("min", ctx_r1.options == null ? null : ctx_r1.options.minimum)("placeholder", ctx_r1.options == null ? null : ctx_r1.options.placeholder)("required", ctx_r1.options == null ? null : ctx_r1.options.required)("readonly", (ctx_r1.options == null ? null : ctx_r1.options.readonly) ? "readonly" : null)("step", (ctx_r1.options == null ? null : ctx_r1.options.multipleOf) || (ctx_r1.options == null ? null : ctx_r1.options.step) || "any");
} }
function NumberComponent_input_3_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 6);
    i0.ɵɵlistener("input", function NumberComponent_input_3_Template_input_input_0_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.updateValue($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r2.options == null ? null : ctx_r2.options.fieldHtmlClass) || "");
    i0.ɵɵproperty("disabled", ctx_r2.controlDisabled)("id", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id))("name", ctx_r2.controlName)("readonly", (ctx_r2.options == null ? null : ctx_r2.options.readonly) ? "readonly" : null)("title", ctx_r2.lastValidNumber)("type", (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode.type) === "range" ? "range" : "number")("value", ctx_r2.controlValue);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Status")("max", ctx_r2.options == null ? null : ctx_r2.options.maximum)("min", ctx_r2.options == null ? null : ctx_r2.options.minimum)("placeholder", ctx_r2.options == null ? null : ctx_r2.options.placeholder)("required", ctx_r2.options == null ? null : ctx_r2.options.required)("readonly", (ctx_r2.options == null ? null : ctx_r2.options.readonly) ? "readonly" : null)("step", (ctx_r2.options == null ? null : ctx_r2.options.multipleOf) || (ctx_r2.options == null ? null : ctx_r2.options.step) || "any");
} }
function NumberComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 4);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r3.controlValue, i0.ɵɵsanitizeHtml);
} }
class NumberComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.allowNegative = true;
        this.allowDecimal = true;
        this.allowExponents = false;
        this.lastValidNumber = '';
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (this.layoutNode.dataType === 'integer') {
            this.allowDecimal = false;
        }
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
}
NumberComponent.ɵfac = function NumberComponent_Factory(t) { return new (t || NumberComponent)(i0.ɵɵdirectiveInject(JsonSchemaFormService)); };
NumberComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NumberComponent, selectors: [["number-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 5, vars: 6, consts: [[3, "class", "display", "innerHTML", 4, "ngIf"], [3, "formControl", "class", "id", "name", "readonly", "title", "type", 4, "ngIf"], [3, "class", "disabled", "id", "name", "readonly", "title", "type", "value", "input", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], [3, "innerHTML"], [3, "formControl", "id", "name", "readonly", "title", "type"], [3, "disabled", "id", "name", "readonly", "title", "type", "value", "input"]], template: function NumberComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div");
        i0.ɵɵtemplate(1, NumberComponent_label_1_Template, 1, 6, "label", 0);
        i0.ɵɵtemplate(2, NumberComponent_input_2_Template, 1, 15, "input", 1);
        i0.ɵɵtemplate(3, NumberComponent_input_3_Template, 1, 16, "input", 2);
        i0.ɵɵtemplate(4, NumberComponent_span_4_Template, 1, 1, "span", 3);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.htmlClass) || "");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.title);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.boundControl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.boundControl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx.layoutNode == null ? null : ctx.layoutNode.type) === "range");
    } }, dependencies: [i2.NgIf, i3.DefaultValueAccessor, i3.NgControlStatus, i3.RequiredValidator, i3.FormControlDirective], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NumberComponent, [{
        type: Component,
        args: [{
                selector: 'number-widget',
                template: `
      <div [class]="options?.htmlClass || ''">
          <label *ngIf="options?.title"
                 [attr.for]="'control' + layoutNode?._id"
                 [class]="options?.labelHtmlClass || ''"
                 [style.display]="options?.notitle ? 'none' : ''"
                 [innerHTML]="options?.title"></label>
          <input *ngIf="boundControl"
                 [formControl]="formControl"
                 [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                 [attr.max]="options?.maximum"
                 [attr.min]="options?.minimum"
                 [attr.placeholder]="options?.placeholder"
                 [attr.required]="options?.required"
                 [attr.readonly]="options?.readonly ? 'readonly' : null"
                 [attr.step]="options?.multipleOf || options?.step || 'any'"
                 [class]="options?.fieldHtmlClass || ''"
                 [id]="'control' + layoutNode?._id"
                 [name]="controlName"
                 [readonly]="options?.readonly ? 'readonly' : null"
                 [title]="lastValidNumber"
                 [type]="layoutNode?.type === 'range' ? 'range' : 'number'">
          <input *ngIf="!boundControl"
                 [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                 [attr.max]="options?.maximum"
                 [attr.min]="options?.minimum"
                 [attr.placeholder]="options?.placeholder"
                 [attr.required]="options?.required"
                 [attr.readonly]="options?.readonly ? 'readonly' : null"
                 [attr.step]="options?.multipleOf || options?.step || 'any'"
                 [class]="options?.fieldHtmlClass || ''"
                 [disabled]="controlDisabled"
                 [id]="'control' + layoutNode?._id"
                 [name]="controlName"
                 [readonly]="options?.readonly ? 'readonly' : null"
                 [title]="lastValidNumber"
                 [type]="layoutNode?.type === 'range' ? 'range' : 'number'"
                 [value]="controlValue"
                 (input)="updateValue($event)">
          <span *ngIf="layoutNode?.type === 'range'" [innerHTML]="controlValue"></span>
      </div>`,
            }]
    }], function () { return [{ type: JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();

function RadiosComponent_label_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "label", 3);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r0.options == null ? null : ctx_r0.options.labelHtmlClass) || "");
    i0.ɵɵstyleProp("display", (ctx_r0.options == null ? null : ctx_r0.options.notitle) ? "none" : "");
    i0.ɵɵproperty("innerHTML", ctx_r0.options == null ? null : ctx_r0.options.title, i0.ɵɵsanitizeHtml);
    i0.ɵɵattribute("for", "control" + (ctx_r0.layoutNode == null ? null : ctx_r0.layoutNode._id));
} }
function RadiosComponent_div_1_label_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label")(1, "input", 5);
    i0.ɵɵlistener("change", function RadiosComponent_div_1_label_1_Template_input_change_1_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r5.updateValue($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(2, "span", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const radioItem_r4 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap(((ctx_r3.options == null ? null : ctx_r3.options.itemLabelHtmlClass) || "") + (ctx_r3.controlValue + "" === (radioItem_r4 == null ? null : radioItem_r4.value) + "" ? " " + ((ctx_r3.options == null ? null : ctx_r3.options.activeClass) || "") + " " + ((ctx_r3.options == null ? null : ctx_r3.options.style == null ? null : ctx_r3.options.style.selected) || "") : " " + ((ctx_r3.options == null ? null : ctx_r3.options.style == null ? null : ctx_r3.options.style.unselected) || "")));
    i0.ɵɵattribute("for", "control" + (ctx_r3.layoutNode == null ? null : ctx_r3.layoutNode._id) + "/" + (radioItem_r4 == null ? null : radioItem_r4.value));
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap((ctx_r3.options == null ? null : ctx_r3.options.fieldHtmlClass) || "");
    i0.ɵɵproperty("checked", (radioItem_r4 == null ? null : radioItem_r4.value) === ctx_r3.controlValue)("disabled", ctx_r3.controlDisabled)("id", "control" + (ctx_r3.layoutNode == null ? null : ctx_r3.layoutNode._id) + "/" + (radioItem_r4 == null ? null : radioItem_r4.value))("name", ctx_r3.controlName)("value", radioItem_r4 == null ? null : radioItem_r4.value);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r3.layoutNode == null ? null : ctx_r3.layoutNode._id) + "Status")("readonly", (ctx_r3.options == null ? null : ctx_r3.options.readonly) ? "readonly" : null)("required", ctx_r3.options == null ? null : ctx_r3.options.required);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", radioItem_r4 == null ? null : radioItem_r4.name, i0.ɵɵsanitizeHtml);
} }
function RadiosComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, RadiosComponent_div_1_label_1_Template, 3, 14, "label", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r1.options == null ? null : ctx_r1.options.htmlClass) || "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.radiosList);
} }
function RadiosComponent_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "label")(2, "input", 5);
    i0.ɵɵlistener("change", function RadiosComponent_div_2_div_1_Template_input_change_2_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r9.updateValue($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "span", 3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const radioItem_r8 = ctx.$implicit;
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap((ctx_r7.options == null ? null : ctx_r7.options.htmlClass) || "");
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap(((ctx_r7.options == null ? null : ctx_r7.options.itemLabelHtmlClass) || "") + (ctx_r7.controlValue + "" === (radioItem_r8 == null ? null : radioItem_r8.value) + "" ? " " + ((ctx_r7.options == null ? null : ctx_r7.options.activeClass) || "") + " " + ((ctx_r7.options == null ? null : ctx_r7.options.style == null ? null : ctx_r7.options.style.selected) || "") : " " + ((ctx_r7.options == null ? null : ctx_r7.options.style == null ? null : ctx_r7.options.style.unselected) || "")));
    i0.ɵɵattribute("for", "control" + (ctx_r7.layoutNode == null ? null : ctx_r7.layoutNode._id) + "/" + (radioItem_r8 == null ? null : radioItem_r8.value));
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap((ctx_r7.options == null ? null : ctx_r7.options.fieldHtmlClass) || "");
    i0.ɵɵproperty("checked", (radioItem_r8 == null ? null : radioItem_r8.value) === ctx_r7.controlValue)("disabled", ctx_r7.controlDisabled)("id", "control" + (ctx_r7.layoutNode == null ? null : ctx_r7.layoutNode._id) + "/" + (radioItem_r8 == null ? null : radioItem_r8.value))("name", ctx_r7.controlName)("value", radioItem_r8 == null ? null : radioItem_r8.value);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r7.layoutNode == null ? null : ctx_r7.layoutNode._id) + "Status")("readonly", (ctx_r7.options == null ? null : ctx_r7.options.readonly) ? "readonly" : null)("required", ctx_r7.options == null ? null : ctx_r7.options.required);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", radioItem_r8 == null ? null : radioItem_r8.name, i0.ɵɵsanitizeHtml);
} }
function RadiosComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, RadiosComponent_div_2_div_1_Template, 4, 16, "div", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.radiosList);
} }
class RadiosComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.layoutOrientation = 'vertical';
        this.radiosList = [];
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        if (this.layoutNode.type === 'radios-inline' ||
            this.layoutNode.type === 'radiobuttons') {
            this.layoutOrientation = 'horizontal';
        }
        this.radiosList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
        this.jsf.initializeControl(this);
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
}
RadiosComponent.ɵfac = function RadiosComponent_Factory(t) { return new (t || RadiosComponent)(i0.ɵɵdirectiveInject(JsonSchemaFormService)); };
RadiosComponent.ɵcmp = i0.ɵɵdefineComponent({ type: RadiosComponent, selectors: [["radios-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 3, vars: 3, consts: [[3, "class", "display", "innerHTML", 4, "ngIf"], [3, "class", 4, "ngIf"], [4, "ngIf"], [3, "innerHTML"], [3, "class", 4, "ngFor", "ngForOf"], ["type", "radio", 3, "checked", "disabled", "id", "name", "value", "change"]], template: function RadiosComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, RadiosComponent_label_0_Template, 1, 6, "label", 0);
        i0.ɵɵtemplate(1, RadiosComponent_div_1_Template, 2, 3, "div", 1);
        i0.ɵɵtemplate(2, RadiosComponent_div_2_Template, 2, 1, "div", 2);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.title);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.layoutOrientation === "horizontal");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.layoutOrientation !== "horizontal");
    } }, dependencies: [i2.NgForOf, i2.NgIf], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RadiosComponent, [{
        type: Component,
        args: [{
                selector: 'radios-widget',
                template: `
    <label *ngIf="options?.title"
      [attr.for]="'control' + layoutNode?._id"
      [class]="options?.labelHtmlClass || ''"
      [style.display]="options?.notitle ? 'none' : ''"
      [innerHTML]="options?.title"></label>

    <!-- 'horizontal' = radios-inline or radiobuttons -->
    <div *ngIf="layoutOrientation === 'horizontal'"
      [class]="options?.htmlClass || ''">
      <label *ngFor="let radioItem of radiosList"
        [attr.for]="'control' + layoutNode?._id + '/' + radioItem?.value"
        [class]="(options?.itemLabelHtmlClass || '') +
          ((controlValue + '' === radioItem?.value + '') ?
          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :
          (' ' + (options?.style?.unselected || '')))">
        <input type="radio"
          [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
          [attr.readonly]="options?.readonly ? 'readonly' : null"
          [attr.required]="options?.required"
          [checked]="radioItem?.value === controlValue"
          [class]="options?.fieldHtmlClass || ''"
          [disabled]="controlDisabled"
          [id]="'control' + layoutNode?._id + '/' + radioItem?.value"
          [name]="controlName"
          [value]="radioItem?.value"
          (change)="updateValue($event)">
        <span [innerHTML]="radioItem?.name"></span>
      </label>
    </div>

    <!-- 'vertical' = regular radios -->
    <div *ngIf="layoutOrientation !== 'horizontal'">
      <div *ngFor="let radioItem of radiosList"
        [class]="options?.htmlClass || ''">
        <label
          [attr.for]="'control' + layoutNode?._id + '/' + radioItem?.value"
          [class]="(options?.itemLabelHtmlClass || '') +
            ((controlValue + '' === radioItem?.value + '') ?
            (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :
            (' ' + (options?.style?.unselected || '')))">
          <input type="radio"
            [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
            [attr.readonly]="options?.readonly ? 'readonly' : null"
            [attr.required]="options?.required"
            [checked]="radioItem?.value === controlValue"
            [class]="options?.fieldHtmlClass || ''"
            [disabled]="controlDisabled"
            [id]="'control' + layoutNode?._id + '/' + radioItem?.value"
            [name]="controlName"
            [value]="radioItem?.value"
            (change)="updateValue($event)">
          <span [innerHTML]="radioItem?.name"></span>
        </label>
      </div>
    </div>`,
            }]
    }], function () { return [{ type: JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();

const _c0$4 = ["widgetContainer"];
class SelectFrameworkComponent {
    constructor(componentFactory, jsf) {
        this.componentFactory = componentFactory;
        this.jsf = jsf;
        this.newComponent = null;
    }
    ngOnInit() {
        this.updateComponent();
    }
    ngOnChanges() {
        this.updateComponent();
    }
    updateComponent() {
        if (!this.newComponent && this.jsf.framework) {
            this.newComponent = this.widgetContainer.createComponent(this.componentFactory.resolveComponentFactory(this.jsf.framework));
        }
        if (this.newComponent) {
            for (const input of ['layoutNode', 'layoutIndex', 'dataIndex']) {
                this.newComponent.instance[input] = this[input];
            }
        }
    }
}
SelectFrameworkComponent.ɵfac = function SelectFrameworkComponent_Factory(t) { return new (t || SelectFrameworkComponent)(i0.ɵɵdirectiveInject(i0.ComponentFactoryResolver), i0.ɵɵdirectiveInject(JsonSchemaFormService)); };
SelectFrameworkComponent.ɵcmp = i0.ɵɵdefineComponent({ type: SelectFrameworkComponent, selectors: [["select-framework-widget"]], viewQuery: function SelectFrameworkComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0$4, 7, ViewContainerRef);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.widgetContainer = _t.first);
    } }, inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, features: [i0.ɵɵNgOnChangesFeature], decls: 2, vars: 0, consts: [["widgetContainer", ""]], template: function SelectFrameworkComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "div", null, 0);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SelectFrameworkComponent, [{
        type: Component,
        args: [{
                selector: 'select-framework-widget',
                template: `
    <div #widgetContainer></div>
  `,
            }]
    }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }], widgetContainer: [{
            type: ViewChild,
            args: ['widgetContainer', { read: ViewContainerRef, static: true }]
        }] }); })();

const _c0$3 = function () { return []; };
function RootComponent_div_0_select_framework_widget_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "select-framework-widget", 3);
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    const layoutItem_r1 = ctx_r4.$implicit;
    const i_r2 = ctx_r4.index;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("dataIndex", (layoutItem_r1 == null ? null : layoutItem_r1.arrayItem) ? (ctx_r3.dataIndex || i0.ɵɵpureFunction0(3, _c0$3)).concat(i_r2) : ctx_r3.dataIndex || i0.ɵɵpureFunction0(4, _c0$3))("layoutIndex", (ctx_r3.layoutIndex || i0.ɵɵpureFunction0(5, _c0$3)).concat(i_r2))("layoutNode", layoutItem_r1);
} }
const _c1 = function () { return {}; };
function RootComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 1);
    i0.ɵɵtemplate(2, RootComponent_div_0_select_framework_widget_2_Template, 1, 6, "select-framework-widget", 2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const layoutItem_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("align-self", (layoutItem_r1.options || i0.ɵɵpureFunction0(17, _c1))["align-self"])("flex-basis", ctx_r0.getFlexAttribute(layoutItem_r1, "flex-basis"))("flex-grow", ctx_r0.getFlexAttribute(layoutItem_r1, "flex-grow"))("flex-shrink", ctx_r0.getFlexAttribute(layoutItem_r1, "flex-shrink"))("order", (layoutItem_r1.options || i0.ɵɵpureFunction0(18, _c1)).order);
    i0.ɵɵclassProp("form-flex-item", ctx_r0.isFlexItem);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("dataIndex", (layoutItem_r1 == null ? null : layoutItem_r1.arrayItem) ? (ctx_r0.dataIndex || i0.ɵɵpureFunction0(19, _c0$3)).concat(i_r2) : ctx_r0.dataIndex || i0.ɵɵpureFunction0(20, _c0$3))("layoutIndex", (ctx_r0.layoutIndex || i0.ɵɵpureFunction0(21, _c0$3)).concat(i_r2))("layoutNode", layoutItem_r1)("orderable", ctx_r0.isDraggable(layoutItem_r1));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.showWidget(layoutItem_r1));
} }
class RootComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.isFlexItem = false;
    }
    isDraggable(node) {
        return node.arrayItem && node.type !== '$ref' &&
            node.arrayItemType === 'list' && this.isOrderable !== false;
    }
    getFlexAttribute(node, attribute) {
        const index = ['flex-grow', 'flex-shrink', 'flex-basis'].indexOf(attribute);
        return ((node.options || {}).flex || '').split(/\s+/)[index] ||
            (node.options || {})[attribute] || ['1', '1', 'auto'][index];
    }
    showWidget(layoutNode) {
        return this.jsf.evaluateCondition(layoutNode, this.dataIndex);
    }
}
RootComponent.ɵfac = function RootComponent_Factory(t) { return new (t || RootComponent)(i0.ɵɵdirectiveInject(JsonSchemaFormService)); };
RootComponent.ɵcmp = i0.ɵɵdefineComponent({ type: RootComponent, selectors: [["root-widget"]], inputs: { dataIndex: "dataIndex", layoutIndex: "layoutIndex", layout: "layout", isOrderable: "isOrderable", isFlexItem: "isFlexItem" }, decls: 1, vars: 1, consts: [[3, "form-flex-item", "align-self", "flex-basis", "flex-grow", "flex-shrink", "order", 4, "ngFor", "ngForOf"], [3, "dataIndex", "layoutIndex", "layoutNode", "orderable"], [3, "dataIndex", "layoutIndex", "layoutNode", 4, "ngIf"], [3, "dataIndex", "layoutIndex", "layoutNode"]], template: function RootComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, RootComponent_div_0_Template, 3, 22, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngForOf", ctx.layout);
    } }, dependencies: [i2.NgForOf, i2.NgIf, SelectFrameworkComponent, OrderableDirective], styles: ["[draggable=true][_ngcontent-%COMP%]{transition:all .15s cubic-bezier(.4,0,.2,1)}[draggable=true][_ngcontent-%COMP%]:hover{cursor:move;box-shadow:2px 2px 4px #0003;position:relative;z-index:10;margin:-1px 1px 1px -1px}[draggable=true].drag-target-top[_ngcontent-%COMP%]{box-shadow:0 -2px #000;position:relative;z-index:20}[draggable=true].drag-target-bottom[_ngcontent-%COMP%]{box-shadow:0 2px #000;position:relative;z-index:20}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RootComponent, [{
        type: Component,
        args: [{ selector: 'root-widget', template: `
    <div *ngFor="let layoutItem of layout; let i = index"
      [class.form-flex-item]="isFlexItem"
      [style.align-self]="(layoutItem.options || {})['align-self']"
      [style.flex-basis]="getFlexAttribute(layoutItem, 'flex-basis')"
      [style.flex-grow]="getFlexAttribute(layoutItem, 'flex-grow')"
      [style.flex-shrink]="getFlexAttribute(layoutItem, 'flex-shrink')"
      [style.order]="(layoutItem.options || {}).order">
      <div
        [dataIndex]="layoutItem?.arrayItem ? (dataIndex || []).concat(i) : (dataIndex || [])"
        [layoutIndex]="(layoutIndex || []).concat(i)"
        [layoutNode]="layoutItem"
        [orderable]="isDraggable(layoutItem)">
        <select-framework-widget *ngIf="showWidget(layoutItem)"
          [dataIndex]="layoutItem?.arrayItem ? (dataIndex || []).concat(i) : (dataIndex || [])"
          [layoutIndex]="(layoutIndex || []).concat(i)"
          [layoutNode]="layoutItem"></select-framework-widget>
      </div>
    </div>`, styles: ["[draggable=true]{transition:all .15s cubic-bezier(.4,0,.2,1)}[draggable=true]:hover{cursor:move;box-shadow:2px 2px 4px #0003;position:relative;z-index:10;margin:-1px 1px 1px -1px}[draggable=true].drag-target-top{box-shadow:0 -2px #000;position:relative;z-index:20}[draggable=true].drag-target-bottom{box-shadow:0 2px #000;position:relative;z-index:20}\n"] }]
    }], function () { return [{ type: JsonSchemaFormService }]; }, { dataIndex: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], layout: [{
            type: Input
        }], isOrderable: [{
            type: Input
        }], isFlexItem: [{
            type: Input
        }] }); })();

function SectionComponent_div_0_label_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 4);
    i0.ɵɵlistener("click", function SectionComponent_div_0_label_1_Template_label_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r4 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r4.toggleExpanded()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap((ctx_r2.options == null ? null : ctx_r2.options.labelHtmlClass) || "");
    i0.ɵɵproperty("innerHTML", ctx_r2.sectionTitle, i0.ɵɵsanitizeHtml);
} }
function SectionComponent_div_0_root_widget_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "root-widget", 5);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("align-content", ctx_r3.getFlexAttribute("align-content"))("align-items", ctx_r3.getFlexAttribute("align-items"))("display", ctx_r3.getFlexAttribute("display"))("flex-direction", ctx_r3.getFlexAttribute("flex-direction"))("flex-wrap", ctx_r3.getFlexAttribute("flex-wrap"))("justify-content", ctx_r3.getFlexAttribute("justify-content"));
    i0.ɵɵclassProp("form-flex-column", ctx_r3.getFlexAttribute("flex-direction") === "column")("form-flex-row", ctx_r3.getFlexAttribute("flex-direction") === "row");
    i0.ɵɵproperty("dataIndex", ctx_r3.dataIndex)("layout", ctx_r3.layoutNode.items)("layoutIndex", ctx_r3.layoutIndex)("isFlexItem", ctx_r3.getFlexAttribute("is-flex"))("isOrderable", ctx_r3.options == null ? null : ctx_r3.options.orderable);
} }
function SectionComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, SectionComponent_div_0_label_1_Template, 1, 3, "label", 2);
    i0.ɵɵtemplate(2, SectionComponent_div_0_root_widget_2_Template, 1, 21, "root-widget", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r0.options == null ? null : ctx_r0.options.htmlClass) || "");
    i0.ɵɵclassProp("expandable", (ctx_r0.options == null ? null : ctx_r0.options.expandable) && !ctx_r0.expanded)("expanded", (ctx_r0.options == null ? null : ctx_r0.options.expandable) && ctx_r0.expanded);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.sectionTitle);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.expanded);
} }
function SectionComponent_fieldset_1_legend_1_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "legend", 4);
    i0.ɵɵlistener("click", function SectionComponent_fieldset_1_legend_1_Template_legend_click_0_listener() { i0.ɵɵrestoreView(_r11); const ctx_r10 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r10.toggleExpanded()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap((ctx_r6.options == null ? null : ctx_r6.options.labelHtmlClass) || "");
    i0.ɵɵproperty("innerHTML", ctx_r6.sectionTitle, i0.ɵɵsanitizeHtml);
} }
function SectionComponent_fieldset_1_div_2_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p", 9);
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext(3);
    i0.ɵɵclassMap((ctx_r12.options == null ? null : ctx_r12.options.labelHelpBlockClass) || "");
    i0.ɵɵproperty("innerHTML", ctx_r12.options == null ? null : ctx_r12.options.description, i0.ɵɵsanitizeHtml);
} }
function SectionComponent_fieldset_1_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, SectionComponent_fieldset_1_div_2_p_1_Template, 1, 3, "p", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r7.options == null ? null : ctx_r7.options.description);
} }
function SectionComponent_fieldset_1_root_widget_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "root-widget", 5);
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("align-content", ctx_r8.getFlexAttribute("align-content"))("align-items", ctx_r8.getFlexAttribute("align-items"))("display", ctx_r8.getFlexAttribute("display"))("flex-direction", ctx_r8.getFlexAttribute("flex-direction"))("flex-wrap", ctx_r8.getFlexAttribute("flex-wrap"))("justify-content", ctx_r8.getFlexAttribute("justify-content"));
    i0.ɵɵclassProp("form-flex-column", ctx_r8.getFlexAttribute("flex-direction") === "column")("form-flex-row", ctx_r8.getFlexAttribute("flex-direction") === "row");
    i0.ɵɵproperty("dataIndex", ctx_r8.dataIndex)("layout", ctx_r8.layoutNode.items)("layoutIndex", ctx_r8.layoutIndex)("isFlexItem", ctx_r8.getFlexAttribute("is-flex"))("isOrderable", ctx_r8.options == null ? null : ctx_r8.options.orderable);
} }
function SectionComponent_fieldset_1_div_4_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p", 9);
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(3);
    i0.ɵɵclassMap((ctx_r13.options == null ? null : ctx_r13.options.labelHelpBlockClass) || "");
    i0.ɵɵproperty("innerHTML", ctx_r13.options == null ? null : ctx_r13.options.description, i0.ɵɵsanitizeHtml);
} }
function SectionComponent_fieldset_1_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, SectionComponent_fieldset_1_div_4_p_1_Template, 1, 3, "p", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r9.options == null ? null : ctx_r9.options.description);
} }
function SectionComponent_fieldset_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "fieldset", 6);
    i0.ɵɵtemplate(1, SectionComponent_fieldset_1_legend_1_Template, 1, 3, "legend", 2);
    i0.ɵɵtemplate(2, SectionComponent_fieldset_1_div_2_Template, 2, 1, "div", 7);
    i0.ɵɵtemplate(3, SectionComponent_fieldset_1_root_widget_3_Template, 1, 21, "root-widget", 3);
    i0.ɵɵtemplate(4, SectionComponent_fieldset_1_div_4_Template, 2, 1, "div", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r1.options == null ? null : ctx_r1.options.htmlClass) || "");
    i0.ɵɵclassProp("expandable", (ctx_r1.options == null ? null : ctx_r1.options.expandable) && !ctx_r1.expanded)("expanded", (ctx_r1.options == null ? null : ctx_r1.options.expandable) && ctx_r1.expanded);
    i0.ɵɵproperty("disabled", ctx_r1.options == null ? null : ctx_r1.options.readonly);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.sectionTitle);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r1.options == null ? null : ctx_r1.options.messageLocation) !== "bottom");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.expanded);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r1.options == null ? null : ctx_r1.options.messageLocation) === "bottom");
} }
class SectionComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.expanded = true;
    }
    get sectionTitle() {
        return this.options.notitle ? null : this.jsf.setItemTitle(this);
    }
    ngOnInit() {
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
    }
    toggleExpanded() {
        if (this.options.expandable) {
            this.expanded = !this.expanded;
        }
    }
    getFlexAttribute(attribute) {
        const flexActive = this.layoutNode.type === 'flex' ||
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
                const index = ['flex-direction', 'flex-wrap'].indexOf(attribute);
                return (this.options['flex-flow'] || '').split(/\s+/)[index] ||
                    this.options[attribute] || ['column', 'nowrap'][index];
            case 'justify-content':
            case 'align-items':
            case 'align-content':
                return this.options[attribute];
        }
    }
}
SectionComponent.ɵfac = function SectionComponent_Factory(t) { return new (t || SectionComponent)(i0.ɵɵdirectiveInject(JsonSchemaFormService)); };
SectionComponent.ɵcmp = i0.ɵɵdefineComponent({ type: SectionComponent, selectors: [["section-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 2, vars: 2, consts: [[3, "class", "expandable", "expanded", 4, "ngIf"], [3, "class", "expandable", "expanded", "disabled", 4, "ngIf"], ["class", "legend", 3, "class", "innerHTML", "click", 4, "ngIf"], [3, "dataIndex", "layout", "layoutIndex", "isFlexItem", "isOrderable", "form-flex-column", "form-flex-row", "align-content", "align-items", "display", "flex-direction", "flex-wrap", "justify-content", 4, "ngIf"], [1, "legend", 3, "innerHTML", "click"], [3, "dataIndex", "layout", "layoutIndex", "isFlexItem", "isOrderable"], [3, "disabled"], [4, "ngIf"], ["class", "help-block", 3, "class", "innerHTML", 4, "ngIf"], [1, "help-block", 3, "innerHTML"]], template: function SectionComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, SectionComponent_div_0_Template, 3, 8, "div", 0);
        i0.ɵɵtemplate(1, SectionComponent_fieldset_1_Template, 5, 11, "fieldset", 1);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.containerType === "div");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.containerType === "fieldset");
    } }, dependencies: [i2.NgIf, RootComponent], styles: [".legend[_ngcontent-%COMP%]{font-weight:700}.expandable[_ngcontent-%COMP%] > legend[_ngcontent-%COMP%]:before, .expandable[_ngcontent-%COMP%] > label[_ngcontent-%COMP%]:before{content:\"\\25b6\";padding-right:.3em}.expanded[_ngcontent-%COMP%] > legend[_ngcontent-%COMP%]:before, .expanded[_ngcontent-%COMP%] > label[_ngcontent-%COMP%]:before{content:\"\\25bc\";padding-right:.2em}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SectionComponent, [{
        type: Component,
        args: [{ selector: 'section-widget', template: `
      <div *ngIf="containerType === 'div'"
           [class]="options?.htmlClass || ''"
           [class.expandable]="options?.expandable && !expanded"
           [class.expanded]="options?.expandable && expanded">
          <label *ngIf="sectionTitle"
                 class="legend"
                 [class]="options?.labelHtmlClass || ''"
                 [innerHTML]="sectionTitle"
                 (click)="toggleExpanded()"></label>
          <root-widget *ngIf="expanded"
                       [dataIndex]="dataIndex"
                       [layout]="layoutNode.items"
                       [layoutIndex]="layoutIndex"
                       [isFlexItem]="getFlexAttribute('is-flex')"
                       [isOrderable]="options?.orderable"
                       [class.form-flex-column]="getFlexAttribute('flex-direction') === 'column'"
                       [class.form-flex-row]="getFlexAttribute('flex-direction') === 'row'"
                       [style.align-content]="getFlexAttribute('align-content')"
                       [style.align-items]="getFlexAttribute('align-items')"
                       [style.display]="getFlexAttribute('display')"
                       [style.flex-direction]="getFlexAttribute('flex-direction')"
                       [style.flex-wrap]="getFlexAttribute('flex-wrap')"
                       [style.justify-content]="getFlexAttribute('justify-content')"></root-widget>
      </div>
      <fieldset *ngIf="containerType === 'fieldset'"
                [class]="options?.htmlClass || ''"
                [class.expandable]="options?.expandable && !expanded"
                [class.expanded]="options?.expandable && expanded"
                [disabled]="options?.readonly">
          <legend *ngIf="sectionTitle"
                  class="legend"
                  [class]="options?.labelHtmlClass || ''"
                  [innerHTML]="sectionTitle"
                  (click)="toggleExpanded()"></legend>
          <div *ngIf="options?.messageLocation !== 'bottom'">
              <p *ngIf="options?.description"
                 class="help-block"
                 [class]="options?.labelHelpBlockClass || ''"
                 [innerHTML]="options?.description"></p>
          </div>
          <root-widget *ngIf="expanded"
                       [dataIndex]="dataIndex"
                       [layout]="layoutNode.items"
                       [layoutIndex]="layoutIndex"
                       [isFlexItem]="getFlexAttribute('is-flex')"
                       [isOrderable]="options?.orderable"
                       [class.form-flex-column]="getFlexAttribute('flex-direction') === 'column'"
                       [class.form-flex-row]="getFlexAttribute('flex-direction') === 'row'"
                       [style.align-content]="getFlexAttribute('align-content')"
                       [style.align-items]="getFlexAttribute('align-items')"
                       [style.display]="getFlexAttribute('display')"
                       [style.flex-direction]="getFlexAttribute('flex-direction')"
                       [style.flex-wrap]="getFlexAttribute('flex-wrap')"
                       [style.justify-content]="getFlexAttribute('justify-content')"></root-widget>
          <div *ngIf="options?.messageLocation === 'bottom'">
              <p *ngIf="options?.description"
                 class="help-block"
                 [class]="options?.labelHelpBlockClass || ''"
                 [innerHTML]="options?.description"></p>
          </div>
      </fieldset>`, styles: [".legend{font-weight:700}.expandable>legend:before,.expandable>label:before{content:\"\\25b6\";padding-right:.3em}.expanded>legend:before,.expanded>label:before{content:\"\\25bc\";padding-right:.2em}\n"] }]
    }], function () { return [{ type: JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();

function SelectComponent_label_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "label", 3);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r0.options == null ? null : ctx_r0.options.labelHtmlClass) || "");
    i0.ɵɵstyleProp("display", (ctx_r0.options == null ? null : ctx_r0.options.notitle) ? "none" : "");
    i0.ɵɵproperty("innerHTML", ctx_r0.options == null ? null : ctx_r0.options.title, i0.ɵɵsanitizeHtml);
    i0.ɵɵattribute("for", "control" + (ctx_r0.layoutNode == null ? null : ctx_r0.layoutNode._id));
} }
function SelectComponent_select_2_ng_template_1_option_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 8);
    i0.ɵɵelement(1, "span", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const selectItem_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("value", selectItem_r4 == null ? null : selectItem_r4.value);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", selectItem_r4 == null ? null : selectItem_r4.name, i0.ɵɵsanitizeHtml);
} }
function SelectComponent_select_2_ng_template_1_optgroup_1_option_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 8);
    i0.ɵɵelement(1, "span", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const subItem_r9 = ctx.$implicit;
    i0.ɵɵproperty("value", subItem_r9 == null ? null : subItem_r9.value);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", subItem_r9 == null ? null : subItem_r9.name, i0.ɵɵsanitizeHtml);
} }
function SelectComponent_select_2_ng_template_1_optgroup_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "optgroup", 9);
    i0.ɵɵtemplate(1, SelectComponent_select_2_ng_template_1_optgroup_1_option_1_Template, 2, 2, "option", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const selectItem_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("label", selectItem_r4 == null ? null : selectItem_r4.group);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", selectItem_r4.items);
} }
function SelectComponent_select_2_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, SelectComponent_select_2_ng_template_1_option_0_Template, 2, 2, "option", 6);
    i0.ɵɵtemplate(1, SelectComponent_select_2_ng_template_1_optgroup_1_Template, 2, 2, "optgroup", 7);
} if (rf & 2) {
    const selectItem_r4 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngIf", !ctx_r3.isArray(selectItem_r4 == null ? null : selectItem_r4.items));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.isArray(selectItem_r4 == null ? null : selectItem_r4.items));
} }
function SelectComponent_select_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "select", 4);
    i0.ɵɵtemplate(1, SelectComponent_select_2_ng_template_1_Template, 2, 2, "ng-template", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r1.options == null ? null : ctx_r1.options.fieldHtmlClass) || "");
    i0.ɵɵproperty("formControl", ctx_r1.formControl)("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id))("name", ctx_r1.controlName);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Status")("readonly", (ctx_r1.options == null ? null : ctx_r1.options.readonly) ? "readonly" : null)("required", ctx_r1.options == null ? null : ctx_r1.options.required);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.selectList);
} }
function SelectComponent_select_3_ng_template_1_option_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 13);
    i0.ɵɵelement(1, "span", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const selectItem_r12 = i0.ɵɵnextContext().$implicit;
    const ctx_r13 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("selected", (selectItem_r12 == null ? null : selectItem_r12.value) === ctx_r13.controlValue)("value", selectItem_r12 == null ? null : selectItem_r12.value);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", selectItem_r12 == null ? null : selectItem_r12.name, i0.ɵɵsanitizeHtml);
} }
function SelectComponent_select_3_ng_template_1_optgroup_1_option_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 8);
    i0.ɵɵelement(1, "span", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const subItem_r17 = ctx.$implicit;
    const ctx_r16 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("value", subItem_r17 == null ? null : subItem_r17.value);
    i0.ɵɵattribute("selected", (subItem_r17 == null ? null : subItem_r17.value) === ctx_r16.controlValue);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", subItem_r17 == null ? null : subItem_r17.name, i0.ɵɵsanitizeHtml);
} }
function SelectComponent_select_3_ng_template_1_optgroup_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "optgroup", 9);
    i0.ɵɵtemplate(1, SelectComponent_select_3_ng_template_1_optgroup_1_option_1_Template, 2, 3, "option", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const selectItem_r12 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("label", selectItem_r12 == null ? null : selectItem_r12.group);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", selectItem_r12.items);
} }
function SelectComponent_select_3_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, SelectComponent_select_3_ng_template_1_option_0_Template, 2, 3, "option", 12);
    i0.ɵɵtemplate(1, SelectComponent_select_3_ng_template_1_optgroup_1_Template, 2, 2, "optgroup", 7);
} if (rf & 2) {
    const selectItem_r12 = ctx.$implicit;
    const ctx_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngIf", !ctx_r11.isArray(selectItem_r12 == null ? null : selectItem_r12.items));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r11.isArray(selectItem_r12 == null ? null : selectItem_r12.items));
} }
function SelectComponent_select_3_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "select", 11);
    i0.ɵɵlistener("change", function SelectComponent_select_3_Template_select_change_0_listener($event) { i0.ɵɵrestoreView(_r20); const ctx_r19 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r19.updateValue($event)); });
    i0.ɵɵtemplate(1, SelectComponent_select_3_ng_template_1_Template, 2, 2, "ng-template", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r2.options == null ? null : ctx_r2.options.fieldHtmlClass) || "");
    i0.ɵɵproperty("disabled", ctx_r2.controlDisabled)("id", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id))("name", ctx_r2.controlName);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Status")("readonly", (ctx_r2.options == null ? null : ctx_r2.options.readonly) ? "readonly" : null)("required", ctx_r2.options == null ? null : ctx_r2.options.required);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.selectList);
} }
class SelectComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.selectList = [];
        this.isArray = isArray;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.selectList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, !!this.options.required, !!this.options.flatList);
        this.jsf.initializeControl(this);
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
}
SelectComponent.ɵfac = function SelectComponent_Factory(t) { return new (t || SelectComponent)(i0.ɵɵdirectiveInject(JsonSchemaFormService)); };
SelectComponent.ɵcmp = i0.ɵɵdefineComponent({ type: SelectComponent, selectors: [["select-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 4, vars: 5, consts: [[3, "class", "display", "innerHTML", 4, "ngIf"], [3, "formControl", "class", "id", "name", 4, "ngIf"], [3, "class", "disabled", "id", "name", "change", 4, "ngIf"], [3, "innerHTML"], [3, "formControl", "id", "name"], ["ngFor", "", 3, "ngForOf"], [3, "value", 4, "ngIf"], [3, "label", 4, "ngIf"], [3, "value"], [3, "label"], [3, "value", 4, "ngFor", "ngForOf"], [3, "disabled", "id", "name", "change"], [3, "selected", "value", 4, "ngIf"], [3, "selected", "value"]], template: function SelectComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div");
        i0.ɵɵtemplate(1, SelectComponent_label_1_Template, 1, 6, "label", 0);
        i0.ɵɵtemplate(2, SelectComponent_select_2_Template, 2, 9, "select", 1);
        i0.ɵɵtemplate(3, SelectComponent_select_3_Template, 2, 9, "select", 2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.htmlClass) || "");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.title);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.boundControl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.boundControl);
    } }, dependencies: [i2.NgForOf, i2.NgIf, i3.NgSelectOption, i3.ɵNgSelectMultipleOption, i3.SelectControlValueAccessor, i3.NgControlStatus, i3.RequiredValidator, i3.FormControlDirective], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SelectComponent, [{
        type: Component,
        args: [{
                selector: 'select-widget',
                template: `
    <div
      [class]="options?.htmlClass || ''">
      <label *ngIf="options?.title"
        [attr.for]="'control' + layoutNode?._id"
        [class]="options?.labelHtmlClass || ''"
        [style.display]="options?.notitle ? 'none' : ''"
        [innerHTML]="options?.title"></label>
      <select *ngIf="boundControl"
        [formControl]="formControl"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.required]="options?.required"
        [class]="options?.fieldHtmlClass || ''"
        [id]="'control' + layoutNode?._id"
        [name]="controlName">
        <ng-template ngFor let-selectItem [ngForOf]="selectList">
          <option *ngIf="!isArray(selectItem?.items)"
            [value]="selectItem?.value">
            <span [innerHTML]="selectItem?.name"></span>
          </option>
          <optgroup *ngIf="isArray(selectItem?.items)"
            [label]="selectItem?.group">
            <option *ngFor="let subItem of selectItem.items"
              [value]="subItem?.value">
              <span [innerHTML]="subItem?.name"></span>
            </option>
          </optgroup>
        </ng-template>
      </select>
      <select *ngIf="!boundControl"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.required]="options?.required"
        [class]="options?.fieldHtmlClass || ''"
        [disabled]="controlDisabled"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        (change)="updateValue($event)">
        <ng-template ngFor let-selectItem [ngForOf]="selectList">
          <option *ngIf="!isArray(selectItem?.items)"
            [selected]="selectItem?.value === controlValue"
            [value]="selectItem?.value">
            <span [innerHTML]="selectItem?.name"></span>
          </option>
          <optgroup *ngIf="isArray(selectItem?.items)"
            [label]="selectItem?.group">
            <option *ngFor="let subItem of selectItem.items"
              [attr.selected]="subItem?.value === controlValue"
              [value]="subItem?.value">
              <span [innerHTML]="subItem?.name"></span>
            </option>
          </optgroup>
        </ng-template>
      </select>
    </div>`,
            }]
    }], function () { return [{ type: JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();

const _c0$2 = ["widgetContainer"];
class SelectWidgetComponent {
    constructor(componentFactory, jsf) {
        this.componentFactory = componentFactory;
        this.jsf = jsf;
        this.newComponent = null;
    }
    ngOnInit() {
        this.updateComponent();
    }
    ngOnChanges() {
        this.updateComponent();
    }
    updateComponent() {
        if (!this.newComponent && (this.layoutNode || {}).widget) {
            this.newComponent = this.widgetContainer.createComponent(this.componentFactory.resolveComponentFactory(this.layoutNode.widget));
        }
        if (this.newComponent) {
            for (const input of ['layoutNode', 'layoutIndex', 'dataIndex']) {
                this.newComponent.instance[input] = this[input];
            }
        }
    }
}
SelectWidgetComponent.ɵfac = function SelectWidgetComponent_Factory(t) { return new (t || SelectWidgetComponent)(i0.ɵɵdirectiveInject(i0.ComponentFactoryResolver), i0.ɵɵdirectiveInject(JsonSchemaFormService)); };
SelectWidgetComponent.ɵcmp = i0.ɵɵdefineComponent({ type: SelectWidgetComponent, selectors: [["select-widget-widget"]], viewQuery: function SelectWidgetComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0$2, 7, ViewContainerRef);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.widgetContainer = _t.first);
    } }, inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, features: [i0.ɵɵNgOnChangesFeature], decls: 2, vars: 0, consts: [["widgetContainer", ""]], template: function SelectWidgetComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "div", null, 0);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SelectWidgetComponent, [{
        type: Component,
        args: [{
                selector: 'select-widget-widget',
                template: `<div #widgetContainer></div>`,
            }]
    }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }], widgetContainer: [{
            type: ViewChild,
            args: ['widgetContainer', { read: ViewContainerRef, static: true }]
        }] }); })();

class SubmitComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (hasOwn(this.options, 'disabled')) {
            this.controlDisabled = this.options.disabled;
        }
        else if (this.jsf.formOptions.disableInvalidSubmit) {
            this.controlDisabled = !this.jsf.isValid;
            this.jsf.isValidChanges.subscribe(isValid => this.controlDisabled = !isValid);
        }
        if (this.controlValue === null || this.controlValue === undefined) {
            this.controlValue = this.options.title;
        }
    }
    updateValue(event) {
        if (typeof this.options.onClick === 'function') {
            this.options.onClick(event);
        }
        else {
            this.jsf.updateValue(this, event.target.value);
        }
    }
}
SubmitComponent.ɵfac = function SubmitComponent_Factory(t) { return new (t || SubmitComponent)(i0.ɵɵdirectiveInject(JsonSchemaFormService)); };
SubmitComponent.ɵcmp = i0.ɵɵdefineComponent({ type: SubmitComponent, selectors: [["submit-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 2, vars: 12, consts: [[3, "disabled", "id", "name", "type", "value", "click"]], template: function SubmitComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div")(1, "input", 0);
        i0.ɵɵlistener("click", function SubmitComponent_Template_input_click_1_listener($event) { return ctx.updateValue($event); });
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.htmlClass) || "");
        i0.ɵɵadvance(1);
        i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.fieldHtmlClass) || "");
        i0.ɵɵproperty("disabled", ctx.controlDisabled)("id", "control" + (ctx.layoutNode == null ? null : ctx.layoutNode._id))("name", ctx.controlName)("type", ctx.layoutNode == null ? null : ctx.layoutNode.type)("value", ctx.controlValue);
        i0.ɵɵattribute("aria-describedby", "control" + (ctx.layoutNode == null ? null : ctx.layoutNode._id) + "Status")("readonly", (ctx.options == null ? null : ctx.options.readonly) ? "readonly" : null)("required", ctx.options == null ? null : ctx.options.required);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SubmitComponent, [{
        type: Component,
        args: [{
                selector: 'submit-widget',
                template: `
    <div
      [class]="options?.htmlClass || ''">
      <input
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.required]="options?.required"
        [class]="options?.fieldHtmlClass || ''"
        [disabled]="controlDisabled"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [type]="layoutNode?.type"
        [value]="controlValue"
        (click)="updateValue($event)">
    </div>`,
            }]
    }], function () { return [{ type: JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();

function TabsComponent_li_1_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 4);
    i0.ɵɵlistener("click", function TabsComponent_li_1_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r7); const i_r3 = i0.ɵɵnextContext().index; const ctx_r5 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r5.select(i_r3)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    const i_r3 = ctx_r8.index;
    const item_r2 = ctx_r8.$implicit;
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵclassMap("nav-link" + (ctx_r4.selectedItem === i_r3 ? " " + (ctx_r4.options == null ? null : ctx_r4.options.activeClass) + " " + (ctx_r4.options == null ? null : ctx_r4.options.style == null ? null : ctx_r4.options.style.selected) : " " + (ctx_r4.options == null ? null : ctx_r4.options.style == null ? null : ctx_r4.options.style.unselected)));
    i0.ɵɵproperty("innerHTML", ctx_r4.setTabTitle(item_r2, i_r3), i0.ɵɵsanitizeHtml);
} }
function TabsComponent_li_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 2);
    i0.ɵɵtemplate(1, TabsComponent_li_1_a_1_Template, 1, 3, "a", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap(((ctx_r0.options == null ? null : ctx_r0.options.itemLabelHtmlClass) || "") + (ctx_r0.selectedItem === i_r3 ? " " + ((ctx_r0.options == null ? null : ctx_r0.options.activeClass) || "") + " " + ((ctx_r0.options == null ? null : ctx_r0.options.style == null ? null : ctx_r0.options.style.selected) || "") : " " + (ctx_r0.options == null ? null : ctx_r0.options.style == null ? null : ctx_r0.options.style.unselected)));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.showAddTab || item_r2.type !== "$ref");
} }
const _c0$1 = function () { return []; };
function TabsComponent_div_2_select_framework_widget_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "select-framework-widget", 6);
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext();
    const i_r10 = ctx_r12.index;
    const layoutItem_r9 = ctx_r12.$implicit;
    const ctx_r11 = i0.ɵɵnextContext();
    i0.ɵɵclassMap(((ctx_r11.options == null ? null : ctx_r11.options.fieldHtmlClass) || "") + " " + ((ctx_r11.options == null ? null : ctx_r11.options.activeClass) || "") + " " + ((ctx_r11.options == null ? null : ctx_r11.options.style == null ? null : ctx_r11.options.style.selected) || ""));
    i0.ɵɵproperty("dataIndex", (ctx_r11.layoutNode == null ? null : ctx_r11.layoutNode.dataType) === "array" ? (ctx_r11.dataIndex || i0.ɵɵpureFunction0(5, _c0$1)).concat(i_r10) : ctx_r11.dataIndex)("layoutIndex", (ctx_r11.layoutIndex || i0.ɵɵpureFunction0(6, _c0$1)).concat(i_r10))("layoutNode", layoutItem_r9);
} }
function TabsComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, TabsComponent_div_2_select_framework_widget_1_Template, 1, 7, "select-framework-widget", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r10 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r1.options == null ? null : ctx_r1.options.htmlClass) || "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.selectedItem === i_r10);
} }
class TabsComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.selectedItem = 0;
        this.showAddTab = true;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.itemCount = this.layoutNode.items.length - 1;
        this.updateControl();
    }
    select(index) {
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
    }
    updateControl() {
        const lastItem = this.layoutNode.items[this.layoutNode.items.length - 1];
        if (lastItem.type === '$ref' &&
            this.itemCount >= (lastItem.options.maxItems || 1000)) {
            this.showAddTab = false;
        }
    }
    setTabTitle(item, index) {
        return this.jsf.setArrayItemTitle(this, item, index);
    }
}
TabsComponent.ɵfac = function TabsComponent_Factory(t) { return new (t || TabsComponent)(i0.ɵɵdirectiveInject(JsonSchemaFormService)); };
TabsComponent.ɵcmp = i0.ɵɵdefineComponent({ type: TabsComponent, selectors: [["tabs-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 3, vars: 4, consts: [["role", "presentation", "data-tabs", "", 3, "class", 4, "ngFor", "ngForOf"], [3, "class", 4, "ngFor", "ngForOf"], ["role", "presentation", "data-tabs", ""], [3, "class", "innerHTML", "click", 4, "ngIf"], [3, "innerHTML", "click"], [3, "class", "dataIndex", "layoutIndex", "layoutNode", 4, "ngIf"], [3, "dataIndex", "layoutIndex", "layoutNode"]], template: function TabsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "ul");
        i0.ɵɵtemplate(1, TabsComponent_li_1_Template, 2, 3, "li", 0);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(2, TabsComponent_div_2_Template, 2, 3, "div", 1);
    } if (rf & 2) {
        i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.labelHtmlClass) || "");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.layoutNode == null ? null : ctx.layoutNode.items);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.layoutNode == null ? null : ctx.layoutNode.items);
    } }, dependencies: [i2.NgForOf, i2.NgIf, SelectFrameworkComponent], styles: ["a[_ngcontent-%COMP%]{cursor:pointer}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TabsComponent, [{
        type: Component,
        args: [{ selector: 'tabs-widget', template: `
    <ul
      [class]="options?.labelHtmlClass || ''">
      <li *ngFor="let item of layoutNode?.items; let i = index"
        [class]="(options?.itemLabelHtmlClass || '') + (selectedItem === i ?
          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :
          (' ' + options?.style?.unselected))"
        role="presentation"
        data-tabs>
        <a *ngIf="showAddTab || item.type !== '$ref'"
           [class]="'nav-link' + (selectedItem === i ? (' ' + options?.activeClass + ' ' + options?.style?.selected) :
            (' ' + options?.style?.unselected))"
          [innerHTML]="setTabTitle(item, i)"
          (click)="select(i)"></a>
      </li>
    </ul>

    <div *ngFor="let layoutItem of layoutNode?.items; let i = index"
      [class]="options?.htmlClass || ''">

      <select-framework-widget *ngIf="selectedItem === i"
        [class]="(options?.fieldHtmlClass || '') +
          ' ' + (options?.activeClass || '') +
          ' ' + (options?.style?.selected || '')"
        [dataIndex]="layoutNode?.dataType === 'array' ? (dataIndex || []).concat(i) : dataIndex"
        [layoutIndex]="(layoutIndex || []).concat(i)"
        [layoutNode]="layoutItem"></select-framework-widget>

    </div>`, styles: ["a{cursor:pointer}\n"] }]
    }], function () { return [{ type: JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();

const _c0 = ["widgetContainer"];
class TemplateComponent {
    constructor(componentFactory, jsf) {
        this.componentFactory = componentFactory;
        this.jsf = jsf;
        this.newComponent = null;
    }
    ngOnInit() {
        this.updateComponent();
    }
    ngOnChanges() {
        this.updateComponent();
    }
    updateComponent() {
        if (!this.newComponent && this.layoutNode.options.template) {
            this.newComponent = this.widgetContainer.createComponent(this.componentFactory.resolveComponentFactory(this.layoutNode.options.template));
        }
        if (this.newComponent) {
            for (const input of ['layoutNode', 'layoutIndex', 'dataIndex']) {
                this.newComponent.instance[input] = this[input];
            }
        }
    }
}
TemplateComponent.ɵfac = function TemplateComponent_Factory(t) { return new (t || TemplateComponent)(i0.ɵɵdirectiveInject(i0.ComponentFactoryResolver), i0.ɵɵdirectiveInject(JsonSchemaFormService)); };
TemplateComponent.ɵcmp = i0.ɵɵdefineComponent({ type: TemplateComponent, selectors: [["template-widget"]], viewQuery: function TemplateComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 7, ViewContainerRef);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.widgetContainer = _t.first);
    } }, inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, features: [i0.ɵɵNgOnChangesFeature], decls: 2, vars: 0, consts: [["widgetContainer", ""]], template: function TemplateComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "div", null, 0);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TemplateComponent, [{
        type: Component,
        args: [{
                selector: 'template-widget',
                template: `<div #widgetContainer></div>`,
            }]
    }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }], widgetContainer: [{
            type: ViewChild,
            args: ['widgetContainer', { read: ViewContainerRef, static: true }]
        }] }); })();

function TextareaComponent_label_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "label", 3);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r0.options == null ? null : ctx_r0.options.labelHtmlClass) || "");
    i0.ɵɵstyleProp("display", (ctx_r0.options == null ? null : ctx_r0.options.notitle) ? "none" : "");
    i0.ɵɵproperty("innerHTML", ctx_r0.options == null ? null : ctx_r0.options.title, i0.ɵɵsanitizeHtml);
    i0.ɵɵattribute("for", "control" + (ctx_r0.layoutNode == null ? null : ctx_r0.layoutNode._id));
} }
function TextareaComponent_textarea_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "textarea", 4);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r1.options == null ? null : ctx_r1.options.fieldHtmlClass) || "");
    i0.ɵɵproperty("formControl", ctx_r1.formControl)("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id))("name", ctx_r1.controlName);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id) + "Status")("maxlength", ctx_r1.options == null ? null : ctx_r1.options.maxLength)("minlength", ctx_r1.options == null ? null : ctx_r1.options.minLength)("pattern", ctx_r1.options == null ? null : ctx_r1.options.pattern)("placeholder", ctx_r1.options == null ? null : ctx_r1.options.placeholder)("readonly", (ctx_r1.options == null ? null : ctx_r1.options.readonly) ? "readonly" : null)("required", ctx_r1.options == null ? null : ctx_r1.options.required);
} }
function TextareaComponent_textarea_3_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "textarea", 5);
    i0.ɵɵlistener("input", function TextareaComponent_textarea_3_Template_textarea_input_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.updateValue($event)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r2.options == null ? null : ctx_r2.options.fieldHtmlClass) || "");
    i0.ɵɵproperty("disabled", ctx_r2.controlDisabled)("id", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id))("name", ctx_r2.controlName)("value", ctx_r2.controlValue);
    i0.ɵɵattribute("aria-describedby", "control" + (ctx_r2.layoutNode == null ? null : ctx_r2.layoutNode._id) + "Status")("maxlength", ctx_r2.options == null ? null : ctx_r2.options.maxLength)("minlength", ctx_r2.options == null ? null : ctx_r2.options.minLength)("pattern", ctx_r2.options == null ? null : ctx_r2.options.pattern)("placeholder", ctx_r2.options == null ? null : ctx_r2.options.placeholder)("readonly", (ctx_r2.options == null ? null : ctx_r2.options.readonly) ? "readonly" : null)("required", ctx_r2.options == null ? null : ctx_r2.options.required);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r2.controlValue);
} }
class TextareaComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
}
TextareaComponent.ɵfac = function TextareaComponent_Factory(t) { return new (t || TextareaComponent)(i0.ɵɵdirectiveInject(JsonSchemaFormService)); };
TextareaComponent.ɵcmp = i0.ɵɵdefineComponent({ type: TextareaComponent, selectors: [["textarea-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 4, vars: 5, consts: [[3, "class", "display", "innerHTML", 4, "ngIf"], [3, "formControl", "class", "id", "name", 4, "ngIf"], [3, "class", "disabled", "id", "name", "value", "input", 4, "ngIf"], [3, "innerHTML"], [3, "formControl", "id", "name"], [3, "disabled", "id", "name", "value", "input"]], template: function TextareaComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div");
        i0.ɵɵtemplate(1, TextareaComponent_label_1_Template, 1, 6, "label", 0);
        i0.ɵɵtemplate(2, TextareaComponent_textarea_2_Template, 1, 12, "textarea", 1);
        i0.ɵɵtemplate(3, TextareaComponent_textarea_3_Template, 2, 14, "textarea", 2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.htmlClass) || "");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.title);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.boundControl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.boundControl);
    } }, dependencies: [i2.NgIf, i3.DefaultValueAccessor, i3.NgControlStatus, i3.RequiredValidator, i3.MinLengthValidator, i3.MaxLengthValidator, i3.PatternValidator, i3.FormControlDirective], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TextareaComponent, [{
        type: Component,
        args: [{
                selector: 'textarea-widget',
                template: `
    <div
      [class]="options?.htmlClass || ''">
      <label *ngIf="options?.title"
        [attr.for]="'control' + layoutNode?._id"
        [class]="options?.labelHtmlClass || ''"
        [style.display]="options?.notitle ? 'none' : ''"
        [innerHTML]="options?.title"></label>
      <textarea *ngIf="boundControl"
        [formControl]="formControl"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.maxlength]="options?.maxLength"
        [attr.minlength]="options?.minLength"
        [attr.pattern]="options?.pattern"
        [attr.placeholder]="options?.placeholder"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.required]="options?.required"
        [class]="options?.fieldHtmlClass || ''"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"></textarea>
      <textarea *ngIf="!boundControl"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.maxlength]="options?.maxLength"
        [attr.minlength]="options?.minLength"
        [attr.pattern]="options?.pattern"
        [attr.placeholder]="options?.placeholder"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.required]="options?.required"
        [class]="options?.fieldHtmlClass || ''"
        [disabled]="controlDisabled"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [value]="controlValue"
        (input)="updateValue($event)">{{controlValue}}</textarea>
    </div>`,
            }]
    }], function () { return [{ type: JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();

class WidgetLibraryService {
    constructor() {
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
    setActiveWidgets() {
        this.activeWidgets = Object.assign({}, this.widgetLibrary, this.frameworkWidgets, this.registeredWidgets);
        for (const widgetName of Object.keys(this.activeWidgets)) {
            let widget = this.activeWidgets[widgetName];
            if (typeof widget === 'string') {
                const usedAliases = [];
                while (typeof widget === 'string' && !usedAliases.includes(widget)) {
                    usedAliases.push(widget);
                    widget = this.activeWidgets[widget];
                }
                if (typeof widget !== 'string') {
                    this.activeWidgets[widgetName] = widget;
                }
            }
        }
        return true;
    }
    setDefaultWidget(type) {
        if (!this.hasWidget(type)) {
            return false;
        }
        this.defaultWidget = type;
        return true;
    }
    hasWidget(type, widgetSet = 'activeWidgets') {
        if (!type || typeof type !== 'string') {
            return false;
        }
        return hasOwn(this[widgetSet], type);
    }
    hasDefaultWidget(type) {
        return this.hasWidget(type, 'widgetLibrary');
    }
    registerWidget(type, widget) {
        if (!type || !widget || typeof type !== 'string') {
            return false;
        }
        this.registeredWidgets[type] = widget;
        return this.setActiveWidgets();
    }
    unRegisterWidget(type) {
        if (!hasOwn(this.registeredWidgets, type)) {
            return false;
        }
        delete this.registeredWidgets[type];
        return this.setActiveWidgets();
    }
    unRegisterAllWidgets(unRegisterFrameworkWidgets = true) {
        this.registeredWidgets = {};
        if (unRegisterFrameworkWidgets) {
            this.frameworkWidgets = {};
        }
        return this.setActiveWidgets();
    }
    registerFrameworkWidgets(widgets) {
        if (widgets === null || typeof widgets !== 'object') {
            widgets = {};
        }
        this.frameworkWidgets = widgets;
        return this.setActiveWidgets();
    }
    unRegisterFrameworkWidgets() {
        if (Object.keys(this.frameworkWidgets).length) {
            this.frameworkWidgets = {};
            return this.setActiveWidgets();
        }
        return false;
    }
    getWidget(type, widgetSet = 'activeWidgets') {
        if (this.hasWidget(type, widgetSet)) {
            return this[widgetSet][type];
        }
        else if (this.hasWidget(this.defaultWidget, widgetSet)) {
            return this[widgetSet][this.defaultWidget];
        }
        else {
            return null;
        }
    }
    getAllWidgets() {
        return {
            widgetLibrary: this.widgetLibrary,
            registeredWidgets: this.registeredWidgets,
            frameworkWidgets: this.frameworkWidgets,
            activeWidgets: this.activeWidgets,
        };
    }
}
WidgetLibraryService.ɵfac = function WidgetLibraryService_Factory(t) { return new (t || WidgetLibraryService)(); };
WidgetLibraryService.ɵprov = i0.ɵɵdefineInjectable({ token: WidgetLibraryService, factory: WidgetLibraryService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WidgetLibraryService, [{
        type: Injectable
    }], function () { return []; }, null); })();

class FrameworkLibraryService {
    constructor(frameworks, widgetLibrary) {
        this.frameworks = frameworks;
        this.widgetLibrary = widgetLibrary;
        this.activeFramework = null;
        this.loadExternalAssets = false;
        this.frameworkLibrary = {};
        this.frameworks.forEach(framework => this.frameworkLibrary[framework.name] = framework);
        this.defaultFramework = this.frameworks[0].name;
        this.setFramework(this.defaultFramework);
    }
    setLoadExternalAssets(loadExternalAssets = true) {
        this.loadExternalAssets = !!loadExternalAssets;
    }
    setFramework(framework = this.defaultFramework, loadExternalAssets = this.loadExternalAssets) {
        this.activeFramework =
            typeof framework === 'string' && this.hasFramework(framework) ?
                this.frameworkLibrary[framework] :
                typeof framework === 'object' && hasOwn(framework, 'framework') ?
                    framework :
                    this.frameworkLibrary[this.defaultFramework];
        return this.registerFrameworkWidgets(this.activeFramework);
    }
    registerFrameworkWidgets(framework) {
        return hasOwn(framework, 'widgets') ?
            this.widgetLibrary.registerFrameworkWidgets(framework.widgets) :
            this.widgetLibrary.unRegisterFrameworkWidgets();
    }
    hasFramework(type) {
        return hasOwn(this.frameworkLibrary, type);
    }
    getFramework() {
        if (!this.activeFramework) {
            this.setFramework('default', true);
        }
        return this.activeFramework.framework;
    }
    getFrameworkWidgets() {
        return this.activeFramework.widgets || {};
    }
    getFrameworkStylesheets(load = this.loadExternalAssets) {
        return (load && this.activeFramework.stylesheets) || [];
    }
    getFrameworkScripts(load = this.loadExternalAssets) {
        return (load && this.activeFramework.scripts) || [];
    }
}
FrameworkLibraryService.ɵfac = function FrameworkLibraryService_Factory(t) { return new (t || FrameworkLibraryService)(i0.ɵɵinject(Framework), i0.ɵɵinject(WidgetLibraryService)); };
FrameworkLibraryService.ɵprov = i0.ɵɵdefineInjectable({ token: FrameworkLibraryService, factory: FrameworkLibraryService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FrameworkLibraryService, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [Framework]
            }] }, { type: WidgetLibraryService, decorators: [{
                type: Inject,
                args: [WidgetLibraryService]
            }] }]; }, null); })();

function HiddenComponent_input_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formControl", ctx_r0.formControl)("id", "control" + (ctx_r0.layoutNode == null ? null : ctx_r0.layoutNode._id))("name", ctx_r0.controlName);
} }
function HiddenComponent_input_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 3);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r1.controlDisabled)("name", ctx_r1.controlName)("id", "control" + (ctx_r1.layoutNode == null ? null : ctx_r1.layoutNode._id))("value", ctx_r1.controlValue);
} }
class HiddenComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    ngOnInit() {
        this.jsf.initializeControl(this);
    }
}
HiddenComponent.ɵfac = function HiddenComponent_Factory(t) { return new (t || HiddenComponent)(i0.ɵɵdirectiveInject(JsonSchemaFormService)); };
HiddenComponent.ɵcmp = i0.ɵɵdefineComponent({ type: HiddenComponent, selectors: [["hidden-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 2, vars: 2, consts: [["type", "hidden", 3, "formControl", "id", "name", 4, "ngIf"], ["type", "hidden", 3, "disabled", "name", "id", "value", 4, "ngIf"], ["type", "hidden", 3, "formControl", "id", "name"], ["type", "hidden", 3, "disabled", "name", "id", "value"]], template: function HiddenComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, HiddenComponent_input_0_Template, 1, 3, "input", 0);
        i0.ɵɵtemplate(1, HiddenComponent_input_1_Template, 1, 4, "input", 1);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.boundControl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.boundControl);
    } }, dependencies: [i2.NgIf, i3.DefaultValueAccessor, i3.NgControlStatus, i3.FormControlDirective], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HiddenComponent, [{
        type: Component,
        args: [{
                selector: 'hidden-widget',
                template: `
    <input *ngIf="boundControl"
      [formControl]="formControl"
      [id]="'control' + layoutNode?._id"
      [name]="controlName"
      type="hidden">
    <input *ngIf="!boundControl"
      [disabled]="controlDisabled"
      [name]="controlName"
      [id]="'control' + layoutNode?._id"
      type="hidden"
      [value]="controlValue">`,
            }]
    }], function () { return [{ type: JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();

class TabComponent {
    constructor(jsf) {
        this.jsf = jsf;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
    }
}
TabComponent.ɵfac = function TabComponent_Factory(t) { return new (t || TabComponent)(i0.ɵɵdirectiveInject(JsonSchemaFormService)); };
TabComponent.ɵcmp = i0.ɵɵdefineComponent({ type: TabComponent, selectors: [["tab-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 2, vars: 5, consts: [[3, "dataIndex", "layoutIndex", "layout"]], template: function TabComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div");
        i0.ɵɵelement(1, "root-widget", 0);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵclassMap((ctx.options == null ? null : ctx.options.htmlClass) || "");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("dataIndex", ctx.dataIndex)("layoutIndex", ctx.layoutIndex)("layout", ctx.layoutNode.items);
    } }, dependencies: [RootComponent], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TabComponent, [{
        type: Component,
        args: [{
                selector: 'tab-widget',
                template: `
    <div [class]="options?.htmlClass || ''">
      <root-widget
        [dataIndex]="dataIndex"
        [layoutIndex]="layoutIndex"
        [layout]="layoutNode.items"></root-widget>
    </div>`,
            }]
    }], function () { return [{ type: JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();

class WidgetLibraryModule {
    static forRoot() {
        return {
            ngModule: WidgetLibraryModule,
            providers: [JsonSchemaFormService],
        };
    }
}
WidgetLibraryModule.ɵfac = function WidgetLibraryModule_Factory(t) { return new (t || WidgetLibraryModule)(); };
WidgetLibraryModule.ɵmod = i0.ɵɵdefineNgModule({ type: WidgetLibraryModule });
WidgetLibraryModule.ɵinj = i0.ɵɵdefineInjector({ providers: [JsonSchemaFormService], imports: [CommonModule, FormsModule, ReactiveFormsModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WidgetLibraryModule, [{
        type: NgModule,
        args: [{
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
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(WidgetLibraryModule, { declarations: [AddReferenceComponent,
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
        OrderableDirective], imports: [CommonModule, FormsModule, ReactiveFormsModule], exports: [AddReferenceComponent,
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
        OrderableDirective] }); })();

export { AddReferenceComponent, ButtonComponent, CheckboxComponent, CheckboxesComponent, FileComponent, FrameworkLibraryService, HiddenComponent, InputComponent, JsonSchemaFormService, MessageComponent, NoneComponent, NumberComponent, OneOfComponent, OrderableDirective, RadiosComponent, RootComponent, SectionComponent, SelectComponent, SelectFrameworkComponent, SelectWidgetComponent, SubmitComponent, TabComponent, TabsComponent, TemplateComponent, TextareaComponent, WidgetLibraryModule, WidgetLibraryService, buildTitleMap };
//# sourceMappingURL=ngsf-widget-library.mjs.map
//# sourceMappingURL=ngsf-widget-library.mjs.map
