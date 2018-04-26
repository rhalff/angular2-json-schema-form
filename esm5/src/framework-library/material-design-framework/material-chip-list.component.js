import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
// TODO: Add this control
var MaterialChipListComponent = /** @class */ (function () {
    function MaterialChipListComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    MaterialChipListComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    };
    MaterialChipListComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    return MaterialChipListComponent;
}());
export { MaterialChipListComponent };
MaterialChipListComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-chip-list-widget',
                template: "",
            },] },
];
/** @nocollapse */
MaterialChipListComponent.ctorParameters = function () { return [
    { type: JsonSchemaFormService, },
]; };
MaterialChipListComponent.propDecorators = {
    "layoutNode": [{ type: Input },],
    "layoutIndex": [{ type: Input },],
    "dataIndex": [{ type: Input },],
};
//# sourceMappingURL=material-chip-list.component.js.map
