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
export class WidgetLibraryService {
    constructor() {
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
    setActiveWidgets() {
        this.activeWidgets = Object.assign({}, this.widgetLibrary, this.frameworkWidgets, this.registeredWidgets);
        for (const widgetName of Object.keys(this.activeWidgets)) {
            let widget = this.activeWidgets[widgetName];
            if (typeof widget === 'string') {
                const usedAliases = [];
                while (typeof widget === 'string' && !usedAliases.includes(widget)) {
                    usedAliases.push(widget);
                    widget = this.activeWidgets[widget];
                }
                if (typeof widget !== 'string') {
                    this.activeWidgets[widgetName] = widget;
                }
            }
        }
        return true;
    }
    setDefaultWidget(type) {
        if (!this.hasWidget(type)) {
            return false;
        }
        this.defaultWidget = type;
        return true;
    }
    hasWidget(type, widgetSet = 'activeWidgets') {
        if (!type || typeof type !== 'string') {
            return false;
        }
        return hasOwn(this[widgetSet], type);
    }
    hasDefaultWidget(type) {
        return this.hasWidget(type, 'widgetLibrary');
    }
    registerWidget(type, widget) {
        if (!type || !widget || typeof type !== 'string') {
            return false;
        }
        this.registeredWidgets[type] = widget;
        return this.setActiveWidgets();
    }
    unRegisterWidget(type) {
        if (!hasOwn(this.registeredWidgets, type)) {
            return false;
        }
        delete this.registeredWidgets[type];
        return this.setActiveWidgets();
    }
    unRegisterAllWidgets(unRegisterFrameworkWidgets = true) {
        this.registeredWidgets = {};
        if (unRegisterFrameworkWidgets) {
            this.frameworkWidgets = {};
        }
        return this.setActiveWidgets();
    }
    registerFrameworkWidgets(widgets) {
        if (widgets === null || typeof widgets !== 'object') {
            widgets = {};
        }
        this.frameworkWidgets = widgets;
        return this.setActiveWidgets();
    }
    unRegisterFrameworkWidgets() {
        if (Object.keys(this.frameworkWidgets).length) {
            this.frameworkWidgets = {};
            return this.setActiveWidgets();
        }
        return false;
    }
    getWidget(type, widgetSet = 'activeWidgets') {
        if (this.hasWidget(type, widgetSet)) {
            return this[widgetSet][type];
        }
        else if (this.hasWidget(this.defaultWidget, widgetSet)) {
            return this[widgetSet][this.defaultWidget];
        }
        else {
            return null;
        }
    }
    getAllWidgets() {
        return {
            widgetLibrary: this.widgetLibrary,
            registeredWidgets: this.registeredWidgets,
            frameworkWidgets: this.frameworkWidgets,
            activeWidgets: this.activeWidgets,
        };
    }
}
WidgetLibraryService.decorators = [
    { type: Injectable }
];
WidgetLibraryService.ctorParameters = () => [];
if (false) {
    WidgetLibraryService.prototype.defaultWidget;
    WidgetLibraryService.prototype.widgetLibrary;
    WidgetLibraryService.prototype.registeredWidgets;
    WidgetLibraryService.prototype.frameworkWidgets;
    WidgetLibraryService.prototype.activeWidgets;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWxpYnJhcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL3dpZGdldC1saWJyYXJ5LyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3dpZGdldC1saWJyYXJ5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUN4QyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBRW5DLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVDQUF1QyxDQUFBO0FBQzNFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQTtBQUM3RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0NBQWdDLENBQUE7QUFDOUQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sa0NBQWtDLENBQUE7QUFDbEUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sb0NBQW9DLENBQUE7QUFDdEUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDhCQUE4QixDQUFBO0FBQzFELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQTtBQUM1RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQTtBQUNoRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sOEJBQThCLENBQUE7QUFDMUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGdDQUFnQyxDQUFBO0FBQzlELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQTtBQUM5RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sOEJBQThCLENBQUE7QUFDMUQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0saUNBQWlDLENBQUE7QUFDaEUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGdDQUFnQyxDQUFBO0FBQzlELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDBDQUEwQyxD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aW1wb3J0IHtoYXNPd259IGZyb20gJ0BuZ3NmL2NvbW1vbidcblxuaW1wb3J0IHtBZGRSZWZlcmVuY2VDb21wb25lbnR9IGZyb20gJy4uL2NvbXBvbmVudHMvYWRkLXJlZmVyZW5jZS5jb21wb25lbnQnXG5pbXBvcnQge09uZU9mQ29tcG9uZW50fSBmcm9tICcuLi9jb21wb25lbnRzL29uZS1vZi5jb21wb25lbnQnXG5pbXBvcnQge0J1dHRvbkNvbXBvbmVudH0gZnJvbSAnLi4vY29tcG9uZW50cy9idXR0b24uY29tcG9uZW50J1xuaW1wb3J0IHtDaGVja2JveENvbXBvbmVudH0gZnJvbSAnLi4vY29tcG9uZW50cy9jaGVja2JveC5jb21wb25lbnQnXG5pbXBvcnQge0NoZWNrYm94ZXNDb21wb25lbnR9IGZyb20gJy4uL2NvbXBvbmVudHMvY2hlY2tib3hlcy5jb21wb25lbnQnXG5pbXBvcnQge0ZpbGVDb21wb25lbnR9IGZyb20gJy4uL2NvbXBvbmVudHMvZmlsZS5jb21wb25lbnQnXG5pbXBvcnQge0lucHV0Q29tcG9uZW50fSBmcm9tICcuLi9jb21wb25lbnRzL2lucHV0LmNvbXBvbmVudCdcbmltcG9ydCB7TWVzc2FnZUNvbXBvbmVudH0gZnJvbSAnLi4vY29tcG9uZW50cy9tZXNzYWdlLmNvbXBvbmVudCdcbmltcG9ydCB7Tm9uZUNvbXBvbmVudH0gZnJvbSAnLi4vY29tcG9uZW50cy9ub25lLmNvbXBvbmVudCdcbmltcG9ydCB7TnVtYmVyQ29tcG9uZW50fSBmcm9tICcuLi9jb21wb25lbnRzL251bWJlci5jb21wb25lbnQnXG5pbXBvcnQge1JhZGlvc0NvbXBvbmVudH0gZnJvbSAnLi4vY29tcG9uZW50cy9yYWRpb3MuY29tcG9uZW50J1xuaW1wb3J0IHtSb290Q29tcG9uZW50fSBmcm9tICcuLi9jb21wb25lbnRzL3Jvb3QuY29tcG9uZW50J1xuaW1wb3J0IHtTZWN0aW9uQ29tcG9uZW50fSBmcm9tICcuLi9jb21wb25lbnRzL3NlY3Rpb24uY29tcG9uZW50J1xuaW1wb3J0IHtTZWxlY3RDb21wb25lbnR9IGZyb20gJy4uL2NvbXBvbmVudHMvc2VsZWN0LmNvbXBvbmVudCdcbmltcG9ydCB7U2VsZWN0RnJhbWV3b3JrQ29tcG9uZW50fSBmcm9tICcuLi9jb21wb25lbnRzL3NlbGVjdC1mcmFtZXdvcmsuY29tcG9uZW50J1xuaW1wb3J0IHtTZWxlY3RXaWRnZXRDb21wb25lbnR9IGZyb20gJy4uL2NvbXBvbmVudHMvc2VsZWN0LXdpZGdldC5jb21wb25lbnQnXG5pbXBvcnQge1N1Ym1pdENvbXBvbmVudH0gZnJvbSAnLi4vY29tcG9uZW50cy9zdWJtaXQuY29tcG9uZW50J1xuaW1wb3J0IHtUYWJzQ29tcG9uZW50fSBmcm9tICcuLi9jb21wb25lbnRzL3RhYnMuY29tcG9uZW50J1xuaW1wb3J0IHtUZW1wbGF0ZUNvbXBvbmVudH0gZnJvbSAnLi4vY29tcG9uZW50cy90ZW1wbGF0ZS5jb21wb25lbnQnXG5pbXBvcnQge1RleHRhcmVhQ29tcG9uZW50fSBmcm9tICcuLi9jb21wb25lbnRzL3RleHRhcmVhLmNvbXBvbmVudCdcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdpZGdldExpYnJhcnlTZXJ2aWNlIHtcblxuICBkZWZhdWx0V2lkZ2V0ID0gJ3RleHQnXG4gIHdpZGdldExpYnJhcnk6IGFueSA9IHtcblxuICAgIC8vIEFuZ3VsYXIgSlNPTiBTY2hlbWEgRm9ybSBhZG1pbmlzdHJhdGl2ZSB3aWRnZXRzXG4gICAgbm9uZTogTm9uZUNvbXBvbmVudCwgLy8gUGxhY2Vob2xkZXIsIGZvciBkZXZlbG9wbWVudCAtIGRpc3BsYXlzIG5vdGhpbmdcbiAgICByb290OiBSb290Q29tcG9uZW50LCAvLyBGb3JtIHJvb3QsIHJlbmRlcnMgYSBjb21wbGV0ZSBsYXlvdXRcbiAgICAnc2VsZWN0LWZyYW1ld29yayc6IFNlbGVjdEZyYW1ld29ya0NvbXBvbmVudCwgLy8gQXBwbGllcyB0aGUgc2VsZWN0ZWQgZnJhbWV3b3JrIHRvIGEgc3BlY2lmaWVkIHdpZGdldFxuICAgICdzZWxlY3Qtd2lkZ2V0JzogU2VsZWN0V2lkZ2V0Q29tcG9uZW50LCAvLyBEaXNwbGF5cyBhIHNwZWNpZmllZCB3aWRnZXRcbiAgICAkcmVmOiBBZGRSZWZlcmVuY2VDb21wb25lbnQsIC8vIEJ1dHRvbiB0byBhZGQgYSBuZXcgYXJyYXkgaXRlbSBvciAkcmVmIGVsZW1lbnRcblxuICAgIC8vIEZyZWUtZm9ybSB0ZXh0IEhUTUwgJ2lucHV0JyBmb3JtIGNvbnRyb2wgd2lkZ2V0cyA8aW5wdXQgdHlwZT1cIi4uLlwiPlxuICAgIGVtYWlsOiAndGV4dCcsXG4gICAgaW50ZWdlcjogJ251bWJlcicsIC8vIE5vdGU6ICdpbnRlZ2VyJyBpcyBub3QgYSByZWNvZ25pemVkIEhUTUwgaW5wdXQgdHlwZVxuICAgIG51bWJlcjogTnVtYmVyQ29tcG9uZW50LFxuICAgIHBhc3N3b3JkOiAndGV4dCcsXG4gICAgc2VhcmNoOiAndGV4dCcsXG4gICAgdGVsOiAndGV4dCcsXG4gICAgdGV4dDogSW5wdXRDb21wb25lbnQsXG4gICAgdXI6ICd0ZXh0JyxcblxuICAgIC8vIENvbnRyb2xsZWQgdGV4dCBIVE1MICdpbnB1dCcgZm9ybSBjb250cm9sIHdpZGdldHMgPGlucHV0IHR5cGU9XCIuLi5cIj5cbiAgICBjb2xvcjogJ3RleHQnLFxuICAgIGRhdGU6ICd0ZXh0JyxcbiAgICBkYXRldGltZTogJ3RleHQnLFxuICAgICdkYXRldGltZS1sb2NhbCc6ICd0ZXh0JyxcbiAgICBtb250aDogJ3RleHQnLFxuICAgIHJhbmdlOiAnbnVtYmVyJyxcbiAgICB0aW1lOiAndGV4dCcsXG4gICAgd2VlazogJ3RleHQnLFxuXG4gICAgLy8gTm9uLXRleHQgSFRNTCAnaW5wdXQnIGZvcm0gY29udHJvbCB3aWRnZXRzIDxpbnB1dCB0eXBlPVwiLi4uXCI+XG4gICAgLy8gJ2J1dHRvbic6IDxpbnB1dCB0eXBlPVwiYnV0dG9uXCI+IG5vdCB1c2VkLCB1c2UgPGJ1dHRvbj4gaW5zdGVhZFxuICAgIGNoZWNrYm94OiBDaGVja2JveENvbXBvbmVudCwgLy8gVE9ETzogU2V0IHRlcm5hcnkgPSB0cnVlIGZvciAzLXN0YXRlID8/XG4gICAgZmlsZTogRmlsZUNvbXBvbmVudCwgLy8gVE9ETzogRmluaXNoICdmaWxlJyB3aWRnZXRcbiAgICBoaWRkZW46ICd0ZXh0JyxcbiAgICBpbWFnZTogJ3RleHQnLCAvLyBUT0RPOiBGaWd1cmUgb3V0IGhvdyB0byBoYW5kbGUgdGhlc2VcbiAgICByYWRpbzogJ3JhZGlvcycsXG4gICAgcmVzZXQ6ICdzdWJtaXQnLCAvLyBUT0RPOiBGaWd1cmUgb3V0IGhvdyB0byBoYW5kbGUgdGhlc2VcbiAgICBzdWJtaXQ6IFN1Ym1pdENvbXBvbmVudCxcblxuICAgIC8vIE90aGVyIChub24tJ2lucHV0JykgSFRNTCBmb3JtIGNvbnRyb2wgd2lkZ2V0c1xuICAgIGJ1dHRvbjogQnV0dG9uQ29tcG9uZW50LFxuICAgIHNlbGVjdDogU2VsZWN0Q29tcG9uZW50LFxuICAgIC8vICdvcHRpb24nOiBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBzZWxlY3Qgd2lkZ2V0c1xuICAgIC8vICdvcHRncm91cCc6IGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IHNlbGVjdCB3aWRnZXRzXG4gICAgdGV4dGFyZWE6IFRleHRhcmVhQ29tcG9uZW50LFxuXG4gICAgLy8gSFRNTCBmb3JtIGNvbnRyb2wgd2lkZ2V0IHNldHNcbiAgICBjaGVja2JveGVzOiBDaGVja2JveGVzQ29tcG9uZW50LCAvLyBHcm91cGVkIGxpc3Qgb2YgY2hlY2tib3hlc1xuICAgICdjaGVja2JveGVzLWlubGluZSc6ICdjaGVja2JveGVzJywgLy8gQ2hlY2tib3hlcyBpbiBvbmUgbGluZVxuICAgIGNoZWNrYm94YnV0dG9uczogJ2NoZWNrYm94ZXMnLCAvLyBDaGVja2JveGVzIGFzIGh0bWwgYnV0dG9uc1xuICAgIHJhZGlvczogUmFkaW9zQ29tcG9uZW50LCAvLyBHcm91cGVkIGxpc3Qgb2YgcmFkaW8gYnV0dG9uc1xuICAgICdyYWRpb3MtaW5saW5lJzogJ3JhZGlvcycsIC8vIFJhZGlvIGNvbnRyb2xzIGluIG9uZSBsaW5lXG4gICAgcmFkaW9idXR0b25zOiAncmFkaW9zJywgLy8gUmFkaW8gY29udHJvbHMgYXMgaHRtbCBidXR0b25zXG5cbiAgICAvLyBIVE1MIExheW91dCB3aWRnZXRzXG4gICAgLy8gJ2xhYmVsJzogYXV0b21hdGljYWxseSBhZGRlZCB0byBkYXRhIHdpZGdldHNcbiAgICAvLyAnbGVnZW5kJzogYXV0b21hdGljYWxseSBhZGRlZCB0byBmaWVsZHNldHNcbiAgICBzZWN0aW9uOiBTZWN0aW9uQ29tcG9uZW50LCAvLyBKdXN0IGEgZGl2IDxkaXY+XG4gICAgZGl2OiAnc2VjdGlvbicsIC8vIFN0aWxsIGp1c3QgYSBkaXYgPGRpdj5cbiAgICBmaWVsZHNldDogJ3NlY3Rpb24nLCAvLyBBIGZpZWxkc2V0LCB3aXRoIGFuIG9wdGlvbmFsIGxlZ2VuZCA8ZmllbGRzZXQ+XG4gICAgZmxleDogJ3NlY3Rpb24nLCAvLyBBIGZsZXhib3ggY29udGFpbmVyIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4XCI+XG5cbiAgICAvLyBOb24tSFRNTCBsYXlvdXQgd2lkZ2V0c1xuICAgICdvbmUtb2YnOiBPbmVPZkNvbXBvbmVudCwgLy8gQSBzZWxlY3QgYm94IHRoYXQgY2hhbmdlcyBhbm90aGVyIGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBGaW5pc2ggJ29uZS1vZicgd2lkZ2V0XG4gICAgYXJyYXk6ICdzZWN0aW9uJywgLy8gQSBsaXN0IHlvdSBjYW4gYWRkLCByZW1vdmUgYW5kIHJlb3JkZXIgPGZpZWxkc2V0PlxuICAgIHRhYmFycmF5OiAndGFicycsIC8vIEEgdGFiYmVkIHZlcnNpb24gb2YgYXJyYXlcbiAgICB0YWI6ICdzZWN0aW9uJywgLy8gQSB0YWIgZ3JvdXAsIHNpbWlsYXIgdG8gYSBmaWVsZHNldCBvciBzZWN0aW9uIDxmaWVsZHNldD5cbiAgICB0YWJzOiBUYWJzQ29tcG9uZW50LCAvLyBBIHRhYmJlZCBzZXQgb2YgcGFuZWxzIHdpdGggZGlmZmVyZW50IGNvbnRyb2xzXG4gICAgbWVzc2FnZTogTWVzc2FnZUNvbXBvbmVudCwgLy8gSW5zZXJ0IGFyYml0cmFyeSBodG1sXG4gICAgaGVscDogJ21lc3NhZ2UnLCAvLyBJbnNlcnQgYXJiaXRyYXJ5IGh0bWxcbiAgICBtc2c6ICdtZXNzYWdlJywgLy8gSW5zZXJ0IGFyYml0cmFyeSBodG1sXG4gICAgaHRtbDogJ21lc3NhZ2UnLCAvLyBJbnNlcnQgYXJiaXRyYXJ5IGh0bWxcbiAgICB0ZW1wbGF0ZTogVGVtcGxhdGVDb21wb25lbnQsIC8vIEluc2VydCBhIGN1c3RvbSBBbmd1bGFyIGNvbXBvbmVudFxuXG4gICAgLy8gV2lkZ2V0cyBpbmNsdWRlZCBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEpTT04gRm9ybSBBUElcbiAgICBhZHZhbmNlZGZpZWxkc2V0OiAnc2VjdGlvbicsIC8vIEFkZHMgJ0FkdmFuY2VkIHNldHRpbmdzJyB0aXRsZSA8ZmllbGRzZXQ+XG4gICAgYXV0aGZpZWxkc2V0OiAnc2VjdGlvbicsIC8vIEFkZHMgJ0F1dGhlbnRpY2F0aW9uIHNldHRpbmdzJyB0aXRsZSA8ZmllbGRzZXQ+XG4gICAgb3B0aW9uZmllbGRzZXQ6ICdvbmUtb2YnLCAvLyBPcHRpb24gY29udHJvbCwgZGlzcGxheXMgc2VsZWN0ZWQgc3ViLWl0ZW0gPGZpZWxkc2V0PlxuICAgIHNlbGVjdGZpZWxkc2V0OiAnb25lLW9mJywgLy8gU2VsZWN0IGNvbnRyb2wsIGRpc3BsYXlzIHNlbGVjdGVkIHN1Yi1pdGVtIDxmaWVsZHNldD5cbiAgICBjb25kaXRpb25hbDogJ3NlY3Rpb24nLCAvLyBJZGVudGljYWwgdG8gJ3NlY3Rpb24nIChkZXBlY2lhdGVkKSA8ZGl2PlxuICAgIGFjdGlvbnM6ICdzZWN0aW9uJywgLy8gSG9yaXpvbnRhbCBidXR0b24gbGlzdCwgY2FuIG9ubHkgc3VibWl0LCB1c2VzIGJ1dHRvbnMgYXMgaXRlbXMgPGRpdj5cbiAgICB0YWdzaW5wdXQ6ICdzZWN0aW9uJywgLy8gRm9yIGVudGVyaW5nIHNob3J0IHRleHQgdGFncyA8ZGl2PlxuICAgIC8vIFNlZTogaHR0cDovL3VsaW9uLmdpdGh1Yi5pby9qc29uZm9ybS9wbGF5Z3JvdW5kLz9leGFtcGxlPWZpZWxkcy1jaGVja2JveGJ1dHRvbnNcblxuICAgIC8vIFdpZGdldHMgaW5jbHVkZWQgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBSZWFjdCBKU09OIFNjaGVtYSBGb3JtIEFQSVxuICAgIHVwZG93bjogJ251bWJlcicsXG4gICAgJ2RhdGUtdGltZSc6ICdkYXRldGltZS1sb2NhbCcsXG4gICAgJ2FsdC1kYXRldGltZSc6ICdkYXRldGltZS1sb2NhbCcsXG4gICAgJ2FsdC1kYXRlJzogJ2RhdGUnLFxuXG4gICAgLy8gV2lkZ2V0cyBpbmNsdWRlZCBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgU2NoZW1hIEZvcm0gQVBJXG4gICAgd2l6YXJkOiAnc2VjdGlvbicsIC8vIFRPRE86IFNlcXVlbnRpYWwgcGFuZWxzIHdpdGggXCJOZXh0XCIgYW5kIFwiUHJldmlvdXNcIiBidXR0b25zXG5cbiAgICAvLyBXaWRnZXRzIGluY2x1ZGVkIGZvciBjb21wYXRpYmlsaXR5IHdpdGggb3RoZXIgbGlicmFyaWVzXG4gICAgdGV4dGxpbmU6ICd0ZXh0JyxcblxuICAgIC8vIFJlY29tbWVuZGVkIDNyZC1wYXJ0eSBhZGQtb24gd2lkZ2V0cyAoVE9ETzogY3JlYXRlIHdyYXBwZXJzIGZvciB0aGVzZS4uLilcbiAgICAvLyAnbmcyLXNlbGVjdCc6IFNlbGVjdCBjb250cm9sIHJlcGxhY2VtZW50IC0gaHR0cDovL3ZhbG9yLXNvZnR3YXJlLmNvbS9uZzItc2VsZWN0L1xuICAgIC8vICdmbGF0cGlja3InOiBGbGF0cGlja3IgZGF0ZSBwaWNrZXIgLSBodHRwczovL2dpdGh1Yi5jb20vY2htbG4vZmxhdHBpY2tyXG4gICAgLy8gJ3Bpa2FkYXknOiBQaWthZGF5IGRhdGUgcGlja2VyIC0gaHR0cHM6Ly9naXRodWIuY29tL2RidXNoZWxsL1Bpa2FkYXlcbiAgICAvLyAnc3BlY3RydW0nOiBTcGVjdHJ1bSBjb2xvciBwaWNrZXIgLSBodHRwOi8vYmdyaW5zLmdpdGh1Yi5pby9zcGVjdHJ1bVxuICAgIC8vICdib290c3RyYXAtc2xpZGVyJzogQm9vdHN0cmFwIFNsaWRlciByYW5nZSBjb250cm9sIC0gaHR0cHM6Ly9naXRodWIuY29tL3NlaXlyaWEvYm9vdHN0cmFwLXNsaWRlclxuICAgIC8vICdhY2UnOiBBQ0UgY29kZSBlZGl0b3IgLSBodHRwczovL2FjZS5jOS5pb1xuICAgIC8vICdja2VkaXRvcic6IENLRWRpdG9yIEhUTUwgLyByaWNoIHRleHQgZWRpdG9yIC0gaHR0cDovL2NrZWRpdG9yLmNvbVxuICAgIC8vICd0aW55bWNlJzogVGlueU1DRSBIVE1MIC8gcmljaCB0ZXh0IGVkaXRvciAtIGh0dHBzOi8vd3d3LnRpbnltY2UuY29tXG4gICAgLy8gJ2ltYWdlc2VsZWN0JzogQm9vdHN0cmFwIGRyb3AtZG93biBpbWFnZSBzZWxlY3RvciAtIGh0dHA6Ly9zaWx2aW9tb3JldG8uZ2l0aHViLmlvL2Jvb3RzdHJhcC1zZWxlY3RcbiAgICAvLyAnd3lzaWh0bWw1JzogSFRNTCBlZGl0b3IgLSBodHRwOi8vamhvbGxpbmd3b3J0aC5naXRodWIuaW8vYm9vdHN0cmFwLXd5c2lodG1sNVxuICAgIC8vICdxdWlsbCc6IFF1aWxsIEhUTUwgLyByaWNoIHRleHQgZWRpdG9yICg/KSAtIGh0dHBzOi8vcXVpbGxqcy5jb21cbiAgfVxuICByZWdpc3RlcmVkV2lkZ2V0czogYW55ID0ge31cbiAgZnJhbWV3b3JrV2lkZ2V0czogYW55ID0ge31cbiAgYWN0aXZlV2lkZ2V0czogYW55ID0ge31cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNldEFjdGl2ZVdpZGdldHMoKVxuICB9XG5cbiAgc2V0QWN0aXZlV2lkZ2V0cygpOiBib29sZWFuIHtcbiAgICB0aGlzLmFjdGl2ZVdpZGdldHMgPSBPYmplY3QuYXNzaWduKFxuICAgICAge30sIHRoaXMud2lkZ2V0TGlicmFyeSwgdGhpcy5mcmFtZXdvcmtXaWRnZXRzLCB0aGlzLnJlZ2lzdGVyZWRXaWRnZXRzXG4gICAgKVxuICAgIGZvciAoY29uc3Qgd2lkZ2V0TmFtZSBvZiBPYmplY3Qua2V5cyh0aGlzLmFjdGl2ZVdpZGdldHMpKSB7XG4gICAgICBsZXQgd2lkZ2V0OiBhbnkgPSB0aGlzLmFjdGl2ZVdpZGdldHNbd2lkZ2V0TmFtZV1cbiAgICAgIC8vIFJlc29sdmUgYWxpYXNlc1xuICAgICAgaWYgKHR5cGVvZiB3aWRnZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IHVzZWRBbGlhc2VzOiBzdHJpbmdbXSA9IFtdXG4gICAgICAgIHdoaWxlICh0eXBlb2Ygd2lkZ2V0ID09PSAnc3RyaW5nJyAmJiAhdXNlZEFsaWFzZXMuaW5jbHVkZXMod2lkZ2V0KSkge1xuICAgICAgICAgIHVzZWRBbGlhc2VzLnB1c2god2lkZ2V0KVxuICAgICAgICAgIHdpZGdldCA9IHRoaXMuYWN0aXZlV2lkZ2V0c1t3aWRnZXRdXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB3aWRnZXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhpcy5hY3RpdmVXaWRnZXRzW3dpZGdldE5hbWVdID0gd2lkZ2V0XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHNldERlZmF1bHRXaWRnZXQodHlwZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmhhc1dpZGdldCh0eXBlKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHRoaXMuZGVmYXVsdFdpZGdldCA9IHR5cGVcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaGFzV2lkZ2V0KHR5cGU6IHN0cmluZywgd2lkZ2V0U2V0ID0gJ2FjdGl2ZVdpZGdldHMnKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0eXBlIHx8IHR5cGVvZiB0eXBlICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHJldHVybiBoYXNPd24odGhpc1t3aWRnZXRTZXRdLCB0eXBlKVxuICB9XG5cbiAgaGFzRGVmYXVsdFdpZGdldCh0eXBlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5oYXNXaWRnZXQodHlwZSwgJ3dpZGdldExpYnJhcnknKVxuICB9XG5cbiAgcmVnaXN0ZXJXaWRnZXQodHlwZTogc3RyaW5nLCB3aWRnZXQ6IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmICghdHlwZSB8fCAhd2lkZ2V0IHx8IHR5cGVvZiB0eXBlICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHRoaXMucmVnaXN0ZXJlZFdpZGdldHNbdHlwZV0gPSB3aWRnZXRcbiAgICByZXR1cm4gdGhpcy5zZXRBY3RpdmVXaWRnZXRzKClcbiAgfVxuXG4gIHVuUmVnaXN0ZXJXaWRnZXQodHlwZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKCFoYXNPd24odGhpcy5yZWdpc3RlcmVkV2lkZ2V0cywgdHlwZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBkZWxldGUgdGhpcy5yZWdpc3RlcmVkV2lkZ2V0c1t0eXBlXVxuICAgIHJldHVybiB0aGlzLnNldEFjdGl2ZVdpZGdldHMoKVxuICB9XG5cbiAgdW5SZWdpc3RlckFsbFdpZGdldHModW5SZWdpc3RlckZyYW1ld29ya1dpZGdldHMgPSB0cnVlKTogYm9vbGVhbiB7XG4gICAgdGhpcy5yZWdpc3RlcmVkV2lkZ2V0cyA9IHt9XG4gICAgaWYgKHVuUmVnaXN0ZXJGcmFtZXdvcmtXaWRnZXRzKSB7XG4gICAgICB0aGlzLmZyYW1ld29ya1dpZGdldHMgPSB7fVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zZXRBY3RpdmVXaWRnZXRzKClcbiAgfVxuXG4gIHJlZ2lzdGVyRnJhbWV3b3JrV2lkZ2V0cyh3aWRnZXRzOiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAod2lkZ2V0cyA9PT0gbnVsbCB8fCB0eXBlb2Ygd2lkZ2V0cyAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHdpZGdldHMgPSB7fVxuICAgIH1cbiAgICB0aGlzLmZyYW1ld29ya1dpZGdldHMgPSB3aWRnZXRzXG4gICAgcmV0dXJuIHRoaXMuc2V0QWN0aXZlV2lkZ2V0cygpXG4gIH1cblxuICB1blJlZ2lzdGVyRnJhbWV3b3JrV2lkZ2V0cygpOiBib29sZWFuIHtcbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5mcmFtZXdvcmtXaWRnZXRzKS5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZnJhbWV3b3JrV2lkZ2V0cyA9IHt9XG4gICAgICByZXR1cm4gdGhpcy5zZXRBY3RpdmVXaWRnZXRzKClcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBnZXRXaWRnZXQodHlwZT86IHN0cmluZywgd2lkZ2V0U2V0ID0gJ2FjdGl2ZVdpZGdldHMnKTogYW55IHtcbiAgICBpZiAodGhpcy5oYXNXaWRnZXQodHlwZSwgd2lkZ2V0U2V0KSkge1xuICAgICAgcmV0dXJuIHRoaXNbd2lkZ2V0U2V0XVt0eXBlXVxuICAgIH0gZWxzZSBpZiAodGhpcy5oYXNXaWRnZXQodGhpcy5kZWZhdWx0V2lkZ2V0LCB3aWRnZXRTZXQpKSB7XG4gICAgICByZXR1cm4gdGhpc1t3aWRnZXRTZXRdW3RoaXMuZGVmYXVsdFdpZGdldF1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICBnZXRBbGxXaWRnZXRzKCk6IGFueSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZGdldExpYnJhcnk6IHRoaXMud2lkZ2V0TGlicmFyeSxcbiAgICAgIHJlZ2lzdGVyZWRXaWRnZXRzOiB0aGlzLnJlZ2lzdGVyZWRXaWRnZXRzLFxuICAgICAgZnJhbWV3b3JrV2lkZ2V0czogdGhpcy5mcmFtZXdvcmtXaWRnZXRzLFxuICAgICAgYWN0aXZlV2lkZ2V0czogdGhpcy5hY3RpdmVXaWRnZXRzLFxuICAgIH1cbiAgfVxufVxuIl19