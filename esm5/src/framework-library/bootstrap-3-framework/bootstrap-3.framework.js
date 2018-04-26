import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Framework } from '../framework';
import { Bootstrap3FrameworkComponent } from './bootstrap-3-framework.component';
var Bootstrap3Framework = /** @class */ (function (_super) {
    tslib_1.__extends(Bootstrap3Framework, _super);
    function Bootstrap3Framework() {
        var _this = _super.apply(this, tslib_1.__spread(arguments)) || this;
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
    return Bootstrap3Framework;
}(Framework));
export { Bootstrap3Framework };
Bootstrap3Framework.decorators = [
    { type: Injectable },
];
//# sourceMappingURL=bootstrap-3.framework.js.map
