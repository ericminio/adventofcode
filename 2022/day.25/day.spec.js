const { expect } = require('chai');
const { solve1 } = require('./solve');

describe('2022.25', () => {

    describe('figuring out the fuel total needed in SNAFU', () => {

        it('leverages an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal('2=-1=0');
        });

        it('is done', () => {
            expect(solve1(`${__dirname}/data/input.txt`)).to.equal('2-1-110-=01-1-0-0==2');
        });

    });
});
