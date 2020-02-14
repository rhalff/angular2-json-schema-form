(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ngsf/common'), require('@angular/common'), require('@ngsf/widget-library')) :
    typeof define === 'function' && define.amd ? define('@ngsf/no-framework', ['exports', '@angular/core', '@ngsf/common', '@angular/common', '@ngsf/widget-library'], factory) :
    (global = global || self, factory((global.ngsf = global.ngsf || {}, global.ngsf['no-framework'] = {}), global.ng.core, global.common, global.ng.common, global.widgetLibrary));
}(this, (function (exports, core, common, common$1, widgetLibrary) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var NoFrameworkComponent = (function () {
        function NoFrameworkComponent() {
        }
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], NoFrameworkComponent.prototype, "layoutNode", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], NoFrameworkComponent.prototype, "layoutIndex", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], NoFrameworkComponent.prototype, "dataIndex", void 0);
        NoFrameworkComponent = __decorate([
            core.Component({
                selector: 'no-framework',
                template: "\n      <select-widget-widget\n              [dataIndex]=\"dataIndex\"\n              [layoutIndex]=\"layoutIndex\"\n              [layoutNode]=\"layoutNode\"></select-widget-widget>"
            })
        ], NoFrameworkComponent);
        return NoFrameworkComponent;
    }());

    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var NoFramework = (function (_super) {
        __extends(NoFramework, _super);
        function NoFramework() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.name = 'no-framework';
            _this.framework = NoFrameworkComponent;
            return _this;
        }
        NoFramework = __decorate$1([
            core.Injectable()
        ], NoFramework);
        return NoFramework;
    }(common.Framework));

    var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var NoFrameworkModule = (function () {
        function NoFrameworkModule() {
        }
        NoFrameworkModule_1 = NoFrameworkModule;
        NoFrameworkModule.forRoot = function () {
            return {
                ngModule: NoFrameworkModule_1,
                providers: [
                    {
                        provide: common.Framework,
                        useClass: NoFramework,
                        multi: true
                    }
                ]
            };
        };
        var NoFrameworkModule_1;
        NoFrameworkModule = NoFrameworkModule_1 = __decorate$2([
            core.NgModule({
                imports: [
                    common$1.CommonModule,
                    widgetLibrary.WidgetLibraryModule
                ],
                declarations: [NoFrameworkComponent],
                exports: [NoFrameworkComponent],
                entryComponents: [NoFrameworkComponent]
            })
        ], NoFrameworkModule);
        return NoFrameworkModule;
    }());

    exports.NoFramework = NoFramework;
    exports.NoFrameworkComponent = NoFrameworkComponent;
    exports.NoFrameworkModule = NoFrameworkModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngsf-no-framework.umd.js.map
