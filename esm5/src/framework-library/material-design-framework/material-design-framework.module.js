import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatStepperModule, MatTabsModule, MatTooltipModule, } from '@angular/material';
export var ANGULAR_MATERIAL_MODULES = [
    MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule,
    MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatExpansionModule,
    MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule,
    MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule,
    MatStepperModule, MatTabsModule, MatTooltipModule,
];
import { WidgetLibraryModule } from '../../widget-library/widget-library.module';
import { Framework } from '../framework';
import { MATERIAL_FRAMEWORK_COMPONENTS } from './index';
import { MaterialDesignFramework } from './material-design.framework';
var MaterialDesignFrameworkModule = /** @class */ (function () {
    function MaterialDesignFrameworkModule() {
    }
    MaterialDesignFrameworkModule.forRoot = function () {
        return {
            ngModule: MaterialDesignFrameworkModule,
            providers: [
                { provide: Framework, useClass: MaterialDesignFramework, multi: true }
            ]
        };
    };
    return MaterialDesignFrameworkModule;
}());
export { MaterialDesignFrameworkModule };
MaterialDesignFrameworkModule.decorators = [
    { type: NgModule, args: [{
                imports: tslib_1.__spread([
                    CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule
                ], ANGULAR_MATERIAL_MODULES, [
                    WidgetLibraryModule
                ]),
                declarations: tslib_1.__spread(MATERIAL_FRAMEWORK_COMPONENTS),
                exports: tslib_1.__spread(MATERIAL_FRAMEWORK_COMPONENTS),
                entryComponents: tslib_1.__spread(MATERIAL_FRAMEWORK_COMPONENTS)
            },] },
];
//# sourceMappingURL=material-design-framework.module.js.map
