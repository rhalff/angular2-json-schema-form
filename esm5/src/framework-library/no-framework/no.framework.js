import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Framework } from '../framework';
// No framework - plain HTML controls (styles from form layout only)
import { NoFrameworkComponent } from './no-framework.component';
var NoFramework = /** @class */ (function (_super) {
    tslib_1.__extends(NoFramework, _super);
    function NoFramework() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'no-framework';
        _this.framework = NoFrameworkComponent;
        return _this;
    }
    NoFramework.decorators = [
        { type: Injectable },
    ];
    return NoFramework;
}(Framework));
export { NoFramework };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8uZnJhbWV3b3JrLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcjItanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbInNyYy9mcmFtZXdvcmstbGlicmFyeS9uby1mcmFtZXdvcmsvbm8uZnJhbWV3b3JrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFekMsb0VBQW9FO0FBQ3BFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWhFO0lBQ2lDLHVDQUFTO0lBRDFDO1FBQUEscUVBS0M7UUFIQyxVQUFJLEdBQUcsY0FBYyxDQUFDO1FBRXRCLGVBQVMsR0FBRyxvQkFBb0IsQ0FBQzs7SUFDbkMsQ0FBQzs7Z0JBTEEsVUFBVTs7SUFLWCxrQkFBQztDQUFBLEFBTEQsQ0FDaUMsU0FBUyxHQUl6QztTQUpZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEZyYW1ld29yayB9IGZyb20gJy4uL2ZyYW1ld29yayc7XG5cbi8vIE5vIGZyYW1ld29yayAtIHBsYWluIEhUTUwgY29udHJvbHMgKHN0eWxlcyBmcm9tIGZvcm0gbGF5b3V0IG9ubHkpXG5pbXBvcnQgeyBOb0ZyYW1ld29ya0NvbXBvbmVudCB9IGZyb20gJy4vbm8tZnJhbWV3b3JrLmNvbXBvbmVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOb0ZyYW1ld29yayBleHRlbmRzIEZyYW1ld29yayB7XG4gIG5hbWUgPSAnbm8tZnJhbWV3b3JrJztcblxuICBmcmFtZXdvcmsgPSBOb0ZyYW1ld29ya0NvbXBvbmVudDtcbn1cbiJdfQ==