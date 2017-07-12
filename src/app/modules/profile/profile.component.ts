import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { pageTransition } from '../../animations';

import { TranslateService } from '@ngx-translate/core';

import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [pageTransition()]
})
export class ProfileComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  private subscription;
  profile: User;

  constructor(
    public themeService: ThemeService,
    private userService: UserService) { }

  ngOnInit() {
    this.getProfile();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getProfile() {
    this.subscription = this.userService.getUsersMe().subscribe(
      data => this.profile = data,
      error => console.log(error)
    );
  }

}
