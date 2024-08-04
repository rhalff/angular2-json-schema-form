import { Injectable } from '@angular/core';
import { Framework } from '@ngsf/common';
import { Bootstrap5FrameworkComponent } from './bootstrap5-framework.component';
import * as i0 from "@angular/core";
class Bootstrap5Framework extends Framework {
    name = 'bootstrap-5';
    framework = Bootstrap5FrameworkComponent;
    stylesheets = [
        '//cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
    ];
    scripts = [
        '//cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js',
        '//cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'
    ];
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap5Framework, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap5Framework });
}
export { Bootstrap5Framework };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: Bootstrap5Framework, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwNS1mcmFtZXdvcmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3NmLWJvb3RzdHJhcDUtZnJhbWV3b3JrL3NyYy9saWIvYm9vdHN0cmFwNS1mcmFtZXdvcmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUN4QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBR3RDLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLGtDQUFrQyxDQUFBOztBQUU3RSxNQUNhLG1CQUFvQixTQUFRLFNBQVM7SUFDaEQsSUFBSSxHQUFHLGFBQWEsQ0FBQTtJQUVwQixTQUFTLEdBQUcsNEJBQTRCLENBQUE7SUFFeEMsV0FBVyxHQUFHO1FBQ1osbUVBQW1FO0tBQ3BFLENBQUE7SUFHRCxPQUFPLEdBQUc7UUFDUixxRUFBcUU7UUFDckUsd0VBQXdFO0tBQ3pFLENBQUE7dUdBYlUsbUJBQW1COzJHQUFuQixtQkFBbUI7O1NBQW5CLG1CQUFtQjsyRkFBbkIsbUJBQW1CO2tCQUQvQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtGcmFtZXdvcmt9IGZyb20gJ0BuZ3NmL2NvbW1vbidcbi8vIEJvb3RzdHJhcCA1IEZyYW1ld29ya1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL25nLWJvb3RzdHJhcC9uZy1ib290c3RyYXBcbmltcG9ydCB7Qm9vdHN0cmFwNUZyYW1ld29ya0NvbXBvbmVudH0gZnJvbSAnLi9ib290c3RyYXA1LWZyYW1ld29yay5jb21wb25lbnQnXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCb290c3RyYXA1RnJhbWV3b3JrIGV4dGVuZHMgRnJhbWV3b3JrIHtcbiAgbmFtZSA9ICdib290c3RyYXAtNSdcblxuICBmcmFtZXdvcmsgPSBCb290c3RyYXA1RnJhbWV3b3JrQ29tcG9uZW50XG5cbiAgc3R5bGVzaGVldHMgPSBbXG4gICAgJy8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vYm9vdHN0cmFwQDUuMy4zL2Rpc3QvY3NzL2Jvb3RzdHJhcC5taW4uY3NzJ1xuICBdXG5cblxuICBzY3JpcHRzID0gW1xuICAgICcvL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL0Bwb3BwZXJqcy9jb3JlQDIuMTEuOC9kaXN0L3VtZC9wb3BwZXIubWluLmpzJyxcbiAgICAnLy9jZG4uanNkZWxpdnIubmV0L25wbS9ib290c3RyYXBANS4zLjMvZGlzdC9qcy9ib290c3RyYXAuYnVuZGxlLm1pbi5qcydcbiAgXVxufVxuIl19