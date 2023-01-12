const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');

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

    describe('worksheet', () => {

        let pattern = /(.*):\s(.*)/;

        it('supports values', () => {
            let incoming = 'dvpt: 42';
            let data = pattern.exec(incoming).splice(1);
            let cell = {
                name: data[0],
                formula: data[1],
                value: parseInt(data[1]),
            };

            expect(cell).to.deep.equal({
                name: 'dvpt',
                formula: '42',
                value: 42,
            });
        });

        it('supports formulas', () => {
            let incoming = 'lgvd: ljgn * 5';
            let data = pattern.exec(incoming).splice(1);
            let cell = {
                name: data[0],
                formula: data[1],
                value: parseInt(data[1]),
            };

            expect(cell).to.deep.equal({
                name: 'lgvd',
                formula: 'ljgn * 5',
                value: NaN,
            });
        });
    });
});
