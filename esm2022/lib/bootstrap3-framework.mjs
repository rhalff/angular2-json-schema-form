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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap3Framework, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap3Framework });
}
export { Bootstrap3Framework };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap3Framework, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwMy1mcmFtZXdvcmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLWJvb3RzdHJhcDMtZnJhbWV3b3JrL3NyYy9saWIvYm9vdHN0cmFwMy1mcmFtZXdvcmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUMxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBRXhDLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGtDQUFrQyxDQUFBOztBQUUvRSxNQUNhLG1CQUFvQixTQUFRLFNBQVM7SUFDaEQsSUFBSSxHQUFHLGFBQWEsQ0FBQTtJQUVwQixTQUFTLEdBQUcsNEJBQTRCLENBQUE7SUFFeEMsV0FBVyxHQUFHO1FBQ1osaUVBQWlFO1FBQ2pFLHVFQUF1RTtLQUN4RSxDQUFBO0lBRUQsT0FBTyxHQUFHO1FBQ1IsNERBQTREO1FBQzVELGtFQUFrRTtRQUNsRSwrREFBK0Q7S0FDaEUsQ0FBQTt1R0FkVSxtQkFBbUI7MkdBQW5CLG1CQUFtQjs7U0FBbkIsbUJBQW1COzJGQUFuQixtQkFBbUI7a0JBRC9CLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7IEZyYW1ld29yayB9IGZyb20gJ0BuZ3NmL2NvbW1vbidcblxuaW1wb3J0IHsgQm9vdHN0cmFwM0ZyYW1ld29ya0NvbXBvbmVudCB9IGZyb20gJy4vYm9vdHN0cmFwMy1mcmFtZXdvcmsuY29tcG9uZW50J1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwM0ZyYW1ld29yayBleHRlbmRzIEZyYW1ld29yayB7XG4gIG5hbWUgPSAnYm9vdHN0cmFwLTMnXG5cbiAgZnJhbWV3b3JrID0gQm9vdHN0cmFwM0ZyYW1ld29ya0NvbXBvbmVudFxuXG4gIHN0eWxlc2hlZXRzID0gW1xuICAgICcvL21heGNkbi5ib290c3RyYXBjZG4uY29tL2Jvb3RzdHJhcC8zLjMuNy9jc3MvYm9vdHN0cmFwLm1pbi5jc3MnLFxuICAgICcvL21heGNkbi5ib290c3RyYXBjZG4uY29tL2Jvb3RzdHJhcC8zLjMuNy9jc3MvYm9vdHN0cmFwLXRoZW1lLm1pbi5jc3MnLFxuICBdXG5cbiAgc2NyaXB0cyA9IFtcbiAgICAnLy9hamF4Lmdvb2dsZWFwaXMuY29tL2FqYXgvbGlicy9qcXVlcnkvMi4yLjQvanF1ZXJ5Lm1pbi5qcycsXG4gICAgJy8vYWpheC5nb29nbGVhcGlzLmNvbS9hamF4L2xpYnMvanF1ZXJ5dWkvMS4xMi4xL2pxdWVyeS11aS5taW4uanMnLFxuICAgICcvL21heGNkbi5ib290c3RyYXBjZG4uY29tL2Jvb3RzdHJhcC8zLjMuNy9qcy9ib290c3RyYXAubWluLmpzJyxcbiAgXVxufVxuIl19