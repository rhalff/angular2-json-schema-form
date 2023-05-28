import { ElementRef, NgZone, OnInit } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
import * as i0 from "@angular/core";
export declare class OrderableDirective implements OnInit {
    private elementRef;
    private jsf;
    private ngZone;
    arrayLayoutIndex: string;
    element: any;
    overParentElement: boolean;
    overChildElement: boolean;
    orderable: boolean;
    layoutNode: any;
    layoutIndex: number[];
    dataIndex: number[];
    constructor(elementRef: ElementRef, jsf: JsonSchemaFormService, ngZone: NgZone);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderableDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<OrderableDirective, "[orderable]", never, { "orderable": { "alias": "orderable"; "required": false; }; "layoutNode": { "alias": "layoutNode"; "required": false; }; "layoutIndex": { "alias": "layoutIndex"; "required": false; }; "dataIndex": { "alias": "dataIndex"; "required": false; }; }, {}, never, never, false, never>;
}
