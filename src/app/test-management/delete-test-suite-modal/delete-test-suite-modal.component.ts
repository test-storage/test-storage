import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-test-suite-modal',
  templateUrl: './delete-test-suite-modal.component.html',
  styleUrls: ['./delete-test-suite-modal.component.css']
})
export class DeleteTestSuiteModalComponent implements OnInit {

  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() confirmChange = new EventEmitter();

  constructor() { }

  setOpened(val: boolean): void {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  deleteTestSuite(): void {
    this.confirmChange.emit();
  }

  ngOnInit(): void {
  }

}
