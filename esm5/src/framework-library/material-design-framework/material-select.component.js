import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
import { buildTitleMap, isArray } from '../../shared';
var MaterialSelectComponent = /** @class */ (function () {
    function MaterialSelectComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.selectList = [];
        this.isArray = isArray;
    }
    MaterialSelectComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.selectList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, !!this.options.required, !!this.options.flatList);
        this.jsf.initializeControl(this, !this.options.readonly);
        if (!this.options.notitle && !this.options.description && this.options.placeholder) {
            this.options.description = this.options.placeholder;
        }
    };
    MaterialSelectComponent.prototype.updateValue = function (event) {
        this.options.showErrors = true;
        this.jsf.updateValue(this, event.value);
    };
    MaterialSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material-select-widget',
                    template: "\n    <mat-form-field\n      [class]=\"options?.htmlClass || ''\"\n      [floatLabel]=\"options?.floatPlaceholder || (options?.notitle ? 'never' : 'auto')\"\n      [style.width]=\"'100%'\">\n      <span matPrefix *ngIf=\"options?.prefix || options?.fieldAddonLeft\"\n        [innerHTML]=\"options?.prefix || options?.fieldAddonLeft\"></span>\n      <mat-select *ngIf=\"boundControl\"\n        [formControl]=\"formControl\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.name]=\"controlName\"\n        [id]=\"'control' + layoutNode?._id\"\n        [multiple]=\"options?.multiple\"\n        [placeholder]=\"options?.notitle ? options?.placeholder : options?.title\"\n        [required]=\"options?.required\"\n        [style.width]=\"'100%'\"\n        (blur)=\"options.showErrors = true\">\n        <ng-template ngFor let-selectItem [ngForOf]=\"selectList\">\n          <mat-option *ngIf=\"!isArray(selectItem?.items)\"\n            [value]=\"selectItem?.value\">\n            <span [innerHTML]=\"selectItem?.name\"></span>\n          </mat-option>\n          <mat-optgroup *ngIf=\"isArray(selectItem?.items)\"\n            [label]=\"selectItem?.group\">\n            <mat-option *ngFor=\"let subItem of selectItem.items\"\n              [value]=\"subItem?.value\">\n              <span [innerHTML]=\"subItem?.name\"></span>\n            </mat-option>\n          </mat-optgroup>\n        </ng-template>\n      </mat-select>\n      <mat-select *ngIf=\"!boundControl\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.name]=\"controlName\"\n        [disabled]=\"controlDisabled || options?.readonly\"\n        [id]=\"'control' + layoutNode?._id\"\n        [multiple]=\"options?.multiple\"\n        [placeholder]=\"options?.notitle ? options?.placeholder : options?.title\"\n        [required]=\"options?.required\"\n        [style.width]=\"'100%'\"\n        [value]=\"controlValue\"\n        (blur)=\"options.showErrors = true\"\n        (selectionChange)=\"updateValue($event)\">\n        <ng-template ngFor let-selectItem [ngForOf]=\"selectList\">\n          <mat-option *ngIf=\"!isArray(selectItem?.items)\"\n            [attr.selected]=\"selectItem?.value === controlValue\"\n            [value]=\"selectItem?.value\">\n            <span [innerHTML]=\"selectItem?.name\"></span>\n          </mat-option>\n          <mat-optgroup *ngIf=\"isArray(selectItem?.items)\"\n            [label]=\"selectItem?.group\">\n            <mat-option *ngFor=\"let subItem of selectItem.items\"\n              [attr.selected]=\"subItem?.value === controlValue\"\n              [value]=\"subItem?.value\">\n              <span [innerHTML]=\"subItem?.name\"></span>\n            </mat-option>\n          </mat-optgroup>\n        </ng-template>\n      </mat-select>\n      <span matSuffix *ngIf=\"options?.suffix || options?.fieldAddonRight\"\n        [innerHTML]=\"options?.suffix || options?.fieldAddonRight\"></span>\n      <mat-hint *ngIf=\"options?.description && (!options?.showErrors || !options?.errorMessage)\"\n        align=\"end\" [innerHTML]=\"options?.description\"></mat-hint>\n    </mat-form-field>\n    <mat-error *ngIf=\"options?.showErrors && options?.errorMessage\"\n      [innerHTML]=\"options?.errorMessage\"></mat-error>",
                    styles: ["\n    mat-error { font-size: 75%; margin-top: -1rem; margin-bottom: 0.5rem; }\n    ::ng-deep mat-form-field .mat-form-field-wrapper .mat-form-field-flex\n      .mat-form-field-infix { width: initial; }\n  "],
                },] },
    ];
    /** @nocollapse */
    MaterialSelectComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    MaterialSelectComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return MaterialSelectComponent;
}());
export { MaterialSelectComponent };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWpzb24tc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJzcmMvZnJhbWV3b3JrLWxpYnJhcnkvbWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay9tYXRlcmlhbC1zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBR3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXREO0lBdUZFLGlDQUNVLEdBQTBCO1FBQTFCLFFBQUcsR0FBSCxHQUFHLENBQXVCO1FBVnBDLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXJCLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFDdkIsWUFBTyxHQUFHLE9BQU8sQ0FBQztJQU9kLENBQUM7SUFFTCwwQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUNwRSxDQUFDO1FBQ0YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbkYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDdEQsQ0FBQztJQUNILENBQUM7SUFFRCw2Q0FBVyxHQUFYLFVBQVksS0FBSztRQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFDLENBQUM7O2dCQTFHRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsUUFBUSxFQUFFLDh1R0FpRTJDO29CQUNyRCxNQUFNLEVBQUUsQ0FBQywrTUFJUixDQUFDO2lCQUNIOzs7O2dCQTVFUSxxQkFBcUI7Ozs2QkFzRjNCLEtBQUs7OEJBQ0wsS0FBSzs0QkFDTCxLQUFLOztJQXNCUiw4QkFBQztDQUFBLEFBM0dELElBMkdDO1NBakNZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBKc29uU2NoZW1hRm9ybVNlcnZpY2UgfSBmcm9tICcuLi8uLi9qc29uLXNjaGVtYS1mb3JtLnNlcnZpY2UnO1xuaW1wb3J0IHsgYnVpbGRUaXRsZU1hcCwgaXNBcnJheSB9IGZyb20gJy4uLy4uL3NoYXJlZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdGVyaWFsLXNlbGVjdC13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxtYXQtZm9ybS1maWVsZFxuICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/Lmh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICBbZmxvYXRMYWJlbF09XCJvcHRpb25zPy5mbG9hdFBsYWNlaG9sZGVyIHx8IChvcHRpb25zPy5ub3RpdGxlID8gJ25ldmVyJyA6ICdhdXRvJylcIlxuICAgICAgW3N0eWxlLndpZHRoXT1cIicxMDAlJ1wiPlxuICAgICAgPHNwYW4gbWF0UHJlZml4ICpuZ0lmPVwib3B0aW9ucz8ucHJlZml4IHx8IG9wdGlvbnM/LmZpZWxkQWRkb25MZWZ0XCJcbiAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5wcmVmaXggfHwgb3B0aW9ucz8uZmllbGRBZGRvbkxlZnRcIj48L3NwYW4+XG4gICAgICA8bWF0LXNlbGVjdCAqbmdJZj1cImJvdW5kQ29udHJvbFwiXG4gICAgICAgIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiXG4gICAgICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ1N0YXR1cydcIlxuICAgICAgICBbYXR0ci5uYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgIFttdWx0aXBsZV09XCJvcHRpb25zPy5tdWx0aXBsZVwiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJvcHRpb25zPy5ub3RpdGxlID8gb3B0aW9ucz8ucGxhY2Vob2xkZXIgOiBvcHRpb25zPy50aXRsZVwiXG4gICAgICAgIFtyZXF1aXJlZF09XCJvcHRpb25zPy5yZXF1aXJlZFwiXG4gICAgICAgIFtzdHlsZS53aWR0aF09XCInMTAwJSdcIlxuICAgICAgICAoYmx1cik9XCJvcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtc2VsZWN0SXRlbSBbbmdGb3JPZl09XCJzZWxlY3RMaXN0XCI+XG4gICAgICAgICAgPG1hdC1vcHRpb24gKm5nSWY9XCIhaXNBcnJheShzZWxlY3RJdGVtPy5pdGVtcylcIlxuICAgICAgICAgICAgW3ZhbHVlXT1cInNlbGVjdEl0ZW0/LnZhbHVlXCI+XG4gICAgICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cInNlbGVjdEl0ZW0/Lm5hbWVcIj48L3NwYW4+XG4gICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICAgIDxtYXQtb3B0Z3JvdXAgKm5nSWY9XCJpc0FycmF5KHNlbGVjdEl0ZW0/Lml0ZW1zKVwiXG4gICAgICAgICAgICBbbGFiZWxdPVwic2VsZWN0SXRlbT8uZ3JvdXBcIj5cbiAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBzdWJJdGVtIG9mIHNlbGVjdEl0ZW0uaXRlbXNcIlxuICAgICAgICAgICAgICBbdmFsdWVdPVwic3ViSXRlbT8udmFsdWVcIj5cbiAgICAgICAgICAgICAgPHNwYW4gW2lubmVySFRNTF09XCJzdWJJdGVtPy5uYW1lXCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICAgIDwvbWF0LW9wdGdyb3VwPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9tYXQtc2VsZWN0PlxuICAgICAgPG1hdC1zZWxlY3QgKm5nSWY9XCIhYm91bmRDb250cm9sXCJcbiAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnU3RhdHVzJ1wiXG4gICAgICAgIFthdHRyLm5hbWVdPVwiY29udHJvbE5hbWVcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbERpc2FibGVkIHx8IG9wdGlvbnM/LnJlYWRvbmx5XCJcbiAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgIFttdWx0aXBsZV09XCJvcHRpb25zPy5tdWx0aXBsZVwiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJvcHRpb25zPy5ub3RpdGxlID8gb3B0aW9ucz8ucGxhY2Vob2xkZXIgOiBvcHRpb25zPy50aXRsZVwiXG4gICAgICAgIFtyZXF1aXJlZF09XCJvcHRpb25zPy5yZXF1aXJlZFwiXG4gICAgICAgIFtzdHlsZS53aWR0aF09XCInMTAwJSdcIlxuICAgICAgICBbdmFsdWVdPVwiY29udHJvbFZhbHVlXCJcbiAgICAgICAgKGJsdXIpPVwib3B0aW9ucy5zaG93RXJyb3JzID0gdHJ1ZVwiXG4gICAgICAgIChzZWxlY3Rpb25DaGFuZ2UpPVwidXBkYXRlVmFsdWUoJGV2ZW50KVwiPlxuICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXNlbGVjdEl0ZW0gW25nRm9yT2ZdPVwic2VsZWN0TGlzdFwiPlxuICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0lmPVwiIWlzQXJyYXkoc2VsZWN0SXRlbT8uaXRlbXMpXCJcbiAgICAgICAgICAgIFthdHRyLnNlbGVjdGVkXT1cInNlbGVjdEl0ZW0/LnZhbHVlID09PSBjb250cm9sVmFsdWVcIlxuICAgICAgICAgICAgW3ZhbHVlXT1cInNlbGVjdEl0ZW0/LnZhbHVlXCI+XG4gICAgICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cInNlbGVjdEl0ZW0/Lm5hbWVcIj48L3NwYW4+XG4gICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICAgIDxtYXQtb3B0Z3JvdXAgKm5nSWY9XCJpc0FycmF5KHNlbGVjdEl0ZW0/Lml0ZW1zKVwiXG4gICAgICAgICAgICBbbGFiZWxdPVwic2VsZWN0SXRlbT8uZ3JvdXBcIj5cbiAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBzdWJJdGVtIG9mIHNlbGVjdEl0ZW0uaXRlbXNcIlxuICAgICAgICAgICAgICBbYXR0ci5zZWxlY3RlZF09XCJzdWJJdGVtPy52YWx1ZSA9PT0gY29udHJvbFZhbHVlXCJcbiAgICAgICAgICAgICAgW3ZhbHVlXT1cInN1Ykl0ZW0/LnZhbHVlXCI+XG4gICAgICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwic3ViSXRlbT8ubmFtZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgICA8L21hdC1vcHRncm91cD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgIDxzcGFuIG1hdFN1ZmZpeCAqbmdJZj1cIm9wdGlvbnM/LnN1ZmZpeCB8fCBvcHRpb25zPy5maWVsZEFkZG9uUmlnaHRcIlxuICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LnN1ZmZpeCB8fCBvcHRpb25zPy5maWVsZEFkZG9uUmlnaHRcIj48L3NwYW4+XG4gICAgICA8bWF0LWhpbnQgKm5nSWY9XCJvcHRpb25zPy5kZXNjcmlwdGlvbiAmJiAoIW9wdGlvbnM/LnNob3dFcnJvcnMgfHwgIW9wdGlvbnM/LmVycm9yTWVzc2FnZSlcIlxuICAgICAgICBhbGlnbj1cImVuZFwiIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZGVzY3JpcHRpb25cIj48L21hdC1oaW50PlxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgPG1hdC1lcnJvciAqbmdJZj1cIm9wdGlvbnM/LnNob3dFcnJvcnMgJiYgb3B0aW9ucz8uZXJyb3JNZXNzYWdlXCJcbiAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZXJyb3JNZXNzYWdlXCI+PC9tYXQtZXJyb3I+YCxcbiAgc3R5bGVzOiBbYFxuICAgIG1hdC1lcnJvciB7IGZvbnQtc2l6ZTogNzUlOyBtYXJnaW4tdG9wOiAtMXJlbTsgbWFyZ2luLWJvdHRvbTogMC41cmVtOyB9XG4gICAgOjpuZy1kZWVwIG1hdC1mb3JtLWZpZWxkIC5tYXQtZm9ybS1maWVsZC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1mbGV4XG4gICAgICAubWF0LWZvcm0tZmllbGQtaW5maXggeyB3aWR0aDogaW5pdGlhbDsgfVxuICBgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sO1xuICBjb250cm9sTmFtZTogc3RyaW5nO1xuICBjb250cm9sVmFsdWU6IGFueTtcbiAgY29udHJvbERpc2FibGVkID0gZmFsc2U7XG4gIGJvdW5kQ29udHJvbCA9IGZhbHNlO1xuICBvcHRpb25zOiBhbnk7XG4gIHNlbGVjdExpc3Q6IGFueVtdID0gW107XG4gIGlzQXJyYXkgPSBpc0FycmF5O1xuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnk7XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXTtcbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge307XG4gICAgdGhpcy5zZWxlY3RMaXN0ID0gYnVpbGRUaXRsZU1hcChcbiAgICAgIHRoaXMub3B0aW9ucy50aXRsZU1hcCB8fCB0aGlzLm9wdGlvbnMuZW51bU5hbWVzLFxuICAgICAgdGhpcy5vcHRpb25zLmVudW0sICEhdGhpcy5vcHRpb25zLnJlcXVpcmVkLCAhIXRoaXMub3B0aW9ucy5mbGF0TGlzdFxuICAgICk7XG4gICAgdGhpcy5qc2YuaW5pdGlhbGl6ZUNvbnRyb2wodGhpcywgIXRoaXMub3B0aW9ucy5yZWFkb25seSk7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMubm90aXRsZSAmJiAhdGhpcy5vcHRpb25zLmRlc2NyaXB0aW9uICYmIHRoaXMub3B0aW9ucy5wbGFjZWhvbGRlcikge1xuICAgICAgdGhpcy5vcHRpb25zLmRlc2NyaXB0aW9uID0gdGhpcy5vcHRpb25zLnBsYWNlaG9sZGVyO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKGV2ZW50KSB7XG4gICAgdGhpcy5vcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlO1xuICAgIHRoaXMuanNmLnVwZGF0ZVZhbHVlKHRoaXMsIGV2ZW50LnZhbHVlKTtcbiAgfVxufVxuIl19