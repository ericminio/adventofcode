const { lines } = require('../support/index.js');
const { compute } = require('./compute.js');
const { hug } = require('./dichotomy.js');
const { expand } = require('./expand.js');
const { parseCell } = require('./parser.js');

const solve1 = (file) => {
    let cellDefinitions = lines(file);
    let cells = cellDefinitions.map(parseCell);
    let sheet = { cells, values: {}};
    cells.forEach(cell => {
        sheet.values[cell.name] = cell.value;
    });
    compute(sheet);

    return sheet.values['root'];
};

const formulaPattern = /(.*)\s.\s(.*)/;

const solve2 = (file) => {
    const formulas = lines(file)
        .map(parseCell)
        .reduce((all, cell) => {
            all[cell.name] = cell.formula;
            return all;
        }, {});
    const [ monkey1, monkey2 ] = formulaPattern.exec(formulas['root']).splice(1)
        .map(monkey => expand(monkey, formulas));

    const target = eval(monkey2.replace('humn', 0));
    const affine = (humn) => eval(monkey1.replace('humn', humn));
    let humn = hug({ target, affine, start: 1, step: 10 });
    let same = affine(humn) === target;
    do {
        humn ++;
        let first = affine(humn);
        same = first === target;
    } while (! same);

    return humn;
};

module.exports = { solve1, solve2 };