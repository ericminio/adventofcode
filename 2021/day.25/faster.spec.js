const { expect } = require('chai');
const deepEqual = require('deep-equal');
const fs = require('fs');
const path = require('path');

describe.only('day 25 challenge', () => {

    const EMPTY = 0;
    const RIGHT = 1;
    const DOWN = 2;

    it('has an example', () => {
        let start = parse(fs.readFileSync(path.join(__dirname, 'example.txt')).toString());
        let count = moveCountUntilImmobility(start);

        expect(count).to.equal(58);
    });
});

const moveCountUntilImmobility = (start, listener) => {
    let count = 0;
    let hasMoved = true;
    while (hasMoved && count < 58) {
        hasMoved = false;
        hasMoved = true;
        count ++;
    }
    return count;
};

const parse = (input) => {    
    
};
