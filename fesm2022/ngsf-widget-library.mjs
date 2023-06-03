import * as i0 from '@angular/core';
import { Injectable, Directive, Input, Component, ChangeDetectionStrategy, ViewContainerRef, ViewChild, Inject, NgModule } from '@angular/core';
import { Subject } from 'rxjs-compat/Subject';
import * as draft6 from 'ajv/lib/refs/json-schema-draft-06.json';
import Ajv from 'ajv';
import * as _ from 'lodash';
import addFormats from 'ajv-formats';
import { frValidationMessages, enValidationMessages, forEach, formatFormData, buildFormGroupTemplate, buildFormGroup, buildLayout, isObject, hasOwn, buildSchemaFromData, buildSchemaFromLayout, JsonPointer, isArray, toTitleCase, hasValue, isEmpty, getControl, removeRecursiveReferences, isDefined, getLayoutNode, fixTitle, isString, Framework } from '@ngsf/common';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: JsonSchemaFormService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

class OrderableDirective {
    elementRef;
    jsf;
    ngZone;
    arrayLayoutIndex;
    element;
    overParentElement = false;
    overChildElement = false;
    orderable;
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(elementRef, jsf, ngZone) {
        this.elementRef = elementRef;
        this.jsf = jsf;
        this.ngZone = ngZone;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: OrderableDirective, deps: [{ token: i0.ElementRef }, { token: JsonSchemaFormService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.3", type: OrderableDirective, selector: "[orderable]", inputs: { orderable: "orderable", layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: OrderableDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[orderable]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: JsonSchemaFormService }, { type: i0.NgZone }]; }, propDecorators: { orderable: [{
                type: Input
            }], layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] } });

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

class AddReferenceComponent {
    jsf;
    options;
    itemCount;
    previousLayoutIndex;
    previousDataIndex;
    layoutNode;
    layoutIndex;
    dataIndex;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: AddReferenceComponent, deps: [{ token: JsonSchemaFormService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: AddReferenceComponent, selector: "add-reference-widget", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, ngImport: i0, template: `
      <button *ngIf="showAddButton"
              [class]="options?.fieldHtmlClass || ''"
              [disabled]="options?.readonly"
              (click)="addItem($event)">
          <span *ngIf="options?.icon" [class]="options?.icon"></span>
          <span *ngIf="options?.title" [innerHTML]="buttonText"></span>
      </button>`, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.Default });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: AddReferenceComponent, decorators: [{
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
        }], ctorParameters: function () { return [{ type: JsonSchemaFormService }]; }, propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] } });

class OneOfComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    controlDisabled = false;
    boundControl = false;
    options;
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: OneOfComponent, deps: [{ token: JsonSchemaFormService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: OneOfComponent, selector: "one-of-widget", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, ngImport: i0, template: ``, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: OneOfComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'one-of-widget',
                    template: ``,
                }]
        }], ctorParameters: function () { return [{ type: JsonSchemaFormService }]; }, propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] } });

class ButtonComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    controlDisabled = false;
    boundControl = false;
    options;
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: ButtonComponent, deps: [{ token: JsonSchemaFormService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: ButtonComponent, selector: "button-widget", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, ngImport: i0, template: `
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
      </div>`, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: ButtonComponent, decorators: [{
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
        }], ctorParameters: function () { return [{ type: JsonSchemaFormService }]; }, propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] } });

class CheckboxComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    controlDisabled = false;
    boundControl = false;
    options;
    trueValue = true;
    falseValue = false;
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: CheckboxComponent, deps: [{ token: JsonSchemaFormService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: CheckboxComponent, selector: "checkbox-widget", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, ngImport: i0, template: `
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
      </label>`, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: CheckboxComponent, decorators: [{
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
        }], ctorParameters: function () { return [{ type: JsonSchemaFormService }]; }, propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] } });

class CheckboxesComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    controlDisabled = false;
    boundControl = false;
    options;
    layoutOrientation;
    formArray;
    checkboxList = [];
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: CheckboxesComponent, deps: [{ token: JsonSchemaFormService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: CheckboxesComponent, selector: "checkboxes-widget", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, ngImport: i0, template: `
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
      </div>`, isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: CheckboxesComponent, decorators: [{
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
        }], ctorParameters: function () { return [{ type: JsonSchemaFormService }]; }, propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] } });

class FileComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    controlDisabled = false;
    boundControl = false;
    options;
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: FileComponent, deps: [{ token: JsonSchemaFormService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: FileComponent, selector: "file-widget", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, ngImport: i0, template: ``, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: FileComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'file-widget',
                    template: ``,
                }]
        }], ctorParameters: function () { return [{ type: JsonSchemaFormService }]; }, propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] } });

class InputComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    controlDisabled = false;
    boundControl = false;
    options;
    autoCompleteList = [];
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: InputComponent, deps: [{ token: JsonSchemaFormService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: InputComponent, selector: "input-widget", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, ngImport: i0, template: `
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
    </div>`, isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i3.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: InputComponent, decorators: [{
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
        }], ctorParameters: function () { return [{ type: JsonSchemaFormService }]; }, propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] } });

class MessageComponent {
    jsf;
    options;
    message = null;
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.message = this.options.help || this.options.helpvalue ||
            this.options.msg || this.options.message;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: MessageComponent, deps: [{ token: JsonSchemaFormService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: MessageComponent, selector: "message-widget", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, ngImport: i0, template: `
    <span *ngIf="message"
      [class]="options?.labelHtmlClass || ''"
      [innerHTML]="message"></span>`, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: MessageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'message-widget',
                    template: `
    <span *ngIf="message"
      [class]="options?.labelHtmlClass || ''"
      [innerHTML]="message"></span>`,
                }]
        }], ctorParameters: function () { return [{ type: JsonSchemaFormService }]; }, propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] } });

class NoneComponent {
    layoutNode;
    layoutIndex;
    dataIndex;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NoneComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: NoneComponent, selector: "none-widget", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, ngImport: i0, template: ``, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NoneComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'none-widget',
                    template: ``,
                }]
        }], propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] } });

class NumberComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    controlDisabled = false;
    boundControl = false;
    options;
    allowNegative = true;
    allowDecimal = true;
    allowExponents = false;
    lastValidNumber = '';
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NumberComponent, deps: [{ token: JsonSchemaFormService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: NumberComponent, selector: "number-widget", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, ngImport: i0, template: `
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
      </div>`, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NumberComponent, decorators: [{
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
        }], ctorParameters: function () { return [{ type: JsonSchemaFormService }]; }, propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] } });

class RadiosComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    controlDisabled = false;
    boundControl = false;
    options;
    layoutOrientation = 'vertical';
    radiosList = [];
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: RadiosComponent, deps: [{ token: JsonSchemaFormService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: RadiosComponent, selector: "radios-widget", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, ngImport: i0, template: `
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
    </div>`, isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: RadiosComponent, decorators: [{
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
        }], ctorParameters: function () { return [{ type: JsonSchemaFormService }]; }, propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] } });

