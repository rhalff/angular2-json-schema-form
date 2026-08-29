import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing'
import {NO_ERRORS_SCHEMA} from '@angular/core'
import {JsonSchemaFormService} from '@ngsf/widget-library'

import {Bootstrap5FrameworkComponent} from './bootstrap5-framework.component'

describe('Bootstrap5FrameworkComponent', () => {
  let component: Bootstrap5FrameworkComponent
  let fixture: ComponentFixture<Bootstrap5FrameworkComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Bootstrap5FrameworkComponent],
      providers: [JsonSchemaFormService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(Bootstrap5FrameworkComponent)
    component = fixture.componentInstance
    component.layoutNode = {type: 'section', options: {}}
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
