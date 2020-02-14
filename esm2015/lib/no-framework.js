var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Framework } from '@ngsf/common';
import { NoFrameworkComponent } from './no-framework.component';
let NoFramework = class NoFramework extends Framework {
    constructor() {
        super(...arguments);
        this.name = 'no-framework';
        this.framework = NoFrameworkComponent;
    }
};
NoFramework = __decorate([
    Injectable()
], NoFramework);
export { NoFramework };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tZnJhbWV3b3JrLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nc2Yvbm8tZnJhbWV3b3JrLyIsInNvdXJjZXMiOlsibGliL25vLWZyYW1ld29yay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFBO0FBQ3hDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFFdEMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMEJBQTBCLENBQUE7QUFHN0QsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBWSxTQUFRLFNBQVM7SUFBMUM7O1FBQ0UsU0FBSSxHQUFHLGNBQWMsQ0FBQTtRQUVyQixjQUFTLEdBQUcsb0JBQW9CLENBQUE7SUFDbEMsQ0FBQztDQUFBLENBQUE7QUFKWSxXQUFXO0lBRHZCLFVBQVUsRUFBRTtHQUNBLFdBQVcsQ0FJdkI7U0FKWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtGcmFtZXdvcmt9IGZyb20gJ0BuZ3NmL2NvbW1vbidcbi8vIE5vIGZyYW1ld29yayAtIHBsYWluIEhUTUwgY29udHJvbHMgKHN0eWxlcyBmcm9tIGZvcm0gbGF5b3V0IG9ubHkpXG5pbXBvcnQge05vRnJhbWV3b3JrQ29tcG9uZW50fSBmcm9tICcuL25vLWZyYW1ld29yay5jb21wb25lbnQnXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOb0ZyYW1ld29yayBleHRlbmRzIEZyYW1ld29yayB7XG4gIG5hbWUgPSAnbm8tZnJhbWV3b3JrJ1xuXG4gIGZyYW1ld29yayA9IE5vRnJhbWV3b3JrQ29tcG9uZW50XG59XG4iXX0=