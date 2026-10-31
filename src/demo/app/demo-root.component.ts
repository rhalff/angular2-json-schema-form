import {Component} from '@angular/core'

@Component({
  selector: 'demo-root',
  standalone: false,
  template: `
      <router-outlet></router-outlet>`
})
export class DemoRootComponent {
}
