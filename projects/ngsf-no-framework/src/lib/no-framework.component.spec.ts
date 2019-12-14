import {async, ComponentFixture, TestBed} from '@angular/core/testing'

import {NoFrameworkComponent} from './no-framework.component'

describe('NoFrameworkComponent', () => {
  let component: NoFrameworkComponent
  let fixture: ComponentFixture<NoFrameworkComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoFrameworkComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(NoFrameworkComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
