const { expect } = require('chai');
const { parseCell } = require('./parser');

describe.only('Compute', () => {

    it('works', () => {
        let cells = [ parseCell('aaa: 3'), parseCell('bbb: aaa * aaa') ];
        let sheet = { cells, values: {}};
        cells.forEach(cell => {
            sheet.values[cell.name] = cell.value;
        });
        resolve(sheet);

        expect(sheet.cells).to.deep.equal([
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

const resolve = ({ cells, values }) => {

    let formula = cells[1].formula;
    let needs = variables(formula);
    let operation;
    needs.forEach(variable => {
        let pattern = new RegExp(variable, 'g');
        operation = formula.replace(pattern, values[variable]);
    });
    let value = eval(operation);

    cells[1].value =  value;
};

const variables = (formula) => {
    return [ 'aaa' ];
};