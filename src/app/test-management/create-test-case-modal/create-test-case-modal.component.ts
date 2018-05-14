import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TestCase, Priority, TestCaseStep, TestCaseType } from '../test-cases/test-case';

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
  public types = TestCaseType;
  priorityKeys; // Priority enumeration keys
  typeKeys; // Type enumeration keys
  testCaseSteps: TestCaseStep[] = [];
  testCaseStep: TestCaseStep;
  tags = [];

  public selectedTestSteps = [];

  constructor() {
    this.testcase = new TestCase();
    this.testCaseStep = new TestCaseStep();
    this.testcase.steps = [];
  }

  setOpened(val: boolean) {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  createTestCase() {
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
    this.testcase.steps.push(this.testCaseStep);
    this.testCaseStep = new TestCaseStep();
  }

  onEdit() {

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
