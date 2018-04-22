import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { pageTransition } from '../../animations';

import { UsersService } from './users.service';
import { User } from './user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [pageTransition]
})
export class UsersComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  selected = [];
  subscription;
  users: User[];
  /*
  public users = [
    {
      id: '44kijtj55iig',
      lastName: 'Doe',
      firstName: 'John',
      email: 'johndoe@example.com',
      created: 1523822573,
      groups: ['admin'],
      avatar: 'path/to/file'
    },
    {
      id: '44kijtj55iig',
      lastName: 'Doe',
      firstName: 'John',
      email: 'johndoe@example.com',
      created: 1523822573,
      groups: ['admin'],
      avatar: 'path/to/file'
    },
    {
      id: '44kijtj55iig',
      lastName: 'Doe',
      firstName: 'John',
      email: 'johndoe@example.com',
      created: 1523822573,
      groups: ['admin'],
      avatar: 'path/to/file'
    }
  ];
  */

  constructor(private usersService: UsersService) { }

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

  }

  onEdit() {

  }

  onDelete() {
    // TODO are you sure? via modal
    this.selected.forEach(selectedUser => {
      // TODO delete via service
      this.users = this.users.filter(users => users !== selectedUser);
      // TODO Notification => successfully deleted
    });
  }

}
