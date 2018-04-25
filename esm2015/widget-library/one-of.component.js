import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
// TODO: Add this control
export class OneOfComponent {
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
OneOfComponent.decorators = [
    { type: Component, args: [{
                selector: 'one-of-widget',
                template: ``,
            },] },
];
/** @nocollapse */
OneOfComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
OneOfComponent.propDecorators = {
    "layoutNode": [{ type: Input },],
    "layoutIndex": [{ type: Input },],
    "dataIndex": [{ type: Input },],
};
//# sourceMappingURL=one-of.component.js.map
