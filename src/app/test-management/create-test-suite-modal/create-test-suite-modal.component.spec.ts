import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestSuiteModalComponent } from './create-test-suite-modal.component';

xdescribe('CreateTestSuiteModalComponent', () => {
  let component: CreateTestSuiteModalComponent;
  let fixture: ComponentFixture<CreateTestSuiteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTestSuiteModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTestSuiteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
