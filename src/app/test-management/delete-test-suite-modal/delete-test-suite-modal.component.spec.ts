import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTestSuiteModalComponent } from './delete-test-suite-modal.component';

describe('DeleteTestSuiteModalComponent', () => {
  let component: DeleteTestSuiteModalComponent;
  let fixture: ComponentFixture<DeleteTestSuiteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTestSuiteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTestSuiteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
