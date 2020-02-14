import { forkJoin } from 'rxjs-compat/observable/forkJoin';
import { map } from 'rxjs-compat/operator/map';
import * as _ from 'lodash';
import { executeValidators, executeAsyncValidators, mergeObjects, mergeErrors, isEmpty, isDefined, hasValue, isString, isNumber, isBoolean, isArray, getType, isType, toJavaScriptType, toObservable, xor } from './functions/validator';
import { forEachCopy } from './functions/utility';
import { jsonSchemaFormatTests } from './constants/format-regex.constants';
export class JsonValidators {
    static required(input) {
        if (input === undefined) {
            input = true;
        }
        switch (input) {
            case true:
                return (control, invert = false) => {
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
    }
    static type(requiredType) {
        if (!hasValue(requiredType)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const currentValue = control.value;
            const isValid = isArray(requiredType) ?
                requiredType.some(type => isType(currentValue, type)) :
                isType(currentValue, requiredType);
            return xor(isValid, invert) ?
                null : { type: { requiredType, currentValue } };
        };
    }
    static enum(allowedValues) {
        if (!isArray(allowedValues)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const currentValue = control.value;
            const isEqual = (enumValue, inputValue) => enumValue === inputValue ||
                (isNumber(enumValue) && +inputValue === +enumValue) ||
                (isBoolean(enumValue, 'strict') &&
                    toJavaScriptType(inputValue, 'boolean') === enumValue) ||
                (enumValue === null && !hasValue(inputValue)) ||
                _.isEqual(enumValue, inputValue);
            const isValid = isArray(currentValue) ?
                currentValue.every(inputValue => allowedValues.some(enumValue => isEqual(enumValue, inputValue))) :
                allowedValues.some(enumValue => isEqual(enumValue, currentValue));
            return xor(isValid, invert) ?
                null : { enum: { allowedValues, currentValue } };
        };
    }
    static const(requiredValue) {
        if (!hasValue(requiredValue)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const currentValue = control.value;
            const isEqual = (constValue, inputValue) => constValue === inputValue ||
                isNumber(constValue) && +inputValue === +constValue ||
                isBoolean(constValue, 'strict') &&
                    toJavaScriptType(inputValue, 'boolean') === constValue ||
                constValue === null && !hasValue(inputValue);
            const isValid = isEqual(requiredValue, currentValue);
            return xor(isValid, invert) ?
                null : { const: { requiredValue, currentValue } };
        };
    }
    static minLength(minimumLength) {
        if (!hasValue(minimumLength)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const currentLength = isString(control.value) ? control.value.length : 0;
            const isValid = currentLength >= minimumLength;
            return xor(isValid, invert) ?
                null : { minLength: { minimumLength, currentLength } };
        };
    }
    static maxLength(maximumLength) {
        if (!hasValue(maximumLength)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            const currentLength = isString(control.value) ? control.value.length : 0;
            const isValid = currentLength <= maximumLength;
            return xor(isValid, invert) ?
                null : { maxLength: { maximumLength, currentLength } };
        };
    }
    static pattern(pattern, wholeString = false) {
        if (!hasValue(pattern)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            let regex;
            let requiredPattern;
            if (typeof pattern === 'string') {
                requiredPattern = (wholeString) ? `^${pattern}$` : pattern;
                regex = new RegExp(requiredPattern);
            }
            else {
                requiredPattern = pattern.toString();
                regex = pattern;
            }
            const currentValue = control.value;
            const isValid = isString(currentValue) ? regex.test(currentValue) : false;
            return xor(isValid, invert) ?
                null : { pattern: { requiredPattern, currentValue } };
        };
    }
    static format(requiredFormat) {
        if (!hasValue(requiredFormat)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            let isValid;
            const currentValue = control.value;
            if (isString(currentValue)) {
                const formatTest = jsonSchemaFormatTests[requiredFormat];
                if (typeof formatTest === 'object') {
                    isValid = formatTest.test(currentValue);
                }
                else if (typeof formatTest === 'function') {
                    isValid = formatTest(currentValue);
                }
                else {
                    console.error(`format validator error: "${requiredFormat}" is not a recognized format.`);
                    isValid = true;
                }
            }
            else {
                isValid = ['date', 'time', 'date-time'].includes(requiredFormat) &&
                    Object.prototype.toString.call(currentValue) === '[object Date]';
            }
            return xor(isValid, invert) ?
                null : { format: { requiredFormat, currentValue } };
        };
    }
    static minimum(minimumValue) {
        if (!hasValue(minimumValue)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const currentValue = control.value;
            const isValid = !isNumber(currentValue) || currentValue >= minimumValue;
            return xor(isValid, invert) ?
                null : { minimum: { minimumValue, currentValue } };
        };
    }
    static exclusiveMinimum(exclusiveMinimumValue) {
        if (!hasValue(exclusiveMinimumValue)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const currentValue = control.value;
            const isValid = !isNumber(currentValue) || +currentValue < exclusiveMinimumValue;
            return xor(isValid, invert) ?
                null : { exclusiveMinimum: { exclusiveMinimumValue, currentValue } };
        };
    }
    static maximum(maximumValue) {
        if (!hasValue(maximumValue)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const currentValue = control.value;
            const isValid = !isNumber(currentValue) || +currentValue <= maximumValue;
            return xor(isValid, invert) ?
                null : { maximum: { maximumValue, currentValue } };
        };
    }
    static exclusiveMaximum(exclusiveMaximumValue) {
        if (!hasValue(exclusiveMaximumValue)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const currentValue = control.value;
            const isValid = !isNumber(currentValue) || +currentValue < exclusiveMaximumValue;
            return xor(isValid, invert) ?
                null : { exclusiveMaximum: { exclusiveMaximumValue, currentValue } };
        };
    }
    static multipleOf(multipleOfValue) {
        if (!hasValue(multipleOfValue)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const currentValue = control.value;
            const isValid = isNumber(currentValue) &&
                currentValue % multipleOfValue === 0;
            return xor(isValid, invert) ?
                null : { multipleOf: { multipleOfValue, currentValue } };
        };
    }
    static minProperties(minimumProperties) {
        if (!hasValue(minimumProperties)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const currentProperties = Object.keys(control.value).length || 0;
            const isValid = currentProperties >= minimumProperties;
            return xor(isValid, invert) ?
                null : { minProperties: { minimumProperties, currentProperties } };
        };
    }
    static maxProperties(maximumProperties) {
        if (!hasValue(maximumProperties)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            const currentProperties = Object.keys(control.value).length || 0;
            const isValid = currentProperties <= maximumProperties;
            return xor(isValid, invert) ?
                null : { maxProperties: { maximumProperties, currentProperties } };
        };
    }
    static dependencies(dependencies) {
        if (getType(dependencies) !== 'object' || isEmpty(dependencies)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const allErrors = mergeObjects(forEachCopy(dependencies, (value, requiringField) => {
                if (!hasValue(control.value[requiringField])) {
                    return null;
                }
                let requiringFieldErrors = {};
                let requiredFields;
                let properties = {};
                if (getType(dependencies[requiringField]) === 'array') {
                    requiredFields = dependencies[requiringField];
                }
                else if (getType(dependencies[requiringField]) === 'object') {
                    requiredFields = dependencies[requiringField].required || [];
                    properties = dependencies[requiringField].properties || {};
                }
                for (const requiredField of requiredFields) {
                    if (xor(!hasValue(control.value[requiredField]), invert)) {
                        requiringFieldErrors[requiredField] = { required: true };
                    }
                }
                requiringFieldErrors = mergeObjects(requiringFieldErrors, forEachCopy(properties, (requirements, requiredField) => {
                    const requiredFieldErrors = mergeObjects(forEachCopy(requirements, (requirement, parameter) => {
                        let validator = null;
                        if (requirement === 'maximum' || requirement === 'minimum') {
                            const exclusive = !!requirements['exclusiveM' + requirement.slice(1)];
                            validator = JsonValidators[requirement](parameter, exclusive);
                        }
                        else if (typeof JsonValidators[requirement] === 'function') {
                            validator = JsonValidators[requirement](parameter);
                        }
                        return !isDefined(validator) ?
                            null : validator(control.value[requiredField]);
                    }));
                    return isEmpty(requiredFieldErrors) ?
                        null : { [requiredField]: requiredFieldErrors };
                }));
                return isEmpty(requiringFieldErrors) ?
                    null : { [requiringField]: requiringFieldErrors };
            }));
            return isEmpty(allErrors) ? null : allErrors;
        };
    }
    static minItems(minimumItems) {
        if (!hasValue(minimumItems)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const currentItems = isArray(control.value) ? control.value.length : 0;
            const isValid = currentItems >= minimumItems;
            return xor(isValid, invert) ?
                null : { minItems: { minimumItems, currentItems } };
        };
    }
    static maxItems(maximumItems) {
        if (!hasValue(maximumItems)) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            const currentItems = isArray(control.value) ? control.value.length : 0;
            const isValid = currentItems <= maximumItems;
            return xor(isValid, invert) ?
                null : { maxItems: { maximumItems, currentItems } };
        };
    }
    static uniqueItems(unique = true) {
        if (!unique) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const sorted = control.value.slice().sort();
            const duplicateItems = [];
            for (let i = 1; i < sorted.length; i++) {
                if (sorted[i - 1] === sorted[i] && duplicateItems.includes(sorted[i])) {
                    duplicateItems.push(sorted[i]);
                }
            }
            const isValid = !duplicateItems.length;
            return xor(isValid, invert) ?
                null : { uniqueItems: { duplicateItems } };
        };
    }
    static contains(requiredItem = true) {
        if (!requiredItem) {
            return JsonValidators.nullValidator;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value) || !isArray(control.value)) {
                return null;
            }
            const currentItems = control.value;
            const isValid = true;
            return xor(isValid, invert) ?
                null : { contains: { requiredItem, currentItems } };
        };
    }
    static nullValidator(control) {
        return null;
    }
    static composeAnyOf(validators) {
        if (!validators) {
            return null;
        }
        const presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return (control, invert = false) => {
            const arrayOfErrors = executeValidators(control, presentValidators, invert).filter(isDefined);
            const isValid = validators.length > arrayOfErrors.length;
            return xor(isValid, invert) ?
                null : mergeObjects(...arrayOfErrors, { anyOf: !invert });
        };
    }
    static composeOneOf(validators) {
        if (!validators) {
            return null;
        }
        const presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return (control, invert = false) => {
            const arrayOfErrors = executeValidators(control, presentValidators);
            const validControls = validators.length - arrayOfErrors.filter(isDefined).length;
            const isValid = validControls === 1;
            if (xor(isValid, invert)) {
                return null;
            }
            const arrayOfValids = executeValidators(control, presentValidators, invert);
            return mergeObjects(...arrayOfErrors, ...arrayOfValids, { oneOf: !invert });
        };
    }
    static composeAllOf(validators) {
        if (!validators) {
            return null;
        }
        const presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return (control, invert = false) => {
            const combinedErrors = mergeErrors(executeValidators(control, presentValidators, invert));
            const isValid = combinedErrors === null;
            return (xor(isValid, invert)) ?
                null : mergeObjects(combinedErrors, { allOf: !invert });
        };
    }
    static composeNot(validator) {
        if (!validator) {
            return null;
        }
        return (control, invert = false) => {
            if (isEmpty(control.value)) {
                return null;
            }
            const error = validator(control, !invert);
            const isValid = error === null;
            return (xor(isValid, invert)) ?
                null : mergeObjects(error, { not: !invert });
        };
    }
    static compose(validators) {
        if (!validators) {
            return null;
        }
        const presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return (control, invert = false) => mergeErrors(executeValidators(control, presentValidators, invert));
    }
    static composeAsync(validators) {
        if (!validators) {
            return null;
        }
        const presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return (control) => {
            const observables = executeAsyncValidators(control, presentValidators).map(toObservable);
            return map.call(forkJoin(observables), mergeErrors);
        };
    }
    static min(min) {
        if (!hasValue(min)) {
            return JsonValidators.nullValidator;
        }
        return (control) => {
            if (isEmpty(control.value) || isEmpty(min)) {
                return null;
            }
            const value = parseFloat(control.value);
            const actual = control.value;
            return isNaN(value) || value >= min ? null : { min: { min, actual } };
        };
    }
    static max(max) {
        if (!hasValue(max)) {
            return JsonValidators.nullValidator;
        }
        return (control) => {
            if (isEmpty(control.value) || isEmpty(max)) {
                return null;
            }
            const value = parseFloat(control.value);
            const actual = control.value;
            return isNaN(value) || value <= max ? null : { max: { max, actual } };
        };
    }
    static requiredTrue(control) {
        if (!control) {
            return JsonValidators.nullValidator;
        }
        return control.value === true ? null : { required: true };
    }
    static email(control) {
        if (!control) {
            return JsonValidators.nullValidator;
        }
        const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
        return EMAIL_REGEXP.test(control.value) ? null : { email: true };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi52YWxpZGF0b3JzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdzZi1jb21tb24vIiwic291cmNlcyI6WyJsaWIvanNvbi52YWxpZGF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQTtBQUN4RCxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sMEJBQTBCLENBQUE7QUFFNUMsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUE7QUFFM0IsT0FBTyxFQUNMLGlCQUFpQixFQUFFLHNCQUFzQixFQUFFLFlBQVksRUFBRSxXQUFXLEVBQ3BFLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFDcEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUVyRCxNQUFNLHVCQUF1QixDQUFBO0FBQzlCLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQTtBQUMvQyxPQUFPLEVBQUMscUJBQXFCLEVBQXdCLE1BQU0sb0NBQW9DLENBQUE7QUFpRi9GLE1BQU0sT0FBTyxjQUFjO0lBaUN6QixNQUFNLENBQUMsUUFBUSxDQUFDLEtBQWlDO1FBQy9DLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUN2QixLQUFLLEdBQUcsSUFBSSxDQUFBO1NBQ2I7UUFDRCxRQUFRLEtBQUssRUFBRTtZQUNiLEtBQUssSUFBSTtnQkFDUCxPQUFPLENBQUMsT0FBd0IsRUFBRSxNQUFNLEdBQUcsS0FBSyxFQUEyQixFQUFFO29CQUMzRSxJQUFJLE1BQU0sRUFBRTt3QkFDVixPQUFPLElBQUksQ0FBQTtxQkFDWjtvQkFDRCxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUE7Z0JBQzFELENBQUMsQ0FBQTtZQUNILEtBQUssS0FBSztnQkFDUixPQUFPLGNBQWMsQ0FBQyxhQUFhLENBQUE7WUFDckM7Z0JBQ0UsT0FBTyxRQUFRLENBQUUsS0FBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQTtTQUM5RTtJQUNILENBQUM7SUFZRCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQXlEO1FBQ25FLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDM0IsT0FBTyxjQUFjLENBQUMsYUFBYSxDQUFBO1NBQ3BDO1FBQ0QsT0FBTyxDQUFDLE9BQXdCLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBMkIsRUFBRTtZQUMzRSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzFCLE9BQU8sSUFBSSxDQUFBO2FBQ1o7WUFDRCxNQUFNLFlBQVksR0FBUSxPQUFPLENBQUMsS0FBSyxDQUFBO1lBQ3ZDLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxZQUFzQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRixNQUFNLENBQUMsWUFBWSxFQUFFLFlBQW1DLENBQUMsQ0FBQTtZQUMzRCxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBRSxFQUFDLFlBQVksRUFBRSxZQUFZLEVBQUMsRUFBQyxDQUFBO1FBQy9DLENBQUMsQ0FBQTtJQUNILENBQUM7SUFZRCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQW9CO1FBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDM0IsT0FBTyxjQUFjLENBQUMsYUFBYSxDQUFBO1NBQ3BDO1FBQ0QsT0FBTyxDQUFDLE9BQXdCLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBMkIsRUFBRTtZQUMzRSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzFCLE9BQU8sSUFBSSxDQUFBO2FBQ1o7WUFDRCxNQUFNLFlBQVksR0FBUSxPQUFPLENBQUMsS0FBSyxDQUFBO1lBQ3ZDLE1BQU0sT0FBTyxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQ3hDLFNBQVMsS0FBSyxVQUFVO2dCQUN4QixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxDQUFDLFNBQVMsQ0FBQztnQkFDbkQsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQztvQkFDN0IsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxLQUFLLFNBQVMsQ0FBQztnQkFDeEQsQ0FBQyxTQUFTLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUM3QyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQTtZQUNsQyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDckMsWUFBWSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FDOUQsT0FBTyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FDL0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ0osYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQTtZQUNuRSxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBRSxFQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUMsRUFBQyxDQUFBO1FBQ2hELENBQUMsQ0FBQTtJQUNILENBQUM7SUFjRCxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWtCO1FBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDNUIsT0FBTyxjQUFjLENBQUMsYUFBYSxDQUFBO1NBQ3BDO1FBQ0QsT0FBTyxDQUFDLE9BQXdCLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBMkIsRUFBRTtZQUMzRSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzFCLE9BQU8sSUFBSSxDQUFBO2FBQ1o7WUFDRCxNQUFNLFlBQVksR0FBUSxPQUFPLENBQUMsS0FBSyxDQUFBO1lBQ3ZDLE1BQU0sT0FBTyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQ3pDLFVBQVUsS0FBSyxVQUFVO2dCQUN6QixRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssQ0FBQyxVQUFVO2dCQUNuRCxTQUFTLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQztvQkFDL0IsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxLQUFLLFVBQVU7Z0JBQ3RELFVBQVUsS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDOUMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQTtZQUNwRCxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBRSxFQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUMsRUFBQyxDQUFBO1FBQ2pELENBQUMsQ0FBQTtJQUNILENBQUM7SUFTRCxNQUFNLENBQUMsU0FBUyxDQUFDLGFBQXFCO1FBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDNUIsT0FBTyxjQUFjLENBQUMsYUFBYSxDQUFBO1NBQ3BDO1FBQ0QsT0FBTyxDQUFDLE9BQXdCLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBMkIsRUFBRTtZQUMzRSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzFCLE9BQU8sSUFBSSxDQUFBO2FBQ1o7WUFDRCxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3hFLE1BQU0sT0FBTyxHQUFHLGFBQWEsSUFBSSxhQUFhLENBQUE7WUFDOUMsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxTQUFTLEVBQUUsRUFBQyxhQUFhLEVBQUUsYUFBYSxFQUFDLEVBQUMsQ0FBQTtRQUN0RCxDQUFDLENBQUE7SUFDSCxDQUFDO0lBU0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFxQjtRQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzVCLE9BQU8sY0FBYyxDQUFDLGFBQWEsQ0FBQTtTQUNwQztRQUNELE9BQU8sQ0FBQyxPQUF3QixFQUFFLE1BQU0sR0FBRyxLQUFLLEVBQTJCLEVBQUU7WUFDM0UsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUN4RSxNQUFNLE9BQU8sR0FBRyxhQUFhLElBQUksYUFBYSxDQUFBO1lBQzlDLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsU0FBUyxFQUFFLEVBQUMsYUFBYSxFQUFFLGFBQWEsRUFBQyxFQUFDLENBQUE7UUFDdEQsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQW1CRCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQXdCLEVBQUUsV0FBVyxHQUFHLEtBQUs7UUFDMUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN0QixPQUFPLGNBQWMsQ0FBQyxhQUFhLENBQUE7U0FDcEM7UUFDRCxPQUFPLENBQUMsT0FBd0IsRUFBRSxNQUFNLEdBQUcsS0FBSyxFQUEyQixFQUFFO1lBQzNFLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDMUIsT0FBTyxJQUFJLENBQUE7YUFDWjtZQUNELElBQUksS0FBYSxDQUFBO1lBQ2pCLElBQUksZUFBdUIsQ0FBQTtZQUMzQixJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtnQkFDL0IsZUFBZSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtnQkFDMUQsS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBO2FBQ3BDO2lCQUFNO2dCQUNMLGVBQWUsR0FBRyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUE7Z0JBQ3BDLEtBQUssR0FBRyxPQUFPLENBQUE7YUFDaEI7WUFDRCxNQUFNLFlBQVksR0FBVyxPQUFPLENBQUMsS0FBSyxDQUFBO1lBQzFDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO1lBQ3pFLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsT0FBTyxFQUFFLEVBQUMsZUFBZSxFQUFFLFlBQVksRUFBQyxFQUFDLENBQUE7UUFDckQsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQWlCRCxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQXFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDN0IsT0FBTyxjQUFjLENBQUMsYUFBYSxDQUFBO1NBQ3BDO1FBQ0QsT0FBTyxDQUFDLE9BQXdCLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBMkIsRUFBRTtZQUMzRSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzFCLE9BQU8sSUFBSSxDQUFBO2FBQ1o7WUFDRCxJQUFJLE9BQWdCLENBQUE7WUFDcEIsTUFBTSxZQUFZLEdBQWtCLE9BQU8sQ0FBQyxLQUFLLENBQUE7WUFDakQsSUFBSSxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQzFCLE1BQU0sVUFBVSxHQUFHLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxDQUFBO2dCQUN4RCxJQUFJLE9BQU8sVUFBVSxLQUFLLFFBQVEsRUFBRTtvQkFDbEMsT0FBTyxHQUFJLFVBQXFCLENBQUMsSUFBSSxDQUFDLFlBQXNCLENBQUMsQ0FBQTtpQkFDOUQ7cUJBQU0sSUFBSSxPQUFPLFVBQVUsS0FBSyxVQUFVLEVBQUU7b0JBQzNDLE9BQU8sR0FBRyxVQUFVLENBQUMsWUFBc0IsQ0FBQyxDQUFBO2lCQUM3QztxQkFBTTtvQkFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixjQUFjLCtCQUErQixDQUFDLENBQUE7b0JBQ3hGLE9BQU8sR0FBRyxJQUFJLENBQUE7aUJBQ2Y7YUFDRjtpQkFBTTtnQkFFTCxPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7b0JBQzlELE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxlQUFlLENBQUE7YUFDbkU7WUFDRCxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBRSxFQUFDLGNBQWMsRUFBRSxZQUFZLEVBQUMsRUFBQyxDQUFBO1FBQ25ELENBQUMsQ0FBQTtJQUNILENBQUM7SUFjRCxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQW9CO1FBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDM0IsT0FBTyxjQUFjLENBQUMsYUFBYSxDQUFBO1NBQ3BDO1FBQ0QsT0FBTyxDQUFDLE9BQXdCLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBMkIsRUFBRTtZQUMzRSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzFCLE9BQU8sSUFBSSxDQUFBO2FBQ1o7WUFDRCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFBO1lBQ2xDLE1BQU0sT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLFlBQVksSUFBSSxZQUFZLENBQUE7WUFDdkUsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxPQUFPLEVBQUUsRUFBQyxZQUFZLEVBQUUsWUFBWSxFQUFDLEVBQUMsQ0FBQTtRQUNsRCxDQUFDLENBQUE7SUFDSCxDQUFDO0lBYUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLHFCQUE2QjtRQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLEVBQUU7WUFDcEMsT0FBTyxjQUFjLENBQUMsYUFBYSxDQUFBO1NBQ3BDO1FBQ0QsT0FBTyxDQUFDLE9BQXdCLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBMkIsRUFBRTtZQUMzRSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzFCLE9BQU8sSUFBSSxDQUFBO2FBQ1o7WUFDRCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFBO1lBQ2xDLE1BQU0sT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLHFCQUFxQixDQUFBO1lBQ2hGLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsZ0JBQWdCLEVBQUUsRUFBQyxxQkFBcUIsRUFBRSxZQUFZLEVBQUMsRUFBQyxDQUFBO1FBQ3BFLENBQUMsQ0FBQTtJQUNILENBQUM7SUFjRCxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQW9CO1FBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDM0IsT0FBTyxjQUFjLENBQUMsYUFBYSxDQUFBO1NBQ3BDO1FBQ0QsT0FBTyxDQUFDLE9BQXdCLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBMkIsRUFBRTtZQUMzRSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzFCLE9BQU8sSUFBSSxDQUFBO2FBQ1o7WUFDRCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFBO1lBQ2xDLE1BQU0sT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLFlBQVksQ0FBQTtZQUN4RSxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBRSxFQUFDLFlBQVksRUFBRSxZQUFZLEVBQUMsRUFBQyxDQUFBO1FBQ2xELENBQUMsQ0FBQTtJQUNILENBQUM7SUFhRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMscUJBQTZCO1FBQ25ELElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsRUFBRTtZQUNwQyxPQUFPLGNBQWMsQ0FBQyxhQUFhLENBQUE7U0FDcEM7UUFDRCxPQUFPLENBQUMsT0FBd0IsRUFBRSxNQUFNLEdBQUcsS0FBSyxFQUEyQixFQUFFO1lBQzNFLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDMUIsT0FBTyxJQUFJLENBQUE7YUFDWjtZQUNELE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUE7WUFDbEMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcscUJBQXFCLENBQUE7WUFDaEYsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxnQkFBZ0IsRUFBRSxFQUFDLHFCQUFxQixFQUFFLFlBQVksRUFBQyxFQUFDLENBQUE7UUFDcEUsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQVVELE1BQU0sQ0FBQyxVQUFVLENBQUMsZUFBdUI7UUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUM5QixPQUFPLGNBQWMsQ0FBQyxhQUFhLENBQUE7U0FDcEM7UUFDRCxPQUFPLENBQUMsT0FBd0IsRUFBRSxNQUFNLEdBQUcsS0FBSyxFQUEyQixFQUFFO1lBQzNFLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDMUIsT0FBTyxJQUFJLENBQUE7YUFDWjtZQUNELE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUE7WUFDbEMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQztnQkFDcEMsWUFBWSxHQUFHLGVBQWUsS0FBSyxDQUFDLENBQUE7WUFDdEMsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxVQUFVLEVBQUUsRUFBQyxlQUFlLEVBQUUsWUFBWSxFQUFDLEVBQUMsQ0FBQTtRQUN4RCxDQUFDLENBQUE7SUFDSCxDQUFDO0lBVUQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxpQkFBeUI7UUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1lBQ2hDLE9BQU8sY0FBYyxDQUFDLGFBQWEsQ0FBQTtTQUNwQztRQUNELE9BQU8sQ0FBQyxPQUF3QixFQUFFLE1BQU0sR0FBRyxLQUFLLEVBQTJCLEVBQUU7WUFDM0UsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMxQixPQUFPLElBQUksQ0FBQTthQUNaO1lBQ0QsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFBO1lBQ2hFLE1BQU0sT0FBTyxHQUFHLGlCQUFpQixJQUFJLGlCQUFpQixDQUFBO1lBQ3RELE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsYUFBYSxFQUFFLEVBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUMsRUFBQyxDQUFBO1FBQ2xFLENBQUMsQ0FBQTtJQUNILENBQUM7SUFhRCxNQUFNLENBQUMsYUFBYSxDQUFDLGlCQUF5QjtRQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDaEMsT0FBTyxjQUFjLENBQUMsYUFBYSxDQUFBO1NBQ3BDO1FBQ0QsT0FBTyxDQUFDLE9BQXdCLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBMkIsRUFBRTtZQUMzRSxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUE7WUFDaEUsTUFBTSxPQUFPLEdBQUcsaUJBQWlCLElBQUksaUJBQWlCLENBQUE7WUFDdEQsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxhQUFhLEVBQUUsRUFBQyxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBQyxFQUFDLENBQUE7UUFDbEUsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQWFELE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBaUI7UUFDbkMsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUMvRCxPQUFPLGNBQWMsQ0FBQyxhQUFhLENBQUE7U0FDcEM7UUFDRCxPQUFPLENBQUMsT0FBd0IsRUFBRSxNQUFNLEdBQUcsS0FBSyxFQUEyQixFQUFFO1lBQzNFLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDMUIsT0FBTyxJQUFJLENBQUE7YUFDWjtZQUNELE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FDNUIsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDLEtBQUssRUFBRSxjQUFjLEVBQUUsRUFBRTtnQkFDbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUU7b0JBQzVDLE9BQU8sSUFBSSxDQUFBO2lCQUNaO2dCQUNELElBQUksb0JBQW9CLEdBQXFCLEVBQUUsQ0FBQTtnQkFDL0MsSUFBSSxjQUF3QixDQUFBO2dCQUM1QixJQUFJLFVBQVUsR0FBcUIsRUFBRSxDQUFBO2dCQUNyQyxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUMsS0FBSyxPQUFPLEVBQUU7b0JBQ3JELGNBQWMsR0FBRyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUE7aUJBQzlDO3FCQUFNLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtvQkFDN0QsY0FBYyxHQUFHLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFBO29CQUM1RCxVQUFVLEdBQUcsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUE7aUJBQzNEO2dCQUdELEtBQUssTUFBTSxhQUFhLElBQUksY0FBYyxFQUFFO29CQUMxQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEVBQUU7d0JBQ3hELG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFBO3FCQUN2RDtpQkFDRjtnQkFHRCxvQkFBb0IsR0FBRyxZQUFZLENBQUMsb0JBQW9CLEVBQ3RELFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLEVBQUU7b0JBQ3RELE1BQU0sbUJBQW1CLEdBQUcsWUFBWSxDQUN0QyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxFQUFFO3dCQUNuRCxJQUFJLFNBQVMsR0FBaUIsSUFBSSxDQUFBO3dCQUNsQyxJQUFJLFdBQVcsS0FBSyxTQUFTLElBQUksV0FBVyxLQUFLLFNBQVMsRUFBRTs0QkFDMUQsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBOzRCQUNyRSxTQUFTLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQTt5QkFDOUQ7NkJBQU0sSUFBSSxPQUFPLGNBQWMsQ0FBQyxXQUFXLENBQUMsS0FBSyxVQUFVLEVBQUU7NEJBQzVELFNBQVMsR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUE7eUJBQ25EO3dCQUNELE9BQU8sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDNUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFBO29CQUNsRCxDQUFDLENBQUMsQ0FDSCxDQUFBO29CQUNELE9BQU8sT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQzt3QkFDbkMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsYUFBYSxDQUFDLEVBQUUsbUJBQW1CLEVBQUMsQ0FBQTtnQkFDakQsQ0FBQyxDQUFDLENBQ0gsQ0FBQTtnQkFDRCxPQUFPLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7b0JBQ3BDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFLG9CQUFvQixFQUFDLENBQUE7WUFDbkQsQ0FBQyxDQUFDLENBQ0gsQ0FBQTtZQUNELE9BQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQTtRQUM5QyxDQUFDLENBQUE7SUFDSCxDQUFDO0lBU0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFvQjtRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzNCLE9BQU8sY0FBYyxDQUFDLGFBQWEsQ0FBQTtTQUNwQztRQUNELE9BQU8sQ0FBQyxPQUF3QixFQUFFLE1BQU0sR0FBRyxLQUFLLEVBQTJCLEVBQUU7WUFDM0UsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMxQixPQUFPLElBQUksQ0FBQTthQUNaO1lBQ0QsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUN0RSxNQUFNLE9BQU8sR0FBRyxZQUFZLElBQUksWUFBWSxDQUFBO1lBQzVDLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsUUFBUSxFQUFFLEVBQUMsWUFBWSxFQUFFLFlBQVksRUFBQyxFQUFDLENBQUE7UUFDbkQsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQVNELE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBb0I7UUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUMzQixPQUFPLGNBQWMsQ0FBQyxhQUFhLENBQUE7U0FDcEM7UUFDRCxPQUFPLENBQUMsT0FBd0IsRUFBRSxNQUFNLEdBQUcsS0FBSyxFQUEyQixFQUFFO1lBQzNFLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDdEUsTUFBTSxPQUFPLEdBQUcsWUFBWSxJQUFJLFlBQVksQ0FBQTtZQUM1QyxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBRSxFQUFDLFlBQVksRUFBRSxZQUFZLEVBQUMsRUFBQyxDQUFBO1FBQ25ELENBQUMsQ0FBQTtJQUNILENBQUM7SUFTRCxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJO1FBQzlCLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPLGNBQWMsQ0FBQyxhQUFhLENBQUE7U0FDcEM7UUFDRCxPQUFPLENBQUMsT0FBd0IsRUFBRSxNQUFNLEdBQUcsS0FBSyxFQUEyQixFQUFFO1lBQzNFLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDMUIsT0FBTyxJQUFJLENBQUE7YUFDWjtZQUNELE1BQU0sTUFBTSxHQUFVLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUE7WUFDbEQsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFBO1lBQ3pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN0QyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ3JFLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7aUJBQy9CO2FBQ0Y7WUFDRCxNQUFNLE9BQU8sR0FBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUE7WUFDdEMsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxXQUFXLEVBQUUsRUFBQyxjQUFjLEVBQUMsRUFBQyxDQUFBO1FBQzFDLENBQUMsQ0FBQTtJQUNILENBQUM7SUFXRCxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksR0FBRyxJQUFJO1FBQ2pDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsT0FBTyxjQUFjLENBQUMsYUFBYSxDQUFBO1NBQ3BDO1FBQ0QsT0FBTyxDQUFDLE9BQXdCLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBMkIsRUFBRTtZQUMzRSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNyRCxPQUFPLElBQUksQ0FBQTthQUNaO1lBQ0QsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQTtZQUlsQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUE7WUFDcEIsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxRQUFRLEVBQUUsRUFBQyxZQUFZLEVBQUUsWUFBWSxFQUFDLEVBQUMsQ0FBQTtRQUNuRCxDQUFDLENBQUE7SUFDSCxDQUFDO0lBS0QsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUF3QjtRQUMzQyxPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7SUFxQkQsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUEwQjtRQUM1QyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsT0FBTyxJQUFJLENBQUE7U0FDWjtRQUNELE1BQU0saUJBQWlCLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUN0RCxJQUFJLGlCQUFpQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDbEMsT0FBTyxJQUFJLENBQUE7U0FDWjtRQUNELE9BQU8sQ0FBQyxPQUF3QixFQUFFLE1BQU0sR0FBRyxLQUFLLEVBQTJCLEVBQUU7WUFDM0UsTUFBTSxhQUFhLEdBQ2pCLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDekUsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFBO1lBQ3hELE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLGFBQWEsRUFBRSxFQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUE7UUFDM0QsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQWFELE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBMEI7UUFDNUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNmLE9BQU8sSUFBSSxDQUFBO1NBQ1o7UUFDRCxNQUFNLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDdEQsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2xDLE9BQU8sSUFBSSxDQUFBO1NBQ1o7UUFDRCxPQUFPLENBQUMsT0FBd0IsRUFBRSxNQUFNLEdBQUcsS0FBSyxFQUEyQixFQUFFO1lBQzNFLE1BQU0sYUFBYSxHQUNqQixpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsQ0FBQTtZQUMvQyxNQUFNLGFBQWEsR0FDakIsVUFBVSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtZQUM1RCxNQUFNLE9BQU8sR0FBRyxhQUFhLEtBQUssQ0FBQyxDQUFBO1lBQ25DLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDeEIsT0FBTyxJQUFJLENBQUE7YUFDWjtZQUNELE1BQU0sYUFBYSxHQUNqQixpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUE7WUFDdkQsT0FBTyxZQUFZLENBQUMsR0FBRyxhQUFhLEVBQUUsR0FBRyxhQUFhLEVBQUUsRUFBQyxLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFBO1FBQzNFLENBQUMsQ0FBQTtJQUNILENBQUM7SUFZRCxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQTBCO1FBQzVDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDZixPQUFPLElBQUksQ0FBQTtTQUNaO1FBQ0QsTUFBTSxpQkFBaUIsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3RELElBQUksaUJBQWlCLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNsQyxPQUFPLElBQUksQ0FBQTtTQUNaO1FBQ0QsT0FBTyxDQUFDLE9BQXdCLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBMkIsRUFBRTtZQUMzRSxNQUFNLGNBQWMsR0FBRyxXQUFXLENBQ2hDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FDdEQsQ0FBQTtZQUNELE1BQU0sT0FBTyxHQUFHLGNBQWMsS0FBSyxJQUFJLENBQUE7WUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsRUFBQyxLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFBO1FBQ3pELENBQUMsQ0FBQTtJQUNILENBQUM7SUFlRCxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQXVCO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDZCxPQUFPLElBQUksQ0FBQTtTQUNaO1FBQ0QsT0FBTyxDQUFDLE9BQXdCLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBMkIsRUFBRTtZQUMzRSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzFCLE9BQU8sSUFBSSxDQUFBO2FBQ1o7WUFDRCxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDekMsTUFBTSxPQUFPLEdBQUcsS0FBSyxLQUFLLElBQUksQ0FBQTtZQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxFQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUE7UUFDOUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQVFELE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBMEI7UUFDdkMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNmLE9BQU8sSUFBSSxDQUFBO1NBQ1o7UUFDRCxNQUFNLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDdEQsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2xDLE9BQU8sSUFBSSxDQUFBO1NBQ1o7UUFDRCxPQUFPLENBQUMsT0FBd0IsRUFBRSxNQUFNLEdBQUcsS0FBSyxFQUEyQixFQUFFLENBQzNFLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUN0RSxDQUFDO0lBUUQsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUErQjtRQUNqRCxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsT0FBTyxJQUFJLENBQUE7U0FDWjtRQUNELE1BQU0saUJBQWlCLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUN0RCxJQUFJLGlCQUFpQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDbEMsT0FBTyxJQUFJLENBQUE7U0FDWjtRQUNELE9BQU8sQ0FBQyxPQUF3QixFQUFFLEVBQUU7WUFDbEMsTUFBTSxXQUFXLEdBQ2Ysc0JBQXNCLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO1lBQ3RFLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFDckQsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQVFELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBVztRQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2xCLE9BQU8sY0FBYyxDQUFDLGFBQWEsQ0FBQTtTQUNwQztRQUNELE9BQU8sQ0FBQyxPQUF3QixFQUEyQixFQUFFO1lBRTNELElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzFDLE9BQU8sSUFBSSxDQUFBO2FBQ1o7WUFDRCxNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3ZDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUE7WUFHNUIsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBRSxFQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUMsRUFBQyxDQUFBO1FBQ25FLENBQUMsQ0FBQTtJQUNILENBQUM7SUFLRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQVc7UUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNsQixPQUFPLGNBQWMsQ0FBQyxhQUFhLENBQUE7U0FDcEM7UUFDRCxPQUFPLENBQUMsT0FBd0IsRUFBMkIsRUFBRTtZQUUzRCxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMxQyxPQUFPLElBQUksQ0FBQTthQUNaO1lBQ0QsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUN2QyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFBO1lBRzVCLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUUsRUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFDLEVBQUMsQ0FBQTtRQUNuRSxDQUFDLENBQUE7SUFDSCxDQUFDO0lBS0QsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUF3QjtRQUMxQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osT0FBTyxjQUFjLENBQUMsYUFBYSxDQUFBO1NBQ3BDO1FBQ0QsT0FBTyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQTtJQUN6RCxDQUFDO0lBS0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUF3QjtRQUNuQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osT0FBTyxjQUFjLENBQUMsYUFBYSxDQUFBO1NBQ3BDO1FBQ0QsTUFBTSxZQUFZLEdBRWhCLDRMQUE0TCxDQUFBO1FBQzlMLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUE7SUFDaEUsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBYnN0cmFjdENvbnRyb2wsIFZhbGlkYXRpb25FcnJvcnMsIFZhbGlkYXRvckZufSBmcm9tICdAYW5ndWxhci9mb3JtcydcbmltcG9ydCB7Zm9ya0pvaW59IGZyb20gJ3J4anMtY29tcGF0L29ic2VydmFibGUvZm9ya0pvaW4nXG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy1jb21wYXQvb3BlcmF0b3IvbWFwJ1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCdcblxuaW1wb3J0IHtcbiAgZXhlY3V0ZVZhbGlkYXRvcnMsIGV4ZWN1dGVBc3luY1ZhbGlkYXRvcnMsIG1lcmdlT2JqZWN0cywgbWVyZ2VFcnJvcnMsXG4gIGlzRW1wdHksIGlzRGVmaW5lZCwgaGFzVmFsdWUsIGlzU3RyaW5nLCBpc051bWJlciwgaXNCb29sZWFuLCBpc0FycmF5LFxuICBnZXRUeXBlLCBpc1R5cGUsIHRvSmF2YVNjcmlwdFR5cGUsIHRvT2JzZXJ2YWJsZSwgeG9yLCBTY2hlbWFQcmltaXRpdmVUeXBlLFxuICBJVmFsaWRhdG9yRm4sIEFzeW5jSVZhbGlkYXRvckZuXG59IGZyb20gJy4vZnVuY3Rpb25zL3ZhbGlkYXRvcidcbmltcG9ydCB7Zm9yRWFjaENvcHl9IGZyb20gJy4vZnVuY3Rpb25zL3V0aWxpdHknXG5pbXBvcnQge2pzb25TY2hlbWFGb3JtYXRUZXN0cywgSnNvblNjaGVtYUZvcm1hdE5hbWVzfSBmcm9tICcuL2NvbnN0YW50cy9mb3JtYXQtcmVnZXguY29uc3RhbnRzJ1xuXG4vKipcbiAqICdKc29uVmFsaWRhdG9ycycgY2xhc3NcbiAqXG4gKiBQcm92aWRlcyBhbiBleHRlbmRlZCBzZXQgb2YgdmFsaWRhdG9ycyB0byBiZSB1c2VkIGJ5IGZvcm0gY29udHJvbHMsXG4gKiBjb21wYXRpYmxlIHdpdGggc3RhbmRhcmQgSlNPTiBTY2hlbWEgdmFsaWRhdGlvbiBvcHRpb25zLlxuICogaHR0cDovL2pzb24tc2NoZW1hLm9yZy9sYXRlc3QvanNvbi1zY2hlbWEtdmFsaWRhdGlvbi5odG1sXG4gKlxuICogTm90ZTogVGhpcyBsaWJyYXJ5IGlzIGRlc2lnbmVkIGFzIGEgZHJvcC1pbiByZXBsYWNlbWVudCBmb3IgdGhlIEFuZ3VsYXJcbiAqIFZhbGlkYXRvcnMgbGlicmFyeSwgYW5kIGV4Y2VwdCBmb3Igb25lIHNtYWxsIGJyZWFraW5nIGNoYW5nZSB0byB0aGUgJ3BhdHRlcm4nXG4gKiB2YWxpZGF0b3IgKGRlc2NyaWJlZCBiZWxvdykgaXQgY2FuIGV2ZW4gYmUgaW1wb3J0ZWQgYXMgYSBzdWJzdGl0dXRlLCBsaWtlIHNvOlxuICpcbiAqICAgaW1wb3J0IHsgSnNvblZhbGlkYXRvcnMgYXMgVmFsaWRhdG9ycyB9IGZyb20gJ2pzb24tdmFsaWRhdG9ycyc7XG4gKlxuICogYW5kIGl0IHNob3VsZCB3b3JrIHdpdGggZXhpc3RpbmcgY29kZSBhcyBhIGNvbXBsZXRlIHJlcGxhY2VtZW50LlxuICpcbiAqIFRoZSBvbmUgZXhjZXB0aW9uIGlzIHRoZSAncGF0dGVybicgdmFsaWRhdG9yLCB3aGljaCBoYXMgYmVlbiBjaGFuZ2VkIHRvXG4gKiBtYXRjaCBwYXJ0aWFsIHZhbHVlcyBieSBkZWZhdWx0ICh0aGUgc3RhbmRhcmQgJ3BhdHRlcm4nIHZhbGlkYXRvciB3cmFwcGVkXG4gKiBhbGwgcGF0dGVybnMgaW4gJ14nIGFuZCAnJCcsIGZvcmNpbmcgdGhlbSB0byBhbHdheXMgbWF0Y2ggYW4gZW50aXJlIHZhbHVlKS5cbiAqIEhvd2V2ZXIsIHRoZSBvbGQgYmVoYXZpb3IgY2FuIGJlIHJlc3RvcmVkIGJ5IHNpbXBseSBhZGRpbmcgJ14nIGFuZCAnJCdcbiAqIGFyb3VuZCB5b3VyIHBhdHRlcm5zLCBvciBieSBwYXNzaW5nIGFuIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXIgb2YgVFJVRS5cbiAqIFRoaXMgY2hhbmdlIGlzIHRvIG1ha2UgdGhlICdwYXR0ZXJuJyB2YWxpZGF0b3IgbWF0Y2ggdGhlIGJlaGF2aW9yIG9mIGFcbiAqIEpTT04gU2NoZW1hIHBhdHRlcm4sIHdoaWNoIGFsbG93cyBwYXJ0aWFsIG1hdGNoZXMsIHJhdGhlciB0aGFuIHRoZSBiZWhhdmlvclxuICogb2YgYW4gSFRNTCBpbnB1dCBjb250cm9sIHBhdHRlcm4sIHdoaWNoIGRvZXMgbm90LlxuICpcbiAqIFRoaXMgbGlicmFyeSByZXBsYWNlcyBBbmd1bGFyJ3MgdmFsaWRhdG9ycyBhbmQgY29tYmluYXRpb24gZnVuY3Rpb25zXG4gKiB3aXRoIHRoZSBmb2xsb3dpbmcgdmFsaWRhdG9ycyBhbmQgdHJhbnNmb3JtYXRpb24gZnVuY3Rpb25zOlxuICpcbiAqIFZhbGlkYXRvcnM6XG4gKiAgIEZvciBhbGwgZm9ybUNvbnRyb2xzOiAgICAgcmVxdWlyZWQgKCopLCB0eXBlLCBlbnVtLCBjb25zdFxuICogICBGb3IgdGV4dCBmb3JtQ29udHJvbHM6ICAgIG1pbkxlbmd0aCAoKiksIG1heExlbmd0aCAoKiksIHBhdHRlcm4gKCopLCBmb3JtYXRcbiAqICAgRm9yIG51bWVyaWMgZm9ybUNvbnRyb2xzOiBtYXhpbXVtLCBleGNsdXNpdmVNYXhpbXVtLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW0sIGV4Y2x1c2l2ZU1pbmltdW0sIG11bHRpcGxlT2ZcbiAqICAgRm9yIGZvcm1Hcm91cCBvYmplY3RzOiAgICBtaW5Qcm9wZXJ0aWVzLCBtYXhQcm9wZXJ0aWVzLCBkZXBlbmRlbmNpZXNcbiAqICAgRm9yIGZvcm1BcnJheSBhcnJheXM6ICAgICBtaW5JdGVtcywgbWF4SXRlbXMsIHVuaXF1ZUl0ZW1zLCBjb250YWluc1xuICogICBOb3QgdXNlZCBieSBKU09OIFNjaGVtYTogIG1pbiAoKiksIG1heCAoKiksIHJlcXVpcmVkVHJ1ZSAoKiksIGVtYWlsICgqKVxuICogKFZhbGlkYXRvcnMgb3JpZ2luYWxseSBpbmNsdWRlZCB3aXRoIEFuZ3VsYXIgYXJlIG1hcmtlZCB3aXRoICgqKS4pXG4gKlxuICogTk9URSAvIFRPRE86IFRoZSBkZXBlbmRlbmNpZXMgdmFsaWRhdG9yIGlzIG5vdCBjb21wbGV0ZS5cbiAqIE5PVEUgLyBUT0RPOiBUaGUgY29udGFpbnMgdmFsaWRhdG9yIGlzIG5vdCBjb21wbGV0ZS5cbiAqXG4gKiBWYWxpZGF0b3JzIG5vdCB1c2VkIGJ5IEpTT04gU2NoZW1hIChidXQgaW5jbHVkZWQgZm9yIGNvbXBhdGliaWxpdHkpXG4gKiBhbmQgdGhlaXIgSlNPTiBTY2hlbWEgZXF1aXZhbGVudHM6XG4gKlxuICogICBBbmd1bGFyIHZhbGlkYXRvciB8IEpTT04gU2NoZW1hIGVxdWl2YWxlbnRcbiAqICAgLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgICAgbWluKG51bWJlcikgICAgIHwgICBtaW5pbXVtKG51bWJlcilcbiAqICAgICBtYXgobnVtYmVyKSAgICAgfCAgIG1heGltdW0obnVtYmVyKVxuICogICAgIHJlcXVpcmVkVHJ1ZSgpICB8ICAgY29uc3QodHJ1ZSlcbiAqICAgICBlbWFpbCgpICAgICAgICAgfCAgIGZvcm1hdCgnZW1haWwnKVxuICpcbiAqIFZhbGlkYXRvciB0cmFuc2Zvcm1hdGlvbiBmdW5jdGlvbnM6XG4gKiAgIGNvbXBvc2VBbnlPZiwgY29tcG9zZU9uZU9mLCBjb21wb3NlQWxsT2YsIGNvbXBvc2VOb3RcbiAqIChBbmd1bGFyJ3Mgb3JpZ2luYWwgY29tYmluYXRpb24gZnVuY3Rpb24sICdjb21wb3NlJywgaXMgYWxzbyBpbmNsdWRlZCBmb3JcbiAqIGJhY2t3YXJkIGNvbXBhdGliaWxpdHksIHRob3VnaCBpdCBpcyBmdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBjb21wb3NlQWxsT2YsXG4gKiBhc2lkZSBmcm9tIGl0cyBtb3JlIGdlbmVyaWMgZXJyb3IgbWVzc2FnZS4pXG4gKlxuICogQWxsIHZhbGlkYXRvcnMgaGF2ZSBhbHNvIGJlZW4gZXh0ZW5kZWQgdG8gYWNjZXB0IGFuIG9wdGlvbmFsIHNlY29uZCBhcmd1bWVudFxuICogd2hpY2gsIGlmIHBhc3NlZCBhIFRSVUUgdmFsdWUsIGNhdXNlcyB0aGUgdmFsaWRhdG9yIHRvIHBlcmZvcm0gdGhlIG9wcG9zaXRlXG4gKiBvZiBpdHMgb3JpZ2luYWwgZnVuY3Rpb24uIChUaGlzIGlzIHVzZWQgaW50ZXJuYWxseSB0byBlbmFibGUgJ25vdCcgYW5kXG4gKiAnY29tcG9zZU9uZU9mJyB0byBmdW5jdGlvbiBhbmQgcmV0dXJuIHVzZWZ1bCBlcnJvciBtZXNzYWdlcy4pXG4gKlxuICogVGhlICdyZXF1aXJlZCcgdmFsaWRhdG9yIGhhcyBhbHNvIGJlZW4gb3ZlcmxvYWRlZCBzbyB0aGF0IGlmIGNhbGxlZCB3aXRoXG4gKiBhIGJvb2xlYW4gcGFyYW1ldGVyIChvciBubyBwYXJhbWV0ZXJzKSBpdCByZXR1cm5zIHRoZSBvcmlnaW5hbCB2YWxpZGF0b3JcbiAqIGZ1bmN0aW9uIChyYXRoZXIgdGhhbiBleGVjdXRpbmcgaXQpLiBIb3dldmVyLCBpZiBpdCBpcyBjYWxsZWQgd2l0aCBhblxuICogQWJzdHJhY3RDb250cm9sIHBhcmFtZXRlciAoYXMgd2FzIHByZXZpb3VzbHkgcmVxdWlyZWQpLCBpdCBiZWhhdmVzXG4gKiBleGFjdGx5IGFzIGJlZm9yZS5cbiAqXG4gKiBUaGlzIGVuYWJsZXMgYWxsIHZhbGlkYXRvcnMgKGluY2x1ZGluZyAncmVxdWlyZWQnKSB0byBiZSBjb25zdHJ1Y3RlZCBpblxuICogZXhhY3RseSB0aGUgc2FtZSB3YXksIHNvIHRoZXkgY2FuIGJlIGF1dG9tYXRpY2FsbHkgYXBwbGllZCB1c2luZyB0aGVcbiAqIGVxdWl2YWxlbnQga2V5IG5hbWVzIGFuZCB2YWx1ZXMgdGFrZW4gZGlyZWN0bHkgZnJvbSBhIEpTT04gU2NoZW1hLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgcGFydGlhbGx5IGRlcml2ZWQgZnJvbSBBbmd1bGFyLFxuICogd2hpY2ggaXMgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTcgR29vZ2xlLCBJbmMuXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyB0aGVyZWZvcmUgZ292ZXJuZWQgYnkgdGhlIHNhbWUgTUlULXN0eWxlIGxpY2Vuc2VcbiAqIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqXG4gKiBPcmlnaW5hbCBBbmd1bGFyIFZhbGlkYXRvcnM6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2Jsb2IvbWFzdGVyL3BhY2thZ2VzL2Zvcm1zL3NyYy92YWxpZGF0b3JzLnRzXG4gKi9cbmV4cG9ydCBjbGFzcyBKc29uVmFsaWRhdG9ycyB7XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRvciBmdW5jdGlvbnM6XG4gICAqXG4gICAqIEZvciBhbGwgZm9ybUNvbnRyb2xzOiAgICAgcmVxdWlyZWQsIHR5cGUsIGVudW0sIGNvbnN0XG4gICAqIEZvciB0ZXh0IGZvcm1Db250cm9sczogICAgbWluTGVuZ3RoLCBtYXhMZW5ndGgsIHBhdHRlcm4sIGZvcm1hdFxuICAgKiBGb3IgbnVtZXJpYyBmb3JtQ29udHJvbHM6IG1heGltdW0sIGV4Y2x1c2l2ZU1heGltdW0sXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bSwgZXhjbHVzaXZlTWluaW11bSwgbXVsdGlwbGVPZlxuICAgKiBGb3IgZm9ybUdyb3VwIG9iamVjdHM6ICAgIG1pblByb3BlcnRpZXMsIG1heFByb3BlcnRpZXMsIGRlcGVuZGVuY2llc1xuICAgKiBGb3IgZm9ybUFycmF5IGFycmF5czogICAgIG1pbkl0ZW1zLCBtYXhJdGVtcywgdW5pcXVlSXRlbXMsIGNvbnRhaW5zXG4gICAqXG4gICAqIFRPRE86IGZpbmlzaCBkZXBlbmRlbmNpZXMgdmFsaWRhdG9yXG4gICAqL1xuXG4gIC8qKlxuICAgKiAncmVxdWlyZWQnIHZhbGlkYXRvclxuICAgKlxuICAgKiBUaGlzIHZhbGlkYXRvciBpcyBvdmVybG9hZGVkLCBjb21wYXJlZCB0byB0aGUgZGVmYXVsdCByZXF1aXJlZCB2YWxpZGF0b3IuXG4gICAqIElmIGNhbGxlZCB3aXRoIG5vIHBhcmFtZXRlcnMsIG9yIFRSVUUsIHRoaXMgdmFsaWRhdG9yIHJldHVybnMgdGhlXG4gICAqICdyZXF1aXJlZCcgdmFsaWRhdG9yIGZ1bmN0aW9uIChyYXRoZXIgdGhhbiBleGVjdXRpbmcgaXQpLiBUaGlzIG1hdGNoZXNcbiAgICogdGhlIGJlaGF2aW9yIG9mIGFsbCBvdGhlciB2YWxpZGF0b3JzIGluIHRoaXMgbGlicmFyeS5cbiAgICpcbiAgICogSWYgdGhpcyB2YWxpZGF0b3IgaXMgY2FsbGVkIHdpdGggYW4gQWJzdHJhY3RDb250cm9sIHBhcmFtZXRlclxuICAgKiAoYXMgd2FzIHByZXZpb3VzbHkgcmVxdWlyZWQpIGl0IGJlaGF2ZXMgdGhlIHNhbWUgYXMgQW5ndWxhcidzIGRlZmF1bHRcbiAgICogcmVxdWlyZWQgdmFsaWRhdG9yLCBhbmQgcmV0dXJucyBhbiBlcnJvciBpZiB0aGUgY29udHJvbCBpcyBlbXB0eS5cbiAgICpcbiAgICogQmVoYXZpb3I6IChpZiBubyBpbnB1dCwgb3IgaW5wdXQgdHlwZSA9IGJvb2xlYW4pXG4gICAqIHBhcmFtIHtib29sZWFuID0gdHJ1ZX0gcmVxdWlyZWQ/IC0gdHJ1ZSB0byB2YWxpZGF0ZSwgZmFsc2UgdG8gZGlzYWJsZVxuICAgKiByZXR1cm4ge0lWYWxpZGF0b3JGbn0gLSByZXR1cm5zIHRoZSAncmVxdWlyZWQnIHZhbGlkYXRvciBmdW5jdGlvbiBpdHNlbGZcbiAgICovXG4gIHN0YXRpYyByZXF1aXJlZChpbnB1dDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGxcbiAgc3RhdGljIHJlcXVpcmVkKGlucHV0PzogYm9vbGVhbik6IElWYWxpZGF0b3JGblxuICBzdGF0aWMgcmVxdWlyZWQoaW5wdXQ/OiBBYnN0cmFjdENvbnRyb2wgfCBib29sZWFuKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgfCBJVmFsaWRhdG9yRm4ge1xuICAgIGlmIChpbnB1dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpbnB1dCA9IHRydWVcbiAgICB9XG4gICAgc3dpdGNoIChpbnB1dCkge1xuICAgICAgY2FzZSB0cnVlOiAvLyBSZXR1cm4gcmVxdWlyZWQgZnVuY3Rpb24gKGRvIG5vdCBleGVjdXRlIGl0IHlldClcbiAgICAgICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICAgIGlmIChpbnZlcnQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgfSAvLyBpZiBub3QgcmVxdWlyZWQsIGFsd2F5cyByZXR1cm4gdmFsaWRcbiAgICAgICAgICByZXR1cm4gaGFzVmFsdWUoY29udHJvbC52YWx1ZSkgPyBudWxsIDoge3JlcXVpcmVkOiB0cnVlfVxuICAgICAgICB9XG4gICAgICBjYXNlIGZhbHNlOiAvLyBEbyBub3RoaW5nIChpZiBmaWVsZCBpcyBub3QgcmVxdWlyZWQsIGl0IGlzIGFsd2F5cyB2YWxpZClcbiAgICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3JcbiAgICAgIGRlZmF1bHQ6IC8vIEV4ZWN1dGUgcmVxdWlyZWQgZnVuY3Rpb25cbiAgICAgICAgcmV0dXJuIGhhc1ZhbHVlKChpbnB1dCBhcyBBYnN0cmFjdENvbnRyb2wpLnZhbHVlKSA/IG51bGwgOiB7cmVxdWlyZWQ6IHRydWV9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICd0eXBlJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBjb250cm9sIHRvIG9ubHkgYWNjZXB0IHZhbHVlcyBvZiBhIHNwZWNpZmllZCB0eXBlLFxuICAgKiBvciBvbmUgb2YgYW4gYXJyYXkgb2YgdHlwZXMuXG4gICAqXG4gICAqIE5vdGU6IFNjaGVtYVByaW1pdGl2ZVR5cGUgPSAnc3RyaW5nJ3wnbnVtYmVyJ3wnaW50ZWdlcid8J2Jvb2xlYW4nfCdudWxsJ1xuICAgKlxuICAgKiBAcGFyYW0gcmVxdWlyZWRUeXBlIC0gdHlwZShzKSB0byBhY2NlcHRcbiAgICovXG4gIHN0YXRpYyB0eXBlKHJlcXVpcmVkVHlwZTogU2NoZW1hUHJpbWl0aXZlVHlwZSB8IFNjaGVtYVByaW1pdGl2ZVR5cGVbXSk6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShyZXF1aXJlZFR5cGUpKSB7XG4gICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvclxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgY29uc3QgY3VycmVudFZhbHVlOiBhbnkgPSBjb250cm9sLnZhbHVlXG4gICAgICBjb25zdCBpc1ZhbGlkID0gaXNBcnJheShyZXF1aXJlZFR5cGUpID9cbiAgICAgICAgKHJlcXVpcmVkVHlwZSBhcyBTY2hlbWFQcmltaXRpdmVUeXBlW10pLnNvbWUodHlwZSA9PiBpc1R5cGUoY3VycmVudFZhbHVlLCB0eXBlKSkgOlxuICAgICAgICBpc1R5cGUoY3VycmVudFZhbHVlLCByZXF1aXJlZFR5cGUgYXMgU2NoZW1hUHJpbWl0aXZlVHlwZSlcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7dHlwZToge3JlcXVpcmVkVHlwZSwgY3VycmVudFZhbHVlfX1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ2VudW0nIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wgdG8gaGF2ZSBhIHZhbHVlIGZyb20gYW4gZW51bWVyYXRlZCBsaXN0IG9mIHZhbHVlcy5cbiAgICpcbiAgICogQ29udmVydHMgdHlwZXMgYXMgbmVlZGVkIHRvIGFsbG93IHN0cmluZyBpbnB1dHMgdG8gc3RpbGwgY29ycmVjdGx5XG4gICAqIG1hdGNoIG51bWJlciwgYm9vbGVhbiwgYW5kIG51bGwgZW51bSB2YWx1ZXMuXG4gICAqXG4gICAqIEBwYXJhbSBhbGxvd2VkVmFsdWVzIC0gYXJyYXkgb2YgYWNjZXB0YWJsZSB2YWx1ZXNcbiAgICovXG4gIHN0YXRpYyBlbnVtKGFsbG93ZWRWYWx1ZXM6IGFueVtdKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWlzQXJyYXkoYWxsb3dlZFZhbHVlcykpIHtcbiAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICBjb25zdCBjdXJyZW50VmFsdWU6IGFueSA9IGNvbnRyb2wudmFsdWVcbiAgICAgIGNvbnN0IGlzRXF1YWwgPSAoZW51bVZhbHVlLCBpbnB1dFZhbHVlKSA9PlxuICAgICAgICBlbnVtVmFsdWUgPT09IGlucHV0VmFsdWUgfHxcbiAgICAgICAgKGlzTnVtYmVyKGVudW1WYWx1ZSkgJiYgK2lucHV0VmFsdWUgPT09ICtlbnVtVmFsdWUpIHx8XG4gICAgICAgIChpc0Jvb2xlYW4oZW51bVZhbHVlLCAnc3RyaWN0JykgJiZcbiAgICAgICAgICB0b0phdmFTY3JpcHRUeXBlKGlucHV0VmFsdWUsICdib29sZWFuJykgPT09IGVudW1WYWx1ZSkgfHxcbiAgICAgICAgKGVudW1WYWx1ZSA9PT0gbnVsbCAmJiAhaGFzVmFsdWUoaW5wdXRWYWx1ZSkpIHx8XG4gICAgICAgIF8uaXNFcXVhbChlbnVtVmFsdWUsIGlucHV0VmFsdWUpXG4gICAgICBjb25zdCBpc1ZhbGlkID0gaXNBcnJheShjdXJyZW50VmFsdWUpID9cbiAgICAgICAgY3VycmVudFZhbHVlLmV2ZXJ5KGlucHV0VmFsdWUgPT4gYWxsb3dlZFZhbHVlcy5zb21lKGVudW1WYWx1ZSA9PlxuICAgICAgICAgIGlzRXF1YWwoZW51bVZhbHVlLCBpbnB1dFZhbHVlKVxuICAgICAgICApKSA6XG4gICAgICAgIGFsbG93ZWRWYWx1ZXMuc29tZShlbnVtVmFsdWUgPT4gaXNFcXVhbChlbnVtVmFsdWUsIGN1cnJlbnRWYWx1ZSkpXG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDoge2VudW06IHthbGxvd2VkVmFsdWVzLCBjdXJyZW50VmFsdWV9fVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnY29uc3QnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wgdG8gaGF2ZSBhIHNwZWNpZmljIHZhbHVlLlxuICAgKlxuICAgKiBDb252ZXJ0cyB0eXBlcyBhcyBuZWVkZWQgdG8gYWxsb3cgc3RyaW5nIGlucHV0cyB0byBzdGlsbCBjb3JyZWN0bHlcbiAgICogbWF0Y2ggbnVtYmVyLCBib29sZWFuLCBhbmQgbnVsbCB2YWx1ZXMuXG4gICAqXG4gICAqIFRPRE86IG1vZGlmeSB0byB3b3JrIHdpdGggb2JqZWN0c1xuICAgKlxuICAgKiBAcGFyYW0gcmVxdWlyZWRWYWx1ZSAtIHJlcXVpcmVkIHZhbHVlXG4gICAqL1xuICBzdGF0aWMgY29uc3QocmVxdWlyZWRWYWx1ZTogYW55KTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKHJlcXVpcmVkVmFsdWUpKSB7XG4gICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvclxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgY29uc3QgY3VycmVudFZhbHVlOiBhbnkgPSBjb250cm9sLnZhbHVlXG4gICAgICBjb25zdCBpc0VxdWFsID0gKGNvbnN0VmFsdWUsIGlucHV0VmFsdWUpID0+XG4gICAgICAgIGNvbnN0VmFsdWUgPT09IGlucHV0VmFsdWUgfHxcbiAgICAgICAgaXNOdW1iZXIoY29uc3RWYWx1ZSkgJiYgK2lucHV0VmFsdWUgPT09ICtjb25zdFZhbHVlIHx8XG4gICAgICAgIGlzQm9vbGVhbihjb25zdFZhbHVlLCAnc3RyaWN0JykgJiZcbiAgICAgICAgdG9KYXZhU2NyaXB0VHlwZShpbnB1dFZhbHVlLCAnYm9vbGVhbicpID09PSBjb25zdFZhbHVlIHx8XG4gICAgICAgIGNvbnN0VmFsdWUgPT09IG51bGwgJiYgIWhhc1ZhbHVlKGlucHV0VmFsdWUpXG4gICAgICBjb25zdCBpc1ZhbGlkID0gaXNFcXVhbChyZXF1aXJlZFZhbHVlLCBjdXJyZW50VmFsdWUpXG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDoge2NvbnN0OiB7cmVxdWlyZWRWYWx1ZSwgY3VycmVudFZhbHVlfX1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ21pbkxlbmd0aCcgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgY29udHJvbCdzIHRleHQgdmFsdWUgdG8gYmUgZ3JlYXRlciB0aGFuIGEgc3BlY2lmaWVkIGxlbmd0aC5cbiAgICpcbiAgICogQHBhcmFtIG1pbmltdW1MZW5ndGggLSBtaW5pbXVtIGFsbG93ZWQgc3RyaW5nIGxlbmd0aFxuICAgKi9cbiAgc3RhdGljIG1pbkxlbmd0aChtaW5pbXVtTGVuZ3RoOiBudW1iZXIpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUobWluaW11bUxlbmd0aCkpIHtcbiAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICBjb25zdCBjdXJyZW50TGVuZ3RoID0gaXNTdHJpbmcoY29udHJvbC52YWx1ZSkgPyBjb250cm9sLnZhbHVlLmxlbmd0aCA6IDBcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBjdXJyZW50TGVuZ3RoID49IG1pbmltdW1MZW5ndGhcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7bWluTGVuZ3RoOiB7bWluaW11bUxlbmd0aCwgY3VycmVudExlbmd0aH19XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdtYXhMZW5ndGgnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wncyB0ZXh0IHZhbHVlIHRvIGJlIGxlc3MgdGhhbiBhIHNwZWNpZmllZCBsZW5ndGguXG4gICAqXG4gICAqIEBwYXJhbSBtYXhpbXVtTGVuZ3RoIC0gbWF4aW11bSBhbGxvd2VkIHN0cmluZyBsZW5ndGhcbiAgICovXG4gIHN0YXRpYyBtYXhMZW5ndGgobWF4aW11bUxlbmd0aDogbnVtYmVyKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKG1heGltdW1MZW5ndGgpKSB7XG4gICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvclxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50TGVuZ3RoID0gaXNTdHJpbmcoY29udHJvbC52YWx1ZSkgPyBjb250cm9sLnZhbHVlLmxlbmd0aCA6IDBcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBjdXJyZW50TGVuZ3RoIDw9IG1heGltdW1MZW5ndGhcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7bWF4TGVuZ3RoOiB7bWF4aW11bUxlbmd0aCwgY3VycmVudExlbmd0aH19XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdwYXR0ZXJuJyB2YWxpZGF0b3JcbiAgICpcbiAgICogTm90ZTogTk9UIHRoZSBzYW1lIGFzIEFuZ3VsYXIncyBkZWZhdWx0IHBhdHRlcm4gdmFsaWRhdG9yLlxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wncyB2YWx1ZSB0byBtYXRjaCBhIHNwZWNpZmllZCByZWd1bGFyIGV4cHJlc3Npb24gcGF0dGVybi5cbiAgICpcbiAgICogVGhpcyB2YWxpZGF0b3IgY2hhbmdlcyB0aGUgYmVoYXZpb3Igb2YgZGVmYXVsdCBwYXR0ZXJuIHZhbGlkYXRvclxuICAgKiBieSByZXBsYWNpbmcgUmVnRXhwKGBeJHtwYXR0ZXJufSRgKSB3aXRoIFJlZ0V4cChgJHtwYXR0ZXJufWApLFxuICAgKiB3aGljaCBhbGxvd3MgZm9yIHBhcnRpYWwgbWF0Y2hlcy5cbiAgICpcbiAgICogVG8gcmV0dXJuIHRvIHRoZSBkZWZhdWx0IGZ1bmN0aW9uYWxpdHksIGFuZCBtYXRjaCB0aGUgZW50aXJlIHN0cmluZyxcbiAgICogcGFzcyBUUlVFIGFzIHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyLlxuICAgKlxuICAgKiBAcGFyYW0gcGF0dGVybiAtIHJlZ3VsYXIgZXhwcmVzc2lvbiBwYXR0ZXJuXG4gICAqIEBwYXJhbSB3aG9sZVN0cmluZyAtIG1hdGNoIHdob2xlIHZhbHVlIHN0cmluZz9cbiAgICovXG4gIHN0YXRpYyBwYXR0ZXJuKHBhdHRlcm46IHN0cmluZyB8IFJlZ0V4cCwgd2hvbGVTdHJpbmcgPSBmYWxzZSk6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShwYXR0ZXJuKSkge1xuICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3JcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICAgIGxldCByZWdleDogUmVnRXhwXG4gICAgICBsZXQgcmVxdWlyZWRQYXR0ZXJuOiBzdHJpbmdcbiAgICAgIGlmICh0eXBlb2YgcGF0dGVybiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmVxdWlyZWRQYXR0ZXJuID0gKHdob2xlU3RyaW5nKSA/IGBeJHtwYXR0ZXJufSRgIDogcGF0dGVyblxuICAgICAgICByZWdleCA9IG5ldyBSZWdFeHAocmVxdWlyZWRQYXR0ZXJuKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVxdWlyZWRQYXR0ZXJuID0gcGF0dGVybi50b1N0cmluZygpXG4gICAgICAgIHJlZ2V4ID0gcGF0dGVyblxuICAgICAgfVxuICAgICAgY29uc3QgY3VycmVudFZhbHVlOiBzdHJpbmcgPSBjb250cm9sLnZhbHVlXG4gICAgICBjb25zdCBpc1ZhbGlkID0gaXNTdHJpbmcoY3VycmVudFZhbHVlKSA/IHJlZ2V4LnRlc3QoY3VycmVudFZhbHVlKSA6IGZhbHNlXG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDoge3BhdHRlcm46IHtyZXF1aXJlZFBhdHRlcm4sIGN1cnJlbnRWYWx1ZX19XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdmb3JtYXQnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wgdG8gaGF2ZSBhIHZhbHVlIG9mIGEgY2VydGFpbiBmb3JtYXQuXG4gICAqXG4gICAqIFRoaXMgdmFsaWRhdG9yIGN1cnJlbnRseSBjaGVja3MgdGhlIGZvbGxvd2luZyBmb3JtYXRzOlxuICAgKiAgIGRhdGUsIHRpbWUsIGRhdGUtdGltZSwgZW1haWwsIGhvc3RuYW1lLCBpcHY0LCBpcHY2LFxuICAgKiAgIHVyaSwgdXJpLXJlZmVyZW5jZSwgdXJpLXRlbXBsYXRlLCB1cmwsIHV1aWQsIGNvbG9yLFxuICAgKiAgIGpzb24tcG9pbnRlciwgcmVsYXRpdmUtanNvbi1wb2ludGVyLCByZWdleFxuICAgKlxuICAgKiBGYXN0IGZvcm1hdCByZWd1bGFyIGV4cHJlc3Npb25zIGNvcGllZCBmcm9tIEFKVjpcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL2Vwb2JlcmV6a2luL2Fqdi9ibG9iL21hc3Rlci9saWIvY29tcGlsZS9mb3JtYXRzLmpzXG4gICAqXG4gICAqIEBwYXJhbSByZXF1aXJlZEZvcm1hdCAtIGZvcm1hdCB0byBjaGVja1xuICAgKi9cbiAgc3RhdGljIGZvcm1hdChyZXF1aXJlZEZvcm1hdDogSnNvblNjaGVtYUZvcm1hdE5hbWVzKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKHJlcXVpcmVkRm9ybWF0KSkge1xuICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3JcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICAgIGxldCBpc1ZhbGlkOiBib29sZWFuXG4gICAgICBjb25zdCBjdXJyZW50VmFsdWU6IHN0cmluZyB8IERhdGUgPSBjb250cm9sLnZhbHVlXG4gICAgICBpZiAoaXNTdHJpbmcoY3VycmVudFZhbHVlKSkge1xuICAgICAgICBjb25zdCBmb3JtYXRUZXN0ID0ganNvblNjaGVtYUZvcm1hdFRlc3RzW3JlcXVpcmVkRm9ybWF0XVxuICAgICAgICBpZiAodHlwZW9mIGZvcm1hdFRlc3QgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgaXNWYWxpZCA9IChmb3JtYXRUZXN0IGFzIFJlZ0V4cCkudGVzdChjdXJyZW50VmFsdWUgYXMgc3RyaW5nKVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBmb3JtYXRUZXN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgaXNWYWxpZCA9IGZvcm1hdFRlc3QoY3VycmVudFZhbHVlIGFzIHN0cmluZylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBmb3JtYXQgdmFsaWRhdG9yIGVycm9yOiBcIiR7cmVxdWlyZWRGb3JtYXR9XCIgaXMgbm90IGEgcmVjb2duaXplZCBmb3JtYXQuYClcbiAgICAgICAgICBpc1ZhbGlkID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBbGxvdyBKYXZhU2NyaXB0IERhdGUgb2JqZWN0c1xuICAgICAgICBpc1ZhbGlkID0gWydkYXRlJywgJ3RpbWUnLCAnZGF0ZS10aW1lJ10uaW5jbHVkZXMocmVxdWlyZWRGb3JtYXQpICYmXG4gICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGN1cnJlbnRWYWx1ZSkgPT09ICdbb2JqZWN0IERhdGVdJ1xuICAgICAgfVxuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHtmb3JtYXQ6IHtyZXF1aXJlZEZvcm1hdCwgY3VycmVudFZhbHVlfX1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ21pbmltdW0nIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wncyBudW1lcmljIHZhbHVlIHRvIGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0b1xuICAgKiBhIG1pbmltdW0gYW1vdW50LlxuICAgKlxuICAgKiBBbnkgbm9uLW51bWVyaWMgdmFsdWUgaXMgYWxzbyB2YWxpZCAoYWNjb3JkaW5nIHRvIHRoZSBIVE1MIGZvcm1zIHNwZWMsXG4gICAqIGEgbm9uLW51bWVyaWMgdmFsdWUgZG9lc24ndCBoYXZlIGEgbWluaW11bSkuXG4gICAqIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9odG1sNS9mb3Jtcy5odG1sI2F0dHItaW5wdXQtbWF4XG4gICAqXG4gICAqIEBwYXJhbSBtaW5pbXVtVmFsdWUgLSBtaW5pbXVtIGFsbG93ZWQgdmFsdWVcbiAgICovXG4gIHN0YXRpYyBtaW5pbXVtKG1pbmltdW1WYWx1ZTogbnVtYmVyKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKG1pbmltdW1WYWx1ZSkpIHtcbiAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBjb250cm9sLnZhbHVlXG4gICAgICBjb25zdCBpc1ZhbGlkID0gIWlzTnVtYmVyKGN1cnJlbnRWYWx1ZSkgfHwgY3VycmVudFZhbHVlID49IG1pbmltdW1WYWx1ZVxuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHttaW5pbXVtOiB7bWluaW11bVZhbHVlLCBjdXJyZW50VmFsdWV9fVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnZXhjbHVzaXZlTWluaW11bScgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgY29udHJvbCdzIG51bWVyaWMgdmFsdWUgdG8gYmUgbGVzcyB0aGFuIGEgbWF4aW11bSBhbW91bnQuXG4gICAqXG4gICAqIEFueSBub24tbnVtZXJpYyB2YWx1ZSBpcyBhbHNvIHZhbGlkIChhY2NvcmRpbmcgdG8gdGhlIEhUTUwgZm9ybXMgc3BlYyxcbiAgICogYSBub24tbnVtZXJpYyB2YWx1ZSBkb2Vzbid0IGhhdmUgYSBtYXhpbXVtKS5cbiAgICogaHR0cHM6Ly93d3cudzMub3JnL1RSL2h0bWw1L2Zvcm1zLmh0bWwjYXR0ci1pbnB1dC1tYXhcbiAgICpcbiAgICogQHBhcmFtIGV4Y2x1c2l2ZU1pbmltdW1WYWx1ZSAtIG1heGltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKi9cbiAgc3RhdGljIGV4Y2x1c2l2ZU1pbmltdW0oZXhjbHVzaXZlTWluaW11bVZhbHVlOiBudW1iZXIpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUoZXhjbHVzaXZlTWluaW11bVZhbHVlKSkge1xuICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3JcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGNvbnRyb2wudmFsdWVcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSAhaXNOdW1iZXIoY3VycmVudFZhbHVlKSB8fCArY3VycmVudFZhbHVlIDwgZXhjbHVzaXZlTWluaW11bVZhbHVlXG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDoge2V4Y2x1c2l2ZU1pbmltdW06IHtleGNsdXNpdmVNaW5pbXVtVmFsdWUsIGN1cnJlbnRWYWx1ZX19XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdtYXhpbXVtJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBjb250cm9sJ3MgbnVtZXJpYyB2YWx1ZSB0byBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG9cbiAgICogYSBtYXhpbXVtIGFtb3VudC5cbiAgICpcbiAgICogQW55IG5vbi1udW1lcmljIHZhbHVlIGlzIGFsc28gdmFsaWQgKGFjY29yZGluZyB0byB0aGUgSFRNTCBmb3JtcyBzcGVjLFxuICAgKiBhIG5vbi1udW1lcmljIHZhbHVlIGRvZXNuJ3QgaGF2ZSBhIG1heGltdW0pLlxuICAgKiBodHRwczovL3d3dy53My5vcmcvVFIvaHRtbDUvZm9ybXMuaHRtbCNhdHRyLWlucHV0LW1heFxuICAgKlxuICAgKiBAcGFyYW0gbWF4aW11bVZhbHVlIC0gbWF4aW11bSBhbGxvd2VkIHZhbHVlXG4gICAqL1xuICBzdGF0aWMgbWF4aW11bShtYXhpbXVtVmFsdWU6IG51bWJlcik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShtYXhpbXVtVmFsdWUpKSB7XG4gICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvclxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gY29udHJvbC52YWx1ZVxuICAgICAgY29uc3QgaXNWYWxpZCA9ICFpc051bWJlcihjdXJyZW50VmFsdWUpIHx8ICtjdXJyZW50VmFsdWUgPD0gbWF4aW11bVZhbHVlXG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDoge21heGltdW06IHttYXhpbXVtVmFsdWUsIGN1cnJlbnRWYWx1ZX19XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdleGNsdXNpdmVNYXhpbXVtJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBjb250cm9sJ3MgbnVtZXJpYyB2YWx1ZSB0byBiZSBsZXNzIHRoYW4gYSBtYXhpbXVtIGFtb3VudC5cbiAgICpcbiAgICogQW55IG5vbi1udW1lcmljIHZhbHVlIGlzIGFsc28gdmFsaWQgKGFjY29yZGluZyB0byB0aGUgSFRNTCBmb3JtcyBzcGVjLFxuICAgKiBhIG5vbi1udW1lcmljIHZhbHVlIGRvZXNuJ3QgaGF2ZSBhIG1heGltdW0pLlxuICAgKiBodHRwczovL3d3dy53My5vcmcvVFIvaHRtbDUvZm9ybXMuaHRtbCNhdHRyLWlucHV0LW1heFxuICAgKlxuICAgKiBAcGFyYW0gZXhjbHVzaXZlTWF4aW11bVZhbHVlIC0gbWF4aW11bSBhbGxvd2VkIHZhbHVlXG4gICAqL1xuICBzdGF0aWMgZXhjbHVzaXZlTWF4aW11bShleGNsdXNpdmVNYXhpbXVtVmFsdWU6IG51bWJlcik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShleGNsdXNpdmVNYXhpbXVtVmFsdWUpKSB7XG4gICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvclxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gY29udHJvbC52YWx1ZVxuICAgICAgY29uc3QgaXNWYWxpZCA9ICFpc051bWJlcihjdXJyZW50VmFsdWUpIHx8ICtjdXJyZW50VmFsdWUgPCBleGNsdXNpdmVNYXhpbXVtVmFsdWVcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7ZXhjbHVzaXZlTWF4aW11bToge2V4Y2x1c2l2ZU1heGltdW1WYWx1ZSwgY3VycmVudFZhbHVlfX1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ211bHRpcGxlT2YnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wgdG8gaGF2ZSBhIG51bWVyaWMgdmFsdWUgdGhhdCBpcyBhIG11bHRpcGxlXG4gICAqIG9mIGEgc3BlY2lmaWVkIG51bWJlci5cbiAgICpcbiAgICogQHBhcmFtIG11bHRpcGxlT2ZWYWx1ZSAtIG51bWJlciB2YWx1ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2ZcbiAgICovXG4gIHN0YXRpYyBtdWx0aXBsZU9mKG11bHRpcGxlT2ZWYWx1ZTogbnVtYmVyKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKG11bHRpcGxlT2ZWYWx1ZSkpIHtcbiAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBjb250cm9sLnZhbHVlXG4gICAgICBjb25zdCBpc1ZhbGlkID0gaXNOdW1iZXIoY3VycmVudFZhbHVlKSAmJlxuICAgICAgICBjdXJyZW50VmFsdWUgJSBtdWx0aXBsZU9mVmFsdWUgPT09IDBcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7bXVsdGlwbGVPZjoge211bHRpcGxlT2ZWYWx1ZSwgY3VycmVudFZhbHVlfX1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ21pblByb3BlcnRpZXMnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGZvcm0gZ3JvdXAgdG8gaGF2ZSBhIG1pbmltdW0gbnVtYmVyIG9mIHByb3BlcnRpZXMgKGkuZS4gaGF2ZVxuICAgKiB2YWx1ZXMgZW50ZXJlZCBpbiBhIG1pbmltdW0gbnVtYmVyIG9mIGNvbnRyb2xzIHdpdGhpbiB0aGUgZ3JvdXApLlxuICAgKlxuICAgKiBAcGFyYW0gbWluaW11bVByb3BlcnRpZXMgLSBtaW5pbXVtIG51bWJlciBvZiBwcm9wZXJ0aWVzIGFsbG93ZWRcbiAgICovXG4gIHN0YXRpYyBtaW5Qcm9wZXJ0aWVzKG1pbmltdW1Qcm9wZXJ0aWVzOiBudW1iZXIpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUobWluaW11bVByb3BlcnRpZXMpKSB7XG4gICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvclxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgY29uc3QgY3VycmVudFByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhjb250cm9sLnZhbHVlKS5sZW5ndGggfHwgMFxuICAgICAgY29uc3QgaXNWYWxpZCA9IGN1cnJlbnRQcm9wZXJ0aWVzID49IG1pbmltdW1Qcm9wZXJ0aWVzXG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDoge21pblByb3BlcnRpZXM6IHttaW5pbXVtUHJvcGVydGllcywgY3VycmVudFByb3BlcnRpZXN9fVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnbWF4UHJvcGVydGllcycgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgZm9ybSBncm91cCB0byBoYXZlIGEgbWF4aW11bSBudW1iZXIgb2YgcHJvcGVydGllcyAoaS5lLiBoYXZlXG4gICAqIHZhbHVlcyBlbnRlcmVkIGluIGEgbWF4aW11bSBudW1iZXIgb2YgY29udHJvbHMgd2l0aGluIHRoZSBncm91cCkuXG4gICAqXG4gICAqIE5vdGU6IEhhcyBubyBlZmZlY3QgaWYgdGhlIGZvcm0gZ3JvdXAgZG9lcyBub3QgY29udGFpbiBtb3JlIHRoYW4gdGhlXG4gICAqIG1heGltdW0gbnVtYmVyIG9mIGNvbnRyb2xzLlxuICAgKlxuICAgKiBAcGFyYW0gbWF4aW11bVByb3BlcnRpZXMgLSBtYXhpbXVtIG51bWJlciBvZiBwcm9wZXJ0aWVzIGFsbG93ZWRcbiAgICovXG4gIHN0YXRpYyBtYXhQcm9wZXJ0aWVzKG1heGltdW1Qcm9wZXJ0aWVzOiBudW1iZXIpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUobWF4aW11bVByb3BlcnRpZXMpKSB7XG4gICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvclxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50UHJvcGVydGllcyA9IE9iamVjdC5rZXlzKGNvbnRyb2wudmFsdWUpLmxlbmd0aCB8fCAwXG4gICAgICBjb25zdCBpc1ZhbGlkID0gY3VycmVudFByb3BlcnRpZXMgPD0gbWF4aW11bVByb3BlcnRpZXNcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7bWF4UHJvcGVydGllczoge21heGltdW1Qcm9wZXJ0aWVzLCBjdXJyZW50UHJvcGVydGllc319XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdkZXBlbmRlbmNpZXMnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyB0aGUgY29udHJvbHMgaW4gYSBmb3JtIGdyb3VwIHRvIG1lZXQgYWRkaXRpb25hbCB2YWxpZGF0aW9uXG4gICAqIGNyaXRlcmlhLCBkZXBlbmRpbmcgb24gdGhlIHZhbHVlcyBvZiBvdGhlciBjb250cm9scyBpbiB0aGUgZ3JvdXAuXG4gICAqXG4gICAqIEV4YW1wbGVzOlxuICAgKiBodHRwczovL3NwYWNldGVsZXNjb3BlLmdpdGh1Yi5pby91bmRlcnN0YW5kaW5nLWpzb24tc2NoZW1hL3JlZmVyZW5jZS9vYmplY3QuaHRtbCNkZXBlbmRlbmNpZXNcbiAgICpcbiAgICogQHBhcmFtIGRlcGVuZGVuY2llcyAtIHJlcXVpcmVkIGRlcGVuZGVuY2llc1xuICAgKi9cbiAgc3RhdGljIGRlcGVuZGVuY2llcyhkZXBlbmRlbmNpZXM6IGFueSk6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKGdldFR5cGUoZGVwZW5kZW5jaWVzKSAhPT0gJ29iamVjdCcgfHwgaXNFbXB0eShkZXBlbmRlbmNpZXMpKSB7XG4gICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvclxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgY29uc3QgYWxsRXJyb3JzID0gbWVyZ2VPYmplY3RzKFxuICAgICAgICBmb3JFYWNoQ29weShkZXBlbmRlbmNpZXMsICh2YWx1ZSwgcmVxdWlyaW5nRmllbGQpID0+IHtcbiAgICAgICAgICBpZiAoIWhhc1ZhbHVlKGNvbnRyb2wudmFsdWVbcmVxdWlyaW5nRmllbGRdKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IHJlcXVpcmluZ0ZpZWxkRXJyb3JzOiBWYWxpZGF0aW9uRXJyb3JzID0ge31cbiAgICAgICAgICBsZXQgcmVxdWlyZWRGaWVsZHM6IHN0cmluZ1tdXG4gICAgICAgICAgbGV0IHByb3BlcnRpZXM6IFZhbGlkYXRpb25FcnJvcnMgPSB7fVxuICAgICAgICAgIGlmIChnZXRUeXBlKGRlcGVuZGVuY2llc1tyZXF1aXJpbmdGaWVsZF0pID09PSAnYXJyYXknKSB7XG4gICAgICAgICAgICByZXF1aXJlZEZpZWxkcyA9IGRlcGVuZGVuY2llc1tyZXF1aXJpbmdGaWVsZF1cbiAgICAgICAgICB9IGVsc2UgaWYgKGdldFR5cGUoZGVwZW5kZW5jaWVzW3JlcXVpcmluZ0ZpZWxkXSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXF1aXJlZEZpZWxkcyA9IGRlcGVuZGVuY2llc1tyZXF1aXJpbmdGaWVsZF0ucmVxdWlyZWQgfHwgW11cbiAgICAgICAgICAgIHByb3BlcnRpZXMgPSBkZXBlbmRlbmNpZXNbcmVxdWlyaW5nRmllbGRdLnByb3BlcnRpZXMgfHwge31cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBWYWxpZGF0ZSBwcm9wZXJ0eSBkZXBlbmRlbmNpZXNcbiAgICAgICAgICBmb3IgKGNvbnN0IHJlcXVpcmVkRmllbGQgb2YgcmVxdWlyZWRGaWVsZHMpIHtcbiAgICAgICAgICAgIGlmICh4b3IoIWhhc1ZhbHVlKGNvbnRyb2wudmFsdWVbcmVxdWlyZWRGaWVsZF0pLCBpbnZlcnQpKSB7XG4gICAgICAgICAgICAgIHJlcXVpcmluZ0ZpZWxkRXJyb3JzW3JlcXVpcmVkRmllbGRdID0ge3JlcXVpcmVkOiB0cnVlfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFZhbGlkYXRlIHNjaGVtYSBkZXBlbmRlbmNpZXNcbiAgICAgICAgICByZXF1aXJpbmdGaWVsZEVycm9ycyA9IG1lcmdlT2JqZWN0cyhyZXF1aXJpbmdGaWVsZEVycm9ycyxcbiAgICAgICAgICAgIGZvckVhY2hDb3B5KHByb3BlcnRpZXMsIChyZXF1aXJlbWVudHMsIHJlcXVpcmVkRmllbGQpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgcmVxdWlyZWRGaWVsZEVycm9ycyA9IG1lcmdlT2JqZWN0cyhcbiAgICAgICAgICAgICAgICBmb3JFYWNoQ29weShyZXF1aXJlbWVudHMsIChyZXF1aXJlbWVudCwgcGFyYW1ldGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICBsZXQgdmFsaWRhdG9yOiBJVmFsaWRhdG9yRm4gPSBudWxsXG4gICAgICAgICAgICAgICAgICBpZiAocmVxdWlyZW1lbnQgPT09ICdtYXhpbXVtJyB8fCByZXF1aXJlbWVudCA9PT0gJ21pbmltdW0nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4Y2x1c2l2ZSA9ICEhcmVxdWlyZW1lbnRzWydleGNsdXNpdmVNJyArIHJlcXVpcmVtZW50LnNsaWNlKDEpXVxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3IgPSBKc29uVmFsaWRhdG9yc1tyZXF1aXJlbWVudF0ocGFyYW1ldGVyLCBleGNsdXNpdmUpXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBKc29uVmFsaWRhdG9yc1tyZXF1aXJlbWVudF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yID0gSnNvblZhbGlkYXRvcnNbcmVxdWlyZW1lbnRdKHBhcmFtZXRlcilcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiAhaXNEZWZpbmVkKHZhbGlkYXRvcikgP1xuICAgICAgICAgICAgICAgICAgICBudWxsIDogdmFsaWRhdG9yKGNvbnRyb2wudmFsdWVbcmVxdWlyZWRGaWVsZF0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICByZXR1cm4gaXNFbXB0eShyZXF1aXJlZEZpZWxkRXJyb3JzKSA/XG4gICAgICAgICAgICAgICAgbnVsbCA6IHtbcmVxdWlyZWRGaWVsZF06IHJlcXVpcmVkRmllbGRFcnJvcnN9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgICByZXR1cm4gaXNFbXB0eShyZXF1aXJpbmdGaWVsZEVycm9ycykgP1xuICAgICAgICAgICAgbnVsbCA6IHtbcmVxdWlyaW5nRmllbGRdOiByZXF1aXJpbmdGaWVsZEVycm9yc31cbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIHJldHVybiBpc0VtcHR5KGFsbEVycm9ycykgPyBudWxsIDogYWxsRXJyb3JzXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdtaW5JdGVtcycgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgZm9ybSBhcnJheSB0byBoYXZlIGEgbWluaW11bSBudW1iZXIgb2YgdmFsdWVzLlxuICAgKlxuICAgKiBAcGFyYW0gbWluaW11bUl0ZW1zIC0gbWluaW11bSBudW1iZXIgb2YgaXRlbXMgYWxsb3dlZFxuICAgKi9cbiAgc3RhdGljIG1pbkl0ZW1zKG1pbmltdW1JdGVtczogbnVtYmVyKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKG1pbmltdW1JdGVtcykpIHtcbiAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICBjb25zdCBjdXJyZW50SXRlbXMgPSBpc0FycmF5KGNvbnRyb2wudmFsdWUpID8gY29udHJvbC52YWx1ZS5sZW5ndGggOiAwXG4gICAgICBjb25zdCBpc1ZhbGlkID0gY3VycmVudEl0ZW1zID49IG1pbmltdW1JdGVtc1xuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHttaW5JdGVtczoge21pbmltdW1JdGVtcywgY3VycmVudEl0ZW1zfX1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ21heEl0ZW1zJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBmb3JtIGFycmF5IHRvIGhhdmUgYSBtYXhpbXVtIG51bWJlciBvZiB2YWx1ZXMuXG4gICAqXG4gICAqIEBwYXJhbSBtYXhpbXVtSXRlbXMgLSBtYXhpbXVtIG51bWJlciBvZiBpdGVtcyBhbGxvd2VkXG4gICAqL1xuICBzdGF0aWMgbWF4SXRlbXMobWF4aW11bUl0ZW1zOiBudW1iZXIpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUobWF4aW11bUl0ZW1zKSkge1xuICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3JcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgY29uc3QgY3VycmVudEl0ZW1zID0gaXNBcnJheShjb250cm9sLnZhbHVlKSA/IGNvbnRyb2wudmFsdWUubGVuZ3RoIDogMFxuICAgICAgY29uc3QgaXNWYWxpZCA9IGN1cnJlbnRJdGVtcyA8PSBtYXhpbXVtSXRlbXNcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7bWF4SXRlbXM6IHttYXhpbXVtSXRlbXMsIGN1cnJlbnRJdGVtc319XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICd1bmlxdWVJdGVtcycgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIHZhbHVlcyBpbiBhIGZvcm0gYXJyYXkgdG8gYmUgdW5pcXVlLlxuICAgKlxuICAgKiBAcGFyYW0gdW5pcXVlPyAtIHRydWUgdG8gdmFsaWRhdGUsIGZhbHNlIHRvIGRpc2FibGVcbiAgICovXG4gIHN0YXRpYyB1bmlxdWVJdGVtcyh1bmlxdWUgPSB0cnVlKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIXVuaXF1ZSkge1xuICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3JcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNvcnRlZDogYW55W10gPSBjb250cm9sLnZhbHVlLnNsaWNlKCkuc29ydCgpXG4gICAgICBjb25zdCBkdXBsaWNhdGVJdGVtcyA9IFtdXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNvcnRlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc29ydGVkW2kgLSAxXSA9PT0gc29ydGVkW2ldICYmIGR1cGxpY2F0ZUl0ZW1zLmluY2x1ZGVzKHNvcnRlZFtpXSkpIHtcbiAgICAgICAgICBkdXBsaWNhdGVJdGVtcy5wdXNoKHNvcnRlZFtpXSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgaXNWYWxpZCA9ICFkdXBsaWNhdGVJdGVtcy5sZW5ndGhcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7dW5pcXVlSXRlbXM6IHtkdXBsaWNhdGVJdGVtc319XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdjb250YWlucycgdmFsaWRhdG9yXG4gICAqXG4gICAqIFRPRE86IENvbXBsZXRlIHRoaXMgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIHZhbHVlcyBpbiBhIGZvcm0gYXJyYXkgdG8gYmUgdW5pcXVlLlxuICAgKlxuICAgKiBAcGFyYW0gcmVxdWlyZWRJdGVtPyAtIHRydWUgdG8gdmFsaWRhdGUsIGZhbHNlIHRvIGRpc2FibGVcbiAgICovXG4gIHN0YXRpYyBjb250YWlucyhyZXF1aXJlZEl0ZW0gPSB0cnVlKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIXJlcXVpcmVkSXRlbSkge1xuICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3JcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkgfHwgIWlzQXJyYXkoY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICAgIGNvbnN0IGN1cnJlbnRJdGVtcyA9IGNvbnRyb2wudmFsdWVcbiAgICAgIC8vIGNvbnN0IGlzVmFsaWQgPSBjdXJyZW50SXRlbXMuc29tZShpdGVtID0+XG4gICAgICAvL1xuICAgICAgLy8gKTtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSB0cnVlXG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDoge2NvbnRhaW5zOiB7cmVxdWlyZWRJdGVtLCBjdXJyZW50SXRlbXN9fVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBOby1vcCB2YWxpZGF0b3IuIEluY2x1ZGVkIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LlxuICAgKi9cbiAgc3RhdGljIG51bGxWYWxpZGF0b3IoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdG9yIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9uczpcbiAgICogY29tcG9zZUFueU9mLCBjb21wb3NlT25lT2YsIGNvbXBvc2VBbGxPZiwgY29tcG9zZU5vdCxcbiAgICogY29tcG9zZSwgY29tcG9zZUFzeW5jXG4gICAqXG4gICAqIFRPRE86IEFkZCBjb21wb3NlQW55T2ZBc3luYywgY29tcG9zZU9uZU9mQXN5bmMsXG4gICAqICAgICAgICAgICBjb21wb3NlQWxsT2ZBc3luYywgY29tcG9zZU5vdEFzeW5jXG4gICAqL1xuXG4gIC8qKlxuICAgKiAnY29tcG9zZUFueU9mJyB2YWxpZGF0b3IgY29tYmluYXRpb24gZnVuY3Rpb25cbiAgICpcbiAgICogQWNjZXB0cyBhbiBhcnJheSBvZiB2YWxpZGF0b3JzIGFuZCByZXR1cm5zIGEgc2luZ2xlIHZhbGlkYXRvciB0aGF0XG4gICAqIGV2YWx1YXRlcyB0byB2YWxpZCBpZiBhbnkgb25lIG9yIG1vcmUgb2YgdGhlIHN1Ym1pdHRlZCB2YWxpZGF0b3JzIGFyZVxuICAgKiB2YWxpZC4gSWYgZXZlcnkgdmFsaWRhdG9yIGlzIGludmFsaWQsIGl0IHJldHVybnMgY29tYmluZWQgZXJyb3JzIGZyb21cbiAgICogYWxsIHZhbGlkYXRvcnMuXG4gICAqXG4gICAqIEBwYXJhbSB2YWxpZGF0b3JzIC0gYXJyYXkgb2YgdmFsaWRhdG9ycyB0byBjb21iaW5lXG4gICAqL1xuICBzdGF0aWMgY29tcG9zZUFueU9mKHZhbGlkYXRvcnM6IElWYWxpZGF0b3JGbltdKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIXZhbGlkYXRvcnMpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGNvbnN0IHByZXNlbnRWYWxpZGF0b3JzID0gdmFsaWRhdG9ycy5maWx0ZXIoaXNEZWZpbmVkKVxuICAgIGlmIChwcmVzZW50VmFsaWRhdG9ycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGNvbnN0IGFycmF5T2ZFcnJvcnMgPVxuICAgICAgICBleGVjdXRlVmFsaWRhdG9ycyhjb250cm9sLCBwcmVzZW50VmFsaWRhdG9ycywgaW52ZXJ0KS5maWx0ZXIoaXNEZWZpbmVkKVxuICAgICAgY29uc3QgaXNWYWxpZCA9IHZhbGlkYXRvcnMubGVuZ3RoID4gYXJyYXlPZkVycm9ycy5sZW5ndGhcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiBtZXJnZU9iamVjdHMoLi4uYXJyYXlPZkVycm9ycywge2FueU9mOiAhaW52ZXJ0fSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ2NvbXBvc2VPbmVPZicgdmFsaWRhdG9yIGNvbWJpbmF0aW9uIGZ1bmN0aW9uXG4gICAqXG4gICAqIEFjY2VwdHMgYW4gYXJyYXkgb2YgdmFsaWRhdG9ycyBhbmQgcmV0dXJucyBhIHNpbmdsZSB2YWxpZGF0b3IgdGhhdFxuICAgKiBldmFsdWF0ZXMgdG8gdmFsaWQgb25seSBpZiBleGFjdGx5IG9uZSBvZiB0aGUgc3VibWl0dGVkIHZhbGlkYXRvcnNcbiAgICogaXMgdmFsaWQuIE90aGVyd2lzZSByZXR1cm5zIGNvbWJpbmVkIGluZm9ybWF0aW9uIGZyb20gYWxsIHZhbGlkYXRvcnMsXG4gICAqIGJvdGggdmFsaWQgYW5kIGludmFsaWQuXG4gICAqXG4gICAqIEBwYXJhbSB2YWxpZGF0b3JzIC0gYXJyYXkgb2YgdmFsaWRhdG9ycyB0byBjb21iaW5lXG4gICAqIEByZXR1cm4gc2luZ2xlIGNvbWJpbmVkIHZhbGlkYXRvciBmdW5jdGlvblxuICAgKi9cbiAgc3RhdGljIGNvbXBvc2VPbmVPZih2YWxpZGF0b3JzOiBJVmFsaWRhdG9yRm5bXSk6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCF2YWxpZGF0b3JzKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBjb25zdCBwcmVzZW50VmFsaWRhdG9ycyA9IHZhbGlkYXRvcnMuZmlsdGVyKGlzRGVmaW5lZClcbiAgICBpZiAocHJlc2VudFZhbGlkYXRvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBjb25zdCBhcnJheU9mRXJyb3JzID1cbiAgICAgICAgZXhlY3V0ZVZhbGlkYXRvcnMoY29udHJvbCwgcHJlc2VudFZhbGlkYXRvcnMpXG4gICAgICBjb25zdCB2YWxpZENvbnRyb2xzID1cbiAgICAgICAgdmFsaWRhdG9ycy5sZW5ndGggLSBhcnJheU9mRXJyb3JzLmZpbHRlcihpc0RlZmluZWQpLmxlbmd0aFxuICAgICAgY29uc3QgaXNWYWxpZCA9IHZhbGlkQ29udHJvbHMgPT09IDFcbiAgICAgIGlmICh4b3IoaXNWYWxpZCwgaW52ZXJ0KSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgY29uc3QgYXJyYXlPZlZhbGlkcyA9XG4gICAgICAgIGV4ZWN1dGVWYWxpZGF0b3JzKGNvbnRyb2wsIHByZXNlbnRWYWxpZGF0b3JzLCBpbnZlcnQpXG4gICAgICByZXR1cm4gbWVyZ2VPYmplY3RzKC4uLmFycmF5T2ZFcnJvcnMsIC4uLmFycmF5T2ZWYWxpZHMsIHtvbmVPZjogIWludmVydH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdjb21wb3NlQWxsT2YnIHZhbGlkYXRvciBjb21iaW5hdGlvbiBmdW5jdGlvblxuICAgKlxuICAgKiBBY2NlcHRzIGFuIGFycmF5IG9mIHZhbGlkYXRvcnMgYW5kIHJldHVybnMgYSBzaW5nbGUgdmFsaWRhdG9yIHRoYXRcbiAgICogZXZhbHVhdGVzIHRvIHZhbGlkIG9ubHkgaWYgYWxsIHRoZSBzdWJtaXR0ZWQgdmFsaWRhdG9ycyBhcmUgaW5kaXZpZHVhbGx5XG4gICAqIHZhbGlkLiBPdGhlcndpc2UgaXQgcmV0dXJucyBjb21iaW5lZCBlcnJvcnMgZnJvbSBhbGwgaW52YWxpZCB2YWxpZGF0b3JzLlxuICAgKlxuICAgKiBAcGFyYW0gdmFsaWRhdG9ycyAtIGFycmF5IG9mIHZhbGlkYXRvcnMgdG8gY29tYmluZVxuICAgKiBAcmV0dXJuIHNpbmdsZSBjb21iaW5lZCB2YWxpZGF0b3IgZnVuY3Rpb25cbiAgICovXG4gIHN0YXRpYyBjb21wb3NlQWxsT2YodmFsaWRhdG9yczogSVZhbGlkYXRvckZuW10pOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghdmFsaWRhdG9ycykge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgY29uc3QgcHJlc2VudFZhbGlkYXRvcnMgPSB2YWxpZGF0b3JzLmZpbHRlcihpc0RlZmluZWQpXG4gICAgaWYgKHByZXNlbnRWYWxpZGF0b3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgY29uc3QgY29tYmluZWRFcnJvcnMgPSBtZXJnZUVycm9ycyhcbiAgICAgICAgZXhlY3V0ZVZhbGlkYXRvcnMoY29udHJvbCwgcHJlc2VudFZhbGlkYXRvcnMsIGludmVydClcbiAgICAgIClcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBjb21iaW5lZEVycm9ycyA9PT0gbnVsbFxuICAgICAgcmV0dXJuICh4b3IoaXNWYWxpZCwgaW52ZXJ0KSkgP1xuICAgICAgICBudWxsIDogbWVyZ2VPYmplY3RzKGNvbWJpbmVkRXJyb3JzLCB7YWxsT2Y6ICFpbnZlcnR9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnY29tcG9zZU5vdCcgdmFsaWRhdG9yIGludmVyc2lvbiBmdW5jdGlvblxuICAgKlxuICAgKiBBY2NlcHRzIGEgc2luZ2xlIHZhbGlkYXRvciBmdW5jdGlvbiBhbmQgaW52ZXJ0cyBpdHMgcmVzdWx0LlxuICAgKiBSZXR1cm5zIHZhbGlkIGlmIHRoZSBzdWJtaXR0ZWQgdmFsaWRhdG9yIGlzIGludmFsaWQsIGFuZFxuICAgKiByZXR1cm5zIGludmFsaWQgaWYgdGhlIHN1Ym1pdHRlZCB2YWxpZGF0b3IgaXMgdmFsaWQuXG4gICAqIChOb3RlOiB0aGlzIGZ1bmN0aW9uIGNhbiBpdHNlbGYgYmUgaW52ZXJ0ZWRcbiAgICogICAtIGUuZy4gY29tcG9zZU5vdChjb21wb3NlTm90KHZhbGlkYXRvcikpIC1cbiAgICogICBidXQgdGhpcyBjYW4gYmUgY29uZnVzaW5nIGFuZCBpcyB0aGVyZWZvcmUgbm90IHJlY29tbWVuZGVkLilcbiAgICpcbiAgICogQHBhcmFtIHZhbGlkYXRvciAtIHZhbGlkYXRvcihzKSB0byBpbnZlcnRcbiAgICogQHJldHVybiBuZXcgdmFsaWRhdG9yIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBvcHBvc2l0ZSByZXN1bHRcbiAgICovXG4gIHN0YXRpYyBjb21wb3NlTm90KHZhbGlkYXRvcjogSVZhbGlkYXRvckZuKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIXZhbGlkYXRvcikge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICAgIGNvbnN0IGVycm9yID0gdmFsaWRhdG9yKGNvbnRyb2wsICFpbnZlcnQpXG4gICAgICBjb25zdCBpc1ZhbGlkID0gZXJyb3IgPT09IG51bGxcbiAgICAgIHJldHVybiAoeG9yKGlzVmFsaWQsIGludmVydCkpID9cbiAgICAgICAgbnVsbCA6IG1lcmdlT2JqZWN0cyhlcnJvciwge25vdDogIWludmVydH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdjb21wb3NlJyB2YWxpZGF0b3IgY29tYmluYXRpb24gZnVuY3Rpb25cbiAgICpcbiAgICogQHBhcmFtIHZhbGlkYXRvcnMgLSBhcnJheSBvZiB2YWxpZGF0b3JzIHRvIGNvbWJpbmVcbiAgICogQHJldHVybiBzaW5nbGUgY29tYmluZWQgdmFsaWRhdG9yIGZ1bmN0aW9uXG4gICAqL1xuICBzdGF0aWMgY29tcG9zZSh2YWxpZGF0b3JzOiBJVmFsaWRhdG9yRm5bXSk6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCF2YWxpZGF0b3JzKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBjb25zdCBwcmVzZW50VmFsaWRhdG9ycyA9IHZhbGlkYXRvcnMuZmlsdGVyKGlzRGVmaW5lZClcbiAgICBpZiAocHJlc2VudFZhbGlkYXRvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PlxuICAgICAgbWVyZ2VFcnJvcnMoZXhlY3V0ZVZhbGlkYXRvcnMoY29udHJvbCwgcHJlc2VudFZhbGlkYXRvcnMsIGludmVydCkpXG4gIH1cblxuICAvKipcbiAgICogJ2NvbXBvc2VBc3luYycgYXN5bmMgdmFsaWRhdG9yIGNvbWJpbmF0aW9uIGZ1bmN0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB2YWxpZGF0b3JzIC0gYXJyYXkgb2YgYXN5bmMgdmFsaWRhdG9yc1xuICAgKiBAcmV0dXJuIHNpbmdsZSBjb21iaW5lZCBhc3luYyB2YWxpZGF0b3IgZnVuY3Rpb25cbiAgICovXG4gIHN0YXRpYyBjb21wb3NlQXN5bmModmFsaWRhdG9yczogQXN5bmNJVmFsaWRhdG9yRm5bXSk6IEFzeW5jSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIXZhbGlkYXRvcnMpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGNvbnN0IHByZXNlbnRWYWxpZGF0b3JzID0gdmFsaWRhdG9ycy5maWx0ZXIoaXNEZWZpbmVkKVxuICAgIGlmIChwcmVzZW50VmFsaWRhdG9ycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKSA9PiB7XG4gICAgICBjb25zdCBvYnNlcnZhYmxlcyA9XG4gICAgICAgIGV4ZWN1dGVBc3luY1ZhbGlkYXRvcnMoY29udHJvbCwgcHJlc2VudFZhbGlkYXRvcnMpLm1hcCh0b09ic2VydmFibGUpXG4gICAgICByZXR1cm4gbWFwLmNhbGwoZm9ya0pvaW4ob2JzZXJ2YWJsZXMpLCBtZXJnZUVycm9ycylcbiAgICB9XG4gIH1cblxuICAvLyBBZGRpdGlvbmFsIGFuZ3VsYXIgdmFsaWRhdG9ycyAobm90IHVzZWQgYnkgQW5ndWFsciBKU09OIFNjaGVtYSBGb3JtKVxuICAvLyBGcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvYmxvYi9tYXN0ZXIvcGFja2FnZXMvZm9ybXMvc3JjL3ZhbGlkYXRvcnMudHNcblxuICAvKipcbiAgICogVmFsaWRhdG9yIHRoYXQgcmVxdWlyZXMgY29udHJvbHMgdG8gaGF2ZSBhIHZhbHVlIGdyZWF0ZXIgdGhhbiBhIG51bWJlci5cbiAgICovXG4gIHN0YXRpYyBtaW4obWluOiBudW1iZXIpOiBWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShtaW4pKSB7XG4gICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvclxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIC8vIGRvbid0IHZhbGlkYXRlIGVtcHR5IHZhbHVlcyB0byBhbGxvdyBvcHRpb25hbCBjb250cm9sc1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkgfHwgaXNFbXB0eShtaW4pKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICBjb25zdCB2YWx1ZSA9IHBhcnNlRmxvYXQoY29udHJvbC52YWx1ZSlcbiAgICAgIGNvbnN0IGFjdHVhbCA9IGNvbnRyb2wudmFsdWVcbiAgICAgIC8vIENvbnRyb2xzIHdpdGggTmFOIHZhbHVlcyBhZnRlciBwYXJzaW5nIHNob3VsZCBiZSB0cmVhdGVkIGFzIG5vdCBoYXZpbmcgYVxuICAgICAgLy8gbWluaW11bSwgcGVyIHRoZSBIVE1MIGZvcm1zIHNwZWM6IGh0dHBzOi8vd3d3LnczLm9yZy9UUi9odG1sNS9mb3Jtcy5odG1sI2F0dHItaW5wdXQtbWluXG4gICAgICByZXR1cm4gaXNOYU4odmFsdWUpIHx8IHZhbHVlID49IG1pbiA/IG51bGwgOiB7bWluOiB7bWluLCBhY3R1YWx9fVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0b3IgdGhhdCByZXF1aXJlcyBjb250cm9scyB0byBoYXZlIGEgdmFsdWUgbGVzcyB0aGFuIGEgbnVtYmVyLlxuICAgKi9cbiAgc3RhdGljIG1heChtYXg6IG51bWJlcik6IFZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKG1heCkpIHtcbiAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgLy8gZG9uJ3QgdmFsaWRhdGUgZW1wdHkgdmFsdWVzIHRvIGFsbG93IG9wdGlvbmFsIGNvbnRyb2xzXG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSB8fCBpc0VtcHR5KG1heCkpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICAgIGNvbnN0IHZhbHVlID0gcGFyc2VGbG9hdChjb250cm9sLnZhbHVlKVxuICAgICAgY29uc3QgYWN0dWFsID0gY29udHJvbC52YWx1ZVxuICAgICAgLy8gQ29udHJvbHMgd2l0aCBOYU4gdmFsdWVzIGFmdGVyIHBhcnNpbmcgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgbm90IGhhdmluZyBhXG4gICAgICAvLyBtYXhpbXVtLCBwZXIgdGhlIEhUTUwgZm9ybXMgc3BlYzogaHR0cHM6Ly93d3cudzMub3JnL1RSL2h0bWw1L2Zvcm1zLmh0bWwjYXR0ci1pbnB1dC1tYXhcbiAgICAgIHJldHVybiBpc05hTih2YWx1ZSkgfHwgdmFsdWUgPD0gbWF4ID8gbnVsbCA6IHttYXg6IHttYXgsIGFjdHVhbH19XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRvciB0aGF0IHJlcXVpcmVzIGNvbnRyb2wgdmFsdWUgdG8gYmUgdHJ1ZS5cbiAgICovXG4gIHN0YXRpYyByZXF1aXJlZFRydWUoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwge1xuICAgIGlmICghY29udHJvbCkge1xuICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3JcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRyb2wudmFsdWUgPT09IHRydWUgPyBudWxsIDoge3JlcXVpcmVkOiB0cnVlfVxuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRvciB0aGF0IHBlcmZvcm1zIGVtYWlsIHZhbGlkYXRpb24uXG4gICAqL1xuICBzdGF0aWMgZW1haWwoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwge1xuICAgIGlmICghY29udHJvbCkge1xuICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3JcbiAgICB9XG4gICAgY29uc3QgRU1BSUxfUkVHRVhQID1cbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBtYXgtbGluZS1sZW5ndGhcbiAgICAgIC9eKD89LnsxLDI1NH0kKSg/PS57MSw2NH1AKVstISMkJSYnKisvMC05PT9BLVpeX2BhLXp7fH1+XSsoXFwuWy0hIyQlJicqKy8wLTk9P0EtWl5fYGEtent8fX5dKykqQFtBLVphLXowLTldKFtBLVphLXowLTktXXswLDYxfVtBLVphLXowLTldKT8oXFwuW0EtWmEtejAtOV0oW0EtWmEtejAtOS1dezAsNjF9W0EtWmEtejAtOV0pPykqJC9cbiAgICByZXR1cm4gRU1BSUxfUkVHRVhQLnRlc3QoY29udHJvbC52YWx1ZSkgPyBudWxsIDoge2VtYWlsOiB0cnVlfVxuICB9XG59XG4iXX0=