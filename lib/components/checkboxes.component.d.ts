import { OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
import { TitleMapItem } from '../interfaces/title-map-item';
import * as i0 from "@angular/core";
export declare class CheckboxesComponent implements OnInit {
    private jsf;
    formControl: AbstractControl;
    controlName: string;
    controlValue: any;
    controlDisabled: boolean;
    boundControl: boolean;
    options: any;
    layoutOrientation: string;
    formArray: AbstractControl;
    checkboxList: TitleMapItem[];
    layoutNode: any;
    layoutIndex: number[];
    dataIndex: number[];
    constructor(jsf: JsonSchemaFormService);
    ngOnInit(): void;
    updateValue(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckboxesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckboxesComponent, "checkboxes-widget", never, { "layoutNode": { "alias": "layoutNode"; "required": false; }; "layoutIndex": { "alias": "layoutIndex"; "required": false; }; "dataIndex": { "alias": "dataIndex"; "required": false; }; }, {}, never, never, false, never>;
}
