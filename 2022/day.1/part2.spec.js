const { expect } = require('chai');
const { solve2 } = require('./solve');

describe('part 2', () => {

    it('has an example', () => {
        expect(solve2(`${__dirname}/data/example.txt`)).to.equal(45000);
    });

    it('is solved', () => {
        expect(solve2(`${__dirname}/data/input.txt`)).to.equal(213089);
    });
});

