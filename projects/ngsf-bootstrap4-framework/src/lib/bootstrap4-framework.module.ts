import {ModuleWithProviders, NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {WidgetLibraryModule} from '@ngsf/widget-library'
import {Framework} from '@ngsf/common'
import {Bootstrap4FrameworkComponent} from './bootstrap4-framework.component'
import {Bootstrap4Framework} from './bootstrap4-framework'

@NgModule({
  imports: [
    CommonModule,
    WidgetLibraryModule
  ],
  declarations: [Bootstrap4FrameworkComponent],
  exports: [Bootstrap4FrameworkComponent],
  entryComponents: [Bootstrap4FrameworkComponent]
})
export class Bootstrap4FrameworkModule {
  static forRoot(): ModuleWithProviders<Bootstrap4FrameworkModule> {
    return {
      ngModule: Bootstrap4FrameworkModule,
      providers: [
        {
          provide: Framework,
          useClass: Bootstrap4Framework,
          multi: true
        }
      ]
    }
  }
}
