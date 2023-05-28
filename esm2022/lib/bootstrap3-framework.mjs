import { Injectable } from '@angular/core';
import { Framework } from '@ngsf/common';
import { Bootstrap3FrameworkComponent } from './bootstrap3-framework.component';
import * as i0 from "@angular/core";
class Bootstrap3Framework extends Framework {
    name = 'bootstrap-3';
    framework = Bootstrap3FrameworkComponent;
    stylesheets = [
        '//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
        '//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css',
    ];
    scripts = [
        '//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js',
        '//ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js',
        '//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
    ];
    static ɵfac = function () { let ɵBootstrap3Framework_BaseFactory; return function Bootstrap3Framework_Factory(t) { return (ɵBootstrap3Framework_BaseFactory || (ɵBootstrap3Framework_BaseFactory = i0.ɵɵgetInheritedFactory(Bootstrap3Framework)))(t || Bootstrap3Framework); }; }();
    static ɵprov = i0.ɵɵdefineInjectable({ token: Bootstrap3Framework, factory: Bootstrap3Framework.ɵfac });
}
export { Bootstrap3Framework };
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Bootstrap3Framework, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwMy1mcmFtZXdvcmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLWJvb3RzdHJhcDMtZnJhbWV3b3JrL3NyYy9saWIvYm9vdHN0cmFwMy1mcmFtZXdvcmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUMxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBRXhDLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGtDQUFrQyxDQUFBOztBQUUvRSxNQUNhLG1CQUFvQixTQUFRLFNBQVM7SUFDaEQsSUFBSSxHQUFHLGFBQWEsQ0FBQTtJQUVwQixTQUFTLEdBQUcsNEJBQTRCLENBQUE7SUFFeEMsV0FBVyxHQUFHO1FBQ1osaUVBQWlFO1FBQ2pFLHVFQUF1RTtLQUN4RSxDQUFBO0lBRUQsT0FBTyxHQUFHO1FBQ1IsNERBQTREO1FBQzVELGtFQUFrRTtRQUNsRSwrREFBK0Q7S0FDaEUsQ0FBQTtnT0FkVSxtQkFBbUIsU0FBbkIsbUJBQW1CO2tEQUFuQixtQkFBbUIsV0FBbkIsbUJBQW1COztTQUFuQixtQkFBbUI7dUZBQW5CLG1CQUFtQjtjQUQvQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQgeyBGcmFtZXdvcmsgfSBmcm9tICdAbmdzZi9jb21tb24nXG5cbmltcG9ydCB7IEJvb3RzdHJhcDNGcmFtZXdvcmtDb21wb25lbnQgfSBmcm9tICcuL2Jvb3RzdHJhcDMtZnJhbWV3b3JrLmNvbXBvbmVudCdcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDNGcmFtZXdvcmsgZXh0ZW5kcyBGcmFtZXdvcmsge1xuICBuYW1lID0gJ2Jvb3RzdHJhcC0zJ1xuXG4gIGZyYW1ld29yayA9IEJvb3RzdHJhcDNGcmFtZXdvcmtDb21wb25lbnRcblxuICBzdHlsZXNoZWV0cyA9IFtcbiAgICAnLy9tYXhjZG4uYm9vdHN0cmFwY2RuLmNvbS9ib290c3RyYXAvMy4zLjcvY3NzL2Jvb3RzdHJhcC5taW4uY3NzJyxcbiAgICAnLy9tYXhjZG4uYm9vdHN0cmFwY2RuLmNvbS9ib290c3RyYXAvMy4zLjcvY3NzL2Jvb3RzdHJhcC10aGVtZS5taW4uY3NzJyxcbiAgXVxuXG4gIHNjcmlwdHMgPSBbXG4gICAgJy8vYWpheC5nb29nbGVhcGlzLmNvbS9hamF4L2xpYnMvanF1ZXJ5LzIuMi40L2pxdWVyeS5taW4uanMnLFxuICAgICcvL2FqYXguZ29vZ2xlYXBpcy5jb20vYWpheC9saWJzL2pxdWVyeXVpLzEuMTIuMS9qcXVlcnktdWkubWluLmpzJyxcbiAgICAnLy9tYXhjZG4uYm9vdHN0cmFwY2RuLmNvbS9ib290c3RyYXAvMy4zLjcvanMvYm9vdHN0cmFwLm1pbi5qcycsXG4gIF1cbn1cbiJdfQ==