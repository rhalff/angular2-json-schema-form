import { Directive, ElementRef, Input, NgZone } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
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
            this.ngZone.runOutsideAngular((() => {
                this.element.addEventListener('dragstart', ((event) => {
                    event.dataTransfer.effectAllowed = 'move';
                    const sourceArrayIndex = this.dataIndex[this.dataIndex.length - 1];
                    sessionStorage.setItem(this.arrayLayoutIndex, sourceArrayIndex + '');
                }));
                this.element.addEventListener('dragover', ((event) => {
                    if (event.preventDefault) {
                        event.preventDefault();
                    }
                    event.dataTransfer.dropEffect = 'move';
                    return false;
                }));
                this.element.addEventListener('dragenter', ((event) => {
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
                }));
                this.element.addEventListener('dragleave', ((event) => {
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
                }));
                this.element.addEventListener('drop', ((event) => {
                    this.element.classList.remove('drag-target-top');
                    this.element.classList.remove('drag-target-bottom');
                    const sourceArrayIndex = sessionStorage.getItem(this.arrayLayoutIndex);
                    const destArrayIndex = this.dataIndex[this.dataIndex.length - 1];
                    if (sourceArrayIndex !== null && +sourceArrayIndex !== destArrayIndex) {
                        this.jsf.moveArrayItem(this, +sourceArrayIndex, destArrayIndex);
                    }
                    sessionStorage.removeItem(this.arrayLayoutIndex);
                    return false;
                }));
            }));
        }
    }
}
OrderableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[orderable]',
            },] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL3dpZGdldC1saWJyYXJ5LyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvb3JkZXJhYmxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFTLE1BQU0sZUFBZSxDQUFBO0FBQzFFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFBO0FBMEIxRSxNQUFNLE9BQU8sa0JBQWtCO0lBVTdCLFlBQ1UsVUFBc0IsRUFDdEIsR0FBMEIsRUFDMUIsTUFBYztRQUZkLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsUUFBRyxHQUFILEdBQUcsQ0FBdUI7UUFDMUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVZ4QixzQkFBaUIsR0FBRyxLQUFLLENBQUE7UUFDekIscUJBQWdCLEdBQUcsS0FBSyxDQUFBO0lBV3hCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzNFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUE7WUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO1lBQzdCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7WUFFMUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBQyxHQUFHLEVBQUU7Z0JBSWpDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxHQUFFLENB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QUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUE7MEJBRTdDLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDOzBCQUNoRSxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7b0JBQ2hFLElBQUksZ0JBQWdCLEtBQUssSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEtBQUssY0FBYyxFQUFFO3dCQUVyRSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsQ0FBQTtxQkFDaEU7b0JBQ0QsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtvQkFDaEQsT0FBTyxLQUFLLENBQUE7Z0JBQ2QsQ0FBQyxFQUFDLENBQUE7WUFDSixDQUFDLEVBQUMsQ0FBQTtTQUNIO0lBQ0gsQ0FBQzs7O1lBakdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTthQUN4Qjs7O1lBMUJrQixVQUFVO1lBQ3JCLHFCQUFxQjtZQURTLE1BQU07Ozt3QkFnQ3pDLEtBQUs7eUJBQ0wsS0FBSzswQkFDTCxLQUFLO3dCQUNMLEtBQUs7OztJQVBOLDhDQUF3QjtJQUN4QixxQ0FBWTtJQUNaLCtDQUF5QjtJQUN6Qiw4Q0FBd0I7SUFDeEIsdUNBQTJCO0lBQzNCLHdDQUF3QjtJQUN4Qix5Q0FBOEI7SUFDOUIsdUNBQTRCO0lBRzFCLHdDQUE4QjtJQUM5QixpQ0FBa0M7SUFDbEMsb0NBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBOZ1pvbmUsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9qc29uLXNjaGVtYS1mb3JtLnNlcnZpY2UnXG5cbi8qKlxuICogT3JkZXJhYmxlRGlyZWN0aXZlXG4gKlxuICogRW5hYmxlcyBhcnJheSBlbGVtZW50cyB0byBiZSByZW9yZGVyZWQgYnkgZHJhZ2dpbmcgYW5kIGRyb3BwaW5nLlxuICpcbiAqIE9ubHkgd29ya3MgZm9yIGFycmF5cyB0aGF0IGhhdmUgYXQgbGVhc3QgdHdvIGVsZW1lbnRzLlxuICpcbiAqIEFsc28gZGV0ZWN0cyBhcnJheXMtd2l0aGluLWFycmF5cywgYW5kIGNvcnJlY3RseSBtb3ZlcyBlaXRoZXJcbiAqIHRoZSBjaGlsZCBhcnJheSBlbGVtZW50IG9yIHRoZSBwYXJlbnQgYXJyYXkgZWxlbWVudCxcbiAqIGRlcGVuZGluZyBvbiB0aGUgZHJvcCB0YXJnZXJ0LlxuICpcbiAqIExpc3RlbmVycyBmb3IgbW92YWJsZSBlbGVtZW50IGJlaW5nIGRyYWdnZWQ6XG4gKiAtIGRyYWdzdGFydDogYWRkICdkcmFnZ2luZycgY2xhc3MgdG8gZWxlbWVudCwgc2V0IGVmZmVjdEFsbG93ZWQgPSAnbW92ZSdcbiAqIC0gZHJhZ292ZXI6IHNldCBkcm9wRWZmZWN0ID0gJ21vdmUnXG4gKiAtIGRyYWdlbmQ6IHJlbW92ZSAnZHJhZ2dpbmcnIGNsYXNzIGZyb20gZWxlbWVudFxuICpcbiAqIExpc3RlbmVycyBmb3Igc3RhdGlvbmFyeSBpdGVtcyBiZWluZyBkcmFnZ2VkIG92ZXI6XG4gKiAtIGRyYWdlbnRlcjogYWRkICdkcmFnLXRhcmdldC0uLi4nIGNsYXNzZXMgdG8gZWxlbWVudFxuICogLSBkcmFnbGVhdmU6IHJlbW92ZSAnZHJhZy10YXJnZXQtLi4uJyBjbGFzc2VzIGZyb20gZWxlbWVudFxuICogLSBkcm9wOiByZW1vdmUgJ2RyYWctdGFyZ2V0LS4uLicgY2xhc3NlcyBmcm9tIGVsZW1lbnQsIG1vdmUgZHJvcHBlZCBhcnJheSBpdGVtXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tvcmRlcmFibGVdJyxcbn0pXG5leHBvcnQgY2xhc3MgT3JkZXJhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgYXJyYXlMYXlvdXRJbmRleDogc3RyaW5nXG4gIGVsZW1lbnQ6IGFueVxuICBvdmVyUGFyZW50RWxlbWVudCA9IGZhbHNlXG4gIG92ZXJDaGlsZEVsZW1lbnQgPSBmYWxzZVxuICBASW5wdXQoKSBvcmRlcmFibGU6IGJvb2xlYW5cbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxuICApIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLm9yZGVyYWJsZSAmJiB0aGlzLmxheW91dE5vZGUgJiYgdGhpcy5sYXlvdXRJbmRleCAmJiB0aGlzLmRhdGFJbmRleCkge1xuICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnRcbiAgICAgIHRoaXMuZWxlbWVudC5kcmFnZ2FibGUgPSB0cnVlXG4gICAgICB0aGlzLmFycmF5TGF5b3V0SW5kZXggPSAnbW92ZTonICsgdGhpcy5sYXlvdXRJbmRleC5zbGljZSgwLCAtMSkudG9TdHJpbmcoKVxuXG4gICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG5cbiAgICAgICAgLy8gTGlzdGVuZXJzIGZvciBtb3ZhYmxlIGVsZW1lbnQgYmVpbmcgZHJhZ2dlZDpcblxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSdcbiAgICAgICAgICAvLyBIYWNrIHRvIGJ5cGFzcyBzdHVwaWQgSFRNTCBkcmFnLWFuZC1kcm9wIGRhdGFUcmFuc2ZlciBwcm90ZWN0aW9uXG4gICAgICAgICAgLy8gc28gZHJhZyBzb3VyY2UgaW5mbyB3aWxsIGJlIGF2YWlsYWJsZSBvbiBkcmFnZW50ZXJcbiAgICAgICAgICBjb25zdCBzb3VyY2VBcnJheUluZGV4ID0gdGhpcy5kYXRhSW5kZXhbdGhpcy5kYXRhSW5kZXgubGVuZ3RoIC0gMV1cbiAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHRoaXMuYXJyYXlMYXlvdXRJbmRleCwgc291cmNlQXJyYXlJbmRleCArICcnKVxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChldmVudCkgPT4ge1xuICAgICAgICAgIGlmIChldmVudC5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgIH1cbiAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJ1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIExpc3RlbmVycyBmb3Igc3RhdGlvbmFyeSBpdGVtcyBiZWluZyBkcmFnZ2VkIG92ZXI6XG5cbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIChldmVudCkgPT4ge1xuICAgICAgICAgIC8vIFBhcnQgMSBvZiBhIGhhY2ssIGluc3BpcmVkIGJ5IERyYWdzdGVyLCB0byBzaW11bGF0ZSBtb3VzZW92ZXIgYW5kIG1vdXNlb3V0XG4gICAgICAgICAgLy8gYmVoYXZpb3Igd2hpbGUgZHJhZ2dpbmcgaXRlbXMgLSBodHRwOi8vYmVuc21pdGhldHQuZ2l0aHViLmlvL2RyYWdzdGVyL1xuICAgICAgICAgIGlmICh0aGlzLm92ZXJQYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vdmVyQ2hpbGRFbGVtZW50ID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJQYXJlbnRFbGVtZW50ID0gdHJ1ZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHNvdXJjZUFycmF5SW5kZXggPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHRoaXMuYXJyYXlMYXlvdXRJbmRleClcbiAgICAgICAgICBpZiAoc291cmNlQXJyYXlJbmRleCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YUluZGV4W3RoaXMuZGF0YUluZGV4Lmxlbmd0aCAtIDFdIDwgK3NvdXJjZUFycmF5SW5kZXgpIHtcbiAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2RyYWctdGFyZ2V0LXRvcCcpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YUluZGV4W3RoaXMuZGF0YUluZGV4Lmxlbmd0aCAtIDFdID4gK3NvdXJjZUFycmF5SW5kZXgpIHtcbiAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2RyYWctdGFyZ2V0LWJvdHRvbScpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAvLyBQYXJ0IDIgb2YgdGhlIERyYWdzdGVyIGhhY2tcbiAgICAgICAgICBpZiAodGhpcy5vdmVyQ2hpbGRFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJDaGlsZEVsZW1lbnQgPSBmYWxzZVxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vdmVyUGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5vdmVyUGFyZW50RWxlbWVudCA9IGZhbHNlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgc291cmNlQXJyYXlJbmRleCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0odGhpcy5hcnJheUxheW91dEluZGV4KVxuICAgICAgICAgIGlmICghdGhpcy5vdmVyUGFyZW50RWxlbWVudCAmJiAhdGhpcy5vdmVyQ2hpbGRFbGVtZW50ICYmIHNvdXJjZUFycmF5SW5kZXggIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLXRhcmdldC10b3AnKVxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWctdGFyZ2V0LWJvdHRvbScpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWctdGFyZ2V0LXRvcCcpXG4gICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWctdGFyZ2V0LWJvdHRvbScpXG4gICAgICAgICAgLy8gQ29uZmlybSB0aGF0IGRyb3AgdGFyZ2V0IGlzIGFub3RoZXIgaXRlbSBpbiB0aGUgc2FtZSBhcnJheSBhcyBzb3VyY2UgaXRlbVxuICAgICAgICAgIGNvbnN0IHNvdXJjZUFycmF5SW5kZXggPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHRoaXMuYXJyYXlMYXlvdXRJbmRleClcbiAgICAgICAgICBjb25zdCBkZXN0QXJyYXlJbmRleCA9IHRoaXMuZGF0YUluZGV4W3RoaXMuZGF0YUluZGV4Lmxlbmd0aCAtIDFdXG4gICAgICAgICAgaWYgKHNvdXJjZUFycmF5SW5kZXggIT09IG51bGwgJiYgK3NvdXJjZUFycmF5SW5kZXggIT09IGRlc3RBcnJheUluZGV4KSB7XG4gICAgICAgICAgICAvLyBNb3ZlIGFycmF5IGl0ZW1cbiAgICAgICAgICAgIHRoaXMuanNmLm1vdmVBcnJheUl0ZW0odGhpcywgK3NvdXJjZUFycmF5SW5kZXgsIGRlc3RBcnJheUluZGV4KVxuICAgICAgICAgIH1cbiAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuYXJyYXlMYXlvdXRJbmRleClcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iXX0=