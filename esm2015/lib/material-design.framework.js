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
let MaterialDesignFramework = class MaterialDesignFramework extends Framework {
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
};
MaterialDesignFramework = __decorate([
    Injectable()
], MaterialDesignFramework);
export { MaterialDesignFramework };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGVzaWduLmZyYW1ld29yay5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL21hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsvIiwic291cmNlcyI6WyJsaWIvbWF0ZXJpYWwtZGVzaWduLmZyYW1ld29yay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFBO0FBQ3hDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFFdEMsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0seUNBQXlDLENBQUE7QUFDL0UsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sNENBQTRDLENBQUE7QUFDckYsT0FBTyxFQUFDLDZCQUE2QixFQUFDLE1BQU0sK0NBQStDLENBQUE7QUFDM0YsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sd0NBQXdDLENBQUE7QUFDOUUsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0sOENBQThDLENBQUE7QUFDekYsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sMENBQTBDLENBQUE7QUFDbEYsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sNENBQTRDLENBQUE7QUFDdEYsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sMkNBQTJDLENBQUE7QUFDbkYsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sNENBQTRDLENBQUE7QUFDdEYsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUE7QUFDMUUsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sdUNBQXVDLENBQUE7QUFDNUUsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sd0NBQXdDLENBQUE7QUFDOUUsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sd0NBQXdDLENBQUE7QUFDN0UsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sd0NBQXdDLENBQUE7QUFDOUUsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sd0NBQXdDLENBQUE7QUFDOUUsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sd0NBQXdDLENBQUE7QUFDOUUsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0seUNBQXlDLENBQUE7QUFDaEYsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUE7QUFDMUUsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sMENBQTBDLENBQUE7QUFDbEYsT0FBTyxFQUFDLGdDQUFnQyxFQUFDLE1BQU0sa0RBQWtELENBQUE7QUFHakcsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBd0IsU0FBUSxTQUFTO0lBQXREOztRQUNFLFNBQUksR0FBRyxpQkFBaUIsQ0FBQTtRQUV4QixjQUFTLEdBQUcsZ0NBQWdDLENBQUE7UUFFNUMsZ0JBQVcsR0FBRztZQUNaLG1EQUFtRDtZQUNuRCwwREFBMEQ7U0FDM0QsQ0FBQTtRQUVELFlBQU8sR0FBRztZQUNSLElBQUksRUFBRSx1QkFBdUI7WUFDN0IsT0FBTyxFQUFFLDBCQUEwQjtZQUNuQyxJQUFJLEVBQUUsNkJBQTZCO1lBQ25DLE1BQU0sRUFBRSx1QkFBdUI7WUFDL0IsY0FBYyxFQUFFLDRCQUE0QjtZQUM1QyxRQUFRLEVBQUUseUJBQXlCO1lBQ25DLFVBQVUsRUFBRSwyQkFBMkI7WUFDdkMsV0FBVyxFQUFFLHlCQUF5QjtZQUN0QyxJQUFJLEVBQUUsMkJBQTJCO1lBQ2pDLElBQUksRUFBRSxxQkFBcUI7WUFDM0IsTUFBTSxFQUFFLHVCQUF1QjtZQUMvQixRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLE1BQU0sRUFBRSx1QkFBdUI7WUFDL0IsTUFBTSxFQUFFLHVCQUF1QjtZQUMvQixNQUFNLEVBQUUsdUJBQXVCO1lBQy9CLE9BQU8sRUFBRSx3QkFBd0I7WUFDakMsSUFBSSxFQUFFLHFCQUFxQjtZQUMzQixJQUFJLEVBQUUsc0JBQXNCO1lBQzVCLFFBQVEsRUFBRSx5QkFBeUI7WUFDbkMsVUFBVSxFQUFFLE1BQU07WUFDbEIsUUFBUSxFQUFFLFFBQVE7WUFDbEIsSUFBSSxFQUFFLFNBQVM7WUFDZixLQUFLLEVBQUUsTUFBTTtZQUNiLGlCQUFpQixFQUFFLFNBQVM7WUFDNUIsTUFBTSxFQUFFLE1BQU07WUFDZCxLQUFLLEVBQUUsTUFBTTtZQUNiLE9BQU8sRUFBRSxRQUFRO1lBQ2pCLFlBQVksRUFBRSxjQUFjO1lBQzVCLEtBQUssRUFBRSxRQUFRO1lBQ2YsTUFBTSxFQUFFLFFBQVE7WUFDaEIsU0FBUyxFQUFFLFdBQVc7WUFDdEIsTUFBTSxFQUFFLFNBQVM7U0FDbEIsQ0FBQTtJQUNILENBQUM7Q0FBQSxDQUFBO0FBNUNZLHVCQUF1QjtJQURuQyxVQUFVLEVBQUU7R0FDQSx1QkFBdUIsQ0E0Q25DO1NBNUNZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7RnJhbWV3b3JrfSBmcm9tICdAbmdzZi9jb21tb24nXG5cbmltcG9ydCB7RmxleExheW91dFJvb3RDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9mbGV4LWxheW91dC1yb290LmNvbXBvbmVudCdcbmltcG9ydCB7RmxleExheW91dFNlY3Rpb25Db21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9mbGV4LWxheW91dC1zZWN0aW9uLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxBZGRSZWZlcmVuY2VDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1hZGQtcmVmZXJlbmNlLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxCdXR0b25Db21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1idXR0b24uY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbEJ1dHRvbkdyb3VwQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtYnV0dG9uLWdyb3VwLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxDaGVja2JveENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLWNoZWNrYm94LmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxDaGVja2JveGVzQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtY2hlY2tib3hlcy5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsQ2hpcExpc3RDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1jaGlwLWxpc3QuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbERhdGVwaWNrZXJDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1kYXRlcGlja2VyLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxGaWxlQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtZmlsZS5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsSW5wdXRDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1pbnB1dC5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsTnVtYmVyQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtbnVtYmVyLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxPbmVPZkNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLW9uZS1vZi5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsUmFkaW9zQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtcmFkaW9zLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxTZWxlY3RDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1zZWxlY3QuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbFNsaWRlckNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLXNsaWRlci5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsU3RlcHBlckNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLXN0ZXBwZXIuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbFRhYnNDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC10YWJzLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxUZXh0YXJlYUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLXRleHRhcmVhLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxEZXNpZ25GcmFtZXdvcmtDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrLmNvbXBvbmVudCdcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsRGVzaWduRnJhbWV3b3JrIGV4dGVuZHMgRnJhbWV3b3JrIHtcbiAgbmFtZSA9ICdtYXRlcmlhbC1kZXNpZ24nXG5cbiAgZnJhbWV3b3JrID0gTWF0ZXJpYWxEZXNpZ25GcmFtZXdvcmtDb21wb25lbnRcblxuICBzdHlsZXNoZWV0cyA9IFtcbiAgICAnLy9mb250cy5nb29nbGVhcGlzLmNvbS9pY29uP2ZhbWlseT1NYXRlcmlhbCtJY29ucycsXG4gICAgJy8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Sb2JvdG86MzAwLDQwMCw1MDAsNzAwJyxcbiAgXVxuXG4gIHdpZGdldHMgPSB7XG4gICAgcm9vdDogRmxleExheW91dFJvb3RDb21wb25lbnQsXG4gICAgc2VjdGlvbjogRmxleExheW91dFNlY3Rpb25Db21wb25lbnQsXG4gICAgJHJlZjogTWF0ZXJpYWxBZGRSZWZlcmVuY2VDb21wb25lbnQsXG4gICAgYnV0dG9uOiBNYXRlcmlhbEJ1dHRvbkNvbXBvbmVudCxcbiAgICAnYnV0dG9uLWdyb3VwJzogTWF0ZXJpYWxCdXR0b25Hcm91cENvbXBvbmVudCxcbiAgICBjaGVja2JveDogTWF0ZXJpYWxDaGVja2JveENvbXBvbmVudCxcbiAgICBjaGVja2JveGVzOiBNYXRlcmlhbENoZWNrYm94ZXNDb21wb25lbnQsXG4gICAgJ2NoaXAtbGlzdCc6IE1hdGVyaWFsQ2hpcExpc3RDb21wb25lbnQsXG4gICAgZGF0ZTogTWF0ZXJpYWxEYXRlcGlja2VyQ29tcG9uZW50LFxuICAgIGZpbGU6IE1hdGVyaWFsRmlsZUNvbXBvbmVudCxcbiAgICBudW1iZXI6IE1hdGVyaWFsTnVtYmVyQ29tcG9uZW50LFxuICAgICdvbmUtb2YnOiBNYXRlcmlhbE9uZU9mQ29tcG9uZW50LFxuICAgIHJhZGlvczogTWF0ZXJpYWxSYWRpb3NDb21wb25lbnQsXG4gICAgc2VsZWN0OiBNYXRlcmlhbFNlbGVjdENvbXBvbmVudCxcbiAgICBzbGlkZXI6IE1hdGVyaWFsU2xpZGVyQ29tcG9uZW50LFxuICAgIHN0ZXBwZXI6IE1hdGVyaWFsU3RlcHBlckNvbXBvbmVudCxcbiAgICB0YWJzOiBNYXRlcmlhbFRhYnNDb21wb25lbnQsXG4gICAgdGV4dDogTWF0ZXJpYWxJbnB1dENvbXBvbmVudCxcbiAgICB0ZXh0YXJlYTogTWF0ZXJpYWxUZXh0YXJlYUNvbXBvbmVudCxcbiAgICAnYWx0LWRhdGUnOiAnZGF0ZScsXG4gICAgJ2FueS1vZic6ICdvbmUtb2YnLFxuICAgIGNhcmQ6ICdzZWN0aW9uJyxcbiAgICBjb2xvcjogJ3RleHQnLFxuICAgICdleHBhbnNpb24tcGFuZWwnOiAnc2VjdGlvbicsXG4gICAgaGlkZGVuOiAnbm9uZScsXG4gICAgaW1hZ2U6ICdub25lJyxcbiAgICBpbnRlZ2VyOiAnbnVtYmVyJyxcbiAgICByYWRpb2J1dHRvbnM6ICdidXR0b24tZ3JvdXAnLFxuICAgIHJhbmdlOiAnc2xpZGVyJyxcbiAgICBzdWJtaXQ6ICdidXR0b24nLFxuICAgIHRhZ3NpbnB1dDogJ2NoaXAtbGlzdCcsXG4gICAgd2l6YXJkOiAnc3RlcHBlcicsXG4gIH1cbn1cbiJdfQ==