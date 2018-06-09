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
    var root = framework.forRoot();
    return new root.providers[0].useClass();
}
var JsonSchemaFormModule = /** @class */ (function () {
    function JsonSchemaFormModule() {
    }
    JsonSchemaFormModule.forRoot = function (FormFramework) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zY2hlbWEtZm9ybS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsic3JjL2pzb24tc2NoZW1hLWZvcm0ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDN0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFL0UsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFdkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHbkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRTFELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBRXpGLE1BQU0sd0JBQXdCLFNBQVM7SUFDckMsSUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBRWpDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDMUMsQ0FBQztBQUVEO0lBQUE7SUE2QkEsQ0FBQztJQXBCUSw0QkFBTyxHQUFkLFVBQWUsYUFBYTtRQUMxQjs7OztXQUlHO1FBQ0gsTUFBTSxDQUFDO1lBQ0wsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixTQUFTLEVBQUU7Z0JBQ1QscUJBQXFCO2dCQUNyQix1QkFBdUI7Z0JBQ3ZCLG9CQUFvQjtnQkFDcEI7b0JBQ0UsT0FBTyxFQUFFLFNBQVM7b0JBQ2xCLFFBQVEsRUFBRSxhQUFhO29CQUN2QixLQUFLLEVBQUUsSUFBSTtpQkFDWjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7O2dCQTVCRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVksRUFBRSxXQUFXLEVBQUUsbUJBQW1CO3dCQUM5QyxtQkFBbUIsRUFBRSxpQkFBaUI7cUJBQ3ZDO29CQUNELFlBQVksRUFBRSxDQUFFLHVCQUF1QixDQUFFO29CQUN6QyxPQUFPLEVBQUUsQ0FBRSx1QkFBdUIsRUFBRSxtQkFBbUIsQ0FBRTtpQkFDMUQ7O0lBc0JELDJCQUFDO0NBQUEsQUE3QkQsSUE2QkM7U0FyQlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgRnJhbWV3b3JrTGlicmFyeVNlcnZpY2UgfSBmcm9tICcuL2ZyYW1ld29yay1saWJyYXJ5L2ZyYW1ld29yay1saWJyYXJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgV2lkZ2V0TGlicmFyeU1vZHVsZSB9IGZyb20gJy4vd2lkZ2V0LWxpYnJhcnkvd2lkZ2V0LWxpYnJhcnkubW9kdWxlJztcbmltcG9ydCB7IFdpZGdldExpYnJhcnlTZXJ2aWNlIH0gZnJvbSAnLi93aWRnZXQtbGlicmFyeS93aWRnZXQtbGlicmFyeS5zZXJ2aWNlJztcblxuaW1wb3J0IHsgSnNvblNjaGVtYUZvcm1Db21wb25lbnQgfSBmcm9tICcuL2pzb24tc2NoZW1hLWZvcm0uY29tcG9uZW50JztcblxuaW1wb3J0IHsgSnNvblNjaGVtYUZvcm1TZXJ2aWNlIH0gZnJvbSAnLi9qc29uLXNjaGVtYS1mb3JtLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBOb0ZyYW1ld29ya0NvbXBvbmVudCB9IGZyb20gJy4vZnJhbWV3b3JrLWxpYnJhcnkvbm8tZnJhbWV3b3JrL25vLWZyYW1ld29yay5jb21wb25lbnQnO1xuaW1wb3J0IHsgRnJhbWV3b3JrIH0gZnJvbSAnLi9mcmFtZXdvcmstbGlicmFyeS9mcmFtZXdvcmsnO1xuaW1wb3J0IHsgTm9GcmFtZXdvcmsgfSBmcm9tICcuL2ZyYW1ld29yay1saWJyYXJ5L25vLWZyYW1ld29yay9uby5mcmFtZXdvcmsnO1xuaW1wb3J0IHsgTm9GcmFtZXdvcmtNb2R1bGUgfSBmcm9tICcuL2ZyYW1ld29yay1saWJyYXJ5L25vLWZyYW1ld29yay9uby1mcmFtZXdvcmsubW9kdWxlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRGcmFtZXdvcmsoZnJhbWV3b3JrKSB7XG4gIGNvbnN0IHJvb3QgPSBmcmFtZXdvcmsuZm9yUm9vdCgpO1xuXG4gIHJldHVybiBuZXcgcm9vdC5wcm92aWRlcnNbMF0udXNlQ2xhc3MoKTtcbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgV2lkZ2V0TGlicmFyeU1vZHVsZSwgTm9GcmFtZXdvcmtNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbIEpzb25TY2hlbWFGb3JtQ29tcG9uZW50IF0sXG4gIGV4cG9ydHM6IFsgSnNvblNjaGVtYUZvcm1Db21wb25lbnQsIFdpZGdldExpYnJhcnlNb2R1bGUgXVxufSlcbmV4cG9ydCBjbGFzcyBKc29uU2NoZW1hRm9ybU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KEZvcm1GcmFtZXdvcmspOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICAvKlxuICAgIGNvbnN0IGxvYWRGcmFtZXdvcmtzID0gZnJhbWV3b3Jrcy5sZW5ndGggP1xuICAgICAgZnJhbWV3b3Jrcy5tYXAoZnJhbWV3b3JrID0+IGZyYW1ld29yay5mb3JSb290KCkucHJvdmlkZXJzWzBdKSA6XG4gICAgICBbeyBwcm92aWRlOiBGcmFtZXdvcmssIHVzZUNsYXNzOiBOb0ZyYW1ld29yaywgbXVsdGk6IHRydWUgfV07XG4gICAgICovXG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBKc29uU2NoZW1hRm9ybU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBKc29uU2NoZW1hRm9ybVNlcnZpY2UsXG4gICAgICAgIEZyYW1ld29ya0xpYnJhcnlTZXJ2aWNlLFxuICAgICAgICBXaWRnZXRMaWJyYXJ5U2VydmljZSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEZyYW1ld29yayxcbiAgICAgICAgICB1c2VDbGFzczogRm9ybUZyYW1ld29yayxcbiAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19