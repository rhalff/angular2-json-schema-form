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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: MaterialDesignFrameworkModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.3", ngImport: i0, type: MaterialDesignFrameworkModule, declarations: [FlexLayoutRootComponent,
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
            MaterialDesignFrameworkComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: MaterialDesignFrameworkModule, imports: [CommonModule,
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: MaterialDesignFrameworkModule, decorators: [{
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
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLW1hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsvc3JjL2xpYi9tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUMsUUFBUSxFQUFzQixNQUFNLGVBQWUsQ0FBQTtBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUE7QUFDNUMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7QUFDeEQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUN0QyxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUE7QUFDL0QsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sdUJBQXVCLENBQUE7QUFDdEQsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0seUNBQXlDLENBQUE7QUFDL0UsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sNENBQTRDLENBQUE7QUFDckYsT0FBTyxFQUFDLDZCQUE2QixFQUFDLE1BQU0sK0NBQStDLENBQUE7QUFDM0YsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sd0NBQXdDLENBQUE7QUFDOUUsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0sOENBQThDLENBQUE7QUFDekYsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sMENBQTBDLENBQUE7QUFDbEYsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sNENBQTRDLENBQUE7QUFDdEYsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sMkNBQTJDLENBQUE7QUFDbkYsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sNENBQTRDLENBQUE7QUFDdEYsT0FBTyxFQUFD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QkFBd0I7d0JBQ3hCLHFCQUFxQjt3QkFDckIseUJBQXlCO3dCQUN6QixnQ0FBZ0M7cUJBQ2pDO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nXG5pbXBvcnQge1dpZGdldExpYnJhcnlNb2R1bGV9IGZyb20gJ0BuZ3NmL3dpZGdldC1saWJyYXJ5J1xuaW1wb3J0IHtGcmFtZXdvcmt9IGZyb20gJ0BuZ3NmL2NvbW1vbidcbmltcG9ydCB7Rm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJ1xuaW1wb3J0IHtGbGV4TGF5b3V0TW9kdWxlfSBmcm9tICdAbmdicmFja2V0L25neC1sYXlvdXQnXG5pbXBvcnQge0ZsZXhMYXlvdXRSb290Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvZmxleC1sYXlvdXQtcm9vdC5jb21wb25lbnQnXG5pbXBvcnQge0ZsZXhMYXlvdXRTZWN0aW9uQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvZmxleC1sYXlvdXQtc2VjdGlvbi5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsQWRkUmVmZXJlbmNlQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtYWRkLXJlZmVyZW5jZS5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsQnV0dG9uQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtYnV0dG9uLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxCdXR0b25Hcm91cENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLWJ1dHRvbi1ncm91cC5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsQ2hlY2tib3hDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1jaGVja2JveC5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsQ2hlY2tib3hlc0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLWNoZWNrYm94ZXMuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbENoaXBMaXN0Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtY2hpcC1saXN0LmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxEYXRlcGlja2VyQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtZGF0ZXBpY2tlci5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsRmlsZUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLWZpbGUuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbElucHV0Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtaW5wdXQuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbE51bWJlckNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLW51bWJlci5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsT25lT2ZDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1vbmUtb2YuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbFJhZGlvc0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLXJhZGlvcy5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsU2VsZWN0Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtc2VsZWN0LmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxTbGlkZXJDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1zbGlkZXIuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbFN0ZXBwZXJDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1zdGVwcGVyLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxUYWJzQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtdGFicy5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsVGV4dGFyZWFDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC10ZXh0YXJlYS5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsRGVzaWduRnJhbWV3b3JrQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay5jb21wb25lbnQnXG5cbmltcG9ydCB7TWF0ZXJpYWxEZXNpZ25GcmFtZXdvcmt9IGZyb20gJy4vbWF0ZXJpYWwtZGVzaWduLmZyYW1ld29yaydcblxuaW1wb3J0IHtNYXRBdXRvY29tcGxldGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2F1dG9jb21wbGV0ZSdcbmltcG9ydCB7TWF0QnV0dG9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nXG5pbXBvcnQge01hdEJ1dHRvblRvZ2dsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uLXRvZ2dsZSdcbmltcG9ydCB7TWF0Q2FyZE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2FyZCdcbmltcG9ydCB7TWF0Q2hlY2tib3hNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoZWNrYm94J1xuaW1wb3J0IHtNYXRDaGlwc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hpcHMnXG5pbXBvcnQge01hdERhdGVwaWNrZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RhdGVwaWNrZXInXG5pbXBvcnQge01hdEV4cGFuc2lvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZXhwYW5zaW9uJ1xuaW1wb3J0IHtNYXRGb3JtRmllbGRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnXG5pbXBvcnQge01hdEljb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nXG5pbXBvcnQge01hdElucHV0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCdcbmltcG9ydCB7TWF0TmF0aXZlRGF0ZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSdcbmltcG9ydCB7TWF0UmFkaW9Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3JhZGlvJ1xuaW1wb3J0IHtNYXRTZWxlY3RNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NlbGVjdCdcbmltcG9ydCB7TWF0U2xpZGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZXInXG5pbXBvcnQge01hdFNsaWRlVG9nZ2xlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZS10b2dnbGUnXG5pbXBvcnQge01hdFN0ZXBwZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3N0ZXBwZXInXG5pbXBvcnQge01hdFRhYnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYnMnXG5pbXBvcnQge01hdFRvb2x0aXBNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnXG5cbi8qKlxuICogdW51c2VkIEBhbmd1bGFyL21hdGVyaWFsIG1vZHVsZXM6XG4gKiBNYXREaWFsb2dNb2R1bGUsIE1hdEdyaWRMaXN0TW9kdWxlLCBNYXRMaXN0TW9kdWxlLCBNYXRNZW51TW9kdWxlLFxuICogTWF0UGFnaW5hdG9yTW9kdWxlLCBNYXRQcm9ncmVzc0Jhck1vZHVsZSwgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICogTWF0U2lkZW5hdk1vZHVsZSwgTWF0U25hY2tCYXJNb2R1bGUsIE1hdFNvcnRNb2R1bGUsIE1hdFRhYmxlTW9kdWxlLFxuICogTWF0VG9vbGJhck1vZHVsZSxcbiAqL1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcblxuICAgIC8vIEFOR1VMQVJfTUFURVJJQUxfTU9EVUxFU1xuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0Q2hpcHNNb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBNYXRSYWRpb01vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICAgIE1hdFN0ZXBwZXJNb2R1bGUsXG4gICAgTWF0VGFic01vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuXG4gICAgV2lkZ2V0TGlicmFyeU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgLy8gTUFURVJJQUxfRlJBTUVXT1JLX0NPTVBPTkVOVFNcbiAgICBGbGV4TGF5b3V0Um9vdENvbXBvbmVudCxcbiAgICBGbGV4TGF5b3V0U2VjdGlvbkNvbXBvbmVudCxcbiAgICBNYXRlcmlhbEFkZFJlZmVyZW5jZUNvbXBvbmVudCxcbiAgICBNYXRlcmlhbE9uZU9mQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsQnV0dG9uQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsQnV0dG9uR3JvdXBDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxDaGVja2JveENvbXBvbmVudCxcbiAgICBNYXRlcmlhbENoZWNrYm94ZXNDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxDaGlwTGlzdENvbXBvbmVudCxcbiAgICBNYXRlcmlhbERhdGVwaWNrZXJDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxGaWxlQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsSW5wdXRDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxOdW1iZXJDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxSYWRpb3NDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxTZWxlY3RDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxTbGlkZXJDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxTdGVwcGVyQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsVGFic0NvbXBvbmVudCxcbiAgICBNYXRlcmlhbFRleHRhcmVhQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsRGVzaWduRnJhbWV3b3JrQ29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgLy8gTUFURVJJQUxfRlJBTUVXT1JLX0NPTVBPTkVOVFNcbiAgICBGbGV4TGF5b3V0Um9vdENvbXBvbmVudCxcbiAgICBGbGV4TGF5b3V0U2VjdGlvbkNvbXBvbmVudCxcbiAgICBNYXRlcmlhbEFkZFJlZmVyZW5jZUNvbXBvbmVudCxcbiAgICBNYXRlcmlhbE9uZU9mQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsQnV0dG9uQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsQnV0dG9uR3JvdXBDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxDaGVja2JveENvbXBvbmVudCxcbiAgICBNYXRlcmlhbENoZWNrYm94ZXNDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxDaGlwTGlzdENvbXBvbmVudCxcbiAgICBNYXRlcmlhbERhdGVwaWNrZXJDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxGaWxlQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsSW5wdXRDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxOdW1iZXJDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxSYWRpb3NDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxTZWxlY3RDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxTbGlkZXJDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxTdGVwcGVyQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsVGFic0NvbXBvbmVudCxcbiAgICBNYXRlcmlhbFRleHRhcmVhQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsRGVzaWduRnJhbWV3b3JrQ29tcG9uZW50LFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsRGVzaWduRnJhbWV3b3JrTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxNYXRlcmlhbERlc2lnbkZyYW1ld29ya01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTWF0ZXJpYWxEZXNpZ25GcmFtZXdvcmtNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEZyYW1ld29yayxcbiAgICAgICAgICB1c2VDbGFzczogTWF0ZXJpYWxEZXNpZ25GcmFtZXdvcmssXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH1cbiAgfVxufVxuIl19