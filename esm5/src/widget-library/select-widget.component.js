import * as tslib_1 from "tslib";
import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
var SelectWidgetComponent = /** @class */ (function () {
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
                for (var _b = tslib_1.__values(['layoutNode', 'layoutIndex', 'dataIndex']), _c = _b.next(); !_c.done; _c = _b.next()) {
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
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SelectWidgetComponent.prototype, "layoutNode", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], SelectWidgetComponent.prototype, "layoutIndex", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], SelectWidgetComponent.prototype, "dataIndex", void 0);
    tslib_1.__decorate([
        ViewChild('widgetContainer', { read: ViewContainerRef, static: true }),
        tslib_1.__metadata("design:type", ViewContainerRef)
    ], SelectWidgetComponent.prototype, "widgetContainer", void 0);
    SelectWidgetComponent = tslib_1.__decorate([
        Component({
            selector: 'select-widget-widget',
            template: "<div #widgetContainer></div>"
        }),
        tslib_1.__metadata("design:paramtypes", [ComponentFactoryResolver,
            JsonSchemaFormService])
    ], SelectWidgetComponent);
    return SelectWidgetComponent;
}());
export { SelectWidgetComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXdpZGdldC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsic3JjL3dpZGdldC1saWJyYXJ5L3NlbGVjdC13aWRnZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLHdCQUF3QixFQUFnQixLQUFLLEVBQ3JDLFNBQVMsRUFBRSxnQkFBZ0IsRUFDL0MsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFNcEU7SUFRRSwrQkFDVSxnQkFBMEMsRUFDMUMsR0FBMEI7UUFEMUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUEwQjtRQUMxQyxRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQVRwQyxpQkFBWSxHQUFzQixJQUFJLENBQUM7SUFVbkMsQ0FBQztJQUVMLHdDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELDJDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELCtDQUFlLEdBQWY7O1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRTtZQUN4RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUN0RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FDdEUsQ0FBQztTQUNIO1FBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFOztnQkFDckIsS0FBb0IsSUFBQSxLQUFBLGlCQUFBLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTtvQkFBM0QsSUFBTSxLQUFLLFdBQUE7b0JBQ2QsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNqRDs7Ozs7Ozs7O1NBQ0Y7SUFDSCxDQUFDO0lBOUJRO1FBQVIsS0FBSyxFQUFFOzs2REFBaUI7SUFDaEI7UUFBUixLQUFLLEVBQUU7OzhEQUF1QjtJQUN0QjtRQUFSLEtBQUssRUFBRTs7NERBQXFCO0lBRTNCO1FBREQsU0FBUyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQzswQ0FDcEQsZ0JBQWdCO2tFQUFDO0lBTnpCLHFCQUFxQjtRQUpqQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFFBQVEsRUFBRSw4QkFBOEI7U0FDekMsQ0FBQztpREFVNEIsd0JBQXdCO1lBQ3JDLHFCQUFxQjtPQVZ6QixxQkFBcUIsQ0FpQ2pDO0lBQUQsNEJBQUM7Q0FBQSxBQWpDRCxJQWlDQztTQWpDWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmLCBJbnB1dCxcbiAgT25DaGFuZ2VzLCBPbkluaXQsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSnNvblNjaGVtYUZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2VsZWN0LXdpZGdldC13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgI3dpZGdldENvbnRhaW5lcj48L2Rpdj5gLFxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RXaWRnZXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XG4gIG5ld0NvbXBvbmVudDogQ29tcG9uZW50UmVmPGFueT4gPSBudWxsO1xuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnk7XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXTtcbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXTtcbiAgQFZpZXdDaGlsZCgnd2lkZ2V0Q29udGFpbmVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSlcbiAgICB3aWRnZXRDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudXBkYXRlQ29tcG9uZW50KCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudCgpO1xuICB9XG5cbiAgdXBkYXRlQ29tcG9uZW50KCkge1xuICAgIGlmICghdGhpcy5uZXdDb21wb25lbnQgJiYgKHRoaXMubGF5b3V0Tm9kZSB8fCB7fSkud2lkZ2V0KSB7XG4gICAgICB0aGlzLm5ld0NvbXBvbmVudCA9IHRoaXMud2lkZ2V0Q29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChcbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5LnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMubGF5b3V0Tm9kZS53aWRnZXQpXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGhpcy5uZXdDb21wb25lbnQpIHtcbiAgICAgIGZvciAoY29uc3QgaW5wdXQgb2YgWydsYXlvdXROb2RlJywgJ2xheW91dEluZGV4JywgJ2RhdGFJbmRleCddKSB7XG4gICAgICAgIHRoaXMubmV3Q29tcG9uZW50Lmluc3RhbmNlW2lucHV0XSA9IHRoaXNbaW5wdXRdO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19