import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestSuiteModalComponent } from './edit-test-suite-modal.component';

xdescribe('EditTestSuiteModalComponent', () => {
  let component: EditTestSuiteModalComponent;
  let fixture: ComponentFixture<EditTestSuiteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditTestSuiteModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTestSuiteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
