import { Inject, Injectable } from '@angular/core';
import { WidgetLibraryService } from './widget-library.service';
import { hasOwn, Framework } from '@ngsf/common';
var FrameworkLibraryService = (function () {
    function FrameworkLibraryService(frameworks, widgetLibrary) {
        var _this = this;
        this.frameworks = frameworks;
        this.widgetLibrary = widgetLibrary;
        this.activeFramework = null;
        this.loadExternalAssets = false;
        this.frameworkLibrary = {};
        this.frameworks.forEach((function (framework) {
            return _this.frameworkLibrary[framework.name] = framework;
        }));
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
    FrameworkLibraryService.decorators = [
        { type: Injectable }
    ];
    FrameworkLibraryService.ctorParameters = function () { return [
        { type: Array, decorators: [{ type: Inject, args: [Framework,] }] },
        { type: WidgetLibraryService, decorators: [{ type: Inject, args: [WidgetLibraryService,] }] }
    ]; };
    return FrameworkLibraryService;
}());
export { FrameworkLibraryService };
if (false) {
    FrameworkLibraryService.prototype.activeFramework;
    FrameworkLibraryService.prototype.stylesheets;
    FrameworkLibraryService.prototype.scripts;
    FrameworkLibraryService.prototype.loadExternalAssets;
    FrameworkLibraryService.prototype.defaultFramework;
    FrameworkLibraryService.prototype.frameworkLibrary;
    FrameworkLibraryService.prototype.frameworks;
    FrameworkLibraryService.prototype.widgetLibrary;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWV3b3JrLWxpYnJhcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL3dpZGdldC1saWJyYXJ5LyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2ZyYW1ld29yay1saWJyYXJ5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUE7QUFDaEQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMEJBQTBCLENBQUE7QUFDN0QsT0FBTyxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFVOUM7SUFTRSxpQ0FDNkIsVUFBaUIsRUFDTixhQUFtQztRQUYzRSxpQkFTQztRQVI0QixlQUFVLEdBQVYsVUFBVSxDQUFPO1FBQ04sa0JBQWEsR0FBYixhQUFhLENBQXNCO1FBVDNFLG9CQUFlLEdBQWMsSUFBSSxDQUFBO1FBR2pDLHVCQUFrQixHQUFHLEtBQUssQ0FBQTtRQUUxQixxQkFBZ0IsR0FBa0MsRUFBRSxDQUFBO1FBTWxELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFDLFVBQUEsU0FBUztZQUMvQixPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUztRQUFqRCxDQUFpRCxFQUNsRCxDQUFBO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO1FBQy9DLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDMUMsQ0FBQztJQUVNLHVEQUFxQixHQUE1QixVQUE2QixrQkFBeUI7UUFBekIsbUNBQUEsRUFBQSx5QkFBeUI7UUFDcEQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQTtJQUNoRCxDQUFDO0lBRU0sOENBQVksR0FBbkIsVUFDRSxTQUFxRCxFQUNyRCxrQkFBNEM7UUFENUMsMEJBQUEsRUFBQSxZQUFnQyxJQUFJLENBQUMsZ0JBQWdCO1FBQ3JELG1DQUFBLEVBQUEscUJBQXFCLElBQUksQ0FBQyxrQkFBa0I7UUFFNUMsSUFBSSxDQUFDLGVBQWU7WUFDbEIsT0FBTyxTQUFTLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDN0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLE9BQU8sU0FBUyxLQUFLLFFBQVEsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQy9ELFNBQVMsQ0FBQyxDQUFDO29CQUNYLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUNsRCxPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7SUFDNUQsQ0FBQztJQUVELDBEQUF3QixHQUF4QixVQUF5QixTQUFvQjtRQUMzQyxPQUFPLE1BQU0sQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxhQUFhLENBQUMsMEJBQTBCLEVBQUUsQ0FBQTtJQUNuRCxDQUFDO0lBRU0sOENBQVksR0FBbkIsVUFBb0IsSUFBWTtRQUM5QixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDNUMsQ0FBQztJQUVNLDhDQUFZLEdBQW5CO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDbkM7UUFDRCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFBO0lBQ3ZDLENBQUM7SUFFTSxxREFBbUIsR0FBMUI7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQTtJQUMzQyxDQUFDO0lBRU0seURBQXVCLEdBQTlCLFVBQStCLElBQXVDO1FBQXZDLHFCQUFBLEVBQUEsT0FBZ0IsSUFBSSxDQUFDLGtCQUFrQjtRQUNwRSxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ3pELENBQUM7SUFFTSxxREFBbUIsR0FBMUIsVUFBMkIsSUFBdUM7UUFBdkMscUJBQUEsRUFBQSxPQUFnQixJQUFJLENBQUMsa0JBQWtCO1FBQ2hFLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDckQsQ0FBQzs7Z0JBaEVGLFVBQVU7Ozs0Q0FVTixNQUFNLFNBQUMsU0FBUztnQkFyQmIsb0JBQW9CLHVCQXNCdkIsTUFBTSxTQUFDLG9CQUFvQjs7SUFzRGhDLDhCQUFDO0NBQUEsQUFqRUQsSUFpRUM7U0FoRVksdUJBQXVCOztJQUNsQyxrREFBaUM7SUFDakMsOENBQW1EO0lBQ25ELDBDQUE0QjtJQUM1QixxREFBMEI7SUFDMUIsbURBQXdCO0lBQ3hCLG1EQUFvRDtJQUdsRCw2Q0FBNEM7SUFDNUMsZ0RBQXlFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge1dpZGdldExpYnJhcnlTZXJ2aWNlfSBmcm9tICcuL3dpZGdldC1saWJyYXJ5LnNlcnZpY2UnXG5pbXBvcnQge2hhc093biwgRnJhbWV3b3JrfSBmcm9tICdAbmdzZi9jb21tb24nXG5cbi8vIFBvc3NpYmxlIGZ1dHVyZSBmcmFtZXdvcmtzOlxuLy8gLSBGb3VuZGF0aW9uIDY6XG4vLyAgIGh0dHA6Ly9qdXN0aW5kYXZpcy5jby8yMDE3LzA2LzE1L3VzaW5nLWZvdW5kYXRpb24tNi1pbi1hbmd1bGFyLTQvXG4vLyAgIGh0dHBzOi8vZ2l0aHViLmNvbS96dXJiL2ZvdW5kYXRpb24tc2l0ZXNcbi8vIC0gU2VtYW50aWMgVUk6XG4vLyAgIGh0dHBzOi8vZ2l0aHViLmNvbS9lZGNhcnJvbGwvbmcyLXNlbWFudGljLXVpXG4vLyAgIGh0dHBzOi8vZ2l0aHViLmNvbS92bGFkb3Rlc2Fub3ZpYy9uZ1NlbWFudGljXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGcmFtZXdvcmtMaWJyYXJ5U2VydmljZSB7XG4gIGFjdGl2ZUZyYW1ld29yazogRnJhbWV3b3JrID0gbnVsbFxuICBzdHlsZXNoZWV0czogKEhUTUxTdHlsZUVsZW1lbnQgfCBIVE1MTGlua0VsZW1lbnQpW11cbiAgc2NyaXB0czogSFRNTFNjcmlwdEVsZW1lbnRbXVxuICBsb2FkRXh0ZXJuYWxBc3NldHMgPSBmYWxzZVxuICBkZWZhdWx0RnJhbWV3b3JrOiBzdHJpbmdcbiAgZnJhbWV3b3JrTGlicmFyeTogeyBbbmFtZTogc3RyaW5nXTogRnJhbWV3b3JrIH0gPSB7fVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRnJhbWV3b3JrKSBwcml2YXRlIGZyYW1ld29ya3M6IGFueVtdLFxuICAgIEBJbmplY3QoV2lkZ2V0TGlicmFyeVNlcnZpY2UpIHByaXZhdGUgd2lkZ2V0TGlicmFyeTogV2lkZ2V0TGlicmFyeVNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5mcmFtZXdvcmtzLmZvckVhY2goZnJhbWV3b3JrID0+XG4gICAgICB0aGlzLmZyYW1ld29ya0xpYnJhcnlbZnJhbWV3b3JrLm5hbWVdID0gZnJhbWV3b3JrXG4gICAgKVxuICAgIHRoaXMuZGVmYXVsdEZyYW1ld29yayA9IHRoaXMuZnJhbWV3b3Jrc1swXS5uYW1lXG4gICAgdGhpcy5zZXRGcmFtZXdvcmsodGhpcy5kZWZhdWx0RnJhbWV3b3JrKVxuICB9XG5cbiAgcHVibGljIHNldExvYWRFeHRlcm5hbEFzc2V0cyhsb2FkRXh0ZXJuYWxBc3NldHMgPSB0cnVlKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkRXh0ZXJuYWxBc3NldHMgPSAhIWxvYWRFeHRlcm5hbEFzc2V0c1xuICB9XG5cbiAgcHVibGljIHNldEZyYW1ld29yayhcbiAgICBmcmFtZXdvcms6IHN0cmluZyB8IEZyYW1ld29yayA9IHRoaXMuZGVmYXVsdEZyYW1ld29yayxcbiAgICBsb2FkRXh0ZXJuYWxBc3NldHMgPSB0aGlzLmxvYWRFeHRlcm5hbEFzc2V0c1xuICApOiBib29sZWFuIHtcbiAgICB0aGlzLmFjdGl2ZUZyYW1ld29yayA9XG4gICAgICB0eXBlb2YgZnJhbWV3b3JrID09PSAnc3RyaW5nJyAmJiB0aGlzLmhhc0ZyYW1ld29yayhmcmFtZXdvcmspID9cbiAgICAgICAgdGhpcy5mcmFtZXdvcmtMaWJyYXJ5W2ZyYW1ld29ya10gOlxuICAgICAgICB0eXBlb2YgZnJhbWV3b3JrID09PSAnb2JqZWN0JyAmJiBoYXNPd24oZnJhbWV3b3JrLCAnZnJhbWV3b3JrJykgP1xuICAgICAgICAgIGZyYW1ld29yayA6XG4gICAgICAgICAgdGhpcy5mcmFtZXdvcmtMaWJyYXJ5W3RoaXMuZGVmYXVsdEZyYW1ld29ya11cbiAgICByZXR1cm4gdGhpcy5yZWdpc3RlckZyYW1ld29ya1dpZGdldHModGhpcy5hY3RpdmVGcmFtZXdvcmspXG4gIH1cblxuICByZWdpc3RlckZyYW1ld29ya1dpZGdldHMoZnJhbWV3b3JrOiBGcmFtZXdvcmspOiBib29sZWFuIHtcbiAgICByZXR1cm4gaGFzT3duKGZyYW1ld29yaywgJ3dpZGdldHMnKSA/XG4gICAgICB0aGlzLndpZGdldExpYnJhcnkucmVnaXN0ZXJGcmFtZXdvcmtXaWRnZXRzKGZyYW1ld29yay53aWRnZXRzKSA6XG4gICAgICB0aGlzLndpZGdldExpYnJhcnkudW5SZWdpc3RlckZyYW1ld29ya1dpZGdldHMoKVxuICB9XG5cbiAgcHVibGljIGhhc0ZyYW1ld29yayh0eXBlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaGFzT3duKHRoaXMuZnJhbWV3b3JrTGlicmFyeSwgdHlwZSlcbiAgfVxuXG4gIHB1YmxpYyBnZXRGcmFtZXdvcmsoKTogYW55IHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlRnJhbWV3b3JrKSB7XG4gICAgICB0aGlzLnNldEZyYW1ld29yaygnZGVmYXVsdCcsIHRydWUpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLmFjdGl2ZUZyYW1ld29yay5mcmFtZXdvcmtcbiAgfVxuXG4gIHB1YmxpYyBnZXRGcmFtZXdvcmtXaWRnZXRzKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlRnJhbWV3b3JrLndpZGdldHMgfHwge31cbiAgfVxuXG4gIHB1YmxpYyBnZXRGcmFtZXdvcmtTdHlsZXNoZWV0cyhsb2FkOiBib29sZWFuID0gdGhpcy5sb2FkRXh0ZXJuYWxBc3NldHMpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIChsb2FkICYmIHRoaXMuYWN0aXZlRnJhbWV3b3JrLnN0eWxlc2hlZXRzKSB8fCBbXVxuICB9XG5cbiAgcHVibGljIGdldEZyYW1ld29ya1NjcmlwdHMobG9hZDogYm9vbGVhbiA9IHRoaXMubG9hZEV4dGVybmFsQXNzZXRzKTogc3RyaW5nW10ge1xuICAgIHJldHVybiAobG9hZCAmJiB0aGlzLmFjdGl2ZUZyYW1ld29yay5zY3JpcHRzKSB8fCBbXVxuICB9XG59XG4iXX0=