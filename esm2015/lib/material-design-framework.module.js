var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MaterialDesignFrameworkModule_1;
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetLibraryModule } from '@ngsf/widget-library';
import { Framework } from '@ngsf/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
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
import { MaterialDesignFramework } from './material-design.framework';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
let MaterialDesignFrameworkModule = MaterialDesignFrameworkModule_1 = class MaterialDesignFrameworkModule {
    static forRoot() {
        return {
            ngModule: MaterialDesignFrameworkModule_1,
            providers: [
                {
                    provide: Framework,
                    useClass: MaterialDesignFramework,
                    multi: true,
                },
            ],
        };
    }
};
MaterialDesignFrameworkModule = MaterialDesignFrameworkModule_1 = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            FlexLayoutModule,
            MatAutocompleteModule,
            MatButtonModule,
            MatButtonToggleModule,
            MatCardModule,
            MatCheckboxModule,
            MatChipsModule,
            MatDatepickerModule,
            MatExpansionModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatNativeDateModule,
            MatRadioModule,
            MatSelectModule,
            MatSliderModule,
            MatSlideToggleModule,
            MatStepperModule,
            MatTabsModule,
            MatTooltipModule,
            WidgetLibraryModule,
        ],
        declarations: [
            FlexLayoutRootComponent,
            FlexLayoutSectionComponent,
            MaterialAddReferenceComponent,
            MaterialOneOfComponent,
            MaterialButtonComponent,
            MaterialButtonGroupComponent,
            MaterialCheckboxComponent,
            MaterialCheckboxesComponent,
            MaterialChipListComponent,
            MaterialDatepickerComponent,
            MaterialFileComponent,
            MaterialInputComponent,
            MaterialNumberComponent,
            MaterialRadiosComponent,
            MaterialSelectComponent,
            MaterialSliderComponent,
            MaterialStepperComponent,
            MaterialTabsComponent,
            MaterialTextareaComponent,
            MaterialDesignFrameworkComponent,
        ],
        exports: [
            FlexLayoutRootComponent,
            FlexLayoutSectionComponent,
            MaterialAddReferenceComponent,
            MaterialOneOfComponent,
            MaterialButtonComponent,
            MaterialButtonGroupComponent,
            MaterialCheckboxComponent,
            MaterialCheckboxesComponent,
            MaterialChipListComponent,
            MaterialDatepickerComponent,
            MaterialFileComponent,
            MaterialInputComponent,
            MaterialNumberComponent,
            MaterialRadiosComponent,
            MaterialSelectComponent,
            MaterialSliderComponent,
            MaterialStepperComponent,
            MaterialTabsComponent,
            MaterialTextareaComponent,
            MaterialDesignFrameworkComponent,
        ],
        entryComponents: [
            FlexLayoutRootComponent,
            FlexLayoutSectionComponent,
            MaterialAddReferenceComponent,
            MaterialOneOfComponent,
            MaterialButtonComponent,
            MaterialButtonGroupComponent,
            MaterialCheckboxComponent,
            MaterialCheckboxesComponent,
            MaterialChipListComponent,
            MaterialDatepickerComponent,
            MaterialFileComponent,
            MaterialInputComponent,
            MaterialNumberComponent,
            MaterialRadiosComponent,
            MaterialSelectComponent,
            MaterialSliderComponent,
            MaterialStepperComponent,
            MaterialTabsComponent,
            MaterialTextareaComponent,
            MaterialDesignFrameworkComponent,
        ],
    })
], MaterialDesignFrameworkModule);
export { MaterialDesignFrameworkModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdzZi9tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrLyIsInNvdXJjZXMiOlsibGliL21hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQSxPQUFPLEVBQUMsUUFBUSxFQUFzQixNQUFNLGVBQWUsQ0FBQTtBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUE7QUFDNUMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7QUFDeEQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUN0QyxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUE7QUFDL0QsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUE7QUFDckQsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0seUNBQXlDLENBQUE7QUFDL0UsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sNENBQTRDLENBQUE7QUFDckYsT0FBTyxFQUFDLDZCQUE2QixFQUFDLE1BQU0sK0NBQStDLENBQUE7QUFDM0YsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sd0NBQXdDLENBQUE7QUFDOUUsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0sOENBQThDLENBQUE7QUFDekYsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sMENBQTBDLENBQUE7QUFDbEYsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sNENBQTRDLENBQUE7QUFDdEYsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sMkNBQTJDLENBQUE7QUFDbkYsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sNENBQTRDLENBQUE7QUFDdEYsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1B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QXFCO1lBQ3JCLHlCQUF5QjtZQUN6QixnQ0FBZ0M7U0FDakM7S0FDRixDQUFDO0dBQ1csNkJBQTZCLENBYXpDO1NBYlksNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nXG5pbXBvcnQge1dpZGdldExpYnJhcnlNb2R1bGV9IGZyb20gJ0BuZ3NmL3dpZGdldC1saWJyYXJ5J1xuaW1wb3J0IHtGcmFtZXdvcmt9IGZyb20gJ0BuZ3NmL2NvbW1vbidcbmltcG9ydCB7Rm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJ1xuaW1wb3J0IHtGbGV4TGF5b3V0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCdcbmltcG9ydCB7RmxleExheW91dFJvb3RDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9mbGV4LWxheW91dC1yb290LmNvbXBvbmVudCdcbmltcG9ydCB7RmxleExheW91dFNlY3Rpb25Db21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9mbGV4LWxheW91dC1zZWN0aW9uLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxBZGRSZWZlcmVuY2VDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1hZGQtcmVmZXJlbmNlLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxCdXR0b25Db21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1idXR0b24uY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbEJ1dHRvbkdyb3VwQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtYnV0dG9uLWdyb3VwLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxDaGVja2JveENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLWNoZWNrYm94LmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxDaGVja2JveGVzQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtY2hlY2tib3hlcy5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsQ2hpcExpc3RDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1jaGlwLWxpc3QuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbERhdGVwaWNrZXJDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1kYXRlcGlja2VyLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxGaWxlQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtZmlsZS5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsSW5wdXRDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1pbnB1dC5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsTnVtYmVyQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtbnVtYmVyLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxPbmVPZkNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLW9uZS1vZi5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsUmFkaW9zQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWF0ZXJpYWwtcmFkaW9zLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxTZWxlY3RDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1zZWxlY3QuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbFNsaWRlckNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLXNsaWRlci5jb21wb25lbnQnXG5pbXBvcnQge01hdGVyaWFsU3RlcHBlckNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLXN0ZXBwZXIuY29tcG9uZW50J1xuaW1wb3J0IHtNYXRlcmlhbFRhYnNDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC10YWJzLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxUZXh0YXJlYUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL21hdGVyaWFsLXRleHRhcmVhLmNvbXBvbmVudCdcbmltcG9ydCB7TWF0ZXJpYWxEZXNpZ25GcmFtZXdvcmtDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrLmNvbXBvbmVudCdcblxuaW1wb3J0IHtNYXRlcmlhbERlc2lnbkZyYW1ld29ya30gZnJvbSAnLi9tYXRlcmlhbC1kZXNpZ24uZnJhbWV3b3JrJ1xuXG5pbXBvcnQge01hdEF1dG9jb21wbGV0ZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYXV0b2NvbXBsZXRlJ1xuaW1wb3J0IHtNYXRCdXR0b25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbidcbmltcG9ydCB7TWF0QnV0dG9uVG9nZ2xlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24tdG9nZ2xlJ1xuaW1wb3J0IHtNYXRDYXJkTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jYXJkJ1xuaW1wb3J0IHtNYXRDaGVja2JveE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hlY2tib3gnXG5pbXBvcnQge01hdENoaXBzTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGlwcydcbmltcG9ydCB7TWF0RGF0ZXBpY2tlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGF0ZXBpY2tlcidcbmltcG9ydCB7TWF0RXhwYW5zaW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9leHBhbnNpb24nXG5pbXBvcnQge01hdEZvcm1GaWVsZE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCdcbmltcG9ydCB7TWF0SWNvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbidcbmltcG9ydCB7TWF0SW5wdXRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0J1xuaW1wb3J0IHtNYXROYXRpdmVEYXRlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJ1xuaW1wb3J0IHtNYXRSYWRpb01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcmFkaW8nXG5pbXBvcnQge01hdFNlbGVjdE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0J1xuaW1wb3J0IHtNYXRTbGlkZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlcidcbmltcG9ydCB7TWF0U2xpZGVUb2dnbGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlLXRvZ2dsZSdcbmltcG9ydCB7TWF0U3RlcHBlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc3RlcHBlcidcbmltcG9ydCB7TWF0VGFic01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFicydcbmltcG9ydCB7TWF0VG9vbHRpcE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCdcblxuLyoqXG4gKiB1bnVzZWQgQGFuZ3VsYXIvbWF0ZXJpYWwgbW9kdWxlczpcbiAqIE1hdERpYWxvZ01vZHVsZSwgTWF0R3JpZExpc3RNb2R1bGUsIE1hdExpc3RNb2R1bGUsIE1hdE1lbnVNb2R1bGUsXG4gKiBNYXRQYWdpbmF0b3JNb2R1bGUsIE1hdFByb2dyZXNzQmFyTW9kdWxlLCBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gKiBNYXRTaWRlbmF2TW9kdWxlLCBNYXRTbmFja0Jhck1vZHVsZSwgTWF0U29ydE1vZHVsZSwgTWF0VGFibGVNb2R1bGUsXG4gKiBNYXRUb29sYmFyTW9kdWxlLFxuICovXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuXG4gICAgLy8gQU5HVUxBUl9NQVRFUklBTF9NT0RVTEVTXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXRDaGlwc01vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgIE1hdFJhZGlvTW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXRTbGlkZXJNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXG4gICAgTWF0U3RlcHBlck1vZHVsZSxcbiAgICBNYXRUYWJzTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG5cbiAgICBXaWRnZXRMaWJyYXJ5TW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICAvLyBNQVRFUklBTF9GUkFNRVdPUktfQ09NUE9ORU5UU1xuICAgIEZsZXhMYXlvdXRSb290Q29tcG9uZW50LFxuICAgIEZsZXhMYXlvdXRTZWN0aW9uQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsQWRkUmVmZXJlbmNlQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsT25lT2ZDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxCdXR0b25Db21wb25lbnQsXG4gICAgTWF0ZXJpYWxCdXR0b25Hcm91cENvbXBvbmVudCxcbiAgICBNYXRlcmlhbENoZWNrYm94Q29tcG9uZW50LFxuICAgIE1hdGVyaWFsQ2hlY2tib3hlc0NvbXBvbmVudCxcbiAgICBNYXRlcmlhbENoaXBMaXN0Q29tcG9uZW50LFxuICAgIE1hdGVyaWFsRGF0ZXBpY2tlckNvbXBvbmVudCxcbiAgICBNYXRlcmlhbEZpbGVDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxJbnB1dENvbXBvbmVudCxcbiAgICBNYXRlcmlhbE51bWJlckNvbXBvbmVudCxcbiAgICBNYXRlcmlhbFJhZGlvc0NvbXBvbmVudCxcbiAgICBNYXRlcmlhbFNlbGVjdENvbXBvbmVudCxcbiAgICBNYXRlcmlhbFNsaWRlckNvbXBvbmVudCxcbiAgICBNYXRlcmlhbFN0ZXBwZXJDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxUYWJzQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsVGV4dGFyZWFDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxEZXNpZ25GcmFtZXdvcmtDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICAvLyBNQVRFUklBTF9GUkFNRVdPUktfQ09NUE9ORU5UU1xuICAgIEZsZXhMYXlvdXRSb290Q29tcG9uZW50LFxuICAgIEZsZXhMYXlvdXRTZWN0aW9uQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsQWRkUmVmZXJlbmNlQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsT25lT2ZDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxCdXR0b25Db21wb25lbnQsXG4gICAgTWF0ZXJpYWxCdXR0b25Hcm91cENvbXBvbmVudCxcbiAgICBNYXRlcmlhbENoZWNrYm94Q29tcG9uZW50LFxuICAgIE1hdGVyaWFsQ2hlY2tib3hlc0NvbXBvbmVudCxcbiAgICBNYXRlcmlhbENoaXBMaXN0Q29tcG9uZW50LFxuICAgIE1hdGVyaWFsRGF0ZXBpY2tlckNvbXBvbmVudCxcbiAgICBNYXRlcmlhbEZpbGVDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxJbnB1dENvbXBvbmVudCxcbiAgICBNYXRlcmlhbE51bWJlckNvbXBvbmVudCxcbiAgICBNYXRlcmlhbFJhZGlvc0NvbXBvbmVudCxcbiAgICBNYXRlcmlhbFNlbGVjdENvbXBvbmVudCxcbiAgICBNYXRlcmlhbFNsaWRlckNvbXBvbmVudCxcbiAgICBNYXRlcmlhbFN0ZXBwZXJDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxUYWJzQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsVGV4dGFyZWFDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxEZXNpZ25GcmFtZXdvcmtDb21wb25lbnQsXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIC8vIE1BVEVSSUFMX0ZSQU1FV09SS19DT01QT05FTlRTXG4gICAgRmxleExheW91dFJvb3RDb21wb25lbnQsXG4gICAgRmxleExheW91dFNlY3Rpb25Db21wb25lbnQsXG4gICAgTWF0ZXJpYWxBZGRSZWZlcmVuY2VDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxPbmVPZkNvbXBvbmVudCxcbiAgICBNYXRlcmlhbEJ1dHRvbkNvbXBvbmVudCxcbiAgICBNYXRlcmlhbEJ1dHRvbkdyb3VwQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsQ2hlY2tib3hDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxDaGVja2JveGVzQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsQ2hpcExpc3RDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxEYXRlcGlja2VyQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsRmlsZUNvbXBvbmVudCxcbiAgICBNYXRlcmlhbElucHV0Q29tcG9uZW50LFxuICAgIE1hdGVyaWFsTnVtYmVyQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsUmFkaW9zQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsU2VsZWN0Q29tcG9uZW50LFxuICAgIE1hdGVyaWFsU2xpZGVyQ29tcG9uZW50LFxuICAgIE1hdGVyaWFsU3RlcHBlckNvbXBvbmVudCxcbiAgICBNYXRlcmlhbFRhYnNDb21wb25lbnQsXG4gICAgTWF0ZXJpYWxUZXh0YXJlYUNvbXBvbmVudCxcbiAgICBNYXRlcmlhbERlc2lnbkZyYW1ld29ya0NvbXBvbmVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxEZXNpZ25GcmFtZXdvcmtNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE1hdGVyaWFsRGVzaWduRnJhbWV3b3JrTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBNYXRlcmlhbERlc2lnbkZyYW1ld29ya01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogRnJhbWV3b3JrLFxuICAgICAgICAgIHVzZUNsYXNzOiBNYXRlcmlhbERlc2lnbkZyYW1ld29yayxcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfVxuICB9XG59XG4iXX0=