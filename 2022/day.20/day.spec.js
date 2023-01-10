const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');
const { endIndex } = require('./solve');

describe('2022.20', () => {

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


