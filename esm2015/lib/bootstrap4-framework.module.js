var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Bootstrap4FrameworkModule_1;
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetLibraryModule } from '@ngsf/widget-library';
import { Framework } from '@ngsf/common';
import { Bootstrap4FrameworkComponent } from './bootstrap4-framework.component';
import { Bootstrap4Framework } from './bootstrap4-framework';
let Bootstrap4FrameworkModule = Bootstrap4FrameworkModule_1 = class Bootstrap4FrameworkModule {
    static forRoot() {
        return {
            ngModule: Bootstrap4FrameworkModule_1,
            providers: [
                {
                    provide: Framework,
                    useClass: Bootstrap4Framework,
                    multi: true
                }
            ]
        };
    }
};
Bootstrap4FrameworkModule = Bootstrap4FrameworkModule_1 = __decorate([
    NgModule({
        imports: [
            CommonModule,
            WidgetLibraryModule
        ],
        declarations: [Bootstrap4FrameworkComponent],
        exports: [Bootstrap4FrameworkComponent],
        entryComponents: [Bootstrap4FrameworkComponent]
    })
], Bootstrap4FrameworkModule);
export { Bootstrap4FrameworkModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwNC1mcmFtZXdvcmsubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nc2YvYm9vdHN0cmFwNC1mcmFtZXdvcmsvIiwic291cmNlcyI6WyJsaWIvYm9vdHN0cmFwNC1mcmFtZXdvcmsubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxPQUFPLEVBQXNCLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUE7QUFDNUMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7QUFDeEQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUN0QyxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQTtBQUM3RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQTtBQVcxRCxJQUFhLHlCQUF5QixpQ0FBdEMsTUFBYSx5QkFBeUI7SUFDcEMsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLDJCQUF5QjtZQUNuQyxTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLFNBQVM7b0JBQ2xCLFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLEtBQUssRUFBRSxJQUFJO2lCQUNaO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFiWSx5QkFBeUI7SUFUckMsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsWUFBWTtZQUNaLG1CQUFtQjtTQUNwQjtRQUNELFlBQVksRUFBRSxDQUFDLDRCQUE0QixDQUFDO1FBQzVDLE9BQU8sRUFBRSxDQUFDLDRCQUE0QixDQUFDO1FBQ3ZDLGVBQWUsRUFBRSxDQUFDLDRCQUE0QixDQUFDO0tBQ2hELENBQUM7R0FDVyx5QkFBeUIsQ0FhckM7U0FiWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbidcbmltcG9ydCB7V2lkZ2V0TGlicmFyeU1vZHVsZX0gZnJvbSAnQG5nc2Yvd2lkZ2V0LWxpYnJhcnknXG5pbXBvcnQge0ZyYW1ld29ya30gZnJvbSAnQG5nc2YvY29tbW9uJ1xuaW1wb3J0IHtCb290c3RyYXA0RnJhbWV3b3JrQ29tcG9uZW50fSBmcm9tICcuL2Jvb3RzdHJhcDQtZnJhbWV3b3JrLmNvbXBvbmVudCdcbmltcG9ydCB7Qm9vdHN0cmFwNEZyYW1ld29ya30gZnJvbSAnLi9ib290c3RyYXA0LWZyYW1ld29yaydcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBXaWRnZXRMaWJyYXJ5TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0Jvb3RzdHJhcDRGcmFtZXdvcmtDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQm9vdHN0cmFwNEZyYW1ld29ya0NvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogW0Jvb3RzdHJhcDRGcmFtZXdvcmtDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDRGcmFtZXdvcmtNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEJvb3RzdHJhcDRGcmFtZXdvcmtNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEJvb3RzdHJhcDRGcmFtZXdvcmtNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEZyYW1ld29yayxcbiAgICAgICAgICB1c2VDbGFzczogQm9vdHN0cmFwNEZyYW1ld29yayxcbiAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9XG59XG4iXX0=