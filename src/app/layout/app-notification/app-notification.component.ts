import { Component, OnInit } from '@angular/core';

import { Notification } from './notification';

@Component({
  selector: 'app-notification',
  templateUrl: './app-notification.component.html',
  styleUrls: ['./app-notification.component.css']
})
export class AppNotificationComponent implements OnInit {

  public notifications: Notification[] = [
    {
      entity: 'Testcase',
      recipientId: '33e00f032',
      senderId: '3030ef2',
      action: 'Review',
      isRead: false
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
