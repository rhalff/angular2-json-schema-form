export declare function buildFormGroupTemplate(jsf: any, nodeValue?: any, setValues?: boolean, schemaPointer?: string, dataPointer?: string, templatePointer?: string): {
    controlType: string;
    controls: any;
    validators: any;
    value?: undefined;
} | {
    controlType: string;
    value: {
        value: any;
        disabled: any;
    };
    validators: any;
    controls?: undefined;
};
