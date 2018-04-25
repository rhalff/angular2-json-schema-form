import { Directive, ElementRef, Input, NgZone } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
/**
 * OrderableDirective
 *
 * Enables array elements to be reordered by dragging and dropping.
 *
 * Only works for arrays that have at least two elements.
 *
 * Also detects arrays-within-arrays, and correctly moves either
 * the child array element or the parent array element,
 * depending on the drop targert.
 *
 * Listeners for movable element being dragged:
 * - dragstart: add 'dragging' class to element, set effectAllowed = 'move'
 * - dragover: set dropEffect = 'move'
 * - dragend: remove 'dragging' class from element
 *
 * Listeners for stationary items being dragged over:
 * - dragenter: add 'drag-target-...' classes to element
 * - dragleave: remove 'drag-target-...' classes from element
 * - drop: remove 'drag-target-...' classes from element, move dropped array item
 */
var OrderableDirective = /** @class */ (function () {
    function OrderableDirective(elementRef, jsf, ngZone) {
        this.elementRef = elementRef;
        this.jsf = jsf;
        this.ngZone = ngZone;
        this.overParentElement = false;
        this.overChildElement = false;
    }
    OrderableDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.orderable && this.layoutNode && this.layoutIndex && this.dataIndex) {
            this.element = this.elementRef.nativeElement;
            this.element.draggable = true;
            this.arrayLayoutIndex = 'move:' + this.layoutIndex.slice(0, -1).toString();
            this.ngZone.runOutsideAngular(function () {
                // Listeners for movable element being dragged:
                _this.element.addEventListener('dragstart', function (event) {
                    event.dataTransfer.effectAllowed = 'move';
                    // Hack to bypass stupid HTML drag-and-drop dataTransfer protection
                    // so drag source info will be available on dragenter
                    var sourceArrayIndex = _this.dataIndex[_this.dataIndex.length - 1];
                    sessionStorage.setItem(_this.arrayLayoutIndex, sourceArrayIndex + '');
                });
                _this.element.addEventListener('dragover', function (event) {
                    if (event.preventDefault) {
                        event.preventDefault();
                    }
                    event.dataTransfer.dropEffect = 'move';
                    return false;
                });
                // Listeners for stationary items being dragged over:
                _this.element.addEventListener('dragenter', function (event) {
                    // Part 1 of a hack, inspired by Dragster, to simulate mouseover and mouseout
                    // behavior while dragging items - http://bensmithett.github.io/dragster/
                    if (_this.overParentElement) {
                        return _this.overChildElement = true;
                    }
                    else {
                        _this.overParentElement = true;
                    }
                    var sourceArrayIndex = sessionStorage.getItem(_this.arrayLayoutIndex);
                    if (sourceArrayIndex !== null) {
                        if (_this.dataIndex[_this.dataIndex.length - 1] < +sourceArrayIndex) {
                            _this.element.classList.add('drag-target-top');
                        }
                        else if (_this.dataIndex[_this.dataIndex.length - 1] > +sourceArrayIndex) {
                            _this.element.classList.add('drag-target-bottom');
                        }
                    }
                });
                _this.element.addEventListener('dragleave', function (event) {
                    // Part 2 of the Dragster hack
                    if (_this.overChildElement) {
                        _this.overChildElement = false;
                    }
                    else if (_this.overParentElement) {
                        _this.overParentElement = false;
                    }
                    var sourceArrayIndex = sessionStorage.getItem(_this.arrayLayoutIndex);
                    if (!_this.overParentElement && !_this.overChildElement && sourceArrayIndex !== null) {
                        _this.element.classList.remove('drag-target-top');
                        _this.element.classList.remove('drag-target-bottom');
                    }
                });
                _this.element.addEventListener('drop', function (event) {
                    _this.element.classList.remove('drag-target-top');
                    _this.element.classList.remove('drag-target-bottom');
                    // Confirm that drop target is another item in the same array as source item
                    var sourceArrayIndex = sessionStorage.getItem(_this.arrayLayoutIndex);
                    var destArrayIndex = _this.dataIndex[_this.dataIndex.length - 1];
                    if (sourceArrayIndex !== null && +sourceArrayIndex !== destArrayIndex) {
                        // Move array item
                        _this.jsf.moveArrayItem(_this, +sourceArrayIndex, destArrayIndex);
                    }
                    sessionStorage.removeItem(_this.arrayLayoutIndex);
                    return false;
                });
            });
        }
    };
    return OrderableDirective;
}());
export { OrderableDirective };
OrderableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[orderable]',
            },] },
];
/** @nocollapse */
OrderableDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: JsonSchemaFormService, },
    { type: NgZone, },
]; };
OrderableDirective.propDecorators = {
    "orderable": [{ type: Input },],
    "layoutNode": [{ type: Input },],
    "layoutIndex": [{ type: Input },],
    "dataIndex": [{ type: Input },],
};
//# sourceMappingURL=orderable.directive.js.map
