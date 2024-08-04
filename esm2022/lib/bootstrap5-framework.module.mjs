import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetLibraryModule } from '@ngsf/widget-library';
import { Framework } from '@ngsf/common';
import { Bootstrap5FrameworkComponent } from './bootstrap5-framework.component';
import { Bootstrap5Framework } from './bootstrap5-framework';
import * as i0 from "@angular/core";
class Bootstrap5FrameworkModule {
    static forRoot() {
        return {
            ngModule: Bootstrap5FrameworkModule,
            providers: [
                {
                    provide: Framework,
                    useClass: Bootstrap5Framework,
                    multi: true
                }
            ]
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap5FrameworkModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap5FrameworkModule, declarations: [Bootstrap5FrameworkComponent], imports: [CommonModule,
            WidgetLibraryModule], exports: [Bootstrap5FrameworkComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap5FrameworkModule, imports: [CommonModule,
            WidgetLibraryModule] });
}
export { Bootstrap5FrameworkModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap5FrameworkModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        WidgetLibraryModule
                    ],
                    declarations: [Bootstrap5FrameworkComponent],
                    exports: [Bootstrap5FrameworkComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwNS1mcmFtZXdvcmsubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmdzZi1ib290c3RyYXA1LWZyYW1ld29yay9zcmMvbGliL2Jvb3RzdHJhcDUtZnJhbWV3b3JrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXNCLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUE7QUFDNUMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7QUFDeEQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUN0QyxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQTtBQUM3RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQTs7QUFFMUQsTUFRYSx5QkFBeUI7SUFDcEMsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLHlCQUF5QjtZQUNuQyxTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLFNBQVM7b0JBQ2xCLFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLEtBQUssRUFBRSxJQUFJO2lCQUNaO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQzt1R0FaVSx5QkFBeUI7d0dBQXpCLHlCQUF5QixpQkFIckIsNEJBQTRCLGFBSHpDLFlBQVk7WUFDWixtQkFBbUIsYUFHWCw0QkFBNEI7d0dBRTNCLHlCQUF5QixZQU5sQyxZQUFZO1lBQ1osbUJBQW1COztTQUtWLHlCQUF5QjsyRkFBekIseUJBQXlCO2tCQVJyQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLG1CQUFtQjtxQkFDcEI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsNEJBQTRCLENBQUM7b0JBQzVDLE9BQU8sRUFBRSxDQUFDLDRCQUE0QixDQUFDO2lCQUN4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJ1xuaW1wb3J0IHtXaWRnZXRMaWJyYXJ5TW9kdWxlfSBmcm9tICdAbmdzZi93aWRnZXQtbGlicmFyeSdcbmltcG9ydCB7RnJhbWV3b3JrfSBmcm9tICdAbmdzZi9jb21tb24nXG5pbXBvcnQge0Jvb3RzdHJhcDVGcmFtZXdvcmtDb21wb25lbnR9IGZyb20gJy4vYm9vdHN0cmFwNS1mcmFtZXdvcmsuY29tcG9uZW50J1xuaW1wb3J0IHtCb290c3RyYXA1RnJhbWV3b3JrfSBmcm9tICcuL2Jvb3RzdHJhcDUtZnJhbWV3b3JrJ1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFdpZGdldExpYnJhcnlNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQm9vdHN0cmFwNUZyYW1ld29ya0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtCb290c3RyYXA1RnJhbWV3b3JrQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBCb290c3RyYXA1RnJhbWV3b3JrTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxCb290c3RyYXA1RnJhbWV3b3JrTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBCb290c3RyYXA1RnJhbWV3b3JrTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBGcmFtZXdvcmssXG4gICAgICAgICAgdXNlQ2xhc3M6IEJvb3RzdHJhcDVGcmFtZXdvcmssXG4gICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfVxufVxuIl19