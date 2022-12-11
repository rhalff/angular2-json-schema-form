import { Injectable } from '@angular/core';
import { Framework } from '@ngsf/common';
import { Bootstrap3FrameworkComponent } from './bootstrap3-framework.component';
import * as i0 from "@angular/core";
export class Bootstrap3Framework extends Framework {
    constructor() {
        super(...arguments);
        this.name = 'bootstrap-3';
        this.framework = Bootstrap3FrameworkComponent;
        this.stylesheets = [
            '//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
            '//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css',
        ];
        this.scripts = [
            '//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js',
            '//ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js',
            '//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
        ];
    }
}
Bootstrap3Framework.ɵfac = function () { let ɵBootstrap3Framework_BaseFactory; return function Bootstrap3Framework_Factory(t) { return (ɵBootstrap3Framework_BaseFactory || (ɵBootstrap3Framework_BaseFactory = i0.ɵɵgetInheritedFactory(Bootstrap3Framework)))(t || Bootstrap3Framework); }; }();
Bootstrap3Framework.ɵprov = i0.ɵɵdefineInjectable({ token: Bootstrap3Framework, factory: Bootstrap3Framework.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Bootstrap3Framework, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwMy1mcmFtZXdvcmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLWJvb3RzdHJhcDMtZnJhbWV3b3JrL3NyYy9saWIvYm9vdHN0cmFwMy1mcmFtZXdvcmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUMxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBRXhDLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGtDQUFrQyxDQUFBOztBQUcvRSxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsU0FBUztJQURsRDs7UUFFRSxTQUFJLEdBQUcsYUFBYSxDQUFBO1FBRXBCLGNBQVMsR0FBRyw0QkFBNEIsQ0FBQTtRQUV4QyxnQkFBVyxHQUFHO1lBQ1osaUVBQWlFO1lBQ2pFLHVFQUF1RTtTQUN4RSxDQUFBO1FBRUQsWUFBTyxHQUFHO1lBQ1IsNERBQTREO1lBQzVELGtFQUFrRTtZQUNsRSwrREFBK0Q7U0FDaEUsQ0FBQTtLQUNGOzt5T0FmWSxtQkFBbUIsU0FBbkIsbUJBQW1COzJEQUFuQixtQkFBbUIsV0FBbkIsbUJBQW1CO3VGQUFuQixtQkFBbUI7Y0FEL0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHsgRnJhbWV3b3JrIH0gZnJvbSAnQG5nc2YvY29tbW9uJ1xuXG5pbXBvcnQgeyBCb290c3RyYXAzRnJhbWV3b3JrQ29tcG9uZW50IH0gZnJvbSAnLi9ib290c3RyYXAzLWZyYW1ld29yay5jb21wb25lbnQnXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCb290c3RyYXAzRnJhbWV3b3JrIGV4dGVuZHMgRnJhbWV3b3JrIHtcbiAgbmFtZSA9ICdib290c3RyYXAtMydcblxuICBmcmFtZXdvcmsgPSBCb290c3RyYXAzRnJhbWV3b3JrQ29tcG9uZW50XG5cbiAgc3R5bGVzaGVldHMgPSBbXG4gICAgJy8vbWF4Y2RuLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN0cmFwLzMuMy43L2Nzcy9ib290c3RyYXAubWluLmNzcycsXG4gICAgJy8vbWF4Y2RuLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN0cmFwLzMuMy43L2Nzcy9ib290c3RyYXAtdGhlbWUubWluLmNzcycsXG4gIF1cblxuICBzY3JpcHRzID0gW1xuICAgICcvL2FqYXguZ29vZ2xlYXBpcy5jb20vYWpheC9saWJzL2pxdWVyeS8yLjIuNC9qcXVlcnkubWluLmpzJyxcbiAgICAnLy9hamF4Lmdvb2dsZWFwaXMuY29tL2FqYXgvbGlicy9qcXVlcnl1aS8xLjEyLjEvanF1ZXJ5LXVpLm1pbi5qcycsXG4gICAgJy8vbWF4Y2RuLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN0cmFwLzMuMy43L2pzL2Jvb3RzdHJhcC5taW4uanMnLFxuICBdXG59XG4iXX0=