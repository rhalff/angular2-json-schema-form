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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NoFrameworkModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.3", ngImport: i0, type: NoFrameworkModule, declarations: [NoFrameworkComponent], imports: [CommonModule,
            WidgetLibraryModule], exports: [NoFrameworkComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NoFrameworkModule, imports: [CommonModule,
            WidgetLibraryModule] });
}
export { NoFrameworkModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NoFrameworkModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        WidgetLibraryModule
                    ],
                    declarations: [NoFrameworkComponent],
                    exports: [NoFrameworkComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tZnJhbWV3b3JrLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nc2Ytbm8tZnJhbWV3b3JrL3NyYy9saWIvbm8tZnJhbWV3b3JrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXNCLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUE7QUFDNUMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7QUFDeEQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUV0QyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQTtBQUM3RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUE7O0FBRTFDLE1BUWEsaUJBQWlCO0lBQzVCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxTQUFTO29CQUNsQixRQUFRLEVBQUUsV0FBVztvQkFDckIsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO3VHQVpVLGlCQUFpQjt3R0FBakIsaUJBQWlCLGlCQUhiLG9CQUFvQixhQUhqQyxZQUFZO1lBQ1osbUJBQW1CLGFBR1gsb0JBQW9CO3dHQUVuQixpQkFBaUIsWUFOMUIsWUFBWTtZQUNaLG1CQUFtQjs7U0FLVixpQkFBaUI7MkZBQWpCLGlCQUFpQjtrQkFSN0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixtQkFBbUI7cUJBQ3BCO29CQUNELFlBQVksRUFBRSxDQUFDLG9CQUFvQixDQUFDO29CQUNwQyxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztpQkFDaEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbidcbmltcG9ydCB7V2lkZ2V0TGlicmFyeU1vZHVsZX0gZnJvbSAnQG5nc2Yvd2lkZ2V0LWxpYnJhcnknXG5pbXBvcnQge0ZyYW1ld29ya30gZnJvbSAnQG5nc2YvY29tbW9uJ1xuLy8gTm8gZnJhbWV3b3JrIC0gcGxhaW4gSFRNTCBjb250cm9scyAoc3R5bGVzIGZyb20gZm9ybSBsYXlvdXQgb25seSlcbmltcG9ydCB7Tm9GcmFtZXdvcmtDb21wb25lbnR9IGZyb20gJy4vbm8tZnJhbWV3b3JrLmNvbXBvbmVudCdcbmltcG9ydCB7Tm9GcmFtZXdvcmt9IGZyb20gJy4vbm8tZnJhbWV3b3JrJ1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFdpZGdldExpYnJhcnlNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbTm9GcmFtZXdvcmtDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTm9GcmFtZXdvcmtDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE5vRnJhbWV3b3JrTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxOb0ZyYW1ld29ya01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTm9GcmFtZXdvcmtNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEZyYW1ld29yayxcbiAgICAgICAgICB1c2VDbGFzczogTm9GcmFtZXdvcmssXG4gICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfVxufVxuIl19