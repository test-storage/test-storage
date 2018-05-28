import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestCaseModalComponent } from './edit-test-case-modal.component';

xdescribe('EditTestCaseModalComponent', () => {
  let component: EditTestCaseModalComponent;
  let fixture: ComponentFixture<EditTestCaseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditTestCaseModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTestCaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
