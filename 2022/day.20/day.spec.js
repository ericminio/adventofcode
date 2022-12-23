const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');
const { move } = require('./solve');

describe.only('2022.??', () => {

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

    describe('moving', () => {

        it('works for 1', () => {
            expect(move(1, [0, 0, 1, 0])).to.deep.equal(
                [1, 0, 0, 0]
            );
        });

        it('works for 2', () => {
            expect(move(2, [0, 0, 2, 0])).to.deep.equal(
                [0, 2, 0, 0]
            );
        });

        it('works for 3', () => {
            expect(move(3, [0, 0, 3, 0])).to.deep.equal(
                [0, 0, 3, 0]
            );
        });

        it('works for 4', () => {
            expect(move(4, [0, 0, 4, 0])).to.deep.equal(
                [4, 0, 0, 0]
            );
        });

        it('works for -1', () => {
            expect(move(-1, [0, 0, -1, 0])).to.deep.equal(
                [0, -1, 0, 0]
            );
        });

        it('works for -2', () => {
            expect(move(-2, [0, 0, -2, 0])).to.deep.equal(
                [-2, 0, 0, 0]
            );
        });

        it('works for -3', () => {
            expect(move(-3, [0, 0, -3, 0])).to.deep.equal(
                [0, 0, -3, 0]
            );
        });

        it('works for 0', () => {
            expect(move(0, [1, 1, 0, 1])).to.deep.equal(
                [1, 1, 0, 1]
            );
        });

        it('works for last example', () => {
            expect(move(4, [1, 2, -3, 0, 3, 4, -2])).to.deep.equal(
                [1, 2, -3, 4, 0, 3, -2]
            );
        });
    });
});


