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
export class OrderableDirective {
    constructor(elementRef, jsf, ngZone) {
        this.elementRef = elementRef;
        this.jsf = jsf;
        this.ngZone = ngZone;
        this.overParentElement = false;
        this.overChildElement = false;
    }
    ngOnInit() {
        if (this.orderable && this.layoutNode && this.layoutIndex && this.dataIndex) {
            this.element = this.elementRef.nativeElement;
            this.element.draggable = true;
            this.arrayLayoutIndex = 'move:' + this.layoutIndex.slice(0, -1).toString();
            this.ngZone.runOutsideAngular(() => {
                // Listeners for movable element being dragged:
                this.element.addEventListener('dragstart', (event) => {
                    event.dataTransfer.effectAllowed = 'move';
                    // Hack to bypass stupid HTML drag-and-drop dataTransfer protection
                    // so drag source info will be available on dragenter
                    const sourceArrayIndex = this.dataIndex[this.dataIndex.length - 1];
                    sessionStorage.setItem(this.arrayLayoutIndex, sourceArrayIndex + '');
                });
                this.element.addEventListener('dragover', (event) => {
                    if (event.preventDefault) {
                        event.preventDefault();
                    }
                    event.dataTransfer.dropEffect = 'move';
                    return false;
                });
                // Listeners for stationary items being dragged over:
                this.element.addEventListener('dragenter', (event) => {
                    // Part 1 of a hack, inspired by Dragster, to simulate mouseover and mouseout
                    // behavior while dragging items - http://bensmithett.github.io/dragster/
                    if (this.overParentElement) {
                        return this.overChildElement = true;
                    }
                    else {
                        this.overParentElement = true;
                    }
                    const sourceArrayIndex = sessionStorage.getItem(this.arrayLayoutIndex);
                    if (sourceArrayIndex !== null) {
                        if (this.dataIndex[this.dataIndex.length - 1] < +sourceArrayIndex) {
                            this.element.classList.add('drag-target-top');
                        }
                        else if (this.dataIndex[this.dataIndex.length - 1] > +sourceArrayIndex) {
                            this.element.classList.add('drag-target-bottom');
                        }
                    }
                });
                this.element.addEventListener('dragleave', (event) => {
                    // Part 2 of the Dragster hack
                    if (this.overChildElement) {
                        this.overChildElement = false;
                    }
                    else if (this.overParentElement) {
                        this.overParentElement = false;
                    }
                    const sourceArrayIndex = sessionStorage.getItem(this.arrayLayoutIndex);
                    if (!this.overParentElement && !this.overChildElement && sourceArrayIndex !== null) {
                        this.element.classList.remove('drag-target-top');
                        this.element.classList.remove('drag-target-bottom');
                    }
                });
                this.element.addEventListener('drop', (event) => {
                    this.element.classList.remove('drag-target-top');
                    this.element.classList.remove('drag-target-bottom');
                    // Confirm that drop target is another item in the same array as source item
                    const sourceArrayIndex = sessionStorage.getItem(this.arrayLayoutIndex);
                    const destArrayIndex = this.dataIndex[this.dataIndex.length - 1];
                    if (sourceArrayIndex !== null && +sourceArrayIndex !== destArrayIndex) {
                        // Move array item
                        this.jsf.moveArrayItem(this, +sourceArrayIndex, destArrayIndex);
                    }
                    sessionStorage.removeItem(this.arrayLayoutIndex);
                    return false;
                });
            });
        }
    }
}
OrderableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[orderable]',
            },] },
];
/** @nocollapse */
OrderableDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: JsonSchemaFormService },
    { type: NgZone }
];
OrderableDirective.propDecorators = {
    orderable: [{ type: Input }],
    layoutNode: [{ type: Input }],
    layoutIndex: [{ type: Input }],
    dataIndex: [{ type: Input }]
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWpzb24tc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJzcmMvc2hhcmVkL29yZGVyYWJsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQWdCLEtBQUssRUFBRSxNQUFNLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFM0YsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHcEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBSUgsTUFBTTtJQVVKLFlBQ1UsVUFBc0IsRUFDdEIsR0FBMEIsRUFDMUIsTUFBYztRQUZkLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsUUFBRyxHQUFILEdBQUcsQ0FBdUI7UUFDMUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVZ4QixzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDMUIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO0lBVXJCLENBQUM7SUFFTCxRQUFRO1FBQ04sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDNUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUM3QyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDOUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUUzRSxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtnQkFFakMsK0NBQStD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QUFDO2dCQUNmLENBQUMsQ0FBQyxDQUFDO1lBRUwsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQzs7O1lBL0ZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTthQUN4Qjs7OztZQTVCbUIsVUFBVTtZQUVyQixxQkFBcUI7WUFGdUIsTUFBTTs7O3dCQWtDeEQsS0FBSzt5QkFDTCxLQUFLOzBCQUNMLEtBQUs7d0JBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgTmdab25lLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSnNvblNjaGVtYUZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJztcbmltcG9ydCB7IEpzb25Qb2ludGVyIH0gZnJvbSAnLi4vc2hhcmVkL2pzb25wb2ludGVyLmZ1bmN0aW9ucyc7XG5cbi8qKlxuICogT3JkZXJhYmxlRGlyZWN0aXZlXG4gKlxuICogRW5hYmxlcyBhcnJheSBlbGVtZW50cyB0byBiZSByZW9yZGVyZWQgYnkgZHJhZ2dpbmcgYW5kIGRyb3BwaW5nLlxuICpcbiAqIE9ubHkgd29ya3MgZm9yIGFycmF5cyB0aGF0IGhhdmUgYXQgbGVhc3QgdHdvIGVsZW1lbnRzLlxuICpcbiAqIEFsc28gZGV0ZWN0cyBhcnJheXMtd2l0aGluLWFycmF5cywgYW5kIGNvcnJlY3RseSBtb3ZlcyBlaXRoZXJcbiAqIHRoZSBjaGlsZCBhcnJheSBlbGVtZW50IG9yIHRoZSBwYXJlbnQgYXJyYXkgZWxlbWVudCxcbiAqIGRlcGVuZGluZyBvbiB0aGUgZHJvcCB0YXJnZXJ0LlxuICpcbiAqIExpc3RlbmVycyBmb3IgbW92YWJsZSBlbGVtZW50IGJlaW5nIGRyYWdnZWQ6XG4gKiAtIGRyYWdzdGFydDogYWRkICdkcmFnZ2luZycgY2xhc3MgdG8gZWxlbWVudCwgc2V0IGVmZmVjdEFsbG93ZWQgPSAnbW92ZSdcbiAqIC0gZHJhZ292ZXI6IHNldCBkcm9wRWZmZWN0ID0gJ21vdmUnXG4gKiAtIGRyYWdlbmQ6IHJlbW92ZSAnZHJhZ2dpbmcnIGNsYXNzIGZyb20gZWxlbWVudFxuICpcbiAqIExpc3RlbmVycyBmb3Igc3RhdGlvbmFyeSBpdGVtcyBiZWluZyBkcmFnZ2VkIG92ZXI6XG4gKiAtIGRyYWdlbnRlcjogYWRkICdkcmFnLXRhcmdldC0uLi4nIGNsYXNzZXMgdG8gZWxlbWVudFxuICogLSBkcmFnbGVhdmU6IHJlbW92ZSAnZHJhZy10YXJnZXQtLi4uJyBjbGFzc2VzIGZyb20gZWxlbWVudFxuICogLSBkcm9wOiByZW1vdmUgJ2RyYWctdGFyZ2V0LS4uLicgY2xhc3NlcyBmcm9tIGVsZW1lbnQsIG1vdmUgZHJvcHBlZCBhcnJheSBpdGVtXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tvcmRlcmFibGVdJyxcbn0pXG5leHBvcnQgY2xhc3MgT3JkZXJhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgYXJyYXlMYXlvdXRJbmRleDogc3RyaW5nO1xuICBlbGVtZW50OiBhbnk7XG4gIG92ZXJQYXJlbnRFbGVtZW50ID0gZmFsc2U7XG4gIG92ZXJDaGlsZEVsZW1lbnQgPSBmYWxzZTtcbiAgQElucHV0KCkgb3JkZXJhYmxlOiBib29sZWFuO1xuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnk7XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXTtcbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZSxcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMub3JkZXJhYmxlICYmIHRoaXMubGF5b3V0Tm9kZSAmJiB0aGlzLmxheW91dEluZGV4ICYmIHRoaXMuZGF0YUluZGV4KSB7XG4gICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgIHRoaXMuZWxlbWVudC5kcmFnZ2FibGUgPSB0cnVlO1xuICAgICAgdGhpcy5hcnJheUxheW91dEluZGV4ID0gJ21vdmU6JyArIHRoaXMubGF5b3V0SW5kZXguc2xpY2UoMCwgLTEpLnRvU3RyaW5nKCk7XG5cbiAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcblxuICAgICAgICAvLyBMaXN0ZW5lcnMgZm9yIG1vdmFibGUgZWxlbWVudCBiZWluZyBkcmFnZ2VkOlxuXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcbiAgICAgICAgICAvLyBIYWNrIHRvIGJ5cGFzcyBzdHVwaWQgSFRNTCBkcmFnLWFuZC1kcm9wIGRhdGFUcmFuc2ZlciBwcm90ZWN0aW9uXG4gICAgICAgICAgLy8gc28gZHJhZyBzb3VyY2UgaW5mbyB3aWxsIGJlIGF2YWlsYWJsZSBvbiBkcmFnZW50ZXJcbiAgICAgICAgICBjb25zdCBzb3VyY2VBcnJheUluZGV4ID0gdGhpcy5kYXRhSW5kZXhbdGhpcy5kYXRhSW5kZXgubGVuZ3RoIC0gMV07XG4gICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmFycmF5TGF5b3V0SW5kZXgsIHNvdXJjZUFycmF5SW5kZXggKyAnJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChldmVudCkgPT4ge1xuICAgICAgICAgIGlmIChldmVudC5wcmV2ZW50RGVmYXVsdCkgeyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyB9XG4gICAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBMaXN0ZW5lcnMgZm9yIHN0YXRpb25hcnkgaXRlbXMgYmVpbmcgZHJhZ2dlZCBvdmVyOlxuXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAvLyBQYXJ0IDEgb2YgYSBoYWNrLCBpbnNwaXJlZCBieSBEcmFnc3RlciwgdG8gc2ltdWxhdGUgbW91c2VvdmVyIGFuZCBtb3VzZW91dFxuICAgICAgICAgIC8vIGJlaGF2aW9yIHdoaWxlIGRyYWdnaW5nIGl0ZW1zIC0gaHR0cDovL2JlbnNtaXRoZXR0LmdpdGh1Yi5pby9kcmFnc3Rlci9cbiAgICAgICAgICBpZiAodGhpcy5vdmVyUGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3ZlckNoaWxkRWxlbWVudCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3ZlclBhcmVudEVsZW1lbnQgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHNvdXJjZUFycmF5SW5kZXggPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHRoaXMuYXJyYXlMYXlvdXRJbmRleCk7XG4gICAgICAgICAgaWYgKHNvdXJjZUFycmF5SW5kZXggIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFJbmRleFt0aGlzLmRhdGFJbmRleC5sZW5ndGggLSAxXSA8ICtzb3VyY2VBcnJheUluZGV4KSB7XG4gICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkcmFnLXRhcmdldC10b3AnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhSW5kZXhbdGhpcy5kYXRhSW5kZXgubGVuZ3RoIC0gMV0gPiArc291cmNlQXJyYXlJbmRleCkge1xuICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHJhZy10YXJnZXQtYm90dG9tJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgLy8gUGFydCAyIG9mIHRoZSBEcmFnc3RlciBoYWNrXG4gICAgICAgICAgaWYgKHRoaXMub3ZlckNoaWxkRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5vdmVyQ2hpbGRFbGVtZW50ID0gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm92ZXJQYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJQYXJlbnRFbGVtZW50ID0gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgc291cmNlQXJyYXlJbmRleCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0odGhpcy5hcnJheUxheW91dEluZGV4KTtcbiAgICAgICAgICBpZiAoIXRoaXMub3ZlclBhcmVudEVsZW1lbnQgJiYgIXRoaXMub3ZlckNoaWxkRWxlbWVudCAmJiBzb3VyY2VBcnJheUluZGV4ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZy10YXJnZXQtdG9wJyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZy10YXJnZXQtYm90dG9tJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIChldmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLXRhcmdldC10b3AnKTtcbiAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZy10YXJnZXQtYm90dG9tJyk7XG4gICAgICAgICAgLy8gQ29uZmlybSB0aGF0IGRyb3AgdGFyZ2V0IGlzIGFub3RoZXIgaXRlbSBpbiB0aGUgc2FtZSBhcnJheSBhcyBzb3VyY2UgaXRlbVxuICAgICAgICAgIGNvbnN0IHNvdXJjZUFycmF5SW5kZXggPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHRoaXMuYXJyYXlMYXlvdXRJbmRleCk7XG4gICAgICAgICAgY29uc3QgZGVzdEFycmF5SW5kZXggPSB0aGlzLmRhdGFJbmRleFt0aGlzLmRhdGFJbmRleC5sZW5ndGggLSAxXTtcbiAgICAgICAgICBpZiAoc291cmNlQXJyYXlJbmRleCAhPT0gbnVsbCAmJiArc291cmNlQXJyYXlJbmRleCAhPT0gZGVzdEFycmF5SW5kZXgpIHtcbiAgICAgICAgICAgIC8vIE1vdmUgYXJyYXkgaXRlbVxuICAgICAgICAgICAgdGhpcy5qc2YubW92ZUFycmF5SXRlbSh0aGlzLCArc291cmNlQXJyYXlJbmRleCwgZGVzdEFycmF5SW5kZXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuYXJyYXlMYXlvdXRJbmRleCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=