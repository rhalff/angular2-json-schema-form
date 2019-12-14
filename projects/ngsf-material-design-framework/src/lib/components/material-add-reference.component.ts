import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core'
import {JsonSchemaFormService} from '@ngsf/widget-library'

@Component({
  selector: 'material-add-reference-widget',
  template: `
      <section [class]="options?.htmlClass || ''" align="end">
          <button mat-raised-button *ngIf="showAddButton"
                  [color]="options?.color || 'accent'"
                  [disabled]="options?.readonly"
                  (click)="addItem($event)">
              <span *ngIf="options?.icon" [class]="options?.icon"></span>
              <span *ngIf="options?.title" [innerHTML]="buttonText"></span>
          </button>
      </section>`,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MaterialAddReferenceComponent implements OnInit {
  options: any
  itemCount: number
  previousLayoutIndex: number[]
  previousDataIndex: number[]
  @Input() layoutNode: any
  @Input() layoutIndex: number[]
  @Input() dataIndex: number[]

  constructor(
    private jsf: JsonSchemaFormService
  ) {
  }

  get showAddButton(): boolean {
    return !this.layoutNode.arrayItem ||
      this.layoutIndex[this.layoutIndex.length - 1] < this.options.maxItems
  }

  get buttonText(): string {
    const parent: any = {
      dataIndex: this.dataIndex.slice(0, -1),
      layoutIndex: this.layoutIndex.slice(0, -1),
      layoutNode: this.jsf.getParentNode(this),
    }
    return parent.layoutNode.add ||
      this.jsf.setArrayItemTitle(parent, this.layoutNode, this.itemCount)
  }

  ngOnInit() {
    this.options = this.layoutNode.options || {}
  }

  addItem(event) {
    event.preventDefault()
    this.jsf.addItem(this)
  }
}
