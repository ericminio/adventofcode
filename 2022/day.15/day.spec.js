const { expect } = require('chai');
const { solve1 } = require('./solve');

describe.only('2022.15', () => {

    describe('part 1', () => {

        it('has an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`, 10)).to.equal(26);
        });
        it('is solved', () => {
            expect(solve1(`${__dirname}/data/example.txt`, 10)).to.equal(26);
        });

    });
});


