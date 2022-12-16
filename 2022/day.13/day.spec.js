const { expect } = require('chai');
const { solve1 } = require('./solve');

describe.only('2022.13', () => {

    describe('part 1', () => {

        it('has an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(13);
        });

        it('is solved', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(13);
        });

    });
});


