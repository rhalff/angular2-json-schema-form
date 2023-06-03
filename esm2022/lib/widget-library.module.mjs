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
import * as i0 from "@angular/core";
class WidgetLibraryModule {
    static forRoot() {
        return {
            ngModule: WidgetLibraryModule,
            providers: [JsonSchemaFormService],
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: WidgetLibraryModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.3", ngImport: i0, type: WidgetLibraryModule, declarations: [AddReferenceComponent,
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
            OrderableDirective], imports: [CommonModule, FormsModule, ReactiveFormsModule], exports: [AddReferenceComponent,
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
            OrderableDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: WidgetLibraryModule, providers: [JsonSchemaFormService], imports: [CommonModule, FormsModule, ReactiveFormsModule] });
}
export { WidgetLibraryModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: WidgetLibraryModule, decorators: [{
            type: NgModule,
            args: [{
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
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWxpYnJhcnkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmdzZi13aWRnZXQtbGlicmFyeS9zcmMvbGliL3dpZGdldC1saWJyYXJ5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXNCLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUE7QUFDNUMsT0FBTyxFQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFBO0FBQy9ELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFBO0FBQ3pFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGtDQUFrQyxDQUFBO0FBRW5FLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFBO0FBQzFFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQTtBQUM3RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQTtBQUNqRSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQTtBQUNyRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNkJBQTZCLENBQUE7QUFDekQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLCtCQUErQixDQUFBO0FBQzdELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQTtBQUMzRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQTtBQUMvRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNkJBQTZCLENBQUE7QUFDekQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLCtCQUErQixDQUFBO0FBQzdELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQTtBQUM1RCxPQUFPLEVB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LGVBQWU7d0JBQ2YsZUFBZTt3QkFDZixhQUFhO3dCQUNiLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZix3QkFBd0I7d0JBQ3hCLHFCQUFxQjt3QkFDckIsZUFBZTt3QkFDZixZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsaUJBQWlCO3dCQUNqQixpQkFBaUI7d0JBRWpCLGtCQUFrQjtxQkFDbkI7b0JBQ0QsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7aUJBQ25DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nXG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3JtcydcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2VzL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSdcbmltcG9ydCB7T3JkZXJhYmxlRGlyZWN0aXZlfSBmcm9tICcuL2RpcmVjdGl2ZXMvb3JkZXJhYmxlLmRpcmVjdGl2ZSdcblxuaW1wb3J0IHtBZGRSZWZlcmVuY2VDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9hZGQtcmVmZXJlbmNlLmNvbXBvbmVudCdcbmltcG9ydCB7QnV0dG9uQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvYnV0dG9uLmNvbXBvbmVudCdcbmltcG9ydCB7Q2hlY2tib3hDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9jaGVja2JveC5jb21wb25lbnQnXG5pbXBvcnQge0NoZWNrYm94ZXNDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9jaGVja2JveGVzLmNvbXBvbmVudCdcbmltcG9ydCB7RmlsZUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2ZpbGUuY29tcG9uZW50J1xuaW1wb3J0IHtIaWRkZW5Db21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9oaWRkZW4uY29tcG9uZW50J1xuaW1wb3J0IHtJbnB1dENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2lucHV0LmNvbXBvbmVudCdcbmltcG9ydCB7TWVzc2FnZUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21lc3NhZ2UuY29tcG9uZW50J1xuaW1wb3J0IHtOb25lQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbm9uZS5jb21wb25lbnQnXG5pbXBvcnQge051bWJlckNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL251bWJlci5jb21wb25lbnQnXG5pbXBvcnQge09uZU9mQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvb25lLW9mLmNvbXBvbmVudCdcbmltcG9ydCB7UmFkaW9zQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvcmFkaW9zLmNvbXBvbmVudCdcbmltcG9ydCB7Um9vdENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL3Jvb3QuY29tcG9uZW50J1xuaW1wb3J0IHtTZWN0aW9uQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvc2VjdGlvbi5jb21wb25lbnQnXG5pbXBvcnQge1NlbGVjdENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL3NlbGVjdC5jb21wb25lbnQnXG5pbXBvcnQge1NlbGVjdEZyYW1ld29ya0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL3NlbGVjdC1mcmFtZXdvcmsuY29tcG9uZW50J1xuaW1wb3J0IHtTZWxlY3RXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9zZWxlY3Qtd2lkZ2V0LmNvbXBvbmVudCdcbmltcG9ydCB7U3VibWl0Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvc3VibWl0LmNvbXBvbmVudCdcbmltcG9ydCB7VGFiQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvdGFiLmNvbXBvbmVudCdcbmltcG9ydCB7VGFic0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL3RhYnMuY29tcG9uZW50J1xuaW1wb3J0IHtUZW1wbGF0ZUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL3RlbXBsYXRlLmNvbXBvbmVudCdcbmltcG9ydCB7VGV4dGFyZWFDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy90ZXh0YXJlYS5jb21wb25lbnQnXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQWRkUmVmZXJlbmNlQ29tcG9uZW50LFxuICAgIE9uZU9mQ29tcG9uZW50LFxuICAgIEJ1dHRvbkNvbXBvbmVudCxcbiAgICBDaGVja2JveENvbXBvbmVudCxcbiAgICBDaGVja2JveGVzQ29tcG9uZW50LFxuICAgIEZpbGVDb21wb25lbnQsXG4gICAgSGlkZGVuQ29tcG9uZW50LFxuICAgIElucHV0Q29tcG9uZW50LFxuICAgIE1lc3NhZ2VDb21wb25lbnQsXG4gICAgTm9uZUNvbXBvbmVudCxcbiAgICBOdW1iZXJDb21wb25lbnQsXG4gICAgUmFkaW9zQ29tcG9uZW50LFxuICAgIFJvb3RDb21wb25lbnQsXG4gICAgU2VjdGlvbkNvbXBvbmVudCxcbiAgICBTZWxlY3RDb21wb25lbnQsXG4gICAgU2VsZWN0RnJhbWV3b3JrQ29tcG9uZW50LFxuICAgIFNlbGVjdFdpZGdldENvbXBvbmVudCxcbiAgICBTdWJtaXRDb21wb25lbnQsXG4gICAgVGFiQ29tcG9uZW50LFxuICAgIFRhYnNDb21wb25lbnQsXG4gICAgVGVtcGxhdGVDb21wb25lbnQsXG4gICAgVGV4dGFyZWFDb21wb25lbnQsXG5cbiAgICBPcmRlcmFibGVEaXJlY3RpdmUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBBZGRSZWZlcmVuY2VDb21wb25lbnQsXG4gICAgT25lT2ZDb21wb25lbnQsXG4gICAgQnV0dG9uQ29tcG9uZW50LFxuICAgIENoZWNrYm94Q29tcG9uZW50LFxuICAgIENoZWNrYm94ZXNDb21wb25lbnQsXG4gICAgRmlsZUNvbXBvbmVudCxcbiAgICBIaWRkZW5Db21wb25lbnQsXG4gICAgSW5wdXRDb21wb25lbnQsXG4gICAgTWVzc2FnZUNvbXBvbmVudCxcbiAgICBOb25lQ29tcG9uZW50LFxuICAgIE51bWJlckNvbXBvbmVudCxcbiAgICBSYWRpb3NDb21wb25lbnQsXG4gICAgUm9vdENvbXBvbmVudCxcbiAgICBTZWN0aW9uQ29tcG9uZW50LFxuICAgIFNlbGVjdENvbXBvbmVudCxcbiAgICBTZWxlY3RGcmFtZXdvcmtDb21wb25lbnQsXG4gICAgU2VsZWN0V2lkZ2V0Q29tcG9uZW50LFxuICAgIFN1Ym1pdENvbXBvbmVudCxcbiAgICBUYWJDb21wb25lbnQsXG4gICAgVGFic0NvbXBvbmVudCxcbiAgICBUZW1wbGF0ZUNvbXBvbmVudCxcbiAgICBUZXh0YXJlYUNvbXBvbmVudCxcblxuICAgIE9yZGVyYWJsZURpcmVjdGl2ZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbSnNvblNjaGVtYUZvcm1TZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgV2lkZ2V0TGlicmFyeU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8V2lkZ2V0TGlicmFyeU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogV2lkZ2V0TGlicmFyeU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW0pzb25TY2hlbWFGb3JtU2VydmljZV0sXG4gICAgfVxuICB9XG59XG4iXX0=