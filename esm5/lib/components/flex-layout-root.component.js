var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '@ngsf/widget-library';
var FlexLayoutRootComponent = (function () {
    function FlexLayoutRootComponent(jsf) {
        this.jsf = jsf;
        this.isFlexItem = false;
    }
    FlexLayoutRootComponent.prototype.removeItem = function (item) {
        this.jsf.removeItem(item);
    };
    FlexLayoutRootComponent.prototype.getFlexAttribute = function (node, attribute) {
        var index = ['flex-grow', 'flex-shrink', 'flex-basis'].indexOf(attribute);
        return ((node.options || {}).flex || '').split(/\s+/)[index] ||
            (node.options || {})[attribute] || ['1', '1', 'auto'][index];
    };
    FlexLayoutRootComponent.prototype.showWidget = function (layoutNode) {
        return this.jsf.evaluateCondition(layoutNode, this.dataIndex);
    };
    FlexLayoutRootComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], FlexLayoutRootComponent.prototype, "dataIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], FlexLayoutRootComponent.prototype, "layoutIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], FlexLayoutRootComponent.prototype, "layout", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FlexLayoutRootComponent.prototype, "isFlexItem", void 0);
    FlexLayoutRootComponent = __decorate([
        Component({
            selector: 'flex-layout-root-widget',
            template: "\n      <div *ngFor=\"let layoutNode of layout; let i = index\"\n           [class.form-flex-item]=\"isFlexItem\"\n           [style.flex-grow]=\"getFlexAttribute(layoutNode, 'flex-grow')\"\n           [style.flex-shrink]=\"getFlexAttribute(layoutNode, 'flex-shrink')\"\n           [style.flex-basis]=\"getFlexAttribute(layoutNode, 'flex-basis')\"\n           [style.align-self]=\"(layoutNode?.options || {})['align-self']\"\n           [style.order]=\"layoutNode?.options?.order\"\n           [fxFlex]=\"layoutNode?.options?.fxFlex\"\n           [fxFlexOrder]=\"layoutNode?.options?.fxFlexOrder\"\n           [fxFlexOffset]=\"layoutNode?.options?.fxFlexOffset\"\n           [fxFlexAlign]=\"layoutNode?.options?.fxFlexAlign\">\n          <select-framework-widget *ngIf=\"showWidget(layoutNode)\"\n                                   [dataIndex]=\"layoutNode?.arrayItem ? (dataIndex || []).concat(i) : (dataIndex || [])\"\n                                   [layoutIndex]=\"(layoutIndex || []).concat(i)\"\n                                   [layoutNode]=\"layoutNode\"></select-framework-widget>\n          </div>",
            changeDetection: ChangeDetectionStrategy.Default
        }),
        __metadata("design:paramtypes", [JsonSchemaFormService])
    ], FlexLayoutRootComponent);
    return FlexLayoutRootComponent;
}());
export { FlexLayoutRootComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleC1sYXlvdXQtcm9vdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdzZi9tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZmxleC1sYXlvdXQtcm9vdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUE7QUFDdkUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7QUF1QjFEO0lBTUUsaUNBQ1UsR0FBMEI7UUFBMUIsUUFBRyxHQUFILEdBQUcsQ0FBdUI7UUFIM0IsZUFBVSxHQUFHLEtBQUssQ0FBQTtJQUszQixDQUFDO0lBRUQsNENBQVUsR0FBVixVQUFXLElBQUk7UUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMzQixDQUFDO0lBSUQsa0RBQWdCLEdBQWhCLFVBQWlCLElBQVMsRUFBRSxTQUFpQjtRQUMzQyxJQUFNLEtBQUssR0FBRyxDQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQzNFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDMUQsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNoRSxDQUFDO0lBRUQsNENBQVUsR0FBVixVQUFXLFVBQWU7UUFDeEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDL0QsQ0FBQzs7Z0JBbEJjLHFCQUFxQjs7SUFOM0I7UUFBUixLQUFLLEVBQUU7OzhEQUFvQjtJQUNuQjtRQUFSLEtBQUssRUFBRTs7Z0VBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFOzsyREFBYztJQUNiO1FBQVIsS0FBSyxFQUFFOzsrREFBbUI7SUFKaEIsdUJBQXVCO1FBckJuQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUseUJBQXlCO1lBQ25DLFFBQVEsRUFBRSwwbENBZ0JLO1lBQ2YsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87U0FDakQsQ0FBQzt5Q0FRZSxxQkFBcUI7T0FQekIsdUJBQXVCLENBMEJuQztJQUFELDhCQUFDO0NBQUEsQUExQkQsSUEwQkM7U0ExQlksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICdAbmdzZi93aWRnZXQtbGlicmFyeSdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmxleC1sYXlvdXQtcm9vdC13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgbGF5b3V0Tm9kZSBvZiBsYXlvdXQ7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICAgICBbY2xhc3MuZm9ybS1mbGV4LWl0ZW1dPVwiaXNGbGV4SXRlbVwiXG4gICAgICAgICAgIFtzdHlsZS5mbGV4LWdyb3ddPVwiZ2V0RmxleEF0dHJpYnV0ZShsYXlvdXROb2RlLCAnZmxleC1ncm93JylcIlxuICAgICAgICAgICBbc3R5bGUuZmxleC1zaHJpbmtdPVwiZ2V0RmxleEF0dHJpYnV0ZShsYXlvdXROb2RlLCAnZmxleC1zaHJpbmsnKVwiXG4gICAgICAgICAgIFtzdHlsZS5mbGV4LWJhc2lzXT1cImdldEZsZXhBdHRyaWJ1dGUobGF5b3V0Tm9kZSwgJ2ZsZXgtYmFzaXMnKVwiXG4gICAgICAgICAgIFtzdHlsZS5hbGlnbi1zZWxmXT1cIihsYXlvdXROb2RlPy5vcHRpb25zIHx8IHt9KVsnYWxpZ24tc2VsZiddXCJcbiAgICAgICAgICAgW3N0eWxlLm9yZGVyXT1cImxheW91dE5vZGU/Lm9wdGlvbnM/Lm9yZGVyXCJcbiAgICAgICAgICAgW2Z4RmxleF09XCJsYXlvdXROb2RlPy5vcHRpb25zPy5meEZsZXhcIlxuICAgICAgICAgICBbZnhGbGV4T3JkZXJdPVwibGF5b3V0Tm9kZT8ub3B0aW9ucz8uZnhGbGV4T3JkZXJcIlxuICAgICAgICAgICBbZnhGbGV4T2Zmc2V0XT1cImxheW91dE5vZGU/Lm9wdGlvbnM/LmZ4RmxleE9mZnNldFwiXG4gICAgICAgICAgIFtmeEZsZXhBbGlnbl09XCJsYXlvdXROb2RlPy5vcHRpb25zPy5meEZsZXhBbGlnblwiPlxuICAgICAgICAgIDxzZWxlY3QtZnJhbWV3b3JrLXdpZGdldCAqbmdJZj1cInNob3dXaWRnZXQobGF5b3V0Tm9kZSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZGF0YUluZGV4XT1cImxheW91dE5vZGU/LmFycmF5SXRlbSA/IChkYXRhSW5kZXggfHwgW10pLmNvbmNhdChpKSA6IChkYXRhSW5kZXggfHwgW10pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2xheW91dEluZGV4XT1cIihsYXlvdXRJbmRleCB8fCBbXSkuY29uY2F0KGkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2xheW91dE5vZGVdPVwibGF5b3V0Tm9kZVwiPjwvc2VsZWN0LWZyYW1ld29yay13aWRnZXQ+XG4gICAgICAgICAgPC9kaXY+YCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxufSlcbmV4cG9ydCBjbGFzcyBGbGV4TGF5b3V0Um9vdENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGxheW91dDogYW55W11cbiAgQElucHV0KCkgaXNGbGV4SXRlbSA9IGZhbHNlXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHtcbiAgfVxuXG4gIHJlbW92ZUl0ZW0oaXRlbSkge1xuICAgIHRoaXMuanNmLnJlbW92ZUl0ZW0oaXRlbSlcbiAgfVxuXG4gIC8vIFNldCBhdHRyaWJ1dGVzIGZvciBmbGV4Ym94IGNoaWxkXG4gIC8vIChjb250YWluZXIgYXR0cmlidXRlcyBhcmUgc2V0IGluIGZsZXgtbGF5b3V0LXNlY3Rpb24uY29tcG9uZW50KVxuICBnZXRGbGV4QXR0cmlidXRlKG5vZGU6IGFueSwgYXR0cmlidXRlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBpbmRleCA9IFsnZmxleC1ncm93JywgJ2ZsZXgtc2hyaW5rJywgJ2ZsZXgtYmFzaXMnXS5pbmRleE9mKGF0dHJpYnV0ZSlcbiAgICByZXR1cm4gKChub2RlLm9wdGlvbnMgfHwge30pLmZsZXggfHwgJycpLnNwbGl0KC9cXHMrLylbaW5kZXhdIHx8XG4gICAgICAobm9kZS5vcHRpb25zIHx8IHt9KVthdHRyaWJ1dGVdIHx8IFsnMScsICcxJywgJ2F1dG8nXVtpbmRleF1cbiAgfVxuXG4gIHNob3dXaWRnZXQobGF5b3V0Tm9kZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuanNmLmV2YWx1YXRlQ29uZGl0aW9uKGxheW91dE5vZGUsIHRoaXMuZGF0YUluZGV4KVxuICB9XG59XG4iXX0=