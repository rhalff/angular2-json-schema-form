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
import { NoFrameworkComponent } from './no-framework.component';
import { NoFramework } from './no-framework';
var NoFrameworkModule = (function () {
    function NoFrameworkModule() {
    }
    NoFrameworkModule_1 = NoFrameworkModule;
    NoFrameworkModule.forRoot = function () {
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
    };
    var NoFrameworkModule_1;
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
    return NoFrameworkModule;
}());
export { NoFrameworkModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tZnJhbWV3b3JrLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL25vLWZyYW1ld29yay8iLCJzb3VyY2VzIjpbImxpYi9uby1mcmFtZXdvcmsubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFBO0FBQzNELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQTtBQUM1QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQTtBQUN4RCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBRXRDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDBCQUEwQixDQUFBO0FBQzdELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQTtBQVcxQztJQUFBO0lBYUEsQ0FBQzswQkFiWSxpQkFBaUI7SUFDckIseUJBQU8sR0FBZDtRQUNFLE9BQU87WUFDTCxRQUFRLEVBQUUsbUJBQWlCO1lBQzNCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsU0FBUztvQkFDbEIsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLEtBQUssRUFBRSxJQUFJO2lCQUNaO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQzs7SUFaVSxpQkFBaUI7UUFUN0IsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLFlBQVk7Z0JBQ1osbUJBQW1CO2FBQ3BCO1lBQ0QsWUFBWSxFQUFFLENBQUMsb0JBQW9CLENBQUM7WUFDcEMsT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7WUFDL0IsZUFBZSxFQUFFLENBQUMsb0JBQW9CLENBQUM7U0FDeEMsQ0FBQztPQUNXLGlCQUFpQixDQWE3QjtJQUFELHdCQUFDO0NBQUEsQUFiRCxJQWFDO1NBYlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nXG5pbXBvcnQge1dpZGdldExpYnJhcnlNb2R1bGV9IGZyb20gJ0BuZ3NmL3dpZGdldC1saWJyYXJ5J1xuaW1wb3J0IHtGcmFtZXdvcmt9IGZyb20gJ0BuZ3NmL2NvbW1vbidcbi8vIE5vIGZyYW1ld29yayAtIHBsYWluIEhUTUwgY29udHJvbHMgKHN0eWxlcyBmcm9tIGZvcm0gbGF5b3V0IG9ubHkpXG5pbXBvcnQge05vRnJhbWV3b3JrQ29tcG9uZW50fSBmcm9tICcuL25vLWZyYW1ld29yay5jb21wb25lbnQnXG5pbXBvcnQge05vRnJhbWV3b3JrfSBmcm9tICcuL25vLWZyYW1ld29yaydcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBXaWRnZXRMaWJyYXJ5TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW05vRnJhbWV3b3JrQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW05vRnJhbWV3b3JrQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbTm9GcmFtZXdvcmtDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE5vRnJhbWV3b3JrTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxOb0ZyYW1ld29ya01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTm9GcmFtZXdvcmtNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEZyYW1ld29yayxcbiAgICAgICAgICB1c2VDbGFzczogTm9GcmFtZXdvcmssXG4gICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfVxufVxuIl19