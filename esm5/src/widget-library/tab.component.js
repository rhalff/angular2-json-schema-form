import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
var TabComponent = /** @class */ (function () {
    function TabComponent(jsf) {
        this.jsf = jsf;
    }
    TabComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
    };
    return TabComponent;
}());
export { TabComponent };
TabComponent.decorators = [
    { type: Component, args: [{
                selector: 'tab-widget',
                template: "\n    <div [class]=\"options?.htmlClass || ''\">\n      <root-widget\n        [dataIndex]=\"dataIndex\"\n        [layoutIndex]=\"layoutIndex\"\n        [layout]=\"layoutNode.items\"></root-widget>\n    </div>",
            },] },
];
/** @nocollapse */
TabComponent.ctorParameters = function () { return [
    { type: JsonSchemaFormService, },
]; };
TabComponent.propDecorators = {
    "layoutNode": [{ type: Input },],
    "layoutIndex": [{ type: Input },],
    "dataIndex": [{ type: Input },],
};
//# sourceMappingURL=tab.component.js.map
