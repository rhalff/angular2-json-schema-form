import { OnInit } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
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
}
