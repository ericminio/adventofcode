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
    let root = cellDefinitions.find(line => line.startsWith('root'));
    let pattern = /root:\s(.*)\s.\s(.*)/;
    let [ monkey1, monkey2 ] = pattern.exec(root).splice(1);

    let one = expand(monkey1, formulas);
    let two = '(32 - 2) * 5';
    let humn = 0;
    console.log(one);
    console.log(two);

    let same = false;
    do {
        humn ++;
        let first = eval(one.replace('humn', humn));
        let second = eval(two.replace('humn', humn));
        same = first === second;
    } while (! same);

    return humn;
};

const expand = (monkey, formulas) => '(4 + 2 * (humn - 3)) / 4';


module.exports = { solve1, solve2 };