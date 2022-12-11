import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetLibraryModule } from '@ngsf/widget-library';
import { Framework } from '@ngsf/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
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
export class MaterialDesignFrameworkModule {
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
}
MaterialDesignFrameworkModule.ɵfac = function MaterialDesignFrameworkModule_Factory(t) { return new (t || MaterialDesignFrameworkModule)(); };
MaterialDesignFrameworkModule.ɵmod = i0.ɵɵdefineNgModule({ type: MaterialDesignFrameworkModule });
MaterialDesignFrameworkModule.ɵinj = i0.ɵɵdefineInjector({ imports: [CommonModule,
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
                ],
                entryComponents: [
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLW1hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsvc3JjL2xpYi9tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFzQixNQUFNLGVBQWUsQ0FBQTtBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUE7QUFDNUMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7QUFDeEQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUN0QyxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUE7QUFDL0QsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7QUFDckQsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0seUNBQXlDLENBQUE7QUFDL0UsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sNENBQTRDLENBQUE7QUFDckYsT0FBTyxFQUFDLDZCQUE2QixFQUFDLE1BQU0sK0NBQStDLENBQUE7QUFDM0YsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sd0NBQXdDLENBQUE7QUFDOUUsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0sOENBQThDLENBQUE7QUFDekYsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sMENBQTBDLENBQUE7QUFDbEYsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sNENBQTRDLENBQUE7QUFDdEYsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sMkNBQTJDLENBQUE7QUFDbkYsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sNENBQTRDLENBQUE7QUFDdEYsT0FBTyxFQUFD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UUFDbkIsY0FBYztRQUNkLGVBQWU7UUFDZixlQUFlO1FBQ2Ysb0JBQW9CO1FBQ3BCLGdCQUFnQjtRQUNoQixhQUFhO1FBQ2IsZ0JBQWdCO1FBRWhCLG1CQUFtQixhQTJCbkIsdUJBQXVCO1FBQ3ZCLDBCQUEwQjtRQUMxQiw2QkFBNkI7UUFDN0Isc0JBQXNCO1FBQ3RCLHVCQUF1QjtRQUN2Qiw0QkFBNEI7UUFDNUIseUJBQXlCO1FBQ3pCLDJCQUEyQjtRQUMzQix5QkFBeUI7UUFDekIsMkJBQTJCO1FBQzNCLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIsdUJBQXVCO1FBQ3ZCLHVCQUF1QjtRQUN2Qix1QkFBdUI7UUFDdkIsdUJBQXVCO1FBQ3ZCLHdCQUF3QjtRQUN4QixxQkFBcUI7UUFDckIseUJBQXlCO1FBQ3pCLGdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJ1xuaW1wb3J0IHtXaWRnZXRMaWJyYXJ5TW9kdWxlfSBmcm9tICdAbmdzZi93aWRnZXQtbGlicmFyeSdcbmltcG9ydCB7RnJhbWV3b3JrfSBmcm9tICdAbmdzZi9jb21tb24nXG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3JtcydcbmltcG9ydCB7RmxleExheW91dE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnXG5pbXBvcnQge0ZsZXhMYXlvdXRSb290Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvZmxleC1sYXlvdXQtcm9vdC5jb21wb25lbnQnXG5pbXBvcnQge0ZsZXhMYXlvdXRTZWN0aW9uQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvZmxleC1sYXlvdXQtc2VjdGlvbi5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsQWRkUmVmZXJlbmNlQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtYWRkLXJlZmVyZW5jZS5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsQnV0dG9uQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtYnV0dG9uLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxCdXR0b25Hcm91cENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLWJ1dHRvbi1ncm91cC5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsQ2hlY2tib3hDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1jaGVja2JveC5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsQ2hlY2tib3hlc0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLWNoZWNrYm94ZXMuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbENoaXBMaXN0Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtY2hpcC1saXN0LmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxEYXRlcGlja2VyQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtZGF0ZXBpY2tlci5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsRmlsZUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLWZpbGUuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbElucHV0Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtaW5wdXQuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbE51bWJlckNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLW51bWJlci5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsT25lT2ZDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1vbmUtb2YuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbFJhZGlvc0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLXJhZGlvcy5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsU2VsZWN0Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtc2VsZWN0LmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxTbGlkZXJDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1zbGlkZXIuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbFN0ZXBwZXJDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1zdGVwcGVyLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxUYWJzQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtdGFicy5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsVGV4dGFyZWFDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC10ZXh0YXJlYS5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsRGVzaWduRnJhbWV3b3JrQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay5jb21wb25lbnQnXG5cbmltcG9ydCB7TWF0ZXJpYWxEZXNpZ25GcmFtZXdvcmt9IGZyb20gJy4vbWF0ZXJpYWwtZGVzaWduLmZyYW1ld29yaydcblxuaW1wb3J0IHtNYXRBdXRvY29tcGxldGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2F1dG9jb21wbGV0ZSdcbmltcG9ydCB7TWF0QnV0dG9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nXG5pbXBvcnQge01hdEJ1dHRvblRvZ2dsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uLXRvZ2dsZSdcbmltcG9ydCB7TWF0Q2FyZE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2FyZCdcbmltcG9ydCB7TWF0Q2hlY2tib3hNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoZWNrYm94J1xuaW1wb3J0IHtNYXRDaGlwc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hpcHMnXG5pbXBvcnQge01hdERhdGVwaWNrZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RhdGVwaWNrZXInXG5pbXBvcnQge01hdEV4cGFuc2lvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZXhwYW5zaW9uJ1xuaW1wb3J0IHtNYXRGb3JtRmllbGRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnXG5pbXBvcnQge01hdEljb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nXG5pbXBvcnQge01hdElucHV0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCdcbmltcG9ydCB7TWF0TmF0aXZlRGF0ZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSdcbmltcG9ydCB7TWF0UmFkaW9Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3JhZGlvJ1xuaW1wb3J0IHtNYXRTZWxlY3RNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NlbGVjdCdcbmltcG9ydCB7TWF0U2xpZGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZXInXG5pbXBvcnQge01hdFNsaWRlVG9nZ2xlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZS10b2dnbGUnXG5pbXBvcnQge01hdFN0ZXBwZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3N0ZXBwZXInXG5pbXBvcnQge01hdFRhYnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYnMnXG5pbXBvcnQge01hdFRvb2x0aXBNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnXG5cbi8qKlxuICogdW51c2VkIEBhbmd1bGFyL21hdGVyaWFsIG1vZHVsZXM6XG4gKiBNYXREaWFsb2dNb2R1bGUsIE1hdEdyaWRMaXN0TW9kdWxlLCBNYXRMaXN0TW9kdWxlLCBNYXRNZW51TW9kdWxlLFxuICogTWF0UGFnaW5hdG9yTW9kdWxlLCBNYXRQcm9ncmVzc0Jhck1vZHVsZSwgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICogTWF0U2lkZW5hdk1vZHVsZSwgTWF0U25hY2tCYXJNb2R1bGUsIE1hdFNvcnRNb2R1bGUsIE1hdFRhYmxlTW9kdWxlLFxuICogTWF0VG9vbGJhck1vZHVsZSxcbiAqL1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcblxuICAgIC8vIEFOR1VMQVJfTUFURVJJQUxfTU9EVUxFU1xuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0Q2hpcHNNb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBNYXRSYWRpb01vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICAgIE1hdFN0ZXBwZXJNb2R1bGUsXG4gICAgTWF0VGFic01vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuXG4gICAgV2lkZ2V0TGlicmFyeU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgLy8gTUFURVJJQUxfRlJBTUVXT1JLX0NPTVBPTkVOVFNcbiAgICBGbGV4TGF5b3V0Um9vdENvbXBvbmVudCxcbiAgICBGbGV4TGF5b3V0U2VjdGlvbkNvbXBvbmVudCxcbiAgICBNYXRlcmlhbEFkZFJlZmVyZW5jZUNvbXBvbmVudCxcbiAgICBNYXRlcmlhbE9uZU9mQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsQnV0dG9uQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsQnV0dG9uR3JvdXBDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxDaGVja2JveENvbXBvbmVudCxcbiAgICBNYXRlcmlhbENoZWNrYm94ZXNDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxDaGlwTGlzdENvbXBvbmVudCxcbiAgICBNYXRlcmlhbERhdGVwaWNrZXJDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxGaWxlQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsSW5wdXRDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxOdW1iZXJDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxSYWRpb3NDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxTZWxlY3RDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxTbGlkZXJDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxTdGVwcGVyQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsVGFic0NvbXBvbmVudCxcbiAgICBNYXRlcmlhbFRleHRhcmVhQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsRGVzaWduRnJhbWV3b3JrQ29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgLy8gTUFURVJJQUxfRlJBTUVXT1JLX0NPTVBPTkVOVFNcbiAgICBGbGV4TGF5b3V0Um9vdENvbXBvbmVudCxcbiAgICBGbGV4TGF5b3V0U2VjdGlvbkNvbXBvbmVudCxcbiAgICBNYXRlcmlhbEFkZFJlZmVyZW5jZUNvbXBvbmVudCxcbiAgICBNYXRlcmlhbE9uZU9mQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsQnV0dG9uQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsQnV0dG9uR3JvdXBDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxDaGVja2JveENvbXBvbmVudCxcbiAgICBNYXRlcmlhbENoZWNrYm94ZXNDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxDaGlwTGlzdENvbXBvbmVudCxcbiAgICBNYXRlcmlhbERhdGVwaWNrZXJDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxGaWxlQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsSW5wdXRDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxOdW1iZXJDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxSYWRpb3NDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxTZWxlY3RDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxTbGlkZXJDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxTdGVwcGVyQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsVGFic0NvbXBvbmVudCxcbiAgICBNYXRlcmlhbFRleHRhcmVhQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsRGVzaWduRnJhbWV3b3JrQ29tcG9uZW50LFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAvLyBNQVRFUklBTF9GUkFNRVdPUktfQ09NUE9ORU5UU1xuICAgIEZsZXhMYXlvdXRSb290Q29tcG9uZW50LFxuICAgIEZsZXhMYXlvdXRTZWN0aW9uQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsQWRkUmVmZXJlbmNlQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsT25lT2ZDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxCdXR0b25Db21wb25lbnQsXG4gICAgTWF0ZXJpYWxCdXR0b25Hcm91cENvbXBvbmVudCxcbiAgICBNYXRlcmlhbENoZWNrYm94Q29tcG9uZW50LFxuICAgIE1hdGVyaWFsQ2hlY2tib3hlc0NvbXBvbmVudCxcbiAgICBNYXRlcmlhbENoaXBMaXN0Q29tcG9uZW50LFxuICAgIE1hdGVyaWFsRGF0ZXBpY2tlckNvbXBvbmVudCxcbiAgICBNYXRlcmlhbEZpbGVDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxJbnB1dENvbXBvbmVudCxcbiAgICBNYXRlcmlhbE51bWJlckNvbXBvbmVudCxcbiAgICBNYXRlcmlhbFJhZGlvc0NvbXBvbmVudCxcbiAgICBNYXRlcmlhbFNlbGVjdENvbXBvbmVudCxcbiAgICBNYXRlcmlhbFNsaWRlckNvbXBvbmVudCxcbiAgICBNYXRlcmlhbFN0ZXBwZXJDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxUYWJzQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsVGV4dGFyZWFDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxEZXNpZ25GcmFtZXdvcmtDb21wb25lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsRGVzaWduRnJhbWV3b3JrTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxNYXRlcmlhbERlc2lnbkZyYW1ld29ya01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTWF0ZXJpYWxEZXNpZ25GcmFtZXdvcmtNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEZyYW1ld29yayxcbiAgICAgICAgICB1c2VDbGFzczogTWF0ZXJpYWxEZXNpZ25GcmFtZXdvcmssXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH1cbiAgfVxufVxuIl19