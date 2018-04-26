import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
// TODO: Add this control
export class MaterialOneOfComponent {
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
MaterialOneOfComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-one-of-widget',
                template: ``,
            },] },
];
/** @nocollapse */
MaterialOneOfComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
MaterialOneOfComponent.propDecorators = {
    "layoutNode": [{ type: Input },],
    "layoutIndex": [{ type: Input },],
    "dataIndex": [{ type: Input },],
};
//# sourceMappingURL=material-one-of.component.js.map
