import {async, ComponentFixture, TestBed} from '@angular/core/testing'

import {Bootstrap5FrameworkComponent} from './bootstrap5-framework.component'

describe('Bootstrap4FrameworkComponent', () => {
  let component: Bootstrap5FrameworkComponent
  let fixture: ComponentFixture<Bootstrap5FrameworkComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Bootstrap5FrameworkComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(Bootstrap5FrameworkComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
