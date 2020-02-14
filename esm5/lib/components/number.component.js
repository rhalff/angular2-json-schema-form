import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
var NumberComponent = (function () {
    function NumberComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.allowNegative = true;
        this.allowDecimal = true;
        this.allowExponents = false;
        this.lastValidNumber = '';
    }
    NumberComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (this.layoutNode.dataType === 'integer') {
            this.allowDecimal = false;
        }
    };
    NumberComponent.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    NumberComponent.decorators = [
        { type: Component, args: [{
                    selector: 'number-widget',
                    template: "\n      <div [class]=\"options?.htmlClass || ''\">\n          <label *ngIf=\"options?.title\"\n                 [attr.for]=\"'control' + layoutNode?._id\"\n                 [class]=\"options?.labelHtmlClass || ''\"\n                 [style.display]=\"options?.notitle ? 'none' : ''\"\n                 [innerHTML]=\"options?.title\"></label>\n          <input *ngIf=\"boundControl\"\n                 [formControl]=\"formControl\"\n                 [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                 [attr.max]=\"options?.maximum\"\n                 [attr.min]=\"options?.minimum\"\n                 [attr.placeholder]=\"options?.placeholder\"\n                 [attr.required]=\"options?.required\"\n                 [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n                 [attr.step]=\"options?.multipleOf || options?.step || 'any'\"\n                 [class]=\"options?.fieldHtmlClass || ''\"\n                 [id]=\"'control' + layoutNode?._id\"\n                 [name]=\"controlName\"\n                 [readonly]=\"options?.readonly ? 'readonly' : null\"\n                 [title]=\"lastValidNumber\"\n                 [type]=\"layoutNode?.type === 'range' ? 'range' : 'number'\">\n          <input *ngIf=\"!boundControl\"\n                 [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n                 [attr.max]=\"options?.maximum\"\n                 [attr.min]=\"options?.minimum\"\n                 [attr.placeholder]=\"options?.placeholder\"\n                 [attr.required]=\"options?.required\"\n                 [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n                 [attr.step]=\"options?.multipleOf || options?.step || 'any'\"\n                 [class]=\"options?.fieldHtmlClass || ''\"\n                 [disabled]=\"controlDisabled\"\n                 [id]=\"'control' + layoutNode?._id\"\n                 [name]=\"controlName\"\n                 [readonly]=\"options?.readonly ? 'readonly' : null\"\n                 [title]=\"lastValidNumber\"\n                 [type]=\"layoutNode?.type === 'range' ? 'range' : 'number'\"\n                 [value]=\"controlValue\"\n                 (input)=\"updateValue($event)\">\n          <span *ngIf=\"layoutNode?.type === 'range'\" [innerHTML]=\"controlValue\"></span>\n      </div>"
                }] }
    ];
    NumberComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    NumberComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return NumberComponent;
}());
export { NumberComponent };
if (false) {
    NumberComponent.prototype.formControl;
    NumberComponent.prototype.controlName;
    NumberComponent.prototype.controlValue;
    NumberComponent.prototype.controlDisabled;
    NumberComponent.prototype.boundControl;
    NumberComponent.prototype.options;
    NumberComponent.prototype.allowNegative;
    NumberComponent.prototype.allowDecimal;
    NumberComponent.prototype.allowExponents;
    NumberComponent.prototype.lastValidNumber;
    NumberComponent.prototype.layoutNode;
    NumberComponent.prototype.layoutIndex;
    NumberComponent.prototype.dataIndex;
    NumberComponent.prototype.jsf;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL3dpZGdldC1saWJyYXJ5LyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbnVtYmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQTtBQUV0RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQTtBQUUxRTtJQTJERSx5QkFDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQVpwQyxvQkFBZSxHQUFHLEtBQUssQ0FBQTtRQUN2QixpQkFBWSxHQUFHLEtBQUssQ0FBQTtRQUVwQixrQkFBYSxHQUFHLElBQUksQ0FBQTtRQUNwQixpQkFBWSxHQUFHLElBQUksQ0FBQTtRQUNuQixtQkFBYyxHQUFHLEtBQUssQ0FBQTtRQUN0QixvQkFBZSxHQUFHLEVBQUUsQ0FBQTtJQVFwQixDQUFDO0lBRUQsa0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFBO1FBQzVDLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDaEMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDMUMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUE7U0FDMUI7SUFDSCxDQUFDO0lBRUQscUNBQVcsR0FBWCxVQUFZLEtBQUs7UUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNoRCxDQUFDOztnQkExRUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUUsMnlFQXdDQztpQkFDWjs7O2dCQTdDTyxxQkFBcUI7Ozs2QkF5RDFCLEtBQUs7OEJBQ0wsS0FBSzs0QkFDTCxLQUFLOztJQWtCUixzQkFBQztDQUFBLEFBM0VELElBMkVDO1NBL0JZLGVBQWU7O0lBQzFCLHNDQUE0QjtJQUM1QixzQ0FBbUI7SUFDbkIsdUNBQWlCO0lBQ2pCLDBDQUF1QjtJQUN2Qix1Q0FBb0I7SUFDcEIsa0NBQVk7SUFDWix3Q0FBb0I7SUFDcEIsdUNBQW1CO0lBQ25CLHlDQUFzQjtJQUN0QiwwQ0FBb0I7SUFDcEIscUNBQXdCO0lBQ3hCLHNDQUE4QjtJQUM5QixvQ0FBNEI7SUFHMUIsOEJBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJ1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdudW1iZXItd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxkaXYgW2NsYXNzXT1cIm9wdGlvbnM/Lmh0bWxDbGFzcyB8fCAnJ1wiPlxuICAgICAgICAgIDxsYWJlbCAqbmdJZj1cIm9wdGlvbnM/LnRpdGxlXCJcbiAgICAgICAgICAgICAgICAgW2F0dHIuZm9yXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5sYWJlbEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgICAgICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cIm9wdGlvbnM/Lm5vdGl0bGUgPyAnbm9uZScgOiAnJ1wiXG4gICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8udGl0bGVcIj48L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCAqbmdJZj1cImJvdW5kQ29udHJvbFwiXG4gICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiXG4gICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ1N0YXR1cydcIlxuICAgICAgICAgICAgICAgICBbYXR0ci5tYXhdPVwib3B0aW9ucz8ubWF4aW11bVwiXG4gICAgICAgICAgICAgICAgIFthdHRyLm1pbl09XCJvcHRpb25zPy5taW5pbXVtXCJcbiAgICAgICAgICAgICAgICAgW2F0dHIucGxhY2Vob2xkZXJdPVwib3B0aW9ucz8ucGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgICAgICBbYXR0ci5yZXF1aXJlZF09XCJvcHRpb25zPy5yZXF1aXJlZFwiXG4gICAgICAgICAgICAgICAgIFthdHRyLnJlYWRvbmx5XT1cIm9wdGlvbnM/LnJlYWRvbmx5ID8gJ3JlYWRvbmx5JyA6IG51bGxcIlxuICAgICAgICAgICAgICAgICBbYXR0ci5zdGVwXT1cIm9wdGlvbnM/Lm11bHRpcGxlT2YgfHwgb3B0aW9ucz8uc3RlcCB8fCAnYW55J1wiXG4gICAgICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5maWVsZEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgICAgICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICAgICAgICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICAgICAgICAgICAgIFtyZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgW3RpdGxlXT1cImxhc3RWYWxpZE51bWJlclwiXG4gICAgICAgICAgICAgICAgIFt0eXBlXT1cImxheW91dE5vZGU/LnR5cGUgPT09ICdyYW5nZScgPyAncmFuZ2UnIDogJ251bWJlcidcIj5cbiAgICAgICAgICA8aW5wdXQgKm5nSWY9XCIhYm91bmRDb250cm9sXCJcbiAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnU3RhdHVzJ1wiXG4gICAgICAgICAgICAgICAgIFthdHRyLm1heF09XCJvcHRpb25zPy5tYXhpbXVtXCJcbiAgICAgICAgICAgICAgICAgW2F0dHIubWluXT1cIm9wdGlvbnM/Lm1pbmltdW1cIlxuICAgICAgICAgICAgICAgICBbYXR0ci5wbGFjZWhvbGRlcl09XCJvcHRpb25zPy5wbGFjZWhvbGRlclwiXG4gICAgICAgICAgICAgICAgIFthdHRyLnJlcXVpcmVkXT1cIm9wdGlvbnM/LnJlcXVpcmVkXCJcbiAgICAgICAgICAgICAgICAgW2F0dHIucmVhZG9ubHldPVwib3B0aW9ucz8ucmVhZG9ubHkgPyAncmVhZG9ubHknIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgIFthdHRyLnN0ZXBdPVwib3B0aW9ucz8ubXVsdGlwbGVPZiB8fCBvcHRpb25zPy5zdGVwIHx8ICdhbnknXCJcbiAgICAgICAgICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmZpZWxkSHRtbENsYXNzIHx8ICcnXCJcbiAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImNvbnRyb2xEaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICAgICAgICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICAgICAgICAgICAgIFtyZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgW3RpdGxlXT1cImxhc3RWYWxpZE51bWJlclwiXG4gICAgICAgICAgICAgICAgIFt0eXBlXT1cImxheW91dE5vZGU/LnR5cGUgPT09ICdyYW5nZScgPyAncmFuZ2UnIDogJ251bWJlcidcIlxuICAgICAgICAgICAgICAgICBbdmFsdWVdPVwiY29udHJvbFZhbHVlXCJcbiAgICAgICAgICAgICAgICAgKGlucHV0KT1cInVwZGF0ZVZhbHVlKCRldmVudClcIj5cbiAgICAgICAgICA8c3BhbiAqbmdJZj1cImxheW91dE5vZGU/LnR5cGUgPT09ICdyYW5nZSdcIiBbaW5uZXJIVE1MXT1cImNvbnRyb2xWYWx1ZVwiPjwvc3Bhbj5cbiAgICAgIDwvZGl2PmAsXG59KVxuZXhwb3J0IGNsYXNzIE51bWJlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2xcbiAgY29udHJvbE5hbWU6IHN0cmluZ1xuICBjb250cm9sVmFsdWU6IGFueVxuICBjb250cm9sRGlzYWJsZWQgPSBmYWxzZVxuICBib3VuZENvbnRyb2wgPSBmYWxzZVxuICBvcHRpb25zOiBhbnlcbiAgYWxsb3dOZWdhdGl2ZSA9IHRydWVcbiAgYWxsb3dEZWNpbWFsID0gdHJ1ZVxuICBhbGxvd0V4cG9uZW50cyA9IGZhbHNlXG4gIGxhc3RWYWxpZE51bWJlciA9ICcnXG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmxheW91dE5vZGUub3B0aW9ucyB8fCB7fVxuICAgIHRoaXMuanNmLmluaXRpYWxpemVDb250cm9sKHRoaXMpXG4gICAgaWYgKHRoaXMubGF5b3V0Tm9kZS5kYXRhVHlwZSA9PT0gJ2ludGVnZXInKSB7XG4gICAgICB0aGlzLmFsbG93RGVjaW1hbCA9IGZhbHNlXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlVmFsdWUoZXZlbnQpIHtcbiAgICB0aGlzLmpzZi51cGRhdGVWYWx1ZSh0aGlzLCBldmVudC50YXJnZXQudmFsdWUpXG4gIH1cbn1cbiJdfQ==