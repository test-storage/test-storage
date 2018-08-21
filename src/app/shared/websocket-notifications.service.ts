import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketNotificationsService {

  private url = 'http://localhost:3000';
  private socket;

  constructor() { }


  connect() {
    const result = new Observable(observer => {
      // TODO move to env
      this.socket = io(this.url);

      this.socket.on('connect', () => {
        console.log('Connected');
      });

      this.socket.on('notifications', (data) => {
        console.log('Received notifications from Websocket Server');
        observer.next(data);
      });

      this.socket.on('exception', function (data) {
        console.log('event', data);
      });

      this.socket.on('disconnect', function () {
        console.log('Disconnected');
    });
      return () => {
        console.log('Disconnected');
        this.socket.disconnect();
      };
    });
    return result;
  }
}
