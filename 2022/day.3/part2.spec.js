const { expect } = require('chai');
const { solve2 } = require('./solve');

describe('2022.3.2', () => {

    it('has an example', () => {
        expect(solve2(`${__dirname}/data/example.txt`)).to.equal(70);
    });

    it('is solved again', () => {
        expect(solve2(`${__dirname}/data/example.txt`)).to.equal(70);
    });
});

