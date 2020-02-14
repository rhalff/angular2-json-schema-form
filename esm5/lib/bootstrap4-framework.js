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
import { Bootstrap4FrameworkComponent } from './bootstrap4-framework.component';
var Bootstrap4Framework = (function (_super) {
    __extends(Bootstrap4Framework, _super);
    function Bootstrap4Framework() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'bootstrap-4';
        _this.framework = Bootstrap4FrameworkComponent;
        _this.stylesheets = [
            '//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css'
        ];
        _this.scripts = [
            '//code.jquery.com/jquery-3.2.1.slim.min.js',
            '//cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js',
            '//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js',
        ];
        return _this;
    }
    Bootstrap4Framework = __decorate([
        Injectable()
    ], Bootstrap4Framework);
    return Bootstrap4Framework;
}(Framework));
export { Bootstrap4Framework };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwNC1mcmFtZXdvcmsuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdzZi9ib290c3RyYXA0LWZyYW1ld29yay8iLCJzb3VyY2VzIjpbImxpYi9ib290c3RyYXA0LWZyYW1ld29yay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUN4QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBR3RDLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLGtDQUFrQyxDQUFBO0FBRzdFO0lBQXlDLHVDQUFTO0lBQWxEO1FBQUEscUVBY0M7UUFiQyxVQUFJLEdBQUcsYUFBYSxDQUFBO1FBRXBCLGVBQVMsR0FBRyw0QkFBNEIsQ0FBQTtRQUV4QyxpQkFBVyxHQUFHO1lBQ1osd0VBQXdFO1NBQ3pFLENBQUE7UUFFRCxhQUFPLEdBQUc7WUFDUiw0Q0FBNEM7WUFDNUMscUVBQXFFO1lBQ3JFLHNFQUFzRTtTQUN2RSxDQUFBOztJQUNILENBQUM7SUFkWSxtQkFBbUI7UUFEL0IsVUFBVSxFQUFFO09BQ0EsbUJBQW1CLENBYy9CO0lBQUQsMEJBQUM7Q0FBQSxBQWRELENBQXlDLFNBQVMsR0FjakQ7U0FkWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0ZyYW1ld29ya30gZnJvbSAnQG5nc2YvY29tbW9uJ1xuLy8gQm9vdHN0cmFwIDQgRnJhbWV3b3JrXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcFxuaW1wb3J0IHtCb290c3RyYXA0RnJhbWV3b3JrQ29tcG9uZW50fSBmcm9tICcuL2Jvb3RzdHJhcDQtZnJhbWV3b3JrLmNvbXBvbmVudCdcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDRGcmFtZXdvcmsgZXh0ZW5kcyBGcmFtZXdvcmsge1xuICBuYW1lID0gJ2Jvb3RzdHJhcC00J1xuXG4gIGZyYW1ld29yayA9IEJvb3RzdHJhcDRGcmFtZXdvcmtDb21wb25lbnRcblxuICBzdHlsZXNoZWV0cyA9IFtcbiAgICAnLy9tYXhjZG4uYm9vdHN0cmFwY2RuLmNvbS9ib290c3RyYXAvNC4wLjAtYmV0YS4yL2Nzcy9ib290c3RyYXAubWluLmNzcydcbiAgXVxuXG4gIHNjcmlwdHMgPSBbXG4gICAgJy8vY29kZS5qcXVlcnkuY29tL2pxdWVyeS0zLjIuMS5zbGltLm1pbi5qcycsXG4gICAgJy8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3BvcHBlci5qcy8xLjEyLjMvdW1kL3BvcHBlci5taW4uanMnLFxuICAgICcvL21heGNkbi5ib290c3RyYXBjZG4uY29tL2Jvb3RzdHJhcC80LjAuMC1iZXRhLjIvanMvYm9vdHN0cmFwLm1pbi5qcycsXG4gIF1cbn1cbiJdfQ==