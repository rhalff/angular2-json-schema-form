var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { buildTitleMap, JsonSchemaFormService, TitleMapItem } from '@ngsf/widget-library';
let MaterialCheckboxesComponent = class MaterialCheckboxesComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.horizontalList = false;
        this.checkboxList = [];
    }
    get allChecked() {
        return this.checkboxList.filter(t => t.checked).length === this.checkboxList.length;
    }
    get someChecked() {
        const checkedItems = this.checkboxList.filter(t => t.checked).length;
        return checkedItems > 0 && checkedItems < this.checkboxList.length;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.horizontalList = this.layoutNode.type === 'checkboxes-inline' ||
            this.layoutNode.type === 'checkboxbuttons';
        this.jsf.initializeControl(this);
        this.checkboxList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
        if (this.boundControl) {
            const formArray = this.jsf.getFormControl(this);
            for (const checkboxItem of this.checkboxList) {
                checkboxItem.checked = formArray.value.includes(checkboxItem.value);
            }
        }
    }
    updateValue() {
        this.options.showErrors = true;
        if (this.boundControl) {
            this.jsf.updateArrayCheckboxList(this, this.checkboxList);
        }
    }
    updateAllValues(event) {
        this.options.showErrors = true;
        this.checkboxList.forEach(t => t.checked = event.checked);
        this.updateValue();
    }
};
MaterialCheckboxesComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], MaterialCheckboxesComponent.prototype, "layoutNode", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], MaterialCheckboxesComponent.prototype, "layoutIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], MaterialCheckboxesComponent.prototype, "dataIndex", void 0);
MaterialCheckboxesComponent = __decorate([
    Component({
        selector: 'material-checkboxes-widget',
        template: `
      <div>
          <mat-checkbox type="checkbox"
                        [checked]="allChecked"
                        [color]="options?.color || 'primary'"
                        [disabled]="controlDisabled || options?.readonly"
                        [indeterminate]="someChecked"
                        [name]="options?.name"
                        (blur)="options.showErrors = true"
                        (change)="updateAllValues($event)">
              <span class="checkbox-name" [innerHTML]="options?.name"></span>
          </mat-checkbox>
          <label *ngIf="options?.title"
                 class="title"
                 [class]="options?.labelHtmlClass || ''"
                 [style.display]="options?.notitle ? 'none' : ''"
                 [innerHTML]="options?.title"></label>
          <ul class="checkbox-list" [class.horizontal-list]="horizontalList">
              <li *ngFor="let checkboxItem of checkboxList"
                  [class]="options?.htmlClass || ''">
                  <mat-checkbox type="checkbox"
                                [(ngModel)]="checkboxItem.checked"
                                [color]="options?.color || 'primary'"
                                [disabled]="controlDisabled || options?.readonly"
                                [name]="checkboxItem?.name"
                                (blur)="options.showErrors = true"
                                (change)="updateValue()">
                      <span class="checkbox-name" [innerHTML]="checkboxItem?.name"></span>
                  </mat-checkbox>
              </li>
          </ul>
          <mat-error *ngIf="options?.showErrors && options?.errorMessage"
                     [innerHTML]="options?.errorMessage"></mat-error>
      </div>`,
        styles: [`
      .title {
          font-weight: bold;
      }

      .checkbox-list {
          list-style-type: none;
      }

      .horizontal-list > li {
          display: inline-block;
          margin-right: 10px;
          zoom: 1;
      }

      .checkbox-name {
          white-space: nowrap;
      }

      mat-error {
          font-size: 75%;
      }
  `]
    }),
    __metadata("design:paramtypes", [JsonSchemaFormService])
], MaterialCheckboxesComponent);
export { MaterialCheckboxesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtY2hlY2tib3hlcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdzZi9tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbWF0ZXJpYWwtY2hlY2tib3hlcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUE7QUFFdEQsT0FBTyxFQUFDLGFBQWEsRUFBRSxxQkFBcUIsRUFBRSxZQUFZLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQTtBQWlFdkYsSUFBYSwyQkFBMkIsR0FBeEMsTUFBYSwyQkFBMkI7SUFjdEMsWUFDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQVhwQyxvQkFBZSxHQUFHLEtBQUssQ0FBQTtRQUN2QixpQkFBWSxHQUFHLEtBQUssQ0FBQTtRQUVwQixtQkFBYyxHQUFHLEtBQUssQ0FBQTtRQUV0QixpQkFBWSxHQUFtQixFQUFFLENBQUE7SUFRakMsQ0FBQztJQUVELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFBO0lBQ3JGLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUE7UUFDcEUsT0FBTyxZQUFZLEdBQUcsQ0FBQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQTtJQUNwRSxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFBO1FBQzVDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssbUJBQW1CO1lBQ2hFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLGlCQUFpQixDQUFBO1FBQzVDLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxhQUFhLENBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FDekUsQ0FBQTtRQUNELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUMvQyxLQUFLLE1BQU0sWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFBO2FBQ3BFO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQTtRQUM5QixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1NBQzFEO0lBQ0gsQ0FBQztJQUVELGVBQWUsQ0FBQyxLQUFVO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQTtRQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3pELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUNwQixDQUFDO0NBQ0YsQ0FBQTs7WUF6Q2dCLHFCQUFxQjs7QUFMM0I7SUFBUixLQUFLLEVBQUU7OytEQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFOztnRUFBc0I7QUFDckI7SUFBUixLQUFLLEVBQUU7OzhEQUFvQjtBQVpqQiwyQkFBMkI7SUE1RHZDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSw0QkFBNEI7UUFDdEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7YUFpQ0M7aUJBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQlI7S0FDRixDQUFDO3FDQWdCZSxxQkFBcUI7R0FmekIsMkJBQTJCLENBd0R2QztTQXhEWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3JtcydcbmltcG9ydCB7YnVpbGRUaXRsZU1hcCwgSnNvblNjaGVtYUZvcm1TZXJ2aWNlLCBUaXRsZU1hcEl0ZW19IGZyb20gJ0BuZ3NmL3dpZGdldC1saWJyYXJ5J1xuXG4vLyBUT0RPOiBDaGFuZ2UgdGhpcyB0byB1c2UgYSBTZWxlY3Rpb24gTGlzdCBpbnN0ZWFkP1xuLy8gaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2NvbXBvbmVudHMvbGlzdC9vdmVydmlld1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXRlcmlhbC1jaGVja2JveGVzLXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8ZGl2PlxuICAgICAgICAgIDxtYXQtY2hlY2tib3ggdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjaGVja2VkXT1cImFsbENoZWNrZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NvbG9yXT1cIm9wdGlvbnM/LmNvbG9yIHx8ICdwcmltYXJ5J1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbERpc2FibGVkIHx8IG9wdGlvbnM/LnJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtpbmRldGVybWluYXRlXT1cInNvbWVDaGVja2VkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuYW1lXT1cIm9wdGlvbnM/Lm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwib3B0aW9ucy5zaG93RXJyb3JzID0gdHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2hhbmdlKT1cInVwZGF0ZUFsbFZhbHVlcygkZXZlbnQpXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hlY2tib3gtbmFtZVwiIFtpbm5lckhUTUxdPVwib3B0aW9ucz8ubmFtZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8L21hdC1jaGVja2JveD5cbiAgICAgICAgICA8bGFiZWwgKm5nSWY9XCJvcHRpb25zPy50aXRsZVwiXG4gICAgICAgICAgICAgICAgIGNsYXNzPVwidGl0bGVcIlxuICAgICAgICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8ubGFiZWxIdG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICAgICBbc3R5bGUuZGlzcGxheV09XCJvcHRpb25zPy5ub3RpdGxlID8gJ25vbmUnIDogJydcIlxuICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LnRpdGxlXCI+PC9sYWJlbD5cbiAgICAgICAgICA8dWwgY2xhc3M9XCJjaGVja2JveC1saXN0XCIgW2NsYXNzLmhvcml6b250YWwtbGlzdF09XCJob3Jpem9udGFsTGlzdFwiPlxuICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGNoZWNrYm94SXRlbSBvZiBjaGVja2JveExpc3RcIlxuICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/Lmh0bWxDbGFzcyB8fCAnJ1wiPlxuICAgICAgICAgICAgICAgICAgPG1hdC1jaGVja2JveCB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cImNoZWNrYm94SXRlbS5jaGVja2VkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NvbG9yXT1cIm9wdGlvbnM/LmNvbG9yIHx8ICdwcmltYXJ5J1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJjb250cm9sRGlzYWJsZWQgfHwgb3B0aW9ucz8ucmVhZG9ubHlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmFtZV09XCJjaGVja2JveEl0ZW0/Lm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYmx1cik9XCJvcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJ1cGRhdGVWYWx1ZSgpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGVja2JveC1uYW1lXCIgW2lubmVySFRNTF09XCJjaGVja2JveEl0ZW0/Lm5hbWVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L21hdC1jaGVja2JveD5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJvcHRpb25zPy5zaG93RXJyb3JzICYmIG9wdGlvbnM/LmVycm9yTWVzc2FnZVwiXG4gICAgICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmVycm9yTWVzc2FnZVwiPjwvbWF0LWVycm9yPlxuICAgICAgPC9kaXY+YCxcbiAgc3R5bGVzOiBbYFxuICAgICAgLnRpdGxlIHtcbiAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgIH1cblxuICAgICAgLmNoZWNrYm94LWxpc3Qge1xuICAgICAgICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbiAgICAgIH1cblxuICAgICAgLmhvcml6b250YWwtbGlzdCA+IGxpIHtcbiAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICAgICAgICAgIHpvb206IDE7XG4gICAgICB9XG5cbiAgICAgIC5jaGVja2JveC1uYW1lIHtcbiAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgfVxuXG4gICAgICBtYXQtZXJyb3Ige1xuICAgICAgICAgIGZvbnQtc2l6ZTogNzUlO1xuICAgICAgfVxuICBgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxDaGVja2JveGVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbFxuICBjb250cm9sTmFtZTogc3RyaW5nXG4gIGNvbnRyb2xWYWx1ZTogYW55XG4gIGNvbnRyb2xEaXNhYmxlZCA9IGZhbHNlXG4gIGJvdW5kQ29udHJvbCA9IGZhbHNlXG4gIG9wdGlvbnM6IGFueVxuICBob3Jpem9udGFsTGlzdCA9IGZhbHNlXG4gIGZvcm1BcnJheTogQWJzdHJhY3RDb250cm9sXG4gIGNoZWNrYm94TGlzdDogVGl0bGVNYXBJdGVtW10gPSBbXVxuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgZ2V0IGFsbENoZWNrZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tib3hMaXN0LmZpbHRlcih0ID0+IHQuY2hlY2tlZCkubGVuZ3RoID09PSB0aGlzLmNoZWNrYm94TGlzdC5sZW5ndGhcbiAgfVxuXG4gIGdldCBzb21lQ2hlY2tlZCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBjaGVja2VkSXRlbXMgPSB0aGlzLmNoZWNrYm94TGlzdC5maWx0ZXIodCA9PiB0LmNoZWNrZWQpLmxlbmd0aFxuICAgIHJldHVybiBjaGVja2VkSXRlbXMgPiAwICYmIGNoZWNrZWRJdGVtcyA8IHRoaXMuY2hlY2tib3hMaXN0Lmxlbmd0aFxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge31cbiAgICB0aGlzLmhvcml6b250YWxMaXN0ID0gdGhpcy5sYXlvdXROb2RlLnR5cGUgPT09ICdjaGVja2JveGVzLWlubGluZScgfHxcbiAgICAgIHRoaXMubGF5b3V0Tm9kZS50eXBlID09PSAnY2hlY2tib3hidXR0b25zJ1xuICAgIHRoaXMuanNmLmluaXRpYWxpemVDb250cm9sKHRoaXMpXG4gICAgdGhpcy5jaGVja2JveExpc3QgPSBidWlsZFRpdGxlTWFwKFxuICAgICAgdGhpcy5vcHRpb25zLnRpdGxlTWFwIHx8IHRoaXMub3B0aW9ucy5lbnVtTmFtZXMsIHRoaXMub3B0aW9ucy5lbnVtLCB0cnVlXG4gICAgKVxuICAgIGlmICh0aGlzLmJvdW5kQ29udHJvbCkge1xuICAgICAgY29uc3QgZm9ybUFycmF5ID0gdGhpcy5qc2YuZ2V0Rm9ybUNvbnRyb2wodGhpcylcbiAgICAgIGZvciAoY29uc3QgY2hlY2tib3hJdGVtIG9mIHRoaXMuY2hlY2tib3hMaXN0KSB7XG4gICAgICAgIGNoZWNrYm94SXRlbS5jaGVja2VkID0gZm9ybUFycmF5LnZhbHVlLmluY2x1ZGVzKGNoZWNrYm94SXRlbS52YWx1ZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1cGRhdGVWYWx1ZSgpIHtcbiAgICB0aGlzLm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWVcbiAgICBpZiAodGhpcy5ib3VuZENvbnRyb2wpIHtcbiAgICAgIHRoaXMuanNmLnVwZGF0ZUFycmF5Q2hlY2tib3hMaXN0KHRoaXMsIHRoaXMuY2hlY2tib3hMaXN0KVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUFsbFZhbHVlcyhldmVudDogYW55KSB7XG4gICAgdGhpcy5vcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlXG4gICAgdGhpcy5jaGVja2JveExpc3QuZm9yRWFjaCh0ID0+IHQuY2hlY2tlZCA9IGV2ZW50LmNoZWNrZWQpXG4gICAgdGhpcy51cGRhdGVWYWx1ZSgpXG4gIH1cbn1cbiJdfQ==