import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonSchemaFormService } from './services/json-schema-form.service';
import { OrderableDirective } from './directives/orderable.directive';
import { AddReferenceComponent } from './components/add-reference.component';
import { ButtonComponent } from './components/button.component';
import { CheckboxComponent } from './components/checkbox.component';
import { CheckboxesComponent } from './components/checkboxes.component';
import { FileComponent } from './components/file.component';
import { HiddenComponent } from './components/hidden.component';
import { InputComponent } from './components/input.component';
import { MessageComponent } from './components/message.component';
import { NoneComponent } from './components/none.component';
import { NumberComponent } from './components/number.component';
import { OneOfComponent } from './components/one-of.component';
import { RadiosComponent } from './components/radios.component';
import { RootComponent } from './components/root.component';
import { SectionComponent } from './components/section.component';
import { SelectComponent } from './components/select.component';
import { SelectFrameworkComponent } from './components/select-framework.component';
import { SelectWidgetComponent } from './components/select-widget.component';
import { SubmitComponent } from './components/submit.component';
import { TabComponent } from './components/tab.component';
import { TabsComponent } from './components/tabs.component';
import { TemplateComponent } from './components/template.component';
import { TextareaComponent } from './components/textarea.component';
var WidgetLibraryModule = (function () {
    function WidgetLibraryModule() {
    }
    WidgetLibraryModule.forRoot = function () {
        return {
            ngModule: WidgetLibraryModule,
            providers: [JsonSchemaFormService],
        };
    };
    WidgetLibraryModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule, ReactiveFormsModule],
                    declarations: [
                        AddReferenceComponent,
                        OneOfComponent,
                        ButtonComponent,
                        CheckboxComponent,
                        CheckboxesComponent,
                        FileComponent,
                        HiddenComponent,
                        InputComponent,
                        MessageComponent,
                        NoneComponent,
                        NumberComponent,
                        RadiosComponent,
                        RootComponent,
                        SectionComponent,
                        SelectComponent,
                        SelectFrameworkComponent,
                        SelectWidgetComponent,
                        SubmitComponent,
                        TabComponent,
                        TabsComponent,
                        TemplateComponent,
                        TextareaComponent,
                        OrderableDirective,
                    ],
                    entryComponents: [
                        AddReferenceComponent,
                        OneOfComponent,
                        ButtonComponent,
                        CheckboxComponent,
                        CheckboxesComponent,
                        FileComponent,
                        HiddenComponent,
                        InputComponent,
                        MessageComponent,
                        NoneComponent,
                        NumberComponent,
                        RadiosComponent,
                        RootComponent,
                        SectionComponent,
                        SelectComponent,
                        SelectFrameworkComponent,
                        SelectWidgetComponent,
                        SubmitComponent,
                        TabComponent,
                        TabsComponent,
                        TemplateComponent,
                        TextareaComponent,
                    ],
                    exports: [
                        AddReferenceComponent,
                        OneOfComponent,
                        ButtonComponent,
                        CheckboxComponent,
                        CheckboxesComponent,
                        FileComponent,
                        HiddenComponent,
                        InputComponent,
                        MessageComponent,
                        NoneComponent,
                        NumberComponent,
                        RadiosComponent,
                        RootComponent,
                        SectionComponent,
                        SelectComponent,
                        SelectFrameworkComponent,
                        SelectWidgetComponent,
                        SubmitComponent,
                        TabComponent,
                        TabsComponent,
                        TemplateComponent,
                        TextareaComponent,
                        OrderableDirective,
                    ],
                    providers: [JsonSchemaFormService],
                },] }
    ];
    return WidgetLibraryModule;
}());
export { WidgetLibraryModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWxpYnJhcnkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nc2Yvd2lkZ2V0LWxpYnJhcnkvIiwic291cmNlcyI6WyJsaWIvd2lkZ2V0LWxpYnJhcnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFBO0FBQzNELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQTtBQUM1QyxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUE7QUFDL0QsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0scUNBQXFDLENBQUE7QUFDekUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sa0NBQWtDLENBQUE7QUFFbkUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUE7QUFDMUUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLCtCQUErQixDQUFBO0FBQzdELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGlDQUFpQyxDQUFBO0FBQ2pFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLG1DQUFtQyxDQUFBO0FBQ3JFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQTtBQUN6RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sK0JBQStCLENBQUE7QUFDN0QsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDhCQUE4QixDQUFBO0FBQzNELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGdDQUFnQyxDQUFBO0FBQy9ELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQTtBQUN6RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sK0JBQStCLENBQUE7QUFDN0QsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLCtCQUErQixDQUFBO0FBQzVELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQTtBQUM3RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNkJBQTZCLENBQUE7QUFDekQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZ0NBQWdDLENBQUE7QUFDL0QsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLCtCQUErQixDQUFBO0FBQzdELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHlDQUF5QyxDQUFBO0FBQ2hGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFBO0FBQzFFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQTtBQUM3RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sNEJBQTRCLENBQUE7QUFDdkQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDZCQUE2QixDQUFBO0FBQ3pELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGlDQUFpQyxDQUFBO0FBQ2pFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGlDQUFpQyxDQUFBO0FBRWpFO0lBQUE7SUF1RkEsQ0FBQztJQU5RLDJCQUFPLEdBQWQ7UUFDRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztTQUNuQyxDQUFBO0lBQ0gsQ0FBQzs7Z0JBdEZGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixDQUFDO29CQUN6RCxZQUFZLEVBQUU7d0JBQ1oscUJBQXFCO3dCQUNyQixjQUFjO3dCQUNkLGVBQWU7d0JBQ2YsaUJBQWlCO3dCQUNqQixtQkFBbUI7d0JBQ25CLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixjQUFjO3dCQUNkLGdCQUFnQjt3QkFDaEIsYUFBYTt3QkFDYixlQUFlO3dCQUNmLGVBQWU7d0JBQ2YsYUFBYTt3QkFDYixnQkFBZ0I7d0JBQ2hCLGVBQWU7d0JBQ2Ysd0JBQXdCO3dCQUN4QixxQkFBcUI7d0JBQ3JCLGVBQWU7d0JBQ2YsWUFBWTt3QkFDWixhQUFhO3dCQUNiLGlCQUFpQjt3QkFDakIsaUJBQWlCO3dCQUVqQixrQkFBa0I7cUJBQ25CO29CQUNELGVBQWUsRUFBRTt3QkFDZixxQkFBcUI7d0JBQ3JCLGNBQWM7d0JBQ2QsZUFBZTt3QkFDZixpQkFBaUI7d0JBQ2pCLG1CQUFtQjt3QkFDbkIsYUFBYTt3QkFDYixlQUFlO3dCQUNmLGNBQWM7d0JBQ2QsZ0JBQWdCO3dCQUNoQixhQUFhO3dCQUNiLGVBQWU7d0JBQ2YsZUFBZTt3QkFDZixhQUFhO3dCQUNiLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZix3QkFBd0I7d0JBQ3hCLHFCQUFxQjt3QkFDckIsZUFBZTt3QkFDZixZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsaUJBQWlCO3dCQUNqQixpQkFBaUI7cUJBQ2xCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxxQkFBcUI7d0JBQ3JCLGNBQWM7d0JBQ2QsZUFBZTt3QkFDZixpQkFBaUI7d0JBQ2pCLG1CQUFtQjt3QkFDbkIsYUFBYTt3QkFDYixlQUFlO3dCQUNmLGNBQWM7d0JBQ2QsZ0JBQWdCO3dCQUNoQixhQUFhO3dCQUNiLGVBQWU7d0JBQ2YsZUFBZTt3QkFDZixhQUFhO3dCQUNiLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZix3QkFBd0I7d0JBQ3hCLHFCQUFxQjt3QkFDckIsZUFBZTt3QkFDZixZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsaUJBQWlCO3dCQUNqQixpQkFBaUI7d0JBRWpCLGtCQUFrQjtxQkFDbkI7b0JBQ0QsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7aUJBQ25DOztJQVFELDBCQUFDO0NBQUEsQUF2RkQsSUF1RkM7U0FQWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbidcbmltcG9ydCB7Rm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJ1xuaW1wb3J0IHtKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJy4vc2VydmljZXMvanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJ1xuaW1wb3J0IHtPcmRlcmFibGVEaXJlY3RpdmV9IGZyb20gJy4vZGlyZWN0aXZlcy9vcmRlcmFibGUuZGlyZWN0aXZlJ1xuXG5pbXBvcnQge0FkZFJlZmVyZW5jZUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2FkZC1yZWZlcmVuY2UuY29tcG9uZW50J1xuaW1wb3J0IHtCdXR0b25Db21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9idXR0b24uY29tcG9uZW50J1xuaW1wb3J0IHtDaGVja2JveENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2NoZWNrYm94LmNvbXBvbmVudCdcbmltcG9ydCB7Q2hlY2tib3hlc0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2NoZWNrYm94ZXMuY29tcG9uZW50J1xuaW1wb3J0IHtGaWxlQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvZmlsZS5jb21wb25lbnQnXG5pbXBvcnQge0hpZGRlbkNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2hpZGRlbi5jb21wb25lbnQnXG5pbXBvcnQge0lucHV0Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvaW5wdXQuY29tcG9uZW50J1xuaW1wb3J0IHtNZXNzYWdlQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWVzc2FnZS5jb21wb25lbnQnXG5pbXBvcnQge05vbmVDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9ub25lLmNvbXBvbmVudCdcbmltcG9ydCB7TnVtYmVyQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbnVtYmVyLmNvbXBvbmVudCdcbmltcG9ydCB7T25lT2ZDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9vbmUtb2YuY29tcG9uZW50J1xuaW1wb3J0IHtSYWRpb3NDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9yYWRpb3MuY29tcG9uZW50J1xuaW1wb3J0IHtSb290Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvcm9vdC5jb21wb25lbnQnXG5pbXBvcnQge1NlY3Rpb25Db21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9zZWN0aW9uLmNvbXBvbmVudCdcbmltcG9ydCB7U2VsZWN0Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvc2VsZWN0LmNvbXBvbmVudCdcbmltcG9ydCB7U2VsZWN0RnJhbWV3b3JrQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvc2VsZWN0LWZyYW1ld29yay5jb21wb25lbnQnXG5pbXBvcnQge1NlbGVjdFdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL3NlbGVjdC13aWRnZXQuY29tcG9uZW50J1xuaW1wb3J0IHtTdWJtaXRDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9zdWJtaXQuY29tcG9uZW50J1xuaW1wb3J0IHtUYWJDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy90YWIuY29tcG9uZW50J1xuaW1wb3J0IHtUYWJzQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvdGFicy5jb21wb25lbnQnXG5pbXBvcnQge1RlbXBsYXRlQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvdGVtcGxhdGUuY29tcG9uZW50J1xuaW1wb3J0IHtUZXh0YXJlYUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL3RleHRhcmVhLmNvbXBvbmVudCdcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBZGRSZWZlcmVuY2VDb21wb25lbnQsXG4gICAgT25lT2ZDb21wb25lbnQsXG4gICAgQnV0dG9uQ29tcG9uZW50LFxuICAgIENoZWNrYm94Q29tcG9uZW50LFxuICAgIENoZWNrYm94ZXNDb21wb25lbnQsXG4gICAgRmlsZUNvbXBvbmVudCxcbiAgICBIaWRkZW5Db21wb25lbnQsXG4gICAgSW5wdXRDb21wb25lbnQsXG4gICAgTWVzc2FnZUNvbXBvbmVudCxcbiAgICBOb25lQ29tcG9uZW50LFxuICAgIE51bWJlckNvbXBvbmVudCxcbiAgICBSYWRpb3NDb21wb25lbnQsXG4gICAgUm9vdENvbXBvbmVudCxcbiAgICBTZWN0aW9uQ29tcG9uZW50LFxuICAgIFNlbGVjdENvbXBvbmVudCxcbiAgICBTZWxlY3RGcmFtZXdvcmtDb21wb25lbnQsXG4gICAgU2VsZWN0V2lkZ2V0Q29tcG9uZW50LFxuICAgIFN1Ym1pdENvbXBvbmVudCxcbiAgICBUYWJDb21wb25lbnQsXG4gICAgVGFic0NvbXBvbmVudCxcbiAgICBUZW1wbGF0ZUNvbXBvbmVudCxcbiAgICBUZXh0YXJlYUNvbXBvbmVudCxcblxuICAgIE9yZGVyYWJsZURpcmVjdGl2ZSxcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgQWRkUmVmZXJlbmNlQ29tcG9uZW50LFxuICAgIE9uZU9mQ29tcG9uZW50LFxuICAgIEJ1dHRvbkNvbXBvbmVudCxcbiAgICBDaGVja2JveENvbXBvbmVudCxcbiAgICBDaGVja2JveGVzQ29tcG9uZW50LFxuICAgIEZpbGVDb21wb25lbnQsXG4gICAgSGlkZGVuQ29tcG9uZW50LFxuICAgIElucHV0Q29tcG9uZW50LFxuICAgIE1lc3NhZ2VDb21wb25lbnQsXG4gICAgTm9uZUNvbXBvbmVudCxcbiAgICBOdW1iZXJDb21wb25lbnQsXG4gICAgUmFkaW9zQ29tcG9uZW50LFxuICAgIFJvb3RDb21wb25lbnQsXG4gICAgU2VjdGlvbkNvbXBvbmVudCxcbiAgICBTZWxlY3RDb21wb25lbnQsXG4gICAgU2VsZWN0RnJhbWV3b3JrQ29tcG9uZW50LFxuICAgIFNlbGVjdFdpZGdldENvbXBvbmVudCxcbiAgICBTdWJtaXRDb21wb25lbnQsXG4gICAgVGFiQ29tcG9uZW50LFxuICAgIFRhYnNDb21wb25lbnQsXG4gICAgVGVtcGxhdGVDb21wb25lbnQsXG4gICAgVGV4dGFyZWFDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBBZGRSZWZlcmVuY2VDb21wb25lbnQsXG4gICAgT25lT2ZDb21wb25lbnQsXG4gICAgQnV0dG9uQ29tcG9uZW50LFxuICAgIENoZWNrYm94Q29tcG9uZW50LFxuICAgIENoZWNrYm94ZXNDb21wb25lbnQsXG4gICAgRmlsZUNvbXBvbmVudCxcbiAgICBIaWRkZW5Db21wb25lbnQsXG4gICAgSW5wdXRDb21wb25lbnQsXG4gICAgTWVzc2FnZUNvbXBvbmVudCxcbiAgICBOb25lQ29tcG9uZW50LFxuICAgIE51bWJlckNvbXBvbmVudCxcbiAgICBSYWRpb3NDb21wb25lbnQsXG4gICAgUm9vdENvbXBvbmVudCxcbiAgICBTZWN0aW9uQ29tcG9uZW50LFxuICAgIFNlbGVjdENvbXBvbmVudCxcbiAgICBTZWxlY3RGcmFtZXdvcmtDb21wb25lbnQsXG4gICAgU2VsZWN0V2lkZ2V0Q29tcG9uZW50LFxuICAgIFN1Ym1pdENvbXBvbmVudCxcbiAgICBUYWJDb21wb25lbnQsXG4gICAgVGFic0NvbXBvbmVudCxcbiAgICBUZW1wbGF0ZUNvbXBvbmVudCxcbiAgICBUZXh0YXJlYUNvbXBvbmVudCxcblxuICAgIE9yZGVyYWJsZURpcmVjdGl2ZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbSnNvblNjaGVtYUZvcm1TZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgV2lkZ2V0TGlicmFyeU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8V2lkZ2V0TGlicmFyeU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogV2lkZ2V0TGlicmFyeU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW0pzb25TY2hlbWFGb3JtU2VydmljZV0sXG4gICAgfVxuICB9XG59XG4iXX0=