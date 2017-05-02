import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeModule } from 'angular-tree-component';
import { TestcaseTreeComponent } from './testcase-tree.component';

describe('TestcaseTreeComponent', () => {
  let component: TestcaseTreeComponent;
  let fixture: ComponentFixture<TestcaseTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TreeModule],
      declarations: [TestcaseTreeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcaseTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
