import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
var AddReferenceComponent = (function () {
    function AddReferenceComponent(jsf) {
        this.jsf = jsf;
    }
    Object.defineProperty(AddReferenceComponent.prototype, "showAddButton", {
        get: function () {
            return !this.layoutNode.arrayItem ||
                this.layoutIndex[this.layoutIndex.length - 1] < this.options.maxItems;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddReferenceComponent.prototype, "buttonText", {
        get: function () {
            var parent = {
                dataIndex: this.dataIndex.slice(0, -1),
                layoutIndex: this.layoutIndex.slice(0, -1),
                layoutNode: this.jsf.getParentNode(this)
            };
            return parent.layoutNode.add ||
                this.jsf.setArrayItemTitle(parent, this.layoutNode, this.itemCount);
        },
        enumerable: true,
        configurable: true
    });
    AddReferenceComponent.prototype.ngOnInit = function () {
        this.options = this.layoutNode.options || {};
    };
    AddReferenceComponent.prototype.addItem = function (event) {
        event.preventDefault();
        this.jsf.addItem(this);
    };
    AddReferenceComponent.decorators = [
        { type: Component, args: [{
                    selector: 'add-reference-widget',
                    template: "\n      <button *ngIf=\"showAddButton\"\n              [class]=\"options?.fieldHtmlClass || ''\"\n              [disabled]=\"options?.readonly\"\n              (click)=\"addItem($event)\">\n          <span *ngIf=\"options?.icon\" [class]=\"options?.icon\"></span>\n          <span *ngIf=\"options?.title\" [innerHTML]=\"buttonText\"></span>\n      </button>",
                    changeDetection: ChangeDetectionStrategy.Default
                }] }
    ];
    AddReferenceComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    AddReferenceComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return AddReferenceComponent;
}());
export { AddReferenceComponent };
if (false) {
    AddReferenceComponent.prototype.options;
    AddReferenceComponent.prototype.itemCount;
    AddReferenceComponent.prototype.previousLayoutIndex;
    AddReferenceComponent.prototype.previousDataIndex;
    AddReferenceComponent.prototype.layoutNode;
    AddReferenceComponent.prototype.layoutIndex;
    AddReferenceComponent.prototype.dataIndex;
    AddReferenceComponent.prototype.jsf;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXJlZmVyZW5jZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdzZi93aWRnZXQtbGlicmFyeS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2FkZC1yZWZlcmVuY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFBO0FBQy9FLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFBO0FBRTFFO0lBcUJFLCtCQUNVLEdBQTBCO1FBQTFCLFFBQUcsR0FBSCxHQUFHLENBQXVCO0lBRXBDLENBQUM7SUFFRCxzQkFBSSxnREFBYTthQUFqQjtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVM7Z0JBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUE7UUFDekUsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSw2Q0FBVTthQUFkO2dCQUNRLE1BQU0sR0FBUTtnQkFDbEIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdEMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDMUMsVUFBVSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzthQUN6QztZQUNELE9BQU8sTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHO2dCQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUN2RSxDQUFDOzs7T0FBQTtJQUVELHdDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQTtJQUM5QyxDQUFDO0lBRUQsdUNBQU8sR0FBUCxVQUFRLEtBQUs7UUFDWCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDeEIsQ0FBQzs7Z0JBaERGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUsdVdBT0k7b0JBQ2QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87aUJBQ2pEOzs7Z0JBYk8scUJBQXFCOzs7NkJBbUIxQixLQUFLOzhCQUNMLEtBQUs7NEJBQ0wsS0FBSzs7SUE4QlIsNEJBQUM7Q0FBQSxBQWpERCxJQWlEQztTQXJDWSxxQkFBcUI7O0lBQ2hDLHdDQUFZO0lBQ1osMENBQWlCO0lBQ2pCLG9EQUE2QjtJQUM3QixrREFBMkI7SUFDM0IsMkNBQXdCO0lBQ3hCLDRDQUE4QjtJQUM5QiwwQ0FBNEI7SUFHMUIsb0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtKc29uU2NoZW1hRm9ybVNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWRkLXJlZmVyZW5jZS13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPGJ1dHRvbiAqbmdJZj1cInNob3dBZGRCdXR0b25cIlxuICAgICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8uZmllbGRIdG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwib3B0aW9ucz8ucmVhZG9ubHlcIlxuICAgICAgICAgICAgICAoY2xpY2spPVwiYWRkSXRlbSgkZXZlbnQpXCI+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJvcHRpb25zPy5pY29uXCIgW2NsYXNzXT1cIm9wdGlvbnM/Lmljb25cIj48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJvcHRpb25zPy50aXRsZVwiIFtpbm5lckhUTUxdPVwiYnV0dG9uVGV4dFwiPjwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPmAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbn0pXG5leHBvcnQgY2xhc3MgQWRkUmVmZXJlbmNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgb3B0aW9uczogYW55XG4gIGl0ZW1Db3VudDogbnVtYmVyXG4gIHByZXZpb3VzTGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIHByZXZpb3VzRGF0YUluZGV4OiBudW1iZXJbXVxuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgZ2V0IHNob3dBZGRCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmxheW91dE5vZGUuYXJyYXlJdGVtIHx8XG4gICAgICB0aGlzLmxheW91dEluZGV4W3RoaXMubGF5b3V0SW5kZXgubGVuZ3RoIC0gMV0gPCB0aGlzLm9wdGlvbnMubWF4SXRlbXNcbiAgfVxuXG4gIGdldCBidXR0b25UZXh0KCk6IHN0cmluZyB7XG4gICAgY29uc3QgcGFyZW50OiBhbnkgPSB7XG4gICAgICBkYXRhSW5kZXg6IHRoaXMuZGF0YUluZGV4LnNsaWNlKDAsIC0xKSxcbiAgICAgIGxheW91dEluZGV4OiB0aGlzLmxheW91dEluZGV4LnNsaWNlKDAsIC0xKSxcbiAgICAgIGxheW91dE5vZGU6IHRoaXMuanNmLmdldFBhcmVudE5vZGUodGhpcylcbiAgICB9XG4gICAgcmV0dXJuIHBhcmVudC5sYXlvdXROb2RlLmFkZCB8fFxuICAgICAgdGhpcy5qc2Yuc2V0QXJyYXlJdGVtVGl0bGUocGFyZW50LCB0aGlzLmxheW91dE5vZGUsIHRoaXMuaXRlbUNvdW50KVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge31cbiAgfVxuXG4gIGFkZEl0ZW0oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgdGhpcy5qc2YuYWRkSXRlbSh0aGlzKVxuICB9XG59XG4iXX0=