import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { pageTransition } from '../../../animations';
import { ThemeService } from '../../../services/theme/theme.service';

import { User } from '../../../models/user';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css'],
  providers: [
    ThemeService,
    UserService
  ],
  animations: [pageTransition()]
})
export class UsersCreateComponent implements OnInit {

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  public user: User = new User();

  constructor(
    public themeService: ThemeService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
  }

  createNewUser() {
    this.userService.createUser(this.user).subscribe(
      response => {
        if (response === 201) {
          this.router.navigate(['./users']);
        }
      },
      error => console.log(error)
    );
  }

}
