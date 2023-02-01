const { expect } = require('chai');
const { solve1 } = require('./solve');

describe.only('2022.22', () => {

    describe('figuring out the final password to pass through the force field', () => {

        it('leverages an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(6032);
        });

        it('is done', () => {
            expect(solve1(`${__dirname}/data/input.txt`)).to.equal(1428);
        });

    });
});
