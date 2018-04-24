import { TitleMapItem } from '../json-schema-form.service';
export declare function buildLayout(jsf: any, widgetLibrary: any): any[];
export declare function buildLayoutFromSchema(jsf: any, widgetLibrary: any, nodeValue?: any, schemaPointer?: string, dataPointer?: string, arrayItem?: boolean, arrayItemType?: string, removable?: boolean, forRefLibrary?: boolean, dataPointerPrefix?: string): any;
export declare function mapLayout(layout: any, fn: any, layoutPointer?: string, rootLayout?: any): any[];
export declare function getLayoutNode(refNode: any, jsf: any, widgetLibrary?: any, nodeValue?: any): any;
export declare function buildTitleMap(titleMap: any, enumList: any, fieldRequired?: boolean, flatList?: boolean): TitleMapItem[];
