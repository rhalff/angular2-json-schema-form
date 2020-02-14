var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var JsonSchemaFormModule_1;
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonSchemaFormService, FrameworkLibraryService, WidgetLibraryService, WidgetLibraryModule, } from '@ngsf/widget-library';
import { Framework } from '@ngsf/common';
import { JsonSchemaFormComponent } from './json-schema-form.component';
import { NoFramework } from '@ngsf/no-framework';
let JsonSchemaFormModule = JsonSchemaFormModule_1 = class JsonSchemaFormModule {
    static forRoot(...frameworks) {
        const loadFrameworks = frameworks.length
            ? frameworks.map(framework => framework.forRoot().providers[0])
            : [{ provide: Framework, useClass: NoFramework, multi: true }];
        return {
            ngModule: JsonSchemaFormModule_1,
            providers: [
                JsonSchemaFormService,
                FrameworkLibraryService,
                WidgetLibraryService,
                ...loadFrameworks,
            ],
        };
    }
};
JsonSchemaFormModule = JsonSchemaFormModule_1 = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            WidgetLibraryModule,
        ],
        declarations: [JsonSchemaFormComponent],
        exports: [JsonSchemaFormComponent, WidgetLibraryModule],
    })
], JsonSchemaFormModule);
export { JsonSchemaFormModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zY2hlbWEtZm9ybS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdzZi9qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2pzb24tc2NoZW1hLWZvcm0ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxPQUFPLEVBQXNCLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUE7QUFDNUMsT0FBTyxFQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFBO0FBQy9ELE9BQU8sRUFDTCxxQkFBcUIsRUFDckIsdUJBQXVCLEVBQ3ZCLG9CQUFvQixFQUNwQixtQkFBbUIsR0FDcEIsTUFBTSxzQkFBc0IsQ0FBQTtBQUM3QixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBQ3RDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDhCQUE4QixDQUFBO0FBQ3BFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQTtBQVk5QyxJQUFhLG9CQUFvQiw0QkFBakMsTUFBYSxvQkFBb0I7SUFDL0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFVBQVU7UUFDMUIsTUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLE1BQU07WUFDdEMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9ELENBQUMsQ0FBQyxDQUFDLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBO1FBQzlELE9BQU87WUFDTCxRQUFRLEVBQUUsc0JBQW9CO1lBQzlCLFNBQVMsRUFBRTtnQkFDVCxxQkFBcUI7Z0JBQ3JCLHVCQUF1QjtnQkFDdkIsb0JBQW9CO2dCQUNwQixHQUFHLGNBQWM7YUFDbEI7U0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFmWSxvQkFBb0I7SUFWaEMsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsWUFBWTtZQUNaLFdBQVc7WUFDWCxtQkFBbUI7WUFDbkIsbUJBQW1CO1NBQ3BCO1FBQ0QsWUFBWSxFQUFFLENBQUMsdUJBQXVCLENBQUM7UUFDdkMsT0FBTyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsbUJBQW1CLENBQUM7S0FDeEQsQ0FBQztHQUNXLG9CQUFvQixDQWVoQztTQWZZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJ1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXG5pbXBvcnQge1xuICBKc29uU2NoZW1hRm9ybVNlcnZpY2UsXG4gIEZyYW1ld29ya0xpYnJhcnlTZXJ2aWNlLFxuICBXaWRnZXRMaWJyYXJ5U2VydmljZSxcbiAgV2lkZ2V0TGlicmFyeU1vZHVsZSxcbn0gZnJvbSAnQG5nc2Yvd2lkZ2V0LWxpYnJhcnknXG5pbXBvcnQge0ZyYW1ld29ya30gZnJvbSAnQG5nc2YvY29tbW9uJ1xuaW1wb3J0IHtKc29uU2NoZW1hRm9ybUNvbXBvbmVudH0gZnJvbSAnLi9qc29uLXNjaGVtYS1mb3JtLmNvbXBvbmVudCdcbmltcG9ydCB7Tm9GcmFtZXdvcmt9IGZyb20gJ0BuZ3NmL25vLWZyYW1ld29yaydcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFdpZGdldExpYnJhcnlNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0pzb25TY2hlbWFGb3JtQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0pzb25TY2hlbWFGb3JtQ29tcG9uZW50LCBXaWRnZXRMaWJyYXJ5TW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgSnNvblNjaGVtYUZvcm1Nb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCguLi5mcmFtZXdvcmtzKTogTW9kdWxlV2l0aFByb3ZpZGVyczxKc29uU2NoZW1hRm9ybU1vZHVsZT4ge1xuICAgIGNvbnN0IGxvYWRGcmFtZXdvcmtzID0gZnJhbWV3b3Jrcy5sZW5ndGhcbiAgICAgID8gZnJhbWV3b3Jrcy5tYXAoZnJhbWV3b3JrID0+IGZyYW1ld29yay5mb3JSb290KCkucHJvdmlkZXJzWzBdKVxuICAgICAgOiBbe3Byb3ZpZGU6IEZyYW1ld29yaywgdXNlQ2xhc3M6IE5vRnJhbWV3b3JrLCBtdWx0aTogdHJ1ZX1dXG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBKc29uU2NoZW1hRm9ybU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBKc29uU2NoZW1hRm9ybVNlcnZpY2UsXG4gICAgICAgIEZyYW1ld29ya0xpYnJhcnlTZXJ2aWNlLFxuICAgICAgICBXaWRnZXRMaWJyYXJ5U2VydmljZSxcbiAgICAgICAgLi4ubG9hZEZyYW1ld29ya3MsXG4gICAgICBdLFxuICAgIH1cbiAgfVxufVxuIl19