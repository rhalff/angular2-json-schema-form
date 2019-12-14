import {async, ComponentFixture, TestBed} from '@angular/core/testing'

import {Bootstrap3FrameworkComponent} from './bootstrap3-framework.component'

describe('Bootstrap3FrameworkComponent', () => {
  let component: Bootstrap3FrameworkComponent
  let fixture: ComponentFixture<Bootstrap3FrameworkComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Bootstrap3FrameworkComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(Bootstrap3FrameworkComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
