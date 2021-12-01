const { expect } = require('chai')
const { integers } = require('../puzzle.input')

describe('day 1 challenge', ()=> {

    let example = integers('day.1', 'example.txt');
    let challenge = integers('day.1', 'input.txt');

    it('is about counting increasing measurements', ()=>{ 
        expect(increasingMeasurementsCount({ input:example })).to.equal(7);
    });    
    it('has a part 1', ()=>{         
        expect(increasingMeasurementsCount({ input:challenge })).to.equal(1400);
    });

    it('is also about counting in a sliding window', ()=>{ 
        expect(increasingMeasurementsCount({ input:example, windowSize:3 })).to.equal(5);
    }); 
    const increasingMeasurementsCount = (options) => {
        let input = options.input;
        let windowSize = options.windowSize || 1;
        let window = new Window(input, windowSize);

        let count = 0;
        let sum = previousSum = window.sum();
        while (window.canSlide()) {
            window.slide();
            sum    = window.sum();
            count += sum > previousSum ? 1 : 0
            previousSum = sum;
        }
        return count;
    }
    class Window {
        constructor(input, size) {
            this.input = input;
            this.size = size;
            this.position = 0;
        }
        sum() {
            return this.input
                    .slice(this.position, this.position + this.size)
                    .reduce((acc, current) => acc + current, 0);
        }
        slide() {
            this.position ++
        }
        canSlide() {
            return this.position <= this.input.length - this.size;
        }
    }
    it('has a part 2', ()=>{ 
        expect(increasingMeasurementsCount({ input:challenge, windowSize:3 })).to.equal(1429);
    });

})
