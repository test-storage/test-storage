import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TestCase, Priority } from '../test-cases/test-case';

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

  constructor() {
    this.testcase = new TestCase();
  }

  setOpened(val: boolean) {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  createTestCase() {
    this.testcaseChange.emit(this.testcase);
    this.testcase = new TestCase();
  }

  ngOnInit() {
    this.keys = Object.keys(this.priorities).filter(f => !isNaN(Number(f))).map(k => parseInt(k, 10));
  }

}
