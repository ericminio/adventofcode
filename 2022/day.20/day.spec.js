const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');

describe.only('2022.20', () => {

    describe('part 1', () => {

        it('has an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(3);
        });

    });

    describe('part 2', () => {

        it('has an example', () => {
            expect(solve2(`${__dirname}/data/example.txt`)).to.equal(15);
        });

    });

    describe('internals', () => {

        const {
            nth,
        } = require('./solve.js');

        describe('nth', () => {

            it('works for 1', () => {
                expect(nth(1, [-1, 1, 2, 0, 4])).to.equal(4);
            });

            it('works for 2', () => {
                expect(nth(2, [-1, 1, 2, 0, 4])).to.equal(-1);
            });
        });
    });
});


