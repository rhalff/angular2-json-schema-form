import * as tslib_1 from "tslib";
import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
let SelectWidgetComponent = class SelectWidgetComponent {
    constructor(componentFactory, jsf) {
        this.componentFactory = componentFactory;
        this.jsf = jsf;
        this.newComponent = null;
    }
    ngOnInit() {
        this.updateComponent();
    }
    ngOnChanges() {
        this.updateComponent();
    }
    updateComponent() {
        if (!this.newComponent && (this.layoutNode || {}).widget) {
            this.newComponent = this.widgetContainer.createComponent(this.componentFactory.resolveComponentFactory(this.layoutNode.widget));
        }
        if (this.newComponent) {
            for (const input of ['layoutNode', 'layoutIndex', 'dataIndex']) {
                this.newComponent.instance[input] = this[input];
            }
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
        template: `<div #widgetContainer></div>`
    }),
    tslib_1.__metadata("design:paramtypes", [ComponentFactoryResolver,
        JsonSchemaFormService])
], SelectWidgetComponent);
export { SelectWidgetComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXdpZGdldC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsic3JjL3dpZGdldC1saWJyYXJ5L3NlbGVjdC13aWRnZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLHdCQUF3QixFQUFnQixLQUFLLEVBQ3JDLFNBQVMsRUFBRSxnQkFBZ0IsRUFDL0MsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFNcEUsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFRaEMsWUFDVSxnQkFBMEMsRUFDMUMsR0FBMEI7UUFEMUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUEwQjtRQUMxQyxRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQVRwQyxpQkFBWSxHQUFzQixJQUFJLENBQUM7SUFVbkMsQ0FBQztJQUVMLFFBQVE7UUFDTixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ3hELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQ3RELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUN0RSxDQUFDO1NBQ0g7UUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsS0FBSyxNQUFNLEtBQUssSUFBSSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsV0FBVyxDQUFDLEVBQUU7Z0JBQzlELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNqRDtTQUNGO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUEvQlU7SUFBUixLQUFLLEVBQUU7O3lEQUFpQjtBQUNoQjtJQUFSLEtBQUssRUFBRTs7MERBQXVCO0FBQ3RCO0lBQVIsS0FBSyxFQUFFOzt3REFBcUI7QUFFM0I7SUFERCxTQUFTLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO3NDQUNwRCxnQkFBZ0I7OERBQUM7QUFOekIscUJBQXFCO0lBSmpDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxzQkFBc0I7UUFDaEMsUUFBUSxFQUFFLDhCQUE4QjtLQUN6QyxDQUFDOzZDQVU0Qix3QkFBd0I7UUFDckMscUJBQXFCO0dBVnpCLHFCQUFxQixDQWlDakM7U0FqQ1kscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgSW5wdXQsXG4gIE9uQ2hhbmdlcywgT25Jbml0LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEpzb25TY2hlbWFGb3JtU2VydmljZSB9IGZyb20gJy4uL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NlbGVjdC13aWRnZXQtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICN3aWRnZXRDb250YWluZXI+PC9kaXY+YCxcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0V2lkZ2V0Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xuICBuZXdDb21wb25lbnQ6IENvbXBvbmVudFJlZjxhbnk+ID0gbnVsbDtcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55O1xuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW107XG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW107XG4gIEBWaWV3Q2hpbGQoJ3dpZGdldENvbnRhaW5lcicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pXG4gICAgd2lkZ2V0Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy51cGRhdGVDb21wb25lbnQoKTtcbiAgfVxuXG4gIHVwZGF0ZUNvbXBvbmVudCgpIHtcbiAgICBpZiAoIXRoaXMubmV3Q29tcG9uZW50ICYmICh0aGlzLmxheW91dE5vZGUgfHwge30pLndpZGdldCkge1xuICAgICAgdGhpcy5uZXdDb21wb25lbnQgPSB0aGlzLndpZGdldENvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeS5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLmxheW91dE5vZGUud2lkZ2V0KVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubmV3Q29tcG9uZW50KSB7XG4gICAgICBmb3IgKGNvbnN0IGlucHV0IG9mIFsnbGF5b3V0Tm9kZScsICdsYXlvdXRJbmRleCcsICdkYXRhSW5kZXgnXSkge1xuICAgICAgICB0aGlzLm5ld0NvbXBvbmVudC5pbnN0YW5jZVtpbnB1dF0gPSB0aGlzW2lucHV0XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==