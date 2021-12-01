const { expect } = require('chai')
const { puzzle } = require('../puzzle.input')

describe('day 1 challenge', ()=> {

    it('includes an example for part 1', ()=>{ 
        let input = puzzle('day.1', 'example.txt').map(s => parseInt(s));           
        expect(countIncreasingWindow(input, 1)).to.equal(7);
    });    
    it('includes part 1', ()=>{ 
        let input = puzzle('day.1', 'input.txt').map(s => parseInt(s));           
        expect(countIncreasingWindow(input, 1)).to.equal(1400);
    });

    it('includes an example for part 2', ()=>{ 
        let input = puzzle('day.1', 'example.txt').map(s => parseInt(s));           
        expect(countIncreasingWindow(input, 3)).to.equal(5);
    }); 
    const countIncreasingWindow = (input, windowSize) => {
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
    it('includes part 2', ()=>{ 
        let input = puzzle('day.1', 'input.txt').map(s => parseInt(s));           
        expect(countIncreasingWindow(input, 3)).to.equal(1429);
    });

})
