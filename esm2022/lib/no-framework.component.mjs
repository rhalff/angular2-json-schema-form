import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngsf/widget-library";
class NoFrameworkComponent {
    layoutNode;
    layoutIndex;
    dataIndex;
    static ɵfac = function NoFrameworkComponent_Factory(t) { return new (t || NoFrameworkComponent)(); };
    static ɵcmp = i0.ɵɵdefineComponent({ type: NoFrameworkComponent, selectors: [["no-framework"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 1, vars: 3, consts: [[3, "dataIndex", "layoutIndex", "layoutNode"]], template: function NoFrameworkComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "select-widget-widget", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("dataIndex", ctx.dataIndex)("layoutIndex", ctx.layoutIndex)("layoutNode", ctx.layoutNode);
        } }, dependencies: [i1.SelectWidgetComponent], encapsulation: 2 });
}
export { NoFrameworkComponent };
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NoFrameworkComponent, [{
        type: Component,
        args: [{
                selector: 'no-framework',
                template: `
      <select-widget-widget
              [dataIndex]="dataIndex"
              [layoutIndex]="layoutIndex"
              [layoutNode]="layoutNode"></select-widget-widget>`,
            }]
    }], null, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tZnJhbWV3b3JrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nc2Ytbm8tZnJhbWV3b3JrL3NyYy9saWIvbm8tZnJhbWV3b3JrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQTs7O0FBRTlDLE1BUWEsb0JBQW9CO0lBQ3RCLFVBQVUsQ0FBSztJQUNmLFdBQVcsQ0FBVTtJQUNyQixTQUFTLENBQVU7OEVBSGpCLG9CQUFvQjsrQ0FBcEIsb0JBQW9CO1lBTDNCLDBDQUd5RDs7WUFGakQseUNBQXVCLGdDQUFBLDhCQUFBOzs7U0FJeEIsb0JBQW9CO3VGQUFwQixvQkFBb0I7Y0FSaEMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixRQUFRLEVBQUU7Ozs7Z0VBSW9EO2FBQy9EO2dCQUVVLFVBQVU7a0JBQWxCLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm8tZnJhbWV3b3JrJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxzZWxlY3Qtd2lkZ2V0LXdpZGdldFxuICAgICAgICAgICAgICBbZGF0YUluZGV4XT1cImRhdGFJbmRleFwiXG4gICAgICAgICAgICAgIFtsYXlvdXRJbmRleF09XCJsYXlvdXRJbmRleFwiXG4gICAgICAgICAgICAgIFtsYXlvdXROb2RlXT1cImxheW91dE5vZGVcIj48L3NlbGVjdC13aWRnZXQtd2lkZ2V0PmAsXG59KVxuZXhwb3J0IGNsYXNzIE5vRnJhbWV3b3JrQ29tcG9uZW50IHtcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG59XG4iXX0=