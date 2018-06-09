import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrameworkLibraryService } from './framework-library/framework-library.service';
import { WidgetLibraryModule } from './widget-library/widget-library.module';
import { WidgetLibraryService } from './widget-library/widget-library.service';
import { JsonSchemaFormComponent } from './json-schema-form.component';
import { JsonSchemaFormService } from './json-schema-form.service';
import { Framework } from './framework-library/framework';
import { NoFrameworkModule } from './framework-library/no-framework/no-framework.module';
export function loadFramework(framework) {
    const root = framework.forRoot();
    return new root.providers[0].useClass();
}
export class JsonSchemaFormModule {
    static forRoot(FormFramework) {
        /*
        const loadFrameworks = frameworks.length ?
          frameworks.map(framework => framework.forRoot().providers[0]) :
          [{ provide: Framework, useClass: NoFramework, multi: true }];
         */
        return {
            ngModule: JsonSchemaFormModule,
            providers: [
                JsonSchemaFormService,
                FrameworkLibraryService,
                WidgetLibraryService,
                {
                    provide: Framework,
                    useClass: FormFramework,
                    multi: true
                }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zY2hlbWEtZm9ybS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsic3JjL2pzb24tc2NoZW1hLWZvcm0ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDN0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFL0UsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFdkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHbkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRTFELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBRXpGLE1BQU0sd0JBQXdCLFNBQVM7SUFDckMsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBRWpDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDMUMsQ0FBQztBQVVELE1BQU07SUFDSixNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWE7UUFDMUI7Ozs7V0FJRztRQUNILE1BQU0sQ0FBQztZQUNMLFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsU0FBUyxFQUFFO2dCQUNULHFCQUFxQjtnQkFDckIsdUJBQXVCO2dCQUN2QixvQkFBb0I7Z0JBQ3BCO29CQUNFLE9BQU8sRUFBRSxTQUFTO29CQUNsQixRQUFRLEVBQUUsYUFBYTtvQkFDdkIsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUE1QkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZLEVBQUUsV0FBVyxFQUFFLG1CQUFtQjtvQkFDOUMsbUJBQW1CLEVBQUUsaUJBQWlCO2lCQUN2QztnQkFDRCxZQUFZLEVBQUUsQ0FBRSx1QkFBdUIsQ0FBRTtnQkFDekMsT0FBTyxFQUFFLENBQUUsdUJBQXVCLEVBQUUsbUJBQW1CLENBQUU7YUFDMUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBGcmFtZXdvcmtMaWJyYXJ5U2VydmljZSB9IGZyb20gJy4vZnJhbWV3b3JrLWxpYnJhcnkvZnJhbWV3b3JrLWxpYnJhcnkuc2VydmljZSc7XG5pbXBvcnQgeyBXaWRnZXRMaWJyYXJ5TW9kdWxlIH0gZnJvbSAnLi93aWRnZXQtbGlicmFyeS93aWRnZXQtbGlicmFyeS5tb2R1bGUnO1xuaW1wb3J0IHsgV2lkZ2V0TGlicmFyeVNlcnZpY2UgfSBmcm9tICcuL3dpZGdldC1saWJyYXJ5L3dpZGdldC1saWJyYXJ5LnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBKc29uU2NoZW1hRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vanNvbi1zY2hlbWEtZm9ybS5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBKc29uU2NoZW1hRm9ybVNlcnZpY2UgfSBmcm9tICcuL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSc7XG5cbmltcG9ydCB7IE5vRnJhbWV3b3JrQ29tcG9uZW50IH0gZnJvbSAnLi9mcmFtZXdvcmstbGlicmFyeS9uby1mcmFtZXdvcmsvbm8tZnJhbWV3b3JrLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGcmFtZXdvcmsgfSBmcm9tICcuL2ZyYW1ld29yay1saWJyYXJ5L2ZyYW1ld29yayc7XG5pbXBvcnQgeyBOb0ZyYW1ld29yayB9IGZyb20gJy4vZnJhbWV3b3JrLWxpYnJhcnkvbm8tZnJhbWV3b3JrL25vLmZyYW1ld29yayc7XG5pbXBvcnQgeyBOb0ZyYW1ld29ya01vZHVsZSB9IGZyb20gJy4vZnJhbWV3b3JrLWxpYnJhcnkvbm8tZnJhbWV3b3JrL25vLWZyYW1ld29yay5tb2R1bGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEZyYW1ld29yayhmcmFtZXdvcmspIHtcbiAgY29uc3Qgcm9vdCA9IGZyYW1ld29yay5mb3JSb290KCk7XG5cbiAgcmV0dXJuIG5ldyByb290LnByb3ZpZGVyc1swXS51c2VDbGFzcygpO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBXaWRnZXRMaWJyYXJ5TW9kdWxlLCBOb0ZyYW1ld29ya01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFsgSnNvblNjaGVtYUZvcm1Db21wb25lbnQgXSxcbiAgZXhwb3J0czogWyBKc29uU2NoZW1hRm9ybUNvbXBvbmVudCwgV2lkZ2V0TGlicmFyeU1vZHVsZSBdXG59KVxuZXhwb3J0IGNsYXNzIEpzb25TY2hlbWFGb3JtTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoRm9ybUZyYW1ld29yayk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIC8qXG4gICAgY29uc3QgbG9hZEZyYW1ld29ya3MgPSBmcmFtZXdvcmtzLmxlbmd0aCA/XG4gICAgICBmcmFtZXdvcmtzLm1hcChmcmFtZXdvcmsgPT4gZnJhbWV3b3JrLmZvclJvb3QoKS5wcm92aWRlcnNbMF0pIDpcbiAgICAgIFt7IHByb3ZpZGU6IEZyYW1ld29yaywgdXNlQ2xhc3M6IE5vRnJhbWV3b3JrLCBtdWx0aTogdHJ1ZSB9XTtcbiAgICAgKi9cbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEpzb25TY2hlbWFGb3JtTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEpzb25TY2hlbWFGb3JtU2VydmljZSxcbiAgICAgICAgRnJhbWV3b3JrTGlicmFyeVNlcnZpY2UsXG4gICAgICAgIFdpZGdldExpYnJhcnlTZXJ2aWNlLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogRnJhbWV3b3JrLFxuICAgICAgICAgIHVzZUNsYXNzOiBGb3JtRnJhbWV3b3JrLFxuICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=