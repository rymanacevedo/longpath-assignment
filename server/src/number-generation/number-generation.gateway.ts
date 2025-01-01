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

  private intervalId: NodeJS.Timeout | null = null;
  private frequency = 1000; // Default frequency in ms

  startGeneration() {
    if (this.intervalId) {
      return;
    }

    this.intervalId = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 100);
      const timestamp = new Date().toISOString();
      const data = { value: randomNumber, timestamp };

      this.io.emit('random-number', data);
    }, this.frequency);
  }

  stopGeneration() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  updateFrequency(newFrequency: number) {
    this.frequency = newFrequency;
    if (this.intervalId) {
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
