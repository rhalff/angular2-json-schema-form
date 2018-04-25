import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrameworkLibraryService } from './framework-library/framework-library.service';
import { WidgetLibraryModule } from './widget-library/widget-library.module';
import { WidgetLibraryService } from './widget-library/widget-library.service';
import { JsonSchemaFormComponent } from './json-schema-form.component';
import { JsonSchemaFormService } from './json-schema-form.service';
import { Framework } from './framework-library/framework';
import { NoFramework } from './framework-library/no-framework/no.framework';
import { NoFrameworkModule } from './framework-library/no-framework/no-framework.module';
export class JsonSchemaFormModule {
    static forRoot(...frameworks) {
        const loadFrameworks = frameworks.length ?
            frameworks.map(framework => framework.forRoot().providers[0]) :
            [{ provide: Framework, useClass: NoFramework, multi: true }];
        return {
            ngModule: JsonSchemaFormModule,
            providers: [
                JsonSchemaFormService, FrameworkLibraryService, WidgetLibraryService,
                ...loadFrameworks
            ]
        };
    }
}
JsonSchemaFormModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule, FormsModule, ReactiveFormsModule,
                    WidgetLibraryModule, NoFrameworkModule
                ],
                declarations: [JsonSchemaFormComponent],
                exports: [JsonSchemaFormComponent, WidgetLibraryModule]
            },] },
];
//# sourceMappingURL=json-schema-form.module.js.map
