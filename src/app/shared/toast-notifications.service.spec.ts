import { TestBed, inject } from '@angular/core/testing';

import { ToastNotificationsService } from './toast-notifications.service';

xdescribe('ToastNotificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastNotificationsService]
    });
  });

  it('should be created', inject([ToastNotificationsService], (service: ToastNotificationsService) => {
    expect(service).toBeTruthy();
  }));
});
