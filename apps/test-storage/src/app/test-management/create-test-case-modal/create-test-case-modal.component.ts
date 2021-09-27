import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TestCase, Priority, TestCaseStep, TestCaseType } from '../test-cases/test-case';

@Component({
  selector: 'app-create-test-case-modal',
  templateUrl: './create-test-case-modal.component.html',
  styleUrls: ['./create-test-case-modal.component.css']
})
export class CreateTestCaseModalComponent {

  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() testcaseChange = new EventEmitter<TestCase>();

  public testcase: TestCase;
  public priorities = Object.keys(Priority).map(priority => ({ value: priority }));
  public types = Object.keys(TestCaseType).map(type => ({ value: type }));

  testCaseSteps: TestCaseStep[] = [];
  testCaseStep: TestCaseStep;
  tags: string[] = [];

  public selectedTestSteps: any[] = [];

  constructor() {
    this.testcase = new TestCase();
    this.testCaseStep = new TestCaseStep();
    this.testcase.steps = [];
  }

  setOpened(val: boolean): void {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  createTestCase(): void {
    this.testcase.tags = this.tags;
    this.testcaseChange.emit(this.testcase);
    this.testcase = new TestCase();
    this.testcase.steps = [];
    this.testcase.tags = [];
    this.tags = [];
  }

  setTag(tag: string): void {
    this.tags.push(tag);
  }

  removeTag(tag: string): void {
    this.tags = this.tags.filter(tags => tags !== tag);
  }

  onAdd(): void {
    this.testcase.steps?.push(this.testCaseStep);
    this.testCaseStep = new TestCaseStep();
  }

  onEdit(): void {
    // TODO
  }

  onDelete(): void {
    this.selectedTestSteps.forEach(testStep => {
      this.testcase.steps = this.testcase.steps?.filter(steps => steps !== testStep);
    });
  }

}
