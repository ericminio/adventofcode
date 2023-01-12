const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');
const { parseCell } = require('./solve');

describe.only('2022.21', () => {

    describe('part 1', () => {

        it('has an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(152);
        });

    });

    describe('part 2', () => {

        it('has an example', () => {
            expect(solve2(`${__dirname}/data/example.txt`)).to.equal(15);
        });

    });

    describe('cells', () => {

        it('supports values', () => {
            let cell = parseCell('dvpt: 42');

            expect(cell).to.deep.equal({
                name: 'dvpt',
                formula: '42',
                value: 42,
            });
        });

        it('supports formulas', () => {
            let cell = parseCell('lgvd: ljgn * ptdq');

            expect(cell).to.deep.equal({
                name: 'lgvd',
                formula: 'ljgn * ptdq',
                value: NaN,
            });
        });

        it('supports formula with right operand resolved', () => {
            let cell = parseCell('aaaa: bbbb * 5');

            expect(cell).to.deep.equal({
                name: 'aaaa',
                formula: 'bbbb * 5',
                value: NaN,
            });
        });

        it('supports formula with left operand resolved', () => {
            let cell = parseCell('aaaa: 5 * bbbb');

            expect(cell).to.deep.equal({
                name: 'aaaa',
                formula: '5 * bbbb',
                value: NaN,
            });
        });

        it('supports resolved formulas', () => {
            let cell = parseCell('lgvd: 3 * 5');

            expect(cell).to.deep.equal({
                name: 'lgvd',
                formula: '3 * 5',
                value: 15,
            });
        });
    });
});
