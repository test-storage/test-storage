import { TestBed, inject } from '@angular/core/testing';

import { WebsocketNotificationsService } from './websocket-notifications.service';

xdescribe('WebsocketNotificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebsocketNotificationsService]
    });
  });

  it('should be created', inject([WebsocketNotificationsService], (service: WebsocketNotificationsService) => {
    expect(service).toBeTruthy();
  }));
});
