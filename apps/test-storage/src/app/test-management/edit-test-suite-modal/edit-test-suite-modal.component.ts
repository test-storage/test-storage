import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TestSuite } from '../test-suite';

@Component({
  selector: 'app-edit-test-suite-modal',
  templateUrl: './edit-test-suite-modal.component.html',
  styleUrls: ['./edit-test-suite-modal.component.css']
})
export class EditTestSuiteModalComponent implements OnInit {

  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() testsuiteChange = new EventEmitter<TestSuite>();

  @Input() testsuite: TestSuite;

  constructor() {
    this.testsuite = new TestSuite();
  }

  setOpened(val: boolean): void {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  updateTestSuite(): void {
    this.testsuiteChange.emit(this.testsuite);
  }

  ngOnInit(): void {
  }
}
