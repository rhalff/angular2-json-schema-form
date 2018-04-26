import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
// TODO: Add this control
var MaterialOneOfComponent = /** @class */ (function () {
    function MaterialOneOfComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    MaterialOneOfComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    };
    MaterialOneOfComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    return MaterialOneOfComponent;
}());
export { MaterialOneOfComponent };
MaterialOneOfComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-one-of-widget',
                template: "",
            },] },
];
/** @nocollapse */
MaterialOneOfComponent.ctorParameters = function () { return [
    { type: JsonSchemaFormService, },
]; };
MaterialOneOfComponent.propDecorators = {
    "layoutNode": [{ type: Input },],
    "layoutIndex": [{ type: Input },],
    "dataIndex": [{ type: Input },],
};
//# sourceMappingURL=material-one-of.component.js.map
