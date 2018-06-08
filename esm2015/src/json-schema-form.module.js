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
export class JsonSchemaFormModule {
    static forRoot(...frameworks) {
        const loadFrameworks = frameworks.length ?
            frameworks.map(framework => framework.forRoot().providers[0]) :
            [{ provide: Framework, useClass: NoFramework, multi: true }];
        return {
            ngModule: JsonSchemaFormModule,
            providers: [
                JsonSchemaFormService, FrameworkLibraryService, WidgetLibraryService,
                ...loadFrameworks
            ]
        };
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zY2hlbWEtZm9ybS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsic3JjL2pzb24tc2NoZW1hLWZvcm0ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDN0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFL0UsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFdkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHbkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzFELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQVV6RixNQUFNO0lBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFVBQVU7UUFDMUIsTUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvRCxDQUFDLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sQ0FBQztZQUNMLFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsU0FBUyxFQUFFO2dCQUNULHFCQUFxQixFQUFFLHVCQUF1QixFQUFFLG9CQUFvQjtnQkFDcEUsR0FBRyxjQUFjO2FBQ2xCO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQXBCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVksRUFBRSxXQUFXLEVBQUUsbUJBQW1CO29CQUM5QyxtQkFBbUIsRUFBRSxpQkFBaUI7aUJBQ3ZDO2dCQUNELFlBQVksRUFBRSxDQUFFLHVCQUF1QixDQUFFO2dCQUN6QyxPQUFPLEVBQUUsQ0FBRSx1QkFBdUIsRUFBRSxtQkFBbUIsQ0FBRTthQUMxRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEZyYW1ld29ya0xpYnJhcnlTZXJ2aWNlIH0gZnJvbSAnLi9mcmFtZXdvcmstbGlicmFyeS9mcmFtZXdvcmstbGlicmFyeS5zZXJ2aWNlJztcbmltcG9ydCB7IFdpZGdldExpYnJhcnlNb2R1bGUgfSBmcm9tICcuL3dpZGdldC1saWJyYXJ5L3dpZGdldC1saWJyYXJ5Lm1vZHVsZSc7XG5pbXBvcnQgeyBXaWRnZXRMaWJyYXJ5U2VydmljZSB9IGZyb20gJy4vd2lkZ2V0LWxpYnJhcnkvd2lkZ2V0LWxpYnJhcnkuc2VydmljZSc7XG5cbmltcG9ydCB7IEpzb25TY2hlbWFGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9qc29uLXNjaGVtYS1mb3JtLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IEpzb25TY2hlbWFGb3JtU2VydmljZSB9IGZyb20gJy4vanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJztcblxuaW1wb3J0IHsgTm9GcmFtZXdvcmtDb21wb25lbnQgfSBmcm9tICcuL2ZyYW1ld29yay1saWJyYXJ5L25vLWZyYW1ld29yay9uby1mcmFtZXdvcmsuY29tcG9uZW50JztcbmltcG9ydCB7IEZyYW1ld29yayB9IGZyb20gJy4vZnJhbWV3b3JrLWxpYnJhcnkvZnJhbWV3b3JrJztcbmltcG9ydCB7IE5vRnJhbWV3b3JrIH0gZnJvbSAnLi9mcmFtZXdvcmstbGlicmFyeS9uby1mcmFtZXdvcmsvbm8uZnJhbWV3b3JrJztcbmltcG9ydCB7IE5vRnJhbWV3b3JrTW9kdWxlIH0gZnJvbSAnLi9mcmFtZXdvcmstbGlicmFyeS9uby1mcmFtZXdvcmsvbm8tZnJhbWV3b3JrLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFdpZGdldExpYnJhcnlNb2R1bGUsIE5vRnJhbWV3b3JrTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogWyBKc29uU2NoZW1hRm9ybUNvbXBvbmVudCBdLFxuICBleHBvcnRzOiBbIEpzb25TY2hlbWFGb3JtQ29tcG9uZW50LCBXaWRnZXRMaWJyYXJ5TW9kdWxlIF1cbn0pXG5leHBvcnQgY2xhc3MgSnNvblNjaGVtYUZvcm1Nb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCguLi5mcmFtZXdvcmtzKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgY29uc3QgbG9hZEZyYW1ld29ya3MgPSBmcmFtZXdvcmtzLmxlbmd0aCA/XG4gICAgICBmcmFtZXdvcmtzLm1hcChmcmFtZXdvcmsgPT4gZnJhbWV3b3JrLmZvclJvb3QoKS5wcm92aWRlcnNbMF0pIDpcbiAgICAgIFt7IHByb3ZpZGU6IEZyYW1ld29yaywgdXNlQ2xhc3M6IE5vRnJhbWV3b3JrLCBtdWx0aTogdHJ1ZSB9XTtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEpzb25TY2hlbWFGb3JtTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEpzb25TY2hlbWFGb3JtU2VydmljZSwgRnJhbWV3b3JrTGlicmFyeVNlcnZpY2UsIFdpZGdldExpYnJhcnlTZXJ2aWNlLFxuICAgICAgICAuLi5sb2FkRnJhbWV3b3Jrc1xuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==