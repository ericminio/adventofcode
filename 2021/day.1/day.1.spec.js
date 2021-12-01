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

        let count = 0;
        let sum = previousSum = initialSum(input, windowSize);
        for (var i = windowSize; i < input.length; i++) {
            sum   += input[i];
            sum   -= input[i - windowSize];
            count += sum > previousSum ? 1 : 0
            previousSum = sum;
        }
        return count;
    }
    const initialSum = (input, windowSize) => {
        return input.slice(0, windowSize)
                    .reduce((acc, current) => acc + current, 0);
    }
    it('has a part 2', ()=>{ 
        expect(increasingMeasurementsCount({ input:challenge, windowSize:3 })).to.equal(1429);
    });

})
