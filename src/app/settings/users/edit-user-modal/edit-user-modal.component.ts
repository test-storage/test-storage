import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import { User } from '../user';
import { RolesService } from '../../roles/roles.service';
import { Role } from '../../roles/role';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent implements OnInit, OnDestroy {

  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() userChange = new EventEmitter<User>();
  @Input() user: User;
  public roles: Role[];
  subscription;

  constructor(private rolesService: RolesService) { }

  setOpened(val: boolean) {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  updateUser() {
    this.userChange.emit(this.user);
  }

  ngOnInit() {
    this.loadRoles();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadRoles() {
    this.subscription = this.rolesService.getRoles().subscribe(
      data => this.roles = data,
      error => console.log(error)); // this.notificationsService.error(error.status, error.error));
  }

}
