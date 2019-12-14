import {ModuleWithProviders, NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {
  JsonSchemaFormService,
  FrameworkLibraryService,
  WidgetLibraryService,
  WidgetLibraryModule
} from '@ngsf/widget-library'
import {Framework} from '@ngsf/common'
import {JsonSchemaFormComponent} from './json-schema-form.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WidgetLibraryModule
  ],
  declarations: [JsonSchemaFormComponent],
  exports: [JsonSchemaFormComponent, WidgetLibraryModule]
})
export class JsonSchemaFormModule {
  static forRoot(FormFramework): ModuleWithProviders<JsonSchemaFormModule> {
    return {
      ngModule: JsonSchemaFormModule,
      providers: [
        JsonSchemaFormService,
        FrameworkLibraryService,
        WidgetLibraryService,
        {
          provide: Framework,
          useClass: FormFramework,
          multi: true
        }
      ]
    }
  }
}
