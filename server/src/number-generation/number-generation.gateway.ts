import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class NumberGenerationGateway {
  @WebSocketServer() io: Server;

  private _intervalId: NodeJS.Timeout | null = null;
  private _frequency = 1000; // Default frequency in ms

  startGeneration() {
    if (this._intervalId) {
      return;
    }

    this._intervalId = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 100);
      const timestamp = new Date().toISOString();
      const data = { value: randomNumber, timestamp };

      this.io.emit('random-number', data);
    }, this._frequency);
  }

  stopGeneration() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }

  updateFrequency(newFrequency: number) {
    this._frequency = newFrequency;
    if (this._intervalId) {
      this.stopGeneration();
      this.startGeneration();
    }
  }

  @SubscribeMessage('start')
  handleStart() {
    this.startGeneration();
    return { event: 'started', message: 'Number generation started' };
  }

  @SubscribeMessage('stop')
  handleStop() {
    this.stopGeneration();
    return { event: 'stopped', message: 'Number generation stopped' };
  }
}
