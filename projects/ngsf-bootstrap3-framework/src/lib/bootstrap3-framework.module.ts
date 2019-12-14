import {NgModule, ModuleWithProviders} from '@angular/core'
import {CommonModule} from '@angular/common'
import {Framework} from '@ngsf/common'
import {WidgetLibraryModule} from '@ngsf/widget-library'
import {Bootstrap3FrameworkComponent} from './bootstrap3-framework.component'
import {Bootstrap3Framework} from './bootstrap3-framework'

@NgModule({
  imports: [
    CommonModule,
    WidgetLibraryModule
  ],
  declarations: [Bootstrap3FrameworkComponent],
  exports: [Bootstrap3FrameworkComponent],
  entryComponents: [Bootstrap3FrameworkComponent]
})
export class Bootstrap3FrameworkModule {
  static forRoot(): ModuleWithProviders<Bootstrap3FrameworkModule> {
    return {
      ngModule: Bootstrap3FrameworkModule,
      providers: [
        {
          provide: Framework,
          useClass: Bootstrap3Framework,
          multi: true
        }
      ]
    }
  }
}
