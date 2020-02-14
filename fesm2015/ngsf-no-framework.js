import { Input, Component, Injectable, NgModule } from '@angular/core';
import { Framework } from '@ngsf/common';
import { CommonModule } from '@angular/common';
import { WidgetLibraryModule } from '@ngsf/widget-library';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let NoFrameworkComponent = class NoFrameworkComponent {
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], NoFrameworkComponent.prototype, "layoutNode", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], NoFrameworkComponent.prototype, "layoutIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], NoFrameworkComponent.prototype, "dataIndex", void 0);
NoFrameworkComponent = __decorate([
    Component({
        selector: 'no-framework',
        template: `
      <select-widget-widget
              [dataIndex]="dataIndex"
              [layoutIndex]="layoutIndex"
              [layoutNode]="layoutNode"></select-widget-widget>`
    })
], NoFrameworkComponent);

var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let NoFramework = class NoFramework extends Framework {
    constructor() {
        super(...arguments);
        this.name = 'no-framework';
        this.framework = NoFrameworkComponent;
    }
};
NoFramework = __decorate$1([
    Injectable()
], NoFramework);

var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NoFrameworkModule_1;
let NoFrameworkModule = NoFrameworkModule_1 = class NoFrameworkModule {
    static forRoot() {
        return {
            ngModule: NoFrameworkModule_1,
            providers: [
                {
                    provide: Framework,
                    useClass: NoFramework,
                    multi: true
                }
            ]
        };
    }
};
NoFrameworkModule = NoFrameworkModule_1 = __decorate$2([
    NgModule({
        imports: [
            CommonModule,
            WidgetLibraryModule
        ],
        declarations: [NoFrameworkComponent],
        exports: [NoFrameworkComponent],
        entryComponents: [NoFrameworkComponent]
    })
], NoFrameworkModule);

export { NoFramework, NoFrameworkComponent, NoFrameworkModule };
//# sourceMappingURL=ngsf-no-framework.js.map
