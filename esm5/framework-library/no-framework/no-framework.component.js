import { Component, Input } from '@angular/core';
var NoFrameworkComponent = /** @class */ (function () {
    function NoFrameworkComponent() {
    }
    return NoFrameworkComponent;
}());
export { NoFrameworkComponent };
NoFrameworkComponent.decorators = [
    { type: Component, args: [{
                selector: 'no-framework',
                template: "\n    <select-widget-widget\n      [dataIndex]=\"dataIndex\"\n      [layoutIndex]=\"layoutIndex\"\n      [layoutNode]=\"layoutNode\"></select-widget-widget>",
            },] },
];
/** @nocollapse */
NoFrameworkComponent.propDecorators = {
    "layoutNode": [{ type: Input },],
    "layoutIndex": [{ type: Input },],
    "dataIndex": [{ type: Input },],
};
//# sourceMappingURL=no-framework.component.js.map
