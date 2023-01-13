const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');

describe.only('2022.21', () => {

    describe('working out the number the monkey named root will yell', () => {

        it('leverages the example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(152);
        });

        it('is done', () => {
            expect(solve1(`${__dirname}/data/input.txt`)).to.equal(155708040358220);
        });

    });

    describe('figuring out what number you need to yell so that root equality check passes', () => {

        it.skip('leverages the example', () => {
            expect(solve2(`${__dirname}/data/example.txt`)).to.equal(301);
        });

        it('leverages the example', () => {
            expect(solve2(`${__dirname}/data/input.txt`)).to.equal(3342154812537);
        });

    });
});
