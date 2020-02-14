import { JsonSchemaFormService } from '@ngsf/widget-library';
export declare class FlexLayoutRootComponent {
    private jsf;
    dataIndex: number[];
    layoutIndex: number[];
    layout: any[];
    isFlexItem: boolean;
    constructor(jsf: JsonSchemaFormService);
    removeItem(item: any): void;
    getFlexAttribute(node: any, attribute: string): any;
    showWidget(layoutNode: any): boolean;
}
