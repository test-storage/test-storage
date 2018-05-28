import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Testrun } from '../testrun';

@Component({
  selector: 'app-create-test-run-modal',
  templateUrl: './create-test-run-modal.component.html',
  styleUrls: ['./create-test-run-modal.component.css']
})
export class CreateTestRunModalComponent implements OnInit {

  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() testrunChange = new EventEmitter<Testrun>();

  public testrun: Testrun;
  subscription;

  constructor() {
    this.testrun = new Testrun();
  }

  setOpened(val: boolean) {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  createTestrun() {
    this.testrunChange.emit(this.testrun);
    this.testrun = new Testrun();
  }

  ngOnInit() {
  }


}
