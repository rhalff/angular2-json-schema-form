import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
// TODO: Add this control
var MaterialStepperComponent = /** @class */ (function () {
    function MaterialStepperComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    MaterialStepperComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    };
    MaterialStepperComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    return MaterialStepperComponent;
}());
export { MaterialStepperComponent };
MaterialStepperComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-stepper-widget',
                template: "",
            },] },
];
/** @nocollapse */
MaterialStepperComponent.ctorParameters = function () { return [
    { type: JsonSchemaFormService, },
]; };
MaterialStepperComponent.propDecorators = {
    "layoutNode": [{ type: Input },],
    "layoutIndex": [{ type: Input },],
    "dataIndex": [{ type: Input },],
};
//# sourceMappingURL=material-stepper.component.js.map
