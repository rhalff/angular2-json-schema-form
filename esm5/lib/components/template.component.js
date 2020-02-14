var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
var TemplateComponent = (function () {
    function TemplateComponent(componentFactory, jsf) {
        this.componentFactory = componentFactory;
        this.jsf = jsf;
        this.newComponent = null;
    }
    TemplateComponent.prototype.ngOnInit = function () {
        this.updateComponent();
    };
    TemplateComponent.prototype.ngOnChanges = function () {
        this.updateComponent();
    };
    TemplateComponent.prototype.updateComponent = function () {
        var e_1, _a;
        if (!this.newComponent && this.layoutNode.options.template) {
            this.newComponent = this.widgetContainer.createComponent(this.componentFactory.resolveComponentFactory(this.layoutNode.options.template));
        }
        if (this.newComponent) {
            try {
                for (var _b = __values(['layoutNode', 'layoutIndex', 'dataIndex']), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var input = _c.value;
                    this.newComponent.instance[input] = this[input];
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    TemplateComponent.decorators = [
        { type: Component, args: [{
                    selector: 'template-widget',
                    template: "<div #widgetContainer></div>"
                }] }
    ];
    TemplateComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: JsonSchemaFormService }
    ]; };
    TemplateComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }],
        widgetContainer: [{ type: ViewChild, args: ['widgetContainer', { read: ViewContainerRef, static: true },] }]
    };
    return TemplateComponent;
}());
export { TemplateComponent };
if (false) {
    TemplateComponent.prototype.newComponent;
    TemplateComponent.prototype.layoutNode;
    TemplateComponent.prototype.layoutIndex;
    TemplateComponent.prototype.dataIndex;
    TemplateComponent.prototype.widgetContainer;
    TemplateComponent.prototype.componentFactory;
    TemplateComponent.prototype.jsf;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nc2Yvd2lkZ2V0LWxpYnJhcnkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy90ZW1wbGF0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLHdCQUF3QixFQUFnQixLQUFLLEVBQXFCLFNBQVMsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUN0SSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQTtBQUUxRTtJQVlFLDJCQUNVLGdCQUEwQyxFQUMxQyxHQUEwQjtRQUQxQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQTBCO1FBQzFDLFFBQUcsR0FBSCxHQUFHLENBQXVCO1FBVHBDLGlCQUFZLEdBQXNCLElBQUksQ0FBQTtJQVd0QyxDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTtJQUN4QixDQUFDO0lBRUQsdUNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTtJQUN4QixDQUFDO0lBRUQsMkNBQWUsR0FBZjs7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDMUQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FDdEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUNoRixDQUFBO1NBQ0Y7UUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7O2dCQUNyQixLQUFvQixJQUFBLEtBQUEsU0FBQSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUEsZ0JBQUEsNEJBQUU7b0JBQTNELElBQU0sS0FBSyxXQUFBO29CQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtpQkFDaEQ7Ozs7Ozs7OztTQUNGO0lBQ0gsQ0FBQzs7Z0JBckNGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsOEJBQThCO2lCQUN6Qzs7O2dCQU5rQix3QkFBd0I7Z0JBQ25DLHFCQUFxQjs7OzZCQVExQixLQUFLOzhCQUNMLEtBQUs7NEJBQ0wsS0FBSztrQ0FDTCxTQUFTLFNBQUMsaUJBQWlCLEVBQUUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQzs7SUE2QnRFLHdCQUFDO0NBQUEsQUF0Q0QsSUFzQ0M7U0FsQ1ksaUJBQWlCOztJQUM1Qix5Q0FBc0M7SUFDdEMsdUNBQXdCO0lBQ3hCLHdDQUE4QjtJQUM5QixzQ0FBNEI7SUFDNUIsNENBQ2lDO0lBRy9CLDZDQUFrRDtJQUNsRCxnQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGVtcGxhdGUtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICN3aWRnZXRDb250YWluZXI+PC9kaXY+YCxcbn0pXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIG5ld0NvbXBvbmVudDogQ29tcG9uZW50UmVmPGFueT4gPSBudWxsXG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuICBAVmlld0NoaWxkKCd3aWRnZXRDb250YWluZXInLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlfSlcbiAgd2lkZ2V0Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudXBkYXRlQ29tcG9uZW50KClcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMudXBkYXRlQ29tcG9uZW50KClcbiAgfVxuXG4gIHVwZGF0ZUNvbXBvbmVudCgpIHtcbiAgICBpZiAoIXRoaXMubmV3Q29tcG9uZW50ICYmIHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zLnRlbXBsYXRlKSB7XG4gICAgICB0aGlzLm5ld0NvbXBvbmVudCA9IHRoaXMud2lkZ2V0Q29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChcbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5LnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zLnRlbXBsYXRlKVxuICAgICAgKVxuICAgIH1cbiAgICBpZiAodGhpcy5uZXdDb21wb25lbnQpIHtcbiAgICAgIGZvciAoY29uc3QgaW5wdXQgb2YgWydsYXlvdXROb2RlJywgJ2xheW91dEluZGV4JywgJ2RhdGFJbmRleCddKSB7XG4gICAgICAgIHRoaXMubmV3Q29tcG9uZW50Lmluc3RhbmNlW2lucHV0XSA9IHRoaXNbaW5wdXRdXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=