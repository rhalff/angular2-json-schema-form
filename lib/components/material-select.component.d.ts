import { OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { isArray } from '@ngsf/common';
import { JsonSchemaFormService } from '@ngsf/widget-library';
export declare class MaterialSelectComponent implements OnInit {
    private jsf;
    formControl: AbstractControl;
    controlName: string;
    controlValue: any;
    controlDisabled: boolean;
    boundControl: boolean;
    options: any;
    selectList: any[];
    isArray: typeof isArray;
    layoutNode: any;
    layoutIndex: number[];
    dataIndex: number[];
    constructor(jsf: JsonSchemaFormService);
    ngOnInit(): void;
    updateValue(event: any): void;
}
