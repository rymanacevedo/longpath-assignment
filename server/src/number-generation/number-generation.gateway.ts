import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer }
from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// TODO: https://docs.nestjs.com/security/rate-limiting#websockets
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class NumberGenerationGateway implements OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer() io: Server;

  private intervalId: NodeJS.Timeout | null = null;
  private frequency = 1000; // Default frequency in ms

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    client.emit('connected', { message: 'Welcome to the WebSocket server!' });
  }

  
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('ping')
  handleMessage(client: Socket, payload: any) {
    return {
      event: 'pong',
      data: payload
    }
  }

    @SubscribeMessage('start')
    startGeneration(client: Socket) {
      if (this.intervalId) {
        client.emit('error', { message: 'Generation already started' });
        return;
      }
  
      this.intervalId = setInterval(() => {
        const randomNumber = Math.floor(Math.random() * 100);
        const timestamp = new Date().toISOString();
        const data = { value: randomNumber, timestamp };
  
        this.io.emit('random-number', data);
      }, this.frequency);
  
      return { event: 'started', message: 'Number generation started' };
    }

    @SubscribeMessage('stop')
    stopGeneration(client: Socket) {
      if (!this.intervalId) {
        client.emit('error', { message: 'Generation is not running' });
        return;
      }
  
      clearInterval(this.intervalId);
      this.intervalId = null;
  
      return { event: 'stopped', message: 'Number generation stopped' };
    }
  
  
}
