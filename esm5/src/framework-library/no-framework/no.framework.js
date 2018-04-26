import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Framework } from '../framework';
import { NoFrameworkComponent } from './no-framework.component';
var NoFramework = /** @class */ (function (_super) {
    tslib_1.__extends(NoFramework, _super);
    function NoFramework() {
        var _this = _super.apply(this, tslib_1.__spread(arguments)) || this;
        _this.name = 'no-framework';
        _this.framework = NoFrameworkComponent;
        return _this;
    }
    return NoFramework;
}(Framework));
export { NoFramework };
NoFramework.decorators = [
    { type: Injectable },
];
//# sourceMappingURL=no.framework.js.map
