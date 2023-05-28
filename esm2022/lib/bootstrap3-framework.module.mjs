import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Framework } from '@ngsf/common';
import { WidgetLibraryModule } from '@ngsf/widget-library';
import { Bootstrap3FrameworkComponent } from './bootstrap3-framework.component';
import { Bootstrap3Framework } from './bootstrap3-framework';
import * as i0 from "@angular/core";
class Bootstrap3FrameworkModule {
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
    static ɵfac = function Bootstrap3FrameworkModule_Factory(t) { return new (t || Bootstrap3FrameworkModule)(); };
    static ɵmod = i0.ɵɵdefineNgModule({ type: Bootstrap3FrameworkModule });
    static ɵinj = i0.ɵɵdefineInjector({ imports: [CommonModule,
            WidgetLibraryModule] });
}
export { Bootstrap3FrameworkModule };
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Bootstrap3FrameworkModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    WidgetLibraryModule
                ],
                declarations: [Bootstrap3FrameworkComponent],
                exports: [Bootstrap3FrameworkComponent]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(Bootstrap3FrameworkModule, { declarations: [Bootstrap3FrameworkComponent], imports: [CommonModule,
        WidgetLibraryModule], exports: [Bootstrap3FrameworkComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwMy1mcmFtZXdvcmsubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmdzZi1ib290c3RyYXAzLWZyYW1ld29yay9zcmMvbGliL2Jvb3RzdHJhcDMtZnJhbWV3b3JrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFzQixNQUFNLGVBQWUsQ0FBQTtBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUE7QUFDNUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUN0QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQTtBQUN4RCxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQTtBQUM3RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQTs7QUFFMUQsTUFRYSx5QkFBeUI7SUFDcEMsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLHlCQUF5QjtZQUNuQyxTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLFNBQVM7b0JBQ2xCLFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLEtBQUssRUFBRSxJQUFJO2lCQUNaO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQzttRkFaVSx5QkFBeUI7OENBQXpCLHlCQUF5QjtrREFObEMsWUFBWTtZQUNaLG1CQUFtQjs7U0FLVix5QkFBeUI7dUZBQXpCLHlCQUF5QjtjQVJyQyxRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osbUJBQW1CO2lCQUNwQjtnQkFDRCxZQUFZLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztnQkFDNUMsT0FBTyxFQUFFLENBQUMsNEJBQTRCLENBQUM7YUFDeEM7O3dGQUNZLHlCQUF5QixtQkFIckIsNEJBQTRCLGFBSHpDLFlBQVk7UUFDWixtQkFBbUIsYUFHWCw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbidcbmltcG9ydCB7RnJhbWV3b3JrfSBmcm9tICdAbmdzZi9jb21tb24nXG5pbXBvcnQge1dpZGdldExpYnJhcnlNb2R1bGV9IGZyb20gJ0BuZ3NmL3dpZGdldC1saWJyYXJ5J1xuaW1wb3J0IHtCb290c3RyYXAzRnJhbWV3b3JrQ29tcG9uZW50fSBmcm9tICcuL2Jvb3RzdHJhcDMtZnJhbWV3b3JrLmNvbXBvbmVudCdcbmltcG9ydCB7Qm9vdHN0cmFwM0ZyYW1ld29ya30gZnJvbSAnLi9ib290c3RyYXAzLWZyYW1ld29yaydcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBXaWRnZXRMaWJyYXJ5TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0Jvb3RzdHJhcDNGcmFtZXdvcmtDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQm9vdHN0cmFwM0ZyYW1ld29ya0NvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwM0ZyYW1ld29ya01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Qm9vdHN0cmFwM0ZyYW1ld29ya01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQm9vdHN0cmFwM0ZyYW1ld29ya01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogRnJhbWV3b3JrLFxuICAgICAgICAgIHVzZUNsYXNzOiBCb290c3RyYXAzRnJhbWV3b3JrLFxuICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cbn1cbiJdfQ==