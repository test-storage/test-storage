import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestCaseModalComponent } from './create-test-case-modal.component';

describe('CreateTestCaseModalComponent', () => {
  let component: CreateTestCaseModalComponent;
  let fixture: ComponentFixture<CreateTestCaseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTestCaseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTestCaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
