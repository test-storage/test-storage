import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

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
  subscription!: Subscription;

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

  ngOnInit(): void {
  }


}
