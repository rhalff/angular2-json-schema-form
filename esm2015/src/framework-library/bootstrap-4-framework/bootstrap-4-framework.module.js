import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetLibraryModule } from '../../widget-library/widget-library.module';
import { Framework } from '../framework';
import { Bootstrap4FrameworkComponent } from './bootstrap-4-framework.component';
import { Bootstrap4Framework } from './bootstrap-4.framework';
export class Bootstrap4FrameworkModule {
    static forRoot() {
        return {
            ngModule: Bootstrap4FrameworkModule,
            providers: [
                { provide: Framework, useClass: Bootstrap4Framework, multi: true }
            ]
        };
    }
}
Bootstrap4FrameworkModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, WidgetLibraryModule],
                declarations: [Bootstrap4FrameworkComponent],
                exports: [Bootstrap4FrameworkComponent],
                entryComponents: [Bootstrap4FrameworkComponent]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLTQtZnJhbWV3b3JrLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWpzb24tc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJzcmMvZnJhbWV3b3JrLWxpYnJhcnkvYm9vdHN0cmFwLTQtZnJhbWV3b3JrL2Jvb3RzdHJhcC00LWZyYW1ld29yay5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFROUQsTUFBTTtJQUNKLE1BQU0sQ0FBQyxPQUFPO1FBQ1osTUFBTSxDQUFDO1lBQ0wsUUFBUSxFQUFFLHlCQUF5QjtZQUNuQyxTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO2FBQ25FO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQWRGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQVUsQ0FBRSxZQUFZLEVBQUUsbUJBQW1CLENBQUU7Z0JBQ3RELFlBQVksRUFBSyxDQUFFLDRCQUE0QixDQUFFO2dCQUNqRCxPQUFPLEVBQVUsQ0FBRSw0QkFBNEIsQ0FBRTtnQkFDakQsZUFBZSxFQUFFLENBQUUsNEJBQTRCLENBQUU7YUFDbEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgSnNvblNjaGVtYUZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJztcbmltcG9ydCB7IFdpZGdldExpYnJhcnlNb2R1bGUgfSBmcm9tICcuLi8uLi93aWRnZXQtbGlicmFyeS93aWRnZXQtbGlicmFyeS5tb2R1bGUnO1xuaW1wb3J0IHsgRnJhbWV3b3JrIH0gZnJvbSAnLi4vZnJhbWV3b3JrJztcbmltcG9ydCB7IEJvb3RzdHJhcDRGcmFtZXdvcmtDb21wb25lbnQgfSBmcm9tICcuL2Jvb3RzdHJhcC00LWZyYW1ld29yay5jb21wb25lbnQnO1xuaW1wb3J0IHsgQm9vdHN0cmFwNEZyYW1ld29yayB9IGZyb20gJy4vYm9vdHN0cmFwLTQuZnJhbWV3b3JrJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogICAgICAgICBbIENvbW1vbk1vZHVsZSwgV2lkZ2V0TGlicmFyeU1vZHVsZSBdLFxuICBkZWNsYXJhdGlvbnM6ICAgIFsgQm9vdHN0cmFwNEZyYW1ld29ya0NvbXBvbmVudCBdLFxuICBleHBvcnRzOiAgICAgICAgIFsgQm9vdHN0cmFwNEZyYW1ld29ya0NvbXBvbmVudCBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFsgQm9vdHN0cmFwNEZyYW1ld29ya0NvbXBvbmVudCBdXG59KVxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDRGcmFtZXdvcmtNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEJvb3RzdHJhcDRGcmFtZXdvcmtNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBGcmFtZXdvcmssIHVzZUNsYXNzOiBCb290c3RyYXA0RnJhbWV3b3JrLCBtdWx0aTogdHJ1ZSB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19