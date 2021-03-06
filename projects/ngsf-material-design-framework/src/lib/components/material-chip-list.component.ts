import {Component, Input, OnInit} from '@angular/core'
import {AbstractControl} from '@angular/forms'
import {JsonSchemaFormService} from '@ngsf/widget-library'

// TODO: Add this control

@Component({
  selector: 'material-chip-list-widget',
  template: ``,
})
export class MaterialChipListComponent implements OnInit {
  formControl: AbstractControl
  controlName: string
  controlValue: any
  controlDisabled = false
  boundControl = false
  options: any
  @Input() layoutNode: any
  @Input() layoutIndex: number[]
  @Input() dataIndex: number[]

  constructor(
    private jsf: JsonSchemaFormService
  ) {
  }

  ngOnInit() {
    this.options = this.layoutNode.options || {}
    this.jsf.initializeControl(this)
  }

  updateValue(event) {
    this.jsf.updateValue(this, event.target.value)
  }
}
