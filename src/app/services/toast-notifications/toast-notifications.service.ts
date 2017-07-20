import { Injectable } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class ToastNotificationsService {

  constructor(
    private toastNotificationsService: NotificationsService
  ) { }

  public error(title, description) {

    // TODO move override to directive setup as options
    this.toastNotificationsService.error(title, description, {
      timeOut: 5000,
      showProgressBar: false,
      pauseOnHover: false,
      clickToClose: false,
      maxLength: 30
    });
  }

  public success(title, description) {

    this.toastNotificationsService.success(title, description, {
      timeOut: 5000,
      showProgressBar: false,
      pauseOnHover: false,
      clickToClose: false,
      maxLength: 30
    });
  }

  // TODO add more methods

}
