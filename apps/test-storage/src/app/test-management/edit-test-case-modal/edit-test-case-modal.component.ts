import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TestCase, Priority, TestCaseStep, TestCaseType } from '../test-cases/test-case';

@Component({
  selector: 'app-edit-test-case-modal',
  templateUrl: './edit-test-case-modal.component.html',
  styleUrls: ['./edit-test-case-modal.component.css']
})
export class EditTestCaseModalComponent {

  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() testcaseChange = new EventEmitter<TestCase>();

  @Input() testcase: TestCase = new TestCase();

  public priorities = Object.keys(Priority).map(priority => ({ value: priority }));
  public types = Object.keys(TestCaseType).map(type => ({ value: type })); ;

  public selectedTestSteps: any[] = [];
  public testCaseStep: TestCaseStep;

  constructor() {
    this.testCaseStep = new TestCaseStep();
   }

  setOpened(val: boolean): void {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  updateTestCase(): void {
    this.testcaseChange.emit(this.testcase);
  }

  setTag(tag: string): void {
    this.testcase.tags?.push(tag);
  }

  removeTag(tag: string) {
    this.testcase.tags = this.testcase.tags?.filter(tags => tags !== tag);
  }

  onAdd(): void {
    this.testcase.steps?.push(this.testCaseStep);
    this.testCaseStep = new TestCaseStep();
  }

  onDelete(): void {
    this.selectedTestSteps.forEach(testStep => {
      this.testcase.steps = this.testcase.steps?.filter(steps => steps !== testStep);
    });
  }

  optionsFromEnum(dictionary: any): any {
    return Object.keys(dictionary).map((key) => {
      return { value: key, label: dictionary[key] };
    });
  }

}
