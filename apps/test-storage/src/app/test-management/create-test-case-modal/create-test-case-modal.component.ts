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
  priorityKeys!: {[key: string]: any}; // Priority enumeration keys
  typeKeys!: {[key: string]: any}; // Type enumeration keys
  testCaseSteps: TestCaseStep[] = [];
  testCaseStep: TestCaseStep;
  tags: string[] = [];

  public selectedTestSteps = [];

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

  }

  onDelete(): void {
    this.selectedTestSteps.forEach(testStep => {
      this.testcase.steps = this.testcase.steps?.filter(steps => steps !== testStep);
    });
  }

  ngOnInit(): void {
    this.priorityKeys = Object.keys(this.priorities).filter(f => !isNaN(Number(f))).map((key: any) => (
      { value: this.priorities[key as any], key: parseInt(key, 10)}));
    this.typeKeys = Object.keys(this.types).filter(f => !isNaN(Number(f))).map(key => (
      { value: this.types[key as any], key: parseInt(key, 10)}));
  }

}
