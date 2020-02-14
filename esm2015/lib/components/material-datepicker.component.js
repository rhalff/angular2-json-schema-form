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
import { dateToString, stringToDate } from '@ngsf/common';
import { JsonSchemaFormService } from '@ngsf/widget-library';
let MaterialDatepickerComponent = class MaterialDatepickerComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.autoCompleteList = [];
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this, !this.options.readonly);
        this.setControlDate(this.controlValue);
        if (!this.options.notitle && !this.options.description && this.options.placeholder) {
            this.options.description = this.options.placeholder;
        }
    }
    ngOnChanges() {
        this.setControlDate(this.controlValue);
    }
    setControlDate(dateString) {
        this.dateValue = stringToDate(dateString);
    }
    updateValue(event) {
        this.options.showErrors = true;
        this.jsf.updateValue(this, dateToString(event, this.options));
    }
};
MaterialDatepickerComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], MaterialDatepickerComponent.prototype, "layoutNode", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], MaterialDatepickerComponent.prototype, "layoutIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], MaterialDatepickerComponent.prototype, "dataIndex", void 0);
MaterialDatepickerComponent = __decorate([
    Component({
        selector: 'material-datepicker-widget',
        template: `
      <mat-form-field [style.width]="'100%'">
      <span matPrefix *ngIf="options?.prefix || options?.fieldAddonLeft"
            [innerHTML]="options?.prefix || options?.fieldAddonLeft"></span>
          <input matInput *ngIf="boundControl"
                 [formControl]="formControl"
                 [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                 [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
                 [attr.readonly]="options?.readonly ? 'readonly' : null"
                 [id]="'control' + layoutNode?._id"
                 [max]="options?.maximum"
                 [matDatepicker]="picker"
                 [min]="options?.minimum"
                 [name]="controlName"
                 [placeholder]="options?.title"
                 [required]="options?.required"
                 [style.width]="'100%'"
                 (blur)="options.showErrors = true">
          <input matInput *ngIf="!boundControl"
                 [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                 [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
                 [attr.readonly]="options?.readonly ? 'readonly' : null"
                 [disabled]="controlDisabled || options?.readonly"
                 [id]="'control' + layoutNode?._id"
                 [max]="options?.maximum"
                 [matDatepicker]="picker"
                 [min]="options?.minimum"
                 [name]="controlName"
                 [placeholder]="options?.title"
                 [required]="options?.required"
                 [style.width]="'100%'"
                 [value]="dateValue"
                 (blur)="options.showErrors = true"
                 (change)="updateValue($event)"
                 (input)="updateValue($event)">
          <span matSuffix *ngIf="options?.suffix || options?.fieldAddonRight"
                [innerHTML]="options?.suffix || options?.fieldAddonRight"></span>
          <mat-hint *ngIf="options?.description && (!options?.showErrors || !options?.errorMessage)"
                    align="end" [innerHTML]="options?.description"></mat-hint>
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      </mat-form-field>
      <mat-datepicker #picker></mat-datepicker>
      <mat-error *ngIf="options?.showErrors && options?.errorMessage"
                 [innerHTML]="options?.errorMessage"></mat-error>`,
        styles: [`
      mat-error {
          font-size: 75%;
          margin-top: -1rem;
          margin-bottom: 0.5rem;
      }

      ::ng-deep mat-form-field .mat-form-field-wrapper .mat-form-field-flex
      .mat-form-field-infix {
          width: initial;
      }
  `]
    }),
    __metadata("design:paramtypes", [JsonSchemaFormService])
], MaterialDatepickerComponent);
export { MaterialDatepickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGF0ZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdzZi9tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbWF0ZXJpYWwtZGF0ZXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQW9CLE1BQU0sZUFBZSxDQUFBO0FBRWpFLE9BQU8sRUFBQyxZQUFZLEVBQUUsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBQ3ZELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNCQUFzQixDQUFBO0FBNkQxRCxJQUFhLDJCQUEyQixHQUF4QyxNQUFhLDJCQUEyQjtJQWF0QyxZQUNVLEdBQTBCO1FBQTFCLFFBQUcsR0FBSCxHQUFHLENBQXVCO1FBVHBDLG9CQUFlLEdBQUcsS0FBSyxDQUFBO1FBQ3ZCLGlCQUFZLEdBQUcsS0FBSyxDQUFBO1FBRXBCLHFCQUFnQixHQUFhLEVBQUUsQ0FBQTtJQVEvQixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFBO1FBQzVDLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN4RCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtZQUNsRixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQTtTQUNwRDtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUVELGNBQWMsQ0FBQyxVQUFrQjtRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQUs7UUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUE7UUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDL0QsQ0FBQztDQUNGLENBQUE7O1lBekJnQixxQkFBcUI7O0FBTDNCO0lBQVIsS0FBSyxFQUFFOzsrREFBZ0I7QUFDZjtJQUFSLEtBQUssRUFBRTs7Z0VBQXNCO0FBQ3JCO0lBQVIsS0FBSyxFQUFFOzs4REFBb0I7QUFYakIsMkJBQTJCO0lBM0R2QyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsNEJBQTRCO1FBQ3RDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrRUEyQ3NEO2lCQUN2RDs7Ozs7Ozs7Ozs7R0FXUjtLQUNGLENBQUM7cUNBZWUscUJBQXFCO0dBZHpCLDJCQUEyQixDQXVDdkM7U0F2Q1ksMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3JtcydcbmltcG9ydCB7ZGF0ZVRvU3RyaW5nLCBzdHJpbmdUb0RhdGV9IGZyb20gJ0BuZ3NmL2NvbW1vbidcbmltcG9ydCB7SnNvblNjaGVtYUZvcm1TZXJ2aWNlfSBmcm9tICdAbmdzZi93aWRnZXQtbGlicmFyeSdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0ZXJpYWwtZGF0ZXBpY2tlci13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPG1hdC1mb3JtLWZpZWxkIFtzdHlsZS53aWR0aF09XCInMTAwJSdcIj5cbiAgICAgIDxzcGFuIG1hdFByZWZpeCAqbmdJZj1cIm9wdGlvbnM/LnByZWZpeCB8fCBvcHRpb25zPy5maWVsZEFkZG9uTGVmdFwiXG4gICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LnByZWZpeCB8fCBvcHRpb25zPy5maWVsZEFkZG9uTGVmdFwiPjwvc3Bhbj5cbiAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgKm5nSWY9XCJib3VuZENvbnRyb2xcIlxuICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdTdGF0dXMnXCJcbiAgICAgICAgICAgICAgICAgW2F0dHIubGlzdF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnQXV0b2NvbXBsZXRlJ1wiXG4gICAgICAgICAgICAgICAgIFthdHRyLnJlYWRvbmx5XT1cIm9wdGlvbnM/LnJlYWRvbmx5ID8gJ3JlYWRvbmx5JyA6IG51bGxcIlxuICAgICAgICAgICAgICAgICBbaWRdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkXCJcbiAgICAgICAgICAgICAgICAgW21heF09XCJvcHRpb25zPy5tYXhpbXVtXCJcbiAgICAgICAgICAgICAgICAgW21hdERhdGVwaWNrZXJdPVwicGlja2VyXCJcbiAgICAgICAgICAgICAgICAgW21pbl09XCJvcHRpb25zPy5taW5pbXVtXCJcbiAgICAgICAgICAgICAgICAgW25hbWVdPVwiY29udHJvbE5hbWVcIlxuICAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwib3B0aW9ucz8udGl0bGVcIlxuICAgICAgICAgICAgICAgICBbcmVxdWlyZWRdPVwib3B0aW9ucz8ucmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgICBbc3R5bGUud2lkdGhdPVwiJzEwMCUnXCJcbiAgICAgICAgICAgICAgICAgKGJsdXIpPVwib3B0aW9ucy5zaG93RXJyb3JzID0gdHJ1ZVwiPlxuICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCAqbmdJZj1cIiFib3VuZENvbnRyb2xcIlxuICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdTdGF0dXMnXCJcbiAgICAgICAgICAgICAgICAgW2F0dHIubGlzdF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnQXV0b2NvbXBsZXRlJ1wiXG4gICAgICAgICAgICAgICAgIFthdHRyLnJlYWRvbmx5XT1cIm9wdGlvbnM/LnJlYWRvbmx5ID8gJ3JlYWRvbmx5JyA6IG51bGxcIlxuICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbERpc2FibGVkIHx8IG9wdGlvbnM/LnJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgICAgICAgICAgIFttYXhdPVwib3B0aW9ucz8ubWF4aW11bVwiXG4gICAgICAgICAgICAgICAgIFttYXREYXRlcGlja2VyXT1cInBpY2tlclwiXG4gICAgICAgICAgICAgICAgIFttaW5dPVwib3B0aW9ucz8ubWluaW11bVwiXG4gICAgICAgICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cIm9wdGlvbnM/LnRpdGxlXCJcbiAgICAgICAgICAgICAgICAgW3JlcXVpcmVkXT1cIm9wdGlvbnM/LnJlcXVpcmVkXCJcbiAgICAgICAgICAgICAgICAgW3N0eWxlLndpZHRoXT1cIicxMDAlJ1wiXG4gICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJkYXRlVmFsdWVcIlxuICAgICAgICAgICAgICAgICAoYmx1cik9XCJvcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlXCJcbiAgICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJ1cGRhdGVWYWx1ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgKGlucHV0KT1cInVwZGF0ZVZhbHVlKCRldmVudClcIj5cbiAgICAgICAgICA8c3BhbiBtYXRTdWZmaXggKm5nSWY9XCJvcHRpb25zPy5zdWZmaXggfHwgb3B0aW9ucz8uZmllbGRBZGRvblJpZ2h0XCJcbiAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LnN1ZmZpeCB8fCBvcHRpb25zPy5maWVsZEFkZG9uUmlnaHRcIj48L3NwYW4+XG4gICAgICAgICAgPG1hdC1oaW50ICpuZ0lmPVwib3B0aW9ucz8uZGVzY3JpcHRpb24gJiYgKCFvcHRpb25zPy5zaG93RXJyb3JzIHx8ICFvcHRpb25zPy5lcnJvck1lc3NhZ2UpXCJcbiAgICAgICAgICAgICAgICAgICAgYWxpZ249XCJlbmRcIiBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmRlc2NyaXB0aW9uXCI+PC9tYXQtaGludD5cbiAgICAgICAgICA8bWF0LWRhdGVwaWNrZXItdG9nZ2xlIG1hdFN1ZmZpeCBbZm9yXT1cInBpY2tlclwiPjwvbWF0LWRhdGVwaWNrZXItdG9nZ2xlPlxuICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgIDxtYXQtZGF0ZXBpY2tlciAjcGlja2VyPjwvbWF0LWRhdGVwaWNrZXI+XG4gICAgICA8bWF0LWVycm9yICpuZ0lmPVwib3B0aW9ucz8uc2hvd0Vycm9ycyAmJiBvcHRpb25zPy5lcnJvck1lc3NhZ2VcIlxuICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmVycm9yTWVzc2FnZVwiPjwvbWF0LWVycm9yPmAsXG4gIHN0eWxlczogW2BcbiAgICAgIG1hdC1lcnJvciB7XG4gICAgICAgICAgZm9udC1zaXplOiA3NSU7XG4gICAgICAgICAgbWFyZ2luLXRvcDogLTFyZW07XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xuICAgICAgfVxuXG4gICAgICA6Om5nLWRlZXAgbWF0LWZvcm0tZmllbGQgLm1hdC1mb3JtLWZpZWxkLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWZsZXhcbiAgICAgIC5tYXQtZm9ybS1maWVsZC1pbmZpeCB7XG4gICAgICAgICAgd2lkdGg6IGluaXRpYWw7XG4gICAgICB9XG4gIGBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbERhdGVwaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2xcbiAgY29udHJvbE5hbWU6IHN0cmluZ1xuICBjb250cm9sVmFsdWU6IGFueVxuICBkYXRlVmFsdWU6IGFueVxuICBjb250cm9sRGlzYWJsZWQgPSBmYWxzZVxuICBib3VuZENvbnRyb2wgPSBmYWxzZVxuICBvcHRpb25zOiBhbnlcbiAgYXV0b0NvbXBsZXRlTGlzdDogc3RyaW5nW10gPSBbXVxuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge31cbiAgICB0aGlzLmpzZi5pbml0aWFsaXplQ29udHJvbCh0aGlzLCAhdGhpcy5vcHRpb25zLnJlYWRvbmx5KVxuICAgIHRoaXMuc2V0Q29udHJvbERhdGUodGhpcy5jb250cm9sVmFsdWUpXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMubm90aXRsZSAmJiAhdGhpcy5vcHRpb25zLmRlc2NyaXB0aW9uICYmIHRoaXMub3B0aW9ucy5wbGFjZWhvbGRlcikge1xuICAgICAgdGhpcy5vcHRpb25zLmRlc2NyaXB0aW9uID0gdGhpcy5vcHRpb25zLnBsYWNlaG9sZGVyXG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5zZXRDb250cm9sRGF0ZSh0aGlzLmNvbnRyb2xWYWx1ZSlcbiAgfVxuXG4gIHNldENvbnRyb2xEYXRlKGRhdGVTdHJpbmc6IHN0cmluZykge1xuICAgIHRoaXMuZGF0ZVZhbHVlID0gc3RyaW5nVG9EYXRlKGRhdGVTdHJpbmcpXG4gIH1cblxuICB1cGRhdGVWYWx1ZShldmVudCkge1xuICAgIHRoaXMub3B0aW9ucy5zaG93RXJyb3JzID0gdHJ1ZVxuICAgIHRoaXMuanNmLnVwZGF0ZVZhbHVlKHRoaXMsIGRhdGVUb1N0cmluZyhldmVudCwgdGhpcy5vcHRpb25zKSlcbiAgfVxufVxuIl19