import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/json-schema-form.service";
import * as i2 from "@angular/common";
function MessageComponent_span_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 1);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r0.options == null ? null : ctx_r0.options.labelHtmlClass) || "");
    i0.ɵɵproperty("innerHTML", ctx_r0.message, i0.ɵɵsanitizeHtml);
} }
class MessageComponent {
    jsf;
    options;
    message = null;
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.message = this.options.help || this.options.helpvalue ||
            this.options.msg || this.options.message;
    }
    static ɵfac = function MessageComponent_Factory(t) { return new (t || MessageComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
    static ɵcmp = i0.ɵɵdefineComponent({ type: MessageComponent, selectors: [["message-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 1, vars: 1, consts: [[3, "class", "innerHTML", 4, "ngIf"], [3, "innerHTML"]], template: function MessageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, MessageComponent_span_0_Template, 1, 3, "span", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.message);
        } }, dependencies: [i2.NgIf], encapsulation: 2 });
}
export { MessageComponent };
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MessageComponent, [{
        type: Component,
        args: [{
                selector: 'message-widget',
                template: `
    <span *ngIf="message"
      [class]="options?.labelHtmlClass || ''"
      [innerHTML]="message"></span>`,
            }]
    }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLXdpZGdldC1saWJyYXJ5L3NyYy9saWIvY29tcG9uZW50cy9tZXNzYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQTtBQUN0RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQTs7Ozs7SUFLdEUsMEJBRStCOzs7SUFEN0Isb0ZBQXVDO0lBQ3ZDLDZEQUFxQjs7QUFMM0IsTUFPYSxnQkFBZ0I7SUFRakI7SUFQVixPQUFPLENBQUs7SUFDWixPQUFPLEdBQVcsSUFBSSxDQUFBO0lBQ2IsVUFBVSxDQUFLO0lBQ2YsV0FBVyxDQUFVO0lBQ3JCLFNBQVMsQ0FBVTtJQUU1QixZQUNVLEdBQTBCO1FBQTFCLFFBQUcsR0FBSCxHQUFHLENBQXVCO0lBRXBDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVM7WUFDeEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUE7SUFDNUMsQ0FBQzswRUFoQlUsZ0JBQWdCOytDQUFoQixnQkFBZ0I7WUFKekIsbUVBRStCOztZQUZ4QixrQ0FBYTs7O1NBSVgsZ0JBQWdCO3VGQUFoQixnQkFBZ0I7Y0FQNUIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRTs7O29DQUd3QjthQUNuQzt3RUFJVSxVQUFVO2tCQUFsQixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9qc29uLXNjaGVtYS1mb3JtLnNlcnZpY2UnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21lc3NhZ2Utd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3BhbiAqbmdJZj1cIm1lc3NhZ2VcIlxuICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmxhYmVsSHRtbENsYXNzIHx8ICcnXCJcbiAgICAgIFtpbm5lckhUTUxdPVwibWVzc2FnZVwiPjwvc3Bhbj5gLFxufSlcbmV4cG9ydCBjbGFzcyBNZXNzYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgb3B0aW9uczogYW55XG4gIG1lc3NhZ2U6IHN0cmluZyA9IG51bGxcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9XG4gICAgdGhpcy5tZXNzYWdlID0gdGhpcy5vcHRpb25zLmhlbHAgfHwgdGhpcy5vcHRpb25zLmhlbHB2YWx1ZSB8fFxuICAgICAgdGhpcy5vcHRpb25zLm1zZyB8fCB0aGlzLm9wdGlvbnMubWVzc2FnZVxuICB9XG59XG4iXX0=