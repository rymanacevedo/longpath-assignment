import { Body, Query, Controller, Get, Post } from '@nestjs/common';
import { NumberGenerationGateway } from 'src/number-generation/number-generation.gateway';

@Controller('random')
export class RandomController {
  constructor(private readonly gateway: NumberGenerationGateway) {}

  @Post('frequency')
  setFrequency(@Body('frequency') frequency: number) {
    if(frequency <= 0) {
      return {message: 'Frequency must be greater than 0'}
    }

    this.gateway.updateFrequency(frequency);
    return {message: `Frequency set to ${frequency}ms`}
  }

}
