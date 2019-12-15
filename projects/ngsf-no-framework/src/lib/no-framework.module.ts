import {ModuleWithProviders, NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {WidgetLibraryModule} from '@ngsf/widget-library'
import {Framework} from '@ngsf/common'
// No framework - plain HTML controls (styles from form layout only)
import {NoFrameworkComponent} from './no-framework.component'
import {NoFramework} from './no-framework'

@NgModule({
  imports: [
    CommonModule,
    WidgetLibraryModule
  ],
  declarations: [NoFrameworkComponent],
  exports: [NoFrameworkComponent],
  entryComponents: [NoFrameworkComponent]
})
export class NoFrameworkModule {
  static forRoot(): ModuleWithProviders<NoFrameworkModule> {
    return {
      ngModule: NoFrameworkModule,
      providers: [
        {
          provide: Framework,
          useClass: NoFramework,
          multi: true
        }
      ]
    }
  }
}
