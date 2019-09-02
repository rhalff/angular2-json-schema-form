var Bootstrap4FrameworkModule_1;
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetLibraryModule } from '../../widget-library/widget-library.module';
import { Framework } from '../framework';
import { Bootstrap4FrameworkComponent } from './bootstrap-4-framework.component';
import { Bootstrap4Framework } from './bootstrap-4.framework';
let Bootstrap4FrameworkModule = Bootstrap4FrameworkModule_1 = class Bootstrap4FrameworkModule {
    static forRoot() {
        return {
            ngModule: Bootstrap4FrameworkModule_1,
            providers: [
                { provide: Framework, useClass: Bootstrap4Framework, multi: true }
            ]
        };
    }
};
Bootstrap4FrameworkModule = Bootstrap4FrameworkModule_1 = tslib_1.__decorate([
    NgModule({
        imports: [CommonModule, WidgetLibraryModule],
        declarations: [Bootstrap4FrameworkComponent],
        exports: [Bootstrap4FrameworkComponent],
        entryComponents: [Bootstrap4FrameworkComponent]
    })
], Bootstrap4FrameworkModule);
export { Bootstrap4FrameworkModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLTQtZnJhbWV3b3JrLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWpzb24tc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJzcmMvZnJhbWV3b3JrLWxpYnJhcnkvYm9vdHN0cmFwLTQtZnJhbWV3b3JrL2Jvb3RzdHJhcC00LWZyYW1ld29yay5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDakYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQVE5RCxJQUFhLHlCQUF5QixpQ0FBdEMsTUFBYSx5QkFBeUI7SUFDcEMsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLDJCQUF5QjtZQUNuQyxTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO2FBQ25FO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBVFkseUJBQXlCO0lBTnJDLFFBQVEsQ0FBQztRQUNSLE9BQU8sRUFBVSxDQUFFLFlBQVksRUFBRSxtQkFBbUIsQ0FBRTtRQUN0RCxZQUFZLEVBQUssQ0FBRSw0QkFBNEIsQ0FBRTtRQUNqRCxPQUFPLEVBQVUsQ0FBRSw0QkFBNEIsQ0FBRTtRQUNqRCxlQUFlLEVBQUUsQ0FBRSw0QkFBNEIsQ0FBRTtLQUNsRCxDQUFDO0dBQ1cseUJBQXlCLENBU3JDO1NBVFkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IEpzb25TY2hlbWFGb3JtU2VydmljZSB9IGZyb20gJy4uLy4uL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSc7XG5pbXBvcnQgeyBXaWRnZXRMaWJyYXJ5TW9kdWxlIH0gZnJvbSAnLi4vLi4vd2lkZ2V0LWxpYnJhcnkvd2lkZ2V0LWxpYnJhcnkubW9kdWxlJztcbmltcG9ydCB7IEZyYW1ld29yayB9IGZyb20gJy4uL2ZyYW1ld29yayc7XG5pbXBvcnQgeyBCb290c3RyYXA0RnJhbWV3b3JrQ29tcG9uZW50IH0gZnJvbSAnLi9ib290c3RyYXAtNC1mcmFtZXdvcmsuY29tcG9uZW50JztcbmltcG9ydCB7IEJvb3RzdHJhcDRGcmFtZXdvcmsgfSBmcm9tICcuL2Jvb3RzdHJhcC00LmZyYW1ld29yayc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6ICAgICAgICAgWyBDb21tb25Nb2R1bGUsIFdpZGdldExpYnJhcnlNb2R1bGUgXSxcbiAgZGVjbGFyYXRpb25zOiAgICBbIEJvb3RzdHJhcDRGcmFtZXdvcmtDb21wb25lbnQgXSxcbiAgZXhwb3J0czogICAgICAgICBbIEJvb3RzdHJhcDRGcmFtZXdvcmtDb21wb25lbnQgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbIEJvb3RzdHJhcDRGcmFtZXdvcmtDb21wb25lbnQgXVxufSlcbmV4cG9ydCBjbGFzcyBCb290c3RyYXA0RnJhbWV3b3JrTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBCb290c3RyYXA0RnJhbWV3b3JrTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogRnJhbWV3b3JrLCB1c2VDbGFzczogQm9vdHN0cmFwNEZyYW1ld29yaywgbXVsdGk6IHRydWUgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==