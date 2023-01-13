const { expect } = require('chai');
const { parseCell } = require('./parser');
const { compute } = require('./compute');

describe.only('Compute', () => {

    it('works', () => {
        let cells = [ parseCell('aaa: 3'), parseCell('bbb: aaa * aaa') ];
        let sheet = { cells, values: {}};
        cells.forEach(cell => {
            sheet.values[cell.name] = cell.value;
        });
        compute(sheet);

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