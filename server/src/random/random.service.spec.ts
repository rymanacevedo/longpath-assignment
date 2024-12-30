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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a random number within range', () => {
    const result = service.startNumberGeneration();
    expect(result.value).toBeGreaterThanOrEqual(0);
    expect(result.value).toBeLessThan(100);
  });

  it('should return a valid timestamp', () => {
    const result = service.startNumberGeneration();
    expect(result.timestamp).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
    );
  });

  it('should update the frequency to user set number', () => {
    service.frequency = 5;
    expect(service.frequency).toEqual(5);
  });
});
