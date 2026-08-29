import {Component, Input} from '@angular/core'

@Component({
  standalone: false,
  selector: 'none-widget',
  template: ``,
})
export class NoneComponent {
  @Input() layoutNode: any
  @Input() layoutIndex: number[]
  @Input() dataIndex: number[]
}
