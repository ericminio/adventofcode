const { expect } = require('chai')
const { puzzle } = require('../puzzle.input')

describe('day 1 challenge', ()=> {

    it('is about counting increasing measurements', ()=>{ 
        let input = puzzle('day.1', 'example.txt').map(s => parseInt(s));           
        expect(countIncreasingMeasurements({ input:input })).to.equal(7);
    });    
    it('has a part 1', ()=>{ 
        let input = puzzle('day.1', 'input.txt').map(s => parseInt(s));           
        expect(countIncreasingMeasurements({ input:input })).to.equal(1400);
    });

    it('is also about counting in a sliding window', ()=>{ 
        let input = puzzle('day.1', 'example.txt').map(s => parseInt(s));           
        expect(countIncreasingMeasurements({ input:input, windowSize:3 })).to.equal(5);
    }); 
    const countIncreasingMeasurements = (options) => {
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
        let input = puzzle('day.1', 'input.txt').map(s => parseInt(s));           
        expect(countIncreasingMeasurements({ input:input, windowSize:3 })).to.equal(1429);
    });

})
