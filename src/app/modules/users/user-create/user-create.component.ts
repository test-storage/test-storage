import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { pageTransition } from '../../../animations';

import { TranslateService } from '@ngx-translate/core';

import { ThemeService } from '../../../services/theme/theme.service';
import { NotificationsService } from 'angular2-notifications';

import { User } from '../../../models/user';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [
    UserService
  ],
  animations: [pageTransition()]
})
export class UserCreateComponent implements OnInit {

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  public user: User = new User();

  constructor(
    private router: Router,
    private userService: UserService,
    private notificationsService: NotificationsService,
    public themeService: ThemeService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
  }

  createNewUser(user) {
    this.user = user;

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
