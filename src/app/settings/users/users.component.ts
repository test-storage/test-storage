import { Component, OnInit, HostBinding } from '@angular/core';
import { pageTransition } from '../../animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [pageTransition]
})
export class UsersComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  selected = [];

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

  constructor() { }

  ngOnInit() {
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
