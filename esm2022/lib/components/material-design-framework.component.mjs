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
class MaterialDesignFrameworkComponent {
    changeDetector;
    jsf;
    frameworkInitialized = false;
    inputType;
    options;
    widgetLayoutNode;
    widgetOptions;
    formControl = null;
    parentArray = null;
    isOrderable = false;
    dynamicTitle = null;
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(changeDetector, jsf) {
        this.changeDetector = changeDetector;
        this.jsf = jsf;
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
    static ɵfac = function MaterialDesignFrameworkComponent_Factory(t) { return new (t || MaterialDesignFrameworkComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
    static ɵcmp = i0.ɵɵdefineComponent({ type: MaterialDesignFrameworkComponent, selectors: [["material-design-framework"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, features: [i0.ɵɵNgOnChangesFeature], decls: 4, vars: 11, consts: [[3, "orderable", "dataIndex", "layoutIndex", "layoutNode"], ["xmlns", "http://www.w3.org/2000/svg", "height", "18", "width", "18", "viewBox", "0 0 24 24", "class", "close-button", 3, "click", 4, "ngIf"], [3, "dataIndex", "layoutIndex", "layoutNode"], ["class", "spacer", 4, "ngIf"], ["xmlns", "http://www.w3.org/2000/svg", "height", "18", "width", "18", "viewBox", "0 0 24 24", 1, "close-button", 3, "click"], ["d", "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"], [1, "spacer"]], template: function MaterialDesignFrameworkComponent_Template(rf, ctx) { if (rf & 1) {
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
}
export { MaterialDesignFrameworkComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLW1hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsvc3JjL2xpYi9jb21wb25lbnRzL21hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFvQixNQUFNLGVBQWUsQ0FBQTtBQUNwRixPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQTtBQUMzQixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBQ3RDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNCQUFzQixDQUFBOzs7Ozs7SUFXaEQsbUJBSTRCO0lBSjVCLDhCQUk0QjtJQUF2QixvTEFBUyxlQUFBLG1CQUFZLENBQUEsSUFBQztJQUN2QiwwQkFBeUg7SUFDN0gsaUJBQU07OztJQU1WLHlCQUFtRzs7QUFyQnpHLE1BNEVhLGdDQUFnQztJQWVqQztJQUNBO0lBZlYsb0JBQW9CLEdBQUcsS0FBSyxDQUFBO0lBQzVCLFNBQVMsQ0FBUTtJQUNqQixPQUFPLENBQUs7SUFDWixnQkFBZ0IsQ0FBSztJQUNyQixhQUFhLENBQUs7SUFDbEIsV0FBVyxHQUFRLElBQUksQ0FBQTtJQUN2QixXQUFXLEdBQVEsSUFBSSxDQUFBO0lBQ3ZCLFdBQVcsR0FBRyxLQUFLLENBQUE7SUFDbkIsWUFBWSxHQUFXLElBQUksQ0FBQTtJQUNsQixVQUFVLENBQUs7SUFDZixXQUFXLENBQVU7SUFDckIsU0FBUyxDQUFVO0lBRTVCLFlBQ1UsY0FBaUMsRUFDakMsR0FBMEI7UUFEMUIsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBQ2pDLFFBQUcsR0FBSCxHQUFHLENBQXVCO0lBRXBDLENBQUM7SUFFRCxJQUFJLGdC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Q0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzNCLENBQUM7MEZBN0dVLGdDQUFnQzsrQ0FBaEMsZ0NBQWdDO1lBekV2Qyw4QkFLd0M7WUFDcEMsc0ZBTU07WUFDTiwwQ0FHK0Q7WUFDbkUsaUJBQU07WUFDTixpRkFBbUc7O1lBakIzRixvTEFBcUY7WUFDckYsMkNBQXlCLDRCQUFBLGdDQUFBLG9DQUFBO1lBSXZCLGVBQXNCO1lBQXRCLDJDQUFzQjtZQVFwQixlQUF1QjtZQUF2Qix5Q0FBdUIsZ0NBQUEsb0NBQUE7WUFJZCxlQUFzRTtZQUF0RSw2S0FBc0U7OztTQXVEcEYsZ0NBQWdDO3VGQUFoQyxnQ0FBZ0M7Y0E1RTVDLFNBQVM7MkJBQ0UsMkJBQTJCLFlBQzNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBHQW1COEY7d0dBaUUvRixVQUFVO2tCQUFsQixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IHtpc0RlZmluZWR9IGZyb20gJ0BuZ3NmL2NvbW1vbidcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICdAbmdzZi93aWRnZXQtbGlicmFyeSdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yaycsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8ZGl2XG4gICAgICAgICAgICAgIFtjbGFzcy5hcnJheS1pdGVtXT1cIndpZGdldExheW91dE5vZGU/LmFycmF5SXRlbSAmJiB3aWRnZXRMYXlvdXROb2RlPy50eXBlICE9PSAnJHJlZidcIlxuICAgICAgICAgICAgICBbb3JkZXJhYmxlXT1cImlzT3JkZXJhYmxlXCJcbiAgICAgICAgICAgICAgW2RhdGFJbmRleF09XCJkYXRhSW5kZXhcIlxuICAgICAgICAgICAgICBbbGF5b3V0SW5kZXhdPVwibGF5b3V0SW5kZXhcIlxuICAgICAgICAgICAgICBbbGF5b3V0Tm9kZV09XCJ3aWRnZXRMYXlvdXROb2RlXCI+XG4gICAgICAgICAgPHN2ZyAqbmdJZj1cInNob3dSZW1vdmVCdXR0b25cIlxuICAgICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgICAgICAgICBoZWlnaHQ9XCIxOFwiIHdpZHRoPVwiMThcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcbiAgICAgICAgICAgICAgIGNsYXNzPVwiY2xvc2UtYnV0dG9uXCJcbiAgICAgICAgICAgICAgIChjbGljayk9XCJyZW1vdmVJdGVtKClcIj5cbiAgICAgICAgICAgICAgPHBhdGggZD1cIk0xOSA2LjQxTDE3LjU5IDUgMTIgMTAuNTkgNi40MSA1IDUgNi40MSAxMC41OSAxMiA1IDE3LjU5IDYuNDEgMTkgMTIgMTMuNDEgMTcuNTkgMTkgMTkgMTcuNTkgMTMuNDEgMTIgMTkgNi40MXpcIi8+XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgPHNlbGVjdC13aWRnZXQtd2lkZ2V0XG4gICAgICAgICAgICAgICAgICBbZGF0YUluZGV4XT1cImRhdGFJbmRleFwiXG4gICAgICAgICAgICAgICAgICBbbGF5b3V0SW5kZXhdPVwibGF5b3V0SW5kZXhcIlxuICAgICAgICAgICAgICAgICAgW2xheW91dE5vZGVdPVwid2lkZ2V0TGF5b3V0Tm9kZVwiPjwvc2VsZWN0LXdpZGdldC13aWRnZXQ+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIiAqbmdJZj1cIndpZGdldExheW91dE5vZGU/LmFycmF5SXRlbSAmJiB3aWRnZXRMYXlvdXROb2RlPy50eXBlICE9PSAnJHJlZidcIj48L2Rpdj5gLFxuICBzdHlsZXM6IFtgXG4gICAgICAuYXJyYXktaXRlbSB7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICAgIGJveC1zaGFkb3c6IDAgM3B4IDFweCAtMnB4IHJnYmEoMCwgMCwgMCwgLjIpLFxuICAgICAgICAgIDAgMnB4IDJweCAwIHJnYmEoMCwgMCwgMCwgLjE0KSxcbiAgICAgICAgICAwIDFweCA1cHggMCByZ2JhKDAsIDAsIDAsIC4xMik7XG4gICAgICAgICAgcGFkZGluZzogNnB4O1xuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMjgwbXMgY3ViaWMtYmV6aWVyKC40LCAwLCAuMiwgMSk7XG4gICAgICB9XG5cbiAgICAgIC5jbG9zZS1idXR0b24ge1xuICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgdG9wOiA2cHg7XG4gICAgICAgICAgcmlnaHQ6IDZweDtcbiAgICAgICAgICBmaWxsOiByZ2JhKDAsIDAsIDAsIC40KTtcbiAgICAgICAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgICAgICAgei1pbmRleDogNTAwO1xuICAgICAgfVxuXG4gICAgICAuY2xvc2UtYnV0dG9uOmhvdmVyIHtcbiAgICAgICAgICBmaWxsOiByZ2JhKDAsIDAsIDAsIC44KTtcbiAgICAgIH1cblxuICAgICAgLmFycmF5LWl0ZW06aG92ZXIgPiAuY2xvc2UtYnV0dG9uIHtcbiAgICAgICAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICAgICAgfVxuXG4gICAgICAuc3BhY2VyIHtcbiAgICAgICAgICBtYXJnaW46IDZweCAwO1xuICAgICAgfVxuXG4gICAgICBbZHJhZ2dhYmxlPXRydWVdOmhvdmVyIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDVweCA1cHggLTNweCByZ2JhKDAsIDAsIDAsIC4yKSxcbiAgICAgICAgICAwIDhweCAxMHB4IDFweCByZ2JhKDAsIDAsIDAsIC4xNCksXG4gICAgICAgICAgMCAzcHggMTRweCAycHggcmdiYSgwLCAwLCAwLCAuMTIpO1xuICAgICAgICAgIGN1cnNvcjogbW92ZTtcbiAgICAgICAgICB6LWluZGV4OiAxMDtcbiAgICAgIH1cblxuICAgICAgW2RyYWdnYWJsZT10cnVlXS5kcmFnLXRhcmdldC10b3Age1xuICAgICAgICAgIGJveC1zaGFkb3c6IDAgLTJweCAwICMwMDA7XG4gICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgIHotaW5kZXg6IDIwO1xuICAgICAgfVxuXG4gICAgICBbZHJhZ2dhYmxlPXRydWVdLmRyYWctdGFyZ2V0LWJvdHRvbSB7XG4gICAgICAgICAgYm94LXNoYWRvdzogMCAycHggMCAjMDAwO1xuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICB6LWluZGV4OiAyMDtcbiAgICAgIH1cbiAgYF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsRGVzaWduRnJhbWV3b3JrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBmcmFtZXdvcmtJbml0aWFsaXplZCA9IGZhbHNlXG4gIGlucHV0VHlwZTogc3RyaW5nXG4gIG9wdGlvbnM6IGFueSAvLyBPcHRpb25zIHVzZWQgaW4gdGhpcyBmcmFtZXdvcmtcbiAgd2lkZ2V0TGF5b3V0Tm9kZTogYW55IC8vIGxheW91dE5vZGUgcGFzc2VkIHRvIGNoaWxkIHdpZGdldFxuICB3aWRnZXRPcHRpb25zOiBhbnkgLy8gT3B0aW9ucyBwYXNzZWQgdG8gY2hpbGQgd2lkZ2V0XG4gIGZvcm1Db250cm9sOiBhbnkgPSBudWxsXG4gIHBhcmVudEFycmF5OiBhbnkgPSBudWxsXG4gIGlzT3JkZXJhYmxlID0gZmFsc2VcbiAgZHluYW1pY1RpdGxlOiBzdHJpbmcgPSBudWxsXG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBnZXQgc2hvd1JlbW92ZUJ1dHRvbigpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMubGF5b3V0Tm9kZSB8fCAhdGhpcy53aWRnZXRPcHRpb25zLnJlbW92YWJsZSB8fFxuICAgICAgdGhpcy53aWRnZXRPcHRpb25zLnJlYWRvbmx5IHx8IHRoaXMubGF5b3V0Tm9kZS50eXBlID09PSAnJHJlZidcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBpZiAodGhpcy5sYXlvdXROb2RlLnJlY3Vyc2l2ZVJlZmVyZW5jZSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgaWYgKCF0aGlzLmxheW91dE5vZGUuYXJyYXlJdGVtIHx8ICF0aGlzLnBhcmVudEFycmF5KSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgLy8gSWYgYXJyYXkgbGVuZ3RoIDw9IG1pbkl0ZW1zLCBkb24ndCBhbGxvdyByZW1vdmluZyBhbnkgaXRlbXNcbiAgICByZXR1cm4gdGhpcy5wYXJlbnRBcnJheS5pdGVtcy5sZW5ndGggLSAxIDw9IHRoaXMucGFyZW50QXJyYXkub3B0aW9ucy5taW5JdGVtcyA/IGZhbHNlIDpcbiAgICAgIC8vIEZvciByZW1vdmFibGUgbGlzdCBpdGVtcywgYWxsb3cgcmVtb3ZpbmcgYW55IGl0ZW1cbiAgICAgIHRoaXMubGF5b3V0Tm9kZS5hcnJheUl0ZW1UeXBlID09PSAnbGlzdCcgPyB0cnVlIDpcbiAgICAgICAgLy8gRm9yIHJlbW92YWJsZSB0dXBsZSBpdGVtcywgb25seSBhbGxvdyByZW1vdmluZyBsYXN0IGl0ZW0gaW4gbGlzdFxuICAgICAgICB0aGlzLmxheW91dEluZGV4W3RoaXMubGF5b3V0SW5kZXgubGVuZ3RoIC0gMV0gPT09IHRoaXMucGFyZW50QXJyYXkuaXRlbXMubGVuZ3RoIC0gMlxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplRnJhbWV3b3JrKClcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICghdGhpcy5mcmFtZXdvcmtJbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5pbml0aWFsaXplRnJhbWV3b3JrKClcbiAgICB9XG4gICAgaWYgKHRoaXMuZHluYW1pY1RpdGxlKSB7XG4gICAgICB0aGlzLnVwZGF0ZVRpdGxlKClcbiAgICB9XG4gIH1cblxuICBpbml0aWFsaXplRnJhbWV3b3JrKCkge1xuICAgIGlmICh0aGlzLmxheW91dE5vZGUpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IF8uY2xvbmVEZWVwKHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9KVxuICAgICAgdGhpcy53aWRnZXRMYXlvdXROb2RlID0ge1xuICAgICAgICAuLi50aGlzLmxheW91dE5vZGUsXG4gICAgICAgIG9wdGlvbnM6IF8uY2xvbmVEZWVwKHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9KVxuICAgICAgfVxuICAgICAgdGhpcy53aWRnZXRPcHRpb25zID0gdGhpcy53aWRnZXRMYXlvdXROb2RlLm9wdGlvbnNcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wgPSB0aGlzLmpzZi5nZXRGb3JtQ29udHJvbCh0aGlzKVxuXG4gICAgICBpZiAoXG4gICAgICAgIGlzRGVmaW5lZCh0aGlzLndpZGdldE9wdGlvbnMubWluaW11bSkgJiZcbiAgICAgICAgaXNEZWZpbmVkKHRoaXMud2lkZ2V0T3B0aW9ucy5tYXhpbXVtKSAmJlxuICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMubXVsdGlwbGVPZiA+PSAxXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5sYXlvdXROb2RlLnR5cGUgPSAncmFuZ2UnXG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgIVsnJHJlZicsICdhZHZhbmNlZGZpZWxkc2V0JywgJ2F1dGhmaWVsZHNldCcsICdidXR0b24nLCAnY2FyZCcsXG4gICAgICAgICAgJ2NoZWNrYm94JywgJ2V4cGFuc2lvbi1wYW5lbCcsICdoZWxwJywgJ21lc3NhZ2UnLCAnbXNnJywgJ3NlY3Rpb24nLFxuICAgICAgICAgICdzdWJtaXQnLCAndGFiYXJyYXknLCAndGFicyddLmluY2x1ZGVzKHRoaXMubGF5b3V0Tm9kZS50eXBlKSAmJlxuICAgICAgICAve3suKz99fS8udGVzdCh0aGlzLndpZGdldE9wdGlvbnMudGl0bGUgfHwgJycpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5keW5hbWljVGl0bGUgPSB0aGlzLndpZGdldE9wdGlvbnMudGl0bGVcbiAgICAgICAgdGhpcy51cGRhdGVUaXRsZSgpXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmxheW91dE5vZGUuYXJyYXlJdGVtICYmIHRoaXMubGF5b3V0Tm9kZS50eXBlICE9PSAnJHJlZicpIHtcbiAgICAgICAgdGhpcy5wYXJlbnRBcnJheSA9IHRoaXMuanNmLmdldFBhcmVudE5vZGUodGhpcylcbiAgICAgICAgaWYgKHRoaXMucGFyZW50QXJyYXkpIHtcbiAgICAgICAgICB0aGlzLmlzT3JkZXJhYmxlID1cbiAgICAgICAgICAgIHRoaXMucGFyZW50QXJyYXkudHlwZS5zbGljZSgwLCAzKSAhPT0gJ3RhYicgJiZcbiAgICAgICAgICAgIHRoaXMubGF5b3V0Tm9kZS5hcnJheUl0ZW1UeXBlID09PSAnbGlzdCcgJiZcbiAgICAgICAgICAgICF0aGlzLndpZGdldE9wdGlvbnMucmVhZG9ubHkgJiZcbiAgICAgICAgICAgIHRoaXMucGFyZW50QXJyYXkub3B0aW9ucy5vcmRlcmFibGVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmZyYW1ld29ya0luaXRpYWxpemVkID0gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wdGlvbnMgPSB7fVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVRpdGxlKCkge1xuICAgIHRoaXMud2lkZ2V0TGF5b3V0Tm9kZS5vcHRpb25zLnRpdGxlID0gdGhpcy5qc2YucGFyc2VUZXh0KFxuICAgICAgdGhpcy5keW5hbWljVGl0bGUsXG4gICAgICB0aGlzLmpzZi5nZXRGb3JtQ29udHJvbFZhbHVlKHRoaXMpLFxuICAgICAgdGhpcy5qc2YuZ2V0Rm9ybUNvbnRyb2xHcm91cCh0aGlzKS52YWx1ZSxcbiAgICAgIHRoaXMuZGF0YUluZGV4W3RoaXMuZGF0YUluZGV4Lmxlbmd0aCAtIDFdXG4gICAgKVxuICB9XG5cbiAgcmVtb3ZlSXRlbSgpIHtcbiAgICB0aGlzLmpzZi5yZW1vdmVJdGVtKHRoaXMpXG4gIH1cbn1cbiJdfQ==