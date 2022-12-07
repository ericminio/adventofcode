const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');

describe('2022.6.1', () => {

    it('has an example', () => {
        expect(solve1(`${__dirname}/data/example.txt`)).to.equal(7);
    });
    it('is solved', () => {
        expect(solve1(`${__dirname}/data/input.txt`)).to.equal(1848);
    });
});

describe('2022.6.2', () => {

    it('has an example', () => {
        expect(solve2(`${__dirname}/data/example.txt`)).to.equal(19);
    });

    it('is solved again', () => {
        expect(solve2(`${__dirname}/data/input.txt`)).to.equal(2308);
    });
});

