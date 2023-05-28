import { OnInit } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
import * as i0 from "@angular/core";
export declare class AddReferenceComponent implements OnInit {
    private jsf;
    options: any;
    itemCount: number;
    previousLayoutIndex: number[];
    previousDataIndex: number[];
    layoutNode: any;
    layoutIndex: number[];
    dataIndex: number[];
    constructor(jsf: JsonSchemaFormService);
    get showAddButton(): boolean;
    get buttonText(): string;
    ngOnInit(): void;
    addItem(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddReferenceComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AddReferenceComponent, "add-reference-widget", never, { "layoutNode": { "alias": "layoutNode"; "required": false; }; "layoutIndex": { "alias": "layoutIndex"; "required": false; }; "dataIndex": { "alias": "dataIndex"; "required": false; }; }, {}, never, never, false, never>;
}
