const { expect } = require('chai')
const { puzzle } = require('../puzzle.input')

describe('day 1 challenge', ()=> {

    it('includes an example for part 1', ()=>{ 
        let input = puzzle('day.1', 'example.txt').map(s => parseInt(s));           
        expect(countIncreasing(input)).to.equal(7);
    });    
    const countIncreasing = (input) => {
        let count = 0;
        let previous = input[0];
        for (var i=1; i<input.length; i++) {
            if (input[i] > previous) {
                count ++;
            }
            previous = input[i];
        }
        return count;
    }
    it('includes part 1', ()=>{ 
        let input = puzzle('day.1', 'input.txt').map(s => parseInt(s));           
        expect(countIncreasing(input)).to.equal(1400);
    });

    it('includes an example for part 2', ()=>{ 
        let input = puzzle('day.1', 'example.txt').map(s => parseInt(s));           
        expect(countIncreasingWindow(input)).to.equal(5);
    }); 
    const countIncreasingWindow = (input) => {
        let count = 0;

        let previousSum = input[0] + input[1] + input[2];
        let sum = previousSum;

        for (var i=3; i<input.length; i++) {
            previousSum = sum;
            sum = previousSum + input[i] - input[i-3]
            if (sum > previousSum) { count ++ }
        }
        return count;
    }
    it('includes part 2', ()=>{ 
        let input = puzzle('day.1', 'input.txt').map(s => parseInt(s));           
        expect(countIncreasingWindow(input)).to.equal(1429);
    });

})
