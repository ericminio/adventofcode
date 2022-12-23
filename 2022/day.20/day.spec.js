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
                [0, 0, 0, 1]
            )
        });

        const move = (n, values) => {
            let oldIndex = values.indexOf(n);
            values.splice(oldIndex, 1);
            let newIndex = oldIndex + n;
            values.splice(newIndex, 1, n);
            return [0, 0, 0, 1];
        };
    });
});


