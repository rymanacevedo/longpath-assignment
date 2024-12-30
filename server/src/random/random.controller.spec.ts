import { Test, TestingModule } from '@nestjs/testing';
import { RandomController } from './random.controller';
import { RandomService } from './random.service';

describe('RandomController', () => {
  let controller: RandomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RandomController],
      providers: [RandomService]
    }).compile();

    controller = module.get<RandomController>(RandomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should return a timestamp and value', () => {
  //   const result = controller.getRandomNumber();
  //   expect(result).toHaveProperty('value');
  //   expect(result).toHaveProperty('timestamp');
  // });
});
