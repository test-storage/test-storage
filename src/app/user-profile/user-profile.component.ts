import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';

import { pageTransition } from '../animations';

import { TranslateService } from '@ngx-translate/core';

import { User } from '../settings/users/user';
import { UserProfileService } from './user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  animations: [pageTransition]
})
export class UserProfileComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  private subscription!: Subscription;
  public profile!: User;

  constructor(
    private userProfileService: UserProfileService,
    protected translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getProfile(): void {
    this.subscription = this.userProfileService.getUser().subscribe(
      data => this.profile = data,
      error => console.log(error)); // this.notificationsService.error(error.status, error.error));
  }

}
