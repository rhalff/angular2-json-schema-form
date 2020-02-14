import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
export class TabComponent {
    constructor(jsf) {
        this.jsf = jsf;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
    }
}
TabComponent.decorators = [
    { type: Component, args: [{
                selector: 'tab-widget',
                template: `
    <div [class]="options?.htmlClass || ''">
      <root-widget
        [dataIndex]="dataIndex"
        [layoutIndex]="layoutIndex"
        [layout]="layoutNode.items"></root-widget>
    </div>`
            }] }
];
TabComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
TabComponent.propDecorators = {
    layoutNode: [{ type: Input }],
    layoutIndex: [{ type: Input }],
    dataIndex: [{ type: Input }]
};
if (false) {
    TabComponent.prototype.options;
    TabComponent.prototype.layoutNode;
    TabComponent.prototype.layoutIndex;
    TabComponent.prototype.dataIndex;
    TabComponent.prototype.jsf;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL3dpZGdldC1saWJyYXJ5LyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvdGFiLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQTtBQUN0RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQTtBQVkxRSxNQUFNLE9BQU8sWUFBWTtJQU12QixZQUNVLEdBQTBCO1FBQTFCLFFBQUcsR0FBSCxHQUFHLENBQXVCO0lBRXBDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUE7SUFDOUMsQ0FBQzs7O1lBdkJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsUUFBUSxFQUFFOzs7Ozs7V0FNRDthQUNWOzs7WUFYTyxxQkFBcUI7Ozt5QkFjMUIsS0FBSzswQkFDTCxLQUFLO3dCQUNMLEtBQUs7OztJQUhOLCtCQUFZO0lBQ1osa0NBQXdCO0lBQ3hCLG1DQUE4QjtJQUM5QixpQ0FBNEI7SUFHMUIsMkJBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJ1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0YWItd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtjbGFzc109XCJvcHRpb25zPy5odG1sQ2xhc3MgfHwgJydcIj5cbiAgICAgIDxyb290LXdpZGdldFxuICAgICAgICBbZGF0YUluZGV4XT1cImRhdGFJbmRleFwiXG4gICAgICAgIFtsYXlvdXRJbmRleF09XCJsYXlvdXRJbmRleFwiXG4gICAgICAgIFtsYXlvdXRdPVwibGF5b3V0Tm9kZS5pdGVtc1wiPjwvcm9vdC13aWRnZXQ+XG4gICAgPC9kaXY+YCxcbn0pXG5leHBvcnQgY2xhc3MgVGFiQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgb3B0aW9uczogYW55XG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmxheW91dE5vZGUub3B0aW9ucyB8fCB7fVxuICB9XG59XG4iXX0=