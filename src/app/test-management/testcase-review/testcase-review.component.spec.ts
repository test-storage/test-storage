import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcaseReviewComponent } from './testcase-review.component';

xdescribe('TestcaseReviewComponent', () => {
  let component: TestcaseReviewComponent;
  let fixture: ComponentFixture<TestcaseReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestcaseReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcaseReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
