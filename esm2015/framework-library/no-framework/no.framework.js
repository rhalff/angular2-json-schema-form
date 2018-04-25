import { Injectable } from '@angular/core';
import { Framework } from '../framework';
import { NoFrameworkComponent } from './no-framework.component';
export class NoFramework extends Framework {
    constructor() {
        super(...arguments);
        this.name = 'no-framework';
        this.framework = NoFrameworkComponent;
    }
}
NoFramework.decorators = [
    { type: Injectable },
];
//# sourceMappingURL=no.framework.js.map
