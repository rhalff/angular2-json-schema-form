import {ModuleWithProviders, NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {
  JsonSchemaFormService,
  FrameworkLibraryService,
  WidgetLibraryService,
  WidgetLibraryModule,
} from '@ngsf/widget-library'
import {Framework} from '@ngsf/common'
import {JsonSchemaFormComponent} from './json-schema-form.component'
import {NoFramework} from '@ngsf/no-framework'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WidgetLibraryModule,
  ],
  declarations: [JsonSchemaFormComponent],
  exports: [JsonSchemaFormComponent, WidgetLibraryModule],
})
export class JsonSchemaFormModule {
  static forRoot(...frameworks): ModuleWithProviders<JsonSchemaFormModule> {
    const loadFrameworks = frameworks.length
      ? frameworks.map(framework => framework.forRoot().providers[0])
      : [{provide: Framework, useClass: NoFramework, multi: true}]
    return {
      ngModule: JsonSchemaFormModule,
      providers: [
        JsonSchemaFormService,
        FrameworkLibraryService,
        WidgetLibraryService,
        ...loadFrameworks,
      ],
    }
  }
}
