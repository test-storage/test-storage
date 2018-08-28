import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthGuard } from './../../login/auth.guard';
import { AuthenticationService } from './../../login/authentication.service';

import { TranslateService } from '@ngx-translate/core';

import { WebsocketNotificationsService } from './../../shared/websocket-notifications.service';
import { AppNotificationService } from '../app-notification/app-notification.service';
import { Notification } from '../app-notification/notification';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public notifications: Notification[] = [];
  private websocketConnection;

  constructor(
    private authGuard: AuthGuard,
    private authService: AuthenticationService,
    protected translateService: TranslateService,
    private notificationsService: WebsocketNotificationsService,
    private coldNotificationsService: AppNotificationService
  ) { }

  ngOnInit() {
    this.loadNotifications();
    this.subscribeToHotNotifications();
  }

  loadNotifications() {
    this.coldNotificationsService.getNotifications().subscribe(
      notification => this.notifications.push(notification),
      error => console.log(error));
  }

  subscribeToHotNotifications() {
    this.websocketConnection = this.notificationsService.connect().subscribe(notification => {
      this.notifications.push(notification as Notification);
      console.log('notifications:', this.notifications);
    });
  }

  ngOnDestroy() {
    this.websocketConnection.unsubscribe();
  }


  logout() {
    this.authService.logout();
    this.authGuard.canActivate();
  }

}
