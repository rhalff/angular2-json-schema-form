import {ModuleWithProviders, NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {JsonSchemaFormService} from './services/json-schema-form.service'
import {OrderableDirective} from './directives/orderable.directive'

import {BASIC_WIDGETS} from './components'

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [...BASIC_WIDGETS, OrderableDirective],
  exports: [...BASIC_WIDGETS, OrderableDirective],
  entryComponents: [...BASIC_WIDGETS],
  providers: [JsonSchemaFormService]
})
export class WidgetLibraryModule {
  static forRoot(): ModuleWithProviders<WidgetLibraryModule> {
    return {
      ngModule: WidgetLibraryModule,
      providers: [JsonSchemaFormService]
    }
  }
}
