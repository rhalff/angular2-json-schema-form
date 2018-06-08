import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrameworkLibraryService } from './framework-library/framework-library.service';
import { WidgetLibraryModule } from './widget-library/widget-library.module';
import { WidgetLibraryService } from './widget-library/widget-library.service';
import { JsonSchemaFormComponent } from './json-schema-form.component';
import { JsonSchemaFormService } from './json-schema-form.service';
import { Framework } from './framework-library/framework';
import { NoFramework } from './framework-library/no-framework/no.framework';
import { NoFrameworkModule } from './framework-library/no-framework/no-framework.module';
var JsonSchemaFormModule = /** @class */ (function () {
    function JsonSchemaFormModule() {
    }
    JsonSchemaFormModule.forRoot = function () {
        var frameworks = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            frameworks[_i] = arguments[_i];
        }
        var loadFrameworks = frameworks.length ?
            frameworks.map(function (framework) { return framework.forRoot().providers[0]; }) :
            [{ provide: Framework, useClass: NoFramework, multi: true }];
        return {
            ngModule: JsonSchemaFormModule,
            providers: tslib_1.__spread([
                JsonSchemaFormService, FrameworkLibraryService, WidgetLibraryService
            ], loadFrameworks)
        };
    };
    JsonSchemaFormModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule, FormsModule, ReactiveFormsModule,
                        WidgetLibraryModule, NoFrameworkModule
                    ],
                    declarations: [JsonSchemaFormComponent],
                    exports: [JsonSchemaFormComponent, WidgetLibraryModule]
                },] },
    ];
    return JsonSchemaFormModule;
}());
export { JsonSchemaFormModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zY2hlbWEtZm9ybS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsic3JjL2pzb24tc2NoZW1hLWZvcm0ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRS9FLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXZFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBR25FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFFekY7SUFBQTtJQXFCQSxDQUFDO0lBWlEsNEJBQU8sR0FBZDtRQUFlLG9CQUFhO2FBQWIsVUFBYSxFQUFiLHFCQUFhLEVBQWIsSUFBYTtZQUFiLCtCQUFhOztRQUMxQixJQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFBLFNBQVMsSUFBSSxPQUFBLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQWhDLENBQWdDLENBQUMsQ0FBQyxDQUFDO1lBQy9ELENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDL0QsTUFBTSxDQUFDO1lBQ0wsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixTQUFTO2dCQUNQLHFCQUFxQixFQUFFLHVCQUF1QixFQUFFLG9CQUFvQjtlQUNqRSxjQUFjLENBQ2xCO1NBQ0YsQ0FBQztJQUNKLENBQUM7O2dCQXBCRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVksRUFBRSxXQUFXLEVBQUUsbUJBQW1CO3dCQUM5QyxtQkFBbUIsRUFBRSxpQkFBaUI7cUJBQ3ZDO29CQUNELFlBQVksRUFBRSxDQUFFLHVCQUF1QixDQUFFO29CQUN6QyxPQUFPLEVBQUUsQ0FBRSx1QkFBdUIsRUFBRSxtQkFBbUIsQ0FBRTtpQkFDMUQ7O0lBY0QsMkJBQUM7Q0FBQSxBQXJCRCxJQXFCQztTQWJZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEZyYW1ld29ya0xpYnJhcnlTZXJ2aWNlIH0gZnJvbSAnLi9mcmFtZXdvcmstbGlicmFyeS9mcmFtZXdvcmstbGlicmFyeS5zZXJ2aWNlJztcbmltcG9ydCB7IFdpZGdldExpYnJhcnlNb2R1bGUgfSBmcm9tICcuL3dpZGdldC1saWJyYXJ5L3dpZGdldC1saWJyYXJ5Lm1vZHVsZSc7XG5pbXBvcnQgeyBXaWRnZXRMaWJyYXJ5U2VydmljZSB9IGZyb20gJy4vd2lkZ2V0LWxpYnJhcnkvd2lkZ2V0LWxpYnJhcnkuc2VydmljZSc7XG5cbmltcG9ydCB7IEpzb25TY2hlbWFGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9qc29uLXNjaGVtYS1mb3JtLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IEpzb25TY2hlbWFGb3JtU2VydmljZSB9IGZyb20gJy4vanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJztcblxuaW1wb3J0IHsgTm9GcmFtZXdvcmtDb21wb25lbnQgfSBmcm9tICcuL2ZyYW1ld29yay1saWJyYXJ5L25vLWZyYW1ld29yay9uby1mcmFtZXdvcmsuY29tcG9uZW50JztcbmltcG9ydCB7IEZyYW1ld29yayB9IGZyb20gJy4vZnJhbWV3b3JrLWxpYnJhcnkvZnJhbWV3b3JrJztcbmltcG9ydCB7IE5vRnJhbWV3b3JrIH0gZnJvbSAnLi9mcmFtZXdvcmstbGlicmFyeS9uby1mcmFtZXdvcmsvbm8uZnJhbWV3b3JrJztcbmltcG9ydCB7IE5vRnJhbWV3b3JrTW9kdWxlIH0gZnJvbSAnLi9mcmFtZXdvcmstbGlicmFyeS9uby1mcmFtZXdvcmsvbm8tZnJhbWV3b3JrLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFdpZGdldExpYnJhcnlNb2R1bGUsIE5vRnJhbWV3b3JrTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogWyBKc29uU2NoZW1hRm9ybUNvbXBvbmVudCBdLFxuICBleHBvcnRzOiBbIEpzb25TY2hlbWFGb3JtQ29tcG9uZW50LCBXaWRnZXRMaWJyYXJ5TW9kdWxlIF1cbn0pXG5leHBvcnQgY2xhc3MgSnNvblNjaGVtYUZvcm1Nb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCguLi5mcmFtZXdvcmtzKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgY29uc3QgbG9hZEZyYW1ld29ya3MgPSBmcmFtZXdvcmtzLmxlbmd0aCA/XG4gICAgICBmcmFtZXdvcmtzLm1hcChmcmFtZXdvcmsgPT4gZnJhbWV3b3JrLmZvclJvb3QoKS5wcm92aWRlcnNbMF0pIDpcbiAgICAgIFt7IHByb3ZpZGU6IEZyYW1ld29yaywgdXNlQ2xhc3M6IE5vRnJhbWV3b3JrLCBtdWx0aTogdHJ1ZSB9XTtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEpzb25TY2hlbWFGb3JtTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEpzb25TY2hlbWFGb3JtU2VydmljZSwgRnJhbWV3b3JrTGlicmFyeVNlcnZpY2UsIFdpZGdldExpYnJhcnlTZXJ2aWNlLFxuICAgICAgICAuLi5sb2FkRnJhbWV3b3Jrc1xuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==