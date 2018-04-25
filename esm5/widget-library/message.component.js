import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
var MessageComponent = /** @class */ (function () {
    function MessageComponent(jsf) {
        this.jsf = jsf;
        this.message = null;
    }
    MessageComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.message = this.options.help || this.options.helpvalue ||
            this.options.msg || this.options.message;
    };
    return MessageComponent;
}());
export { MessageComponent };
MessageComponent.decorators = [
    { type: Component, args: [{
                selector: 'message-widget',
                template: "\n    <span *ngIf=\"message\"\n      [class]=\"options?.labelHtmlClass || ''\"\n      [innerHTML]=\"message\"></span>",
            },] },
];
/** @nocollapse */
MessageComponent.ctorParameters = function () { return [
    { type: JsonSchemaFormService, },
]; };
MessageComponent.propDecorators = {
    "layoutNode": [{ type: Input },],
    "layoutIndex": [{ type: Input },],
    "dataIndex": [{ type: Input },],
};
//# sourceMappingURL=message.component.js.map
