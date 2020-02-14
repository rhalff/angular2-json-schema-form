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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi52YWxpZGF0b3JzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nc2YvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2pzb24udmFsaWRhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUNBQWlDLENBQUE7QUFDeEQsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLDBCQUEwQixDQUFBO0FBRTVDLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFBO0FBRTNCLE9BQU8sRUFDTCxpQkFBaUIsRUFBRSxzQkFBc0IsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUNwRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQ3BFLE9BQU8sRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFFckQsTUFBTSx1QkFBdUIsQ0FBQTtBQUM5QixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0scUJBQXFCLENBQUE7QUFDL0MsT0FBTyxFQUFDLHFCQUFxQixFQUF3QixNQUFNLG9DQUFvQyxDQUFBO0FBaUYvRixNQUFNLE9BQU8sY0FBYztJQWlDekIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFpQztRQUMvQyxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDdkIsS0FBSyxHQUFHLElBQUksQ0FBQTtTQUNiO1FBQ0QsUUFBUSxLQUFLLEVBQUU7WUFDYixLQUFLLElBQUk7Z0JBQ1AsT0FBTyxDQUFDLE9BQXdCLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBMkIsRUFBRTtvQkFDM0UsSUFBSSxNQUFNLEVBQUU7d0JBQ1YsT0FBTyxJQUFJLENBQUE7cUJBQ1o7b0JBQ0QsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFB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QUFBO0lBQ2hFLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWJzdHJhY3RDb250cm9sLCBWYWxpZGF0aW9uRXJyb3JzLCBWYWxpZGF0b3JGbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXG5pbXBvcnQge2ZvcmtKb2lufSBmcm9tICdyeGpzLWNvbXBhdC9vYnNlcnZhYmxlL2ZvcmtKb2luJ1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMtY29tcGF0L29wZXJhdG9yL21hcCdcblxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnXG5cbmltcG9ydCB7XG4gIGV4ZWN1dGVWYWxpZGF0b3JzLCBleGVjdXRlQXN5bmNWYWxpZGF0b3JzLCBtZXJnZU9iamVjdHMsIG1lcmdlRXJyb3JzLFxuICBpc0VtcHR5LCBpc0RlZmluZWQsIGhhc1ZhbHVlLCBpc1N0cmluZywgaXNOdW1iZXIsIGlzQm9vbGVhbiwgaXNBcnJheSxcbiAgZ2V0VHlwZSwgaXNUeXBlLCB0b0phdmFTY3JpcHRUeXBlLCB0b09ic2VydmFibGUsIHhvciwgU2NoZW1hUHJpbWl0aXZlVHlwZSxcbiAgSVZhbGlkYXRvckZuLCBBc3luY0lWYWxpZGF0b3JGblxufSBmcm9tICcuL2Z1bmN0aW9ucy92YWxpZGF0b3InXG5pbXBvcnQge2ZvckVhY2hDb3B5fSBmcm9tICcuL2Z1bmN0aW9ucy91dGlsaXR5J1xuaW1wb3J0IHtqc29uU2NoZW1hRm9ybWF0VGVzdHMsIEpzb25TY2hlbWFGb3JtYXROYW1lc30gZnJvbSAnLi9jb25zdGFudHMvZm9ybWF0LXJlZ2V4LmNvbnN0YW50cydcblxuLyoqXG4gKiAnSnNvblZhbGlkYXRvcnMnIGNsYXNzXG4gKlxuICogUHJvdmlkZXMgYW4gZXh0ZW5kZWQgc2V0IG9mIHZhbGlkYXRvcnMgdG8gYmUgdXNlZCBieSBmb3JtIGNvbnRyb2xzLFxuICogY29tcGF0aWJsZSB3aXRoIHN0YW5kYXJkIEpTT04gU2NoZW1hIHZhbGlkYXRpb24gb3B0aW9ucy5cbiAqIGh0dHA6Ly9qc29uLXNjaGVtYS5vcmcvbGF0ZXN0L2pzb24tc2NoZW1hLXZhbGlkYXRpb24uaHRtbFxuICpcbiAqIE5vdGU6IFRoaXMgbGlicmFyeSBpcyBkZXNpZ25lZCBhcyBhIGRyb3AtaW4gcmVwbGFjZW1lbnQgZm9yIHRoZSBBbmd1bGFyXG4gKiBWYWxpZGF0b3JzIGxpYnJhcnksIGFuZCBleGNlcHQgZm9yIG9uZSBzbWFsbCBicmVha2luZyBjaGFuZ2UgdG8gdGhlICdwYXR0ZXJuJ1xuICogdmFsaWRhdG9yIChkZXNjcmliZWQgYmVsb3cpIGl0IGNhbiBldmVuIGJlIGltcG9ydGVkIGFzIGEgc3Vic3RpdHV0ZSwgbGlrZSBzbzpcbiAqXG4gKiAgIGltcG9ydCB7IEpzb25WYWxpZGF0b3JzIGFzIFZhbGlkYXRvcnMgfSBmcm9tICdqc29uLXZhbGlkYXRvcnMnO1xuICpcbiAqIGFuZCBpdCBzaG91bGQgd29yayB3aXRoIGV4aXN0aW5nIGNvZGUgYXMgYSBjb21wbGV0ZSByZXBsYWNlbWVudC5cbiAqXG4gKiBUaGUgb25lIGV4Y2VwdGlvbiBpcyB0aGUgJ3BhdHRlcm4nIHZhbGlkYXRvciwgd2hpY2ggaGFzIGJlZW4gY2hhbmdlZCB0b1xuICogbWF0Y2ggcGFydGlhbCB2YWx1ZXMgYnkgZGVmYXVsdCAodGhlIHN0YW5kYXJkICdwYXR0ZXJuJyB2YWxpZGF0b3Igd3JhcHBlZFxuICogYWxsIHBhdHRlcm5zIGluICdeJyBhbmQgJyQnLCBmb3JjaW5nIHRoZW0gdG8gYWx3YXlzIG1hdGNoIGFuIGVudGlyZSB2YWx1ZSkuXG4gKiBIb3dldmVyLCB0aGUgb2xkIGJlaGF2aW9yIGNhbiBiZSByZXN0b3JlZCBieSBzaW1wbHkgYWRkaW5nICdeJyBhbmQgJyQnXG4gKiBhcm91bmQgeW91ciBwYXR0ZXJucywgb3IgYnkgcGFzc2luZyBhbiBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyIG9mIFRSVUUuXG4gKiBUaGlzIGNoYW5nZSBpcyB0byBtYWtlIHRoZSAncGF0dGVybicgdmFsaWRhdG9yIG1hdGNoIHRoZSBiZWhhdmlvciBvZiBhXG4gKiBKU09OIFNjaGVtYSBwYXR0ZXJuLCB3aGljaCBhbGxvd3MgcGFydGlhbCBtYXRjaGVzLCByYXRoZXIgdGhhbiB0aGUgYmVoYXZpb3JcbiAqIG9mIGFuIEhUTUwgaW5wdXQgY29udHJvbCBwYXR0ZXJuLCB3aGljaCBkb2VzIG5vdC5cbiAqXG4gKiBUaGlzIGxpYnJhcnkgcmVwbGFjZXMgQW5ndWxhcidzIHZhbGlkYXRvcnMgYW5kIGNvbWJpbmF0aW9uIGZ1bmN0aW9uc1xuICogd2l0aCB0aGUgZm9sbG93aW5nIHZhbGlkYXRvcnMgYW5kIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9uczpcbiAqXG4gKiBWYWxpZGF0b3JzOlxuICogICBGb3IgYWxsIGZvcm1Db250cm9sczogICAgIHJlcXVpcmVkICgqKSwgdHlwZSwgZW51bSwgY29uc3RcbiAqICAgRm9yIHRleHQgZm9ybUNvbnRyb2xzOiAgICBtaW5MZW5ndGggKCopLCBtYXhMZW5ndGggKCopLCBwYXR0ZXJuICgqKSwgZm9ybWF0XG4gKiAgIEZvciBudW1lcmljIGZvcm1Db250cm9sczogbWF4aW11bSwgZXhjbHVzaXZlTWF4aW11bSxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtLCBleGNsdXNpdmVNaW5pbXVtLCBtdWx0aXBsZU9mXG4gKiAgIEZvciBmb3JtR3JvdXAgb2JqZWN0czogICAgbWluUHJvcGVydGllcywgbWF4UHJvcGVydGllcywgZGVwZW5kZW5jaWVzXG4gKiAgIEZvciBmb3JtQXJyYXkgYXJyYXlzOiAgICAgbWluSXRlbXMsIG1heEl0ZW1zLCB1bmlxdWVJdGVtcywgY29udGFpbnNcbiAqICAgTm90IHVzZWQgYnkgSlNPTiBTY2hlbWE6ICBtaW4gKCopLCBtYXggKCopLCByZXF1aXJlZFRydWUgKCopLCBlbWFpbCAoKilcbiAqIChWYWxpZGF0b3JzIG9yaWdpbmFsbHkgaW5jbHVkZWQgd2l0aCBBbmd1bGFyIGFyZSBtYXJrZWQgd2l0aCAoKikuKVxuICpcbiAqIE5PVEUgLyBUT0RPOiBUaGUgZGVwZW5kZW5jaWVzIHZhbGlkYXRvciBpcyBub3QgY29tcGxldGUuXG4gKiBOT1RFIC8gVE9ETzogVGhlIGNvbnRhaW5zIHZhbGlkYXRvciBpcyBub3QgY29tcGxldGUuXG4gKlxuICogVmFsaWRhdG9ycyBub3QgdXNlZCBieSBKU09OIFNjaGVtYSAoYnV0IGluY2x1ZGVkIGZvciBjb21wYXRpYmlsaXR5KVxuICogYW5kIHRoZWlyIEpTT04gU2NoZW1hIGVxdWl2YWxlbnRzOlxuICpcbiAqICAgQW5ndWxhciB2YWxpZGF0b3IgfCBKU09OIFNjaGVtYSBlcXVpdmFsZW50XG4gKiAgIC0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogICAgIG1pbihudW1iZXIpICAgICB8ICAgbWluaW11bShudW1iZXIpXG4gKiAgICAgbWF4KG51bWJlcikgICAgIHwgICBtYXhpbXVtKG51bWJlcilcbiAqICAgICByZXF1aXJlZFRydWUoKSAgfCAgIGNvbnN0KHRydWUpXG4gKiAgICAgZW1haWwoKSAgICAgICAgIHwgICBmb3JtYXQoJ2VtYWlsJylcbiAqXG4gKiBWYWxpZGF0b3IgdHJhbnNmb3JtYXRpb24gZnVuY3Rpb25zOlxuICogICBjb21wb3NlQW55T2YsIGNvbXBvc2VPbmVPZiwgY29tcG9zZUFsbE9mLCBjb21wb3NlTm90XG4gKiAoQW5ndWxhcidzIG9yaWdpbmFsIGNvbWJpbmF0aW9uIGZ1bmN0aW9uLCAnY29tcG9zZScsIGlzIGFsc28gaW5jbHVkZWQgZm9yXG4gKiBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LCB0aG91Z2ggaXQgaXMgZnVuY3Rpb25hbGx5IGVxdWl2YWxlbnQgdG8gY29tcG9zZUFsbE9mLFxuICogYXNpZGUgZnJvbSBpdHMgbW9yZSBnZW5lcmljIGVycm9yIG1lc3NhZ2UuKVxuICpcbiAqIEFsbCB2YWxpZGF0b3JzIGhhdmUgYWxzbyBiZWVuIGV4dGVuZGVkIHRvIGFjY2VwdCBhbiBvcHRpb25hbCBzZWNvbmQgYXJndW1lbnRcbiAqIHdoaWNoLCBpZiBwYXNzZWQgYSBUUlVFIHZhbHVlLCBjYXVzZXMgdGhlIHZhbGlkYXRvciB0byBwZXJmb3JtIHRoZSBvcHBvc2l0ZVxuICogb2YgaXRzIG9yaWdpbmFsIGZ1bmN0aW9uLiAoVGhpcyBpcyB1c2VkIGludGVybmFsbHkgdG8gZW5hYmxlICdub3QnIGFuZFxuICogJ2NvbXBvc2VPbmVPZicgdG8gZnVuY3Rpb24gYW5kIHJldHVybiB1c2VmdWwgZXJyb3IgbWVzc2FnZXMuKVxuICpcbiAqIFRoZSAncmVxdWlyZWQnIHZhbGlkYXRvciBoYXMgYWxzbyBiZWVuIG92ZXJsb2FkZWQgc28gdGhhdCBpZiBjYWxsZWQgd2l0aFxuICogYSBib29sZWFuIHBhcmFtZXRlciAob3Igbm8gcGFyYW1ldGVycykgaXQgcmV0dXJucyB0aGUgb3JpZ2luYWwgdmFsaWRhdG9yXG4gKiBmdW5jdGlvbiAocmF0aGVyIHRoYW4gZXhlY3V0aW5nIGl0KS4gSG93ZXZlciwgaWYgaXQgaXMgY2FsbGVkIHdpdGggYW5cbiAqIEFic3RyYWN0Q29udHJvbCBwYXJhbWV0ZXIgKGFzIHdhcyBwcmV2aW91c2x5IHJlcXVpcmVkKSwgaXQgYmVoYXZlc1xuICogZXhhY3RseSBhcyBiZWZvcmUuXG4gKlxuICogVGhpcyBlbmFibGVzIGFsbCB2YWxpZGF0b3JzIChpbmNsdWRpbmcgJ3JlcXVpcmVkJykgdG8gYmUgY29uc3RydWN0ZWQgaW5cbiAqIGV4YWN0bHkgdGhlIHNhbWUgd2F5LCBzbyB0aGV5IGNhbiBiZSBhdXRvbWF0aWNhbGx5IGFwcGxpZWQgdXNpbmcgdGhlXG4gKiBlcXVpdmFsZW50IGtleSBuYW1lcyBhbmQgdmFsdWVzIHRha2VuIGRpcmVjdGx5IGZyb20gYSBKU09OIFNjaGVtYS5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIHBhcnRpYWxseSBkZXJpdmVkIGZyb20gQW5ndWxhcixcbiAqIHdoaWNoIGlzIENvcHlyaWdodCAoYykgMjAxNC0yMDE3IEdvb2dsZSwgSW5jLlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgdGhlcmVmb3JlIGdvdmVybmVkIGJ5IHRoZSBzYW1lIE1JVC1zdHlsZSBsaWNlbnNlXG4gKiB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKlxuICogT3JpZ2luYWwgQW5ndWxhciBWYWxpZGF0b3JzOlxuICogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9ibG9iL21hc3Rlci9wYWNrYWdlcy9mb3Jtcy9zcmMvdmFsaWRhdG9ycy50c1xuICovXG5leHBvcnQgY2xhc3MgSnNvblZhbGlkYXRvcnMge1xuXG4gIC8qKlxuICAgKiBWYWxpZGF0b3IgZnVuY3Rpb25zOlxuICAgKlxuICAgKiBGb3IgYWxsIGZvcm1Db250cm9sczogICAgIHJlcXVpcmVkLCB0eXBlLCBlbnVtLCBjb25zdFxuICAgKiBGb3IgdGV4dCBmb3JtQ29udHJvbHM6ICAgIG1pbkxlbmd0aCwgbWF4TGVuZ3RoLCBwYXR0ZXJuLCBmb3JtYXRcbiAgICogRm9yIG51bWVyaWMgZm9ybUNvbnRyb2xzOiBtYXhpbXVtLCBleGNsdXNpdmVNYXhpbXVtLFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW0sIGV4Y2x1c2l2ZU1pbmltdW0sIG11bHRpcGxlT2ZcbiAgICogRm9yIGZvcm1Hcm91cCBvYmplY3RzOiAgICBtaW5Qcm9wZXJ0aWVzLCBtYXhQcm9wZXJ0aWVzLCBkZXBlbmRlbmNpZXNcbiAgICogRm9yIGZvcm1BcnJheSBhcnJheXM6ICAgICBtaW5JdGVtcywgbWF4SXRlbXMsIHVuaXF1ZUl0ZW1zLCBjb250YWluc1xuICAgKlxuICAgKiBUT0RPOiBmaW5pc2ggZGVwZW5kZW5jaWVzIHZhbGlkYXRvclxuICAgKi9cblxuICAvKipcbiAgICogJ3JlcXVpcmVkJyB2YWxpZGF0b3JcbiAgICpcbiAgICogVGhpcyB2YWxpZGF0b3IgaXMgb3ZlcmxvYWRlZCwgY29tcGFyZWQgdG8gdGhlIGRlZmF1bHQgcmVxdWlyZWQgdmFsaWRhdG9yLlxuICAgKiBJZiBjYWxsZWQgd2l0aCBubyBwYXJhbWV0ZXJzLCBvciBUUlVFLCB0aGlzIHZhbGlkYXRvciByZXR1cm5zIHRoZVxuICAgKiAncmVxdWlyZWQnIHZhbGlkYXRvciBmdW5jdGlvbiAocmF0aGVyIHRoYW4gZXhlY3V0aW5nIGl0KS4gVGhpcyBtYXRjaGVzXG4gICAqIHRoZSBiZWhhdmlvciBvZiBhbGwgb3RoZXIgdmFsaWRhdG9ycyBpbiB0aGlzIGxpYnJhcnkuXG4gICAqXG4gICAqIElmIHRoaXMgdmFsaWRhdG9yIGlzIGNhbGxlZCB3aXRoIGFuIEFic3RyYWN0Q29udHJvbCBwYXJhbWV0ZXJcbiAgICogKGFzIHdhcyBwcmV2aW91c2x5IHJlcXVpcmVkKSBpdCBiZWhhdmVzIHRoZSBzYW1lIGFzIEFuZ3VsYXIncyBkZWZhdWx0XG4gICAqIHJlcXVpcmVkIHZhbGlkYXRvciwgYW5kIHJldHVybnMgYW4gZXJyb3IgaWYgdGhlIGNvbnRyb2wgaXMgZW1wdHkuXG4gICAqXG4gICAqIEJlaGF2aW9yOiAoaWYgbm8gaW5wdXQsIG9yIGlucHV0IHR5cGUgPSBib29sZWFuKVxuICAgKiBwYXJhbSB7Ym9vbGVhbiA9IHRydWV9IHJlcXVpcmVkPyAtIHRydWUgdG8gdmFsaWRhdGUsIGZhbHNlIHRvIGRpc2FibGVcbiAgICogcmV0dXJuIHtJVmFsaWRhdG9yRm59IC0gcmV0dXJucyB0aGUgJ3JlcXVpcmVkJyB2YWxpZGF0b3IgZnVuY3Rpb24gaXRzZWxmXG4gICAqL1xuICBzdGF0aWMgcmVxdWlyZWQoaW5wdXQ6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsXG4gIHN0YXRpYyByZXF1aXJlZChpbnB1dD86IGJvb2xlYW4pOiBJVmFsaWRhdG9yRm5cbiAgc3RhdGljIHJlcXVpcmVkKGlucHV0PzogQWJzdHJhY3RDb250cm9sIHwgYm9vbGVhbik6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHwgSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoaW5wdXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaW5wdXQgPSB0cnVlXG4gICAgfVxuICAgIHN3aXRjaCAoaW5wdXQpIHtcbiAgICAgIGNhc2UgdHJ1ZTogLy8gUmV0dXJuIHJlcXVpcmVkIGZ1bmN0aW9uIChkbyBub3QgZXhlY3V0ZSBpdCB5ZXQpXG4gICAgICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgICAgICBpZiAoaW52ZXJ0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgIH0gLy8gaWYgbm90IHJlcXVpcmVkLCBhbHdheXMgcmV0dXJuIHZhbGlkXG4gICAgICAgICAgcmV0dXJuIGhhc1ZhbHVlKGNvbnRyb2wudmFsdWUpID8gbnVsbCA6IHtyZXF1aXJlZDogdHJ1ZX1cbiAgICAgICAgfVxuICAgICAgY2FzZSBmYWxzZTogLy8gRG8gbm90aGluZyAoaWYgZmllbGQgaXMgbm90IHJlcXVpcmVkLCBpdCBpcyBhbHdheXMgdmFsaWQpXG4gICAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yXG4gICAgICBkZWZhdWx0OiAvLyBFeGVjdXRlIHJlcXVpcmVkIGZ1bmN0aW9uXG4gICAgICAgIHJldHVybiBoYXNWYWx1ZSgoaW5wdXQgYXMgQWJzdHJhY3RDb250cm9sKS52YWx1ZSkgPyBudWxsIDoge3JlcXVpcmVkOiB0cnVlfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAndHlwZScgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgY29udHJvbCB0byBvbmx5IGFjY2VwdCB2YWx1ZXMgb2YgYSBzcGVjaWZpZWQgdHlwZSxcbiAgICogb3Igb25lIG9mIGFuIGFycmF5IG9mIHR5cGVzLlxuICAgKlxuICAgKiBOb3RlOiBTY2hlbWFQcmltaXRpdmVUeXBlID0gJ3N0cmluZyd8J251bWJlcid8J2ludGVnZXInfCdib29sZWFuJ3wnbnVsbCdcbiAgICpcbiAgICogQHBhcmFtIHJlcXVpcmVkVHlwZSAtIHR5cGUocykgdG8gYWNjZXB0XG4gICAqL1xuICBzdGF0aWMgdHlwZShyZXF1aXJlZFR5cGU6IFNjaGVtYVByaW1pdGl2ZVR5cGUgfCBTY2hlbWFQcmltaXRpdmVUeXBlW10pOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUocmVxdWlyZWRUeXBlKSkge1xuICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3JcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZTogYW55ID0gY29udHJvbC52YWx1ZVxuICAgICAgY29uc3QgaXNWYWxpZCA9IGlzQXJyYXkocmVxdWlyZWRUeXBlKSA/XG4gICAgICAgIChyZXF1aXJlZFR5cGUgYXMgU2NoZW1hUHJpbWl0aXZlVHlwZVtdKS5zb21lKHR5cGUgPT4gaXNUeXBlKGN1cnJlbnRWYWx1ZSwgdHlwZSkpIDpcbiAgICAgICAgaXNUeXBlKGN1cnJlbnRWYWx1ZSwgcmVxdWlyZWRUeXBlIGFzIFNjaGVtYVByaW1pdGl2ZVR5cGUpXG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDoge3R5cGU6IHtyZXF1aXJlZFR5cGUsIGN1cnJlbnRWYWx1ZX19XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdlbnVtJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBjb250cm9sIHRvIGhhdmUgYSB2YWx1ZSBmcm9tIGFuIGVudW1lcmF0ZWQgbGlzdCBvZiB2YWx1ZXMuXG4gICAqXG4gICAqIENvbnZlcnRzIHR5cGVzIGFzIG5lZWRlZCB0byBhbGxvdyBzdHJpbmcgaW5wdXRzIHRvIHN0aWxsIGNvcnJlY3RseVxuICAgKiBtYXRjaCBudW1iZXIsIGJvb2xlYW4sIGFuZCBudWxsIGVudW0gdmFsdWVzLlxuICAgKlxuICAgKiBAcGFyYW0gYWxsb3dlZFZhbHVlcyAtIGFycmF5IG9mIGFjY2VwdGFibGUgdmFsdWVzXG4gICAqL1xuICBzdGF0aWMgZW51bShhbGxvd2VkVmFsdWVzOiBhbnlbXSk6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFpc0FycmF5KGFsbG93ZWRWYWx1ZXMpKSB7XG4gICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvclxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgY29uc3QgY3VycmVudFZhbHVlOiBhbnkgPSBjb250cm9sLnZhbHVlXG4gICAgICBjb25zdCBpc0VxdWFsID0gKGVudW1WYWx1ZSwgaW5wdXRWYWx1ZSkgPT5cbiAgICAgICAgZW51bVZhbHVlID09PSBpbnB1dFZhbHVlIHx8XG4gICAgICAgIChpc051bWJlcihlbnVtVmFsdWUpICYmICtpbnB1dFZhbHVlID09PSArZW51bVZhbHVlKSB8fFxuICAgICAgICAoaXNCb29sZWFuKGVudW1WYWx1ZSwgJ3N0cmljdCcpICYmXG4gICAgICAgICAgdG9KYXZhU2NyaXB0VHlwZShpbnB1dFZhbHVlLCAnYm9vbGVhbicpID09PSBlbnVtVmFsdWUpIHx8XG4gICAgICAgIChlbnVtVmFsdWUgPT09IG51bGwgJiYgIWhhc1ZhbHVlKGlucHV0VmFsdWUpKSB8fFxuICAgICAgICBfLmlzRXF1YWwoZW51bVZhbHVlLCBpbnB1dFZhbHVlKVxuICAgICAgY29uc3QgaXNWYWxpZCA9IGlzQXJyYXkoY3VycmVudFZhbHVlKSA/XG4gICAgICAgIGN1cnJlbnRWYWx1ZS5ldmVyeShpbnB1dFZhbHVlID0+IGFsbG93ZWRWYWx1ZXMuc29tZShlbnVtVmFsdWUgPT5cbiAgICAgICAgICBpc0VxdWFsKGVudW1WYWx1ZSwgaW5wdXRWYWx1ZSlcbiAgICAgICAgKSkgOlxuICAgICAgICBhbGxvd2VkVmFsdWVzLnNvbWUoZW51bVZhbHVlID0+IGlzRXF1YWwoZW51bVZhbHVlLCBjdXJyZW50VmFsdWUpKVxuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHtlbnVtOiB7YWxsb3dlZFZhbHVlcywgY3VycmVudFZhbHVlfX1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ2NvbnN0JyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBjb250cm9sIHRvIGhhdmUgYSBzcGVjaWZpYyB2YWx1ZS5cbiAgICpcbiAgICogQ29udmVydHMgdHlwZXMgYXMgbmVlZGVkIHRvIGFsbG93IHN0cmluZyBpbnB1dHMgdG8gc3RpbGwgY29ycmVjdGx5XG4gICAqIG1hdGNoIG51bWJlciwgYm9vbGVhbiwgYW5kIG51bGwgdmFsdWVzLlxuICAgKlxuICAgKiBUT0RPOiBtb2RpZnkgdG8gd29yayB3aXRoIG9iamVjdHNcbiAgICpcbiAgICogQHBhcmFtIHJlcXVpcmVkVmFsdWUgLSByZXF1aXJlZCB2YWx1ZVxuICAgKi9cbiAgc3RhdGljIGNvbnN0KHJlcXVpcmVkVmFsdWU6IGFueSk6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShyZXF1aXJlZFZhbHVlKSkge1xuICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3JcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZTogYW55ID0gY29udHJvbC52YWx1ZVxuICAgICAgY29uc3QgaXNFcXVhbCA9IChjb25zdFZhbHVlLCBpbnB1dFZhbHVlKSA9PlxuICAgICAgICBjb25zdFZhbHVlID09PSBpbnB1dFZhbHVlIHx8XG4gICAgICAgIGlzTnVtYmVyKGNvbnN0VmFsdWUpICYmICtpbnB1dFZhbHVlID09PSArY29uc3RWYWx1ZSB8fFxuICAgICAgICBpc0Jvb2xlYW4oY29uc3RWYWx1ZSwgJ3N0cmljdCcpICYmXG4gICAgICAgIHRvSmF2YVNjcmlwdFR5cGUoaW5wdXRWYWx1ZSwgJ2Jvb2xlYW4nKSA9PT0gY29uc3RWYWx1ZSB8fFxuICAgICAgICBjb25zdFZhbHVlID09PSBudWxsICYmICFoYXNWYWx1ZShpbnB1dFZhbHVlKVxuICAgICAgY29uc3QgaXNWYWxpZCA9IGlzRXF1YWwocmVxdWlyZWRWYWx1ZSwgY3VycmVudFZhbHVlKVxuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHtjb25zdDoge3JlcXVpcmVkVmFsdWUsIGN1cnJlbnRWYWx1ZX19XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdtaW5MZW5ndGgnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wncyB0ZXh0IHZhbHVlIHRvIGJlIGdyZWF0ZXIgdGhhbiBhIHNwZWNpZmllZCBsZW5ndGguXG4gICAqXG4gICAqIEBwYXJhbSBtaW5pbXVtTGVuZ3RoIC0gbWluaW11bSBhbGxvd2VkIHN0cmluZyBsZW5ndGhcbiAgICovXG4gIHN0YXRpYyBtaW5MZW5ndGgobWluaW11bUxlbmd0aDogbnVtYmVyKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKG1pbmltdW1MZW5ndGgpKSB7XG4gICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvclxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgY29uc3QgY3VycmVudExlbmd0aCA9IGlzU3RyaW5nKGNvbnRyb2wudmFsdWUpID8gY29udHJvbC52YWx1ZS5sZW5ndGggOiAwXG4gICAgICBjb25zdCBpc1ZhbGlkID0gY3VycmVudExlbmd0aCA+PSBtaW5pbXVtTGVuZ3RoXG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDoge21pbkxlbmd0aDoge21pbmltdW1MZW5ndGgsIGN1cnJlbnRMZW5ndGh9fVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnbWF4TGVuZ3RoJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBjb250cm9sJ3MgdGV4dCB2YWx1ZSB0byBiZSBsZXNzIHRoYW4gYSBzcGVjaWZpZWQgbGVuZ3RoLlxuICAgKlxuICAgKiBAcGFyYW0gbWF4aW11bUxlbmd0aCAtIG1heGltdW0gYWxsb3dlZCBzdHJpbmcgbGVuZ3RoXG4gICAqL1xuICBzdGF0aWMgbWF4TGVuZ3RoKG1heGltdW1MZW5ndGg6IG51bWJlcik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShtYXhpbXVtTGVuZ3RoKSkge1xuICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3JcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgY29uc3QgY3VycmVudExlbmd0aCA9IGlzU3RyaW5nKGNvbnRyb2wudmFsdWUpID8gY29udHJvbC52YWx1ZS5sZW5ndGggOiAwXG4gICAgICBjb25zdCBpc1ZhbGlkID0gY3VycmVudExlbmd0aCA8PSBtYXhpbXVtTGVuZ3RoXG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDoge21heExlbmd0aDoge21heGltdW1MZW5ndGgsIGN1cnJlbnRMZW5ndGh9fVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAncGF0dGVybicgdmFsaWRhdG9yXG4gICAqXG4gICAqIE5vdGU6IE5PVCB0aGUgc2FtZSBhcyBBbmd1bGFyJ3MgZGVmYXVsdCBwYXR0ZXJuIHZhbGlkYXRvci5cbiAgICpcbiAgICogUmVxdWlyZXMgYSBjb250cm9sJ3MgdmFsdWUgdG8gbWF0Y2ggYSBzcGVjaWZpZWQgcmVndWxhciBleHByZXNzaW9uIHBhdHRlcm4uXG4gICAqXG4gICAqIFRoaXMgdmFsaWRhdG9yIGNoYW5nZXMgdGhlIGJlaGF2aW9yIG9mIGRlZmF1bHQgcGF0dGVybiB2YWxpZGF0b3JcbiAgICogYnkgcmVwbGFjaW5nIFJlZ0V4cChgXiR7cGF0dGVybn0kYCkgd2l0aCBSZWdFeHAoYCR7cGF0dGVybn1gKSxcbiAgICogd2hpY2ggYWxsb3dzIGZvciBwYXJ0aWFsIG1hdGNoZXMuXG4gICAqXG4gICAqIFRvIHJldHVybiB0byB0aGUgZGVmYXVsdCBmdW5jdGlvbmFsaXR5LCBhbmQgbWF0Y2ggdGhlIGVudGlyZSBzdHJpbmcsXG4gICAqIHBhc3MgVFJVRSBhcyB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlci5cbiAgICpcbiAgICogQHBhcmFtIHBhdHRlcm4gLSByZWd1bGFyIGV4cHJlc3Npb24gcGF0dGVyblxuICAgKiBAcGFyYW0gd2hvbGVTdHJpbmcgLSBtYXRjaCB3aG9sZSB2YWx1ZSBzdHJpbmc/XG4gICAqL1xuICBzdGF0aWMgcGF0dGVybihwYXR0ZXJuOiBzdHJpbmcgfCBSZWdFeHAsIHdob2xlU3RyaW5nID0gZmFsc2UpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUocGF0dGVybikpIHtcbiAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICBsZXQgcmVnZXg6IFJlZ0V4cFxuICAgICAgbGV0IHJlcXVpcmVkUGF0dGVybjogc3RyaW5nXG4gICAgICBpZiAodHlwZW9mIHBhdHRlcm4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJlcXVpcmVkUGF0dGVybiA9ICh3aG9sZVN0cmluZykgPyBgXiR7cGF0dGVybn0kYCA6IHBhdHRlcm5cbiAgICAgICAgcmVnZXggPSBuZXcgUmVnRXhwKHJlcXVpcmVkUGF0dGVybilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcXVpcmVkUGF0dGVybiA9IHBhdHRlcm4udG9TdHJpbmcoKVxuICAgICAgICByZWdleCA9IHBhdHRlcm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZTogc3RyaW5nID0gY29udHJvbC52YWx1ZVxuICAgICAgY29uc3QgaXNWYWxpZCA9IGlzU3RyaW5nKGN1cnJlbnRWYWx1ZSkgPyByZWdleC50ZXN0KGN1cnJlbnRWYWx1ZSkgOiBmYWxzZVxuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHtwYXR0ZXJuOiB7cmVxdWlyZWRQYXR0ZXJuLCBjdXJyZW50VmFsdWV9fVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnZm9ybWF0JyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBjb250cm9sIHRvIGhhdmUgYSB2YWx1ZSBvZiBhIGNlcnRhaW4gZm9ybWF0LlxuICAgKlxuICAgKiBUaGlzIHZhbGlkYXRvciBjdXJyZW50bHkgY2hlY2tzIHRoZSBmb2xsb3dpbmcgZm9ybWF0czpcbiAgICogICBkYXRlLCB0aW1lLCBkYXRlLXRpbWUsIGVtYWlsLCBob3N0bmFtZSwgaXB2NCwgaXB2NixcbiAgICogICB1cmksIHVyaS1yZWZlcmVuY2UsIHVyaS10ZW1wbGF0ZSwgdXJsLCB1dWlkLCBjb2xvcixcbiAgICogICBqc29uLXBvaW50ZXIsIHJlbGF0aXZlLWpzb24tcG9pbnRlciwgcmVnZXhcbiAgICpcbiAgICogRmFzdCBmb3JtYXQgcmVndWxhciBleHByZXNzaW9ucyBjb3BpZWQgZnJvbSBBSlY6XG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9lcG9iZXJlemtpbi9hanYvYmxvYi9tYXN0ZXIvbGliL2NvbXBpbGUvZm9ybWF0cy5qc1xuICAgKlxuICAgKiBAcGFyYW0gcmVxdWlyZWRGb3JtYXQgLSBmb3JtYXQgdG8gY2hlY2tcbiAgICovXG4gIHN0YXRpYyBmb3JtYXQocmVxdWlyZWRGb3JtYXQ6IEpzb25TY2hlbWFGb3JtYXROYW1lcyk6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShyZXF1aXJlZEZvcm1hdCkpIHtcbiAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICBsZXQgaXNWYWxpZDogYm9vbGVhblxuICAgICAgY29uc3QgY3VycmVudFZhbHVlOiBzdHJpbmcgfCBEYXRlID0gY29udHJvbC52YWx1ZVxuICAgICAgaWYgKGlzU3RyaW5nKGN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgICAgY29uc3QgZm9ybWF0VGVzdCA9IGpzb25TY2hlbWFGb3JtYXRUZXN0c1tyZXF1aXJlZEZvcm1hdF1cbiAgICAgICAgaWYgKHR5cGVvZiBmb3JtYXRUZXN0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGlzVmFsaWQgPSAoZm9ybWF0VGVzdCBhcyBSZWdFeHApLnRlc3QoY3VycmVudFZhbHVlIGFzIHN0cmluZylcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZm9ybWF0VGVzdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGlzVmFsaWQgPSBmb3JtYXRUZXN0KGN1cnJlbnRWYWx1ZSBhcyBzdHJpbmcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihgZm9ybWF0IHZhbGlkYXRvciBlcnJvcjogXCIke3JlcXVpcmVkRm9ybWF0fVwiIGlzIG5vdCBhIHJlY29nbml6ZWQgZm9ybWF0LmApXG4gICAgICAgICAgaXNWYWxpZCA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQWxsb3cgSmF2YVNjcmlwdCBEYXRlIG9iamVjdHNcbiAgICAgICAgaXNWYWxpZCA9IFsnZGF0ZScsICd0aW1lJywgJ2RhdGUtdGltZSddLmluY2x1ZGVzKHJlcXVpcmVkRm9ybWF0KSAmJlxuICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChjdXJyZW50VmFsdWUpID09PSAnW29iamVjdCBEYXRlXSdcbiAgICAgIH1cbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7Zm9ybWF0OiB7cmVxdWlyZWRGb3JtYXQsIGN1cnJlbnRWYWx1ZX19XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdtaW5pbXVtJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBjb250cm9sJ3MgbnVtZXJpYyB2YWx1ZSB0byBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG9cbiAgICogYSBtaW5pbXVtIGFtb3VudC5cbiAgICpcbiAgICogQW55IG5vbi1udW1lcmljIHZhbHVlIGlzIGFsc28gdmFsaWQgKGFjY29yZGluZyB0byB0aGUgSFRNTCBmb3JtcyBzcGVjLFxuICAgKiBhIG5vbi1udW1lcmljIHZhbHVlIGRvZXNuJ3QgaGF2ZSBhIG1pbmltdW0pLlxuICAgKiBodHRwczovL3d3dy53My5vcmcvVFIvaHRtbDUvZm9ybXMuaHRtbCNhdHRyLWlucHV0LW1heFxuICAgKlxuICAgKiBAcGFyYW0gbWluaW11bVZhbHVlIC0gbWluaW11bSBhbGxvd2VkIHZhbHVlXG4gICAqL1xuICBzdGF0aWMgbWluaW11bShtaW5pbXVtVmFsdWU6IG51bWJlcik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShtaW5pbXVtVmFsdWUpKSB7XG4gICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvclxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gY29udHJvbC52YWx1ZVxuICAgICAgY29uc3QgaXNWYWxpZCA9ICFpc051bWJlcihjdXJyZW50VmFsdWUpIHx8IGN1cnJlbnRWYWx1ZSA+PSBtaW5pbXVtVmFsdWVcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7bWluaW11bToge21pbmltdW1WYWx1ZSwgY3VycmVudFZhbHVlfX1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ2V4Y2x1c2l2ZU1pbmltdW0nIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wncyBudW1lcmljIHZhbHVlIHRvIGJlIGxlc3MgdGhhbiBhIG1heGltdW0gYW1vdW50LlxuICAgKlxuICAgKiBBbnkgbm9uLW51bWVyaWMgdmFsdWUgaXMgYWxzbyB2YWxpZCAoYWNjb3JkaW5nIHRvIHRoZSBIVE1MIGZvcm1zIHNwZWMsXG4gICAqIGEgbm9uLW51bWVyaWMgdmFsdWUgZG9lc24ndCBoYXZlIGEgbWF4aW11bSkuXG4gICAqIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9odG1sNS9mb3Jtcy5odG1sI2F0dHItaW5wdXQtbWF4XG4gICAqXG4gICAqIEBwYXJhbSBleGNsdXNpdmVNaW5pbXVtVmFsdWUgLSBtYXhpbXVtIGFsbG93ZWQgdmFsdWVcbiAgICovXG4gIHN0YXRpYyBleGNsdXNpdmVNaW5pbXVtKGV4Y2x1c2l2ZU1pbmltdW1WYWx1ZTogbnVtYmVyKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKGV4Y2x1c2l2ZU1pbmltdW1WYWx1ZSkpIHtcbiAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBjb250cm9sLnZhbHVlXG4gICAgICBjb25zdCBpc1ZhbGlkID0gIWlzTnVtYmVyKGN1cnJlbnRWYWx1ZSkgfHwgK2N1cnJlbnRWYWx1ZSA8IGV4Y2x1c2l2ZU1pbmltdW1WYWx1ZVxuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHtleGNsdXNpdmVNaW5pbXVtOiB7ZXhjbHVzaXZlTWluaW11bVZhbHVlLCBjdXJyZW50VmFsdWV9fVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnbWF4aW11bScgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgY29udHJvbCdzIG51bWVyaWMgdmFsdWUgdG8gYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvXG4gICAqIGEgbWF4aW11bSBhbW91bnQuXG4gICAqXG4gICAqIEFueSBub24tbnVtZXJpYyB2YWx1ZSBpcyBhbHNvIHZhbGlkIChhY2NvcmRpbmcgdG8gdGhlIEhUTUwgZm9ybXMgc3BlYyxcbiAgICogYSBub24tbnVtZXJpYyB2YWx1ZSBkb2Vzbid0IGhhdmUgYSBtYXhpbXVtKS5cbiAgICogaHR0cHM6Ly93d3cudzMub3JnL1RSL2h0bWw1L2Zvcm1zLmh0bWwjYXR0ci1pbnB1dC1tYXhcbiAgICpcbiAgICogQHBhcmFtIG1heGltdW1WYWx1ZSAtIG1heGltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKi9cbiAgc3RhdGljIG1heGltdW0obWF4aW11bVZhbHVlOiBudW1iZXIpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUobWF4aW11bVZhbHVlKSkge1xuICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3JcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGNvbnRyb2wudmFsdWVcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSAhaXNOdW1iZXIoY3VycmVudFZhbHVlKSB8fCArY3VycmVudFZhbHVlIDw9IG1heGltdW1WYWx1ZVxuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHttYXhpbXVtOiB7bWF4aW11bVZhbHVlLCBjdXJyZW50VmFsdWV9fVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnZXhjbHVzaXZlTWF4aW11bScgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgY29udHJvbCdzIG51bWVyaWMgdmFsdWUgdG8gYmUgbGVzcyB0aGFuIGEgbWF4aW11bSBhbW91bnQuXG4gICAqXG4gICAqIEFueSBub24tbnVtZXJpYyB2YWx1ZSBpcyBhbHNvIHZhbGlkIChhY2NvcmRpbmcgdG8gdGhlIEhUTUwgZm9ybXMgc3BlYyxcbiAgICogYSBub24tbnVtZXJpYyB2YWx1ZSBkb2Vzbid0IGhhdmUgYSBtYXhpbXVtKS5cbiAgICogaHR0cHM6Ly93d3cudzMub3JnL1RSL2h0bWw1L2Zvcm1zLmh0bWwjYXR0ci1pbnB1dC1tYXhcbiAgICpcbiAgICogQHBhcmFtIGV4Y2x1c2l2ZU1heGltdW1WYWx1ZSAtIG1heGltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKi9cbiAgc3RhdGljIGV4Y2x1c2l2ZU1heGltdW0oZXhjbHVzaXZlTWF4aW11bVZhbHVlOiBudW1iZXIpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUoZXhjbHVzaXZlTWF4aW11bVZhbHVlKSkge1xuICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3JcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGNvbnRyb2wudmFsdWVcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSAhaXNOdW1iZXIoY3VycmVudFZhbHVlKSB8fCArY3VycmVudFZhbHVlIDwgZXhjbHVzaXZlTWF4aW11bVZhbHVlXG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDoge2V4Y2x1c2l2ZU1heGltdW06IHtleGNsdXNpdmVNYXhpbXVtVmFsdWUsIGN1cnJlbnRWYWx1ZX19XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdtdWx0aXBsZU9mJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBjb250cm9sIHRvIGhhdmUgYSBudW1lcmljIHZhbHVlIHRoYXQgaXMgYSBtdWx0aXBsZVxuICAgKiBvZiBhIHNwZWNpZmllZCBudW1iZXIuXG4gICAqXG4gICAqIEBwYXJhbSBtdWx0aXBsZU9mVmFsdWUgLSBudW1iZXIgdmFsdWUgbXVzdCBiZSBhIG11bHRpcGxlIG9mXG4gICAqL1xuICBzdGF0aWMgbXVsdGlwbGVPZihtdWx0aXBsZU9mVmFsdWU6IG51bWJlcik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShtdWx0aXBsZU9mVmFsdWUpKSB7XG4gICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvclxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gY29udHJvbC52YWx1ZVxuICAgICAgY29uc3QgaXNWYWxpZCA9IGlzTnVtYmVyKGN1cnJlbnRWYWx1ZSkgJiZcbiAgICAgICAgY3VycmVudFZhbHVlICUgbXVsdGlwbGVPZlZhbHVlID09PSAwXG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDoge211bHRpcGxlT2Y6IHttdWx0aXBsZU9mVmFsdWUsIGN1cnJlbnRWYWx1ZX19XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdtaW5Qcm9wZXJ0aWVzJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBmb3JtIGdyb3VwIHRvIGhhdmUgYSBtaW5pbXVtIG51bWJlciBvZiBwcm9wZXJ0aWVzIChpLmUuIGhhdmVcbiAgICogdmFsdWVzIGVudGVyZWQgaW4gYSBtaW5pbXVtIG51bWJlciBvZiBjb250cm9scyB3aXRoaW4gdGhlIGdyb3VwKS5cbiAgICpcbiAgICogQHBhcmFtIG1pbmltdW1Qcm9wZXJ0aWVzIC0gbWluaW11bSBudW1iZXIgb2YgcHJvcGVydGllcyBhbGxvd2VkXG4gICAqL1xuICBzdGF0aWMgbWluUHJvcGVydGllcyhtaW5pbXVtUHJvcGVydGllczogbnVtYmVyKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKG1pbmltdW1Qcm9wZXJ0aWVzKSkge1xuICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3JcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICAgIGNvbnN0IGN1cnJlbnRQcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMoY29udHJvbC52YWx1ZSkubGVuZ3RoIHx8IDBcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBjdXJyZW50UHJvcGVydGllcyA+PSBtaW5pbXVtUHJvcGVydGllc1xuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHttaW5Qcm9wZXJ0aWVzOiB7bWluaW11bVByb3BlcnRpZXMsIGN1cnJlbnRQcm9wZXJ0aWVzfX1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ21heFByb3BlcnRpZXMnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGZvcm0gZ3JvdXAgdG8gaGF2ZSBhIG1heGltdW0gbnVtYmVyIG9mIHByb3BlcnRpZXMgKGkuZS4gaGF2ZVxuICAgKiB2YWx1ZXMgZW50ZXJlZCBpbiBhIG1heGltdW0gbnVtYmVyIG9mIGNvbnRyb2xzIHdpdGhpbiB0aGUgZ3JvdXApLlxuICAgKlxuICAgKiBOb3RlOiBIYXMgbm8gZWZmZWN0IGlmIHRoZSBmb3JtIGdyb3VwIGRvZXMgbm90IGNvbnRhaW4gbW9yZSB0aGFuIHRoZVxuICAgKiBtYXhpbXVtIG51bWJlciBvZiBjb250cm9scy5cbiAgICpcbiAgICogQHBhcmFtIG1heGltdW1Qcm9wZXJ0aWVzIC0gbWF4aW11bSBudW1iZXIgb2YgcHJvcGVydGllcyBhbGxvd2VkXG4gICAqL1xuICBzdGF0aWMgbWF4UHJvcGVydGllcyhtYXhpbXVtUHJvcGVydGllczogbnVtYmVyKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKG1heGltdW1Qcm9wZXJ0aWVzKSkge1xuICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3JcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgY29uc3QgY3VycmVudFByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhjb250cm9sLnZhbHVlKS5sZW5ndGggfHwgMFxuICAgICAgY29uc3QgaXNWYWxpZCA9IGN1cnJlbnRQcm9wZXJ0aWVzIDw9IG1heGltdW1Qcm9wZXJ0aWVzXG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDoge21heFByb3BlcnRpZXM6IHttYXhpbXVtUHJvcGVydGllcywgY3VycmVudFByb3BlcnRpZXN9fVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnZGVwZW5kZW5jaWVzJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgdGhlIGNvbnRyb2xzIGluIGEgZm9ybSBncm91cCB0byBtZWV0IGFkZGl0aW9uYWwgdmFsaWRhdGlvblxuICAgKiBjcml0ZXJpYSwgZGVwZW5kaW5nIG9uIHRoZSB2YWx1ZXMgb2Ygb3RoZXIgY29udHJvbHMgaW4gdGhlIGdyb3VwLlxuICAgKlxuICAgKiBFeGFtcGxlczpcbiAgICogaHR0cHM6Ly9zcGFjZXRlbGVzY29wZS5naXRodWIuaW8vdW5kZXJzdGFuZGluZy1qc29uLXNjaGVtYS9yZWZlcmVuY2Uvb2JqZWN0Lmh0bWwjZGVwZW5kZW5jaWVzXG4gICAqXG4gICAqIEBwYXJhbSBkZXBlbmRlbmNpZXMgLSByZXF1aXJlZCBkZXBlbmRlbmNpZXNcbiAgICovXG4gIHN0YXRpYyBkZXBlbmRlbmNpZXMoZGVwZW5kZW5jaWVzOiBhbnkpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmIChnZXRUeXBlKGRlcGVuZGVuY2llcykgIT09ICdvYmplY3QnIHx8IGlzRW1wdHkoZGVwZW5kZW5jaWVzKSkge1xuICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3JcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICAgIGNvbnN0IGFsbEVycm9ycyA9IG1lcmdlT2JqZWN0cyhcbiAgICAgICAgZm9yRWFjaENvcHkoZGVwZW5kZW5jaWVzLCAodmFsdWUsIHJlcXVpcmluZ0ZpZWxkKSA9PiB7XG4gICAgICAgICAgaWYgKCFoYXNWYWx1ZShjb250cm9sLnZhbHVlW3JlcXVpcmluZ0ZpZWxkXSkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCByZXF1aXJpbmdGaWVsZEVycm9yczogVmFsaWRhdGlvbkVycm9ycyA9IHt9XG4gICAgICAgICAgbGV0IHJlcXVpcmVkRmllbGRzOiBzdHJpbmdbXVxuICAgICAgICAgIGxldCBwcm9wZXJ0aWVzOiBWYWxpZGF0aW9uRXJyb3JzID0ge31cbiAgICAgICAgICBpZiAoZ2V0VHlwZShkZXBlbmRlbmNpZXNbcmVxdWlyaW5nRmllbGRdKSA9PT0gJ2FycmF5Jykge1xuICAgICAgICAgICAgcmVxdWlyZWRGaWVsZHMgPSBkZXBlbmRlbmNpZXNbcmVxdWlyaW5nRmllbGRdXG4gICAgICAgICAgfSBlbHNlIGlmIChnZXRUeXBlKGRlcGVuZGVuY2llc1tyZXF1aXJpbmdGaWVsZF0pID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmVxdWlyZWRGaWVsZHMgPSBkZXBlbmRlbmNpZXNbcmVxdWlyaW5nRmllbGRdLnJlcXVpcmVkIHx8IFtdXG4gICAgICAgICAgICBwcm9wZXJ0aWVzID0gZGVwZW5kZW5jaWVzW3JlcXVpcmluZ0ZpZWxkXS5wcm9wZXJ0aWVzIHx8IHt9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gVmFsaWRhdGUgcHJvcGVydHkgZGVwZW5kZW5jaWVzXG4gICAgICAgICAgZm9yIChjb25zdCByZXF1aXJlZEZpZWxkIG9mIHJlcXVpcmVkRmllbGRzKSB7XG4gICAgICAgICAgICBpZiAoeG9yKCFoYXNWYWx1ZShjb250cm9sLnZhbHVlW3JlcXVpcmVkRmllbGRdKSwgaW52ZXJ0KSkge1xuICAgICAgICAgICAgICByZXF1aXJpbmdGaWVsZEVycm9yc1tyZXF1aXJlZEZpZWxkXSA9IHtyZXF1aXJlZDogdHJ1ZX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBWYWxpZGF0ZSBzY2hlbWEgZGVwZW5kZW5jaWVzXG4gICAgICAgICAgcmVxdWlyaW5nRmllbGRFcnJvcnMgPSBtZXJnZU9iamVjdHMocmVxdWlyaW5nRmllbGRFcnJvcnMsXG4gICAgICAgICAgICBmb3JFYWNoQ29weShwcm9wZXJ0aWVzLCAocmVxdWlyZW1lbnRzLCByZXF1aXJlZEZpZWxkKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlcXVpcmVkRmllbGRFcnJvcnMgPSBtZXJnZU9iamVjdHMoXG4gICAgICAgICAgICAgICAgZm9yRWFjaENvcHkocmVxdWlyZW1lbnRzLCAocmVxdWlyZW1lbnQsIHBhcmFtZXRlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgbGV0IHZhbGlkYXRvcjogSVZhbGlkYXRvckZuID0gbnVsbFxuICAgICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVtZW50ID09PSAnbWF4aW11bScgfHwgcmVxdWlyZW1lbnQgPT09ICdtaW5pbXVtJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBleGNsdXNpdmUgPSAhIXJlcXVpcmVtZW50c1snZXhjbHVzaXZlTScgKyByZXF1aXJlbWVudC5zbGljZSgxKV1cbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yID0gSnNvblZhbGlkYXRvcnNbcmVxdWlyZW1lbnRdKHBhcmFtZXRlciwgZXhjbHVzaXZlKVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgSnNvblZhbGlkYXRvcnNbcmVxdWlyZW1lbnRdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvciA9IEpzb25WYWxpZGF0b3JzW3JlcXVpcmVtZW50XShwYXJhbWV0ZXIpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICByZXR1cm4gIWlzRGVmaW5lZCh2YWxpZGF0b3IpID9cbiAgICAgICAgICAgICAgICAgICAgbnVsbCA6IHZhbGlkYXRvcihjb250cm9sLnZhbHVlW3JlcXVpcmVkRmllbGRdKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgcmV0dXJuIGlzRW1wdHkocmVxdWlyZWRGaWVsZEVycm9ycykgP1xuICAgICAgICAgICAgICAgIG51bGwgOiB7W3JlcXVpcmVkRmllbGRdOiByZXF1aXJlZEZpZWxkRXJyb3JzfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIGlzRW1wdHkocmVxdWlyaW5nRmllbGRFcnJvcnMpID9cbiAgICAgICAgICAgIG51bGwgOiB7W3JlcXVpcmluZ0ZpZWxkXTogcmVxdWlyaW5nRmllbGRFcnJvcnN9XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICByZXR1cm4gaXNFbXB0eShhbGxFcnJvcnMpID8gbnVsbCA6IGFsbEVycm9yc1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnbWluSXRlbXMnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGZvcm0gYXJyYXkgdG8gaGF2ZSBhIG1pbmltdW0gbnVtYmVyIG9mIHZhbHVlcy5cbiAgICpcbiAgICogQHBhcmFtIG1pbmltdW1JdGVtcyAtIG1pbmltdW0gbnVtYmVyIG9mIGl0ZW1zIGFsbG93ZWRcbiAgICovXG4gIHN0YXRpYyBtaW5JdGVtcyhtaW5pbXVtSXRlbXM6IG51bWJlcik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShtaW5pbXVtSXRlbXMpKSB7XG4gICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvclxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgY29uc3QgY3VycmVudEl0ZW1zID0gaXNBcnJheShjb250cm9sLnZhbHVlKSA/IGNvbnRyb2wudmFsdWUubGVuZ3RoIDogMFxuICAgICAgY29uc3QgaXNWYWxpZCA9IGN1cnJlbnRJdGVtcyA+PSBtaW5pbXVtSXRlbXNcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7bWluSXRlbXM6IHttaW5pbXVtSXRlbXMsIGN1cnJlbnRJdGVtc319XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdtYXhJdGVtcycgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgZm9ybSBhcnJheSB0byBoYXZlIGEgbWF4aW11bSBudW1iZXIgb2YgdmFsdWVzLlxuICAgKlxuICAgKiBAcGFyYW0gbWF4aW11bUl0ZW1zIC0gbWF4aW11bSBudW1iZXIgb2YgaXRlbXMgYWxsb3dlZFxuICAgKi9cbiAgc3RhdGljIG1heEl0ZW1zKG1heGltdW1JdGVtczogbnVtYmVyKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKG1heGltdW1JdGVtcykpIHtcbiAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRJdGVtcyA9IGlzQXJyYXkoY29udHJvbC52YWx1ZSkgPyBjb250cm9sLnZhbHVlLmxlbmd0aCA6IDBcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBjdXJyZW50SXRlbXMgPD0gbWF4aW11bUl0ZW1zXG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDoge21heEl0ZW1zOiB7bWF4aW11bUl0ZW1zLCBjdXJyZW50SXRlbXN9fVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAndW5pcXVlSXRlbXMnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyB2YWx1ZXMgaW4gYSBmb3JtIGFycmF5IHRvIGJlIHVuaXF1ZS5cbiAgICpcbiAgICogQHBhcmFtIHVuaXF1ZT8gLSB0cnVlIHRvIHZhbGlkYXRlLCBmYWxzZSB0byBkaXNhYmxlXG4gICAqL1xuICBzdGF0aWMgdW5pcXVlSXRlbXModW5pcXVlID0gdHJ1ZSk6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCF1bmlxdWUpIHtcbiAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICBjb25zdCBzb3J0ZWQ6IGFueVtdID0gY29udHJvbC52YWx1ZS5zbGljZSgpLnNvcnQoKVxuICAgICAgY29uc3QgZHVwbGljYXRlSXRlbXMgPSBbXVxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzb3J0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNvcnRlZFtpIC0gMV0gPT09IHNvcnRlZFtpXSAmJiBkdXBsaWNhdGVJdGVtcy5pbmNsdWRlcyhzb3J0ZWRbaV0pKSB7XG4gICAgICAgICAgZHVwbGljYXRlSXRlbXMucHVzaChzb3J0ZWRbaV0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IGlzVmFsaWQgPSAhZHVwbGljYXRlSXRlbXMubGVuZ3RoXG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDoge3VuaXF1ZUl0ZW1zOiB7ZHVwbGljYXRlSXRlbXN9fVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnY29udGFpbnMnIHZhbGlkYXRvclxuICAgKlxuICAgKiBUT0RPOiBDb21wbGV0ZSB0aGlzIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyB2YWx1ZXMgaW4gYSBmb3JtIGFycmF5IHRvIGJlIHVuaXF1ZS5cbiAgICpcbiAgICogQHBhcmFtIHJlcXVpcmVkSXRlbT8gLSB0cnVlIHRvIHZhbGlkYXRlLCBmYWxzZSB0byBkaXNhYmxlXG4gICAqL1xuICBzdGF0aWMgY29udGFpbnMocmVxdWlyZWRJdGVtID0gdHJ1ZSk6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFyZXF1aXJlZEl0ZW0pIHtcbiAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpIHx8ICFpc0FycmF5KGNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICBjb25zdCBjdXJyZW50SXRlbXMgPSBjb250cm9sLnZhbHVlXG4gICAgICAvLyBjb25zdCBpc1ZhbGlkID0gY3VycmVudEl0ZW1zLnNvbWUoaXRlbSA9PlxuICAgICAgLy9cbiAgICAgIC8vICk7XG4gICAgICBjb25zdCBpc1ZhbGlkID0gdHJ1ZVxuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHtjb250YWluczoge3JlcXVpcmVkSXRlbSwgY3VycmVudEl0ZW1zfX1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTm8tb3AgdmFsaWRhdG9yLiBJbmNsdWRlZCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eS5cbiAgICovXG4gIHN0YXRpYyBudWxsVmFsaWRhdG9yKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRvciB0cmFuc2Zvcm1hdGlvbiBmdW5jdGlvbnM6XG4gICAqIGNvbXBvc2VBbnlPZiwgY29tcG9zZU9uZU9mLCBjb21wb3NlQWxsT2YsIGNvbXBvc2VOb3QsXG4gICAqIGNvbXBvc2UsIGNvbXBvc2VBc3luY1xuICAgKlxuICAgKiBUT0RPOiBBZGQgY29tcG9zZUFueU9mQXN5bmMsIGNvbXBvc2VPbmVPZkFzeW5jLFxuICAgKiAgICAgICAgICAgY29tcG9zZUFsbE9mQXN5bmMsIGNvbXBvc2VOb3RBc3luY1xuICAgKi9cblxuICAvKipcbiAgICogJ2NvbXBvc2VBbnlPZicgdmFsaWRhdG9yIGNvbWJpbmF0aW9uIGZ1bmN0aW9uXG4gICAqXG4gICAqIEFjY2VwdHMgYW4gYXJyYXkgb2YgdmFsaWRhdG9ycyBhbmQgcmV0dXJucyBhIHNpbmdsZSB2YWxpZGF0b3IgdGhhdFxuICAgKiBldmFsdWF0ZXMgdG8gdmFsaWQgaWYgYW55IG9uZSBvciBtb3JlIG9mIHRoZSBzdWJtaXR0ZWQgdmFsaWRhdG9ycyBhcmVcbiAgICogdmFsaWQuIElmIGV2ZXJ5IHZhbGlkYXRvciBpcyBpbnZhbGlkLCBpdCByZXR1cm5zIGNvbWJpbmVkIGVycm9ycyBmcm9tXG4gICAqIGFsbCB2YWxpZGF0b3JzLlxuICAgKlxuICAgKiBAcGFyYW0gdmFsaWRhdG9ycyAtIGFycmF5IG9mIHZhbGlkYXRvcnMgdG8gY29tYmluZVxuICAgKi9cbiAgc3RhdGljIGNvbXBvc2VBbnlPZih2YWxpZGF0b3JzOiBJVmFsaWRhdG9yRm5bXSk6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCF2YWxpZGF0b3JzKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBjb25zdCBwcmVzZW50VmFsaWRhdG9ycyA9IHZhbGlkYXRvcnMuZmlsdGVyKGlzRGVmaW5lZClcbiAgICBpZiAocHJlc2VudFZhbGlkYXRvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBjb25zdCBhcnJheU9mRXJyb3JzID1cbiAgICAgICAgZXhlY3V0ZVZhbGlkYXRvcnMoY29udHJvbCwgcHJlc2VudFZhbGlkYXRvcnMsIGludmVydCkuZmlsdGVyKGlzRGVmaW5lZClcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSB2YWxpZGF0b3JzLmxlbmd0aCA+IGFycmF5T2ZFcnJvcnMubGVuZ3RoXG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDogbWVyZ2VPYmplY3RzKC4uLmFycmF5T2ZFcnJvcnMsIHthbnlPZjogIWludmVydH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdjb21wb3NlT25lT2YnIHZhbGlkYXRvciBjb21iaW5hdGlvbiBmdW5jdGlvblxuICAgKlxuICAgKiBBY2NlcHRzIGFuIGFycmF5IG9mIHZhbGlkYXRvcnMgYW5kIHJldHVybnMgYSBzaW5nbGUgdmFsaWRhdG9yIHRoYXRcbiAgICogZXZhbHVhdGVzIHRvIHZhbGlkIG9ubHkgaWYgZXhhY3RseSBvbmUgb2YgdGhlIHN1Ym1pdHRlZCB2YWxpZGF0b3JzXG4gICAqIGlzIHZhbGlkLiBPdGhlcndpc2UgcmV0dXJucyBjb21iaW5lZCBpbmZvcm1hdGlvbiBmcm9tIGFsbCB2YWxpZGF0b3JzLFxuICAgKiBib3RoIHZhbGlkIGFuZCBpbnZhbGlkLlxuICAgKlxuICAgKiBAcGFyYW0gdmFsaWRhdG9ycyAtIGFycmF5IG9mIHZhbGlkYXRvcnMgdG8gY29tYmluZVxuICAgKiBAcmV0dXJuIHNpbmdsZSBjb21iaW5lZCB2YWxpZGF0b3IgZnVuY3Rpb25cbiAgICovXG4gIHN0YXRpYyBjb21wb3NlT25lT2YodmFsaWRhdG9yczogSVZhbGlkYXRvckZuW10pOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghdmFsaWRhdG9ycykge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgY29uc3QgcHJlc2VudFZhbGlkYXRvcnMgPSB2YWxpZGF0b3JzLmZpbHRlcihpc0RlZmluZWQpXG4gICAgaWYgKHByZXNlbnRWYWxpZGF0b3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgY29uc3QgYXJyYXlPZkVycm9ycyA9XG4gICAgICAgIGV4ZWN1dGVWYWxpZGF0b3JzKGNvbnRyb2wsIHByZXNlbnRWYWxpZGF0b3JzKVxuICAgICAgY29uc3QgdmFsaWRDb250cm9scyA9XG4gICAgICAgIHZhbGlkYXRvcnMubGVuZ3RoIC0gYXJyYXlPZkVycm9ycy5maWx0ZXIoaXNEZWZpbmVkKS5sZW5ndGhcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSB2YWxpZENvbnRyb2xzID09PSAxXG4gICAgICBpZiAoeG9yKGlzVmFsaWQsIGludmVydCkpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICAgIGNvbnN0IGFycmF5T2ZWYWxpZHMgPVxuICAgICAgICBleGVjdXRlVmFsaWRhdG9ycyhjb250cm9sLCBwcmVzZW50VmFsaWRhdG9ycywgaW52ZXJ0KVxuICAgICAgcmV0dXJuIG1lcmdlT2JqZWN0cyguLi5hcnJheU9mRXJyb3JzLCAuLi5hcnJheU9mVmFsaWRzLCB7b25lT2Y6ICFpbnZlcnR9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnY29tcG9zZUFsbE9mJyB2YWxpZGF0b3IgY29tYmluYXRpb24gZnVuY3Rpb25cbiAgICpcbiAgICogQWNjZXB0cyBhbiBhcnJheSBvZiB2YWxpZGF0b3JzIGFuZCByZXR1cm5zIGEgc2luZ2xlIHZhbGlkYXRvciB0aGF0XG4gICAqIGV2YWx1YXRlcyB0byB2YWxpZCBvbmx5IGlmIGFsbCB0aGUgc3VibWl0dGVkIHZhbGlkYXRvcnMgYXJlIGluZGl2aWR1YWxseVxuICAgKiB2YWxpZC4gT3RoZXJ3aXNlIGl0IHJldHVybnMgY29tYmluZWQgZXJyb3JzIGZyb20gYWxsIGludmFsaWQgdmFsaWRhdG9ycy5cbiAgICpcbiAgICogQHBhcmFtIHZhbGlkYXRvcnMgLSBhcnJheSBvZiB2YWxpZGF0b3JzIHRvIGNvbWJpbmVcbiAgICogQHJldHVybiBzaW5nbGUgY29tYmluZWQgdmFsaWRhdG9yIGZ1bmN0aW9uXG4gICAqL1xuICBzdGF0aWMgY29tcG9zZUFsbE9mKHZhbGlkYXRvcnM6IElWYWxpZGF0b3JGbltdKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIXZhbGlkYXRvcnMpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGNvbnN0IHByZXNlbnRWYWxpZGF0b3JzID0gdmFsaWRhdG9ycy5maWx0ZXIoaXNEZWZpbmVkKVxuICAgIGlmIChwcmVzZW50VmFsaWRhdG9ycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGNvbnN0IGNvbWJpbmVkRXJyb3JzID0gbWVyZ2VFcnJvcnMoXG4gICAgICAgIGV4ZWN1dGVWYWxpZGF0b3JzKGNvbnRyb2wsIHByZXNlbnRWYWxpZGF0b3JzLCBpbnZlcnQpXG4gICAgICApXG4gICAgICBjb25zdCBpc1ZhbGlkID0gY29tYmluZWRFcnJvcnMgPT09IG51bGxcbiAgICAgIHJldHVybiAoeG9yKGlzVmFsaWQsIGludmVydCkpID9cbiAgICAgICAgbnVsbCA6IG1lcmdlT2JqZWN0cyhjb21iaW5lZEVycm9ycywge2FsbE9mOiAhaW52ZXJ0fSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ2NvbXBvc2VOb3QnIHZhbGlkYXRvciBpbnZlcnNpb24gZnVuY3Rpb25cbiAgICpcbiAgICogQWNjZXB0cyBhIHNpbmdsZSB2YWxpZGF0b3IgZnVuY3Rpb24gYW5kIGludmVydHMgaXRzIHJlc3VsdC5cbiAgICogUmV0dXJucyB2YWxpZCBpZiB0aGUgc3VibWl0dGVkIHZhbGlkYXRvciBpcyBpbnZhbGlkLCBhbmRcbiAgICogcmV0dXJucyBpbnZhbGlkIGlmIHRoZSBzdWJtaXR0ZWQgdmFsaWRhdG9yIGlzIHZhbGlkLlxuICAgKiAoTm90ZTogdGhpcyBmdW5jdGlvbiBjYW4gaXRzZWxmIGJlIGludmVydGVkXG4gICAqICAgLSBlLmcuIGNvbXBvc2VOb3QoY29tcG9zZU5vdCh2YWxpZGF0b3IpKSAtXG4gICAqICAgYnV0IHRoaXMgY2FuIGJlIGNvbmZ1c2luZyBhbmQgaXMgdGhlcmVmb3JlIG5vdCByZWNvbW1lbmRlZC4pXG4gICAqXG4gICAqIEBwYXJhbSB2YWxpZGF0b3IgLSB2YWxpZGF0b3IocykgdG8gaW52ZXJ0XG4gICAqIEByZXR1cm4gbmV3IHZhbGlkYXRvciBmdW5jdGlvbiB0aGF0IHJldHVybnMgb3Bwb3NpdGUgcmVzdWx0XG4gICAqL1xuICBzdGF0aWMgY29tcG9zZU5vdCh2YWxpZGF0b3I6IElWYWxpZGF0b3JGbik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCF2YWxpZGF0b3IpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICBjb25zdCBlcnJvciA9IHZhbGlkYXRvcihjb250cm9sLCAhaW52ZXJ0KVxuICAgICAgY29uc3QgaXNWYWxpZCA9IGVycm9yID09PSBudWxsXG4gICAgICByZXR1cm4gKHhvcihpc1ZhbGlkLCBpbnZlcnQpKSA/XG4gICAgICAgIG51bGwgOiBtZXJnZU9iamVjdHMoZXJyb3IsIHtub3Q6ICFpbnZlcnR9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnY29tcG9zZScgdmFsaWRhdG9yIGNvbWJpbmF0aW9uIGZ1bmN0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB2YWxpZGF0b3JzIC0gYXJyYXkgb2YgdmFsaWRhdG9ycyB0byBjb21iaW5lXG4gICAqIEByZXR1cm4gc2luZ2xlIGNvbWJpbmVkIHZhbGlkYXRvciBmdW5jdGlvblxuICAgKi9cbiAgc3RhdGljIGNvbXBvc2UodmFsaWRhdG9yczogSVZhbGlkYXRvckZuW10pOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghdmFsaWRhdG9ycykge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgY29uc3QgcHJlc2VudFZhbGlkYXRvcnMgPSB2YWxpZGF0b3JzLmZpbHRlcihpc0RlZmluZWQpXG4gICAgaWYgKHByZXNlbnRWYWxpZGF0b3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT5cbiAgICAgIG1lcmdlRXJyb3JzKGV4ZWN1dGVWYWxpZGF0b3JzKGNvbnRyb2wsIHByZXNlbnRWYWxpZGF0b3JzLCBpbnZlcnQpKVxuICB9XG5cbiAgLyoqXG4gICAqICdjb21wb3NlQXN5bmMnIGFzeW5jIHZhbGlkYXRvciBjb21iaW5hdGlvbiBmdW5jdGlvblxuICAgKlxuICAgKiBAcGFyYW0gdmFsaWRhdG9ycyAtIGFycmF5IG9mIGFzeW5jIHZhbGlkYXRvcnNcbiAgICogQHJldHVybiBzaW5nbGUgY29tYmluZWQgYXN5bmMgdmFsaWRhdG9yIGZ1bmN0aW9uXG4gICAqL1xuICBzdGF0aWMgY29tcG9zZUFzeW5jKHZhbGlkYXRvcnM6IEFzeW5jSVZhbGlkYXRvckZuW10pOiBBc3luY0lWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCF2YWxpZGF0b3JzKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBjb25zdCBwcmVzZW50VmFsaWRhdG9ycyA9IHZhbGlkYXRvcnMuZmlsdGVyKGlzRGVmaW5lZClcbiAgICBpZiAocHJlc2VudFZhbGlkYXRvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCkgPT4ge1xuICAgICAgY29uc3Qgb2JzZXJ2YWJsZXMgPVxuICAgICAgICBleGVjdXRlQXN5bmNWYWxpZGF0b3JzKGNvbnRyb2wsIHByZXNlbnRWYWxpZGF0b3JzKS5tYXAodG9PYnNlcnZhYmxlKVxuICAgICAgcmV0dXJuIG1hcC5jYWxsKGZvcmtKb2luKG9ic2VydmFibGVzKSwgbWVyZ2VFcnJvcnMpXG4gICAgfVxuICB9XG5cbiAgLy8gQWRkaXRpb25hbCBhbmd1bGFyIHZhbGlkYXRvcnMgKG5vdCB1c2VkIGJ5IEFuZ3VhbHIgSlNPTiBTY2hlbWEgRm9ybSlcbiAgLy8gRnJvbSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2Jsb2IvbWFzdGVyL3BhY2thZ2VzL2Zvcm1zL3NyYy92YWxpZGF0b3JzLnRzXG5cbiAgLyoqXG4gICAqIFZhbGlkYXRvciB0aGF0IHJlcXVpcmVzIGNvbnRyb2xzIHRvIGhhdmUgYSB2YWx1ZSBncmVhdGVyIHRoYW4gYSBudW1iZXIuXG4gICAqL1xuICBzdGF0aWMgbWluKG1pbjogbnVtYmVyKTogVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUobWluKSkge1xuICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3JcbiAgICB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAvLyBkb24ndCB2YWxpZGF0ZSBlbXB0eSB2YWx1ZXMgdG8gYWxsb3cgb3B0aW9uYWwgY29udHJvbHNcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpIHx8IGlzRW1wdHkobWluKSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgY29uc3QgdmFsdWUgPSBwYXJzZUZsb2F0KGNvbnRyb2wudmFsdWUpXG4gICAgICBjb25zdCBhY3R1YWwgPSBjb250cm9sLnZhbHVlXG4gICAgICAvLyBDb250cm9scyB3aXRoIE5hTiB2YWx1ZXMgYWZ0ZXIgcGFyc2luZyBzaG91bGQgYmUgdHJlYXRlZCBhcyBub3QgaGF2aW5nIGFcbiAgICAgIC8vIG1pbmltdW0sIHBlciB0aGUgSFRNTCBmb3JtcyBzcGVjOiBodHRwczovL3d3dy53My5vcmcvVFIvaHRtbDUvZm9ybXMuaHRtbCNhdHRyLWlucHV0LW1pblxuICAgICAgcmV0dXJuIGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA+PSBtaW4gPyBudWxsIDoge21pbjoge21pbiwgYWN0dWFsfX1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdG9yIHRoYXQgcmVxdWlyZXMgY29udHJvbHMgdG8gaGF2ZSBhIHZhbHVlIGxlc3MgdGhhbiBhIG51bWJlci5cbiAgICovXG4gIHN0YXRpYyBtYXgobWF4OiBudW1iZXIpOiBWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShtYXgpKSB7XG4gICAgICByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvclxuICAgIH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIC8vIGRvbid0IHZhbGlkYXRlIGVtcHR5IHZhbHVlcyB0byBhbGxvdyBvcHRpb25hbCBjb250cm9sc1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkgfHwgaXNFbXB0eShtYXgpKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICBjb25zdCB2YWx1ZSA9IHBhcnNlRmxvYXQoY29udHJvbC52YWx1ZSlcbiAgICAgIGNvbnN0IGFjdHVhbCA9IGNvbnRyb2wudmFsdWVcbiAgICAgIC8vIENvbnRyb2xzIHdpdGggTmFOIHZhbHVlcyBhZnRlciBwYXJzaW5nIHNob3VsZCBiZSB0cmVhdGVkIGFzIG5vdCBoYXZpbmcgYVxuICAgICAgLy8gbWF4aW11bSwgcGVyIHRoZSBIVE1MIGZvcm1zIHNwZWM6IGh0dHBzOi8vd3d3LnczLm9yZy9UUi9odG1sNS9mb3Jtcy5odG1sI2F0dHItaW5wdXQtbWF4XG4gICAgICByZXR1cm4gaXNOYU4odmFsdWUpIHx8IHZhbHVlIDw9IG1heCA/IG51bGwgOiB7bWF4OiB7bWF4LCBhY3R1YWx9fVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0b3IgdGhhdCByZXF1aXJlcyBjb250cm9sIHZhbHVlIHRvIGJlIHRydWUuXG4gICAqL1xuICBzdGF0aWMgcmVxdWlyZWRUcnVlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgICBpZiAoIWNvbnRyb2wpIHtcbiAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yXG4gICAgfVxuICAgIHJldHVybiBjb250cm9sLnZhbHVlID09PSB0cnVlID8gbnVsbCA6IHtyZXF1aXJlZDogdHJ1ZX1cbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0b3IgdGhhdCBwZXJmb3JtcyBlbWFpbCB2YWxpZGF0aW9uLlxuICAgKi9cbiAgc3RhdGljIGVtYWlsKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgICBpZiAoIWNvbnRyb2wpIHtcbiAgICAgIHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yXG4gICAgfVxuICAgIGNvbnN0IEVNQUlMX1JFR0VYUCA9XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxpbmUtbGVuZ3RoXG4gICAgICAvXig/PS57MSwyNTR9JCkoPz0uezEsNjR9QClbLSEjJCUmJyorLzAtOT0/QS1aXl9gYS16e3x9fl0rKFxcLlstISMkJSYnKisvMC05PT9BLVpeX2BhLXp7fH1+XSspKkBbQS1aYS16MC05XShbQS1aYS16MC05LV17MCw2MX1bQS1aYS16MC05XSk/KFxcLltBLVphLXowLTldKFtBLVphLXowLTktXXswLDYxfVtBLVphLXowLTldKT8pKiQvXG4gICAgcmV0dXJuIEVNQUlMX1JFR0VYUC50ZXN0KGNvbnRyb2wudmFsdWUpID8gbnVsbCA6IHtlbWFpbDogdHJ1ZX1cbiAgfVxufVxuIl19