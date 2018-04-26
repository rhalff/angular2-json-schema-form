import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
// TODO: Add this control
var MaterialFileComponent = /** @class */ (function () {
    function MaterialFileComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    MaterialFileComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    };
    MaterialFileComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    return MaterialFileComponent;
}());
export { MaterialFileComponent };
MaterialFileComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-file-widget',
                template: "",
            },] },
];
/** @nocollapse */
MaterialFileComponent.ctorParameters = function () { return [
    { type: JsonSchemaFormService, },
]; };
MaterialFileComponent.propDecorators = {
    "layoutNode": [{ type: Input },],
    "layoutIndex": [{ type: Input },],
    "dataIndex": [{ type: Input },],
};
//# sourceMappingURL=material-file.component.js.map
