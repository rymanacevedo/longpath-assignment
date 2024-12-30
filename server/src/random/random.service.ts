import { Injectable } from '@nestjs/common';
import { timestamp } from 'rxjs';

@Injectable()
export class RandomService {
    startNumberGeneration(): {timestamp: string; value: number} {
        const randomNumber = Math.floor(Math.random() * 100); // Change 100 to your desired range
        ;
        const timestamp;


        return {value: randomNumber, timestamp}
    }
}
