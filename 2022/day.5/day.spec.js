const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');

describe('2022.5.1', () => {

    it('has an example', () => {
        expect(solve1(`${__dirname}/data/example.txt`)).to.equal('CMZ');
    });
    it('is solved', () => {
        expect(solve1(`${__dirname}/data/input.txt`)).to.equal('WHTLRMZRC');
    });
});

describe('2022.5.2', () => {

    it('has an example', () => {
        expect(solve2(`${__dirname}/data/example.txt`)).to.equal('MCD');
    });
    it('is solved again', () => {
        expect(solve2(`${__dirname}/data/example.txt`)).to.equal('MCD');
    });
});

