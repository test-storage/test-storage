import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TestCase, Priority, TestCaseStep } from '../test-cases/test-case';

@Component({
  selector: 'app-create-test-case-modal',
  templateUrl: './create-test-case-modal.component.html',
  styleUrls: ['./create-test-case-modal.component.css']
})
export class CreateTestCaseModalComponent implements OnInit {

  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() testcaseChange = new EventEmitter<TestCase>();

  public testcase: TestCase;
  public priorities = Priority;
  keys; // Priority enumeration keys
  testCaseSteps: TestCaseStep[] = [];
  tags = [];

  public selectedTestSteps = [];

  constructor() {
    this.testcase = new TestCase();
    this.testcase.steps = [];
  }

  setOpened(val: boolean) {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  createTestCase() {
    this.testcase.steps = this.testCaseSteps;
    this.testcase.tags = this.tags;
    this.testcaseChange.emit(this.testcase);
    this.testcase = new TestCase();
    this.testcase.steps = [];
    this.testcase.tags = [];
    this.tags = [];
  }


  setTag(tag) {
    this.tags.push(tag);
  }

  removeTag(tag) {
    this.tags = this.tags.filter(tags => tags !== tag);
  }

  onAdd() {
    const step = new TestCaseStep();
    step.stepAction = '';
    step.testData = '';
    step.expectedResult = '';
    this.testCaseSteps.push(step);
    console.log(this.testCaseSteps);
  }

  onEdit() {

  }

  onDelete() {
    this.selectedTestSteps.forEach(testStep => {
      this.testcase.steps = this.testcase.steps.filter(steps => steps !== testStep);
    });
  }

  ngOnInit() {
    this.keys = Object.keys(this.priorities).filter(f => !isNaN(Number(f))).map(k => parseInt(k, 10));
  }

}
