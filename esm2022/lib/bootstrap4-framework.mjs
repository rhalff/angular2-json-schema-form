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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap4Framework, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap4Framework });
}
export { Bootstrap4Framework };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap4Framework, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwNC1mcmFtZXdvcmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLWJvb3RzdHJhcDQtZnJhbWV3b3JrL3NyYy9saWIvYm9vdHN0cmFwNC1mcmFtZXdvcmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUN4QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBR3RDLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLGtDQUFrQyxDQUFBOztBQUU3RSxNQUNhLG1CQUFvQixTQUFRLFNBQVM7SUFDaEQsSUFBSSxHQUFHLGFBQWEsQ0FBQTtJQUVwQixTQUFTLEdBQUcsNEJBQTRCLENBQUE7SUFFeEMsV0FBVyxHQUFHO1FBQ1osd0VBQXdFO0tBQ3pFLENBQUE7SUFFRCxPQUFPLEdBQUc7UUFDUiw0Q0FBNEM7UUFDNUMscUVBQXFFO1FBQ3JFLHNFQUFzRTtLQUN2RSxDQUFBO3VHQWJVLG1CQUFtQjsyR0FBbkIsbUJBQW1COztTQUFuQixtQkFBbUI7MkZBQW5CLG1CQUFtQjtrQkFEL0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7RnJhbWV3b3JrfSBmcm9tICdAbmdzZi9jb21tb24nXG4vLyBCb290c3RyYXAgNCBGcmFtZXdvcmtcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1ib290c3RyYXAvbmctYm9vdHN0cmFwXG5pbXBvcnQge0Jvb3RzdHJhcDRGcmFtZXdvcmtDb21wb25lbnR9IGZyb20gJy4vYm9vdHN0cmFwNC1mcmFtZXdvcmsuY29tcG9uZW50J1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwNEZyYW1ld29yayBleHRlbmRzIEZyYW1ld29yayB7XG4gIG5hbWUgPSAnYm9vdHN0cmFwLTQnXG5cbiAgZnJhbWV3b3JrID0gQm9vdHN0cmFwNEZyYW1ld29ya0NvbXBvbmVudFxuXG4gIHN0eWxlc2hlZXRzID0gW1xuICAgICcvL21heGNkbi5ib290c3RyYXBjZG4uY29tL2Jvb3RzdHJhcC80LjAuMC1iZXRhLjIvY3NzL2Jvb3RzdHJhcC5taW4uY3NzJ1xuICBdXG5cbiAgc2NyaXB0cyA9IFtcbiAgICAnLy9jb2RlLmpxdWVyeS5jb20vanF1ZXJ5LTMuMi4xLnNsaW0ubWluLmpzJyxcbiAgICAnLy9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvcG9wcGVyLmpzLzEuMTIuMy91bWQvcG9wcGVyLm1pbi5qcycsXG4gICAgJy8vbWF4Y2RuLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN0cmFwLzQuMC4wLWJldGEuMi9qcy9ib290c3RyYXAubWluLmpzJyxcbiAgXVxufVxuIl19