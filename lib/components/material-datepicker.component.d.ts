import { OnChanges, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from '@ngsf/widget-library';
import * as i0 from "@angular/core";
export declare class MaterialDatepickerComponent implements OnInit, OnChanges {
    private jsf;
    formControl: AbstractControl;
    controlName: string;
    controlValue: any;
    dateValue: any;
    controlDisabled: boolean;
    boundControl: boolean;
    options: any;
    autoCompleteList: string[];
    layoutNode: any;
    layoutIndex: number[];
    dataIndex: number[];
    constructor(jsf: JsonSchemaFormService);
    ngOnInit(): void;
    ngOnChanges(): void;
    setControlDate(dateString: string): void;
    updateValue(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MaterialDatepickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MaterialDatepickerComponent, "material-datepicker-widget", never, { "layoutNode": "layoutNode"; "layoutIndex": "layoutIndex"; "dataIndex": "dataIndex"; }, {}, never, never, false, never>;
}
