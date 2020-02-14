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
import { buildTitleMap, JsonSchemaFormService } from '@ngsf/widget-library';
let MaterialButtonGroupComponent = class MaterialButtonGroupComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.radiosList = [];
        this.vertical = false;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.radiosList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
        this.jsf.initializeControl(this);
    }
    updateValue(value) {
        this.options.showErrors = true;
        this.jsf.updateValue(this, value);
    }
};
MaterialButtonGroupComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], MaterialButtonGroupComponent.prototype, "layoutNode", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], MaterialButtonGroupComponent.prototype, "layoutIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], MaterialButtonGroupComponent.prototype, "dataIndex", void 0);
MaterialButtonGroupComponent = __decorate([
    Component({
        selector: 'material-button-group-widget',
        template: `
      <div>
          <div *ngIf="options?.title">
              <label
                      [attr.for]="'control' + layoutNode?._id"
                      [class]="options?.labelHtmlClass || ''"
                      [style.display]="options?.notitle ? 'none' : ''"
                      [innerHTML]="options?.title"></label>
              [disabled]="controlDisabled || options?.readonly"
          </div>
          <mat-button-toggle-group
                  [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                  [attr.readonly]="options?.readonly ? 'readonly' : null"
                  [attr.required]="options?.required"
                  [name]="controlName"
                  [value]="controlValue"
                  [vertical]="!!options.vertical">
              <mat-button-toggle *ngFor="let radioItem of radiosList"
                                 [id]="'control' + layoutNode?._id + '/' + radioItem?.name"
                                 [value]="radioItem?.value"
                                 (click)="updateValue(radioItem?.value)">
                  <span [innerHTML]="radioItem?.name"></span>
              </mat-button-toggle>
          </mat-button-toggle-group>
          <mat-error *ngIf="options?.showErrors && options?.errorMessage"
                     [innerHTML]="options?.errorMessage"></mat-error>
      </div>`,
        styles: [` mat-error {
      font-size: 75%;
  } `]
    }),
    __metadata("design:paramtypes", [JsonSchemaFormService])
], MaterialButtonGroupComponent);
export { MaterialButtonGroupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtYnV0dG9uLWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL21hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9tYXRlcmlhbC1idXR0b24tZ3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFBO0FBRXRELE9BQU8sRUFBQyxhQUFhLEVBQUUscUJBQXFCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQTtBQW1DekUsSUFBYSw0QkFBNEIsR0FBekMsTUFBYSw0QkFBNEI7SUFhdkMsWUFDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQVZwQyxvQkFBZSxHQUFHLEtBQUssQ0FBQTtRQUN2QixpQkFBWSxHQUFHLEtBQUssQ0FBQTtRQUVwQixlQUFVLEdBQVUsRUFBRSxDQUFBO1FBQ3RCLGFBQVEsR0FBRyxLQUFLLENBQUE7SUFRaEIsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FDeEIsQ0FBQTtRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbEMsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFLO1FBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFBO1FBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0NBQ0YsQ0FBQTs7WUFqQmdCLHFCQUFxQjs7QUFMM0I7SUFBUixLQUFLLEVBQUU7O2dFQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFOztpRUFBc0I7QUFDckI7SUFBUixLQUFLLEVBQUU7OytEQUFvQjtBQVhqQiw0QkFBNEI7SUFqQ3hDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSw4QkFBOEI7UUFDeEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzthQTBCQztpQkFDRjs7S0FFTjtLQUNKLENBQUM7cUNBZWUscUJBQXFCO0dBZHpCLDRCQUE0QixDQStCeEM7U0EvQlksNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXG5pbXBvcnQge2J1aWxkVGl0bGVNYXAsIEpzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnQG5nc2Yvd2lkZ2V0LWxpYnJhcnknXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdGVyaWFsLWJ1dHRvbi1ncm91cC13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwib3B0aW9ucz8udGl0bGVcIj5cbiAgICAgICAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZm9yXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmxhYmVsSHRtbENsYXNzIHx8ICcnXCJcbiAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuZGlzcGxheV09XCJvcHRpb25zPy5ub3RpdGxlID8gJ25vbmUnIDogJydcIlxuICAgICAgICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8udGl0bGVcIj48L2xhYmVsPlxuICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbERpc2FibGVkIHx8IG9wdGlvbnM/LnJlYWRvbmx5XCJcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8bWF0LWJ1dHRvbi10b2dnbGUtZ3JvdXBcbiAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ1N0YXR1cydcIlxuICAgICAgICAgICAgICAgICAgW2F0dHIucmVhZG9ubHldPVwib3B0aW9ucz8ucmVhZG9ubHkgPyAncmVhZG9ubHknIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgICBbYXR0ci5yZXF1aXJlZF09XCJvcHRpb25zPy5yZXF1aXJlZFwiXG4gICAgICAgICAgICAgICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICAgICAgICAgICAgICBbdmFsdWVdPVwiY29udHJvbFZhbHVlXCJcbiAgICAgICAgICAgICAgICAgIFt2ZXJ0aWNhbF09XCIhIW9wdGlvbnMudmVydGljYWxcIj5cbiAgICAgICAgICAgICAgPG1hdC1idXR0b24tdG9nZ2xlICpuZ0Zvcj1cImxldCByYWRpb0l0ZW0gb2YgcmFkaW9zTGlzdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJy8nICsgcmFkaW9JdGVtPy5uYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJyYWRpb0l0ZW0/LnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJ1cGRhdGVWYWx1ZShyYWRpb0l0ZW0/LnZhbHVlKVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gW2lubmVySFRNTF09XCJyYWRpb0l0ZW0/Lm5hbWVcIj48L3NwYW4+XG4gICAgICAgICAgICAgIDwvbWF0LWJ1dHRvbi10b2dnbGU+XG4gICAgICAgICAgPC9tYXQtYnV0dG9uLXRvZ2dsZS1ncm91cD5cbiAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwib3B0aW9ucz8uc2hvd0Vycm9ycyAmJiBvcHRpb25zPy5lcnJvck1lc3NhZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5lcnJvck1lc3NhZ2VcIj48L21hdC1lcnJvcj5cbiAgICAgIDwvZGl2PmAsXG4gIHN0eWxlczogW2AgbWF0LWVycm9yIHtcbiAgICAgIGZvbnQtc2l6ZTogNzUlO1xuICB9IGBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbEJ1dHRvbkdyb3VwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbFxuICBjb250cm9sTmFtZTogc3RyaW5nXG4gIGNvbnRyb2xWYWx1ZTogYW55XG4gIGNvbnRyb2xEaXNhYmxlZCA9IGZhbHNlXG4gIGJvdW5kQ29udHJvbCA9IGZhbHNlXG4gIG9wdGlvbnM6IGFueVxuICByYWRpb3NMaXN0OiBhbnlbXSA9IFtdXG4gIHZlcnRpY2FsID0gZmFsc2VcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9XG4gICAgdGhpcy5yYWRpb3NMaXN0ID0gYnVpbGRUaXRsZU1hcChcbiAgICAgIHRoaXMub3B0aW9ucy50aXRsZU1hcCB8fCB0aGlzLm9wdGlvbnMuZW51bU5hbWVzLFxuICAgICAgdGhpcy5vcHRpb25zLmVudW0sIHRydWVcbiAgICApXG4gICAgdGhpcy5qc2YuaW5pdGlhbGl6ZUNvbnRyb2wodGhpcylcbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5vcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlXG4gICAgdGhpcy5qc2YudXBkYXRlVmFsdWUodGhpcywgdmFsdWUpXG4gIH1cbn1cbiJdfQ==