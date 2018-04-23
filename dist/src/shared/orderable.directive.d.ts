import { ElementRef, NgZone, OnInit } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
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
}
