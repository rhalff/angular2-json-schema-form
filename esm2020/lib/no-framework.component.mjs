import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngsf/widget-library";
export class NoFrameworkComponent {
}
NoFrameworkComponent.ɵfac = function NoFrameworkComponent_Factory(t) { return new (t || NoFrameworkComponent)(); };
NoFrameworkComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NoFrameworkComponent, selectors: [["no-framework"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 1, vars: 3, consts: [[3, "dataIndex", "layoutIndex", "layoutNode"]], template: function NoFrameworkComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "select-widget-widget", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("dataIndex", ctx.dataIndex)("layoutIndex", ctx.layoutIndex)("layoutNode", ctx.layoutNode);
    } }, dependencies: [i1.SelectWidgetComponent], encapsulation: 2 });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tZnJhbWV3b3JrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nc2Ytbm8tZnJhbWV3b3JrL3NyYy9saWIvbm8tZnJhbWV3b3JrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQTs7O0FBVTlDLE1BQU0sT0FBTyxvQkFBb0I7O3dGQUFwQixvQkFBb0I7eURBQXBCLG9CQUFvQjtRQUwzQiwwQ0FHeUQ7O1FBRmpELHlDQUF1QixnQ0FBQSw4QkFBQTs7dUZBSXhCLG9CQUFvQjtjQVJoQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFFBQVEsRUFBRTs7OztnRUFJb0Q7YUFDL0Q7Z0JBRVUsVUFBVTtrQkFBbEIsS0FBSztZQUNHLFdBQVc7a0JBQW5CLEtBQUs7WUFDRyxTQUFTO2tCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduby1mcmFtZXdvcmsnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPHNlbGVjdC13aWRnZXQtd2lkZ2V0XG4gICAgICAgICAgICAgIFtkYXRhSW5kZXhdPVwiZGF0YUluZGV4XCJcbiAgICAgICAgICAgICAgW2xheW91dEluZGV4XT1cImxheW91dEluZGV4XCJcbiAgICAgICAgICAgICAgW2xheW91dE5vZGVdPVwibGF5b3V0Tm9kZVwiPjwvc2VsZWN0LXdpZGdldC13aWRnZXQ+YCxcbn0pXG5leHBvcnQgY2xhc3MgTm9GcmFtZXdvcmtDb21wb25lbnQge1xuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cbn1cbiJdfQ==