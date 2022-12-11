import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonSchemaFormService, FrameworkLibraryService, WidgetLibraryService, WidgetLibraryModule, } from '@ngsf/widget-library';
import { Framework } from '@ngsf/common';
import { JsonSchemaFormComponent } from './json-schema-form.component';
import { NoFramework } from '@ngsf/no-framework';
import * as i0 from "@angular/core";
export class JsonSchemaFormModule {
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
}
JsonSchemaFormModule.ɵfac = function JsonSchemaFormModule_Factory(t) { return new (t || JsonSchemaFormModule)(); };
JsonSchemaFormModule.ɵmod = i0.ɵɵdefineNgModule({ type: JsonSchemaFormModule });
JsonSchemaFormModule.ɵinj = i0.ɵɵdefineInjector({ imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        WidgetLibraryModule, WidgetLibraryModule] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zY2hlbWEtZm9ybS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLWpzb24tc2NoZW1hLWZvcm0vc3JjL2xpYi9qc29uLXNjaGVtYS1mb3JtLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXNCLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUE7QUFDNUMsT0FBTyxFQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFBO0FBQy9ELE9BQU8sRUFDTCxxQkFBcUIsRUFDckIsdUJBQXVCLEVBQ3ZCLG9CQUFvQixFQUNwQixtQkFBbUIsR0FDcEIsTUFBTSxzQkFBc0IsQ0FBQTtBQUM3QixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBQ3RDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDhCQUE4QixDQUFBO0FBQ3BFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQTs7QUFZOUMsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsVUFBVTtRQUMxQixNQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsTUFBTTtZQUN0QyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0QsQ0FBQyxDQUFDLENBQUMsRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7UUFDOUQsT0FBTztZQUNMLFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsU0FBUyxFQUFFO2dCQUNULHFCQUFxQjtnQkFDckIsdUJBQXVCO2dCQUN2QixvQkFBb0I7Z0JBQ3BCLEdBQUcsY0FBYzthQUNsQjtTQUNGLENBQUE7SUFDSCxDQUFDOzt3RkFkVSxvQkFBb0I7d0RBQXBCLG9CQUFvQjs0REFSN0IsWUFBWTtRQUNaLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsbUJBQW1CLEVBR2MsbUJBQW1CO3VGQUUzQyxvQkFBb0I7Y0FWaEMsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUNuQixtQkFBbUI7aUJBQ3BCO2dCQUNELFlBQVksRUFBRSxDQUFDLHVCQUF1QixDQUFDO2dCQUN2QyxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxtQkFBbUIsQ0FBQzthQUN4RDs7d0ZBQ1ksb0JBQW9CLG1CQUhoQix1QkFBdUIsYUFMcEMsWUFBWTtRQUNaLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsbUJBQW1CLGFBR1gsdUJBQXVCLEVBQUUsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nXG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3JtcydcbmltcG9ydCB7XG4gIEpzb25TY2hlbWFGb3JtU2VydmljZSxcbiAgRnJhbWV3b3JrTGlicmFyeVNlcnZpY2UsXG4gIFdpZGdldExpYnJhcnlTZXJ2aWNlLFxuICBXaWRnZXRMaWJyYXJ5TW9kdWxlLFxufSBmcm9tICdAbmdzZi93aWRnZXQtbGlicmFyeSdcbmltcG9ydCB7RnJhbWV3b3JrfSBmcm9tICdAbmdzZi9jb21tb24nXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtQ29tcG9uZW50fSBmcm9tICcuL2pzb24tc2NoZW1hLWZvcm0uY29tcG9uZW50J1xuaW1wb3J0IHtOb0ZyYW1ld29ya30gZnJvbSAnQG5nc2Yvbm8tZnJhbWV3b3JrJ1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgV2lkZ2V0TGlicmFyeU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbSnNvblNjaGVtYUZvcm1Db21wb25lbnRdLFxuICBleHBvcnRzOiBbSnNvblNjaGVtYUZvcm1Db21wb25lbnQsIFdpZGdldExpYnJhcnlNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBKc29uU2NoZW1hRm9ybU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KC4uLmZyYW1ld29ya3MpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEpzb25TY2hlbWFGb3JtTW9kdWxlPiB7XG4gICAgY29uc3QgbG9hZEZyYW1ld29ya3MgPSBmcmFtZXdvcmtzLmxlbmd0aFxuICAgICAgPyBmcmFtZXdvcmtzLm1hcChmcmFtZXdvcmsgPT4gZnJhbWV3b3JrLmZvclJvb3QoKS5wcm92aWRlcnNbMF0pXG4gICAgICA6IFt7cHJvdmlkZTogRnJhbWV3b3JrLCB1c2VDbGFzczogTm9GcmFtZXdvcmssIG11bHRpOiB0cnVlfV1cbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEpzb25TY2hlbWFGb3JtTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEpzb25TY2hlbWFGb3JtU2VydmljZSxcbiAgICAgICAgRnJhbWV3b3JrTGlicmFyeVNlcnZpY2UsXG4gICAgICAgIFdpZGdldExpYnJhcnlTZXJ2aWNlLFxuICAgICAgICAuLi5sb2FkRnJhbWV3b3JrcyxcbiAgICAgIF0sXG4gICAgfVxuICB9XG59XG4iXX0=