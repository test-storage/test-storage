import { WebSocketGateway, SubscribeMessage, WsResponse, WebSocketServer, WsException } from '@nestjs/websockets';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway()
export class NotificationsGateway {
  @WebSocketServer() server;

  emitEvent(event, data) {
    this.server.emit(event, data);
  }

  @SubscribeMessage('notifications')
  onEvent(client, data): WsResponse<any> {
    const event = 'notifications';
    return { event, data };
  }
}
