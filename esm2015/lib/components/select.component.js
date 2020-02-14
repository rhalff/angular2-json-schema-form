import { Component, Input } from '@angular/core';
import { isArray } from '@ngsf/common';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
import { buildTitleMap } from '../functions/buildTitleMap';
export class SelectComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.selectList = [];
        this.isArray = isArray;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.selectList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, !!this.options.required, !!this.options.flatList);
        this.jsf.initializeControl(this);
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
}
SelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'select-widget',
                template: `
    <div
      [class]="options?.htmlClass || ''">
      <label *ngIf="options?.title"
        [attr.for]="'control' + layoutNode?._id"
        [class]="options?.labelHtmlClass || ''"
        [style.display]="options?.notitle ? 'none' : ''"
        [innerHTML]="options?.title"></label>
      <select *ngIf="boundControl"
        [formControl]="formControl"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.required]="options?.required"
        [class]="options?.fieldHtmlClass || ''"
        [id]="'control' + layoutNode?._id"
        [name]="controlName">
        <ng-template ngFor let-selectItem [ngForOf]="selectList">
          <option *ngIf="!isArray(selectItem?.items)"
            [value]="selectItem?.value">
            <span [innerHTML]="selectItem?.name"></span>
          </option>
          <optgroup *ngIf="isArray(selectItem?.items)"
            [label]="selectItem?.group">
            <option *ngFor="let subItem of selectItem.items"
              [value]="subItem?.value">
              <span [innerHTML]="subItem?.name"></span>
            </option>
          </optgroup>
        </ng-template>
      </select>
      <select *ngIf="!boundControl"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.required]="options?.required"
        [class]="options?.fieldHtmlClass || ''"
        [disabled]="controlDisabled"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        (change)="updateValue($event)">
        <ng-template ngFor let-selectItem [ngForOf]="selectList">
          <option *ngIf="!isArray(selectItem?.items)"
            [selected]="selectItem?.value === controlValue"
            [value]="selectItem?.value">
            <span [innerHTML]="selectItem?.name"></span>
          </option>
          <optgroup *ngIf="isArray(selectItem?.items)"
            [label]="selectItem?.group">
            <option *ngFor="let subItem of selectItem.items"
              [attr.selected]="subItem?.value === controlValue"
              [value]="subItem?.value">
              <span [innerHTML]="subItem?.name"></span>
            </option>
          </optgroup>
        </ng-template>
      </select>
    </div>`
            }] }
];
SelectComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
SelectComponent.propDecorators = {
    layoutNode: [{ type: Input }],
    layoutIndex: [{ type: Input }],
    dataIndex: [{ type: Input }]
};
if (false) {
    SelectComponent.prototype.formControl;
    SelectComponent.prototype.controlName;
    SelectComponent.prototype.controlValue;
    SelectComponent.prototype.controlDisabled;
    SelectComponent.prototype.boundControl;
    SelectComponent.prototype.options;
    SelectComponent.prototype.selectList;
    SelectComponent.prototype.isArray;
    SelectComponent.prototype.layoutNode;
    SelectComponent.prototype.layoutIndex;
    SelectComponent.prototype.dataIndex;
    SelectComponent.prototype.jsf;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL3dpZGdldC1saWJyYXJ5LyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQTtBQUV0RCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBQ3BDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFBO0FBQzFFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQTtBQTZEeEQsTUFBTSxPQUFPLGVBQWU7SUFhMUIsWUFDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQVZwQyxvQkFBZSxHQUFHLEtBQUssQ0FBQTtRQUN2QixpQkFBWSxHQUFHLEtBQUssQ0FBQTtRQUVwQixlQUFVLEdBQVUsRUFBRSxDQUFBO1FBQ3RCLFlBQU8sR0FBRyxPQUFPLENBQUE7SUFRakIsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQ3BFLENBQUE7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2xDLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBSztRQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hELENBQUM7OztZQXhGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQXVERDthQUNWOzs7WUE3RE8scUJBQXFCOzs7eUJBdUUxQixLQUFLOzBCQUNMLEtBQUs7d0JBQ0wsS0FBSzs7O0lBVk4sc0NBQTRCO0lBQzVCLHNDQUFtQjtJQUNuQix1Q0FBaUI7SUFDakIsMENBQXVCO0lBQ3ZCLHVDQUFvQjtJQUNwQixrQ0FBWTtJQUNaLHFDQUFzQjtJQUN0QixrQ0FBaUI7SUFDakIscUNBQXdCO0lBQ3hCLHNDQUE4QjtJQUM5QixvQ0FBNEI7SUFHMUIsOEJBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXG5pbXBvcnQge2lzQXJyYXl9IGZyb20gJ0BuZ3NmL2NvbW1vbidcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9qc29uLXNjaGVtYS1mb3JtLnNlcnZpY2UnXG5pbXBvcnQge2J1aWxkVGl0bGVNYXB9IGZyb20gJy4uL2Z1bmN0aW9ucy9idWlsZFRpdGxlTWFwJ1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZWxlY3Qtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBbY2xhc3NdPVwib3B0aW9ucz8uaHRtbENsYXNzIHx8ICcnXCI+XG4gICAgICA8bGFiZWwgKm5nSWY9XCJvcHRpb25zPy50aXRsZVwiXG4gICAgICAgIFthdHRyLmZvcl09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8ubGFiZWxIdG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICBbc3R5bGUuZGlzcGxheV09XCJvcHRpb25zPy5ub3RpdGxlID8gJ25vbmUnIDogJydcIlxuICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LnRpdGxlXCI+PC9sYWJlbD5cbiAgICAgIDxzZWxlY3QgKm5nSWY9XCJib3VuZENvbnRyb2xcIlxuICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdTdGF0dXMnXCJcbiAgICAgICAgW2F0dHIucmVhZG9ubHldPVwib3B0aW9ucz8ucmVhZG9ubHkgPyAncmVhZG9ubHknIDogbnVsbFwiXG4gICAgICAgIFthdHRyLnJlcXVpcmVkXT1cIm9wdGlvbnM/LnJlcXVpcmVkXCJcbiAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmZpZWxkSHRtbENsYXNzIHx8ICcnXCJcbiAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtc2VsZWN0SXRlbSBbbmdGb3JPZl09XCJzZWxlY3RMaXN0XCI+XG4gICAgICAgICAgPG9wdGlvbiAqbmdJZj1cIiFpc0FycmF5KHNlbGVjdEl0ZW0/Lml0ZW1zKVwiXG4gICAgICAgICAgICBbdmFsdWVdPVwic2VsZWN0SXRlbT8udmFsdWVcIj5cbiAgICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwic2VsZWN0SXRlbT8ubmFtZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICA8b3B0Z3JvdXAgKm5nSWY9XCJpc0FycmF5KHNlbGVjdEl0ZW0/Lml0ZW1zKVwiXG4gICAgICAgICAgICBbbGFiZWxdPVwic2VsZWN0SXRlbT8uZ3JvdXBcIj5cbiAgICAgICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IHN1Ykl0ZW0gb2Ygc2VsZWN0SXRlbS5pdGVtc1wiXG4gICAgICAgICAgICAgIFt2YWx1ZV09XCJzdWJJdGVtPy52YWx1ZVwiPlxuICAgICAgICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cInN1Ykl0ZW0/Lm5hbWVcIj48L3NwYW4+XG4gICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICA8L29wdGdyb3VwPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9zZWxlY3Q+XG4gICAgICA8c2VsZWN0ICpuZ0lmPVwiIWJvdW5kQ29udHJvbFwiXG4gICAgICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ1N0YXR1cydcIlxuICAgICAgICBbYXR0ci5yZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgW2F0dHIucmVxdWlyZWRdPVwib3B0aW9ucz8ucmVxdWlyZWRcIlxuICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8uZmllbGRIdG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbERpc2FibGVkXCJcbiAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgKGNoYW5nZSk9XCJ1cGRhdGVWYWx1ZSgkZXZlbnQpXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtc2VsZWN0SXRlbSBbbmdGb3JPZl09XCJzZWxlY3RMaXN0XCI+XG4gICAgICAgICAgPG9wdGlvbiAqbmdJZj1cIiFpc0FycmF5KHNlbGVjdEl0ZW0/Lml0ZW1zKVwiXG4gICAgICAgICAgICBbc2VsZWN0ZWRdPVwic2VsZWN0SXRlbT8udmFsdWUgPT09IGNvbnRyb2xWYWx1ZVwiXG4gICAgICAgICAgICBbdmFsdWVdPVwic2VsZWN0SXRlbT8udmFsdWVcIj5cbiAgICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwic2VsZWN0SXRlbT8ubmFtZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICA8b3B0Z3JvdXAgKm5nSWY9XCJpc0FycmF5KHNlbGVjdEl0ZW0/Lml0ZW1zKVwiXG4gICAgICAgICAgICBbbGFiZWxdPVwic2VsZWN0SXRlbT8uZ3JvdXBcIj5cbiAgICAgICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IHN1Ykl0ZW0gb2Ygc2VsZWN0SXRlbS5pdGVtc1wiXG4gICAgICAgICAgICAgIFthdHRyLnNlbGVjdGVkXT1cInN1Ykl0ZW0/LnZhbHVlID09PSBjb250cm9sVmFsdWVcIlxuICAgICAgICAgICAgICBbdmFsdWVdPVwic3ViSXRlbT8udmFsdWVcIj5cbiAgICAgICAgICAgICAgPHNwYW4gW2lubmVySFRNTF09XCJzdWJJdGVtPy5uYW1lXCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgPC9vcHRncm91cD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvc2VsZWN0PlxuICAgIDwvZGl2PmAsXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2xcbiAgY29udHJvbE5hbWU6IHN0cmluZ1xuICBjb250cm9sVmFsdWU6IGFueVxuICBjb250cm9sRGlzYWJsZWQgPSBmYWxzZVxuICBib3VuZENvbnRyb2wgPSBmYWxzZVxuICBvcHRpb25zOiBhbnlcbiAgc2VsZWN0TGlzdDogYW55W10gPSBbXVxuICBpc0FycmF5ID0gaXNBcnJheVxuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge31cbiAgICB0aGlzLnNlbGVjdExpc3QgPSBidWlsZFRpdGxlTWFwKFxuICAgICAgdGhpcy5vcHRpb25zLnRpdGxlTWFwIHx8IHRoaXMub3B0aW9ucy5lbnVtTmFtZXMsXG4gICAgICB0aGlzLm9wdGlvbnMuZW51bSwgISF0aGlzLm9wdGlvbnMucmVxdWlyZWQsICEhdGhpcy5vcHRpb25zLmZsYXRMaXN0XG4gICAgKVxuICAgIHRoaXMuanNmLmluaXRpYWxpemVDb250cm9sKHRoaXMpXG4gIH1cblxuICB1cGRhdGVWYWx1ZShldmVudCkge1xuICAgIHRoaXMuanNmLnVwZGF0ZVZhbHVlKHRoaXMsIGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgfVxufVxuIl19