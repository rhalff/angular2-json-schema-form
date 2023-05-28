import { ChangeDetectorRef, OnChanges, OnInit } from '@angular/core';
import { JsonSchemaFormService } from '@ngsf/widget-library';
import * as i0 from "@angular/core";
export declare class Bootstrap3FrameworkComponent implements OnInit, OnChanges {
    changeDetector: ChangeDetectorRef;
    jsf: JsonSchemaFormService;
    frameworkInitialized: boolean;
    widgetOptions: any;
    widgetLayoutNode: any;
    options: any;
    formControl: any;
    debugOutput: any;
    debug: any;
    parentArray: any;
    isOrderable: boolean;
    layoutNode: any;
    layoutIndex: number[];
    dataIndex: number[];
    constructor(changeDetector: ChangeDetectorRef, jsf: JsonSchemaFormService);
    get showRemoveButton(): boolean;
    ngOnInit(): void;
    ngOnChanges(): void;
    initializeFramework(): void;
    updateHelpBlock(status: any): void;
    setTitle(): string;
    removeItem(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Bootstrap3FrameworkComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Bootstrap3FrameworkComponent, "bootstrap3-framework", never, { "layoutNode": { "alias": "layoutNode"; "required": false; }; "layoutIndex": { "alias": "layoutIndex"; "required": false; }; "dataIndex": { "alias": "dataIndex"; "required": false; }; }, {}, never, never, false, never>;
}
