import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetLibraryModule } from '@ngsf/widget-library';
import { Framework } from '@ngsf/common';
import { NoFrameworkComponent } from './no-framework.component';
import { NoFramework } from './no-framework';
import * as i0 from "@angular/core";
class NoFrameworkModule {
    static forRoot() {
        return {
            ngModule: NoFrameworkModule,
            providers: [
                {
                    provide: Framework,
                    useClass: NoFramework,
                    multi: true
                }
            ]
        };
    }
    static ɵfac = function NoFrameworkModule_Factory(t) { return new (t || NoFrameworkModule)(); };
    static ɵmod = i0.ɵɵdefineNgModule({ type: NoFrameworkModule });
    static ɵinj = i0.ɵɵdefineInjector({ imports: [CommonModule,
            WidgetLibraryModule] });
}
export { NoFrameworkModule };
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NoFrameworkModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    WidgetLibraryModule
                ],
                declarations: [NoFrameworkComponent],
                exports: [NoFrameworkComponent]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NoFrameworkModule, { declarations: [NoFrameworkComponent], imports: [CommonModule,
        WidgetLibraryModule], exports: [NoFrameworkComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tZnJhbWV3b3JrLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nc2Ytbm8tZnJhbWV3b3JrL3NyYy9saWIvbm8tZnJhbWV3b3JrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXNCLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUE7QUFDNUMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7QUFDeEQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUV0QyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQTtBQUM3RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUE7O0FBRTFDLE1BUWEsaUJBQWlCO0lBQzVCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxTQUFTO29CQUNsQixRQUFRLEVBQUUsV0FBVztvQkFDckIsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDOzJFQVpVLGlCQUFpQjs4Q0FBakIsaUJBQWlCO2tEQU4xQixZQUFZO1lBQ1osbUJBQW1COztTQUtWLGlCQUFpQjt1RkFBakIsaUJBQWlCO2NBUjdCLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixtQkFBbUI7aUJBQ3BCO2dCQUNELFlBQVksRUFBRSxDQUFDLG9CQUFvQixDQUFDO2dCQUNwQyxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQzthQUNoQzs7d0ZBQ1ksaUJBQWlCLG1CQUhiLG9CQUFvQixhQUhqQyxZQUFZO1FBQ1osbUJBQW1CLGFBR1gsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nXG5pbXBvcnQge1dpZGdldExpYnJhcnlNb2R1bGV9IGZyb20gJ0BuZ3NmL3dpZGdldC1saWJyYXJ5J1xuaW1wb3J0IHtGcmFtZXdvcmt9IGZyb20gJ0BuZ3NmL2NvbW1vbidcbi8vIE5vIGZyYW1ld29yayAtIHBsYWluIEhUTUwgY29udHJvbHMgKHN0eWxlcyBmcm9tIGZvcm0gbGF5b3V0IG9ubHkpXG5pbXBvcnQge05vRnJhbWV3b3JrQ29tcG9uZW50fSBmcm9tICcuL25vLWZyYW1ld29yay5jb21wb25lbnQnXG5pbXBvcnQge05vRnJhbWV3b3JrfSBmcm9tICcuL25vLWZyYW1ld29yaydcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBXaWRnZXRMaWJyYXJ5TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW05vRnJhbWV3b3JrQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW05vRnJhbWV3b3JrQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOb0ZyYW1ld29ya01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Tm9GcmFtZXdvcmtNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5vRnJhbWV3b3JrTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBGcmFtZXdvcmssXG4gICAgICAgICAgdXNlQ2xhc3M6IE5vRnJhbWV3b3JrLFxuICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cbn1cbiJdfQ==