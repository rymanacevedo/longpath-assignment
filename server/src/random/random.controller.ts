import { Controller, Get } from '@nestjs/common';
import { RandomService } from './random.service';

@Controller('random')
export class RandomController {
  constructor(private randomService: RandomService) {}
  @Get()
  getRandomNumber() {
    return this.randomService.startNumberGeneration();
  }
}
