import { Injectable } from '@angular/core';
import { Framework } from '@ngsf/common';
import { FlexLayoutRootComponent } from './components/flex-layout-root.component';
import { FlexLayoutSectionComponent } from './components/flex-layout-section.component';
import { MaterialAddReferenceComponent } from './components/material-add-reference.component';
import { MaterialButtonComponent } from './components/material-button.component';
import { MaterialButtonGroupComponent } from './components/material-button-group.component';
import { MaterialCheckboxComponent } from './components/material-checkbox.component';
import { MaterialCheckboxesComponent } from './components/material-checkboxes.component';
import { MaterialChipListComponent } from './components/material-chip-list.component';
import { MaterialDatepickerComponent } from './components/material-datepicker.component';
import { MaterialFileComponent } from './components/material-file.component';
import { MaterialInputComponent } from './components/material-input.component';
import { MaterialNumberComponent } from './components/material-number.component';
import { MaterialOneOfComponent } from './components/material-one-of.component';
import { MaterialRadiosComponent } from './components/material-radios.component';
import { MaterialSelectComponent } from './components/material-select.component';
import { MaterialSliderComponent } from './components/material-slider.component';
import { MaterialStepperComponent } from './components/material-stepper.component';
import { MaterialTabsComponent } from './components/material-tabs.component';
import { MaterialTextareaComponent } from './components/material-textarea.component';
import { MaterialDesignFrameworkComponent } from './components/material-design-framework.component';
import * as i0 from "@angular/core";
export class MaterialDesignFramework extends Framework {
    constructor() {
        super(...arguments);
        this.name = 'material-design';
        this.framework = MaterialDesignFrameworkComponent;
        this.stylesheets = [
            '//fonts.googleapis.com/icon?family=Material+Icons',
            '//fonts.googleapis.com/css?family=Roboto:300,400,500,700',
        ];
        this.widgets = {
            root: FlexLayoutRootComponent,
            section: FlexLayoutSectionComponent,
            $ref: MaterialAddReferenceComponent,
            button: MaterialButtonComponent,
            'button-group': MaterialButtonGroupComponent,
            checkbox: MaterialCheckboxComponent,
            checkboxes: MaterialCheckboxesComponent,
            'chip-list': MaterialChipListComponent,
            date: MaterialDatepickerComponent,
            file: MaterialFileComponent,
            number: MaterialNumberComponent,
            'one-of': MaterialOneOfComponent,
            radios: MaterialRadiosComponent,
            select: MaterialSelectComponent,
            slider: MaterialSliderComponent,
            stepper: MaterialStepperComponent,
            tabs: MaterialTabsComponent,
            text: MaterialInputComponent,
            textarea: MaterialTextareaComponent,
            'alt-date': 'date',
            'any-of': 'one-of',
            card: 'section',
            color: 'text',
            'expansion-panel': 'section',
            hidden: 'none',
            image: 'none',
            integer: 'number',
            radiobuttons: 'button-group',
            range: 'slider',
            submit: 'button',
            tagsinput: 'chip-list',
            wizard: 'stepper',
        };
    }
}
MaterialDesignFramework.ɵfac = function () { let ɵMaterialDesignFramework_BaseFactory; return function MaterialDesignFramework_Factory(t) { return (ɵMaterialDesignFramework_BaseFactory || (ɵMaterialDesignFramework_BaseFactory = i0.ɵɵgetInheritedFactory(MaterialDesignFramework)))(t || MaterialDesignFramework); }; }();
MaterialDesignFramework.ɵprov = i0.ɵɵdefineInjectable({ token: MaterialDesignFramework, factory: MaterialDesignFramework.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialDesignFramework, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGVzaWduLmZyYW1ld29yay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nc2YtbWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay9zcmMvbGliL21hdGVyaWFsLWRlc2lnbi5mcmFtZXdvcmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUN4QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBRXRDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHlDQUF5QyxDQUFBO0FBQy9FLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLDRDQUE0QyxDQUFBO0FBQ3JGLE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLCtDQUErQyxDQUFBO0FBQzNGLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHdDQUF3QyxDQUFBO0FBQzlFLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLDhDQUE4QyxDQUFBO0FBQ3pGLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFBO0FBQ2xGLE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLDRDQUE0QyxDQUFBO0FBQ3RGLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLDJDQUEyQyxDQUFBO0FBQ25GLE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLDRDQUE0QyxDQUFBO0FBQ3RGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFBO0FBQzFFLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHVDQUF1QyxDQUFBO0FBQzVFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHdDQUF3QyxDQUFBO0FBQzlFLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFBO0FBQzdFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHdDQUF3QyxDQUFBO0FBQzlFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHdDQUF3QyxDQUFBO0FBQzlFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHdDQUF3QyxDQUFBO0FBQzlFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHlDQUF5QyxDQUFBO0FBQ2hGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFBO0FBQzFFLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFBO0FBQ2xGLE9BQU8sRUFBQyxnQ0FBZ0MsRUFBQyxNQUFNLGtEQUFrRCxDQUFBOztBQUdqRyxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsU0FBUztJQUR0RDs7UUFFRSxTQUFJLEdBQUcsaUJBQWlCLENBQUE7UUFFeEIsY0FBUyxHQUFHLGdDQUFnQyxDQUFBO1FBRTVDLGdCQUFXLEdBQUc7WUFDWixtREFBbUQ7WUFDbkQsMERBQTBEO1NBQzNELENBQUE7UUFFRCxZQUFPLEdBQUc7WUFDUixJQUFJLEVBQUUsdUJBQXVCO1lBQzdCLE9BQU8sRUFBRSwwQkFBMEI7WUFDbkMsSUFBSSxFQUFFLDZCQUE2QjtZQUNuQyxNQUFNLEVBQUUsdUJBQXVCO1lBQy9CLGNBQWMsRUFBRSw0QkFBNEI7WUFDNUMsUUFBUSxFQUFFLHlCQUF5QjtZQUNuQyxVQUFVLEVBQUUsMkJBQTJCO1lBQ3ZDLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsSUFBSSxFQUFFLDJCQUEyQjtZQUNqQyxJQUFJLEVBQUUscUJBQXFCO1lBQzNCLE1BQU0sRUFBRSx1QkFBdUI7WUFDL0IsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxNQUFNLEVBQUUsdUJBQXVCO1lBQy9CLE1BQU0sRUFBRSx1QkFBdUI7WUFDL0IsTUFBTSxFQUFFLHVCQUF1QjtZQUMvQixPQUFPLEVBQUUsd0JBQXdCO1lBQ2pDLElBQUksRUFBRSxxQkFBcUI7WUFDM0IsSUFBSSxFQUFFLHNCQUFzQjtZQUM1QixRQUFRLEVBQUUseUJBQXlCO1lBQ25DLFVBQVUsRUFBRSxNQUFNO1lBQ2xCLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLElBQUksRUFBRSxTQUFTO1lBQ2YsS0FBSyxFQUFFLE1BQU07WUFDYixpQkFBaUIsRUFBRSxTQUFTO1lBQzVCLE1BQU0sRUFBRSxNQUFNO1lBQ2QsS0FBSyxFQUFFLE1BQU07WUFDYixPQUFPLEVBQUUsUUFBUTtZQUNqQixZQUFZLEVBQUUsY0FBYztZQUM1QixLQUFLLEVBQUUsUUFBUTtZQUNmLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLFNBQVMsRUFBRSxXQUFXO1lBQ3RCLE1BQU0sRUFBRSxTQUFTO1NBQ2xCLENBQUE7S0FDRjs7NlBBNUNZLHVCQUF1QixTQUF2Qix1QkFBdUI7K0RBQXZCLHVCQUF1QixXQUF2Qix1QkFBdUI7dUZBQXZCLHVCQUF1QjtjQURuQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtGcmFtZXdvcmt9IGZyb20gJ0BuZ3NmL2NvbW1vbidcblxuaW1wb3J0IHtGbGV4TGF5b3V0Um9vdENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2ZsZXgtbGF5b3V0LXJvb3QuY29tcG9uZW50J1xuaW1wb3J0IHtGbGV4TGF5b3V0U2VjdGlvbkNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2ZsZXgtbGF5b3V0LXNlY3Rpb24uY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbEFkZFJlZmVyZW5jZUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLWFkZC1yZWZlcmVuY2UuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbEJ1dHRvbkNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLWJ1dHRvbi5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsQnV0dG9uR3JvdXBDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1idXR0b24tZ3JvdXAuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbENoZWNrYm94Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtY2hlY2tib3guY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbENoZWNrYm94ZXNDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1jaGVja2JveGVzLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxDaGlwTGlzdENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLWNoaXAtbGlzdC5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsRGF0ZXBpY2tlckNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLWRhdGVwaWNrZXIuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbEZpbGVDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1maWxlLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxJbnB1dENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLWlucHV0LmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxOdW1iZXJDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1udW1iZXIuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbE9uZU9mQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtb25lLW9mLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxSYWRpb3NDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1yYWRpb3MuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbFNlbGVjdENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLXNlbGVjdC5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsU2xpZGVyQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtc2xpZGVyLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxTdGVwcGVyQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtc3RlcHBlci5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsVGFic0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLXRhYnMuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbFRleHRhcmVhQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtdGV4dGFyZWEuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbERlc2lnbkZyYW1ld29ya0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsuY29tcG9uZW50J1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxEZXNpZ25GcmFtZXdvcmsgZXh0ZW5kcyBGcmFtZXdvcmsge1xuICBuYW1lID0gJ21hdGVyaWFsLWRlc2lnbidcblxuICBmcmFtZXdvcmsgPSBNYXRlcmlhbERlc2lnbkZyYW1ld29ya0NvbXBvbmVudFxuXG4gIHN0eWxlc2hlZXRzID0gW1xuICAgICcvL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2ljb24/ZmFtaWx5PU1hdGVyaWFsK0ljb25zJyxcbiAgICAnLy9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVJvYm90bzozMDAsNDAwLDUwMCw3MDAnLFxuICBdXG5cbiAgd2lkZ2V0cyA9IHtcbiAgICByb290OiBGbGV4TGF5b3V0Um9vdENvbXBvbmVudCxcbiAgICBzZWN0aW9uOiBGbGV4TGF5b3V0U2VjdGlvbkNvbXBvbmVudCxcbiAgICAkcmVmOiBNYXRlcmlhbEFkZFJlZmVyZW5jZUNvbXBvbmVudCxcbiAgICBidXR0b246IE1hdGVyaWFsQnV0dG9uQ29tcG9uZW50LFxuICAgICdidXR0b24tZ3JvdXAnOiBNYXRlcmlhbEJ1dHRvbkdyb3VwQ29tcG9uZW50LFxuICAgIGNoZWNrYm94OiBNYXRlcmlhbENoZWNrYm94Q29tcG9uZW50LFxuICAgIGNoZWNrYm94ZXM6IE1hdGVyaWFsQ2hlY2tib3hlc0NvbXBvbmVudCxcbiAgICAnY2hpcC1saXN0JzogTWF0ZXJpYWxDaGlwTGlzdENvbXBvbmVudCxcbiAgICBkYXRlOiBNYXRlcmlhbERhdGVwaWNrZXJDb21wb25lbnQsXG4gICAgZmlsZTogTWF0ZXJpYWxGaWxlQ29tcG9uZW50LFxuICAgIG51bWJlcjogTWF0ZXJpYWxOdW1iZXJDb21wb25lbnQsXG4gICAgJ29uZS1vZic6IE1hdGVyaWFsT25lT2ZDb21wb25lbnQsXG4gICAgcmFkaW9zOiBNYXRlcmlhbFJhZGlvc0NvbXBvbmVudCxcbiAgICBzZWxlY3Q6IE1hdGVyaWFsU2VsZWN0Q29tcG9uZW50LFxuICAgIHNsaWRlcjogTWF0ZXJpYWxTbGlkZXJDb21wb25lbnQsXG4gICAgc3RlcHBlcjogTWF0ZXJpYWxTdGVwcGVyQ29tcG9uZW50LFxuICAgIHRhYnM6IE1hdGVyaWFsVGFic0NvbXBvbmVudCxcbiAgICB0ZXh0OiBNYXRlcmlhbElucHV0Q29tcG9uZW50LFxuICAgIHRleHRhcmVhOiBNYXRlcmlhbFRleHRhcmVhQ29tcG9uZW50LFxuICAgICdhbHQtZGF0ZSc6ICdkYXRlJyxcbiAgICAnYW55LW9mJzogJ29uZS1vZicsXG4gICAgY2FyZDogJ3NlY3Rpb24nLFxuICAgIGNvbG9yOiAndGV4dCcsXG4gICAgJ2V4cGFuc2lvbi1wYW5lbCc6ICdzZWN0aW9uJyxcbiAgICBoaWRkZW46ICdub25lJyxcbiAgICBpbWFnZTogJ25vbmUnLFxuICAgIGludGVnZXI6ICdudW1iZXInLFxuICAgIHJhZGlvYnV0dG9uczogJ2J1dHRvbi1ncm91cCcsXG4gICAgcmFuZ2U6ICdzbGlkZXInLFxuICAgIHN1Ym1pdDogJ2J1dHRvbicsXG4gICAgdGFnc2lucHV0OiAnY2hpcC1saXN0JyxcbiAgICB3aXphcmQ6ICdzdGVwcGVyJyxcbiAgfVxufVxuIl19