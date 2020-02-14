var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var MaterialDesignFramework = (function (_super) {
    __extends(MaterialDesignFramework, _super);
    function MaterialDesignFramework() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'material-design';
        _this.framework = MaterialDesignFrameworkComponent;
        _this.stylesheets = [
            '//fonts.googleapis.com/icon?family=Material+Icons',
            '//fonts.googleapis.com/css?family=Roboto:300,400,500,700',
        ];
        _this.widgets = {
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
        return _this;
    }
    MaterialDesignFramework = __decorate([
        Injectable()
    ], MaterialDesignFramework);
    return MaterialDesignFramework;
}(Framework));
export { MaterialDesignFramework };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGVzaWduLmZyYW1ld29yay5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL21hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsvIiwic291cmNlcyI6WyJsaWIvbWF0ZXJpYWwtZGVzaWduLmZyYW1ld29yay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUN4QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBRXRDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHlDQUF5QyxDQUFBO0FBQy9FLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLDRDQUE0QyxDQUFBO0FBQ3JGLE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLCtDQUErQyxDQUFBO0FBQzNGLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHdDQUF3QyxDQUFBO0FBQzlFLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLDhDQUE4QyxDQUFBO0FBQ3pGLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFBO0FBQ2xGLE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLDRDQUE0QyxDQUFBO0FBQ3RGLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLDJDQUEyQyxDQUFBO0FBQ25GLE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLDRDQUE0QyxDQUFBO0FBQ3RGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFBO0FBQzFFLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHVDQUF1QyxDQUFBO0FBQzVFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHdDQUF3QyxDQUFBO0FBQzlFLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFBO0FBQzdFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHdDQUF3QyxDQUFBO0FBQzlFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHdDQUF3QyxDQUFBO0FBQzlFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHdDQUF3QyxDQUFBO0FBQzlFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHlDQUF5QyxDQUFBO0FBQ2hGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFBO0FBQzFFLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFBO0FBQ2xGLE9BQU8sRUFBQyxnQ0FBZ0MsRUFBQyxNQUFNLGtEQUFrRCxDQUFBO0FBR2pHO0lBQTZDLDJDQUFTO0lBQXREO1FBQUEscUVBNENDO1FBM0NDLFVBQUksR0FBRyxpQkFBaUIsQ0FBQTtRQUV4QixlQUFTLEdBQUcsZ0NBQWdDLENBQUE7UUFFNUMsaUJBQVcsR0FBRztZQUNaLG1EQUFtRDtZQUNuRCwwREFBMEQ7U0FDM0QsQ0FBQTtRQUVELGFBQU8sR0FBRztZQUNSLElBQUksRUFBRSx1QkFBdUI7WUFDN0IsT0FBTyxFQUFFLDBCQUEwQjtZQUNuQyxJQUFJLEVBQUUsNkJBQTZCO1lBQ25DLE1BQU0sRUFBRSx1QkFBdUI7WUFDL0IsY0FBYyxFQUFFLDRCQUE0QjtZQUM1QyxRQUFRLEVBQUUseUJBQXlCO1lBQ25DLFVBQVUsRUFBRSwyQkFBMkI7WUFDdkMsV0FBVyxFQUFFLHlCQUF5QjtZQUN0QyxJQUFJLEVBQUUsMkJBQTJCO1lBQ2pDLElBQUksRUFBRSxxQkFBcUI7WUFDM0IsTUFBTSxFQUFFLHVCQUF1QjtZQUMvQixRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLE1BQU0sRUFBRSx1QkFBdUI7WUFDL0IsTUFBTSxFQUFFLHVCQUF1QjtZQUMvQixNQUFNLEVBQUUsdUJBQXVCO1lBQy9CLE9BQU8sRUFBRSx3QkFBd0I7WUFDakMsSUFBSSxFQUFFLHFCQUFxQjtZQUMzQixJQUFJLEVBQUUsc0JBQXNCO1lBQzVCLFFBQVEsRUFBRSx5QkFBeUI7WUFDbkMsVUFBVSxFQUFFLE1BQU07WUFDbEIsUUFBUSxFQUFFLFFBQVE7WUFDbEIsSUFBSSxFQUFFLFNBQVM7WUFDZixLQUFLLEVBQUUsTUFBTTtZQUNiLGlCQUFpQixFQUFFLFNBQVM7WUFDNUIsTUFBTSxFQUFFLE1BQU07WUFDZCxLQUFLLEVBQUUsTUFBTTtZQUNiLE9BQU8sRUFBRSxRQUFRO1lBQ2pCLFlBQVksRUFBRSxjQUFjO1lBQzVCLEtBQUssRUFBRSxRQUFRO1lBQ2YsTUFBTSxFQUFFLFFBQVE7WUFDaEIsU0FBUyxFQUFFLFdBQVc7WUFDdEIsTUFBTSxFQUFFLFNBQVM7U0FDbEIsQ0FBQTs7SUFDSCxDQUFDO0lBNUNZLHVCQUF1QjtRQURuQyxVQUFVLEVBQUU7T0FDQSx1QkFBdUIsQ0E0Q25DO0lBQUQsOEJBQUM7Q0FBQSxBQTVDRCxDQUE2QyxTQUFTLEdBNENyRDtTQTVDWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0ZyYW1ld29ya30gZnJvbSAnQG5nc2YvY29tbW9uJ1xuXG5pbXBvcnQge0ZsZXhMYXlvdXRSb290Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvZmxleC1sYXlvdXQtcm9vdC5jb21wb25lbnQnXG5pbXBvcnQge0ZsZXhMYXlvdXRTZWN0aW9uQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvZmxleC1sYXlvdXQtc2VjdGlvbi5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsQWRkUmVmZXJlbmNlQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtYWRkLXJlZmVyZW5jZS5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsQnV0dG9uQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtYnV0dG9uLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxCdXR0b25Hcm91cENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLWJ1dHRvbi1ncm91cC5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsQ2hlY2tib3hDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1jaGVja2JveC5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsQ2hlY2tib3hlc0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLWNoZWNrYm94ZXMuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbENoaXBMaXN0Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtY2hpcC1saXN0LmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxEYXRlcGlja2VyQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtZGF0ZXBpY2tlci5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsRmlsZUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLWZpbGUuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbElucHV0Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtaW5wdXQuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbE51bWJlckNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLW51bWJlci5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsT25lT2ZDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1vbmUtb2YuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbFJhZGlvc0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLXJhZGlvcy5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsU2VsZWN0Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtc2VsZWN0LmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxTbGlkZXJDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1zbGlkZXIuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbFN0ZXBwZXJDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1zdGVwcGVyLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxUYWJzQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtdGFicy5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsVGV4dGFyZWFDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC10ZXh0YXJlYS5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsRGVzaWduRnJhbWV3b3JrQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay5jb21wb25lbnQnXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbERlc2lnbkZyYW1ld29yayBleHRlbmRzIEZyYW1ld29yayB7XG4gIG5hbWUgPSAnbWF0ZXJpYWwtZGVzaWduJ1xuXG4gIGZyYW1ld29yayA9IE1hdGVyaWFsRGVzaWduRnJhbWV3b3JrQ29tcG9uZW50XG5cbiAgc3R5bGVzaGVldHMgPSBbXG4gICAgJy8vZm9udHMuZ29vZ2xlYXBpcy5jb20vaWNvbj9mYW1pbHk9TWF0ZXJpYWwrSWNvbnMnLFxuICAgICcvL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9Um9ib3RvOjMwMCw0MDAsNTAwLDcwMCcsXG4gIF1cblxuICB3aWRnZXRzID0ge1xuICAgIHJvb3Q6IEZsZXhMYXlvdXRSb290Q29tcG9uZW50LFxuICAgIHNlY3Rpb246IEZsZXhMYXlvdXRTZWN0aW9uQ29tcG9uZW50LFxuICAgICRyZWY6IE1hdGVyaWFsQWRkUmVmZXJlbmNlQ29tcG9uZW50LFxuICAgIGJ1dHRvbjogTWF0ZXJpYWxCdXR0b25Db21wb25lbnQsXG4gICAgJ2J1dHRvbi1ncm91cCc6IE1hdGVyaWFsQnV0dG9uR3JvdXBDb21wb25lbnQsXG4gICAgY2hlY2tib3g6IE1hdGVyaWFsQ2hlY2tib3hDb21wb25lbnQsXG4gICAgY2hlY2tib3hlczogTWF0ZXJpYWxDaGVja2JveGVzQ29tcG9uZW50LFxuICAgICdjaGlwLWxpc3QnOiBNYXRlcmlhbENoaXBMaXN0Q29tcG9uZW50LFxuICAgIGRhdGU6IE1hdGVyaWFsRGF0ZXBpY2tlckNvbXBvbmVudCxcbiAgICBmaWxlOiBNYXRlcmlhbEZpbGVDb21wb25lbnQsXG4gICAgbnVtYmVyOiBNYXRlcmlhbE51bWJlckNvbXBvbmVudCxcbiAgICAnb25lLW9mJzogTWF0ZXJpYWxPbmVPZkNvbXBvbmVudCxcbiAgICByYWRpb3M6IE1hdGVyaWFsUmFkaW9zQ29tcG9uZW50LFxuICAgIHNlbGVjdDogTWF0ZXJpYWxTZWxlY3RDb21wb25lbnQsXG4gICAgc2xpZGVyOiBNYXRlcmlhbFNsaWRlckNvbXBvbmVudCxcbiAgICBzdGVwcGVyOiBNYXRlcmlhbFN0ZXBwZXJDb21wb25lbnQsXG4gICAgdGFiczogTWF0ZXJpYWxUYWJzQ29tcG9uZW50LFxuICAgIHRleHQ6IE1hdGVyaWFsSW5wdXRDb21wb25lbnQsXG4gICAgdGV4dGFyZWE6IE1hdGVyaWFsVGV4dGFyZWFDb21wb25lbnQsXG4gICAgJ2FsdC1kYXRlJzogJ2RhdGUnLFxuICAgICdhbnktb2YnOiAnb25lLW9mJyxcbiAgICBjYXJkOiAnc2VjdGlvbicsXG4gICAgY29sb3I6ICd0ZXh0JyxcbiAgICAnZXhwYW5zaW9uLXBhbmVsJzogJ3NlY3Rpb24nLFxuICAgIGhpZGRlbjogJ25vbmUnLFxuICAgIGltYWdlOiAnbm9uZScsXG4gICAgaW50ZWdlcjogJ251bWJlcicsXG4gICAgcmFkaW9idXR0b25zOiAnYnV0dG9uLWdyb3VwJyxcbiAgICByYW5nZTogJ3NsaWRlcicsXG4gICAgc3VibWl0OiAnYnV0dG9uJyxcbiAgICB0YWdzaW5wdXQ6ICdjaGlwLWxpc3QnLFxuICAgIHdpemFyZDogJ3N0ZXBwZXInLFxuICB9XG59XG4iXX0=