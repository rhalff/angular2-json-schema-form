import { isArray, isEmpty, isObject } from '../validator';
export function mergeValues(...valuesToMerge) {
    let mergedValues = null;
    for (const currentValue of valuesToMerge) {
        if (!isEmpty(currentValue)) {
            if (typeof currentValue === 'object' &&
                (isEmpty(mergedValues) || typeof mergedValues !== 'object')) {
                if (isArray(currentValue)) {
                    mergedValues = [...currentValue];
                }
                else if (isObject(currentValue)) {
                    mergedValues = Object.assign({}, currentValue);
                }
            }
            else if (typeof currentValue !== 'object') {
                mergedValues = currentValue;
            }
            else if (isObject(mergedValues) && isObject(currentValue)) {
                Object.assign(mergedValues, currentValue);
            }
            else if (isObject(mergedValues) && isArray(currentValue)) {
                const newValues = [];
                for (const value of currentValue) {
                    newValues.push(mergeValues(mergedValues, value));
                }
                mergedValues = newValues;
            }
            else if (isArray(mergedValues) && isObject(currentValue)) {
                const newValues = [];
                for (const value of mergedValues) {
                    newValues.push(mergeValues(value, currentValue));
                }
                mergedValues = newValues;
            }
            else if (isArray(mergedValues) && isArray(currentValue)) {
                const newValues = [];
                for (let i = 0; i < Math.max(mergedValues.length, currentValue.length); i++) {
                    if (i < mergedValues.length && i < currentValue.length) {
                        newValues.push(mergeValues(mergedValues[i], currentValue[i]));
                    }
                    else if (i < mergedValues.length) {
                        newValues.push(mergedValues[i]);
                    }
                    else if (i < currentValue.length) {
                        newValues.push(currentValue[i]);
                    }
                }
                mergedValues = newValues;
            }
        }
    }
    return mergedValues;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VWYWx1ZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3NmLWNvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9mdW5jdGlvbnMvZm9ybS1ncm91cC9tZXJnZVZhbHVlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFRdkQsTUFBTSxVQUFVLFdBQVcsQ0FBQyxHQUFHLGFBQW9CO0lBQ2pELElBQUksWUFBWSxHQUFRLElBQUksQ0FBQTtJQUM1QixLQUFLLE1BQU0sWUFBWSxJQUFJLGFBQWEsRUFBRTtRQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzFCLElBQUksT0FBTyxZQUFZLEtBQUssUUFBUTtnQkFDbEMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksT0FBTyxZQUFZLEtBQUssUUFBUSxDQUFDLEVBQzNEO2dCQUNBLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFO29CQUN6QixZQUFZLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFBO2lCQUNqQztxQkFBTSxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtvQkFDakMsWUFBWSxxQkFBTyxZQUFZLENBQUMsQ0FBQTtpQkFDakM7YUFDRjtpQkFBTSxJQUFJLE9BQU8sWUFBWSxLQUFLLFFBQVEsRUFBRTtnQkFDM0MsWUFBWSxHQUFHLFlBQVksQ0FBQTthQUM1QjtpQkFBTSxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQzNELE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFBO2FBQzFDO2lCQUFNLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDMUQsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFBO2dCQUNwQixLQUFLLE1BQU0sS0FBSyxJQUFJLFlBQVksRUFBRTtvQkFDaEMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUE7aUJBQ2pEO2dCQUNELFlBQVksR0FBRyxTQUFTLENBQUE7YUFDekI7aUJBQU0sSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUMxRCxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUE7Z0JBQ3BCLEtBQUssTUFBTSxLQUFLLElBQUksWUFBWSxFQUFFO29CQUNoQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQTtpQkFDakQ7Z0JBQ0QsWUFBWSxHQUFHLFNBQVMsQ0FBQTthQUN6QjtpQkFBTSxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQ3pELE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQTtnQkFDcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzNFLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUU7d0JBQ3RELFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO3FCQUM5RDt5QkFBTSxJQUFJLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFO3dCQUNsQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO3FCQUNoQzt5QkFBTSxJQUFJLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFO3dCQUNsQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO3FCQUNoQztpQkFDRjtnQkFDRCxZQUFZLEdBQUcsU0FBUyxDQUFBO2FBQ3pCO1NBQ0Y7S0FDRjtJQUNELE9BQU8sWUFBWSxDQUFBO0FBQ3JCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzQXJyYXksIGlzRW1wdHksIGlzT2JqZWN0fSBmcm9tICcuLi92YWxpZGF0b3InXG5cbi8qKlxuICogJ21lcmdlVmFsdWVzJyBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSAgdmFsdWVzVG9NZXJnZSAtIE11bHRpcGxlIHZhbHVlcyB0byBtZXJnZVxuICogQHJldHVybiBNZXJnZWQgdmFsdWVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZVZhbHVlcyguLi52YWx1ZXNUb01lcmdlOiBhbnlbXSkge1xuICBsZXQgbWVyZ2VkVmFsdWVzOiBhbnkgPSBudWxsXG4gIGZvciAoY29uc3QgY3VycmVudFZhbHVlIG9mIHZhbHVlc1RvTWVyZ2UpIHtcbiAgICBpZiAoIWlzRW1wdHkoY3VycmVudFZhbHVlKSkge1xuICAgICAgaWYgKHR5cGVvZiBjdXJyZW50VmFsdWUgPT09ICdvYmplY3QnICYmXG4gICAgICAgIChpc0VtcHR5KG1lcmdlZFZhbHVlcykgfHwgdHlwZW9mIG1lcmdlZFZhbHVlcyAhPT0gJ29iamVjdCcpXG4gICAgICApIHtcbiAgICAgICAgaWYgKGlzQXJyYXkoY3VycmVudFZhbHVlKSkge1xuICAgICAgICAgIG1lcmdlZFZhbHVlcyA9IFsuLi5jdXJyZW50VmFsdWVdXG4gICAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QoY3VycmVudFZhbHVlKSkge1xuICAgICAgICAgIG1lcmdlZFZhbHVlcyA9IHsuLi5jdXJyZW50VmFsdWV9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGN1cnJlbnRWYWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgbWVyZ2VkVmFsdWVzID0gY3VycmVudFZhbHVlXG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KG1lcmdlZFZhbHVlcykgJiYgaXNPYmplY3QoY3VycmVudFZhbHVlKSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKG1lcmdlZFZhbHVlcywgY3VycmVudFZhbHVlKVxuICAgICAgfSBlbHNlIGlmIChpc09iamVjdChtZXJnZWRWYWx1ZXMpICYmIGlzQXJyYXkoY3VycmVudFZhbHVlKSkge1xuICAgICAgICBjb25zdCBuZXdWYWx1ZXMgPSBbXVxuICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgIG5ld1ZhbHVlcy5wdXNoKG1lcmdlVmFsdWVzKG1lcmdlZFZhbHVlcywgdmFsdWUpKVxuICAgICAgICB9XG4gICAgICAgIG1lcmdlZFZhbHVlcyA9IG5ld1ZhbHVlc1xuICAgICAgfSBlbHNlIGlmIChpc0FycmF5KG1lcmdlZFZhbHVlcykgJiYgaXNPYmplY3QoY3VycmVudFZhbHVlKSkge1xuICAgICAgICBjb25zdCBuZXdWYWx1ZXMgPSBbXVxuICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIG1lcmdlZFZhbHVlcykge1xuICAgICAgICAgIG5ld1ZhbHVlcy5wdXNoKG1lcmdlVmFsdWVzKHZhbHVlLCBjdXJyZW50VmFsdWUpKVxuICAgICAgICB9XG4gICAgICAgIG1lcmdlZFZhbHVlcyA9IG5ld1ZhbHVlc1xuICAgICAgfSBlbHNlIGlmIChpc0FycmF5KG1lcmdlZFZhbHVlcykgJiYgaXNBcnJheShjdXJyZW50VmFsdWUpKSB7XG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlcyA9IFtdXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTWF0aC5tYXgobWVyZ2VkVmFsdWVzLmxlbmd0aCwgY3VycmVudFZhbHVlLmxlbmd0aCk7IGkrKykge1xuICAgICAgICAgIGlmIChpIDwgbWVyZ2VkVmFsdWVzLmxlbmd0aCAmJiBpIDwgY3VycmVudFZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgbmV3VmFsdWVzLnB1c2gobWVyZ2VWYWx1ZXMobWVyZ2VkVmFsdWVzW2ldLCBjdXJyZW50VmFsdWVbaV0pKVxuICAgICAgICAgIH0gZWxzZSBpZiAoaSA8IG1lcmdlZFZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlcy5wdXNoKG1lcmdlZFZhbHVlc1tpXSlcbiAgICAgICAgICB9IGVsc2UgaWYgKGkgPCBjdXJyZW50VmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICBuZXdWYWx1ZXMucHVzaChjdXJyZW50VmFsdWVbaV0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG1lcmdlZFZhbHVlcyA9IG5ld1ZhbHVlc1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbWVyZ2VkVmFsdWVzXG59XG4iXX0=