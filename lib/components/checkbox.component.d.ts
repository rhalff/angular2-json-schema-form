import { OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
import * as i0 from "@angular/core";
export declare class CheckboxComponent implements OnInit {
    private jsf;
    formControl: AbstractControl;
    controlName: string;
    controlValue: any;
    controlDisabled: boolean;
    boundControl: boolean;
    options: any;
    trueValue: any;
    falseValue: any;
    layoutNode: any;
    layoutIndex: number[];
    dataIndex: number[];
    constructor(jsf: JsonSchemaFormService);
    get isChecked(): boolean;
    ngOnInit(): void;
    updateValue(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckboxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckboxComponent, "checkbox-widget", never, { "layoutNode": "layoutNode"; "layoutIndex": "layoutIndex"; "dataIndex": "dataIndex"; }, {}, never, never, false, never>;
}
