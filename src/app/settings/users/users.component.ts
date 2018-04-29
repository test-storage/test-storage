import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { pageTransition } from '../../animations';

import { UsersService } from './users.service';
import { User } from './user';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [pageTransition]
})
export class UsersComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  selectedUsers = [];
  subscription;
  users: User[];

  public createOpened = false;
  public editOpened = false;
  public deleteOpened = false;

  constructor(
    private usersService: UsersService,
    private notificationsService: NotificationsService,
    protected translateService: TranslateService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadUsers() {
    this.subscription = this.usersService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error)); // this.notificationsService.error(error.status, error.error));
  }

  onAdd() {
    this.createOpened = true;
  }

  onEdit() {
    this.editOpened = true;
  }

  onDelete() {
    this.deleteOpened = true;
  }

  createUser(user: User) {
    // remove unused field (used only for validation)
    delete user.confirmPassword;

    this.usersService.createUser(user).subscribe(
      response => {
        if (response.status === 201) {
          this.notificationsService.success(
            `${user.lastName} ${user.firstName}`,
            this.translateService.instant('COMMON.SUCCESSFULLY_CREATED')
          );
          this.users.push(user);
        }
      },
      error => console.log(error)
    );
  }

  updateUser(user: User) {
    // TODO thinking about password change
    // remove unused field (used only for validation)
    delete user.confirmPassword;

    this.usersService.updateUser(user, user._id).subscribe(
      response => {
        if (response.status === 200) {
          this.notificationsService.success(
            `${user.lastName} ${user.firstName}`,
            this.translateService.instant('COMMON.SUCCESSFULLY_UPDATED')
          );

          // update local array of users
          const foundIndex = this.users.findIndex(mUser => mUser._id === user._id);
          this.users[foundIndex] = user;

          // remove selection
          this.selectedUsers = [];
        }
      },
      error => console.log(error)
    );
  }

  forceDelete() {
    this.selectedUsers.forEach(selectedUser => {
      if (selectedUser.email === 'admin') {
        // admin account can't be deleted
      } else {
        this.usersService.deleteUser(selectedUser._id).subscribe(
          response => {
            if (response.status === 200) {
              this.notificationsService.success(
                `${selectedUser.lastName} ${selectedUser.firstName}`,
                this.translateService.instant('COMMON.SUCCESSFULLY_DELETED')
              );
              this.users = this.users.filter(users => users !== selectedUser);
            }
          },
          error => console.log(error)
        );
      }
    });
  }

}
