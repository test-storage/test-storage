import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestRunModalComponent } from './edit-test-run-modal.component';

describe('EditTestRunModalComponent', () => {
  let component: EditTestRunModalComponent;
  let fixture: ComponentFixture<EditTestRunModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTestRunModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTestRunModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
