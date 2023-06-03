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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap3FrameworkModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap3FrameworkModule, declarations: [Bootstrap3FrameworkComponent], imports: [CommonModule,
            WidgetLibraryModule], exports: [Bootstrap3FrameworkComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap3FrameworkModule, imports: [CommonModule,
            WidgetLibraryModule] });
}
export { Bootstrap3FrameworkModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap3FrameworkModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        WidgetLibraryModule
                    ],
                    declarations: [Bootstrap3FrameworkComponent],
                    exports: [Bootstrap3FrameworkComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwMy1mcmFtZXdvcmsubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmdzZi1ib290c3RyYXAzLWZyYW1ld29yay9zcmMvbGliL2Jvb3RzdHJhcDMtZnJhbWV3b3JrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFzQixNQUFNLGVBQWUsQ0FBQTtBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUE7QUFDNUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUN0QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQTtBQUN4RCxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQTtBQUM3RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQTs7QUFFMUQsTUFRYSx5QkFBeUI7SUFDcEMsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLHlCQUF5QjtZQUNuQyxTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLFNBQVM7b0JBQ2xCLFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLEtBQUssRUFBRSxJQUFJO2lCQUNaO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQzt1R0FaVSx5QkFBeUI7d0dBQXpCLHlCQUF5QixpQkFIckIsNEJBQTRCLGFBSHpDLFlBQVk7WUFDWixtQkFBbUIsYUFHWCw0QkFBNEI7d0dBRTNCLHlCQUF5QixZQU5sQyxZQUFZO1lBQ1osbUJBQW1COztTQUtWLHlCQUF5QjsyRkFBekIseUJBQXlCO2tCQVJyQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLG1CQUFtQjtxQkFDcEI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsNEJBQTRCLENBQUM7b0JBQzVDLE9BQU8sRUFBRSxDQUFDLDRCQUE0QixDQUFDO2lCQUN4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJ1xuaW1wb3J0IHtGcmFtZXdvcmt9IGZyb20gJ0BuZ3NmL2NvbW1vbidcbmltcG9ydCB7V2lkZ2V0TGlicmFyeU1vZHVsZX0gZnJvbSAnQG5nc2Yvd2lkZ2V0LWxpYnJhcnknXG5pbXBvcnQge0Jvb3RzdHJhcDNGcmFtZXdvcmtDb21wb25lbnR9IGZyb20gJy4vYm9vdHN0cmFwMy1mcmFtZXdvcmsuY29tcG9uZW50J1xuaW1wb3J0IHtCb290c3RyYXAzRnJhbWV3b3JrfSBmcm9tICcuL2Jvb3RzdHJhcDMtZnJhbWV3b3JrJ1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFdpZGdldExpYnJhcnlNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQm9vdHN0cmFwM0ZyYW1ld29ya0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtCb290c3RyYXAzRnJhbWV3b3JrQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBCb290c3RyYXAzRnJhbWV3b3JrTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxCb290c3RyYXAzRnJhbWV3b3JrTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBCb290c3RyYXAzRnJhbWV3b3JrTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBGcmFtZXdvcmssXG4gICAgICAgICAgdXNlQ2xhc3M6IEJvb3RzdHJhcDNGcmFtZXdvcmssXG4gICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfVxufVxuIl19