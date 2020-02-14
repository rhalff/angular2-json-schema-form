var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { isDefined } from '@ngsf/common';
import { JsonSchemaFormService } from '@ngsf/widget-library';
var MaterialDesignFrameworkComponent = (function () {
    function MaterialDesignFrameworkComponent(changeDetector, jsf) {
        this.changeDetector = changeDetector;
        this.jsf = jsf;
        this.frameworkInitialized = false;
        this.formControl = null;
        this.parentArray = null;
        this.isOrderable = false;
        this.dynamicTitle = null;
    }
    Object.defineProperty(MaterialDesignFrameworkComponent.prototype, "showRemoveButton", {
        get: function () {
            if (!this.layoutNode || !this.widgetOptions.removable ||
                this.widgetOptions.readonly || this.layoutNode.type === '$ref') {
                return false;
            }
            if (this.layoutNode.recursiveReference) {
                return true;
            }
            if (!this.layoutNode.arrayItem || !this.parentArray) {
                return false;
            }
            return this.parentArray.items.length - 1 <= this.parentArray.options.minItems ? false :
                this.layoutNode.arrayItemType === 'list' ? true :
                    this.layoutIndex[this.layoutIndex.length - 1] === this.parentArray.items.length - 2;
        },
        enumerable: true,
        configurable: true
    });
    MaterialDesignFrameworkComponent.prototype.ngOnInit = function () {
        this.initializeFramework();
    };
    MaterialDesignFrameworkComponent.prototype.ngOnChanges = function () {
        if (!this.frameworkInitialized) {
            this.initializeFramework();
        }
        if (this.dynamicTitle) {
            this.updateTitle();
        }
    };
    MaterialDesignFrameworkComponent.prototype.initializeFramework = function () {
        if (this.layoutNode) {
            this.options = _.cloneDeep(this.layoutNode.options || {});
            this.widgetLayoutNode = __assign(__assign({}, this.layoutNode), { options: _.cloneDeep(this.layoutNode.options || {}) });
            this.widgetOptions = this.widgetLayoutNode.options;
            this.formControl = this.jsf.getFormControl(this);
            if (isDefined(this.widgetOptions.minimum) &&
                isDefined(this.widgetOptions.maximum) &&
                this.widgetOptions.multipleOf >= 1) {
                this.layoutNode.type = 'range';
            }
            if (!['$ref', 'advancedfieldset', 'authfieldset', 'button', 'card',
                'checkbox', 'expansion-panel', 'help', 'message', 'msg', 'section',
                'submit', 'tabarray', 'tabs'].includes(this.layoutNode.type) &&
                /{{.+?}}/.test(this.widgetOptions.title || '')) {
                this.dynamicTitle = this.widgetOptions.title;
                this.updateTitle();
            }
            if (this.layoutNode.arrayItem && this.layoutNode.type !== '$ref') {
                this.parentArray = this.jsf.getParentNode(this);
                if (this.parentArray) {
                    this.isOrderable =
                        this.parentArray.type.slice(0, 3) !== 'tab' &&
                            this.layoutNode.arrayItemType === 'list' &&
                            !this.widgetOptions.readonly &&
                            this.parentArray.options.orderable;
                }
            }
            this.frameworkInitialized = true;
        }
        else {
            this.options = {};
        }
    };
    MaterialDesignFrameworkComponent.prototype.updateTitle = function () {
        this.widgetLayoutNode.options.title = this.jsf.parseText(this.dynamicTitle, this.jsf.getFormControlValue(this), this.jsf.getFormControlGroup(this).value, this.dataIndex[this.dataIndex.length - 1]);
    };
    MaterialDesignFrameworkComponent.prototype.removeItem = function () {
        this.jsf.removeItem(this);
    };
    MaterialDesignFrameworkComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: JsonSchemaFormService }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MaterialDesignFrameworkComponent.prototype, "layoutNode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], MaterialDesignFrameworkComponent.prototype, "layoutIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], MaterialDesignFrameworkComponent.prototype, "dataIndex", void 0);
    MaterialDesignFrameworkComponent = __decorate([
        Component({
            selector: 'material-design-framework',
            template: "\n      <div\n              [class.array-item]=\"widgetLayoutNode?.arrayItem && widgetLayoutNode?.type !== '$ref'\"\n              [orderable]=\"isOrderable\"\n              [dataIndex]=\"dataIndex\"\n              [layoutIndex]=\"layoutIndex\"\n              [layoutNode]=\"widgetLayoutNode\">\n          <svg *ngIf=\"showRemoveButton\"\n               xmlns=\"http://www.w3.org/2000/svg\"\n               height=\"18\" width=\"18\" viewBox=\"0 0 24 24\"\n               class=\"close-button\"\n               (click)=\"removeItem()\">\n              <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z\"/>\n          </svg>\n          <select-widget-widget\n                  [dataIndex]=\"dataIndex\"\n                  [layoutIndex]=\"layoutIndex\"\n                  [layoutNode]=\"widgetLayoutNode\"></select-widget-widget>\n      </div>\n      <div class=\"spacer\" *ngIf=\"widgetLayoutNode?.arrayItem && widgetLayoutNode?.type !== '$ref'\"></div>",
            styles: ["\n      .array-item {\n          border-radius: 2px;\n          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2),\n          0 2px 2px 0 rgba(0, 0, 0, .14),\n          0 1px 5px 0 rgba(0, 0, 0, .12);\n          padding: 6px;\n          position: relative;\n          transition: all 280ms cubic-bezier(.4, 0, .2, 1);\n      }\n\n      .close-button {\n          cursor: pointer;\n          position: absolute;\n          top: 6px;\n          right: 6px;\n          fill: rgba(0, 0, 0, .4);\n          visibility: hidden;\n          z-index: 500;\n      }\n\n      .close-button:hover {\n          fill: rgba(0, 0, 0, .8);\n      }\n\n      .array-item:hover > .close-button {\n          visibility: visible;\n      }\n\n      .spacer {\n          margin: 6px 0;\n      }\n\n      [draggable=true]:hover {\n          box-shadow: 0 5px 5px -3px rgba(0, 0, 0, .2),\n          0 8px 10px 1px rgba(0, 0, 0, .14),\n          0 3px 14px 2px rgba(0, 0, 0, .12);\n          cursor: move;\n          z-index: 10;\n      }\n\n      [draggable=true].drag-target-top {\n          box-shadow: 0 -2px 0 #000;\n          position: relative;\n          z-index: 20;\n      }\n\n      [draggable=true].drag-target-bottom {\n          box-shadow: 0 2px 0 #000;\n          position: relative;\n          z-index: 20;\n      }\n  "]
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            JsonSchemaFormService])
    ], MaterialDesignFrameworkComponent);
    return MaterialDesignFrameworkComponent;
}());
export { MaterialDesignFrameworkComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdzZi9tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFBO0FBQ3BGLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFBO0FBQzNCLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFDdEMsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7QUE4RTFEO0lBY0UsMENBQ1UsY0FBaUMsRUFDakMsR0FBMEI7UUFEMUIsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBQ2pDLFFBQUcsR0FBSCxHQUFHLENBQXVCO1FBZnBDLHlCQUFvQixHQUFHLEtBQUssQ0FBQTtRQUs1QixnQkFBVyxHQUFRLElBQUksQ0FBQTtRQUN2QixnQkFBVyxHQUFRLElBQUksQ0FBQTtRQUN2QixnQkFBVyxHQUFHLEtBQUssQ0FBQTtRQUNuQixpQkFBWSxHQUFXLElBQUksQ0FBQTtJQVMzQixDQUFDO0lBRUQsc0JBQUksOERBQWdCO2FBQXBCO1lBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVM7Z0JBQ25ELElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFDOUQ7Z0JBQ0EsT0FBTyxLQUFLLENBQUE7YUFDYjtZQUNELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFB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NUMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDJCQUEyQjtZQUNyQyxRQUFRLEVBQUUsZ2dDQW1COEY7cUJBQy9GLDJ4Q0FvRFI7U0FDRixDQUFDO3lDQWdCMEIsaUJBQWlCO1lBQzVCLHFCQUFxQjtPQWhCekIsZ0NBQWdDLENBOEc1QztJQUFELHVDQUFDO0NBQUEsQUE5R0QsSUE4R0M7U0E5R1ksZ0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCB7aXNEZWZpbmVkfSBmcm9tICdAbmdzZi9jb21tb24nXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnQG5nc2Yvd2lkZ2V0LWxpYnJhcnknXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPGRpdlxuICAgICAgICAgICAgICBbY2xhc3MuYXJyYXktaXRlbV09XCJ3aWRnZXRMYXlvdXROb2RlPy5hcnJheUl0ZW0gJiYgd2lkZ2V0TGF5b3V0Tm9kZT8udHlwZSAhPT0gJyRyZWYnXCJcbiAgICAgICAgICAgICAgW29yZGVyYWJsZV09XCJpc09yZGVyYWJsZVwiXG4gICAgICAgICAgICAgIFtkYXRhSW5kZXhdPVwiZGF0YUluZGV4XCJcbiAgICAgICAgICAgICAgW2xheW91dEluZGV4XT1cImxheW91dEluZGV4XCJcbiAgICAgICAgICAgICAgW2xheW91dE5vZGVdPVwid2lkZ2V0TGF5b3V0Tm9kZVwiPlxuICAgICAgICAgIDxzdmcgKm5nSWY9XCJzaG93UmVtb3ZlQnV0dG9uXCJcbiAgICAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgICAgICAgICAgaGVpZ2h0PVwiMThcIiB3aWR0aD1cIjE4XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiXG4gICAgICAgICAgICAgICBjbGFzcz1cImNsb3NlLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAoY2xpY2spPVwicmVtb3ZlSXRlbSgpXCI+XG4gICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTkgNi40MUwxNy41OSA1IDEyIDEwLjU5IDYuNDEgNSA1IDYuNDEgMTAuNTkgMTIgNSAxNy41OSA2LjQxIDE5IDEyIDEzLjQxIDE3LjU5IDE5IDE5IDE3LjU5IDEzLjQxIDEyIDE5IDYuNDF6XCIvPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDxzZWxlY3Qtd2lkZ2V0LXdpZGdldFxuICAgICAgICAgICAgICAgICAgW2RhdGFJbmRleF09XCJkYXRhSW5kZXhcIlxuICAgICAgICAgICAgICAgICAgW2xheW91dEluZGV4XT1cImxheW91dEluZGV4XCJcbiAgICAgICAgICAgICAgICAgIFtsYXlvdXROb2RlXT1cIndpZGdldExheW91dE5vZGVcIj48L3NlbGVjdC13aWRnZXQtd2lkZ2V0PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCIgKm5nSWY9XCJ3aWRnZXRMYXlvdXROb2RlPy5hcnJheUl0ZW0gJiYgd2lkZ2V0TGF5b3V0Tm9kZT8udHlwZSAhPT0gJyRyZWYnXCI+PC9kaXY+YCxcbiAgc3R5bGVzOiBbYFxuICAgICAgLmFycmF5LWl0ZW0ge1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDNweCAxcHggLTJweCByZ2JhKDAsIDAsIDAsIC4yKSxcbiAgICAgICAgICAwIDJweCAycHggMCByZ2JhKDAsIDAsIDAsIC4xNCksXG4gICAgICAgICAgMCAxcHggNXB4IDAgcmdiYSgwLCAwLCAwLCAuMTIpO1xuICAgICAgICAgIHBhZGRpbmc6IDZweDtcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgdHJhbnNpdGlvbjogYWxsIDI4MG1zIGN1YmljLWJlemllciguNCwgMCwgLjIsIDEpO1xuICAgICAgfVxuXG4gICAgICAuY2xvc2UtYnV0dG9uIHtcbiAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgIHRvcDogNnB4O1xuICAgICAgICAgIHJpZ2h0OiA2cHg7XG4gICAgICAgICAgZmlsbDogcmdiYSgwLCAwLCAwLCAuNCk7XG4gICAgICAgICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgICAgICAgIHotaW5kZXg6IDUwMDtcbiAgICAgIH1cblxuICAgICAgLmNsb3NlLWJ1dHRvbjpob3ZlciB7XG4gICAgICAgICAgZmlsbDogcmdiYSgwLCAwLCAwLCAuOCk7XG4gICAgICB9XG5cbiAgICAgIC5hcnJheS1pdGVtOmhvdmVyID4gLmNsb3NlLWJ1dHRvbiB7XG4gICAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICAgIH1cblxuICAgICAgLnNwYWNlciB7XG4gICAgICAgICAgbWFyZ2luOiA2cHggMDtcbiAgICAgIH1cblxuICAgICAgW2RyYWdnYWJsZT10cnVlXTpob3ZlciB7XG4gICAgICAgICAgYm94LXNoYWRvdzogMCA1cHggNXB4IC0zcHggcmdiYSgwLCAwLCAwLCAuMiksXG4gICAgICAgICAgMCA4cHggMTBweCAxcHggcmdiYSgwLCAwLCAwLCAuMTQpLFxuICAgICAgICAgIDAgM3B4IDE0cHggMnB4IHJnYmEoMCwgMCwgMCwgLjEyKTtcbiAgICAgICAgICBjdXJzb3I6IG1vdmU7XG4gICAgICAgICAgei1pbmRleDogMTA7XG4gICAgICB9XG5cbiAgICAgIFtkcmFnZ2FibGU9dHJ1ZV0uZHJhZy10YXJnZXQtdG9wIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAwIC0ycHggMCAjMDAwO1xuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICB6LWluZGV4OiAyMDtcbiAgICAgIH1cblxuICAgICAgW2RyYWdnYWJsZT10cnVlXS5kcmFnLXRhcmdldC1ib3R0b20ge1xuICAgICAgICAgIGJveC1zaGFkb3c6IDAgMnB4IDAgIzAwMDtcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgei1pbmRleDogMjA7XG4gICAgICB9XG4gIGBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbERlc2lnbkZyYW1ld29ya0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgZnJhbWV3b3JrSW5pdGlhbGl6ZWQgPSBmYWxzZVxuICBpbnB1dFR5cGU6IHN0cmluZ1xuICBvcHRpb25zOiBhbnkgLy8gT3B0aW9ucyB1c2VkIGluIHRoaXMgZnJhbWV3b3JrXG4gIHdpZGdldExheW91dE5vZGU6IGFueSAvLyBsYXlvdXROb2RlIHBhc3NlZCB0byBjaGlsZCB3aWRnZXRcbiAgd2lkZ2V0T3B0aW9uczogYW55IC8vIE9wdGlvbnMgcGFzc2VkIHRvIGNoaWxkIHdpZGdldFxuICBmb3JtQ29udHJvbDogYW55ID0gbnVsbFxuICBwYXJlbnRBcnJheTogYW55ID0gbnVsbFxuICBpc09yZGVyYWJsZSA9IGZhbHNlXG4gIGR5bmFtaWNUaXRsZTogc3RyaW5nID0gbnVsbFxuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgZ2V0IHNob3dSZW1vdmVCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmxheW91dE5vZGUgfHwgIXRoaXMud2lkZ2V0T3B0aW9ucy5yZW1vdmFibGUgfHxcbiAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5yZWFkb25seSB8fCB0aGlzLmxheW91dE5vZGUudHlwZSA9PT0gJyRyZWYnXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgaWYgKHRoaXMubGF5b3V0Tm9kZS5yZWN1cnNpdmVSZWZlcmVuY2UpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIGlmICghdGhpcy5sYXlvdXROb2RlLmFycmF5SXRlbSB8fCAhdGhpcy5wYXJlbnRBcnJheSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIC8vIElmIGFycmF5IGxlbmd0aCA8PSBtaW5JdGVtcywgZG9uJ3QgYWxsb3cgcmVtb3ZpbmcgYW55IGl0ZW1zXG4gICAgcmV0dXJuIHRoaXMucGFyZW50QXJyYXkuaXRlbXMubGVuZ3RoIC0gMSA8PSB0aGlzLnBhcmVudEFycmF5Lm9wdGlvbnMubWluSXRlbXMgPyBmYWxzZSA6XG4gICAgICAvLyBGb3IgcmVtb3ZhYmxlIGxpc3QgaXRlbXMsIGFsbG93IHJlbW92aW5nIGFueSBpdGVtXG4gICAgICB0aGlzLmxheW91dE5vZGUuYXJyYXlJdGVtVHlwZSA9PT0gJ2xpc3QnID8gdHJ1ZSA6XG4gICAgICAgIC8vIEZvciByZW1vdmFibGUgdHVwbGUgaXRlbXMsIG9ubHkgYWxsb3cgcmVtb3ZpbmcgbGFzdCBpdGVtIGluIGxpc3RcbiAgICAgICAgdGhpcy5sYXlvdXRJbmRleFt0aGlzLmxheW91dEluZGV4Lmxlbmd0aCAtIDFdID09PSB0aGlzLnBhcmVudEFycmF5Lml0ZW1zLmxlbmd0aCAtIDJcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZUZyYW1ld29yaygpXG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBpZiAoIXRoaXMuZnJhbWV3b3JrSW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZUZyYW1ld29yaygpXG4gICAgfVxuICAgIGlmICh0aGlzLmR5bmFtaWNUaXRsZSkge1xuICAgICAgdGhpcy51cGRhdGVUaXRsZSgpXG4gICAgfVxuICB9XG5cbiAgaW5pdGlhbGl6ZUZyYW1ld29yaygpIHtcbiAgICBpZiAodGhpcy5sYXlvdXROb2RlKSB7XG4gICAgICB0aGlzLm9wdGlvbnMgPSBfLmNsb25lRGVlcCh0aGlzLmxheW91dE5vZGUub3B0aW9ucyB8fCB7fSlcbiAgICAgIHRoaXMud2lkZ2V0TGF5b3V0Tm9kZSA9IHtcbiAgICAgICAgLi4udGhpcy5sYXlvdXROb2RlLFxuICAgICAgICBvcHRpb25zOiBfLmNsb25lRGVlcCh0aGlzLmxheW91dE5vZGUub3B0aW9ucyB8fCB7fSlcbiAgICAgIH1cbiAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucyA9IHRoaXMud2lkZ2V0TGF5b3V0Tm9kZS5vcHRpb25zXG4gICAgICB0aGlzLmZvcm1Db250cm9sID0gdGhpcy5qc2YuZ2V0Rm9ybUNvbnRyb2wodGhpcylcblxuICAgICAgaWYgKFxuICAgICAgICBpc0RlZmluZWQodGhpcy53aWRnZXRPcHRpb25zLm1pbmltdW0pICYmXG4gICAgICAgIGlzRGVmaW5lZCh0aGlzLndpZGdldE9wdGlvbnMubWF4aW11bSkgJiZcbiAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLm11bHRpcGxlT2YgPj0gMVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMubGF5b3V0Tm9kZS50eXBlID0gJ3JhbmdlJ1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgICFbJyRyZWYnLCAnYWR2YW5jZWRmaWVsZHNldCcsICdhdXRoZmllbGRzZXQnLCAnYnV0dG9uJywgJ2NhcmQnLFxuICAgICAgICAgICdjaGVja2JveCcsICdleHBhbnNpb24tcGFuZWwnLCAnaGVscCcsICdtZXNzYWdlJywgJ21zZycsICdzZWN0aW9uJyxcbiAgICAgICAgICAnc3VibWl0JywgJ3RhYmFycmF5JywgJ3RhYnMnXS5pbmNsdWRlcyh0aGlzLmxheW91dE5vZGUudHlwZSkgJiZcbiAgICAgICAgL3t7Lis/fX0vLnRlc3QodGhpcy53aWRnZXRPcHRpb25zLnRpdGxlIHx8ICcnKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuZHluYW1pY1RpdGxlID0gdGhpcy53aWRnZXRPcHRpb25zLnRpdGxlXG4gICAgICAgIHRoaXMudXBkYXRlVGl0bGUoKVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5sYXlvdXROb2RlLmFycmF5SXRlbSAmJiB0aGlzLmxheW91dE5vZGUudHlwZSAhPT0gJyRyZWYnKSB7XG4gICAgICAgIHRoaXMucGFyZW50QXJyYXkgPSB0aGlzLmpzZi5nZXRQYXJlbnROb2RlKHRoaXMpXG4gICAgICAgIGlmICh0aGlzLnBhcmVudEFycmF5KSB7XG4gICAgICAgICAgdGhpcy5pc09yZGVyYWJsZSA9XG4gICAgICAgICAgICB0aGlzLnBhcmVudEFycmF5LnR5cGUuc2xpY2UoMCwgMykgIT09ICd0YWInICYmXG4gICAgICAgICAgICB0aGlzLmxheW91dE5vZGUuYXJyYXlJdGVtVHlwZSA9PT0gJ2xpc3QnICYmXG4gICAgICAgICAgICAhdGhpcy53aWRnZXRPcHRpb25zLnJlYWRvbmx5ICYmXG4gICAgICAgICAgICB0aGlzLnBhcmVudEFycmF5Lm9wdGlvbnMub3JkZXJhYmxlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5mcmFtZXdvcmtJbml0aWFsaXplZCA9IHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcHRpb25zID0ge31cbiAgICB9XG4gIH1cblxuICB1cGRhdGVUaXRsZSgpIHtcbiAgICB0aGlzLndpZGdldExheW91dE5vZGUub3B0aW9ucy50aXRsZSA9IHRoaXMuanNmLnBhcnNlVGV4dChcbiAgICAgIHRoaXMuZHluYW1pY1RpdGxlLFxuICAgICAgdGhpcy5qc2YuZ2V0Rm9ybUNvbnRyb2xWYWx1ZSh0aGlzKSxcbiAgICAgIHRoaXMuanNmLmdldEZvcm1Db250cm9sR3JvdXAodGhpcykudmFsdWUsXG4gICAgICB0aGlzLmRhdGFJbmRleFt0aGlzLmRhdGFJbmRleC5sZW5ndGggLSAxXVxuICAgIClcbiAgfVxuXG4gIHJlbW92ZUl0ZW0oKSB7XG4gICAgdGhpcy5qc2YucmVtb3ZlSXRlbSh0aGlzKVxuICB9XG59XG4iXX0=