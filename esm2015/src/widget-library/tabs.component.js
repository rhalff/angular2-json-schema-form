import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
export class TabsComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.selectedItem = 0;
        this.showAddTab = true;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.itemCount = this.layoutNode.items.length - 1;
        this.updateControl();
    }
    select(index) {
        if (this.layoutNode.items[index].type === '$ref') {
            this.itemCount = this.layoutNode.items.length;
            this.jsf.addItem({
                layoutNode: this.layoutNode.items[index],
                layoutIndex: this.layoutIndex.concat(index),
                dataIndex: this.dataIndex.concat(index)
            });
            this.updateControl();
        }
        this.selectedItem = index;
    }
    updateControl() {
        const lastItem = this.layoutNode.items[this.layoutNode.items.length - 1];
        if (lastItem.type === '$ref' &&
            this.itemCount >= (lastItem.options.maxItems || 1000)) {
            this.showAddTab = false;
        }
    }
    setTabTitle(item, index) {
        return this.jsf.setArrayItemTitle(this, item, index);
    }
}
TabsComponent.decorators = [
    { type: Component, args: [{
                selector: 'tabs-widget',
                template: `
    <ul
      [class]="options?.labelHtmlClass || ''">
      <li *ngFor="let item of layoutNode?.items; let i = index"
        [class]="(options?.itemLabelHtmlClass || '') + (selectedItem === i ?
          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :
          (' ' + options?.style?.unselected))"
        role="presentation"
        data-tabs>
        <a *ngIf="showAddTab || item.type !== '$ref'"
           [class]="'nav-link' + (selectedItem === i ? (' ' + options?.activeClass + ' ' + options?.style?.selected) :
            (' ' + options?.style?.unselected))"
          [innerHTML]="setTabTitle(item, i)"
          (click)="select(i)"></a>
      </li>
    </ul>

    <div *ngFor="let layoutItem of layoutNode?.items; let i = index"
      [class]="options?.htmlClass || ''">

      <select-framework-widget *ngIf="selectedItem === i"
        [class]="(options?.fieldHtmlClass || '') +
          ' ' + (options?.activeClass || '') +
          ' ' + (options?.style?.selected || '')"
        [dataIndex]="layoutNode?.dataType === 'array' ? (dataIndex || []).concat(i) : dataIndex"
        [layoutIndex]="(layoutIndex || []).concat(i)"
        [layoutNode]="layoutItem"></select-framework-widget>

    </div>`,
                styles: [` a { cursor: pointer; } `],
            },] },
];
/** @nocollapse */
TabsComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
TabsComponent.propDecorators = {
    layoutNode: [{ type: Input }],
    layoutIndex: [{ type: Input }],
    dataIndex: [{ type: Input }]
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsic3JjL3dpZGdldC1saWJyYXJ5L3RhYnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBbUNwRSxNQUFNO0lBU0osWUFDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQVBwQyxpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQixlQUFVLEdBQUcsSUFBSSxDQUFDO0lBT2QsQ0FBQztJQUVMLFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSztRQUNWLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQzlDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO2dCQUNmLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQ3hDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQzNDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7YUFDeEMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBRUQsYUFBYTtRQUNYLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN6RSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLE1BQU07WUFDMUIsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksQ0FDdEQsQ0FBQyxDQUFDLENBQUM7WUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUMxQixDQUFDO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFTLEVBQUUsS0FBYTtRQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELENBQUM7OztZQTVFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQTRCRDtnQkFDVCxNQUFNLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQzthQUNyQzs7OztZQWxDUSxxQkFBcUI7Ozt5QkF3QzNCLEtBQUs7MEJBQ0wsS0FBSzt3QkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEpzb25TY2hlbWFGb3JtU2VydmljZSB9IGZyb20gJy4uL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RhYnMtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8dWxcbiAgICAgIFtjbGFzc109XCJvcHRpb25zPy5sYWJlbEh0bWxDbGFzcyB8fCAnJ1wiPlxuICAgICAgPGxpICpuZ0Zvcj1cImxldCBpdGVtIG9mIGxheW91dE5vZGU/Lml0ZW1zOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgW2NsYXNzXT1cIihvcHRpb25zPy5pdGVtTGFiZWxIdG1sQ2xhc3MgfHwgJycpICsgKHNlbGVjdGVkSXRlbSA9PT0gaSA/XG4gICAgICAgICAgKCcgJyArIChvcHRpb25zPy5hY3RpdmVDbGFzcyB8fCAnJykgKyAnICcgKyAob3B0aW9ucz8uc3R5bGU/LnNlbGVjdGVkIHx8ICcnKSkgOlxuICAgICAgICAgICgnICcgKyBvcHRpb25zPy5zdHlsZT8udW5zZWxlY3RlZCkpXCJcbiAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICAgIGRhdGEtdGFicz5cbiAgICAgICAgPGEgKm5nSWY9XCJzaG93QWRkVGFiIHx8IGl0ZW0udHlwZSAhPT0gJyRyZWYnXCJcbiAgICAgICAgICAgW2NsYXNzXT1cIiduYXYtbGluaycgKyAoc2VsZWN0ZWRJdGVtID09PSBpID8gKCcgJyArIG9wdGlvbnM/LmFjdGl2ZUNsYXNzICsgJyAnICsgb3B0aW9ucz8uc3R5bGU/LnNlbGVjdGVkKSA6XG4gICAgICAgICAgICAoJyAnICsgb3B0aW9ucz8uc3R5bGU/LnVuc2VsZWN0ZWQpKVwiXG4gICAgICAgICAgW2lubmVySFRNTF09XCJzZXRUYWJUaXRsZShpdGVtLCBpKVwiXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdChpKVwiPjwvYT5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cblxuICAgIDxkaXYgKm5nRm9yPVwibGV0IGxheW91dEl0ZW0gb2YgbGF5b3V0Tm9kZT8uaXRlbXM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/Lmh0bWxDbGFzcyB8fCAnJ1wiPlxuXG4gICAgICA8c2VsZWN0LWZyYW1ld29yay13aWRnZXQgKm5nSWY9XCJzZWxlY3RlZEl0ZW0gPT09IGlcIlxuICAgICAgICBbY2xhc3NdPVwiKG9wdGlvbnM/LmZpZWxkSHRtbENsYXNzIHx8ICcnKSArXG4gICAgICAgICAgJyAnICsgKG9wdGlvbnM/LmFjdGl2ZUNsYXNzIHx8ICcnKSArXG4gICAgICAgICAgJyAnICsgKG9wdGlvbnM/LnN0eWxlPy5zZWxlY3RlZCB8fCAnJylcIlxuICAgICAgICBbZGF0YUluZGV4XT1cImxheW91dE5vZGU/LmRhdGFUeXBlID09PSAnYXJyYXknID8gKGRhdGFJbmRleCB8fCBbXSkuY29uY2F0KGkpIDogZGF0YUluZGV4XCJcbiAgICAgICAgW2xheW91dEluZGV4XT1cIihsYXlvdXRJbmRleCB8fCBbXSkuY29uY2F0KGkpXCJcbiAgICAgICAgW2xheW91dE5vZGVdPVwibGF5b3V0SXRlbVwiPjwvc2VsZWN0LWZyYW1ld29yay13aWRnZXQ+XG5cbiAgICA8L2Rpdj5gLFxuICBzdHlsZXM6IFtgIGEgeyBjdXJzb3I6IHBvaW50ZXI7IH0gYF0sXG59KVxuZXhwb3J0IGNsYXNzIFRhYnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBvcHRpb25zOiBhbnk7XG4gIGl0ZW1Db3VudDogbnVtYmVyO1xuICBzZWxlY3RlZEl0ZW0gPSAwO1xuICBzaG93QWRkVGFiID0gdHJ1ZTtcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55O1xuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW107XG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9O1xuICAgIHRoaXMuaXRlbUNvdW50ID0gdGhpcy5sYXlvdXROb2RlLml0ZW1zLmxlbmd0aCAtIDE7XG4gICAgdGhpcy51cGRhdGVDb250cm9sKCk7XG4gIH1cblxuICBzZWxlY3QoaW5kZXgpIHtcbiAgICBpZiAodGhpcy5sYXlvdXROb2RlLml0ZW1zW2luZGV4XS50eXBlID09PSAnJHJlZicpIHtcbiAgICAgIHRoaXMuaXRlbUNvdW50ID0gdGhpcy5sYXlvdXROb2RlLml0ZW1zLmxlbmd0aDtcbiAgICAgIHRoaXMuanNmLmFkZEl0ZW0oe1xuICAgICAgICBsYXlvdXROb2RlOiB0aGlzLmxheW91dE5vZGUuaXRlbXNbaW5kZXhdLFxuICAgICAgICBsYXlvdXRJbmRleDogdGhpcy5sYXlvdXRJbmRleC5jb25jYXQoaW5kZXgpLFxuICAgICAgICBkYXRhSW5kZXg6IHRoaXMuZGF0YUluZGV4LmNvbmNhdChpbmRleClcbiAgICAgIH0pO1xuICAgICAgdGhpcy51cGRhdGVDb250cm9sKCk7XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gaW5kZXg7XG4gIH1cblxuICB1cGRhdGVDb250cm9sKCkge1xuICAgIGNvbnN0IGxhc3RJdGVtID0gdGhpcy5sYXlvdXROb2RlLml0ZW1zW3RoaXMubGF5b3V0Tm9kZS5pdGVtcy5sZW5ndGggLSAxXTtcbiAgICBpZiAobGFzdEl0ZW0udHlwZSA9PT0gJyRyZWYnICYmXG4gICAgICB0aGlzLml0ZW1Db3VudCA+PSAobGFzdEl0ZW0ub3B0aW9ucy5tYXhJdGVtcyB8fCAxMDAwKVxuICAgICkge1xuICAgICAgdGhpcy5zaG93QWRkVGFiID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgc2V0VGFiVGl0bGUoaXRlbTogYW55LCBpbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5qc2Yuc2V0QXJyYXlJdGVtVGl0bGUodGhpcywgaXRlbSwgaW5kZXgpO1xuICB9XG59XG4iXX0=