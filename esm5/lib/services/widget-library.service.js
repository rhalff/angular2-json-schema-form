var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { Injectable } from '@angular/core';
import { hasOwn } from '@ngsf/common';
import { AddReferenceComponent } from '../components/add-reference.component';
import { OneOfComponent } from '../components/one-of.component';
import { ButtonComponent } from '../components/button.component';
import { CheckboxComponent } from '../components/checkbox.component';
import { CheckboxesComponent } from '../components/checkboxes.component';
import { FileComponent } from '../components/file.component';
import { InputComponent } from '../components/input.component';
import { MessageComponent } from '../components/message.component';
import { NoneComponent } from '../components/none.component';
import { NumberComponent } from '../components/number.component';
import { RadiosComponent } from '../components/radios.component';
import { RootComponent } from '../components/root.component';
import { SectionComponent } from '../components/section.component';
import { SelectComponent } from '../components/select.component';
import { SelectFrameworkComponent } from '../components/select-framework.component';
import { SelectWidgetComponent } from '../components/select-widget.component';
import { SubmitComponent } from '../components/submit.component';
import { TabsComponent } from '../components/tabs.component';
import { TemplateComponent } from '../components/template.component';
import { TextareaComponent } from '../components/textarea.component';
var WidgetLibraryService = (function () {
    function WidgetLibraryService() {
        this.defaultWidget = 'text';
        this.widgetLibrary = {
            none: NoneComponent,
            root: RootComponent,
            'select-framework': SelectFrameworkComponent,
            'select-widget': SelectWidgetComponent,
            $ref: AddReferenceComponent,
            email: 'text',
            integer: 'number',
            number: NumberComponent,
            password: 'text',
            search: 'text',
            tel: 'text',
            text: InputComponent,
            ur: 'text',
            color: 'text',
            date: 'text',
            datetime: 'text',
            'datetime-local': 'text',
            month: 'text',
            range: 'number',
            time: 'text',
            week: 'text',
            checkbox: CheckboxComponent,
            file: FileComponent,
            hidden: 'text',
            image: 'text',
            radio: 'radios',
            reset: 'submit',
            submit: SubmitComponent,
            button: ButtonComponent,
            select: SelectComponent,
            textarea: TextareaComponent,
            checkboxes: CheckboxesComponent,
            'checkboxes-inline': 'checkboxes',
            checkboxbuttons: 'checkboxes',
            radios: RadiosComponent,
            'radios-inline': 'radios',
            radiobuttons: 'radios',
            section: SectionComponent,
            div: 'section',
            fieldset: 'section',
            flex: 'section',
            'one-of': OneOfComponent,
            array: 'section',
            tabarray: 'tabs',
            tab: 'section',
            tabs: TabsComponent,
            message: MessageComponent,
            help: 'message',
            msg: 'message',
            html: 'message',
            template: TemplateComponent,
            advancedfieldset: 'section',
            authfieldset: 'section',
            optionfieldset: 'one-of',
            selectfieldset: 'one-of',
            conditional: 'section',
            actions: 'section',
            tagsinput: 'section',
            updown: 'number',
            'date-time': 'datetime-local',
            'alt-datetime': 'datetime-local',
            'alt-date': 'date',
            wizard: 'section',
            textline: 'text',
        };
        this.registeredWidgets = {};
        this.frameworkWidgets = {};
        this.activeWidgets = {};
        this.setActiveWidgets();
    }
    WidgetLibraryService.prototype.setActiveWidgets = function () {
        var e_1, _a;
        this.activeWidgets = Object.assign({}, this.widgetLibrary, this.frameworkWidgets, this.registeredWidgets);
        try {
            for (var _b = __values(Object.keys(this.activeWidgets)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var widgetName = _c.value;
                var widget = this.activeWidgets[widgetName];
                if (typeof widget === 'string') {
                    var usedAliases = [];
                    while (typeof widget === 'string' && !usedAliases.includes(widget)) {
                        usedAliases.push(widget);
                        widget = this.activeWidgets[widget];
                    }
                    if (typeof widget !== 'string') {
                        this.activeWidgets[widgetName] = widget;
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return true;
    };
    WidgetLibraryService.prototype.setDefaultWidget = function (type) {
        if (!this.hasWidget(type)) {
            return false;
        }
        this.defaultWidget = type;
        return true;
    };
    WidgetLibraryService.prototype.hasWidget = function (type, widgetSet) {
        if (widgetSet === void 0) { widgetSet = 'activeWidgets'; }
        if (!type || typeof type !== 'string') {
            return false;
        }
        return hasOwn(this[widgetSet], type);
    };
    WidgetLibraryService.prototype.hasDefaultWidget = function (type) {
        return this.hasWidget(type, 'widgetLibrary');
    };
    WidgetLibraryService.prototype.registerWidget = function (type, widget) {
        if (!type || !widget || typeof type !== 'string') {
            return false;
        }
        this.registeredWidgets[type] = widget;
        return this.setActiveWidgets();
    };
    WidgetLibraryService.prototype.unRegisterWidget = function (type) {
        if (!hasOwn(this.registeredWidgets, type)) {
            return false;
        }
        delete this.registeredWidgets[type];
        return this.setActiveWidgets();
    };
    WidgetLibraryService.prototype.unRegisterAllWidgets = function (unRegisterFrameworkWidgets) {
        if (unRegisterFrameworkWidgets === void 0) { unRegisterFrameworkWidgets = true; }
        this.registeredWidgets = {};
        if (unRegisterFrameworkWidgets) {
            this.frameworkWidgets = {};
        }
        return this.setActiveWidgets();
    };
    WidgetLibraryService.prototype.registerFrameworkWidgets = function (widgets) {
        if (widgets === null || typeof widgets !== 'object') {
            widgets = {};
        }
        this.frameworkWidgets = widgets;
        return this.setActiveWidgets();
    };
    WidgetLibraryService.prototype.unRegisterFrameworkWidgets = function () {
        if (Object.keys(this.frameworkWidgets).length) {
            this.frameworkWidgets = {};
            return this.setActiveWidgets();
        }
        return false;
    };
    WidgetLibraryService.prototype.getWidget = function (type, widgetSet) {
        if (widgetSet === void 0) { widgetSet = 'activeWidgets'; }
        if (this.hasWidget(type, widgetSet)) {
            return this[widgetSet][type];
        }
        else if (this.hasWidget(this.defaultWidget, widgetSet)) {
            return this[widgetSet][this.defaultWidget];
        }
        else {
            return null;
        }
    };
    WidgetLibraryService.prototype.getAllWidgets = function () {
        return {
            widgetLibrary: this.widgetLibrary,
            registeredWidgets: this.registeredWidgets,
            frameworkWidgets: this.frameworkWidgets,
            activeWidgets: this.activeWidgets,
        };
    };
    WidgetLibraryService.decorators = [
        { type: Injectable }
    ];
    WidgetLibraryService.ctorParameters = function () { return []; };
    return WidgetLibraryService;
}());
export { WidgetLibraryService };
if (false) {
    WidgetLibraryService.prototype.defaultWidget;
    WidgetLibraryService.prototype.widgetLibrary;
    WidgetLibraryService.prototype.registeredWidgets;
    WidgetLibraryService.prototype.frameworkWidgets;
    WidgetLibraryService.prototype.activeWidgets;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWxpYnJhcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL3dpZGdldC1saWJyYXJ5LyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3dpZGdldC1saWJyYXJ5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFBO0FBQ3hDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFFbkMsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sdUNBQXVDLENBQUE7QUFDM0UsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdDQUFnQyxDQUFBO0FBQzdELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQTtBQUM5RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQTtBQUNsRSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQTtBQUN0RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sOEJBQThCLENBQUE7QUFDMUQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLCtCQUErQixDQUFBO0FBQzVELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGlDQUFpQyxDQUFBO0FBQ2hFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQTtBQUMxRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0NBQWdDLENBQUE7QUFDOUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGdDQUFnQyxDQUFBO0FBQzlELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQTtBQUMxRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQTtBQUNoRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0NBQWdDLENBQUE7QUFDOUQsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1B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QTtJQUNILENBQUM7O2dCQTNORixVQUFVOzs7SUE0TlgsMkJBQUM7Q0FBQSxBQTVORCxJQTROQztTQTNOWSxvQkFBb0I7O0lBRS9CLDZDQUFzQjtJQUN0Qiw2Q0E2R0M7SUFDRCxpREFBMkI7SUFDM0IsZ0RBQTBCO0lBQzFCLDZDQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7aGFzT3dufSBmcm9tICdAbmdzZi9jb21tb24nXG5cbmltcG9ydCB7QWRkUmVmZXJlbmNlQ29tcG9uZW50fSBmcm9tICcuLi9jb21wb25lbnRzL2FkZC1yZWZlcmVuY2UuY29tcG9uZW50J1xuaW1wb3J0IHtPbmVPZkNvbXBvbmVudH0gZnJvbSAnLi4vY29tcG9uZW50cy9vbmUtb2YuY29tcG9uZW50J1xuaW1wb3J0IHtCdXR0b25Db21wb25lbnR9IGZyb20gJy4uL2NvbXBvbmVudHMvYnV0dG9uLmNvbXBvbmVudCdcbmltcG9ydCB7Q2hlY2tib3hDb21wb25lbnR9IGZyb20gJy4uL2NvbXBvbmVudHMvY2hlY2tib3guY29tcG9uZW50J1xuaW1wb3J0IHtDaGVja2JveGVzQ29tcG9uZW50fSBmcm9tICcuLi9jb21wb25lbnRzL2NoZWNrYm94ZXMuY29tcG9uZW50J1xuaW1wb3J0IHtGaWxlQ29tcG9uZW50fSBmcm9tICcuLi9jb21wb25lbnRzL2ZpbGUuY29tcG9uZW50J1xuaW1wb3J0IHtJbnB1dENvbXBvbmVudH0gZnJvbSAnLi4vY29tcG9uZW50cy9pbnB1dC5jb21wb25lbnQnXG5pbXBvcnQge01lc3NhZ2VDb21wb25lbnR9IGZyb20gJy4uL2NvbXBvbmVudHMvbWVzc2FnZS5jb21wb25lbnQnXG5pbXBvcnQge05vbmVDb21wb25lbnR9IGZyb20gJy4uL2NvbXBvbmVudHMvbm9uZS5jb21wb25lbnQnXG5pbXBvcnQge051bWJlckNvbXBvbmVudH0gZnJvbSAnLi4vY29tcG9uZW50cy9udW1iZXIuY29tcG9uZW50J1xuaW1wb3J0IHtSYWRpb3NDb21wb25lbnR9IGZyb20gJy4uL2NvbXBvbmVudHMvcmFkaW9zLmNvbXBvbmVudCdcbmltcG9ydCB7Um9vdENvbXBvbmVudH0gZnJvbSAnLi4vY29tcG9uZW50cy9yb290LmNvbXBvbmVudCdcbmltcG9ydCB7U2VjdGlvbkNvbXBvbmVudH0gZnJvbSAnLi4vY29tcG9uZW50cy9zZWN0aW9uLmNvbXBvbmVudCdcbmltcG9ydCB7U2VsZWN0Q29tcG9uZW50fSBmcm9tICcuLi9jb21wb25lbnRzL3NlbGVjdC5jb21wb25lbnQnXG5pbXBvcnQge1NlbGVjdEZyYW1ld29ya0NvbXBvbmVudH0gZnJvbSAnLi4vY29tcG9uZW50cy9zZWxlY3QtZnJhbWV3b3JrLmNvbXBvbmVudCdcbmltcG9ydCB7U2VsZWN0V2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuLi9jb21wb25lbnRzL3NlbGVjdC13aWRnZXQuY29tcG9uZW50J1xuaW1wb3J0IHtTdWJtaXRDb21wb25lbnR9IGZyb20gJy4uL2NvbXBvbmVudHMvc3VibWl0LmNvbXBvbmVudCdcbmltcG9ydCB7VGFic0NvbXBvbmVudH0gZnJvbSAnLi4vY29tcG9uZW50cy90YWJzLmNvbXBvbmVudCdcbmltcG9ydCB7VGVtcGxhdGVDb21wb25lbnR9IGZyb20gJy4uL2NvbXBvbmVudHMvdGVtcGxhdGUuY29tcG9uZW50J1xuaW1wb3J0IHtUZXh0YXJlYUNvbXBvbmVudH0gZnJvbSAnLi4vY29tcG9uZW50cy90ZXh0YXJlYS5jb21wb25lbnQnXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXaWRnZXRMaWJyYXJ5U2VydmljZSB7XG5cbiAgZGVmYXVsdFdpZGdldCA9ICd0ZXh0J1xuICB3aWRnZXRMaWJyYXJ5OiBhbnkgPSB7XG5cbiAgICAvLyBBbmd1bGFyIEpTT04gU2NoZW1hIEZvcm0gYWRtaW5pc3RyYXRpdmUgd2lkZ2V0c1xuICAgIG5vbmU6IE5vbmVDb21wb25lbnQsIC8vIFBsYWNlaG9sZGVyLCBmb3IgZGV2ZWxvcG1lbnQgLSBkaXNwbGF5cyBub3RoaW5nXG4gICAgcm9vdDogUm9vdENvbXBvbmVudCwgLy8gRm9ybSByb290LCByZW5kZXJzIGEgY29tcGxldGUgbGF5b3V0XG4gICAgJ3NlbGVjdC1mcmFtZXdvcmsnOiBTZWxlY3RGcmFtZXdvcmtDb21wb25lbnQsIC8vIEFwcGxpZXMgdGhlIHNlbGVjdGVkIGZyYW1ld29yayB0byBhIHNwZWNpZmllZCB3aWRnZXRcbiAgICAnc2VsZWN0LXdpZGdldCc6IFNlbGVjdFdpZGdldENvbXBvbmVudCwgLy8gRGlzcGxheXMgYSBzcGVjaWZpZWQgd2lkZ2V0XG4gICAgJHJlZjogQWRkUmVmZXJlbmNlQ29tcG9uZW50LCAvLyBCdXR0b24gdG8gYWRkIGEgbmV3IGFycmF5IGl0ZW0gb3IgJHJlZiBlbGVtZW50XG5cbiAgICAvLyBGcmVlLWZvcm0gdGV4dCBIVE1MICdpbnB1dCcgZm9ybSBjb250cm9sIHdpZGdldHMgPGlucHV0IHR5cGU9XCIuLi5cIj5cbiAgICBlbWFpbDogJ3RleHQnLFxuICAgIGludGVnZXI6ICdudW1iZXInLCAvLyBOb3RlOiAnaW50ZWdlcicgaXMgbm90IGEgcmVjb2duaXplZCBIVE1MIGlucHV0IHR5cGVcbiAgICBudW1iZXI6IE51bWJlckNvbXBvbmVudCxcbiAgICBwYXNzd29yZDogJ3RleHQnLFxuICAgIHNlYXJjaDogJ3RleHQnLFxuICAgIHRlbDogJ3RleHQnLFxuICAgIHRleHQ6IElucHV0Q29tcG9uZW50LFxuICAgIHVyOiAndGV4dCcsXG5cbiAgICAvLyBDb250cm9sbGVkIHRleHQgSFRNTCAnaW5wdXQnIGZvcm0gY29udHJvbCB3aWRnZXRzIDxpbnB1dCB0eXBlPVwiLi4uXCI+XG4gICAgY29sb3I6ICd0ZXh0JyxcbiAgICBkYXRlOiAndGV4dCcsXG4gICAgZGF0ZXRpbWU6ICd0ZXh0JyxcbiAgICAnZGF0ZXRpbWUtbG9jYWwnOiAndGV4dCcsXG4gICAgbW9udGg6ICd0ZXh0JyxcbiAgICByYW5nZTogJ251bWJlcicsXG4gICAgdGltZTogJ3RleHQnLFxuICAgIHdlZWs6ICd0ZXh0JyxcblxuICAgIC8vIE5vbi10ZXh0IEhUTUwgJ2lucHV0JyBmb3JtIGNvbnRyb2wgd2lkZ2V0cyA8aW5wdXQgdHlwZT1cIi4uLlwiPlxuICAgIC8vICdidXR0b24nOiA8aW5wdXQgdHlwZT1cImJ1dHRvblwiPiBub3QgdXNlZCwgdXNlIDxidXR0b24+IGluc3RlYWRcbiAgICBjaGVja2JveDogQ2hlY2tib3hDb21wb25lbnQsIC8vIFRPRE86IFNldCB0ZXJuYXJ5ID0gdHJ1ZSBmb3IgMy1zdGF0ZSA/P1xuICAgIGZpbGU6IEZpbGVDb21wb25lbnQsIC8vIFRPRE86IEZpbmlzaCAnZmlsZScgd2lkZ2V0XG4gICAgaGlkZGVuOiAndGV4dCcsXG4gICAgaW1hZ2U6ICd0ZXh0JywgLy8gVE9ETzogRmlndXJlIG91dCBob3cgdG8gaGFuZGxlIHRoZXNlXG4gICAgcmFkaW86ICdyYWRpb3MnLFxuICAgIHJlc2V0OiAnc3VibWl0JywgLy8gVE9ETzogRmlndXJlIG91dCBob3cgdG8gaGFuZGxlIHRoZXNlXG4gICAgc3VibWl0OiBTdWJtaXRDb21wb25lbnQsXG5cbiAgICAvLyBPdGhlciAobm9uLSdpbnB1dCcpIEhUTUwgZm9ybSBjb250cm9sIHdpZGdldHNcbiAgICBidXR0b246IEJ1dHRvbkNvbXBvbmVudCxcbiAgICBzZWxlY3Q6IFNlbGVjdENvbXBvbmVudCxcbiAgICAvLyAnb3B0aW9uJzogYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgc2VsZWN0IHdpZGdldHNcbiAgICAvLyAnb3B0Z3JvdXAnOiBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBzZWxlY3Qgd2lkZ2V0c1xuICAgIHRleHRhcmVhOiBUZXh0YXJlYUNvbXBvbmVudCxcblxuICAgIC8vIEhUTUwgZm9ybSBjb250cm9sIHdpZGdldCBzZXRzXG4gICAgY2hlY2tib3hlczogQ2hlY2tib3hlc0NvbXBvbmVudCwgLy8gR3JvdXBlZCBsaXN0IG9mIGNoZWNrYm94ZXNcbiAgICAnY2hlY2tib3hlcy1pbmxpbmUnOiAnY2hlY2tib3hlcycsIC8vIENoZWNrYm94ZXMgaW4gb25lIGxpbmVcbiAgICBjaGVja2JveGJ1dHRvbnM6ICdjaGVja2JveGVzJywgLy8gQ2hlY2tib3hlcyBhcyBodG1sIGJ1dHRvbnNcbiAgICByYWRpb3M6IFJhZGlvc0NvbXBvbmVudCwgLy8gR3JvdXBlZCBsaXN0IG9mIHJhZGlvIGJ1dHRvbnNcbiAgICAncmFkaW9zLWlubGluZSc6ICdyYWRpb3MnLCAvLyBSYWRpbyBjb250cm9scyBpbiBvbmUgbGluZVxuICAgIHJhZGlvYnV0dG9uczogJ3JhZGlvcycsIC8vIFJhZGlvIGNvbnRyb2xzIGFzIGh0bWwgYnV0dG9uc1xuXG4gICAgLy8gSFRNTCBMYXlvdXQgd2lkZ2V0c1xuICAgIC8vICdsYWJlbCc6IGF1dG9tYXRpY2FsbHkgYWRkZWQgdG8gZGF0YSB3aWRnZXRzXG4gICAgLy8gJ2xlZ2VuZCc6IGF1dG9tYXRpY2FsbHkgYWRkZWQgdG8gZmllbGRzZXRzXG4gICAgc2VjdGlvbjogU2VjdGlvbkNvbXBvbmVudCwgLy8gSnVzdCBhIGRpdiA8ZGl2PlxuICAgIGRpdjogJ3NlY3Rpb24nLCAvLyBTdGlsbCBqdXN0IGEgZGl2IDxkaXY+XG4gICAgZmllbGRzZXQ6ICdzZWN0aW9uJywgLy8gQSBmaWVsZHNldCwgd2l0aCBhbiBvcHRpb25hbCBsZWdlbmQgPGZpZWxkc2V0PlxuICAgIGZsZXg6ICdzZWN0aW9uJywgLy8gQSBmbGV4Ym94IGNvbnRhaW5lciA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleFwiPlxuXG4gICAgLy8gTm9uLUhUTUwgbGF5b3V0IHdpZGdldHNcbiAgICAnb25lLW9mJzogT25lT2ZDb21wb25lbnQsIC8vIEEgc2VsZWN0IGJveCB0aGF0IGNoYW5nZXMgYW5vdGhlciBpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogRmluaXNoICdvbmUtb2YnIHdpZGdldFxuICAgIGFycmF5OiAnc2VjdGlvbicsIC8vIEEgbGlzdCB5b3UgY2FuIGFkZCwgcmVtb3ZlIGFuZCByZW9yZGVyIDxmaWVsZHNldD5cbiAgICB0YWJhcnJheTogJ3RhYnMnLCAvLyBBIHRhYmJlZCB2ZXJzaW9uIG9mIGFycmF5XG4gICAgdGFiOiAnc2VjdGlvbicsIC8vIEEgdGFiIGdyb3VwLCBzaW1pbGFyIHRvIGEgZmllbGRzZXQgb3Igc2VjdGlvbiA8ZmllbGRzZXQ+XG4gICAgdGFiczogVGFic0NvbXBvbmVudCwgLy8gQSB0YWJiZWQgc2V0IG9mIHBhbmVscyB3aXRoIGRpZmZlcmVudCBjb250cm9sc1xuICAgIG1lc3NhZ2U6IE1lc3NhZ2VDb21wb25lbnQsIC8vIEluc2VydCBhcmJpdHJhcnkgaHRtbFxuICAgIGhlbHA6ICdtZXNzYWdlJywgLy8gSW5zZXJ0IGFyYml0cmFyeSBodG1sXG4gICAgbXNnOiAnbWVzc2FnZScsIC8vIEluc2VydCBhcmJpdHJhcnkgaHRtbFxuICAgIGh0bWw6ICdtZXNzYWdlJywgLy8gSW5zZXJ0IGFyYml0cmFyeSBodG1sXG4gICAgdGVtcGxhdGU6IFRlbXBsYXRlQ29tcG9uZW50LCAvLyBJbnNlcnQgYSBjdXN0b20gQW5ndWxhciBjb21wb25lbnRcblxuICAgIC8vIFdpZGdldHMgaW5jbHVkZWQgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBKU09OIEZvcm0gQVBJXG4gICAgYWR2YW5jZWRmaWVsZHNldDogJ3NlY3Rpb24nLCAvLyBBZGRzICdBZHZhbmNlZCBzZXR0aW5ncycgdGl0bGUgPGZpZWxkc2V0PlxuICAgIGF1dGhmaWVsZHNldDogJ3NlY3Rpb24nLCAvLyBBZGRzICdBdXRoZW50aWNhdGlvbiBzZXR0aW5ncycgdGl0bGUgPGZpZWxkc2V0PlxuICAgIG9wdGlvbmZpZWxkc2V0OiAnb25lLW9mJywgLy8gT3B0aW9uIGNvbnRyb2wsIGRpc3BsYXlzIHNlbGVjdGVkIHN1Yi1pdGVtIDxmaWVsZHNldD5cbiAgICBzZWxlY3RmaWVsZHNldDogJ29uZS1vZicsIC8vIFNlbGVjdCBjb250cm9sLCBkaXNwbGF5cyBzZWxlY3RlZCBzdWItaXRlbSA8ZmllbGRzZXQ+XG4gICAgY29uZGl0aW9uYWw6ICdzZWN0aW9uJywgLy8gSWRlbnRpY2FsIHRvICdzZWN0aW9uJyAoZGVwZWNpYXRlZCkgPGRpdj5cbiAgICBhY3Rpb25zOiAnc2VjdGlvbicsIC8vIEhvcml6b250YWwgYnV0dG9uIGxpc3QsIGNhbiBvbmx5IHN1Ym1pdCwgdXNlcyBidXR0b25zIGFzIGl0ZW1zIDxkaXY+XG4gICAgdGFnc2lucHV0OiAnc2VjdGlvbicsIC8vIEZvciBlbnRlcmluZyBzaG9ydCB0ZXh0IHRhZ3MgPGRpdj5cbiAgICAvLyBTZWU6IGh0dHA6Ly91bGlvbi5naXRodWIuaW8vanNvbmZvcm0vcGxheWdyb3VuZC8/ZXhhbXBsZT1maWVsZHMtY2hlY2tib3hidXR0b25zXG5cbiAgICAvLyBXaWRnZXRzIGluY2x1ZGVkIGZvciBjb21wYXRpYmlsaXR5IHdpdGggUmVhY3QgSlNPTiBTY2hlbWEgRm9ybSBBUElcbiAgICB1cGRvd246ICdudW1iZXInLFxuICAgICdkYXRlLXRpbWUnOiAnZGF0ZXRpbWUtbG9jYWwnLFxuICAgICdhbHQtZGF0ZXRpbWUnOiAnZGF0ZXRpbWUtbG9jYWwnLFxuICAgICdhbHQtZGF0ZSc6ICdkYXRlJyxcblxuICAgIC8vIFdpZGdldHMgaW5jbHVkZWQgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFNjaGVtYSBGb3JtIEFQSVxuICAgIHdpemFyZDogJ3NlY3Rpb24nLCAvLyBUT0RPOiBTZXF1ZW50aWFsIHBhbmVscyB3aXRoIFwiTmV4dFwiIGFuZCBcIlByZXZpb3VzXCIgYnV0dG9uc1xuXG4gICAgLy8gV2lkZ2V0cyBpbmNsdWRlZCBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG90aGVyIGxpYnJhcmllc1xuICAgIHRleHRsaW5lOiAndGV4dCcsXG5cbiAgICAvLyBSZWNvbW1lbmRlZCAzcmQtcGFydHkgYWRkLW9uIHdpZGdldHMgKFRPRE86IGNyZWF0ZSB3cmFwcGVycyBmb3IgdGhlc2UuLi4pXG4gICAgLy8gJ25nMi1zZWxlY3QnOiBTZWxlY3QgY29udHJvbCByZXBsYWNlbWVudCAtIGh0dHA6Ly92YWxvci1zb2Z0d2FyZS5jb20vbmcyLXNlbGVjdC9cbiAgICAvLyAnZmxhdHBpY2tyJzogRmxhdHBpY2tyIGRhdGUgcGlja2VyIC0gaHR0cHM6Ly9naXRodWIuY29tL2NobWxuL2ZsYXRwaWNrclxuICAgIC8vICdwaWthZGF5JzogUGlrYWRheSBkYXRlIHBpY2tlciAtIGh0dHBzOi8vZ2l0aHViLmNvbS9kYnVzaGVsbC9QaWthZGF5XG4gICAgLy8gJ3NwZWN0cnVtJzogU3BlY3RydW0gY29sb3IgcGlja2VyIC0gaHR0cDovL2Jncmlucy5naXRodWIuaW8vc3BlY3RydW1cbiAgICAvLyAnYm9vdHN0cmFwLXNsaWRlcic6IEJvb3RzdHJhcCBTbGlkZXIgcmFuZ2UgY29udHJvbCAtIGh0dHBzOi8vZ2l0aHViLmNvbS9zZWl5cmlhL2Jvb3RzdHJhcC1zbGlkZXJcbiAgICAvLyAnYWNlJzogQUNFIGNvZGUgZWRpdG9yIC0gaHR0cHM6Ly9hY2UuYzkuaW9cbiAgICAvLyAnY2tlZGl0b3InOiBDS0VkaXRvciBIVE1MIC8gcmljaCB0ZXh0IGVkaXRvciAtIGh0dHA6Ly9ja2VkaXRvci5jb21cbiAgICAvLyAndGlueW1jZSc6IFRpbnlNQ0UgSFRNTCAvIHJpY2ggdGV4dCBlZGl0b3IgLSBodHRwczovL3d3dy50aW55bWNlLmNvbVxuICAgIC8vICdpbWFnZXNlbGVjdCc6IEJvb3RzdHJhcCBkcm9wLWRvd24gaW1hZ2Ugc2VsZWN0b3IgLSBodHRwOi8vc2lsdmlvbW9yZXRvLmdpdGh1Yi5pby9ib290c3RyYXAtc2VsZWN0XG4gICAgLy8gJ3d5c2lodG1sNSc6IEhUTUwgZWRpdG9yIC0gaHR0cDovL2pob2xsaW5nd29ydGguZ2l0aHViLmlvL2Jvb3RzdHJhcC13eXNpaHRtbDVcbiAgICAvLyAncXVpbGwnOiBRdWlsbCBIVE1MIC8gcmljaCB0ZXh0IGVkaXRvciAoPykgLSBodHRwczovL3F1aWxsanMuY29tXG4gIH1cbiAgcmVnaXN0ZXJlZFdpZGdldHM6IGFueSA9IHt9XG4gIGZyYW1ld29ya1dpZGdldHM6IGFueSA9IHt9XG4gIGFjdGl2ZVdpZGdldHM6IGFueSA9IHt9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zZXRBY3RpdmVXaWRnZXRzKClcbiAgfVxuXG4gIHNldEFjdGl2ZVdpZGdldHMoKTogYm9vbGVhbiB7XG4gICAgdGhpcy5hY3RpdmVXaWRnZXRzID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHt9LCB0aGlzLndpZGdldExpYnJhcnksIHRoaXMuZnJhbWV3b3JrV2lkZ2V0cywgdGhpcy5yZWdpc3RlcmVkV2lkZ2V0c1xuICAgIClcbiAgICBmb3IgKGNvbnN0IHdpZGdldE5hbWUgb2YgT2JqZWN0LmtleXModGhpcy5hY3RpdmVXaWRnZXRzKSkge1xuICAgICAgbGV0IHdpZGdldDogYW55ID0gdGhpcy5hY3RpdmVXaWRnZXRzW3dpZGdldE5hbWVdXG4gICAgICAvLyBSZXNvbHZlIGFsaWFzZXNcbiAgICAgIGlmICh0eXBlb2Ygd2lkZ2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCB1c2VkQWxpYXNlczogc3RyaW5nW10gPSBbXVxuICAgICAgICB3aGlsZSAodHlwZW9mIHdpZGdldCA9PT0gJ3N0cmluZycgJiYgIXVzZWRBbGlhc2VzLmluY2x1ZGVzKHdpZGdldCkpIHtcbiAgICAgICAgICB1c2VkQWxpYXNlcy5wdXNoKHdpZGdldClcbiAgICAgICAgICB3aWRnZXQgPSB0aGlzLmFjdGl2ZVdpZGdldHNbd2lkZ2V0XVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygd2lkZ2V0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRoaXMuYWN0aXZlV2lkZ2V0c1t3aWRnZXROYW1lXSA9IHdpZGdldFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBzZXREZWZhdWx0V2lkZ2V0KHR5cGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5oYXNXaWRnZXQodHlwZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICB0aGlzLmRlZmF1bHRXaWRnZXQgPSB0eXBlXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGhhc1dpZGdldCh0eXBlOiBzdHJpbmcsIHdpZGdldFNldCA9ICdhY3RpdmVXaWRnZXRzJyk6IGJvb2xlYW4ge1xuICAgIGlmICghdHlwZSB8fCB0eXBlb2YgdHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICByZXR1cm4gaGFzT3duKHRoaXNbd2lkZ2V0U2V0XSwgdHlwZSlcbiAgfVxuXG4gIGhhc0RlZmF1bHRXaWRnZXQodHlwZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaGFzV2lkZ2V0KHR5cGUsICd3aWRnZXRMaWJyYXJ5JylcbiAgfVxuXG4gIHJlZ2lzdGVyV2lkZ2V0KHR5cGU6IHN0cmluZywgd2lkZ2V0OiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAoIXR5cGUgfHwgIXdpZGdldCB8fCB0eXBlb2YgdHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICB0aGlzLnJlZ2lzdGVyZWRXaWRnZXRzW3R5cGVdID0gd2lkZ2V0XG4gICAgcmV0dXJuIHRoaXMuc2V0QWN0aXZlV2lkZ2V0cygpXG4gIH1cblxuICB1blJlZ2lzdGVyV2lkZ2V0KHR5cGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICghaGFzT3duKHRoaXMucmVnaXN0ZXJlZFdpZGdldHMsIHR5cGUpKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgZGVsZXRlIHRoaXMucmVnaXN0ZXJlZFdpZGdldHNbdHlwZV1cbiAgICByZXR1cm4gdGhpcy5zZXRBY3RpdmVXaWRnZXRzKClcbiAgfVxuXG4gIHVuUmVnaXN0ZXJBbGxXaWRnZXRzKHVuUmVnaXN0ZXJGcmFtZXdvcmtXaWRnZXRzID0gdHJ1ZSk6IGJvb2xlYW4ge1xuICAgIHRoaXMucmVnaXN0ZXJlZFdpZGdldHMgPSB7fVxuICAgIGlmICh1blJlZ2lzdGVyRnJhbWV3b3JrV2lkZ2V0cykge1xuICAgICAgdGhpcy5mcmFtZXdvcmtXaWRnZXRzID0ge31cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc2V0QWN0aXZlV2lkZ2V0cygpXG4gIH1cblxuICByZWdpc3RlckZyYW1ld29ya1dpZGdldHMod2lkZ2V0czogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKHdpZGdldHMgPT09IG51bGwgfHwgdHlwZW9mIHdpZGdldHMgIT09ICdvYmplY3QnKSB7XG4gICAgICB3aWRnZXRzID0ge31cbiAgICB9XG4gICAgdGhpcy5mcmFtZXdvcmtXaWRnZXRzID0gd2lkZ2V0c1xuICAgIHJldHVybiB0aGlzLnNldEFjdGl2ZVdpZGdldHMoKVxuICB9XG5cbiAgdW5SZWdpc3RlckZyYW1ld29ya1dpZGdldHMoKTogYm9vbGVhbiB7XG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuZnJhbWV3b3JrV2lkZ2V0cykubGVuZ3RoKSB7XG4gICAgICB0aGlzLmZyYW1ld29ya1dpZGdldHMgPSB7fVxuICAgICAgcmV0dXJuIHRoaXMuc2V0QWN0aXZlV2lkZ2V0cygpXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgZ2V0V2lkZ2V0KHR5cGU/OiBzdHJpbmcsIHdpZGdldFNldCA9ICdhY3RpdmVXaWRnZXRzJyk6IGFueSB7XG4gICAgaWYgKHRoaXMuaGFzV2lkZ2V0KHR5cGUsIHdpZGdldFNldCkpIHtcbiAgICAgIHJldHVybiB0aGlzW3dpZGdldFNldF1bdHlwZV1cbiAgICB9IGVsc2UgaWYgKHRoaXMuaGFzV2lkZ2V0KHRoaXMuZGVmYXVsdFdpZGdldCwgd2lkZ2V0U2V0KSkge1xuICAgICAgcmV0dXJuIHRoaXNbd2lkZ2V0U2V0XVt0aGlzLmRlZmF1bHRXaWRnZXRdXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG5cbiAgZ2V0QWxsV2lkZ2V0cygpOiBhbnkge1xuICAgIHJldHVybiB7XG4gICAgICB3aWRnZXRMaWJyYXJ5OiB0aGlzLndpZGdldExpYnJhcnksXG4gICAgICByZWdpc3RlcmVkV2lkZ2V0czogdGhpcy5yZWdpc3RlcmVkV2lkZ2V0cyxcbiAgICAgIGZyYW1ld29ya1dpZGdldHM6IHRoaXMuZnJhbWV3b3JrV2lkZ2V0cyxcbiAgICAgIGFjdGl2ZVdpZGdldHM6IHRoaXMuYWN0aXZlV2lkZ2V0cyxcbiAgICB9XG4gIH1cbn1cbiJdfQ==