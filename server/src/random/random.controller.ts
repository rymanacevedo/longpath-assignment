import { Controller, Get } from '@nestjs/common';

@Controller('random')
export class RandomController {
  @Get()
  getRandomNumber(): { number: number } {
    const randomNumber = Math.floor(Math.random() * 100); // Change 100 to your desired range
    return { number: randomNumber };
  }
}
