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
let MaterialDesignFrameworkComponent = class MaterialDesignFrameworkComponent {
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
            this.widgetLayoutNode = Object.assign(Object.assign({}, this.layoutNode), { options: _.cloneDeep(this.layoutNode.options || {}) });
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
};
MaterialDesignFrameworkComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: JsonSchemaFormService }
];
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
        template: `
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
      <div class="spacer" *ngIf="widgetLayoutNode?.arrayItem && widgetLayoutNode?.type !== '$ref'"></div>`,
        styles: [`
      .array-item {
          border-radius: 2px;
          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2),
          0 2px 2px 0 rgba(0, 0, 0, .14),
          0 1px 5px 0 rgba(0, 0, 0, .12);
          padding: 6px;
          position: relative;
          transition: all 280ms cubic-bezier(.4, 0, .2, 1);
      }

      .close-button {
          cursor: pointer;
          position: absolute;
          top: 6px;
          right: 6px;
          fill: rgba(0, 0, 0, .4);
          visibility: hidden;
          z-index: 500;
      }

      .close-button:hover {
          fill: rgba(0, 0, 0, .8);
      }

      .array-item:hover > .close-button {
          visibility: visible;
      }

      .spacer {
          margin: 6px 0;
      }

      [draggable=true]:hover {
          box-shadow: 0 5px 5px -3px rgba(0, 0, 0, .2),
          0 8px 10px 1px rgba(0, 0, 0, .14),
          0 3px 14px 2px rgba(0, 0, 0, .12);
          cursor: move;
          z-index: 10;
      }

      [draggable=true].drag-target-top {
          box-shadow: 0 -2px 0 #000;
          position: relative;
          z-index: 20;
      }

      [draggable=true].drag-target-bottom {
          box-shadow: 0 2px 0 #000;
          position: relative;
          z-index: 20;
      }
  `]
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef,
        JsonSchemaFormService])
], MaterialDesignFrameworkComponent);
export { MaterialDesignFrameworkComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdzZi9tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUNwRixPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQTtBQUMzQixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBQ3RDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNCQUFzQixDQUFBO0FBOEUxRCxJQUFhLGdDQUFnQyxHQUE3QyxNQUFhLGdDQUFnQztJQWMzQyxZQUNVLGNBQWlDLEVBQ2pDLEdBQTBCO1FBRDFCLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUNqQyxRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQWZwQyx5QkFBb0IsR0FBRyxLQUFLLENBQUE7UUFLNUIsZ0JBQVcsR0FBUSxJQUFJLENBQUE7UUFDdkIsZ0JBQVcsR0FBUSxJQUFJLENBQUE7UUFDdkIsZ0JBQVcsR0FBRyxLQUFLLENBQUE7UUFDbkIsaUJBQVksR0FBVyxJQUFJLENBQUE7SUFTM0IsQ0FBQztJQUVELElBQUksZ0JBQWdCO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTO1lBQ25ELElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFDOUQ7WUFDQSxPQUFPLEtBQUssQ0FBQTtTQUNiO1FBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFO1lBQ3RDLE9BQU8sSUFBSSxDQUFBO1NBQ1o7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ25ELE9BQU8sS0FBSyxDQUFBO1NBQ2I7UUFFRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVyRixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUUvQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7SUFDekYsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtJQUM1QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDOUIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUE7U0FDM0I7UUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1NBQ25CO0lBQ0gsQ0FBQztJQUVELG1CQUFtQjtRQUNqQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3pELElBQUksQ0FBQyxnQkFBZ0IsbUNBQ2hCLElBQUksQ0FBQyxVQUFVLEtBQ2xCLE9BQU8sRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxHQUNwRCxDQUFBO1lBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFBO1lBQ2xELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUE7WUFFaEQsSUFDRSxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7Z0JBQ3JDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztnQkFDckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUNsQztnQkFDQSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUE7YUFDL0I7WUFFRCxJQUNFLENBQUMsQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNO2dCQUM1RCxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUztnQkFDbEUsUUFBUSxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0JBQzlELFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLEVBQzlDO2dCQUNBLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUE7Z0JBQzVDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTthQUNuQjtZQUVELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO2dCQUNoRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUMvQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ3BCLElBQUksQ0FBQyxXQUFXO3dCQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSzs0QkFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEtBQUssTUFBTTs0QkFDeEMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVE7NEJBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQTtpQkFDckM7YUFDRjtZQUVELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUE7U0FDakM7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFBO1NBQ2xCO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FDdEQsSUFBSSxDQUFDLFlBQVksRUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFDbEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQzFDLENBQUE7SUFDSCxDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzNCLENBQUM7Q0FDRixDQUFBOztZQS9GMkIsaUJBQWlCO1lBQzVCLHFCQUFxQjs7QUFOM0I7SUFBUixLQUFLLEVBQUU7O29FQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFOztxRUFBc0I7QUFDckI7SUFBUixLQUFLLEVBQUU7O21FQUFvQjtBQVpqQixnQ0FBZ0M7SUE1RTVDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSwyQkFBMkI7UUFDckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBHQW1COEY7aUJBQy9GOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0RSO0tBQ0YsQ0FBQztxQ0FnQjBCLGlCQUFpQjtRQUM1QixxQkFBcUI7R0FoQnpCLGdDQUFnQyxDQThHNUM7U0E5R1ksZ0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCB7aXNEZWZpbmVkfSBmcm9tICdAbmdzZi9jb21tb24nXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnQG5nc2Yvd2lkZ2V0LWxpYnJhcnknXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPGRpdlxuICAgICAgICAgICAgICBbY2xhc3MuYXJyYXktaXRlbV09XCJ3aWRnZXRMYXlvdXROb2RlPy5hcnJheUl0ZW0gJiYgd2lkZ2V0TGF5b3V0Tm9kZT8udHlwZSAhPT0gJyRyZWYnXCJcbiAgICAgICAgICAgICAgW29yZGVyYWJsZV09XCJpc09yZGVyYWJsZVwiXG4gICAgICAgICAgICAgIFtkYXRhSW5kZXhdPVwiZGF0YUluZGV4XCJcbiAgICAgICAgICAgICAgW2xheW91dEluZGV4XT1cImxheW91dEluZGV4XCJcbiAgICAgICAgICAgICAgW2xheW91dE5vZGVdPVwid2lkZ2V0TGF5b3V0Tm9kZVwiPlxuICAgICAgICAgIDxzdmcgKm5nSWY9XCJzaG93UmVtb3ZlQnV0dG9uXCJcbiAgICAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgICAgICAgICAgaGVpZ2h0PVwiMThcIiB3aWR0aD1cIjE4XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiXG4gICAgICAgICAgICAgICBjbGFzcz1cImNsb3NlLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAoY2xpY2spPVwicmVtb3ZlSXRlbSgpXCI+XG4gICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTkgNi40MUwxNy41OSA1IDEyIDEwLjU5IDYuNDEgNSA1IDYuNDEgMTAuNTkgMTIgNSAxNy41OSA2LjQxIDE5IDEyIDEzLjQxIDE3LjU5IDE5IDE5IDE3LjU5IDEzLjQxIDEyIDE5IDYuNDF6XCIvPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDxzZWxlY3Qtd2lkZ2V0LXdpZGdldFxuICAgICAgICAgICAgICAgICAgW2RhdGFJbmRleF09XCJkYXRhSW5kZXhcIlxuICAgICAgICAgICAgICAgICAgW2xheW91dEluZGV4XT1cImxheW91dEluZGV4XCJcbiAgICAgICAgICAgICAgICAgIFtsYXlvdXROb2RlXT1cIndpZGdldExheW91dE5vZGVcIj48L3NlbGVjdC13aWRnZXQtd2lkZ2V0PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCIgKm5nSWY9XCJ3aWRnZXRMYXlvdXROb2RlPy5hcnJheUl0ZW0gJiYgd2lkZ2V0TGF5b3V0Tm9kZT8udHlwZSAhPT0gJyRyZWYnXCI+PC9kaXY+YCxcbiAgc3R5bGVzOiBbYFxuICAgICAgLmFycmF5LWl0ZW0ge1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDNweCAxcHggLTJweCByZ2JhKDAsIDAsIDAsIC4yKSxcbiAgICAgICAgICAwIDJweCAycHggMCByZ2JhKDAsIDAsIDAsIC4xNCksXG4gICAgICAgICAgMCAxcHggNXB4IDAgcmdiYSgwLCAwLCAwLCAuMTIpO1xuICAgICAgICAgIHBhZGRpbmc6IDZweDtcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgdHJhbnNpdGlvbjogYWxsIDI4MG1zIGN1YmljLWJlemllciguNCwgMCwgLjIsIDEpO1xuICAgICAgfVxuXG4gICAgICAuY2xvc2UtYnV0dG9uIHtcbiAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgIHRvcDogNnB4O1xuICAgICAgICAgIHJpZ2h0OiA2cHg7XG4gICAgICAgICAgZmlsbDogcmdiYSgwLCAwLCAwLCAuNCk7XG4gICAgICAgICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgICAgICAgIHotaW5kZXg6IDUwMDtcbiAgICAgIH1cblxuICAgICAgLmNsb3NlLWJ1dHRvbjpob3ZlciB7XG4gICAgICAgICAgZmlsbDogcmdiYSgwLCAwLCAwLCAuOCk7XG4gICAgICB9XG5cbiAgICAgIC5hcnJheS1pdGVtOmhvdmVyID4gLmNsb3NlLWJ1dHRvbiB7XG4gICAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICAgIH1cblxuICAgICAgLnNwYWNlciB7XG4gICAgICAgICAgbWFyZ2luOiA2cHggMDtcbiAgICAgIH1cblxuICAgICAgW2RyYWdnYWJsZT10cnVlXTpob3ZlciB7XG4gICAgICAgICAgYm94LXNoYWRvdzogMCA1cHggNXB4IC0zcHggcmdiYSgwLCAwLCAwLCAuMiksXG4gICAgICAgICAgMCA4cHggMTBweCAxcHggcmdiYSgwLCAwLCAwLCAuMTQpLFxuICAgICAgICAgIDAgM3B4IDE0cHggMnB4IHJnYmEoMCwgMCwgMCwgLjEyKTtcbiAgICAgICAgICBjdXJzb3I6IG1vdmU7XG4gICAgICAgICAgei1pbmRleDogMTA7XG4gICAgICB9XG5cbiAgICAgIFtkcmFnZ2FibGU9dHJ1ZV0uZHJhZy10YXJnZXQtdG9wIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAwIC0ycHggMCAjMDAwO1xuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICB6LWluZGV4OiAyMDtcbiAgICAgIH1cblxuICAgICAgW2RyYWdnYWJsZT10cnVlXS5kcmFnLXRhcmdldC1ib3R0b20ge1xuICAgICAgICAgIGJveC1zaGFkb3c6IDAgMnB4IDAgIzAwMDtcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgei1pbmRleDogMjA7XG4gICAgICB9XG4gIGBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbERlc2lnbkZyYW1ld29ya0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgZnJhbWV3b3JrSW5pdGlhbGl6ZWQgPSBmYWxzZVxuICBpbnB1dFR5cGU6IHN0cmluZ1xuICBvcHRpb25zOiBhbnkgLy8gT3B0aW9ucyB1c2VkIGluIHRoaXMgZnJhbWV3b3JrXG4gIHdpZGdldExheW91dE5vZGU6IGFueSAvLyBsYXlvdXROb2RlIHBhc3NlZCB0byBjaGlsZCB3aWRnZXRcbiAgd2lkZ2V0T3B0aW9uczogYW55IC8vIE9wdGlvbnMgcGFzc2VkIHRvIGNoaWxkIHdpZGdldFxuICBmb3JtQ29udHJvbDogYW55ID0gbnVsbFxuICBwYXJlbnRBcnJheTogYW55ID0gbnVsbFxuICBpc09yZGVyYWJsZSA9IGZhbHNlXG4gIGR5bmFtaWNUaXRsZTogc3RyaW5nID0gbnVsbFxuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgZ2V0IHNob3dSZW1vdmVCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmxheW91dE5vZGUgfHwgIXRoaXMud2lkZ2V0T3B0aW9ucy5yZW1vdmFibGUgfHxcbiAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5yZWFkb25seSB8fCB0aGlzLmxheW91dE5vZGUudHlwZSA9PT0gJyRyZWYnXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgaWYgKHRoaXMubGF5b3V0Tm9kZS5yZWN1cnNpdmVSZWZlcmVuY2UpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIGlmICghdGhpcy5sYXlvdXROb2RlLmFycmF5SXRlbSB8fCAhdGhpcy5wYXJlbnRBcnJheSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIC8vIElmIGFycmF5IGxlbmd0aCA8PSBtaW5JdGVtcywgZG9uJ3QgYWxsb3cgcmVtb3ZpbmcgYW55IGl0ZW1zXG4gICAgcmV0dXJuIHRoaXMucGFyZW50QXJyYXkuaXRlbXMubGVuZ3RoIC0gMSA8PSB0aGlzLnBhcmVudEFycmF5Lm9wdGlvbnMubWluSXRlbXMgPyBmYWxzZSA6XG4gICAgICAvLyBGb3IgcmVtb3ZhYmxlIGxpc3QgaXRlbXMsIGFsbG93IHJlbW92aW5nIGFueSBpdGVtXG4gICAgICB0aGlzLmxheW91dE5vZGUuYXJyYXlJdGVtVHlwZSA9PT0gJ2xpc3QnID8gdHJ1ZSA6XG4gICAgICAgIC8vIEZvciByZW1vdmFibGUgdHVwbGUgaXRlbXMsIG9ubHkgYWxsb3cgcmVtb3ZpbmcgbGFzdCBpdGVtIGluIGxpc3RcbiAgICAgICAgdGhpcy5sYXlvdXRJbmRleFt0aGlzLmxheW91dEluZGV4Lmxlbmd0aCAtIDFdID09PSB0aGlzLnBhcmVudEFycmF5Lml0ZW1zLmxlbmd0aCAtIDJcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZUZyYW1ld29yaygpXG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBpZiAoIXRoaXMuZnJhbWV3b3JrSW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZUZyYW1ld29yaygpXG4gICAgfVxuICAgIGlmICh0aGlzLmR5bmFtaWNUaXRsZSkge1xuICAgICAgdGhpcy51cGRhdGVUaXRsZSgpXG4gICAgfVxuICB9XG5cbiAgaW5pdGlhbGl6ZUZyYW1ld29yaygpIHtcbiAgICBpZiAodGhpcy5sYXlvdXROb2RlKSB7XG4gICAgICB0aGlzLm9wdGlvbnMgPSBfLmNsb25lRGVlcCh0aGlzLmxheW91dE5vZGUub3B0aW9ucyB8fCB7fSlcbiAgICAgIHRoaXMud2lkZ2V0TGF5b3V0Tm9kZSA9IHtcbiAgICAgICAgLi4udGhpcy5sYXlvdXROb2RlLFxuICAgICAgICBvcHRpb25zOiBfLmNsb25lRGVlcCh0aGlzLmxheW91dE5vZGUub3B0aW9ucyB8fCB7fSlcbiAgICAgIH1cbiAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucyA9IHRoaXMud2lkZ2V0TGF5b3V0Tm9kZS5vcHRpb25zXG4gICAgICB0aGlzLmZvcm1Db250cm9sID0gdGhpcy5qc2YuZ2V0Rm9ybUNvbnRyb2wodGhpcylcblxuICAgICAgaWYgKFxuICAgICAgICBpc0RlZmluZWQodGhpcy53aWRnZXRPcHRpb25zLm1pbmltdW0pICYmXG4gICAgICAgIGlzRGVmaW5lZCh0aGlzLndpZGdldE9wdGlvbnMubWF4aW11bSkgJiZcbiAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLm11bHRpcGxlT2YgPj0gMVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMubGF5b3V0Tm9kZS50eXBlID0gJ3JhbmdlJ1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgICFbJyRyZWYnLCAnYWR2YW5jZWRmaWVsZHNldCcsICdhdXRoZmllbGRzZXQnLCAnYnV0dG9uJywgJ2NhcmQnLFxuICAgICAgICAgICdjaGVja2JveCcsICdleHBhbnNpb24tcGFuZWwnLCAnaGVscCcsICdtZXNzYWdlJywgJ21zZycsICdzZWN0aW9uJyxcbiAgICAgICAgICAnc3VibWl0JywgJ3RhYmFycmF5JywgJ3RhYnMnXS5pbmNsdWRlcyh0aGlzLmxheW91dE5vZGUudHlwZSkgJiZcbiAgICAgICAgL3t7Lis/fX0vLnRlc3QodGhpcy53aWRnZXRPcHRpb25zLnRpdGxlIHx8ICcnKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuZHluYW1pY1RpdGxlID0gdGhpcy53aWRnZXRPcHRpb25zLnRpdGxlXG4gICAgICAgIHRoaXMudXBkYXRlVGl0bGUoKVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5sYXlvdXROb2RlLmFycmF5SXRlbSAmJiB0aGlzLmxheW91dE5vZGUudHlwZSAhPT0gJyRyZWYnKSB7XG4gICAgICAgIHRoaXMucGFyZW50QXJyYXkgPSB0aGlzLmpzZi5nZXRQYXJlbnROb2RlKHRoaXMpXG4gICAgICAgIGlmICh0aGlzLnBhcmVudEFycmF5KSB7XG4gICAgICAgICAgdGhpcy5pc09yZGVyYWJsZSA9XG4gICAgICAgICAgICB0aGlzLnBhcmVudEFycmF5LnR5cGUuc2xpY2UoMCwgMykgIT09ICd0YWInICYmXG4gICAgICAgICAgICB0aGlzLmxheW91dE5vZGUuYXJyYXlJdGVtVHlwZSA9PT0gJ2xpc3QnICYmXG4gICAgICAgICAgICAhdGhpcy53aWRnZXRPcHRpb25zLnJlYWRvbmx5ICYmXG4gICAgICAgICAgICB0aGlzLnBhcmVudEFycmF5Lm9wdGlvbnMub3JkZXJhYmxlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5mcmFtZXdvcmtJbml0aWFsaXplZCA9IHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcHRpb25zID0ge31cbiAgICB9XG4gIH1cblxuICB1cGRhdGVUaXRsZSgpIHtcbiAgICB0aGlzLndpZGdldExheW91dE5vZGUub3B0aW9ucy50aXRsZSA9IHRoaXMuanNmLnBhcnNlVGV4dChcbiAgICAgIHRoaXMuZHluYW1pY1RpdGxlLFxuICAgICAgdGhpcy5qc2YuZ2V0Rm9ybUNvbnRyb2xWYWx1ZSh0aGlzKSxcbiAgICAgIHRoaXMuanNmLmdldEZvcm1Db250cm9sR3JvdXAodGhpcykudmFsdWUsXG4gICAgICB0aGlzLmRhdGFJbmRleFt0aGlzLmRhdGFJbmRleC5sZW5ndGggLSAxXVxuICAgIClcbiAgfVxuXG4gIHJlbW92ZUl0ZW0oKSB7XG4gICAgdGhpcy5qc2YucmVtb3ZlSXRlbSh0aGlzKVxuICB9XG59XG4iXX0=