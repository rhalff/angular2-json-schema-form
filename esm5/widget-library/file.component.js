import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
// TODO: Add this control
var FileComponent = /** @class */ (function () {
    function FileComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    FileComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    };
    FileComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    return FileComponent;
}());
export { FileComponent };
FileComponent.decorators = [
    { type: Component, args: [{
                selector: 'file-widget',
                template: "",
            },] },
];
/** @nocollapse */
FileComponent.ctorParameters = function () { return [
    { type: JsonSchemaFormService, },
]; };
FileComponent.propDecorators = {
    "layoutNode": [{ type: Input },],
    "layoutIndex": [{ type: Input },],
    "dataIndex": [{ type: Input },],
};
//# sourceMappingURL=file.component.js.map
