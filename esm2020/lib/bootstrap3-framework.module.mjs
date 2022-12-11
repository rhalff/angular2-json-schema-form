import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Framework } from '@ngsf/common';
import { WidgetLibraryModule } from '@ngsf/widget-library';
import { Bootstrap3FrameworkComponent } from './bootstrap3-framework.component';
import { Bootstrap3Framework } from './bootstrap3-framework';
import * as i0 from "@angular/core";
export class Bootstrap3FrameworkModule {
    static forRoot() {
        return {
            ngModule: Bootstrap3FrameworkModule,
            providers: [
                {
                    provide: Framework,
                    useClass: Bootstrap3Framework,
                    multi: true
                }
            ]
        };
    }
}
Bootstrap3FrameworkModule.ɵfac = function Bootstrap3FrameworkModule_Factory(t) { return new (t || Bootstrap3FrameworkModule)(); };
Bootstrap3FrameworkModule.ɵmod = i0.ɵɵdefineNgModule({ type: Bootstrap3FrameworkModule });
Bootstrap3FrameworkModule.ɵinj = i0.ɵɵdefineInjector({ imports: [CommonModule,
        WidgetLibraryModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Bootstrap3FrameworkModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    WidgetLibraryModule
                ],
                declarations: [Bootstrap3FrameworkComponent],
                exports: [Bootstrap3FrameworkComponent],
                entryComponents: [Bootstrap3FrameworkComponent]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(Bootstrap3FrameworkModule, { declarations: [Bootstrap3FrameworkComponent], imports: [CommonModule,
        WidgetLibraryModule], exports: [Bootstrap3FrameworkComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwMy1mcmFtZXdvcmsubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmdzZi1ib290c3RyYXAzLWZyYW1ld29yay9zcmMvbGliL2Jvb3RzdHJhcDMtZnJhbWV3b3JrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFzQixNQUFNLGVBQWUsQ0FBQTtBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUE7QUFDNUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUN0QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQTtBQUN4RCxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQTtBQUM3RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQTs7QUFXMUQsTUFBTSxPQUFPLHlCQUF5QjtJQUNwQyxNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUseUJBQXlCO1lBQ25DLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsU0FBUztvQkFDbEIsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDOztrR0FaVSx5QkFBeUI7NkRBQXpCLHlCQUF5QjtpRUFQbEMsWUFBWTtRQUNaLG1CQUFtQjt1RkFNVix5QkFBeUI7Y0FUckMsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLG1CQUFtQjtpQkFDcEI7Z0JBQ0QsWUFBWSxFQUFFLENBQUMsNEJBQTRCLENBQUM7Z0JBQzVDLE9BQU8sRUFBRSxDQUFDLDRCQUE0QixDQUFDO2dCQUN2QyxlQUFlLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQzthQUNoRDs7d0ZBQ1kseUJBQXlCLG1CQUpyQiw0QkFBNEIsYUFIekMsWUFBWTtRQUNaLG1CQUFtQixhQUdYLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJ1xuaW1wb3J0IHtGcmFtZXdvcmt9IGZyb20gJ0BuZ3NmL2NvbW1vbidcbmltcG9ydCB7V2lkZ2V0TGlicmFyeU1vZHVsZX0gZnJvbSAnQG5nc2Yvd2lkZ2V0LWxpYnJhcnknXG5pbXBvcnQge0Jvb3RzdHJhcDNGcmFtZXdvcmtDb21wb25lbnR9IGZyb20gJy4vYm9vdHN0cmFwMy1mcmFtZXdvcmsuY29tcG9uZW50J1xuaW1wb3J0IHtCb290c3RyYXAzRnJhbWV3b3JrfSBmcm9tICcuL2Jvb3RzdHJhcDMtZnJhbWV3b3JrJ1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFdpZGdldExpYnJhcnlNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQm9vdHN0cmFwM0ZyYW1ld29ya0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtCb290c3RyYXAzRnJhbWV3b3JrQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbQm9vdHN0cmFwM0ZyYW1ld29ya0NvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwM0ZyYW1ld29ya01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Qm9vdHN0cmFwM0ZyYW1ld29ya01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQm9vdHN0cmFwM0ZyYW1ld29ya01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogRnJhbWV3b3JrLFxuICAgICAgICAgIHVzZUNsYXNzOiBCb290c3RyYXAzRnJhbWV3b3JrLFxuICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cbn1cbiJdfQ==