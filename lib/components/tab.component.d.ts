import { OnInit } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
export declare class TabComponent implements OnInit {
    private jsf;
    options: any;
    layoutNode: any;
    layoutIndex: number[];
    dataIndex: number[];
    constructor(jsf: JsonSchemaFormService);
    ngOnInit(): void;
}
