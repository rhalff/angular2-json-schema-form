import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Framework } from '../framework';
// Material Design Framework
// https://github.com/angular/material2
import { FlexLayoutRootComponent } from './flex-layout-root.component';
import { FlexLayoutSectionComponent } from './flex-layout-section.component';
import { MaterialAddReferenceComponent } from './material-add-reference.component';
import { MaterialOneOfComponent } from './material-one-of.component';
import { MaterialButtonComponent } from './material-button.component';
import { MaterialButtonGroupComponent } from './material-button-group.component';
import { MaterialCheckboxComponent } from './material-checkbox.component';
import { MaterialCheckboxesComponent } from './material-checkboxes.component';
import { MaterialChipListComponent } from './material-chip-list.component';
import { MaterialDatepickerComponent } from './material-datepicker.component';
import { MaterialFileComponent } from './material-file.component';
import { MaterialInputComponent } from './material-input.component';
import { MaterialNumberComponent } from './material-number.component';
import { MaterialRadiosComponent } from './material-radios.component';
import { MaterialSelectComponent } from './material-select.component';
import { MaterialSliderComponent } from './material-slider.component';
import { MaterialStepperComponent } from './material-stepper.component';
import { MaterialTabsComponent } from './material-tabs.component';
import { MaterialTextareaComponent } from './material-textarea.component';
import { MaterialDesignFrameworkComponent } from './material-design-framework.component';
var MaterialDesignFramework = /** @class */ (function (_super) {
    tslib_1.__extends(MaterialDesignFramework, _super);
    function MaterialDesignFramework() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'material-design';
        _this.framework = MaterialDesignFrameworkComponent;
        _this.stylesheets = [
            '//fonts.googleapis.com/icon?family=Material+Icons',
            '//fonts.googleapis.com/css?family=Roboto:300,400,500,700',
        ];
        _this.widgets = {
            'root': FlexLayoutRootComponent,
            'section': FlexLayoutSectionComponent,
            '$ref': MaterialAddReferenceComponent,
            'button': MaterialButtonComponent,
            'button-group': MaterialButtonGroupComponent,
            'checkbox': MaterialCheckboxComponent,
            'checkboxes': MaterialCheckboxesComponent,
            'chip-list': MaterialChipListComponent,
            'date': MaterialDatepickerComponent,
            'file': MaterialFileComponent,
            'number': MaterialNumberComponent,
            'one-of': MaterialOneOfComponent,
            'radios': MaterialRadiosComponent,
            'select': MaterialSelectComponent,
            'slider': MaterialSliderComponent,
            'stepper': MaterialStepperComponent,
            'tabs': MaterialTabsComponent,
            'text': MaterialInputComponent,
            'textarea': MaterialTextareaComponent,
            'alt-date': 'date',
            'any-of': 'one-of',
            'card': 'section',
            'color': 'text',
            'expansion-panel': 'section',
            'hidden': 'none',
            'image': 'none',
            'integer': 'number',
            'radiobuttons': 'button-group',
            'range': 'slider',
            'submit': 'button',
            'tagsinput': 'chip-list',
            'wizard': 'stepper',
        };
        return _this;
    }
    MaterialDesignFramework.decorators = [
        { type: Injectable },
    ];
    return MaterialDesignFramework;
}(Framework));
export { MaterialDesignFramework };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGVzaWduLmZyYW1ld29yay5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWpzb24tc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJzcmMvZnJhbWV3b3JrLWxpYnJhcnkvbWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay9tYXRlcmlhbC1kZXNpZ24uZnJhbWV3b3JrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFekMsNEJBQTRCO0FBQzVCLHVDQUF1QztBQUN2QyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNqRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUV6RjtJQUM2QyxtREFBUztJQUR0RDtRQUFBLHFFQTZDQztRQTNDQyxVQUFJLEdBQUcsaUJBQWlCLENBQUM7UUFFekIsZUFBUyxHQUFHLGdDQUFnQyxDQUFDO1FBRTdDLGlCQUFXLEdBQUc7WUFDWixtREFBbUQ7WUFDbkQsMERBQTBEO1NBQzNELENBQUM7UUFFRixhQUFPLEdBQUc7WUFDUixNQUFNLEVBQWEsdUJBQXVCO1lBQzFDLFNBQVMsRUFBVSwwQkFBMEI7WUFDN0MsTUFBTSxFQUFhLDZCQUE2QjtZQUNoRCxRQUFRLEVBQVcsdUJBQXVCO1lBQzFDLGNBQWMsRUFBSyw0QkFBNEI7WUFDL0MsVUFBVSxFQUFTLHlCQUF5QjtZQUM1QyxZQUFZLEVBQU8sMkJBQTJCO1lBQzlDLFdBQVcsRUFBUSx5QkFBeUI7WUFDNUMsTUFBTSxFQUFhLDJCQUEyQjtZQUM5QyxNQUFNLEVBQWEscUJBQXFCO1lBQ3hDLFFBQVEsRUFBVyx1QkFBdUI7WUFDMUMsUUFBUSxFQUFXLHNCQUFzQjtZQUN6QyxRQUFRLEVBQVcsdUJBQXVCO1lBQzFDLFFBQVEsRUFBVyx1QkFBdUI7WUFDMUMsUUFBUSxFQUFXLHVCQUF1QjtZQUMxQyxTQUFTLEVBQVUsd0JBQXdCO1lBQzNDLE1BQU0sRUFBYSxxQkFBcUI7WUFDeEMsTUFBTSxFQUFhLHNCQUFzQjtZQUN6QyxVQUFVLEVBQVMseUJBQXlCO1lBQzVDLFVBQVUsRUFBUyxNQUFNO1lBQ3pCLFFBQVEsRUFBVyxRQUFRO1lBQzNCLE1BQU0sRUFBYSxTQUFTO1lBQzVCLE9BQU8sRUFBWSxNQUFNO1lBQ3pCLGlCQUFpQixFQUFFLFNBQVM7WUFDNUIsUUFBUSxFQUFXLE1BQU07WUFDekIsT0FBTyxFQUFZLE1BQU07WUFDekIsU0FBUyxFQUFVLFFBQVE7WUFDM0IsY0FBYyxFQUFLLGNBQWM7WUFDakMsT0FBTyxFQUFZLFFBQVE7WUFDM0IsUUFBUSxFQUFXLFFBQVE7WUFDM0IsV0FBVyxFQUFRLFdBQVc7WUFDOUIsUUFBUSxFQUFXLFNBQVM7U0FDN0IsQ0FBQzs7SUFDSixDQUFDOztnQkE3Q0EsVUFBVTs7SUE2Q1gsOEJBQUM7Q0FBQSxBQTdDRCxDQUM2QyxTQUFTLEdBNENyRDtTQTVDWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEZyYW1ld29yayB9IGZyb20gJy4uL2ZyYW1ld29yayc7XG5cbi8vIE1hdGVyaWFsIERlc2lnbiBGcmFtZXdvcmtcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMlxuaW1wb3J0IHsgRmxleExheW91dFJvb3RDb21wb25lbnQgfSBmcm9tICcuL2ZsZXgtbGF5b3V0LXJvb3QuY29tcG9uZW50JztcbmltcG9ydCB7IEZsZXhMYXlvdXRTZWN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9mbGV4LWxheW91dC1zZWN0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEFkZFJlZmVyZW5jZUNvbXBvbmVudCB9IGZyb20gJy4vbWF0ZXJpYWwtYWRkLXJlZmVyZW5jZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxPbmVPZkNvbXBvbmVudCB9IGZyb20gJy4vbWF0ZXJpYWwtb25lLW9mLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vbWF0ZXJpYWwtYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEJ1dHRvbkdyb3VwQ29tcG9uZW50IH0gZnJvbSAnLi9tYXRlcmlhbC1idXR0b24tZ3JvdXAuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQ2hlY2tib3hDb21wb25lbnQgfSBmcm9tICcuL21hdGVyaWFsLWNoZWNrYm94LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbENoZWNrYm94ZXNDb21wb25lbnQgfSBmcm9tICcuL21hdGVyaWFsLWNoZWNrYm94ZXMuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQ2hpcExpc3RDb21wb25lbnQgfSBmcm9tICcuL21hdGVyaWFsLWNoaXAtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxEYXRlcGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9tYXRlcmlhbC1kYXRlcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbEZpbGVDb21wb25lbnQgfSBmcm9tICcuL21hdGVyaWFsLWZpbGUuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsSW5wdXRDb21wb25lbnQgfSBmcm9tICcuL21hdGVyaWFsLWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbE51bWJlckNvbXBvbmVudCB9IGZyb20gJy4vbWF0ZXJpYWwtbnVtYmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbFJhZGlvc0NvbXBvbmVudCB9IGZyb20gJy4vbWF0ZXJpYWwtcmFkaW9zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbFNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vbWF0ZXJpYWwtc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbFNsaWRlckNvbXBvbmVudCB9IGZyb20gJy4vbWF0ZXJpYWwtc2xpZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbFN0ZXBwZXJDb21wb25lbnQgfSBmcm9tICcuL21hdGVyaWFsLXN0ZXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsVGFic0NvbXBvbmVudCB9IGZyb20gJy4vbWF0ZXJpYWwtdGFicy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxUZXh0YXJlYUNvbXBvbmVudCB9IGZyb20gJy4vbWF0ZXJpYWwtdGV4dGFyZWEuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsRGVzaWduRnJhbWV3b3JrQ29tcG9uZW50IH0gZnJvbSAnLi9tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrLmNvbXBvbmVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbERlc2lnbkZyYW1ld29yayBleHRlbmRzIEZyYW1ld29yayB7XG4gIG5hbWUgPSAnbWF0ZXJpYWwtZGVzaWduJztcblxuICBmcmFtZXdvcmsgPSBNYXRlcmlhbERlc2lnbkZyYW1ld29ya0NvbXBvbmVudDtcblxuICBzdHlsZXNoZWV0cyA9IFtcbiAgICAnLy9mb250cy5nb29nbGVhcGlzLmNvbS9pY29uP2ZhbWlseT1NYXRlcmlhbCtJY29ucycsXG4gICAgJy8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Sb2JvdG86MzAwLDQwMCw1MDAsNzAwJyxcbiAgXTtcblxuICB3aWRnZXRzID0ge1xuICAgICdyb290JzogICAgICAgICAgICBGbGV4TGF5b3V0Um9vdENvbXBvbmVudCxcbiAgICAnc2VjdGlvbic6ICAgICAgICAgRmxleExheW91dFNlY3Rpb25Db21wb25lbnQsXG4gICAgJyRyZWYnOiAgICAgICAgICAgIE1hdGVyaWFsQWRkUmVmZXJlbmNlQ29tcG9uZW50LFxuICAgICdidXR0b24nOiAgICAgICAgICBNYXRlcmlhbEJ1dHRvbkNvbXBvbmVudCxcbiAgICAnYnV0dG9uLWdyb3VwJzogICAgTWF0ZXJpYWxCdXR0b25Hcm91cENvbXBvbmVudCxcbiAgICAnY2hlY2tib3gnOiAgICAgICAgTWF0ZXJpYWxDaGVja2JveENvbXBvbmVudCxcbiAgICAnY2hlY2tib3hlcyc6ICAgICAgTWF0ZXJpYWxDaGVja2JveGVzQ29tcG9uZW50LFxuICAgICdjaGlwLWxpc3QnOiAgICAgICBNYXRlcmlhbENoaXBMaXN0Q29tcG9uZW50LFxuICAgICdkYXRlJzogICAgICAgICAgICBNYXRlcmlhbERhdGVwaWNrZXJDb21wb25lbnQsXG4gICAgJ2ZpbGUnOiAgICAgICAgICAgIE1hdGVyaWFsRmlsZUNvbXBvbmVudCxcbiAgICAnbnVtYmVyJzogICAgICAgICAgTWF0ZXJpYWxOdW1iZXJDb21wb25lbnQsXG4gICAgJ29uZS1vZic6ICAgICAgICAgIE1hdGVyaWFsT25lT2ZDb21wb25lbnQsXG4gICAgJ3JhZGlvcyc6ICAgICAgICAgIE1hdGVyaWFsUmFkaW9zQ29tcG9uZW50LFxuICAgICdzZWxlY3QnOiAgICAgICAgICBNYXRlcmlhbFNlbGVjdENvbXBvbmVudCxcbiAgICAnc2xpZGVyJzogICAgICAgICAgTWF0ZXJpYWxTbGlkZXJDb21wb25lbnQsXG4gICAgJ3N0ZXBwZXInOiAgICAgICAgIE1hdGVyaWFsU3RlcHBlckNvbXBvbmVudCxcbiAgICAndGFicyc6ICAgICAgICAgICAgTWF0ZXJpYWxUYWJzQ29tcG9uZW50LFxuICAgICd0ZXh0JzogICAgICAgICAgICBNYXRlcmlhbElucHV0Q29tcG9uZW50LFxuICAgICd0ZXh0YXJlYSc6ICAgICAgICBNYXRlcmlhbFRleHRhcmVhQ29tcG9uZW50LFxuICAgICdhbHQtZGF0ZSc6ICAgICAgICAnZGF0ZScsXG4gICAgJ2FueS1vZic6ICAgICAgICAgICdvbmUtb2YnLFxuICAgICdjYXJkJzogICAgICAgICAgICAnc2VjdGlvbicsXG4gICAgJ2NvbG9yJzogICAgICAgICAgICd0ZXh0JyxcbiAgICAnZXhwYW5zaW9uLXBhbmVsJzogJ3NlY3Rpb24nLFxuICAgICdoaWRkZW4nOiAgICAgICAgICAnbm9uZScsXG4gICAgJ2ltYWdlJzogICAgICAgICAgICdub25lJyxcbiAgICAnaW50ZWdlcic6ICAgICAgICAgJ251bWJlcicsXG4gICAgJ3JhZGlvYnV0dG9ucyc6ICAgICdidXR0b24tZ3JvdXAnLFxuICAgICdyYW5nZSc6ICAgICAgICAgICAnc2xpZGVyJyxcbiAgICAnc3VibWl0JzogICAgICAgICAgJ2J1dHRvbicsXG4gICAgJ3RhZ3NpbnB1dCc6ICAgICAgICdjaGlwLWxpc3QnLFxuICAgICd3aXphcmQnOiAgICAgICAgICAnc3RlcHBlcicsXG4gIH07XG59XG4iXX0=