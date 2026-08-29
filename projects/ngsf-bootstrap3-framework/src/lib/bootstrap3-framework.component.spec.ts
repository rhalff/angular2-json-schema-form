import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing'
import {NO_ERRORS_SCHEMA} from '@angular/core'
import {JsonSchemaFormService} from '@ngsf/widget-library'

import {Bootstrap3FrameworkComponent} from './bootstrap3-framework.component'

describe('Bootstrap3FrameworkComponent', () => {
  let component: Bootstrap3FrameworkComponent
  let fixture: ComponentFixture<Bootstrap3FrameworkComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Bootstrap3FrameworkComponent],
      providers: [JsonSchemaFormService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(Bootstrap3FrameworkComponent)
    component = fixture.componentInstance
    component.layoutNode = {type: 'section', options: {}}
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
