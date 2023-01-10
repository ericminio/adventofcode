const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');
const { move, endIndex } = require('./solve');

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

        it('wraps long shot as expected', () => {
            expect(move(11, [0, 0, 0, 11, 0, 0])).to.deep.equal(
                [0, 0, 0, 0, 11, 0]
            );
        });

        it('wraps negative long shot as expected', () => {
            expect(move(-11, [0, 0, 0, -11, 0, 0])).to.deep.equal(
                [0, 0, -11, 0, 0, 0]
            );
        });
    });

    describe('index after pushing', () => {

        it('works for 1', () => {
            let list = [1, 2, 3];

            expect(endIndex(0, 1, list)).to.equal(1);
        });

        it('works for 2', () => {
            let list = [1, 2, 3];

            expect(endIndex(0, 2, list)).to.equal(0);
        });

        it('can end before start', () => {
            let list = [1, 2, 3, 4, 5];

            expect(endIndex(2, 3, list)).to.equal(1);
        });

        it('can end first', () => {
            let list = [1, 2, 3, 4, 5];

            expect(endIndex(1, 3, list)).to.equal(0);
        });

        it('can end first going backwards', () => {
            let list = [1, 2, 3, 4, 5];

            expect(endIndex(3, -3, list)).to.equal(0);
        });

        it('can end after start going backwards', () => {
            let list = [1, 2, 3, 4, 5];

            expect(endIndex(1, -2, list)).to.equal(3);
        });

    });
});


