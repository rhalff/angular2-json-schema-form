import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
import { buildTitleMap } from '../../shared';
// TODO: Change this to use a Selection List instead?
// https://material.angular.io/components/list/overview
export class MaterialCheckboxesComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.horizontalList = false;
        this.checkboxList = [];
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
    get allChecked() {
        return this.checkboxList.filter(t => t.checked).length === this.checkboxList.length;
    }
    get someChecked() {
        const checkedItems = this.checkboxList.filter(t => t.checked).length;
        return checkedItems > 0 && checkedItems < this.checkboxList.length;
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
}
MaterialCheckboxesComponent.decorators = [
    { type: Component, args: [{
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
    .title { font-weight: bold; }
    .checkbox-list { list-style-type: none; }
    .horizontal-list > li { display: inline-block; margin-right: 10px; zoom: 1; }
    .checkbox-name { white-space: nowrap; }
    mat-error { font-size: 75%; }
  `],
            },] },
];
/** @nocollapse */
MaterialCheckboxesComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
MaterialCheckboxesComponent.propDecorators = {
    layoutNode: [{ type: Input }],
    layoutIndex: [{ type: Input }],
    dataIndex: [{ type: Input }]
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtY2hlY2tib3hlcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsic3JjL2ZyYW1ld29yay1saWJyYXJ5L21hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsvbWF0ZXJpYWwtY2hlY2tib3hlcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFHekQsT0FBTyxFQUFFLHFCQUFxQixFQUFnQixNQUFNLGdDQUFnQyxDQUFDO0FBQ3JGLE9BQU8sRUFBa0IsYUFBYSxFQUF1QixNQUFNLGNBQWMsQ0FBQztBQUVsRixxREFBcUQ7QUFDckQsdURBQXVEO0FBOEN2RCxNQUFNO0lBY0osWUFDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQVhwQyxvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUVyQixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUV2QixpQkFBWSxHQUFtQixFQUFFLENBQUM7SUFPOUIsQ0FBQztJQUVMLFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLG1CQUFtQjtZQUNoRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxpQkFBaUIsQ0FBQztRQUM3QyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQ3pFLENBQUM7UUFDRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoRCxHQUFHLENBQUMsQ0FBQyxNQUFNLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDN0MsWUFBWSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEUsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztJQUN0RixDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ2IsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3JFLE1BQU0sQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztJQUNyRSxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUMvQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUQsQ0FBQztJQUNILENBQUM7SUFFRCxlQUFlLENBQUMsS0FBVTtRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7O1lBbEdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNEJBQTRCO2dCQUN0QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQWlDRDtnQkFDVCxNQUFNLEVBQUUsQ0FBQzs7Ozs7O0dBTVIsQ0FBQzthQUNIOzs7O1lBakRRLHFCQUFxQjs7O3lCQTREM0IsS0FBSzswQkFDTCxLQUFLO3dCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1BcnJheSwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBKc29uU2NoZW1hRm9ybVNlcnZpY2UsIFRpdGxlTWFwSXRlbSB9IGZyb20gJy4uLy4uL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSc7XG5pbXBvcnQgeyBidWlsZEZvcm1Hcm91cCwgYnVpbGRUaXRsZU1hcCwgaGFzT3duLCBKc29uUG9pbnRlciB9IGZyb20gJy4uLy4uL3NoYXJlZCc7XG5cbi8vIFRPRE86IENoYW5nZSB0aGlzIHRvIHVzZSBhIFNlbGVjdGlvbiBMaXN0IGluc3RlYWQ/XG4vLyBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vY29tcG9uZW50cy9saXN0L292ZXJ2aWV3XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdGVyaWFsLWNoZWNrYm94ZXMtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2PlxuICAgICAgPG1hdC1jaGVja2JveCB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICBbY2hlY2tlZF09XCJhbGxDaGVja2VkXCJcbiAgICAgICAgW2NvbG9yXT1cIm9wdGlvbnM/LmNvbG9yIHx8ICdwcmltYXJ5J1wiXG4gICAgICAgIFtkaXNhYmxlZF09XCJjb250cm9sRGlzYWJsZWQgfHwgb3B0aW9ucz8ucmVhZG9ubHlcIlxuICAgICAgICBbaW5kZXRlcm1pbmF0ZV09XCJzb21lQ2hlY2tlZFwiXG4gICAgICAgIFtuYW1lXT1cIm9wdGlvbnM/Lm5hbWVcIlxuICAgICAgICAoYmx1cik9XCJvcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlXCJcbiAgICAgICAgKGNoYW5nZSk9XCJ1cGRhdGVBbGxWYWx1ZXMoJGV2ZW50KVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImNoZWNrYm94LW5hbWVcIiBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/Lm5hbWVcIj48L3NwYW4+XG4gICAgICA8L21hdC1jaGVja2JveD5cbiAgICAgIDxsYWJlbCAqbmdJZj1cIm9wdGlvbnM/LnRpdGxlXCJcbiAgICAgICAgY2xhc3M9XCJ0aXRsZVwiXG4gICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5sYWJlbEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cIm9wdGlvbnM/Lm5vdGl0bGUgPyAnbm9uZScgOiAnJ1wiXG4gICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8udGl0bGVcIj48L2xhYmVsPlxuICAgICAgPHVsIGNsYXNzPVwiY2hlY2tib3gtbGlzdFwiIFtjbGFzcy5ob3Jpem9udGFsLWxpc3RdPVwiaG9yaXpvbnRhbExpc3RcIj5cbiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBjaGVja2JveEl0ZW0gb2YgY2hlY2tib3hMaXN0XCJcbiAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8uaHRtbENsYXNzIHx8ICcnXCI+XG4gICAgICAgICAgPG1hdC1jaGVja2JveCB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJjaGVja2JveEl0ZW0uY2hlY2tlZFwiXG4gICAgICAgICAgICBbY29sb3JdPVwib3B0aW9ucz8uY29sb3IgfHwgJ3ByaW1hcnknXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJjb250cm9sRGlzYWJsZWQgfHwgb3B0aW9ucz8ucmVhZG9ubHlcIlxuICAgICAgICAgICAgW25hbWVdPVwiY2hlY2tib3hJdGVtPy5uYW1lXCJcbiAgICAgICAgICAgIChibHVyKT1cIm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWVcIlxuICAgICAgICAgICAgKGNoYW5nZSk9XCJ1cGRhdGVWYWx1ZSgpXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZWNrYm94LW5hbWVcIiBbaW5uZXJIVE1MXT1cImNoZWNrYm94SXRlbT8ubmFtZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8L21hdC1jaGVja2JveD5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgICA8bWF0LWVycm9yICpuZ0lmPVwib3B0aW9ucz8uc2hvd0Vycm9ycyAmJiBvcHRpb25zPy5lcnJvck1lc3NhZ2VcIlxuICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmVycm9yTWVzc2FnZVwiPjwvbWF0LWVycm9yPlxuICAgIDwvZGl2PmAsXG4gIHN0eWxlczogW2BcbiAgICAudGl0bGUgeyBmb250LXdlaWdodDogYm9sZDsgfVxuICAgIC5jaGVja2JveC1saXN0IHsgbGlzdC1zdHlsZS10eXBlOiBub25lOyB9XG4gICAgLmhvcml6b250YWwtbGlzdCA+IGxpIHsgZGlzcGxheTogaW5saW5lLWJsb2NrOyBtYXJnaW4tcmlnaHQ6IDEwcHg7IHpvb206IDE7IH1cbiAgICAuY2hlY2tib3gtbmFtZSB7IHdoaXRlLXNwYWNlOiBub3dyYXA7IH1cbiAgICBtYXQtZXJyb3IgeyBmb250LXNpemU6IDc1JTsgfVxuICBgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxDaGVja2JveGVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcbiAgY29udHJvbE5hbWU6IHN0cmluZztcbiAgY29udHJvbFZhbHVlOiBhbnk7XG4gIGNvbnRyb2xEaXNhYmxlZCA9IGZhbHNlO1xuICBib3VuZENvbnRyb2wgPSBmYWxzZTtcbiAgb3B0aW9uczogYW55O1xuICBob3Jpem9udGFsTGlzdCA9IGZhbHNlO1xuICBmb3JtQXJyYXk6IEFic3RyYWN0Q29udHJvbDtcbiAgY2hlY2tib3hMaXN0OiBUaXRsZU1hcEl0ZW1bXSA9IFtdO1xuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnk7XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXTtcbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge307XG4gICAgdGhpcy5ob3Jpem9udGFsTGlzdCA9IHRoaXMubGF5b3V0Tm9kZS50eXBlID09PSAnY2hlY2tib3hlcy1pbmxpbmUnIHx8XG4gICAgICB0aGlzLmxheW91dE5vZGUudHlwZSA9PT0gJ2NoZWNrYm94YnV0dG9ucyc7XG4gICAgdGhpcy5qc2YuaW5pdGlhbGl6ZUNvbnRyb2wodGhpcyk7XG4gICAgdGhpcy5jaGVja2JveExpc3QgPSBidWlsZFRpdGxlTWFwKFxuICAgICAgdGhpcy5vcHRpb25zLnRpdGxlTWFwIHx8IHRoaXMub3B0aW9ucy5lbnVtTmFtZXMsIHRoaXMub3B0aW9ucy5lbnVtLCB0cnVlXG4gICAgKTtcbiAgICBpZiAodGhpcy5ib3VuZENvbnRyb2wpIHtcbiAgICAgIGNvbnN0IGZvcm1BcnJheSA9IHRoaXMuanNmLmdldEZvcm1Db250cm9sKHRoaXMpO1xuICAgICAgZm9yIChjb25zdCBjaGVja2JveEl0ZW0gb2YgdGhpcy5jaGVja2JveExpc3QpIHtcbiAgICAgICAgY2hlY2tib3hJdGVtLmNoZWNrZWQgPSBmb3JtQXJyYXkudmFsdWUuaW5jbHVkZXMoY2hlY2tib3hJdGVtLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgYWxsQ2hlY2tlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja2JveExpc3QuZmlsdGVyKHQgPT4gdC5jaGVja2VkKS5sZW5ndGggPT09IHRoaXMuY2hlY2tib3hMaXN0Lmxlbmd0aDtcbiAgfVxuXG4gIGdldCBzb21lQ2hlY2tlZCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBjaGVja2VkSXRlbXMgPSB0aGlzLmNoZWNrYm94TGlzdC5maWx0ZXIodCA9PiB0LmNoZWNrZWQpLmxlbmd0aDtcbiAgICByZXR1cm4gY2hlY2tlZEl0ZW1zID4gMCAmJiBjaGVja2VkSXRlbXMgPCB0aGlzLmNoZWNrYm94TGlzdC5sZW5ndGg7XG4gIH1cblxuICB1cGRhdGVWYWx1ZSgpIHtcbiAgICB0aGlzLm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWU7XG4gICAgaWYgKHRoaXMuYm91bmRDb250cm9sKSB7XG4gICAgICB0aGlzLmpzZi51cGRhdGVBcnJheUNoZWNrYm94TGlzdCh0aGlzLCB0aGlzLmNoZWNrYm94TGlzdCk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlQWxsVmFsdWVzKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWU7XG4gICAgdGhpcy5jaGVja2JveExpc3QuZm9yRWFjaCh0ID0+IHQuY2hlY2tlZCA9IGV2ZW50LmNoZWNrZWQpO1xuICAgIHRoaXMudXBkYXRlVmFsdWUoKTtcbiAgfVxufVxuIl19