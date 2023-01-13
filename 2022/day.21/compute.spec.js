const { expect } = require('chai');
const { parseCell } = require('./parser');
const { compute } = require('./compute');

describe.only('Compute', () => {

    it('works with 2 cells', () => {
        let cells = [ parseCell('aaa: 3'), parseCell('bbb: aaa * aaa') ];
        let sheet = { cells, values: {}};
        cells.forEach(cell => {
            sheet.values[cell.name] = cell.value;
        });
        compute(sheet);

        expect(sheet.values).to.deep.equal({
            'aaa': 3,
            'bbb': 9
        });
    });
});