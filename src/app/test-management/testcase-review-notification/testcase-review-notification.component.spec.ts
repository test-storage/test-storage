import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcaseReviewNotificationComponent } from './testcase-review-notification.component';

xdescribe('TestcaseReviewNotificationComponent', () => {
  let component: TestcaseReviewNotificationComponent;
  let fixture: ComponentFixture<TestcaseReviewNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestcaseReviewNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcaseReviewNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
