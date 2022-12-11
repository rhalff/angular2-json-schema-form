import { Injectable } from '@angular/core';
import { Framework } from '@ngsf/common';
import { Bootstrap4FrameworkComponent } from './bootstrap4-framework.component';
import * as i0 from "@angular/core";
export class Bootstrap4Framework extends Framework {
    constructor() {
        super(...arguments);
        this.name = 'bootstrap-4';
        this.framework = Bootstrap4FrameworkComponent;
        this.stylesheets = [
            '//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css'
        ];
        this.scripts = [
            '//code.jquery.com/jquery-3.2.1.slim.min.js',
            '//cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js',
            '//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js',
        ];
    }
}
Bootstrap4Framework.ɵfac = function () { let ɵBootstrap4Framework_BaseFactory; return function Bootstrap4Framework_Factory(t) { return (ɵBootstrap4Framework_BaseFactory || (ɵBootstrap4Framework_BaseFactory = i0.ɵɵgetInheritedFactory(Bootstrap4Framework)))(t || Bootstrap4Framework); }; }();
Bootstrap4Framework.ɵprov = i0.ɵɵdefineInjectable({ token: Bootstrap4Framework, factory: Bootstrap4Framework.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Bootstrap4Framework, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwNC1mcmFtZXdvcmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLWJvb3RzdHJhcDQtZnJhbWV3b3JrL3NyYy9saWIvYm9vdHN0cmFwNC1mcmFtZXdvcmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUN4QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBR3RDLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLGtDQUFrQyxDQUFBOztBQUc3RSxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsU0FBUztJQURsRDs7UUFFRSxTQUFJLEdBQUcsYUFBYSxDQUFBO1FBRXBCLGNBQVMsR0FBRyw0QkFBNEIsQ0FBQTtRQUV4QyxnQkFBVyxHQUFHO1lBQ1osd0VBQXdFO1NBQ3pFLENBQUE7UUFFRCxZQUFPLEdBQUc7WUFDUiw0Q0FBNEM7WUFDNUMscUVBQXFFO1lBQ3JFLHNFQUFzRTtTQUN2RSxDQUFBO0tBQ0Y7O3lPQWRZLG1CQUFtQixTQUFuQixtQkFBbUI7MkRBQW5CLG1CQUFtQixXQUFuQixtQkFBbUI7dUZBQW5CLG1CQUFtQjtjQUQvQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtGcmFtZXdvcmt9IGZyb20gJ0BuZ3NmL2NvbW1vbidcbi8vIEJvb3RzdHJhcCA0IEZyYW1ld29ya1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL25nLWJvb3RzdHJhcC9uZy1ib290c3RyYXBcbmltcG9ydCB7Qm9vdHN0cmFwNEZyYW1ld29ya0NvbXBvbmVudH0gZnJvbSAnLi9ib290c3RyYXA0LWZyYW1ld29yay5jb21wb25lbnQnXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCb290c3RyYXA0RnJhbWV3b3JrIGV4dGVuZHMgRnJhbWV3b3JrIHtcbiAgbmFtZSA9ICdib290c3RyYXAtNCdcblxuICBmcmFtZXdvcmsgPSBCb290c3RyYXA0RnJhbWV3b3JrQ29tcG9uZW50XG5cbiAgc3R5bGVzaGVldHMgPSBbXG4gICAgJy8vbWF4Y2RuLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN0cmFwLzQuMC4wLWJldGEuMi9jc3MvYm9vdHN0cmFwLm1pbi5jc3MnXG4gIF1cblxuICBzY3JpcHRzID0gW1xuICAgICcvL2NvZGUuanF1ZXJ5LmNvbS9qcXVlcnktMy4yLjEuc2xpbS5taW4uanMnLFxuICAgICcvL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9wb3BwZXIuanMvMS4xMi4zL3VtZC9wb3BwZXIubWluLmpzJyxcbiAgICAnLy9tYXhjZG4uYm9vdHN0cmFwY2RuLmNvbS9ib290c3RyYXAvNC4wLjAtYmV0YS4yL2pzL2Jvb3RzdHJhcC5taW4uanMnLFxuICBdXG59XG4iXX0=