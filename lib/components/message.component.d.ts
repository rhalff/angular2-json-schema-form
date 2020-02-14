import { OnInit } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
export declare class MessageComponent implements OnInit {
    private jsf;
    options: any;
    message: string;
    layoutNode: any;
    layoutIndex: number[];
    dataIndex: number[];
    constructor(jsf: JsonSchemaFormService);
    ngOnInit(): void;
}
