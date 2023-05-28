import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef, } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/json-schema-form.service";
const _c0 = ["widgetContainer"];
class SelectFrameworkComponent {
    componentFactory;
    jsf;
    newComponent = null;
    layoutNode;
    layoutIndex;
    dataIndex;
    widgetContainer;
    constructor(componentFactory, jsf) {
        this.componentFactory = componentFactory;
        this.jsf = jsf;
    }
    ngOnInit() {
        this.updateComponent();
    }
    ngOnChanges() {
        this.updateComponent();
    }
    updateComponent() {
        if (!this.newComponent && this.jsf.framework) {
            this.newComponent = this.widgetContainer.createComponent(this.componentFactory.resolveComponentFactory(this.jsf.framework));
        }
        if (this.newComponent) {
            for (const input of ['layoutNode', 'layoutIndex', 'dataIndex']) {
                this.newComponent.instance[input] = this[input];
            }
        }
    }
    static ɵfac = function SelectFrameworkComponent_Factory(t) { return new (t || SelectFrameworkComponent)(i0.ɵɵdirectiveInject(i0.ComponentFactoryResolver), i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
    static ɵcmp = i0.ɵɵdefineComponent({ type: SelectFrameworkComponent, selectors: [["select-framework-widget"]], viewQuery: function SelectFrameworkComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 7, ViewContainerRef);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.widgetContainer = _t.first);
        } }, inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, features: [i0.ɵɵNgOnChangesFeature], decls: 2, vars: 0, consts: [["widgetContainer", ""]], template: function SelectFrameworkComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "div", null, 0);
        } }, encapsulation: 2 });
}
export { SelectFrameworkComponent };
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SelectFrameworkComponent, [{
        type: Component,
        args: [{
                selector: 'select-framework-widget',
                template: `
    <div #widgetContainer></div>
  `,
            }]
    }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }], widgetContainer: [{
            type: ViewChild,
            args: ['widgetContainer', { read: ViewContainerRef, static: true }]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWZyYW1ld29yay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLXdpZGdldC1saWJyYXJ5L3NyYy9saWIvY29tcG9uZW50cy9zZWxlY3QtZnJhbWV3b3JrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULHdCQUF3QixFQUV4QixLQUFLLEVBR0wsU0FBUyxFQUNULGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQTtBQUN0QixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQTs7OztBQUUxRSxNQU1hLHdCQUF3QjtJQVN6QjtJQUNBO0lBVFYsWUFBWSxHQUFzQixJQUFJLENBQUE7SUFDN0IsVUFBVSxDQUFLO0lBQ2YsV0FBVyxDQUFVO0lBQ3JCLFNBQVMsQ0FBVTtJQUU1QixlQUFlLENBQWtCO0lBRWpDLFlBQ1UsZ0JBQTBDLEVBQzFDLEdBQTBCO1FBRDFCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBMEI7UUFDMUMsUUFBRyxHQUFILEdBQUcsQ0FBdUI7SUFDakMsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUE7SUFDeEIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUE7SUFDeEIsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRTtZQUM1QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUN0RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFnQixDQUFDLENBQ3pFLENBQUE7U0FDRjtRQUNELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixLQUFLLE1BQU0sS0FBSyxJQUFJLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxXQUFXLENBQUMsRUFBRTtnQkFDOUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO2FBQ2hEO1NBQ0Y7SUFDSCxDQUFDO2tGQWhDVSx3QkFBd0I7K0NBQXhCLHdCQUF3QjttQ0FLRSxnQkFBZ0I7Ozs7O1lBUm5ELCtCQUE0Qjs7O1NBR25CLHdCQUF3Qjt1RkFBeEIsd0JBQXdCO2NBTnBDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxRQUFRLEVBQUU7O0dBRVQ7YUFDRjsrR0FHVSxVQUFVO2tCQUFsQixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUs7WUFFTixlQUFlO2tCQURkLFNBQVM7bUJBQUMsaUJBQWlCLEVBQUUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2VsZWN0LWZyYW1ld29yay13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgI3dpZGdldENvbnRhaW5lcj48L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0RnJhbWV3b3JrQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xuICBuZXdDb21wb25lbnQ6IENvbXBvbmVudFJlZjxhbnk+ID0gbnVsbFxuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cbiAgQFZpZXdDaGlsZCgnd2lkZ2V0Q29udGFpbmVyJywge3JlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZX0pXG4gIHdpZGdldENvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZlxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudXBkYXRlQ29tcG9uZW50KClcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMudXBkYXRlQ29tcG9uZW50KClcbiAgfVxuXG4gIHVwZGF0ZUNvbXBvbmVudCgpIHtcbiAgICBpZiAoIXRoaXMubmV3Q29tcG9uZW50ICYmIHRoaXMuanNmLmZyYW1ld29yaykge1xuICAgICAgdGhpcy5uZXdDb21wb25lbnQgPSB0aGlzLndpZGdldENvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeS5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLmpzZi5mcmFtZXdvcmsgYXMgYW55KVxuICAgICAgKVxuICAgIH1cbiAgICBpZiAodGhpcy5uZXdDb21wb25lbnQpIHtcbiAgICAgIGZvciAoY29uc3QgaW5wdXQgb2YgWydsYXlvdXROb2RlJywgJ2xheW91dEluZGV4JywgJ2RhdGFJbmRleCddKSB7XG4gICAgICAgIHRoaXMubmV3Q29tcG9uZW50Lmluc3RhbmNlW2lucHV0XSA9IHRoaXNbaW5wdXRdXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=