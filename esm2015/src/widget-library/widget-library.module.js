var WidgetLibraryModule_1;
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderableDirective } from '../shared/orderable.directive';
import { JsonSchemaFormService } from '../json-schema-form.service';
import { BASIC_WIDGETS } from './index';
let WidgetLibraryModule = WidgetLibraryModule_1 = class WidgetLibraryModule {
    static forRoot() {
        return {
            ngModule: WidgetLibraryModule_1,
            providers: [JsonSchemaFormService]
        };
    }
};
WidgetLibraryModule = WidgetLibraryModule_1 = tslib_1.__decorate([
    NgModule({
        imports: [CommonModule, FormsModule, ReactiveFormsModule],
        declarations: [...BASIC_WIDGETS, OrderableDirective],
        exports: [...BASIC_WIDGETS, OrderableDirective],
        entryComponents: [...BASIC_WIDGETS],
        providers: [JsonSchemaFormService]
    })
], WidgetLibraryModule);
export { WidgetLibraryModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWxpYnJhcnkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcjItanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbInNyYy93aWRnZXQtbGlicmFyeS93aWRnZXQtbGlicmFyeS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRW5FLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXBFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFTeEMsSUFBYSxtQkFBbUIsMkJBQWhDLE1BQWEsbUJBQW1CO0lBQzlCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxxQkFBbUI7WUFDN0IsU0FBUyxFQUFFLENBQUUscUJBQXFCLENBQUU7U0FDckMsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBUFksbUJBQW1CO0lBUC9CLFFBQVEsQ0FBQztRQUNSLE9BQU8sRUFBVSxDQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsbUJBQW1CLENBQUU7UUFDbkUsWUFBWSxFQUFLLENBQUUsR0FBRyxhQUFhLEVBQUUsa0JBQWtCLENBQUU7UUFDekQsT0FBTyxFQUFVLENBQUUsR0FBRyxhQUFhLEVBQUUsa0JBQWtCLENBQUU7UUFDekQsZUFBZSxFQUFFLENBQUUsR0FBRyxhQUFhLENBQUU7UUFDckMsU0FBUyxFQUFRLENBQUUscUJBQXFCLENBQUU7S0FDM0MsQ0FBQztHQUNXLG1CQUFtQixDQU8vQjtTQVBZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IE9yZGVyYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4uL3NoYXJlZC9vcmRlcmFibGUuZGlyZWN0aXZlJztcblxuaW1wb3J0IHsgSnNvblNjaGVtYUZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJztcblxuaW1wb3J0IHsgQkFTSUNfV0lER0VUUyB9IGZyb20gJy4vaW5kZXgnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiAgICAgICAgIFsgQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSBdLFxuICBkZWNsYXJhdGlvbnM6ICAgIFsgLi4uQkFTSUNfV0lER0VUUywgT3JkZXJhYmxlRGlyZWN0aXZlIF0sXG4gIGV4cG9ydHM6ICAgICAgICAgWyAuLi5CQVNJQ19XSURHRVRTLCBPcmRlcmFibGVEaXJlY3RpdmUgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbIC4uLkJBU0lDX1dJREdFVFMgXSxcbiAgcHJvdmlkZXJzOiAgICAgICBbIEpzb25TY2hlbWFGb3JtU2VydmljZSBdXG59KVxuZXhwb3J0IGNsYXNzIFdpZGdldExpYnJhcnlNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFdpZGdldExpYnJhcnlNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFsgSnNvblNjaGVtYUZvcm1TZXJ2aWNlIF1cbiAgICB9O1xuICB9XG59XG4iXX0=