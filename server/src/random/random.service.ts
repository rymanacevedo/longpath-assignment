import { Injectable } from '@nestjs/common';

export type NumberGeneration = {
    timestamp: string;
    value: number;
}

@Injectable()
export class RandomService {
    private intervalId: NodeJS.Timeout | null = null;
    private _frequency = 1000; // in ms
    private _numbers: NumberGeneration[] = [];
    private isGenerating = false;
    
    startNumberGeneration() {
        if(this.isGenerating) {
            return Promise.resolve({message: 'Already generating numbers'});
        }

        this.isGenerating = true;

        this.intervalId = setInterval(() => {
            const randomNumber = Math.floor(Math.random() * 100); // Change 100 to your desired range
            ;
            const timestamp = new Date().toISOString();
            this._numbers.push({timestamp, value: randomNumber })
        }, this.frequency);



        return Promise.resolve({message: 'Number generation started'});
    }

    async stopNumberGeneration() {

        if(!this.isGenerating) {
            return Promise.resolve({message: 'Number generation not started'});
        }

        if(this.intervalId) {
            clearInterval(this.intervalId);
        }
        this.isGenerating = false;
        return Promise.resolve({message: 'Number generation stopped'});
    }

    public async setFrequency(v : number) {
        this._frequency = v;
        if (this.isGenerating) {
          await  this.stopNumberGeneration();
          await  this.startNumberGeneration();
        }
        return Promise.resolve({ message: `Frequency updated to ${v}ms` });
    }
 
    public get frequency() : number {
        return this._frequency;
    }

    getFilteredNumbers(start: string, end: string) {
        const startDate = new Date(start).getTime();
        const endDate = new Date(end).getTime();
        return this._numbers.filter(({ timestamp }) => {
            const time = new Date(timestamp).getTime();
            return time >= startDate && time <= endDate;
        });    
    }
    
}
