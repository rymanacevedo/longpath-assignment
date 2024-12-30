import { SubscribeMessage, WebSocketGateway, WebSocketServer }
from '@nestjs/websockets';

import {Server} from 'socket.io';

// TODO: https://docs.nestjs.com/security/rate-limiting#websockets
@WebSocketGateway()
export class NumberGenerationGateway {


  @WebSocketServer() io: Server;

  handleConnection(client: any, ...args: any[]) {
    const {sockets} = this.io.sockets;
  }

  handleDisconnect(client: any) {

  }

  @SubscribeMessage('ping')
  handleMessage(client: any, payload: any) {
    return {
      event: 'pong',
      data: payload
    }
  }
}
