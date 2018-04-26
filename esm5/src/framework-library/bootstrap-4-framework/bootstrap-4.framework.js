import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Framework } from '../framework';
import { Bootstrap4FrameworkComponent } from './bootstrap-4-framework.component';
var Bootstrap4Framework = /** @class */ (function (_super) {
    tslib_1.__extends(Bootstrap4Framework, _super);
    function Bootstrap4Framework() {
        var _this = _super.apply(this, tslib_1.__spread(arguments)) || this;
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
    return Bootstrap4Framework;
}(Framework));
export { Bootstrap4Framework };
Bootstrap4Framework.decorators = [
    { type: Injectable },
];
//# sourceMappingURL=bootstrap-4.framework.js.map
