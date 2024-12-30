import { Injectable } from '@nestjs/common';

export type NumberGeneration = {
    timestamp: string;
    value: number;
}

@Injectable()
export class RandomService {
    startNumberGeneration(): NumberGeneration {
        const randomNumber = Math.floor(Math.random() * 100); // Change 100 to your desired range
        ;
        const timestamp = new Date().toISOString();


        return {value: randomNumber, timestamp}
    }
}
