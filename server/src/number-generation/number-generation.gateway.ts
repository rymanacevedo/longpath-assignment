import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket} from 'socket.io';

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
  private _isGenerating = false;
  private _frequency = 1000; // Default frequency in ms

  startGeneration(client: Socket) {

    if (this._isGenerating) {
      client.emit('status', { isGenerating: true, message: 'Already generating numbers' });
      return;
    }
    this._isGenerating = true;
    this._intervalId = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 100);
      const timestamp = new Date().toISOString();
      const data = { value: randomNumber, timestamp };

      this.io.emit('random-number', data);
    }, this._frequency);

    this.io.emit('status', { isGenerating: true, message: 'Number generation started' });
  }

  stopGeneration(client: Socket) {
    if (!this._isGenerating) {
      client.emit('status', { isGenerating: false, message: 'Not generating numbers' });
      return;
    }

    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }

    this._isGenerating = false;

    this.io.emit('status', { isGenerating: false, message: 'Number generation stopped' });
  }

  updateFrequency(newFrequency: number) {
    this._frequency = newFrequency;
    if (this._intervalId) {
      this.stopGeneration();
      this.startGeneration();
    }
  }

  @SubscribeMessage('start')
  handleStart(client: Socket) {
    this.startGeneration(client);
    return { event: 'started', message: 'Number generation started' };
  }

  @SubscribeMessage('stop')
  handleStop(client: Socket) {
    this.stopGeneration(client);
    return { event: 'stopped', message: 'Number generation stopped' };
  }
}
