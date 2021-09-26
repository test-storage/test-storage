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

  @Input() testcase: TestCase = new TestCase();
  public priorities = Priority;
  public types = TestCaseType;
  priorityKeys!: {[key: string]: any}; // Priority enumeration keys
  typeKeys!: {[key: string]: any}; // Type enumeration keys
  public selectedTestSteps = [];
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

  ngOnInit(): void {
    this.priorityKeys = Object.keys(this.priorities).filter(f => !isNaN(Number(f))).map(key => (
      { value: this.priorities[key as any], key: parseInt(key, 10)}));
    this.typeKeys = Object.keys(this.types).filter(f => !isNaN(Number(f))).map(key => (
      { value: this.types[key as any], key: parseInt(key, 10)}));
  }

}
