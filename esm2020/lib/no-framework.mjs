import { Injectable } from '@angular/core';
import { Framework } from '@ngsf/common';
import { NoFrameworkComponent } from './no-framework.component';
import * as i0 from "@angular/core";
export class NoFramework extends Framework {
    constructor() {
        super(...arguments);
        this.name = 'no-framework';
        this.framework = NoFrameworkComponent;
    }
}
NoFramework.ɵfac = function () { let ɵNoFramework_BaseFactory; return function NoFramework_Factory(t) { return (ɵNoFramework_BaseFactory || (ɵNoFramework_BaseFactory = i0.ɵɵgetInheritedFactory(NoFramework)))(t || NoFramework); }; }();
NoFramework.ɵprov = i0.ɵɵdefineInjectable({ token: NoFramework, factory: NoFramework.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NoFramework, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tZnJhbWV3b3JrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmdzZi1uby1mcmFtZXdvcmsvc3JjL2xpYi9uby1mcmFtZXdvcmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUN4QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBRXRDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDBCQUEwQixDQUFBOztBQUc3RCxNQUFNLE9BQU8sV0FBWSxTQUFRLFNBQVM7SUFEMUM7O1FBRUUsU0FBSSxHQUFHLGNBQWMsQ0FBQTtRQUVyQixjQUFTLEdBQUcsb0JBQW9CLENBQUE7S0FDakM7O2lNQUpZLFdBQVcsU0FBWCxXQUFXO21EQUFYLFdBQVcsV0FBWCxXQUFXO3VGQUFYLFdBQVc7Y0FEdkIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7RnJhbWV3b3JrfSBmcm9tICdAbmdzZi9jb21tb24nXG4vLyBObyBmcmFtZXdvcmsgLSBwbGFpbiBIVE1MIGNvbnRyb2xzIChzdHlsZXMgZnJvbSBmb3JtIGxheW91dCBvbmx5KVxuaW1wb3J0IHtOb0ZyYW1ld29ya0NvbXBvbmVudH0gZnJvbSAnLi9uby1mcmFtZXdvcmsuY29tcG9uZW50J1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm9GcmFtZXdvcmsgZXh0ZW5kcyBGcmFtZXdvcmsge1xuICBuYW1lID0gJ25vLWZyYW1ld29yaydcblxuICBmcmFtZXdvcmsgPSBOb0ZyYW1ld29ya0NvbXBvbmVudFxufVxuIl19