import { ChangeDetectorRef, Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { isDefined } from '@ngsf/common';
import { JsonSchemaFormService } from '@ngsf/widget-library';
import * as i0 from "@angular/core";
import * as i1 from "@ngsf/widget-library";
import * as i2 from "@angular/common";
function MaterialDesignFrameworkComponent__svg_svg_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 4);
    i0.ɵɵlistener("click", function MaterialDesignFrameworkComponent__svg_svg_1_Template__svg_svg_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.removeItem()); });
    i0.ɵɵelement(1, "path", 5);
    i0.ɵɵelementEnd();
} }
function MaterialDesignFrameworkComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 6);
} }
export class MaterialDesignFrameworkComponent {
    constructor(changeDetector, jsf) {
        this.changeDetector = changeDetector;
        this.jsf = jsf;
        this.frameworkInitialized = false;
        this.formControl = null;
        this.parentArray = null;
        this.isOrderable = false;
        this.dynamicTitle = null;
    }
    get showRemoveButton() {
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
    }
    ngOnInit() {
        this.initializeFramework();
    }
    ngOnChanges() {
        if (!this.frameworkInitialized) {
            this.initializeFramework();
        }
        if (this.dynamicTitle) {
            this.updateTitle();
        }
    }
    initializeFramework() {
        if (this.layoutNode) {
            this.options = _.cloneDeep(this.layoutNode.options || {});
            this.widgetLayoutNode = {
                ...this.layoutNode,
                options: _.cloneDeep(this.layoutNode.options || {})
            };
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
    }
    updateTitle() {
        this.widgetLayoutNode.options.title = this.jsf.parseText(this.dynamicTitle, this.jsf.getFormControlValue(this), this.jsf.getFormControlGroup(this).value, this.dataIndex[this.dataIndex.length - 1]);
    }
    removeItem() {
        this.jsf.removeItem(this);
    }
}
MaterialDesignFrameworkComponent.ɵfac = function MaterialDesignFrameworkComponent_Factory(t) { return new (t || MaterialDesignFrameworkComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
MaterialDesignFrameworkComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MaterialDesignFrameworkComponent, selectors: [["material-design-framework"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, features: [i0.ɵɵNgOnChangesFeature], decls: 4, vars: 11, consts: [[3, "orderable", "dataIndex", "layoutIndex", "layoutNode"], ["xmlns", "http://www.w3.org/2000/svg", "height", "18", "width", "18", "viewBox", "0 0 24 24", "class", "close-button", 3, "click", 4, "ngIf"], [3, "dataIndex", "layoutIndex", "layoutNode"], ["class", "spacer", 4, "ngIf"], ["xmlns", "http://www.w3.org/2000/svg", "height", "18", "width", "18", "viewBox", "0 0 24 24", 1, "close-button", 3, "click"], ["d", "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"], [1, "spacer"]], template: function MaterialDesignFrameworkComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, MaterialDesignFrameworkComponent__svg_svg_1_Template, 2, 0, "svg", 1);
        i0.ɵɵelement(2, "select-widget-widget", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(3, MaterialDesignFrameworkComponent_div_3_Template, 1, 0, "div", 3);
    } if (rf & 2) {
        i0.ɵɵclassProp("array-item", (ctx.widgetLayoutNode == null ? null : ctx.widgetLayoutNode.arrayItem) && (ctx.widgetLayoutNode == null ? null : ctx.widgetLayoutNode.type) !== "$ref");
        i0.ɵɵproperty("orderable", ctx.isOrderable)("dataIndex", ctx.dataIndex)("layoutIndex", ctx.layoutIndex)("layoutNode", ctx.widgetLayoutNode);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showRemoveButton);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("dataIndex", ctx.dataIndex)("layoutIndex", ctx.layoutIndex)("layoutNode", ctx.widgetLayoutNode);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx.widgetLayoutNode == null ? null : ctx.widgetLayoutNode.arrayItem) && (ctx.widgetLayoutNode == null ? null : ctx.widgetLayoutNode.type) !== "$ref");
    } }, dependencies: [i2.NgIf, i1.SelectWidgetComponent, i1.OrderableDirective], styles: [".array-item[_ngcontent-%COMP%]{border-radius:2px;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;padding:6px;position:relative;transition:all .28s cubic-bezier(.4,0,.2,1)}.close-button[_ngcontent-%COMP%]{cursor:pointer;position:absolute;top:6px;right:6px;fill:#0006;visibility:hidden;z-index:500}.close-button[_ngcontent-%COMP%]:hover{fill:#000c}.array-item[_ngcontent-%COMP%]:hover > .close-button[_ngcontent-%COMP%]{visibility:visible}.spacer[_ngcontent-%COMP%]{margin:6px 0}[draggable=true][_ngcontent-%COMP%]:hover{box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f;cursor:move;z-index:10}[draggable=true].drag-target-top[_ngcontent-%COMP%]{box-shadow:0 -2px #000;position:relative;z-index:20}[draggable=true].drag-target-bottom[_ngcontent-%COMP%]{box-shadow:0 2px #000;position:relative;z-index:20}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialDesignFrameworkComponent, [{
        type: Component,
        args: [{ selector: 'material-design-framework', template: `
      <div
              [class.array-item]="widgetLayoutNode?.arrayItem && widgetLayoutNode?.type !== '$ref'"
              [orderable]="isOrderable"
              [dataIndex]="dataIndex"
              [layoutIndex]="layoutIndex"
              [layoutNode]="widgetLayoutNode">
          <svg *ngIf="showRemoveButton"
               xmlns="http://www.w3.org/2000/svg"
               height="18" width="18" viewBox="0 0 24 24"
               class="close-button"
               (click)="removeItem()">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
          </svg>
          <select-widget-widget
                  [dataIndex]="dataIndex"
                  [layoutIndex]="layoutIndex"
                  [layoutNode]="widgetLayoutNode"></select-widget-widget>
      </div>
      <div class="spacer" *ngIf="widgetLayoutNode?.arrayItem && widgetLayoutNode?.type !== '$ref'"></div>`, styles: [".array-item{border-radius:2px;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;padding:6px;position:relative;transition:all .28s cubic-bezier(.4,0,.2,1)}.close-button{cursor:pointer;position:absolute;top:6px;right:6px;fill:#0006;visibility:hidden;z-index:500}.close-button:hover{fill:#000c}.array-item:hover>.close-button{visibility:visible}.spacer{margin:6px 0}[draggable=true]:hover{box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f;cursor:move;z-index:10}[draggable=true].drag-target-top{box-shadow:0 -2px #000;position:relative;z-index:20}[draggable=true].drag-target-bottom{box-shadow:0 2px #000;position:relative;z-index:20}\n"] }]
    }], function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLW1hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsvc3JjL2xpYi9jb21wb25lbnRzL21hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFvQixNQUFNLGVBQWUsQ0FBQTtBQUNwRixPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQTtBQUMzQixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBQ3RDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNCQUFzQixDQUFBOzs7Ozs7SUFXaEQsbUJBSTRCO0lBSjVCLDhCQUk0QjtJQUF2QixvTEFBUyxlQUFBLG1CQUFZLENBQUEsSUFBQztJQUN2QiwwQkFBeUg7SUFDN0gsaUJBQU07OztJQU1WLHlCQUFtRzs7QUF1RHpHLE1BQU0sT0FBTyxnQ0FBZ0M7SUFjM0MsWUFDVSxjQUFpQyxFQUNqQyxHQUEwQjtRQUQxQixtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFDakMsUUFBRyxHQUFILEdBQUcsQ0FBdUI7UUFmcEMseUJBQW9CLEdBQUcsS0FBSyxDQUFBO1FBSzVCLGdCQUFXLEdBQVEsSUFBSSxDQUFBO1FBQ3ZCLGdCQUFXLEdBQVEsSUFBSSxDQUFBO1FBQ3ZCLGdCQUFXLEdBQUcsS0FBSyxDQUFBO1FBQ25CLGlCQUFZLEdBQVcsSUFBSSxDQUFBO0lBUzNCLENBQUM7SUFFRCxJQUFJLGdCQUFnQjtRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUztZQUNuRCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsSUFBSSxJQUFJLENB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RytEO1FBQ25FLGlCQUFNO1FBQ04saUZBQW1HOztRQWpCM0Ysb0xBQXFGO1FBQ3JGLDJDQUF5Qiw0QkFBQSxnQ0FBQSxvQ0FBQTtRQUl2QixlQUFzQjtRQUF0QiwyQ0FBc0I7UUFRcEIsZUFBdUI7UUFBdkIseUNBQXVCLGdDQUFBLG9DQUFBO1FBSWQsZUFBc0U7UUFBdEUsNktBQXNFOzt1RkF1RHBGLGdDQUFnQztjQTVFNUMsU0FBUzsyQkFDRSwyQkFBMkIsWUFDM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEdBbUI4Rjt3R0FpRS9GLFVBQVU7a0JBQWxCLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQge2lzRGVmaW5lZH0gZnJvbSAnQG5nc2YvY29tbW9uJ1xuaW1wb3J0IHtKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJ0BuZ3NmL3dpZGdldC1saWJyYXJ5J1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxkaXZcbiAgICAgICAgICAgICAgW2NsYXNzLmFycmF5LWl0ZW1dPVwid2lkZ2V0TGF5b3V0Tm9kZT8uYXJyYXlJdGVtICYmIHdpZGdldExheW91dE5vZGU/LnR5cGUgIT09ICckcmVmJ1wiXG4gICAgICAgICAgICAgIFtvcmRlcmFibGVdPVwiaXNPcmRlcmFibGVcIlxuICAgICAgICAgICAgICBbZGF0YUluZGV4XT1cImRhdGFJbmRleFwiXG4gICAgICAgICAgICAgIFtsYXlvdXRJbmRleF09XCJsYXlvdXRJbmRleFwiXG4gICAgICAgICAgICAgIFtsYXlvdXROb2RlXT1cIndpZGdldExheW91dE5vZGVcIj5cbiAgICAgICAgICA8c3ZnICpuZ0lmPVwic2hvd1JlbW92ZUJ1dHRvblwiXG4gICAgICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgICAgICAgIGhlaWdodD1cIjE4XCIgd2lkdGg9XCIxOFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxuICAgICAgICAgICAgICAgY2xhc3M9XCJjbG9zZS1idXR0b25cIlxuICAgICAgICAgICAgICAgKGNsaWNrKT1cInJlbW92ZUl0ZW0oKVwiPlxuICAgICAgICAgICAgICA8cGF0aCBkPVwiTTE5IDYuNDFMMTcuNTkgNSAxMiAxMC41OSA2LjQxIDUgNSA2LjQxIDEwLjU5IDEyIDUgMTcuNTkgNi40MSAxOSAxMiAxMy40MSAxNy41OSAxOSAxOSAxNy41OSAxMy40MSAxMiAxOSA2LjQxelwiLz5cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICA8c2VsZWN0LXdpZGdldC13aWRnZXRcbiAgICAgICAgICAgICAgICAgIFtkYXRhSW5kZXhdPVwiZGF0YUluZGV4XCJcbiAgICAgICAgICAgICAgICAgIFtsYXlvdXRJbmRleF09XCJsYXlvdXRJbmRleFwiXG4gICAgICAgICAgICAgICAgICBbbGF5b3V0Tm9kZV09XCJ3aWRnZXRMYXlvdXROb2RlXCI+PC9zZWxlY3Qtd2lkZ2V0LXdpZGdldD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNwYWNlclwiICpuZ0lmPVwid2lkZ2V0TGF5b3V0Tm9kZT8uYXJyYXlJdGVtICYmIHdpZGdldExheW91dE5vZGU/LnR5cGUgIT09ICckcmVmJ1wiPjwvZGl2PmAsXG4gIHN0eWxlczogW2BcbiAgICAgIC5hcnJheS1pdGVtIHtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgICAgICAgYm94LXNoYWRvdzogMCAzcHggMXB4IC0ycHggcmdiYSgwLCAwLCAwLCAuMiksXG4gICAgICAgICAgMCAycHggMnB4IDAgcmdiYSgwLCAwLCAwLCAuMTQpLFxuICAgICAgICAgIDAgMXB4IDVweCAwIHJnYmEoMCwgMCwgMCwgLjEyKTtcbiAgICAgICAgICBwYWRkaW5nOiA2cHg7XG4gICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgIHRyYW5zaXRpb246IGFsbCAyODBtcyBjdWJpYy1iZXppZXIoLjQsIDAsIC4yLCAxKTtcbiAgICAgIH1cblxuICAgICAgLmNsb3NlLWJ1dHRvbiB7XG4gICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICB0b3A6IDZweDtcbiAgICAgICAgICByaWdodDogNnB4O1xuICAgICAgICAgIGZpbGw6IHJnYmEoMCwgMCwgMCwgLjQpO1xuICAgICAgICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICAgICAgICB6LWluZGV4OiA1MDA7XG4gICAgICB9XG5cbiAgICAgIC5jbG9zZS1idXR0b246aG92ZXIge1xuICAgICAgICAgIGZpbGw6IHJnYmEoMCwgMCwgMCwgLjgpO1xuICAgICAgfVxuXG4gICAgICAuYXJyYXktaXRlbTpob3ZlciA+IC5jbG9zZS1idXR0b24ge1xuICAgICAgICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gICAgICB9XG5cbiAgICAgIC5zcGFjZXIge1xuICAgICAgICAgIG1hcmdpbjogNnB4IDA7XG4gICAgICB9XG5cbiAgICAgIFtkcmFnZ2FibGU9dHJ1ZV06aG92ZXIge1xuICAgICAgICAgIGJveC1zaGFkb3c6IDAgNXB4IDVweCAtM3B4IHJnYmEoMCwgMCwgMCwgLjIpLFxuICAgICAgICAgIDAgOHB4IDEwcHggMXB4IHJnYmEoMCwgMCwgMCwgLjE0KSxcbiAgICAgICAgICAwIDNweCAxNHB4IDJweCByZ2JhKDAsIDAsIDAsIC4xMik7XG4gICAgICAgICAgY3Vyc29yOiBtb3ZlO1xuICAgICAgICAgIHotaW5kZXg6IDEwO1xuICAgICAgfVxuXG4gICAgICBbZHJhZ2dhYmxlPXRydWVdLmRyYWctdGFyZ2V0LXRvcCB7XG4gICAgICAgICAgYm94LXNoYWRvdzogMCAtMnB4IDAgIzAwMDtcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgei1pbmRleDogMjA7XG4gICAgICB9XG5cbiAgICAgIFtkcmFnZ2FibGU9dHJ1ZV0uZHJhZy10YXJnZXQtYm90dG9tIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDJweCAwICMwMDA7XG4gICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgIHotaW5kZXg6IDIwO1xuICAgICAgfVxuICBgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxEZXNpZ25GcmFtZXdvcmtDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIGZyYW1ld29ya0luaXRpYWxpemVkID0gZmFsc2VcbiAgaW5wdXRUeXBlOiBzdHJpbmdcbiAgb3B0aW9uczogYW55IC8vIE9wdGlvbnMgdXNlZCBpbiB0aGlzIGZyYW1ld29ya1xuICB3aWRnZXRMYXlvdXROb2RlOiBhbnkgLy8gbGF5b3V0Tm9kZSBwYXNzZWQgdG8gY2hpbGQgd2lkZ2V0XG4gIHdpZGdldE9wdGlvbnM6IGFueSAvLyBPcHRpb25zIHBhc3NlZCB0byBjaGlsZCB3aWRnZXRcbiAgZm9ybUNvbnRyb2w6IGFueSA9IG51bGxcbiAgcGFyZW50QXJyYXk6IGFueSA9IG51bGxcbiAgaXNPcmRlcmFibGUgPSBmYWxzZVxuICBkeW5hbWljVGl0bGU6IHN0cmluZyA9IG51bGxcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHtcbiAgfVxuXG4gIGdldCBzaG93UmVtb3ZlQnV0dG9uKCk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5sYXlvdXROb2RlIHx8ICF0aGlzLndpZGdldE9wdGlvbnMucmVtb3ZhYmxlIHx8XG4gICAgICB0aGlzLndpZGdldE9wdGlvbnMucmVhZG9ubHkgfHwgdGhpcy5sYXlvdXROb2RlLnR5cGUgPT09ICckcmVmJ1xuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGlmICh0aGlzLmxheW91dE5vZGUucmVjdXJzaXZlUmVmZXJlbmNlKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICBpZiAoIXRoaXMubGF5b3V0Tm9kZS5hcnJheUl0ZW0gfHwgIXRoaXMucGFyZW50QXJyYXkpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICAvLyBJZiBhcnJheSBsZW5ndGggPD0gbWluSXRlbXMsIGRvbid0IGFsbG93IHJlbW92aW5nIGFueSBpdGVtc1xuICAgIHJldHVybiB0aGlzLnBhcmVudEFycmF5Lml0ZW1zLmxlbmd0aCAtIDEgPD0gdGhpcy5wYXJlbnRBcnJheS5vcHRpb25zLm1pbkl0ZW1zID8gZmFsc2UgOlxuICAgICAgLy8gRm9yIHJlbW92YWJsZSBsaXN0IGl0ZW1zLCBhbGxvdyByZW1vdmluZyBhbnkgaXRlbVxuICAgICAgdGhpcy5sYXlvdXROb2RlLmFycmF5SXRlbVR5cGUgPT09ICdsaXN0JyA/IHRydWUgOlxuICAgICAgICAvLyBGb3IgcmVtb3ZhYmxlIHR1cGxlIGl0ZW1zLCBvbmx5IGFsbG93IHJlbW92aW5nIGxhc3QgaXRlbSBpbiBsaXN0XG4gICAgICAgIHRoaXMubGF5b3V0SW5kZXhbdGhpcy5sYXlvdXRJbmRleC5sZW5ndGggLSAxXSA9PT0gdGhpcy5wYXJlbnRBcnJheS5pdGVtcy5sZW5ndGggLSAyXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVGcmFtZXdvcmsoKVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgaWYgKCF0aGlzLmZyYW1ld29ya0luaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLmluaXRpYWxpemVGcmFtZXdvcmsoKVxuICAgIH1cbiAgICBpZiAodGhpcy5keW5hbWljVGl0bGUpIHtcbiAgICAgIHRoaXMudXBkYXRlVGl0bGUoKVxuICAgIH1cbiAgfVxuXG4gIGluaXRpYWxpemVGcmFtZXdvcmsoKSB7XG4gICAgaWYgKHRoaXMubGF5b3V0Tm9kZSkge1xuICAgICAgdGhpcy5vcHRpb25zID0gXy5jbG9uZURlZXAodGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge30pXG4gICAgICB0aGlzLndpZGdldExheW91dE5vZGUgPSB7XG4gICAgICAgIC4uLnRoaXMubGF5b3V0Tm9kZSxcbiAgICAgICAgb3B0aW9uczogXy5jbG9uZURlZXAodGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge30pXG4gICAgICB9XG4gICAgICB0aGlzLndpZGdldE9wdGlvbnMgPSB0aGlzLndpZGdldExheW91dE5vZGUub3B0aW9uc1xuICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IHRoaXMuanNmLmdldEZvcm1Db250cm9sKHRoaXMpXG5cbiAgICAgIGlmIChcbiAgICAgICAgaXNEZWZpbmVkKHRoaXMud2lkZ2V0T3B0aW9ucy5taW5pbXVtKSAmJlxuICAgICAgICBpc0RlZmluZWQodGhpcy53aWRnZXRPcHRpb25zLm1heGltdW0pICYmXG4gICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5tdWx0aXBsZU9mID49IDFcbiAgICAgICkge1xuICAgICAgICB0aGlzLmxheW91dE5vZGUudHlwZSA9ICdyYW5nZSdcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICAhWyckcmVmJywgJ2FkdmFuY2VkZmllbGRzZXQnLCAnYXV0aGZpZWxkc2V0JywgJ2J1dHRvbicsICdjYXJkJyxcbiAgICAgICAgICAnY2hlY2tib3gnLCAnZXhwYW5zaW9uLXBhbmVsJywgJ2hlbHAnLCAnbWVzc2FnZScsICdtc2cnLCAnc2VjdGlvbicsXG4gICAgICAgICAgJ3N1Ym1pdCcsICd0YWJhcnJheScsICd0YWJzJ10uaW5jbHVkZXModGhpcy5sYXlvdXROb2RlLnR5cGUpICYmXG4gICAgICAgIC97ey4rP319Ly50ZXN0KHRoaXMud2lkZ2V0T3B0aW9ucy50aXRsZSB8fCAnJylcbiAgICAgICkge1xuICAgICAgICB0aGlzLmR5bmFtaWNUaXRsZSA9IHRoaXMud2lkZ2V0T3B0aW9ucy50aXRsZVxuICAgICAgICB0aGlzLnVwZGF0ZVRpdGxlKClcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubGF5b3V0Tm9kZS5hcnJheUl0ZW0gJiYgdGhpcy5sYXlvdXROb2RlLnR5cGUgIT09ICckcmVmJykge1xuICAgICAgICB0aGlzLnBhcmVudEFycmF5ID0gdGhpcy5qc2YuZ2V0UGFyZW50Tm9kZSh0aGlzKVxuICAgICAgICBpZiAodGhpcy5wYXJlbnRBcnJheSkge1xuICAgICAgICAgIHRoaXMuaXNPcmRlcmFibGUgPVxuICAgICAgICAgICAgdGhpcy5wYXJlbnRBcnJheS50eXBlLnNsaWNlKDAsIDMpICE9PSAndGFiJyAmJlxuICAgICAgICAgICAgdGhpcy5sYXlvdXROb2RlLmFycmF5SXRlbVR5cGUgPT09ICdsaXN0JyAmJlxuICAgICAgICAgICAgIXRoaXMud2lkZ2V0T3B0aW9ucy5yZWFkb25seSAmJlxuICAgICAgICAgICAgdGhpcy5wYXJlbnRBcnJheS5vcHRpb25zLm9yZGVyYWJsZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZnJhbWV3b3JrSW5pdGlhbGl6ZWQgPSB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IHt9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlVGl0bGUoKSB7XG4gICAgdGhpcy53aWRnZXRMYXlvdXROb2RlLm9wdGlvbnMudGl0bGUgPSB0aGlzLmpzZi5wYXJzZVRleHQoXG4gICAgICB0aGlzLmR5bmFtaWNUaXRsZSxcbiAgICAgIHRoaXMuanNmLmdldEZvcm1Db250cm9sVmFsdWUodGhpcyksXG4gICAgICB0aGlzLmpzZi5nZXRGb3JtQ29udHJvbEdyb3VwKHRoaXMpLnZhbHVlLFxuICAgICAgdGhpcy5kYXRhSW5kZXhbdGhpcy5kYXRhSW5kZXgubGVuZ3RoIC0gMV1cbiAgICApXG4gIH1cblxuICByZW1vdmVJdGVtKCkge1xuICAgIHRoaXMuanNmLnJlbW92ZUl0ZW0odGhpcylcbiAgfVxufVxuIl19