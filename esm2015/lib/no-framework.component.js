var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
let NoFrameworkComponent = class NoFrameworkComponent {
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], NoFrameworkComponent.prototype, "layoutNode", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], NoFrameworkComponent.prototype, "layoutIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], NoFrameworkComponent.prototype, "dataIndex", void 0);
NoFrameworkComponent = __decorate([
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tZnJhbWV3b3JrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL25vLWZyYW1ld29yay8iLCJzb3VyY2VzIjpbImxpYi9uby1mcmFtZXdvcmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFBO0FBVTlDLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0NBSWhDLENBQUE7QUFIVTtJQUFSLEtBQUssRUFBRTs7d0RBQWdCO0FBQ2Y7SUFBUixLQUFLLEVBQUU7O3lEQUFzQjtBQUNyQjtJQUFSLEtBQUssRUFBRTs7dURBQW9CO0FBSGpCLG9CQUFvQjtJQVJoQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsY0FBYztRQUN4QixRQUFRLEVBQUU7Ozs7Z0VBSW9EO0tBQy9ELENBQUM7R0FDVyxvQkFBb0IsQ0FJaEM7U0FKWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vLWZyYW1ld29yaycsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8c2VsZWN0LXdpZGdldC13aWRnZXRcbiAgICAgICAgICAgICAgW2RhdGFJbmRleF09XCJkYXRhSW5kZXhcIlxuICAgICAgICAgICAgICBbbGF5b3V0SW5kZXhdPVwibGF5b3V0SW5kZXhcIlxuICAgICAgICAgICAgICBbbGF5b3V0Tm9kZV09XCJsYXlvdXROb2RlXCI+PC9zZWxlY3Qtd2lkZ2V0LXdpZGdldD5gLFxufSlcbmV4cG9ydCBjbGFzcyBOb0ZyYW1ld29ya0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxufVxuIl19