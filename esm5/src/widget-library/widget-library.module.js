import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderableDirective } from '../shared/orderable.directive';
import { JsonSchemaFormService } from '../json-schema-form.service';
import { BASIC_WIDGETS } from './index';
var WidgetLibraryModule = /** @class */ (function () {
    function WidgetLibraryModule() {
    }
    WidgetLibraryModule.forRoot = function () {
        return {
            ngModule: WidgetLibraryModule,
            providers: [JsonSchemaFormService]
        };
    };
    return WidgetLibraryModule;
}());
export { WidgetLibraryModule };
WidgetLibraryModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, ReactiveFormsModule],
                declarations: tslib_1.__spread(BASIC_WIDGETS, [OrderableDirective]),
                exports: tslib_1.__spread(BASIC_WIDGETS, [OrderableDirective]),
                entryComponents: tslib_1.__spread(BASIC_WIDGETS),
                providers: [JsonSchemaFormService]
            },] },
];
//# sourceMappingURL=widget-library.module.js.map
