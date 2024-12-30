import { Controller, Get, Post } from '@nestjs/common';
import { RandomService } from './random.service';

@Controller('random')
export class RandomController {
  constructor(private randomService: RandomService) {}
  @Get()
  getRandomNumber() {
    return this.randomService.startNumberGeneration();
  }

  @Post()
  setFrequency() {
    return {message: `Frequency set to 5ms`}
  }
}
