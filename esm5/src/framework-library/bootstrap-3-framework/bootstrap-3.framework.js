import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Framework } from '../framework';
// Bootstrap 3 Framework
// https://github.com/valor-software/ng2-bootstrap
import { Bootstrap3FrameworkComponent } from './bootstrap-3-framework.component';
var Bootstrap3Framework = /** @class */ (function (_super) {
    tslib_1.__extends(Bootstrap3Framework, _super);
    function Bootstrap3Framework() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'bootstrap-3';
        _this.framework = Bootstrap3FrameworkComponent;
        _this.stylesheets = [
            '//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
            '//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css',
        ];
        _this.scripts = [
            '//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js',
            '//ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js',
            '//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
        ];
        return _this;
    }
    Bootstrap3Framework.decorators = [
        { type: Injectable },
    ];
    return Bootstrap3Framework;
}(Framework));
export { Bootstrap3Framework };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLTMuZnJhbWV3b3JrLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcjItanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbInNyYy9mcmFtZXdvcmstbGlicmFyeS9ib290c3RyYXAtMy1mcmFtZXdvcmsvYm9vdHN0cmFwLTMuZnJhbWV3b3JrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFekMsd0JBQXdCO0FBQ3hCLGtEQUFrRDtBQUNsRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVqRjtJQUN5QywrQ0FBUztJQURsRDtRQUFBLHFFQWdCQztRQWRDLFVBQUksR0FBRyxhQUFhLENBQUM7UUFFckIsZUFBUyxHQUFHLDRCQUE0QixDQUFDO1FBRXpDLGlCQUFXLEdBQUc7WUFDWixpRUFBaUU7WUFDakUsdUVBQXVFO1NBQ3hFLENBQUM7UUFFRixhQUFPLEdBQUc7WUFDUiw0REFBNEQ7WUFDNUQsa0VBQWtFO1lBQ2xFLCtEQUErRDtTQUNoRSxDQUFDOztJQUNKLENBQUM7O2dCQWhCQSxVQUFVOztJQWdCWCwwQkFBQztDQUFBLEFBaEJELENBQ3lDLFNBQVMsR0FlakQ7U0FmWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEZyYW1ld29yayB9IGZyb20gJy4uL2ZyYW1ld29yayc7XG5cbi8vIEJvb3RzdHJhcCAzIEZyYW1ld29ya1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZhbG9yLXNvZnR3YXJlL25nMi1ib290c3RyYXBcbmltcG9ydCB7IEJvb3RzdHJhcDNGcmFtZXdvcmtDb21wb25lbnQgfSBmcm9tICcuL2Jvb3RzdHJhcC0zLWZyYW1ld29yay5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwM0ZyYW1ld29yayBleHRlbmRzIEZyYW1ld29yayB7XG4gIG5hbWUgPSAnYm9vdHN0cmFwLTMnO1xuXG4gIGZyYW1ld29yayA9IEJvb3RzdHJhcDNGcmFtZXdvcmtDb21wb25lbnQ7XG5cbiAgc3R5bGVzaGVldHMgPSBbXG4gICAgJy8vbWF4Y2RuLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN0cmFwLzMuMy43L2Nzcy9ib290c3RyYXAubWluLmNzcycsXG4gICAgJy8vbWF4Y2RuLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN0cmFwLzMuMy43L2Nzcy9ib290c3RyYXAtdGhlbWUubWluLmNzcycsXG4gIF07XG5cbiAgc2NyaXB0cyA9IFtcbiAgICAnLy9hamF4Lmdvb2dsZWFwaXMuY29tL2FqYXgvbGlicy9qcXVlcnkvMi4yLjQvanF1ZXJ5Lm1pbi5qcycsXG4gICAgJy8vYWpheC5nb29nbGVhcGlzLmNvbS9hamF4L2xpYnMvanF1ZXJ5dWkvMS4xMi4xL2pxdWVyeS11aS5taW4uanMnLFxuICAgICcvL21heGNkbi5ib290c3RyYXBjZG4uY29tL2Jvb3RzdHJhcC8zLjMuNy9qcy9ib290c3RyYXAubWluLmpzJyxcbiAgXTtcbn1cbiJdfQ==