import { Directive, ElementRef, Input, NgZone } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/json-schema-form.service";
class OrderableDirective {
    elementRef;
    jsf;
    ngZone;
    arrayLayoutIndex;
    element;
    overParentElement = false;
    overChildElement = false;
    orderable;
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(elementRef, jsf, ngZone) {
        this.elementRef = elementRef;
        this.jsf = jsf;
        this.ngZone = ngZone;
    }
    ngOnInit() {
        if (this.orderable && this.layoutNode && this.layoutIndex && this.dataIndex) {
            this.element = this.elementRef.nativeElement;
            this.element.draggable = true;
            this.arrayLayoutIndex = 'move:' + this.layoutIndex.slice(0, -1).toString();
            this.ngZone.runOutsideAngular(() => {
                this.element.addEventListener('dragstart', (event) => {
                    event.dataTransfer.effectAllowed = 'move';
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
                this.element.addEventListener('dragenter', (event) => {
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
                    const sourceArrayIndex = sessionStorage.getItem(this.arrayLayoutIndex);
                    const destArrayIndex = this.dataIndex[this.dataIndex.length - 1];
                    if (sourceArrayIndex !== null && +sourceArrayIndex !== destArrayIndex) {
                        this.jsf.moveArrayItem(this, +sourceArrayIndex, destArrayIndex);
                    }
                    sessionStorage.removeItem(this.arrayLayoutIndex);
                    return false;
                });
            });
        }
    }
    static ɵfac = function OrderableDirective_Factory(t) { return new (t || OrderableDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.JsonSchemaFormService), i0.ɵɵdirectiveInject(i0.NgZone)); };
    static ɵdir = i0.ɵɵdefineDirective({ type: OrderableDirective, selectors: [["", "orderable", ""]], inputs: { orderable: "orderable", layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" } });
}
export { OrderableDirective };
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OrderableDirective, [{
        type: Directive,
        args: [{
                selector: '[orderable]',
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.JsonSchemaFormService }, { type: i0.NgZone }]; }, { orderable: [{
            type: Input
        }], layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nc2Ytd2lkZ2V0LWxpYnJhcnkvc3JjL2xpYi9kaXJlY3RpdmVzL29yZGVyYWJsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBUyxNQUFNLGVBQWUsQ0FBQTtBQUMxRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQTs7O0FBdUIxRSxNQUdhLGtCQUFrQjtJQVduQjtJQUNBO0lBQ0E7SUFaVixnQkFBZ0IsQ0FBUTtJQUN4QixPQUFPLENBQUs7SUFDWixpQkFBaUIsR0FBRyxLQUFLLENBQUE7SUFDekIsZ0JBQWdCLEdBQUcsS0FBSyxDQUFBO0lBQ2YsU0FBUyxDQUFTO0lBQ2xCLFVBQVUsQ0FBSztJQUNmLFdBQVcsQ0FBVTtJQUNyQixTQUFTLENBQVU7SUFFNUIsWUFDVSxVQUFzQixFQUN0QixHQUEwQixFQUMxQixNQUFjO1FBRmQsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQUMxQixXQUFNLEdBQU4sTUFBTSxDQUFRO0lBRXhCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzNFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUE7WUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO1lBQzdCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENB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ZSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSdcblxuLyoqXG4gKiBPcmRlcmFibGVEaXJlY3RpdmVcbiAqXG4gKiBFbmFibGVzIGFycmF5IGVsZW1lbnRzIHRvIGJlIHJlb3JkZXJlZCBieSBkcmFnZ2luZyBhbmQgZHJvcHBpbmcuXG4gKlxuICogT25seSB3b3JrcyBmb3IgYXJyYXlzIHRoYXQgaGF2ZSBhdCBsZWFzdCB0d28gZWxlbWVudHMuXG4gKlxuICogQWxzbyBkZXRlY3RzIGFycmF5cy13aXRoaW4tYXJyYXlzLCBhbmQgY29ycmVjdGx5IG1vdmVzIGVpdGhlclxuICogdGhlIGNoaWxkIGFycmF5IGVsZW1lbnQgb3IgdGhlIHBhcmVudCBhcnJheSBlbGVtZW50LFxuICogZGVwZW5kaW5nIG9uIHRoZSBkcm9wIHRhcmdlcnQuXG4gKlxuICogTGlzdGVuZXJzIGZvciBtb3ZhYmxlIGVsZW1lbnQgYmVpbmcgZHJhZ2dlZDpcbiAqIC0gZHJhZ3N0YXJ0OiBhZGQgJ2RyYWdnaW5nJyBjbGFzcyB0byBlbGVtZW50LCBzZXQgZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJ1xuICogLSBkcmFnb3Zlcjogc2V0IGRyb3BFZmZlY3QgPSAnbW92ZSdcbiAqIC0gZHJhZ2VuZDogcmVtb3ZlICdkcmFnZ2luZycgY2xhc3MgZnJvbSBlbGVtZW50XG4gKlxuICogTGlzdGVuZXJzIGZvciBzdGF0aW9uYXJ5IGl0ZW1zIGJlaW5nIGRyYWdnZWQgb3ZlcjpcbiAqIC0gZHJhZ2VudGVyOiBhZGQgJ2RyYWctdGFyZ2V0LS4uLicgY2xhc3NlcyB0byBlbGVtZW50XG4gKiAtIGRyYWdsZWF2ZTogcmVtb3ZlICdkcmFnLXRhcmdldC0uLi4nIGNsYXNzZXMgZnJvbSBlbGVtZW50XG4gKiAtIGRyb3A6IHJlbW92ZSAnZHJhZy10YXJnZXQtLi4uJyBjbGFzc2VzIGZyb20gZWxlbWVudCwgbW92ZSBkcm9wcGVkIGFycmF5IGl0ZW1cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW29yZGVyYWJsZV0nLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlcmFibGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICBhcnJheUxheW91dEluZGV4OiBzdHJpbmdcbiAgZWxlbWVudDogYW55XG4gIG92ZXJQYXJlbnRFbGVtZW50ID0gZmFsc2VcbiAgb3ZlckNoaWxkRWxlbWVudCA9IGZhbHNlXG4gIEBJbnB1dCgpIG9yZGVyYWJsZTogYm9vbGVhblxuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZSxcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lXG4gICkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMub3JkZXJhYmxlICYmIHRoaXMubGF5b3V0Tm9kZSAmJiB0aGlzLmxheW91dEluZGV4ICYmIHRoaXMuZGF0YUluZGV4KSB7XG4gICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudFxuICAgICAgdGhpcy5lbGVtZW50LmRyYWdnYWJsZSA9IHRydWVcbiAgICAgIHRoaXMuYXJyYXlMYXlvdXRJbmRleCA9ICdtb3ZlOicgKyB0aGlzLmxheW91dEluZGV4LnNsaWNlKDAsIC0xKS50b1N0cmluZygpXG5cbiAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcblxuICAgICAgICAvLyBMaXN0ZW5lcnMgZm9yIG1vdmFibGUgZWxlbWVudCBiZWluZyBkcmFnZ2VkOlxuXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJ1xuICAgICAgICAgIC8vIEhhY2sgdG8gYnlwYXNzIHN0dXBpZCBIVE1MIGRyYWctYW5kLWRyb3AgZGF0YVRyYW5zZmVyIHByb3RlY3Rpb25cbiAgICAgICAgICAvLyBzbyBkcmFnIHNvdXJjZSBpbmZvIHdpbGwgYmUgYXZhaWxhYmxlIG9uIGRyYWdlbnRlclxuICAgICAgICAgIGNvbnN0IHNvdXJjZUFycmF5SW5kZXggPSB0aGlzLmRhdGFJbmRleFt0aGlzLmRhdGFJbmRleC5sZW5ndGggLSAxXVxuICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0odGhpcy5hcnJheUxheW91dEluZGV4LCBzb3VyY2VBcnJheUluZGV4ICsgJycpXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50LnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgfVxuICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gTGlzdGVuZXJzIGZvciBzdGF0aW9uYXJ5IGl0ZW1zIGJlaW5nIGRyYWdnZWQgb3ZlcjpcblxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgLy8gUGFydCAxIG9mIGEgaGFjaywgaW5zcGlyZWQgYnkgRHJhZ3N0ZXIsIHRvIHNpbXVsYXRlIG1vdXNlb3ZlciBhbmQgbW91c2VvdXRcbiAgICAgICAgICAvLyBiZWhhdmlvciB3aGlsZSBkcmFnZ2luZyBpdGVtcyAtIGh0dHA6Ly9iZW5zbWl0aGV0dC5naXRodWIuaW8vZHJhZ3N0ZXIvXG4gICAgICAgICAgaWYgKHRoaXMub3ZlclBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm92ZXJDaGlsZEVsZW1lbnQgPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3ZlclBhcmVudEVsZW1lbnQgPSB0cnVlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgc291cmNlQXJyYXlJbmRleCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0odGhpcy5hcnJheUxheW91dEluZGV4KVxuICAgICAgICAgIGlmIChzb3VyY2VBcnJheUluZGV4ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhSW5kZXhbdGhpcy5kYXRhSW5kZXgubGVuZ3RoIC0gMV0gPCArc291cmNlQXJyYXlJbmRleCkge1xuICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHJhZy10YXJnZXQtdG9wJylcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhSW5kZXhbdGhpcy5kYXRhSW5kZXgubGVuZ3RoIC0gMV0gPiArc291cmNlQXJyYXlJbmRleCkge1xuICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHJhZy10YXJnZXQtYm90dG9tJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIChldmVudCkgPT4ge1xuICAgICAgICAgIC8vIFBhcnQgMiBvZiB0aGUgRHJhZ3N0ZXIgaGFja1xuICAgICAgICAgIGlmICh0aGlzLm92ZXJDaGlsZEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlckNoaWxkRWxlbWVudCA9IGZhbHNlXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm92ZXJQYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJQYXJlbnRFbGVtZW50ID0gZmFsc2VcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBzb3VyY2VBcnJheUluZGV4ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmFycmF5TGF5b3V0SW5kZXgpXG4gICAgICAgICAgaWYgKCF0aGlzLm92ZXJQYXJlbnRFbGVtZW50ICYmICF0aGlzLm92ZXJDaGlsZEVsZW1lbnQgJiYgc291cmNlQXJyYXlJbmRleCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWctdGFyZ2V0LXRvcCcpXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZy10YXJnZXQtYm90dG9tJylcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZy10YXJnZXQtdG9wJylcbiAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZy10YXJnZXQtYm90dG9tJylcbiAgICAgICAgICAvLyBDb25maXJtIHRoYXQgZHJvcCB0YXJnZXQgaXMgYW5vdGhlciBpdGVtIGluIHRoZSBzYW1lIGFycmF5IGFzIHNvdXJjZSBpdGVtXG4gICAgICAgICAgY29uc3Qgc291cmNlQXJyYXlJbmRleCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0odGhpcy5hcnJheUxheW91dEluZGV4KVxuICAgICAgICAgIGNvbnN0IGRlc3RBcnJheUluZGV4ID0gdGhpcy5kYXRhSW5kZXhbdGhpcy5kYXRhSW5kZXgubGVuZ3RoIC0gMV1cbiAgICAgICAgICBpZiAoc291cmNlQXJyYXlJbmRleCAhPT0gbnVsbCAmJiArc291cmNlQXJyYXlJbmRleCAhPT0gZGVzdEFycmF5SW5kZXgpIHtcbiAgICAgICAgICAgIC8vIE1vdmUgYXJyYXkgaXRlbVxuICAgICAgICAgICAgdGhpcy5qc2YubW92ZUFycmF5SXRlbSh0aGlzLCArc291cmNlQXJyYXlJbmRleCwgZGVzdEFycmF5SW5kZXgpXG4gICAgICAgICAgfVxuICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5hcnJheUxheW91dEluZGV4KVxuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==