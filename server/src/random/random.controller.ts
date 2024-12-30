import { Controller, Get } from '@nestjs/common';

@Controller('random')
export class RandomController {
  @Get()
  getRandomNumber(): { number: number } {
    
  }
}
