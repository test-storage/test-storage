import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcasesComponent } from './testcases.component';

describe('TestcasesComponent', () => {
  let component: TestcasesComponent;
  let fixture: ComponentFixture<TestcasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestcasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
