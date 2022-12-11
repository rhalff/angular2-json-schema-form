import * as i0 from '@angular/core';
import { Component, Input, Injectable, NgModule } from '@angular/core';
import { Framework } from '@ngsf/common';
import * as i1 from '@ngsf/widget-library';
import { WidgetLibraryModule } from '@ngsf/widget-library';
import { CommonModule } from '@angular/common';

class NoFrameworkComponent {
}
NoFrameworkComponent.ɵfac = function NoFrameworkComponent_Factory(t) { return new (t || NoFrameworkComponent)(); };
NoFrameworkComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NoFrameworkComponent, selectors: [["no-framework"]], inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, decls: 1, vars: 3, consts: [[3, "dataIndex", "layoutIndex", "layoutNode"]], template: function NoFrameworkComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "select-widget-widget", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("dataIndex", ctx.dataIndex)("layoutIndex", ctx.layoutIndex)("layoutNode", ctx.layoutNode);
    } }, dependencies: [i1.SelectWidgetComponent], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NoFrameworkComponent, [{
        type: Component,
        args: [{
                selector: 'no-framework',
                template: `
      <select-widget-widget
              [dataIndex]="dataIndex"
              [layoutIndex]="layoutIndex"
              [layoutNode]="layoutNode"></select-widget-widget>`,
            }]
    }], null, { layoutNode: [{
            type: Input
        }], layoutIndex: [{
            type: Input
        }], dataIndex: [{
            type: Input
        }] }); })();

class NoFramework extends Framework {
    constructor() {
        super(...arguments);
        this.name = 'no-framework';
        this.framework = NoFrameworkComponent;
    }
}
NoFramework.ɵfac = function () { let ɵNoFramework_BaseFactory; return function NoFramework_Factory(t) { return (ɵNoFramework_BaseFactory || (ɵNoFramework_BaseFactory = i0.ɵɵgetInheritedFactory(NoFramework)))(t || NoFramework); }; }();
NoFramework.ɵprov = i0.ɵɵdefineInjectable({ token: NoFramework, factory: NoFramework.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NoFramework, [{
        type: Injectable
    }], null, null); })();

class NoFrameworkModule {
    static forRoot() {
        return {
            ngModule: NoFrameworkModule,
            providers: [
                {
                    provide: Framework,
                    useClass: NoFramework,
                    multi: true
                }
            ]
        };
    }
}
NoFrameworkModule.ɵfac = function NoFrameworkModule_Factory(t) { return new (t || NoFrameworkModule)(); };
NoFrameworkModule.ɵmod = i0.ɵɵdefineNgModule({ type: NoFrameworkModule });
NoFrameworkModule.ɵinj = i0.ɵɵdefineInjector({ imports: [CommonModule,
        WidgetLibraryModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NoFrameworkModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    WidgetLibraryModule
                ],
                declarations: [NoFrameworkComponent],
                exports: [NoFrameworkComponent],
                entryComponents: [NoFrameworkComponent]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NoFrameworkModule, { declarations: [NoFrameworkComponent], imports: [CommonModule,
        WidgetLibraryModule], exports: [NoFrameworkComponent] }); })();

export { NoFramework, NoFrameworkComponent, NoFrameworkModule };
//# sourceMappingURL=ngsf-no-framework.mjs.map
//# sourceMappingURL=ngsf-no-framework.mjs.map
