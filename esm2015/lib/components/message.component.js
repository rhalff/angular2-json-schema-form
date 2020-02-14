import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
export class MessageComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.message = null;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.message = this.options.help || this.options.helpvalue ||
            this.options.msg || this.options.message;
    }
}
MessageComponent.decorators = [
    { type: Component, args: [{
                selector: 'message-widget',
                template: `
    <span *ngIf="message"
      [class]="options?.labelHtmlClass || ''"
      [innerHTML]="message"></span>`
            }] }
];
MessageComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
MessageComponent.propDecorators = {
    layoutNode: [{ type: Input }],
    layoutIndex: [{ type: Input }],
    dataIndex: [{ type: Input }]
};
if (false) {
    MessageComponent.prototype.options;
    MessageComponent.prototype.message;
    MessageComponent.prototype.layoutNode;
    MessageComponent.prototype.layoutIndex;
    MessageComponent.prototype.dataIndex;
    MessageComponent.prototype.jsf;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdzZi93aWRnZXQtbGlicmFyeS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL21lc3NhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFBO0FBQ3RELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFBO0FBUzFFLE1BQU0sT0FBTyxnQkFBZ0I7SUFPM0IsWUFDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQU5wQyxZQUFPLEdBQVcsSUFBSSxDQUFBO0lBUXRCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVM7WUFDeEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUE7SUFDNUMsQ0FBQzs7O1lBdkJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUU7OztvQ0FHd0I7YUFDbkM7OztZQVJPLHFCQUFxQjs7O3lCQVkxQixLQUFLOzBCQUNMLEtBQUs7d0JBQ0wsS0FBSzs7O0lBSk4sbUNBQVk7SUFDWixtQ0FBc0I7SUFDdEIsc0NBQXdCO0lBQ3hCLHVDQUE4QjtJQUM5QixxQ0FBNEI7SUFHMUIsK0JBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJ1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZXNzYWdlLXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW4gKm5nSWY9XCJtZXNzYWdlXCJcbiAgICAgIFtjbGFzc109XCJvcHRpb25zPy5sYWJlbEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICBbaW5uZXJIVE1MXT1cIm1lc3NhZ2VcIj48L3NwYW4+YCxcbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIG9wdGlvbnM6IGFueVxuICBtZXNzYWdlOiBzdHJpbmcgPSBudWxsXG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmxheW91dE5vZGUub3B0aW9ucyB8fCB7fVxuICAgIHRoaXMubWVzc2FnZSA9IHRoaXMub3B0aW9ucy5oZWxwIHx8IHRoaXMub3B0aW9ucy5oZWxwdmFsdWUgfHxcbiAgICAgIHRoaXMub3B0aW9ucy5tc2cgfHwgdGhpcy5vcHRpb25zLm1lc3NhZ2VcbiAgfVxufVxuIl19