const { expect } = require('chai');
const { expand } = require('./expand.js');
const { parseCell } = require('./parser');

describe.only('expand', () => {

    it('works with 3 cells', () => {
        let cells = [
            parseCell('aaa: 3'),
            parseCell('bbb: aaa * aaa'),
            parseCell('ccc: aaa + bbb'),
        ];
        let formulas = {};
        cells.forEach(cell => {
            formulas[cell.name] = cell.formula;
        });
        let expanded = expand('cccc', formulas);

        expect(expanded).to.equal('aaa + (aaa * aaa)');
    });
});