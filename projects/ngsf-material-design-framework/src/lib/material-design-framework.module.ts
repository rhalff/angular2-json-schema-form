// import { ModuleWithProviders, NgModule } from "@angular/core";
import {NgModule, ModuleWithProviders} from '@angular/core'
import {CommonModule} from '@angular/common'
import {WidgetLibraryModule} from '@ngsf/widget-library'
import {Framework} from '@ngsf/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {FlexLayoutModule} from '@angular/flex-layout'
import {FlexLayoutRootComponent} from './components/flex-layout-root.component'
import {FlexLayoutSectionComponent} from './components/flex-layout-section.component'
import {MaterialAddReferenceComponent} from './components/material-add-reference.component'
import {MaterialButtonComponent} from './components/material-button.component'
import {MaterialButtonGroupComponent} from './components/material-button-group.component'
import {MaterialCheckboxComponent} from './components/material-checkbox.component'
import {MaterialCheckboxesComponent} from './components/material-checkboxes.component'
import {MaterialChipListComponent} from './components/material-chip-list.component'
import {MaterialDatepickerComponent} from './components/material-datepicker.component'
import {MaterialFileComponent} from './components/material-file.component'
import {MaterialInputComponent} from './components/material-input.component'
import {MaterialNumberComponent} from './components/material-number.component'
import {MaterialOneOfComponent} from './components/material-one-of.component'
import {MaterialRadiosComponent} from './components/material-radios.component'
import {MaterialSelectComponent} from './components/material-select.component'
import {MaterialSliderComponent} from './components/material-slider.component'
import {MaterialStepperComponent} from './components/material-stepper.component'
import {MaterialTabsComponent} from './components/material-tabs.component'
import {MaterialTextareaComponent} from './components/material-textarea.component'
import {MaterialDesignFrameworkComponent} from './components/material-design-framework.component'

import {MaterialDesignFramework} from './material-design.framework'

import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {MatButtonModule} from '@angular/material/button'
import {MatButtonToggleModule} from '@angular/material/button-toggle'
import {MatCardModule} from '@angular/material/card'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatChipsModule} from '@angular/material/chips'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatExpansionModule} from '@angular/material/expansion'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatIconModule} from '@angular/material/icon'
import {MatInputModule} from '@angular/material/input'
import {MatNativeDateModule} from '@angular/material/core'
import {MatRadioModule} from '@angular/material/radio'
import {MatSelectModule} from '@angular/material/select'
import {MatSliderModule} from '@angular/material/slider'
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import {MatStepperModule} from '@angular/material/stepper'
import {MatTabsModule} from '@angular/material/tabs'
import {MatTooltipModule} from '@angular/material/tooltip'

/**
 * unused @angular/material modules:
 * MatDialogModule, MatGridListModule, MatListModule, MatMenuModule,
 * MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule,
 * MatSidenavModule, MatSnackBarModule, MatSortModule, MatTableModule,
 * MatToolbarModule,
 */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    // ANGULAR_MATERIAL_MODULES
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
    // MATERIAL_FRAMEWORK_COMPONENTS
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
    // MATERIAL_FRAMEWORK_COMPONENTS
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
    // MATERIAL_FRAMEWORK_COMPONENTS
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
})
export class MaterialDesignFrameworkModule {
  static forRoot(): ModuleWithProviders<MaterialDesignFrameworkModule> {
    return {
      ngModule: MaterialDesignFrameworkModule,
      providers: [
        {
          provide: Framework,
          useClass: MaterialDesignFramework,
          multi: true,
        },
      ],
    }
  }
}