class SelectFrameworkComponent {
    componentFactory;
    jsf;
    newComponent = null;
    layoutNode;
    layoutIndex;
    dataIndex;
    widgetContainer;
    constructor(componentFactory, jsf) {
        this.componentFactory = componentFactory;
        this.jsf = jsf;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: SelectFrameworkComponent, deps: [{ token: i0.ComponentFactoryResolver }, { token: JsonSchemaFormService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: SelectFrameworkComponent, selector: "select-framework-widget", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, viewQueries: [{ propertyName: "widgetContainer", first: true, predicate: ["widgetContainer"], descendants: true, read: ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0, template: `
    <div #widgetContainer></div>
  `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: SelectFrameworkComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'select-framework-widget',
                    template: `
    <div #widgetContainer></div>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: JsonSchemaFormService }]; }, propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }], widgetContainer: [{
                type: ViewChild,
                args: ['widgetContainer', { read: ViewContainerRef, static: true }]
            }] } });

class RootComponent {
    jsf;
    options;
    dataIndex;
    layoutIndex;
    layout;
    isOrderable;
    isFlexItem = false;
    constructor(jsf) {
        this.jsf = jsf;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: RootComponent, deps: [{ token: JsonSchemaFormService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: RootComponent, selector: "root-widget", inputs: { dataIndex: "dataIndex", layoutIndex: "layoutIndex", layout: "layout", isOrderable: "isOrderable", isFlexItem: "isFlexItem" }, ngImport: i0, template: `
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
    </div>`, isInline: true, styles: ["[draggable=true]{transition:all .15s cubic-bezier(.4,0,.2,1)}[draggable=true]:hover{cursor:move;box-shadow:2px 2px 4px #0003;position:relative;z-index:10;margin:-1px 1px 1px -1px}[draggable=true].drag-target-top{box-shadow:0 -2px #000;position:relative;z-index:20}[draggable=true].drag-target-bottom{box-shadow:0 2px #000;position:relative;z-index:20}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: SelectFrameworkComponent, selector: "select-framework-widget", inputs: ["layoutNode", "layoutIndex", "dataIndex"] }, { kind: "directive", type: OrderableDirective, selector: "[orderable]", inputs: ["orderable", "layoutNode", "layoutIndex", "dataIndex"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: RootComponent, decorators: [{
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
        }], ctorParameters: function () { return [{ type: JsonSchemaFormService }]; }, propDecorators: { dataIndex: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], layout: [{
                type: Input
            }], isOrderable: [{
                type: Input
            }], isFlexItem: [{
                type: Input
            }] } });

class SectionComponent {
    jsf;
    options;
    expanded = true;
    containerType;
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: SectionComponent, deps: [{ token: JsonSchemaFormService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: SectionComponent, selector: "section-widget", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, ngImport: i0, template: `
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
      </fieldset>`, isInline: true, styles: [".legend{font-weight:700}.expandable>legend:before,.expandable>label:before{content:\"\\25b6\";padding-right:.3em}.expanded>legend:before,.expanded>label:before{content:\"\\25bc\";padding-right:.2em}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: RootComponent, selector: "root-widget", inputs: ["dataIndex", "layoutIndex", "layout", "isOrderable", "isFlexItem"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: SectionComponent, decorators: [{
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
        }], ctorParameters: function () { return [{ type: JsonSchemaFormService }]; }, propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] } });

class SelectComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    controlDisabled = false;
    boundControl = false;
    options;
    selectList = [];
    isArray = isArray;
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.selectList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, !!this.options.required, !!this.options.flatList);
        this.jsf.initializeControl(this);
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: SelectComponent, deps: [{ token: JsonSchemaFormService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: SelectComponent, selector: "select-widget", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, ngImport: i0, template: `
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
    </div>`, isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i3.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i3.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: SelectComponent, decorators: [{
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
        }], ctorParameters: function () { return [{ type: JsonSchemaFormService }]; }, propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] } });

class SelectWidgetComponent {
    componentFactory;
    jsf;
    newComponent = null;
    layoutNode;
    layoutIndex;
    dataIndex;
    widgetContainer;
    constructor(componentFactory, jsf) {
        this.componentFactory = componentFactory;
        this.jsf = jsf;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: SelectWidgetComponent, deps: [{ token: i0.ComponentFactoryResolver }, { token: JsonSchemaFormService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: SelectWidgetComponent, selector: "select-widget-widget", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, viewQueries: [{ propertyName: "widgetContainer", first: true, predicate: ["widgetContainer"], descendants: true, read: ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0, template: `<div #widgetContainer></div>`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: SelectWidgetComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'select-widget-widget',
                    template: `<div #widgetContainer></div>`,
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: JsonSchemaFormService }]; }, propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }], widgetContainer: [{
                type: ViewChild,
                args: ['widgetContainer', { read: ViewContainerRef, static: true }]
            }] } });

class SubmitComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    controlDisabled = false;
    boundControl = false;
    options;
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: SubmitComponent, deps: [{ token: JsonSchemaFormService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: SubmitComponent, selector: "submit-widget", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, ngImport: i0, template: `
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
    </div>`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: SubmitComponent, decorators: [{
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
        }], ctorParameters: function () { return [{ type: JsonSchemaFormService }]; }, propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] } });

class TabsComponent {
    jsf;
    options;
    itemCount;
    selectedItem = 0;
    showAddTab = true;
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: TabsComponent, deps: [{ token: JsonSchemaFormService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: TabsComponent, selector: "tabs-widget", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, ngImport: i0, template: `
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

    </div>`, isInline: true, styles: ["a{cursor:pointer}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: SelectFrameworkComponent, selector: "select-framework-widget", inputs: ["layoutNode", "layoutIndex", "dataIndex"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: TabsComponent, decorators: [{
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
        }], ctorParameters: function () { return [{ type: JsonSchemaFormService }]; }, propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] } });

