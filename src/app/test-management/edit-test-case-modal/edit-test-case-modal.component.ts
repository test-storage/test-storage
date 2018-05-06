import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TestCase, Priority, TestCaseStep } from '../test-cases/test-case';

@Component({
  selector: 'app-edit-test-case-modal',
  templateUrl: './edit-test-case-modal.component.html',
  styleUrls: ['./edit-test-case-modal.component.css']
})
export class EditTestCaseModalComponent implements OnInit {

  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() testcaseChange = new EventEmitter<TestCase>();

  @Input() testcase: TestCase;
  public priorities = Priority;
  keys; // Priority enumeration keys
  public selectedTestSteps = [];

  constructor() { }

  setOpened(val: boolean) {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  updateTestCase() {
    this.testcaseChange.emit(this.testcase);
  }

  onAdd() {
    const step = new TestCaseStep();
    step.stepAction = '';
    step.testData = '';
    step.expectedResult = '';
    this.testcase.steps.push(step);
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
