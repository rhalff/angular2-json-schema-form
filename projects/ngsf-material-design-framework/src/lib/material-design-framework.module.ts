import {ModuleWithProviders, NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {WidgetLibraryModule} from '@ngsf/widget-library'
import {Framework} from '@ngsf/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {FlexLayoutModule} from '@angular/flex-layout'
import {
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
} from '@angular/material'
import {
  FlexLayoutRootComponent,
  FlexLayoutSectionComponent,
  MaterialAddReferenceComponent,
  MaterialButtonComponent,
  MaterialButtonGroupComponent,
  MaterialCheckboxComponent,
  MaterialCheckboxesComponent,
  MaterialChipListComponent,
  MaterialDatepickerComponent,
  MaterialFileComponent,
  MaterialInputComponent,
  MaterialNumberComponent,
  MaterialOneOfComponent,
  MaterialRadiosComponent,
  MaterialSelectComponent,
  MaterialSliderComponent,
  MaterialStepperComponent,
  MaterialTabsComponent,
  MaterialTextareaComponent,
  MaterialDesignFrameworkComponent,
} from './components'

export const MATERIAL_FRAMEWORK_COMPONENTS = [
  FlexLayoutRootComponent, FlexLayoutSectionComponent,
  MaterialAddReferenceComponent, MaterialOneOfComponent,
  MaterialButtonComponent, MaterialButtonGroupComponent,
  MaterialCheckboxComponent, MaterialCheckboxesComponent,
  MaterialChipListComponent, MaterialDatepickerComponent,
  MaterialFileComponent, MaterialInputComponent, MaterialNumberComponent,
  MaterialRadiosComponent, MaterialSelectComponent, MaterialSliderComponent,
  MaterialStepperComponent, MaterialTabsComponent, MaterialTextareaComponent,
  MaterialDesignFrameworkComponent
]

import {MaterialDesignFramework} from './material-design.framework'

export const ANGULAR_MATERIAL_MODULES = [
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule,
  MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatExpansionModule,
  MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule,
  MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule,
  MatStepperModule, MatTabsModule, MatTooltipModule,
]
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
    ...ANGULAR_MATERIAL_MODULES,
    WidgetLibraryModule,
  ],
  declarations: [...MATERIAL_FRAMEWORK_COMPONENTS],
  exports: [...MATERIAL_FRAMEWORK_COMPONENTS],
  entryComponents: [...MATERIAL_FRAMEWORK_COMPONENTS]
})
export class MaterialDesignFrameworkModule {
  static forRoot(): ModuleWithProviders<MaterialDesignFrameworkModule> {
    return {
      ngModule: MaterialDesignFrameworkModule,
      providers: [
        {
          provide: Framework,
          useClass: MaterialDesignFramework,
          multi: true
        }
      ]
    }
  }
}
