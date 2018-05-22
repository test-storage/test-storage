import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  setOpened(val: boolean) {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  deleteTestrun() {
    this.confirmChange.emit();
  }

  ngOnInit() {
  }

}
