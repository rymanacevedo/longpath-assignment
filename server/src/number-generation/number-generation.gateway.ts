import { SubscribeMessage, WebSocketGateway, WebSocketServer }
from '@nestjs/websockets';

import {Server} from 'socket.io';

@WebSocketGateway()
export class NumberGenerationGateway {


  @WebSocketServer() io: Server;

  @SubscribeMessage('ping')
  handleMessage(client: any, payload: any) {
    return {
      event: 'pong',
      data: 'Wrong data'
    }
  }
}
