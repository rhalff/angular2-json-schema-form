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
    static ɵfac = function WidgetLibraryModule_Factory(t) { return new (t || WidgetLibraryModule)(); };
    static ɵmod = i0.ɵɵdefineNgModule({ type: WidgetLibraryModule });
    static ɵinj = i0.ɵɵdefineInjector({ providers: [JsonSchemaFormService], imports: [CommonModule, FormsModule, ReactiveFormsModule] });
}
export { WidgetLibraryModule };
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WidgetLibraryModule, [{
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
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(WidgetLibraryModule, { declarations: [AddReferenceComponent,
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
        OrderableDirective] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWxpYnJhcnkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmdzZi13aWRnZXQtbGlicmFyeS9zcmMvbGliL3dpZGdldC1saWJyYXJ5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXNCLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUE7QUFDNUMsT0FBTyxFQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFBO0FBQy9ELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFBO0FBQ3pFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGtDQUFrQyxDQUFBO0FBRW5FLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFBO0FBQzFFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQTtBQUM3RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQTtBQUNqRSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQTtBQUNyRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNkJBQTZCLENBQUE7QUFDekQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLCtCQUErQixDQUFBO0FBQzdELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQTtBQUMzRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQTtBQUMvRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNkJBQTZCLENBQUE7QUFDekQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLCtCQUErQixDQUFBO0FBQzdELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQTtBQUM1RCxPQUFPLEVB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UUFDbkIsYUFBYTtRQUNiLGVBQWU7UUFDZixjQUFjO1FBQ2QsZ0JBQWdCO1FBQ2hCLGFBQWE7UUFDYixlQUFlO1FBQ2YsZUFBZTtRQUNmLGFBQWE7UUFDYixnQkFBZ0I7UUFDaEIsZUFBZTtRQUNmLHdCQUF3QjtRQUN4QixxQkFBcUI7UUFDckIsZUFBZTtRQUNmLFlBQVk7UUFDWixhQUFhO1FBQ2IsaUJBQWlCO1FBQ2pCLGlCQUFpQjtRQUVqQixrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbidcbmltcG9ydCB7Rm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJ1xuaW1wb3J0IHtKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJy4vc2VydmljZXMvanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJ1xuaW1wb3J0IHtPcmRlcmFibGVEaXJlY3RpdmV9IGZyb20gJy4vZGlyZWN0aXZlcy9vcmRlcmFibGUuZGlyZWN0aXZlJ1xuXG5pbXBvcnQge0FkZFJlZmVyZW5jZUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2FkZC1yZWZlcmVuY2UuY29tcG9uZW50J1xuaW1wb3J0IHtCdXR0b25Db21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9idXR0b24uY29tcG9uZW50J1xuaW1wb3J0IHtDaGVja2JveENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2NoZWNrYm94LmNvbXBvbmVudCdcbmltcG9ydCB7Q2hlY2tib3hlc0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2NoZWNrYm94ZXMuY29tcG9uZW50J1xuaW1wb3J0IHtGaWxlQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvZmlsZS5jb21wb25lbnQnXG5pbXBvcnQge0hpZGRlbkNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2hpZGRlbi5jb21wb25lbnQnXG5pbXBvcnQge0lucHV0Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvaW5wdXQuY29tcG9uZW50J1xuaW1wb3J0IHtNZXNzYWdlQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWVzc2FnZS5jb21wb25lbnQnXG5pbXBvcnQge05vbmVDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9ub25lLmNvbXBvbmVudCdcbmltcG9ydCB7TnVtYmVyQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbnVtYmVyLmNvbXBvbmVudCdcbmltcG9ydCB7T25lT2ZDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9vbmUtb2YuY29tcG9uZW50J1xuaW1wb3J0IHtSYWRpb3NDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9yYWRpb3MuY29tcG9uZW50J1xuaW1wb3J0IHtSb290Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvcm9vdC5jb21wb25lbnQnXG5pbXBvcnQge1NlY3Rpb25Db21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9zZWN0aW9uLmNvbXBvbmVudCdcbmltcG9ydCB7U2VsZWN0Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvc2VsZWN0LmNvbXBvbmVudCdcbmltcG9ydCB7U2VsZWN0RnJhbWV3b3JrQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvc2VsZWN0LWZyYW1ld29yay5jb21wb25lbnQnXG5pbXBvcnQge1NlbGVjdFdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL3NlbGVjdC13aWRnZXQuY29tcG9uZW50J1xuaW1wb3J0IHtTdWJtaXRDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9zdWJtaXQuY29tcG9uZW50J1xuaW1wb3J0IHtUYWJDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy90YWIuY29tcG9uZW50J1xuaW1wb3J0IHtUYWJzQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvdGFicy5jb21wb25lbnQnXG5pbXBvcnQge1RlbXBsYXRlQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvdGVtcGxhdGUuY29tcG9uZW50J1xuaW1wb3J0IHtUZXh0YXJlYUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL3RleHRhcmVhLmNvbXBvbmVudCdcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBZGRSZWZlcmVuY2VDb21wb25lbnQsXG4gICAgT25lT2ZDb21wb25lbnQsXG4gICAgQnV0dG9uQ29tcG9uZW50LFxuICAgIENoZWNrYm94Q29tcG9uZW50LFxuICAgIENoZWNrYm94ZXNDb21wb25lbnQsXG4gICAgRmlsZUNvbXBvbmVudCxcbiAgICBIaWRkZW5Db21wb25lbnQsXG4gICAgSW5wdXRDb21wb25lbnQsXG4gICAgTWVzc2FnZUNvbXBvbmVudCxcbiAgICBOb25lQ29tcG9uZW50LFxuICAgIE51bWJlckNvbXBvbmVudCxcbiAgICBSYWRpb3NDb21wb25lbnQsXG4gICAgUm9vdENvbXBvbmVudCxcbiAgICBTZWN0aW9uQ29tcG9uZW50LFxuICAgIFNlbGVjdENvbXBvbmVudCxcbiAgICBTZWxlY3RGcmFtZXdvcmtDb21wb25lbnQsXG4gICAgU2VsZWN0V2lkZ2V0Q29tcG9uZW50LFxuICAgIFN1Ym1pdENvbXBvbmVudCxcbiAgICBUYWJDb21wb25lbnQsXG4gICAgVGFic0NvbXBvbmVudCxcbiAgICBUZW1wbGF0ZUNvbXBvbmVudCxcbiAgICBUZXh0YXJlYUNvbXBvbmVudCxcblxuICAgIE9yZGVyYWJsZURpcmVjdGl2ZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEFkZFJlZmVyZW5jZUNvbXBvbmVudCxcbiAgICBPbmVPZkNvbXBvbmVudCxcbiAgICBCdXR0b25Db21wb25lbnQsXG4gICAgQ2hlY2tib3hDb21wb25lbnQsXG4gICAgQ2hlY2tib3hlc0NvbXBvbmVudCxcbiAgICBGaWxlQ29tcG9uZW50LFxuICAgIEhpZGRlbkNvbXBvbmVudCxcbiAgICBJbnB1dENvbXBvbmVudCxcbiAgICBNZXNzYWdlQ29tcG9uZW50LFxuICAgIE5vbmVDb21wb25lbnQsXG4gICAgTnVtYmVyQ29tcG9uZW50LFxuICAgIFJhZGlvc0NvbXBvbmVudCxcbiAgICBSb290Q29tcG9uZW50LFxuICAgIFNlY3Rpb25Db21wb25lbnQsXG4gICAgU2VsZWN0Q29tcG9uZW50LFxuICAgIFNlbGVjdEZyYW1ld29ya0NvbXBvbmVudCxcbiAgICBTZWxlY3RXaWRnZXRDb21wb25lbnQsXG4gICAgU3VibWl0Q29tcG9uZW50LFxuICAgIFRhYkNvbXBvbmVudCxcbiAgICBUYWJzQ29tcG9uZW50LFxuICAgIFRlbXBsYXRlQ29tcG9uZW50LFxuICAgIFRleHRhcmVhQ29tcG9uZW50LFxuXG4gICAgT3JkZXJhYmxlRGlyZWN0aXZlLFxuICBdLFxuICBwcm92aWRlcnM6IFtKc29uU2NoZW1hRm9ybVNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBXaWRnZXRMaWJyYXJ5TW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxXaWRnZXRMaWJyYXJ5TW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBXaWRnZXRMaWJyYXJ5TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbSnNvblNjaGVtYUZvcm1TZXJ2aWNlXSxcbiAgICB9XG4gIH1cbn1cbiJdfQ==