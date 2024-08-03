import {Injectable} from '@angular/core'
import {Framework} from '@ngsf/common'
// Bootstrap 5 Framework
// https://github.com/ng-bootstrap/ng-bootstrap
import {Bootstrap5FrameworkComponent} from './bootstrap5-framework.component'

@Injectable()
export class Bootstrap5Framework extends Framework {
  name = 'bootstrap-5'

  framework = Bootstrap5FrameworkComponent

  stylesheets = [
    '//cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
  ]


  scripts = [
    '//cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js',
    '//cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'
  ]
}
