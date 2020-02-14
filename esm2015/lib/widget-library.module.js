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
export class WidgetLibraryModule {
    static forRoot() {
        return {
            ngModule: WidgetLibraryModule,
            providers: [JsonSchemaFormService],
        };
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWxpYnJhcnkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nc2Yvd2lkZ2V0LWxpYnJhcnkvIiwic291cmNlcyI6WyJsaWIvd2lkZ2V0LWxpYnJhcnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFBO0FBQzNELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQTtBQUM1QyxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUE7QUFDL0QsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0scUNBQXFDLENBQUE7QUFDekUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sa0NBQWtDLENBQUE7QUFFbkUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUE7QUFDMUUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLCtCQUErQixDQUFBO0FBQzdELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGlDQUFpQyxDQUFBO0FBQ2pFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLG1DQUFtQyxDQUFBO0FBQ3JFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQTtBQUN6RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sK0JBQStCLENBQUE7QUFDN0QsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDhCQUE4QixDQUFBO0FBQzNELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGdDQUFnQyxDQUFBO0FBQy9ELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQTtBQUN6RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sK0JBQStCLENBQUE7QUFDN0QsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLCtCQUErQixDQUFBO0FBQzVELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQTtBQUM3RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNkJBQTZCLENBQUE7QUFDekQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZ0NBQWdDLENBQUE7QUFDL0QsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLCtCQUErQixDQUFBO0FBQzdELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHlDQUF5QyxDQUFBO0FBQ2hGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFBO0FBQzFFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQTtBQUM3RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sNEJBQTRCLENBQUE7QUFDdkQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDZCQUE2QixDQUFBO0FBQ3pELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGlDQUFpQyxDQUFBO0FBQ2pFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGlDQUFpQyxDQUFBO0FBa0ZqRSxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7U0FDbkMsQ0FBQTtJQUNILENBQUM7OztZQXRGRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsQ0FBQztnQkFDekQsWUFBWSxFQUFFO29CQUNaLHFCQUFxQjtvQkFDckIsY0FBYztvQkFDZCxlQUFlO29CQUNmLGlCQUFpQjtvQkFDakIsbUJBQW1CO29CQUNuQixhQUFhO29CQUNiLGVBQWU7b0JBQ2YsY0FBYztvQkFDZCxnQkFBZ0I7b0JBQ2hCLGFBQWE7b0JBQ2IsZUFBZTtvQkFDZixlQUFlO29CQUNmLGFBQWE7b0JBQ2IsZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLHdCQUF3QjtvQkFDeEIscUJBQXFCO29CQUNyQixlQUFlO29CQUNmLFlBQVk7b0JBQ1osYUFBYTtvQkFDYixpQkFBaUI7b0JBQ2pCLGlCQUFpQjtvQkFFakIsa0JBQWtCO2lCQUNuQjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2YscUJBQXFCO29CQUNyQixjQUFjO29CQUNkLGVBQWU7b0JBQ2YsaUJBQWlCO29CQUNqQixtQkFBbUI7b0JBQ25CLGFBQWE7b0JBQ2IsZUFBZTtvQkFDZixjQUFjO29CQUNkLGdCQUFnQjtvQkFDaEIsYUFBYTtvQkFDYixlQUFlO29CQUNmLGVBQWU7b0JBQ2YsYUFBYTtvQkFDYixnQkFBZ0I7b0JBQ2hCLGVBQWU7b0JBQ2Ysd0JBQXdCO29CQUN4QixxQkFBcUI7b0JBQ3JCLGVBQWU7b0JBQ2YsWUFBWTtvQkFDWixhQUFhO29CQUNiLGlCQUFpQjtvQkFDakIsaUJBQWlCO2lCQUNsQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AscUJBQXFCO29CQUNyQixjQUFjO29CQUNkLGVBQWU7b0JBQ2YsaUJBQWlCO29CQUNqQixtQkFBbUI7b0JBQ25CLGFBQWE7b0JBQ2IsZUFBZTtvQkFDZixjQUFjO29CQUNkLGdCQUFnQjtvQkFDaEIsYUFBYTtvQkFDYixlQUFlO29CQUNmLGVBQWU7b0JBQ2YsYUFBYTtvQkFDYixnQkFBZ0I7b0JBQ2hCLGVBQWU7b0JBQ2Ysd0JBQXdCO29CQUN4QixxQkFBcUI7b0JBQ3JCLGVBQWU7b0JBQ2YsWUFBWTtvQkFDWixhQUFhO29CQUNiLGlCQUFpQjtvQkFDakIsaUJBQWlCO29CQUVqQixrQkFBa0I7aUJBQ25CO2dCQUNELFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO2FBQ25DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nXG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3JtcydcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2VzL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSdcbmltcG9ydCB7T3JkZXJhYmxlRGlyZWN0aXZlfSBmcm9tICcuL2RpcmVjdGl2ZXMvb3JkZXJhYmxlLmRpcmVjdGl2ZSdcblxuaW1wb3J0IHtBZGRSZWZlcmVuY2VDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9hZGQtcmVmZXJlbmNlLmNvbXBvbmVudCdcbmltcG9ydCB7QnV0dG9uQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvYnV0dG9uLmNvbXBvbmVudCdcbmltcG9ydCB7Q2hlY2tib3hDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9jaGVja2JveC5jb21wb25lbnQnXG5pbXBvcnQge0NoZWNrYm94ZXNDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9jaGVja2JveGVzLmNvbXBvbmVudCdcbmltcG9ydCB7RmlsZUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2ZpbGUuY29tcG9uZW50J1xuaW1wb3J0IHtIaWRkZW5Db21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9oaWRkZW4uY29tcG9uZW50J1xuaW1wb3J0IHtJbnB1dENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2lucHV0LmNvbXBvbmVudCdcbmltcG9ydCB7TWVzc2FnZUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21lc3NhZ2UuY29tcG9uZW50J1xuaW1wb3J0IHtOb25lQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbm9uZS5jb21wb25lbnQnXG5pbXBvcnQge051bWJlckNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL251bWJlci5jb21wb25lbnQnXG5pbXBvcnQge09uZU9mQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvb25lLW9mLmNvbXBvbmVudCdcbmltcG9ydCB7UmFkaW9zQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvcmFkaW9zLmNvbXBvbmVudCdcbmltcG9ydCB7Um9vdENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL3Jvb3QuY29tcG9uZW50J1xuaW1wb3J0IHtTZWN0aW9uQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvc2VjdGlvbi5jb21wb25lbnQnXG5pbXBvcnQge1NlbGVjdENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL3NlbGVjdC5jb21wb25lbnQnXG5pbXBvcnQge1NlbGVjdEZyYW1ld29ya0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL3NlbGVjdC1mcmFtZXdvcmsuY29tcG9uZW50J1xuaW1wb3J0IHtTZWxlY3RXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9zZWxlY3Qtd2lkZ2V0LmNvbXBvbmVudCdcbmltcG9ydCB7U3VibWl0Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvc3VibWl0LmNvbXBvbmVudCdcbmltcG9ydCB7VGFiQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvdGFiLmNvbXBvbmVudCdcbmltcG9ydCB7VGFic0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL3RhYnMuY29tcG9uZW50J1xuaW1wb3J0IHtUZW1wbGF0ZUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL3RlbXBsYXRlLmNvbXBvbmVudCdcbmltcG9ydCB7VGV4dGFyZWFDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy90ZXh0YXJlYS5jb21wb25lbnQnXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQWRkUmVmZXJlbmNlQ29tcG9uZW50LFxuICAgIE9uZU9mQ29tcG9uZW50LFxuICAgIEJ1dHRvbkNvbXBvbmVudCxcbiAgICBDaGVja2JveENvbXBvbmVudCxcbiAgICBDaGVja2JveGVzQ29tcG9uZW50LFxuICAgIEZpbGVDb21wb25lbnQsXG4gICAgSGlkZGVuQ29tcG9uZW50LFxuICAgIElucHV0Q29tcG9uZW50LFxuICAgIE1lc3NhZ2VDb21wb25lbnQsXG4gICAgTm9uZUNvbXBvbmVudCxcbiAgICBOdW1iZXJDb21wb25lbnQsXG4gICAgUmFkaW9zQ29tcG9uZW50LFxuICAgIFJvb3RDb21wb25lbnQsXG4gICAgU2VjdGlvbkNvbXBvbmVudCxcbiAgICBTZWxlY3RDb21wb25lbnQsXG4gICAgU2VsZWN0RnJhbWV3b3JrQ29tcG9uZW50LFxuICAgIFNlbGVjdFdpZGdldENvbXBvbmVudCxcbiAgICBTdWJtaXRDb21wb25lbnQsXG4gICAgVGFiQ29tcG9uZW50LFxuICAgIFRhYnNDb21wb25lbnQsXG4gICAgVGVtcGxhdGVDb21wb25lbnQsXG4gICAgVGV4dGFyZWFDb21wb25lbnQsXG5cbiAgICBPcmRlcmFibGVEaXJlY3RpdmUsXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIEFkZFJlZmVyZW5jZUNvbXBvbmVudCxcbiAgICBPbmVPZkNvbXBvbmVudCxcbiAgICBCdXR0b25Db21wb25lbnQsXG4gICAgQ2hlY2tib3hDb21wb25lbnQsXG4gICAgQ2hlY2tib3hlc0NvbXBvbmVudCxcbiAgICBGaWxlQ29tcG9uZW50LFxuICAgIEhpZGRlbkNvbXBvbmVudCxcbiAgICBJbnB1dENvbXBvbmVudCxcbiAgICBNZXNzYWdlQ29tcG9uZW50LFxuICAgIE5vbmVDb21wb25lbnQsXG4gICAgTnVtYmVyQ29tcG9uZW50LFxuICAgIFJhZGlvc0NvbXBvbmVudCxcbiAgICBSb290Q29tcG9uZW50LFxuICAgIFNlY3Rpb25Db21wb25lbnQsXG4gICAgU2VsZWN0Q29tcG9uZW50LFxuICAgIFNlbGVjdEZyYW1ld29ya0NvbXBvbmVudCxcbiAgICBTZWxlY3RXaWRnZXRDb21wb25lbnQsXG4gICAgU3VibWl0Q29tcG9uZW50LFxuICAgIFRhYkNvbXBvbmVudCxcbiAgICBUYWJzQ29tcG9uZW50LFxuICAgIFRlbXBsYXRlQ29tcG9uZW50LFxuICAgIFRleHRhcmVhQ29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQWRkUmVmZXJlbmNlQ29tcG9uZW50LFxuICAgIE9uZU9mQ29tcG9uZW50LFxuICAgIEJ1dHRvbkNvbXBvbmVudCxcbiAgICBDaGVja2JveENvbXBvbmVudCxcbiAgICBDaGVja2JveGVzQ29tcG9uZW50LFxuICAgIEZpbGVDb21wb25lbnQsXG4gICAgSGlkZGVuQ29tcG9uZW50LFxuICAgIElucHV0Q29tcG9uZW50LFxuICAgIE1lc3NhZ2VDb21wb25lbnQsXG4gICAgTm9uZUNvbXBvbmVudCxcbiAgICBOdW1iZXJDb21wb25lbnQsXG4gICAgUmFkaW9zQ29tcG9uZW50LFxuICAgIFJvb3RDb21wb25lbnQsXG4gICAgU2VjdGlvbkNvbXBvbmVudCxcbiAgICBTZWxlY3RDb21wb25lbnQsXG4gICAgU2VsZWN0RnJhbWV3b3JrQ29tcG9uZW50LFxuICAgIFNlbGVjdFdpZGdldENvbXBvbmVudCxcbiAgICBTdWJtaXRDb21wb25lbnQsXG4gICAgVGFiQ29tcG9uZW50LFxuICAgIFRhYnNDb21wb25lbnQsXG4gICAgVGVtcGxhdGVDb21wb25lbnQsXG4gICAgVGV4dGFyZWFDb21wb25lbnQsXG5cbiAgICBPcmRlcmFibGVEaXJlY3RpdmUsXG4gIF0sXG4gIHByb3ZpZGVyczogW0pzb25TY2hlbWFGb3JtU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIFdpZGdldExpYnJhcnlNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFdpZGdldExpYnJhcnlNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFdpZGdldExpYnJhcnlNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtKc29uU2NoZW1hRm9ybVNlcnZpY2VdLFxuICAgIH1cbiAgfVxufVxuIl19