import { Test, TestingModule } from '@nestjs/testing';
import { NumberGeneration, RandomService } from './random.service';

describe('RandomService', () => {
  let service: RandomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomService],
    }).compile();

    service = module.get<RandomService>(RandomService);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('startNumberGeneration', () => {
    it('should start generating numbers', async () => {
      const response = await service.startNumberGeneration();
      expect(response).toEqual({ message: 'Number generation started' });
      expect(service['isGenerating']).toBe(true);
      expect(setInterval).toHaveBeenCalledWith(expect.any(Function), service.frequency);
    });

    it('should not start if already generating', async () => {
      await service.startNumberGeneration();
      const response = await service.startNumberGeneration();
      expect(response).toEqual({ message: 'Already generating numbers' });
    });
  });

  describe('stopNumberGeneration', () => {
    it('should stop number generation', async () => {
      await service.startNumberGeneration();
      const response = await service.stopNumberGeneration();
      expect(response).toEqual({ message: 'Number generation stopped' });
      expect(service['isGenerating']).toBe(false);
      expect(clearInterval).toHaveBeenCalledWith(service['intervalId']);
    });

    it('should handle stop when not generating', async () => {
      const response = await service.stopNumberGeneration();
      expect(response).toEqual({ message: 'Number generation not started' });
    });
  });


   describe('setFrequency', () => {
    it('should update frequency and restart generation if active', async () => {
      await service.startNumberGeneration();
      const response = await service.setFrequency(5000);
      expect(response).toEqual({ message: 'Frequency updated to 5000ms' });
      expect(service.frequency).toBe(5000);
      expect(clearInterval).toHaveBeenCalled();
      expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 5000);
    });

    it('should update frequency without restarting if not active', async () => {
      const response = await service.setFrequency(2000);
      expect(response).toEqual({ message: 'Frequency updated to 2000ms' });
      expect(service.frequency).toBe(2000);
      expect(clearInterval).not.toHaveBeenCalled();
    });
  });

  it('should filter numbers by start and end parameters', () => {
    service['_numbers'] = [
      { timestamp: '2023-01-01T00:00:00.000Z', value: 1 },
      { timestamp: '2023-01-02T00:00:00.000Z', value: 2 },
      { timestamp: '2023-01-03T00:00:00.000Z', value: 3 },
    ];
    const result = service.getFilteredNumbers('2023-01-01T00:00:00.000Z', '2023-01-02T23:59:59.999Z');
    expect(result.length).toBe(2);
    expect(result).toEqual([
      { timestamp: '2023-01-01T00:00:00.000Z', value: 1 },
      { timestamp: '2023-01-02T00:00:00.000Z', value: 2 },
    ]);
  });
});
