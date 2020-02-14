import {ModuleWithProviders, NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {JsonSchemaFormService} from './services/json-schema-form.service'
import {OrderableDirective} from './directives/orderable.directive'

import {AddReferenceComponent} from './components/add-reference.component'
import {ButtonComponent} from './components/button.component'
import {CheckboxComponent} from './components/checkbox.component'
import {CheckboxesComponent} from './components/checkboxes.component'
import {FileComponent} from './components/file.component'
import {HiddenComponent} from './components/hidden.component'
import {InputComponent} from './components/input.component'
import {MessageComponent} from './components/message.component'
import {NoneComponent} from './components/none.component'
import {NumberComponent} from './components/number.component'
import {OneOfComponent} from './components/one-of.component'
import {RadiosComponent} from './components/radios.component'
import {RootComponent} from './components/root.component'
import {SectionComponent} from './components/section.component'
import {SelectComponent} from './components/select.component'
import {SelectFrameworkComponent} from './components/select-framework.component'
import {SelectWidgetComponent} from './components/select-widget.component'
import {SubmitComponent} from './components/submit.component'
import {TabComponent} from './components/tab.component'
import {TabsComponent} from './components/tabs.component'
import {TemplateComponent} from './components/template.component'
import {TextareaComponent} from './components/textarea.component'

@NgModule({
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
  entryComponents: [
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
})
export class WidgetLibraryModule {
  static forRoot(): ModuleWithProviders<WidgetLibraryModule> {
    return {
      ngModule: WidgetLibraryModule,
      providers: [JsonSchemaFormService],
    }
  }
}
