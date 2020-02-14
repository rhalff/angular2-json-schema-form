import { OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService, TitleMapItem } from '@ngsf/widget-library';
export declare class MaterialCheckboxesComponent implements OnInit {
    private jsf;
    formControl: AbstractControl;
    controlName: string;
    controlValue: any;
    controlDisabled: boolean;
    boundControl: boolean;
    options: any;
    horizontalList: boolean;
    formArray: AbstractControl;
    checkboxList: TitleMapItem[];
    layoutNode: any;
    layoutIndex: number[];
    dataIndex: number[];
    constructor(jsf: JsonSchemaFormService);
    get allChecked(): boolean;
    get someChecked(): boolean;
    ngOnInit(): void;
    updateValue(): void;
    updateAllValues(event: any): void;
}
