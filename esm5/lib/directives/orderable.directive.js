import { Directive, ElementRef, Input, NgZone } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
var OrderableDirective = (function () {
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
            this.ngZone.runOutsideAngular((function () {
                _this.element.addEventListener('dragstart', (function (event) {
                    event.dataTransfer.effectAllowed = 'move';
                    var sourceArrayIndex = _this.dataIndex[_this.dataIndex.length - 1];
                    sessionStorage.setItem(_this.arrayLayoutIndex, sourceArrayIndex + '');
                }));
                _this.element.addEventListener('dragover', (function (event) {
                    if (event.preventDefault) {
                        event.preventDefault();
                    }
                    event.dataTransfer.dropEffect = 'move';
                    return false;
                }));
                _this.element.addEventListener('dragenter', (function (event) {
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
                }));
                _this.element.addEventListener('dragleave', (function (event) {
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
                }));
                _this.element.addEventListener('drop', (function (event) {
                    _this.element.classList.remove('drag-target-top');
                    _this.element.classList.remove('drag-target-bottom');
                    var sourceArrayIndex = sessionStorage.getItem(_this.arrayLayoutIndex);
                    var destArrayIndex = _this.dataIndex[_this.dataIndex.length - 1];
                    if (sourceArrayIndex !== null && +sourceArrayIndex !== destArrayIndex) {
                        _this.jsf.moveArrayItem(_this, +sourceArrayIndex, destArrayIndex);
                    }
                    sessionStorage.removeItem(_this.arrayLayoutIndex);
                    return false;
                }));
            }));
        }
    };
    OrderableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[orderable]',
                },] }
    ];
    OrderableDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: JsonSchemaFormService },
        { type: NgZone }
    ]; };
    OrderableDirective.propDecorators = {
        orderable: [{ type: Input }],
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return OrderableDirective;
}());
export { OrderableDirective };
if (false) {
    OrderableDirective.prototype.arrayLayoutIndex;
    OrderableDirective.prototype.element;
    OrderableDirective.prototype.overParentElement;
    OrderableDirective.prototype.overChildElement;
    OrderableDirective.prototype.orderable;
    OrderableDirective.prototype.layoutNode;
    OrderableDirective.prototype.layoutIndex;
    OrderableDirective.prototype.dataIndex;
    OrderableDirective.prototype.elementRef;
    OrderableDirective.prototype.jsf;
    OrderableDirective.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL3dpZGdldC1saWJyYXJ5LyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvb3JkZXJhYmxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFTLE1BQU0sZUFBZSxDQUFBO0FBQzFFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFBO0FBdUIxRTtJQWFFLDRCQUNVLFVBQXNCLEVBQ3RCLEdBQTBCLEVBQzFCLE1BQWM7UUFGZCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFFBQUcsR0FBSCxHQUFHLENBQXVCO1FBQzFCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFWeEIsc0JBQWlCLEdBQUcsS0FBSyxDQUFBO1FBQ3pCLHFCQUFnQixHQUFHLEtBQUssQ0FBQTtJQVd4QixDQUFDO0lBRUQscUNBQVEsR0FBUjtRQUFBLGlCQTZFQztRQTVFQyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDM0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQTtZQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7WUFDN0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtZQUUxRSxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFDO2dCQUk1QixLQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsR0FBRSxVQUFDLEtBQUs7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Z0JBQWdCLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUM7d0JBQ2hFLGNBQWMsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDaEUsSUFBSSxnQkFBZ0IsS0FBSyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxjQUFjLEVBQUU7d0JBRXJFLEtBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUksRUFBRSxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFBO3FCQUNoRTtvQkFDRCxjQUFjLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO29CQUNoRCxPQUFPLEtBQUssQ0FBQTtnQkFDZCxDQUFDLEVBQUMsQ0FBQTtZQUNKLENBQUMsRUFBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDOztnQkFqR0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO2lCQUN4Qjs7O2dCQTFCa0IsVUFBVTtnQkFDckIscUJBQXFCO2dCQURTLE1BQU07Ozs0QkFnQ3pDLEtBQUs7NkJBQ0wsS0FBSzs4QkFDTCxLQUFLOzRCQUNMLEtBQUs7O0lBdUZSLHlCQUFDO0NBQUEsQUFsR0QsSUFrR0M7U0EvRlksa0JBQWtCOztJQUM3Qiw4Q0FBd0I7SUFDeEIscUNBQVk7SUFDWiwrQ0FBeUI7SUFDekIsOENBQXdCO0lBQ3hCLHVDQUEyQjtJQUMzQix3Q0FBd0I7SUFDeEIseUNBQThCO0lBQzlCLHVDQUE0QjtJQUcxQix3Q0FBOEI7SUFDOUIsaUNBQWtDO0lBQ2xDLG9DQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgTmdab25lLCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJ1xuXG4vKipcbiAqIE9yZGVyYWJsZURpcmVjdGl2ZVxuICpcbiAqIEVuYWJsZXMgYXJyYXkgZWxlbWVudHMgdG8gYmUgcmVvcmRlcmVkIGJ5IGRyYWdnaW5nIGFuZCBkcm9wcGluZy5cbiAqXG4gKiBPbmx5IHdvcmtzIGZvciBhcnJheXMgdGhhdCBoYXZlIGF0IGxlYXN0IHR3byBlbGVtZW50cy5cbiAqXG4gKiBBbHNvIGRldGVjdHMgYXJyYXlzLXdpdGhpbi1hcnJheXMsIGFuZCBjb3JyZWN0bHkgbW92ZXMgZWl0aGVyXG4gKiB0aGUgY2hpbGQgYXJyYXkgZWxlbWVudCBvciB0aGUgcGFyZW50IGFycmF5IGVsZW1lbnQsXG4gKiBkZXBlbmRpbmcgb24gdGhlIGRyb3AgdGFyZ2VydC5cbiAqXG4gKiBMaXN0ZW5lcnMgZm9yIG1vdmFibGUgZWxlbWVudCBiZWluZyBkcmFnZ2VkOlxuICogLSBkcmFnc3RhcnQ6IGFkZCAnZHJhZ2dpbmcnIGNsYXNzIHRvIGVsZW1lbnQsIHNldCBlZmZlY3RBbGxvd2VkID0gJ21vdmUnXG4gKiAtIGRyYWdvdmVyOiBzZXQgZHJvcEVmZmVjdCA9ICdtb3ZlJ1xuICogLSBkcmFnZW5kOiByZW1vdmUgJ2RyYWdnaW5nJyBjbGFzcyBmcm9tIGVsZW1lbnRcbiAqXG4gKiBMaXN0ZW5lcnMgZm9yIHN0YXRpb25hcnkgaXRlbXMgYmVpbmcgZHJhZ2dlZCBvdmVyOlxuICogLSBkcmFnZW50ZXI6IGFkZCAnZHJhZy10YXJnZXQtLi4uJyBjbGFzc2VzIHRvIGVsZW1lbnRcbiAqIC0gZHJhZ2xlYXZlOiByZW1vdmUgJ2RyYWctdGFyZ2V0LS4uLicgY2xhc3NlcyBmcm9tIGVsZW1lbnRcbiAqIC0gZHJvcDogcmVtb3ZlICdkcmFnLXRhcmdldC0uLi4nIGNsYXNzZXMgZnJvbSBlbGVtZW50LCBtb3ZlIGRyb3BwZWQgYXJyYXkgaXRlbVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbb3JkZXJhYmxlXScsXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyYWJsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGFycmF5TGF5b3V0SW5kZXg6IHN0cmluZ1xuICBlbGVtZW50OiBhbnlcbiAgb3ZlclBhcmVudEVsZW1lbnQgPSBmYWxzZVxuICBvdmVyQ2hpbGRFbGVtZW50ID0gZmFsc2VcbiAgQElucHV0KCkgb3JkZXJhYmxlOiBib29sZWFuXG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlLFxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmVcbiAgKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5vcmRlcmFibGUgJiYgdGhpcy5sYXlvdXROb2RlICYmIHRoaXMubGF5b3V0SW5kZXggJiYgdGhpcy5kYXRhSW5kZXgpIHtcbiAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50XG4gICAgICB0aGlzLmVsZW1lbnQuZHJhZ2dhYmxlID0gdHJ1ZVxuICAgICAgdGhpcy5hcnJheUxheW91dEluZGV4ID0gJ21vdmU6JyArIHRoaXMubGF5b3V0SW5kZXguc2xpY2UoMCwgLTEpLnRvU3RyaW5nKClcblxuICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuXG4gICAgICAgIC8vIExpc3RlbmVycyBmb3IgbW92YWJsZSBlbGVtZW50IGJlaW5nIGRyYWdnZWQ6XG5cbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIChldmVudCkgPT4ge1xuICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnXG4gICAgICAgICAgLy8gSGFjayB0byBieXBhc3Mgc3R1cGlkIEhUTUwgZHJhZy1hbmQtZHJvcCBkYXRhVHJhbnNmZXIgcHJvdGVjdGlvblxuICAgICAgICAgIC8vIHNvIGRyYWcgc291cmNlIGluZm8gd2lsbCBiZSBhdmFpbGFibGUgb24gZHJhZ2VudGVyXG4gICAgICAgICAgY29uc3Qgc291cmNlQXJyYXlJbmRleCA9IHRoaXMuZGF0YUluZGV4W3RoaXMuZGF0YUluZGV4Lmxlbmd0aCAtIDFdXG4gICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmFycmF5TGF5b3V0SW5kZXgsIHNvdXJjZUFycmF5SW5kZXggKyAnJylcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICBpZiAoZXZlbnQucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICB9XG4gICAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSdcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSlcblxuICAgICAgICAvLyBMaXN0ZW5lcnMgZm9yIHN0YXRpb25hcnkgaXRlbXMgYmVpbmcgZHJhZ2dlZCBvdmVyOlxuXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAvLyBQYXJ0IDEgb2YgYSBoYWNrLCBpbnNwaXJlZCBieSBEcmFnc3RlciwgdG8gc2ltdWxhdGUgbW91c2VvdmVyIGFuZCBtb3VzZW91dFxuICAgICAgICAgIC8vIGJlaGF2aW9yIHdoaWxlIGRyYWdnaW5nIGl0ZW1zIC0gaHR0cDovL2JlbnNtaXRoZXR0LmdpdGh1Yi5pby9kcmFnc3Rlci9cbiAgICAgICAgICBpZiAodGhpcy5vdmVyUGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3ZlckNoaWxkRWxlbWVudCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vdmVyUGFyZW50RWxlbWVudCA9IHRydWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBzb3VyY2VBcnJheUluZGV4ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmFycmF5TGF5b3V0SW5kZXgpXG4gICAgICAgICAgaWYgKHNvdXJjZUFycmF5SW5kZXggIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFJbmRleFt0aGlzLmRhdGFJbmRleC5sZW5ndGggLSAxXSA8ICtzb3VyY2VBcnJheUluZGV4KSB7XG4gICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkcmFnLXRhcmdldC10b3AnKVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGFJbmRleFt0aGlzLmRhdGFJbmRleC5sZW5ndGggLSAxXSA+ICtzb3VyY2VBcnJheUluZGV4KSB7XG4gICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkcmFnLXRhcmdldC1ib3R0b20nKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgLy8gUGFydCAyIG9mIHRoZSBEcmFnc3RlciBoYWNrXG4gICAgICAgICAgaWYgKHRoaXMub3ZlckNoaWxkRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5vdmVyQ2hpbGRFbGVtZW50ID0gZmFsc2VcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3ZlclBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlclBhcmVudEVsZW1lbnQgPSBmYWxzZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHNvdXJjZUFycmF5SW5kZXggPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHRoaXMuYXJyYXlMYXlvdXRJbmRleClcbiAgICAgICAgICBpZiAoIXRoaXMub3ZlclBhcmVudEVsZW1lbnQgJiYgIXRoaXMub3ZlckNoaWxkRWxlbWVudCAmJiBzb3VyY2VBcnJheUluZGV4ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZy10YXJnZXQtdG9wJylcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLXRhcmdldC1ib3R0b20nKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIChldmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLXRhcmdldC10b3AnKVxuICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLXRhcmdldC1ib3R0b20nKVxuICAgICAgICAgIC8vIENvbmZpcm0gdGhhdCBkcm9wIHRhcmdldCBpcyBhbm90aGVyIGl0ZW0gaW4gdGhlIHNhbWUgYXJyYXkgYXMgc291cmNlIGl0ZW1cbiAgICAgICAgICBjb25zdCBzb3VyY2VBcnJheUluZGV4ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmFycmF5TGF5b3V0SW5kZXgpXG4gICAgICAgICAgY29uc3QgZGVzdEFycmF5SW5kZXggPSB0aGlzLmRhdGFJbmRleFt0aGlzLmRhdGFJbmRleC5sZW5ndGggLSAxXVxuICAgICAgICAgIGlmIChzb3VyY2VBcnJheUluZGV4ICE9PSBudWxsICYmICtzb3VyY2VBcnJheUluZGV4ICE9PSBkZXN0QXJyYXlJbmRleCkge1xuICAgICAgICAgICAgLy8gTW92ZSBhcnJheSBpdGVtXG4gICAgICAgICAgICB0aGlzLmpzZi5tb3ZlQXJyYXlJdGVtKHRoaXMsICtzb3VyY2VBcnJheUluZGV4LCBkZXN0QXJyYXlJbmRleClcbiAgICAgICAgICB9XG4gICAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLmFycmF5TGF5b3V0SW5kZXgpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuIl19