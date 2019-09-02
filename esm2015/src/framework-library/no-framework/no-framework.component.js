import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let NoFrameworkComponent = class NoFrameworkComponent {
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], NoFrameworkComponent.prototype, "layoutNode", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], NoFrameworkComponent.prototype, "layoutIndex", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], NoFrameworkComponent.prototype, "dataIndex", void 0);
NoFrameworkComponent = tslib_1.__decorate([
    Component({
        selector: 'no-framework',
        template: `
    <select-widget-widget
      [dataIndex]="dataIndex"
      [layoutIndex]="layoutIndex"
      [layoutNode]="layoutNode"></select-widget-widget>`
    })
], NoFrameworkComponent);
export { NoFrameworkComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tZnJhbWV3b3JrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWpzb24tc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJzcmMvZnJhbWV3b3JrLWxpYnJhcnkvbm8tZnJhbWV3b3JrL25vLWZyYW1ld29yay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBVWpELElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0NBSWhDLENBQUE7QUFIVTtJQUFSLEtBQUssRUFBRTs7d0RBQWlCO0FBQ2hCO0lBQVIsS0FBSyxFQUFFOzt5REFBdUI7QUFDdEI7SUFBUixLQUFLLEVBQUU7O3VEQUFxQjtBQUhsQixvQkFBb0I7SUFSaEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGNBQWM7UUFDeEIsUUFBUSxFQUFFOzs7O3dEQUk0QztLQUN2RCxDQUFDO0dBQ1csb0JBQW9CLENBSWhDO1NBSlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduby1mcmFtZXdvcmsnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzZWxlY3Qtd2lkZ2V0LXdpZGdldFxuICAgICAgW2RhdGFJbmRleF09XCJkYXRhSW5kZXhcIlxuICAgICAgW2xheW91dEluZGV4XT1cImxheW91dEluZGV4XCJcbiAgICAgIFtsYXlvdXROb2RlXT1cImxheW91dE5vZGVcIj48L3NlbGVjdC13aWRnZXQtd2lkZ2V0PmAsXG59KVxuZXhwb3J0IGNsYXNzIE5vRnJhbWV3b3JrQ29tcG9uZW50IHtcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55O1xuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW107XG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW107XG59XG4iXX0=