import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
export class FlexLayoutSectionComponent {
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.expanded = true;
        this.containerType = 'div';
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
            case 'section':
            case 'array':
            case 'fieldset':
            case 'advancedfieldset':
            case 'authfieldset':
            case 'optionfieldset':
            case 'selectfieldset':
                this.containerType = 'fieldset';
                break;
            case 'card':
                this.containerType = 'card';
                break;
            case 'expansion-panel':
                this.containerType = 'expansion-panel';
                break;
            default:// 'div', 'flex', 'tab', 'conditional', 'actions'
                this.containerType = 'div';
        }
    }
    toggleExpanded() {
        if (this.options.expandable) {
            this.expanded = !this.expanded;
        }
    }
    // Set attributes for flexbox container
    // (child attributes are set in flex-layout-root.component)
    getFlexAttribute(attribute) {
        const flexActive = this.layoutNode.type === 'flex' ||
            !!this.options.displayFlex ||
            this.options.display === 'flex';
        // if (attribute !== 'flex' && !flexActive) { return null; }
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
            case 'layout':
                return (this.options.fxLayout || 'row') +
                    this.options.fxLayoutWrap ? ' ' + this.options.fxLayoutWrap : '';
        }
    }
}
FlexLayoutSectionComponent.decorators = [
    { type: Component, args: [{
                selector: 'flex-layout-section-widget',
                template: `
    <div *ngIf="containerType === 'div'"
      [class]="options?.htmlClass || ''"
      [class.expandable]="options?.expandable && !expanded"
      [class.expanded]="options?.expandable && expanded">
      <label *ngIf="sectionTitle"
        [class]="'legend ' + (options?.labelHtmlClass || '')"
        [innerHTML]="sectionTitle"
        (click)="toggleExpanded()"></label>
      <flex-layout-root-widget *ngIf="expanded"
        [layout]="layoutNode.items"
        [dataIndex]="dataIndex"
        [layoutIndex]="layoutIndex"
        [isFlexItem]="getFlexAttribute('is-flex')"
        [class.form-flex-column]="getFlexAttribute('flex-direction') === 'column'"
        [class.form-flex-row]="getFlexAttribute('flex-direction') === 'row'"
        [style.display]="getFlexAttribute('display')"
        [style.flex-direction]="getFlexAttribute('flex-direction')"
        [style.flex-wrap]="getFlexAttribute('flex-wrap')"
        [style.justify-content]="getFlexAttribute('justify-content')"
        [style.align-items]="getFlexAttribute('align-items')"
        [style.align-content]="getFlexAttribute('align-content')"
        [fxLayout]="getFlexAttribute('layout')"
        [fxLayoutGap]="options?.fxLayoutGap"
        [fxLayoutAlign]="options?.fxLayoutAlign"
        [attr.fxFlexFill]="options?.fxLayoutAlign"></flex-layout-root-widget>
      <mat-error *ngIf="options?.showErrors && options?.errorMessage"
        [innerHTML]="options?.errorMessage"></mat-error>
    </div>

    <fieldset *ngIf="containerType === 'fieldset'"
      [class]="options?.htmlClass || ''"
      [class.expandable]="options?.expandable && !expanded"
      [class.expanded]="options?.expandable && expanded"
      [disabled]="options?.readonly">
      <legend *ngIf="sectionTitle"
        [class]="'legend ' + (options?.labelHtmlClass || '')"
        [innerHTML]="sectionTitle"
        (click)="toggleExpanded()"></legend>
      <flex-layout-root-widget *ngIf="expanded"
        [layout]="layoutNode.items"
        [dataIndex]="dataIndex"
        [layoutIndex]="layoutIndex"
        [isFlexItem]="getFlexAttribute('is-flex')"
        [class.form-flex-column]="getFlexAttribute('flex-direction') === 'column'"
        [class.form-flex-row]="getFlexAttribute('flex-direction') === 'row'"
        [style.display]="getFlexAttribute('display')"
        [style.flex-direction]="getFlexAttribute('flex-direction')"
        [style.flex-wrap]="getFlexAttribute('flex-wrap')"
        [style.justify-content]="getFlexAttribute('justify-content')"
        [style.align-items]="getFlexAttribute('align-items')"
        [style.align-content]="getFlexAttribute('align-content')"
        [fxLayout]="getFlexAttribute('layout')"
        [fxLayoutGap]="options?.fxLayoutGap"
        [fxLayoutAlign]="options?.fxLayoutAlign"
        [attr.fxFlexFill]="options?.fxLayoutAlign"></flex-layout-root-widget>
      <mat-error *ngIf="options?.showErrors && options?.errorMessage"
        [innerHTML]="options?.errorMessage"></mat-error>
    </fieldset>

    <mat-card *ngIf="containerType === 'card'"
      [class]="options?.htmlClass || ''"
      [class.expandable]="options?.expandable && !expanded"
      [class.expanded]="options?.expandable && expanded">
      <mat-card-header *ngIf="sectionTitle">
        <legend
          [class]="'legend ' + (options?.labelHtmlClass || '')"
          [innerHTML]="sectionTitle"
          (click)="toggleExpanded()"></legend>
      </mat-card-header>
      <mat-card-content *ngIf="expanded">
        <fieldset [disabled]="options?.readonly">
          <flex-layout-root-widget *ngIf="expanded"
            [layout]="layoutNode.items"
            [dataIndex]="dataIndex"
            [layoutIndex]="layoutIndex"
            [isFlexItem]="getFlexAttribute('is-flex')"
            [class.form-flex-column]="getFlexAttribute('flex-direction') === 'column'"
            [class.form-flex-row]="getFlexAttribute('flex-direction') === 'row'"
            [style.display]="getFlexAttribute('display')"
            [style.flex-direction]="getFlexAttribute('flex-direction')"
            [style.flex-wrap]="getFlexAttribute('flex-wrap')"
            [style.justify-content]="getFlexAttribute('justify-content')"
            [style.align-items]="getFlexAttribute('align-items')"
            [style.align-content]="getFlexAttribute('align-content')"
            [fxLayout]="getFlexAttribute('layout')"
            [fxLayoutGap]="options?.fxLayoutGap"
            [fxLayoutAlign]="options?.fxLayoutAlign"
            [attr.fxFlexFill]="options?.fxLayoutAlign"></flex-layout-root-widget>
          </fieldset>
      </mat-card-content>
      <mat-card-footer>
        <mat-error *ngIf="options?.showErrors && options?.errorMessage"
          [innerHTML]="options?.errorMessage"></mat-error>
      </mat-card-footer>
    </mat-card>

    <mat-expansion-panel *ngIf="containerType === 'expansion-panel'"
      [expanded]="expanded"
      [hideToggle]="!options?.expandable">
      <mat-expansion-panel-header>
        <mat-panel-title>
          <legend *ngIf="sectionTitle"
            [class]="options?.labelHtmlClass"
            [innerHTML]="sectionTitle"
            (click)="toggleExpanded()"></legend>
        </mat-panel-title>
      </mat-expansion-panel-header>
      <fieldset [disabled]="options?.readonly">
        <flex-layout-root-widget *ngIf="expanded"
          [layout]="layoutNode.items"
          [dataIndex]="dataIndex"
          [layoutIndex]="layoutIndex"
          [isFlexItem]="getFlexAttribute('is-flex')"
          [class.form-flex-column]="getFlexAttribute('flex-direction') === 'column'"
          [class.form-flex-row]="getFlexAttribute('flex-direction') === 'row'"
          [style.display]="getFlexAttribute('display')"
          [style.flex-direction]="getFlexAttribute('flex-direction')"
          [style.flex-wrap]="getFlexAttribute('flex-wrap')"
          [style.justify-content]="getFlexAttribute('justify-content')"
          [style.align-items]="getFlexAttribute('align-items')"
          [style.align-content]="getFlexAttribute('align-content')"
          [fxLayout]="getFlexAttribute('layout')"
          [fxLayoutGap]="options?.fxLayoutGap"
          [fxLayoutAlign]="options?.fxLayoutAlign"
          [attr.fxFlexFill]="options?.fxLayoutAlign"></flex-layout-root-widget>
      </fieldset>
      <mat-error *ngIf="options?.showErrors && options?.errorMessage"
        [innerHTML]="options?.errorMessage"></mat-error>
    </mat-expansion-panel>`,
                styles: [`
    fieldset { border: 0; margin: 0; padding: 0; }
    .legend { font-weight: bold; }
    .expandable > .legend:before { content: '▶'; padding-right: .3em; }
    .expanded > .legend:before { content: '▼'; padding-right: .2em; }
  `],
            },] },
];
/** @nocollapse */
FlexLayoutSectionComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
FlexLayoutSectionComponent.propDecorators = {
    layoutNode: [{ type: Input }],
    layoutIndex: [{ type: Input }],
    dataIndex: [{ type: Input }]
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleC1sYXlvdXQtc2VjdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsic3JjL2ZyYW1ld29yay1saWJyYXJ5L21hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsvZmxleC1sYXlvdXQtc2VjdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFJekQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUE2SXZFLE1BQU07SUFhSixZQUNVLEdBQTBCO1FBQTFCLFFBQUcsR0FBSCxHQUFHLENBQXVCO1FBVnBDLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXJCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7SUFPbEIsQ0FBQztJQUVMLElBQUksWUFBWTtRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxP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Ozs7Ozs7Ozs7Ozs7Ozs7OzJCQWlJZTtnQkFDekIsTUFBTSxFQUFFLENBQUM7Ozs7O0dBS1IsQ0FBQzthQUNIOzs7O1lBNUlRLHFCQUFxQjs7O3lCQXNKM0IsS0FBSzswQkFDTCxLQUFLO3dCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgdG9UaXRsZUNhc2UgfSBmcm9tICcuLi8uLi9zaGFyZWQnO1xuaW1wb3J0IHsgSnNvblNjaGVtYUZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmxleC1sYXlvdXQtc2VjdGlvbi13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgKm5nSWY9XCJjb250YWluZXJUeXBlID09PSAnZGl2J1wiXG4gICAgICBbY2xhc3NdPVwib3B0aW9ucz8uaHRtbENsYXNzIHx8ICcnXCJcbiAgICAgIFtjbGFzcy5leHBhbmRhYmxlXT1cIm9wdGlvbnM/LmV4cGFuZGFibGUgJiYgIWV4cGFuZGVkXCJcbiAgICAgIFtjbGFzcy5leHBhbmRlZF09XCJvcHRpb25zPy5leHBhbmRhYmxlICYmIGV4cGFuZGVkXCI+XG4gICAgICA8bGFiZWwgKm5nSWY9XCJzZWN0aW9uVGl0bGVcIlxuICAgICAgICBbY2xhc3NdPVwiJ2xlZ2VuZCAnICsgKG9wdGlvbnM/LmxhYmVsSHRtbENsYXNzIHx8ICcnKVwiXG4gICAgICAgIFtpbm5lckhUTUxdPVwic2VjdGlvblRpdGxlXCJcbiAgICAgICAgKGNsaWNrKT1cInRvZ2dsZUV4cGFuZGVkKClcIj48L2xhYmVsPlxuICAgICAgPGZsZXgtbGF5b3V0LXJvb3Qtd2lkZ2V0ICpuZ0lmPVwiZXhwYW5kZWRcIlxuICAgICAgICBbbGF5b3V0XT1cImxheW91dE5vZGUuaXRlbXNcIlxuICAgICAgICBbZGF0YUluZGV4XT1cImRhdGFJbmRleFwiXG4gICAgICAgIFtsYXlvdXRJbmRleF09XCJsYXlvdXRJbmRleFwiXG4gICAgICAgIFtpc0ZsZXhJdGVtXT1cImdldEZsZXhBdHRyaWJ1dGUoJ2lzLWZsZXgnKVwiXG4gICAgICAgIFtjbGFzcy5mb3JtLWZsZXgtY29sdW1uXT1cImdldEZsZXhBdHRyaWJ1dGUoJ2ZsZXgtZGlyZWN0aW9uJykgPT09ICdjb2x1bW4nXCJcbiAgICAgICAgW2NsYXNzLmZvcm0tZmxleC1yb3ddPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC1kaXJlY3Rpb24nKSA9PT0gJ3JvdydcIlxuICAgICAgICBbc3R5bGUuZGlzcGxheV09XCJnZXRGbGV4QXR0cmlidXRlKCdkaXNwbGF5JylcIlxuICAgICAgICBbc3R5bGUuZmxleC1kaXJlY3Rpb25dPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC1kaXJlY3Rpb24nKVwiXG4gICAgICAgIFtzdHlsZS5mbGV4LXdyYXBdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC13cmFwJylcIlxuICAgICAgICBbc3R5bGUuanVzdGlmeS1jb250ZW50XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2p1c3RpZnktY29udGVudCcpXCJcbiAgICAgICAgW3N0eWxlLmFsaWduLWl0ZW1zXT1cImdldEZsZXhBdHRyaWJ1dGUoJ2FsaWduLWl0ZW1zJylcIlxuICAgICAgICBbc3R5bGUuYWxpZ24tY29udGVudF09XCJnZXRGbGV4QXR0cmlidXRlKCdhbGlnbi1jb250ZW50JylcIlxuICAgICAgICBbZnhMYXlvdXRdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnbGF5b3V0JylcIlxuICAgICAgICBbZnhMYXlvdXRHYXBdPVwib3B0aW9ucz8uZnhMYXlvdXRHYXBcIlxuICAgICAgICBbZnhMYXlvdXRBbGlnbl09XCJvcHRpb25zPy5meExheW91dEFsaWduXCJcbiAgICAgICAgW2F0dHIuZnhGbGV4RmlsbF09XCJvcHRpb25zPy5meExheW91dEFsaWduXCI+PC9mbGV4LWxheW91dC1yb290LXdpZGdldD5cbiAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJvcHRpb25zPy5zaG93RXJyb3JzICYmIG9wdGlvbnM/LmVycm9yTWVzc2FnZVwiXG4gICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZXJyb3JNZXNzYWdlXCI+PC9tYXQtZXJyb3I+XG4gICAgPC9kaXY+XG5cbiAgICA8ZmllbGRzZXQgKm5nSWY9XCJjb250YWluZXJUeXBlID09PSAnZmllbGRzZXQnXCJcbiAgICAgIFtjbGFzc109XCJvcHRpb25zPy5odG1sQ2xhc3MgfHwgJydcIlxuICAgICAgW2NsYXNzLmV4cGFuZGFibGVdPVwib3B0aW9ucz8uZXhwYW5kYWJsZSAmJiAhZXhwYW5kZWRcIlxuICAgICAgW2NsYXNzLmV4cGFuZGVkXT1cIm9wdGlvbnM/LmV4cGFuZGFibGUgJiYgZXhwYW5kZWRcIlxuICAgICAgW2Rpc2FibGVkXT1cIm9wdGlvbnM/LnJlYWRvbmx5XCI+XG4gICAgICA8bGVnZW5kICpuZ0lmPVwic2VjdGlvblRpdGxlXCJcbiAgICAgICAgW2NsYXNzXT1cIidsZWdlbmQgJyArIChvcHRpb25zPy5sYWJlbEh0bWxDbGFzcyB8fCAnJylcIlxuICAgICAgICBbaW5uZXJIVE1MXT1cInNlY3Rpb25UaXRsZVwiXG4gICAgICAgIChjbGljayk9XCJ0b2dnbGVFeHBhbmRlZCgpXCI+PC9sZWdlbmQ+XG4gICAgICA8ZmxleC1sYXlvdXQtcm9vdC13aWRnZXQgKm5nSWY9XCJleHBhbmRlZFwiXG4gICAgICAgIFtsYXlvdXRdPVwibGF5b3V0Tm9kZS5pdGVtc1wiXG4gICAgICAgIFtkYXRhSW5kZXhdPVwiZGF0YUluZGV4XCJcbiAgICAgICAgW2xheW91dEluZGV4XT1cImxheW91dEluZGV4XCJcbiAgICAgICAgW2lzRmxleEl0ZW1dPVwiZ2V0RmxleEF0dHJpYnV0ZSgnaXMtZmxleCcpXCJcbiAgICAgICAgW2NsYXNzLmZvcm0tZmxleC1jb2x1bW5dPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC1kaXJlY3Rpb24nKSA9PT0gJ2NvbHVtbidcIlxuICAgICAgICBbY2xhc3MuZm9ybS1mbGV4LXJvd109XCJnZXRGbGV4QXR0cmlidXRlKCdmbGV4LWRpcmVjdGlvbicpID09PSAncm93J1wiXG4gICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2Rpc3BsYXknKVwiXG4gICAgICAgIFtzdHlsZS5mbGV4LWRpcmVjdGlvbl09XCJnZXRGbGV4QXR0cmlidXRlKCdmbGV4LWRpcmVjdGlvbicpXCJcbiAgICAgICAgW3N0eWxlLmZsZXgtd3JhcF09XCJnZXRGbGV4QXR0cmlidXRlKCdmbGV4LXdyYXAnKVwiXG4gICAgICAgIFtzdHlsZS5qdXN0aWZ5LWNvbnRlbnRdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnanVzdGlmeS1jb250ZW50JylcIlxuICAgICAgICBbc3R5bGUuYWxpZ24taXRlbXNdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnYWxpZ24taXRlbXMnKVwiXG4gICAgICAgIFtzdHlsZS5hbGlnbi1jb250ZW50XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2FsaWduLWNvbnRlbnQnKVwiXG4gICAgICAgIFtmeExheW91dF09XCJnZXRGbGV4QXR0cmlidXRlKCdsYXlvdXQnKVwiXG4gICAgICAgIFtmeExheW91dEdhcF09XCJvcHRpb25zPy5meExheW91dEdhcFwiXG4gICAgICAgIFtmeExheW91dEFsaWduXT1cIm9wdGlvbnM/LmZ4TGF5b3V0QWxpZ25cIlxuICAgICAgICBbYXR0ci5meEZsZXhGaWxsXT1cIm9wdGlvbnM/LmZ4TGF5b3V0QWxpZ25cIj48L2ZsZXgtbGF5b3V0LXJvb3Qtd2lkZ2V0PlxuICAgICAgPG1hdC1lcnJvciAqbmdJZj1cIm9wdGlvbnM/LnNob3dFcnJvcnMgJiYgb3B0aW9ucz8uZXJyb3JNZXNzYWdlXCJcbiAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5lcnJvck1lc3NhZ2VcIj48L21hdC1lcnJvcj5cbiAgICA8L2ZpZWxkc2V0PlxuXG4gICAgPG1hdC1jYXJkICpuZ0lmPVwiY29udGFpbmVyVHlwZSA9PT0gJ2NhcmQnXCJcbiAgICAgIFtjbGFzc109XCJvcHRpb25zPy5odG1sQ2xhc3MgfHwgJydcIlxuICAgICAgW2NsYXNzLmV4cGFuZGFibGVdPVwib3B0aW9ucz8uZXhwYW5kYWJsZSAmJiAhZXhwYW5kZWRcIlxuICAgICAgW2NsYXNzLmV4cGFuZGVkXT1cIm9wdGlvbnM/LmV4cGFuZGFibGUgJiYgZXhwYW5kZWRcIj5cbiAgICAgIDxtYXQtY2FyZC1oZWFkZXIgKm5nSWY9XCJzZWN0aW9uVGl0bGVcIj5cbiAgICAgICAgPGxlZ2VuZFxuICAgICAgICAgIFtjbGFzc109XCInbGVnZW5kICcgKyAob3B0aW9ucz8ubGFiZWxIdG1sQ2xhc3MgfHwgJycpXCJcbiAgICAgICAgICBbaW5uZXJIVE1MXT1cInNlY3Rpb25UaXRsZVwiXG4gICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZUV4cGFuZGVkKClcIj48L2xlZ2VuZD5cbiAgICAgIDwvbWF0LWNhcmQtaGVhZGVyPlxuICAgICAgPG1hdC1jYXJkLWNvbnRlbnQgKm5nSWY9XCJleHBhbmRlZFwiPlxuICAgICAgICA8ZmllbGRzZXQgW2Rpc2FibGVkXT1cIm9wdGlvbnM/LnJlYWRvbmx5XCI+XG4gICAgICAgICAgPGZsZXgtbGF5b3V0LXJvb3Qtd2lkZ2V0ICpuZ0lmPVwiZXhwYW5kZWRcIlxuICAgICAgICAgICAgW2xheW91dF09XCJsYXlvdXROb2RlLml0ZW1zXCJcbiAgICAgICAgICAgIFtkYXRhSW5kZXhdPVwiZGF0YUluZGV4XCJcbiAgICAgICAgICAgIFtsYXlvdXRJbmRleF09XCJsYXlvdXRJbmRleFwiXG4gICAgICAgICAgICBbaXNGbGV4SXRlbV09XCJnZXRGbGV4QXR0cmlidXRlKCdpcy1mbGV4JylcIlxuICAgICAgICAgICAgW2NsYXNzLmZvcm0tZmxleC1jb2x1bW5dPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC1kaXJlY3Rpb24nKSA9PT0gJ2NvbHVtbidcIlxuICAgICAgICAgICAgW2NsYXNzLmZvcm0tZmxleC1yb3ddPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC1kaXJlY3Rpb24nKSA9PT0gJ3JvdydcIlxuICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZGlzcGxheScpXCJcbiAgICAgICAgICAgIFtzdHlsZS5mbGV4LWRpcmVjdGlvbl09XCJnZXRGbGV4QXR0cmlidXRlKCdmbGV4LWRpcmVjdGlvbicpXCJcbiAgICAgICAgICAgIFtzdHlsZS5mbGV4LXdyYXBdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC13cmFwJylcIlxuICAgICAgICAgICAgW3N0eWxlLmp1c3RpZnktY29udGVudF09XCJnZXRGbGV4QXR0cmlidXRlKCdqdXN0aWZ5LWNvbnRlbnQnKVwiXG4gICAgICAgICAgICBbc3R5bGUuYWxpZ24taXRlbXNdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnYWxpZ24taXRlbXMnKVwiXG4gICAgICAgICAgICBbc3R5bGUuYWxpZ24tY29udGVudF09XCJnZXRGbGV4QXR0cmlidXRlKCdhbGlnbi1jb250ZW50JylcIlxuICAgICAgICAgICAgW2Z4TGF5b3V0XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2xheW91dCcpXCJcbiAgICAgICAgICAgIFtmeExheW91dEdhcF09XCJvcHRpb25zPy5meExheW91dEdhcFwiXG4gICAgICAgICAgICBbZnhMYXlvdXRBbGlnbl09XCJvcHRpb25zPy5meExheW91dEFsaWduXCJcbiAgICAgICAgICAgIFthdHRyLmZ4RmxleEZpbGxdPVwib3B0aW9ucz8uZnhMYXlvdXRBbGlnblwiPjwvZmxleC1sYXlvdXQtcm9vdC13aWRnZXQ+XG4gICAgICAgICAgPC9maWVsZHNldD5cbiAgICAgIDwvbWF0LWNhcmQtY29udGVudD5cbiAgICAgIDxtYXQtY2FyZC1mb290ZXI+XG4gICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJvcHRpb25zPy5zaG93RXJyb3JzICYmIG9wdGlvbnM/LmVycm9yTWVzc2FnZVwiXG4gICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5lcnJvck1lc3NhZ2VcIj48L21hdC1lcnJvcj5cbiAgICAgIDwvbWF0LWNhcmQtZm9vdGVyPlxuICAgIDwvbWF0LWNhcmQ+XG5cbiAgICA8bWF0LWV4cGFuc2lvbi1wYW5lbCAqbmdJZj1cImNvbnRhaW5lclR5cGUgPT09ICdleHBhbnNpb24tcGFuZWwnXCJcbiAgICAgIFtleHBhbmRlZF09XCJleHBhbmRlZFwiXG4gICAgICBbaGlkZVRvZ2dsZV09XCIhb3B0aW9ucz8uZXhwYW5kYWJsZVwiPlxuICAgICAgPG1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyPlxuICAgICAgICA8bWF0LXBhbmVsLXRpdGxlPlxuICAgICAgICAgIDxsZWdlbmQgKm5nSWY9XCJzZWN0aW9uVGl0bGVcIlxuICAgICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmxhYmVsSHRtbENsYXNzXCJcbiAgICAgICAgICAgIFtpbm5lckhUTUxdPVwic2VjdGlvblRpdGxlXCJcbiAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVFeHBhbmRlZCgpXCI+PC9sZWdlbmQ+XG4gICAgICAgIDwvbWF0LXBhbmVsLXRpdGxlPlxuICAgICAgPC9tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5cbiAgICAgIDxmaWVsZHNldCBbZGlzYWJsZWRdPVwib3B0aW9ucz8ucmVhZG9ubHlcIj5cbiAgICAgICAgPGZsZXgtbGF5b3V0LXJvb3Qtd2lkZ2V0ICpuZ0lmPVwiZXhwYW5kZWRcIlxuICAgICAgICAgIFtsYXlvdXRdPVwibGF5b3V0Tm9kZS5pdGVtc1wiXG4gICAgICAgICAgW2RhdGFJbmRleF09XCJkYXRhSW5kZXhcIlxuICAgICAgICAgIFtsYXlvdXRJbmRleF09XCJsYXlvdXRJbmRleFwiXG4gICAgICAgICAgW2lzRmxleEl0ZW1dPVwiZ2V0RmxleEF0dHJpYnV0ZSgnaXMtZmxleCcpXCJcbiAgICAgICAgICBbY2xhc3MuZm9ybS1mbGV4LWNvbHVtbl09XCJnZXRGbGV4QXR0cmlidXRlKCdmbGV4LWRpcmVjdGlvbicpID09PSAnY29sdW1uJ1wiXG4gICAgICAgICAgW2NsYXNzLmZvcm0tZmxleC1yb3ddPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC1kaXJlY3Rpb24nKSA9PT0gJ3JvdydcIlxuICAgICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2Rpc3BsYXknKVwiXG4gICAgICAgICAgW3N0eWxlLmZsZXgtZGlyZWN0aW9uXT1cImdldEZsZXhBdHRyaWJ1dGUoJ2ZsZXgtZGlyZWN0aW9uJylcIlxuICAgICAgICAgIFtzdHlsZS5mbGV4LXdyYXBdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC13cmFwJylcIlxuICAgICAgICAgIFtzdHlsZS5qdXN0aWZ5LWNvbnRlbnRdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnanVzdGlmeS1jb250ZW50JylcIlxuICAgICAgICAgIFtzdHlsZS5hbGlnbi1pdGVtc109XCJnZXRGbGV4QXR0cmlidXRlKCdhbGlnbi1pdGVtcycpXCJcbiAgICAgICAgICBbc3R5bGUuYWxpZ24tY29udGVudF09XCJnZXRGbGV4QXR0cmlidXRlKCdhbGlnbi1jb250ZW50JylcIlxuICAgICAgICAgIFtmeExheW91dF09XCJnZXRGbGV4QXR0cmlidXRlKCdsYXlvdXQnKVwiXG4gICAgICAgICAgW2Z4TGF5b3V0R2FwXT1cIm9wdGlvbnM/LmZ4TGF5b3V0R2FwXCJcbiAgICAgICAgICBbZnhMYXlvdXRBbGlnbl09XCJvcHRpb25zPy5meExheW91dEFsaWduXCJcbiAgICAgICAgICBbYXR0ci5meEZsZXhGaWxsXT1cIm9wdGlvbnM/LmZ4TGF5b3V0QWxpZ25cIj48L2ZsZXgtbGF5b3V0LXJvb3Qtd2lkZ2V0PlxuICAgICAgPC9maWVsZHNldD5cbiAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJvcHRpb25zPy5zaG93RXJyb3JzICYmIG9wdGlvbnM/LmVycm9yTWVzc2FnZVwiXG4gICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZXJyb3JNZXNzYWdlXCI+PC9tYXQtZXJyb3I+XG4gICAgPC9tYXQtZXhwYW5zaW9uLXBhbmVsPmAsXG4gIHN0eWxlczogW2BcbiAgICBmaWVsZHNldCB7IGJvcmRlcjogMDsgbWFyZ2luOiAwOyBwYWRkaW5nOiAwOyB9XG4gICAgLmxlZ2VuZCB7IGZvbnQtd2VpZ2h0OiBib2xkOyB9XG4gICAgLmV4cGFuZGFibGUgPiAubGVnZW5kOmJlZm9yZSB7IGNvbnRlbnQ6ICfilrYnOyBwYWRkaW5nLXJpZ2h0OiAuM2VtOyB9XG4gICAgLmV4cGFuZGVkID4gLmxlZ2VuZDpiZWZvcmUgeyBjb250ZW50OiAn4pa8JzsgcGFkZGluZy1yaWdodDogLjJlbTsgfVxuICBgXSxcbn0pXG5leHBvcnQgY2xhc3MgRmxleExheW91dFNlY3Rpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sO1xuICBjb250cm9sTmFtZTogc3RyaW5nO1xuICBjb250cm9sVmFsdWU6IGFueTtcbiAgY29udHJvbERpc2FibGVkID0gZmFsc2U7XG4gIGJvdW5kQ29udHJvbCA9IGZhbHNlO1xuICBvcHRpb25zOiBhbnk7XG4gIGV4cGFuZGVkID0gdHJ1ZTtcbiAgY29udGFpbmVyVHlwZSA9ICdkaXYnO1xuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnk7XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXTtcbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkgeyB9XG5cbiAgZ2V0IHNlY3Rpb25UaXRsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLm5vdGl0bGUgPyBudWxsIDogdGhpcy5qc2Yuc2V0SXRlbVRpdGxlKHRoaXMpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5qc2YuaW5pdGlhbGl6ZUNvbnRyb2wodGhpcyk7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge307XG4gICAgdGhpcy5leHBhbmRlZCA9IHR5cGVvZiB0aGlzLm9wdGlvbnMuZXhwYW5kZWQgPT09ICdib29sZWFuJyA/XG4gICAgICB0aGlzLm9wdGlvbnMuZXhwYW5kZWQgOiAhdGhpcy5vcHRpb25zLmV4cGFuZGFibGU7XG4gICAgc3dpdGNoICh0aGlzLmxheW91dE5vZGUudHlwZSkge1xuICAgICAgY2FzZSAnc2VjdGlvbic6IGNhc2UgJ2FycmF5JzogY2FzZSAnZmllbGRzZXQnOiBjYXNlICdhZHZhbmNlZGZpZWxkc2V0JzpcbiAgICAgIGNhc2UgJ2F1dGhmaWVsZHNldCc6IGNhc2UgJ29wdGlvbmZpZWxkc2V0JzogY2FzZSAnc2VsZWN0ZmllbGRzZXQnOlxuICAgICAgICB0aGlzLmNvbnRhaW5lclR5cGUgPSAnZmllbGRzZXQnO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjYXJkJzpcbiAgICAgICAgdGhpcy5jb250YWluZXJUeXBlID0gJ2NhcmQnO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdleHBhbnNpb24tcGFuZWwnOlxuICAgICAgICB0aGlzLmNvbnRhaW5lclR5cGUgPSAnZXhwYW5zaW9uLXBhbmVsJztcbiAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDogLy8gJ2RpdicsICdmbGV4JywgJ3RhYicsICdjb25kaXRpb25hbCcsICdhY3Rpb25zJ1xuICAgICAgICB0aGlzLmNvbnRhaW5lclR5cGUgPSAnZGl2JztcbiAgICB9XG4gIH1cblxuICB0b2dnbGVFeHBhbmRlZCgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmV4cGFuZGFibGUpIHsgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkOyB9XG4gIH1cblxuICAvLyBTZXQgYXR0cmlidXRlcyBmb3IgZmxleGJveCBjb250YWluZXJcbiAgLy8gKGNoaWxkIGF0dHJpYnV0ZXMgYXJlIHNldCBpbiBmbGV4LWxheW91dC1yb290LmNvbXBvbmVudClcbiAgZ2V0RmxleEF0dHJpYnV0ZShhdHRyaWJ1dGU6IHN0cmluZykge1xuICAgIGNvbnN0IGZsZXhBY3RpdmU6IGJvb2xlYW4gPVxuICAgICAgdGhpcy5sYXlvdXROb2RlLnR5cGUgPT09ICdmbGV4JyB8fFxuICAgICAgISF0aGlzLm9wdGlvbnMuZGlzcGxheUZsZXggfHxcbiAgICAgIHRoaXMub3B0aW9ucy5kaXNwbGF5ID09PSAnZmxleCc7XG4gICAgLy8gaWYgKGF0dHJpYnV0ZSAhPT0gJ2ZsZXgnICYmICFmbGV4QWN0aXZlKSB7IHJldHVybiBudWxsOyB9XG4gICAgc3dpdGNoIChhdHRyaWJ1dGUpIHtcbiAgICAgIGNhc2UgJ2lzLWZsZXgnOlxuICAgICAgICByZXR1cm4gZmxleEFjdGl2ZTtcbiAgICAgIGNhc2UgJ2Rpc3BsYXknOlxuICAgICAgICByZXR1cm4gZmxleEFjdGl2ZSA/ICdmbGV4JyA6ICdpbml0aWFsJztcbiAgICAgIGNhc2UgJ2ZsZXgtZGlyZWN0aW9uJzogY2FzZSAnZmxleC13cmFwJzpcbiAgICAgICAgY29uc3QgaW5kZXggPSBbJ2ZsZXgtZGlyZWN0aW9uJywgJ2ZsZXgtd3JhcCddLmluZGV4T2YoYXR0cmlidXRlKTtcbiAgICAgICAgcmV0dXJuICh0aGlzLm9wdGlvbnNbJ2ZsZXgtZmxvdyddIHx8ICcnKS5zcGxpdCgvXFxzKy8pW2luZGV4XSB8fFxuICAgICAgICAgIHRoaXMub3B0aW9uc1thdHRyaWJ1dGVdIHx8IFsnY29sdW1uJywgJ25vd3JhcCddW2luZGV4XTtcbiAgICAgIGNhc2UgJ2p1c3RpZnktY29udGVudCc6IGNhc2UgJ2FsaWduLWl0ZW1zJzogY2FzZSAnYWxpZ24tY29udGVudCc6XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnNbYXR0cmlidXRlXTtcbiAgICAgIGNhc2UgJ2xheW91dCc6XG4gICAgICAgIHJldHVybiAodGhpcy5vcHRpb25zLmZ4TGF5b3V0IHx8ICdyb3cnKSArXG4gICAgICAgICAgdGhpcy5vcHRpb25zLmZ4TGF5b3V0V3JhcCA/ICcgJyArIHRoaXMub3B0aW9ucy5meExheW91dFdyYXAgOiAnJztcbiAgICB9XG4gIH1cbn1cbiJdfQ==