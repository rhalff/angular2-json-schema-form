import { OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from '@ngsf/widget-library';
export declare class MaterialCheckboxComponent implements OnInit {
    private jsf;
    formControl: AbstractControl;
    controlName: string;
    controlValue: any;
    controlDisabled: boolean;
    boundControl: boolean;
    options: any;
    trueValue: any;
    falseValue: any;
    showSlideToggle: boolean;
    layoutNode: any;
    layoutIndex: number[];
    dataIndex: number[];
    constructor(jsf: JsonSchemaFormService);
    get isChecked(): boolean;
    ngOnInit(): void;
    updateValue(event: any): void;
}
