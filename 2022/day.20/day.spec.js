const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');

describe.only('2022.??', () => {

    describe('part 1', () => {

        it('has an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(42);
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

        const move = (n, values) => {
            let oldIndex = values.indexOf(n);
            values.splice(oldIndex, 1);
            let newIndex = (oldIndex + n) % values.length;
            values.splice(newIndex, 0, n);

            return values;
        };
    });
});


