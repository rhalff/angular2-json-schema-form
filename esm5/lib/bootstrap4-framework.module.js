var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetLibraryModule } from '@ngsf/widget-library';
import { Framework } from '@ngsf/common';
import { Bootstrap4FrameworkComponent } from './bootstrap4-framework.component';
import { Bootstrap4Framework } from './bootstrap4-framework';
var Bootstrap4FrameworkModule = (function () {
    function Bootstrap4FrameworkModule() {
    }
    Bootstrap4FrameworkModule_1 = Bootstrap4FrameworkModule;
    Bootstrap4FrameworkModule.forRoot = function () {
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
    };
    var Bootstrap4FrameworkModule_1;
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
    return Bootstrap4FrameworkModule;
}());
export { Bootstrap4FrameworkModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwNC1mcmFtZXdvcmsubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nc2YvYm9vdHN0cmFwNC1mcmFtZXdvcmsvIiwic291cmNlcyI6WyJsaWIvYm9vdHN0cmFwNC1mcmFtZXdvcmsubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFBO0FBQzNELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQTtBQUM1QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQTtBQUN4RCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBQ3RDLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLGtDQUFrQyxDQUFBO0FBQzdFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHdCQUF3QixDQUFBO0FBVzFEO0lBQUE7SUFhQSxDQUFDO2tDQWJZLHlCQUF5QjtJQUM3QixpQ0FBTyxHQUFkO1FBQ0UsT0FBTztZQUNMLFFBQVEsRUFBRSwyQkFBeUI7WUFDbkMsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxTQUFTO29CQUNsQixRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixLQUFLLEVBQUUsSUFBSTtpQkFDWjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7O0lBWlUseUJBQXlCO1FBVHJDLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRTtnQkFDUCxZQUFZO2dCQUNaLG1CQUFtQjthQUNwQjtZQUNELFlBQVksRUFBRSxDQUFDLDRCQUE0QixDQUFDO1lBQzVDLE9BQU8sRUFBRSxDQUFDLDRCQUE0QixDQUFDO1lBQ3ZDLGVBQWUsRUFBRSxDQUFDLDRCQUE0QixDQUFDO1NBQ2hELENBQUM7T0FDVyx5QkFBeUIsQ0FhckM7SUFBRCxnQ0FBQztDQUFBLEFBYkQsSUFhQztTQWJZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJ1xuaW1wb3J0IHtXaWRnZXRMaWJyYXJ5TW9kdWxlfSBmcm9tICdAbmdzZi93aWRnZXQtbGlicmFyeSdcbmltcG9ydCB7RnJhbWV3b3JrfSBmcm9tICdAbmdzZi9jb21tb24nXG5pbXBvcnQge0Jvb3RzdHJhcDRGcmFtZXdvcmtDb21wb25lbnR9IGZyb20gJy4vYm9vdHN0cmFwNC1mcmFtZXdvcmsuY29tcG9uZW50J1xuaW1wb3J0IHtCb290c3RyYXA0RnJhbWV3b3JrfSBmcm9tICcuL2Jvb3RzdHJhcDQtZnJhbWV3b3JrJ1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFdpZGdldExpYnJhcnlNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQm9vdHN0cmFwNEZyYW1ld29ya0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtCb290c3RyYXA0RnJhbWV3b3JrQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbQm9vdHN0cmFwNEZyYW1ld29ya0NvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwNEZyYW1ld29ya01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Qm9vdHN0cmFwNEZyYW1ld29ya01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQm9vdHN0cmFwNEZyYW1ld29ya01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogRnJhbWV3b3JrLFxuICAgICAgICAgIHVzZUNsYXNzOiBCb290c3RyYXA0RnJhbWV3b3JrLFxuICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cbn1cbiJdfQ==