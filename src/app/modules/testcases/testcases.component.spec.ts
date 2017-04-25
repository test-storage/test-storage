import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { TestcasesComponent } from './testcases.component';
import { MockTestcaseService } from '../../services/testcase/testcase.service.mock';

describe('TestcasesComponent', () => {
  let component: TestcasesComponent;
  let fixture: ComponentFixture<TestcasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestcasesComponent],
      providers: [MockTestcaseService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  /*
    it('should create', inject([MockTestcaseService], (service: MockTestcaseService) => {
      expect(component).toBeTruthy();
    }));
    */
});
