var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Bootstrap3FrameworkModule_1;
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Framework } from '@ngsf/common';
import { WidgetLibraryModule } from '@ngsf/widget-library';
import { Bootstrap3FrameworkComponent } from './bootstrap3-framework.component';
import { Bootstrap3Framework } from './bootstrap3-framework';
let Bootstrap3FrameworkModule = Bootstrap3FrameworkModule_1 = class Bootstrap3FrameworkModule {
    static forRoot() {
        return {
            ngModule: Bootstrap3FrameworkModule_1,
            providers: [
                {
                    provide: Framework,
                    useClass: Bootstrap3Framework,
                    multi: true
                }
            ]
        };
    }
};
Bootstrap3FrameworkModule = Bootstrap3FrameworkModule_1 = __decorate([
    NgModule({
        imports: [
            CommonModule,
            WidgetLibraryModule
        ],
        declarations: [Bootstrap3FrameworkComponent],
        exports: [Bootstrap3FrameworkComponent],
        entryComponents: [Bootstrap3FrameworkComponent]
    })
], Bootstrap3FrameworkModule);
export { Bootstrap3FrameworkModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwMy1mcmFtZXdvcmsubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nc2YvYm9vdHN0cmFwMy1mcmFtZXdvcmsvIiwic291cmNlcyI6WyJsaWIvYm9vdHN0cmFwMy1mcmFtZXdvcmsubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFzQixNQUFNLGVBQWUsQ0FBQTtBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUE7QUFDNUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUN0QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQTtBQUN4RCxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQTtBQUM3RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQTtBQVcxRCxJQUFhLHlCQUF5QixpQ0FBdEMsTUFBYSx5QkFBeUI7SUFDcEMsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLDJCQUF5QjtZQUNuQyxTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLFNBQVM7b0JBQ2xCLFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLEtBQUssRUFBRSxJQUFJO2lCQUNaO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFiWSx5QkFBeUI7SUFUckMsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsWUFBWTtZQUNaLG1CQUFtQjtTQUNwQjtRQUNELFlBQVksRUFBRSxDQUFDLDRCQUE0QixDQUFDO1FBQzVDLE9BQU8sRUFBRSxDQUFDLDRCQUE0QixDQUFDO1FBQ3ZDLGVBQWUsRUFBRSxDQUFDLDRCQUE0QixDQUFDO0tBQ2hELENBQUM7R0FDVyx5QkFBeUIsQ0FhckM7U0FiWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbidcbmltcG9ydCB7RnJhbWV3b3JrfSBmcm9tICdAbmdzZi9jb21tb24nXG5pbXBvcnQge1dpZGdldExpYnJhcnlNb2R1bGV9IGZyb20gJ0BuZ3NmL3dpZGdldC1saWJyYXJ5J1xuaW1wb3J0IHtCb290c3RyYXAzRnJhbWV3b3JrQ29tcG9uZW50fSBmcm9tICcuL2Jvb3RzdHJhcDMtZnJhbWV3b3JrLmNvbXBvbmVudCdcbmltcG9ydCB7Qm9vdHN0cmFwM0ZyYW1ld29ya30gZnJvbSAnLi9ib290c3RyYXAzLWZyYW1ld29yaydcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBXaWRnZXRMaWJyYXJ5TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0Jvb3RzdHJhcDNGcmFtZXdvcmtDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQm9vdHN0cmFwM0ZyYW1ld29ya0NvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogW0Jvb3RzdHJhcDNGcmFtZXdvcmtDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDNGcmFtZXdvcmtNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEJvb3RzdHJhcDNGcmFtZXdvcmtNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEJvb3RzdHJhcDNGcmFtZXdvcmtNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEZyYW1ld29yayxcbiAgICAgICAgICB1c2VDbGFzczogQm9vdHN0cmFwM0ZyYW1ld29yayxcbiAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9XG59XG4iXX0=