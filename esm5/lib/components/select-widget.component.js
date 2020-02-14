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
var SelectWidgetComponent = (function () {
    function SelectWidgetComponent(componentFactory, jsf) {
        this.componentFactory = componentFactory;
        this.jsf = jsf;
        this.newComponent = null;
    }
    SelectWidgetComponent.prototype.ngOnInit = function () {
        this.updateComponent();
    };
    SelectWidgetComponent.prototype.ngOnChanges = function () {
        this.updateComponent();
    };
    SelectWidgetComponent.prototype.updateComponent = function () {
        var e_1, _a;
        if (!this.newComponent && (this.layoutNode || {}).widget) {
            this.newComponent = this.widgetContainer.createComponent(this.componentFactory.resolveComponentFactory(this.layoutNode.widget));
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
    SelectWidgetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'select-widget-widget',
                    template: "<div #widgetContainer></div>"
                }] }
    ];
    SelectWidgetComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: JsonSchemaFormService }
    ]; };
    SelectWidgetComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }],
        widgetContainer: [{ type: ViewChild, args: ['widgetContainer', { read: ViewContainerRef, static: true },] }]
    };
    return SelectWidgetComponent;
}());
export { SelectWidgetComponent };
if (false) {
    SelectWidgetComponent.prototype.newComponent;
    SelectWidgetComponent.prototype.layoutNode;
    SelectWidgetComponent.prototype.layoutIndex;
    SelectWidgetComponent.prototype.dataIndex;
    SelectWidgetComponent.prototype.widgetContainer;
    SelectWidgetComponent.prototype.componentFactory;
    SelectWidgetComponent.prototype.jsf;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXdpZGdldC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdzZi93aWRnZXQtbGlicmFyeS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3NlbGVjdC13aWRnZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSx3QkFBd0IsRUFBZ0IsS0FBSyxFQUFxQixTQUFTLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxlQUFlLENBQUE7QUFDdEksT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUE7QUFFMUU7SUFZRSwrQkFDVSxnQkFBMEMsRUFDMUMsR0FBMEI7UUFEMUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUEwQjtRQUMxQyxRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQVRwQyxpQkFBWSxHQUFzQixJQUFJLENBQUE7SUFXdEMsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUE7SUFDeEIsQ0FBQztJQUVELDJDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUE7SUFDeEIsQ0FBQztJQUVELCtDQUFlLEdBQWY7O1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRTtZQUN4RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUN0RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FDdEUsQ0FBQTtTQUNGO1FBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFOztnQkFDckIsS0FBb0IsSUFBQSxLQUFBLFNBQUEsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFBLGdCQUFBLDRCQUFFO29CQUEzRCxJQUFNLEtBQUssV0FBQTtvQkFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7aUJBQ2hEOzs7Ozs7Ozs7U0FDRjtJQUNILENBQUM7O2dCQXJDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsUUFBUSxFQUFFLDhCQUE4QjtpQkFDekM7OztnQkFOa0Isd0JBQXdCO2dCQUNuQyxxQkFBcUI7Ozs2QkFRMUIsS0FBSzs4QkFDTCxLQUFLOzRCQUNMLEtBQUs7a0NBQ0wsU0FBUyxTQUFDLGlCQUFpQixFQUFFLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUM7O0lBNkJ0RSw0QkFBQztDQUFBLEFBdENELElBc0NDO1NBbENZLHFCQUFxQjs7SUFDaEMsNkNBQXNDO0lBQ3RDLDJDQUF3QjtJQUN4Qiw0Q0FBOEI7SUFDOUIsMENBQTRCO0lBQzVCLGdEQUNpQztJQUcvQixpREFBa0Q7SUFDbEQsb0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9qc29uLXNjaGVtYS1mb3JtLnNlcnZpY2UnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NlbGVjdC13aWRnZXQtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICN3aWRnZXRDb250YWluZXI+PC9kaXY+YCxcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0V2lkZ2V0Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xuICBuZXdDb21wb25lbnQ6IENvbXBvbmVudFJlZjxhbnk+ID0gbnVsbFxuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cbiAgQFZpZXdDaGlsZCgnd2lkZ2V0Q29udGFpbmVyJywge3JlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZX0pXG4gIHdpZGdldENvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZlxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudCgpXG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudCgpXG4gIH1cblxuICB1cGRhdGVDb21wb25lbnQoKSB7XG4gICAgaWYgKCF0aGlzLm5ld0NvbXBvbmVudCAmJiAodGhpcy5sYXlvdXROb2RlIHx8IHt9KS53aWRnZXQpIHtcbiAgICAgIHRoaXMubmV3Q29tcG9uZW50ID0gdGhpcy53aWRnZXRDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KFxuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy5sYXlvdXROb2RlLndpZGdldClcbiAgICAgIClcbiAgICB9XG4gICAgaWYgKHRoaXMubmV3Q29tcG9uZW50KSB7XG4gICAgICBmb3IgKGNvbnN0IGlucHV0IG9mIFsnbGF5b3V0Tm9kZScsICdsYXlvdXRJbmRleCcsICdkYXRhSW5kZXgnXSkge1xuICAgICAgICB0aGlzLm5ld0NvbXBvbmVudC5pbnN0YW5jZVtpbnB1dF0gPSB0aGlzW2lucHV0XVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19