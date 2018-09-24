import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TestCase, Priority, TestCaseStep, TestCaseType } from '../test-cases/test-case';

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
  public types = TestCaseType;
  priorityKeys; // Priority enumeration keys
  typeKeys; // Type enumeration keys
  public selectedTestSteps = [];
  public testCaseStep: TestCaseStep;

  constructor() {
    this.testCaseStep = new TestCaseStep();
   }

  setOpened(val: boolean) {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  updateTestCase() {
    this.testcaseChange.emit(this.testcase);
  }

  setTag(tag) {
    this.testcase.tags.push(tag);
  }

  removeTag(tag) {
    this.testcase.tags = this.testcase.tags.filter(tags => tags !== tag);
  }

  onAdd() {
    this.testcase.steps.push(this.testCaseStep);
    this.testCaseStep = new TestCaseStep();
  }

  onDelete() {
    this.selectedTestSteps.forEach(testStep => {
      this.testcase.steps = this.testcase.steps.filter(steps => steps !== testStep);
    });
  }

  ngOnInit() {
    this.priorityKeys = Object.keys(this.priorities).filter(f => !isNaN(Number(f))).map(key => (
      { value: this.priorities[key], key: parseInt(key, 10)}));
    this.typeKeys = Object.keys(this.types).filter(f => !isNaN(Number(f))).map(key => (
      { value: this.types[key], key: parseInt(key, 10)}));
  }

}
