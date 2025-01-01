import { Body, Query, Controller, Get, Post } from '@nestjs/common';
import { NumberGenerationGateway } from 'src/number-generation/number-generation.gateway';
import { RandomService } from './random.service';

@Controller('random')
export class RandomController {
  constructor(private readonly gateway: NumberGenerationGateway, private randomService: RandomService) {}

  @Post()
  setFrequency(@Body('frequency') frequency: number) {
    if(frequency <= 0) {
      return {message: 'Frequency must be greater than 0'}
    }

    this.gateway.updateFrequency(frequency);
    return {message: `Frequency set to ${frequency}ms`}
  }

  @Get('filter') 
  filterNumbers(@Query('start') start: string, @Query('end') end: string) {
    return this.randomService.getFilteredNumbers(start, end);
  } 
}
