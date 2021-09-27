import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.css']
})
export class DeleteUserModalComponent {

  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() confirmChange = new EventEmitter();

  setOpened(val: boolean) {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  deleteUser() {
    this.confirmChange.emit();
  }

}
