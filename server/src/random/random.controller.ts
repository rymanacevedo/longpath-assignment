import { Body, Controller, Get, Post } from '@nestjs/common';
import { RandomService } from './random.service';

@Controller('random')
export class RandomController {
  constructor(private randomService: RandomService) {}
  @Get()
  getRandomNumber() {
    return this.randomService.startNumberGeneration();
  }

  @Post()
  setFrequency(@Body('frequency') frequency: number) {
    return {message: `Frequency set to ${frequency}ms`}
  }
}
