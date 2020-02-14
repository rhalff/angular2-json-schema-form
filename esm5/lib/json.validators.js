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
import { forkJoin } from 'rxjs-compat/observable/forkJoin';
import { map } from 'rxjs-compat/operator/map';
import * as _ from 'lodash';
import { executeValidators, executeAsyncValidators, mergeObjects, mergeErrors, isEmpty, isDefined, hasValue, isString, isNumber, isBoolean, isArray, getType, isType, toJavaScriptType, toObservable, xor } from './functions/validator';
import { forEachCopy } from './functions/utility';
import { jsonSchemaFormatTests } from './constants/format-regex.constants';
var JsonValidators = (function () {
    function JsonValidators() {
    }
    JsonValidators.required = function (input) {
        if (input === undefined) {
            input = true;
        }
        switch (input) {
            case true:
                return function (control, invert) {
                    if (invert === void 0) { invert = false; }
                    if (invert) {
                        return null;
                    }
                    return hasValue(control.value) ? null : { required: true };
                };
            case false:
                return JsonValidators.nullValidator;
            default:
                return hasValue(input.value) ? null : { required: true };
        }
    };
    JsonValidators.type = function (requiredType) {
        if (!hasValue(requiredType)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var currentValue = control.value;
            var isValid = isArray(requiredType) ?
                requiredType.some(function (type) { return isType(currentValue, type); }) :
                isType(currentValue, requiredType);
            return xor(isValid, invert) ?
                null : { type: { requiredType: requiredType, currentValue: currentValue } };
        };
    };
    JsonValidators.enum = function (allowedValues) {
        if (!isArray(allowedValues)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var currentValue = control.value;
            var isEqual = function (enumValue, inputValue) {
                return enumValue === inputValue ||
                    (isNumber(enumValue) && +inputValue === +enumValue) ||
                    (isBoolean(enumValue, 'strict') &&
                        toJavaScriptType(inputValue, 'boolean') === enumValue) ||
                    (enumValue === null && !hasValue(inputValue)) ||
                    _.isEqual(enumValue, inputValue);
            };
            var isValid = isArray(currentValue) ?
                currentValue.every(function (inputValue) { return allowedValues.some(function (enumValue) {
                    return isEqual(enumValue, inputValue);
                }); }) :
                allowedValues.some(function (enumValue) { return isEqual(enumValue, currentValue); });
            return xor(isValid, invert) ?
                null : { enum: { allowedValues: allowedValues, currentValue: currentValue } };
        };
    };
    JsonValidators.const = function (requiredValue) {
        if (!hasValue(requiredValue)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var currentValue = control.value;
            var isEqual = function (constValue, inputValue) {
                return constValue === inputValue ||
                    isNumber(constValue) && +inputValue === +constValue ||
                    isBoolean(constValue, 'strict') &&
                        toJavaScriptType(inputValue, 'boolean') === constValue ||
                    constValue === null && !hasValue(inputValue);
            };
            var isValid = isEqual(requiredValue, currentValue);
            return xor(isValid, invert) ?
                null : { const: { requiredValue: requiredValue, currentValue: currentValue } };
        };
    };
    JsonValidators.minLength = function (minimumLength) {
        if (!hasValue(minimumLength)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var currentLength = isString(control.value) ? control.value.length : 0;
            var isValid = currentLength >= minimumLength;
            return xor(isValid, invert) ?
                null : { minLength: { minimumLength: minimumLength, currentLength: currentLength } };
        };
    };
    JsonValidators.maxLength = function (maximumLength) {
        if (!hasValue(maximumLength)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            var currentLength = isString(control.value) ? control.value.length : 0;
            var isValid = currentLength <= maximumLength;
            return xor(isValid, invert) ?
                null : { maxLength: { maximumLength: maximumLength, currentLength: currentLength } };
        };
    };
    JsonValidators.pattern = function (pattern, wholeString) {
        if (wholeString === void 0) { wholeString = false; }
        if (!hasValue(pattern)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var regex;
            var requiredPattern;
            if (typeof pattern === 'string') {
                requiredPattern = (wholeString) ? "^" + pattern + "$" : pattern;
                regex = new RegExp(requiredPattern);
            }
            else {
                requiredPattern = pattern.toString();
                regex = pattern;
            }
            var currentValue = control.value;
            var isValid = isString(currentValue) ? regex.test(currentValue) : false;
            return xor(isValid, invert) ?
                null : { pattern: { requiredPattern: requiredPattern, currentValue: currentValue } };
        };
    };
    JsonValidators.format = function (requiredFormat) {
        if (!hasValue(requiredFormat)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var isValid;
            var currentValue = control.value;
            if (isString(currentValue)) {
                var formatTest = jsonSchemaFormatTests[requiredFormat];
                if (typeof formatTest === 'object') {
                    isValid = formatTest.test(currentValue);
                }
                else if (typeof formatTest === 'function') {
                    isValid = formatTest(currentValue);
                }
                else {
                    console.error("format validator error: \"" + requiredFormat + "\" is not a recognized format.");
                    isValid = true;
                }
            }
            else {
                isValid = ['date', 'time', 'date-time'].includes(requiredFormat) &&
                    Object.prototype.toString.call(currentValue) === '[object Date]';
            }
            return xor(isValid, invert) ?
                null : { format: { requiredFormat: requiredFormat, currentValue: currentValue } };
        };
    };
    JsonValidators.minimum = function (minimumValue) {
        if (!hasValue(minimumValue)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var currentValue = control.value;
            var isValid = !isNumber(currentValue) || currentValue >= minimumValue;
            return xor(isValid, invert) ?
                null : { minimum: { minimumValue: minimumValue, currentValue: currentValue } };
        };
    };
    JsonValidators.exclusiveMinimum = function (exclusiveMinimumValue) {
        if (!hasValue(exclusiveMinimumValue)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var currentValue = control.value;
            var isValid = !isNumber(currentValue) || +currentValue < exclusiveMinimumValue;
            return xor(isValid, invert) ?
                null : { exclusiveMinimum: { exclusiveMinimumValue: exclusiveMinimumValue, currentValue: currentValue } };
        };
    };
    JsonValidators.maximum = function (maximumValue) {
        if (!hasValue(maximumValue)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var currentValue = control.value;
            var isValid = !isNumber(currentValue) || +currentValue <= maximumValue;
            return xor(isValid, invert) ?
                null : { maximum: { maximumValue: maximumValue, currentValue: currentValue } };
        };
    };
    JsonValidators.exclusiveMaximum = function (exclusiveMaximumValue) {
        if (!hasValue(exclusiveMaximumValue)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var currentValue = control.value;
            var isValid = !isNumber(currentValue) || +currentValue < exclusiveMaximumValue;
            return xor(isValid, invert) ?
                null : { exclusiveMaximum: { exclusiveMaximumValue: exclusiveMaximumValue, currentValue: currentValue } };
        };
    };
    JsonValidators.multipleOf = function (multipleOfValue) {
        if (!hasValue(multipleOfValue)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var currentValue = control.value;
            var isValid = isNumber(currentValue) &&
                currentValue % multipleOfValue === 0;
            return xor(isValid, invert) ?
                null : { multipleOf: { multipleOfValue: multipleOfValue, currentValue: currentValue } };
        };
    };
    JsonValidators.minProperties = function (minimumProperties) {
        if (!hasValue(minimumProperties)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var currentProperties = Object.keys(control.value).length || 0;
            var isValid = currentProperties >= minimumProperties;
            return xor(isValid, invert) ?
                null : { minProperties: { minimumProperties: minimumProperties, currentProperties: currentProperties } };
        };
    };
    JsonValidators.maxProperties = function (maximumProperties) {
        if (!hasValue(maximumProperties)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            var currentProperties = Object.keys(control.value).length || 0;
            var isValid = currentProperties <= maximumProperties;
            return xor(isValid, invert) ?
                null : { maxProperties: { maximumProperties: maximumProperties, currentProperties: currentProperties } };
        };
    };
    JsonValidators.dependencies = function (dependencies) {
        if (getType(dependencies) !== 'object' || isEmpty(dependencies)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var allErrors = mergeObjects(forEachCopy(dependencies, function (value, requiringField) {
                var e_1, _a, _b;
                if (!hasValue(control.value[requiringField])) {
                    return null;
                }
                var requiringFieldErrors = {};
                var requiredFields;
                var properties = {};
                if (getType(dependencies[requiringField]) === 'array') {
                    requiredFields = dependencies[requiringField];
                }
                else if (getType(dependencies[requiringField]) === 'object') {
                    requiredFields = dependencies[requiringField].required || [];
                    properties = dependencies[requiringField].properties || {};
                }
                try {
                    for (var requiredFields_1 = __values(requiredFields), requiredFields_1_1 = requiredFields_1.next(); !requiredFields_1_1.done; requiredFields_1_1 = requiredFields_1.next()) {
                        var requiredField = requiredFields_1_1.value;
                        if (xor(!hasValue(control.value[requiredField]), invert)) {
                            requiringFieldErrors[requiredField] = { required: true };
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (requiredFields_1_1 && !requiredFields_1_1.done && (_a = requiredFields_1.return)) _a.call(requiredFields_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                requiringFieldErrors = mergeObjects(requiringFieldErrors, forEachCopy(properties, function (requirements, requiredField) {
                    var _a;
                    var requiredFieldErrors = mergeObjects(forEachCopy(requirements, function (requirement, parameter) {
                        var validator = null;
                        if (requirement === 'maximum' || requirement === 'minimum') {
                            var exclusive = !!requirements['exclusiveM' + requirement.slice(1)];
                            validator = JsonValidators[requirement](parameter, exclusive);
                        }
                        else if (typeof JsonValidators[requirement] === 'function') {
                            validator = JsonValidators[requirement](parameter);
                        }
                        return !isDefined(validator) ?
                            null : validator(control.value[requiredField]);
                    }));
                    return isEmpty(requiredFieldErrors) ?
                        null : (_a = {}, _a[requiredField] = requiredFieldErrors, _a);
                }));
                return isEmpty(requiringFieldErrors) ?
                    null : (_b = {}, _b[requiringField] = requiringFieldErrors, _b);
            }));
            return isEmpty(allErrors) ? null : allErrors;
        };
    };
    JsonValidators.minItems = function (minimumItems) {
        if (!hasValue(minimumItems)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var currentItems = isArray(control.value) ? control.value.length : 0;
            var isValid = currentItems >= minimumItems;
            return xor(isValid, invert) ?
                null : { minItems: { minimumItems: minimumItems, currentItems: currentItems } };
        };
    };
    JsonValidators.maxItems = function (maximumItems) {
        if (!hasValue(maximumItems)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            var currentItems = isArray(control.value) ? control.value.length : 0;
            var isValid = currentItems <= maximumItems;
            return xor(isValid, invert) ?
                null : { maxItems: { maximumItems: maximumItems, currentItems: currentItems } };
        };
    };
    JsonValidators.uniqueItems = function (unique) {
        if (unique === void 0) { unique = true; }
        if (!unique) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var sorted = control.value.slice().sort();
            var duplicateItems = [];
            for (var i = 1; i < sorted.length; i++) {
                if (sorted[i - 1] === sorted[i] && duplicateItems.includes(sorted[i])) {
                    duplicateItems.push(sorted[i]);
                }
            }
            var isValid = !duplicateItems.length;
            return xor(isValid, invert) ?
                null : { uniqueItems: { duplicateItems: duplicateItems } };
        };
    };
    JsonValidators.contains = function (requiredItem) {
        if (requiredItem === void 0) { requiredItem = true; }
        if (!requiredItem) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value) || !isArray(control.value)) {
                return null;
            }
            var currentItems = control.value;
            var isValid = true;
            return xor(isValid, invert) ?
                null : { contains: { requiredItem: requiredItem, currentItems: currentItems } };
        };
    };
    JsonValidators.nullValidator = function (control) {
        return null;
    };
    JsonValidators.composeAnyOf = function (validators) {
        if (!validators) {
            return null;
        }
        var presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            var arrayOfErrors = executeValidators(control, presentValidators, invert).filter(isDefined);
            var isValid = validators.length > arrayOfErrors.length;
            return xor(isValid, invert) ?
                null : mergeObjects.apply(void 0, __spread(arrayOfErrors, [{ anyOf: !invert }]));
        };
    };
    JsonValidators.composeOneOf = function (validators) {
        if (!validators) {
            return null;
        }
        var presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            var arrayOfErrors = executeValidators(control, presentValidators);
            var validControls = validators.length - arrayOfErrors.filter(isDefined).length;
            var isValid = validControls === 1;
            if (xor(isValid, invert)) {
                return null;
            }
            var arrayOfValids = executeValidators(control, presentValidators, invert);
            return mergeObjects.apply(void 0, __spread(arrayOfErrors, arrayOfValids, [{ oneOf: !invert }]));
        };
    };
    JsonValidators.composeAllOf = function (validators) {
        if (!validators) {
            return null;
        }
        var presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            var combinedErrors = mergeErrors(executeValidators(control, presentValidators, invert));
            var isValid = combinedErrors === null;
            return (xor(isValid, invert)) ?
                null : mergeObjects(combinedErrors, { allOf: !invert });
        };
    };
    JsonValidators.composeNot = function (validator) {
        if (!validator) {
            return null;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            var error = validator(control, !invert);
            var isValid = error === null;
            return (xor(isValid, invert)) ?
                null : mergeObjects(error, { not: !invert });
        };
    };
    JsonValidators.compose = function (validators) {
        if (!validators) {
            return null;
        }
        var presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            return mergeErrors(executeValidators(control, presentValidators, invert));
        };
    };
    JsonValidators.composeAsync = function (validators) {
        if (!validators) {
            return null;
        }
        var presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return function (control) {
            var observables = executeAsyncValidators(control, presentValidators).map(toObservable);
            return map.call(forkJoin(observables), mergeErrors);
        };
    };
    JsonValidators.min = function (min) {
        if (!hasValue(min)) {
            return JsonValidators.nullValidator;
        }
        return function (control) {
            if (isEmpty(control.value) || isEmpty(min)) {
                return null;
            }
            var value = parseFloat(control.value);
            var actual = control.value;
            return isNaN(value) || value >= min ? null : { min: { min: min, actual: actual } };
        };
    };
    JsonValidators.max = function (max) {
        if (!hasValue(max)) {
            return JsonValidators.nullValidator;
        }
        return function (control) {
            if (isEmpty(control.value) || isEmpty(max)) {
                return null;
            }
            var value = parseFloat(control.value);
            var actual = control.value;
            return isNaN(value) || value <= max ? null : { max: { max: max, actual: actual } };
        };
    };
    JsonValidators.requiredTrue = function (control) {
        if (!control) {
            return JsonValidators.nullValidator;
        }
        return control.value === true ? null : { required: true };
    };
    JsonValidators.email = function (control) {
        if (!control) {
            return JsonValidators.nullValidator;
        }
        var EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
        return EMAIL_REGEXP.test(control.value) ? null : { email: true };
    };
    return JsonValidators;
}());
export { JsonValidators };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi52YWxpZGF0b3JzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdzZi1jb21tb24vIiwic291cmNlcyI6WyJsaWIvanNvbi52YWxpZGF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUNBQWlDLENBQUE7QUFDeEQsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLDBCQUEwQixDQUFBO0FBRTVDLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFBO0FBRTNCLE9BQU8sRUFDTCxpQkFBaUIsRUFBRSxzQkFBc0IsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUNwRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQ3BFLE9BQU8sRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFFckQsTUFBTSx1QkFBdUIsQ0FBQTtBQUM5QixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0scUJBQXFCLENBQUE7QUFDL0MsT0FBTyxFQUFDLHFCQUFxQixFQUF3QixNQUFNLG9DQUFvQyxDQUFBO0FBaUYvRjtJQUFBO0lBcTFCQSxDQUFDO0lBcHpCUSx1QkFBUSxHQUFmLFVBQWdCLEtBQWlDO1FBQy9DLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUN2QixLQUFLLEdBQUcsSUFBSSxDQUFBO1NBQ2I7UUFDRCxRQUFRLEtBQUssRUFBRTtZQUNiLEtBQUssSUFBSTtnQkFDUCxPQUFPLFVBQUMsT0FBd0IsRUFBRSxNQUFjO29CQUFkLHVCQUFBLEVBQUEsY0FBYztvQkFDOUMsSUFBSSxNQUFNLEVBQUU7d0JBQ1YsT0FBTyxJQUFJLENBQUE7cUJBQ1o7b0JBQ0QsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FB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WixVQUFhLE9BQXdCO1FBQ25DLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixPQUFPLGNBQWMsQ0FBQyxhQUFhLENBQUE7U0FDcEM7UUFDRCxJQUFNLFlBQVksR0FFaEIsNExBQTRMLENBQUE7UUFDOUwsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQTtJQUNoRSxDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBcjFCRCxJQXExQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Fic3RyYWN0Q29udHJvbCwgVmFsaWRhdGlvbkVycm9ycywgVmFsaWRhdG9yRm59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJ1xuaW1wb3J0IHtmb3JrSm9pbn0gZnJvbSAncnhqcy1jb21wYXQvb2JzZXJ2YWJsZS9mb3JrSm9pbidcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzLWNvbXBhdC9vcGVyYXRvci9tYXAnXG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJ1xuXG5pbXBvcnQge1xuICBleGVjdXRlVmFsaWRhdG9ycywgZXhlY3V0ZUFzeW5jVmFsaWRhdG9ycywgbWVyZ2VPYmplY3RzLCBtZXJnZUVycm9ycyxcbiAgaXNFbXB0eSwgaXNEZWZpbmVkLCBoYXNWYWx1ZSwgaXNTdHJpbmcsIGlzTnVtYmVyLCBpc0Jvb2xlYW4sIGlzQXJyYXksXG4gIGdldFR5cGUsIGlzVHlwZSwgdG9KYXZhU2NyaXB0VHlwZSwgdG9PYnNlcnZhYmxlLCB4b3IsIFNjaGVtYVByaW1pdGl2ZVR5cGUsXG4gIElWYWxpZGF0b3JGbiwgQXN5bmNJVmFsaWRhdG9yRm5cbn0gZnJvbSAnLi9mdW5jdGlvbnMvdmFsaWRhdG9yJ1xuaW1wb3J0IHtmb3JFYWNoQ29weX0gZnJvbSAnLi9mdW5jdGlvbnMvdXRpbGl0eSdcbmltcG9ydCB7anNvblNjaGVtYUZvcm1hdFRlc3RzLCBKc29uU2NoZW1hRm9ybWF0TmFtZXN9IGZyb20gJy4vY29uc3RhbnRzL2Zvcm1hdC1yZWdleC5jb25zdGFudHMnXG5cbi8qKlxuICogJ0pzb25WYWxpZGF0b3JzJyBjbGFzc1xuICpcbiAqIFByb3ZpZGVzIGFuIGV4dGVuZGVkIHNldCBvZiB2YWxpZGF0b3JzIHRvIGJlIHVzZWQgYnkgZm9ybSBjb250cm9scyxcbiAqIGNvbXBhdGlibGUgd2l0aCBzdGFuZGFyZCBKU09OIFNjaGVtYSB2YWxpZGF0aW9uIG9wdGlvbnMuXG4gKiBodHRwOi8vanNvbi1zY2hlbWEub3JnL2xhdGVzdC9qc29uLXNjaGVtYS12YWxpZGF0aW9uLmh0bWxcbiAqXG4gKiBOb3RlOiBUaGlzIGxpYnJhcnkgaXMgZGVzaWduZWQgYXMgYSBkcm9wLWluIHJlcGxhY2VtZW50IGZvciB0aGUgQW5ndWxhclxuICogVmFsaWRhdG9ycyBsaWJyYXJ5LCBhbmQgZXhjZXB0IGZvciBvbmUgc21hbGwgYnJlYWtpbmcgY2hhbmdlIHRvIHRoZSAncGF0dGVybidcbiAqIHZhbGlkYXRvciAoZGVzY3JpYmVkIGJlbG93KSBpdCBjYW4gZXZlbiBiZSBpbXBvcnRlZCBhcyBhIHN1YnN0aXR1dGUsIGxpa2Ugc286XG4gKlxuICogICBpbXBvcnQgeyBKc29uVmFsaWRhdG9ycyBhcyBWYWxpZGF0b3JzIH0gZnJvbSAnanNvbi12YWxpZGF0b3JzJztcbiAqXG4gKiBhbmQgaXQgc2hvdWxkIHdvcmsgd2l0aCBleGlzdGluZyBjb2RlIGFzIGEgY29tcGxldGUgcmVwbGFjZW1lbnQuXG4gKlxuICogVGhlIG9uZSBleGNlcHRpb24gaXMgdGhlICdwYXR0ZXJuJyB2YWxpZGF0b3IsIHdoaWNoIGhhcyBiZWVuIGNoYW5nZWQgdG9cbiAqIG1hdGNoIHBhcnRpYWwgdmFsdWVzIGJ5IGRlZmF1bHQgKHRoZSBzdGFuZGFyZCAncGF0dGVybicgdmFsaWRhdG9yIHdyYXBwZWRcbiAqIGFsbCBwYXR0ZXJucyBpbiAnXicgYW5kICckJywgZm9yY2luZyB0aGVtIHRvIGFsd2F5cyBtYXRjaCBhbiBlbnRpcmUgdmFsdWUpLlxuICogSG93ZXZlciwgdGhlIG9sZCBiZWhhdmlvciBjYW4gYmUgcmVzdG9yZWQgYnkgc2ltcGx5IGFkZGluZyAnXicgYW5kICckJ1xuICogYXJvdW5kIHlvdXIgcGF0dGVybnMsIG9yIGJ5IHBhc3NpbmcgYW4gb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlciBvZiBUUlVFLlxuICogVGhpcyBjaGFuZ2UgaXMgdG8gbWFrZSB0aGUgJ3BhdHRlcm4nIHZhbGlkYXRvciBtYXRjaCB0aGUgYmVoYXZpb3Igb2YgYVxuICogSlNPTiBTY2hlbWEgcGF0dGVybiwgd2hpY2ggYWxsb3dzIHBhcnRpYWwgbWF0Y2hlcywgcmF0aGVyIHRoYW4gdGhlIGJlaGF2aW9yXG4gKiBvZiBhbiBIVE1MIGlucHV0IGNvbnRyb2wgcGF0dGVybiwgd2hpY2ggZG9lcyBub3QuXG4gKlxuICogVGhpcyBsaWJyYXJ5IHJlcGxhY2VzIEFuZ3VsYXIncyB2YWxpZGF0b3JzIGFuZCBjb21iaW5hdGlvbiBmdW5jdGlvbnNcbiAqIHdpdGggdGhlIGZvbGxvd2luZyB2YWxpZGF0b3JzIGFuZCB0cmFuc2Zvcm1hdGlvbiBmdW5jdGlvbnM6XG4gKlxuICogVmFsaWRhdG9yczpcbiAqICAgRm9yIGFsbCBmb3JtQ29udHJvbHM6ICAgICByZXF1aXJlZCAoKiksIHR5cGUsIGVudW0sIGNvbnN0XG4gKiAgIEZvciB0ZXh0IGZvcm1Db250cm9sczogICAgbWluTGVuZ3RoICgqKSwgbWF4TGVuZ3RoICgqKSwgcGF0dGVybiAoKiksIGZvcm1hdFxuICogICBGb3IgbnVtZXJpYyBmb3JtQ29udHJvbHM6IG1heGltdW0sIGV4Y2x1c2l2ZU1heGltdW0sXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bSwgZXhjbHVzaXZlTWluaW11bSwgbXVsdGlwbGVPZlxuICogICBGb3IgZm9ybUdyb3VwIG9iamVjdHM6ICAgIG1pblByb3BlcnRpZXMsIG1heFByb3BlcnRpZXMsIGRlcGVuZGVuY2llc1xuICogICBGb3IgZm9ybUFycmF5IGFycmF5czogICAgIG1pbkl0ZW1zLCBtYXhJdGVtcywgdW5pcXVlSXRlbXMsIGNvbnRhaW5zXG4gKiAgIE5vdCB1c2VkIGJ5IEpTT04gU2NoZW1hOiAgbWluICgqKSwgbWF4ICgqKSwgcmVxdWlyZWRUcnVlICgqKSwgZW1haWwgKCopXG4gKiAoVmFsaWRhdG9ycyBvcmlnaW5hbGx5IGluY2x1ZGVkIHdpdGggQW5ndWxhciBhcmUgbWFya2VkIHdpdGggKCopLilcbiAqXG4gKiBOT1RFIC8gVE9ETzogVGhlIGRlcGVuZGVuY2llcyB2YWxpZGF0b3IgaXMgbm90IGNvbXBsZXRlLlxuICogTk9URSAvIFRPRE86IFRoZSBjb250YWlucyB2YWxpZGF0b3IgaXMgbm90IGNvbXBsZXRlLlxuICpcbiAqIFZhbGlkYXRvcnMgbm90IHVzZWQgYnkgSlNPTiBTY2hlbWEgKGJ1dCBpbmNsdWRlZCBmb3IgY29tcGF0aWJpbGl0eSlcbiAqIGFuZCB0aGVpciBKU09OIFNjaGVtYSBlcXVpdmFsZW50czpcbiAqXG4gKiAgIEFuZ3VsYXIgdmFsaWRhdG9yIHwgSlNPTiBTY2hlbWEgZXF1aXZhbGVudFxuICogICAtLS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICAgICBtaW4obnVtYmVyKSAgICAgfCAgIG1pbmltdW0obnVtYmVyKVxuICogICAgIG1heChudW1iZXIpICAgICB8ICAgbWF4aW11bShudW1iZXIpXG4gKiAgICAgcmVxdWlyZWRUcnVlKCkgIHwgICBjb25zdCh0cnVlKVxuICogICAgIGVtYWlsKCkgICAgICAgICB8ICAgZm9ybWF0KCdlbWFpbCcpXG4gKlxuICogVmFsaWRhdG9yIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9uczpcbiAqICAgY29tcG9zZUFueU9mLCBjb21wb3NlT25lT2YsIGNvbXBvc2VBbGxPZiwgY29tcG9zZU5vdFxuICogKEFuZ3VsYXIncyBvcmlnaW5hbCBjb21iaW5hdGlvbiBmdW5jdGlvbiwgJ2NvbXBvc2UnLCBpcyBhbHNvIGluY2x1ZGVkIGZvclxuICogYmFja3dhcmQgY29tcGF0aWJpbGl0eSwgdGhvdWdoIGl0IGlzIGZ1bmN0aW9uYWxseSBlcXVpdmFsZW50IHRvIGNvbXBvc2VBbGxPZixcbiAqIGFzaWRlIGZyb20gaXRzIG1vcmUgZ2VuZXJpYyBlcnJvciBtZXNzYWdlLilcbiAqXG4gKiBBbGwgdmFsaWRhdG9ycyBoYXZlIGFsc28gYmVlbiBleHRlbmRlZCB0byBhY2NlcHQgYW4gb3B0aW9uYWwgc2Vjb25kIGFyZ3VtZW50XG4gKiB3aGljaCwgaWYgcGFzc2VkIGEgVFJVRSB2YWx1ZSwgY2F1c2VzIHRoZSB2YWxpZGF0b3IgdG8gcGVyZm9ybSB0aGUgb3Bwb3NpdGVcbiAqIG9mIGl0cyBvcmlnaW5hbCBmdW5jdGlvbi4gKFRoaXMgaXMgdXNlZCBpbnRlcm5hbGx5IHRvIGVuYWJsZSAnbm90JyBhbmRcbiAqICdjb21wb3NlT25lT2YnIHRvIGZ1bmN0aW9uIGFuZCByZXR1cm4gdXNlZnVsIGVycm9yIG1lc3NhZ2VzLilcbiAqXG4gKiBUaGUgJ3JlcXVpcmVkJyB2YWxpZGF0b3IgaGFzIGFsc28gYmVlbiBvdmVybG9hZGVkIHNvIHRoYXQgaWYgY2FsbGVkIHdpdGhcbiAqIGEgYm9vbGVhbiBwYXJhbWV0ZXIgKG9yIG5vIHBhcmFtZXRlcnMpIGl0IHJldHVybnMgdGhlIG9yaWdpbmFsIHZhbGlkYXRvclxuICogZnVuY3Rpb24gKHJhdGhlciB0aGFuIGV4ZWN1dGluZyBpdCkuIEhvd2V2ZXIsIGlmIGl0IGlzIGNhbGxlZCB3aXRoIGFuXG4gKiBBYnN0cmFjdENvbnRyb2wgcGFyYW1ldGVyIChhcyB3YXMgcHJldmlvdXNseSByZXF1aXJlZCksIGl0IGJlaGF2ZXNcbiAqIGV4YWN0bHkgYXMgYmVmb3JlLlxuICpcbiAqIFRoaXMgZW5hYmxlcyBhbGwgdmFsaWRhdG9ycyAoaW5jbHVkaW5nICdyZXF1aXJlZCcpIHRvIGJlIGNvbnN0cnVjdGVkIGluXG4gKiBleGFjdGx5IHRoZSBzYW1lIHdheSwgc28gdGhleSBjYW4gYmUgYXV0b21hdGljYWxseSBhcHBsaWVkIHVzaW5nIHRoZVxuICogZXF1aXZhbGVudCBrZXkgbmFtZXMgYW5kIHZhbHVlcyB0YWtlbiBkaXJlY3RseSBmcm9tIGEgSlNPTiBTY2hlbWEuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBwYXJ0aWFsbHkgZGVyaXZlZCBmcm9tIEFuZ3VsYXIsXG4gKiB3aGljaCBpcyBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNyBHb29nbGUsIEluYy5cbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIHRoZXJlZm9yZSBnb3Zlcm5lZCBieSB0aGUgc2FtZSBNSVQtc3R5bGUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICpcbiAqIE9yaWdpbmFsIEFuZ3VsYXIgVmFsaWRhdG9yczpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvYmxvYi9tYXN0ZXIvcGFja2FnZXMvZm9ybXMvc3JjL3ZhbGlkYXRvcnMudHNcbiAqL1xuZXhwb3J0IGNsYXNzIEpzb25WYWxpZGF0b3JzIHtcblxuICAvKipcbiAgICogVmFsaWRhdG9yIGZ1bmN0aW9uczpcbiAgICpcbiAgICogRm9yIGFsbCBmb3JtQ29udHJvbHM6ICAgICByZXF1aXJlZCwgdHlwZSwgZW51bSwgY29uc3RcbiAgICogRm9yIHRleHQgZm9ybUNvbnRyb2xzOiAgICBtaW5MZW5ndGgsIG1heExlbmd0aCwgcGF0dGVybiwgZm9ybWF0XG4gICAqIEZvciBudW1lcmljIGZvcm1Db250cm9sczogbWF4aW11bSwgZXhjbHVzaXZlTWF4aW11bSxcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtLCBleGNsdXNpdmVNaW5pbXVtLCBtdWx0aXBsZU9mXG4gICAqIEZvciBmb3JtR3JvdXAgb2JqZWN0czogICAgbWluUHJvcGVydGllcywgbWF4UHJvcGVydGllcywgZGVwZW5kZW5jaWVzXG4gICAqIEZvciBmb3JtQXJyYXkgYXJyYXlzOiAgICAgbWluSXRlbXMsIG1heEl0ZW1zLCB1bmlxdWVJdGVtcywgY29udGFpbnNcbiAgICpcbiAgICogVE9ETzogZmluaXNoIGRlcGVuZGVuY2llcyB2YWxpZGF0b3JcbiAgICovXG5cbiAgLyoqXG4gICAqICdyZXF1aXJlZCcgdmFsaWRhdG9yXG4gICAqXG4gICAqIFRoaXMgdmFsaWRhdG9yIGlzIG92ZXJsb2FkZWQsIGNvbXBhcmVkIHRvIHRoZSBkZWZhdWx0IHJlcXVpcmVkIHZhbGlkYXRvci5cbiAgICogSWYgY2FsbGVkIHdpdGggbm8gcGFyYW1ldGVycywgb3IgVFJVRSwgdGhpcyB2YWxpZGF0b3IgcmV0dXJucyB0aGVcbiAgICogJ3JlcXVpcmVkJyB2YWxpZGF0b3IgZnVuY3Rpb24gKHJhdGhlciB0aGFuIGV4ZWN1dGluZyBpdCkuIFRoaXMgbWF0Y2hlc1xuICAgKiB0aGUgYmVoYXZpb3Igb2YgYWxsIG90aGVyIHZhbGlkYXRvcnMgaW4gdGhpcyBsaWJyYXJ5LlxuICAgKlxuICAgKiBJZiB0aGlzIHZhbGlkYXRvciBpcyBjYWxsZWQgd2l0aCBhbiBBYnN0cmFjdENvbnRyb2wgcGFyYW1ldGVyXG4gICAqIChhcyB3YXMgcHJldmlvdXNseSByZXF1aXJlZCkgaXQgYmVoYXZlcyB0aGUgc2FtZSBhcyBBbmd1bGFyJ3MgZGVmYXVsdFxuICAgKiByZXF1aXJlZCB2YWxpZGF0b3IsIGFuZCByZXR1cm5zIGFuIGVycm9yIGlmIHRoZSBjb250cm9sIGlzIGVtcHR5LlxuICAgKlxuICAgKiBCZWhhdmlvcjogKGlmIG5vIGlucHV0LCBvciBpbnB1dCB0eXBlID0gYm9vbGVhbilcbiAgICogcGFyYW0ge2Jvb2xlYW4gPSB0cnVlfSByZXF1aXJlZD8gLSB0cnVlIHRvIHZhbGlkYXRlLCBmYWxzZSB0byBkaXNhYmxlXG4gICAqIHJldHVybiB7SVZhbGlkYXRvckZufSAtIHJldHVybnMgdGhlICdyZXF1aXJlZCcgdmFsaWRhdG9yIGZ1bmN0aW9uIGl0c2VsZlxuICAgKi9cbiAgc3RhdGljIHJlcXVpcmVkKGlucHV0OiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbFxuICBzdGF0aWMgcmVxdWlyZWQoaW5wdXQ/OiBib29sZWFuKTogSVZhbGlkYXRvckZuXG4gIHN0YXRpYyByZXF1aXJlZChpbnB1dD86IEFic3RyYWN0Q29udHJvbCB8IGJvb2xlYW4pOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB8IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKGlucHV0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlucHV0ID0gdHJ1ZVxuICAgIH1cbiAgICBzd2l0Y2ggKGlucHV0KSB7XG4gICAgICBjYXNlIHRydWU6IC8vIFJldHVybiByZXF1aXJlZCBmdW5jdGlvbiAoZG8gbm90IGV4ZWN1dGUgaXQgeWV0KVxuICAgICAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgICAgaWYgKGludmVydCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICB9IC8vIGlmIG5vdCByZXF1aXJlZCwgYWx3YXlzIHJldHVybiB2YWxpZFxuICAgICAgICAgIHJldHVybiBoYXNWYWx1ZShjb250cm9sLnZhbHVlKSA/IG51bGwgOiB7cmVxdWlyZWQ6IHRydWV9XG4gICAgICAgIH1cbiAgICAgIGNhc2UgZmFsc2U6IC8vIERvIG5vdGhpbmcgKGlmIGZpZWxkIGlzIG5vdCByZXF1aXJlZCwgaXQgaXMgYWx3YXlzIHZhbGlkKVxuICAgICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvclxuICAgICAgZGVmYXVsdDogLy8gRXhlY3V0ZSByZXF1aXJlZCBmdW5jdGlvblxuICAgICAgICByZXR1cm4gaGFzVmFsdWUoKGlucHV0IGFzIEFic3RyYWN0Q29udHJvbCkudmFsdWUpID8gbnVsbCA6IHtyZXF1aXJlZDogdHJ1ZX1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ3R5cGUnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wgdG8gb25seSBhY2NlcHQgdmFsdWVzIG9mIGEgc3BlY2lmaWVkIHR5cGUsXG4gICAqIG9yIG9uZSBvZiBhbiBhcnJheSBvZiB0eXBlcy5cbiAgICpcbiAgICogTm90ZTogU2NoZW1hUHJpbWl0aXZlVHlwZSA9ICdzdHJpbmcnfCdudW1iZXInfCdpbnRlZ2VyJ3wnYm9vbGVhbid8J251bGwnXG4gICAqXG4gICAqIEBwYXJhbSByZXF1aXJlZFR5cGUgLSB0eXBlKHMpIHRvIGFjY2VwdFxuICAgKi9cbiAgc3RhdGljIHR5cGUocmVxdWlyZWRUeXBlOiBTY2hlbWFQcmltaXRpdmVUeXBlIHwgU2NoZW1hUHJpbWl0aXZlVHlwZVtdKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKHJlcXVpcmVkVHlwZSkpIHtcbiAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICBjb25zdCBjdXJyZW50VmFsdWU6IGFueSA9IGNvbnRyb2wudmFsdWVcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBpc0FycmF5KHJlcXVpcmVkVHlwZSkgP1xuICAgICAgICAocmVxdWlyZWRUeXBlIGFzIFNjaGVtYVByaW1pdGl2ZVR5cGVbXSkuc29tZSh0eXBlID0+IGlzVHlwZShjdXJyZW50VmFsdWUsIHR5cGUpKSA6XG4gICAgICAgIGlzVHlwZShjdXJyZW50VmFsdWUsIHJlcXVpcmVkVHlwZSBhcyBTY2hlbWFQcmltaXRpdmVUeXBlKVxuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHt0eXBlOiB7cmVxdWlyZWRUeXBlLCBjdXJyZW50VmFsdWV9fVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnZW51bScgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgY29udHJvbCB0byBoYXZlIGEgdmFsdWUgZnJvbSBhbiBlbnVtZXJhdGVkIGxpc3Qgb2YgdmFsdWVzLlxuICAgKlxuICAgKiBDb252ZXJ0cyB0eXBlcyBhcyBuZWVkZWQgdG8gYWxsb3cgc3RyaW5nIGlucHV0cyB0byBzdGlsbCBjb3JyZWN0bHlcbiAgICogbWF0Y2ggbnVtYmVyLCBib29sZWFuLCBhbmQgbnVsbCBlbnVtIHZhbHVlcy5cbiAgICpcbiAgICogQHBhcmFtIGFsbG93ZWRWYWx1ZXMgLSBhcnJheSBvZiBhY2NlcHRhYmxlIHZhbHVlc1xuICAgKi9cbiAgc3RhdGljIGVudW0oYWxsb3dlZFZhbHVlczogYW55W10pOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaXNBcnJheShhbGxvd2VkVmFsdWVzKSkge1xuICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3JcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZTogYW55ID0gY29udHJvbC52YWx1ZVxuICAgICAgY29uc3QgaXNFcXVhbCA9IChlbnVtVmFsdWUsIGlucHV0VmFsdWUpID0+XG4gICAgICAgIGVudW1WYWx1ZSA9PT0gaW5wdXRWYWx1ZSB8fFxuICAgICAgICAoaXNOdW1iZXIoZW51bVZhbHVlKSAmJiAraW5wdXRWYWx1ZSA9PT0gK2VudW1WYWx1ZSkgfHxcbiAgICAgICAgKGlzQm9vbGVhbihlbnVtVmFsdWUsICdzdHJpY3QnKSAmJlxuICAgICAgICAgIHRvSmF2YVNjcmlwdFR5cGUoaW5wdXRWYWx1ZSwgJ2Jvb2xlYW4nKSA9PT0gZW51bVZhbHVlKSB8fFxuICAgICAgICAoZW51bVZhbHVlID09PSBudWxsICYmICFoYXNWYWx1ZShpbnB1dFZhbHVlKSkgfHxcbiAgICAgICAgXy5pc0VxdWFsKGVudW1WYWx1ZSwgaW5wdXRWYWx1ZSlcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBpc0FycmF5KGN1cnJlbnRWYWx1ZSkgP1xuICAgICAgICBjdXJyZW50VmFsdWUuZXZlcnkoaW5wdXRWYWx1ZSA9PiBhbGxvd2VkVmFsdWVzLnNvbWUoZW51bVZhbHVlID0+XG4gICAgICAgICAgaXNFcXVhbChlbnVtVmFsdWUsIGlucHV0VmFsdWUpXG4gICAgICAgICkpIDpcbiAgICAgICAgYWxsb3dlZFZhbHVlcy5zb21lKGVudW1WYWx1ZSA9PiBpc0VxdWFsKGVudW1WYWx1ZSwgY3VycmVudFZhbHVlKSlcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7ZW51bToge2FsbG93ZWRWYWx1ZXMsIGN1cnJlbnRWYWx1ZX19XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdjb25zdCcgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgY29udHJvbCB0byBoYXZlIGEgc3BlY2lmaWMgdmFsdWUuXG4gICAqXG4gICAqIENvbnZlcnRzIHR5cGVzIGFzIG5lZWRlZCB0byBhbGxvdyBzdHJpbmcgaW5wdXRzIHRvIHN0aWxsIGNvcnJlY3RseVxuICAgKiBtYXRjaCBudW1iZXIsIGJvb2xlYW4sIGFuZCBudWxsIHZhbHVlcy5cbiAgICpcbiAgICogVE9ETzogbW9kaWZ5IHRvIHdvcmsgd2l0aCBvYmplY3RzXG4gICAqXG4gICAqIEBwYXJhbSByZXF1aXJlZFZhbHVlIC0gcmVxdWlyZWQgdmFsdWVcbiAgICovXG4gIHN0YXRpYyBjb25zdChyZXF1aXJlZFZhbHVlOiBhbnkpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUocmVxdWlyZWRWYWx1ZSkpIHtcbiAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICBjb25zdCBjdXJyZW50VmFsdWU6IGFueSA9IGNvbnRyb2wudmFsdWVcbiAgICAgIGNvbnN0IGlzRXF1YWwgPSAoY29uc3RWYWx1ZSwgaW5wdXRWYWx1ZSkgPT5cbiAgICAgICAgY29uc3RWYWx1ZSA9PT0gaW5wdXRWYWx1ZSB8fFxuICAgICAgICBpc051bWJlcihjb25zdFZhbHVlKSAmJiAraW5wdXRWYWx1ZSA9PT0gK2NvbnN0VmFsdWUgfHxcbiAgICAgICAgaXNCb29sZWFuKGNvbnN0VmFsdWUsICdzdHJpY3QnKSAmJlxuICAgICAgICB0b0phdmFTY3JpcHRUeXBlKGlucHV0VmFsdWUsICdib29sZWFuJykgPT09IGNvbnN0VmFsdWUgfHxcbiAgICAgICAgY29uc3RWYWx1ZSA9PT0gbnVsbCAmJiAhaGFzVmFsdWUoaW5wdXRWYWx1ZSlcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBpc0VxdWFsKHJlcXVpcmVkVmFsdWUsIGN1cnJlbnRWYWx1ZSlcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7Y29uc3Q6IHtyZXF1aXJlZFZhbHVlLCBjdXJyZW50VmFsdWV9fVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnbWluTGVuZ3RoJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBjb250cm9sJ3MgdGV4dCB2YWx1ZSB0byBiZSBncmVhdGVyIHRoYW4gYSBzcGVjaWZpZWQgbGVuZ3RoLlxuICAgKlxuICAgKiBAcGFyYW0gbWluaW11bUxlbmd0aCAtIG1pbmltdW0gYWxsb3dlZCBzdHJpbmcgbGVuZ3RoXG4gICAqL1xuICBzdGF0aWMgbWluTGVuZ3RoKG1pbmltdW1MZW5ndGg6IG51bWJlcik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShtaW5pbXVtTGVuZ3RoKSkge1xuICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3JcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICAgIGNvbnN0IGN1cnJlbnRMZW5ndGggPSBpc1N0cmluZyhjb250cm9sLnZhbHVlKSA/IGNvbnRyb2wudmFsdWUubGVuZ3RoIDogMFxuICAgICAgY29uc3QgaXNWYWxpZCA9IGN1cnJlbnRMZW5ndGggPj0gbWluaW11bUxlbmd0aFxuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHttaW5MZW5ndGg6IHttaW5pbXVtTGVuZ3RoLCBjdXJyZW50TGVuZ3RofX1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ21heExlbmd0aCcgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgY29udHJvbCdzIHRleHQgdmFsdWUgdG8gYmUgbGVzcyB0aGFuIGEgc3BlY2lmaWVkIGxlbmd0aC5cbiAgICpcbiAgICogQHBhcmFtIG1heGltdW1MZW5ndGggLSBtYXhpbXVtIGFsbG93ZWQgc3RyaW5nIGxlbmd0aFxuICAgKi9cbiAgc3RhdGljIG1heExlbmd0aChtYXhpbXVtTGVuZ3RoOiBudW1iZXIpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUobWF4aW11bUxlbmd0aCkpIHtcbiAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRMZW5ndGggPSBpc1N0cmluZyhjb250cm9sLnZhbHVlKSA/IGNvbnRyb2wudmFsdWUubGVuZ3RoIDogMFxuICAgICAgY29uc3QgaXNWYWxpZCA9IGN1cnJlbnRMZW5ndGggPD0gbWF4aW11bUxlbmd0aFxuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHttYXhMZW5ndGg6IHttYXhpbXVtTGVuZ3RoLCBjdXJyZW50TGVuZ3RofX1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ3BhdHRlcm4nIHZhbGlkYXRvclxuICAgKlxuICAgKiBOb3RlOiBOT1QgdGhlIHNhbWUgYXMgQW5ndWxhcidzIGRlZmF1bHQgcGF0dGVybiB2YWxpZGF0b3IuXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgY29udHJvbCdzIHZhbHVlIHRvIG1hdGNoIGEgc3BlY2lmaWVkIHJlZ3VsYXIgZXhwcmVzc2lvbiBwYXR0ZXJuLlxuICAgKlxuICAgKiBUaGlzIHZhbGlkYXRvciBjaGFuZ2VzIHRoZSBiZWhhdmlvciBvZiBkZWZhdWx0IHBhdHRlcm4gdmFsaWRhdG9yXG4gICAqIGJ5IHJlcGxhY2luZyBSZWdFeHAoYF4ke3BhdHRlcm59JGApIHdpdGggUmVnRXhwKGAke3BhdHRlcm59YCksXG4gICAqIHdoaWNoIGFsbG93cyBmb3IgcGFydGlhbCBtYXRjaGVzLlxuICAgKlxuICAgKiBUbyByZXR1cm4gdG8gdGhlIGRlZmF1bHQgZnVuY3Rpb25hbGl0eSwgYW5kIG1hdGNoIHRoZSBlbnRpcmUgc3RyaW5nLFxuICAgKiBwYXNzIFRSVUUgYXMgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXIuXG4gICAqXG4gICAqIEBwYXJhbSBwYXR0ZXJuIC0gcmVndWxhciBleHByZXNzaW9uIHBhdHRlcm5cbiAgICogQHBhcmFtIHdob2xlU3RyaW5nIC0gbWF0Y2ggd2hvbGUgdmFsdWUgc3RyaW5nP1xuICAgKi9cbiAgc3RhdGljIHBhdHRlcm4ocGF0dGVybjogc3RyaW5nIHwgUmVnRXhwLCB3aG9sZVN0cmluZyA9IGZhbHNlKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKHBhdHRlcm4pKSB7XG4gICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvclxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgbGV0IHJlZ2V4OiBSZWdFeHBcbiAgICAgIGxldCByZXF1aXJlZFBhdHRlcm46IHN0cmluZ1xuICAgICAgaWYgKHR5cGVvZiBwYXR0ZXJuID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXF1aXJlZFBhdHRlcm4gPSAod2hvbGVTdHJpbmcpID8gYF4ke3BhdHRlcm59JGAgOiBwYXR0ZXJuXG4gICAgICAgIHJlZ2V4ID0gbmV3IFJlZ0V4cChyZXF1aXJlZFBhdHRlcm4pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXF1aXJlZFBhdHRlcm4gPSBwYXR0ZXJuLnRvU3RyaW5nKClcbiAgICAgICAgcmVnZXggPSBwYXR0ZXJuXG4gICAgICB9XG4gICAgICBjb25zdCBjdXJyZW50VmFsdWU6IHN0cmluZyA9IGNvbnRyb2wudmFsdWVcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBpc1N0cmluZyhjdXJyZW50VmFsdWUpID8gcmVnZXgudGVzdChjdXJyZW50VmFsdWUpIDogZmFsc2VcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7cGF0dGVybjoge3JlcXVpcmVkUGF0dGVybiwgY3VycmVudFZhbHVlfX1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ2Zvcm1hdCcgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgY29udHJvbCB0byBoYXZlIGEgdmFsdWUgb2YgYSBjZXJ0YWluIGZvcm1hdC5cbiAgICpcbiAgICogVGhpcyB2YWxpZGF0b3IgY3VycmVudGx5IGNoZWNrcyB0aGUgZm9sbG93aW5nIGZvcm1hdHM6XG4gICAqICAgZGF0ZSwgdGltZSwgZGF0ZS10aW1lLCBlbWFpbCwgaG9zdG5hbWUsIGlwdjQsIGlwdjYsXG4gICAqICAgdXJpLCB1cmktcmVmZXJlbmNlLCB1cmktdGVtcGxhdGUsIHVybCwgdXVpZCwgY29sb3IsXG4gICAqICAganNvbi1wb2ludGVyLCByZWxhdGl2ZS1qc29uLXBvaW50ZXIsIHJlZ2V4XG4gICAqXG4gICAqIEZhc3QgZm9ybWF0IHJlZ3VsYXIgZXhwcmVzc2lvbnMgY29waWVkIGZyb20gQUpWOlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vZXBvYmVyZXpraW4vYWp2L2Jsb2IvbWFzdGVyL2xpYi9jb21waWxlL2Zvcm1hdHMuanNcbiAgICpcbiAgICogQHBhcmFtIHJlcXVpcmVkRm9ybWF0IC0gZm9ybWF0IHRvIGNoZWNrXG4gICAqL1xuICBzdGF0aWMgZm9ybWF0KHJlcXVpcmVkRm9ybWF0OiBKc29uU2NoZW1hRm9ybWF0TmFtZXMpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUocmVxdWlyZWRGb3JtYXQpKSB7XG4gICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvclxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgbGV0IGlzVmFsaWQ6IGJvb2xlYW5cbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZTogc3RyaW5nIHwgRGF0ZSA9IGNvbnRyb2wudmFsdWVcbiAgICAgIGlmIChpc1N0cmluZyhjdXJyZW50VmFsdWUpKSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdFRlc3QgPSBqc29uU2NoZW1hRm9ybWF0VGVzdHNbcmVxdWlyZWRGb3JtYXRdXG4gICAgICAgIGlmICh0eXBlb2YgZm9ybWF0VGVzdCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBpc1ZhbGlkID0gKGZvcm1hdFRlc3QgYXMgUmVnRXhwKS50ZXN0KGN1cnJlbnRWYWx1ZSBhcyBzdHJpbmcpXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGZvcm1hdFRlc3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBpc1ZhbGlkID0gZm9ybWF0VGVzdChjdXJyZW50VmFsdWUgYXMgc3RyaW5nKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYGZvcm1hdCB2YWxpZGF0b3IgZXJyb3I6IFwiJHtyZXF1aXJlZEZvcm1hdH1cIiBpcyBub3QgYSByZWNvZ25pemVkIGZvcm1hdC5gKVxuICAgICAgICAgIGlzVmFsaWQgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEFsbG93IEphdmFTY3JpcHQgRGF0ZSBvYmplY3RzXG4gICAgICAgIGlzVmFsaWQgPSBbJ2RhdGUnLCAndGltZScsICdkYXRlLXRpbWUnXS5pbmNsdWRlcyhyZXF1aXJlZEZvcm1hdCkgJiZcbiAgICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoY3VycmVudFZhbHVlKSA9PT0gJ1tvYmplY3QgRGF0ZV0nXG4gICAgICB9XG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDoge2Zvcm1hdDoge3JlcXVpcmVkRm9ybWF0LCBjdXJyZW50VmFsdWV9fVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnbWluaW11bScgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgY29udHJvbCdzIG51bWVyaWMgdmFsdWUgdG8gYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvXG4gICAqIGEgbWluaW11bSBhbW91bnQuXG4gICAqXG4gICAqIEFueSBub24tbnVtZXJpYyB2YWx1ZSBpcyBhbHNvIHZhbGlkIChhY2NvcmRpbmcgdG8gdGhlIEhUTUwgZm9ybXMgc3BlYyxcbiAgICogYSBub24tbnVtZXJpYyB2YWx1ZSBkb2Vzbid0IGhhdmUgYSBtaW5pbXVtKS5cbiAgICogaHR0cHM6Ly93d3cudzMub3JnL1RSL2h0bWw1L2Zvcm1zLmh0bWwjYXR0ci1pbnB1dC1tYXhcbiAgICpcbiAgICogQHBhcmFtIG1pbmltdW1WYWx1ZSAtIG1pbmltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKi9cbiAgc3RhdGljIG1pbmltdW0obWluaW11bVZhbHVlOiBudW1iZXIpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUobWluaW11bVZhbHVlKSkge1xuICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3JcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGNvbnRyb2wudmFsdWVcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSAhaXNOdW1iZXIoY3VycmVudFZhbHVlKSB8fCBjdXJyZW50VmFsdWUgPj0gbWluaW11bVZhbHVlXG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDoge21pbmltdW06IHttaW5pbXVtVmFsdWUsIGN1cnJlbnRWYWx1ZX19XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdleGNsdXNpdmVNaW5pbXVtJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBjb250cm9sJ3MgbnVtZXJpYyB2YWx1ZSB0byBiZSBsZXNzIHRoYW4gYSBtYXhpbXVtIGFtb3VudC5cbiAgICpcbiAgICogQW55IG5vbi1udW1lcmljIHZhbHVlIGlzIGFsc28gdmFsaWQgKGFjY29yZGluZyB0byB0aGUgSFRNTCBmb3JtcyBzcGVjLFxuICAgKiBhIG5vbi1udW1lcmljIHZhbHVlIGRvZXNuJ3QgaGF2ZSBhIG1heGltdW0pLlxuICAgKiBodHRwczovL3d3dy53My5vcmcvVFIvaHRtbDUvZm9ybXMuaHRtbCNhdHRyLWlucHV0LW1heFxuICAgKlxuICAgKiBAcGFyYW0gZXhjbHVzaXZlTWluaW11bVZhbHVlIC0gbWF4aW11bSBhbGxvd2VkIHZhbHVlXG4gICAqL1xuICBzdGF0aWMgZXhjbHVzaXZlTWluaW11bShleGNsdXNpdmVNaW5pbXVtVmFsdWU6IG51bWJlcik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShleGNsdXNpdmVNaW5pbXVtVmFsdWUpKSB7XG4gICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvclxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gY29udHJvbC52YWx1ZVxuICAgICAgY29uc3QgaXNWYWxpZCA9ICFpc051bWJlcihjdXJyZW50VmFsdWUpIHx8ICtjdXJyZW50VmFsdWUgPCBleGNsdXNpdmVNaW5pbXVtVmFsdWVcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7ZXhjbHVzaXZlTWluaW11bToge2V4Y2x1c2l2ZU1pbmltdW1WYWx1ZSwgY3VycmVudFZhbHVlfX1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ21heGltdW0nIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wncyBudW1lcmljIHZhbHVlIHRvIGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0b1xuICAgKiBhIG1heGltdW0gYW1vdW50LlxuICAgKlxuICAgKiBBbnkgbm9uLW51bWVyaWMgdmFsdWUgaXMgYWxzbyB2YWxpZCAoYWNjb3JkaW5nIHRvIHRoZSBIVE1MIGZvcm1zIHNwZWMsXG4gICAqIGEgbm9uLW51bWVyaWMgdmFsdWUgZG9lc24ndCBoYXZlIGEgbWF4aW11bSkuXG4gICAqIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9odG1sNS9mb3Jtcy5odG1sI2F0dHItaW5wdXQtbWF4XG4gICAqXG4gICAqIEBwYXJhbSBtYXhpbXVtVmFsdWUgLSBtYXhpbXVtIGFsbG93ZWQgdmFsdWVcbiAgICovXG4gIHN0YXRpYyBtYXhpbXVtKG1heGltdW1WYWx1ZTogbnVtYmVyKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKG1heGltdW1WYWx1ZSkpIHtcbiAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBjb250cm9sLnZhbHVlXG4gICAgICBjb25zdCBpc1ZhbGlkID0gIWlzTnVtYmVyKGN1cnJlbnRWYWx1ZSkgfHwgK2N1cnJlbnRWYWx1ZSA8PSBtYXhpbXVtVmFsdWVcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7bWF4aW11bToge21heGltdW1WYWx1ZSwgY3VycmVudFZhbHVlfX1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ2V4Y2x1c2l2ZU1heGltdW0nIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wncyBudW1lcmljIHZhbHVlIHRvIGJlIGxlc3MgdGhhbiBhIG1heGltdW0gYW1vdW50LlxuICAgKlxuICAgKiBBbnkgbm9uLW51bWVyaWMgdmFsdWUgaXMgYWxzbyB2YWxpZCAoYWNjb3JkaW5nIHRvIHRoZSBIVE1MIGZvcm1zIHNwZWMsXG4gICAqIGEgbm9uLW51bWVyaWMgdmFsdWUgZG9lc24ndCBoYXZlIGEgbWF4aW11bSkuXG4gICAqIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9odG1sNS9mb3Jtcy5odG1sI2F0dHItaW5wdXQtbWF4XG4gICAqXG4gICAqIEBwYXJhbSBleGNsdXNpdmVNYXhpbXVtVmFsdWUgLSBtYXhpbXVtIGFsbG93ZWQgdmFsdWVcbiAgICovXG4gIHN0YXRpYyBleGNsdXNpdmVNYXhpbXVtKGV4Y2x1c2l2ZU1heGltdW1WYWx1ZTogbnVtYmVyKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKGV4Y2x1c2l2ZU1heGltdW1WYWx1ZSkpIHtcbiAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBjb250cm9sLnZhbHVlXG4gICAgICBjb25zdCBpc1ZhbGlkID0gIWlzTnVtYmVyKGN1cnJlbnRWYWx1ZSkgfHwgK2N1cnJlbnRWYWx1ZSA8IGV4Y2x1c2l2ZU1heGltdW1WYWx1ZVxuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHtleGNsdXNpdmVNYXhpbXVtOiB7ZXhjbHVzaXZlTWF4aW11bVZhbHVlLCBjdXJyZW50VmFsdWV9fVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnbXVsdGlwbGVPZicgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgY29udHJvbCB0byBoYXZlIGEgbnVtZXJpYyB2YWx1ZSB0aGF0IGlzIGEgbXVsdGlwbGVcbiAgICogb2YgYSBzcGVjaWZpZWQgbnVtYmVyLlxuICAgKlxuICAgKiBAcGFyYW0gbXVsdGlwbGVPZlZhbHVlIC0gbnVtYmVyIHZhbHVlIG11c3QgYmUgYSBtdWx0aXBsZSBvZlxuICAgKi9cbiAgc3RhdGljIG11bHRpcGxlT2YobXVsdGlwbGVPZlZhbHVlOiBudW1iZXIpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUobXVsdGlwbGVPZlZhbHVlKSkge1xuICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3JcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGNvbnRyb2wudmFsdWVcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBpc051bWJlcihjdXJyZW50VmFsdWUpICYmXG4gICAgICAgIGN1cnJlbnRWYWx1ZSAlIG11bHRpcGxlT2ZWYWx1ZSA9PT0gMFxuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHttdWx0aXBsZU9mOiB7bXVsdGlwbGVPZlZhbHVlLCBjdXJyZW50VmFsdWV9fVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnbWluUHJvcGVydGllcycgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgZm9ybSBncm91cCB0byBoYXZlIGEgbWluaW11bSBudW1iZXIgb2YgcHJvcGVydGllcyAoaS5lLiBoYXZlXG4gICAqIHZhbHVlcyBlbnRlcmVkIGluIGEgbWluaW11bSBudW1iZXIgb2YgY29udHJvbHMgd2l0aGluIHRoZSBncm91cCkuXG4gICAqXG4gICAqIEBwYXJhbSBtaW5pbXVtUHJvcGVydGllcyAtIG1pbmltdW0gbnVtYmVyIG9mIHByb3BlcnRpZXMgYWxsb3dlZFxuICAgKi9cbiAgc3RhdGljIG1pblByb3BlcnRpZXMobWluaW11bVByb3BlcnRpZXM6IG51bWJlcik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShtaW5pbXVtUHJvcGVydGllcykpIHtcbiAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICBjb25zdCBjdXJyZW50UHJvcGVydGllcyA9IE9iamVjdC5rZXlzKGNvbnRyb2wudmFsdWUpLmxlbmd0aCB8fCAwXG4gICAgICBjb25zdCBpc1ZhbGlkID0gY3VycmVudFByb3BlcnRpZXMgPj0gbWluaW11bVByb3BlcnRpZXNcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7bWluUHJvcGVydGllczoge21pbmltdW1Qcm9wZXJ0aWVzLCBjdXJyZW50UHJvcGVydGllc319XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdtYXhQcm9wZXJ0aWVzJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBmb3JtIGdyb3VwIHRvIGhhdmUgYSBtYXhpbXVtIG51bWJlciBvZiBwcm9wZXJ0aWVzIChpLmUuIGhhdmVcbiAgICogdmFsdWVzIGVudGVyZWQgaW4gYSBtYXhpbXVtIG51bWJlciBvZiBjb250cm9scyB3aXRoaW4gdGhlIGdyb3VwKS5cbiAgICpcbiAgICogTm90ZTogSGFzIG5vIGVmZmVjdCBpZiB0aGUgZm9ybSBncm91cCBkb2VzIG5vdCBjb250YWluIG1vcmUgdGhhbiB0aGVcbiAgICogbWF4aW11bSBudW1iZXIgb2YgY29udHJvbHMuXG4gICAqXG4gICAqIEBwYXJhbSBtYXhpbXVtUHJvcGVydGllcyAtIG1heGltdW0gbnVtYmVyIG9mIHByb3BlcnRpZXMgYWxsb3dlZFxuICAgKi9cbiAgc3RhdGljIG1heFByb3BlcnRpZXMobWF4aW11bVByb3BlcnRpZXM6IG51bWJlcik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShtYXhpbXVtUHJvcGVydGllcykpIHtcbiAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRQcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMoY29udHJvbC52YWx1ZSkubGVuZ3RoIHx8IDBcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBjdXJyZW50UHJvcGVydGllcyA8PSBtYXhpbXVtUHJvcGVydGllc1xuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHttYXhQcm9wZXJ0aWVzOiB7bWF4aW11bVByb3BlcnRpZXMsIGN1cnJlbnRQcm9wZXJ0aWVzfX1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ2RlcGVuZGVuY2llcycgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIHRoZSBjb250cm9scyBpbiBhIGZvcm0gZ3JvdXAgdG8gbWVldCBhZGRpdGlvbmFsIHZhbGlkYXRpb25cbiAgICogY3JpdGVyaWEsIGRlcGVuZGluZyBvbiB0aGUgdmFsdWVzIG9mIG90aGVyIGNvbnRyb2xzIGluIHRoZSBncm91cC5cbiAgICpcbiAgICogRXhhbXBsZXM6XG4gICAqIGh0dHBzOi8vc3BhY2V0ZWxlc2NvcGUuZ2l0aHViLmlvL3VuZGVyc3RhbmRpbmctanNvbi1zY2hlbWEvcmVmZXJlbmNlL29iamVjdC5odG1sI2RlcGVuZGVuY2llc1xuICAgKlxuICAgKiBAcGFyYW0gZGVwZW5kZW5jaWVzIC0gcmVxdWlyZWQgZGVwZW5kZW5jaWVzXG4gICAqL1xuICBzdGF0aWMgZGVwZW5kZW5jaWVzKGRlcGVuZGVuY2llczogYW55KTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoZ2V0VHlwZShkZXBlbmRlbmNpZXMpICE9PSAnb2JqZWN0JyB8fCBpc0VtcHR5KGRlcGVuZGVuY2llcykpIHtcbiAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICBjb25zdCBhbGxFcnJvcnMgPSBtZXJnZU9iamVjdHMoXG4gICAgICAgIGZvckVhY2hDb3B5KGRlcGVuZGVuY2llcywgKHZhbHVlLCByZXF1aXJpbmdGaWVsZCkgPT4ge1xuICAgICAgICAgIGlmICghaGFzVmFsdWUoY29udHJvbC52YWx1ZVtyZXF1aXJpbmdGaWVsZF0pKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgcmVxdWlyaW5nRmllbGRFcnJvcnM6IFZhbGlkYXRpb25FcnJvcnMgPSB7fVxuICAgICAgICAgIGxldCByZXF1aXJlZEZpZWxkczogc3RyaW5nW11cbiAgICAgICAgICBsZXQgcHJvcGVydGllczogVmFsaWRhdGlvbkVycm9ycyA9IHt9XG4gICAgICAgICAgaWYgKGdldFR5cGUoZGVwZW5kZW5jaWVzW3JlcXVpcmluZ0ZpZWxkXSkgPT09ICdhcnJheScpIHtcbiAgICAgICAgICAgIHJlcXVpcmVkRmllbGRzID0gZGVwZW5kZW5jaWVzW3JlcXVpcmluZ0ZpZWxkXVxuICAgICAgICAgIH0gZWxzZSBpZiAoZ2V0VHlwZShkZXBlbmRlbmNpZXNbcmVxdWlyaW5nRmllbGRdKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHJlcXVpcmVkRmllbGRzID0gZGVwZW5kZW5jaWVzW3JlcXVpcmluZ0ZpZWxkXS5yZXF1aXJlZCB8fCBbXVxuICAgICAgICAgICAgcHJvcGVydGllcyA9IGRlcGVuZGVuY2llc1tyZXF1aXJpbmdGaWVsZF0ucHJvcGVydGllcyB8fCB7fVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFZhbGlkYXRlIHByb3BlcnR5IGRlcGVuZGVuY2llc1xuICAgICAgICAgIGZvciAoY29uc3QgcmVxdWlyZWRGaWVsZCBvZiByZXF1aXJlZEZpZWxkcykge1xuICAgICAgICAgICAgaWYgKHhvcighaGFzVmFsdWUoY29udHJvbC52YWx1ZVtyZXF1aXJlZEZpZWxkXSksIGludmVydCkpIHtcbiAgICAgICAgICAgICAgcmVxdWlyaW5nRmllbGRFcnJvcnNbcmVxdWlyZWRGaWVsZF0gPSB7cmVxdWlyZWQ6IHRydWV9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gVmFsaWRhdGUgc2NoZW1hIGRlcGVuZGVuY2llc1xuICAgICAgICAgIHJlcXVpcmluZ0ZpZWxkRXJyb3JzID0gbWVyZ2VPYmplY3RzKHJlcXVpcmluZ0ZpZWxkRXJyb3JzLFxuICAgICAgICAgICAgZm9yRWFjaENvcHkocHJvcGVydGllcywgKHJlcXVpcmVtZW50cywgcmVxdWlyZWRGaWVsZCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCByZXF1aXJlZEZpZWxkRXJyb3JzID0gbWVyZ2VPYmplY3RzKFxuICAgICAgICAgICAgICAgIGZvckVhY2hDb3B5KHJlcXVpcmVtZW50cywgKHJlcXVpcmVtZW50LCBwYXJhbWV0ZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgIGxldCB2YWxpZGF0b3I6IElWYWxpZGF0b3JGbiA9IG51bGxcbiAgICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlbWVudCA9PT0gJ21heGltdW0nIHx8IHJlcXVpcmVtZW50ID09PSAnbWluaW11bScpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhjbHVzaXZlID0gISFyZXF1aXJlbWVudHNbJ2V4Y2x1c2l2ZU0nICsgcmVxdWlyZW1lbnQuc2xpY2UoMSldXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvciA9IEpzb25WYWxpZGF0b3JzW3JlcXVpcmVtZW50XShwYXJhbWV0ZXIsIGV4Y2x1c2l2ZSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIEpzb25WYWxpZGF0b3JzW3JlcXVpcmVtZW50XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3IgPSBKc29uVmFsaWRhdG9yc1tyZXF1aXJlbWVudF0ocGFyYW1ldGVyKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgcmV0dXJuICFpc0RlZmluZWQodmFsaWRhdG9yKSA/XG4gICAgICAgICAgICAgICAgICAgIG51bGwgOiB2YWxpZGF0b3IoY29udHJvbC52YWx1ZVtyZXF1aXJlZEZpZWxkXSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIHJldHVybiBpc0VtcHR5KHJlcXVpcmVkRmllbGRFcnJvcnMpID9cbiAgICAgICAgICAgICAgICBudWxsIDoge1tyZXF1aXJlZEZpZWxkXTogcmVxdWlyZWRGaWVsZEVycm9yc31cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBpc0VtcHR5KHJlcXVpcmluZ0ZpZWxkRXJyb3JzKSA/XG4gICAgICAgICAgICBudWxsIDoge1tyZXF1aXJpbmdGaWVsZF06IHJlcXVpcmluZ0ZpZWxkRXJyb3JzfVxuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgcmV0dXJuIGlzRW1wdHkoYWxsRXJyb3JzKSA/IG51bGwgOiBhbGxFcnJvcnNcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ21pbkl0ZW1zJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBmb3JtIGFycmF5IHRvIGhhdmUgYSBtaW5pbXVtIG51bWJlciBvZiB2YWx1ZXMuXG4gICAqXG4gICAqIEBwYXJhbSBtaW5pbXVtSXRlbXMgLSBtaW5pbXVtIG51bWJlciBvZiBpdGVtcyBhbGxvd2VkXG4gICAqL1xuICBzdGF0aWMgbWluSXRlbXMobWluaW11bUl0ZW1zOiBudW1iZXIpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUobWluaW11bUl0ZW1zKSkge1xuICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3JcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICAgIGNvbnN0IGN1cnJlbnRJdGVtcyA9IGlzQXJyYXkoY29udHJvbC52YWx1ZSkgPyBjb250cm9sLnZhbHVlLmxlbmd0aCA6IDBcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBjdXJyZW50SXRlbXMgPj0gbWluaW11bUl0ZW1zXG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDoge21pbkl0ZW1zOiB7bWluaW11bUl0ZW1zLCBjdXJyZW50SXRlbXN9fVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnbWF4SXRlbXMnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGZvcm0gYXJyYXkgdG8gaGF2ZSBhIG1heGltdW0gbnVtYmVyIG9mIHZhbHVlcy5cbiAgICpcbiAgICogQHBhcmFtIG1heGltdW1JdGVtcyAtIG1heGltdW0gbnVtYmVyIG9mIGl0ZW1zIGFsbG93ZWRcbiAgICovXG4gIHN0YXRpYyBtYXhJdGVtcyhtYXhpbXVtSXRlbXM6IG51bWJlcik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShtYXhpbXVtSXRlbXMpKSB7XG4gICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvclxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50SXRlbXMgPSBpc0FycmF5KGNvbnRyb2wudmFsdWUpID8gY29udHJvbC52YWx1ZS5sZW5ndGggOiAwXG4gICAgICBjb25zdCBpc1ZhbGlkID0gY3VycmVudEl0ZW1zIDw9IG1heGltdW1JdGVtc1xuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHttYXhJdGVtczoge21heGltdW1JdGVtcywgY3VycmVudEl0ZW1zfX1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ3VuaXF1ZUl0ZW1zJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgdmFsdWVzIGluIGEgZm9ybSBhcnJheSB0byBiZSB1bmlxdWUuXG4gICAqXG4gICAqIEBwYXJhbSB1bmlxdWU/IC0gdHJ1ZSB0byB2YWxpZGF0ZSwgZmFsc2UgdG8gZGlzYWJsZVxuICAgKi9cbiAgc3RhdGljIHVuaXF1ZUl0ZW1zKHVuaXF1ZSA9IHRydWUpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghdW5pcXVlKSB7XG4gICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvclxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgY29uc3Qgc29ydGVkOiBhbnlbXSA9IGNvbnRyb2wudmFsdWUuc2xpY2UoKS5zb3J0KClcbiAgICAgIGNvbnN0IGR1cGxpY2F0ZUl0ZW1zID0gW11cbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc29ydGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzb3J0ZWRbaSAtIDFdID09PSBzb3J0ZWRbaV0gJiYgZHVwbGljYXRlSXRlbXMuaW5jbHVkZXMoc29ydGVkW2ldKSkge1xuICAgICAgICAgIGR1cGxpY2F0ZUl0ZW1zLnB1c2goc29ydGVkW2ldKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBpc1ZhbGlkID0gIWR1cGxpY2F0ZUl0ZW1zLmxlbmd0aFxuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHt1bmlxdWVJdGVtczoge2R1cGxpY2F0ZUl0ZW1zfX1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ2NvbnRhaW5zJyB2YWxpZGF0b3JcbiAgICpcbiAgICogVE9ETzogQ29tcGxldGUgdGhpcyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgdmFsdWVzIGluIGEgZm9ybSBhcnJheSB0byBiZSB1bmlxdWUuXG4gICAqXG4gICAqIEBwYXJhbSByZXF1aXJlZEl0ZW0/IC0gdHJ1ZSB0byB2YWxpZGF0ZSwgZmFsc2UgdG8gZGlzYWJsZVxuICAgKi9cbiAgc3RhdGljIGNvbnRhaW5zKHJlcXVpcmVkSXRlbSA9IHRydWUpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghcmVxdWlyZWRJdGVtKSB7XG4gICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvclxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSB8fCAhaXNBcnJheShjb250cm9sLnZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgY29uc3QgY3VycmVudEl0ZW1zID0gY29udHJvbC52YWx1ZVxuICAgICAgLy8gY29uc3QgaXNWYWxpZCA9IGN1cnJlbnRJdGVtcy5zb21lKGl0ZW0gPT5cbiAgICAgIC8vXG4gICAgICAvLyApO1xuICAgICAgY29uc3QgaXNWYWxpZCA9IHRydWVcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7Y29udGFpbnM6IHtyZXF1aXJlZEl0ZW0sIGN1cnJlbnRJdGVtc319XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE5vLW9wIHZhbGlkYXRvci4gSW5jbHVkZWQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkuXG4gICAqL1xuICBzdGF0aWMgbnVsbFZhbGlkYXRvcihjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0b3IgdHJhbnNmb3JtYXRpb24gZnVuY3Rpb25zOlxuICAgKiBjb21wb3NlQW55T2YsIGNvbXBvc2VPbmVPZiwgY29tcG9zZUFsbE9mLCBjb21wb3NlTm90LFxuICAgKiBjb21wb3NlLCBjb21wb3NlQXN5bmNcbiAgICpcbiAgICogVE9ETzogQWRkIGNvbXBvc2VBbnlPZkFzeW5jLCBjb21wb3NlT25lT2ZBc3luYyxcbiAgICogICAgICAgICAgIGNvbXBvc2VBbGxPZkFzeW5jLCBjb21wb3NlTm90QXN5bmNcbiAgICovXG5cbiAgLyoqXG4gICAqICdjb21wb3NlQW55T2YnIHZhbGlkYXRvciBjb21iaW5hdGlvbiBmdW5jdGlvblxuICAgKlxuICAgKiBBY2NlcHRzIGFuIGFycmF5IG9mIHZhbGlkYXRvcnMgYW5kIHJldHVybnMgYSBzaW5nbGUgdmFsaWRhdG9yIHRoYXRcbiAgICogZXZhbHVhdGVzIHRvIHZhbGlkIGlmIGFueSBvbmUgb3IgbW9yZSBvZiB0aGUgc3VibWl0dGVkIHZhbGlkYXRvcnMgYXJlXG4gICAqIHZhbGlkLiBJZiBldmVyeSB2YWxpZGF0b3IgaXMgaW52YWxpZCwgaXQgcmV0dXJucyBjb21iaW5lZCBlcnJvcnMgZnJvbVxuICAgKiBhbGwgdmFsaWRhdG9ycy5cbiAgICpcbiAgICogQHBhcmFtIHZhbGlkYXRvcnMgLSBhcnJheSBvZiB2YWxpZGF0b3JzIHRvIGNvbWJpbmVcbiAgICovXG4gIHN0YXRpYyBjb21wb3NlQW55T2YodmFsaWRhdG9yczogSVZhbGlkYXRvckZuW10pOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghdmFsaWRhdG9ycykge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgY29uc3QgcHJlc2VudFZhbGlkYXRvcnMgPSB2YWxpZGF0b3JzLmZpbHRlcihpc0RlZmluZWQpXG4gICAgaWYgKHByZXNlbnRWYWxpZGF0b3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgY29uc3QgYXJyYXlPZkVycm9ycyA9XG4gICAgICAgIGV4ZWN1dGVWYWxpZGF0b3JzKGNvbnRyb2wsIHByZXNlbnRWYWxpZGF0b3JzLCBpbnZlcnQpLmZpbHRlcihpc0RlZmluZWQpXG4gICAgICBjb25zdCBpc1ZhbGlkID0gdmFsaWRhdG9ycy5sZW5ndGggPiBhcnJheU9mRXJyb3JzLmxlbmd0aFxuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IG1lcmdlT2JqZWN0cyguLi5hcnJheU9mRXJyb3JzLCB7YW55T2Y6ICFpbnZlcnR9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnY29tcG9zZU9uZU9mJyB2YWxpZGF0b3IgY29tYmluYXRpb24gZnVuY3Rpb25cbiAgICpcbiAgICogQWNjZXB0cyBhbiBhcnJheSBvZiB2YWxpZGF0b3JzIGFuZCByZXR1cm5zIGEgc2luZ2xlIHZhbGlkYXRvciB0aGF0XG4gICAqIGV2YWx1YXRlcyB0byB2YWxpZCBvbmx5IGlmIGV4YWN0bHkgb25lIG9mIHRoZSBzdWJtaXR0ZWQgdmFsaWRhdG9yc1xuICAgKiBpcyB2YWxpZC4gT3RoZXJ3aXNlIHJldHVybnMgY29tYmluZWQgaW5mb3JtYXRpb24gZnJvbSBhbGwgdmFsaWRhdG9ycyxcbiAgICogYm90aCB2YWxpZCBhbmQgaW52YWxpZC5cbiAgICpcbiAgICogQHBhcmFtIHZhbGlkYXRvcnMgLSBhcnJheSBvZiB2YWxpZGF0b3JzIHRvIGNvbWJpbmVcbiAgICogQHJldHVybiBzaW5nbGUgY29tYmluZWQgdmFsaWRhdG9yIGZ1bmN0aW9uXG4gICAqL1xuICBzdGF0aWMgY29tcG9zZU9uZU9mKHZhbGlkYXRvcnM6IElWYWxpZGF0b3JGbltdKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIXZhbGlkYXRvcnMpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGNvbnN0IHByZXNlbnRWYWxpZGF0b3JzID0gdmFsaWRhdG9ycy5maWx0ZXIoaXNEZWZpbmVkKVxuICAgIGlmIChwcmVzZW50VmFsaWRhdG9ycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGNvbnN0IGFycmF5T2ZFcnJvcnMgPVxuICAgICAgICBleGVjdXRlVmFsaWRhdG9ycyhjb250cm9sLCBwcmVzZW50VmFsaWRhdG9ycylcbiAgICAgIGNvbnN0IHZhbGlkQ29udHJvbHMgPVxuICAgICAgICB2YWxpZGF0b3JzLmxlbmd0aCAtIGFycmF5T2ZFcnJvcnMuZmlsdGVyKGlzRGVmaW5lZCkubGVuZ3RoXG4gICAgICBjb25zdCBpc1ZhbGlkID0gdmFsaWRDb250cm9scyA9PT0gMVxuICAgICAgaWYgKHhvcihpc1ZhbGlkLCBpbnZlcnQpKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICBjb25zdCBhcnJheU9mVmFsaWRzID1cbiAgICAgICAgZXhlY3V0ZVZhbGlkYXRvcnMoY29udHJvbCwgcHJlc2VudFZhbGlkYXRvcnMsIGludmVydClcbiAgICAgIHJldHVybiBtZXJnZU9iamVjdHMoLi4uYXJyYXlPZkVycm9ycywgLi4uYXJyYXlPZlZhbGlkcywge29uZU9mOiAhaW52ZXJ0fSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ2NvbXBvc2VBbGxPZicgdmFsaWRhdG9yIGNvbWJpbmF0aW9uIGZ1bmN0aW9uXG4gICAqXG4gICAqIEFjY2VwdHMgYW4gYXJyYXkgb2YgdmFsaWRhdG9ycyBhbmQgcmV0dXJucyBhIHNpbmdsZSB2YWxpZGF0b3IgdGhhdFxuICAgKiBldmFsdWF0ZXMgdG8gdmFsaWQgb25seSBpZiBhbGwgdGhlIHN1Ym1pdHRlZCB2YWxpZGF0b3JzIGFyZSBpbmRpdmlkdWFsbHlcbiAgICogdmFsaWQuIE90aGVyd2lzZSBpdCByZXR1cm5zIGNvbWJpbmVkIGVycm9ycyBmcm9tIGFsbCBpbnZhbGlkIHZhbGlkYXRvcnMuXG4gICAqXG4gICAqIEBwYXJhbSB2YWxpZGF0b3JzIC0gYXJyYXkgb2YgdmFsaWRhdG9ycyB0byBjb21iaW5lXG4gICAqIEByZXR1cm4gc2luZ2xlIGNvbWJpbmVkIHZhbGlkYXRvciBmdW5jdGlvblxuICAgKi9cbiAgc3RhdGljIGNvbXBvc2VBbGxPZih2YWxpZGF0b3JzOiBJVmFsaWRhdG9yRm5bXSk6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCF2YWxpZGF0b3JzKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBjb25zdCBwcmVzZW50VmFsaWRhdG9ycyA9IHZhbGlkYXRvcnMuZmlsdGVyKGlzRGVmaW5lZClcbiAgICBpZiAocHJlc2VudFZhbGlkYXRvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBjb25zdCBjb21iaW5lZEVycm9ycyA9IG1lcmdlRXJyb3JzKFxuICAgICAgICBleGVjdXRlVmFsaWRhdG9ycyhjb250cm9sLCBwcmVzZW50VmFsaWRhdG9ycywgaW52ZXJ0KVxuICAgICAgKVxuICAgICAgY29uc3QgaXNWYWxpZCA9IGNvbWJpbmVkRXJyb3JzID09PSBudWxsXG4gICAgICByZXR1cm4gKHhvcihpc1ZhbGlkLCBpbnZlcnQpKSA/XG4gICAgICAgIG51bGwgOiBtZXJnZU9iamVjdHMoY29tYmluZWRFcnJvcnMsIHthbGxPZjogIWludmVydH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdjb21wb3NlTm90JyB2YWxpZGF0b3IgaW52ZXJzaW9uIGZ1bmN0aW9uXG4gICAqXG4gICAqIEFjY2VwdHMgYSBzaW5nbGUgdmFsaWRhdG9yIGZ1bmN0aW9uIGFuZCBpbnZlcnRzIGl0cyByZXN1bHQuXG4gICAqIFJldHVybnMgdmFsaWQgaWYgdGhlIHN1Ym1pdHRlZCB2YWxpZGF0b3IgaXMgaW52YWxpZCwgYW5kXG4gICAqIHJldHVybnMgaW52YWxpZCBpZiB0aGUgc3VibWl0dGVkIHZhbGlkYXRvciBpcyB2YWxpZC5cbiAgICogKE5vdGU6IHRoaXMgZnVuY3Rpb24gY2FuIGl0c2VsZiBiZSBpbnZlcnRlZFxuICAgKiAgIC0gZS5nLiBjb21wb3NlTm90KGNvbXBvc2VOb3QodmFsaWRhdG9yKSkgLVxuICAgKiAgIGJ1dCB0aGlzIGNhbiBiZSBjb25mdXNpbmcgYW5kIGlzIHRoZXJlZm9yZSBub3QgcmVjb21tZW5kZWQuKVxuICAgKlxuICAgKiBAcGFyYW0gdmFsaWRhdG9yIC0gdmFsaWRhdG9yKHMpIHRvIGludmVydFxuICAgKiBAcmV0dXJuIG5ldyB2YWxpZGF0b3IgZnVuY3Rpb24gdGhhdCByZXR1cm5zIG9wcG9zaXRlIHJlc3VsdFxuICAgKi9cbiAgc3RhdGljIGNvbXBvc2VOb3QodmFsaWRhdG9yOiBJVmFsaWRhdG9yRm4pOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghdmFsaWRhdG9yKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgY29uc3QgZXJyb3IgPSB2YWxpZGF0b3IoY29udHJvbCwgIWludmVydClcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBlcnJvciA9PT0gbnVsbFxuICAgICAgcmV0dXJuICh4b3IoaXNWYWxpZCwgaW52ZXJ0KSkgP1xuICAgICAgICBudWxsIDogbWVyZ2VPYmplY3RzKGVycm9yLCB7bm90OiAhaW52ZXJ0fSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ2NvbXBvc2UnIHZhbGlkYXRvciBjb21iaW5hdGlvbiBmdW5jdGlvblxuICAgKlxuICAgKiBAcGFyYW0gdmFsaWRhdG9ycyAtIGFycmF5IG9mIHZhbGlkYXRvcnMgdG8gY29tYmluZVxuICAgKiBAcmV0dXJuIHNpbmdsZSBjb21iaW5lZCB2YWxpZGF0b3IgZnVuY3Rpb25cbiAgICovXG4gIHN0YXRpYyBjb21wb3NlKHZhbGlkYXRvcnM6IElWYWxpZGF0b3JGbltdKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIXZhbGlkYXRvcnMpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGNvbnN0IHByZXNlbnRWYWxpZGF0b3JzID0gdmFsaWRhdG9ycy5maWx0ZXIoaXNEZWZpbmVkKVxuICAgIGlmIChwcmVzZW50VmFsaWRhdG9ycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+XG4gICAgICBtZXJnZUVycm9ycyhleGVjdXRlVmFsaWRhdG9ycyhjb250cm9sLCBwcmVzZW50VmFsaWRhdG9ycywgaW52ZXJ0KSlcbiAgfVxuXG4gIC8qKlxuICAgKiAnY29tcG9zZUFzeW5jJyBhc3luYyB2YWxpZGF0b3IgY29tYmluYXRpb24gZnVuY3Rpb25cbiAgICpcbiAgICogQHBhcmFtIHZhbGlkYXRvcnMgLSBhcnJheSBvZiBhc3luYyB2YWxpZGF0b3JzXG4gICAqIEByZXR1cm4gc2luZ2xlIGNvbWJpbmVkIGFzeW5jIHZhbGlkYXRvciBmdW5jdGlvblxuICAgKi9cbiAgc3RhdGljIGNvbXBvc2VBc3luYyh2YWxpZGF0b3JzOiBBc3luY0lWYWxpZGF0b3JGbltdKTogQXN5bmNJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghdmFsaWRhdG9ycykge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgY29uc3QgcHJlc2VudFZhbGlkYXRvcnMgPSB2YWxpZGF0b3JzLmZpbHRlcihpc0RlZmluZWQpXG4gICAgaWYgKHByZXNlbnRWYWxpZGF0b3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpID0+IHtcbiAgICAgIGNvbnN0IG9ic2VydmFibGVzID1cbiAgICAgICAgZXhlY3V0ZUFzeW5jVmFsaWRhdG9ycyhjb250cm9sLCBwcmVzZW50VmFsaWRhdG9ycykubWFwKHRvT2JzZXJ2YWJsZSlcbiAgICAgIHJldHVybiBtYXAuY2FsbChmb3JrSm9pbihvYnNlcnZhYmxlcyksIG1lcmdlRXJyb3JzKVxuICAgIH1cbiAgfVxuXG4gIC8vIEFkZGl0aW9uYWwgYW5ndWxhciB2YWxpZGF0b3JzIChub3QgdXNlZCBieSBBbmd1YWxyIEpTT04gU2NoZW1hIEZvcm0pXG4gIC8vIEZyb20gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9ibG9iL21hc3Rlci9wYWNrYWdlcy9mb3Jtcy9zcmMvdmFsaWRhdG9ycy50c1xuXG4gIC8qKlxuICAgKiBWYWxpZGF0b3IgdGhhdCByZXF1aXJlcyBjb250cm9scyB0byBoYXZlIGEgdmFsdWUgZ3JlYXRlciB0aGFuIGEgbnVtYmVyLlxuICAgKi9cbiAgc3RhdGljIG1pbihtaW46IG51bWJlcik6IFZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKG1pbikpIHtcbiAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgLy8gZG9uJ3QgdmFsaWRhdGUgZW1wdHkgdmFsdWVzIHRvIGFsbG93IG9wdGlvbmFsIGNvbnRyb2xzXG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSB8fCBpc0VtcHR5KG1pbikpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICAgIGNvbnN0IHZhbHVlID0gcGFyc2VGbG9hdChjb250cm9sLnZhbHVlKVxuICAgICAgY29uc3QgYWN0dWFsID0gY29udHJvbC52YWx1ZVxuICAgICAgLy8gQ29udHJvbHMgd2l0aCBOYU4gdmFsdWVzIGFmdGVyIHBhcnNpbmcgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgbm90IGhhdmluZyBhXG4gICAgICAvLyBtaW5pbXVtLCBwZXIgdGhlIEhUTUwgZm9ybXMgc3BlYzogaHR0cHM6Ly93d3cudzMub3JnL1RSL2h0bWw1L2Zvcm1zLmh0bWwjYXR0ci1pbnB1dC1taW5cbiAgICAgIHJldHVybiBpc05hTih2YWx1ZSkgfHwgdmFsdWUgPj0gbWluID8gbnVsbCA6IHttaW46IHttaW4sIGFjdHVhbH19XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRvciB0aGF0IHJlcXVpcmVzIGNvbnRyb2xzIHRvIGhhdmUgYSB2YWx1ZSBsZXNzIHRoYW4gYSBudW1iZXIuXG4gICAqL1xuICBzdGF0aWMgbWF4KG1heDogbnVtYmVyKTogVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUobWF4KSkge1xuICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3JcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAvLyBkb24ndCB2YWxpZGF0ZSBlbXB0eSB2YWx1ZXMgdG8gYWxsb3cgb3B0aW9uYWwgY29udHJvbHNcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpIHx8IGlzRW1wdHkobWF4KSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgY29uc3QgdmFsdWUgPSBwYXJzZUZsb2F0KGNvbnRyb2wudmFsdWUpXG4gICAgICBjb25zdCBhY3R1YWwgPSBjb250cm9sLnZhbHVlXG4gICAgICAvLyBDb250cm9scyB3aXRoIE5hTiB2YWx1ZXMgYWZ0ZXIgcGFyc2luZyBzaG91bGQgYmUgdHJlYXRlZCBhcyBub3QgaGF2aW5nIGFcbiAgICAgIC8vIG1heGltdW0sIHBlciB0aGUgSFRNTCBmb3JtcyBzcGVjOiBodHRwczovL3d3dy53My5vcmcvVFIvaHRtbDUvZm9ybXMuaHRtbCNhdHRyLWlucHV0LW1heFxuICAgICAgcmV0dXJuIGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA8PSBtYXggPyBudWxsIDoge21heDoge21heCwgYWN0dWFsfX1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdG9yIHRoYXQgcmVxdWlyZXMgY29udHJvbCB2YWx1ZSB0byBiZSB0cnVlLlxuICAgKi9cbiAgc3RhdGljIHJlcXVpcmVkVHJ1ZShjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgaWYgKCFjb250cm9sKSB7XG4gICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvclxuICAgIH1cbiAgICByZXR1cm4gY29udHJvbC52YWx1ZSA9PT0gdHJ1ZSA/IG51bGwgOiB7cmVxdWlyZWQ6IHRydWV9XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdG9yIHRoYXQgcGVyZm9ybXMgZW1haWwgdmFsaWRhdGlvbi5cbiAgICovXG4gIHN0YXRpYyBlbWFpbChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgaWYgKCFjb250cm9sKSB7XG4gICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvclxuICAgIH1cbiAgICBjb25zdCBFTUFJTF9SRUdFWFAgPVxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG1heC1saW5lLWxlbmd0aFxuICAgICAgL14oPz0uezEsMjU0fSQpKD89LnsxLDY0fUApWy0hIyQlJicqKy8wLTk9P0EtWl5fYGEtent8fX5dKyhcXC5bLSEjJCUmJyorLzAtOT0/QS1aXl9gYS16e3x9fl0rKSpAW0EtWmEtejAtOV0oW0EtWmEtejAtOS1dezAsNjF9W0EtWmEtejAtOV0pPyhcXC5bQS1aYS16MC05XShbQS1aYS16MC05LV17MCw2MX1bQS1aYS16MC05XSk/KSokL1xuICAgIHJldHVybiBFTUFJTF9SRUdFWFAudGVzdChjb250cm9sLnZhbHVlKSA/IG51bGwgOiB7ZW1haWw6IHRydWV9XG4gIH1cbn1cbiJdfQ==