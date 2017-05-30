import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestsuitesTreeComponent } from './testsuites-tree.component';

describe('TestsuitesTreeComponent', () => {
  let component: TestsuitesTreeComponent;
  let fixture: ComponentFixture<TestsuitesTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
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
