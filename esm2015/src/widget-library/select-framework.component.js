import * as tslib_1 from "tslib";
import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
let SelectFrameworkComponent = class SelectFrameworkComponent {
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
        if (!this.newComponent && this.jsf.framework) {
            this.newComponent = this.widgetContainer.createComponent(this.componentFactory.resolveComponentFactory(this.jsf.framework));
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
], SelectFrameworkComponent.prototype, "layoutNode", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], SelectFrameworkComponent.prototype, "layoutIndex", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], SelectFrameworkComponent.prototype, "dataIndex", void 0);
tslib_1.__decorate([
    ViewChild('widgetContainer', { read: ViewContainerRef, static: true }),
    tslib_1.__metadata("design:type", ViewContainerRef)
], SelectFrameworkComponent.prototype, "widgetContainer", void 0);
SelectFrameworkComponent = tslib_1.__decorate([
    Component({
        selector: 'select-framework-widget',
        template: `<div #widgetContainer></div>`
    }),
    tslib_1.__metadata("design:paramtypes", [ComponentFactoryResolver,
        JsonSchemaFormService])
], SelectFrameworkComponent);
export { SelectFrameworkComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWZyYW1ld29yay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsic3JjL3dpZGdldC1saWJyYXJ5L3NlbGVjdC1mcmFtZXdvcmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLHdCQUF3QixFQUFnQixLQUFLLEVBQ3JDLFNBQVMsRUFBRSxnQkFBZ0IsRUFDL0MsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFNcEUsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFRbkMsWUFDVSxnQkFBMEMsRUFDMUMsR0FBMEI7UUFEMUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUEwQjtRQUMxQyxRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQVRwQyxpQkFBWSxHQUFzQixJQUFJLENBQUM7SUFVbkMsQ0FBQztJQUVMLFFBQVE7UUFDTixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRTtZQUM1QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUN0RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FDbEUsQ0FBQztTQUNIO1FBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLEtBQUssTUFBTSxLQUFLLElBQUksQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLFdBQVcsQ0FBQyxFQUFFO2dCQUM5RCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDakQ7U0FDRjtJQUNILENBQUM7Q0FDRixDQUFBO0FBL0JVO0lBQVIsS0FBSyxFQUFFOzs0REFBaUI7QUFDaEI7SUFBUixLQUFLLEVBQUU7OzZEQUF1QjtBQUN0QjtJQUFSLEtBQUssRUFBRTs7MkRBQXFCO0FBRTNCO0lBREQsU0FBUyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztzQ0FDcEQsZ0JBQWdCO2lFQUFDO0FBTnpCLHdCQUF3QjtJQUpwQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUseUJBQXlCO1FBQ25DLFFBQVEsRUFBRSw4QkFBOEI7S0FDekMsQ0FBQzs2Q0FVNEIsd0JBQXdCO1FBQ3JDLHFCQUFxQjtHQVZ6Qix3QkFBd0IsQ0FpQ3BDO1NBakNZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIElucHV0LFxuICBPbkNoYW5nZXMsIE9uSW5pdCwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBKc29uU2NoZW1hRm9ybVNlcnZpY2UgfSBmcm9tICcuLi9qc29uLXNjaGVtYS1mb3JtLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZWxlY3QtZnJhbWV3b3JrLXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgPGRpdiAjd2lkZ2V0Q29udGFpbmVyPjwvZGl2PmAsXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdEZyYW1ld29ya0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgbmV3Q29tcG9uZW50OiBDb21wb25lbnRSZWY8YW55PiA9IG51bGw7XG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueTtcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdO1xuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdO1xuICBAVmlld0NoaWxkKCd3aWRnZXRDb250YWluZXInLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICAgIHdpZGdldENvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbXBvbmVudEZhY3Rvcnk6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy51cGRhdGVDb21wb25lbnQoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMudXBkYXRlQ29tcG9uZW50KCk7XG4gIH1cblxuICB1cGRhdGVDb21wb25lbnQoKSB7XG4gICAgaWYgKCF0aGlzLm5ld0NvbXBvbmVudCAmJiB0aGlzLmpzZi5mcmFtZXdvcmspIHtcbiAgICAgIHRoaXMubmV3Q29tcG9uZW50ID0gdGhpcy53aWRnZXRDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KFxuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy5qc2YuZnJhbWV3b3JrKVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubmV3Q29tcG9uZW50KSB7XG4gICAgICBmb3IgKGNvbnN0IGlucHV0IG9mIFsnbGF5b3V0Tm9kZScsICdsYXlvdXRJbmRleCcsICdkYXRhSW5kZXgnXSkge1xuICAgICAgICB0aGlzLm5ld0NvbXBvbmVudC5pbnN0YW5jZVtpbnB1dF0gPSB0aGlzW2lucHV0XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==