import {ModuleWithProviders, NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {WidgetLibraryModule} from '@ngsf/widget-library'
import {Framework} from '@ngsf/common'
import {Bootstrap5FrameworkComponent} from './bootstrap5-framework.component'
import {Bootstrap5Framework} from './bootstrap5-framework'

@NgModule({
  imports: [
    CommonModule,
    WidgetLibraryModule
  ],
  declarations: [Bootstrap5FrameworkComponent],
  exports: [Bootstrap5FrameworkComponent]
})
export class Bootstrap5FrameworkModule {
  static forRoot(): ModuleWithProviders<Bootstrap5FrameworkModule> {
    return {
      ngModule: Bootstrap5FrameworkModule,
      providers: [
        {
          provide: Framework,
          useClass: Bootstrap5Framework,
          multi: true
        }
      ]
    }
  }
}
