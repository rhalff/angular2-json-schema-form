import { Component, Input } from '@angular/core';
import { buildTitleMap, JsonSchemaFormService } from '@ngsf/widget-library';
import * as i0 from "@angular/core";
import * as i1 from "@ngsf/widget-library";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/material/checkbox";
import * as i5 from "@angular/material/form-field";
function MaterialCheckboxesComponent_label_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "label", 6);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r0.options == null ? null : ctx_r0.options.labelHtmlClass) || "");
    i0.ɵɵstyleProp("display", (ctx_r0.options == null ? null : ctx_r0.options.notitle) ? "none" : "");
    i0.ɵɵproperty("innerHTML", ctx_r0.options == null ? null : ctx_r0.options.title, i0.ɵɵsanitizeHtml);
} }
function MaterialCheckboxesComponent_li_5_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li")(1, "mat-checkbox", 7);
    i0.ɵɵlistener("ngModelChange", function MaterialCheckboxesComponent_li_5_Template_mat_checkbox_ngModelChange_1_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r5); const checkboxItem_r3 = restoredCtx.$implicit; return i0.ɵɵresetView(checkboxItem_r3.checked = $event); })("blur", function MaterialCheckboxesComponent_li_5_Template_mat_checkbox_blur_1_listener() { i0.ɵɵrestoreView(_r5); const ctx_r6 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r6.options.showErrors = true); })("change", function MaterialCheckboxesComponent_li_5_Template_mat_checkbox_change_1_listener() { i0.ɵɵrestoreView(_r5); const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.updateValue()); });
    i0.ɵɵelement(2, "span", 1);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const checkboxItem_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassMap((ctx_r1.options == null ? null : ctx_r1.options.htmlClass) || "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", checkboxItem_r3.checked)("color", (ctx_r1.options == null ? null : ctx_r1.options.color) || "primary")("disabled", ctx_r1.controlDisabled || (ctx_r1.options == null ? null : ctx_r1.options.readonly))("name", checkboxItem_r3 == null ? null : checkboxItem_r3.name);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", checkboxItem_r3 == null ? null : checkboxItem_r3.name, i0.ɵɵsanitizeHtml);
} }
function MaterialCheckboxesComponent_mat_error_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-error", 8);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r2.options == null ? null : ctx_r2.options.errorMessage, i0.ɵɵsanitizeHtml);
} }
class MaterialCheckboxesComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    controlDisabled = false;
    boundControl = false;
    options;
    horizontalList = false;
    formArray;
    checkboxList = [];
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
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
    static ɵfac = function MaterialCheckboxesComponent_Factory(t) { return new (t || MaterialCheckboxesComponent)(i0.ɵɵdirectiveInject(i1.JsonSchemaFormService)); };
    static ɵcmp = i0.ɵɵdefineComponent({ type: MaterialCheckboxesComponent, selectors: [["material-checkboxes-widget"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 7, vars: 11, consts: [["type", "checkbox", 3, "checked", "color", "disabled", "indeterminate", "name", "blur", "change"], [1, "checkbox-name", 3, "innerHTML"], ["class", "title", 3, "class", "display", "innerHTML", 4, "ngIf"], [1, "checkbox-list"], [3, "class", 4, "ngFor", "ngForOf"], [3, "innerHTML", 4, "ngIf"], [1, "title", 3, "innerHTML"], ["type", "checkbox", 3, "ngModel", "color", "disabled", "name", "ngModelChange", "blur", "change"], [3, "innerHTML"]], template: function MaterialCheckboxesComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div")(1, "mat-checkbox", 0);
            i0.ɵɵlistener("blur", function MaterialCheckboxesComponent_Template_mat_checkbox_blur_1_listener() { return ctx.options.showErrors = true; })("change", function MaterialCheckboxesComponent_Template_mat_checkbox_change_1_listener($event) { return ctx.updateAllValues($event); });
            i0.ɵɵelement(2, "span", 1);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(3, MaterialCheckboxesComponent_label_3_Template, 1, 5, "label", 2);
            i0.ɵɵelementStart(4, "ul", 3);
            i0.ɵɵtemplate(5, MaterialCheckboxesComponent_li_5_Template, 3, 7, "li", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(6, MaterialCheckboxesComponent_mat_error_6_Template, 1, 1, "mat-error", 5);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("checked", ctx.allChecked)("color", (ctx.options == null ? null : ctx.options.color) || "primary")("disabled", ctx.controlDisabled || (ctx.options == null ? null : ctx.options.readonly))("indeterminate", ctx.someChecked)("name", ctx.options == null ? null : ctx.options.name);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("innerHTML", ctx.options == null ? null : ctx.options.name, i0.ɵɵsanitizeHtml);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.title);
            i0.ɵɵadvance(1);
            i0.ɵɵclassProp("horizontal-list", ctx.horizontalList);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx.checkboxList);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.options == null ? null : ctx.options.showErrors) && (ctx.options == null ? null : ctx.options.errorMessage));
        } }, dependencies: [i2.NgForOf, i2.NgIf, i3.NgControlStatus, i3.NgModel, i4.MatCheckbox, i5.MatError], styles: [".title[_ngcontent-%COMP%]{font-weight:700}.checkbox-list[_ngcontent-%COMP%]{list-style-type:none}.horizontal-list[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{display:inline-block;margin-right:10px;zoom:1}.checkbox-name[_ngcontent-%COMP%]{white-space:nowrap}mat-error[_ngcontent-%COMP%]{font-size:75%}"] });
}
export { MaterialCheckboxesComponent };
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialCheckboxesComponent, [{
        type: Component,
        args: [{ selector: 'material-checkboxes-widget', template: `
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
      </div>`, styles: [".title{font-weight:700}.checkbox-list{list-style-type:none}.horizontal-list>li{display:inline-block;margin-right:10px;zoom:1}.checkbox-name{white-space:nowrap}mat-error{font-size:75%}\n"] }]
    }], function () { return [{ type: i1.JsonSchemaFormService }]; }, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtY2hlY2tib3hlcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLW1hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsvc3JjL2xpYi9jb21wb25lbnRzL21hdGVyaWFsLWNoZWNrYm94ZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFBO0FBRXRELE9BQU8sRUFBQyxhQUFhLEVBQUUscUJBQXFCLEVBQWUsTUFBTSxzQkFBc0IsQ0FBQTs7Ozs7Ozs7SUFtQjdFLDJCQUk0Qzs7O0lBRnJDLG9GQUF1QztJQUN2QyxpR0FBZ0Q7SUFDaEQsbUdBQTRCOzs7O0lBRS9CLDBCQUN1QyxzQkFBQTtJQUVyQixtT0FBYSxnREFDdkMsSUFENEQsOEpBSTFCLDJDQUFxQixJQUFJLENBQUEsSUFKQyxrS0FLeEIsZUFBQSxvQkFBYSxDQUFBLElBTFc7SUFNNUMsMEJBQW9FO0lBQ3hFLGlCQUFlLEVBQUE7Ozs7SUFUZiwrRUFBa0M7SUFFcEIsZUFBa0M7SUFBbEMsaURBQWtDLDhFQUFBLGlHQUFBLCtEQUFBO0lBTWhCLGVBQWdDO0lBQWhDLG9HQUFnQzs7O0lBSXhFLCtCQUMyRDs7O0lBQWhELDBHQUFtQzs7QUFsQ3hELE1BNERhLDJCQUEyQjtJQWU1QjtJQWRWLFdBQVcsQ0FBaUI7SUFDNUIsV0FBVyxDQUFRO0lBQ25CLFlBQVksQ0FBSztJQUNqQixlQUFlLEdBQUcsS0FBSyxDQUFBO0lBQ3ZCLFlBQVksR0FBRyxLQUFLLENBQUE7SUFDcEIsT0FBTyxDQUFLO0lBQ1osY0FBYyxHQUFHLEtBQUssQ0FBQTtJQUN0QixTQUFTLENBQWlCO0lBQzFCLFlBQVksR0FBbUIsRUFBRSxDQUFBO0lBQ3hCLFVBQVUsQ0FBSztJQUNmLFdBQVcsQ0FBVTtJQUNyQixTQUFTLENBQVU7SUFFNUIsWUFD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QyxTQUFTOzJCQUNFLDRCQUE0QixZQUM1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2FBaUNDO3dFQW1DRixVQUFVO2tCQUFsQixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3JtcydcbmltcG9ydCB7YnVpbGRUaXRsZU1hcCwgSnNvblNjaGVtYUZvcm1TZXJ2aWNlLCBUaXRsZU1hcEl0ZW19IGZyb20gJ0BuZ3NmL3dpZGdldC1saWJyYXJ5J1xuXG4vLyBUT0RPOiBDaGFuZ2UgdGhpcyB0byB1c2UgYSBTZWxlY3Rpb24gTGlzdCBpbnN0ZWFkP1xuLy8gaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2NvbXBvbmVudHMvbGlzdC9vdmVydmlld1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXRlcmlhbC1jaGVja2JveGVzLXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8ZGl2PlxuICAgICAgICAgIDxtYXQtY2hlY2tib3ggdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjaGVja2VkXT1cImFsbENoZWNrZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NvbG9yXT1cIm9wdGlvbnM/LmNvbG9yIHx8ICdwcmltYXJ5J1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbERpc2FibGVkIHx8IG9wdGlvbnM/LnJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtpbmRldGVybWluYXRlXT1cInNvbWVDaGVja2VkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuYW1lXT1cIm9wdGlvbnM/Lm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwib3B0aW9ucy5zaG93RXJyb3JzID0gdHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2hhbmdlKT1cInVwZGF0ZUFsbFZhbHVlcygkZXZlbnQpXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hlY2tib3gtbmFtZVwiIFtpbm5lckhUTUxdPVwib3B0aW9ucz8ubmFtZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8L21hdC1jaGVja2JveD5cbiAgICAgICAgICA8bGFiZWwgKm5nSWY9XCJvcHRpb25zPy50aXRsZVwiXG4gICAgICAgICAgICAgICAgIGNsYXNzPVwidGl0bGVcIlxuICAgICAgICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8ubGFiZWxIdG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICAgICBbc3R5bGUuZGlzcGxheV09XCJvcHRpb25zPy5ub3RpdGxlID8gJ25vbmUnIDogJydcIlxuICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LnRpdGxlXCI+PC9sYWJlbD5cbiAgICAgICAgICA8dWwgY2xhc3M9XCJjaGVja2JveC1saXN0XCIgW2NsYXNzLmhvcml6b250YWwtbGlzdF09XCJob3Jpem9udGFsTGlzdFwiPlxuICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGNoZWNrYm94SXRlbSBvZiBjaGVja2JveExpc3RcIlxuICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/Lmh0bWxDbGFzcyB8fCAnJ1wiPlxuICAgICAgICAgICAgICAgICAgPG1hdC1jaGVja2JveCB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cImNoZWNrYm94SXRlbS5jaGVja2VkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NvbG9yXT1cIm9wdGlvbnM/LmNvbG9yIHx8ICdwcmltYXJ5J1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJjb250cm9sRGlzYWJsZWQgfHwgb3B0aW9ucz8ucmVhZG9ubHlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmFtZV09XCJjaGVja2JveEl0ZW0/Lm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYmx1cik9XCJvcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJ1cGRhdGVWYWx1ZSgpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGVja2JveC1uYW1lXCIgW2lubmVySFRNTF09XCJjaGVja2JveEl0ZW0/Lm5hbWVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L21hdC1jaGVja2JveD5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJvcHRpb25zPy5zaG93RXJyb3JzICYmIG9wdGlvbnM/LmVycm9yTWVzc2FnZVwiXG4gICAgICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmVycm9yTWVzc2FnZVwiPjwvbWF0LWVycm9yPlxuICAgICAgPC9kaXY+YCxcbiAgc3R5bGVzOiBbYFxuICAgICAgLnRpdGxlIHtcbiAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgIH1cblxuICAgICAgLmNoZWNrYm94LWxpc3Qge1xuICAgICAgICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbiAgICAgIH1cblxuICAgICAgLmhvcml6b250YWwtbGlzdCA+IGxpIHtcbiAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICAgICAgICAgIHpvb206IDE7XG4gICAgICB9XG5cbiAgICAgIC5jaGVja2JveC1uYW1lIHtcbiAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgfVxuXG4gICAgICBtYXQtZXJyb3Ige1xuICAgICAgICAgIGZvbnQtc2l6ZTogNzUlO1xuICAgICAgfVxuICBgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxDaGVja2JveGVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbFxuICBjb250cm9sTmFtZTogc3RyaW5nXG4gIGNvbnRyb2xWYWx1ZTogYW55XG4gIGNvbnRyb2xEaXNhYmxlZCA9IGZhbHNlXG4gIGJvdW5kQ29udHJvbCA9IGZhbHNlXG4gIG9wdGlvbnM6IGFueVxuICBob3Jpem9udGFsTGlzdCA9IGZhbHNlXG4gIGZvcm1BcnJheTogQWJzdHJhY3RDb250cm9sXG4gIGNoZWNrYm94TGlzdDogVGl0bGVNYXBJdGVtW10gPSBbXVxuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgZ2V0IGFsbENoZWNrZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tib3hMaXN0LmZpbHRlcih0ID0+IHQuY2hlY2tlZCkubGVuZ3RoID09PSB0aGlzLmNoZWNrYm94TGlzdC5sZW5ndGhcbiAgfVxuXG4gIGdldCBzb21lQ2hlY2tlZCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBjaGVja2VkSXRlbXMgPSB0aGlzLmNoZWNrYm94TGlzdC5maWx0ZXIodCA9PiB0LmNoZWNrZWQpLmxlbmd0aFxuICAgIHJldHVybiBjaGVja2VkSXRlbXMgPiAwICYmIGNoZWNrZWRJdGVtcyA8IHRoaXMuY2hlY2tib3hMaXN0Lmxlbmd0aFxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge31cbiAgICB0aGlzLmhvcml6b250YWxMaXN0ID0gdGhpcy5sYXlvdXROb2RlLnR5cGUgPT09ICdjaGVja2JveGVzLWlubGluZScgfHxcbiAgICAgIHRoaXMubGF5b3V0Tm9kZS50eXBlID09PSAnY2hlY2tib3hidXR0b25zJ1xuICAgIHRoaXMuanNmLmluaXRpYWxpemVDb250cm9sKHRoaXMpXG4gICAgdGhpcy5jaGVja2JveExpc3QgPSBidWlsZFRpdGxlTWFwKFxuICAgICAgdGhpcy5vcHRpb25zLnRpdGxlTWFwIHx8IHRoaXMub3B0aW9ucy5lbnVtTmFtZXMsIHRoaXMub3B0aW9ucy5lbnVtLCB0cnVlXG4gICAgKVxuICAgIGlmICh0aGlzLmJvdW5kQ29udHJvbCkge1xuICAgICAgY29uc3QgZm9ybUFycmF5ID0gdGhpcy5qc2YuZ2V0Rm9ybUNvbnRyb2wodGhpcylcbiAgICAgIGZvciAoY29uc3QgY2hlY2tib3hJdGVtIG9mIHRoaXMuY2hlY2tib3hMaXN0KSB7XG4gICAgICAgIGNoZWNrYm94SXRlbS5jaGVja2VkID0gZm9ybUFycmF5LnZhbHVlLmluY2x1ZGVzKGNoZWNrYm94SXRlbS52YWx1ZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1cGRhdGVWYWx1ZSgpIHtcbiAgICB0aGlzLm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWVcbiAgICBpZiAodGhpcy5ib3VuZENvbnRyb2wpIHtcbiAgICAgIHRoaXMuanNmLnVwZGF0ZUFycmF5Q2hlY2tib3hMaXN0KHRoaXMsIHRoaXMuY2hlY2tib3hMaXN0KVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUFsbFZhbHVlcyhldmVudDogYW55KSB7XG4gICAgdGhpcy5vcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlXG4gICAgdGhpcy5jaGVja2JveExpc3QuZm9yRWFjaCh0ID0+IHQuY2hlY2tlZCA9IGV2ZW50LmNoZWNrZWQpXG4gICAgdGhpcy51cGRhdGVWYWx1ZSgpXG4gIH1cbn1cbiJdfQ==