import { Test } from '@nestjs/testing';
import { NumberGenerationGateway } from './number-generation.gateway';
import { INestApplication } from '@nestjs/common';
import { Socket, io } from 'socket.io-client';

async function createNestApp(...gateways: any): Promise<INestApplication> {
  const testingModule = await Test.createTestingModule({
    providers: gateways,
  }).compile();
  return testingModule.createNestApplication();
}

describe('NumberGenerationGateway', () => {
  let gateway: NumberGenerationGateway;
  let app: INestApplication;
  let ioClient: Socket;

  beforeAll(async () => {
    app = await createNestApp(NumberGenerationGateway);
    gateway = app.get<NumberGenerationGateway>(NumberGenerationGateway);
    ioClient = io('http://localhost:3000', {
      autoConnect: false,
      transports: ['websocket', 'polling'],
    });

    app.listen(3000);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should emit "pong" on "ping"', async () => {
    ioClient.connect();
    ioClient.emit('ping', 'Hello world!');
    await new Promise<void>((resolve) => {
      ioClient.on('connect', () => {
        console.log('connected');
      });
      ioClient.on('pong', (data) => {
        expect(data).toBe('Hello world!');
        resolve();
      });
    });
    ioClient.disconnect();
  });

  it('should emit "status" on "start"', async () => {
    ioClient.connect();
    ioClient.emit('start');
    await new Promise<void>((resolve) => {
      ioClient.on('status', (data) => {
        expect(data).toBe('Number generation started');
        resolve();
      });
    });
  });

  it('should emit "random-number" on "start"', async () => {
    ioClient.connect();
    ioClient.emit('start');
    await new Promise<void>((resolve) => {
      ioClient.on('random-number', (data) => {
        expect(data).toBe('Number generation started');
        resolve();
      });
    });
  });

  it('should emit "status" on "stop"', async () => {
    ioClient.connect();
    ioClient.emit('stop');
    await new Promise<void>((resolve) => {
      ioClient.on('status', (data) => {
        expect(data).toBe('Number generation stopped');
        resolve();
      });
    });
  });
  
});
