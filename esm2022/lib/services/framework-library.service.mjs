import { Inject, Injectable } from '@angular/core';
import { WidgetLibraryService } from './widget-library.service';
import { hasOwn, Framework } from '@ngsf/common';
import * as i0 from "@angular/core";
import * as i1 from "./widget-library.service";
class FrameworkLibraryService {
    frameworks;
    widgetLibrary;
    activeFramework = null;
    stylesheets;
    scripts;
    loadExternalAssets = false;
    defaultFramework;
    frameworkLibrary = {};
    constructor(frameworks, widgetLibrary) {
        this.frameworks = frameworks;
        this.widgetLibrary = widgetLibrary;
        this.frameworks.forEach(framework => this.frameworkLibrary[framework.name] = framework);
        this.defaultFramework = this.frameworks[0].name;
        this.setFramework(this.defaultFramework);
    }
    setLoadExternalAssets(loadExternalAssets = true) {
        this.loadExternalAssets = !!loadExternalAssets;
    }
    setFramework(framework = this.defaultFramework, loadExternalAssets = this.loadExternalAssets) {
        this.activeFramework =
            typeof framework === 'string' && this.hasFramework(framework) ?
                this.frameworkLibrary[framework] :
                typeof framework === 'object' && hasOwn(framework, 'framework') ?
                    framework :
                    this.frameworkLibrary[this.defaultFramework];
        return this.registerFrameworkWidgets(this.activeFramework);
    }
    registerFrameworkWidgets(framework) {
        return hasOwn(framework, 'widgets') ?
            this.widgetLibrary.registerFrameworkWidgets(framework.widgets) :
            this.widgetLibrary.unRegisterFrameworkWidgets();
    }
    hasFramework(type) {
        return hasOwn(this.frameworkLibrary, type);
    }
    getFramework() {
        if (!this.activeFramework) {
            this.setFramework('default', true);
        }
        return this.activeFramework.framework;
    }
    getFrameworkWidgets() {
        return this.activeFramework.widgets || {};
    }
    getFrameworkStylesheets(load = this.loadExternalAssets) {
        return (load && this.activeFramework.stylesheets) || [];
    }
    getFrameworkScripts(load = this.loadExternalAssets) {
        return (load && this.activeFramework.scripts) || [];
    }
    static ɵfac = function FrameworkLibraryService_Factory(t) { return new (t || FrameworkLibraryService)(i0.ɵɵinject(Framework), i0.ɵɵinject(WidgetLibraryService)); };
    static ɵprov = i0.ɵɵdefineInjectable({ token: FrameworkLibraryService, factory: FrameworkLibraryService.ɵfac });
}
export { FrameworkLibraryService };
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FrameworkLibraryService, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [Framework]
            }] }, { type: i1.WidgetLibraryService, decorators: [{
                type: Inject,
                args: [WidgetLibraryService]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWV3b3JrLWxpYnJhcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nc2Ytd2lkZ2V0LWxpYnJhcnkvc3JjL2xpYi9zZXJ2aWNlcy9mcmFtZXdvcmstbGlicmFyeS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFBO0FBQ2hELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDBCQUEwQixDQUFBO0FBQzdELE9BQU8sRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFBOzs7QUFVOUMsTUFDYSx1QkFBdUI7SUFTTDtJQUNXO0lBVHhDLGVBQWUsR0FBYyxJQUFJLENBQUE7SUFDakMsV0FBVyxDQUF3QztJQUNuRCxPQUFPLENBQXFCO0lBQzVCLGtCQUFrQixHQUFHLEtBQUssQ0FBQTtJQUMxQixnQkFBZ0IsQ0FBUTtJQUN4QixnQkFBZ0IsR0FBa0MsRUFBRSxDQUFBO0lBRXBELFlBQzZCLFVBQWlCLEVBQ04sYUFBbUM7UUFEOUMsZUFBVSxHQUFWLFVBQVUsQ0FBTztRQUNOLGtCQUFhLEdBQWIsYUFBYSxDQUFzQjtRQUV6RSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUNsQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FDbEQsQ0FBQTtRQUNELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtRQUMvQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQzFDLENBQUM7SUFFTSxxQkFBcUIsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJO1FBQ3BELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUMsa0JBQWtCLENBQUE7SUFDaEQsQ0FBQztJQUVNLFlBQVksQ0FDakIsWUFBZ0MsSUFBSSxDQUFDLGdCQUFnQixFQUNyRCxrQkFBa0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCO1FBRTVDLElBQUksQ0FBQyxlQUFlO1lBQ2xCLE9BQU8sU0FBUyxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxPQUFPLFNBQVMsS0FBSyxRQUFRLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUMvRCxTQUFTLENBQUMsQ0FBQztvQkFDWCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDbEQsT0FBTyxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQzVELENBQUM7SUFFRCx3QkFBd0IsQ0FBQyxTQUFvQjtRQUMzQyxPQUFPLE1BQU0sQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxhQUFhLENBQUMsMEJBQTBCLEVBQUUsQ0FBQTtJQUNuRCxDQUFDO0lBRU0sWUFBWSxDQUFDLElBQVk7UUFDOUIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFBO0lBQzVDLENBQUM7SUFFTSxZQUFZO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFBO1NBQ25DO1FBQ0QsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQTtJQUN2QyxDQUFDO0lBRU0sbUJBQW1CO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFBO0lBQzNDLENBQUM7SUFFTSx1QkFBdUIsQ0FBQyxPQUFnQixJQUFJLENBQUMsa0JBQWtCO1FBQ3BFLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDekQsQ0FBQztJQUVNLG1CQUFtQixDQUFDLE9BQWdCLElBQUksQ0FBQyxrQkFBa0I7UUFDaEUsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNyRCxDQUFDO2lGQS9EVSx1QkFBdUIsY0FTeEIsU0FBUyxlQUNULG9CQUFvQjtrREFWbkIsdUJBQXVCLFdBQXZCLHVCQUF1Qjs7U0FBdkIsdUJBQXVCO3VGQUF2Qix1QkFBdUI7Y0FEbkMsVUFBVTs7c0JBVU4sTUFBTTt1QkFBQyxTQUFTOztzQkFDaEIsTUFBTTt1QkFBQyxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7V2lkZ2V0TGlicmFyeVNlcnZpY2V9IGZyb20gJy4vd2lkZ2V0LWxpYnJhcnkuc2VydmljZSdcbmltcG9ydCB7aGFzT3duLCBGcmFtZXdvcmt9IGZyb20gJ0BuZ3NmL2NvbW1vbidcblxuLy8gUG9zc2libGUgZnV0dXJlIGZyYW1ld29ya3M6XG4vLyAtIEZvdW5kYXRpb24gNjpcbi8vICAgaHR0cDovL2p1c3RpbmRhdmlzLmNvLzIwMTcvMDYvMTUvdXNpbmctZm91bmRhdGlvbi02LWluLWFuZ3VsYXItNC9cbi8vICAgaHR0cHM6Ly9naXRodWIuY29tL3p1cmIvZm91bmRhdGlvbi1zaXRlc1xuLy8gLSBTZW1hbnRpYyBVSTpcbi8vICAgaHR0cHM6Ly9naXRodWIuY29tL2VkY2Fycm9sbC9uZzItc2VtYW50aWMtdWlcbi8vICAgaHR0cHM6Ly9naXRodWIuY29tL3ZsYWRvdGVzYW5vdmljL25nU2VtYW50aWNcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZyYW1ld29ya0xpYnJhcnlTZXJ2aWNlIHtcbiAgYWN0aXZlRnJhbWV3b3JrOiBGcmFtZXdvcmsgPSBudWxsXG4gIHN0eWxlc2hlZXRzOiAoSFRNTFN0eWxlRWxlbWVudCB8IEhUTUxMaW5rRWxlbWVudClbXVxuICBzY3JpcHRzOiBIVE1MU2NyaXB0RWxlbWVudFtdXG4gIGxvYWRFeHRlcm5hbEFzc2V0cyA9IGZhbHNlXG4gIGRlZmF1bHRGcmFtZXdvcms6IHN0cmluZ1xuICBmcmFtZXdvcmtMaWJyYXJ5OiB7IFtuYW1lOiBzdHJpbmddOiBGcmFtZXdvcmsgfSA9IHt9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChGcmFtZXdvcmspIHByaXZhdGUgZnJhbWV3b3JrczogYW55W10sXG4gICAgQEluamVjdChXaWRnZXRMaWJyYXJ5U2VydmljZSkgcHJpdmF0ZSB3aWRnZXRMaWJyYXJ5OiBXaWRnZXRMaWJyYXJ5U2VydmljZVxuICApIHtcbiAgICB0aGlzLmZyYW1ld29ya3MuZm9yRWFjaChmcmFtZXdvcmsgPT5cbiAgICAgIHRoaXMuZnJhbWV3b3JrTGlicmFyeVtmcmFtZXdvcmsubmFtZV0gPSBmcmFtZXdvcmtcbiAgICApXG4gICAgdGhpcy5kZWZhdWx0RnJhbWV3b3JrID0gdGhpcy5mcmFtZXdvcmtzWzBdLm5hbWVcbiAgICB0aGlzLnNldEZyYW1ld29yayh0aGlzLmRlZmF1bHRGcmFtZXdvcmspXG4gIH1cblxuICBwdWJsaWMgc2V0TG9hZEV4dGVybmFsQXNzZXRzKGxvYWRFeHRlcm5hbEFzc2V0cyA9IHRydWUpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRFeHRlcm5hbEFzc2V0cyA9ICEhbG9hZEV4dGVybmFsQXNzZXRzXG4gIH1cblxuICBwdWJsaWMgc2V0RnJhbWV3b3JrKFxuICAgIGZyYW1ld29yazogc3RyaW5nIHwgRnJhbWV3b3JrID0gdGhpcy5kZWZhdWx0RnJhbWV3b3JrLFxuICAgIGxvYWRFeHRlcm5hbEFzc2V0cyA9IHRoaXMubG9hZEV4dGVybmFsQXNzZXRzXG4gICk6IGJvb2xlYW4ge1xuICAgIHRoaXMuYWN0aXZlRnJhbWV3b3JrID1cbiAgICAgIHR5cGVvZiBmcmFtZXdvcmsgPT09ICdzdHJpbmcnICYmIHRoaXMuaGFzRnJhbWV3b3JrKGZyYW1ld29yaykgP1xuICAgICAgICB0aGlzLmZyYW1ld29ya0xpYnJhcnlbZnJhbWV3b3JrXSA6XG4gICAgICAgIHR5cGVvZiBmcmFtZXdvcmsgPT09ICdvYmplY3QnICYmIGhhc093bihmcmFtZXdvcmssICdmcmFtZXdvcmsnKSA/XG4gICAgICAgICAgZnJhbWV3b3JrIDpcbiAgICAgICAgICB0aGlzLmZyYW1ld29ya0xpYnJhcnlbdGhpcy5kZWZhdWx0RnJhbWV3b3JrXVxuICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyRnJhbWV3b3JrV2lkZ2V0cyh0aGlzLmFjdGl2ZUZyYW1ld29yaylcbiAgfVxuXG4gIHJlZ2lzdGVyRnJhbWV3b3JrV2lkZ2V0cyhmcmFtZXdvcms6IEZyYW1ld29yayk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBoYXNPd24oZnJhbWV3b3JrLCAnd2lkZ2V0cycpID9cbiAgICAgIHRoaXMud2lkZ2V0TGlicmFyeS5yZWdpc3RlckZyYW1ld29ya1dpZGdldHMoZnJhbWV3b3JrLndpZGdldHMpIDpcbiAgICAgIHRoaXMud2lkZ2V0TGlicmFyeS51blJlZ2lzdGVyRnJhbWV3b3JrV2lkZ2V0cygpXG4gIH1cblxuICBwdWJsaWMgaGFzRnJhbWV3b3JrKHR5cGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBoYXNPd24odGhpcy5mcmFtZXdvcmtMaWJyYXJ5LCB0eXBlKVxuICB9XG5cbiAgcHVibGljIGdldEZyYW1ld29yaygpOiBhbnkge1xuICAgIGlmICghdGhpcy5hY3RpdmVGcmFtZXdvcmspIHtcbiAgICAgIHRoaXMuc2V0RnJhbWV3b3JrKCdkZWZhdWx0JywgdHJ1ZSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlRnJhbWV3b3JrLmZyYW1ld29ya1xuICB9XG5cbiAgcHVibGljIGdldEZyYW1ld29ya1dpZGdldHMoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVGcmFtZXdvcmsud2lkZ2V0cyB8fCB7fVxuICB9XG5cbiAgcHVibGljIGdldEZyYW1ld29ya1N0eWxlc2hlZXRzKGxvYWQ6IGJvb2xlYW4gPSB0aGlzLmxvYWRFeHRlcm5hbEFzc2V0cyk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gKGxvYWQgJiYgdGhpcy5hY3RpdmVGcmFtZXdvcmsuc3R5bGVzaGVldHMpIHx8IFtdXG4gIH1cblxuICBwdWJsaWMgZ2V0RnJhbWV3b3JrU2NyaXB0cyhsb2FkOiBib29sZWFuID0gdGhpcy5sb2FkRXh0ZXJuYWxBc3NldHMpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIChsb2FkICYmIHRoaXMuYWN0aXZlRnJhbWV3b3JrLnNjcmlwdHMpIHx8IFtdXG4gIH1cbn1cbiJdfQ==