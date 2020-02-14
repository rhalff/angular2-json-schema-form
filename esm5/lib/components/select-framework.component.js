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
import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef, } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
var SelectFrameworkComponent = (function () {
    function SelectFrameworkComponent(componentFactory, jsf) {
        this.componentFactory = componentFactory;
        this.jsf = jsf;
        this.newComponent = null;
    }
    SelectFrameworkComponent.prototype.ngOnInit = function () {
        this.updateComponent();
    };
    SelectFrameworkComponent.prototype.ngOnChanges = function () {
        this.updateComponent();
    };
    SelectFrameworkComponent.prototype.updateComponent = function () {
        var e_1, _a;
        if (!this.newComponent && this.jsf.framework) {
            this.newComponent = this.widgetContainer.createComponent(this.componentFactory.resolveComponentFactory(((this.jsf.framework))));
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
    SelectFrameworkComponent.decorators = [
        { type: Component, args: [{
                    selector: 'select-framework-widget',
                    template: "\n    <div #widgetContainer></div>\n  "
                }] }
    ];
    SelectFrameworkComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: JsonSchemaFormService }
    ]; };
    SelectFrameworkComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }],
        widgetContainer: [{ type: ViewChild, args: ['widgetContainer', { read: ViewContainerRef, static: true },] }]
    };
    return SelectFrameworkComponent;
}());
export { SelectFrameworkComponent };
if (false) {
    SelectFrameworkComponent.prototype.newComponent;
    SelectFrameworkComponent.prototype.layoutNode;
    SelectFrameworkComponent.prototype.layoutIndex;
    SelectFrameworkComponent.prototype.dataIndex;
    SelectFrameworkComponent.prototype.widgetContainer;
    SelectFrameworkComponent.prototype.componentFactory;
    SelectFrameworkComponent.prototype.jsf;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWZyYW1ld29yay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdzZi93aWRnZXQtbGlicmFyeS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3NlbGVjdC1mcmFtZXdvcmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCx3QkFBd0IsRUFFeEIsS0FBSyxFQUdMLFNBQVMsRUFDVCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUE7QUFDdEIsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUE7QUFFMUU7SUFjRSxrQ0FDVSxnQkFBMEMsRUFDMUMsR0FBMEI7UUFEMUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUEwQjtRQUMxQyxRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQVRwQyxpQkFBWSxHQUFzQixJQUFJLENBQUE7SUFVbkMsQ0FBQztJQUVKLDJDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUE7SUFDeEIsQ0FBQztJQUVELDhDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUE7SUFDeEIsQ0FBQztJQUVELGtEQUFlLEdBQWY7O1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUU7WUFDNUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FDdEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHVCQUF1QixDQUFDLEVBQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQU8sQ0FBQyxDQUN6RSxDQUFBO1NBQ0Y7UUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7O2dCQUNyQixLQUFvQixJQUFBLEtBQUEsU0FBQSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUEsZ0JBQUEsNEJBQUU7b0JBQTNELElBQU0sS0FBSyxXQUFBO29CQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtpQkFDaEQ7Ozs7Ozs7OztTQUNGO0lBQ0gsQ0FBQzs7Z0JBdENGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyxRQUFRLEVBQUUsd0NBRVQ7aUJBQ0Y7OztnQkFmQyx3QkFBd0I7Z0JBUWxCLHFCQUFxQjs7OzZCQVUxQixLQUFLOzhCQUNMLEtBQUs7NEJBQ0wsS0FBSztrQ0FDTCxTQUFTLFNBQUMsaUJBQWlCLEVBQUUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQzs7SUE0QnRFLCtCQUFDO0NBQUEsQUF2Q0QsSUF1Q0M7U0FqQ1ksd0JBQXdCOztJQUNuQyxnREFBc0M7SUFDdEMsOENBQXdCO0lBQ3hCLCtDQUE4QjtJQUM5Qiw2Q0FBNEI7SUFDNUIsbURBQ2lDO0lBRy9CLG9EQUFrRDtJQUNsRCx1Q0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9qc29uLXNjaGVtYS1mb3JtLnNlcnZpY2UnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NlbGVjdC1mcmFtZXdvcmstd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICN3aWRnZXRDb250YWluZXI+PC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdEZyYW1ld29ya0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgbmV3Q29tcG9uZW50OiBDb21wb25lbnRSZWY8YW55PiA9IG51bGxcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG4gIEBWaWV3Q2hpbGQoJ3dpZGdldENvbnRhaW5lcicsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWV9KVxuICB3aWRnZXRDb250YWluZXI6IFZpZXdDb250YWluZXJSZWZcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbXBvbmVudEZhY3Rvcnk6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudCgpXG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudCgpXG4gIH1cblxuICB1cGRhdGVDb21wb25lbnQoKSB7XG4gICAgaWYgKCF0aGlzLm5ld0NvbXBvbmVudCAmJiB0aGlzLmpzZi5mcmFtZXdvcmspIHtcbiAgICAgIHRoaXMubmV3Q29tcG9uZW50ID0gdGhpcy53aWRnZXRDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KFxuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy5qc2YuZnJhbWV3b3JrIGFzIGFueSlcbiAgICAgIClcbiAgICB9XG4gICAgaWYgKHRoaXMubmV3Q29tcG9uZW50KSB7XG4gICAgICBmb3IgKGNvbnN0IGlucHV0IG9mIFsnbGF5b3V0Tm9kZScsICdsYXlvdXRJbmRleCcsICdkYXRhSW5kZXgnXSkge1xuICAgICAgICB0aGlzLm5ld0NvbXBvbmVudC5pbnN0YW5jZVtpbnB1dF0gPSB0aGlzW2lucHV0XVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19