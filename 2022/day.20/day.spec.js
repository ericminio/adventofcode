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
            move,
        } = require('./solve.js');

        describe('nth', () => {

            it('works for 1', () => {
                expect(nth(1, [-1, 1, 2, 0, 4])).to.equal(4);
            });

            it('works for 2', () => {
                expect(nth(2, [-1, 1, 2, 0, 4])).to.equal(-1);
            });
        });

        describe.only('move', () => {

            it.skip('moves values to the right when positive', () => {
                expect(move(4, [1, 2, -3, 0, 3, 4, -2])).
                    to.deep.equal([1, 2, -3, 4, 0, 3, -2]);
            });

            it('does not move zero', () => {
                expect(move(0, [1, 0, 2])).
                    to.deep.equal([1, 0, 2]);
            });
        });
    });
});


