import { Injectable } from '@angular/core';
import { Framework } from '@ngsf/common';
import { Bootstrap4FrameworkComponent } from './bootstrap4-framework.component';
import * as i0 from "@angular/core";
class Bootstrap4Framework extends Framework {
    name = 'bootstrap-4';
    framework = Bootstrap4FrameworkComponent;
    stylesheets = [
        '//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css'
    ];
    scripts = [
        '//code.jquery.com/jquery-3.2.1.slim.min.js',
        '//cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js',
        '//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js',
    ];
    static ɵfac = function () { let ɵBootstrap4Framework_BaseFactory; return function Bootstrap4Framework_Factory(t) { return (ɵBootstrap4Framework_BaseFactory || (ɵBootstrap4Framework_BaseFactory = i0.ɵɵgetInheritedFactory(Bootstrap4Framework)))(t || Bootstrap4Framework); }; }();
    static ɵprov = i0.ɵɵdefineInjectable({ token: Bootstrap4Framework, factory: Bootstrap4Framework.ɵfac });
}
export { Bootstrap4Framework };
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Bootstrap4Framework, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwNC1mcmFtZXdvcmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLWJvb3RzdHJhcDQtZnJhbWV3b3JrL3NyYy9saWIvYm9vdHN0cmFwNC1mcmFtZXdvcmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUN4QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBR3RDLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLGtDQUFrQyxDQUFBOztBQUU3RSxNQUNhLG1CQUFvQixTQUFRLFNBQVM7SUFDaEQsSUFBSSxHQUFHLGFBQWEsQ0FBQTtJQUVwQixTQUFTLEdBQUcsNEJBQTRCLENBQUE7SUFFeEMsV0FBVyxHQUFHO1FBQ1osd0VBQXdFO0tBQ3pFLENBQUE7SUFFRCxPQUFPLEdBQUc7UUFDUiw0Q0FBNEM7UUFDNUMscUVBQXFFO1FBQ3JFLHNFQUFzRTtLQUN2RSxDQUFBO2dPQWJVLG1CQUFtQixTQUFuQixtQkFBbUI7a0RBQW5CLG1CQUFtQixXQUFuQixtQkFBbUI7O1NBQW5CLG1CQUFtQjt1RkFBbkIsbUJBQW1CO2NBRC9CLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0ZyYW1ld29ya30gZnJvbSAnQG5nc2YvY29tbW9uJ1xuLy8gQm9vdHN0cmFwIDQgRnJhbWV3b3JrXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcFxuaW1wb3J0IHtCb290c3RyYXA0RnJhbWV3b3JrQ29tcG9uZW50fSBmcm9tICcuL2Jvb3RzdHJhcDQtZnJhbWV3b3JrLmNvbXBvbmVudCdcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDRGcmFtZXdvcmsgZXh0ZW5kcyBGcmFtZXdvcmsge1xuICBuYW1lID0gJ2Jvb3RzdHJhcC00J1xuXG4gIGZyYW1ld29yayA9IEJvb3RzdHJhcDRGcmFtZXdvcmtDb21wb25lbnRcblxuICBzdHlsZXNoZWV0cyA9IFtcbiAgICAnLy9tYXhjZG4uYm9vdHN0cmFwY2RuLmNvbS9ib290c3RyYXAvNC4wLjAtYmV0YS4yL2Nzcy9ib290c3RyYXAubWluLmNzcydcbiAgXVxuXG4gIHNjcmlwdHMgPSBbXG4gICAgJy8vY29kZS5qcXVlcnkuY29tL2pxdWVyeS0zLjIuMS5zbGltLm1pbi5qcycsXG4gICAgJy8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3BvcHBlci5qcy8xLjEyLjMvdW1kL3BvcHBlci5taW4uanMnLFxuICAgICcvL21heGNkbi5ib290c3RyYXBjZG4uY29tL2Jvb3RzdHJhcC80LjAuMC1iZXRhLjIvanMvYm9vdHN0cmFwLm1pbi5qcycsXG4gIF1cbn1cbiJdfQ==