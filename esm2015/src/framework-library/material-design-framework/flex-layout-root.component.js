import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
export class FlexLayoutRootComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.isFlexItem = false;
    }
    removeItem(item) {
        this.jsf.removeItem(item);
    }
    // Set attributes for flexbox child
    // (container attributes are set in flex-layout-section.component)
    getFlexAttribute(node, attribute) {
        const index = ['flex-grow', 'flex-shrink', 'flex-basis'].indexOf(attribute);
        return ((node.options || {}).flex || '').split(/\s+/)[index] ||
            (node.options || {})[attribute] || ['1', '1', 'auto'][index];
    }
    showWidget(layoutNode) {
        return this.jsf.evaluateCondition(layoutNode, this.dataIndex);
    }
}
FlexLayoutRootComponent.decorators = [
    { type: Component, args: [{
                selector: 'flex-layout-root-widget',
                template: `
    <div *ngFor="let layoutNode of layout; let i = index"
      [class.form-flex-item]="isFlexItem"
      [style.flex-grow]="getFlexAttribute(layoutNode, 'flex-grow')"
      [style.flex-shrink]="getFlexAttribute(layoutNode, 'flex-shrink')"
      [style.flex-basis]="getFlexAttribute(layoutNode, 'flex-basis')"
      [style.align-self]="(layoutNode?.options || {})['align-self']"
      [style.order]="layoutNode?.options?.order"
      [fxFlex]="layoutNode?.options?.fxFlex"
      [fxFlexOrder]="layoutNode?.options?.fxFlexOrder"
      [fxFlexOffset]="layoutNode?.options?.fxFlexOffset"
      [fxFlexAlign]="layoutNode?.options?.fxFlexAlign">
      <select-framework-widget *ngIf="showWidget(layoutNode)"
        [dataIndex]="layoutNode?.arrayItem ? (dataIndex || []).concat(i) : (dataIndex || [])"
        [layoutIndex]="(layoutIndex || []).concat(i)"
        [layoutNode]="layoutNode"></select-framework-widget>
    <div>`,
                changeDetection: ChangeDetectionStrategy.Default,
            },] },
];
/** @nocollapse */
FlexLayoutRootComponent.ctorParameters = () => [
    { type: JsonSchemaFormService, },
];
FlexLayoutRootComponent.propDecorators = {
    "dataIndex": [{ type: Input },],
    "layoutIndex": [{ type: Input },],
    "layout": [{ type: Input },],
    "isFlexItem": [{ type: Input },],
};
//# sourceMappingURL=flex-layout-root.component.js.map
