import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestExecutionsDetailsComponent } from './test-executions-details.component';

xdescribe('TestExecutionsDetailsComponent', () => {
  let component: TestExecutionsDetailsComponent;
  let fixture: ComponentFixture<TestExecutionsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestExecutionsDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestExecutionsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
