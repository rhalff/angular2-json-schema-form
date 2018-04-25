import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
var SectionComponent = /** @class */ (function () {
    function SectionComponent(jsf) {
        this.jsf = jsf;
        this.expanded = true;
    }
    Object.defineProperty(SectionComponent.prototype, "sectionTitle", {
        get: function () {
            return this.options.notitle ? null : this.jsf.setItemTitle(this);
        },
        enumerable: true,
        configurable: true
    });
    SectionComponent.prototype.ngOnInit = function () {
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
                // 'div', 'flex', 'section', 'conditional', 'actions', 'tagsinput'
                this.containerType = 'div';
                break;
        }
    };
    SectionComponent.prototype.toggleExpanded = function () {
        if (this.options.expandable) {
            this.expanded = !this.expanded;
        }
    };
    // Set attributes for flexbox container
    // (child attributes are set in root.component)
    SectionComponent.prototype.getFlexAttribute = function (attribute) {
        var flexActive = this.layoutNode.type === 'flex' ||
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
                var index = ['flex-direction', 'flex-wrap'].indexOf(attribute);
                return (this.options['flex-flow'] || '').split(/\s+/)[index] ||
                    this.options[attribute] || ['column', 'nowrap'][index];
            case 'justify-content':
            case 'align-items':
            case 'align-content':
                return this.options[attribute];
        }
    };
    return SectionComponent;
}());
export { SectionComponent };
SectionComponent.decorators = [
    { type: Component, args: [{
                selector: 'section-widget',
                template: "\n    <div *ngIf=\"containerType === 'div'\"\n      [class]=\"options?.htmlClass || ''\"\n      [class.expandable]=\"options?.expandable && !expanded\"\n      [class.expanded]=\"options?.expandable && expanded\">\n      <label *ngIf=\"sectionTitle\"\n        class=\"legend\"\n        [class]=\"options?.labelHtmlClass || ''\"\n        [innerHTML]=\"sectionTitle\"\n        (click)=\"toggleExpanded()\"></label>\n      <root-widget *ngIf=\"expanded\"\n        [dataIndex]=\"dataIndex\"\n        [layout]=\"layoutNode.items\"\n        [layoutIndex]=\"layoutIndex\"\n        [isFlexItem]=\"getFlexAttribute('is-flex')\"\n        [isOrderable]=\"options?.orderable\"\n        [class.form-flex-column]=\"getFlexAttribute('flex-direction') === 'column'\"\n        [class.form-flex-row]=\"getFlexAttribute('flex-direction') === 'row'\"\n        [style.align-content]=\"getFlexAttribute('align-content')\"\n        [style.align-items]=\"getFlexAttribute('align-items')\"\n        [style.display]=\"getFlexAttribute('display')\"\n        [style.flex-direction]=\"getFlexAttribute('flex-direction')\"\n        [style.flex-wrap]=\"getFlexAttribute('flex-wrap')\"\n        [style.justify-content]=\"getFlexAttribute('justify-content')\"></root-widget>\n    </div>\n    <fieldset *ngIf=\"containerType === 'fieldset'\"\n      [class]=\"options?.htmlClass || ''\"\n      [class.expandable]=\"options?.expandable && !expanded\"\n      [class.expanded]=\"options?.expandable && expanded\"\n      [disabled]=\"options?.readonly\">\n      <legend *ngIf=\"sectionTitle\"\n        class=\"legend\"\n        [class]=\"options?.labelHtmlClass || ''\"\n        [innerHTML]=\"sectionTitle\"\n        (click)=\"toggleExpanded()\"></legend>\n      <div *ngIf=\"options?.messageLocation !== 'bottom'\">\n        <p *ngIf=\"options?.description\"\n        class=\"help-block\"\n        [class]=\"options?.labelHelpBlockClass || ''\"\n        [innerHTML]=\"options?.description\"></p>\n      </div>\n      <root-widget *ngIf=\"expanded\"\n        [dataIndex]=\"dataIndex\"\n        [layout]=\"layoutNode.items\"\n        [layoutIndex]=\"layoutIndex\"\n        [isFlexItem]=\"getFlexAttribute('is-flex')\"\n        [isOrderable]=\"options?.orderable\"\n        [class.form-flex-column]=\"getFlexAttribute('flex-direction') === 'column'\"\n        [class.form-flex-row]=\"getFlexAttribute('flex-direction') === 'row'\"\n        [style.align-content]=\"getFlexAttribute('align-content')\"\n        [style.align-items]=\"getFlexAttribute('align-items')\"\n        [style.display]=\"getFlexAttribute('display')\"\n        [style.flex-direction]=\"getFlexAttribute('flex-direction')\"\n        [style.flex-wrap]=\"getFlexAttribute('flex-wrap')\"\n        [style.justify-content]=\"getFlexAttribute('justify-content')\"></root-widget>\n      <div *ngIf=\"options?.messageLocation === 'bottom'\">\n        <p *ngIf=\"options?.description\"\n        class=\"help-block\"\n        [class]=\"options?.labelHelpBlockClass || ''\"\n        [innerHTML]=\"options?.description\"></p>\n      </div>\n    </fieldset>",
                styles: ["\n    .legend { font-weight: bold; }\n    .expandable > legend:before, .expandable > label:before  { content: '\u25B6'; padding-right: .3em; }\n    .expanded > legend:before, .expanded > label:before  { content: '\u25BC'; padding-right: .2em; }\n  "],
            },] },
];
/** @nocollapse */
SectionComponent.ctorParameters = function () { return [
    { type: JsonSchemaFormService, },
]; };
SectionComponent.propDecorators = {
    "layoutNode": [{ type: Input },],
    "layoutIndex": [{ type: Input },],
    "dataIndex": [{ type: Input },],
};
//# sourceMappingURL=section.component.js.map
