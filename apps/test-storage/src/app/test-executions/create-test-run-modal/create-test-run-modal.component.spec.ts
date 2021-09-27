import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestRunModalComponent } from './create-test-run-modal.component';

xdescribe('CreateTestRunModalComponent', () => {
  let component: CreateTestRunModalComponent;
  let fixture: ComponentFixture<CreateTestRunModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTestRunModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTestRunModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
