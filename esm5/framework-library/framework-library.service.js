import { Inject, Injectable } from '@angular/core';
import { WidgetLibraryService } from '../widget-library/widget-library.service';
import { hasOwn } from '../shared/utility.functions';
import { Framework } from './framework';
// Possible future frameworks:
// - Foundation 6:
//   http://justindavis.co/2017/06/15/using-foundation-6-in-angular-4/
//   https://github.com/zurb/foundation-sites
// - Semantic UI:
//   https://github.com/edcarroll/ng2-semantic-ui
//   https://github.com/vladotesanovic/ngSemantic
var FrameworkLibraryService = /** @class */ (function () {
    function FrameworkLibraryService(frameworks, widgetLibrary) {
        var _this = this;
        this.frameworks = frameworks;
        this.widgetLibrary = widgetLibrary;
        this.activeFramework = null;
        this.loadExternalAssets = false;
        this.frameworkLibrary = {};
        this.frameworks.forEach(function (framework) { return _this.frameworkLibrary[framework.name] = framework; });
        this.defaultFramework = this.frameworks[0].name;
        this.setFramework(this.defaultFramework);
    }
    FrameworkLibraryService.prototype.setLoadExternalAssets = function (loadExternalAssets) {
        if (loadExternalAssets === void 0) { loadExternalAssets = true; }
        this.loadExternalAssets = !!loadExternalAssets;
    };
    FrameworkLibraryService.prototype.setFramework = function (framework, loadExternalAssets) {
        if (framework === void 0) { framework = this.defaultFramework; }
        if (loadExternalAssets === void 0) { loadExternalAssets = this.loadExternalAssets; }
        this.activeFramework =
            typeof framework === 'string' && this.hasFramework(framework) ?
                this.frameworkLibrary[framework] :
                typeof framework === 'object' && hasOwn(framework, 'framework') ?
                    framework :
                    this.frameworkLibrary[this.defaultFramework];
        return this.registerFrameworkWidgets(this.activeFramework);
    };
    FrameworkLibraryService.prototype.registerFrameworkWidgets = function (framework) {
        return hasOwn(framework, 'widgets') ?
            this.widgetLibrary.registerFrameworkWidgets(framework.widgets) :
            this.widgetLibrary.unRegisterFrameworkWidgets();
    };
    FrameworkLibraryService.prototype.hasFramework = function (type) {
        return hasOwn(this.frameworkLibrary, type);
    };
    FrameworkLibraryService.prototype.getFramework = function () {
        if (!this.activeFramework) {
            this.setFramework('default', true);
        }
        return this.activeFramework.framework;
    };
    FrameworkLibraryService.prototype.getFrameworkWidgets = function () {
        return this.activeFramework.widgets || {};
    };
    FrameworkLibraryService.prototype.getFrameworkStylesheets = function (load) {
        if (load === void 0) { load = this.loadExternalAssets; }
        return (load && this.activeFramework.stylesheets) || [];
    };
    FrameworkLibraryService.prototype.getFrameworkScripts = function (load) {
        if (load === void 0) { load = this.loadExternalAssets; }
        return (load && this.activeFramework.scripts) || [];
    };
    return FrameworkLibraryService;
}());
export { FrameworkLibraryService };
FrameworkLibraryService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FrameworkLibraryService.ctorParameters = function () { return [
    { type: Array, decorators: [{ type: Inject, args: [Framework,] },] },
    { type: WidgetLibraryService, decorators: [{ type: Inject, args: [WidgetLibraryService,] },] },
]; };
//# sourceMappingURL=framework-library.service.js.map
