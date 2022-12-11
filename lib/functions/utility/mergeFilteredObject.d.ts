import { PlainObject } from '../validator';
export declare function mergeFilteredObject(targetObject: PlainObject, sourceObject: PlainObject, excludeKeys?: string[], keyFn?: (key: string) => string, valFn?: (val: any) => any): PlainObject;
