const { expect } = require('chai');
const { parseCell } = require('./parser');
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

    describe.only('formula solving', () => {

        it('works', () => {
            let cells = [ parseCell('aaa: 3'), parseCell('bbb: aaa * aaa') ];
            let sheet = { cells, values: {}};
            cells.forEach(cell => {
                sheet.values[cell.name] = cell.value;
            });
            resolve(cells);

            expect(cells).to.deep.equal([
                {
                    name: 'aaa',
                    formula: '3',
                    value: 3,
                },
                {
                    name: 'bbb',
                    formula: 'aaa * aaa',
                    value: 9,
                },
            ]);
        });
    });
});

const resolve = (cells) => {

    let formula = cells[1].formula;
    let needs = variables(formula);
    let operation = formula.replace(/aaa/g, cells[0].value);
    needs.forEach(variable => {

    });
    let value = eval(operation);

    cells[1].value =  value;
};

const variables = (formula) => {
    return [ 'aaa' ];
};