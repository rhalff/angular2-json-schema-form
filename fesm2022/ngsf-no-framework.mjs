import * as i0 from '@angular/core';
import { Component, Input, Injectable, NgModule } from '@angular/core';
import { Framework } from '@ngsf/common';
import * as i1 from '@ngsf/widget-library';
import { WidgetLibraryModule } from '@ngsf/widget-library';
import { CommonModule } from '@angular/common';

class NoFrameworkComponent {
    layoutNode;
    layoutIndex;
    dataIndex;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NoFrameworkComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: NoFrameworkComponent, selector: "no-framework", inputs: { layoutNode: "layoutNode", layoutIndex: "layoutIndex", dataIndex: "dataIndex" }, ngImport: i0, template: `
      <select-widget-widget
              [dataIndex]="dataIndex"
              [layoutIndex]="layoutIndex"
              [layoutNode]="layoutNode"></select-widget-widget>`, isInline: true, dependencies: [{ kind: "component", type: i1.SelectWidgetComponent, selector: "select-widget-widget", inputs: ["layoutNode", "layoutIndex", "dataIndex"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NoFrameworkComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'no-framework',
                    template: `
      <select-widget-widget
              [dataIndex]="dataIndex"
              [layoutIndex]="layoutIndex"
              [layoutNode]="layoutNode"></select-widget-widget>`,
                }]
        }], propDecorators: { layoutNode: [{
                type: Input
            }], layoutIndex: [{
                type: Input
            }], dataIndex: [{
                type: Input
            }] } });

class NoFramework extends Framework {
    name = 'no-framework';
    framework = NoFrameworkComponent;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NoFramework, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NoFramework });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NoFramework, decorators: [{
            type: Injectable
        }] });

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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NoFrameworkModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.3", ngImport: i0, type: NoFrameworkModule, declarations: [NoFrameworkComponent], imports: [CommonModule,
            WidgetLibraryModule], exports: [NoFrameworkComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NoFrameworkModule, imports: [CommonModule,
            WidgetLibraryModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NoFrameworkModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        WidgetLibraryModule
                    ],
                    declarations: [NoFrameworkComponent],
                    exports: [NoFrameworkComponent]
                }]
        }] });

export { NoFramework, NoFrameworkComponent, NoFrameworkModule };
//# sourceMappingURL=ngsf-no-framework.mjs.map
