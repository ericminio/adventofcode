const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');

describe.only('2022.25', () => {

    describe('figuring out the fuel total needed in SNAFU', () => {

        it('leverages an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal('2=-1=0');
        });

    });

    describe('part 2', () => {

        it('leverages an example', () => {
            expect(solve2(`${__dirname}/data/example.txt`)).to.equal(15);
        });

    });
});
