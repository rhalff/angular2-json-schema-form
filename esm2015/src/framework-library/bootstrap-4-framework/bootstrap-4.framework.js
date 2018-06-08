import { Injectable } from '@angular/core';
import { Framework } from '../framework';
// Bootstrap 4 Framework
// https://github.com/ng-bootstrap/ng-bootstrap
import { Bootstrap4FrameworkComponent } from './bootstrap-4-framework.component';
export class Bootstrap4Framework extends Framework {
    constructor() {
        super(...arguments);
        this.name = 'bootstrap-4';
        this.framework = Bootstrap4FrameworkComponent;
        this.stylesheets = [
            '//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css'
        ];
        this.scripts = [
            '//code.jquery.com/jquery-3.2.1.slim.min.js',
            '//cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js',
            '//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js',
        ];
    }
}
Bootstrap4Framework.decorators = [
    { type: Injectable },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLTQuZnJhbWV3b3JrLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcjItanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbInNyYy9mcmFtZXdvcmstbGlicmFyeS9ib290c3RyYXAtNC1mcmFtZXdvcmsvYm9vdHN0cmFwLTQuZnJhbWV3b3JrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV6Qyx3QkFBd0I7QUFDeEIsK0NBQStDO0FBQy9DLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBSWpGLE1BQU0sMEJBQTJCLFNBQVEsU0FBUztJQURsRDs7UUFFRSxTQUFJLEdBQUcsYUFBYSxDQUFDO1FBRXJCLGNBQVMsR0FBRyw0QkFBNEIsQ0FBQztRQUV6QyxnQkFBVyxHQUFHO1lBQ1osd0VBQXdFO1NBQ3pFLENBQUM7UUFFRixZQUFPLEdBQUc7WUFDUiw0Q0FBNEM7WUFDNUMscUVBQXFFO1lBQ3JFLHNFQUFzRTtTQUN2RSxDQUFDO0lBQ0osQ0FBQzs7O1lBZkEsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRnJhbWV3b3JrIH0gZnJvbSAnLi4vZnJhbWV3b3JrJztcblxuLy8gQm9vdHN0cmFwIDQgRnJhbWV3b3JrXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcFxuaW1wb3J0IHsgQm9vdHN0cmFwNEZyYW1ld29ya0NvbXBvbmVudCB9IGZyb20gJy4vYm9vdHN0cmFwLTQtZnJhbWV3b3JrLmNvbXBvbmVudCc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDRGcmFtZXdvcmsgZXh0ZW5kcyBGcmFtZXdvcmsge1xuICBuYW1lID0gJ2Jvb3RzdHJhcC00JztcblxuICBmcmFtZXdvcmsgPSBCb290c3RyYXA0RnJhbWV3b3JrQ29tcG9uZW50O1xuXG4gIHN0eWxlc2hlZXRzID0gW1xuICAgICcvL21heGNkbi5ib290c3RyYXBjZG4uY29tL2Jvb3RzdHJhcC80LjAuMC1iZXRhLjIvY3NzL2Jvb3RzdHJhcC5taW4uY3NzJ1xuICBdO1xuXG4gIHNjcmlwdHMgPSBbXG4gICAgJy8vY29kZS5qcXVlcnkuY29tL2pxdWVyeS0zLjIuMS5zbGltLm1pbi5qcycsXG4gICAgJy8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3BvcHBlci5qcy8xLjEyLjMvdW1kL3BvcHBlci5taW4uanMnLFxuICAgICcvL21heGNkbi5ib290c3RyYXBjZG4uY29tL2Jvb3RzdHJhcC80LjAuMC1iZXRhLjIvanMvYm9vdHN0cmFwLm1pbi5qcycsXG4gIF07XG59XG4iXX0=