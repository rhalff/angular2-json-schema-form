import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
// TODO: Add this control
export class FileComponent {
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
        this.jsf.updateValue(this, event.target.value);
    }
}
FileComponent.decorators = [
    { type: Component, args: [{
                selector: 'file-widget',
                template: ``,
            },] },
];
/** @nocollapse */
FileComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
FileComponent.propDecorators = {
    "layoutNode": [{ type: Input },],
    "layoutIndex": [{ type: Input },],
    "dataIndex": [{ type: Input },],
};
//# sourceMappingURL=file.component.js.map
