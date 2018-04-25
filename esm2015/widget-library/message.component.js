import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
export class MessageComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.message = null;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.message = this.options.help || this.options.helpvalue ||
            this.options.msg || this.options.message;
    }
}
MessageComponent.decorators = [
    { type: Component, args: [{
                selector: 'message-widget',
                template: `
    <span *ngIf="message"
      [class]="options?.labelHtmlClass || ''"
      [innerHTML]="message"></span>`,
            },] },
];
/** @nocollapse */
MessageComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
MessageComponent.propDecorators = {
    "layoutNode": [{ type: Input },],
    "layoutIndex": [{ type: Input },],
    "dataIndex": [{ type: Input },],
};
//# sourceMappingURL=message.component.js.map
