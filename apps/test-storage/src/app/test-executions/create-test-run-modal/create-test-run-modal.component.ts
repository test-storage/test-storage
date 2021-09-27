import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Testrun } from '../testrun';

@Component({
  selector: 'app-create-test-run-modal',
  templateUrl: './create-test-run-modal.component.html',
  styleUrls: ['./create-test-run-modal.component.css']
})
export class CreateTestRunModalComponent {

  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() testrunChange = new EventEmitter<Testrun>();

  public testrun: Testrun;

  constructor() {
    this.testrun = new Testrun();
    this.testrun.testcases = [];
  }

  setOpened(val: boolean): void {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  createTestrun(): void {
    this.testrunChange.emit(this.testrun);
    this.testrun = new Testrun();
  }

}
