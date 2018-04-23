export declare type Pointer = string | string[];
export declare class JsonPointer {
    static get(object: any, pointer: any, startSlice?: number, endSlice?: number, getBoolean?: boolean, errors?: boolean): any;
    static getCopy(object: any, pointer: any, startSlice?: number, endSlice?: number, getBoolean?: boolean, errors?: boolean): any;
    static getFirst(items: any, defaultValue?: any, getCopy?: boolean): any;
    static getFirstCopy(items: any, defaultValue?: any): any;
    static set(object: any, pointer: any, value: any, insert?: boolean): any;
    static setCopy(object: any, pointer: any, value: any, insert?: boolean): any;
    static insert(object: any, pointer: any, value: any): any;
    static insertCopy(object: any, pointer: any, value: any): any;
    static remove(object: any, pointer: any): any;
    static has(object: any, pointer: any): any;
    static dict(object: any): any;
    static forEachDeep(object: any, fn?: (v: any, p?: string, o?: any) => any, bottomUp?: boolean, pointer?: string, rootObject?: any): void;
    static forEachDeepCopy(object: any, fn?: (v: any, p?: string, o?: any) => any, bottomUp?: boolean, pointer?: string, rootObject?: any): any;
    static escape(key: any): any;
    static unescape(key: any): any;
    static parse(pointer: any, errors?: boolean): any[];
    static compile(pointer: any, defaultValue?: string, errors?: boolean): any;
    static toKey(pointer: any, errors?: boolean): any;
    static isJsonPointer(value: any): any;
    static isSubPointer(shortPointer: any, longPointer: any, trueIfMatching?: boolean, errors?: boolean): boolean;
    static toIndexedPointer(genericPointer: any, indexArray: any, arrayMap?: Map<string, number>): any;
    static toGenericPointer(indexedPointer: any, arrayMap?: Map<string, number>): any;
    static toControlPointer(dataPointer: any, formGroup: any, controlMustExist?: boolean): any;
    static toSchemaPointer(dataPointer: any, schema: any): any;
    static toDataPointer(schemaPointer: any, schema: any, errors?: boolean): any;
    static parseObjectPath(path: any): any[];
}
