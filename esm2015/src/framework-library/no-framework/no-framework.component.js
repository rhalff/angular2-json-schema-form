import { Component, Input } from '@angular/core';
export class NoFrameworkComponent {
}
NoFrameworkComponent.decorators = [
    { type: Component, args: [{
                selector: 'no-framework',
                template: `
    <select-widget-widget
      [dataIndex]="dataIndex"
      [layoutIndex]="layoutIndex"
      [layoutNode]="layoutNode"></select-widget-widget>`,
            },] },
];
/** @nocollapse */
NoFrameworkComponent.propDecorators = {
    "layoutNode": [{ type: Input },],
    "layoutIndex": [{ type: Input },],
    "dataIndex": [{ type: Input },],
};
//# sourceMappingURL=no-framework.component.js.map
