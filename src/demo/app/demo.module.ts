import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {FlexLayoutModule} from '@angular/flex-layout'
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatMenuModule,
  MatSelectModule,
  MatToolbarModule
} from '@angular/material'
import {RouterModule} from '@angular/router'

import {JsonSchemaFormModule} from '@ngsf/json-schema-form'

import {NoFrameworkModule} from '@ngsf/no-framework'
import {MaterialDesignFrameworkModule} from '@ngsf/material-design-framework'
import {Bootstrap3FrameworkModule} from '@ngsf/bootstrap3-framework'
import {Bootstrap4FrameworkModule} from '@ngsf/bootstrap4-framework'
import {AceEditorDirective} from './ace-editor.directive'
import {DemoComponent} from './demo.component'
import {DemoRootComponent} from './demo-root.component'

import {routes} from './demo.routes'

// To include JsonSchemaFormModule after downloading from NPM, use this instead:
//
//   import { JsonSchemaFormModule, NoFrameworkModule } from 'angular2-json-schema-form';
//
// but replace "NoFrameworkModule" with the framework you want to use,
// then import both JsonSchemaFormModule and the framework module, like this:
//
//   imports: [ ... NoFrameworkModule, JsonSchemaFormModule.forRoot(NoFrameworkModule) ... ]

@NgModule({
  declarations: [AceEditorDirective, DemoComponent, DemoRootComponent],
  imports: [
    BrowserModule, BrowserAnimationsModule, FlexLayoutModule, FormsModule,
    HttpClientModule, MatButtonModule, MatCardModule, MatCheckboxModule,
    MatIconModule, MatMenuModule, MatSelectModule, MatToolbarModule,
    RouterModule.forRoot(routes),

    NoFrameworkModule,
    MaterialDesignFrameworkModule,
    // Bootstrap3FrameworkModule,
    // Bootstrap4FrameworkModule,

    JsonSchemaFormModule.forRoot(
      // NoFrameworkModule,
      MaterialDesignFrameworkModule // .forRoot().providers[0]
      // Bootstrap3FrameworkModule,
      // Bootstrap4FrameworkModule
    )
  ],
  bootstrap: [DemoRootComponent]
})

// Here, by loading 4 frameworks in JsonSchemaFormModule.forRoot(), the first,
// `NoFrameworkModule`, will be set active by default. But any of the 4 can
// be activated later by passing the framework's name to the <json-schema-form>
// tag's `framework` input. The names of these 4 frameworks are:
//   'no-framework'
//   'material-design-framework',
//   'bootstrap-3-framework'
//   'bootstrap-4-framework'

export class DemoModule {
}