class TemplateComponent {
    componentFactory;
    jsf;
    newComponent = null;
    layoutNode;
    layoutIndex;
    dataIndex;
    widgetContainer;
    constructor(componentFactory, jsf) {
        this.componentFactory = componentFactory;
        this.jsf = jsf;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: TemplateComponent, deps: [{ token: i0.ComponentFactoryResolver }, { token: JsonSchemaFormService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: TemplateComponent, selector: "template-widget", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, viewQueries: [{ propertyName: "widgetContainer", first: true, predicate: ["widgetContainer"], descendants: true, read: ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0, template: `<div #widgetContainer></div>`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: TemplateComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'template-widget',
                    template: `<div #widgetContainer></div>`,
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: JsonSchemaFormService }]; }, propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }], widgetContainer: [{
                type: ViewChild,
                args: ['widgetContainer', { read: ViewContainerRef, static: true }]
            }] } });

class TextareaComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    controlDisabled = false;
    boundControl = false;
    options;
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: TextareaComponent, deps: [{ token: JsonSchemaFormService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: TextareaComponent, selector: "textarea-widget", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, ngImport: i0, template: `
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
    </div>`, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: TextareaComponent, decorators: [{
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
        }], ctorParameters: function () { return [{ type: JsonSchemaFormService }]; }, propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] } });

class WidgetLibraryService {
    defaultWidget = 'text';
    widgetLibrary = {
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
    registeredWidgets = {};
    frameworkWidgets = {};
    activeWidgets = {};
    constructor() {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: WidgetLibraryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: WidgetLibraryService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: WidgetLibraryService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

class FrameworkLibraryService {
    frameworks;
    widgetLibrary;
    activeFramework = null;
    stylesheets;
    scripts;
    loadExternalAssets = false;
    defaultFramework;
    frameworkLibrary = {};
    constructor(frameworks, widgetLibrary) {
        this.frameworks = frameworks;
        this.widgetLibrary = widgetLibrary;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: FrameworkLibraryService, deps: [{ token: Framework }, { token: WidgetLibraryService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: FrameworkLibraryService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: FrameworkLibraryService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [Framework]
                }] }, { type: WidgetLibraryService, decorators: [{
                    type: Inject,
                    args: [WidgetLibraryService]
                }] }]; } });

class HiddenComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    controlDisabled = false;
    boundControl = false;
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
    }
    ngOnInit() {
        this.jsf.initializeControl(this);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: HiddenComponent, deps: [{ token: JsonSchemaFormService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: HiddenComponent, selector: "hidden-widget", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, ngImport: i0, template: `
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
      [value]="controlValue">`, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: HiddenComponent, decorators: [{
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
        }], ctorParameters: function () { return [{ type: JsonSchemaFormService }]; }, propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] } });

class TabComponent {
    jsf;
    options;
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: TabComponent, deps: [{ token: JsonSchemaFormService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: TabComponent, selector: "tab-widget", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, ngImport: i0, template: `
    <div [class]="options?.htmlClass || ''">
      <root-widget
        [dataIndex]="dataIndex"
        [layoutIndex]="layoutIndex"
        [layout]="layoutNode.items"></root-widget>
    </div>`, isInline: true, dependencies: [{ kind: "component", type: RootComponent, selector: "root-widget", inputs: ["dataIndex", "layoutIndex", "layout", "isOrderable", "isFlexItem"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: TabComponent, decorators: [{
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
        }], ctorParameters: function () { return [{ type: JsonSchemaFormService }]; }, propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] } });

class WidgetLibraryModule {
    static forRoot() {
        return {
            ngModule: WidgetLibraryModule,
            providers: [JsonSchemaFormService],
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: WidgetLibraryModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.3", ngImport: i0, type: WidgetLibraryModule, declarations: [AddReferenceComponent,
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
            OrderableDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: WidgetLibraryModule, providers: [JsonSchemaFormService], imports: [CommonModule, FormsModule, ReactiveFormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: WidgetLibraryModule, decorators: [{
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
        }] });

export { AddReferenceComponent, ButtonComponent, CheckboxComponent, CheckboxesComponent, FileComponent, FrameworkLibraryService, HiddenComponent, InputComponent, JsonSchemaFormService, MessageComponent, NoneComponent, NumberComponent, OneOfComponent, OrderableDirective, RadiosComponent, RootComponent, SectionComponent, SelectComponent, SelectFrameworkComponent, SelectWidgetComponent, SubmitComponent, TabComponent, TabsComponent, TemplateComponent, TextareaComponent, WidgetLibraryModule, WidgetLibraryService, buildTitleMap };
//# sourceMappingURL=ngsf-widget-library.mjs.map
