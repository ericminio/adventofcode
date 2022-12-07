const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');

describe('2022.7.1', () => {

    it('has an example', () => {
        expect(solve1(`${__dirname}/data/example.txt`)).to.equal(95437);
    });

    it('is solved', () => {
        expect(solve1(`${__dirname}/data/input.txt`)).to.equal(1845346);
    });
});

describe('2022.7.2', () => {

    it('has an example', () => {
        expect(solve2(`${__dirname}/data/example.txt`)).to.equal(24933642);
    });
    it('is solved', () => {
        expect(solve2(`${__dirname}/data/input.txt`)).to.equal(3636703);
    });
});
