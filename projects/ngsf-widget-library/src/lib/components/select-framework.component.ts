import {
  Component,
  ComponentRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import {JsonSchemaFormService} from '../services/json-schema-form.service'

@Component({
  standalone: false,
  selector: 'select-framework-widget',
  template: `
    <div #widgetContainer></div>
  `,
})
export class SelectFrameworkComponent implements OnChanges, OnInit {
  newComponent: ComponentRef<any> = null
  @Input() layoutNode: any
  @Input() layoutIndex: number[]
  @Input() dataIndex: number[]
  @ViewChild('widgetContainer', {read: ViewContainerRef, static: true})
  widgetContainer: ViewContainerRef

  constructor(private jsf: JsonSchemaFormService) {}

  ngOnInit() {
    this.updateComponent()
  }

  ngOnChanges() {
    this.updateComponent()
  }

  updateComponent() {
    if (!this.newComponent && this.jsf.framework) {
      this.newComponent = this.widgetContainer.createComponent(this.jsf.framework as any)
    }
    if (this.newComponent) {
      for (const input of ['layoutNode', 'layoutIndex', 'dataIndex']) {
        this.newComponent.instance[input] = this[input]
      }
    }
  }
}
