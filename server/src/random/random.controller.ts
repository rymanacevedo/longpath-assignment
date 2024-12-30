import { Body, Query, Controller, Get, Post } from '@nestjs/common';
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
    this.randomService.frequency = frequency;
    return {message: `Frequency set to ${frequency}ms`}
  }

  @Get('filter') 
  filterNumbers(@Query('start') start: string, @Query('end') end: string) {
    return this.randomService.getFilteredNumbers(start, end);
  } 
}
