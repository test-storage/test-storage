import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTestCaseModalComponent } from './delete-test-case-modal.component';

xdescribe('DeleteTestCaseModalComponent', () => {
  let component: DeleteTestCaseModalComponent;
  let fixture: ComponentFixture<DeleteTestCaseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteTestCaseModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTestCaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
