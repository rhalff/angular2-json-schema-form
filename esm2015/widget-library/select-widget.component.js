import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
export class SelectWidgetComponent {
    constructor(componentFactory, jsf) {
        this.componentFactory = componentFactory;
        this.jsf = jsf;
        this.newComponent = null;
    }
    ngOnInit() {
        this.updateComponent();
    }
    ngOnChanges() {
        this.updateComponent();
    }
    updateComponent() {
        if (!this.newComponent && (this.layoutNode || {}).widget) {
            this.newComponent = this.widgetContainer.createComponent(this.componentFactory.resolveComponentFactory(this.layoutNode.widget));
        }
        if (this.newComponent) {
            for (const input of ['layoutNode', 'layoutIndex', 'dataIndex']) {
                this.newComponent.instance[input] = this[input];
            }
        }
    }
}
SelectWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'select-widget-widget',
                template: `<div #widgetContainer></div>`,
            },] },
];
/** @nocollapse */
SelectWidgetComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver, },
    { type: JsonSchemaFormService, },
];
SelectWidgetComponent.propDecorators = {
    "layoutNode": [{ type: Input },],
    "layoutIndex": [{ type: Input },],
    "dataIndex": [{ type: Input },],
    "widgetContainer": [{ type: ViewChild, args: ['widgetContainer', { read: ViewContainerRef },] },],
};
//# sourceMappingURL=select-widget.component.js.map
