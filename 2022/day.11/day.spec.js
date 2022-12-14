const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');

describe.only('2022.11', () => {

    describe('part 1', () => {

        it('has an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(10605);
        });

        it('is solved', () => {
            expect(solve1(`${__dirname}/data/input.txt`)).to.equal(10605);
        });

    });
});


