import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-device-modal',
  templateUrl: './delete-device-modal.component.html',
  styleUrls: ['./delete-device-modal.component.css']
})
export class DeleteDeviceModalComponent implements OnInit {

  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() confirmChange = new EventEmitter();

  constructor() { }

  setOpened(val: boolean) {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  deleteUser() {
    this.confirmChange.emit();
  }

  ngOnInit() {
  }

}
