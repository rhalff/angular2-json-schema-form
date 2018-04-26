import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
// TODO: Add this control
export class MaterialFileComponent {
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
MaterialFileComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-file-widget',
                template: ``,
            },] },
];
/** @nocollapse */
MaterialFileComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
MaterialFileComponent.propDecorators = {
    "layoutNode": [{ type: Input },],
    "layoutIndex": [{ type: Input },],
    "dataIndex": [{ type: Input },],
};
//# sourceMappingURL=material-file.component.js.map
