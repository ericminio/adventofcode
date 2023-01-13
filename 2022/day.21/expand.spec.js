const { expect } = require('chai');
const { parseCell } = require('./parser');

describe.only('expand', () => {

    it('works with 3 cells', () => {
        let cells = [
            parseCell('aaa: 3'),
            parseCell('root: aaa + bbb'),
            parseCell('bbb: aaa * aaa'),
        ];
        let formulas = {};
        cells.forEach(cell => {
            formulas[cell.name] = cell.formula;
        });

    });
});