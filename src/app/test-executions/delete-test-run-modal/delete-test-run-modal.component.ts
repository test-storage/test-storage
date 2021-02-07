import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Testrun } from './../testrun';

@Component({
  selector: 'app-delete-test-run-modal',
  templateUrl: './delete-test-run-modal.component.html',
  styleUrls: ['./delete-test-run-modal.component.css']
})
export class DeleteTestRunModalComponent implements OnInit {

  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() confirmChange = new EventEmitter();

  constructor() { }

  setOpened(val: boolean): void {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  deleteTestrun(): void {
    this.confirmChange.emit();
  }

  ngOnInit(): void {
  }

}
