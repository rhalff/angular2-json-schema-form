import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetLibraryModule } from '../../widget-library/widget-library.module';
import { Framework } from '../framework';
import { Bootstrap3FrameworkComponent } from './bootstrap-3-framework.component';
import { Bootstrap3Framework } from './bootstrap-3.framework';
export class Bootstrap3FrameworkModule {
    static forRoot() {
        return {
            ngModule: Bootstrap3FrameworkModule,
            providers: [
                { provide: Framework, useClass: Bootstrap3Framework, multi: true }
            ]
        };
    }
}
Bootstrap3FrameworkModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, WidgetLibraryModule],
                declarations: [Bootstrap3FrameworkComponent],
                exports: [Bootstrap3FrameworkComponent],
                entryComponents: [Bootstrap3FrameworkComponent]
            },] },
];
//# sourceMappingURL=bootstrap-3-framework.module.js.map
