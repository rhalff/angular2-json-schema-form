import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../services/json-schema-form.service';
export class SectionComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.expanded = true;
    }
    get sectionTitle() {
        return this.options.notitle ? null : this.jsf.setItemTitle(this);
    }
    ngOnInit() {
        this.jsf.initializeControl(this);
        this.options = this.layoutNode.options || {};
        this.expanded = typeof this.options.expanded === 'boolean' ?
            this.options.expanded : !this.options.expandable;
        switch (this.layoutNode.type) {
            case 'fieldset':
            case 'array':
            case 'tab':
            case 'advancedfieldset':
            case 'authfieldset':
            case 'optionfieldset':
            case 'selectfieldset':
                this.containerType = 'fieldset';
                break;
            default:
                this.containerType = 'div';
                break;
        }
    }
    toggleExpanded() {
        if (this.options.expandable) {
            this.expanded = !this.expanded;
        }
    }
    getFlexAttribute(attribute) {
        const flexActive = this.layoutNode.type === 'flex' ||
            !!this.options.displayFlex ||
            this.options.display === 'flex';
        if (attribute !== 'flex' && !flexActive) {
            return null;
        }
        switch (attribute) {
            case 'is-flex':
                return flexActive;
            case 'display':
                return flexActive ? 'flex' : 'initial';
            case 'flex-direction':
            case 'flex-wrap':
                const index = ['flex-direction', 'flex-wrap'].indexOf(attribute);
                return (this.options['flex-flow'] || '').split(/\s+/)[index] ||
                    this.options[attribute] || ['column', 'nowrap'][index];
            case 'justify-content':
            case 'align-items':
            case 'align-content':
                return this.options[attribute];
        }
    }
}
SectionComponent.decorators = [
    { type: Component, args: [{
                selector: 'section-widget',
                template: `
      <div *ngIf="containerType === 'div'"
           [class]="options?.htmlClass || ''"
           [class.expandable]="options?.expandable && !expanded"
           [class.expanded]="options?.expandable && expanded">
          <label *ngIf="sectionTitle"
                 class="legend"
                 [class]="options?.labelHtmlClass || ''"
                 [innerHTML]="sectionTitle"
                 (click)="toggleExpanded()"></label>
          <root-widget *ngIf="expanded"
                       [dataIndex]="dataIndex"
                       [layout]="layoutNode.items"
                       [layoutIndex]="layoutIndex"
                       [isFlexItem]="getFlexAttribute('is-flex')"
                       [isOrderable]="options?.orderable"
                       [class.form-flex-column]="getFlexAttribute('flex-direction') === 'column'"
                       [class.form-flex-row]="getFlexAttribute('flex-direction') === 'row'"
                       [style.align-content]="getFlexAttribute('align-content')"
                       [style.align-items]="getFlexAttribute('align-items')"
                       [style.display]="getFlexAttribute('display')"
                       [style.flex-direction]="getFlexAttribute('flex-direction')"
                       [style.flex-wrap]="getFlexAttribute('flex-wrap')"
                       [style.justify-content]="getFlexAttribute('justify-content')"></root-widget>
      </div>
      <fieldset *ngIf="containerType === 'fieldset'"
                [class]="options?.htmlClass || ''"
                [class.expandable]="options?.expandable && !expanded"
                [class.expanded]="options?.expandable && expanded"
                [disabled]="options?.readonly">
          <legend *ngIf="sectionTitle"
                  class="legend"
                  [class]="options?.labelHtmlClass || ''"
                  [innerHTML]="sectionTitle"
                  (click)="toggleExpanded()"></legend>
          <div *ngIf="options?.messageLocation !== 'bottom'">
              <p *ngIf="options?.description"
                 class="help-block"
                 [class]="options?.labelHelpBlockClass || ''"
                 [innerHTML]="options?.description"></p>
          </div>
          <root-widget *ngIf="expanded"
                       [dataIndex]="dataIndex"
                       [layout]="layoutNode.items"
                       [layoutIndex]="layoutIndex"
                       [isFlexItem]="getFlexAttribute('is-flex')"
                       [isOrderable]="options?.orderable"
                       [class.form-flex-column]="getFlexAttribute('flex-direction') === 'column'"
                       [class.form-flex-row]="getFlexAttribute('flex-direction') === 'row'"
                       [style.align-content]="getFlexAttribute('align-content')"
                       [style.align-items]="getFlexAttribute('align-items')"
                       [style.display]="getFlexAttribute('display')"
                       [style.flex-direction]="getFlexAttribute('flex-direction')"
                       [style.flex-wrap]="getFlexAttribute('flex-wrap')"
                       [style.justify-content]="getFlexAttribute('justify-content')"></root-widget>
          <div *ngIf="options?.messageLocation === 'bottom'">
              <p *ngIf="options?.description"
                 class="help-block"
                 [class]="options?.labelHelpBlockClass || ''"
                 [innerHTML]="options?.description"></p>
          </div>
      </fieldset>`,
                styles: [`
    .legend { font-weight: bold; }
    .expandable > legend:before, .expandable > label:before  { content: '▶'; padding-right: .3em; }
    .expanded > legend:before, .expanded > label:before  { content: '▼'; padding-right: .2em; }
  `]
            }] }
];
SectionComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
SectionComponent.propDecorators = {
    layoutNode: [{ type: Input }],
    layoutIndex: [{ type: Input }],
    dataIndex: [{ type: Input }]
};
if (false) {
    SectionComponent.prototype.options;
    SectionComponent.prototype.expanded;
    SectionComponent.prototype.containerType;
    SectionComponent.prototype.layoutNode;
    SectionComponent.prototype.layoutIndex;
    SectionComponent.prototype.dataIndex;
    SectionComponent.prototype.jsf;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdzZi93aWRnZXQtbGlicmFyeS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3NlY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFBO0FBQ3RELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFBO0FBd0UxRSxNQUFNLE9BQU8sZ0JBQWdCO0lBUTNCLFlBQ1UsR0FBMEI7UUFBMUIsUUFBRyxHQUFILEdBQUcsQ0FBdUI7UUFQcEMsYUFBUSxHQUFHLElBQUksQ0FBQTtJQVNmLENBQUM7SUFFRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2xFLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUE7UUFDbEQsUUFBUSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRTtZQUM1QixLQUFLLFVBQVUsQ0FBQztZQUNoQixLQUFLLE9BQU8sQ0FBQztZQUNiLEtBQUssS0FBSyxDQUFDO1lBQ1gsS0FBSyxrQkFBa0IsQ0FBQztZQUN4QixLQUFLLGNBQWMsQ0FBQztZQUNwQixLQUFLLGdCQUFnQixDQUFDO1lBQ3RCLEtBQUssZ0JBQWdCO2dCQUNuQixJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQTtnQkFDL0IsTUFBSztZQUNQO2dCQUNFLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFBO2dCQUMxQixNQUFLO1NBQ1I7SUFDSCxDQUFDO0lBRUQsY0FBYztRQUNaLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUE7U0FDL0I7SUFDSCxDQUFDO0lBSUQsZ0JBQWdCLENBQUMsU0FBaUI7Y0FDMUIsVUFBVSxHQUNkLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLE1BQU07WUFDL0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVztZQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FBSyxNQUFNO1FBQ2pDLElBQUksU0FBUyxLQUFLLE1BQU0sSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN2QyxPQUFPLElBQUksQ0FBQTtTQUNaO1FBQ0QsUUFBUSxTQUFTLEVBQUU7WUFDakIsS0FBSyxTQUFTO2dCQUNaLE9BQU8sVUFBVSxDQUFBO1lBQ25CLEtBQUssU0FBUztnQkFDWixPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUE7WUFDeEMsS0FBSyxnQkFBZ0IsQ0FBQztZQUN0QixLQUFLLFdBQVc7c0JBQ1IsS0FBSyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztnQkFDaEUsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztvQkFDMUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUMxRCxLQUFLLGlCQUFpQixDQUFDO1lBQ3ZCLEtBQUssYUFBYSxDQUFDO1lBQ25CLEtBQUssZUFBZTtnQkFDbEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1NBQ2pDO0lBQ0gsQ0FBQzs7O1lBM0lGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBNkRNO3lCQUNQOzs7O0dBSVI7YUFDRjs7O1lBdkVPLHFCQUFxQjs7O3lCQTRFMUIsS0FBSzswQkFDTCxLQUFLO3dCQUNMLEtBQUs7OztJQUxOLG1DQUFZO0lBQ1osb0NBQWU7SUFDZix5Q0FBcUI7SUFDckIsc0NBQXdCO0lBQ3hCLHVDQUE4QjtJQUM5QixxQ0FBNEI7SUFHMUIsK0JBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJ1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZWN0aW9uLXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8ZGl2ICpuZ0lmPVwiY29udGFpbmVyVHlwZSA9PT0gJ2RpdidcIlxuICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8uaHRtbENsYXNzIHx8ICcnXCJcbiAgICAgICAgICAgW2NsYXNzLmV4cGFuZGFibGVdPVwib3B0aW9ucz8uZXhwYW5kYWJsZSAmJiAhZXhwYW5kZWRcIlxuICAgICAgICAgICBbY2xhc3MuZXhwYW5kZWRdPVwib3B0aW9ucz8uZXhwYW5kYWJsZSAmJiBleHBhbmRlZFwiPlxuICAgICAgICAgIDxsYWJlbCAqbmdJZj1cInNlY3Rpb25UaXRsZVwiXG4gICAgICAgICAgICAgICAgIGNsYXNzPVwibGVnZW5kXCJcbiAgICAgICAgICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmxhYmVsSHRtbENsYXNzIHx8ICcnXCJcbiAgICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJzZWN0aW9uVGl0bGVcIlxuICAgICAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlRXhwYW5kZWQoKVwiPjwvbGFiZWw+XG4gICAgICAgICAgPHJvb3Qtd2lkZ2V0ICpuZ0lmPVwiZXhwYW5kZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICBbZGF0YUluZGV4XT1cImRhdGFJbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtsYXlvdXRdPVwibGF5b3V0Tm9kZS5pdGVtc1wiXG4gICAgICAgICAgICAgICAgICAgICAgIFtsYXlvdXRJbmRleF09XCJsYXlvdXRJbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtpc0ZsZXhJdGVtXT1cImdldEZsZXhBdHRyaWJ1dGUoJ2lzLWZsZXgnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtpc09yZGVyYWJsZV09XCJvcHRpb25zPy5vcmRlcmFibGVcIlxuICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MuZm9ybS1mbGV4LWNvbHVtbl09XCJnZXRGbGV4QXR0cmlidXRlKCdmbGV4LWRpcmVjdGlvbicpID09PSAnY29sdW1uJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5mb3JtLWZsZXgtcm93XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2ZsZXgtZGlyZWN0aW9uJykgPT09ICdyb3cnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmFsaWduLWNvbnRlbnRdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnYWxpZ24tY29udGVudCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmFsaWduLWl0ZW1zXT1cImdldEZsZXhBdHRyaWJ1dGUoJ2FsaWduLWl0ZW1zJylcIlxuICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuZGlzcGxheV09XCJnZXRGbGV4QXR0cmlidXRlKCdkaXNwbGF5JylcIlxuICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuZmxleC1kaXJlY3Rpb25dPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC1kaXJlY3Rpb24nKVwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5mbGV4LXdyYXBdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC13cmFwJylcIlxuICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuanVzdGlmeS1jb250ZW50XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2p1c3RpZnktY29udGVudCcpXCI+PC9yb290LXdpZGdldD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGZpZWxkc2V0ICpuZ0lmPVwiY29udGFpbmVyVHlwZSA9PT0gJ2ZpZWxkc2V0J1wiXG4gICAgICAgICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/Lmh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgICAgICAgICAgW2NsYXNzLmV4cGFuZGFibGVdPVwib3B0aW9ucz8uZXhwYW5kYWJsZSAmJiAhZXhwYW5kZWRcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5leHBhbmRlZF09XCJvcHRpb25zPy5leHBhbmRhYmxlICYmIGV4cGFuZGVkXCJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwib3B0aW9ucz8ucmVhZG9ubHlcIj5cbiAgICAgICAgICA8bGVnZW5kICpuZ0lmPVwic2VjdGlvblRpdGxlXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwibGVnZW5kXCJcbiAgICAgICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5sYWJlbEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cInNlY3Rpb25UaXRsZVwiXG4gICAgICAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlRXhwYW5kZWQoKVwiPjwvbGVnZW5kPlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJvcHRpb25zPy5tZXNzYWdlTG9jYXRpb24gIT09ICdib3R0b20nXCI+XG4gICAgICAgICAgICAgIDxwICpuZ0lmPVwib3B0aW9ucz8uZGVzY3JpcHRpb25cIlxuICAgICAgICAgICAgICAgICBjbGFzcz1cImhlbHAtYmxvY2tcIlxuICAgICAgICAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8ubGFiZWxIZWxwQmxvY2tDbGFzcyB8fCAnJ1wiXG4gICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZGVzY3JpcHRpb25cIj48L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHJvb3Qtd2lkZ2V0ICpuZ0lmPVwiZXhwYW5kZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICBbZGF0YUluZGV4XT1cImRhdGFJbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtsYXlvdXRdPVwibGF5b3V0Tm9kZS5pdGVtc1wiXG4gICAgICAgICAgICAgICAgICAgICAgIFtsYXlvdXRJbmRleF09XCJsYXlvdXRJbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtpc0ZsZXhJdGVtXT1cImdldEZsZXhBdHRyaWJ1dGUoJ2lzLWZsZXgnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtpc09yZGVyYWJsZV09XCJvcHRpb25zPy5vcmRlcmFibGVcIlxuICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MuZm9ybS1mbGV4LWNvbHVtbl09XCJnZXRGbGV4QXR0cmlidXRlKCdmbGV4LWRpcmVjdGlvbicpID09PSAnY29sdW1uJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5mb3JtLWZsZXgtcm93XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2ZsZXgtZGlyZWN0aW9uJykgPT09ICdyb3cnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmFsaWduLWNvbnRlbnRdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnYWxpZ24tY29udGVudCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmFsaWduLWl0ZW1zXT1cImdldEZsZXhBdHRyaWJ1dGUoJ2FsaWduLWl0ZW1zJylcIlxuICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuZGlzcGxheV09XCJnZXRGbGV4QXR0cmlidXRlKCdkaXNwbGF5JylcIlxuICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuZmxleC1kaXJlY3Rpb25dPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC1kaXJlY3Rpb24nKVwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5mbGV4LXdyYXBdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC13cmFwJylcIlxuICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuanVzdGlmeS1jb250ZW50XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2p1c3RpZnktY29udGVudCcpXCI+PC9yb290LXdpZGdldD5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwib3B0aW9ucz8ubWVzc2FnZUxvY2F0aW9uID09PSAnYm90dG9tJ1wiPlxuICAgICAgICAgICAgICA8cCAqbmdJZj1cIm9wdGlvbnM/LmRlc2NyaXB0aW9uXCJcbiAgICAgICAgICAgICAgICAgY2xhc3M9XCJoZWxwLWJsb2NrXCJcbiAgICAgICAgICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmxhYmVsSGVscEJsb2NrQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmRlc2NyaXB0aW9uXCI+PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPC9maWVsZHNldD5gLFxuICBzdHlsZXM6IFtgXG4gICAgLmxlZ2VuZCB7IGZvbnQtd2VpZ2h0OiBib2xkOyB9XG4gICAgLmV4cGFuZGFibGUgPiBsZWdlbmQ6YmVmb3JlLCAuZXhwYW5kYWJsZSA+IGxhYmVsOmJlZm9yZSAgeyBjb250ZW50OiAn4pa2JzsgcGFkZGluZy1yaWdodDogLjNlbTsgfVxuICAgIC5leHBhbmRlZCA+IGxlZ2VuZDpiZWZvcmUsIC5leHBhbmRlZCA+IGxhYmVsOmJlZm9yZSAgeyBjb250ZW50OiAn4pa8JzsgcGFkZGluZy1yaWdodDogLjJlbTsgfVxuICBgXSxcbn0pXG5leHBvcnQgY2xhc3MgU2VjdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIG9wdGlvbnM6IGFueVxuICBleHBhbmRlZCA9IHRydWVcbiAgY29udGFpbmVyVHlwZTogc3RyaW5nXG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueVxuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW11cbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBnZXQgc2VjdGlvblRpdGxlKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMubm90aXRsZSA/IG51bGwgOiB0aGlzLmpzZi5zZXRJdGVtVGl0bGUodGhpcylcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuanNmLmluaXRpYWxpemVDb250cm9sKHRoaXMpXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge31cbiAgICB0aGlzLmV4cGFuZGVkID0gdHlwZW9mIHRoaXMub3B0aW9ucy5leHBhbmRlZCA9PT0gJ2Jvb2xlYW4nID9cbiAgICAgIHRoaXMub3B0aW9ucy5leHBhbmRlZCA6ICF0aGlzLm9wdGlvbnMuZXhwYW5kYWJsZVxuICAgIHN3aXRjaCAodGhpcy5sYXlvdXROb2RlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2ZpZWxkc2V0JzpcbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgIGNhc2UgJ3RhYic6XG4gICAgICBjYXNlICdhZHZhbmNlZGZpZWxkc2V0JzpcbiAgICAgIGNhc2UgJ2F1dGhmaWVsZHNldCc6XG4gICAgICBjYXNlICdvcHRpb25maWVsZHNldCc6XG4gICAgICBjYXNlICdzZWxlY3RmaWVsZHNldCc6XG4gICAgICAgIHRoaXMuY29udGFpbmVyVHlwZSA9ICdmaWVsZHNldCdcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6IC8vICdkaXYnLCAnZmxleCcsICdzZWN0aW9uJywgJ2NvbmRpdGlvbmFsJywgJ2FjdGlvbnMnLCAndGFnc2lucHV0J1xuICAgICAgICB0aGlzLmNvbnRhaW5lclR5cGUgPSAnZGl2J1xuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZUV4cGFuZGVkKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZXhwYW5kYWJsZSkge1xuICAgICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkXG4gICAgfVxuICB9XG5cbiAgLy8gU2V0IGF0dHJpYnV0ZXMgZm9yIGZsZXhib3ggY29udGFpbmVyXG4gIC8vIChjaGlsZCBhdHRyaWJ1dGVzIGFyZSBzZXQgaW4gcm9vdC5jb21wb25lbnQpXG4gIGdldEZsZXhBdHRyaWJ1dGUoYXR0cmlidXRlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBmbGV4QWN0aXZlOiBib29sZWFuID1cbiAgICAgIHRoaXMubGF5b3V0Tm9kZS50eXBlID09PSAnZmxleCcgfHxcbiAgICAgICEhdGhpcy5vcHRpb25zLmRpc3BsYXlGbGV4IHx8XG4gICAgICB0aGlzLm9wdGlvbnMuZGlzcGxheSA9PT0gJ2ZsZXgnXG4gICAgaWYgKGF0dHJpYnV0ZSAhPT0gJ2ZsZXgnICYmICFmbGV4QWN0aXZlKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBzd2l0Y2ggKGF0dHJpYnV0ZSkge1xuICAgICAgY2FzZSAnaXMtZmxleCc6XG4gICAgICAgIHJldHVybiBmbGV4QWN0aXZlXG4gICAgICBjYXNlICdkaXNwbGF5JzpcbiAgICAgICAgcmV0dXJuIGZsZXhBY3RpdmUgPyAnZmxleCcgOiAnaW5pdGlhbCdcbiAgICAgIGNhc2UgJ2ZsZXgtZGlyZWN0aW9uJzpcbiAgICAgIGNhc2UgJ2ZsZXgtd3JhcCc6XG4gICAgICAgIGNvbnN0IGluZGV4ID0gWydmbGV4LWRpcmVjdGlvbicsICdmbGV4LXdyYXAnXS5pbmRleE9mKGF0dHJpYnV0ZSlcbiAgICAgICAgcmV0dXJuICh0aGlzLm9wdGlvbnNbJ2ZsZXgtZmxvdyddIHx8ICcnKS5zcGxpdCgvXFxzKy8pW2luZGV4XSB8fFxuICAgICAgICAgIHRoaXMub3B0aW9uc1thdHRyaWJ1dGVdIHx8IFsnY29sdW1uJywgJ25vd3JhcCddW2luZGV4XVxuICAgICAgY2FzZSAnanVzdGlmeS1jb250ZW50JzpcbiAgICAgIGNhc2UgJ2FsaWduLWl0ZW1zJzpcbiAgICAgIGNhc2UgJ2FsaWduLWNvbnRlbnQnOlxuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zW2F0dHJpYnV0ZV1cbiAgICB9XG4gIH1cbn1cbiJdfQ==