var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NoFrameworkModule_1;
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetLibraryModule } from '@ngsf/widget-library';
import { Framework } from '@ngsf/common';
import { NoFrameworkComponent } from './no-framework.component';
import { NoFramework } from './no-framework';
let NoFrameworkModule = NoFrameworkModule_1 = class NoFrameworkModule {
    static forRoot() {
        return {
            ngModule: NoFrameworkModule_1,
            providers: [
                {
                    provide: Framework,
                    useClass: NoFramework,
                    multi: true
                }
            ]
        };
    }
};
NoFrameworkModule = NoFrameworkModule_1 = __decorate([
    NgModule({
        imports: [
            CommonModule,
            WidgetLibraryModule
        ],
        declarations: [NoFrameworkComponent],
        exports: [NoFrameworkComponent],
        entryComponents: [NoFrameworkComponent]
    })
], NoFrameworkModule);
export { NoFrameworkModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tZnJhbWV3b3JrLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL25vLWZyYW1ld29yay8iLCJzb3VyY2VzIjpbImxpYi9uby1mcmFtZXdvcmsubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxPQUFPLEVBQXNCLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUE7QUFDNUMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7QUFDeEQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUV0QyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQTtBQUM3RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUE7QUFXMUMsSUFBYSxpQkFBaUIseUJBQTlCLE1BQWEsaUJBQWlCO0lBQzVCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxtQkFBaUI7WUFDM0IsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxTQUFTO29CQUNsQixRQUFRLEVBQUUsV0FBVztvQkFDckIsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQWJZLGlCQUFpQjtJQVQ3QixRQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxZQUFZO1lBQ1osbUJBQW1CO1NBQ3BCO1FBQ0QsWUFBWSxFQUFFLENBQUMsb0JBQW9CLENBQUM7UUFDcEMsT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7UUFDL0IsZUFBZSxFQUFFLENBQUMsb0JBQW9CLENBQUM7S0FDeEMsQ0FBQztHQUNXLGlCQUFpQixDQWE3QjtTQWJZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJ1xuaW1wb3J0IHtXaWRnZXRMaWJyYXJ5TW9kdWxlfSBmcm9tICdAbmdzZi93aWRnZXQtbGlicmFyeSdcbmltcG9ydCB7RnJhbWV3b3JrfSBmcm9tICdAbmdzZi9jb21tb24nXG4vLyBObyBmcmFtZXdvcmsgLSBwbGFpbiBIVE1MIGNvbnRyb2xzIChzdHlsZXMgZnJvbSBmb3JtIGxheW91dCBvbmx5KVxuaW1wb3J0IHtOb0ZyYW1ld29ya0NvbXBvbmVudH0gZnJvbSAnLi9uby1mcmFtZXdvcmsuY29tcG9uZW50J1xuaW1wb3J0IHtOb0ZyYW1ld29ya30gZnJvbSAnLi9uby1mcmFtZXdvcmsnXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgV2lkZ2V0TGlicmFyeU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtOb0ZyYW1ld29ya0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtOb0ZyYW1ld29ya0NvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogW05vRnJhbWV3b3JrQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOb0ZyYW1ld29ya01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Tm9GcmFtZXdvcmtNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5vRnJhbWV3b3JrTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBGcmFtZXdvcmssXG4gICAgICAgICAgdXNlQ2xhc3M6IE5vRnJhbWV3b3JrLFxuICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cbn1cbiJdfQ==