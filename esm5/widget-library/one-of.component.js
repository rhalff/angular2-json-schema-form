import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
// TODO: Add this control
var OneOfComponent = /** @class */ (function () {
    function OneOfComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    OneOfComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    };
    OneOfComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    return OneOfComponent;
}());
export { OneOfComponent };
OneOfComponent.decorators = [
    { type: Component, args: [{
                selector: 'one-of-widget',
                template: "",
            },] },
];
/** @nocollapse */
OneOfComponent.ctorParameters = function () { return [
    { type: JsonSchemaFormService, },
]; };
OneOfComponent.propDecorators = {
    "layoutNode": [{ type: Input },],
    "layoutIndex": [{ type: Input },],
    "dataIndex": [{ type: Input },],
};
//# sourceMappingURL=one-of.component.js.map
