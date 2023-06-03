import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '@ngsf/widget-library';
import * as i0 from "@angular/core";
import * as i1 from "@ngsf/widget-library";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/material/checkbox";
import * as i5 from "@angular/material/form-field";
import * as i6 from "@angular/material/slide-toggle";
class MaterialCheckboxComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    controlDisabled = false;
    boundControl = false;
    options;
    trueValue = true;
    falseValue = false;
    showSlideToggle = false;
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
    }
    get isChecked() {
        return this.jsf.getFormControlValue(this) === this.trueValue;
    }
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this, !this.options.readonly);
        if (this.controlValue === null || this.controlValue === undefined) {
            this.controlValue = false;
            this.jsf.updateValue(this, this.falseValue);
        }
        if (this.layoutNode.type === 'slide-toggle' ||
            this.layoutNode.format === 'slide-toggle') {
            this.showSlideToggle = true;
        }
    }
    updateValue(event) {
        this.options.showErrors = true;
        this.jsf.updateValue(this, event.checked ? this.trueValue : this.falseValue);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: MaterialCheckboxComponent, deps: [{ token: i1.JsonSchemaFormService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: MaterialCheckboxComponent, selector: "material-checkbox-widget", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, ngImport: i0, template: `
      <mat-checkbox *ngIf="boundControl && !showSlideToggle"
                    [formControl]="formControl"
                    align="left"
                    [color]="options?.color || 'primary'"
                    [id]="'control' + layoutNode?._id"
                    labelPosition="after"
                    [name]="controlName"
                    (blur)="options.showErrors = true">
      <span *ngIf="options?.title"
            class="checkbox-name"
            [style.display]="options?.notitle ? 'none' : ''"
            [innerHTML]="options?.title"></span>
      </mat-checkbox>
      <mat-checkbox *ngIf="!boundControl && !showSlideToggle"
                    align="left"
                    [color]="options?.color || 'primary'"
                    [disabled]="controlDisabled || options?.readonly"
                    [id]="'control' + layoutNode?._id"
                    labelPosition="after"
                    [name]="controlName"
                    [checked]="isChecked"
                    (blur)="options.showErrors = true"
                    (change)="updateValue($event)">
      <span *ngIf="options?.title"
            class="checkbox-name"
            [style.display]="options?.notitle ? 'none' : ''"
            [innerHTML]="options?.title"></span>
      </mat-checkbox>
      <mat-slide-toggle *ngIf="boundControl && showSlideToggle"
                        [formControl]="formControl"
                        align="left"
                        [color]="options?.color || 'primary'"
                        [id]="'control' + layoutNode?._id"
                        labelPosition="after"
                        [name]="controlName"
                        (blur)="options.showErrors = true">
      <span *ngIf="options?.title"
            class="checkbox-name"
            [style.display]="options?.notitle ? 'none' : ''"
            [innerHTML]="options?.title"></span>
      </mat-slide-toggle>
      <mat-slide-toggle *ngIf="!boundControl && showSlideToggle"
                        align="left"
                        [color]="options?.color || 'primary'"
                        [disabled]="controlDisabled || options?.readonly"
                        [id]="'control' + layoutNode?._id"
                        labelPosition="after"
                        [name]="controlName"
                        [checked]="isChecked"
                        (blur)="options.showErrors = true"
                        (change)="updateValue($event)">
      <span *ngIf="options?.title"
            class="checkbox-name"
            [style.display]="options?.notitle ? 'none' : ''"
            [innerHTML]="options?.title"></span>
      </mat-slide-toggle>
      <mat-error *ngIf="options?.showErrors && options?.errorMessage"
                 [innerHTML]="options?.errorMessage"></mat-error>`, isInline: true, styles: [".checkbox-name{white-space:nowrap}mat-error{font-size:75%}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: i4.MatCheckbox, selector: "mat-checkbox", inputs: ["disableRipple", "color", "tabIndex"], exportAs: ["matCheckbox"] }, { kind: "directive", type: i5.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "component", type: i6.MatSlideToggle, selector: "mat-slide-toggle", inputs: ["disabled", "disableRipple", "color", "tabIndex"], exportAs: ["matSlideToggle"] }] });
}
export { MaterialCheckboxComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: MaterialCheckboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'material-checkbox-widget', template: `
      <mat-checkbox *ngIf="boundControl && !showSlideToggle"
                    [formControl]="formControl"
                    align="left"
                    [color]="options?.color || 'primary'"
                    [id]="'control' + layoutNode?._id"
                    labelPosition="after"
                    [name]="controlName"
                    (blur)="options.showErrors = true">
      <span *ngIf="options?.title"
            class="checkbox-name"
            [style.display]="options?.notitle ? 'none' : ''"
            [innerHTML]="options?.title"></span>
      </mat-checkbox>
      <mat-checkbox *ngIf="!boundControl && !showSlideToggle"
                    align="left"
                    [color]="options?.color || 'primary'"
                    [disabled]="controlDisabled || options?.readonly"
                    [id]="'control' + layoutNode?._id"
                    labelPosition="after"
                    [name]="controlName"
                    [checked]="isChecked"
                    (blur)="options.showErrors = true"
                    (change)="updateValue($event)">
      <span *ngIf="options?.title"
            class="checkbox-name"
            [style.display]="options?.notitle ? 'none' : ''"
            [innerHTML]="options?.title"></span>
      </mat-checkbox>
      <mat-slide-toggle *ngIf="boundControl && showSlideToggle"
                        [formControl]="formControl"
                        align="left"
                        [color]="options?.color || 'primary'"
                        [id]="'control' + layoutNode?._id"
                        labelPosition="after"
                        [name]="controlName"
                        (blur)="options.showErrors = true">
      <span *ngIf="options?.title"
            class="checkbox-name"
            [style.display]="options?.notitle ? 'none' : ''"
            [innerHTML]="options?.title"></span>
      </mat-slide-toggle>
      <mat-slide-toggle *ngIf="!boundControl && showSlideToggle"
                        align="left"
                        [color]="options?.color || 'primary'"
                        [disabled]="controlDisabled || options?.readonly"
                        [id]="'control' + layoutNode?._id"
                        labelPosition="after"
                        [name]="controlName"
                        [checked]="isChecked"
                        (blur)="options.showErrors = true"
                        (change)="updateValue($event)">
      <span *ngIf="options?.title"
            class="checkbox-name"
            [style.display]="options?.notitle ? 'none' : ''"
            [innerHTML]="options?.title"></span>
      </mat-slide-toggle>
      <mat-error *ngIf="options?.showErrors && options?.errorMessage"
                 [innerHTML]="options?.errorMessage"></mat-error>`, styles: [".checkbox-name{white-space:nowrap}mat-error{font-size:75%}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.JsonSchemaFormService }]; }, propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmdzZi1tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrL3NyYy9saWIvY29tcG9uZW50cy9tYXRlcmlhbC1jaGVja2JveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUE7QUFFdEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7Ozs7Ozs7O0FBRTFELE1BdUVhLHlCQUF5QjtJQWUxQjtJQWRWLFdBQVcsQ0FBaUI7SUFDNUIsV0FBVyxDQUFRO0lBQ25CLFlBQVksQ0FBSztJQUNqQixlQUFlLEdBQUcsS0FBSyxDQUFBO0lBQ3ZCLFlBQVksR0FBRyxLQUFLLENBQUE7SUFDcEIsT0FBTyxDQUFLO0lBQ1osU0FBUyxHQUFRLElBQUksQ0FBQTtJQUNyQixVQUFVLEdBQVEsS0FBSyxDQUFBO0lBQ3ZCLGVBQWUsR0FBRyxLQUFLLENBQUE7SUFDZCxVQUFVLENBQUs7SUFDZixXQUFXLENBQVU7SUFDckIsU0FBUyxDQUFVO0lBRTVCLFlBQ1UsR0FBMEI7UUFBMUIsUUFBRyxHQUFILEdBQUcsQ0FBdUI7SUFFcEMsQ0FBQztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFBO0lBQzlELENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3hELElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxTQUFTLEVBQUU7WUFDakUsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUE7WUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtTQUM1QztRQUNELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssY0FBYztZQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sS0FBSyxjQUFjLEVBQ3pDO1lBQ0EsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUE7U0FDNUI7SUFDSCxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQUs7UUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUE7UUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUM5RSxDQUFDO3VHQXhDVSx5QkFBeUI7MkZBQXpCLHlCQUF5QiwwSkFyRTFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tFQTBEc0Q7O1NBV3JELHlCQUF5QjsyRkFBekIseUJBQXlCO2tCQXZFckMsU0FBUzsrQkFDRSwwQkFBMEIsWUFDMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0VBMERzRDs0R0FxQnZELFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnQG5nc2Yvd2lkZ2V0LWxpYnJhcnknXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdGVyaWFsLWNoZWNrYm94LXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8bWF0LWNoZWNrYm94ICpuZ0lmPVwiYm91bmRDb250cm9sICYmICFzaG93U2xpZGVUb2dnbGVcIlxuICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICBhbGlnbj1cImxlZnRcIlxuICAgICAgICAgICAgICAgICAgICBbY29sb3JdPVwib3B0aW9ucz8uY29sb3IgfHwgJ3ByaW1hcnknXCJcbiAgICAgICAgICAgICAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsUG9zaXRpb249XCJhZnRlclwiXG4gICAgICAgICAgICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwib3B0aW9ucy5zaG93RXJyb3JzID0gdHJ1ZVwiPlxuICAgICAgPHNwYW4gKm5nSWY9XCJvcHRpb25zPy50aXRsZVwiXG4gICAgICAgICAgICBjbGFzcz1cImNoZWNrYm94LW5hbWVcIlxuICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwib3B0aW9ucz8ubm90aXRsZSA/ICdub25lJyA6ICcnXCJcbiAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8udGl0bGVcIj48L3NwYW4+XG4gICAgICA8L21hdC1jaGVja2JveD5cbiAgICAgIDxtYXQtY2hlY2tib3ggKm5nSWY9XCIhYm91bmRDb250cm9sICYmICFzaG93U2xpZGVUb2dnbGVcIlxuICAgICAgICAgICAgICAgICAgICBhbGlnbj1cImxlZnRcIlxuICAgICAgICAgICAgICAgICAgICBbY29sb3JdPVwib3B0aW9ucz8uY29sb3IgfHwgJ3ByaW1hcnknXCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImNvbnRyb2xEaXNhYmxlZCB8fCBvcHRpb25zPy5yZWFkb25seVwiXG4gICAgICAgICAgICAgICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICAgICAgICAgICAgICBsYWJlbFBvc2l0aW9uPVwiYWZ0ZXJcIlxuICAgICAgICAgICAgICAgICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIFtjaGVja2VkXT1cImlzQ2hlY2tlZFwiXG4gICAgICAgICAgICAgICAgICAgIChibHVyKT1cIm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWVcIlxuICAgICAgICAgICAgICAgICAgICAoY2hhbmdlKT1cInVwZGF0ZVZhbHVlKCRldmVudClcIj5cbiAgICAgIDxzcGFuICpuZ0lmPVwib3B0aW9ucz8udGl0bGVcIlxuICAgICAgICAgICAgY2xhc3M9XCJjaGVja2JveC1uYW1lXCJcbiAgICAgICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cIm9wdGlvbnM/Lm5vdGl0bGUgPyAnbm9uZScgOiAnJ1wiXG4gICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LnRpdGxlXCI+PC9zcGFuPlxuICAgICAgPC9tYXQtY2hlY2tib3g+XG4gICAgICA8bWF0LXNsaWRlLXRvZ2dsZSAqbmdJZj1cImJvdW5kQ29udHJvbCAmJiBzaG93U2xpZGVUb2dnbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduPVwibGVmdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY29sb3JdPVwib3B0aW9ucz8uY29sb3IgfHwgJ3ByaW1hcnknXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxQb3NpdGlvbj1cImFmdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChibHVyKT1cIm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWVcIj5cbiAgICAgIDxzcGFuICpuZ0lmPVwib3B0aW9ucz8udGl0bGVcIlxuICAgICAgICAgICAgY2xhc3M9XCJjaGVja2JveC1uYW1lXCJcbiAgICAgICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cIm9wdGlvbnM/Lm5vdGl0bGUgPyAnbm9uZScgOiAnJ1wiXG4gICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LnRpdGxlXCI+PC9zcGFuPlxuICAgICAgPC9tYXQtc2xpZGUtdG9nZ2xlPlxuICAgICAgPG1hdC1zbGlkZS10b2dnbGUgKm5nSWY9XCIhYm91bmRDb250cm9sICYmIHNob3dTbGlkZVRvZ2dsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbj1cImxlZnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NvbG9yXT1cIm9wdGlvbnM/LmNvbG9yIHx8ICdwcmltYXJ5J1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbERpc2FibGVkIHx8IG9wdGlvbnM/LnJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxQb3NpdGlvbj1cImFmdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjaGVja2VkXT1cImlzQ2hlY2tlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoYmx1cik9XCJvcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjaGFuZ2UpPVwidXBkYXRlVmFsdWUoJGV2ZW50KVwiPlxuICAgICAgPHNwYW4gKm5nSWY9XCJvcHRpb25zPy50aXRsZVwiXG4gICAgICAgICAgICBjbGFzcz1cImNoZWNrYm94LW5hbWVcIlxuICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwib3B0aW9ucz8ubm90aXRsZSA/ICdub25lJyA6ICcnXCJcbiAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8udGl0bGVcIj48L3NwYW4+XG4gICAgICA8L21hdC1zbGlkZS10b2dnbGU+XG4gICAgICA8bWF0LWVycm9yICpuZ0lmPVwib3B0aW9ucz8uc2hvd0Vycm9ycyAmJiBvcHRpb25zPy5lcnJvck1lc3NhZ2VcIlxuICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmVycm9yTWVzc2FnZVwiPjwvbWF0LWVycm9yPmAsXG4gIHN0eWxlczogW2BcbiAgICAgIC5jaGVja2JveC1uYW1lIHtcbiAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgfVxuXG4gICAgICBtYXQtZXJyb3Ige1xuICAgICAgICAgIGZvbnQtc2l6ZTogNzUlO1xuICAgICAgfVxuICBgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxDaGVja2JveENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2xcbiAgY29udHJvbE5hbWU6IHN0cmluZ1xuICBjb250cm9sVmFsdWU6IGFueVxuICBjb250cm9sRGlzYWJsZWQgPSBmYWxzZVxuICBib3VuZENvbnRyb2wgPSBmYWxzZVxuICBvcHRpb25zOiBhbnlcbiAgdHJ1ZVZhbHVlOiBhbnkgPSB0cnVlXG4gIGZhbHNlVmFsdWU6IGFueSA9IGZhbHNlXG4gIHNob3dTbGlkZVRvZ2dsZSA9IGZhbHNlXG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBnZXQgaXNDaGVja2VkKCkge1xuICAgIHJldHVybiB0aGlzLmpzZi5nZXRGb3JtQ29udHJvbFZhbHVlKHRoaXMpID09PSB0aGlzLnRydWVWYWx1ZVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge31cbiAgICB0aGlzLmpzZi5pbml0aWFsaXplQ29udHJvbCh0aGlzLCAhdGhpcy5vcHRpb25zLnJlYWRvbmx5KVxuICAgIGlmICh0aGlzLmNvbnRyb2xWYWx1ZSA9PT0gbnVsbCB8fCB0aGlzLmNvbnRyb2xWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmNvbnRyb2xWYWx1ZSA9IGZhbHNlXG4gICAgICB0aGlzLmpzZi51cGRhdGVWYWx1ZSh0aGlzLCB0aGlzLmZhbHNlVmFsdWUpXG4gICAgfVxuICAgIGlmICh0aGlzLmxheW91dE5vZGUudHlwZSA9PT0gJ3NsaWRlLXRvZ2dsZScgfHxcbiAgICAgIHRoaXMubGF5b3V0Tm9kZS5mb3JtYXQgPT09ICdzbGlkZS10b2dnbGUnXG4gICAgKSB7XG4gICAgICB0aGlzLnNob3dTbGlkZVRvZ2dsZSA9IHRydWVcbiAgICB9XG4gIH1cblxuICB1cGRhdGVWYWx1ZShldmVudCkge1xuICAgIHRoaXMub3B0aW9ucy5zaG93RXJyb3JzID0gdHJ1ZVxuICAgIHRoaXMuanNmLnVwZGF0ZVZhbHVlKHRoaXMsIGV2ZW50LmNoZWNrZWQgPyB0aGlzLnRydWVWYWx1ZSA6IHRoaXMuZmFsc2VWYWx1ZSlcbiAgfVxufVxuIl19