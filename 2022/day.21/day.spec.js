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

    describe('cells', () => {

        let pattern = /(.*):\s(.*)/;
        let parse = (incoming) => {
            let data = pattern.exec(incoming).splice(1);
            let value;
            try {
                value = eval(data[1]);
            }
            catch {
                value = NaN;
            }
            let cell = {
                name: data[0],
                formula: data[1],
                value,
            };
            return cell;
        };

        it('supports values', () => {
            let cell = parse('dvpt: 42');

            expect(cell).to.deep.equal({
                name: 'dvpt',
                formula: '42',
                value: 42,
            });
        });

        it('supports formulas', () => {
            let cell = parse('lgvd: ljgn * ptdq');

            expect(cell).to.deep.equal({
                name: 'lgvd',
                formula: 'ljgn * ptdq',
                value: NaN,
            });
        });

        it('supports formula with right operand resolved', () => {
            let cell = parse('aaaa: bbbb * 5');

            expect(cell).to.deep.equal({
                name: 'aaaa',
                formula: 'bbbb * 5',
                value: NaN,
            });
        });

        it('supports formula with left operand resolved', () => {
            let cell = parse('aaaa: 5 * bbbb');

            expect(cell).to.deep.equal({
                name: 'aaaa',
                formula: '5 * bbbb',
                value: NaN,
            });
        });

        it('supports resolved formulas', () => {
            let cell = parse('lgvd: 3 * 5');

            expect(cell).to.deep.equal({
                name: 'lgvd',
                formula: '3 * 5',
                value: 15,
            });
        });
    });
});
