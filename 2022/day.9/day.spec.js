const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');
const { parse, right } = require('./solve');
const { lines } = require('../support');

describe.only('2022.9', () => {

    describe('part 1', () => {

        it('has an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(13);
        });

    });

    describe('part 2', () => {

        it('has an example', () => {
            expect(solve2(`${__dirname}/data/example.txt`)).to.equal(15);
        });

    });

    describe('internals', () => {

        describe('parsing', () => {

            it('identifies moves as expected', () => {
                const input = lines(`${__dirname}/data/example.txt`);
                const moves = parse(input);

                expect(moves[0]).to.deep.equal(right);
                expect(moves[1]).to.deep.equal(right);
            });
        });
    });
});
