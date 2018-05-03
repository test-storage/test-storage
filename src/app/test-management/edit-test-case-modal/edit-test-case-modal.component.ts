import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TestCase, Priority } from '../test-cases/test-case';

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

  constructor() { }

  setOpened(val: boolean) {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  updateTestCase() {
    this.testcaseChange.emit(this.testcase);
  }

  ngOnInit() {
    this.keys = Object.keys(this.priorities).filter(f => !isNaN(Number(f))).map(k => parseInt(k, 10));
  }

}
