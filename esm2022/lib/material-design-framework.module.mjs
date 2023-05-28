import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetLibraryModule } from '@ngsf/widget-library';
import { Framework } from '@ngsf/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { FlexLayoutRootComponent } from './components/flex-layout-root.component';
import { FlexLayoutSectionComponent } from './components/flex-layout-section.component';
import { MaterialAddReferenceComponent } from './components/material-add-reference.component';
import { MaterialButtonComponent } from './components/material-button.component';
import { MaterialButtonGroupComponent } from './components/material-button-group.component';
import { MaterialCheckboxComponent } from './components/material-checkbox.component';
import { MaterialCheckboxesComponent } from './components/material-checkboxes.component';
import { MaterialChipListComponent } from './components/material-chip-list.component';
import { MaterialDatepickerComponent } from './components/material-datepicker.component';
import { MaterialFileComponent } from './components/material-file.component';
import { MaterialInputComponent } from './components/material-input.component';
import { MaterialNumberComponent } from './components/material-number.component';
import { MaterialOneOfComponent } from './components/material-one-of.component';
import { MaterialRadiosComponent } from './components/material-radios.component';
import { MaterialSelectComponent } from './components/material-select.component';
import { MaterialSliderComponent } from './components/material-slider.component';
import { MaterialStepperComponent } from './components/material-stepper.component';
import { MaterialTabsComponent } from './components/material-tabs.component';
import { MaterialTextareaComponent } from './components/material-textarea.component';
import { MaterialDesignFrameworkComponent } from './components/material-design-framework.component';
import { MaterialDesignFramework } from './material-design.framework';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as i0 from "@angular/core";
class MaterialDesignFrameworkModule {
    static forRoot() {
        return {
            ngModule: MaterialDesignFrameworkModule,
            providers: [
                {
                    provide: Framework,
                    useClass: MaterialDesignFramework,
                    multi: true,
                },
            ],
        };
    }
    static ɵfac = function MaterialDesignFrameworkModule_Factory(t) { return new (t || MaterialDesignFrameworkModule)(); };
    static ɵmod = i0.ɵɵdefineNgModule({ type: MaterialDesignFrameworkModule });
    static ɵinj = i0.ɵɵdefineInjector({ imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            FlexLayoutModule,
            MatAutocompleteModule,
            MatButtonModule,
            MatButtonToggleModule,
            MatCardModule,
            MatCheckboxModule,
            MatChipsModule,
            MatDatepickerModule,
            MatExpansionModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatNativeDateModule,
            MatRadioModule,
            MatSelectModule,
            MatSliderModule,
            MatSlideToggleModule,
            MatStepperModule,
            MatTabsModule,
            MatTooltipModule,
            WidgetLibraryModule] });
}
export { MaterialDesignFrameworkModule };
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialDesignFrameworkModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    FlexLayoutModule,
                    MatAutocompleteModule,
                    MatButtonModule,
                    MatButtonToggleModule,
                    MatCardModule,
                    MatCheckboxModule,
                    MatChipsModule,
                    MatDatepickerModule,
                    MatExpansionModule,
                    MatFormFieldModule,
                    MatIconModule,
                    MatInputModule,
                    MatNativeDateModule,
                    MatRadioModule,
                    MatSelectModule,
                    MatSliderModule,
                    MatSlideToggleModule,
                    MatStepperModule,
                    MatTabsModule,
                    MatTooltipModule,
                    WidgetLibraryModule,
                ],
                declarations: [
                    FlexLayoutRootComponent,
                    FlexLayoutSectionComponent,
                    MaterialAddReferenceComponent,
                    MaterialOneOfComponent,
                    MaterialButtonComponent,
                    MaterialButtonGroupComponent,
                    MaterialCheckboxComponent,
                    MaterialCheckboxesComponent,
                    MaterialChipListComponent,
                    MaterialDatepickerComponent,
                    MaterialFileComponent,
                    MaterialInputComponent,
                    MaterialNumberComponent,
                    MaterialRadiosComponent,
                    MaterialSelectComponent,
                    MaterialSliderComponent,
                    MaterialStepperComponent,
                    MaterialTabsComponent,
                    MaterialTextareaComponent,
                    MaterialDesignFrameworkComponent,
                ],
                exports: [
                    FlexLayoutRootComponent,
                    FlexLayoutSectionComponent,
                    MaterialAddReferenceComponent,
                    MaterialOneOfComponent,
                    MaterialButtonComponent,
                    MaterialButtonGroupComponent,
                    MaterialCheckboxComponent,
                    MaterialCheckboxesComponent,
                    MaterialChipListComponent,
                    MaterialDatepickerComponent,
                    MaterialFileComponent,
                    MaterialInputComponent,
                    MaterialNumberComponent,
                    MaterialRadiosComponent,
                    MaterialSelectComponent,
                    MaterialSliderComponent,
                    MaterialStepperComponent,
                    MaterialTabsComponent,
                    MaterialTextareaComponent,
                    MaterialDesignFrameworkComponent,
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(MaterialDesignFrameworkModule, { declarations: [FlexLayoutRootComponent,
        FlexLayoutSectionComponent,
        MaterialAddReferenceComponent,
        MaterialOneOfComponent,
        MaterialButtonComponent,
        MaterialButtonGroupComponent,
        MaterialCheckboxComponent,
        MaterialCheckboxesComponent,
        MaterialChipListComponent,
        MaterialDatepickerComponent,
        MaterialFileComponent,
        MaterialInputComponent,
        MaterialNumberComponent,
        MaterialRadiosComponent,
        MaterialSelectComponent,
        MaterialSliderComponent,
        MaterialStepperComponent,
        MaterialTabsComponent,
        MaterialTextareaComponent,
        MaterialDesignFrameworkComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatStepperModule,
        MatTabsModule,
        MatTooltipModule,
        WidgetLibraryModule], exports: [FlexLayoutRootComponent,
        FlexLayoutSectionComponent,
        MaterialAddReferenceComponent,
        MaterialOneOfComponent,
        MaterialButtonComponent,
        MaterialButtonGroupComponent,
        MaterialCheckboxComponent,
        MaterialCheckboxesComponent,
        MaterialChipListComponent,
        MaterialDatepickerComponent,
        MaterialFileComponent,
        MaterialInputComponent,
        MaterialNumberComponent,
        MaterialRadiosComponent,
        MaterialSelectComponent,
        MaterialSliderComponent,
        MaterialStepperComponent,
        MaterialTabsComponent,
        MaterialTextareaComponent,
        MaterialDesignFrameworkComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLW1hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsvc3JjL2xpYi9tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUMsUUFBUSxFQUFzQixNQUFNLGVBQWUsQ0FBQTtBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUE7QUFDNUMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7QUFDeEQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUN0QyxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUE7QUFDL0QsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sdUJBQXVCLENBQUE7QUFDdEQsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0seUNBQXlDLENBQUE7QUFDL0UsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sNENBQTRDLENBQUE7QUFDckYsT0FBTyxFQUFDLDZCQUE2QixFQUFDLE1BQU0sK0NBQStDLENBQUE7QUFDM0YsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sd0NBQXdDLENBQUE7QUFDOUUsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0sOENBQThDLENBQUE7QUFDekYsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sMENBQTBDLENBQUE7QUFDbEYsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sNENBQTRDLENBQUE7QUFDdEYsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sMkNBQTJDLENBQUE7QUFDbkYsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sNENBQTRDLENBQUE7QUFDdEYsT0FBTyxFQUFD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dUJBQXVCO1FBQ3ZCLHdCQUF3QjtRQUN4QixxQkFBcUI7UUFDckIseUJBQXlCO1FBQ3pCLGdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJ1xuaW1wb3J0IHtXaWRnZXRMaWJyYXJ5TW9kdWxlfSBmcm9tICdAbmdzZi93aWRnZXQtbGlicmFyeSdcbmltcG9ydCB7RnJhbWV3b3JrfSBmcm9tICdAbmdzZi9jb21tb24nXG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3JtcydcbmltcG9ydCB7RmxleExheW91dE1vZHVsZX0gZnJvbSAnQG5nYnJhY2tldC9uZ3gtbGF5b3V0J1xuaW1wb3J0IHtGbGV4TGF5b3V0Um9vdENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2ZsZXgtbGF5b3V0LXJvb3QuY29tcG9uZW50J1xuaW1wb3J0IHtGbGV4TGF5b3V0U2VjdGlvbkNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2ZsZXgtbGF5b3V0LXNlY3Rpb24uY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbEFkZFJlZmVyZW5jZUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLWFkZC1yZWZlcmVuY2UuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbEJ1dHRvbkNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLWJ1dHRvbi5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsQnV0dG9uR3JvdXBDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1idXR0b24tZ3JvdXAuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbENoZWNrYm94Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtY2hlY2tib3guY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbENoZWNrYm94ZXNDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1jaGVja2JveGVzLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxDaGlwTGlzdENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLWNoaXAtbGlzdC5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsRGF0ZXBpY2tlckNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLWRhdGVwaWNrZXIuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbEZpbGVDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1maWxlLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxJbnB1dENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLWlucHV0LmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxOdW1iZXJDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1udW1iZXIuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbE9uZU9mQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtb25lLW9mLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxSYWRpb3NDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1yYWRpb3MuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbFNlbGVjdENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLXNlbGVjdC5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsU2xpZGVyQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtc2xpZGVyLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxTdGVwcGVyQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtc3RlcHBlci5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsVGFic0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLXRhYnMuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbFRleHRhcmVhQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtdGV4dGFyZWEuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbERlc2lnbkZyYW1ld29ya0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsuY29tcG9uZW50J1xuXG5pbXBvcnQge01hdGVyaWFsRGVzaWduRnJhbWV3b3JrfSBmcm9tICcuL21hdGVyaWFsLWRlc2lnbi5mcmFtZXdvcmsnXG5cbmltcG9ydCB7TWF0QXV0b2NvbXBsZXRlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9hdXRvY29tcGxldGUnXG5pbXBvcnQge01hdEJ1dHRvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJ1xuaW1wb3J0IHtNYXRCdXR0b25Ub2dnbGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbi10b2dnbGUnXG5pbXBvcnQge01hdENhcmRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NhcmQnXG5pbXBvcnQge01hdENoZWNrYm94TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGVja2JveCdcbmltcG9ydCB7TWF0Q2hpcHNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoaXBzJ1xuaW1wb3J0IHtNYXREYXRlcGlja2VyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kYXRlcGlja2VyJ1xuaW1wb3J0IHtNYXRFeHBhbnNpb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2V4cGFuc2lvbidcbmltcG9ydCB7TWF0Rm9ybUZpZWxkTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJ1xuaW1wb3J0IHtNYXRJY29uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJ1xuaW1wb3J0IHtNYXRJbnB1dE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnXG5pbXBvcnQge01hdE5hdGl2ZURhdGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnXG5pbXBvcnQge01hdFJhZGlvTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9yYWRpbydcbmltcG9ydCB7TWF0U2VsZWN0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QnXG5pbXBvcnQge01hdFNsaWRlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGVyJ1xuaW1wb3J0IHtNYXRTbGlkZVRvZ2dsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGUtdG9nZ2xlJ1xuaW1wb3J0IHtNYXRTdGVwcGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zdGVwcGVyJ1xuaW1wb3J0IHtNYXRUYWJzTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJzJ1xuaW1wb3J0IHtNYXRUb29sdGlwTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJ1xuXG4vKipcbiAqIHVudXNlZCBAYW5ndWxhci9tYXRlcmlhbCBtb2R1bGVzOlxuICogTWF0RGlhbG9nTW9kdWxlLCBNYXRHcmlkTGlzdE1vZHVsZSwgTWF0TGlzdE1vZHVsZSwgTWF0TWVudU1vZHVsZSxcbiAqIE1hdFBhZ2luYXRvck1vZHVsZSwgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAqIE1hdFNpZGVuYXZNb2R1bGUsIE1hdFNuYWNrQmFyTW9kdWxlLCBNYXRTb3J0TW9kdWxlLCBNYXRUYWJsZU1vZHVsZSxcbiAqIE1hdFRvb2xiYXJNb2R1bGUsXG4gKi9cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG5cbiAgICAvLyBBTkdVTEFSX01BVEVSSUFMX01PRFVMRVNcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxuICAgIE1hdENoaXBzTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgTWF0UmFkaW9Nb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFNsaWRlck1vZHVsZSxcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgICBNYXRTdGVwcGVyTW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcblxuICAgIFdpZGdldExpYnJhcnlNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIC8vIE1BVEVSSUFMX0ZSQU1FV09SS19DT01QT05FTlRTXG4gICAgRmxleExheW91dFJvb3RDb21wb25lbnQsXG4gICAgRmxleExheW91dFNlY3Rpb25Db21wb25lbnQsXG4gICAgTWF0ZXJpYWxBZGRSZWZlcmVuY2VDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxPbmVPZkNvbXBvbmVudCxcbiAgICBNYXRlcmlhbEJ1dHRvbkNvbXBvbmVudCxcbiAgICBNYXRlcmlhbEJ1dHRvbkdyb3VwQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsQ2hlY2tib3hDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxDaGVja2JveGVzQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsQ2hpcExpc3RDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxEYXRlcGlja2VyQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsRmlsZUNvbXBvbmVudCxcbiAgICBNYXRlcmlhbElucHV0Q29tcG9uZW50LFxuICAgIE1hdGVyaWFsTnVtYmVyQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsUmFkaW9zQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsU2VsZWN0Q29tcG9uZW50LFxuICAgIE1hdGVyaWFsU2xpZGVyQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsU3RlcHBlckNvbXBvbmVudCxcbiAgICBNYXRlcmlhbFRhYnNDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxUZXh0YXJlYUNvbXBvbmVudCxcbiAgICBNYXRlcmlhbERlc2lnbkZyYW1ld29ya0NvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIC8vIE1BVEVSSUFMX0ZSQU1FV09SS19DT01QT05FTlRTXG4gICAgRmxleExheW91dFJvb3RDb21wb25lbnQsXG4gICAgRmxleExheW91dFNlY3Rpb25Db21wb25lbnQsXG4gICAgTWF0ZXJpYWxBZGRSZWZlcmVuY2VDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxPbmVPZkNvbXBvbmVudCxcbiAgICBNYXRlcmlhbEJ1dHRvbkNvbXBvbmVudCxcbiAgICBNYXRlcmlhbEJ1dHRvbkdyb3VwQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsQ2hlY2tib3hDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxDaGVja2JveGVzQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsQ2hpcExpc3RDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxEYXRlcGlja2VyQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsRmlsZUNvbXBvbmVudCxcbiAgICBNYXRlcmlhbElucHV0Q29tcG9uZW50LFxuICAgIE1hdGVyaWFsTnVtYmVyQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsUmFkaW9zQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsU2VsZWN0Q29tcG9uZW50LFxuICAgIE1hdGVyaWFsU2xpZGVyQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsU3RlcHBlckNvbXBvbmVudCxcbiAgICBNYXRlcmlhbFRhYnNDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxUZXh0YXJlYUNvbXBvbmVudCxcbiAgICBNYXRlcmlhbERlc2lnbkZyYW1ld29ya0NvbXBvbmVudCxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbERlc2lnbkZyYW1ld29ya01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8TWF0ZXJpYWxEZXNpZ25GcmFtZXdvcmtNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE1hdGVyaWFsRGVzaWduRnJhbWV3b3JrTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBGcmFtZXdvcmssXG4gICAgICAgICAgdXNlQ2xhc3M6IE1hdGVyaWFsRGVzaWduRnJhbWV3b3JrLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9XG4gIH1cbn1cbiJdfQ==