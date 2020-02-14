import {Injectable} from '@angular/core'
import {Framework} from '@ngsf/common'

import {FlexLayoutRootComponent} from './components/flex-layout-root.component'
import {FlexLayoutSectionComponent} from './components/flex-layout-section.component'
import {MaterialAddReferenceComponent} from './components/material-add-reference.component'
import {MaterialButtonComponent} from './components/material-button.component'
import {MaterialButtonGroupComponent} from './components/material-button-group.component'
import {MaterialCheckboxComponent} from './components/material-checkbox.component'
import {MaterialCheckboxesComponent} from './components/material-checkboxes.component'
import {MaterialChipListComponent} from './components/material-chip-list.component'
import {MaterialDatepickerComponent} from './components/material-datepicker.component'
import {MaterialFileComponent} from './components/material-file.component'
import {MaterialInputComponent} from './components/material-input.component'
import {MaterialNumberComponent} from './components/material-number.component'
import {MaterialOneOfComponent} from './components/material-one-of.component'
import {MaterialRadiosComponent} from './components/material-radios.component'
import {MaterialSelectComponent} from './components/material-select.component'
import {MaterialSliderComponent} from './components/material-slider.component'
import {MaterialStepperComponent} from './components/material-stepper.component'
import {MaterialTabsComponent} from './components/material-tabs.component'
import {MaterialTextareaComponent} from './components/material-textarea.component'
import {MaterialDesignFrameworkComponent} from './components/material-design-framework.component'

@Injectable()
export class MaterialDesignFramework extends Framework {
  name = 'material-design'

  framework = MaterialDesignFrameworkComponent

  stylesheets = [
    '//fonts.googleapis.com/icon?family=Material+Icons',
    '//fonts.googleapis.com/css?family=Roboto:300,400,500,700',
  ]

  widgets = {
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
  }
}
