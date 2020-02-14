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
import { JsonSchemaFormService } from '@ngsf/widget-library';
let MaterialTextareaComponent = class MaterialTextareaComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (!this.options.notitle && !this.options.description && this.options.placeholder) {
            this.options.description = this.options.placeholder;
        }
    }
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
};
MaterialTextareaComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], MaterialTextareaComponent.prototype, "layoutNode", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], MaterialTextareaComponent.prototype, "layoutIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], MaterialTextareaComponent.prototype, "dataIndex", void 0);
MaterialTextareaComponent = __decorate([
    Component({
        selector: 'material-textarea-widget',
        template: `
      <mat-form-field
              [class]="options?.htmlClass || ''"
              [floatLabel]="options?.floatPlaceholder || (options?.notitle ? 'never' : 'auto')"
              [style.width]="'100%'">
      <span matPrefix *ngIf="options?.prefix || options?.fieldAddonLeft"
            [innerHTML]="options?.prefix || options?.fieldAddonLeft"></span>
          <textarea matInput *ngIf="boundControl"
                    [formControl]="formControl"
                    [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                    [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
                    [attr.maxlength]="options?.maxLength"
                    [attr.minlength]="options?.minLength"
                    [attr.pattern]="options?.pattern"
                    [required]="options?.required"
                    [id]="'control' + layoutNode?._id"
                    [name]="controlName"
                    [placeholder]="options?.notitle ? options?.placeholder : options?.title"
                    [readonly]="options?.readonly ? 'readonly' : null"
                    [style.width]="'100%'"
                    (blur)="options.showErrors = true"></textarea>
          <textarea matInput *ngIf="!boundControl"
                    [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                    [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
                    [attr.maxlength]="options?.maxLength"
                    [attr.minlength]="options?.minLength"
                    [attr.pattern]="options?.pattern"
                    [required]="options?.required"
                    [disabled]="controlDisabled"
                    [id]="'control' + layoutNode?._id"
                    [name]="controlName"
                    [placeholder]="options?.notitle ? options?.placeholder : options?.title"
                    [readonly]="options?.readonly ? 'readonly' : null"
                    [style.width]="'100%'"
                    [value]="controlValue"
                    (input)="updateValue($event)"
                    (blur)="options.showErrors = true"></textarea>
          <span matSuffix *ngIf="options?.suffix || options?.fieldAddonRight"
                [innerHTML]="options?.suffix || options?.fieldAddonRight"></span>
          <mat-hint *ngIf="options?.description && (!options?.showErrors || !options?.errorMessage)"
                    align="end" [innerHTML]="options?.description"></mat-hint>
      </mat-form-field>
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
], MaterialTextareaComponent);
export { MaterialTextareaComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtdGV4dGFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nc2YvbWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL21hdGVyaWFsLXRleHRhcmVhLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQTtBQUV0RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQTtBQTZEMUQsSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBeUI7SUFXcEMsWUFDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQVJwQyxvQkFBZSxHQUFHLEtBQUssQ0FBQTtRQUN2QixpQkFBWSxHQUFHLEtBQUssQ0FBQTtJQVNwQixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFBO1FBQzVDLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDbEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUE7U0FDcEQ7SUFDSCxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQUs7UUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNoRCxDQUFDO0NBQ0YsQ0FBQTs7WUFmZ0IscUJBQXFCOztBQUwzQjtJQUFSLEtBQUssRUFBRTs7NkRBQWdCO0FBQ2Y7SUFBUixLQUFLLEVBQUU7OzhEQUFzQjtBQUNyQjtJQUFSLEtBQUssRUFBRTs7NERBQW9CO0FBVGpCLHlCQUF5QjtJQTNEckMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDBCQUEwQjtRQUNwQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0VBMkNzRDtpQkFDdkQ7Ozs7Ozs7Ozs7O0dBV1I7S0FDRixDQUFDO3FDQWFlLHFCQUFxQjtHQVp6Qix5QkFBeUIsQ0EyQnJDO1NBM0JZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJ1xuaW1wb3J0IHtKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJ0BuZ3NmL3dpZGdldC1saWJyYXJ5J1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXRlcmlhbC10ZXh0YXJlYS13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPG1hdC1mb3JtLWZpZWxkXG4gICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5odG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICBbZmxvYXRMYWJlbF09XCJvcHRpb25zPy5mbG9hdFBsYWNlaG9sZGVyIHx8IChvcHRpb25zPy5ub3RpdGxlID8gJ25ldmVyJyA6ICdhdXRvJylcIlxuICAgICAgICAgICAgICBbc3R5bGUud2lkdGhdPVwiJzEwMCUnXCI+XG4gICAgICA8c3BhbiBtYXRQcmVmaXggKm5nSWY9XCJvcHRpb25zPy5wcmVmaXggfHwgb3B0aW9ucz8uZmllbGRBZGRvbkxlZnRcIlxuICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5wcmVmaXggfHwgb3B0aW9ucz8uZmllbGRBZGRvbkxlZnRcIj48L3NwYW4+XG4gICAgICAgICAgPHRleHRhcmVhIG1hdElucHV0ICpuZ0lmPVwiYm91bmRDb250cm9sXCJcbiAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnU3RhdHVzJ1wiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmxpc3RdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ0F1dG9jb21wbGV0ZSdcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5tYXhsZW5ndGhdPVwib3B0aW9ucz8ubWF4TGVuZ3RoXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIubWlubGVuZ3RoXT1cIm9wdGlvbnM/Lm1pbkxlbmd0aFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLnBhdHRlcm5dPVwib3B0aW9ucz8ucGF0dGVyblwiXG4gICAgICAgICAgICAgICAgICAgIFtyZXF1aXJlZF09XCJvcHRpb25zPy5yZXF1aXJlZFwiXG4gICAgICAgICAgICAgICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICAgICAgICAgICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJvcHRpb25zPy5ub3RpdGxlID8gb3B0aW9ucz8ucGxhY2Vob2xkZXIgOiBvcHRpb25zPy50aXRsZVwiXG4gICAgICAgICAgICAgICAgICAgIFtyZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgICAgW3N0eWxlLndpZHRoXT1cIicxMDAlJ1wiXG4gICAgICAgICAgICAgICAgICAgIChibHVyKT1cIm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWVcIj48L3RleHRhcmVhPlxuICAgICAgICAgIDx0ZXh0YXJlYSBtYXRJbnB1dCAqbmdJZj1cIiFib3VuZENvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdTdGF0dXMnXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIubGlzdF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnQXV0b2NvbXBsZXRlJ1wiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLm1heGxlbmd0aF09XCJvcHRpb25zPy5tYXhMZW5ndGhcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5taW5sZW5ndGhdPVwib3B0aW9ucz8ubWluTGVuZ3RoXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIucGF0dGVybl09XCJvcHRpb25zPy5wYXR0ZXJuXCJcbiAgICAgICAgICAgICAgICAgICAgW3JlcXVpcmVkXT1cIm9wdGlvbnM/LnJlcXVpcmVkXCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImNvbnRyb2xEaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICAgICAgICAgICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJvcHRpb25zPy5ub3RpdGxlID8gb3B0aW9ucz8ucGxhY2Vob2xkZXIgOiBvcHRpb25zPy50aXRsZVwiXG4gICAgICAgICAgICAgICAgICAgIFtyZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgICAgW3N0eWxlLndpZHRoXT1cIicxMDAlJ1wiXG4gICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJjb250cm9sVmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICAoaW5wdXQpPVwidXBkYXRlVmFsdWUoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIChibHVyKT1cIm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWVcIj48L3RleHRhcmVhPlxuICAgICAgICAgIDxzcGFuIG1hdFN1ZmZpeCAqbmdJZj1cIm9wdGlvbnM/LnN1ZmZpeCB8fCBvcHRpb25zPy5maWVsZEFkZG9uUmlnaHRcIlxuICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uc3VmZml4IHx8IG9wdGlvbnM/LmZpZWxkQWRkb25SaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICA8bWF0LWhpbnQgKm5nSWY9XCJvcHRpb25zPy5kZXNjcmlwdGlvbiAmJiAoIW9wdGlvbnM/LnNob3dFcnJvcnMgfHwgIW9wdGlvbnM/LmVycm9yTWVzc2FnZSlcIlxuICAgICAgICAgICAgICAgICAgICBhbGlnbj1cImVuZFwiIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZGVzY3JpcHRpb25cIj48L21hdC1oaW50PlxuICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJvcHRpb25zPy5zaG93RXJyb3JzICYmIG9wdGlvbnM/LmVycm9yTWVzc2FnZVwiXG4gICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZXJyb3JNZXNzYWdlXCI+PC9tYXQtZXJyb3I+YCxcbiAgc3R5bGVzOiBbYFxuICAgICAgbWF0LWVycm9yIHtcbiAgICAgICAgICBmb250LXNpemU6IDc1JTtcbiAgICAgICAgICBtYXJnaW4tdG9wOiAtMXJlbTtcbiAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG4gICAgICB9XG5cbiAgICAgIDo6bmctZGVlcCBtYXQtZm9ybS1maWVsZCAubWF0LWZvcm0tZmllbGQtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtZmxleFxuICAgICAgLm1hdC1mb3JtLWZpZWxkLWluZml4IHtcbiAgICAgICAgICB3aWR0aDogaW5pdGlhbDtcbiAgICAgIH1cbiAgYF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsVGV4dGFyZWFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sXG4gIGNvbnRyb2xOYW1lOiBzdHJpbmdcbiAgY29udHJvbFZhbHVlOiBhbnlcbiAgY29udHJvbERpc2FibGVkID0gZmFsc2VcbiAgYm91bmRDb250cm9sID0gZmFsc2VcbiAgb3B0aW9uczogYW55XG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmxheW91dE5vZGUub3B0aW9ucyB8fCB7fVxuICAgIHRoaXMuanNmLmluaXRpYWxpemVDb250cm9sKHRoaXMpXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMubm90aXRsZSAmJiAhdGhpcy5vcHRpb25zLmRlc2NyaXB0aW9uICYmIHRoaXMub3B0aW9ucy5wbGFjZWhvbGRlcikge1xuICAgICAgdGhpcy5vcHRpb25zLmRlc2NyaXB0aW9uID0gdGhpcy5vcHRpb25zLnBsYWNlaG9sZGVyXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlVmFsdWUoZXZlbnQpIHtcbiAgICB0aGlzLmpzZi51cGRhdGVWYWx1ZSh0aGlzLCBldmVudC50YXJnZXQudmFsdWUpXG4gIH1cbn1cbiJdfQ==