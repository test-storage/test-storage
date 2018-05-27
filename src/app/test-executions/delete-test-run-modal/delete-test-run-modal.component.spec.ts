import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTestRunModalComponent } from './delete-test-run-modal.component';

xdescribe('DeleteTestRunModalComponent', () => {
  let component: DeleteTestRunModalComponent;
  let fixture: ComponentFixture<DeleteTestRunModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteTestRunModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTestRunModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
