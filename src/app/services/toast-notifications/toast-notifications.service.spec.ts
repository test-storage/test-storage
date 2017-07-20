import { TestBed, inject } from '@angular/core/testing';

import { ToastNotificationsService } from './toast-notifications.service';
import { NotificationsService } from 'angular2-notifications';

describe('ToastNotificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastNotificationsService, NotificationsService]
    });
  });

  it('should be created', inject([ToastNotificationsService], (service: ToastNotificationsService) => {
    expect(service).toBeTruthy();
  }));
});
