import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

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
  @Input() user!: User;
  public roles: Role[] = [];
  private subscription!: Subscription;

  constructor(private rolesService: RolesService) { }

  setOpened(val: boolean): void {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  updateUser(): void {
    this.userChange.emit(this.user);
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadRoles(): void {
    this.subscription = this.rolesService.getRoles().subscribe(
      data => this.roles = data,
      error => console.log(error)); // this.notificationsService.error(error.status, error.error));
  }

}
