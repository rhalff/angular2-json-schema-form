import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngsf/widget-library";
class NoFrameworkComponent {
    layoutNode;
    layoutIndex;
    dataIndex;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NoFrameworkComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: NoFrameworkComponent, selector: "no-framework", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, ngImport: i0, template: `
      <select-widget-widget
              [dataIndex]="dataIndex"
              [layoutIndex]="layoutIndex"
              [layoutNode]="layoutNode"></select-widget-widget>`, isInline: true, dependencies: [{ kind: "component", type: i1.SelectWidgetComponent, selector: "select-widget-widget", inputs: ["layoutNode", "layoutIndex", "dataIndex"] }] });
}
export { NoFrameworkComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NoFrameworkComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'no-framework',
                    template: `
      <select-widget-widget
              [dataIndex]="dataIndex"
              [layoutIndex]="layoutIndex"
              [layoutNode]="layoutNode"></select-widget-widget>`,
                }]
        }], propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tZnJhbWV3b3JrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nc2Ytbm8tZnJhbWV3b3JrL3NyYy9saWIvbm8tZnJhbWV3b3JrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQTs7O0FBRTlDLE1BUWEsb0JBQW9CO0lBQ3RCLFVBQVUsQ0FBSztJQUNmLFdBQVcsQ0FBVTtJQUNyQixTQUFTLENBQVU7dUdBSGpCLG9CQUFvQjsyRkFBcEIsb0JBQW9CLDhJQU5yQjs7OztnRUFJb0Q7O1NBRW5ELG9CQUFvQjsyRkFBcEIsb0JBQW9CO2tCQVJoQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4QixRQUFRLEVBQUU7Ozs7Z0VBSW9EO2lCQUMvRDs4QkFFVSxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm8tZnJhbWV3b3JrJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxzZWxlY3Qtd2lkZ2V0LXdpZGdldFxuICAgICAgICAgICAgICBbZGF0YUluZGV4XT1cImRhdGFJbmRleFwiXG4gICAgICAgICAgICAgIFtsYXlvdXRJbmRleF09XCJsYXlvdXRJbmRleFwiXG4gICAgICAgICAgICAgIFtsYXlvdXROb2RlXT1cImxheW91dE5vZGVcIj48L3NlbGVjdC13aWRnZXQtd2lkZ2V0PmAsXG59KVxuZXhwb3J0IGNsYXNzIE5vRnJhbWV3b3JrQ29tcG9uZW50IHtcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG59XG4iXX0=