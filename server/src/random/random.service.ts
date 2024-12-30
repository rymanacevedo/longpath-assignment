import { Injectable } from '@nestjs/common';

export type NumberGeneration = {
    timestamp: string;
    value: number;
}

@Injectable()
export class RandomService {
    private _frequency = 1000; // in ms
    startNumberGeneration(): NumberGeneration {
        const randomNumber = Math.floor(Math.random() * 100); // Change 100 to your desired range
        ;
        const timestamp = new Date().toISOString();


        return {value: randomNumber, timestamp}
    }

    
    public set frequency(v : number) {
        this._frequency = v;
    }
 
    public get frequency() : number {
        return this._frequency;
    }
    
}
