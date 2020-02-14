import { OnChanges, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from '@ngsf/widget-library';
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
}
