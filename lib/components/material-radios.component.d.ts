import { OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from '@ngsf/widget-library';
export declare class MaterialRadiosComponent implements OnInit {
    private jsf;
    formControl: AbstractControl;
    controlName: string;
    controlValue: any;
    controlDisabled: boolean;
    boundControl: boolean;
    options: any;
    flexDirection: string;
    radiosList: any[];
    layoutNode: any;
    layoutIndex: number[];
    dataIndex: number[];
    constructor(jsf: JsonSchemaFormService);
    ngOnInit(): void;
    updateValue(value: any): void;
}
