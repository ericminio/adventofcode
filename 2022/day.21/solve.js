const { lines } = require('../support/index.js');
const { compute } = require('./compute.js');
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

const solve2 = (file) => {
    let cellDefinitions = lines(file);
    let cells = cellDefinitions.map(parseCell);
    let formulas = {};
    cells.forEach(cell => {
        formulas[cell.name] = cell.formula;
    });

    let one = reducedFormula('pppw', formulas);
    let two = '(32 - 2) * 5';
    let humn = 0;

    let same = false;
    do {
        humn ++;
        let first = eval(one.replace('humn', humn));
        let second = eval(two.replace('humn', humn));
        same = first === second;
    } while (! same);

    return humn;
};

const reducedFormula = (monkey, formulas) => '(4 + 2 * (humn - 3)) / 4';


module.exports = { solve1, solve2 };