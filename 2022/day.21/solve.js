const { hug } = require('../../lib/dichotomy.js');
const { lines } = require('../support/index.js');
const { expand } = require('./expand.js');
const { parseCell, formulaPattern } = require('./parser.js');

const solve1 = (file) => {
    let cellDefinitions = lines(file);
    let cells = cellDefinitions.map(parseCell);
    const formulas = cells.reduce((all, cell) => {
        all[cell.name] = cell.formula;
        return all;
    }, {});
    let value = cells.find(cell => cell.name == 'humn').value;
    let formula = expand('root', formulas).replace('humn', value);

    return eval(formula);
};

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