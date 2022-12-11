import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetLibraryModule } from '@ngsf/widget-library';
import { Framework } from '@ngsf/common';
import { Bootstrap4FrameworkComponent } from './bootstrap4-framework.component';
import { Bootstrap4Framework } from './bootstrap4-framework';
import * as i0 from "@angular/core";
export class Bootstrap4FrameworkModule {
    static forRoot() {
        return {
            ngModule: Bootstrap4FrameworkModule,
            providers: [
                {
                    provide: Framework,
                    useClass: Bootstrap4Framework,
                    multi: true
                }
            ]
        };
    }
}
Bootstrap4FrameworkModule.ɵfac = function Bootstrap4FrameworkModule_Factory(t) { return new (t || Bootstrap4FrameworkModule)(); };
Bootstrap4FrameworkModule.ɵmod = i0.ɵɵdefineNgModule({ type: Bootstrap4FrameworkModule });
Bootstrap4FrameworkModule.ɵinj = i0.ɵɵdefineInjector({ imports: [CommonModule,
        WidgetLibraryModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Bootstrap4FrameworkModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    WidgetLibraryModule
                ],
                declarations: [Bootstrap4FrameworkComponent],
                exports: [Bootstrap4FrameworkComponent],
                entryComponents: [Bootstrap4FrameworkComponent]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(Bootstrap4FrameworkModule, { declarations: [Bootstrap4FrameworkComponent], imports: [CommonModule,
        WidgetLibraryModule], exports: [Bootstrap4FrameworkComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwNC1mcmFtZXdvcmsubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmdzZi1ib290c3RyYXA0LWZyYW1ld29yay9zcmMvbGliL2Jvb3RzdHJhcDQtZnJhbWV3b3JrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXNCLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUE7QUFDNUMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7QUFDeEQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUN0QyxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQTtBQUM3RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQTs7QUFXMUQsTUFBTSxPQUFPLHlCQUF5QjtJQUNwQyxNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUseUJBQXlCO1lBQ25DLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsU0FBUztvQkFDbEIsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDOztrR0FaVSx5QkFBeUI7NkRBQXpCLHlCQUF5QjtpRUFQbEMsWUFBWTtRQUNaLG1CQUFtQjt1RkFNVix5QkFBeUI7Y0FUckMsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLG1CQUFtQjtpQkFDcEI7Z0JBQ0QsWUFBWSxFQUFFLENBQUMsNEJBQTRCLENBQUM7Z0JBQzVDLE9BQU8sRUFBRSxDQUFDLDRCQUE0QixDQUFDO2dCQUN2QyxlQUFlLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQzthQUNoRDs7d0ZBQ1kseUJBQXlCLG1CQUpyQiw0QkFBNEIsYUFIekMsWUFBWTtRQUNaLG1CQUFtQixhQUdYLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJ1xuaW1wb3J0IHtXaWRnZXRMaWJyYXJ5TW9kdWxlfSBmcm9tICdAbmdzZi93aWRnZXQtbGlicmFyeSdcbmltcG9ydCB7RnJhbWV3b3JrfSBmcm9tICdAbmdzZi9jb21tb24nXG5pbXBvcnQge0Jvb3RzdHJhcDRGcmFtZXdvcmtDb21wb25lbnR9IGZyb20gJy4vYm9vdHN0cmFwNC1mcmFtZXdvcmsuY29tcG9uZW50J1xuaW1wb3J0IHtCb290c3RyYXA0RnJhbWV3b3JrfSBmcm9tICcuL2Jvb3RzdHJhcDQtZnJhbWV3b3JrJ1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFdpZGdldExpYnJhcnlNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQm9vdHN0cmFwNEZyYW1ld29ya0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtCb290c3RyYXA0RnJhbWV3b3JrQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbQm9vdHN0cmFwNEZyYW1ld29ya0NvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwNEZyYW1ld29ya01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Qm9vdHN0cmFwNEZyYW1ld29ya01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQm9vdHN0cmFwNEZyYW1ld29ya01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogRnJhbWV3b3JrLFxuICAgICAgICAgIHVzZUNsYXNzOiBCb290c3RyYXA0RnJhbWV3b3JrLFxuICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cbn1cbiJdfQ==