const { expect } = require('chai');
const { expand } = require('./expand.js');
const { parseCell } = require('./parser');
const formulas = (cells) => {
    let map = {};
    cells.forEach(cell => {
        map[cell.name] = cell.formula;
    });
    return map;
};
describe.only('expand', () => {

    it('works with 3 cells', () => {
        let cells = [
            parseCell('aaa: 3'),
            parseCell('bbb: aaa * aaa'),
            parseCell('ccc: aaa + bbb'),
        ];

        expect(expand('cccc', formulas(cells))).to.equal('3 + (3 * 3)');
    });
});