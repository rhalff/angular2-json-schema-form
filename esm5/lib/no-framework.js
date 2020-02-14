var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Framework } from '@ngsf/common';
import { NoFrameworkComponent } from './no-framework.component';
var NoFramework = (function (_super) {
    __extends(NoFramework, _super);
    function NoFramework() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'no-framework';
        _this.framework = NoFrameworkComponent;
        return _this;
    }
    NoFramework = __decorate([
        Injectable()
    ], NoFramework);
    return NoFramework;
}(Framework));
export { NoFramework };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tZnJhbWV3b3JrLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nc2Yvbm8tZnJhbWV3b3JrLyIsInNvdXJjZXMiOlsibGliL25vLWZyYW1ld29yay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUN4QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBRXRDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDBCQUEwQixDQUFBO0FBRzdEO0lBQWlDLCtCQUFTO0lBQTFDO1FBQUEscUVBSUM7UUFIQyxVQUFJLEdBQUcsY0FBYyxDQUFBO1FBRXJCLGVBQVMsR0FBRyxvQkFBb0IsQ0FBQTs7SUFDbEMsQ0FBQztJQUpZLFdBQVc7UUFEdkIsVUFBVSxFQUFFO09BQ0EsV0FBVyxDQUl2QjtJQUFELGtCQUFDO0NBQUEsQUFKRCxDQUFpQyxTQUFTLEdBSXpDO1NBSlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7RnJhbWV3b3JrfSBmcm9tICdAbmdzZi9jb21tb24nXG4vLyBObyBmcmFtZXdvcmsgLSBwbGFpbiBIVE1MIGNvbnRyb2xzIChzdHlsZXMgZnJvbSBmb3JtIGxheW91dCBvbmx5KVxuaW1wb3J0IHtOb0ZyYW1ld29ya0NvbXBvbmVudH0gZnJvbSAnLi9uby1mcmFtZXdvcmsuY29tcG9uZW50J1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm9GcmFtZXdvcmsgZXh0ZW5kcyBGcmFtZXdvcmsge1xuICBuYW1lID0gJ25vLWZyYW1ld29yaydcblxuICBmcmFtZXdvcmsgPSBOb0ZyYW1ld29ya0NvbXBvbmVudFxufVxuIl19