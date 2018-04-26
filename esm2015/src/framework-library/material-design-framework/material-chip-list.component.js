import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
// TODO: Add this control
export class MaterialChipListComponent {
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
MaterialChipListComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-chip-list-widget',
                template: ``,
            },] },
];
/** @nocollapse */
MaterialChipListComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
MaterialChipListComponent.propDecorators = {
    "layoutNode": [{ type: Input },],
    "layoutIndex": [{ type: Input },],
    "dataIndex": [{ type: Input },],
};
//# sourceMappingURL=material-chip-list.component.js.map
