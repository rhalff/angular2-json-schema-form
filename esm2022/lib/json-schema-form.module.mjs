import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonSchemaFormService, FrameworkLibraryService, WidgetLibraryService, WidgetLibraryModule, } from '@ngsf/widget-library';
import { Framework } from '@ngsf/common';
import { JsonSchemaFormComponent } from './json-schema-form.component';
import { NoFramework } from '@ngsf/no-framework';
import * as i0 from "@angular/core";
class JsonSchemaFormModule {
    static forRoot(...frameworks) {
        const loadFrameworks = frameworks.length
            ? frameworks.map(framework => framework.forRoot().providers[0])
            : [{ provide: Framework, useClass: NoFramework, multi: true }];
        return {
            ngModule: JsonSchemaFormModule,
            providers: [
                JsonSchemaFormService,
                FrameworkLibraryService,
                WidgetLibraryService,
                ...loadFrameworks,
            ],
        };
    }
    static ɵfac = function JsonSchemaFormModule_Factory(t) { return new (t || JsonSchemaFormModule)(); };
    static ɵmod = i0.ɵɵdefineNgModule({ type: JsonSchemaFormModule });
    static ɵinj = i0.ɵɵdefineInjector({ imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            WidgetLibraryModule, WidgetLibraryModule] });
}
export { JsonSchemaFormModule };
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(JsonSchemaFormModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    WidgetLibraryModule,
                ],
                declarations: [JsonSchemaFormComponent],
                exports: [JsonSchemaFormComponent, WidgetLibraryModule],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(JsonSchemaFormModule, { declarations: [JsonSchemaFormComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        WidgetLibraryModule], exports: [JsonSchemaFormComponent, WidgetLibraryModule] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zY2hlbWEtZm9ybS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLWpzb24tc2NoZW1hLWZvcm0vc3JjL2xpYi9qc29uLXNjaGVtYS1mb3JtLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXNCLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUE7QUFDNUMsT0FBTyxFQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFBO0FBQy9ELE9BQU8sRUFDTCxxQkFBcUIsRUFDckIsdUJBQXVCLEVBQ3ZCLG9CQUFvQixFQUNwQixtQkFBbUIsR0FDcEIsTUFBTSxzQkFBc0IsQ0FBQTtBQUM3QixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBQ3RDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDhCQUE4QixDQUFBO0FBQ3BFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQTs7QUFFOUMsTUFVYSxvQkFBb0I7SUFDL0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFVBQVU7UUFDMUIsTUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLE1BQU07WUFDdEMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9ELENBQUMsQ0FBQyxDQUFDLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBO1FBQzlELE9BQU87WUFDTCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFNBQVMsRUFBRTtnQkFDVCxxQkFBcUI7Z0JBQ3JCLHVCQUF1QjtnQkFDdkIsb0JBQW9CO2dCQUNwQixHQUFHLGNBQWM7YUFDbEI7U0FDRixDQUFBO0lBQ0gsQ0FBQzs4RUFkVSxvQkFBb0I7OENBQXBCLG9CQUFvQjtrREFSN0IsWUFBWTtZQUNaLFdBQVc7WUFDWCxtQkFBbUI7WUFDbkIsbUJBQW1CLEVBR2MsbUJBQW1COztTQUUzQyxvQkFBb0I7dUZBQXBCLG9CQUFvQjtjQVZoQyxRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLG1CQUFtQjtpQkFDcEI7Z0JBQ0QsWUFBWSxFQUFFLENBQUMsdUJBQXVCLENBQUM7Z0JBQ3ZDLE9BQU8sRUFBRSxDQUFDLHVCQUF1QixFQUFFLG1CQUFtQixDQUFDO2FBQ3hEOzt3RkFDWSxvQkFBb0IsbUJBSGhCLHVCQUF1QixhQUxwQyxZQUFZO1FBQ1osV0FBVztRQUNYLG1CQUFtQjtRQUNuQixtQkFBbUIsYUFHWCx1QkFBdUIsRUFBRSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbidcbmltcG9ydCB7Rm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJ1xuaW1wb3J0IHtcbiAgSnNvblNjaGVtYUZvcm1TZXJ2aWNlLFxuICBGcmFtZXdvcmtMaWJyYXJ5U2VydmljZSxcbiAgV2lkZ2V0TGlicmFyeVNlcnZpY2UsXG4gIFdpZGdldExpYnJhcnlNb2R1bGUsXG59IGZyb20gJ0BuZ3NmL3dpZGdldC1saWJyYXJ5J1xuaW1wb3J0IHtGcmFtZXdvcmt9IGZyb20gJ0BuZ3NmL2NvbW1vbidcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1Db21wb25lbnR9IGZyb20gJy4vanNvbi1zY2hlbWEtZm9ybS5jb21wb25lbnQnXG5pbXBvcnQge05vRnJhbWV3b3JrfSBmcm9tICdAbmdzZi9uby1mcmFtZXdvcmsnXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBXaWRnZXRMaWJyYXJ5TW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtKc29uU2NoZW1hRm9ybUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtKc29uU2NoZW1hRm9ybUNvbXBvbmVudCwgV2lkZ2V0TGlicmFyeU1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIEpzb25TY2hlbWFGb3JtTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoLi4uZnJhbWV3b3Jrcyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8SnNvblNjaGVtYUZvcm1Nb2R1bGU+IHtcbiAgICBjb25zdCBsb2FkRnJhbWV3b3JrcyA9IGZyYW1ld29ya3MubGVuZ3RoXG4gICAgICA/IGZyYW1ld29ya3MubWFwKGZyYW1ld29yayA9PiBmcmFtZXdvcmsuZm9yUm9vdCgpLnByb3ZpZGVyc1swXSlcbiAgICAgIDogW3twcm92aWRlOiBGcmFtZXdvcmssIHVzZUNsYXNzOiBOb0ZyYW1ld29yaywgbXVsdGk6IHRydWV9XVxuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogSnNvblNjaGVtYUZvcm1Nb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgSnNvblNjaGVtYUZvcm1TZXJ2aWNlLFxuICAgICAgICBGcmFtZXdvcmtMaWJyYXJ5U2VydmljZSxcbiAgICAgICAgV2lkZ2V0TGlicmFyeVNlcnZpY2UsXG4gICAgICAgIC4uLmxvYWRGcmFtZXdvcmtzLFxuICAgICAgXSxcbiAgICB9XG4gIH1cbn1cbiJdfQ==