import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketNotificationsService {

  private url = 'http://localhost:3000';
  private socket!: SocketIOClient.Socket;

  constructor() { }

  connect(): Observable<any> {
    const result = new Observable(observer => {
      // TODO move to env
      this.socket = io(this.url);

      this.socket.on('connect', () => {
        console.log('Connected');
      });

      this.socket.on('notifications', (data: any) => {
        console.log('Received notifications from Websocket Server');
        observer.next(data);
      });

      this.socket.on('exception', (data: any) => {
        console.log('event', data);
      });

      this.socket.on('disconnect', () => {
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
