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
        let previousSum = 0;
        for (var i=0; i<windowSize; i++) {
            previousSum += input[i];
        }
        let sum = previousSum;
        for (var i=windowSize; i<input.length; i++) {
            previousSum = sum;
            sum += input[i];
            sum -= input[i-windowSize];
            if (sum > previousSum) { count ++ }
        }
        return count;
    }
    it('has a part 2', ()=>{ 
        expect(increasingMeasurementsCount({ input:challenge, windowSize:3 })).to.equal(1429);
    });

})
