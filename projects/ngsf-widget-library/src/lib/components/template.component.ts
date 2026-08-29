import {Component, ComponentRef, Input, OnChanges, OnInit, ViewChild, ViewContainerRef} from '@angular/core'
import {JsonSchemaFormService} from '../services/json-schema-form.service'

@Component({
  standalone: false,
  selector: 'template-widget',
  template: `<div #widgetContainer></div>`,
})
export class TemplateComponent implements OnInit, OnChanges {
  newComponent: ComponentRef<any> = null
  @Input() layoutNode: any
  @Input() layoutIndex: number[]
  @Input() dataIndex: number[]
  @ViewChild('widgetContainer', {read: ViewContainerRef, static: true})
  widgetContainer: ViewContainerRef

  constructor(private jsf: JsonSchemaFormService) {
  }

  ngOnInit() {
    this.updateComponent()
  }

  ngOnChanges() {
    this.updateComponent()
  }

  updateComponent() {
    if (!this.newComponent && this.layoutNode.options.template) {
      this.newComponent = this.widgetContainer.createComponent(this.layoutNode.options.template)
    }
    if (this.newComponent) {
      for (const input of ['layoutNode', 'layoutIndex', 'dataIndex']) {
        this.newComponent.instance[input] = this[input]
      }
    }
  }
}
