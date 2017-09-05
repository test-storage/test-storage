import { Component, OnInit, HostBinding, OnDestroy, TemplateRef } from '@angular/core';
import { pageTransition } from '../../animations';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { NotificationsService } from 'angular2-notifications';

import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [pageTransition()]
})
export class UsersComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  private subscription;
  public users: User[];
  public selectedUser: User;

  public modalRef: BsModalRef;

  constructor(
    public themeService: ThemeService,
    private userService: UserService,
    private toastNotificationsService: NotificationsService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getUsers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getUsers() {
    this.subscription = this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error)
    );
  }


  deleteUser(user: User) {
    // TODO ask user about "You are want to delete this user?"
    // TODO delete by object not by ID
    this.userService.deleteUser(user._id).subscribe(
      response => {
        if (response.status === 204) {
          console.log('User deleted successfully'); // TODO modal success
          this.toastNotificationsService.success('User ' + user.lastName + ' ' + user.firstName, 'deleted successfully!');

          this.users = this.users.filter(usr => usr._id !== user._id);
        }
      },
      error => console.log(error)
    );
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
