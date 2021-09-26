import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TestSuite } from '../test-suite';
@Component({
  selector: 'app-create-test-suite-modal',
  templateUrl: './create-test-suite-modal.component.html',
  styleUrls: ['./create-test-suite-modal.component.css']
})
export class CreateTestSuiteModalComponent implements OnInit {

  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() testsuiteChange = new EventEmitter<TestSuite>();

  public testsuite!: TestSuite;

  constructor() {
    this.testsuite = new TestSuite();
  }

  setOpened(val: boolean): void {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  createTestSuite(): void {
    this.testsuiteChange.emit(this.testsuite);
    this.testsuite = new TestSuite();
  }

  ngOnInit(): void {
  }

}
