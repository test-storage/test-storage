import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { pageTransition } from '../../animations';

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

  constructor(
    public themeService: ThemeService,
    private userService: UserService) { }

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


  deleteUser(id: string) {
    // TODO delete by object not by ID
    this.userService.deleteUser(id).subscribe(
      response => {
        if (response === 204) {
          console.log('User deleted successfully');
          this.users = this.users.filter(user => user._id !== id);
        }
      },
      error => console.log(error)
    );
  }

}
