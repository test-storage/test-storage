import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-test-case-modal',
  templateUrl: './delete-test-case-modal.component.html',
  styleUrls: ['./delete-test-case-modal.component.css']
})
export class DeleteTestCaseModalComponent implements OnInit {

  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() confirmChange = new EventEmitter();

  constructor() { }

  setOpened(val: boolean): void {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  deleteTestCase(): void {
    this.confirmChange.emit();
  }

  ngOnInit(): void {
  }

}
