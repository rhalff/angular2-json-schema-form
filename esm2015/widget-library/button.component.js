import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
export class ButtonComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    }
    updateValue(event) {
        if (typeof this.options.onClick === 'function') {
            this.options.onClick(event);
        }
        else {
            this.jsf.updateValue(this, event.target.value);
        }
    }
}
ButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'button-widget',
                template: `
    <div
      [class]="options?.htmlClass || ''">
      <button
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [class]="options?.fieldHtmlClass || ''"
        [disabled]="controlDisabled"
        [name]="controlName"
        [type]="layoutNode?.type"
        [value]="controlValue"
        (click)="updateValue($event)">
        <span *ngIf="options?.icon || options?.title"
          [class]="options?.icon"
          [innerHTML]="options?.title"></span>
      </button>
    </div>`,
            },] },
];
/** @nocollapse */
ButtonComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
ButtonComponent.propDecorators = {
    "layoutNode": [{ type: Input },],
    "layoutIndex": [{ type: Input },],
    "dataIndex": [{ type: Input },],
};
//# sourceMappingURL=button.component.js.map
