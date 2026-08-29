import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing'
import {NO_ERRORS_SCHEMA} from '@angular/core'

import {NoFrameworkComponent} from './no-framework.component'

describe('NoFrameworkComponent', () => {
  let component: NoFrameworkComponent
  let fixture: ComponentFixture<NoFrameworkComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NoFrameworkComponent],
      schemas: [NO_ERRORS_SCHEMA]
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
