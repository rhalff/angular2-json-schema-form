import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '@ngsf/widget-library';
import * as i0 from "@angular/core";
import * as i1 from "@ngsf/widget-library";
import * as i2 from "@angular/common";
import * as i3 from "@ngbracket/ngx-layout/flex";
import * as i4 from "@angular/material/card";
import * as i5 from "@angular/material/expansion";
import * as i6 from "@angular/material/form-field";
import * as i7 from "./flex-layout-root.component";
class FlexLayoutSectionComponent {
    jsf;
    formControl;
    controlName;
    controlValue;
    controlDisabled = false;
    boundControl = false;
    options;
    expanded = true;
    containerType = 'div';
    layoutNode;
    layoutIndex;
    dataIndex;
    constructor(jsf) {
        this.jsf = jsf;
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
            default:
                this.containerType = 'div';
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: FlexLayoutSectionComponent, deps: [{ token: i1.JsonSchemaFormService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: FlexLayoutSectionComponent, selector: "flex-layout-section-widget", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, ngImport: i0, template: `
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
      </mat-expansion-panel>`, isInline: true, styles: ["fieldset{border:0;margin:0;padding:0}.legend{font-weight:700}.expandable>.legend:before{content:\"\\25b6\";padding-right:.3em}.expanded>.legend:before{content:\"\\25bc\";padding-right:.2em}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.DefaultLayoutDirective, selector: "  [fxLayout], [fxLayout.xs], [fxLayout.sm], [fxLayout.md],  [fxLayout.lg], [fxLayout.xl], [fxLayout.lt-sm], [fxLayout.lt-md],  [fxLayout.lt-lg], [fxLayout.lt-xl], [fxLayout.gt-xs], [fxLayout.gt-sm],  [fxLayout.gt-md], [fxLayout.gt-lg]", inputs: ["fxLayout", "fxLayout.xs", "fxLayout.sm", "fxLayout.md", "fxLayout.lg", "fxLayout.xl", "fxLayout.lt-sm", "fxLayout.lt-md", "fxLayout.lt-lg", "fxLayout.lt-xl", "fxLayout.gt-xs", "fxLayout.gt-sm", "fxLayout.gt-md", "fxLayout.gt-lg"] }, { kind: "directive", type: i3.DefaultLayoutGapDirective, selector: "  [fxLayoutGap], [fxLayoutGap.xs], [fxLayoutGap.sm], [fxLayoutGap.md],  [fxLayoutGap.lg], [fxLayoutGap.xl], [fxLayoutGap.lt-sm], [fxLayoutGap.lt-md],  [fxLayoutGap.lt-lg], [fxLayoutGap.lt-xl], [fxLayoutGap.gt-xs], [fxLayoutGap.gt-sm],  [fxLayoutGap.gt-md], [fxLayoutGap.gt-lg]", inputs: ["fxLayoutGap", "fxLayoutGap.xs", "fxLayoutGap.sm", "fxLayoutGap.md", "fxLayoutGap.lg", "fxLayoutGap.xl", "fxLayoutGap.lt-sm", "fxLayoutGap.lt-md", "fxLayoutGap.lt-lg", "fxLayoutGap.lt-xl", "fxLayoutGap.gt-xs", "fxLayoutGap.gt-sm", "fxLayoutGap.gt-md", "fxLayoutGap.gt-lg"] }, { kind: "directive", type: i3.DefaultLayoutAlignDirective, selector: "  [fxLayoutAlign], [fxLayoutAlign.xs], [fxLayoutAlign.sm], [fxLayoutAlign.md],  [fxLayoutAlign.lg], [fxLayoutAlign.xl], [fxLayoutAlign.lt-sm], [fxLayoutAlign.lt-md],  [fxLayoutAlign.lt-lg], [fxLayoutAlign.lt-xl], [fxLayoutAlign.gt-xs], [fxLayoutAlign.gt-sm],  [fxLayoutAlign.gt-md], [fxLayoutAlign.gt-lg]", inputs: ["fxLayoutAlign", "fxLayoutAlign.xs", "fxLayoutAlign.sm", "fxLayoutAlign.md", "fxLayoutAlign.lg", "fxLayoutAlign.xl", "fxLayoutAlign.lt-sm", "fxLayoutAlign.lt-md", "fxLayoutAlign.lt-lg", "fxLayoutAlign.lt-xl", "fxLayoutAlign.gt-xs", "fxLayoutAlign.gt-sm", "fxLayoutAlign.gt-md", "fxLayoutAlign.gt-lg"] }, { kind: "component", type: i4.MatCard, selector: "mat-card", inputs: ["appearance"], exportAs: ["matCard"] }, { kind: "directive", type: i4.MatCardContent, selector: "mat-card-content" }, { kind: "directive", type: i4.MatCardFooter, selector: "mat-card-footer" }, { kind: "component", type: i4.MatCardHeader, selector: "mat-card-header" }, { kind: "component", type: i5.MatExpansionPanel, selector: "mat-expansion-panel", inputs: ["disabled", "expanded", "hideToggle", "togglePosition"], outputs: ["opened", "closed", "expandedChange", "afterExpand", "afterCollapse"], exportAs: ["matExpansionPanel"] }, { kind: "component", type: i5.MatExpansionPanelHeader, selector: "mat-expansion-panel-header", inputs: ["tabIndex", "expandedHeight", "collapsedHeight"] }, { kind: "directive", type: i5.MatExpansionPanelTitle, selector: "mat-panel-title" }, { kind: "directive", type: i6.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "component", type: i7.FlexLayoutRootComponent, selector: "flex-layout-root-widget", inputs: ["dataIndex", "layoutIndex", "layout", "isFlexItem"] }] });
}
export { FlexLayoutSectionComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: FlexLayoutSectionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'flex-layout-section-widget', template: `
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
      </mat-expansion-panel>`, styles: ["fieldset{border:0;margin:0;padding:0}.legend{font-weight:700}.expandable>.legend:before{content:\"\\25b6\";padding-right:.3em}.expanded>.legend:before{content:\"\\25bc\";padding-right:.2em}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.JsonSchemaFormService }]; }, propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleC1sYXlvdXQtc2VjdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLW1hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsvc3JjL2xpYi9jb21wb25lbnRzL2ZsZXgtbGF5b3V0LXNlY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFBO0FBRXRELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNCQUFzQixDQUFBOzs7Ozs7Ozs7QUFFMUQsTUEwSmEsMEJBQTBCO0lBYzNCO0lBYlYsV0FBVyxDQUFpQjtJQUM1QixXQUFXLENBQVE7SUFDbkIsWUFBWSxDQUFLO0lBQ2pCLGVBQWUsR0FBRyxLQUFLLENBQUE7SUFDdkIsWUFBWSxHQUFHLEtBQUssQ0FBQTtJQUNwQixPQUFPLENBQUs7SUFDWixRQUFRLEdBQUcsSUFBSSxDQUFBO0lBQ2YsYUFBYSxHQUFHLEtBQUssQ0FBQTtJQUNaLFVBQVUsQ0FBSztJQUNmLFdBQVcsQ0FBVTtJQUNyQixTQUFTLENBQVU7SUFFNUIsWUFDVSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtJQUVwQyxDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNsRSxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLFFB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QVM7K0JBQ0UsNEJBQTRCLFlBQzVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBaUlpQjs0R0FnQ2xCLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnXG5pbXBvcnQge0pzb25TY2hlbWFGb3JtU2VydmljZX0gZnJvbSAnQG5nc2Yvd2lkZ2V0LWxpYnJhcnknXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ZsZXgtbGF5b3V0LXNlY3Rpb24td2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxkaXYgKm5nSWY9XCJjb250YWluZXJUeXBlID09PSAnZGl2J1wiXG4gICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5odG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICBbY2xhc3MuZXhwYW5kYWJsZV09XCJvcHRpb25zPy5leHBhbmRhYmxlICYmICFleHBhbmRlZFwiXG4gICAgICAgICAgIFtjbGFzcy5leHBhbmRlZF09XCJvcHRpb25zPy5leHBhbmRhYmxlICYmIGV4cGFuZGVkXCI+XG4gICAgICAgICAgPGxhYmVsICpuZ0lmPVwic2VjdGlvblRpdGxlXCJcbiAgICAgICAgICAgICAgICAgW2NsYXNzXT1cIidsZWdlbmQgJyArIChvcHRpb25zPy5sYWJlbEh0bWxDbGFzcyB8fCAnJylcIlxuICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cInNlY3Rpb25UaXRsZVwiXG4gICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVFeHBhbmRlZCgpXCI+PC9sYWJlbD5cbiAgICAgICAgICA8ZmxleC1sYXlvdXQtcm9vdC13aWRnZXQgKm5nSWY9XCJleHBhbmRlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsYXlvdXRdPVwibGF5b3V0Tm9kZS5pdGVtc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkYXRhSW5kZXhdPVwiZGF0YUluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2xheW91dEluZGV4XT1cImxheW91dEluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lzRmxleEl0ZW1dPVwiZ2V0RmxleEF0dHJpYnV0ZSgnaXMtZmxleCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmZvcm0tZmxleC1jb2x1bW5dPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC1kaXJlY3Rpb24nKSA9PT0gJ2NvbHVtbidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MuZm9ybS1mbGV4LXJvd109XCJnZXRGbGV4QXR0cmlidXRlKCdmbGV4LWRpcmVjdGlvbicpID09PSAncm93J1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2Rpc3BsYXknKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5mbGV4LWRpcmVjdGlvbl09XCJnZXRGbGV4QXR0cmlidXRlKCdmbGV4LWRpcmVjdGlvbicpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmZsZXgtd3JhcF09XCJnZXRGbGV4QXR0cmlidXRlKCdmbGV4LXdyYXAnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5qdXN0aWZ5LWNvbnRlbnRdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnanVzdGlmeS1jb250ZW50JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuYWxpZ24taXRlbXNdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnYWxpZ24taXRlbXMnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5hbGlnbi1jb250ZW50XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2FsaWduLWNvbnRlbnQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmeExheW91dF09XCJnZXRGbGV4QXR0cmlidXRlKCdsYXlvdXQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmeExheW91dEdhcF09XCJvcHRpb25zPy5meExheW91dEdhcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmeExheW91dEFsaWduXT1cIm9wdGlvbnM/LmZ4TGF5b3V0QWxpZ25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5meEZsZXhGaWxsXT1cIm9wdGlvbnM/LmZ4TGF5b3V0QWxpZ25cIj48L2ZsZXgtbGF5b3V0LXJvb3Qtd2lkZ2V0PlxuICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJvcHRpb25zPy5zaG93RXJyb3JzICYmIG9wdGlvbnM/LmVycm9yTWVzc2FnZVwiXG4gICAgICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmVycm9yTWVzc2FnZVwiPjwvbWF0LWVycm9yPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxmaWVsZHNldCAqbmdJZj1cImNvbnRhaW5lclR5cGUgPT09ICdmaWVsZHNldCdcIlxuICAgICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5odG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5leHBhbmRhYmxlXT1cIm9wdGlvbnM/LmV4cGFuZGFibGUgJiYgIWV4cGFuZGVkXCJcbiAgICAgICAgICAgICAgICBbY2xhc3MuZXhwYW5kZWRdPVwib3B0aW9ucz8uZXhwYW5kYWJsZSAmJiBleHBhbmRlZFwiXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIm9wdGlvbnM/LnJlYWRvbmx5XCI+XG4gICAgICAgICAgPGxlZ2VuZCAqbmdJZj1cInNlY3Rpb25UaXRsZVwiXG4gICAgICAgICAgICAgICAgICBbY2xhc3NdPVwiJ2xlZ2VuZCAnICsgKG9wdGlvbnM/LmxhYmVsSHRtbENsYXNzIHx8ICcnKVwiXG4gICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cInNlY3Rpb25UaXRsZVwiXG4gICAgICAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlRXhwYW5kZWQoKVwiPjwvbGVnZW5kPlxuICAgICAgICAgIDxmbGV4LWxheW91dC1yb290LXdpZGdldCAqbmdJZj1cImV4cGFuZGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2xheW91dF09XCJsYXlvdXROb2RlLml0ZW1zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2RhdGFJbmRleF09XCJkYXRhSW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbGF5b3V0SW5kZXhdPVwibGF5b3V0SW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaXNGbGV4SXRlbV09XCJnZXRGbGV4QXR0cmlidXRlKCdpcy1mbGV4JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MuZm9ybS1mbGV4LWNvbHVtbl09XCJnZXRGbGV4QXR0cmlidXRlKCdmbGV4LWRpcmVjdGlvbicpID09PSAnY29sdW1uJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5mb3JtLWZsZXgtcm93XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2ZsZXgtZGlyZWN0aW9uJykgPT09ICdyb3cnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZGlzcGxheScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmZsZXgtZGlyZWN0aW9uXT1cImdldEZsZXhBdHRyaWJ1dGUoJ2ZsZXgtZGlyZWN0aW9uJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuZmxleC13cmFwXT1cImdldEZsZXhBdHRyaWJ1dGUoJ2ZsZXgtd3JhcCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmp1c3RpZnktY29udGVudF09XCJnZXRGbGV4QXR0cmlidXRlKCdqdXN0aWZ5LWNvbnRlbnQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5hbGlnbi1pdGVtc109XCJnZXRGbGV4QXR0cmlidXRlKCdhbGlnbi1pdGVtcycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmFsaWduLWNvbnRlbnRdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnYWxpZ24tY29udGVudCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Z4TGF5b3V0XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2xheW91dCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Z4TGF5b3V0R2FwXT1cIm9wdGlvbnM/LmZ4TGF5b3V0R2FwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Z4TGF5b3V0QWxpZ25dPVwib3B0aW9ucz8uZnhMYXlvdXRBbGlnblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmZ4RmxleEZpbGxdPVwib3B0aW9ucz8uZnhMYXlvdXRBbGlnblwiPjwvZmxleC1sYXlvdXQtcm9vdC13aWRnZXQ+XG4gICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cIm9wdGlvbnM/LnNob3dFcnJvcnMgJiYgb3B0aW9ucz8uZXJyb3JNZXNzYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZXJyb3JNZXNzYWdlXCI+PC9tYXQtZXJyb3I+XG4gICAgICA8L2ZpZWxkc2V0PlxuXG4gICAgICA8bWF0LWNhcmQgKm5nSWY9XCJjb250YWluZXJUeXBlID09PSAnY2FyZCdcIlxuICAgICAgICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5odG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5leHBhbmRhYmxlXT1cIm9wdGlvbnM/LmV4cGFuZGFibGUgJiYgIWV4cGFuZGVkXCJcbiAgICAgICAgICAgICAgICBbY2xhc3MuZXhwYW5kZWRdPVwib3B0aW9ucz8uZXhwYW5kYWJsZSAmJiBleHBhbmRlZFwiPlxuICAgICAgICAgIDxtYXQtY2FyZC1oZWFkZXIgKm5nSWY9XCJzZWN0aW9uVGl0bGVcIj5cbiAgICAgICAgICAgICAgPGxlZ2VuZFxuICAgICAgICAgICAgICAgICAgICAgIFtjbGFzc109XCInbGVnZW5kICcgKyAob3B0aW9ucz8ubGFiZWxIdG1sQ2xhc3MgfHwgJycpXCJcbiAgICAgICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cInNlY3Rpb25UaXRsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZUV4cGFuZGVkKClcIj48L2xlZ2VuZD5cbiAgICAgICAgICA8L21hdC1jYXJkLWhlYWRlcj5cbiAgICAgICAgICA8bWF0LWNhcmQtY29udGVudCAqbmdJZj1cImV4cGFuZGVkXCI+XG4gICAgICAgICAgICAgIDxmaWVsZHNldCBbZGlzYWJsZWRdPVwib3B0aW9ucz8ucmVhZG9ubHlcIj5cbiAgICAgICAgICAgICAgICAgIDxmbGV4LWxheW91dC1yb290LXdpZGdldCAqbmdJZj1cImV4cGFuZGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbGF5b3V0XT1cImxheW91dE5vZGUuaXRlbXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkYXRhSW5kZXhdPVwiZGF0YUluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbGF5b3V0SW5kZXhdPVwibGF5b3V0SW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpc0ZsZXhJdGVtXT1cImdldEZsZXhBdHRyaWJ1dGUoJ2lzLWZsZXgnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmZvcm0tZmxleC1jb2x1bW5dPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC1kaXJlY3Rpb24nKSA9PT0gJ2NvbHVtbidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5mb3JtLWZsZXgtcm93XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2ZsZXgtZGlyZWN0aW9uJykgPT09ICdyb3cnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuZGlzcGxheV09XCJnZXRGbGV4QXR0cmlidXRlKCdkaXNwbGF5JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5mbGV4LWRpcmVjdGlvbl09XCJnZXRGbGV4QXR0cmlidXRlKCdmbGV4LWRpcmVjdGlvbicpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuZmxleC13cmFwXT1cImdldEZsZXhBdHRyaWJ1dGUoJ2ZsZXgtd3JhcCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuanVzdGlmeS1jb250ZW50XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2p1c3RpZnktY29udGVudCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuYWxpZ24taXRlbXNdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnYWxpZ24taXRlbXMnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmFsaWduLWNvbnRlbnRdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnYWxpZ24tY29udGVudCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZnhMYXlvdXRdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnbGF5b3V0JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmeExheW91dEdhcF09XCJvcHRpb25zPy5meExheW91dEdhcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Z4TGF5b3V0QWxpZ25dPVwib3B0aW9ucz8uZnhMYXlvdXRBbGlnblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZnhGbGV4RmlsbF09XCJvcHRpb25zPy5meExheW91dEFsaWduXCI+PC9mbGV4LWxheW91dC1yb290LXdpZGdldD5cbiAgICAgICAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgICA8L21hdC1jYXJkLWNvbnRlbnQ+XG4gICAgICAgICAgPG1hdC1jYXJkLWZvb3Rlcj5cbiAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cIm9wdGlvbnM/LnNob3dFcnJvcnMgJiYgb3B0aW9ucz8uZXJyb3JNZXNzYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmVycm9yTWVzc2FnZVwiPjwvbWF0LWVycm9yPlxuICAgICAgICAgIDwvbWF0LWNhcmQtZm9vdGVyPlxuICAgICAgPC9tYXQtY2FyZD5cblxuICAgICAgPG1hdC1leHBhbnNpb24tcGFuZWwgKm5nSWY9XCJjb250YWluZXJUeXBlID09PSAnZXhwYW5zaW9uLXBhbmVsJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbZXhwYW5kZWRdPVwiZXhwYW5kZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW2hpZGVUb2dnbGVdPVwiIW9wdGlvbnM/LmV4cGFuZGFibGVcIj5cbiAgICAgICAgICA8bWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI+XG4gICAgICAgICAgICAgIDxtYXQtcGFuZWwtdGl0bGU+XG4gICAgICAgICAgICAgICAgICA8bGVnZW5kICpuZ0lmPVwic2VjdGlvblRpdGxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmxhYmVsSHRtbENsYXNzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJzZWN0aW9uVGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlRXhwYW5kZWQoKVwiPjwvbGVnZW5kPlxuICAgICAgICAgICAgICA8L21hdC1wYW5lbC10aXRsZT5cbiAgICAgICAgICA8L21hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyPlxuICAgICAgICAgIDxmaWVsZHNldCBbZGlzYWJsZWRdPVwib3B0aW9ucz8ucmVhZG9ubHlcIj5cbiAgICAgICAgICAgICAgPGZsZXgtbGF5b3V0LXJvb3Qtd2lkZ2V0ICpuZ0lmPVwiZXhwYW5kZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2xheW91dF09XCJsYXlvdXROb2RlLml0ZW1zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkYXRhSW5kZXhdPVwiZGF0YUluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsYXlvdXRJbmRleF09XCJsYXlvdXRJbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaXNGbGV4SXRlbV09XCJnZXRGbGV4QXR0cmlidXRlKCdpcy1mbGV4JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmZvcm0tZmxleC1jb2x1bW5dPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC1kaXJlY3Rpb24nKSA9PT0gJ2NvbHVtbidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmZvcm0tZmxleC1yb3ddPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC1kaXJlY3Rpb24nKSA9PT0gJ3JvdydcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZGlzcGxheScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5mbGV4LWRpcmVjdGlvbl09XCJnZXRGbGV4QXR0cmlidXRlKCdmbGV4LWRpcmVjdGlvbicpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5mbGV4LXdyYXBdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnZmxleC13cmFwJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmp1c3RpZnktY29udGVudF09XCJnZXRGbGV4QXR0cmlidXRlKCdqdXN0aWZ5LWNvbnRlbnQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuYWxpZ24taXRlbXNdPVwiZ2V0RmxleEF0dHJpYnV0ZSgnYWxpZ24taXRlbXMnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuYWxpZ24tY29udGVudF09XCJnZXRGbGV4QXR0cmlidXRlKCdhbGlnbi1jb250ZW50JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Z4TGF5b3V0XT1cImdldEZsZXhBdHRyaWJ1dGUoJ2xheW91dCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmeExheW91dEdhcF09XCJvcHRpb25zPy5meExheW91dEdhcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZnhMYXlvdXRBbGlnbl09XCJvcHRpb25zPy5meExheW91dEFsaWduXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmZ4RmxleEZpbGxdPVwib3B0aW9ucz8uZnhMYXlvdXRBbGlnblwiPjwvZmxleC1sYXlvdXQtcm9vdC13aWRnZXQ+XG4gICAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwib3B0aW9ucz8uc2hvd0Vycm9ycyAmJiBvcHRpb25zPy5lcnJvck1lc3NhZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5lcnJvck1lc3NhZ2VcIj48L21hdC1lcnJvcj5cbiAgICAgIDwvbWF0LWV4cGFuc2lvbi1wYW5lbD5gLFxuICBzdHlsZXM6IFtgXG4gICAgICBmaWVsZHNldCB7XG4gICAgICAgICAgYm9yZGVyOiAwO1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgfVxuXG4gICAgICAubGVnZW5kIHtcbiAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgIH1cblxuICAgICAgLmV4cGFuZGFibGUgPiAubGVnZW5kOmJlZm9yZSB7XG4gICAgICAgICAgY29udGVudDogJ+KWtic7XG4gICAgICAgICAgcGFkZGluZy1yaWdodDogLjNlbTtcbiAgICAgIH1cblxuICAgICAgLmV4cGFuZGVkID4gLmxlZ2VuZDpiZWZvcmUge1xuICAgICAgICAgIGNvbnRlbnQ6ICfilrwnO1xuICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IC4yZW07XG4gICAgICB9XG4gIGBdLFxufSlcbmV4cG9ydCBjbGFzcyBGbGV4TGF5b3V0U2VjdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2xcbiAgY29udHJvbE5hbWU6IHN0cmluZ1xuICBjb250cm9sVmFsdWU6IGFueVxuICBjb250cm9sRGlzYWJsZWQgPSBmYWxzZVxuICBib3VuZENvbnRyb2wgPSBmYWxzZVxuICBvcHRpb25zOiBhbnlcbiAgZXhwYW5kZWQgPSB0cnVlXG4gIGNvbnRhaW5lclR5cGUgPSAnZGl2J1xuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnlcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdXG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgZ2V0IHNlY3Rpb25UaXRsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLm5vdGl0bGUgPyBudWxsIDogdGhpcy5qc2Yuc2V0SXRlbVRpdGxlKHRoaXMpXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmpzZi5pbml0aWFsaXplQ29udHJvbCh0aGlzKVxuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9XG4gICAgdGhpcy5leHBhbmRlZCA9IHR5cGVvZiB0aGlzLm9wdGlvbnMuZXhwYW5kZWQgPT09ICdib29sZWFuJyA/XG4gICAgICB0aGlzLm9wdGlvbnMuZXhwYW5kZWQgOiAhdGhpcy5vcHRpb25zLmV4cGFuZGFibGVcbiAgICBzd2l0Y2ggKHRoaXMubGF5b3V0Tm9kZS50eXBlKSB7XG4gICAgICBjYXNlICdzZWN0aW9uJzpcbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgIGNhc2UgJ2ZpZWxkc2V0JzpcbiAgICAgIGNhc2UgJ2FkdmFuY2VkZmllbGRzZXQnOlxuICAgICAgY2FzZSAnYXV0aGZpZWxkc2V0JzpcbiAgICAgIGNhc2UgJ29wdGlvbmZpZWxkc2V0JzpcbiAgICAgIGNhc2UgJ3NlbGVjdGZpZWxkc2V0JzpcbiAgICAgICAgdGhpcy5jb250YWluZXJUeXBlID0gJ2ZpZWxkc2V0J1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnY2FyZCc6XG4gICAgICAgIHRoaXMuY29udGFpbmVyVHlwZSA9ICdjYXJkJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnZXhwYW5zaW9uLXBhbmVsJzpcbiAgICAgICAgdGhpcy5jb250YWluZXJUeXBlID0gJ2V4cGFuc2lvbi1wYW5lbCdcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6IC8vICdkaXYnLCAnZmxleCcsICd0YWInLCAnY29uZGl0aW9uYWwnLCAnYWN0aW9ucydcbiAgICAgICAgdGhpcy5jb250YWluZXJUeXBlID0gJ2RpdidcbiAgICB9XG4gIH1cblxuICB0b2dnbGVFeHBhbmRlZCgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmV4cGFuZGFibGUpIHtcbiAgICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZFxuICAgIH1cbiAgfVxuXG4gIC8vIFNldCBhdHRyaWJ1dGVzIGZvciBmbGV4Ym94IGNvbnRhaW5lclxuICAvLyAoY2hpbGQgYXR0cmlidXRlcyBhcmUgc2V0IGluIGZsZXgtbGF5b3V0LXJvb3QuY29tcG9uZW50KVxuICBnZXRGbGV4QXR0cmlidXRlKGF0dHJpYnV0ZTogc3RyaW5nKSB7XG4gICAgY29uc3QgZmxleEFjdGl2ZTogYm9vbGVhbiA9XG4gICAgICB0aGlzLmxheW91dE5vZGUudHlwZSA9PT0gJ2ZsZXgnIHx8XG4gICAgICAhIXRoaXMub3B0aW9ucy5kaXNwbGF5RmxleCB8fFxuICAgICAgdGhpcy5vcHRpb25zLmRpc3BsYXkgPT09ICdmbGV4J1xuICAgIC8vIGlmIChhdHRyaWJ1dGUgIT09ICdmbGV4JyAmJiAhZmxleEFjdGl2ZSkgeyByZXR1cm4gbnVsbDsgfVxuICAgIHN3aXRjaCAoYXR0cmlidXRlKSB7XG4gICAgICBjYXNlICdpcy1mbGV4JzpcbiAgICAgICAgcmV0dXJuIGZsZXhBY3RpdmVcbiAgICAgIGNhc2UgJ2Rpc3BsYXknOlxuICAgICAgICByZXR1cm4gZmxleEFjdGl2ZSA/ICdmbGV4JyA6ICdpbml0aWFsJ1xuICAgICAgY2FzZSAnZmxleC1kaXJlY3Rpb24nOlxuICAgICAgY2FzZSAnZmxleC13cmFwJzpcbiAgICAgICAgY29uc3QgaW5kZXggPSBbJ2ZsZXgtZGlyZWN0aW9uJywgJ2ZsZXgtd3JhcCddLmluZGV4T2YoYXR0cmlidXRlKVxuICAgICAgICByZXR1cm4gKHRoaXMub3B0aW9uc1snZmxleC1mbG93J10gfHwgJycpLnNwbGl0KC9cXHMrLylbaW5kZXhdIHx8XG4gICAgICAgICAgdGhpcy5vcHRpb25zW2F0dHJpYnV0ZV0gfHwgWydjb2x1bW4nLCAnbm93cmFwJ11baW5kZXhdXG4gICAgICBjYXNlICdqdXN0aWZ5LWNvbnRlbnQnOlxuICAgICAgY2FzZSAnYWxpZ24taXRlbXMnOlxuICAgICAgY2FzZSAnYWxpZ24tY29udGVudCc6XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnNbYXR0cmlidXRlXVxuICAgICAgY2FzZSAnbGF5b3V0JzpcbiAgICAgICAgcmV0dXJuICh0aGlzLm9wdGlvbnMuZnhMYXlvdXQgfHwgJ3JvdycpICtcbiAgICAgICAgdGhpcy5vcHRpb25zLmZ4TGF5b3V0V3JhcCA/ICcgJyArIHRoaXMub3B0aW9ucy5meExheW91dFdyYXAgOiAnJ1xuICAgIH1cbiAgfVxufVxuIl19