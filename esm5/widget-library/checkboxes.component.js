import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
import { buildTitleMap } from '../shared';
var CheckboxesComponent = /** @class */ (function () {
    function CheckboxesComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.checkboxList = [];
    }
    CheckboxesComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.layoutOrientation = (this.layoutNode.type === 'checkboxes-inline' ||
            this.layoutNode.type === 'checkboxbuttons') ? 'horizontal' : 'vertical';
        this.jsf.initializeControl(this);
        this.checkboxList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
        if (this.boundControl) {
            var formArray_1 = this.jsf.getFormControl(this);
            this.checkboxList.forEach(function (checkboxItem) { return checkboxItem.checked = formArray_1.value.includes(checkboxItem.value); });
        }
    };
    CheckboxesComponent.prototype.updateValue = function (event) {
        try {
            for (var _a = tslib_1.__values(this.checkboxList), _b = _a.next(); !_b.done; _b = _a.next()) {
                var checkboxItem = _b.value;
                if (event.target.value === checkboxItem.value) {
                    checkboxItem.checked = event.target.checked;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (this.boundControl) {
            this.jsf.updateArrayCheckboxList(this, this.checkboxList);
        }
        var e_1, _c;
    };
    return CheckboxesComponent;
}());
export { CheckboxesComponent };
CheckboxesComponent.decorators = [
    { type: Component, args: [{
                selector: 'checkboxes-widget',
                template: "\n    <label *ngIf=\"options?.title\"\n      [class]=\"options?.labelHtmlClass || ''\"\n      [style.display]=\"options?.notitle ? 'none' : ''\"\n      [innerHTML]=\"options?.title\"></label>\n\n    <!-- 'horizontal' = checkboxes-inline or checkboxbuttons -->\n    <div *ngIf=\"layoutOrientation === 'horizontal'\" [class]=\"options?.htmlClass || ''\">\n      <label *ngFor=\"let checkboxItem of checkboxList\"\n        [attr.for]=\"'control' + layoutNode?._id + '/' + checkboxItem.value\"\n        [class]=\"(options?.itemLabelHtmlClass || '') + (checkboxItem.checked ?\n          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :\n          (' ' + (options?.style?.unselected || '')))\">\n        <input type=\"checkbox\"\n          [attr.required]=\"options?.required\"\n          [checked]=\"checkboxItem.checked\"\n          [class]=\"options?.fieldHtmlClass || ''\"\n          [disabled]=\"controlDisabled\"\n          [id]=\"'control' + layoutNode?._id + '/' + checkboxItem.value\"\n          [name]=\"checkboxItem?.name\"\n          [readonly]=\"options?.readonly ? 'readonly' : null\"\n          [value]=\"checkboxItem.value\"\n          (change)=\"updateValue($event)\">\n        <span [innerHTML]=\"checkboxItem.name\"></span>\n      </label>\n    </div>\n\n    <!-- 'vertical' = regular checkboxes -->\n    <div *ngIf=\"layoutOrientation === 'vertical'\">\n      <div *ngFor=\"let checkboxItem of checkboxList\" [class]=\"options?.htmlClass || ''\">\n        <label\n          [attr.for]=\"'control' + layoutNode?._id + '/' + checkboxItem.value\"\n          [class]=\"(options?.itemLabelHtmlClass || '') + (checkboxItem.checked ?\n            (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :\n            (' ' + (options?.style?.unselected || '')))\">\n          <input type=\"checkbox\"\n            [attr.required]=\"options?.required\"\n            [checked]=\"checkboxItem.checked\"\n            [class]=\"options?.fieldHtmlClass || ''\"\n            [disabled]=\"controlDisabled\"\n            [id]=\"options?.name + '/' + checkboxItem.value\"\n            [name]=\"checkboxItem?.name\"\n            [readonly]=\"options?.readonly ? 'readonly' : null\"\n            [value]=\"checkboxItem.value\"\n            (change)=\"updateValue($event)\">\n          <span [innerHTML]=\"checkboxItem?.name\"></span>\n        </label>\n      </div>\n    </div>",
            },] },
];
/** @nocollapse */
CheckboxesComponent.ctorParameters = function () { return [
    { type: JsonSchemaFormService, },
]; };
CheckboxesComponent.propDecorators = {
    "layoutNode": [{ type: Input },],
    "layoutIndex": [{ type: Input },],
    "dataIndex": [{ type: Input },],
};
//# sourceMappingURL=checkboxes.component.js.map
