const { expect } = require('chai');
const { solve1 } = require('./solve');

describe('2022.3.1', () => {

    it('has an example', () => {
        expect(solve1(`${__dirname}/data/example.txt`)).to.equal(157);
    });

    it('is solved', () => {
        expect(solve1(`${__dirname}/data/input.txt`)).to.equal(7446);
    });
});

