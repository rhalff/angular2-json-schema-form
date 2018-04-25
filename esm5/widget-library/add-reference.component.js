import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
var AddReferenceComponent = /** @class */ (function () {
    function AddReferenceComponent(jsf) {
        this.jsf = jsf;
    }
    AddReferenceComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
    };
    Object.defineProperty(AddReferenceComponent.prototype, "showAddButton", {
        get: function () {
            return !this.layoutNode.arrayItem ||
                this.layoutIndex[this.layoutIndex.length - 1] < this.options.maxItems;
        },
        enumerable: true,
        configurable: true
    });
    AddReferenceComponent.prototype.addItem = function (event) {
        event.preventDefault();
        this.jsf.addItem(this);
    };
    Object.defineProperty(AddReferenceComponent.prototype, "buttonText", {
        get: function () {
            var parent = {
                dataIndex: this.dataIndex.slice(0, -1),
                layoutIndex: this.layoutIndex.slice(0, -1),
                layoutNode: this.jsf.getParentNode(this)
            };
            return parent.layoutNode.add ||
                this.jsf.setArrayItemTitle(parent, this.layoutNode, this.itemCount);
        },
        enumerable: true,
        configurable: true
    });
    return AddReferenceComponent;
}());
export { AddReferenceComponent };
AddReferenceComponent.decorators = [
    { type: Component, args: [{
                selector: 'add-reference-widget',
                template: "\n    <button *ngIf=\"showAddButton\"\n      [class]=\"options?.fieldHtmlClass || ''\"\n      [disabled]=\"options?.readonly\"\n      (click)=\"addItem($event)\">\n      <span *ngIf=\"options?.icon\" [class]=\"options?.icon\"></span>\n      <span *ngIf=\"options?.title\" [innerHTML]=\"buttonText\"></span>\n    </button>",
                changeDetection: ChangeDetectionStrategy.Default,
            },] },
];
/** @nocollapse */
AddReferenceComponent.ctorParameters = function () { return [
    { type: JsonSchemaFormService, },
]; };
AddReferenceComponent.propDecorators = {
    "layoutNode": [{ type: Input },],
    "layoutIndex": [{ type: Input },],
    "dataIndex": [{ type: Input },],
};
//# sourceMappingURL=add-reference.component.js.map
