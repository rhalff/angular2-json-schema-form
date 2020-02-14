import { OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from '@ngsf/widget-library';
export declare class FlexLayoutSectionComponent implements OnInit {
    private jsf;
    formControl: AbstractControl;
    controlName: string;
    controlValue: any;
    controlDisabled: boolean;
    boundControl: boolean;
    options: any;
    expanded: boolean;
    containerType: string;
    layoutNode: any;
    layoutIndex: number[];
    dataIndex: number[];
    constructor(jsf: JsonSchemaFormService);
    get sectionTitle(): string;
    ngOnInit(): void;
    toggleExpanded(): void;
    getFlexAttribute(attribute: string): any;
}
