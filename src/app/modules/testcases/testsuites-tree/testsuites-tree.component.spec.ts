import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeModule } from 'angular-tree-component';
import { TestsuitesTreeComponent } from './testsuites-tree.component';

describe('TestsuitesTreeComponent', () => {
  let component: TestsuitesTreeComponent;
  let fixture: ComponentFixture<TestsuitesTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TreeModule],
      declarations: [TestsuitesTreeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsuitesTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
