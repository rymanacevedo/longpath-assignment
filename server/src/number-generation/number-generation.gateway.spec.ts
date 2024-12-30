import { Test, TestingModule } from '@nestjs/testing';
import { NumberGenerationGateway } from './number-generation.gateway';

describe('NumberGenerationGateway', () => {
  let gateway: NumberGenerationGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NumberGenerationGateway],
    }).compile();

    gateway = module.get<NumberGenerationGateway>(NumberGenerationGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
