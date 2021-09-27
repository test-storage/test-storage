import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Notification } from './notification';

@Injectable({
  providedIn: 'root'
})
export class AppNotificationService {

  apiPath = '/api/v1/notifications';

  // TODO
  // get cold notifications on start
  // subscribe to websocket stream
  // Websocket client / server

  constructor(private http: HttpClient) { }

  public getNotifications(): Observable<Notification> {
    return this.http.get<Notification>(this.apiPath);
  }

  public updateNotification(notification: Notification): Observable<any> {
    return this.http.put(`${this.apiPath}/${notification._id}`, notification, { observe: 'response' });
  }

}
